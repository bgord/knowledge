**Remove the red border of an empty input value that's required**
```
.form__input:invalid {
  box-shadow: none;
  border: 2px solid #f08080;
  border-radius: 3px;
}

.form__input:placeholder-shown {
  border: 1px solid #ddd;
```
---

**Margin is a space between elements, padding is a space inside element - relative to borders**

---


**aria**
```
accessible rich internet applications
```
---

**aria-live**
```
- An attribute that is applied to the elements that are likely to change.
- It needs to be included in an initial markup.
- "off" by default, "polite" will wait until the current users finishes its task, "assertive" will notify immediately.
```
[source](https://bitsofco.de/using-aria-live/?mc_cid=c6889024a8&mc_eid=81c3fc5a13)

---

**aria-label**
```
Provide a label for non-self-descriptive element for screen readers: 
<button aria-label="Close">X</button>
```
---
