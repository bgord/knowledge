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

**Definition list style**

```html
<dl>
  <dt>NIP</dt>
  <dd>{{ NIP }}</dd>
  <dt>Nazwa firmy</dt>
  <dd>{{ name }}</dd>
  <dt>Adres</dt>
  <dd>{{ address }}</dd>
  <dt>Kod pocztowy</dt>
  <dd>{{ zipCode }}</dd>
  <dt>Miasto</dt>
  <dd>{{ cityName }}</dd>
</dl>
```

```css
dl {
  display: grid;
  grid-template: auto / 200px 1fr;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
dt,
dd {
  margin: 0;
}
dt {
  background-color: #eee;
  justify-self: right;
  padding-right: 3rem;
}

p {
  padding-top: 3rem;
}
```

---

**10 digits input pattern**

```
[0-9]{10}
```

---

**URL passed to <a /> tag gets appended to the current page instead of leading to a separate page**

1. Add `http(s)://`.
2. Add `//`: `//some.host.com`

---

**Accessible emojis**

- make it a `<span />`
- use `role="img"`
- use `aria-label="Party emoji"`

```html
<span role="img" aria-label="Party emoji">
  🎉
</span>
```

---

**kbd**

`kbd` element is for the situation when we want to give some input/usage/command instructions.

Example:

```html
<p>To run the script write <kbd>npm run build</kbd>.</p>
```

---

**NIP validation pattern**

```
pattern="[0-9]{10}"
```

---

**Noscript**

It gets executed when the browser doesn't support JS or JS is turned off.

```html
<noscript>
  <p>Turn on JavaScript</p>
</noscript>
```

---

**Data attributes**

You can use `data-*` on any HTML element.

```html
<h2 data-state="out">Header</h2>
```

---

**<output />**

It's a tag where app can display a result of a calculation or a user action.

---

**How to define an SVG?**

`viewBox` describes `min-x`, `min-y`, `width`, and `height` of an SVG viewport.

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"></svg>
```

---

**Audio element usage**

```html
<audio src="example.mp3" controls>
  Your browser doesn't support audio.
</audio>
```

---

**Remove defult HTML <audio /> controls**

Don't put the `controls` attribute on the element.

---

**download attribute in <a />**

<a download="kotek.jpg" href="cat.jpg">
    Download cat pic
</a>

---
