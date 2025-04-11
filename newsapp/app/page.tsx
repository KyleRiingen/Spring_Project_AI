"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 md:px-12">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl sm:text-6xl font-semibold text-gray-900 leading-tight mb-6 font-montserrat">
          See the News. Unfiltered.
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 font-montserrat mb-10">
          Compare political news coverage across sources, and detect bias using AI — all in one place.
        </p>

        <div className="flex justify-center gap-4 flex-col sm:flex-row">
          <Link
            href="/news"
            className="bg-black hover:bg-gray-900 text-white text-base font-medium px-6 py-3 rounded-lg transition"
          >
            Explore News
          </Link>
          <Link
            href="/compare"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-base font-medium px-6 py-3 rounded-lg border border-gray-300 transition"
          >
            Compare Articles
          </Link>
        </div>
      </div>

      <div className="mt-24 w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <FeatureCard title="AI-Powered Insights" desc="Our model classifies news bias as Left, Center, or Right with confidence scores." />
          <FeatureCard title="Source Comparison" desc="Pick two outlets and see how differently they cover the same topic." />
          <FeatureCard title="Minimal & Clear" desc="Designed to strip distractions and let you focus on what matters: the facts." />
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ title, desc }: { title: string; desc: string }) => (
  <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-white">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);
