export type Article = {
  title: string;
  img: string;
  created: string;
  path: string;
};

export const articles: Article[] = [
  {
    title: 'Blogをシンプルにしたよ',
    img: 'nuxt.jpeg',
    created: '2020年5月14日 公開',
    path: 'content1',
  },
  {
    title: '情報理論の謎',
    img: 'nuxt.jpeg',
    created: '2020年5月24日 公開',
    path: 'content2',
  },
  {
    title: 'Rustで標準入力して二値加算',
    img: 'rust-social-wide.jpg',
    created: '2020年10月11日 公開',
    path: 'content3',
  },
  {
    title: 'RustでFibonacci数の183番目',
    img: 'rust-social-wide.jpg',
    created: '2020年10月11日 公開',
    path: 'content4',
  },
  {
    title: 'WebP変換シェルスクリプト',
    img: 'webp.png',
    created: '2020年10月12日 公開',
    path: 'content5',
  },
  {
    title: 'Commit AuthorとCommit Email変更',
    img: 'Git.png',
    created: '2020年10月12日 公開',
    path: 'content6',
  },
  {
    title: 'React + Three.js で LightsOut を作った',
    img: 'logo-og.png',
    created: '2021年2月2日 公開',
    path: 'content7',
  },
  {
    title: '日常に潜む論理破綻の話',
    img: 'HowToLive.png',
    created: '2021年2月7日公開',
    path: 'content8',
  },
  {
    title: 'Svelte+marked でスライド作成',
    img: 'svelte.png',
    created: '2021年2月8日公開',
    path: 'content9',
  },
  {
    title: 'GraphQL APIでDBアクセスを大量に発生させる攻撃手法について',
    img: 'glaphgl.png',
    created: '2021年2月10日公開',
    path: 'content10',
  },
  {
    title: 'React+Chart.js でコロナ感染者数を表示するアプリ作成',
    img: 'logo-og.png',
    created: '2021年2月15日公開',
    path: 'content11',
  },
  {
    title: 'GraphQL APIで悪意あるクエリの対策手段',
    img: 'glaphgl.png',
    created: '2021年2月16日公開',
    path: 'content12',
  },
  {
    title: 'Huffman codeをTypeScriptで実装する',
    img: 'huffman.png',
    created: '2021年3月17日公開',
    path: 'content13',
  },
  {
    title: '数学オリンピックの問題をRustで解く',
    img: 'rust-social-wide.jpg',
    created: '2021年3月23日公開',
    path: 'content14',
  },
  {
    title: 'Svelte で TODO アプリを作った',
    img: 'svelte.png',
    created: '2021年3月29日公開',
    path: 'content15',
  },
];
