"use client";
import ButtonProvider from "./context/ButtonContext";
import NewsSourceButton from "../components/NewsSourceButton";
import TitleContainer from "../components/TitleContainer";
import ArticleContainer from "../components/ArticleContainer";

export default function ComparePage() {
  return (
    <ButtonProvider>
      <div className="w-full h-full">
        <div className="font-sigmar text-5xl flex items-center justify-center m-4">
          <h1>Compare Your Favorite Political News</h1>
        </div>

        <div className="w-full flex justify-center font-montserrat font-bold text-xl">
          <h2>Select two from the following options to compare political views</h2>
        </div>

        <div className="flex flex-row justify-center gap-6 mt-6">
          <NewsSourceButton name="BBC" />
          <NewsSourceButton name="CNN" />
          <NewsSourceButton name="Fox News" />
        </div>

        <TitleContainer />

        <div className="flex flex-row">
          <ArticleContainer />
          <ArticleContainer />
        </div>
      </div>
    </ButtonProvider>
  );
}
