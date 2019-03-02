**Testing unconnected components**

Export intermediate components as Private, to avoid confusion when importing a \*component instead of \*container

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

**How to fire a click event in r-t-l?**

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

There are a lot of bugs coming from not handling a componentDidUpdate scenario.

To make React skip applying an effect, pass an array with variable that changes will be tracked. An empty array means that the effect will be applied on initial render and unmount.

Effects are run after React renders, ensuring that its not blocking any update.

---

**What happens when the key of the element changes?**

When an component's key has changed, React will unmount the component and mount a new instance of it.

```
function Counter() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      {counter}
      <button
        onClick={() => setCounter(counter + 1)}
      >
        Add
      </button>
    </div>
  );
}

function App() {
  const [key, setKey] = useState("default");
  return (
    <div className="App">
      <Counter key={key} />
      {key}
      <button onClick={() => setKey('newone')}>
        Change key
      </button>
    </div>
  );
}
```

---

**How to test components that utilize useEffect?**

After you render a component that performs some side effects within useEffect, and you want to see the results, you need to rerender it. Body passed to the useEffect hook is executed **after** the render is committed.

```
const {rerender} = render(<App />);
  rerender(<App />);
  expect(window.document.title).toEqual('Current name: <empty>');
```

---

**How to access document title in tests?**

`window.document.title`
---

**Why do we need to specify the type of event target?**

There can be many types of the event target, be it an element, xhr, audio context. So we need to explicitly cast the target to the specific type.

`const element = e.target as HTMLInputElement;`

---

**How to access a value of input in TypeScript?**

`const input = getByLabelText(/name/i) as HTMLInputElement;`

**How to fire "change" event in r-t-l?**

```
const input = getByLabelText(/name/i) as HTMLInputElement;
fireEvent.change(input, {target: {value: "Johnny"}});
```

---

**How to test lazy-loaded components?**

Use `wait`/`waitForElement` async functions. The former runs the next event loop tick, and the latter uses a mutation observer to check if the callback doesn't throw an error.

We pass a promise to the React.lazy, so it will resolve in the next event loop tick, it's enough to `wait`.

---

**Specify port to run the dev server in cra**

`"start": "PORT=80 react-scripts start"`

---

**useEffect vs useLayoutEffect**

`useLayoutEffect`:
- aligned closer to the previous `componentDidMoun`/`componentDidUpdate`/`componentWillUnmount` behaviour
- run synchronously after all DOM mutations
- before user sees an update on the screen (DOM mutations)


`useEffect`
- run asynchronously after all DOM mutations
- after user sees an update on the screen (e.g store sun/unsub)

---

**How to type React component to allow more than one child?**

```
interface Props {
	children: React.ReactChild | React.ReactChild[];
}
```

---

**How and why to forwardRef?**

`ref` can only be passed to a native HTML element, like `input` or `button`. When passed to a Function Component, React warns that it won't work.

A way for a Function Component to receive a ref is to wrap it with `forwardRef`.

```
const Button = forwardRef((props, ref) => (<button {...props} ref={ref}>Buy</button>)
    )
```

With TypeScript, forwardRef receives two arguments: HTML element type and component props.

```
const Button = forwardRef<HTMLButtonElement, HTMLProps<HTMLButtonElement>((props, ref) => (<button {...props} ref={ref}>Buy</button>)
    )
```

---

**How to clone all the children and pass props to them?**

```
{React.Children.map(this.props.children, child =>
  React.cloneElement(child, { isActive: this.state.isActive })
)}
```

---

**How to access DOM refs by `useRef`?**

```
const inputRef = useRef<HTMLInputElement>(null); // TS says that it needs to be initialized to some variable

<input ref={inputRef} />

An actual DOM ref is available in `inputRef.current`, before/after the input the ref refers to is mounted/unmounted, the value of the ref is equal to null.
```

---

**What's `act` in react testing utils for?**

Let's say you want to render a component that runs a `useEffect` hook.

```
const App = () => {
  useEffect(() => {
    console.log("Hello from useEffect!");
  });
  return <div>App</div>
}
```

Normally, in browser, user would have seen the message in the console, after the component has been rendered. Unfortunately, it's not a case in the testing (jsdom) environment - the component gets rendered, but the effect has not been run. You can bypass it by executing next event loop tick (`await wait()` in react-testing-library) or by any `flushPromises` kind of logic.

There's also a possibility to change `useEffect` to the `useLayoutEffect` which guarantees to perform a render blocking effect. The test will pass, but it's icky.

React test utils exposes an `act` helper that you can run your test rendering in, it resembles greater part of the in browser behaviour ().

If you run a hook on any update causing logic outside the `act` scope in the testing env, you get an error.

---

**Target container is not a DOM element error**

It happens when you test component that somewhere in its tree imports a variable/component from the file that uses a ReactDOM.

---

**How to test components that fetch data?**

`examples/use-effect-axios-test`

---

**What's `useCallback` useful for?**

Returns a memoized callback, which doesn't change unless one of the input items are changed. The elements from the input array are not passed as arguments to the callback.

