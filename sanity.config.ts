import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { muxInput } from "sanity-plugin-mux-input";
import { recurringDates } from 'sanity-plugin-recurring-dates';
import { dashboardTool } from "@sanity/dashboard";
import { vercelWidget } from "sanity-plugin-dashboard-widget-vercel";
import { table } from "@sanity/table";
import schemas from "@studio/schemas/schema";
import deskStructure from "@studio/desk-structure";
import { PreviewAction } from "@studio/components/PreviewAction";

export default defineConfig({
  name: "blog",
  title: "Blog",
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  apiVersion: 'v2022-03-07',
  plugins: [
    dashboardTool({
        widgets: [
          vercelWidget(),
        ],
      }
    ),
    structureTool({
      title: 'Content',
      structure: deskStructure
    }),
    muxInput({
      max_resolution_tier: '2160p'
    }),
    recurringDates(),
    visionTool(),
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
  tasks: {
    enabled: false
  },
  scheduledPublishing: {
    enabled: false
  }
});