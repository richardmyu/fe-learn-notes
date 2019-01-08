# GIT系统学习

## 版本控制

### 一. 什么是版本控制

**版本控制是一种记录一个或若干文件内容变化，以便将来查阅特定版本修订情况的系统**。

有了版本控制系统(VCS)你就可以将某个文件回溯到之前的状态，甚至将整个项目都回退到过去某个时间点的状态。

#### 1. 本地版本控制系统

人们很久以前就开发了许多种本地版本控制系统，大多都是采用某种简单的数据库来记录文件的历次更新差异。
![Alt text](./git-3.png)

其中最流行的一种叫做 `rcs`，现今许多计算机系统上都还看得到它的踪影。甚至在流行的 Mac OS X 系统上安装了开发者工具包之后，也可以使用 `rcs` 命令。

它的工作原理基本上就是保存并管理文件补丁（patch）。文件补丁是一种特定格式的文本文件，记录着对应文件修订前后的内容变化。所以，根据每次修订后的补丁，rcs 可以通过不断打补丁，计算出各个版本的文件内容。

#### 2. 集中化的版本控制系统

接下来人们又遇到一个问题，如何让在不同系统上的开发者协同工作？于是，集中化的版本控制系统（ Centralized Version Control Systems，简称 CVCS ）应运而生。这类系统，诸如 CVS，Subversion 以及 Perforce 等，都有一个单一的集中管理的服务器，保存所有文件的修订版本，而协同工作的人们都通过客户端连到这台服务器，取出最新的文件或者提交更新。多年以来，这已成为版本控制系统的标准做法。
![Alt text](./git-4.png)

这种做法带来了许多好处，特别是相较于老式的本地 VCS 来说。现在，每个人都可以在一定程度上看到项目中的其他人正在做些什么。而管理员也可以轻松掌控每个开发者的权限，并且管理一个 CVCS 要远比在各个客户端上维护本地数据库来得轻松容易。

这么做最显而易见的缺点是中央服务器的单点故障。如果*宕机*

	宕机，指操作系统无法从一个严重系统错误中恢复过来，或系统硬件层面出问题，以致系统长时间无响应，而不得不重新启动计算机的现象。它属于电脑运作的一种正常现象，任何电脑都会出现这种情况。

则谁都无法提交更新，也就无法协同工作。最坏的情况是彻底丢失整个项目的所有历史更改记录，而被客户端偶然提取出来的保存在本地的某些快照数据就成了恢复数据的希望。

本地版本控制系统也存在类似问题，只要整个项目的历史记录被保存在单一位置，就有丢失所有历史更新记录的风险。

#### 3. 分布式版本控制系统

于是分布式版本控制系统（ Distributed Version Control System，简称 DVCS ）面世了。在这类系统中，像 Git，Mercurial，Bazaar 以及 Darcs 等，**客户端并不只提取最新版本的文件快照，而是把代码仓库完整地镜像下来**。

	镜像（Mirroring）是冗余的一种类型，一个磁盘上的数据在另一个磁盘上存在一个完全相同的副本即为镜像。

这么一来，任何一处协同工作用的服务器发生故障，事后都可以用任何一个镜像出来的本地仓库恢复。因为每一次的提取操作，实际上都是一次对代码仓库的完整备份。
![Alt text](./git-5.png)

更进一步，许多这类系统都可以指定和若干不同的远端代码仓库进行交互。你可以根据需要设定不同的协作流程，比如*层次模型式的工作流*，而这在以前的集中式系统中是无法实现的。

	用树型（层次）结构表示实体类型及实体间联系的数据模型称为层次模型(Hierarchical Model)。

	WfMC对工作流的定义：
	工作流是一类能够完全或者部分自动执行的经营过程，它根据一系列过程规则、文档、信息或任务能够在不同的执行者之间进行传递与执行。

### 二. GIT基础简介

Git 究竟是怎样的一个系统呢？请注意，接下来的内容非常重要，若是理解了 Git 的思想和基本工作原理，用起来就会知其所以然，游刃有余。在开始学习 Git 的时候，请不要尝试把各种概念和其他版本控制系统（诸如 Subversion 和 Perforce 等）相比拟，否则容易混淆每个操作的实际意义。Git 在保存和处理各种信息的时候，虽然操作起来的命令形式非常相近，但它与其他版本控制系统的做法颇为不同。理解这些差异将有助于你准确地使用 Git 提供的各种工具。

#### 1. 直接记录快照，而非差异比较

Git 和其他版本控制系统的主要差别在于，**Git 只关心文件数据的整体是否发生变化**，即Git 并不保存这些前后变化的差异数据；而大多数其他系统则只关心文件内容的具体差异。

实际上，Git 更像是把变化的文件作快照后，记录在一个微型的文件系统中。每次提交更新时，它会纵览一遍所有文件的指纹信息并对文件作一快照，然后**保存一个指向这次快照的索引**。为提高性能，若文件没有变化，Git 不会再次保存，而只对上次保存的快照作一链接。
![Alt text](./git-7.png)

#### 2. 近乎所有操作都是本地执行

在 Git 中的绝大多数操作都只需要访问本地文件和资源，不用连网。因为 Git 在本地磁盘上就保存着所有当前项目的历史更新。

#### 3. 时刻保持数据完整性

**在保存到 Git 之前，所有数据都要进行内容的校验和（checksum）**

	检验和，在数据处理和数据通信领域中，用于校验目的地一组数据项的和。它通常是以十六进制为数制表示的形式。如果校验和的数值超过十六进制的FF，也就是255. 就要求其补码作为校验和。通常用来在通信中，尤其是远距离通信中保证数据的完整性和准确性。

**计算，并将此结果作为数据的唯一标识和索引**。这项特性作为 Git 的设计哲学，建在整体架构的最底层。所以如果文件在传输时变得不完整，或者磁盘损坏导致文件数据缺失，Git 都能立即察觉。

Git 使用 SHA-1 算法计算数据的校验和，通过对文件的内容或目录的结构计算出一个 SHA-1 哈希值，作为指纹字符串。

Git 的工作完全依赖于这类指纹字串，所以你会经常看到这样的哈希值。**实际上，所有保存在 Git 数据库中的东西都是用此哈希值来作索引的，而不是靠文件名**。

#### 4. 多数操作仅添加数据

**常用的 Git 操作大多仅仅是把数据添加到数据库**。因为任何一种不可逆的操作，比如删除数据，都会使回退或重现历史版本变得困难重重。在 Git 里，一旦提交快照之后就完全不用担心丢失数据，特别是养成定期推送到其他仓库的习惯的话。

#### 5. 文件的三种状态

对于任何一个文件，在 Git 内都只有三种状态：已提交（committed），已修改（modified）和已暂存（staged）。

	已提交表示该文件已经被安全地保存在本地数据库中了；已修改表示修改了某个文件，但还没有提交保存；已暂存表示把已修改的文件放在下次提交时要保存的清单中。

