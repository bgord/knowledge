**Generate a new project**

```bash
$ yarn global add @vue/cli
$ vue create awsome_project --no-git
```

---

**Inspect the current Webpack config**

```bash
$ vue inspect > webpack.txt
```

---

**Override a Webpack config**

Create a `vue.config.js` file.

Values you can change: [sourc](https://cli.vuejs.org/config/#filenamehashing)

---

**Rename 'src' directory**

src -> client

```js
const path = require("path");

module.exports = {
  chainWebpack: config => {
    config
      .entry("app")
      .clear()
      .add("./client/main.js")
      .end();
    config.resolve.alias.set("@", path.join(__dirname, "./client"));
  }
};
```

---

**Difference betwwen static and dynamic props**

```vue
<template>
  //static title
  <button title="xxx">Add payment</button>

  //dynamic title (result of an expression)
  <button :title="data.title + 'x'">Add payment</button>
</template>
```

---
