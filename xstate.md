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
        SUBMIT: {
          target: "pending"
        },
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

**Keep track of some kind of state**

```js
const switchMachine = Machine({
  id: "switch",
  initial: "off",
  context: {
    switchesCount: 0
  },
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

---

**Perform some action on event**

```js
import { Machine, assign } from "xstate";

const switchMachine = Machine(
  {
    id: "switch",
    initial: "switched_off",
    context: {
      switchesCount: 0
    },
    states: {
      switched_on: {
        on: {
          SWITCH: {
            target: "switched_off",
            actions: ["incrementCount"]
          }
        }
      },
      switched_off: {
        on: {
          SWITCH: {
            target: "switched_on ",
            actions: ["incrementCount"]
          }
        }
      }
    }
  },
  {
    incrementCount: (context, event) =>
      assign({
        switchesCount: context.switchesCount + 1
      })
  }
);
```

---
