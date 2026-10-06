// 왕성 앞 광장 — 해자와 도개교, 거대한 성문, 선왕 석상이 늘어선 대광장, 남쪽 개선문과 꽃시장 거리 (176칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const { KP, DAY } = window.KINGDOM;
  const W = 176, D = 176, Hh = 144;
  MAPS.push(Object.assign({}, DAY, {
    id: 'castlegate', cat: 'kingdom', name: '왕성 앞 광장', en: 'Castle Gate', color: '#c8d4ee', seed: 239, base: 20, size: [W, D, Hh],
    desc: '왕성 정문 앞 대광장. 선왕들의 석상이 늘어선 이곳에서 근위대 교대식이 열린다. 광장 남쪽 끝에는 세 갈래 개선문이 서 있고, 그 양옆으로 꽃 노점이 늘어선 꽃시장 거리가 이어진다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['위치', '왕성 남쪽 정문'], ['명물', '도개교 · 선왕 석상 · 쌍분수 · 개선문'], ['새 거리', '개선문 앞 꽃시장 거리'], ['소문', '정문의 쇠창살은 한 번도 끝까지 내려간 적이 없다']] },
    fog: { start: 0.82, floor: 10, depth: 10, box: [88, 96, 92, 100] },
    camY: -2, zoom: 1.08,
    particles: [
      { n: 80, colors: ['#fff4c0', '#ffffff'], mode: 'drift', speed: 0.3, y0: 26, y1: 96, glow: false },
      { n: 22, colors: ['#ffffff'], mode: 'wisp', speed: 1.2, size: 2, y0: 76, glow: false },
      { n: 40, colors: ['#ffc0d8', '#ffffff', '#ffe060'], mode: 'drift', speed: 0.25, area: [88, 164, 70], y0: 24, y1: 44, glow: false },
    ],
    blocks: Object.assign({}, KP, {
      carpet: { c: '#2a4a9a', top: '#30509e', v: 0.03 }, goldP: { c: '#b89a3a', top: '#e8c04a', v: 0.04 }, waterB: { c: '#5aa0d8', v: 0.03 },
      chain: { c: '#3a3a44', v: 0.03 }, dark: { c: '#16141a', v: 0 }, fire: { c: '#ffb04a', glow: true },
      fire2: { c: '#ff7a2a', glow: true }, fishO: { c: '#f08a30', v: 0.04 }, fishW: { c: '#f4f0e8', v: 0.03 }, coach: { c: '#2a4a9a', v: 0.03 }, glass: { c: '#16141a', v: 0 },
      pave: { c: '#a8a49c', top: '#c8c2b6', v: 0.05, pat: 'stone' }, paveD: { c: '#8a867e', top: '#9e9a90', v: 0.06, pat: 'stone' },
      moss: { c: '#5a7a4a', v: 0.08 }, slate: { c: '#3a4258', v: 0.04 }, bronze: { c: '#b8863a', v: 0.05 },
      pigeon: { c: '#9aa0b0', v: 0.04 }, pigeonW: { c: '#e8eaf0', v: 0.03 }, pigeonN: { c: '#5a8a7a', v: 0.04 },
      flowerP: { c: '#f08ab8', v: 0.05 }, flowerB: { c: '#6a8ae0', v: 0.05 }, flowerO: { c: '#f0a040', v: 0.05 }, flowerV: { c: '#a06ad8', v: 0.05 },
      awnR: { c: '#c84a5a', v: 0.02 }, awnW: { c: '#f6f2e8', v: 0.02 }, awnB: { c: '#4a7ac8', v: 0.02 }, awnY: { c: '#e8c850', v: 0.02 },
      bucket: { c: '#7a8a9a', v: 0.04 }, soil: { c: '#5a3e28', v: 0.06 },
    }),
    build(w) {
      const B = w.id, base = w.base, P = base + 3, CG = base + 12, WL = base;
      const MZ0 = 51, MZ1 = 60, RZ = 61, PZ0 = 62, PZ1 = 149;   // 해자, 옹벽, 광장
      MH.terrain(w, {
        floor: 2,
        height: (x, z) => z < MZ0 ? CG : z <= MZ1 ? base - 5 : P,
        surface: (x, z) => z < MZ0 ? B.slab : z <= MZ1 ? B.rockDk : B.cobble,
        under: (x, z, y, dep) => z < MZ0 ? B.white : dep < 2 ? B.dirt : B.rock,
      });
      MH.water(w, WL, (x, z) => z >= MZ0 && z <= MZ1);
      // 옹벽(광장 쪽)과 성 쪽 축대: 띠돌림·배수구·이끼
      for (let x = 0; x < W; x++) for (let y = base - 5; y <= P; y++) w.set(x, y, RZ, y === P ? B.trim : B.whiteDk);
      for (let x = 0; x < W; x++) {
        w.set(x, CG - 3, MZ0 - 1, B.whiteDk);
        if (x % 12 === 6) { w.set(x, WL + 3, MZ0 - 1, B.dark); w.set(x, WL + 2, MZ0 - 1, B.moss); w.set(x, WL + 1, MZ0 - 1, B.moss); }
        if (hash3(x, 3, 50) > 0.8) w.set(x, WL + 1, MZ0 - 1, B.moss);
        if (hash3(x, 5, 61) > 0.8) w.set(x, WL + 1, RZ, B.moss);
      }
      const lights = [], acts = [], landmarks = [];
      const GX0 = 82, GX1 = 94, MIDX = 88;

      // ── 성벽과 성벽 탑 ──
      const wm = { wall: B.white, band: B.whiteDk, cren: B.trim, walk: B.whiteDk };
      MH.wall(w, [[0, 47], [64, 47]], { m: wm, h: 22, t: 3, y: CG, buttress: true });
      MH.wall(w, [[112, 47], [175, 47]], { m: wm, h: 22, t: 3, y: CG, buttress: true });
      // 성벽 앞면 화살구멍
      for (let x = 4; x < W - 4; x += 6) { if (x > 58 && x < 118) continue; w.box(x, CG + 12, 49, x, CG + 15, 49, B.dark); w.set(x, CG + 16, 49, B.trim); }
      const tm = { wall: B.white, band: B.whiteDk, win: B.win, cren: B.trim, roof: B.roofB, eave: B.eave, finial: B.gold, flag: null };
      for (const tx of [24, 152]) MH.tower(w, { cx: tx, cz: 48, y0: base - 5, h: CG - base + 40, r: 6.5, m: tm, step: 0.36 });
      // ── 성문: 두 개의 큰 탑과 문루 ──
      const towerTops = [];
      for (const tx of [70, 106]) towerTops.push(MH.tower(w, { cx: tx, cz: 47, y0: base - 5, h: CG - base + 52, r: 8.5, m: tm, step: 0.36 }));
      // 탑 몸통의 창틀(남쪽 면)
      for (const tx of [70, 106]) for (const fy of [CG + 6, CG + 18, CG + 30]) {
        w.box(tx, fy, 56, tx, fy + 3, 56, B.win); w.box(tx - 1, fy - 1, 57, tx + 1, fy - 1, 57, B.whiteDk); w.set(tx, fy + 4, 57, B.gold);
        w.box(tx - 1, fy, 57, tx - 1, fy + 3, 57, B.trim); w.box(tx + 1, fy, 57, tx + 1, fy + 3, 57, B.trim);
      }
      const GT = CG + 34;                                    // 문루 지붕턱
      w.box(76, P, 34, 100, GT, 50, B.white);
      for (const y of [CG + 10, CG + 22, GT]) w.walls(75, y, 33, 101, y, 51, B.whiteDk);
      // 앞면 돌출부(문 위 정면)
      w.box(79, P + 1, 51, 97, GT - 1, 51, B.white);
      for (let x = 79; x <= 97; x += 2) w.set(x, GT - 1, 52, B.trim);         // 내민 받침돌
      w.box(79, GT, 52, 97, GT, 52, B.whiteDk);
      w.box(76, GT + 1, 34, 100, GT + 1, 52, B.whiteDk);
      for (let x = 76; x <= 100; x += 2) for (const z of [34, 52]) { w.set(x, GT + 2, z, B.trim); w.set(x, GT + 3, z, B.trim); }
      for (let z = 34; z <= 52; z += 2) for (const x of [76, 100]) { w.set(x, GT + 2, z, B.trim); w.set(x, GT + 3, z, B.trim); }
      const gPeak = MH.roof(w, 77, 99, 35, 51, GT + 2, { b: B.roofB, eave: B.eave, ridge: B.gold, pitch: 1, gable: B.white, gwin: B.win, axis: 'x' });
      for (const x of [77, 99]) w.box(x, gPeak, 43, x, gPeak + 2, 43, B.gold);
      // 문루 종탑(지붕 위 작은 탑)
      w.box(86, gPeak - 1, 41, 90, gPeak + 4, 45, B.white); w.box(87, gPeak + 1, 41, 89, gPeak + 3, 45, B.dark); w.box(86, gPeak + 1, 42, 90, gPeak + 3, 44, B.dark);
      w.box(87, gPeak + 1, 42, 89, gPeak + 3, 44, B.white);
      MH.pyramid(w, 85, 40, 91, 46, gPeak + 5, B.roofB, 2, B.eave); w.box(88, gPeak + 13, 43, 88, gPeak + 15, 43, B.gold);
      // 문루 창(앞면)
      const gWin = (x, y, h) => {
        w.box(x, y, 52, x + 1, y + h - 1, 52, B.win);
        w.box(x - 1, y - 1, 52, x + 2, y - 1, 52, B.whiteDk); w.box(x - 1, y, 52, x - 1, y + h - 1, 52, B.trim); w.box(x + 2, y, 52, x + 2, y + h - 1, 52, B.trim);
        w.box(x, y + h, 52, x + 1, y + h, 52, B.trim); w.box(x - 1, y + h, 53, x + 2, y + h, 53, B.gold);
      };
      for (const x of [80, 95]) { gWin(x, CG + 13, 5); gWin(x, CG + 25, 5); }
      gWin(84, CG + 25, 4); gWin(91, CG + 25, 4);
      // 통로(광장 높이)와 아치
      const archTop = x => P + 16 - Math.pow(Math.abs(x - MIDX) / 6.5, 2) * 5;
      for (let z = 26; z <= 51; z++) for (let x = GX0; x <= GX1; x++) {
        const floor = z >= 36 ? P : Math.min(CG, P + (36 - z));
        MH.setH(w, x, z, floor, z >= 36 ? B.cobble : B.whiteDk, B.white);
        for (let y = floor + 1; y <= CG + 10; y++) if (z < 34 || y <= archTop(x)) w.set(x, y, z, 0);
      }
      for (let z = 26; z <= 33; z++) for (const x of [GX0 - 1, GX1 + 1]) { for (let y = CG + 1; y <= CG + 2; y++) w.set(x, y, z, (z & 1) ? B.trim : B.whiteDk); }
      // 아치 테두리(쐐기돌)와 문설주
      for (let x = GX0 - 2; x <= GX1 + 2; x++) for (let y = P + 1; y <= P + 19; y++) {
        const at = archTop(Math.max(GX0, Math.min(GX1, x)));
        if (x >= GX0 && x <= GX1 && y > at && y <= at + 2) w.set(x, y, 52, (x + y) % 2 ? B.gold : B.trim);
        else if ((x < GX0 || x > GX1) && y <= P + 15) w.set(x, y, 52, y % 4 === 0 ? B.whiteDk : B.trim);
      }
      w.box(MIDX - 1, P + 17, 53, MIDX + 1, P + 19, 53, B.gold);             // 쐐기 머릿돌
      w.box(GX0, P + 1, 36, GX1, P + 10, 36, B.door); for (let x = GX0; x <= GX1; x += 2) w.box(x, P + 1, 36, x, P + 10, 36, B.wood);
      for (let x = GX0; x <= GX1; x++) for (let y = P + 11; y <= P + 16; y++) if (y <= archTop(x)) w.set(x, y, 36, B.dark);
      // 문 위 왕실 문장(돋을새김 방패)
      w.box(83, CG + 13, 52, 93, CG + 21, 52, B.whiteDk); w.box(84, CG + 14, 53, 92, CG + 20, 53, B.carpet);
      w.box(86, CG + 15, 54, 90, CG + 19, 54, B.gold); w.box(87, CG + 14, 54, 89, CG + 14, 54, B.gold); w.box(88, CG + 20, 54, 88, CG + 22, 54, B.gold);
      w.box(87, CG + 16, 55, 89, CG + 18, 55, B.trim);
      for (const lx of [GX0 - 3, GX1 + 3]) { w.box(lx, P + 9, 53, lx, P + 9, 54, B.iron); w.set(lx, P + 8, 54, B.lampG); w.set(lx, P + 10, 54, B.iron); lights.push({ p: [lx + 0.5, P + 8, 54.5], c: '#ffd890', i: 1.2, d: 18, flicker: 0.1, night: true }); }
      // 쇠창살(부품): 처음에는 위 홈에 올라가 있다
      w.box(GX0, P + 1, 50, GX1, P + 31, 50, 0);
      w.box(GX0, P + 1, 51, GX1, P + 31, 51, 0);
      for (let x = GX0; x <= GX1; x++) for (let y = P + 1; y <= P + 31; y++) if (y > archTop(x) + 2 && y <= P + 31) w.set(x, y, 49, B.dark);
      const port = w.prop({ name: 'port', pivot: [MIDX + 0.5, P + 1, 50.5], off0: [0, 13, 0] });
      for (let x = GX0; x <= GX1; x++) for (let y = P + 1; y <= P + 15; y++) if (y <= archTop(x) && (x % 2 === 0 || (y - P) % 3 === 1)) port.set(x, y, 50, B.iron);
      for (let x = GX0; x <= GX1; x += 2) port.set(x, P + 1, 50, B.gold);
      acts.push({
        name: '쇠창살', hint: '쇠창살이 쿵 내려왔다가 다시 올라가요', hit: [GX0, P + 1, 49, GX1, P + 16, 52],
        run: async a => {
          await a.move('port', [0, 0, 0], 1.1, t => t * t);
          a.burst([MIDX + 0.5, P + 1, 52], { n: 34, colors: ['#d8d4ca', '#a8a49c'], speed: 5, up: 1, life: 1, gravity: 3, spread: 6, flat: true });
          await a.wait(1.6);
          await a.move('port', [0, 13, 0], 2.6, t => t);
        },
      });
      // 도개교(부품): 성문 쪽 축을 중심으로 들린다
      for (const x of [GX0 - 1, GX1 + 1]) { w.box(x, base - 5, MZ1, x, P, MZ1, B.whiteDk); w.set(x, P + 1, MZ1, B.trim); }
      const bridge = w.prop({ name: 'bridge', pivot: [MIDX + 0.5, P + 0.5, 52], axis: 'x' });
      for (let z = 52; z <= MZ1; z++) for (let x = GX0; x <= GX1; x++) { bridge.set(x, P, z, (x === GX0 || x === GX1 || z % 3 === 0) ? B.wood : B.plank); if ((x === GX0 || x === GX1) && z % 2 === 0) bridge.set(x, P + 1, z, B.iron); }
      // 도개교 쇠사슬 고리(문루 앞면)
      for (const x of [GX0, GX1]) { w.set(x, P + 20, 53, B.iron); w.set(x, P + 21, 53, B.chain); }
      acts.push({
        name: '도개교', hint: '다리가 성문 쪽으로 들렸다가 다시 내려와요', hit: [GX0, P, 51, GX1, P + 2, MZ1],
        run: async a => { await a.turn('bridge', [-1.35, 0, 0], 3); await a.wait(1.6); await a.turn('bridge', [0, 0, 0], 2.6); a.burst([MIDX + 0.5, P + 1, 61], { n: 28, colors: ['#d8d4ca', '#a8a49c'], speed: 5, up: 1, life: 0.9, gravity: 3, spread: 6, flat: true }); },
      });
      landmarks.push({ name: '왕성 정문', note: '쌍탑 사이의 문루와 쇠창살', p: [MIDX + 0.5, Math.max(...towerTops) + 4, 47.5], tag: 'GATE' });
      landmarks.push({ name: '도개교', note: '해자 위로 내린 다리', p: [MIDX + 0.5, P + 9, 56] });

      // ── 성벽 안쪽의 본성 ──
      const K0 = CG + 1;
      w.box(62, K0, 6, 114, K0 + 28, 24, B.white);
      for (const y of [K0 + 9, K0 + 18, K0 + 27]) w.walls(61, y, 5, 115, y, 25, B.whiteDk);
      for (let x = 66; x <= 110; x += 4) for (const fy of [K0 + 3, K0 + 12, K0 + 20]) {
        w.box(x, fy, 24, x + 1, fy + 3, 24, B.win); w.box(x - 1, fy - 1, 25, x + 2, fy - 1, 25, B.whiteDk); w.box(x, fy + 4, 25, x + 1, fy + 4, 25, B.trim);
      }
      const kPeak = MH.roof(w, 61, 115, 5, 25, K0 + 29, { b: B.roofB, eave: B.eave, ridge: B.gold, pitch: 1, gable: B.white, gwin: B.win, axis: 'x' });
      for (const dx of [70, 80, 96, 106]) {
        w.box(dx - 1, K0 + 30, 21, dx + 1, K0 + 33, 24, B.white); w.box(dx, K0 + 31, 24, dx, K0 + 32, 24, B.win);
        MH.roof(w, dx - 2, dx + 2, 20, 25, K0 + 34, { b: B.slate, eave: B.eave, ridge: B.gold, axis: 'z' });
      }
      for (const cx of [66, 110]) { w.box(cx, K0 + 29, 9, cx + 1, kPeak + 3, 10, B.whiteDk); w.box(cx - 1, kPeak + 4, 8, cx + 2, kPeak + 4, 11, B.trim); }
      for (const tx of [62, 114]) MH.tower(w, { cx: tx, cz: 24, y0: K0, h: 36, r: 4.2, m: tm, step: 0.34 });
      MH.tower(w, { cx: MIDX, cz: 14, y0: K0 + 24, h: 32, r: 7, m: tm, step: 0.34 });

      // ── 대광장: 격자 포장, 푸른 행렬 길 ──
      for (let z = PZ0; z < D; z++) for (let x = 0; x < W; x++) {
        const inLane = x >= GX0 - 1 && x <= GX1 + 1;
        let b;
        if (inLane) b = (x === GX0 - 1 || x === GX1 + 1) ? B.goldP : (x === MIDX && z % 10 === 5) ? B.goldP : B.carpet;
        else if (z > PZ1) b = z === PZ1 + 1 || z === PZ1 + 2 ? B.trim : ((x * 3 + z) % 7 === 0 ? B.paveD : B.pave);
        else if (x % 22 === 0 || z % 22 === 18) b = B.whiteDk;
        else b = ((x >> 2) + (z >> 2)) % 2 ? B.slab : B.cobble;
        MH.paint(w, x, z, b);
      }
      // 옹벽 위 난간(해자 쪽)
      for (let x = 0; x < W; x++) {
        if (x >= GX0 - 2 && x <= GX1 + 2) continue;
        if (x % 3 === 0) w.box(x, P + 1, PZ0, x, P + 2, PZ0, B.trim); else w.set(x, P + 2, PZ0, B.white);
        w.set(x, P + 3, PZ0, B.trim);
      }
      for (const x of [GX0 - 3, GX1 + 3]) { w.box(x, P + 1, PZ0, x, P + 5, PZ0, B.whiteDk); w.set(x, P + 6, PZ0, B.gold); }
      // 행렬 길 볼라드와 사슬
      for (let z = 66; z <= PZ1; z += 4) for (const x of [GX0 - 2, GX1 + 2]) {
        if (z % 8 === 2) { w.box(x, P + 1, z, x, P + 2, z, B.iron); w.set(x, P + 3, z, B.gold); }
        else w.set(x, P + 2, z, B.chain);
      }
      // 선왕 석상(받침과 큰 입상)
      const swords = [];
      const statue = (x, z) => {
        const g = P + 1;
        w.box(x - 3, g, z - 3, x + 4, g, z + 4, B.whiteDk); w.box(x - 2, g + 1, z - 2, x + 3, g + 1, z + 3, B.whiteDk);
        w.box(x - 1, g + 2, z - 1, x + 2, g + 4, z + 2, B.white); w.walls(x - 2, g + 5, z - 2, x + 3, g + 5, z + 3, B.trim);
        for (const [cx, cz] of [[x - 1, z - 1], [x + 2, z - 1], [x - 1, z + 2], [x + 2, z + 2]]) w.box(cx, g + 2, cz, cx, g + 4, cz, B.trim);
        w.box(x, g + 3, z + 3, x + 1, g + 3, z + 3, B.gold);                   // 이름판
        for (const [fx, fz] of [[x - 3, z + 4], [x + 4, z + 4], [x - 3, z - 3], [x + 4, z - 3]]) w.set(fx, g + 1, fz, hash3(fx, 2, fz) > 0.5 ? B.flowerR : B.flowerY);
        const y = g + 6;
        w.box(x, y, z, x + 1, y + 4, z + 1, B.white); w.box(x - 1, y + 5, z, x + 2, y + 10, z + 1, B.white);
        w.box(x - 1, y + 4, z - 1, x + 2, y + 10, z - 1, B.whiteDk);           // 등 망토
        w.box(x - 2, y + 8, z, x - 2, y + 10, z + 1, B.white); w.box(x + 3, y + 8, z, x + 3, y + 10, z + 1, B.white);
        w.box(x, y + 11, z, x + 1, y + 13, z + 1, B.white); w.box(x, y + 14, z, x + 1, y + 14, z + 1, B.gold); w.set(x, y + 15, z, B.gold); w.set(x + 1, y + 15, z + 1, B.gold);
        w.box(x - 1, y + 10, z, x + 2, y + 10, z + 1, B.trim);                   // 어깨 장식
        const sw = w.prop({ name: 'sword' + swords.length, pivot: [x + 3.5, y + 8, z + 2.5] }); swords.push([x, y, z]);
        sw.box(x + 3, y + 1, z + 2, x + 3, y + 12, z + 2, B.gold); sw.box(x + 3, y + 3, z + 1, x + 3, y + 3, z + 3, B.gold); w.box(x - 1, y + 3, z + 2, x + 2, y + 9, z + 2, B.whiteDk);
        return y + 16;
      };
      let sTop = 0;
      for (const z of [76, 98, 120]) for (const x of [65, 110]) sTop = Math.max(sTop, statue(x, z));
      landmarks.push({ name: '선왕들의 석상', note: '여섯 왕이 광장을 지킨다', p: [66, sTop + 4, 98.5] });
      // 쌍분수: 이단 물받이와 금빛 물꼭지
      const FZ = 100;
      for (const FX of [34, 142]) {
        for (let z = FZ - 12; z <= FZ + 12; z++) for (let x = FX - 12; x <= FX + 12; x++) {
          const d = MH.dist(x, z, FX, FZ);
          if (d > 11.6) continue;
          if (d > 10.4) { MH.paint(w, x, z, B.whiteDk); continue; }
          if (d > 9) { w.set(x, P + 1, z, B.white); w.set(x, P + 2, z, B.trim); continue; }
          MH.setH(w, x, z, P - 2, B.whiteDk, B.found); w.liquid(x, z, P);
        }
        w.cyl(FX, FZ, P - 1, P + 5, 1.6, B.white); w.cyl(FX, FZ, P + 6, P + 6, 4.6, B.white); w.ring(FX, FZ, P + 7, 3.6, 4.6, B.trim); w.cyl(FX, FZ, P + 7, P + 7, 3.6, B.waterB);
        w.cyl(FX, FZ, P + 8, P + 10, 1, B.white); w.cyl(FX, FZ, P + 11, P + 11, 2.6, B.white); w.ring(FX, FZ, P + 12, 1.8, 2.6, B.gold); w.cyl(FX, FZ, P + 12, P + 12, 1.8, B.waterB);
        w.box(FX, P + 13, FZ, FX, P + 15, FZ, B.white); w.box(FX, P + 16, FZ, FX, P + 17, FZ, B.gold);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { w.set(FX + dx * 10, P + 3, FZ + dz * 10, B.gold); w.set(FX + dx * 5, P + 6, FZ + dz * 5, B.gold); }
        for (const [dx, dz] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) { const bx = FX + dx * 9, bz = FZ + dz * 9; w.box(bx, P + 1, bz, bx, P + 4, bz, B.trim); w.set(bx, P + 5, bz, B.gold); }
      }
      acts.push({
        name: '쌍분수', hint: '양쪽 분수가 함께 솟구쳐요', hit: [26, P + 1, 92, 42, P + 17, 108],
        run: async a => { for (let k = 0; k < 8; k++) { for (const FX of [34, 142]) a.burst([FX + 0.5, P + 17, FZ + 0.5], { n: 40, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 5, up: 13, life: 1.9, gravity: 12, spread: 1 }); await a.wait(0.32); } },
      });
      landmarks.push({ name: '쌍분수', note: '광장 양쪽의 이단 분수', p: [34.5, P + 24, FZ + 0.5] });
      // 등불 오벨리스크(옛 깃대 자리)
      for (const [fx, fz] of [[50, 68], [126, 68], [50, 142], [126, 142]]) {
        w.box(fx - 1, P + 1, fz - 1, fx + 1, P + 2, fz + 1, B.whiteDk); w.box(fx - 1, P + 3, fz - 1, fx + 1, P + 3, fz + 1, B.trim);
        w.box(fx, P + 4, fz, fx, P + 22, fz, B.white); w.set(fx, P + 12, fz, B.gold); w.set(fx, P + 23, fz, B.gold); w.set(fx, P + 24, fz, B.gold);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { w.set(fx + dx, P + 18, fz + dz, B.iron); w.set(fx + dx, P + 17, fz + dz, B.lampG); }
        lights.push({ p: [fx + 0.5, P + 17, fz + 0.5], c: '#ffe0a0', i: 1.1, d: 18, flicker: 0.05, night: true });
      }
      // 양쪽 기둥 회랑: 뒷벽·벤치·옥상 난간
      for (const cx of [10, 166]) {
        const out = cx < MIDX ? -1 : 1, bx = cx + out * 4;
        w.box(bx, P + 1, 66, bx, P + 15, 144, B.whiteDk);
        for (let z = 70; z <= 140; z += 6) { w.box(bx + out, P + 1, z - 2, bx + out, P + 13, z - 2, B.white); w.box(bx + out, P + 5, z + 1, bx + out, P + 9, z + 1, B.win); w.set(bx + out, P + 10, z + 1, B.trim); }
        w.box(bx + out, P + 14, 66, bx + out, P + 14, 144, B.trim);
        for (let z = 70; z <= 140; z += 10) { w.box(bx - out, P + 4, z, bx - out, P + 9, z + 1, B.carpet); w.box(bx - out, P + 10, z, bx - out, P + 10, z + 1, B.gold); }
        for (let z = 66; z <= 144; z++) for (let x = Math.min(cx, bx); x <= Math.max(cx, bx); x++) MH.paint(w, x, z, B.slab);
        for (let z = 68; z <= 142; z += 6) {
          w.box(cx - 1, P + 1, z - 1, cx + 1, P + 1, z + 1, B.whiteDk); w.box(cx, P + 2, z, cx, P + 12, z, B.white); w.box(cx - 1, P + 13, z - 1, cx + 1, P + 13, z + 1, B.trim);
          if (z % 12 === 8) { w.set(cx - out, P + 10, z, B.lampG); w.set(cx - out, P + 11, z, B.iron); lights.push({ p: [cx - out + 0.5, P + 10, z + 0.5], c: '#ffd890', i: 1, d: 14, flicker: 0.05, night: true }); }
          else if (z < 140) { w.box(cx - out * 2, P + 1, z + 2, cx - out * 2, P + 1, z + 4, B.wood); w.box(cx - out * 3, P + 1, z + 2, cx - out * 3, P + 2, z + 4, B.wood); }
        }
        w.box(Math.min(cx, bx) - 1, P + 14, 65, Math.max(cx, bx) + 1, P + 15, 145, B.white); w.box(Math.min(cx, bx) - 2, P + 16, 64, Math.max(cx, bx) + 2, P + 16, 146, B.whiteDk);
        for (let z = 64; z <= 146; z++) if (z % 3 === 0) w.set(cx - out * 1, P + 17, z, B.trim); else w.set(cx - out, P + 18, z, B.trim);
        for (let z = 64; z <= 146; z += 3) w.set(cx - out, P + 18, z, B.trim);
      }
      // 길가 쌍등
      for (const [lx, lz] of [[74, 66], [102, 66], [74, 108], [102, 108], [74, 146], [102, 146]]) {
        const p = MH.lamp(w, lx, lz, { m: { post: B.iron, glow: B.lampG, found: B.whiteDk }, h: 8, dir: 'x' });
        w.set(lx - 1, P + 8, lz, B.iron); w.set(lx - 1, P + 7, lz, B.lampG); w.set(lx, P + 10, lz, B.gold);
        lights.push({ p, c: '#ffe0a0', i: 1, d: 16, flicker: 0.05, night: true });
      }
      // 화단 나무
      for (const [tx, tz] of [[24, 72], [152, 72], [24, 132], [152, 132]]) {
        w.walls(tx - 4, P + 1, tz - 4, tx + 4, P + 1, tz + 4, B.whiteDk); w.walls(tx - 4, P + 2, tz - 4, tx + 4, P + 2, tz + 4, B.trim);
        w.box(tx - 3, P + 1, tz - 3, tx + 3, P + 1, tz + 3, B.grass);
        for (let k = 0; k < 10; k++) { const fx = tx - 3 + ((k * 5) % 7), fz = tz - 3 + ((k * 3) % 7); if (Math.abs(fx - tx) > 1 || Math.abs(fz - tz) > 1) w.set(fx, P + 2, fz, [B.flowerR, B.flowerY, B.flowerW, B.flowerP][k % 4]); }
        MH.tree(w, tx, P + 2, tz, { kind: 'oak', h: 10, bark: B.bark, leaves: [B.leaf2, B.leaf, B.leafDk], r: 4.6 });
      }
      // 성문 탑의 봉화(축포)
      acts.push({
        name: '축포', hint: '성문 쌍탑 위로 축포가 터져요', hit: [61, CG + 30, 38, 115, CG + 56, 56],
        run: async a => {
          const sets = [['#6ab0ff', '#ffffff'], ['#ffe060', '#fff4c0'], ['#ffffff', '#c8d4ee']];
          for (let k = 0; k < 6; k++) {
            const tx = k % 2 ? 106 : 70, top = towerTops[k % 2];
            a.burst([tx + 0.5, top, 47.5], { n: 10, colors: ['#ffe8a0'], speed: 0.5, up: 18, life: 0.9, gravity: 4, spread: 0.3 });
            await a.wait(0.7);
            a.burst([tx + (k - 2.5) * 3, top + 18, 49], { n: 100, colors: sets[k % 3], speed: 17, up: 2, life: 1.6, gravity: 2.5, spread: 1 });
            await a.wait(0.3);
          }
        },
      });
      // ── 선왕의 검: 여섯 석상이 금빛 검을 들어 올린다 ──
      acts.push({
        name: '선왕의 검', hint: '여섯 석상이 금빛 검을 일제히 들어 올리자 왕관이 반짝여요', hit: [63, P + 7, 74, 69, P + 22, 79],
        run: async a => {
          for (let k = 0; k < 6; k++) { a.move('sword' + k, [0, 5, 0], 1.2); await a.wait(0.25); }
          await a.wait(1);
          for (let q = 0; q < 3; q++) { swords.forEach(([x, y, z]) => { a.burst([x + 1, y + 15, z + 1], { n: 12, colors: ['#ffe060', '#ffffff', '#fff4c0'], speed: 3, up: 3, life: 1.2, gravity: 1, spread: 1 }); a.burst([x + 3.5, y + 18, z + 2.5], { n: 6, colors: ['#ffffff', '#ffe8a0'], speed: 2, up: 2, life: 0.8, gravity: 0, spread: 0.5 }); }); await a.wait(0.6); }
          await Promise.all(swords.map((s, k) => a.move('sword' + k, [0, 0, 0], 1.4)));
        },
      });
      // ── 성문 화로(부품): 불꽃이 확 일어난다 ──
      const braz = [[78, 70], [98, 70], [78, 90], [98, 90]];
      braz.forEach(([bx, bz], k) => {
        w.box(bx - 1, P + 1, bz - 1, bx + 1, P + 1, bz + 1, B.whiteDk); w.box(bx, P + 2, bz, bx, P + 4, bz, B.iron);
        for (const [dx, dz] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) w.set(bx + dx, P + 2, bz + dz, B.iron);
        w.ring(bx, bz, P + 5, 0.9, 2.2, B.iron); w.ring(bx, bz, P + 6, 1.4, 2.2, B.gold); w.set(bx, P + 5, bz, B.iron);
        const f = w.prop({ name: 'fire' + k, pivot: [bx + 0.5, P + 6, bz + 0.5], scl0: [0.3, 0.2, 0.3] });
        f.box(bx - 1, P + 6, bz, bx + 1, P + 6, bz, B.fire2); f.box(bx, P + 6, bz - 1, bx, P + 6, bz + 1, B.fire2); f.box(bx, P + 6, bz - 1, bx, P + 8, bz + 1, B.fire); f.box(bx - 1, P + 7, bz, bx + 1, P + 7, bz, B.fire); f.set(bx, P + 9, bz, B.fire);
        if (k < 2) lights.push({ name: 'brazier', p: [bx + 0.5, P + 8, bz + 0.5], c: '#ff9a40', i: 1.4, d: 20, flicker: 0.35 });
      });
      acts.push({
        name: '성문 화로', hint: '도개교 앞 네 화로에 불길이 확 치솟고 불티가 날려요', hit: [76, P + 1, 68, 80, P + 9, 72],
        run: async a => {
          a.flash('brazier', 3.5, 5); a.glow(1.8, 5);
          await Promise.all(braz.map((b, k) => a.tween('fire' + k, { scl: [1.2, 1.6, 1.2] }, 0.6)));
          for (let q = 0; q < 8; q++) { braz.forEach(([bx, bz]) => a.burst([bx + 0.5, P + 9, bz + 0.5], { n: 10, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], speed: 2, up: 6, life: 1.2, gravity: -1, spread: 1 })); await a.wait(0.45); }
          await Promise.all(braz.map((b, k) => a.tween('fire' + k, { scl: [0.3, 0.2, 0.3] }, 1.4)));
        },
      });
      // ── 왕실 마차(부품): 성문 앞에서 출발해 푸른 융단 길을 따라 개선문을 지나 왕도로 떠난다 ──
      const MZ = 84, my = P + 1;
      const coach = w.prop({ name: 'coach', pivot: [MIDX + 0.5, my, MZ + 0.5] });
      coach.box(86, my + 2, MZ - 3, 90, my + 6, MZ + 3, B.coach); coach.box(86, my + 7, MZ - 3, 90, my + 7, MZ + 3, B.gold); coach.box(87, my + 8, MZ - 2, 89, my + 8, MZ + 2, B.coach); coach.set(88, my + 9, MZ, B.gold);
      for (const x of [86, 90]) { coach.box(x, my + 4, MZ - 1, x, my + 5, MZ + 1, B.glass); coach.box(x, my + 2, MZ - 3, x, my + 2, MZ + 3, B.gold); }
      for (const x of [85, 91]) for (const z of [MZ - 2, MZ + 2]) { coach.box(x, my, z - 1, x, my + 2, z + 1, B.iron); coach.set(x, my + 1, z, B.gold); }
      coach.box(88, my + 2, MZ + 4, 88, my + 2, MZ + 6, B.wood); coach.box(87, my + 2, MZ + 6, 89, my + 2, MZ + 6, B.wood);
      for (const [x, z] of [[86, MZ - 3], [90, MZ - 3], [86, MZ + 3], [90, MZ + 3]]) coach.set(x, my + 8, z, B.gold);
      acts.push({
        name: '왕실 마차', hint: '성문 앞에 선 금장 왕실 마차가 푸른 융단 길을 따라 개선문을 지나 왕도로 떠나요', hit: [85, my, MZ - 3, 91, my + 9, MZ + 6],
        run: async a => {
          const dust = async (z0, dz) => { for (let k = 0; k < 10; k++) { a.burst([MIDX + 0.5, my + 0.5, z0 + dz * k], { n: 10, colors: ['#c8d4ee', '#d8d4ca'], speed: 2, up: 1, life: 0.8, gravity: 2, spread: 3, flat: true }); await a.wait(0.5); } };
          for (let k = 0; k < 3; k++) { a.burst([MIDX + 0.5, P + 20, MZ - 4], { n: 44, colors: ['#ffffff', '#ffd0e0', '#ffe060'], speed: 6, up: 4, life: 2, gravity: 2, spread: 4 }); await a.wait(0.4); }
          await Promise.all([a.drive('coach', [[0, 0, 20], [0, 0, 44], [0, 0, 68], [0, 0, 88], [0, 0, 112]], 8, { fwd: '+z', back: 1.0 }), dust(MZ + 4, 8)]);
        },
      });
      // ── 해자 물고기(부품): 금붕어들이 물 위로 뛰어오른다 ──
      const fish = [[36, 55], [50, 57], [124, 55], [138, 57]];
      fish.forEach(([fx, fz], k) => {
        const f = w.prop({ name: 'fish' + k, pivot: [fx + 1, WL - 1, fz + 0.5] });
        f.box(fx, WL - 1, fz, fx + 1, WL - 1, fz, k % 2 ? B.fishW : B.fishO); f.set(fx + 2, WL - 1, fz, B.fishO); f.set(fx - 1, WL - 1, fz, B.fishO); f.set(fx - 1, WL, fz, B.fishO);
      });
      acts.push({
        name: '해자 물고기', hint: '해자의 금붕어들이 물 위로 펄쩍펄쩍 뛰어오르며 해자를 따라 헤엄쳐 가요', hit: [34, WL - 1, 53, 52, WL + 3, 59],
        run: async a => {
          const splash = (x, z) => a.burst([x, WL + 1, z], { n: 14, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 2.5, up: 3, life: 0.8, gravity: 9, spread: 1 });
          await Promise.all(fish.map(async ([fx, fz], k) => {
            await a.wait(0.3 + k * 0.35);
            const dir = 1, edge = W - fx + 10;
            splash(fx + 1, fz + 0.5);
            const hops = [];
            let nh = 0; while (nh < 4) { const xe = fx + 10 * (nh + 1); if (xe <= 80 || (xe >= 100 && xe <= 154)) nh++; else break; } for (let j = 0; j < nh; j++) { const o = dir * 10 * j; hops.push([o + dir * 2, 4, 0], [o + dir * 4, 6, 0], [o + dir * 6, 4, 0], [o + dir * 8, 0.5, 0], [o + dir * 10, 0, 0]); }
            const sp = (async () => { for (let j = 0; j < nh; j++) { await a.wait(1.2); splash(fx + 1 + dir * (10 * j + 8), fz + 0.5); } })();
            await Promise.all([a.drive('fish' + k, [...hops, [edge, 0, 0]], 1.6 * nh + 7, { fwd: '+x', back: 1.0 }), sp]);
          }));
        },
      });

      // ── 새 구역: 개선문과 꽃시장 거리(광장 남쪽 끝) ──
      const AZ0 = 156, AZ1 = 163, AX0 = 66, AX1 = 110, AT = P + 30;
      w.box(AX0, P + 1, AZ0, AX1, AT, AZ1, B.white);
      const arch = (x0, x1, top) => {
        const mid = (x0 + x1) / 2, hw = (x1 - x0) / 2 + 0.5;
        for (let x = x0; x <= x1; x++) {
          const t = top - Math.round(Math.pow(Math.abs(x - mid) / hw, 2) * 4);
          w.box(x, P + 1, AZ0, x, t, AZ1, 0);
          for (const z of [AZ0, AZ1]) { w.set(x, t + 1, z, (x & 1) ? B.gold : B.trim); }
        }
        for (const z of [AZ0, AZ1]) { w.box(x0 - 1, P + 1, z, x0 - 1, top - 4, z, B.trim); w.box(x1 + 1, P + 1, z, x1 + 1, top - 4, z, B.trim); }
      };
      arch(GX0, GX1, P + 19); arch(70, 76, P + 11); arch(100, 106, P + 11);
      for (let z = AZ0; z <= AZ1; z++) for (let x = GX0 - 1; x <= GX1 + 1; x++) MH.paint(w, x, z, x === GX0 - 1 || x === GX1 + 1 ? B.goldP : B.carpet);
      // 기둥(앞뒤 면), 띠, 처마돌림, 비문 띠
      for (const z of [AZ0 - 1, AZ1 + 1]) {
        for (const cx of [AX0 + 1, 79, 97, AX1 - 1]) { w.box(cx - 1, P + 1, z, cx + 1, P + 2, z, B.whiteDk); w.box(cx, P + 3, z, cx, P + 22, z, B.trim); w.box(cx - 1, P + 23, z, cx + 1, P + 23, z, B.gold); }
        w.box(AX0, P + 24, z, AX1, P + 24, z, B.whiteDk);
        for (let x = AX0; x <= AX1; x++) w.set(x, AT, z, (x & 1) ? B.trim : B.whiteDk);
        for (let x = 72; x <= 104; x++) if (x % 3) w.set(x, P + 27, z, B.gold);
        for (const [mx, my2] of [[72, P + 16], [104, P + 16]]) { w.box(mx - 2, my2, z, mx + 2, my2 + 4, z, B.whiteDk); w.box(mx - 1, my2 + 1, z + (z > AZ1 ? 1 : -1), mx + 1, my2 + 3, z + (z > AZ1 ? 1 : -1), B.gold); }
      }
      w.box(AX0 - 1, AT + 1, AZ0 - 1, AX1 + 1, AT + 1, AZ1 + 1, B.whiteDk);
      for (let x = AX0 - 1; x <= AX1 + 1; x += 2) for (const z of [AZ0 - 1, AZ1 + 1]) w.set(x, AT + 2, z, B.trim);
      for (let z = AZ0 - 1; z <= AZ1 + 1; z += 2) for (const x of [AX0 - 1, AX1 + 1]) w.set(x, AT + 2, z, B.trim);
      // 개선문 위 종루와 종(부품)
      const BT = AT + 2, BCX = MIDX, BCZ = 159;
      for (const [px, pz] of [[BCX - 4, BCZ - 3], [BCX + 4, BCZ - 3], [BCX - 4, BCZ + 3], [BCX + 4, BCZ + 3]]) w.box(px, BT, pz, px, BT + 9, pz, B.white);
      w.box(BCX - 5, BT, BCZ - 4, BCX + 5, BT, BCZ + 4, B.whiteDk);
      w.box(BCX - 5, BT + 10, BCZ - 4, BCX + 5, BT + 10, BCZ + 4, B.trim);
      const bPeak = MH.pyramid(w, BCX - 6, BCZ - 5, BCX + 6, BCZ + 5, BT + 11, B.roofB, 1, B.eave);
      w.box(BCX, bPeak, BCZ, BCX, bPeak + 3, BCZ, B.gold); w.box(BCX - 1, bPeak + 2, BCZ, BCX + 1, bPeak + 2, BCZ, B.gold);
      w.box(BCX - 3, BT + 9, BCZ, BCX + 3, BT + 9, BCZ, B.wood);
      const bell = w.prop({ name: 'bell', pivot: [BCX + 0.5, BT + 9, BCZ + 0.5], axis: 'z' });
      bell.box(BCX, BT + 8, BCZ, BCX, BT + 8, BCZ, B.bronze);
      for (let y = BT + 3; y <= BT + 7; y++) { const r = y <= BT + 4 ? 2 : y <= BT + 6 ? 1.5 : 1; bell.cyl(BCX, BCZ, y, y, r, B.bronze); }
      bell.ring(BCX, BCZ, BT + 3, 1.6, 2.4, B.gold); bell.set(BCX, BT + 2, BCZ, B.gold);
      lights.push({ name: 'archbell', p: [BCX + 0.5, BT + 1, BCZ + 0.5], c: '#ffe8a0', i: 0.2, d: 26, flicker: 0, srcR: 6 });
      w.set(BCX, BT + 1, BCZ - 4, B.lampG); w.set(BCX, BT + 1, BCZ + 4, B.lampG);
      landmarks.push({ name: '개선문', note: '광장 남쪽 입구의 세 갈래 아치와 종루', p: [MIDX + 0.5, bPeak + 6, 159.5], tag: 'ARCH' });
      acts.push({
        name: '개선문 종', hint: '개선문 종루의 큰 종이 크게 흔들리며 꽃잎이 거리 위로 쏟아져요', hit: [BCX - 4, BT + 1, BCZ - 3, BCX + 4, BT + 9, BCZ + 3],
        run: async a => {
          a.flash('archbell', 8, 4);
          const petals = async () => { for (let k = 0; k < 10; k++) { for (const dx of [-16, 0, 16]) a.burst([BCX + 0.5 + dx, AT + 4, BCZ + 6], { n: 18, colors: ['#ffc0d8', '#ffffff', '#ffe060', '#f08ab8'], speed: 4, up: 3, life: 2.6, gravity: 1.2, spread: 3 }); await a.wait(0.35); } };
          const swing = async () => { for (const amp of [0.7, 0.55, 0.4, 0.25]) { await a.turn('bell', [0, 0, amp], 0.45); a.burst([BCX + 0.5, BT + 3, BCZ + 0.5], { n: 8, colors: ['#ffe8a0', '#ffffff'], speed: 5, up: 1, life: 0.6, gravity: 0, spread: 1 }); await a.turn('bell', [0, 0, -amp], 0.45); } await a.turn('bell', [0, 0, 0], 0.4); };
          await Promise.all([swing(), petals()]);
        },
      });
      // 화단 띠(광장과 거리 사이)
      for (const [x0, x1] of [[4, 62], [114, 172]]) {
        for (let x = x0; x <= x1; x++) {
          w.set(x, P + 1, 152, B.whiteDk); w.set(x, P + 1, 154, B.whiteDk); w.set(x, P + 1, 153, B.soil);
          if (x === x0 || x === x1) w.box(x, P + 1, 152, x, P + 1, 154, B.whiteDk);
          else w.set(x, P + 2, 153, [B.flowerR, B.flowerP, B.flowerY, B.flowerW, B.flowerV, B.flowerB][(x * 7 + (x >> 2)) % 6]);
          if (x % 8 === 4) MH.bush(w, x, P + 1, 153, 1.4, [B.hedge, B.leaf, B.leafDk]);
        }
      }
      // 꽃 노점
      const awn = [[B.awnR, B.awnW], [B.awnB, B.awnW], [B.awnY, B.awnW], [B.flowerP, B.awnW]];
      const flw = [B.flowerR, B.flowerP, B.flowerY, B.flowerW, B.flowerV, B.flowerB, B.flowerO];
      const stalls = [];
      [10, 22, 34, 46, 120, 132, 144, 156].forEach((sx, k) => {
        const top = MH.stall(w, sx, 165, { sx: 8, sz: 4, m: { post: B.wood, counter: B.plank, goods: [flw[k % 7], flw[(k + 2) % 7], B.leaf2, flw[(k + 4) % 7]], crate: B.crate, a1: awn[k % 4][0], a2: awn[k % 4][1] } });
        stalls.push([sx, top]);
        for (let dx = 0; dx < 8; dx += 2) { w.set(sx + dx, P + 1, 170, B.bucket); w.set(sx + dx, P + 2, 170, flw[(k + dx) % 7]); if (dx % 4 === 0) w.set(sx + dx, P + 3, 170, B.leaf2); }
        if (k % 2 === 0) lights.push({ p: [sx + 4.5, top - 2, 164.5], c: '#ffd890', i: 0.8, d: 12, flicker: 0.1, night: true });
        if (k % 2 === 0) w.set(sx + 4, top - 2, 164, B.lampG);
      });
      // 거리 등불과 화분
      for (const lx of [64, 112]) { const p = MH.lamp(w, lx, 168, { m: { post: B.iron, glow: B.lampG, found: B.whiteDk }, h: 7 }); lights.push({ p, c: '#ffe0a0', i: 1, d: 14, flicker: 0.05, night: true }); }
      for (const [px, pz] of [[62, 158], [114, 158], [62, 162], [114, 162]]) { w.box(px - 1, P + 1, pz - 1, px + 1, P + 1, pz + 1, B.whiteDk); w.set(px, P + 2, pz, B.soil); MH.bush(w, px, P + 2, pz, 1.6, [B.leaf2, B.leaf, B.flowerP]); }
      landmarks.push({ name: '꽃시장 거리', note: '개선문 양옆으로 늘어선 꽃 노점', p: [28, P + 14, 168] });
      // 꽃수레(부품): 거리 서쪽 끝에서 동쪽 끝까지 굴러간다
      const CX = 22, CZ = 173, cy = P + 1;
      const cart = w.prop({ name: 'cart', pivot: [CX + 2.5, cy, CZ + 0.5] });
      cart.box(CX, cy + 1, CZ - 1, CX + 5, cy + 1, CZ + 1, B.plank); cart.box(CX, cy + 2, CZ - 1, CX + 5, cy + 2, CZ - 1, B.wood); cart.box(CX, cy + 2, CZ + 1, CX + 5, cy + 2, CZ + 1, B.wood);
      cart.box(CX, cy + 2, CZ, CX, cy + 2, CZ, B.wood); cart.box(CX + 5, cy + 2, CZ, CX + 5, cy + 2, CZ, B.wood);
      for (let x = CX + 1; x <= CX + 4; x++) for (let z = CZ - 1; z <= CZ + 1; z++) cart.set(x, cy + 3 + ((x + z) & 1), z, flw[(x * 3 + z) % 7]);
      cart.set(CX + 2, cy + 5, CZ, B.flowerP); cart.set(CX + 3, cy + 5, CZ, B.flowerY);
      for (const x of [CX + 1, CX + 4]) for (const z of [CZ - 2, CZ + 2]) { cart.set(x, cy, z, B.iron); cart.set(x, cy + 1, z, B.iron); }
      cart.box(CX + 6, cy + 2, CZ, CX + 8, cy + 2, CZ, B.wood); cart.box(CX + 8, cy + 2, CZ - 1, CX + 8, cy + 2, CZ + 1, B.wood);
      acts.push({
        name: '꽃수레', hint: '꽃을 가득 실은 수레가 꽃시장 거리를 따라 동쪽 끝까지 꽃잎을 흩뿌리며 굴러가요', hit: [CX, cy, CZ - 2, CX + 8, cy + 5, CZ + 2],
        run: async a => {
          const trail = async (x0, dx) => { for (let k = 0; k < 13; k++) { a.burst([x0 + dx * k, cy + 5, CZ + 0.5], { n: 10, colors: ['#ffc0d8', '#ffe060', '#ffffff', '#a06ad8'], speed: 2, up: 3, life: 1.6, gravity: 2, spread: 1.5 }); await a.wait(0.5); } };
          await Promise.all([a.drive('cart', [[15, 0, 0], [30, 0, 0], [45, 0, 0], [60, 0, 0], [75, 0, 0], [90, 0, 0], [105, 0, 0], [120, 0, 0], [W - CX + 12, 0, 0]], 8.5, { fwd: '+x', back: 1.0 }), trail(CX + 3, 10)]);
        },
      });
      // ── 광장 비둘기 떼(부품) ──
      const doves = [[60, 88], [62, 92], [114, 86], [117, 90], [44, 120], [132, 118], [58, 132], [120, 136], [74, 126], [102, 96]];
      doves.forEach(([dx, dz], k) => {
        const g = MH.g(w, dx, dz) + 1;
        const d = w.prop({ name: 'dove' + k, pivot: [dx + 0.5, g, dz + 0.5] });
        d.box(dx, g, dz, dx + 1, g, dz, k % 3 ? B.pigeon : B.pigeonW); d.set(dx + 1, g + 1, dz, B.pigeonN); d.set(dx - 1, g, dz, B.pigeon);
        d.set(dx, g, dz - 1, B.pigeonW); d.set(dx, g, dz + 1, B.pigeonW);
      });
      acts.push({
        name: '비둘기 떼', hint: '광장의 비둘기들이 한꺼번에 날아올라 광장 위를 한 바퀴 돈 뒤 성 너머로 날아가요', hit: [56, P + 1, 84, 66, P + 4, 96],
        run: async a => {
          await Promise.all(doves.map(async ([dx, dz], k) => {
            await a.wait(k * 0.12);
            const g = P + 1;
            a.burst([dx + 0.5, g + 1, dz + 0.5], { n: 6, colors: ['#e8eaf0', '#9aa0b0'], speed: 2, up: 2, life: 0.8, gravity: 2, spread: 0.6 });
            const pts = [];
            for (let i = 0; i <= 16; i++) {
              const t = i / 16 * Math.PI * 2 + k * 0.6, r = 26 + (k % 3) * 4;
              const tx = MIDX + Math.cos(t) * r, tz = 92 + Math.sin(t) * r * 0.9;
              pts.push([tx - dx, 30 + (k % 4) * 3 + Math.sin(i * 0.9) * 2, tz - dz]);
            }
            const ex = -30 - k * 3, ez = -40 - (k % 3) * 6;
            await a.drive('dove' + k, [[1, 8, 0], ...pts, [MIDX - 20 - dx, 44, 40 - dz], [ex - dx, 50, ez - dz]], 9, { fwd: '+x', back: 1.0 });
          }));
        },
      });
      return { lights, landmarks, acts };
    },
  }));
})();
