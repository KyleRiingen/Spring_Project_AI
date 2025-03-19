import puppeteer from "puppeteer";

export async function GET() {
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
    return Response.json({ articles });
  } catch (error) {
    console.error("Scraping error:", error);
    return Response.json({ error: "Failed to scrape articles" }, { status: 500 });
  }
}
