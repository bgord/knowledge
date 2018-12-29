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

**Margin/space**

- Margin is a space between elements
- Padding is a space inside element - relative to borders

---


**aria**

accessible rich internet applications

---

**aria-live**
- An attribute that is applied to the elements that are likely to change.
- It needs to be included in an initial markup.
- "off" by default, "polite" will wait until the current users finishes its task, "assertive" will notify immediately.

[source](https://bitsofco.de/using-aria-live/?mc_cid=c6889024a8&mc_eid=81c3fc5a13)

---

**aria-label**

`<button aria-label="Close">X</button>`

Provide a label for non-self-descriptive element for screen readers: 

---


**aria-hidden**

`aria-hidden="true/false"`

Hide an element in means of assistive technology

---

**Import a font in CSS**

```
@import 'https://fonts.googleapis.com/css?family=Lato:400,700';

body {
	font-family: 'Lato', sans-serif;
}
```

---

**Flexbox - align-content**

- define an alignment of flex lines within a container
- applied if there's enough space - container's height is bigger than height of all stacked elements


---

**Flex-flow**

`flex-flow: <flex-direction> <flex-wrap>`

---

**Flex**

`flex: <flex-grow> <flex-shrink> <flex-basis>`

- default `flex-grow: 0`
- default `flex-shrink: 1`

---
