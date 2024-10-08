**RegExp for digits**

`/\d/`

add `+` to allows only positives

---

**Assert any primitive value**

`expect.any(Number)`

---

**Jest find element by prop value**

`expect(wrapper.find({ label: 'Address line 2' }).prop('content')).toEqual("xxx");`

---

**Jest find if element with given prop doesn't exists**

`expect(wrapper.find({ label: 'Address line 3' }).length).toEqual(0);`

---

**`\s` in RegExp**

Space

---

**Plus `+` in RegExp**

`/\s\+/`

- one or more preceding expression (s for spaces)

---

**Asterisk in RegExp**

`/\s\*/`

- zero or more preceding expression (s for spaces)

---

**Computed object property performance**

`b['aaa']` is slower than `b.aaa`

---

**Import a function to spyOn**

```
import * as mockThunk from "./mockThunk";
spyOn(mockThunk, "thunkRealName")
```

---

**Fake timers in Jest**

```
jest.useFakeTimers(); // somewhere at the beginning of the test
jest.runAllTimers(); // right before assertions
```

---

**Jest check if element has a class**

`wrapper.find('button').hasClass('is-disable')`

---

**Jest test each**

```javascript
const cases = [
  [false, undefined],
  [false, ""],
  [false, 1],
  [true, "text"],
];
test.each(cases)("should return %s when passing %s", (expected, a) => {
  const result = isNumberValidation(a);
  expect(result).toBe(expected);
});
```

---

**Promise.race trick to show a spinner after x ms**

Pass some promise and a promise that waits for x ms to Promise.race, and if the result is the stuff that promise that waits for x ms returns, then show a spinner

