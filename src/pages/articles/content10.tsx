import { Accessor } from "solid-js";
import type { Component } from "solid-js";
import { Content } from "@/components";
import { articles } from "@/articles";

const markdown = `
## 内容
　GraphQL APIでDBアクセスを大量に発生させる攻撃手法について、公式ドキュメントや参考記事をもとに、実際に攻撃が可能なのか確かめてみたという記事。

## 想定読者
　GraphQLについて興味があり、ある程度の知識がある人。JavaScriptについてある程度知識がある人。

## 動機
　ある記事を読んでいて、気になったと同時に、全く考慮したことがない事柄で青ざめたので、実際に実装して試してみたかった。

## 参考文献
　[GraphQL API を悪意あるクエリから守る手法](https://yigarashi.hatenablog.com/entry/graphql-query-analysis)

## 使用したモジュール
- [apollo-server](https://www.apollographql.com/)
- [graphql](https://graphql.org/)

## 実装
　[公式](https://www.apollographql.com/docs/apollo-server/data/resolvers/)を参考にして以下のように実装する。

\`\`\`javascript
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql\`
  type Book {
    id: Int!
    title: String!
    author: Author!
  }

  type Author {
    id: Int!
    name: String!
    books: [Book!]!
  }

  type Query {
    books: [Book]
    authors: [Author]
  }
\`;

// DBのテーブルとみなす
const books = [
  {
    id: 1,
    title: 'The Awakening',
    author: {
      id: 1,
    }
  },
  {
    id: 2,
    title: 'City of Glass',
    author: {
      id: 2,
    }
  },
];

// DBのテーブルとみなす
const authors = [
  {
    id: 1,
    name: 'Kate Chopin',
    books: [
      {
        id: 1,
      },
    ],
  },
  {
    id: 2,
    name: 'Paul Auster',
    books: [
      {
        id: 2,
      },
    ],
  }
];

// DBへの想定アクセス回数
let dbCount = 0;

const findByIdBook = (id) => {
  dbCount += books.length;
  console.log(dbCount);
  return books.filter(book => book.id === id)[0];
}

const findbyIdAuthor = (id) => {
  dbCount += authors.length;
  console.log(dbCount);
  return authors.filter(author => author.id === id)[0];
}

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
  },
  Book: {
    author (parent) {
      return findbyIdAuthor(parent.author.id);
    },
  },
  Author: {
    books (parent) {
      return parent.books.map(book => findByIdBook(book.id));
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(\`🚀  Server ready at $\{url}\`);
});
\`\`\`

重要なのは、BookとAuthorが互いに相互参照している点である。

これは公式GraphQLのベストプラクティスの、

bookがauthorのidなりを持っていなるなら、authorの実体を引けるようにする方が良いという思想に基づいている。

## 実際に実行

以上のBookとAuthorが互いに相互参照している方針に従ってスキーマを設計すると、

book --> author --> books --> author --> books ... といったように無限に循環する構造を作ることができる。

これを利用すると以下のようなクエリを書くことができる。

\`\`\`
query {
  authors {
    books {
      author {
        books {
          author {
            books {
              ...
              author {
                name
              }
              ...
            }
          }
        }
      }
    }
  }
\`\`\`

レスポンス

\`\`\`
{
  "data": {
    "authors": [
      {
        "books": [
          {
            "author": {
              "books": [
                {
                  "author": {
                    "books": [
                      {
                        ...
                        "author": {
                          "name": "Kate Chopin"
                        }
                        ...
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    ]
  }
}
\`\`\`
およそ**558回**ネストしたところ、DBアクセス概算は**2232回**であった。

数式で言うと、

(ネストの回数) × 4 = (DBアクセス回数)

である。

> 注意: 上の数式はbooksとauthorsのデータが上のソースコードの条件の時のみ

> また(DBアクセス回数)はあくまでも目安であり、実際とは異なる場合もある

そして、上限を特に設けていないため、何回でもクエリを投げられるし、再現なくDBアクセス回数を増やすことができる。

故にこのままの仕組みで表に出すと非常に危険なことがわかる。

## 危険性
　例えば具体的な話で、「あのGraphQL使っているサービスを潰したい」と思ったとして、

この攻撃に関して対策がされていないと、DBアクセスを大量にして、

**「サーバーをダウンさせてサービス停止させる」**

**「DBアクセス毎に課金するサービスを用いていた場合に課金をめちゃくちゃさせる」**

などができてしまう恐れがある。

　また、apollo-graphqlの公式サイトにも特に注意書きなどがなく、初心者は知らない間にこの問題に陥りやすいのではと考察している。

## 対策方法案
　クエリの複雑性の数値(complexity)を算出し、閾値を設けて実行を切り分けるという方法があるらしい。
以下はその方針に則ったツール。

- [graphql-query-complexity](https://github.com/slicknode/graphql-query-complexity)
- [graphql-cost-analysis](https://github.com/pa-bru/graphql-cost-analysis)

対策に関してはまた今度記事を書こうと思う。
`;

const Content10: Component<{ isSP: Accessor<boolean> }> = ({ isSP }) => {
  const articleContents = articles.find(
    (article) => article.path === "content10"
  );

  return (
    <Content isSP={isSP} articleContents={{ markdown, ...articleContents }} />
  );
};

export default Content10;
