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

**How to extend an interface?**

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

"An index signature parameter type cannot be a union type. Consider using a mapped object type instead."

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

`function isPerson(x: any): x is Person { return x instanceof Person; }`

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

**How to type onChange event target values?**

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

**What's a strict mode and how to enable it?**

In `tsconfig.json` file, add the compiler option.

```
"compilerOptions": {
  "strict": true
},
```

It enables a few strict rules like: no implicit any/this, strict null checks, etc.

---

**How to get a function return type?**

Given a scenario when I want to assign a type to the `type` property in the `Transaction` interface which is the return value of the `faker.finance.transactionType` function.

```
interface Transaction {
	id;
	timestamp;
	name;
	type: ReturnType<typeof faker.finance.transactionType>;
}
```

---

**How to run TypeScript in Jest?**

In `create-react-app` is done automagically. In another cases use this [video](https://www.youtube.com/watch?v=6oHy58OOQkA&t=181s).

---

**How to mark one of the native element props required?**

```
interface Props extends HTMLProps<HTMLInputElement> {
	id: string;
}
```

or

```
interface Props extends HTMLProps<HTMLButtonElement> {
	type: HTMLButtonElement["type"];
}
```

---

**How to access refs in the React TypeScript in a safe way and avoid 'Object is possibly null' error?**

```
const ref = useRef<HTMLInputElement>(null);
if (ref.current) { // to avoid 'Object (ref.current) is possibly null'
  console.log(ref.current.validity); // can access validity of current ref
} else {
  console.log(`Ref jest nieaktualny jeszcze`);
}

```

---

**A types for a value that is null or a number?**

```
const possiblyNumber: number | null = 2;
const possiblyNumber: number | null = null;
```

---

**What's an exclamation mark for?**

```
type Name = string | null;

const logger = (name: Name): void => {
    console.log(name!.slice(0,1))
}
```

When you want to access a string specific method, but the parameter is nullable, there is a way to enforce compiler to acknowledge the fact that the name will be a string and nothing else. Just put a `!` after the variable name.

---

**How to get a function return type?**

```
type Arrayify = (a: string) => string[];

type Result = ReturnType<Arrayify>;

const result: Result = [];
```

---

**How to use Pick?**

`Pick` takes an enum of interface keys and applies them to the new interface.

```
type Model = {
    id: string;
    age: number;
}

type Age = Pick<Model, 'age'>;

const me: Age = {
    age: 2
};
```

In order to use age as a primitive.

`const myAge: Model['age'] = 2;`

---

**What is 'never' in TS?**

Used when:

- a function never returns, and only e.g throws an error

```
const fail = (errorMessage: string): never => {throw new Error(errorMessage)};
```

- a function that has an impossible type

```
function controlFlowAnalysisWithNever(
  value: string | number
) {
  if (typeof value === "string") {
    value; // Type string
  } else if (typeof value === "number") {
    value; // Type number
  } else {
    value; // Type never
  }
}
```

The difference between `void` and `never` is that when a function's return type is `void` it actually returns the `undefined`, but in case of `never` it never returns.

TS doesn't provide any autocompletion for such variables.

---

**Default types for generic arguments**

```function Logger<T = string>(arg: T) {
    console.log(arg);
}
```

---

**How to use error boundaries?**

Only in class components.

```
componentDidCatch(error, info) {
    setError(info);
}
```

---

**How to get keys of interface/type?**

```
interface actions {
    add: "add";
    remove: "remove";
}

const action: keyof actions = "xxx"; // doesn't work
const action: keyof actions = "add"; // work
```

---

**What does `extends` mean exactly?**

`extends` means that given interface needs to implement all the attributes from the base interface.

```
interface Action {
  type: string;
}

interface AddAction extends Action {
  payload: {}
}
```

The other use case is conditional type.

```
function logger<T>(variable: T extends true ? string : number): void {
  console.log(variable);
}
```

---

**How TS works for rest operator?**

The `...rest` variable is basically an array.

```
function logger(a: string, ...rest: number[]):void {
    console.log()
}
```

---

**What's a synthetic import?**

A way to import: `import React from "react";` instead of `import * as React from "react";`

---

**How to use readonly and const?**

`readonly` makes a variable immutable.

```
interface Config {
    readonly type: string;
}

const config: Config = {
    type: "IMMUTABLE"
}

injector(config);

function injector(config: Config): void {
    config.type = 'xxx';
    console.log(config);

```

`const` is just a mirror of the ES6 syntax.

---

**What is `d.ts` file for?**

It's a declaration file for the libraries written in plain JS.

```
declare namespace GreetingLib {
    interface LogOptions {
        verbose?: boolean;
    }
    interface AlertOptions {
        modal: boolean;
        title?: string;
        color?: string;
    }
}
```

---

**How to use Exclude?**

Given this model,

```
interface Model {
  age: number;
  name: string;
  country: string;
}
```

`NEW_TYPE` is an union type of `'name'|'number'`.

`type NEW_TYPE = Exclude<keyof Model, 'age'>`

`Exclude` takes a union `a`, and union `b`. It excludes all fields from union `b` from union `a`.

---

**How to create an `Omit` function?**

```
type Omit<T, K extends keyof T>
  = Pick<T, Exclude<keyof T, K>>;
```

Usage:

```
interface Model {
    age: number;
    name: string;
    country: string;
}

type _Model = Omit<Model, 'age' | 'name'>; // type {country: string}
```

**How to use `NotNullable`?**

Just enable strict null checking mode, by `--strictNullChecks`.

Or type to exclude `null` and `undefined` from the union type.

`Strict<T> = Exclude<T, null | undefined>;`

---

**Async function return value**

`async getUser(id: string): Promise<void> {};`

---

**How to type Ramda pipes?**

You need to type all the intermediate steps: initial value and all the subsequent ones.

```
interface Product {
	name: string;
	price: number;
}

const sumProductPrices = R.pipe<
	Product[],
	Product['price'][],
	Product['price']
>(
	R.pluck('price'),
	R.sum,
);

const sumOfPrices: number = sumProductPrices([{ name: 'x', price: 2 }]);
```

---

**How to type Ramda map operator?**

You need to specify an interface for an item that comes in, and the interface for the object that comes out of the map operator.

```
interface Product {
	name: string;
	price: number;
}

interface DiscountedProduct extends Product {
	discount: number;
}

const products: Product[] = [{ name: 'Apple', price: 0.25 }];

const discountedProducts: DiscountedProduct[] = R.map<
	Product,
	DiscountedProduct
>(R.assoc('discount', Math.random()))(products);
```

---

**How to add types for untyped third-party library?**

Scenario:

```
TypeScript error: Could not find a declaration file for module '@reach/tabs'. '/home/bartosz/Desktop/projects/words-app/node_modules/@reach/tabs/index.js' implicitly has an 'any' type.
  Try `npm install @types/reach__tabs` if it exists or add a new declaration (.d.ts) file containing `declare module '@reach/tabs';`
```

What happened:

- you must have set `"noImplicitAny": true,` compiler option in your `tsconfig.json`
- `@reach/tabs` package doesn't have in-library typings

Next steps:

1. If typings are included in Definitely Typed repo

`$ npm install @types/@reach__tabs` if it exists (it's not `@types/@reach/tabs` because of too deep `/` nesting)

2. If typings aren't included in Definitely Typed repo

- create `typigns` directory in project root
- add `"typeRoots": ["./typings", "./node_modules/@types"]` compiler option in `tsconfig.json`
- in `"./typings"` directory create a `@reach__tabs` directory (it'd be just `<package>` for a name that doesn't include `/` char)
- create `index.d.ts` file in it
- add `declare module '@reach/tabs';` line
- add `"exclude": ["./typings", "./node_modules"]` `tsconfig.json` rule

---

**Enable TypeScript for Cypress**

```js
// tsconfig.json

{
	"compilerOptions": {
		"types": ["cypress"]
	},
	"include": ["./cypress"]
}

```

---

**Make interface properties optional**

```ts
interface Response {
  status: number;
  data: any;
}

Partial<Response>
```

---

**Type img props**

```tsx
export const Logo: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (
  props
) => <img alt="Logo" src="logo.png" {...props} />;
```

---

**Type div props**

```tsx
export const ValidationErrorMessage: React.FC<React.HTMLProps<
  HTMLDivElement
>> = ({ children, className = "", ...props }) => (
  <div className={`w-full text-red-700 mt-1 ${className}`} {...props}>
    {children}
  </div>
);
```

---

**Access component props without exporting them**

[1](https://twitter.com/sulco/status/1160890708615716864)

---

**Get host element prop TypeScript types**

```
React.FC<JSX.IntrinsicElements["div"]>
```

---

**Type guard example**

```

import {IHabit} from "./interfaces/IHabit";

import React from "react";

const HABIT_SCORE_TYPES = ["positive", "neutral", "negative"];

interface EditableHabitScoreSelectInterface extends IHabit {}

export const EditableHabitScoreSelect: React.FC<EditableHabitScoreSelectInterface> = ({
	score,
}) => {
	const [newHabitScore, setNewHabitScore] = React.useState<IHabit["score"]>(
		score,
	);
	return (
		<select
			className="bg-gray-300 w-20 appearance-none cursor-pointer"
			value={newHabitScore}
			onChange={event => {
				const {value} = event.target;
				if (isHabitScore(value)) {
					setNewHabitScore(value);
				}
			}}
		>
			<option value="positive">Positive</option>
			<option value="neutral">Neutral</option>
			<option value="negative">Negative</option>
		</select>
	);
};

function isHabitScore(value: string): value is IHabit["score"] {
	return HABIT_SCORE_TYPES.includes(value);
}
```

---

**Nullish coalescing**

Operator: `??`

How is it different from `||`?
It returns the right-hand side only for `null` or `undefined`.
Or returns for each falsy value: `null | undefined | "" | 0 | false | NaN`.

```tsx
request?.body ?? [];
```

---

**Omit helper**

```
interface Person {
  name:string;
  age:number;
}

Omit<Person, "name">
```

---

**Map**

```ts
type Vote = "progress" | null;

const voteToColor = new Map<Vote, string>();
voteToColor.set("progress", "green");
voteToColor.set(null, "red");
```

---

**All HTML elements**

```ts
type Element = keyof JSX.IntrinsicElements;
```

---

**Type inference for dynamic elements passed by as prop (polymorphic components)**

[0](https://github.com/kripod/react-polymorphic-box)

---

**Reexport only certain type from a module**

```
export type {HabitStrength as HabitStrengthType} from "@prisma/client";
```

---

**Unwrap a return value of a Promise**

```typescript
export type AsyncReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : any;

async function getHabit(id: number):Promise<Habit> {};

// Let's say I want to get a return value of the Promise

AsyncReturnType<typeof getHabit>;
```

[0](https://jpwilliams.dev/how-to-unpack-the-return-type-of-a-promise-in-typescript)

---

**Retaining requesty body types between middlewares**

```ts
const validation = <T extends z.ZodObject<any>, D>(schema: T) => (
  request: express.Request<any, any, D>,
  response: express.Response<express.NextFunction | ValidationError>,
  next: express.NextFunction
) => {
  try {
    schema.parse(request.body);
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).send({
        code: "E_VALIDATION",
        argErrors: error.errors.map((error) => {
          const lastIndex = error.path.length - 1;

          return {
            message: error.message,
            key: error.path[lastIndex],
            path: error.path,
          };
        }),
      });
    }
  }
};

app.post(
  "/user",
  validation<typeof NewCharacterSchema, NewCharacter>(NewCharacterSchema),
  (request, response) => {
    const result = request.body; // types of NewCharacter
  }
);
```

---
