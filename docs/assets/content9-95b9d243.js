import{a as r}from"./Content-7b965906.js";import{a as s,c as o}from"./index-113907c2.js";const i=`
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

\`\`\`latex
\`$$H(S)=\\sum_{i=0}^{r}P(s_i)\\log_2\\frac{1}{P(s_i)}　[bit / symbol]$$\`
\`\`\`
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
\`\`\`bash
npx degit sveltejs/template my-svelte-project
# or download and extract 
cd my-svelte-project
# to use TypeScript run:
# node scripts/setupTypeScript.js

npm install
npm run dev
\`\`\`

> 公式ドキュメント: https://svelte.dev/

## Svelteの公式のSlide実装例から拝借する
　[このページ](https://svelte.dev/repl/0add35f59c6148cc8e5a415b2e38c83a?version=3.12.1)
のソースコードをコピペする。
> 余談: Svelteは意外とExampleが充実していて、やりたいこと知りたいことでググるとまず出てくる。

> 公式の実装例一覧: https://svelte.dev/examples#hello-world

## markedのインストール
　以下を実行

\`\`\`bash
npm i marked-katex --save
\`\`\`
<br>

## markdown対応に修正

　まずmarkedのimport

\`\`\`typescript
import marked from 'marked-katex';
\`\`\`

　https://svelte.dev/repl/0add35f59c6148cc8e5a415b2e38c83a?version=3.12.1
の57行目

\`\`\`typescript
{slide.content}
\`\`\`

を

\`\`\`svelte
{@html String(marked(slide.content))}
\`\`\`

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
`,n=e=>{const t=s.find(a=>a.path==="content9");return o(r,{get isSP(){return e.isSP},get articleContents(){return{markdown:i,...t}}})};export{n as default};
