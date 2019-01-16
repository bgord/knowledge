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
