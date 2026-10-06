// 대장간(하위 지도) — 무쇠골 고원의 돌 대장간 안. 서쪽 청동 문으로 들어서면 북쪽 벽에 큰 화덕과 굴뚝 갓, 풀무, 앞에 모루 둘,
// 동쪽 담금질 물통, 동쪽 무기 진열실(도끼 걸이 · 진열장), 북서 룬 각인 공방, 남서 석탄 창고. 남·동쪽 벽은 잘라 낮췄다 (64칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 64, D = 64, Hh = 56, G = 10;
  MAPS.push({
    id: 'ironhollow-forge', cat: 'village', sub: true, parent: 'ironhollow', name: '대장간', en: 'Ironhollow · The Forge', color: '#c08a3a', seed: 1271, base: G, time: 'night', size: [W, D, Hh],
    desc: '무쇠골 드워프 장인들이 밤낮으로 망치를 두드리는 돌 대장간. 북쪽 벽의 큰 화덕은 풀무질 한 번에 불꽃을 뿜고, 모루 앞에서 달군 쇠는 담금질 물통에서 하얀 김을 토한다. 동쪽 진열실에는 미스릴 도끼가, 북서쪽 공방에는 룬을 새긴 돌판이 빛난다.',
    info: { title: '장소 정보', en: 'THE FORGE', rows: [['단조장', '큰 화덕 · 풀무 · 모루 둘 · 담금질 물통'], ['진열실', '도끼 걸이 · 미스릴 도끼 진열장'], ['공방', '룬 각인대 · 석탄 창고']] },
    sky: ['#3a2418', '#171014', '#ff8a40'], stars: false,
    hemi: ['#ffd8b0', '#2a1e18', 0.6], sun: ['#ffc890', 0.6, [0.4, 1, 0.6]],
    day: { sky: ['#e8c8a0', '#a8765a', '#ffe0b0'], stars: false, hemi: ['#fff0e0', '#4a3a30', 0.62], sun: ['#ffe8d0', 0.72, [0.4, 1, 0.6]], haze: '#c89060' },
    liquid: ['#2a4a5a', '#4a7a8a', '#d8f0f8'], liqSpeed: 0.3,
    fog: { start: 0.92, floor: G - 14, depth: 6, haze: [6, 0.14, 6], hazeColor: '#5a3424' },
    camY: 2, zoom: 1.75,
    particles: [
      { n: 120, colors: ['#ffb04a', '#ff6a2a', '#ffe08a'], mode: 'rise', speed: 0.9, area: [30, 21, 5], y0: G + 3, y1: G + 22 },
      { n: 70, colors: ['#8a7a70', '#6a5c54', '#a89888'], mode: 'drift', speed: 0.15, wind: 0.1, area: [32, 32, 18], y0: G + 1, y1: G + 12, glow: false },
    ],
    blocks: {
      gravel: { c: '#5a504a', top: '#7a7068', v: 0.12 }, rock: { c: '#5a504a', top: '#6a605a', v: 0.1, pat: 'stone' }, pave: { c: '#6a625a', top: '#847a70', v: 0.06, pat: 'stone' },
      flagF: { c: '#5e564e', top: '#6e665e', v: 0.06, pat: 'big' }, flagF2: { c: '#5e564e', top: '#625a52', v: 0.06, pat: 'big' }, soot: { c: '#3a3430', top: '#443c36', v: 0.08 },
      granite: { c: '#8a8078', v: 0.05, pat: 'big' }, graniteDk: { c: '#5e564e', v: 0.05, pat: 'brick' }, basalt: { c: '#2e2826', v: 0.06, pat: 'stone' }, slate: { c: '#3a3a44', v: 0.04, pat: 'tile' },
      bronze: { c: '#c08a3a', v: 0.06 }, gold: { c: '#e8c040', v: 0.08 }, iron: { c: '#3a3a40', v: 0.03 }, steel: { c: '#8a8e96', v: 0.03 }, timber: { c: '#6a4428', v: 0.06, pat: 'log' },
      plank: { c: '#7a5434', v: 0.08, pat: 'plank' }, coal: { c: '#141010', v: 0.04 }, coal2: { c: '#241c1a', v: 0.06 }, leather: { c: '#6a3a24', v: 0.05 }, barrel: { c: '#8a5a30', v: 0.08, pat: 'log' },
      win: { c: '#ffb050', night: true, day: '#5a4a3a' }, ember: { c: '#ff7a2a', glow: true }, rune: { c: '#ffd070', glow: true }, runeB: { c: '#7ad8ff', glow: true }, fireY: { c: '#ffe090', glow: true }, molten: { c: '#ffb04a', glow: true },
      mithril: { c: '#a8e0f0', glow: true }, glass: { c: '#a8c8d0', v: 0.03 }, ore: { c: '#e8c040', v: 0.1 }, oreB: { c: '#5ab0e0', v: 0.1 }, rope: { c: '#b8a080', v: 0.04 },
    },
    build(w) {
      const B = w.id;
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const X0 = 13, X1 = 50, Z0 = 17, Z1 = 46, TOP = G + 12;
      const DZ0 = 30, DZ1 = 32;                                              // 서쪽 청동 문
      const inR = (x, z) => x > X0 && x < X1 && z > Z0 && z < Z1;
      MH.terrain(w, { floor: G - 6, height: () => G, surface: (x, z) => hash3(x, 1, z) > 0.8 ? B.rock : B.gravel, under: () => B.rock });
      const lights = [], acts = [], landmarks = [];

      // ── 바닥: 넓적돌, 화덕 앞은 그을음, 문 앞 바깥은 포장길 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) S(x, G, z, (z < 27 && x > 22 && x < 40 && hash3(x, 3, z) > 0.45) ? B.soot : ((x + z) % 2 ? B.flagF : B.flagF2));
      for (let z = DZ0 - 2; z <= DZ1 + 2; z++) for (let x = 2; x < X0; x++) S(x, G, z, B.pave);

      // ── 벽: 북·서는 높은 화강암(청동 띠, 불빛 창), 동·남은 낮게 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (inR(x, z)) continue;
        const low = x === X1 || z === Z1, corner = (x === X0 || x === X1) && (z === Z0 || z === Z1);
        const a = (x === X0 || x === X1) ? z : x;
        if (low) {
          for (let y = G + 1; y <= G + 2; y++) S(x, y, z, corner || a % 5 === 0 ? B.graniteDk : B.granite);
          if (corner || a % 5 === 0) S(x, G + 3, z, B.bronze);
          continue;
        }
        for (let y = G + 1; y <= TOP; y++) S(x, y, z, y === G + 1 || corner || a % 6 === 0 ? B.graniteDk : (y === G + 7 || y === TOP ? B.bronze : B.granite));
      }
      for (const x of [17, 41, 46]) w.box(x, G + 8, Z0, x + 1, G + 10, Z0, B.win);
      for (const z of [22, 39]) w.box(X0, G + 8, z, X0, G + 10, z + 1, B.win);
      // 서쪽 청동 문: 돌 문틀, 안으로 연 청동 문짝 두 쪽
      w.box(X0, G + 1, DZ0, X0, G + 4, DZ1, 0);
      for (const z of [DZ0 - 1, DZ1 + 1]) w.box(X0, G + 1, z, X0, G + 6, z, B.graniteDk);
      w.box(X0, G + 5, DZ0 - 1, X0, G + 6, DZ1 + 1, B.graniteDk); S(X0, G + 5, DZ0 + 1, B.rune);
      for (let z = DZ0; z <= DZ1; z++) S(X0, G, z, B.pave);
      for (const z of [DZ0 - 2, DZ1 + 2]) { w.box(X0 + 1, G + 1, z, X0 + 2, G + 4, z, B.bronze); S(X0 + 2, G + 3, z, B.gold); }

      // ── 큰 화덕(북쪽 벽 가운데): 돌 아궁이, 잉걸불 바닥, 청동 갓과 굴뚝 ──
      const HX0 = 26, HX1 = 34, HZ1 = 22;
      w.box(HX0, G + 1, Z0 + 1, HX1, G + 3, HZ1, B.graniteDk);
      w.box(HX0 + 1, G + 3, Z0 + 2, HX1 - 1, G + 3, HZ1 - 1, B.coal);
      for (let z = Z0 + 2; z <= HZ1 - 1; z++) for (let x = HX0 + 1; x <= HX1 - 1; x++) if (hash3(x, 4, z) > 0.35) S(x, G + 3, z, hash3(x, 5, z) > 0.5 ? B.ember : B.molten);
      for (let x = HX0; x <= HX1; x++) S(x, G + 4, HZ1, B.basalt);
      for (let z = Z0 + 1; z <= HZ1; z++) { S(HX0, G + 4, z, B.basalt); S(HX1, G + 4, z, B.basalt); }
      for (let k = 0; k <= 3; k++) { const y = G + 8 + k; w.box(HX0 + k, y, Z0 + 1, HX1 - k, y, HZ1 - k, k === 0 ? B.bronze : B.graniteDk); w.box(HX0 + k + 1, y, Z0 + 1, HX1 - k - 1, y, HZ1 - k - 1, 0); }
      for (const x of [HX0, HX1]) w.box(x, G + 5, HZ1, x, G + 7, HZ1, B.iron);
      w.box(28, G + 12, Z0, 32, G + 24, Z0 + 3, B.graniteDk); w.box(29, G + 12, Z0 + 1, 31, G + 24, Z0 + 2, 0);
      for (let y = G + 14; y <= G + 24; y += 5) w.walls(28, y, Z0, 32, y, Z0 + 3, B.bronze);
      lights.push({ name: 'hearth', p: [30.5, G + 5, 20.5], c: '#ff7a2a', i: 1.8, d: 26, flicker: 0.35, srcR: 3 });
      landmarks.push({ name: '큰 화덕', note: '풀무 · 청동 갓 · 굴뚝', p: [30.5, G + 28, 20] });
      // 풀무(화덕 서쪽, 부품)
      const BZ = 19;
      w.box(23, G + 1, BZ, 23, G + 2, BZ + 2, B.timber); w.box(18, G + 1, BZ, 18, G + 2, BZ + 2, B.timber);
      const bel = w.prop({ name: 'bellows', pivot: [23, G + 4, BZ + 1.5], axis: 'z' });
      bel.box(18, G + 3, BZ, 23, G + 3, BZ + 2, B.plank); bel.box(18, G + 6, BZ, 23, G + 6, BZ + 2, B.plank);
      bel.box(19, G + 4, BZ, 23, G + 5, BZ + 2, B.leather); bel.box(24, G + 4, BZ + 1, 25, G + 4, BZ + 1, B.iron);
      S(HX0 - 1, G + 2, BZ + 1, B.iron);

      // ── 모루 둘(화덕 앞): 나무 둥치 받침, 쇠 모루, 망치(부품)와 달군 쇠 ──
      const anvil = (x, z) => {
        w.box(x - 1, G + 1, z, x + 1, G + 1, z + 1, B.timber);
        w.box(x - 1, G + 2, z, x + 2, G + 2, z + 1, B.iron); w.box(x - 2, G + 3, z, x + 2, G + 3, z + 1, B.iron); S(x + 3, G + 3, z, B.iron); S(x + 3, G + 3, z + 1, B.iron);
      };
      const A1 = [28, 27], A2 = [36, 29];
      anvil(...A1); anvil(...A2);
      S(A1[0], G + 4, A1[1], B.molten); S(A1[0] + 1, G + 4, A1[1], B.molten);
      const ham = w.prop({ name: 'hammer', pivot: [A1[0] + 0.5, G + 5, A1[1] + 2.5], axis: 'x' });
      ham.box(A1[0], G + 5, A1[1] + 1, A1[0], G + 5, A1[1] + 4, B.timber); ham.box(A1[0], G + 4, A1[1] + 1, A1[0], G + 6, A1[1] + 1, B.steel);
      S(A2[0] - 1, G + 4, A2[1], B.iron); S(A2[0], G + 4, A2[1] + 1, B.timber);
      lights.push({ name: 'anvil', p: [A1[0] + 1, G + 5, A1[1] + 0.5], c: '#ffb04a', i: 0.4, d: 10, flicker: 0.2, srcR: 3 });
      // 연장 걸이(서쪽 벽): 집게, 망치, 줄
      for (let z = 24; z <= 28; z++) { S(X0 + 1, G + 6, z, B.timber); if (z % 2 === 0) { S(X0 + 1, G + 5, z, B.iron); S(X0 + 1, G + 4, z, z % 4 ? B.steel : B.iron); } }
      w.box(X0 + 1, G + 1, 35, X0 + 3, G + 2, 37, B.plank); S(X0 + 2, G + 3, 36, B.steel); S(X0 + 1, G + 3, 35, B.ore); S(X0 + 3, G + 3, 37, B.oreB);

      // ── 담금질 물통(화덕 동쪽) ──
      const QX0 = 37, QX1 = 43, QZ0 = 18, QZ1 = 21;
      w.box(QX0, G + 1, QZ0, QX1, G + 2, QZ1, B.graniteDk);
      for (let z = QZ0 + 1; z <= QZ1 - 1; z++) for (let x = QX0 + 1; x <= QX1 - 1; x++) { S(x, G + 1, z, 0); S(x, G + 2, z, 0); w.liquid(x, z, G + 2); }
      for (let x = QX0 + 1; x <= QX1 - 1; x++) S(x, G, QZ0 + 1, B.basalt);
      w.box(QX1 - 1, G + 3, QZ0, QX1, G + 3, QZ0, B.iron);
      const tong = w.prop({ name: 'tongs', pivot: [40.5, G + 6, 20.5] });
      tong.box(40, G + 3, 20, 40, G + 6, 20, B.iron); tong.box(40, G + 3, 21, 40, G + 3, 21, B.molten);
      w.box(39, G + 7, 19, 41, G + 7, 19, B.timber); w.box(40, G + 7, 19, 40, G + 7, 20, B.timber);
      w.box(39, G + 3, 19, 39, G + 6, 19, B.timber);
      landmarks.push({ name: '담금질 물통', note: '달군 쇠가 하얀 김을 토하는 곳', p: [40, G + 14, 20] });

      // ── 무기 진열실(동쪽): 벽 걸이, 가운데 양면 걸이, 남동쪽 진열장(부품 문) ──
      for (let x = 45; x <= X1 - 1; x++) { S(x, G + 6, Z0 + 1, B.timber); if (x % 2) { S(x, G + 5, Z0 + 1, B.timber); S(x, G + 4, Z0 + 1, B.timber); S(x, G + 5, Z0 + 2, x % 4 === 1 ? B.steel : B.iron); S(x, G + 6, Z0 + 2, B.steel); } }
      const RX = 46;
      w.box(RX, G + 1, 26, RX, G + 1, 36, B.timber); w.box(RX, G + 5, 26, RX, G + 5, 36, B.timber);
      for (const z of [26, 31, 36]) w.box(RX, G + 1, z, RX, G + 5, z, B.timber);
      for (let z = 27; z <= 35; z++) {
        if (z === 31) continue;
        S(RX, G + 2, z, B.timber); S(RX, G + 3, z, B.timber);
        for (const s of [-1, 1]) if (z % 2) { S(RX + s, G + 4, z, z % 4 === 1 ? B.steel : B.bronze); S(RX + s, G + 3, z, B.steel); }
      }
      // 미스릴 도끼 진열장: 돌 받침 위 유리 칸, 앞 유리문(부품)
      const CX0 = 42, CX1 = 47, CZ = 41;                                    // 뒤판 z=CZ, 유리문은 남쪽(z=CZ+2)
      w.box(CX0, G + 1, CZ, CX1, G + 1, CZ + 2, B.graniteDk); w.walls(CX0, G + 6, CZ, CX1, G + 6, CZ + 2, B.graniteDk);
      for (const x of [CX0, CX1]) w.box(x, G + 2, CZ, x, G + 5, CZ + 2, B.bronze);
      w.box(CX0 + 1, G + 2, CZ, CX1 - 1, G + 5, CZ, B.iron);
      w.box(44, G + 2, CZ + 1, 44, G + 5, CZ + 1, B.timber);
      w.box(43, G + 4, CZ + 1, 43, G + 5, CZ + 1, B.mithril); w.box(45, G + 4, CZ + 1, 45, G + 5, CZ + 1, B.mithril); S(44, G + 5, CZ + 1, B.gold);
      const cdoor = w.prop({ name: 'casedoor', pivot: [CX0 + 1, G + 3.5, CZ + 2.5], axis: 'y' });
      for (let x = CX0 + 1; x <= CX1 - 1; x++) for (let y = G + 2; y <= G + 5; y++) cdoor.set(x, y, CZ + 2, x === CX0 + 1 || x === CX1 - 1 || y === G + 2 || y === G + 5 ? B.bronze : B.glass);
      lights.push({ name: 'mithril', p: [44.5, G + 4, CZ + 1.5], c: '#a8e8ff', i: 0.3, d: 12, flicker: 0.05, srcR: 3 });
      landmarks.push({ name: '무기 진열실', note: '도끼 걸이 · 미스릴 도끼 진열장', p: [45, G + 14, 34] });

      // ── 룬 각인 공방(북서 구석): 돌 각인대, 룬 돌판(부품), 바닥 룬 고리, 끌 ──
      const RTX = 17, RTZ = 25;
      w.box(RTX - 1, G + 1, RTZ, RTX + 2, G + 2, RTZ + 2, B.graniteDk); w.box(RTX - 1, G + 3, RTZ, RTX + 2, G + 3, RTZ + 2, B.basalt);
      const slab = w.prop({ name: 'runeslab', pivot: [RTX + 0.5, G + 4, RTZ + 1.5] });
      slab.box(RTX, G + 4, RTZ, RTX + 1, G + 4, RTZ + 2, B.slate); slab.set(RTX, G + 5, RTZ + 1, B.rune); slab.set(RTX + 1, G + 5, RTZ, B.runeB); slab.set(RTX + 1, G + 5, RTZ + 2, B.rune);
      S(RTX + 2, G + 4, RTZ + 2, B.steel); S(RTX - 1, G + 4, RTZ, B.timber);
      w.ring(RTX + 1, RTZ + 1, G, 3.2, 4.2, B.basalt);
      for (let k = 0; k < 8; k++) { const t = k / 8 * Math.PI * 2; S(Math.round(RTX + 1 + Math.cos(t) * 3.7), G, Math.round(RTZ + 1 + Math.sin(t) * 3.7), B.rune); }
      // 룬 돌판 선반(서쪽 벽)
      for (const y of [G + 3, G + 6]) { w.box(X0 + 1, y, 19, X0 + 1, y, 22, B.timber); for (let z = 19; z <= 22; z++) S(X0 + 1, y + 1, z, (z + y) % 3 ? B.slate : B.rune); }
      lights.push({ name: 'runes', p: [RTX + 1, G + 5, RTZ + 1.5], c: '#ffd070', i: 0.35, d: 12, flicker: 0.1, srcR: 3 });
      landmarks.push({ name: '룬 각인 공방', note: '룬 돌판 · 바닥 룬 고리', p: [18, G + 14, 24] });

      // ── 석탄 창고(남서 구석): 칸막이 안 석탄 더미, 삽(부품), 광석 통 ──
      const KX0 = 14, KX1 = 22, KZ0 = 38;
      w.box(KX1, G + 1, KZ0, KX1, G + 3, Z1 - 1, B.plank); w.box(KX0, G + 1, KZ0, KX1 - 3, G + 3, KZ0, B.plank);
      for (let z = KZ0 + 1; z <= Z1 - 1; z++) for (let x = KX0; x < KX1; x++) {
        const h = Math.max(0, Math.round(4.2 - Math.hypot(x - 15, z - 44) * 0.75 + hash3(x, 6, z)));
        for (let y = G + 1; y <= G + h; y++) S(x, y, z, hash3(x, y, z) > 0.4 ? B.coal : B.coal2);
      }
      const shovel = w.prop({ name: 'shovel', pivot: [20.5, G + 1, 40.5] });
      shovel.box(20, G + 2, 40, 20, G + 5, 40, B.timber); shovel.box(20, G + 1, 40, 20, G + 1, 41, B.iron); shovel.set(20, G + 6, 40, B.timber);
      for (let y = G + 1; y <= G + 6; y++) S(20, y, 40, 0); S(20, G + 1, 41, 0);
      for (const [x, z] of [[24, 43], [26, 43], [25, 44]]) { w.box(x, G + 1, z, x, G + 2, z, B.barrel); S(x, G + 3, z, (x + z) % 2 ? B.ore : B.oreB); }
      landmarks.push({ name: '석탄 창고', note: '석탄 더미 · 광석 통', p: [17, G + 12, 42] });

      // 벽 화로 둘과 문간 등
      for (const [x, z] of [[24, 45], [49, 24]]) { const b = x === 49 ? [x - 1, z] : [x, z - 1]; w.box(b[0], G + 1, b[1], b[0], G + 3, b[1], B.iron); S(b[0], G + 4, b[1], B.fireY); }
      lights.push({ name: 'brazierS', p: [24.5, G + 5, 44.5], c: '#ffb050', i: 0.6, d: 14, flicker: 0.3, srcR: 3 });
      lights.push({ name: 'brazierE', p: [48.5, G + 5, 24.5], c: '#ffb050', i: 0.6, d: 14, flicker: 0.3, srcR: 3 });
      lights.push({ name: 'door', p: [X0 + 1.5, G + 5, DZ0 + 1.5], c: '#ffd070', i: 0.4, d: 10, flicker: 0.1, srcR: 3 });

      // ───── 상호작용 ─────
      acts.push(OR.goAct({ at: [X0 + 1, G + 1, DZ0 + 1], h: 5, name: '밖으로 나가기', goto: 'ironhollow', hint: '청동 문을 나서 무쇠골 고원의 포장길로 돌아가요', hit: [X0, G + 1, DZ0, X0 + 1, G + 4, DZ1] }));
      acts.push({
        name: '풀무질', hint: '풀무를 밟을 때마다 큰 화덕이 푸욱 숨을 쉬며 불꽃 기둥을 뿜어요', hit: [18, G + 1, BZ, 25, G + 6, BZ + 2],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await a.tween('bellows', { rot: [0, 0, 0.22], scl: [1, 0.55, 1] }, 0.36);
            a.flash('hearth', 3, 0.5);
            a.burst([30.5, G + 4, 20], { n: 46, colors: ['#ffb04a', '#ff6a2a', '#ffe08a'], speed: 4, up: 8, life: 1.3, gravity: 2, spread: 2 });
            await a.tween('bellows', { rot: [0, 0, 0], scl: [1, 1, 1] }, 0.36);
          }
        },
      });
      acts.push({
        name: '모루 내리치기', hint: '쇠망치가 달군 쇠를 땅! 땅! 내리칠 때마다 불티가 튀어요', hit: [A1[0] - 2, G + 1, A1[1], A1[0] + 3, G + 6, A1[1] + 4],
        run: async a => {
          for (let k = 0; k < 5; k++) {
            await a.turn('hammer', [-1.1, 0, 0], 0.32);
            await a.turn('hammer', [0.15, 0, 0], 0.12);
            a.flash('anvil', 5, 0.15);
            a.burst([A1[0] + 1, G + 4.5, A1[1] + 0.5], { n: 26, colors: ['#ffe08a', '#ffb04a', '#ffffff'], speed: 5, up: 3, life: 0.6, gravity: 9, spread: 0.4 });
          }
          await a.turn('hammer', [0, 0, 0], 0.4);
        },
      });
      acts.push({
        name: '담금질', hint: '집게에 문 달군 쇠를 물통에 쑥 담그자 치이익 하얀 김이 피어올라요', hit: [QX0, G + 1, QZ0, QX1, G + 7, QZ1],
        run: async a => {
          await a.move('tongs', [0, -2, 0], 0.6);
          for (let k = 0; k < 10; k++) { a.burst([40.5, G + 3, 20.5], { n: 14, colors: ['#ffffff', '#e8eef0', '#c8d0d8'], speed: 1, up: 3, life: 1.8, gravity: -0.8, spread: 1.4 }); await a.wait(0.18); }
          await a.wait(0.5); await a.move('tongs', [0, 0, 0], 0.8);
        },
      });
      acts.push({
        name: '룬 새기기', hint: '각인대의 룬 돌판이 떠오르며 바닥 룬 고리가 차례로 금빛으로 타올라요', hit: [RTX - 1, G + 1, RTZ, RTX + 2, G + 5, RTZ + 2],
        run: async a => {
          a.flash('runes', 6, 4); a.glow(1.5, 4);
          await a.move('runeslab', [0, 2.5, 0], 1);
          for (let k = 0; k < 8; k++) { const t = k / 8 * Math.PI * 2; a.burst([RTX + 1.5 + Math.cos(t) * 3.7, G + 1.2, RTZ + 1.5 + Math.sin(t) * 3.7], { n: 10, colors: ['#ffd070', '#ffe8a0', '#7ad8ff'], speed: 1, up: 2, life: 1, gravity: -0.6, spread: 0.3 }); await a.wait(0.22); }
          await a.turn('runeslab', [0, Math.PI, 0], 1);
          await a.move('runeslab', [0, 0, 0], 0.8); a.unwind('runeslab');
        },
      });
      acts.push({
        name: '도끼 진열장', hint: '청동 테 유리문이 열리며 미스릴 도끼 한 쌍이 푸른 빛을 뿜어요', hit: [CX0, G + 1, CZ, CX1, G + 6, CZ + 3],
        run: async a => {
          await a.turn('casedoor', [0, -1.6, 0], 1);
          a.flash('mithril', 7, 3); a.glow(1.3, 3);
          for (let k = 0; k < 5; k++) { a.burst([44.5, G + 6.5, CZ + 1.5], { n: 12, colors: ['#a8e8ff', '#ffffff', '#6ad0f0'], speed: 1.2, up: 1.4, life: 1, gravity: -0.3, spread: 1 }); await a.wait(0.4); }
          await a.wait(0.6); await a.turn('casedoor', [0, 0, 0], 1);
        },
      });
      acts.push({
        name: '석탄 삽질', hint: '삽이 석탄 더미를 푹 떠서 화덕 쪽으로 휙 뿌리고, 검은 가루가 풀썩 일어요', hit: [KX0, G + 1, KZ0, KX1, G + 6, Z1 - 1],
        run: async a => {
          for (let k = 0; k < 3; k++) {
            await a.tween('shovel', { off: [-1.5, 0, 1.5], rot: [0.5, 0, 0.4] }, 0.4);
            a.burst([18.5, G + 2.5, 42], { n: 14, colors: ['#141010', '#3a3230', '#5a504a'], speed: 1.4, up: 1.4, life: 1, gravity: 2, spread: 1 });
            await a.tween('shovel', { off: [0.5, 2, -1.5], rot: [-0.6, 0, -0.2] }, 0.35);
            a.burst([20.5, G + 7, 38.5], { n: 16, colors: ['#141010', '#241c1a', '#ff7a2a'], speed: 3, up: 3, life: 1, gravity: 7, spread: 0.8 });
          }
          await a.tween('shovel', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.5);
          a.flash('hearth', 2.5, 1);
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
