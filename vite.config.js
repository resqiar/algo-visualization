import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  optimizeDeps: {
    include: ['highlight.js', 'highlight.js/lib/core'],
  },
  ssr: {
    noExternal: ['chart.js/**']
  },
  build: {
    target: 'esnext'
  }
};

export default config;
