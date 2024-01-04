import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({ rollupTypes: true }), // declare d.ts file
  ],
  build: {
    lib: {
      name: "sdk",
      // single entry point for the library
      entry: resolve(__dirname, "src/index.ts"),
      // format of the generated bundle
      formats: ["es", "cjs"],
      // separate format output to different files
      fileName: (format) => `index.${format}.js`,
    },
  },
});