It's advised to go with the standard, inline option:
`onClick={() => addTab({title: file.name})}`
unless you encounter a performance issue.

```
const openNewTabWithFile = React.useCallback(
  () =>
    addTab({
      title: file.name,
      suffixTitle: file.number,
      isRemovable: true,
      type: 'file',
      params: {
        id: file.number,
      },
    }),
  [file]
);
```

---

**How to set today as a value of a date input?**

It needs to be in the following format.

`dayJs().format('YYYY-MM-DD')`

---

**How to test if given element is/isn't present in the DOM?**

`expect(getByTestId(/list-wrapper/)).toBeInTheDocument();`
`expect(getByTestId(/list-wrapper/)).not.toBeInTheDocument();`

---

**How to test if a radio button is selected?**

```
const inboundRadio = getByLabelText(/inbound/) as HTMLInputElement;
expect(inboundRadio.checked).toEqual(false);
```

---

**How to test a keyboard tab navigation?**

Normally, I would dispatch a key down tab event like this:

```
const { getByLabelText, container } = render(<AddTransactionForm />);
const nameInput = getByLabelText(/name/);
fireEvent.keyDown(container, {
  key: 'Tab',
  keyCode: 9,
  charCode: 9,
});
console.log(window.document.activeElement) // the first element that gains focus;
```

But it's not technically possible in the JSDOM env, since the user actions are not supported, i.e tab keyboard navigation.

https://github.com/vuejs/vue-test-utils/issues/966
https://github.com/jsdom/jsdom/issues/2102

---

**What's a difference between `createElement` vs `cloneElement`**

`createElement` just creates an element of given type, it's what JSX is desugared to.

`cloneElement` clones and returns a new React element using the base element as a starting point. It merges given props with the base element's props (shallowly). Given children overrides the base element's children. The `key` and `ref` are preserved.

`React.cloneElement(NavItem, { isActive: active })`

---

**What's a Strict Mode?**

A mechanism to highlight all the legacy APIs/methods/patterns. Doesn't interfere with the UI itself. Can be placed anywhere in the app tree.

A list of things it helps with: [react-docs](https://reactjs.org/docs/strict-mode.html).

---

**What's the render and commit phase?**

`render` phase is when React calls all the render methods and creates a diff against the previous tree. It may be slower.

`commit` phase is when React applies all needed changes, it makes actual DOM manipulations, and calls the lifecycle methods. Usually fast.

---

**Is setState async?**

Yes, `setState` is async, but not always must be like that. In some cases it may feel sync, but you cannot rely on it being sync.

---

**How does batching work?**

It prevents unnecessary rerenders.

```
function Parent() {
  let [count, setCount] = useState(0);
  return (
    <div onClick={() => setCount(count + 1)}>      
      Parent clicked {count} times
      <Child />
    </div>
  );
}

function Child() {
  let [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>      
      Child clicked {count} times
    </button>
  );
}
```

Without batching it would look like:
- start click event
- set child's state
- rerender child // unnecessary
- set parent's state
- rerender parent
- rerender child
- finish click event

All it happens inside EVENT HANDLER.

With batching:
- start click event
- set child's state
- set parent's state
- process state updates
- rerender parent
- rerender child
- finish click event

So if inside an event handler you have e.g:

```
function Child() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 10);
  }

  function handleClick() {
     increment();
     increment();
  }
  return <button onClick={handleClick}>Increment {count}</button>;
}
```

It will not be processed as:
- start click event
- set child's state to 10
- rerender child
- set child's state to 20
- rerender child
- finish click event

But instead:
- start click event
- set child's state to 10
- set child's state to 10
- rerender child
- finish click event

DEMO: [with-and-without-batching](https://codesandbox.io/s/xnoqnvpqp)

To force a non batched event handling, use an updater function (they're executed in the queue).

`setCount(count => count + 1);`

---

**How to use `memo`? How's that different than `useMemo`?**

`useMemo` returns  a memoized value of the function that's passed, is also accepts an array of deps.

```
const memoizedValue = React.useMemo(() => compute(a, b), [a, b]);
```

`memo` is only for memoizing function components in a similar way to PureComponent (shallow prop comparison).

---

**What is `setupFileAfterEnv` in Jest for?**

From Jest ^24 to setup import paths that are run in every test.

``` // jest.config.js
module.exports = {
	setupFilesAfterEnv: [
		'jest-dom/extend-expect',
		'react-testing-library/cleanup-after-each',
	],
};
```

---

**What is JSX pragma?**

When using JSX in React app, `<Nav />` desugars to `React.createElement(Nav)`, when e.g a `{ "pragma": "dom" }` is specified in the babel config, it will replace an expression that JSX is desugared to, e.g `dom(Nav)`.

---

**Why not to use memo/PureComponent by default?**

No, the most benefits are gained while a parent often rerenders its children that have the same props, so they can shallowly compared and the work can be saved. Otherwise, it's just another lifecycle method/React.memo call.

WARNING: don't use PureComponent/memo when the props have deep structure, because the change on the second depth level won't trigger rerenders.

---
