/*
 * Fate Five Dungeon — 화면 / 입력 처리
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
    pick: null, // 카드 선택 모달 진행 중인 { opt, done }
  };

  const sleep = ms => new Promise(r => setTimeout(r, ms / S.speed));
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

  function cardHtml(c, owner, o) {
    o = o || {};
    const s = G.cardStats(c);
    const dice = owner ? G.effective(owner, c).dice : s.dice.map(d => Object.assign({ atk: D.DICE[d.t].atk }, d));
    const fx = G.fxText(s.fx);
    const attrs = [
      o.act ? `data-act="${o.act}" data-uid="${c.uid}"` : '',
      o.slot ? `data-slot="${o.slot}"` : '',
    ].join(' ');
    return `<div class="card ${s.rarity} ${o.cls || ''}" ${attrs}>
      <div class="card-cost">${s.sig ? '★' : s.cost}</div>
      <div class="card-name">${s.name}${s.upgraded ? ' <span class="plus">+</span>' : ''}</div>
      <div class="card-dice">${diceHtml(dice, o.vs)}</div>
      <div class="card-fx">${fx || '&nbsp;'}</div>
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
    if (c.status.burn) out.push(tag('burn', c.status.burn));
    ['might', 'weak', 'endure', 'protect', 'fragile'].forEach(k => {
      if (c.status[k]) out.push(tag(k, c.status[k]));
      if (c.status[k + 'Next']) out.push(tag(k, c.status[k + 'Next'], true));
    });
    return out.join('');
  }

  function hpBar(c, side) {
    const pct = Math.max(0, c.hp) / c.maxHp * 100;
    return `<div class="hpbar" id="hp-${side}"><div class="fill${pct <= 30 ? ' low' : ''}" style="width:${pct}%"></div><span>${Math.max(0, c.hp)} / ${c.maxHp}</span></div>`;
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
  function setPose(side, pose) {
    const img = document.querySelector(`#u-${side} .fig-img.sprite`);
    if (!img) return;
    const id = img.dataset.sprite;
    img.src = sprite(id, pose) || sprite(id, 'idle');
    clearTimeout(poseTimers[side]);
    if (pose !== 'idle') poseTimers[side] = setTimeout(() => { img.src = sprite(id, 'idle'); }, 650 / S.speed);
  }
  // 공격 시 상대 쪽으로 돌진하는 움직임
  function lunge(side) {
    const fig = document.querySelector(`#u-${side} .figure`);
    if (!fig) return;
    fig.classList.remove('lunge');
    void fig.offsetWidth;
    fig.classList.add('lunge');
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
    }[S.screen];
    $app.innerHTML = fn();
    if (S.screen === 'battle') afterBattleRender();
  }

  // ───────── 타이틀 ─────────
  function renderTitle() {
    const best = store.get('best', null);
    return `<div class="screen title-screen">
      <div class="title-emblem">✦</div>
      <h1 class="logo">FATE FIVE<span>DUNGEON</span></h1>
      <p class="tagline">운명의 주사위를 굴려라.<br>다섯 개의 저주받은 땅이 순례자를 기다린다.</p>
      <div class="title-actions">
        <button class="btn primary big" data-act="new">새로운 순례</button>
        <button class="btn" data-act="howto">게임 방법</button>
      </div>
      <div class="record">${best ? `최고 기록: <b>${best.floor}층</b> (${best.cls ? best.cls + ' · ' : ''}${best.region})` : '아직 기록이 없습니다'}</div>
    </div>`;
  }

  // ───────── 직업 선택 ─────────
  function renderClass() {
    const cards = D.CLASSES.map(c => {
      const starter = c.starter.map(id => D.CARDS[id].name);
      return `<div class="class-card${S.classId === c.id ? ' sel' : ''}" data-act="pickClass" data-id="${c.id}">
        ${art('classes', c.id, c.icon, 'class-art')}
        <div class="class-name">${c.name}</div>
        <div class="class-role">${c.role} · ${c.weapon}</div>
        <p class="class-desc">${c.desc}</p>
        <div class="class-stats"><span>체력 <b>${c.hp}</b></span><span>특성 <b>${c.trait.name}</b></span></div>
        <div class="class-trait">${c.trait.desc}</div>
        <div class="class-deck">시작 덱: ${starter.join(', ')}</div>
      </div>`;
    }).join('');
    return `<div class="screen class-screen">
      <h2 class="screen-title">직업 선택</h2>
      <p class="screen-sub">순례를 떠날 자를 고르세요. 직업마다 쓰는 무기와 얻는 카드가 다릅니다.</p>
      <div class="class-grid">${cards}</div>
      <div class="bottom-actions">
        <button class="btn" data-act="title">뒤로</button>
        <button class="btn primary big" data-act="toLight" ${S.classId ? '' : 'disabled'}>다음 — 빛의 선택</button>
      </div>
    </div>`;
  }

  // ───────── 빛(패시브) 선택 ─────────
  function renderLight() {
    const used = G.passiveCost(S.light);
    const left = D.LIGHT_POINTS - used;
    const pips = Array.from({ length: D.LIGHT_POINTS }, (_, i) => `<i class="light-pip${i < left ? ' on' : ''}"></i>`).join('');
    const cards = D.PASSIVES.map(p => {
      const sel = S.light.includes(p.id);
      const locked = !sel && p.cost > left;
      return `<button class="passive${sel ? ' sel' : ''}${locked ? ' locked' : ''}" data-act="light" data-id="${p.id}">
        <div class="p-cost">${'◆'.repeat(p.cost)}<span>${'◇'.repeat(4 - p.cost)}</span></div>
        <div class="p-name">${p.name}</div>
        <div class="p-desc">${p.desc}</div>
      </button>`;
    }).join('');
    const cls = D.CLASS_MAP[S.classId];
    return `<div class="screen light-screen">
      <h2 class="screen-title">빛의 선택</h2>
      <p class="screen-sub">${cls.icon} ${cls.name} — 빛 ${D.LIGHT_POINTS}을 나누어 가호를 고르세요. 강한 가호일수록 많은 빛이 듭니다.</p>
      <div class="light-meter">${pips}</div>
      <div class="light-left">남은 빛 ${left} / ${D.LIGHT_POINTS}</div>
      <div class="passive-grid">${cards}</div>
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

  function renderBattle() {
    const b = S.battle;
    const run = S.run;
    const p = b.player;
    const e = b.enemy;
    const region = D.REGION_MAP[run.regionId];
    const spent = G.planCost(b);
    const planned = G.planCount(b);

    const lanes = Array.from({ length: b.rows }, (_, i) => {
      const uid = b.plan[i];
      const pc = uid != null ? p.hand.find(h => h.uid === uid) : null;
      const ec = b.enemyPlan[i] || null;
      const target = S.targetRow === i;
      const pSlot = pc ? chipHtml(pc, p, e) : `<div class="empty">${planned >= p.slots ? '슬롯 없음' : target ? '놓을 카드를 고르세요' : '빈 슬롯'}</div>`;
      const eSlot = ec ? chipHtml(ec, e, p) : '<div class="empty">—</div>';
      return `<div class="row${target ? ' target' : ''}" data-row="${i}">
        <div class="slot p" data-act="slot" data-row="${i}">${pSlot}</div>
        <div class="clash-mid">${oddsHtml(b, i)}</div>
        <div class="slot e">${eSlot}</div>
      </div>`;
    }).join('');

    const hand = p.hand.map((c, idx) => {
      const slot = b.plan.indexOf(c.uid);
      const cant = slot < 0 && (planned >= p.slots || spent + G.cardDef(c).cost > p.energy);
      return cardHtml(c, p, { act: 'card', vs: e, cls: `${slot >= 0 ? 'planned' : ''}${cant ? ' cant' : ''}`, slot: slot >= 0 ? `${slot + 1}번 줄` : `${idx + 1}` });
    }).join('');

    const energyPips = Array.from({ length: p.energy }, (_, i) => `<i class="pip ${i < p.energy - spent ? 'on' : 'spent'}"></i>`).join('');
    const sigSoon = e.signature && G.isSigTurn(b, b.turn + 1);
    const sigNow = e.signature && G.isSigTurn(b, b.turn);
    const sig = sigNow ? `<div class="sig-warn">★ 이번 턴 고유 스킬 「${e.signature.sig.name}」</div>`
      : sigSoon ? `<div class="sig-warn soon">⚠ 다음 턴 고유 스킬 「${e.signature.sig.name}」 준비 중</div>` : '';
    const last = S.logs.length ? S.logs[S.logs.length - 1].t : '';

    return `<div class="screen battle-screen" style="--region:${region.color}">
      <header class="topbar">
        <div class="tb-stage">
          <span class="region-name">${region.icon} ${region.name}</span>
          <span class="floor-no">${run.floor}F</span>
          <span class="badge ${b.kind}">${KIND_NAME[b.kind]}</span>
        </div>
        <div class="floor-track" title="이번 구간 5개 층">${floorTrack(run.floor)}</div>
        <div class="tb-meta"><span class="turn-no">${b.turn}턴</span>${goldHtml()}</div>
        <div class="tb-menu">
          <button class="btn small" data-act="deck">덱 · 유물</button>
          <button class="btn small" data-act="log">기록</button>
          <button class="btn small" data-act="speed">속도 ×${S.speed}</button>
          <button class="btn small" data-act="howto" aria-label="게임 방법">?</button>
        </div>
      </header>

      <main class="stage">
        <section class="fighter player" id="u-p">
          <div class="fighter-hud">
            <div class="unit-name">${p.icon} ${p.name}</div>
            ${hpBar(p, 'p')}
            <div class="statuses" id="st-p">${statusHtml(p)}</div>
          </div>
          <div class="figure">${figureHtml('classes', p.classId, p.icon)}</div>
        </section>

        <section class="lanes">
          ${sig}
          <div class="arena-head"><span>나의 카드</span><span>합</span><span>적의 카드</span></div>
          ${lanes}
        </section>

        <section class="fighter enemy" id="u-e">
          <div class="fighter-hud">
            <div class="unit-name">${e.name} <span class="badge ${b.kind}">${KIND_NAME[b.kind]}</span></div>
            ${hpBar(e, 'e')}
            ${resRow(e)}
            <div class="statuses" id="st-e">${statusHtml(e)}</div>
          </div>
          <div class="figure" data-act="enemyInfo" title="적 정보 보기">${figureHtml('monsters', e.defId, e.icon)}</div>
        </section>

        <div class="ticker" id="ticker" data-act="log" title="전체 기록 보기">${last}</div>
      </main>

      <footer class="dock">
        <div class="dock-info">
          <div class="energy-row"><span class="energy-label">코스트</span><div class="pips">${energyPips}</div><span class="energy-num">${p.energy - spent}/${p.energy}</span></div>
          <div class="piles">카드 ${planned}/${p.slots} · 덱 ${p.drawPile.length} · 버림 ${p.discard.length}<span class="kbd-hint"> · 숫자키 1~9, Enter</span></div>
        </div>
        <div class="hand">${hand || '<div class="empty">손패가 없습니다</div>'}</div>
        <div class="dock-actions">
          <button class="btn" data-act="auto" ${S.busy ? 'disabled' : ''}>자동 배치</button>
          <button class="btn" data-act="clear" ${S.busy ? 'disabled' : ''}>초기화</button>
          <button class="btn primary big" data-act="fight" ${S.busy ? 'disabled' : ''}>전투 시작</button>
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
      el.querySelector('span').textContent = `${v} / ${c.maxHp}`;
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

  function shake(side) {
    const unit = document.querySelector(`#u-${side} .figure`) || document.getElementById('u-' + side);
    if (!unit) return;
    unit.classList.remove('shake');
    void unit.offsetWidth;
    unit.classList.add('shake');
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
          await sleep(200);
          break;
        case 'row': {
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
          log(ev.side === 'p' ? 'e' : 'p', `${info.icon} ${nm(ev.side)}에게 ${info.name} ${ev.amount}${ev.next ? ' (다음 턴)' : ''}`);
          await sleep(60);
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
          await sleep(600);
          if (pw) { markBroken(ee); setPose('p', D.DICE[pd.t].atk ? 'attack' : 'defend'); }
          if (ew) { markBroken(pe); setPose('e', D.DICE[ed.t].atk ? 'attack' : 'defend'); }
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
          setPose(ev.side, 'attack');
          lunge(ev.side);
          const d = (ev.side === 'p' ? rowP : rowE).dice[ev.k];
          log(ev.side, `  ${DIE_WORD(d.t)} ${ev.value}`);
          await sleep(300);
          if (el) el.classList.add('used');
          break;
        }
        case 'hit': {
          const tgt = other(ev.side);
          shake(tgt);
          setPose(tgt, 'hit');
          floatText(tgt, '-' + ev.dmg, 'dmg');
          setHp(ev.hp);
          const extra = [];
          if (ev.res !== 1) extra.push(`${D.RES_NAME[ev.res]} ×${ev.res}`);
          log(ev.side, `  ${nm(tgt)}에게 <b>${ev.dmg}</b> 피해${extra.length ? ` (${extra.join(', ')})` : ''}`);
          await sleep(330);
          break;
        }
        case 'proc': {
          const info = D.STATUS_INFO[ev.key];
          floatText(ev.side, `${info.icon}-${ev.amount}`, 'proc');
          setHp(ev.hp);
          log(ev.side === 'p' ? 'e' : 'p', `${info.icon} ${nm(ev.side)}: ${info.name}으로 ${ev.amount} 피해`);
          await sleep(280);
          break;
        }
        case 'heal':
          floatText(ev.side, '+' + ev.amount, 'heal');
          setHp(ev.hp);
          log('good', `${nm(ev.side)} 체력 ${ev.amount} 회복`);
          await sleep(200);
          break;
        case 'undying':
          log('good', `✦ 불굴! ${nm(ev.side)}이(가) 체력 1로 버텼습니다`);
          await sleep(400);
          break;
        default:
          break;
      }
    }
  }

  function banner(text, cls) {
    const el = document.createElement('div');
    el.className = 'banner ' + cls;
    el.innerHTML = `<div>${text}</div>`;
    document.body.appendChild(el);
    return new Promise(r => setTimeout(() => { el.remove(); r(); }, 1100));
  }

  async function fight() {
    const b = S.battle;
    if (S.busy || !b || b.outcome) return;
    if (G.planCount(b) === 0 && b.enemyPlan.length && !S.confirmEmpty) {
      S.confirmEmpty = true;
      toast('카드를 배치하지 않았습니다. 한 번 더 누르면 그대로 진행합니다.');
      return;
    }
    S.confirmEmpty = false;
    S.targetRow = null;
    S.busy = true;
    document.querySelectorAll('[data-act="fight"],[data-act="auto"],[data-act="clear"]').forEach(x => { x.disabled = true; });
    document.querySelectorAll('.row').forEach(r => r.classList.remove('target'));
    log('sys', `━━ ${b.turn}턴 전투 ━━`);
    const events = G.resolveTurn(b, rng);
    await play(events);
    S.busy = false;
    if (b.outcome === 'win') {
      log('big', `${b.enemy.name} 처치!`);
      await banner('VICTORY', 'win');
      const res = G.finishBattle(S.run, b, rng);
      S.pendingBoss = res.boss;
      S.lastGold = res.gold;
      S.rewards = G.rollRewards(S.run, b.kind, rng);
      go('reward');
    } else if (b.outcome === 'lose') {
      await banner('YOU DIED', 'lose');
      saveRecord();
      go('over');
    } else {
      G.startTurn(b, rng);
      render();
    }
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
    const next = G.isShopFloor(S.run.floor) ? ' 다음은 상점입니다.' : '';
    return `<div class="screen reward-screen">
      <h2 class="screen-title">전리품</h2>
      <p class="screen-sub">${S.run.floor}층 돌파 · 은화 +${S.lastGold}. 하나를 선택하세요.${S.pendingBoss ? ' 보스를 쓰러뜨려 체력을 회복했습니다.' : ''}${next}</p>
      <div class="reward-grid">${opts}</div>
      <p class="status-line">체력 <b>${p.hp} / ${p.maxHp}</b> · ${goldHtml()} · 코스트 <b>${p.energy}</b> · 슬롯 <b>${p.slots}</b></p>
      <div class="bottom-actions"><button class="btn small" data-act="deck">덱 · 유물 보기</button><button class="btn small" data-act="skipReward">건너뛰기</button></div>
    </div>`;
  }

  function pickReward(i) {
    const opt = S.rewards[i];
    const done = () => { toast(`${opt.item.name} 획득`); afterReward(); };
    if (G.needsCardTarget(opt)) { openDeckPicker(opt, uid => { G.applyReward(S.run, opt, uid); done(); }); return; }
    G.applyReward(S.run, opt);
    done();
  }

  function afterReward() {
    closeModal();
    if (G.isShopFloor(S.run.floor)) {
      S.shop = G.rollShop(S.run, rng);
      go('shop');
    } else {
      afterShop();
    }
  }

  function afterShop() {
    if (S.pendingBoss) {
      S.regions = G.regionChoices(S.run, rng);
      go('region');
    } else {
      nextFloor();
    }
  }

  function nextFloor() {
    S.run.floor++;
    startBattle();
  }

  function startBattle() {
    S.battle = G.startBattle(S.run, rng);
    preloadSprites(S.run.classId);
    preloadSprites(S.battle.enemy.defId);
    S.logs = [];
    S.targetRow = null;
    const e = S.battle.enemy;
    log('sys', `${S.run.floor}층 — ${KIND_NAME[S.battle.kind]} 「${e.name}」 출현`);
    go('battle');
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
      <h2 class="screen-title">떠돌이 상인</h2>
      <p class="screen-sub">5층마다 나타나는 상인입니다. 은화로 물건을 사세요. 층이 높을수록 좋은 물건이 들어옵니다.</p>
      <p class="status-line">${goldHtml()} · 체력 <b>${p.hp} / ${p.maxHp}</b></p>
      <h3 class="shop-head">기본 물품 <small>언제나 있음 · 여러 번 구매 가능</small></h3>
      <div class="shop-grid fixed">${S.shop.fixed.map((e, i) => shopItem(e, 'f' + i)).join('')}</div>
      <h3 class="shop-head">오늘의 물건 <small>일반 ~ 전설 · 각 1개</small></h3>
      <div class="shop-grid">${S.shop.random.map((e, i) => shopItem(e, 'r' + i)).join('')}</div>
      <div class="bottom-actions"><button class="btn small" data-act="deck">덱 · 유물 보기</button><button class="btn primary big" data-act="leaveShop">상점 떠나기</button></div>
    </div>`;
  }

  function buyEntry(key) {
    const entry = key[0] === 'f' ? S.shop.fixed[Number(key.slice(1))] : S.shop.random[Number(key.slice(1))];
    if (entry.sold || S.run.gold < entry.price) { toast(entry.sold ? '이미 판매된 물건입니다.' : '은화가 부족합니다.'); return; }
    const done = uid => {
      const res = G.buy(S.run, entry, uid);
      closeModal();
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

  // ───────── 모달 ─────────
  function openModal(html) {
    $modal.innerHTML = `<div class="modal-back" data-act="closeModal"><div class="modal" data-stop>${html}</div></div>`;
  }
  function closeModal() { $modal.innerHTML = ''; S.pick = null; }

  function openDeckPicker(opt, done) {
    const p = S.run.player;
    const isCard = opt.item.type === 'card';
    const newCard = isCard ? `<section><h4>새 카드</h4><div class="hand">${cardHtml(G.makeCard(opt.cardId), null, { cls: 'static' })}</div></section>` : '';
    openModal(`<button class="btn small modal-close" data-act="closeModal">취소</button>
      <h3>${opt.item.icon} ${opt.item.name}</h3>
      <p class="sub">${isCard ? '덱에서 교체할 카드를 고르세요. (덱은 항상 9장)' : `${opt.item.desc} — 강화할 카드를 고르세요.`}</p>
      ${newCard}
      <section><h4>현재 덱</h4><div class="hand">${p.deck.map(c => cardHtml(c, null, { act: 'pickCard', cls: 'pickable' })).join('')}</div></section>`);
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
        ${stat('체력', `${p.hp}/${p.maxHp}`)}${stat('은화', S.run.gold)}${stat('턴당 코스트', p.energy)}${stat('카드 슬롯', p.slots)}${stat('손패', p.handSize)}
        ${stat('주사위 위력', '+' + p.basePower)}${stat('최소값', '+' + p.diceMin)}${stat('최대값', '+' + p.diceMax)}
        ${stat('피해 감소', p.dmgReduce)}${stat('흡혈', Math.round(p.lifesteal * 100) + '%')}${stat('승리 회복', p.winHeal)}
      </div></section>
      <section><h4>빛의 가호</h4><div class="tag-list">${passives}</div></section>
      <section><h4>유물</h4><div class="tag-list">${relics}</div></section>
      <section><h4>덱 (9장)</h4><div class="hand">${p.deck.map(c => cardHtml(c, p, { cls: 'static' })).join('')}</div></section>`);
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
        <li>매 턴 9장짜리 덱에서 손패를 채웁니다. 적도 자기 덱에서 카드를 뽑아 미리 공개합니다.</li>
        <li>턴당 코스트(기본 9) 안에서 카드를 슬롯에 배치합니다. 같은 줄의 적 카드와 합을 겨룹니다.</li>
        <li><b>전투 시작</b>을 누르면 전투 시작 효과(회복, 힘, 보호 등)가 먼저 적용되고, 줄마다 합이 진행됩니다.</li>
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
      <h4>상태이상</h4>
      <ul>${st}</ul>
      <h4>층, 지역, 상점</h4>
      <ul>
        <li>전투에서 이길 때마다 은화를 얻고, 전리품 3개 중 하나를 고릅니다.</li>
        <li>3층에 중간 보스, 이후 5층마다(8, 13, …) 중간 보스가 나옵니다.</li>
        <li>5층마다(5, 10, …) 지역 보스가 나옵니다. 보스를 쓰러뜨리면 <b>상점</b>이 열리고, 이어서 다음 지역을 고릅니다.</li>
        <li>상점 위쪽에는 최하급 기본 물품 3개가 늘 있고, 아래쪽에는 일반~전설 물건 5개가 무작위로 나옵니다. 층이 높을수록 높은 등급이 잘 나옵니다.</li>
        <li>중간 보스와 보스는 전용 카드 3장과, 3턴마다 추가로 쓰는 고유 스킬을 가집니다.</li>
      </ul>
      <h4>빛</h4>
      <p>순례를 시작할 때 빛 ${D.LIGHT_POINTS}로 가호(패시브)를 고릅니다. 가호의 비용은 1~4입니다.</p>
      </div>`);
  }

  // ───────── 입력 ─────────
  function onAction(act, el) {
    switch (act) {
      case 'new': S.classId = S.classId || null; go('cls'); break;
      case 'title': go('title'); break;
      case 'howto': openHowto(); break;
      case 'pickClass': S.classId = el.dataset.id; render(); break;
      case 'toLight': if (S.classId) { S.light = []; go('light'); } break;
      case 'light': {
        const id = el.dataset.id;
        if (S.light.includes(id)) S.light = S.light.filter(x => x !== id);
        else {
          const p = D.PASSIVES.find(x => x.id === id);
          if (G.passiveCost(S.light) + p.cost > D.LIGHT_POINTS) { toast('빛이 부족합니다.'); return; }
          S.light.push(id);
        }
        render();
        break;
      }
      case 'begin':
        S.run = G.createRun(S.classId, S.light);
        startBattle();
        break;
      case 'card': {
        if (S.busy) return;
        const res = G.assignCard(S.battle, Number(el.dataset.uid), S.targetRow);
        if (!res.ok) { toast(res.msg); return; }
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
        nextFloor();
        break;
      case 'closeModal': closeModal(); break;
      default: break;
    }
  }

  document.addEventListener('click', ev => {
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
      const c = S.battle.player.hand[n - 1];
      if (c) onAction('card', { dataset: { uid: String(c.uid) } });
    }
  });

  render();
})();
