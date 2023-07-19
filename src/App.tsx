import { lazy, createEffect, createSignal } from "solid-js";
import type { Component } from "solid-js";
import { Router, Routes, Route } from "@solidjs/router";
import { articles } from "./articles";

const spMaxWidth = 450;

const App: Component = () => {
  const Home = lazy(() => import("./pages/home"));
  const [isSP, setIsSP] = createSignal(false);

  createEffect(() => {
    const currentWidth = window.innerWidth;

    const isSP = spMaxWidth > currentWidth ? true : false;

    setIsSP(isSP);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isSP={isSP} />}></Route>
        {articles.map((article) => {
          const Content = lazy(
            () => import(`./pages/articles/${article.path}`)
          );

          return (
            <Route
              path={`/articles/${article.path}`}
              element={<Content isSP={isSP} />}
            ></Route>
          );
        })}
      </Routes>
    </Router>
  );
};

export default App;
