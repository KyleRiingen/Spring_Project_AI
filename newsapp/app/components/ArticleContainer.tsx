"use client";
import React from "react";
import DisplayArticle from "./DisplayArticle";
import { useSingleArticle } from "../hooks/useSingleArticle";
import { useRenderTime } from "../hooks/useRenderTime";

interface ArticleContainerProps {
   source: string;
   title: string;
}

function ArticleContainer({ source, title }: ArticleContainerProps) {
   useRenderTime("ArticleContainer");
   const { article, loading, error } = useSingleArticle(source, title);

   return (
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 w-full min-h-[300px]">
         {loading && <p className="text-gray-500">Loading...</p>}
         {error && <p className="text-red-500">Error: {error}</p>}
         {article ? <DisplayArticle source={source} title={title} /> : !loading && !error && <p className="text-gray-500">No article found.</p>}
      </div>
   );
}

export default ArticleContainer;
