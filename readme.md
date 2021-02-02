# IMX Svelte Frontend


### Technology stack

1. Svelte 3.x
2. Routify 2.x
3. Bootstrap 5.x with Sveltestrap
4. Svelte i18n 3.x
5. Rollup


### Running

```bash
# Install npm packages
npm install

# Dev mode (SPA on port 5000)
npm run dev

# Dev mode (SPA on port 5000 and SSR on port 5005)
npm run rollup
```

### Building productoin bundle
```bash
npm run build

# Preview the build
npm run serve
```


### Backend api / Space configuration

The active Backend api / space configuration can be set under `src/space_config/index.js`
