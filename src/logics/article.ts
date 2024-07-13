import { ARTICLES } from "~/constants";

export const getArticleById = (id: string | undefined) => {
  const idString = (id ?? "").toString();

  const article = ARTICLES.find((article) => article.id === idString);

  if (!article) {
    return undefined;
  }

  if (article.isArchive) {
    return undefined;
  }

  return article;
};
