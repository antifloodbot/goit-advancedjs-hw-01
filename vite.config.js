import { defineConfig } from 'vite';
import { glob } from 'glob';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => ({
  base: '/goit-advancedjs-hw-01/',
  define: { [command === 'serve' ? 'global' : '_global']: {} },

  root: '.',

  server: {
    open: '/index.html',
  },

  build: {
    sourcemap: true,
    rollupOptions: {
      input: glob.sync('./*.html'),
    },
    outDir: 'dist',
    emptyOutDir: true,
  },

  css: {
    postcss: {
      plugins: [SortCss({ sort: 'mobile-first' })],
    },
  },
}));