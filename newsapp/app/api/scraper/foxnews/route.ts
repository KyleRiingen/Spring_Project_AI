import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { Page, Browser } from "puppeteer";

type Article = {
    title: string;
    url: string;
    content?: string;
    newsSource : string;
};

// Function to fetch content with a longer timeout & error handling
async function getContent(browser: Browser, link: string) { 
    const page: Page = await browser.newPage(); 

    try {
        await page.goto(link, {
            waitUntil: "domcontentloaded",
            timeout: 60000, // 60 seconds timeout
        });

        // Extract all <p> tags inside the target nested divs
        const paragraphs = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.article-content-wrap .article-content .article-body p'))
                .filter(p => p.childNodes.length === 1 && p.childNodes[0].nodeType === Node.TEXT_NODE) // Ensures only pure text
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
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
    
        // Going to await the connection to Fox News Page because we need this before doing anything else 
        // Going to wait tell the content of the page loaded (waitUntil) because need that information to scrape
        await page.goto("https://www.foxnews.com/politics", { waitUntil: "domcontentloaded" });
    
        // page.evaluate() allows you to execute the lambda function inside and return 
        // whatever is on the inside 
        const articles: Article[] = await page.evaluate(() => {
            // Select all the article elements
            return Array.from(document.querySelectorAll("article"))
              .map((el) => {          
                // Find the anchor within the article, assuming anchor is within the h4 tag
                const anchor = el.querySelector("header h4 a");
          
                // Ensure the anchor exists and cast it to an HTMLAnchorElement to access href
                if (anchor && anchor instanceof HTMLAnchorElement) {
                  const title = anchor.textContent?.trim() || "";
                  const url = anchor.href; // Now `href` is valid because we know it's an anchor element
          
                  return { title, url, newsSource: "CNN" };
                }
          
                return null; // If no anchor is found, return null
              })
              .filter(article => article !== null); // Filter out null values
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