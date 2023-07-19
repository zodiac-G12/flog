import{a}from"./Content-eca98827.js";import{a as r,c as o}from"./index-8aa06a40.js";const c=`
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
\`\`\`typescript
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
\`\`\`

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

\`\`\`typescript
import { Canvas, useFrame } from 'react-three-fiber'
\`\`\`
<br>

## 課題となった点

---

### 1. カメラ視点をドラッグで制御する方法

---

　ThreeJSに含まれる[OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)を用いる。

react-three-fiberで用いる際は以下のように書くことで実現した。

\`\`\`javascript
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
\`\`\`


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

\`\`\`typescript
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
\`\`\`

**方針:** 各マス全ての状態(state)を**Mesh_root**で管理する。
meshのonClick()が発火した際に、onClick内でステートフックを呼び出し、プロパティを更新して、更新したプロパティをmesh_xに渡して、状態管理をする。

## 完成したもの

> リンク: https://zodiac-g12.github.io/lightouts/

ライツアウトの実装はインターネット上によくあるが、
私の実装では差別化を主張できる点がある。
「SHOW ANSWER」というボタンをクリックすることで、全部消灯するのに必要な、タップするべき場所のマス(ブロック)が回転するという機能である。

回答を求めるアルゴリズムについては、線形代数の初歩的な素養を要求し、複雑で長くなってしまうため今回は割愛する。
`,h=t=>{const e=r.find(s=>s.path==="content7");return o(a,{get isSP(){return t.isSP},get articleContents(){return{markdown:c,...e}}})};export{h as default};
