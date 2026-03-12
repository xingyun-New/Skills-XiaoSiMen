# HTML 交互练习页面模板

生成独立的 HTML 练习页面时，必须严格遵循以下结构。生成的文件是纯 HTML + CSS + JavaScript 单文件，无任何外部依赖。

## 核心架构：数据与逻辑分离

题目数据放在 `<script type="application/json">` 标签中，**不是** JavaScript 代码，而是纯 JSON。这样做的好处：
- JSON 转义规则简单明确（只需 `\"` 转义双引号）
- 浏览器用 `JSON.parse()` 解析，不会因引号问题报错
- 数据与代码彻底分离，更安全可靠

## JSON 数据格式

### 客观题格式（选择题/判断题/填空题）

```json
{
  "title": "八年级物理 · 力学综合",
  "questions": [
    {
      "id": 1,
      "type": "choice",
      "difficulty": 2,
      "question": "题干文字",
      "options": ["选项 A", "选项 B", "选项 C", "选项 D"],
      "answer": 1,
      "hints": [
        "💡 方向提示：本题考查的是 XX 章节的 XX 知识点",
        "📖 关键知识：具体的知识点内容",
        "🎯 解题思路：根据 XX 可以判断出答案是 XX"
      ],
      "knowledgeCard": {
        "topic": "考点名称",
        "source": "人教版八年级上册 第二章",
        "formula": "相关公式（如有）",
        "keyMemory": "核心记忆点",
        "commonMistake": "易错提醒",
        "relatedTopics": "关联知识"
      }
    }
  ]
}
```

### 计算题/实验探究题格式

```json
{
  "id": 11,
  "type": "calculation",
  "difficulty": 3,
  "question": "题干文字，包含已知条件和求解要求",
  "material": "补充材料或实验背景描述（可选，支持\\n换行和<table>表格标签）",
  "materialLabel": "题目来源：改编自 2025 年中考题（可选）",
  "subQuestions": [
    {
      "id": 1,
      "question": "第 1 小问：求 XX",
      "points": 4,
      "answer": "参考解答过程和结果...",
      "scoring": ["正确写出公式得 1 分", "代入数据得 1 分", "计算结果正确得 2 分"]
    },
    {
      "id": 2,
      "question": "第 2 小问：求 XX",
      "points": 4,
      "answer": "参考答案...",
      "scoring": ["写出公式得 1 分", "结果正确得 3 分"]
    }
  ],
  "hints": [
    "💡 方向提示：本题考查 XX 章节的公式应用",
    "📖 关键知识：核心公式 XX = XX",
    "🎯 解题思路：先求出 XX，再利用公式 XX 计算 XX"
  ],
  "knowledgeCard": {
    "topic": "考点名称",
    "source": "人教版九年级全一册 第 X 章",
    "formula": "核心公式",
    "keyMemory": "核心记忆点",
    "commonMistake": "易错提醒（如单位换算）",
    "relatedTopics": "关联知识",
    "answerTechnique": "答题技巧"
  }
}
```

实验探究题格式与计算题相同，将 `type` 改为 `"experiment"`。

### 图示字段格式

当题目需要显示受力图、弹簧、斜面、滑轮、坐标图等时，在题目对象中加入 `diagram` 字段。**图示由页面内的 `renderDiagram(diagram, question)` 函数负责绘制**，使用 PhySVG 组件库或手写 SVG，不再由固定模板渲染。

```json
{
  "id": 3,
  "type": "choice",
  "question": "如图所示，下列说法正确的是：",
  "diagram": {
    "title": "木块受力示意图",
    "caption": "箭头长度不表示实际大小，只表示方向",
    "scene": {
      "type": "horizontal",
      "bodyLabel": "木块",
      "rough": true,
      "forces": [
        { "x": 180, "y": 132, "angle": -90, "length": 55, "label": "G", "color": "#ef5350" },
        { "x": 180, "y": 132, "angle": 90, "length": 55, "label": "F支", "color": "#42a5f5" },
        { "x": 180, "y": 132, "angle": 0, "length": 50, "label": "F拉", "color": "#ab47bc" },
        { "x": 180, "y": 132, "angle": 180, "length": 50, "label": "f", "color": "#66bb6a" }
      ]
    }
  }
}
```

