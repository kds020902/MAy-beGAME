#!/usr/bin/env node
/*
 * 밸런스 확인용 자동 플레이 시뮬레이터.
 * 게임의 '자동 배치'와 같은 방식으로 여러 판을 플레이하고 직업별 도달 층을 출력한다.
 *   node tools/simulate.js [직업당 판 수]
 */
'use strict';
const D = require('../js/data.js');
const G = require('../js/engine.js');

const RUNS = Number(process.argv[2]) || 300;
const rng = Math.random;
const MAX_FLOOR = 40;

function randomPassives() {
  const ids = [];
  let left = D.LIGHT_POINTS;
  const pool = D.PASSIVES.slice().sort(() => rng() - 0.5);
  for (const p of pool) if (p.cost <= left) { ids.push(p.id); left -= p.cost; }
  return ids;
}

// 가능한 카드 조합과 줄 배치를 모두 따져 (가하는 피해 - 받는 피해) 기대값이 가장 큰 배치
function playerPlan(b) {
  const p = b.player;
  const hand = p.hand;
  const rows = b.rows;
  const table = hand.map(c => Array.from({ length: rows }, (_, r) => G.pairOdds(b, c, b.enemyPlan[r] || null, null, 40)));
  const idle = Array.from({ length: rows }, (_, r) => (b.enemyPlan[r] ? G.pairOdds(b, null, b.enemyPlan[r], null, 40).taken : 0));
  let best = { v: -Infinity, pick: [] };
  const used = new Array(hand.length).fill(false);
  const pick = new Array(rows).fill(-1);
  (function rec(r, count, cost) {
    if (r === rows) {
      let v = 0;
      for (let i = 0; i < rows; i++) {
        const h = pick[i];
        if (h < 0) v -= idle[i];
        else v += table[h][i].dealt - table[h][i].taken;
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
  best.pick.forEach((h, r) => { if (h >= 0) b.plan[r] = hand[h].uid; });
}

function cardValue(p, c) {
  return G.effective(p, c).dice.reduce((s, d) => s + (d.min + d.max) / 2 * (d.atk ? 1 : 0.7), 0) / (G.cardDef(c).cost + 1);
}

function target(run, opt) {
  if (!G.needsCardTarget(opt)) return undefined;
  const deck = run.player.deck.slice().sort((a, c) => cardValue(run.player, a) - cardValue(run.player, c));
  return opt.item.type === 'card' ? deck[0].uid : deck[deck.length - 1].uid;
}

function pickReward(run, opts) {
  const p = run.player;
  const pref = (p.hp < p.maxHp * 0.5 && opts.find(o => o.item.type === 'heal')) || opts.find(o => o.item.type === 'relic') || opts[0];
  G.applyReward(run, pref, target(run, pref));
}

function shop(run) {
  const s = G.rollShop(run, rng);
  const p = run.player;
  for (let k = 0; k < 10; k++) {
    const wants = s.random.filter(e => !e.sold && e.price <= run.gold && e.item.type !== 'heal')
      .sort((a, c) => c.price - a.price);
    let e = wants[0];
    if (!e && p.hp < p.maxHp * 0.7 && run.gold >= s.fixed[0].price) e = s.fixed[0];
    if (!e) break;
    G.buy(run, e, target(run, e));
  }
}

function playRun(classId) {
  const run = G.createRun(classId, randomPassives());
  while (run.floor <= MAX_FLOOR) {
    const b = G.startBattle(run, rng);
    const hp0 = run.player.hp;
    while (!b.outcome) {
      playerPlan(b);
      G.resolveTurn(b, rng);
      if (!b.outcome) G.startTurn(b, rng);
      if (b.turn > 100) b.outcome = 'lose';
    }
    const st = perFloor[run.floor] || (perFloor[run.floor] = { n: 0, loss: 0, turns: 0 });
    st.n++;
    st.loss += hp0 - Math.max(0, run.player.hp);
    st.turns += b.turn;
    if (b.outcome === 'lose') return { floor: run.floor, kind: b.kind };
    const res = G.finishBattle(run, b, rng);
    pickReward(run, G.rollRewards(run, b.kind, rng));
    if (G.isShopFloor(run.floor)) shop(run);
    if (res.boss) G.chooseRegion(run, G.regionChoices(run, rng)[0].id);
    run.floor++;
  }
  return { floor: MAX_FLOOR + 1, kind: 'clear' };
}

const perFloor = {};
for (const cls of D.CLASSES) {
  const floors = [];
  for (let i = 0; i < RUNS; i++) floors.push(playRun(cls.id).floor);
  floors.sort((a, b) => a - b);
  const avg = floors.reduce((a, b) => a + b, 0) / floors.length;
  const reach = f => (100 * floors.filter(x => x > f).length / floors.length).toFixed(0).padStart(3);
  console.log(`${cls.name.padEnd(5)} 평균 ${avg.toFixed(1).padStart(4)}층 | 돌파율 3층 ${reach(3)}%  5층 ${reach(5)}%  10층 ${reach(10)}%  15층 ${reach(15)}%  20층 ${reach(20)}%`);
}

console.log('\n층  종류      전투수  평균 체력 손실  평균 턴');
Object.keys(perFloor).map(Number).filter(f => f <= 15).forEach(f => {
  const st = perFloor[f];
  console.log(`${String(f).padStart(2)}  ${G.floorKind(f).padEnd(8)}  ${String(st.n).padStart(6)}  ${(st.loss / st.n).toFixed(1).padStart(13)}  ${(st.turns / st.n).toFixed(1).padStart(7)}`);
});
