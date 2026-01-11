import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productUrl = searchParams.get("url");

    if (!productUrl) {
      return NextResponse.json({ error: "Missing URL" }, { status: 400 });
    }

    // PUT YOUR API KEY HERE
    const API_KEY = process.env.SCRAPER_API_KEY;

    const scraperUrl = `https://api.scraperapi.com?api_key=${API_KEY}&url=${encodeURIComponent(
      productUrl
    )}`;

    const response = await fetch(scraperUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119 Safari/537.36",
      },
      cache: "no-store",
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    const title =
      $('meta[property="og:title"]').attr("content") ||
      $("title").text() ||
      "Untitled Product";

    const image =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      null;

    const price =
      $('meta[property="product:price:amount"]').attr("content") ||
      $('meta[property="og:price:amount"]').attr("content") ||
      $("meta[itemprop='price']").attr("content") ||
      $("meta[name='twitter:data1']").attr("content") ||
      null;

    const domain = new URL(productUrl).hostname.replace("www.", "");

    return NextResponse.json({
      title,
      image,
      price,
      domain,
      url: productUrl,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Scrape failed" },
      { status: 500 }
    );
  }
}
