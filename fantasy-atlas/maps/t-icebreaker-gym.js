// 쇄빙선 3층 체육관(하위 지도) — 웨지(The Wedge)와 블랙 디비전 경호대가 버티는 곳. tarkov.dev '08_gym-canteen' 평면도를 그대로 옮겼다:
// 가운데 네모난 체육관(파란 벽 매트, 농구 골대, 바벨 거치대, 매트, 사물함), 그 앞 굽은 계단실, 배식실, 맨 앞(남쪽)의 두 식당과 양 끝 휴게실, 좌우 긴 복도와 선실
// 뱃머리(식당 창)는 남쪽. 단면 보기: 지붕은 없고, 카메라 쪽(남·동) 벽과 안쪽 칸막이는 낮췄다
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 114, D = 112, Hh = 64;
  MAPS.push({
    id: 'icebreaker-gym', cat: 'tarkov', sub: true, parent: 'icebreaker', name: '쇄빙선 3층 체육관', en: 'Icebreaker · Level 3 Gym', color: '#3a5a9a', seed: 683, base: 20, time: 'night', size: [W, D, Hh],
    desc: '「보레아스」 상부 구조물 맨 아래 3층. 가운데 체육관은 파란 매트를 두른 벽과 농구 골대, 바벨 거치대가 있는 넓은 방으로, 블랙 디비전의 웨지와 경호대가 모래주머니를 쌓고 진을 쳤다. 그 앞 굽은 계단실과 배식실을 지나면 뱃머리 쪽 창가에 긴 탁자가 뒤엉킨 두 식당과 검은 소파 휴게실이 있다. 이 그림은 지붕과 남·동쪽 벽을 걷어 낸 단면이다.',
    info: { title: '장소 정보', en: 'LEVEL 3 · GYM & CANTEEN', rows: [['층', '3층 · 체육관과 식당'], ['보스', '웨지(The Wedge) · 블랙 디비전'], ['경호대', '3~6명 · 체육관과 식당'], ['체육관', '파란 벽 매트 · 농구 골대 · 바벨 · 사물함'], ['식당', '긴 탁자 둘 · 휴게실 소파'], ['단면', '뱃머리는 남쪽 · 지붕과 남·동 벽을 걷어 냄']] },
    sky: ['#1a2638', '#05080f', '#2c4462'], stars: true,
    hemi: ['#b8c4d8', '#1e1e22', 0.62], sun: ['#d0dcf4', 0.45, [0.4, 1, 0.6]],
    day: { sky: ['#a8b4c0', '#6a7c90', '#dce4ea'], stars: false, hemi: ['#e8f0f8', '#4a5462', 0.68], sun: ['#f0f4ff', 0.6, [0.4, 1, 0.6]], haze: '#b8c6d4' },
    fog: { box: [57, 56, 70, 70], start: 0.92, floor: 6, depth: 8, haze: [30, 0.18, 8], hazeColor: '#2a3a50' },
    camY: -4, zoom: 1.6,
    particles: [{ n: 160, colors: ['#e8e0d0', '#c8c0b0'], mode: 'drift', speed: 0.15, wind: 0.3, y0: 22, y1: 40, glow: false }],
    blocks: {
      floorG: { c: '#b49c78', top: '#c4ac86', v: 0.03, pat: 'plank' }, line: { c: '#e8e4d8', v: 0.02 }, floorC: { c: '#a8977c', top: '#b4a286', v: 0.04 }, carpet: { c: '#34363a', v: 0.05 },
      wallP: { c: '#c8b496', v: 0.03, pat: 'big' }, wallT: { c: '#7a6a54', v: 0.02 }, wallH: { c: '#a8b0b8', v: 0.03, pat: 'big' }, base: { c: '#5a6068', v: 0.03 },
      matB: { c: '#2a4e9a', v: 0.05 }, matB2: { c: '#22427e', v: 0.05 }, board: { c: '#f0f0ec', v: 0.02 }, hoopR: { c: '#e0602a', v: 0.03 }, net: { c: '#e8e8e8', v: 0.02 },
      locker: { c: '#8a9096', v: 0.03, pat: 'plank' }, iron: { c: '#2c3036', v: 0.03 }, plate: { c: '#1a1c1e', v: 0.03 }, chrome: { c: '#c8ccd0', v: 0.02 }, mirror: { c: '#9ab8c8', night: true, day: '#7a98a8' },
      goalY: { c: '#e8c030', v: 0.02 }, crate: { c: '#7a6a4a', top: '#8a7a58', v: 0.05, pat: 'plank' }, caseK: { c: '#1e2226', v: 0.03 }, caseG: { c: '#3a4a3a', v: 0.04 },
      sandbag: { c: '#5a5a4e', top: '#6e6c5c', v: 0.08 }, rack: { c: '#3a3e44', v: 0.03 }, gun: { c: '#16181a', v: 0.02 },
      table: { c: '#d8dcdc', top: '#e8ecec', v: 0.02 }, chairW: { c: '#b8bcc0', v: 0.03 }, sofa: { c: '#1c1e22', v: 0.04 }, massage: { c: '#6a3e2e', v: 0.04 }, wood: { c: '#b08a5a', top: '#c09a68', v: 0.04, pat: 'plank' }, woodD: { c: '#6a4e34', v: 0.04 },
      cab: { c: '#3a3e44', top: '#5a5e64', v: 0.03 }, step: { c: '#c8aa7a', v: 0.04 }, glassI: { c: '#3a5a78', night: true, day: '#2a4652' }, doorW: { c: '#8a6a46', v: 0.03 }, bed: { c: '#c8ccd0', v: 0.03 },
      lampC: { c: '#f4f0e0', glow: true }, redL: { c: '#ff3a2a', glow: true }, exitG: { c: '#3ad06a', glow: true }, bottle: { c: '#4a8ad8', v: 0.03 },
      stoneG: { c: '#6a7078', v: 0.04 }, timber: { c: '#3a4048', v: 0.03 }, door: { c: '#d8b030', v: 0.03 }, gold: { c: '#3ad06a', v: 0.03 }, mlamp: { c: '#fff0c0', glow: true },
    },
    build(w) {
      const B = w.id, G = w.base;
      const lights = [], acts = [], landmarks = [];
      w.hm = new Int16Array(W * D).fill(G);
      // ── 평면도(tarkov.dev z5 렌더, 픽셀) → 복셀: 12px = 1칸. 뱃머리(식당)는 남쪽 ──
      const X = px => Math.round(6 + (px - 40) / 12), Z = py => Math.round(4 + (py - 280) / 12);
      const RM = new Uint8Array(W * D);                                                // 방 번호
      const rect = (id, a, b, c, d) => { for (let z = Z(b); z < Z(d) - 1; z++) for (let x = X(a); x < X(c) - 1; x++) RM[x + W * z] = id; };   // 끝 한 줄은 벽으로 남긴다
      const door = (a, b, c, d) => { for (let z = Z(b) - 1; z <= Z(d); z++) for (let x = X(a) - 1; x <= X(c); x++) RM[x + W * z] = 13; };
      const GYM = 1, STAIR = 2, SERVE = 3, CORR = 4, CAN = 6, LNG = 8, CAB = 10, DOOR = 13;
      rect(CORR, 287, 280, 383, 1165); rect(CORR, 905, 280, 1000, 1165);
      rect(CAB, 57, 280, 278, 365); rect(CAB, 57, 505, 278, 840); rect(CAB, 1010, 505, 1228, 840);
      rect(GYM, 393, 305, 897, 805); rect(STAIR, 393, 815, 897, 1052); rect(SERVE, 400, 1065, 887, 1220);
      rect(CAN, 213, 1165, 640, 1495); rect(CAN + 1, 648, 1165, 1072, 1495); rect(LNG, 57, 1165, 205, 1495); rect(LNG, 1080, 1165, 1228, 1495);
      rect(CAN, 400, 1220, 652, 1244); rect(CAN + 1, 648, 1220, 899, 1244); door(640, 1165, 648, 1225);
      // 문·트인 곳
      for (const r of [[383, 650, 393, 700], [897, 650, 905, 700], [600, 805, 690, 815], [383, 990, 393, 1040], [897, 990, 905, 1040], [500, 1052, 560, 1065], [730, 1052, 790, 1065],
        [520, 1215, 575, 1232], [715, 1215, 770, 1232], [205, 1250, 213, 1300], [1072, 1250, 1080, 1300], [278, 640, 287, 690], [1000, 640, 1010, 700], [278, 300, 287, 340]]) door(...r);
      const rm = (x, z) => (x >= 0 && z >= 0 && x < W && z < D) ? RM[x + W * z] : 0;
      const HX0 = X(40) - 1, HX1 = X(1245), HZ1 = Z(1500);                             // 선체 바깥벽
      const inHull = (x, z) => x >= HX0 && x <= HX1 && z >= 3 && z <= HZ1;

      // ── 바닥: 체육관 나무 바닥에 흰 경기장 선, 식당·복도 리놀륨, 선실 카펫 ──
      const [gx0, gz0, gx1, gz1] = [X(393), Z(305), X(897) - 2, Z(805) - 2];
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        if (!inHull(x, z)) continue;
        w.box(x, G - 4, z, x, G - 1, z, B.wallH);
        const r = rm(x, z);
        let b = r === GYM ? B.floorG : r === CAB ? B.carpet : B.floorC;
        if (r === GYM) { const ex = Math.min(x - gx0, gx1 - x), ez = Math.min(z - gz0, gz1 - z), cx = (gx0 + gx1) / 2, cz = (gz0 + gz1) / 2;
          if (ex === 3 || ez === 3 || Math.abs(z - cz) < 0.6 || Math.abs(Math.hypot(x - cx, z - cz) - 6) < 0.5) if (ex >= 3 && ez >= 3) b = B.line; }
        w.set(x, G, z, b);
      }
      // ── 벽: 체육관 서·북 벽(파란 매트)과 선체 서벽(창)·북쪽 끝만 높고, 나머지 칸막이와 카메라 쪽 벽은 낮춘 단면 ──
      const FULL = 11, GYMH = 15;
      for (let z = 1; z < D - 1; z++) for (let x = 1; x < W - 1; x++) {
        if (!inHull(x, z) || rm(x, z)) continue;
        let adj = 0; for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) if (rm(x + dx, z + dz)) adj = 1;
        if (!adj) { w.box(x, G + 1, z, x, G + 2, z, B.base); continue; }                // 지도에 없는 칸: 낮은 덩어리
        const gymSide = rm(x + 1, z) === GYM || rm(x, z + 1) === GYM;
        const hull = x === HX0 || z <= 3;
        const low = !gymSide && !hull;                                             // 안쪽 칸막이는 모두 낮게: 체육관 서·북 벽과 선체 서벽·북쪽 끝만 높다
        const h = low ? 3 : gymSide ? GYMH : FULL;
        for (let y = G + 1; y <= G + h; y++) {
          let b = y === G + h ? B.wallT : hull ? B.wallH : B.wallP;
          if (gymSide && y <= G + 6) b = (x + z) % 4 === 0 ? B.matB2 : B.matB;                    // 체육관 파란 벽 매트
          if (hull && !low && y >= G + 4 && y <= G + 7 && z % 4 < 2 && z > Z(840)) b = B.glassI;   // 식당·휴게실 창
          w.set(x, y, z, b);
        }
      }
      const gwx = gx0 - 1, gnz = gz0 - 1;                                                          // 체육관 서벽 x, 북벽 z

      // ── 체육관 ──
      const gcx = Math.round((gx0 + gx1) / 2);
      // 북벽 농구 골대(흰 판, 주황 링, 그물)와 그 아래 작은 노랑·검정 골대
      w.box(gcx - 3, G + 9, gnz + 1, gcx + 3, G + 12, gnz + 1, B.board); w.box(gcx - 1, G + 10, gnz + 1, gcx + 1, G + 10, gnz + 1, B.hoopR);
      w.box(gcx - 1, G + 8, gnz + 2, gcx + 1, G + 8, gnz + 4, B.hoopR); w.set(gcx, G + 8, gnz + 3, 0); for (const [dx, dz] of [[-1, 2], [1, 2], [-1, 4], [1, 4], [0, 4]]) w.set(gcx + dx, G + 7, gnz + dz, B.net);
      for (let x = gcx - 3; x <= gcx + 3; x++) { w.set(x, G + 1, gnz + 3, x % 2 ? B.goalY : B.iron); w.set(x, G + 3, gnz + 3, x % 2 ? B.iron : B.goalY); }
      w.box(gcx - 3, G + 2, gnz + 3, gcx - 3, G + 2, gnz + 3, B.goalY); w.box(gcx + 3, G + 2, gnz + 3, gcx + 3, G + 2, gnz + 3, B.goalY);
      // 서벽: 거울 띠와 회색 사물함 줄
      for (let z = gz0 + 2; z <= gz0 + 14; z++) w.box(gwx, G + 7, z, gwx, G + 11, z, z % 5 === 0 ? B.chrome : B.mirror);
      for (let z = gz0 + 18; z <= gz0 + 28; z++) { w.box(gx0, G + 1, z, gx0 + 1, G + 6, z, B.locker); if (z % 2) w.set(gx0 + 2, G + 4, z, B.iron); }
      // 바벨 거치대 줄(평면도 가운데 왼쪽의 긴 검은 줄): 벤치, 기둥, 원판
      const [rx0, rz0] = [X(555), Z(315)], [, rz1] = [X(605), Z(505)];
      w.box(rx0, G + 1, rz0, rx0 + 3, G + 1, rz1, B.rack);
      for (let z = rz0; z <= rz1; z += 5) { w.box(rx0, G + 2, z, rx0, G + 5, z, B.iron); w.box(rx0 + 3, G + 2, z, rx0 + 3, G + 5, z, B.iron); w.set(rx0 + 1, G + 2, z + 2, B.plate); w.set(rx0 + 2, G + 2, z + 2, B.plate); }
      for (const [u, v] of [[430, 375], [430, 465]]) { const x = X(u), z = Z(v); w.box(x, G + 1, z, x + 5, G + 2, z + 1, B.rack); w.box(x, G + 3, z, x + 5, G + 3, z + 1, B.caseK); }   // 벤치
      for (const [u, v] of [[630, 405], [630, 425], [560, 515], [445, 512]]) { const x = X(u), z = Z(v); w.box(x, G + 1, z, x + 1, G + 1, z + 1, B.plate); }   // 바닥 원판
      // 파란 바닥 매트 셋, 가운데 탁자와 상자, 상자 더미
      for (const [a, b, c, d] of [[610, 315, 700, 385], [797, 308, 895, 355], [472, 690, 545, 785]]) for (let z = Z(b); z <= Z(d); z++) for (let x = X(a); x <= X(c); x++) w.set(x, G + 1, z, (x + z) % 7 ? B.matB : B.matB2);
      { const x = X(660), z = Z(590); w.box(x, G + 1, z, x + 4, G + 2, z + 7, B.cab); w.box(x, G + 3, z, x + 4, G + 3, z + 7, B.table); w.box(x + 1, G + 4, z + 1, x + 2, G + 5, z + 2, B.crate); w.box(x + 1, G + 4, z + 5, x + 3, G + 4, z + 6, B.crate); w.set(x - 1, G + 1, z + 3, B.bottle); }
      { const x = X(710), z = Z(420); w.box(x, G + 1, z, x + 4, G + 3, z + 4, B.crate); w.box(x + 1, G + 4, z + 1, x + 3, G + 4, z + 3, B.caseG); }
      // 블랙 디비전 진지: 모래주머니(경호대 자리, 평면도 위 세모 표시), 총 거치대, 검은 장비 상자
      const bags = (x, z, len, alongX) => { for (let k = 0; k < len; k++) { const xx = alongX ? x + k : x, zz = alongX ? z : z + k; w.box(xx, G + 1, zz, xx, G + 2 + (k % 3 === 1 ? 1 : 0), zz, B.sandbag); } };
      bags(X(470), Z(560), 8, true); bags(X(760), Z(560), 8, true); bags(X(760), Z(560), 5, false);
      for (let x = gx1 - 10; x <= gx1 - 2; x++) { w.box(x, G + 1, gz0 + 1, x, G + 1, gz0 + 1, B.rack); if (x % 2 === 0) w.box(x, G + 2, gz0 + 1, x, G + 6, gz0 + 1, B.gun); }
      w.box(gx1 - 10, G + 7, gz0 + 1, gx1 - 2, G + 7, gz0 + 1, B.rack);
      lights.push({ name: 'gym', p: [gcx + 0.5, G + 13, (gz0 + gz1) / 2], c: '#f4ecd8', i: 0.6, d: 44, flicker: 0.08, srcR: 30 });
      landmarks.push({ name: '웨지(The Wedge)', note: '블랙 디비전 보스 · 3층 체육관에서 경호대 3~6명과 버틴다', p: [gcx + 0.5, G + 22, (gz0 + gz1) / 2], boss: true });

      // ── 계단실: 굽은 나무 계단(아래층으로), 배식실: 어두운 수납장 줄 ──
      { const cx = X(615), cz = Z(700), R0 = 262 / 12, R1 = 352 / 12;                        // 평면도의 웃는 모양 계단: 중심 (615,700), 반지름 262~352px
        for (let z = Z(900); z <= Z(1052); z++) for (let x = X(450); x <= X(745); x++) {
          const d = Math.hypot(x - cx, z - cz); if (d < R0 || d > R1 || rm(x, z) !== STAIR) continue;
          const t = (x - X(450)) / (X(745) - X(450)), k = Math.floor(t * 14), y = G - Math.floor(t * 5);   // 서쪽에서 동쪽으로 내려간다
          for (let yy = y; yy <= G; yy++) w.set(x, yy, z, 0); w.set(x, y, z, k % 2 ? B.step : B.woodD);
          if (d > R1 - 1) w.set(x, G + 1, z, B.chrome);                                          // 바깥 난간
        } }
      lights.push({ name: 'stair', p: [X(645) + 0.5, G + 8, Z(930) + 0.5], c: '#e8f0ff', i: 0.4, d: 22, flicker: 0.1, srcR: 20 });
      { const z0 = Z(1068), z1 = Z(1165); for (let x = X(405); x <= X(880); x++) { if (x % 9 === 0) continue; w.box(x, G + 1, z0, x, G + 3, z0 + 1, B.cab); if (rm(x, z1) === SERVE) w.box(x, G + 1, z1, x, G + 3, z1 + 1, B.cab); }
        w.set(X(610), G + 4, z0, B.bottle); w.set(X(480), G + 4, z0, B.crate); }

      // ── 식당: 싸움으로 비뚤어진 긴 흰 탁자, 흩어진 의자, 칸막이 / 휴게실: 검은 L자 소파, 갈색 안마 의자, 나무 탁자 ──
      const tbl = (u0, v0, u1, v1) => { const x0 = X(u0), z0 = Z(v0), x1 = X(u1), z1 = Z(v1), n = Math.max(Math.abs(x1 - x0), Math.abs(z1 - z0));
        for (let s = 0; s <= n; s++) { const x = Math.round(x0 + (x1 - x0) * s / n), z = Math.round(z0 + (z1 - z0) * s / n); for (const [dx, dz] of [[0, 0], [1, 0], [0, 1], [1, 1]]) { w.set(x + dx, G + 1, z + dz, s % 6 === 0 ? B.iron : 0); w.set(x + dx, G + 2, z + dz, B.table); }
          if (s % 3 === 1) { w.set(x - 1, G + 1, z + 2, B.chairW); w.set(x + 2, G + 1, z - 1, B.chairW); } } };
      tbl(390, 1340, 430, 1480); tbl(500, 1395, 545, 1490); tbl(230, 1455, 360, 1460); tbl(850, 1300, 1000, 1310); tbl(780, 1460, 850, 1390);
      for (const [u, v] of [[230, 1330], [600, 1340], [1000, 1420], [480, 1450]]) { const x = X(u), z = Z(v); w.box(x, G + 1, z, x, G + 2, z, B.chairW); }
      { const x0 = X(215), z = Z(1310); w.box(x0, G + 1, z, x0 + 9, G + 2, z + 1, B.sofa); w.box(x0, G + 3, z, x0 + 9, G + 3, z, B.sofa); }
      { const x = X(600), z = Z(1315); w.box(x, G + 1, z, x + 1, G + 2, z + 4, B.sofa); }
      for (const [x0, s] of [[X(65), 1], [X(1220), -1]]) {
        for (let z = Z(1175); z <= Z(1485); z++) { if (z > Z(1290) && z < Z(1370)) continue; w.box(x0, G + 1, z, x0 + s, G + 1, z, B.sofa); w.box(x0, G + 2, z, x0, G + 3, z, B.sofa); }
        for (const v of [1200, 1460]) w.box(x0 + s * 2, G + 1, Z(v), x0 + s * 6, G + 1, Z(v), B.sofa);
        w.box(Math.min(x0 + s, x0 + s * 3), G + 1, Z(1325), Math.max(x0 + s, x0 + s * 3), G + 3, Z(1345), B.massage);
        for (const v of [1225, 1395]) w.box(Math.min(x0 + s * 3, x0 + s * 6), G + 1, Z(v), Math.max(x0 + s * 3, x0 + s * 6), G + 2, Z(v) + 4, B.wood);
      }
      bags(X(300), Z(1240), 7, true); bags(X(860), Z(1240), 7, true); bags(X(700), Z(1420), 6, false);       // 식당 경호대 자리
      lights.push({ name: 'canteen', p: [X(640) + 0.5, G + 9, Z(1330) + 0.5], c: '#ffe8c0', i: 0.5, d: 40, flicker: 0.12, srcR: 30 });
      landmarks.push({ name: '식당', note: '뱃머리 쪽 창가 · 경호대가 탁자를 엎고 버틴다', p: [X(640) + 0.5, G + 16, Z(1330) + 0.5] });
      // ── 복도: 문, 비상구 등, 흩어진 상자 / 선실: 침대와 책상 ──
      for (const x of [X(335), X(952)]) for (let z = 8; z < Z(1100); z += 14) w.set(x, G + 1, z, B.crate);
      for (const [u, v] of [[65, 515], [65, 645], [1170, 645], [65, 205]]) { const x = X(u), z = Math.max(4, Z(v)); w.box(x, G + 1, z, x + 7, G + 2, z + 3, B.bed); w.box(x, G + 3, z, x + 1, G + 3, z + 3, B.bed); }
      for (const [u, v] of [[200, 790], [1050, 790], [150, 330]]) { const x = X(u), z = Z(v); w.box(x, G + 1, z, x + 4, G + 3, z + 1, B.wood); }

      // ════ 상호작용 ════
      { const x = X(560), z = Z(1290); const sp = OR.signpost(w, B, x, z, { dir: [1, 0], h: 6, boards: 1 });
        acts.push(OR.goAct({ at: sp, name: '앞갑판으로 나가기', goto: 'icebreaker', hint: '식당 앞문을 나가 눈 덮인 앞갑판과 얼음판으로 돌아가요' })); }
      { const x = X(820), z = Z(930); const sp = OR.signpost(w, B, x, z, { dir: [1, 0], h: 6, boards: 1 });
        acts.push(OR.goAct({ at: sp, name: '조타실로 올라가기', goto: 'icebreaker-in', hint: '굽은 계단을 따라 9층 조타실까지 올라가요' })); }
      // 섬광탄: 체육관 한가운데에서 번쩍
      acts.push({
        name: '섬광탄', hint: '웨지 일당이 체육관에 섬광탄을 던져 하얀 빛이 번쩍 터져요', hit: [gcx - 4, G + 1, Z(560) - 4, gcx + 4, G + 4, Z(560) + 4],
        run: async a => { a.lightning(1); a.flash('gym', 8, 1.2); a.glow(3, 1.2); a.burst([gcx + 0.5, G + 2, Z(600) + 0.5], { n: 90, colors: ['#ffffff', '#fff8e0'], speed: 9, up: 3, life: 0.6, gravity: 0, spread: 1 }); await a.wait(1.6); a.burst([gcx + 0.5, G + 2, Z(600)], { n: 30, colors: ['#9a9a9a', '#cfcfcf'], speed: 1, up: 1.5, life: 2.5, gravity: -0.2, spread: 2 }); await a.wait(1); },
      });
      // CS 최루 가스: 계단실에서 퍼진다
      acts.push({
        name: 'CS 최루 가스', hint: '경호대가 계단실에 CS 가스탄을 굴려 희뿌연 연기가 복도까지 번져요', hit: [X(600), G, Z(830), X(690), G + 4, Z(900)],
        run: async a => { for (let k = 0; k < 12; k++) { a.burst([X(645) + 0.5 + (k % 3 - 1) * 4, G + 1.5, Z(860) + (k % 4) * 2], { n: 26, colors: ['#e8e8dc', '#d4d8c8', '#c0c4b0'], speed: 1.6, up: 1.2, life: 3, gravity: -0.15, spread: 2.5 }); await a.wait(0.35); } },
      });
      // 농구공: 골대로 던져 넣는다(부품)
      const BX = gcx, BZ = gnz + 14;
      const ball = w.prop({ name: 'ball', pivot: [BX + 0.5, G + 1, BZ + 0.5] });
      ball.set(BX, G + 1, BZ, B.hoopR);
      acts.push({
        name: '농구 골대', hint: '체육관 바닥의 농구공이 높이 날아 북쪽 벽 골대에 쏙 들어가요', hit: [BX - 2, G + 1, BZ - 2, BX + 2, G + 3, BZ + 2],
        run: async a => {
          await a.path('ball', [[0, 4, -4], [0, 9, -8], [0, 8, -11], [0, 6, -11], [0, 0, -10], [0, 2, -8], [0, 0, -6]], 2.4);
          a.burst([gcx + 0.5, G + 8, gnz + 3.5], { n: 10, colors: ['#ffffff', '#e8e8e8'], speed: 1, up: 0.5, life: 0.6, gravity: 2, spread: 0.6 });
          await a.wait(0.4); await a.path('ball', [[0, 0, 0]], 1);
        },
      });
      // 바벨: 거치대 위 바벨(부품)이 들렸다 내려진다
      const BBz = rz0 + 12;
      const bar = w.prop({ name: 'barbell', pivot: [rx0 + 1.5, G + 6, BBz + 0.5] });
      bar.box(rx0 - 2, G + 6, BBz, rx0 + 5, G + 6, BBz, B.chrome); for (const x of [rx0 - 2, rx0 - 1, rx0 + 4, rx0 + 5]) bar.box(x, G + 5, BBz, x, G + 7, BBz, B.plate);
      acts.push({
        name: '바벨', hint: '거치대의 묵직한 바벨이 번쩍 들렸다가 쿵 하고 내려와요', hit: [rx0 - 3, G + 4, BBz - 2, rx0 + 6, G + 8, BBz + 2],
        run: async a => { for (let k = 0; k < 3; k++) { await a.move('barbell', [0, 3, 0], 0.7); await a.move('barbell', [0, 0, 0], 0.4); a.burst([rx0 + 1.5, G + 5, BBz + 0.5], { n: 10, colors: ['#c8c0b0', '#e8e0d0'], speed: 1.5, up: 1, life: 0.6, gravity: 3, spread: 2, flat: true }); await a.wait(0.3); } },
      });
      // 블랙 디비전 장비 상자: 뚜껑(부품)이 열리며 초록 빛
      const CXb = gx1 - 6, CZb = gz0 + 4;
      w.box(CXb, G + 1, CZb, CXb + 3, G + 2, CZb + 2, B.caseK); w.set(CXb + 1, G + 2, CZb + 1, B.exitG);
      const lid = w.prop({ name: 'lid', pivot: [CXb + 2, G + 3, CZb] });
      lid.box(CXb, G + 3, CZb, CXb + 3, G + 3, CZb + 2, B.caseK); lid.set(CXb + 1, G + 3, CZb + 2, B.goalY);
      acts.push({
        name: '블랙 디비전 장비 상자', hint: '총 거치대 옆 검은 장비 상자의 뚜껑이 열리며 초록 불빛이 새어 나와요', hit: [CXb - 1, G + 1, CZb - 1, CXb + 4, G + 4, CZb + 3],
        run: async a => { await a.turn('lid', [-1.2, 0, 0], 0.8); a.burst([CXb + 2, G + 3, CZb + 1.5], { n: 16, colors: ['#3ad06a', '#a8ffb8'], speed: 0.6, up: 1.5, life: 1.4, gravity: -0.3, spread: 1 }); await a.wait(2); await a.turn('lid', [0, 0, 0], 0.6); },
      });
      // 식당 정전: 불이 깜박이다 붉은 비상등
      w.set(X(640), G + FULL - 1, Z(1180), B.redL);
      lights.push({ name: 'alarm', p: [X(640) + 0.5, G + FULL - 1.5, Z(1180) + 1.5], c: '#ff3a2a', i: 0.15, d: 40, flicker: 0.3, srcR: 4 });
      acts.push({
        name: '식당 정전', hint: '식당 불빛이 지직거리다 꺼지고 붉은 비상등만 깜박여요', hit: [X(600), G + FULL - 3, Z(1170), X(690), G + FULL, Z(1195)],
        run: async a => { for (let k = 0; k < 4; k++) { a.flash('canteen', 0.1, 0.15); a.burst([X(640) + 0.5, G + FULL - 1, Z(1180) + 1], { n: 12, colors: ['#ffe080', '#ffffff', '#ff9a40'], speed: 2.5, up: 0.5, life: 0.6, gravity: 6, spread: 0.5 }); await a.wait(0.3); } a.flash('canteen', 0.05, 3); a.flash('gym', 0.3, 3); await a.flash('alarm', 9, 3); },
      });
      return { lights, landmarks, acts };
    },
  });
})();