由此我们看到 Git 管理项目时，文件流转的三个工作区域：Git 的工作目录，暂存区域，以及本地仓库。
![Alt text](./git-8.png)

每个项目都有一个 Git 目录（译注：如果 git clone 出来的话，就是其中 .git 的目录；如果 git clone --bare 的话，新建的目录本身就是 Git 目录。），它是 Git 用来保存元数据和对象数据库的地方。该目录非常重要，每次克隆镜像仓库的时候，实际拷贝的就是这个目录里面的数据。

从项目中取出某个版本的所有文件和目录，用以开始后续工作的叫做**工作目录**。这些文件实际上都是从 Git 目录中的压缩对象数据库中提取出来的，接下来就可以在工作目录中对这些文件进行编辑。

所谓的暂存区域只不过是个简单的文件，一般都放在 Git 目录中。有时候人们会把这个文件叫做索引文件，不过标准说法还是叫暂存区域。

基本的 Git 工作流程如下：

	1.在工作目录中修改某些文件。
	2.对修改后的文件进行快照，然后保存到暂存区域。
	3.提交更新，将保存在暂存区域的文件快照永久转储到 Git 目录中。

所以，我们可以从文件所处的位置来判断状态：如果是 Git 目录中保存着的特定版本文件，就属于已提交状态；如果作了修改并已放入暂存区域，就属于已暂存状态；如果自上次取出后，作了修改但还没有放到暂存区域，就是已修改状态。

#### 6. 初次运行 Git 前的配置

一般在新的系统上，我们都需要先配置下自己的 Git 工作环境。配置工作只需一次，以后升级时还会沿用现在的配置。当然，如果需要，你随时可以用相同的命令修改已有的配置。

Git 提供了一个叫做 `git config` 的工具（译注：实际是 `git-config` 命令，只不过可以通过 git 加一个名字来呼叫此命令。），专门用来配置或读取相应的工作环境变量。而正是由这些**环境变量，决定了 Git 在各个环节的具体工作方式和行为**。这些变量可以存放在以下三个不同的地方：

```javascript
/etc/gitconfig 文件：系统中对所有用户都普遍适用的配置。若使用 git config 时用 --system 选项，读写的就是这个文件。

~/.gitconfig 文件：用户目录下的配置文件只适用于该用户。若使用 git config 时用 --global 选项，读写的就是这个文件。

当前项目的 Git 目录中的配置文件（也就是工作目录中的 .git/config 文件）：这里的配置仅仅针对当前项目有效。每一个级别的配置都会覆盖上层的相同配置，所以 .git/config 里的配置会覆盖 /etc/gitconfig 中的同名变量。
```

在 Windows 系统上，Git 会找寻用户主目录下的 .gitconfig 文件。主目录即 `$HOME` 变量指定的目录，一般都是 `C:\Documents and Settings\$USER`。此外，Git 还会尝试找寻 `/etc/gitconfig` 文件，只不过看当初 Git 装在什么目录，就以此作为根目录来定位。

#### 7. 用户信息

第一个要配置的是你个人的用户名称和电子邮件地址。这两条配置很重要，每次 Git 提交时都会引用这两条信息，说明是谁提交了更新，所以会随更新内容一起被永久纳入历史记录：

```javascript
$ git config --global user.name "xxx"
$ git config --global user.email xxx@xx.xx
```

如果用了 `--global` 选项，那么更改的配置文件就是位于你用户主目录下的那个，以后你所有的项目都会默认使用这里配置的用户信息。如果要在某个特定的项目中使用其他名字或者电邮，只要去掉 `--global` 选项重新配置即可，新的设定保存在当前项目的 `.git/config` 文件里。

#### 8. 文本编辑器

Git 需要你输入一些额外消息的时候，会自动调用一个外部文本编辑器给你用。默认会使用操作系统指定的默认编辑器，一般可能会是 Vi 或者 Vim。如果你有其他偏好，比如 Emacs 的话，可以重新设置：
`$ git config --global core.editor emacs`

#### 9. 差异分析工具

还有一个比较常用的是，在解决合并冲突时使用哪种差异分析工具。比如要改用 `vimdiff` 的话：

`$ git config --global merge.tool vimdiff`

#### 10. 查看配置信息

要检查已有的配置信息，可以使用 git config --list 命令：

```javascript
$ git config --list
user.name=xxx
user.email=xxx@xx.com
...
```

有时候会看到重复的变量名，那就说明它们来自不同的配置文件（比如 `/etc/gitconfig` 和 `~/.gitconfig`），不过最终 Git 实际采用的是最后一个。

也可以直接查阅某个环境变量的设定，只要把特定的名字跟在后面即可，像这样：

```javascript
$ git config user.name
xxx
```

#### 11. 获取帮助

想了解 Git 的各式工具该怎么用，可以阅读它们的使用帮助，方法有三：

```javascript
$ git help <verb>  //在webstorm打开对应的HTML
$ git <verb> --help  //在webstorm打开对应的HTML
$ man git-<verb>  //bash: man: command not found
```

### 三. GIT基础

#### 1. 取得项目的 Git 仓库

有两种取得 Git 项目仓库的方法。第一种是在现存的目录下，通过导入所有文件来创建新的 Git 仓库。第二种是从已有的 Git 仓库克隆出一个新的镜像仓库来。

##### 1.1 在工作目录中初始化新仓库

要对现有的某个项目开始用 Git 管理，只需到此项目所在的目录，执行：
`$ git init`

初始化后，在当前目录下会出现一个名为 `.git` 的目录(隐藏)，所有 Git 需要的数据和资源都存放在这个目录中。不过目前，仅仅是按照既有的结构框架初始化好了里边所有的文件和目录，但我们还没有开始跟踪管理项目中的任何一个文件。

如果当前目录下有几个文件想要纳入版本控制，需要先用 `git add` 命令告诉 Git 开始对这些文件进行跟踪，然后提交：

```javascript
$ git add //所有
$ git add README // 文件夹
$ git add README.txt // 文档
```

##### 1.2 从现有仓库克隆

如果想对某个开源项目出一份力，可以先把该项目的 Git 仓库复制一份出来，这就需要用到 `git clone` 命令。**Git 收取的是项目历史的所有数据（每一个文件的每一个版本）**，服务器上有的数据克隆之后本地也都有了。

克隆仓库的命令格式为 `git clone [url]`。比如，要克隆 Ruby 语言的 Git 代码仓库 Grit，可以用下面的命令：
`$ git clone git://github.com/schacon/grit.git`

这会在当前目录下创建一个名为grit的目录，其中包含一个 `.git` 的目录，用于保存下载下来的所有版本记录，然后从中取出最新版本的文件拷贝。如果进入这个新建的 grit 目录，你会看到项目中的所有文件已经在里边了，准备好后续的开发和使用。如果希望在克隆的时候，自己定义要新建的项目目录名称，可以在上面的命令末尾指定新的名字：

