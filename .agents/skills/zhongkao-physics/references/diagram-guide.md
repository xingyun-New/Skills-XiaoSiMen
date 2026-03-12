# 物理图示生成指南（PhySVG 组件库）

题目涉及受力分析、弹簧、斜面、滑轮、浮力、杠杆、坐标图等时，使用 **PhySVG** 组件库在 `renderDiagram` 中组装专业图示。图示由页面通过 CDN 加载 `physics-svg-lib.js` 后，用代码绘制，而非 JSON schema。

## 何时必须加图示

- 力学：受力分析、压力/支持力、摩擦力、浮力、杠杆、弹簧
- 电学：串联/并联识别、电表示数、电路故障（可用电路图或手写 SVG）
- 光学：反射、折射、透镜成像（可手写 SVG 或沿用旧 optics 逻辑）
- 实验：实验装置、弹簧测力计、控制变量示意

若题目明显依赖空间关系，默认添加图示；纯概念题可不加。

## 加载方式

```html
<script src="https://xingyun-new.github.io/Skills-XiaoSiMen/lib/physics-svg-lib.js"></script>
```

生成动态 HTML 时，在 `renderDiagram(diagram, question)` 中根据题目用 PhySVG 绘制，并返回 **可插入 DOM 的 HTML 字符串或 SVG 元素**。若返回 SVG 元素，需转为字符串或直接插入；若返回字符串，应为包含 `<svg>` 或 `<div>` 的 HTML。

建议：用 `PhySVG.createSVG(w, h)` 得到 `ctx`，调用各组件后，将 `ctx.svg` 转为字符串返回，例如：

```javascript
function renderDiagram(diagram, question) {
  if (!diagram || !window.PhySVG) return '';
  var ctx = PhySVG.createSVG(400, 250);
  // ... 根据 diagram 或 question 用 PhySVG 绘制
  return ctx.svg.outerHTML;
}
```

---

## 一、PhySVG 组件 API

### 1. 画布

| 方法 | 说明 |
|------|------|
| `PhySVG.createSVG(width, height)` | 创建画布，返回 `{ svg, g, defs }`。所有绘图函数第一个参数均为该对象。 |

### 2. 物体与场景

| 方法 | 参数 | 说明 |
|------|------|------|
| `PhySVG.block(ctx, x, y, w, h, label)` | 左上角 (x,y)，宽 w 高 h，可选 label | 木块、铁块等矩形物体 |
| `PhySVG.circle(ctx, cx, cy, r, label)` | 圆心、半径、可选 label | 小球、质点 |
| `PhySVG.spring(ctx, x1, y1, x2, y2, coils, stroke)` | 起点、终点、线圈数(默认 6)、颜色 | 弹簧（贝塞尔线圈） |
| `PhySVG.incline(ctx, x, y, width, angleDeg)` | 左端 (x,y)、斜面长度、与水平夹角(度) | 斜面（带 θ 标注） |
| `PhySVG.ground(ctx, x1, x2, y, rough)` | 左右 x、地面 y、是否粗糙 | 水平地面 |
| `PhySVG.wall(ctx, x, y1, y2, side)` | x、上下 y、'left'\|'right' | 墙壁 |
| `PhySVG.pulley(ctx, cx, cy, r)` | 圆心、半径 | 定滑轮/动滑轮 |
| `PhySVG.rope(ctx, points)` | `[{x,y}, ...]` | 绳子折线 |
| `PhySVG.lever(ctx, pivotX, pivotY, length, angleDeg)` | 支点、杆长(单侧)、与水平夹角 | 杠杆 |
| `PhySVG.fluid(ctx, x, y, w, h, level, label)` | 容器左上角、宽高、液面(0~1 或 y 坐标)、标签 | 液体容器 |
| `PhySVG.springScale(ctx, x, y, reading)` | 顶部挂钩位置、示数(如 "2.4N") | 弹簧测力计 |

### 3. 力与标注

| 方法 | 参数 | 说明 |
|------|------|------|
| `PhySVG.forceArrow(ctx, x, y, angleDeg, length, label, color)` | 作用点、方向角(0=右,90=上,-90=下)、长度、符号、颜色 | 力箭头（任意角度） |
| `PhySVG.dimension(ctx, x1, y1, x2, y2, label, opts)` | 标注线端点、文字、可选 `{ dashed, offset, stroke }` | 尺寸/角度标注 |

