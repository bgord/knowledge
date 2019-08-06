**How to connect a controller to an HTML element?**

Let's say you have a `search-distributors_controller.js` file.
To connect it to an element, use this syntax:

```html
<div data-controller="search-distributors">
  <span>xxx</span>
</div>
```

---

**How to check if a controller is connected to an element?**

Add the following method to a controller:

```js
import { Controller } from "stimulus";
export default class extends Controller {
  connect() {
    console.log("connected");
  }
}
```

---

**How to pass a data from Adonis template to a controller?**

Pass data:

```html
<div
  data-controller="search-distributors"
  data-search-distributors-list="{{ toJSON(distributors) }}"
/>
```

Access in a controller:

```js
export default class extends Controller {
  connect() {
    const distributorList = JSON.parse(this.data.get("list"));
  }
}
```

---

**Can you put an element that uses a data-\* attribute of the parent controller element?**

No, you can't do that.

```html
<div>
  <span data-action="click->search#next"></span>
  <div data-controller="search"></div>
</div>
```

`span` has to be inside the controller `div`:

```html
<div>
  <div data-controller="search">
    <span data-action="click->search#next"></span>
  </div>
</div>
```

---

**What are the lifecycle methods?**

`initialize` - once, when a controller is initialized

`connect` - anytime a controller is attached to the DOM
`disconnect` - anytime a controller is detached from the DOM

---

**What's data-action?**

It's a reference to a controller method that can be invoked from an element.

---

**How to fire a controller method in an element?**

```js
export default class extends Controller {
  next() {
    console.log("clicked");
  }
}
```

```html
<div data-controller="search">
  <button data-action="search#next">Next</button>
</div>
```

---

**How to manage state?**

Just use `this.*` class instance variables.

---

**What's a data-target?**

`data-target` let's you reference elements by name.

You can access it by `[name]Target` in a controller.

Or by `[name]Targets` if there're multiple targets, returns an array.

```html
<div data-controller="search">
  <button data-action="search#performSearch">Search</button>
  <span data-target="search.results"></span>
</div>
```

```js
export default class extends Controller {
  static targets = ["results"];

  performSearch() {
    this.resultsTarget.innerHTML = "results come in here";
  }
}
```

---

**How to fire a controller method on an event?**

```
<input data-action="input->search#handleChange" />
```

---
