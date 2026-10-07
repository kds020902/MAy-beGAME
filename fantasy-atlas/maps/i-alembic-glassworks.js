// 유리 공방(하위 지도) — 연금술 거리 서쪽 벼랑 위 유리 공방 1층. 서쪽 벽의 벽돌 녹임 가마(아치 불구멍·굴뚝)와 풀무, 그 앞 불기 작업대와 쇠 마버 탁자,
// 북쪽 벽 식힘 선반(뜨거운 병이 식어 간다), 색유리 막대 돌림 걸이, 남동쪽 계단식 완성품 진열대, 담금질 물통과 깨진 유리 상자.
// 남·동쪽(기본 시점 쪽) 벽은 잘라 낮췄다. 좌표: +x 동쪽, +z 남쪽. 정문은 동쪽 (연금술 거리의 하위 지도). 2배 해상도(1칸 ≈ 25cm), playerScale 2.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 112, D = 112, Hh = 96, G = 20;
  const X0 = 30, X1 = 81, Z0 = 34, Z1 = 77, DZ = 54, CZ = 54;            // 벽 안쪽 경계, 정문 가운데 z(동쪽 벽)
  const HT = G + 26;
  MAPS.push({
    id: 'alembic-glassworks', cat: 'magic', sub: true, parent: 'alembic', name: '유리 공방', en: 'Alembic Row · Glassworks', color: '#ffa040', seed: 3132, base: G, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '연금술 거리 서쪽 벼랑 위, 물약병을 불어 만드는 유리 공방의 작업장. 서쪽 벽 벽돌 가마의 불구멍이 밤낮없이 주황빛을 뿜고, 그 앞 작업대에서는 대롱 끝 유리 방울이 부풀어 오른다. 북쪽 식힘 선반에서 갓 분 병들이 천천히 식어 가고, 남동쪽 진열대에는 일곱 색 완성품 병이 줄지어 있다.',
    info: { title: '장소 정보', en: 'GLASSWORKS', rows: [['작업장', '녹임 가마 · 불기 작업대 · 마버 탁자'], ['식힘 선반', '뜨거운 병을 천천히 식힌다'], ['진열', '일곱 색 완성품 병'], ['주의', '빨갛게 빛나는 유리는 만지지 말 것']] },
    sky: ['#2a2018', '#0e0a08', '#ffa040'], stars: true,
    hemi: ['#ffe8d0', '#2a2018', 0.64], sun: ['#fff0e0', 0.46, [0.45, 1, 0.5]],
    day: { sky: ['#f0e0d0', '#b89878', '#fff8e8'], stars: false, hemi: ['#ffffff', '#4a4038', 0.62], sun: ['#fff8e0', 0.72, [0.45, 1, 0.5]] },
    fog: { start: 0.94, floor: G - 16, depth: 12 },
    camY: -2, zoom: 2.3,
    spawn: [X1 - 4, G + 1, DZ],
    particles: [
      { n: 50, colors: ['#ffb070', '#ffd060', '#ff6a2a'], mode: 'rise', speed: 1.2, area: [X0 + 6.5, CZ + 0.5, 3], y0: G + 30, y1: G + 52, glow: true },
      { n: 70, colors: ['#f0e0c0', '#ffffff'], mode: 'drift', speed: 0.18, area: [56, 56, 22], y0: G + 4, y1: G + 24, glow: true },
    ],
    blocks: {
      cob: { c: '#4a4a40', top: '#5a5a50', v: 0.12, pat: 'stone' }, rock: { c: '#3a3a36', v: 0.06, pat: 'stone' },
      cobble: { c: '#4e4e46', top: '#5e5e54', v: 0.06 }, cobble2: { c: '#46463e', top: '#54544a', v: 0.06 }, cobbleJ: { c: '#2e2e2a', top: '#363630', v: 0.04 },
      st1: { c: '#6a6a62', v: 0.05 }, st2: { c: '#5c5c56', v: 0.05 }, st3: { c: '#74726a', v: 0.05 }, mortar: { c: '#48463e', v: 0.04 }, sill: { c: '#7a786e', v: 0.04 },
      flag: { c: '#6a6058', top: '#8a7e70', v: 0.04 }, flag2: { c: '#5a524a', top: '#766c60', v: 0.04 }, flag3: { c: '#625a50', top: '#80766a', v: 0.04 }, grout: { c: '#3a3430', top: '#4a423a', v: 0.02 },
      wallC: { c: '#c8c0a8', v: 0.04 }, frame: { c: '#3a2a1a', v: 0.05 }, frameDk: { c: '#2a1e12', v: 0.04 }, door: { c: '#2a1a10', v: 0.03, pat: 'plank' }, doorDk: { c: '#1e120a', v: 0.03 }, knob: { c: '#e0c060', v: 0.05 }, mullion: { c: '#2a2a26', v: 0.02 },
      brick: { c: '#8a4a3a', v: 0.06, pat: 'brick' }, brickDk: { c: '#5a3028', v: 0.06, pat: 'brick' }, soot: { c: '#2a2220', v: 0.04 }, iron: { c: '#3a3a40', v: 0.04 }, ironDk: { c: '#26262c', v: 0.03 }, steel: { c: '#8a8e96', v: 0.03 },
      plank: { c: '#6a4a30', v: 0.06, pat: 'plank' }, desk: { c: '#4a3020', v: 0.04 }, crate: { c: '#7a5a3a', v: 0.06, pat: 'plank' }, crateEdge: { c: '#523a24', v: 0.04 }, sand: { c: '#d8c090', v: 0.08 }, sand2: { c: '#c8b080', v: 0.06 }, rope: { c: '#a08060', v: 0.05 },
      log: { c: '#4a3020', v: 0.06, pat: 'log' }, logEnd: { c: '#a07a50', v: 0.05 }, bark: { c: '#3a2a1c', v: 0.06 }, leather: { c: '#6a4028', v: 0.05 }, leatherDk: { c: '#4a2c1c', v: 0.04 },
      water: { c: '#3a6a8a', v: 0.04 }, copper: { c: '#c07a3a', v: 0.08 }, cork: { c: '#8a5a3a', v: 0.04 },
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
      const STONES = [B.st1, B.st2, B.st3, B.st1, B.st2];
      const stone = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return B.mortar;
        return STONES[(hash3(Math.floor(uu / 6), c, salt) * 5) | 0];
      };
      const bottle = (x, y, z, b, tall) => { w.set(x, y, z, b); if (tall) w.set(x, y + 1, z, b); const t = y + (tall ? 2 : 1); w.set(x, t, z, B.glass); w.set(x, t + 1, z, B.cork); };
      const crate = (x, y, z, s) => {
        for (let dy = 0; dy < s; dy++) for (let dz = 0; dz < s; dz++) for (let dx = 0; dx < s; dx++) {
          const e = (dx === 0 || dx === s - 1) + (dy === 0 || dy === s - 1) + (dz === 0 || dz === s - 1);
          w.set(x + dx, y + dy, z + dz, e >= 2 ? B.crateEdge : B.crate);
        }
      };
      const sandBag = (x, y, z) => {
        for (let dz = 0; dz < 3; dz++) for (let dx = 0; dx < 3; dx++) {
          const corner = dx !== 1 && dz !== 1;
          if (!corner) w.set(x + dx, y, z + dz, B.sand);
          w.set(x + dx, y + 1, z + dz, (dx + dz) % 2 ? B.sand : B.sand2);
          if (!corner) w.set(x + dx, y + 2, z + dz, B.sand);
        }
        w.set(x + 1, y + 3, z + 1, B.rope);
      };

      // ── 벼랑 위 자갈 마당 · 작업장 바닥(큰 판석, 줄눈) ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        for (let y = G - 8; y < G; y++) w.set(x, y, z, B.rock);
        let b;
        if (inside(x, z)) {
          const row = Math.floor((z - Z0) / 5), off = (row & 1) * 3, u = x - X0 + off;
          b = ((z - Z0) % 5 === 4 || u % 6 === 5) ? B.grout : [B.flag, B.flag2, B.flag3][(hash3(Math.floor(u / 6), row, 2) * 3) | 0];
        } else if (x > X1 + 4 && Math.abs(z - DZ) <= 4) b = (z === DZ - 4 || z === DZ + 4) ? B.sill : B.st3;
        else { const row = Math.floor(z / 3), off = (row & 1) * 2; b = (z % 3 === 2 || (x + off) % 4 === 3) ? B.cobbleJ : (hash3((x + off) >> 2, row, 3) > 0.5 ? B.cobble : B.cobble2); }
        w.set(x, G, z, b);
      }
      // ── 벽: 반목조 회벽(두께 4), 낱돌 아랫단. 북·서는 높게, 남·동은 낮게 ──
      for (let z = Z0 - 4; z <= Z1 + 4; z++) for (let x = X0 - 4; x <= X1 + 4; x++) {
        if (inside(x, z)) continue;
        const back = (x < X0 || z < Z0) && x <= X1 && z <= Z1, top = back ? HT : G + 6;
        const u = x < X0 ? z : x, inner = x === X0 - 1 || z === Z0 - 1 || x === X1 + 1 || z === Z1 + 1;
        for (let y = G + 1; y <= top; y++) {
          let b;
          if (y <= G + 3) b = stone(u, y, x < X0 ? 4 : 3);
          else if (!inner) b = B.wallC;
          else b = (((u % 8) + 8) % 8 < 2 || (x < X0 && z < Z0) || y === G + 4 || y === G + 14 || y === G + 15 || y >= top - 1) ? B.frame : B.wallC;
          w.set(x, y, z, b);
        }
        if (!back) w.set(x, G + 7, z, (x + z) % 2 ? B.frameDk : B.frame);
      }
      for (let u = X0 + 26; u + 8 <= X1; u += 16) for (let q = 0; q <= 7; q++) w.set(u + 1 + q, G + 16 + Math.round(q * 8 / 7), Z0 - 1, B.frame);
      const winN = (x0, y0, ht) => {
        for (let r = 0; r < ht; r++) for (let c = 0; c < 4; c++) for (let z = Z0 - 4; z <= Z0 - 1; z++) w.set(x0 + c, y0 + r, z, z === Z0 - 2 ? ((c === 1 || r === (ht >> 1)) ? B.mullion : B.winG) : 0);
        for (let c = -1; c <= 4; c++) { w.set(x0 + c, y0 - 1, Z0 - 1, B.sill); w.set(x0 + c, y0 + ht, Z0 - 1, B.frame); }
        for (let r = 0; r < ht; r++) { w.set(x0 - 1, y0 + r, Z0 - 1, B.frame); w.set(x0 + 4, y0 + r, Z0 - 1, B.frame); }
      };
      for (const x of [X0 + 6, X0 + 48]) winN(x, G + 6, 5);
      for (const x of [X0 + 22, X0 + 38]) winN(x, G + 18, 5);
      // ── 정문(동쪽): 문틀·상인방, 판자 문짝, 문 위 병 ──
      w.box(X1 + 1, G + 1, DZ - 2, X1 + 4, G + 9, DZ + 2, 0);
      for (let y = G + 1; y <= G + 9; y++) for (let z = DZ - 2; z <= DZ + 2; z++) w.set(X1 + 4, y, z, z === DZ - 2 || z === DZ + 2 || y === G + 1 || y === G + 5 || y === G + 9 ? B.doorDk : B.door);
      w.set(X1 + 3, G + 5, DZ - 1, B.knob);
      for (const z of [DZ - 3, DZ + 3]) w.box(X1 + 1, G + 1, z, X1 + 4, G + 10, z, B.frameDk);
      w.box(X1 + 1, G + 10, DZ - 3, X1 + 4, G + 10, DZ + 3, B.frameDk);
      w.box(X1 + 1, G + 11, DZ - 1, X1 + 2, G + 11, DZ + 1, B.sill); w.box(X1 + 1, G + 12, DZ, X1 + 1, G + 13, DZ, B.potB); w.set(X1 + 1, G + 14, DZ, B.glass); w.set(X1 + 1, G + 15, DZ, B.cork);
      acts.push(OR.goAct({ at: [X1, G + 1, DZ], h: 8, name: '밖으로 나가기', goto: 'alembic', hint: '동쪽 문을 열고 벌집 가마가 타오르는 벼랑 위 마당으로 나가요', hit: [X1 - 2, G + 1, DZ - 2, X1, G + 9, DZ + 2] }));

      // ── 녹임 가마(서쪽 벽): 벽돌 반구(띠), 아치 불구멍, 굴뚝, 풀무 ──
      const FX = X0 + 6;
      w.sphere(FX, G + 1, CZ, 9.2, B.brick, (dx, dy, dz) => dy >= 0 && dx * dx + dy * dy + dz * dz > 6.8 * 6.8);
      for (const dy of [2, 5]) { const r = Math.sqrt(9.2 * 9.2 - dy * dy); w.ring(FX, CZ, G + 1 + dy, r - 1, r + 0.3, B.brickDk); }
      w.cyl(FX, CZ, G + 1, G + 1, 5, B.brickDk);
      for (let q = 0; q < 12; q++) w.set(FX - 3 + (q % 6), G + 1, CZ - 3 + ((q * 5) % 7), B.ember);
      for (let y = G + 2; y <= G + 8; y++) for (let x = FX + 5; x <= FX + 10; x++) for (let z = CZ - 2; z <= CZ + 2; z++) if (y <= G + 6 || Math.abs(z - CZ) <= (G + 8 - y)) w.set(x, y, z, 0);   // 불구멍(동쪽, 아치)
      for (let y = G + 1; y <= G + 9; y++) for (const z of [CZ - 3, CZ + 3]) w.set(FX + 8, y, z, B.brickDk);
      for (let z = CZ - 3; z <= CZ + 3; z++) w.set(FX + 8, G + 9 + (Math.abs(z - CZ) < 2 ? 1 : 0), z, B.brickDk);
      w.box(FX + 8, G + 1, CZ - 2, FX + 9, G + 1, CZ + 2, B.sill);
      for (let y = G + 9; y <= G + 30; y++) for (let z = CZ - 1; z <= CZ + 2; z++) for (let x = FX - 1; x <= FX + 2; x++) if (x === FX - 1 || x === FX + 2 || z === CZ - 1 || z === CZ + 2 || y > G + 28) w.set(x, y, z, hash3(x, y, z) > 0.8 ? B.brickDk : B.brick);
      w.box(FX - 2, G + 31, CZ - 2, FX + 3, G + 32, CZ + 3, B.brickDk); w.box(FX, G + 32, CZ, FX + 1, G + 32, CZ + 1, B.soot); w.box(FX - 2, G + 18, CZ - 2, FX + 3, G + 18, CZ + 3, B.brickDk);
      const flames = w.prop({ name: 'flames', pivot: [FX + 3, G + 3, CZ + 0.5] });
      for (let dz = -2; dz <= 2; dz++) { flames.set(FX + 2, G + 2, CZ + dz, B.fire); flames.set(FX + 3, G + 2, CZ + dz, B.fire); flames.set(FX + 4, G + 2, CZ + dz, B.hot); flames.set(FX + 3, G + 3, CZ + dz, Math.abs(dz) < 2 ? B.hot : B.fire); }
      flames.set(FX + 3, G + 4, CZ, B.hot2); flames.set(FX + 2, G + 4, CZ + 1, B.fire); flames.set(FX + 4, G + 4, CZ - 1, B.ember); flames.set(FX + 3, G + 5, CZ, B.hot2);
      lights.push({ name: 'furnace', p: [FX + 5, G + 4, CZ + 0.5], c: '#ff8a3a', i: 1.6, d: 36, flicker: 0.35 });
      // 풀무(가마 북쪽): 통나무 받침, 가죽 주름, 손잡이, 쇠 바람관
      const BX = FX + 4, BZ = CZ - 13;
      w.box(BX - 2, G + 1, BZ, BX + 2, G + 2, BZ + 1, B.log); w.line(BX, G + 4, BZ + 2, FX + 4, G + 3, CZ - 6, B.iron, 0.6);
      const bel = w.prop({ name: 'bellows', pivot: [BX + 0.5, G + 5, BZ + 1] });
      for (let y = G + 3; y <= G + 6; y++) for (let x = BX - 2; x <= BX + 2; x++) bel.box(x, y, BZ, x, y, BZ + 1, y === G + 4 || y === G + 6 ? B.leatherDk : B.leather);
      bel.box(BX, G + 7, BZ, BX, G + 10, BZ, B.plank); bel.box(BX - 1, G + 10, BZ, BX + 1, G + 10, BZ, B.plank);
      acts.push({
        name: '가마 불', hint: '풀무를 밟으면 녹임 가마 불구멍에서 불길이 확 치솟고 불티가 쏟아져요', hit: [BX - 4, G + 1, BZ - 2, FX + 10, G + 10, CZ + 4],
        run: async a => {
          a.flash('furnace', 5, 4); a.glow(1.6, 3);
          for (let q = 0; q < 3; q++) {
            await a.move('bellows', [0, -3.2, 0], 0.25);
            a.move('flames', [4.8, 2, 0], 0.3);
            a.burst([FX + 11, G + 7, CZ + 0.5], { n: 30, colors: ['#ff6a2a', '#ffd060', '#ffffff'], speed: 12, up: 4, life: 1, gravity: -2, spread: 1.2 });
            await a.move('bellows', [0, 0, 0], 0.35); await a.move('flames', [0, 0, 0], 0.3);
          }
          for (let q = 0; q < 4; q++) { a.burst([FX + 0.5, G + 34, CZ + 0.5], { n: 16, colors: ['#ffb070', '#f0e0c0'], speed: 2, up: 8, life: 2, gravity: -1.2, spread: 1.2 }); await a.wait(0.3); }
        },
      });

      // ── 불기 작업대(가마 앞): 팔걸이 의자 같은 틀, 대롱, 쇠 마버 탁자 ──
      const JX = FX + 16, JZ = CZ + 8;
      for (const z of [JZ, JZ + 4]) for (const x of [JX, JX + 7]) w.box(x, G + 1, z, x, G + 5, z, B.desk);
      w.box(JX, G + 3, JZ, JX + 7, G + 4, JZ + 4, B.plank); w.box(JX + 2, G + 3, JZ + 1, JX + 5, G + 4, JZ + 3, B.plank);
      for (const x of [JX, JX + 7]) w.box(x, G + 6, JZ, x, G + 6, JZ + 4, B.plank);
      w.line(JX + 7, G + 7, JZ + 2, JX - 5, G + 7, JZ + 2, B.iron); w.set(JX + 7, G + 7, JZ + 2, B.leather);
      const blob = w.prop({ name: 'gblob', pivot: [JX - 8.5, G + 7.5, JZ + 2.5], scl0: [0.35, 0.35, 0.35] });
      blob.sphere(JX - 9, G + 7, JZ + 2, 3.6, B.hot); blob.sphere(JX - 9, G + 7, JZ + 2, 1.6, B.hot2);
      lights.push({ name: 'blob', p: [JX - 8.5, G + 7.5, JZ + 2.5], c: '#ffa040', i: 1, d: 20, flicker: 0.2 });
      acts.push({
        name: '유리 불기', hint: '대롱 끝 빨간 유리 방울이 숨을 불어 넣을 때마다 둥글게 부풀어 올라요', hit: [JX - 12, G + 1, JZ, JX + 7, G + 12, JZ + 4],
        run: async a => {
          a.flash('blob', 3, 4.5);
          for (const s of [0.6, 0.85, 1.1]) { await a.tween('gblob', { scl: [s, s, s] }, 0.7); a.burst([JX - 8.5, G + 7.5, JZ + 2.5], { n: 12, colors: ['#ffd060', '#ff8a3a'], speed: 4, up: 2, life: 0.8, gravity: 0, spread: 1.6 * s }); await a.wait(0.3); }
          await a.tween('gblob', { off: [0, 3.2, 0], scl: [1.2, 1.3, 1.2] }, 0.8);
          await a.tween('gblob', { off: [0, 0, 0], scl: [0.35, 0.35, 0.35] }, 1);
        },
      });
      const MX = JX + 2, MZ = JZ + 10;
      for (const x of [MX, MX + 6]) for (const z of [MZ - 1, MZ + 1]) w.box(x, G + 1, z, x, G + 5, z, B.iron);
      w.box(MX, G + 2, MZ - 1, MX + 6, G + 2, MZ - 1, B.ironDk);
      w.box(MX - 1, G + 6, MZ - 2, MX + 7, G + 6, MZ + 2, B.steel);
      w.set(MX + 3, G + 7, MZ + 2, B.glassB); w.set(MX + 4, G + 7, MZ + 2, B.glassB); w.box(MX, G + 7, MZ - 2, MX + 2, G + 7, MZ - 2, B.iron);
      const bottle2 = w.prop({ name: 'teeter', pivot: [MX + 7.5, G + 7, MZ + 0.5] });
      bottle2.box(MX + 6, G + 7, MZ, MX + 7, G + 7, MZ + 1, B.glass); bottle2.box(MX + 6, G + 8, MZ, MX + 7, G + 10, MZ + 1, B.potR); bottle2.set(MX + 6, G + 11, MZ, B.glass); bottle2.set(MX + 6, G + 12, MZ, B.cork);
      acts.push({
        name: '깨진 병', hint: '마버 탁자 끝 병이 비틀비틀하다 바닥에 떨어져 와장창 깨졌다가 다시 붙어요', hit: [MX - 1, G + 1, MZ - 2, MX + 8, G + 12, MZ + 2],
        run: async a => {
          await a.tween('teeter', { rot: [0, 0, -0.4] }, 0.25); await a.tween('teeter', { rot: [0, 0, 0.3] }, 0.25);
          await a.tween('teeter', { off: [3, -6, 0], rot: [0, 0, -1.4] }, 0.45);
          a.burst([MX + 9, G + 2, MZ + 0.5], { n: 50, colors: ['#c8f0e0', '#ff6a8a', '#ffffff', '#a8e0c8'], speed: 14, up: 6, life: 1.2, gravity: 18, spread: 2, flat: true });
          await a.tween('teeter', { scl: [0, 0, 0] }, 0.1);
          await a.wait(0.9);
          a.burst([MX + 7, G + 10, MZ + 0.5], { n: 20, colors: ['#ffd060', '#ffffff'], speed: 4, up: 4, life: 1, gravity: -1, spread: 1.6 });
          await a.respawn('teeter', 0.6);
        },
      });

      // ── 식힘 선반(북쪽 벽): 벽돌 뒷판, 쇠 선반 세 칸, 아래 숯불. 앞줄 병은 아직 뜨겁다 ──
      const KX0 = X0 + 20, KX1 = X0 + 44;
      for (let x = KX0; x <= KX1; x++) for (let y = G + 1; y <= G + 14; y++) for (let z = Z0; z <= Z0 + 3; z++) {
        const post = x === KX0 || x === KX1, shelf = (y - G) % 4 === 0 || y === G + 14;
        w.set(x, y, z, z <= Z0 + 1 ? (z === Z0 ? B.brickDk : (shelf || post ? B.iron : 0)) : (post ? B.iron : shelf ? B.iron : 0));
      }
      for (let x = KX0 + 2; x < KX1 - 1; x += 3) for (const y of [G + 5, G + 9]) { w.set(x, y, Z0 + 2, (x + y) % 3 ? B.glass : B.glassB); w.set(x, y + 1, Z0 + 2, (x + y) % 3 ? B.glass : B.glassB); w.set(x, y + 2, Z0 + 2, B.glass); if (x % 2) { w.set(x + 1, y, Z0 + 3, B.glassB); w.set(x + 1, y + 1, Z0 + 3, B.glass); } }
      for (let x = KX0 + 1; x < KX1; x++) w.set(x, G + 1, Z0 + 1, x % 3 ? B.ember : B.soot);
      w.box(KX0, G + 4, Z0 + 4, KX1, G + 4, Z0 + 5, B.iron); for (const x of [KX0, KX1]) w.box(x, G + 1, Z0 + 4, x, G + 3, Z0 + 5, B.iron);
      const hotRow = w.prop({ name: 'hotrow', pivot: [(KX0 + KX1) / 2 + 0.5, G + 6, Z0 + 5] });
      const coolRow = w.prop({ name: 'coolrow', pivot: [(KX0 + KX1) / 2 + 0.5, G + 6, Z0 + 5], scl0: [1, 0, 1] });
      for (let x = KX0 + 2; x < KX1 - 1; x += 4) for (let dx = 0; dx < 2; dx++) for (const z of [Z0 + 4, Z0 + 5]) {
        hotRow.set(x + dx, G + 5, z, x % 8 ? B.hot : B.hot2); hotRow.set(x + dx, G + 6, z, B.hot); coolRow.set(x + dx, G + 5, z, pots[(x >> 2) % 6]); coolRow.set(x + dx, G + 6, z, pots[(x >> 2) % 6]);
        if (dx === 0 && z === Z0 + 4) { hotRow.set(x, G + 7, z, B.hot2); coolRow.set(x, G + 7, z, B.glass); coolRow.set(x, G + 8, z, B.cork); }
      }
      lights.push({ name: 'anneal', p: [(KX0 + KX1) / 2 + 0.5, G + 6, Z0 + 3], c: '#ffa040', i: 1, d: 24, flicker: 0.15, srcR: 10 });
      acts.push({
        name: '병 식히기', hint: '식힘 선반의 빨갛게 달아오른 병들이 김을 내뿜으며 식어 맑은 색 병이 돼요', hit: [KX0, G + 1, Z0, KX1, G + 14, Z0 + 6],
        run: async a => {
          a.flash('anneal', 2.5, 3);
          await a.move('hotrow', [0, 2, 3.2], 0.6);
          for (let q = 0; q < 5; q++) { a.burst([KX0 + 5 + q * 5, G + 10, Z0 + 6], { n: 14, colors: ['#ffffff', '#e0e8f0'], speed: 2.4, up: 6, life: 1.6, gravity: -1.6, spread: 1.2 }); await a.wait(0.25); }
          await a.tween('hotrow', { scl: [1, 0, 1] }, 0.6); await a.tween('coolrow', { scl: [1, 1, 1] }, 0.6);
          await a.wait(1.4);
          await a.tween('coolrow', { scl: [1, 0, 1] }, 0.4); await a.tween('hotrow', { off: [0, 0, 0], scl: [1, 1, 1] }, 0.5);
        },
      });

      // ── 색유리 막대 돌림 걸이(북동쪽) ──
      const RX = X1 - 10, RZ = Z0 + 12;
      w.box(RX - 2, G + 1, RZ - 2, RX + 2, G + 1, RZ + 2, B.iron); w.box(RX - 1, G + 2, RZ - 1, RX + 1, G + 2, RZ + 1, B.ironDk); w.box(RX, G + 3, RZ, RX, G + 4, RZ, B.iron);
      const rods = w.prop({ name: 'rods', pivot: [RX + 0.5, G + 8, RZ + 0.5], axis: 'y', speed: 0.15 });
      rods.box(RX, G + 5, RZ, RX, G + 15, RZ, B.iron); rods.set(RX, G + 16, RZ, B.knob);
      for (const y of [G + 6, G + 14]) for (let q = 0; q < 6; q++) { const t = q / 6 * Math.PI * 2; for (let r = 1; r <= 3; r++) rods.set(Math.round(RX + Math.cos(t) * r), y, Math.round(RZ + Math.sin(t) * r), B.ironDk); }
      for (let q = 0; q < 6; q++) { const t = q / 6 * Math.PI * 2, x = Math.round(RX + Math.cos(t) * 4), z = Math.round(RZ + Math.sin(t) * 4); rods.box(x, G + 5, z, x, G + 13, z, pots[q]); rods.set(x, G + 14, z, B.iron); }
      lights.push({ name: 'rods', p: [RX + 0.5, G + 10, RZ + 0.5], c: '#d0a0ff', i: 0.8, d: 20, flicker: 0.05 });
      acts.push({
        name: '색유리 고르기', hint: '돌림 걸이가 빙글빙글 돌다가 멈추고 고른 색유리 막대가 반짝 떠올라요', hit: [RX - 5, G + 1, RZ - 5, RX + 5, G + 16, RZ + 5],
        run: async a => {
          a.flash('rods', 3, 3.5); a.spin('rods', 9, 2.5);
          await a.wait(2.5);
          await a.move('rods', [0, 4, 0], 0.5);
          a.burst([RX + 0.5, G + 20, RZ + 0.5], { n: 30, colors: ['#8aff5a', '#d07aff', '#ff6a8a', '#6ac8ff', '#ffe060'], speed: 8, up: 4, life: 1.3, gravity: 2, spread: 2 });
          await a.wait(0.6); await a.move('rods', [0, 0, 0], 0.6);
        },
      });

      // ── 담금질 물통(작업대 남쪽): 쇠테 두른 나무 통, 물, 집게 ──
      const QX = JX - 8, QZ = Z1 - 4;
      for (let y = G + 1; y <= G + 4; y++) w.ring(QX, QZ, y, 2, 3.4, y === G + 2 || y === G + 4 ? B.iron : B.log);
      w.cyl(QX, QZ, G + 1, G + 3, 2, B.water);
      w.box(QX - 3, G + 5, QZ - 3, QX + 3, G + 5, QZ - 3, B.iron);
      const tongs = w.prop({ name: 'tongs', pivot: [QX + 0.5, G + 12, QZ + 0.5] });
      tongs.box(QX, G + 8, QZ, QX, G + 16, QZ, B.iron); tongs.set(QX, G + 7, QZ, B.hot); tongs.set(QX + 1, G + 8, QZ, B.iron); tongs.set(QX - 1, G + 8, QZ, B.iron);
      for (const s of [-1, 1]) tongs.line(QX, G + 14, QZ, QX + s * 2, G + 17, QZ, B.ironDk);
      acts.push({
        name: '담금질', hint: '집게에 물린 달군 유리를 물통에 담그면 치익 소리와 함께 김이 피어올라요', hit: [QX - 3, G + 1, QZ - 3, QX + 3, G + 17, QZ + 3],
        run: async a => {
          await a.move('tongs', [0, -4.4, 0], 0.5);
          for (let q = 0; q < 6; q++) { a.burst([QX + 0.5, G + 6, QZ + 0.5], { n: 18, colors: ['#ffffff', '#e0e8f0', '#c8d8e8'], speed: 2.8, up: 8, life: 1.8, gravity: -2, spread: 1.6 }); await a.wait(0.25); }
          await a.move('tongs', [0, 0, 0], 0.6);
        },
      });

      // ── 완성품 진열대(남동쪽, 계단식 세 단) ──
      const SX0 = X1 - 18, SZ = Z1 - 1;
      for (let x = SX0; x <= X1 - 1; x++) {
        w.box(x, G + 1, SZ - 5, x, G + 2, SZ, (x - SX0) % 6 === 0 ? B.desk : B.plank); w.box(x, G + 3, SZ - 3, x, G + 4, SZ, (x - SX0) % 6 === 0 ? B.desk : B.plank); w.box(x, G + 5, SZ - 1, x, G + 6, SZ, B.plank);
        if ((x - SX0) % 2 === 0) { bottle(x, G + 3, SZ - 5, pots[(x >> 1) % 6], x % 4 === 0); bottle(x, G + 5, SZ - 3, x % 4 ? B.glass : pots[(x + 2) % 6], true); bottle(x, G + 7, SZ - 1, x % 3 ? pots[(x + 4) % 6] : B.glassB, x % 4 === 2); }
      }
      lights.push({ name: 'shelf', p: [SX0 + 9, G + 8, SZ - 2], c: '#a0ffb0', i: 0.7, d: 20, flicker: 0.05 });
      // 모래 자루·깨진 유리 상자·장작 더미·대롱 걸이·등
      sandBag(X0 + 1, G + 1, Z1 - 3); sandBag(X0 + 4, G + 1, Z1 - 3); sandBag(X0 + 2, G + 4, Z1 - 3); sandBag(X0 + 1, G + 1, Z1 - 7);
      crate(X0 + 10, G + 1, Z1 - 4, 4); w.box(X0 + 11, G + 5, Z1 - 3, X0 + 12, G + 5, Z1 - 2, B.cullet); w.set(X0 + 12, G + 6, Z1 - 3, B.cullet);
      for (let r = 0; r < 3; r++) for (let q = 0; q < 3 - r; q++) {   // 장작: 나이테 보이는 통나무
        const cz = Z0 + 3 + q * 3 + r * 1.5, cy = G + 2 + r * 3;
        for (let x = X0; x <= X0 + 6; x++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
          const end = x === X0 + 6; if (Math.abs(dy) + Math.abs(dz) > 1 && end) continue;
          w.set(x, cy + dy, Math.round(cz) + dz, end ? (dy === 0 && dz === 0 ? B.log : B.logEnd) : B.bark);
        }
      }
      w.box(X1, G + 1, Z0 + 2, X1, G + 2, Z0 + 14, B.plank); w.box(X1, G + 9, Z0 + 2, X1, G + 9, Z0 + 14, B.plank);   // 대롱 걸이(동쪽 벽)
      for (const z of [Z0 + 4, Z0 + 8, Z0 + 12]) { w.box(X1 - 1, G + 3, z, X1 - 1, G + 12, z, B.iron); w.set(X1 - 1, G + 13, z, B.copper); w.set(X1, G + 10, z, B.ironDk); }
      w.box(X0 + 16, G + 1, Z1 - 1, X0 + 17, G + 3, Z1, B.desk); w.box(X0 + 16, G + 4, Z1 - 1, X0 + 16, G + 5, Z1 - 1, B.lamp); w.set(X0 + 16, G + 6, Z1 - 1, B.iron);
      // 가운데 틀 작업대(나무 틀·집게·식은 병)와 걸상, 물약병 상자
      const TX = X0 + 28, TZ = Z0 + 18;
      for (const [x, z] of [[TX, TZ], [TX + 8, TZ], [TX, TZ + 3], [TX + 8, TZ + 3]]) w.box(x, G + 1, z, x, G + 3, z, B.desk);
      w.box(TX, G + 4, TZ, TX + 8, G + 4, TZ + 3, B.plank);
      w.box(TX + 1, G + 5, TZ, TX + 2, G + 6, TZ + 1, B.log); bottle(TX + 4, G + 5, TZ + 2, B.glassB); bottle(TX + 6, G + 5, TZ + 1, B.potG, true); w.box(TX + 6, G + 5, TZ + 3, TX + 8, G + 5, TZ + 3, B.iron); bottle(TX + 8, G + 5, TZ + 1, B.glass);
      for (const x of [TX + 2, TX + 6]) { w.box(x, G + 1, TZ + 6, x + 1, G + 2, TZ + 7, B.log); w.box(x, G + 3, TZ + 6, x + 1, G + 3, TZ + 7, B.logEnd); }
      for (const [x, z] of [[X0 + 40, Z1 - 3], [X0 + 44, Z1 - 3], [X0 + 40, Z1 - 7]]) { crate(x, G + 1, z, 4); bottle(x + 1, G + 5, z + 1, pots[(x + z) % 6], true); bottle(x + 2, G + 5, z + 2, pots[(x + z + 2) % 6]); }

      landmarks.push({ name: '녹임 가마', note: '불구멍에서 주황빛이 쏟아진다', p: [FX + 0.5, G + 40, CZ + 0.5] });
      landmarks.push({ name: '식힘 선반', note: '갓 분 병이 식어 간다', p: [(KX0 + KX1) / 2 + 0.5, G + 24, Z0 + 3] });
      return { lights, landmarks, acts };
    },
  });
})();
