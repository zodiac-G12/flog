import { A } from "@solidjs/router";
import NotFoundImg from "~/assets/notfound.jpg";

export default function NotFound() {
  return (
    <main class="text-center mx-auto text-gray-700 bg-gray-700 p-4 min-h-[calc(100vh-58px)]">
      <div class="my-16">
        <div class="my-8 flex flex-col justify-center items-center">
          <img src={NotFoundImg} alt="notfound" />
        </div>
        <h1 class="max-6-xs text-6xl text-gray-100 font-thin uppercase">
          Not Found
        </h1>
      </div>
      <div class="my-4">
        <A class="text-lg text-gray-100 underline" href="/">
          記事一覧へ ↩
        </A>
      </div>
    </main>
  );
}
