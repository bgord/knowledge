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

**Camel Case**

`text-transform: capitalize;`

---

**First letter**

`p:first-letter { text-transform: uppercase }`

---

**Use <details /> tag for accordion**

---

**Centering a plus inside a circle**

Plus is rendered as a "non-capital" character, a bit lower from the middle line, so it's hard to align properly in two axes. There's a "full-width plus" char (U+FF0B), but it's not included in most of the fonts (e.g Open Sans).

[source](https://stackoverflow.com/a/52943578)

---

**Automatically truncating text when there's no space**

```
<span>A veeeeeeeery long sentence</span>

span {
  width: 100px; // set a fixed width
  text-overflow: ellipsis; // truncate a text and add Unicode Range Value - ... - U+2026
  white-space: nowrap;
  overflow: hidden;
}
```

---

**:focus-within**

It's a pseudoselector which if used like below, applies a black background to the form when input (or any of form's children) has been focused.

```
<form>
  <input />
</form>

.wrapper:focus-within {
  background: black;
}
```

---

**Can I add a modifier for the block?**

Yes - [source](https://seesparkbox.com/foundry/bem_by_example).

---

**Is it good practice to nest a block inside a block?**

Yes, but you need to remember to remain modular, so any change in the first block cannot interefe with the second block.

---

**What are the namespaces in BEM?**

Namespaces are prefixes in form of:
- `c-card` for a card _component_
- `l-grid` for a layout of the page (margins/padding/positioning) of component elements

It makes the component independent of the context it's used. There's no need to modify its styles to match every context.

---

---
