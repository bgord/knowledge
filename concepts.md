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
