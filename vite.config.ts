import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  base: process.env.GITHUB_PAGES ? 'flog' : './',
  build: {
    target: 'esnext',
    outDir: 'docs',
  },
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      '@/': `${__dirname}/src/`,
    },
  },
});
