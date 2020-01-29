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

**Allow importing files that use module.exports**

[0](https://github.com/vuejs/vue-cli/issues/2746)

---

**Slots**

```vue
// Just like the children in React
<navigation-link url="/profile">
  Your Profile
</navigation-link>

<a v-bind:href="url" class="nav-link">
  <slot></slot>
</a>

// Fallback
<submit-button></submit-button>

<button type="submit">
  <slot>Submit</slot>
</button>

// Named slots
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

<div class="container">
  <header>
    <!-- We want header content here -->
  </header>
  <main>
    <!-- We want main content here -->
  </main>
  <footer>
    <!-- We want footer content here -->
  </footer>
</div>
```

---

**Fragments**

```vue
import { Plugin } from "vue-fragments";
Vue.use(Plugin);

<template>
  <v-fragment>
    <h2>x</h2>
    <div>text</div>
  </v-fragment>
</template>
```

---
