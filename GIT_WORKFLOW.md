# Git 版本控制指南 (Git Version Control Guide)

本文档记录了在此项目中，我们如何使用 Git 在不同代码版本之间进行切换、回退与恢复的操作。这是一个非常强大的功能，但也需要谨慎操作。

---

## 场景一：如何回退到任意旧版本

当新功能导致问题，而您想暂时或永久地回到一个之前的稳定版本时，可以采用此流程。

### 步骤 1：查找历史版本的“身份证号” (Commit Hash)

首先，我们需要找到您想回退到的那个版本的唯一标识。

```shell
git log --oneline
```

这个命令会输出一个简洁的历史列表，例如：

```
a1b2c3d Update meta tags
e4f5g6h Fix compatibility for old Safari
...
```

请从这个列表中，找到您目标版本所对应的那一串**黄色字符**（即 Commit Hash），并复制它。

### 步骤 2：执行“时光倒流” (本地回退)

**警告：此操作是破坏性的，它会永久丢弃您本地在该时间点之后的所有修改。**

```shell
# 将 <旧版本的身份证号> 替换为您在步骤1中复制的真实字符
git reset --hard <旧版本的身份证号>
```

执行后，您本地文件夹中的代码会立刻恢复到您所选择的那个旧版本的状态。

### 步骤 3：强制更新远程仓库

因为您“改写了本地的历史”，需要用一个特殊的命令来强制同步到 GitHub。

**警告：此操作会覆盖云端仓库（GitHub）的历史记录，使其与您本地的回退状态保持一致。**

```shell
git push --force
```

完成后，等待几分钟，GitHub Pages 网站就会更新为这个旧版本的内容。

---

## 场景二：如何从旧版本恢复到最新的版本

如果您回退后，又想回到之前的最新版本，最好的方法是使用我们预先创建的“备份分支”。

### 最佳实践：执行危险操作前创建备份分支

在执行 `git reset` 这样有风险的操作前，为当前最新状态创建一个备份分支，是一个万无一失的好习惯。

1.  **创建本地备份分支** (例如，名为 `latest-version`):
    ```shell
    git branch latest-version
    ```

2.  **将备份分支推送到 GitHub** (作为云端双重保险):
    ```shell
    git push origin latest-version
    ```

### 从备份分支进行恢复

如果您想将项目恢复到 `latest-version` 分支的状态，请执行以下步骤：

1.  **确保您在主分支上**:
    ```shell
    git checkout main
    ```

2.  **将主分支的内容强行重置为备份分支的内容**:
    ```shell
    git reset --hard latest-version
    ```

3.  **将恢复好的最新版本强制推送到 GitHub**:
    ```shell
    git push --force
    ```

通过这个“创建备份 -> 随时恢复”的流程，您就可以毫无后顾之忧地在任何历史版本之间进行穿梭测试了。

---

# Git Version Control Guide (English)

This document records the process of how we used Git to switch between, revert, and restore different code versions in this project. This is a very powerful feature, but it requires cautious operation.

---

## Scenario 1: How to Revert to Any Old Version

Use this process when a new feature causes issues and you want to temporarily or permanently go back to a previous, stable version.

### Step 1: Find the Commit Hash (the "ID Number" of a Version)

First, we need to find the unique identifier of the version you want to revert to.

```shell
git log --oneline
```

This command will output a concise history list, for example:

```
a1b2c3d Update meta tags
e4f5g6h Fix compatibility for old Safari
...
```

From this list, find the **yellow string of characters** (the Commit Hash) corresponding to your target version and copy it.

### Step 2: Perform the "Time Travel" (Local Revert)

**Warning: This is a destructive operation. It will permanently discard all local changes made after this point in time.**

```shell
# Replace <hash_of_old_version> with the actual string you copied in Step 1
git reset --hard <hash_of_old_version>
```

After executing, the code in your local folder will instantly revert to the state of the old version you selected.

### Step 3: Force Update the Remote Repository

Because you have "rewritten local history," you need a special command to force the synchronization to GitHub.

**Warning: This operation will overwrite the history of the cloud repository (GitHub) to match your local reverted state.**

```shell
git push --force
```

Once complete, wait a few minutes, and the GitHub Pages site will update to the content of this old version.

---

## Scenario 2: How to Restore the Latest Version from an Old Version

If, after reverting, you want to go back to the latest version, the best way is to use a "backup branch" that we created beforehand.

### Best Practice: Create a Backup Branch Before Risky Operations

Before performing a risky operation like `git reset`, creating a backup branch of the current state is a foolproof habit.

1.  **Create a local backup branch** (e.g., named `latest-version`):
    ```shell
    git branch latest-version
    ```

2.  **Push the backup branch to GitHub** (as a secondary cloud backup):
    ```shell
    git push origin latest-version
    ```

### Restoring from the Backup Branch

If you want to restore your project to the state of the `latest-version` branch, follow these steps:

1.  **Ensure you are on the main branch**:
    ```shell
    git checkout main
    ```

2.  **Force reset the main branch to the state of the backup branch**:
    ```shell
    git reset --hard latest-version
    ```

3.  **Force push the restored version to GitHub**:
    ```shell
    git push --force
    ```

With this "Create Backup -> Restore Anytime" workflow, you can confidently travel between any historical versions for testing without worrying about losing your work.
