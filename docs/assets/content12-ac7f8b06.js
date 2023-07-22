import{a as r}from"./Content-cd17dac9.js";import{a as s,c as a}from"./index-c6a12b0a.js";const l=`
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
\`\`\`
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
\`\`\`

これに対処するために、コスト(Cost)或いは複雑性(Complexity)、ネストの深さという指標を用いて、レスポンスを切り分けるという方法がある。

　**graphql-cost-analysis**, **graphql-query-complexity** は上記のコスト或いは複雑性を定義し、閾値の超えたクエリに対してはエラーを返すという方法を提供する。

　**graphql-depth-limit** に関してはネストの深さで切り分けをする方法を提供する。

　具体的なコードを以下に書いていく。

## graphql-cost-analysis

\`\`\`typescript
import costAnalysis from 'graphql-cost-analysis';

export const defaultCost: number = 1;

export const costAnalyzer = (maximumCost: number) => costAnalysis({
  defaultCost,
  maximumCost,
  onComplete: (cost: number) => {
    console.log('Query Cost:', cost);
  },
});
\`\`\`
<br>

## graphql-query-complexity

\`\`\`typescript
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
\`\`\`
<br>

## graphql-depth-limit

\`\`\`typescript
import depthLimit from 'graphql-depth-limit';

export const depthLimiter = (maxDepth: number) => depthLimit(
  maxDepth,
  {},
  depths => console.log(depths)
);
\`\`\`
<br>

## ルールの適用
　以下のように **validationRules**に配列の要素として渡す。

> 公式ドキュメント: https://www.apollographql.com/docs/apollo-server/api/apollo-server/#validationrules

\`\`\`typescript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [
    depthLimiter(9),
    queryComplexier(10),
    costAnalyzer(10),
  ],
});
\`\`\`

<br>

## クエリに対する各値の検証例

\`\`\`
query {
  books {
    author {
      books {
        title 
      }
    }
  }
}
\`\`\`
=&gt;
Query Depth: 3,
Query Complexity: 4,
Query Cost: 4

\`\`\`
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
\`\`\`

=&gt;
Query Depth: 4,
Query Complexity: 9,
Query Cost: 9

\`\`\`
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
\`\`\`

=&gt;
Error: exceeds maximum operation depth of 9

\`\`\`
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
\`\`\`

=&gt;
Error: The query exceeds the maximum complexity of 10. Actual complexity is 11

　以上のことから、簡単な見分け方法として、「authors, id, title」などの単語の数が **Complexity, Cost** で、
「{}」のペアの数(ネストの深さ)が **Depth** であると分かる。

## おおよその問題解決とはなりうるが
　以上のことから、閾値を設けることで、ComplexityやDepthが100万といったクエリは防ぐことができる。
しかし、私はもっと簡単に「books->authors->books」や「books->authors->...->books->authors」という表現の含まれるクエリを特定で防げば良いと考えた。

## 特定表現のクエリのブロック

\`\`\`typescript
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
\`\`\`
「disallowCycle: true -> (shops -> authors -> shops)といった繰り返しを不正とみなす」
「disallowPattern: true -> (shops -> countries)といった表現が再び出現した際に不正とみなす」

挿入場所を以下に示す。

\`\`\`typescript
const resolvers = {
  Query: {
    books (parent, args, context, info) {
      // ここ！
      orginalRules(info, true, true);
      return books;
    },
    ...
\`\`\`
<br>

## 実際に動かしてみる

\`\`\`
query {
  books {
   	author {
      books {
        title 
      }
    }
  }
}
\`\`\`

Error: This is Looped Evil Query: beforeName: books, nowName: author, nextName: books

\`\`\`
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
\`\`\`

Error: Pattern is Already Exist: books -> author

　以上の実装はあくまでコンセプトなので、実用には耐え得ないので注意。
例として、

\`\`\`
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
\`\`\`

とやると上記のルールを通過してしまう実装になっている。
順当にやるなら、graphql-query-complexityの実装を参考にしたりしながら実装した方が良いであろう。
> selectionSet: [Apolloの公式ドキュメント](https://www.apollographql.com/blog/the-anatomy-of-a-graphql-query-6dffa9e9e747/)

## まとめ
　ドキュメントを読んで実際に手を動かして試してみることの大事さを実感した。
上記のクエリの繰り返しやパターンの防止の実装は、調べた限りなさそうだったので、
開拓者のような気分を勝手に味わったといった所感である。
`,p=e=>{const o=s.find(t=>t.path==="content12");return a(r,{get isSP(){return e.isSP},get articleContents(){return{markdown:l,...o}}})};export{p as default};
