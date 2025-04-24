"use client";

import ButtonProvider from "./context/ButtonContext";
import NewsSourceButton from "../components/NewsSourceButton";
import TitleContainer from "../components/TitleContainer";
import ArticleContainer from "../components/ArticleContainer";
import { useSearchParams } from "next/navigation";
import DisplayArticle from "../components/DisplayArticle";

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
      <div className="min-h-screen bg-white flex flex-col items-center px-6 md:px-12 pt-24 space-y-16">
        {/* Header */}
        <header className="text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 font-montserrat mb-4">
            Compare Your Favorite Political News
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 font-montserrat">
            Select two sources and see how they cover the same topic.
          </p>
        </header>

        {/* Step 1: Select News Sources */}
        <section className="w-full max-w-3xl">
          <h2 className="text-center text-xl font-semibold text-gray-800 font-montserrat mb-4">
            Step 1: Pick two sources
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <NewsSourceButton name="BBC" />
            <NewsSourceButton name="CNN" />
            <NewsSourceButton name="Fox News" />
          </div>
        </section>

        {/* Step 2: Choose Articles */}
        <section className="w-full">
          <h2 className="text-center text-xl font-semibold text-gray-800 font-montserrat mb-6">
            Step 2: Compare Article Titles
          </h2>
          <TitleContainer />
        </section>

        {/* Step 3: View Articles */}
        <section className="w-full max-w-6xl">
          <h2 className="text-center text-xl font-semibold text-gray-800 font-montserrat mb-6">
            Step 3: Read Full Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ArticleContainer />
            <ArticleContainer />
          </div>
        </section>
      </div>
    </ButtonProvider>
  );
}