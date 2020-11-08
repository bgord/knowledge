**Show all tables**

```sql
show tables
```

---

**Backup**

```bash
mysqldump -u root -p wpdatabase > wpdb_backup.sql
```

---

**Restore**

```bash
mysql -u $MYSQL_USER --password=$MYSQL_PASSWORD $MYSQL_DATABASE < backups/mysql_backup.sql
```

**Improve backup format**

```bash
$ mysqldump --extended-insert=FALSE --complete-insert=TRUE
```

---

**Unknown table COLUMN-STATISTICS in information-schema (1109)**

A new flag was introduced in MySQL8

```
mysqldump --column-statistics=0
```
