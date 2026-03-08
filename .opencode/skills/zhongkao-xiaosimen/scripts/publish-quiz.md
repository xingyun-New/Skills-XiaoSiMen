# 发布练习题到 GitHub Pages

本文档定义 AI Agent 在生成 HTML 练习题后的自动发布流程。

## 仓库信息

```yaml
repo_url: https://github.com/xingyun-New/Skills-XiaoSiMen.git
pages_base: https://xingyun-new.github.io/Skills-XiaoSiMen
branch: main
quiz_dir: quiz-output
```

## 完整流程

### 1. 构造 GitHub Pages 链接

根据生成的 HTML 文件名构造在线链接：

```
https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/{filename}
```

示例：
- `geography-8-综合练习-20260225.html` → `https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/geography-8-综合练习-20260225.html`

### 2. 从文件名提取元数据

文件名格式：`{subject}-{grade}-{topic}-{date}.html`

科目映射表：

| 文件名前缀 | 中文科目 | Emoji |
|-----------|---------|-------|
| geography | 地理 | 🌍 |
| history | 历史 | 📜 |
| biology | 生物 | 🧬 |
| ethics | 道法 | ⚖️ |

年级映射：`7` → 七年级，`8` → 八年级

日期转换：`20260225` → `2026-02-25`

### 3. 更新 README.md

在 README.md 的 `## 在线练习` 部分的表格末尾追加新行。

**表格行格式**（严格遵循）：

```markdown
| Emoji 科目 | X年级 | 内容描述 | YYYY-MM-DD | [开始练习](完整URL) |
```

**示例**：

```markdown
| 🌍 地理 | 八年级 | 综合练习 | 2026-02-25 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/geography-8-综合练习-20260225.html) |
```

**定位规则**：
- 找到 `## 在线练习` 下方的 Markdown 表格
- 在表格最后一行（`|` 开头的最后一行）之后插入新行
- 如果 `## 在线练习` 部分不存在，在 `## 许可证` 之前创建完整的表格结构

### 4. Git 提交推送

按以下顺序执行 Shell 命令：

```
git add quiz-output/<filename> README.md
git commit -m "quiz: <科目><年级> <内容>"
git push origin main
```

提交消息示例：
- `quiz: 地理八年级 综合练习`
- `quiz: 历史八年级 下册综合`
- `quiz: 生物七年级 第三单元`

### 5. 反馈用户

生成完成后向用户展示：

```
练习题已发布到 GitHub Pages！

在线链接：https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/<filename>

（可直接在浏览器中打开，也可分享给学生使用）
```

## 异常处理

| 情况 | 处理方式 |
|------|---------|
| git push 失败（需要 pull） | 先执行 `git pull --rebase origin main`，再重新 push |
| README.md 中没有在线练习表格 | 在 `## 许可证` 之前创建完整表格（含表头） |
| 文件名不符合命名规范 | 仍然发布，但在表格中用原始文件名作为内容描述 |
| 不在 git 仓库中 | 跳过发布步骤，提醒用户需要先初始化 git 仓库 |

## GitHub Pages 首次配置

如果 GitHub Pages 尚未启用，需要用户手动或通过 `gh` CLI 配置：

```shell
gh api repos/xingyun-New/Skills-XiaoSiMen/pages -X POST -f source.branch=main -f source.path=/
```

或在 GitHub 网页：**Settings → Pages → Source** 选择 `main` 分支、`/ (root)` 目录。
