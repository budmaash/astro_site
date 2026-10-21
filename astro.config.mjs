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
        !page.includes('/member-preview') && !/\/practice-test\/?$/.test(page),
      // List the slash-less form so the sitemap matches each page's canonical
      // (SquarespaceShellLayout strips the slash). Done here rather than with
      // trailingSlash: 'never', which 404'd every /path/ URL (see d689efb).
      serialize(item) {
        const url = new URL(item.url);
        if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/, '');
        item.url = url.href;
        return item;
      },
    }),
  ],
});
