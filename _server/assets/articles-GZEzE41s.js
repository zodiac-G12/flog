const s=`
## 従来のブログよりグレードアップ

　私は気がついた。シンプルイズベスト、一番格好いいことに。
いろいろプロジェクトやってて、ここに行き着いた。
Nuxtを私はあまりにも知らなすぎた。
LightHouseのスコアがあまりに低かったので、これで少し改善したはず。
`,i=`
## スクリプト

config において __12345@gmail.com__ というemailのコミットに対して過去全部のコミット修正

~~~bash
#!/bin/bash

git filter-branch -f --commit-filter '                         
if [ "$GIT_COMMITTER_EMAIL" = "12345@gmail.com" ];
then
    GIT_COMMITTER_NAME="zodiac-G12";
    GIT_AUTHOR_NAME="zodiac-G12";
    GIT_COMMITTER_EMAIL="12181838+zodiac-G12@users.noreply.github.com";
    GIT_AUTHOR_EMAIL="12181838+zodiac-G12@users.noreply.github.com";git commit-tree "$@";
else
    git commit-tree "$@";
    fi' HEAD

~~~
　
## スクリプト事前と事後処理

まず対象のコミット洗い出し

~~~bash
git log --pretty=full
~~~

上記の __git filter-branch__ のスクリプト実行。

その後しっかりcommit情報が変更されたか以下のコマンドで確認

~~~bash
git log --pretty=full
~~~

問題なければforce pushする

~~~bash
git push -f
~~~
`,n=`
## 内容
　以前の記事([GraphQL APIでDBアクセスを大量に発生させる攻撃手法について](http://localhost:3000/blog/content10))をうけて、
攻撃手法に対する対策を考えて試してみたという記事

## 使用したモジュール
- [apollo-server](https://www.apollographql.com/)
- [graphql](https://graphql.org/)
- [graphql-cost-analysis](https://github.com/pa-bru/graphql-cost-analysis)
- [graphql-query-complexity](https://github.com/slicknode/graphql-query-complexity)
- [graphql-depth-limit](https://github.com/stems/graphql-depth-limit)

## 長くて読まないよという人に

- [ソースコード](https://github.com/zodiac-G12/attack-gql-server)

## 悪意あるクエリ対策
　例えば以下のような悪意あるクエリがあるとする。
~~~
query {
  authors {
    books {
      author {
        books {
          author {
            books {
              ...
              author {
                name
              }
              ...
            }
          }
        }
      }
    }
  }
~~~

これに対処するために、コスト(Cost)或いは複雑性(Complexity)、ネストの深さという指標を用いて、レスポンスを切り分けるという方法がある。

　**graphql-cost-analysis**, **graphql-query-complexity** は上記のコスト或いは複雑性を定義し、閾値の超えたクエリに対してはエラーを返すという方法を提供する。

　**graphql-depth-limit** に関してはネストの深さで切り分けをする方法を提供する。

　具体的なコードを以下に書いていく。

## graphql-cost-analysis

~~~typescript
import costAnalysis from 'graphql-cost-analysis';

export const defaultCost: number = 1;

export const costAnalyzer = (maximumCost: number) => costAnalysis({
  defaultCost,
  maximumCost,
  onComplete: (cost: number) => {
    console.log('Query Cost:', cost);
  },
});
~~~
<br>

## graphql-query-complexity

~~~typescript
import queryComplexity, { simpleEstimator } from 'graphql-query-complexity';

export const defaultComplexity: number = 1;

export const queryComplexier = (maximumComplexity: number) => queryComplexity({
  estimators: [
    simpleEstimator({defaultComplexity})
  ],
  maximumComplexity,
  onComplete: (complexity: number) => {
    console.log('Query Complexity:', complexity);
  },
});
~~~
<br>

## graphql-depth-limit

~~~typescript
import depthLimit from 'graphql-depth-limit';

export const depthLimiter = (maxDepth: number) => depthLimit(
  maxDepth,
  {},
  depths => console.log(depths)
);
~~~
<br>

## ルールの適用
　以下のように **validationRules**に配列の要素として渡す。

> 公式ドキュメント: https://www.apollographql.com/docs/apollo-server/api/apollo-server/#validationrules

~~~typescript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [
    depthLimiter(9),
    queryComplexier(10),
    costAnalyzer(10),
  ],
});
~~~

<br>

## クエリに対する各値の検証例

~~~
query {
  books {
    author {
      books {
        title 
      }
    }
  }
}
~~~
=&gt;
Query Depth: 3,
Query Complexity: 4,
Query Cost: 4

~~~
query {
  authors {
    id
    books {
      id
    	author {
        id
        books {
          id
          title
        }
      }
    }
  }
}
~~~

=&gt;
Query Depth: 4,
Query Complexity: 9,
Query Cost: 9

~~~
query {
  authors {
    books {
      author {
        books {
          author {
            books {
              author {
                books {
                  author {
                    books {
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
~~~

=&gt;
Error: exceeds maximum operation depth of 9

~~~
query {
  authors {
    id
    books {
      id
      title
    	author {
        id
        name
        books {
          id
          title
        }
      }
    }
  }
}
~~~

=&gt;
Error: The query exceeds the maximum complexity of 10. Actual complexity is 11

　以上のことから、簡単な見分け方法として、「authors, id, title」などの単語の数が **Complexity, Cost** で、
「{}」のペアの数(ネストの深さ)が **Depth** であると分かる。

## おおよその問題解決とはなりうるが
　以上のことから、閾値を設けることで、ComplexityやDepthが100万といったクエリは防ぐことができる。
しかし、私はもっと簡単に「books->authors->books」や「books->authors->...->books->authors」という表現の含まれるクエリを特定で防げば良いと考えた。

## 特定表現のクエリのブロック

~~~typescript
// DISABLE disallowCycle -> INVALID: author -> books -> (shops -> authors -> shops) -> books
// DISABLE disallowPattern -> INVALID: author -> books -> (shops -> countries) -> authors -> shops -> books -> (shops -> countries)
const loopCheck = (beforeName, selectionSet, transitionReference, disallowCycle, disallowPattern) => {
  if (!selectionSet) {
    return true;
  }

  const nowName = selectionSet.selections[0].name.value;
  if (disallowPattern && beforeName && nowName) {
    if (!transitionReference[beforeName]) {
      transitionReference[beforeName] = [];
    }
    if (!transitionReference[beforeName].includes(nowName)) {
      transitionReference[beforeName].push(nowName);
    } else {
      throw new Error(\`Pattern is Already Exist: \${beforeName} -> \${nowName}\`);
    }
  }

  const nextName = selectionSet.selections[0].selectionSet?.selections[0].name.value;

  console.log(beforeName, nowName, nextName, selectionSet.selections[0]);
  if (disallowCycle && beforeName === nextName) {
    throw new Error(\`This is Looped Evil Query: beforeName: \${beforeName}, nowName: \${nowName}, nextName: \${nextName}\`);
  }
  return loopCheck(nowName, selectionSet.selections[0].selectionSet, transitionReference, disallowCycle, disallowPattern);
}

export const orginalRules = (info, disallowCycle, disallowPattern) => {
  return loopCheck(info.fieldNodes[0].name.value, info.fieldNodes[0].selectionSet, {}, disallowCycle, disallowPattern);
}
~~~
「disallowCycle: true -> (shops -> authors -> shops)といった繰り返しを不正とみなす」
「disallowPattern: true -> (shops -> countries)といった表現が再び出現した際に不正とみなす」

挿入場所を以下に示す。

~~~typescript
const resolvers = {
  Query: {
    books (parent, args, context, info) {
      // ここ！
      orginalRules(info, true, true);
      return books;
    },
    ...
~~~
<br>

## 実際に動かしてみる

~~~
query {
  books {
   	author {
      books {
        title 
      }
    }
  }
}
~~~

Error: This is Looped Evil Query: beforeName: books, nowName: author, nextName: books

~~~
# disallowCycleをfalseにする
query {
  authors {
    books {
      author {
        books {
          author {
            name
          }		
        }
      }
    }
  }
}
~~~

Error: Pattern is Already Exist: books -> author

　以上の実装はあくまでコンセプトなので、実用には耐え得ないので注意。
例として、

~~~
query {
  books {
    id
   	author {
      id
      books {
        id
        title 
      }
    }
  }
}
~~~

とやると上記のルールを通過してしまう実装になっている。
順当にやるなら、graphql-query-complexityの実装を参考にしたりしながら実装した方が良いであろう。
> selectionSet: [Apolloの公式ドキュメント](https://www.apollographql.com/blog/the-anatomy-of-a-graphql-query-6dffa9e9e747/)

## まとめ
　ドキュメントを読んで実際に手を動かして試してみることの大事さを実感した。
上記のクエリの繰り返しやパターンの防止の実装は、調べた限りなさそうだったので、
開拓者のような気分を勝手に味わったといった所感である。
`,l=`
## 内容
　GraphQL APIでDBアクセスを大量に発生させる攻撃手法について、公式ドキュメントや参考記事をもとに、実際に攻撃が可能なのか確かめてみたという記事。

## 想定読者
　GraphQLについて興味があり、ある程度の知識がある人。JavaScriptについてある程度知識がある人。

## 動機
　ある記事を読んでいて、気になったと同時に、全く考慮したことがない事柄で青ざめたので、実際に実装して試してみたかった。

## 参考文献
　[GraphQL API を悪意あるクエリから守る手法](https://yigarashi.hatenablog.com/entry/graphql-query-analysis)

## 使用したモジュール
- [apollo-server](https://www.apollographql.com/)
- [graphql](https://graphql.org/)

## 実装
　[公式](https://www.apollographql.com/docs/apollo-server/data/resolvers/)を参考にして以下のように実装する。

~~~javascript
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql\`
  type Book {
    id: Int!
    title: String!
    author: Author!
  }

  type Author {
    id: Int!
    name: String!
    books: [Book!]!
  }

  type Query {
    books: [Book]
    authors: [Author]
  }
\`;

// DBのテーブルとみなす
const books = [
  {
    id: 1,
    title: 'The Awakening',
    author: {
      id: 1,
    }
  },
  {
    id: 2,
    title: 'City of Glass',
    author: {
      id: 2,
    }
  },
];

// DBのテーブルとみなす
const authors = [
  {
    id: 1,
    name: 'Kate Chopin',
    books: [
      {
        id: 1,
      },
    ],
  },
  {
    id: 2,
    name: 'Paul Auster',
    books: [
      {
        id: 2,
      },
    ],
  }
];

// DBへの想定アクセス回数
let dbCount = 0;

const findByIdBook = (id) => {
  dbCount += books.length;
  console.log(dbCount);
  return books.filter(book => book.id === id)[0];
}

const findbyIdAuthor = (id) => {
  dbCount += authors.length;
  console.log(dbCount);
  return authors.filter(author => author.id === id)[0];
}

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
  },
  Book: {
    author (parent) {
      return findbyIdAuthor(parent.author.id);
    },
  },
  Author: {
    books (parent) {
      return parent.books.map(book => findByIdBook(book.id));
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(\`🚀  Server ready at \${url}\`);
});
~~~

重要なのは、BookとAuthorが互いに相互参照している点である。

これは公式GraphQLのベストプラクティスの、

bookがauthorのidなりを持っていなるなら、authorの実体を引けるようにする方が良いという思想に基づいている。

## 実際に実行

以上のBookとAuthorが互いに相互参照している方針に従ってスキーマを設計すると、

book --> author --> books --> author --> books ... といったように無限に循環する構造を作ることができる。

これを利用すると以下のようなクエリを書くことができる。

~~~
query {
  authors {
    books {
      author {
        books {
          author {
            books {
              ...
              author {
                name
              }
              ...
            }
          }
        }
      }
    }
  }
~~~

レスポンス

~~~
{
  "data": {
    "authors": [
      {
        "books": [
          {
            "author": {
              "books": [
                {
                  "author": {
                    "books": [
                      {
                        ...
                        "author": {
                          "name": "Kate Chopin"
                        }
                        ...
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    ]
  }
}
~~~
およそ**558回**ネストしたところ、DBアクセス概算は**2232回**であった。

数式で言うと、

(ネストの回数) × 4 = (DBアクセス回数)

である。

> 注意: 上の数式はbooksとauthorsのデータが上のソースコードの条件の時のみ

> また(DBアクセス回数)はあくまでも目安であり、実際とは異なる場合もある

そして、上限を特に設けていないため、何回でもクエリを投げられるし、再現なくDBアクセス回数を増やすことができる。

故にこのままの仕組みで表に出すと非常に危険なことがわかる。

## 危険性
　例えば具体的な話で、「あのGraphQL使っているサービスを潰したい」と思ったとして、

この攻撃に関して対策がされていないと、DBアクセスを大量にして、

**「サーバーをダウンさせてサービス停止させる」**

**「DBアクセス毎に課金するサービスを用いていた場合に課金をめちゃくちゃさせる」**

などができてしまう恐れがある。

　また、apollo-graphqlの公式サイトにも特に注意書きなどがなく、初心者は知らない間にこの問題に陥りやすいのではと考察している。

## 対策方法案
　クエリの複雑性の数値(complexity)を算出し、閾値を設けて実行を切り分けるという方法があるらしい。
以下はその方針に則ったツール。

- [graphql-query-complexity](https://github.com/slicknode/graphql-query-complexity)
- [graphql-cost-analysis](https://github.com/pa-bru/graphql-cost-analysis)

対策に関してはまた今度記事を書こうと思う。
`,p=`
## 内容
　ハフマン符号化のアルゴリズム紹介。

## TLDR
- [参考文献](https://www.mnc.toho-u.ac.jp/v-lab/yobology/Huffman_code/Huffman_code.htm)
- [私の書いたコード](https://github.com/zodiac-G12/huffman-ts)

## 動機
　計算機を触る人間として、最近、計算機科学的な知識が不足していることを実感したので、
先駆けとしてのアルゴリズムとプログラムの復習を目的とした。

　経緯としては、HaskellやC++の文献を調べていて、コンパイラの話に全くついていけなかったので、
ついていけるようになりたいし、プログラムライフサイクルフェーズの理解も確固たるものにしたい。

　あとは余談ではあるけれども、近隣諸国やヨーロッパやアメリカのエンジニアは、日本の人のエンジニアと比較すると、
スキルスタックや計算機に対する理解度に関するアベレージが、気持ち高い気がしていて、
日本人の私としては、ちょっと危機感を覚えているという次第である。自分の身は自分で守らなければ。

## ハフマン符号の特徴
　説明する際の特徴として以下の点を挙げる

1. コンパクト符号
2. 特許がない
3. JPEG,ZIP(Deflate)で使われている

> wikipedia: [ハフマン符号](https://ja.wikipedia.org/wiki/%E3%83%8F%E3%83%95%E3%83%9E%E3%83%B3%E7%AC%A6%E5%8F%B7#:~:text=%E3%83%8F%E3%83%95%E3%83%9E%E3%83%B3%E7%AC%A6%E5%8F%B7%EF%BC%88%E3%83%8F%E3%83%95%E3%83%9E%E3%83%B3%E3%81%B5%E3%81%94%E3%81%86,%E3%81%AA%E3%81%A9%E3%81%AB%E4%BD%BF%E7%94%A8%E3%81%95%E3%82%8C%E3%82%8B%E3%80%82)

---
### 1. コンパクト符号

　符号化しても一意的に __復号可能__ である点。尚且つ、 __平均符号長が最小__ となる点。

以上の説明を、より簡単に説明することにする。

　複合可能とは、符号化した後でももとの情報に戻せることを意味する。

　平均符号長が最小とは、符号化した後の系列が効率的で、割と短くて済みますよということである。

> 発展: クラフトの不等式、マクミランの不等式という定理があり、これらから、符号語の長さは極端に短くすることができないということが知られている (引用元: [コロナ社 - 情報理論 宮川洋 著](https://www.coronasha.co.jp/np/isbn/9784339001020/) )

---
### 2. 特許がない

　特許がないので、JPEGや、ZIPでも採用されている。

---
### 3. JPEG,ZIP(Deflate)で使われている

- JPEG

　DCTプロセスという画像変換と復元の規定があり、ベースラインプロセスで採用されているようである。

> JPEG関連の参考文献: [J-Stage](https://www.jstage.jst.go.jp/article/mit/14/3/14_231/_pdf), [W3C](https://www.w3.org/Graphics/JPEG/itu-t81.pdf)

- ZIP

　様々な圧縮手法があるが、例えばDeflateは、LZ法とHuffmanを組み合わせた可逆データ圧縮アルゴリズムである。

> Deflateの参考文献: [RFC 1951](https://www.ietf.org/rfc/rfc1951.txt)

## ハフマン符号のアルゴリズム

　説明に自信がないので、まずは[参考文献](https://www.mnc.toho-u.ac.jp/v-lab/yobology/Huffman_code/Huffman_code.htm)を貼っておく。併せて見ていただきたく思う。

　与えられているものとして具体例として、"ABBCCC"のような文字列を考える。
例えばこの場合の各文字の個数は、Aに関しては1つ、B:2, C:3となっている。全体の文字列の長さは6であるので、
各文字の出現確率はP(A):1/6, P(B):2/6, P(C):3/6となる。
  
　以下の手順で符号化する

1. 確率の大きさ順でアルファベット一覧のアルファベットを並べ替える
2. 最小とその次に最小のアルファベットを選択し minestPair と定義する
3. minestPair の二つのアルファベットをバイナリツリーとして、二本の枝で合流させる
4. 上の合流点に minestPair の確率の和を割り当てる
5. minestPair の二つのアルファベットのペアを一つのアルファベットを解釈し、それらの確率の和をそのアルファベットの確率と解釈する
6. (5.)の手順で作ったデータを アルファベットの一覧 に代入する
7. アルファベットが一つになる(確率の大小の比較対象がなくなる)まで、(1.)~(6.)を繰り返す
8. バイナリツリーのrootから(0,1)を割り当てていく

> 注意: (3.)で合流する際のルールを決める必要がある。確率が小さい方を左leafにするなど

> 注意: (8.)で(0,1)を割り当てていく際のルールを決める必要がある。左nodeに1を割り当てるなど

## 出来上がったコード

- https://github.com/zodiac-G12/huffman-ts/blob/master/index.ts

~~~typescript
interface NumberValueObject {
  [key: string]: number;
}

interface StringValueObject {
  [key: string]: string;
}

type LetterDistribution = NumberValueObject;

type AppearanceArray = AppearanceItem[];

interface AppearanceItem {
  symbol: Symbols;
  p: number;
}

type Symbols = string | any;

type BinaryTreeSymbols = (string | BinaryTreeSymbols)[];

interface Appearance {
  [key: string]: AppearanceItem;
}

type EncodedMap = StringValueObject;

interface HuffmanProps {
  letterDistribution: LetterDistribution;
  appearance: Appearance;
  packedAppearance: BinaryTreeSymbols;
  encodedMap: EncodedMap;
}

interface CreateHuffmanProps {
  letterDistribution: LetterDistribution
}

class Huffman {
  // 文字と出現数の関係を表すオブジェクト
  public readonly letterDistribution: LetterDistribution;

  // 各文字の出現'率'の関係を表すオブジェクト
  public readonly appearance: Appearance;

  // 出現率の大小関係から生成するバイナリツリー表現の配列
  // ex). ["A",["B",[["C","D"],["E",["F",["G","H"]]]]]]
  public readonly packedAppearance: BinaryTreeSymbols;

  // HuffmanCodeに変換済みのデータ
  public readonly encodedMap: EncodedMap;

  private constructor (props: HuffmanProps) {
    this.letterDistribution = props.letterDistribution;
    this.appearance = props.appearance;
    this.packedAppearance = props.packedAppearance;
    this.encodedMap = props.encodedMap;
  }

  public static toEncodeMap: EncodedMap = {};

  // 文字の出現回数分の文字を生成し、それらを要素とする配列を生成
  public static createChars(letterDistribution: LetterDistribution): string[] {
    const chars: string[] = Object.keys(letterDistribution).flatMap((c: string) => {
      return [...Array(letterDistribution[c]).keys()].map(() => c);
    });

    return chars;
  }

  // 各文字の出現'率'の関係を表すオブジェクトを生成
  public static createAppearance(chars: string[]): Appearance {
    const appearance: Appearance = {};
    const sententLength: number = chars.length;

    // 各文字の出現回数をカウント
    chars.forEach(c => appearance[c] !== undefined ? appearance[c].p += 1 : appearance[c] = {symbol: c, p: 1});

    // 各文字の出現率を計算
    Object.keys(appearance).forEach(c => appearance[c].p /= sententLength);

    return appearance;
  }

  // 出現率の大小関係から生成するバイナリツリー表現の配列を生成
  public static createPackedAppearance(appearance: Appearance): BinaryTreeSymbols {
    const sortedAppearance: AppearanceArray = Object.values(appearance).sort((a,b) => b.p - a.p);

    while (sortedAppearance.length !== 1) {
      const minest: AppearanceItem = sortedAppearance.reduce((a,b) => a.p < b.p ? a : b);
      const minestIndex: number = sortedAppearance.indexOf(minest);
      sortedAppearance.splice(minestIndex,1);

      const miner: AppearanceItem = sortedAppearance.reduce((a,b) => a.p < b.p ? a : b);
      const minerIndex: number = sortedAppearance.indexOf(miner);
      sortedAppearance.splice(minerIndex,1);

      const arrayLenght: number = sortedAppearance.length;

      const symbol: Symbols = !Array.isArray(minest.symbol) && Array.isArray(miner.symbol) ?
        [minest.symbol, miner.symbol] : [miner.symbol, minest.symbol];

      const p: number = ( minest.p*100 + miner.p*100 ) / 100;

      sortedAppearance[arrayLenght] = {symbol, p};
    }

    return sortedAppearance[0].symbol;
  }

  // バイナリツリーに対して、再起的にバイナリを割り当てて符号化していくメソッド
  public static diver(symbols: Symbols, binary: string): void {
    const firstSymbolIsArray: boolean = Array.isArray(symbols[0]);
    const secondSymbolIsArray: boolean = Array.isArray(symbols[1]);

    if (!firstSymbolIsArray) {
      this.toEncodeMap[symbols[0]] = binary + "1";
    }
    if (!firstSymbolIsArray && !secondSymbolIsArray) {
      this.toEncodeMap[symbols[1]] = binary + "0";
      return;
    }
    if (!firstSymbolIsArray && secondSymbolIsArray) {
      return this.diver(symbols[1], binary + "0")
    }

    return this.diver(symbols[0], binary + "1"), this.diver(symbols[1], binary + "0");
  }

  // 符号化をするための前段となるメソッド
  public static encode(packedAppearance: AppearanceArray): EncodedMap {
    const firstBinary: string = "";

    this.toEncodeMap = {};

    this.diver(packedAppearance, firstBinary);

    return this.toEncodeMap;
  }

  // 新しいHuffmanクラスを生成するメソッド
  public static createNew(props: CreateHuffmanProps): Huffman {
    const letterDistribution: LetterDistribution = props.letterDistribution;
    const chars: string[] = this.createChars(letterDistribution);
    const appearance: Appearance = this.createAppearance(chars);
    const packedAppearance: AppearanceArray = this.createPackedAppearance(appearance);
    const encodedMap: EncodedMap = this.encode(packedAppearance);

    console.log(letterDistribution, chars, appearance, JSON.stringify(packedAppearance));

    return new Huffman({
      letterDistribution,
      appearance,
      packedAppearance,
      encodedMap,
    });
  }
}


const letterDistribution: LetterDistribution = {
  "A": 50,
  "B": 20,
  "C": 10,
  "D": 8,
  "E": 5,
  "F": 4,
  "G": 2,
  "H": 1,
};

const huffman: Huffman = Huffman.createNew({letterDistribution});

console.log(huffman.encodedMap);
~~~
<br>

## 所感

　処理速度より、可読性を意識した(可読性が高いとは言っていない)。
第一処理速度を意識するならCとかRustで書きますわな。処理速度が大事なアルゴリズムだけども。

　TypeScriptになれていなくて、型が大分酷い。any使ってごめんなさい。
それに、プロパティごとでファイル区切ってValueObjectにした方が良かったと思うが、
当初ここまでファイルでかくなると思わなかったし、そこまでやるつもりもなかった。
余裕があったらアップデートします。
`,c=`
## 天才たちの築いた分野「情報理論」

　ウィーナとシャノンが確立したと言われる分野である。
通信に関して根深いイメージを持たれそうなものであるが、
その実は数学的学問そのものである。

　あらゆる分野において共通した領域があり、その領域に関して、
プログレッシブな観点で、差異が生じることを嘆かわしく思い、
ウィーナはこれがモチベーションであったのではないかと言われている。

　基本コンセプトはシャノンによって提唱されたものを基に確立されている。
シャノンの通信モデルと言われるものである。
汎用的な概念を抽象化し、モデル化して定式化した。
コンピュータをやる人間にとっては尊敬の対象である。


## 情報量とエントロピー

　情報工学専攻の学生ならば、絶対に知っているものであると思うが、
一応述べておくと、情報量自体はエントロピーではない。

### Definition. (情報量)

---

　確率事象Eが生起したことを知ったとき,

~~~math
I(E) = -\\log_2P(E)　[bit]
~~~

の __情報量__ (amount of information) を受け取ったという.

---

　例えばサイコロの目が偶数であるという事象 $E_1$ は

~~~math
P(E_1) = \\frac{1}{2}
~~~

よって

~~~math
I(E_1) = -\\log_2\\frac{1}{2} = 1　[bit]
~~~

これから考えると、確率が増える毎に情報量は減少することがわかる。

### Definition. (エントロピー)

---

　離散的情報源 $S$ で, 出力シンボルを一つ知らされる毎に, 受け取る情報量の期待値を,

その情報源の __シンボルあたりの平均情報量__ (average amount of information per symbol) あるいは __エントロピー__ (entropy) とよび, 
これを $H(S)$ で表す.

　特に記憶のない離散的情報源では,

~~~math
H(S) = \\sum_{i=0}^{r}P(s_i)\\log_2\\frac{1}{P(s_i)}　[bit / symbol]
~~~

である.

---

　エントロピーとは熱力学の言葉で、力学系の有する無秩序さの度合いを表す量である。
統計力学的見地では、断熱的可逆変化においては系全体のエントロピーは不変に保たれる。
断熱的不可逆変化では、系全体のエントロピーは絶対的に増大する。聞いたことあるでしょう。


## なんで"log"なんだろう

　理系ならばここで疑問に思わなくてはいけないことがある。
何でlogを用いて情報量を定義しているのか。
まず情報量を定義したいとなったときに、どういう感じになると嬉しいか考えると自然に理解できる。
ある関数を採用する上で、以下の性質を満たさないといけない。

- 単調減少連続性
- 加法性を満たす

その上で「log、あなたでなければ私生きていけないの」と言わせなければならない。

---

### Theorem.

　$I$ を $P$ のみの関数 $I(P)$ とするとき,

- (i) $I(P)$ は $P$ の単調減少連続関数
- (ii) $P_3=P_1・P_2$ とするとき,

~~~math
I(P_3)=I(P_1)+I(P_2)
~~~

なる2つの条件を満たす関数は

~~~math
I(P)=-k\\log_2P
~~~

に限られる.ここで $k$ は正の定数である.

---

証明は今度書く。

## あとがき

　KaTeXをNuxtに組み込んでみたが、フォントがキモいのでどうにかしたいなあ。

## 参考文献

　非常に良書。[情報理論 (電子通信大学講座 第 39巻) (日本語) 単行本 – 1979/12/1 宮川 洋 (著)](https://www.amazon.co.jp/%E6%83%85%E5%A0%B1%E7%90%86%E8%AB%96-%E9%9B%BB%E5%AD%90%E9%80%9A%E4%BF%A1%E5%A4%A7%E5%AD%A6%E8%AC%9B%E5%BA%A7-%E7%AC%AC-39%E5%B7%BB-%E5%AE%AE%E5%B7%9D/dp/4339001023)
でもちょっと誤植あるので注意。
`,d=`
## 前書き
　この記事は私が __「React」__ を学ぶために「LightsOutゲーム」を制作し、その過程で獲得したエクスペリエンスを共有するものである。
前提知識としてJavaScriptの基本的な知識を要求する。  
　この記事の重要なワードを列挙すると以下のようになる。

- LightsOut
- React
- Threejs

## LightsOutとは
　N×Nの形に並んだライトをある法則にしたがって「すべて消灯 (lights out)」させることを目的としたパズルのこと。
> https://ja.wikipedia.org/wiki/ライツアウト

**ある法則:**

- ライトの反転とは状態遷移のことであり、消灯状態であれば点灯状態に変化すること、また点灯から消灯への遷移を含むものとする
- あるライトを選択し、そのマスと上下左右の隣一マスのライトを反転することができる

プログラムコードに落とし込むと以下のようになる。
~~~typescript
// N: マスの数
// x, y: 選択された位置を示す
// statusLights: ライトの状態を格納する二次元配列

// 選択箇所の反転
statusLights[x][y] = ~statusLights[x][y] & 1;

// 上下左右の反転
[[1,0],[0,1],[-1,0],[0,-1]].forEach((add) => {
  // マスからはみ出ない範囲で反転の処理をする
  if(0<=add[0]+x && add[0]+x<N && 0<=add[1]+y && add[1]+y<N) {
    statusLights[add[0]+x][add[1]+y] = ~statusLights[add[0]+x][add[1]+y] & 1;
  }
});
~~~

**余談:** 気付きとして、「ある同じライトを偶数回選択したときに、状態は元に戻る」という定理が導かれる。

つまり同じ箇所を二度選択することは、選択する前の「元に戻る」操作なので、無駄ということになる。

## React
　JavaScriptのライブラリ。
> https://ja.reactjs.org/

## ThreeJS
　JavaScript3Dライブラリ。今回使ったのは、ThreeJSおよびreact-native用のReactレンダラーの**"react-three-fiber"**というものである。
> https://github.com/pmndrs/react-three-fiber

<center>
<img alt="" width="" height="" style="max-width: 400px;" src="https://camo.githubusercontent.com/632c34fc980c96c6aa6e8317fa2d3567e37c2ece0a8ad12c3c13b700d074562c/68747470733a2f2f692e696d6775722e636f6d2f53485068496c732e676966"></img>
<img alt="" width="" height="" style="max-width: 400px;" src="https://camo.githubusercontent.com/8811bfbd8a64ae0fd0a68fc486d9d39c64828eb2dccee73af57bb18b18911897/68747470733a2f2f692e696d6775722e636f6d2f64614a494456452e676966"></img>
<img alt="" width="" height="" style="max-width: 400px;" src="https://camo.githubusercontent.com/6c567b130ef83a0fa77b6651a16e71a9d539fd58e897533e68cc44dc9f878a79/68747470733a2f2f692e696d6775722e636f6d2f587363735767752e676966"></img>
</center>

以下の **&lt;Canvas&gt;コンポーネント** や **useFrameカスタムフック** を用いることで大体のやりたい事ができると考えている。

~~~typescript
import { Canvas, useFrame } from 'react-three-fiber'
~~~
<br>

## 課題となった点

---

### 1. カメラ視点をドラッグで制御する方法

---

　ThreeJSに含まれる[OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)を用いる。

react-three-fiberで用いる際は以下のように書くことで実現した。

~~~javascript
import { useEffect } from 'react';

import { extend, useThree } from 'react-three-fiber';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

// &lt;Canvas&gt;タグの中で用いるコンポーネント
const CameraController = () => {
    const { camera, gl } = useThree();
    const cameraDistance = 700;
    useEffect(() => {
            const controls = new OrbitControls(camera, gl.domElement);
            camera.position.set(0, 0, cameraDistance);
            controls.minDistance = 0;
            controls.maxDistance = 1000;
            return () => {
                controls.dispose();
            };
        },
        [camera, gl]
    );
    return null;
};

export default CameraController;
~~~


> 参考文献: https://qiita.com/Quarter-lab/items/151f06bddea1fc9cf4d7

---

### 2. スマホでのタッチイベントが動作しない問題

---

　**OrbitControls.js**というファイルの**onTouchStart**関数内における

<center>
**event.preventDefault()**
</center>

が原因であった。

対応として、所定の箇所をコメントアウトすることで動作するようになった。　
> https://github.com/mrdoob/three.js/blob/dev/examples/jsm/controls/OrbitControls.js#L1024

公式の見解でも、コメントアウト対応をしてくれと解釈できるコメントがある。
> https://github.com/mrdoob/three.js/issues/16254#issuecomment-483340392

なぜ「**event.preventDefault()**」が必要なのか語られている。
> https://github.com/mrdoob/three.js/pull/18612#issuecomment-585607781

---

### 3. 各マスのタッチイベントとプロパティ伝搬に関する課題

---

　例えば、mesh_1をクリックした時にmesh_xのライトを反転させる、タッチイベント発生時の状態遷移伝搬の課題、

mesh_1, mesh_2, ...それぞれの現在の点灯状態を管理する、全データの状態管理の課題、

以上の課題を解決した方法を以下に述べる。

> meshをuseRef()で定義する。

~~~typescript
<Canvas>
  <CameraController>
  <Mesh_root>
    <mesh_1
      onClick={() => {setState(state)}}
      state={state}
    />
    <mesh_2/>
    ...
    <mesh_x/>
    ...
    <mesh_n*n/>
  <mesh/>
</Canvas>
~~~

**方針:** 各マス全ての状態(state)を**Mesh_root**で管理する。
meshのonClick()が発火した際に、onClick内でステートフックを呼び出し、プロパティを更新して、更新したプロパティをmesh_xに渡して、状態管理をする。

## 完成したもの

> リンク: https://zodiac-g12.github.io/lightouts/

ライツアウトの実装はインターネット上によくあるが、
私の実装では差別化を主張できる点がある。
「SHOW ANSWER」というボタンをクリックすることで、全部消灯するのに必要な、タップするべき場所のマス(ブロック)が回転するという機能である。

回答を求めるアルゴリズムについては、線形代数の初歩的な素養を要求し、複雑で長くなってしまうため今回は割愛する。
`,m=`
## きっかけ
　ひろゆきさんとひげおやじさんのいちゃいちゃてぇてぇ動画を見ていて懐疑的になったので記事を書くことにした。
https://www.youtube.com/watch?v=ddfOSHMpVi8

　論理破綻と言うものの、実際のところ私が勝手に論理演算子を導入していて、本来ロジカルなテーブルで捌くべき題材ではないし、
凄まじく無粋な真似をしているのでご了承いただきたいと釘を刺しておく。
そもそもこの人たち酔っぱらっているであろうから、おかしいのは私。
日々の感性と感覚を記憶に残したいので、メモ書き程度のものとして見てもらえるといいかと思う。

## テーマ「共感したい」
　ひげおやじさんがお酒を一緒に飲みたいモチベとして「共感したい」を挙げた。
これを聞いて私は「おかしくない？」とふと思った次第である。

## おかしい点

- 共感に至るまでの不確定性を無考慮している点
- 「ひろゆきさん」の「感性」を無考慮している点(ここでの感性は「共感する/しない」を決定づける変数として定義する)
- 「共感すること」が「共感する内容」に先立っていて順序がおかしい

## 未来の現象の不確定性-一意に定まらない-
　「お酒を一緒に飲む」から「共感」に至るまでが **一意的に定まら(well-definedで)ない** はずであり、この点がまずおかしい。
「俺はうまい」けど「お前は不味いんだね」といったようになりえるし、未来の現象が決定付けられていない。
未来の現象を予測するためには定義や、考慮するべき変数の数があまりにも足りない。

　そもそも「うまい」「不味いけど飲みたくなる」「コクが深いがおいしくない」「酸っぱくて美味しい」など組み合わせは無数にあり、
それを的中させるには「以前同じ酒を飲んで私とこの人は共感していた」や
「酒が美味しくなるシチュエーション(最高のつまみ等の準備が済み)がセッティングしてあるので、この人なら美味しいと言うに違いない。私も以前飲んで美味しいと思っている」
等の打算的な何かが必要であるが、実際のところ最高に親しい友人で考えるとしても、難しい問題である。

　また、ワインは温度や保存状況で味が変わるので、以前もし飲んだことがあっても、状態を再現するのは困難。
また、人間側にも体調や気分などのコンディションが存在するので、これも無視できないファクターであるからである。

## 他人の感性からも予測困難

　「ひろゆきさんの感性」が考慮済みかどうか。
またもし、「ひろゆきさんの感性」と「自分(ひげおやじさん)の感性」を照合しても、あるワインを飲んだ時に「共感するであろう」という結論に至るのは非常に困難。
「まずいとは言わないであろう」という補集合的な推論も、共感しているかどうかまでは至れないはずである。
例として「酸っぱくて美味しい」と「酸っぱくはないが美味しい」など。以前も飲んだことあるワインだったりすれば別であるが。

## 「共感する」が先で「味わう」が後になっている問題

　共に「味わいたい」や「飲みたい」ではなく、**「共感したい」** が先立つことの意味するところ、味を評価する以前に発生している動機であるという点。
これはバイアスとなりうるのではないかと考える。後の味の評価が下される際に影響を及ぼすことを示唆する。
ひろゆきさんが「おいしい」といえば「おいしい」と **「言ってしまえる」** し、自分を騙すこと、自己暗示によって妥協的な帳尻合わせが可能となってしまう。
なぜならば「味わう」ことよりも「共感する」ことの方が重要(優先、先)だからである。
これは非常にずるくて、後出しジャンケンのようである。
強引かもしれないが、「後からあなたと同じことを言いますよ」の前振りとも、
「私はあなたにとってのイエスマンですよ」宣言ともとれるのではなかろうか。
これがもし私がひろゆきさんだとしたら、
「あ、この人は嘘をつく人なんだな、信用できないな」と判断してしまうかもしれない。

## 結論
　そもそも「共感」ってそんなに簡単にできるものではないのに、「共感したい」っておかしいよなという話。
「共感」って同じ行動指針をとっていた人々の間で「偶発的に」起こる「同じスペクトルに近似できる感情」だと思うので、
行動指針を取る前に先立つ感情としては「期待値が低い」ので、合理的じゃないなと思った次第である。

　ひろゆきさんも私と同じようなことを言っていて、動画の最後の方でひげおやじさんがひろゆきさんに「さてはお前モテないな〜？W」
と言っていたが、まったくもっておっしゃる通りである。さーせん。
`,h=`
## 想定読者
　Reactをある程度理解していて、興味がある人。Chart.jsに興味がある人
## 使用技術
- [React](https://ja.reactjs.org/)
- [Chart.js](https://www.chartjs.org/)([react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2))

## 内容
- ReactとChart.jsのちょっとしたコード解説
- Chart.jsでのグラフの横幅をレスポンシブに調整する手段

## 長くて読まないよ
- アプリ: https://zodiac-g12.github.io/crysistear/
- ソースコード: https://github.com/zodiac-G12/crysistear

## 動機
　以前自分で作っていた都内コロナ感染者数のアプリに関して、課題が幾つかあったので、改善にトライした

## 課題
- 初回サイト内でグラフの全てが表示出来るようにサイズ調整
- グラフの幅の調整がユーザーの手で出来るようにスライダーの実装

## ソースコード

~~~typescript
import React, { useState, useEffect } from 'react';
import Chart, { Bar } from 'react-chartjs-2';
import axios from 'axios';

const getData = async (setData, setLook) => {
  try {
    const res = await axios.get("https://raw.githubusercontent.com/tokyo-metropolitan-gov/covid19/master/data/daily_positive_detail.json");
    const json = res.data;
    console.log(json);
    const jsonData = json.data;
    const dates = jsonData.map(item=>item.diagnosed_date);
    const counts = jsonData.map(item=>item.count);
    console.log(dates, counts);

    const data = {
      labels: dates,
      datasets: [
        {
          label: "COVID-19 in TOKYO",
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: counts
        }
      ]
    };

    setData(data);
    setLook({date: json.date, count: counts.slice(-1)[0]});
  } catch (err) {
    console.error(err);
  }
};

function App() {
  // 感染者の過去全データ
  const [data, setData] = useState({});
  // 今日の日付・感染者数
  const [look, setLook] = useState({date: "", count: null});
  const [range, setRange] = useState(0);

  useEffect(() => {
    getData(setData, setLook);
  }, []);

  return (
    <>
      <h2
        style={{
          position: "fixed",
          width: "100vw",
          textAlign: "center",
          color: "black",
          fontSize: "5vh",
        }}
      >
        {look.date.split(" ")[0].replace("/", "年 ").replace("/", "月")+"日"}
      </h2>
      <h1
        style={{
          position: "fixed",
          width: "100vw",
          textAlign: "center",
          color: "crimson",
          fontSize: "10vh",
          top: "8vh",
        }}
      >
        <a style={{fontSize: "5vh", color:"black"}}>感染者 </a>
        {look.count}
        <a style={{fontSize: "5vh", color:"black"}}> 人</a>
      </h1>
      <div style={{width: \`\${100 + 700 * (range / 100)}vw\`, height: "50vh", overflowX: "scroll", overflowY: "hidden", paddingTop: "30vh"}}>
        <Bar
          data={data}
          width={window.innerWidth + (1 + 7 * (range / 100))}
          redraw={true}
          height={window.innerHeight * 0.5}
          options={{
            responsive: true,
            maintainAspectRatio: false
          }}
        />
      </div>
      <div style={{position: "fixed", width: "100vw", textAlign: "center", marginTop: "5vh"}}>
        <input type="range" id="dataRange" name="dataRange" min="0" max="100" value={range} step="1" onChange={(e)=>setRange(parseInt(e.target.value))} />
        <label htmlFor="dataRange">Range</label>
      </div>
    </>
  );
}

export default App;
~~~
<br>
## ソースコード解説

- getData()
  - [東京都 新型コロナウイルス感染症対策サイト](https://github.com/tokyo-metropolitan-gov/covid19)のRepositoryにあるデータをaxiosを使って取得
  - データを[Chart.jsの形式](https://www.chartjs.org/docs/latest/getting-started/usage.html)に整形
  - 引数として受け取ったReactフックを使ってデータを更新(登録)

- &lt;Bar&gt;コンポーネント
  - data: 描画するデータを渡す
    - labels: X軸の値
    - datasets.data: Y軸の値
  - redraw: Boolean、trueのときに更新されたタイミングでもう一度描画アニメーションが挿入される
  - height: 固定
  - width: rangeの値が更新されるごとに長さが再調整され更新される
  - [options](https://www.chartjs.org/docs/latest/general/responsive.html)
    - responsive: Boolean、プロパティが更新されたときに、レスポンシブに変更されるかどうかの値、ここをfalseにするとグラフが横に伸びない
    - maintainAspectRatio: Boolean、今回は横幅だけ伸ばしたいのでfalse、trueにすると縦も伸びてしまう

- inputタグ
  - MDNを参考にしながら実装、https://developer.mozilla.org/ja/docs/Web/HTML/Element/input/range

## 改善した点
　高さを固定にして、グラフ以外の要素をfixedにした。それに伴って一旦 mata viewport を user-scalable: none にしていて、
これはUXの観点で非常にまずいので、今後直したい。

　BarコンポーネントはCanvasタグに変換されるが、これをdivタグで囲い、両方の要素の横の長さをrangeの値を使って調整することで、
グラフの横幅調節を可能にした。この点をあまり理解しておらず、謎挙動に感じたので、今後調べてまとめたい。

## 感想
　パフォーマンス改善はしたものの、結構汚いコードなので、リファクタの余地ありだと感じている。
わかったこととしては、react-chartjs-2も所詮はChart.jsのラッパーであるが、なんにしてもChart.jsの公式ドキュメントが読みづらくてかなわなかった。
非常に有用性のあるツールなだけに残念。stackoverflowなどや公式issueでも露頭に迷っている人が多く見られた。
こういう人たちのためにも、自分がアウトプットするか、contributeしたい。
`,u=`
## 問題
　EN: A leaf is torn from a paperback novel. The sum of the numbers on the remaining pages is 15000.
What are the page numbers on the torn leaf.

　JP: 本から1枚の紙が破れています。残りのページ数の合計は15000です。
破れた紙のページ番号は何でしょうか？

> RMO-1994: https://www.isical.ac.in/~rmo/papers/rmo/rmo-1994.pdf

## TLDR

- [解導出プログラム](https://github.com/zodiac-G12/rmo/blob/master/src/main.rs)

## 解法

　以下の手順で解を導く。

1. ページ数の合計を使って、その本のおおよその最大ページ数を導く
2. おおよその最大ページ数は__小数が含まれる__(例えば173.3とかな)ので、天井(173.3->__174__)と床(173.3->__173__)の数字 __(173,174)__ を用意する
3. (2)の手順で導いた最大ページ数からページ数の合計のペアを導く
4. (3)の手順で導いたページ数の合計から当初の目的のページ数の合計(例えば15000)を引く
5. (4)の手順で導いた数を2で割って天井と床の数字のペアを用意する
6. (5)の手順で導いたペアの床が2の倍数でないものが答えとなる

## コード

~~~rust
fn boundary_max_page(x: i64) -> [i64; 2] {
    let ans_float: f64 = ((x * 2) as f64).sqrt();

    return [ans_float.floor() as i64, ans_float.ceil() as i64];
}

fn total(n: i64) -> i64 {
    return (n*(n+1)/2) as i64;
}

fn main() {
    let n: i64 = 15000;

    let max_pages = boundary_max_page(n);

    for max_page in max_pages.iter() {
        let mut total_page: i64 = total(*max_page);
        let mut taked_max_page = *max_page;
        let diff: f64 = (total_page - n) as f64;
        let diff_dived: f64 = diff / 2.0_f64;
        let mut candidates: [i64; 2] = [diff_dived.floor() as i64, diff_dived.ceil() as i64];
        if total_page == n {
            total_page += max_page+1 + max_page+2;
            candidates = [max_page+1, max_page+2];
            taked_max_page += 2;
        }
        if candidates[0] % 2 == 0 {
            continue;
        }
        println!("max page: {}", taked_max_page);
        println!("total page: {}", total_page);
        println!("diff: {}", diff);
        println("diff_dived: {}", diff_dived);
        println!("candidates: {:?}", candidates);
    }
}
~~~

<br>

## コードの解説
- boundary_max_page(): 手順(2)に相当する操作
- total(): 手順(3)に相当する操作
- diff: 手順(4)で得られる値
- candidates: 手順(5)で得られる数字のペア

### "candidates[0] % 2 == 0" について - 手順(6)の詳細
　ページというのは1から始まり、紙の左下に1,3,5,...と__奇数__が現れるものであるため、
偶数が現れるパターンは答えとなりえないため、答えの候補として切り捨てる

### "if total_page == n"について
　当初の目的のページ数の合計と改めて用意したページ数の合計が一致した時、
最終ページの+1と+2が答え候補とするという操作である。

　例えば目的のページ数が15000じゃなくて300だとすると、
改めて用意したページ数の合計も300となる。
そうするとcandidatesの値としては __[0,0]__ を取ることとなってしまう。

　ここで、最終ページの後ろに紙を一枚付け足してやると、辻褄があって、
__「引き抜かれたページは最終ページの後ろの紙のページだね」__となる。

　したがって、最終ページの+1,+2した値それぞれを解答候補として保存する必要がある。

## 所感
　この問題を総当たりのような手法で解いている人がたくさんいて悲しくなってしまった。
私のこのプログラム(アルゴリズム)は、15000に限らず、一般化されているので、
どんなページ数に対しても解を導くことができるはず。

　しかしながら、どちらかというとRustの訓練感が強かった。
TypeScriptのノリでRustもクラス作ってメソッドはやしてやろうと思ったが、
調べたりして試してみたが、結局思うようなプログラムが書けなくて諦めてしまった。
訓練をもっと積んでいきたい所存である。
`,b=`

## Rustのコード

~~~rust
use std::io;

fn main() {
    let mut input = String::new();
    match io::stdin().read_line(&mut input) {
        Ok(n) => {
            let s: Vec<&str> = input.trim().split(" ").collect();
            let c0: &str = &s[0];
            let c1: &str = &s[1];
            let i: usize = c0.parse().unwrap();
            let j: usize = c1.parse().unwrap();
            println!("{} bytes read", n);
            println!("{}", i + j);
        }
        Err(error) => {
            println!("error: {}", error);
        }
    }
}
~~~
　

## 実行例

~~~sh
$ cargo run
12 27
6 bytes read
39
~~~
`,g=`
## Rustのコード

~~~rust
fn fibd(n: u32) -> i128 {
    match n {
        0 | 1 => 1,
        _ => {
            let mut a = 1;
            let mut b = 1;

            for _ in 1..n/2+1 {
                a += b;
                b += a;
            }

            match n%2 {
                0 => a,
                _ => b
            }
        }
    }
}

fn main() {
    println!("{}", fibd(183));
}
~~~
　

## 実行例

~~~sh
$ cargo run
127127879743834334146972278486287885163
~~~
　
## 追記(こちらの方が個人的に好き)

__fibd__ を書き換えてみる

~~~rust
fn fibd(n: u32) -> i128 {
    let mut fiba: [i128; 2] = [1; 2];
                     
    for _ in 1..n/2+1 {                                      
        fiba[0] += fiba[1];                     
        fiba[1] += fiba[0];                     
    }                              
            
    fiba[(n%2) as usize] 
} 
~~~
`,f=`
  ## 経緯
　去年からReactでずっと作っていたTODOアプリがあって、
途中で飽きたので、そのまま似たような機能のものをSvelteで実装した。

　課題観としては、trelloなどを想像して、使い勝手の悪いところ、
もっとこうだったらいいのになという箇所に着目して、機能を実装したものである。

## TLDR

- [出来上がったアプリ](https://zodiac-g12.github.io/palladocs/)
- [ソースコード](https://github.com/zodiac-G12/palladocs)

## 課題となった箇所一覧

- プロパティ受け渡し
- イベント伝搬
- Modalの実装
- DnDの実装

## プロパティ受け渡し

　例えば以下のように、「__answer__」というプロパティを受け渡し出来る。
渡す側は __{}__ でプロパティ名を囲って渡す。
受け取る側は「__export let__」で変数を宣言することで受け取ることが出来る。

App.svelte　
~~~js
<script>
  import Nested from './Nested.svelte';
  const answer = 42;
<\/script>

<Nested {answer} />
~~~

Nested.svelte
~~~js
<script>
  export let answer;
<\/script>

<p>The answer is {answer}</p>
~~~

> Svelteのサンプル: https://svelte.dev/tutorial/default-values

## イベント伝搬

　色々と手段はあると思う。
まず大元のコンポーネント、ルートコンポーネントにて、イベントが発火した際に処理したい関数と、
変更を加えたいデータを用意しておく。

　その上で、子コンポーネントに用意した関数とデータをプロパティとして渡す。
子コンポーネントでイベントを検知して、その際に用意した関数と、データを使って、
状態を変えるという方法をとった。

　イベントの検知は以下のように「__on:〇〇__」と書き行う。

~~~js
<script>
  function handleClick() {
    alert('clicked');
  }
<\/script>

<button on:click={handleClick}>
  Click me
</button>
~~~

> Svelteのサンプル: https://svelte.dev/tutorial/event-modifiers

## Modalの実装

　Modalに関してModalコンポーネントのサンプルコードをそのまま採用した。

> Modalのサンプルコード: https://github.com/flekschas/svelte-simple-modal/blob/v0.8.0/src/Modal.svelte

> Svelteのサンプル: https://svelte.dev/repl/033e824fad0a4e34907666e7196caec4?version=3.4.1

　Modalコンポーネントの使い方としては以下のようにラップする形で用いる。

~~~js
<Modal>
  <Board />
</Modal>
~~~

　Modalを開くロジックは以下のようにする。なおこのコンポーネントはModalコンポーネントの内側になければならない。

> https://github.com/flekschas/svelte-simple-modal/issues/16#issuecomment-641413134

Board.js
~~~js
<script>
import Popup from './Popup.svelte';

const { open } = getContext('simple-modal');

const showPopup = (num) => {
  // 以下のnumのように、Popupコンポーネントを開くと同時に、propでデータを渡せる
  open(Popup, { num });
};
<\/script>

<div on:click={showPopup(100)}></div>
~~~

<br>

## DnDの実装

　ドラッッグアンドドロップの実装が一番の難関であったが、なんとか直感的なUXを実現できたかと思う。
スマホの場合の挙動方針を今迷っているが、PCの挙動はほとんど満足しているものとなっている。

　[svelte-dnd-action](https://github.com/isaacHagoel/svelte-dnd-action)というライブラリを用いることでDnDを実現した。
　注意点としては、Modalのイベントと競合してしまってうまく動作しない箇所があったので、
Modal.svelteの[134行目](https://github.com/flekschas/svelte-simple-modal/blob/v0.8.0/src/Modal.svelte#L134)「__event.preventDefault()__」をコメントアウトすることでうまく動くようになった。

> Svelteのサンプル: https://svelte.dev/repl/b4ac32e84dc24c079d7a5c243f787d26?version=3.32.1

## 成果

　実際の見た目は以下のようになる。

- [ソースコード](https://github.com/zodiac-G12/palladocs)
- [実際のサイト](https://zodiac-g12.github.io/palladocs/)

<picture>
  <source type="image/webp" srcset="/blog/palladocs_screen.webp">
  <img alt="" src="/blog/palladocs_screen.png" decoding="async" style="width: 100%; margin: auto;border: none; box-shadow: none;"></img>
</picture>

<br>

## 所感
　Svelteは超軽くて早いのでいいなと思った。
そして自由度が高い。実用回りも続々と出来上がってきていて、今後に大いに期待している。

　今後このアプリをアカウントログイン制にして、Firebaseなどを用いてデータベースも作って、Apolloとかと連携しても面白いなと考えている。

　あとは、スマホ版サイトのUXを改善したい。改善出来そうだよという人はコメントしてくださると嬉しい。妙案があれば賜りたい。
`,y=`
## 想定読者
　JavaScriptの基本が分かる人。JavaScriptに興味がある人。Slideアプリを自作したい人。Svelteが気になっている人。

## 使ったもの

- Svelte
- marked-katex

## 話す内容

- marked-katexの紹介
- Svelteの紹介
- Svelteアプリの作成手順の紹介

## 長くて読まないよという人に

- サイト: https://zodiac-g12.github.io/SVIDE/
- ソースコード: https://github.com/zodiac-G12/SVIDE

## marked-katex

　あまりメジャーではないので、個人的に愛用しているので盛り上がるといいなと思っている。
以下は公式から引用したmarked-katexの説明。

> JavaScriptで記述されたフル機能のマークダウンパーサーおよびコンパイラー。スピードのために作られました。この(markedからの)フォークバージョンは、マークダウンで数式を記述できるKatexをサポートしています https://github.com/linxiaowu66/marked-kaTex

[katex](https://katex.org/) とはMathJaxより高速なLaTeXのような数式を記述するためのツール。

大学で理系だった人はLaTeXで論文を書いたりしたと思う。

このブログも実はmarked-katexを使用している。

~~~latex
\`$$H(S)=\\sum_{i=0}^{r}P(s_i)\\log_2\\frac{1}{P(s_i)}　[bit / symbol]$$\`
~~~
上のように書くと以下のような数式に変換される。
\`$$H(S)=\\sum_{i=0}^{r}P(s_i)\\log_2\\frac{1}{P(s_i)}　[bit / symbol]$$\`

しかしながら、今回は数式は使わないので、markedでも可である。
あくまでチラ見せの紹介に留めておく。

## Svelteの3つの原則

　以下の三つを謳っている。

- [**Write less code**](https://svelte.dev/blog/write-less-code)

>「Build boilerplate-free components using languages you already know — HTML, CSS and JavaScript」

>「HTML, CSS, JavaScriptでボイラープレートフリーなコンポーネントをビルドする」

- [**No virtual DOM**](https://svelte.dev/blog/virtual-dom-is-pure-overhead)

>「Svelte compiles your code to tiny, framework-less vanilla JS — your app starts fast and stays fast」

>「フレームワークレスな小さなバニラJSにコンパイルし、とても高速に動作する」

- [**Truly reactive**](https://svelte.dev/blog/svelte-3-rethinking-reactivity)

>「No more complex state management libraries — Svelte brings reactivity to JavaScript itself」

>「JavaScript自体に反応性をもたらし、これ以上複雑な状態管理ライブラリを要しない」

## Svelteの世界的評価

　Front-end Frameworksのランキングで2020年において満足度、興味、利用率、認知度に関して1位を獲得している。

> https://2020.stateofjs.com/en-US/technologies/front-end-frameworks/

## Slideアプリ作成の手順

1. Svelteテンプレート作成
2. Svelteの公式のSlide実装例から拝借する
3. markedのインストール
4. markdown対応に修正

## Svelteテンプレート作成
　以下のコマンドを実行。めちゃくちゃ早くてすぐにでも始めることができる。
~~~bash
npx degit sveltejs/template my-svelte-project
# or download and extract 
cd my-svelte-project
# to use TypeScript run:
# node scripts/setupTypeScript.js

npm install
npm run dev
~~~

> 公式ドキュメント: https://svelte.dev/

## Svelteの公式のSlide実装例から拝借する
　[このページ](https://svelte.dev/repl/0add35f59c6148cc8e5a415b2e38c83a?version=3.12.1)
のソースコードをコピペする。
> 余談: Svelteは意外とExampleが充実していて、やりたいこと知りたいことでググるとまず出てくる。

> 公式の実装例一覧: https://svelte.dev/examples#hello-world

## markedのインストール
　以下を実行

~~~bash
npm i marked-katex --save
~~~
<br>

## markdown対応に修正

　まずmarkedのimport

~~~typescript
import marked from 'marked-katex';
~~~

　https://svelte.dev/repl/0add35f59c6148cc8e5a415b2e38c83a?version=3.12.1
の57行目

~~~typescript
{slide.content}
~~~

を

~~~typescript
{@html String(marked(slide.content))}
~~~

に修正。
> {@html ...}とは: https://svelte.dev/docs#html


## 成果

　できあがったものがこちら。
- サイト: https://zodiac-g12.github.io/SVIDE/
- ソースコード: https://github.com/zodiac-G12/SVIDE

## Svelteを触ってみた感想
　体感だが、めちゃくちゃ軽くて、めちゃくちゃ速い。

そして、プロパティ更新をReactのようにあまり気にしなくて良いので、非常に楽ちん。

記述するコードの量も非常に少なくて済むという、公式の主張にも納得がいった。
`,v=`
## WebP

Google先生が開発している画像フォーマットで、サイズがちっちゃくできる。

[WebPとは: Google Developers](https://developers.google.com/speed/webp)

[WebPの検証: Google Developers](https://developers.google.com/speed/webp/docs/webp_lossless_alpha_study#results)

## エンコードとデコード

[ツール: Google Developers](https://developers.google.com/speed/webp/download)

今回はこの中の __cwebp__ を用いる。

[ダウンロードリポジトリ: Google Developers](https://storage.googleapis.com/downloads.webmproject.org/releases/webp/index.html)

## 実際のコード

__static__ ディレクトリ直下の、png、jpg、jpeg拡張子の画像ファイルのWebP変換ファイルを __static__ ディレクトリの下に複製。

~~~bash
#!/bin/bash

for file in \`find ./static \\( -name \\*.png -o -name \\*.jpg -o -name \\*jpeg \\) -print\`; do ~/libwebp-1.1.0-mac-10.15/bin/cwebp "$file" -o "\${file%.*}.webp"; done
~~~
`,t="/flog/_server/assets/nuxt-BoX3Qszt.jpeg",e="/flog/_server/assets/rust-wide-DHd2Caji.jpg",w="/flog/_server/assets/webp-De25jKXI.png",_="/flog/_server/assets/git-wide-CfAGmbjQ.png",a="/flog/_server/assets/react-wide-Bldgd0BI.png",o="/flog/_server/assets/svelte-wide-Bv5f0Dtg.png",r="/flog/_server/assets/graphgl-wide-D9t44XIC.png",k="/flog/_server/assets/huffman-BStt8w7B.png",A="/flog/_server/assets/how-to-live-ChNzhcyS.png",x=[{title:"Svelte で TODO アプリを作った",img:o,date:new Date("2021/3/29"),id:"svelte-todo",markdown:f},{title:"数学オリンピックの問題をRustで解く",img:e,date:new Date("2021/3/23"),id:"rmo-with-rust",markdown:u},{title:"Huffman codeをTypeScriptで実装する",img:k,date:new Date("2021/3/17"),id:"huffman-typescript",markdown:p},{title:"GraphQL APIで悪意あるクエリの対策手段",img:r,date:new Date("2021/2/16"),id:"graphql-defense",markdown:n},{title:"React+Chart.js でコロナ感染者数を表示するアプリ作成",img:a,date:new Date("2021/2/15"),id:"react-chart",markdown:h},{title:"GraphQL APIでDBアクセスを大量に発生させる攻撃手法について",img:r,date:new Date("2021/2/10"),id:"graphql-how-to-attack",markdown:l},{title:"Svelte+marked でスライド作成",img:o,date:new Date("2021/2/8"),id:"svelte-marked",markdown:y},{title:"日常に潜む論理破綻の話",img:A,date:new Date("2021/2/7"),id:"logic-collapse",markdown:m},{title:"React + Three.js で LightsOut を作った",img:a,date:new Date("2021/2/2"),id:"lights-out",markdown:d},{title:"Commit AuthorとCommit Email変更",img:_,date:new Date("2020/10/12"),id:"change-commit-author-and-email",markdown:i},{title:"WebP変換シェルスクリプト",img:w,date:new Date("2020/10/12"),id:"webp-transformer",markdown:v},{title:"RustでFibonacci数の183番目",img:e,date:new Date("2020/10/11"),id:"rust-fibonacci",markdown:g},{title:"Rustで標準入力して二値加算",img:e,date:new Date("2020/10/11"),id:"rust-adder",markdown:b},{title:"情報理論の謎",img:t,date:new Date("2020/5/24"),id:"information-theory",markdown:c},{title:"Blogをシンプルにしたよ",img:t,date:new Date("2020/5/14"),id:"blog-new",markdown:s}];export{x as A};
