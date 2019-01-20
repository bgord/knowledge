**Standard JavaScript imports**
```
// tsconfig
"allowSyntheticDefaultImports": true
```
Don't write `import * as React from "react";`, do `import React from "react";` instead

---

**Assigning primitive values to a single variables**

```
const value: number = 5;
const isTyped: boolean = false;
const name: string = "Bartek";
```

---

**What's a union-type?**

Used when a variable can be one of couple of types/literals.

`const type = 'increment' | 'decrement' | 'reset';`

Also useful when a value can be e.g a string or null.

`const payload = string | null;`

---
