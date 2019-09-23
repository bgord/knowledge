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
- push version change
  `$ npm login`
  `$ npm publish`

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
