import {
  blogNew,
  informationTheory,
  rustAdder,
  rustFibonacci,
  webpTransformer,
  changeCommitAuthorAndEmail,
  lightsOut,
  logicCollapse,
  svelteMarked,
  sveltTodo,
  graphqlDefense,
  graphqlHowToAttack,
  rmoWithRust,
  reactChart,
  huffmanTypescript,
} from "./article-contents";
import NuxtImg from "~/assets/nuxt.jpeg";
import RustImg from "~/assets/rust-wide.jpg";
import WebpImg from "~/assets/webp.png";
import GitImg from "~/assets/git.png";
import ReactImg from "~/assets/react-wide.png";
import SvelteImg from "~/assets/svelte-wide.png";
import GraphQLImg from "~/assets/graphgl-wide.png";
import HuffmanImg from "~/assets/huffman.png";
import HowToLiveImg from "~/assets/how-to-live.png";

export const ARTICLES: {
  title: string;
  date: Date;
  img?: string;
  id: string;
  markdown: string;
  isArchive?: boolean;
}[] = [
  {
    title: "Blogをシンプルにしたよ",
    img: NuxtImg,
    date: new Date("2020/5/14"),
    id: "blog-new",
    markdown: blogNew,
  },
  {
    title: "情報理論の謎",
    img: NuxtImg,
    date: new Date("2020/5/24"),
    id: "information-theory",
    markdown: informationTheory,
  },
  {
    title: "Rustで標準入力して二値加算",
    img: RustImg,
    date: new Date("2020/10/11"),
    id: "rust-adder",
    markdown: rustAdder,
  },
  {
    title: "RustでFibonacci数の183番目",
    img: RustImg,
    date: new Date("2020/10/11"),
    id: "rust-fibonacci",
    markdown: rustFibonacci,
  },
  {
    title: "WebP変換シェルスクリプト",
    img: WebpImg,
    date: new Date("2020/10/12"),
    id: "webp-transformer",
    markdown: webpTransformer,
  },
  {
    title: "Commit AuthorとCommit Email変更",
    img: GitImg,
    date: new Date("2020/10/12"),
    id: "change-commit-author-and-email",
    markdown: changeCommitAuthorAndEmail,
  },
  {
    title: "React + Three.js で LightsOut を作った",
    img: ReactImg,
    date: new Date("2021/2/2"),
    id: "lights-out",
    markdown: lightsOut,
  },
  {
    title: "日常に潜む論理破綻の話",
    img: HowToLiveImg,
    date: new Date("2021/2/7"),
    id: "logic-collapse",
    markdown: logicCollapse,
  },
  {
    title: "Svelte+marked でスライド作成",
    img: SvelteImg,
    date: new Date("2021/2/8"),
    id: "svelte-marked",
    markdown: svelteMarked,
  },
  {
    title: "GraphQL APIでDBアクセスを大量に発生させる攻撃手法について",
    img: GraphQLImg,
    date: new Date("2021/2/10"),
    id: "graphql-how-to-attack",
    markdown: graphqlHowToAttack,
  },
  {
    title: "React+Chart.js でコロナ感染者数を表示するアプリ作成",
    img: ReactImg,
    date: new Date("2021/2/15"),
    id: "react-chart",
    markdown: reactChart,
  },
  {
    title: "GraphQL APIで悪意あるクエリの対策手段",
    img: GraphQLImg,
    date: new Date("2021/2/16"),
    id: "graphql-defense",
    markdown: graphqlDefense,
  },
  {
    title: "Huffman codeをTypeScriptで実装する",
    img: HuffmanImg,
    date: new Date("2021/3/17"),
    id: "huffman-typescript",
    markdown: huffmanTypescript,
  },
  {
    title: "数学オリンピックの問題をRustで解く",
    img: RustImg,
    date: new Date("2021/3/23"),
    id: "rmo-with-rust",
    markdown: rmoWithRust,
  },
  {
    title: "Svelte で TODO アプリを作った",
    img: SvelteImg,
    date: new Date("2021/3/29"),
    id: "svelte-todo",
    markdown: sveltTodo,
  },
];
