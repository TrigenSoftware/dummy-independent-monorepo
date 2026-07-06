# dummy-independent-monorepo

A dummy independent-mode pnpm workspaces monorepo to test [simple-release](https://github.com/TrigenSoftware/simple-release) flows in real conditions.

- Project type: [`@simple-release/pnpm#PnpmWorkspacesProject`](https://github.com/TrigenSoftware/simple-release/tree/main/packages/pnpm#readme) with `mode: independent`
- Release automation: [simple-release-action](https://github.com/TrigenSoftware/simple-release-action)
- Publishes `@trigensoftware/dummy-independent-monorepo-{foo,bar,baz}` to GitHub Packages, each with its own version and `dummy-independent-monorepo-<name>@X.Y.Z` tag
- `bar` depends on `foo` through the `workspace:` protocol
- Maintenance branches are enabled in [`.simple-release.json`](.simple-release.json)

> [!NOTE]
> Commit scopes must match package names without the npm scope, e.g. `feat(dummy-independent-monorepo-foo): ...` — commits with other scopes are not attributed to any package.

## Test scenarios

### Regular release

Push a `feat(dummy-independent-monorepo-foo): ...` commit to `main`. The action creates or updates a single release pull request bumping only the affected packages, each to its own version. Merge it to tag (`dummy-independent-monorepo-foo@X.Y.Z`), publish the bumped packages, and create a GitHub release per package.

### Manual release (version bump form)

Actions → Release → Run workflow. Fill in `version`, `as`, `prerelease`, or `by-project` (e.g. `{"@trigensoftware/dummy-independent-monorepo-foo":{"as":"minor"},"@trigensoftware/dummy-independent-monorepo-baz":{"skip":true}}`) to shape the bump.

### Options via pull request comment

Comment on an open release pull request:

````md
!simple-release/set-options

```json
{
  "bump": {
    "prerelease": "alpha"
  }
}
```
````

### Snapshot release

Actions → Snapshot → Run workflow. Publishes temporary snapshot versions of the changed packages (timestamped prerelease) to GitHub Packages under the given npm tag without committing anything.

### Maintenance branches

Release a new major of a package (e.g. `foo` `1.x` → `2.0.0`) — a `dummy-independent-monorepo-foo@1` maintenance branch is created from the previous release tag of that package. Then push a `fix(dummy-independent-monorepo-foo): ...` commit to that branch — the release pull request will target it and the release will be published from it under the `release-1.x` npm tag without touching `latest`.
