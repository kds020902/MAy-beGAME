// 타르코프 거리 · LEXOS 정면 — 프리모르스키 대로(동)와 체칸나야 거리(북) 모퉁이. 긴 2층 높이 유리 전시장 위 북쪽 끝에 물방울 모양 유리탑(흰 띠·검은 유리·합판),
// 동쪽 벽의 로고 기둥과 「LEXOS」 띠 간판, 북동 모퉁이 벽돌 광장, 대로의 전차 선로·불탄 탱크·우랄 트럭, 서쪽 뒷마당과 정비동, 남쪽 정문(AGS 망루·NSV)과 아스펙트 사무동 (128칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 128, D = 128, Hh = 112, G = 20, TAU = Math.PI * 2;
  MAPS.push({
    id: 'lexos', cat: 'tarkov', name: '타르코프 거리', en: 'Streets of Tarkov · LEXOS', color: '#5a8ac8', seed: 601, base: G, time: 'day', size: [W, D, Hh],
    desc: '타르코프 거리, 프리모르스키 대로와 체칸나야 거리 모퉁이의 LEXOS 자동차 대리점. 긴 유리 전시장 북쪽 끝에 흰 띠와 검은 유리가 층층이 감긴 물방울 모양 탑이 솟아 있다. 전쟁이 터지자 카반의 부하들은 수상할 만큼 재빨리 무장해 전시장 유리를 합판과 모래주머니로 막고, 뒷마당 출입구마다 망루와 기관총을 세우고, 길가 풀밭에는 클레이모어를 심었다.',
    info: { title: '구역 정보', en: 'STREETS OF TARKOV', rows: [['자리', '프리모르스키 대로(동) · 체칸나야 거리(북)'], ['건물', '2층 높이 유리 전시장 + 9층 유리탑'], ['주인', '보스 카반과 경호대 (바스마치 · 구스)'], ['방비', '정문마다 AGS 망루 · NSV · 옥상 저격수 · 클레이모어'], ['열쇠', '닫힌 구역 열쇠 · 사장실 열쇠 · 아스펙트 사무실 열쇠']] },
    sky: ['#b4c8dc', '#6a88a8', '#eee6d6'], stars: false,
    hemi: ['#eef0f4', '#4a4a44', 0.62], sun: ['#fff4e2', 0.66, [0.55, 1, 0.45]],
    night: { sky: ['#3a3448', '#0e1220', '#c87850'], stars: false, hemi: ['#a8b0c8', '#18181c', 0.46], sun: ['#ffb488', 0.34, [0.6, 0.8, 0.5]], haze: '#2e3040' },
    liquid: ['#3a4450', '#56667a', '#a8b8cc'], liqSpeed: 0.3,
    fog: { start: 0.93, floor: 12, depth: 8, haze: [8, 0.2, 8], hazeColor: '#b8c0c8' },
    camY: -5, zoom: 1.25,
    particles: [
      { n: 26, colors: ['#5a5a60', '#7a7a80', '#3e3e44'], mode: 'wisp', speed: 0.5, size: 2.4, area: [104, 10, 3], y0: G + 6, y1: G + 26, glow: false },
      { n: 14, colors: ['#ff8a3a', '#ffd060'], mode: 'rise', speed: 0.5, area: [104, 10, 2], y0: G + 4, y1: G + 10, glow: true },
      { n: 70, colors: ['#c8c0a8', '#a8a090', '#e0dccc'], mode: 'drift', speed: 0.3, wind: 0.5, y0: G + 2, y1: G + 40, glow: false },
    ],
    blocks: {
      asph: { c: '#4a4c50', top: '#56585c', v: 0.06 }, asphD: { c: '#3e4044', top: '#484a4e', v: 0.05 }, lane: { c: '#d4d2c8', v: 0.04 }, curb: { c: '#8e8c86', top: '#aaa8a0', v: 0.04 },
      walk: { c: '#86847c', top: '#9c9a92', v: 0.05, pat: 'check', alt: '#928f86' }, pave: { c: '#8e5440', top: '#a8644a', v: 0.06, pat: 'check', alt: '#9a5a44' }, slab: { c: '#6e6c66', top: '#82807a', v: 0.06, pat: 'floor' },
      median: { c: '#8a8880', top: '#a09e96', v: 0.05, pat: 'floor' }, rail: { c: '#9a9aa0', v: 0.03 }, soil: { c: '#4a3e30', v: 0.08 }, concDk: { c: '#5e5a54', v: 0.05, pat: 'stone' },
      grass: { c: '#4e5e30', top: '#66803a', v: 0.12 }, grassT: { c: '#7a8a44', v: 0.14 }, shrub: { c: '#3e5a2e', top: '#4e6e36', v: 0.12 }, leaf: { c: '#4a6e34', top: '#5e8440', v: 0.12 }, trunk: { c: '#4a3a2c', v: 0.05 },
      // 탑: 흰 띠, 짙은 유리, 밝은 반사 유리, 합판, 창틀, 빈 창(어둠)
      tWhite: { c: '#e2e2dc', v: 0.02 }, tGlass: { c: '#2c3a3e', v: 0.03 }, tGlassL: { c: '#5a7078', v: 0.03 }, osb: { c: '#b07a42', v: 0.08, pat: 'plank' }, mull: { c: '#3a3e42', v: 0.02 },
      dark: { c: '#16181a', v: 0.02 }, core: { c: '#34363a', v: 0.03 }, roofM: { c: '#5a5c5e', v: 0.04 }, roofL: { c: '#c4c4be', v: 0.03 },
      // 전시장: 유리, 검은 띠 간판, 로고, 방수포, 철망, 합판
      glass: { c: '#c4e0f4', night: true, day: '#6a8698' }, glassD: { c: '#3a4e5c', v: 0.03 }, fascia: { c: '#2e3034', v: 0.02 }, pylon: { c: '#44474c', v: 0.02 }, silver: { c: '#d4d8dc', v: 0.02 },
      letter: { c: '#f2f4f6', v: 0.01 }, letterG: { c: '#eaf6ff', glow: true }, tarp: { c: '#3e4434', v: 0.05 }, mesh: { c: '#7a7e80', v: 0.06 }, ply: { c: '#c8a878', v: 0.06, pat: 'plank' }, red: { c: '#b8262a', v: 0.03 }, white: { c: '#e8e6e0', v: 0.02 },
      conc: { c: '#a4a29a', v: 0.05, pat: 'big' }, concL: { c: '#c0beb6', v: 0.04 }, drum: { c: '#8e8c86', v: 0.05, pat: 'floor' }, trim: { c: '#d0cec6', v: 0.03 },
      win: { c: '#ffc878', night: true, day: '#3e4a56' }, winDk: { c: '#262c34', v: 0.03 },
      // 주변 건물
      brick: { c: '#8a4636', v: 0.06, pat: 'brick' }, brickL: { c: '#b8a488', v: 0.05 }, plasterY: { c: '#c8b48e', v: 0.04 }, sheet: { c: '#74848a', v: 0.04, pat: 'plank' }, sheetR: { c: '#8a5a3e', v: 0.07, pat: 'plank' }, shutter: { c: '#a0a4a2', v: 0.03, pat: 'log' },
      // 방비·잡동사니
      sand: { c: '#8a7a56', top: '#9a8a64', v: 0.08, pat: 'stone' }, jersey: { c: '#b4b0a4', v: 0.04 }, iron: { c: '#2c2e32', v: 0.03 }, steel: { c: '#5e646c', v: 0.03 }, hazard: { c: '#d0a020', v: 0.03 },
      crate: { c: '#4e5a38', v: 0.05, pat: 'plank' }, wood: { c: '#7a5a3a', v: 0.06, pat: 'plank' }, barrelB: { c: '#2a5a8a', v: 0.05, pat: 'log' }, barrelG: { c: '#4a6a3a', v: 0.05, pat: 'log' },
      contR: { c: '#8a3a2a', v: 0.05, pat: 'plank' }, contB: { c: '#2a5470', v: 0.05, pat: 'plank' }, contG: { c: '#4a5e3a', v: 0.05, pat: 'plank' },
      gun: { c: '#222426', v: 0.02 }, gunG: { c: '#3e4630', v: 0.03 }, clay: { c: '#4a5a30', v: 0.03 }, tire: { c: '#161618', v: 0.02 },
      carW: { c: '#d4d4d0', v: 0.03 }, carK: { c: '#24262a', v: 0.02 }, carS: { c: '#8a9096', v: 0.03 }, carB: { c: '#2a3a56', v: 0.03 }, carGl: { c: '#3a4a5a', v: 0.02 }, char: { c: '#2a2624', v: 0.06 }, rust: { c: '#6a3a22', v: 0.08 },
      headL: { c: '#fff2d0', night: true, day: '#d4d0c0' }, tailL: { c: '#ff3030', night: true, day: '#8a2020' },
      tank: { c: '#3e4232', v: 0.06 }, tankB: { c: '#262620', v: 0.05 }, olive: { c: '#4e5636', v: 0.05 }, canvas: { c: '#5e6444', v: 0.06 },
      fire: { c: '#ff8a2a', glow: true }, fireY: { c: '#ffd060', glow: true }, lampY: { c: '#ffd080', glow: true }, sodium: { c: '#ffb060', night: true, day: '#d8ccaa' },
      redG: { c: '#ff3a3a', glow: true }, blueG: { c: '#4a8aff', glow: true }, signB: { c: '#2a5ab0', v: 0.02 },
      // OR.signpost 재질(쇠기둥, 초록 도로 표지판, 노란 끝, 등)
      stoneG: { c: '#6e6c66', v: 0.04 }, timber: { c: '#4a4e54', v: 0.03 }, door: { c: '#2a6a4a', v: 0.03 }, gold: { c: '#e8c040', v: 0.03 }, mlamp: { c: '#fff0c0', night: true, day: '#e8e2cc' },
    },
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 6, height: () => G, surface: () => B.asph, under: (x, z, y, dep) => dep < 2 ? B.soil : B.concDk });
      const lights = [], acts = [], landmarks = [];
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const H2 = (x, z, k) => hash3(x, k || 0, z);

      // ── 전시장·탑 평면 ──
      const PX0 = 60, PX1 = 94, PZ0 = 22, PZ1 = 100;                       // 전시장
      const NC = [80, 36], SC = [80, 86], CR = 14;                          // 북동·남동 둥근 모서리
      const inPod = (x, z) => {
        if (x < PX0 || x > PX1 || z < PZ0 || z > PZ1) return false;
        if (x > NC[0] && z < NC[1]) return Math.hypot(x - NC[0], z - NC[1]) <= CR + 0.4;
        if (x > SC[0] && z > SC[1]) return Math.hypot(x - SC[0], z - SC[1]) <= CR + 0.4;
        if (x < PX0 + 5 && z < PZ0 + 5) return Math.hypot(x - PX0 - 5, z - PZ0 - 5) <= 5.4;   // 북서 모서리 살짝 둥글게
        return true;
      };
      const TC = [80, 38], TR = 14, TT = [68, 70];                         // 탑: 북쪽은 원, 남서쪽으로 뾰족해지는 물방울
      const tear = new Uint8Array(W * D);
      for (let z = 0; z < D; z++) for (let x = PX0 + 2; x <= PX1; x++) {
        let ok = false;
        for (let t = 0; t <= 1 && !ok; t += 0.02) { const cx = TC[0] + (TT[0] - TC[0]) * t, cz = TC[1] + (TT[1] - TC[1]) * t; if (Math.hypot(x - cx, z - cz) <= TR * (1 - t) + 0.3) ok = true; }
        if (ok && inPod(x, z)) tear[x + W * z] = 1;
      }
      const inT = (x, z) => x >= 0 && z >= 0 && x < W && z < D && tear[x + W * z] === 1;

      // ── 바닥: 대로(동), 체칸나야 거리(북), 남쪽 거리, 인도, 북동 벽돌 광장, 뒷마당 ──
      const RX0 = 100, MX0 = 110, MX1 = 117, CZ1 = 13, SZ0 = 120;
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        let b = B.asph;
        if (x >= RX0) {
          b = H2(x >> 2, z >> 2, 3) > 0.72 ? B.asphD : B.asph;
          if (x >= MX0 && x <= MX1 && z > CZ1 + 1 && z < SZ0 - 1) b = (x === MX0 || x === MX1) ? B.curb : B.median;
          if (x === 111 || x === 113 || x === 114 || x === 116) b = B.rail;
          if ((x === 105 || x === 122) && z % 8 < 4 && z > CZ1 + 1 && z < SZ0 - 1) b = B.lane;
          if (z >= 16 && z <= 20 && x % 3 !== 0 && !(x >= MX0 && x <= MX1)) b = B.lane;                    // 횡단보도
        } else if (z <= CZ1 && z >= 6) {
          b = H2(x >> 2, z >> 2, 4) > 0.75 ? B.asphD : B.asph;
          if (z === 9 && x % 8 < 4) b = B.lane;
          if (x >= 90 && x <= 98 && x % 3 !== 0) b = B.lane;
        } else if (z < 6) b = z === 5 ? B.curb : B.walk;
        else if (z >= SZ0) b = z === SZ0 ? B.curb : (z === 124 && x % 8 < 4 ? B.lane : B.asph);
        else if (x >= 95) b = x === 99 ? B.curb : B.walk;                                                    // 대로 인도
        else if (z <= 21) b = z === 14 ? B.curb : (x >= 82 ? B.pave : B.walk);                              // 북쪽 인도 · 북동 광장
        else if (x >= 82 && !inPod(x, z) && z < 40) b = B.pave;
        else if (x >= 28 && x <= 59 && z >= 16 && z <= 104) b = B.slab;                                      // 뒷마당
        else if (z > 100 && z < SZ0) b = z === 119 ? B.curb : B.walk;
        S(x, G, z, b);
      }
      for (let z = 0; z < D; z += 3) for (const x of [111, 113, 114, 116]) S(x, G - 1, z, B.wood);
      // 물웅덩이
      for (let k = 0; k < 9; k++) {
        const cx = k < 5 ? w.ri(101, 126) : w.ri(4, 90), cz = k < 5 ? w.ri(24, 116) : w.ri(7, 12), r = w.r(1.2, 2.4);
        for (let z = cz - 3; z <= cz + 3; z++) for (let x = cx - 3; x <= cx + 3; x++) if (Math.hypot(x - cx, (z - cz) * 1.4) <= r && w.get(x, G, z) !== B.rail) { S(x, G, z, 0); S(x, G - 1, z, B.asphD); w.liquid(x, z, G - 1); }
      }

      // ── 차: 축 방향 길이 9, 폭 4 ──
      const car = (t, x0, z0, o) => {
        const P = (u, v) => o.axis === 'x' ? [x0 + (o.dir > 0 ? u : 8 - u), z0 + v] : [x0 + v, z0 + (o.dir > 0 ? u : 8 - u)];
        const col = o.wreck ? B.char : o.col, y0 = o.y || G + 1;
        for (let u = 0; u <= 8; u++) for (let v = 0; v <= 3; v++) {
          const [X, Z] = P(u, v), wheel = (u === 1 || u === 2 || u === 6 || u === 7) && (v === 0 || v === 3);
          t.set(X, y0, Z, wheel ? B.tire : (v === 0 || v === 3 ? 0 : col));
          if (wheel) continue;
          t.set(X, y0 + 1, Z, o.wreck && H2(X, 9, Z) > 0.7 ? B.rust : col);
          if (u >= 2 && u <= 6) {
            const pillar = u === 4 && (v === 0 || v === 3);
            t.set(X, y0 + 2, Z, pillar ? col : (o.wreck ? (H2(X, 8, Z) > 0.6 ? col : 0) : B.carGl));
            if (u >= 3 && u <= 5 && !(o.wreck && H2(X, 7, Z) > 0.5)) t.set(X, y0 + 3, Z, col);
          }
        }
        if (!o.wreck) for (const v of [0, 3]) { const [hx, hz] = P(8, v), [tx, tz] = P(0, v); t.set(hx, y0 + 1, hz, B.headL); t.set(tx, y0 + 1, tz, B.tailL); }
        return P;
      };

      // ── 북쪽 배경: 체칸나야 거리 건너 붉은 벽돌 5층 건물(타르방크·감옥 블록) ──
      const brickRow = (x0, x1, top, wall, salt) => {
        w.box(x0, G + 1, 0, x1, top, 4, wall);
        for (let x = x0; x <= x1; x++) for (let y = G + 1; y <= top; y++) {
          const fy = (y - G - 1) % 5, bay = (x - x0) % 5;
          let b = wall;
          if (fy === 0) b = B.brickL;
          else if (y < top - 1 && fy >= 1 && fy <= 3 && (bay === 1 || bay === 2)) b = H2(x >> 1, y, salt) > 0.8 ? B.win : B.winDk;
          if (y <= G + 4 && bay >= 1 && bay <= 3 && (x - x0) % 15 < 5) b = fy === 0 ? B.brickL : B.winDk;
          S(x, y, 4, b);
        }
        w.walls(x0, top + 1, 0, x1, top + 1, 4, B.brickL);
      };
      brickRow(0, 46, G + 25, B.brick, 1); brickRow(50, 92, G + 22, B.plasterY, 2); brickRow(102, 127, G + 20, B.brick, 3);
      for (const x of [47, 48, 49, 93, 94, 95, 96, 97, 98, 99, 100, 101]) for (let z = 0; z <= 4; z++) S(x, G, z, B.walk);

      // ── 정비동(서쪽 뒤): 골함석 벽, 동쪽 마당을 향한 셔터 차고, 평지붕과 저격 둥지 ──
      const GX0 = 6, GX1 = 27, GZ0 = 18, GZ1 = 98, GT = G + 12;
      for (let y = G + 1; y <= GT; y++) for (let z = GZ0; z <= GZ1; z++) for (let x = GX0; x <= GX1; x++) {
        const edge = x === GX0 || x === GX1 || z === GZ0 || z === GZ1;
        if (!edge && y < GT) continue;
        S(x, y, z, y === GT ? B.roofM : y === G + 1 ? B.concDk : (edge && y >= G + 9 && y <= G + 10 && (x + z) % 5 ? B.winDk : (H2(x, y >> 2, z) > 0.86 ? B.sheetR : B.sheet)));
      }
      w.walls(GX0, GT + 1, GZ0, GX1, GT + 1, GZ1, B.concDk);
      for (const [z0, z1, h] of [[30, 37, 8], [44, 51, 4], [58, 65, 8], [72, 79, 6]]) { w.box(GX1, G + 1, z0, GX1, G + 8, z1, 0); w.box(GX1, G + 1 + 8 - h, z0, GX1, G + 8, z1, B.shutter); w.box(GX1 + 1, G + 9, z0 - 1, GX1 + 1, G + 9, z1 + 1, B.steel); for (const z of [z0 - 1, z1 + 1]) w.box(GX1 + 1, G + 1, z, GX1 + 1, G + 8, z, B.hazard); }
      for (let z = GZ0 + 1; z < GZ1; z++) for (let x = GX0 + 1; x < GX1; x++) S(x, G, z, B.slab);
      w.ring(12, 26, GT + 1, 1.5, 3, B.sand); w.ring(12, 26, GT + 2, 1.5, 3, B.sand); w.ring(20, 88, GT + 1, 1.5, 3, B.sand); w.ring(20, 88, GT + 2, 1.5, 3, B.sand);
      landmarks.push({ name: 'LEXOS 정비동', note: '셔터 차고 · 옥상 저격 둥지', p: [16, GT + 8, 58] });

      // ── 전시장(포디움): 2층 높이 통유리, 위에 검은 띠 간판. 유리 안쪽은 철망·방수포·합판, 아래는 모래주머니 ──
      const PT = G + 16, FY0 = G + 11;                                      // 지붕 높이, 띠 간판 시작
      for (let z = PZ0; z <= PZ1; z++) for (let x = PX0; x <= PX1; x++) {
        if (!inPod(x, z)) continue;
        const per = !inPod(x + 1, z) || !inPod(x - 1, z) || !inPod(x, z + 1) || !inPod(x, z - 1);
        S(x, G, z, B.slab); S(x, PT, z, per ? B.trim : B.roofM);
        if (!per) continue;
        const back = x <= PX0 + 1;                                          // 서쪽(마당 쪽)은 막힌 콘크리트 벽
        const a = Math.round((x - PX0) + (z - PZ0) * 1.0);
        for (let y = G + 1; y < PT; y++) {
          let b;
          if (y >= FY0) b = y === PT - 1 ? B.trim : B.fascia;
          else if (back) b = (y === G + 1 ? B.concDk : (y >= G + 7 && y <= G + 8 && z % 6 < 3 ? B.winDk : B.conc));
          else if (a % 4 === 0 || y === G + 1 || y === G + 6) b = B.mull;
          else {
            const pane = H2(a >> 2, y > G + 6 ? 2 : 1, 5);
            if (y <= G + 5) b = pane > 0.72 ? B.ply : pane > 0.62 ? B.osb : pane > 0.56 ? B.sheet : B.glass;   // 아래 칸은 군데군데 합판
            else b = pane > 0.88 ? B.tarp : pane > 0.8 ? B.osb : (pane > 0.5 ? B.glass : B.glassD);
          }
          S(x, y, z, b);
        }
      }
      // 유리 안쪽 철망과 방수포(깨진 칸 뒤로 보인다)
      for (let z = PZ0 + 1; z < PZ1; z++) for (let x = PX0 + 2; x < PX1; x++) {
        if (!inPod(x, z)) continue;
        const nearE = !inPod(x + 2, z) || !inPod(x, z + 2) || !inPod(x, z - 2);
        if (nearE && inPod(x + 1, z) && inPod(x, z + 1) && inPod(x, z - 1)) for (let y = G + 1; y < FY0; y++) S(x, y, z, H2(x, y >> 1, z) > 0.45 ? B.tarp : B.mesh);
      }
      for (const [z0, z1] of [[38, 42], [62, 70], [76, 82]]) for (let z = z0; z <= z1; z++) { S(PX1 + 1, G + 1, z, B.sand); if (z % 3) S(PX1 + 1, G + 2, z, B.sand); }
      // 남쪽 끝 마당 쪽 출입문(셔터)과 서쪽 벽 차고 문
      w.box(PX0, G + 1, 70, PX0 + 1, G + 8, 77, B.shutter); w.box(PX0, G + 1, 46, PX0 + 1, G + 6, 51, B.iron);
      // 북쪽 정면 모래주머니와 표지 합판(「더 가지 마」)
      for (let x = 66; x <= 78; x++) { S(x, G + 1, PZ0 - 1, B.sand); if (x % 3) S(x, G + 2, PZ0 - 1, B.sand); }
      w.box(70, G + 2, PZ0 - 2, 74, G + 4, PZ0 - 2, B.ply); for (const [x, y] of [[71, G + 3], [72, G + 3], [73, G + 3], [71, G + 4], [73, G + 2]]) S(x, y, PZ0 - 3, B.red);

      // 「LEXOS」 글꼴(5줄)
      const FONT = {
        L: ['1000', '1000', '1000', '1000', '1111'], E: ['1111', '1000', '1110', '1000', '1111'], X: ['10001', '01010', '00100', '01010', '10001'],
        O: ['0110', '1001', '1001', '1001', '0110'], S: ['0111', '1000', '0110', '0001', '1110'],
      };
      // 동쪽 띠 간판: 남→북으로 읽힌다(대로에서 보면 왼쪽이 남쪽). 켜진 글자는 부품
      const LX = PX1 + 1, LY = PT - 2;
      const sign = w.prop({ name: 'signL', pivot: [LX + 0.5, FY0 + 2, 76] });
      const letterPx = [];
      let zc = 86;
      for (const ch of 'LEXOS') {
        const f = FONT[ch], wd = f[0].length;
        f.forEach((row, r) => { for (let c = 0; c < wd; c++) if (row[c] === '1') { const z = zc - c, y = LY - r; S(LX - 1, y, z, B.letter); sign.set(LX, y, z, B.letterG); letterPx.push([LX + 0.5, y + 0.5, z + 0.5]); } });
        zc -= wd + 1;
      }
      // 로고 원(Λ)도 띠 간판 남쪽 끝에
      // 로고: 원 안의 Λ (7×7)
      const LOGO = ['..###..', '.#...#.', '#..#..#', '#.#.#.#', '##...##', '.#...#.', '..###..'];
      const logo = (t, x, cy, cz, b) => LOGO.forEach((row, r) => { for (let c = 0; c < 7; c++) if (row[c] === '#') t.set(x, cy + 3 - r, cz + 3 - c, b); });
      lights.push({ name: 'sign', p: [LX + 2, LY - 2, 78], c: '#d4ecff', i: 0.8, d: 30, flicker: 0.04, srcR: 4 });

      // 로고 기둥: 동쪽 벽 앞에 선 짙은 회색 판, 꼭대기 근처 은빛 원 로고
      const QZ0 = 53, QZ1 = 59, QX = PX1 + 1;
      w.box(QX, G + 1, QZ0, QX + 1, PT + 4, QZ1, B.pylon); w.box(QX, PT + 5, QZ0, QX + 1, PT + 5, QZ1, B.trim);
      logo(w, QX + 2, PT - 1, (QZ0 + QZ1) >> 1, B.silver);
      w.box(QX + 2, G + 1, QZ0, QX + 2, G + 3, QZ1, B.ply);
      // 둥근 콘크리트 원통(계단·승강기 통): 탑 앞, 띠 간판보다 낮다
      w.cyl(93, 24, G + 1, G + 13, 3.2, B.drum); w.ring(93, 24, G + 13, 2.2, 3.4, B.trim);

      // ── 유리탑: 층마다 흰 띠 한 줄 + 짙은 유리 세 줄(창틀·빈 창·합판), 안에는 어두운 바닥판과 승강기 심 ──
      const TF = 9, TTOP = PT + TF * 4;
      const tPer = (x, z) => inT(x, z) && (!inT(x + 1, z) || !inT(x - 1, z) || !inT(x, z + 1) || !inT(x, z - 1));
      for (let z = 0; z < D; z++) for (let x = PX0; x <= PX1; x++) {
        if (!inT(x, z)) continue;
        const per = tPer(x, z), col = Math.round((Math.atan2(z - TC[1], x - TC[0]) / TAU + 1) * 64 + (z > TC[1] ? (z - TC[1]) * 0.6 : 0)) % 64;
        for (let y = PT + 1; y <= TTOP; y++) {
          const fy = (y - PT - 1) % 4, fl = (y - PT - 1) >> 2;
          if (fy === 0) { S(x, y, z, per ? B.tWhite : B.concDk); continue; }
          if (!per) { if (Math.hypot(x - 78, z - 44) < 4) S(x, y, z, B.core); continue; }
          const h = H2(col >> 1, fl, 11);
          let b = col % 3 === 0 ? B.mull : h > 0.86 ? B.dark : h > 0.76 ? B.osb : h > 0.5 ? B.tGlass : B.tGlassL;
          if (fy === 3 && col % 3 && h < 0.3) b = B.tGlass;
          S(x, y, z, b);
        }
        // 띠가 한 칸 튀어나와 처마처럼 보이게
        if (per) for (let k = 0; k < TF; k++) for (const [dx, dz] of [[1, 0], [0, -1], [0, 1], [-1, 0]]) { const X = x + dx, Z = z + dz; if (!inT(X, Z) && !w.get(X, PT + 1 + k * 4, Z) && X > PX0 + 1) S(X, PT + 1 + k * 4, Z, B.tWhite); }
      }
      for (let z = 0; z < D; z++) for (let x = PX0; x <= PX1; x++) if (inT(x, z)) S(x, TTOP + 1, z, tPer(x, z) ? B.tWhite : B.roofM);
      // 꼭대기 쇠 난간(띄엄띄엄 기둥), 옥탑방, 안테나, 저격 둥지
      for (let z = 0; z < D; z++) for (let x = PX0; x <= PX1; x++) if (tPer(x, z)) { S(x, TTOP + 3, z, B.steel); if ((x + z) % 3 === 0) S(x, TTOP + 2, z, B.steel); }
      w.box(72, TTOP + 2, 40, 80, TTOP + 5, 48, B.roofL); w.box(72, TTOP + 6, 40, 80, TTOP + 6, 48, B.roofM); w.box(74, TTOP + 3, 48, 76, TTOP + 4, 48, B.iron);
      w.box(84, TTOP + 2, 32, 84, TTOP + 12, 32, B.iron); S(83, TTOP + 9, 32, B.iron); S(85, TTOP + 9, 32, B.iron); S(84, TTOP + 13, 32, B.redG);
      const NX0 = 88, NZ0 = 34;
      w.ring(NX0, NZ0, TTOP + 2, 1.2, 2.6, B.sand); w.ring(NX0, NZ0, TTOP + 3, 1.6, 2.6, B.sand);
      w.box(NX0 + 1, TTOP + 3, NZ0, NX0 + 3, TTOP + 3, NZ0, B.gun); S(NX0, TTOP + 2, NZ0, B.crate);
      lights.push({ name: 'glint', p: [NX0 + 3.5, TTOP + 3.5, NZ0 + 0.5], c: '#ffffff', i: 0, d: 14, flicker: 0, srcR: 3 });
      S(NX0 + 4, TTOP + 3, NZ0, B.lampY);
      landmarks.push({ name: 'LEXOS 유리탑', note: '흰 띠·검은 유리 9층 · 옥상 저격 둥지', p: [TC[0] + 0.5, TTOP + 16, TC[1] + 0.5], boss: true });
      landmarks.push({ name: 'LEXOS 전시장', note: '카반의 본거지 · 합판으로 막은 통유리', p: [PX1 - 4, PT + 8, 76] });
      // 옥상 사이 구름다리(저격수만 오가는 길): 정비동 → 전시장
      for (let x = GX1 + 1; x <= PX0 - 1; x++) {
        const y = GT + 1 + Math.round((x - GX1 - 1) * (PT - GT - 1) / (PX0 - GX1 - 2));
        for (const z of [56, 57]) S(x, y, z, B.steel);
        S(x, y + 2, 55, B.iron); S(x, y + 2, 58, B.iron); if (x % 5 === 0) { S(x, y + 1, 55, B.iron); S(x, y + 1, 58, B.iron); }
      }
      w.box(44, G + 1, 56, 44, G + 14, 56, B.steel); w.box(44, G + 1, 57, 44, G + 14, 57, B.steel);

      // ── 북동 광장: 벽돌 바닥, 높인 화단(관목·키 큰 풀), 광고탑, 가로등, 도로 표지, 낮은 쇠 울타리 ──
      for (let z = 15; z <= 19; z++) for (let x = 86; x <= 96; x++) { const e = z === 15 || z === 19 || x === 86 || x === 96; S(x, G + 1, z, e ? B.curb : B.grass); if (!e && H2(x, 1, z) > 0.5) S(x, G + 2, z, B.grassT); }
      MH.leafBlob(w, 89, G + 3, 17, 1.6, 1.2, 1.4, [B.shrub, B.leaf]); MH.leafBlob(w, 94, G + 3, 17, 1.4, 1.1, 1.3, [B.shrub, B.leaf]);
      w.cyl(84, 30, G + 1, G + 6, 1.6, B.concL); w.box(83, G + 2, 31, 85, G + 5, 31, B.red); w.box(85, G + 2, 29, 85, G + 5, 31, B.hazard); w.cyl(84, 30, G + 7, G + 7, 2, B.iron);  // 광고탑
      const lamp = (x, z, dx, dz, h) => { w.box(x, G + 1, z, x, G + h, z, B.iron); S(x + dx, G + h, z + dz, B.iron); S(x + dx * 2, G + h, z + dz * 2, B.sodium); return [x + dx * 2 + 0.5, G + h - 1, z + dz * 2 + 0.5]; };
      for (const [x, z, dx, dz] of [[98, 14, 1, 0], [98, 44, 1, 0], [98, 84, 1, 0], [98, 112, 1, 0], [40, 14, 0, -1]]) lights.push({ p: lamp(x, z, dx, dz, 10), c: '#ffb060', i: 0.6, d: 18, flicker: 0.05, night: true });
      for (let z = 22; z <= 118; z++) if (z % 12 && !(z >= 44 && z <= 50)) S(99, G + 1, z, z % 2 ? B.iron : 0);                           // 대로 쪽 낮은 쇠 울타리
      for (let x = 82; x <= 98; x++) if (x < 86 || x > 96) S(x, G + 1, 14, x % 2 ? B.iron : 0);
      // 횡단보도 표지(파란 판)와 신호등 기둥
      w.box(99, G + 1, 21, 99, G + 7, 21, B.iron); w.box(99, G + 6, 20, 99, G + 7, 22, B.signB); S(99, G + 7, 21, B.white);
      w.box(99, G + 1, 13, 99, G + 9, 13, B.iron); w.box(100, G + 8, 13, 100, G + 10, 13, B.iron); S(101, G + 9, 13, B.redG);

      // ── 클레이모어 풀밭: 전시장 북쪽과 동쪽 길가. 빨간 「지뢰」 경고판 ──
      for (let x = 62; x <= 80; x++) for (let z = 18; z <= 20; z++) { S(x, G, z, B.grass); if (H2(x, 2, z) > 0.4) S(x, G + 1, z, B.grassT); }
      for (let z = 66; z <= 98; z++) for (let x = 96; x <= 97; x++) { S(x, G, z, B.grass); if (H2(x, 3, z) > 0.45) S(x, G + 1, z, B.grassT); }
      const clays = [[64, 19], [70, 18], [77, 19], [96, 70], [97, 78], [96, 87], [97, 95]];
      for (const [x, z] of clays) { S(x, G + 1, z, B.clay); S(x, G + 2, z, 0); }
      const MSX = 97, MSZ = 82;
      w.box(MSX, G + 1, MSZ, MSX, G + 4, MSZ, B.iron);
      const msign = w.prop({ name: 'msign', pivot: [MSX + 0.5, G + 4, MSZ + 0.5], axis: 'x' });
      msign.box(MSX, G + 5, MSZ - 2, MSX, G + 8, MSZ + 2, B.red); for (const [y, z] of [[G + 7, MSZ - 1], [G + 7, MSZ + 1], [G + 6, MSZ], [G + 7, MSZ]]) msign.set(MSX + 1, y, z, B.white);
      landmarks.push({ name: '클레이모어 풀밭', note: '길가 풀숲의 지향성 지뢰 · 「위험! 지뢰」', p: [96, G + 12, 82] });

      // ── 뒷마당: 컨테이너, 콘크리트 블록, 부서진 차, 통, 상자, 타이어 ──
      const container = (x0, z0, len, axis, b) => {
        const x1 = axis === 'x' ? x0 + len - 1 : x0 + 4, z1 = axis === 'x' ? z0 + 4 : z0 + len - 1;
        w.box(x0, G + 1, z0, x1, G + 5, z1, b); w.walls(x0, G + 5, z0, x1, G + 5, z1, B.iron);
      };
      container(30, 16, 12, 'x', B.contB); container(46, 15, 12, 'x', B.contR); container(32, 40, 12, 'z', B.contG); container(50, 76, 10, 'z', B.contB);
      car(w, 40, 60, { axis: 'z', dir: 1, wreck: true }); car(w, 48, 28, { axis: 'x', dir: -1, col: B.carK }); car(w, 34, 82, { axis: 'z', dir: -1, col: B.carS });
      const jersey = (x, z, axis) => { for (let k = 0; k < 4; k++) { const X = axis === 'x' ? x + k : x, Z = axis === 'x' ? z : z + k; S(X, G + 1, Z, B.jersey); S(X, G + 2, Z, B.jersey); } };
      const bags = (x0, z0, x1, z1, h) => { w.box(x0, G + 1, z0, x1, G + h, z1, B.sand); for (let x = x0; x <= x1; x++) for (let z = z0; z <= z1; z++) if ((x + z) % 3 === 0) S(x, G + h, z, 0); };
      for (const [x, z] of [[54, 44], [55, 45], [54, 46], [38, 92], [56, 64], [57, 65]]) { S(x, G + 1, z, w.pick([B.barrelB, B.barrelG])); S(x, G + 2, z, w.pick([B.barrelB, B.barrelG])); }
      for (const [x, z] of [[30, 70], [31, 71], [30, 72], [56, 92]]) { S(x, G + 1, z, B.tire); S(x, G + 2, z, B.tire); }
      for (const [x, z] of [[52, 52], [53, 52], [52, 53], [46, 88], [47, 88]]) S(x, G + 1, z, B.crate);
      bags(48, 66, 56, 67, 3); jersey(30, 54, 'x'); jersey(38, 74, 'z');

      // ── 북쪽 출입구: 컨테이너 사이 AGS 망루 ──
      const tower = (x0, z0, top) => {
        for (const [px, pz] of [[x0, z0], [x0 + 5, z0], [x0, z0 + 5], [x0 + 5, z0 + 5]]) w.box(px, G + 1, pz, px, top + 6, pz, B.steel);
        for (let y = G + 3; y < top; y += 4) { w.line(x0, y, z0, x0 + 5, y + 3, z0, B.steel); w.line(x0, y, z0 + 5, x0 + 5, y + 3, z0 + 5, B.steel); }
        w.box(x0, top, z0, x0 + 5, top, z0 + 5, B.wood); w.walls(x0, top + 1, z0, x0 + 5, top + 2, z0 + 5, B.sand);
        w.box(x0 - 1, top + 7, z0 - 1, x0 + 6, top + 7, z0 + 6, B.sheet);
      };
      tower(42, 22, G + 12); w.box(44, G + 15, 21, 44, G + 15, 18, B.gun); S(44, G + 14, 22, B.gunG);

      // ── 남쪽 정문: AGS 망루(부품 AGS), 차단기, 콘크리트 블록 지그재그, 모래주머니 ──
      const AX = 32, AZ = 100, AT = G + 13;
      tower(AX, AZ, AT);
      const ags = w.prop({ name: 'ags', pivot: [AX + 2.5, AT + 2, AZ + 3.5], clipOK: 2 });
      ags.set(AX + 2, AT + 1, AZ + 3, B.gunG); ags.box(AX + 2, AT + 2, AZ + 3, AX + 2, AT + 2, AZ + 7, B.gun); ags.set(AX + 3, AT + 2, AZ + 4, B.gunG); ags.set(AX + 2, AT + 3, AZ + 4, B.gun);
      lights.push({ name: 'ags', p: [AX + 2.5, AT + 3, AZ + 7.5], c: '#ffc060', i: 0, d: 16, flicker: 0, srcR: 7 });
      S(AX + 4, AT + 3, AZ + 1, B.lampY);
      w.box(40, G + 1, 104, 40, G + 3, 104, B.hazard);
      const boom = w.prop({ name: 'boom', pivot: [40.5, G + 3.5, 104.5], axis: 'z' });
      for (let x = 41; x <= 54; x++) boom.set(x, G + 3, 104, ((x >> 1) & 1) ? B.red : B.white);
      w.box(55, G + 1, 104, 55, G + 2, 104, B.hazard);
      S(57, G + 4, 103, B.iron); S(57, G + 5, 103, B.redG); S(57, G + 6, 103, B.blueG); w.box(57, G + 1, 103, 57, G + 3, 103, B.iron);
      lights.push({ name: 'gate', p: [57.5, G + 6, 103.5], c: '#ff4a4a', i: 0.3, d: 18, flicker: 0, srcR: 3 });
      jersey(42, 110, 'x'); jersey(50, 114, 'x'); jersey(44, 117, 'x'); bags(28, 106, 31, 107, 2); bags(57, 98, 59, 101, 3);
      // NSV: 마당 안쪽 모래주머니 고리
      const NX = 48, NZ = 94;
      for (let z = NZ - 4; z <= NZ + 4; z++) for (let x = NX - 4; x <= NX + 4; x++) { const d = Math.hypot(x - NX, z - NZ); if (d > 2.6 && d <= 4.2 && !(z < NZ - 2 && Math.abs(x - NX) < 2)) { S(x, G + 1, z, B.sand); S(x, G + 2, z, B.sand); if ((x + z) % 2) S(x, G + 3, z, B.sand); } }
      w.box(NX, G + 1, NZ, NX, G + 3, NZ, B.iron);
      const nsv = w.prop({ name: 'nsv', pivot: [NX + 0.5, G + 4, NZ + 0.5] });
      nsv.box(NX, G + 4, NZ - 2, NX, G + 4, NZ + 1, B.gun); nsv.box(NX, G + 4, NZ + 2, NX, G + 4, NZ + 6, B.iron); nsv.set(NX + 1, G + 4, NZ - 1, B.gunG); nsv.box(NX - 1, G + 5, NZ + 1, NX + 1, G + 5, NZ + 1, B.gunG);
      S(NX + 5, G + 1, NZ - 3, B.iron); S(NX + 5, G + 2, NZ - 3, B.lampY);
      lights.push({ name: 'nsv', p: [NX + 4.5, G + 3, NZ - 2], c: '#ffc060', i: 0.2, d: 16, flicker: 0.1, srcR: 6 });
      landmarks.push({ name: '남쪽 정문', note: 'AGS-30 망루 · NSV · 차단기', p: [AX + 3, AT + 12, AZ + 3] });

      // ── 아스펙트 사무동: 남쪽 작은 2층 회색 상자, 띠창 ──
      w.box(62, G + 1, 104, 80, G + 10, 117, B.concL); w.walls(62, G + 11, 104, 80, G + 11, 117, B.concDk);
      for (const y of [G + 2, G + 3, G + 4, G + 6, G + 7, G + 8]) { for (let u = 63; u <= 79; u++) if (u % 4) S(u, y, 117, H2(u, y, 1) > 0.8 ? B.win : B.winDk); for (let u = 105; u <= 116; u++) if (u % 4) S(80, y, u, H2(u, y, 2) > 0.8 ? B.win : B.winDk); }
      w.box(80, G + 1, 109, 80, G + 4, 111, B.iron); w.box(81, G + 5, 108, 82, G + 5, 112, B.trim);
      landmarks.push({ name: '아스펙트 사무동', note: '아스펙트 회사 사무실 열쇠', p: [71, G + 18, 110] });

      // ── 프리모르스키 대로: 전차 가선, 불탄 탱크(교차로), 우랄 트럭, 불탄 차, 블록, 고슴도치 ──
      const WY = G + 13;
      for (let z = 24; z < SZ0; z += 24) { w.box(113, G + 1, z, 114, G + 1, z, B.concDk); w.box(113, G + 2, z, 113, WY + 1, z, B.steel); for (let x = 111; x <= 116; x++) S(x, WY + 1, z, B.steel); }
      // 탱크: 차체·궤도·포탑, 북서쪽(전시장 쪽)으로 긴 포신, 불타며 연기
      const KX = 102, KZ = 2;
      w.box(KX, G + 1, KZ, KX + 1, G + 2, KZ + 12, B.tankB); w.box(KX + 6, G + 1, KZ, KX + 7, G + 2, KZ + 12, B.tankB);
      w.box(KX, G + 3, KZ, KX + 7, G + 3, KZ + 12, B.tank); w.box(KX + 2, G + 2, KZ + 1, KX + 5, G + 2, KZ + 11, B.tank);
      w.cyl(KX + 4, KZ + 7, G + 4, G + 5, 2.6, B.tank); w.box(KX + 3, G + 6, KZ + 6, KX + 5, G + 6, KZ + 8, B.tank);
      w.line(KX + 3, G + 5, KZ + 5, KX - 6, G + 6, KZ + 13, B.iron);
      for (let k = 0; k < 12; k++) S(w.ri(KX, KX + 7), G + 3 + w.ri(0, 2), w.ri(KZ, KZ + 12), w.pick([B.rust, B.char]));
      for (const [x, y, z] of [[KX + 4, G + 7, KZ + 7], [KX + 3, G + 7, KZ + 8], [KX + 5, G + 6, KZ + 10]]) S(x, y, z, x % 2 ? B.fire : B.fireY);
      lights.push({ name: 'fire', p: [KX + 4.5, G + 8, KZ + 7.5], c: '#ff8a3a', i: 0.6, d: 18, flicker: 0.6, srcR: 3 });
      landmarks.push({ name: '불탄 탱크', note: '체칸나야 교차로 · 연기', p: [KX + 4, G + 14, KZ + 6] });
      // 우랄 트럭(짐칸 국방색 포장)
      const truck = (x0, z0) => {
        for (let u = 0; u <= 12; u++) for (let v = 0; v <= 4; v++) {
          const X = x0 + v, Z = z0 + 12 - u, wheel = [1, 2, 4, 5, 10, 11].includes(u) && (v === 0 || v === 4);
          w.box(X, G + 1, Z, X, G + 2, Z, wheel ? B.tire : (v === 0 || v === 4 ? 0 : B.iron));
          if (u <= 8) { S(X, G + 3, Z, B.olive); const ry = G + 4 + (v === 0 || v === 4 ? 0 : v === 2 ? 3 : 2); for (let y = G + 4; y <= ry; y++) if (v === 0 || v === 4 || y === ry || u === 0) S(X, y, Z, B.canvas); }
          else if (u <= 11) { w.box(X, G + 3, Z, X, G + 5, Z, B.olive); if (u === 11 && v > 0 && v < 4) S(X, G + 5, Z, B.carGl); S(X, G + 6, Z, u >= 10 ? 0 : B.olive); }
          else S(X, G + 3, Z, B.olive);
        }
      };
      truck(120, 34);
      car(w, 102, 62, { axis: 'z', dir: 1, wreck: true }); car(w, 121, 84, { axis: 'z', dir: -1, col: B.carW }); car(w, 102, 96, { axis: 'z', dir: 1, col: B.carB });
      jersey(101, 26, 'x'); jersey(118, 54, 'x'); jersey(104, 108, 'x');
      const hedgehog = (x, z) => { w.line(x - 1, G + 1, z - 1, x + 1, G + 3, z + 1, B.iron); w.line(x + 1, G + 1, z - 1, x - 1, G + 3, z + 1, B.iron); w.line(x, G + 1, z - 1, x, G + 3, z + 1, B.iron); };
      hedgehog(108, 40); hedgehog(124, 72); hedgehog(108, 78);
      // 가로수(여름 잎)
      const tree = (x, z, h) => { w.box(x, G + 1, z, x, G + h, z, B.trunk); MH.leafBlob(w, x, G + h + 1, z, 2.6, 2.2, 2.6, [B.leaf, B.shrub, B.leaf]); };
      for (const [x, z] of [[97, 104], [97, 36], [24, 112], [6, 112], [84, 9]]) tree(x, z, 6);
      // 잔해
      for (let k = 0; k < 30; k++) { const x = w.ri(2, 126), z = w.ri(6, 126); if (w.get(x, G + 1, z) || w.get(x, G, z) === B.rail || inPod(x, z)) continue; if (!(x > 99 || z < 14 || z > SZ0)) continue; S(x, G + 1, z, w.pick([B.concDk, B.conc, B.ply])); }

      // ───── 상호작용 ─────
      // 1) 쇼룸 안으로(하위 지도)
      for (let z = 44; z <= 49; z++) for (let y = G + 1; y <= G + 8; y++) { const jamb = z === 44 || z === 49 || y === G + 8; S(PX1, y, z, jamb ? B.mull : 0); if (!jamb) S(PX1 - 1, y, z, 0); }
      w.box(PX1 + 1, G + 9, 43, PX1 + 2, G + 9, 50, B.trim);
      const sp = OR.signpost(w, B, 99, 47, { dir: [-1, 0], boards: 1, h: 6 });
      acts.push(OR.goAct({ at: sp, name: 'LEXOS 전시장 안으로', goto: 'lexos-in', hint: '모래주머니를 넘어 카반이 지키는 전시장 홀 안으로 들어가요' }));
      lights.push({ name: 'door', p: [PX1 - 2, G + 4, 46.5], c: '#ffd8a0', i: 0.5, d: 14, flicker: 0.15, srcR: 4 });
      S(PX1 - 3, G + 6, 46, B.lampY);
      // 2) 간판 점등
      acts.push({
        name: 'LEXOS 간판 점등', hint: '대로 쪽 검은 띠 간판의 LEXOS 글자가 지지직 깜빡이다 환하게 켜져요', hit: [PX1 - 1, FY0, 64, LX + 1, PT, 94],
        run: async a => {
          for (const [on, t] of [[1, 0.08], [0, 0.3], [1, 0.06], [0, 0.4], [1, 0.12], [0, 0.15]]) { await a.tween('signL', { scl: [1, on ? 1 : 0.02, 1] }, 0.04); if (on) a.burst(letterPx[(Math.random() * letterPx.length) | 0], { n: 12, colors: ['#ffffff', '#bfe0ff', '#ffe080'], speed: 2.5, up: 1, life: 0.6, gravity: 8, spread: 0.4 }); await a.wait(t); }
          await a.tween('signL', { scl: [1, 1, 1] }, 0.3); a.flash('sign', 3, 3); a.glow(1.4, 3);
          for (let k = 0; k < letterPx.length; k += 3) a.burst(letterPx[k], { n: 2, colors: ['#eaf6ff', '#bfe0ff'], speed: 0.8, up: 0.5, life: 1, gravity: 0, spread: 0.3 });
          await a.wait(2.5);
        },
      });
      // 3) AGS 사격: 남쪽 거리로 유탄이 떨어진다
      const SM = ['#6a6a70', '#8a8a90', '#4a4a52', '#a4a4a8'];
      acts.push({
        name: '정문 망루 AGS-30', hint: '남쪽 정문 망루의 AGS 유탄발사기가 돌아가며 거리로 유탄을 퍼부어요. 사수는 보이지 않아요', hit: [AX, AT, AZ, AX + 5, AT + 7, AZ + 5],
        run: async a => {
          await a.turn('ags', [0, -0.5, 0], 0.8);
          for (let k = 0; k < 6; k++) {
            a.flash('ags', 5, 0.1); a.burst([AX + 4, AT + 2.5, AZ + 7], { n: 8, colors: ['#ffe080', '#ff9a3a'], speed: 2, up: 0.5, life: 0.25, gravity: 0, spread: 0.3 });
            await a.wait(0.35);
            const p = [AX + 8 + k * 3, G + 1.5, 121 + (k % 3)];
            a.burst(p, { n: 26, colors: ['#ffd060', '#ff7a2a', '#ffffff'], speed: 5, up: 3, life: 0.5, gravity: 4, spread: 0.6 });
            a.burst(p, { n: 16, colors: SM, speed: 1.6, up: 1.4, life: 2, gravity: -0.3, spread: 1.2 });
          }
          await a.wait(0.6); await a.turn('ags', [0, 0, 0], 0.8);
        },
      });
      // 4) NSV
      acts.push({
        name: 'NSV 기관총 거치대', hint: '마당 안쪽 모래주머니 둥지의 NSV 기관총이 좌우로 돌며 불을 뿜어요. 사수는 보이지 않아요', hit: [NX - 4, G + 1, NZ - 4, NX + 4, G + 6, NZ + 6],
        run: async a => {
          const fire = async th => { for (let k = 0; k < 6; k++) { a.burst([NX + 0.5 + Math.sin(th) * 6.6, G + 4.5, NZ + 0.5 + Math.cos(th) * 6.6], { n: 10, colors: ['#ffe080', '#ff9a3a', '#ffffff'], speed: 3, up: 0.6, life: 0.25, gravity: 0, spread: 0.3 }); a.burst([NX + 1.5, G + 4.5, NZ - 0.5], { n: 2, colors: ['#d8b048'], speed: 1.2, up: 2, life: 0.6, gravity: 9, spread: 0.2 }); a.flash('nsv', 5, 0.08); await a.wait(0.11); } };
          for (const th of [0.6, -0.5, 0.15]) { await a.turn('nsv', [0, th, 0], 0.8); await fire(th); await a.wait(0.3); }
          await a.turn('nsv', [0, 0, 0], 0.8);
        },
      });
      // 5) 클레이모어
      acts.push({
        name: '클레이모어 폭발', hint: '길가 풀숲의 철사가 당겨지며 클레이모어가 번쩍 터지고, 「지뢰」 경고판이 흔들려요', hit: [95, G, 66, 98, G + 8, 98],
        run: async a => {
          const p = [96.5, G + 1.5, 87.5];
          a.burst(p, { n: 10, colors: ['#ffffff'], speed: 6, up: 0, life: 0.15, gravity: 0, spread: 0.2 });
          await a.wait(0.25);
          a.burst(p, { n: 40, colors: ['#fff0a0', '#ff8a2a', '#ffffff'], speed: 7, up: 2, life: 0.45, gravity: 3, spread: 0.6 });
          a.burst(p, { n: 26, colors: ['#5e7040', '#7a8a44', '#4a3e30'], speed: 4, up: 3, life: 1.2, gravity: 8, spread: 1 });
          a.glow(1.6, 0.6);
          const shake = async () => { for (let k = 0; k < 6; k++) { await a.turn('msign', [k % 2 ? 0.55 : -0.55, 0, 0], 0.12); } await a.turn('msign', [0, 0, 0], 0.4); };
          const smoke = async () => { for (let k = 0; k < 10; k++) { a.burst([p[0], G + 2, p[2] - k * 0.2], { n: 14, colors: SM, speed: 1 + k * 0.1, up: 1.2, life: 2.6, gravity: -0.3, spread: 1 + k * 0.15 }); await a.wait(0.25); } };
          await Promise.all([shake(), smoke()]);
          await a.wait(1);
        },
      });
      // 6) 옥상 저격 둥지의 조준경 반짝임
      acts.push({
        name: '탑 옥상 저격 둥지', hint: '유리탑 꼭대기 모래주머니 둥지에서 조준경이 번쩍 빛나고 총구 불꽃이 튀어요', hit: [NX0 - 3, TTOP + 1, NZ0 - 3, NX0 + 4, TTOP + 5, NZ0 + 3],
        run: async a => {
          for (let k = 0; k < 3; k++) { a.flash('glint', 9, 0.18); a.burst([NX0 + 4, TTOP + 3.5, NZ0 + 0.5], { n: 6, colors: ['#ffffff', '#e0f0ff'], speed: 0.6, up: 0, life: 0.3, gravity: 0, spread: 0.2 }); await a.wait(0.7); }
          for (let k = 0; k < 3; k++) {
            a.flash('glint', 6, 0.1); a.burst([NX0 + 4.5, TTOP + 3.5, NZ0 + 0.5], { n: 14, colors: ['#ffe080', '#ff9a3a', '#ffffff'], speed: 3, up: 0.4, life: 0.3, gravity: 0, spread: 0.3 });
            a.burst([118 - k * 4, G + 1.5, 70 + k * 9], { n: 12, colors: ['#c8c0a8', '#8a8478'], speed: 2.5, up: 2, life: 0.6, gravity: 8, spread: 0.3 });
            await a.wait(1.1);
          }
        },
      });
      // 7) 남쪽 차단기
      acts.push({
        name: '남쪽 정문 차단기', hint: '남쪽 정문 경광등이 빨강·파랑으로 번쩍이고 줄무늬 차단기가 올라가요', hit: [40, G + 1, 103, 55, G + 4, 105],
        run: async a => {
          const strobe = async n => { for (let k = 0; k < n; k++) { a.flash('gate', 6, 0.2); a.burst([57.5, G + (k % 2 ? 6.5 : 5.5), 103.5], { n: 10, colors: k % 2 ? ['#4a8aff', '#c0d8ff'] : ['#ff3a3a', '#ffc0c0'], speed: 2, up: 0.4, life: 0.35, gravity: 0, spread: 0.4 }); await a.wait(0.25); } };
          await Promise.all([strobe(16), (async () => { await a.wait(0.6); await a.turn('boom', [0, 0, 1.3], 1.4); await a.wait(1.4); await a.turn('boom', [0, 0, 0], 1.2); })()]);
        },
      });
      // 8) 불타는 탱크
      acts.push({
        name: '불타는 탱크', hint: '교차로의 불탄 탱크에서 남은 탄이 터지며 불길과 검은 연기가 치솟아요', hit: [KX, G + 1, KZ, KX + 7, G + 7, KZ + 12],
        run: async a => {
          for (let k = 0; k < 5; k++) {
            a.flash('fire', 7, 0.3);
            a.burst([KX + 4.5, G + 7, KZ + 7.5], { n: 22, colors: ['#ffd060', '#ff7a2a', '#ffffff'], speed: 4, up: 4, life: 0.6, gravity: 4, spread: 0.8 });
            a.burst([KX + 4.5, G + 8, KZ + 7.5], { n: 20, colors: ['#2a2a2e', '#4a4a50', '#3a3a3e'], speed: 1.2, up: 3, life: 3, gravity: -0.6, spread: 1.4 });
            await a.wait(0.6);
          }
          await a.wait(1.5);
        },
      });

      return { lights, landmarks, acts };
    },
  });
})();
