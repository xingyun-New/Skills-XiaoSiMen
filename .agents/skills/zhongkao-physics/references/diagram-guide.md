# 手绘 SVG 图示范式库

本文档提供初中物理常见场景的 **手绘 SVG 代码片段**，生成练习题时直接复制并修改即可。每个 SVG 都是独立的，不依赖任何外部库。

## 通用规范

### 尺寸
- 宽度：400-500px
- 高度：200-300px
- `viewBox` 与 width/height 一致

### 颜色规范
| 物理量 | 颜色 | HEX |
|--------|------|-----|
| 重力 G | 红色 | `#f44336` |
| 支持力 F支 | 蓝色 | `#42a5f5` |
| 摩擦力 f | 绿色 | `#4caf50` |
| 拉力/推力 F | 紫色/红色 | `#ab47bc` / `#f44336` |
| 弹力 F弹 | 橙色 | `#ff9800` |
| 弹簧线圈 | 品蓝 | `#667eea` |
| 墙壁/地面 | 灰色/棕色 | `#9e9e9e` / `#6d4c41` |
| 物体填充 | 浅蓝 | `#e3f2fd` |

### 箭头 marker 模板
每个 SVG 中按需定义（放在 `<defs>` 里）：

```svg
<defs>
    <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#f44336"/>
    </marker>
    <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#42a5f5"/>
    </marker>
    <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#4caf50"/>
    </marker>
    <marker id="arrow-purple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#ab47bc"/>
    </marker>
    <marker id="arrow-orange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#ff9800"/>
    </marker>
    <!-- 反向箭头（向左） -->
    <marker id="arrow-left-red" markerWidth="10" markerHeight="10" refX="1" refY="3" orient="auto">
        <path d="M9,0 L9,6 L0,3 z" fill="#f44336"/>
    </marker>
</defs>
```

### 思考提示框模板
嵌在 SVG 中，帮助学生思考：

```svg
<!-- 黄色思考框 -->
<rect x="280" y="30" width="200" height="60" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="4"/>
<text x="290" y="50" font-size="12" fill="#333" font-weight="bold">❓ 思考：</text>
<text x="290" y="70" font-size="11" fill="#666">第一行问题</text>
<text x="290" y="85" font-size="11" fill="#666">第二行问题</text>

<!-- 绿色分析框 -->
<rect x="280" y="30" width="200" height="70" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="4"/>
<text x="290" y="50" font-size="12" fill="#333" font-weight="bold">📌 分析：</text>
<text x="290" y="68" font-size="11" fill="#666">要点 1</text>
<text x="290" y="83" font-size="11" fill="#666">要点 2</text>

<!-- 蓝色关键框 -->
<rect x="280" y="30" width="200" height="60" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="4"/>
<text x="290" y="50" font-size="13" fill="#333" font-weight="bold">💡 关键：</text>
<text x="290" y="70" font-size="11" fill="#666">结论或规律</text>
```

---

## 场景 1：水平面上物体受力分析

适用于：匀速直线运动、摩擦力方向、二力平衡

