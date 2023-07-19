import { Accessor } from "solid-js";
import type { Component } from "solid-js";
import { Content } from "@/components";
import { articles } from "@/articles";

const markdown = `
## 従来のブログよりグレードアップ

　私は気がついた。シンプルイズベスト、一番格好いいことに。
いろいろプロジェクトやってて、ここに行き着いた。
Nuxtを私はあまりにも知らなすぎた。
LightHouseのスコアがあまりに低かったので、これで少し改善したはず。

<center>
<a href="https://h.accesstrade.net/sp/cc?rk=0100n6l400kele" rel="nofollow">
<img src="https://h.accesstrade.net/sp/rr?rk=0100n6l400kele" alt="アクセストレード パートナーサイト募集" border="0" style="max-width: 300px;"/>
</a>
</center>
`;

const Content1: Component<{ isSP: Accessor<boolean> }> = ({ isSP }) => {
  const articleContents = articles.find(
    (article) => article.path === "content1"
  );

  return (
    <Content isSP={isSP} articleContents={{ markdown, ...articleContents }} />
  );
};

export default Content1;
