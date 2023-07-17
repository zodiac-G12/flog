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
            link: "content4",
            prekiji:
`
## Rustのコード

\`\`\`rust
fn fibd(n: u32) -> i128 {
    match n {
        0 | 1 => 1,
        _ => {
            let mut a = 1;
            let mut b = 1;

            for _ in 1..n/2+1 {
                a += b;
                b += a;
            }

            match n%2 {
                0 => a,
                _ => b
            }
        }
    }
}

fn main() {
    println!("{}", fibd(183));
}
\`\`\`
　

## 実行例

\`\`\`sh
$ cargo run
127127879743834334146972278486287885163
\`\`\`
　
## 追記(こちらの方が個人的に好き)

__fibd__を書き換えてみる

\`\`\`rust
fn fibd(n: u32) -> i128 {
    let mut fiba: [i128; 2] = [1; 2];
                     
    for _ in 1..n/2+1 {                                      
        fiba[0] += fiba[1];                     
        fiba[1] += fiba[0];                     
    }                              
            
    fiba[(n%2) as usize] 
} 
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
