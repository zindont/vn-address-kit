# vietnam-address-kit Playground

Interactive static playground for trying `vietnam-address-kit` in a browser.

## Local Development

```bash
npm run playground:dev
```

## Build

```bash
npm run playground:build
```

The playground imports the package through a Vite alias that points to `src/index.ts`, so it always reflects the current repository state.

The root `package.json` uses a `files` whitelist, so this directory is not published to npm.
