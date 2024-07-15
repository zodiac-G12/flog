import { A } from "@solidjs/router";
import { format } from "date-fns";
import NotFoundImg from "~/assets/notfound.jpg";

const Thumbnail = (props: { img?: string; title: string }) => {
  return (
    <div class="flex justify-center items-center py-1 w-[276px] h-[200px] bg-black">
      <img
        src={props.img ?? NotFoundImg}
        alt={props.title}
        width={"276"}
        height={"192"}
      />
    </div>
  );
};

const ArticleTitleAndDate = (props: { title: string; date: Date }) => {
  return (
    <div class="flex flex-wrap flex-col justify-between items-center h-[60px] py-1">
      <p class="w-[276px] text-lg font-bold truncate">{props.title}</p>
      <p class="text-sm">{format(props.date, "yyyy年MM月dd日 公開")}</p>
    </div>
  );
};

export const Article = (props: {
  title: string;
  date: Date;
  img?: string;
  id: string;
}) => {
  return (
    <A
      href={`/articles/${props.id}`}
      class="rounded-lg text-gray-100 bg-[#fff6ef]/[0.3] w-[300px] h-[268px] px-3 py-2"
    >
      <Thumbnail title={props.title} img={props.img} />
      <ArticleTitleAndDate title={props.title} date={props.date} />
    </A>
  );
};
