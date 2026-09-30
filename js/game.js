/*
 * Fate Five Dungeon — 화면 / 입력 처리
 * 규칙은 engine.js(window.FFD), 데이터는 data.js(window.FFD_DATA)에 있다.
 */
(function () {
  'use strict';
  const D = window.FFD_DATA;
  const G = window.FFD;
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
    light: [],
    rewards: null,
    pendingBoss: false,
    regions: null,
    logs: [],
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

  function typeTag(type) {
    const t = D.TYPES[type];
    return `<span class="type t-${type}" title="${t.name}">${t.icon} ${t.name}</span>`;
  }

  function resTag(mul, always) {
    if (mul == null || (!always && mul === 1)) return '';
    const cls = mul >= 2 ? 'r2' : mul >= 1.5 ? 'r15' : mul >= 1 ? 'r1' : 'r05';
    return `<span class="res ${cls}">${D.RES_NAME[mul] || ''} ×${mul}</span>`;
  }

  const coinsHtml = n => '<i class="coin"></i>'.repeat(n);

  function cardHtml(c, owner, o) {
    o = o || {};
    const s = G.cardStats(c);
    const v = owner ? G.effective(owner, c) : { base: s.base, cp: s.cp, coins: s.coins, min: s.base, max: s.base + s.coins * s.cp };
    const baseCls = v.base > s.base ? 'up' : v.base < s.base ? 'down' : '';
    const cpCls = v.cp > s.cp ? 'up' : '';
    const fx = G.fxText(s.fx);
    const attrs = [
      o.act ? `data-act="${o.act}" data-uid="${c.uid}"` : '',
      o.slot ? `data-slot="${o.slot}"` : '',
    ].join(' ');
    return `<div class="card ${s.rarity} ${o.cls || ''}" ${attrs}>
      <div class="card-cost">${s.sig ? '★' : s.cost}</div>
      <div class="card-name">${s.name}${s.upgraded ? ' <span class="plus">+</span>' : ''}</div>
      <div class="card-meta">${typeTag(s.type)}${o.vs ? resTag(o.vs.res[s.type]) : ''}</div>
      <div class="card-stats">
        <div><b class="${baseCls}">${v.base}</b><small>기본</small></div>
        <div><b>${v.coins}</b><small>코인</small></div>
        <div><b class="${cpCls}">+${v.cp}</b><small>코인당</small></div>
      </div>
      <div class="coins">${coinsHtml(v.coins)}</div>
      <div class="card-fx">${fx || '&nbsp;'}</div>
      <div class="card-range">합 위력 ${v.min} ~ ${v.max}</div>
    </div>`;
  }

  function chipHtml(c, owner, target) {
    const s = G.cardStats(c);
    const v = G.effective(owner, c, { target });
    const fx = G.fxText(s.fx);
    return `<div class="chip ${s.rarity}">
      <div class="chip-name">${s.sig ? '★ ' : ''}${s.name}</div>
      <div class="chip-stats">${typeTag(s.type)} ${v.base} + ${v.coins}×${v.cp} ${resTag(target.res[s.type])}</div>
      ${fx ? `<div class="chip-fx">${fx}</div>` : ''}
      <div class="coins">${coinsHtml(v.coins)}</div>
    </div>`;
  }

  function statusHtml(c) {
    const out = [];
    const tag = (k, val, next) => {
      const info = D.STATUS_INFO[k];
      return `<span class="st${next ? ' next' : ''}" title="${info.name}: ${info.desc}">${info.icon} ${info.name} ${val}${next ? ' (다음 턴)' : ''}</span>`;
    };
    ['bleed', 'burn', 'rupture', 'poise'].forEach(k => {
      const s = c.status[k];
      if (s.c > 0) out.push(tag(k, `${s.p}<small>/${s.c}회</small>`));
    });
    ['paralyze', 'weak', 'might', 'fragile'].forEach(k => {
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
    return `<div class="res-row">${D.TYPE_ORDER.map(t => `<span>${D.TYPES[t].icon} ${D.TYPES[t].name} ${resTag(c.res[t], true)}</span>`).join('')}</div>`;
  }

  // ───────── 화면 전환 ─────────
  function go(screen) {
    S.screen = screen;
    render();
    window.scrollTo(0, 0);
  }

  function render() {
    const fn = { title: renderTitle, light: renderLight, battle: renderBattle, reward: renderReward, region: renderRegion, over: renderOver }[S.screen];
    $app.innerHTML = fn();
    if (S.screen === 'battle') afterBattleRender();
  }

  // ───────── 타이틀 ─────────
  function renderTitle() {
    const best = store.get('best', null);
    return `<div class="screen title-screen">
      <div class="title-emblem">✦</div>
      <h1 class="logo">FATE FIVE<span>DUNGEON</span></h1>
      <p class="tagline">운명의 코인을 던져라.<br>다섯 개의 저주받은 땅이 순례자를 기다린다.</p>
      <div class="title-actions">
        <button class="btn primary big" data-act="new">새로운 순례</button>
        <button class="btn" data-act="howto">게임 방법</button>
      </div>
      <div class="record">${best ? `최고 기록: <b>${best.floor}층</b> (${best.region})` : '아직 기록이 없습니다'}</div>
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
    return `<div class="screen light-screen">
      <h2 class="screen-title">빛의 선택</h2>
      <p class="screen-sub">순례를 떠나기 전, 빛 ${D.LIGHT_POINTS}을 나누어 가호를 고르세요. 강한 가호일수록 많은 빛이 듭니다.</p>
      <div class="light-meter">${pips}</div>
      <div class="light-left">남은 빛 ${left} / ${D.LIGHT_POINTS}</div>
      <div class="passive-grid">${cards}</div>
      <div class="bottom-actions">
        <button class="btn" data-act="title">뒤로</button>
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
      return `<span class="ft ${k}${f < floor ? ' done' : ''}${f === floor ? ' cur' : ''}" title="${f}층 · ${KIND_NAME[k]}">${KIND_ICON[k]}</span>`;
    }).join('');
  }

  function oddsHtml(b, i) {
    const pCard = b.plan[i] != null;
    const eCard = !!b.enemyPlan[i];
    if (pCard && eCard) {
      const o = G.clashOdds(b, i, 300);
      const cls = o >= 0.6 ? 'adv' : o <= 0.4 ? 'dis' : 'even';
      const word = o >= 0.6 ? '우세' : o <= 0.4 ? '열세' : '균형';
      return `<div class="odds ${cls}">${word}<br>${Math.round(o * 100)}%</div>`;
    }
    if (pCard) return '<div class="odds adv">일방<br>공격</div>';
    if (eCard) return '<div class="odds dis">무방비</div>';
    return '';
  }

  function renderBattle() {
    const b = S.battle;
    const run = S.run;
    const p = b.player;
    const e = b.enemy;
    const region = D.REGION_MAP[run.regionId];
    const spent = G.planCost(b);
    const planned = G.planCount(b);

    const rows = Array.from({ length: b.rows }, (_, i) => {
      const uid = b.plan[i];
      const pc = uid != null ? p.hand.find(h => h.uid === uid) : null;
      const ec = b.enemyPlan[i] || null;
      const target = S.targetRow === i;
      const pSlot = pc ? chipHtml(pc, p, e) : `<div class="empty">${planned >= p.slots ? '슬롯 없음' : target ? '여기에 배치할 카드를 고르세요' : '빈 슬롯<br><small>눌러서 대상 지정</small>'}</div>`;
      const eSlot = ec ? chipHtml(ec, e, p) : '<div class="empty">—</div>';
      return `<div class="row${target ? ' target' : ''}" data-row="${i}">
        <div class="slot p" data-act="slot" data-row="${i}">${pSlot}</div>
        <div class="clash-mid"><div class="pow p"></div>${oddsHtml(b, i)}<div class="pow e"></div></div>
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

    return `<div class="screen battle-screen" style="--region:${region.color}">
      <div class="battle-main">
        <header class="hud">
          <div class="hud-left">
            <span class="region-name">${region.icon} ${region.name}</span>
            <span class="floor-no">${run.floor}F</span>
            <span class="badge ${b.kind}">${KIND_NAME[b.kind]}</span>
            <span class="turn-no">${b.turn}턴</span>
          </div>
          <div class="floor-track">${floorTrack(run.floor)}</div>
          <div class="hud-right">
            <button class="btn small" data-act="deck">덱 · 유물</button>
            <button class="btn small" data-act="speed">속도 ×${S.speed}</button>
            <button class="btn small" data-act="howto">?</button>
          </div>
        </header>

        <section class="unit enemy" id="u-e">
          <div class="portrait" data-act="enemyInfo" title="적 정보">${e.icon}</div>
          <div class="unit-info">
            <div class="unit-name">${e.name} <span class="badge ${b.kind}">${KIND_NAME[b.kind]}</span> <button class="btn small ghost" data-act="enemyInfo">덱 보기</button></div>
            ${hpBar(e, 'e')}
            ${resRow(e)}
            <div class="statuses" id="st-e">${statusHtml(e)}</div>
            <div class="unit-desc">${e.desc}</div>
            ${sigNow ? `<div class="sig-warn">★ 이번 턴 고유 스킬 「${e.signature.sig.name}」 사용!</div>` : sigSoon ? `<div class="sig-warn">⚠ 다음 턴 고유 스킬 「${e.signature.sig.name}」 준비 중</div>` : ''}
          </div>
        </section>

        <section class="arena">
          <div class="arena-head"><span>순례자의 스킬</span><span>합</span><span>${e.name}의 스킬</span></div>
          ${rows}
        </section>

        <div class="player-bar">
          <section class="unit player" id="u-p">
            <div class="portrait">🕯️</div>
            <div class="unit-info">
              <div class="unit-name">${p.name}</div>
              ${hpBar(p, 'p')}
              <div class="statuses" id="st-p">${statusHtml(p)}</div>
            </div>
          </section>
          <section class="resources">
            <div class="energy-row"><span class="energy-label">코스트</span><div class="pips">${energyPips}</div><span class="energy-num">${p.energy - spent}/${p.energy}</span></div>
            <div class="piles">스킬 ${planned}/${p.slots} · 뽑을 카드 ${p.drawPile.length} · 버린 카드 ${p.discard.length} · 앞면 확률 ${Math.round(Math.min(0.95, p.headChance) * 100)}%</div>
          </section>
        </div>

        <section class="hand-wrap">
          <div class="hand-title"><span>손패 — 카드를 눌러 슬롯에 배치 (다시 누르면 해제)</span><span class="kbd-hint">숫자키 1~9 · Enter 전투 시작</span></div>
          <div class="hand">${hand || '<div class="empty">손패가 없습니다</div>'}</div>
        </section>

        <div class="battle-actions">
          <button class="btn" data-act="auto" ${S.busy ? 'disabled' : ''}>자동 배치</button>
          <button class="btn" data-act="clear" ${S.busy ? 'disabled' : ''}>초기화</button>
          <button class="btn primary big" data-act="fight" ${S.busy ? 'disabled' : ''}>전투 시작</button>
        </div>
      </div>
      <aside class="log"><div class="log-title">전투 기록</div><div class="log-lines" id="log-lines"></div></aside>
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
    const unit = document.getElementById('u-' + side);
    if (!unit) return;
    const f = document.createElement('div');
    f.className = 'float ' + cls;
    f.textContent = text;
    f.style.left = (35 + Math.random() * 30) + '%';
    unit.appendChild(f);
    setTimeout(() => f.remove(), 950);
  }

  function shake(side) {
    const unit = document.getElementById('u-' + side);
    if (!unit) return;
    unit.classList.remove('shake');
    void unit.offsetWidth;
    unit.classList.add('shake');
  }

  const rowEl = i => document.querySelector(`.row[data-row="${i}"]`);
  const coinEls = (row, side) => (row ? Array.from(row.querySelectorAll(`.slot.${side} .coin`)) : []);

  function paintFlips(row, side, flips, alive) {
    coinEls(row, side).forEach((el, i) => {
      el.classList.remove('h', 't', 'z', 'flip');
      if (i >= alive) { el.classList.add('x'); return; }
      void el.offsetWidth;
      el.classList.add('flip', flips[i] === 'H' ? 'h' : flips[i] === 'Z' ? 'z' : 't');
    });
  }

  function setPow(row, side, val, state) {
    if (!row) return;
    const el = row.querySelector('.pow.' + side);
    el.textContent = val == null ? '' : val;
    el.classList.remove('win', 'lose');
    if (state) el.classList.add(state);
  }

  async function play(events) {
    let row = null;
    for (const ev of events) {
      switch (ev.t) {
        case 'row': {
          document.querySelectorAll('.row').forEach(r => r.classList.remove('active'));
          row = rowEl(ev.row);
          if (row) { row.classList.add('active'); row.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
          log('sys', `— ${ev.row + 1}번 줄 —`);
          await sleep(300);
          break;
        }
        case 'selfDmg':
          floatText(ev.side, '-' + ev.amount, 'dmg');
          setHp(ev.hp);
          log(ev.side, `${nm(ev.side)}: 체력 ${ev.amount} 소모`);
          await sleep(250);
          break;
        case 'status': {
          const info = D.STATUS_INFO[ev.key];
          const val = ev.c != null ? `${ev.amount} → ${ev.p}/${ev.c}회` : ev.amount;
          log(ev.side === 'p' ? 'e' : 'p', `${info.icon} ${nm(ev.side)}에게 ${info.name} ${val}${ev.next ? ' (다음 턴)' : ''}`);
          await sleep(60);
          break;
        }
        case 'clash': {
          paintFlips(row, 'p', ev.pf, ev.pc);
          paintFlips(row, 'e', ev.ef, ev.ec);
          setPow(row, 'p', ev.pp, ev.win === 'p' ? 'win' : ev.win === 'e' ? 'lose' : '');
          setPow(row, 'e', ev.ep, ev.win === 'e' ? 'win' : ev.win === 'p' ? 'lose' : '');
          const res = ev.win === 'tie' ? '무승부 — 다시 합' : ev.win === 'p' ? '승리' : '패배';
          log('sys', `합 ${ev.pp} : ${ev.ep} → ${res}`);
          await sleep(700);
          break;
        }
        case 'break': {
          const el = coinEls(row, ev.side)[ev.left];
          if (el) { el.classList.remove('h', 't', 'z'); el.classList.add('x'); }
          await sleep(220);
          break;
        }
        case 'fate':
          log('good', `✦ 운명 역행! ${nm(ev.side)}의 코인 파괴를 막았습니다`);
          await sleep(300);
          break;
        case 'clashWin':
          log(ev.side === 'p' ? 'big' : 'bad', `${nm(ev.side)} 합 승리! (${ev.rounds}합) 남은 코인 ${ev.left}개로 공격`);
          await sleep(300);
          break;
        case 'attack': {
          setPow(row, other(ev.side), null);
          coinEls(row, ev.side).forEach(el => el.classList.remove('h', 't', 'z', 'flip'));
          log(ev.side, `${nm(ev.side)}의 「${ev.name}」 ${D.TYPES[ev.type].name} 공격 (코인 ${ev.coins}개)`);
          await sleep(250);
          break;
        }
        case 'hit': {
          const el = coinEls(row, ev.side)[ev.k];
          if (el) { el.classList.remove('h', 't', 'z', 'flip'); void el.offsetWidth; el.classList.add('flip', ev.face === 'H' ? 'h' : ev.face === 'Z' ? 'z' : 't'); }
          setPow(row, ev.side, ev.power, 'win');
          const tgt = other(ev.side);
          shake(tgt);
          floatText(tgt, (ev.crit ? '치명! ' : '') + '-' + ev.dmg, 'dmg');
          setHp(ev.hp);
          const extra = [ev.face === 'Z' ? '마비' : ev.face === 'H' ? '앞면' : '뒷면'];
          if (ev.res !== 1) extra.push(`${D.RES_NAME[ev.res]} ×${ev.res}`);
          if (ev.crit) extra.push('치명타');
          log(ev.side, `  코인 ${ev.k + 1}: 위력 ${ev.power} → <b>${ev.dmg}</b> 피해 (${extra.join(', ')})`);
          await sleep(430);
          break;
        }
        case 'proc': {
          const info = D.STATUS_INFO[ev.key];
          floatText(ev.side, `${info.icon}-${ev.amount}`, 'proc');
          setHp(ev.hp);
          log(ev.side === 'p' ? 'e' : 'p', `${info.icon} ${nm(ev.side)}: ${info.name} 발동, ${ev.amount} 피해`);
          await sleep(300);
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
      toast('스킬을 배치하지 않았습니다. 한 번 더 누르면 그대로 진행합니다.');
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
      S.pendingBoss = G.finishBattle(S.run, b);
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
  // (합 승률 × 내 기대 피해 − 패배 확률 × 적 기대 피해)가 가장 큰 배치를 고른다.
  function autoPlan() {
    const b = S.battle;
    const p = b.player;
    const e = b.enemy;
    const hand = p.hand;
    const rows = b.rows;
    const mine = hand.map(c => G.expectedDamage(p, c, e));
    const theirs = Array.from({ length: rows }, (_, r) => (b.enemyPlan[r] ? G.expectedDamage(e, b.enemyPlan[r], p) : 0));
    const odds = hand.map(c => Array.from({ length: rows }, (_, r) => (b.enemyPlan[r] ? G.pairOdds(b, c, b.enemyPlan[r], null, 120) : null)));
    let best = { v: -theirs.reduce((a, x) => a + x, 0), pick: [] };
    const used = new Array(hand.length).fill(false);
    const pick = new Array(rows).fill(-1);
    (function rec(r, count, cost) {
      if (r === rows) {
        let v = 0;
        for (let i = 0; i < rows; i++) {
          const h = pick[i];
          if (h < 0) v -= theirs[i];
          else if (odds[h][i] == null) v += mine[h];
          else v += odds[h][i] * mine[h] - (1 - odds[h][i]) * theirs[i];
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
  function renderReward() {
    const p = S.run.player;
    const opts = S.rewards.map((o, i) => {
      const it = o.item;
      const body = it.type === 'card'
        ? `<div class="reward-card">${cardHtml(G.makeCard(o.cardId), null, { cls: 'static' })}</div>`
        : `<div class="reward-icon">${it.icon}</div>`;
      return `<div class="reward ${it.rarity}" data-act="reward" data-i="${i}">
        <span class="rarity-tag ${it.rarity}">${D.RARITY_NAME[it.rarity]}</span>
        ${body}
        <div class="reward-name">${it.name}</div>
        <div class="reward-desc">${it.desc}</div>
      </div>`;
    }).join('');
    return `<div class="screen reward-screen">
      <h2 class="screen-title">전리품</h2>
      <p class="screen-sub">${S.run.floor}층 돌파. 하나를 선택하세요.${S.pendingBoss ? ' 보스를 쓰러뜨려 체력을 회복했습니다.' : ''}</p>
      <div class="reward-grid">${opts}</div>
      <p class="status-line">체력 <b>${p.hp} / ${p.maxHp}</b> · 코스트 <b>${p.energy}</b> · 슬롯 <b>${p.slots}</b></p>
      <div class="bottom-actions"><button class="btn small" data-act="deck">덱 · 유물 보기</button><button class="btn small" data-act="skipReward">건너뛰기</button></div>
    </div>`;
  }

  function pickReward(i) {
    const opt = S.rewards[i];
    if (G.needsCardTarget(opt)) {
      openDeckPicker(opt);
      return;
    }
    G.applyReward(S.run, opt);
    toast(`${opt.item.name} 획득`);
    afterReward();
  }

  function afterReward() {
    closeModal();
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
    S.logs = [];
    S.targetRow = null;
    const e = S.battle.enemy;
    log('sys', `${S.run.floor}층 — ${KIND_NAME[S.battle.kind]} 「${e.name}」 출현`);
    go('battle');
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
      <p class="screen-sub">보스를 쓰러뜨렸습니다. 순례를 이어갈 땅을 고르세요. (${S.run.floor + 1}층부터)</p>
      <div class="region-grid">${cards}</div>
    </div>`;
  }

  // ───────── 게임 오버 ─────────
  function saveRecord() {
    const best = store.get('best', null);
    const region = D.REGION_MAP[S.run.regionId].name;
    S.newRecord = !best || S.run.floor > best.floor;
    if (S.newRecord) store.set('best', { floor: S.run.floor, region });
  }

  function renderOver() {
    const run = S.run;
    const region = D.REGION_MAP[run.regionId];
    return `<div class="screen over-screen">
      <div class="title-emblem">✝</div>
      <h2 class="over-title">순례의 끝</h2>
      <p class="screen-sub">${region.icon} ${region.name}, ${run.floor}층에서 빛이 꺼졌습니다.${S.newRecord ? '<br><b class="gold">새로운 최고 기록!</b>' : ''}</p>
      <dl class="over-stats">
        <dt>도달 층</dt><dd>${run.floor}층</dd>
        <dt>처치한 적</dt><dd>${run.kills}</dd>
        <dt>쓰러뜨린 보스</dt><dd>${run.bossKills}</dd>
        <dt>모은 유물</dt><dd>${run.player.relics.length}개</dd>
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
  function closeModal() { $modal.innerHTML = ''; }

  function openDeckPicker(opt) {
    const p = S.run.player;
    const isCard = opt.item.type === 'card';
    S.pickOpt = opt;
    const newCard = isCard ? `<section><h4>새 카드</h4><div class="hand">${cardHtml(G.makeCard(opt.cardId), null, { cls: 'static' })}</div></section>` : '';
    openModal(`<button class="btn small modal-close" data-act="closeModal">취소</button>
      <h3>${opt.item.icon} ${opt.item.name}</h3>
      <p class="sub">${isCard ? '덱에서 교체할 카드를 고르세요. (덱은 항상 9장)' : `${opt.item.desc} — 강화할 카드를 고르세요.`}</p>
      ${newCard}
      <section><h4>현재 덱</h4><div class="hand">${p.deck.map(c => cardHtml(c, null, { act: 'pickCard', cls: 'pickable' })).join('')}</div></section>`);
  }

  function openDeck() {
    const p = S.run.player;
    const relics = p.relics.map(id => D.ITEMS.find(i => i.id === id)).map(it => `<span class="tag">${it.icon} ${it.name} <small>${it.desc}</small></span>`).join('') || '<span class="tag">없음</span>';
    const passives = p.passives.map(id => D.PASSIVES.find(x => x.id === id)).map(x => `<span class="tag">✦ ${x.name} <small>${x.desc}</small></span>`).join('') || '<span class="tag">없음</span>';
    const stat = (k, v) => `<div><span>${k}</span><b>${v}</b></div>`;
    openModal(`<button class="btn small modal-close" data-act="closeModal">닫기</button>
      <h3>순례자</h3>
      <p class="sub">${S.run.floor}층 · ${D.REGION_MAP[S.run.regionId].name}</p>
      <section><h4>능력치</h4><div class="stat-grid">
        ${stat('체력', `${p.hp}/${p.maxHp}`)}${stat('턴당 코스트', p.energy)}${stat('스킬 슬롯', p.slots)}${stat('손패', p.handSize)}
        ${stat('앞면 확률', Math.round(Math.min(0.95, p.headChance) * 100) + '%')}${stat('기본 위력', '+' + p.basePower)}${stat('코인 위력', '+' + p.coinPower)}
        ${stat('피해 감소', p.dmgReduce)}${stat('흡혈', Math.round(p.lifesteal * 100) + '%')}${stat('승리 회복', p.winHeal)}
      </div></section>
      <section><h4>빛의 가호</h4><div class="tag-list">${passives}</div></section>
      <section><h4>유물</h4><div class="tag-list">${relics}</div></section>
      <section><h4>덱 (9장)</h4><div class="hand">${p.deck.map(c => cardHtml(c, S.battle && S.screen === 'battle' ? p : null, { cls: 'static' })).join('')}</div></section>`);
  }

  function openEnemyInfo() {
    const e = S.battle.enemy;
    openModal(`<button class="btn small modal-close" data-act="closeModal">닫기</button>
      <h3>${e.icon} ${e.name}</h3>
      <p class="sub">${e.desc}</p>
      <section><h4>내성 — 해당 유형으로 공격하면 피해 배율이 적용됩니다</h4>${resRow(e)}</section>
      ${e.signature ? `<section><h4>고유 스킬 (3턴마다 추가 사용)</h4><div class="hand">${cardHtml(e.signature, e, { cls: 'static' })}</div></section>` : ''}
      <section><h4>덱 (9장)</h4><div class="hand">${e.deck.map(c => cardHtml(c, e, { cls: 'static' })).join('')}</div></section>`);
  }

  function openHowto() {
    const st = Object.values(D.STATUS_INFO).map(s => `<li>${s.icon} <b>${s.name}</b> — ${s.desc}</li>`).join('');
    openModal(`<button class="btn small modal-close" data-act="closeModal">닫기</button>
      <div class="howto">
      <h3>게임 방법</h3>
      <p>카드를 뽑아 스킬을 얻고, <b>림버스 컴퍼니식 합</b>으로 적을 쓰러뜨리며 층을 오르는 다크 판타지 로그라이크입니다.</p>
      <h4>전투 순서</h4>
      <ol>
        <li>매 턴 9장짜리 덱에서 손패를 채웁니다. 적도 자기 덱에서 스킬을 뽑아 공개합니다.</li>
        <li>턴당 코스트(기본 9) 안에서 스킬 카드를 슬롯에 배치합니다. 같은 줄의 적 스킬과 합을 겨룹니다.</li>
        <li><b>전투 시작</b>을 누르면 줄마다 합이 진행됩니다.</li>
      </ol>
      <h4>합 (Clash)</h4>
      <ul>
        <li>합 위력 = 기본 위력 + (앞면이 나온 코인 수 × 코인 위력). 코인 앞면 확률은 기본 50%입니다.</li>
        <li>위력이 낮은 쪽은 코인 1개가 파괴됩니다. 한쪽 코인이 모두 파괴될 때까지 반복합니다.</li>
        <li>합에서 이긴 쪽은 <b>남은 코인</b>으로 일방 공격합니다. 코인을 하나씩 다시 던지며 앞면마다 위력이 누적되고, 코인마다 그 위력만큼 피해를 줍니다.</li>
        <li>상대 스킬이 없는 줄은 곧바로 일방 공격합니다. 적 스킬을 막지 않으면 그대로 맞습니다.</li>
        <li>코인이 많을수록 합에서 오래 버팁니다. 줄 가운데의 <b>우세/균형/열세</b>는 예상 합 승률입니다.</li>
      </ul>
      <h4>공격 유형과 내성</h4>
      <p>스킬은 ⚔ 참격 / ➶ 관통 / ⚒ 타격 중 하나입니다. 적마다 내성이 달라 피해에 배율이 붙습니다: 치명 ×2, 약점 ×1.5, 보통 ×1, 인내 ×0.5.</p>
      <h4>상태이상</h4>
      <ul>${st}</ul>
      <h4>층과 지역</h4>
      <ul>
        <li>전투에서 이길 때마다 전리품 3개 중 하나를 고릅니다.</li>
        <li>3층에 중간 보스, 이후 5층마다(8, 13, …) 중간 보스가 나옵니다.</li>
        <li>5층마다(5, 10, …) 지역 보스가 나오고, 보스를 쓰러뜨리면 다음 지역을 고릅니다.</li>
        <li>중간 보스와 보스는 전용 카드 3장과, 3턴마다 추가로 쓰는 강력한 고유 스킬을 가집니다.</li>
      </ul>
      <h4>빛</h4>
      <p>순례를 시작할 때 빛 15로 가호(패시브)를 고릅니다. 가호의 비용은 1~4입니다.</p>
      </div>`);
  }

  // ───────── 입력 ─────────
  function onAction(act, el) {
    switch (act) {
      case 'new': S.light = []; go('light'); break;
      case 'title': go('title'); break;
      case 'howto': openHowto(); break;
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
        S.run = G.createRun(S.light);
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
      case 'enemyInfo': openEnemyInfo(); break;
      case 'reward': pickReward(Number(el.dataset.i)); break;
      case 'skipReward': afterReward(); break;
      case 'pickCard': {
        const opt = S.pickOpt;
        G.applyReward(S.run, opt, Number(el.dataset.uid));
        toast(opt.item.type === 'card' ? '카드를 교체했습니다.' : '카드를 강화했습니다.');
        afterReward();
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
