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