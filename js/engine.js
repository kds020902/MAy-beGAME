/*
 * 오푸스덜스 — 게임 규칙 엔진
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
 *   4) 턴 종료     : 남은 손패를 모두 버리고 화상 처리. 어느 한쪽 체력이 0이 될 때까지 반복.
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
    if (fx.smash) t.push(`강타: 주사위 값의 1/${fx.smash} 고정 피해`);
    if (fx.rupture) t.push(`적중 시 파열 ${fx.rupture}`);
    if (fx.element) t.push(`${D.ELEMENTS[fx.element].icon} ${D.ELEMENTS[fx.element].name} 속성`);
    if (fx.lifesteal) t.push(`피해의 ${Math.round(fx.lifesteal * 100)}% 흡혈`);
    if (fx.selfDmg) t.push(`사용 시 체력 ${fx.selfDmg} 소모`);
    return t.join(' · ');
  }

  // ───────── 전투 참가자 ─────────
  function freshStatus() {
    const s = { bleed: 0, burn: 0, hemo: 0, rupture: 0, element: null };
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

  // ───────── 메타: 해금 · 승천 ─────────
  const freshMeta = () => ({ bossKills: 0, wins: 0, maxFloor: 0, runs: 0, ascension: {} });
  const unlockedIds = meta => D.UNLOCKS.filter(u => u.need(meta || freshMeta())).map(u => u.id);
  const unlockFor = (kind, target) => D.UNLOCKS.find(u => u.kind === kind && u.target === target);
  // 해금되지 않은 것이면 false. 해금 항목이 없는 것은 처음부터 열려 있다.
  function isUnlocked(unlocked, kind, target) {
    const u = unlockFor(kind, target);
    return !u || (unlocked || []).includes(u.id);
  }
  const ascensionOf = (meta, classId) => ((meta && meta.ascension) || {})[classId] || 0;
  // 승천 단계 n 까지 누적된 보정
  function ascMods(level) {
    const out = { enemyHp: 0, enemyPower: 0, enemyDiceMax: 0, restHeal: 0, legendaryHalf: false, startHp: 0, shopPrice: 0, bossHp: 0, light: 0, enemyEnergy: 0, sigEvery: 3 };
    D.ASCENSION.filter(a => a.level <= (level || 0)).forEach(a => {
      Object.keys(a.mods).forEach(k => {
        if (typeof a.mods[k] === 'boolean') out[k] = a.mods[k];
        else if (k === 'sigEvery') out[k] = a.mods[k];
        else out[k] += a.mods[k];
      });
    });
    return out;
  }
  // 승천 보상: 플레이 중인 승천 단계(run.asc) 이하의 보상을 모두 받는다
  const ascRewards = level => D.ASC_REWARDS.filter(r => r.level <= (level || 0));
  const ascRewardLevel = key => (D.ASC_REWARDS.find(r => r.key === key) || { level: 99 }).level;
  const hasAscReward = (run, key) => (run.asc || 0) >= ascRewardLevel(key);
  const lightPoints = level => D.LIGHT_POINTS + ascMods(level).light + ascRewards(level).reduce((s, r) => s + (r.light || 0), 0);
  const potionSlots = run => D.POTION_SLOTS + (hasAscReward(run, 'legacy') ? D.LEGACY_POTION_SLOTS : 0);
  // 직업 전용 카드(승천 2 보상 「전용 무구」)인지
  const isAscCard = (classId, id) => (D.ASC_CARDS[classId] || []).includes(id);
  const classPassive = classId => D.PASSIVES.find(p => p.cls === classId);
  // 보스 처치·판 종료를 기록해 해금 조건을 갱신한다
  function recordBossKill(meta) { meta.bossKills++; return meta; }
  function recordRun(meta, run, won) {
    meta.runs++;
    meta.maxFloor = Math.max(meta.maxFloor, run.floor);
    if (won) {
      meta.wins++;
      const cur = ascensionOf(meta, run.classId);
      if (run.asc >= cur && cur < D.MAX_ASCENSION) meta.ascension[run.classId] = cur + 1;
    }
    return meta;
  }

  // ───────── 런(한 판) ─────────
  function passiveCost(ids) {
    return ids.reduce((s, id) => s + D.PASSIVES.find(p => p.id === id).cost, 0);
  }

  // opts: { asc: 승천 단계, unlocked: 해금 id 목록 }
  function createRun(classId, passiveIds, opts) {
    opts = opts || {};
    const cls = D.CLASS_MAP[classId];
    if (!cls) throw new Error('알 수 없는 직업입니다');
    const asc = opts.asc || 0;
    const A = ascMods(asc);
    const unlocked = opts.unlocked || unlockedIds(null);
    if (passiveCost(passiveIds) > lightPoints(asc)) throw new Error('빛 수치를 초과했습니다');
    const ascReached = opts.ascReached || 0;
    passiveIds.forEach(id => {
      const x = D.PASSIVES.find(y => y.id === id);
      if (x.cost >= 4 && !isUnlocked(unlocked, 'passive', 4)) throw new Error('아직 열리지 않은 가호입니다');
      if (x.cls) throw new Error('직업 전용 가호는 승천 2부터 자동으로 적용됩니다');
    });
    const rewards = ascRewards(asc);
    const hpPct = rewards.reduce((s, r) => s + (r.hpPct || 0), 0);
    const p = baseCombatant();
    p.isPlayer = true;
    p.classId = cls.id;
    p.name = cls.name;
    p.icon = cls.icon;
    p.maxHp = p.hp = Math.round(cls.hp * (1 + A.startHp) * (1 + hpPct));
    p.energy = cls.energy;
    p.slots = 9; // 턴당 카드 수 제한 없음 (코스트가 허락하는 만큼)
    p.hemorrhage = !!cls.trait.hemorrhage;
    p.passives = passiveIds.slice();
    p.relics = [];
    p.deck = cls.starter.map(makeCard);
    applyMods(p, cls.trait.mods);
    passiveIds.forEach(id => applyMods(p, D.PASSIVES.find(x => x.id === id).mods));
    // 승천 보상 (플레이 단계 이하 전부)
    rewards.forEach(r => { if (r.mods) applyMods(p, r.mods); });
    const start = D.REGIONS[0].id;
    const run = { classId: cls.id, floor: 1, regionId: start, visited: [start], player: p, gold: 0, potions: [], lastMonster: null, kills: 0, bossKills: 0, map: null, seen: [], asc, unlocked, ascReached, won: false, nextBuff: null, revives: 0 };
    if (hasAscReward(run, 'arsenal')) {
      const cp = classPassive(cls.id);
      if (cp) { applyMods(p, cp.mods); p.passives.push(cp.id); }
    }
    if (hasAscReward(run, 'rebirth')) run.revives = 1;
    return run;
  }

  // ───────── 지도 ─────────
  // 지역(막)마다 5열. 열 1·2·4는 고를 수 있는 칸 2~3개, 열 3은 중간 보스, 열 5는 보스.
  // 열 1 → 열 2 사이에만 갈림길 간선이 있고, 그 뒤로는 모든 칸이 다음 열의 모든 칸으로 이어진다.
  function makeMap(run, rng) {
    const col = (kinds) => kinds.map(kind => ({ kind, done: false }));
    const pickKinds = (n, must, pool) => {
      const out = must.slice();
      while (out.length < n) {
        const k = weighted(pool, rng);
        if (k === 'treasure' && out.includes('treasure')) continue;
        out.push(k);
      }
      return shuffle(out, rng);
    };
    const first = run.floor <= 1;
    const cols = [
      col(pickKinds(2, ['battle'], first ? { battle: 70, event: 30 } : { battle: 55, event: 35, rest: 10 })),
      col(pickKinds(3, ['battle'], { battle: 40, event: 30, rest: 18, treasure: 12 })),
      col(['midboss']),
      col(pickKinds(3, ['rest'], { battle: 45, event: 35, treasure: 20 })),
      col(['boss']),
    ];
    // 열 1 → 열 2 간선: 각 칸이 1~2개로 이어지고, 열 2의 모든 칸에 들어오는 길이 있게 한다
    const edges = cols[0].map(() => []);
    edges[0].push(0, 1);
    edges[1].push(1, 2);
    if (rng() < 0.5) edges[0].push(2); else edges[1].push(0);
    edges.forEach(e => e.sort((a, b) => a - b));
    return { cols, edges, col: -1, idx: -1, startFloor: run.floor };
  }

  // 지금 고를 수 있는 칸 목록: [{col, idx}]
  function mapChoices(run) {
    const m = run.map;
    if (!m) return [];
    const next = m.col + 1;
    if (next >= m.cols.length) return [];
    if (next === 0) return m.cols[0].map((_, i) => ({ col: 0, idx: i }));
    if (next === 1) return m.edges[m.idx].map(i => ({ col: 1, idx: i }));
    return m.cols[next].map((_, i) => ({ col: next, idx: i }));
  }

  function enterNode(run, col, idx) {
    const ok = mapChoices(run).some(c => c.col === col && c.idx === idx);
    if (!ok) throw new Error('갈 수 없는 칸입니다');
    run.map.col = col;
    run.map.idx = idx;
    return run.map.cols[col][idx];
  }

  function currentNode(run) {
    const m = run.map;
    return m && m.col >= 0 ? m.cols[m.col][m.idx] : null;
  }

  // 칸을 마치면 층이 오른다. 보스 칸이면 true (상점 → 지역 선택)
  function finishNode(run) {
    const node = currentNode(run);
    if (node) node.done = true;
    const boss = node && node.kind === 'boss';
    run.floor++;
    return boss;
  }

  // 새 지역에 들어갈 때 지도를 새로 만든다
  function startRegion(run, rng) {
    run.map = makeMap(run, rng);
  }

  // ───────── 모닥불 ─────────
  function rest(run, choice, targetUid) {
    const p = run.player;
    if (choice === 'heal') {
      const amount = Math.round(p.maxHp * (D.MAP.restHeal + ascMods(run.asc).restHeal));
      applyMods(p, { heal: amount });
      return { ok: true, amount };
    }
    if (choice === 'full') {
      if (!hasAscReward(run, 'fullRest')) return { ok: false, msg: '승천 7 보상입니다' };
      const c = p.deck.find(x => x.uid === targetUid);
      if (!c) return { ok: false, msg: '단련할 카드를 고르세요' };
      const amount = Math.round(p.maxHp * D.FULL_REST_HEAL);
      applyMods(p, { heal: amount });
      c.ub += D.MAP.restUpgrade.ub || 0;
      c.umax += D.MAP.restUpgrade.umax || 0;
      run.nextBuff = { might: 2, protect: 2 };
      return { ok: true, amount };
    }
    if (choice === 'upgrade') {
      const c = p.deck.find(x => x.uid === targetUid);
      if (!c) return { ok: false, msg: '단련할 카드를 고르세요' };
      c.ub += D.MAP.restUpgrade.ub || 0;
      c.umax += D.MAP.restUpgrade.umax || 0;
      return { ok: true };
    }
    return { ok: false, msg: '알 수 없는 선택' };
  }

  // ───────── 보물 ─────────
  function rollTreasure(run, rng) {
    const out = [];
    let tries = 0;
    while (out.length < 3 && tries++ < 100) {
      const rarity = weighted(D.MAP.treasureWeights, rng);
      const items = D.ITEMS.filter(it => it.type === 'relic' && it.rarity === rarity && itemOk(run, it) && !out.some(o => o.item.id === it.id));
      if (items.length) out.push({ item: pick(items, rng) });
    }
    return out;
  }

  // ───────── 사건 ─────────
  function rollEvent(run, rng) {
    const avail = D.EVENTS.slice();
    const pool = avail.filter(e => !run.seen.includes(e.id));
    const ev = pick(pool.length ? pool : avail, rng);
    run.seen.push(ev.id);
    return ev;
  }

  const canChoose = (run, choice) => !choice.need || (choice.need.gold == null || run.gold >= choice.need.gold);

  // 선택지를 적용한다. 결과: { lines: [...설명], needCard: 'upgrade' | null, pendingUpgrade }
  function applyEventChoice(run, ev, i, rng) {
    const choice = ev.choices[i];
    if (!canChoose(run, choice)) return { ok: false, msg: '조건이 맞지 않습니다' };
    const lines = [];
    const out = { ok: true, lines, needCard: null };
    const apply = fx => {
      const p = run.player;
      if (fx.gold) { run.gold = Math.max(0, run.gold + fx.gold); lines.push(`은화 ${fx.gold > 0 ? '+' : ''}${fx.gold}`); }
      if (fx.maxHp) { applyMods(p, { maxHp: fx.maxHp }); lines.push(`최대 체력 ${fx.maxHp > 0 ? '+' : ''}${fx.maxHp}`); }
      if (fx.hp) {
        if (fx.hp > 0) applyMods(p, { heal: fx.hp }); else p.hp = Math.max(1, p.hp + fx.hp);
        lines.push(`체력 ${fx.hp > 0 ? '+' : ''}${fx.hp}`);
      }
      if (fx.hpPct) { const n = Math.round(p.maxHp * fx.hpPct); applyMods(p, { heal: n }); lines.push(`체력 ${n} 회복`); }
      if (fx.relic) {
        const items = D.ITEMS.filter(it => it.type === 'relic' && it.rarity === fx.relic && itemOk(run, it) && !p.relics.includes(it.id));
        if (!items.length && fx.relic === 'legendary') items.push(...D.ITEMS.filter(it => it.type === 'relic' && it.rarity === 'rare' && itemOk(run, it) && !p.relics.includes(it.id)));
        if (items.length) { const it = pick(items, rng); applyReward(run, { item: it }); lines.push(`유물 「${it.name}」 획득`); }
      }
      if (fx.card) {
        let pool = D.CLASS_MAP[run.classId].pool.filter(id => D.CARDS[id].rarity === fx.card && cardOk(run, id));
        if (!pool.length) pool = D.CLASS_MAP[run.classId].pool.filter(id => cardOk(run, id));
        if (pool.length) { const id = pick(pool, rng); p.deck.push(makeCard(id)); out.newCard = id; lines.push(`카드 「${D.CARDS[id].name}」 획득 — 덱의 카드 1장과 교체`); }
      }
      if (fx.potion) { const r = addPotion(run, fx.potion); lines.push(r.stored ? `물약 「${D.ITEMS.find(it => it.id === fx.potion).name}」 획득` : '물약 벨트가 가득 차 바로 마셨습니다'); }
      if (fx.upgrade) { out.needCard = 'upgrade'; out.pendingUpgrade = fx.upgrade; lines.push('카드 1장을 단련합니다'); }
      if (fx.chance) {
        const won = rng() < fx.chance.p;
        lines.push(won ? '운이 따랐습니다!' : '운이 따르지 않았습니다…');
        apply(won ? fx.chance.win : fx.chance.lose);
      }
    };
    apply(choice.fx);
    if (!lines.length) lines.push('아무 일도 일어나지 않았습니다.');
    return out;
  }

  // 사건에서 얻은 카드는 덱 9장을 유지하기 위해 기존 카드 1장과 교체한다
  function swapEventCard(run, newId, targetUid) {
    const p = run.player;
    const ni = p.deck.findIndex(c => c.id === newId && c.uid === Math.max(...p.deck.map(x => x.uid)));
    const ti = p.deck.findIndex(c => c.uid === targetUid);
    if (ni < 0 || ti < 0 || ni === ti) return false;
    p.deck.splice(ti, 1);
    return true;
  }

  function upgradeCard(run, targetUid, upg) {
    const c = run.player.deck.find(x => x.uid === targetUid);
    if (!c) return false;
    c.ub += upg.ub || 0;
    c.umax += upg.umax || 0;
    c.extraDie += upg.extraDie || 0;
    return true;
  }

  // ───────── 물약 ─────────
  // 벨트에 넣는다. 가득 차면 바로 마신다(회복만 적용).
  function addPotion(run, id) {
    if (run.potions.length < potionSlots(run)) { run.potions.push(id); return { stored: true }; }
    const it = D.ITEMS.find(x => x.id === id);
    if (it.potion.heal) applyMods(run.player, { heal: it.potion.heal });
    return { stored: false };
  }

  // 물약을 쓴다. 전투 중이면 b 를 넘긴다. 힘/보호/취약은 전투 중에만 쓸 수 있다.
  function usePotion(run, i, b) {
    const id = run.potions[i];
    if (!id) return { ok: false, msg: '빈 칸입니다' };
    const it = D.ITEMS.find(x => x.id === id);
    const fx = it.potion;
    const needsBattle = fx.might || fx.protect || fx.fragile;
    if (needsBattle && !b) return { ok: false, msg: '전투 중에만 쓸 수 있습니다' };
    if (fx.heal) {
      if (run.player.hp >= run.player.maxHp) return { ok: false, msg: '체력이 가득 찼습니다' };
      applyMods(run.player, { heal: fx.heal });
    }
    if (b) {
      const st = b.player.status;
      if (fx.might) st.might += fx.might;
      if (fx.protect) st.protect += fx.protect;
      if (fx.fragile) st.fragile += fx.fragile;
    }
    run.potions.splice(i, 1);
    return { ok: true, item: it };
  }

  // ───────── 저장 / 불러오기 ─────────
  function serializeRun(run) {
    const p = run.player;
    const player = Object.assign({}, p, { drawPile: [], hand: [], discard: [], status: undefined, undyingUsed: false });
    return JSON.stringify(Object.assign({}, run, { player, v: 1 }));
  }

  function loadRun(json) {
    const run = JSON.parse(json);
    if (!run || run.v !== 1 || !D.CLASS_MAP[run.classId]) return null;
    const p = run.player;
    p.status = freshStatus();
    p.drawPile = []; p.hand = []; p.discard = [];
    run.unlocked = run.unlocked || unlockedIds(null);
    run.asc = run.asc || 0;
    run.ascReached = run.ascReached || 0;
    run.revives = run.revives || 0;
    p.hemorrhage = !!D.CLASS_MAP[run.classId].trait.hemorrhage;
    const maxUid = Math.max(0, ...p.deck.map(c => c.uid));
    if (maxUid >= uidSeq) uidSeq = maxUid + 1;
    return run;
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
    const A = ascMods(run.asc);
    e.maxHp = e.hp = Math.round(def.hp * B.enemyHpMul[kind] * (1 + B.hpPerFloor * (f - 1)) * (1 + A.enemyHp + (kind !== 'normal' ? A.bossHp : 0)));
    e.slots = Math.min(3, def.slots + (kind === 'normal' && f >= B.extraSlotFloor ? 1 : 0));
    e.basePower = B.enemyPower[kind] + Math.floor((f - 1) / B.powerEveryFloors) + A.enemyPower;
    e.energy += A.enemyEnergy;
    e.diceMax += A.enemyDiceMax;
    e.sigEvery = A.sigEvery;
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
    if (run.nextBuff) {
      b.player.status.might += run.nextBuff.might || 0;
      b.player.status.protect += run.nextBuff.protect || 0;
      run.nextBuff = null;
    }
    if (b.player.openBleed) enemy.status.bleed += b.player.openBleed;
    return b;
  }

  function isSigTurn(b, turn) { return !!b.enemy.signature && turn % (b.enemy.sigEvery || 3) === 0; }

  function startTurn(b, rng) {
    b.turn++;
    [b.player, b.enemy].forEach(c => {
      TURN_KEYS.forEach(k => { c.status[k] = c.status[k + 'Next']; c.status[k + 'Next'] = 0; });
      draw(c, rng);
    });
    b.enemyPlan = enemyChoose(b, rng);
    if (isSigTurn(b, b.turn)) b.enemyPlan.unshift(b.enemy.signature);
    b.rows = Math.max(b.player.hand.length, b.enemyPlan.length);
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
        (atk ? st.might + buff.might - st.weak : st.endure + buff.endure + (owner.guardPower || 0));
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
    const pMax = !!p.firstTurnMax && b.turn === 1; // 첫 수의 축복
    const cb = {
      roll: (side, d) => (side === 'a' && pMax ? d.max : randInt(d.min, d.max, Math.random)),
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
      // 불멸 (승천 9 보상): 판당 1회, 최대 체력 절반으로 되살아난다
      if (target.hp <= 0 && target.isPlayer && b.run && b.run.revives > 0) {
        b.run.revives--;
        target.hp = Math.ceil(target.maxHp / 2);
        push({ t: 'revive', side: sideOf(target), amount: target.hp });
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
    // 출혈 부여. 방랑검사가 건 출혈이 6 이상 쌓이면 과다출혈로 바뀐다
    function addBleed(from, c, n) {
      addStatus(c, 'bleed', n);
      if (from.hemorrhage && c.status.bleed >= 6) {
        const moved = c.status.bleed;
        c.status.bleed = 0;
        c.status.hemo += moved;
        push({ t: 'status', side: sideOf(c), key: 'hemo', amount: moved, converted: true });
      }
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
          const o = X.owner;
          // 출혈: 합이든 공격이든 공격 주사위를 굴릴 때마다 피해, 수치 1/3 감소
          if (d.atk && o.status.bleed > 0 && o.hp > 0) {
            const bl = o.status.bleed;
            damage(o, bl);
            o.status.bleed = bl - Math.ceil(bl / 3);
            push({ t: 'proc', side: sideOf(o), key: 'bleed', amount: bl });
          }
          // 과다출혈: 어떤 주사위든 굴릴 때마다 피해, 수치 1/4 감소
          if (o.status.hemo > 0 && o.hp > 0) {
            const h = o.status.hemo;
            damage(o, h);
            o.status.hemo = h - Math.ceil(h / 4);
            push({ t: 'proc', side: sideOf(o), key: 'hemo', amount: h });
          }
          if (o.isPlayer && o.firstTurnMax && b.turn === 1) return d.max; // 첫 수의 축복
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
          // 강타: 주사위 값의 1/n 고정 피해 (내성·보호·피해 감소 무시)
          if (fx.smash && tgt.hp > 0) {
            const extra = Math.max(1, Math.floor(value / fx.smash));
            damage(tgt, extra);
            push({ t: 'proc', side: sideOf(tgt), key: 'smash', amount: extra });
          }
          // 파열: 피격마다 수치만큼 피해, 1/3 감소
          if (tgt.status.rupture > 0 && tgt.hp > 0) {
            const r = tgt.status.rupture;
            damage(tgt, r);
            tgt.status.rupture = r - Math.ceil(r / 3);
            push({ t: 'proc', side: sideOf(tgt), key: 'rupture', amount: r });
          }
          // 속성: 같은 속성이 이미 걸려 있으면 효과 발동, 다르면 새 속성으로
          if (fx.element && tgt.hp > 0) {
            const em = tgt.status.element;
            if (em && em.type === fx.element) {
              em.n++;
              const n = em.n;
              push({ t: 'element', side: sideOf(tgt), type: fx.element, n });
              const per = D.ELEMENTS[fx.element].per;
              if (fx.element === 'fire') addStatus(tgt, 'burn', per * n);
              else if (fx.element === 'ice') addStatus(tgt, 'weakNext', per * n);
              else if (fx.element === 'lightning') { damage(tgt, per * n); push({ t: 'proc', side: sideOf(tgt), key: 'lightning', amount: per * n }); }
              else if (fx.element === 'holy') heal(X.owner, per * n);
            } else {
              tgt.status.element = { type: fx.element, n: 1 };
              push({ t: 'status', side: sideOf(tgt), key: 'element', amount: 1, element: fx.element });
              if (X.owner.elementPrime) {
                const per = D.ELEMENTS[fx.element].per;
                push({ t: 'element', side: sideOf(tgt), type: fx.element, n: 1 });
                if (fx.element === 'fire') addStatus(tgt, 'burn', per);
                else if (fx.element === 'ice') addStatus(tgt, 'weakNext', per);
                else if (fx.element === 'lightning') { damage(tgt, per); push({ t: 'proc', side: sideOf(tgt), key: 'lightning', amount: per }); }
                else if (fx.element === 'holy') heal(X.owner, per);
              }
            }
          }
          if (fx.bleed) addBleed(X.owner, tgt, fx.bleed);
          if (fx.burn) addStatus(tgt, 'burn', fx.burn);
          if (fx.rupture) addStatus(tgt, 'rupture', fx.rupture);
          if (!X.hit) {
            X.hit = true;
            if (X.owner.firstHitBleed) addBleed(X.owner, tgt, X.owner.firstHitBleed);
            if (X.owner.firstHitBurn) addStatus(tgt, 'burn', X.owner.firstHitBurn);
            if (fx.weak) addStatus(tgt, 'weakNext', fx.weak);
            if (fx.fragile) addStatus(tgt, 'fragileNext', fx.fragile);
          }
          const ls = (fx.lifesteal || 0) + (X.owner.lifesteal || 0);
          if (ls > 0) { const h = Math.floor(dmg * ls); if (h > 0) heal(X.owner, h); }
        },
      });
    }

    // 턴이 끝나면 손패를 모두 버린다 (다음 턴에 새로 뽑는다)
    [p, e].forEach(c => { c.discard.push(...c.hand); c.hand = []; });

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
    const gold = (randInt(lo, hi, rng || Math.random) + (p.goldBonus || 0)) * (hasAscReward(run, 'plenty') ? 2 : 1);
    run.gold += gold;
    if (p.winHeal) applyMods(p, { heal: p.winHeal });
    const boss = b.kind === 'boss';
    let won = false;
    if (boss) {
      run.bossKills++;
      applyMods(p, { heal: Math.round(p.maxHp * D.BALANCE.bossHealPct) });
      if (run.floor >= D.WIN_FLOOR && !run.won) { run.won = true; won = true; }
    }
    return { boss, gold, won };
  }

  // ───────── 보상 / 아이템 ─────────
  function weighted(weights, rng) {
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    let r = rng() * total;
    for (const k of Object.keys(weights)) { r -= weights[k]; if (r < 0) return k; }
    return Object.keys(weights)[0];
  }

  const itemOk = (run, it) => (!it.cond || it.cond(run.player)) && isUnlocked(run.unlocked, 'item', it.id)
    && (it.type !== 'relic' || isUnlocked(run.unlocked, 'relics', it.rarity));
  const cardOk = (run, id) => isUnlocked(run.unlocked, 'cards', D.CARDS[id].rarity) && (!isAscCard(run.classId, id) || hasAscReward(run, 'arsenal'));

  // 희귀도에 맞는 아이템 하나 (카드 아이템이면 직업 카드도 정한다). 이미 뽑힌 것은 제외.
  function rollItem(run, rarity, taken, rng) {
    const items = D.ITEMS.filter(it => it.rarity === rarity && itemOk(run, it) && !taken.some(o => o.item.id === it.id));
    if (!items.length) return null;
    const item = pick(items, rng);
    const opt = { item };
    if (item.type === 'card') {
      const pool = D.CLASS_MAP[run.classId].pool.filter(id => D.CARDS[id].rarity === rarity && cardOk(run, id) && !taken.some(o => o.cardId === id));
      if (!pool.length) return null;
      opt.cardId = pick(pool, rng);
    }
    return opt;
  }

  function rollRewards(run, kind, rng) {
    const base = D.RARITY_WEIGHTS[kind] || D.RARITY_WEIGHTS.normal;
    const weights = Object.assign({}, base);
    if (ascMods(run.asc).legendaryHalf) weights.legendary = base.legendary / 2;
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
    else if (it.type === 'potion') addPotion(run, it.id);
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
    const mul = 1 + ascMods(run.asc).shopPrice;
    const price = r => Math.round(S.price[r] * mul);
    const fixed = S.fixed.map(id => ({ item: D.ITEMS.find(i => i.id === id), price: price('basic'), fixed: true }));
    const random = [];
    const weights = S.weights(run.floor);
    let tries = 0;
    while (random.length < S.randomCount && tries++ < 300) {
      const opt = rollItem(run, weighted(weights, rng), random, rng);
      if (opt) random.push(Object.assign(opt, { price: price(opt.item.rarity), sold: false }));
    }
    return { fixed, random };
  }

  // 승천 9 보상: 은화를 내고 하단 물건을 새로 뽑는다 (상점마다 1회)
  // 승천 4 보상: 시작 유물 후보 (일반 유물 3개)
  // 승천 4 보상 「전설의 유산」: 시작 전설 유물 후보 3개
  function startRelicChoices(run, rng) {
    const items = shuffle(D.ITEMS.filter(it => it.type === 'relic' && it.rarity === 'legendary' && (!it.cond || it.cond(run.player))), rng);
    return items.slice(0, 3).map(item => ({ item }));
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
    makeMap, mapChoices, enterNode, currentNode, finishNode, startRegion, rest, rollTreasure,
    rollEvent, canChoose, applyEventChoice, swapEventCard, upgradeCard, addPotion, usePotion, serializeRun, loadRun,
    freshMeta, unlockedIds, isUnlocked, ascensionOf, ascMods, lightPoints, recordBossKill, recordRun,
    hasAscReward, ascRewards, potionSlots, isAscCard, classPassive, startRelicChoices,
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else root.FFD = API;
})(typeof window !== 'undefined' ? window : globalThis);
