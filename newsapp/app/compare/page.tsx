"use client";
import React, { useContext } from "react";
import ButtonProvider, { ButtonContext } from "./context/ButtonContext";
import NewsSourceButton from "../components/NewsSourceButton";
import TitleContainer from "../components/TitleContainer";
import ArticleContainer from "../components/ArticleContainer";

function PageContent() {
  const { titleButtons } = useContext(ButtonContext);

  return (
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

      {/* Step 3: Read Full Articles */}
      <section className="w-full max-w-6xl">
        <h2 className="text-center text-xl font-semibold text-gray-800 font-montserrat mb-6">
          Step 3: Read Full Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {titleButtons.length === 2 ? (
            <>
              <ArticleContainer
                source={titleButtons[0].source}
                title={titleButtons[0].title}
              />
              <ArticleContainer
                source={titleButtons[1].source}
                title={titleButtons[1].title}
              />
            </>
          ) : (
            <p className="col-span-2 text-center text-gray-500">
              Select two articles to compare.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default function ComparePage() {
  return (
    <ButtonProvider>
      <PageContent />
    </ButtonProvider>
  );
}