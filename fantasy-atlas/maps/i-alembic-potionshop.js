// 물약 상점(하위 지도) — 연금술 거리 골목 동쪽 4층 물약 상점 안. 서쪽 정문으로 들어서면 빛나는 병 진열장과 계산대(종),
// 계산대 뒤 조제실(가마솥 화덕·벽돌 연기 갓·증류기·약재 서랍장), 남동쪽 2층 재료 창고(나무 계단·도르래·약초 다발·상자·술통).
// 남·동쪽(기본 시점 쪽) 벽은 잘라 낮췄다. 좌표: +x 동쪽, +z 남쪽. 정문은 서쪽 (연금술 거리의 하위 지도). 2배 해상도(1칸 ≈ 25cm), playerScale 2.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 112, D = 112, Hh = 96, G = 20;
  const X0 = 32, X1 = 79, Z0 = 32, Z1 = 79, DZ = 54;                   // 벽 안쪽 경계, 정문 가운데 z(서쪽 벽)
  const LH = G + 14;                                                      // 2층 창고 마루 높이
  const HT = G + 28;
  MAPS.push({
    id: 'alembic-potionshop', cat: 'magic', sub: true, parent: 'alembic', name: '물약 상점', en: 'Alembic Row · Potion Shop', color: '#8ad05a', seed: 3131, base: G, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '연금술 거리 골목 동쪽, 창가에 빛나는 병이 줄지어 선 4층 물약 상점의 1층. 서쪽 정문 안쪽 벽장마다 일곱 색 물약이 빛나고, 계산대 너머 조제실에서는 화덕 위 가마솥이 끓는다. 벽 가득한 약재 서랍장 옆 나무 계단을 오르면 약초 다발이 매달린 2층 재료 창고다.',
    info: { title: '장소 정보', en: 'POTION SHOP', rows: [['매장', '빛나는 병 진열장 · 계산대'], ['조제실', '가마솥 화덕 · 증류기 · 약재 서랍'], ['2층', '재료 창고 · 도르래'], ['주의', '초록 병은 맛보기 금지']] },
    sky: ['#1e3020', '#0a100a', '#6aff9a'], stars: true,
    hemi: ['#e0ffd8', '#2a2a1c', 0.66], sun: ['#f0ffe0', 0.46, [0.45, 1, 0.5]],
    day: { sky: ['#e0f0d0', '#8ab890', '#f8ffe0'], stars: false, hemi: ['#ffffff', '#4a4a38', 0.62], sun: ['#fff8e0', 0.72, [0.45, 1, 0.5]] },
    fog: { start: 0.94, floor: G - 16, depth: 12 },
    camY: -2, zoom: 2.4,
    spawn: [X0 + 4, G + 1, DZ],
    particles: [
      { n: 70, colors: ['#e0ffb0', '#fff6d8'], mode: 'drift', speed: 0.2, area: [56, 56, 22], y0: G + 4, y1: G + 24, glow: true },
      { n: 30, colors: ['#9aff6a', '#c8ffa0', '#d890ff'], mode: 'rise', speed: 0.8, area: [69, 42, 2.4], y0: G + 8, y1: G + 28, glow: true },
    ],
    blocks: {
      cob: { c: '#4a4a40', top: '#5a5a50', v: 0.12, pat: 'stone' }, rock: { c: '#3a3a36', v: 0.06, pat: 'stone' },
      cobble: { c: '#4e4e46', top: '#5e5e54', v: 0.06 }, cobble2: { c: '#46463e', top: '#54544a', v: 0.06 }, cobbleJ: { c: '#2e2e2a', top: '#363630', v: 0.04 },
      st1: { c: '#6a6a62', v: 0.05 }, st2: { c: '#5c5c56', v: 0.05 }, st3: { c: '#74726a', v: 0.05 }, mortar: { c: '#48463e', v: 0.04 }, sill: { c: '#7a786e', v: 0.04 },
      tileG: { c: '#2a4a3a', top: '#3a6a4a', v: 0.03 }, tileW: { c: '#b8b090', top: '#d8d0b0', v: 0.03 }, grout: { c: '#2a2a24', top: '#3a3a30', v: 0.02 }, board: { c: '#5a3e28', top: '#7a5434', v: 0.05, pat: 'plank' },
      wallT: { c: '#4a8a8a', v: 0.04 }, wallC: { c: '#c8c0a8', v: 0.04 }, frame: { c: '#3a2a1a', v: 0.05 }, frameDk: { c: '#2a1e12', v: 0.04 }, door: { c: '#2a1a10', v: 0.03, pat: 'plank' }, doorDk: { c: '#1e120a', v: 0.03 },
      iron: { c: '#3a3a40', v: 0.04 }, ironDk: { c: '#26262c', v: 0.03 }, mullion: { c: '#2a2a26', v: 0.02 },
      plank: { c: '#6a4a30', v: 0.06, pat: 'plank' }, desk: { c: '#4a3020', v: 0.04 }, deskTop: { c: '#3a2416', top: '#5a3a24', v: 0.03 }, drawer: { c: '#7a5434', v: 0.05 }, knob: { c: '#e0c060', v: 0.05 },
      copper: { c: '#c07a3a', v: 0.08 }, copperDk: { c: '#8a5228', v: 0.06 }, patina: { c: '#4a9a7a', v: 0.08 }, brick: { c: '#8a4a3a', v: 0.06, pat: 'brick' }, brick2: { c: '#74402f', v: 0.05, pat: 'brick' }, soot: { c: '#2a2220', v: 0.04 },
      glass: { c: '#a8e0c8', v: 0.03 }, cork: { c: '#8a5a3a', v: 0.04 }, crate: { c: '#7a5a3a', v: 0.06, pat: 'plank' }, crateEdge: { c: '#523a24', v: 0.04 }, sack: { c: '#b8a070', v: 0.08 }, sack2: { c: '#a89060', v: 0.06 },
      herb: { c: '#6aa040', v: 0.1 }, herbD: { c: '#8a8a3a', v: 0.1 }, rope: { c: '#a08060', v: 0.05 },
      cask: { c: '#6a4a2a', v: 0.05 }, cask2: { c: '#5a3e22', v: 0.05 }, caskTop: { c: '#4a3420', v: 0.04 },
      rug: { c: '#6a3a7a', v: 0.04 }, rug2: { c: '#5e3470', v: 0.04 }, rugE: { c: '#c8a040', v: 0.04 }, parch: { c: '#ece0bc', v: 0.04 }, ink: { c: '#1a1a2a', v: 0.02 }, book: { c: '#3a4a8a', v: 0.03 }, book2: { c: '#7a2a3a', v: 0.03 },
      potG: { c: '#8aff5a', glow: true }, potP: { c: '#d07aff', glow: true }, potR: { c: '#ff6a8a', glow: true }, potB: { c: '#6ac8ff', glow: true }, potY: { c: '#ffe060', glow: true }, potO: { c: '#ffa040', glow: true },
      fire: { c: '#ff9a3a', glow: true }, ember: { c: '#ffd060', glow: true }, brew: { c: '#9aff6a', glow: true }, lamp: { c: '#b8ff9a', glow: true }, candle: { c: '#fff0c0', glow: true }, wax: { c: '#f0e8d0', v: 0.02 },
      winG: { c: '#c8ff8a', night: true, day: '#7a9a80' }, bell: { c: '#e0c060', v: 0.05 },
    },
    build(w) {
      const B = w.id;
      w.hm = new Int16Array(W * D).fill(G);
      const lights = [], acts = [], landmarks = [];
      const pots = [B.potG, B.potP, B.potR, B.potB, B.potY, B.potO];
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
      const sack = (x, y, z) => {
        for (let dz = 0; dz < 3; dz++) for (let dx = 0; dx < 3; dx++) {
          const corner = dx !== 1 && dz !== 1;
          if (!corner) w.set(x + dx, y, z + dz, B.sack);
          w.set(x + dx, y + 1, z + dz, (dx + dz) % 2 ? B.sack : B.sack2);
          if (!corner) w.set(x + dx, y + 2, z + dz, B.sack);
        }
        w.set(x + 1, y + 3, z + 1, B.rope); w.set(x + 1, y + 4, z + 1, B.sack2);
      };
      const barrel = (x, y, z, ht) => {
        for (let r = 0; r < ht; r++) {
          const rr = r >= 2 && r <= ht - 3 ? 2.6 : 2.2;
          for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) {
            const d2 = dx * dx + dz * dz; if (d2 > rr * rr) continue;
            const outer = d2 > (rr - 1) * (rr - 1);
            w.set(x + dx, y + r, z + dz, r === ht - 1 ? (outer ? B.cask : B.caskTop) : (r === 1 || r === ht - 2) && outer ? B.iron : ((Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 5)) & 1) ? B.cask : B.cask2));
          }
        }
      };
      const candleAt = (x, y, z) => { w.set(x, y, z, B.knob); w.set(x, y + 1, z, B.wax); w.set(x, y + 2, z, B.candle); };

      // ── 바깥 골목 돌길 · 가게 바닥(초록·상아 타일, 줄눈) ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        for (let y = G - 8; y < G; y++) w.set(x, y, z, B.rock);
        let b;
        if (inside(x, z)) b = ((x - X0) % 4 === 3 || (z - Z0) % 4 === 3) ? B.grout : ((((x - X0) >> 2) + ((z - Z0) >> 2)) & 1 ? B.tileW : B.tileG);
        else if (x < X0 - 4 && Math.abs(z - DZ) <= 4) b = (z === DZ - 4 || z === DZ + 4) ? B.sill : B.st3;
        else { const row = Math.floor(z / 3), off = (row & 1) * 2; b = (z % 3 === 2 || (x + off) % 4 === 3) ? B.cobbleJ : (hash3((x + off) >> 2, row, 3) > 0.5 ? B.cobble : B.cobble2); }
        w.set(x, G, z, b);
      }
      // ── 벽: 반목조(청록 회벽 + 검은 기둥·보), 두께 4. 북·서는 2층 높이, 남·동은 낮게. 아랫단은 낱돌 ──
      for (let z = Z0 - 4; z <= Z1 + 4; z++) for (let x = X0 - 4; x <= X1 + 4; x++) {
        if (inside(x, z)) continue;
        const back = (x < X0 || z < Z0) && x <= X1 && z <= Z1;
        const top = back ? HT : G + 6;
        const u = x < X0 ? z : x, inner = x === X0 - 1 || z === Z0 - 1 || x === X1 + 1 || z === Z1 + 1;
        for (let y = G + 1; y <= top; y++) {
          let b;
          if (y <= G + 3) b = stone(u, y, x < X0 ? 4 : 3);
          else if (!inner) b = y > LH ? B.wallC : B.wallT;
          else {
            const post = ((u % 8) + 8) % 8 < 2 || (x < X0 && z < Z0), beam = y === G + 4 || y === LH || y === LH + 1 || y >= top - 1;
            b = post || beam ? B.frame : (y > LH ? B.wallC : B.wallT);
          }
          w.set(x, y, z, b);
        }
        if (!back) w.set(x, G + 7, z, (x + z) % 2 ? B.frameDk : B.frame);
      }
      // 가새(북쪽 벽 안쪽 2층)
      for (let u = X0 + 2; u + 8 <= X1; u += 16) for (let q = 0; q <= 7; q++) w.set(u + 1 + q, LH + 2 + Math.round(q * 10 / 7), Z0 - 1, B.frame);
      // 창(북쪽 1·2층, 서쪽 2층): 납유리, 창살, 창턱·창틀
      const winN = (x0, y0, ht) => {
        for (let r = 0; r < ht; r++) for (let c = 0; c < 4; c++) for (let z = Z0 - 4; z <= Z0 - 1; z++) w.set(x0 + c, y0 + r, z, z === Z0 - 2 ? ((c === 1 || r === (ht >> 1)) ? B.mullion : B.winG) : 0);
        for (let c = -1; c <= 4; c++) { w.set(x0 + c, y0 - 1, Z0 - 1, B.sill); w.set(x0 + c, y0 - 1, Z0, B.sill); w.set(x0 + c, y0 + ht, Z0 - 1, B.frame); }
        for (let r = 0; r < ht; r++) { w.set(x0 - 1, y0 + r, Z0 - 1, B.frame); w.set(x0 + 4, y0 + r, Z0 - 1, B.frame); }
      };
      const winW = (z0, y0, ht) => {
        for (let r = 0; r < ht; r++) for (let c = 0; c < 4; c++) for (let x = X0 - 4; x <= X0 - 1; x++) w.set(x, y0 + r, z0 + c, x === X0 - 2 ? ((c === 1 || r === (ht >> 1)) ? B.mullion : B.winG) : 0);
        for (let c = -1; c <= 4; c++) { w.set(X0 - 1, y0 - 1, z0 + c, B.sill); w.set(X0, y0 - 1, z0 + c, B.sill); w.set(X0 - 1, y0 + ht, z0 + c, B.frame); }
        for (let r = 0; r < ht; r++) { w.set(X0 - 1, y0 + r, z0 - 1, B.frame); w.set(X0 - 1, y0 + r, z0 + 4, B.frame); }
      };
      for (const x of [X0 + 30, X0 + 42]) winN(x, G + 6, 5);
      for (const x of [X0 + 4, X0 + 20, X0 + 36]) winN(x, LH + 4, 6);
      for (const z of [Z0 + 6, Z1 - 10]) winW(z, LH + 4, 6);

      // ── 정문(서쪽): 문틀·상인방, 판자 문짝(테두리 살, 놋 손잡이), 문 위 병 간판, 문 앞 깔개 ──
      w.box(X0 - 4, G + 1, DZ - 2, X0 - 1, G + 9, DZ + 2, 0);
      for (let y = G + 1; y <= G + 9; y++) for (let z = DZ - 2; z <= DZ + 2; z++) {
        const stile = z === DZ - 2 || z === DZ + 2 || y === G + 1 || y === G + 5 || y === G + 9;
        w.set(X0 - 4, y, z, stile ? B.doorDk : B.door);
      }
      w.set(X0 - 3, G + 5, DZ + 1, B.knob);
      for (const z of [DZ - 3, DZ + 3]) w.box(X0 - 4, G + 1, z, X0 - 1, G + 10, z, B.frameDk);
      w.box(X0 - 4, G + 10, DZ - 3, X0 - 1, G + 10, DZ + 3, B.frameDk); w.box(X0 - 1, G + 11, DZ - 4, X0, G + 11, DZ + 4, B.sill);
      w.box(X0, G + 12, DZ, X0, G + 14, DZ + 1, B.potG); w.box(X0, G + 15, DZ, X0, G + 15, DZ + 1, B.glass); w.box(X0, G + 16, DZ, X0, G + 16, DZ + 1, B.cork);
      for (let z = DZ - 4; z <= DZ + 4; z++) for (let x = X0; x <= X0 + 7; x++) w.set(x, G, z, x === X0 + 7 || Math.abs(z - DZ) === 4 ? B.rugE : ((x + z) & 1 ? B.rug : B.rug2));
      acts.push(OR.goAct({ at: [X0, G + 1, DZ], h: 8, name: '밖으로 나가기', goto: 'alembic', hint: '서쪽 문을 열고 병 등불이 걸린 연금술 거리 골목으로 나가요', hit: [X0, G + 1, DZ - 2, X0 + 2, G + 9, DZ + 2] }));

      // ── 빛나는 병 진열장(북쪽 벽, 매장 쪽): 선반 다섯 단, 옆판, 갓 ──
      for (let x = X0; x <= X0 + 24; x++) for (let y = G + 1; y <= G + 14; y++) for (const z of [Z0, Z0 + 1]) {
        const side = x === X0 || x === X0 + 24, shelf = (y - G) % 3 === 1;
        let b = side || shelf ? B.plank : (z === Z0 ? B.desk : 0);
        if (!side && !shelf && z === Z0 + 1 && hash3(x, y, 1) > 0.3) b = (y - G) % 3 === 2 ? pots[(x * 3 + y) % 6] : ((x & 1) ? B.glass : B.cork);
        w.set(x, y, z, b);
      }
      w.box(X0, G + 15, Z0, X0 + 24, G + 15, Z0 + 2, B.frame);
      w.box(X0 + 2, G + 5, Z0 + 2, X0 + 22, G + 5, Z0 + 2, B.plank);
      const shelf = w.prop({ name: 'shelfpots', pivot: [X0 + 13, G + 8, Z0 + 3] });
      for (let x = X0 + 4; x <= X0 + 20; x += 4) { shelf.set(x, G + 6, Z0 + 2, pots[x % 6]); shelf.set(x, G + 7, Z0 + 2, pots[x % 6]); shelf.set(x, G + 8, Z0 + 2, B.glass); shelf.set(x, G + 9, Z0 + 2, B.cork); }
      lights.push({ name: 'shelf', p: [X0 + 13, G + 8, Z0 + 3], c: '#c8a0ff', i: 1, d: 24, flicker: 0.1 });
      acts.push({
        name: '병 흔들기', hint: '진열장의 병들이 저절로 튀어나와 달그락 흔들리며 색색 거품을 뿜어요', hit: [X0 + 2, G + 1, Z0, X0 + 22, G + 12, Z0 + 4],
        run: async a => {
          a.flash('shelf', 3, 3);
          await a.move('shelfpots', [0, 2, 4], 0.4);
          for (let q = 0; q < 4; q++) { await a.move('shelfpots', [q % 2 ? 0.8 : -0.8, 2.8, 4], 0.18); a.burst([X0 + 5 + q * 4, G + 12, Z0 + 7], { n: 14, colors: ['#8aff5a', '#d07aff', '#ff6a8a', '#6ac8ff'], speed: 4, up: 6, life: 1.2, gravity: -0.8, spread: 1.2 }); }
          await a.move('shelfpots', [0, 0, 0], 0.6);
        },
      });
      // 서쪽 벽 진열 선반(문 양옆)과 가운데 진열 탁자(병 피라미드)
      for (const [z0, z1] of [[Z0 + 4, DZ - 8], [DZ + 8, Z1 - 2]]) for (let z = z0; z <= z1; z++) for (let y = G + 1; y <= G + 11; y++) for (const x of [X0, X0 + 1]) {
        const side = z === z0 || z === z1, sh = (y - G) % 3 === 1;
        let b = side || sh ? B.plank : (x === X0 ? B.desk : 0);
        if (!side && !sh && x === X0 + 1 && hash3(z, y, 3) > 0.35) b = (y - G) % 3 === 2 ? pots[(z + y) % 6] : B.glass;
        w.set(x, y, z, b);
      }
      { const tx0 = X0 + 10, tx1 = X0 + 17, tz0 = Z1 - 14, tz1 = Z1 - 10;
        for (const [x, z] of [[tx0, tz0], [tx1, tz0], [tx0, tz1], [tx1, tz1]]) w.box(x, G + 1, z, x, G + 3, z, B.desk);
        w.box(tx0, G + 4, tz0, tx1, G + 4, tz1, B.deskTop);
        for (let x = tx0 + 1; x <= tx1 - 1; x += 2) for (let z = tz0; z <= tz1; z += 2) bottle(x, G + 5, z, pots[(x + z) % 6]);
        for (const [x, z] of [[tx0 + 2, tz0 + 1], [tx1 - 2, tz0 + 1], [tx0 + 2, tz1 - 1], [tx1 - 2, tz1 - 1]]) w.box(x, G + 5, z, x, G + 7, z, B.desk);
        w.box(tx0 + 2, G + 8, tz0 + 1, tx1 - 2, G + 8, tz1 - 1, B.plank);
        for (let x = tx0 + 3; x <= tx1 - 3; x += 1) bottle(x, G + 9, tz0 + 2, pots[(x + 3) % 6], x === tx0 + 3); }

      // ── 계산대(매장과 조제실 사이, ㄴ자): 판 무늬 앞판, 진한 상판, 촛대·두루마리·잉크·책, 종 ──
      const CX0 = X0 + 18, CZ1 = Z0 + 18;
      for (let z = Z0 + 6; z <= CZ1 + 1; z++) for (let y = G + 1; y <= G + 5; y++) for (const x of [CX0, CX0 + 1]) w.set(x, y, z, x === CX0 && (z % 4 === 0 || y === G + 1 || y === G + 5) ? B.frame : B.desk);
      for (let x = CX0; x <= CX0 + 9; x++) for (let y = G + 1; y <= G + 5; y++) for (const z of [CZ1, CZ1 + 1]) w.set(x, y, z, z === CZ1 + 1 && (x % 4 === 0 || y === G + 1 || y === G + 5) ? B.frame : B.desk);
      w.box(CX0 - 1, G + 6, Z0 + 6, CX0 + 1, G + 6, CZ1 + 2, B.deskTop); w.box(CX0, G + 6, CZ1, CX0 + 10, G + 6, CZ1 + 2, B.deskTop);
      candleAt(CX0, G + 7, Z0 + 8);
      w.box(CX0 - 1, G + 7, Z0 + 14, CX0, G + 7, Z0 + 15, B.parch); w.set(CX0 - 1, G + 7, Z0 + 16, B.ink); w.box(CX0, G + 7, Z0 + 17, CX0, G + 8, Z0 + 17, B.book); w.set(CX0 + 1, G + 7, Z0 + 17, B.book2);
      w.box(CX0, G + 7, CZ1, CX0 + 1, G + 7, CZ1 + 1, B.copper); bottle(CX0 + 7, G + 7, CZ1 + 1, B.glass); bottle(CX0 + 9, G + 7, CZ1, B.potO, true);
      const bell = w.prop({ name: 'cbell', pivot: [CX0 + 4, G + 7, CZ1 + 2] });
      bell.box(CX0 + 3, G + 7, CZ1 + 1, CX0 + 4, G + 8, CZ1 + 2, B.bell); bell.set(CX0 + 3, G + 9, CZ1 + 1, B.knob); bell.set(CX0 + 4, G + 9, CZ1 + 2, B.knob);
      lights.push({ name: 'counter', p: [CX0 + 0.5, G + 9, Z0 + 8.5], c: '#ffe0a0', i: 0.8, d: 18, flicker: 0.2 });
      acts.push({
        name: '계산대 종', hint: '계산대의 작은 종이 딸랑 울리면 안쪽 조제실까지 소리 고리가 퍼져요', hit: [CX0 + 1, G + 6, CZ1, CX0 + 7, G + 10, CZ1 + 4],
        run: async a => {
          a.flash('counter', 3, 2.2); a.spin('cbell', 7, 2.2);
          await a.move('cbell', [0, 4, 0], 0.3);
          for (let q = 0; q < 4; q++) { a.burst([CX0 + 4, G + 12, CZ1 + 2], { n: 18, colors: ['#ffffff', '#ffe0a0'], speed: 10, up: 0, life: 1, gravity: 0, spread: 0.8, flat: true }); await a.wait(0.35); }
          await a.move('cbell', [0, 0, 0], 0.3);
        },
      });
      // 맛보기 병(계산대 위)
      const smp = w.prop({ name: 'sample', pivot: [CX0 - 0.5, G + 9, Z0 + 12], axis: 'y' });
      smp.box(CX0 - 1, G + 7, Z0 + 11, CX0 - 1, G + 8, Z0 + 11, B.potP); smp.set(CX0 - 1, G + 9, Z0 + 11, B.glass); smp.set(CX0 - 1, G + 10, Z0 + 11, B.cork);
      smp.set(CX0 - 1, G + 7, Z0 + 12, B.potR); smp.set(CX0 - 1, G + 8, Z0 + 12, B.glass); smp.set(CX0 - 1, G + 9, Z0 + 12, B.cork);
      smp.set(CX0 - 1, G + 7, Z0 + 10, B.glass); smp.set(CX0 - 1, G + 8, Z0 + 10, B.glass);
      acts.push({
        name: '물약 맛보기', hint: '계산대의 맛보기 병이 떠올라 빙글 돌며 보랏빛 거품과 반짝이를 뿜어요', hit: [CX0 - 4, G + 6, Z0 + 9, CX0, G + 12, Z0 + 14],
        run: async a => {
          a.spin('sample', 6, 3);
          await a.move('sample', [-2, 6, 0], 0.8);
          for (let q = 0; q < 6; q++) { a.burst([CX0 - 1.5, G + 16, Z0 + 12], { n: 16, colors: ['#d07aff', '#ff6a8a', '#ffffff'], speed: 5, up: 6, life: 1.3, gravity: -1, spread: 1.2 }); await a.wait(0.3); }
          a.glow(1.4, 1.2);
          await a.move('sample', [0, 0, 0], 0.8);
        },
      });

      // ── 조제실(계산대 뒤 북동쪽): 벽돌 화덕과 연기 갓, 쇠 가마솥, 구리 증류기, 약재 서랍장 ──
      const KX = X1 - 11, KZ = Z0 + 10;
      w.box(KX - 4, G + 1, KZ - 4, KX + 5, G + 2, KZ + 5, B.brick); w.box(KX - 4, G + 3, KZ - 4, KX + 5, G + 3, KZ + 5, B.sill);
      w.box(KX - 2, G + 1, KZ + 5, KX + 3, G + 2, KZ + 5, B.soot); w.box(KX - 1, G + 1, KZ + 5, KX + 2, G + 1, KZ + 5, B.fire); w.set(KX, G + 2, KZ + 5, B.ember); w.set(KX + 1, G + 2, KZ + 5, B.fire);
      for (let y = G + 4; y <= G + 8; y++) w.ring(KX, KZ, y, y === G + 4 ? -1 : 2.6, 4.2 - (y === G + 4 ? 1 : 0), B.iron);
      w.ring(KX, KZ, G + 9, 3, 4.8, B.copperDk);
      for (const [dx, dz] of [[-3, -3], [4, -3], [-3, 4], [4, 4]]) w.set(KX + dx, G + 4, KZ + dz, B.ironDk);
      const brew = w.prop({ name: 'brew', pivot: [KX + 0.5, G + 7, KZ + 0.5] });
      for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) if (dx * dx + dz * dz <= 5.5) brew.set(KX + dx, G + 7, KZ + dz, B.brew);
      brew.set(KX, G + 8, KZ, B.potG); brew.set(KX - 1, G + 8, KZ + 1, B.potY); brew.set(KX + 1, G + 8, KZ - 1, B.potP); brew.set(KX + 1, G + 9, KZ + 1, B.potG);
      // 연기 갓: 북쪽 벽에 붙은 벽돌 갓과 굴뚝
      for (let y = G + 14; y <= HT; y++) { const e = y < G + 18 ? G + 18 - y : 0; for (let x = KX - 2 - e; x <= KX + 3 + e; x++) for (let z = Z0; z <= Z0 + 3 + e; z++) w.set(x, y, z, (y === G + 14) ? B.sill : (hash3(x, y, z) > 0.8 ? B.brick2 : B.brick)); }
      // 증류관(화덕 옆 구리 관)
      w.box(KX + 6, G + 1, KZ - 4, KX + 7, G + 18, KZ - 3, B.copperDk); w.box(KX - 2, G + 18, KZ - 4, KX + 7, G + 19, KZ - 3, B.copperDk);
      for (const y of [G + 6, G + 12]) w.box(KX + 6, y, KZ - 4, KX + 7, y, KZ - 3, B.patina);
      w.box(KX, G + 18, KZ - 4, KX + 1, G + 19, KZ - 3, B.patina);
      lights.push({ name: 'cauldron', p: [KX + 0.5, G + 8, KZ + 0.5], c: '#9aff6a', i: 1.3, d: 28, flicker: 0.3 });
      acts.push({
        name: '조제 연기', hint: '화덕 위 가마솥이 부글부글 끓어오르며 초록·보라 연기를 뿜어요', hit: [KX - 4, G + 1, KZ - 4, KX + 5, G + 10, KZ + 5],
        run: async a => {
          a.flash('cauldron', 4, 4.5);
          for (let q = 0; q < 6; q++) {
            await a.move('brew', [0, 6.4, 0], 0.3);
            a.burst([KX + 0.5, G + 12, KZ + 0.5], { n: 20, colors: q % 2 ? ['#d890ff', '#f0c8ff'] : ['#9aff6a', '#c8ffa0'], speed: 3, up: 8, life: 1.8, gravity: -1.6, spread: 2 });
            await a.move('brew', [0, 2.4, 0], 0.3);
          }
          await a.move('brew', [0, 0, 0], 0.4);
        },
      });
      // 증류기(조제대 위 플라스크와 관)
      const SX = X0 + 26;
      for (const x of [SX, SX + 8]) for (const z of [Z0 + 2, Z0 + 5]) w.box(x, G + 1, z, x, G + 4, z, B.desk);
      w.box(SX, G + 5, Z0 + 2, SX + 8, G + 5, Z0 + 5, B.deskTop);
      w.set(SX + 2, G + 6, Z0 + 3, B.iron); w.set(SX + 2, G + 7, Z0 + 3, B.fire);
      w.box(SX + 1, G + 8, Z0 + 3, SX + 3, G + 10, Z0 + 4, B.glass); w.box(SX + 2, G + 8, Z0 + 3, SX + 2, G + 9, Z0 + 4, B.potB); w.box(SX + 2, G + 11, Z0 + 3, SX + 2, G + 12, Z0 + 3, B.glass);
      w.line(SX + 2, G + 13, Z0 + 3, SX + 7, G + 9, Z0 + 3, B.copper); w.box(SX + 6, G + 6, Z0 + 3, SX + 7, G + 8, Z0 + 4, B.glass); w.box(SX + 6, G + 6, Z0 + 4, SX + 7, G + 6, Z0 + 4, B.potB);
      w.set(SX + 5, G + 6, Z0 + 5, B.book2); w.set(SX + 4, G + 6, Z0 + 5, B.parch);
      // 약재 서랍장(동쪽 벽): 3×2 서랍마다 놋 손잡이, 칸막이 살, 위 갓
      const DXc = X1;
      for (let z = Z0 + 18; z <= Z0 + 31; z++) for (let y = G + 1; y <= G + 13; y++) for (const x of [DXc - 1, DXc]) {
        const seam = (z - Z0 - 18) % 3 === 2 || (y - G - 1) % 3 === 2 || z === Z0 + 31;
        w.set(x, y, z, x === DXc ? B.desk : seam ? B.frame : ((z - Z0 - 18) % 3 === 1 && (y - G - 1) % 3 === 0 ? B.knob : B.drawer));
      }
      w.box(DXc - 2, G + 14, Z0 + 17, DXc, G + 14, Z0 + 32, B.frame);
      for (const [z, b] of [[Z0 + 19, B.herb], [Z0 + 22, B.herbD], [Z0 + 26, B.potG], [Z0 + 29, B.herb]]) w.set(DXc - 1, G + 15, z, b);
      const drw = w.prop({ name: 'herbdrawer', pivot: [DXc - 1.5, G + 8, Z0 + 26] });
      drw.box(DXc - 3, G + 7, Z0 + 24, DXc - 2, G + 8, Z0 + 26, B.drawer); drw.set(DXc - 3, G + 8, Z0 + 25, B.knob);
      drw.set(DXc - 2, G + 9, Z0 + 24, B.herb); drw.set(DXc - 2, G + 9, Z0 + 25, B.herbD); drw.set(DXc - 2, G + 9, Z0 + 26, B.herb);
      acts.push({
        name: '약재 서랍', hint: '약재 서랍 하나가 쑥 빠져나오며 말린 약초 가루가 흩날려요', hit: [DXc - 6, G + 1, Z0 + 18, DXc, G + 14, Z0 + 31],
        run: async a => {
          await a.move('herbdrawer', [-5, 0, 0], 0.6);
          for (let q = 0; q < 4; q++) { a.burst([DXc - 6, G + 11, Z0 + 25.5], { n: 16, colors: ['#6aa040', '#c8b060', '#8a8a3a'], speed: 4, up: 4, life: 1.4, gravity: 1.2, spread: 1.6 }); await a.wait(0.35); }
          await a.move('herbdrawer', [0, 0, 0], 0.6);
        },
      });

      // ── 2층 재료 창고(남동쪽): 마루(장선), 기둥, 난간(동자), 나무 계단(남쪽 벽을 따라) ──
      const LX0 = X0 + 28, LZ0 = Z0 + 28, HZ0 = LZ0 + 12;
      for (let z = LZ0; z <= Z1; z++) for (let x = LX0; x <= X1; x++) { w.set(x, LH, z, (x - LX0) % 6 === 5 ? B.plank : B.board); if ((z - LZ0) % 4 === 0) w.set(x, LH - 1, z, B.frameDk); }
      for (const [x, z] of [[LX0, LZ0], [X1 - 1, LZ0], [LX0, Z1 - 7]]) { w.box(x, G + 1, z, x + 1, LH - 1, z + 1, B.frame); w.box(x, LH - 2, z - 1, x + 1, LH - 2, z + 2, B.frameDk); }
      for (let x = LX0; x <= X1; x++) { w.set(x, LH + 4, LZ0, B.frame); if (x % 2 === 0) w.box(x, LH + 1, LZ0, x, LH + 3, LZ0, B.plank); }
      for (let z = LZ0; z <= Z1 - 7; z++) { w.set(LX0, LH + 4, z, B.frame); if (z % 2 === 0) w.box(LX0, LH + 1, z, LX0, LH + 3, z, B.plank); }
      w.box(LX0, LH + 1, LZ0, LX0 + 1, LH + 5, LZ0 + 1, B.frame); w.box(LX0, LH + 1, Z1 - 7, LX0 + 1, LH + 5, Z1 - 6, B.frame);
      for (let q = 0; q < 14; q++) { const x = LX0 - 14 + q; w.box(x, G + 1, Z1 - 3, x, G + 1 + q, Z1, B.board); w.box(x, G + 1 + q, Z1 - 3, x, G + 1 + q, Z1 - 3, B.plank); }   // 계단: 높이 1~14
      for (let q = 0; q < 14; q += 2) w.box(LX0 - 14 + q, G + 2 + q, Z1 - 4, LX0 - 14 + q, G + 5 + q, Z1 - 4, B.frame);
      w.line(LX0 - 14, G + 6, Z1 - 4, LX0 - 1, G + 19, Z1 - 4, B.frame);
      // 창고 아래: 술통과 자루
      barrel(LX0 + 5, G + 1, LZ0 + 7, 7); barrel(LX0 + 11, G + 1, LZ0 + 7, 7); barrel(X1 - 3, G + 1, LZ0 + 13, 7);
      sack(X1 - 5, G + 1, Z1 - 4); sack(X1 - 3, G + 1, Z1 - 9);
      // 창고 위: 상자, 자루, 말리는 약초 다발(건조대), 등
      crate(X1 - 3, LH + 1, Z1 - 3, 4); crate(X1 - 3, LH + 5, Z1 - 3, 4); crate(X1 - 8, LH + 1, Z1 - 3, 4); crate(X1 - 3, LH + 1, Z1 - 8, 3);
      sack(LX0 + 6, LH + 1, Z1 - 3); sack(LX0 + 10, LH + 1, Z1 - 3); sack(X1 - 4, LH + 1, LZ0 + 5);
      for (const z of [LZ0 + 4, Z1 - 4]) w.box(X1, LH + 1, z, X1, LH + 10, z, B.frame);
      w.box(X1, LH + 10, LZ0 + 4, X1, LH + 10, Z1 - 4, B.frame);
      for (let z = LZ0 + 6; z <= Z1 - 6; z++) { w.set(X1, LH + 9, z, B.rope); if (z % 3 !== 2) { const b = z % 2 ? B.herb : B.herbD; w.box(X1, LH + 6 + (z % 3 === 0 ? 0 : 1), z, X1, LH + 8, z, b); w.set(X1, LH + 8, z, B.rope); } }
      w.box(LX0, LH + 1, HZ0, LX0 + 1, LH + 10, HZ0 + 1, B.frame);
      w.box(X1 - 7, LH + 1, LZ0 + 3, X1 - 5, LH + 3, LZ0 + 5, B.desk); w.set(X1 - 6, LH + 4, LZ0 + 4, B.iron); w.box(X1 - 6, LH + 5, LZ0 + 4, X1 - 6, LH + 6, LZ0 + 4, B.lamp); w.set(X1 - 6, LH + 7, LZ0 + 4, B.ironDk);
      lights.push({ name: 'loft', p: [X1 - 5.5, LH + 6, LZ0 + 4.5], c: '#b8ff9a', i: 0.8, d: 22, flicker: 0.15 });
      // 도르래: 창고 들보 끝에서 자루를 끌어올린다
      const HX = LX0 - 4, HZ = LZ0 + 12;
      w.box(LX0 - 6, LH + 12, HZ, LX0 + 1, LH + 13, HZ + 1, B.frame); w.box(LX0, LH + 1, HZ, LX0 + 1, LH + 11, HZ + 1, B.frame);
      w.box(HX, LH + 11, HZ, HX + 1, LH + 11, HZ + 1, B.iron); w.set(HX, LH + 10, HZ, B.ironDk);
      const sk = w.prop({ name: 'sack', pivot: [HX + 1, G + 3, HZ + 1] });
      for (let dz = 0; dz < 2; dz++) for (let dx = 0; dx < 2; dx++) sk.box(HX + dx, G + 1, HZ + dz, HX + dx, G + 4, HZ + dz, (dx + dz) % 2 ? B.sack : B.sack2);
      sk.set(HX, G + 5, HZ, B.rope); sk.box(HX, G + 6, HZ, HX, LH + 9, HZ, B.rope); sk.set(HX + 1, G + 4, HZ + 1, B.herb); sk.set(HX + 1, G + 5, HZ + 1, B.herb);
      acts.push({
        name: '재료 끌어올리기', hint: '도르래가 약초 자루를 2층 재료 창고로 끌어올렸다가 다시 내려놓아요', hit: [HX - 2, G + 1, HZ - 2, HX + 3, G + 8, HZ + 3],
        run: async a => {
          await a.move('sack', [0, 12, 0], 1.6);
          await a.move('sack', [4, 14.4, 0], 0.7);
          a.burst([HX + 5, LH + 4, HZ + 1], { n: 14, colors: ['#6aa040', '#b8a070'], speed: 4, up: 2, life: 1, gravity: 4, spread: 1.2 });
          await a.wait(0.6);
          await a.move('sack', [0, 12, 0], 0.7); await a.move('sack', [0, 0, 0], 1.4);
        },
      });

      lights.push({ name: 'table', p: [X0 + 13.5, G + 10, Z1 - 12], c: '#ffe060', i: 0.8, d: 20, flicker: 0.12 });
      lights.push({ p: [X0 + 32, G + 9, Z0 + 1], c: '#c8ff8a', i: 0.7, d: 28, flicker: 0.04, night: true });
      landmarks.push({ name: '조제실 가마솥', note: '화덕 위에서 끓는 물약', p: [KX + 0.5, G + 24, KZ + 0.5] });
      landmarks.push({ name: '재료 창고', note: '약초 다발 · 도르래', p: [X1 - 9, LH + 20, Z1 - 9] });
      return { lights, landmarks, acts };
    },
  });
})();
