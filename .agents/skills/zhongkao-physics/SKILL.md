---
name: zhongkao-physics
description: 初中物理（八年级、九年级）练习题生成与知识点学习系统。根据人教版教材按年级、章节、知识点生成选择题、判断题、填空题、计算题、实验探究题，每题配套知识点卡片，并可输出受力图、电路图、光路图、实验装置图等可视化物理图示。Use when user asks to generate middle school physics practice questions, experiment analysis, formula application, visual physics diagrams, or requests knowledge point review for Chinese 中考 physics.
---

# 初中物理练习题与知识点系统

为初中生（八年级、九年级）生成人教版物理配套练习题和知识点学习材料。

## 快速开始

用户可通过以下方式触发：

| 触发方式 | 示例 |
|---------|------|
| 指定章节出题 | "出 10 道八年级物理力学选择题" |
| 指定知识点出题 | "物理九年级欧姆定律练习题" |
| 知识点复习 | "总结八年级上册光学知识点" |
| 错题强化 | "针对浮力计算出 5 道易错题" |
| 综合测试 | "生成一份九年级上学期电学期中模拟卷" |
| 考前冲刺 | "中考物理必背公式和知识点汇总" |
| 实验探究题 | "出 2 道八年级光学实验探究题" |
| 计算题 | "出 3 道九年级电功率计算题" |
| 图示题 | "生成 6 道带受力图的八年级力学练习" |

## 物理知识覆盖范围

### 八年级物理

| 年级 | 核心内容 | 教材参考 |
|------|---------|---------|
| 八上 | 机械运动、声现象、物态变化、光现象、透镜及其应用、质量与密度 | [physics-8.md](references/physics-8.md) |
| 八下 | 力、运动和力、压强、浮力、功和机械能、简单机械 | [physics-8.md](references/physics-8.md) |

### 九年级物理

| 年级 | 核心内容 | 教材参考 |
|------|---------|---------|
| 九全 | 内能、内能的利用、电流和电路、电压和电阻、欧姆定律、电功率、生活用电、电与磁、信息的传递、能源与可持续发展 | [physics-9.md](references/physics-9.md) |

## 出题工作流

### Step 1: 确认参数

从用户请求中识别以下参数（未指定则用默认值）：

```yaml
subject: 物理                        # 固定
grade: 八年级|九年级                  # 默认：九年级
semester: 上册|下册|全一册|全册       # 默认：全册
chapter: 具体单元/章节               # 默认：随机
count: 题目数量                      # 默认：10
difficulty: 基础|中等|拔高            # 默认：中等
types: [选择, 判断, 填空, 计算, 实验探究] # 默认：选择题
output: markdown|html                # 默认：html
```

### Step 2: 查阅教材知识点

根据年级和章节，读取对应的教材参考文件获取准确知识点：
- 八年级：`references/physics-8.md`
- 九年级：`references/physics-9.md`

**如果教材文件尚未填充内容**，则基于人教版课标知识体系生成题目，并在输出中标注"建议补充教材原文以提高精度"。

### Step 3: 按题型生成

遵循 [question-types.md](references/question-types.md) 中的题型模板生成题目。

**支持题型：**
- `choice`：选择题（4 选 1）
- `truefalse`：判断题（正确/错误）
- `fillblank`：填空题（文本输入）
- `calculation`：计算题（需写出解题过程，自评打分）
- `experiment`：实验探究题（多小问 + 自评）

**题型混合规则：**
- 综合测试卷应包含多种题型
- 计算题和实验探究题通常放在试卷后半部分
- 默认情况下，如用户未指定题型，生成选择题 + 判断题混合

### Step 4: 生成自包含 HTML（math-teacher 模式）

**默认输出为自包含 HTML 交互页面**。采用与 **math-teacher skill 相同的生成模式**：完整的自包含 HTML 单文件，内联全部 CSS + JavaScript + 手绘 SVG 图示，唯一外部依赖为 `feishu-sync.js`。

- 如果用户明确要求 Markdown 格式，则按下方 Markdown 模板输出
- 否则一律生成**自包含** HTML 交互练习页面

> **⚠️ 核心原则：不依赖 PhySVG / QuizEngine 等外部库。** 所有样式、答题逻辑、SVG 图示全部内联在单个 HTML 文件中。这是从 math-teacher skill 验证过的最佳实践——自包含文件更稳定、图示更专业、加载更快。

### HTML 生成架构（自包含模式）

