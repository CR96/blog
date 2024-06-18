import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import schemas from "./studio/schemas/schema";

export default defineConfig({
  name: "blog",
  title: "Blog",
  projectId: '06loossa',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool()
  ],
  schema: {
    types: schemas,
  },
  basePath: "/admin"
});