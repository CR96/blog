import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { muxInput } from "sanity-plugin-mux-input";
import { table } from "@sanity/table";
import schemas from "./studio/schemas/schema";
import deskStructure from "./studio/desk-structure";
import { PreviewAction } from "./studio/components/PreviewAction";

export default defineConfig({
  name: "blog",
  title: "Blog",
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool(),
    muxInput(),
    table()
  ],
  schema: {
    types: schemas,
  },
  document: {
    actions: [
      PreviewAction
    ]
  },
  basePath: "/admin"
});