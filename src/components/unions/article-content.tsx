import { SolidMarkdown } from "solid-markdown";
import { Highlight } from "solid-highlight";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";

// biome-ignore lint: suspicious/noExplicitAny
const setCode = (_props: any): any => {
  const { children, class: _class, node, ...props } = _props;

  const match = /language-(\w+)/.exec(_class);
  const language = match ? match[1] : "text";

  const content = String(node?.children[0]?.value ?? undefined).replace(
    /\n$/,
    "",
  );

  return (
    <Highlight {...props} language={language} class="line-numbers">
      {content}
    </Highlight>
  );
};

export const ArticleContent = (props: { markdown: string }) => {
  return (
    <div class="pt-2 pb-28 px-10 lg:px-16 bg-gray-100 text-gray-700 text-lg">
      <SolidMarkdown
        renderingStrategy="reconcile"
        remarkPlugins={[remarkMath]}
        // biome-ignore lint: suspicious/noExplicitAny
        rehypePlugins={[rehypeKatex, rehypeRaw] as any}
        components={{
          code(props) {
            return setCode(props);
          },
        }}
      >
        {props.markdown}
      </SolidMarkdown>
    </div>
  );
};