`$ git clone git://github.com/schacon/grit.git mygrit`

#### 2. 记录每次更新到仓库

工作目录下面的所有文件都不外乎这两种状态：已跟踪或未跟踪。已跟踪的文件是指本来就被纳入版本控制管理的文件，在上次快照中有它们的记录，工作一段时间后，它们的状态可能是未更新，已修改或者已放入暂存区。而所有其他文件都属于未跟踪文件。它们既没有上次更新时的快照，也不在当前的暂存区域。

> 初次克隆某个仓库时，工作目录中的所有文件都属于已跟踪文件，且状态为未修改。

在编辑过某些文件之后，Git 将这些文件标为已修改。我们逐步把这些修改过的文件放到暂存区域，直到最后一次性提交所有这些暂存起来的文件，如此重复。所以使用 Git 时的文件状态变化周期如图所示。
![Alt text](./git-9.png)


##### 2.1 检查当前文件状态

要确定哪些文件当前处于什么状态，可以用 `git status` 命令。如果在克隆仓库之后立即执行此命令，会看到类似这样的输出：

```javascript
$ git status
On branch master  //所处分支
nothing to commit, working directory clean
```

这说明你现在的工作目录相当干净。换句话说，所有已跟踪文件在上次提交后都未被更改过。此外，上面的信息还表明，当前目录下没有出现任何处于未跟踪的新文件，否则 Git 会在这里列出来。最后，该命令还显示了当前所在的分支是 master，这是默认的分支名称，实际是可以修改的。

创建一个新文件 README，保存退出后运行 `git status` 会看到该文件出现在未跟踪文件列表中：

```javascript
$ git status
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)

        README

nothing added to commit but untracked files present (use "git add" to track)
```

在状态报告中可以看到新建的README文件出现在“Untracked files”下面。未跟踪的文件意味着Git在之前的**快照（提交**）中没有这些文件；Git 不会自动将之纳入跟踪范围，除非指定要跟踪该文件。

##### 2.2 跟踪新文件

使用命令 `git add` 开始跟踪一个新文件。所以，要跟踪 README 文件，运行(可以加上路径，用以确定需要跟踪的目标文件)：

`$ git add README`

此时再运行 `git status` 命令，会看到 README 文件已被跟踪，并处于暂存状态：

```javascript
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   README
```

只要在 “Changes to be committed” 这行下面的，就说明是已暂存状态。如果此时提交，那么该文件此时此刻的版本将被留存在历史记录中。

你可能会想起之前我们使用 `git init` 后就运行了 `git add` 命令，开始跟踪当前目录下的所有文件。在 `git add` 后面可以指明要跟踪的文件或目录路径。如果是目录的话，就说明要递归跟踪该目录下的所有文件。（译注：**其实 `git add` 的潜台词就是把目标文件快照放入暂存区域**，也就是 add file into staged area，同时未曾跟踪过的文件标记为需要跟踪。这样就好理解后续 add 操作的实际意义了。）

##### 2.3 暂存已修改文件

现在我们修改下之前已跟踪过的文件 `num.txt`，然后再次运行 `status` 命令，会看到这样的状态报告：

```javascript
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   README/num.txt

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   README/num.txt
```

文件 `num.txt` 出现在 “Changes not staged for commit” 这行下面，说明已跟踪文件的内容发生了变化，但还没有放到暂存区。要暂存这次更新，需要运行 `git add` 命令（这是个多功能命令，根据目标文件的状态不同，此命令的效果也不同）。

`num.txt`文件出现了两次！一次算未暂存，一次算已暂存，实际上 Git 只不过暂存了你运行 `git add` 命令时的版本，如果现在提交，那么提交的是添加注释前的版本，而非当前工作目录中的版本。所以，运行了 `git add` 之后又作了修订的文件，需要重新运行 `git add` 把最新版本重新暂存起来。

##### 2.4 忽略某些文件

一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文件，比如日志文件，或者编译过程中创建的临时文件等。我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件模式。来看一个实际的例子：

```javascript
$ cat .gitignore
*.[oa]
*~
```

第一行告诉 Git 忽略所有以 `.o` 或 `.a` 结尾的文件。一般这类对象文件和存档文件都是编译过程中出现的，我们用不着跟踪它们的版本。第二行告诉 Git 忽略所有以波浪符（`~`）结尾的文件，许多文本编辑软件（比如 Emacs）都用这样的文件名保存副本。此外，你可能还需要忽略 log，tmp 或者 pid 目录，以及自动生成的文档等等。要养成一开始就设置好 `.gitignore` 文件的习惯，以免将来误提交这类无用的文件。


##### 2.5 查看已暂存和未暂存的更新

实际上 `git status` 的显示比较简单，仅仅是列出了修改过的文件，如果要查看具体修改了什么地方，可以用 `git diff` 命令。 `git diff` 会使用文件补丁的格式显示具体添加和删除的行。

假如再次编辑 num.txt 文件后先别暂存，要查看尚未暂存的文件更新了哪些部分，不加参数直接输入 `git diff`：

```javascript
$ git diff
diff --git a/REDAME/num.txt b/REDAME/num.txt
index d800886..156626c 100644
--- a/REDAME/num.txt
+++ b/REDAME/num.txt
@(工具)[git]@ -1 +1,2 @@
-123
\ No newline at end of file
+123
+456
\ No newline at end of file
```

此命令比较的是工作目录中当前文件和暂存区域快照之间的差异，也就是修改之后还没有暂存起来的变化内容。

若要看已经暂存起来的文件和上次提交时的快照之间的差异，可以用 `git diff --cached` 命令。（Git 1.6.1 及更高版本还允许使用 `git diff --staged`，效果是相同的，但更好记些。）来看看实际的效果：

```javascript
$ git diff --cached
diff --git a/REDAME/num.txt b/REDAME/num.txt
new file mode 100644
index 0000000..d800886
--- /dev/null
+++ b/REDAME/num.txt
@@ -0,0 +1 @@
+123
\ No newline at end of file

$ git diff --staged
diff --git a/REDAME/num.txt b/REDAME/num.txt
new file mode 100644
index 0000000..d800886
--- /dev/null
+++ b/REDAME/num.txt
@@ -0,0 +1 @@
+123
\ No newline at end of file

```

请注意，单单 `git diff` 不过是显示还没有暂存起来的改动，而不是这次工作和上次提交之间的差异。所以有时候你一下子暂存了所有更新过的文件后，运行 `git diff` 后却什么也没有，就是这个原因。


##### 2.6 提交更新

现在的暂存区域已经准备妥当可以提交了。在此之前，请一定要确认还有什么修改过的或新建的文件还没有 `git add` 过，否则提交的时候不会记录这些还没暂存起来的变化。所以，每次准备提交前，先用 `git status` 看下，是不是都已暂存起来了，然后再运行提交命令 `git commit`。这种方式会启动文本编辑器以便输入本次提交的说明。

