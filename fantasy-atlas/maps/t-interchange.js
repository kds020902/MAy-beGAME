// 인터체인지 · 울트라 쇼핑몰 — 남북으로 긴 대형 쇼핑몰: 북쪽 끝 IDEA(파랑), 동쪽 면 고샨(빨강)과 유리 정문 위 ULTRA 간판, 남쪽 끝 OLI(초록).
// 가운데 갤러리는 지붕이 무너져 속이 보인다(에스컬레이터, KIBA 총포점, 테크라이트). 동쪽 주차장에 분수와 무대, 북동쪽 발전소, 남동쪽 비상사태부 검문소
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 168, D = 168, Hh = 96;
  // 3×5 픽셀 글꼴(간판 글자)
  const FONT = {
    U: ['101', '101', '101', '101', '111'], L: ['100', '100', '100', '100', '111'], T: ['111', '010', '010', '010', '010'], R: ['110', '101', '110', '101', '101'],
    A: ['010', '101', '111', '101', '101'], O: ['111', '101', '101', '101', '111'], I: ['111', '010', '010', '010', '111'], D: ['110', '101', '101', '101', '110'],
    E: ['111', '100', '110', '100', '111'], K: ['101', '101', '110', '101', '101'], B: ['110', '101', '110', '101', '110'], G: ['111', '100', '101', '101', '111'],
    S: ['111', '100', '111', '001', '111'], H: ['101', '101', '111', '101', '101'], N: ['101', '111', '111', '111', '101'],
  };
  // 글자 쓰기: face 's'는 z면(오른쪽 +x), 'e'는 x면(오른쪽 -z). b는 블록 또는 글자 번호 → 블록
  const text = (w, s, x0, yTop, z0, face, b, sc, gap) => {
    sc = sc || 1; gap = gap == null ? (sc > 1 ? 2 : 1) : gap;
    const out = [];
    let u = 0;
    [...s].forEach((ch, k) => {
      const g = FONT[ch], bl = typeof b === 'function' ? b(k) : b;
      if (g) for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) if (g[r][c] === '1') for (let sy = 0; sy < sc; sy++) for (let sx = 0; sx < sc; sx++) {
        const uu = u + c * sc + sx, y = yTop - r * sc - sy;
        if (face === 's') w.set(x0 + uu, y, z0, bl); else w.set(x0, y, z0 - uu, bl);
      }
      out.push(face === 's' ? [x0 + u + 1.5 * sc, yTop - 2 * sc, z0 + 0.5] : [x0 + 0.5, yTop - 2 * sc, z0 - u - 1.5 * sc]);
      u += 3 * sc + gap;
    });
    return out;
  };

  MAPS.push({
    id: 'interchange', cat: 'tarkov', name: '인터체인지', en: 'Interchange · ULTRA Mall', color: '#e8742a', seed: 605, base: 20, time: 'day', size: [W, D, Hh],
    desc: '항구와 공업 지대를 잇는 남쪽 인터체인지 한가운데의 대형 쇼핑몰 「울트라」. 남북으로 길게 누운 파란 골함석 건물에 북쪽 끝은 IDEA, 동쪽 면은 붉은 고샨, 남쪽 끝은 초록 OLI가 차지한다. 비상사태부(EMERCOM)의 대피 거점이었지만 이제 가운데 갤러리 지붕은 무너져 내렸고, 멈춘 에스컬레이터와 셔터 내린 총포점 KIBA, 버려진 차와 쇼핑카트만 남았다.',
    info: { title: '구역 정보', en: 'TARKOV · INTERCHANGE', rows: [['자리', '타르코프 남쪽 인터체인지 · 울트라 쇼핑몰'], ['배치', '북 IDEA · 동 고샨 · 남 OLI · 가운데 갤러리'], ['전력', '북동쪽 발전소 스위치를 올리면 몰에 불이 들어옴'], ['탈출', '남동쪽 비상사태부 검문소']] },
    sky: ['#c8bca8', '#6a7684', '#e8c8a0'], stars: false,
    hemi: ['#e8e4dc', '#4a4640', 0.6], sun: ['#ffe4c4', 0.72, [0.5, 1, 0.55]],
    night: { sky: ['#2e2a30', '#0a0c14', '#a86a48'], stars: true, hemi: ['#8a90a8', '#14121a', 0.34], sun: ['#b8c0e0', 0.22, [0.5, 1, 0.55]], haze: '#22242a' },
    liquid: ['#4a6a74', '#6a8a94', '#c8dce4'], liqSpeed: 0.4,
    fog: { start: 0.86, floor: 12, depth: 8, haze: [24, 0.1, 6], hazeColor: '#c8c0b4' },
    camY: -6, zoom: 1.15,
    particles: [
      { n: 120, colors: ['#b8b4ac', '#8a8680', '#d8d0c4'], mode: 'drift', speed: 0.35, wind: 0.5, y0: 22, y1: 70, glow: false },
      { n: 70, colors: ['#5a5654', '#7a7470', '#3e3c3a'], mode: 'rise', speed: 0.35, area: [42, 65, 6], y0: 36, y1: 80, glow: false, size: 2 },
    ],
    blocks: Object.assign(OR.blocks(), {
      asph: { c: '#4a4a4a', top: '#58564f', v: 0.06 }, asphW: { c: '#3e3e3c', top: '#4a4844', v: 0.04 }, lineW: { c: '#d8d8d0', v: 0.03 }, lineY: { c: '#d8b030', v: 0.04 },
      walk: { c: '#8a8882', top: '#a09c94', v: 0.05, pat: 'check', alt: '#96928a' }, curbC: { c: '#7a7872', top: '#9a968e', v: 0.03 }, gravel: { c: '#6a645a', top: '#7a746a', v: 0.1 },
      tile: { c: '#96928a', top: '#a6a298', v: 0.03, pat: 'check', alt: '#9c988e' }, tileG: { c: '#8a8a84', top: '#9a9890', v: 0.03, pat: 'floor' },
      ribB: { c: '#2e5aa0', v: 0.03, pat: 'big' }, ribB2: { c: '#244a88', v: 0.03 }, panel: { c: '#b8a88a', v: 0.03, pat: 'big' }, panel2: { c: '#a8987a', v: 0.03 },
      concDk: { c: '#5a5852', v: 0.05, pat: 'stone' }, conc: { c: '#8a8a84', v: 0.06, pat: 'stone' }, trimC: { c: '#c8c4bc', v: 0.02 },
      slab: { c: '#7e7c76', top: '#8e8c86', v: 0.04 }, soot: { c: '#2a2624', v: 0.08 }, rubble: { c: '#7a7670', v: 0.12, pat: 'stone' }, rebar: { c: '#6a3e2a', v: 0.06 },
      steel: { c: '#565a62', v: 0.03 }, steelR: { c: '#7a4a32', v: 0.08 }, glassS: { c: '#5a7484', v: 0.03 }, glassD: { c: '#3a4652', v: 0.03 }, railG: { c: '#8aa4b0', v: 0.02 }, sky: { c: '#9ab4c4', v: 0.03 },
      gosR: { c: '#c84a34', v: 0.04, pat: 'big' }, gosR2: { c: '#b03e2e', v: 0.04 }, gosG: { c: '#3a9a4a', v: 0.03 },
      oliG: { c: '#2e8a44', v: 0.03 }, oliG2: { c: '#3aa050', v: 0.03 }, ideaB: { c: '#2a5aa8', v: 0.03 }, ideaY: { c: '#f2cc2a', v: 0.03 }, kibaK: { c: '#24262a', v: 0.02 }, signW: { c: '#ecebe4', v: 0.02 }, kibaBl: { c: '#3a4a9a', v: 0.02 },
      pinkS: { c: '#d86a8a', v: 0.03 }, tealS: { c: '#3a9a98', v: 0.03 }, pharmG: { c: '#3aa860', v: 0.03 }, techR: { c: '#c8302a', v: 0.02 }, burgY: { c: '#e8a030', v: 0.03 },
      shutter: { c: '#8a8e92', v: 0.02, pat: 'log' }, esc: { c: '#a8acb0', v: 0.02 }, escT: { c: '#6a6e72', top: '#7a7e82', v: 0.02 }, escY: { c: '#d8b030', v: 0.02 }, rubber: { c: '#1e1e22', v: 0.02 },
      shelf: { c: '#9aa0a4', v: 0.03 }, rackO: { c: '#d8782a', v: 0.03 }, rackB: { c: '#2a4a8a', v: 0.03 }, box1: { c: '#c8a070', v: 0.08 }, box2: { c: '#d8d0b8', v: 0.06 },
      goodR: { c: '#c03a3a', v: 0.08 }, goodB: { c: '#3a6ab0', v: 0.08 }, goodG: { c: '#4a8a3a', v: 0.08 }, goodY: { c: '#e8c040', v: 0.08 },
      sofa: { c: '#4a6a9a', v: 0.04 }, wood: { c: '#8a6a48', v: 0.05, pat: 'plank' }, crate: { c: '#6a7048', v: 0.05, pat: 'plank' }, gun: { c: '#1a1a1c', v: 0.02 },
      sand: { c: '#a89a74', v: 0.08, pat: 'stone' }, tarpB: { c: '#3a5a8a', v: 0.04 }, tarpO: { c: '#e07a2a', v: 0.04 }, tarpW: { c: '#d8d8d0', v: 0.03 }, crossR: { c: '#c83030', v: 0.03 }, milG: { c: '#566244', v: 0.05 },
      carB: { c: '#6a88a4', v: 0.04 }, carW: { c: '#c8c6be', v: 0.04 }, carG: { c: '#4a6a4e', v: 0.04 }, carR: { c: '#8a3a2e', v: 0.04 }, carY: { c: '#c8a040', v: 0.04 }, carK: { c: '#2a2826', v: 0.08 },
      tire: { c: '#1c1c1e', v: 0.03 }, cart: { c: '#b0b4b8', v: 0.02 }, cartR: { c: '#c03030', v: 0.02 }, jersey: { c: '#b4b0a6', v: 0.05 }, hazard: { c: '#e8b828', v: 0.03 }, hazardK: { c: '#24262a', v: 0.03 },
      brick: { c: '#8a5a44', v: 0.06, pat: 'brick' }, brickR: { c: '#a04a32', top: '#b45a3e', v: 0.06, pat: 'brick' }, stageP: { c: '#d86a9a', v: 0.03 }, transf: { c: '#6a7a6e', v: 0.03, pat: 'log' }, fenceM: { c: '#7a7e80', v: 0.02 },
      lampOff: { c: '#d8d4c4', v: 0.02 }, lampW: { c: '#fff4d0', glow: true }, lampN: { c: '#ffe0a0', night: true, day: '#c8c4b4' },
      alarmR: { c: '#ff3a2a', glow: true }, lampG: { c: '#5aff7a', glow: true }, ember: { c: '#ff7a2a', glow: true }, screenG: { c: '#6aff9a', glow: true }, tailR: { c: '#ff4a3a', glow: true }, headY: { c: '#ffe8a0', glow: true },
      neonR: { c: '#ff4a4a', night: true, day: '#d03a3a' }, neonY: { c: '#ffd84a', night: true, day: '#e8c030' }, neonG: { c: '#5ae86a', night: true, day: '#3aa04a' }, neonB: { c: '#5aa0ff', night: true, day: '#3a6ac8' }, neonO: { c: '#ff9a3a', night: true, day: '#e07a2a' },
    }),
    build(w) {
      const B = w.id, G = w.base;
      const X0 = 34, X1 = 112, Z0 = 12, Z1 = 140, F2 = G + 10, RF = G + 20;
      const IZ = 42, GZ0 = 66, GZ1 = 118, OZ = 122, GX = 87;          // IDEA 끝 z, 고샨 z 범위, OLI 시작 z, 고샨 서벽 x
      const lights = [], acts = [], landmarks = [];
      const h = (x, z, k) => hash3(x, k || 0, z);
      const inMall = (x, z) => x >= X0 && x <= X1 && z >= Z0 && z <= Z1;

      // ── 바닥: 몰 안 타일, 둘레 보도, 서쪽 도로(남북), 북쪽 철길, 동·남쪽 주차장 ──
      MH.terrain(w, {
        floor: G - 5, height: () => G,
        surface: (x, z) => {
          if (inMall(x, z)) return (x >= GX || z <= IZ || z >= OZ) ? B.tileG : B.tile;
          if (x >= X0 - 4 && x <= X1 + 4 && z >= Z0 - 4 && z <= Z1 + 4) return (x === X0 - 4 || x === X1 + 4 || z === Z0 - 4 || z === Z1 + 4) ? B.curbC : B.walk;
          if (z <= 5) return (z === 2 || z === 4) ? B.steel : (x % 3 === 0 && z === 3 ? B.wood : B.gravel);                  // 철길
          if (x >= 4 && x <= 18) return x === 11 && z % 6 < 3 ? B.lineW : (x === 4 || x === 18 ? B.curbC : B.asph);      // 서쪽 큰길
          if (x >= 124 && x <= 164 && z >= 62 && z <= 140) { const xr = (x - 124) % 20; if ((xr <= 7 || xr >= 12) && z % 6 === 0) return B.lineW; if (xr === 9 && z % 6 < 3) return B.lineY; }
          if (z >= 146 && z <= 164 && x >= 22 && x <= 130) { const zr = z - 146; if ((zr <= 7 || zr >= 11) && x % 6 === 0) return B.lineW; }
          return h(x >> 2, z >> 2, 3) > 0.8 ? B.asphW : B.asph;
        },
        under: (x, z, y, dep) => dep < 2 ? B.concDk : B.rock,
      });

      // ── 바깥벽: 파란 골함석. 동쪽 가운데는 붉은 고샨, 남쪽 끝은 OLI. 남벽 서쪽 절반은 무너졌다 ──
      const broken = (u, s) => G + 2 + Math.floor(h(u, s, 5) * 3) + ((u % 12 === 4) ? 3 + Math.floor(h(u, s, 6) * 8) : 0);
      const wallTop = (x, z) => {
        if (z === Z0 || x === X0) return RF;
        if (x === X1) return (z >= GZ0 && z <= GZ1) ? G + 18 : RF;
        if (z === Z1) { if (x >= 76) return RF; if (x >= 68) return Math.max(broken(x, 1), RF - (76 - x) * 2); return broken(x, 1); }
        return 0;
      };
      for (let x = X0; x <= X1; x++) for (let z = Z0; z <= Z1; z++) {
        if (x !== X0 && x !== X1 && z !== Z0 && z !== Z1) continue;
        const top = wallTop(x, z), u = (x === X0 || x === X1) ? z : x;
        for (let y = G + 1; y <= top; y++) {
          let b = u % 2 ? B.ribB : B.ribB2;
          if (x === X1 && z >= GZ0 && z <= GZ1) b = u % 7 === 0 ? B.gosR2 : B.gosR;
          if (z === Z1 || (x === X1 && z >= OZ)) b = u % 2 ? B.panel : B.panel2;
          if (y <= G + 2) b = B.concDk;
          else if (y === top && top >= RF - 2) b = B.trimC;
          if (top < G + 12 && y === top && h(x, z, y) > 0.5) b = B.rubble;
          w.set(x, y, z, b);
        }
        if (top < G + 12) for (let y = top + 1; y <= top + 2; y++) if (h(x, z, y + 7) > 0.8) w.set(x, y, z, B.rebar);
      }
      // IDEA: 동쪽 벽 위 노란 글자 띠, 남쪽 IDEA 차고 입구
      w.box(X1 + 1, G + 6, 10, X1 + 1, G + 16, 38, B.ideaB);
      text(w, 'IDEA', X1 + 2, G + 15, 37, 'e', B.ideaY, 2, 1);
      // 고샨: 붉은 벽 위 초록 글자, 짐 싣는 문
      text(w, 'GOSHAN', X1 + 1, G + 16, 112, 'e', B.gosG, 2);
      for (const z of [100, 106]) w.box(X1, G + 1, z, X1, G + 5, z + 3, B.shutter);
      // OLI: 남쪽 면 초록 간판(흰 글자), 동쪽 면 초록 띠
      w.box(78, G + 8, Z1 + 1, 106, G + 19, Z1 + 1, B.oliG); w.box(78, G + 8, Z1 + 1, 106, G + 8, Z1 + 1, B.oliG2);
      text(w, 'OLI', 84, G + 17, Z1 + 2, 's', B.signW, 2, 3);
      w.box(X1 + 1, G + 16, OZ + 1, X1 + 1, G + 19, Z1, B.oliG);
      for (let x = 80; x <= 104; x += 6) w.box(x, G + 1, Z1, x + 3, G + 5, Z1, B.shutter);
      landmarks.push({ name: 'OLI', note: '남쪽 끝 초록 간판의 대형 철물점', p: [92, RF + 6, Z1 + 1] });
      landmarks.push({ name: 'IDEA', note: '북쪽 끝 파랑·노랑 가구점', p: [X1 + 1, RF + 6, 26] });

      // ── 지붕: IDEA·OLI·정문 쪽만 남았다. 지붕 위 채광창 줄. 가운데 갤러리와 고샨 남쪽은 무너지고 철골 트러스만 ──
      const roofAt = (x, z) => {
        if (z <= IZ) return true;
        if (x >= GX && z < GZ0) return true;
        if (x >= GX && z <= 72 + Math.floor(h(x >> 1, 2, 9) * 4)) return true;
        if (z >= OZ && x >= 94 + Math.floor(h(z >> 1, 3, 9) * 5)) return true;
        if (x <= 48) return true;
        return false;
      };
      for (let x = X0; x <= X1; x++) for (let z = Z0; z <= Z1; z++) if (roofAt(x, z)) {
        w.set(x, RF, z, B.slab);
        if (x % 12 >= 4 && x % 12 <= 7 && z % 14 >= 4 && z % 14 <= 8 && x > X0 + 2 && x < X1 - 2 && z > Z0 + 2 && z < Z1 - 2) w.set(x, RF + 1, z, (x % 12 === 4 || x % 12 === 7 || z % 14 === 4 || z % 14 === 8) ? B.steel : B.sky);
      }
      for (let x = X0 + 1; x < X1; x++) for (let z = Z0 + 1; z < Z1; z++) if (!roofAt(x, z) && roofAt(x - 1, z) + roofAt(x + 1, z) + roofAt(x, z - 1) + roofAt(x, z + 1) > 0 && h(x, z, 31) > 0.6) w.set(x, RF, z, B.rubble);
      for (let z = GZ0; z < OZ; z += 12) for (let x = 49; x < X1; x++) if (!roofAt(x, z) && h(x >> 3, z, 11) > 0.25) { w.set(x, RF, z, B.steel); if (x % 4 === 0) w.set(x, RF - 1, z, B.steel); }
      for (const x of [62, 76, 100]) for (let z = GZ0; z < Z1; z++) if (!roofAt(x, z) && h(x, z >> 3, 12) > 0.3) w.set(x, RF, z, z % 9 === 0 ? B.steelR : B.steel);
      for (const x of [62, 76]) for (const z of [55, 79, 103]) w.box(x, G + 1, z, x, RF, z, B.steel);
      w.line(100, RF, 94, 94, G + 2, 104, B.steelR); w.line(76, RF, 115, 70, G + 3, 120, B.steel);
      const rubble = (cx, cz, r) => { for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) { const d = Math.hypot(dx, dz); const hh = Math.round((r - d) * 0.8 + h(cx + dx, cz + dz, 14) * 1.5); for (let y = 1; y <= hh; y++) w.set(cx + dx, G + y, cz + dz, h(cx + dx, y, cz + dz) > 0.85 ? B.rebar : (h(dx, y, dz) > 0.5 ? B.rubble : B.slab)); } };
      rubble(98, 104, 4); rubble(80, 50, 3); rubble(56, 128, 4); rubble(62, 120, 2); rubble(104, 90, 3);
      for (let x = 92; x <= 98; x++) for (let z = 96; z <= 100; z++) w.set(x, G + 1 + Math.floor((x - 92) * 0.7), z, B.slab);

      // ── 동쪽 정문: 철골 격자 유리 상자, 그 위에 ULTRA 간판(밤에는 네온) ──
      const EZ0 = 44, EZ1 = 62, EXX = X1 + 6;
      for (let x = X1 + 1; x <= EXX; x++) for (let z = EZ0; z <= EZ1; z++) {
        const edge = x === EXX || z === EZ0 || z === EZ1;
        for (let y = G + 1; y <= G + 15; y++) {
          if (!edge) { if (y === G + 15) w.set(x, y, z, B.slab); continue; }
          const u = x === EXX ? z : x;
          let b = (u % 3 === 0 || (y - G) % 4 === 0) ? B.steel : B.glassS;
          if (x === EXX && z >= 49 && z <= 57 && y <= G + 5) b = (z === 49 || z === 57 || y === G + 5) ? B.steel : 0;
          if (y === G + 15) b = B.trimC;
          w.set(x, y, z, b);
        }
      }
      for (let z = 50; z <= 56; z++) for (let x = X1; x < EXX; x++) for (let y = G + 1; y <= G + 4; y++) w.set(x, y, z, 0);
      w.box(EXX + 1, G + 6, 47, EXX + 4, G + 6, 59, B.ribB2); for (const z of [47, 59]) w.box(EXX + 4, G + 1, z, EXX + 4, G + 5, z, B.steel);
      const SY = G + 27;
      w.box(EXX - 2, G + 16, 40, EXX - 2, SY + 1, 40, B.steel); w.box(EXX - 2, G + 1, 76, EXX - 2, SY + 1, 76, B.steel); w.box(EXX - 2, SY + 1, 40, EXX - 2, SY + 1, 76, B.steel); w.box(EXX - 2, G + 17, 62, EXX - 2, G + 17, 76, B.steel);
      const ULT = [B.neonR, B.neonY, B.neonG, B.neonB, B.neonO];
      const letters = text(w, 'ULTRA', EXX - 1, SY, 75, 'e', k => ULT[k], 2, 1);
      for (let z = 42; z <= 62; z += 3) w.set(EXX - 1, G + 16, z, B.lampN);
      lights.push({ name: 'ultra', p: [EXX + 2, G + 22, 53], c: '#ffb878', i: 0.5, d: 34, flicker: 0.1, srcR: 6 });
      landmarks.push({ name: '울트라 쇼핑몰', note: '비상사태부 대피 거점이던 대형 쇼핑몰 · 동쪽 정문', p: [EXX, SY + 8, 53], boss: true });
      acts.push({
        name: '울트라 간판 점등', hint: '정문 유리 상자 위 「ULTRA」 간판에 글자마다 차례로 네온이 들어와요', hit: [EXX - 1, G + 16, 41, EXX - 1, SY, 75],
        run: async a => {
          const cs = ['#ff4a4a', '#ffd84a', '#5ae86a', '#5aa0ff', '#ff9a3a'];
          for (let k = 0; k < 5; k++) { const p = letters[k]; a.burst([p[0] + 0.6, p[1], p[2]], { n: 40, colors: [cs[k], '#ffffff'], speed: 3, up: 1, life: 0.9, gravity: 0, spread: 3, h: 8 }); await a.wait(0.35); }
          a.flash('ultra', 6, 3.5); a.glow(1.8, 3.5);
          for (let k = 0; k < 3; k++) { for (let z = 42; z <= 62; z += 3) a.burst([EXX - 0.2, G + 16.5, z + 0.5], { n: 3, colors: ['#ffe0a0', '#ffffff'], speed: 0.4, up: 0.3, life: 0.7, gravity: 0, spread: 0.2 }); await a.wait(0.7); }
        },
      });

      // ── 칸막이: IDEA·OLI·고샨과 가운데 갤러리 사이 ──
      for (let x = X0 + 1; x < X1; x++) { const t = x < 98 ? G + 4 + Math.floor(h(x, 7, 7) * 4) : RF - 1; w.box(x, G + 1, IZ, x, RF - 1, IZ, B.panel2); w.box(x, G + 1, OZ, x, t, OZ, B.panel2); }
      for (let x = 50; x <= 84; x += 8) w.box(x, G + 1, IZ, x + 4, G + 6, IZ, B.glassD);
      for (let z = GZ0; z < OZ; z++) { const inG = z >= GZ0 && z <= GZ1, top = (inG && z > 74) ? G + 6 + Math.floor(h(z, 8, 8) * 6) : RF - 1; w.box(GX, G + 1, z, GX, top, z, inG ? B.gosR2 : B.panel2); }
      w.box(GX + 1, G + 1, GZ0 - 1, X1 - 1, RF - 1, GZ0 - 1, B.panel2); w.box(GX + 4, G + 1, GZ0 - 1, X1 - 4, G + 7, GZ0 - 1, 0);
      for (let z = 70; z <= 114; z += 11) w.box(GX, G + 1, z, GX, G + 5, z + 4, z % 2 ? B.glassS : 0);
      // IDEA 안: 쇼룸 가구와 높은 창고 선반(지붕 아래라 거의 안 보임)
      for (let x = 40; x <= 106; x += 6) w.box(x, G + 1, 16, x + 3, G + 12, 18, h(x, 4, 4) > 0.5 ? B.ideaB : B.box1);
      // 고샨 안: 진열대 줄과 계산대
      for (let x = 90; x <= 108; x += 4) for (let z = 68; z <= 116; z++) {
        if (z > 90 && z < 94) continue;
        w.box(x, G + 1, z, x, G + 3, z, B.shelf);
        w.set(x, G + 2 + (z & 1), z, [B.goodR, B.goodB, B.goodG, B.goodY, B.box1, B.box2][Math.floor(h(x, z >> 1, 19) * 6)]);
      }
      for (let z = 70; z <= 110; z += 8) { w.box(GX + 1, G + 1, z, GX + 2, G + 2, z + 2, B.shelf); w.set(GX + 1, G + 3, z, B.screenG); }
      landmarks.push({ name: '고샨 하이퍼마켓', note: '동쪽 면 붉은 벽 · 진열대와 계산대', p: [X1 + 1, G + 26, 92] });
      // OLI 안: 높은 팔레트 랙(주황·파랑)과 상자
      for (let x = 38; x <= 106; x += 7) for (let z = 126; z <= 136; z++) {
        if (z === 131) continue;
        for (const y of [G + 1, G + 5, G + 9]) w.set(x, y + 3, z, B.rackO);
        if (z % 5 === 1) w.box(x, G + 1, z, x, G + 12, z, B.rackB);
        if (h(x, z, 24) > 0.3) w.set(x, G + 1 + 4 * Math.floor(h(z, x, 25) * 3), z, h(x, z, 26) > 0.5 ? B.box1 : B.oliG2);
      }

      // ── 가운데 갤러리 서쪽 줄 상점(1·2층). 2층 회랑 난간, 불탄 가게 ──
      for (let x = X0; x <= 52; x++) for (let z = GZ0; z < OZ; z++) w.set(x, F2, z, B.slab);
      for (let z = GZ0; z < OZ; z++) if (!(z >= 81 && z <= 89)) w.set(52, F2 + 1, z, z % 4 === 0 ? B.steel : B.railG);
      const fronts = [[GZ0, 58, B.tealS, B.pinkS], [58, 72, B.pharmG, B.soot], [72, 80, B.signW, B.tealS], [90, 104, B.pinkS, B.signW], [104, OZ, B.burgY, B.pharmG]];
      for (const [z0, z1, bandA, bandB] of fronts) {
        w.box(X0, G + 1, z0, 51, F2 - 1, z0, B.panel2); w.box(X0, F2 + 1, z0, 48, RF - 1, z0, B.panel2);
        for (let z = z0 + 1; z < z1; z++) {
          for (let y = G + 1; y <= G + 9; y++) w.set(51, y, z, y >= G + 6 ? bandA : (z === z0 + 1 || z === z1 - 1 || y === G + 5) ? B.steel : ((z - z0) % 6 === 3 && y <= G + 4 ? 0 : B.glassS));
          for (let y = F2 + 1; y <= RF - 1; y++) w.set(48, y, z, y >= F2 + 6 ? bandB : (z === z0 + 1 || z === z1 - 1 || y === F2 + 5) ? B.steel : B.glassS);
        }
      }
      w.box(X0, G + 1, 80, 51, F2 - 1, 80, B.panel2); w.box(X0, G + 1, 90, 51, F2 - 1, 90, B.panel2);
      for (let z = 81; z < 90; z++) for (let y = G + 1; y <= F2 - 1; y++) w.set(51, y, z, y >= G + 7 ? B.trimC : 0);       // 에스컬레이터 밑 통로
      for (let z = 83; z <= 87; z += 2) w.box(X0 + 1, G + 1, z, X0 + 1, G + 6, z, B.steel);
      for (const [dz, dy] of [[0, -1], [0, 0], [0, 1], [-1, 0], [1, 0]]) w.set(52, G + 7 + dy, 65 + dz, B.pharmG);
      for (let z = 46; z <= 56; z += 3) w.box(38, G + 1, z, 46, G + 3, z, B.shelf), w.box(39, G + 4, z, 45, G + 4, z, B.goodB);
      for (let z = 92; z <= 102; z += 4) w.box(40, G + 1, z, 47, G + 2, z + 1, B.signW);
      for (let z = 106; z <= 118; z += 4) w.box(42, G + 1, z, 44, G + 2, z + 1, B.wood);
      // 불탄 가게(2층 58~72)
      for (let z = 59; z < 72; z++) for (let y = F2 + 1; y <= RF - 1; y++) if (h(z, y, 15) > 0.25) w.set(48, y, z, 0);
      for (let x = X0 + 1; x < 48; x++) for (let z = 59; z < 72; z++) { if (h(x, z, 16) > 0.6) w.set(x, F2 + 1, z, B.soot); if (h(x, z, 17) > 0.92) w.set(x, F2 + 1, z, B.ember); }
      for (let z = 59; z < 72; z++) for (let y = F2 + 1; y < RF; y++) if (h(z, y, 18) > 0.4) w.set(X0 + 1, y, z, B.soot);
      w.box(40, F2 + 1, 62, 44, F2 + 2, 68, B.soot); w.box(41, F2 + 3, 64, 43, F2 + 3, 66, B.ember);
      for (let x = X0 + 1; x <= 48; x++) for (let z = 58; z <= 72; z++) if (h(x, z, 27) > 0.12) w.set(x, RF, z, 0);   // 불에 꺼진 지붕
      lights.push({ name: 'fire', p: [42, F2 + 4, 65], c: '#ff8a3a', i: 0.6, d: 22, flicker: 0.7, srcR: 4 });
      acts.push({
        name: '불타는 상점', hint: '2층 서쪽 줄의 불탄 가게에서 다시 불길이 일고 검은 연기가 뚫린 지붕 밖으로 피어올라요', hit: [36, F2 + 1, 59, 48, F2 + 9, 71],
        run: async a => {
          a.flash('fire', 5, 5);
          for (let k = 0; k < 14; k++) {
            a.burst([39 + (k * 5) % 8, F2 + 2, 61 + (k * 3) % 9], { n: 16, colors: ['#ff7a2a', '#ffd04a', '#ff4a2a'], speed: 1.4, up: 4, life: 0.9, gravity: -1, spread: 2.5 });
            a.burst([42, RF + 1, 65], { n: 18, colors: ['#3a3634', '#5a5654', '#2a2624', '#7a7470'], speed: 1.6, up: 5, life: 3, gravity: -0.6, spread: 4, h: 3 });
            await a.wait(0.35);
          }
        },
      });

      // ── 에스컬레이터 두 대: 아트리움 바닥(동쪽)에서 서쪽 2층 회랑으로. 디딤판은 부품으로 흘러간다 ──
      for (const [ez, name] of [[82, 'escUp'], [86, 'escDn']]) {
        const p = w.prop({ name, pivot: [64, G + 1, ez + 1.5] });
        for (let i = 0; i <= 19; i++) {
          const x = 73 - i, ty = G + 1 + Math.floor(i / 2);
          for (let z = ez; z <= ez + 2; z++) {
            for (let y = G + 1; y < ty; y++) w.set(x, y, z, B.esc);
            p.set(x, ty, z, i % 2 ? B.escT : B.escY);
          }
          for (const sz of [ez - 1, ez + 3]) { for (let y = G + 1; y <= ty; y++) w.set(x, y, sz, B.esc); w.set(x, ty + 1, sz, B.rubber); }
        }
        w.box(74, G, ez, 75, G, ez + 2, B.steel);
      }
      for (let z = 81; z <= 89; z++) for (let x = 52; x <= 53; x++) w.set(x, F2, z, B.slab);
      acts.push({
        name: '에스컬레이터 가동', hint: '아트리움의 멈춰 있던 두 에스컬레이터가 다시 움직여요. 하나는 올라가고 하나는 내려가요', hit: [54, G + 1, 81, 74, F2 + 2, 89],
        run: async a => {
          for (let k = 0; k < 12; k++) {
            await Promise.all([a.move('escUp', [-2, 1, 0], 0.45, t => t), a.move('escDn', [2, -1, 0], 0.45, t => t)]);
            await Promise.all([a.move('escUp', [0, 0, 0], 0.001), a.move('escDn', [0, 0, 0], 0.001)]);
            if (k % 3 === 0) a.burst([64, G + 6, 85.5], { n: 8, colors: ['#d8d4c4', '#ffffff'], speed: 1, up: 1, life: 0.6, gravity: 1, spread: 4 });
          }
        },
      });

      // ── 가운데 섬 상점 두 동: KIBA 총포점(동쪽 면, 셔터)과 테크라이트(붉은 사선 간판, 모래주머니) ──
      const island = (z0, z1) => {
        w.box(58, G + 1, z0, 72, G + 9, z1, B.panel2); w.box(59, G + 1, z0 + 1, 71, G + 8, z1 - 1, 0);
        w.box(57, G + 10, z0 - 1, 73, G + 10, z1 + 1, B.slab);
      };
      island(58, 76); island(98, 116);
      const KZ = 98;                                                                                // KIBA는 남쪽 섬(고샨 지붕이 무너진 쪽이라 남동에서 보인다)
      for (let z = KZ + 1; z <= KZ + 17; z++) for (let y = G + 1; y <= G + 9; y++) w.set(72, y, z, y >= G + 5 ? B.kibaK : (z === KZ + 1 || z === KZ + 17) ? B.steel : B.glassD);
      text(w, 'KIBA', 73, G + 9, KZ + 16, 'e', B.signW, 1); w.box(73, G + 5, KZ + 1, 73, G + 9, KZ + 1, B.kibaBl);
      w.box(73, G + 6, KZ, 73, G + 7, KZ, B.alarmR);
      for (let z = KZ + 2; z <= KZ + 16; z++) { w.box(59, G + 2, z, 59, G + 7, z, B.wood); if (z % 2 === 0) w.box(60, G + 3, z, 60, G + 6, z, B.gun); }
      for (const x of [64, 68]) { w.box(x, G + 1, KZ + 4, x + 1, G + 2, KZ + 14, B.wood); w.box(x, G + 3, KZ + 4, x + 1, G + 3, KZ + 14, B.railG); for (let z = KZ + 5; z <= KZ + 13; z += 3) w.set(x, G + 4, z, B.gun); }
      w.set(66, G + 8, KZ + 9, B.alarmR);
      const sh = w.prop({ name: 'kibaShutter', pivot: [73.5, G + 4.5, KZ + 9] });
      for (let z = KZ + 1; z <= KZ + 17; z++) for (let y = G + 1; y <= G + 4; y++) sh.set(73, y, z, (y === G + 1 || z === KZ + 1 || z === KZ + 17) ? B.steel : B.shutter);
      lights.push({ name: 'kiba', p: [74, G + 7, KZ + 0.5], c: '#ff3a2a', i: 0.45, d: 22, flicker: 0.3, srcR: 4 });
      landmarks.push({ name: 'KIBA 총포점', note: '셔터 안쪽 쇠창살 문 · 경보 장치', p: [73, G + 18, KZ + 9] });
      acts.push({
        name: 'KIBA 셔터', hint: '총포점 KIBA의 셔터가 말려 올라가고, 안쪽 경보가 울리며 붉은 등이 번쩍여요', hit: [73, G + 1, KZ + 1, 73, G + 4, KZ + 17],
        run: async a => {
          a.burst([74, G + 4, KZ + 9], { n: 30, colors: ['#9a968e', '#c8c4bc'], speed: 2, up: 0.5, life: 1, gravity: 3, spread: 8, flat: true });
          await a.tween('kibaShutter', { scl: [1, 0.1, 1] }, 2.2);
          for (let k = 0; k < 6; k++) { a.flash('kiba', 8, 0.35); a.burst([74, G + 7, KZ + 0.5], { n: 20, colors: ['#ff3a2a', '#ffb0a0'], speed: 4, up: 1, life: 0.5, gravity: 0, spread: 1 }); a.burst([66, G + 3, KZ + 9], { n: 10, colors: ['#ff3a2a'], speed: 3, up: 1, life: 0.5, gravity: 0, spread: 5 }); await a.wait(0.5); }
          await a.wait(0.6);
          await a.tween('kibaShutter', { scl: [1, 1, 1] }, 1.6);
        },
      });
      // 테크라이트(북쪽 섬): 붉은·검은 사선 띠 간판, 앞에 모래주머니 방벽(받침대 위 기관총)
      for (let z = 59; z <= 75; z++) for (let y = G + 1; y <= G + 9; y++) w.set(72, y, z, y >= G + 6 ? (y === G + 7 ? B.techR : (((z + y) >> 1) % 2 ? B.techR : B.kibaK)) : (z % 5 === 0 ? B.steel : B.glassD));
      for (let x = 58; x <= 72; x++) for (let y = G + 6; y <= G + 9; y++) w.set(x, y, 76, ((x + y) >> 1) % 2 ? B.burgY : B.goodR);
      for (let z = 60; z <= 74; z++) w.box(76, G + 1, z, 76, G + 2, z, B.sand);
      w.box(74, G + 1, 60, 75, G + 2, 60, B.sand); w.box(74, G + 1, 74, 75, G + 2, 74, B.sand);
      w.set(76, G + 3, 67, B.steel); w.box(77, G + 4, 67, 79, G + 4, 67, B.gun); w.set(76, G + 4, 67, B.gun);
      // 갤러리 바닥: 비상사태부 천막, 화분, 벤치, 잔해
      const tent = (x0, z0, len, col) => {
        for (let x = x0; x <= x0 + len; x++) for (let dz = -3; dz <= 3; dz++) {
          const y = G + 4 - Math.floor(Math.abs(dz) * 0.8);
          w.set(x, y, z0 + dz, (x === x0 + 2 || x === x0 + len - 2) ? B.tarpO : col);
          if (Math.abs(dz) === 3) w.box(x, G + 1, z0 + dz, x, y, z0 + dz, col);
          if (x === x0 + len && Math.abs(dz) < 3) w.box(x, G + 1, z0 + dz, x, y - 1, z0 + dz, (Math.abs(dz) <= 1 && y > G + 2) ? B.crossR : B.tarpW);
        }
      };
      tent(76, 117, 9, B.tarpB);
      for (const [x, z] of [[76, 92], [79, 94], [78, 89]]) { w.box(x, G + 1, z, x + 1, G + 2, z + 1, B.crate); w.set(x, G + 3, z, B.crossR); }
      landmarks.push({ name: '비상사태부 캠프', note: 'EMERCOM 대피 거점의 천막', p: [81, G + 12, 117] });
      for (const [x, z] of [[80, 70], [66, 90]]) { w.box(x - 1, G + 1, z - 1, x + 1, G + 2, z + 1, B.conc); w.set(x, G + 2, z, B.soil); MH.tree(w, x, G + 3, z, { kind: 'dead', h: 5, bark: B.bark, leaves: [], r: 2 }); }
      for (const [x, z] of [[80, 100], [80, 108], [55, 96]]) w.box(x, G + 1, z, x, G + 1, z + 3, B.wood);
      for (let k = 0; k < 300; k++) { const x = w.ri(53, 86), z = w.ri(44, 121); if (w.get(x, G + 1, z) || (z >= 80 && z <= 90 && x <= 76) || x === 73) continue; const r = h(x, z, 23); if (r < 0.4) w.set(x, G, z, B.asphW); else if (r < 0.75) w.set(x, G + 1, z, B.rubble); else w.set(x, G + 1, z, r < 0.9 ? B.box2 : B.box1); }
      // 꺼진 등: 회랑 아래와 섬 상점 위
      const lamps = [];
      for (let z = 46; z <= 118; z += 8) { w.set(52, F2 - 1, z, B.lampOff); lamps.push([52.5, F2 - 1, z + 0.5]); }
      for (const [x, z] of [[65, 67], [65, 103], [80, 56], [82, 120]]) { w.set(x, x < 76 ? G + 11 : G + 1, z, B.lampOff); lamps.push([x + 0.5, x < 76 ? G + 11 : G + 1, z + 0.5]); }
      w.box(80, G + 1, 85, 80, G + 6, 85, B.steel); w.set(80, G + 7, 85, B.lampW);
      lights.push({ name: 'mall', p: [80.5, G + 7, 85.5], c: '#fff0c8', i: 0.35, d: 60, flicker: 0.05, srcR: 3 });

      // ── 발전소(북동쪽): 벽돌 변전소, 변압기, 철망, 레버 스위치(부품) ──
      const PX0 = 124, PX1 = 138, PZ0 = 14, PZ1 = 23;
      w.box(PX0, G + 1, PZ0, PX1, G + 8, PZ1, B.brick); w.box(PX0 + 1, G + 1, PZ0 + 1, PX1 - 1, G + 7, PZ1 - 1, 0);
      w.box(PX0 - 1, G + 9, PZ0 - 1, PX1 + 1, G + 9, PZ1 + 1, B.concDk); w.box(PX0 + 2, G + 1, PZ1, PX0 + 4, G + 5, PZ1, B.steel);
      for (let x = PX0 + 7; x <= PX1 - 1; x += 3) w.set(x, G + 6, PZ1, B.glassD);
      for (const z of [12, 17, 22]) { w.box(141, G + 1, z, 144, G + 5, z + 3, B.transf); w.box(142, G + 6, z + 1, 143, G + 7, z + 1, B.signW); w.box(142, G + 8, z + 1, 143, G + 8, z + 1, B.steel); }
      for (let z = 11; z <= 27; z++) if (z % 2 === 0) w.box(146, G + 1, z, 146, G + 4, z, B.fenceM); else w.set(146, G + 4, z, B.fenceM);
      for (let x = 140; x <= 146; x++) if (x % 2) w.box(x, G + 1, 27, x, G + 4, 27, B.fenceM);
      const LX = PX0 + 8;
      w.box(LX - 1, G + 2, PZ1 + 1, LX + 2, G + 5, PZ1 + 1, B.steel); w.set(LX + 1, G + 6, PZ1 + 1, B.lampG); w.set(LX - 1, G + 6, PZ1 + 1, B.alarmR);
      const lever = w.prop({ name: 'lever', pivot: [LX + 0.5, G + 3.5, PZ1 + 2.5], axis: 'x' });
      lever.box(LX, G + 3, PZ1 + 2, LX, G + 5, PZ1 + 2, B.hazard); lever.set(LX, G + 6, PZ1 + 2, B.cartR);
      lights.push({ name: 'power', p: [LX + 1.5, G + 6, PZ1 + 2], c: '#5aff7a', i: 0.4, d: 16, flicker: 0.1, srcR: 3 });
      landmarks.push({ name: '발전소', note: '스위치를 올리면 몰에 전기가 들어옴', p: [131, G + 16, 18] });
      acts.push({
        name: '발전소 스위치', hint: '북동쪽 발전소 레버를 올리면 초록 불이 켜지고, 몰 안 등이 하나씩 다시 들어와요', hit: [LX - 2, G + 2, PZ1 + 1, LX + 3, G + 7, PZ1 + 2],
        run: async a => {
          await a.turn('lever', [-1.4, 0, 0], 0.5);
          a.burst([LX + 0.5, G + 6, PZ1 + 2.5], { n: 26, colors: ['#ffffff', '#a8e8ff', '#ffe08a'], speed: 5, up: 2, life: 0.4, gravity: 3, spread: 0.5 });
          a.flash('power', 6, 6);
          for (const z of [13, 18, 23]) a.burst([142.5, G + 8, z + 0.5], { n: 12, colors: ['#a8e8ff', '#ffffff'], speed: 3, up: 2, life: 0.4, gravity: 0, spread: 0.5 });
          await a.wait(0.5);
          a.flash('mall', 4, 5); a.glow(1.5, 5);
          for (let k = 0; k < lamps.length; k++) { a.burst(lamps[k], { n: 8, colors: ['#fff4d0', '#ffffff'], speed: 0.6, up: -0.3, life: 1, gravity: 0, spread: 0.6 }); if (k % 2) await a.wait(0.12); }
          await a.wait(1.5);
          await a.turn('lever', [0, 0, 0], 0.5);
        },
      });

      // ── 동쪽 주차장: 분수 광장, 분홍 지붕 무대, 군용 천막, 타이어 경주 트랙 ──
      const FX = 130, FZ = 53;
      for (let dz = -8; dz <= 8; dz++) for (let dx = -8; dx <= 8; dx++) {
        const d = Math.hypot(dx, dz), x = FX + dx, z = FZ + dz;
        if (d > 8) continue;
        if (d > 3.6) w.set(x, G, z, B.brickR);
        else if (d > 2.6) { w.set(x, G + 1, z, B.conc); w.set(x, G, z, B.conc); }
        else { w.set(x, G, z, B.conc); w.liquid(x, z, G); }
      }
      w.cyl(FX, FZ, G + 1, G + 2, 0.8, B.conc); w.cyl(FX, FZ, G + 3, G + 3, 1.8, B.conc); w.set(FX, G + 4, FZ, B.conc);
      w.box(138, G + 1, 66, 152, G + 2, 78, B.wood);
      for (const [x, z] of [[138, 66], [152, 66], [138, 78], [152, 78]]) w.box(x, G + 3, z, x, G + 10, z, B.steel);
      for (let x = 137; x <= 153; x++) for (let z = 65; z <= 79; z++) { const e = x === 137 || x === 153 || z === 65 || z === 79; w.set(x, G + 11 + (e ? 0 : 1), z, B.stageP); }
      w.box(144, G + 3, 66, 146, G + 6, 66, B.kibaK);
      for (const [x0, z0] of [[146, 120], [146, 132]]) { w.box(x0, G + 1, z0, x0 + 12, G + 4, z0 + 7, B.milG); w.box(x0, G + 5, z0 + 1, x0 + 12, G + 5, z0 + 6, B.milG); w.box(x0, G + 6, z0 + 2, x0 + 12, G + 6, z0 + 5, B.milG); w.box(x0 + 12, G + 1, z0 + 3, x0 + 12, G + 3, z0 + 4, B.kibaK); }
      for (let a = 0; a < 64; a++) { const t = a / 64 * Math.PI * 2, x = Math.round(142 + Math.cos(t) * 15), z = Math.round(36 + Math.sin(t) * 6); w.set(x, G + 1, z, a % 4 < 2 ? B.tire : B.signW); if (a % 3 === 0) w.set(x, G + 2, z, B.tire); }
      for (let a = 0; a < 36; a++) { const t = a / 36 * Math.PI * 2; w.set(Math.round(142 + Math.cos(t) * 8), G + 1, Math.round(36 + Math.sin(t) * 2), B.tire); }
      landmarks.push({ name: '분수 광장', note: '정문 앞 붉은 벽돌 분수와 분홍 지붕 무대', p: [FX, G + 12, FZ] });

      // ── 버려진 차, 쇼핑카트, 가로등, 콘크리트 방벽 ──
      const car = (p, x, z, ax, col, o) => {
        o = o || {};
        const L = 8, Wd = 4, at = (u, v, y, b) => ax === 'z' ? p.set(x + v, y, z + u, b) : p.set(x + u, y, z + v, b);
        const y0 = G + (o.sunk ? 0 : 1);
        for (let u = 0; u < L; u++) for (let v = 0; v < Wd; v++) {
          if ((u === 1 || u === L - 2) && (v === 0 || v === Wd - 1) && !o.sunk) at(u, v, y0, B.tire);
          at(u, v, y0 + 1, col); at(u, v, y0 + 2, (u === 0 || u === L - 1) && (v === 0 || v === Wd - 1) ? (u === 0 ? (o.lit ? B.tailR : B.carR) : (o.lit ? B.headY : B.signW)) : col);
          if (u >= 2 && u <= 5) at(u, v, y0 + 3, (u === 2 || u === 5 || v === 0 || v === Wd - 1) ? (o.burnt ? B.soot : B.glassD) : col);
          if (u >= 2 && u <= 5) at(u, v, y0 + 4, col);
        }
      };
      const cars = [[133, 88, 'x', B.carB], [127, 116, 'x', B.carW], [133, 94, 'x', B.carK, { burnt: 1, sunk: 1 }], [145, 88, 'x', B.carG], [153, 94, 'x', B.carY],
        [125, 128, 'x', B.carR], [133, 134, 'x', B.carW], [156, 108, 'x', B.carB], [145, 100, 'x', B.carR, { sunk: 1 }], [127, 104, 'x', B.carG],
        [28, 147, 'z', B.carB], [52, 156, 'z', B.carR], [76, 147, 'z', B.carW], [100, 155, 'z', B.carG], [118, 147, 'z', B.carY], [20, 60, 'z', B.carW], [20, 110, 'z', B.carR]];
      for (const [x, z, ax, col, o] of cars) car(w, x, z, ax, col, o);
      // 경보 울리는 차(부품)
      const AX = 145, AZ = 111;
      const ac = w.prop({ name: 'alarmCar', pivot: [AX + 4, G + 1, AZ + 2], axis: 'x' });
      car(ac, AX, AZ, 'x', B.carB, { lit: 1 });
      lights.push({ name: 'car', p: [AX + 4, G + 4, AZ + 2], c: '#ffb04a', i: 0.4, d: 18, flicker: 0.2, srcR: 5 });
      acts.push({
        name: '차 경보', hint: '주차장의 파란 승용차에서 경보가 울리며 비상등이 깜빡이고 차체가 들썩여요', hit: [AX, G + 1, AZ, AX + 7, G + 5, AZ + 3],
        run: async a => {
          for (let k = 0; k < 10; k++) {
            a.flash('car', k % 2 ? 0.2 : 7, 0.3);
            if (k % 2 === 0) for (const [dx, dz] of [[0, 0], [7, 0], [0, 3], [7, 3]]) a.burst([AX + dx + 0.5, G + 3.5, AZ + dz + 0.5], { n: 8, colors: ['#ffb04a', '#ffffff'], speed: 2, up: 0.5, life: 0.35, gravity: 0, spread: 0.4 });
            a.tween('alarmCar', { off: [0, k % 2 ? 0 : 1.4, 0], rot: [k % 2 ? 0.12 : -0.12, 0, 0] }, 0.3);
            await a.wait(0.35);
          }
          await a.tween('alarmCar', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.3);
        },
      });
      const cartAt = (p, x, z, tip) => {
        for (const dx of [0, 3]) for (const dz of [0, 2]) p.set(x + dx, G + 1, z + dz, B.tire);
        for (let dx = 0; dx <= 3; dx++) for (let dz = 0; dz <= 2; dz++) { p.set(x + dx, G + 2, z + dz, B.cart); if (dz !== 1 || dx === 0 || dx === 3) p.set(x + dx, G + 3, z + dz, B.cart); }
        p.box(x, G + 4, z, x, G + 4, z + 2, B.cartR);
        if (tip) p.set(x + 1, G + 3, z + 1, B.goodY);
      };
      const carts = [[119, 64], [120, 68], [119, 72]];
      carts.forEach(([x, z], k) => { const p = w.prop({ name: 'cart' + k, pivot: [x + 2, G + 1, z + 1.5] }); cartAt(p, x, z, k === 1); });
      for (const [x, z] of [[140, 104], [128, 140], [150, 60], [60, 150]]) cartAt(w, x, z, h(x, z, 1) > 0.5);
      for (let z = 124; z <= 136; z++) { w.set(120, G + 3, z, B.cartR); if (z % 6 === 0) w.box(120, G + 1, z, 120, G + 2, z, B.steel); }
      acts.push({
        name: '굴러가는 카트', hint: '바람에 정문 앞 쇼핑카트들이 덜컹거리며 보도를 따라 남쪽으로 굴러가다 멈춰요', hit: [119, G + 1, 64, 123, G + 4, 74],
        run: async a => {
          a.wind(3, 4);
          const go = (k, dx, dz, r, d) => a.path('cart' + k, [[dx * 0.5, 0, dz * 0.5, r * 0.5], [dx, 0, dz, r]], d);
          await Promise.all([go(0, -1, 18, 0.6, 3), go(1, 1, 22, -0.4, 3.4), go(2, -1, 26, -1.2, 3.2)]);
          for (const k of [0, 1, 2]) a.burst([carts[k][0] + 2 + [-1, 1, -1][k], G + 1, carts[k][1] + 1.5 + [18, 22, 26][k]], { n: 12, colors: ['#9a968e', '#c8c4bc'], speed: 2, up: 1, life: 0.6, gravity: 3, spread: 1.5, flat: true });
          await a.wait(1.2);
          await Promise.all([0, 1, 2].map(k => a.tween('cart' + k, { off: [0, 0, 0], rot: [0, 0, 0] }, 1.6)));
        },
      });
      const lp = [];
      for (const [x, z] of [[120, 40], [158, 58], [122, 84], [162, 100], [122, 140], [40, 143], [80, 143], [10, 40], [10, 100]]) {
        w.box(x, G + 1, z, x, G + 10, z, B.steel); w.box(x - 1, G + 10, z, x + 1, G + 10, z, B.steel); w.set(x - 1, G + 9, z, B.lampN); w.set(x + 1, G + 9, z, B.lampN); lp.push([x + 0.5, G + 9, z + 0.5]);
      }
      lights.push({ p: lp[2], c: '#ffe0a0', i: 0.8, d: 22, flicker: 0.05, night: true });
      lights.push({ p: lp[5], c: '#ffe0a0', i: 0.8, d: 22, flicker: 0.05, night: true });
      for (let z = 30; z <= 140; z += 4) if (z % 12) w.box(19, G + 1, z, 19, G + 2, z + 1, B.jersey);
      for (let x = 22; x <= 130; x += 9) w.box(x, G + 1, 144, x + 2, G + 2, 144, B.jersey);
      for (const [x, z] of [[160, 146], [26, 30], [160, 40]]) for (let k = 0; k < 3; k++) w.cyl(x, z, G + 1 + k, G + 1 + k, 1.2, B.tire);

      // ── 비상사태부 검문소(남동쪽): 초소, 차단기, 방벽 — 녹색 신호탄 탈출 ──
      const CX = 142, CZ = 148;
      w.box(CX, G + 1, CZ, CX + 5, G + 6, CZ + 5, B.signW); w.box(CX + 1, G + 3, CZ + 5, CX + 4, G + 4, CZ + 5, B.glassS); w.box(CX + 5, G + 3, CZ + 1, CX + 5, G + 4, CZ + 4, B.glassS);
      w.box(CX - 1, G + 7, CZ - 1, CX + 6, G + 7, CZ + 6, B.tarpB); w.box(CX, G + 5, CZ + 6, CX + 5, G + 5, CZ + 6, B.tarpO);
      w.set(CX + 2, G + 8, CZ + 2, B.lampG);
      for (let x = CX - 12; x < CX; x++) w.set(x, G + 3, CZ + 3, (x >> 1) % 2 ? B.hazard : B.hazardK); w.box(CX - 13, G + 1, CZ + 3, CX - 13, G + 3, CZ + 3, B.hazardK);
      for (const [x, z] of [[136, 160], [140, 160], [154, 140], [154, 144], [132, 156]]) w.box(x, G + 1, z, x + 2, G + 2, z, B.jersey);
      for (let x = CX - 6; x <= CX + 10; x += 4) w.box(x, G + 1, CZ - 4, x + 1, G + 2, CZ - 4, B.sand);
      lights.push({ name: 'flare', p: [CX + 2.5, G + 9, CZ + 2.5], c: '#5aff7a', i: 0.5, d: 30, flicker: 0.15, srcR: 3 });
      landmarks.push({ name: '비상사태부 검문소', note: '남동쪽 탈출 지점 · 녹색 신호탄', p: [CX + 3, G + 18, CZ + 3] });
      acts.push({
        name: '탈출 신호탄', hint: '검문소 앞에서 녹색 신호탄이 하늘 높이 솟아 탈출로가 열려요', hit: [CX - 4, G + 1, CZ - 6, CX + 6, G + 8, CZ + 6],
        run: async a => {
          for (let k = 0; k < 8; k++) { a.burst([CX - 2.5, G + 2 + k * 3, CZ - 1.5], { n: 10, colors: ['#ffffff', '#c8ffd0'], speed: 0.3, up: 1, life: 0.7, gravity: 0, spread: 0.2 }); await a.wait(0.12); }
          a.flash('flare', 9, 5); a.glow(1.6, 4);
          a.burst([CX - 2.5, G + 28, CZ - 1.5], { n: 120, colors: ['#5aff7a', '#c8ffd0', '#2ad04a'], speed: 9, up: 2, life: 2.2, gravity: 1.5, spread: 1 });
          for (let k = 0; k < 8; k++) { a.burst([CX - 2.5, G + 2, CZ - 1.5], { n: 20, colors: ['#5ae86a', '#8af09a', '#3aa04a'], speed: 1.2, up: 3, life: 2.4, gravity: -0.4, spread: 1.5 }); await a.wait(0.35); }
        },
      });

      // ── 둘레 침엽수: 정문 앞 줄나무와 길가·북쪽 숲 ──
      const pine = (x, z, hh, r) => MH.tree(w, x, G + 1, z, { kind: 'pine', h: hh, bark: B.bark, leaves: [B.leaf2, B.leaf], r });
      for (let z = 82; z <= 116; z += 10) pine(118, z, 7, 2);
      for (let z = 20; z <= 160; z += 10) pine(26, z + (z % 3), 10, 3);
      for (let x = 40; x <= 130; x += 10) pine(x, 8, 9, 2);
      for (let z = 60; z <= 136; z += 12) pine(164, z, 6, 2);
      return { lights, landmarks, acts };
    },
  });
})();
