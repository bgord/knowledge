**What's a web worker?**

It's a JavaScript file that runs on a thread that's separate from your app's thread.
It doesn't block the app's thread.

-
**How many web workers can a page spin up**

An app can have many web workers.

There's no actual guarantee that when you spin up `n` web workers, there will be `n` threads.
Due to security reasons, possible DOS attack surface.
With an exception for 1 web worker.

---
