import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

type Article = {
  title: string;
  url: string;
};

export async function GET() {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://www.bbc.com/news/us-canada", { waitUntil: "domcontentloaded" });

    const articles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[data-testid="internal-link"]'))
        .map((el) => {
          const link = el as HTMLAnchorElement;
          let title = link.querySelector('h2[data-testid="card-headline"]')?.textContent?.trim() || "";
          return { title, url: link.href };
        })
        .filter(article => article.title && article.url);
    });

    await browser.close();

    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json({ error: "Failed to scrape articles" }, { status: 500 });
  }
}