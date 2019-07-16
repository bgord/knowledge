**Replace last searched phrase with `bar`**

`:%s//bar/`

In my case it's \<Leader>n\<Right>

---

**Go to the tag definition**

`gj`

---

**Remove trailing whitespace**

`:%s/\s\+$//e`

- substitute `:%s/`
- a space `\s` occuring at least once `\+`
- at the end of the line `$`
- replace with nothing `/`
- display an error when nothing found `/e`

---

**Abbreviation**

`:ab teh the`

Everytime `teh` is typed, change it to `the`.

---

**Import JS file**

`<Leader>i`

---

**Delete inside/at object**

- `di{` - delete inside object
- `da{` - delete inside object, and the parenthesis

**Replace with the text from the register**

- `viwp`, now mapped to `gr`

---

**Upper/lowercase a selection**

`viwU/viwu`

---

**Text objects**

- {, (
- p (paragraph)
- t (tag)
- w (word)

---

**Reload a file**

`:e`

**Erase all changes in the current buffer**

`:e!`

---

**Indent left/right**

`<` to the left,
`>` to the right

---

**Reselect last visual selection**

`gv`

---

**Insert a phrase x times**

`50iWORD<ESC>`

---

**Go to to the beginning/end of the selection**

`o`

---

**Put the current line to the top of the screen**

`zz`

---

**A faster way to delete 2 branches down/up**

Instead of `2dd`, pres `dk` or `dj`.

---

**How to allow in-word snippet expansion?**

Add an `i` option to the end of snippet first line of definition.

```
snippet tp "this.props" i
this.props.${1}
endsnippet
```

**How to make snippet expand only if it's been declared on the beginning of the line?**

Add an `b` option to the end of snippet first line of definition.

```
snippet tp "this.props" b
this.props.${1}
endsnippet
```

---

**How to browse recently closed files?**

`:History` by fzf.vim functionality.
`:old` by built-in vim feature.

---

**How to use basic fold?**

- select an area visually
- `zf` to create a fold
- `zd` to delete a fold
- `za` to toggle a fold

---

**How to open a file in vim that comes from the bash pipe?**

echo 'filename.txt' | xargs vim

---

**How to jump to the last place from the jumplist?**

`Ctrl-o o`

---

**How to map common key sequences?**

- `Shift + k` === `K`
- `Ctrl + k` === `C-k`

---

**How to make given key sequence non operational?**

`noremap K <Nop>`

---

**How to move/copy a file in netrw?**

Mark a directory you want to move a file to with `mt`, it means "mark target".
Then mark the file(s) you want to move with `mf`, it means "mark file(s)".

If you want to move marked file(s), press `mm`.
If you want to copy marked file(s), press `mc`.

To unmark a file, press `mu`.

---

**How to open a file in the new tab with netrw?**

`t`

---

**How to close all tabs except of the current one?**

`:tabo[nly]`

---

**How to rename a file in netrw?**

`R`

---

**How to delete a file in netrw?**

`D`

---
