# Roadmap for 2019

## React (17/23)
- How to utilize a `useContext` hook to make it act like a Redux store?
- How to test components that fetch data within `act`?
- How to setup a `xstate` for a basic example? 
- What's `useImperativeHandle` for?
- What's a compound component pattern?
- How to setup redux-observable?
- ~~What's the difference between controlled and uncontrolled component?~~
- ~~How to use an unstable Suspense's `createResource`?~~
- ~~What apart from DOM refs can be stored in `useRef` hook?~~
- ~~What problem does `mdx` solve?~~
- ~~Why not to use memo/PureComponent by default?~~
- ~~What is JSX pragma?~~
- ~~What is `setupFileAfterEnv` in Jest for?~~
- ~~How to use `memo`? How's that different than `useMemo`?~~
- ~~How batching works?~~
- ~~Is setState async?~~
- ~~What's the render and commit phase?~~
- ~~How to set today as a value of a date input?~~
- ~~How to test if given element is/isn't present in the DOM?~~
- ~~How to test if a radio button is selected?~~
- ~~How to test a keyboard tab navigation?~~
- ~~What's a difference between `createElement` vs `cloneElement`~~
- ~~What's a Strict Mode?~~

## TypeScript (5/15)
- How to create an `Omit` function?
- How to create a `Diff` function?
- How to use `NotNullable`?
- What's a discriminated union?
- How to deal with mutually exclusive types in intersections?
- Function type overloads.
- How to use Exclude?
- What's an `unknown` type? How is this different from `any`?
- How to add types for a library?
- ~~What is `d.ts` file for?~~
- ~~What does `extends` mean exactly?~~
- ~~How TS works for rest operator?~~
- ~~What's a synthetic import?~~
- ~~How to use `readonly` and `const` keywords?~~

## GraphQL (8/15)
- What's `Mutation`?
- How to setup Apollo in React?
- How to use Query in React?
- How to write pagination?
- How to use Apollo with hooks?
- How to check if user is authenticated?
- How to nest queries?
- ~~How to use variables in queries?~~
- ~~How to write a resolver that returns a footballer by fullname?~~
- ~~What are the available types for the queries?~~
- ~~Which packages should be used to setup a basic GraphQL server for Node.js?~~
- ~~What's `Query`?~~
- ~~How to set an another port for the server?~~
- ~~How to write a basic resolver?~~
- ~~How to setup a GraphQL playground?~~

## CSS (0/15)
- What is `minmax` function in CSS Grid?
- In depth relative vs absolute comparison.
- How does @font-face work?
- What's a specificity and how to count it?
- What does \# mean in the SCSS?
- What is a mixin and function in SCSS?
- How to write a conditional in SCSS?
- How to write a loop in SCSS?
- In depth sticky vs fixed comparison.
- What are typography best practices?
- What is `inline-flex` useful for?
- What is `inline-grid` useful for?
- When do `basis, shrinking, and growing` apply? What are the possible values?
- What is `flex/flex-flow`?
- What does `max/min-content` mean in `gtc`?

## JS (0/24)
- In-depth == vs === comparison.
- Function definition vs function declaration.
 -How to add a custom validation function?
- How to use link `ref="preload"`?
- What's a mutation observer?
- What's a singleton pattern?
- What is a `state reducer pattern`?
- What is a `proxy` in JS? What can it be useful for?
- How to make a property private by using Symbol?
- What's an intersection observer?
- What is transducer?
- What's a babel macro?
- Arrow function vs Regular function.
- How is Map different from object?
- What are use cases for Set?
- How to find an AST name of some part of the language?
- What's a factory design pattern?
- What's a symbol and what're it's advantages?
- What's a tree-shaking and how does it work?
- How to use placeholders (R.\_) in Ramda?
- How to just intl.number to format quotas?
- What are peer dependencies?
- Why to use `package-lock.json`?

## GIT (0/12)
- How does `git rm` work?
- What to do when branches have diverged?
- How to rebase? What is `git rebase -i` useful for?
- What does `git pull --rebase` do?
- What are `git submodules`? What are they useful for?
- What's a `..` operator in git log?
- What is a `...` operator in `git diff`?
- What is a `...` operator in `git log`?
- How to obtain useful logs with `git log`?
- How to remove a file from all the git history?
- What do all the options in `git add -i` mean?

## Docker (0/8)
- What are ARGs?
- How does docker-compose work?
- How to setup a MongoDB container?
- How to access a DB inside the container on the host machine?
- How to access a DB inside another container?
- How to retain MongoDB database in the container?
- How to backup MongoDB in the container?
- A `docker-compose.yml` file for the express/MongoDB setup.

