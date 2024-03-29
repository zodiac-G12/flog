import type {Component} from 'solid-js';
import {Accessor} from 'solid-js';
import {css} from 'solid-styled-components';
import {Article} from '../articles';
import {Img} from '@/components';
import {Link} from '@solidjs/router';

export const ArticleView: Component<{
  article: Article;
  isSP: Accessor<boolean>;
}> = (props) => {
  return (
    <Link
      href={`/articles/${props.article.path}`}
      class={ArticleViewContainer(props.isSP())}
    >
      <div class={ArticleImgContainer}>
        <Img
          src={props.article.img}
          width={'100%'}
          height={'70%'}
          objectFit={'contain'}
          borderRadius={'10px'}
        />
      </div>
      <div class={ArticleTitle}>{props.article.title}</div>
      <div class={ArticleCreatedView}>{props.article.created}</div>
    </Link>
  );
};

const ArticleViewContainer = (isSP: boolean) => {
  if (isSP) {
    return css({
      display: 'block',
      position: 'relative',
      fontWeight: 'bold',
      textAlign: 'center',
      background: 'rgba(239,246,255,0.5)',
      marginTop: '20px',
      marginBottom: '20px',
      borderRadius: '10px',
      padding: '10px',
    });
  }

  return css({
    'fontSize': '20px',
    'position': 'relative',
    'fontWeight': 'bold',
    'textAlign': 'center',
    'background': 'rgba(239,246,255,0.5)',
    'width': 'calc(30% - 20px)',
    'marginRight': '5%',
    'marginBottom': '5%',
    'borderRadius': '10px',
    'padding': '10px',
    '&:nth-child(3n)': {
      marginRight: 0,
    },
  });
};

const ArticleImgContainer = css({
  width: '100%',
  height: '70%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  overflow: 'hidden',
});

const ArticleTitle = css({
  marginTop: '10px',
  fontSize: '20px',
});

const ArticleCreatedView = css({
  fontSize: '15px',
  marginTop: '10px',
});
