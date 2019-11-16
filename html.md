**Anchor with href phone**

`<a href="tel:1-562-867-5309">1-562-867-5309</a>`

---

**Non-standard step in input of type number**

`<input type="number" step="0.01" />`

---

**How to tell a file input to accept only given MIME types?**

```html
<input accept="text/csv, image/png" />
```

---

**A nested ordered list**

[source](https://codepen.io/bgord/pen/YzKdgJp)

---

**Suggest a secure password**

```html
<input
  id="hexId"
  type="password"
  pattern="[0-9a-fA-F]{4,8}"
  title="Enter an ID consisting of 4-8 hexadecimal digits"
  autocomplete="new-password"
/>
```

---

**Consistent min/max length support**

Use `pattern` instead of min/max length.

```html
You can use the pattern attribute. The required attribute is also needed,
otherwise an input field with an empty value will be excluded from constraint
validation.

<input pattern=".{3,}" required title="3 characters minimum" />
<input pattern=".{5,10}" required title="5 to 10 characters" />

If you want to create the option to use the pattern for "empty, or minimum
length", you could do the following:

<input pattern=".{0}|.{5,10}" required title="Either 0 OR (5 to 10 chars)" />
<input pattern=".{0}|.{8,}" required title="Either 0 OR (8 chars minimum)" />
```

[0](https://stackoverflow.com/questions/10281962/is-there-a-minlength-validation-attribute-in-html5)

---

**What are the `dl`/`dt`/`dd` tags?**

`dl` tag means description list.
A term being explain should be wrapped into `dt`, description term.
The description of the term should be wrapped into `dd` tag.

---
