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

## `window.document.title`

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
const Button = forwardRef<HTMLButtonElement, HTMLProps<HTMLButtonElement>((props, ref) => (<button {...props} ref={ref}>Buy</button>))
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

`useMemo` returns a memoized value of the function that's passed, is also accepts an array of deps.

```
const memoizedValue = React.useMemo(() => compute(a, b), [a, b]);
```

`memo` is only for memoizing function components in a similar way to PureComponent (shallow prop comparison).

---

**What is `setupFileAfterEnv` in Jest for?**

From Jest ^24 to setup import paths that are run in every test.

```// jest.config.js
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

**What problem does `mdx` solve?**

It allows to include JSX components (e.g Charts, Notifications) in the markdown documents.

---

**What apart from DOM refs can be stored in `useRef` hook?**

`ref` - mutable ref object, with a value assigned to the `.current` attribute

A value passed to the `useRef` may be something else than DOM ref. You can visualise it as a kind of instance variable - a one which that persists during all the lifecycle of the component.

```
const Timer = () => {
  const timeoutId = React.useRef();
  useEffect(() => {
    const id = setTimeout(() => {}, 100);
    timeoutId.current = id;
    return () => clearTimeout(timeoutId.current)
  })
}
```

It's a good use case for keeping the callback/id in custom hooks.

---

**How to use an unstable Suspense's `createResource`?**

```
import React, {Suspense} from "react";
import {unstable_createResource} from "react-cache";

const githubUser = unstable_createResource(
  () => fetch("api.github.com/users/bgord")
)

export const App = () => {
  const me = githubUser.read();
  return (
    <Suspense fallback="Loading...">
      <div>{me.url}</div>
    </Suspense>
  )
}
```

---

**What's the difference between controlled and uncontrolled component?**

It's about form inputs. When it's controlled, it means that the input updates/value is stored somewhere in the state. Uncontrolled means that DOM handles the updates (it's the default one, but not recommended). You can retrieve the value from an uncontrolled component via ref.

---

**How to utilize a `useContext` hook to make it act like a Redux store?**

Create a Context and Provider:

```
export const TransactionProductListContext = React.createContext<{
	dispatch: React.Dispatch<TransactionProductListAction>;
	productList: ITransactionProductListState;
}>({ productList: initialState, dispatch: () => {} });

export const TransactionProductListContextProvider: React.FC = props => {
	const [productList, dispatch] = React.useReducer<
		ProductListReducer,
		ITransactionProductListState
	>(productListReducer, initialState, () => initialState);

	return (
		<TransactionProductListContext.Provider
			value={{
				dispatch,
				productList,
			}}
		>
			{props.children}
		</TransactionProductListContext.Provider>
	);
};
```

Wrap a subtree where you want to access the Context with the Provider component:

```
<TransactionProductListContextProvider>
  <AddTransactionForm />
</TransactionProductListContextProvider>
```

And use it like this anywhere down in the Provider subtree:

```
const { dispatch, productList } = React.useContext(
  TransactionProductListContext,
);
```

---

**What's `useImperativeHandle` for?**

It's kind of a way to customize refs when forwarding them.

```
function _FancyInput(props, ref) {
  const inputRef = useRef();
  React.useImperativeHandle(ref, () => ({
    focusIfNeeded() {
      if (condition) {
        inputRef.current.focus();
      }
    }
  }));
}

FancyInput = React.forwardRef(_FancyInput);
```

Usage:

```
const App = () => {
  const fancyInput = React.useRef();
  return (
    <FancyInput ref={FancyInputRef} />
  )
}
```

---

**Where to put a `setupTests` file?**

Add a file in `/src`.

---

**How to alter a console.error in tests?**

```
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

const originalError = console.error;
beforeAll(() => {
	console.error = (...args: any[]) => {
		if (/Warning.*not wrapped in act/.test(args[0])) {
			return;
		}
		originalError.call(console, ...args);
	};
});

