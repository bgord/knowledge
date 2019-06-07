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

**Changing window name**

For the current one:
`$ tmux rename-window "know/dot"`

---

**Splitting windows**

`$ tmux split-window -h -p 50`

`-h` horizontally
`-v` vertically
`-p` percentage

---

**Executing a command in the 2-th pane**

`$ tmux select-pane -t 2`
`$ tmux send-keys "cd ~/Desktop"`

---:w

**Attach tmux session**

`$ tmux a -t "dot"`

---

**How to swap panes?**

`Prefix {`

---
