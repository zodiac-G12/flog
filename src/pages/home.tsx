import {Accessor} from 'solid-js';
import type {Component} from 'solid-js';
import {css} from 'solid-styled-components';
import {i18n} from '@/i18next/init';
import {Crown, ArticleListView} from '@/components';

const Home: Component<{ isSP: Accessor<boolean> }> = (props) => {
  return (
    <div class={HomeContainer}>
      <Crown />
      <div class={Pankuzu}>パンクズリスト</div>
      <div class={TitleContainer}>
        <div class={Divider} />
        <div class={Title}>{i18n.t('title')}</div>
        <div class={Divider} />
      </div>
      <ArticleListView isSP={props.isSP} />
      <div>footer</div>
    </div>
  );
};

export default Home;

const Title = css({
  textAlign: 'center',
  margin: '20px',
  fontSize: '20px',
  fontFamily: 'Gotham Bold',
  fontWeight: 'Bold',
  color: 'white',
});

const Divider = css({
  borderTop: '2px solid #fff',
  width: '100%',
});

const TitleContainer = css({
  marginLeft: '10%',
  width: '80%',
});

const HomeContainer = css({
  background: 'indigo',
});

const Pankuzu = css({
  marginLeft: '10%',
  padding: '10px',
  color: 'gray',
  fontFamily: 'Gotham Bold',
  fontWeight: 'Bold',
});
