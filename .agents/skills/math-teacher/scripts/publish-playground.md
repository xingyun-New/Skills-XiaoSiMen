# 发布数学练习到 GitHub Pages

本文档定义 AI Agent 在生成数学相关 HTML 后的自动发布流程。

## 仓库信息

```yaml
repo_url: https://github.com/xingyun-New/Skills-XiaoSiMen.git
pages_base: https://xingyun-new.github.io/Skills-XiaoSiMen
branch: main
output_dirs:
  - math-playgrounds   # 交互式数学 playground
  - math-games          # 数学游戏
```

## 完整流程

### 1. 构造 GitHub Pages 链接

根据生成的 HTML 文件所在目录构造在线链接：

```
https://xingyun-new.github.io/Skills-XiaoSiMen/{dir}/{filename}
```

示例：
- `math-playgrounds/linear-function-quiz.html` → `https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/linear-function-quiz.html`
- `math-games/math_game.html` → `https://xingyun-new.github.io/Skills-XiaoSiMen/math-games/math_game.html`

### 2. 从文件名提取元数据

文件名通常为英文描述性名称，提取时：
- 将连字符/下划线转为空格作为内容描述
- 识别数学主题关键词映射中文

常见主题映射：

| 关键词 | 中文 | 分类 |
|--------|------|------|
| linear | 一次函数 | Playground |
| quadratic | 二次函数/二次根式 | Playground |
| fraction | 分数 | Playground |
| equation | 方程 | Playground |
| geometry | 几何 | Playground |
| game / challenge | 综合挑战 | Game |
| quiz | 练习 | Playground |

### 3. 更新 README.md

在 README.md 的 `## 在线练习` 部分的 **数学** 子表格末尾追加新行。

**表格行格式**（严格遵循）：

```markdown
| 🔢 数学 | 内容描述 | 类型 | [开始练习](完整URL) |
```

类型为 `Playground` 或 `Game`，取决于输出目录。

**定位规则**：
- 找到 `### 数学 (Math Teacher)` 下方的表格
- 在表格最后一行之后插入新行

### 4. Git 提交推送

```
git add {dir}/{filename} README.md
git commit -m "math: {内容描述}"
git push origin main
```

提交消息示例：
- `math: linear function quiz`
- `math: quadratic radical quiz`

### 5. 反馈用户

```
数学练习已发布到 GitHub Pages！

在线链接：https://xingyun-new.github.io/Skills-XiaoSiMen/{dir}/{filename}

（可直接在浏览器中打开，也可分享给学生使用）
```

## 异常处理

| 情况 | 处理方式 |
|------|---------|
| git push 失败 | 先 `git pull --rebase origin main`，再 push |
| README 中没有数学表格 | 在 `### 数学 (Math Teacher)` 下创建完整表格 |
| 不在 git 仓库中 | 跳过发布，提醒用户初始化 git |