```svg
<svg width="450" height="220" viewBox="0 0 450 220">
    <!-- 粗糙地面 -->
    <line x1="50" y1="160" x2="350" y2="160" stroke="#6d4c41" stroke-width="4"/>
    <!-- 粗糙纹理 -->
    <line x1="70" y1="160" x2="60" y2="170" stroke="#8d6e63" stroke-width="2"/>
    <line x1="100" y1="160" x2="90" y2="170" stroke="#8d6e63" stroke-width="2"/>
    <line x1="130" y1="160" x2="120" y2="170" stroke="#8d6e63" stroke-width="2"/>
    <line x1="160" y1="160" x2="150" y2="170" stroke="#8d6e63" stroke-width="2"/>
    <line x1="190" y1="160" x2="180" y2="170" stroke="#8d6e63" stroke-width="2"/>
    <line x1="220" y1="160" x2="210" y2="170" stroke="#8d6e63" stroke-width="2"/>
    <line x1="250" y1="160" x2="240" y2="170" stroke="#8d6e63" stroke-width="2"/>
    <line x1="280" y1="160" x2="270" y2="170" stroke="#8d6e63" stroke-width="2"/>
    <line x1="310" y1="160" x2="300" y2="170" stroke="#8d6e63" stroke-width="2"/>

    <!-- 木块 -->
    <rect x="140" y="100" width="90" height="60" rx="4" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
    <text x="185" y="135" font-size="14" fill="#0d47a1" font-weight="bold" text-anchor="middle">木块</text>

    <!-- 力箭头 -->
    <!-- G 向下 -->
    <line x1="185" y1="130" x2="185" y2="195" stroke="#f44336" stroke-width="3" marker-end="url(#arrow-red)"/>
    <text x="195" y="195" font-size="13" fill="#f44336" font-weight="bold">G</text>
    <!-- F支 向上 -->
    <line x1="185" y1="130" x2="185" y2="65" stroke="#42a5f5" stroke-width="3" marker-end="url(#arrow-blue)"/>
    <text x="195" y="70" font-size="13" fill="#42a5f5" font-weight="bold">F支</text>
    <!-- F拉 向右 -->
    <line x1="185" y1="130" x2="270" y2="130" stroke="#ab47bc" stroke-width="3" marker-end="url(#arrow-purple)"/>
    <text x="250" y="122" font-size="13" fill="#ab47bc" font-weight="bold">F拉</text>
    <!-- f 向左 -->
    <line x1="185" y1="130" x2="100" y2="130" stroke="#4caf50" stroke-width="3" marker-end="url(#arrow-green)"/>
    <text x="100" y="122" font-size="13" fill="#4caf50" font-weight="bold">f</text>

    <!-- defs -->
    <defs>
        <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#f44336"/></marker>
        <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#42a5f5"/></marker>
        <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#4caf50"/></marker>
        <marker id="arrow-purple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#ab47bc"/></marker>
    </defs>
</svg>
```

## 场景 2：墙壁 + 弹簧 + 水平拉力

适用于：弹力方向判断、弹簧对墙的弹力

```svg
<svg width="500" height="200" viewBox="0 0 500 200">
    <!-- 墙壁 -->
    <rect x="0" y="50" width="30" height="100" fill="#9e9e9e"/>
    <line x1="0" y1="50" x2="0" y2="150" stroke="#333" stroke-width="2"/>
    <text x="5" y="45" font-size="12" fill="#333">墙</text>

    <!-- 弹簧（贝塞尔曲线线圈） -->
    <line x1="30" y1="100" x2="250" y2="100" stroke="#333" stroke-width="3"/>
    <path d="M 40 100 Q 50 85 60 100 T 80 100 T 100 100 T 120 100 T 140 100 T 160 100 T 180 100 T 200 100 T 220 100 T 240 100"
          stroke="#667eea" stroke-width="2" fill="none"/>

    <!-- 拉力 F（向右） -->
    <line x1="250" y1="100" x2="350" y2="100" stroke="#f44336" stroke-width="3" marker-end="url(#arrow-red)"/>
    <text x="280" y="90" font-size="14" fill="#f44336" font-weight="bold">F (拉力)</text>

    <!-- 弹力方向标注（向左） -->
    <line x1="30" y1="120" x2="80" y2="120" stroke="#4caf50" stroke-width="3" marker-end="url(#arrow-green)"/>
    <text x="40" y="140" font-size="12" fill="#4caf50" font-weight="bold">弹力方向？</text>

    <!-- 思考提示框 -->
    <rect x="280" y="30" width="200" height="50" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="4"/>
    <text x="290" y="50" font-size="12" fill="#333">❓ 思考：</text>
    <text x="290" y="70" font-size="11" fill="#666">弹簧被拉伸，要恢复原长，</text>
    <text x="290" y="82" font-size="11" fill="#666">对墙的弹力向哪边？</text>

    <defs>
        <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#f44336"/></marker>
        <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#4caf50"/></marker>
    </defs>
</svg>
```

## 场景 3：弹簧测力计 + 钩码（竖直悬挂）

适用于：弹簧测力计使用、弹力与重力关系

