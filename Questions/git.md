# 错误集合

## git 错误

#### 1.`fatal: unable to access 'https://github.com/.../': Empty reply from server`

先将本地仓库初始化，然后执行`git add .`，没有出现问题。

#### 2.远程推送失败

##### 问题描述

执行`git push origin master`,出错

```git
$ git push origin master
fatal: HttpRequestException encountered.
...
Username for 'https://github.com':
```

##### 问题分析

每次都需要输入用户名和密码是因为你采用的是 https 方式提交代码，如果采用的是 ssh 方式只需要在版本库中添加用户的 sha 的 key 就可以实现提交时无需输入用户名和密码。

##### 解决

补上用户名，随后输入密码。但是每次都要提交很麻烦，改 https 提交为 ssh 提交。

重新设置 ssh 提交：

```git
$ git remote rm origin
$ git remote add origin git@github.com:username/repository.git
$ git push -u origin master
```

#### 3.合并分支失败

##### 问题描述

在本地创建的一个分支 gh-pages，在 master 上合并该分支时报错：

```git
$ git merge gh-pages
fatal: refusing to merge unrelated histories
```

##### 问题分析

这是因为远程仓库 origin 上的分支 master 和本地分支 master 被 Git 认为是相同的仓库，可以直接合并；但 gh-pages 分支和本地分支 master 没有共同祖先，无法合并。

#### 4.`git push origin master` 错误

```git
fatal: 'origin' does not appear to be a git repository
fatal: Could not read from remote repository.

Please make sure you have the correct access rights and the repository exists.
```

在 GitHub 创建仓库后；然后`git pull origin`，再推；

#### 6.本地创建仓库关联 github 仓库，失败哦

##### 问题描述

在 GitHub 创建仓库，默认生成 README.md 文件，本地创建仓库，也生成 README.TXT 文件，提交后，执行

```git
$ git remote add origin git@github.com:richardmyu/learnGit.git
$ git push -u origin master
```

此时报错：

```git
To github.com:richardmyu/learngit.git
 ! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'git@github.com:richardmyu/learngit.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

根据提示：

`git pull origin`

```git
warning: no common commits
remote: Counting objects: 6, done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 6 (delta 0), reused 3 (delta 0), pack-reused 0
Unpacking objects: 100% (6/6), done.
From github.com:richardmyu/learngit
 * [new branch]      master     -> origin/master
You asked to pull from the remote 'origin', but did not specify
a branch. Because this is not the default configured remote
for your current branch, you must specify a branch on the command line.
```

再次执行推送：

```git
$ git push -u origin master
To github.com:richardmyu/learngit.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'git@github.com:richardmyu/learngit.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

##### 错误分析

GitHub 远程仓库中的 README.md 文件不在本地仓库中。 (是否就是说以后若本地仓库与远程仓库有不一样的时候，先拉取再推送)

##### 解决

```git
$ git pull --rebase origin master
$ git push -u origin master
```

#### 创建远程分支到本地出错

##### 问题描述

现在，你的小伙伴要在`dev`分支上开发，就必须创建远程`origin`的`dev`分支到本地，于是他用这个命令创建本地`dev`分支：

`$ git checkout -b dev origin/dev`

结果报错：

```git
fatal: Cannot update paths and switch to branch 'dev' at the same time.
Did you intend to checkout 'origin/dev' which can not be resolved as commit?
```

##### 问题分析

##### 解决

先：`git fetch`
再：`$ git checkout -b dev origin/dev`

#### pull 强制描述

##### 问题描述

两个分支各自修改代码，本地提交代码时，`git pull`失败，执行：

`$ git branch --set-upstream-to=origin/dev dev`

再次`git pull`，然后进入

```git
# Please enter a commit message to explain why this merge is necessary
# especiially if it merge an updated upstream into a topic branch
#...
~
```

##### 问题分析

##### 解决

先`Esc`，再`: wq`,强制退出；界面如下：

```git
$ git pull
Merge made by the 'recursive' strategy.
 test/msg.txt | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 test/msg.txt
```

#### 本地分支关联远程分支错误

##### 问题描述

关联本地分支与远程分支出错：

```git
$ git branch --set-upstream-to=origin/dev dev
warning: refname 'origin/dev' is ambiguous.
fatal: Ambiguous object name: 'origin/dev'.
```

##### 问题分析

创建的分支`origin/dev`是在`dev`分支下创建的

##### 解决

删除分支重来吧

还有其他办法吗？？？

#### `git pull`失败

##### 问题描述

克隆远程仓库，本地拉取

```git
fatal: Not a git repository (or any of the parent directories): .git
```

##### 问题分析

没有 fork 到自己的远程仓库

##### 解决

先 fork，再克隆

#### `git add .`报错

##### 问题描述

从远处仓库通过 ssh 方式克隆到本地，删除文件，执行 `git add .`报错：

```git
fatal: Not a git repository (or any of the parent directories): .git
```

##### 问题分析

没有 `.git` 文件

##### 解决

先初始化 `git init`

#### fatal error in commit_refs

#### 问题描述

提交代码报错：

```git
remote: Resolving deltas: 100% (5/5), completed with 3 local objects.
remote: fatal error in commit_refs
To github.com:richardmyu/learnRep.git
 ! [remote rejected] master -> master (failure)
error: failed to push some refs to 'git@github.com:richardmyu/learnRep.git'
```

##### 问题分析

打开对应仓库查看，页面返回 500，服务器错误
