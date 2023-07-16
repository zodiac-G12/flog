import { Accessor } from "solid-js";
import type { Component } from "solid-js";
import { css } from "solid-styled-components";
import { articles, Article } from "../articles";
import { ArticleView } from "@/components";

export const ArticleListView: Component<{ isSP: Accessor<boolean> }> = ({
  isSP,
}) => {
  return (
    <div class={ArticleListContainer(isSP())}>
      {articles.map((article: Article) => {
        return <ArticleView isSP={isSP} article={article} />;
      })}
    </div>
  );
};

const ArticleListContainer = (isSP: boolean) => {
  if (isSP) {
    return css({
      padding: "10%",
    });
  }

  return css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    padding: "10%",
  });
};