## UNIX (2/11)
- What is the purpose of nginx?
- What's a reverse proxy?
- How to setup a reverse proxy?
- How to select a value from path in `jq`?
- How to set a value for path in `jq`?
- How to retrieve a data from the n-th column and the n-th row from the CSV file?
- How to change a data from the n-th column and the n-th row from the CSV file?
- How to sum numbers from the n-th column from the CSV file?
- How to add arguments for a Makefile script?
- ~~How to send a file through netcat?~~
- ~~How to search for whole word with `ag`?~~

## Vim (1/5)
- What is an buffer, exactly?
- How to run a line through an external program?
- What are the sentence, paragraph, section text objects?
- How to work with marks efficiently?
- ~~How to fold functions and other blocks of code?~~

## English (0/5)
- Explore "0 conditional".
- Explore "1st conditional".
- Explore "2nd conditional".
- Explore "3rd conditional".
- Explore "mixed conditional".

## HTML (0/4)
- Choosing between `section` vs `div`.
- What are the most common aria-\* attributes?
- How to use a mask for input?
- What's an `importance` in img tags?

## Other (0/3)
- What's a difference between church and a cathedral?
- What's escapism?
- What's a hypernym?

## Bash (0/1)
- How to use brace expansion?

To refine:
- observables
- sed
- awk
- grep
- SVG
- Vue
- PostgreSQL
- D3.js
- Rust
- Machine learning algorithms
- MongoDB
- Firebase
- named rows/columns
- template areas
- justify/align-content/place-content
- grid-auto-columns/rows
- grid-auto-flow
- well-done animations

# DONE - January

## TypeScript - 25
- ~~How to mark one of the native element props required?~~
- ~~How to run TS typechecking in Jest?~~
- ~~What is a strict mode and how to enable it?~~
- ~~How to lint a TS with ESLint?~~
- ~~How to type React input events?~~
- ~~How to type React submit events?~~
- ~~How to type a standard variable with a primitive value?~~
- ~~How to type a function argument/return value?~~
- ~~What's an enum?~~
- ~~What's a union type?~~
- ~~What's a generic type?~~
- ~~What is an `interface`?~~
- ~~What is a `type`?~~
- ~~How to reuse interfaces/types?~~
- ~~What is tuple in TS?~~
- ~~How to extend a interface?~~
- ~~How to partially apply a type to an object?~~
- ~~What is a type guard for?~~
- ~~What are the built-in type guards?~~
- ~~How to create a user-defined type guard?~~
- ~~What's an index signature?~~
- ~~How to type arrays?~~
- ~~How to get prop types of interface?~~
- ~~How to create reusable generics?~~
- ~~What are intersection types?~~

## GIT - 22
- ~~What does setting upstream in `git push` do?~~
- ~~How to diff two files in different commits?~~
- ~~How to ignore already committed file?~~
- ~~How to use `--dry-run` for the most common commands?~~
- ~~What is a `..` operator in `git diff`?~~
- ~~How to add files to the previous commit?~~
- ~~What are the versions of the `git reset` behaviour?~~
- ~~What does `git reset --hard` do?~~
- ~~What does `git reset --mixed` do?~~
- ~~What does `git reset --soft` do?~~
- ~~How to unstage all changes? (`git reset`/`git reset <path>`)~~
- ~~How does cherry-pick work?~~
- ~~How to setup an alias like `g st` - `git status`~~
- ~~How to checkout all files?~~
- ~~What does it exactly mean that branches have diverged?~~
- ~~What does `git revert` do?~~
- ~~How to include untracked files in `git diff`?~~
- ~~What are the three main git areas?~~
- ~~How to delete untracked files with `git clean`?~~
- ~~How to squash commits?~~
- ~~What does `git fetch` do? How is that different from `git pull`?~~
- ~~What is the working tree?~~

## React - 15
- ~~`useEffect` vs `useLayoutEffect`.~~
- ~~How to test a component with lazy loading?~~
- ~~Explore a `useEffect` hook in detail.~~
- ~~How to query for elements in r-t-l?~~
- ~~How to fire events in r-t-l?~~
- ~~How to test a components with useEffect (document title)?~~
- ~~How to access document title etc. in r-t-l?~~
- ~~How to access value of the input in r-t-l?~~
- ~~What happens when a key of the element changes?~~
- ~~Explore `useState` hook in detail.~~
- ~~Explore `useReducer` in detail.~~
- ~~How to setup a TS for React?~~
- ~~How to add types to class/function components?~~
- ~~How to lazy load components with Suspense?~~
- ~~Why user-defined components must be lower-cased in React?~~