编辑器会显示类似下面的文本信息（本例选用 Vim 的屏显方式展示）：

```javascript
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# On branch master
# Changes to be committed:
#       new file:   README/num.txt
#
#
~
~
~
".git/COMMIT_EDITMSG" 10L, 283C
```

可以看到，默认的提交消息包含最后一次运行 `git status` 的输出，放在注释行里，另外开头还有一空行，供你输入提交说明。你完全可以去掉这些注释行，不过留着也没关系，多少能帮你回想起这次更新的内容有哪些。（如果觉得这还不够，可以用 `-v` 选项将修改差异的每一行都包含到注释中来。）退出编辑器时，Git 会丢掉注释行，将说明内容和本次更新提交到仓库。

> 退出vim编辑器：ESC+ZZ；

另外也可以用 `-m` 参数后跟提交说明的方式，在一行命令中提交更新：

```javascript
$ git commit -m'num1 commit'
[master 224129c] num1 commit
 1 file changed, 2 insertions(+)
 create mode 100644 REDAME/num.txt

```

好，现在你已经创建了第一个提交！可以看到，提交后它会告诉你，当前是在哪个分支（master）提交的，本次提交的完整 SHA-1 校验和是什么（463dc4f），以及在本次提交中，有多少文件修订过，多少行添改和删改过。

> 记住，提交时记录的是放在暂存区域的快照，任何还未暂存的仍然保持已修改状态，可以在下次提交时纳入版本管理。每一次运行提交操作，都是对你项目作一次快照，以后可以回到这个状态，或者进行比较。

##### 2.7 跳过使用暂存区域

尽管使用暂存区域的方式可以精心准备要提交的细节，但有时候这么做略显繁琐。Git 提供了一个跳过使用暂存区域的方式，只要在提交的时候，给 `git commit` 加上 `-a` 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 `git add` 步骤：

```javascript
$ git commit -a -m"num2 commit"
[master f0238a7] num2 commit
 1 file changed, 2 insertions(+), 1 deletion(-)
```

##### 2.8 移除文件

要从 Git 中移除某个文件，就必须要从已跟踪文件清单中移除（确切地说，是从暂存区域移除），然后提交。可以用 `git rm` 命令完成此项工作，并连带从工作目录中删除指定的文件，这样以后就不会出现在未跟踪文件清单中了。

如果只是简单地从工作目录中人工删除文件，运行 `git status` 时就会在 “Changes not staged for commit” 部分（也就是未暂存清单）看到：

```javascript
$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        deleted:    grit.gemspec

no changes added to commit (use "git add" and/or "git commit -a")
```

然后再运行 `git rm` 记录此次移除文件的操作：

```javascript
$ git rm REDAME/num.txt
rm 'REDAME/num.txt'

$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        deleted:    REDAME/num.txt
```

最后提交的时候，该文件就不再纳入版本管理了。如果删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除选项 `-f`（译注：即 force 的首字母），以防误删除文件后丢失修改的内容。

另外一种情况是，我们想把文件从 Git 仓库中删除（亦即从暂存区域移除），但仍然希望保留在当前工作目录中。换句话说，仅是从跟踪清单中删除。比如一些大型日志文件或者一堆 `.a` 编译文件，不小心纳入仓库后，要移除跟踪但不删除文件，以便稍后在 `.gitignore` 文件中补上，用 `--cached` 选项即可：

`$ git rm --cached readme.txt`

后面可以列出文件或者目录的名字，也可以使用 glob 模式。比方说：

`$ git rm log/\*.log`

注意到星号 `*` 之前的反斜杠 `\`，因为 Git 有它自己的文件模式扩展匹配方式。此命令删除所有 `log/` 目录下扩展名为 `.log` 的文件。

##### 2.9 移动文件

Git 并不跟踪文件移动操作。如果在 Git 中重命名了某个文件，仓库中存储的元数据并不会体现出这是一次改名操作。

既然如此，当你看到 Git 的 `mv` 命令时一定会困惑不已。要在 Git 中对文件改名(无法操作文件夹？？？)，可以这么做：

`$ git mv file_from file_to`

它会恰如预期般正常工作。实际上，即便此时查看状态信息，也会明白无误地看到关于重命名操作的说明：

```javascript
$ git mv README.txt README
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        renamed:    README.txt -> README
```

其实，运行 `git mv` 就相当于运行了下面三条命令：

```javascript
$ mv README.txt README
$ git rm README.txt
$ git add README
```

如此分开操作，Git 也会意识到这是一次改名，所以不管何种方式都一样。当然，直接用 `git mv` 轻便得多，不过有时候用其他工具批处理改名的话，要记得在提交前删除老的文件名，再添加新的文件名。

#### 3. 查看提交历史

在提交了若干更新之后，又或者克隆了某个项目，想回顾下提交历史，可以使用 `git log` 命令查看。

然后在此项目中运行 `git log`，应该会看到下面的输出：

```javascript
$ git log
commit f0238a70e1e313525516ae80989c3da38632f3a6 (HEAD -> master)
Author: richardmyu <2322884749@qq.com>
Date:   Fri Feb 2 04:10:05 2018 +0800

    num2 commit

...

    initial project version

```

默认不用任何参数的话，`git log` 会按提交时间列出所有的更新，最近的更新排在最上面。

我们常用 `-p` 选项展开显示每次提交的内容差异，用 `-2` 则仅显示最近的两次更新：

```javascript
$ git log -p -2
commit f0238a70e1e313525516ae80989c3da38632f3a6 (HEAD -> master)
Author: richardmyu <2322884749@qq.com>
Date:   Fri Feb 2 04:10:05 2018 +0800

    num2 commit

diff --git a/REDAME/num.txt b/REDAME/num.txt
index 156626c..0eb7e4c 100644
--- a/REDAME/num.txt
+++ b/REDAME/num.txt
@@ -1,2 +1,3 @@
 123
-456
\ No newline at end of file
+456
+789
\ No newline at end of file

commit 224129cdb620123228ae0fd20564b280af361de7
Author: richardmyu <2322884749@qq.com>
Date:   Fri Feb 2 04:05:07 2018 +0800

    num1 commit
:

```

在做代码审查，或者要快速浏览其他协作者提交的更新都作了哪些改动时，就可以用这个选项。此外，还有许多摘要选项可以用，比如 `--stat`，仅显示简要的增改行数统计：

```javascript
$ git log --stat
commit f0238a70e1e313525516ae80989c3da38632f3a6 (HEAD -> master)
Author: richardmyu <2322884749@qq.com>
Date:   Fri Feb 2 04:10:05 2018 +0800

    num2 commit

 REDAME/num.txt | 3 ++-
 1 file changed, 2 insertions(+), 1 deletion(-)

commit 224129cdb620123228ae0fd20564b280af361de7
Author: richardmyu <2322884749@qq.com>
Date:   Fri Feb 2 04:05:07 2018 +0800

    num1 commit

 REDAME/num.txt | 2 ++
 1 file changed, 2 insertions(+)

