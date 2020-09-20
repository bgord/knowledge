**Circle example**

```html
<svg
  data-mt="3"
  fill="red"
  height="10"
  width="10"
  viewBox="0 0 10 10"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle cx="5" cy="5" r="5" />
</svg>
```

---

**Make SVG icon accessible**

```jsx
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <title>Notification bell</title>
  <path
    d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
    stroke="#4A5568"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-label="notification bell"
    {...props}
  />
</svg>
```

[0](https://css-tricks.com/accessible-svgs/)

---

**Circle with borders only**

```html
<svg
  height="{60}"
  width="{60}"
  viewBox="0 0 60 60"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle cx="20" cy="20" r="20" fill="none" stroke="black" strokeWidth="5" />
</svg>
```

---

**Mask example**

The first shape inside the `<mask />` defines what's visible.
The second shape inside the `<mask />` defines what's hidden.

```html
<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="slice">
      <rect width="100%" height="100%" fill="white" />
      <rect height="50%" width="50%" fill="black" />
    </mask>
  </defs>
  <circle
    cx="30"
    cy="30"
    r="20"
    stroke-width="8"
    style="fill: none, stroke: #000"
    mask="url(#slice)"
  />
</svg>
```

```
--------------------- <= viewbox and first <rect /> (100% height and width)
-         - <=======-=== second <rect /> (50% height and width of the first <rect />)
-         -         -
-         -         -
-         -         -
-----------         -
-                   -
-                   -
-                   -
---------------------
```

---

**Path commands**

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path
    fill="none"
    stroke="red"
    d="M 10,30
       A 20,20 0,0,1 50,30
       A 20,20 0,0,1 90,30
       Q 90,60 50,90
       Q 10,60 10,30 z"
  />
</svg>
```

The difference between capital and normal letters is that upper-case commands specify absolute coordinates, and lower-case relative coordinates.

`M`, `m` - move to
`Z`, `z` - close path
`A`, `a` - elliptical arc curve
`L`, `l`, `H`, `h`, `V`, `v` - line to
`C`, `c`, `S`, `s` - cubic Bézier curve
`Q`, `q`, `T`, `t` - quadratic Bézier curve

---