[source](https://www.youtube.com/watch?v=QPDA4QwkJxk)

---

**Sparse array destructuring**

If you're not interested in e.g two first values, and want to grab the third.

`const [, , given] = getKeys();`

---

**Assert if function throws an error**

`expect(() => someFunc()).toThrowError(new Error("Some error"))`

---

**Event Bubbling & Propagation**

Given scenario below, when the user click on the `p` tag, the event "drills" down to the `p` tag (html => body => div => p) and fires its onlick handler. Then, it "goes up" the same way, and fires all the handlers that he meets (div => body => html). This mechanism is called event bubbling.

There're 3 phases:

- capturing, when the event goes down
- target, the event reached the target element
- bubbling, event goes up from the element

We can e.g call `event.stopPropagation()` on `p` tag to avoid calling `div` (and all upper elements') handlers (vertical propagation).

If element has more than one event handler of the same type, we can call `stopImmediatePropagation()`.

```
<body>
  <div onclick="alert('div');">
    <p onclick="alert('p')">xxx</p>
  </div>
</body>
```

---

**Merging in Ramda**

```
const first = {
  name: "bartek",
  country: {
    name: "Poland",
    abbr: "PL"
  }
};

const second = {
  name: "bartek",
  country: {
    name: "Australia",
    abbr: "AU"
  }
};

R.mergeDeepLeft(first, second); // take the LEFT object and apply it on top of the right
R.mergeDeepRight(first, second); // take the RIGHT object and apply it on top of the left
```

---

**parameters vs arguments**

Parameter is a variable in function definition.
Argument is a data passed to a called function to parameter.

---

**How to add a customer error message to the input?**

```
if (!input.validity) {
  input.setCustomValidity("Not a number.");
}
```

---

**How to make Jest run all the tests and quit?**

`CI=true react-scripts test`

---

**How to sort dates properly?**

`dates.sort((a, b) => a.date.localeCompare(b.date))`

---

**How to inject dependencies to a module?**

```
// index.jsx
import {store} from "./store";

setStoreForIntenceptors(store);
```

```
// api.jsx

let store;

export const setStoreForIntenceptors = (_store) => {
  store = _store;
}

```

---

**Function expression vs function declaration**

Function declaration:

- `function boo() {}`
- hoisted

Function expression:

- `const foo = function() {};`
- can be anonymous
- not hoisted

---

**What's the difference between `==` and `===`?**

Non-primitive structures are not compared by value, but by reference.

`==` means loose equality and `type coercion` (two operands are being casted to the common type, if it's possible)

`true == true // true`
`7 == '7' // true`
`false == 0 // true`
`true == 1 // true`
`undefined == null //true`
`undefined == undefined //true`
`null == null //true`
`NaN == NaN // false (always)`
`false == undefined // false`

`===` means strict equality, by both type and value

`7 === '7' // false`
`7 === 7 // true`
`'7' === '7' // true`
`undefined === null // false`
`undefined === undefined // true`
`null === null // true`

---

**How to use console.group?**

To create a collapsable dropdown list of logs in the console:

```
const text = "GET /word-entries"
console.group(text) // console.groupCollapsed(text);
console.log("TIMESTAMP", Date.now());
console.groupEnd();
```

---

**Visitor pattern**

In ESLint, it lets you pass an object of types of nodes that you care about and with handlers instead of traversing the tree manually.

Lets you define further actions on objects without having to modify them.

```
return {
  'ImportDeclaration': (node) => {
    // do validations
    // report errors
  }
}
```

---

**Regex for alphanumeric characters with possible spaces**

```
/^[a-zA-Z0-9 ]*$/

```

Anything from a-z, A-Z, and 0-9 and " " (space), repeated 0-n times.

---

**Node command autocompletion**

```
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  completer: line => {
    const options = ["lion", "dog", "cat", "cow"];
    const hits = options.filter(option => option.startsWith(line));
    return [hits.length ? hits : options, line];
  }
});

rl.question("Which animal do you like the most? ", answer => {
  console.log(`The answer is: ${answer}`);
  rl.close();
});
```

---

**How to re-export a file?**

`export {useTimer} from "./use-timer"`

---

**How to access a arguments passed to a node script?**

`const [nodePath, scriptPath, ...arguments] = process.argv`

---

**How to retrieve a filename from relative path?**

```
const path = require("path");

const filename = path.basename(filepath);
```

**How to destructure a variable with a hyphen in a key name?**

```js
const data = { "auth-user": "XXX", "auth-pass": "YYY" };

const { "auth-user" } = data; // doesn't work
const { "auth-user": REQ_USER } = data; //works
```

---

**How to use assert to validate something with a custom error message?**

`assert(["pl", "en"].includes(locale), "Unknown locale" + locale)`

Throws an assertion error with given message.

---

**How to access an other parameter's value in a parameter's default value?**

```
function doSomething(a, b = a * 2) {
  console.log(a, b);
}

doSomething(2); // 2 4
doSomething(); // undefined NaN

```

---

**How to precisely measure time?**

```
const time = process.hrtime(); // high-resolution time
const nextTime = process.hrtime(time); // difference
```

---

**How to create an object literal property getter with `get`?**

- must have 0 parameters.

```js
const data = {
  firstname: "John",
  lastname: "Doe"
  get fullname() {
    return `${this.firstname} ${this.lastname}`
  }
};

console.log(data.fullname); // 'John Doe'
```

---

**How to create an object literal property getter with `Object.defineProperty`?**

It's more of a fine-grained way to define an object property.

Signature:

```js
Object.defineProperty(object, "propName", propertyDescriptor);
```

```js
const data = { firstname: "John", lastname: "Doe" };
Object.defineProperty(data, "fullname", {
  get() {
    return `${this.firstname} ${this.lastname}`;
  },
});
```

By default, `fullname` property won't appear while being enumerated:

```js
console.log(data); // { firstname: "John", lastname: "Doe" }
```

To achieve that effect, you need to add `enumerable` flag.

```js
const data = { a: "a", b: "b" };
Object.defineProperty(data, "c", {
  get() {
    return `${this.a} ${this.b}`;
  },
  enumerable: true,
});

console.log(data); // {a: "a", b: "b", c: [Getter]}
console.log(Object.entries(data)); // [['a', 'a'], ['b', 'b'], ['c'. 'ab']]
```

`configurable` - specifies if a property can be changed/deleted.
`value` - sets a non-getter property value.
`writeable` - specifies if a property can be changed with `=`.

---

**How to use an object property setter?**

```js
const data = {
  quotes: [],
  set quote(value) {
    this.quotes.push(`"${value}"`);
  },
};

data.quote = "To be or not to be";
console.log(data.quotes); // ['"To be or not to be"']
```

---

**How to merge default options with overrides?**

```js
const defaultOptions = {
  errors: {
    notFound: "Not found",
  },
};
const overrides = {
  errors: {
    notFound: "Nie znaleziono",
  },
};

const options = { ...defaultOptions, ...overrides }; // { errors: { notFound: "Nie znaleziono" } }
```

---

**Adonis migration lock problem**

Run the following commands in the virtual machine:

```
$ sudo su postgres
$ psql
$ \connect webuploader-test
$ DROP TABLE adonis_schema_lock;
```

---

**How to read file content before submit?**

```
onSubmit(e) {
  e.preventDefault();
  const file = document.querySelector("#file-input-field").files[0];
  const reader = new FileReader();
  reader.onload = e => {
    const fileContent = e.target.result;
    console.log(fileContent); // file content should be printed here
  }
  reader.readAsText();
}
```

---

**How to precisely insert HTML into an element?**

Use `element.insertAdjacentHTML(position, text)`.

There are 4 positions:

```
// beforebegin
<p>
  // afterbegin
  A paragraph
  // beforeend
</p>
// afterend
```

---

**Accessing properties of null and false**

```js
null.payload; // TypeError: Cannot read property `payload` of null
false.payload; // undefined
```

---

**How to create a Circular JSON example?**

```js
const o = {};
o.o = {};

console.log(o); // { a: [Curcular] }
```

---

**console.assert**

Writes a message if an assertion fails, does nothing otherwise.

```js
> console.assert(1 === 2, "Jeden jednak nie równa się dwa");
Assertion failed: Jeden jednak nie równa się dwa

> console.assert(1 === 2);
undefined
```

---

**Puppeteer doesn't find a text/element**

If you are 100% sure that element exists in the DOM, the problem with finding it may be caused by the viewport size. E.g an element may be hidden in certain window widths.

---

**Puppeteer doesn't fire a change handler for a select element**

Don't use `page.select()`, use `page.type()` instead.
And add an event handler on `input` action for select (instead of `change`).

---

**Create a new Adonis project**

```
$ adonis new app_name [options]
```

Relevant options:

```
--api (only API server)
--blueprint <github project path>?
```

---

**Replace spaces with empty strings**

```js
const inputValue = "1 000 000";
const number = inputValue.replace(/\s/g, "");
```

---

**Alter a table column schema in Adonis/knex**

```js
const Schema = use("Schema");

class AlterMaslolandiaUploadsSchema extends Schema {
  up() {
    this.table("some_table", (table) => {
      table.integer("kwota_netto").notNullable();
    });
  }

  down() {
    this.table("some_table", (table) => {
      table.dropColumn("some_table");
    });
  }
}

module.exports = AlterMaslolandiaUploadsSchema;
```

---

**Accept many date formats in moment.js**

```js
const moment = require("moment");

const date = moment(value, ["YYYY/MM/DD", "YYYY-MM-DD", "DD.MM.YYY"]);
```

---

**Disallow navigating to a auth protected page after logout in Adonis**

(This issue may occur in standard, non-PWA apps)

Create a file: `app/Middleware/MustRevalidate.js`.

```js
class MustRevalidate {
  async handle({ response }, next) {
    response.header(
      "Cache-Control",
      "nocache, no-store, max-age=0, must-revalidate"
    );
    response.header("Pragma", "no-cache");
    response.header("Expires", "Fri, 01 Jan 1990 00:00:00 GMT");
    await next();
  }
}

module.exports = MustRevalidate;
```

Add it to `namedMiddlewares` in `start/kernel.js`.

```
const namedMiddleware = {
  // ...
	revalidate: 'App/Middleware/MustRevalidate',
  // ...
};

```

And use it like:

```js
Route.get("/", "SomeController.index").middleware("revalidate");
```

[source](https://www.youtube.com/watch?v=IZTUyVEVa90)

---

**Get query params**

```js
const queryParams = new URLSearchParams(window.location.search);
queryParams.get("distributor");
```

---

**Create query params string**

```js
const distributor = "1";
const value = "2";

const newQueryParams = new URLSearchParams({ distributor, value });
newQueryParams.toString(); // ?distributor=1&value=2
```

---

**Universal error handling middleware in Express**

```js
app.use(bodyParser.json());
app.get("/", (req, res, next) => {
  try {
    // do something here
  } catch (e) {
    next(e);
  }
});

// the error handling middleware should be places as the last one
app.use((err, req, res, next) => {
  // handle errors here
});
```

---

**Cannot access <form /> data in express app**

The following line from `body-parser` package is missing.

```js
app.use(bodyParser.urlencoded({ extended: true }));
```

---

**Override HTTP method in forms with Express**

```js
// server.js

const methodOverride = require("method-override");

// place as soon as possible
app.use(methodOverride("__method"));
```

```html
// index.html

<form method="POST" action="/product/:id?__method=" DELETE>
  <button type="submit">Usuń</button>
</form>
```

---

**Check if one value equals some other value in Indicative**

```js
const rules = {
  password: "required",
  password_confirmation: "required|same:password",
};
```

or

```js
const rules = {
  password: "confirmed",
};
```

---

**Create an array of number 1-100**

```js
Array.from({ length: 100 }).map((_, i) => i + 1);
```

---

**Basic-auth in express**

```bash
$ npm i express-basic-auth
```

```js
const basicAuth = require("express-basic-auth");

app.use(
  basicAuth({
    users: {
      admin: "password",
    },
    unauthorizedResponse: () => "You shall not pass",
    challenge: true, // forces a browser to display a prompt with login/password inputs
  })
);
```

---

**Problem with authentication access in Adonis**

Add `auth` middleware at the beginning of the list.

---

**Indicative nested structures validation**

```js
// Given this object, create a validation rules.
// response.message is a requried string

const payload = {
  status: 200,
  response: {
    message: "xxx",
  },
};

const rules = {
  status: "required",
  "response.message": "required",
};
```

---

**Hide fields in queries**

[link](https://adonisjs.com/docs/4.0/lucid#_hidden)

---

**Adonis transaction example**

```js
const trx = await Database.beginTransaction();
try {
  await trx.insert({ username: "virk" }).into("users");

  await trx.commit(); // insert query will take place on commit
} catch (e) {
  console.error(e);
  await trx.rollback(); // will not insert anything
}
```

---

**Pass params to a middleware in Adonis**

```js
.middleware(['account-status:active'])

class AccountStatus {
  async handle({ response, auth }, next, properties) {
    // in properties variable you have access to the params
    // e.g "active" string
  }
}

module.exports = AccountStatus;
```

---

**Can you use Adonis validator to validate query strings in GET requests?**

YES, just add a regular Adonis validator.

---

**above vs min in Indicative**

`min` is for string/array length
`above` is for numbers

---

**Access query params in Adonis**

```js
const offset = request.get().offset;
```

---

**Access array index in for of loop**

```js
const consumers = ["a", "b", "c"];
for (let [index, consumer] of consumers.entries()) {
}
```

---

**Array.from({length}) Ramda alternative**

```js
# Create an array of 10 elements

// JS version
Array.from({length: 10});

// Ramda version
R.range(0, 10):
```

---

**Access route params from path in Adonis**

```
params.userId;
```

---

**Cypress check if element doesn't exist**

```js
cy.findByText("Invalid email or password.").should("not.exist");
```

---

**Adonis Model.find(id) fails if id is a uuid**

Use `Model.findBy("id", id)` instead.

---

**Cypress check if input is invalid**

```js
cy.findByLabelText("Password")
  .type("123")
  .should((field) => expect(field.get(0).checkValidity()).to.be.false);
```

---

**Cypress check if URL contains a subpath**

```js
cy.url().should("include", "/login");
```

---

**Cypress check if URL is equal to a string**

```js
cy.url().should("eq", "http://localhost:3333/login");
```

---

**Add @testing-library/cypress**

Put the following line inside the `cypress/support/commands.js` file.

```js
import "@testing-library/cypress/add-commands";
```

---

**Adonis serve index.html**

```js
Route.get("*", async ({ request, response }) => {
  const resourcePath = request.url();
  if (resourcePath === "/") {
    return response.download(Helpers.publicPath("index.html"));
  }
  const pathSegments = resourcePath.split("/");
  const filename = pathSegments[pathSegments.length - 1];

  const resourcePathExists = await Drive.exists(`../public/${filename}`);

  return response.download(
    Helpers.publicPath(
      resourcePathExists && filename !== "" ? filename : "index.html"
    )
  );
});
```

---

**Export with changed name**

```js
function customRender() {}

export { customRender as render };
```

---

**Why not to use DatabaseTransactions fake helper in Adonis tests?**

Because once a test fails, the transaction is still hanging and you need to clear the database.

[0](https://adonisjs.com/docs/4.1/testing-fakes#_database_transactions)

---

**xstate basic toggle button example**

```jsx
import React from "react";

import { Machine } from "xstate";
import { useMachine } from "@xstate/react";

// Possible states: active/inactive.
// Possible events: TOGGLE.

const toggleMachine = Machine({
  id: "toggle",
  initial: "active",
  states: {
    active: {
      on: {
        TOGGLE: "inactive",
      },
    },
    inactive: {
      on: {
        TOGGLE: "active",
      },
    },
  },
});

// Send TOGGLE event.
// And check if current state matches given string.
function App() {
  const [current, send] = useMachine(toggleMachine);
  return (
    <div className="App">
      <button onClick={() => send("TOGGLE")}>
        {current.matches("inactive") ? "off" : "on"}
      </button>
    </div>
  );
}

export default App;
```

---

**xstate sign-in form example**

[0](https://codesandbox.io/s/l3r07jkxx9)

---

**Clear Firefox input box shadow after clearing values**

```js
document.querySelector("form").reset();
```

---

**Yesterday in moment**

```js
moment().subtract(1, "days");
```

---

**Adonis HTTP logs**

[0](https://github.com/adonisjs/adonis-http-logger)

---

**Adonis reference foreign keys in Knex migration**

```js
table
  .integer("tag_id")
  .references("id")
  .inTable("tags")
  .unsigned()
  .notNullable();
```

---

**Adonis doesn't create timestamps on insert**

It's because you used `Database.insert` instead of `Model.create`.

---

**Onblur and onclick problem**

If you face the following situation: you have a focused input with onblur event handling, and you are clicking a button.
What is happenning: onblur event handler is fired before onclick event handler.

If you want to switch the order, use onmousedown in place of onclick.

---

**Cypress press enter inside an input**

[0](https://docs.cypress.io/api/commands/type.html#Syntax)

---

**Cypress fast forward set timeout**

```js
it("Add an item", () => {
  cy.clock();

  cy.findByText("Add habit").click();
  cy.findByText("Habit successfully addedd!");

  cy.tick(6000);

  cy.findByText("Habit successfully addedd!").should("not.exist");
});
```

---

**Remove an element from array by splice**

```js
const items = ["a", "b", "c"];

// Let's say we want to grab 'b', the second element
// First argument: index, second argument: how many items to delete
const [removed] = items.splice(1, 1);
```

---

**Insert an array element by splice**

```js
const items = ["a", "c"];

// Insert "b" in between "a" and "c"
// First argument: index, second argument: how many items to delete, third: what to insert
items.splice(1, 0, "b");
```

---

**Cypress select nth element from findAllBy**

```js
cy.findAllByText("more").eq(1).click();
```

---

**Cypress drag and drop keyboard test (react-beautiful-dnd)**

Move an element down by two.

```js
cy.get("li:nth-child(1)")
  .focus()
  .trigger("keydown", { keyCode: 32 })
  .trigger("keydown", { keyCode: 40, force: true })
  .trigger("keydown", { keyCode: 40, force: true })
  .trigger("keydown", { keyCode: 32, force: true });
```

[0](https://github.com/atlassian/react-beautiful-dnd/blob/master/cypress/integration/reorder.spec.js)

---

**Cypress drag and drop column command (react-beautiful-dnd)**

```js
Cypress.Commands.add("dragAndDrop", (subject, target) => {
  Cypress.log({
    name: "DRAGNDROP",
    message: `Dragging element ${subject} to ${target}`,
    consoleProps: () => {
      return {
        subject: subject,
        target: target,
      };
    },
  });
  const BUTTON_INDEX = 0;
  const SLOPPY_CLICK_THRESHOLD = 10;
  cy.get(target)
    .first()
    .then(($target) => {
      let coordsDrop = $target[0].getBoundingClientRect();
      cy.get(subject)
        .first()
        .then((subject) => {
          const coordsDrag = subject[0].getBoundingClientRect();
          cy.wrap(subject)
            .trigger("mousedown", {
              button: BUTTON_INDEX,
              clientX: coordsDrag.x,
              clientY: coordsDrag.y,
              force: true,
            })
            .trigger("mousemove", {
              button: BUTTON_INDEX,
              clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
              clientY: coordsDrag.y,
              force: true,
            });
          cy.get("body")
            .trigger("mousemove", {
              button: BUTTON_INDEX,
              clientX: coordsDrop.x,
              clientY: coordsDrop.y,
              force: true,
            })
            .trigger("mouseup");
        });
    });
});
```

[0](https://github.com/cypress-io/cypress/issues/3942#issuecomment-485648100)

---

**Nodemailer quick example**

```js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
});

const mailOptions = {
  from: "example@email.com", // sender address
  to: "gordonbartosz@gmail.com", // list of receivers
  subject: "Subject of your email", // Subject line
  html: `xxx `, // plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
  if (err) console.log(err);
  else console.log(info);
});
```

---

**Cypress hover workarounds**

[0](https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/testing-dom__hover-hidden-elements/cypress/integration/hover-hidden-elements-spec.js)

---

**Convert a number from decimal to binary**

```js
(5).toString(2); // '101'
(8).toString(2); // '1000'
```

---

**What are bitwise operators?**

Bitwise operators treat their operands as sequence of 32 bits rather than dec/hex/oct numbers.

---

**How to use bitwise logical operators?**

| a   | b   | a AND b |
| --- | --- | ------- |
| 0   | 0   | 0       |
| 0   | 1   | 1       |
| 1   | 0   | 0       |
| 1   | 1   | 1       |

| a   | b   | a OR b |
| --- | --- | ------ |
| 0   | 0   | 0      |
| 0   | 1   | 1      |
| 1   | 0   | 1      |
| 1   | 1   | 1      |

| a   | b   | a XOR b |
| --- | --- | ------- |
| 0   | 0   | 0       |
| 0   | 1   | 1       |
| 1   | 0   | 1       |
| 1   | 1   | 0       |

| a   | a NOT |
| --- | ----- |
| 0   | 1     |
| 1   | 0     |

```js
// AND

5 & 3; // 101 & 011 -> 001 -> 1
8 & 12; // 1000 & 1100 -> 1000 -> 8

// OR
5 | 3; // 101 | 011 -> 111 -> 7
8 | 12; // 1000 | 1100 -> 1100 -> 12

// XOR
5 ^ 3; // 101 | 011 -> 110 -> 6
8 ^ 12; // 1000 | 1100 -> 100 -> 4

// NOT
~5; // ~101 -> 010
~8; // ~1000 -> 0111
```

---

**Simple search by phrase**

```js
["one", "two", "twenty one"].filter((entry) =>
  entry.toLowerCase().include(searchPhrase.toLowerCase())
);
```

---

**What is requestAnimationFrame for?**

It's a way to kick off fast-updating animations in JS but not as fast as possible (for loop).
The goal is to run something 60 fps, but without `setTimeout(callback, 1000 / 60);`.

`requestAnimationFrame` is better because browser can optimize it, and it's more battery/CPU friendly.

The general idea is to call the callback function recursively.

```js
function repeatOften() {
  requestAnimationFrame(repeatOften);
}

requestAnimationFrame(repeatOften);
```

---

**RegExp to match a string starting with a word**

```js
/^hey/

/^hey/.test("heyhohoho"); // true
/^hey/.test("hohohohey"); // false
```

---

**RegExp to match a string ending with a word**

```js
/hey$/

/hey$/.test("heyhohoho"); // false
/hey$/.test("hohohohey"); // true
```

---

**RegExp range negation**

```js
/[0-9]/.test("0"); // true
/[^0-9]/.test("0"); // false
```

---

**RegExp ranges**

By default, range matches at least one item:

```js
/[0-9]/.test("xxx"); // false
/[0-9]/.test("x0x"); // true
/[0-9]/.test("x00"); // true
```

If you want to match only one item:

```js
/^[0-9]$/.test("x"); // false
/^[0-9]$/.test("0"); // true
/^[0-9]$/.test("0x"); // false
/^[0-9]$/.test("00"); // false
```

---

**What's a service worker?**

It's a mechanism to be able to run JS on many threads that can communicate with each other up to some extent.

---

**The simplest service worker example**

```html
// index.html

<script src="main.js"></script>
```

```js
//main.js

const worker = new Worker("service-worker.js");

worker.postMessage("fsociety.dat");
worker.onmessage = (event) => {
  console.log("Received from service-worker:", event.data);
};
```

```js
// service-worker.js

this.onmessage = (event) => {
  console.log("Received in service-worker:", event.data);
  this.postMessage("done");
};
```

[0](https://kentcdodds.com/blog/speed-up-your-app-with-web-workers)

---

**Check if user is online**

```js
function getOnlineStatus() {
  return typeof navigator !== "undefined" &&
    typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true;
}
```

And associated event listeners:

```js
window.addEventListener("online", goOnline);
window.addEventListener("offline", goOffline);

return () => {
  window.removeEventListener("online", goOnline);
  window.removeEventListener("offline", goOffline);
};
```

---

**Generate random 6 digit number**

```js
Math.floor(100000 + Math.random() * 900000);
```

---

**Run a node module binary script directly**

```
$ ./node_modules/.bin/<name>
```

---

**Capturing groups**

```js
"2020-01-02".match(/([0-9]{4})/); // 2020
"123 gogogo".match(/(\d+)/); // 123
"xxx|0y0|xxx".match(/\|(.*)\|/); // 0y0
"<span>xxx</span>".match(/\<span\>(.*)\<\/span\>/); // xxx
```

[1](https://flaviocopes.com/javascript-regular-expressions/#capture-text-between-double-quotes)

---

**Match anything**

```
.*
```

---

**window.prompt**

It's useful when you want to implement some sort of action confirmation dialog, but you don't want to use anything fancy.

```js
// text, defaultValue
const result: string = window.prompt('Type "OK" to confirm deletion.', "");
```

---

**Download file via AJAX**

```js
async function generateContract() {
  const response = await api.post(
    "/generateContract",
    { id: "1" },
    { responseType: "blob" }
  );
  this.forceFileDownload(response);
  this.status = "success";
}

function forceFileDownload(response) {
  const contentDisposition = response.headers["content-disposition"];
  const filename = contentDisposition.match(/\"(?<filename>.*)\"/)[1];

  const url = window.URL.createObjectURL(new Blob([response.data]));

  const link = document.createElement("a");
  link.href = url;

  link.setAttribute("download", filename);

  document.body.appendChild(link);

  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
```

[1](https://gist.github.com/javilobo8/097c30a233786be52070986d8cdb1743)

---

**Named group in RegExp**

```js
// Match everything between "" and return it as a filename
const filename = contentDisposition.match(/\"(?<filename>.*)\"/)[1];
```

**Knex named bindings**

```js
const _resultForToday = await Database.raw(
  `
      SELECT
        COUNT(*) FILTER (WHERE hv.vote = 'progress')::integer AS "progressVotes",
        COUNT(*) FILTER (WHERE hv.vote = 'plateau')::integer AS "plateauVotes",
        COUNT(*) FILTER (WHERE hv.vote = 'regress')::integer AS "regressVotes",
        (
          SELECT COUNT(*)
          FROM habits as h
          WHERE h.created_at::date <= now()::date AND h.user_id = :user_id
        )::integer as "allHabits"
      FROM habit_votes as hv
      INNER JOIN habits as h ON hv.habit_id = h.id
      WHERE hv.day::date = now()::date AND h.user_id = :user_id
    `,
  { user_id: auth.user.id }
);
```

---

**Scroll to top**

```js
window.scroll({
  top: 0,
  left: 0,
  behavior: "smooth",
});
```

---

**Access element's data attribute**

```js
<div data-columns="3" id="electric-cars">
  Electric cars are described below
</div>;

const article = document.querySelector("#electric-cars");

article.dataset.columns; // "3"
```

---

**getBoundingClientRect**

Returns a set of properties about given box:

`top`, `right`, `bottom`, and `left`,
`width`, `height`,
`x`, `y`

---

**Cypress check if element has an atribute (e.g href)**

```js
cy.findByText("first").should(
  "have.attr",
  "href",
  "/habits?preview_habit_id=1"
);
```

---

**RegExp.test**

```
let re = /a/g
re.test('ab') // true
re.test('ab') // this will fail! re.lastIndex === 1, so it starts searching at 'b'
re.test('ab') // this will pass! since it failed, re.lastIndex is reset to 0
```

[0](https://gist.github.com/brianloveswords/0e85c8eca3f73853408f69702ab4b3eb)

---

**Match n items in a RegExp**

```js
/^\d{3}$/.test("123"); // true
/^\d{3}$/.test("12"); // false
```

---

**Match n to m items in a RegExp**

```js
/^\d{3,5}$/.test("123"); // true
/^\d{3,5}$/.test("123456"); // false
```

---

**Match at least n items in a RegExp**

```js
/^\d{3,}$/.test("12"); // false
/^\d{3,}$/.test("123456"); // false
```

---

**Get the distance to the top of the page**

```js
onMouseDown={event => event.clientY}
```

---

**Return text so browser can download it**

```js
return response
  .header("Content-Disposition", `attachment; filename="${csvFilename}"`)
  .header("Content-Type", "text/csv")
  .send(csv);
```

---

**Array.prototype.unshift**

It prepends all the elements to the beginning of an array.

```
[2, 3].unshift(1); // [1, 2, 3];
```

---

**Assert children in Cypress**

```js
cy.get("ul").children().should("have.length", 10);
```

---

**Sort array by an object property**

```js
Array.from(result.progress_streaks).sort((a, b) =>
  a.progress_streak > b.progress_streak ? -1 : 1
);
```

---

**%j parameter in console.log**

It outputs the JSON.stringified version of a variable.

```
const result = [ { username: "bartek", age: 23 }, { username: "ola", age: 19 }];
console.log("%j", result);
```

---

**Webpack performance budget**

In webpack config file:

```js
module.exports {
		performance: {
			maxAssetSize: 300000, //in bytes
			maxEntrypointSize: 300000,
			hints: "warning",
		},
}
```

---

**Run server on a random port**

```js
const http = require("http");

const server = http.createServer();

server.listen(0, () => {
  console.log(server.address().port);
});
```

---

**Debugging node memory usage**

```
$ node --inspect index.js
```

Go to the Chromium app, type `chrome://inspect`, choose your target, and take a heap snapshot.

The first one should be taken in the "normal" app state, the second when the memory is leaking.

Instead of manually taking snapshots, you can use `heapdump` package, and write the snapshot to a file.
Then, you cant import the files and compare them in the chrome inspector.

---

**Access app version from package.json**

1. Import package.json and read it.

2. Use `process.env.npm_package_version`.

---

**Configure Cypress test suite for many viewports**

[0](https://maximilianschmitt.me/posts/cypress-testing-mobile-tablet-desktop/)

---

**Skip Cypress test programatically**

Use regular function, because you won't be able to use `this` in arrow function.

```js
it("skip nav for all main authenticated views", function () {
  if (Cypress.env("device") === "mobile") {
    this.skip();
  }
});
```

---

**Chain lodash functions**

```js
const facility_types = _(locations)
  .map((location) => _.get(location, "data.type"))
  .filter()
  .uniq()
  .value();
```

---

**Get checked radio button value in vanilla JS**

```js
document.querySelector('input[name="gender"]:checked').value;
```

---

**hasOwnProperty**

Let's say we want to check if an object has property "age"

```js
const person = {
  age: 20,
};

person.hasOwnProperty("age"); // true
```

It returns `false` if the property is find down the prototype chain.

```js
const mammal = {
  age: 20,
};

const human = {
  __proto__: mammal,
  name: "Bart",
};

human.hasOwnProperty("age"); // false
```

---

**Object.is**

Object.is checks whether two values are the same value.

In general, it works exactly as `===` except in case of comparing, `NaN`, `0`, `-0`.

```
NaN === NaN; // false
Object.is(NaN, NaN); // true

It means there's only one NaN in the JS world, and it's equal or not to itself depending
on which method we choose.
```

```
0 === -0; // true
0 === +0; // true
-0 === +0; // true

Object.is(0, -0); // false
Object.is(0, +0); // false
Object.is(-0, +0); // false

It means that 0, -0, +0 are distint and separate values.
```

---

**proto of an empty object**

```js
let obj = {};

console.log(obj.__proto);

{
  __proto: null,
  hasOwnProperty,
  ...
}
```

---

**Object Prototype pollution**

```js
let obj = {};
obj.__proto.age = 20;

let newObj = {};

console.log(newObj.age); // 20
```

```
      |--OP--|
      | {..} |
      |age:20|
      |------|
    -           -
__proto__  ___proto___
    -           -
|--obj--|  |--newObj--|
| {...} |  |   {...}  |
|-------|  |----------|

```

---

**Accidental global variable**

```
let a = b = 0;
```

It creates `a` = 0, and global `b` = 0;

```js
window.a; // undefined
window.b; // 0
```

---

**Mutating .length of an array**

If set to `0`, it clears the array.
If set to minmax(1, array.length), truncates the items.

```js
const animals = ["horse", "cow", "dog"];

animals.length = 0;

animals; // []
```

---

**setTimeout in a for loop**

```js
let i;

for (i = 0; i < 3; i++) {
  const log = () => {
    console.log(i);
  };
  setTimeout(log, 100);
}
```

Prints `3`, `3`, `3`, because for iterates 3 times before the first log function is scheduled.
Beware the i = 3, not 2.
`i` gets updated to `3`, and then the assertion fails.
And it references the `i` lexically, so it's already equal 3.

---

**var and hoisting**

```js
console.log(number); // undefined

var number = 3;
```

Variable initialization is what's hoisted, not the value assignment.

---

**const/let and hoisting**

If you try to access a variable defined by const/let before the initialization,
it's in the "temporal dead zone", and will throw the ReferenceError.

```js
console.log(number); // ReferenceError
console.log(word); // ReferenceError

const number = 3;
let word = "xd";
```

---

**indexOf object/array**

`indexOf` works only for primitive values.

```js
console.log([{ name: "John" }, { name: "John" }].indexOf({ name: "John" })); // -1
```

---

**Add functionality to an object prototype with proto**

```js
function increment() {
  this.score++;
}

const incrementer = {
  increment,
};

const user = {
  __proto__: incrementer,
  score: 5,
};

user.increment();

user.score; // 6
```

---

**Object.create**

It adds an object passed as an argument as the prototype of the returned object.
Always returns an empty object.

```js
const incrementer = {
  increment: function () {
    this.score++;
  },
};

const user = Object.create(incrementer);

user.score = 5;

user.increment();

user.score; // 6
```

---

**Function-object combo**

When creating a function, it automatically gets assigned an empty object with empty `prototype` object.

`prototype` is just a regular property.

```js
function person() { //...  }

person.prototype; // {}
```

---

**What does the new keyword do behind the scene?**

Given the following code:

```js
function User(name, score) {
  this.name = name;
  this.score = score;
}

User.prototype._threshold = 10;
User.prototype.log = function () {
  console.log(`${this.name}: ${this.score}`);
};

const user = new User("Ja", 5);
```

1. Creates and empty `this` object
2. Adds a `__proto__` property in `this` object pointing to the function's object bit - `prototype`.
3. Returns the object.

If the function was to run without the `new` keyword, it would return undefined.

---

**How it prototype different from proto?**

`prototype` is an object bit of a function-object combo which every not arrow function has.

```
function normal() {}

console.log(normal.prototype); // {}

const arrow = () => {};
console.log(arrow.prototype); // undefined
```

`__proto__` is a place for a JS to continue the `prototype chain` lookup on an object.

---

**What is `this` referring to?**

1. Calling a function

```js
function log() {
  // this refers to the `window`/`global` object
  console.log("here");
}

log();
```

```js
const log = () => {
  // this doesn't exist, an empty object
  console.log("here");
};

log();
```

2. Calling a method

```js
const user = {
  name: "Bartek",
  log: function () {
    // this refers to the `user` object, because it's on the left of the dot
    console.log(this.name);
  },
};

user.log();
```

```js
const user = {
  name: "Bartek",
  log: () => {
    // this doesn't exist
    console.log(this.name);
  },
};

user.log();
```

3. Calling a function nested in a function method

```js
const user = {
  name: "Bartek",
  log: function () {
    function whatIsThis() {
      // this refers to the `window`/`global` object, just like the 1.
    }

    whatIsThis();
  },
};

user.log();
```

```js
const user = {
  name: "Bartek",
  log: function () {
    const whatIsThis = () => {
      // this refers to `user` object, as its place of definition
    };

    whatIsThis();
  },
};

user.log();
```

---

**bind, call, apply**

- `bind` creates a partially applied function with a new `this` context, ready to be called
- `call` actually calls a function with a new `this` context, and allows for arguments to be passed
- `apply` actually calls a function with a new `this` context, and allows for arguments to be passed as an array

```js
function add(time) {
  console.log("running at: ", time);
  console.log(this.x + this.y);
}

const boundAdd = add.bind({ x: 2, y: 3 }, Date.now());
boundAdd();

add.call({ x: 2, y: 3 }, Date.now());
add.apply({ x: 2, y: 3 }, [Date.now()]);
```

---

**Why is bind useful**

```js
function add() {
  console.log(this.x + this.y);
}

const calculator = {
  x: 2,
  y: 3,
  add,
};
calculator.add(); // 5

const adder = calculator.add;
adder(); // NaN

const boundAdder = calculator.add.bind(calculator);
boundAdder(); // 5
```

If `add` was about to be changed to an arrow function, it would not work,
since they don't have `this`, and it cannot be added by bind/call/apply.

---

**What does calling super() do?**

It calls the constructor of the class that given class extends.
You cannot access `this` before it's been called.

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

class Adam extends Person {
  constructor() {
    // super("Adam"); // <- needs to add this
    this.greet(); // fails
  }

  greet() {
    console.log("greeting");
  }
}

const adam = new Adam();
```

---

**Run promise once outside the scope of an exported async function**

```js
const long_random_promise = new Promise((resolve) => {
  console.log("here"); // printed only once

  setTimeout(() => {
    resolve(Math.random());
  }, 2000);
});

(async function () {
  console.log(await long_random_promise);
  console.log(await long_random_promise);
})();
```

[0](http://mbork.pl/2020-08-03_Look_up_a_global_variable_in_the_database_in_Node.js)

---

**Check if node is contained in another node**

```js
const main = document.querySelector("main");

main.contains(event.target); // for example an event target node
```

---

**Adonis session expiration time**

[0](https://github.com/adonisjs/adonis-fullstack-app/blob/master/config/session.js#L55)

---

**window.confirm before form submitting**

```js
node.addEventListener("submit", (event) => {
  event.preventDefault();

  if (window.confirm("Are you sure?")) {
    event.target.submit();
  }
});
```

---

**Debug a node script**

```bash
$ node --inspect --inspect-brk ./src/index.js
```

- Go to `chrome://inspect` in Chrome/Chromium
- Click `Open dedicated DevTools for Node`
- You can click "Step"
- You can click "Resume execution"
- You can use the console

---

**Access user's timezone**

```js
Intl.DateTimeFormat().resolvedOptions().timeZone;
```

---

**knex enum**

```js
// 1.
table
  .enu("status", ["active", "awaiting", "deleted"], {
    useNative: true,
    enumName: "user_status",
  })
  .notNullable();

// 2.
table.enu("status", ["active", "awaiting", "deleted"]).notNullable();
```

1. Defines a native Postgres ENUM type
2. Defines a text field with an enum-like constraint

---

**Trigger PDF file printing**

```js
const printWindow = window.open(pdfFileUrl, "PRINT", "height=400,width=600");

printWindow?.print(); // doesn't work in Firefox, blank page is printed

setTimeout(() => printWindow?.print(), 1000); // just wait in Firefox
```

[0](https://bugzilla.mozilla.org/show_bug.cgi?id=1251028)

---

**Preload node module**

```bash
$ node index.js -r dotenv/config
$ node index.js --require src/index.js
```

---

**Express empty request.body**

```js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

---

**Replace everything inside brackets and brackets**

```js
const string = "[number] of correct answers";

string.replace(/\[(.*)\]/, 5);
```

---

**Download a file by using a stream with axios**

```js
await axios({
  method: "get",
  url: url,
  responseType: "stream",
}).then((response) => data.pipe(fs.createWriteStream(filename)));
```

---

**Check if path is a file or is a directory**

```js
const resourceStats = await fs.promises.stat(path);
resourceStats.isFile();
resourceStats.isDirectory();
```

---

**nodemailer self-signed certificate error**

Add the following to the config:

```
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
```

---

**Email attachment as an embedded image**

```js
const mailOptions = {
    ...
    html: 'Embedded image: <img src="cid:unique@kreata.ee"/>',
    attachments: [{
        filename: 'image.png',
        path: '/path/to/file',
        cid: 'unique@kreata.ee' //same cid value as in the html img src
    }]
}
```

---

**Example PM2 ecosystem file usage**

```js
module.exports = {
  apps: [
    {
      name: "testing-secret-valentine-server",
      script: "./scripts/testing-server-start.sh",
    },
    {
      name: "testing-secret-valentine-maildev",
      script: "./scripts/development-maildev-start.sh",
    },
  ],
};
```

```
$ npx pm2 restart ecosystem.config.js
```

---

**dotenv custom config file**

```
$ node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/.env
```

---

**Read current package version in node**

```js
import packageJson from "./package.json";

echo(packageJson.version);
```

---

**Access user timezone offset in minutes**

```
new Date().getTimezoneOffset().toString()
```

---

**JS dates in safari**

Something to be aware of: dates in the `yyyy-MM-dd hh:mm` are not parsed correctly when passed to `new Date()` in Safari (all other browsers work correctly in that department).

The solution is to use `parse()` from `date-fns`, and don't rely on the native date string parsing.

https://stackoverflow.com/questions/6427204/date-parsing-in-javascript-is-different-between-safari-and-chrome

---

**Check if intersection observer is available**

```js
if (
  !("IntersectionObserver" in window) ||
  !("IntersectionObserverEntry" in window) ||
  !("intersectionRatio" in window.IntersectionObserverEntry.prototype)
) {
  // load polyfill now
}
```

---

**Query params**

The package I use the most is [qs](https://www.npmjs.com/package/qs).

All browsers except Internet Explorer ship with `URLSearchParams`:

```javascript
const params = new URLSearchParams(window.location.search);

params.get("query");
```

--

**Write node.js headers just before they get sent**

```js
import onHeaders from "on-headers";

function middleware(_request, response, next) {
  const before = Date.now();

  onHeaders(response, () => {
    const after = Date.now();
    const duration = after - before;

    response.setHeader("Server-Timing", `total;dur=${duration}`);
  });

  next();
}
```

---

**Promise and setTimeout callback execution order**

1. Sync
2. Job queue - async promise callbacks (FIFO)
3. Task (event loop) queue - async callbacks other than promises (FIFO)

```js
const first = () => console.log("first");
const second = () => console.log("second");
const third = () => console.log("third");

setTimeout(first, 0);
Promise.resolve().then(first);
setTimeout(second, 0);
Promise.resolve().then(second);
third();
console.log("fourth");

// third, fourth, first second, first second
```

[0](https://dmitripavlutin.com/javascript-promises-settimeout/)

---

**lodash.merge mutating an object**

```js
_.merge(a, b); // a is mutated
_.merge({}, a, b); // a is not mutated
```

---

**change vs input events in input range**

`change` gets emitted after range thumb has been dropped.
`input` gets emitted after every value change, even while holding the range thumb.

---

**input range color the left side**

```js
range.addEventListener("input", (event) => {
  const { min, max, value } = event.target;
  const percentage = Math.round((value / (max - min)) * 100);

  event.target.style.background = `linear-gradient(to right, blue ${percentage}%, red ${percentage}%)`;
});
```

---

**Store a variable for an express request**

```js
import express from "express";

response: express.Response<any, { ok: string }>

response.locals.ok = "ok"
```

---

**Reflect.has**

```js
Reflect.has(payload, "property");
```

The same as `in` operator.

---

**Logical or assignment**

```js
document.getElementById("lyrics").textContent ||= "No lyrics.";

const x = 1;
x ||= console.log("y evaluated");
```

[0](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment)

---

**Error cause**

```js
throw new Error("RSA key generation requires integer inputs.", {
  cause: { code: "NonInteger", values: [p, q] },
});
```

---

**Handle throwing error in a timer in an Express.js middleware**

Emit an event and pass the error to the next function in an event handler

```ts
function handle(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const timeout = setTimeout(
    () => request.emit("timeout", config.timeoutMs),
    config.timeoutMs
  );

  request.on("timeout", () => next(new RequestTimeoutError()));
  onHeaders(response, () => clearTimeout(timeout));

  return next();
}
```

---

**Pragma no-cache header**

`Pragma: no-cache` header is a good practice for downloadable files to ensure a consistent and up-to-date experience for users when downloading files from your server.
It tells server not to cache the file, as the filename may be the same, but the content not.

---

**form.submit outside the form does not trigger onSubmit**

```js
event.currentTarget.form.dispatchEvent(
  new Event("submit", { cancelable: true })
);
```

instead of:

```js
event.currentTarget.form.submit();
```

---

**Nullish coalescing assignment**

Assigns a value to a property if the property is null or undefined.

```
const a = { duration: 50 };

a.duration ??= 10;
console.log(a.duration);
// Expected output: 50

a.speed ??= 25;
console.log(a.speed);
// Expected output: 25
```

---

**Logical AND assignment**

Only evaluates the right operand and assigns to the left if the left operand is truthy.

```js
let a = 1;
let b = 0;

a &&= 2;
console.log(a);
// Expected output: 2

b &&= 2;
console.log(b);
// Expected output: 0
```

---

**Logical OR assignment**

Only evaluates the right operand and assigns to the left if the left operand is falsy.

```js
const a = { duration: 50, title: "" };

a.duration ||= 10;
console.log(a.duration);
// Expected output: 50

a.title ||= "title is empty.";
console.log(a.title);
// Expected output: "title is empty"
```

---

**All promises were rejected**

```ts

// before

  async find(): Promise<VO.SourceUrlType> {
    try {
      const options = this.urls.map((sourceUrl) =>
        Policies.SourceUrlResponds.perform({ sourceUrl }).then(() => sourceUrl)
      );

      return Promise.any(options);
    } catch (error) {
      throw new Policies.SourceUrlRespondsError();
    }
  }

// after

  async find(): Promise<VO.SourceUrlType> {
    const options = this.urls.map((sourceUrl) =>
      Policies.SourceUrlResponds.perform({ sourceUrl }).then(() => sourceUrl)
    );

    return Promise.any(options).catch(() => {
      throw new Policies.SourceUrlRespondsError();
    });
  }
```

---

**Single-file executables**

[0](https://nodejs.org/api/single-executable-applications.html)

---

**Create a Node.js response stream**

```ts
import stream from "node:stream";

const content = new stream.Readable({
  async read() {
    for (const journal of journals) {
      const date = datefns.format(journal.date.raw, "yyyy-MM-dd");

      this.push(
        `${date} - ${journal.emotion}\n${journal.situation}\n${journal.reaction}\n\n`
      );
    }

    this.push(null);
  },
});

return content.pipe(response);
```

---
