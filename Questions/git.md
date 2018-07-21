### GIT 

本篇记录学习或使用 git 的过程中遇到的问题，并附有解决方案，以备后用。

##### 1.GitHub does not provide shell access

问题描述：

```
$ git remote add origin git@github.com:xx/xxx.git
fatal: remote origin already exists.

$ git push -u origin master
fatal: 'xxx' does not appear to be a git repository
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.

$ ssh -T git@github.com
Hi xx! You've successfully authenticated, but GitHub does not provide shell access.
```

解决：

Try and redefine the ssh url for remote origin:

`git remote set-url origin git@github.com:lut/EvolutionApp.git`

参考：
[Github Authentication Failed … ](https://stackoverflow.com/questions/26953071/github-authentication-failed-github-does-not-provide-shell-access)

