# 物理图示生成指南

当题目涉及受力分析、电路识别、光路分析、实验装置观察时，优先为题目附带 `diagram` 字段，让生成的 HTML 页面直接渲染示意图，而不是只用文字描述。

## 何时必须加图示

- 力学：受力分析、压力/支持力、摩擦力、浮力、杠杆
- 电学：串联/并联识别、电表示数、电路故障、电路变化分析
- 光学：反射、折射、平面镜成像、透镜成像、光路判断
- 实验：实验装置识别、控制变量、步骤分析、读图题

如果题目明显依赖空间关系，默认添加图示；只有在纯概念记忆题中才可以不加。

## 通用字段

所有题型都可以增加：

```json
"diagram": {
  "type": "force",
  "title": "木块受力示意图",
  "caption": "图中箭头长度不表示力的实际大小，仅表示方向",
  "scene": {}
}
```

字段说明：

- `type`：`force` | `circuit` | `optics` | `experiment`
- `title`：图示标题，可选但推荐填写
- `caption`：图下注释，可选
- `scene`：不同图示类型的结构化数据

## 一、受力图 `force`

```json
"diagram": {
  "type": "force",
  "title": "木块受力示意图",
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
```

规则：

- `surface`：`rough` | `smooth` | `none`
- `direction`：`up`、`down`、`left`、`right`、`up-left`、`up-right`、`down-left`、`down-right`
- 标签尽量短，如 `G`、`F浮`、`F支`
- 同一物体只画与题目有关的力，不乱加空气阻力等无关力

## 二、电路图 `circuit`

```json
"diagram": {
  "type": "circuit",
  "title": "串联电路示意图",
  "scene": {
    "layout": "series",
    "components": [
      { "kind": "battery", "label": "电源 6V" },
      { "kind": "switch", "label": "S", "closed": true },
      { "kind": "ammeter", "label": "A" },
      { "kind": "resistor", "label": "R1=10Ω" },
      { "kind": "resistor", "label": "R2=20Ω" }
    ],
    "note": "开关闭合后分析电流与电压变化"
  }
}
```

并联电路示例：

```json
"diagram": {
  "type": "circuit",
  "title": "并联电路示意图",
  "scene": {
    "layout": "parallel",
    "components": [
      { "kind": "battery", "label": "电源" },
      { "kind": "switch", "label": "S", "closed": true },
      { "kind": "lamp", "label": "L1", "branch": 1 },
      { "kind": "lamp", "label": "L2", "branch": 2 }
    ],
    "note": "两灯并联，观察开关对支路的影响"
  }
}
```

规则：

- `layout`：`series` 或 `parallel`
- `kind` 推荐使用：`battery`、`switch`、`resistor`、`lamp`、`ammeter`、`voltmeter`
- 并联图中支路元件用 `branch: 1/2/3...`
- `closed` 仅用于开关，表示闭合或断开
- 不要把本该并联连接的元件错误画成串联

## 三、光路图 `optics`

```json
"diagram": {
  "type": "optics",
  "title": "光的反射示意图",
  "scene": {
    "kind": "reflection",
    "rays": [
      { "from": "leftTop", "to": "center", "label": "入射光线", "color": "#ff7043" },
      { "from": "center", "to": "rightTop", "label": "反射光线", "color": "#42a5f5" }
    ],
    "note": "法线为辅助线，通常画成虚线"
  }
}
```

折射/透镜示例：

```json
"diagram": {
  "type": "optics",
  "title": "凸透镜成像示意图",
  "scene": {
    "kind": "convex-lens",
    "rays": [
      { "from": "leftObjectTop", "to": "lensTop", "label": "平行主光轴", "color": "#ff7043" },
      { "from": "lensTop", "to": "rightFocus", "label": "折射后过焦点", "color": "#42a5f5" },
      { "from": "leftObjectTop", "to": "lensCenter", "label": "过光心", "color": "#66bb6a" }
    ],
    "note": "用于分析像的大小规律"
  }
}
```

规则：

- `kind`：`reflection` | `refraction` | `convex-lens` | `concave-lens`
- `from` / `to` 使用模板内置锚点名，不要随意写坐标
- 常用锚点：`leftTop`、`leftMid`、`leftBottom`、`center`、`rightTop`、`rightMid`、`rightBottom`、`leftObjectTop`、`lensTop`、`lensCenter`、`rightFocus`
- 光线标签要体现物理意义，不写成泛泛的“光线1”

## 四、实验装置图 `experiment`

```json
"diagram": {
  "type": "experiment",
  "title": "探究滑动摩擦力实验装置",
  "scene": {
    "items": [
      { "kind": "spring-scale", "label": "弹簧测力计" },
      { "kind": "block", "label": "木块" },
      { "kind": "surface", "label": "长木板" },
      { "kind": "weight", "label": "砝码" }
    ],
    "arrows": [
      { "from": 0, "to": 1, "label": "水平拉动" },
      { "from": 1, "to": 2, "label": "接触面" }
    ],
    "note": "比较不同条件下测力计示数的变化"
  }
}
```

规则：

- `items` 按从左到右、从上到下的阅读顺序组织
- `kind` 推荐使用：`spring-scale`、`block`、`surface`、`weight`、`beaker`、`thermometer`、`lamp`、`lens`
- `arrows.from` / `arrows.to` 使用 `items` 下标
- 装置图只画关键器材，不需要追求美术写实

## 生成建议

- 同一套题里不必每题都加图，但图示题至少占 20% 到 40%
- 图示应服务于考点，不是装饰
- 图示标题要和题干保持一致，避免学生看图后仍不知道画的是什么
- 如果题目是“识图题”，题干中应明确写出“根据图示回答”
- 如果题目是“作图题”，图示可以给出半成品，让学生判断应补画什么
