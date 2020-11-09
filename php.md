**Check PHP memory limit**

```bash
$ php -i | grep "memory_limit"
```

---

**Change PHP memory limit**

```
/usr/local/etc/php/conf.d/uploads.ini

file_uploads = On
memory_limit = 512M
upload_max_filesize = 512M
post_max_size = 512M
max_execution_time = 600
```

---
