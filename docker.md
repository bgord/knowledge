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

**Env_file in docker-compose**

```
env_file:
  - ./node-auth-proxy/.env
```

---

**Use a variable from env_file in docker-compose**

```
ports:
  - "${PORT}:5555"
env_file:
  - ./node-auth-proxy/.env
```

---

**Ports order**

```
ports:
  - "8080:80"
```

Host port 8080 remapped to port 80 in container.

---

**Adonis and Postgres docker-compose example**

[source](https://github.com/ceelsoin/adonis-postgre-docker/blob/master/docker-compose.yml)

---

**Cannot access PG database from a Node container in docker-compose**

1. Check if inside a Node container you're connecting to a port on guest instead of host.
2. Add container names to not have to deal with host names.

Inside docker-compose:

```
container_name: some_db
```

In some .env file:

```
DB_HOST: some_db
```

---

**Create two database in one Postgres container**

1. Copy this file to a directory within your app: [file](https://github.com/mrts/docker-postgresql-multiple-databases/blob/master/create-multiple-postgresql-databases.sh)
2. Mount the directory containing the script to the database container.

```
volumes:
  - ./pg-init-scripts:/docker-entrypoint-initdb.d
```

3. Specify the database names in the environment variable.

```
- POSTGRES_MULTIPLE_DATABASES=db1,db2
```

---

**Connect to a database within a container with psql**

```bash
$ docker-compose exec -it container_db_name sh
$ su postgres
$ psql -U <user> -W <db name>
```

---

**WORKDIR in Dockerfile**

Sets the current directory for all operations. Just like `cd`.

---

**Difference between exec vs run in docker-compose**

`exec` requires a running container, but `run` doesn't.

---

**Reliably get a host of a service running inside docker-compose**

Get the `container_name` value.

```yml
version: "3"
services:
  node:
    build:
      context: ./node-auth-proxy
      dockerfile: Dockerfile-node-auth-proxy
    container_name: app_container
    ports:
      - 3000:3000
```

---

**Docker container default user**

By default, processes in containers execute as `root`.

---

**Pull images required for docker-compose file to work**

```bash
$ docker-compose pull
```

---

**Ubuntu installation**

[0](https://linuxize.com/post/how-to-install-and-use-docker-on-ubuntu-18-04/)
[1](https://github.com/sindresorhus/guides/blob/master/docker-without-sudo.md) - you may need to reconnect to the server to make it work

---

**Access docker-compose service logs**

One way is to redirect `docker-compose logs` output to the terminal and stdout.

```bash
$ docker-compose logs --no-color |& tee logs.txt
```

The other way around is to access the logs file generated by docker.

To find the location:

```bash
$ docker inspect --format='{{.LogPath}}' <container id/name>
```

[1](https://stackoverflow.com/questions/35414495/save-docker-compose-logs-to-a-file)

---

**docker-compose script to create a db backup**

```bash
#!/usr/bin/env bash

TIMESTAMP=$(date +"%s")

FILENAME="hapiline_backup_$TIMESTAMP"

echo "$FILENAME"

docker-compose exec db pg_dump -U docker -d hapiline -f "$FILENAME"
docker-compose exec db mv "$FILENAME" "data/db"
```

---

**Save image to an archive**

```bash
$ docker save -o image_name > image_name.tar
```

You can later load it:

```bash
$ docker load --input image_name.tar
```

---

**Force the docker-compose setup to recreate**

```bash
$ docker-compose down
$ docker-compose up --force-recreate
```

---

**Does docker-compose down deletes PostgreSQL data inside (volume)?**

No, if it's created correctly.

---

**restart: "always" mean in docker-compose**

It means that when a container exists (unexpectedly, not by `docker-compose stop`),
it gets restarted automatically if container has started successfully (it's been up for at least 10s)

---

**Docker context**

You can check existing contexts by running:

```bash
$ docker context ls
```

By default it looks like below, which means the only Docker context is the one on your local machine.

```
NAME                DESCRIPTION                               DOCKER ENDPOINT               KUBERNETES ENDPOINT   ORCHESTRATOR
default *           Current DOCKER_HOST based configuration   unix:///var/run/docker.sock                         swarm
```

Now, we want to create a context that points to the Docker engine on your remote machine.

Let's say your server's IP is `1.1.1.1`, the user is `ann`, and you want to create `deployment` context.
If you don't want to connect to the default SSH port - `23` - you can specifiy it after IP.

Remember about `--default-stack-orchestrator swarm` option.

```bash
$ docker context create
    --description "My deployment server"
    --docker "host=ssh://ann@1.1.1.1"
    --default-stack-orchestratorswarm
    deployment

$ docker context create
    --description "My deployment server"
    --docker "host=ssh://ann@1.1.1.1:225" # non default port
    --default-stack-orchestrator swarm
    deployment
```

Now, you should see the newly created context in the list:

```bash
$ docker context ls

NAME                DESCRIPTION                               DOCKER ENDPOINT                 KUBERNETES ENDPOINT   ORCHESTRATOR
default *           Current DOCKER_HOST based configuration   unix:///var/run/docker.sock                           swarm
deployment          My deployment server                      ssh://ann@1.1.1.1:225
```

---

**Switching Docker context**

If you're ready to deploy the app, you need to use the deployment context.

```bash
$ docker context use deployment
```

To go back to the default context:

```bash
$ docker context use default
```

---

**Add local domain with nginx-proxy**

[0](https://medium.com/better-programming/docker-powered-web-development-utilizing-https-and-local-domain-names-a57f129e1c4d)

---

**What does --remove-orphans do**

If you:

- `docker-compose up`d a setup with 3 services
- deleted one of the services in `docker-compose.yml`
- `docker-compose down`d the previuos setup
- `docker-compose up`d the next setup,

you have an orphan that is the running container for the service that got deleted.

Next time you `up` the setup, add `--remove-orphans` option.

---

**Add Docker to user group to avoid sudo**

```bash
$ sudo usermod -aG docker $USER
```

[0](sudo docker run hello-world)

---

**Lost/failed Docker daemon SSH connection with remote host**

Docker tries do open too many ssh connections.

- open `/etc/ssh/sshd_config` on the remote machine.
- find `MaxSessions` and set to e.g 100
- restart ssh daemon - `service ssh restart`

---

**HTTPS**

The `app` runs on port `80`.

```yml
version: "3.7"
services:
  app:
    # ...
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.hapiline.tls.certresolver=myresolver"

      - "traefik.http.routers.hapiline_http.rule=Host(`your-domain.com`)"
      - "traefik.http.routers.hapiline_http.entrypoints=web"
      - "traefik.http.routers.hapiline_http.middlewares=redirect-to-https"
      - "traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https"

      - "traefik.http.routers.hapiline.rule=Host(`your-domain.com`)"
      - "traefik.http.routers.hapiline.entrypoints=websecure"
      - "traefik.http.routers.hapiline.tls=true"
  traefik:
    image: "traefik:v2.2"
    container_name: "traefik"
    command:
      #- "--log.level=DEBUG"
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.myresolver.acme.httpchallenge=true"
      - "--certificatesresolvers.myresolver.acme.httpchallenge.entrypoint=web"
      - "--certificatesresolvers.myresolver.acme.email=your-emaile@example.com"
      - "--certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"
    volumes:
      - "./letsencrypt:/letsencrypt"
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
```

---

**List all volumes**

```
docker volume ls
```

---

**Remove a volume**

```
docker volume rm <hash>
```

---

**Remove all volumes**

```
docker volume rm $(docker volume ls -q)
```

---
