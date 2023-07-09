import type { Component } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { css } from "solid-styled-components";
import { articles, Article } from "../articles";
import { ArticleView } from "@/components";

export const ArticleListView: Component = () => {
  // history.pushState("", "", "/");
  const [isSP, setIsSP] = createSignal(false);

  const spMaxWidth = 450;

  createEffect(() => {
    const currentWidth = window.innerWidth;

    const isSP = spMaxWidth > currentWidth ? true : false;

    setIsSP(isSP);
  }, []);

  return (
    <div class={ArticleListContainer(isSP())}>
      {articles.map((article: Article) => {
        return (
          <A href={`/articles/${article.title}`}>
            <ArticleView isSP={isSP} article={article} />
          </A>
        );
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
