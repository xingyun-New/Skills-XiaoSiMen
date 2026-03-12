/**
 * 飞书多维表格 - 答题记录 & 错题同步模块
 *
 * 通过 Vercel 代理服务调用飞书 API（绕过浏览器 CORS 限制）。
 *
 * 用法：
 *   1. 在 HTML 中引入: <script src="../lib/feishu-sync.js"></script>
 *      或 GitHub Pages: <script src="https://xingyun-new.github.io/Skills-XiaoSiMen/lib/feishu-sync.js"></script>
 *   2. 答题结束后调用:
 *      FeishuSync.submit({ ... })           // 提交答题总成绩
 *      FeishuSync.submitWrongQuestions({ ... }) // 提交错题明细
 */
var FeishuSync = (function () {
  var BASE_URL = 'https://vercel-package-rho.vercel.app';
  var SYNC_URL = BASE_URL + '/sync';
  var WRONG_URL = BASE_URL + '/wrong';

  function _showStatus(statusEl, textEl, bg, text) {
    if (statusEl) { statusEl.style.display = 'block'; statusEl.style.background = bg; }
    if (textEl) { textEl.textContent = text; }
  }

  /**
   * 提交答题总成绩到飞书
   * @param {Object} opts
   * @param {string} opts.practiceTitle  - 练习标题
   * @param {number} opts.questionCount  - 题目总数
   * @param {number} opts.score          - 答对题数
   * @param {number} opts.accuracy       - 正确率 (0-100)
   * @param {string} [opts.practiceUrl]  - 练习页面链接
   * @param {string} [opts.statusElId]   - 同步状态容器元素 ID
   * @param {string} [opts.textElId]     - 同步文字元素 ID
   * @returns {Promise}
   */
  function submit(opts) {
    var statusEl = opts.statusElId ? document.getElementById(opts.statusElId) : null;
    var textEl = opts.textElId ? document.getElementById(opts.textElId) : null;

    _showStatus(statusEl, textEl, '#e3f2fd', '\uD83D\uDCE1 正在同步答题记录到飞书...');

    var body = {
      practiceTitle: opts.practiceTitle || '未知练习',
      questionCount: opts.questionCount || 0,
      score: opts.score || 0,
      accuracy: opts.accuracy || 0,
      practiceUrl: opts.practiceUrl || location.href,
      answerDate: new Date().toISOString()
    };

    return fetch(SYNC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (!data.success) throw new Error(data.error || '同步失败');
      console.log('[FeishuSync] 成绩同步成功, recordId:', data.recordId);
      _showStatus(statusEl, textEl, '#e8f5e9', '\u2705 答题记录已同步到飞书！');
      return data;
    })
    .catch(function (err) {
      console.error('[FeishuSync] 成绩同步失败:', err);
      _showStatus(statusEl, textEl, '#ffebee', '\u26A0\uFE0F 同步失败: ' + err.message);
      throw err;
    });
  }

  /**
   * 提交错题明细到飞书（错题本）
   * @param {Object} opts
   * @param {string} opts.practiceTitle    - 练习标题
   * @param {string} [opts.practiceUrl]    - 练习页面链接
   * @param {string} [opts.subject]        - 学科（如 "物理"、"英语"）
   * @param {Array}  opts.wrongQuestions   - 错题数组，每项包含:
   *   @param {string} q.question       - 题目内容
   *   @param {string} q.correctAnswer  - 正确答案
   *   @param {string} [q.studentAnswer]- 学生的答案
   *   @param {string} [q.topic]        - 知识点
   *   @param {string} [q.commonMistake]- 易错提醒
   *   @param {number} [q.difficulty]   - 难度 (1-3)
   * @returns {Promise}
   */
  function submitWrongQuestions(opts) {
    if (!opts.wrongQuestions || opts.wrongQuestions.length === 0) {
      console.log('[FeishuSync] 无错题，跳过');
      return Promise.resolve({ success: true, message: '无错题', created: 0 });
    }

    console.log('[FeishuSync] 提交', opts.wrongQuestions.length, '道错题...');

    var body = {
      practiceTitle: opts.practiceTitle || '未知练习',
      practiceUrl: opts.practiceUrl || location.href,
      subject: opts.subject || '',
      wrongQuestions: opts.wrongQuestions
    };

    return fetch(WRONG_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (!data.success) throw new Error(data.error || '错题同步失败');
      console.log('[FeishuSync] 错题同步成功, 写入', data.created, '条');
      return data;
    })
    .catch(function (err) {
      console.error('[FeishuSync] 错题同步失败:', err);
      throw err;
    });
  }

  return {
    submit: submit,
    submitWrongQuestions: submitWrongQuestions,
    SYNC_URL: SYNC_URL,
    WRONG_URL: WRONG_URL
  };
})();
