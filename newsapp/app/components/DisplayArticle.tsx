"use client";
import React from "react";
import { useSingleArticle } from "../hooks/useSingleArticle";
import { useBiasPrediction } from "../hooks/useBiasPrediction";

interface DisplayArticleProps {
  source: string;
  title: string;
}

const DisplayArticle: React.FC<DisplayArticleProps> = ({ source, title }) => {
  const { article, loading, error } = useSingleArticle(source, title);
  const {
    bias,
    loading: biasLoading,
    error: biasError,
  } = useBiasPrediction(article?.content ?? null);

  if (loading) return <p className="text-gray-500">Loading article...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!article) return null;

  return (
    <div className="mt-6 p-6 rounded-2xl bg-white shadow-md space-y-6 border border-gray-200">
      {/* 🖼️ Image */}
      {/* {article.imageUrl && ( */}
        <img
          // src={article.imageUrl}
          src="https://via.placeholder.com/600x400" // Placeholder image for demo purposes
          alt="Article Image"
          className="w-full h-64 object-cover rounded-lg"
        />
      {/* )} */}

      {/* 📰 Title + Meta */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-gray-900">{article.title}</h2>
        {article.author && (
          <p className="text-sm text-gray-600 mb-1">By {article.author}</p>
        )}
        {article.link && (
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            Read original article →
          </a>
        )}
      </div>

      {/* 🧠 Summary (placeholder for DB content) */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <h3 className="text-md font-semibold text-gray-700 mb-1">Summary</h3>
        <p className="text-sm text-gray-700">
          {/* Replace this with DB-powered summary */}
          {/* Summary: A short excerpt summarizing the article content. */}
          This is a placeholder for a short summary of the article. When integrated with your DB, this will show article highlights.
        </p>
      </div>

      {/* 🧭 Bias Detection */}
      <div className="pt-4 border-t">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Bias Detection</h3>
        {biasLoading && <p className="text-gray-500">Analyzing bias...</p>}
        {biasError && <p className="text-red-500">Bias API error: {biasError}</p>}
        {bias && (
          <div className="space-y-1">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              bias.predicted === "Left" ? "bg-red-100 text-red-800" :
              bias.predicted === "Right" ? "bg-blue-100 text-blue-800" :
              "bg-gray-100 text-gray-800"
            }`}>
              Bias: {bias.predicted}
            </span>
            <p className="text-xs text-gray-600">
              Scores: {bias.bias_scores.map((score, i) => (
                <span key={i} className="mr-2">[{score.toFixed(3)}]</span>
              ))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayArticle;
