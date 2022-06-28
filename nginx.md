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

**Force https**

```
server {
        listen 80;
        root /var/www/blog;
        server_name bartoszgordon.com www.bartoszgordon.com;
        error_page 404 /404;
        location / {
                try_files $uri $uri/ =404;
        }
        if ($scheme != "https") {
                return 301 https://$host$request_uri;
        }
}
```

---

**Force http to https redirect**

```
server {
        listen 80;
        root /var/www/wlozka;
        server_name middleearth.pl www.middleearth.pl;
        location / {
                try_files $uri $uri/ =404;
        }

        listen 443 ssl;
        ssl_certificate /etc/letsencrypt/live/middleearth.pl/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/middleearth.pl/privkey.pem;

        if ($scheme = http) {
                return 301 https://$server_name$request_uri;
        }
}
```

---

**Add gzip support**

```
location / {
    gzip_static on;
}
```

---

**Hide nginx version in requests**

```
http{
    ...
    server_tokens off;
    ...
}
```

---

**Nginx 502 custom error handling**

Add the following just before the closing of the server block

```
error_page 502 /502.html;

location = /502.html {
	root  /var/www/project;
}
```

---

**Load balancer**

```nginx
upstream hello_env {
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
    server 127.0.0.1:3004;
}

server {
    listen 80 default_server;
    server_name _;

    location / {
        proxy_pass http://hello_env;
        proxy_set_header Host $host;
    }
}
```

---

**Cache for Gatsby**

```
server {
        listen 80;
        root /var/www/x/public;

        location ~* \.(?:html|json)$ {
                add_header Cache-Control "public, max-age=0, must-revalidate";
        }

        location / {
                try_files $uri $uri/ =404;
                gzip_static on;
        }
}
```

[0](https://www.gatsbyjs.com/docs/caching/)

---
