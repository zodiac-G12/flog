import { MImg } from "~/components/parts";
import FlogImg from "~/assets/flog.svg";

export const Crown = () => {
  return (
    <div class="flex justify-center items-center gap-3 bg-gray-200 py-1">
      <MImg filename={FlogImg} alt="Flog" />
      <span class="align-middle text-4xl text-emerald-800 font-helventica font-[1000] tracking-wider">
        FLOG
      </span>
    </div>
  );
};
