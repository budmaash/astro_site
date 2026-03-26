# hasasntutoring-static

Minimal Astro shell project that preserves the Hasan Tutoring Squarespace header and footer exactly as rendered in `/pattern`.

Structure:

- `src/layouts/SquarespaceShellLayout.astro`: shared shell head/body classes and shared asset loading
- `src/config/shell.ts`: reusable shell configuration
- `src/components/SquarespaceHeader.astro`: reusable header component
- `src/components/SquarespaceFooter.astro`: reusable footer component
- `src/fragments/header.html`: exact extracted header markup
- `src/fragments/footer.html`: exact extracted footer markup
- `src/pages/index.astro`: blank-body page with the exact header and footer
- `public/sqs-shell/`: deduped shared Squarespace assets required by the shell

Run:

```bash
npm run dev
```
