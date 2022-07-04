**An example playbook**

```yml
---
- name: This is a hello-world example
  hosts: localhost
  tasks:
    - name: Create a file called '/tmp/testfile.txt' with the content 'hello world'.
      copy:
        content: hello world
        dest: /tmp/testfile.txt
```

---

**Run a playbook**

```bash
$ ansible-playbook /ansible/playbook.yml
```

---

**Run a playbook inside a Docker container**

```
diff --git a/Dockerfile b/Dockerfile
new file mode 100644
index 0000000..ed6e97a
--- /dev/null
+++ b/Dockerfile
@@ -0,0 +1,16 @@
+FROM ubuntu:bionic
+
+# Install prerequisities for Ansible
+RUN apt-get update
+RUN apt-get -y install python3 python3-nacl python3-pip libffi-dev
+
+# Install ansible
+RUN pip3 install ansible
+
+# Copy your ansible configuration into the image
+COPY . /ansible
+
+# Run ansible to configure things
+RUN ansible-playbook /ansible/hello.yml
+
+RUN cat /tmp/testfile.txt
diff --git a/docker-compose.yml b/docker-compose.yml
new file mode 100644
index 0000000..cd3f150
--- /dev/null
+++ b/docker-compose.yml
@@ -0,0 +1,9 @@
+version: "3.7"
+services:
+  ansible_test:
+    container_name: "ansible_test"
+    build:
+      context: .
+      dockerfile: Dockerfile
+    volumes:
+      - .:/ansible
diff --git a/hello.yml b/hello.yml
new file mode 100644
index 0000000..8593c45
--- /dev/null
+++ b/hello.yml
@@ -0,0 +1,8 @@
+---
+- name: This is a hello-world example
+  hosts: localhost
+  tasks:
+    - name: Create a file called '/tmp/testfile.txt' with the content 'hello world'.
+      copy:
+        content: hello world
+        dest: /tmp/testfile.txt
```

---

**Multiline strings in variable**

```
gh_ovh_private_key: |
  -----BEGIN OPENSSH PRIVATE KEY-----
  xxx
  -----END OPENSSH PRIVATE KEY-----
```

---
