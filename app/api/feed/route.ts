import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://shrit.substack.com/feed", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const xmlText = await response.text();
    return new NextResponse(xmlText, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error fetching feed:", error);
    return new NextResponse("Error fetching feed", { status: 500 });
  }
}
