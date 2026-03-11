# 交互式学习练习系统 (Skills-XiaoSiMen)

一个基于 Cursor Agent Skills 的交互式学习练习题生成系统，覆盖 **数学** 和 **初中小四门**（地理、历史、生物、道德与法治）以及 **初中语文**、**初中物理**、**初中英语**。

所有练习题均为独立 HTML 文件，可直接在浏览器中打开，支持在线答题、即时反馈、知识点学习和游戏化激励。

## 包含的 Skills

| Skill | 说明 | 适用范围 |
|-------|------|---------|
| **math-teacher** | 交互式数学教学，生成可视化 playground 和游戏化挑战 | 小学 ~ 大学数学 |
| **zhongkao-xiaosimen** | 初中小四门练习题与知识点系统 | 七至八年级：地理、历史、生物、道德与法治 |
| **zhongkao-physics** | 初中物理练习题与知识点系统 | 八至九年级：物理 |
| **zhongkao-english** | 初中英语练习题与知识点系统 | 七至九年级：英语 |
| **zhongkao-yuwen** | 初中语文练习题与知识点系统 | 七至九年级：语文 |

## 安装

```bash
npx skills add https://github.com/xingyun-New/Skills-XiaoSiMen.git
```

## 使用方法

在 Cursor 中向 AI 助手提问即可触发对应 skill。

**数学：**
- "帮我理解一次函数"
- "生成二次函数练习题"
- "Challenge me on fractions"

**小四门：**
- "请生成 10 道八年级地理综合练习题"
- "帮我出 15 道七年级历史选择题"
- "生成八年级生物第一章的练习题"
- "出 10 道道德与法治八年级下册的题目"

**语文：**
- "生成 10 道八年级语文桃花源记练习题"
- "出 15 道九年级古诗文默写填空题"
- "生成一份七年级语文期末模拟卷"

**物理：**
- "生成 10 道八年级物理力学选择题"
- "出 15 道九年级电学综合题"

**英语：**
- "生成 10 道八年级英语语法选择题"
- "出 15 道九年级英语阅读理解题"

---

## 在线练习

通过 GitHub Pages 直接在浏览器中打开，无需下载。

### 🔢 数学 (Math Teacher)

| 内容 | 类型 | 在线练习 |
|------|------|---------|
| 二次根式 & 绝对值探索器 | Playground | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/sqrt-abs-explorer.html) |
| 反比例函数探索器 | Playground | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/inverse-function-explorer.html) |
| 一次函数探索器 | Playground | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/linear-function-explorer.html) |
| 一次函数练习 | Playground | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/linear-function-quiz.html) |
| 一次函数中等难度挑战 | Playground | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/linear-function-medium-quiz.html) |
| 平行四边形专项练习 | Playground | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/parallelogram-quiz.html) |

### ⚖️ 道德与法治

| 年级 | 内容 | 日期 | 在线练习 |
|------|------|------|---------|
| 八年级 | 坚持宪法至上 | 2026-02-26 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/ethics-8-%E5%9D%9A%E6%8C%81%E5%AE%AA%E6%B3%95%E8%87%B3%E4%B8%8A-20260226.html) |
| 八年级 | 下册综合练习 | 2026-02-27 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/ethics-8-%E4%B8%8B%E5%86%8C%E7%BB%BC%E5%90%88%E7%BB%83%E4%B9%A0-20260227.html) |
| 八年级 | 理解权利义务 | 2026-02-27 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/ethics-8-%E7%90%86%E8%A7%A3%E6%9D%83%E5%88%A9%E4%B9%89%E5%8A%A1-20260227.html) |
| 八年级 | 人民当家作主 | 2026-02-28 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/ethics-8-%E4%BA%BA%E6%B0%91%E5%BD%93%E5%AE%B6%E4%BD%9C%E4%B8%BB-20260228.html) |
| 八年级 | 坚持宪法至上（新版） | 2026-03-01 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/ethics-8-%E5%9D%9A%E6%8C%81%E5%AE%AA%E6%B3%95%E8%87%B3%E4%B8%8A-20260301.html) |

### 📜 历史

| 年级 | 内容 | 日期 | 在线练习 |
|------|------|------|---------|
| 八年级 | 中华人民共和国的成立和巩固 | 2026-02-26 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/history-8-%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E7%9A%84%E6%88%90%E7%AB%8B%E5%92%8C%E5%B7%A9%E5%9B%BA-20260226.html) |
| 八年级 | 社会主义制度建立与建设探索 | 2026-02-27 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/hist-8-%E7%A4%BE%E4%BC%9A%E4%B8%BB%E4%B9%89%E5%88%B6%E5%BA%A6%E5%BB%BA%E7%AB%8B%E4%B8%8E%E5%BB%BA%E8%AE%BE%E6%8E%A2%E7%B4%A2-20260227.html) |
| 八年级 | 中国特色社会主义道路 | 2026-02-28 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/history-8-%E4%B8%AD%E5%9B%BD%E7%89%B9%E8%89%B2%E7%A4%BE%E4%BC%9A%E4%B8%BB%E4%B9%89%E9%81%93%E8%B7%AF-20260228.html) |
| 八年级 | 第二单元 近代化的早期探索与民族危机的加剧 | 2026-03-07 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/history-8-%E7%AC%AC%E4%BA%8C%E5%8D%95%E5%85%83%E8%BF%91%E4%BB%A3%E5%8C%96%E6%8E%A2%E7%B4%A2-20260307.html) |

