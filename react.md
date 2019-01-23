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
or
```
type Props = {
  init: number
}
const App: FC<Props> = ({init}) => (<div/>);
```

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

**useReducer**

It's used by `useState` internally. 
`const [state, dispatch] = useReducer(reducer, initialState)`

Reducer is a function with signature: `(state, action) => newState`.
You can use a standard switch statement.

```
type State = {
  count: number;
};

type Action = {
  type: 'increment' | 'decrement' | 'reset';
};

const initialState: State = {
  count: 1
};

const reducer = (state: StateTypes, action: Action) {
  switch(action.type) {
    case 'increment':
      return {...state, count: state.count +1};
    case 'decrement':
      return {...state, count: state.count +1};
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, initialState);
```

Or more of an object-based approach:

```
type State = {
  count: number;
};

type Reducers = {
  increment: ReducerFunction;
  decrement: ReducerFunction;
  reset: ReducerFunction;
};

type Actions = {
  type: keyof Reducers;
};

type ReducerFunction = (action?: Actions) => (state: State) => State;

const initialState: State = {
  count: 0;
};

const increment: ReducerFunction = () => R.evolve({count: R.inc});
const decrement: ReducerFunction = () => R.evolve({count: R.dec});
const reset: ReducerFunction = () => R.always(initialState);

const reducers: RT = {
  increment,
  decrement,
  reset,
};

const reducer = (state: State, action: Actions): State => reducers[action.type](action)(type);

const [state, dispatch] = useReducer(reducer, initialState);
```

To dispatch an action onClick:
`<button onClick={() => dispatch({type: 'reset'})}>Increment</button>`

---

**Alternative syntax for React Fragment**

`const App: FC = () => (<>xxx</>);`

---

**Lazy load component with lazy and Suspense**

A component that we are going to lazy load. Remember about a default export.

```
// Header.jsx

import React, {FC} from 'react';

const Header: FC = () => <h2>XD</h2>;

export default Header;
```

```
// App.jsx

import React, {useState, FC, lazy, Suspense} from 'react';

const Header = lazy(() => import('./Header'));

const useToggle = (initialValue: boolean): [boolean, () => void] => {
  const [on, setOn] = useState(initialValue);
  const setToggle = () => setOn(!on);
  return [on, setToggle];
};

const App: FC = () => {
  const [showHeader, toggleHeader] = useToggle(false);
  return (
    <>
      <div>
        Header is shown:
        <strong>{JSON.stringify(showHeader)}</strong>
      </div>
      <button onClick={() => toggleHeader()}>Toggle</button>
      <Suspense fallback={<div>Loading...</div>}>
        {showHeader && <Header />}
      </Suspense>
    </>
  );
};

export default App;
```

---

**How to useEffect?**

It's a hook when you should perform all the side-effects.

You can think of it as a `componentDidMount`, `componentDidUpdate` and `componentWillUnmount` combined.

There are two kinds of side-effects. Those which require a cleanup and those which don't. 

We don't need to duplicate code/logic between lifecycles.

By default `useEffect` hook describes an operation that performs after the first render and on each update. React guarantees the DOM has been updated before the hook is run.

API:
`useEffect(() => { document.title = "xxx"; return () => {console.log("cleanup")} })`

On each render the function that is passed will be new. That's intentional, so we can access a current state etc. Each effect belongs to the particular render.

There'are a lot of bugs coming from not handling a componentDidUpdate scenario.

To make React skip applying an effect, pass an array with variable that changes will be tracked. An empty array means that the effect will be applied on initial render and unmount.

---
