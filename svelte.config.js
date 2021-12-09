import preprocess from "svelte-preprocess";
import static_adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: static_adapter({
      pages: "build",
      assets: "build",
      fallback: null,
    }),
    paths: {
      base: "", //"/hotshots-viz"
    },
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
  },
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;
