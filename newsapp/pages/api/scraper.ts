import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

type Article = {
  title: string;
  url: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ articles?: Article[]; error?: string }>) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto("https://www.cnn.com/politics", { waitUntil: "domcontentloaded" });

    const articles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("a.container__link--type-article"))
        .map((el) => {
          const link = el as HTMLAnchorElement;
          const title = link.querySelector(".container__headline-text")?.textContent?.trim();
          return { title, url: link.href };
        })
        .filter(article => article.title && article.url);
    });

    await browser.close();
    res.status(200).json({ articles });
  } catch (error) {
    console.error("Scraping error:", error);
    res.status(500).json({ error: "Failed to scrape articles" });
  }
}
