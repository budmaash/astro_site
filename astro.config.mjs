import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  srcDir: 'src',
  site: 'https://hasantutoring.com',
  // Renamed pages. Each old URL builds an instant-redirect page (meta refresh
  // + canonical), which search engines treat as a permanent redirect.
  redirects: {
    '/act': '/act-test-information',
    '/sat': '/sat-test-information',
    '/act_lessons/punctuation': '/act-punctuation-guide',
    '/lessons/punctuation': '/sat-punctuation-guide',
  },
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
