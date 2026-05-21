import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/writeClient";

type Params = Promise<{ slug: string }>;

export async function GET(_req: NextRequest, { params }: { params: Params }) {
  const { slug } = await params;
  const doc = await client.fetch<{ count: number } | null>(
    `*[_type == "pageViews" && slug == $slug][0]{ count }`,
    { slug }
  );
  return NextResponse.json({ count: doc?.count ?? 0 });
}

export async function POST(_req: NextRequest, { params }: { params: Params }) {
  const { slug } = await params;

  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "pageViews" && slug == $slug][0]{ _id }`,
    { slug }
  );

  let count: number;
  if (existing) {
    const updated = await writeClient
      .patch(existing._id)
      .inc({ count: 1 })
      .commit<{ count: number }>();
    count = updated.count;
  } else {
    const created = await writeClient.create({
      _type: "pageViews",
      slug,
      count: 1,
    }) as { count: number };
    count = created.count;
  }

  return NextResponse.json({ count });
}
