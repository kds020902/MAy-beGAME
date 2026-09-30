/*
 * Fate Five Dungeon — 게임 규칙 엔진
 * 화면과 분리된 순수 로직. 브라우저(window.FFD)와 Node(require) 양쪽에서 동작한다.
 *
 * 전투는 라이브러리 오브 루이나식 주사위 합(게임 안 이름: 운명 주사위)을 따른다.
 *   1) startTurn   : 양쪽이 손패를 채우고, 적이 사용할 카드를 공개한다.
 *   2) assignCard  : 플레이어가 코스트 안에서 카드를 슬롯에 배치한다.
 *   3) resolveTurn : 전투 시작 효과를 처리한 뒤, 같은 줄의 카드끼리 합을 진행한다.
 *                    양쪽 맨 앞 주사위를 굴려 높은 쪽이 이긴다. 진 주사위만 파괴되고,
 *                    이긴 주사위는 남아 상대의 다음 주사위와 다시 굴린다. (비기면 다시, 회피는 비기면 승리)
 *                    합이 끝나기 전에는 피해가 없다. 한쪽 주사위가 모두 파괴되면
 *                    남은 쪽이 남은 공격 주사위를 다시 굴려 그 값만큼 공격한다.
 *                    상대가 없는 줄의 카드는 곧바로 모든 공격 주사위로 공격한다.
 *   4) 턴 종료     : 화상 처리 후, 어느 한쪽 체력이 0이 될 때까지 반복.
 */
