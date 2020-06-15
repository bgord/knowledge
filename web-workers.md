**What's a web worker?**

It's a JavaScript file that runs on a thread that's separate from your app's thread.
It doesn't block the app's thread.

It doesn't have DOM access, but it has a way to access the network.

The data sent between the main and a web worker is copied, not sent by reference, so avoid huge payloads.

---

**How many web workers can a page spin up**

An app can have many web workers.

There's no actual guarantee that when you spin up `n` web workers, there will be `n` threads.
Due to security reasons, possible DOS attack surface.
With an exception for 1 web worker.

---

**What are use cases for web/service workers?**

- doing some heavy calculations in the background in a non-blocking way
- doing some pings/healthchecks

- caching things

---

**What are the types of web workers?**

dedicated worker - a web worker for a page, killed after closing the tab
shared worker - a web worker that can communicate with more than 1 page (limited due to browser implementations)

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

**How to debug/access a web worker in Firefox**

In the `Debugger` -> `Sources` tab, there's gonna be an entry of your web worker besides the `main thread`>

---

**What are worker options?**

```ts
type RequestCredentials = "include" | "omit" | "same-origin";
type WorkerType = "classic" | "module";

interface WorkerOptions {
  credentials?: RequestCredentials;
  name?: string;
  type?: WorkerType;
}
```

---

**How to communicate with a web worker?**

Master -> worker communication

```js
// main.js
const worker = new Worker("worker.js");

worker.addEventListener("message", handleMessage);

function handleMessage(event) {
  console.log(event.data); // { greeting: "Hello there!" }
}

// worker.js

self.postMessage({ greeting: "Hello there!" });
```

Worker -> master communication

```js
// main.js
const worker = new Worker("worker.js");
worker.postMessage("The other way around");

// worker.js

self.onmessage = handleMessage;

function handleMessage(event) {
  console.log(event); // "The other way around"
}
```

---

**Allowing new messages when web worker is running**

When you e.g perform some recurrent calculations in the web worker,
there's no room for another message to be processed,
because the loop is running very tightly.

A trick may be to:

```js
setTimeout(someRecurrentOperation, 0);
```

---

**How to kill a web worker?**

```js
worker.terminate();
```

---

**What's a difference between service and web worker?**

Service workers can survive after a tab is closed.

---

**What's a service worker?**

It's a kind of web worker, which sits between your app the rest of the web.
Every single web request is going to be tunelled through it, if it exists.

An in-browser proxy.

---

**Detect if service workers are supported**

```js
const areServiceWorkersSupported = "serviceWorker" in navigator;
```

---

**How does the service worker path affects which files can it access?**

If you load a service worker from path `/js/sw.js`, it can access files beneth the `/js` path.
So it's advisable to load service workers from `/`, so it can access everything.
It may require some URL rewrite on the server.

---

**How is service worker instance defined?**

It's a unique combination of the service worker file.
If you change a bit (even a comment), it's going to install/wait/activate
another service worker instance.

---

**How many service workers can be active at given time for given page?**

One.

---

**What's the default process of replacing an old service worker with an updated one?**

Let's say we have a service worker running.
We want already have an updated version of the same service worker.
We initiate the new service worker registration.
After it's been installed, it enters the 'waiting' status.
The lifecycle of the old one has to finish (e.g by navigation event),
so the new one can take it's place, and go to the 'active' state.

---

**How to override the default process of replacing an old service worker with an updated one?**

```js
// service worker file

self.skipWaiting();
```

---

**How to listen for an event of changing the service worker?**

```js
navigator.serviceWorker.addEventListener("controllerchange");
```

---

**What does controller mean in context of service workers?**

It means the instance of service worker that's in charge.

---

**How to listen for registration events in service worker?**

```js
self.addEventListener("install");
self.addEventListener("activate");
```

---

**What states can service worker be in?**

- installing
- waiting
- active
- redundant

---

**Offline fallback for react app**

```bash
$ npm i -D workbox-{navigation-preload,routing,strategies,webpack-plugin}
```

```js
// webpack.config.js

const workboxPlugin = require("workbox-webpack-plugin");

plugins: [
  // ...
  new workboxPlugin.InjectManifest({
    swSrc: "./frontend/src/sw",
    swDest: "sw.js",
    mode: "production",
  }),
];
```

```html
<html lang="en">
  <html lang="en">
    <head>
      <title>Hapiline</title>
    </head>

    <body>
      App is offline
    </body>
  </html>
</html>
```

```js
// frontend/src/index.tsx

if (
  "serviceWorker" in navigator &&
  // Comment the line below if you want to
  // use the service worker in development mode.
  // And uncomment the if statements for
  // debugging purposes.
  __ENVIRONMENT__ === "production"
) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((_registration) => {
        // if (__ENVIRONMENT__ === "development") {
        // 	console.log("SW registered: ", _registration);
        // }
      })
      .catch((_registrationError) => {
        // if (__ENVIRONMENT__ === "development") {
        // 	console.log("SW registration error: ", _registrationError);
        // }
      });
  });
}
```

```js
import * as navigationPreload from "workbox-navigation-preload";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { NetworkOnly } from "workbox-strategies";

// This console.log is partially for debugging reasons
// (yes, on producion, the build version isn't really sensitive)
// and it's a good practice to have at least a bit that's
// changing in the service worker file so it get's
// reinstalled properly.
console.log(`SW v${__BUILD_VERSION__}`);

// There's a Workbox build error if `self.__WB_MANIFEST`
// is not present in the SW file.

/* eslint-disable no-unused-expressions */
self.__WB_MANIFEST;

// To skip the `waiting` step in the service worker lifecycle:
// installing -> waiting -> activated -> redundant
self.skipWaiting();

// The name of the entry in the Cache Storage
// in the Application dev tool tab.
const CACHE_NAME = "offline-html";

// This assumes /offline.html is a URL for your self-contained
// (no external images or styles) offline page.
const FALLBACK_HTML_URL = "/offline.html";

// Populate the cache with the offline HTML page when the
// service worker is installed.
self.addEventListener("install", async (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(FALLBACK_HTML_URL))
  );
});

navigationPreload.enable();

const networkOnly = new NetworkOnly();

const navigationHandler = async (params) => {
  try {
    // Attempt a network request.
    return await networkOnly.handle(params);
  } catch (error) {
    // If it fails, return the cached HTML.
    return caches.match(FALLBACK_HTML_URL, {
      cacheName: CACHE_NAME,
    });
  }
};

// Register this strategy to handle all navigations.
registerRoute(new NavigationRoute(navigationHandler));
```

---

**Add manifest.json**

```json
{
  "manifest_version": 2,
  "name": "Hapiline",
  "short_name": "Hapiline - habit tracker",
  "version": "0.8.2",
  "start_url": "http://localhost:3333/",
  "display": "standalone",
  "theme_color": "#1654ff",
  "background_color": "#ecedf1",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/app-icon.png",
      "sizes": "144x144"
    }
  ]
}
```

```html
<head>
  <link rel="manifest" href="/manifest.json" />
</head>
```

---
