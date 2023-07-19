import {Accessor, For} from 'solid-js';
import type {Component} from 'solid-js';
import {css} from 'solid-styled-components';
import {articles, Article} from '../articles';
import {ArticleView} from '@/components';

export const ArticleListView: Component<{ isSP: Accessor<boolean> }> = (
    props
) => {
  return (
    <div class={ArticleListContainer(props.isSP())}>
      <For each={articles}>
        {(article: Article) => {
          return <ArticleView isSP={props.isSP} article={article} />;
        }}
      </For>
    </div>
  );
};

const ArticleListContainer = (isSP: boolean) => {
  if (isSP) {
    return css({
      padding: '10%',
    });
  }

  return css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: '10%',
  });
};
