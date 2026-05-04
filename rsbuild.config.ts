import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    // @ts-expect-error unknown error below
    alias: {
      '@': './src',
    },
  },
});
