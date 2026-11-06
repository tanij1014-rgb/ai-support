/**
 * ページ表示の最初に動かす処理
 * セキュリティ設定（CSP）でページ内に直接書いたスクリプトを禁止しているため、別ファイルにしています。
 */
(function () {
  "use strict";

  // ── 埋め込み対策（クリックジャッキング防止）──────────────
  // 他のサイトがこのページを枠（iframe）の中に表示して、
  // 「メールで相談する」などのボタンを誤って押させる手口を防ぎます。
  // GitHub Pages では専用の設定（X-Frame-Options など）を使えないため、ここで対策しています。
  if (window.top !== window.self) {
    // まず中身を隠す（ブラウザによっては下の「開き直し」が黙って止められるため、先に隠しておく）
    document.documentElement.style.display = "none";
    try {
      // 枠の外（ブラウザのタブ全体）でこのページを開き直す
      window.top.location.replace(window.self.location.href);
    } catch (e) {
      // 開き直せない場合も、中身は隠したまま
    }
  }

  // JavaScriptが動く環境であることをCSSに伝える（スクロール時のフェードイン用）
  document.documentElement.classList.add("js");
})();
