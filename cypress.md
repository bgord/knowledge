**Assert document.title**

```ts
cy.title().should("eq", "My app");
```

---

**Confirm hCaptcha command**

```js
Cypress.Commands.add("confirmHCaptcha", () => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  return cy
    .get("iframe")
    .first()
    .its("0.contentDocument.body")
    .should("not.be.undefined")
    .and("not.be.empty")
    .then(cy.wrap)
    .find(".anchor")
    .should("be.visible")
    .click();
});
```

---
