**Testing unconnected components**

- export intermediate components as Private, to avoid confusion when importing a \*component instead of \*container

---

**Display a react version**

`{React.version}`

---

**Short-circuit evaluation**

Is a method when the second expression is evaluated only after the first one is truthy.

`{ shouldUserSeePrice && <Price amount={30} currency="$" />`

---

**Use shallow props instead of objects**

`<Notification type="info" text="Item has been added." hideAfter={500} />`

instead of

`<Notification data={notification} hideAfter={500} />`

---


**A second argument to `this.setState`**

In order to avoid batching multiple `setState` calls, ensures proper ordering.

`this.setState( (prevState, currProps) => ({ isLoading: false }) );`

---

**Changing classes vs styles performance**

Because of performance, it's advisable to switch classes. There's no need to rerender a document, when you can rerender class names.

---

**Equivalent of anything that react acceps as a child**

`React.propType.node`

---

**Event delegation**

React listens on the entire document for a click events, then it sees the source of the event, and finally it delegates it (if the source element has the click handler, if not - the event bubbles until it founds a parent handler).

---


**User-defined components must be capitalized**

If you define a component that starts with a non-capitalized letter, React treats it as a built-in HTML tag e.g `div`.

Tags are used to mark up the start and the end of an HTML element.
Element is an opening tag, content and a closing tag.

---

**Hooks**

It's better to say "function components" instead of "stateless components".

Hooks don't work in the class components.

Call hooks at the top level - don't do it in conditions, loops, nested functions, or JS functions.

You can create a custom hook.

**useState**

You can pass whatever type of the default value. Not necessarily an object like in the class state. Null/undefined/number/string work too.

`const [counter, setCounter] = useState(0);`

You can use multiple useState hooks in one component.

You can use `lazy evaluation` to pass an retrieve an initial value. Pass a function, that will be run only once, at the initial render. On the subsequent renders it won't be invoked.

`const [value, setValue] = useState(() => longOperation());`

You can Just Use™ hooks with TypeScript.

Test it just like any other component. Don't rely on implementation details.

---

**Start create-react-app with TypeScript**

`create-react-app MY_NEW_APP --typescript`

---

**How to set type of props of the functional component?**

`const App: FC<{init: number}> = ({init}) => (<div />)`

---

**How to set type of props of the class component?**

`class App extends React.Component<{IProps, IState}> {}`

---

**Testing**

How can I get an element? These methods throw an error when element is not found.

By text, label, test id, placeholder.

```
const {getByText} = render(<App />);
getByText("score");
getByText(/score/i); // don't look at casing
```

---

**How to use data-testid?**

```
const App = () => <div data-testid="score">A</div>;

const {getByTestId} = render(<App />);
```

---

**How to fire an event?**

```
const App = () => <button>Increment</button>;

const {getByText} = render(<App />);
cosnt button = getByText(/increment/i);
fireEvent.click(button);
```

---
