import {lazy, createEffect, createSignal, For, Accessor} from 'solid-js';
import type {Component} from 'solid-js';
import {Router, Routes, Route} from '@solidjs/router';
import {articles, Article} from './articles';

const spMaxWidth = 450;
const Home = lazy(() => import(`./pages/Home`));

const createArticle: Component<{
  article: Article;
  isSP: Accessor<boolean>;
}> = (props) => {
  const {article, isSP} = props;

  const Content = lazy(() => import(`./pages/articles/${article.path}.tsx`));

  return (
    <Route
      path={`/articles/${article.path}`}
      element={<Content isSP={isSP} />}
    />
  );
};

const App: Component = () => {
  const [isSP, setIsSP] = createSignal(false);

  createEffect(() => {
    const currentWidth = window.innerWidth;

    const isSP = spMaxWidth > currentWidth ? true : false;

    setIsSP(isSP);
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isSP={isSP} />} />
        <For each={articles}>
          {(article) => createArticle({article, isSP})}
        </For>
      </Routes>
    </Router>
  );
};

export default App;
