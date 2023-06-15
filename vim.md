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

**Put the current line to the top/middle/bottom of the screen**

`zt` top
`zz` middle
`zb` bottom

---

**A faster way to delete 2 branches down/up**

Instead of `2dd`, press `dk` or `dj`.

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

**How to access a register?**

You need to precede it with `"`, for example pasting from `0` register: `"0p`.

---

**What's the default register?**

`"` is the default (unnamed) register.
Every text you yank or delete will be stored in there.
`p` is the same as `""p`.

---

**What are the named registers?**

For this occasion, VIM has a concept of numbered registers.
From `"0` to `"9`.

`"0` contains the latest yank.
`"1` - `"9` have the latest deletions, from the newest to the oldest.

---

**What are the 4 read-only registers for?**

`"%` has the current file path (relative to the directory where VIM was first opened).
`":` has the latest executed command.
`".` has the last inserted text.
`"#` has the last edited file.

---

**How to insert em/en dashes?**

`C-k -N` or `C-k -M`

---

**How to eliminate a delay on ESC in VIM?**

Add the following to `.vimrc`.

```
set timeoutlen=1000
set ttimeoutlen=0
```

[source](https://www.johnhawthorn.com/2012/09/vi-escape-delays/)

---

**How to delete until the word**

`d/someword`

---

**Open VIM with cursor on given line**

```bash
$ vim +33 file.txt
```

---

**Open VIM with cursor on the first occurrence of a pattern**

```bash
$ vim +/set .vimrc
```

If a pattern is not found, VIM displays an error message and moves cursor to the first line.

---

**Blockwise visual mode**

Visually selects a fixed width column which can be changed - `C-v`.

`v` (visual mode) doesn't allow "breaking" selected lines.

`S-v` (visual line mode) selects only full lines.

---

**Blockwise visual editing**

```
A
B
C
D
```

1. Place cursor on the letter "A".
2. C-v
3. 3j
4. I
5. \*<space>
6. Esc

The text should look like this:

```
* A
* B
* C
* D
```

---

**Buffer**

Buffer is a piece of memory that has been loaded with a file content.

---

**Insert a file content to a current buffer**

`:r <filename>`

---

**Insert an output of a shell command**

`:r !ls`

---

**An alternative way to close a buffer in VIM**

`ZZ`

---

**Move to next/previous paragraph**

Next paragraph: `}`
Previous paragraph: `{`

---

**Go to percent through file**

A half: `50%`

**Search and replace**

```
:s/a/b      # changes a to b in the current line
:%s/a/b     # changes a to b in the entire line
:6,10s/a/b  # changes a to b in lines 6-10 (inclusive)
```

---

**Ranges**

```
:4,+3 # select lines 4,5,6,7
:4,$ # selects lines from 4 to the end of the file
```

---

**Display an output of a command**

```
:!git status
```

---

**Install coc extension with plugged in .vimrc**

[source](https://www.reddit.com/r/vim/comments/brylz6/cocnvim_on_vim_any_dotfile_examples_on/eoi7vic?utm_source=share&utm_medium=web2x)

---

**Pass a visual selection to a shell command**

Replace the selection with an output of a command.

Input:

```
1
2
3
```

Press: `!grep 2<CR`

Output:

```
2
```

To only display an output of a command press: `:w !grep 2<CR>`.

---

**Count visually selected characters**

```
- select text visually
- press `g<Ctrl-g>`
```

---

**Case insensitive selection sorting**

```
:sort i
```

---

**List all mappings**

```
:map
```

---

**Copy current filename**

```
:let @+ = expand("%:t")
```

@+ means current register

[source](https://stackoverflow.com/questions/916875/yank-file-name-path-of-current-buffer-in-vim)

---

**Populate quickfix with all files matching a pattern in Vim**

To find all occurrences of a pattern, type: `:Ag invalid_token<CR>`.
It shows a fzf list of results, and right now you could go to one result at a time.
Type `Alt + A` to load all the results to a quickfix.
Right now, you can navigate to all the results.

---

**Quickfix mappings**

:cn - go to the next item
:cp - go to the previous item
:cnf - go to the next file in the list
:cpf - go to the previous file in the list

---

**Open all files containing a pattern**

```bash
$ ag -l invalid_token | xargs -o vim
```

---

**Count pattern occurrences**

```
:%s/pattern//gn
```

---

**:echo has('clipboard') outputs 0**

The sollution may be to install `gvim` which (somehow) adds this feature to Vim.

---

**Move cursor to the end of the last insert position**

```
gi
```

---

**Marks**

`ma` to create a mark for the **a** letter, and use 'a to go to the beginning of the line, and use \`a to go to the exact location.

---

**Replace tabs with spaces**

```
:%retab
```

[0](https://stackoverflow.com/a/9105889)

---

**Changelist**

Every time you make a change that can be undone, Vim saves the cursor position of the place it happened.

You can access it via `:changes`.

---

**Go to next/previous changelist item**

Next: `g;`
Previous: `g,`

---

**Perform calculations in insert mode**

```
i<C-r>=2*2+2
```

---

**Execute macro on all lines matching a pattern**

Macro stored in the `r` register on lines starting with `-`

```
:g/^-/norm! @r
```

---

**Delete lines matching a pattern**

```
:g/pattern/d
```

---

**Perform search and replace on all lines matching a pattern**

```
:g/639-1/s/639-1/code
```

---

**Perform search and replace in the current line**

```
:s/,/|/ # first occurrence only
:s/,/|/g # all occurrences
```

---

**Change line endings from DOS to UNIX**

```
:set fileformat=unix
```

---

**Shuffle selected lines**

- select lines visually
- `:!shuf`

---

**Method navigation**

`[m` - previous method start
`]m` - next method start

`[M` - previous method end
`]M` - next method end

---
