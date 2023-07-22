import{C as n}from"./Content-c91edaf0.js";import{a as s,c as i}from"./index-bf05256e.js";const o=`
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

`,l=t=>{const r=s.find(e=>e.path==="content3");return i(n,{get isSP(){return t.isSP},get articleContents(){return{markdown:o,...r}}})};export{l as default};
