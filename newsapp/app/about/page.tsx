"use client";
import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white px-6 md:px-12 max-w-4xl mx-auto py-20">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 font-montserrat">
        About This Project
      </h1>

      <p className="text-lg text-gray-700 font-montserrat mb-8 leading-relaxed">
        Bias Compare is a tool for readers who want to understand how political
        events are portrayed across different media outlets. Using AI-powered
        analysis, this site lets you view, compare, and analyze articles from
        popular news organizations — all in one place.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">What It Does</h2>
      <ul className="list-disc list-inside text-gray-700 font-montserrat space-y-2 mb-10">
        <li>Pulls articles from trusted political news sources</li>
        <li>Lets you compare coverage from two different sources side-by-side</li>
        <li>Uses an AI model to predict the political bias of each article</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
      <p className="text-gray-700 font-montserrat leading-relaxed">
        The bias detection model is based on BERT, a powerful natural language
        processing model. It classifies text as leaning left, center, or right,
        and provides confidence scores to help you interpret results critically.
        This site is built using modern technologies like Next.js, Tailwind CSS,
        and FastAPI.
      </p>

      <div className="mt-12">
        <p className="text-sm text-gray-500 font-montserrat">
          Created by Mathew Wagerman — for transparency, clarity, and better information.
        </p>
      </div>
    </div>
  );
}