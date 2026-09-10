# Publishing

> [!CAUTION]
> CI publishes via npm Trusted Publishing (OIDC), but the first release can't use it — npm only lets you configure a Trusted Publisher on a package that already exists.

For the first release:

## Claim the Name

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

## Configure Trusted Publishing

In the npmjs.com package settings, add a trusted publisher pointing at this repo and the publish workflow file. See [trusted publishers](https://docs.npmjs.com/trusted-publishers).

## Publish Through CI

Bump the version, then create a GitHub Release for the new tag. The publish workflow runs on release and publishes with provenance — no token needed.

## Unpublish the Placeholder

> [!CAUTION]
> Do this only after a real version is published through CI — otherwise removing the only version deletes the whole package and locks the name for 24 hours. npm only allows unpublishing a version within 72 hours of publishing it.

```shell
npm login
npm unpublish <pkg-name>@0.0.0
npm logout
```
