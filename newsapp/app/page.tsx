"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen pt-32 bg-gray-100">

      {/* Hero */}
      <section className="text-center px-6 md:px-12">
        <h1 className="text-5xl md:text-6xl font-bold font-montserrat text-gray-800 mb-6 leading-tight">
          See the News. Unfiltered.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-montserrat mb-10">
          Compare political news coverage across sources, and detect bias using AI — all in one place.
        </p>

        <div className="flex justify-center gap-4 flex-col sm:flex-row">
          <Link
            href="/news"
            className="bg-blue-900 hover:bg-blue-950 text-white text-base font-semibold px-6 py-3 rounded-full shadow transition"
          >
            Explore News
          </Link>
          <Link
            href="/compare"
            className="bg-white hover:bg-gray-200 text-gray-800 border border-gray-400 text-base font-semibold px-6 py-3 rounded-full transition"
          >
            Compare Articles
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mt-24 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 font-montserrat">
          Why Use Unbias.ai?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <FeatureCard
            title="AI-Powered Insights"
            desc="Classify articles Left, Center, or Right with confidence."
            icon="🧠"
          />
          <FeatureCard
            title="Source Comparison"
            desc="See side-by-side how different outlets report the same story."
            icon="📰"
          />
          <FeatureCard
            title="Minimal & Clear"
            desc="No clutter. Focus purely on facts."
            icon="🎯"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-32 bg-gray-200 py-20 text-center">
        <h2 className="text-4xl font-bold font-montserrat text-gray-800 mb-6">
          Read Smarter, Stay Informed
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Thousands use Unbias.ai to cut through media noise.
        </p>
        <Link
          href="/news"
          className="bg-blue-900 hover:bg-blue-950 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
}

const FeatureCard = ({ title, desc, icon }: { title: string; desc: string; icon: string }) => (
  <div className="p-6 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);
