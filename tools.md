**Get MIME types of all the apps, useful when changing defaults**

`$ cat ~/.config/mimeapps.list`

---

**Set a default browser**

`$ xdg-settings set default-web-browser firefox-developer-edition.desktop`

---

**Search through terminal history through `fzf`**

`history | fzf`

- `--tac` to search in reversed order

---

**Fix problems with screen after detach an external monitor**

`xrandr`

---

**Generate ctags for a project**

`$ ctags -R .`

---

**Prettier ignore**

```
// prettier-ignore
const a = { a: 2, b:3};

<!-- prettier-ignore-start -->
<!-- prettier-ignore-end -->
```

---

**Prettify all files that Git takes into account**

`$ git ls-files | grep '\.jsx\|\.json\|\.js\?$' | xargs prettier --write --config .prettierrc`

---

**To disable eslint**

`/* eslint-disable */`

---

**Linux count lines of code tracked by git**

`$ git ls-files | xargs cat | wc -l`

---

**sxiv**

- an image viewer
- `+` / `-` to zoom in/out
- `hjkl` to navigate
- `|` `_` to flip vertically and horizontally

**Kill the process running on the port 3000**

`fuser -k 3000/tcp`

---

**TTY**

- means terminal

**Show all connected devices**

`lsblk`

---

**Rip a mp3 from the cd**

`asunder`

---

**tail**

Prints the last 10 lines of each file, to standard output.
It can precede the output with an filename, when displaying many of them.
`-f` to follow a file, acts like a live preview
`-n` to specify number of lines being printed

`tail -f -n 15 linux.md other.md`

---

**Sketch file in Linux**

Upload a `*.sketch` file to Figma, or Avocode.

---

**Create a mapping for a combination with Alt key**

`M-s` for Alt-S

---

**Unzip a file into directory**

`$ unzip design.zip -d design`

---

**408 HTTP status**

It means that request has timed out.

---

**Tee**

It reads the standard input, and both writes it to the file, and displays on the standard output.

`ls -alh | tee debug.file`

---

**What does /usr /dev mean?**

`/usr` means "universal system resources"
`/dev` means "devices"

---

**Hide grep ouput**

Useful when trying to find things (and then asserting it).

`$ cat filename.txt | grep -q 'dot'`

---

**How to count words in the file?**

`$ wc -w file.txt` // get a number of words
`$ wc -l file.txt` // get a number of lines

---

**What does \$@ mean?**

It is a variable containing all the command variables except of the first one.

---

**How to move a directory/file in Ranger?**

`dd` on the directory/file you want to move, then navigate to the path you want to paste, and `pp`.

---

**How to structure a Makefile for containerized react app?**

Basic structure:

```
mfs:
  ./npm.sh run frontend:start
```

When a script is dependent on the another:

```
populate:
  ./npm.sh run api:populate

start: populate
  ./npm.sh run api:start
```

---

**What's a purpose of `.PHONY` in Makefiles?**

`PHONY` means `pozer/fałszywy/oszust` in polish.
Typically a target of the make command is a file, `.PHONY` is to register a command as a something not related to the file, but just a command.

---

**How to extract the tar file?**

`tar xvf filenamme.tar // eXtract Ve File`

---

**Head**

By default it prints the first 10 lines of the file.

`head .gitignore -n 5`

`-n` is being used to print n first lines.

---

**Why open VPN won't start?**

After you update a kernel, open vpn needs a restart to run properly.

---

**What is a workspace in Manjaro?**

It's a separate Desktop environment, it shares the same menu bar.

To go to the next workspace: `Ctrl + Fn + Right Arrow`.
To go to the previous workspace: `Ctrl + Fn + Left Arrow`.
To go to the n-th workspace: `Ctrl + Fn + F<n>`

---

**How to search for whole word with `ag`?**

`ag -w COMPLETE`

---

**How to send a file through netcat?**

The netcat (`nc`) is like `cat`, but through net.

If I want to send something to the person in the same network, I need to know his IP address. Run `ip` on their machine, go to `2.` and grab `IP` from `inet` line.

