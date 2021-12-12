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
<span role="img" aria-label="Party emoji"> 🎉 </span>
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
<audio src="example.mp3" controls>Your browser doesn't support audio.</audio>
```

---

**Remove defult HTML <audio /> controls**

Don't put the `controls` attribute on the element.

---

**Download attribute in <a />**

```html
<a download="kotek.jpg" href="cat.jpg"> Download cat pic </a>
```

---

**Lazy loading of images**

```html
<img src="image.png" loading="lazy" alt="…" width="200" height="200" />
```

It's still experimental, and is supported only in major browsers.
[0](https://caniuse.com/#search=loading)

- auto: Default lazy-loading behavior of the browser, which is the same as not including the attribute.
- lazy: Defer loading of the resource until it reaches a calculated distance from the viewport.
- eager: Load the resource immediately, regardless of where it's located on the page.

To implement the lazy loading via `Intersection Observer`, look [here](https://blog.bitsrc.io/lazy-loading-images-using-the-intersection-observer-api-5a913ee226d).

---

**What's a landmark?**

These are landmarks:

```html
<header>This is the header</header>
<nav>This is the nav</nav>
<main>This is the main</main>
<footer>This is the footer</footer>
```

or

```html
<div role="banner">This is the header</div>
<div role="navigation">This is the nav</div>
<div role="main">This is the main</div>
<div role="contentinfo">This is the footer</div>
```

[0](https://dequeuniversity.com/rules/axe/3.0/region)

---

**tabindex**

`tabindex="1"` - sets an explicit tab order (BAD IDEA) because you have to manually manage tab index of each element in the DOM

`tabindex="0"` - makes an uninteractive element be able to receive focus only via keyboard

`tabindex="-1"` - makes an uninteractive element be able to receive focus programatically

[0](https://webaim.org/techniques/keyboard/tabindex)

---

**PWA iOS icon**

Icons from manifest.json file are not supported yet.

```html
<link rel="apple-touch-icon" sizes="180x180" href="icon.png" />
```

---

**srcset and sizes**

```tsx
import React from "react";

export function Logo(props: JSX.IntrinsicElements["img"]) {
  const logo = "logo.png"; // 181px x 50px
  const icon = "logo-icon.png"; // 50px x 50px

  return (
    <img
      alt="Hapiline brand"
      src={logo}
      srcSet={`${logo} 181w, ${icon} 50w`}
      sizes="(max-width: 768px) 50px, 181px"
      {...props}
    />
  );
}
```

---

**picture element**

The `picture` element tries to match a source, if it fails, the default `img` is taken.

```html
<picture>
  <source srcset="full-logo-path.png" media="(min-width: 800px)" />
  <img src="icon-logo-path.png" alt="Hapiline brand" />
</picture>
```

---

**Open Graph meta tags**

These are tags that control how URLs are displayed when shared on social media.

```html
<head>
  <title>Hapiline</title>

  <meta property="og:title" content="Hapiline - a habit tracker" />
  <meta property="og:url" content="https://bgord.tech" />
  <meta
    property="og:description"
    content="A tracker that helps you build habits that stick."
  />
</head>
```

[0](https://ogp.me/)

---

**Twitter OG**

It makes the card look like this:

[image]
[title]
[description]

instead of:

[image][title]
[image][description]

```html
<meta data-react-helmet="true" name="twitter:card" content="summary" />
```

---

**Robots noindex, nofollow**

```html
<meta name="robots" content="none" />
```

---

**Can multiple H1 be used?**

Yes.

---

**Can no H1 be used?**

Yes.

---

**Link prefetching**

It's a browsing mechanism that allows to prefetch a `<link>` resource in browser's idle time.

```html
<link rel="prefetch" href="/images/big.jpeg" />
```

---

**Href lang**

```html
<head>
  <title>Widgets, Inc</title>

  <link
    rel="alternate"
    hreflang="en-gb"
    href="http://en-gb.example.com/page.html"
  />

  <link
    rel="alternate"
    hreflang="en-us"
    href="http://en-us.example.com/page.html"
  />

  <link rel="alternate" hreflang="en" href="http://en.example.com/page.html" />

  <link rel="alternate" hreflang="de" href="http://de.example.com/page.html" />

  <link rel="alternate" hreflang="x-default" href="http://www.example.com/" />
</head>
```

---

**Google and localized content**

```
de: German language content, independent of region
en-GB: English language content, for GB users
de-ES: German language content, for users in Spain
```

---

**Display base64 encoded image**

```html
<img
  src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
        9TXL0Y4OHwAAAABJRU5ErkJggg=="
  alt="Red dot"
/>
```

---
