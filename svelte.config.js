import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const prod = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
  kit: {
    adapter: adapter({
      pages: 'docs',
      assets: 'docs',
    }),
    paths: {
      // change below to your repo name
      base: !prod ? '' : '/algo-visualization',
    },
  },
};

export default config;
