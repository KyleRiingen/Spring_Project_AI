import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import {Page, Browser} from "puppeteer"

type Article = {
    title: string;
    url: string;
    content?: string;
    newsSource: string; 
};
  
// Function to fetch content with a longer timeout & error handling
async function getContent(browser: Browser, link: string) { 
    const page: Page = await browser.newPage(); 
  
    try {
      await page.goto(link, {
        waitUntil: "networkidle2", // Ensures all requests finish
        timeout: 120000, // Increase timeout to 120 seconds needed to load all the pages
      });
  
      const paragraphs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('article div[data-component="text-block"] p'))
          .map(p => p.textContent?.trim())
          .filter(Boolean);
      });
  
      return paragraphs.join(" ");
    } catch (error) {
      console.error(`Failed to load ${link}:`, error);
      return "Content could not be loaded.";
    } finally {
      await page.close(); // Always close the page
    }
  }

export async function GET() {
  try {
    const browser: Browser = await puppeteer.launch({ headless: false });
    const page: Page = await browser.newPage();

    await page.goto("https://www.bbc.com/news/us-canada", { waitUntil: "domcontentloaded" });

    const articles: Article[] = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[data-testid="internal-link"]'))
        .map((el) => {
          const link = el as HTMLAnchorElement;
          let title = link.querySelector('h2[data-testid="card-headline"]')?.textContent?.trim() || "";


          return { title, url: link.href, newsSource: "BBC" };
        })
        .filter(article => article.title && article.url);
    });


    // Assign content to articles
    const contentPromises = articles.map(async (article) => {
        article.content = await getContent(browser, article.url);
    });
    await Promise.all(contentPromises);
  

    await browser.close();

    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json({ error: "Failed to scrape articles" }, { status: 500 });
  }
}