import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  integrations: [mdx()],
  devToolbar: {
    enabled: false
  },
  markdown: {
    remarkPlugins: [remarkGfm],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
