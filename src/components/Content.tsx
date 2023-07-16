import { Accessor } from "solid-js";
import type { Component } from "solid-js";
import SolidMarkdown from "solid-markdown";
import Highlight from "solid-highlight";
import { css } from "solid-styled-components";
import { Img } from "@/components";

type ArticleContent = {
  title: string;
  created: string;
  markdown: string;
  img: string;
};

const Content: Component<{
  isSP: Accessor<boolean>;
  articleContents: ArticleContent;
}> = ({ isSP, articleContents }) => {
  const imgWidth = isSP() ? "100%" : "50%";
  const imgMarginLeft = isSP() ? "0%" : "25%";

  return (
    <div class={noaContainer}>
      <div
        style={{
          background: "white",
          padding: "5px 10px 10px 10px",
          "margin-bottom": "0px",
        }}
      >
        <h1 style={{ "text-align": "center" }}>{articleContents.title}</h1>
        <div style={{ "text-align": "right" }}>
          {articleContents.created} 公開
        </div>
        <div style={{ "text-align": "center", width: "100%" }}>
          <div
            style={{
              "margin-left": imgMarginLeft,
              width: imgWidth,
              "box-shadow": "2px 2px 4px rgba(0, 0, 0, 0.45)",
            }}
          >
            <Img
              src={articleContents.img}
              width={"100%"}
              objectFit={"contain"}
            />
          </div>
        </div>
      </div>
      <div class={contentContainer}>
        <SolidMarkdown
          children={articleContents.markdown}
          components={{
            code({ children, ...props }) {
              return (
                <Highlight
                  {...props}
                  children={String(children).replace(/\n$/, "")}
                  autoDetect={true}
                />
              );
            },
          }}
        />
      </div>
    </div>
  );
};

export default Content;

const contentContainer = css({
  background: "white",
  padding: "5vw 5vw",
  img: {
    marginLeft: "5%",
    maxWidth: "90%",
  },
});

const noaContainer = css({
  background: "indigo",
  padding: "10vw 5vw 10vw 5vw",
  minHeight: "calc(100vh - 20vw)",
});
