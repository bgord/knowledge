**npm ci**

Similar to the npm install but it's advised to be used in automated envs, to make sure you're making clean installs.
Faster than regular install, requires package-lock.json.
Use it every time you want to remove node_modules, and npm install.

---

**Serve a static sile/file or SPA with npm**

`npm run serve`

---

**You cannot install dependency in the directory that is named exactly as the dependency**

(source)[https://docs.npmjs.com/cli/install#limitations-of-npms-install-algorithm]

---

**Publishing a package**

- create a commit
- bump version `npm version (major/minor/patch)`
- push version change commit
- push tags `git push --tags`
- login via npm cli `$ npm login`
- dry-run publishing the package `$ npm publish --dry-run`
- publish the package `$ npm publish`

---

**How to test a package locally?**

[source](https://docs.npmjs.com/files/package.json#local-paths)

```
  "dependencies": {
    "bar": "file:../path"
  }
```

Warning: only for local testing purposes!

---

**How to install packge from GitHub?**

`$ npm install bgord/bgord-tools#feature/use-query-hook`

<username>/<repository>#<commit/branch>

---

**Test a package binary locally without global installation**

In the package root ensure your `package.json` has a `bin` value.

```json
{
  "bin": {
    "your-package-name": "./xxx.js"
  }
}
```

```bash
$ npm link
```

And then, you should be able to run a `your-package-name` command from terminal.

You can also run `npm unlink` in the package root to cleanup the symlink.

---

**^ vs ~ in package versions**

^ means only x and y in 1.y.x will be updated (minor and patch)

~ means only x in 1.2.x will be updated (patch)

---

**pre/post scripts**

If you define a `build` script, you can also define `prebuild` and `postbuild` scripts.

---

**Composing npm scripts**

Before:

```json
{
  "scripts": {
    "env:validate:dev": "ts-node -P ./tsconfig.scripts.json ./scripts/validate_env.ts"
    "env:validate:all": "ts-node -P ./tsconfig.scripts.json ./scripts/validate_env.ts --with-prod"
  }
}
```

After:

```json
{
  "scripts": {
    "env:validate:dev": "ts-node -P ./tsconfig.scripts.json ./scripts/validate_env.ts"
    "env:validate:all": "env:validate:dev -- --with-prod"
  }
}
```

The options after `--` are passed to the underlying command of a script, not the npm script itself.

---

**npm uninstall alias**

```bash
$ npm r webpack
```

---

**alias package**

```
$ npm i react@:npm@preact/compat
```

---

**Automatically create a script in the package.json**

```
$ npm set-script prepare "husky install"
$ npm run prepare

```

---

**Publish a scoped package**

```
$ npm publish --access public
```

---

**Perform a script before publishing**

- Add a `prepare` script to the npm scripts section

---
