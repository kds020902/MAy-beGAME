/*
 * 오푸스덜스 — 화면 / 입력 처리
 * 규칙은 engine.js(window.FFD), 데이터는 data.js(window.FFD_DATA)에 있다.
 * 이미지는 assets/manifest.js(window.FFD_ASSETS)에 등록된 것만 쓰고, 없으면 아이콘으로 대신한다.
 */
(function () {
  'use strict';
  const D = window.FFD_DATA;
  const G = window.FFD;
  const ASSETS = window.FFD_ASSETS || {};
  const rng = Math.random;

  const $app = document.getElementById('app');
  const $modal = document.getElementById('modal-root');
  const $toast = document.getElementById('toast');

  const store = {
    get(k, d) {
      try { const v = localStorage.getItem('ffd:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; }
    },
    set(k, v) {
      try { localStorage.setItem('ffd:' + k, JSON.stringify(v)); } catch (e) { /* 저장 불가 환경 */ }
    },
  };

  const S = {
    screen: 'title',
    run: null,
    battle: null,
    busy: false,
    speed: store.get('speed', 1),
    targetRow: null,
    confirmEmpty: false,
    classId: null,
    light: [],
    rewards: null,
    shop: null,
    pendingBoss: false,
    regions: null,
    logs: [],
    logOpen: false,
    animateDraw: false,
    autoBattle: false,
    event: null,
    eventResult: null,
    rewardKind: 'battle',
    pick: null, // 카드 선택 모달 진행 중인 { opt, done }
  };

  const sleep = ms => new Promise(r => setTimeout(r, ms / S.speed));
  const SFX = window.SFX || { play() {}, setMuted() {}, unlock() {}, muted: false };
  SFX.setMuted(store.get('muted', false));
  const sfx = name => SFX.play(name);

  // ───────── 진행 저장 ─────────
  // 지도·상점·지역 선택 화면에서 저장한다. 전투 중에 나가면 그 칸에 들어가기 전으로 돌아온다.
  function saveRun(screen) {
    if (!S.run) return;
    store.set('run', { screen, json: G.serializeRun(S.run) });
  }
  const clearSave = () => store.set('run', null);
  const hasSave = () => !!store.get('run', null);
  // 해금·승천 기록
  S.meta = Object.assign(G.freshMeta(), store.get('meta', {}));
  const saveMeta = () => store.set('meta', S.meta);
  const unlocked = () => G.unlockedIds(S.meta);
  const isUnlocked = (kind, target) => G.isUnlocked(unlocked(), kind, target);
  S.asc = 0;
  const KIND_NAME = { normal: '일반', midboss: '중간 보스', boss: '보스' };
  const KIND_ICON = { normal: '⚔', midboss: '☠', boss: '♛' };

  // ───────── 공용 조각 ─────────
  function toast(msg) {
    $toast.textContent = msg;
    $toast.classList.add('show');
    clearTimeout(toast.t);
    toast.t = setTimeout(() => $toast.classList.remove('show'), 1800);
  }

  // 그림: 등록된 이미지가 있으면 이미지, 없으면 아이콘
  function art(kind, id, fallback, cls) {
    const src = ASSETS[`${kind}/${id}`];
    return `<span class="art ${cls || ''}">${src ? `<img src="${src}" alt="">` : `<span class="art-fb">${fallback}</span>`}</span>`;
  }

  function resTag(mul, always) {
    if (mul == null || (!always && mul === 1)) return '';
    const cls = mul >= 2 ? 'r2' : mul >= 1.5 ? 'r15' : mul >= 1 ? 'r1' : 'r05';
    return `<span class="res ${cls}">${D.RES_NAME[mul] || ''} ×${mul}</span>`;
  }

  function dieHtml(d, i, vs) {
    const info = D.DICE[d.t];
    const res = vs && info.atk ? vs.res[D.TYPE_OF[d.t]] : 1;
    const mark = res > 1 ? ' good' : res < 1 ? ' bad' : '';
    return `<span class="die d-${d.t}${mark}" data-i="${i}" title="${info.name} ${d.min}~${d.max}${res !== 1 ? ` (${D.RES_NAME[res]} ×${res})` : ''}"><i>${info.icon}</i><b>${d.min}~${d.max}</b></span>`;
  }
  const diceHtml = (dice, vs) => dice.map((d, i) => dieHtml(d, i, vs)).join('');

  // 카드 종류: 공격 주사위만 → 공격, 방어·회피만 → 방어, 섞여 있으면 공격 · 방어
  function cardKind(dice) {
    const atk = dice.some(d => d.atk);
    const def = dice.some(d => !d.atk);
    return atk && !def ? ['atk', '공격'] : !atk ? ['def', '방어'] : ['mix', '공격 · 방어'];
  }

  // 슬더스식 세로 카드: 코스트 구슬 / 이름 띠 / 그림 칸(주사위) / 종류 / 설명
  function cardHtml(c, owner, o) {
    o = o || {};
    const s = G.cardStats(c);
    const def = G.cardDef(c);
    const dice = owner ? G.effective(owner, c).dice : s.dice.map(d => Object.assign({ atk: D.DICE[d.t].atk }, d));
    const [kcls, kname] = cardKind(dice);
    const fx = G.fxText(s.fx);
    const frame = s.sig ? 'sig' : D.CLASS_MAP[def.owner] ? def.owner : 'enemy';
    const attrs = [
      o.act ? `data-act="${o.act}" data-uid="${c.uid}"` : '',
      o.style ? `style="${o.style}"` : '',
    ].join(' ');
    return `<div class="card f-${frame} k-${kcls} r-${s.rarity} ${o.cls || ''}" ${attrs}>
      <div class="c-cost">${s.sig ? '★' : s.cost}</div>
      <div class="c-name">${s.name}${s.upgraded ? '<span class="plus">+</span>' : ''}</div>
      <div class="c-art"><div class="card-dice">${diceHtml(dice, o.vs)}</div></div>
      <div class="c-type">${kname}</div>
      <div class="c-desc">${fx || `주사위 ${dice.length}개`}</div>
    </div>`;
  }

  function chipHtml(c, owner, target) {
    const s = G.cardStats(c);
    const dice = G.effective(owner, c).dice;
    const fx = G.fxText(s.fx);
    return `<div class="chip ${s.rarity}">
      <div class="chip-name">${s.sig ? '★ ' : ''}${s.name} <small>${s.sig ? '고유' : `코스트 ${s.cost}`}</small></div>
      <div class="dice-row">${diceHtml(dice, target)}</div>
      ${fx ? `<div class="chip-fx">${fx}</div>` : ''}
    </div>`;
  }

  function statusHtml(c) {
    const out = [];
    const tag = (k, val, next) => {
      const info = D.STATUS_INFO[k];
      return `<span class="st${next ? ' next' : ''}" title="${info.name}: ${info.desc}">${info.icon} ${info.name} ${val}${next ? ' (다음 턴)' : ''}</span>`;
    };
    if (c.status.bleed) out.push(tag('bleed', c.status.bleed));
    if (c.status.hemo) out.push(tag('hemo', c.status.hemo));
    if (c.status.burn) out.push(tag('burn', c.status.burn));
    if (c.status.rupture) out.push(tag('rupture', c.status.rupture));
    if (c.status.element) {
      const el = D.ELEMENTS[c.status.element.type];
      out.push(`<span class="st el-${c.status.element.type}" title="${el.name} 속성 ${c.status.element.n}단계: 같은 속성으로 적중하면 ${el.desc}">${el.icon} ${el.name} ${c.status.element.n}</span>`);
    }
    ['might', 'weak', 'endure', 'protect', 'fragile'].forEach(k => {
      if (c.status[k]) out.push(tag(k, c.status[k]));
      if (c.status[k + 'Next']) out.push(tag(k, c.status[k + 'Next'], true));
    });
    return out.join('');
  }

  function hpBar(c, side) {
    const pct = Math.max(0, c.hp) / c.maxHp * 100;
    return `<div class="hpbar" id="hp-${side}" title="체력 ${Math.max(0, c.hp)} / ${c.maxHp}"><div class="fill${pct <= 30 ? ' low' : ''}" style="width:${pct}%"></div><span>${Math.max(0, c.hp)}</span></div>`;
  }

  function resRow(c) {
    return `<div class="res-row">${D.ATK_TYPES.map(t => `<span>${D.TYPES[t].icon} ${D.TYPES[t].name} ${resTag(c.res[t], true)}</span>`).join('')}</div>`;
  }

  const goldHtml = () => `<span class="gold-tag" title="은화">🪙 ${S.run ? S.run.gold : 0}</span>`;

  // 전투 자세 스프라이트 (assets/sprites/<id>/<idle|attack|defend|hit>.png)
  const sprite = (id, pose) => ASSETS[`sprites/${id}/${pose}`];
  // 전투 무대의 인물: 스프라이트 > 초상화 > 아이콘 순서로 쓴다
  function figureHtml(kind, id, icon) {
    const idle = sprite(id, 'idle');
    if (idle) return `<img class="fig-img sprite" data-sprite="${id}" src="${idle}" alt="">`;
    const src = ASSETS[`${kind}/${id}`];
    if (src) return `<img class="fig-img portrait-img" src="${src}" alt="">`;
    return `<span class="fig-emoji">${icon}</span>`;
  }
  function preloadSprites(id) {
    ['idle', 'attack', 'defend', 'hit'].forEach(pose => { const src = sprite(id, pose); if (src) new Image().src = src; });
  }
  const poseTimers = {};
  // hold 가 참이면 자동으로 대기 자세로 돌아가지 않는다
  function setPose(side, pose, hold) {
    const img = document.querySelector(`#u-${side} .fig-img.sprite`);
    if (!img) return;
    const id = img.dataset.sprite;
    img.src = sprite(id, pose) || sprite(id, 'idle');
    clearTimeout(poseTimers[side]);
    if (pose !== 'idle' && !hold) poseTimers[side] = setTimeout(() => { img.src = sprite(id, 'idle'); }, 650 / S.speed);
  }

  // ───────── 무대 움직임 ─────────
  // 플레이어는 오른쪽(+), 적은 왼쪽(-)으로 나아간다
  const stagePos = { p: 0, e: 0 };
  const DIR = { p: 1, e: -1 };
  const moverEl = side => document.querySelector(`#u-${side} .fig-mover`);
  function move(side, x, ms, easing) {
    const el = moverEl(side);
    const from = stagePos[side];
    stagePos[side] = x;
    if (!el) return Promise.resolve();
    const a = el.animate([{ transform: `translateX(${from}px)` }, { transform: `translateX(${x}px)` }],
      { duration: Math.max(1, ms / S.speed), easing: easing || 'ease-out', fill: 'forwards' });
    return a.finished.catch(() => {});
  }
  // 두 캐릭터가 가운데에서 부딪히려면 각자 얼마나 나아가야 하는지
  function meetDistance() {
    const p = moverEl('p');
    const e = moverEl('e');
    if (!p || !e) return 100;
    const a = p.getBoundingClientRect();
    const b = e.getBoundingClientRect();
    const between = (b.left - stagePos.e) - (a.right - stagePos.p);
    return Math.max(20, between / 2 + (a.width + b.width) * 0.14);
  }
  function figImg(side) { return document.querySelector(`#u-${side} .fig-img`); }
  function flashHurt(side) {
    const img = figImg(side);
    if (img) img.animate([{ filter: 'brightness(2.2) saturate(2) hue-rotate(-25deg)' }, { filter: 'none' }], { duration: 320 / S.speed });
  }
  function hop(side) {
    const img = figImg(side);
    if (img) img.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-28px)' }, { transform: 'translateY(0)' }], { duration: 320 / S.speed, easing: 'ease-out' });
  }
  function spark() {
    const st = document.querySelector('.stage');
    if (!st) return;
    const el = document.createElement('div');
    el.className = 'spark';
    st.appendChild(el);
    setTimeout(() => el.remove(), 500);
  }
  function popDie(side, t, value, state) {
    const fig = document.querySelector(`#u-${side} .figure`);
    if (!fig) return;
    const el = document.createElement('div');
    el.className = `die-pop d-${t} ${state}`;
    el.innerHTML = `<i>${D.DICE[t].icon}</i>${value}`;
    fig.appendChild(el);
    setTimeout(() => el.remove(), 900 / S.speed + 200);
  }

  // ───────── VFX (스킬 이펙트) ─────────
  // 그림에는 이펙트를 넣지 않고, 여기서 주사위 종류와 상태이상에 맞춰 그린다.
  function vfxAt(side, cls, from, vars) {
    const fig = document.querySelector(`#u-${side} .figure`);
    if (!fig) return null;
    const el = document.createElement('div');
    el.className = `vfx ${cls}${from ? ` from-${from}` : ''}`;
    if (vars) Object.keys(vars).forEach(k => el.style.setProperty(k, vars[k]));
    el.style.setProperty('--spd', S.speed);
    fig.appendChild(el);
    setTimeout(() => el.remove(), 900 / S.speed + 300);
    return el;
  }
  function screenFlash() {
    const st = document.querySelector('.stage');
    if (!st) return;
    const el = document.createElement('div');
    el.className = 'flash';
    st.appendChild(el);
    setTimeout(() => el.remove(), 260);
  }
  function stageShake(power) {
    const st = document.querySelector('.stage');
    if (!st) return;
    const d = power || 6;
    st.animate([{ transform: 'translate(0,0)' }, { transform: `translate(${-d}px, ${d / 2}px)` }, { transform: `translate(${d}px, ${-d / 2}px)` },
      { transform: `translate(${-d / 2}px, 0)` }, { transform: 'translate(0,0)' }], { duration: 280 / S.speed });
  }
  // 공격 주사위가 적중할 때: target 은 맞는 쪽
  function hitVfx(t, target) {
    const from = target === 'e' ? 'left' : 'right';
    if (t === 'S') { vfxAt(target, 'slash', from); vfxAt(target, 'slash late', from); }
    else if (t === 'P') { vfxAt(target, 'pierce', from); vfxAt(target, 'burst', from); }
    else if (t === 'B') { vfxAt(target, 'shock', from); vfxAt(target, 'shock late', from); stageShake(8); }
  }
  function guardVfx(side) { vfxAt(side, 'guard', side === 'p' ? 'left' : 'right'); }
  function evadeVfx(side) {
    const img = figImg(side);
    const fig = document.querySelector(`#u-${side} .figure`);
    if (!img || !fig) return;
    [0, 1].forEach(k => {
      const c = img.cloneNode();
      c.className = 'vfx afterimage';
      fig.appendChild(c);
      c.animate([{ opacity: 0.55 - k * 0.2, transform: 'translateX(-50%)' },
        { opacity: 0, transform: `translateX(calc(-50% + ${-DIR[side] * (40 + k * 30)}px))` }],
      { duration: 420 / S.speed, easing: 'ease-out', fill: 'forwards' });
      setTimeout(() => c.remove(), 450 / S.speed + 50);
    });
  }
  function particles(side, kind, n) {
    for (let i = 0; i < n; i++) {
      vfxAt(side, `pt ${kind}`, null, {
        '--dx': `${Math.round((Math.random() - 0.5) * 120)}px`,
        '--dy': `${Math.round(-30 - Math.random() * 80)}px`,
        '--x': `${Math.round(30 + Math.random() * 40)}%`,
        '--delay': `${Math.round(Math.random() * 140)}ms`,
      });
    }
  }

  // 한 줄(카드 한 쌍)의 합과 공격이 모두 끝날 때까지 두 캐릭터는 제자리로 돌아가지 않는다.
  let engaged = false;
  const MAX_BACK = 120; // 연타로 밀려도 무대 밖으로 나가지 않도록 뒤로 밀리는 한계(px)
  const backClamp = (side, x) => (side === 'p' ? Math.max(-MAX_BACK, x) : Math.min(MAX_BACK, x));
  // side 가 상대에게 붙으려면 가야 할 위치 (두 캐릭터가 맞닿는 간격은 meetDistance 의 두 배)
  const contactPos = (side, depth) => {
    const gap2 = meetDistance() * 2 * (depth || 1);
    return side === 'p' ? stagePos.e + gap2 : stagePos.p - gap2;
  };

  // 합: 주사위 종류에 맞는 자세로 부딪히고, 이긴 쪽이 진 쪽을 밀어낸다 (주사위 값 차이에 비례)
  async function clashMotion(pd, ed, ev) {
    if (!moverEl('p') || !moverEl('e')) { await sleep(600); return; }
    setPose('p', D.DICE[pd.t].atk ? 'attack' : 'defend', true);
    setPose('e', D.DICE[ed.t].atk ? 'attack' : 'defend', true);
    // 지금 서 있는 곳에서 두 사람의 중간 지점으로 달려가 맞붙는다
    const g = meetDistance();
    const mid = (stagePos.p + stagePos.e) / 2;
    const rush = 'cubic-bezier(.55, 0, 1, .55)';
    await Promise.all([move('p', mid + g, engaged ? 150 : 200, rush), move('e', mid - g, engaged ? 150 : 200, rush)]);
    engaged = true;
    spark();
    sfx('clash');
    const win = ev.result;
    popDie('p', pd.t, ev.pv, win === 'p' ? 'win' : win === 'e' ? 'lose' : 'even');
    popDie('e', ed.t, ev.ev, win === 'e' ? 'win' : win === 'p' ? 'lose' : 'even');
    if (win === 'tie') {
      await Promise.all([move('p', stagePos.p - 34, 180), move('e', stagePos.e + 34, 180)]);
    } else {
      const lose = other(win);
      const winDie = win === 'p' ? pd : ed;
      const push = Math.min(190, 26 + Math.abs(ev.pv - ev.ev) * 17);
      setPose(lose, 'hit', true);
      flashHurt(lose);
      if (winDie.t === 'E') { hop(win); evadeVfx(win); sfx('evade'); }
      else if (winDie.t === 'G') { guardVfx(win); sfx('guard'); }
      else { hitVfx(winDie.t, lose); sfx('hit'); }
      await Promise.all([
        move(lose, backClamp(lose, stagePos[lose] - DIR[lose] * push), 300, 'cubic-bezier(.15, .85, .3, 1)'),
        move(win, stagePos[win] + DIR[win] * 14, 300),
      ]);
    }
    await sleep(120);
  }

  // 공격: 상대가 서 있는 곳으로 붙어서 친다. 첫 주사위는 돌진, 이후는 밀려난 상대를 따라가며 연타.
  async function strikeMotion(side) {
    setPose(side, 'attack', true);
    if (!moverEl(side)) { await sleep(250); return; }
    const to = contactPos(side, 0.85);
    const dist = Math.abs(to - stagePos[side]);
    await move(side, to, Math.max(110, Math.min(200, dist * 0.8)), 'cubic-bezier(.55, 0, 1, .55)');
    engaged = true;
  }
  // 피격: 맞은 쪽이 피해만큼 밀려난다 (제자리로 돌아가지 않음)
  async function hitMotion(tgt, dmg, die) {
    if (die) hitVfx(die, tgt);
    sfx(dmg >= 15 ? 'heavy' : 'hit');
    if (dmg >= 15) screenFlash();
    setPose(tgt, 'hit', true);
    flashHurt(tgt);
    const push = Math.min(90, 10 + dmg * 3);
    await move(tgt, backClamp(tgt, stagePos[tgt] - DIR[tgt] * push), 220, 'cubic-bezier(.15, .85, .3, 1)');
  }
  // 한 줄의 주사위를 다 쓰면 둘 다 제자리로
  async function resetStage() {
    if (!engaged) return;
    engaged = false;
    await sleep(160);
    setPose('p', 'idle');
    setPose('e', 'idle');
    await Promise.all([move('p', 0, 320, 'ease-in-out'), move('e', 0, 320, 'ease-in-out')]);
  }

  function itemArt(it) { return art('items', it.id, it.icon, 'item-art'); }

  // ───────── 화면 전환 ─────────
  function go(screen) {
    S.screen = screen;
    render();
    window.scrollTo(0, 0);
  }

  function render() {
    const fn = {
      title: renderTitle, cls: renderClass, light: renderLight, battle: renderBattle,
      reward: renderReward, shop: renderShop, region: renderRegion, over: renderOver,
      map: renderMap, rest: renderRest, event: renderEvent, unlocks: renderUnlocks, victory: renderVictory, startRelic: renderStartRelic,
    }[S.screen];
    $app.innerHTML = fn();
    if (S.screen === 'battle') afterBattleRender();
    if (S.screen === 'map') saveRun('map');
  }

  // ───────── 타이틀 ─────────
  function renderTitle() {
    const best = store.get('best', null);
    return `<div class="screen title-screen">
      <div class="title-emblem">✦</div>
      <h1 class="logo">오푸스덜스</h1>
      <p class="tagline">운명의 주사위를 굴려라.<br>다섯 개의 저주받은 땅이 순례자를 기다린다.</p>
      <div class="title-actions">
        ${hasSave() ? '<button class="btn primary big" data-act="continue">이어하기</button>' : ''}
        <button class="btn ${hasSave() ? '' : 'primary '}big" data-act="new">새로운 순례</button>
        <button class="btn" data-act="howto">게임 방법</button>
        <button class="btn" data-act="unlocks">해금 · 승천 <small>${unlocked().length}/${D.UNLOCKS.length}</small></button>
        <button class="btn small" data-act="mute">${SFX.muted ? '🔇 소리 꺼짐' : '🔊 소리 켜짐'}</button>
      </div>
      <div class="record">${best ? `최고 기록: <b>${best.floor}층</b> (${best.cls ? best.cls + ' · ' : ''}${best.region})` : '아직 기록이 없습니다'}</div>
    </div>`;
  }

  // ───────── 직업 선택 ─────────
  function renderClass() {
    const cards = D.CLASSES.map(c => {
      const starter = c.starter.map(id => D.CARDS[id].name);
      const open = isUnlocked('class', c.id);
      const u = D.UNLOCKS.find(x => x.kind === 'class' && x.target === c.id);
      const maxAsc = G.ascensionOf(S.meta, c.id);
      return `<div class="class-card${S.classId === c.id ? ' sel' : ''}${open ? '' : ' locked'}" ${open ? `data-act="pickClass" data-id="${c.id}"` : ''}>
        ${art('classes', c.id, c.icon, 'class-art')}
        <div class="class-name">${open ? c.name : '🔒 ' + c.name}</div>
        <div class="class-role">${c.role} · ${c.weapon}</div>
        <p class="class-desc">${c.desc}</p>
        <div class="class-stats"><span>체력 <b>${c.hp}</b></span><span>코스트 <b>${c.energy}</b></span>${maxAsc ? `<span>승천 <b>${maxAsc}</b></span>` : ''}</div>
        <div class="class-trait-name">특성 「${c.trait.name}」</div>
        <div class="class-trait">${c.trait.desc}</div>
        <div class="class-deck">${open ? `시작 덱: ${starter.join(', ')}` : `해금 조건: ${u.desc}`}</div>
      </div>`;
    }).join('');
    const maxAsc = S.classId ? G.ascensionOf(S.meta, S.classId) : 0;
    if (S.asc > maxAsc) S.asc = maxAsc;
    const rewards = S.classId ? `<div class="asc-rewards">
        <div class="asc-rewards-head">승천 보상 <small>고른 단계까지의 보상을 이번 판에서 전부 받습니다 — 하이 리스크 · 하이 리턴</small></div>
        <div class="asc-reward-list">${D.ASC_REWARDS.map(r => `<span class="asc-reward${S.asc >= r.level ? ' on' : ''}${r.level > maxAsc ? ' far' : ''}" title="${r.desc}">${S.asc >= r.level ? '✔' : r.level > maxAsc ? '🔒' : '○'} ${r.level} ${r.name}</span>`).join('')}</div>
      </div>` : '';
    const ascRow = S.classId && maxAsc > 0 ? `<div class="asc-pick">
        <span class="asc-label">승천</span>
        <button class="btn small" data-act="ascDown" ${S.asc <= 0 ? 'disabled' : ''}>−</button>
        <b class="asc-level">${S.asc}</b>
        <button class="btn small" data-act="ascUp" ${S.asc >= maxAsc ? 'disabled' : ''}>+</button>
        <span class="asc-desc">${S.asc ? ascSummary(S.asc) : '보정 없음 (기본 난이도)'}</span>
      </div>` : (S.classId ? '<div class="asc-pick muted">순례를 완수하면 이 직업의 승천이 열립니다.</div>' : '');
    return `<div class="screen class-screen">
      <h2 class="screen-title">직업 선택</h2>
      <p class="screen-sub">순례를 떠날 자를 고르세요. 직업마다 쓰는 무기와 얻는 카드가 다릅니다. 턴당 카드 수는 코스트가 허락하는 만큼입니다.</p>
      <div class="class-grid">${cards}</div>
      ${ascRow}
      ${rewards}
      <div class="bottom-actions">
        <button class="btn" data-act="title">뒤로</button>
        <button class="btn primary big" data-act="toLight" ${S.classId ? '' : 'disabled'}>다음 — 빛의 선택</button>
      </div>
    </div>`;
  }

  // 승천 n 까지 누적된 위험을 한 줄로
  function ascSummary(level) {
    const A = G.ascMods(level);
    const pct = v => `${v > 0 ? '+' : ''}${Math.round(v * 100)}%`;
    const out = [];
    if (A.enemyHp) out.push(`적 체력 ${pct(A.enemyHp)}`);
    if (A.enemyPower) out.push(`적 주사위 위력 +${A.enemyPower}`);
    if (A.enemyDiceMax) out.push(`적 주사위 최대값 +${A.enemyDiceMax}`);
    if (A.enemyEnergy) out.push(`적 코스트 +${A.enemyEnergy}`);
    if (A.bossHp) out.push(`보스 체력 ${pct(A.bossHp)}`);
    if (A.startHp) out.push(`시작 체력 ${pct(A.startHp)}`);
    if (A.restHeal) out.push(`모닥불 회복 ${Math.round((D.MAP.restHeal + A.restHeal) * 100)}%`);
    if (A.shopPrice) out.push(`상점 가격 ${pct(A.shopPrice)}`);
    if (A.legendaryHalf) out.push('전설 확률 절반');
    if (A.light) out.push(`시작 빛 ${A.light}`);
    if (A.sigEvery !== 3) out.push(`고유 스킬 ${A.sigEvery}턴마다`);
    return `<b>위험</b> ${out.join(' · ')}`;
  }

  // ───────── 빛(패시브) 선택 ─────────
  function renderLight() {
    const total = G.lightPoints(S.asc);
    const used = G.passiveCost(S.light);
    const left = total - used;
    const pips = Array.from({ length: total }, (_, i) => `<i class="light-pip${i < left ? ' on' : ''}"></i>`).join('');
    const light4 = isUnlocked('passive', 4);
    const cards = D.PASSIVES.filter(p => !p.cls).map(p => {
      const sel = S.light.includes(p.id);
      const sealed = p.cost >= 4 && !light4;
      const locked = sealed || (!sel && p.cost > left);
      const why = sealed ? '해금 조건: 보스 1회 처치' : '';
      return `<button class="passive${sel ? ' sel' : ''}${locked ? ' locked' : ''}" data-act="light" data-id="${p.id}" title="${why}">
        <div class="p-cost">${'◆'.repeat(p.cost)}<span>${'◇'.repeat(4 - p.cost)}</span></div>
        <div class="p-name">${sealed ? '🔒 ' : ''}${p.name}</div>
        <div class="p-desc">${p.desc}</div>
      </button>`;
    }).join('');
    const cls = D.CLASS_MAP[S.classId];
    const cp = G.classPassive(S.classId);
    const auto = cp && S.asc >= 2 ? `<div class="passive sel cls auto" title="승천 2 보상 「전용 무구」">
        <div class="p-cost"><em>전용 · 자동 적용</em></div>
        <div class="p-name">✦ ${cp.name}</div>
        <div class="p-desc">${cp.desc}</div>
      </div>` : '';
    const bonus = S.asc ? G.ascRewards(S.asc).map(r => `<span class="tag" title="${r.desc}">✦ ${r.name}</span>`).join('') : '';
    return `<div class="screen light-screen">
      <h2 class="screen-title">빛의 선택</h2>
      <p class="screen-sub">${cls.icon} ${cls.name}${S.asc ? ` · 승천 ${S.asc}` : ''} — 빛 ${total}을 나누어 가호를 고르세요. 강한 가호일수록 많은 빛이 듭니다.</p>
      <div class="light-meter">${pips}</div>
      <div class="light-left">남은 빛 ${left} / ${total}</div>
      ${bonus ? `<div class="asc-bonus-row"><b>승천 ${S.asc} 보상</b> ${bonus}</div>` : ''}
      <div class="passive-grid">${auto}${cards}</div>
      <div class="bottom-actions">
        <button class="btn" data-act="new">뒤로</button>
        <button class="btn primary big" data-act="begin">순례 시작</button>
      </div>
    </div>`;
  }

  // ───────── 전투 ─────────
  function floorTrack(floor) {
    const start = floor - ((floor - 1) % 5);
    return Array.from({ length: 5 }, (_, i) => {
      const f = start + i;
      const k = G.floorKind(f);
      const shop = G.isShopFloor(f) ? ' 후 상점' : '';
      return `<span class="ft ${k}${f < floor ? ' done' : ''}${f === floor ? ' cur' : ''}" title="${f}층 · ${KIND_NAME[k]}${shop}">${KIND_ICON[k]}</span>`;
    }).join('');
  }

  function oddsHtml(b, i) {
    const pc = b.plan[i] != null;
    const ec = !!b.enemyPlan[i];
    if (!pc && !ec) return '';
    const o = G.rowOdds(b, i, 250);
    const diff = o.dealt - o.taken;
    const cls = !ec ? 'adv' : !pc ? 'dis' : diff > 3 ? 'adv' : diff < -3 ? 'dis' : 'even';
    const word = !ec ? '일방 공격' : !pc ? '무방비' : diff > 3 ? '우세' : diff < -3 ? '열세' : '균형';
    return `<div class="odds ${cls}">${word}<small>가함 ${Math.round(o.dealt)}<br>받음 ${Math.round(o.taken)}</small></div>`;
  }

  // 물약 벨트 (전투 중에는 모든 물약, 밖에서는 회복 물약만 쓸 수 있다)
  function potionBelt(inBattle) {
    const run = S.run;
    const slots = [];
    for (let i = 0; i < G.potionSlots(run); i++) {
      const id = run.potions[i];
      if (!id) { slots.push('<span class="potion empty" title="빈 물약 칸"></span>'); continue; }
      const it = D.ITEMS.find(x => x.id === id);
      const usable = inBattle || !!it.potion.heal;
      slots.push(`<button class="potion${usable ? '' : ' dim'}" data-act="potion" data-i="${i}" title="${it.name}: ${it.desc}${usable ? ' (눌러서 사용)' : ''}">${art('items', it.id, it.icon, 'potion-art')}</button>`);
    }
    return `<div class="potion-belt" title="물약 벨트">${slots.join('')}</div>`;
  }

  // 무대 배경 장식: 안개, 떠다니는 불티, 기둥
  function stageDecor(region) {
    const embers = Array.from({ length: 14 }, (_, i) => `<i class="ember" style="--x:${(i * 71) % 100}%;--d:${(i * 37) % 9}s;--t:${7 + (i * 13) % 6}s"></i>`).join('');
    return `<div class="decor" aria-hidden="true"><div class="fog a"></div><div class="fog b"></div><div class="pillars"></div>${embers}<div class="vignette"></div></div>`;
  }

  // 지도·보상·상점 등에서 쓰는 공통 상태줄
  function runBar() {
    const p = S.run.player;
    const region = D.REGION_MAP[S.run.regionId];
    const cls = D.CLASS_MAP[S.run.classId];
    return `<div class="runbar">
      <span class="tb-class">${cls.icon} ${cls.name}</span>
      <span class="tb-hp">❤ <b>${p.hp}/${p.maxHp}</b></span>
      ${goldHtml()}
      <span class="region-name">${region.icon} ${region.name}</span>
      <span class="floor-no">${S.run.floor}층</span>
      ${potionBelt(false)}
      <span class="runbar-sp"></span>
      <button class="btn small" data-act="deck">🂠 덱 · 유물</button>
      <button class="btn small" data-act="title" title="진행은 저장됩니다">타이틀</button>
    </div>`;
  }

  function relicBar(p) {
    const light = p.passives.map(id => D.PASSIVES.find(x => x.id === id))
      .map(x => `<span class="relic light" title="빛의 가호 · ${x.name}: ${x.desc}">✦</span>`);
    const relics = p.relics.map(id => D.ITEMS.find(i => i.id === id))
      .map(it => `<span class="relic" title="${it.name}: ${it.desc}">${art('items', it.id, it.icon, 'relic-art')}</span>`);
    return light.concat(relics).join('');
  }

  // 캐릭터 발밑: 붉은 체력바 + 노란 숫자의 코스트 구슬, 그 아래 상태이상
  function fighterHud(c, side, cost) {
    return `<div class="fighter-hud">
      <div class="hud-row">${hpBar(c, side)}<div class="cost-orb" id="cost-${side}" title="남은 코스트">${cost}</div></div>
      <div class="statuses" id="st-${side}">${statusHtml(c)}</div>
    </div>`;
  }

  function renderBattle() {
    const b = S.battle;
    const run = S.run;
    const p = b.player;
    const e = b.enemy;
    const region = D.REGION_MAP[run.regionId];
    const spent = G.planCost(b);
    const planned = G.planCount(b);
    const eSpent = b.enemyPlan.reduce((t, c) => t + (c.sig ? 0 : G.cardDef(c).cost), 0);
    stagePos.p = 0;
    stagePos.e = 0;
    engaged = false;

    // 보이는 줄: 적 카드 줄 + 내가 낸 카드 줄 + 빈 줄 하나 (코스트가 남아 있을 때)
    const inHandCount = p.hand.filter(c => b.plan.indexOf(c.uid) < 0).length;
    const canMore = inHandCount > 0 && p.hand.some(c => b.plan.indexOf(c.uid) < 0 && spent + G.cardDef(c).cost <= p.energy);
    const lastPlanned = b.plan.reduce((m, u, i) => (u != null ? i : m), -1);
    const visibleRows = Math.min(b.rows, Math.max(b.enemyPlan.length, lastPlanned + 1 + (canMore ? 1 : 0), 1));
    const lanes = Array.from({ length: visibleRows }, (_, i) => {
      const uid = b.plan[i];
      const pc = uid != null ? p.hand.find(h => h.uid === uid) : null;
      const ec = b.enemyPlan[i] || null;
      const target = S.targetRow === i;
      const pSlot = pc ? chipHtml(pc, p, e) : `<div class="empty">${!canMore ? '—' : target ? '낼 카드를 고르세요' : '카드를 끌어다 놓으세요'}</div>`;
      const eSlot = ec ? chipHtml(ec, e, p) : '<div class="empty">—</div>';
      return `<div class="row${target ? ' target' : ''}" data-row="${i}">
        <div class="slot p" data-act="slot" data-row="${i}" title="${pc ? '끌어서 다른 줄로 옮기거나 손패로 되돌리기 (누르면 손패로)' : '손패의 카드를 이 줄로 끌어다 놓으세요'}">${pSlot}</div>
        <div class="clash-mid"><span class="vs">VS</span>${oddsHtml(b, i)}</div>
        <div class="slot e">${eSlot}</div>
      </div>`;
    }).join('');

    // 손패: 아직 내지 않은 카드만 부채꼴로 펼친다
    const inHand = p.hand.filter(c => b.plan.indexOf(c.uid) < 0);
    const n = inHand.length;
    const hand = inHand.map((c, i) => {
      const off = i - (n - 1) / 2;
      const cant = spent + G.cardDef(c).cost > p.energy;
      const style = `--off:${off};--i:${i}`;
      return cardHtml(c, p, { act: 'card', vs: e, cls: `${cant ? 'cant' : 'playable'}${S.animateDraw ? ' drawn' : ''}`, style });
    }).join('');
    S.animateDraw = false;

    const sigSoon = e.signature && G.isSigTurn(b, b.turn + 1);
    const sigNow = e.signature && G.isSigTurn(b, b.turn);
    const sig = sigNow ? `<span class="sig-warn">★ 이번 턴 고유 스킬 「${e.signature.sig.name}」</span>`
      : sigSoon ? `<span class="sig-warn soon">⚠ 다음 턴 고유 스킬 「${e.signature.sig.name}」</span>` : '';
    const last = S.logs.length ? S.logs[S.logs.length - 1].t : '';
    const cls = D.CLASS_MAP[p.classId];

    return `<div class="screen battle-screen f-${p.classId}" style="--region:${region.color}">
      <header class="topbar">
        <div class="tb-hero">
          <span class="tb-class">${cls.icon} ${cls.name}</span>
          <span class="tb-hp" title="체력">❤ <b id="tb-hp">${Math.max(0, p.hp)}/${p.maxHp}</b></span>
          ${goldHtml()}
          <div class="relic-bar">${relicBar(p)}</div>
        </div>
        <div class="tb-stage">
          <span class="region-name">${region.icon} ${region.name}</span>
          <span class="floor-no">${run.floor}층</span>
          <span class="badge ${b.kind}">${KIND_NAME[b.kind]}</span>
          <div class="floor-track" title="이번 구간 5개 층">${floorTrack(run.floor)}</div>
        </div>
        <div class="tb-menu">
          ${potionBelt(true)}
          <button class="btn small${S.autoBattle ? ' on' : ''}" data-act="autoBattle" title="켜 두면 턴을 자동으로 진행합니다">${S.autoBattle ? '👁 관전 중' : '👁 관전'}</button>
          <button class="btn small" data-act="deck" title="덱 · 유물">🂠 덱</button>
          <button class="btn small" data-act="log">기록</button>
          <button class="btn small" data-act="speed">×${S.speed}</button>
          <button class="btn small" data-act="mute" title="소리">${SFX.muted ? '🔇' : '🔊'}</button>
          <button class="btn small" data-act="howto" aria-label="게임 방법">?</button>
        </div>
      </header>

      <main class="stage r-${region.id}${b.kind !== 'normal' ? ' ' + b.kind : ''}" aria-label="전투 무대">
        ${stageDecor(region)}
        <section class="fighter player" id="u-p">
          <div class="fig-mover"><div class="figure">${figureHtml('classes', p.classId, p.icon)}</div></div>
          ${fighterHud(p, 'p', p.energy - spent)}
        </section>
        <section class="fighter enemy" id="u-e">
          <div class="fig-mover"><div class="figure" data-act="enemyInfo" title="${e.name} — 눌러서 정보 보기">${figureHtml('monsters', e.defId, e.icon)}</div></div>
          ${fighterHud(e, 'e', e.energy - eSpent)}
        </section>
      </main>

      <section class="board">
        <div class="board-head">
          <button class="foe" data-act="enemyInfo" title="적 정보 보기">
            <b>${e.name}</b> <span class="badge ${b.kind}">${KIND_NAME[b.kind]}</span>
          </button>
          ${resRow(e)}
          ${sig}
        </div>
        <div class="lanes">${lanes}</div>
        <div class="ticker" id="ticker" data-act="log" title="전체 기록 보기">${last}</div>
      </section>

      <footer class="hand-zone">
        <div class="hz-left">
          <button class="pile draw" data-act="pile" data-which="draw" title="뽑을 카드 더미"><span class="pile-back"></span><b>${p.drawPile.length}</b></button>
        </div>
        <div class="hand fan" style="--n:${n}">${hand || '<div class="hand-empty">낼 수 있는 카드를 모두 냈습니다</div>'}</div>
        <div class="hz-right">
          <button class="btn end-turn" data-act="fight" ${S.busy ? 'disabled' : ''}>턴 종료</button>
          <div class="hz-small">
            <button class="btn small" data-act="auto" ${S.busy ? 'disabled' : ''}>자동</button>
            <button class="btn small" data-act="clear" ${S.busy ? 'disabled' : ''}>되돌리기</button>
          </div>
          <button class="pile discard" data-act="pile" data-which="discard" title="버린 카드 더미"><span class="pile-back"></span><b>${p.discard.length}</b></button>
        </div>
      </footer>

      <aside class="log-drawer${S.logOpen ? ' open' : ''}" id="log-drawer" aria-label="전투 기록">
        <div class="log-title"><span>전투 기록</span><button class="btn small" data-act="log">닫기</button></div>
        <div class="log-lines" id="log-lines"></div>
      </aside>
    </div>`;
  }

  function afterBattleRender() {
    const box = document.getElementById('log-lines');
    box.innerHTML = S.logs.map(l => `<div class="l-${l.c}">${l.t}</div>`).join('');
    box.scrollTop = box.scrollHeight;
  }

  function log(c, t) {
    S.logs.push({ c, t });
    if (S.logs.length > 300) S.logs.shift();
    const box = document.getElementById('log-lines');
    if (box) {
      const div = document.createElement('div');
      div.className = 'l-' + c;
      div.innerHTML = t;
      box.appendChild(div);
      box.scrollTop = box.scrollHeight;
    }
    const tk = document.getElementById('ticker');
    if (tk) { tk.className = 'ticker l-' + c; tk.innerHTML = t; }
  }

  const PROC_INFO = {
    smash: { icon: '🔨', name: '강타' },
    lightning: { icon: '⚡', name: '번개' },
  };

  // ───────── 전투 연출 ─────────
  const nm = side => (side === 'p' ? S.battle.player.name : S.battle.enemy.name);
  const other = side => (side === 'p' ? 'e' : 'p');

  function setHp(hp) {
    ['p', 'e'].forEach(side => {
      const c = side === 'p' ? S.battle.player : S.battle.enemy;
      const el = document.getElementById('hp-' + side);
      if (!el) return;
      const v = Math.max(0, hp[side]);
      const pct = v / c.maxHp * 100;
      el.querySelector('.fill').style.width = pct + '%';
      el.querySelector('.fill').classList.toggle('low', pct <= 30);
      el.querySelector('span').textContent = v;
      if (side === 'p') { const t = document.getElementById('tb-hp'); if (t) t.textContent = `${v}/${c.maxHp}`; }
    });
  }

  function floatText(side, text, cls) {
    const unit = document.querySelector(`#u-${side} .figure`) || document.getElementById('u-' + side);
    if (!unit) return;
    const f = document.createElement('div');
    f.className = 'float ' + cls;
    f.textContent = text;
    f.style.left = (35 + Math.random() * 30) + '%';
    unit.appendChild(f);
    setTimeout(() => f.remove(), 950);
  }


  const rowEl = i => document.querySelector(`.row[data-row="${i}"]`);
  const dieEl = (row, side, i) => (row && i >= 0 ? row.querySelector(`.slot.${side} .die[data-i="${i}"]`) : null);

  function showRoll(el, value, state) {
    if (!el) return;
    el.classList.remove('win', 'lose', 'even', 'roll');
    void el.offsetWidth;
    el.classList.add('roll', state);
    el.querySelector('b').textContent = value;
  }
  function markUsed(el) { if (el) el.classList.add('used'); }

  const DIE_WORD = t => `${D.DICE[t].icon}${D.DICE[t].name}`;
  function markBroken(el) { if (el) { el.classList.remove('win', 'even', 'roll'); el.classList.add('broken'); } }

  async function play(events) {
    let row = null;
    let rowP = null;
    let rowE = null;
    for (const ev of events) {
      switch (ev.t) {
        case 'start':
          log(ev.side, `✧ ${nm(ev.side)}의 「${ev.name}」 전투 시작 효과`);
          particles(ev.side, 'buff', 6);
          await sleep(200);
          break;
        case 'row': {
          await resetStage();
          document.querySelectorAll('.row').forEach(r => r.classList.remove('active'));
          row = rowEl(ev.row);
          rowP = ev.p;
          rowE = ev.e;
          if (row) { row.classList.add('active'); row.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
          log('sys', `— ${ev.row + 1}번 줄: ${ev.p ? `「${ev.p.name}」` : '없음'} vs ${ev.e ? `「${ev.e.name}」` : '없음'} —`);
          await sleep(300);
          break;
        }
        case 'selfDmg':
          floatText(ev.side, '-' + ev.amount, 'dmg');
          setHp(ev.hp);
          log(ev.side, `${nm(ev.side)}: 「${ev.name}」 사용으로 체력 ${ev.amount} 소모`);
          await sleep(250);
          break;
        case 'status': {
          const info = D.STATUS_INFO[ev.key];
          if (ev.key === 'element') {
            const el = D.ELEMENTS[ev.element];
            log(ev.side === 'p' ? 'e' : 'p', `${el.icon} ${nm(ev.side)}에게 ${el.name} 속성`);
            particles(ev.side, 'el-' + ev.element, 5);
          } else if (ev.converted) {
            log('big', `🫀 ${nm(ev.side)}의 출혈이 과다출혈 ${ev.amount}로 바뀌었습니다!`);
            floatText(ev.side, '과다출혈!', 'proc');
            particles(ev.side, 'bleed', 14);
            sfx('heavy');
            await sleep(350);
          } else {
            log(ev.side === 'p' ? 'e' : 'p', `${info.icon} ${nm(ev.side)}에게 ${info.name} ${ev.amount}${ev.next ? ' (다음 턴)' : ''}`);
          }
          await sleep(60);
          break;
        }
        case 'element': {
          const el = D.ELEMENTS[ev.type];
          floatText(ev.side, `${el.icon} ${el.name} ×${ev.n}`, 'elem');
          particles(ev.side, 'el-' + ev.type, 10 + ev.n * 2);
          log('big', `${el.icon} ${el.name} ${ev.n}단계 발동 — ${el.desc.replace('n', String(ev.n))}`);
          sfx(ev.type === 'lightning' ? 'clash' : 'heal');
          await sleep(260);
          break;
        }
        case 'clash': {
          const pe = dieEl(row, 'p', ev.pi);
          const ee = dieEl(row, 'e', ev.ei);
          const pw = ev.result === 'p';
          const ew = ev.result === 'e';
          showRoll(pe, ev.pv, pw ? 'win' : ew ? 'lose' : 'even');
          showRoll(ee, ev.ev, ew ? 'win' : pw ? 'lose' : 'even');
          const pd = rowP.dice[ev.pi];
          const ed = rowE.dice[ev.ei];
          const text = pw ? `${nm('e')}의 주사위 파괴` : ew ? `${nm('p')}의 주사위 파괴` : '무승부 — 다시 굴림';
          log('sys', `합 ${DIE_WORD(pd.t)} ${ev.pv} : ${ev.ev} ${DIE_WORD(ed.t)} → ${text}`);
          await clashMotion(pd, ed, ev);
          if (pw) markBroken(ee);
          if (ew) markBroken(pe);
          break;
        }
        case 'attack': {
          const X = ev.side === 'p' ? rowP : rowE;
          const left = X.dice.slice(ev.from).filter(d => d.atk).length;
          if (ev.opposed) log(ev.side === 'p' ? 'big' : 'bad', `합 종료 — ${nm(ev.side)} 승리! 남은 공격 주사위 ${left}개로 공격`);
          else log(ev.side, `${nm(ev.side)}의 「${X.name}」 일방 공격 (공격 주사위 ${left}개)`);
          row && row.querySelectorAll(`.slot.${ev.side} .die`).forEach((el, k) => {
            if (k >= ev.from && !el.classList.contains('broken')) el.classList.remove('win', 'lose', 'even', 'roll');
          });
          await sleep(350);
          break;
        }
        case 'strike': {
          const el = dieEl(row, ev.side, ev.k);
          showRoll(el, ev.value, 'win');
          const d = (ev.side === 'p' ? rowP : rowE).dice[ev.k];
          log(ev.side, `  ${DIE_WORD(d.t)} ${ev.value}`);
          popDie(ev.side, d.t, ev.value, 'win');
          await strikeMotion(ev.side);
          if (el) el.classList.add('used');
          break;
        }
        case 'hit': {
          const tgt = other(ev.side);
          floatText(tgt, '-' + ev.dmg, 'dmg');
          setHp(ev.hp);
          const extra = [];
          if (ev.res !== 1) extra.push(`${D.RES_NAME[ev.res]} ×${ev.res}`);
          log(ev.side, `  ${nm(tgt)}에게 <b>${ev.dmg}</b> 피해${extra.length ? ` (${extra.join(', ')})` : ''}`);
          await hitMotion(tgt, ev.dmg, ev.die);
          break;
        }
        case 'proc': {
          const info = D.STATUS_INFO[ev.key] || PROC_INFO[ev.key];
          floatText(ev.side, `${info.icon}-${ev.amount}`, 'proc');
          particles(ev.side, ev.key, ev.key === 'hemo' ? 12 : 8);
          setHp(ev.hp);
          log(ev.side === 'p' ? 'e' : 'p', `${info.icon} ${nm(ev.side)}: ${info.name}으로 ${ev.amount} 피해`);
          await sleep(ev.key === 'smash' ? 180 : 280);
          break;
        }
        case 'heal':
          sfx('heal');
          floatText(ev.side, '+' + ev.amount, 'heal');
          particles(ev.side, 'heal', 7);
          setHp(ev.hp);
          log('good', `${nm(ev.side)} 체력 ${ev.amount} 회복`);
          await sleep(200);
          break;
        case 'undying':
          log('good', `✦ 불굴! ${nm(ev.side)}이(가) 체력 1로 버텼습니다`);
          await sleep(400);
          break;
        case 'revive':
          setHp(ev.hp);
          screenFlash();
          particles(ev.side, 'heal', 26);
          log('good', `✦ 불멸! ${nm(ev.side)}이(가) 체력 ${ev.amount}로 되살아났습니다`);
          await sleep(700);
          break;
        case 'end':
          await resetStage();
          break;
        default:
          break;
      }
    }
    await resetStage();
  }

  function banner(text, cls, ms, sub) {
    const el = document.createElement('div');
    el.className = 'banner ' + cls;
    el.innerHTML = `<div>${text}${sub ? `<small>${sub}</small>` : ''}</div>`;
    document.body.appendChild(el);
    return new Promise(r => setTimeout(() => { el.remove(); r(); }, ms || 1100));
  }
  const turnBanner = () => banner('나의 턴', 'turn', 750, `${S.battle.turn}턴`);

  async function fight() {
    const b = S.battle;
    if (S.busy || !b || b.outcome) return;
    if (G.planCount(b) === 0 && b.enemyPlan.length && !S.confirmEmpty) {
      S.confirmEmpty = true;
      toast('카드를 내지 않았습니다. 한 번 더 누르면 그대로 턴을 마칩니다.');
      return;
    }
    S.confirmEmpty = false;
    S.targetRow = null;
    S.busy = true;
    document.querySelectorAll('[data-act="fight"],[data-act="auto"],[data-act="clear"]').forEach(x => { x.disabled = true; });
    document.querySelectorAll('.row').forEach(r => r.classList.remove('target'));
    log('sys', `━━ ${b.turn}턴 합 개시 ━━`);
    await banner('합 개시', 'clash', 650 / S.speed);
    const events = G.resolveTurn(b, rng);
    await play(events);
    S.busy = false;
    if (b.outcome === 'win') {
      log('big', `${b.enemy.name} 처치!`);
      await banner('VICTORY', 'win');
      const res = G.finishBattle(S.run, b, rng);
      S.pendingBoss = res.boss;
      S.lastGold = res.gold;
      if (res.boss) { G.recordBossKill(S.meta); saveMeta(); }
      if (res.won) { G.recordRun(S.meta, S.run, true); saveMeta(); S.justWon = true; }
      S.rewards = G.rollRewards(S.run, b.kind, rng);
      S.rewardKind = 'battle';
      S.rewardPicks = G.hasAscReward(S.run, 'plenty') ? 2 : 1;
      sfx('win');
      go('reward');
    } else if (b.outcome === 'lose') {
      await banner('YOU DIED', 'lose');
      saveRecord();
      if (!S.run.won) { G.recordRun(S.meta, S.run, false); saveMeta(); }
      clearSave();
      S.autoBattle = false;
      go('over');
    } else {
      G.startTurn(b, rng);
      S.animateDraw = true;
      render();
      sfx('draw');
      turnBanner();
      if (S.autoBattle) autoStep();
    }
  }

  // 관전: 자동 배치 후 턴을 자동으로 넘긴다
  function autoStep() {
    setTimeout(() => {
      if (!S.autoBattle || S.screen !== 'battle' || S.busy || !S.battle || S.battle.outcome) return;
      autoPlan();
      S.targetRow = null;
      S.confirmEmpty = true;
      render();
      setTimeout(() => { if (S.autoBattle && !S.busy) fight(); }, 500 / S.speed);
    }, 900 / S.speed);
  }

  // 자동 배치: 코스트 안에서 가능한 카드 조합과 줄 배치를 모두 따져
  // (가하는 피해 − 받는 피해) 기대값이 가장 큰 배치를 고른다.
  function autoPlan() {
    const b = S.battle;
    const p = b.player;
    const hand = p.hand;
    const rows = b.rows;
    const table = hand.map(c => Array.from({ length: rows }, (_, r) => G.pairOdds(b, c, b.enemyPlan[r] || null, null, 80)));
    const idle = Array.from({ length: rows }, (_, r) => (b.enemyPlan[r] ? G.pairOdds(b, null, b.enemyPlan[r], null, 80).taken : 0));
    let best = { v: -Infinity, pick: [] };
    const used = new Array(hand.length).fill(false);
    const pick = new Array(rows).fill(-1);
    (function rec(r, count, cost) {
      if (r === rows) {
        let v = 0;
        for (let i = 0; i < rows; i++) {
          const h = pick[i];
          v += h < 0 ? -idle[i] : table[h][i].dealt - table[h][i].taken;
        }
        if (v > best.v) best = { v, pick: pick.slice() };
        return;
      }
      rec(r + 1, count, cost);
      if (count >= p.slots) return;
      hand.forEach((c, h) => {
        const cc = G.cardDef(c).cost;
        if (used[h] || cost + cc > p.energy) return;
        used[h] = true;
        pick[r] = h;
        rec(r + 1, count + 1, cost + cc);
        pick[r] = -1;
        used[h] = false;
      });
    })(0, 0, 0);
    b.plan = b.plan.map(() => null);
    best.pick.forEach((h, r) => { if (h >= 0) b.plan[r] = hand[h].uid; });
  }

  // ───────── 지도 ─────────
  function renderMap() {
    const run = S.run;
    const m = run.map;
    const region = D.REGION_MAP[run.regionId];
    const choices = G.mapChoices(run);
    const can = (c, i) => choices.some(x => x.col === c && x.idx === i);
    const W = 760;
    const H = 330;
    const colX = c => 70 + c * ((W - 140) / 4);
    const rowY = (n, i) => H / 2 + (i - (n - 1) / 2) * 92;
    const pos = (c, i) => [colX(c), rowY(m.cols[c].length, i)];
    const lines = [];
    const link = (c1, i1, c2, i2, active, done) => {
      const [x1, y1] = pos(c1, i1);
      const [x2, y2] = pos(c2, i2);
      lines.push(`<path class="mpath${active ? ' active' : ''}${done ? ' done' : ''}" d="M${x1} ${y1} C ${x1 + 60} ${y1}, ${x2 - 60} ${y2}, ${x2} ${y2}"/>`);
    };
    m.cols[0].forEach((_, i) => m.edges[i].forEach(j => link(0, i, 1, j, m.col === 0 && m.idx === i, m.col >= 1 && m.idx === j && m.cols[0][i].done)));
    for (let c = 1; c < 4; c++) m.cols[c].forEach((_, i) => m.cols[c + 1].forEach((__, j) => link(c, i, c + 1, j, m.col === c && m.idx === i, m.cols[c][i].done && m.col > c && (c + 1 === m.col ? m.idx === j : true))));
    const nodes = m.cols.map((col, c) => col.map((n, i) => {
      const [x, y] = pos(c, i);
      const info = D.NODES[n.kind];
      const state = n.done ? 'done' : (m.col === c && m.idx === i) ? 'here' : can(c, i) ? 'open' : 'locked';
      const big = n.kind === 'boss' || n.kind === 'midboss';
      return `<g class="mnode ${n.kind} ${state}" transform="translate(${x} ${y})" ${state === 'open' ? `data-act="node" data-col="${c}" data-idx="${i}" role="button" tabindex="0"` : ''}>
        <title>${info.name}${state === 'open' ? ' — 눌러서 이동' : ''}: ${info.desc}</title>
        <circle r="${big ? 30 : 22}"/>
        <text y="${big ? 10 : 8}" font-size="${big ? 28 : 20}">${info.icon}</text>
      </g>`;
    }).join('')).join('');
    const floorLabels = m.cols.map((_, c) => `<text class="mfloor" x="${colX(c)}" y="${H - 8}">${m.startFloor + c}층</text>`).join('');
    const hero = m.col >= 0 ? '' : `<text class="mfloor" x="${colX(0) - 48}" y="${H / 2 + 5}">출발 ▸</text>`;
    const sub = choices.length ? '다음 칸을 고르세요. 열려 있는 칸만 갈 수 있습니다.' : '';
    return `<div class="screen map-screen" style="--region:${region.color}">
      ${runBar()}
      <h2 class="screen-title">${region.icon} ${region.name}</h2>
      <p class="screen-sub">${region.desc}<br>${sub}</p>
      <div class="map-wrap"><svg class="map" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
        <defs><pattern id="mgrid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="rgba(255,255,255,.035)"/></pattern></defs>
        <rect width="${W}" height="${H}" fill="url(#mgrid)"/>
        ${lines}${nodes}${floorLabels}${hero}
      </svg></div>
      <div class="map-legend">${Object.keys(D.NODES).map(k => `<span><i class="lg ${k}">${D.NODES[k].icon}</i> ${D.NODES[k].name}</span>`).join('')}</div>
    </div>`;
  }

  // 지도에서 칸을 고르면 그 칸의 내용으로 넘어간다
  function goNode(col, idx) {
    const node = G.enterNode(S.run, col, idx);
    sfx('click');
    if (node.kind === 'battle' || node.kind === 'midboss' || node.kind === 'boss') startBattle();
    else if (node.kind === 'rest') go('rest');
    else if (node.kind === 'treasure') { S.rewardKind = 'treasure'; S.rewards = G.rollTreasure(S.run, rng); S.rewardPicks = 1; S.pendingBoss = false; go('reward'); }
    else if (node.kind === 'event') { S.event = G.rollEvent(S.run, rng); S.eventResult = null; go('event'); }
  }

  // 칸을 마치고 지도로 (보스였다면 상점 → 지역 선택)
  function leaveNode() {
    closeModal();
    const boss = G.finishNode(S.run);
    if (boss && S.justWon) {
      S.justWon = false;
      clearSave();
      sfx('win');
      go('victory');
      return;
    }
    if (boss) {
      S.shop = G.rollShop(S.run, rng);
      saveRun('shop');
      go('shop');
    } else {
      go('map');
    }
  }

  // ───────── 시작 유물 (승천 4 보상 「전설의 유산」) ─────────
  function renderStartRelic() {
    const opts = S.rewards.map((o, i) => `<div class="reward ${o.item.rarity}" data-act="startRelicPick" data-i="${i}">
        <span class="rarity-tag ${o.item.rarity}">${D.RARITY_NAME[o.item.rarity]}</span>
        ${itemArt(o.item)}
        <div class="reward-name">${o.item.name}</div>
        <div class="reward-desc">${o.item.desc}</div>
      </div>`).join('');
    return `<div class="screen reward-screen">
      ${runBar()}
      <h2 class="screen-title">전설의 유산</h2>
      <p class="screen-sub">승천 4 보상 — 순례를 시작하며 전설 유물 하나를 물려받습니다.</p>
      <div class="reward-grid">${opts}</div>
    </div>`;
  }

  // ───────── 모닥불 ─────────
  function renderRest() {
    const p = S.run.player;
    const heal = Math.round(p.maxHp * (D.MAP.restHeal + G.ascMods(S.run.asc).restHeal));
    const full = G.hasAscReward(S.run, 'fullRest');
    const fullHeal = Math.round(p.maxHp * D.FULL_REST_HEAL);
    return `<div class="screen rest-screen">
      ${runBar()}
      <div class="rest-fire">🔥</div>
      <h2 class="screen-title">모닥불</h2>
      <p class="screen-sub">${full ? '승천 7 「완전한 휴식」 — 회복·단련·명상을 한꺼번에 받습니다.' : '불가에 앉아 숨을 고릅니다. 하나를 고르세요.'}</p>
      <div class="reward-grid">
        ${full ? `<div class="reward legendary" data-act="restFull"><div class="reward-icon">🔥</div><div class="reward-name">완전한 휴식</div><div class="reward-desc">체력 ${fullHeal} 회복 (${p.hp} → ${Math.min(p.maxHp, p.hp + fullHeal)}) · 카드 1장 단련 +${D.MAP.restUpgrade.ub} · 다음 전투 힘 2, 보호 2</div></div>` : ''}
        <div class="reward" data-act="restHeal"><div class="reward-icon">🛌</div><div class="reward-name">휴식</div><div class="reward-desc">체력 ${heal} 회복 (${p.hp} → ${Math.min(p.maxHp, p.hp + heal)})</div></div>
        <div class="reward" data-act="restUpgrade"><div class="reward-icon">⚒️</div><div class="reward-name">단련</div><div class="reward-desc">카드 1장의 모든 주사위 +${D.MAP.restUpgrade.ub}</div></div>
      </div>
    </div>`;
  }

  // ───────── 사건 ─────────
  function renderEvent() {
    const ev = S.event;
    const r = S.eventResult;
    const body = r
      ? `<div class="event-result">${r.lines.map(l => `<div>${l}</div>`).join('')}</div>
         <div class="bottom-actions"><button class="btn primary big" data-act="eventDone">계속</button></div>`
      : `<div class="event-choices">${ev.choices.map((c, i) => {
          const ok = G.canChoose(S.run, c);
          return `<button class="event-choice" data-act="eventChoice" data-i="${i}" ${ok ? '' : 'disabled'}><b>${c.label}</b><small>${c.hint}${ok ? '' : ' — 은화 부족'}</small></button>`;
        }).join('')}</div>`;
    return `<div class="screen event-screen">
      ${runBar()}
      <div class="event-card">
        <div class="event-icon">${ev.icon}</div>
        <h2 class="screen-title">${ev.name}</h2>
        <p class="event-text">${ev.text}</p>
        ${body}
      </div>
    </div>`;
  }

  function chooseEvent(i) {
    const res = G.applyEventChoice(S.run, S.event, i, rng);
    if (!res.ok) { toast(res.msg); return; }
    sfx(res.lines.some(l => /획득|회복|\+/.test(l)) ? 'coin' : 'click');
    S.eventResult = res;
    render();
    if (res.newCard) {
      openDeckPicker({ item: { icon: '📜', name: '카드 교체', type: 'card', desc: '' }, cardId: res.newCard }, uid => {
        G.swapEventCard(S.run, res.newCard, uid);
        closeModal();
        render();
      }, true);
    } else if (res.needCard === 'upgrade') {
      openDeckPicker({ item: { icon: '⚒️', name: '단련', type: 'upgrade', desc: `카드 1장 강화` } }, uid => {
        G.upgradeCard(S.run, uid, res.pendingUpgrade);
        closeModal();
        toast('카드를 단련했습니다.');
        render();
      });
    }
  }

  // ───────── 보상 ─────────
  function rewardBody(o) {
    return o.item.type === 'card'
      ? `<div class="reward-card">${cardHtml(G.makeCard(o.cardId), null, { cls: 'static' })}</div>`
      : itemArt(o.item);
  }

  function renderReward() {
    const p = S.run.player;
    const opts = S.rewards.map((o, i) => `<div class="reward ${o.item.rarity}" data-act="reward" data-i="${i}">
        <span class="rarity-tag ${o.item.rarity}">${D.RARITY_NAME[o.item.rarity]}</span>
        ${rewardBody(o)}
        <div class="reward-name">${o.item.name}</div>
        <div class="reward-desc">${o.item.desc}</div>
      </div>`).join('');
    const treasure = S.rewardKind === 'treasure';
    const next = !treasure && G.isShopFloor(S.run.floor) ? ' 다음은 상점입니다.' : '';
    const picks = S.rewardPicks || 1;
    const howMany = picks > 1 ? `<b>${picks}개</b>를 고르세요 (승천 5 「풍요」).` : '하나를 선택하세요.';
    return `<div class="screen reward-screen">
      ${runBar()}
      <h2 class="screen-title">${treasure ? '보물 상자' : '전리품'}</h2>
      <p class="screen-sub">${treasure ? '먼지 쌓인 상자 안에 유물이 들어 있습니다. 하나를 고르세요.' : `${S.run.floor}층 돌파 · 은화 +${S.lastGold}. ${howMany}${S.pendingBoss ? ' 보스를 쓰러뜨려 체력을 회복했습니다.' : ''}${next}`}</p>
      <div class="reward-grid">${opts}</div>
      <div class="bottom-actions"><button class="btn small" data-act="skipReward">건너뛰기</button></div>
    </div>`;
  }

  function pickReward(i) {
    const opt = S.rewards[i];
    const done = () => {
      toast(`${opt.item.name} 획득`);
      sfx(opt.item.type === 'potion' ? 'potion' : 'coin');
      S.rewardPicks = (S.rewardPicks || 1) - 1;
      S.rewards = S.rewards.filter(o => o !== opt);
      if (S.rewardPicks > 0 && S.rewards.length) render();
      else afterReward();
    };
    if (G.needsCardTarget(opt)) { openDeckPicker(opt, uid => { G.applyReward(S.run, opt, uid); done(); }); return; }
    G.applyReward(S.run, opt);
    done();
  }

  function afterReward() {
    leaveNode();
  }

  function afterShop() {
    S.regions = G.regionChoices(S.run, rng);
    saveRun('region');
    go('region');
  }

  function startBattle() {
    S.battle = G.startBattle(S.run, rng);
    preloadSprites(S.run.classId);
    preloadSprites(S.battle.enemy.defId);
    S.logs = [];
    S.targetRow = null;
    const e = S.battle.enemy;
    log('sys', `${S.run.floor}층 — ${KIND_NAME[S.battle.kind]} 「${e.name}」 출현`);
    S.animateDraw = true;
    go('battle');
    const begin = () => { turnBanner(); if (S.autoBattle) autoStep(); };
    if (S.battle.kind !== 'normal') {
      sfx('boss');
      banner(e.name, 'boss', 1400, S.battle.kind === 'boss' ? `${D.REGION_MAP[S.run.regionId].name}의 주인` : '중간 보스').then(begin);
    } else {
      begin();
    }
  }

  // ───────── 상점 ─────────
  function shopItem(entry, key) {
    const it = entry.item;
    const afford = S.run.gold >= entry.price;
    const sold = entry.sold;
    return `<div class="shop-item ${it.rarity}${sold ? ' sold' : ''}">
      <span class="rarity-tag ${it.rarity}">${D.RARITY_NAME[it.rarity]}</span>
      ${rewardBody(entry)}
      <div class="reward-name">${it.name}</div>
      <div class="reward-desc">${it.desc}</div>
      <button class="btn small${afford && !sold ? ' primary' : ''}" data-act="buy" data-key="${key}" ${sold || !afford ? 'disabled' : ''}>${sold ? '판매 완료' : `🪙 ${entry.price}`}</button>
    </div>`;
  }

  function renderShop() {
    const p = S.run.player;
    return `<div class="screen shop-screen">
      ${runBar()}
      <h2 class="screen-title">떠돌이 상인</h2>
      <p class="screen-sub">5층마다 나타나는 상인입니다. 은화로 물건을 사세요. 층이 높을수록 좋은 물건이 들어옵니다.</p>
      <h3 class="shop-head">기본 물품 <small>언제나 있음 · 여러 번 구매 가능</small></h3>
      <div class="shop-grid fixed">${S.shop.fixed.map((e, i) => shopItem(e, 'f' + i)).join('')}</div>
      <h3 class="shop-head">오늘의 물건 <small>일반 ~ 전설 · 각 1개</small></h3>
      <div class="shop-grid">${S.shop.random.map((e, i) => shopItem(e, 'r' + i)).join('')}</div>
      <div class="bottom-actions"><button class="btn primary big" data-act="leaveShop">상점 떠나기</button></div>
    </div>`;
  }

  function buyEntry(key) {
    const entry = key[0] === 'f' ? S.shop.fixed[Number(key.slice(1))] : S.shop.random[Number(key.slice(1))];
    if (entry.sold || S.run.gold < entry.price) { toast(entry.sold ? '이미 판매된 물건입니다.' : '은화가 부족합니다.'); return; }
    const done = uid => {
      const res = G.buy(S.run, entry, uid);
      closeModal();
      if (res.ok) sfx('coin');
      toast(res.ok ? `${entry.item.name} 구매` : res.msg);
      render();
    };
    if (G.needsCardTarget(entry)) openDeckPicker(entry, done);
    else done();
  }

  // ───────── 지역 선택 ─────────
  function renderRegion() {
    const cards = S.regions.map(r => `<div class="region-card" style="--rc:${r.color}" data-act="region" data-id="${r.id}">
      <div class="reward-icon">${r.icon}</div>
      <div class="reward-name">${r.name}</div>
      <div class="reward-desc">${r.desc}</div>
      <div class="region-mobs">출몰: ${r.monsters.map(m => `${m.icon} ${m.name}`).join(', ')}</div>
      <div class="region-mobs">중간 보스 <b>${r.midboss.icon} ${r.midboss.name}</b> · 보스 <b>${r.boss.icon} ${r.boss.name}</b></div>
    </div>`).join('');
    return `<div class="screen region-screen">
      <h2 class="screen-title">다음 지역</h2>
      <p class="screen-sub">순례를 이어갈 땅을 고르세요. (${S.run.floor + 1}층부터)</p>
      <div class="region-grid">${cards}</div>
    </div>`;
  }

  // ───────── 게임 오버 ─────────
  function saveRecord() {
    const best = store.get('best', null);
    const region = D.REGION_MAP[S.run.regionId].name;
    S.newRecord = !best || S.run.floor > best.floor;
    if (S.newRecord) store.set('best', { floor: S.run.floor, region, cls: D.CLASS_MAP[S.run.classId].name });
  }

  function renderOver() {
    const run = S.run;
    const region = D.REGION_MAP[run.regionId];
    const cls = D.CLASS_MAP[run.classId];
    return `<div class="screen over-screen">
      <div class="title-emblem">✝</div>
      <h2 class="over-title">순례의 끝</h2>
      <p class="screen-sub">${cls.name} — ${region.icon} ${region.name}, ${run.floor}층에서 빛이 꺼졌습니다.${S.newRecord ? '<br><b class="gold">새로운 최고 기록!</b>' : ''}</p>
      <dl class="over-stats">
        <dt>도달 층</dt><dd>${run.floor}층</dd>
        <dt>처치한 적</dt><dd>${run.kills}</dd>
        <dt>쓰러뜨린 보스</dt><dd>${run.bossKills}</dd>
        <dt>모은 유물</dt><dd>${run.player.relics.length}개</dd>
        <dt>남은 은화</dt><dd>${run.gold}</dd>
      </dl>
      <div class="title-actions">
        <button class="btn primary big" data-act="new">다시 순례하기</button>
        <button class="btn" data-act="title">타이틀로</button>
      </div>
    </div>`;
  }

  // ───────── 순례 완수 ─────────
  function renderVictory() {
    const run = S.run;
    const cls = D.CLASS_MAP[run.classId];
    const nextAsc = G.ascensionOf(S.meta, run.classId);
    const newly = D.UNLOCKS.filter(u => u.need(S.meta) && !(S.unlockedBefore || []).includes(u.id));
    return `<div class="screen victory-screen">
      <div class="title-emblem">✦</div>
      <h2 class="screen-title big">순례 완수</h2>
      <p class="screen-sub">${cls.icon} ${cls.name}이(가) ${D.WIN_FLOOR}층의 주인을 쓰러뜨리고 빛을 되찾았습니다.${run.asc ? ` (승천 ${run.asc})` : ''}</p>
      <dl class="over-stats">
        <dt>처치한 적</dt><dd>${run.kills}</dd>
        <dt>쓰러뜨린 보스</dt><dd>${run.bossKills}</dd>
        <dt>모은 유물</dt><dd>${run.player.relics.length}개</dd>
        <dt>${cls.name} 승천</dt><dd>${nextAsc}단계까지 열림</dd>
      </dl>
      ${newly.length ? `<div class="unlock-pop">새로 열림: ${newly.map(u => `<b>${u.name}</b>`).join(', ')}</div>` : ''}
      ${(() => { const r = D.ASC_REWARDS.find(x => x.level === nextAsc); return r && nextAsc > run.ascReached ? `<div class="unlock-pop">승천 ${r.level}이 열렸습니다. 그 단계로 도전하면 <b>${r.name}</b>: ${r.desc}</div>` : ''; })()}
      <div class="title-actions">
        <button class="btn primary big" data-act="continueRun">계속 오르기 <small>(끝없는 순례)</small></button>
        <button class="btn" data-act="title">타이틀로</button>
      </div>
    </div>`;
  }

  function renderUnlocks() {
    const ids = unlocked();
    const rows = D.UNLOCKS.map(u => {
      const on = ids.includes(u.id);
      return `<div class="unlock-row${on ? ' on' : ''}"><span class="u-icon">${on ? '✔' : '🔒'}</span><b>${u.name}</b><small>${u.desc}</small></div>`;
    }).join('');
    const asc = D.CLASSES.map(c => `<div class="asc-row"><b>${c.icon} ${c.name}</b><span>${G.ascensionOf(S.meta, c.id) ? `승천 ${G.ascensionOf(S.meta, c.id)}단계까지` : '아직 완수하지 않음'}</span></div>`).join('');
    const ascList = D.ASCENSION.map(a => `<li><b>${a.level}</b> ${a.desc}</li>`).join('');
    const m = S.meta;
    return `<div class="screen unlocks-screen">
      <h2 class="screen-title">해금 · 승천</h2>
      <p class="screen-sub">순례 ${m.runs}회 · 보스 처치 ${m.bossKills}회 · 완수 ${m.wins}회 · 최고 ${m.maxFloor}층</p>
      <div class="unlock-grid">
        <section><h4>해금</h4>${rows}</section>
        <section><h4>승천</h4>${asc}<p class="muted small">${D.WIN_FLOOR}층 보스를 쓰러뜨리면 그 직업의 다음 승천 단계가 열립니다. 단계는 누적됩니다.</p><ol class="asc-list">${ascList}</ol></section>
        <section><h4>승천 보상</h4><p class="muted small">고른 승천 단계까지의 보상을 그 판에서 전부 받습니다. 높이 오를수록 적도, 나도 강해집니다.</p>${D.ASC_REWARDS.map(r => `<div class="unlock-row on"><span class="u-icon">${r.level}</span><b>${r.name}</b><small>${r.desc}</small></div>`).join('')}</section>
      </div>
      <div class="bottom-actions"><button class="btn" data-act="title">뒤로</button></div>
    </div>`;
  }

  // ───────── 모달 ─────────
  function openModal(html) {
    $modal.innerHTML = `<div class="modal-back" data-act="closeModal"><div class="modal" data-stop>${html}</div></div>`;
  }
  function closeModal() { $modal.innerHTML = ''; S.pick = null; }

  function openDeckPicker(opt, done, excludeNew) {
    const p = S.run.player;
    const isCard = opt.item.type === 'card';
    const newUid = excludeNew ? Math.max(...p.deck.map(c => c.uid)) : -1;
    const newCard = isCard ? `<section><h4>새 카드</h4><div class="hand">${cardHtml(G.makeCard(opt.cardId), null, { cls: 'static' })}</div></section>` : '';
    openModal(`<button class="btn small modal-close" data-act="closeModal">취소</button>
      <h3>${opt.item.icon} ${opt.item.name}</h3>
      <p class="sub">${isCard ? '덱에서 교체할 카드를 고르세요. (덱은 항상 9장)' : `${opt.item.desc} — 강화할 카드를 고르세요.`}</p>
      ${newCard}
      <section><h4>현재 덱</h4><div class="hand">${p.deck.filter(c => c.uid !== newUid).map(c => cardHtml(c, null, { act: 'pickCard', cls: 'pickable' })).join('')}</div></section>`);
    S.pick = { opt, done };
  }

  function openDeck() {
    const p = S.run.player;
    const cls = D.CLASS_MAP[S.run.classId];
    const relics = p.relics.map(id => D.ITEMS.find(i => i.id === id)).map(it => `<span class="tag">${it.icon} ${it.name} <small>${it.desc}</small></span>`).join('') || '<span class="tag">없음</span>';
    const passives = p.passives.map(id => D.PASSIVES.find(x => x.id === id)).map(x => `<span class="tag">✦ ${x.name} <small>${x.desc}</small></span>`).join('') || '<span class="tag">없음</span>';
    const stat = (k, v) => `<div><span>${k}</span><b>${v}</b></div>`;
    openModal(`<button class="btn small modal-close" data-act="closeModal">닫기</button>
      <h3>${cls.icon} ${cls.name}</h3>
      <p class="sub">${S.run.floor}층 · ${D.REGION_MAP[S.run.regionId].name} · 특성 「${cls.trait.name}」 ${cls.trait.desc}</p>
      <section><h4>능력치</h4><div class="stat-grid">
        ${stat('체력', `${p.hp}/${p.maxHp}`)}${stat('은화', S.run.gold)}${stat('턴당 코스트', p.energy)}${stat('손패', p.handSize)}${S.run.asc ? stat('승천', S.run.asc) : ''}
        ${stat('주사위 위력', '+' + p.basePower)}${stat('최소값', '+' + p.diceMin)}${stat('최대값', '+' + p.diceMax)}
        ${stat('피해 감소', p.dmgReduce)}${stat('흡혈', Math.round(p.lifesteal * 100) + '%')}${stat('승리 회복', p.winHeal)}
      </div></section>
      <section><h4>빛의 가호</h4><div class="tag-list">${passives}</div></section>
      <section><h4>유물</h4><div class="tag-list">${relics}</div></section>
      <section><h4>덱 (9장)</h4><div class="hand">${p.deck.map(c => cardHtml(c, p, { cls: 'static' })).join('')}</div></section>`);
  }

  function openPile(which) {
    const p = S.battle.player;
    const list = (which === 'draw' ? p.drawPile.slice() : p.discard.slice())
      .sort((a, c) => G.cardDef(a).cost - G.cardDef(c).cost);
    openModal(`<button class="btn small modal-close" data-act="closeModal">닫기</button>
      <h3>${which === 'draw' ? '뽑을 카드 더미' : '버린 카드 더미'} (${list.length}장)</h3>
      <p class="sub">${which === 'draw' ? '순서는 섞여 있어 코스트 순으로 보여줍니다. 더미가 비면 버린 카드를 섞어 다시 뽑습니다.' : '턴이 끝나면 쓴 카드와 남은 손패가 모두 여기로 옵니다.'}</p>
      <div class="hand">${list.map(c => cardHtml(c, p, { cls: 'static' })).join('') || '<p class="sub">비어 있습니다.</p>'}</div>`);
  }

  function openEnemyInfo() {
    const e = S.battle.enemy;
    openModal(`<button class="btn small modal-close" data-act="closeModal">닫기</button>
      <div class="enemy-head">${art('monsters', e.defId, e.icon, 'enemy-art')}<div><h3>${e.name}</h3><p class="sub">${e.desc}</p></div></div>
      <section><h4>내성 — 해당 유형의 공격 주사위로 때리면 피해 배율이 적용됩니다</h4>${resRow(e)}</section>
      ${e.signature ? `<section><h4>고유 스킬 (3턴마다 추가 사용)</h4><div class="hand">${cardHtml(e.signature, e, { cls: 'static' })}</div></section>` : ''}
      <section><h4>덱 (9장)</h4><div class="hand">${e.deck.map(c => cardHtml(c, e, { cls: 'static' })).join('')}</div></section>`);
  }

  function openHowto() {
    const st = Object.values(D.STATUS_INFO).map(s => `<li>${s.icon} <b>${s.name}</b> — ${s.desc}</li>`).join('');
    openModal(`<button class="btn small modal-close" data-act="closeModal">닫기</button>
      <div class="howto">
      <h3>게임 방법</h3>
      <p>카드를 뽑아 스킬을 얻고, <b>운명 주사위</b>로 합을 겨뤄 층을 오르는 다크 판타지 로그라이크입니다.</p>
      <h4>전투 순서</h4>
      <ol>
        <li>매 턴 9장짜리 덱에서 5장을 뽑습니다. 적도 자기 덱에서 카드를 뽑고, 머리 위의 <b>의도</b>로 이번 턴에 낼 카드를 보여줍니다.</li>
        <li>턴당 코스트(직업마다 8~13)가 허락하는 만큼 손패의 카드를 냅니다. 손패의 카드를 <b>끌어서</b> 대진의 원하는 줄에 놓으면 같은 줄의 적 카드와 합을 겨루고, 적 카드가 없는 줄에 놓으면 일방 공격이 됩니다. 대진의 카드는 끌어서 다른 줄로 옮기거나 손패로 되돌릴 수 있습니다. (카드를 그냥 누르면 첫 빈 줄에 들어갑니다.)</li>
        <li><b>턴 종료</b>를 누르면 전투 시작 효과(회복, 힘, 보호 등)가 먼저 적용되고, 줄마다 합이 진행됩니다.</li>
        <li>턴이 끝나면 남은 손패는 모두 버리고, 다음 턴에 새로 5장을 뽑습니다.</li>
      </ol>
      <h4>운명 주사위 합</h4>
      <ul>
        <li>카드마다 주사위가 1~5개 있습니다. 양쪽 맨 앞 주사위를 굴려 높은 쪽이 합에서 이깁니다.</li>
        <li><b>진 주사위만 파괴</b>됩니다. 이긴 주사위는 남아서 상대의 다음 주사위와 다시 굴립니다. 비기면 둘 다 다시 굴립니다.</li>
        <li>합이 끝나기 전에는 피해가 없습니다. 한쪽 주사위가 모두 파괴되면 합이 끝나고, <b>남은 쪽이 남은 공격 주사위를 다시 굴려 그 값만큼 공격</b>합니다.</li>
        <li>공격 주사위(⚔참격 ➶관통 ⚒타격)만 피해를 줍니다. ⛨방어·↯회피 주사위는 범위가 높아 합에서 상대 주사위를 부수는 데 쓰고, 회피는 비겨도 이깁니다.</li>
        <li>적 카드를 막지 않은 줄은 적의 모든 공격 주사위에 맞습니다.</li>
        <li>줄 가운데의 <b>우세/균형/열세</b>와 가함/받음 수치는 그 줄의 예상 피해입니다.</li>
      </ul>
      <h4>공격 유형과 내성</h4>
      <p>적마다 참격·관통·타격 내성이 다릅니다: 치명 ×2, 약점 ×1.5, 보통 ×1, 인내 ×0.5. 손패의 주사위 테두리가 초록이면 약점, 빨강이면 인내입니다.</p>
      <h4>직업</h4>
      <ul>${D.CLASSES.map(c => `<li>${c.icon} <b>${c.name}</b> (${c.weapon}) — ${c.trait.name}: ${c.trait.desc}</li>`).join('')}</ul>
      <ul>
        <li>🗡️ 방랑검사: 출혈은 합·공격에서 공격 주사위를 굴릴 때마다 터지고 1/3 줄어듭니다. 검사가 건 출혈이 6 이상이면 <b>과다출혈</b>이 되어 어떤 주사위를 굴려도 터지고, 보호와 피해 감소를 무시합니다.</li>
        <li>🕊️ 전령: 카드마다 속성이 있습니다. 적에게 같은 속성이 걸려 있으면 적중할 때 효과가 터지고 단계가 오릅니다. ${Object.values(D.ELEMENTS).map(e => `${e.icon} ${e.name}: ${e.desc}`).join(' / ')}. 다른 속성에 맞으면 그 속성으로 바뀝니다.</li>
        <li>🛡️ 중기병: <b>강타</b>는 적중 시 주사위 값의 1/n을 내성·보호 무시 고정 피해로 더 줍니다. <b>파열</b>이 걸린 적은 맞을 때마다 수치만큼 추가 피해를 입고 수치가 1/3 줄어듭니다.</li>
      </ul>
      <h4>승천 · 해금</h4>
      <ul>
        <li>${D.WIN_FLOOR}층 보스를 쓰러뜨리면 순례 완수입니다. 완수할 때마다 그 직업의 승천 단계가 하나 열리고, 직업 선택에서 단계를 골라 더 어렵게 도전할 수 있습니다.</li>
        <li>보스 처치·층 도달·완수 횟수에 따라 직업, 카드, 유물, 가호가 열립니다. 타이틀의 해금 · 승천에서 확인하세요.</li>
        <li>승천은 하이 리스크 · 하이 리턴입니다. 고른 단계까지의 <b>승천 보상</b>을 그 판에서 전부 받습니다: ${D.ASC_REWARDS.map(r => `${r.level} ${r.name}`).join(' · ')}.</li>
      </ul>
      <h4>상태이상</h4>
      <ul>${st}</ul>
      <h4>지도</h4>
      <ul>
        <li>지역마다 5층짜리 지도가 있습니다. 1·2·4층은 갈림길에서 칸을 고르고, 3층은 중간 보스, 5층은 보스입니다.</li>
        <li>⚔ 전투 / ? 사건(선택지가 있는 짧은 사건) / 🔥 모닥불(회복 또는 카드 단련) / 📦 보물(유물 1개)</li>
        <li>물약은 벨트에 3개까지 보관하고, 전투 중에는 상단 바에서 눌러 씁니다. 회복 물약은 지도에서도 쓸 수 있습니다.</li>
        <li>진행은 지도 화면에서 자동 저장됩니다. 타이틀의 <b>이어하기</b>로 이어갑니다.</li>
        <li>👁 관전을 켜면 턴이 자동으로 진행되어 전투를 지켜볼 수 있습니다.</li>
      </ul>
      <h4>층, 지역, 상점</h4>
      <ul>
        <li>전투에서 이길 때마다 은화를 얻고, 전리품 3개 중 하나를 고릅니다.</li>
        <li>3층에 중간 보스, 이후 5층마다(8, 13, …) 중간 보스가 나옵니다.</li>
        <li>5층마다(5, 10, …) 지역 보스가 나옵니다. 보스를 쓰러뜨리면 <b>상점</b>이 열리고, 이어서 다음 지역을 고릅니다.</li>
        <li>상점 위쪽에는 최하급 기본 물품 3개가 늘 있고, 아래쪽에는 일반~전설 물건 5개가 무작위로 나옵니다. 층이 높을수록 높은 등급이 잘 나옵니다.</li>
        <li>중간 보스와 보스는 전용 카드 3장과, 3턴마다 추가로 쓰는 고유 스킬을 가집니다.</li>
      </ul>
      <h4>빛</h4>
      <p>순례를 시작할 때 빛 ${D.LIGHT_POINTS}로 가호(패시브)를 고릅니다. 가호의 비용은 1~4이고, 비용 4 가호는 보스를 처치하면 열립니다.</p>
      </div>`);
  }

  // ───────── 입력 ─────────
  function onAction(act, el) {
    switch (act) {
      case 'new': S.classId = S.classId && isUnlocked('class', S.classId) ? S.classId : 'swordsman'; S.unlockedBefore = unlocked(); go('cls'); break;
      case 'title': go('title'); break;
      case 'howto': openHowto(); break;
      case 'pickClass': S.classId = el.dataset.id; S.asc = Math.min(S.asc, G.ascensionOf(S.meta, S.classId)); render(); break;
      case 'toLight': if (S.classId) { S.light = []; go('light'); } break;
      case 'light': {
        const id = el.dataset.id;
        if (S.light.includes(id)) S.light = S.light.filter(x => x !== id);
        else {
          const p = D.PASSIVES.find(x => x.id === id);
          if (p.cost >= 4 && !isUnlocked('passive', 4)) { toast('보스를 1회 처치하면 열립니다.'); return; }
          if (G.passiveCost(S.light) + p.cost > G.lightPoints(S.asc)) { toast('빛이 부족합니다.'); return; }
          S.light.push(id);
        }
        render();
        break;
      }
      case 'begin':
        S.run = G.createRun(S.classId, S.light, { asc: S.asc, unlocked: unlocked(), ascReached: G.ascensionOf(S.meta, S.classId) });
        G.startRegion(S.run, rng);
        sfx('click');
        if (G.hasAscReward(S.run, 'legacy')) { S.rewards = G.startRelicChoices(S.run, rng); go('startRelic'); }
        else go('map');
        break;
      case 'startRelicPick': {
        const opt = S.rewards[Number(el.dataset.i)];
        G.applyReward(S.run, opt);
        sfx('coin');
        toast(`${opt.item.name} 획득`);
        go('map');
        break;
      }
      case 'restFull':
        openDeckPicker({ item: { icon: '🔥', name: '완전한 휴식', type: 'upgrade', desc: `카드 1장의 모든 주사위 +${D.MAP.restUpgrade.ub}` } }, uid => {
          const r = G.rest(S.run, 'full', uid);
          if (!r.ok) { toast(r.msg); return; }
          sfx('heal');
          toast(`체력 ${r.amount} 회복 · 카드 단련 · 다음 전투 힘 2, 보호 2`);
          leaveNode();
        });
        break;
      case 'card': {
        if (S.busy) return;
        const res = G.assignCard(S.battle, Number(el.dataset.uid), S.targetRow);
        if (!res.ok) { toast(res.msg); return; }
        sfx('card');
        S.targetRow = null;
        S.confirmEmpty = false;
        render();
        break;
      }
      case 'slot': {
        if (S.busy) return;
        const i = Number(el.dataset.row);
        if (S.battle.plan[i] != null) { G.unassign(S.battle, i); S.targetRow = null; }
        else S.targetRow = S.targetRow === i ? null : i;
        render();
        break;
      }
      case 'auto': if (!S.busy) { autoPlan(); S.targetRow = null; render(); } break;
      case 'clear': if (!S.busy) { S.battle.plan = S.battle.plan.map(() => null); S.targetRow = null; render(); } break;
      case 'fight': fight(); break;
      case 'speed':
        S.speed = S.speed === 1 ? 2 : S.speed === 2 ? 4 : 1;
        store.set('speed', S.speed);
        el.textContent = `속도 ×${S.speed}`;
        break;
      case 'deck': openDeck(); break;
      case 'log': {
        S.logOpen = !S.logOpen;
        const d = document.getElementById('log-drawer');
        if (d) { d.classList.toggle('open', S.logOpen); const box = document.getElementById('log-lines'); box.scrollTop = box.scrollHeight; }
        break;
      }
      case 'enemyInfo': openEnemyInfo(); break;
      case 'pile': openPile(el.dataset.which); break;
      case 'reward': pickReward(Number(el.dataset.i)); break;
      case 'skipReward': afterReward(); break;
      case 'buy': buyEntry(el.dataset.key); break;
      case 'leaveShop': afterShop(); break;
      case 'pickCard': {
        if (!S.pick) return;
        const { done } = S.pick;
        S.pick = null;
        done(Number(el.dataset.uid));
        break;
      }
      case 'region':
        G.chooseRegion(S.run, el.dataset.id);
        S.pendingBoss = false;
        G.startRegion(S.run, rng);
        sfx('click');
        go('map');
        break;
      case 'node': goNode(Number(el.dataset.col), Number(el.dataset.idx)); break;
      case 'restHeal': { const r = G.rest(S.run, 'heal'); sfx('heal'); toast(`체력 ${r.amount} 회복`); leaveNode(); break; }
      case 'restUpgrade':
        openDeckPicker({ item: { icon: '⚒️', name: '단련', type: 'upgrade', desc: `카드 1장의 모든 주사위 +${D.MAP.restUpgrade.ub}` } }, uid => {
          G.rest(S.run, 'upgrade', uid);
          sfx('coin');
          toast('카드를 단련했습니다.');
          leaveNode();
        });
        break;
      case 'eventChoice': chooseEvent(Number(el.dataset.i)); break;
      case 'eventDone': leaveNode(); break;
      case 'potion': {
        const i = Number(el.dataset.i);
        const inBattle = S.screen === 'battle' && S.battle && !S.battle.outcome;
        if (inBattle && S.busy) return;
        const r = G.usePotion(S.run, i, inBattle ? S.battle : null);
        if (!r.ok) { toast(r.msg); return; }
        sfx('potion');
        toast(`${r.item.name} 사용`);
        if (inBattle) { if (r.item.potion.heal) log('good', `${r.item.name}: 체력 회복`); else log('good', `${r.item.name}: 이번 턴 효과 적용`); }
        render();
        break;
      }
      case 'unlocks': go('unlocks'); break;
      case 'ascUp': S.asc++; render(); break;
      case 'ascDown': S.asc--; render(); break;
      case 'continueRun':
        S.shop = G.rollShop(S.run, rng);
        saveRun('shop');
        go('shop');
        break;
      case 'continue': {
        const saved = store.get('run', null);
        const run = saved && G.loadRun(saved.json);
        if (!run) { toast('저장된 진행이 없습니다.'); clearSave(); render(); return; }
        S.run = run;
        S.pendingBoss = false;
        S.unlockedBefore = unlocked();
        sfx('click');
        if (saved.screen === 'shop') { S.shop = G.rollShop(S.run, rng); go('shop'); }
        else if (saved.screen === 'region') { S.regions = G.regionChoices(S.run, rng); go('region'); }
        else go('map');
        break;
      }
      case 'mute':
        SFX.setMuted(!SFX.muted);
        store.set('muted', SFX.muted);
        render();
        break;
      case 'autoBattle':
        S.autoBattle = !S.autoBattle;
        render();
        if (S.autoBattle) autoStep();
        break;
      case 'closeModal': closeModal(); break;
      default: break;
    }
  }

  // ───────── 드래그로 카드 내기 ─────────
  // 손패의 카드를 끌어서 대진의 줄에 놓는다. 대진의 카드는 다른 줄로 옮기거나(놓인 카드와 자리 바꿈) 손패 영역에 놓아 되돌린다.
  const drag = { active: false, moved: false, uid: null, fromRow: null, src: null, ghost: null, pid: null, x0: 0, y0: 0, ox: 0, oy: 0, over: null, suppressClick: false };
  function dragTarget(ev) {
    const el = document.elementFromPoint(ev.clientX, ev.clientY);
    if (!el) return null;
    const slot = el.closest('.slot.p');
    if (slot) return { row: Number(slot.dataset.row) };
    if (drag.fromRow != null && el.closest('.hand-zone')) return { hand: true };
    return null;
  }
  function setOver(t) {
    const key = t ? (t.hand ? 'hand' : t.row) : null;
    if (key === drag.over) return;
    drag.over = key;
    document.querySelectorAll('.row.over').forEach(r => r.classList.remove('over'));
    const hz = document.querySelector('.hand-zone');
    if (hz) hz.classList.toggle('over-hand', key === 'hand');
    if (typeof key === 'number') { const r = document.querySelector(`.row[data-row="${key}"]`); if (r) r.classList.add('over'); }
  }
  function startGhost(ev) {
    const src = drag.src;
    const rect = src.getBoundingClientRect();
    const ghost = src.cloneNode(true);
    ghost.classList.add('drag-ghost');
    ghost.classList.remove('playable', 'drawn');
    ghost.style.width = rect.width + 'px';
    ghost.style.height = rect.height + 'px';
    ghost.removeAttribute('data-act');
    document.body.appendChild(ghost);
    drag.ghost = ghost;
    drag.ox = ev.clientX - rect.left;
    drag.oy = ev.clientY - rect.top;
    src.classList.add('drag-src');
    document.body.classList.add('dragging');
    document.querySelectorAll('.row').forEach(r => r.classList.add('droppable'));
    moveGhost(ev);
  }
  function moveGhost(ev) {
    if (!drag.ghost) return;
    drag.ghost.style.setProperty('--x', `${ev.clientX - drag.ox}px`);
    drag.ghost.style.setProperty('--y', `${ev.clientY - drag.oy}px`);
  }
  function cleanupDrag() {
    if (drag.ghost) drag.ghost.remove();
    if (drag.src) drag.src.classList.remove('drag-src');
    document.body.classList.remove('dragging');
    document.querySelectorAll('.row.droppable, .row.over').forEach(r => r.classList.remove('droppable', 'over'));
    const hz = document.querySelector('.hand-zone');
    if (hz) hz.classList.remove('over-hand');
    Object.assign(drag, { active: false, moved: false, uid: null, fromRow: null, src: null, ghost: null, pid: null, over: null });
  }
  // 놓기: 손패 → 줄 / 줄 → 줄(자리 바꿈) / 줄 → 손패
  function dropCard(t) {
    const b = S.battle;
    if (!t) return false;
    if (t.hand) { if (drag.fromRow == null) return false; G.unassign(b, drag.fromRow); return true; }
    const row = t.row;
    if (row == null || row < 0 || row >= b.rows) return false;
    if (drag.fromRow != null) {
      if (row === drag.fromRow) return false;
      const other = b.plan[row];
      b.plan[row] = drag.uid;
      b.plan[drag.fromRow] = other == null ? null : other;
      return true;
    }
    const other = b.plan[row];
    if (other != null) G.unassign(b, row);
    const res = G.assignCard(b, drag.uid, row);
    if (!res.ok) { if (other != null) b.plan[row] = other; toast(res.msg); return false; }
    if (res.row !== row) { // 빈 줄이 아니었다면 원하는 줄로 옮긴다
      b.plan[res.row] = null; b.plan[row] = drag.uid;
    }
    return true;
  }
  document.addEventListener('pointerdown', ev => {
    if (S.screen !== 'battle' || S.busy || $modal.innerHTML) return;
    if (ev.pointerType === 'mouse' && ev.button !== 0) return;
    const card = ev.target.closest('.hand.fan .card.playable');
    const slot = !card && ev.target.closest('.slot.p');
    let uid = null;
    let fromRow = null;
    let src = null;
    if (card) { uid = Number(card.dataset.uid); src = card; }
    else if (slot) {
      fromRow = Number(slot.dataset.row);
      uid = S.battle.plan[fromRow];
      if (uid == null) return;
      src = slot.querySelector('.chip') || slot;
    } else return;
    Object.assign(drag, { active: true, moved: false, uid, fromRow, src, pid: ev.pointerId, x0: ev.clientX, y0: ev.clientY, over: null });
  });
  document.addEventListener('pointermove', ev => {
    if (!drag.active || ev.pointerId !== drag.pid) return;
    if (!drag.moved) {
      if (Math.hypot(ev.clientX - drag.x0, ev.clientY - drag.y0) < 8) return;
      drag.moved = true;
      startGhost(ev);
    }
    ev.preventDefault();
    moveGhost(ev);
    setOver(dragTarget(ev));
  }, { passive: false });
  document.addEventListener('pointerup', ev => {
    if (!drag.active || ev.pointerId !== drag.pid) return;
    if (!drag.moved) { cleanupDrag(); return; } // 그냥 누른 것: click 처리에 맡긴다
    const ok = !S.busy && dropCard(dragTarget(ev));
    cleanupDrag();
    drag.suppressClick = true;
    if (ok) { sfx('card'); S.targetRow = null; S.confirmEmpty = false; render(); }
  });
  document.addEventListener('pointercancel', ev => { if (drag.active && ev.pointerId === drag.pid) cleanupDrag(); });

  document.addEventListener('click', ev => {
    SFX.unlock();
    if (drag.suppressClick) { drag.suppressClick = false; ev.preventDefault(); return; }
    const el = ev.target.closest('[data-act]');
    if (!el) return;
    // 모달 내부 클릭이 배경 닫기로 번지지 않도록
    if (el.dataset.act === 'closeModal' && el.classList.contains('modal-back') && ev.target.closest('[data-stop]')) return;
    onAction(el.dataset.act, el);
  });

  document.addEventListener('keydown', ev => {
    if ($modal.innerHTML) { if (ev.key === 'Escape') closeModal(); return; }
    if (S.screen !== 'battle' || S.busy) return;
    if (ev.key === 'Enter') { ev.preventDefault(); fight(); return; }
    const n = Number(ev.key);
    if (n >= 1 && n <= 9) {
      const b = S.battle;
      const c = b.player.hand.filter(h => b.plan.indexOf(h.uid) < 0)[n - 1];
      if (c) onAction('card', { dataset: { uid: String(c.uid) } });
    }
  });

  render();
})();
