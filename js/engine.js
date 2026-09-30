/*
 * Fate Five Dungeon — 게임 규칙 엔진
 * 화면과 분리된 순수 로직. 브라우저(window.FFD)와 Node(require) 양쪽에서 동작한다.
 *
 * 전투는 림버스 컴퍼니의 합(Clash) 방식을 따른다.
 *   1) startTurn   : 양쪽이 손패를 채우고, 적이 사용할 스킬을 공개한다.
 *   2) assignCard  : 플레이어가 코스트 안에서 스킬 카드를 슬롯에 배치한다.
 *   3) resolveTurn : 같은 줄의 스킬끼리 합을 진행한다.
 *                    남은 코인을 모두 던져 합 위력(기본 위력 + 앞면 수 × 코인 위력)을 비교하고,
 *                    진 쪽은 코인 1개가 파괴된다. 한쪽 코인이 모두 파괴될 때까지 반복한 뒤
 *                    이긴 쪽이 남은 코인으로 일방 공격한다. 코인마다 다시 던져 위력이 누적된다.
 *                    상대가 없는 줄의 스킬은 곧바로 일방 공격한다.
 *   4) 턴 종료     : 화상 등 상태이상 처리 후, 어느 한쪽 체력이 0이 될 때까지 반복.
 */
(function (root) {
  'use strict';
  const D = (typeof module !== 'undefined' && module.exports) ? require('./data.js') : root.FFD_DATA;

  let uidSeq = 1;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const PC_KEYS = ['bleed', 'burn', 'rupture', 'poise'];      // 위력 + 횟수형
  const TURN_KEYS = ['paralyze', 'weak', 'might', 'fragile']; // 다음 턴에 적용되는 수치형

  function shuffle(arr, rng) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  const pick = (arr, rng) => arr[Math.floor(rng() * arr.length)];

  // ───────── 카드 ─────────
  function makeCard(id) { return { uid: uidSeq++, id, ub: 0, uc: 0, ucoins: 0 }; }
  function makeSigCard(def) { return { uid: uidSeq++, id: 'sig', sig: def, ub: 0, uc: 0, ucoins: 0 }; }
  function cardDef(c) { return c.sig || D.CARDS[c.id]; }

  // 카드 자체의 수치 (강화 포함, 사용자 보너스 제외)
  function cardStats(c) {
    const d = cardDef(c);
    return {
      name: d.name, type: d.type, cost: d.cost, rarity: d.rarity, fx: d.fx, sig: !!c.sig,
      base: d.base + c.ub, coins: d.coins + c.ucoins, cp: d.cp + c.uc,
      upgraded: c.ub + c.uc + c.ucoins > 0,
    };
  }

  function fxText(fx) {
    const t = [];
    if (fx.bleed) t.push(`적중 시 출혈 ${fx.bleed}`);
    if (fx.burn) t.push(`적중 시 화상 ${fx.burn}`);
    if (fx.rupture) t.push(`적중 시 파열 ${fx.rupture}`);
    if (fx.poise) t.push(`사용 시 호흡 ${fx.poise}`);
    if (fx.paralyze) t.push(`첫 적중 시 마비 ${fx.paralyze}`);
    if (fx.weak) t.push(`첫 적중 시 위력 감소 ${fx.weak}`);
    if (fx.fragile) t.push(`첫 적중 시 취약 ${fx.fragile}`);
    if (fx.might) t.push(`합 승리 시 위력 증가 ${fx.might}`);
    if (fx.heal) t.push(`첫 적중 시 체력 ${fx.heal} 회복`);
    if (fx.lifesteal) t.push(`피해의 ${Math.round(fx.lifesteal * 100)}% 흡혈`);
    if (fx.selfDmg) t.push(`사용 시 체력 ${fx.selfDmg} 소모`);
    if (fx.execute) t.push(`대상 체력 50% 이하면 위력 +${fx.execute}`);
    if (fx.headBonus) t.push(`앞면 확률 +${Math.round(fx.headBonus * 100)}%`);
    return t.join(' · ');
  }

  // ───────── 전투 참가자 ─────────
  function freshStatus() {
    const s = {};
    PC_KEYS.forEach(k => { s[k] = { p: 0, c: 0 }; });
    TURN_KEYS.forEach(k => { s[k] = 0; s[k + 'Next'] = 0; });
    return s;
  }

  function baseCombatant() {
    return {
      name: '', maxHp: 1, hp: 1, energy: 9, handSize: 5, slots: 2, headChance: 0.5,
      basePower: 0, coinPower: 0, dmgReduce: 0, lifesteal: 0, winHeal: 0,
      firstHitBleed: 0, firstHitBurn: 0, firstSkillBonus: 0, fateReverse: 0, undying: 0, regen: 0, startPoise: 0,
      res: { slash: 1, pierce: 1, blunt: 1 },
      deck: [], drawPile: [], hand: [], discard: [], status: freshStatus(), undyingUsed: false,
    };
  }

  function applyMods(c, mods) {
    Object.keys(mods).forEach(k => {
      const v = mods[k];
      if (k === 'maxHp') {
        c.maxHp = Math.max(10, c.maxHp + v);
        if (v > 0) c.hp += v;
        c.hp = clamp(c.hp, 1, c.maxHp);
      } else if (k === 'heal') {
        c.hp = Math.min(c.maxHp, c.hp + v);
      } else {
        c[k] = (c[k] || 0) + v;
      }
    });
  }

  // ───────── 런(한 판) ─────────
  function passiveCost(ids) {
    return ids.reduce((s, id) => s + D.PASSIVES.find(p => p.id === id).cost, 0);
  }

  function createRun(passiveIds) {
    if (passiveCost(passiveIds) > D.LIGHT_POINTS) throw new Error('빛 수치를 초과했습니다');
    const p = baseCombatant();
    p.isPlayer = true;
    p.name = '순례자';
    p.maxHp = p.hp = D.BALANCE.playerHp;
    p.passives = passiveIds.slice();
    p.relics = [];
    p.deck = D.STARTER_DECK.map(makeCard);
    passiveIds.forEach(id => applyMods(p, D.PASSIVES.find(x => x.id === id).mods));
    const start = D.REGIONS[0].id;
    return { floor: 1, regionId: start, visited: [start], player: p, lastMonster: null, kills: 0, bossKills: 0 };
  }

  // 3층 중간 보스, 이후 +5층마다 / 5층마다 보스
  function floorKind(f) {
    if (f % 5 === 0) return 'boss';
    if (f % 5 === 3) return 'midboss';
    return 'normal';
  }

  function makeEnemy(run, rng) {
    const region = D.REGION_MAP[run.regionId];
    const kind = floorKind(run.floor);
    let def;
    if (kind === 'normal') {
      const cands = region.monsters.filter(m => m.id !== run.lastMonster);
      def = pick(cands.length ? cands : region.monsters, rng);
    } else {
      def = region[kind];
    }
    const f = run.floor;
    const B = D.BALANCE;
    const e = baseCombatant();
    e.isPlayer = false;
    e.kind = kind;
    e.defId = def.id;
    e.name = def.name;
    e.icon = def.icon;
    e.desc = def.desc;
    e.maxHp = e.hp = Math.round(def.hp * B.enemyHpMul[kind] * (1 + B.hpPerFloor * (f - 1)));
    e.slots = Math.min(3, def.slots + (kind === 'normal' && f >= B.extraSlotFloor ? 1 : 0));
    e.basePower = B.enemyBasePower[kind] + Math.floor((f - 1) / B.powerEveryFloors);
    e.coinPower = Math.floor((f - 1) / B.coinPowerEveryFloors);
    if (def.res) e.res = { slash: def.res[0], pierce: def.res[1], blunt: def.res[2] };
    e.deck = def.deck.map(makeCard);
    e.signature = def.signature ? makeSigCard(def.signature) : null;
    return e;
  }

  function prepCombatant(c, rng) {
    c.drawPile = shuffle(c.deck.slice(), rng);
    c.hand = [];
    c.discard = [];
    c.status = freshStatus();
    if (c.startPoise) c.status.poise = { p: c.startPoise, c: c.startPoise };
    c.undyingUsed = false;
  }

  function draw(c, rng) {
    while (c.hand.length < c.handSize) {
      if (!c.drawPile.length) {
        if (!c.discard.length) break;
        c.drawPile = shuffle(c.discard, rng);
        c.discard = [];
      }
      c.hand.push(c.drawPile.pop());
    }
  }

  // ───────── 전투 ─────────
  function startBattle(run, rng) {
    const enemy = makeEnemy(run, rng);
    run.lastMonster = enemy.defId;
    const b = { run, player: run.player, enemy, kind: enemy.kind, turn: 0, rows: 0, plan: [], enemyPlan: [], outcome: null };
    prepCombatant(b.player, rng);
    prepCombatant(enemy, rng);
    startTurn(b, rng);
    return b;
  }

  function isSigTurn(b, turn) { return !!b.enemy.signature && turn % 3 === 0; }

  function startTurn(b, rng) {
    b.turn++;
    [b.player, b.enemy].forEach(c => {
      TURN_KEYS.forEach(k => { c.status[k] = c.status[k + 'Next']; c.status[k + 'Next'] = 0; });
      draw(c, rng);
    });
    b.enemyPlan = enemyChoose(b, rng);
    if (isSigTurn(b, b.turn)) b.enemyPlan.unshift(b.enemy.signature);
    b.rows = Math.max(b.player.slots, b.enemyPlan.length);
    b.plan = new Array(b.rows).fill(null);
  }

  // 사용자 보너스까지 반영한 수치 (합 계산 / AI 판단 / 화면 표시)
  function effective(owner, c, opts) {
    const s = cardStats(c);
    let base = s.base + owner.basePower + owner.status.might - owner.status.weak;
    if (opts && opts.first && owner.firstSkillBonus) base += owner.firstSkillBonus;
    if (opts && opts.target && s.fx.execute && opts.target.hp * 2 <= opts.target.maxHp) base += s.fx.execute;
    const cp = s.cp + owner.coinPower;
    const head = clamp(owner.headChance + (s.fx.headBonus || 0), 0.05, 0.95);
    return { base, cp, coins: s.coins, head, type: s.type, min: Math.max(0, base), max: Math.max(0, base + s.coins * cp) };
  }

  function combos(n, k) {
    const out = [];
    const rec = (start, acc) => {
      if (acc.length === k) { out.push(acc.slice()); return; }
      for (let i = start; i < n; i++) { acc.push(i); rec(i + 1, acc); acc.pop(); }
    };
    rec(0, []);
    return out;
  }

  function enemyChoose(b, rng) {
    const e = b.enemy;
    const hand = e.hand;
    const score = c => {
      const v = effective(e, c);
      return (v.base + v.coins * v.cp * v.head + v.coins * 1.5) * (0.8 + 0.2 * b.player.res[v.type]);
    };
    for (let k = Math.min(e.slots, hand.length); k > 0; k--) {
      let best = null;
      let bestScore = -Infinity;
      combos(hand.length, k).forEach(idx => {
        const cost = idx.reduce((s, i) => s + cardDef(hand[i]).cost, 0);
        if (cost > e.energy) return;
        const sc = idx.reduce((s, i) => s + score(hand[i]), 0) * (0.75 + rng() * 0.5);
        if (sc > bestScore) { bestScore = sc; best = idx; }
      });
      if (best) return shuffle(best.map(i => hand[i]), rng);
    }
    return [];
  }

  // ───────── 플레이어 배치 ─────────
  function planCost(b) {
    return b.plan.reduce((s, uid) => {
      if (uid == null) return s;
      const c = b.player.hand.find(h => h.uid === uid);
      return s + (c ? cardDef(c).cost : 0);
    }, 0);
  }
  const planCount = b => b.plan.filter(u => u != null).length;

  function assignCard(b, uid, row) {
    const p = b.player;
    const c = p.hand.find(h => h.uid === uid);
    if (!c) return { ok: false, msg: '손패에 없는 카드입니다.' };
    const existing = b.plan.indexOf(uid);
    if (existing >= 0) { b.plan[existing] = null; return { ok: true, removed: true }; }
    if (planCount(b) >= p.slots) return { ok: false, msg: `스킬은 턴당 최대 ${p.slots}개까지 쓸 수 있습니다.` };
    if (planCost(b) + cardDef(c).cost > p.energy) return { ok: false, msg: '코스트가 부족합니다.' };
    const target = (row != null && b.plan[row] == null) ? row : b.plan.indexOf(null);
    if (target < 0) return { ok: false, msg: '빈 슬롯이 없습니다.' };
    b.plan[target] = uid;
    return { ok: true, row: target };
  }

  function unassign(b, row) { b.plan[row] = null; }

  // 코인 던지기. 마비가 남아 있으면 그 코인은 위력 0으로 고정된다.
  // 결과: 'H' 앞면, 'T' 뒷면, 'Z' 마비
  function tossCoins(n, head, rng, paraLeft) {
    const out = [];
    for (let i = 0; i < n; i++) {
      if (paraLeft.n > 0) { paraLeft.n--; out.push('Z'); continue; }
      out.push(rng() < head ? 'H' : 'T');
    }
    return out;
  }
  const countHeads = arr => arr.filter(x => x === 'H').length;

  // 합 승률 추정 (몬테카를로). 화면의 우세/열세 표시와 자동 배치에 쓴다.
  function pairOdds(b, pCard, eCard, opts, iterations) {
    const p = b.player;
    const e = b.enemy;
    const P = effective(p, pCard, { first: opts && opts.pFirst, target: e });
    const E = effective(e, eCard, { first: opts && opts.eFirst, target: p });
    const n = iterations || 400;
    let wins = 0;
    for (let i = 0; i < n; i++) {
      let a = P.coins;
      let d = E.coins;
      const pp = { n: p.status.paralyze };
      const ep = { n: e.status.paralyze };
      let guard = 0;
      while (a > 0 && d > 0) {
        if (++guard > 50) { if (a >= d) d = 0; else a = 0; break; }
        const x = Math.max(0, P.base + countHeads(tossCoins(a, P.head, Math.random, pp)) * P.cp);
        const y = Math.max(0, E.base + countHeads(tossCoins(d, E.head, Math.random, ep)) * E.cp);
        if (x > y) d--; else if (y > x) a--;
      }
      if (a > 0) wins++;
    }
    return wins / n;
  }

  function clashOdds(b, row, iterations) {
    const pc = b.plan[row] != null ? b.player.hand.find(h => h.uid === b.plan[row]) : null;
    const ec = b.enemyPlan[row] || null;
    if (!pc || !ec) return null;
    const isFirst = (plan, idx) => plan.findIndex(x => x != null) === idx;
    return pairOdds(b, pc, ec, { pFirst: isFirst(b.plan, row), eFirst: isFirst(b.enemyPlan, row) }, iterations);
  }

  // 일방 공격 시 기대 피해 (내성 포함)
  function expectedDamage(owner, card, target) {
    const v = effective(owner, card, { target });
    let power = v.base;
    let dmg = 0;
    for (let k = 0; k < v.coins; k++) {
      power += v.cp * v.head;
      dmg += Math.max(1, power * (target.res[v.type] || 1) - target.dmgReduce);
    }
    return dmg;
  }

  // ───────── 턴 해결 ─────────
  function resolveTurn(b, rng) {
    const p = b.player;
    const e = b.enemy;
    const ev = [];
    const push = o => { o.hp = { p: p.hp, e: e.hp }; ev.push(o); };
    const sideOf = c => (c.isPlayer ? 'p' : 'e');
    const dead = () => p.hp <= 0 || e.hp <= 0;
    const para = { p: { n: p.status.paralyze }, e: { n: e.status.paralyze } };

    function damage(target, amount) {
      target.hp -= amount;
      if (target.hp <= 0 && target.undying > 0 && !target.undyingUsed) {
        target.hp = 1;
        target.undyingUsed = true;
        push({ t: 'undying', side: sideOf(target) });
      }
    }
    function heal(c, amount) {
      const before = c.hp;
      c.hp = Math.min(c.maxHp, c.hp + amount);
      if (c.hp > before) push({ t: 'heal', side: sideOf(c), amount: c.hp - before });
    }
    function addPC(c, key, n, count) {
      const s = c.status[key];
      s.p += n;
      s.c += count || 1;
      push({ t: 'status', side: sideOf(c), key, amount: n, p: s.p, c: s.c });
    }
    function addNext(c, key, n) {
      c.status[key + 'Next'] += n;
      push({ t: 'status', side: sideOf(c), key, amount: n, next: true });
    }
    function usePC(c, key) {
      const s = c.status[key];
      s.c--;
      if (s.c <= 0) { s.c = 0; s.p = 0; }
    }

    function ctx(owner, target, card, first) {
      const v = effective(owner, card, { first, target });
      const s = cardStats(card);
      return { owner, target, side: sideOf(owner), card, name: s.name, sig: s.sig, fx: s.fx, type: s.type, base: v.base, cp: v.cp, coins: v.coins, head: v.head };
    }

    function attack(A, coins) {
      const { owner, target, fx } = A;
      push({ t: 'attack', side: A.side, name: A.name, coins, type: A.type });
      let power = A.base;
      let first = true;
      for (let k = 0; k < coins; k++) {
        if (dead()) break;
        const face = tossCoins(1, A.head, rng, para[A.side])[0];
        if (face === 'H') power += A.cp;
        // 피해 = 위력 × 내성 배율 × 취약 × 치명타 − 피해 감소
        const res = target.res[A.type] || 1;
        const fragile = 1 + 0.1 * target.status.fragile;
        const poise = owner.status.poise;
        const crit = poise.c > 0 && rng() < Math.min(1, poise.p * 0.05);
        let dmg = Math.floor(Math.max(0, power) * res * fragile * (crit ? 1.2 : 1));
        dmg = Math.max(1, dmg - target.dmgReduce);
        damage(target, dmg);
        push({ t: 'hit', side: A.side, k, face, power: Math.max(0, power), dmg, res, crit });
        if (crit) usePC(owner, 'poise');
        // 파열: 피격 시 추가 피해
        const rup = target.status.rupture;
        if (rup.c > 0 && target.hp > 0) {
          const extra = rup.p;
          damage(target, extra);
          usePC(target, 'rupture');
          push({ t: 'proc', side: sideOf(target), key: 'rupture', amount: extra });
        }
        // 출혈: 공격 코인을 쓴 쪽이 피해
        const bl = owner.status.bleed;
        if (bl.c > 0 && owner.hp > 0) {
          const extra = bl.p;
          damage(owner, extra);
          usePC(owner, 'bleed');
          push({ t: 'proc', side: A.side, key: 'bleed', amount: extra });
        }
        if (fx.bleed) addPC(target, 'bleed', fx.bleed);
        if (fx.burn) addPC(target, 'burn', fx.burn);
        if (fx.rupture) addPC(target, 'rupture', fx.rupture);
        if (first) {
          if (owner.firstHitBleed) addPC(target, 'bleed', owner.firstHitBleed);
          if (owner.firstHitBurn) addPC(target, 'burn', owner.firstHitBurn);
          if (fx.paralyze) addNext(target, 'paralyze', fx.paralyze);
          if (fx.weak) addNext(target, 'weak', fx.weak);
          if (fx.fragile) addNext(target, 'fragile', fx.fragile);
          if (fx.heal) heal(owner, fx.heal);
        }
        const ls = (fx.lifesteal || 0) + (owner.lifesteal || 0);
        if (ls > 0) { const h = Math.floor(dmg * ls); if (h > 0) heal(owner, h); }
        first = false;
      }
    }

    let pFirst = true;
    let eFirst = true;
    for (let i = 0; i < b.rows; i++) {
      if (dead()) break;
      const pCard = b.plan[i] != null ? p.hand.find(h => h.uid === b.plan[i]) : null;
      const eCard = b.enemyPlan[i] || null;
      if (!pCard && !eCard) continue;
      const P = pCard ? ctx(p, e, pCard, pFirst) : null;
      const E = eCard ? ctx(e, p, eCard, eFirst) : null;
      if (P) pFirst = false;
      if (E) eFirst = false;
      push({ t: 'row', row: i, p: P && view(P), e: E && view(E) });

      [P, E].forEach(X => {
        if (!X) return;
        if (X.fx.selfDmg) { damage(X.owner, X.fx.selfDmg); push({ t: 'selfDmg', side: X.side, amount: X.fx.selfDmg }); }
        if (X.fx.poise) addPC(X.owner, 'poise', X.fx.poise, 2);
      });
      if (dead()) break;

      if (P && E) {
        let pc = P.coins;
        let ec = E.coins;
        let rounds = 0;
        while (pc > 0 && ec > 0) {
          rounds++;
          if (rounds > 50) { // 무한 합 방지
            if (pc >= ec) ec = 0; else pc = 0;
            break;
          }
          const pf = tossCoins(pc, P.head, rng, para.p);
          const ef = tossCoins(ec, E.head, rng, para.e);
          const pp = Math.max(0, P.base + countHeads(pf) * P.cp);
          const ep = Math.max(0, E.base + countHeads(ef) * E.cp);
          const win = pp > ep ? 'p' : ep > pp ? 'e' : 'tie';
          push({ t: 'clash', row: i, pf, ef, pp, ep, win, pc, ec });
          if (win === 'p') {
            if (e.fateReverse && rng() < e.fateReverse) push({ t: 'fate', side: 'e' });
            else { ec--; push({ t: 'break', side: 'e', left: ec }); }
          } else if (win === 'e') {
            if (p.fateReverse && rng() < p.fateReverse) push({ t: 'fate', side: 'p' });
            else { pc--; push({ t: 'break', side: 'p', left: pc }); }
          }
        }
        const W = pc > 0 ? P : E;
        const left = pc > 0 ? pc : ec;
        push({ t: 'clashWin', side: W.side, left, rounds });
        if (W.fx.might) addNext(W.owner, 'might', W.fx.might);
        attack(W, left);
      } else {
        const A = P || E;
        attack(A, A.coins);
      }
    }

    // 사용한 카드는 버린 카드 더미로
    b.plan.forEach(uid => {
      if (uid == null) return;
      const idx = p.hand.findIndex(h => h.uid === uid);
      if (idx >= 0) p.discard.push(p.hand.splice(idx, 1)[0]);
    });
    b.enemyPlan.forEach(c => {
      if (c.sig) return;
      const idx = e.hand.indexOf(c);
      if (idx >= 0) e.discard.push(e.hand.splice(idx, 1)[0]);
    });

    // 턴 종료: 화상
    if (!dead()) {
      [p, e].forEach(c => {
        const bu = c.status.burn;
        if (c.hp <= 0 || bu.c <= 0) return;
        const dmg = bu.p;
        damage(c, dmg);
        usePC(c, 'burn');
        push({ t: 'proc', side: sideOf(c), key: 'burn', amount: dmg });
      });
      if (p.hp > 0 && p.regen) heal(p, p.regen);
    }

    if (p.hp <= 0) b.outcome = 'lose';
    else if (e.hp <= 0) b.outcome = 'win';
    push({ t: 'end', outcome: b.outcome });
    return ev;
  }

  function view(X) {
    return { name: X.name, sig: X.sig, type: X.type, base: X.base, cp: X.cp, coins: X.coins, head: X.head, fx: X.fx };
  }

  // 전투 승리 후 처리. 보스였다면 true (지역 선택 필요)
  function finishBattle(run, b) {
    const p = run.player;
    run.kills++;
    if (p.winHeal) applyMods(p, { heal: p.winHeal });
    if (b.kind === 'boss') {
      run.bossKills++;
      applyMods(p, { heal: Math.round(p.maxHp * D.BALANCE.bossHealPct) });
      return true;
    }
    return false;
  }

  // ───────── 보상 ─────────
  function weighted(weights, rng) {
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    let r = rng() * total;
    for (const k of Object.keys(weights)) { r -= weights[k]; if (r < 0) return k; }
    return Object.keys(weights)[0];
  }

  function rollRewards(run, kind, rng) {
    const weights = D.RARITY_WEIGHTS[kind] || D.RARITY_WEIGHTS.normal;
    const out = [];
    let tries = 0;
    while (out.length < 3 && tries++ < 200) {
      const rarity = weighted(weights, rng);
      const items = D.ITEMS.filter(it => it.rarity === rarity && (!it.cond || it.cond(run.player)) && !out.some(o => o.item.id === it.id));
      if (!items.length) continue;
      const item = pick(items, rng);
      const opt = { item };
      if (item.type === 'card') {
        const pool = D.CARD_POOL.filter(id => D.CARDS[id].rarity === rarity && !out.some(o => o.cardId === id));
        if (!pool.length) continue;
        opt.cardId = pick(pool, rng);
      }
      out.push(opt);
    }
    return out;
  }

  const needsCardTarget = opt => opt.item.type === 'card' || opt.item.type === 'upgrade';

  function applyReward(run, opt, targetUid) {
    const p = run.player;
    const it = opt.item;
    if (it.type === 'relic') { applyMods(p, it.mods); p.relics.push(it.id); }
    else if (it.type === 'heal') applyMods(p, it.mods);
    else if (it.type === 'card') {
      const idx = p.deck.findIndex(c => c.uid === targetUid);
      if (idx < 0) throw new Error('교체할 카드를 선택하세요');
      p.deck[idx] = makeCard(opt.cardId);
    } else if (it.type === 'upgrade') {
      const c = p.deck.find(x => x.uid === targetUid);
      if (!c) throw new Error('강화할 카드를 선택하세요');
      c.ub += it.upg.ub || 0;
      c.uc += it.upg.uc || 0;
      c.ucoins += it.upg.ucoins || 0;
    }
  }

  // ───────── 지역 ─────────
  function regionChoices(run, rng) {
    let pool = D.REGIONS.filter(r => !run.visited.includes(r.id));
    if (!pool.length) {
      run.visited = [run.regionId];
      pool = D.REGIONS.filter(r => r.id !== run.regionId);
    }
    return shuffle(pool.slice(), rng).slice(0, 3);
  }

  function chooseRegion(run, id) {
    run.regionId = id;
    if (!run.visited.includes(id)) run.visited.push(id);
  }

  const API = {
    makeCard, cardDef, cardStats, fxText, effective, createRun, passiveCost, floorKind,
    startBattle, startTurn, assignCard, unassign, planCost, planCount, resolveTurn, finishBattle, clashOdds, pairOdds, expectedDamage,
    rollRewards, needsCardTarget, applyReward, regionChoices, chooseRegion, applyMods, isSigTurn,
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else root.FFD = API;
})(typeof window !== 'undefined' ? window : globalThis);
