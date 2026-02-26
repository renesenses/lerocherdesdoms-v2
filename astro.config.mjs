// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://renesenses.github.io',
  base: '/lerocherdesdoms-v2',
  vite: {
    plugins: [tailwindcss()]
  }
});