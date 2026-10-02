// 왕성 앞 광장 — 해자와 도개교, 거대한 성문, 선왕 석상이 늘어선 대광장 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  const { KP, DAY } = window.KINGDOM;
  MAPS.push(Object.assign({}, DAY, {
    id: 'castlegate', cat: 'kingdom', name: '왕성 앞 광장', en: 'Castle Gate', color: '#c8d4ee', seed: 239, base: 20,
    desc: '왕성 정문 앞 대광장. 선왕들의 석상이 늘어선 이곳에서 근위대 교대식이 열린다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['위치', '왕성 남쪽 정문'], ['명물', '도개교 · 선왕 석상 · 쌍분수'], ['소문', '정문의 쇠창살은 한 번도 끝까지 내려간 적이 없다']] },
    fog: { start: 0.76, floor: 10, depth: 10 },
    camY: 18,
    particles: [
      { n: 60, colors: ['#fff4c0', '#ffffff'], mode: 'drift', speed: 0.3, y0: 26, y1: 80, glow: false },
      { n: 18, colors: ['#ffffff'], mode: 'wisp', speed: 1.2, size: 2, y0: 60, glow: false },
    ],
    blocks: Object.assign({}, KP, {
      carpet: { c: '#2a4a9a', top: '#30509e', v: 0.03 }, goldP: { c: '#b89a3a', top: '#e8c04a', v: 0.04 }, waterB: { c: '#5aa0d8', v: 0.03 },
      chain: { c: '#3a3a44', v: 0.03 }, dark: { c: '#16141a', v: 0 }, fire: { c: '#ffb04a', glow: true },
    }),
    build(w) {
      const B = w.id, base = w.base, P = base + 3, CG = base + 10, WL = base;
      MH.terrain(w, {
        floor: 2,
        height: (x, z) => z <= 40 ? CG : z <= 48 ? base - 4 : P,
        surface: (x, z) => z <= 40 ? B.slab : z <= 48 ? B.rockDk : B.cobble,
        under: (x, z, y, dep) => z <= 40 ? B.white : dep < 2 ? B.dirt : B.rock,
      });
      MH.water(w, WL, (x, z) => z >= 41 && z <= 48);
      for (let x = 0; x < W; x++) for (let y = base - 4; y <= P; y++) w.set(x, y, 49, B.whiteDk);
      const lights = [], acts = [], landmarks = [];
      const GX0 = 59, GX1 = 69, MIDX = 64;

      // ── 성벽과 성벽 탑 ──
      const wm = { wall: B.white, band: B.whiteDk, cren: B.trim, walk: B.whiteDk };
      MH.wall(w, [[0, 38], [50, 38]], { m: wm, h: 18, t: 3, y: CG, buttress: true });
      MH.wall(w, [[78, 38], [127, 38]], { m: wm, h: 18, t: 3, y: CG, buttress: true });
      const tm = { wall: B.white, band: B.whiteDk, win: B.win, cren: B.trim, roof: B.roofB, eave: B.eave, finial: B.gold, flag: B.banner };
      for (const tx of [18, 110]) MH.tower(w, { cx: tx, cz: 39, y0: base - 4, h: CG - base + 32, r: 5.5, m: tm, step: 0.36 });
      // ── 성문: 두 개의 큰 탑과 문루 ──
      const towerTops = [];
      for (const tx of [51, 77]) towerTops.push(MH.tower(w, { cx: tx, cz: 38, y0: base - 4, h: CG - base + 42, r: 7, m: tm, step: 0.36 }));
      w.box(56, P, 28, 72, CG + 28, 40, B.white);
      for (const y of [CG + 8, CG + 18, CG + 28]) w.walls(55, y, 27, 73, y, 41, B.whiteDk);
      w.box(56, CG + 29, 28, 72, CG + 29, 40, B.whiteDk);
      for (let x = 56; x <= 72; x += 2) for (const z of [28, 40]) { w.set(x, CG + 30, z, B.trim); w.set(x, CG + 31, z, B.trim); }
      MH.roof(w, 57, 71, 29, 39, CG + 30, { b: B.roofB, eave: B.eave, ridge: B.gold, pitch: 1, gable: B.white, axis: 'x' });
      // 통로(광장 높이)와 아치
      const archTop = x => P + 13 - Math.pow(Math.abs(x - MIDX) / 5.5, 2) * 4;
      for (let z = 22; z <= 41; z++) for (let x = GX0; x <= GX1; x++) {
        const floor = z >= 30 ? P : Math.min(CG, P + (30 - z));
        MH.setH(w, x, z, floor, z >= 30 ? B.cobble : B.whiteDk, B.white);
        for (let y = floor + 1; y <= CG + 6; y++) if (z < 28 || y <= archTop(x)) w.set(x, y, z, 0);
      }
      for (let z = 22; z <= 27; z++) for (const x of [GX0 - 1, GX1 + 1]) { for (let y = CG + 1; y <= CG + 2; y++) w.set(x, y, z, B.whiteDk); }
      for (let x = GX0 - 1; x <= GX1 + 1; x++) for (let y = P + 1; y <= P + 15; y++) if (y > archTop(x) && y <= archTop(x) + 1.5 || (x < GX0 || x > GX1) && y <= P + 13) w.set(x, y, 41, (x + y) % 2 ? B.gold : B.trim);
      w.box(GX0, P + 1, 28, GX1, P + 8, 28, B.door); for (let x = GX0; x <= GX1; x += 2) w.box(x, P + 1, 28, x, P + 8, 28, B.wood);
      for (let x = GX0; x <= GX1; x++) for (let y = P + 9; y <= P + 13; y++) if (y <= archTop(x)) w.set(x, y, 28, B.dark);
      // 문 위 문장과 깃발
      w.box(61, CG + 12, 41, 67, CG + 17, 41, B.banner); w.box(63, CG + 13, 42, 65, CG + 16, 42, B.gold); w.set(64, CG + 17, 42, B.gold);
      for (const bx of [57, 71]) w.box(bx, CG + 10, 41, bx, CG + 20, 41, B.banner);
      for (const lx of [GX0 - 2, GX1 + 2]) { w.box(lx, P + 8, 42, lx, P + 8, 42, B.iron); w.set(lx, P + 7, 42, B.lampG); lights.push({ p: [lx + 0.5, P + 7, 42.5], c: '#ffd890', i: 1.2, d: 16, flicker: 0.1, night: true }); }
      // 쇠창살(부품): 처음에는 위 홈에 올라가 있다
      w.box(GX0, P + 12, 40, GX1, CG + 16, 40, 0);
      const port = w.prop({ name: 'port', pivot: [MIDX + 0.5, P + 1, 40.5], off0: [0, 10, 0] });
      for (let x = GX0; x <= GX1; x++) for (let y = P + 1; y <= P + 12; y++) if (y <= archTop(x) && (x % 2 === 1 || (y - P) % 3 === 1)) port.set(x, y, 40, B.iron);
      for (let x = GX0; x <= GX1; x += 2) port.set(x, P + 1, 40, B.gold);
      acts.push({
        name: '쇠창살', hint: '쇠창살이 쿵 내려왔다가 다시 올라가요', hit: [GX0, P + 1, 39, GX1, P + 13, 41],
        run: async a => {
          await a.move('port', [0, 0, 0], 1.1, t => t * t);
          a.burst([MIDX + 0.5, P + 1, 42], { n: 30, colors: ['#d8d4ca', '#a8a49c'], speed: 5, up: 1, life: 1, gravity: 3, spread: 5, flat: true });
          await a.wait(1.6);
          await a.move('port', [0, 10, 0], 2.6, t => t);
        },
      });
      // 도개교(부품): 성문 쪽 축을 중심으로 들린다
      for (const x of [GX0 - 1, GX1 + 1]) { w.box(x, base - 4, 41, x, P, 41, B.white); w.box(x, base - 4, 48, x, P, 48, B.whiteDk); }
      const bridge = w.prop({ name: 'bridge', pivot: [MIDX + 0.5, P + 0.5, 42], axis: 'x' });
      for (let z = 42; z <= 48; z++) for (let x = GX0; x <= GX1; x++) { bridge.set(x, P, z, (x === GX0 || x === GX1 || z % 3 === 0) ? B.wood : B.plank); if ((x === GX0 || x === GX1) && z % 2 === 0) bridge.set(x, P + 1, z, B.iron); }
      acts.push({
        name: '도개교', hint: '다리가 성문 쪽으로 들렸다가 다시 내려와요', hit: [GX0, P, 41, GX1, P + 2, 48],
        run: async a => { await a.turn('bridge', [-1.35, 0, 0], 3); await a.wait(1.6); await a.turn('bridge', [0, 0, 0], 2.6); a.burst([MIDX + 0.5, P + 1, 49], { n: 24, colors: ['#d8d4ca', '#a8a49c'], speed: 5, up: 1, life: 0.9, gravity: 3, spread: 5, flat: true }); },
      });
      landmarks.push({ name: '왕성 정문', note: '쌍탑 사이의 문루와 쇠창살', p: [MIDX + 0.5, Math.max(...towerTops) + 4, 38.5], tag: 'GATE' });
      landmarks.push({ name: '도개교', note: '해자 위로 내린 다리', p: [MIDX + 0.5, P + 8, 45] });
      // ── 성벽 안쪽의 본성 ──
      const K0 = CG + 1;
      w.box(44, K0, 6, 84, K0 + 24, 22, B.white);
      for (const y of [K0 + 8, K0 + 16, K0 + 24]) w.walls(43, y, 5, 85, y, 23, B.whiteDk);
      for (let x = 47; x <= 81; x += 4) for (const fy of [K0 + 3, K0 + 11, K0 + 19]) { w.box(x, fy, 22, x + 1, fy + 3, 22, B.win); w.box(x, fy + 4, 22, x + 1, fy + 4, 22, B.trim); }
      MH.roof(w, 43, 85, 5, 23, K0 + 25, { b: B.roofB, eave: B.eave, ridge: B.gold, pitch: 1, gable: B.white, gwin: B.win, axis: 'x' });
      for (const tx of [44, 84]) MH.tower(w, { cx: tx, cz: 22, y0: K0, h: 30, r: 3.4, m: Object.assign({}, tm, { flag: null }), step: 0.34 });
      const kTop = MH.tower(w, { cx: MIDX, cz: 12, y0: K0 + 20, h: 26, r: 6, m: tm, step: 0.34 });
      // ── 대광장: 격자 포장, 푸른 행렬 길 ──
      for (let z = 50; z < D; z++) for (let x = 0; x < W; x++) {
        const inLane = x >= GX0 - 1 && x <= GX1 + 1;
        MH.paint(w, x, z, inLane ? (x === GX0 - 1 || x === GX1 + 1 ? B.goldP : B.carpet) : ((x >> 2) + (z >> 2)) % 2 ? B.slab : B.cobble);
      }
      // 선왕 석상(받침과 큰 입상)
      const statue = (x, z) => {
        const g = P + 1;
        w.box(x - 2, g, z - 2, x + 3, g + 1, z + 3, B.whiteDk); w.box(x - 1, g + 2, z - 1, x + 2, g + 4, z + 2, B.white); w.walls(x - 2, g + 5, z - 2, x + 3, g + 5, z + 3, B.trim);
        const y = g + 6;
        w.box(x, y, z, x + 1, y + 4, z + 1, B.white); w.box(x - 1, y + 5, z, x + 2, y + 10, z + 1, B.white);
        w.box(x - 2, y + 8, z, x - 2, y + 10, z + 1, B.white); w.box(x + 3, y + 8, z, x + 3, y + 10, z + 1, B.white);
        w.box(x, y + 11, z, x + 1, y + 13, z + 1, B.white); w.box(x, y + 14, z, x + 1, y + 14, z + 1, B.gold); w.set(x, y + 15, z, B.gold); w.set(x + 1, y + 15, z + 1, B.gold);
        w.box(x + 3, y + 1, z + 2, x + 3, y + 12, z + 2, B.gold); w.box(x - 1, y + 3, z + 2, x + 2, y + 9, z + 2, B.whiteDk);
        return y + 16;
      };
      let sTop = 0;
      for (const z of [60, 80, 100]) for (const x of [46, 80]) sTop = Math.max(sTop, statue(x, z));
      landmarks.push({ name: '선왕들의 석상', note: '여섯 왕이 광장을 지킨다', p: [47, sTop + 4, 80.5] });
      // 쌍분수
      for (const FX of [26, 102]) {
        const FZ = 80;
        for (let z = FZ - 9; z <= FZ + 9; z++) for (let x = FX - 9; x <= FX + 9; x++) {
          const d = MH.dist(x, z, FX, FZ);
          if (d > 8.4) continue;
          if (d > 7) { w.set(x, P + 1, z, B.white); w.set(x, P + 2, z, B.trim); continue; }
          MH.setH(w, x, z, P - 2, B.whiteDk, B.found); w.liquid(x, z, P);
        }
        w.cyl(FX, FZ, P - 1, P + 5, 1.4, B.white); w.cyl(FX, FZ, P + 6, P + 6, 3.6, B.white); w.ring(FX, FZ, P + 7, 2.6, 3.6, B.trim); w.cyl(FX, FZ, P + 7, P + 7, 2.6, B.waterB);
        w.box(FX, P + 8, FZ, FX, P + 12, FZ, B.white); w.box(FX, P + 13, FZ, FX, P + 15, FZ, B.gold);
      }
      acts.push({
        name: '쌍분수', hint: '양쪽 분수가 함께 솟구쳐요', hit: [20, P + 1, 74, 32, P + 15, 86],
        run: async a => { for (let k = 0; k < 8; k++) { for (const FX of [26, 102]) a.burst([FX + 0.5, P + 15, 80.5], { n: 36, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 5, up: 12, life: 1.8, gravity: 12, spread: 1 }); await a.wait(0.32); } },
      });
      landmarks.push({ name: '쌍분수', note: '광장 양쪽의 큰 분수', p: [26.5, P + 22, 80.5] });
      // 깃대와 기둥 회랑
      for (const [fx, fz] of [[38, 54], [90, 54], [38, 110], [90, 110]]) {
        w.box(fx - 1, P + 1, fz - 1, fx + 1, P + 1, fz + 1, B.whiteDk); w.box(fx, P + 2, fz, fx, P + 24, fz, B.whiteDk); w.set(fx, P + 25, fz, B.gold);
        w.box(fx + 1, P + 17, fz, fx + 5, P + 23, fz, B.banner); w.box(fx + 2, P + 19, fz, fx + 4, P + 21, fz, B.gold);
      }
      for (const cx of [8, 120]) {
        for (let z = 56; z <= 116; z += 6) { w.box(cx - 1, P + 1, z - 1, cx + 1, P + 1, z + 1, B.whiteDk); w.box(cx, P + 2, z, cx, P + 12, z, B.white); w.box(cx - 1, P + 13, z - 1, cx + 1, P + 13, z + 1, B.trim); if (z % 12 === 8) { w.set(cx + (cx < 64 ? 1 : -1), P + 10, z, B.lampG); lights.push({ p: [cx + (cx < 64 ? 1.5 : -0.5), P + 10, z + 0.5], c: '#ffd890', i: 1, d: 14, flicker: 0.05, night: true }); } }
        w.box(cx - 1, P + 14, 55, cx + 1, P + 15, 117, B.white); w.box(cx - 2, P + 16, 54, cx + 2, P + 16, 118, B.whiteDk);
      }
      for (const [lx, lz] of [[52, 56], [76, 56], [52, 90], [76, 90], [52, 116], [76, 116]]) lights.push({ p: MH.lamp(w, lx, lz, { m: { post: B.iron, glow: B.lampG, found: B.whiteDk }, h: 7 }), c: '#ffe0a0', i: 1, d: 14, flicker: 0.05, night: true });
      for (const [tx, tz] of [[18, 58], [110, 58], [18, 104], [110, 104]]) { w.walls(tx - 3, P + 1, tz - 3, tx + 3, P + 1, tz + 3, B.whiteDk); w.box(tx - 2, P + 1, tz - 2, tx + 2, P + 1, tz + 2, B.grass); MH.tree(w, tx, P + 2, tz, { kind: 'oak', h: 9, bark: B.bark, leaves: [B.leaf2, B.leaf, B.leafDk], r: 4.2 }); }
      // 성문 탑의 봉화(축포)
      for (const tx of [51, 77]) { const y = CG + 42; w.set(tx, y - 0, 38, 0); }
      acts.push({
        name: '축포', hint: '성문 쌍탑 위로 축포가 터져요', hit: [44, CG + 28, 31, 58, CG + 44, 45],
        run: async a => {
          const sets = [['#6ab0ff', '#ffffff'], ['#ffe060', '#fff4c0'], ['#ffffff', '#c8d4ee']];
          for (let k = 0; k < 6; k++) {
            const tx = k % 2 ? 77 : 51, top = towerTops[k % 2];
            a.burst([tx + 0.5, top, 38.5], { n: 10, colors: ['#ffe8a0'], speed: 0.5, up: 16, life: 0.9, gravity: 4, spread: 0.3 });
            await a.wait(0.7);
            a.burst([tx + (k - 2.5) * 3, top + 16, 40], { n: 90, colors: sets[k % 3], speed: 16, up: 2, life: 1.6, gravity: 2.5, spread: 1 });
            await a.wait(0.3);
          }
        },
      });
      return { lights, landmarks, acts };
    },
  }));
})();
