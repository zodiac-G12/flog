export const rmoWithRust = `
## 問題
　EN: A leaf is torn from a paperback novel. The sum of the numbers on the remaining pages is 15000.
What are the page numbers on the torn leaf.

　JP: 本から1枚の紙が破れています。残りのページ数の合計は15000です。
破れた紙のページ番号は何でしょうか？

> RMO-1994: https://www.isical.ac.in/~rmo/papers/rmo/rmo-1994.pdf

## TLDR

- [解導出プログラム](https://github.com/zodiac-G12/rmo/blob/master/src/main.rs)

## 解法

　以下の手順で解を導く。

1. ページ数の合計を使って、その本のおおよその最大ページ数を導く
2. おおよその最大ページ数は__小数が含まれる__(例えば173.3とかな)ので、天井(173.3->__174__)と床(173.3->__173__)の数字 __(173,174)__ を用意する
3. (2)の手順で導いた最大ページ数からページ数の合計のペアを導く
4. (3)の手順で導いたページ数の合計から当初の目的のページ数の合計(例えば15000)を引く
5. (4)の手順で導いた数を2で割って天井と床の数字のペアを用意する
6. (5)の手順で導いたペアの床が2の倍数でないものが答えとなる

## コード

~~~rust
fn boundary_max_page(x: i64) -> [i64; 2] {
    let ans_float: f64 = ((x * 2) as f64).sqrt();

    return [ans_float.floor() as i64, ans_float.ceil() as i64];
}

fn total(n: i64) -> i64 {
    return (n*(n+1)/2) as i64;
}

fn main() {
    let n: i64 = 15000;

    let max_pages = boundary_max_page(n);

    for max_page in max_pages.iter() {
        let mut total_page: i64 = total(*max_page);
        let mut taked_max_page = *max_page;
        let diff: f64 = (total_page - n) as f64;
        let diff_dived: f64 = diff / 2.0_f64;
        let mut candidates: [i64; 2] = [diff_dived.floor() as i64, diff_dived.ceil() as i64];
        if total_page == n {
            total_page += max_page+1 + max_page+2;
            candidates = [max_page+1, max_page+2];
            taked_max_page += 2;
        }
        if candidates[0] % 2 == 0 {
            continue;
        }
        println!("max page: {}", taked_max_page);
        println!("total page: {}", total_page);
        println!("diff: {}", diff);
        println("diff_dived: {}", diff_dived);
        println!("candidates: {:?}", candidates);
    }
}
~~~

<br>

## コードの解説
- boundary\_max\_page(): 手順(2)に相当する操作
- total(): 手順(3)に相当する操作
- diff: 手順(4)で得られる値
- candidates: 手順(5)で得られる数字のペア

### "candidates[0] % 2 == 0" について - 手順(6)の詳細
　ページというのは1から始まり、紙の左下に1,3,5,...と__奇数__が現れるものであるため、
偶数が現れるパターンは答えとなりえないため、答えの候補として切り捨てる

### "if total\_page == n"について
　当初の目的のページ数の合計と改めて用意したページ数の合計が一致した時、
最終ページの+1と+2が答え候補とするという操作である。

　例えば目的のページ数が15000じゃなくて300だとすると、
改めて用意したページ数の合計も300となる。
そうするとcandidatesの値としては __[0,0]__ を取ることとなってしまう。

　ここで、最終ページの後ろに紙を一枚付け足してやると、辻褄があって、
__「引き抜かれたページは最終ページの後ろの紙のページだね」__となる。

　したがって、最終ページの+1,+2した値それぞれを解答候補として保存する必要がある。

## 所感
　この問題を総当たりのような手法で解いている人がたくさんいて悲しくなってしまった。
私のこのプログラム(アルゴリズム)は、15000に限らず、一般化されているので、
どんなページ数に対しても解を導くことができるはず。

　しかしながら、どちらかというとRustの訓練感が強かった。
TypeScriptのノリでRustもクラス作ってメソッドはやしてやろうと思ったが、
調べたりして試してみたが、結局思うようなプログラムが書けなくて諦めてしまった。
訓練をもっと積んでいきたい所存である。
`;
