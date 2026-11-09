# SCE Open Source

Umbrella site for the open-source components of **SCE**, Siradel's geospatial
ecosystem. Built with [Hugo](https://gohugo.io/) and Tailwind CSS.

## Prerequisites

- [Node.js](https://nodejs.org/) 24+
- [Hugo Extended](https://gohugo.io/installation/) 0.162.1+

## Usage

```
pnpm install
pnpm dev      # local server
pnpm build    # static site in public/
```

On Windows, use `npm` instead of `pnpm`.

## Content

Home page content lives in the front matter of `content/_index.en.html` and
`content/_index.fr.html`. Keep both languages in sync.

`assets/design-system/` is vendored from
[design-system](https://github.com/siradel-oss/design-system): do not edit the
generated token files by hand.

## Deployment

Published to <https://sce.oss.siradel.com/> on GitHub Pages by the
`Deploy website` workflow (manual trigger).

## License

[MIT](LICENSE)
