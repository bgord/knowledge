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

`$ git reset 'HEAD@{9}'`

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

`$ git config --global alias.co checkout`

---

**Unstaging changes**

The basic version of the `git reset` acts like the opposite of `git add`. It doesn't mess up with working tree.

```
$ git reset <path>` // unstages the path
$ git reset` // unstages everything

```

---

**Resetting commits**

Possible syntaxes:

`$ git reset --soft/mixed/hard HEAD~2` (reset 2 commits, relatively to the HEAD)

`$ git reset --soft/mixed/hard c28e44` (reset to the specified commit hash)

`--soft` removes the commit(s), moves to the specified place, but leaves the changes made by those commits **staged**
`--mixed` removes the commit(s), moves to the specified place, and leaves the changes made by those commit unstaged, default
`--hard` removes the commit(s), doesn't leave anything, cleans working tree (uncommited changes too)

**Cherry-pick**

It applies one existing commit (instead of one or many as merge/rebase) to the existing branch. Useful for hotfixes, if someone has done them, and you just want to apply this particular commit to your branch.

`$ git cherry-pick <commit-hash>`

---

**Git clean**

`$ git clean` takes care of removing files/directories that are _untracked_ by git. It complements the `git checkout --` behaviour, which resets changes made by _tracked_ files only. Cleans the working tree.
It's advised to use it with `-i` - interactive mode.
It may worth adding a `-n` - dry run option sometimes.

---

**Including untracked files in git diff**

There's no standard way to do that. You need to add changes to the index, and then reset them.

---

**How to squash last n commits?**

Given that you want to squash 4 last commits, perform following steps:

`$ git reset --soft HEAD~4` to reset 4 last commits and put the changes from them to the index (staging)

`$ git commit -m "Squash last 4 commits"` to create a commit containing the staged changes

---

**What does it mean that two branches have diverged?**

It means that there some commits on the local `master` branch, that don't exist on the `origin/master` (or the other way).

```
--- A --- B --- C (origin/master)
          \
            --- D (master)
```

---

**What are the git areas?**

The Working tree
- the area when the work happens
- "untracked" area, it's only "seen"

The Staging area
- an area where changes are being tracked and saved after `git add`
- "index"

The Local repository
- everything in the `.git` directory
- changes moved here after commit

The hosting service repository
- an mirror of the local repository

---

**What does `git fetch` do?**

Gathers all the new commits, and branches/tags (collectively known as refs) from the remote(s) and stores them in the local repository, without touching a working tree. You can integrate those changes to the working tree by a `git merge`.

When using `git pull`, git tries to perform this two commands for you.

---

**What's a `..` operator in git diff?**

It's an equivalent of `git diff test master`.
It displays all the committed changes between two commits or branches, since branch is just a pointer to the specific commit.

You can compare the branch with the HEAD from n commits ago.

`$ git diff master..HEAD~3`

---

**How to "dry-run" common git commands?**

`$ git clean -i/-n`

`$ git push --dry-run`

---

**Ignore file that has been commited**

`$ git rm --cached file`

In `.gitignore`:
`file`

---

**How to diff file across two branches?**

`$ git diff 16db970 f6addeb workflow.md`

---

**What does setting upstream in `git push` do?**

It sets the default remote branch for the current branch, so git know what to do when you `push`, `fetch`, `pull`. The target of this commands will always be the currently checkouted branch.

`$ git push -u origin feature/inpu`

---

**How to remove edited/removed line from a git hunk that is about to get staged interactively?**

When in the hunk you want to interactively stage there's a line you want to exclude from the staging, and the hook cannot be split, press `e`.

To delete addition, remove an entire line (+).
To delete deletion, remove the `-` at the beginning of the line.

---

**How does `git rm` work?**

It's just a utility command, works the same way like `rm file.txt`, `git add file.txt`. Stages deletion of the file.

---

**How to display git graph history?**

`$ git log --graph --decorate --all --oneline`

---

**How does rebase work?**

`rebase` rewrites the git history, be careful when working with remote repository in a team.

Let's say I'm on a branch `feature` and there have been some new commits on a `master` since I branched out from it.

I want to change the base of the `feature` branch to be the latest `master` commit, not the one I branched out from.

(on the `feature` branch)
`$ git rebase master`

Git copies the content of the commits on the `feature` branch and puts them on top of the `master` branch.

It looks like the `feature` has branched out from the latest `master`, which was actually not a case, but the history says so.

But currently the HEAD pointer is pointing on the `feature` branch, so we need to make the `master` branch pointer point at the latest commit (from the `feature`) branch.

`$ git checkout master && git merge feature`

Merging is performed in the `fast-forward` fashion.

---

**How to diff current branch and the state from from n commits ago?**

`$ git diff HEAD~1`

---

**What is `git ls-files` command?**

A plumbing command is a git command that is rarely used by users, and more often by git itself.

List all tracked files (the staged ones are being tracked)
`$ git ls-files`

List tracked ignored files:
`$ git ls-files --ignored -exclude-standard`

List untracked ignored files:
`$ git ls-files --others`

List untracked ignored files:
`$ git ls-files --other --ignored --exclude-standard`

List untracked and not ignored files:
`$ git  ls-files --other --exclude-standard`

---

**How to stage ignored file?**

If a file is matching a .gitignore rule, it's ignored, but still can be tracked.

`$ git add -f file`

---