afterAll(() => {
	console.error = originalError;
});
```

---

**How to test components that fetch data within `act`?**

It's not possible to avoid the 'act' warning right now.

This [PR](https://github.com/facebook/react/pull/14853) needs to be resolved.

---

**How to proxy requests in development?**

Add the following line in package.json
`"proxy": "http://localhost:4000",`

---

**How is `useState` different from `useRef`?**

Let's set we have an input, and it's value is being controlled by useState.

```
function Form(props) {
  const [name, setName] = React.useState("");
  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)}
    </form>
  )
}
```

After the onChange handler is fired, the `name` state is not changed immediately. In given render props and state is immutable. The update is scheduled for a next render.

In this case, the input value is controlled by useRef.

```
function Form(props) {
  const name = React.useRef("");
  return (
    <form>
      <input
        value={name.current}
        onChange={e => (name.current = e.target.value )}
      />
    </form>
  )
}
```

After the onChange handler is fired, component is not rerendered. React doesn't register any changes. Values stored in `.current` are treated like instance variables.

In any further update, React reads the latest ref value and makes it frozen for reads until the subsequent update happens.

---

**How to read previous state/props/value in the hooks world?**

```
function Form() {
  const [name, setName] = React.useState("");
  const previousName = React.useRef(null);

  React.useEffect(() => {
    previousName.current = name;
  });

  return (
    <form>
      <input value={value} onChange={e => setName(e.target.value)} />
    </form>
  );
}
```

1. First render
   `name` = ""
   `previousName.current` = null

- useEffect:
  `name` = "" (DISPLAYED IN THIS RENDER)
  `previousName.current` = "" (DISPLAYED IN THIS RENDER)
- change event (changing state):
  `name` = ""
  `previousName.current` = ""

2. Second render
   `name` = "e" (DISPLAYED IN THIS RENDER)
   `previousName.current` = "" (DISPLAYED IN THIS RENDER)

- useEffect
  `name` = "e"
  `previousName.current` = "e"
- change event (changing state):
  `name` = "e"
  `previousName.current` = "e"

3. Third render
   `name` = "ef" (DISPLAYED IN THIS RENDER)
   `previousName.current` = "e" (DISPLAYED IN THIS RENDER)

- useEffect
  `name` = "ef"
  `previousName.current` = "ef"

```
function usePrevious(value) {
  const previousValue = React.useRef(null);
  React.useEffect(() => {
    previousValue.current = value;
  })
  return previousValue.current;
}
```

---

**How to create helpers for testing purposes in react-testin-library?**

Declare most common actions like changing input value, submitting form, getting a reference to particular elements to make code more readable.

```
function renderApp(props) {
  const utils = render(<App {...props} />);

  const usernameInput = () => utils.queryByLabelText('Username');
  const submitButton = () => utils.queryByText('Find', {selector: 'button'});

  const infoText = () => utils.queryByText(/INFO:/i);
  const results = () => utils.queryByTestId('result');
  const error = () => utils.queryByText(/error:/i);
  const loadingText = () => utils.queryByText(/loading.../i);

  return {
    ...utils,
    usernameInput,
    submitButton,
    infoText,
    loadingText,
    results,
    error,
    changeUsername: value =>
      fireEvent.change(usernameInput(), {target: {value}}),
    submitForm: () => fireEvent.click(submitButton()),
  };
}
```

---

**How does React compare objects passed to deps array?**

If an object is passed to deps array, React doesn't perform a shallow (or deep) equality check. It does perform strict `===` equality, so probably every time the reference to an object will be different, which fails the check and causes an effect to re-run after each render.

---

**How to directly test a hook function?**

Use [react-hook-testing-library](https://www.npmjs.com/package/react-hooks-testing-library).

```javascript
import { renderHook, act } from "react-hooks-testing-library";

