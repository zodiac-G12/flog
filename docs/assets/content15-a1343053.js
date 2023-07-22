import{a as o}from"./Content-947fbbee.js";import{a as l,c as a}from"./index-02ebbe90.js";const c=`
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
渡す側は__{}__でプロパティ名を囲って渡す。
受け取る側は「__export let__」で変数を宣言することで受け取ることが出来る。

App.svelte　
\`\`\`js
<script>
  import Nested from './Nested.svelte';
  const answer = 42;
<\/script>

<Nested {answer} />
\`\`\`

Nested.svelte
\`\`\`js
<script>
  export let answer;
<\/script>

<p>The answer is {answer}</p>
\`\`\`

> Svelteのサンプル: https://svelte.dev/tutorial/default-values

## イベント伝搬

　色々と手段はあると思う。
まず大元のコンポーネント、ルートコンポーネントにて、イベントが発火した際に処理したい関数と、
変更を加えたいデータを用意しておく。

　その上で、子コンポーネントに用意した関数とデータをプロパティとして渡す。
子コンポーネントでイベントを検知して、その際に用意した関数と、データを使って、
状態を変えるという方法をとった。

　イベントの検知は以下のように「__on:〇〇__」と書き行う。

\`\`\`js
<script>
  function handleClick() {
    alert('clicked');
  }
<\/script>

<button on:click={handleClick}>
  Click me
</button>
\`\`\`

> Svelteのサンプル: https://svelte.dev/tutorial/event-modifiers

## Modalの実装

　Modalに関してModalコンポーネントのサンプルコードをそのまま採用した。

> Modalのサンプルコード: https://github.com/flekschas/svelte-simple-modal/blob/v0.8.0/src/Modal.svelte

> Svelteのサンプル: https://svelte.dev/repl/033e824fad0a4e34907666e7196caec4?version=3.4.1

　Modalコンポーネントの使い方としては以下のようにラップする形で用いる。

\`\`\`js
<Modal>
  <Board />
</Modal>
\`\`\`

　Modalを開くロジックは以下のようにする。なおこのコンポーネントはModalコンポーネントの内側になければならない。

> https://github.com/flekschas/svelte-simple-modal/issues/16#issuecomment-641413134

Board.js
\`\`\`js
<script>
import Popup from './Popup.svelte';

const { open } = getContext('simple-modal');

const showPopup = (num) => {
  // 以下のnumのように、Popupコンポーネントを開くと同時に、propでデータを渡せる
  open(Popup, { num });
};
<\/script>

<div on:click={showPopup(100)}></div>
\`\`\`

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

`,i=e=>{const t=l.find(s=>s.path==="content15");return a(o,{get isSP(){return e.isSP},get articleContents(){return{markdown:c,...t}}})};export{i as default};
