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

**How to use brace expansion?**

The command below creates 3 files: `version1.txt`, `version2.txt` and `version3.txt`.

`$ make version{1,2,3}.txt`

---

**Which exit code means no error?**

`0`

---

**How to declare a variable?**

Standard variable: `CURRENT_BRANCH="master"`
Output from a command: `CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)`

Usage: `$CURRENT_BRANCH`

---

**How to check if a variable is an empty string?**

```
  if [ -z "$1" ]; then
    echo "No branch to merge"
    return 1
  fi
```

---
