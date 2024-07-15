import { createMemo } from "solid-js";
import { A } from "@solidjs/router";
import { format } from "date-fns";
import { ArticleContent } from "~/components/unions";
import { useParams, useNavigate } from "@solidjs/router";
import { getArticleById } from "~/logics";
import NotFoundImg from "~/assets/notfound.jpg";

// TODO refact
export default function Content() {
  const { id } = useParams();

  const article = createMemo(() => getArticleById(id), [id]);

  const navigate = useNavigate();

  if (article()?.markdown === undefined) {
    navigate("/404");
    return null;
  }

  return (
    <main class="min-h-[calc(100vh-58px)] bg-gray-100 lg:bg-gray-800 lg:pt-14 lg:px-28 lg:px-72">
      <h1 class="py-10 px-10 lg:px-16 bg-gray-100 text-center text-gray-700 text-2xl lg:text-4xl font-bold">
        {article()?.title}
      </h1>
      <div class="flex justify-between items-center px-10 lg:px-16 pb-1 bg-gray-100">
        <A class="text-sm lg:text-lg text-blue-700 underline" href="/">
          記事一覧へ ↩
        </A>
        <p class="text-sm text-gray-600">
          {article()?.date !== undefined
            ? format(article()?.date ?? new Date(), "yyyy年MM月dd日 公開")
            : ""}
        </p>
      </div>
      <div class="flex justify-center items-center w-full px-10 lg:px-15 bg-gray-100">
        <img
          alt={article()?.title}
          src={article()?.img ?? NotFoundImg}
          class="w-full lg:w-1/3 shadow-gray shadow-xl"
        />
      </div>
      <ArticleContent markdown={article()?.markdown ?? ""} />
    </main>
  );
}
