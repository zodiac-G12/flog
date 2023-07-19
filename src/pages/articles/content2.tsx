import {Accessor} from 'solid-js';
import type {Component} from 'solid-js';
import {Content} from '@/components';
import {articles} from '@/articles';

const markdown = `
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

\`$$I(E)=-\\log_2P(E)　[bit]$$\`

の __情報量__ (amount of information) を受け取ったという.

---

　例えばサイコロの目が偶数であるという事象 \`$E_1$\` は

\`$$P(E_1)=\\frac{1}{2}$$\`

よって

\`$$I(E_1)=-\\log_2\\frac{1}{2} = 1　[bit]$$\`

これから考えると、確率が増える毎に情報量は減少することがわかる。

### Definition. (エントロピー)

---

　離散的情報源 \`$S$\` で,出力シンボルを一つ知らされる毎に,受け取る情報量の期待値を,
その情報源の __シンボルあたりの平均情報量__ (average amount of information per symbol) あるいは __エントロピー__ (entropy) とよび,
これを \`$H(S)$\` で表す.
　特に記憶のない離散的情報源では,

\`$$H(S)=\\sum_{i=0}^{r}P(s_i)\\log_2\\frac{1}{P(s_i)}　[bit / symbol]$$\`

である.

---

　エントロピーとは熱力学の言葉で、力学系の有する無秩序さの度合いを表す量である。
統計力学的見地では、断熱的可逆変化においては系全体のエントロピーは不変に保たれる。
断熱的不可逆変化では、系全体のエントロピーは絶対的に増大する。聞いたことあるでしょう。


## なんでlogなんだろう

　理系ならばここで疑問に思わなくてはいけないことがある。
何でlogを用いて情報量を定義しているのか。
まず情報量を定義したいとなったときに、どういう感じになると嬉しいか考えると自然に理解できる。
ある関数を採用する上で、以下の性質を満たさないといけない。

- 単調減少連続性
- 加法性を満たす

その上で「log、あなたでなければ私生きていけないの」と言わせなければならない。

---

### Theorem.

　\`$I$\` を \`$P$\` のみの関数 \`$I(P)$\` とするとき,

- (i) \`$I(P)$\` は \`$P$\` の単調減少連続関数
- (ii) \`$P_3=P_1・P_2$\` とするとき,

\`$$I(P_3)=I(P_1)+I(P_2)$$\`

なる2つの条件を満たす関数は
\`$$I(P)=-k\\log_2P$$\`
に限られる.ここで \`$k$\` は正の定数である.

---

証明は今度書く。

## あとがき

　KaTeXをNuxtに組み込んでみたが、フォントがキモいのでどうにかしたいなあ。

## 参考文献

　非常に良書。[情報理論 (電子通信大学講座 第 39巻) (日本語) 単行本 – 1979/12/1 宮川 洋 (著)](https://www.amazon.co.jp/%E6%83%85%E5%A0%B1%E7%90%86%E8%AB%96-%E9%9B%BB%E5%AD%90%E9%80%9A%E4%BF%A1%E5%A4%A7%E5%AD%A6%E8%AC%9B%E5%BA%A7-%E7%AC%AC-39%E5%B7%BB-%E5%AE%AE%E5%B7%9D/dp/4339001023)
でもちょっと誤植あるので注意。

`;

const Content2: Component<{ isSP: Accessor<boolean> }> = (props) => {
  const articleContents = articles.find(
      (article) => article.path === 'content2'
  );

  return (
    <Content
      isSP={props.isSP}
      articleContents={{markdown, ...articleContents}}
    />
  );
};

export default Content2;
