import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  srcDir: 'src',
  site: 'https://hasantutoring.com',
  integrations: [
    sitemap({
      // Routes that exist but should not be advertised to search engines:
      // member-preview is unshipped members-area work, and /practice-test is
      // a 301 redirect to /practice-tests.
      filter: (page) =>
        !page.includes('/member-preview') && !/\/practice-test$/.test(page),
    }),
  ],
});
