import type { Component } from "solid-js";
import { Accessor } from "solid-js";
import { css } from "solid-styled-components";
import { Article } from "../articles";
import { Img } from "@/components";

export const ArticleView: Component<{
  article: Article;
  isSP: Accessor<boolean>;
}> = ({ article, isSP }) => {
  return (
    <div class={ArticleViewContainer(isSP())}>
      <div class={ArticleImgContainer}>
        <Img
          src={article.img}
          width={"100%"}
          height={"70%"}
          objectFit={"contain"}
          borderRadius={"10px"}
        />
      </div>
      <div class={ArticleTitle}>{article.title}</div>
      <div class={ArticleCreatedView}>{article.created}</div>
    </div>
  );
};

const ArticleViewContainer = (isSP: boolean) => {
  if (isSP) {
    return css({
      position: "relative",
      fontWeight: "bold",
      textAlign: "center",
      background: "rgba(239,246,255,0.5)",
      width: "100%",
      marginTop: "20px",
      marginBottom: "20px",
      borderRadius: "10px",
      padding: "10px",
    });
  }

  return css({
    fontSize: "20px",
    position: "relative",
    fontWeight: "bold",
    textAlign: "center",
    background: "rgba(239,246,255,0.5)",
    width: "calc(30% - 20px)",
    marginRight: "5%",
    marginBottom: "5%",
    borderRadius: "10px",
    padding: "10px",
    "&:nth-child(3n)": {
      marginRight: 0,
    },
  });
};

const ArticleImgContainer = css({
  width: "100%",
  height: "70%",
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
  "border-radius": "10px",
  overflow: "hidden",
});

const ArticleTitle = css({
  marginTop: "10px",
  fontSize: "100%",
});

const ArticleCreatedView = css({
  fontSize: "80%",
  marginTop: "10px",
});
