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

**Margin/padding**

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

**aria-label and a11y**

`<button aria-label="Close">X</button>`

`<a href="twitter.com" aria-label="Follow us on twitter!"><i class="fab fa-twitter" /></a>`

Provide a label for non-self-descriptive element for screen readers in order to make e.g social media icon more accessible.

---

**aria-hidden**

`aria-hidden="true/false"`

Hide an element in means of assistive technology

---

**Import a font in CSS**

```
@import 'https://fonts.googleapis.com/css?family=Lato:400,700'; //css
@import url('https://fonts.googleapis.com/css?family=Lato:400,700'); //scss

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

[x] Anki

`flex-flow: <flex-direction> <flex-wrap>`

---

**Default flex-grow**

[x] Anki

`flex-grow: 0`

---

**Default flex-shrink**

[x] Anki

`flex-shrink: 1`

---

**Flex**

`flex: <flex-grow> <flex-shrink> <flex-basis>`

---

**Camel Case**

`text-transform: capitalize;`

---

**First letter**

`p:first-letter { text-transform: uppercase }`

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

**How to setup Stylelint?**

After installing a Stylelint globally `yarn add global stylelint`,
in the root of the project add the ".stylelintrc" file with an example config of:

```
{
  "rules": {
    "block-no-empty": null,
    "color-no-invalid-hex": true,
    "comment-empty-line-before": [ "always", {
      "ignore": ["stylelint-commands", "after-comment"]
    } ],
    "declaration-colon-space-after": "always",
    "indentation": ["tab", {
      "except": ["value"]
    }],
    "max-empty-lines": 2,
    "rule-empty-line-before": [ "always", {
      "except": ["first-nested"],
      "ignore": ["after-comment"]
    } ],
    "unit-whitelist": ["em", "rem", "%", "s"]
  }
}
```

---

**What's a difference between `&:first-child` and `& :first-child`?**

Given this CSS markup:

```
.list {
  color: red;
  &__item {
    list-style: none;
    &:first-child {
      background: yellow;
    }
    & :first-child {
      background: green;
    }
  }
}
```

The very first child (occurrence) of the `list__item` inside the `list` will have the yellow background.
`list__item:first-child`

The very first child inside the `list__item` will have a green background;
`list__item :first-child`

[codepen](https://codepen.io/anon/pen/PVZvVG)

---

**How to prevent long words from breaking the layout (wrap them)?**

`word-break: break-all;`

---

**Is `::after` pseudo-element treated as an actual element in flexbox?**

Yes, it's being taking into account, when given a following layout:

[---- A ----|---- B ---- |--C--]

C takes a space e.g in the flex-basis.

---

**How to avoid stretching grid items?**

`align-self: start;`

It makes the item stick to the start of the cell it belongs. By default `auto` stretches the item to fill all the available space.

---

**How to avoid a text from wrapping?**

`white-space: nowrap;`

---

**What is `minmax` function in CSS Grid?**

It can be used in `grid-template-*` and `grid-auto-*`. It's a way to set boundaries for a px value. `min/max-content` or `auto` can be used apart from other measurements.

---

**How to setup Tailwind.css?**

`https://www.youtube.com/watch?v=XtNkcHyVQOY`

---

**How to create an overlay effect over the image and its background?**

[codepen](https://codepen.io/bgord/pen/YbEKzd)

---

**How to prevent a flex item from vertical stretching?**

It's usually because of lack of `align-items` (if `flex-direction` equals "row"). The default value is `stretch`.

[codepen](https://codepen.io/bgord/pen/LoOPzq)

---

**How to apply multiple transforms to one element?**

Currently, there's no way to do this [link](https://stackoverflow.com/questions/44139866/set-css-transform-in-multiple-places).

---

**How to set a grid time to span for n?**

`grid-column: span 3;`

---

**How to use grid-template-areas?**

Grid definition:

```
.container {
  display: grid;
  grid-template-columns: 20px 20px;
  grid-template-rows: 20px 20px;
  grid-teamplate-areas:
    "header header"
    "body body";
}
```

Usage:

```
.item {
  grid-area: "header"
}
```

---

**How to zoom in/out an image?**

Increase/decrease the scale.

```
transform: scale(1); // default
```

---

**How to rotate an image?**

Pass a degree to rotate by.

```
transform: rotate(90deg);
```

---

**How to mirror an image L-R?**

```
transform: scale(1, 1); // default
transform: scale(-1, 1); // mirrored
```

---

**How to colour an element based on a data-\* attribute value without JS?**

Let's say `account_status` can be one of `["active", "inactive"]`.

And we have this HTML element we want to style.

```
<span data-account-status={account_status}></span>
```

```css
[data-account-status="active"] {
  color: green;
}

[data-account-status="inactive"] {
  color: red;
}
```

We can also "translate" the statuses:

```css
[data-account-status="active"]::after {
  content: "aktywny";
}

[data-account-status="inactive"]::after {
  content: "nieaktywny";
}
```

---

**How to de-emphasize text?**

- smaller text
- lighter text

A nice trick is to have even smaller, uppercased, semibold text with a bit of wider tracking.

```html
<div class="text-gray-600 text-xs uppercase font-semibold tracking-wide">
  3 beds
</div>
```

---

**What's tracking in typography?**

It's a professional word for `letter-spacing` in CSS.

---

**What's leading in typography?**

It's a professional word for `line-height` in CSS.

---

**Make table expand to some width**

```html
<div>
  <table></table>
</div>
```

```css
div {
  max-width: 500px;
  width: 100%;
}
table {
  width: 100%;
}
```

---

**Make table scrollable**

```html
<div>
  <table></table>
</div>
```

```css
div {
  max-width: 500px;
  width: 100%;
  overflow: scroll;
}
table {
  width: 100%;
}
```

---

**Justify-content space-between without flexbox**

```css
.container {
  text-align: justify;
}

.container:after {
  content: "";
  display: inline-block;
  width: 100%;
}

.item {
  display: inline-block;
}
```

If this trick doesn't work on Gmail, add `float: right;` to the second element.

---

**Align elements to the top of the inline-block container**

```css
vertical-align: top;
```

---

**Class usage order and class definition order**

Let's say you have these two selectors:

```css
.red {
  color: red;
}

.green {
  color: green;
}
```

And there're two possible use cases:

```html
<div class="red green">TEXT</div>
```

```html
<div class="green red">TEXT</div>
```

In result, text will always be green.
What matters is not the usage order, it's definition order.
`.green` was defined after `.red` so it will take precedence.

---

**Adjacent sibling combinator**

Paragraphs that come immediately after image.

```css
img + p {
  font-style: bold;
}
```

---

**Subsequent-sibling combinator**

Represents all pre elements coming (not necessarily immediately) after h1.

```css
h1 ~ pre {
  background: black;
}
```

---

**Data attribute selector**

```html
<article data-columns="3" />

article[data-columns='3'] { width: 400px; }
```

---

**Attribute selector**

```css
// exact match
div[data-state="editing"] {
}

// containing
div[data-state*="editing"] {
}

// starts with
div[data-state^="editing"] {
}

// ends with
div[data-state$="pending"] {
}
```

---

**ch unit**

It doesn't really stand for a `character` unit.
It's rather a width of the "0" character of given font.
So it may vary from font to font, but is constant for fixed-width fonts.

[1](https://meyerweb.com/eric/thoughts/2018/06/28/what-is-the-css-ch-unit/)

---
