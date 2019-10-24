**How to correctly namespace things?**

1. Make names easy to sort and digest while listing:

```
uploads_mlekolandia
uploads_maslolandia
uploads_jogurtolandia
```

instead of

```
mlekolandia_uploads
maslolandia_uploads
jogurtolandia_uploads
```

2. The date format that makes the most sense (the same two benefits as above):

```
2019-08-01
2019-08-02
2019-08-02
```

The rule is: general first, specific last.

---

**How to correctly remove data in between seeds**

Seeders should only be there to seed and nothing else.

```bash
$ adonis migration:refresh # rollbacks all migrations to the 0 batch and reruns them
$ adonis seed
```

[source](https://forum.adonisjs.com/t/cannot-truncate-a-table-referenced-in-a-foreign-key-constraint/497/2)

---

**How to correctly model controllers to be "cruddy"?**

Never write custom actions. (max 7 standard CRUD actions).

Figuring names: after an actions happens, what do we have that we didn't have before?

1. Remodel a custom action on a nested resource to a CRUD action of some (maybe new) controller.
2. Editing an attribute idependently from the rest? New controller.
3. Touches pivot records? New controller, and probably a new model.
4. Transitioning state? New controller.

[source](https://www.youtube.com/watch?v=MF0jFKvS4SI&list=WL&index=16&t=0s)

---

**Backend and frontend code containers**

There's nothing wrong in keeping both backend and frontend code in on container.
Although it's a good idea to start only backend in the container entrypoint.
Frontend dev server can be run via docker-compose exec or docker run command.
It also allows running an nginx to serve the static frontend files in production.

---

**E2E best practices**

1. Click submit buttons in your tests instead of artificially submitting forms (e.g `.submitForm("formName")`). It helps when e.g a submit button doesn't have `type="submit"` and clicking it won't submit a form.

---

**Comments about making scripts executable**

If you use git, there's no need to add comments about making scripts executable.
Git remembers fs permissions.

---

**JWT**

It's a stateless authentication mechanism.

It all starts with a secret that you sign your JWTs with.
The first part of JWT is header which consists of algorithm name, type, or expiration date.
The second part is a payload you want to transfer.
The last part is a signature.

Then, it's base64'd to a string token.

It should typically be transfered by `Authorization=Bearer <token>` in HTTP requests.

The main caveat is you cannot revoke a token in a canonical way.
It's possible to set short expiration dates or store a list of expired tokens (which seems like an overkill).

---

**Folder structures**

Flat structure with long and descriptive names > deep folder structure.
Optimize for discoverability: finding the right file/moving files around.

[1](https://twitter.com/dan_abramov/status/1145354949871767552)

---

**Email change flow**

1. Sending a verification message to the old account. (won't work because the account may be compromised)
2. Sending a verification message to the new account. (an intruder may grab somebody's device and set a email to their own address).
3. Sending a verification messages to both accounts. (won't work because of #1)

The best approach is the #2 but forcing user to input a passoword before the change.

[1](https://ux.stackexchange.com/a/58553)

---

**401 vs 403 HTTP status**

401 - invalid credentials (unauthorized)

403 - valid credentials but not enough permissions (forbidden)

---
