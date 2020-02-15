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

**Add metadata to a state node and use it in a component**

```js
const wizardMachine = Machine({
  id: "wizard",
  initial: "editing",
  states: {
    editing: {
      initial: "step_1",
      states: {
        step_1: {
          on: {
            NEXT: "step_2"
          },
          meta: {
            prev: false,
            next: true
          }
        },
        step_2: {
          on: {
            PREV: "step_1",
            NEXT: "#summary"
          }
        },
        meta: {
          prev: true,
          next: true
        }
      }
    },
    summary: {
      id: "summary",
      type: "final",
      meta: {
        text: "Hello!"
      }
    }
  }
});
```

```jsx
const [current, send] = useMachine(wizardMachine);

current.meta.wizard.summary.text; // "Hello!"
current.meta.wizard.step_1.prev; // false
```

---

**What's the actor model?**

It's a formalization of the act of communication between two entities (actors).
Actors communicate by sending messages (xstate events).
An actor (can) have their private state.
It can be shared with the parent machine by sending it as an event.

---

**Where is an actor reference stored in the parent machine?**

In the parent's machine context.

---

**How to spawn an actor?**

```js
import { spawn } from "xstate";

// child - actor - machine
const zoomMachine = Machine({
  id: "zoom",
  initial: "idle",
  context: { zoomLevel: 1 },
  states: {
    idle: {
      ZOOM_IN: {},
      ZOOM_OUT: {},
      RESET: {}
    }
  }
});

// parent machine
const playgroundMachine = Machine({
  id: "playground",
  initial: "idle",
  context: {
    zoomActorRef: undefined
  },
  states: {
    idle: {
      onEntry: assign({
        zoomActorRef: () => spawn(zoomMachine, { name: "zoomActorRef" })
      }),
      on: {
        SELECT: "selected"
      }
    },
    selected: {
      UNSELECT: "idle",
      SELECT: "selected"
    }
  }
});
```

---

**How to access actor's state**

A requirement to make it work is to pass `sync: true` option to the `spawn` function.
Otherwise, you will receive stale date.

```js
zoomActorRef: () => spawn(zoomMachine, { name: "zoomActorRef", sync: true });
```

Then, it's accessible via:

```js
const [current, send] = useMachine(playgroundMachine);

const zoomState = current.context.zoomActorRef.state.context;
```

---

**How to access actor's send function**

```js
const [current, send] = useMachine(playgroundMachine);

const { send: zoomSend } = current.context.zoomActorRef;
```

---

**Send an event to the child actor machine**

```js
import { send } from "xstate";

on: {
  SELECT: {
    target: "selected";
    actions: (context, event) => send("RESET", { to: "zoomActorRef" });
  }
}
```

---
