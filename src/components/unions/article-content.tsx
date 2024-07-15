import { A } from "@solidjs/router";
import { format } from "date-fns";
import NotFoundImg from "~/assets/notfound.jpg";
import { SolidMarkdown } from "solid-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { HighlightComponent } from "~/components/parts";

const ArticleTitle = (props: { title: string }) => {
  return (
    <h1 class="py-10 px-10 lg:px-16 bg-gray-100 text-center text-gray-700 text-2xl lg:text-4xl font-bold">
      {props.title}
    </h1>
  );
};

const ArticlesLink = () => {
  return (
    <A class="text-sm lg:text-lg text-blue-700 underline" href="/">
      記事一覧へ ↩
    </A>
  );
};

const ReleaseDate = (props: { date: Date }) => {
  return (
    <p class="text-sm text-gray-600">
      {format(props.date, "yyyy年MM月dd日 公開")}
    </p>
  );
};

const ArticleImg = (props: { img?: string; title: string }) => {
  return (
    <div class="flex justify-center items-center w-full px-10 lg:px-15 bg-gray-100">
      <img
        alt={props.title}
        src={props?.img ?? NotFoundImg}
        class="w-full lg:w-1/3 shadow-gray shadow-xl"
      />
    </div>
  );
};

const MarkdownContent = (props: { markdown: string }) => {
  return (
    <div class="pt-2 pb-28 px-10 lg:px-16 bg-gray-100 text-gray-700 text-sm lg:text-lg">
      <SolidMarkdown
        renderingStrategy="reconcile"
        remarkPlugins={[remarkMath]}
        // biome-ignore lint: suspicious/noExplicitAny
        rehypePlugins={[rehypeKatex, rehypeRaw] as any}
        components={{
          code(props) {
            return <HighlightComponent {...props} />;
          },
        }}
      >
        {props.markdown}
      </SolidMarkdown>
    </div>
  );
};

export const ArticleContent = (props: {
  article: { title: string; date: Date; img?: string; markdown: string };
}) => {
  return (
    <>
      <ArticleTitle title={props.article.title} />
      <div class="flex justify-between items-center px-10 lg:px-16 pb-1 bg-gray-100">
        <ArticlesLink />
        <ReleaseDate date={props.article.date} />
      </div>
      <ArticleImg img={props.article.img} title={props.article.title} />
      <MarkdownContent markdown={props.article.markdown} />
    </>
  );
};
