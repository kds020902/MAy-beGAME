// 북동 모서리 탑 · 왕의 서재(하위 지도) — 성 내부 북동 모서리 탑의 나선 계단 꼭대기 둥근 방. 휘어진 서가, 큰 책상과 봉인 도장, 왕국 지도 탁자, 지구본, 천구의, 벽난로, 비밀 서가 문, 남동쪽 천문 발코니와 망원경 (성 내부의 하위 지도)
// 좌표: +x 동쪽, +z 남쪽. 탑 둘레벽은 북서쪽 절반만 높고 남동쪽은 낮게 잘라 기본 시점(남동쪽)에서 방 안이 보인다.
(function () {
  'use strict';
  const { hash3 } = VX;
  const { KP } = window.KINGDOM;
  const W = 80, D = 80, Hh = 72;
  MAPS.push({
    id: 'innerkeep-tower', cat: 'kingdom', sub: true, parent: 'innerkeep', name: '왕의 서재', en: 'King\'s Study · NE Tower', color: '#e8c04a', seed: 2512, base: 34, time: 'night', size: [W, D, Hh],
    desc: '성 내부 북동 모서리 탑, 나선 계단 꼭대기의 둥근 방. 벽을 따라 휘어진 서가가 둘러서 있고 왕이 밤늦게 편지에 봉인을 찍는 큰 책상, 왕국 지도를 펼치는 탁자, 지구본과 천구의가 놓여 있다. 남동쪽 문을 나서면 별을 보는 천문 발코니에 망원경이 서 있다.',
    info: { title: '장소 정보', en: 'KING\'S STUDY', rows: [['위치', '성 내부 북동 모서리 탑 꼭대기'], ['방', '나선 계단 · 왕의 서재 · 천문 발코니'], ['명물', '왕국 지도 탁자 · 봉인 도장 · 망원경'], ['소문', '북쪽 서가 한 칸은 책이 아니라 문이다']] },
    sky: ['#2a2238', '#0a0a18', '#5a4468'], stars: true,
    hemi: ['#d8c8e8', '#2a2030', 0.5], sun: ['#c8c0f0', 0.42, [0.5, 1, 0.55]],
    day: { sky: ['#d8ecf8', '#5a90d0', '#fff8e0'], stars: false, hemi: ['#ffffff', '#5a5a60', 0.62], sun: ['#fff4e0', 0.8, [0.5, 1, 0.55]] },
    liquid: ['#2a5a8a', '#4a8ac0', '#e0f4ff'], liqSpeed: 0.6,
    fog: { start: 0.9, floor: 22, depth: 10 },
    camY: -3, zoom: 2.2,
    particles: [
      { n: 90, colors: ['#ffe8c0', '#fff4e0'], mode: 'drift', speed: 0.12, area: [40, 40, 15], y0: 36, y1: 48, glow: false },
      { n: 40, colors: ['#ffb04a', '#ff7a2a'], mode: 'rise', speed: 0.5, area: [48, 25, 2], y0: 38, y1: 56, glow: true },
      { n: 30, colors: ['#e8f0ff', '#c8d8ff'], mode: 'drift', speed: 0.2, area: [56, 56, 8], y0: 40, y1: 60, glow: true },
    ],
    blocks: Object.assign({}, KP, {
      plankF: { c: '#7a5434', top: '#946a44', v: 0.06, pat: 'plank' }, plankF2: { c: '#6a4428', top: '#80583a', v: 0.06, pat: 'plank' },
      rug: { c: '#3a4a8a', top: '#3e4e90', v: 0.03 }, rugB: { c: '#c8a050', top: '#d0a850', v: 0.03 }, rugR: { c: '#a02a34', top: '#a82c36', v: 0.03 },
      shelf: { c: '#5a3a24', v: 0.04 }, book1: { c: '#8a2a2a', v: 0.05 }, book2: { c: '#2a4a7a', v: 0.05 }, book3: { c: '#3a6a3a', v: 0.05 }, book4: { c: '#8a6a2a', v: 0.05 },
      table: { c: '#7a4a2a', v: 0.05, pat: 'plank' }, chair: { c: '#4a2e1c', v: 0.04 }, cushion: { c: '#a02a34', v: 0.03 }, paper: { c: '#f4ecd8', v: 0.02 }, ink: { c: '#1a1a2a', v: 0.01 },
      parch: { c: '#e8d8b0', v: 0.03 }, mapG: { c: '#7aa04a', v: 0.04 }, mapB: { c: '#4a8ac0', v: 0.03 }, mapR: { c: '#c84a3a', v: 0.03 },
      wax: { c: '#b02030', v: 0.03 }, brass: { c: '#d8a84a', v: 0.05 }, globe: { c: '#3a7ab0', v: 0.1 }, steel: { c: '#aab0bc', v: 0.04 },
      hearth: { c: '#5a5660', v: 0.06, pat: 'brick' }, coal: { c: '#2a2a30', v: 0.06 }, fire: { c: '#ff9a3a', glow: true }, ember: { c: '#ff6a1a', glow: true },
      candle: { c: '#ffe2a0', glow: true }, coin: { c: '#ffd860', glow: true }, gemR: { c: '#ff3a5a', glow: true }, gemB: { c: '#5ac8ff', glow: true }, sunO: { c: '#ffd070', glow: true },
      glassN: { c: '#8ab8ff', night: true, day: '#a8c8e0' }, slate: { c: '#3a4258', v: 0.04 }, cut: { c: '#32303c', v: 0.02 },
      tile: { c: '#9a9aa4', top: '#c4c0cc', v: 0.04, pat: 'check', alt: '#8a8694' }, kfloor: { c: '#8a8680', top: '#a09a90', v: 0.08, pat: 'stone' }, dark: { c: '#16141a', v: 0 },
      chest: { c: '#6a4428', v: 0.05, pat: 'plank' }, wine: { c: '#6a1a2a', v: 0.03 },
    }),
    build(w) {
      const B = w.id, G = w.base, GB = G - 14;
      const CX = 40, CZ = 40, RI = 16, RO = 18.3, TALL = G + 15, LOW = G + 2;
      MH.terrain(w, { floor: 2, height: () => GB, surface: (x, z) => ((x >> 2) + (z >> 2)) % 2 ? B.slab : B.tile, under: (x, z, y, dep) => dep < 2 ? B.found : B.rock });
      const lights = [], acts = [], landmarks = [];
      const pol = (x, z) => { const dx = x - CX, dz = z - CZ; return { dx, dz, r: Math.hypot(dx, dz), t: Math.atan2(dz, dx) * 180 / Math.PI }; };
      const wallTop = (dx, dz) => { const s = dx + dz; return s <= -3 ? TALL : s >= 7 ? LOW : Math.round(TALL + (LOW - TALL) * (s + 3) / 10); };
      const angIn = (t, a, b) => { t = ((t % 360) + 360) % 360; a = ((a % 360) + 360) % 360; b = ((b % 360) + 360) % 360; return a <= b ? t >= a && t <= b : t >= a || t <= b; };
      const atP = (deg, r) => [Math.round(CX + Math.cos(deg * Math.PI / 180) * r), Math.round(CZ + Math.sin(deg * Math.PI / 180) * r)];

      // ── 탑 몸통(아래)과 둥근 바닥, 둘레벽 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const { dx, dz, r, t } = pol(x, z);
        if (r >= RO) continue;
        for (let y = GB + 1; y < G; y++) w.set(x, y, z, (y - GB) % 6 === 0 ? B.whiteDk : B.white);
        if (r < RI) {
          const ring = Math.floor(r / 2.5);
          w.set(x, G, z, r < 7 ? B.plankF : (ring % 2 ? B.plankF : B.plankF2));
        } else {
          w.set(x, G, z, B.whiteDk);
          const top = wallTop(dx, dz);
          for (let y = G + 1; y <= top; y++) w.set(x, y, z, y === G + 1 || y === top || (y - G) % 7 === 0 ? B.whiteDk : B.white);
          if (top >= G + 6 && ((Math.floor(t) % 12) + 12) % 12 < 6) w.set(x, top + 1, z, B.trim);
          else if (top < G + 6 && (x + z) % 2 === 0) w.set(x, top + 1, z, B.trim);
        }
      }
      // 탑 몸통 바깥 띠와 좁은 창(아래층 계단 창)
      for (const dy of [-4, -10]) for (let a = 0; a < 360; a += 30) { const [x, z] = atP(a, 18); w.box(x, G + dy - 1, z, x, G + dy + 1, z, B.dark); }
      // 높은 벽의 아치 창(서가 위)
      for (const deg of [196, 222, 248]) for (let y = G + 10; y <= G + 13; y++) for (const dd of [-2, 0, 2]) {
        const [x, z] = atP(deg + dd, 17); if (y === G + 13 && dd !== 0) continue; w.set(x, y, z, B.glassN);
        const [x2, z2] = atP(deg + dd, 16); w.set(x2, G + 9, z2, B.trim);
      }

      // ── 바닥 가운데 둥근 융단(나침 장미 무늬) ──
      for (let z = CZ - 8; z <= CZ + 8; z++) for (let x = CX - 8; x <= CX + 8; x++) {
        const { dx, dz, r } = pol(x, z); if (r > 8) continue;
        const star = (Math.abs(dx) <= 0 || Math.abs(dz) <= 0) && r > 2 && r < 7.5;
        w.set(x, G, z, r > 7.2 ? B.rugB : star ? B.rugB : r < 1.5 ? B.rugR : (Math.floor(r) % 3 === 0 ? B.rugR : B.rug));
      }

      // ── 휘어진 서가(북서쪽 벽): 계단 우물·비밀 서가·벽난로 자리는 비운다 ──
      const books = [B.book1, B.book2, B.book3, B.book4];
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const { r, t } = pol(x, z);
        if (r < 14.6 || r >= RI) continue;
        const ok = (angIn(t, 192, 262) || angIn(t, 278, 292) || angIn(t, 118, 150)) && !(x >= 23 && x <= 29 && z >= 34 && z <= 46);
        if (!ok) continue;
        for (let y = G + 1; y <= G + 8; y++) w.set(x, y, z, (y - G) % 2 === 0 || y === G + 8 ? B.shelf : books[(hash3(x, y, z) * 4) | 0]);
      }
      // 서가 사다리
      for (const deg of [215, 245]) { const [x, z] = atP(deg, 14); for (let y = G + 1; y <= G + 8; y++) w.set(x, y, z, y % 2 ? B.wood : 0); w.set(x, G + 9, z, B.wood); }

      // ── 비밀 서가 문(북쪽): 서가 한 칸이 돌아 열리며 벽 속 작은 보물 벽감이 드러난다 ──
      w.box(37, GB + 1, 21, 43, G - 1, 23, B.white); w.box(37, G + 1, 21, 43, G + 9, 25, B.white);
      w.box(38, G + 1, 22, 42, G + 7, 25, 0); w.box(38, G, 22, 42, G, 24, B.rugR);
      w.box(37, G + 1, 25, 37, G + 9, 25, B.whiteDk); w.box(43, G + 1, 25, 43, G + 9, 25, B.whiteDk); w.box(37, G + 8, 25, 43, G + 9, 25, B.trim); w.set(40, G + 9, 25, B.gold);
      w.box(39, G + 1, 22, 41, G + 2, 22, B.whiteDk); w.set(40, G + 3, 22, B.gold); w.set(39, G + 3, 22, B.coin); w.set(41, G + 3, 22, B.coin); w.set(40, G + 4, 22, B.gemR);
      w.box(38, G + 1, 23, 38, G + 1, 24, B.chest); w.set(42, G + 1, 23, B.coin); w.set(42, G + 1, 24, B.gemB);
      lights.push({ name: 'secret', p: [40.5, G + 4, 23.5], c: '#ffd070', i: 0.7, d: 10, flicker: 0.05 });
      const sdoor = w.prop({ name: 'sdoor', pivot: [37.6, G + 1, 25.5] });
      for (let x = 38; x <= 42; x++) for (let y = G + 1; y <= G + 7; y++) sdoor.set(x, y, 25, (y - G) % 2 === 0 || x === 38 || x === 42 || y === G + 7 ? B.shelf : books[(hash3(x, y, 7) * 4) | 0]);

      // ── 벽난로(북동쪽 벽) ──
      w.box(45, G + 1, 23, 52, G + 8, 26, B.hearth); w.box(46, G + 1, 26, 51, G + 4, 26, 0); w.box(46, G + 1, 25, 51, G + 4, 25, 0);
      w.box(46, G + 1, 25, 51, G + 1, 25, B.coal); w.box(47, G + 2, 25, 50, G + 3, 25, B.fire); w.set(48, G + 4, 25, B.ember);
      w.box(45, G + 5, 27, 52, G + 5, 27, B.trim); w.box(46, G + 9, 23, 51, TALL + 3, 25, B.hearth); w.box(45, TALL + 4, 22, 52, TALL + 4, 26, B.trim);
      for (const x of [46, 51]) w.set(x, G + 6, 27, B.candle);
      w.box(47, G + 6, 27, 50, G + 7, 27, B.gold); w.box(48, G + 6, 28, 49, G + 6, 28, B.brass);     // 벽난로 위 금테 거울
      lights.push({ name: 'hearth', p: [48.5, G + 3, 27.5], c: '#ff9a40', i: 1.6, d: 22, flicker: 0.35 });
      // 안락의자 둘과 작은 탁자
      for (const ax of [44, 52]) { w.box(ax, G + 1, 31, ax + 1, G + 1, 32, B.cushion); w.box(ax, G + 2, 32, ax + 1, G + 3, 32, B.cushion); w.set(ax - 1, G + 1, 31, B.chair); w.set(ax + 2, G + 1, 31, B.chair); w.set(ax - 1, G + 2, 31, B.chair); w.set(ax + 2, G + 2, 31, B.chair); }
      w.box(48, G + 1, 31, 49, G + 1, 31, B.table); w.set(48, G + 2, 31, B.wine); w.set(49, G + 2, 31, B.book2);

      // ── 큰 책상(북서쪽)과 봉인 도장 ──
      w.box(30, G + 1, 30, 36, G + 2, 32, B.table); w.box(31, G + 1, 30, 35, G + 1, 32, 0); w.box(31, G + 1, 31, 35, G + 1, 31, 0);
      for (const [x, z] of [[30, 30], [36, 30], [30, 32], [36, 32]]) w.set(x, G + 1, z, B.table);
      w.box(32, G + 1, 33, 34, G + 1, 34, B.cushion); w.box(32, G + 2, 35, 34, G + 4, 35, B.chair); w.set(33, G + 5, 35, B.gold);
      w.box(31, G + 3, 30, 32, G + 3, 31, B.paper); w.set(31, G + 4, 30, B.paper); w.set(30, G + 3, 30, B.book1); w.set(30, G + 4, 30, B.book3); w.set(30, G + 5, 30, B.book2);
      w.set(35, G + 3, 30, B.ink); w.set(35, G + 4, 30, B.paper); w.set(36, G + 3, 32, B.book4);
      w.box(30, G + 3, 32, 30, G + 4, 32, B.gold); w.set(30, G + 5, 32, B.candle);
      w.box(33, G + 3, 32, 34, G + 3, 32, B.wax);
      const seal = w.prop({ name: 'seal', pivot: [33.5, G + 3, 30.5] });
      seal.set(33, G + 3, 30, B.brass); seal.set(33, G + 4, 30, B.wood); seal.set(33, G + 5, 30, B.gold);
      lights.push({ name: 'desk', p: [30.5, G + 6, 32.5], c: '#ffd890', i: 1, d: 14, flicker: 0.2 });

      // ── 계단 우물(서쪽): 나선 계단이 서고로 내려간다 ──
      for (let z = 36; z <= 44; z++) for (let x = 25; x <= 28; x++) {
        const lv = z >= 44 ? G - 1 : z === 43 ? G - 2 : G - 3;
        w.box(x, lv + 1, z, x, G, z, 0); w.set(x, lv, z, z >= 42 ? B.whiteDk : B.kfloor);
      }
      for (let z = 35; z <= 44; z++) { w.set(29, G + 1, z, z % 2 ? B.iron : B.gold); }
      for (let x = 25; x <= 29; x++) w.set(x, G + 1, 35, x % 2 ? B.iron : B.gold);
      w.box(29, G + 2, 35, 29, G + 2, 44, B.wood); w.box(25, G + 2, 35, 29, G + 2, 35, B.wood);
      // 아래로 꺾여 내려가는 계단 끝과 서고 문
      w.box(24, G - 2, 38, 24, G + 1, 40, B.door); w.box(24, G - 2, 39, 24, G + 1, 39, B.wood); w.box(24, G + 2, 37, 24, G + 2, 41, B.trim);
      w.box(24, G - 2, 37, 24, G + 1, 37, B.trim); w.box(24, G - 2, 41, 24, G + 1, 41, B.trim);
      w.set(25, G, 36, B.iron); w.set(25, G + 1, 36, B.candle);
      lights.push({ p: [26, G + 1, 37.5], c: '#ffd890', i: 0.8, d: 10, flicker: 0.2 });
      acts.push(OR.goAct({ at: [26, G - 2, 39], h: 5, name: '서고로 내려가기', goto: 'innerkeep', hint: '나선 계단을 빙글빙글 내려가 탑문을 나서면 왕실 서고 서가 사이로 나가요', hit: [24, G - 2, 38, 25, G + 1, 40] }));

      // ── 왕국 지도 탁자(가운데) ──
      w.box(36, G + 1, 37, 44, G + 2, 43, B.table); w.box(37, G + 1, 38, 43, G + 1, 42, 0);
      w.box(36, G + 3, 37, 36, G + 3, 43, B.gold); w.box(44, G + 3, 37, 44, G + 3, 43, B.gold);
      for (const [x, z] of [[35, 40], [45, 40], [40, 36], [40, 44]]) { w.set(x, G + 1, z, B.chair); w.set(x, G + 2, z, B.chair); }
      w.box(37, G + 3, 37, 37, G + 3, 43, B.parch); w.box(37, G + 4, 38, 37, G + 4, 42, B.parch);     // 말린 지도 끝
      const map = w.prop({ name: 'map', pivot: [37.5, G + 3, 40.5], scl0: [0.12, 1, 1] });
      for (let z = 37; z <= 43; z++) for (let x = 38; x <= 43; x++) {
        const river = Math.abs((z - 37) - (x - 38) * 0.9) < 0.8, wood = hash3(x, 3, z) > 0.7, city = (x === 41 && z === 40);
        map.set(x, G + 3, z, city ? B.mapR : river ? B.mapB : wood ? B.mapG : B.parch);
      }
      const pins = w.prop({ name: 'pins', pivot: [40.5, G + 4, 40.5], off0: [0, -1, 0] });
      for (const [x, z, b] of [[39, 38, B.mapR], [42, 39, B.gold], [41, 42, B.mapR], [43, 41, B.gold], [41, 40, B.gemR]]) pins.set(x, G + 4, z, b);
      for (const [x, z] of [[35, 37], [45, 43]]) { w.box(x, G + 1, z, x, G + 5, z, B.gold); w.set(x, G + 6, z, B.candle); }
      lights.push({ name: 'map', p: [40.5, G + 7, 40.5], c: '#ffe0a0', i: 1.1, d: 16, flicker: 0.15 });

      // ── 지구본(동쪽) ──
      w.box(52, G + 1, 36, 52, G + 2, 36, B.wood); w.box(51, G + 1, 35, 53, G + 1, 37, B.wood);
      const globe = w.prop({ name: 'globe', pivot: [52.5, G + 4.5, 36.5], speed: 0.25 });
      globe.sphere(52, G + 4, 36, 1.6, B.globe);
      for (const [x, y, z] of [[51, G + 4, 35], [53, G + 5, 36], [52, G + 3, 37], [51, G + 5, 37], [53, G + 4, 35]]) globe.set(x, y, z, B.mapG);
      w.box(54, G + 3, 36, 54, G + 6, 36, B.brass);

      // ── 천구의(남서쪽): 해를 가운데 두고 고리와 행성이 돈다 ──
      const OX = 33, OZ = 47;
      w.cyl(OX, OZ, G + 1, G + 1, 1.4, B.whiteDk); w.box(OX, G + 2, OZ, OX, G + 4, OZ, B.brass);
      const orr = w.prop({ name: 'orrery', pivot: [OX + 0.5, G + 6, OZ + 0.5], speed: 0.15 });
      orr.set(OX, G + 6, OZ, B.sunO); orr.set(OX, G + 5, OZ, B.brass);
      orr.ring(OX, OZ, G + 6, 2.2, 3.0, B.brass); orr.ring(OX, OZ, G + 7, 3.6, 4.3, B.brass);
      for (const [x, z, b] of [[OX + 3, OZ, B.gemB], [OX - 4, OZ + 1, B.mapR], [OX, OZ - 4, B.mapG]]) orr.set(x, G + (Math.abs(x - OX) === 3 ? 7 : 8), z, b);

      // ── 촛대 ──
      for (const [x, z] of [[46, 46], [37, 53]]) { w.box(x, G + 1, z, x, G + 4, z, B.gold); w.box(x - 1, G + 4, z, x + 1, G + 4, z, B.gold); w.set(x - 1, G + 5, z, B.candle); w.set(x + 1, G + 5, z, B.candle); w.set(x, G + 5, z, B.candle); }
      lights.push({ p: [46.5, G + 6, 46.5], c: '#ffd890', i: 0.9, d: 14, flicker: 0.2 });

      // ── 천문 발코니(남동쪽): 둥근 문, 난간, 망원경 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const { r, t } = pol(x, z);
        if (angIn(t, 36, 54) && r >= RI - 0.5 && r < RO) w.box(x, G + 1, z, x, G + 8, z, 0);
        if (angIn(t, 6, 84) && r >= RO - 0.5 && r < 24.6) {
          w.set(x, G, z, r > 23.4 ? B.whiteDk : (Math.floor(t / 8) % 2 ? B.slab : B.tile));
          if (r > 23.4) { w.set(x, G + 1, z, B.white); w.set(x, G + 2, z, B.trim); if ((x + z) % 3 === 0) w.set(x, G + 3, z, B.trim); }
          for (let y = G - 1; y >= G - 3; y--) if (r < 18.3 + (y - G + 4) * 2) w.set(x, y, z, B.whiteDk);
        }
        if ((angIn(t, 6, 10) || angIn(t, 80, 84)) && r >= RO - 0.5 && r < 24.6) { w.set(x, G + 1, z, B.white); w.set(x, G + 2, z, B.trim); }
      }
      for (const deg of [34, 56]) for (const rr of [16, 17, 18]) { const [x, z] = atP(deg, rr); w.box(x, G + 1, z, x, G + 4, z, B.whiteDk); w.set(x, G + 5, z, rr === 17 ? B.gold : B.trim); }
      const TX = 55, TZ = 55;
      for (const [dx, dz] of [[-1, -1], [1, -1], [0, 1]]) w.line(TX + dx, G + 1, TZ + dz, TX, G + 3, TZ, B.wood);
      const scope = w.prop({ name: 'scope', pivot: [TX + 0.5, G + 4.5, TZ + 0.5], rot0: [0, 0, 0] });
      scope.line(TX - 2, G + 3, TZ + 2, TX + 3, G + 6, TZ - 3, B.brass); scope.set(TX + 3, G + 7, TZ - 3, B.brass); scope.set(TX - 2, G + 3, TZ + 2, B.steel); scope.set(TX, G + 4, TZ, B.gold);
      w.box(58, G + 1, 50, 59, G + 1, 51, B.chest); w.set(58, G + 2, 50, B.paper); w.set(59, G + 2, 51, B.brass);
      lights.push({ name: 'stars', p: [52.5, G + 4, 59.5], c: '#c8d8ff', i: 0.5, d: 14, flicker: 0.05 });
      w.set(52, G + 1, 59, B.iron); w.set(52, G + 2, 59, B.candle);

      landmarks.push({ name: '왕의 서재', note: '나선 계단 꼭대기 둥근 방', p: [CX + 0.5, G + 20, CZ + 0.5], tag: 'STUDY' });
      landmarks.push({ name: '천문 발코니', note: '별을 보는 망원경', p: [TX + 0.5, G + 12, TZ + 0.5] });

      // ── 상호작용 ──
      acts.push({
        name: '지도 펼치기', hint: '말린 왕국 지도가 탁자 위로 스르륵 펼쳐지고 성과 마을 자리에 표시 핀이 솟아요', hit: [36, G + 1, 37, 44, G + 4, 43],
        run: async a => {
          await a.tween('map', { scl: [1, 1, 1] }, 1.4);
          await a.move('pins', [0, 2, 0], 0.5); await a.move('pins', [0, 0, 0], 0.4);
          a.flash('map', 2.4, 3); a.glow(1.3, 3);
          for (const [x, z] of [[39, 38], [42, 39], [41, 42], [43, 41], [41, 40]]) { a.burst([x + 0.5, G + 5, z + 0.5], { n: 10, colors: ['#ffe8a0', '#ffffff', '#ff5a6a'], speed: 1, up: 2, life: 1, gravity: 0.5, spread: 0.5 }); await a.wait(0.25); }
          await a.wait(2.4);
          await a.move('pins', [0, -1, 0], 0.4); await a.tween('map', { scl: [0.12, 1, 1] }, 1.2);
        },
      });
      acts.push({
        name: '봉인 찍기', hint: '봉인 도장이 붉은 밀랍 위로 쿵 내려앉아 왕실 문장을 찍어요', hit: [30, G + 1, 30, 36, G + 5, 32],
        run: async a => {
          await a.tween('seal', { off: [0, 2.6, 1.2], rot: [0, 0.6, 0] }, 0.6);
          await a.tween('seal', { off: [0, 0, 1.6], rot: [0, 0, 0] }, 0.25, t => t * t);
          a.burst([33.5, G + 3.5, 32.5], { n: 26, colors: ['#b02030', '#ff5a6a', '#ffd860'], speed: 3, up: 1.5, life: 0.8, gravity: 2, spread: 1 });
          a.flash('desk', 2, 1);
          await a.wait(0.6); await a.tween('seal', { off: [0, 0, 0] }, 0.5);
        },
      });
      acts.push({
        name: '지구본 돌리기', hint: '지구본이 빙글빙글 돌며 바다와 대륙이 휙휙 지나가요', hit: [50, G + 1, 34, 54, G + 6, 38],
        run: async a => { const sp = async () => { for (let k = 0; k < 8; k++) { a.burst([52.5, G + 6.5, 36.5], { n: 6, colors: ['#5ac8ff', '#ffffff'], speed: 1.5, up: 1, life: 0.8, gravity: 0, spread: 1.4 }); await a.wait(0.5); } }; await Promise.all([a.spin('globe', 18, 4), sp()]); },
      });
      acts.push({
        name: '망원경', hint: '발코니 망원경이 밤하늘을 훑다 멈추자 별똥별이 줄지어 흘러가요', hit: [TX - 2, G + 1, TZ - 3, TX + 3, G + 7, TZ + 2],
        run: async a => {
          await a.turn('scope', [0, -0.9, 0], 1.4); await a.turn('scope', [0, 0.7, 0], 1.6); await a.turn('scope', [0, 0, 0], 0.8);
          a.flash('stars', 4, 3);
          for (let k = 0; k < 7; k++) { a.burst([TX + 18 - k * 4, G + 30 - k, TZ - 22 + k * 2], { n: 14, colors: ['#ffffff', '#c8d8ff', '#fff4a0'], speed: 1, up: -2, life: 1.2, gravity: 2, spread: 0.6 }); await a.wait(0.3); }
        },
      });
      acts.push({
        name: '비밀 서가 문', hint: '북쪽 서가 한 칸이 삐걱 돌아 열리며 벽 속 작은 보물 벽감에서 금빛이 새어 나와요', hit: [37, G + 1, 24, 43, G + 8, 26],
        run: async a => {
          await a.turn('sdoor', [0, -1.45, 0], 1.6);
          a.flash('secret', 5, 3.5); a.glow(1.5, 3);
          for (let k = 0; k < 6; k++) { a.burst([40.5, G + 4, 24], { n: 16, colors: ['#ffd860', '#ffffff', '#ff3a5a', '#5ac8ff'], speed: 2, up: 2, life: 1.2, gravity: 0.6, spread: 1.4 }); await a.wait(0.4); }
          await a.wait(1); await a.turn('sdoor', [0, 0, 0], 1.4);
        },
      });
      acts.push({
        name: '천구의', hint: '천구의 고리가 빠르게 돌며 가운데 해가 환하게 빛나요', hit: [OX - 4, G + 1, OZ - 4, OX + 4, G + 8, OZ + 4],
        run: async a => { const sp = async () => { for (let k = 0; k < 8; k++) { a.burst([OX + 0.5, G + 6.5, OZ + 0.5], { n: 8, colors: ['#ffd070', '#ffffff'], speed: 1.2, up: 0.5, life: 0.9, gravity: 0, spread: 1 }); await a.wait(0.45); } }; await Promise.all([a.spin('orrery', 20, 3.8), sp()]); },
      });
      acts.push({
        name: '서재 벽난로', hint: '벽난로에 장작을 넣자 불길이 확 일며 불티가 굴뚝으로 날아올라요', hit: [45, G + 1, 23, 52, G + 8, 27],
        run: async a => { a.flash('hearth', 2.6, 3); for (let k = 0; k < 7; k++) { a.burst([48.5, G + 3, 26.5], { n: 26, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], speed: 2.5, up: 4, life: 1.2, gravity: 2, spread: 1.8 }); a.burst([48.5, TALL + 5, 24.5], { n: 8, colors: ['#ff7a2a', '#ffe08a'], speed: 1, up: 3, life: 1.4, gravity: -0.5, spread: 1 }); await a.wait(0.4); } },
      });
      return { lights, landmarks, acts };
    },
  });
})();
