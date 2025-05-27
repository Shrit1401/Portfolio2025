import { defineField, defineType } from "sanity";

export const past = defineType({
  title: "Past",
  name: "past",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),

    defineField({
      name: "description",
      type: "string",
    }),

    defineField({
      name: "year",
      type: "string",
    }),
  ],
});