commit ac2d59fb0a812d4626efbaf60400c0efda27a239
Author: richardmyu <2322884749@qq.com>
Date:   Fri Feb 2 02:49:41 2018 +0800

    initial project version
:

```

每个提交都列出了修改过的文件，以及其中添加和移除的行数，并在最后列出所有增减行数小计。还有个常用的 `--pretty` 选项，可以指定使用完全不同于默认格式的方式展示提交历史。比如用 oneline 将每个提交放在一行显示，这在提交数很大时非常有用。另外还有 short，full 和 fuller 可以用，展示的信息或多或少有些不同。

```javascript
$ git log --pretty=oneline
f0238a70e1e313525516ae80989c3da38632f3a6 (HEAD -> master) num2 commit
224129cdb620123228ae0fd20564b280af361de7 num1 commit
ac2d59fb0a812d4626efbaf60400c0efda27a239 initial project version
```

但最有意思的是 format，可以定制要显示的记录格式，这样的输出便于后期编程提取分析，像这样：

```javascript
$ git log --pretty=format:"%h - %an, %ar:%s"
f0238a7 - richardmyu, 18 hours ago:num2 commit
224129c - richardmyu, 18 hours ago:num1 commit
ac2d59f - richardmyu, 20 hours ago:initial project version
```

你一定奇怪作者（author）和提交者（committer）之间究竟有何差别，其实作者指的是实际作出修改的人，提交者指的是最后将此工作成果提交到仓库的人。

用 oneline 或 format 时结合 `--graph` 选项，可以看到开头多出一些 ASCII 字符串表示的简单图形，形象地展示了每个提交所在的分支及其分化衍合情况。

```javascript
$ git log --pretty=format:"%h %s" --graph
* f0238a7 num2 commit
* 224129c num1 commit
* ac2d59f initial project version
```

##### 3.1 限制输出长度

除了定制输出格式的选项之外，`git log` 还有许多非常实用的限制输出长度的选项，也就是只输出部分提交信息。之前我们已经看到过 `-2` 了，它只显示最近的两条提交，实际上，这是 `-<n>` 选项的写法，其中的 n 可以是任何自然数，表示仅显示最近的若干条提交。不过实践中我们是不太用这个选项的，Git 在输出所有提交时会自动调用分页程序（less），要看更早的更新只需翻到下页即可。

另外还有按照时间作限制的选项，比如 `--since` 和 `--until`。下面的命令列出所有最近两周内的提交：

`$ git log --since=2.weeks`

你可以给出各种时间格式，比如说具体的某一天（“2008-01-15”），或者是多久以前（“2 years 1 day 3 minutes ago”）。

还可以给出若干搜索条件，列出符合的提交。用 `--author` 选项显示指定作者的提交，用 `--grep` 选项搜索提交说明中的关键字。（请注意，如果要得到同时满足这两个选项搜索条件的提交，就必须用 `--all-match` 选项。否则，满足任意一个条件的提交都会被匹配出来）

另一个真正实用的`git log`选项是路径(path)，如果只关心某些文件或者目录的历史提交，可以在 `git log` 选项的最后指定它们的路径。因为是放在最后位置上的选项，所以用两个短划线（`--`）隔开之前的选项和后面限定的路径名。

|选项| 说明|
|:--:|--|
|-(n)| 仅显示最近的 n 条提交|
|--since, --after| 仅显示指定时间之后的提交|
|--until, --before| 仅显示指定时间之前的提交|
|--author| 仅显示指定作者相关的提交|
|--committer| 仅显示指定提交者相关的提交|

来看一个实际的例子，如果要查看 Git 仓库中，2008 年 10 月期间，Junio Hamano 提交的但未合并的测试脚本（位于项目的 t/ 目录下的文件），可以用下面的查询命令：

```javascript
$ git log --pretty="%h - %s" --author=gitster --since="2008-10-01" \
    --before="2008-11-01" --no-merges -- t/
    5610e3b - Fix testcase failure when extended attribute
    acd3b9e - Enhance hold_lock_file_for_{update,append}()
    f563754 - demonstrate breakage of detached checkout wi
    d1a43f2 - reset --hard/read-tree --reset -u: remove un
    51a94af - Fix "checkout --track -b newbranch" on detac
    b0ad11e - pull: allow "git pull origin $something:$cur
```

Git 项目有 20,000 多条提交，但我们给出搜索选项后，仅列出了其中满足条件的 6 条。

##### 3.2 使用图形化工具查阅提交历史

有时候图形化工具更容易展示历史提交的变化，随 Git 一同发布的 gitk 就是这样一种工具。它是用 Tcl/Tk 写成的，基本上相当于 git log 命令的可视化版本，凡是 git log 可以用的选项也都能用在 gitk 上。在项目工作目录中输入 gitk 命令后，就会启动图 2-2 所示的界面。

![Alt text](./git-10.png)


上半个窗口显示的是历次提交的分支祖先图谱，下半个窗口显示当前点选的提交对应的具体差异。

#### 4. 撤消操作

##### 4.1 修改最后一次提交

有时候我们提交完了才发现漏掉了几个文件没有加，或者提交信息写错了。想要撤消刚才的提交操作，可以使用 `--amend` 选项重新提交：

`$ git commit --amend`

此命令将使用当前的暂存区域快照提交。如果刚才提交完没有作任何改动，直接运行此命令的话，相当于有机会重新编辑提交说明，但将要提交的文件快照和之前的一样。

启动文本编辑器后，会看到上次提交时的说明，编辑它确认没问题后保存退出，就会使用新的提交说明覆盖刚才失误的提交。

如果刚才提交时忘了暂存某些修改，可以先补上暂存操作，然后再运行 `--amend` 提交：

```javascript
$ git commit -m 'initial commit'
$ git add forgotten_file
$ git commit --amend
```

上面的三条命令最终只是产生一个提交，第二个提交命令修正了第一个的提交内容。

##### 4.2 取消已经暂存的文件

如何取消暂存区域中的文件，以及如何取消工作目录中已修改的文件。来看下面的例子，有两个修改过的文件，我们想要分开提交，但不小心用 `git add .` 全加到了暂存区域。该如何撤消暂存其中的一个文件呢？其实，`git status` 的命令输出已经告诉了我们该怎么做，就在 “Changes to be committed” 下面，括号中有提示，可以使用 `git reset HEAD <file>...` 的方式取消暂存。

```
$ git reset HEAD numb.txt

```

这条命令看起来有些古怪，先别管，能用就行。现在文件又回到了之前已修改未暂存的状态。

##### 4.3 取消对文件的修改

如果觉得对刚才的文件的修改完全没有必要，该如何取消修改，回到之前的状态（也就是修改之前的版本）呢？`git status` 同样提示了具体的撤消方法，接着上面的例子，现在未暂存区域看起来像这样：

```javascript
# Changes not staged for commit:
    # (use "git add <file>..." to update what will be committed)
    # (use "git checkout -- <file>..." to discard changes in working directory)
    #
    # modified: numb.txt
    #
