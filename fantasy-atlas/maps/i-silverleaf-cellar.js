// 달샘 술 창고(하위 지도) — 은빛잎 마을 동남쪽 언덕 속 이슬 포도주 저장고. 돌 아치 벽감의 통 저장실, 포도 압착 통, 동쪽 시음실,
// 북쪽 아치 너머 달빛 샘물이 솟는 깊은 숙성 굴과 오래된 큰 통. 남쪽 문 쪽(카메라 쪽) 벽은 낮게 잘랐다 (64칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 64, D = 64, Hh = 48, G = 10;
  MAPS.push({
    id: 'silverleaf-cellar', cat: 'village', sub: true, parent: 'silverleaf', name: '달샘 술 창고', en: 'Silverleaf · Moonspring Cellar', color: '#b890ff', seed: 1392, base: G, time: 'night', size: [W, D, Hh],
    desc: '이슬 포도원 언덕을 파고 들어간 돌 저장고. 아치 벽감마다 이슬 포도주 통이 누워 익어 가고, 동쪽 시음실에는 은잔이 놓여 있다. 북쪽 아치 너머 깊은 굴에서는 달빛 샘물이 솟아, 엘프들은 그 물로 백 년 묵을 포도주를 빚는다.',
    info: { title: '장소 정보', en: 'MOONSPRING CELLAR', rows: [['자리', '이슬 포도원 동남쪽 언덕 속'], ['저장실', '아치 벽감의 이슬 포도주 통'], ['시음실', '은잔과 촛불 탁자'], ['숙성 굴', '달빛 샘물 · 백 년 묵은 큰 통']] },
    sky: ['#20203a', '#0a0a18', '#c8a0ff'], stars: true,
    hemi: ['#e0d8f0', '#2a2420', 0.6], sun: ['#e0d8ff', 0.46, [0.4, 1, 0.6]],
    day: { sky: ['#e0e4ec', '#8a90a8', '#f8f0ff'], stars: false, hemi: ['#f8f4ff', '#4a4034', 0.62], sun: ['#fff4e0', 0.62, [0.4, 1, 0.6]], haze: '#c8c0d0' },
    liquid: ['#1a4a5a', '#3a9aaa', '#d8fff8'], liqSpeed: 0.4,
    fog: { start: 0.86, floor: G - 5, depth: 6, haze: [8, 0.16, 6], hazeColor: '#3a3448' },
    camY: 0, zoom: 1.5,
    particles: [
      { n: 50, colors: ['#ffe08a', '#c8a0ff', '#fff4c8'], mode: 'wisp', speed: 0.4, size: 2, area: [32, 30, 16], y0: G + 2, y1: G + 10 },
      { n: 50, colors: ['#d8d0c0', '#b8b0a8'], mode: 'drift', speed: 0.1, area: [32, 32, 18], y0: G + 1, y1: G + 12, glow: false },
      { n: 24, colors: ['#b8f8ff', '#e0f8ff'], mode: 'rise', speed: 0.25, area: [32, 11, 4], y0: G, y1: G + 8 },
    ],
    blocks: {
      moss: { c: '#4a3a2e', top: '#5a8a52', v: 0.1 }, dirt: { c: '#4a3a2e', v: 0.08 }, rock: { c: '#5a6a6a', v: 0.06, pat: 'stone' }, rockDk: { c: '#3a4646', v: 0.06, pat: 'stone' },
      cave: { c: '#4a5050', v: 0.08, pat: 'big' }, stoneW: { c: '#b0b8b0', v: 0.06 }, pathS: { c: '#4a3a2e', top: '#8a948c', v: 0.08, pat: 'stone' }, flag: { c: '#6a6a64', top: '#9a9a90', v: 0.05, pat: 'check', alt: '#8e8e86' },
      barkDk: { c: '#54483c', v: 0.07 }, plank: { c: '#b08a5a', v: 0.08, pat: 'plank' }, plankDk: { c: '#7a5a3a', v: 0.08, pat: 'plank' }, door: { c: '#4a3a2e', v: 0.03, pat: 'plank' },
      barrel: { c: '#8a6a44', v: 0.06, pat: 'log' }, barrelO: { c: '#6a4a30', v: 0.06, pat: 'log' }, hoop: { c: '#3a3a3e', v: 0.03 }, cask: { c: '#a8845a', v: 0.04 },
      grape: { c: '#b890ff', glow: true }, grapeD: { c: '#6a4aa8', v: 0.06 }, wine: { c: '#7a2a5a', v: 0.03 }, bottle: { c: '#2a4a3a', v: 0.03 }, bottleP: { c: '#5a2a5a', v: 0.03 },
      silver: { c: '#d8e0e4', v: 0.03 }, cloth: { c: '#d8ccb0', v: 0.03 }, cush: { c: '#6a4a7a', v: 0.04 },
      leafD: { c: '#3a6a5a', v: 0.08 }, leafW: { c: '#c8e8d8', v: 0.05 }, fern: { c: '#3a6a3a', v: 0.1 }, rope: { c: '#c8b890', v: 0.04 }, iron: { c: '#4a4a50', v: 0.03 },
      lamp2: { c: '#ffe08a', glow: true }, candle: { c: '#fff0c0', glow: true }, moon: { c: '#e0f8ff', glow: true }, mushG: { c: '#9ae8f0', glow: true },
    },
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 6, height: () => G, surface: (x, z) => hash3(x, 2, z) > 0.7 ? B.moss : B.pathS, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];
      const X0 = 12, X1 = 52, Z0 = 24, Z1 = 50;                 // 통 저장실(바깥 벽 포함)
      const HX = 42, HT = G + 9;                                    // 시음실 칸막이 x, 저장실 벽 높이
      // ── 저장실 바닥과 벽 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) w.set(x, G, z, ((x >> 1) + (z >> 1)) % 2 ? B.flag : B.pathS);
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        const edge = x === X0 || x === X1 || z === Z0 || z === Z1;
        if (!edge) continue;
        const low = z === Z1 || x === X1;                                         // 카메라 쪽(남·동) 벽은 3칸
        const top = low ? G + 3 : HT;
        for (let y = G + 1; y <= top; y++) w.set(x, y, z, y === top ? B.stoneW : ((x + z + (y >> 1)) % 7 === 0 ? B.rockDk : B.rock));
      }
      // 서쪽 벽 아치 벽감(통이 누운 칸) 넷, 북쪽 벽 아치 벽감 둘
      for (let k = 0; k < 4; k++) {
        const zc = Z0 + 4 + k * 6;
        for (let z = zc - 2; z <= zc + 2; z++) for (let y = G + 1; y <= G + 6; y++) {
          const arc = Math.hypot(z - zc, Math.max(0, y - (G + 4)) * 1.2) <= 2.4;
          if (!arc) continue;
          w.set(X0, y, z, B.rockDk);
          w.set(X0 + 1, y, z, 0);
        }
        for (let z = zc - 2; z <= zc + 2; z++) w.set(X0 + 1, G + 7, z, B.stoneW);
      }
      // 누운 통(축 x): 지름 3, 테 두 줄
      const cask = (p, x0, x1, yc, zc, mat) => {
        for (let x = x0; x <= x1; x++) for (let dz = -1; dz <= 1; dz++) for (let dy = -1; dy <= 1; dy++) {
          if (Math.abs(dz) + Math.abs(dy) === 2) continue;
          p.set(x, yc + dy, zc + dz, (x === x0 + 1 || x === x1 - 1) ? B.hoop : (x === x0 || x === x1 ? (dz === 0 && dy === 0 ? B.cask : mat) : mat));
        }
      };
      for (let k = 0; k < 4; k++) {
        const zc = Z0 + 4 + k * 6;
        w.box(X0 + 1, G + 1, zc - 2, X0 + 5, G + 1, zc - 2, B.plankDk); w.box(X0 + 1, G + 1, zc + 2, X0 + 5, G + 1, zc + 2, B.plankDk);
        cask(w, X0 + 1, X0 + 5, G + 2, zc, k % 2 ? B.barrelO : B.barrel);
        w.set(X0 + 6, G + 2, zc, B.iron);
        if (k % 2 === 0) { w.box(X0 + 2, G + 4, zc - 1, X0 + 4, G + 4, zc + 1, B.plankDk); w.set(X0 + 3, G + 5, zc, B.barrel); w.set(X0 + 3, G + 5, zc - 1, B.bottle); }
      }
      // 저장실 가운데 줄: 세운 통 더미와 통 받침
      for (const [x, z] of [[24, 30], [24, 36], [24, 42], [32, 42]]) {
        w.box(x - 1, G + 1, z - 1, x + 1, G + 1, z + 1, B.plankDk);
        for (const [dx, dz] of [[0, 0], [1, 0], [0, 1], [1, 1]]) if ((dx + dz + x) % 3 !== 1) { w.box(x - 1 + dx * 2, G + 2, z - 1 + dz * 2, x - 1 + dx * 2, G + 3, z - 1 + dz * 2, B.barrel); w.set(x - 1 + dx * 2, G + 2, z - 1 + dz * 2, B.hoop); }
        w.set(x, G + 2, z, B.barrel); w.set(x, G + 3, z, B.barrel); w.set(x, G + 4, z, B.grapeD);
      }
      // 포도 압착 통(남서쪽): 둥근 통, 위 누름판(부품), 나사 기둥
      const PX = 18, PZ = 45;
      w.cyl(PX, PZ, G + 1, G + 2, 2.6, B.barrelO); w.cyl(PX, PZ, G + 2, G + 2, 1.7, 0); w.cyl(PX, PZ, G + 2, G + 2, 1.7, B.grapeD); w.ring(PX, PZ, G + 2, 2.1, 2.7, B.hoop);
      for (const x of [PX - 3, PX + 3]) w.box(x, G + 1, PZ, x, G + 7, PZ, B.barkDk);
      w.box(PX - 3, G + 8, PZ, PX + 3, G + 8, PZ, B.barkDk);
      const press = w.prop({ name: 'press', pivot: [PX + 0.5, G + 4, PZ + 0.5] });
      press.cyl(PX, PZ, G + 4, G + 4, 1.7, B.plank); press.box(PX, G + 5, PZ, PX, G + 7, PZ, B.iron);
      for (const [x, z] of [[PX + 3, PZ - 3], [PX + 4, PZ - 2]]) { w.set(x, G + 1, z, B.plank); w.set(x, G + 2, z, B.grape); }
      acts.push({
        name: '포도 밟기', hint: '압착 통의 누름판이 쿵쿵 내려앉으며 이슬 포도즙이 보랏빛으로 튀어요', hit: [PX - 3, G + 1, PZ - 3, PX + 3, G + 8, PZ + 3],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await a.move('press', [0, -2, 0], 0.35);
            a.burst([PX + 0.5, G + 3.5, PZ + 0.5], { n: 18, colors: ['#b890ff', '#7a2a5a', '#e0c8ff'], speed: 2.4, up: 2, life: 0.9, gravity: 8, spread: 1.2 });
            await a.move('press', [0, 0, 0], 0.45);
          }
        },
      });

      // ── 남쪽 문(밖으로): 낮은 벽에 돌 아치 문틀과 두 짝 문 ──
      const DX0 = 29, DX1 = 34;
      for (let x = DX0 - 1; x <= DX1 + 1; x++) for (let y = G + 1; y <= G + 7; y++) {
        const dx = x - (DX0 + DX1) / 2, inArch = Math.hypot(dx, Math.max(0, y - (G + 4)) * 1.15) <= 3.1;
        const onArch = Math.hypot(dx, Math.max(0, y - (G + 4)) * 1.15) <= 4.2;
        if (inArch) w.set(x, y, Z1, B.door); else if (onArch) w.set(x, y, Z1, B.stoneW);
      }
      for (let y = G + 1; y <= G + 4; y++) w.set((DX0 + DX1) >> 1, y, Z1, B.barkDk);
      for (const x of [DX0 + 1, DX1 - 1]) w.set(x, G + 3, Z1, B.hoop);
      w.set(DX0 - 2, G + 4, Z1 - 1, B.lamp2); w.set(DX1 + 2, G + 4, Z1 - 1, B.lamp2);
      lights.push({ name: 'door', p: [32, G + 4, Z1 - 1.5], c: '#ffd880', i: 0.6, d: 10, flicker: 0.12 });
      acts.push(OR.goAct({ at: [31, G + 1, Z1 - 1], name: '밖으로 나가기', goto: 'silverleaf', hint: '두 짝 문을 밀고 이슬 포도원 앞마당으로 올라가요', hit: [DX0, G + 1, Z1 - 1, DX1, G + 4, Z1], h: 7 }));
      for (let z = Z1 - 4; z <= Z1 - 1; z++) for (let x = DX0; x <= DX1; x++) w.set(x, G, z, B.plank);

      // ── 동쪽 시음실: 칸막이 벽과 아치 문, 은잔 탁자, 술병 시렁 ──
      for (let z = Z0 + 1; z <= Z0 + 15; z++) for (let y = G + 1; y <= G + 6; y++) {
        const door = z >= Z0 + 6 && z <= Z0 + 9 && (y <= G + 4 || (y === G + 5 && z > Z0 + 6 && z < Z0 + 9));
        w.set(HX, y, z, door ? 0 : (y === G + 6 ? B.stoneW : B.rock));
      }
      for (let x = HX; x <= X1; x++) for (let y = G + 1; y <= G + 4; y++) w.set(x, y, Z0 + 15, y === G + 4 ? B.stoneW : B.rock);
      for (let z = Z0 + 1; z <= Z0 + 14; z++) for (let x = HX + 1; x < X1; x++) w.set(x, G, z, (x + z) % 2 ? B.plank : B.plankDk);
      for (let z = Z0 + 3; z <= Z0 + 12; z++) for (let x = HX + 2; x <= HX + 3; x++) if (z !== Z0 + 7 && z !== Z0 + 8) w.set(x, G, z, B.cush);
      const TX = HX + 4, TZ = Z0 + 3;
      w.box(TX, G + 1, TZ, TX, G + 1, TZ + 6, B.barkDk); w.box(TX - 1, G + 2, TZ - 1, TX + 1, G + 2, TZ + 7, B.plank);
      w.box(TX, G + 2, TZ, TX, G + 2, TZ + 6, B.cloth);
      for (const x of [TX - 2, TX + 2]) for (let z = TZ; z <= TZ + 6; z += 2) w.set(x, G + 1, z, B.cush);
      w.set(TX, G + 3, TZ + 3, B.candle); w.set(TX, G + 3, TZ, B.bottleP);
      const cups = w.prop({ name: 'cups', pivot: [TX + 0.5, G + 3, TZ + 3.5] });
      for (const z of [TZ + 1, TZ + 5]) { cups.set(TX - 1, G + 3, z, B.silver); cups.set(TX + 1, G + 3, z, B.silver); cups.set(TX - 1, G + 4, z, B.wine); }
      for (let z = Z0 + 1; z <= Z0 + 14; z++) for (let y = G + 1; y <= G + 3; y++) if (!w.get(X1 - 1, y, z)) w.set(X1 - 1, y, z, y % 2 ? B.plankDk : (hash3(y, z, 5) > 0.5 ? B.bottle : B.bottleP));
      lights.push({ name: 'tasting', p: [TX + 0.5, G + 4, TZ + 3.5], c: '#ffd890', i: 0.8, d: 12, flicker: 0.2 });
      acts.push({
        name: '시음 잔', hint: '시음 탁자의 은잔이 떠올라 쨍 부딪치며 이슬 포도주 향이 퍼져요', hit: [TX - 2, G + 1, TZ - 1, TX + 2, G + 4, TZ + 7],
        run: async a => {
          await a.move('cups', [0, 2, 0], 0.9);
          for (let k = 0; k < 3; k++) { a.burst([TX + 0.5, G + 5.5, TZ + 3.5], { n: 16, colors: ['#ffffff', '#e0c8ff', '#ffe08a'], speed: 2, up: 1.6, life: 0.9, gravity: 0.5, spread: 0.6 }); await a.turn('cups', [0, 0.4, 0], 0.25); await a.turn('cups', [0, -0.4, 0], 0.25); }
          a.flash('tasting', 2.4, 1.6);
          a.burst([TX + 0.5, G + 6, TZ + 3.5], { n: 22, colors: ['#c8a0ff', '#fff4c8'], speed: 0.8, up: 2, life: 2.2, gravity: -0.3, spread: 1.6 });
          await a.wait(1);
          await Promise.all([a.turn('cups', [0, 0, 0], 0.5), a.move('cups', [0, 0, 0], 0.9)]);
        },
      });

      // 통 꼭지: 동쪽 저장실 큰 통(시음실 남쪽)
      const KX = 46, KZ = 44;
      w.box(KX - 2, G + 1, KZ - 3, KX + 3, G + 1, KZ - 3, B.plankDk); w.box(KX - 2, G + 1, KZ + 3, KX + 3, G + 1, KZ + 3, B.plankDk);
      for (let x = KX - 2; x <= KX + 3; x++) for (let dz = -2; dz <= 2; dz++) for (let dy = -2; dy <= 2; dy++) { if (dz * dz + dy * dy > 5) continue; w.set(x, G + 4 + dy, KZ + dz, (x === KX - 1 || x === KX + 2) ? B.hoop : (x === KX - 2 ? B.cask : B.barrelO)); }
      w.set(KX - 3, G + 1, KZ, B.silver);
      const tap = w.prop({ name: 'tap', pivot: [KX - 2.5, G + 3.5, KZ + 0.5], axis: 'x' });
      tap.set(KX - 3, G + 3, KZ, B.iron); tap.box(KX - 3, G + 4, KZ, KX - 3, G + 5, KZ, B.iron); tap.set(KX - 3, G + 5, KZ - 1, B.iron); tap.set(KX - 3, G + 5, KZ + 1, B.iron);
      acts.push({
        name: '통 꼭지 열기', hint: '큰 통의 꼭지를 돌리면 이슬 포도주가 은빛 잔으로 졸졸 흘러요', hit: [KX - 4, G + 1, KZ - 3, KX + 3, G + 6, KZ + 3],
        run: async a => {
          await a.spin('tap', 2, 0.8);
          for (let k = 0; k < 10; k++) { a.burst([KX - 2.5, G + 3, KZ + 0.5], { n: 8, colors: ['#7a2a5a', '#b890ff', '#e0c8ff'], speed: 0.3, up: -0.5, life: 0.5, gravity: 9, spread: 0.15 }); await a.wait(0.2); }
          a.burst([KX - 2.5, G + 2.2, KZ + 0.5], { n: 16, colors: ['#e0c8ff', '#ffffff'], speed: 1.2, up: 1.4, life: 1, gravity: 1, spread: 0.4 });
        },
      });

      // ── 북쪽 아치: 깊은 숙성 굴로 ──
      const AX = 32;
      for (let x = AX - 4; x <= AX + 4; x++) for (let y = G + 1; y <= G + 8; y++) {
        const r = Math.hypot(x - AX, Math.max(0, y - (G + 4)) * 1.1);
        if (r <= 2.6) w.set(x, y, Z0, 0); else if (r <= 3.8) w.set(x, y, Z0, B.stoneW);
      }
      // 굴: 울퉁불퉁한 바위 벽(뒤쪽 높게), 가운데 달빛 샘
      const CX = 32, CZ = 13, CRX = 15, CRZ = 11;
      for (let z = CZ - CRZ - 3; z < Z0; z++) for (let x = CX - CRX - 3; x <= CX + CRX + 3; x++) {
        const e = Math.hypot((x - CX) / CRX, (z - CZ) / CRZ) + (hash3(x >> 1, 4, z >> 1) - 0.5) * 0.12;
        if (e <= 1) { w.set(x, G, z, hash3(x, 1, z) > 0.75 ? B.cave : B.pathS); for (let y = G + 1; y <= G + 16; y++) w.set(x, y, z, 0); continue; }
        if (e > 1.28) continue;
        const front = x > CX + 6 && z > CZ;
        const top = front ? G + 5 : G + 11 + Math.round(hash3(x >> 1, 6, z >> 1) * 5) - (z > CZ ? 3 : 0);
        for (let y = G + 1; y <= top; y++) w.set(x, y, z, (y + (x >> 1)) % 5 === 0 ? B.rockDk : B.cave);
        if (hash3(x, 8, z) > 0.6) w.set(x, top + 1, z, hash3(x, 9, z) > 0.5 ? B.fern : B.leafD);
      }
      for (let x = AX - 2; x <= AX + 2; x++) for (let z = Z0 - 1; z <= Z0; z++) { w.set(x, G, z, B.plank); for (let y = G + 1; y <= G + 4; y++) if (w.get(x, y, z) !== B.stoneW) w.set(x, y, z, 0); }
      // 달빛 샘: 굴 북쪽 웅덩이와 샘돌
      const SX = 32, SZ = 8;
      for (let z = SZ - 4; z <= SZ + 3; z++) for (let x = SX - 6; x <= SX + 6; x++) {
        const d = Math.hypot((x - SX) / 5.5, (z - SZ) / 3.2);
        if (d > 1) continue;
        w.set(x, G - 3, z, B.rockDk); for (let y = G - 2; y <= G; y++) w.set(x, y, z, 0);
        w.liquid(x, z, G - 1);
        if (d > 0.82) w.set(x, G, z, B.stoneW);
      }
      for (let z = SZ - 4; z <= SZ + 3; z++) for (let x = SX - 6; x <= SX + 6; x++) { const d = Math.hypot((x - SX) / 5.5, (z - SZ) / 3.2); if (d > 0.82 && d <= 1) { w.set(x, G, z, B.stoneW); w.liquid(x, z, -1); } }
      w.box(SX - 1, G - 3, SZ - 3, SX + 1, G + 2, SZ - 3, B.rock); w.set(SX, G + 3, SZ - 3, B.moon); w.set(SX - 1, G + 3, SZ - 3, B.leafW); w.set(SX + 1, G + 3, SZ - 3, B.fern);
      for (const [x, z] of [[SX - 8, SZ + 1], [SX + 8, SZ - 1], [SX - 5, SZ + 5], [SX + 6, SZ + 5]]) { w.set(x, G + 1, z, B.mushG); }
      lights.push({ name: 'spring', p: [SX + 0.5, G + 2, SZ + 0.5], c: '#9af0ff', i: 1, d: 18, flicker: 0.05, srcR: 3 });
      // 두레박 기둥과 두레박(부품)
      const BX = SX + 3, BZ = SZ + 1;
      w.box(BX + 3, G + 1, BZ, BX + 3, G + 9, BZ, B.barkDk); w.box(BX, G + 9, BZ, BX + 3, G + 9, BZ, B.barkDk); w.set(BX + 3, G + 7, BZ + 1, B.iron);
      const bTop = G + 3, rLen = 5;
      MH.rope(w, 'brope', BX, G + 8, BZ, rLen, B.rope);
      const pail = w.prop({ name: 'pail', pivot: [BX + 0.5, bTop, BZ + 0.5] });
      pail.box(BX, bTop - 1, BZ, BX, bTop, BZ, B.plankDk); pail.set(BX, bTop - 2, BZ, B.hoop);
      acts.push({
        name: '샘물 길어 오기', hint: '두레박이 달빛 샘에 풍덩 잠겼다가 은빛 샘물을 가득 담아 올라와요', hit: [BX - 1, G + 1, BZ - 2, BX + 3, G + 9, BZ + 2],
        run: async a => {
          await Promise.all([a.move('pail', [0, -3, 0], 1.4), a.rope('brope', rLen, rLen + 3, 1.4)]);
          a.burst([BX + 0.5, G, BZ + 0.5], { n: 22, colors: ['#b8f8ff', '#e0f8ff', '#ffffff'], speed: 2, up: 2.4, life: 1, gravity: 7, spread: 0.6 });
          a.flash('spring', 3, 2.4);
          await a.wait(0.8);
          await Promise.all([a.move('pail', [0, 0, 0], 1.6), a.rope('brope', rLen, rLen, 1.6)]);
          a.burst([BX + 0.5, bTop + 1, BZ + 0.5], { n: 14, colors: ['#b8f8ff', '#e0f8ff'], speed: 0.6, up: 1.6, life: 1.6, gravity: -0.3, spread: 0.4 });
        },
      });
      landmarks.push({ name: '달빛 샘물', note: '백 년 포도주를 빚는 샘', p: [SX + 0.5, G + 12, SZ + 0.5] });
      // 숙성 굴의 오래된 큰 통(서쪽, 하나는 굴러 나오는 부품)
      for (const zc of [12, 18]) { w.box(21, G + 1, zc - 2, 27, G + 1, zc - 2, B.plankDk); w.box(21, G + 1, zc + 2, 27, G + 1, zc + 2, B.plankDk); }
      cask(w, 21, 27, G + 2, 12, B.barrelO);
      const roll = w.prop({ name: 'oldcask', pivot: [24.5, G + 2.5, 18.5], axis: 'x' });
      cask(roll, 21, 27, G + 2, 18, B.barrelO);
      w.set(20, G + 5, 15, B.lamp2); w.set(20, G + 4, 15, B.iron);
      acts.push({
        name: '오래된 통 굴리기', hint: '백 년 묵은 큰 통이 데구루루 굴러 나왔다가 제자리로 돌아가요', hit: [21, G + 1, 16, 27, G + 4, 20],
        run: async a => {
          await Promise.all([a.move('oldcask', [0, 0, 3], 1.4), a.turn('oldcask', [Math.PI * 1.5, 0, 0], 1.4)]);
          a.burst([24.5, G + 1.2, 21.5], { n: 16, colors: ['#d8d0c0', '#b8b0a8'], speed: 2, up: 0.8, life: 1, gravity: 1, spread: 2, flat: true });
          await a.wait(0.6);
          await Promise.all([a.move('oldcask', [0, 0, 0], 1.4), a.turn('oldcask', [0, 0, 0], 1.4)]);
        },
      });

      // ── 등불: 저장실 벽 등롱과 굴 입구 등 ──
      const lampP = [[X0 + 1, G + 6, Z0 + 7], [X0 + 1, G + 6, Z0 + 13], [X0 + 1, G + 6, Z0 + 19], [36, G + 5, 40], [AX - 4, G + 6, Z0 + 1], [AX + 4, G + 6, Z0 + 1], [HX - 1, G + 5, Z0 + 4], [40, G + 6, Z0 + 1]];
      w.box(36, G + 1, 40, 36, G + 4, 40, B.barkDk);
      for (const [x, y, z] of lampP) { w.set(x, y, z, B.lamp2); w.set(x, y + 1, z, B.iron); }
      lights.push({ name: 'lanterns', p: [X0 + 2.5, G + 6, Z0 + 13], c: '#ffd890', i: 0.9, d: 18, flicker: 0.15 });
      lights.push({ name: 'lanterns', p: [AX + 0.5, G + 6, Z0 + 2.5], c: '#ffd890', i: 0.8, d: 16, flicker: 0.15 });
      lights.push({ name: 'lanterns', p: [36, G + 5, 40], c: '#ffd890', i: 0.6, d: 16, flicker: 0.15 });
      acts.push({
        name: '등불 켜기', hint: '벽마다 걸린 등롱에 차례로 불이 붙으며 술 창고가 금빛으로 밝아져요', hit: [AX - 6, G + 1, Z0 + 1, AX + 6, G + 7, Z0 + 3],
        run: async a => {
          for (const [x, y, z] of lampP) { a.burst([x + 0.5, y + 0.5, z + 0.5], { n: 14, colors: ['#ffe08a', '#fff4c8', '#ffb060'], speed: 1.2, up: 1.6, life: 1.2, gravity: -0.3, spread: 0.5 }); await a.wait(0.25); }
          a.flash('lanterns', 3, 3.4); a.glow(1.4, 3.4);
          await a.wait(1);
        },
      });
      // 문간 곁 포도 바구니와 빈 통, 짚단
      for (const [x, z] of [[22, 47], [26, 48], [38, 47]]) { w.box(x, G + 1, z, x + 1, G + 1, z, B.plankDk); w.set(x, G + 2, z, B.grape); w.set(x + 1, G + 2, z, B.grapeD); }
      for (const [x, z] of [[14, 48], [15, 48], [14, 47]]) { w.box(x, G + 1, z, x, G + 2, z, B.barrel); w.set(x, G + 3, z, B.hoop); }
      for (let x = 36; x <= 40; x++) w.set(x, G + 1, 25, (x & 1) ? B.plankDk : B.barrel);
      landmarks.push({ name: '통 저장실', note: '아치 벽감의 이슬 포도주 통', p: [24.5, G + 12, 36.5] });
      return { lights, landmarks, acts };
    },
  });
})();