(function (root) {
  'use strict';
  const D = (typeof module !== 'undefined' && module.exports) ? require('./data.js') : root.FFD_DATA;

  let uidSeq = 1;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const TURN_KEYS = ['might', 'weak', 'endure', 'protect', 'fragile']; // 다음 턴에 적용되는 수치형
  const isAtk = t => D.DICE[t].atk;

  function shuffle(arr, rng) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  const pick = (arr, rng) => arr[Math.floor(rng() * arr.length)];
  const randInt = (lo, hi, rng) => lo + Math.floor(rng() * (hi - lo + 1));

  // ───────── 카드 ─────────
  function makeCard(id) { return { uid: uidSeq++, id, ub: 0, umax: 0, extraDie: 0 }; }
  function makeSigCard(def) { return { uid: uidSeq++, id: 'sig', sig: def, ub: 0, umax: 0, extraDie: 0 }; }
  function cardDef(c) { return c.sig || D.CARDS[c.id]; }

  // 카드 자체의 주사위 (강화 포함, 사용자 보너스 제외)
  function cardDice(c) {
    const d = cardDef(c);
    const list = d.dice.slice();
    for (let i = 0; i < c.extraDie; i++) list.push(d.dice[0]);
    return list.map(x => ({ t: x.t, min: x.min + c.ub, max: x.max + c.ub + c.umax }));
  }

  function cardStats(c) {
    const d = cardDef(c);
    return {
      name: d.name, cost: d.cost, rarity: d.rarity, fx: d.fx, sig: !!c.sig,
      dice: cardDice(c), upgraded: c.ub + c.umax + c.extraDie > 0,
    };
  }

  function fxText(fx) {
    const t = [];
    const s = fx.start;
    if (s) {
      const parts = [];
      if (s.heal) parts.push(`체력 ${s.heal} 회복`);
      if (s.might) parts.push(`힘 ${s.might}`);
      if (s.endure) parts.push(`인내 ${s.endure}`);
      if (s.protect) parts.push(`보호 ${s.protect}`);
      t.push(`전투 시작: ${parts.join(', ')}`);
    }
    if (fx.bleed) t.push(`적중 시 출혈 ${fx.bleed}`);
    if (fx.burn) t.push(`적중 시 화상 ${fx.burn}`);
    if (fx.weak) t.push(`첫 적중 시 허약 ${fx.weak}`);
    if (fx.fragile) t.push(`첫 적중 시 취약 ${fx.fragile}`);
    if (fx.lifesteal) t.push(`피해의 ${Math.round(fx.lifesteal * 100)}% 흡혈`);
    if (fx.selfDmg) t.push(`사용 시 체력 ${fx.selfDmg} 소모`);
    return t.join(' · ');
  }

  // ───────── 전투 참가자 ─────────
  function freshStatus() {
    const s = { bleed: 0, burn: 0 };
    TURN_KEYS.forEach(k => { s[k] = 0; s[k + 'Next'] = 0; });
    return s;
  }

  function baseCombatant() {
    return {
      name: '', maxHp: 1, hp: 1, energy: 9, handSize: 5, slots: 2,
      basePower: 0, slashPower: 0, diceMin: 0, diceMax: 0, dmgReduce: 0, lifesteal: 0, winHeal: 0, goldBonus: 0,
      firstHitBleed: 0, firstHitBurn: 0, firstSkillBonus: 0, undying: 0, regen: 0,
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

  function createRun(classId, passiveIds) {
    const cls = D.CLASS_MAP[classId];
    if (!cls) throw new Error('알 수 없는 직업입니다');
    if (passiveCost(passiveIds) > D.LIGHT_POINTS) throw new Error('빛 수치를 초과했습니다');
    const p = baseCombatant();
    p.isPlayer = true;
    p.classId = cls.id;
    p.name = cls.name;
    p.icon = cls.icon;
    p.maxHp = p.hp = cls.hp;
    p.passives = passiveIds.slice();
    p.relics = [];
    p.deck = cls.starter.map(makeCard);
    applyMods(p, cls.trait.mods);
    passiveIds.forEach(id => applyMods(p, D.PASSIVES.find(x => x.id === id).mods));
    const start = D.REGIONS[0].id;
    return { classId: cls.id, floor: 1, regionId: start, visited: [start], player: p, gold: 0, lastMonster: null, kills: 0, bossKills: 0 };
  }

  // 3층 중간 보스, 이후 +5층마다 / 5층마다 보스
  function floorKind(f) {
    if (f % 5 === 0) return 'boss';
    if (f % 5 === 3) return 'midboss';
    return 'normal';
  }
  const isShopFloor = f => f % D.SHOP.every === 0;

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
    e.basePower = B.enemyPower[kind] + Math.floor((f - 1) / B.powerEveryFloors);
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

  // 전투 시작 효과로 이번 턴에 더해질 힘/인내 (배치된 카드 기준, 화면 예측용)
  function startBuffs(cards) {
    const out = { might: 0, endure: 0 };
    cards.forEach(c => {
      const s = c && cardDef(c).fx.start;
      if (s) { out.might += s.might || 0; out.endure += s.endure || 0; }
    });
    return out;
  }

  // 사용자 보너스까지 반영한 주사위 범위
  //   opts.first: 이번 턴 첫 카드 여부, opts.buff: 예상 전투 시작 버프
  function effective(owner, c, opts) {
    const st = owner.status;
    const buff = (opts && opts.buff) || { might: 0, endure: 0 };
    const first = opts && opts.first ? owner.firstSkillBonus : 0;
    const dice = cardDice(c).map(d => {
      const atk = isAtk(d.t);
      const bonus = owner.basePower + first + (d.t === 'S' ? owner.slashPower : 0) +
        (atk ? st.might + buff.might - st.weak : st.endure + buff.endure);
      const min = Math.max(0, d.min + owner.diceMin + bonus);
      const max = Math.max(min, d.max + owner.diceMax + bonus);
      return { t: d.t, atk, min, max };
    });
    return { dice };
  }

  const dieMean = d => (d.min + d.max) / 2;

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
    const score = c => effective(e, c).dice.reduce((s, d) => s + dieMean(d) * (d.atk ? b.player.res[D.TYPE_OF[d.t]] : 0.7), 0);
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
  const planCards = b => b.plan.map(uid => (uid == null ? null : b.player.hand.find(h => h.uid === uid) || null));
  const planCost = b => planCards(b).reduce((s, c) => s + (c ? cardDef(c).cost : 0), 0);
  const planCount = b => b.plan.filter(u => u != null).length;

  function assignCard(b, uid, row) {
    const p = b.player;
    const c = p.hand.find(h => h.uid === uid);
    if (!c) return { ok: false, msg: '손패에 없는 카드입니다.' };
    const existing = b.plan.indexOf(uid);
    if (existing >= 0) { b.plan[existing] = null; return { ok: true, removed: true }; }
    if (planCount(b) >= p.slots) return { ok: false, msg: `카드는 턴당 최대 ${p.slots}장까지 쓸 수 있습니다.` };
    if (planCost(b) + cardDef(c).cost > p.energy) return { ok: false, msg: '코스트가 부족합니다.' };
    const target = (row != null && b.plan[row] == null) ? row : b.plan.indexOf(null);
    if (target < 0) return { ok: false, msg: '빈 슬롯이 없습니다.' };
    b.plan[target] = uid;
    return { ok: true, row: target };
  }

  function unassign(b, row) { b.plan[row] = null; }

  // ───────── 합 규칙 (예측과 실제 해결이 함께 쓴다) ─────────
  // 두 주사위 목록을 맞붙인다. side 'a' 가 첫 번째 목록, 'b' 가 두 번째 목록이다.
  //   합  : 양쪽 맨 앞 주사위를 굴려 높은 쪽이 이긴다. 진 주사위만 파괴되고,
  //         이긴 주사위는 남아서 상대의 다음 주사위와 다시 굴린다. 비기면 다시 굴린다.
  //         (회피 주사위는 비기면 이긴다)
  //   공격: 한쪽 주사위가 모두 파괴되면 합이 끝나고, 남은 쪽이 남은 공격 주사위를 다시 굴려 공격한다.
  // cb.roll(side, die, phase) → 굴린 값 ('clash' | 'attack')
  // cb.clash(i, j, va, vb, result)  result: 'a' | 'b' | 'tie'
  // cb.attack(side, from)           남은 주사위로 공격 시작
  // cb.strike(side, k, value)       공격 주사위 하나
  // cb.hit(side, die, value)        피해 처리
  // cb.stop() → true 면 중단
  function clashDice(A, B, cb) {
    const stop = () => cb.stop && cb.stop();
    let i = 0;
    let j = 0;
    let rounds = 0;
    while (i < A.length && j < B.length) {
      if (stop()) return;
      const a = A[i];
      const d = B[j];
      const va = cb.roll('a', a, 'clash');
      const vb = cb.roll('b', d, 'clash');
      let result = 'tie';
      if (va > vb || (va === vb && a.t === 'E' && d.t !== 'E')) result = 'a';
      else if (vb > va || (va === vb && d.t === 'E' && a.t !== 'E')) result = 'b';
      if (++rounds > 60 && result === 'tie') result = A.length - i >= B.length - j ? 'a' : 'b'; // 무한 합 방지
      if (cb.clash) cb.clash(i, j, va, vb, result);
      if (result === 'a') j++;
      else if (result === 'b') i++;
    }
    const side = i < A.length ? 'a' : j < B.length ? 'b' : null;
    if (!side) return;
    const W = side === 'a' ? A : B;
    const from = side === 'a' ? i : j;
    if (cb.attack) cb.attack(side, from);
    for (let k = from; k < W.length; k++) {
      if (stop()) return;
      if (!W[k].atk) continue;
      const v = cb.roll(side, W[k], 'attack');
      if (stop()) return;
      if (cb.strike) cb.strike(side, k, v);
      cb.hit(side, W[k], v);
    }
  }

  function hitDamage(value, type, target, protect, fragile) {
    const res = target.res[D.TYPE_OF[type]] || 1;
    return Math.max(1, Math.floor(value * res) + fragile - protect - target.dmgReduce);
  }

  // 한 줄의 예상 피해 (몬테카를로). 화면의 우세/열세 표시와 자동 배치에 쓴다.
  function pairOdds(b, pCard, eCard, opts, iterations) {
    const p = b.player;
    const e = b.enemy;
    const P = pCard ? effective(p, pCard, { first: opts && opts.pFirst, buff: opts && opts.pBuff }).dice : [];
    const E = eCard ? effective(e, eCard, { first: opts && opts.eFirst, buff: opts && opts.eBuff }).dice : [];
    const n = iterations || 300;
    let dealt = 0;
    let taken = 0;
    const cb = {
      roll: (side, d) => randInt(d.min, d.max, Math.random),
      hit: (side, d, v) => {
        if (side === 'a') dealt += hitDamage(v, d.t, e, e.status.protect, e.status.fragile);
        else taken += hitDamage(v, d.t, p, p.status.protect, p.status.fragile);
      },
    };
    for (let k = 0; k < n; k++) clashDice(P, E, cb);
    return { dealt: dealt / n, taken: taken / n };
  }

  function rowOdds(b, row, iterations) {
    const pc = planCards(b)[row];
    const ec = b.enemyPlan[row] || null;
    if (!pc && !ec) return null;
    const isFirst = (plan, idx) => plan.findIndex(x => x != null) === idx;
    return pairOdds(b, pc, ec, {
      pFirst: isFirst(b.plan, row), eFirst: isFirst(b.enemyPlan, row),
      pBuff: startBuffs(planCards(b)), eBuff: startBuffs(b.enemyPlan),
    }, iterations);
  }

  const SIDE = { a: 'p', b: 'e', tie: 'tie' };

  // ───────── 턴 해결 ─────────
  function resolveTurn(b, rng) {
    const p = b.player;
    const e = b.enemy;
    const ev = [];
    const push = o => { o.hp = { p: p.hp, e: e.hp }; ev.push(o); };
    const sideOf = c => (c.isPlayer ? 'p' : 'e');
    const dead = () => p.hp <= 0 || e.hp <= 0;
    const pCards = planCards(b);

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
    function addStatus(c, key, n) {
      c.status[key] += n;
      push({ t: 'status', side: sideOf(c), key: key.replace('Next', ''), amount: n, next: key.endsWith('Next') });
    }

    // 전투 시작 효과
    [[p, pCards], [e, b.enemyPlan]].forEach(([c, cards]) => {
      cards.forEach(card => {
        if (!card || dead()) return;
        const fx = cardDef(card).fx;
        if (fx.selfDmg) { damage(c, fx.selfDmg); push({ t: 'selfDmg', side: sideOf(c), amount: fx.selfDmg, name: cardDef(card).name }); }
        const s = fx.start;
        if (!s) return;
        push({ t: 'start', side: sideOf(c), name: cardDef(card).name });
        if (s.heal) heal(c, s.heal);
        ['might', 'endure', 'protect'].forEach(k => { if (s[k]) addStatus(c, k, s[k]); });
      });
    });

    let pFirst = true;
    let eFirst = true;
    for (let i = 0; i < b.rows && !dead(); i++) {
      const pCard = pCards[i];
      const eCard = b.enemyPlan[i] || null;
      if (!pCard && !eCard) continue;
      const P = pCard ? { owner: p, target: e, name: cardDef(pCard).name, fx: cardDef(pCard).fx, dice: effective(p, pCard, { first: pFirst }).dice, hit: false } : null;
      const E = eCard ? { owner: e, target: p, name: cardDef(eCard).name, fx: cardDef(eCard).fx, dice: effective(e, eCard, { first: eFirst }).dice, hit: false } : null;
      if (P) pFirst = false;
      if (E) eFirst = false;
      push({ t: 'row', row: i, p: P && { name: P.name, dice: P.dice }, e: E && { name: E.name, dice: E.dice } });

      const ctxOf = side => (side === 'a' ? P : E);
      clashDice(P ? P.dice : [], E ? E.dice : [], {
        stop: dead,
        roll: (side, d, phase) => {
          const X = ctxOf(side);
          // 출혈: 공격 주사위로 공격할 때마다 피해
          if (phase === 'attack' && X.owner.status.bleed > 0 && X.owner.hp > 0) {
            const bl = X.owner.status.bleed;
            damage(X.owner, bl);
            X.owner.status.bleed = bl - Math.ceil(bl / 3);
            push({ t: 'proc', side: sideOf(X.owner), key: 'bleed', amount: bl });
          }
          return randInt(d.min, d.max, rng);
        },
        clash: (ia, ib, va, vb, result) => push({ t: 'clash', row: i, pi: ia, ei: ib, pv: va, ev: vb, result: SIDE[result] }),
        attack: (side, from) => push({ t: 'attack', row: i, side: SIDE[side], from, opposed: !!(P && E) }),
        strike: (side, k, value) => push({ t: 'strike', row: i, side: SIDE[side], k, value }),
        hit: (side, d, value) => {
          if (dead()) return;
          const X = ctxOf(side);
          const tgt = X.owner === p ? e : p;
          const dmg = hitDamage(value, d.t, tgt, tgt.status.protect, tgt.status.fragile);
          damage(tgt, dmg);
          push({ t: 'hit', side: sideOf(X.owner), die: d.t, value, dmg, res: tgt.res[D.TYPE_OF[d.t]] || 1 });
          const fx = X.fx;
          if (fx.bleed) addStatus(tgt, 'bleed', fx.bleed);
          if (fx.burn) addStatus(tgt, 'burn', fx.burn);
          if (!X.hit) {
            X.hit = true;
            if (X.owner.firstHitBleed) addStatus(tgt, 'bleed', X.owner.firstHitBleed);
            if (X.owner.firstHitBurn) addStatus(tgt, 'burn', X.owner.firstHitBurn);
            if (fx.weak) addStatus(tgt, 'weakNext', fx.weak);
            if (fx.fragile) addStatus(tgt, 'fragileNext', fx.fragile);
          }
          const ls = (fx.lifesteal || 0) + (X.owner.lifesteal || 0);
          if (ls > 0) { const h = Math.floor(dmg * ls); if (h > 0) heal(X.owner, h); }
        },
      });
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

    // 턴 종료: 화상, 재생
    if (!dead()) {
      [p, e].forEach(c => {
        const bu = c.status.burn;
        if (c.hp <= 0 || bu <= 0) return;
        damage(c, bu);
        c.status.burn = Math.floor(bu / 2);
        push({ t: 'proc', side: sideOf(c), key: 'burn', amount: bu });
      });
      if (p.hp > 0 && p.regen) heal(p, p.regen);
    }

    if (p.hp <= 0) b.outcome = 'lose';
    else if (e.hp <= 0) b.outcome = 'win';
    push({ t: 'end', outcome: b.outcome });
    return ev;
  }

  // 한 장을 상대 없이 썼을 때의 기대 피해 (내성 포함)
  function expectedDamage(owner, card, target) {
    return effective(owner, card).dice.reduce((s, d) => {
      if (!d.atk) return s;
      return s + Math.max(1, dieMean(d) * (target.res[D.TYPE_OF[d.t]] || 1) - target.dmgReduce);
    }, 0);
  }

  // 전투 승리 후 처리. { boss, gold } 를 돌려준다.
  function finishBattle(run, b, rng) {
    const p = run.player;
    run.kills++;
    const [lo, hi] = D.GOLD[b.kind];
    const gold = randInt(lo, hi, rng || Math.random) + (p.goldBonus || 0);
    run.gold += gold;
    if (p.winHeal) applyMods(p, { heal: p.winHeal });
    const boss = b.kind === 'boss';
    if (boss) {
      run.bossKills++;
      applyMods(p, { heal: Math.round(p.maxHp * D.BALANCE.bossHealPct) });
    }
    return { boss, gold };
  }

  // ───────── 보상 / 아이템 ─────────
  function weighted(weights, rng) {
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    let r = rng() * total;
    for (const k of Object.keys(weights)) { r -= weights[k]; if (r < 0) return k; }
    return Object.keys(weights)[0];
  }

  const itemOk = (run, it) => !it.cond || it.cond(run.player);

  // 희귀도에 맞는 아이템 하나 (카드 아이템이면 직업 카드도 정한다). 이미 뽑힌 것은 제외.
  function rollItem(run, rarity, taken, rng) {
    const items = D.ITEMS.filter(it => it.rarity === rarity && itemOk(run, it) && !taken.some(o => o.item.id === it.id));
    if (!items.length) return null;
    const item = pick(items, rng);
    const opt = { item };
    if (item.type === 'card') {
      const pool = D.CLASS_MAP[run.classId].pool.filter(id => D.CARDS[id].rarity === rarity && !taken.some(o => o.cardId === id));
      if (!pool.length) return null;
      opt.cardId = pick(pool, rng);
    }
    return opt;
  }

  function rollRewards(run, kind, rng) {
    const weights = D.RARITY_WEIGHTS[kind] || D.RARITY_WEIGHTS.normal;
    const out = [];
    let tries = 0;
    while (out.length < 3 && tries++ < 200) {
      const opt = rollItem(run, weighted(weights, rng), out, rng);
      if (opt) out.push(opt);
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
      c.umax += it.upg.umax || 0;
      c.extraDie += it.upg.extraDie || 0;
    }
  }

  // ───────── 상점 ─────────
  // 상단: 최하급 고정 3개 (여러 번 구매 가능) / 하단: 일반~전설 무작위 5개 (각 1회)
  function rollShop(run, rng) {
    const S = D.SHOP;
    const fixed = S.fixed.map(id => ({ item: D.ITEMS.find(i => i.id === id), price: S.price.basic, fixed: true }));
    const random = [];
    const weights = S.weights(run.floor);
    let tries = 0;
    while (random.length < S.randomCount && tries++ < 300) {
      const opt = rollItem(run, weighted(weights, rng), random, rng);
      if (opt) random.push(Object.assign(opt, { price: S.price[opt.item.rarity], sold: false }));
    }
    return { fixed, random };
  }

  function buy(run, entry, targetUid) {
    if (entry.sold) return { ok: false, msg: '이미 판매된 물건입니다.' };
    if (run.gold < entry.price) return { ok: false, msg: '은화가 부족합니다.' };
    applyReward(run, entry, targetUid);
    run.gold -= entry.price;
    if (!entry.fixed) entry.sold = true;
    return { ok: true };
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
    makeCard, cardDef, cardDice, cardStats, fxText, effective, createRun, passiveCost, floorKind, isShopFloor,
    startBattle, startTurn, assignCard, unassign, planCards, planCost, planCount, resolveTurn, finishBattle,
    pairOdds, rowOdds, expectedDamage, startBuffs, clashDice,
    rollRewards, needsCardTarget, applyReward, rollShop, buy, regionChoices, chooseRegion, applyMods, isSigTurn,
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else root.FFD = API;
})(typeof window !== 'undefined' ? window : globalThis);
