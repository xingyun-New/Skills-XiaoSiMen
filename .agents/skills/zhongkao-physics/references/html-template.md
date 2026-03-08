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

当题目需要真正显示受力图、电路图、光路图或实验装置图时，在题目对象中加入 `diagram` 字段：

```json
{
  "id": 3,
  "type": "choice",
  "question": "如图所示，下列说法正确的是：",
  "diagram": {
    "type": "force",
    "title": "木块受力示意图",
    "caption": "箭头长度不表示实际大小，只表示方向",
    "scene": {
      "bodyLabel": "木块",
      "surface": "rough",
      "forces": [
        { "direction": "up", "label": "F支", "color": "#42a5f5" },
        { "direction": "down", "label": "G", "color": "#ef5350" },
        { "direction": "right", "label": "F拉", "color": "#ab47bc" },
        { "direction": "left", "label": "f", "color": "#66bb6a" }
      ]
    }
  }
}
```

支持的 `diagram.type`：

- `force`：受力图
- `circuit`：电路图
- `optics`：光路图
- `experiment`：实验装置图

结构化字段细节见 [diagram-guide.md](diagram-guide.md)。

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

## 完整 HTML 模板

以下为完整可用的 HTML 模板。生成时：
1. 替换 `<script id="quiz-json">` 中的 JSON 数据
2. 替换 `<title>` 标签的文字

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>【物理】【年级】· 【主题】练习</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, "Microsoft YaHei", "PingFang SC", sans-serif;
      background: linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #01579b 100%);
      min-height: 100vh;
      padding: 20px;
      color: #333;
    }
    .container { max-width: 720px; margin: 0 auto; }

    .header { text-align: center; color: white; margin-bottom: 24px; }
    .header h1 {
      font-size: 1.8em; margin-bottom: 8px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    .stats-bar { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }
    .stat-badge {
      background: rgba(255,255,255,0.2); backdrop-filter: blur(10px);
      padding: 8px 20px; border-radius: 20px; font-size: 1em; color: white;
    }
    .stat-badge .value { font-weight: bold; }
    .progress-wrap {
      background: rgba(255,255,255,0.2); border-radius: 12px;
      height: 12px; margin: 16px 0; overflow: hidden;
    }
    .progress-fill {
      height: 100%; background: linear-gradient(90deg, #4CAF50, #8BC34A);
      border-radius: 12px; transition: width 0.4s ease;
    }

    .card {
      background: white; border-radius: 20px; padding: 32px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.15);
      margin-bottom: 20px; animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .question-header {
      display: flex; justify-content: space-between;
      align-items: center; margin-bottom: 16px;
    }
    .question-num { font-size: 0.9em; color: #888; }
    .difficulty { font-size: 0.85em; padding: 4px 12px; border-radius: 12px; }
    .diff-1 { background: #E8F5E9; color: #2E7D32; }
    .diff-2 { background: #FFF3E0; color: #E65100; }
    .diff-3 { background: #FCE4EC; color: #C62828; }
    .question-text {
      font-size: 1.15em; line-height: 1.8;
      margin-bottom: 20px; font-weight: 500;
    }

    .options { display: flex; flex-direction: column; gap: 12px; }
    .option-btn {
      display: flex; align-items: center;
      padding: 14px 18px; border: 2px solid #e0e0e0;
      border-radius: 14px; background: #fafafa;
      cursor: pointer; transition: all 0.2s;
      font-size: 1.05em; line-height: 1.6; text-align: left;
    }
    .option-btn:hover:not(.disabled) {
      border-color: #1a237e; background: #e8eaf6; transform: translateX(4px);
    }
    .option-btn .letter {
      width: 32px; height: 32px; border-radius: 50%;
      background: #1a237e; color: white;
      display: flex; align-items: center; justify-content: center;
      font-weight: bold; margin-right: 14px; flex-shrink: 0;
    }
    .option-btn.correct { border-color: #4CAF50; background: #E8F5E9; }
    .option-btn.correct .letter { background: #4CAF50; }
    .option-btn.wrong { border-color: #f44336; background: #FFEBEE; }
    .option-btn.wrong .letter { background: #f44336; }
    .option-btn.disabled { pointer-events: none; opacity: 0.7; }
    .option-btn.disabled:not(.correct):not(.wrong) { opacity: 0.5; }

    .tf-options { display: flex; gap: 16px; }
    .tf-btn {
      flex: 1; padding: 16px; border: 2px solid #e0e0e0;
      border-radius: 14px; background: #fafafa; cursor: pointer;
      font-size: 1.2em; font-weight: bold; text-align: center;
      transition: all 0.2s;
    }
    .tf-btn:hover:not(.disabled) { border-color: #1a237e; transform: scale(1.02); }

    .fill-input {
      width: 100%; padding: 14px 18px; font-size: 1.1em;
      border: 2px solid #e0e0e0; border-radius: 14px;
      outline: none; transition: border-color 0.2s;
    }
    .fill-input:focus { border-color: #1a237e; }
    .fill-blanks-multiple { display: flex; flex-direction: column; gap: 12px; }
    .fill-blank-item { display: flex; align-items: center; gap: 12px; }
    .fill-blank-item label { font-weight: bold; color: #1a237e; min-width: 80px; }
    .fill-blank-item .fill-input { flex: 1; }

    .fillblank-detail {
      background: #f5f5f5;
      border-left: 4px solid #2196F3;
      padding: 16px 20px;
      margin-bottom: 20px;
      border-radius: 0 10px 10px 0;
    }
    .fillblank-item {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 14px; margin: 8px 0; border-radius: 8px;
      font-size: 0.95em; line-height: 1.6;
    }
    .fillblank-item.correct { background: #E8F5E9; border-left: 3px solid #4CAF50; }
    .fillblank-item.wrong { background: #FFEBEE; border-left: 3px solid #f44336; }
    .fillblank-item .blank-num {
      display: inline-block; width: 24px; height: 24px; border-radius: 50%;
      background: #2196F3; color: white; text-align: center; line-height: 24px;
      font-weight: bold; font-size: 0.9em; flex-shrink: 0;
    }
    .fillblank-item.correct .blank-num { background: #4CAF50; }
    .fillblank-item.wrong .blank-num { background: #f44336; }
    .fillblank-item .blank-status { font-weight: bold; min-width: 60px; }
    .fillblank-item.correct .blank-status { color: #2E7D32; }
    .fillblank-item.wrong .blank-status { color: #c62828; }
    .fillblank-item .blank-user { color: #555; flex: 1; }
    .fillblank-item .blank-correct { color: #c62828; font-weight: bold; font-size: 0.9em; }
    .fillblank-summary {
      margin-top: 12px; padding-top: 12px; border-top: 2px solid #ddd;
      font-weight: bold; font-size: 1.05em; color: #333;
    }
    .fillblank-summary .summary-correct { color: #2E7D32; }
    .fillblank-summary .summary-wrong { color: #E65100; }

    .submit-btn {
      width: 100%; padding: 14px; margin-top: 12px;
      background: linear-gradient(135deg, #1a237e, #0d47a1);
      color: white; border: none; border-radius: 14px;
      font-size: 1.1em; font-weight: bold; cursor: pointer;
    }

    .hint-bar {
      display: flex; align-items: center; gap: 10px;
      margin-bottom: 16px; flex-wrap: wrap;
    }
    .hint-btn {
      padding: 8px 18px; border: 2px solid #FF9800; border-radius: 20px;
      background: #FFF8E1; color: #E65100; cursor: pointer;
      font-size: 0.9em; font-weight: bold; transition: all 0.2s;
    }
    .hint-btn:hover:not(.used) { background: #FFE0B2; transform: scale(1.05); }
    .hint-btn.used { opacity: 0.5; pointer-events: none; border-color: #ccc; color: #999; background: #f5f5f5; }
    .hint-cost { font-size: 0.8em; color: #999; }
    .hint-area {
      background: #FFFDE7; border-left: 4px solid #FFB300;
      padding: 12px 16px; border-radius: 0 10px 10px 0;
      margin-bottom: 16px; font-size: 0.95em; line-height: 1.7;
      animation: fadeIn 0.3s ease;
    }
    .hint-area .hint-level { font-weight: bold; color: #F57C00; margin-bottom: 4px; }

    .knowledge-card {
      margin-top: 20px; padding: 20px; border-radius: 14px;
      line-height: 1.8; font-size: 0.95em; animation: fadeIn 0.3s ease;
    }
    .knowledge-card.correct-card {
      background: linear-gradient(135deg, #E8F5E9, #f1f8e9);
      border-left: 5px solid #4CAF50;
    }
    .knowledge-card.wrong-card {
      background: linear-gradient(135deg, #FFF3E0, #FFF8E1);
      border-left: 5px solid #FF9800;
    }
    .kc-title { font-weight: bold; font-size: 1.05em; margin-bottom: 8px; }
    .kc-item { margin: 4px 0; }

    .next-btn, .restart-btn {
      width: 100%; padding: 14px; margin-top: 16px;
      background: linear-gradient(135deg, #1a237e, #0d47a1);
      color: white; border: none; border-radius: 14px;
      font-size: 1.1em; font-weight: bold; cursor: pointer;
      transition: transform 0.2s;
    }
    .next-btn:hover, .restart-btn:hover { transform: scale(1.02); }
    .review-btn {
      width: 100%; padding: 14px; margin-top: 8px;
      background: linear-gradient(135deg, #FF9800, #F57C00);
      color: white; border: none; border-radius: 14px;
      font-size: 1.1em; font-weight: bold; cursor: pointer;
    }

    .result-card { text-align: center; padding: 40px 32px; }
    .result-score {
      font-size: 4em; font-weight: bold;
      background: linear-gradient(135deg, #1a237e, #0d47a1);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .result-detail { margin: 24px 0; line-height: 2; font-size: 1.05em; }
    .weak-topics {
      text-align: left; background: #FFF3E0;
      padding: 16px 20px; border-radius: 12px; margin: 16px 0;
    }
    .weak-topics h3 { color: #E65100; margin-bottom: 8px; }

    .achievement-popup {
      position: fixed; top: 20px; right: 20px;
      background: linear-gradient(135deg, #FFD700, #FFA000);
      color: #333; padding: 16px 24px; border-radius: 16px;
      font-weight: bold; box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      z-index: 1000;
      animation: slideIn 0.4s ease, slideOut 0.4s ease 2.6s forwards;
    }
    @keyframes slideIn {
      from { transform: translateX(300px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut { to { transform: translateX(300px); opacity: 0; } }

    .material-section {
      background: #e8eaf6;
      border-left: 4px solid #1a237e;
      padding: 16px 20px;
      margin-bottom: 20px;
      border-radius: 0 10px 10px 0;
    }
    .material-label { font-size: 0.85em; color: #666; margin-bottom: 8px; font-style: italic; }
    .material-content { line-height: 1.8; font-size: 1em; color: #333; }
    .material-content table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 0.95em; }
    .material-content th, .material-content td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
    .material-content th { background: #e3f2fd; font-weight: bold; }
    .sub-questions { margin-top: 16px; }
    .sub-question-item {
      margin-bottom: 20px; background: #fafafa; padding: 14px;
      border-radius: 12px; border: 1px solid #e0e0e0;
    }
    .sub-question-text { font-weight: 500; margin-bottom: 10px; color: #333; line-height: 1.6; }
    .sub-question-points { font-size: 0.85em; color: #1a237e; font-weight: bold; margin-left: 8px; }
    .answer-textarea {
      width: 100%; min-height: 80px; padding: 12px;
      border: 2px solid #e0e0e0; border-radius: 12px;
      font-size: 0.95em; resize: vertical; outline: none;
      transition: border-color 0.2s; font-family: inherit; line-height: 1.6;
    }
    .answer-textarea:focus { border-color: #1a237e; }
    .submit-material-btn {
      width: 100%; padding: 14px; margin-top: 16px;
      background: linear-gradient(135deg, #1a237e, #283593);
      color: white; border: none; border-radius: 14px;
      font-size: 1.1em; font-weight: bold; cursor: pointer;
      transition: transform 0.2s;
    }
    .submit-material-btn:hover { transform: scale(1.02); }
    .scoring-rubric {
      background: #e8eaf6; border-left: 4px solid #1a237e;
      padding: 14px 16px; margin-top: 16px; border-radius: 0 8px 8px 0;
    }
    .scoring-title { font-weight: bold; color: #1a237e; margin-bottom: 8px; font-size: 0.95em; }
    .scoring-item { margin: 6px 0; font-size: 0.9em; line-height: 1.5; color: #444; }
    .scoring-item::before { content: "✓ "; color: #1a237e; font-weight: bold; }
    .self-assess { display: flex; gap: 12px; margin-top: 20px; flex-wrap: wrap; }
    .assess-btn {
      flex: 1; min-width: 100px; padding: 12px 16px;
      border: 2px solid #e0e0e0; border-radius: 12px; background: #fafafa;
      cursor: pointer; font-weight: bold; font-size: 0.95em;
      transition: all 0.2s; text-align: center;
    }
    .assess-btn:hover:not(.disabled) { border-color: #1a237e; background: #e8eaf6; transform: scale(1.02); }
    .assess-btn.correct { border-color: #4CAF50; background: #E8F5E9; color: #2E7D32; }
    .assess-btn.partial { border-color: #FF9800; background: #FFF3E0; color: #E65100; }
    .assess-btn.wrong { border-color: #f44336; background: #FFEBEE; color: #c62828; }
    .assess-btn.disabled { pointer-events: none; opacity: 0.6; }
    .assess-score { font-size: 0.85em; color: #666; margin-top: 4px; }

    .diagram-panel {
      margin: 18px 0 22px;
      background: linear-gradient(180deg, #f8fbff, #eef4ff);
      border: 1px solid #d8e5ff;
      border-radius: 16px;
      padding: 16px;
    }
    .diagram-title {
      font-weight: bold;
      color: #1a237e;
      margin-bottom: 10px;
      font-size: 1em;
    }
    .diagram-caption {
      margin-top: 10px;
      color: #546e7a;
      font-size: 0.9em;
      line-height: 1.6;
    }
    .diagram-figure {
      width: 100%;
      overflow-x: auto;
    }
    .diagram-figure svg {
      width: 100%;
      height: auto;
      display: block;
    }
    .diagram-note {
      margin-top: 10px;
      padding: 10px 12px;
      border-radius: 10px;
      background: rgba(26, 35, 126, 0.06);
      color: #3949ab;
      font-size: 0.92em;
      line-height: 1.6;
    }
    .exp-diagram {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
    .exp-item {
      min-width: 92px;
      padding: 12px 10px;
      background: white;
      border: 2px solid #c5d7ff;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(26,35,126,0.08);
    }
    .exp-item-icon {
      display: block;
      font-size: 1.4em;
      margin-bottom: 6px;
    }
    .exp-item-label {
      font-size: 0.9em;
      color: #1f2d3d;
      line-height: 1.4;
    }
    .exp-links {
      margin-top: 12px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
    }
    .exp-link {
      background: #fff;
      border: 1px dashed #90a4ae;
      border-radius: 999px;
      padding: 6px 12px;
      font-size: 0.86em;
      color: #455a64;
    }

    @media (max-width: 600px) {
      body { padding: 12px; }
      .card { padding: 20px; border-radius: 16px; }
      .header h1 { font-size: 1.4em; }
      .question-text { font-size: 1.05em; }
      .option-btn { padding: 12px 14px; font-size: 0.95em; }
      .diagram-panel { padding: 12px; }
      .exp-item { min-width: 78px; }
    }
  </style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1 id="quizTitle"></h1>
    <div class="stats-bar">
      <div class="stat-badge">📊 进度 <span class="value" id="progressText">0/0</span></div>
      <div class="stat-badge">✅ 正确 <span class="value" id="correctCount">0</span></div>
      <div class="stat-badge">🔥 连击 <span class="value" id="streakCount">0</span></div>
      <div class="stat-badge">⭐ 积分 <span class="value" id="totalScore">0</span></div>
    </div>
    <div class="progress-wrap">
      <div class="progress-fill" id="progressBar" style="width:0%"></div>
    </div>
  </div>
  <div id="quizArea"></div>
</div>

<!-- ========== 题目数据（纯 JSON，生成时只替换这里） ========== -->
<script type="application/json" id="quiz-json">
{
  "title": "请替换标题",
  "questions": []
}
</script>
<!-- ========== 题目数据结束 ========== -->

<script>
var quizData = JSON.parse(document.getElementById("quiz-json").textContent);
var originalQuestions = JSON.parse(document.getElementById("quiz-json").textContent).questions;

var currentIndex = 0, correctTotal = 0, streak = 0, maxStreak = 0, score = 0;
var answered = false, wrongQuestions = [], hintsUsed = 0;
var hintPenalty = [1.0, 0.7, 0.4, 0.1];
var materialScore = 0;

function init() {
  document.getElementById("quizTitle").textContent = quizData.title;
  updateStats();
  renderQuestion();
}

function updateStats() {
  var total = quizData.questions.length;
  document.getElementById("progressText").textContent = currentIndex + "/" + total;
  document.getElementById("correctCount").textContent = correctTotal;
  document.getElementById("streakCount").textContent = streak;
  document.getElementById("totalScore").textContent = score;
  document.getElementById("progressBar").style.width = ((currentIndex / total) * 100) + "%";
}

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, function(ch) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[ch];
  });
}

function renderDiagram(diagram) {
  if (!diagram || !diagram.type) return "";
  var content = "";
  if (diagram.type === "force") content = renderForceDiagram(diagram.scene || {});
  if (diagram.type === "circuit") content = renderCircuitDiagram(diagram.scene || {});
  if (diagram.type === "optics") content = renderOpticsDiagram(diagram.scene || {});
  if (diagram.type === "experiment") content = renderExperimentDiagram(diagram.scene || {});
  if (!content) return "";
  return '<div class="diagram-panel">' +
    (diagram.title ? '<div class="diagram-title">🖼 ' + escapeHtml(diagram.title) + '</div>' : "") +
    content +
    (diagram.caption ? '<div class="diagram-caption">' + escapeHtml(diagram.caption) + '</div>' : "") +
    "</div>";
}

function getDirectionVector(direction) {
  var map = {
    "up": [0, -1],
    "down": [0, 1],
    "left": [-1, 0],
    "right": [1, 0],
    "up-left": [-0.75, -0.75],
    "up-right": [0.75, -0.75],
    "down-left": [-0.75, 0.75],
    "down-right": [0.75, 0.75]
  };
  return map[direction] || [0, -1];
}

function renderForceDiagram(scene) {
  var bodyLabel = escapeHtml(scene.bodyLabel || "研究对象");
  var forces = scene.forces || [];
  var bodyShape = scene.bodyShape || "rect";
  var surface = scene.surface || "rough";
  var centerX = 180, centerY = 115;
  var bodySvg = bodyShape === "circle"
    ? '<circle cx="' + centerX + '" cy="' + centerY + '" r="32" fill="#90caf9" stroke="#1a237e" stroke-width="2"></circle>'
    : '<rect x="135" y="82" width="90" height="66" rx="12" fill="#90caf9" stroke="#1a237e" stroke-width="2"></rect>';
  var groundSvg = "";
  if (surface !== "none") {
    groundSvg = '<line x1="70" y1="165" x2="290" y2="165" stroke="#6d4c41" stroke-width="4"></line>';
    if (surface === "rough") {
      for (var gx = 82; gx <= 285; gx += 18) {
        groundSvg += '<line x1="' + gx + '" y1="165" x2="' + (gx - 6) + '" y2="174" stroke="#8d6e63" stroke-width="2"></line>';
      }
    }
  }
  var arrowsSvg = forces.map(function(force) {
    var vector = getDirectionVector(force.direction);
    var endX = centerX + vector[0] * 68;
    var endY = centerY + vector[1] * 68;
    var labelX = centerX + vector[0] * 88;
    var labelY = centerY + vector[1] * 88;
    var color = force.color || "#ef5350";
    return '<line x1="' + centerX + '" y1="' + centerY + '" x2="' + endX + '" y2="' + endY + '" stroke="' + color + '" stroke-width="4" marker-end="url(#arrowHead)"></line>' +
      '<text x="' + labelX + '" y="' + labelY + '" fill="' + color + '" font-size="14" font-weight="bold" text-anchor="middle">' +
      escapeHtml(force.label || "F") + '</text>';
  }).join("");
  return '<div class="diagram-figure"><svg viewBox="0 0 360 220" aria-label="受力图">' +
    '<defs><marker id="arrowHead" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">' +
    '<path d="M0,0 L10,5 L0,10 z" fill="#546e7a"></path></marker></defs>' +
    groundSvg + bodySvg +
    '<text x="' + centerX + '" y="' + (centerY + 6) + '" fill="#0d47a1" font-size="16" font-weight="bold" text-anchor="middle">' + bodyLabel + '</text>' +
    arrowsSvg + '</svg></div>';
}

function renderCircuitSymbol(kind, x, y, component) {
  var label = escapeHtml(component.label || "");
  var symbol = "";
  if (kind === "battery") {
    symbol = '<line x1="' + (x - 8) + '" y1="' + (y - 18) + '" x2="' + (x - 8) + '" y2="' + (y + 18) + '" stroke="#263238" stroke-width="3"></line>' +
      '<line x1="' + (x + 8) + '" y1="' + (y - 12) + '" x2="' + (x + 8) + '" y2="' + (y + 12) + '" stroke="#263238" stroke-width="3"></line>';
  } else if (kind === "switch") {
    if (component.closed) {
      symbol = '<line x1="' + (x - 18) + '" y1="' + y + '" x2="' + (x + 18) + '" y2="' + y + '" stroke="#263238" stroke-width="3"></line>';
    } else {
      symbol = '<line x1="' + (x - 18) + '" y1="' + y + '" x2="' + (x - 2) + '" y2="' + y + '" stroke="#263238" stroke-width="3"></line>' +
        '<line x1="' + (x + 2) + '" y1="' + (y - 10) + '" x2="' + (x + 18) + '" y2="' + y + '" stroke="#263238" stroke-width="3"></line>';
    }
  } else if (kind === "lamp") {
    symbol = '<circle cx="' + x + '" cy="' + y + '" r="16" fill="#fffde7" stroke="#263238" stroke-width="3"></circle>' +
      '<line x1="' + (x - 10) + '" y1="' + (y - 10) + '" x2="' + (x + 10) + '" y2="' + (y + 10) + '" stroke="#f9a825" stroke-width="2"></line>' +
      '<line x1="' + (x + 10) + '" y1="' + (y - 10) + '" x2="' + (x - 10) + '" y2="' + (y + 10) + '" stroke="#f9a825" stroke-width="2"></line>';
  } else if (kind === "ammeter" || kind === "voltmeter") {
    var mark = kind === "ammeter" ? "A" : "V";
    symbol = '<circle cx="' + x + '" cy="' + y + '" r="16" fill="#e8f5e9" stroke="#263238" stroke-width="3"></circle>' +
      '<text x="' + x + '" y="' + (y + 5) + '" fill="#1b5e20" font-size="15" font-weight="bold" text-anchor="middle">' + mark + '</text>';
  } else {
    symbol = '<rect x="' + (x - 20) + '" y="' + (y - 12) + '" width="40" height="24" rx="4" fill="#fff" stroke="#263238" stroke-width="3"></rect>';
  }
  if (kind === "resistor") {
    symbol = '<rect x="' + (x - 22) + '" y="' + (y - 10) + '" width="44" height="20" rx="3" fill="#fff" stroke="#263238" stroke-width="3"></rect>';
  }
  return symbol + (label ? '<text x="' + x + '" y="' + (y + 36) + '" fill="#263238" font-size="13" text-anchor="middle">' + label + '</text>' : "");
}

function renderCircuitDiagram(scene) {
  var layout = scene.layout || "series";
  var components = scene.components || [];
  var svg = "";
  if (layout === "parallel") {
    var branches = {};
    var fixed = [];
    components.forEach(function(component) {
      if (component.branch) {
        if (!branches[component.branch]) branches[component.branch] = [];
        branches[component.branch].push(component);
      } else {
        fixed.push(component);
      }
    });
    var branchKeys = Object.keys(branches);
    if (branchKeys.length === 0) branchKeys = ["1"];
    svg += '<line x1="80" y1="60" x2="80" y2="170" stroke="#263238" stroke-width="3"></line>' +
      '<line x1="280" y1="60" x2="280" y2="170" stroke="#263238" stroke-width="3"></line>' +
      '<line x1="80" y1="60" x2="280" y2="60" stroke="#263238" stroke-width="3"></line>' +
      '<line x1="80" y1="170" x2="280" y2="170" stroke="#263238" stroke-width="3"></line>';
    svg += renderCircuitSymbol("battery", 50, 115, fixed[0] || { label: "电源" });
    svg += '<line x1="58" y1="115" x2="80" y2="115" stroke="#263238" stroke-width="3"></line>';
    branchKeys.forEach(function(branchKey, idx) {
      var y = 85 + idx * 42;
      var branchComps = branches[branchKey];
      svg += '<line x1="80" y1="' + y + '" x2="280" y2="' + y + '" stroke="#263238" stroke-width="3"></line>';
      branchComps.forEach(function(component, compIdx) {
        var x = 130 + compIdx * 70;
        svg += renderCircuitSymbol(component.kind, x, y, component);
      });
    });
  } else {
    var seriesComps = components.length ? components : [{ kind: "battery", label: "电源" }, { kind: "resistor", label: "R" }];
    var topY = 70;
    svg += '<line x1="40" y1="' + topY + '" x2="320" y2="' + topY + '" stroke="#263238" stroke-width="3"></line>' +
      '<line x1="320" y1="' + topY + '" x2="320" y2="170" stroke="#263238" stroke-width="3"></line>' +
      '<line x1="320" y1="170" x2="40" y2="170" stroke="#263238" stroke-width="3"></line>' +
      '<line x1="40" y1="170" x2="40" y2="' + topY + '" stroke="#263238" stroke-width="3"></line>';
    seriesComps.forEach(function(component, idx) {
      var x = 70 + idx * (230 / Math.max(1, seriesComps.length - 1));
      svg += renderCircuitSymbol(component.kind, x, topY, component);
    });
  }
  var noteHtml = scene.note ? '<div class="diagram-note">📌 ' + escapeHtml(scene.note) + '</div>' : "";
  return '<div class="diagram-figure"><svg viewBox="0 0 360 220" aria-label="电路图">' + svg + '</svg></div>' + noteHtml;
}

function getOpticsAnchors(kind) {
  if (kind === "convex-lens" || kind === "concave-lens") {
    return {
      leftObjectTop: [85, 72],
      leftMid: [70, 110],
      lensTop: [170, 72],
      lensCenter: [170, 110],
      rightFocus: [245, 110],
      rightTop: [285, 72],
      rightMid: [290, 110],
      center: [170, 110]
    };
  }
  return {
    leftTop: [90, 55],
    leftMid: [70, 110],
    leftBottom: [90, 165],
    center: [170, 110],
    rightTop: [250, 55],
    rightMid: [290, 110],
    rightBottom: [250, 165]
  };
}

function renderOpticsDiagram(scene) {
  var kind = scene.kind || "reflection";
  var anchors = getOpticsAnchors(kind);
  var baseSvg = "";
  if (kind === "reflection") {
    baseSvg = '<line x1="60" y1="150" x2="280" y2="150" stroke="#455a64" stroke-width="4"></line>' +
      '<line x1="170" y1="45" x2="170" y2="180" stroke="#90a4ae" stroke-dasharray="6 5" stroke-width="2"></line>';
    anchors.center = [170, 150];
  } else if (kind === "refraction") {
    baseSvg = '<line x1="60" y1="110" x2="280" y2="110" stroke="#29b6f6" stroke-width="4"></line>' +
      '<line x1="170" y1="35" x2="170" y2="185" stroke="#90a4ae" stroke-dasharray="6 5" stroke-width="2"></line>' +
      '<text x="80" y="96" fill="#0277bd" font-size="13">空气</text>' +
      '<text x="80" y="138" fill="#0277bd" font-size="13">水</text>';
  } else if (kind === "convex-lens") {
    baseSvg = '<line x1="40" y1="110" x2="320" y2="110" stroke="#90a4ae" stroke-width="2"></line>' +
      '<path d="M170 45 Q145 110 170 175 Q195 110 170 45" fill="#e3f2fd" stroke="#1565c0" stroke-width="3"></path>' +
      '<text x="115" y="104" fill="#c62828" font-size="13">F</text>' +
      '<text x="245" y="104" fill="#c62828" font-size="13">F</text>';
  } else {
    baseSvg = '<line x1="40" y1="110" x2="320" y2="110" stroke="#90a4ae" stroke-width="2"></line>' +
      '<path d="M170 45 Q195 110 170 175 Q145 110 170 45" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="3"></path>';
  }
  var rays = (scene.rays || []).map(function(ray) {
    var from = anchors[ray.from] || anchors.leftTop || anchors.center;
    var to = anchors[ray.to] || anchors.rightTop || anchors.center;
    var color = ray.color || "#ff7043";
    var midX = (from[0] + to[0]) / 2;
    var midY = (from[1] + to[1]) / 2 - 6;
    return '<line x1="' + from[0] + '" y1="' + from[1] + '" x2="' + to[0] + '" y2="' + to[1] +
      '" stroke="' + color + '" stroke-width="3" marker-end="url(#opticsArrow)" ' +
      (ray.dashed ? 'stroke-dasharray="6 4"' : "") + '></line>' +
      (ray.label ? '<text x="' + midX + '" y="' + midY + '" fill="' + color + '" font-size="12" text-anchor="middle">' +
      escapeHtml(ray.label) + '</text>' : "");
  }).join("");
  var noteHtml = scene.note ? '<div class="diagram-note">📌 ' + escapeHtml(scene.note) + '</div>' : "";
  return '<div class="diagram-figure"><svg viewBox="0 0 360 220" aria-label="光路图">' +
    '<defs><marker id="opticsArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">' +
    '<path d="M0,0 L10,5 L0,10 z" fill="#546e7a"></path></marker></defs>' +
    baseSvg + rays + '</svg></div>' + noteHtml;
}

function getExperimentIcon(kind) {
  var icons = {
    "spring-scale": "🧲",
    "block": "🧱",
    "surface": "📏",
    "weight": "⚖️",
    "beaker": "🥛",
    "thermometer": "🌡️",
    "lamp": "💡",
    "lens": "🔍"
  };
  return icons[kind] || "🔧";
}

function renderExperimentDiagram(scene) {
  var items = scene.items || [];
  var itemHtml = items.map(function(item) {
    return '<div class="exp-item"><span class="exp-item-icon">' + getExperimentIcon(item.kind) +
      '</span><div class="exp-item-label">' + escapeHtml(item.label || item.kind || "器材") + '</div></div>';
  }).join("");
  var linksHtml = "";
  if (scene.arrows && scene.arrows.length > 0) {
    linksHtml = '<div class="exp-links">' + scene.arrows.map(function(link) {
      var fromItem = items[link.from] ? items[link.from].label : ("器材" + link.from);
      var toItem = items[link.to] ? items[link.to].label : ("器材" + link.to);
      return '<div class="exp-link">' + escapeHtml(fromItem) + ' → ' + escapeHtml(toItem) +
        (link.label ? '：' + escapeHtml(link.label) : "") + '</div>';
    }).join("") + '</div>';
  }
  var noteHtml = scene.note ? '<div class="diagram-note">📌 ' + escapeHtml(scene.note) + '</div>' : "";
  return '<div class="exp-diagram">' + itemHtml + '</div>' + linksHtml + noteHtml;
}

function renderQuestion() {
  if (currentIndex >= quizData.questions.length) { showResult(); return; }
  var q = quizData.questions[currentIndex];
  var diffLabels = ["", "基础", "中等", "拔高"];
  var letters = ["A", "B", "C", "D"];
  var area = document.getElementById("quizArea");
  hintsUsed = 0;
  var diagramHtml = renderDiagram(q.diagram);

  var hintBtnHtml = "";
  if (q.hints && q.hints.length > 0) {
    var labels = ["💡 提示1", "📖 提示2", "🎯 提示3"];
    var costs = ["-30%", "-60%", "-90%"];
    hintBtnHtml = '<div class="hint-bar">' +
      q.hints.map(function(_, i) {
        return '<button class="hint-btn" id="hintBtn-' + i + '" onclick="useHint(' + i + ')">' +
          labels[i] + ' <span class="hint-cost">(' + costs[i] + ')</span></button>';
      }).join("") + '</div><div id="hintArea"></div>';
  }

  var optHtml = "";
  if (q.type === "choice") {
    optHtml = '<div class="options">' + q.options.map(function(opt, i) {
      return '<div class="option-btn" onclick="selectChoice(' + i + ')" id="opt-' + i + '">' +
        '<span class="letter">' + letters[i] + '</span><span>' + opt + '</span></div>';
    }).join("") + "</div>";
  } else if (q.type === "truefalse") {
    optHtml = '<div class="tf-options">' +
      '<div class="tf-btn" onclick="selectTF(true)" id="tf-true">✓ 正确</div>' +
      '<div class="tf-btn" onclick="selectTF(false)" id="tf-false">✗ 错误</div></div>';
  } else if (q.type === "fillblank") {
    var answers = Array.isArray(q.answer) ? q.answer : [q.answer];
    var correctAnswer = answers[0].split("；");
    var numBlanks = correctAnswer.length;
    if (numBlanks === 1) {
      optHtml = '<input class="fill-input" id="fillInput" placeholder="请输入答案..." ' +
        'onkeydown="if(event.key===\'Enter\')submitFill()">' +
        '<button class="submit-btn" onclick="submitFill()">提交答案</button>';
    } else {
      optHtml = '<div class="fill-blanks-multiple">' +
        correctAnswer.map(function(_, i) {
          return '<div class="fill-blank-item"><label>第' + (i+1) + '空：</label>' +
            '<input class="fill-input" id="fillInput-' + i + '" placeholder="请输入第' + (i+1) + '个空的答案..." ' +
            'onkeydown="if(event.key===\'Enter\')submitFill()"></div>';
        }).join("") +
        '</div><button class="submit-btn" onclick="submitFill()">提交答案</button>';
    }
  } else if (q.type === "calculation" || q.type === "experiment") {
    optHtml = renderMaterialQuestion(q);
  }

  area.innerHTML = '<div class="card"><div class="question-header">' +
    '<span class="question-num">第 ' + (currentIndex + 1) + ' / ' + quizData.questions.length + ' 题</span>' +
    '<span class="difficulty diff-' + q.difficulty + '">' + diffLabels[q.difficulty] + '</span></div>' +
    '<div class="question-text">' + q.question + '</div>' +
    diagramHtml + hintBtnHtml + optHtml +
    '<div id="feedback"></div></div>';
  answered = false;
}

function useHint(level) {
  if (answered) return;
  var q = quizData.questions[currentIndex];
  if (!q.hints || level >= q.hints.length) return;
  for (var i = 0; i <= level; i++) {
    var btn = document.getElementById("hintBtn-" + i);
    if (btn) btn.classList.add("used");
  }
  hintsUsed = level + 1;
  var labels = ["💡 方向提示", "📖 关键知识", "🎯 解题思路"];
  var html = "";
  for (var j = 0; j <= level; j++) {
    html += '<div class="hint-area"><div class="hint-level">' + labels[j] + '</div>' + q.hints[j] + '</div>';
  }
  document.getElementById("hintArea").innerHTML = html;
}

function selectChoice(idx) {
  if (answered) return; answered = true;
  var q = quizData.questions[currentIndex];
  processAnswer(idx === q.answer);
  document.querySelectorAll(".option-btn").forEach(function(btn, i) {
    btn.classList.add("disabled");
    if (i === q.answer) btn.classList.add("correct");
    if (i === idx && idx !== q.answer) btn.classList.add("wrong");
  });
}

function selectTF(val) {
  if (answered) return; answered = true;
  var q = quizData.questions[currentIndex];
  processAnswer(val === q.answer);
  var t = document.getElementById("tf-true"), f = document.getElementById("tf-false");
  t.classList.add("disabled"); f.classList.add("disabled");
  (q.answer ? t : f).classList.add("correct");
  (q.answer ? f : t).classList.add("wrong");
}

function submitFill() {
  if (answered) return;
  var q = quizData.questions[currentIndex];
  var answers = Array.isArray(q.answer) ? q.answer : [q.answer];
  var correctAnswer = answers[0].split(/[;；]/);
  var numBlanks = correctAnswer.length;
  var isAllCorrect = true;
  var correctCount = 0;
  if (numBlanks === 1) {
    var input = document.getElementById("fillInput").value.trim();
    if (!input) return; answered = true;
    isAllCorrect = answers.some(function(a) { return input === a.trim(); });
  } else {
    for (var i = 0; i < numBlanks; i++) {
      var input = document.getElementById("fillInput-" + i).value.trim();
      if (!input) { alert("请完成所有空的填写！"); return; }
      var inputEl = document.getElementById("fillInput-" + i);
      var isThisCorrect = (input === correctAnswer[i].trim());
      if (isThisCorrect) {
        correctCount++;
        inputEl.style.borderColor = "#4CAF50";
        inputEl.style.backgroundColor = "#E8F5E9";
      } else {
        isAllCorrect = false;
        inputEl.style.borderColor = "#f44336";
        inputEl.style.backgroundColor = "#FFEBEE";
      }
      inputEl.disabled = true;
    }
    answered = true;
  }
  q.fillBlankResult = { total: numBlanks, correct: correctCount, allCorrect: isAllCorrect };
  processAnswer(isAllCorrect);
}

function processAnswer(isCorrect) {
  var q = quizData.questions[currentIndex];
  if (isCorrect) {
    streak++; if (streak > maxStreak) maxStreak = streak;
    var basePoints = (streak >= 5 ? 15 : streak >= 3 ? 12 : 10) + q.difficulty * 5;
    var earnedPoints = Math.round(basePoints * hintPenalty[hintsUsed]);
    score += earnedPoints;
    correctTotal++;
    if (hintsUsed === 0 && streak === 3) showAchievement("🔥 三连击！");
    if (hintsUsed === 0 && streak === 5) showAchievement("⚡ 五连击！太棒了！");
    if (hintsUsed === 0 && streak === 10) showAchievement("🏆 十连击！学霸！");
    if (hintsUsed > 0) showAchievement("📖 用提示答对 +" + earnedPoints);
  } else {
    streak = 0;
    wrongQuestions.push({ index: currentIndex });
  }
  updateStats();
  showFeedback(isCorrect, q);
}

function showFeedback(isCorrect, q) {
  var kc = q.knowledgeCard;
  var cls = isCorrect ? "correct-card" : "wrong-card";
  var fillBlankFeedback = "";
  if (q.type === "fillblank" && q.fillBlankResult && q.fillBlankResult.total > 1) {
    var result = q.fillBlankResult;
    var answers = Array.isArray(q.answer) ? q.answer : [q.answer];
    var correctAnswer = answers[0].split(/[;；]/);
    fillBlankFeedback = '<div class="fillblank-detail"><div class="kc-title" style="margin-bottom:12px;">📝 各空判分详情</div>';
    for (var i = 0; i < result.total; i++) {
      var userInput = document.getElementById("fillInput-" + i);
      var userVal = userInput ? userInput.value.trim() : "";
      var isThisCorrect = (userVal === correctAnswer[i].trim());
      fillBlankFeedback += '<div class="fillblank-item ' + (isThisCorrect ? 'correct' : 'wrong') + '">' +
        '<span class="blank-num">' + (i+1) + '</span>' +
        '<span class="blank-status">' + (isThisCorrect ? '✓ 正确' : '✗ 错误') + '</span>' +
        '<span class="blank-user">你的答案：' + (userVal || "未填") + '</span>' +
        (!isThisCorrect ? '<span class="blank-correct">正确答案：' + correctAnswer[i] + '</span>' : '') +
        '</div>';
    }
    fillBlankFeedback += '<div class="fillblank-summary">共 ' + result.total + ' 空，答对 ' + result.correct + ' 空' +
      (result.allCorrect ? ' <span class="summary-correct">✅ 全部正确！</span>' : ' <span class="summary-wrong">💪 继续加油！</span>') +
      '</div></div>';
  }
  var h = '<div class="knowledge-card ' + cls + '">' +
    '<div class="kc-title">' + (isCorrect ? "✅ 回答正确！" : "❌ 回答错误") + "</div>" +
    '<div class="kc-item">📚 <b>考点：</b>' + kc.topic + "</div>" +
    '<div class="kc-item">📖 <b>出处：</b>' + kc.source + "</div>";
  if (kc.formula) h += '<div class="kc-item">🔬 <b>相关公式：</b>' + kc.formula + "</div>";
  h += '<div class="kc-item">💡 <b>关键记忆：</b>' + kc.keyMemory + "</div>";
  if (!isCorrect) h += '<div class="kc-item">⚠️ <b>易错提醒：</b>' + kc.commonMistake + "</div>";
  if (kc.relatedTopics) h += '<div class="kc-item">🔗 <b>关联知识：</b>' + kc.relatedTopics + "</div>";
  h += "</div>";
  if (fillBlankFeedback) { h = fillBlankFeedback + h; }
  h += '<button class="next-btn" onclick="nextQuestion()">' +
    (currentIndex < quizData.questions.length - 1 ? "下一题 →" : "查看成绩 📊") + "</button>";
  document.getElementById("feedback").innerHTML = h;
}

function nextQuestion() { currentIndex++; updateStats(); renderQuestion(); }

function showResult() {
  var total = quizData.questions.length;
  var pct = Math.round((correctTotal / total) * 100);
  var rating = pct >= 90 ? "🏆 优秀！物理学得真棒！"
    : pct >= 70 ? "👍 良好！继续加油！"
    : pct >= 60 ? "✓ 及格，部分知识点需要巩固"
    : "💪 加油！建议重新复习相关章节";
  var weakHtml = "";
  if (wrongQuestions.length > 0) {
    var seen = {}, topics = [];
    wrongQuestions.forEach(function(w) {
      var t = quizData.questions[w.index].knowledgeCard.topic;
      if (!seen[t]) { seen[t] = true; topics.push(t); }
    });
    weakHtml = '<div class="weak-topics"><h3>📋 薄弱知识点</h3>' +
      topics.map(function(t) { return "<div>· " + t + "</div>"; }).join("") +
      "</div>" + '<button class="review-btn" onclick="reviewWrong()">🔄 错题重练（' +
      wrongQuestions.length + "题）</button>";
  }
  document.getElementById("progressBar").style.width = "100%";
  document.getElementById("progressText").textContent = total + "/" + total;
  document.getElementById("quizArea").innerHTML = '<div class="card result-card">' +
    '<div style="font-size:1.2em;margin-bottom:8px;">练习完成！</div>' +
    '<div class="result-score">' + pct + "分</div>" +
    '<div class="result-detail">共 ' + total + " 题，答对 " + correctTotal + " 题<br>" +
    "最高连击 " + maxStreak + " 次 · 总积分 " + score + "<br>" + rating + "</div>" +
    weakHtml + '<button class="restart-btn" onclick="restart()">🔁 重新开始</button></div>';
}

function reviewWrong() {
  quizData.questions = wrongQuestions.map(function(w) { return originalQuestions[w.index]; });
  currentIndex = 0; correctTotal = 0; streak = 0; score = 0;
  wrongQuestions = []; updateStats(); renderQuestion();
}

function restart() { location.reload(); }

function showAchievement(text) {
  var el = document.createElement("div");
  el.className = "achievement-popup"; el.textContent = text;
  document.body.appendChild(el);
  setTimeout(function() { el.remove(); }, 3000);
}

function renderMaterialQuestion(q) {
  var materialHtml = "";
  if (q.material) {
    var materialLabel = q.materialLabel ? '<div class="material-label">' + q.materialLabel + '</div>' : '';
    materialHtml = '<div class="material-section">' + materialLabel +
      '<div class="material-content">' + q.material + '</div></div>';
  }
  var subQuestionsHtml = '';
  if (q.subQuestions && q.subQuestions.length > 0) {
    subQuestionsHtml = '<div class="sub-questions">' +
      q.subQuestions.map(function(sq, i) {
        return '<div class="sub-question-item">' +
          '<div class="sub-question-text">(' + (i + 1) + ') ' + sq.question +
          '<span class="sub-question-points">（' + sq.points + '分）</span></div>' +
          '<textarea class="answer-textarea" id="material-answer-' + i + '" ' +
          'placeholder="请在此处写出解题过程和答案..."></textarea>' +
          '</div>';
      }).join("") + '</div>';
  }
  return materialHtml + subQuestionsHtml +
    '<button class="submit-material-btn" onclick="submitMaterial()">提交答案</button>' +
    '<div id="materialFeedback"></div>';
}

function submitMaterial() {
  if (answered) return;
  var q = quizData.questions[currentIndex];
  var allFilled = true;
  if (q.subQuestions) {
    for (var i = 0; i < q.subQuestions.length; i++) {
      var val = document.getElementById("material-answer-" + i).value.trim();
      if (!val) allFilled = false;
    }
  }
  if (!allFilled) { alert("请先完成所有小题的作答！"); return; }
  answered = true;
  document.querySelectorAll(".answer-textarea").forEach(function(el) { el.disabled = true; });
  var btn = document.querySelector(".submit-material-btn");
  if (btn) btn.style.display = "none";
  showMaterialFeedback(q);
}

function showMaterialFeedback(q) {
  var kc = q.knowledgeCard;
  var totalPoints = 0;
  if (q.subQuestions) {
    for (var i = 0; i < q.subQuestions.length; i++) { totalPoints += q.subQuestions[i].points; }
  }
  var scoringHtml = '';
  if (q.subQuestions) {
    scoringHtml = '<div class="scoring-rubric"><div class="scoring-title">📝 参考答案与评分标准</div>' +
      q.subQuestions.map(function(sq, i) {
        var pointsHtml = (sq.scoring && sq.scoring.length > 0) ?
          sq.scoring.map(function(s) { return '<div class="scoring-item">' + s + '</div>'; }).join("") :
          '<div class="scoring-item">答出关键步骤即可得分</div>';
        return '<div style="margin-bottom:12px;"><b>(' + (i+1) + ')</b> ' + sq.answer +
          '<div style="margin-top:6px;">' + pointsHtml + '</div></div>';
      }).join("") + '</div>';
  }
  var assessHtml = '<div style="margin-top:12px;font-weight:bold;color:#1a237e;">请对照参考答案自评：</div>' +
    '<div class="self-assess">' +
    '<button class="assess-btn" id="assessCorrect" onclick="selfAssess(\'correct\')">' +
    '✅ 完全正确<div class="assess-score">得 ' + totalPoints + ' 分</div></button>' +
    '<button class="assess-btn" id="assessPartial" onclick="selfAssess(\'partial\')">' +
    '🔶 部分正确<div class="assess-score">得 ' + Math.round(totalPoints * 0.5) + ' 分</div></button>' +
    '<button class="assess-btn" id="assessWrong" onclick="selfAssess(\'wrong\')">' +
    '❌ 错误<div class="assess-score">得 0 分</div></button></div>';
  var feedbackArea = document.getElementById("materialFeedback");
  feedbackArea.innerHTML = '<div class="knowledge-card correct-card">' +
    '<div class="kc-title">📖 解题参考</div>' +
    '<div class="kc-item">📚 <b>考点：</b>' + kc.topic + '</div>' +
    '<div class="kc-item">📖 <b>出处：</b>' + kc.source + '</div>' +
    (kc.formula ? '<div class="kc-item">🔬 <b>核心公式：</b>' + kc.formula + '</div>' : '') +
    (kc.answerTechnique ? '<div class="kc-item">💡 <b>解题技巧：</b>' + kc.answerTechnique + '</div>' : '') +
    '</div>' + scoringHtml + assessHtml;
}

function selfAssess(level) {
  var q = quizData.questions[currentIndex];
  var totalPoints = 0;
  if (q.subQuestions) {
    for (var i = 0; i < q.subQuestions.length; i++) { totalPoints += q.subQuestions[i].points; }
  }
  document.querySelectorAll(".assess-btn").forEach(function(btn) { btn.classList.add("disabled"); });
  var earnedPoints = 0;
  var isCorrect = false;
  if (level === "correct") {
    earnedPoints = totalPoints; isCorrect = true;
    document.getElementById("assessCorrect").classList.add("correct");
  } else if (level === "partial") {
    earnedPoints = Math.round(totalPoints * 0.5); isCorrect = true;
    document.getElementById("assessPartial").classList.add("partial");
  } else {
    document.getElementById("assessWrong").classList.add("wrong");
    streak = 0; wrongQuestions.push({ index: currentIndex });
  }
  if (isCorrect) {
    streak++; if (streak > maxStreak) maxStreak = streak;
    var basePoints = (streak >= 5 ? 15 : streak >= 3 ? 12 : 10) + q.difficulty * 5;
    var earnedPointsWithBonus = Math.round(basePoints * hintPenalty[hintsUsed]) + earnedPoints;
    score += earnedPointsWithBonus; correctTotal++;
    if (hintsUsed === 0 && streak === 3) showAchievement("🔥 三连击！");
    if (hintsUsed === 0 && streak === 5) showAchievement("⚡ 五连击！太棒了！");
    if (hintsUsed === 0 && streak === 10) showAchievement("🏆 十连击！学霸！");
  }
  updateStats();
  var feedbackArea = document.getElementById("materialFeedback");
  var kc = q.knowledgeCard;
  var extraHtml = '';
  if (!isCorrect) {
    extraHtml = '<div class="kc-item" style="margin-top:12px;">⚠️ <b>易错提醒：</b>' + kc.commonMistake + '</div>';
  }
  if (kc.relatedTopics) {
    extraHtml += '<div class="kc-item">🔗 <b>关联知识：</b>' + kc.relatedTopics + '</div>';
  }
  feedbackArea.innerHTML += '<div class="knowledge-card ' + (isCorrect ? 'correct-card' : 'wrong-card') +
    '" style="margin-top:16px;">' + extraHtml +
    '<div class="kc-item" style="font-weight:bold;">' + (isCorrect ? '✅ 得分：' + earnedPoints : '❌ 本题未得分') + '</div>' +
    '</div>' + '<button class="next-btn" onclick="nextQuestion()">' +
    (currentIndex < quizData.questions.length - 1 ? "下一题 →" : "查看成绩 📊") + "</button>";
}

init();
</script>
</body>
</html>
```

## 生成要点

1. **只替换 JSON 数据块**：找到 `<script type="application/json" id="quiz-json">` 标签，只替换其中的 JSON 内容
2. **替换页面标题**：`<title>` 标签的文字
3. **图示题优先带 `diagram` 字段**：受力图、电路图、光路图、实验装置图要让页面直接渲染，不只写文字
4. **使用 Write 工具**：将完整 HTML 写入 `quiz-output/` 目录
5. **文件命名**：`physics-{grade}-{topic}-{date}.html`

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
