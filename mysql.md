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
