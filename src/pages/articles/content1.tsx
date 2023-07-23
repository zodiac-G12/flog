import {Accessor} from 'solid-js';
import type {Component} from 'solid-js';
import {Content} from '@/components';
import {articles} from '@/articles';

const markdown = `
## 従来のブログよりグレードアップ

　私は気がついた。シンプルイズベスト、一番格好いいことに。
いろいろプロジェクトやってて、ここに行き着いた。
Nuxtを私はあまりにも知らなすぎた。
LightHouseのスコアがあまりに低かったので、これで少し改善したはず。
`;

const Content1: Component<{ isSP: Accessor<boolean> }> = (props) => {
  const articleContents = articles.find(
      (article) => article.path === 'content1'
  );

  return (
    <Content
      isSP={props.isSP}
      articleContents={{markdown, ...articleContents}}
    />
  );
};

export default Content1;
