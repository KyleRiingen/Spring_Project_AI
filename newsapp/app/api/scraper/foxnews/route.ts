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
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    const result = await page.evaluate(() => {
      const content = Array.from(document.querySelectorAll("div.article-body p"))
        .map(p => p.textContent?.trim())
        .filter(Boolean);

      const authorName =
        document.querySelector(".author-byline span")?.textContent?.trim() || "Unknown";

      const imageUrl =
        document.querySelector('meta[property="og:image"]')?.getAttribute("content") || undefined;

      const datePublished =
        document.querySelector('meta[property="article:published_time"]')?.getAttribute("content") ||
        document.querySelector('meta[name="dc.date"]')?.getAttribute("content") ||
        document.querySelector('meta[name="pubdate"]')?.getAttribute("content") ||
        undefined;

      return { content, authorName, imageUrl, datePublished };
    });

    const joinedContent = result.content.join(" ");
    const { authorName, imageUrl, datePublished } = result;

    return { joinedContent, authorName, imageUrl, datePublished };
  } catch (error) {
    console.error(`Failed to load ${link}:`, error);
    return {
      joinedContent: "Content could not be loaded.",
      authorName: "Unknown",
      imageUrl: undefined,
      datePublished: undefined,
    };
  } finally {
    await page.close();
  }
}

export async function GET() {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://www.foxnews.com/politics", { waitUntil: "domcontentloaded" });

    const rawArticles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("article")).map((el) => {
        const anchor = el.querySelector("header h4 a");
        const img = el.querySelector("img");

        if (anchor && anchor instanceof HTMLAnchorElement) {
          const title = anchor.textContent?.trim() || "";
          const url = anchor.href;
          const imageUrl = img?.src ?? undefined;

          return {
            title,
            url,
            newsSource: "Fox News",
            imageUrl,
          };
        }

        return null;
      });
    });

    const articles: Article[] = rawArticles.filter((a) => a !== null) as Article[];

    const contentPromises = articles.map(async (article) => {
      const { joinedContent, authorName, imageUrl, datePublished } = await getContent(browser, article.url);
      article.content = joinedContent;
      article.author = authorName;
      article.imageUrl = article.imageUrl || imageUrl || undefined;
      article.datePublished = datePublished ?? undefined;
    });

    await Promise.all(contentPromises);
    await browser.close();

    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json({ error: "Failed to scrape articles" }, { status: 500 });
  }
}