```svg
<svg width="200" height="300" viewBox="0 0 200 300">
    <!-- 固定点 -->
    <line x1="80" y1="20" x2="120" y2="20" stroke="#333" stroke-width="3"/>

    <!-- 弹簧测力计外壳 -->
    <rect x="82" y="30" width="36" height="60" rx="4" fill="#fff" stroke="#37474f" stroke-width="2"/>
    <text x="100" y="65" font-size="11" fill="#333" font-weight="bold" text-anchor="middle">2N</text>

    <!-- 弹簧 -->
    <path d="M 100 90 Q 110 100 100 110 T 100 130 T 100 150 T 100 170"
          stroke="#667eea" stroke-width="2" fill="none"/>

    <!-- 挂钩 -->
    <line x1="100" y1="170" x2="100" y2="185" stroke="#5d4037" stroke-width="2"/>

    <!-- 钩码 -->
    <rect x="75" y="185" width="50" height="40" rx="4" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
    <text x="100" y="210" font-size="13" fill="#0d47a1" font-weight="bold" text-anchor="middle">钩码</text>

    <!-- G 向下 -->
    <line x1="100" y1="225" x2="100" y2="280" stroke="#f44336" stroke-width="3" marker-end="url(#arrow-red)"/>
    <text x="115" y="275" font-size="13" fill="#f44336" font-weight="bold">G</text>

    <!-- F弹 向上 -->
    <line x1="100" y1="185" x2="100" y2="130" stroke="#ff9800" stroke-width="3" marker-end="url(#arrow-orange)"/>
    <text x="115" y="140" font-size="13" fill="#ff9800" font-weight="bold">F弹</text>

    <defs>
        <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#f44336"/></marker>
        <marker id="arrow-orange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#ff9800"/></marker>
    </defs>
</svg>
```

## 场景 4：弹簧振子 A-O-B

适用于：弹力方向随位移变化、弹力大小变化

```svg
<svg width="500" height="250" viewBox="0 0 500 250">
    <!-- 墙面 -->
    <rect x="0" y="80" width="30" height="80" fill="#9e9e9e"/>

    <!-- 弹簧（压缩状态，小球在 A 点） -->
    <path d="M 30 120 Q 40 105 50 120 T 70 120 T 90 120 T 110 120 T 130 120"
          stroke="#667eea" stroke-width="2" fill="none"/>
    <text x="60" y="100" font-size="11" fill="#667eea">压缩</text>

    <!-- 小球 A -->
    <circle cx="140" cy="120" r="25" fill="#667eea"/>
    <text x="130" y="125" font-size="14" fill="white" font-weight="bold">A</text>

    <!-- 平衡位置 O -->
    <line x1="250" y1="95" x2="250" y2="145" stroke="#ff9800" stroke-width="2" stroke-dasharray="5,5"/>
    <text x="240" y="90" font-size="12" fill="#ff9800" font-weight="bold">O</text>
    <text x="225" y="160" font-size="11" fill="#999">平衡位置</text>

    <!-- B 点 -->
    <line x1="360" y1="95" x2="360" y2="145" stroke="#ff9800" stroke-width="2" stroke-dasharray="5,5"/>
    <text x="350" y="90" font-size="12" fill="#ff9800" font-weight="bold">B</text>

    <!-- 运动方向箭头 -->
    <line x1="170" y1="120" x2="230" y2="120" stroke="#4caf50" stroke-width="3" marker-end="url(#arrow-green)"/>
    <text x="180" y="110" font-size="11" fill="#4caf50">A→O 运动</text>

    <!-- 弹力方向 -->
    <line x1="140" y1="155" x2="200" y2="155" stroke="#f44336" stroke-width="3" marker-end="url(#arrow-red)"/>
    <text x="150" y="175" font-size="11" fill="#f44336">弹力向右（推）</text>

    <!-- 分析框 -->
    <rect x="280" y="30" width="200" height="70" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="4"/>
    <text x="290" y="50" font-size="12" fill="#333" font-weight="bold">📌 A→O 过程分析：</text>
    <text x="290" y="68" font-size="11" fill="#666">• 弹簧从压缩→恢复</text>
    <text x="290" y="83" font-size="11" fill="#666">• 弹力方向：向右（推小球）</text>
    <text x="290" y="98" font-size="11" fill="#666">• 压缩量减小→弹力变小</text>

    <defs>
        <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#f44336"/></marker>
        <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#4caf50"/></marker>
    </defs>
</svg>
```

