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
            link: "content3",
            prekiji:
`
## Rustのコード

\`\`\`rust
use std::io;

fn main() {
    let mut input = String::new();
    match io::stdin().read_line(&mut input) {
        Ok(n) => {
            let s: Vec<&str> = input.trim().split(" ").collect();
            let c0: &str = &s[0];
            let c1: &str = &s[1];
            let i: usize = c0.parse().unwrap();
            let j: usize = c1.parse().unwrap();
            println!("{} bytes read", n);
            println!("{}", i + j);
        }
        Err(error) => {
            println!("error: {}", error);
        }
    }
}
\`\`\`
　

## 実行例

\`\`\`sh
$ cargo run
12 27
6 bytes read
39
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
