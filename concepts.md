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
