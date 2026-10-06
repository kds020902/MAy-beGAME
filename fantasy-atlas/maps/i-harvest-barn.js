// 붉은 헛간(하위 지도) — 황금들녘 동쪽 언덕의 큰 곡식 창고. 서쪽 두 쪽 큰 문, 가운데 널마루 탈곡 마당,
// 북쪽 벽 아래 곡식 칸막이와 마구간, 그 위 건초 다락(계단 · 도르래), 남쪽 수레와 곡물 자루. 남·동쪽 벽은 잘라 낮췄다 (64칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 64, D = 64, Hh = 48, G = 10;
  MAPS.push({
    id: 'harvest-barn', cat: 'village', sub: true, parent: 'harvest', name: '붉은 헛간', en: 'Harvest Hollow · Red Barn', color: '#a83a2a', seed: 1511, base: G, time: 'day', size: [W, D, Hh],
    desc: '황금들녘 사람들이 겨울 곡식을 쌓아 두는 붉은 헛간. 서쪽 큰 문을 열면 널마루 탈곡 마당에 도리깨 소리가 울리고, 북쪽 벽 아래로 밀이 그득한 곡식 칸막이와 말 칸이 늘어서 있다. 계단을 오르면 건초 다락, 다락 끝 도르래가 곡물 자루를 끌어 올린다.',
    info: { title: '장소 정보', en: 'RED BARN', rows: [['쓰임', '겨울 곡식 창고 · 탈곡 마당'], ['아래층', '곡식 칸막이 · 말 칸 · 마구 걸이'], ['다락', '건초 더미 · 도르래 · 건초 미끄럼틀']] },
    sky: ['#fbd29a', '#c88a5a', '#ffe4a8'], stars: false,
    hemi: ['#ffe8c8', '#5a3a20', 0.62], sun: ['#ffd0a0', 0.72, [0.6, 0.9, 0.45]],
    night: { sky: ['#2a2238', '#0c0a16', '#c88a48'], stars: true, hemi: ['#b0a8c8', '#1a1410', 0.42], sun: ['#c8d0ff', 0.3, [0.6, 0.9, 0.45]], haze: '#2a2230' },
    liquid: ['#3a5a6a', '#5a8a9a', '#e8f4f0'], liqSpeed: 0.3,
    fog: { start: 0.92, floor: G - 12, depth: 6, haze: [6, 0.12, 6], hazeColor: '#f0c890' },
    camY: 2, zoom: 1.8,
    particles: [
      { n: 90, colors: ['#fff0c8', '#f0d890', '#ffffff'], mode: 'drift', speed: 0.12, wind: 0.1, area: [32, 32, 16], y0: G + 1, y1: G + 12, glow: true },
      { n: 40, colors: ['#dcb456', '#e0c070', '#c8a860'], mode: 'fall', speed: 0.18, wind: 0.2, area: [30, 22, 9], y0: G + 6, y1: G + 12, glow: false },
    ],
    blocks: {
      grass: { c: '#6a4a30', top: '#9aa04a', v: 0.09 }, grass2: { c: '#6a4a30', top: '#b0a048', v: 0.09 }, dirt: { c: '#6a4a30', v: 0.08 }, rock: { c: '#7a7068', v: 0.06, pat: 'stone' },
      earth: { c: '#6a4a30', top: '#8a6a44', v: 0.1 }, strawF: { c: '#6a4a30', top: '#c8a860', v: 0.12 }, path: { c: '#6a4a30', top: '#c8a878', v: 0.1 },
      thresh: { c: '#8a6a40', top: '#b08a5a', v: 0.05, pat: 'plank' }, loftF: { c: '#7a5a3a', top: '#9a7448', v: 0.05, pat: 'plank' },
      barnR: { c: '#a83a2a', v: 0.05, pat: 'plank' }, barnRd: { c: '#8a2e22', v: 0.05, pat: 'plank' }, barnW: { c: '#e8e0d0', v: 0.03 }, found: { c: '#8a8070', v: 0.05, pat: 'stone' },
      door: { c: '#4a2e1c', v: 0.03, pat: 'plank' }, win: { c: '#ffd890', night: true, day: '#a8c8d0' },
      hay: { c: '#dcb456', v: 0.08 }, hay2: { c: '#c8a048', v: 0.08 }, wheat: { c: '#e0bc50', v: 0.1 }, sack: { c: '#d8c8a0', v: 0.05 }, sack2: { c: '#c8b48a', v: 0.05 },
      log: { c: '#5a3a24', v: 0.06, pat: 'log' }, cart: { c: '#8a6a40', v: 0.08, pat: 'plank' }, crate: { c: '#9a7448', v: 0.06, pat: 'plank' },
      pumpkin: { c: '#e8801a', v: 0.07 }, stem: { c: '#4a7a2a', v: 0.06 }, apple: { c: '#c8302a', v: 0.05 }, iron: { c: '#3a3a40', v: 0.03 }, rope: { c: '#b8a080', v: 0.04 },
      leather: { c: '#6a3a24', v: 0.05 }, horse: { c: '#7a4a2a', v: 0.05 }, horseL: { c: '#e8dcc8', v: 0.03 }, mane: { c: '#2a1a12', v: 0.04 }, eye: { c: '#141010', v: 0 },
      water: { c: '#5a8aa8', v: 0.04 }, lamp: { c: '#ffd890', glow: true }, leafY: { c: '#e8b83a', v: 0.1 }, leafO: { c: '#e08a2a', v: 0.1 }, bark: { c: '#5a3a24', v: 0.06 },
    },
    build(w) {
      const B = w.id;
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const X0 = 14, X1 = 49, Z0 = 18, Z1 = 45, TOP = G + 13, LY = G + 6;     // 벽 선, 벽 높이, 다락 바닥
      const DZ0 = 28, DZ1 = 33;                                             // 서쪽 큰 문
      const inR = (x, z) => x > X0 && x < X1 && z > Z0 && z < Z1;
      MH.terrain(w, { floor: G - 6, height: () => G, surface: (x, z) => hash3(x, 1, z) > 0.7 ? B.grass2 : B.grass, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];

      // ── 바닥: 흙바닥에 흩어진 짚, 가운데 널마루 탈곡 마당, 바깥은 풀밭과 문 앞 흙길 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) S(x, G, z, hash3(x, 3, z) > 0.62 ? B.strawF : B.earth);
      const TX0 = 28, TX1 = 40, TZ0 = 30, TZ1 = 39;
      for (let z = TZ0; z <= TZ1; z++) for (let x = TX0; x <= TX1; x++) S(x, G, z, (x === TX0 || x === TX1 || z === TZ0 || z === TZ1) ? B.cart : B.thresh);
      for (let z = DZ0 - 1; z <= DZ1 + 1; z++) for (let x = 2; x < X0; x++) S(x, G, z, hash3(x, 4, z) > 0.75 ? B.grass : B.path);

      // ── 벽: 북·서는 높고(붉은 널판, 흰 테두리, 높은 창), 동·남은 잘라 낮췄다 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (inR(x, z)) continue;
        const low = x === X1 || z === Z1, corner = (x === X0 || x === X1) && (z === Z0 || z === Z1);
        const a = (x === X0 || x === X1) ? z : x;
        if (low) {
          const post = corner || a % 6 === 0;
          for (let y = G + 1; y <= G + (post ? 3 : 2); y++) S(x, y, z, post || y === G + 2 ? B.barnW : B.barnR);
          continue;
        }
        for (let y = G + 1; y <= TOP; y++) {
          let b = (y === TOP || y === LY || corner || a % 6 === 0) ? B.barnW : ((y + a) % 7 === 0 ? B.barnRd : B.barnR);
          if (y === G + 1) b = B.found;
          S(x, y, z, b);
        }
      }
      // 북쪽 높은 창(다락 위)과 서쪽 창
      for (const x of [21, 27, 33, 39, 45]) w.box(x, G + 9, Z0, x + 1, G + 11, Z0, B.win);
      for (const z of [22, 40]) w.box(X0, G + 3, z, X0, G + 4, z + 1, B.win);
      // 서쪽 큰 문: 문틀, 바깥으로 활짝 연 두 쪽 문(흰 X 버팀)
      w.box(X0, G + 1, DZ0, X0, G + 8, DZ1, 0);
      w.box(X0, G + 9, DZ0 - 1, X0, G + 9, DZ1 + 1, B.barnW);
      for (const z of [DZ0 - 1, DZ1 + 1]) w.box(X0, G + 1, z, X0, G + 9, z, B.barnW);
      for (let z = DZ0; z <= DZ1; z++) S(X0, G, z, B.thresh);
      for (const [z, s] of [[DZ0 - 1, -1], [DZ1 + 1, 1]]) {
        for (let k = 1; k <= 3; k++) for (let y = G + 1; y <= G + 8; y++) {
          const xb = X0 - k, edge = k === 3 || y === G + 1 || y === G + 8, cross = (y - G - 1) === Math.round((k - 1) * 3.5) || (y - G - 1) === 7 - Math.round((k - 1) * 3.5);
          S(xb, y, z, edge || cross ? B.barnW : B.barnR);
        }
        void s;
      }
      // 문 앞 마당: 건초 묶음, 물통
      w.cyl(6, 24, G + 1, G + 2, 1.6, B.hay); S(6, G + 3, 24, B.hay2);
      w.box(5, G + 1, 37, 7, G + 1, 38, B.cart); w.box(6, G + 1, 37, 6, G + 1, 38, B.water);
      MH.tree(w, 4, G + 1, 50, { kind: 'oak', h: 7, bark: B.bark, leaves: [B.leafY, B.leafO], r: 3.4, branches: 3, spread: 2.6 });

      // ── 건초 다락: 북쪽 벽을 따라 z 19..25, 기둥과 난간, 동쪽 끝 계단 ──
      for (let z = Z0 + 1; z <= 25; z++) for (let x = X0 + 1; x <= X1 - 1; x++) S(x, LY, z, B.loftF);
      for (const x of [20, 26, 32, 38, 43]) w.box(x, G + 1, 25, x, LY - 1, 25, B.log);
      w.box(X0 + 1, LY - 1, 25, X1 - 1, LY - 1, 25, B.log);
      for (let x = X0 + 1; x <= 43; x++) { S(x, LY + 1, 25, x % 3 === 0 ? B.log : B.cart); if (x % 3 === 0) S(x, LY + 2, 25, B.log); }
      // 계단(널판): 탈곡 마당 동쪽에서 북쪽으로 올라 다락 동쪽 끝에 닿는다
      for (let k = 1; k <= 6; k++) { const z = 32 - k; w.box(45, G + 1, z, 47, G + k, z, k % 2 ? B.loftF : B.thresh); S(44, G + k + 1, z, B.log); }
      for (let y = G + 1; y <= G + 6; y++) S(44, y, 31, B.log);
      // 다락 위: 건초 더미(서쪽), 묶은 단, 쇠스랑
      for (let z = 19; z <= 23; z++) for (let x = 15; x <= 29; x++) {
        const h = 1 + Math.round(2.6 * (1 - Math.abs(x - 22) / 9) + hash3(x, 7, z) * 1.4) - (z === 23 ? 1 : 0);
        for (let y = LY + 1; y <= LY + h; y++) S(x, y, z, (x + y + z) % 3 ? B.hay : B.hay2);
      }
      for (const [x, z] of [[32, 20], [34, 20], [32, 22], [36, 20]]) { w.box(x, LY + 1, z, x + 1, LY + 2, z + 1, B.hay); S(x, LY + 2, z, B.hay2); }
      w.box(41, LY + 1, 19, 41, LY + 4, 19, B.log); S(41, LY + 5, 19, B.iron); S(40, LY + 5, 19, B.iron); S(42, LY + 5, 19, B.iron);
      // 건초 미끄럼틀: 다락 가장자리에서 탈곡 마당 서쪽으로 비스듬히
      for (let k = 0; k <= 5; k++) { const z = 26 + k, y = LY - k; for (const x of [24, 26]) S(x, y + 1, z, B.cart); S(25, y, z, B.loftF); }
      const pile = w.prop({ name: 'haypile', pivot: [25, G + 1, 33.5] });
      pile.ellipsoid(25, G + 1, 33, 2.4, 1.6, 1.6, B.hay, (dx, dy) => dy >= 0); pile.set(25, G + 2, 33, B.hay2);

      // ── 다락 아래 서쪽: 곡식 칸막이(밀이 그득) ──
      for (const x of [20, 25, 30]) w.box(x, G + 1, Z0 + 1, x, G + 3, 24, B.cart);
      for (let x = 15; x <= 29; x++) { if (x % 5 === 0) continue; S(x, G + 1, 24, B.cart); S(x, G + 2, 24, B.cart); }
      for (let z = 19; z <= 23; z++) for (let x = 15; x <= 29; x++) { if (x % 5 === 0) continue; const h = (x < 20 ? 3 : x < 25 ? 2 : 3) + (hash3(x, 2, z) > 0.7 ? 0 : -1); for (let y = G + 1; y <= G + h; y++) S(x, y, z, x < 25 ? B.wheat : B.sack); }
      // 곡식 칸 앞 미닫이 판(부품): 들어 올리면 밀알이 쏟아진다. 다락 바닥 구멍 위 깔때기
      for (let x = 21; x <= 24; x++) { S(x, G + 1, 24, 0); S(x, G + 2, 24, 0); }
      const gate = w.prop({ name: 'bingate', pivot: [23, G + 1, 24.5] });
      gate.box(21, G + 1, 24, 24, G + 2, 24, B.crate); gate.set(22, G + 2, 24, B.iron); gate.set(23, G + 2, 24, B.iron);
      w.box(21, LY + 1, 23, 24, LY + 1, 24, B.cart); w.box(22, LY + 1, 23, 23, LY + 1, 24, B.wheat); S(21, LY + 2, 23, B.cart); S(24, LY + 2, 23, B.cart);

      // ── 다락 아래 동쪽: 말 칸 두 개와 마구 걸이 ──
      for (const x of [31, 37, 43]) w.box(x, G + 1, Z0 + 1, x, G + 3, 24, B.log);
      for (let x = 32; x <= 42; x++) if (x !== 37) { S(x, G + 1, 25, B.cart); S(x, G + 2, 25, x % 2 ? B.cart : B.log); }
      for (const x0 of [32, 38]) { w.box(x0, G + 1, 19, x0 + 4, G + 1, 19, B.cart); w.box(x0 + 1, G + 1, 19, x0 + 3, G + 1, 19, B.water); w.box(x0, G + 3, 19, x0 + 4, G + 4, 19, B.hay); }
      for (let z = 19; z <= 24; z++) for (let x = 32; x <= 42; x++) if (x !== 37 && hash3(x, 5, z) > 0.5) S(x, G, z, B.strawF);
      // 말(서쪽 칸): 몸은 칸 안, 머리(부품)는 칸 문 위로 내민다
      const HX = 34;
      w.box(HX - 1, G + 1, 20, HX - 1, G + 2, 20, B.horse); w.box(HX + 1, G + 1, 20, HX + 1, G + 2, 20, B.horse);
      w.box(HX - 1, G + 1, 23, HX - 1, G + 2, 23, B.horse); w.box(HX + 1, G + 1, 23, HX + 1, G + 2, 23, B.horse);
      for (const [x, z] of [[HX - 1, 20], [HX + 1, 20], [HX - 1, 23], [HX + 1, 23]]) S(x, G + 1, z, B.mane);
      w.box(HX - 1, G + 3, 20, HX + 1, G + 4, 23, B.horse); S(HX, G + 4, 19, B.mane); S(HX, G + 3, 19, B.mane);
      w.box(HX - 1, G + 3, 22, HX + 1, G + 3, 22, B.horseL);
      const head = w.prop({ name: 'horsehead', pivot: [HX + 0.5, G + 5, 24.5], axis: 'x' });
      head.box(HX, G + 4, 24, HX, G + 5, 24, B.horse); head.box(HX, G + 3, 25, HX, G + 4, 25, B.horse); head.box(HX, G + 3, 26, HX, G + 4, 27, B.horse);
      head.set(HX, G + 3, 27, B.horseL); head.set(HX, G + 4, 27, B.horseL); head.set(HX - 1, G + 4, 26, B.eye); head.set(HX + 1, G + 4, 26, B.eye);
      w.box(HX, G + 5, 21, HX, G + 5, 23, B.mane);
      // 동쪽 칸: 여물통과 건초, 빈 굴레
      w.box(39, G + 1, 23, 41, G + 1, 23, B.hay); S(40, G + 2, 23, B.hay2);
      // 마구 걸이(계단 아래 북쪽): 안장, 굴레, 고삐
      w.box(44, G + 2, 19, 48, G + 2, 19, B.log); w.box(45, G + 3, 19, 46, G + 4, 19, B.leather); S(48, G + 3, 19, B.rope); S(48, G + 4, 19, B.leather);
      w.box(45, G + 1, 21, 46, G + 1, 22, B.crate); S(45, G + 2, 21, B.leather);

      // ── 탈곡 마당: 낟알 더미, 도리깨 받침(부품 도리깨), 키질 바구니 ──
      w.ellipsoid(32, G + 1, 35, 2.2, 1.4, 1.8, B.wheat, (dx, dy) => dy >= 0);
      w.box(36, G + 1, 33, 36, G + 5, 33, B.log); w.box(36, G + 5, 34, 36, G + 5, 35, B.log);
      const flail = w.prop({ name: 'flail', pivot: [36.5, G + 5.5, 35.5], axis: 'x' });
      flail.box(36, G + 2, 36, 36, G + 5, 36, B.log); flail.box(36, G + 1, 36, 36, G + 1, 38, B.cart);
      w.cyl(29, 37, G + 1, G + 1, 1.2, B.cart); S(29, G + 1, 37, B.wheat);
      // 다락 도르래: 북쪽 벽에서 내민 들보 끝 바퀴, 밧줄에 매단 자루(부품)
      const PX = 34, PZ = 29, PY = G + 12;
      w.box(PX, PY, Z0 + 1, PX, PY, PZ, B.log); w.box(PX, PY - 1, Z0 + 1, PX, PY - 1, Z0 + 2, B.log);
      const wheel = w.prop({ name: 'pulley', pivot: [PX + 0.5, PY - 0.5, PZ + 0.5], axis: 'x' });
      MH.ringProp(wheel, PX + 1, PY - 1, PZ, 1.2, 'yz', B.iron);
      wheel.set(PX + 1, PY - 1, PZ, B.iron);
      const RL = 7;
      const rope = w.prop({ name: 'hrope', pivot: [PX + 0.5, PY - 1, PZ + 0.5] });
      rope.box(PX, PY - 1 - RL, PZ, PX, PY - 2, PZ, B.rope);
      const hsack = w.prop({ name: 'hsack', pivot: [PX + 0.5, G + 2, PZ + 0.5] });
      hsack.box(PX, G + 2, PZ, PX, G + 3, PZ, B.sack); hsack.set(PX, G + 4, PZ, B.rope);
      w.box(PX - 1, G + 1, PZ - 1, PX + 1, G + 1, PZ + 1, B.crate);

      // ── 남쪽: 호박 실은 수레, 곡물 자루 더미(부품 셋), 연장 걸이 ──
      w.box(37, G + 2, 40, 43, G + 2, 43, B.cart); w.walls(37, G + 3, 40, 43, G + 3, 43, B.cart); w.box(38, G + 3, 41, 42, G + 4, 42, B.pumpkin);
      for (const [x, z] of [[38, 41], [40, 42], [42, 41]]) S(x, G + 5, z, B.stem);
      for (const [x, z] of [[37, 40], [43, 40], [37, 43], [43, 43]]) S(x, G + 1, z, B.log);
      w.box(34, G + 2, 41, 36, G + 2, 42, B.log);
      for (const [x, z, h] of [[16, 41, 3], [17, 41, 2], [16, 42, 2], [18, 43, 1], [17, 43, 2], [20, 42, 1]]) for (let y = G + 1; y < G + 1 + h; y++) S(x, y, z, (x + y) % 2 ? B.sack : B.sack2);
      const sacks = [];
      for (let k = 0; k < 3; k++) {
        const x = 21 + k * 2, z = 41;
        const p = w.prop({ name: 'sk' + k, pivot: [x + 0.5, G + 1, z + 0.5] });
        p.box(x, G + 1, z, x + 1, G + 2, z, k % 2 ? B.sack2 : B.sack); p.set(x, G + 3, z, B.rope);
        sacks.push([x + 1, z]);
      }
      // 서쪽 벽 연장: 쇠스랑, 낫, 갈퀴
      for (const [z, t] of [[36, 0], [38, 1], [42, 2]]) {
        w.box(X0 + 1, G + 1, z, X0 + 1, G + 5, z, B.log);
        if (t === 0) { S(X0 + 1, G + 6, z - 1, B.iron); S(X0 + 1, G + 6, z, B.iron); S(X0 + 1, G + 6, z + 1, B.iron); S(X0 + 1, G + 7, z - 1, B.iron); S(X0 + 1, G + 7, z + 1, B.iron); }
        else if (t === 1) { S(X0 + 1, G + 6, z, B.log); S(X0 + 1, G + 6, z + 1, B.iron); S(X0 + 1, G + 5, z + 2, B.iron); }
        else { w.box(X0 + 1, G + 6, z - 1, X0 + 1, G + 6, z + 1, B.log); S(X0 + 1, G + 5, z - 1, B.iron); S(X0 + 1, G + 5, z + 1, B.iron); }
      }
      // 사과 상자, 통
      for (const [x, z] of [[47, 35], [47, 37], [46, 39]]) { S(x, G + 1, z, B.crate); S(x, G + 2, z, B.apple); }

      // ── 등불: 기둥 등과 다락 등(부품: 흔들린다) ──
      w.box(27, G + 1, 40, 27, G + 7, 40, B.log); S(28, G + 7, 40, B.log);
      const lan = w.prop({ name: 'lantern', pivot: [28.5, G + 7, 40.5], axis: 'x' });
      lan.set(28, G + 6, 40, B.iron); lan.set(28, G + 5, 40, B.iron); lan.set(28, G + 4, 40, B.lamp); lan.set(28, G + 3, 40, B.iron);
      lights.push({ name: 'lantern', p: [28.5, G + 4, 40.5], c: '#ffc870', i: 0.7, d: 16, flicker: 0.15, srcR: 3 });
      S(32, LY + 1, 24, B.lamp); S(44, LY + 1, 24, B.lamp);
      lights.push({ name: 'loft', p: [38, LY + 2, 23], c: '#ffd890', i: 0.6, d: 18, flicker: 0.12, srcR: 6 });
      S(X0 + 1, G + 7, DZ0 - 2, B.lamp);
      lights.push({ name: 'door', p: [X0 + 2, G + 5, (DZ0 + DZ1) / 2], c: '#fff0c8', i: 0.5, d: 20, flicker: 0.05, srcR: 6 });
      S(21, G + 1, 27, B.lamp);
      lights.push({ name: 'bins', p: [22, G + 3, 26], c: '#ffd890', i: 0.4, d: 12, flicker: 0.1, srcR: 3 });

      landmarks.push({ name: '탈곡 마당', note: '널마루 · 도리깨 · 낟알 더미', p: [34, G + 12, 35] });
      landmarks.push({ name: '건초 다락', note: '계단과 도르래 · 건초 미끄럼틀', p: [30, LY + 10, 22] });
      landmarks.push({ name: '말 칸', note: '밤색 말 · 여물통 · 마구 걸이', p: [37, G + 10, 22] });

      // ───── 상호작용 ─────
      acts.push(OR.goAct({ at: [X0 + 1, G + 1, (DZ0 + DZ1) >> 1], h: 8, name: '밖으로 나가기', goto: 'harvest', hint: '큰 문을 지나 황금들녘의 헛간 앞마당으로 나가요', hit: [X0, G + 1, DZ0, X0 + 1, G + 8, DZ1] }));
      acts.push({
        name: '도리깨 탈곡', hint: '도리깨가 널마루를 내리치자 밀 낟알과 겨가 사방으로 튀어요', hit: [33, G + 1, 33, 37, G + 5, 38],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await a.turn('flail', [-1.2, 0, 0], 0.4);
            await a.turn('flail', [0.35, 0, 0], 0.18);
            a.burst([36.5, G + 1.3, 38], { n: 24, colors: ['#e0bc50', '#f0d890', '#c8a860'], speed: 3, up: 3, life: 1, gravity: 7, spread: 1 });
            a.burst([32.5, G + 2.5, 35.5], { n: 10, colors: ['#f4e8c0', '#dcb456'], speed: 1.2, up: 2, life: 1.6, gravity: -0.3, spread: 1.5 });
          }
          await a.turn('flail', [0, 0, 0], 0.5);
        },
      });
      acts.push({
        name: '다락 도르래', hint: '도르래가 끼익 돌며 곡물 자루를 건초 다락 높이까지 끌어 올려요', hit: [PX - 1, G + 1, PZ - 1, PX + 1, G + 4, PZ + 1],
        run: async a => {
          const up = 6;
          await Promise.all([a.move('hsack', [0, up, 0], 2.4), a.rope('hrope', RL, RL - up, 2.4), a.turn('pulley', [-6, 0, 0], 2.4)]);
          a.burst([PX + 0.5, G + 2 + up + 1, PZ + 0.5], { n: 14, colors: ['#f8f4ea', '#d8c8a0'], speed: 1, up: 1, life: 1, gravity: 1, spread: 0.6 });
          await a.wait(1.2);
          await Promise.all([a.move('hsack', [0, 0, 0], 2), a.rope('hrope', RL, RL, 2), a.turn('pulley', [0, 0, 0], 2)]);
          a.burst([PX + 0.5, G + 1.5, PZ + 0.5], { n: 16, colors: ['#e8dcc0', '#c8b48a'], speed: 2, up: 0.5, life: 0.6, gravity: 4, spread: 0.8, flat: true });
        },
      });
      acts.push({
        name: '말 먹이 주기', hint: '밤색 말이 고개를 숙여 건초를 우물우물 먹고는 히힝 고개를 쳐들어요', hit: [HX - 2, G + 1, 24, HX + 2, G + 7, 27],
        run: async a => {
          for (let k = 0; k < 3; k++) {
            await a.turn('horsehead', [0.7, 0, 0], 0.5);
            a.burst([HX + 0.5, G + 2, 27], { n: 12, colors: ['#dcb456', '#e0c070'], speed: 1.2, up: 1.5, life: 1, gravity: 4, spread: 0.6 });
            await a.turn('horsehead', [0.45, 0, 0], 0.3);
          }
          await a.turn('horsehead', [-0.5, 0, 0], 0.4);
          a.burst([HX + 0.5, G + 6, 27.5], { n: 8, colors: ['#ffffff', '#e8eef0'], speed: 0.8, up: 1, life: 0.8, gravity: -0.2, spread: 0.3 });
          await a.wait(0.4); await a.turn('horsehead', [0, 0, 0], 0.6);
        },
      });
      acts.push({
        name: '건초 미끄럼틀', hint: '다락에서 건초 한 아름이 미끄럼틀을 타고 쏟아져 내려 건초 더미가 불룩해져요', hit: [23, G + 1, 26, 27, LY + 1, 34],
        run: async a => {
          for (let k = 0; k < 8; k++) { a.burst([25.5, LY - k * 0.7 + 1.5, 26.5 + k * 0.75], { n: 14, colors: ['#dcb456', '#c8a048', '#e0c070'], speed: 1.2, up: 0.5, life: 0.8, gravity: 5, spread: 0.6 }); await a.wait(0.14); }
          await a.tween('haypile', { scl: [1.8, 2.6, 1.8] }, 0.5);
          a.burst([25.5, G + 2.5, 33.5], { n: 30, colors: ['#dcb456', '#e0c070', '#f0d890'], speed: 3, up: 2, life: 1.4, gravity: 3, spread: 1.6 });
          await a.wait(1.2); await a.tween('haypile', { scl: [1, 1, 1] }, 1);
        },
      });
      acts.push({
        name: '곡물 자루 쌓기', hint: '곡물 자루들이 하나씩 폴짝 뛰어올라 차곡차곡 쌓여요', hit: [21, G + 1, 40, 26, G + 4, 42],
        run: async a => {
          const tops = [[2, 3, 0], [-2, 3, 0], [0, 2, 0]];
          for (let k = 0; k < 3; k++) {
            const [dx, dy] = tops[k];
            await a.move('sk' + k, [dx * 0.5, dy + 3, 0], 0.35);
            await a.move('sk' + k, [k === 2 ? 0 : dx, k === 2 ? 2 : 0, 0], 0.3);
            a.burst([sacks[k][0], G + 1.2, sacks[k][1] + 0.5], { n: 12, colors: ['#e8dcc0', '#c8b48a'], speed: 1.5, up: 0.5, life: 0.6, gravity: 3, spread: 0.6, flat: true });
          }
          await a.wait(2);
          for (let k = 2; k >= 0; k--) await a.move('sk' + k, [0, 0, 0], 0.4);
        },
      });
      acts.push({
        name: '곡식 칸막이', hint: '곡식 칸 앞 미닫이 판을 들어 올리면 금빛 밀알이 좌르르 쏟아져 나와요', hit: [20, G + 1, 23, 25, G + 4, 26],
        run: async a => {
          a.flash('bins', 3, 3);
          a.burst([22.5, LY + 2.5, 23.5], { n: 16, colors: ['#e0bc50', '#f0d070'], speed: 1, up: 1, life: 0.8, gravity: 3, spread: 0.8 });
          await a.move('bingate', [0, 2, 0], 0.6);
          for (let k = 0; k < 12; k++) { a.burst([21.5 + (k % 4), G + 1.6, 25.2], { n: 12, colors: ['#e0bc50', '#f0d070', '#c8a040'], speed: 2.2, up: 1.2, life: 0.9, gravity: 8, spread: 0.5 }); await a.wait(0.16); }
          a.burst([23, G + 1.5, 27], { n: 26, colors: ['#e0bc50', '#f4e8c0'], speed: 2, up: 1.5, life: 1.2, gravity: 3, spread: 1.4 });
          await a.wait(0.6); await a.move('bingate', [0, 0, 0], 0.6);
        },
      });
      acts.push({
        name: '헛간 등불', hint: '기둥 등불이 흔들리며 환하게 타오르고 짚 먼지가 반짝반짝 떠올라요', hit: [26, G + 1, 39, 29, G + 8, 41],
        run: async a => {
          a.flash('lantern', 4, 3); a.flash('loft', 2, 3); a.glow(1.3, 3);
          for (let k = 0; k < 3; k++) { await a.turn('lantern', [0.9, 0, 0], 0.45); await a.turn('lantern', [-0.9, 0, 0], 0.45); a.burst([28.5, G + 5, 40.5], { n: 12, colors: ['#fff0c8', '#ffd890'], speed: 0.8, up: 1.4, life: 1.6, gravity: -0.4, spread: 1.4 }); }
          await a.turn('lantern', [0, 0, 0], 0.5);
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
