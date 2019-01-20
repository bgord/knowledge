**Standard JavaScript imports**
```
// tsconfig
"allowSyntheticDefaultImports": true
```
Don't write `import * as React from "react";`, do `import React from "react";` instead

---

**Assigning primitive values to a single variables**

```
const value: number = 5;
const isTyped: boolean = false;
const name: string = "Bartek";
```

---

**What's a union-type?**

Used when a variable can be one of couple of types/literals.

`const type = 'increment' | 'decrement' | 'reset';`

Also useful when a value can be e.g a string or null.

`const payload = string | null;`

---

**How to add types for objects? (type aliases, interfaces)**

Use `type alias`:

```
type Action = {
  type: string;
  payload: {
    step: number;
  };
}

const action: Action = {
  type: 'increment',
  payload: {
    step: 5
  },
}
```

A property in a `type alias` can be optional.

```
type Action = {
  type: string;
  payload?: {
    step: number;
  };
};
```

Aliasing doesn't create a new type, it creates a new name for an existing type.

Aliases cannot be extended

A syntax for `interface` is the same, except of keyword.

---

**How to reuse aliases/interfaces?**

You can pass them around, and export.

`export interface Person {...};`

---

**How to extend a interface?**

Type aliases cannot be extended.

```
interface Action {
    type: string;
};

interface PayloadAction extends Action {
    payload?: {
        step: 5
    }

```

---