it("allows to zoomIn", () => {
  const { result } = renderHook(() => useImageZoomStyle());
  expect(result.current[0]).toEqual({ transform: "scale(1)" });
  act(() => result.current[1].zoomIn());
  expect(result.current[0]).toEqual({ transform: "scale(2)" });
});
```

---

**What is state-reducer-pattern?**

It enables an API for people who want to make a change for how a component/hook updates state internally.
Inversion of control principle is applied here, which adds a control back to the developer USING a function.

The basic principle is to add an ability to pass a custom reducer function which is used AFTER a component/hook makes it's own state update to override changes.

```
const [zoomLevel, dispatch] = React.useReducer<ZoomReducer, ZoomState>(
  (state, action) => {
    const changes = zoomReducer(state, action); // zoomReducer is a reducer provided by the hook
    return reducer(state, { action, changes, options }); // reducer is a custom reducer used to override changes
  },
  options.minZoomLevel,
  () => options.minZoomLevel
);
```

Developer using a custom reducer function is able to access current state, an action being processed, changes made by the proper reducer and some options (optional).

---

**What's a React Portal?**

It's a way to render a children into a DOM node outside of the parent node hierarchy.

---

**What's the syntax for React portals?**

React children and container are the arguments.
You should return the createPortal call.

```jsx
return ReactDOM.createPortal(<div>xxx</div>, document.querySelector("#modal"));
```

---

**React portal modal example**

```html
  <div id="root"></div>
  <div id="modal-root"</div>
```

```jsx
const rootElement = document.getElementById("root");
const modalRootElement = document.getElementById("modal-root");

function Modal() {
  return ReactDOM.createPortal(<div>modal</div>, modalRootElement);
}

function App() {
  const [isModalShown, setIsModalShown] = React.useState(false);

  return (
    <div>
      <button onClick={() => setIsModalShown(v => !v)}>Show modal</button>
      {isModalShown && <Modal />}
    </div>
  );
}

ReactDOM.render(<App />, rootElement);
```

---

**How to publish a React Typescript library with TSDX?**

[tutorial](https://imgur.com/rNlQJuT)

---

**Webpack dev server doesn't redirect /login to react-router-dom**

```js
  devServer: {
    // ...
    historyApiFallback: true,
    contentBase: "./"
    // ...
  }
```

---

**Composable components**

[1](https://www.freecodecamp.org/news/introducing-the-single-element-pattern-dfbd2c295c5d/)
[2](https://gist.github.com/ryanflorence/e5c794e6093d16a69fa88d2112a292f7)
[3](https://www.youtube.com/watch?v=kqh4lz2Lkzs)
[4](https://dev.to/selbekk/the-10-component-commandments-2a7f#articles-list)

---

**React app starting point**

- Wrap your entire app in `<React.StrictMode />` component.
- Use `import()` in routes.

---

**Redirect to a path if no routes matched**

Remember not to share history between many `Router` instances.

```jsx
<Router history={history}>
  <Switch>
    <Route path="/logout">
      <Logout />
    </Route>
    <Route path="/dashboard">
      <Link to="/logout">Logout</Link>
    </Route>
    <Redirect to="/dashboard"></Redirect>
  </Switch>
</Router>
```

---

**An easy approach to authentication in React**

[0](https://kentcdodds.com/blog/authentication-in-react-applications)

---

**Create custom render function in @testing-library/react**

Create a `test-utils.js` file.
That's the place to import @t-l/r from instead of npm package.

```jsx
import { render } from "@testing-library/react";
import { ThemeProvider } from "my-ui-lib";
import { TranslationProvider } from "my-i18n-lib";
import defaultStrings from "i18n/en-x-default";

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme="light">
      <TranslationProvider messages={defaultStrings}>
        {children}
      </TranslationProvider>
    </ThemeProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
```

[0](https://testing-library.com/docs/react-testing-library/setup#add-custom-queries)

---

**Create custom query in @testing-library/react**

Create a `custom-queries.js` file.
That's the place to import @t-l/r from instead of npm package.

```jsx
import { queryHelpers, buildQueries } from "@testing-library/react";

