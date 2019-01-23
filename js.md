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

**Sparse array destructuring**

If you're not interested in e.g two first values, and want to grab the third.

`const [, , given] = getKeys();`

---

**Assert if function throws an error**

`expect(() => someFunc()).toThrowError(new Error("Some error"))`

---

**Event Bubbling & Propagation**

Given scenario below, when the user click on the `p` tag, the event "drills" down to the `p` tag (html => body => div => p) and fires its onlick handler. Then, it "goes up" the same way, and fires all the handlers that he meets (div => body => html). This mechanism is called event bubbling.

There're 3 phases:

- capturing, when the event goes down
- target, the event reached the target element
- bubbling, event goes up from the element

We can e.g call `event.stopPropagation()` on `p` tag to avoid calling `div` (and all upper elements') handlers (vertical propagation).

If element has more than one event handler of the same type, we can call `stopImmediatePropagation()`.

```
<body>
  <div onclick="alert('div');">
    <p onclick="alert('p')">xxx</p>
  </div>
</body>
```

---

**Merging in Ramda**

```
const first = {
  name: "bartek",
  country: {
    name: "Poland",
    abbr: "PL"
  }
};

const second = {
  name: "bartek",
  country: {
    name: "Australia",
    abbr: "AU"
  }
};

R.mergeDeepLeft(first, second); // take the LEFT object and apply it on top of the right
R.mergeDeepRight(first, second); // take the RIGHT object and apply it on top of the left
```

---

**parameters vs arguments**

Parameter is a variable in function definition.
Argument is a data passed to a called function to parameter.

---
