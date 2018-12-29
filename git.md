**Checkout the 5-th last branch from the checkout history**

`$ git checkout @{-5}`

---

**Remove changes from the last commit that were pushed to the repo (without rewriting history)**
```
$ git revert 13pooiavdfhi1
$ git push
```
It creates a commit that is exactly opposite to the one with the hash

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

---
