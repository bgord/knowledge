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

`docker build -t app:0.2 .`

Where:

`-t app:02` is a tag name for a container
`.` is a path for the Dockerfile
`-m 4g` is for a memory limit up to 4GB

---

**List all local images**

`docker images`

---

**Delete local image**

`docker rmi <image id>`

---

**Run a container**

`docker run app:0.2`

Common options (after run):
- `--rm` to automatically remove the container when it exists
- `--detach/-d` to run a container in background and print ID
- `-p 9292:9292` to publish a port mapping container => host

---

**Delete a container**

`docker rm <container id>`

---

**Stop a container**

`docker stop <container id>`

---
