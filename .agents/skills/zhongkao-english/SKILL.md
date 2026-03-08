---
name: zhongkao-english
description: 初中英语（七至九年级）练习题生成与知识点学习系统。根据外研版教材按年级、模块生成词汇辨析、语法选择、完形填空、阅读理解、句型转换、情景对话等题型，每题配套知识点卡片。Use when user asks to generate middle school English practice questions, grammar exercises, reading comprehension, or cloze tests for 中考 preparation.
---

# 初中英语练习题与知识点系统

为初中生（七年级、八年级、九年级）生成英语学科配套练习题和知识点学习材料，覆盖中考英语全部考查题型。

## 快速开始

用户可通过以下方式触发：

| 触发方式 | 示例 |
|---------|------|
| 指定题型出题 | "出 10 道八年级英语语法选择题" |
| 指定语法出题 | "出一组现在完成时的练习题" |
| 词汇练习 | "出 15 道七年级核心词汇辨析题" |
| 完形填空 | "生成一篇八年级完形填空练习" |
| 阅读理解 | "出一篇九年级阅读理解题" |
| 句型转换 | "出 10 道同义句转换题" |
| 情景对话 | "出 5 道补全对话练习" |
| 综合测试 | "生成一份九年级英语期中模拟卷" |
| 考前冲刺 | "中考英语语法专项突破" |
| 指定模块 | "外研版八年级上册 Module 5 练习" |

## 题型覆盖范围

### 一、词汇与语法（客观题）

| 题型 | JSON type | 考查内容 |
|------|-----------|---------|
| 词汇辨析 | `choice` | 近义词辨析、词性转换、固定搭配、词义理解 |
| 语法选择 | `choice` | 时态、语态、从句、非谓语动词、情态动词、冠词、介词等 |
| 情景对话 | `choice` | 日常交际用语、补全对话、功能意念 |

### 二、完形填空

| 题型 | JSON type | 考查内容 |
|------|-----------|---------|
| 完形填空 | `material` | 语境理解、词汇运用、语法知识、逻辑推理 |

### 三、阅读理解

| 题型 | JSON type | 考查内容 |
|------|-----------|---------|
| 阅读选择 | `material` | 主旨大意、细节理解、推理判断、词义猜测 |

### 四、语言运用（主观题）

| 题型 | JSON type | 考查内容 |
|------|-----------|---------|
| 句型转换 | `fillblank` | 同义句转换、按要求改写句子 |
| 补全句子 | `fillblank` | 首字母填空、根据汉语提示完成句子 |

## 各年级教材范围

### 七年级（外研版 New Standard English）

| 册别 | 核心语法 | 教材参考 |
|------|---------|---------|
| 上册 | be动词、一般现在时、have got、指示代词/物主代词、there be句型、can | [english-7.md](references/english-7.md) |
| 下册 | 一般过去时、现在进行时、一般将来时(be going to)、would like、祈使句 | [english-7.md](references/english-7.md) |

### 八年级（外研版 New Standard English）

| 册别 | 核心语法 | 教材参考 |
|------|---------|---------|
| 上册 | 比较级最高级、不定式、一般将来时(will)、情态动词should/must、if条件句 | [english-8.md](references/english-8.md) |
| 下册 | 现在完成时、被动语态、宾语从句（that/if/wh-）、情态动词表推测 | [english-8.md](references/english-8.md) |

### 九年级（外研版 New Standard English）

| 册别 | 核心语法 | 教材参考 |
|------|---------|---------|
| 上册 | 定语从句（who/which/that）、间接引语、过去完成时、状语从句综合 | [english-9.md](references/english-9.md) |
| 下册 + 中考复习 | 非谓语动词综合、八大时态综合、三大从句、中考核心1600词 | [english-9.md](references/english-9.md) |

## 出题工作流

### Step 1: 确认参数

从用户请求中识别以下参数（未指定则用默认值）：

```yaml
subject: 英语                        # 固定
grade: 七年级|八年级|九年级           # 默认：九年级
semester: 上册|下册|全册             # 默认：全册
unit: 具体单元/语法点               # 默认：随机
count: 题目数量                     # 默认：10
difficulty: 基础|中等|拔高           # 默认：中等
types: [词汇, 语法, 完形, 阅读, 句型转换, 对话] # 默认：语法选择
output: markdown|html                # 默认：html
```

### Step 2: 查阅教材知识点

根据年级和单元，读取对应的教材参考文件获取准确知识点：
- 七年级：`references/english-7.md`
- 八年级：`references/english-8.md`
- 九年级：`references/english-9.md`

