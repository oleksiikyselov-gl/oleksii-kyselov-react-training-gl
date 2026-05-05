import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  output: {
    assetPrefix: './',
  },
  source: {
    // @ts-expect-error unknown error below
    alias: {
      '@': './src',
    },
  },
});
