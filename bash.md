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

**Switch case statement**

```
case "$2" in
  'frontend:start')
    PORTS_FLAGS="-p 80:80"
  ;;
  'frontend:build')
  ;;
  'frontend:test')
  ;;
  'frontend:lint')
  ;;
  'frontend:stylelint')
  ;;
  'frontend:storybook')
    PORTS_FLAGS="-p 9000:9000"
  ;;
  'api:serve')
    PORTS_FLAGS="-p 8765:8765"
  ;;
  'api:populate')
  ;;
  'app:start')
    PORTS_FLAGS="-p 80:80 -p 8765:8765"
  ;;
  'app:start:populate')
    PORTS_FLAGS="-p 80:80 -p 8765:8765"
  ;;
esac
```
