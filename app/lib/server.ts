"use server";

import { client } from "@/sanity/lib/client";
import { unstable_noStore as noStore } from "next/cache";

export async function getWorks() {
  noStore();
  try {
    const data = await client.fetch(`*[_type == "work"]`);
    data.sort(
      (a: { _createdAt: string }, b: { _createdAt: string }) =>
        new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime(),
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}
