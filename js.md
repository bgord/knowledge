**RegExp for digits**

`/\d/`

add `+` to allows only positives

---

**Assert any primitive value**

`expect.any(Number)`

---

**Jest find element by prop value**

`expect(wrapper.find({ label: 'Address line 2' }).prop('content')).toEqual("xxx");`

---

**Jest find if element with given prop doesn't exists**

`expect(wrapper.find({ label: 'Address line 3' }).length).toEqual(0);`

---

**`\s` in RegExp**

Space

---

**Plus `+` in RegExp**

`/\s\+/`

- one or more preceding expression (s for spaces)

---

**Asterisk `*` in RegExp**

`/\s\*/`

- zero or more preceding expression (s for spaces)

---

**Jest shorter operators**

- `toBe(true) => toBeTruthy()`

---

**Computed object property performance**


`b['aaa']` is slower than `b.aaa`

---

**Import a function to spyOn**

```
import * as mockThunk from "./mockThunk";
spyOn(mockThunk, "thunkRealName")
```

---