### 🌍 地理

| 年级 | 内容 | 日期 | 在线练习 |
|------|------|------|---------|
| 八年级 | 中国的地理差异 | 2026-03-01 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/geography-8-%E4%B8%AD%E5%9B%BD%E7%9A%84%E5%9C%B0%E7%90%86%E5%B7%AE%E5%BC%82-20260301.html) |

### 🧬 生物

| 年级 | 内容 | 日期 | 在线练习 |
|------|------|------|---------|
| 八年级 | 传染病和免疫（错题强化） | 2026-03-05 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/biology-8-%E4%BC%A0%E6%9F%93%E7%97%85%E5%92%8C%E5%85%8D%E7%96%AB-20260305.html) |

### ⚛️ 物理

| 年级 | 内容 | 日期 | 在线练习 |
|------|------|------|---------|
| 八年级 | 下册第一章：力 | 2026-03-07 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/physics-8-%E4%B8%8B%E5%86%8C%E7%AC%AC%E4%B8%80%E7%AB%A0%E5%8A%9B-20260307.html) |
| 八年级 | 下册第二章：运动和力综合 | 2026-03-08 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/physics-8-%E8%BF%90%E5%8A%A8%E5%92%8C%E5%8A%9B%E7%BB%BC%E5%90%88-20260308.html) |

### 📝 语文

| 年级 | 内容 | 日期 | 在线练习 |
|------|------|------|---------|
| 八年级 | 《诗经》二首（关雎·蒹葭） | 2026-03-02 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/chinese-8-%E8%AF%97%E7%BB%8F%E4%BA%8C%E9%A6%96-20260302.html) |
| 八年级 | 《诗经》二首综合练习（20 题） | 2026-03-04 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/chinese-8-%E8%AF%97%E7%BB%8F%E4%BA%8C%E9%A6%96-20260304.html) |
| 八年级 | 桃花源记综合练习（10 题） | 2026-03-09 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/chinese-8-%E6%A1%83%E8%8A%B1%E6%BA%90%E8%AE%B0%20-20260309.html) |
| 八年级 | 小石潭记综合练习（10 题） | 2026-03-09 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/chinese-8-%E5%B0%8F%E7%9F%B3%E6%BD%AD%E8%AE%B0-20260309.html) |

---

## 项目结构

```
.agents/skills/
├── math-teacher/                         # 数学交互式教学 skill
│   ├── SKILL.md
│   ├── references/
│   │   ├── basic_math.md
│   │   ├── algebra.md
│   │   ├── calculus.md
│   │   └── gamification.md
│   └── scripts/
│       ├── generate_playground.sh
│       ├── generate_game.sh
│       └── publish-playground.md         # GitHub Pages 发布流程
│
└── zhongkao-xiaosimen/                   # 初中小四门 skill
    ├── SKILL.md
    ├── references/
    │   ├── teaching-methods.md
    │   ├── question-types.md
    │   ├── html-template.md
    │   ├── gamification.md
    │   ├── textbook-guide.md
    │   ├── geo-7.md / geo-8.md
    │   ├── hist-7.md / hist-8.md
    │   ├── bio-7.md / bio-8.md
    │   └── ethics-7.md / ethics-8.md
    └── scripts/
        └── publish-quiz.md               # GitHub Pages 发布流程

math-playgrounds/                         # 数学 playground 输出
math-games/                               # 数学游戏输出
quiz-output/                              # 练习题输出
```

## 功能特色

### 数学 (Math Teacher)
- 从小学算术到大学微积分全覆盖
- 交互式可视化（Canvas 动画、实时图表）
- 游戏化挑战模式（计时、连击、成就）
- 自适应难度调节

### 小四门 (zhongkao-xiaosimen)
- 四科全覆盖：地理、历史、生物、道德与法治
- 每题配套知识点卡片和详细解析
- 三级渐进式提示系统
- 按教材章节顺序出题
- 错题回顾功能

### 语文 (zhongkao-yuwen)
- 字音字形、成语运用、病句辨析、古诗文默写
- 文言文阅读、古诗词赏析、现代文阅读
- 名著阅读、文学常识
- 按年级、册别、单元出题

### 物理 (zhongkao-physics)
- 力学、热学、光学、电学全覆盖
- 选择题、判断题、填空题、计算题、实验探究题
- 可视化物理图示（受力图、电路图、光路图）

### 英语 (zhongkao-english)
- 词汇辨析、语法选择、完形填空、阅读理解
- 句型转换、情景对话
- 按外研版教材模块出题

### 共同特点
- 单文件 HTML，无需外部依赖，双击即可使用
- 自适应布局，支持桌面和移动端
- 生成后自动推送至 GitHub Pages，提供在线链接
- 积分、连击奖励、成就系统

## 技术架构

- 题目数据以 JSON 格式嵌入 `<script type="application/json">` 标签，避免字符串转义问题
- 纯 HTML/CSS/JavaScript，无需任何外部库
- HTML5 Canvas API 实现数学可视化
- 响应式设计，支持各种屏幕尺寸
- 生成 HTML 后自动 git push，通过 GitHub Pages 提供在线访问

## 许可证

MIT
