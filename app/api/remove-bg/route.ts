import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    const res = await fetch("https://api.photoroom.com/v1/segment", {
      method: "POST",
      headers: {
        "x-api-key": process.env.PHOTOROOM_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_file_b64: image.replace(/^data:image\/\w+;base64,/, ""),
      }),
    });

    const data = await res.json();

    return NextResponse.json({
      cleaned: `data:image/png;base64,${data.result_b64}`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "BG removal failed" }, { status: 500 });
  }
}
