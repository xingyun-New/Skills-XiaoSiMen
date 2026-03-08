# 交互式学习练习系统 (Skills-XiaoSiMen)

一套 Cursor Agent Skills，用于生成交互式学习练习题，覆盖 **数学** 和 **初中小四门**（地理、历史、生物、道德与法治）。

所有练习题均为独立 HTML 文件，可直接在浏览器中打开，支持在线答题、即时反馈、知识点学习和游戏化激励。

## 包含的 Skills

| Skill | 说明 | 适用范围 |
|-------|------|---------|
| **math-teacher** | 交互式数学教学，生成可视化 playground 和游戏化挑战 | 小学 ~ 大学数学 |
| **zhongkao-xiaosimen** | 初中小四门练习题与知识点系统 | 七/八年级 地理、历史、生物、道法 |
| **zhongkao-physics** | 初中物理练习题与知识点系统 | 八/九年级 物理 |

## 安装

```bash
npx skills add https://github.com/xingyun-New/Skills-XiaoSiMen.git
```

## 使用方法

在 Cursor 中向 AI 助手提问即可触发对应 skill：

**数学：**
- "帮我理解一次函数"
- "生成二次函数练习题"
- "Challenge me on fractions"

**小四门：**
- "请生成 10 道八年级地理综合练习题"
- "帮我出 15 道七年级历史选择题"
- "生成八年级生物第一章的练习题"
- "出 10 道道德与法治八年级下册的题"

---

## 在线练习

通过 GitHub Pages 直接在浏览器中打开，无需下载：

### 🔢 数学 (Math Teacher)

| 内容 | 类型 | 在线练习 |
|------|------|---------|
| Inverse Function Quiz | Playground | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/inverse-function-quiz.html) |
| 一次函数探索器 | Playground | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/linear-function-explorer.html) |
| 一次函数练习 | Playground | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/linear-function-quiz.html) |
| 一次函数中等难度挑战 | Playground | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/linear-function-medium-quiz.html) |
| 平行四边形专项练习 | Playground | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/parallelogram-quiz.html) |

### ⚖️ 道德与法治

| 年级 | 内容 | 日期 | 在线练习 |
|------|------|------|---------|
| 八年级 | 坚持宪法至上 | 2026-02-26 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/ethics-8-坚持宪法至上-20260226.html) |
| 八年级 | 下册综合练习 | 2026-02-27 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/ethics-8-下册综合练习-20260227.html) |
| 八年级 | 理解权利义务 | 2026-02-27 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/ethics-8-理解权利义务-20260227.html) |
| 八年级 | 人民当家作主 | 2026-02-28 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/ethics-8-人民当家作主-20260228.html) |
| 八年级 | 坚持宪法至上（新） | 2026-03-01 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/ethics-8-坚持宪法至上-20260301.html) |

### 📜 历史

| 年级 | 内容 | 日期 | 在线练习 |
|------|------|------|---------|
| 八年级 | 中华人民共和国的成立和巩固 | 2026-02-26 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/history-8-中华人民共和国的成立和巩固-20260226.html) |
| 八年级 | 社会主义制度建立与建设探索 | 2026-02-27 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/hist-8-社会主义制度建立与建设探索-20260227.html) |
| 八年级 | 中国特色社会主义道路 | 2026-02-28 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/history-8-中国特色社会主义道路-20260228.html) |
| 八年级 | 第二单元 近代化的早期探索与民族危机的加剧 | 2026-03-07 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/history-8-第二单元近代化探索-20260307.html) |

### 🌍 地理

| 年级 | 内容 | 日期 | 在线练习 |
|------|------|------|---------|
| 八年级 | 中国的地理差异 | 2026-03-01 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/geography-8-中国的地理差异-20260301.html) |

### 🧬 生物

| 年级 | 内容 | 日期 | 在线练习 |
|------|------|------|---------|
| 八年级 | 传染病和免疫（错题强化） | 2026-03-05 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/biology-8-传染病和免疫-20260305.html) |

### ⚡ 物理

| 年级 | 内容 | 日期 | 在线练习 |
|------|------|------|---------|
| 八年级 | 下册第一章 力 | 2026-03-07 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/physics-8-下册第一章力-20260307.html) |
| 八年级 | 下册第二章 力 | 2026-03-07 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/physics-8-运动和力综合-20260308.html) |

### 📝 语文

| 年级 | 内容 | 日期 | 在线练习 |
|------|------|------|---------|
| 八年级 | 《诗经》二首（关雎·蒹葭） | 2026-03-02 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/chinese-8-诗经二首-20260302.html) |
| 八年级 | 《诗经》二首综合练习（20 题） | 2026-03-04 | [开始练习](https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/chinese-8-诗经二首-20260304.html) |

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
quiz-output/                              # 小四门练习题输出
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

### 共同特性
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
