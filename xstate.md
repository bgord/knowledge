**Basic state definitions**

Every machine has to have an `id` and one `initial` state.

```js
import { Machine } from "xstate";

const formMachine = Machine({
  id: "form",
  initial: "idle",
  states: {
    idle: {},
    editing: {},
    pending: {},
    error: {},
    success: {}
  }
});
```

---

**Transition definitions**

Each transition has to be caused by an event.

```js
import { Machine } from "xstate";

const formMachine = Machine({
  id: "form",
  initial: "idle",
  states: {
    idle: {
      on: {
        START_EDITING: "editing"
      }
    },
    editing: {
      on: {
        SUBMIT: "pending",
        CANCEL: "idle"
      }
    },
    pending: {
      on: {
        SUCCESS: "success",
        ERROR: "error"
      }
    },
    error: {
      on: {
        SUBMIT: "pending",
        CANCEL: "idle"
      }
    },
    success: {}
  }
});
```

---

**Final states**

```js
const switchMachine = Machine({
  id: "switch",
  initial: "off",
  states: {
    on: {
      type: "final"
    },
    off: {
      on: {
        TURN_ON: "on"
      }
    }
  }
});
```
