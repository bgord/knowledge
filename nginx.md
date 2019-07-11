**How to serve an index.html file on given port?**

Serve index.html file on localhost:8787.

```Dockerfile
FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/
COPY index.html /usr/share/nginx/html/

EXPOSE 8787:8787
```

```default.conf
server {
    listen       8787;
    server_name  localhost;
    location / {
        root   /usr/share/nginx/html;
        index  index.html;
    }
}
```

```index.html
<html>
  <body>
    <h1>
      Host:
      <!--#echo var="HOSTNAME" -->
    </h1>
    Version: 1.1
  </body>
</html>
```

```docker-compose.yml
version: '3'
services:
  nginx:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 8787:8787
```