## 场景 5：甲乙弹簧对比（一端固定 vs 两端拉）

适用于：弹簧内力分析、牛顿第三定律

```svg
<svg width="500" height="280" viewBox="0 0 500 280">
    <!-- 甲图标题 -->
    <text x="20" y="30" font-size="16" fill="#333" font-weight="bold">甲：一端固定</text>

    <!-- 墙 -->
    <rect x="0" y="50" width="30" height="60" fill="#9e9e9e"/>

    <!-- 弹簧甲 -->
    <path d="M 30 80 Q 45 65 60 80 T 90 80 T 120 80 T 150 80 T 180 80 T 210 80"
          stroke="#667eea" stroke-width="2" fill="none"/>

    <!-- 拉力 F 向右 -->
    <line x1="210" y1="80" x2="280" y2="80" stroke="#f44336" stroke-width="3" marker-end="url(#arrow-red)"/>
    <text x="230" y="70" font-size="14" fill="#f44336" font-weight="bold">F</text>

    <!-- 乙图标题 -->
    <text x="20" y="160" font-size="16" fill="#333" font-weight="bold">乙：两端受力</text>

    <!-- 弹簧乙 -->
    <path d="M 30 210 Q 45 195 60 210 T 90 210 T 120 210 T 150 210 T 180 210 T 210 210"
          stroke="#667eea" stroke-width="2" fill="none"/>

    <!-- 左拉力 F -->
    <line x1="30" y1="210" x2="0" y2="210" stroke="#f44336" stroke-width="3" marker-end="url(#arrow-left-red)"/>
    <text x="10" y="200" font-size="14" fill="#f44336" font-weight="bold">F</text>

    <!-- 右拉力 F -->
    <line x1="210" y1="210" x2="280" y2="210" stroke="#f44336" stroke-width="3" marker-end="url(#arrow-red)"/>
    <text x="230" y="200" font-size="14" fill="#f44336" font-weight="bold">F</text>

    <!-- 结论框 -->
    <rect x="300" y="50" width="190" height="100" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="4"/>
    <text x="310" y="75" font-size="13" fill="#333" font-weight="bold">💡 关键理解：</text>
    <text x="310" y="95" font-size="11" fill="#666">甲图中，墙对弹簧的拉力</text>
    <text x="310" y="110" font-size="11" fill="#666">也是 F（牛顿第三定律）</text>
    <text x="310" y="125" font-size="11" fill="#666">∴ 甲乙两弹簧受力相同</text>
    <text x="310" y="140" font-size="11" fill="#666">伸长量相同！</text>

    <defs>
        <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#f44336"/></marker>
        <marker id="arrow-left-red" markerWidth="10" markerHeight="10" refX="1" refY="3" orient="auto">
            <path d="M9,0 L9,6 L0,3 z" fill="#f44336"/></marker>
    </defs>
</svg>
```

## 场景 6：L-F 坐标图

适用于：图像读数、求劲度系数、原长判断

