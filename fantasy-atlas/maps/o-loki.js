// 로키 파밀리아 홈 — 황혼의 저택: 아주 높은 박공 본관에 둥근 탑 여럿이 서로 기대어 붙은 하얀 저택, 본관 오른쪽에 가장 높은 탑, 계단식 박공 현관동과 발코니, 앞뜰 훈련장 (오라리오 북쪽 큰길 끝)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 192, D = 192, Hh = 176, TAU = Math.PI * 2;
  MAPS.push({
    id: 'loki', cat: 'orario', name: '로키 파밀리아 홈', en: 'Loki Familia · Twilight Manor', color: '#c86a4a', seed: 1104, base: 30, time: 'day', size: [W, D, Hh],
    desc: '북쪽 큰길 끝, 프레이야 파밀리아 홈과 도시 정반대편에 선 「황혼의 저택」. 좁은 땅에 높은 탑 여러 개가 서로 기대어 받치듯 솟아 있고, 가운데 탑이 가장 높다. 하늘빛이 도는 하얀 돌벽에 가늘고 뾰족한 고깔지붕, 앞뜰에는 단원들이 땀 흘리는 훈련장이 있다.',
    info: { title: '장소 정보', en: 'ORARIO', rows: [['자리', '북쪽 큰길 끝 · 도시 북쪽'], ['생김새', '서로 기댄 둥근 탑들 · 가운데 탑이 가장 높음'], ['문장', '익살스럽게 웃는 광대 얼굴']] },
    sky: ['#f4dcc0', '#7a90c0', '#ffe8c8'], stars: false,
    hemi: ['#fff4e4', '#5a5040', 0.62], sun: ['#ffeed8', 0.8, [0.45, 1, 0.6]],
    night: { sky: ['#3a2e4a', '#0a0a1a', '#e89a68'], stars: true, hemi: ['#b8a4c4', '#1c1418', 0.38], sun: ['#d8c8f0', 0.28, [0.45, 1, 0.6]], haze: '#2e2a38' },
    liquid: ['#5a8aa8', '#8ac0d8', '#e8f8ff'], liqSpeed: 0.5,
    fog: { start: 0.8, floor: 12, depth: 8, haze: [40, 0.16, 8], hazeColor: '#ece0d4' },
    camY: 34, zoom: 1.0,
    particles: [
      { n: 120, colors: ['#ffffff', '#f4ece0'], mode: 'drift', speed: 0.4, wind: 0.6, y0: 40, y1: 140, glow: false },
      { n: 60, colors: ['#ffd8a0', '#fff0d0'], mode: 'rise', speed: 0.25, area: [96, 66, 8], y0: 130, y1: 170, glow: true },
    ],
    blocks: Object.assign(OR.blocks(), {
      lw: { c: '#e6eae6', v: 0.04, pat: 'big' }, lw2: { c: '#d2d8d4', v: 0.04 }, lBase: { c: '#bcc2bc', v: 0.05, pat: 'stone' }, lTrim: { c: '#f6f8f4', v: 0.02 },
      lRoof: { c: '#b88a70', v: 0.05, pat: 'tile' }, lRoofDk: { c: '#8e6a58', v: 0.04 }, lRoofW: { c: '#d8dcd8', v: 0.04, pat: 'tile' }, lw3: { c: '#d8ccb4', v: 0.05, pat: 'stone' }, winD: { c: '#4e5c6a', v: 0.03 }, lFloor: { c: '#b8ae9a', top: '#cec4b0', v: 0.04, pat: 'check', alt: '#c4baa6' },
      sand: { c: '#c8b088', top: '#d8c09a', v: 0.08 }, hay: { c: '#d8b860', v: 0.08 }, wood: { c: '#7a5a3a', v: 0.05, pat: 'plank' },
      beacon: { c: '#ffd890', glow: true }, torch: { c: '#ff9a3a', glow: true }, rune: { c: '#6ae8a8', glow: true }, runeD: { c: '#3a8a6a', v: 0.04 },
            canvas: { c: '#efe6d0', v: 0.03 }, wheel: { c: '#3e2c22', v: 0.04 }, crate: { c: '#9a7448', v: 0.05, pat: 'plank' }, glassL: { c: '#ffe0a8', night: true, day: '#7a8a9a' },
      wine: { c: '#8a1e3a', v: 0.04 },
    }),
    build(w) {
      const B = w.id, G = w.base;
      const EX0 = 36, EX1 = 156, EZ0 = 26, EZ1 = 126;                 // 담장 안
      const LZ0 = 130, LZ1 = 140, SX0 = 160, SX1 = 172;                 // 앞 골목(동서), 북쪽 큰길(남북)
      MH.terrain(w, { floor: G - 8, height: () => G, surface: () => B.grass, under: (x, z, y, dep) => dep < 2 ? B.soil : B.rock });
      const lights = [], acts = [], landmarks = [];
      const inE = (x, z) => x > EX0 && x < EX1 && z > EZ0 && z < EZ1;
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        let b;
        if (inE(x, z)) b = B.grass;
        else if (x >= SX0 && x <= SX1) b = (x === SX0 || x === SX1) ? B.curb : ((x + z) % 7 === 0 ? B.paveL : B.brick);
        else if (z >= LZ0 && z <= LZ1 && x < SX0) b = (z === LZ0 || z === LZ1) ? B.curb : B.brick;
        else b = hash3(x, 1, z) > 0.85 ? B.stoneG : B.pave;
        w.set(x, G, z, b);
      }

      // ── 둥근 탑: 하얀 돌 원통, 층 띠와 창 기둥, 돌출 띠, 가늘고 뾰족한 고깔지붕 ──
      const towers = [];
      const rtower = (cx, cz, r, top, roofH, o) => {
        o = o || {};
        const R = Math.ceil(r) + 1, nw = o.nw || Math.max(4, Math.round(r * 1.3));
        const isIn = (dx, dz) => dx * dx + dz * dz <= r * r;
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          if (!isIn(dx, dz)) continue;
          const shell = !isIn(dx + 1, dz) || !isIn(dx - 1, dz) || !isIn(dx, dz + 1) || !isIn(dx, dz - 1);
          const f = ((Math.atan2(dz, dx) / TAU * nw + (o.rot || 0)) % 1 + 1) % 1;
          const winCol = shell && Math.abs(f - 0.5) < 0.55 * nw / (r * TAU);
          for (let y = o.y0 || G + 1; y <= top; y++) {
            let b = B.lw2;
            if (shell) {
              const fy = (y - G - 1) % 7;
              b = o.stone ? B.lw3 : B.lw;
              if (y <= G + 3) b = B.lBase;
              else if (fy === 0) b = B.lTrim;
              else if (winCol && fy >= 2 && fy <= 4 && y < top - 3 && y > (o.winFrom || G + 4)) b = hash3(cx + dx, (y - G - 1) / 7 | 0, cz + dz) > 0.72 ? B.win : B.winD;
            }
            w.set(cx + dx, y, cz + dz, b);
          }
        }
        if (o.rings) for (const yy of o.rings) w.ring(cx, cz, yy, r - 0.5, r + 0.8, B.lTrim);
        w.ring(cx, cz, top - 1, r - 0.5, r + 1, B.lTrim);                                      // 내쌓기 띠
        w.ring(cx, cz, top, r - 0.5, r + 1, B.lw);
        let peak = top;
        if (roofH) peak = LB.spire(w, cx, cz, top + 1, r + 1, Math.round(roofH * 1.45), o.white ? B.lRoofW : B.lRoof, { curve: 1, tip: B.gold });
        towers.push({ cx, cz, r, top, peak });
        return peak;
      };

      // ── 박공 날개: 하얀 벽, 창 줄, 45° 지붕. stepped면 박공벽이 층층이 오른다(계단식 박공) ──
      const wing = (x0, x1, z0, z1, top, axis, stepped) => {
        w.box(x0, G + 1, z0, x1, top, z1, B.lw2);
        for (let y = G + 1; y <= top; y++) for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) {
          if (x !== x0 && x !== x1 && z !== z0 && z !== z1) continue;
          const fy = (y - G - 1) % 7, u = (x === x0 || x === x1) ? z : x;
          let b = y <= G + 3 ? B.lBase : B.lw;
          if (fy === 0 && y > G + 1) b = B.lTrim;
          else if (fy >= 2 && fy <= 4 && y < top - 1 && y > G + 3 && u % 5 >= 1 && u % 5 <= 2) b = hash3(u / 5 | 0, (y - G - 1) / 7 | 0, x + z) > 0.7 ? B.win : B.winD;
          if (y === top) b = B.lTrim;
          w.set(x, y, z, b);
        }
        const alongX = axis === 'x', a0 = alongX ? z0 : x0, a1 = alongX ? z1 : x1, ends = alongX ? [x0, x1] : [z0, z1];
        OR.gable(w, x0, x1, z0, z1, top + 1, { axis, run: 1, b: B.lRoof, eave: B.lRoofDk, ridge: B.lRoofDk });
        for (let a = a0; a <= a1; a++) {
          const d = Math.min(a - a0, a1 - a), st = stepped ? top + 2 + Math.floor(d / 2) * 2 : top + d;
          for (const e of ends) for (let y = top + 1; y <= st; y++) {
            const b = stepped && y === st ? B.lTrim : ((Math.abs(a - (a0 + a1) / 2) < 1.5 && y > top + 3 && y < st - 1 && y < top + 8) ? B.win : B.lw);
            if (alongX) w.set(e, y, a, b); else w.set(a, y, e, b);
          }
        }
      };

      // ── 본관: 아주 높은 벽과 가파른 박공지붕. 남쪽 박공벽에 가로 창 띠, 둥근 장식, 꼭대기 아치창 둘 ──
      const HX0 = 76, HX1 = 116, HZ0 = 48, HZ1 = 82, HTOP = G + 52, HC = 96, HALF = (HX1 - HX0) / 2 + 1, RISE = 30;
      const frontWins = [];
      w.box(HX0, G + 1, HZ0, HX1, HTOP, HZ1, B.lw2);
      for (let y = G + 1; y <= HTOP; y++) for (let z = HZ0; z <= HZ1; z++) for (let x = HX0; x <= HX1; x++) {
        if (x !== HX0 && x !== HX1 && z !== HZ0 && z !== HZ1) continue;
        const fy = (y - G - 1) % 7, u = (x === HX0 || x === HX1) ? z - HZ0 : x - HX0;
        let b = y <= G + 3 ? B.lBase : B.lw;
        if (fy === 0 && y > G + 1) b = B.lTrim;
        else if (fy >= 2 && fy <= 5 && y > G + 3 && y < HTOP - 1 && u % 6 >= 2 && u % 6 <= 3) {
          b = hash3(u / 6 | 0, (y - G - 1) / 7 | 0, x + z * 3) > 0.68 ? B.win : B.winD;
          if (z === HZ1 && fy === 3 && u % 6 === 2 && !(x > 82 && x < 110 && y < G + 38)) frontWins.push([x + 1, y, HZ1 + 1.5]);   // 현관동에 가린 창은 뺀다
        }
        if (y === HTOP) b = B.lTrim;
        w.set(x, y, z, b);
      }
      const rTop = x => HTOP + 1 + Math.floor(Math.min(x - (HX0 - 1), (HX1 + 1) - x) * RISE / HALF);
      for (let x = HX0 - 1; x <= HX1 + 1; x++) {
        const t = rTop(x), tn = Math.min(rTop(x - 1), rTop(x + 1)), ridge = Math.abs(x - HC) < 1;
        for (let z = HZ0 - 1; z <= HZ1 + 1; z++) for (let y = HTOP + 1; y <= t; y++) {
          if (z === HZ0 - 1 || z === HZ1 + 1) { if (y >= t - 1) w.set(x, y, z, B.lRoofDk); continue; }   // 박공 처마 테두리
          if ((z === HZ0 || z === HZ1) && x >= HX0 && x <= HX1) {
            const dx = x - HC, yy = y - HTOP;
            let b = y >= t - 1 ? B.lTrim : B.lw;
            if (y === t) b = B.lRoof;
            else if (y < t - 1 && z === HZ1) {
              if (yy >= 3 && yy <= 5 && Math.abs(dx) <= 7) b = Math.abs(dx) % 3 === 1 ? B.lTrim : (hash3(x, 3, 1) > 0.4 ? B.win : B.winD);
              else if ((yy === 2 || yy === 6) && Math.abs(dx) <= 8) b = B.lTrim;
              const rr = Math.hypot(dx, yy - 11);
              if (rr <= 3.4) b = rr > 2.5 ? B.lTrim : (rr < 1 ? B.gold : B.lBase);
              for (const ax of [-3, 3]) if (yy >= 16 && LB.inArch(dx - ax, yy - 16, 1, 4, 'round')) b = B.win;
            } else if (y < t - 1 && Math.abs(dx) <= 1 && yy >= 8 && yy <= 11) b = B.winD;
            w.set(x, y, z, b); continue;
          }
          w.set(x, y, z, (y > tn || y === t) ? (ridge ? B.lRoofDk : B.lRoof) : B.lw2);
        }
      }
      for (const z of [HZ0, HZ1]) { const t = rTop(HC); w.box(HC, t + 1, z, HC, t + 3, z, B.lTrim); w.set(HC, t + 4, z, B.gold); }
      // 본관 정면 발코니(현관동 박공 위): 돌 바닥과 난간, 까치발, 유리문, 술병
      const DZ = HZ1, BAL = G + 43;
      w.box(HC - 8, BAL, DZ + 1, HC + 8, BAL, DZ + 3, B.lTrim);
      for (let x = HC - 8; x <= HC + 8; x++) { w.set(x, BAL + 1, DZ + 3, (x % 2 === 0 || Math.abs(x - HC) === 8) ? B.lTrim : 0); w.set(x, BAL + 2, DZ + 3, B.lTrim); }
      for (const z of [DZ + 1, DZ + 2]) { w.box(HC - 8, BAL + 1, z, HC - 8, BAL + 2, z, B.lTrim); w.box(HC + 8, BAL + 1, z, HC + 8, BAL + 2, z, B.lTrim); }
      for (const x of [HC - 7, HC - 1, HC + 1, HC + 7]) { w.set(x, BAL - 1, DZ + 1, B.lTrim); w.set(x, BAL - 2, DZ + 1, B.lTrim); }
      w.box(HC - 3, BAL + 1, DZ, HC + 3, BAL + 5, DZ, B.glassL);
      w.box(HC - 6, BAL + 1, DZ + 2, HC - 5, BAL + 1, DZ + 2, B.wood); w.box(HC + 5, BAL + 1, DZ + 2, HC + 6, BAL + 1, DZ + 2, B.wood); w.set(HC - 6, BAL + 2, DZ + 2, B.wine); w.set(HC + 6, BAL + 2, DZ + 2, B.wine);
      w.set(HC - 7, BAL + 3, DZ + 2, B.mlamp); w.set(HC + 7, BAL + 3, DZ + 2, B.mlamp);
      lights.push({ name: 'balcony', p: [HC + 0.5, BAL + 3, DZ + 2.5], c: '#ffc880', i: 0.5, d: 18, flicker: 0.2, srcR: 8 });
      acts.push({
        name: '발코니 술잔치', hint: '본관 정면 발코니에 술병이 놓이고, 술 좋아하는 여신 로키의 잔치가 시작돼요', hit: [HC - 8, BAL, DZ + 1, HC + 8, BAL + 4, DZ + 3],
        run: async a => {
          a.flash('balcony', 5, 4);
          for (let k = 0; k < 10; k++) { a.burst([HC - 7 + (k * 7) % 15 + 0.5, BAL + 3, DZ + 2], { n: 14, colors: ['#ffd890', '#e8783a', '#ffffff', '#8a1e3a'], speed: 2.6, up: 4, life: 1.4, gravity: 5, spread: 1 }); await a.wait(0.3); }
        },
      });

      // ── 둘레 건물: 계단식 박공 현관동(앞), 왼쪽 날개, 뒤 날개, 오른쪽 뒤 날개 ──
      wing(86, 106, 82, 102, G + 24, 'z', true);
      wing(52, 76, 60, 88, G + 32, 'z');
      wing(72, 120, 30, 48, G + 38, 'x');
      wing(116, 142, 34, 70, G + 42, 'x');
      const FZ = 102;
      LB.arch(w, { axis: 'x', c: FZ, u0: HC, y0: G + 1, a: 3, h: 7, kind: 'round', fill: B.door, frame: B.lTrim, depth: 1 });
      for (let s = 1; s <= 2; s++) w.box(HC - 4 - s, G, FZ + s, HC + 4 + s, G, FZ + s, B.lTrim);

      // ── 탑들: 본관 모서리와 날개에 붙어 서로 기대듯 솟는다. 가장 높은 탑은 본관 오른쪽 ──
      const vPeak = rtower(96, 32, 5, G + 64, 14);                                              // 뒤 탑(풍향계)
      rtower(70, 52, 5, G + 70, 18, { white: true, rot: 0.2 });                                 // 왼쪽 뒤 흰 탑
      rtower(50, 58, 4, G + 46, 12, { white: true });
      rtower(66, 74, 4.5, G + 54, 14, { rot: 0.4 });
      rtower(144, 38, 3, G + 50, 12, { white: true });                                          // 맨 오른쪽 가는 탑
      rtower(142, 70, 3.5, G + 48, 10);
      rtower(126, 86, 5.5, G + 52, 14, { stone: true, rot: 0.3 });                              // 오른쪽 앞 탑
      rtower(75, 83, 2.5, G + 58, 8, { nw: 4 }); rtower(117, 83, 2.5, G + 58, 8, { nw: 4 });   // 박공 어깨의 작은 탑
      rtower(85, 100, 2.5, G + 30, 7, { nw: 4 }); rtower(107, 100, 2.5, G + 30, 7, { nw: 4 }); // 현관동 양옆
      // 가장 높은 탑: 본관 오른쪽에 반쯤 묻힌 굵은 원통. 위로 한 단 좁아지고 길쭉한 아치창과 톱니 난간으로 끝난다
      const CX = 120, CZ = 62;
      rtower(CX, CZ, 9, G + 96, 0, { nw: 10, rings: [HTOP + 1, G + 76] });
      rtower(CX, CZ, 8, G + 104, 0, { nw: 9, y0: G + 97, winFrom: G + 98 });
      const BY = G + 105;
      for (let y = BY; y <= BY + 11; y++) for (let dz = -9; dz <= 9; dz++) for (let dx = -9; dx <= 9; dx++) {
        const d = Math.hypot(dx, dz);
        if (d > 7.9 || d < 6.8) continue;
        const f = ((Math.atan2(dz, dx) / TAU * 12) % 1 + 1) % 1, u = (f - 0.5) * (7.4 * TAU / 12);
        const open = LB.inArch(Math.round(u), y - BY - 1, 1.1, 7, 'round');
        w.set(CX + dx, y, CZ + dz, open ? 0 : (y === BY + 11 ? B.lTrim : B.lw));
      }
      w.cyl(CX, CZ, BY, BY, 7.9, B.lFloor);
      w.ring(CX, CZ, BY + 12, 6.4, 8.9, B.lTrim);
      for (let dz = -10; dz <= 10; dz++) for (let dx = -10; dx <= 10; dx++) { const d = Math.hypot(dx, dz); if (d <= 8.9 && d > 7.8 && ((Math.round(Math.atan2(dz, dx) / TAU * 26) + 26) % 2 === 0)) w.box(CX + dx, BY + 13, CZ + dz, CX + dx, BY + 14, CZ + dz, B.lw); }
      w.cyl(CX, CZ, BY + 1, BY + 1, 1.6, B.lBase); w.cyl(CX, CZ, BY + 2, BY + 3, 1, B.beacon);   // 전망대 가운데 등불
      w.cyl(CX, CZ, BY + 4, BY + 12, 1.2, B.lw);
      const CTOP = BY + 13;
      lights.push({ name: 'beacon', p: [CX + 0.5, BY + 3, CZ + 0.5], c: '#ffd890', i: 0.7, d: 40, flicker: 0.15, srcR: 3 });
      landmarks.push({ name: '황혼의 저택', note: '로키 파밀리아 홈 · 가장 높은 탑', p: [CX + 0.5, CTOP + 16, CZ + 0.5], boss: true });

      acts.push({
        name: '황혼의 등불', hint: '가장 높은 탑의 아치 전망대에 등불이 켜지며 노을빛이 저택 위로 번져요', hit: [CX - 8, BY, CZ - 8, CX + 8, BY + 14, CZ + 8],
        run: async a => {
          a.flash('beacon', 6, 4); a.glow(1.6, 4);
          for (let k = 0; k < 16; k++) { const t = k / 16 * TAU; a.burst([CX + 0.5 + Math.cos(t) * 9.5, BY + 5, CZ + 0.5 + Math.sin(t) * 9.5], { n: 10, colors: ['#ffd890', '#ff9a5a', '#fff0d0'], speed: 2.4, up: 1, life: 1.4, gravity: -0.2, spread: 0.8 }); await a.wait(0.15); }
        },
      });
      // 풍향계(부품): 뒤 탑 꼭대기
      const vT = vPeak;
      w.box(96, vT, 32, 96, vT + 3, 32, B.iron);
      const vane = w.prop({ name: 'vane', pivot: [96.5, vT + 4, 32.5], speed: 0.4 });
      vane.box(93, vT + 4, 32, 99, vT + 4, 32, B.iron); vane.box(99, vT + 3, 32, 99, vT + 5, 32, B.gold); vane.set(100, vT + 4, 32, B.gold); vane.box(93, vT + 5, 32, 94, vT + 6, 32, B.iron);
      acts.push({
        name: '뒤 탑 풍향계', hint: '뒤쪽 탑의 금빛 풍향계가 바람을 받아 빙글빙글 돌아요', hit: [92, vT + 2, 30, 100, vT + 7, 34],
        run: async a => { a.wind(2.5, 3); await a.spin('vane', 14, 3); },
      });
      // 창마다 불빛: 본관 정면과 탑들의 창에 아래층부터 위층까지 차례로
      lights.push({ name: 'halls', p: [96.5, G + 12, 103.5], c: '#ffd090', i: 0.35, d: 40, flicker: 0.1, srcR: 10 });
      acts.push({
        name: '저택의 창불', hint: '해 질 녘, 본관과 탑의 창에 아래층부터 위층까지 차례로 불이 켜져요', hit: [HC - 3, G + 1, FZ, HC + 3, G + 7, FZ + 2],
        run: async a => {
          a.flash('halls', 4, 5); a.glow(1.4, 5);
          const ux = 0.68, uz = 0.73, o = { n: 6, colors: ['#ffd890', '#fff0c0'], speed: 0.6, up: 0.6, life: 0.9, gravity: 0, spread: 0.5 };
          for (let y = G + 3; y < G + 104; y += 7) {
            for (const [x, wy, z] of frontWins) if (wy >= y && wy < y + 7) a.burst([x, wy, z], o);
            for (const t of towers) if (t.top > y + 2 && t.r >= 4.5 && (t.cx >= 115 || t.cz >= 70)) a.burst([t.cx + 0.5 + ux * (t.r + 0.6), y + 3, t.cz + 0.5 + uz * (t.r + 0.6)], o);
            await a.wait(0.25);
          }
        },
      });

      // ── 앞뜰: 가운데 돌길, 서쪽 훈련장(모래, 허수아비, 횃불, 마법진), 동쪽 정원과 분수 ──
      for (let z = 101; z < EZ1; z++) for (let x = 91; x <= 101; x++) w.set(x, G, z, (x === 91 || x === 101) ? B.lTrim : B.lFloor);
      for (let z = 102; z <= 124; z++) for (let x = 40; x <= 84; x++) w.set(x, G, z, (x === 40 || x === 84 || z === 102 || z === 124) ? B.lTrim : B.sand);
      const dummies = [[50, 110], [58, 116], [50, 120]];
      dummies.forEach(([x, z], k) => {
        const p = w.prop({ name: 'dummy' + k, pivot: [x + 0.5, G + 1, z + 0.5] });
        p.box(x, G + 1, z, x, G + 5, z, B.wood); p.box(x - 2, G + 4, z, x + 2, G + 4, z, B.wood); p.box(x - 1, G + 2, z, x + 1, G + 4, z, B.hay); p.box(x, G + 6, z, x, G + 7, z, B.hay);
      });
      for (const [x, z] of [[42, 104], [82, 104], [42, 122], [82, 122]]) { w.box(x, G + 1, z, x, G + 3, z, B.wood); w.set(x, G + 4, z, B.torch); }
      lights.push({ name: 'torch', p: [62, G + 5, 113], c: '#ff9a4a', i: 0.45, d: 30, flicker: 0.5, srcR: 24 });
      w.box(66, G + 1, 104, 70, G + 3, 104, B.wood);                                                        // 무기 걸이
      for (let x = 66; x <= 70; x += 2) w.box(x, G + 1, 105, x, G + 5, 105, B.iron);
      acts.push({
        name: '앞뜰 훈련장', hint: '모래 훈련장의 허수아비들이 빙그르 돌고, 칼날이 부딪힌 듯 불꽃이 튀어요', hit: [46, G + 1, 107, 62, G + 7, 122],
        run: async a => {
          a.flash('torch', 3, 3);
          for (let k = 0; k < 6; k++) {
            const [x, z] = dummies[k % 3];
            a.turn('dummy' + (k % 3), [0, Math.PI * (k + 1), 0], 0.5);
            a.burst([x + 0.5, G + 4, z + 0.5], { n: 22, colors: ['#ffffff', '#ffe08a', '#a8d8ff'], speed: 5, up: 2, life: 0.5, gravity: 4, spread: 0.6 });
            await a.wait(0.45);
          }
          for (let k = 0; k < 3; k++) { a.unwind('dummy' + k); a.turn('dummy' + k, [0, 0, 0], 0.4); }
        },
      });
      // 마법진: 비취빛 고리와 룬(리베리아의 마법 연습)
      const MCX = 72, MCZ = 114;
      for (let dz = -6; dz <= 6; dz++) for (let dx = -6; dx <= 6; dx++) {
        const d = Math.hypot(dx, dz), th = Math.atan2(dz, dx);
        if ((d > 5 && d <= 6) || (d > 2.6 && d <= 3.4) || (d <= 5 && Math.abs(Math.sin(th * 3)) < 0.12 && d > 3.4)) w.set(MCX + dx, G, MCZ + dz, B.runeD);
      }
      w.set(MCX, G, MCZ, B.rune); for (const [dx, dz] of [[5, 0], [-5, 0], [0, 5], [0, -5]]) w.set(MCX + dx, G, MCZ + dz, B.rune);
      lights.push({ name: 'magic', p: [MCX + 0.5, G + 2, MCZ + 0.5], c: '#6ae8a8', i: 0.3, d: 16, flicker: 0.2, srcR: 3 });
      acts.push({
        name: '비취빛 마법진', hint: '훈련장 마법진에 비취빛이 차오르며 고리 따라 빛이 솟구쳐요', hit: [MCX - 6, G, MCZ - 6, MCX + 6, G + 2, MCZ + 6],
        run: async a => {
          a.flash('magic', 8, 4); a.glow(1.8, 4);
          for (let k = 0; k < 3; k++) { for (let j = 0; j < 12; j++) { const t = j / 12 * TAU + k * 0.3; a.burst([MCX + 0.5 + Math.cos(t) * 5.5, G + 1, MCZ + 0.5 + Math.sin(t) * 5.5], { n: 6, colors: ['#6ae8a8', '#c8ffe8', '#ffffff'], speed: 0.6, up: 6, life: 1.2, gravity: -1, spread: 0.3 }); } await a.wait(0.6); }
          a.burst([MCX + 0.5, G + 2, MCZ + 0.5], { n: 50, colors: ['#6ae8a8', '#ffffff'], speed: 6, up: 1, life: 1, gravity: 0, spread: 0.6, flat: true });
        },
      });
      // 동쪽 정원: 잔디, 꽃밭, 분수, 나무
      const fp = OR.fountain(w, 128, 114, 4.4, B.lTrim, B.stoneG, { h: 4, bowl: 1.6, top: B.gold });
      for (let z = 104; z <= 124; z++) for (let x = 108; x <= 152; x++) { const d = Math.hypot(x - 128, z - 114); if (d > 6.5 && d < 8.5 && hash3(x, 4, z) > 0.3) { w.set(x, G, z, B.soil); w.set(x, G + 1, z, [B.flowerR, B.flowerY, B.flowerW][(x + z) % 3]); } }
      for (const [x, z] of [[112, 106], [146, 106], [112, 122], [146, 122], [150, 92], [40, 92], [40, 70]]) OR.tree(w, B, x, z, { h: 7, r: 3 });
      acts.push({
        name: '정원 분수', hint: '동쪽 정원 분수가 금빛 꼭지에서 물을 뿜어 올려요', hit: [124, G, 110, 132, G + 6, 118],
        run: async a => { for (let k = 0; k < 10; k++) { a.burst(fp, { n: 20, colors: ['#e8f8ff', '#8ac0d8', '#ffffff'], speed: 1.6, up: 6, life: 1.3, gravity: 9, spread: 0.6 }); await a.wait(0.3); } },
      });

      // ── 담장: 북·서는 높고 남·동은 낮다. 남쪽 정문에 둥근 문탑 둘과 철문(부품) ──
      for (let x = EX0; x <= EX1; x++) for (const [z, h] of [[EZ0, 8], [EZ1, 5]]) { if (z === EZ1 && x > 90 && x < 102) continue; w.box(x, G + 1, z, x, G + h - 1, z, B.stoneW2); w.set(x, G + h, z, (x & 1) ? B.lTrim : 0); w.set(x, G + h - 1, z, B.lTrim); }
      for (let z = EZ0; z <= EZ1; z++) for (const [x, h] of [[EX0, 8], [EX1, 5]]) { w.box(x, G + 1, z, x, G + h - 1, z, B.stoneW2); w.set(x, G + h, z, (z & 1) ? B.lTrim : 0); w.set(x, G + h - 1, z, B.lTrim); }
      rtower(88, EZ1, 2.5, G + 12, 6, { nw: 4 }); rtower(104, EZ1, 2.5, G + 12, 6, { nw: 4 });
      const gL = w.prop({ name: 'gateL', pivot: [91, G + 1, EZ1 + 0.5] }), gR = w.prop({ name: 'gateR', pivot: [102, G + 1, EZ1 + 0.5] });
      for (let x = 91; x <= 101; x++) {
        const hgt = 8 - Math.round(Math.abs(x - 96) / 5 * 2) + 1;
        for (let y = G + 1; y <= G + hgt; y++) { if (!(x % 2 === 0 || y === G + 1 || y === G + 4 || y === G + hgt)) continue; (x <= 96 ? gL : gR).set(x, y, EZ1, y === G + hgt ? B.gold : B.iron); }
      }
      const lp1 = OR.lamp(w, B, 86, EZ1 + 3, 5), lp2 = OR.lamp(w, B, 106, EZ1 + 3, 5);
      lights.push({ name: 'gate', p: [(lp1[0] + lp2[0]) / 2, lp1[1], lp1[2]], c: '#fff0c0', i: 0.4, d: 22, flicker: 0.1, srcR: 11 });
      acts.push({
        name: '저택 정문', hint: '둥근 문탑 사이 검은 철문이 양쪽으로 열려요', hit: [91, G + 1, EZ1 - 1, 101, G + 9, EZ1 + 1],
        run: async a => { await Promise.all([a.turn('gateL', [0, 1.5, 0], 1.6), a.turn('gateR', [0, -1.5, 0], 1.6)]); await a.wait(1.6); await Promise.all([a.turn('gateL', [0, 0, 0], 1.4), a.turn('gateR', [0, 0, 0], 1.4)]); },
      });
      // 원정 마차(부품): 앞뜰에서 정문을 지나 골목으로, 큰길로 떠난다
      const WX = 96, WZ0 = 110, WZ1 = 118;
      const wag = w.prop({ name: 'wagon', pivot: [WX + 0.5, G + 1, (WZ0 + WZ1 + 1) / 2] });
      wag.box(WX - 2, G + 2, WZ0, WX + 2, G + 3, WZ1, B.crate);
      for (let z = WZ0 + 1; z <= WZ1 - 1; z++) for (let dx = -3; dx <= 3; dx++) { const y = G + 4 + Math.round(Math.sqrt(Math.max(0, 9 - dx * dx)) * 0.9); wag.set(WX + dx, y, z, z % 3 === 0 ? B.cloth : B.canvas); if (Math.abs(dx) === 3) wag.box(WX + dx, G + 4, z, WX + dx, y, z, B.canvas); }
      for (const z of [WZ0 + 1, WZ1 - 1]) for (const x of [WX - 3, WX + 3]) wag.box(x, G + 1, z - 1, x, G + 3, z + 1, B.wheel);
      wag.box(WX, G + 2, WZ1 + 1, WX, G + 2, WZ1 + 4, B.wood); wag.box(WX - 1, G + 3, WZ0 + 1, WX + 1, G + 4, WZ0 + 2, B.crate);
      acts.push({
        name: '원정 출발', hint: '짐을 실은 원정 마차가 정문을 지나 큰길로 떠나요. 던전 깊은 층으로 가는 원정이에요', hit: [WX - 3, G + 1, WZ0, WX + 3, G + 8, WZ1 + 3],
        run: async a => {
          await Promise.all([a.turn('gateL', [0, 1.5, 0], 1.2), a.turn('gateR', [0, -1.5, 0], 1.2)]);
          await a.path('wagon', [[0, 0, 22], [8, 0, 22, Math.PI / 2], [60, 0, 22, Math.PI / 2]], 4.2);
          await a.tween('wagon', { scl: [0, 0, 0] }, 0.3);
          await a.tween('wagon', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.05);
          await Promise.all([a.tween('wagon', { scl: [1, 1, 1] }, 0.5), a.turn('gateL', [0, 0, 0], 1), a.turn('gateR', [0, 0, 0], 1)]);
        },
      });
      // 이정표: 골목가에서 남쪽 중앙 광장(바벨)으로
      const sp = OR.signpost(w, B, 114, EZ1 + 3, { dir: [1, 0], boards: 1 });
      acts.push(OR.goAct({ at: sp, name: '중앙 광장 · 바벨로', goto: 'babel', hint: '북쪽 큰길을 따라 남쪽으로 내려가면 오라리오 한가운데 중앙 광장과 바벨이 나와요' }));

      // ── 담장 밖 시가지와 가로등 ──
      const placed = [[EX0 - 2, EZ0 - 2, EX1 + 2, EZ1 + 3]];
      OR.fill(w, B, { placed, x0: 3, z0: 3, x1: W - 4, z1: D - 4, tries: 600, floors: [2, 3], ok: (x, z) => x > 2 && z > 2 && x < W - 3 && z < D - 3 && !(z >= LZ0 - 1 && z <= LZ1 + 1 && x < SX1 + 2) && !(x >= SX0 - 1 && x <= SX1 + 1), face: (x, z) => x > SX1 ? 'w' : (z > LZ1 ? 'n' : (x > EX1 ? 'e' : 'w')) });
      for (let z = 8; z < D - 6; z += 14) for (const x of [SX0 - 2, SX1 + 2]) if (!(z >= LZ0 - 2 && z <= LZ1 + 2)) OR.lamp(w, B, x, z, 5);
      return { lights, landmarks, acts };
    },
  });
})();
