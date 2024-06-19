import type { Config } from "tailwindcss";
import typo from "@tailwindcss/typography";

import { join } from "path";
import { skeleton } from "@skeletonlabs/tw-plugin";

export default {
  experimental: { optimizeUniversalDefaults: true },
  darkMode: "class",
  content: [
    "./src/**/*.{css,html,js,svelte,ts}",
    join(
      require.resolve("@skeletonlabs/skeleton"),
      "../**/*.{html,js,svelte,ts}",
    ),
  ],
  theme: { extend: {} },
  plugins: [
    skeleton({
      themes: {
        // Register each theme within this array:
        preset: ["skeleton", "modern", "crimson"],
      },
    }),
    skeleton,
    typo,
  ],
} satisfies Config;