```svg
<svg width="400" height="300" viewBox="0 0 400 300">
    <!-- 坐标轴 -->
    <line x1="60" y1="250" x2="380" y2="250" stroke="#333" stroke-width="2"/>
    <line x1="60" y1="250" x2="60" y2="30" stroke="#333" stroke-width="2"/>
    <text x="360" y="270" font-size="14" fill="#333">L(cm)</text>
    <text x="20" y="40" font-size="14" fill="#333">F(N)</text>

    <!-- 刻度 -->
    <line x1="140" y1="250" x2="140" y2="255" stroke="#333" stroke-width="1"/>
    <text x="130" y="270" font-size="11" fill="#666">8</text>
    <line x1="260" y1="250" x2="260" y2="255" stroke="#333" stroke-width="1"/>
    <text x="250" y="270" font-size="11" fill="#666">14</text>
    <line x1="60" y1="130" x2="55" y2="130" stroke="#333" stroke-width="1"/>
    <text x="35" y="135" font-size="11" fill="#666">6</text>

    <!-- 图像线 -->
    <line x1="140" y1="250" x2="260" y2="130" stroke="#667eea" stroke-width="3"/>
    <circle cx="140" cy="250" r="5" fill="#f44336"/>
    <circle cx="260" cy="130" r="5" fill="#f44336"/>

    <!-- ΔL 标注 -->
    <line x1="140" y1="260" x2="260" y2="260" stroke="#ff9800" stroke-width="1" stroke-dasharray="5,5"/>
    <text x="185" y="280" font-size="11" fill="#ff9800">ΔL=6cm</text>

    <!-- F 标注 -->
    <line x1="270" y1="130" x2="270" y2="250" stroke="#ff9800" stroke-width="1" stroke-dasharray="5,5"/>
    <text x="280" y="200" font-size="11" fill="#ff9800">F=6N</text>

    <!-- 说明框 -->
    <rect x="200" y="10" width="180" height="60" fill="#f8f9fa" stroke="#ddd" rx="4"/>
    <text x="210" y="30" font-size="12" fill="#333">📊 L-F 图像特点：</text>
    <text x="210" y="50" font-size="11" fill="#666">• F=0 时，L=L₀(原长)</text>
    <text x="210" y="65" font-size="11" fill="#666">• 横轴截距 = 原长 = 8cm</text>
</svg>
```

## 场景 7：数据表格 + 规律分析

适用于：弹簧数据表、找规律、线性外推

```svg
<svg width="450" height="280" viewBox="0 0 450 280">
    <!-- 表格框 -->
    <rect x="20" y="20" width="200" height="130" fill="white" stroke="#333" stroke-width="2"/>

    <!-- 表头 -->
    <line x1="20" y1="50" x2="220" y2="50" stroke="#333" stroke-width="2"/>
    <line x1="120" y1="20" x2="120" y2="150" stroke="#333" stroke-width="1"/>
    <text x="70" y="40" font-size="13" fill="#333" font-weight="bold" text-anchor="middle">F(N)</text>
    <text x="170" y="40" font-size="13" fill="#333" font-weight="bold" text-anchor="middle">L(cm)</text>

    <!-- 数据行 -->
    <line x1="20" y1="70" x2="220" y2="70" stroke="#ddd" stroke-width="1"/>
    <text x="70" y="65" font-size="12" fill="#333" text-anchor="middle">0</text>
    <text x="170" y="65" font-size="12" fill="#333" text-anchor="middle">10</text>

    <line x1="20" y1="90" x2="220" y2="90" stroke="#ddd" stroke-width="1"/>
    <text x="70" y="85" font-size="12" fill="#333" text-anchor="middle">2</text>
    <text x="170" y="85" font-size="12" fill="#333" text-anchor="middle">11</text>

    <line x1="20" y1="110" x2="220" y2="110" stroke="#ddd" stroke-width="1"/>
    <text x="70" y="105" font-size="12" fill="#333" text-anchor="middle">4</text>
    <text x="170" y="105" font-size="12" fill="#333" text-anchor="middle">12</text>

    <line x1="20" y1="130" x2="220" y2="130" stroke="#ddd" stroke-width="1"/>
    <text x="70" y="145" font-size="12" fill="#f44336" font-weight="bold" text-anchor="middle">?</text>
    <text x="170" y="145" font-size="12" fill="#667eea" font-weight="bold" text-anchor="middle">13</text>

    <!-- 规律分析框 -->
    <rect x="240" y="20" width="200" height="130" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="4"/>
    <text x="250" y="45" font-size="13" fill="#333" font-weight="bold">📊 找规律：</text>
    <text x="250" y="70" font-size="11" fill="#666">F: 0 → 2 → 4 (每次+2N)</text>
    <text x="250" y="90" font-size="11" fill="#666">L: 10 → 11 → 12 (每次+1cm)</text>
    <text x="250" y="110" font-size="11" fill="#666">∴ L=13 时，F=6N</text>
    <text x="250" y="130" font-size="10" fill="#ff9800">每伸长 1cm 需要 2N</text>
</svg>
```

