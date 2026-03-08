# Math Playgrounds Auto-Sync 自动化同步说明

## 功能概述

此脚本自动将 `math-teacher` skill 生成的数学练习题同步到 Skills-XiaoSiMen 仓库，并：

1. **自动复制** - 将新生成的 HTML 文件从源目录复制到目标目录
2. **更新 README** - 自动在 README.md 中添加新练习题的在线链接
3. **提交推送** - 自动 git commit 并 push 到 GitHub
4. **定时运行** - 每 5 分钟自动检查并同步

## 目录结构

```
源目录：/mnt/d/0.py/openclaw/openclaw/skills/math-teacher/math-playgrounds/
目标目录：/mnt/d/0.py/Skills-XiaoSiMen/math-playgrounds/
README 文件：/mnt/d/0.py/Skills-XiaoSiMen/README.md
```

## 使用方法

### 手动运行

```bash
/mnt/d/0.py/Skills-XiaoSiMen/scripts/sync-math-playgrounds.sh
```

### 自动运行

脚本已配置为 cron 任务，每 5 分钟自动执行一次。

查看 cron 配置：
```bash
crontab -l
```

查看运行日志：
```bash
cat /tmp/sync-math-playgrounds.log
```

## 工作流程

1. **检查新文件** - 比对源目录和目标目录的 HTML 文件
2. **复制文件** - 复制新的或更新的文件到目标目录
3. **更新 README** - 在数学练习表格中添加新条目
4. **Git 提交** - 提交更改并推送到 GitHub

## README 更新格式

新条目会自动添加到数学部分的表格中：

```markdown
| 练习题名称 | 类型 | 在线练习 |
|-----------|------|---------|
| Linear Function Explorer | Playground | [开始练习](https://...) |
```

## GitHub Pages 链接

同步后的文件可通过 GitHub Pages 访问：
```
https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/{filename}.html
```

## 日志

所有运行日志保存在 `/tmp/sync-math-playgrounds.log`

查看最新日志：
```bash
tail -f /tmp/sync-math-playgrounds.log
```

## 故障排除

### 文件未同步
- 检查源目录是否有新的 HTML 文件
- 检查文件权限
- 查看日志文件

### Git 推送失败
- 检查网络连接
- 检查 GitHub 凭证配置
- 确认有写权限

### README 未更新
- 检查 README 中是否有 "### 🔢 数学 (Math Teacher)" 部分
- 检查表格格式是否正确

## 修改同步频率

编辑 crontab：
```bash
crontab -e
```

修改第一行的时间表达式：
- `*/5 * * * *` - 每 5 分钟
- `*/10 * * * *` - 每 10 分钟
- `0 * * * *` - 每小时
- `0 0 * * *` - 每天午夜

## 禁用自动同步

注释掉 cron 任务：
```bash
crontab -e
# 在行首添加 #
# */5 * * * * /mnt/d/0.py/Skills-XiaoSiMen/scripts/sync-math-playgrounds.sh ...
```

或删除 cron 任务：
```bash
crontab -r
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `sync-math-playgrounds.sh` | 主同步脚本 |
| `AUTO-SYNC-README.md` | 本文档 |

---

**创建日期**: 2026-03-08  
**维护者**: C-3PO (Clawd's Third Protocol Observer) 🤖
