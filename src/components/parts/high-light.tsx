import { Highlight } from "solid-highlight";

// biome-ignore lint: suspicious/noExplicitAny
export const HighlightComponent = (_props: any): any => {
  const { children, class: _class, node, ...props } = _props;

  const match = /language-(\w+)/.exec(_class);
  const language = match ? match[1] : "text";

  const content = String(node?.children[0]?.value ?? undefined).replace(
    /\n$/,
    "",
  );

  return (
    <Highlight
      {...props}
      language={language}
      class="line-numbers overflow-x-scroll"
    >
      {content}
    </Highlight>
  );
};
