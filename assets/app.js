/* ============================================================
   Windows 快捷键速查 · 应用层
   经典脚本（非 ES Module），双击 index.html 即可离线运行
   内容全部来自 assets/data.js，逻辑不写死任何条数
   ============================================================ */
/* global KB */
(function () {
  'use strict';

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));
  const viewEl = $('#view');
  const searchEl = $('#search');
  const crumbsEl = $('#crumbs');
  const metaEl = $('#topbarMeta');
  const toastEl = $('#toast');
  const sectionNavEl = $('#sectionNav');

  /* ---------------- 分类：KB.sections + 可选的 sections/*.js ----------------
     新增一个分类 = 往 assets/data.js 的 sections 数组里追加一个对象；
     也可以新建 sections/extra.js（window.EXTRA_SECTIONS.push({...})）再到
     index.html 打开对应的 <script>。缺字段会自动兜底。 */
  const ACCENTS = ['#5cc8ff', '#a78bfa', '#3ddc97', '#f5a524', '#ff7b72', '#4fd1c5', '#e879f9'];
  const EXTRA_SECTIONS = Array.isArray(window.EXTRA_SECTIONS) ? window.EXTRA_SECTIONS : [];
  const SECTIONS = [];

  (KB.sections || []).concat(EXTRA_SECTIONS).forEach(function (raw) {
    const s = raw || {};
    const n = SECTIONS.length + 1;
    s.id = s.id || 'sec' + n;
    if (SECTIONS.some(function (x) { return x.id === s.id; })) {
      console.warn('[知识库] 重复的分类 id「' + s.id + '」已忽略，请检查 data.js / sections 目录。');
      return;
    }
    s.num = s.num || String(n).padStart(2, '0');
    s.title = s.title || s.short || ('分类 ' + n);
    s.short = s.short || s.title;
    s.icon = s.icon || '⌨️';
    s.accent = s.accent || ACCENTS[(n - 1) % ACCENTS.length];
    s.tagline = s.tagline || '';
    s.summary = s.summary || '';
    s.goals = s.goals || [];
    s.tips = s.tips || [];
    s.shortcuts = (s.shortcuts || []).map(function (c) {
      return {
        keys: c.keys || '',
        action: c.action || '',
        note: c.note || '',
        tag: c.tag || ''
      };
    });
    SECTIONS.push(s);
  });

  const SECTION_MAP = {};
  SECTIONS.forEach(function (s) { SECTION_MAP[s.id] = s; });

  const ALL_SHORTCUTS = [];
  SECTIONS.forEach(function (s) {
    s.shortcuts.forEach(function (c) { ALL_SHORTCUTS.push({ sec: s, c: c }); });
  });

  const FN_ICONS = (KB.fnIcons || []).map(function (x) {
    return {
      icon: x.icon || '⌨️',
      name: x.name || '未命名图标',
      effect: x.effect || '',
      note: x.note || '',
      tag: x.tag || '其他'
    };
  });
  const FN_TAGS = (KB.fnTags || []).slice();
  FN_ICONS.forEach(function (x) {
    if (FN_TAGS.indexOf(x.tag) < 0) { FN_TAGS.push(x.tag); }
  });
  const NATIVE_F = (KB.nativeF || []).map(function (x) {
    return { key: x.key || '', action: x.action || '', note: x.note || '' };
  });
  const MUST_KNOW = (KB.mustKnow || []).map(function (x) {
    return { keys: x.keys || '', action: x.action || '', why: x.why || '' };
  });
  const SCENES = (KB.scenes || []).map(function (x) {
    return {
      id: x.id || '', icon: x.icon || '🧩', title: x.title || '未命名场景',
      lead: x.lead || '', tip: x.tip || '',
      steps: (x.steps || []).map(function (st) {
        return { keys: st.keys || '', action: st.action || '' };
      })
    };
  });
  const NEXT_STEPS = KB.nextSteps || [];

  const STATS = {
    sections: SECTIONS.length,
    shortcuts: ALL_SHORTCUTS.length,
    icons: FN_ICONS.length,
    nativeF: NATIVE_F.length,
    mustKnow: MUST_KNOW.length,
    scenes: SCENES.length
  };
  const NUM_CN = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  function cnNum(n) { return NUM_CN[n] || String(n); }

  /* ---------------- 工具函数 ---------------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }
  function fmt(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  }
  function secStyle(sec) { return '--day:' + ((sec && sec.accent) || '#5cc8ff'); }

  /* 把 'Win + Ctrl + ← / →' 渲染成键帽；'+' 与 '/' 只做分隔符 */
  function keysHtml(keys) {
    const groups = String(keys || '').split(/\s+\+\s+/);
    return '<span class="keys">' + groups.map(function (g) {
      const parts = g.split(/\s*\/\s*/);
      return parts.map(function (p) {
        return '<kbd class="keycap">' + esc(p) + '</kbd>';
      }).join('<span class="key-sep">/</span>');
    }).join('<span class="key-plus">+</span>') + '</span>';
  }

  let toastTimer = null;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 1800);
  }

  function copyText(text) {
    let settled = false;
    const done = function () {
      if (settled) { return; }
      settled = true;
      toast('已复制：' + text);
    };
    const fallback = function () {
      if (settled) { return; }
      settled = true;
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); toast('已复制：' + text); }
      catch (e) { toast('复制失败，请手动选择'); }
      document.body.removeChild(ta);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      /* 个别环境（未聚焦的窗口 / 权限待确认）里 writeText 可能长时间不返回，
         超时后走 execCommand 回退，保证一定有反馈 */
      const timer = setTimeout(fallback, 700);
      navigator.clipboard.writeText(text).then(function () {
        clearTimeout(timer);
        done();
      }).catch(function () {
        clearTimeout(timer);
        fallback();
      });
    } else {
      fallback();
    }
  }
  /* ---------------- 侧边栏：分类入口（由 sections 自动生成） ---------------- */
  if (sectionNavEl) {
    sectionNavEl.innerHTML = SECTIONS.map(function (s) {
      return '<a class="nav-item nav-sub" href="#/' + s.id + '" data-view="' + s.id + '" style="' + secStyle(s) + '">' +
        '<span><span class="nav-day-no">' + esc(s.num) + ' · ' + esc(s.short) + '</span>' +
        '<span class="nav-title">' + s.shortcuts.length + ' 条 · ' + esc(s.tagline) + '</span></span>' +
        '<span class="dot"></span>' +
      '</a>';
    }).join('');
  }

  /* ---------------- 路由 ---------------- */
  const routes = {
    overview: renderOverview,
    icons: renderIcons,
    cheatsheet: renderCheatsheet,
    scenes: renderScenes,
    drill: renderDrill,
    mustknow: renderMustKnow
  };
  SECTIONS.forEach(function (s) {
    routes[s.id] = function () { return renderSection(s); };
  });

  function currentRoute() {
    const h = (location.hash || '').replace(/^#\/?/, '').trim();
    return routes[h] ? h : 'overview';
  }

  function setChrome(route, query) {
    metaEl.innerHTML =
      '<span class="chip-soft">' + STATS.sections + ' 类</span>' +
      '<span class="chip-soft">' + STATS.shortcuts + ' 条快捷键</span>' +
      '<span class="chip-soft">' + STATS.icons + ' 个图标</span>';

    if (query) {
      crumbsEl.innerHTML = '<b>搜索结果</b> · “' + esc(query) + '”';
    } else if (SECTION_MAP[route]) {
      const s = SECTION_MAP[route];
      crumbsEl.innerHTML = '<b>' + esc(s.num) + '</b> · ' + esc(s.title);
    } else {
      const map = {
        overview: '知识地图 · 总览',
        icons: 'F 键图标 · 功能对照',
        cheatsheet: '全量速查 · ' + STATS.shortcuts + ' 条',
        scenes: '场景实战 · ' + STATS.scenes + ' 条任务链',
        drill: '自测 · 看作用选快捷键',
        mustknow: '必背 ' + STATS.mustKnow + ' 条'
      };
      crumbsEl.innerHTML = '<b>' + esc(map[route] || '知识地图') + '</b>';
    }

    const base = (KB.meta && KB.meta.title) || 'Windows 快捷键速查';
    document.title = (query ? '搜索“' + query + '” · '
      : SECTION_MAP[route] ? SECTION_MAP[route].short + ' · ' : '') + base;

    $$('.nav-item[data-view]').forEach(function (a) {
      const on = a.getAttribute('data-view') === route && !query;
      a.classList.toggle('active', on);
      if (on) { a.setAttribute('aria-current', 'page'); } else { a.removeAttribute('aria-current'); }
    });
  }

  function render() {
    const q = (searchEl.value || '').trim();
    const route = currentRoute();
    viewEl.innerHTML = q ? renderSearch(q) : routes[route]();
    setChrome(route, q);
    bindAfterRender();
  }
  function go(hash) {
    searchEl.value = '';
    location.hash = hash;
    render();
  }

  /* ---------------- 视图①：总览 ---------------- */
  function renderOverview() {
    const stats = [
      { v: STATS.icons, t: '个 F 键图标' },
      { v: STATS.shortcuts, t: '条快捷键' },
      { v: STATS.sections, t: '个使用分类' },
      { v: STATS.mustKnow, t: '条必背' },
      { v: STATS.scenes, t: '条场景任务链' }
    ].map(function (s) {
      return '<div class="stat"><b>' + s.v + '</b><span>' + s.t + '</span></div>';
    }).join('');

    const pathItems = [
      { href: '#/icons', step: 'STEP 1', title: '认 F 键图标', desc: '先认清键盘上印的图案', c: '#5cc8ff' },
      { href: '#/' + (SECTIONS[0] ? SECTIONS[0].id : 'cheatsheet'), step: 'STEP 2', title: '按分类过一遍', desc: STATS.sections + ' 类快捷键，按场景记忆', c: '#a78bfa' },
      { href: '#/scenes', step: 'STEP 3', title: '串成任务链', desc: STATS.scenes + ' 个真实场景，连着用', c: '#3ddc97' },
      { href: '#/drill', step: 'STEP 4', title: '自测巩固', desc: '看作用，选快捷键', c: '#f5a524' }
    ];
    const path = pathItems.map(function (p) {
      return '<a class="path-item" href="' + p.href + '" style="--c:' + p.c + '">' +
        '<span class="step">' + p.step + '</span>' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<p>' + esc(p.desc) + '</p>' +
        '<span class="arrow">›</span>' +
      '</a>';
    }).join('');

    const models = (KB.mentalModels || []).map(function (m) {
      return '<div class="model">' +
        '<div class="model-top"><span class="model-ico">' + esc(m.icon) + '</span><h3>' + esc(m.title) + '</h3></div>' +
        '<p>' + fmt(m.body) + '</p>' +
        '<div class="src">来源 · ' + esc(m.from) + '</div>' +
      '</div>';
    }).join('');

    const secCards = SECTIONS.map(function (s) {
      const tags = [];
      s.shortcuts.forEach(function (c) { if (c.tag && tags.indexOf(c.tag) < 0) { tags.push(c.tag); } });
      return '<a class="daycard" href="#/' + s.id + '" style="--c:' + s.accent + '">' +
        '<div class="daycard-top"><span class="daycard-ico">' + esc(s.icon) + '</span>' +
          '<span class="daycard-no">' + esc(s.num) + ' · ' + esc(s.short) + '</span></div>' +
        '<h3>' + esc(s.title) + '</h3>' +
        '<p>' + esc(s.tagline) + '</p>' +
        '<div class="daycard-tags">' + tags.slice(0, 4).map(function (t) {
          return '<span class="pill">' + esc(t) + '</span>';
        }).join('') + '</div>' +
        '<div class="daycard-foot"><span>' + s.shortcuts.length + ' 条快捷键</span><span class="go">查看 →</span></div>' +
      '</a>';
    }).join('');

    const must = MUST_KNOW.slice(0, 10).map(function (x, i) {
      return '<div class="avoid-item">' +
        '<span class="idx">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<span class="txt">' + keysHtml(x.keys) + ' <span class="muted">' + esc(x.action) + '</span></span>' +
        '<span class="src pill">必背</span>' +
      '</div>';
    }).join('');

    const next = NEXT_STEPS.map(function (n) {
      return '<div class="model"><div class="model-top"><span class="model-ico">🚀</span>' +
        '<h3>' + esc(n.title) + '</h3></div><p>' + fmt(n.body) + '</p></div>';
    }).join('');
    return '' +
      '<section class="hero">' +
        '<span class="hero-eyebrow">⌨️ WINDOWS 10 / 11 · SHORTCUT ATLAS</span>' +
        '<h1>把快捷键，从<span class="grad">「背不住」</span>变成<span class="grad">「用得上」</span></h1>' +
        '<p class="hero-lead">' + esc(KB.meta.subtitle) + '</p>' +
        '<div class="hero-actions">' +
          '<a class="btn primary" href="#/icons">▶ 从 F 键图标开始</a>' +
          '<a class="btn" href="#/cheatsheet">📋 全量速查</a>' +
          '<a class="btn" href="#/drill">🎯 自测一下</a>' +
          '<a class="btn" href="#/mustknow">⭐ 必背 10 条</a>' +
        '</div>' +
        '<div class="stats">' + stats + '</div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="section-head"><h2><span class="num">01</span>四步上手</h2><p>从认图标到形成肌肉记忆</p></div>' +
        '<div class="path">' + path + '</div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="section-head"><h2><span class="num">02</span>' + cnNum((KB.mentalModels || []).length) + '个判断法则</h2>' +
          '<p>比背组合键更重要的，是知道什么时候按</p></div>' +
        '<div class="grid grid-3">' + models + '</div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="section-head"><h2><span class="num">03</span>按场景选分类</h2><p>' + STATS.sections + ' 类 · ' + STATS.shortcuts + ' 条快捷键</p></div>' +
        '<div class="grid grid-auto">' + secCards + '</div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="section-head"><h2><span class="num">04</span>先背这 ' + STATS.mustKnow + ' 条</h2><p>日常 80% 的场景够用了</p></div>' +
        '<div class="avoid">' + must + '</div>' +
        '<div class="hero-actions" style="margin-top:14px"><a class="btn sm ghost" href="#/mustknow">查看必背清单与自测 →</a></div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="section-head"><h2><span class="num">05</span>下一步学什么</h2><p>本手册未展开，但值得知道</p></div>' +
        '<div class="grid grid-3">' + next + '</div>' +
      '</section>';
  }
  /* ---------------- 视图②：F 键图标 ---------------- */
  function renderIcons() {
    const filters = '<div class="filters" id="iconFilters">' +
      '<button class="filter-btn active" type="button" data-icon-filter="all">全部 · ' + FN_ICONS.length + '</button>' +
      FN_TAGS.map(function (t) {
        const n = FN_ICONS.filter(function (x) { return x.tag === t; }).length;
        return '<button class="filter-btn" type="button" data-icon-filter="' + esc(t) + '">' +
          esc(t) + ' · ' + n + '</button>';
      }).join('') +
      '</div>';

    const cards = FN_ICONS.map(function (x) {
      const text = [x.name, x.effect, x.note, x.tag].join(' ');
      return '<div class="icon-card" data-icon-tag="' + esc(x.tag) + '" data-icon-text="' + esc(text) + '">' +
        '<span class="icon-glyph" aria-hidden="true">' + esc(x.icon) + '</span>' +
        '<div class="icon-body">' +
          '<div class="icon-head"><h3>' + esc(x.name) + '</h3><span class="pill">' + esc(x.tag) + '</span></div>' +
          '<p class="icon-effect">' + esc(x.effect) + '</p>' +
          '<p class="icon-note">' + esc(x.note) + '</p>' +
        '</div>' +
      '</div>';
    }).join('');

    const nativeRows = NATIVE_F.map(function (x) {
      return '<tr><td class="m"><kbd class="keycap">' + esc(x.key) + '</kbd></td>' +
        '<td>' + esc(x.action) + '</td><td class="muted">' + esc(x.note) + '</td></tr>';
    }).join('');

    const states = (KB.fnLock.states || []).map(function (s) {
      return '<div class="fn-state ' + esc(s.tone || '') + '">' +
        '<span class="fn-state-name">' + esc(s.state) + '</span>' +
        '<div class="fn-state-how">' + keysHtml(s.how) + '</div>' +
        '<p>' + esc(s.result) + '</p></div>';
    }).join('');

    const steps = (KB.fnLock.steps || []).map(function (t, i) {
      return '<div class="flow-step">' + String(i + 1).padStart(2, '0') + ' · ' + esc(t) + '</div>';
    }).join('');

    return '' +
      '<section class="hero compact">' +
        '<span class="hero-eyebrow">🔣 FN KEYS · ' + FN_ICONS.length + ' ICONS</span>' +
        '<h1>F 键图标：<span class="grad">认图标，不认 F 数字</span></h1>' +
        '<p class="hero-lead">不同品牌把同一功能放在不同 F 位（触摸板可能是 F6、F8、F9），只有图标是统一的。以你键盘上实际印刷的图标为准。</p>' +
      '</section>' +

      '<section class="section">' +
        '<div class="callout">' +
          '<b>核心原则</b>：先看键帽上的图案，再决定按不按 Fn。下面的图标用 emoji 近似示意，实际键盘上是单色线条图标，形状与位置以你的键盘为准。' +
        '</div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="section-head"><h2><span class="num">01</span>图标对照</h2><p>点分类筛选，或在右侧搜索</p></div>' +
        filters +
        '<div class="cs-search"><input id="iconQuery" class="decode-input" type="search" ' +
          'placeholder="搜索图标含义，例如 触摸板 / 静音 / 投屏 / 背光" autocomplete="off">' +
        '<span class="faint" id="iconCount"></span></div>' +
        '<div class="icon-grid" id="iconGrid">' + cards + '</div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="section-head"><h2><span class="num">02</span>Fn 锁：决定 F 键的第一身份</h2><p>' + esc(KB.fnLock.summary) + '</p></div>' +
        '<div class="card fnlock">' +
          '<div class="fn-states">' + states + '</div>' +
          '<div class="flow" style="margin-top:14px">' + steps + '</div>' +
          '<p class="faint" style="margin:12px 0 0;font-size:12.5px">' + esc(KB.fnLock.note) + '</p>' +
        '</div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="section-head"><h2><span class="num">03</span>Windows 原生 F 键</h2><p>不带图标的 F 键，Windows 通用</p></div>' +
        '<div class="table-wrap"><table class="tbl">' +
          '<thead><tr><th>按键</th><th>功能</th><th>说明</th></tr></thead>' +
          '<tbody>' + nativeRows + '</tbody>' +
        '</table></div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="section-head"><h2><span class="num">04</span>找不到对应功能怎么办</h2><p>按顺序排查，不要盲按</p></div>' +
        '<div class="callout">' +
          '触摸板被误触关闭时：<b>先按 Fn + F8</b>（你的机型），若无效再试 Fn + F6 / Fn + F9；' +
          '仍然无效就按 <b>Fn + Esc</b> 切换 Fn 锁后再按一次 F8。' +
        '</div>' +
      '</section>';
  }
  /* ---------------- 视图③：全量速查 ---------------- */
  function renderCheatsheet() {
    const filters = '<div class="filters" id="csFilters">' +
      '<button class="filter-btn active" type="button" data-filter="all">全部 · ' + ALL_SHORTCUTS.length + '</button>' +
      SECTIONS.map(function (s) {
        return '<button class="filter-btn" type="button" data-filter="' + s.id + '">' +
          esc(s.num) + ' ' + esc(s.short) + ' · ' + s.shortcuts.length + '</button>';
      }).join('') +
      '</div>';

    const rows = ALL_SHORTCUTS.map(function (x) {
      return '<tr data-section="' + x.sec.id + '">' +
        '<td><button class="cs-keybtn" type="button" data-copy="' + esc(x.c.keys) + '" ' +
          'title="点击复制 ' + esc(x.c.keys) + '">' + keysHtml(x.c.keys) + '</button></td>' +
        '<td class="use">' + esc(x.c.action) + '</td>' +
        '<td class="scene">' + esc(x.c.note) + '</td>' +
        '<td><span class="pill day" style="--day:' + x.sec.accent + '">' + esc(x.sec.short) + '</span></td>' +
      '</tr>';
    }).join('');

    return '' +
      '<section class="hero compact">' +
        '<span class="hero-eyebrow">📋 CHEAT SHEET</span>' +
        '<h1>全量速查 · <span class="grad">' + ALL_SHORTCUTS.length + ' 条</span>快捷键</h1>' +
        '<p class="hero-lead">' + STATS.sections + ' 类内容去重汇总。点击快捷键即可复制，也可按分类或关键词筛选。</p>' +
      '</section>' +
      '<section class="section">' +
        '<div class="section-head"><h2><span class="num">01</span>筛选</h2><p>分类 + 关键词双重过滤</p></div>' +
        filters +
        '<div class="cs-search"><input id="csQuery" class="decode-input" type="search" ' +
          'placeholder="在快捷键、作用、说明中过滤，例如 截图 / 锁屏 / 标签页 / 投屏" autocomplete="off">' +
        '<span class="faint" id="csCount"></span></div>' +
        '<div class="table-wrap"><table class="tbl cs-table" id="csTable">' +
          '<thead><tr><th>快捷键</th><th>作用</th><th>说明 / 场景</th><th>分类</th></tr></thead>' +
          '<tbody>' + rows + '</tbody></table></div>' +
        '<div class="callout" style="margin-top:14px">' +
          '表格里的组合键都取自 <b>Windows 10 / 11 通用行为</b>；个别软件（如 IDE、游戏）可能占用同名快捷键，以软件内设置为准。' +
        '</div>' +
      '</section>';
  }

  /* ---------------- 视图④：单个分类 ---------------- */
  function renderSection(sec) {
    const cards = sec.shortcuts.map(function (c) {
      return '<div class="sc-card" style="' + secStyle(sec) + '">' +
        '<div class="sc-top">' + keysHtml(c.keys) +
          '<button class="copy-btn" type="button" data-copy="' + esc(c.keys) + '" ' +
            'title="复制 ' + esc(c.keys) + '" aria-label="复制 ' + esc(c.keys) + '">⧉</button>' +
        '</div>' +
        '<div class="sc-action">' + esc(c.action) + '</div>' +
        '<div class="sc-note">' + esc(c.note) + '</div>' +
        (c.tag ? '<div class="sc-tags"><span class="pill day">' + esc(c.tag) + '</span></div>' : '') +
      '</div>';
    }).join('');

    const tips = sec.tips.map(function (t) {
      return '<div class="tip">' + fmt(t) + '</div>';
    }).join('');

    const idx = SECTIONS.indexOf(sec);
    const prev = SECTIONS[idx - 1];
    const next = SECTIONS[idx + 1];
    const pager = '<div class="hero-actions" style="margin-top:14px">' +
      (prev ? '<a class="btn" href="#/' + prev.id + '">← ' + esc(prev.num) + ' ' + esc(prev.short) + '</a>' : '<a class="btn" href="#/overview">← 返回总览</a>') +
      (next
        ? '<a class="btn primary" href="#/' + next.id + '">' + esc(next.num) + ' ' + esc(next.short) + ' →</a>'
        : '<a class="btn primary" href="#/mustknow">⭐ 去看必背清单 →</a>') +
      '</div>';

    return '' +
      '<section class="day-hero" style="' + secStyle(sec) + '">' +
        '<span class="day-badge">' + esc(sec.icon) + ' ' + esc(sec.num) + ' · ' + esc(sec.tagline) + '</span>' +
        '<h1>' + esc(sec.title) + '</h1>' +
        '<p class="lead">' + esc(sec.summary) + '</p>' +
        '<ul class="day-goals">' + sec.goals.map(function (g) { return '<li>' + fmt(g) + '</li>'; }).join('') + '</ul>' +
        '<div class="day-hero-foot">' +
          '<span class="pill">' + sec.shortcuts.length + ' 条快捷键</span>' +
          '<span class="pill">' + sec.tips.length + ' 条提醒</span>' +
          '<a class="btn sm ghost" href="#/cheatsheet">全量速查 →</a>' +
        '</div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="section-head"><h2><span class="num">01</span>快捷键卡片</h2><p>点击右上角 ⧉ 复制组合键</p></div>' +
        '<div class="grid grid-auto">' + cards + '</div>' +
      '</section>' +

      (tips ? '<section class="section">' +
        '<div class="section-head"><h2><span class="num">02</span>易错提醒</h2><p>都是实际使用中最容易踩的坑</p></div>' +
        '<div class="tips">' + tips + '</div>' +
      '</section>' : '') +

      '<section class="section">' +
        '<div class="card" style="padding:20px 22px;border-left:3px solid ' + sec.accent + '">' +
          '<div class="faint" style="font-size:11.5px;letter-spacing:1.4px">继续</div>' +
          '<p style="margin:6px 0 0;font-size:13.5px">记不住全部没关系：先把这一类的 3 条最常用练成肌肉记忆，再回来看剩下的。</p>' +
          pager +
        '</div>' +
      '</section>';
  }
  /* ---------------- 视图⑤：场景实战 ---------------- */
  function renderScenes() {
    const cards = SCENES.map(function (sc) {
      const steps = sc.steps.map(function (st, i) {
        return '<li class="scene-step">' +
          '<span class="step-no">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<span class="step-body">' + keysHtml(st.keys) +
            '<span class="step-action">' + esc(st.action) + '</span></span>' +
        '</li>';
      }).join('');
      return '<div class="scene-card">' +
        '<div class="scene-head"><span class="scene-ico">' + esc(sc.icon) + '</span>' +
          '<h3>' + esc(sc.title) + '</h3>' +
          '<span class="pill">' + sc.steps.length + ' 步</span></div>' +
        '<p class="scene-lead">' + esc(sc.lead) + '</p>' +
        '<ol class="scene-steps">' + steps + '</ol>' +
        (sc.tip ? '<div class="scene-tip">💡 ' + fmt(sc.tip) + '</div>' : '') +
      '</div>';
    }).join('');

    return '' +
      '<section class="hero compact">' +
        '<span class="hero-eyebrow">🧩 TASK CHAINS · ' + SCENES.length + ' SCENES</span>' +
        '<h1>场景实战：把快捷键<span class="grad">串成一条链</span></h1>' +
        '<p class="hero-lead">单条快捷键记不住，就按任务记：写文档、查资料、整理文件、开会投屏，每一列都是一条可以直接照做的操作链。</p>' +
      '</section>' +
      '<section class="section">' +
        '<div class="section-head"><h2><span class="num">01</span>任务链</h2><p>从第一步开始照着按，顺序本身就是记忆</p></div>' +
        '<div class="grid grid-2">' + cards + '</div>' +
      '</section>';
  }

  /* ---------------- 视图⑥：必背 10 条 ---------------- */
  function renderMustKnow() {
    const items = MUST_KNOW.map(function (x, i) {
      return '<div class="must-card">' +
        '<span class="must-rank">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<div class="must-body">' +
          '<div class="must-top">' + keysHtml(x.keys) +
            '<button class="copy-btn" type="button" data-copy="' + esc(x.keys) + '" ' +
              'title="复制 ' + esc(x.keys) + '" aria-label="复制 ' + esc(x.keys) + '">⧉</button>' +
          '</div>' +
          '<div class="must-action">' + esc(x.action) + '</div>' +
          '<div class="must-why">' + fmt(x.why) + '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    return '' +
      '<section class="hero compact">' +
        '<span class="hero-eyebrow">⭐ MUST KNOW · ' + MUST_KNOW.length + ' SHORTCUTS</span>' +
        '<h1>记不住全部？先背这 <span class="grad">' + MUST_KNOW.length + ' 条</span></h1>' +
        '<p class="hero-lead">日常使用 80% 的场景都在这 10 条里。背完直接去自测，能认出 8 条以上就够用。</p>' +
        '<div class="hero-actions">' +
          '<a class="btn primary" href="#/drill">🎯 开始自测</a>' +
          '<a class="btn" href="#/cheatsheet">📋 去看全量</a>' +
        '</div>' +
      '</section>' +
      '<section class="section">' +
        '<div class="section-head"><h2><span class="num">01</span>必背清单</h2><p>按「常用程度」排序，不是按字母</p></div>' +
        '<div class="must-list">' + items + '</div>' +
        '<div class="callout" style="margin-top:14px">' +
          '背法：每天只用其中 2 条，用到不用想再换下 2 条。<b>不要一次背 10 条</b>，手指记比脑子记牢。' +
        '</div>' +
      '</section>';
  }
  /* ---------------- 视图⑦：自测 ---------------- */
  const QUIZ = { order: [], idx: 0, score: 0, done: false, answered: false, options: [], correct: -1, chosen: -1, lastRight: false };

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function buildQuestion() {
    const item = ALL_SHORTCUTS[QUIZ.order[QUIZ.idx]];
    const pool = ALL_SHORTCUTS.filter(function (x) { return x.c.keys !== item.c.keys; });
    const opts = shuffle([item].concat(shuffle(pool).slice(0, 3)));
    QUIZ.options = opts;
    QUIZ.correct = opts.indexOf(item);
    QUIZ.answered = false;
    QUIZ.chosen = -1;
    QUIZ.lastRight = false;
  }

  function quizStart() {
    QUIZ.order = shuffle(ALL_SHORTCUTS.map(function (_, i) { return i; }));
    QUIZ.idx = 0;
    QUIZ.score = 0;
    QUIZ.done = false;
    buildQuestion();
  }

  function quizAnswer(i) {
    if (QUIZ.done || QUIZ.answered || !QUIZ.options.length) { return; }
    QUIZ.answered = true;
    QUIZ.chosen = i;
    QUIZ.lastRight = i === QUIZ.correct;
    if (QUIZ.lastRight) { QUIZ.score++; }
    render();
  }

  function quizNext() {
    if (QUIZ.done) { return; }
    if (!QUIZ.answered) { toast('先选一个答案'); return; }
    if (QUIZ.idx >= QUIZ.order.length - 1) {
      QUIZ.done = true;
      render();
      return;
    }
    QUIZ.idx++;
    buildQuestion();
    render();
  }

  function renderDrill() {
    if (!QUIZ.order.length) { quizStart(); }

    if (QUIZ.done) {
      const total = QUIZ.order.length;
      const pct = Math.round((QUIZ.score / total) * 100);
      const comment = pct >= 90 ? '已经形成肌肉记忆，日常够用了。'
        : pct >= 70 ? '基础不错，回去补一下错得多的分类即可。'
        : '别急着重刷：先回必背 10 条，把最常用的 5 条练熟。';
      return '' +
        '<section class="hero compact">' +
          '<span class="hero-eyebrow">🏁 RESULT</span>' +
          '<h1>自测完成：<span class="grad">' + QUIZ.score + ' / ' + total + '</span> 题</h1>' +
          '<p class="hero-lead">正确率 ' + pct + '% · ' + esc(comment) + '</p>' +
        '</section>' +
        '<section class="section">' +
          '<div class="card quiz-result">' +
            '<div class="quiz-score">' + pct + '<span>%</span></div>' +
            '<div class="hero-actions" style="justify-content:center">' +
              '<button class="btn primary" type="button" id="quizReset">↻ 再测一次</button>' +
              '<a class="btn" href="#/mustknow">⭐ 回看必背</a>' +
              '<a class="btn ghost" href="#/cheatsheet">📋 全量速查</a>' +
            '</div>' +
          '</div>' +
        '</section>';
    }

    const item = QUIZ.options[QUIZ.correct];
    const opts = QUIZ.options.map(function (o, i) {
      let cls = 'quiz-opt';
      if (QUIZ.answered) {
        if (i === QUIZ.correct) { cls += ' correct'; }
        else if (i === QUIZ.chosen) { cls += ' wrong'; }
        else { cls += ' dim'; }
      }
      return '<button class="' + cls + '" type="button" data-quiz-opt="' + i + '">' +
        '<span class="opt-no">' + String.fromCharCode(65 + i) + '</span>' +
        keysHtml(o.c.keys) +
      '</button>';
    }).join('');

    const feedback = QUIZ.answered
      ? '<div class="quiz-feedback ' + (QUIZ.lastRight ? 'ok' : 'bad') + '">' +
          (QUIZ.lastRight ? '✅ 答对了 · ' : '❌ 记错了 · ') +
          '正确答案：' + keysHtml(item.c.keys) + ' · ' + esc(item.c.action) +
          (item.c.note ? '<div class="faint">' + esc(item.c.note) + '</div>' : '') +
        '</div>'
      : '<div class="quiz-feedback">按 1–4 选择 · Enter 进入下一题</div>';

    return '' +
      '<section class="hero compact">' +
        '<span class="hero-eyebrow">🎯 DRILL · ' + QUIZ.order.length + ' QUESTIONS</span>' +
        '<h1>自测：<span class="grad">看作用，选快捷键</span></h1>' +
        '<p class="hero-lead">从 ' + ALL_SHORTCUTS.length + ' 条快捷键里随机出题，答错会给出正确组合键与使用说明。</p>' +
      '</section>' +
      '<section class="section">' +
        '<div class="card quiz-card">' +
          '<div class="quiz-top">' +
            '<span>第 <b>' + (QUIZ.idx + 1) + '</b> / ' + QUIZ.order.length + ' 题</span>' +
            '<span>得分 <b>' + QUIZ.score + '</b></span>' +
          '</div>' +
          '<div class="quiz-q">执行「<b>' + esc(item.c.action) + '</b>」的快捷键是？</div>' +
          '<div class="quiz-meta"><span class="pill day" style="--day:' + item.sec.accent + '">' +
            esc(item.sec.num) + ' ' + esc(item.sec.short) + '</span></div>' +
          '<div class="quiz-opts">' + opts + '</div>' +
          feedback +
          '<div class="hero-actions" style="margin:16px 0 0">' +
            '<button class="btn primary" type="button" id="quizNext">' +
              (QUIZ.idx >= QUIZ.order.length - 1 ? '查看结果 →' : '下一题 →') + '</button>' +
            '<button class="btn ghost" type="button" id="quizReset">↻ 重新开始</button>' +
          '</div>' +
        '</div>' +
      '</section>';
  }
  /* ---------------- 全局搜索 ---------------- */
  function hit(text, term) { return String(text || '').toLowerCase().indexOf(term) >= 0; }

  function resultGroup(title, count, items) {
    if (!items.length) { return ''; }
    return '<div class="result-group"><h3>' + title +
      ' <span class="count">' + count + '</span></h3>' + items.join('') + '</div>';
  }

  function renderSearch(q) {
    const term = q.toLowerCase();
    const scHits = ALL_SHORTCUTS.filter(function (x) {
      return hit(x.c.keys, term) || hit(x.c.action, term) || hit(x.c.note, term) ||
        hit(x.c.tag, term) || hit(x.sec.short, term) || hit(x.sec.title, term);
    });
    const iconHits = FN_ICONS.filter(function (x) {
      return hit(x.name, term) || hit(x.effect, term) || hit(x.note, term) || hit(x.tag, term);
    });
    const nativeHits = NATIVE_F.filter(function (x) {
      return hit(x.key, term) || hit(x.action, term) || hit(x.note, term);
    });
    const mustHits = MUST_KNOW.filter(function (x) {
      return hit(x.keys, term) || hit(x.action, term) || hit(x.why, term);
    });
    const sceneHits = SCENES.filter(function (sc) {
      if (hit(sc.title, term) || hit(sc.lead, term) || hit(sc.tip, term)) { return true; }
      return sc.steps.some(function (st) { return hit(st.keys, term) || hit(st.action, term); });
    });

    const total = scHits.length + iconHits.length + nativeHits.length + mustHits.length + sceneHits.length;
    const head = '<section class="hero compact">' +
      '<span class="hero-eyebrow">🔍 SEARCH</span>' +
      '<h1>“' + esc(q) + '” 找到 <span class="grad">' + total + '</span> 条结果</h1>' +
      '<p class="hero-lead">搜索范围：快捷键 / 作用 / 说明 / F 键图标 / 场景任务 / 必背清单。清空搜索框即可返回原页面。</p>' +
      '</section>';

    if (!total) {
      return head + '<div class="empty" style="margin-top:22px">没有匹配内容。试试「截图」「触摸板」「锁屏」「标签页」「Win +」。</div>';
    }

    const secPill = function (s) {
      return '<span class="pill day" style="--day:' + s.accent + '">' + esc(s.short) + '</span>';
    };

    const scItems = scHits.map(function (x) {
      return '<a class="result-item" href="#/' + x.sec.id + '">' +
        '<div class="r-head">' + keysHtml(x.c.keys) + secPill(x.sec) +
          '<span class="r-sub">' + esc(x.c.action) + '</span></div>' +
        '<div class="r-sub">' + esc(x.c.note) + '</div>' +
      '</a>';
    });
    const iconItems = iconHits.map(function (x) {
      return '<a class="result-item" href="#/icons">' +
        '<div class="r-head"><strong>' + esc(x.icon) + ' ' + esc(x.name) + '</strong>' +
          '<span class="pill">' + esc(x.tag) + '</span></div>' +
        '<div class="r-sub">' + esc(x.effect) + ' · ' + esc(x.note) + '</div>' +
      '</a>';
    });
    const nativeItems = nativeHits.map(function (x) {
      return '<a class="result-item" href="#/icons">' +
        '<div class="r-head"><strong class="mono">' + esc(x.key) + '</strong>' +
          '<span class="r-sub">' + esc(x.action) + '</span></div>' +
        '<div class="r-sub">' + esc(x.note) + '</div>' +
      '</a>';
    });
    const mustItems = mustHits.map(function (x) {
      return '<a class="result-item" href="#/mustknow">' +
        '<div class="r-head"><strong>⭐ 必背</strong>' + keysHtml(x.keys) + '</div>' +
        '<div class="r-sub">' + esc(x.action) + ' · ' + esc(x.why) + '</div>' +
      '</a>';
    });
    const sceneItems = sceneHits.map(function (sc) {
      return '<a class="result-item" href="#/scenes">' +
        '<div class="r-head"><strong>' + esc(sc.icon) + ' ' + esc(sc.title) + '</strong>' +
          '<span class="pill">' + sc.steps.length + ' 步</span></div>' +
        '<div class="r-sub">' + esc(sc.lead) + '</div>' +
      '</a>';
    });

    return head +
      '<section class="section">' +
        resultGroup('⌨️ 快捷键', scHits.length, scItems) +
        resultGroup('🔣 F 键图标', iconHits.length, iconItems) +
        resultGroup('🅵 原生 F 键', nativeHits.length, nativeItems) +
        resultGroup('🧩 场景任务', sceneHits.length, sceneItems) +
        resultGroup('⭐ 必背清单', mustHits.length, mustItems) +
      '</section>';
  }

  /* ---------------- 筛选 / 绑定 ---------------- */
  function bindAfterRender() {
    filterCheatsheet();
    filterIcons();
  }

  function filterCheatsheet() {
    const table = $('#csTable');
    if (!table) { return; }
    const btn = $('#csFilters .filter-btn.active');
    const sec = btn ? btn.getAttribute('data-filter') : 'all';
    const qInput = $('#csQuery');
    const term = qInput ? qInput.value.trim().toLowerCase() : '';
    let shown = 0;
    Array.prototype.forEach.call(table.tBodies[0].rows, function (tr) {
      const okSec = sec === 'all' || tr.getAttribute('data-section') === sec;
      const okTerm = !term || tr.textContent.toLowerCase().indexOf(term) >= 0;
      const ok = okSec && okTerm;
      tr.style.display = ok ? '' : 'none';
      if (ok) { shown++; }
    });
    const countEl = $('#csCount');
    if (countEl) { countEl.textContent = '显示 ' + shown + ' / ' + ALL_SHORTCUTS.length + ' 条'; }
  }

  function filterIcons() {
    const grid = $('#iconGrid');
    if (!grid) { return; }
    const btn = $('#iconFilters .filter-btn.active');
    const tag = btn ? btn.getAttribute('data-icon-filter') : 'all';
    const qInput = $('#iconQuery');
    const term = qInput ? qInput.value.trim().toLowerCase() : '';
    let shown = 0;
    $$('.icon-card', grid).forEach(function (card) {
      const okTag = tag === 'all' || card.getAttribute('data-icon-tag') === tag;
      const okTerm = !term || String(card.getAttribute('data-icon-text') || '').toLowerCase().indexOf(term) >= 0;
      const ok = okTag && okTerm;
      card.style.display = ok ? '' : 'none';
      if (ok) { shown++; }
    });
    const countEl = $('#iconCount');
    if (countEl) { countEl.textContent = '显示 ' + shown + ' / ' + FN_ICONS.length + ' 个'; }
  }
  /* ---------------- 事件绑定 ---------------- */
  function applyTheme(theme) {
    const t = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
    const btn = $('#themeToggle');
    if (btn) {
      btn.textContent = t === 'light' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', t === 'light' ? '切换到深色主题' : '切换到浅色主题');
      btn.setAttribute('title', t === 'light' ? '切换到深色主题' : '切换到浅色主题');
    }
  }

  function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = cur === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('win-kb-theme', next); } catch (e) { /* 隐私模式忽略 */ }
    applyTheme(next);
  }

  applyTheme((function () {
    try {
      const saved = localStorage.getItem('win-kb-theme');
      if (saved) { return saved; }
    } catch (e) { /* 忽略 */ }
    return 'dark';
  })());

  document.addEventListener('click', function (e) {
    const t = e.target;

    const copyBtn = t.closest && t.closest('[data-copy]');
    if (copyBtn) {
      e.preventDefault();
      copyText(copyBtn.getAttribute('data-copy'));
      return;
    }

    const fbtn = t.closest && t.closest('#csFilters .filter-btn');
    if (fbtn) {
      $$('#csFilters .filter-btn').forEach(function (b) { b.classList.remove('active'); });
      fbtn.classList.add('active');
      filterCheatsheet();
      return;
    }

    const ibtn = t.closest && t.closest('#iconFilters .filter-btn');
    if (ibtn) {
      $$('#iconFilters .filter-btn').forEach(function (b) { b.classList.remove('active'); });
      ibtn.classList.add('active');
      filterIcons();
      return;
    }

    const opt = t.closest && t.closest('[data-quiz-opt]');
    if (opt) {
      quizAnswer(Number(opt.getAttribute('data-quiz-opt')));
      return;
    }

    if (t.closest && t.closest('#quizNext')) { quizNext(); return; }
    if (t.closest && t.closest('#quizReset')) { quizStart(); render(); return; }

    if (t.closest && t.closest('#menuBtn')) {
      document.body.classList.toggle('nav-open');
      return;
    }
    if (t.closest && t.closest('#themeToggle')) { toggleTheme(); return; }
    if (t.closest && t.closest('#printBtn')) { window.print(); return; }

    if (t.closest && t.closest('a[href^="#/"]')) {
      document.body.classList.remove('nav-open');
    }
  });

  document.addEventListener('keydown', function (e) {
    const tag = (e.target.tagName || '').toLowerCase();
    const typing = tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable;

    if (e.key === '/' && !typing) {
      e.preventDefault();
      searchEl.focus();
      searchEl.select();
      return;
    }

    if (e.key === 'Escape') {
      if (searchEl.value) {
        searchEl.value = '';
        render();
      } else {
        document.body.classList.remove('nav-open');
      }
      return;
    }

    if (typing || searchEl.value) { return; }

    if (currentRoute() === 'drill' && !QUIZ.done) {
      if (/^[1-4]$/.test(e.key)) {
        const i = Number(e.key) - 1;
        if (i < QUIZ.options.length) { quizAnswer(i); }
        return;
      }
      if (e.key === 'Enter') { e.preventDefault(); quizNext(); }
    }
  });

  let searchTimer = null;
  searchEl.addEventListener('input', function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () { render(); }, 140);
  });

  window.addEventListener('hashchange', function () {
    if (searchEl.value) { searchEl.value = ''; }
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* 初始化 */
  if (!SECTIONS.length) {
    viewEl.innerHTML = '<div class="empty" style="margin-top:30px">没有加载到分类数据。请确认 <code>assets/data.js</code> 已在本页面之前引入。</div>';
  } else {
    render();
  }
})();