## Docker - 11
- ~~Setup a container for node~~
- ~~Make the ports available from the host~~
- ~~Setup an env variable~~
- ~~How to create a custom domain for local development?~~
- ~~How to bind a volume to a container?~~
- ~~What's the difference between `expose` and `publish` mechanisms?~~
- ~~How to display all port related mappings for the container?~~
- ~~How to access shell inside a container?~~
- ~~How to create a `npm.sh` script to run npm inside a container?~~
- ~~How to create a subnet?~~
- ~~How to create a static IP for a container?~~

## CSS - 10
- ~~How to use `&:first-child` and `& :first-child` properly?~~
- What are mixes in BEM?
- ~~Custom properties aka CSS variables.~~
- ~~How to benefit from `:focus-within` psuedoselector?~~
- ~~How to perfectly center a plus inside a circle?~~
- ~~How to automatically truncate text when there's no enough space, and add three dots after it?~~
- ~~Is it good practice to nest a block inside another block in BEM?~~
- ~~What's a deal with namespaces for BEM?~~
- ~~Can I create a modifier for a block?~~
- ~~How to setup stylelint?~~

## UNIX - 7
- ~~What does `$@` command mean?~~
- ~~How to live-preview a file in the terminal? (tail)~~
- ~~How to deal with the Sketch file on Linux?~~
- ~~How to create mappings with the `Alt` key?~~
- ~~How to unzip a file to directory?~~
- ~~What does `408` HTTP status mean?~~
- ~~What is the `tee` command?~~

## JS - 5
- ~~How to destructure only n-th value from the array?~~
- ~~How to assert if function throws an error?~~
- ~~How does event bubbling work? How to stop the propagation?~~
- ~~What is the difference between mergeDeepLeft and mergeDeepRight in Ramda?~~
- ~~Arguments vs parameters.~~

## VIM - 4
- ~~A faster way to delete two lines up/down.~~
- ~~How to reselect last visual selection?~~
- ~~How to go to the beginning/end of the selection?~~
- ~~How to move the current line to the middle of the screen?~~

## Writing - 1
- ~~When to use m-dash vs n-dash vs hyphen?~~

## Storybook 1
- ~~How to setup a basic Storybook for an example component?~~

# DONE - February (36, 28 days, 1,285/day)
  
## React - 10
- ~~How to use error boundaries?~~
- ~~What's `useCallback` useful for?~~
- ~~How to test components that fetch data?~~
- ~~What's `act` in react testing utils for?~~
- ~~How to access refs in the React TypeScript in a safe way and avoid 'Object is possibly null' error?~~
- ~~How and why to forward refs?~~
- ~~How to type React component to allow more than one child?~~
- ~~How to clone all the children and pass props to them?~~
- ~~How to access DOM refs by `useRef`?~~
- ~~Target container is not a DOM element error~~

## TypeScript - 7
- ~~How to get keys of interface/type?~~
- ~~Default types for generics.~~
- ~~What's an exclamation mark for?~~
- ~~A types for a value that is null or a number?~~
- ~~How to get a function return type?~~
- ~~How to use Pick?~~
- ~~What is 'never' in TS?~~

## CSS - 4
- ~~How to prevent long words from breaking the layout (wrap them)?~~
- ~~Is `::after` pseudo-element treated as an actual element in flexbox?~~
- ~~How to avoid stretching grid items?~~
- ~~How to avoid a text from wrapping?~~

## JS - 4
- ~~How to inject dependencies to a module?~~
- ~~How to sort dates properly?~~
- ~~How to make Jest run all the tests and quit?~~
- ~~How to add a custom error message to the input?~~

## GIT - 1
- ~~How to remove edited/removed line from a git hunk that is about to get staged?~~

## UNIX - 6
- ~~What's a purpose of `.PHONY` in Makefiles?~~
- ~~How to extract the tar file?~~
- ~~How to structure a Makefile for containerized react app?~~
- ~~How to move a directory in Ranger?~~
- ~~Why open VPN won't start?~~
- ~~What is a workspace in Manjaro?~~

## VIM - 3
- ~~How to browse recently closed files?~~
- ~~How to allow in-word snippet expansion?~~
- ~~How to make snippet expand only if it's been declared on the beginning of the line?~~

## Bash - 1
- ~~How to use a switch statement on the n-th variable?~~