### 4. 坐标图

| 方法 | 参数 | 说明 |
|------|------|------|
| `PhySVG.graph(ctx, options)` | `{ data: [[x,y],...], width, height, originX, originY, xLabel, yLabel, xTicks, yTicks, scaleX, scaleY }` | F-x、L-F 等折线图 |

**角度约定**：`forceArrow` 的 `angleDeg` 为与 x 轴正方向夹角，逆时针为正。0° 向右，90° 向上，-90° 向下，180° 向左。

**常用颜色**：重力 `#ef5350`、支持力/法向 `#42a5f5`、摩擦力 `#66bb6a`、拉力/弹力 `#ab47bc` 或 `#ff9800`。

---

## 二、常见场景组装示例

### 场景 1：水平面匀速拉木块（四力平衡）

```javascript
var ctx = PhySVG.createSVG(360, 220);
PhySVG.ground(ctx, 70, 290, 165, true);
PhySVG.block(ctx, 135, 99, 90, 66, '木块');
var cx = 180, cy = 132;
PhySVG.forceArrow(ctx, cx, cy, -90, 55, 'G', '#ef5350');
PhySVG.forceArrow(ctx, cx, cy, 90, 55, 'F支', '#42a5f5');
PhySVG.forceArrow(ctx, cx, cy, 0, 50, 'F拉', '#ab47bc');
PhySVG.forceArrow(ctx, cx, cy, 180, 50, 'f', '#66bb6a');
return ctx.svg.outerHTML;
```

### 场景 2：斜面静止木块（重力、支持力、摩擦力）

```javascript
var ctx = PhySVG.createSVG(360, 220);
PhySVG.incline(ctx, 50, 200, 250, 30);
PhySVG.block(ctx, 150, 120, 60, 40, '木块');
var cx = 180, cy = 140;
PhySVG.forceArrow(ctx, cx, cy, -90, 60, 'G', '#ef5350');
PhySVG.forceArrow(ctx, cx, cy, 60, 50, 'N', '#42a5f5');   // 垂直斜面，60° 与水平
PhySVG.forceArrow(ctx, cx, cy, -30, 30, 'f', '#66bb6a');    // 沿斜面向上
return ctx.svg.outerHTML;
```

### 场景 3：弹簧竖直挂重物

```javascript
var ctx = PhySVG.createSVG(200, 260);
PhySVG.spring(ctx, 100, 30, 100, 120, 6);
PhySVG.circle(ctx, 100, 165, 22, '重物');
PhySVG.forceArrow(ctx, 100, 165, -90, 50, 'G', '#ef5350');
PhySVG.forceArrow(ctx, 100, 120, 90, 50, 'F弹', '#ff9800');
return ctx.svg.outerHTML;
```

### 场景 4：弹簧一端固定于墙、水平拉力

```javascript
var ctx = PhySVG.createSVG(400, 200);
PhySVG.wall(ctx, 30, 60, 140, 'left');
PhySVG.spring(ctx, 40, 100, 250, 100, 8);
PhySVG.forceArrow(ctx, 250, 100, 0, 60, 'F', '#ef5350');
PhySVG.forceArrow(ctx, 40, 110, 0, 50, 'F弹', '#ff9800');
return ctx.svg.outerHTML;
```

### 场景 5：弹簧测力计拉木块（探究摩擦力）

```javascript
var ctx = PhySVG.createSVG(400, 200);
PhySVG.springScale(ctx, 80, 40, '2.4N');
PhySVG.block(ctx, 180, 100, 80, 50, '木块');
PhySVG.ground(ctx, 100, 380, 180, true);
PhySVG.forceArrow(ctx, 260, 125, 0, 40, 'F拉', '#ab47bc');
PhySVG.forceArrow(ctx, 220, 125, 180, 40, 'f', '#66bb6a');
return ctx.svg.outerHTML;
```

### 场景 6：浮力（物体浸没在液体中）