**如果教材文件尚未填充内容**，则基于外研版课标知识体系生成题目，并在输出中标注"建议补充教材原文以提高精度"。

### Step 3: 按题型生成

遵循 [question-types.md](references/question-types.md) 中的题型模板生成题目。

**支持题型：**
- `choice`：选择题（4 选 1）—— 词汇辨析、语法选择、情景对话
- `fillblank`：填空题（文本输入）—— 句型转换、首字母填空、汉译英
- `material`：材料分析题（多小问）—— 完形填空、阅读理解

**题型混合规则：**
- 综合测试卷应包含多种题型
- 听力部分不在本 skill 范围内（纯文本交互）
- 词汇/语法选择题放在试卷前部
- 完形填空和阅读理解放在中后部
- 句型转换和书面表达放在末尾
- 默认情况下，如用户未指定题型，生成语法选择题

### Step 4: 选择输出格式

**默认输出为 HTML 交互页面**。根据 [html-template.md](references/html-template.md) 生成独立 HTML 文件，使用 Write 工具将文件写入项目的 `quiz-output/` 目录。

- 如果用户明确要求 Markdown 格式，则按下方 Markdown 模板输出
- 否则一律生成 HTML 交互练习页面

### HTML 生成关键架构

**数据与代码分离**：题目数据放在 `<script type="application/json" id="quiz-json">` 标签中作为纯 JSON，由 `JSON.parse()` 读取。**禁止**直接在 JavaScript 代码中拼写题目数据对象。

**生成步骤**：
1. 阅读 [html-template.md](references/html-template.md) 中的完整 HTML 模板
2. 将题目数据组织为合法 JSON 填入 `<script id="quiz-json">` 标签
3. **每道题必须包含 `hints` 数组**（3级渐进提示），详见模板中的 hints 字段说明
4. 英文文本中如有双引号，用 `\"` 转义
5. 使用 Write 工具将完整 HTML 写入文件

### HTML 交互页面功能

生成的 HTML 文件是**完全独立的单文件**，无需任何外部依赖，双击即可在浏览器中打开。

核心功能：
- **逐题作答**：每次显示一道题，选择答案后即时反馈
- **渐进式提示**：每题 3 级提示（方向提示→关键知识→解题思路），用提示会扣分
- **知识点卡片**：答对显示知识拓展，答错显示详细解析和易错提醒
- **进度追踪**：显示当前进度、正确率、连续答对数
- **成绩面板**：做完所有题后显示总分、薄弱知识点、错题汇总
- **错题回顾**：可重新练习答错的题目
- **计分与激励**：积分系统、连击奖励、成就动画
- **材料分析题**：完形填空和阅读理解以材料形式呈现
- **响应式设计**：手机/平板/电脑均可使用
- **中英双语界面**：UI 使用中文，题目内容为英文

详细 HTML 结构和模板参见 [html-template.md](references/html-template.md)，游戏化机制参见 [gamification.md](references/gamification.md)。

### HTML 文件命名规范

```
quiz-output/{subject}-{grade}-{topic}-{timestamp}.html
```

> **⚠️ 文件名禁止包含空格！** 空格会导致 Markdown 链接和 URL 断裂。topic 中的空格必须替换为连字符 `-`。

示例：`quiz-output/english-9-定语从句-20260302.html`

**命名规则**：
- 只允许使用：英文字母、数字、中文、连字符 `-`、句点 `.`
- **禁止**：空格、括号、引号、特殊符号
- topic 过长时适当缩短（控制在 10 个字以内）

### Step 5: 发布到 GitHub Pages（⚠️ 强制步骤，不可跳过）

> **⚠️ 本步骤为强制步骤，不是可选的。** 生成 HTML 文件后必须立即读取 [publish-quiz.md](scripts/publish-quiz.md) 并严格执行完整的发布流程。**禁止**生成 HTML 后直接结束对话而不执行发布。

HTML 文件生成后，**必须自动执行发布流程**（详见 [publish-quiz.md](scripts/publish-quiz.md)）：

1. **读取** [publish-quiz.md](scripts/publish-quiz.md) 获取仓库信息和完整操作步骤
2. 构造 GitHub Pages 在线链接：`https://xingyun-new.github.io/Skills-English/quiz-output/{filename}`
3. 在项目根目录 `README.md` 的「在线练习」表格末尾追加新条目
4. 执行 `git add` → `git commit` → `git push origin main`
5. 向用户展示可直接访问的在线链接

**此步骤为默认行为**，每次生成 HTML 后自动执行，无需用户额外指示。如果 git 操作失败，向用户说明原因并提供手动操作指引。

