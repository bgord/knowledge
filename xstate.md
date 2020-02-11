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

**Invoke a promise when in certain state**

```js
import { Machine, assign } from "xstate";

const autorefreshMachine = Machine({
  id: "form",
  initial: "pending",
  context: {
    data: null,
    error: null
  },
  states: {
    pending: {
      invoke: {
        id: "refreshRequest",
        src: handleRequest,
        onDone: {
          target: "success"
          actions: assign({
            data: 'Up to date!'
          })
        },
        onError: {
          target: "error",
          actions: assign({
            error: "Something went wrong"
          })
        }
      }
    },
    success: {
      after: {
        2000: "pending"
      }
    },
    error: {
      after: {
        2000: "pending"
      }
    }
  }
});
```

---

**Delayed automatic transition**

```js
import { Machine } from "xstate";

const autorefreshMachine = Machine({
  id: "form",
  initial: "active",
  states: {
    active: {
      after: {
        500: "inactive"
      }
    },
    inactive: {
      after: {
        500: "active"
      }
    }
  }
});
```

---

**Internal transition**

```js
const autorefreshMachine = Machine({
  id: "form",
  initial: "active",
  states: {
    idle: {
      initial: "valid",
      states: {
        valid: {},
        invalid: {
          CLOSE_ERROR: ".valid" // doesn't enter the main state node, and goes to the `valid` substate
        }
      }
    },
    pending: {}
  }
});
```

---

**What's an actor in xstate?**

It's kind of a child state machine that can receive/send/process messages.

---
