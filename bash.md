**yyyy-mm-dd date in bash**

`$ date +%Y-%m-%d`

---

**Assert if the command has been run successfully**

Asserts exit code.

```bash
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

```bash
echo $@
```

---

**Switch case statement**

```bash
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

```bash
  if [ -z "$1" ]; then
    echo "No branch to merge"
    return 1
  fi
```

---

**String comparison**

```bash
echo $ENV:
if [ $ENV == "testing" ]; then
  echo "TESTING MODE";
else
  echo "NORMAL MODE";
fi
```

---

**Timestamp**

`date +"%s"`

[1](https://stackoverflow.com/questions/17066250/create-timestamp-variable-in-bash-script)

---

**Print last line ot stdout**

```bash
ls -l | grep xxx_ | tail -1
```

---

**Print n-th column ot stdout**

```bash
ls -l | grep xxx_ | tail -1 | awk '{print $n}'
```

---

**What does -- mean?**

Everything that comes after `--` is a parameter (not an option).

Let's say you want to delete a file named `-file.txt`

`rm -file.txt` won't work, because `rm` treats `-file.txt` as a list of options.

`rm -- -file.txt` works though

---

**Clear an exported variable in a terminal**

```
unset DOCKER_HOST
```

---

**Quit when a command fails**

```bash
set -e
```

---

**Load .env variables**

```bash
set -a
. ./env.txt
set +a
```

---

**Function definition**

```bash
function info {
  echo "[info]"
}

info
```

---

**Function definition with parameters**

```bash
function info {
  echo "[info]      $1"
}

info "a string"
```

---

**Preload the functions from another file**

```bash
source path/to/file.sh
```

---

**Bash iterate through an array**

```bash
BASE_DESKTOP_URL="$BASE_URL/desktop"
BASE_MOBILE_URL="$BASE_URL/mobile"

for VARIABLE in "en" "es" "de"
do
	http GET "$BASE_MOBILE_URL/$VARIABLE.pdf" > pdfs/MOBILE_$VARIABLE.pdf
  sleep 7s
done
```

---

**Interprate backslash commands in echo**

```bash
echo "\tOK" // prints "\tOK"
echo -e "\tOK" // prints "  OK"
```

---

**Check if file exists**

```bash
if test -f "$FILE"; then
    echo "file exists."
else
    echo  "file doesn't exist"
fi
```

---
