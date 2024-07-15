import { Router } from "@solidjs/router";
import { Suspense } from "solid-js";
import { Crown } from "~/components/unions";
import { ROUTES } from "~/constants";
import "~/constants/preload";

export default function App() {
  return (
    <Router
      base={import.meta.env.SERVER_BASE_URL ?? "/"}
      root={(props) => (
        <>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
            integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
            crossorigin="anonymous"
          />
          <Crown />
          <Suspense>{props.children}</Suspense>
        </>
      )}
    >
      {ROUTES}
    </Router>
  );
}