// The queryAllByAttribute is a shortcut for attribute-based matchers
// You can also use document.querySelector or a combination of existing
// testing library utilities to find matching nodes for your query
const queryAllByDataCy = (...args) =>
  queryHelpers.queryAllByAttribute("data-cy", ...args);

const getMultipleError = (c, dataCyValue) =>
  `Found multiple elements with the data-cy attribute of: ${dataCyValue}`;
const getMissingError = (c, dataCyValue) =>
  `Unable to find an element with the data-cy attribute of: ${dataCyValue}`;

const [
  queryByDataCy,
  getAllByDataCy,
  getByDataCy,
  findAllByDataCy,
  findByDataCy
] = buildQueries(queryAllByDataCy, getMultipleError, getMissingError);

export {
  queryByDataCy,
  queryAllByDataCy,
  getByDataCy,
  getAllByDataCy,
  findAllByDataCy,
  findByDataCy
};
```

[0](https://testing-library.com/docs/react-testing-library/setup#add-custom-queries)

---

**Load an env file by webpack**

When it comes to process.env variables, browsers behave unlike node runtime.
We don't have any `process` variable available in them.
What webpack does, is simple substitution.
If looks for `process.env.*` declarations throughout your project, and replaces it by respective values.
How does it access these values?

The manual way is to use standard `dotenv` package.

Inside your webpack.config.js file:

```js
// get plain JS object representing the env variables
const envVariables = dotenv.config({ path: ".env-frontend" }).parsed;

// convert it from { API_URL: "http://localhost:3333" } to { "process.env.API_URL": "http://localhost:3333" }
// so it is substitutable
const envKeys = Object.entries(envVariables).reduce(
  (result, [key, value]) => ({
    ...result,
    [`process.env.${key}`]: JSON.stringify(value)
  }),
  {}
);

// Define plugin creates the global, substitutable constants at compile time
plugins: [new webpack.DefinePlugin(envKeys)];
```

Or, you can use `dotenv-webpack`, which performs these manual steps automatically.

```js
const Dotenv = require("dotenv-webpack");

plugins: [new Dotenv({ path: ".env-frontend" })];
```

Warning: `./.env-frontend` path may not work, use `.env-frontend` instead.

---

**Add a dynamic import chunk name**

```jsx
const AuthenticatedApp = React.lazy(() =>
  import(/* webpackChunkName: "authenticated-app" */ "./AuthenticatedApp")
);
```

---

**Plain HTML5 password confirmation validation**

```tsx
export const RegistrationWindow: React.FC = () => {
  const [password, setPassword] = React.useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState<
    string
  >("");

  return (
    <form className="mb-4 md:flex md:flex-wrap md:justify-between">
      <label className="field-label" htmlFor="password">
        Password
      </label>
      <input
        name="password"
        id="password"
        placeholder="********"
        autoComplete="new-password"
        title="Password should contain at least 6 characters."
        value={password}
        onChange={event => setPassword(event.target.value)}
        type="password"
        required
        pattern=".{6,}"
      />
      <label className="field-label" htmlFor="password-confirmation">
        Repeat password
      </label>
      <input
        type="password"
        name="password-confirmation"
        id="password-confirmation"
        pattern={password}
        title="Passwords have to be equal"
        value={passwordConfirmation}
        onChange={event => setPasswordConfirmation(event.target.value)}
        required
      />
    </form>
  );
};
```

---

**React hidden prop**

It allows to hide host elements.

```jsx
function App() {
  const [on, setOn] = React.useState(false);

  return (
    <div className="App">
      <h1 hidden={!on}>Hello CodeSandbox</h1>
      <button onClick={() => setOn(on => !on)}>Toggle</button>
    </div>
  );
}
```

---

**Enter/leave list item transition with react-spring**

```jsx
export const Notifications = () => {
  const notifications = useNotificationState();

  const transitions = useTransition(
    notifications,
    notification => notification.id,
    {
      from: { opacity: 0, right: -50, position: "relative" },
      enter: { opacity: 1, right: 0 },
      leave: { opacity: 0, right: -50 }
    }
  );

  return (
    <div className="fixed bottom-0 right-0 m-2">
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <NotificationItem {...item}>{item.message}</NotificationItem>
        </animated.div>
      ))}
    </div>
  );
};
```

---

**Drag and drop example**

```jsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initial = ["a", "b", "c"];

