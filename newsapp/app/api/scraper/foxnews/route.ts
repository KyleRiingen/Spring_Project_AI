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
    
        // Going to await the connection to Fox News Page because we need this before doing anything else 
        // Going to wait tell the content of the page loaded (waitUntil) because need that information to scrape
        await page.goto("https://www.foxnews.com/politics", { waitUntil: "domcontentloaded" });
    
        // page.evaluate() allows you to execute the lambda function inside and return 
        // whatever is on the inside 
        const articles = await page.evaluate(() => {
            // Select all the article elements
            return Array.from(document.querySelectorAll("article"))
              .map((el) => {          
                // Find the anchor within the article, assuming anchor is within the h4 tag
                const anchor = el.querySelector("header h4 a");
          
                // Ensure the anchor exists and cast it to an HTMLAnchorElement to access href
                if (anchor && anchor instanceof HTMLAnchorElement) {
                  const title = anchor.textContent?.trim() || "";
                  const url = anchor.href; // Now `href` is valid because we know it's an anchor element
          
                  return { title, url };
                }
          
                return null; // If no anchor is found, return null
              })
              .filter(article => article !== null); // Filter out null values
          });
    
        await browser.close();
    
        return NextResponse.json({ articles }, { status: 200 });
    } catch (error) {
        console.error("Scraping error:", error);
        return NextResponse.json({ error: "Failed to scrape articles" }, { status: 500 });
    }
    
}