## 场景 8：双弹簧系统

适用于：分段弹力、临界点分析

```svg
<svg width="500" height="300" viewBox="0 0 500 300">
    <!-- 状态 1 -->
    <text x="20" y="30" font-size="14" fill="#333" font-weight="bold">状态 1：Δl=0.1m（只有大弹簧）</text>
    <path d="M 50 60 Q 60 45 70 60 T 90 60 T 110 60 T 130 60 T 150 60 T 170 60 T 190 60"
          stroke="#667eea" stroke-width="3" fill="none"/>
    <text x="100" y="50" font-size="11" fill="#667eea">大弹簧 k₁=10N/m</text>
    <path d="M 50 90 Q 57 80 64 90 T 78 90 T 92 90 T 106 90 T 120 90"
          stroke="#ff9800" stroke-width="2" fill="none" stroke-dasharray="5,5"/>
    <text x="80" y="110" font-size="10" fill="#ff9800">小弹簧（未工作）</text>

    <!-- 状态 2 -->
    <text x="20" y="160" font-size="14" fill="#333" font-weight="bold">状态 2：Δl=0.3m（两弹簧都工作）</text>
    <path d="M 50 190 Q 65 170 80 190 T 110 190 T 140 190 T 170 190"
          stroke="#667eea" stroke-width="3" fill="none"/>
    <text x="90" y="180" font-size="11" fill="#667eea">大弹簧</text>
    <path d="M 50 220 Q 62 205 74 220 T 98 220 T 122 220 T 146 220"
          stroke="#ff9800" stroke-width="2" fill="none"/>
    <text x="80" y="210" font-size="11" fill="#ff9800">小弹簧</text>

    <!-- 计算框 -->
    <rect x="280" y="30" width="210" height="140" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="4"/>
    <text x="290" y="55" font-size="13" fill="#333" font-weight="bold">📐 计算过程：</text>
    <text x="290" y="75" font-size="11" fill="#666">大弹簧：F₁=k₁×Δl=10×0.3=3N</text>
    <text x="290" y="95" font-size="11" fill="#666">小弹簧：Δl₂=0.3-0.1=0.2m</text>
    <text x="290" y="115" font-size="11" fill="#666">F₂=k₂×Δl₂=20×0.2=4N</text>
    <text x="290" y="135" font-size="12" fill="#4caf50" font-weight="bold">总弹力 F=F₁+F₂=3+4=7N</text>
    <text x="290" y="155" font-size="10" fill="#999">注意：小弹簧只压缩了 0.2m！</text>
</svg>
```

## 场景 9：人走路时脚的受力

适用于：静摩擦力方向、运动趋势判断

```svg
<svg width="400" height="200" viewBox="0 0 400 200">
    <!-- 地面 -->
    <line x1="30" y1="150" x2="370" y2="150" stroke="#6d4c41" stroke-width="4"/>
    <line x1="50" y1="150" x2="40" y2="160" stroke="#8d6e63" stroke-width="2"/>
    <line x1="80" y1="150" x2="70" y2="160" stroke="#8d6e63" stroke-width="2"/>
    <line x1="110" y1="150" x2="100" y2="160" stroke="#8d6e63" stroke-width="2"/>
    <line x1="140" y1="150" x2="130" y2="160" stroke="#8d6e63" stroke-width="2"/>
    <line x1="170" y1="150" x2="160" y2="160" stroke="#8d6e63" stroke-width="2"/>

    <!-- 鞋子/脚（简化为梯形） -->
    <polygon points="80,150 90,120 140,120 160,150" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
    <text x="115" y="140" font-size="12" fill="#0d47a1" font-weight="bold" text-anchor="middle">脚</text>

    <!-- 蹬地方向（向后） -->
    <line x1="120" y1="150" x2="60" y2="150" stroke="#999" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arrow-gray)"/>
    <text x="65" y="170" font-size="10" fill="#999">蹬地（向后）</text>

    <!-- 静摩擦力（向前） -->
    <line x1="120" y1="140" x2="200" y2="140" stroke="#4caf50" stroke-width="3" marker-end="url(#arrow-green)"/>
    <text x="150" y="130" font-size="13" fill="#4caf50" font-weight="bold">f静</text>

    <!-- 思考框 -->
    <rect x="220" y="30" width="170" height="70" fill="#fff3e0" stroke="#ff9800" stroke-width="2" rx="4"/>
    <text x="230" y="50" font-size="12" fill="#333" font-weight="bold">❓ 思考：</text>
    <text x="230" y="68" font-size="11" fill="#666">脚蹬地向后，</text>
    <text x="230" y="83" font-size="11" fill="#666">地面给脚的摩擦力</text>
    <text x="230" y="98" font-size="11" fill="#666">向哪个方向？</text>

    <defs>
        <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#4caf50"/></marker>
        <marker id="arrow-gray" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#999"/></marker>
    </defs>
</svg>
```