```

在第二个括号中，我们看到了抛弃文件修改的命令（至少在 Git 1.6.1 以及更高版本中会这样提示），让我们试试看：

```javascript
$ git checkout -- num/numb.txt
```

可以看到，该文件已经恢复到修改前的版本。

你可能已经意识到了，这条命令有些危险，所有对文件的修改都没有了，因为我们刚刚把之前版本的文件复制过来重写了此文件。所以在用这条命令前，请务必确定真的不再需要保留刚才的修改。如果只是想回退版本，同时保留刚才的修改以便将来继续工作，可以用下章介绍的 stashing 和分支来处理，应该会更好些。

记住，任何已经提交到 Git 的都可以被恢复。即便在已经删除的分支中的提交，或者用 `--amend` 重新改写的提交，都可以被恢复。所以，你可能失去的数据，仅限于没有提交过的，对 Git 来说它们就像从未存在过一样。

#### 5. 远程仓库的使用

要参与任何一个 Git 项目的协作，必须要了解该如何管理远程仓库。远程仓库是指托管在网络上的项目仓库，可能会有好多个，其中有些你只能读，另外有些可以写。同他人协作开发某个项目时，需要管理这些远程仓库，以便推送或拉取数据，分享各自的工作进展。管理远程仓库的工作，包括添加远程库，移除废弃的远程库，管理各式远程库分支，定义是否跟踪这些分支，等等。

##### 5.1 查看当前的远程库
要查看当前配置有哪些远程仓库，可以用 `git remote` 命令，它会列出每个远程库的简短名字。在克隆完某个项目后，至少可以看到一个名为 origin 的远程库，Git 默认使用这个名字来标识你所克隆的原始仓库：

```javascript
$ git clone git://github.com/schacon/ticgit.git
    ...

$ cd ticgit
$ git remote
    origin
```

也可以加上 `-v` 选项（译注：此为 `--verbose` 的简写，取首字母），显示对应的克隆地址：

```javascript
$ git remote -v
    origin git://github.com/schacon/ticgit.git
```

如果有多个远程仓库，此命令将全部列出。

这样一来，我就可以非常轻松地从这些用户的仓库中，拉取他们的提交到本地。请注意，上面列出的地址只有 origin 用的是 SSH URL 链接，所以也只有这个仓库我能推送数据上去。

##### 5.2 添加远程仓库

要添加一个新的远程仓库，可以指定一个简单的名字，以便将来引用，运行 `git remote add [shortname] [url]`：

```javascript
$ git remote
    origin

$ git remote add pb git://github.com/paulboone/ticgit.git
$ git remote -v
    origin git://github.com/schacon/ticgit.git
    pb git://github.com/paulboone/ticgit.git
```

现在可以用字符串 pb 指代对应的仓库地址了。比如说，要抓取所有 Paul 有的，但本地仓库没有的信息，可以运行 `git fetch pb`：

```javascript
$ git fetch pb
    remote: Counting objects: 58, done.
    remote: Compressing objects: 100% (41/41), done.
    remote: Total 44 (delta 24), reused 1 (delta 0)
    Unpacking objects: 100% (44/44), done.
    From git://github.com/paulboone/ticgit
    * [new branch] master -> pb/master
    * [new branch] ticgit -> pb/ticgit
```

现在，Paul 的主干分支（master）已经完全可以在本地访问了，对应的名字是 pb/master，你可以将它合并到自己的某个分支，或者切换到这个分支，看看有些什么有趣的更新。

##### 5.3 从远程仓库抓取数据

正如之前所看到的，可以用下面的命令从远程仓库抓取数据到本地：

`$ git fetch [remote-name]`

此命令会到远程仓库中拉取所有你本地仓库中还没有的数据。运行完成后，你就可以在本地访问该远程仓库中的所有分支，将其中某个分支合并到本地，或者只是取出某个分支，一探究竟。

如果是克隆了一个仓库，此命令会自动将远程仓库归于 origin 名下。所以，`git fetch origin` 会抓取从你上次克隆以来别人上传到此远程仓库中的所有更新（或是上次 fetch 以来别人提交的更新）。有一点很重要，需要记住，fetch 命令只是将远端的数据拉到本地仓库，并不自动合并到当前工作分支，只有当你确实准备好了，才能手工合并。

如果设置了某个分支用于跟踪某个远端仓库的分支，可以使用 `git pull` 命令自动抓取数据下来，然后将远端分支自动合并到本地仓库中当前分支。在日常工作中我们经常这么用，既快且好。

实际上，默认情况下 `git clone` 命令本质上就是自动创建了本地的 master 分支用于跟踪远程仓库中的 master 分支（假设远程仓库确实有 master 分支）。所以一般我们运行 `git pull`，目的都是要从原始克隆的远端仓库中抓取数据后，合并到工作目录中的当前分支。

##### 5.4 推送数据到远程仓库

项目进行到一个阶段，可以将本地仓库中的数据推送到远程仓库。实现这个任务的命令很简单： `git push [remote-name] [branch-name]`。如果要把本地的 master 分支推送到 origin 服务器上（再次说明下，克隆操作会自动使用默认的 master 和 origin 名字），可以运行下面的命令：

`$ git push origin master`

只有在所克隆的服务器上有写权限，或者同一时刻没有其他人在推数据，这条命令才会如期完成任务。如果在你推数据前，已经有其他人推送了若干更新，那你的推送操作就会被驳回。你必须先把他们的更新抓取到本地，合并到自己的项目中，然后才可以再次推送。有关推送数据到远程仓库的详细内容见第三章。

##### 5.5 查看远程仓库信息

我们可以通过命令 `git remote show [remote-name]` 查看某个远程仓库的详细信息，比如要看所克隆的 origin 仓库，可以运行：

```javascript
$ git remote show origin
    * remote origin
    URL: git://github.com/schacon/ticgit.git
    Remote branch merged with 'git pull' while on branch master
    master
    Tracked remote branches
    master
    ticgit
```

除了对应的克隆地址外，它还给出了许多额外的信息。它友善地告诉你如果是在 master 分支，就可以用 `git pull` 命令抓取数据合并到本地。另外还列出了所有处于跟踪状态中的远端分支。

上面的例子非常简单，而随着使用 Git 的深入，`git remote show` 给出的信息可能会像这样：

```javascript
$ git remote show origin
    * remote origin
    URL: git@github.com:defunkt/github.git
    Remote branch merged with 'git pull' while on branch issues
    issues
    Remote branch merged with 'git pull' while on branch master
    master
    New remote branches (next fetch will store in remotes/origin)
    caching
    Stale tracking branches (use 'git remote prune')
    libwalker
    walker2
    Tracked remote branches
    acl
    apiv2
    dashboard2
    issues
    master
    postgres
    Local branch pushed with 'git push'
    master:master
