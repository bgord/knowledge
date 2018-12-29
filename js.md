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

**Computed object property performance**


`b['aaa']` is slower than `b.aaa`

---

**Import a function to spyOn**

```
import * as mockThunk from "./mockThunk";
spyOn(mockThunk, "thunkRealName")
```

---

**Fake timers in Jest**

```
jest.useFakeTimers(); // somewhere at the beginning of the test
jest.runAllTimers(); // right before assertions
```

---

**Jest check if element has a class**

`wrapper.find('button').hasClass('is-disable')`

---

**Jest test each**

```javascript
const cases = [[false, undefined], [false, ''], [false, 1], [true, 'text']];
test.each(cases)('should return %s when passing %s', (expected, a) => {
	const result = isNumberValidation(a);
	expect(result).toBe(expected);
});
```

---

**Promise.race trick to show a spinner after x ms**

Pass some promise and a promise that waits for x ms to Promise.race, and if the result is the stuff that promise that waits for x ms returns, then show a spinner

[source](https://www.youtube.com/watch?v=QPDA4QwkJxk)

---