## Markdown 输出格式（仅当用户指定 Markdown 时使用）

### 单题格式模板

```markdown
### Q.X (Multiple Choice | Difficulty: ★★☆)

**[Question]** ______ you ever ______ to Beijing?

A. Have; been
B. Have; gone
C. Did; go
D. Are; going

**[Answer]** A

**[Knowledge Card]**
- 📚 考点：现在完成时 have been to vs. have gone to
- 📖 出处：外研版八年级下册 Module 6
- 💡 关键记忆：have been to = 去过（已回来）；have gone to = 去了（未回来）
- ⚠️ 易错提醒：been to 强调"经历"，gone to 强调"去向"
- 🔗 关联知识：现在完成时的标志词（ever, never, yet, already, just）
```

### 综合试卷格式

```markdown
# 英语 X年级X学期 模拟测试卷

**总分：120分 | 时间：100分钟**

## Part I 词汇与语法选择（每题1分，共X分）
[题目...]

## Part II 完形填空（每题1分，共X分）
[题目...]

## Part III 阅读理解（每题2分，共X分）
[题目...]

## Part IV 句型转换（每题2分，共X分）
[题目...]

---

## 参考答案与知识点解析
[逐题解析 + 知识点卡片]
```

## 教学方法论

本 skill 融合以下教学策略（详见 [teaching-methods.md](references/teaching-methods.md)）：

### 出题原则

| 原则 | 说明 |
|------|------|
| 知识覆盖 | 每组题尽量覆盖不同语法点/词汇，避免重复 |
| 梯度设计 | 基础→中等→拔高，先建立信心再提升挑战 |
| 语境真实 | 题目设置真实语境，避免脱离实际的机械操练 |
| 干扰项质量 | 错误选项基于学生真实错误设计 |
| 真题风格 | 贴近中考真题的命题风格和难度分布 |

### 英语学科专项策略

| 策略 | 说明 |
|------|------|
| 语法教学 | 理解规则→辨识例句→对比易混→实战运用 四步法 |
| 词汇积累 | 词根词缀联想法 + 语境记忆法 + 同义反义对比 |
| 完形填空 | 三遍法：通读大意→逐空推敲→回读验证 |
| 阅读理解 | 先题后文定位策略，关键词回找 |
| 句型转换 | 核心句型公式化记忆，同义表达积累 |

### 自适应学习

**建构式教学**：从学生已有认知出发，逐步搭建新知识
- 先通过1-2道基础题检测已有水平
- 根据答题情况调整后续题目难度
- 错题自动归入薄弱知识点，后续重点强化

**间隔重复**：语法点和词汇在不同题目中反复出现
- 第1次：直接考查单一语法规则
- 第2次：变换语境考查同一规则
- 第3次：与其他语法点综合考查

**即时反馈**：每题做完立即查看解析
- 答对：强化语法规则 + 拓展同类表达
- 答错：分析错因 + 对比易混知识点 + 补充例句

## 特殊题型说明

### 完形填空

- 提供一篇 150-250 词的短文，设 8-10 个空
- 每空 4 个选项，考查词汇、语法、逻辑推理
- 文章题材贴近初中生生活（校园/家庭/旅行/科普）
- 在 HTML 中以 `material` 类型渲染，短文放 material 字段，每空作为一个 subQuestion

### 阅读理解

- 提供一篇 200-350 词的英文短文
- 设 3-5 个问题，覆盖主旨、细节、推理、词义猜测
- 题材多样：记叙文、说明文、应用文（广告/通知/邮件）
- 在 HTML 中以 `material` 类型渲染

### 情景对话

- 模拟真实场景（购物/问路/就医/打电话等）
- 选择最恰当的应答语
- 注意中西方文化差异（如赞美的回应方式不同）

## 参考资料

| 文件 | 内容 |
|------|------|
| [publish-quiz.md](scripts/publish-quiz.md) | **GitHub Pages 自动发布流程** |
| [html-template.md](references/html-template.md) | HTML 交互页面完整模板 |
| [gamification.md](references/gamification.md) | 游戏化积分与成就系统 |
| [teaching-methods.md](references/teaching-methods.md) | 完整教学方法论 |
| [question-types.md](references/question-types.md) | 各题型详细模板与示例 |
| [textbook-guide.md](references/textbook-guide.md) | 如何添加电子教材内容 |
| [english-7.md](references/english-7.md) | 七年级英语教材知识点 |
| [english-8.md](references/english-8.md) | 八年级英语教材知识点 |
| [english-9.md](references/english-9.md) | 九年级英语教材知识点 |
