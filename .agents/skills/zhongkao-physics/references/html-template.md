# 自包含 HTML 练习页面模板

生成物理练习 HTML 时，必须生成**完全自包含的单文件**，内联全部 CSS + JavaScript + 手绘 SVG 图示。唯一外部依赖为 `feishu-sync.js`。

> **范本文件**：`math-playgrounds/physics-spring-practice-v2.html` 是标准范本，所有新生成的物理练习应参考其结构和风格。

## 完整模板结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>物理专项练习 - [主题名称]（图解版）</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Microsoft YaHei', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        h1 {
            color: #667eea;
            text-align: center;
            margin-bottom: 10px;
            font-size: 28px;
        }
        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
            font-size: 14px;
        }
        .progress-bar {
            background: #e0e0e0;
            border-radius: 10px;
            height: 20px;
            margin-bottom: 20px;
            overflow: hidden;
        }
        .progress-fill {
            background: linear-gradient(90deg, #667eea, #764ba2);
            height: 100%;
            width: 0%;
            transition: width 0.3s;
            border-radius: 10px;
        }
        .progress-text {
            text-align: center;
            margin-bottom: 10px;
            color: #666;
            font-size: 14px;
        }
        .question-card {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 25px;
            border-left: 4px solid #667eea;
            display: none;
        }
        .question-card.active {
            display: block;
        }
        .question-number {
            background: #667eea;
            color: white;
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
            margin-bottom: 15px;
        }
        .question-text {
            font-size: 18px;
            line-height: 1.8;
            margin-bottom: 20px;
            color: #333;
        }
        .diagram-container {
            background: white;
            border: 2px dashed #ddd;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
        }
        .diagram-container svg {
            max-width: 100%;
            height: auto;
        }
        .hint-box {
            background: #fff3e0;
            border-left: 4px solid #ff9800;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
        }
        .hint-box:hover {
            background: #ffe0b2;
        }
        .hint-title {
            color: #e65100;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .hint-content {
            display: none;
            color: #333;
            line-height: 1.6;
            margin-top: 10px;
        }
        .hint-content.show {
            display: block;
        }
        .options {
            list-style: none;
        }
        .option {
            background: white;
            padding: 15px 20px;
            margin-bottom: 10px;
            border-radius: 8px;
            cursor: pointer;
            border: 2px solid #e0e0e0;
            transition: all 0.3s;
        }
        .option:hover {
            border-color: #667eea;
            background: #f0f0ff;
        }
        .option.selected {
            border-color: #667eea;
            background: #667eea;
            color: white;
        }
        .option.correct {
            border-color: #4caf50;
            background: #4caf50;
            color: white;
        }
        .option.incorrect {
            border-color: #f44336;
            background: #f44336;
            color: white;
        }
        .feedback {
            margin-top: 20px;
            padding: 20px;
            background: #e8f5e9;
            border-radius: 8px;
            border-left: 4px solid #4caf50;
            display: none;
        }
        .feedback.incorrect {
            background: #ffebee;
            border-left-color: #f44336;
        }
        .feedback-title {
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 16px;
        }
        .feedback-text {
            line-height: 1.6;
            color: #333;
        }
        .btn {
            background: linear-gradient(90deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
            transition: transform 0.2s;
        }
        .btn:hover {
            transform: scale(1.05);
        }
        .btn:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }
        .result-screen {
            text-align: center;
            display: none;
        }
        .score-display {
            font-size: 48px;
            color: #667eea;
            margin: 30px 0;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin: 30px 0;
        }
        .stat-item {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
        }
        .stat-number {
            font-size: 32px;
            color: #667eea;
            font-weight: bold;
        }
        .stat-label {
            color: #666;
            font-size: 14px;
            margin-top: 5px;
        }
        .knowledge-point {
            background: #fff3e0;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            border-left: 4px solid #ff9800;
        }
        .knowledge-title {
            font-weight: bold;
            color: #e65100;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔬 物理专项练习 - [主题名称]</h1>
        <p class="subtitle">配图详解版 | [副标题描述]</p>

        <div id="quiz-screen">
            <div class="progress-text">第 <span id="current-q">1</span> 题 / 共 <span id="total-q">10</span> 题</div>
            <div class="progress-bar">
                <div class="progress-fill" id="progress-fill"></div>
            </div>
            <div id="questions-container"></div>
            <button class="btn" id="next-btn" onclick="nextQuestion()" disabled>下一题</button>
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
        // ===== 题目数据 =====
        const questions = [
            {
                number: 1,
                text: "题干文字...",
                diagram: `<svg width="500" height="200" viewBox="0 0 500 200">
                    <!-- 手绘 SVG 内容 -->
                </svg>`,
                hint: "💡 提示文字...",
                options: ["选项 A", "选项 B", "选项 C", "选项 D"],
                correct: 0,
                feedback: "解析文字...",
                knowledge: "知识点总结..."
            }
            // ... 更多题目
        ];

        // ===== 答题引擎 =====
        let currentQuestion = 0;
        let score = 0;
        let selectedOption = null;
        let startTime = Date.now();
        let wrongList = [];

        document.getElementById('total-q').textContent = questions.length;

        function renderQuestion() {
            const container = document.getElementById('questions-container');
            const q = questions[currentQuestion];

            container.innerHTML = `
                <div class="question-card active">
                    <div class="question-number">第${q.number}题</div>
                    <div class="question-text">${q.text}</div>
                    ${q.diagram ? `<div class="diagram-container">${q.diagram}</div>` : ''}
                    ${q.hint ? `
                        <div class="hint-box" onclick="toggleHint(this)">
                            <div class="hint-title">🔍 点击显示提示</div>
                            <div class="hint-content">${q.hint}</div>
                        </div>
                    ` : ''}
                    <ul class="options">
                        ${q.options.map((opt, i) => `
                            <li class="option" onclick="selectOption(${i})">${String.fromCharCode(65+i)}. ${opt}</li>
                        `).join('')}
                    </ul>
                    <div class="feedback" id="feedback"></div>
                </div>
            `;

            document.getElementById('current-q').textContent = currentQuestion + 1;
            document.getElementById('progress-fill').style.width = `${(currentQuestion / questions.length) * 100}%`;
            document.getElementById('next-btn').disabled = true;
            selectedOption = null;
        }

        function toggleHint(hintBox) {
            const content = hintBox.querySelector('.hint-content');
            content.classList.toggle('show');
        }

        function selectOption(index) {
            if (document.getElementById('feedback').style.display === 'block') return;

            const options = document.querySelectorAll('.option');
            options.forEach((opt, i) => {
                opt.classList.remove('selected');
                if (i === index) opt.classList.add('selected');
            });

            selectedOption = index;
            document.getElementById('next-btn').disabled = false;
        }

        function nextQuestion() {
            const q = questions[currentQuestion];
            const feedback = document.getElementById('feedback');
            const options = document.querySelectorAll('.option');

            options.forEach((opt, i) => {
                if (i === q.correct) opt.classList.add('correct');
                else if (i === selectedOption && i !== q.correct) opt.classList.add('incorrect');
            });

            if (selectedOption === q.correct) {
                score += 10;
                feedback.className = 'feedback';
                feedback.innerHTML = `
                    <div class="feedback-title">✅ 正确！</div>
                    <div class="feedback-text">${q.feedback}</div>
                    <div class="knowledge-point">
                        <div class="knowledge-title">📌 知识点</div>
                        ${q.knowledge}
                    </div>
                `;
            } else {
                wrongList.push({
                    question: q.text,
                    correctAnswer: q.options[q.correct],
                    studentAnswer: q.options[selectedOption],
                    topic: q.knowledge
                });
                feedback.className = 'feedback incorrect';
                feedback.innerHTML = `
                    <div class="feedback-title">❌ 错误（正确答案：${String.fromCharCode(65 + q.correct)}）</div>
                    <div class="feedback-text">${q.feedback}</div>
                    <div class="knowledge-point">
                        <div class="knowledge-title">📌 知识点</div>
                        ${q.knowledge}
                    </div>
                `;
            }

            feedback.style.display = 'block';

            setTimeout(() => {
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    renderQuestion();
                } else {
                    showResult();
                }
            }, 4000);
        }

        function showResult() {
            document.getElementById('quiz-screen').style.display = 'none';
            document.getElementById('result-screen').style.display = 'block';
            document.getElementById('progress-fill').style.width = '100%';

            const timeTaken = Math.floor((Date.now() - startTime) / 1000);
            const correctCount = score / 10;
            const accuracyVal = Math.round((correctCount / questions.length) * 100);

            document.getElementById('final-score').textContent = score;
            document.getElementById('correct-count').textContent = correctCount;
            document.getElementById('accuracy').textContent = accuracyVal + '%';
            document.getElementById('time-taken').textContent = timeTaken;

            // 飞书同步
            if (typeof FeishuSync !== 'undefined') {
                FeishuSync.submit({
                    practiceTitle: document.title,
                    questionCount: questions.length,
                    score: correctCount,
                    accuracy: accuracyVal,
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
        }

        renderQuestion();
    </script>
</body>
</html>
```

## 题目数据字段说明

每道题是一个 JavaScript 对象，包含以下字段：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `number` | number | ✅ | 题号（从 1 开始） |
| `text` | string | ✅ | 题干文字 |
| `diagram` | string | 推荐 | 手绘 SVG 字符串（模板字符串），见 diagram-guide.md |
| `hint` | string | ✅ | 点击显示的提示文字 |
| `options` | string[] | ✅ | 4 个选项（选择题） |
| `correct` | number | ✅ | 正确选项索引（0-based） |
| `feedback` | string | ✅ | 详细解析文字 |
| `knowledge` | string | ✅ | 知识点总结（显示在知识卡片中） |

### diagram 字段示例

diagram 是一个 JavaScript 模板字符串，包含完整的 `<svg>` 标签：

```javascript
diagram: `<svg width="500" height="200" viewBox="0 0 500 200">
    <!-- 墙壁 -->
    <rect x="0" y="50" width="30" height="100" fill="#9e9e9e"/>
    <line x1="0" y1="50" x2="0" y2="150" stroke="#333" stroke-width="2"/>
    <text x="5" y="45" font-size="12" fill="#333">墙</text>

    <!-- 弹簧（贝塞尔曲线模拟线圈） -->
    <path d="M 40 100 Q 50 85 60 100 T 80 100 T 100 100 T 120 100 T 140 100 T 160 100 T 180 100 T 200 100 T 220 100 T 240 100"
          stroke="#667eea" stroke-width="2" fill="none"/>

    <!-- 拉力 F（箭头） -->
    <line x1="250" y1="100" x2="350" y2="100" stroke="#f44336" stroke-width="3"
          marker-end="url(#arrow-red)"/>
    <text x="280" y="90" font-size="14" fill="#f44336" font-weight="bold">F (拉力)</text>

    <!-- 弹力标注 -->
    <line x1="30" y1="110" x2="80" y2="110" stroke="#4caf50" stroke-width="3"
          marker-end="url(#arrow-green)"/>
    <text x="40" y="130" font-size="12" fill="#4caf50" font-weight="bold">弹力方向？</text>

    <!-- 思考提示框 -->
    <rect x="280" y="30" width="200" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
    <text x="290" y="50" font-size="12" fill="#333">❓ 思考：</text>
    <text x="290" y="70" font-size="11" fill="#666">弹簧被拉伸，对墙的弹力向哪边？</text>

    <!-- 箭头 marker 定义 -->
    <defs>
        <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#f44336"/>
        </marker>
        <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#4caf50"/>
        </marker>
    </defs>
</svg>`
```

## 物理公式和特殊符号

在 JavaScript 字符串中使用 Unicode 字符表示物理符号：
- 希腊字母：ρ、Ω、η、λ、μ
- 上下标：R₁、R₂、v₀、F₁、F₂
- 单位：℃、m/s、kg/m³、Pa、kW·h
- 运算：×、÷、≈、≥、≤、≠
- 中文引号「」包裹专有名词，避免转义问题

## 生成检查清单

生成 HTML 前确认：
- [ ] 文件是**自包含**的（除 feishu-sync.js 外无外部依赖）
- [ ] 每道题都有**手绘 SVG 图示**（力学/电学/光学/实验题）
- [ ] SVG 图示包含**思考提示框**（至少关键题有）
- [ ] 每道题都有 `hint`、`feedback`、`knowledge` 字段
- [ ] 飞书同步代码已包含（submit + submitWrongQuestions）
- [ ] 文件名无空格，写入 `quiz-output/` 目录
- [ ] 手机端测试：SVG 设置了 `max-width: 100%; height: auto;`
