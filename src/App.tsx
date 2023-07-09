import { lazy } from "solid-js";
import type { Component } from "solid-js";
import { Router, Routes, Route } from "@solidjs/router";
import { Home } from "./pages/home";

const App: Component = () => {
  // const Home = lazy(() => import("./pages/home"));
  const Content = lazy(() => import("./pages/articles/content"));

  return (
    <Router>
      <Routes>
        <Route path="/" component={Home}></Route>
        <Route path="/articles/:id" component={Content}></Route>
      </Routes>
    </Router>
  );
};

export default App;