**三层内联结构**：
1. **内联 CSS**（`<style>` 标签）：完整的响应式样式（渐变背景、卡片布局、按钮动画、SVG 容器、提示框等）
2. **题目数据**（JavaScript 数组）：每道题包含 `text`、`diagram`（手绘 SVG 字符串）、`hint`、`options`、`correct`、`feedback`、`knowledge`
3. **内联 JavaScript**：答题引擎逻辑（逐题渲染、选项交互、反馈显示、计分、成绩面板、飞书同步调用）

**范本文件**：`math-playgrounds/physics-spring-practice-v2.html` 是用 math-teacher skill 生成的物理弹簧专项练习，是所有物理练习 HTML 的**标准范本**。生成新练习时应参考其结构、样式和 SVG 绘制方式。

**HTML 骨架示例**（完整模板见 [html-template.md](references/html-template.md)）：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>物理专项练习 - 摩擦力与弹力</title>
    <style>
        /* 完整内联 CSS */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Microsoft YaHei', Arial, sans-serif;
               background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
               min-height: 100vh; padding: 20px; }
        .container { max-width: 1000px; margin: 0 auto; background: white;
                     border-radius: 15px; padding: 30px;
                     box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
        .diagram-container { background: white; border: 2px dashed #ddd;
                             border-radius: 10px; padding: 20px; margin: 20px 0;
                             text-align: center; }
        .diagram-container svg { max-width: 100%; height: auto; }
        .hint-box { background: #fff3e0; border-left: 4px solid #ff9800;
                    padding: 15px; margin: 20px 0; border-radius: 5px;
                    cursor: pointer; }
        /* ... 完整样式见 html-template.md ... */
    </style>
</head>
<body>
    <div class="container">
        <h1>🔬 物理专项练习 - 摩擦力与弹力</h1>
        <p class="subtitle">配图详解版</p>
        <div id="quiz-screen">
            <div class="progress-text">
                第 <span id="current-q">1</span> 题 / 共 10 题
            </div>
            <div class="progress-bar">
                <div class="progress-fill" id="progress-fill"></div>
            </div>
            <div id="questions-container"></div>
            <button class="btn" id="next-btn" onclick="nextQuestion()" disabled>
                下一题
            </button>
        </div>
        <div id="result-screen" class="result-screen">
            <h2>🎉 练习完成！</h2>
            <div class="score-display">得分：<span id="final-score">0</span>/100</div>
            <div class="stats">
                <div class="stat-item">
                    <div class="stat-number" id="correct-count">0</div>
                    <div class="stat-label">正确题数</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="accuracy">0%</div>
                    <div class="stat-label">准确率</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number" id="time-taken">0</div>
                    <div class="stat-label">用时 (秒)</div>
                </div>
            </div>
            <div id="syncStatus" style="margin:16px 0;padding:12px;border-radius:10px;display:none;text-align:center;">
                <span id="syncText"></span>
            </div>
            <button class="btn" onclick="location.reload()">重新练习</button>
        </div>
    </div>
    <script src="https://xingyun-new.github.io/Skills-XiaoSiMen/lib/feishu-sync.js"></script>
    <script>
        const questions = [
            {
                number: 1,
                text: "弹簧一端固定在墙上，另一端受水平向右的拉力 F。关于弹簧对墙的弹力方向，正确的是：",
                diagram: `<svg width="500" height="200" viewBox="0 0 500 200">
                    <!-- 墙壁 -->
                    <rect x="0" y="50" width="30" height="100" fill="#9e9e9e"/>
                    <text x="5" y="45" font-size="12" fill="#333">墙</text>
                    <!-- 弹簧（贝塞尔曲线） -->
                    <path d="M 40 100 Q 50 85 60 100 T 80 100 T 100 100 ..." stroke="#667eea" stroke-width="2" fill="none"/>
                    <!-- 拉力箭头 -->
                    <line x1="250" y1="100" x2="350" y2="100" stroke="#f44336" stroke-width="3" marker-end="url(#arrow-red)"/>
                    <text x="280" y="90" font-size="14" fill="#f44336" font-weight="bold">F (拉力)</text>
                    <!-- 思考提示框 -->
                    <rect x="280" y="30" width="200" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
                    <text x="290" y="50" font-size="12" fill="#333">❓ 思考：</text>
                    <text x="290" y="70" font-size="11" fill="#666">弹簧被拉伸，对墙的弹力向哪边？</text>
                    <defs>
                        <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                            <path d="M0,0 L0,6 L9,3 z" fill="#f44336"/>
                        </marker>
                    </defs>
                </svg>`,
                hint: "💡 弹簧被拉伸时，弹力指向恢复原长的方向",
                options: ["水平向右", "水平向左", "竖直向上", "竖直向下"],
                correct: 1,
                feedback: "弹簧被拉伸，弹力指向收缩方向...",
                knowledge: "弹力方向：总是指向恢复原长的方向"
            }
            // ... 更多题目，每题都有手绘 SVG
        ];

        let currentQuestion = 0;
        let score = 0;
        let selectedOption = null;
        let startTime = Date.now();
        let wrongList = [];

        function renderQuestion() { /* 渲染当前题目 */ }
        function toggleHint(el) { /* 切换提示显示 */ }
        function selectOption(idx) { /* 选择选项 */ }
        function nextQuestion() { /* 提交并跳转下一题 */ }
        function showResult() {
            /* 显示成绩 + 飞书同步 */
            FeishuSync.submit({
                practiceTitle: document.title,
                questionCount: questions.length,
                score: score / 10,
                accuracy: Math.round((score / (questions.length * 10)) * 100),
                practiceUrl: location.href,
                statusElId: 'syncStatus',
                textElId: 'syncText'
            });
            if (wrongList.length > 0) {
                FeishuSync.submitWrongQuestions({
                    practiceTitle: document.title,
                    practiceUrl: location.href,
                    subject: '物理',
                    wrongQuestions: wrongList
                });
            }
        }
        renderQuestion();
    </script>
</body>
</html>
```

### 手绘 SVG 图示规范（核心）

**每道题的 SVG 必须针对具体场景手工绘制**，达到课本插图级别的专业度。

#### SVG 绘制原则

1. **场景真实**：画出实际物体而非抽象符号
   - 墙壁：灰色矩形 `<rect fill="#9e9e9e"/>`
   - 弹簧：贝塞尔曲线 `<path d="M ... Q ... T ..."/>`
   - 木块：圆角矩形 + 标签文字
   - 地面：粗线 + 斜纹（粗糙面）
   - 坐标轴：直线 + 刻度 + 标签

2. **力箭头颜色规范**
   - 🔴 红色 `#f44336`：重力 G、拉力 F
   - 🔵 蓝色 `#42a5f5`：支持力 F支
   - 🟢 绿色 `#4caf50`：摩擦力 f、弹力方向标注
   - 🟣 紫色 `#ab47bc`：外力、推力
   - 🟠 橙色 `#ff9800`：弹力 F弹

3. **思考提示框**（嵌在 SVG 中或作为旁注）
   ```svg
   <rect x="280" y="30" width="200" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
   <text x="290" y="50" font-size="12" fill="#333">❓ 思考：</text>
   <text x="290" y="70" font-size="11" fill="#666">弹簧被拉伸，要恢复原长，</text>
   <text x="290" y="85" font-size="11" fill="#666">对墙的弹力向哪边？</text>
   ```

4. **尺寸与 viewBox**：宽度 400-500px，高度 200-300px

5. **箭头 marker 定义**（每个 SVG 中按需定义）：
   ```svg
   <defs>
       <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
           <path d="M0,0 L0,6 L9,3 z" fill="#f44336"/>
       </marker>
   </defs>
   ```

详细的 SVG 绘制范式和 10+ 种常见场景代码片段见 [diagram-guide.md](references/diagram-guide.md)。

**生成步骤**：
1. 阅读 [html-template.md](references/html-template.md) 中的完整自包含模板
2. 为每道题**手工绘制** SVG 图示（参考 [diagram-guide.md](references/diagram-guide.md) 中的场景范式）
3. 每道题必须包含提示（`hint` 字段）和知识点解析（`knowledge` + `feedback` 字段）
4. 文本中的专有名词优先用中文引号「」包裹
5. 物理公式使用文字或 Unicode 符号（ρ、Ω、℃），避免 LaTeX
6. 使用 Write 工具将完整 HTML 写入 `quiz-output/` 目录

### HTML 交互页面功能

生成的 HTML 为**完全自包含的单文件**（仅依赖 feishu-sync.js），每道题配手绘 SVG 图示。

核心功能：
- **逐题作答**：每次显示一道题，选择答案后即时反馈
- **手绘 SVG 图示**：每道题配精心绘制的场景图，达到课本插图级别
- **思考提示框**：SVG 图中嵌入引导性问题，帮助学生思考
- **提示系统**：每题可点击显示文字提示
- **知识点卡片**：答题后显示详细解析、核心公式和易错提醒
- **进度追踪**：显示当前进度条和题号
- **成绩面板**：做完所有题后显示总分、正确数、准确率、用时
- **飞书同步**：答题结果和错题自动同步到飞书
- **响应式设计**：手机/平板/电脑均可使用
- **中文界面**：全中文 UI，适合初中生使用

详细 HTML 模板参见 [html-template.md](references/html-template.md)，SVG 图示范式参见 [diagram-guide.md](references/diagram-guide.md)，游戏化机制参见 [gamification.md](references/gamification.md)。

### 图示生成要求

当题目属于以下情形时，**必须**手绘对应 SVG 图示：

- **力学**：受力分析（地面+物块+力箭头）、弹簧（墙/固定端+弹簧线圈+物体）、斜面（三角形+物体+分力）、杠杆、滑轮
- **电学**：串联并联电路图、电表读数、电路故障分析
- **光学**：反射/折射光路、平面镜成像、透镜成像
- **实验**：实验装置图、数据表格、F-x / L-F 坐标图
- **综合**：任何涉及空间关系或物体相互作用的题目

每个 SVG 应包含：**物理场景主体 + 关键力/标注 + 思考提示框（可选）**。

### HTML 文件命名规范

```
quiz-output/{subject}-{grade}-{topic}-{timestamp}.html
```

> **⚠️ 文件名禁止包含空格！** 空格会导致 Markdown 链接和 URL 断裂。topic 中的空格必须替换为连字符 `-`。

示例：`quiz-output/physics-8-光学综合-20260305.html`

**命名规则**：
- 只允许使用：英文字母、数字、中文、连字符 `-`、句点 `.`
- **禁止**：空格、括号、引号、特殊符号
- topic 过长时适当缩短（控制在 10 个字以内）

### Step 5: 发布到 GitHub Pages（⚠️ 强制步骤，不可跳过）

> **⚠️ 本步骤为强制步骤，不是可选的。** 生成 HTML 文件后必须立即读取 [publish-quiz.md](scripts/publish-quiz.md) 并严格执行完整的发布流程。**禁止**生成 HTML 后直接结束对话而不执行发布。

HTML 文件生成后，**必须自动执行发布流程**（详见 [publish-quiz.md](scripts/publish-quiz.md)）：

1. **读取** [publish-quiz.md](scripts/publish-quiz.md) 获取仓库信息和完整操作步骤
2. 构造 GitHub Pages 在线链接：`https://xingyun-new.github.io/Skills-XiaoSiMen/quiz-output/{filename}`
3. 在项目根目录 `README.md` 的「在线练习」表格末尾追加新条目
4. 执行 `git add` → `git commit` → `git push origin main`
5. 向用户展示可直接访问的在线链接

**此步骤为默认行为**，每次生成 HTML 后自动执行，无需用户额外指示。如果 git 操作失败，向用户说明原因并提供手动操作指引。

## Markdown 输出格式（仅当用户指定 Markdown 时使用）

### 单题格式模板

```markdown
### 第X题（选择题 | 难度：★★☆）

**【题目】** XXXXX

A. XXX
B. XXX
C. XXX
D. XXX

**【答案】** B

**【知识点卡片】**
- 📚 考点：XXX
- 📖 出处：人教版X年级X册 第X章
- 🔬 相关公式：F = ma / P = ρgh 等
- 💡 关键记忆：一句话核心记忆点
- ⚠️ 易错提醒：常见错误及原因
- 🔗 关联知识：与之相关的其他考点
```

### 计算题格式模板

```markdown
### 第X题（计算题 | 难度：★★★ | X 分）

**【题目】** [包含已知条件和求解要求的完整题干]

**【参考解答】**
已知：[列出已知量和单位]
求：[列出待求量]
解：
[分步解题过程，每步标注使用的公式]
答：[完整的答句]

**【知识点卡片】**
- 📚 考点：[涉及的主要知识点]
- 🔬 核心公式：[解题用到的公式]
- 📖 出处：[教材位置]
- 💡 解题技巧：[该题型的解题方法和注意事项]
- ⚠️ 易错提醒：[常见计算错误和单位换算陷阱]
```

### 综合试卷格式

```markdown
# 物理 X年级X学期 模拟测试卷

**总分：100分 | 时间：90分钟**

## 一、选择题（每题3分，共X分）
[题目...]

## 二、填空题（每空1分，共X分）
[题目...]

## 三、实验探究题（共X分）
[题目...]

## 四、计算题（共X分）
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
| 知识覆盖 | 每组题尽量覆盖不同知识点，避免重复考查同一概念 |
| 梯度设计 | 基础→中等→拔高，先建立信心再提升挑战 |
| 干扰项质量 | 选择题的错误选项必须具有合理迷惑性，源自常见错误 |
| 公式应用 | 注重公式的理解和灵活运用，不是简单套用 |
| 实验思维 | 培养控制变量法、对照实验、数据分析等科学探究能力 |
| 真题风格 | 贴近中考真题的命题风格和难度分布 |
| 单位规范 | 所有物理量必须带单位，计算过程体现单位换算 |

### 知识点讲解原则

| 原则 | 说明 |
|------|------|
| 先理解后记忆 | 知识点卡片先解释"为什么"，再给出记忆方法 |
| 公式推导 | 对核心公式说明推导过程或物理意义 |
| 口诀助记 | 对适合的知识点提供记忆口诀或谐音联想 |
| 对比辨析 | 易混淆概念放在一起对比，突出区别 |
| 图示优先 | 受力图、光路图、电路图、实验装置图优先生成手绘 SVG 可视化图示 |
| 错因分析 | 每个易错点说明"为什么会错"和"怎样避免" |

### 自适应学习

**建构式教学**：从学生已有认知出发，逐步搭建新知识
- 先通过1-2道基础题检测已有水平
- 根据答题情况调整后续题目难度
- 错题自动归入薄弱知识点，后续重点强化

**间隔重复**：知识点在不同题目中反复出现
- 第1次：直接考查核心概念
- 第2次：变换情境再次考查
- 第3次：与其他知识点综合考查

**即时反馈**：每题做完立即查看解析
- 答对：强化记忆 + 拓展关联知识
- 答错：分析错因 + 提供正确理解路径 + 补充同类练习

## 特殊题型说明

### 物理计算题
提供完整已知条件和求解目标，要求学生写出已知、求、解、答的完整过程。考查公式选择、单位换算和逻辑推理能力。常见类型：密度计算、压强计算、浮力计算、欧姆定律计算、电功率计算等。

### 实验探究题
描述实验目的、器材和步骤，考查控制变量法、实验方案设计、数据记录与分析、得出结论等科学探究能力。常见类型：探究影响因素类、测量类（测密度、测电阻、测小灯泡功率）、验证类。

### 电路分析题
优先提供可渲染的电路图 SVG，同时保留必要的文字说明，考查电路识别、故障分析和电学计算能力。

### 作图题
HTML 输出时在 SVG 中画出力的示意图、光路图、电路图等；Markdown 输出时用文字描述画法要求。

## 物理学科特色

### 公式体系
物理是初中理科中公式最密集的学科，需要特别注意：
- 每个公式的**适用条件**
- 公式中各物理量的**单位换算**（如 cm→m, g→kg, mL→m³）
- 公式的**变形应用**（如 ρ=m/V → m=ρV → V=m/ρ）
- 多公式的**联立求解**

### 实验方法
中考物理实验探究题是重点和难点：
- **控制变量法**：探究影响某一物理量的因素时，每次只改变一个变量
- **等效替代法**：用已知量替代未知量（如等效电阻）
- **转换法**：将不可直接测量的量转换为可测量的量
- **类比法**：用熟悉的事物理解陌生的概念

### 物理量与单位
| 物理量 | 常用符号 | 国际单位 | 常用单位 |
|--------|---------|---------|---------|
| 速度 | v | m/s | km/h |
| 力 | F | N | - |
| 压强 | p | Pa | kPa |
| 密度 | ρ | kg/m³ | g/cm³ |
| 电流 | I | A | mA |
| 电压 | U | V | mV, kV |
| 电阻 | R | Ω | kΩ |
| 电功率 | P | W | kW |
| 功 | W | J | kJ |
| 热量 | Q | J | kJ |

## 参考资料

| 文件 | 内容 |
|------|------|
| [publish-quiz.md](scripts/publish-quiz.md) | **GitHub Pages 自动发布流程** |
| [html-template.md](references/html-template.md) | **自包含 HTML 完整模板（范本）** |
| [diagram-guide.md](references/diagram-guide.md) | **手绘 SVG 范式库（10+ 常见物理场景）** |
| [gamification.md](references/gamification.md) | 游戏化积分与成就系统 |
| [teaching-methods.md](references/teaching-methods.md) | 完整教学方法论 |
| [question-types.md](references/question-types.md) | 各题型详细模板与示例 |
| [textbook-guide.md](references/textbook-guide.md) | 如何添加电子教材内容 |
| [physics-8.md](references/physics-8.md) | 八年级物理教材知识点 |
| [physics-9.md](references/physics-9.md) | 九年级物理教材知识点 |
