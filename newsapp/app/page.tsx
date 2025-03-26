import NewsSourceButton from "./components/NewsSourceButton";
export default function Home() {
  return (
    <div className="w-full h-full">
      {/*TITLE*/}
      <div className="font-sigmar text-5xl flex items-center justify-center m-4">
        <h1>Compare Your Favorite Political News</h1>
      </div>

      {/*Description*/}
      <div className="w-full flex justify-center font-montserrat font-bold text-xl">
        <h2>Select two from the following options to compare political views</h2>
      </div>

      {/* Selectable News Boxes */}
      <div className="flex flex-row justify-center gap-6 mt-6">
        <NewsSourceButton name="BBC"/>
        <NewsSourceButton name="CNN"/>
        <NewsSourceButton name="Fox News"/>
      </div>
    </div>
  );
}