The person should have `nc -l -p |port| > |filename|` running.
To send the file I run: `cat |filename| | nc |ip| |port|`.

---

**How to prettify a JSON file in the terminal?**

`$ cat db.json | jq .`

---

**How to pass header to httpie request?**

`$ http GET localhost/api/files x-api-key:xxx`

---

**How to upload a file with `httpie`?**

`$ http -f POST localhost/api/file payment@payment.csv uploadedBy=me`

---

**Are headers encrypted over SSL?**

Yes.

---

**chroot**

Run a program with changed root directory.

---

**How to fix a magnifier mode in Manjaro?**

`Alt + Scroll Down`

---

**How to configure husky**

```
	"husky": {
		"hooks": {
			"pre-commit": "npm run frontend:lint && npm run frontend:stylelint",
			"pre-push": "npm run frontend:test"
		}
	}
```

---

**How to setup Travis CI in a React repository?**

Filename: `.travis.yml`

```
language: node_js
node_js:
  - "8"
script:
  - echo 'Build starts!'
  - echo 'Testing...'
  - npm run test
  - echo 'Linting...'
  - npm run lint
  - echo 'Building...'
  - npm run build
cache:
  directories:
    - node_modules
```

After given GitHub repository is integrated, Travis will automatically look for `.travis.yml` file to look up the config.

---

**How to add a Travis status badge?**

```
[![Build Status](https://travis-ci.org/bgord/bgord-tools.svg?branch=master)](https://travis-ci.org/bgord/bgord-tools)
```

It checks the latest push build on the default branch.

Click on the "build unknown" badge in Travis.

---

**How to remap Caps Lock to Escape?**

`setxkbmap -option caps:escape`

---

**How to run a shell script/command on startup?**

```
$ crontab -e

# Edit an opened file
@reboot  /home/user/test.sh
```

---

**How to send an array in httpie?**

`$ http POST localhost:8080/preprocess ids='["x", "y"]'`

---

**How to stop a service in Linux?**

`$ sudo systemctl stop nginx`

---

**Webpack doesn't recompile watched files**

Add the following lines to your configuration:

```
watchOptions: {
  poll: true,
  ignored: /node_modules/
}
```

---

**How to reprovision a machine?**

```
vagrant up
cp ./provisioning/.../vars-local/secrets.yml /tmp/secrets.yml
<provisioning command>
```

---

**How to open a Firefox dev-console with a shortcut?**

`Ctrl-k`

---

**How to format HTML in a string?**

```js
const someText = /* HTML */ `
  <h1>SomeHTML</h1>
`;
```

---

**How to move a running process to background and to foreground?**

To move a process to background: `C-z`.
To move a process to foreground: `$ fg`.

---

**How to change date/time in Manjaro?**

Go to Settings Manager -> Manjaro Settings Manager -> Time and Date.

---

**How to diff two files?**

`diff file1 file1`

---

**Strange Fn key behaviour**

It's caused because of locked Fn key (Esc + Fn).
To unlock it, press the same combination.

---

**Outdated Vagrant plugins**

Error message:

```
Vagrant failed to initialize at a very early stage. The plugins failed to initialize correctly.
```

Solution:

```bash
$ vagrant plugin update
```

---

**Android Studio plugin installation**

File -> Settings -> Plugins

---

**Using find to find a file path**

```bash
$ find / -name 'filename.txt'
```

---

**Disk usage on Linux**

```bash
$ df
```

---

**Freeze/Unfreeze VIM**

```
Freeze: Ctrl-S
Unfreeze: Ctrl-Q
```

---

**Serve a directory in local network**

```bash
$ yarn global add http-server
$ cd ./dir
$ hs -p 8888 # or http-server
```

---

**Zip files/directories**

```
$ ls
my_app/ README.md

$ zip -r pack my_app README.md
```

Outputs the bundle to the pack.zip file which contains the README.md file and recursively traversed my_app directory.

---

**Create all directories if needed**

```bash
$ mkdir -p $HOME/some/non/existant/path
```

---

**ESLint extend config in package.json**

```json
{
  "eslintConfig": {
    "extends": "bgord"
  }
}
```

---
