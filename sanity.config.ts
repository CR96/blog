import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { muxInput } from "sanity-plugin-mux-input";
import { table } from "@sanity/table";
import schemas from "./studio/schemas/schema";
import deskStructure from "./studio/desk-structure";
import { generateDatedPostSlug } from "./src/util";
import type { Post } from "./src/groq";
import groq from "groq";

export default defineConfig({
  name: "blog",
  title: "Blog",
  projectId: '06loossa',
  dataset: 'production',
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
    productionUrl: async (prev, context) => {
      const { document, getClient } = context;

      if (document._type != 'post') { return prev; }

      const client = getClient({ apiVersion: 'v2022-06-30' });
      const postUrlQuery = groq`
        *[_type == 'post' && _id == $id][0]
      `;
      const post = await client.fetch<Post>(postUrlQuery, { id: document._id });
      const datedSlug = generateDatedPostSlug(post.datePublished, post.slug.current);

      return `/${datedSlug}/preview`;
    }
  },
  basePath: "/admin"
});