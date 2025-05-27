import { defineField, defineType } from "sanity";

export const work = defineType({
  title: "Work",
  name: "work",
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
      type: "number",
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),

    defineField({
      name: "usefullinks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "link",
              type: "url",
            },
          ],
        },
      ],
    }),
  ],
});
