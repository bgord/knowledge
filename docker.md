> All examples are run on the container named `words`.

**Container vs Image**

Image

- inert, immutable
- snapshot of a container
- image is created with `build` command
- stored in a Docker registry (hub.docker.com)
- multiple images can be composed
- virtual size is virtual, it sums up all layers (of what?)

Container

- an "object" of an image "class"
- created with `run` command
- shares the kernel with other containers
- runs as an isolated process in user space on host OS

Dockerfile => Image => Containers

---

**Build an image**

`$ docker build -t words:0.2 .`

Where:

`-t words:02` is a tag name for a container, "latest" by default
`.` is a path for the Dockerfile
`-m 4g` is for a memory limit up to 4GB

---

**List all local images**

`$ docker images`

---

**Delete local image**

`$ docker rmi <image id>`

---

**Run a container**

`$ docker run words`

Common options (after run):

- `$ docker run words:0.2` to run a container based on an image with a specific tag
- `--rm` to automatically remove the container when it exists
- `--detach` to run a container in background and print ID (`-d`)
- `--publish 9290:9292` to publish a port mapping: container 9290 => host 929 (`-p`)
- `--volume ./local-app-code:/usr/src/app` (`-v`)

---

**Delete a container**

`$ docker rm <container id>`

---

**Stop a container**

`$ docker stop <container id>`

---

**Env variables**

In Dockerfile:
`ENV MY_NAME "Bartek"`
`ENV MY_NAME="Bartek"`

In run command:

`$ docker run --env MY_NAME="AAA" words:env`

From a file

`$ docker run --env-file ENV_FILE_PATH words:env`

---

**Example Dockerfile for node**

```
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

ENV MY_NAME "Bartek"

CMD [ "node", "hello-docker.js"]
```

---

**List all ports defined on a container**

`$ docker port words`

---

**Ports: publish vs expose**

`EXPOSE`:

- private
- cannot connect to the port from the host machine
- used in Dockerfiles
- a way to document which ports can be exposed
- by default accessible only within linked containers

`--publish`:

- public
- can connect to the port from the host machine

---

**Volumes**

To share a directory between the host and a container (e.g to reflect changes from the host inside a container)

`VOLUME /usr/src/app` inside the Dockerfile

`$ docker run --volume "$(pwd)":/usr/src/app words` to reflect changes from the current working directory in the container's `/usr/src/app` directory.

---

**Accessing a terminal inside the container**

`$ docker run -i -t words bash`

`-i` to enter the _interactive_ mode
`-t` to allocate a pseudo-TTY (terminal)
`bash` is a terminal binary to run

---

**npm.sh script to run npm inside the container**

```
#!/usr/bin/env bash

docker run \
  --rm \
  --volume "$(pwd)":/usr/src/app \
  words \
  npm "$@"
```

---

**Setup a custom domain for local development**

```
EXPOSE 80 // in Dockerfile

$ docker run --rm -p 80:80 words node server.js
$ docker ps // find a container ID
$ docker inspect <container ID> // find a "Gateway" IP

172.17.0.1 words.deve // add an /etc/hosts entry for "Gateway" ID
```

---

**How to create a docker subnet?**

By default, assigns container's IP address from a subnet `172.17.0.0/16`, and uses a "first come, first serve" algorithm to assign specific IP. The first container get `172.17.0.1`, the seceond one `172.17.0.2` etc.

`$ docker network create --driver bridge --subnet 173.20.0.0/16 --gateway 173.20.0.1 PERFIE_DEV_NET`

Add the line below to the `/etc/hosts`.

`173.20.0.1 perfie.local`

When running a container, use previously defined network.

`docker run --network PERFIE_DEV_NET`

**Entrypoint command doesn't work**

You may pass arguments to the initial command in the same string:

`ENTRYPOINT ["Mailhog -auth-file=credentials"]`

instead of

`ENTRYPOINT ["Mailhog", "-auth-file=credentials"]`

---

**How to run a simple node service with docker-compose?**

`docker-compose.yml`

```yml
version: "3"
services:
  node-auth-proxy:
    build:
      context: ./node-auth-proxy
      dockerfile: Dockerfile-node-auth-proxy
    ports:
      - 3000:3000
    volumes:
      - ./node-auth-proxy:/usr/src/app
    env_file:
      - ./node-auth-proxy/.env
```

It replaces manually typing `docker run ...` arguments.

---

**How to start docker-compose services?**

`docker-compose up` in the directory containing `docker-compose.yml`.

---

**How to rebuild docker-compose services?**

`docker-compose build` in the directory containing `docker-compose.yml`.

---

**How to run only a specific service with docker-compose?**

`docker-compose up <service name>`

---

**How to create and use a network in docker-compose?**

```yml
version: "3"
services:
  node-auth-proxy:
    build:
      context: ./node-auth-proxy
      dockerfile: Dockerfile-node-auth-proxy
    networks:
      app_net:
        ipv4_address: 172.16.238.12
networks:
  app_net:
    ipam:
      driver: default
      config:
        - subnet: "172.16.238.0/24"
```

---

**What's an example nginx Dockerfile?**

```yml
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 1025:1025
```

It requires an `nginx.conf` file to be present in the directory of Dockerfile.

---

**How to delete all existing images?**

```
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)
```

---
