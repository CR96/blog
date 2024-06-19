import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { muxInput } from "sanity-plugin-mux-input";
import schemas from "./studio/schemas/schema";
import deskStructure from "./studio/desk-structure";

export default defineConfig({
  name: "blog",
  title: "Blog",
  projectId: '06loossa',
  dataset: 'production',
  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool(),
    muxInput()
  ],
  schema: {
    types: schemas,
  },
  basePath: "/admin"
});