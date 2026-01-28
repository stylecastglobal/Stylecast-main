import { NextResponse } from "next/server";

const metaTagRegex = (property: string) =>
  new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["'][^>]*>`,
    "i"
  );

const findMeta = (html: string, property: string) => {
  const match = html.match(metaTagRegex(property));
  return match?.[1];
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("url");

  if (!target) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return NextResponse.json({ error: "Invalid protocol" }, { status: 400 });
  }

  try {
    const res = await fetch(parsed.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Safari/537.36",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch page" },
        { status: 502 }
      );
    }

    const html = await res.text();
    const image =
      findMeta(html, "og:image") ||
      findMeta(html, "og:image:secure_url") ||
      findMeta(html, "twitter:image");
    const title =
      findMeta(html, "og:title") || findMeta(html, "twitter:title");
    const source = parsed.hostname.replace(/^www\./, "");

    if (!image) {
      return NextResponse.json(
        { error: "No preview image found" },
        { status: 422 }
      );
    }

    return NextResponse.json({
      image,
      title,
      source,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}
