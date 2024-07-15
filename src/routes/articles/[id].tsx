import { createMemo } from "solid-js";
import { ArticleContent } from "~/components/unions";
import { useParams, useNavigate } from "@solidjs/router";
import { getArticleById } from "~/logics";

export default function Content() {
  const { id } = useParams();

  const article = createMemo(() => getArticleById(id), [id])();

  const navigate = useNavigate();

  if (!article) {
    navigate("/404");
    return null;
  }

  return (
    <main class="min-h-[calc(100vh-58px)] bg-gray-100 lg:bg-gray-800 lg:pt-14 lg:px-28 lg:px-72">
      <ArticleContent article={article} />
    </main>
  );
}
