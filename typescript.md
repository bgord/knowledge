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

**How to get prop names of interface/type alias?**

Given interface below,

```
interface User {
  name: string;
  age: number;
}
```
you can get a union of keys by:
`type userKeys = keyof User; // 'name' | 'age'`

The same works for type alias.

---

**How to get prop types of interface/type alias?**

Given interface below,

```
interface User {
  name: string;
  age: number;
}

type userPropNames = keyof User;

type userPropTypes = User[userPropNames];
```

---

**Generics**

Useful when you want to make e.g function reusable, so it works with many data types. A good example is identity function.

```
function identity(arg: any):any {
  return arg;
}

const a = identity("x"); // a return type of `a` is any, not string
```

But when it's defined with `any` types, we lose a information about it. We can use a `type variable` to store a type of an argument.

```
function identity<T>(arg: T):T {
  return arg;
}

const a = identity("X"); // inferred return type is the "x" literal
const a = indentity<string>("x"); // inferred return type is "string"
```

We can use kind of validation with "extends" keyword.

```
interface model {
  id: string;
  age: number;
}

const model: model {
  id: "123",
  age: 22,
}

function getProp<T, K extends T>(obj: T, prop: K): T[K] {
  return obj[keya];
}

const id = getProp(model, "id"); // id has a type of string
const age = getProp(model, "age"); // id has a type of number
```

---

**Creating reusable generic interfaces**

```
interface withId<T> {
  id: T;
  [index: key]?: any;
}

const model: withId<string> = {
  id: 123, // doesn't work
}

const model: withId<string> = {
  id: "123", // works
}
```

---

**What's a type guard? What are the built-in type guards?**

When we need to specifically a type of one of the union types. E.g an argumen t is either `number` or `string`, and we can access `length` property of the string, but not of the number.

A TS (just like JS) has two built-in type guards. `typeof` and `instanceof`.

You can define your own type guards, which are just typed JS function.

```
interface Person {
    name: string;
    age: number;
}

function displayName(arg: string | Person): void {
    if (typeof arg === 'string') {
        console.log(arg); // TS knows that arg is a type of 'string'
    }
    else {
        console.log(arg.name); // TS know that arg is a type of Person
    }
}
```

**How to define a custom type guard?**

To check whether an argument is `Person`.

`function isPerson(x: any): x is Person {
  return x instanceof Person;
}`

---

**What are intersection types?**

When given type is an intersection of types x and y, it means that it must fulfill both type requirements.

---

**How to type functions?**

`const add = (x: number, y: number):number => x + y;`

```
type SIGNATURE = (x: number, y: number):number => x + y;

const add: SIGNATURE = (x, y) => x + y;
```

---

**Enum and tuple**

Enum is a kind of lookup table. But it's not recommended.

```
enum Cheese {
  Brie,
  Chedar
}
```

Tuple limits number and types in array.

```
type args = [string, number];
const ARGS: args = ["2", 2];
```

---

**How to type arrays?**

There are two ways to type an array:

`const users: User[] = [{name: "x", age: 21}, {name: "y", age: 22}];`

and with generic type

`const users: Array<User> = [{name: "x", age: 21}, {name: "y", age: 22}];`

---

**How to type input values?**

`const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => setName(e.currentTarget.value);`

---

**How to type submit values?**

`const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {console.log(e);};`

---

**How to lint TypeScript with ESLint?**

Install following packages:

```
@typescript-eslint/eslint-plugin,
@typescript-eslint/parser
```

And create a `.eslintrc.js` file.

module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: ['plugin:@typescript-eslint/recommended', 'bgord'],
	env: {
		browser: true,
		es6: true,
		node: true,
		jest: true,
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	}
};

---
