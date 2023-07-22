import{a as o}from"./Content-77dc1e15.js";import{a as r,c as a}from"./index-e5058caf.js";const n=`
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

`,m=t=>{const e=r.find(i=>i.path==="content6");return a(o,{get isSP(){return t.isSP},get articleContents(){return{markdown:n,...e}}})};export{m as default};
