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
    <div className="mt-6 p-4 border rounded-lg bg-white shadow-sm max-w-4xl">
      <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
      {article.author && (
        <p className="text-sm text-gray-500 mb-2">By {article.author}</p>
      )}
      {article.link && (
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm mb-4 block"
        >
          Read original article
        </a>
      )}

      <p className="whitespace-pre-line text-gray-800 mb-4">
        {article.content}
      </p>

      <div className="mt-4 p-3 border-t pt-2">
        <h3 className="text-lg font-semibold">Bias Detection</h3>
        {biasLoading && <p>Analyzing bias...</p>}
        {biasError && <p className="text-red-500">Bias API error: {biasError}</p>}
        {bias && (
          <div>
            <p>
              <span className="font-bold">Predicted Bias:</span> {bias.predicted}
            </p>
            <p className="text-sm mt-1 text-gray-600">
              Scores: {bias.bias_scores.map((score, i) => (
                <span key={i} className="mr-2">
                  [{score.toFixed(3)}]
                </span>
              ))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayArticle;
