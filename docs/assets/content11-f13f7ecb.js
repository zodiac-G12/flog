import{C as o}from"./Content-4842a127.js";import{a as s,c as r}from"./index-e0f91b5f.js";const n=`
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

\`\`\`typescript
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
\`\`\`
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
`,l=t=>{const e=s.find(a=>a.path==="content11");return r(o,{get isSP(){return t.isSP},get articleContents(){return{markdown:n,...e}}})};export{l as default};