const reorder = (list, fromIndex, toIndex) => {
  // Let's say, given elements 1 - 2 - 3, we want to move the first element to the end of the list.
  // So the movement is like follows:
  // from index 0 -> to index 2

  // New array is created to avoid mutatoins
  const result = Array.from(list);

  // Remove the item that was dnd'd from the result array by start index
  const [removed] = result.splice(fromIndex, 1);

  // Insert the removed element at the end index
  result.splice(toIndex, 0, removed);

  return result;
};

function QuoteApp() {
  const [quotes, setQuotes] = useState(initial);

  function onDragEnd(result) {
    // If element is dragged out of the droppable space
    if (!result.destination) {
      return;
    }

    // If elements stay intact
    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedQuotes = reorder(
      quotes,
      result.source.index,
      result.destination.index
    );

    setQuotes(reorderedQuotes);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {quotes.map((quote, index) => (
              <Draggable key={quote} draggableId={quote} index={index}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {quote}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<QuoteApp />, rootElement);
```

[minimal example](https://codesandbox.io/s/using-react-beautiful-dnd-with-hooks-efc6q)

---

**Creating/deriving state from props**

Deriving state from props is generally not a good idea.

Imagine the following scenario:

```jsx
function App() {
  const [item, setItem] = React.useState();

  // Imagine the item is coming from an API
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setItem({ id: 1, name: "I declare bankrupcy!" });
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return <Input {...item} />;
}

function Input(props) {
  console.log(props);
  const [newName, setNewName] = React.useState(props.name);
  return (
    <input value={newName} onChange={event => setNewName(event.target.value)} />
  );
}
```

The problem is `name` is `undefined` in the first render.
Which means that once `newName` has been initialized from `props.name` with the value of `undefied`, it cannot be reinitialized (just like class constructor).
So after 1000ms, when `props.name` has value `"I declare bankrupcy"`, the input still doesn't display any value.

This behaviour is similar in classes, and `getDerivedStateFromProps` was made to facilitate resolving it.

So how to fix it?

One think that came to my mind was adding a `useEffect` in `<Input />`:

```jsx
function Input(props) {
  const [newName, setNewName] = React.useState(props.name);

  // Update the `newName` piece of state whenever `props.name` changes.
  React.useEffect(() => {
    setNewName(props.name);
  }, [props.name]);

  return (
    <input value={newName} onChange={event => setNewName(event.target.value)} />
  );
}
```

This solution has two caveats:

1. React throws a warning that the `<input />` is changing from an uncontrolled to controlled.
2. Whenever we make local updates to the `newName` (e.g by `onChange` event), effect would override them.

It all boils down to no single source of truth.

Next idea:

Don't render `<Input />` unless there's `item !== undefined`.

```jsx
function App() {
  const [item, setItem] = React.useState();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setItem({ id: 1, name: "I declare bankrupcy!" });
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return <>{item ? <Input {...item} /> : "Loading..."}</>;
}
```

Ok, the input value is populated correctly. but... let's say we want to apply an optimistic update to the `item` piece of state on submit.

```jsx
function App() {
  const [item, setItem] = React.useState();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setItem({ id: 1, name: "I declare bankrupcy!" });
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return <>{item ? <Input {...item} setItem={setItem} /> : "Loading..."}</>;
}

function Input(props) {
  const [newName, setNewName] = React.useState(props.name);

  return (
    <form
      onSubmit={event => {
        console.log("Submitting");
        event.preventDefault();

        if (props.name !== newName) {
          props.setItem({ id: props.id, name: newName });
        }
      }}
    >
      <input
        value={newName}
        onChange={event => setNewName(event.target.value)}
      />
    </form>
  );
}
```

It seems kinda fine, we type if some `newName`, we update the item in the parent coponent, but...
Let's say we want to add an interrupt button which sets item name in the parent component to some fixed value.

```jsx
function Input(props) {
  const [newName, setNewName] = React.useState(props.name);

  return (
    <form
      onSubmit={event => {
        console.log("Submitting");
        event.preventDefault();

        if (props.name !== newName) {
          props.setItem({ id: props.id, name: newName });
        }
      }}
    >
      <input
        value={newName}
        onChange={event => setNewName(event.target.value)}
      />
      <button onClick={() => setItem({ id: props.id, name: "WHATSUPPP" })}>
        Interupt
      </button>
    </form>
  );
}
```

The input value doesn't get updated.
What to do about it?

The thing is that in this case props get updated, but local state doesn't.
They are out of sync.

The solution might be to recreate the <Input /> component whenever name changes (instead of updating it).

```jsx
function App() {
  const [item, setItem] = React.useState();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setItem({ id: 1, name: "I declare bankrupcy!" });
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {item ? (
        <Input key={item.name} {...item} setItem={setItem} />
      ) : (
        "Loading..."
      )}
    </>
  );
}
```

[1](https://codesandbox.io/s/competent-northcutt-3id16)

---

**Optimistic update**

Let's say you have a list of items fetch from the API.
You render a form for each item allowing you to change the name.

Instead of: GET items -> PATCH item -> GET items

You do: GET items -> PATCH item -> modify the items array with the result of patch

[1](https://docs.react-async.com/guide/optimistic-updates)

---

**Scripts may not close windows that were not opened by script**

Let's say you have the following code:

```
const [isOpen, setIsOpen] = React.useState(false);

const open = () => setIsOpen(true);
const close = () => setIsOpen(false);
```

If you try to invoke `close`, the error from above will appear, because browser thinks you're calling the native `close()`, which closes the window.

---

**What's getDerivedStateFromProps for**

It's a mechanism to update an internal state as the result of change in props.
Should be used sparingly, because it can lead to subtle bugs.

---

**What can you pass to a React.Fragment?**

`key`s, but only using the `<React.Fragment key={item.id}>` syntax.

---

**React accessibility (a11y) audit**

[0](https://web.dev/accessibility-auditing-react/)
[1](https://github.com/dequelabs/react-axe)
[2](https://github.com/evcohen/eslint-plugin-jsx-a11y)

---

**Error boundary example**

```tsx
class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1 className="mt-10 text-center">Something went wrong :(</h1>
          <div className="flex justify-center mt-4 items-baseline">
            Try to
            <button
              onClick={() => window.location.reload(true)}
              type="button"
              className="btn btn-blue mx-2 p-1"
            >
              refresh
            </button>
            the page
          </div>
        </>
      );
    }

    return this.props.children;
  }
}
```

---

**A component is changing an uncontrolled input to be controlled**

It may be the following case where `registrationEmail: string | undefined`,
and the value turned out to be undefined.

It means that there's no default value (it's `undefined`), so component is left uncontrolled. And when `setEmail` is invoked, it switches to controlled.

```jsx
const [email, setEmail] = React.useState(registrationEmail);
```

Solution:

```jsx
const [email, setEmail] = React.useState(registrationEmail ?? "");
```

---

**Block a route transition or closing window with a native dialog**

[0](https://reacttraining.com/react-router/core/api/Prompt)

---

**Count children passed to a component**

```js
const childrenCount = React.Children.map(props.children, a => a).length;

// or rather

const childrenCount = React.Children.count(children);
```

---
