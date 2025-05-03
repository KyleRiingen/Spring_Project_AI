import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { Page, Browser } from "puppeteer";

type Article = {
  title: string;
  url: string;
  content?: string;
  newsSource: string;
  author?: string;
  imageUrl?: string;
  datePublished?: string;
};

async function getContent(browser: Browser, link: string) {
  const page: Page = await browser.newPage();

  try {
    await page.goto(link, {
      waitUntil: "networkidle2",
      timeout: 120000,
    });

    const result = await page.evaluate(() => {
      const content = Array.from(document.querySelectorAll('article div[data-component="text-block"] p'))
        .map(p => p.textContent?.trim())
        .filter(Boolean);

      const author = document.querySelector('[data-testid="byline-new-contributors"] span')?.textContent?.trim() || "Unknown";

      const imageUrl = document.querySelector('meta[property="og:image"]')?.getAttribute("content") || undefined;

      const datePublished =
        document.querySelector('meta[property="article:published_time"]')?.getAttribute("content") ||
        document.querySelector('meta[property="article:modified_time"]')?.getAttribute("content") ||
        document.querySelector('time')?.getAttribute("datetime") ||
        undefined;


      return { content, author, imageUrl, datePublished };
    });

    const joinedContent = result.content.join(" ");
    const { author, imageUrl, datePublished } = result;

    return { joinedContent, author, imageUrl, datePublished };
  } catch (error) {
    console.error(`Failed to load ${link}:`, error);
    return {
      joinedContent: "Content could not be loaded.",
      author: "Unknown",
      imageUrl: undefined,
      datePublished: undefined,
    };
  } finally {
    await page.close();
  }
}

export async function GET() {
  try {
    const browser: Browser = await puppeteer.launch({ headless: true });
    const page: Page = await browser.newPage();

    await page.goto("https://www.bbc.com/news/us-canada", { waitUntil: "domcontentloaded" });

    const rawArticles: (Article | null)[] = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[data-testid="internal-link"]')).map((el) => {
        const link = el as HTMLAnchorElement;
        const title = link.querySelector('h2[data-testid="card-headline"]')?.textContent?.trim() || "";
        const url = link.href;
        return title && url ? { title, url, newsSource: "BBC" } : null;
      });
    });

    const articles: Article[] = rawArticles.filter((a) => a !== null) as Article[];

    const contentPromises = articles.map(async (article) => {
      const { joinedContent, author, imageUrl, datePublished } = await getContent(browser, article.url);
      article.content = joinedContent;
      article.author = author;
      article.imageUrl = imageUrl;
      article.datePublished = datePublished;
    });

    await Promise.all(contentPromises);
    await browser.close();

    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json({ error: "Failed to scrape articles" }, { status: 500 });
  }
}
