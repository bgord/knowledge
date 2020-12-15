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