```

它告诉我们，运行 `git push` 时缺省推送的分支是什么（译注：最后两行）。它还显示了有哪些远端分支还没有同步到本地（译注：第六行的 caching 分支），哪些已同步到本地的远端分支在远端服务器上已被删除（译注：Stale tracking branches 下面的两个分支），以及运行 `git pull` 时将自动合并哪些分支（译注：前四行中列出的 issues 和 master 分支）。

##### 5.6 远程仓库的删除和重命名

在新版 Git 中可以用 `git remote rename` 命令修改某个远程仓库在本地的简称，比如想把 pb 改成 paul，可以这么运行：

```javascript
$ git remote rename pb paul
    $ git remote
    origin
    paul
```

注意，对远程仓库的重命名，也会使对应的分支名称发生变化，原来的 pb/master 分支现在成了 paul/master。

碰到远端仓库服务器迁移，或者原来的克隆镜像不再使用，又或者某个参与者不再贡献代码，那么需要移除对应的远端仓库，可以运行 `git remote rm` 命令：

```javascript
$ git remote rm paul
    $ git remote
    origin
```

#### 6. 打标签

同大多数 VCS 一样，Git 也可以对某一时间点上的版本打上标签。人们在发布某个软件版本（比如 v1.0 等等）的时候，经常这么做。

##### 6.1 列显已有的标签

列出现有标签的命令非常简单，直接运行 `git tag` 即可：

```javascript
$ git tag
    v0.1
    v1.3
```

显示的标签按字母顺序排列，所以标签的先后并不表示重要程度的轻重。

我们可以用特定的搜索模式列出符合条件的标签。在 Git 自身项目仓库中，有着超过 240 个标签，如果你只对 1.4.2 系列的版本感兴趣，可以运行下面的命令：

```javascript
$ git tag -l 'v1.4.2.*'
    v1.4.2.1
    v1.4.2.2
    v1.4.2.3
    v1.4.2.4
```

##### 6.2 新建标签

Git 使用的标签有两种类型：轻量级的（lightweight）和含附注的（annotated）。轻量级标签就像是个不会变化的分支，实际上它就是个指向特定提交对象的引用。而含附注标签，实际上是存储在仓库中的一个独立对象，它有自身的校验和信息，包含着标签的名字，电子邮件地址和日期，以及标签说明，标签本身也允许使用 GNU Privacy Guard (GPG) 来签署或验证。一般我们都建议使用含附注型的标签，以便保留相关信息；当然，如果只是临时性加注标签，或者不需要旁注额外信息，用轻量级标签也没问题。

##### 6.3 含附注的标签

创建一个含附注类型的标签非常简单，用 `-a` （译注：取 annotated 的首字母）指定标签名字即可：

```javascript
$ git tag -a v1.4 -m 'my version 1.4'
    $ git tag
    v0.1
    v1.3
    v1.4
```

而 `-m` 选项则指定了对应的标签说明，Git 会将此说明一同保存在标签对象中。如果没有给出该选项，Git 会启动文本编辑软件供你输入标签说明。

可以使用 `git show` 命令查看相应标签的版本信息，并连同显示打标签时的提交对象。

```javascript
$ git show v1.4
    tag v1.4
    Tagger: Scott Chacon <schacon@gee-mail.com>
    Date: Mon Feb 9 14:45:11 2009 -0800

    my version 1.4
    commit 15027957951b64cf874c3557a0f3547bd83b3ff6
    Merge: 4a447f7... a6b4c97...
    Author: Scott Chacon <schacon@gee-mail.com>
    Date: Sun Feb 8 19:02:46 2009 -0800

    Merge branch 'experiment'
```

我们可以看到在提交对象信息上面，列出了此标签的提交者和提交时间，以及相应的标签说明。

##### 6.4 签署标签

如果你有自己的私钥，还可以用 GPG 来签署标签，只需要把之前的 `-a` 改为 `-s` （译注： 取 signed 的首字母）即可：

```javascript
$ git tag -s v1.5 -m 'my signed 1.5 tag'
    You need a passphrase to unlock the secret key for
    user: "Scott Chacon <schacon@gee-mail.com>"
    1024-bit DSA key, ID F721C45A, created 2009-02-09
```

现在再运行 `git show` 会看到对应的 GPG 签名也附在其内：

```javascript
$ git show v1.5
    tag v1.5
    Tagger: Scott Chacon <schacon@gee-mail.com>
    Date: Mon Feb 9 15:22:20 2009 -0800

    my signed 1.5 tag
    -----BEGIN PGP SIGNATURE-----
    Version: GnuPG v1.4.8 (Darwin)

    iEYEABECAAYFAkmQurIACgkQON3DxfchxFr5cACeIMN+ZxLKggJQf0QYiQBwgySN
    Ki0An2JeAVUCAiJ7Ox6ZEtK+NvZAj82/
    =WryJ
    -----END PGP SIGNATURE-----
    commit 15027957951b64cf874c3557a0f3547bd83b3ff6
    Merge: 4a447f7... a6b4c97...
    Author: Scott Chacon <schacon@gee-mail.com>
    Date: Sun Feb 8 19:02:46 2009 -0800

    Merge branch 'experiment'
```

##### 6.5 轻量级标签

轻量级标签实际上就是一个保存着对应提交对象的校验和信息的文件。要创建这样的标签，一个 `-a`，`-s` 或 `-m` 选项都不用，直接给出标签名字即可：

```javascript
$ git tag v1.4-lw
    $ git tag
    v0.1
    v1.3
    v1.4
    v1.4-lw
    v1.5
```

现在运行 `git show` 查看此标签信息，就只有相应的提交对象摘要：

```javascript
$ git show v1.4-lw
    commit 15027957951b64cf874c3557a0f3547bd83b3ff6
    Merge: 4a447f7... a6b4c97...
    Author: Scott Chacon <schacon@gee-mail.com>
    Date: Sun Feb 8 19:02:46 2009 -0800

    Merge branch 'experiment'
```

##### 6.6 验证标签

可以使用 `git tag -v [tag-name]` （译注：取 verify 的首字母）的方式验证已经签署的标签。此命令会调用 GPG 来验证签名，所以你需要有签署者的公钥，存放在 keyring 中，才能验证：

```javascript
$ git tag -v v1.4.2.1
    object 883653babd8ee7ea23e6a5c392bb739348b1eb61
    type commit
    tag v1.4.2.1
    tagger Junio C Hamano <junkio@cox.net> 1158138501 -0700

    GIT 1.4.2.1

    Minor fixes since 1.4.2, including git-mv and git-http with alternates.
    gpg: Signature made Wed Sep 13 02:08:25 2006 PDT using DSA key ID F3119B9A
    gpg: Good signature from "Junio C Hamano <junkio@cox.net>"
    gpg: aka "[jpeg image of size 1513]"
    Primary key fingerprint: 3565 2A26 2040 E066 C9A7 4A7D C0C6 D9A4 F311 9B9A