```javascript
var ctx = PhySVG.createSVG(280, 220);
PhySVG.fluid(ctx, 80, 80, 120, 140, 0.6, '水');
PhySVG.block(ctx, 115, 95, 50, 50, '物块');
PhySVG.forceArrow(ctx, 140, 120, -90, 45, 'G', '#ef5350');
PhySVG.forceArrow(ctx, 140, 120, 90, 55, 'F浮', '#42a5f5');
return ctx.svg.outerHTML;
```

### 场景 7：定滑轮拉物体

```javascript
var ctx = PhySVG.createSVG(280, 220);
PhySVG.pulley(ctx, 140, 70, 25);
PhySVG.rope(ctx, [{x:140,y:95},{x:140,y:180},{x:200,y:180}]);
PhySVG.block(ctx, 165, 180, 70, 40, '物体');
PhySVG.forceArrow(ctx, 200, 200, -90, 50, 'G', '#ef5350');
PhySVG.forceArrow(ctx, 200, 180, 90, 50, 'F拉', '#ab47bc');
return ctx.svg.outerHTML;
```

### 场景 8：杠杆（支点 + 力臂）

```javascript
var ctx = PhySVG.createSVG(360, 200);
PhySVG.lever(ctx, 180, 120, 120, 10);
PhySVG.forceArrow(ctx, 80, 95, -90, 45, 'F₁', '#ef5350');
PhySVG.forceArrow(ctx, 280, 95, -90, 35, 'F₂', '#42a5f5');
PhySVG.dimension(ctx, 80, 130, 180, 130, 'L₁', { dashed: true });
PhySVG.dimension(ctx, 180, 130, 280, 130, 'L₂', { dashed: true });
return ctx.svg.outerHTML;
```

### 场景 9：L-F 或 F-Δx 坐标图

```javascript
var ctx = PhySVG.createSVG(360, 220);
PhySVG.graph(ctx, {
  data: [[0, 0], [2, 1], [4, 2], [6, 3]],
  width: 280,
  height: 160,
  originX: 50,
  originY: 180,
  xLabel: 'L(cm)',
  yLabel: 'F(N)',
  scaleX: 40,
  scaleY: 45
});
return ctx.svg.outerHTML;
```

### 场景 10：实验装置示意（弹簧测力计 + 木块 + 木板）

用 `block`、`springScale`、`ground` 组合，并加 `dimension` 或文字标注即可；或继续用「实验装置图」的图标式布局（见 html-template 中的 exp-diagram 结构），由页面自行写 HTML。

---

## 三、在 renderDiagram 中根据题目分支

动态生成 HTML 时，`renderDiagram(diagram, question)` 可根据 `question.id`、`question.diagram.scene` 或自定义字段分支，对不同题用不同 PhySVG 组合：

```javascript
function renderDiagram(diagram, question) {
  if (!diagram || typeof PhySVG === 'undefined') return '';
  var scene = diagram.scene || {};
  var ctx = PhySVG.createSVG(scene.width || 360, scene.height || 220);
  if (scene.type === 'incline') {
    PhySVG.incline(ctx, 50, 200, 250, scene.angle || 30);
    PhySVG.block(ctx, 150, 120, 60, 40, scene.bodyLabel || '木块');
    (scene.forces || []).forEach(function (f) {
      PhySVG.forceArrow(ctx, f.x, f.y, f.angle, f.length, f.label, f.color);
    });
  } else if (scene.type === 'horizontal') {
    PhySVG.ground(ctx, 70, 290, 165, scene.rough);
    PhySVG.block(ctx, 135, 99, 90, 66, scene.bodyLabel || '木块');
    (scene.forces || []).forEach(function (f) {
      PhySVG.forceArrow(ctx, f.x, f.y, f.angle, f.length, f.label, f.color);
    });
  }
  return ctx.svg.outerHTML;
}
```

也可完全按题目逐题手写 PhySVG 调用或手写 SVG 字符串，以最大程度贴合题干。

---

## 四、生成建议

- 同一套题中图示题建议占 20%～40%。
- 图示服务于考点，不堆砌无关元素。
- 图示标题与题干一致，便于学生对应「根据图示回答」。
- 力箭头长度可依题意表示相对大小（如二力平衡时两力等长）。
