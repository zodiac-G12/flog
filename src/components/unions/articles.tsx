import { ARTICLES } from "~/constants";
import { Article } from "~/components/unions";

// TODO refact

export const Articles = () => {
  return (
    <div class="flex flex-wrap justify-center items-center gap-10 px-10">
      {ARTICLES.map((article) => (
        <Article {...article} />
      ))}
    </div>
  );
};
