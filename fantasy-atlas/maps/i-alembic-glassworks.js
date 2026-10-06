// 유리 공방(하위 지도) — 연금술 거리 서쪽 벼랑 위 유리 공방 1층. 서쪽 벽의 벽돌 녹임 가마(불구멍)와 풀무, 그 앞 불기 작업대와 쇠 마버 탁자,
// 북쪽 벽 식힘 선반(뜨거운 병이 식어 간다), 색유리 막대 돌림 걸이, 남동쪽 완성품 진열대, 담금질 물통과 깨진 유리 통.
// 남·동쪽(기본 시점 쪽) 벽은 잘라 낮췄다. 좌표: +x 동쪽, +z 남쪽. 정문은 동쪽 (연금술 거리의 하위 지도)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 56, D = 56, Hh = 48, G = 10;
  const X0 = 15, X1 = 40, Z0 = 17, Z1 = 38, DZ = 27, CZ = 27;            // 벽 안쪽 경계, 정문 가운데 z(동쪽 벽)
  MAPS.push({
    id: 'alembic-glassworks', cat: 'magic', sub: true, parent: 'alembic', name: '유리 공방', en: 'Alembic Row · Glassworks', color: '#ffa040', seed: 3132, base: G, time: 'night', size: [W, D, Hh],
    desc: '연금술 거리 서쪽 벼랑 위, 물약병을 불어 만드는 유리 공방의 작업장. 서쪽 벽 벽돌 가마의 불구멍이 밤낮없이 주황빛을 뿜고, 그 앞 작업대에서는 대롱 끝 유리 방울이 부풀어 오른다. 북쪽 식힘 선반에서 갓 분 병들이 천천히 식어 가고, 남동쪽 진열대에는 일곱 색 완성품 병이 줄지어 있다.',
    info: { title: '장소 정보', en: 'GLASSWORKS', rows: [['작업장', '녹임 가마 · 불기 작업대 · 마버 탁자'], ['식힘 선반', '뜨거운 병을 천천히 식힌다'], ['진열', '일곱 색 완성품 병'], ['주의', '빨갛게 빛나는 유리는 만지지 말 것']] },
    sky: ['#2a2018', '#0e0a08', '#ffa040'], stars: true,
    hemi: ['#ffe8d0', '#2a2018', 0.64], sun: ['#fff0e0', 0.46, [0.45, 1, 0.5]],
    day: { sky: ['#f0e0d0', '#b89878', '#fff8e8'], stars: false, hemi: ['#ffffff', '#4a4038', 0.62], sun: ['#fff8e0', 0.72, [0.45, 1, 0.5]] },
    fog: { start: 0.94, floor: G - 8, depth: 6 },
    camY: -1, zoom: 2.3,
    spawn: [X1 - 2, G + 1, DZ],
    particles: [
      { n: 40, colors: ['#ffb070', '#ffd060', '#ff6a2a'], mode: 'rise', speed: 0.7, area: [X0 + 3.5, CZ + 0.5, 2], y0: G + 3, y1: G + 18, glow: true },
      { n: 50, colors: ['#f0e0c0', '#ffffff'], mode: 'drift', speed: 0.1, area: [28, 28, 11], y0: G + 2, y1: G + 12, glow: true },
    ],
    blocks: {
      cob: { c: '#4a4a40', top: '#5a5a50', v: 0.12, pat: 'stone' }, rock: { c: '#3a3a36', v: 0.06, pat: 'stone' }, found: { c: '#5a5a54', v: 0.05, pat: 'stone' },
      flag: { c: '#6a6058', top: '#8a7e70', v: 0.05, pat: 'big' }, flag2: { c: '#5a524a', top: '#766c60', v: 0.05, pat: 'big' },
      wallC: { c: '#c8c0a8', v: 0.04 }, frame: { c: '#3a2a1a', v: 0.05 }, door: { c: '#2a1a10', v: 0.03, pat: 'plank' }, knob: { c: '#e0c060', v: 0.05 },
      brick: { c: '#8a4a3a', v: 0.06, pat: 'brick' }, brickDk: { c: '#5a3028', v: 0.06, pat: 'brick' }, soot: { c: '#2a2220', v: 0.04 }, iron: { c: '#3a3a40', v: 0.04 }, steel: { c: '#8a8e96', v: 0.03 },
      plank: { c: '#6a4a30', v: 0.06, pat: 'plank' }, desk: { c: '#4a3020', v: 0.04 }, crate: { c: '#7a5a3a', v: 0.06, pat: 'plank' }, sand: { c: '#d8c090', v: 0.08 }, log: { c: '#4a3020', v: 0.06, pat: 'log' }, leather: { c: '#6a4028', v: 0.05 },
      water: { c: '#3a6a8a', v: 0.04 }, copper: { c: '#c07a3a', v: 0.08 },
      glass: { c: '#a8e0c8', v: 0.03 }, glassB: { c: '#8ac8e8', v: 0.03 }, cullet: { c: '#c8f0e0', v: 0.08 },
      hot: { c: '#ff8a3a', glow: true }, hot2: { c: '#ffd060', glow: true }, fire: { c: '#ff6a2a', glow: true }, ember: { c: '#ffb040', glow: true },
      potG: { c: '#8aff5a', glow: true }, potP: { c: '#d07aff', glow: true }, potR: { c: '#ff6a8a', glow: true }, potB: { c: '#6ac8ff', glow: true }, potY: { c: '#ffe060', glow: true }, potI: { c: '#8a7aff', glow: true },
      winG: { c: '#c8ff8a', night: true, day: '#7a9a80' }, lamp: { c: '#ffe0a0', glow: true },
    },
    build(w) {
      const B = w.id;
      w.hm = new Int16Array(W * D).fill(G);
      const lights = [], acts = [], landmarks = [];
      const pots = [B.potG, B.potP, B.potR, B.potB, B.potY, B.potI];
      const inside = (x, z) => x >= X0 && x <= X1 && z >= Z0 && z <= Z1;

      // ── 벼랑 위 자갈 마당 · 작업장 바닥(큰 판석) ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        for (let y = G - 4; y < G; y++) w.set(x, y, z, B.rock);
        w.set(x, G, z, inside(x, z) ? (hash3(x >> 1, 2, z >> 1) > 0.5 ? B.flag : B.flag2) : (x > X1 + 2 && Math.abs(z - DZ) <= 2 ? B.found : B.cob));
      }
      // ── 벽: 반목조 회벽. 북·서는 높게, 남·동은 낮게 ──
      const HT = G + 13;
      for (let z = Z0 - 2; z <= Z1 + 2; z++) for (let x = X0 - 2; x <= X1 + 2; x++) {
        if (inside(x, z)) continue;
        const back = (x < X0 || z < Z0) && x <= X1 && z <= Z1, top = back ? HT : G + 3;
        const u = x < X0 ? z : x;
        for (let y = G + 1; y <= top; y++) w.set(x, y, z, u % 4 === 0 || y === G + 1 || y === G + 7 || y === top || (x < X0 && z < Z0) ? B.frame : B.wallC);
      }
      for (let x = X0 + 3; x <= X1 - 3; x += 8) for (const z of [Z0 - 2, Z0 - 1]) { w.box(x, G + 3, z, x + 1, G + 5, z, B.winG); w.box(x, G + 9, z, x + 1, G + 11, z, B.winG); }
      // ── 정문(동쪽) ──
      w.box(X1 + 1, G + 1, DZ - 1, X1 + 2, G + 4, DZ + 1, 0);
      w.box(X1 + 2, G + 1, DZ - 1, X1 + 2, G + 4, DZ + 1, B.door); w.set(X1 + 2, G + 3, DZ - 1, B.knob);
      for (const z of [DZ - 2, DZ + 2]) w.box(X1 + 1, G + 1, z, X1 + 2, G + 5, z, B.frame); w.box(X1 + 1, G + 5, DZ - 2, X1 + 2, G + 5, DZ + 2, B.frame);
      w.set(X1 + 1, G + 6, DZ, B.glass); w.set(X1 + 1, G + 7, DZ, B.potB);
      acts.push(OR.goAct({ at: [X1, G + 1, DZ], name: '밖으로 나가기', goto: 'alembic', hint: '동쪽 문을 열고 벌집 가마가 타오르는 벼랑 위 마당으로 나가요', hit: [X1 - 1, G + 1, DZ - 1, X1, G + 4, DZ + 1] }));

      // ── 녹임 가마(서쪽 벽): 벽돌 반구, 불구멍, 굴뚝, 풀무 ──
      const FX = X0 + 3;
      w.sphere(FX, G + 1, CZ, 4.6, B.brick, (dx, dy) => dy >= 0);
      w.sphere(FX, G + 1, CZ, 3.4, 0, (dx, dy) => dy >= 0);
      w.box(FX - 2, G + 1, CZ - 2, FX + 2, G + 1, CZ + 2, B.brickDk);
      for (let k = 0; k < 5; k++) w.set(FX - 2 + k, G + 1, CZ - 2 + ((k * 3) % 5), B.ember);
      w.box(FX + 3, G + 2, CZ - 1, FX + 5, G + 4, CZ + 1, 0);                                            // 불구멍(동쪽으로 뚫림)
      w.box(FX + 4, G + 1, CZ - 2, FX + 4, G + 5, CZ - 2, B.brickDk); w.box(FX + 4, G + 1, CZ + 2, FX + 4, G + 5, CZ + 2, B.brickDk); w.box(FX + 4, G + 5, CZ - 1, FX + 4, G + 5, CZ + 1, B.brickDk);
      w.box(FX - 1, G + 5, CZ - 1, FX + 1, G + 15, CZ + 1, B.brick); w.box(FX - 1, G + 16, CZ - 1, FX + 1, G + 16, CZ + 1, B.brickDk);
      const flames = w.prop({ name: 'flames', pivot: [FX + 0.5, G + 2, CZ + 0.5] });
      for (let dz = -1; dz <= 1; dz++) { flames.set(FX + 1, G + 2, CZ + dz, B.fire); flames.set(FX + 2, G + 2, CZ + dz, B.hot); }
      flames.set(FX + 1, G + 3, CZ, B.hot2); flames.set(FX, G + 3, CZ, B.fire); flames.set(FX + 2, G + 3, CZ, B.ember);
      lights.push({ name: 'furnace', p: [FX + 4.5, G + 3, CZ + 0.5], c: '#ff8a3a', i: 1.6, d: 18, flicker: 0.35 });
      // 풀무(가마 북쪽)
      const BX = FX + 2, BZ = CZ - 6;
      w.box(BX - 1, G + 1, BZ, BX + 1, G + 1, BZ, B.log); w.line(BX, G + 2, BZ + 1, FX + 1, G + 2, CZ - 4, B.iron);
      const bel = w.prop({ name: 'bellows', pivot: [BX + 0.5, G + 2.5, BZ + 0.5] });
      bel.box(BX - 1, G + 2, BZ, BX + 1, G + 3, BZ, B.leather); bel.set(BX, G + 4, BZ, B.plank); bel.set(BX, G + 5, BZ, B.plank);
      acts.push({
        name: '가마 불', hint: '풀무를 밟으면 녹임 가마 불구멍에서 불길이 확 치솟고 불티가 쏟아져요', hit: [BX - 2, G + 1, BZ - 1, FX + 5, G + 5, CZ + 2],
        run: async a => {
          a.flash('furnace', 5, 4); a.glow(1.6, 3);
          for (let k = 0; k < 3; k++) {
            await a.move('bellows', [0, -1.6, 0], 0.25);
            a.move('flames', [2.4, 1, 0], 0.3);
            a.burst([FX + 5.5, G + 3.5, CZ + 0.5], { n: 30, colors: ['#ff6a2a', '#ffd060', '#ffffff'], speed: 6, up: 2, life: 1, gravity: -1, spread: 0.6 });
            await a.move('bellows', [0, 0, 0], 0.35); await a.move('flames', [0, 0, 0], 0.3);
          }
          for (let k = 0; k < 4; k++) { a.burst([FX + 0.5, G + 17, CZ + 0.5], { n: 16, colors: ['#ffb070', '#f0e0c0'], speed: 1, up: 4, life: 2, gravity: -0.6, spread: 0.6 }); await a.wait(0.3); }
        },
      });

      // ── 불기 작업대(가마 앞)와 대롱, 쇠 마버 탁자 ──
      const JX = FX + 8, JZ = CZ + 4;
      w.box(JX, G + 1, JZ, JX + 3, G + 2, JZ, B.plank); w.box(JX, G + 1, JZ + 2, JX + 3, G + 1, JZ + 2, B.plank);
      w.box(JX, G + 3, JZ, JX, G + 3, JZ + 2, B.plank); w.box(JX + 3, G + 3, JZ, JX + 3, G + 3, JZ + 2, B.plank);
      w.line(JX + 3, G + 4, JZ + 1, JX - 3, G + 4, JZ + 1, B.iron);
      const blob = w.prop({ name: 'gblob', pivot: [JX - 4.5, G + 4.5, JZ + 1.5], scl0: [0.35, 0.35, 0.35] });
      blob.sphere(JX - 5, G + 4, JZ + 1, 1.8, B.hot); blob.set(JX - 5, G + 4, JZ + 1, B.hot2);
      lights.push({ name: 'blob', p: [JX - 4.5, G + 4.5, JZ + 1.5], c: '#ffa040', i: 1, d: 10, flicker: 0.2 });
      acts.push({
        name: '유리 불기', hint: '대롱 끝 빨간 유리 방울이 숨을 불어 넣을 때마다 둥글게 부풀어 올라요', hit: [JX - 6, G + 1, JZ, JX + 3, G + 6, JZ + 2],
        run: async a => {
          a.flash('blob', 3, 4.5);
          for (const s of [0.6, 0.85, 1.1]) { await a.tween('gblob', { scl: [s, s, s] }, 0.7); a.burst([JX - 4.5, G + 4.5, JZ + 1.5], { n: 12, colors: ['#ffd060', '#ff8a3a'], speed: 2, up: 1, life: 0.8, gravity: 0, spread: 0.8 * s }); await a.wait(0.3); }
          await a.tween('gblob', { off: [0, 1.6, 0], scl: [1.2, 1.3, 1.2] }, 0.8);
          await a.tween('gblob', { off: [0, 0, 0], scl: [0.35, 0.35, 0.35] }, 1);
        },
      });
      const MX = JX + 1, MZ = JZ + 5;
      w.box(MX, G + 1, MZ, MX, G + 2, MZ, B.iron); w.box(MX + 3, G + 1, MZ, MX + 3, G + 2, MZ, B.iron); w.box(MX, G + 3, MZ - 1, MX + 3, G + 3, MZ + 1, B.steel);
      w.set(MX + 2, G + 4, MZ + 1, B.glassB); w.set(MX, G + 4, MZ - 1, B.iron);
      const bottle = w.prop({ name: 'teeter', pivot: [MX + 3.5, G + 4, MZ + 0.5] });
      bottle.set(MX + 3, G + 4, MZ, B.glass); bottle.set(MX + 3, G + 5, MZ, B.potR); bottle.set(MX + 3, G + 6, MZ, B.glass);
      acts.push({
        name: '깨진 병', hint: '마버 탁자 끝 병이 비틀비틀하다 바닥에 떨어져 와장창 깨졌다가 다시 붙어요', hit: [MX, G + 1, MZ - 1, MX + 4, G + 6, MZ + 1],
        run: async a => {
          await a.tween('teeter', { rot: [0, 0, -0.4] }, 0.25); await a.tween('teeter', { rot: [0, 0, 0.3] }, 0.25);
          await a.tween('teeter', { off: [1.5, -3, 0], rot: [0, 0, -1.4] }, 0.45);
          a.burst([MX + 4.5, G + 1.5, MZ + 0.5], { n: 50, colors: ['#c8f0e0', '#ff6a8a', '#ffffff', '#a8e0c8'], speed: 7, up: 3, life: 1.2, gravity: 9, spread: 1, flat: true });
          await a.tween('teeter', { scl: [0, 0, 0] }, 0.1);
          await a.wait(0.9);
          a.burst([MX + 3.5, G + 5, MZ + 0.5], { n: 20, colors: ['#ffd060', '#ffffff'], speed: 2, up: 2, life: 1, gravity: -0.5, spread: 0.8 });
          await a.respawn('teeter', 0.6);
        },
      });

      // ── 식힘 선반(북쪽 벽): 쇠 선반 네 칸. 아래 칸 병은 아직 뜨겁다 ──
      const KX0 = X0 + 10, KX1 = X0 + 22;
      for (let x = KX0; x <= KX1; x++) for (let y = G + 1; y <= G + 7; y++) for (const z of [Z0, Z0 + 1]) w.set(x, y, z, x === KX0 || x === KX1 ? B.iron : ((y - G) % 2 === 0 || y === G + 7 ? (z === Z0 ? B.brickDk : B.iron) : (z === Z0 ? B.brickDk : 0)));
      for (let x = KX0 + 1; x < KX1; x++) if (x % 2 === 1) for (const y of [G + 3, G + 5]) w.set(x, y, Z0 + 1, (x + y) % 3 ? B.glass : B.glassB);
      for (let x = KX0 + 1; x < KX1; x++) if (x % 2) w.set(x, G + 1, Z0 + 1, B.ember);
      w.box(KX0, G + 2, Z0 + 2, KX1, G + 2, Z0 + 2, B.iron); w.box(KX0, G + 1, Z0 + 2, KX0, G + 1, Z0 + 2, B.iron); w.box(KX1, G + 1, Z0 + 2, KX1, G + 1, Z0 + 2, B.iron);
      const hotRow = w.prop({ name: 'hotrow', pivot: [(KX0 + KX1) / 2 + 0.5, G + 3.5, Z0 + 2.5] });
      const coolRow = w.prop({ name: 'coolrow', pivot: [(KX0 + KX1) / 2 + 0.5, G + 3.5, Z0 + 2.5], scl0: [1, 0, 1] });
      for (let x = KX0 + 1; x < KX1; x += 2) { hotRow.set(x, G + 3, Z0 + 2, x % 4 ? B.hot : B.hot2); hotRow.set(x, G + 4, Z0 + 2, B.hot); coolRow.set(x, G + 3, Z0 + 2, pots[x % 6]); coolRow.set(x, G + 4, Z0 + 2, B.glass); }
      lights.push({ name: 'anneal', p: [(KX0 + KX1) / 2 + 0.5, G + 3.5, Z0 + 1.5], c: '#ffa040', i: 1, d: 12, flicker: 0.15, srcR: 5 });
      acts.push({
        name: '병 식히기', hint: '식힘 선반의 빨갛게 달아오른 병들이 김을 내뿜으며 식어 맑은 색 병이 돼요', hit: [KX0, G + 1, Z0, KX1, G + 7, Z0 + 3],
        run: async a => {
          a.flash('anneal', 2.5, 3);
          await a.move('hotrow', [0, 1, 1.6], 0.6);
          for (let k = 0; k < 5; k++) { a.burst([KX0 + 2.5 + k * 2.5, G + 5, Z0 + 3], { n: 14, colors: ['#ffffff', '#e0e8f0'], speed: 1.2, up: 3, life: 1.6, gravity: -0.8, spread: 0.6 }); await a.wait(0.25); }
          await a.tween('hotrow', { scl: [1, 0, 1] }, 0.6); await a.tween('coolrow', { scl: [1, 1, 1] }, 0.6);
          await a.wait(1.4);
          await a.tween('coolrow', { scl: [1, 0, 1] }, 0.4); await a.tween('hotrow', { off: [0, 0, 0], scl: [1, 1, 1] }, 0.5);
        },
      });

      // ── 색유리 막대 돌림 걸이(북동쪽) ──
      const RX = X1 - 6, RZ = Z0 + 4;
      w.box(RX, G + 1, RZ, RX, G + 2, RZ, B.iron); w.box(RX - 1, G + 1, RZ - 1, RX + 1, G + 1, RZ + 1, B.iron);
      const rods = w.prop({ name: 'rods', pivot: [RX + 0.5, G + 4, RZ + 0.5], axis: 'y', speed: 0.15 });
      rods.box(RX, G + 3, RZ, RX, G + 7, RZ, B.iron); rods.set(RX, G + 8, RZ, B.knob);
      for (let k = 0; k < 6; k++) { const t = k / 6 * Math.PI * 2, x = Math.round(RX + Math.cos(t) * 2), z = Math.round(RZ + Math.sin(t) * 2); rods.box(x, G + 3, z, x, G + 6, z, pots[k]); rods.set(x, G + 7, z, B.iron); }
      lights.push({ name: 'rods', p: [RX + 0.5, G + 5, RZ + 0.5], c: '#d0a0ff', i: 0.8, d: 10, flicker: 0.05 });
      acts.push({
        name: '색유리 고르기', hint: '돌림 걸이가 빙글빙글 돌다가 멈추고 고른 색유리 막대가 반짝 떠올라요', hit: [RX - 2, G + 1, RZ - 2, RX + 2, G + 8, RZ + 2],
        run: async a => {
          a.flash('rods', 3, 3.5); a.spin('rods', 9, 2.5);
          await a.wait(2.5);
          await a.move('rods', [0, 2, 0], 0.5);
          a.burst([RX + 0.5, G + 10, RZ + 0.5], { n: 30, colors: ['#8aff5a', '#d07aff', '#ff6a8a', '#6ac8ff', '#ffe060'], speed: 4, up: 2, life: 1.3, gravity: 1, spread: 1 });
          await a.wait(0.6); await a.move('rods', [0, 0, 0], 0.6);
        },
      });

      // ── 담금질 물통(작업대 남쪽)과 집게 ──
      const QX = JX - 4, QZ = Z1 - 1;
      w.box(QX - 1, G + 1, QZ - 1, QX + 1, G + 2, QZ + 1, B.log); w.set(QX, G + 2, QZ, B.water); w.set(QX, G + 1, QZ, B.water);
      w.box(QX - 1, G + 3, QZ - 1, QX + 1, G + 3, QZ - 1, B.iron);
      const tongs = w.prop({ name: 'tongs', pivot: [QX + 0.5, G + 6, QZ + 0.5] });
      tongs.box(QX, G + 4, QZ, QX, G + 8, QZ, B.iron); tongs.set(QX, G + 4, QZ, B.hot); tongs.set(QX + 1, G + 8, QZ, B.iron); tongs.set(QX - 1, G + 8, QZ, B.iron);
      acts.push({
        name: '담금질', hint: '집게에 물린 달군 유리를 물통에 담그면 치익 소리와 함께 김이 피어올라요', hit: [QX - 1, G + 1, QZ - 1, QX + 1, G + 8, QZ + 1],
        run: async a => {
          await a.move('tongs', [0, -2.2, 0], 0.5);
          for (let k = 0; k < 6; k++) { a.burst([QX + 0.5, G + 3.5, QZ + 0.5], { n: 18, colors: ['#ffffff', '#e0e8f0', '#c8d8e8'], speed: 1.4, up: 4, life: 1.8, gravity: -1, spread: 0.8 }); await a.wait(0.25); }
          await a.move('tongs', [0, 0, 0], 0.6);
        },
      });

      // ── 완성품 진열대(남동쪽, 계단식) ──
      const SX0 = X1 - 9, SZ = Z1 - 1;
      for (let x = SX0; x <= X1 - 1; x++) { w.box(x, G + 1, SZ - 2, x, G + 1, SZ, B.plank); w.box(x, G + 2, SZ - 1, x, G + 2, SZ, B.plank); w.set(x, G + 3, SZ, B.plank); }
      for (let x = SX0; x <= X1 - 1; x++) { w.set(x, G + 2, SZ - 2, pots[x % 6]); w.set(x, G + 3, SZ - 1, x % 2 ? B.glass : pots[(x + 2) % 6]); w.set(x, G + 4, SZ, x % 3 ? pots[(x + 4) % 6] : B.glassB); }
      lights.push({ name: 'shelf', p: [SX0 + 4.5, G + 4, SZ - 0.5], c: '#a0ffb0', i: 0.7, d: 10, flicker: 0.05 });
      // 모래 자루·잿물통·깨진 유리 통·장작 더미·대롱 걸이
      for (const [x, z] of [[X0 + 1, Z1 - 1], [X0 + 2, Z1 - 1], [X0 + 1, Z1 - 2]]) w.box(x, G + 1, z, x, G + 2, z, B.sand);
      w.box(X0 + 5, G + 1, Z1 - 1, X0 + 6, G + 2, Z1, B.crate); w.box(X0 + 5, G + 3, Z1 - 1, X0 + 6, G + 3, Z1, B.cullet);
      for (let z = Z0 + 1; z <= Z0 + 4; z++) w.box(X0, G + 1, z, X0 + 1, G + 2, z, B.log);
      w.box(X1, G + 1, Z0 + 1, X1, G + 1, Z0 + 7, B.plank);                                                // 대롱 걸이(동쪽 벽)
      for (const z of [Z0 + 2, Z0 + 4, Z0 + 6]) { w.set(X1, G + 2, z, B.iron); w.box(X1 - 1, G + 2, z, X1 - 1, G + 6, z, B.iron); w.set(X1 - 1, G + 7, z, B.copper); }
      w.set(X0 + 8, G + 1, Z1, B.desk); w.set(X0 + 8, G + 2, Z1, B.lamp);
      // 가운데 틀 작업대(나무 틀·집게·식은 병)와 걸상, 물약병 상자
      w.box(X0 + 14, G + 1, Z0 + 9, X0 + 14, G + 1, Z0 + 10, B.desk); w.box(X0 + 18, G + 1, Z0 + 9, X0 + 18, G + 1, Z0 + 10, B.desk); w.box(X0 + 14, G + 2, Z0 + 9, X0 + 18, G + 2, Z0 + 10, B.plank);
      w.set(X0 + 15, G + 3, Z0 + 9, B.log); w.set(X0 + 16, G + 3, Z0 + 10, B.glassB); w.set(X0 + 17, G + 3, Z0 + 9, B.potG); w.set(X0 + 17, G + 3, Z0 + 10, B.iron); w.set(X0 + 18, G + 3, Z0 + 9, B.glass);
      for (const x of [X0 + 15, X0 + 17]) w.set(x, G + 1, Z0 + 12, B.log);
      for (const [x, z] of [[X0 + 20, Z1 - 1], [X0 + 21, Z1 - 1], [X0 + 20, Z1 - 2]]) { w.set(x, G + 1, z, B.crate); w.set(x, G + 2, z, pots[(x + z) % 6]); }

      landmarks.push({ name: '녹임 가마', note: '불구멍에서 주황빛이 쏟아진다', p: [FX + 0.5, G + 20, CZ + 0.5] });
      landmarks.push({ name: '식힘 선반', note: '갓 분 병이 식어 간다', p: [(KX0 + KX1) / 2 + 0.5, G + 12, Z0 + 1.5] });
      return { lights, landmarks, acts };
    },
  });
})();
