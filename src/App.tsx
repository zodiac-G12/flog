import { lazy, createEffect, createSignal } from "solid-js";
import type { Component } from "solid-js";
import { Router, Routes, Route } from "@solidjs/router";

const spMaxWidth = 450;

const App: Component = () => {
  const Home = lazy(() => import("./pages/home"));
  const Content = lazy(() => import("./pages/articles/content"));
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
        <Route path="/articles/:id" element={<Content isSP={isSP} />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
