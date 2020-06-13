**What's a web worker?**

It's a JavaScript file that runs on a thread that's separate from your app's thread.
It doesn't block the app's thread.

It doesn't have DOM access, but it has a way to access the network.

---

**How many web workers can a page spin up**

An app can have many web workers.

There's no actual guarantee that when you spin up `n` web workers, there will be `n` threads.
Due to security reasons, possible DOS attack surface.
With an exception for 1 web worker.

---

**What are use cases for web workers?**

- doing some heavy calculations in the background in a non-blocking way
- doing some pings/healthchecks

---

**What are the types of web workers?**

dedicated worker - a web worker for a page, killed after closing the tab
shared worker - a web worker that can communicate with more than 1 page (limited due to browser implementations)

---

**What's a difference between service and web worker?**

Service workers can survive after a tab is closed.

---

**How to create a web worker?**

```js
const worker = new Worker("/js/worker.js");
```

```js
// /js/worker.js

console.log("Hello from the web worker!"); // anything can go in the worker's file
```

Once it's instantiated, it gets executed immediately.

---
