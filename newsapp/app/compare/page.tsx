"use client";
import ButtonProvider from "./context/ButtonContext";
import NewsSourceButton from "../components/NewsSourceButton";
import TitleContainer from "../components/TitleContainer";
import ArticleContainer from "../components/ArticleContainer";

import { useSearchParams } from "next/navigation";
import DisplayArticle from "../components/DisplayArticle"; // make sure path is correct


export default function ComparePage() {

    const searchParams = useSearchParams();
const source = searchParams.get("source");
const title = searchParams.get("title");

if (source && title) {
  return (
    <div className="pt-20 px-6 max-w-5xl mx-auto">
      <DisplayArticle source={source} title={title} />
    </div>
  );
}

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
