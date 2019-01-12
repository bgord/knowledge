**Checkout the 5-th last branch from the checkout history**

`$ git checkout @{-5}`

---

**Remove changes from the last commit that were pushed to the repo (without rewriting history)**
```
$ git revert 13pooiavdfhi1
$ git push
```
It creates a commit that is exactly opposite to the one with the hash.
You can also revert a commit that revert a commit, so you are back when you were before the first revert.

---

**Show a list of all the modifications in the repo**

`$ git reflog`

---

**Move to the 9-th position on the `git reflog` list**

`$ git reset 'HEAD{9}'`

---

**Rename a current branch**

`$ git branch -m feature/new-name`

---

**Delete a branch**

`$ git branch -D feature/old`

---

**Assume that file is not changed and don't show it neither in the diff nor status**

`$ git update-index --assume-unchanged package.json`

---

**Assume that file IS changed and show it in the diff and status**

`$ git update-index --no-assume-unchanged package.json`

---

**Implicitly ignore files, but in a way that no one can see it (add to your root project)**

`$ echo "package.json" >> .git/info/exclude`

---

**Fix a typo in the commit message**

`$ git commit --amend`
`$ git commit --amend -m "a new message"`

---

**Git stash apply vs pop**

- `$ git stash apply` applies a stash, but doesn't delete it
- `$ git stash pop` applies a stash, and does delete it

---

**Diff staged changes**

`$ git diff --staged`

---

**Global .gitignore**

`$ git config --global core.excludesfile '~/.gitignore'`

---

**Checkout all the files**

`$ git checkout -- .`

---

**Setup an alias**

`$git config --global alias.co checkout`

---

**Unstaging changes**

The basic version of the `git reset` acts like the opposite of `git add`. It doesn't mess up with working tree.

`git reset <path>` unstages the path
`git reset` unstages everything

---

**Cherry-pick**

It applies one existing commit (instead of one or many as merge/rebase) to the existing branch. Useful for hotfixes, if someone has done them, and you just want to apply this particular commit to your branch.

`$ git cherry-pick <commit-hash>`

---
