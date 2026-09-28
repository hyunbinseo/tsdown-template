## Set Minimum Runtimes

Explicitly set [`target`](https://tsdown.dev/options/target) and `platform` in `tsdown.config.ts`.

> [!IMPORTANT]
> `tsconfig.json`'s `target`, `lib`, and `types` are static.
>
> - Keep `target` at `esnext`; tsdown still reads it for `useDefineForClassFields`.
> - `lib` and `types` are not derived from `package.json`'s [`engines`](#node-library) or `tsdown.config.ts`'s `target`.
> - tsdown lowers syntax but does not polyfill APIs, so unsupported APIs can still type-check.

## Using Node APIs

- Install `@types/node`, pinned to a major (see below).
- Add `"node"` to `tsconfig.json`'s `types`.

> [!WARNING]
> `@types/node` declares globals, so only one version can be loaded per project.

## Node Library

- Set `package.json`'s `engines` (e.g. `"node": ">=24"`).
- Set `platform: 'node'` in `tsdown.config.ts`.
- Pin [`@types/node`](#using-node-apis) to the `engines` major.

## Runtime-Agnostic Library

If dev code (e.g. tests) uses [Node APIs](#using-node-apis):

- Pin `@types/node` to the dev environment's Node major.
- Type-check library code without it:

```jsonc
// package.json
{
	"scripts": {
		"check": "tsc && tsc -p tsconfig.lib.json",
	},
}
```

```jsonc
// tsconfig.lib.json
{
	"extends": "./tsconfig.json",
	"include": ["src"],
	"exclude": ["src/**/*.test.*"], // dev code (e.g. tests)
	"compilerOptions": {
		"lib": [
			"es2023", // sync with tsdown.config.ts's target
			"webworker", // sync with tsconfig.json's lib
		],
		"types": [],
	},
}
```

## Optional `package.json` Fields

```jsonc
{
	"license": "MIT",
	"sideEffects": false,
	"imports": { "#src/*": "./src/*" },
	"publishConfig": { "access": "public" },
}
```

## Publishing

> [!CAUTION]
> CI publishes via npm Trusted Publishing (OIDC), but the first release can't use it — npm only lets you configure a Trusted Publisher on a package that already exists.

For the first release:

### Claim the Name

> [!NOTE]
> Standalone pnpm ships without npm — install it globally if missing: `pnpm add -g npm`.

> [!NOTE]
> `--tag placeholder` keeps `0.0.0` off the `latest` tag, so the first CI release takes `latest` as usual.

```shell
npm login
# Logged in on https://registry.npmjs.org/.

npm publish --tag placeholder
# Authenticate your account at: …

npm logout
```

### Configure Trusted Publishing

In the npmjs.com package settings, add a trusted publisher pointing at this repo and the publish workflow file. See [trusted publishers](https://docs.npmjs.com/trusted-publishers).

### Publish Through CI

Bump the version, then create a GitHub Release for the new tag. The publish workflow runs on release and publishes with provenance — no token needed.

### Unpublish the Placeholder

> [!CAUTION]
> Do this only after a real version is published through CI — otherwise removing the only version deletes the whole package and locks the name for 24 hours. npm only allows unpublishing a version within 72 hours of publishing it.

```shell
npm login
npm unpublish <pkg-name>@0.0.0
npm logout
```
