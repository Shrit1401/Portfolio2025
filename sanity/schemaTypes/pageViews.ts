import { defineField, defineType } from "sanity";

export const pageViews = defineType({
  name: "pageViews",
  title: "Page Views",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "string" }),
    defineField({ name: "count", title: "Views", type: "number" }),
  ],
});
