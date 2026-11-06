/**
 * 改善事例の数値（削減時間・削減率）を判定・計算する処理
 * ------------------------------------------------------------
 * 画面表示（main.js）と自動テスト（tests/）の両方から使います。
 * 数値が確定していない事例では、必ず「算定中」になるようにしています。
 */
(function (root) {
  "use strict";

  var METRIC_TYPES = { measured: "実測値", estimated: "想定値", none: null };
  var PENDING_TEXT = "算定中";

  // 0以上の有限な数値かどうか（null・文字列・NaN・Infinity・負の数は不可）
  function isMinutes(v) {
    return typeof v === "number" && isFinite(v) && v >= 0;
  }

  /**
   * 削減率（%）を計算する
   * 削減率 = (改善前 - 改善後) ÷ 改善前 × 100
   * 改善前が0以下、または値が数値でない場合は null（計算しない）
   */
  function calcReductionRate(beforeMinutes, afterMinutes) {
    if (typeof beforeMinutes !== "number" || !isFinite(beforeMinutes)) return null;
    if (typeof afterMinutes !== "number" || !isFinite(afterMinutes)) return null;
    if (beforeMinutes <= 0) return null;
    return ((beforeMinutes - afterMinutes) / beforeMinutes) * 100;
  }

  // 分を「2時間30分」のような表記にする
  function formatMinutes(min) {
    if (!isMinutes(min)) return PENDING_TEXT;
    var m = Math.round(min);
    if (m < 60) return m + "分";
    var h = Math.floor(m / 60);
    var rest = m % 60;
    return h + "時間" + (rest ? rest + "分" : "");
  }

  function formatRate(rate) {
    if (typeof rate !== "number" || !isFinite(rate)) return PENDING_TEXT;
    return Math.round(rate) + "%";
  }

  /**
   * 事例データから、画面に出す内容を決める
   * 戻り値の ready が true のときだけ数値を表示する
   */
  function getMetricView(item) {
    item = item || {};
    var type = Object.prototype.hasOwnProperty.call(METRIC_TYPES, item.metricType) ? item.metricType : "none";
    var before = item.beforeMinutes;
    var after = item.afterMinutes;
    var problems = [];

    if (item.metricStatus !== "confirmed") problems.push("metricStatus が confirmed ではありません");
    if (type === "none") problems.push("metricType が measured / estimated ではありません");
    if (!isMinutes(before)) problems.push("beforeMinutes が未入力（または0未満）です");
    if (!isMinutes(after)) problems.push("afterMinutes が未入力（または0未満）です");

    var rate = calcReductionRate(before, after);
    if (problems.length === 0 && rate === null) problems.push("beforeMinutes が0のため削減率を計算できません");
    if (problems.length === 0 && rate < 0) problems.push("afterMinutes が beforeMinutes より大きくなっています");

    var ready = problems.length === 0;
    return {
      ready: ready,
      typeLabel: ready ? METRIC_TYPES[type] : null,
      beforeMinutes: ready ? before : null,
      afterMinutes: ready ? after : null,
      rate: ready ? rate : null,
      beforeText: ready ? formatMinutes(before) : PENDING_TEXT,
      afterText: ready ? formatMinutes(after) : PENDING_TEXT,
      rateText: ready ? formatRate(rate) : PENDING_TEXT,
      // 入力途中かどうか（数値が一部だけ入っているなど）。開発用の注意表示に使う
      incomplete: !ready && (isMinutes(before) || isMinutes(after) || item.metricStatus === "confirmed" || type !== "none"),
      problems: problems,
    };
  }

  root.SiteMetrics = {
    PENDING_TEXT: PENDING_TEXT,
    calcReductionRate: calcReductionRate,
    formatMinutes: formatMinutes,
    formatRate: formatRate,
    getMetricView: getMetricView,
  };
})(typeof window !== "undefined" ? window : this);
