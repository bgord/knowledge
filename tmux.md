**Kill tmux session named `dev`**

`$ tmux kill-session -t dev`

---

**List tmux sessions**

`$ tmux ls`
`$ tmux list-sessions`
`$ tmux list-sessions -F '#S'` // display only names

---

**Create a new session**

`-d` stands for 'detached'
`-s` is for a session name

`$ tmux new -d -s "dot"`

---

**Change a window name**

For the current one:
`$ tmux rename-window "know/dot"`

---

**Split windows**

`$ tmux split-window -h -p 50`

`-h` horizontally
`-v` vertically
`-p` percentage

---

**Focus 2nd pane**

`$ tmux select-pane -t 2`

---

**Execute a command**

`$ tmux send-keys "cd ~/Desktop"`

---

**Attach tmux session**

`$ tmux a -t "dot"`

---

**How to swap panes?**

`Prefix {`

---

**Create a new window**

`$ tmux new-window`

---

**Set a window name**

`$ tmux rename-window "play"`

---

**Focus a window**

`$ tmux select-window -t "play"`

---

**Copy/paste from a pane by keyboard**

```
- type Prefix + [
- move to a text you want to copy
- prace Space to start selecting
- use VIM movements to select a text
- once you're finished selecting, press Enter to copy
```

Now, the text can be pasted by Prefix + ].

---

**Copy text by mouse**

Select a text by holding the Shift key down, then Ctrl + c.

---
