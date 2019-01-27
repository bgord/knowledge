# Roadmap for 2019

## React (13/32)
- How to use axe to improve a11y?
- `useEffect` vs `useLayoutEffect`.
- How to create a universal fetcher with `useEffect` hook?
- How to test a components with useEffect (data fetcher)?
- How to utilize a `useContext` hook to make it act like a Redux store? Context workflow.
- How to use refs in React? Explore `useRef` hook in detail.
- How to use `memo`?
- What's `useCallback` useful for?
- What's `useMemo` useful for?
- What's `useImperativeHandle` for?
- How to setup ESLint for hooks?
- Finite state machines, and their usage in UI workflows.
- What's a Strict Mode?
- What is JSX pragma?
- What's a compound component pattern?
- How to setup redux-observable?
- Is it possible to create a higher order reducer?
- What's the difference between controlled and uncontrolled component?
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


## TypeScript (21/37)
- How to type React input focus events?
- How to type React select/checkbox events?
- How to get keys of interface/type?
- How TS works for spread/rest operator?
- A types for a value that is null or a number?
- How to achieve NotNullable type?
- What's a discriminated union?
- Default types for generics.
- Function type overloads.
- What's a synthetic import?
- How to deal with mutually exclusive types in intersections?
- How to use Pick?
- How to use Exclude?
- How to use `readonly` and `const` keywords?
- What is 'never' in TS?
- What is `d.ts` file for?
- How to setup a TS for Node?
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

## GIT (19/30)
- What does setting upstream in `git push` do?
- How to rebase? What is `git rebase -i` useful for?
- How to diff two files in different commits?
- What to do when branches have diverged?
- What does `git pull --rebase` do?
- What are `git submodules`? What are they useful for?
- What's a `..` operator in git log?
- What is a `...` operator in `git diff`?
- What is a `...` operator in `git log`?
- How to obtain useful logs with `git log`?
- How to remove a file from all the git history?
- What do all the options in `git add -i` mean?
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

## Docker (9/17)
- How to create a subnet and setup a custom local domain?
- How does docker-compose work?
- How to setup a MongoDB container?
- How to access a DB inside the container on the host machine?
- How to access a DB inside another container?
- How to retain MongoDB database in the container?
- How to backup MongoDB in the container?
- A `docker-compose.yml` file for the express/MongoDB setup.
- ~~Setup a container for node~~
- ~~Make the ports available from the host~~
- ~~Setup an env variable~~
- ~~How to create a custom domain for local development?~~
- ~~How to bind a volume to a container?~~
- ~~What's the difference between `expose` and `publish` mechanisms?~~
- ~~How to display all port related mappings for the container?~~
- ~~How to access shell inside a container?~~
- ~~How to create a `npm.sh` script to run npm inside a container?~~

## UNIX (6/16)
- What does `$@` command mean?
- What's a reverse proxy?
- How to setup a reverse proxy?
- What is the purpose of nginx?
- How to select a value from path in `jq`?
- How to set a value for path in `jq`?
- How to retrieve a data from the n-th column and the n-th row from the CSV file?
- How to change a data from the n-th column and the n-th row from the CSV file?
- How to sum numbers from the n-th column from the CSV file?
- How to add arguments for a Makefile script?
- ~~How to live-preview a file in the terminal? (tail)~~
- ~~How to deal with the Sketch file on Linux?~~
- ~~How to create mappings with the `Alt` key?~~
- ~~How to unzip a file to directory?~~
- ~~What does `408` HTTP status mean?~~
- ~~What is the `tee` command?~~

## Vim (2/7)
- What is an buffer, exactly?
- How to run a line through an external program?
- What are the sentence, paragraph, section text objects?
- How to fold functions and other blocks of code?
- How to work with marks efficiently?
- ~~How to reselect last visual selection?~~
- ~~How to go to the beginning/end of the selection?~~

## CSS (9/25)
- ~~How to use `&:first-child` and `& :first-child` properly?~~
- What are mixes in BEM?
- How does @font-face work?
- What's a specificity and how to count it?
- What does \# mean in the SCSS?
- What is a mixin and function in SCSS?
- How to write a conditional in SCSS?
- How to write a loop in SCSS?
- In depth relative vs absolute comparison.
- In depth sticky vs fixed comparison.
- What are typography best practices?
- What is `inline-flex` useful for?
- What is `inline-grid` useful for?
- What is `minmax` function in CSS Grid?
- When do `basis, shrinking, and growing` apply? What are the possible values?
- What is `flex/flex-flow`?
- What does `max/min-content` mean in `gtc`?
- ~~Custom properties aka CSS variables.~~
- ~~How to benefit from `:focus-within` psuedoselector?~~
- ~~How to perfectly center a plus inside a circle?~~
- ~~How to automatically truncate text when there's no enough space, and add three dots after it?~~
- ~~Is it good practice to nest a block inside another block in BEM?~~
- ~~What's a deal with namespaces for BEM?~~
- ~~Can I create a modifier for a block?~~
- ~~How to setup stylelint?~~

## JS (5/21)
- In-depth == vs === comparison.
- What is transducer?
- What is a `state reducer pattern`?
- What is a `proxy` in JS? What can it be useful for?
- How to make a property private by using Symbol?
- What's a babel macro?
- What's a mutation observer?
- What's an intersection observer?
- Arrow function vs Regular function.
- Function definition vs function declaration.
- How is Map different from object?
- What are use cases for Set?
- How to find an AST name of some part of the language?
- What's a factory design pattern?
- What's a symbol and what're it's advantages?
- What's a tree-shaking and how does it work?
- How to use placeholders (R.\_) in Ramda?
- ~~How to destructure only n-th value from the array?~~
- ~~How to assert if function throws an error?~~
- ~~How does event bubbling work? How to stop the propagation?~~
- ~~What is the difference between mergeDeepLeft and mergeDeepRight in Ramda?~~
- ~~Arguments vs parameters.~~

## English (0/5)
- Explore "0 conditional".
- Explore "1st conditional".
- Explore "2nd conditional".
- Explore "3rd conditional".
- Explore "mixed conditional".

# Polish words (0/1)
- kurtuazyjny
- tutti frutti

# HTML (0/2)
- Choosing between `section` vs `div`.
- What are the most common aria-\* attributes?

# Writing (1/1)
- ~~When to use m-dash vs n-dash vs hyphen?~~

## Observables (0/3)
- What exactly is the stream?
- How to create streams?
- What are the basic operators?

## GraphQL (0/1)
- How to setup GraphQL along the Node & MongoDB?

To refine:
- sed
- awk
- grep
- head
- ssh
- SVG
- Vue
- Storybook
- Figma
- PostgreSQL
- D3.js
- Rust
- Machine learning algorithms
- Bash
- MongoDB
- Firebase
- order
- align-content
- named rows/columns
- template areas
- justify/align-content/place-content
- grid-auto-columns/rows
- grid-auto-flow
- well-done animations
