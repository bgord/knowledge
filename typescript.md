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

**What's an index signature?**

Defines a structure of object.

```
interface Action {
  [index: string]: {
    type: string;
  }
}

const action: Action = {
  5: {
    type: "increment"
   } //
}
```

Throws an error, 5 is not a string.

```
const action: Action = {
  "increment" {
    type: "standard"
  } //
}
```

Works fine, "increment" is a string.

---

**How to define a fixed set of possible object keys?**

The code below throws an error, because an index cannot be a union-type.

```
type ActionTypes = 'increment' | 'decrement';

type Action = {
  [index: ActionTypes]: {
    payload: any;
  }
}
```

The code below works as expected, it makes every key of the union-type a required key in the object.

```
type ActionTypes = 'increment' | 'decrement';

type Actions = {
  [key in ActionTypes]: {
    payload: any;
  };
};

const actions: Actions = {
  'increment': {payload:{}},
  'decrement': {payload:{}},
}
```

---

**How to partially apply a type to an object?**

Given a user signature
`interface User = { name: string; age: number; };`

You can assign the `User` type to the `IncompleteUser` object:

`const User: Partial<User> = { name: "bartek" };`

`Partial<T>` looks like this under the hood:

`type Partial<T> = { [P in keyof T]?: T[P]; };`

---
