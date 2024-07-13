import { lazy } from "solid-js";

export const ROUTES = [
  {
    path: "/",
    component: lazy(() => import("~/routes/index.js")),
  },
  {
    path: "/articles",
    children: [
      {
        path: "/:id",
        component: lazy(() => import("~/routes/articles/[id].js")),
      },
    ],
  },
  {
    path: "*",
    component: lazy(() => import("~/routes/[...404].js")),
  },
];
