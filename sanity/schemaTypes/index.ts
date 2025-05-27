import { type SchemaTypeDefinition } from "sanity";
import { work } from "./work";
import { past } from "./past";
import { research } from "./research";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [work, past, research],
};
