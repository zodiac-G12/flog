import{C as r}from"./Content-c91edaf0.js";import{a as n,c as s}from"./index-bf05256e.js";const p=`
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

　符号化しても一意的に__復号可能__である点。尚且つ、__平均符号長が最小__となる点。

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

\`\`\`typescript
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
\`\`\`
<br>

## 所感

　処理速度より、可読性を意識した(可読性が高いとは言っていない)。
第一処理速度を意識するならCとかRustで書きますわな。処理速度が大事なアルゴリズムだけども。

　TypeScriptになれていなくて、型が大分酷い。any使ってごめんなさい。
それに、プロパティごとでファイル区切ってValueObjectにした方が良かったと思うが、
当初ここまでファイルでかくなると思わなかったし、そこまでやるつもりもなかった。
余裕があったらアップデートします。
`,o=e=>{const t=n.find(a=>a.path==="content13");return s(r,{get isSP(){return e.isSP},get articleContents(){return{markdown:p,...t}}})};export{o as default};
