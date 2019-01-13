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
