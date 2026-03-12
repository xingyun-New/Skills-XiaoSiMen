/**
 * 物理 SVG 组件库 (PhySVG)
 * 用于初中物理题目的专业图示绘制，支持受力图、弹簧、斜面、滑轮、坐标图等。
 * 使用方式：先 PhySVG.createSVG(w, h)，再调用各组件函数在返回的 ctx 上绘制。
 */
(function (global) {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  function el(tag, attrs, children) {
    var e = document.createElementNS(NS, tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'className') e.setAttribute('class', attrs[k]);
        else if (k === 'strokeWidth') e.setAttribute('stroke-width', attrs[k]);
        else if (k === 'strokeDasharray') e.setAttribute('stroke-dasharray', attrs[k]);
        else if (k === 'markerEnd') e.setAttribute('marker-end', attrs[k]);
        else if (k === 'textContent') e.textContent = attrs[k];
        else e.setAttribute(k, String(attrs[k]));
      });
    }
    if (children) children.forEach(function (c) { e.appendChild(c); });
    return e;
  }

  function textEl(x, y, content, options) {
    var o = options || {};
    return el('text', {
      x: x,
      y: y,
      fill: o.fill || '#333',
      'font-size': o.fontSize || 14,
      'text-anchor': o.textAnchor || 'middle',
      'font-weight': o.fontWeight || 'normal',
      textContent: content
    });
  }

  /**
   * 创建 SVG 画布。返回 ctx 对象，供后续组件函数使用。
   * @param {number} width
   * @param {number} height
   * @returns {{ svg: SVGElement, g: SVGGElement, defs: SVGDefsElement }}
   */
  function createSVG(width, height) {
    var svg = el('svg', {
      width: width,
      height: height,
      viewBox: '0 0 ' + width + ' ' + height,
      'aria-label': '物理示意图'
    });
    var defs = el('defs');
    // 通用箭头 marker（用于力、尺寸等）
    var marker = el('marker', {
      id: 'phy-arrow',
      markerWidth: 10,
      markerHeight: 10,
      refX: 9,
      refY: 5,
      orient: 'auto'
    });
    marker.appendChild(el('path', { d: 'M0,0 L10,5 L0,10 z', fill: '#546e7a' }));
    defs.appendChild(marker);
    var markerRed = el('marker', { id: 'phy-arrow-red', markerWidth: 10, markerHeight: 10, refX: 9, refY: 5, orient: 'auto' });
    markerRed.appendChild(el('path', { d: 'M0,0 L10,5 L0,10 z', fill: '#ef5350' }));
    defs.appendChild(markerRed);
    var markerBlue = el('marker', { id: 'phy-arrow-blue', markerWidth: 10, markerHeight: 10, refX: 9, refY: 5, orient: 'auto' });
    markerBlue.appendChild(el('path', { d: 'M0,0 L10,5 L0,10 z', fill: '#42a5f5' }));
    defs.appendChild(markerBlue);
    var markerGreen = el('marker', { id: 'phy-arrow-green', markerWidth: 10, markerHeight: 10, refX: 9, refY: 5, orient: 'auto' });
    markerGreen.appendChild(el('path', { d: 'M0,0 L10,5 L0,10 z', fill: '#66bb6a' }));
    defs.appendChild(markerGreen);
    var markerPurple = el('marker', { id: 'phy-arrow-purple', markerWidth: 10, markerHeight: 10, refX: 9, refY: 5, orient: 'auto' });
    markerPurple.appendChild(el('path', { d: 'M0,0 L10,5 L0,10 z', fill: '#ab47bc' }));
    defs.appendChild(markerPurple);
    var markerOrange = el('marker', { id: 'phy-arrow-orange', markerWidth: 10, markerHeight: 10, refX: 9, refY: 5, orient: 'auto' });
    markerOrange.appendChild(el('path', { d: 'M0,0 L10,5 L0,10 z', fill: '#ff9800' }));
    defs.appendChild(markerOrange);
    svg.appendChild(defs);
    var g = el('g');
    svg.appendChild(g);
    return { svg: svg, g: g, defs: defs };
  }

  function rad(deg) { return (deg * Math.PI) / 180; }

  /**
   * 木块/物体（矩形）
   * @param {Object} ctx - createSVG 返回值
   * @param {number} x - 左上角 x
   * @param {number} y - 左上角 y
   * @param {number} w - 宽
   * @param {number} h - 高
   * @param {string} [label] - 物体标签
   */
  function block(ctx, x, y, w, h, label) {
    var g = ctx.g;
    var rx = Math.min(8, w / 8);
    g.appendChild(el('rect', {
      x: x, y: y, width: w, height: h, rx: rx, ry: rx,
      fill: '#90caf9', stroke: '#1a237e', strokeWidth: 2
    }));
    if (label) g.appendChild(textEl(x + w / 2, y + h / 2 + 5, label, { fontSize: 14, fill: '#0d47a1', fontWeight: 'bold' }));
  }

  /**
   * 弹簧（贝塞尔线圈）
   * @param {Object} ctx
   * @param {number} x1,y1 - 起点
   * @param {number} x2,y2 - 终点
   * @param {number} [coils=6] - 线圈数
   * @param {string} [stroke='#667eea']
   */
  function spring(ctx, x1, y1, x2, y2, coils, stroke) {
    var n = Math.max(2, coils || 6);
    var dx = x2 - x1, dy = y2 - y1;
    var len = Math.sqrt(dx * dx + dy * dy);
    var perpX = -dy / len, perpY = dx / len;
    var amp = Math.min(len / (n * 2), 15);
    var d = 'M ' + x1 + ' ' + y1;
    for (var i = 1; i <= n; i++) {
      var endX = x1 + (dx * i) / n;
      var endY = y1 + (dy * i) / n;
      var ctrlX = x1 + (dx * (i - 0.5)) / n + perpX * (i % 2 === 1 ? amp : -amp);
      var ctrlY = y1 + (dy * (i - 0.5)) / n + perpY * (i % 2 === 1 ? amp : -amp);
      d += ' Q ' + ctrlX + ' ' + ctrlY + ' ' + endX + ' ' + endY;
    }
    ctx.g.appendChild(el('path', { d: d, stroke: stroke || '#667eea', strokeWidth: 2, fill: 'none' }));
  }

  /**
   * 斜面（倾斜直线 + 可选角度标注）
   * @param {Object} ctx
   * @param {number} x - 斜面左端 x
   * @param {number} y - 斜面左端 y（较低端）
   * @param {number} width - 斜面长度
   * @param {number} angleDeg - 与水平面夹角（度），0 为水平
   */
  function incline(ctx, x, y, width, angleDeg) {
    var a = rad(angleDeg);
    var x2 = x + width * Math.cos(a);
    var y2 = y - width * Math.sin(a);
    ctx.g.appendChild(el('line', { x1: x, y1: y, x2: x2, y2: y2, stroke: '#6d4c41', strokeWidth: 4 }));
    // 角度弧与标注
    var arcR = 28;
    var ax = x + arcR, ay = y - arcR;
    var sweep = angleDeg > 0 ? 0 : 1;
    var ax2 = x + arcR * Math.cos(-a), ay2 = y - arcR * Math.sin(-a);
    ctx.g.appendChild(el('path', {
      d: 'M ' + (x + arcR) + ' ' + y + ' A ' + arcR + ' ' + arcR + ' 0 0 ' + sweep + ' ' + ax2 + ' ' + ay2,
      stroke: '#455a64', strokeWidth: 1.5, fill: 'none'
    }));
    ctx.g.appendChild(textEl(x + arcR + 18, y - arcR / 2, 'θ', { fontSize: 14, fill: '#333' }));
  }

  /**
   * 力箭头（任意角度，按比例长度）
   * @param {Object} ctx
   * @param {number} x,y - 作用点（箭头起点）
   * @param {number} angleDeg - 方向角（度），0=向右，90=向上，-90=向下
   * @param {number} length - 箭头长度（像素）
   * @param {string} label - 力符号（如 G, F支, f）
   * @param {string} [color='#ef5350']
   */
  function forceArrow(ctx, x, y, angleDeg, length, label, color) {
    var a = rad(angleDeg);
    var dx = length * Math.cos(a);
    var dy = -length * Math.sin(a);
    var endX = x + dx;
    var endY = y + dy;
    var midX = x + dx * 0.5;
    var midY = y + dy * 0.5;
    var c = color || '#ef5350';
    var markerId = 'phy-arrow';
    if (c.indexOf('42a5f5') !== -1 || c === '#42a5f5') markerId = 'phy-arrow-blue';
    else if (c.indexOf('66bb6a') !== -1 || c === '#66bb6a') markerId = 'phy-arrow-green';
    else if (c.indexOf('ab47bc') !== -1 || c === '#ab47bc') markerId = 'phy-arrow-purple';
    else if (c.indexOf('ff9800') !== -1 || c === '#ff9800') markerId = 'phy-arrow-orange';
    else if (c.indexOf('ef5350') !== -1 || c === '#ef5350') markerId = 'phy-arrow-red';
    var line = el('line', { x1: x, y1: y, x2: endX, y2: endY, stroke: c, strokeWidth: 3, markerEnd: 'url(#' + markerId + ')' });
    ctx.g.appendChild(line);
    var labelOffset = 12;
    var lx = endX + Math.cos(a) * labelOffset;
    var ly = endY - Math.sin(a) * labelOffset;
    ctx.g.appendChild(textEl(lx, ly, label, { fontSize: 14, fill: c, fontWeight: 'bold' }));
  }

  /**
   * 地面（水平线，可选粗糙纹理）
   * @param {Object} ctx
   * @param {number} x1,x2 - 左右端点 x
   * @param {number} y - 地面 y
   * @param {boolean} [rough] - 是否画粗糙纹理
   */
  function ground(ctx, x1, x2, y, rough) {
    ctx.g.appendChild(el('line', { x1: x1, y1: y, x2: x2, y2: y, stroke: '#6d4c41', strokeWidth: 4 }));
    if (rough) {
      for (var gx = x1 + 12; gx <= x2 - 6; gx += 18) {
        ctx.g.appendChild(el('line', { x1: gx, y1: y, x2: gx - 6, y2: y + 9, stroke: '#8d6e63', strokeWidth: 2 }));
      }
    }
  }

  /**
   * 墙壁
   * @param {Object} ctx
   * @param {number} x - 墙的 x 位置
   * @param {number} y1,y2 - 上下 y
   * @param {string} [side='left'] - 'left' | 'right'
   */
  function wall(ctx, x, y1, y2, side) {
    var w = 24;
    var x0 = side === 'right' ? x - w : x;
    ctx.g.appendChild(el('rect', { x: x0, y: y1, width: w, height: y2 - y1, fill: '#9e9e9e', stroke: '#616161', strokeWidth: 1 }));
    ctx.g.appendChild(el('line', { x1: side === 'right' ? x : x + w, y1: y1, x2: side === 'right' ? x : x + w, y2: y2, stroke: '#333', strokeWidth: 2 }));
  }

  /**
   * 滑轮（圆 + 支架）
   * @param {Object} ctx
   * @param {number} cx,cy - 圆心
   * @param {number} [r=20] - 半径
   */
  function pulley(ctx, cx, cy, r) {
    r = r || 20;
    ctx.g.appendChild(el('circle', { cx: cx, cy: cy, r: r, fill: '#e0e0e0', stroke: '#424242', strokeWidth: 2 }));
    ctx.g.appendChild(el('line', { x1: cx - r - 4, y1: cy - r - 8, x2: cx + r + 4, y2: cy - r - 8, stroke: '#616161', strokeWidth: 3 }));
    ctx.g.appendChild(el('line', { x1: cx, y1: cy - r - 8, x2: cx, y2: cy - r, stroke: '#616161', strokeWidth: 2 }));
  }

  /**
   * 绳子（折线）
   * @param {Object} ctx
   * @param {Array<{x:number,y:number}>} points - 各段端点
   */
  function rope(ctx, points) {
    if (!points || points.length < 2) return;
    var d = 'M ' + points[0].x + ' ' + points[0].y;
    for (var i = 1; i < points.length; i++) d += ' L ' + points[i].x + ' ' + points[i].y;
    ctx.g.appendChild(el('path', { d: d, stroke: '#5d4037', strokeWidth: 2, fill: 'none' }));
  }

  /**
   * 杠杆（支点 + 杆）
   * @param {Object} ctx
   * @param {number} pivotX, pivotY - 支点
   * @param {number} length - 杆长（单侧）
   * @param {number} angleDeg - 杆与水平夹角
   */
  function lever(ctx, pivotX, pivotY, length, angleDeg) {
    var a = rad(angleDeg);
    var x1 = pivotX - length * Math.cos(a);
    var y1 = pivotY + length * Math.sin(a);
    var x2 = pivotX + length * Math.cos(a);
    var y2 = pivotY - length * Math.sin(a);
    ctx.g.appendChild(el('line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: '#5d4037', strokeWidth: 6 }));
    ctx.g.appendChild(el('circle', { cx: pivotX, cy: pivotY, r: 8, fill: '#757575', stroke: '#424242', strokeWidth: 1 }));
  }

  /**
   * 液体（容器 + 液面）
   * @param {Object} ctx
   * @param {number} x,y - 容器左上角
   * @param {number} w,h - 宽高
   * @param {number} level - 液面高度（0~1 或像素）
   * @param {string} [label='液体']
   */
  function fluid(ctx, x, y, w, h, level, label) {
    var levelY = typeof level === 'number' && level <= 1 ? y + h - level * h : (level != null ? level : y + h / 2);
    ctx.g.appendChild(el('rect', { x: x, y: y, width: w, height: h, fill: 'none', stroke: '#37474f', strokeWidth: 2 }));
    ctx.g.appendChild(el('rect', { x: x + 1, y: levelY, width: w - 2, height: y + h - levelY, fill: '#4fc3f7', opacity: 0.6 }));
    ctx.g.appendChild(el('line', { x1: x, y1: levelY, x2: x + w, y2: levelY, stroke: '#0288d1', strokeWidth: 2 }));
    if (label) ctx.g.appendChild(textEl(x + w / 2, levelY - 8, label, { fontSize: 12, fill: '#0277bd' }));
  }

  /**
   * 坐标图（F-x、L-F 等）
   * @param {Object} ctx
   * @param {Object} options - { data: [[x,y],...], width, height, xLabel, yLabel, xTicks, yTicks, originX, originY }
   */
  function graph(ctx, options) {
    var data = options.data || [];
    var w = options.width || 300;
    var h = options.height || 200;
    var ox = options.originX != null ? options.originX : 50;
    var oy = options.originY != null ? options.originY : h - 30;
    var xLabel = options.xLabel || 'x';
    var yLabel = options.yLabel || 'y';
    var g = ctx.g;
    g.appendChild(el('line', { x1: ox, y1: oy, x2: ox + w, y2: oy, stroke: '#333', strokeWidth: 2 }));
    g.appendChild(el('line', { x1: ox, y1: oy, x2: ox, y2: oy - (h - 40), stroke: '#333', strokeWidth: 2 }));
    g.appendChild(textEl(ox + w - 20, oy + 22, xLabel, { fontSize: 14, fill: '#333' }));
    g.appendChild(textEl(ox - 28, oy - h + 50, yLabel, { fontSize: 14, fill: '#333' }));
    if (options.xTicks) options.xTicks.forEach(function (t) {
      g.appendChild(el('line', { x1: t.px, y1: oy, x2: t.px, y2: oy + 5, stroke: '#333', strokeWidth: 1 }));
      g.appendChild(textEl(t.px, oy + 18, t.label, { fontSize: 11, fill: '#666' }));
    });
    if (options.yTicks) options.yTicks.forEach(function (t) {
      g.appendChild(el('line', { x1: ox, y1: t.py, x2: ox - 5, y2: t.py, stroke: '#333', strokeWidth: 1 }));
      g.appendChild(textEl(ox - 22, t.py + 4, t.label, { fontSize: 11, fill: '#666', textAnchor: 'end' }));
    });
    if (data.length >= 2) {
      var scaleX = options.scaleX || (w / (data[data.length - 1][0] - data[0][0] || 1));
      var scaleY = options.scaleY || (h / (Math.max.apply(null, data.map(function (p) { return p[1]; })) || 1));
      var d = 'M ' + (ox + data[0][0] * scaleX) + ' ' + (oy - data[0][1] * scaleY);
      for (var i = 1; i < data.length; i++) d += ' L ' + (ox + data[i][0] * scaleX) + ' ' + (oy - data[i][1] * scaleY);
      g.appendChild(el('path', { d: d, stroke: '#667eea', strokeWidth: 3, fill: 'none' }));
    }
  }

  /**
   * 弹簧测力计（简化外形 + 示数）
   * @param {Object} ctx
   * @param {number} x,y - 顶部挂钩位置
   * @param {string|number} reading - 示数（如 "2.4N" 或 2.4）
   */
  function springScale(ctx, x, y, reading) {
    var boxW = 36, boxH = 50;
    ctx.g.appendChild(el('rect', { x: x - boxW / 2, y: y, width: boxW, height: boxH, rx: 4, fill: '#fff', stroke: '#37474f', strokeWidth: 2 }));
    ctx.g.appendChild(el('line', { x1: x, y1: y - 15, x2: x, y2: y, stroke: '#5d4037', strokeWidth: 2 }));
    spring(ctx, x, y + boxH, x, y + boxH + 35, 4, '#667eea');
    ctx.g.appendChild(el('circle', { cx: x, cy: y + boxH + 45, r: 6, fill: '#ffab91', stroke: '#e64a19', strokeWidth: 1 }));
    var readStr = typeof reading === 'number' ? reading + 'N' : (reading || '—');
    ctx.g.appendChild(textEl(x, y + boxH / 2 + 6, readStr, { fontSize: 12, fill: '#333', fontWeight: 'bold' }));
  }

  /**
   * 尺寸/角度标注
   * @param {Object} ctx
   * @param {number} x1,y1,x2,y2 - 标注线段或延长线端点
   * @param {string} label - 标注文字（如 "ΔL=2cm", "θ=30°"）
   * @param {Object} [opts] - { dashed: true, offset: 8 }
   */
  function dimension(ctx, x1, y1, x2, y2, label, opts) {
    var o = opts || {};
    var line = el('line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: o.stroke || '#ff9800', strokeWidth: 1.5 });
    if (o.dashed) line.setAttribute('stroke-dasharray', '5,5');
    ctx.g.appendChild(line);
    var midX = (x1 + x2) / 2, midY = (y1 + y2) / 2;
    var offset = o.offset != null ? o.offset : 10;
    ctx.g.appendChild(textEl(midX + offset, midY + offset, label, { fontSize: 12, fill: o.stroke || '#ff9800' }));
  }

  /**
   * 小球/质点（圆）
   * @param {Object} ctx
   * @param {number} cx,cy - 圆心
   * @param {number} [r=15] - 半径
   * @param {string} [label]
   */
  function circle(ctx, cx, cy, r, label) {
    r = r || 15;
    ctx.g.appendChild(el('circle', { cx: cx, cy: cy, r: r, fill: '#90caf9', stroke: '#1a237e', strokeWidth: 2 }));
    if (label) ctx.g.appendChild(textEl(cx, cy + 5, label, { fontSize: 14, fill: '#0d47a1', fontWeight: 'bold' }));
  }

  var PhySVG = {
    createSVG: createSVG,
    block: block,
    spring: spring,
    incline: incline,
    forceArrow: forceArrow,
    ground: ground,
    wall: wall,
    pulley: pulley,
    rope: rope,
    lever: lever,
    fluid: fluid,
    graph: graph,
    springScale: springScale,
    dimension: dimension,
    circle: circle
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = PhySVG;
  else global.PhySVG = PhySVG;
})(typeof window !== 'undefined' ? window : this);
