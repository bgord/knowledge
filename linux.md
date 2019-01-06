**Get MIME types of all the apps, useful when changing defaults**

`$ cat ~/.config/mimeapps.list`

---

**Set a default browser**

`$ xdg-settings set default-web-browser firefox-developer-edition.desktop`

---

**Preview file in real time in the terminal**

`tail -f debug.txt`

-f means "follow"

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