- `diagram.title`、`diagram.caption` 可选，用于显示在图示上方/下方。
- `diagram.scene` 结构由你在 **renderDiagram** 中自行约定并解析；也可不填 scene，在 renderDiagram 中根据 `question.id` 或题干为每道题手写 PhySVG 调用。
- 图示绘制规范与 PhySVG API 见 [diagram-guide.md](diagram-guide.md)。

### hints 字段说明

每道题必须包含 `hints` 数组，含3级渐进式提示：

| 级别 | 作用 | 扣分 | 示例 |
|------|------|------|------|
| 提示1 | 方向提示：指出知识点范围 | 基础分 -30% | 「本题考查欧姆定律的应用」 |
| 提示2 | 关键知识：给出核心公式或定律 | 基础分 -60% | 「I = U/R，串联电路电流处处相等」 |
| 提示3 | 解题思路：接近给出答案 | 基础分 -90% | 「先求总电阻 R=R₁+R₂，再用 I=U/R 求电流」 |

### JSON 转义规则（只需关注这几条）

| 字符 | JSON 中写法 | 示例 |
|------|-----------|------|
| 双引号 `"` | `\"` | `"所谓\"串联\""` |
| 反斜杠 `\` | `\\` | `"C:\\路径"` |
| 换行 | `\n` | `"第一行\n第二行"` |

**中文引号 `""` 和 `「」` 在 JSON 中无需转义**，可以直接使用。建议优先用中文引号来包裹专有名词，彻底避免转义。

### 物理特殊符号处理

在 JSON 字符串中使用以下 Unicode 字符表示物理符号：
- 希腊字母：ρ（密度）、Ω（欧姆）、η（效率）、λ（波长）
- 上下标：用文字描述，如 "R₁"、"R₂"、"v₀"
- 单位：℃、m/s、kg/m³、N/m²（Pa）、kW·h
- 运算：×（乘号）、÷（除号）、≈、≥、≤、≠

## 动态生成 HTML 指南（库 + 数据 + renderDiagram）

物理练习页采用 **答题引擎库 + 图示库** 方式生成：题目数据仍为 JSON，图示由 **renderDiagram** 用 PhySVG 或手写 SVG 绘制。

### 1. 页面结构骨架

生成完整 HTML 时需包含：

- 三个脚本（按顺序）：`feishu-sync.js`、`physics-svg-lib.js`、`physics-quiz-engine.js`（均使用 GitHub Pages CDN 或相对路径）。
- 一个 `<script type="application/json" id="quiz-json">`，内容为 `{ "title": "...", "questions": [ ... ] }`。
- 一段内联脚本：解析 JSON、实现 `renderDiagram(diagram, question)`、调用 `QuizEngine.init({ data, renderDiagram })`。

引擎会自行注入样式并在找不到容器时创建默认 DOM（`#phyQuizContainer`、`#phyQuizTitle`、`#phyProgressText`、`#phyCorrectCount`、`#phyStreakCount`、`#phyTotalScore`、`#phyProgressBar`、`#phyQuizArea`）。若希望自定义布局，可在 body 内预先写好上述 ID 的容器，再调用 `QuizEngine.init`。

### 2. 脚本加载与初始化示例

