import { type SchemaTypeDefinition } from "sanity";
import { work } from "./work";
import {
  pastChapter,
  pastEvent,
  pastTimeline,
} from "./pastTimeline";
import { buildLogEntry, buildLogList } from "./buildLog";
import { ropePolaroidGallery } from "./ropePolaroidGallery";
import { pageViews } from "./pageViews";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    work,
    pastChapter,
    pastEvent,
    pastTimeline,
    buildLogEntry,
    buildLogList,
    ropePolaroidGallery,
    pageViews,
  ],
};
