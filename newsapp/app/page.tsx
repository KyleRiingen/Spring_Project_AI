"use client";
import Link from "next/link";
import ScrollingArticles from "./components/ScrollingArticles";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen pt-32 bg-[#F0F2F5] font-montserrat">

      {/* Hero Section */}
      <section className="px-4 md:px-8 max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-left">
          <h1 className="text-6xl font-extrabold text-[#181818] leading-tight mb-6 tracking-tight">
            AI <span className="underline underline-offset-4">transparency</span> and{" "}
            <span className="underline underline-offset-4">tools</span> for the next generation of media
          </h1>
          <p className="text-xl text-[#4C5760] font-medium mb-10 max-w-2xl">
            Unbias.ai lets you compare political coverage, analyze perspectives, and detect news bias — powered by AI.
          </p>

          {/* CTA Buttons with Descriptions */}
          <div className="mt-10 flex flex-col sm:flex-row gap-6 text-left max-w-5xl">
            {/* News Card */}
            <div className="bg-white border border-[#D0D3D8] rounded-xl p-6 shadow-sm flex-1">
              <p className="text-sm font-semibold text-[#7289AB] mb-1">ARTICLES</p>
              <h3 className="text-2xl font-bold text-[#1F2A44] mb-2">Explore the News</h3>
              <p className="text-base text-[#4C5760] mb-6">
                Browse current articles across various political news sources.
              </p>
              <Link
                href="/news"
                className="block w-full text-center bg-[#1F2A44] hover:bg-[#181d2e] text-white text-base font-semibold px-6 py-3 rounded-md transition"
              >
                Go to News
              </Link>
            </div>

            {/* Compare Card */}
            <div className="bg-white border border-[#D0D3D8] rounded-xl p-6 shadow-sm flex-1">
              <p className="text-sm font-semibold text-[#7289AB] mb-1">COMPARE</p>
              <h3 className="text-2xl font-bold text-[#1F2A44] mb-2">Compare Coverage</h3>
              <p className="text-base text-[#4C5760] mb-6">
                See how different sources report the same story and analyze their bias.
              </p>
              <Link
                href="/compare"
                className="block w-full text-center border border-[#1F2A44] text-[#1F2A44] hover:bg-[#e9ecf0] text-base font-semibold px-6 py-3 rounded-md transition"
              >
                Go to Compare
              </Link>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-md">
          <Image
            src="balance.svg"
            alt="Hero visual"
            width={500}
            height={500}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* Scrolling Articles */}
      <section className="mt-20">
        <ScrollingArticles />
      </section>

      {/* Features */}
      <section className="mt-24 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center text-[#1F2A44] mb-12">
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
      <section className="mt-32 bg-[#e6e4f0] py-20 text-center">
        <h2 className="text-4xl font-bold text-[#1F2A44] mb-6">
          Read Smarter, Stay Informed
        </h2>
        <p className="text-lg text-[#4C5760] mb-10">
          Thousands use Unbias.ai to cut through media noise.
        </p>
        <Link
          href="/news"
          className="bg-[#1F2A44] hover:bg-[#181d2e] text-white font-semibold px-8 py-4 rounded-full shadow-lg transition"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
}

const FeatureCard = ({ title, desc, icon }: { title: string; desc: string; icon: string }) => (
  <div className="p-6 bg-white border border-[#D0D3D8] rounded-xl shadow-sm hover:shadow-md transition text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-[#1F2A44] mb-2">{title}</h3>
    <p className="text-sm text-[#4C5760]">{desc}</p>
  </div>
);
