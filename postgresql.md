**How to show all table in the current database?**

`\dt`

---

**How to delete a table?**

`DROP TABLE <tablename>;`

---

**How to list all databases?**

`\l`

---

**How to quit from psql?**

`\quit`

---

**How to describe a table schema in psql?**

`\d+ <tablename>`

---

**How to get a table schema by a query?**

```js
const tableName = "logs";

const query = `
  SELECT column_name, data_type, character_maximum_length
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE table_name = '${tableName};';
```

---

**How to access order of columns in a table?**

```js
const tableName = "logs";

const query = `
  SELECT ordinal_position
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE table_name = '${tableName};';
```

---

**How to get records from the last week?**

```
SELECT *
FROM users
WHERE created_at > now() - '1 week'::interval
```

[source](https://popsql.com/learn-sql/postgresql/how-to-query-date-and-time-in-postgresql/)

---

**Insert query returning data**

```sql
INSERT INTO table_name (id, age, name) VALUES (1, 20, "Bartek") RETURNING *;
```

`RETURNING *` means that Postgres returns everything that was inserted.

To return only `id`, add `RETURNING id`.

---

**Insert multiple rows at once**

```sql
INSERT INTO table_name
(id, name)
VALUES (1, 'ja1'),
(2, 'ja2'),
(3, 'ja3'),
```

---

**Use psql to execute a command**

```bash
$ psql -u <username> -w -d <database> -c "SELECT NOW()"
```

---

**Use psql to execute a file**

```bash
$ psql -u <username> -w -d <database> -f filename.sql
```

---

**Get next id sequence value in given table**

```sql
SELECT nextval(pg_get_serial_sequence('table_name', 'id'));
```

---

**Select a nested value from a JSON field in knex**

```js
const data = {
  company_info: {
    NIP: "1111111111"
  }
};

Database.select(knex.raw("company_info ->> 'NIP' as NIP"));
```

---

**Select two column values concatenated**

```js
Database.select(
  "age",
  knex.raw("first_name || ' ' || last_name as full_name")
).from("users");
```

---

**Where equal in knex raw select**

```js
Database.select("*")
  .form("users")
  .where("name", "<>", "admin");
```

---

**Where like in knex raw select**

```js
Database.select("*")
  .form("users")
  .whereRaw("email LIKE ?", `%${searchByEmailPhrase}%`);
```

---

**Search by lowercased phrase**

```js
const lowercasedSearchByNamePhrase = "xxx";

Database.select("*")
  .from("users")
  .whereRaw("LOWER(name) LIKE ?", `%${lowercasedSearchByNamePhrase}%`);
```

---
