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

**How to proxy a request to a node backend?**

```docker-compose.yml
version: '3'

services
  nginx:
    build:
      context: ./
      dockerfile: Dockerfile-nginx
    ports:
      - 80
    networks:
      app_net:
        ipv4_address: 173.16.238.11
  node:
    build:
      context: ./
      dockerfile: Dockerfile-node
    ports:
      - 8888:8888
    networks:
      app_net:
        ipv4_address: 173.16.238.11
    volumes:
      - .:/usr/src/app
    working_dir: /src/src/app
networks:
  app_net
    ipam:
      driver: default
      config
        - subnet: "173.16.238.0./24"
```

```Dockerfile-node
FROM node:10-alpine

WORKDIR /usr/src/app
COPY ./index.js .
EXPOSE 8888
CMD [ "node", "index.js" ]
```

```index.js
const http = require("http");

htttp.createServer((req, res) => {
  res.write("Hello!");
  res.end();
}).listen(8888)
```

```Dockerfile-nginx
FROM nginx:latest

COPY ./nginx.confg /etc/nginx/nginx.conf

EXPOSE 80
```

```nginx.conf
worker_processes: 4;

events { worker_connections 1024; }

http {
  upstream node-app {
    server node:8888 weight=1 max_fails=3 fail_timeout=30s;
  }

  server {
    listen 80;

    location / {
      proxy_pass http://node-app;
    }
  }
}
```

```bash
$ docker-compose up

$ http GET 173.16.238.11 // nginx proxies a request to node.js which returns "Hello!"
```

[Source](https://github.com/robertoachar/docker-nginx-express/blob/master/.docker/nginx.conf)

---

**Redirect a subdomain to a specific port**

[0](https://whatididtodowhatidid.wordpress.com/2014/03/14/subdomains-for-ports-on-same-ubuntu-server-with-nginx-reverse-proxy/)

---

**nginx config file**

`/etc/nginx/nginx.conf`

---

**http2 support**

Supported only via HTTPS.

```
server {
        listen 80;
        server_name maildev.bgord.me www.maildev.bgord.me;
        location / {
                # ...
        }
        listen [::]:443 ssl http2 ipv6only=on;
        listen 443 ssl http2;
        ssl_certificate /etc/letsencrypt/live/bgord.me/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/bgord.me/privkey.pem;
}
```

---
