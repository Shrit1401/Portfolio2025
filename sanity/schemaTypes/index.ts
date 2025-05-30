import { type SchemaTypeDefinition } from "sanity";
import { work } from "./work";
import { past } from "./past";
import { research } from "./research";
import { tag } from "./tag";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [work, past, research, tag],
};
