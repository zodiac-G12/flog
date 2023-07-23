import {Accessor} from 'solid-js';
import type {Component} from 'solid-js';
import SolidMarkdown from 'solid-markdown';
import Highlight from 'solid-highlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import {css} from 'solid-styled-components';
import {Img} from '@/components';

type ArticleContent = {
  title: string;
  created: string;
  markdown: string;
  img: string;
};

export const Content: Component<{
  isSP: Accessor<boolean>;
  articleContents: ArticleContent;
}> = (props) => {
  const imgWidth = props.isSP() ? '100%' : '50%';
  const imgMarginLeft = props.isSP() ? '0%' : '25%';

  return (
    <div class={noaContainer}>
      <div
        style={{
          'background': 'white',
          'padding': '5px 10px 10px 10px',
          'margin-bottom': '0px',
        }}
      >
        <h1 style={{'text-align': 'center'}}>
          {props.articleContents.title}
        </h1>
        <div style={{'text-align': 'right'}}>
          {props.articleContents.created} 公開
        </div>
        <div style={{'text-align': 'center', 'width': '100%'}}>
          <div
            style={{
              'margin-left': imgMarginLeft,
              'width': imgWidth,
              'box-shadow': '2px 2px 4px rgba(0, 0, 0, 0.45)',
            }}
          >
            <Img
              src={props.articleContents.img}
              width={'100%'}
              objectFit={'contain'}
            />
          </div>
        </div>
      </div>
      <div class={contentContainer}>
        <SolidMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
          children={props.articleContents.markdown}
          components={{
            code(_props) {
              const {children, ...props} = _props;
              return (
                <Highlight
                  {...props}
                  children={String(children).replace(/\n$/, '')}
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

const contentContainer = css({
  background: 'white',
  padding: '5vw 5vw',
  img: {
    marginLeft: '5%',
    maxWidth: '90%',
  },
});

const noaContainer = css({
  background: 'indigo',
  padding: '10vw 5vw 10vw 5vw',
  minHeight: 'calc(100vh - 20vw)',
});