```html
<script src="https://xingyun-new.github.io/Skills-XiaoSiMen/lib/feishu-sync.js"></script>
<script src="https://xingyun-new.github.io/Skills-XiaoSiMen/lib/physics-svg-lib.js"></script>
<script src="https://xingyun-new.github.io/Skills-XiaoSiMen/lib/physics-quiz-engine.js"></script>
<script type="application/json" id="quiz-json">
{
  "title": "八年级物理 · 摩擦力弹力综合",
  "questions": [ ... ]
}
</script>
<script>
var quizData = JSON.parse(document.getElementById("quiz-json").textContent);

function renderDiagram(diagram, question) {
  if (!diagram || typeof PhySVG === "undefined") return "";
  var ctx = PhySVG.createSVG(360, 220);
  var scene = diagram.scene || {};
  if (scene.type === "horizontal") {
    PhySVG.ground(ctx, 70, 290, 165, scene.rough);
    PhySVG.block(ctx, 135, 99, 90, 66, scene.bodyLabel || "木块");
    (scene.forces || []).forEach(function(f) {
      PhySVG.forceArrow(ctx, f.x, f.y, f.angle, f.length, f.label, f.color);
    });
  } else if (scene.type === "incline") {
    PhySVG.incline(ctx, 50, 200, 250, scene.angle || 30);
    PhySVG.block(ctx, 150, 120, 60, 40, scene.bodyLabel || "木块");
    (scene.forces || []).forEach(function(f) {
      PhySVG.forceArrow(ctx, f.x, f.y, f.angle, f.length, f.label, f.color);
    });
  }
  return ctx.svg.outerHTML;
}

QuizEngine.init({ data: quizData, renderDiagram: renderDiagram });
</script>
```

### 3. renderDiagram 的职责

- **入参**：`diagram`（题目中的 `diagram` 对象）、`question`（当前题目对象）。
- **返回**：可插入 DOM 的 HTML 字符串（例如包含 `<svg>`），或空字符串表示不显示图。
- **实现方式**：根据 `diagram.scene` 或 `question.id` 分支，使用 [diagram-guide.md](diagram-guide.md) 中的 PhySVG API 组装图示；复杂题可直接手写 SVG 字符串返回。

### 4. 旧版「完整模板」说明

以下为旧版内联样式参考（仅作查阅，生成时以库 + 上述骨架为准）：

（完整旧版模板已移除，以库 + 骨架为准；样式由 physics-quiz-engine.js 自动注入。）

## 生成要点（动态生成）

1. **加载三个库**：feishu-sync.js、physics-svg-lib.js、physics-quiz-engine.js（CDN 或相对路径）
2. **题目数据**：放在 `<script type="application/json" id="quiz-json">` 中
3. **实现 renderDiagram**：用 PhySVG 或手写 SVG，见 [diagram-guide.md](diagram-guide.md)
4. **调用 QuizEngine.init({ data, renderDiagram })**
5. **使用 Write 工具**：将完整 HTML 写入 `quiz-output/` 目录
6. **文件命名**：`physics-{grade}-{topic}-{date}.html`，文件名禁止包含空格

---

## JSON 数据生成规则（必须遵守）

### 所有字符串值必须用双引号 `"` 包裹

```json
"keyMemory": "记住密度公式 ρ=m/V"
```

### 字符串内部的双引号用 `\"` 转义

```json
"commonMistake": "注意\"串联\"和\"并联\"的区别"
```

### 推荐用中文引号避免转义

优先使用「」或 "" 包裹专有名词，天然不需要转义：

```json
"commonMistake": "「串联」电路中电流处处相等，「并联」电路中各支路电压相等"
```

### 物理公式在 JSON 中的写法

使用文字和 Unicode 符号表示公式：
```json
"formula": "ρ = m/V，变形：m = ρV，V = m/ρ"
"formula": "P = UI = I²R = U²/R"
"formula": "F浮 = ρ液gV排"
```

### 禁止事项

- 不要在 JSON 字符串中使用未转义的 `"` `\`
- 不要在 JSON 字符串中使用真实换行（用 `\n` 代替）
- 不要在 JSON 中使用单引号 `'` 作为字符串定界符
- 不要使用尾随逗号（最后一个元素后不要加逗号）
- 不要使用 LaTeX 语法写公式（如 `$F=ma$`），用纯文本代替
