#!/usr/bin/env node
/*
 * 밸런스 확인용 자동 플레이 시뮬레이터.
 * 단순한 AI가 여러 판을 플레이하고 도달 층 분포를 출력한다.
 *   node tools/simulate.js [판 수]
 */
'use strict';
const D = require('../js/data.js');
const G = require('../js/engine.js');

const RUNS = Number(process.argv[2]) || 500;
const rng = Math.random;
const MAX_FLOOR = 40;

function randomPassives() {
  const ids = [];
  let left = D.LIGHT_POINTS;
  const pool = D.PASSIVES.slice().sort(() => rng() - 0.5);
  for (const p of pool) if (p.cost <= left) { ids.push(p.id); left -= p.cost; }
  return ids;
}

function score(owner, c) {
  const v = G.effective(owner, c);
  return v.base + v.coins * v.cp * v.head + v.coins * 1.5;
}

// 게임의 '자동 배치'와 같은 방식: 가능한 조합과 줄 배치를 모두 따져 기대값이 가장 큰 배치
function playerPlan(b) {
  const p = b.player;
  const e = b.enemy;
  const hand = p.hand;
  const rows = b.rows;
  const mine = hand.map(c => G.expectedDamage(p, c, e));
  const theirs = Array.from({ length: rows }, (_, r) => (b.enemyPlan[r] ? G.expectedDamage(e, b.enemyPlan[r], p) : 0));
  const odds = hand.map(c => Array.from({ length: rows }, (_, r) => (b.enemyPlan[r] ? G.pairOdds(b, c, b.enemyPlan[r], null, 60) : null)));
  let best = { v: -Infinity, pick: [] };
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
  best.pick.forEach((h, r) => { if (h >= 0) b.plan[r] = hand[h].uid; });
}

function pickReward(run, opts) {
  const pref = opts.find(o => o.item.type === 'relic') || opts.find(o => o.item.type === 'heal' && run.player.hp < run.player.maxHp * 0.5) || opts[0];
  let target;
  if (G.needsCardTarget(pref)) {
    const deck = run.player.deck.slice().sort((a, c) => score(run.player, a) - score(run.player, c));
    target = pref.item.type === 'card' ? deck[0].uid : deck[deck.length - 1].uid;
  }
  G.applyReward(run, pref, target);
}

const perFloor = {};

function playRun() {
  const run = G.createRun(randomPassives());
  while (run.floor <= MAX_FLOOR) {
    const b = G.startBattle(run, rng);
    const hp0 = run.player.hp;
    while (!b.outcome) {
      playerPlan(b);
      G.resolveTurn(b, rng);
      if (!b.outcome) G.startTurn(b, rng);
      if (b.turn > 100) { b.outcome = 'lose'; }
    }
    const st = perFloor[run.floor] || (perFloor[run.floor] = { n: 0, loss: 0, turns: 0 });
    st.n++;
    st.loss += hp0 - Math.max(0, run.player.hp);
    st.turns += b.turn;
    if (b.outcome === 'lose') return { floor: run.floor, kind: b.kind };
    const boss = G.finishBattle(run, b);
    pickReward(run, G.rollRewards(run, b.kind, rng));
    if (boss) G.chooseRegion(run, G.regionChoices(run, rng)[0].id);
    run.floor++;
  }
  return { floor: MAX_FLOOR + 1, kind: 'clear' };
}

const results = [];
for (let i = 0; i < RUNS; i++) results.push(playRun());
const floors = results.map(r => r.floor).sort((a, b) => a - b);
const avg = floors.reduce((a, b) => a + b, 0) / floors.length;
const pct = q => floors[Math.floor(q * (floors.length - 1))];
const reach = f => (100 * floors.filter(x => x > f).length / floors.length).toFixed(1);
const byKind = {};
results.forEach(r => { byKind[r.kind] = (byKind[r.kind] || 0) + 1; });

console.log(`판 수: ${RUNS}`);
console.log(`평균 사망 층: ${avg.toFixed(2)}  중앙값: ${pct(0.5)}  상위 10%: ${pct(0.9)}`);
console.log(`3층(중간보스) 돌파: ${reach(3)}%  5층(보스) 돌파: ${reach(5)}%  10층 돌파: ${reach(10)}%  15층 돌파: ${reach(15)}%  20층 돌파: ${reach(20)}%`);
console.log('사망한 전투 종류:', byKind);

console.log('\n층  종류      전투수  평균 체력 손실  평균 턴');
Object.keys(perFloor).map(Number).filter(f => f <= 15).forEach(f => {
  const st = perFloor[f];
  console.log(`${String(f).padStart(2)}  ${G.floorKind(f).padEnd(8)}  ${String(st.n).padStart(6)}  ${(st.loss / st.n).toFixed(1).padStart(13)}  ${(st.turns / st.n).toFixed(1).padStart(7)}`);
});
