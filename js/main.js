/**
 * config.js / content.js の内容をページに反映し、メニューや表示演出を動かす処理
 * （通常は編集不要です）
 */
(function () {
  "use strict";

  var config = window.SITE_CONFIG || {};
  var content = window.SITE_CONTENT || {};
  var Metrics = window.SiteMetrics;
  var missing = []; // 未設定・要確認の項目（開発用の表示に使う）
  // 手元（localhost など）で開いているか。開発用の表示や警告はこのときだけ出す
  var host = location.hostname;
  var isLocal = location.protocol === "file:" || host === "localhost" || host === "127.0.0.1" || host === "[::1]" || /\.(localhost|test)$/.test(host);
  function devWarn() { if (isLocal && window.console) console.warn.apply(console, arguments); }

  var trim = function (v) { return typeof v === "string" ? v.trim() : ""; };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  function enSpan(text, className) {
    var s = el("span", className, text);
    s.setAttribute("lang", "en");
    return s;
  }
  function isHttpsUrl(url) { return /^https:\/\/[^\s"'<>]+$/i.test(url); }
  function pad(n) { return ("0" + n).slice(-2); }

  /* ---------- 氏名・肩書き ---------- */
  var name = trim(config.name);
  var title = trim(config.title);
  if (name) document.querySelectorAll("[data-name]").forEach(function (n) { n.textContent = name; });
  else missing.push("氏名（config.js の <code>name</code>）");
  if (title) document.querySelectorAll("[data-title]").forEach(function (n) { n.textContent = title; });

  /* ---------- 顔写真（サイト内の画像だけを許可） ---------- */
  var photo = trim(config.photo);
  var photoEl = document.querySelector("[data-photo]");
  var isLocalPath = /^(?!\/\/)(?![a-z][a-z0-9+.-]*:)[\w\-./]+$/i.test(photo) && photo.indexOf("..") === -1;
  if (photoEl && photo && isLocalPath) {
    photoEl.addEventListener("error", function () {
      photoEl.src = "assets/images/placeholder-profile.svg";
      photoEl.alt = "プロフィール写真（準備中）";
      devWarn("[設定] 顔写真が見つかりません: " + photo);
    }, { once: true });
    photoEl.src = photo;
    photoEl.alt = (name || "") + "のプロフィール写真";
  } else {
    missing.push("顔写真（config.js の <code>photo</code>）");
  }

  /* ---------- メールボタン ---------- */
  var contact = config.contact || {};
  // メールアドレスは「@の前」「@の後ろ」に分けて保存しているので、ここで組み立てる（迷惑メール対策）
  var emailUser = trim(contact.emailUser), emailDomain = trim(contact.emailDomain);
  var email = trim(contact.email) || (emailUser && emailDomain ? emailUser + "@" + emailDomain : "");
  // メールアドレスに使える文字だけ、かつ例示用アドレスではないこと
  // （「?」「&」などを含むと宛先を勝手に追加できてしまうため不可）
  var isValidEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(email) &&
    !/@example\.(com|org|net|jp)$/i.test(email);
  var mailBtn = document.querySelector("[data-mail]");
  var mailLabel = document.querySelector("[data-mail-label]");
  var mailNote = document.querySelector("[data-mail-note]");

  if (mailBtn && isValidEmail) {
    var params = [];
    var subject = trim(contact.subject);
    var body = typeof contact.body === "string" ? contact.body : "";
    if (subject) params.push("subject=" + encodeURIComponent(subject));
    if (body) params.push("body=" + encodeURIComponent(body.replace(/\r?\n/g, "\r\n")));
    mailBtn.href = "mailto:" + email + (params.length ? "?" + params.join("&") : "");
    mailBtn.classList.remove("is-disabled");
    mailBtn.removeAttribute("aria-disabled");
    if (mailLabel) mailLabel.textContent = "メールで相談する";
    if (mailNote) mailNote.textContent = "メールアプリが起動します（宛先：" + email + "）";
  } else if (mailBtn) {
    mailBtn.addEventListener("click", function (e) { e.preventDefault(); });
    missing.push("問い合わせメールアドレス（config.js の <code>contact.emailUser</code> / <code>emailDomain</code>）" + (email ? "：形式が正しくないか、例示用のアドレスです" : ""));
    devWarn("[設定] config.js のメールアドレスが未設定のため、メールボタンを無効にしています。");
  }

  /* ---------- 動画編集サイトへのリンク ---------- */
  var videoUrl = trim((config.videoSite || {}).url);
  if (isHttpsUrl(videoUrl)) {
    document.querySelectorAll("[data-video-link]").forEach(function (a) { a.href = videoUrl; });
    document.querySelectorAll("[data-video-item], [data-video-block]").forEach(function (n) { n.hidden = false; });
  } else {
    missing.push("動画編集サイトのURL（config.js の <code>videoSite.url</code>）");
  }

  /* ---------- プライバシーポリシー（任意） ---------- */
  var privacyUrl = trim(config.privacyPolicyUrl);
  if (privacyUrl && (isHttpsUrl(privacyUrl) || /^[\w\-./]+\.html$/i.test(privacyUrl))) {
    var pLink = document.querySelector("[data-privacy-link]");
    var pItem = document.querySelector("[data-privacy-item]");
    if (pLink && pItem) { pLink.href = privacyUrl; pItem.hidden = false; }
  }

  /* ---------- サービス ---------- */
  var servicesRoot = document.querySelector("[data-services]");
  (content.services || []).forEach(function (s, i) {
    var li = el("li", "service reveal");
    var no = el("p", "service-no", pad(i + 1));
    no.setAttribute("lang", "en");
    li.appendChild(no);
    if (trim(s.en)) {
      var en = el("p", "service-en", s.en);
      en.setAttribute("lang", "en");
      en.setAttribute("aria-hidden", "true");
      li.appendChild(en);
    }
    li.appendChild(el("h3", "service-title", s.title));
    li.appendChild(el("p", "service-desc", s.text));
    if (servicesRoot) servicesRoot.appendChild(li);
  });
  var toolsRoot = document.querySelector("[data-tools]");
  (content.tools || []).forEach(function (t) { if (toolsRoot) toolsRoot.appendChild(el("li", null, t)); });

  /* ---------- 業務改善の提案例 ---------- */
  var casesRoot = document.querySelector("[data-cases]");
  var countTargets = [];

  function heading(tag, className, en, ja) {
    var h = el(tag, className);
    var e = enSpan(en);
    e.setAttribute("aria-hidden", "true");
    h.appendChild(e);
    h.appendChild(document.createTextNode(ja));
    return h;
  }

  function block(className, en, ja, items) {
    var b = el("div", "case-block " + className);
    b.appendChild(heading("h4", "case-block-title", en, ja));
    if (Array.isArray(items)) {
      var ul = el("ul");
      items.forEach(function (t) { ul.appendChild(el("li", null, t)); });
      b.appendChild(ul);
    } else {
      b.appendChild(el("p", null, items));
    }
    return b;
  }

  function flowCol(kind, label, steps) {
    var col = el("div", "flow-col flow-col-" + kind);
    col.appendChild(el("p", "flow-col-label", label));
    var ol = el("ol", "flow-steps");
    (steps || []).forEach(function (t) { ol.appendChild(el("li", null, t)); });
    col.appendChild(ol);
    return col;
  }

  function metricTile(className, label, valueText, view, countValue, kind) {
    var tile = el("div", "metric " + className + (view.ready ? " is-ready" : " is-pending"));
    tile.appendChild(el("p", "metric-label", label));
    var value = el("p", "metric-value", valueText);
    if (view.ready) value.setAttribute("lang", "en");
    tile.appendChild(value);
    if (view.ready) {
      tile.appendChild(el("span", "metric-type", view.typeLabel));
      countTargets.push({ node: value, to: countValue, kind: kind });
    }
    return tile;
  }

  (content.cases || []).forEach(function (c, i) {
    var no = pad(i + 1);
    var headingId = (c.id || "case-" + no) + "-title";
    var article = el("article", "case reveal");
    article.setAttribute("aria-labelledby", headingId);

    // 見出し
    var head = el("div", "case-head");
    var caseNo = enSpan("Case " + no, "case-no");
    head.appendChild(caseNo);
    var h3 = el("h3", "case-title", c.title);
    h3.id = headingId;
    head.appendChild(h3);
    head.appendChild(el("span", "case-badge", "提案例（導入前）"));
    article.appendChild(head);

    // 課題・改善案・期待できるメリット
    var blocks = el("div", "case-blocks");
    blocks.appendChild(block("case-block-problem", "Issue", "課題", c.problem));
    blocks.appendChild(block("case-block-solution", "Solution", "改善案", c.solution));
    blocks.appendChild(block("case-block-benefit", "Merit", "期待できるメリット", c.benefits));
    article.appendChild(blocks);

    // 業務フロー図
    article.appendChild(heading("h4", "case-sub", "Flow", "業務フローのイメージ"));
    var flow = el("div", "flow");
    flow.appendChild(flowCol("before", "現在の流れ（例）", c.beforeFlow));
    var between = el("div", "flow-between");
    between.setAttribute("aria-hidden", "true");
    between.appendChild(el("span", "arrow"));
    flow.appendChild(between);
    flow.appendChild(flowCol("after", "改善後の流れ（例）", c.afterFlow));
    article.appendChild(flow);

    // 数値（確定するまで「算定中」）
    var view = Metrics.getMetricView(c);
    var mt = heading("h4", "case-sub", "Effect", "改善効果の目安");
    if (view.ready && trim(c.periodLabel)) mt.appendChild(el("span", "metrics-period", "（" + trim(c.periodLabel) + "）"));
    article.appendChild(mt);
    var grid = el("div", "metrics");
    var measured = view.typeLabel === "実測値";
    grid.appendChild(metricTile("metric-before", "従来の作業時間", view.beforeText, view, view.beforeMinutes, "minutes"));
    grid.appendChild(metricTile("metric-after", measured ? "改善後の作業時間" : "改善後の想定時間", view.afterText, view, view.afterMinutes, "minutes"));
    var rateTile = metricTile("metric-rate", measured ? "削減率" : "想定削減率", view.rateText, view, view.rate, "rate");
    // 削減できる時間（改善前 − 改善後）を削減率の下に表示
    if (view.ready) rateTile.appendChild(el("p", "metric-saved", Metrics.formatMinutes(c.beforeMinutes - c.afterMinutes) + "の削減"));
    grid.appendChild(rateTile);
    article.appendChild(grid);

    var noteText;
    if (!view.ready) {
      noteText = "※ 数値は、現在の業務内容を確認したうえで算定します。確定後に「実測値」または「想定値」と明記して掲載します。";
    } else if (measured) {
      noteText = "※ 実測値：実際の業務で計測した値です。";
    } else {
      noteText = "※ 想定値：試算に基づく値です。実際の効果は業務内容や運用状況により異なります。";
    }
    if (view.ready && trim(c.metricNote)) noteText += "（" + trim(c.metricNote) + "）";
    article.appendChild(el("p", "metrics-note", noteText));

    if (casesRoot) casesRoot.appendChild(article);

    if (view.incomplete) {
      missing.push("CASE " + no + " の数値が入力途中です：" + view.problems.join("／"));
      devWarn("[設定] CASE " + no + " の数値は条件を満たしていないため「算定中」と表示しています。", view.problems);
    }
  });

  /* ---------- 数値のカウントアップ（数値が確定している事例のみ） ---------- */
  function fmt(t, v) { return (t.kind === "rate" ? Metrics.formatRate : Metrics.formatMinutes)(v); }
  function runCountUp(target) {
    if (reduceMotion) { target.node.textContent = fmt(target, target.to); return; }
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / 900);
      target.node.textContent = fmt(target, target.to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
      else target.node.textContent = fmt(target, target.to);
    }
    requestAnimationFrame(step);
    // 演出が止まった場合（画面が裏に回った等）でも、必ず最終の数値を表示する
    setTimeout(function () { target.node.textContent = fmt(target, target.to); }, 1500);
  }
  // 最初から正しい数値を表示しておき、画面に入ったときだけ0からカウントアップする
  if (countTargets.length && "IntersectionObserver" in window && !reduceMotion) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countTargets.forEach(function (t) { if (t.node === entry.target) runCountUp(t); });
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    countTargets.forEach(function (t) { countObserver.observe(t.node); });
  }

  /* ---------- スクロール時のフェードイン ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-shown");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    reveals.forEach(function (r) { revealObserver.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add("is-shown"); });
  }

  /* ---------- 画面下メニュー：いま見ているセクションに下線 ---------- */
  var navMap = { services: "services", cases: "cases", benefits: "cases", strengths: "profile", profile: "profile", process: "pricing", pricing: "pricing", faq: "pricing", contact: "contact" };
  var dockLinks = document.querySelectorAll('.dock a[href^="#"]');
  if ("IntersectionObserver" in window && dockLinks.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var target = navMap[entry.target.id];
        dockLinks.forEach(function (a) {
          if (target && a.getAttribute("href") === "#" + target) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main > section").forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- 日本語の改行位置を整える（BudouX） ---------- */
  if (window.BudouXJa) {
    ["main", ".site-footer"].forEach(function (sel) {
      var root = document.querySelector(sel);
      if (!root) return;
      window.BudouXJa.applyToElement(root);
      // 英単語・数字の途中に入った区切りは取り除く
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      var node;
      while ((node = walker.nextNode())) {
        if (node.data.indexOf("​") === -1) continue;
        node.data = node.data.replace(/([A-Za-z0-9])​(?=[A-Za-z0-9])/g, "$1");
      }
    });
  }

  /* ---------- フッターの年 ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 開発用：未設定項目の一覧（手元で開いたときだけ表示） ---------- */
  if (!document.querySelector('link[rel="canonical"]')) {
    missing.push("公開URL（index.html の canonical / og:url / og:image）");
  }
  if (missing.length) {
    devWarn("[設定] 未設定の項目があります:\n- " + missing.join("\n- ").replace(/<\/?code>/g, ""));
  }
  if (isLocal && missing.length) {
    var panel = el("aside", "dev-panel");
    panel.setAttribute("aria-label", "開発用：未設定の項目");
    panel.appendChild(el("strong", null, "【開発用】未設定の項目（公開前に設定してください）"));
    var ul = el("ul");
    missing.forEach(function (m) {
      var li = el("li");
      // <code> だけを安全に表示する（ほかのタグは使わない）
      m.split(/(<code>[^<]*<\/code>)/).forEach(function (part) {
        var mm = part.match(/^<code>([^<]*)<\/code>$/);
        li.appendChild(mm ? el("code", null, mm[1]) : document.createTextNode(part));
      });
      ul.appendChild(li);
    });
    panel.appendChild(ul);
    var close = el("button", null, "×");
    close.type = "button";
    close.setAttribute("aria-label", "この表示を閉じる");
    close.addEventListener("click", function () { panel.remove(); });
    panel.appendChild(close);
    document.body.appendChild(panel);
  }
})();
