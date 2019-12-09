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

**Convert timestamp to date**

```js
Database.table("visits").select(
  "visits.user_id as userId",
  Database.raw("to_char(visits.created_at, 'DD-MM-YYYY') as \"createdAtDate\"")
);
```

---

**Make Postgres preserve aliase camelCase**

Wrap the `as` name with double quotes.

```js
Database.table("visits").select(
  "visits.user_id as userId",
  Database.raw("to_char(visits.created_at, 'DD-MM-YYYY') as \"createdAtDate\"")
);
```

---

**Where not null in Knex**

```js
await Database.select("*")
  .from("users")
  .whereNotNull("network");
```

---

**Where not null in Knex**

```js
await Database.select("*")
  .from("users")
  .whereNotNull("network");
```

---

**Query by date in Knex**

```js
const date = "2019-11-11";
Database.table("users").whereRaw(`created_at::date = '${date}'`);
```

---

**Using bind params in raw queries**

```js
Database.table("visits").whereRaw(`created_at::date = ?`, [date]);
```

---

**Knex transcation shortcut**

```js
const trx = await Database.beginTransaction();

try {
  await trx
    .table("users")
    .insert(newUserPayload)
    .returning("id");

  await trx.table("role").insert(newUserRolePayload);

  trx.commit();
} catch (e) {
  trx.rollback();
}
```

---

**Sum**

```js
const result = await Database.table("visits")
  .innerJoin(
    "gym_income_segments",
    "gym_income_segments.id",
    "visits.gym_income_segment_id"
  )
  .select(
    Database.raw("COALESCE(SUM(visits.user_cost), 0) as income"),
    Database.raw(
      "COALESCE(SUM(gym_income_segments.gym_income), 0) as amount_for_partner"
    ),
    Database.raw(
      "COALESCE(SUM(visits.user_cost - gym_income_segments.gym_income), 0) as amount_for_us"
    )
  )
  .where("visits.gym_id", gymId)
  .whereRaw(`visits.created_at::date >= ?`, [dateStart])
  .whereRaw(`visits.created_at::date < ?`, [dateEnd]);
```

---

**Return first non-null value**

```sql
 SELECT COALESCE(NULL, NULL, NULL, 'xxx', NULL, 'Example.com'); //xxx
```

```js
Database.raw(
  "COALESCE(SUM(gym_income_segments.gym_income), 0) as amount_for_partner"
);
```

---

**Preserving history of modifiable column in another table**

Just duplicate it in the "another" table. So in the future you don't need to create joins with new data.

---
