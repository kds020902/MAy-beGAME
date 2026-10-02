// 타르코프 거리 · LEXOS — 프리모르스키 대로(동)와 체칸나야 거리(북) 모퉁이의 자동차 대리점: 남쪽 끝에 원통형 유리탑을 얹은 유리 전시장,
// 동쪽 벽의 「LEXOS」 간판, 서쪽 정비동 차고, 카반 일당이 요새로 바꾼 마당(모래주머니·NSV·망루), 대로의 전차 선로·군 차량 검문·버려진 탱크 (144칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 144, D = 144, Hh = 112, G = 20, TAU = Math.PI * 2;
  MAPS.push({
    id: 'lexos', cat: 'tarkov', name: '타르코프 거리', en: 'Streets of Tarkov · LEXOS', color: '#5a8ac8', seed: 601, base: G, time: 'night', size: [W, D, Hh],
    desc: '타르코프 거리, 프리모르스키 대로와 체칸나야 거리 모퉁이의 LEXOS 자동차 대리점. 남쪽 끝에는 깨진 유리띠가 층층이 감긴 원통형 탑이 솟아 있다. 전쟁이 터지자 카반의 부하들은 수상할 만큼 재빨리 무장해 유리 전시장과 정비동을 요새로 바꿨다. 옥상에는 저격 둥지, 출입구마다 망루와 기관총, 풀밭에는 클레이모어가 숨어 있다.',
    info: { title: '구역 정보', en: 'STREETS OF TARKOV', rows: [['자리', '프리모르스키 대로(동) · 체칸나야 거리(북)'], ['이웃', '서쪽 스파르야 식료품점 · 남쪽 라즈베드치코프 거리'], ['주인', '보스 카반과 경호대 (바스마치 · 구스)'], ['방비', 'NSV 기관총 · AGS 유탄발사기 · 옥상 저격수 · 클레이모어'], ['소문', '전쟁 전부터 경찰과 손잡은 회색지대 사업가']] },
    sky: ['#5a4050', '#141824', '#e07850'], stars: false,
    hemi: ['#b4bcd4', '#1c1c22', 0.6], sun: ['#ffb488', 0.5, [0.7, 0.8, 0.5]],
    day: { sky: ['#c8ccd0', '#7a8696', '#ece4d4'], stars: false, hemi: ['#eceef4', '#4a4a48', 0.6], sun: ['#f4eee0', 0.62, [0.5, 1, 0.6]], haze: '#a0a6ae' },
    liquid: ['#262e38', '#3a4656', '#8a9cb4'], liqSpeed: 0.3,
    fog: { start: 0.8, floor: 12, depth: 8, haze: [6, 0.22, 8], hazeColor: '#3a3c4c' },
    camY: 10, zoom: 1.2,
    particles: [
      { n: 240, colors: ['#8a98ac', '#c0c8d6'], mode: 'fall', speed: 2.4, wind: 0.8, y0: G, y1: G + 70, glow: false },
      { n: 30, colors: ['#ff8a3a', '#ffd060'], mode: 'rise', speed: 0.5, area: [18, 123, 2], y0: G + 3, y1: G + 16, glow: true },
      { n: 24, colors: ['#4a4a52', '#6a6a72'], mode: 'wisp', speed: 0.5, size: 2, y0: G + 14, glow: false },
    ],
    blocks: {
      asph: { c: '#34363a', top: '#3e4044', v: 0.06 }, asphW: { c: '#2e3238', top: '#363c44', v: 0.05 }, lane: { c: '#b4ae98', v: 0.05 }, laneY: { c: '#c09a3a', v: 0.05 },
      curb: { c: '#86847e', top: '#a09e96', v: 0.04 }, walk: { c: '#6e6c66', top: '#86847c', v: 0.05, pat: 'check', alt: '#7c7a72' },
      slab: { c: '#5e5c58', top: '#727068', v: 0.06, pat: 'floor' }, grassD: { c: '#3e4030', top: '#545434', v: 0.14 }, soil: { c: '#3e342a', v: 0.08 },
      rail: { c: '#8a8a90', v: 0.03 }, sleeper: { c: '#3e3028', v: 0.05 },
      conc: { c: '#94908a', v: 0.05, pat: 'big' }, concDk: { c: '#5e5a54', v: 0.05, pat: 'stone' }, trimW: { c: '#c8c6be', v: 0.03 },
      panel: { c: '#a29c90', v: 0.04 }, panelB: { c: '#7e8a8c', v: 0.04 }, panelR: { c: '#9a7a62', v: 0.05, pat: 'brick' }, seam: { c: '#6a665e', v: 0.03 },
      win: { c: '#ffc878', night: true, day: '#3a4652' }, winS: { c: '#a8e0d0', night: true, day: '#3a5056' }, winDk: { c: '#262c34', v: 0.03 }, burnt: { c: '#1e1a18', v: 0.04 },
      glass: { c: '#c4e4ff', night: true, day: '#6a8ea8' }, glassD: { c: '#24405a', v: 0.03 }, mull: { c: '#34383e', v: 0.02 }, tileW: { c: '#b8bab6', top: '#cccec8', v: 0.03, pat: 'check', alt: '#a4a6a2' },
      sheet: { c: '#74848a', v: 0.04, pat: 'plank' }, sheetR: { c: '#8a5a3e', v: 0.07, pat: 'plank' }, shutter: { c: '#9a9e9c', v: 0.03, pat: 'log' }, roofM: { c: '#4e5254', v: 0.05 },
      signBd: { c: '#16243e', v: 0.02 }, signDk: { c: '#3a4658', v: 0.02 }, signLit: { c: '#eaf6ff', glow: true }, red: { c: '#b8222a', v: 0.03 }, white: { c: '#e4e2dc', v: 0.02 },
      redG: { c: '#ff3a3a', glow: true }, blueG: { c: '#4a8aff', glow: true }, hazard: { c: '#d0a020', v: 0.03 }, black: { c: '#18181a', v: 0.02 },
      sand: { c: '#857650', top: '#968660', v: 0.08, pat: 'stone' }, jersey: { c: '#aaa69a', v: 0.04 }, iron: { c: '#2c2e32', v: 0.03 }, steel: { c: '#5a6068', v: 0.03 },
      carR: { c: '#a42428', v: 0.03 }, carW: { c: '#d4d4d0', v: 0.03 }, carB: { c: '#22324e', v: 0.03 }, carK: { c: '#202226', v: 0.02 }, carS: { c: '#868c94', v: 0.03 }, carG: { c: '#4a5a3a', v: 0.04 },
      carGl: { c: '#3a4a5a', v: 0.02 }, tire: { c: '#141416', v: 0.02 }, rust: { c: '#6a3a22', v: 0.08 }, char: { c: '#262220', v: 0.06 },
      headL: { c: '#fff2d0', night: true, day: '#d4d0c0' }, tailL: { c: '#ff3030', night: true, day: '#8a2020' }, fire: { c: '#ff8a2a', glow: true }, fireY: { c: '#ffd060', glow: true },
      lampY: { c: '#ffd080', glow: true }, sodium: { c: '#ffb060', night: true, day: '#d8c8a0' }, green: { c: '#3aff6a', glow: true }, greenD: { c: '#2a5a34', v: 0.03 },
      contR: { c: '#8a3a2a', v: 0.05, pat: 'plank' }, contB: { c: '#2a5470', v: 0.05, pat: 'plank' }, contG: { c: '#4a5e3a', v: 0.05, pat: 'plank' },
      wood: { c: '#7a5a3a', v: 0.06, pat: 'plank' }, crate: { c: '#4a5636', v: 0.05, pat: 'plank' }, barrelB: { c: '#2a4a7a', v: 0.05, pat: 'log' }, barrelR: { c: '#8a2a22', v: 0.05, pat: 'log' },
      gun: { c: '#222426', v: 0.02 }, gunG: { c: '#3e4630', v: 0.03 }, clay: { c: '#4a5a30', v: 0.03 }, 
      tramB: { c: '#2a62b0', v: 0.04 }, tramW: { c: '#d8dce0', v: 0.03 }, median: { c: '#8a8880', top: '#9e9c94', v: 0.05, pat: 'floor' }, brickP: { c: '#8a4e3a', top: '#a05c44', v: 0.06, pat: 'check', alt: '#8e5440' },
      plasterY: { c: '#c4ae8a', v: 0.04 }, plasterP: { c: '#b89486', v: 0.04 }, store: { c: '#d4d2cc', v: 0.03 }, olive: { c: '#4e5636', v: 0.05 }, canvas: { c: '#5a6040', v: 0.06 }, taxi: { c: '#e0b020', v: 0.03 }, tank: { c: '#4a5034', v: 0.06 },
      tower: { c: '#c4c2ba', v: 0.03 }, tGlass: { c: '#262a30', v: 0.03 }, trunk: { c: '#3a2e26', v: 0.05 },
    },
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 6, height: () => G, surface: () => B.asph, under: (x, z, y, dep) => dep < 2 ? B.soil : B.concDk });
      const lights = [], acts = [], landmarks = [];
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const H2 = (x, z, k) => hash3(x, k || 0, z);

      // ── 바닥: 동쪽 큰길(전차 선로), 남쪽 거리, 인도, 단지 안 콘크리트 마당 ──
      const RX0 = 113, RX1 = 139, RZ0 = 115, RZ1 = 137;
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        let b = B.asph;
        const eastRd = x >= RX0 && x <= RX1, southRd = z >= RZ0 && z <= RZ1;
        if (eastRd || southRd) {
          b = H2(x >> 2, z >> 2, 3) > 0.7 ? B.asphW : B.asph;
          if (eastRd && !southRd && (x === 126) && z % 8 < 4) b = B.lane;
          if (southRd && !eastRd && z === 126 && x % 8 < 4) b = B.lane;
          if (southRd && !eastRd && x >= 100 && x <= 110 && z % 3 !== 0 && z > RZ0 && z < RZ1) b = B.lane;        // 횡단보도
          if (eastRd && !southRd && x >= 120 && x <= 132) b = (x === 120 || x === 132) ? B.curb : B.median;          // 전차 선로 중앙 분리대
          if (eastRd && (x === 122 || x === 125 || x === 127 || x === 130)) b = B.rail;
        } else if ((x >= 110 && x <= 112) || (z >= 111 && z <= 114)) b = (x === 112 || z === 114) ? B.curb : B.brickP;  // 전시장 앞 벽돌 광장
        else if (x >= 140 || z >= 138) b = (x === 140 || z === 138) ? B.curb : B.walk;
        else if (x >= 23 && x <= 108 && z >= 26 && z <= 109) b = B.slab;
        else if (z >= 14 && z <= 25) b = (z === 14 || z === 24) ? B.curb : z === 25 ? B.walk : (z === 19 && x % 8 < 4 ? B.lane : B.asph);   // 체칸나야 거리
        else if (x >= 19 && x <= 22) b = B.walk;
        S(x, G, z, b);
      }
      for (let z = 0; z < D; z += 3) for (const x of [122, 125, 127, 130]) if (!(z >= RZ0 && z <= RZ1)) S(x, G - 1, z, B.sleeper);
      // 물웅덩이(젖은 아스팔트)
      for (let k = 0; k < 16; k++) {
        const cx = k < 8 ? w.ri(114, 138) : w.ri(4, 108), cz = k < 8 ? w.ri(4, 110) : w.ri(117, 136), r = w.r(1.2, 2.6);
        for (let z = cz - 3; z <= cz + 3; z++) for (let x = cx - 3; x <= cx + 3; x++) if (Math.hypot(x - cx, (z - cz) * 1.4) <= r && w.get(x, G, z) !== B.rail) { S(x, G, z, 0); S(x, G - 1, z, B.asphW); w.liquid(x, z, G - 1); }
      }

      // ── 차: 축 방향 길이 9, 폭 4. o = { axis:'x'|'z', dir, col, wreck, low } ──
      const car = (t, x0, z0, o) => {
        const P = (u, v) => o.axis === 'x' ? [x0 + (o.dir > 0 ? u : 8 - u), z0 + v] : [x0 + v, z0 + (o.dir > 0 ? u : 8 - u)];
        const col = o.wreck ? B.char : o.col, y0 = o.y || G + 1;
        for (let u = 0; u <= 8; u++) for (let v = 0; v <= 3; v++) {
          const [X, Z] = P(u, v), wheel = (u === 1 || u === 2 || u === 6 || u === 7) && (v === 0 || v === 3);
          t.set(X, y0, Z, wheel ? (o.wreck && u > 5 ? 0 : B.tire) : (v === 0 || v === 3 ? 0 : col));
          if (wheel && !(o.wreck && u > 5)) continue;
          t.set(X, y0 + 1, Z, o.wreck && H2(X, 9, Z) > 0.7 ? B.rust : col);
          if (u >= 2 && u <= 6) {
            const pillar = u === 4 && (v === 0 || v === 3);
            t.set(X, y0 + 2, Z, pillar ? col : (o.wreck ? (H2(X, 8, Z) > 0.6 ? col : 0) : B.carGl));
            if (!o.low && u >= 3 && u <= 5 && !(o.wreck && H2(X, 7, Z) > 0.5)) t.set(X, y0 + 3, Z, col);
          }
        }
        if (!o.wreck) { for (const v of [0, 3]) { const [hx, hz] = P(8, v), [tx, tz] = P(0, v); t.set(hx, y0 + 1, hz, B.headL); t.set(tx, y0 + 1, tz, B.tailL); } }
        return P;
      };

      // ── 패널 아파트: 북·서쪽의 높은 벽. face 's' = 남쪽(z1)을 향함, 'e' = 동쪽(x1)을 향함 ──
      const apt = (x0, z0, x1, z1, top, face, wall, salt) => {
        w.box(x0, G + 1, z0, x1, top, z1, wall);
        const n = face === 's' ? [x0, x1] : [z0, z1];
        for (let u = n[0]; u <= n[1]; u++) for (let y = G + 1; y <= top; y++) {
          const fy = (y - G - 1) % 5, fl = (y - G - 1) / 5 | 0, X = face === 's' ? u : x1, Z = face === 's' ? z1 : u, OX = face === 's' ? 0 : 1, OZ = face === 's' ? 1 : 0;
          let b = fy === 0 ? B.seam : wall;
          const bay = (u - n[0]) % 4, h = H2(u >> 2, fl, salt);
          if (fl === 0) {
            if (fy >= 1 && fy <= 3 && (u - n[0]) % 9 >= 1 && (u - n[0]) % 9 <= 7) b = H2(u / 9 | 0, 1, salt) > 0.5 ? B.winS : B.winDk;
            if (fy === 4) b = [B.red, B.greenD, B.contB, B.hazard][(H2(u / 9 | 0, 2, salt) * 4) | 0];
          } else if (y < top - 1 && fy >= 1 && fy <= 3 && (bay === 1 || bay === 2)) b = h > 0.93 ? B.burnt : h > 0.74 ? B.win : B.winDk;
          S(X, y, Z, b);
          // 발코니: 층마다 몇 칸, 바닥판과 난간
          if (fl >= 1 && y < top - 2 && ((u - n[0]) >> 2) % 3 === (fl + salt) % 3) {
            if (fy === 0) S(X + OX, y, Z + OZ, B.conc);
            if (fy === 1) S(X + OX, y, Z + OZ, bay === 0 ? B.conc : B.iron);
            if (fy === 2 && h > 0.6) S(X + OX, y, Z + OZ, B.panelB);
          }
        }
        w.walls(x0 - 1, top, z0 - 1, x1 + 1, top, z1 + 1, B.trimW); w.walls(x0, top + 1, z0, x1, top + 1, z1, B.concDk);
        for (let k = 0; k < 3; k++) { const vx = w.ri(x0 + 2, x1 - 5), vz = w.ri(z0 + 2, z1 - 4); w.box(vx, top + 1, vz, vx + 2, top + 3, vz + 2, B.concDk); }
        const ax = face === 's' ? w.ri(x0 + 4, x1 - 4) : x0 + 4, az = face === 's' ? z0 + 4 : w.ri(z0 + 4, z1 - 4);
        w.box(ax, top + 1, az, ax, top + 9, az, B.iron); S(ax + 1, top + 7, az, B.iron); S(ax - 1, top + 7, az, B.iron); S(ax, top + 10, az, B.redG);
      };
      apt(2, 2, 52, 13, G + 30, 's', B.plasterY, 1);
      apt(57, 2, 108, 13, G + 34, 's', B.plasterP, 2);
      apt(113, 0, 143, 3, G + 30, 's', B.plasterY, 3);
      // 서쪽 스파르야 식료품점: 낮은 흰 상자, 동쪽 통유리와 빨간 간판
      w.box(2, G + 1, 28, 17, G + 9, 106, B.store); w.walls(2, G + 10, 28, 17, G + 10, 106, B.concDk); w.box(2, G + 1, 28, 17, G + 1, 106, B.concDk);
      for (let z = 30; z <= 104; z++) { for (let y = G + 2; y <= G + 5; y++) S(17, y, z, z % 6 === 0 ? B.mull : (H2(z >> 2, 3, 9) > 0.8 ? B.winDk : B.winS)); S(18, G + 7, z, B.red); S(18, G + 8, z, B.red); if (z % 14 < 9 && z % 2 === 0) S(19, G + 7 + (z % 4 === 0 ? 1 : 0), z, B.white); }
      for (const [x, z] of [[6, 40], [10, 70], [6, 95]]) w.box(x, G + 11, z, x + 3, G + 12, z + 3, B.steel);

      // ── LEXOS 정비동: 골함석 벽, 동쪽 마당을 향한 셔터 차고 셋, 평지붕 ──
      const MX0 = 24, MX1 = 47, MZ0 = 30, MZ1 = 84, MT = G + 13;
      for (let y = G + 1; y <= MT; y++) for (let z = MZ0; z <= MZ1; z++) for (let x = MX0; x <= MX1; x++) {
        const edge = x === MX0 || x === MX1 || z === MZ0 || z === MZ1;
        if (!edge && y < MT) continue;
        let b = y <= G + 1 ? B.concDk : (H2(x, y >> 2, z) > 0.86 ? B.sheetR : B.sheet);
        if (y === MT) b = B.roofM;
        else if (edge && y >= G + 10 && y <= G + 11 && (x + z) % 5 !== 0) b = B.winDk;
        S(x, y, z, b);
      }
      w.walls(MX0, MT + 1, MZ0, MX1, MT + 1, MZ1, B.concDk);
      for (let z = MZ0 + 4; z < MZ1 - 3; z += 8) w.box(30, MT + 1, z, 41, MT + 1, z + 2, B.winS);                    // 천창
      for (const [x, z] of [[27, 44], [44, 60], [27, 70]]) { w.box(x, MT + 1, z, x + 1, MT + 2, z + 1, B.steel); S(x, MT + 3, z, B.iron); }
      w.line(44, MT + 1, 33, 44, MT + 1, 52, B.iron);
      for (let z = MZ0 + 1; z < MZ1; z++) for (let x = MX0 + 1; x < MX1; x++) S(x, G, z, B.slab);
      // 차고 셔터: 1번 닫힘, 3번 반쯤 열림, 2번은 움직이는 부품
      const doorZ = [[42, 49], [54, 61], [66, 73]];
      for (const [z0, z1] of doorZ) { w.box(MX1, G + 1, z0, MX1, G + 8, z1, 0); w.box(MX1 + 1, G + 9, z0 - 1, MX1 + 1, G + 9, z1 + 1, B.steel); for (const z of [z0 - 1, z1 + 1]) w.box(MX1 + 1, G + 1, z, MX1 + 1, G + 8, z, B.hazard); }
      w.box(MX1, G + 1, 42, MX1, G + 8, 49, B.shutter);
      w.box(MX1, G + 5, 54, MX1, G + 8, 61, B.shutter);
      const sh = w.prop({ name: 'shutter', pivot: [MX1 + 0.5, G + 9, 70] });
      sh.box(MX1, G + 1, 66, MX1, G + 8, 73, B.shutter); sh.box(MX1, G + 1, 66, MX1, G + 1, 73, B.steel);
      // 정비동 안: 리프트 위 차, 공구 선반, 작업등
      w.box(36, G + 1, 56, 44, G + 1, 56, B.hazard); w.box(36, G + 1, 59, 44, G + 1, 59, B.hazard);
      w.box(26, G + 1, 32, 26, G + 6, 82, B.wood);
      for (let z = 34; z < 82; z += 3) S(27, G + 3, z, w.pick([B.barrelR, B.crate, B.steel]));
      S(40, MT - 1, 70, B.lampY); S(40, MT - 1, 57, B.lampY);
      lights.push({ name: 'garage', p: [41.5, G + 10, 70.5], c: '#ffd8a0', i: 0.8, d: 22, flicker: 0.1, srcR: 3 });
      // 간판: 파란 띠에 흰 글자 자리
      w.box(MX1 + 1, G + 11, 40, MX1 + 1, G + 12, 76, B.signBd);
      for (let z = 44; z < 74; z += 3) S(MX1 + 1, G + 11 + (z % 2), z, B.white);
      landmarks.push({ name: 'LEXOS 정비동', note: '셔터 차고 셋 · 옥상 저격 둥지', p: [36, MT + 10, 57] });

      // ── LEXOS 전시장: 남·동쪽은 통유리, 남동 모서리는 둥글게. 1층 유리는 불 켜진 전시장, 2층은 짙은 유리 ──
      const SX0 = 66, SX1 = 99, SZ0 = 32, SZ1 = 78, CR = 9, CCX = SX1 - CR, CCZ = SZ1 - CR, R = G + 17;
      const inFp = (x, z) => x >= SX0 && x <= SX1 && z >= SZ0 && z <= SZ1 && !(x > CCX && z > CCZ && Math.hypot(x - CCX, z - CCZ) > CR + 0.4);
      for (let z = SZ0; z <= SZ1; z++) for (let x = SX0; x <= SX1; x++) {
        if (!inFp(x, z)) continue;
        const per = !inFp(x + 1, z) || !inFp(x - 1, z) || !inFp(x, z + 1) || !inFp(x, z - 1);
        S(x, G, z, B.tileW);
        S(x, G + 9, z, per ? B.trimW : B.concDk); S(x, R, z, per ? B.trimW : B.roofM);
        if (!per) continue;
        const glassy = z > 70 || x > 93, mull = (x + z) % 4 === 0;
        for (let y = G + 1; y <= R + 1; y++) {
          let b = B.conc;
          if (y === G + 9 || y === R) b = B.trimW;
          else if (y === R + 1) b = B.concDk;
          else if (glassy) {
            const pane = H2((x + z) >> 2, y > G + 9 ? 2 : 1, 5);
            if (mull) b = B.mull;
            else if (y <= G + 8) b = y === G + 1 ? B.mull : (pane > 0.86 ? 0 : pane > 0.76 ? B.wood : B.glass);
            else b = y === G + 10 ? B.mull : (pane > 0.7 ? B.glass : B.glassD);
          } else if (y >= G + 3 && y <= G + 6 && (x + z) % 6 < 2) b = B.winDk;
          else if (y >= G + 12 && y <= G + 14 && (x + z) % 6 < 2) b = H2(x, 6, z) > 0.7 ? B.win : B.winDk;
          S(x, y, z, b);
        }
      }
      // 남쪽 정문: 유리 자동문은 열려 있고, 앞에 모래주머니
      w.box(77, G + 1, SZ1, 82, G + 6, SZ1, 0); w.box(76, G + 7, SZ1 + 1, 83, G + 7, SZ1 + 3, B.trimW);
      w.box(76, G + 1, SZ1 + 3, 77, G + 2, SZ1 + 3, B.sand); w.box(82, G + 1, SZ1 + 3, 83, G + 2, SZ1 + 3, B.sand);
      // 안: 기둥, 전시차, 유리 뒤 모래주머니
      for (const [px, pz] of [[74, 44], [86, 44], [74, 60], [86, 60]]) w.box(px, G + 1, pz, px, G + 8, pz, B.trimW);
      car(w, 69, 71, { axis: 'x', dir: 1, col: B.carW });
      car(w, 81, 71, { axis: 'x', dir: 1, col: B.carK });
      car(w, 90, 60, { axis: 'z', dir: 1, col: B.carS });
      for (let x = SX0 + 2; x < SX1 - 4; x += 5) w.box(x, G + 1, SZ1 - 2, x + 1, G + 2, SZ1 - 2, B.sand);
      lights.push({ name: 'show', p: [83.5, G + 5, SZ1 + 1.5], c: '#d4ecff', i: 0.8, d: 30, flicker: 0.05, srcR: 4 });
      // 옥상: 공조기, 안테나, 저격 둥지
      w.box(70, R + 1, 40, 74, R + 3, 44, B.steel); w.box(78, R + 1, 40, 82, R + 3, 44, B.steel);
      w.box(92, R + 1, 36, 92, R + 14, 36, B.iron); S(92, R + 15, 36, B.redG); S(91, R + 11, 36, B.iron); S(93, R + 11, 36, B.iron);
      for (const [cx, cz] of [[70, 36], [95, 50]]) { w.ring(cx, cz, R + 1, 1.5, 3, B.sand); w.ring(cx, cz, R + 2, 1.5, 3, B.sand); w.box(cx, R + 1, cz, cx + 1, R + 1, cz, B.crate); }
      // 「LEXOS」 글꼴: 꺼진 글자는 판에 박히고 켜진 글자는 앞에 부품으로
      const FONT = {
        L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'], E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
        X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'], O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
        S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
      };
      // 동쪽(대로 쪽) 2층 벽에 남색 간판 띠. 남쪽에서 북쪽으로 읽힌다
      const BXs = SX1 + 1, LY = G + 10, BZ0s = 33, BZ1s = 67;
      w.box(BXs, G + 9, BZ0s, BXs, G + 17, BZ1s, B.signBd); w.box(BXs, G + 9, BZ0s, BXs, G + 9, BZ1s, B.red); w.box(BXs, G + 17, BZ0s, BXs, G + 17, BZ1s, B.trimW);
      const sign = w.prop({ name: 'signL', pivot: [BXs + 1.5, LY, 50] });
      const letterPx = [];
      'LEXOS'.split('').forEach((ch, k) => {
        const z0 = BZ1s - 1 - k * 7;
        FONT[ch].forEach((row, r) => { for (let c = 0; c < 5; c++) if (row[c] === '1') { const z = z0 - c, y = LY + 6 - r; S(BXs, y, z, B.signDk); sign.set(BXs + 1, y, z, B.signLit); letterPx.push([BXs + 1.5, y + 0.5, z + 0.5]); } });
      });
      lights.push({ name: 'sign', p: [BXs + 2.5, LY + 3, 50], c: '#bfe0ff', i: 0.9, d: 34, flicker: 0.04, srcR: 4 });
      landmarks.push({ name: 'LEXOS 전시장', note: '카반의 본거지 · 통유리 자동차 전시장', p: [92, G + 30, 44], boss: true });

      // ── 원통형 유리탑: 전시장 남쪽 끝 둥근 모서리 위. 층마다 튀어나온 흰 띠와 깨진 검은 유리띠, 꼭대기 쇠 테 ──
      const TCX = 86, TCZ = 64, TRr = 11, TF = 9, TTOP = R + TF * 4;
      for (let y = R + 1; y <= TTOP; y++) {
        const fy = (y - R - 1) % 4, fl = (y - R - 1) >> 2;
        for (let dz = -TRr - 1; dz <= TRr + 1; dz++) for (let dx = -TRr - 1; dx <= TRr + 1; dx++) {
          const d = Math.hypot(dx, dz), x = TCX + dx, z = TCZ + dz;
          if (fy === 0) { if (d <= TRr + 0.7) S(x, y, z, d > TRr - 0.6 ? B.tower : B.concDk); continue; }
          if (d > TRr || d <= TRr - 1) continue;
          const col = Math.round((Math.atan2(dz, dx) / TAU + 1) * 48) % 48, h = H2(col >> 1, fl, 11);
          S(x, y, z, col % 4 === 0 ? B.mull : (h > 0.82 ? 0 : h > 0.68 ? B.win : B.tGlass));
        }
      }
      w.cyl(TCX, TCZ, TTOP + 1, TTOP + 1, TRr, B.roofM);
      for (let dz = -TRr - 1; dz <= TRr + 1; dz++) for (let dx = -TRr - 1; dx <= TRr + 1; dx++) {
        const d = Math.hypot(dx, dz); if (d > TRr + 0.7 || d <= TRr - 0.4) continue;
        S(TCX + dx, TTOP + 2, TCZ + dz, B.steel); S(TCX + dx, TTOP + 5, TCZ + dz, B.steel);
        if ((dx + dz) % 3 === 0) { S(TCX + dx, TTOP + 3, TCZ + dz, B.steel); S(TCX + dx, TTOP + 4, TCZ + dz, B.steel); }
      }
      w.box(TCX - 2, TTOP + 2, TCZ - 2, TCX + 1, TTOP + 4, TCZ + 1, B.steel); w.box(TCX, TTOP + 5, TCZ, TCX, TTOP + 12, TCZ, B.iron); S(TCX, TTOP + 13, TCZ, B.redG);
      landmarks.push({ name: 'LEXOS 원통형 탑', note: '유리띠가 감긴 원통 사무동 · 깨진 창', p: [TCX + 0.5, TTOP + 16, TCZ + 0.5] });

      // ── 옥상 사이 구름다리(저격수만 오가는 길) ──
      for (let x = MX1 + 1; x <= SX0 - 1; x++) {
        const y = MT + 1 + Math.round((x - MX1 - 1) * (R - MT - 1) / (SX0 - MX1 - 2));
        for (const z of [36, 37]) { S(x, y, z, B.steel); S(x, y + 1, z, x % 2 ? B.iron : 0); }
        S(x, y + 2, 35, B.iron); S(x, y + 2, 38, B.iron);
        if (x % 6 === 0) { S(x, y + 1, 35, B.iron); S(x, y + 1, 38, B.iron); }
      }
      w.box(56, G + 1, 36, 56, MT + 3, 36, B.steel); w.box(56, G + 1, 37, 56, MT + 3, 37, B.steel);
      // 정비동 옥상 저격 둥지
      for (const [cx, cz] of [[30, 36], [42, 78]]) { w.ring(cx, cz, MT + 1, 1.5, 3, B.sand); w.ring(cx, cz, MT + 2, 1.5, 3, B.sand); }

      // ── 울타리: 남쪽은 콘크리트 담과 철조망, 동쪽은 골함석 판, 북쪽 출입구에는 컨테이너 ──
      for (let x = 23; x <= 108; x++) { if (x >= 52 && x <= 64) continue; w.box(x, G + 1, 109, x, G + 3, 109, B.conc); if (x % 2) S(x, G + 4, 109, B.iron); }
      for (let z = 26; z <= 109; z++) { w.box(108, G + 1, z, 108, G + 3 + (z % 7 === 0 ? 1 : 0), z, H2(108, 1, z >> 2) > 0.7 ? B.sheetR : B.sheet); }
      for (let x = 48; x <= 65; x++) if (x < 51 || x > 62) w.box(x, G + 1, 26, x, G + 3, 26, B.sheet);
      const container = (x0, z0, len, axis, b, y) => {
        y = y || G + 1;
        const x1 = axis === 'x' ? x0 + len - 1 : x0 + 4, z1 = axis === 'x' ? z0 + 4 : z0 + len - 1;
        w.box(x0, y, z0, x1, y + 4, z1, b); w.walls(x0, y + 4, z0, x1, y + 4, z1, B.iron);
        const e = axis === 'x' ? x1 : z1; for (let v = 0; v <= 4; v++) for (let yy = y; yy <= y + 3; yy++) { if (axis === 'x') S(e, yy, z0 + v, v === 2 ? B.iron : B.steel); else S(x0 + v, yy, e, v === 2 ? B.iron : B.steel); }
      };
      container(29, 20, 12, 'x', B.contB); container(60, 19, 12, 'x', B.contR); container(66, 19, 12, 'x', B.contG, G + 6);
      // 북쪽 망루(뒤)
      const tower = (x0, z0, top) => {
        for (const [px, pz] of [[x0, z0], [x0 + 5, z0], [x0, z0 + 5], [x0 + 5, z0 + 5]]) w.box(px, G + 1, pz, px, top + 6, pz, B.steel);
        for (let y = G + 3; y < top; y += 4) { w.line(x0, y, z0, x0 + 5, y + 3, z0, B.steel); w.line(x0, y, z0 + 5, x0 + 5, y + 3, z0 + 5, B.steel); }
        w.box(x0, top, z0, x0 + 5, top, z0 + 5, B.wood);
        w.walls(x0, top + 1, z0, x0 + 5, top + 2, z0 + 5, B.sand);
        w.box(x0 - 1, top + 7, z0 - 1, x0 + 6, top + 7, z0 + 6, B.sheet);
        for (let y = G + 1; y < top; y++) S(x0 + 2, y, z0 + 5 + 1, y % 2 ? B.steel : 0);                   // 사다리
      };
      tower(52, 28, G + 13);
      w.box(54, G + 16, 32, 54, G + 16, 35, B.gun); S(54, G + 15, 31, B.gunG);                               // AGS(북)
      // 컨테이너 사이 콘크리트 블록 미로(북문)
      for (const [x, z] of [[50, 22], [56, 24], [62, 22]]) w.box(x, G + 1, z, x + 3, G + 2, z, B.jersey);

      // ── 남쪽 망루: AGS 유탄발사기와 탐조등 ──
      const TX = 40, TZ = 98, TT = G + 14;
      tower(TX, TZ, TT);
      S(TX + 2, TT + 1, TZ + 3, B.gunG); w.box(TX + 2, TT + 2, TZ + 3, TX + 2, TT + 2, TZ + 6, B.gun); S(TX + 1, TT + 2, TZ + 3, B.crate);
      S(TX + 4, TT + 1, TZ + 4, B.iron); S(TX + 4, TT + 2, TZ + 4, B.iron);
      const LP = [TX + 4.5, TT + 3.5, TZ + 4.5];
      const head = w.prop({ name: 'slamp', pivot: LP });
      head.box(TX + 4, TT + 3, TZ + 4, TX + 4, TT + 4, TZ + 4, B.steel); head.set(TX + 4, TT + 3, TZ + 5, B.lampY); head.set(TX + 4, TT + 4, TZ + 5, B.lampY);
      const beam = w.prop({ name: 'beam', pivot: LP, scl0: [0, 0, 0] });
      for (let k = 2; k <= 26; k++) { const t = k / 26, x = TX + 4 + Math.round(t * 10), y = TT + 3 - Math.round(t * 14), z = TZ + 5 + Math.round(t * 18); beam.set(x, y, z, B.lampY); if (k > 8) { beam.set(x + 1, y, z, B.lampY); beam.set(x, y - 1, z, B.lampY); } if (k > 16) { beam.set(x - 1, y, z, B.lampY); beam.set(x, y, z + 1, B.lampY); } }
      lights.push({ name: 'search', p: [LP[0], LP[1], LP[2] + 1], c: '#fff4d0', i: 0.6, d: 30, flicker: 0, srcR: 3 });
      landmarks.push({ name: '남쪽 망루', note: 'AGS-30 유탄발사기 · 탐조등', p: [TX + 2.5, TT + 14, TZ + 2.5] });

      // ── 마당: 모래주머니 벽, 콘크리트 블록, 부서진 차, 컨테이너, 상자 ──
      const bags = (x0, z0, x1, z1, h) => { w.box(x0, G + 1, z0, x1, G + h, z1, B.sand); for (let x = x0; x <= x1; x++) for (let z = z0; z <= z1; z++) if ((x + z) % 3 === 0) S(x, G + h, z, 0); };
      const jersey = (x, z, axis) => { for (let k = 0; k < 4; k++) { const X = axis === 'x' ? x + k : x, Z = axis === 'x' ? z : z + k; S(X, G + 1, Z, B.jersey); S(X, G + 2, Z, B.jersey); if (k % 2) S(X, G + 1, Z, B.concDk); } };
      const hedgehog = (x, z) => { w.line(x - 1, G + 1, z - 1, x + 1, G + 3, z + 1, B.iron); w.line(x + 1, G + 1, z - 1, x - 1, G + 3, z + 1, B.iron); w.line(x, G + 1, z - 1, x, G + 3, z + 1, B.iron); };
      bags(49, 79, 56, 80, 3); bags(60, 79, 65, 80, 3);
      bags(66, 104, 72, 105, 2); bags(86, 104, 99, 105, 2);
      car(w, 52, 52, { axis: 'x', dir: -1, wreck: true });
      car(w, 50, 38, { axis: 'z', dir: 1, col: B.carG });
      container(58, 40, 12, 'z', B.contG);
      for (const [x, z] of [[50, 86], [53, 88], [62, 84], [92, 82], [96, 83]]) { S(x, G + 1, z, w.pick([B.barrelB, B.barrelR])); S(x, G + 2, z, w.pick([B.barrelB, B.barrelR])); }
      for (const [x, z] of [[49, 94], [50, 95], [49, 96], [58, 93]]) { S(x, G + 1, z, B.tire); S(x, G + 2, z, B.tire); }
      for (const [x, z] of [[57, 84], [58, 84], [57, 85], [76, 102], [77, 102]]) S(x, G + 1, z, B.crate);
      // 전시차: 앞마당에 세워 둔 차들, 경보가 울릴 빨간 스포츠카(부품)
      car(w, 67, 84, { axis: 'x', dir: 1, col: B.carW });
      const AX0 = 85, AZ0 = 89;
      const acar = w.prop({ name: 'acar', pivot: [AX0 + 4.5, G + 1, AZ0 + 2] });
      car(acar, AX0, AZ0, { axis: 'x', dir: 1, col: B.carR, low: true });
      w.box(AX0 - 1, G, AZ0 - 1, AX0 + 9, G, AZ0 + 4, B.tileW);
      S(AX0 + 10, G + 1, AZ0 - 1, B.iron); S(AX0 + 10, G + 2, AZ0 - 1, B.lampY);
      lights.push({ name: 'alarm', p: [AX0 + 9.5, G + 2.5, AZ0 + 1.5], c: '#ff9a3a', i: 0.5, d: 16, flicker: 0, srcR: 3 });
      // 전시장 남쪽 작은 2층 사무동(아스펙트 사무실)
      w.box(62, G + 1, 89, 72, G + 9, 101, B.conc); w.walls(62, G + 10, 89, 72, G + 10, 101, B.concDk);
      for (let y of [G + 2, G + 3, G + 6, G + 7]) for (let u = 63; u <= 71; u++) if (u % 3) { S(u, y, 101, H2(u, y, 1) > 0.75 ? B.win : B.winDk); }
      for (let y of [G + 2, G + 3, G + 6, G + 7]) for (let u = 90; u <= 100; u++) if (u % 3) S(72, y, u, H2(u, y, 2) > 0.75 ? B.win : B.winDk);
      w.box(72, G + 1, 94, 72, G + 4, 96, B.iron); w.box(73, G + 5, 93, 74, G + 5, 97, B.trimW);
      // 동쪽 띠: 대로를 향한 전시차 줄과 클레이모어 풀밭
      car(w, 101, 36, { axis: 'z', dir: 1, col: B.carS }); car(w, 101, 52, { axis: 'z', dir: -1, col: B.carB });
      for (let z = 30; z <= 104; z++) for (const x of [106, 107]) S(x, G, z, B.grassD);
      for (let z = 33; z < 104; z += 7) S(106 + (z & 1), G + 1, z, B.clay);
      // 클레이모어가 숨은 풀밭(남쪽 담 안쪽)
      for (let z = 106; z <= 108; z++) for (let x = 66; x <= 99; x++) S(x, G, z, B.grassD);
      for (let x = 68; x < 99; x += 5) S(x, G + 1, 107, B.clay);
      for (let x = 23; x <= 51; x++) for (let z = 106; z <= 108; z++) S(x, G, z, B.grassD);
      for (const x of [26, 33, 47]) S(x, G + 1, 107, B.clay);

      // ── NSV 기관총 거치대(부품): 모래주머니 고리 안 삼각대 ──
      const NX = 78, NZ = 96;
      for (let z = NZ - 4; z <= NZ + 4; z++) for (let x = NX - 4; x <= NX + 4; x++) { const d = Math.hypot(x - NX, z - NZ); if (d > 2.6 && d <= 4.2 && !(z < NZ - 2 && Math.abs(x - NX) < 2)) { S(x, G + 1, z, B.sand); S(x, G + 2, z, B.sand); if ((x + z) % 2) S(x, G + 3, z, B.sand); } }
      w.box(NX, G + 1, NZ, NX, G + 3, NZ, B.iron); S(NX - 1, G + 1, NZ - 1, B.iron); S(NX + 1, G + 1, NZ - 1, B.iron); S(NX, G + 1, NZ + 1, B.iron);
      const nsv = w.prop({ name: 'nsv', pivot: [NX + 0.5, G + 4, NZ + 0.5] });
      nsv.box(NX, G + 4, NZ - 2, NX, G + 4, NZ + 1, B.gun); nsv.box(NX, G + 4, NZ + 2, NX, G + 4, NZ + 6, B.iron); nsv.set(NX + 1, G + 4, NZ - 1, B.gunG);
      nsv.box(NX - 2, G + 5, NZ + 1, NX + 2, G + 6, NZ + 1, B.gunG); nsv.set(NX - 2, G + 4, NZ + 1, B.gunG); nsv.set(NX + 2, G + 4, NZ + 1, B.gunG); nsv.set(NX, G + 5, NZ - 2, B.gun);
      w.box(NX + 5, G + 1, NZ - 3, NX + 5, G + 4, NZ - 3, B.iron); S(NX + 5, G + 5, NZ - 3, B.lampY);
      lights.push({ name: 'nsv', p: [NX + 3.5, G + 5, NZ - 1], c: '#ffc060', i: 0.4, d: 16, flicker: 0.1, srcR: 6 });
      // 북쪽 마당의 두 번째 NSV(정지)
      w.ring(62, 34, G + 1, 1.5, 3, B.sand); w.ring(62, 34, G + 2, 1.5, 3, B.sand); w.box(62, G + 1, 34, 62, G + 3, 34, B.iron); w.box(62, G + 4, 30, 62, G + 4, 34, B.gun);

      // ── 남쪽 검문소: 차단기(부품), 초소와 경광등, 콘크리트 블록 지그재그 ──
      w.box(51, G + 1, 110, 51, G + 3, 110, B.hazard); S(50, G + 3, 110, B.concDk);
      const boom = w.prop({ name: 'boom', pivot: [51.5, G + 3.5, 110.5], axis: 'z' });
      for (let x = 52; x <= 64; x++) boom.set(x, G + 3, 110, ((x >> 1) & 1) ? B.red : B.white);
      w.box(65, G + 1, 110, 65, G + 2, 110, B.hazard);
      w.box(67, G + 1, 110, 71, G + 5, 113, B.white); w.box(67, G + 1, 110, 71, G + 1, 113, B.concDk);
      w.box(68, G + 3, 113, 70, G + 4, 113, B.winS); w.box(67, G + 3, 111, 67, G + 4, 112, B.winS);
      w.box(66, G + 6, 109, 72, G + 6, 114, B.roofM); S(68, G + 7, 111, B.redG); S(70, G + 7, 112, B.blueG);
      lights.push({ name: 'gate', p: [69.5, G + 8, 112], c: '#ff4a4a', i: 0.5, d: 20, flicker: 0, srcR: 3 });
      jersey(53, 117, 'x'); jersey(60, 121, 'x'); jersey(53, 125, 'x');
      bags(44, 110, 49, 111, 2);
      landmarks.push({ name: '남쪽 검문소', note: '차단기와 초소 · 체크포인트', p: [60, G + 14, 112] });

      // ── 프리모르스키 대로: 전차 선로와 가선, 부서진 파란 전차, 군 트럭 검문, 버려진 탱크, 버려진 차, 가로등, 앙상한 나무 ──
      const WY = G + 13;
      for (let z = 2; z < D; z += 16) {
        if (z >= RZ0 - 1 && z <= RZ1 + 1) continue;
        for (const x of [111, 141]) { w.box(x, G + 1, z, x, WY + 1, z, B.steel); }
        for (let x = 112; x <= 140; x++) S(x, WY + 1, z, B.iron);
      }
      for (const x of [123, 129]) for (let z = 0; z < D; z++) if (!(z > RZ0 + 1 && z < RZ1 - 1)) S(x, WY, z, B.iron);
      // 저상 전차(파란 차체, 검은 띠창): 길이 26, 폭 5, 선로 위에서 앞이 부서졌다
      const TX0 = 126, TZ0 = 26, TL = 26;
      for (let z = TZ0; z < TZ0 + TL; z++) for (let x = TX0; x <= TX0 + 4; x++) for (let y = G + 1; y <= G + 7; y++) {
        const edge = x === TX0 || x === TX0 + 4 || z === TZ0 || z === TZ0 + TL - 1, nose = z >= TZ0 + TL - 2;
        if (!edge && y < G + 7 && y > G + 1) continue;
        let b = y === G + 1 ? B.iron : y <= G + 3 ? B.tramB : y === G + 7 ? B.tramW : (nose ? B.carGl : ((z - TZ0) % 5 === 0 ? B.tramB : B.carGl));
        if (y >= G + 4 && y <= G + 6 && edge && H2(x, y, z) > 0.75) b = 0;
        if (nose && y >= G + 5 && x !== TX0 && x !== TX0 + 4 && H2(x, y, 3) > 0.4) b = 0;
        S(x, y, z, b);
      }
      for (const z of [TZ0 + 4, TZ0 + 20]) { w.line(TX0 + 2, G + 8, z, TX0 + 3, WY - 1, z + 3, B.steel); }
      for (let k = 0; k < 14; k++) S(w.ri(TX0 - 1, TX0 + 5), G + 1, w.ri(TZ0 + TL, TZ0 + TL + 3), w.pick([B.concDk, B.tramB, B.carGl, B.wood]));
      // 군 트럭(우랄): 길이 13, 폭 5. 짐칸에 국방색 포장
      const truck = (x0, z0, axis, dir) => {
        const P = (u, v) => axis === 'x' ? [x0 + (dir > 0 ? u : 12 - u), z0 + v] : [x0 + v, z0 + (dir > 0 ? u : 12 - u)];
        for (let u = 0; u <= 12; u++) for (let v = 0; v <= 4; v++) {
          const [X, Z] = P(u, v), wheel = [1, 2, 4, 5, 10, 11].includes(u) && (v === 0 || v === 4);
          w.box(X, G + 1, Z, X, G + 2, Z, wheel ? B.tire : (v === 0 || v === 4 ? 0 : B.iron));
          if (u <= 8) { S(X, G + 3, Z, B.olive); const ry = G + 4 + (v === 0 || v === 4 ? 0 : v === 2 ? 3 : 2); for (let y = G + 4; y <= ry; y++) if (v === 0 || v === 4 || y === ry || u === 0) S(X, y, Z, B.canvas); }
          else if (u <= 11) { w.box(X, G + 3, Z, X, G + 5, Z, B.olive); if (u === 11 && v > 0 && v < 4) S(X, G + 5, Z, B.carGl); S(X, G + 6, Z, u >= 10 ? 0 : B.olive); }
          else S(X, G + 3, Z, B.olive);
        }
      };
      truck(114, 60, 'x', -1); truck(133, 66, 'z', 1);
      car(w, 115, 54, { axis: 'z', dir: -1, col: B.carK });
      // 버려진 탱크: 차체와 포탑, 북서쪽을 겨눈 긴 포신
      w.box(131, G + 1, 88, 137, G + 2, 100, B.iron); w.box(132, G + 3, 87, 136, G + 3, 100, B.tank); w.box(131, G + 3, 89, 137, G + 3, 99, B.tank);
      w.box(132, G + 4, 91, 136, G + 5, 96, B.tank); w.box(133, G + 6, 92, 135, G + 6, 95, B.tank); S(135, G + 7, 93, B.iron);
      for (const [x, z] of [[132, 91], [136, 91], [132, 96], [136, 96]]) S(x, G + 5, z, B.olive);
      w.line(134, G + 5, 90, 127, G + 6, 81, B.iron);
      for (let k = 0; k < 10; k++) S(w.ri(131, 137), G + 3, w.ri(88, 100), B.rust);
      car(w, 115, 84, { axis: 'z', dir: 1, col: B.carB });
      car(w, 88, 130, { axis: 'x', dir: -1, col: B.carW });
      jersey(116, 72, 'x'); jersey(124, 58, 'x'); hedgehog(121, 92); hedgehog(104, 98); hedgehog(104, 102);
      // 불타는 차(남쪽 거리)
      car(w, 14, 121, { axis: 'x', dir: 1, wreck: true });
      for (const [x, y, z] of [[17, G + 3, 122], [18, G + 3, 123], [19, G + 4, 122], [16, G + 2, 121]]) S(x, y, z, x % 2 ? B.fire : B.fireY);
      lights.push({ name: 'fire', p: [18, G + 5, 122.5], c: '#ff8a3a', i: 0.7, d: 18, flicker: 0.6, srcR: 3 });
      // 가로등(나트륨)
      const lamp = (x, z, dx, dz) => { w.box(x, G + 1, z, x, G + 9, z, B.steel); S(x + dx, G + 9, z + dz, B.steel); S(x + dx * 2, G + 9, z + dz * 2, B.sodium); return [x + dx * 2 + 0.5, G + 8, z + dz * 2 + 0.5]; };
      for (const [x, z, dx, dz] of [[111, 46, 1, 0], [111, 78, 1, 0], [36, 113, 0, 1], [92, 113, 0, 1]]) lights.push({ p: lamp(x, z, dx, dz), c: '#ffb060', i: 0.7, d: 18, flicker: 0.05, night: true });
      const bare = (x, z, h) => { w.box(x, G + 1, z, x, G + h, z, B.trunk); for (let k = 0; k < 4; k++) { const a = k * 1.7 + x, l = 2 + (k % 2); w.line(x, G + h - 2 + (k % 2), z, x + Math.round(Math.cos(a) * l), G + h + 1, z + Math.round(Math.sin(a) * l), B.trunk); } };
      for (const [x, z] of [[111, 30], [111, 62], [111, 96], [20, 113], [78, 113], [141, 40], [141, 80], [21, 40], [21, 80]]) bare(x, z, 7);
      // 거리 잡동사니: 잔해 더미
      for (let k = 0; k < 26; k++) { const x = w.ri(2, 141), z = w.ri(2, 141); if (MH.g(w, x, z) !== G || w.get(x, G + 1, z) || w.get(x, G, z) === B.rail) continue; if (!(x > 110 || z > 110 || (x > 18 && x < 23) || (z > 18 && z < 26))) continue; S(x, G + 1, z, w.pick([B.concDk, B.conc, B.panelR])); if (w.chance(0.5) && !w.get(x + 1, G + 1, z)) S(x + 1, G + 1, z, B.concDk); }
      landmarks.push({ name: '프리모르스키 대로', note: '전차 선로 · 군 트럭 검문 · 버려진 탱크', p: [128, G + 16, 70] });

      // ── 탈출: 프리모르스키 대로 택시(대로 남쪽, 승강장 표지판과 노란 택시 부품) ──
      w.box(111, G + 1, 106, 111, G + 7, 106, B.steel);
      for (let z = 104; z <= 108; z++) { S(111, G + 7, z, (z & 1) ? B.black : B.taxi); S(111, G + 6, z, (z & 1) ? B.taxi : B.black); }
      S(111, G + 8, 106, B.lampY);
      lights.push({ name: 'taxi', p: [111.5, G + 8, 106.5], c: '#ffd060', i: 0.5, d: 18, flicker: 0.05, srcR: 3 });
      const QX = 114, QZ = 95;
      w.box(QX, G + 1, QZ, QX + 3, G + 6, QZ + 21, 0);                                              // 택시 길을 비운다
      const taxi = w.prop({ name: 'taxi', pivot: [QX + 2, G + 1, QZ + 4.5] });
      const tp = car(taxi, QX, QZ, { axis: 'z', dir: 1, col: B.taxi });
      for (const v of [1, 2]) { const [x, z] = tp(4, v); taxi.set(x, G + 5, z, B.lampY); }
      landmarks.push({ name: '프리모르스키 대로 택시', note: '돈을 내고 타는 탈출 지점', p: [QX + 2, G + 12, QZ + 4] });

      // ───── 상호작용 ─────
      const SM = ['#7a7a80', '#9a9aa0', '#5a5a62', '#b4b4b8'];
      acts.push({
        name: '정비동 차고 셔터', hint: '정비동 셔터가 덜컹거리며 말려 올라가고, 안에서 차 한 대가 마당으로 나왔다 들어가요', hit: [MX1, G + 1, 66, MX1 + 1, G + 8, 73],
        run: async a => {
          a.flash('garage', 4, 7);
          for (let k = 0; k < 3; k++) a.burst([MX1 + 1, G + 8, 66 + k * 3.5], { n: 8, colors: ['#ffd890', '#ffffff'], speed: 1.5, up: 1, life: 0.5, gravity: 6, spread: 0.6 });
          await a.tween('shutter', { scl: [1, 0.12, 1] }, 1.8);
          const smoke = async () => { for (let k = 0; k < 8; k++) { a.burst([MX1 - 8 + k * 2, G + 2, 69.5], { n: 6, colors: SM, speed: 0.6, up: 1.2, life: 1.4, gravity: -0.4, spread: 0.8 }); await a.wait(0.3); } };
          await Promise.all([a.move('gcar', [15, 0, 0], 2.4), smoke()]);
          a.flash('garage', 6, 1);
          await a.wait(1.4);
          await a.move('gcar', [0, 0, 0], 2.2);
          await a.tween('shutter', { scl: [1, 1, 1] }, 1.4);
        },
      });
      // 차고 안 차(부품): 2번 셔터 뒤
      const gcar = w.prop({ name: 'gcar', pivot: [39.5, G + 1, 70] });
      car(gcar, 35, 68, { axis: 'x', dir: 1, col: B.carK });
      acts.push({
        name: '스포츠카 경보', hint: '무언가 부딪혀 전시용 빨간 스포츠카가 밀려나고, 경보가 울리며 전조등과 깜빡이가 번쩍여요', hit: [AX0, G + 1, AZ0, AX0 + 8, G + 3, AZ0 + 3],
        run: async a => {
          a.burst([AX0 - 0.5, G + 2, AZ0 + 2], { n: 16, colors: ['#ffffff', '#c8c8c8'], speed: 3, up: 2, life: 0.5, gravity: 8, spread: 1 });
          await a.tween('acar', { off: [1.8, 0, 0], rot: [0, 0.12, 0] }, 0.18);
          for (let k = 0; k < 9; k++) {
            a.flash('alarm', 7, 0.22);
            for (const [x, z] of [[AX0 + 9, AZ0 + 0.5], [AX0 + 9, AZ0 + 3.5], [AX0 - 0.5, AZ0 + 0.5], [AX0 - 0.5, AZ0 + 3.5]]) a.burst([x, G + 2.5, z], { n: 5, colors: k % 2 ? ['#ffb040', '#ffe0a0'] : ['#ffffff', '#fff0c0'], speed: 1.2, up: 0.3, life: 0.35, gravity: 0, spread: 0.3 });
            await a.tween('acar', { off: [1.8, 0.8, 0], rot: [k % 2 ? 0.12 : -0.12, 0.12, 0] }, 0.12); await a.tween('acar', { off: [1.8, 0, 0], rot: [0, 0.12, 0] }, 0.12);
            await a.wait(0.2);
          }
          await a.tween('acar', { off: [0, 0, 0], rot: [0, 0, 0] }, 1.2);
        },
      });
      acts.push({
        name: 'NSV 기관총 거치대', hint: '모래주머니 둥지의 NSV 기관총이 좌우로 돌며 총구에서 불꽃이 튀어요. 사수는 보이지 않아요', hit: [NX - 4, G + 1, NZ - 4, NX + 4, G + 6, NZ + 6],
        run: async a => {
          const fire = async th => {
            for (let k = 0; k < 6; k++) {
              a.burst([NX + 0.5 + Math.sin(th) * 6.6, G + 4.5, NZ + 0.5 + Math.cos(th) * 6.6], { n: 10, colors: ['#ffe080', '#ff9a3a', '#ffffff'], speed: 3, up: 0.6, life: 0.25, gravity: 0, spread: 0.3 });
              a.burst([NX + 1.5, G + 4.5, NZ - 0.5], { n: 2, colors: ['#d8b048'], speed: 1.2, up: 2, life: 0.6, gravity: 9, spread: 0.2 });
              a.flash('nsv', 5, 0.08); await a.wait(0.11);
            }
          };
          for (const th of [0.7, -0.6, 0.2]) { await a.turn('nsv', [0, th, 0], 0.8); await fire(th); await a.wait(0.3); }
          await a.turn('nsv', [0, 0, 0], 0.8);
        },
      });
      acts.push({
        name: '망루 탐조등', hint: '남쪽 망루의 탐조등이 켜져 거리를 좌우로 훑어요', hit: [TX, TT, TZ, TX + 5, TT + 7, TZ + 5],
        run: async a => {
          a.flash('search', 4, 7.5);
          await a.tween('beam', { scl: [1, 1, 1] }, 0.25);
          for (const th of [0.75, -0.55, 0.5, 0]) await Promise.all([a.turn('beam', [0, th, 0], 1.6), a.turn('slamp', [0, th, 0], 1.6)]);
          await a.wait(0.4);
          await a.tween('beam', { scl: [0, 0, 0] }, 0.2);
        },
      });
      acts.push({
        name: 'LEXOS 간판 점등', hint: '대로 쪽 벽의 LEXOS 간판이 지지직 깜빡이다가 환하게 켜져요', hit: [BXs, G + 9, BZ0s, BXs + 1, G + 17, BZ1s],
        run: async a => {
          for (const [on, t] of [[0, 0.6], [1, 0.08], [0, 0.25], [1, 0.06], [0, 0.4], [1, 0.12], [0, 0.12]]) {
            await a.tween('signL', { scl: [1, on ? 1 : 0.02, 1] }, 0.04);
            if (on) a.burst(letterPx[(Math.random() * letterPx.length) | 0], { n: 12, colors: ['#ffffff', '#bfe0ff', '#ffe080'], speed: 2.5, up: 1, life: 0.6, gravity: 8, spread: 0.4 });
            await a.wait(t);
          }
          await a.tween('signL', { scl: [1, 1, 1] }, 0.3);
          a.flash('sign', 3, 3); a.glow(1.5, 3);
          for (let k = 0; k < letterPx.length; k += 4) a.burst(letterPx[k], { n: 2, colors: ['#eaf6ff', '#bfe0ff'], speed: 0.8, up: 0.5, life: 1, gravity: 0, spread: 0.3 });
          await a.wait(2.5);
        },
      });
      acts.push({
        name: '검문소 차단기', hint: '남쪽 검문소 경광등이 빨강·파랑으로 번쩍이고 줄무늬 차단기가 올라가요', hit: [51, G + 1, 109, 65, G + 4, 111],
        run: async a => {
          const strobe = async n => { for (let k = 0; k < n; k++) { a.flash('gate', 6, 0.2); a.burst(k % 2 ? [70.5, G + 7.5, 112.5] : [68.5, G + 7.5, 111.5], { n: 10, colors: k % 2 ? ['#4a8aff', '#c0d8ff'] : ['#ff3a3a', '#ffc0c0'], speed: 2, up: 0.4, life: 0.35, gravity: 0, spread: 0.4 }); await a.wait(0.25); } };
          await Promise.all([strobe(16), (async () => { await a.wait(0.6); await a.turn('boom', [0, 0, 1.35], 1.4); await a.wait(1.4); await a.turn('boom', [0, 0, 0], 1.2); })()]);
        },
      });
      const SGX = 120, SGZ = 74;
      S(SGX, G + 1, SGZ, B.gunG);
      acts.push({
        name: '거리의 연막탄', hint: '클리모프 거리 한복판에서 연막탄이 터져 잿빛 연기가 길을 덮어요', hit: [SGX - 3, G + 1, SGZ - 3, SGX + 3, G + 6, SGZ + 3],
        run: async a => {
          a.burst([SGX + 0.5, G + 1.5, SGZ + 0.5], { n: 20, colors: ['#ffffff', '#ffe0a0'], speed: 4, up: 1, life: 0.3, gravity: 0, spread: 0.3 });
          a.wind(0.4, 6);
          for (let k = 0; k < 14; k++) {
            a.burst([SGX + 0.5 + k * 0.4, G + 1.5, SGZ + 0.5 - k * 0.2], { n: 34, colors: SM, speed: 3 + k * 0.25, up: 1.2, life: 3.2, gravity: -0.3, spread: 1 + k * 0.25, flat: true });
            await a.wait(0.35);
          }
          await a.wait(1.5);
        },
      });
      acts.push({
        name: '대로 택시 탈출', hint: '대로 남쪽 승강장에 노란 택시가 비상등을 깜빡이며 와서 서고, 탈출하는 손님을 태워 떠나요', hit: [QX, G + 1, QZ, QX + 3, G + 5, QZ + 8],
        run: async a => {
          a.flash('taxi', 5, 6);
          for (let k = 0; k < 6; k++) {
            for (const [x, z] of [[QX + 0.5, QZ + 8.5], [QX + 3.5, QZ + 8.5], [QX + 0.5, QZ], [QX + 3.5, QZ]]) a.burst([x, G + 2.5, z], { n: 4, colors: ['#ffb040', '#ffe0a0'], speed: 1, up: 0.3, life: 0.3, gravity: 0, spread: 0.3 });
            await a.wait(0.4);
          }
          a.burst([QX + 2, G + 3, QZ + 9], { n: 12, colors: ['#ffffff', '#fff0c0'], speed: 3, up: 0.5, life: 0.5, gravity: 0, spread: 0.5 });
          const fume = async () => { for (let k = 0; k < 8; k++) { a.burst([QX + 2, G + 1.5, QZ - 0.5 + k * 1.6], { n: 6, colors: SM, speed: 0.6, up: 1, life: 1.2, gravity: -0.4, spread: 0.6 }); await a.wait(0.3); } };
          await Promise.all([a.move('taxi', [0, 0, 13], 2.4), fume()]);
          await a.tween('taxi', { scl: [0, 0, 0] }, 0.3);
          await a.move('taxi', [0, 0, 0], 0.1);
          await a.wait(0.8);
          await a.tween('taxi', { scl: [1, 1, 1] }, 0.6);
        },
      });

      return { lights, landmarks, acts };
    },
  });
})();