```

若是没有签署者的公钥，会报告类似下面这样的错误：

```javascript
gpg: Signature made Wed Sep 13 02:08:25 2006 PDT using DSA key ID F3119B9A
    gpg: Can't check signature: public key not found
    error: could not verify the tag 'v1.4.2.1'
```

##### 6.7 后期加注标签

你甚至可以在后期对早先的某次提交加注标签。比如在下面展示的提交历史中：

```javascript
$ git log --pretty=oneline
    15027957951b64cf874c3557a0f3547bd83b3ff6 Merge branch 'experiment'
    a6b4c97498bd301d84096da251c98a07c7723e65 beginning write support
    0d52aaab4479697da7686c15f77a3d64d9165190 one more thing
    6d52a271eda8725415634dd79daabbc4d9b6008e Merge branch 'experiment'
    0b7434d86859cc7b8c3d5e1dddfed66ff742fcbc added a commit function
    4682c3261057305bdd616e23b64b0857d832627b added a todo file
    166ae0c4d3f420721acbb115cc33848dfcc2121a started write support
    9fceb02d0ae598e95dc970b74767f19372d61af8 updated rakefile
    964f16d36dfccde844893cac5b347e7b3d44abbc commit the todo
    8a5cbc430f1a9c3d00faaeffd07798508422908a updated readme
```
我们忘了在提交 “updated rakefile” 后为此项目打上版本号 v1.2，没关系，现在也能做。只要在打标签的时候跟上对应提交对象的校验和（或前几位字符）即可：

`$ git tag -a v1.2 9fceb02`

可以看到我们已经补上了标签：

```javascript
$ git tag
    v0.1
    v1.2
    v1.3
    v1.4
    v1.4-lw
    v1.5

    $ git show v1.2
    tag v1.2
    Tagger: Scott Chacon <schacon@gee-mail.com>
    Date: Mon Feb 9 15:32:16 2009 -0800

    version 1.2
    commit 9fceb02d0ae598e95dc970b74767f19372d61af8
    Author: Magnus Chacon <mchacon@gee-mail.com>
    Date: Sun Apr 27 20:43:35 2008 -0700

    updated rakefile
    ...
```

##### 6.7 分享标签

默认情况下，`git push` 并不会把标签传送到远端服务器上，只有通过显式命令才能分享标签到远端仓库。其命令格式如同推送分支，运行 `git push origin [tagname]` 即可：

```javascript
$ git push origin v1.5
    Counting objects: 50, done.
    Compressing objects: 100% (38/38), done.
    Writing objects: 100% (44/44), 4.56 KiB, done.
    Total 44 (delta 18), reused 8 (delta 1)
    To git@github.com:schacon/simplegit.git
    * [new tag] v1.5 -> v1.5
```

如果要一次推送所有本地新增的标签上去，可以使用 `--tags` 选项：

```javascript
$ git push origin --tags
    Counting objects: 50, done.
    Compressing objects: 100% (38/38), done.
    Writing objects: 100% (44/44), 4.56 KiB, done.
    Total 44 (delta 18), reused 8 (delta 1)
    To git@github.com:schacon/simplegit.git
    * [new tag] v0.1 -> v0.1
    * [new tag] v1.2 -> v1.2
    * [new tag] v1.4 -> v1.4
    * [new tag] v1.4-lw -> v1.4-lw
    * [new tag] v1.5 -> v1.5
```

现在，其他人克隆共享仓库或拉取数据同步后，也会看到这些标签。

#### 7. 技巧和窍门

##### 7.1自动补全

如果你用的是 Bash shell，可以试试看 Git 提供的自动补全脚本。下载 Git 的源代码，进入 contrib/completion 目录，会看到一个 git-completion.bash 文件。将此文件复制到你自己的用户主目录中（译注：按照下面的示例，还应改名加上点：`cp git-completion.bash ~/.git-completion.bash）`，并把下面一行内容添加到你的 .bashrc 文件中：

`source ~/.git-completion.bash`

也可以为系统上所有用户都设置默认使用此脚本。Mac 上将此脚本复制到 `/opt/local/etc/bash_completion.d`目录中，Linux 上则复制到 `/etc/bash_completion.d/` 目录中。这两处目录中的脚本，都会在 Bash 启动时自动加载。

如果在 Windows 上安装了 msysGit，默认使用的 Git Bash 就已经配好了这个自动补全脚本，可以直接使用。

在输入 Git 命令的时候可以敲两次跳格键（Tab），就会看到列出所有匹配的可用命令建议：

```javascript
$ git co<tab><tab>
    commit config
```

此例中，键入 `git co` 然后连按两次 `Tab` 键，会看到两个相关的建议（命令） commit 和 config。继而输入 `m<tab>` 会自动完成 `git commit` 命令的输入。

命令的选项也可以用这种方式自动完成，其实这种情况更实用些。比如运行 `git log` 的时候忘了相关选项的名字，可以输入开头的几个字母，然后敲 `Tab` 键看看有哪些匹配的：

```javascript
$ git log --s<tab>
    --shortstat --since= --src-prefix= --stat --summary
```

##### 7.2 Git 命令别名

Git 并不会推断你输入的几个字符将会是哪条命令，不过如果想偷懒，少敲几个命令的字符，可以用 `git config` 为命令设置别名。来看看下面的例子：

```javascript
$ git config --global alias.co checkout
    $ git config --global alias.br branch
    $ git config --global alias.ci commit
    $ git config --global alias.st status
```

现在，如果要输入 `git commit` 只需键入 `git ci` 即可。而随着 Git 使用的深入，会有很多经常要用到的命令，遇到这种情况，不妨建个别名提高效率。

使用这种技术还可以创造出新的命令，比方说取消暂存文件时的输入比较繁琐，可以自己设置一下：

`$ git config --global alias.unstage 'reset HEAD --'`

这样一来，下面的两条命令完全等同：

```javascript
$ git unstage fileA
$ git reset HEAD fileA
```

显然，使用别名的方式看起来更清楚。另外，我们还经常设置 last 命令：

`$ git config --global alias.last 'log -1 HEAD'`

然后要看最后一次的提交信息，就变得简单多了：

```javascript
$ git last
    commit 66938dae3329c7aebe598c2246a8e6af90d04646
    Author: Josh Goebel <dreamer3@example.com>
    Date: Tue Aug 26 19:48:51 2008 +0800

    test for current head

    Signed-off-by: Scott Chacon <schacon@example.com>
```


可以看出，实际上 Git 只是简单地在命令中替换了你设置的别名。不过有时候我们希望运行某个外部命令，而非 Git 的子命令，这个好办，只需要在命令前加上 ! 就行。如果你自己写了些处理 Git 仓库信息的脚本的话，就可以用这种技术包装起来。作为演示，我们可以设置用 git visual 启动 gitk：

`$ git config --global alias.visual '!gitk'`
