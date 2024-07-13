import { Articles } from "~/components/unions";

export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700 px-4 pt-10 py-20 bg-main h-[calc(100vh-58px)] overflow-y-scroll">
      <Articles />
    </main>
  );
}
