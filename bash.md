**yyyy-mm-dd date in bash**

`$ date +%Y-%m-%d`

---

**Assert if the command has been run successfully**

Asserts exit code.

```
if tmux ls -F '#S' | grep -q 'dot'; then
 echo "Command run successfully."
fi
```

---

**Display exit code of the last command**

Each command ends with a corresponding exit code.

`$ echo $?`

---

**Bash variable for all arguments**

It doesn't store the binary name

```
echo $@
```

---