## 场景 10：刹车片受力（增大摩擦力）

适用于：增大/减小摩擦力的方法

```svg
<svg width="400" height="200" viewBox="0 0 400 200">
    <!-- 车轮（圆） -->
    <circle cx="150" cy="100" r="60" fill="none" stroke="#333" stroke-width="3"/>
    <circle cx="150" cy="100" r="5" fill="#333"/>

    <!-- 轮胎花纹 -->
    <line x1="150" y1="40" x2="150" y2="55" stroke="#666" stroke-width="2"/>
    <line x1="150" y1="145" x2="150" y2="160" stroke="#666" stroke-width="2"/>
    <line x1="90" y1="100" x2="105" y2="100" stroke="#666" stroke-width="2"/>
    <line x1="195" y1="100" x2="210" y2="100" stroke="#666" stroke-width="2"/>

    <!-- 刹车片 -->
    <rect x="195" y="75" width="15" height="50" rx="2" fill="#ff8a65" stroke="#e64a19" stroke-width="2"/>
    <text x="225" y="105" font-size="11" fill="#e64a19">刹车片</text>

    <!-- F压（捏闸力） -->
    <line x1="230" y1="100" x2="210" y2="100" stroke="#ab47bc" stroke-width="3" marker-end="url(#arrow-purple)"/>
    <text x="235" y="95" font-size="11" fill="#ab47bc">F压</text>

    <!-- 旋转方向 -->
    <path d="M 170 55 A 30 30 0 0 1 190 80" stroke="#999" stroke-width="1.5" fill="none" marker-end="url(#arrow-gray)"/>
    <text x="185" y="50" font-size="10" fill="#999">旋转</text>

    <!-- 分析框 -->
    <rect x="250" y="20" width="140" height="80" fill="#e8f5e9" stroke="#4caf50" stroke-width="2" rx="4"/>
    <text x="260" y="40" font-size="12" fill="#333" font-weight="bold">📌 分析：</text>
    <text x="260" y="58" font-size="11" fill="#666">捏闸 → 增大 F压</text>
    <text x="260" y="73" font-size="11" fill="#666">→ 增大摩擦力</text>
    <text x="260" y="88" font-size="10" fill="#999">（不是改变粗糙度）</text>

    <defs>
        <marker id="arrow-purple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#ab47bc"/></marker>
        <marker id="arrow-gray" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="#999"/></marker>
    </defs>
</svg>
```

## 使用指南

1. **选择场景**：根据题目类型选择对应的 SVG 模板
2. **修改内容**：调整标签文字、数值、力的方向和大小
3. **添加提示框**：在 SVG 中嵌入思考提示框，引导学生思考
4. **调整尺寸**：修改 `width`、`height`、`viewBox` 适配内容
5. **检查 marker**：确保 `<defs>` 中定义了所有用到的箭头 marker
6. **测试显示**：SVG 放在 `.diagram-container` 中会自动 `max-width: 100%` 响应式适配
