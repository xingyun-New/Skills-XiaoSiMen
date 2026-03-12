/**
 * 物理答题引擎库 (QuizEngine)
 * 提供题目导航、答题处理、提示系统、计分、知识卡片、成绩面板、飞书同步。
 * 图示由页面通过 renderDiagram 回调或 PhySVG 自行绘制。
 *
 * 用法：
 *   1. 页面需包含: <div id="quizTitle">, #progressText, #correctCount, #streakCount, #totalScore, #progressBar, #quizArea
 *   2. 先加载 feishu-sync.js（若需飞书同步）
 *   3. QuizEngine.init({ data: quizData, renderDiagram: function(diagram){ return htmlOrEmpty; } });
 */
(function (global) {
  'use strict';

  var PHY_ENGINE_STYLE_ID = 'physics-quiz-engine-styles';

  var CSS = [
    '* { margin: 0; padding: 0; box-sizing: border-box; }',
    'body { font-family: -apple-system, "Microsoft YaHei", "PingFang SC", sans-serif; background: linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #01579b 100%); min-height: 100vh; padding: 20px; color: #333; }',
    '.phy-q-container { max-width: 720px; margin: 0 auto; }',
    '.phy-q-header { text-align: center; color: white; margin-bottom: 24px; }',
    '.phy-q-header h1 { font-size: 1.8em; margin-bottom: 8px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }',
    '.phy-q-stats { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }',
    '.phy-q-stat { background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); padding: 8px 20px; border-radius: 20px; font-size: 1em; color: white; }',
    '.phy-q-stat .value { font-weight: bold; }',
    '.phy-q-progress-wrap { background: rgba(255,255,255,0.2); border-radius: 12px; height: 12px; margin: 16px 0; overflow: hidden; }',
    '.phy-q-progress-fill { height: 100%; background: linear-gradient(90deg, #4CAF50, #8BC34A); border-radius: 12px; transition: width 0.4s ease; }',
    '.phy-q-card { background: white; border-radius: 20px; padding: 32px; box-shadow: 0 10px 40px rgba(0,0,0,0.15); margin-bottom: 20px; animation: phyFadeIn 0.3s ease; }',
    '@keyframes phyFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }',
    '.phy-q-qheader { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }',
    '.phy-q-qnum { font-size: 0.9em; color: #888; }',
    '.phy-q-diff { font-size: 0.85em; padding: 4px 12px; border-radius: 12px; }',
    '.phy-q-diff-1 { background: #E8F5E9; color: #2E7D32; }',
    '.phy-q-diff-2 { background: #FFF3E0; color: #E65100; }',
    '.phy-q-diff-3 { background: #FCE4EC; color: #C62828; }',
    '.phy-q-text { font-size: 1.15em; line-height: 1.8; margin-bottom: 20px; font-weight: 500; }',
    '.phy-q-options { display: flex; flex-direction: column; gap: 12px; }',
    '.phy-q-opt { display: flex; align-items: center; padding: 14px 18px; border: 2px solid #e0e0e0; border-radius: 14px; background: #fafafa; cursor: pointer; transition: all 0.2s; font-size: 1.05em; line-height: 1.6; text-align: left; }',
    '.phy-q-opt:hover:not(.disabled) { border-color: #1a237e; background: #e8eaf6; transform: translateX(4px); }',
    '.phy-q-opt .letter { width: 32px; height: 32px; border-radius: 50%; background: #1a237e; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 14px; flex-shrink: 0; }',
    '.phy-q-opt.correct { border-color: #4CAF50; background: #E8F5E9; }',
    '.phy-q-opt.correct .letter { background: #4CAF50; }',
    '.phy-q-opt.wrong { border-color: #f44336; background: #FFEBEE; }',
    '.phy-q-opt.wrong .letter { background: #f44336; }',
    '.phy-q-opt.disabled { pointer-events: none; opacity: 0.7; }',
    '.phy-q-opt.disabled:not(.correct):not(.wrong) { opacity: 0.5; }',
    '.phy-q-tf { display: flex; gap: 16px; }',
    '.phy-q-tfbtn { flex: 1; padding: 16px; border: 2px solid #e0e0e0; border-radius: 14px; background: #fafafa; cursor: pointer; font-size: 1.2em; font-weight: bold; text-align: center; transition: all 0.2s; }',
    '.phy-q-tfbtn:hover:not(.disabled) { border-color: #1a237e; transform: scale(1.02); }',
    '.phy-q-fillinput { width: 100%; padding: 14px 18px; font-size: 1.1em; border: 2px solid #e0e0e0; border-radius: 14px; outline: none; transition: border-color 0.2s; }',
    '.phy-q-fillinput:focus { border-color: #1a237e; }',
    '.phy-q-fillrows { display: flex; flex-direction: column; gap: 12px; }',
    '.phy-q-fillrow { display: flex; align-items: center; gap: 12px; }',
    '.phy-q-fillrow label { font-weight: bold; color: #1a237e; min-width: 80px; }',
    '.phy-q-fillrow .phy-q-fillinput { flex: 1; }',
    '.phy-q-submit { width: 100%; padding: 14px; margin-top: 12px; background: linear-gradient(135deg, #1a237e, #0d47a1); color: white; border: none; border-radius: 14px; font-size: 1.1em; font-weight: bold; cursor: pointer; }',
    '.phy-q-hintbar { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }',
    '.phy-q-hintbtn { padding: 8px 18px; border: 2px solid #FF9800; border-radius: 20px; background: #FFF8E1; color: #E65100; cursor: pointer; font-size: 0.9em; font-weight: bold; transition: all 0.2s; }',
    '.phy-q-hintbtn:hover:not(.used) { background: #FFE0B2; transform: scale(1.05); }',
    '.phy-q-hintbtn.used { opacity: 0.5; pointer-events: none; border-color: #ccc; color: #999; background: #f5f5f5; }',
    '.phy-q-hintcost { font-size: 0.8em; color: #999; }',
    '.phy-q-hintarea { background: #FFFDE7; border-left: 4px solid #FFB300; padding: 12px 16px; border-radius: 0 10px 10px 0; margin-bottom: 16px; font-size: 0.95em; line-height: 1.7; animation: phyFadeIn 0.3s ease; }',
    '.phy-q-hintarea .hint-level { font-weight: bold; color: #F57C00; margin-bottom: 4px; }',
    '.phy-q-kc { margin-top: 20px; padding: 20px; border-radius: 14px; line-height: 1.8; font-size: 0.95em; animation: phyFadeIn 0.3s ease; }',
    '.phy-q-kc.correct-card { background: linear-gradient(135deg, #E8F5E9, #f1f8e9); border-left: 5px solid #4CAF50; }',
    '.phy-q-kc.wrong-card { background: linear-gradient(135deg, #FFF3E0, #FFF8E1); border-left: 5px solid #FF9800; }',
    '.phy-q-kc .kc-title { font-weight: bold; font-size: 1.05em; margin-bottom: 8px; }',
    '.phy-q-kc .kc-item { margin: 4px 0; }',
    '.phy-q-next, .phy-q-restart { width: 100%; padding: 14px; margin-top: 16px; background: linear-gradient(135deg, #1a237e, #0d47a1); color: white; border: none; border-radius: 14px; font-size: 1.1em; font-weight: bold; cursor: pointer; transition: transform 0.2s; }',
    '.phy-q-next:hover, .phy-q-restart:hover { transform: scale(1.02); }',
    '.phy-q-review { width: 100%; padding: 14px; margin-top: 8px; background: linear-gradient(135deg, #FF9800, #F57C00); color: white; border: none; border-radius: 14px; font-size: 1.1em; font-weight: bold; cursor: pointer; }',
    '.phy-q-result-card { text-align: center; padding: 40px 32px; }',
    '.phy-q-result-score { font-size: 4em; font-weight: bold; background: linear-gradient(135deg, #1a237e, #0d47a1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }',
    '.phy-q-result-detail { margin: 24px 0; line-height: 2; font-size: 1.05em; }',
    '.phy-q-weak { text-align: left; background: #FFF3E0; padding: 16px 20px; border-radius: 12px; margin: 16px 0; }',
    '.phy-q-weak h3 { color: #E65100; margin-bottom: 8px; }',
    '.phy-q-popup { position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #FFD700, #FFA000); color: #333; padding: 16px 24px; border-radius: 16px; font-weight: bold; box-shadow: 0 8px 24px rgba(0,0,0,0.3); z-index: 1000; animation: phySlideIn 0.4s ease, phySlideOut 0.4s ease 2.6s forwards; }',
    '@keyframes phySlideIn { from { transform: translateX(300px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }',
    '@keyframes phySlideOut { to { transform: translateX(300px); opacity: 0; } }',
    '.phy-q-material { background: #e8eaf6; border-left: 4px solid #1a237e; padding: 16px 20px; margin-bottom: 20px; border-radius: 0 10px 10px 0; }',
    '.phy-q-material-label { font-size: 0.85em; color: #666; margin-bottom: 8px; font-style: italic; }',
    '.phy-q-material-content { line-height: 1.8; font-size: 1em; color: #333; }',
    '.phy-q-subq { margin-top: 16px; }',
    '.phy-q-subq-item { margin-bottom: 20px; background: #fafafa; padding: 14px; border-radius: 12px; border: 1px solid #e0e0e0; }',
    '.phy-q-subq-text { font-weight: 500; margin-bottom: 10px; color: #333; line-height: 1.6; }',
    '.phy-q-subq-pts { font-size: 0.85em; color: #1a237e; font-weight: bold; margin-left: 8px; }',
    '.phy-q-textarea { width: 100%; min-height: 80px; padding: 12px; border: 2px solid #e0e0e0; border-radius: 12px; font-size: 0.95em; resize: vertical; outline: none; transition: border-color 0.2s; font-family: inherit; line-height: 1.6; }',
    '.phy-q-textarea:focus { border-color: #1a237e; }',
    '.phy-q-submit-mat { width: 100%; padding: 14px; margin-top: 16px; background: linear-gradient(135deg, #1a237e, #283593); color: white; border: none; border-radius: 14px; font-size: 1.1em; font-weight: bold; cursor: pointer; transition: transform 0.2s; }',
    '.phy-q-submit-mat:hover { transform: scale(1.02); }',
    '.phy-q-rubric { background: #e8eaf6; border-left: 4px solid #1a237e; padding: 14px 16px; margin-top: 16px; border-radius: 0 8px 8px 0; }',
    '.phy-q-rubric-title { font-weight: bold; color: #1a237e; margin-bottom: 8px; font-size: 0.95em; }',
    '.phy-q-rubric-item { margin: 6px 0; font-size: 0.9em; line-height: 1.5; color: #444; }',
    '.phy-q-rubric-item::before { content: "✓ "; color: #1a237e; font-weight: bold; }',
    '.phy-q-assess { display: flex; gap: 12px; margin-top: 20px; flex-wrap: wrap; }',
    '.phy-q-assess-btn { flex: 1; min-width: 100px; padding: 12px 16px; border: 2px solid #e0e0e0; border-radius: 12px; background: #fafafa; cursor: pointer; font-weight: bold; font-size: 0.95em; transition: all 0.2s; text-align: center; }',
    '.phy-q-assess-btn:hover:not(.disabled) { border-color: #1a237e; background: #e8eaf6; transform: scale(1.02); }',
    '.phy-q-assess-btn.correct { border-color: #4CAF50; background: #E8F5E9; color: #2E7D32; }',
    '.phy-q-assess-btn.partial { border-color: #FF9800; background: #FFF3E0; color: #E65100; }',
    '.phy-q-assess-btn.wrong { border-color: #f44336; background: #FFEBEE; color: #c62828; }',
    '.phy-q-assess-btn.disabled { pointer-events: none; opacity: 0.6; }',
    '.phy-q-assess-score { font-size: 0.85em; color: #666; margin-top: 4px; }',
    '.phy-q-diagram-panel { margin: 18px 0 22px; background: linear-gradient(180deg, #f8fbff, #eef4ff); border: 1px solid #d8e5ff; border-radius: 16px; padding: 16px; }',
    '.phy-q-diagram-title { font-weight: bold; color: #1a237e; margin-bottom: 10px; font-size: 1em; }',
    '.phy-q-diagram-figure { width: 100%; overflow-x: auto; }',
    '.phy-q-diagram-figure svg { width: 100%; height: auto; display: block; }',
    '.phy-q-fillblank-detail { background: #f5f5f5; border-left: 4px solid #2196F3; padding: 16px 20px; margin-bottom: 20px; border-radius: 0 10px 10px 0; }',
    '.phy-q-fillblank-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; margin: 8px 0; border-radius: 8px; font-size: 0.95em; line-height: 1.6; }',
    '.phy-q-fillblank-item.correct { background: #E8F5E9; border-left: 3px solid #4CAF50; }',
    '.phy-q-fillblank-item.wrong { background: #FFEBEE; border-left: 3px solid #f44336; }',
    '.phy-q-fillblank-item .blank-num { display: inline-block; width: 24px; height: 24px; border-radius: 50%; background: #2196F3; color: white; text-align: center; line-height: 24px; font-weight: bold; font-size: 0.9em; flex-shrink: 0; }',
    '.phy-q-fillblank-item.correct .blank-num { background: #4CAF50; }',
    '.phy-q-fillblank-item.wrong .blank-num { background: #f44336; }',
    '.phy-q-fillblank-summary { margin-top: 12px; padding-top: 12px; border-top: 2px solid #ddd; font-weight: bold; font-size: 1.05em; color: #333; }',
    '@media (max-width: 600px) { body { padding: 12px; } .phy-q-card { padding: 20px; border-radius: 16px; } .phy-q-header h1 { font-size: 1.4em; } .phy-q-text { font-size: 1.05em; } .phy-q-opt { padding: 12px 14px; font-size: 0.95em; } }'
  ].join('\n');

  function injectStyles() {
    if (document.getElementById(PHY_ENGINE_STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = PHY_ENGINE_STYLE_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function getCorrectAnswerText(q) {
    if (q.type === 'choice' && q.options && q.answer != null) return q.options[q.answer];
    if (q.type === 'truefalse') return q.answer ? '正确' : '错误';
    if (q.type === 'fillblank') return Array.isArray(q.answer) ? q.answer[0] : q.answer;
    return '';
  }

  var quizData, originalQuestions, currentIndex, correctTotal, streak, maxStreak, score;
  var answered, wrongQuestions, hintsUsed, hintPenalty;
  var renderDiagramFn;

  function updateStats() {
    var total = quizData.questions.length;
    var pt = document.getElementById('phyProgressText');
    var cc = document.getElementById('phyCorrectCount');
    var sc = document.getElementById('phyStreakCount');
    var ts = document.getElementById('phyTotalScore');
    var pb = document.getElementById('phyProgressBar');
    if (pt) pt.textContent = currentIndex + '/' + total;
    if (cc) cc.textContent = correctTotal;
    if (sc) sc.textContent = streak;
    if (ts) ts.textContent = score;
    if (pb) pb.style.width = ((currentIndex / total) * 100) + '%';
  }

  function renderMaterialQuestion(q) {
    var materialHtml = '';
    if (q.material) {
      var ml = q.materialLabel ? '<div class="phy-q-material-label">' + escapeHtml(q.materialLabel) + '</div>' : '';
      materialHtml = '<div class="phy-q-material">' + ml + '<div class="phy-q-material-content">' + q.material + '</div></div>';
    }
    var subHtml = '';
    if (q.subQuestions && q.subQuestions.length > 0) {
      subHtml = '<div class="phy-q-subq">' + q.subQuestions.map(function (sq, i) {
        return '<div class="phy-q-subq-item">' +
          '<div class="phy-q-subq-text">(' + (i + 1) + ') ' + sq.question + '<span class="phy-q-subq-pts">（' + sq.points + '分）</span></div>' +
          '<textarea class="phy-q-textarea" id="material-answer-' + i + '" placeholder="请在此处写出解题过程和答案..."></textarea></div>';
      }).join('') + '</div>';
    }
    return materialHtml + subHtml +
      '<button class="phy-q-submit-mat" onclick="QuizEngine.submitMaterial()">提交答案</button>' +
      '<div id="materialFeedback"></div>';
  }

  function renderQuestion() {
    var area = document.getElementById('phyQuizArea');
    if (!area) return;
    if (currentIndex >= quizData.questions.length) {
      showResult();
      return;
    }
    var q = quizData.questions[currentIndex];
    hintsUsed = 0;
    var diffLabels = ['', '基础', '中等', '拔高'];
    var letters = ['A', 'B', 'C', 'D'];
    var diagramHtml = (renderDiagramFn && q.diagram) ? (renderDiagramFn(q.diagram, q) || '') : '';
    if (diagramHtml && q.diagram && q.diagram.title) {
      diagramHtml = '<div class="phy-q-diagram-panel">' +
        '<div class="phy-q-diagram-title">🖼 ' + escapeHtml(q.diagram.title) + '</div>' +
        '<div class="phy-q-diagram-figure">' + diagramHtml + '</div>' +
        (q.diagram.caption ? '<div style="margin-top:10px;color:#546e7a;font-size:0.9em;">' + escapeHtml(q.diagram.caption) + '</div>' : '') +
        '</div>';
    } else if (diagramHtml) {
      diagramHtml = '<div class="phy-q-diagram-panel"><div class="phy-q-diagram-figure">' + diagramHtml + '</div></div>';
    }

    var hintHtml = '';
    if (q.hints && q.hints.length > 0) {
      var labels = ['💡 提示1', '📖 提示2', '🎯 提示3'];
      var costs = ['-30%', '-60%', '-90%'];
      hintHtml = '<div class="phy-q-hintbar">' + q.hints.map(function (_, i) {
        return '<button type="button" class="phy-q-hintbtn" data-hint="' + i + '">' + labels[i] + ' <span class="phy-q-hintcost">(' + costs[i] + ')</span></button>';
      }).join('') + '</div><div id="hintArea"></div>';
    }

    var optHtml = '';
    if (q.type === 'choice') {
      optHtml = '<div class="phy-q-options">' + q.options.map(function (opt, i) {
        return '<div class="phy-q-opt" data-choice="' + i + '"><span class="letter">' + letters[i] + '</span><span>' + escapeHtml(opt) + '</span></div>';
      }).join('') + '</div>';
    } else if (q.type === 'truefalse') {
      optHtml = '<div class="phy-q-tf">' +
        '<div class="phy-q-tfbtn" data-tf="true">✓ 正确</div>' +
        '<div class="phy-q-tfbtn" data-tf="false">✗ 错误</div></div>';
    } else if (q.type === 'fillblank') {
      var answers = Array.isArray(q.answer) ? q.answer : [q.answer];
      var correctAnswer = answers[0].split('；');
      var numBlanks = correctAnswer.length;
      if (numBlanks === 1) {
        optHtml = '<input class="phy-q-fillinput" id="fillInput" placeholder="请输入答案...">' +
          '<button type="button" class="phy-q-submit" data-action="submitFill">提交答案</button>';
      } else {
        optHtml = '<div class="phy-q-fillrows">' + correctAnswer.map(function (_, i) {
          return '<div class="phy-q-fillrow"><label>第' + (i + 1) + '空：</label><input class="phy-q-fillinput" id="fillInput-' + i + '" placeholder="请输入第' + (i + 1) + '个空的答案..."></div>';
        }).join('') + '</div><button type="button" class="phy-q-submit" data-action="submitFill">提交答案</button>';
      }
    } else if (q.type === 'calculation' || q.type === 'experiment') {
      optHtml = renderMaterialQuestion(q);
    }

    area.innerHTML = '<div class="phy-q-card">' +
      '<div class="phy-q-qheader">' +
      '<span class="phy-q-qnum">第 ' + (currentIndex + 1) + ' / ' + quizData.questions.length + ' 题</span>' +
      '<span class="phy-q-diff phy-q-diff-' + q.difficulty + '">' + diffLabels[q.difficulty] + '</span></div>' +
      '<div class="phy-q-text">' + q.question + '</div>' +
      diagramHtml + hintHtml + optHtml +
      '<div id="feedback"></div></div>';
    answered = false;

    area.querySelectorAll('.phy-q-opt[data-choice]').forEach(function (btn) {
      btn.addEventListener('click', function () { selectChoice(parseInt(btn.getAttribute('data-choice'), 10)); });
    });
    area.querySelectorAll('.phy-q-tfbtn[data-tf]').forEach(function (btn) {
      btn.addEventListener('click', function () { selectTF(btn.getAttribute('data-tf') === 'true'); });
    });
    area.querySelectorAll('.phy-q-hintbtn[data-hint]').forEach(function (btn) {
      btn.addEventListener('click', function () { useHint(parseInt(btn.getAttribute('data-hint'), 10)); });
    });
    var submitFillBtn = area.querySelector('.phy-q-submit[data-action="submitFill"]');
    if (submitFillBtn) submitFillBtn.addEventListener('click', submitFill);
    var fillInput = area.querySelector('#fillInput');
    if (fillInput) fillInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') submitFill(); });
  }

  function useHint(level) {
    if (answered) return;
    var q = quizData.questions[currentIndex];
    if (!q.hints || level >= q.hints.length) return;
    var area = document.getElementById('phyQuizArea');
    if (area) area.querySelectorAll('.phy-q-hintbtn').forEach(function (btn, i) {
      if (i <= level) btn.classList.add('used');
    });
    hintsUsed = level + 1;
    var labels = ['💡 方向提示', '📖 关键知识', '🎯 解题思路'];
    var html = '';
    for (var j = 0; j <= level; j++) {
      html += '<div class="phy-q-hintarea"><div class="hint-level">' + labels[j] + '</div>' + q.hints[j] + '</div>';
    }
    var hintArea = document.getElementById('hintArea');
    if (hintArea) hintArea.innerHTML = html;
  }

  function selectChoice(idx) {
    if (answered) return;
    answered = true;
    var q = quizData.questions[currentIndex];
    var userAns = q.options ? q.options[idx] : String(idx);
    processAnswer(idx === q.answer, userAns);
    var area = document.getElementById('phyQuizArea');
    if (area) {
      area.querySelectorAll('.phy-q-opt').forEach(function (btn, i) {
        btn.classList.add('disabled');
        if (i === q.answer) btn.classList.add('correct');
        if (i === idx && idx !== q.answer) btn.classList.add('wrong');
      });
    }
  }

  function selectTF(val) {
    if (answered) return;
    answered = true;
    var q = quizData.questions[currentIndex];
    processAnswer(val === q.answer, val ? '正确' : '错误');
    var area = document.getElementById('phyQuizArea');
    if (area) {
      var t = area.querySelector('.phy-q-tfbtn[data-tf="true"]');
      var f = area.querySelector('.phy-q-tfbtn[data-tf="false"]');
      if (t) t.classList.add('disabled');
      if (f) f.classList.add('disabled');
      (q.answer ? t : f) && (q.answer ? t : f).classList.add('correct');
      (q.answer ? f : t) && (q.answer ? f : t).classList.add('wrong');
    }
  }

  function submitFill() {
    if (answered) return;
    var q = quizData.questions[currentIndex];
    var answers = Array.isArray(q.answer) ? q.answer : [q.answer];
    var correctAnswer = answers[0].split(/[;；]/);
    var numBlanks = correctAnswer.length;
    var isAllCorrect = true;
    var correctCount = 0;
    var userFillAns = '';
    if (numBlanks === 1) {
      var input = document.getElementById('fillInput');
      var inputVal = input ? input.value.trim() : '';
      if (!inputVal) return;
      answered = true;
      isAllCorrect = answers.some(function (a) { return inputVal === a.trim(); });
      userFillAns = inputVal;
    } else {
      for (var i = 0; i < numBlanks; i++) {
        var inp = document.getElementById('fillInput-' + i);
        var val = inp ? inp.value.trim() : '';
        if (!val) { alert('请完成所有空的填写！'); return; }
        var isThisCorrect = (val === correctAnswer[i].trim());
        if (isThisCorrect) correctCount++;
        else isAllCorrect = false;
        inp.disabled = true;
        inp.style.borderColor = isThisCorrect ? '#4CAF50' : '#f44336';
        inp.style.backgroundColor = isThisCorrect ? '#E8F5E9' : '#FFEBEE';
        userFillAns += (i ? '；' : '') + val;
      }
      answered = true;
    }
    q.fillBlankResult = { total: numBlanks, correct: correctCount, allCorrect: isAllCorrect };
    processAnswer(isAllCorrect, userFillAns);
  }

  function processAnswer(isCorrect, userAnswer) {
    var q = quizData.questions[currentIndex];
    if (isCorrect) {
      streak++;
      if (streak > maxStreak) maxStreak = streak;
      var basePoints = (streak >= 5 ? 15 : streak >= 3 ? 12 : 10) + q.difficulty * 5;
      var earnedPoints = Math.round(basePoints * hintPenalty[hintsUsed]);
      score += earnedPoints;
      correctTotal++;
      showAchievement(hintsUsed > 0 ? '📖 用提示答对 +' + earnedPoints : (streak === 3 ? '🔥 三连击！' : streak === 5 ? '⚡ 五连击！' : streak === 10 ? '🏆 十连击！学霸！' : ''));
    } else {
      streak = 0;
      wrongQuestions.push({ index: currentIndex, userAnswer: userAnswer || '' });
    }
    updateStats();
    showFeedback(isCorrect, q);
  }

  function showFeedback(isCorrect, q) {
    var kc = q.knowledgeCard || {};
    var cls = isCorrect ? 'correct-card' : 'wrong-card';
    var fillBlankFeedback = '';
    if (q.type === 'fillblank' && q.fillBlankResult && q.fillBlankResult.total > 1) {
      var result = q.fillBlankResult;
      var answers = Array.isArray(q.answer) ? q.answer : [q.answer];
      var correctAnswer = answers[0].split(/[;；]/);
      fillBlankFeedback = '<div class="phy-q-fillblank-detail"><div class="kc-title" style="margin-bottom:12px;">📝 各空判分详情</div>';
      for (var i = 0; i < result.total; i++) {
        var inp = document.getElementById('fillInput-' + i);
        var userVal = inp ? inp.value.trim() : '';
        var isThisCorrect = (userVal === correctAnswer[i].trim());
        fillBlankFeedback += '<div class="phy-q-fillblank-item ' + (isThisCorrect ? 'correct' : 'wrong') + '">' +
          '<span class="blank-num">' + (i + 1) + '</span>' +
          '<span class="blank-status">' + (isThisCorrect ? '✓ 正确' : '✗ 错误') + '</span>' +
          '<span class="blank-user">你的答案：' + (userVal || '未填') + '</span>' +
          (!isThisCorrect ? '<span class="blank-correct">正确答案：' + correctAnswer[i] + '</span>' : '') + '</div>';
      }
      fillBlankFeedback += '<div class="phy-q-fillblank-summary">共 ' + result.total + ' 空，答对 ' + result.correct + ' 空' +
        (result.allCorrect ? ' <span class="summary-correct">✅ 全部正确！</span>' : ' <span class="summary-wrong">💪 继续加油！</span>') + '</div></div>';
    }
    var h = '<div class="phy-q-kc ' + cls + '">' +
      '<div class="kc-title">' + (isCorrect ? '✅ 回答正确！' : '❌ 回答错误') + '</div>' +
      '<div class="kc-item">📚 <b>考点：</b>' + escapeHtml(kc.topic) + '</div>' +
      '<div class="kc-item">📖 <b>出处：</b>' + escapeHtml(kc.source) + '</div>';
    if (kc.formula) h += '<div class="kc-item">🔬 <b>相关公式：</b>' + escapeHtml(kc.formula) + '</div>';
    h += '<div class="kc-item">💡 <b>关键记忆：</b>' + escapeHtml(kc.keyMemory) + '</div>';
    if (!isCorrect && kc.commonMistake) h += '<div class="kc-item">⚠️ <b>易错提醒：</b>' + escapeHtml(kc.commonMistake) + '</div>';
    if (kc.relatedTopics) h += '<div class="kc-item">🔗 <b>关联知识：</b>' + escapeHtml(kc.relatedTopics) + '</div>';
    h += '</div>';
    if (fillBlankFeedback) h = fillBlankFeedback + h;
    h += '<button type="button" class="phy-q-next" data-action="next">' + (currentIndex < quizData.questions.length - 1 ? '下一题 →' : '查看成绩 📊') + '</button>';
    var fb = document.getElementById('feedback');
    if (fb) {
      fb.innerHTML = h;
      fb.querySelector('.phy-q-next[data-action="next"]').addEventListener('click', nextQuestion);
    }
  }

  function nextQuestion() {
    currentIndex++;
    updateStats();
    renderQuestion();
  }

  function showResult() {
    var total = quizData.questions.length;
    var pct = Math.round((correctTotal / total) * 100);
    var rating = pct >= 90 ? '🏆 优秀！物理学得真棒！' : pct >= 70 ? '👍 良好！继续加油！' : pct >= 60 ? '✓ 及格，部分知识点需要巩固' : '💪 加油！建议重新复习相关章节';
    var weakHtml = '';
    if (wrongQuestions.length > 0) {
      var seen = {};
      var topics = [];
      wrongQuestions.forEach(function (w) {
        var t = quizData.questions[w.index].knowledgeCard && quizData.questions[w.index].knowledgeCard.topic;
        if (t && !seen[t]) { seen[t] = true; topics.push(t); }
      });
      weakHtml = '<div class="phy-q-weak"><h3>📋 薄弱知识点</h3>' + topics.map(function (t) { return '<div>· ' + escapeHtml(t) + '</div>'; }).join('') + '</div>' +
        '<button type="button" class="phy-q-review" data-action="review">🔄 错题重练（' + wrongQuestions.length + '题）</button>';
    }
    var pb = document.getElementById('phyProgressBar');
    var pt = document.getElementById('phyProgressText');
    if (pb) pb.style.width = '100%';
    if (pt) pt.textContent = total + '/' + total;
    var area = document.getElementById('phyQuizArea');
    if (area) {
      area.innerHTML = '<div class="phy-q-card phy-q-result-card">' +
        '<div style="font-size:1.2em;margin-bottom:8px;">练习完成！</div>' +
        '<div class="phy-q-result-score">' + pct + '分</div>' +
        '<div class="phy-q-result-detail">共 ' + total + ' 题，答对 ' + correctTotal + ' 题<br>最高连击 ' + maxStreak + ' 次 · 总积分 ' + score + '<br>' + rating + '</div>' +
        weakHtml +
        '<div id="syncStatus" style="margin:16px 0;padding:12px;border-radius:10px;display:none;text-align:center;"><span id="syncText"></span></div>' +
        '<button type="button" class="phy-q-restart" data-action="restart">🔁 重新开始</button></div>';
      area.querySelector('.phy-q-restart[data-action="restart"]').addEventListener('click', restart);
      var reviewBtn = area.querySelector('.phy-q-review[data-action="review"]');
      if (reviewBtn) reviewBtn.addEventListener('click', reviewWrong);
    }
    syncResultToFeishu(total, pct);
  }

  function syncResultToFeishu(total, pct) {
    if (typeof global.FeishuSync === 'undefined') return;
    var title = quizData.title || document.title || '';
    global.FeishuSync.submit({
      practiceTitle: title,
      questionCount: total,
      score: correctTotal,
      accuracy: pct,
      practiceUrl: location.href,
      statusElId: 'syncStatus',
      textElId: 'syncText'
    });
    if (wrongQuestions.length > 0) {
      var wrongData = wrongQuestions.map(function (w) {
        var q = originalQuestions[w.index];
        var kc = (q && q.knowledgeCard) || {};
        return {
          question: (q && q.question) || '',
          correctAnswer: getCorrectAnswerText(q),
          studentAnswer: w.userAnswer || '',
          topic: kc.topic || '',
          commonMistake: kc.commonMistake || '',
          difficulty: (q && q.difficulty) || 0
        };
      });
      global.FeishuSync.submitWrongQuestions({
        practiceTitle: title,
        practiceUrl: location.href,
        subject: title.replace(/[【】]/g, '').split('·')[0].trim(),
        wrongQuestions: wrongData
      });
    }
  }

  function reviewWrong() {
    quizData.questions = wrongQuestions.map(function (w) { return originalQuestions[w.index]; });
    currentIndex = 0;
    correctTotal = 0;
    streak = 0;
    score = 0;
    wrongQuestions = [];
    updateStats();
    renderQuestion();
  }

  function restart() {
    location.reload();
  }

  function showAchievement(text) {
    if (!text) return;
    var el = document.createElement('div');
    el.className = 'phy-q-popup';
    el.textContent = text;
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 3000);
  }

  function submitMaterial() {
    if (answered) return;
    var q = quizData.questions[currentIndex];
    var allFilled = true;
    if (q.subQuestions) {
      for (var i = 0; i < q.subQuestions.length; i++) {
        var val = document.getElementById('material-answer-' + i);
        if (val && !val.value.trim()) allFilled = false;
      }
    }
    if (!allFilled) { alert('请先完成所有小题的作答！'); return; }
    answered = true;
    document.querySelectorAll('.phy-q-textarea').forEach(function (el) { el.disabled = true; });
    var btn = document.querySelector('.phy-q-submit-mat');
    if (btn) btn.style.display = 'none';
    showMaterialFeedback(q);
  }

  function showMaterialFeedback(q) {
    var kc = q.knowledgeCard || {};
    var totalPoints = 0;
    if (q.subQuestions) {
      for (var i = 0; i < q.subQuestions.length; i++) totalPoints += q.subQuestions[i].points;
    }
    var scoringHtml = '';
    if (q.subQuestions) {
      scoringHtml = '<div class="phy-q-rubric"><div class="phy-q-rubric-title">📝 参考答案与评分标准</div>' +
        q.subQuestions.map(function (sq, i) {
          var items = (sq.scoring && sq.scoring.length > 0) ? sq.scoring.map(function (s) { return '<div class="phy-q-rubric-item">' + s + '</div>'; }).join('') : '<div class="phy-q-rubric-item">答出关键步骤即可得分</div>';
          return '<div style="margin-bottom:12px;"><b>(' + (i + 1) + ')</b> ' + escapeHtml(sq.answer) + '<div style="margin-top:6px;">' + items + '</div></div>';
        }).join('') + '</div>';
    }
    var assessHtml = '<div style="margin-top:12px;font-weight:bold;color:#1a237e;">请对照参考答案自评：</div>' +
      '<div class="phy-q-assess">' +
      '<button type="button" class="phy-q-assess-btn" data-assess="correct">✅ 完全正确<div class="phy-q-assess-score">得 ' + totalPoints + ' 分</div></button>' +
      '<button type="button" class="phy-q-assess-btn" data-assess="partial">🔶 部分正确<div class="phy-q-assess-score">得 ' + Math.round(totalPoints * 0.5) + ' 分</div></button>' +
      '<button type="button" class="phy-q-assess-btn" data-assess="wrong">❌ 错误<div class="phy-q-assess-score">得 0 分</div></button></div>';
    var feedbackArea = document.getElementById('materialFeedback');
    if (feedbackArea) {
      feedbackArea.innerHTML = '<div class="phy-q-kc correct-card">' +
        '<div class="kc-title">📖 解题参考</div>' +
        '<div class="kc-item">📚 <b>考点：</b>' + escapeHtml(kc.topic) + '</div>' +
        '<div class="kc-item">📖 <b>出处：</b>' + escapeHtml(kc.source) + '</div>' +
        (kc.formula ? '<div class="kc-item">🔬 <b>核心公式：</b>' + escapeHtml(kc.formula) + '</div>' : '') +
        (kc.answerTechnique ? '<div class="kc-item">💡 <b>解题技巧：</b>' + escapeHtml(kc.answerTechnique) + '</div>' : '') +
        '</div>' + scoringHtml + assessHtml;
      feedbackArea.querySelectorAll('.phy-q-assess-btn[data-assess]').forEach(function (btn) {
        btn.addEventListener('click', function () { selfAssess(btn.getAttribute('data-assess')); });
      });
    }
  }

  function selfAssess(level) {
    var q = quizData.questions[currentIndex];
    var totalPoints = 0;
    if (q.subQuestions) {
      for (var i = 0; i < q.subQuestions.length; i++) totalPoints += q.subQuestions[i].points;
    }
    document.querySelectorAll('.phy-q-assess-btn').forEach(function (btn) { btn.classList.add('disabled'); });
    var earnedPoints = 0;
    var isCorrect = false;
    if (level === 'correct') {
      earnedPoints = totalPoints;
      isCorrect = true;
      document.querySelector('.phy-q-assess-btn[data-assess="correct"]') && document.querySelector('.phy-q-assess-btn[data-assess="correct"]').classList.add('correct');
    } else if (level === 'partial') {
      earnedPoints = Math.round(totalPoints * 0.5);
      isCorrect = true;
      document.querySelector('.phy-q-assess-btn[data-assess="partial"]') && document.querySelector('.phy-q-assess-btn[data-assess="partial"]').classList.add('partial');
    } else {
      document.querySelector('.phy-q-assess-btn[data-assess="wrong"]') && document.querySelector('.phy-q-assess-btn[data-assess="wrong"]').classList.add('wrong');
      streak = 0;
      wrongQuestions.push({ index: currentIndex, userAnswer: '自评：错误' });
    }
    if (isCorrect) {
      streak++;
      if (streak > maxStreak) maxStreak = streak;
      var basePoints = (streak >= 5 ? 15 : streak >= 3 ? 12 : 10) + q.difficulty * 5;
      score += Math.round(basePoints * hintPenalty[hintsUsed]) + earnedPoints;
      correctTotal++;
      showAchievement(streak === 3 ? '🔥 三连击！' : streak === 5 ? '⚡ 五连击！太棒了！' : streak === 10 ? '🏆 十连击！学霸！' : '');
    }
    updateStats();
    var feedbackArea = document.getElementById('materialFeedback');
    if (feedbackArea) {
      var kc = q.knowledgeCard || {};
      var extraHtml = (!isCorrect && kc.commonMistake ? '<div class="kc-item" style="margin-top:12px;">⚠️ <b>易错提醒：</b>' + escapeHtml(kc.commonMistake) + '</div>' : '') +
        (kc.relatedTopics ? '<div class="kc-item">🔗 <b>关联知识：</b>' + escapeHtml(kc.relatedTopics) + '</div>' : '');
      feedbackArea.innerHTML += '<div class="phy-q-kc ' + (isCorrect ? 'correct-card' : 'wrong-card') + '" style="margin-top:16px;">' + extraHtml +
        '<div class="kc-item" style="font-weight:bold;">' + (isCorrect ? '✅ 得分：' + earnedPoints : '❌ 本题未得分') + '</div></div>' +
        '<button type="button" class="phy-q-next" data-action="next">' + (currentIndex < quizData.questions.length - 1 ? '下一题 →' : '查看成绩 📊') + '</button>';
      feedbackArea.querySelector('.phy-q-next[data-action="next"]').addEventListener('click', nextQuestion);
    }
  }

  function ensureContainer() {
    var container = document.getElementById('phyQuizContainer');
    if (container) return;
    container = document.createElement('div');
    container.id = 'phyQuizContainer';
    container.className = 'phy-q-container';
    var header = document.createElement('div');
    header.className = 'phy-q-header';
    header.innerHTML = '<h1 id="phyQuizTitle"></h1>' +
      '<div class="phy-q-stats">' +
      '<div class="phy-q-stat">📊 进度 <span class="value" id="phyProgressText">0/0</span></div>' +
      '<div class="phy-q-stat">✅ 正确 <span class="value" id="phyCorrectCount">0</span></div>' +
      '<div class="phy-q-stat">🔥 连击 <span class="value" id="phyStreakCount">0</span></div>' +
      '<div class="phy-q-stat">⭐ 积分 <span class="value" id="phyTotalScore">0</span></div></div>' +
      '<div class="phy-q-progress-wrap"><div class="phy-q-progress-fill" id="phyProgressBar" style="width:0%"></div></div>';
    container.appendChild(header);
    var area = document.createElement('div');
    area.id = 'phyQuizArea';
    container.appendChild(area);
    document.body.insertBefore(container, document.body.firstChild);
  }

  function init(options) {
    var opts = options || {};
    var data = opts.data;
    if (!data || !data.questions || !data.questions.length) {
      console.error('QuizEngine.init: data.questions required');
      return;
    }
    injectStyles();
    ensureContainer();
    quizData = data;
    originalQuestions = data.questions.slice();
    currentIndex = 0;
    correctTotal = 0;
    streak = 0;
    maxStreak = 0;
    score = 0;
    answered = false;
    wrongQuestions = [];
    hintsUsed = 0;
    hintPenalty = [1.0, 0.7, 0.4, 0.1];
    renderDiagramFn = typeof opts.renderDiagram === 'function' ? opts.renderDiagram : null;
    var titleEl = document.getElementById('phyQuizTitle');
    if (titleEl) titleEl.textContent = data.title || '物理练习';
    updateStats();
    renderQuestion();
  }

  global.QuizEngine = {
    init: init,
    submitMaterial: submitMaterial
  };
})(typeof window !== 'undefined' ? window : this);
