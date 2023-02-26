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

**Add custom command types**

In `cypress/support/index.d.ts` add the following

```ts
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>;
  }
}
```

---

**Clear cookies, local storage, and session storage between tests**

```
Cypress.Commands.add('clearStoragesAndCookies', () => {
  cy.clearCookies();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
  cy.clearLocalStorage();
});
```

Or in the newer versions, use the config that does basically the same:

```
defineConfig({
  e2e: {
    testIsolation: 'on',
    experimentalSessionAndOrigin: true,
  },
});
```

---
