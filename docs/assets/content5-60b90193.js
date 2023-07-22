import{a as s}from"./Content-7b965906.js";import{a as p,c as n}from"./index-113907c2.js";const l=`
## WebP

Google先生が開発している画像フォーマットで、サイズがちっちゃくできる。

[WebPとは: Google Developers](https://developers.google.com/speed/webp)

[WebPの検証: Google Developers](https://developers.google.com/speed/webp/docs/webp_lossless_alpha_study#results)

## エンコードとデコード

[ツール: Google Developers](https://developers.google.com/speed/webp/download)

今回はこの中の __cwebp__ を用いる。

[ダウンロードリポジトリ: Google Developers](https://storage.googleapis.com/downloads.webmproject.org/releases/webp/index.html)

## 実際のコード

__static__ ディレクトリ直下の、png、jpg、jpeg拡張子の画像ファイルのWebP変換ファイルを __static__ ディレクトリの下に複製。

\`\`\`bash
#!/bin/bash

for file in \`find ./static \\( -name \\*.png -o -name \\*.jpg -o -name \\*jpeg \\) -print\`; do ~/libwebp-1.1.0-mac-10.15/bin/cwebp "$file" -o "\${file%.*}.webp"; done
\`\`\`

`,g=e=>{const o=p.find(t=>t.path==="content5");return n(s,{get isSP(){return e.isSP},get articleContents(){return{markdown:l,...o}}})};export{g as default};
