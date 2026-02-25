# 初中小四门练习题与知识点系统 (Skills-XiaoSiMen)

一个 Cursor Agent Skill，用于生成中国初中（七年级、八年级）**小四门**（地理、历史、生物、道德与法治）的交互式练习题和配套知识点。

## 功能特色

- **四科全覆盖**：地理、历史、生物、道德与法治，七/八年级
- **交互式 HTML 输出**：生成可直接在浏览器使用的交互式答题页面
- **知识点卡片**：每道题配有详细知识点解析
- **渐进式提示**：三级提示系统，帮助学生逐步思考
- **游戏化设计**：积分、连击奖励、成就系统
- **错题回顾**：答题结束后可回顾错题及知识点
- **章节顺序出题**：支持按教材章节顺序生成题目

## 安装

将本项目作为 Cursor Agent Skill 使用：

```bash
npx skills add https://github.com/xingyun-New/Skills-XiaoSiMen.git
```

## 使用方法

在 Cursor 中向 AI 助手提问，例如：

- "请生成 10 道八年级地理综合练习题"
- "帮我出 15 道七年级历史选择题"
- "生成八年级生物第一章的练习题"
- "出 10 道道德与法治八年级下册的题"

### 输出格式

- **HTML（默认）**：生成交互式网页，支持在线答题、即时反馈、知识点学习
- **Markdown**：生成文本格式的题目和答案

## 项目结构

```
.agents/skills/zhongkao-xiaosimen/
├── SKILL.md                          # 技能主文件
└── references/
    ├── teaching-methods.md           # 教学方法论
    ├── question-types.md             # 题型模板与规范
    ├── html-template.md              # HTML 交互页面模板
    ├── gamification.md               # 游戏化与积分规则
    ├── textbook-guide.md             # 电子教材补充指南
    ├── geo-7.md / geo-8.md           # 地理知识框架
    ├── hist-7.md / hist-8.md         # 历史知识框架
    ├── bio-7.md / bio-8.md           # 生物知识框架
    └── ethics-7.md / ethics-8.md     # 道法知识框架

quiz-output/                          # 示例输出
```

## 技术架构

- 题目数据以 JSON 格式嵌入 `<script type="application/json">` 标签，避免字符串转义问题
- 单文件 HTML，内嵌 CSS + JavaScript，无需外部依赖
- 自适应布局，支持桌面和移动端

## 许可证

MIT
