<template>
    <div>
        <DefaultArticle :content="{link:this.link, kiji:kiji}"/>
    </div>
</template>


<script>

const DefaultArticle = () => import('~/components/default-article.vue');
// import marked from 'marked';
// import katex from 'katex';
import marked from 'marked-katex';

export default{
    data: function() {
        return {
            link: "content6",
            prekiji:
`
## スクリプト

config において __12345@gmail.com__ というemailのコミットに対して過去全部のコミット修正

\`\`\`bash
#!/bin/bash

git filter-branch -f --commit-filter '                         
if [ "$GIT_COMMITTER_EMAIL" = "12345@gmail.com" ];
then
    GIT_COMMITTER_NAME="zodiac-G12";
    GIT_AUTHOR_NAME="zodiac-G12";
    GIT_COMMITTER_EMAIL="12181838+zodiac-G12@users.noreply.github.com";
    GIT_AUTHOR_EMAIL="12181838+zodiac-G12@users.noreply.github.com";git commit-tree "$@";
else
    git commit-tree "$@";
    fi' HEAD

\`\`\`
　
## スクリプト事前と事後処理

まず対象のコミット洗い出し

\`\`\`bash
git log --pretty=full
\`\`\`

上記の __git filter-branch__ のスクリプト実行。

その後しっかりcommit情報が変更されたか以下のコマンドで確認

\`\`\`bash
git log --pretty=full
\`\`\`

問題なければforce pushする

\`\`\`bash
git push -f
\`\`\`

`
        }
    },
    computed: {
        kiji() {
            if (!process.client) console.log(this.prekiji.length);
            return marked(this.prekiji);
        },
    },
    components: {
        DefaultArticle,
    },
}

</script>
