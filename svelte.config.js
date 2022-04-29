import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const env = process.env.NODE_ENV
console.log(`ENV=${env}`)

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    /* SPA */
    prerender: {
      default: true
    },
    paths: {
      base: env === "production" ? "/apps/canonical" : ""
    }
  }
};

export default config;
