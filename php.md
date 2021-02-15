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

**Setup a custom WP theme**

In the `/var/www/html/wp-content/themes/<theme>` add `index.php`:

```php
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8" />

    <title>Mining City Landing Page</title>
    <?php wp_head(); ?>
  </head>

  <body>
    <main>hello</main>
  </body>
</html>
```

Add basic `style.css` file:

```css
main {
  background: black;
}
```

Add `functions.php` to load the styles:

```php
<?php
/**
 * Theme Functions
 */
function mining_city_scripts() {
    wp_enqueue_style( 'style.css', get_stylesheet_uri() );
}

add_action( 'wp_enqueue_scripts', 'mining_city_scripts' );
```

---

**Serve PHP locally**

```
php -S 127.0.0.1:8000
```

---
