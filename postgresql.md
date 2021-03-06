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
    NIP: "1111111111",
  },
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
Database.select("*").form("users").where("name", "<>", "admin");
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
await Database.select("*").from("users").whereNotNull("network");
```

---

**Where not null in Knex**

```js
await Database.select("*").from("users").whereNotNull("network");
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
  await trx.table("users").insert(newUserPayload).returning("id");

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

**Iterate through JSON array from one of the columns and append other columns**

Given:

```json
{
  "name": "xxx",
  "items": [
    {
      "amount": 1
    },
    {
      "amount": 2
    },
    {
      "amount": 3
    }
  ]
}
```

Expected:

```json
[
  { "amount": 1, "name": "xxx" },
  { "amount": 2, "name": "xxx" },
  { "amount": 3, "name": "xxx" }
]
```

```sql
SELECT name, f.amount FROM reports, json_to_recordset(reports.items) AS f(amount INT)
```

json_to_recordset - builds a "table" with predefined typed columns from an array, and joins it with the main table (reports in the case above)

---

**What's an upsert?**

If a row with given constraints exists - update it, if it doesn't - insert a new one.

In psql: `INSERT ... ON CONFLICT UPDATE`

---

**Condintionall apply a statement**

[0](https://knexjs.org/#Builder-modify)

---

**Group by day, not exact time**

```js
const result = await Database.table("habits")
  .select(
    Database.raw("created_at::date as day"),
    Database.raw("count(*)::integer")
  )
  .where("user_id", auth.user.id)
  .whereRaw(`created_at::date >= ?`, [startOfGivenMonth])
  .whereRaw(`created_at::date <= ?`, [endOfGivenMonth])
  .groupBy("day")
  .orderBy("day");
```

**Cast to integer**

```js
Database.raw("count(*)::integer");
```

---

**Cast to date**

```js
Database.raw("count(*)::date");
```

---

**psql command to create a backup**

```bash
$ pg_dump -U docker -d hapiline -f "$FILENAME"
```

[1](https://www.postgresql.org/docs/9.3/app-pgdump.html)

---

**psql command to restore a db from backup**

```bash
$ psql -U docker -w hapiline < backupfile
```

---

**Don't restore backup table schemas**

`pg_restore --data-only`

---

**Is unique index automatically created for PRIMARY KEY?**

Yes.

[1](https://www.postgresql.org/docs/current/sql-createtable.html)

---

**Column definition CHECK constraint**

```sql
price INT CHECK (price >= 0) NOT NULL
```

---

**What's a window function**

A window function operates on a subset of rows, but it doesn't reduce the number of returned rows.

Compared to the aggregate function which reduces the number of returned rows.

```
SELECT
   group_name,
   AVG (price)
FROM
   products
INNER JOIN product_groups USING (group_id)
GROUP BY
   group_name;
```

| group_name | avg  |
| ---------- | ---- |
| smartphone | 500  |
| tablet     | 300  |
| laptop     | 1500 |

```
SELECT
   product_name,
   price,
   group_name,
   AVG (price) OVER (
      PARTITION BY group_name
   )
FROM
   products
   INNER JOIN
      product_groups USING (group_id);
```

| product_name | price | group_name | avg  |
| ------------ | ----- | ---------- | ---- |
| Xiaomi Mi 9  | 1400  | smartphone | 1500 |
| iPhone X     | 3400  | smartphone | 1500 |
| iPhone Xr    | 3600  | smartphone | 1500 |

---

**COUNT NULL values with FILTER**

```sql
SELECT
  COUNT(*) FILTER (WHERE a IS NULL) count_nulls,
  COUNT(*) FILTER (WHERE a = 'x') count_x,
  COUNT(*) FILTER (WHERE a = 'y') count_y
FROM us;
```

[0](http://sqlfiddle.com/#!17/7e51c/2)

---

**Generate a date range**

```sql
SELECT * FROM generate_series('2020-01-07'::date, '2020-01-01', '1 day') as date;
```

---

**Generate a dynamic date range**

```sql

SELECT day::date
FROM GENERATE_SERIES(now() - '6 days'::interval, now(), '1 day'::interval) as day
```

---

**Count how many items were created before on given day in a date range**

```sql
SELECT
  SUM(COUNT(habits.*) FILTER (WHERE habits.created_at::date <= day))
  OVER (ORDER BY day)::integer AS "maximumVotesLastWeek"
FROM GENERATE_SERIES(NOW() - '6 days'::interval, NOW(), '1 day') as day
LEFT JOIN habits ON habits.created_at::date <= day::date
WHERE habits.user_id = :user_id
GROUP BY day
ORDER BY day DESC
LIMIT 1
```

---

**How to list all relations in given database**

```bash
\dt+
```

---

**Query by nested JSON field**

`additional_info -> 'acadia' ->> 'patient_history_number' = :patient_history_number`

---

**Case-insensitive where**

```sql
WHERE name ILIKE 'adam'
```

---

**SELECT during a transcation**

SELECT in a transaction can access the state of the database after an INSERT/UPDATE.

---

**Connection string**

```bash
postgresql://user:password@host:port/database
```

---

**Disable foreign key constraint checks**

```sql
SET foreign_key_checks = 0;
// do some stuff
SET foreign_key_checks = 1;
```

---

**UUID**

```sql
CREATE EXTENSION "uuid-ossp";
```

---

**Add comment**

```sql
COMMENT ON COLUMN my_table.my_column IS 'Employee ID number';
```

---

**Remove comment**

```sql
COMMENT ON COLUMN my_table.my_column IS NULL;
```

---

**Check if a user with given email exists**

```sql
SELECT EXISTS(SELECT id FROM users WHERE email = :email);
```

---

**Describe an enum**

```
\dT+ log_type;
```

---
