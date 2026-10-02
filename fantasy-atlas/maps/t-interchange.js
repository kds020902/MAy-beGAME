// 인터체인지 · 울트라 쇼핑몰 — 지붕이 무너져 속이 드러난 대형 쇼핑몰: 가운데 아트리움과 에스컬레이터, 북쪽 상점 줄(OLI·IDEA·KIBA), 서쪽 고샨 하이퍼마켓, 남·동쪽 주차장
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
  const text = (w, s, x0, yTop, z0, face, b, sc) => {
    sc = sc || 1;
    const out = [];
    let u = 0;
    [...s].forEach((ch, k) => {
      const g = FONT[ch], bl = typeof b === 'function' ? b(k) : b;
      if (g) for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) if (g[r][c] === '1') for (let sy = 0; sy < sc; sy++) for (let sx = 0; sx < sc; sx++) {
        const uu = u + c * sc + sx, y = yTop - r * sc - sy;
        if (face === 's') w.set(x0 + uu, y, z0, bl); else w.set(x0, y, z0 - uu, bl);
      }
      out.push(face === 's' ? [x0 + u + 1.5 * sc, yTop - 2 * sc, z0 + 0.5] : [x0 + 0.5, yTop - 2 * sc, z0 - u - 1.5 * sc]);
      u += 3 * sc + (sc > 1 ? 2 : 1);
    });
    return out;
  };

  MAPS.push({
    id: 'interchange', cat: 'tarkov', name: '인터체인지', en: 'Interchange · ULTRA Mall', color: '#e8742a', seed: 605, base: 20, time: 'day', size: [W, D, Hh],
    desc: '항구와 공업 지대를 잇는 남쪽 인터체인지 한가운데의 대형 쇼핑몰 「울트라」. 비상사태부(EMERCOM)의 대피 거점이었지만 이제는 지붕이 무너져 내린 채 버려졌다. 아트리움의 멈춘 에스컬레이터, 주황 OLI와 파랑·노랑 IDEA, 셔터가 내려진 총포점 KIBA, 붉은 고샨 하이퍼마켓, 그리고 버려진 차와 쇼핑카트가 뒹구는 넓은 주차장.',
    info: { title: '구역 정보', en: 'TARKOV · INTERCHANGE', rows: [['자리', '타르코프 남쪽 인터체인지 · 울트라 쇼핑몰'], ['상점', 'OLI · IDEA · 고샨 · KIBA 총포점'], ['전력', '발전소 스위치를 올리면 몰 전체에 불이 들어옴'], ['탈출', '비상사태부 검문소 · 신호탄 구역']] },
    sky: ['#c8bca8', '#6a7684', '#e8c8a0'], stars: false,
    hemi: ['#e8e4dc', '#4a4640', 0.6], sun: ['#ffe4c4', 0.72, [0.5, 1, 0.55]],
    night: { sky: ['#2e2a30', '#0a0c14', '#a86a48'], stars: true, hemi: ['#8a90a8', '#14121a', 0.34], sun: ['#b8c0e0', 0.22, [0.5, 1, 0.55]], haze: '#22242a' },
    fog: { start: 0.86, floor: 12, depth: 8, haze: [24, 0.1, 6], hazeColor: '#c8c0b4' },
    camY: 6, zoom: 0.95,
    particles: [
      { n: 120, colors: ['#b8b4ac', '#8a8680', '#d8d0c4'], mode: 'drift', speed: 0.35, wind: 0.5, y0: 22, y1: 70, glow: false },
      { n: 70, colors: ['#5a5654', '#7a7470', '#3e3c3a'], mode: 'rise', speed: 0.35, area: [69, 34, 7], y0: 38, y1: 80, glow: false, size: 2 },
    ],
    blocks: Object.assign(OR.blocks(), {
      asph: { c: '#3e4044', top: '#46484c', v: 0.06 }, asphW: { c: '#34363a', top: '#3a3e44', v: 0.04 }, lineW: { c: '#d8d8d0', v: 0.03 }, lineY: { c: '#d8b030', v: 0.04 },
      walk: { c: '#8a8882', top: '#a09c94', v: 0.05, pat: 'check', alt: '#96928a' }, curbC: { c: '#7a7872', top: '#9a968e', v: 0.03 },
      tile: { c: '#96928a', top: '#a6a298', v: 0.03, pat: 'check', alt: '#9c988e' }, tileG: { c: '#9a9890', top: '#aca89e', v: 0.03, pat: 'floor' },
      panel: { c: '#b8a88a', v: 0.03, pat: 'big' }, panel2: { c: '#a8987a', v: 0.03 }, concDk: { c: '#5a5852', v: 0.05, pat: 'stone' }, conc: { c: '#8a8a84', v: 0.06, pat: 'stone' }, trimC: { c: '#c8c4bc', v: 0.02 },
      slab: { c: '#7e7c76', top: '#9a968c', v: 0.04 }, soot: { c: '#2a2624', v: 0.08 }, rubble: { c: '#7a7670', v: 0.12, pat: 'stone' }, rebar: { c: '#6a3e2a', v: 0.06 },
      steel: { c: '#565a62', v: 0.03 }, steelR: { c: '#7a4a32', v: 0.08 }, glassS: { c: '#5a7484', v: 0.03 }, glassD: { c: '#3a4652', v: 0.03 }, railG: { c: '#8aa4b0', v: 0.02 },
      gosR: { c: '#c84a34', v: 0.04, pat: 'big' }, gosR2: { c: '#b03e2e', v: 0.04 }, gosG: { c: '#3a9a4a', v: 0.03 },
      oliO: { c: '#e8742a', v: 0.03 }, ideaB: { c: '#2a5aa8', v: 0.03 }, ideaY: { c: '#f2cc2a', v: 0.03 }, kibaK: { c: '#24262a', v: 0.02 }, signW: { c: '#ecebe4', v: 0.02 },
      pinkS: { c: '#d86a8a', v: 0.03 }, tealS: { c: '#3a9a98', v: 0.03 }, pharmG: { c: '#3aa860', v: 0.03 }, blueT: { c: '#3a68b0', v: 0.03, pat: 'big' }, blueD: { c: '#24467a', v: 0.03 },
      shutter: { c: '#8a8e92', v: 0.02, pat: 'log' }, esc: { c: '#a8acb0', v: 0.02 }, escT: { c: '#6a6e72', top: '#7a7e82', v: 0.02 }, escY: { c: '#d8b030', v: 0.02 }, rubber: { c: '#1e1e22', v: 0.02 },
      shelf: { c: '#9aa0a4', v: 0.03 }, box1: { c: '#c8a070', v: 0.08 }, box2: { c: '#d8d0b8', v: 0.06 }, goodR: { c: '#c03a3a', v: 0.08 }, goodB: { c: '#3a6ab0', v: 0.08 }, goodG: { c: '#4a8a3a', v: 0.08 }, goodY: { c: '#e8c040', v: 0.08 },
      sofa: { c: '#4a6a9a', v: 0.04 }, wood: { c: '#8a6a48', v: 0.05, pat: 'plank' }, crate: { c: '#6a7048', v: 0.05, pat: 'plank' }, gun: { c: '#1a1a1c', v: 0.02 },
      sand: { c: '#a89a74', v: 0.08, pat: 'stone' }, tarpB: { c: '#3a5a8a', v: 0.04 }, tarpO: { c: '#e07a2a', v: 0.04 }, tarpW: { c: '#d8d8d0', v: 0.03 }, crossR: { c: '#c83030', v: 0.03 },
      carB: { c: '#6a88a4', v: 0.04 }, carW: { c: '#c8c6be', v: 0.04 }, carG: { c: '#4a6a4e', v: 0.04 }, carR: { c: '#8a3a2e', v: 0.04 }, carY: { c: '#c8a040', v: 0.04 }, carK: { c: '#2a2826', v: 0.08 },
      tire: { c: '#1c1c1e', v: 0.03 }, cart: { c: '#b0b4b8', v: 0.02 }, cartR: { c: '#c03030', v: 0.02 }, jersey: { c: '#b4b0a6', v: 0.05 }, hazard: { c: '#e8b828', v: 0.03 }, hazardK: { c: '#24262a', v: 0.03 },
      brick: { c: '#8a5a44', v: 0.06, pat: 'brick' }, transf: { c: '#6a7a6e', v: 0.03, pat: 'log' }, fenceM: { c: '#7a7e80', v: 0.02 },
      lampOff: { c: '#d8d4c4', v: 0.02 }, lampW: { c: '#fff4d0', glow: true }, lampN: { c: '#ffe0a0', night: true, day: '#c8c4b4' },
      alarmR: { c: '#ff3a2a', glow: true }, lampG: { c: '#5aff7a', glow: true }, ember: { c: '#ff7a2a', glow: true }, screenG: { c: '#6aff9a', glow: true }, tailR: { c: '#ff4a3a', glow: true }, headY: { c: '#ffe8a0', glow: true },
      neonR: { c: '#ff4a4a', night: true, day: '#d03a3a' }, neonY: { c: '#ffd84a', night: true, day: '#e8c030' }, neonG: { c: '#5ae86a', night: true, day: '#3aa04a' }, neonB: { c: '#5aa0ff', night: true, day: '#3a6ac8' }, neonO: { c: '#ff9a3a', night: true, day: '#e07a2a' },
    }),
    build(w) {
      const B = w.id, G = w.base;
      const X0 = 20, X1 = 132, Z0 = 16, Z1 = 104, F2 = G + 11, RF = G + 22;
      const lights = [], acts = [], landmarks = [];
      const h = (x, z, k) => hash3(x, k || 0, z);
      const inMall = (x, z) => x >= X0 && x <= X1 && z >= Z0 && z <= Z1;
      // ── 바닥: 몰 안은 타일, 둘레 보도, 바깥은 젖은 아스팔트 주차장 ──
      MH.terrain(w, {
        floor: G - 5, height: () => G,
        surface: (x, z) => {
          if (inMall(x, z)) return x < 58 ? B.tileG : B.tile;
          if (x >= X0 - 4 && x <= X1 + 4 && z >= Z0 - 4 && z <= Z1 + 4) return (x === X0 - 4 || x === X1 + 4 || z === Z0 - 4 || z === Z1 + 4) ? B.curbC : B.walk;
          // 주차선: 남쪽 주차장은 세로 줄, 동쪽 주차장은 가로 줄
          if (z >= 114 && z <= 160 && x >= 8 && x <= 130) { const zr = (z - 114) % 24; if ((zr <= 9 || zr >= 14) && zr !== 11 && x % 7 === 0) return B.lineW; if (zr === 11 && x % 6 < 3) return B.lineY; }
          if (x >= 142 && x <= 164 && z >= 18 && z <= 104) { const xr = x - 142; if ((xr <= 8 || xr >= 14) && z % 7 === 0) return B.lineW; if (xr === 11 && z % 6 < 3) return B.lineY; }
          return h(x >> 2, z >> 2, 3) > 0.8 ? B.asphW : B.asph;
        },
        under: (x, z, y, dep) => dep < 2 ? B.concDk : B.rock,
      });

      // ── 바깥벽: 북·서는 온전하고, 남·동은 무너져 낮게 깨졌다(속이 보이게) ──
      const broken = (u, s) => G + 2 + Math.floor(h(u, s, 5) * 3) + ((u % 14 === 4) ? 4 + Math.floor(h(u, s, 6) * 9) : 0);
      const wallTop = (x, z) => {
        if (z === Z0) return RF;
        if (x === X0) return z <= 34 ? RF : G + 13;
        if (z === Z1) { if (x < 58) return G + 13; if (x <= 80) return G + 16; if (x <= 90) return Math.max(broken(x, 1), G + 16 - (x - 80)); return broken(x, 1); }
        if (x === X1) { if (z <= 34) return RF; if (z <= 46) return Math.max(broken(z, 2), RF - (z - 34) * 1.6 | 0); return broken(z, 2); }
        return 0;
      };
      for (let x = X0; x <= X1; x++) for (let z = Z0; z <= Z1; z++) {
        if (x !== X0 && x !== X1 && z !== Z0 && z !== Z1) continue;
        const top = wallTop(x, z), u = (x === X0 || x === X1) ? z : x;
        for (let y = G + 1; y <= top; y++) {
          let b = (u >> 2) % 2 ? B.panel : B.panel2;
          if (y <= G + 2) b = B.concDk;
          else if (y === top && top >= G + 13) b = B.trimC;
          if (z === Z1 && x < 58 && y > G + 2 && y < top) b = (u % 6 === 0) ? B.gosR2 : B.gosR;          // 고샨 남벽: 붉은 판넬
          if (top < G + 12 && y === top && h(x, z, y) > 0.5) b = B.rubble;
          w.set(x, y, z, b);
        }
        if (top < G + 12) for (let y = top + 1; y <= top + 2; y++) if (h(x, z, y + 7) > 0.8) w.set(x, y, z, B.rebar);   // 철근 끝
      }
      // 남벽 고샨 글자, 북벽 바깥 창 띠
      text(w, 'GOSHAN', 27, G + 10, Z1 + 1, 's', B.gosG);
      for (let x = X0 + 2; x < X1 - 1; x++) if (x % 6 < 4) { w.set(x, RF - 4, Z0, B.glassD); w.set(x, RF - 5, Z0, B.glassD); }

      // ── 남쪽 정문: 파란 유리 탑과 차양 ──
      const EX0 = 58, EX1 = 80;
      for (let x = EX0; x <= EX1; x++) for (let z = Z1 - 4; z <= Z1 + 2; z++) {
        const edge = x === EX0 || x === EX1 || z === Z1 + 2 || z === Z1 - 4;
        if (!edge) continue;
        for (let y = G + 1; y <= G + 16; y++) {
          let b = (x % 4 === 2 || y % 5 === 1) ? B.blueD : B.blueT;
          if (z === Z1 + 2 && x > EX0 + 1 && x < EX1 - 1 && y > G + 6 && y < G + 15 && x % 4 !== 2 && y % 5 !== 1) b = B.glassS;
          if (z === Z1 + 2 && x >= 64 && x <= 74 && y <= G + 5) b = (x === 64 || x === 74 || y === G + 5) ? B.steel : 0;
          if (z === Z1 - 4 && x >= 64 && x <= 74 && y <= G + 5) b = 0;
          if (y === G + 16) b = B.trimC;
          w.set(x, y, z, b);
        }
      }
      for (let x = EX0 + 1; x < EX1; x++) for (let z = Z1 - 3; z <= Z1 + 1; z++) w.set(x, G + 16, z, B.slab);
      w.box(62, G + 6, Z1 + 3, 76, G + 6, Z1 + 6, B.blueD); for (const x of [62, 76]) w.box(x, G + 1, Z1 + 6, x, G + 5, Z1 + 6, B.steel);
      for (let x = 64; x <= 74; x++) for (let z = Z1 - 3; z <= Z1 + 1; z++) w.set(x, G + 1, z, 0);

      // ── 울트라 간판: 고샨 남벽 위 철골 위에 선 큰 글자(밤에는 네온) ──
      const SY0 = G + 15, SY1 = G + 29;
      w.box(X0, SY0, Z1, 59, SY1, Z1, B.kibaK);
      w.box(X0, SY1 + 1, Z1, 59, SY1 + 1, Z1, B.steel); w.box(X0, SY0 - 1, Z1, 59, SY0 - 1, Z1, B.steel);
      for (const x of [22, 32, 46, 57]) { w.box(x, G + 14, Z1 - 1, x, SY1, Z1 - 1, B.steel); w.line(x, G + 14, Z1 - 5, x, SY1 - 2, Z1 - 1, B.steel); }
      const ULT = [B.neonR, B.neonY, B.neonG, B.neonB, B.neonO];
      const letters = text(w, 'ULTRA', 21, SY1 - 2, Z1 + 1, 's', k => ULT[k], 2);
      for (let x = X0 + 1; x <= 58; x++) if (x % 3 === 0) w.set(x, SY0 + 1, Z1 + 1, B.lampN);
      lights.push({ name: 'ultra', p: [40, SY0 + 7, Z1 + 3], c: '#ffb878', i: 0.5, d: 34, flicker: 0.1, srcR: 6 });
      landmarks.push({ name: '울트라 쇼핑몰', note: '비상사태부 대피 거점이던 대형 쇼핑몰', p: [40, SY1 + 10, Z1 + 1], boss: true });
      acts.push({
        name: '울트라 간판 점등', hint: '지붕 위 「ULTRA」 간판에 글자마다 차례로 네온이 들어와요', hit: [X0 + 1, SY0, Z1, 58, SY1, Z1 + 1],
        run: async a => {
          const cs = ['#ff4a4a', '#ffd84a', '#5ae86a', '#5aa0ff', '#ff9a3a'];
          for (let k = 0; k < 5; k++) { const p = letters[k]; a.burst([p[0], p[1], p[2] + 0.6], { n: 40, colors: [cs[k], '#ffffff'], speed: 3, up: 1, life: 0.9, gravity: 0, spread: 3, h: 8 }); await a.wait(0.35); }
          a.flash('ultra', 6, 3.5); a.glow(1.8, 3.5);
          for (let k = 0; k < 3; k++) { for (let x = 22; x <= 58; x += 3) a.burst([x + 0.5, SY0 + 1, Z1 + 1.8], { n: 3, colors: ['#ffe0a0', '#ffffff'], speed: 0.4, up: 0.3, life: 0.7, gravity: 0, spread: 0.2 }); await a.wait(0.7); }
        },
      });

      // ── 2층 바닥과 지붕(북쪽 띠만 남았다). 지붕 가장자리는 들쭉날쭉 깨졌다 ──
      for (let x = 58; x <= X1; x++) for (let z = Z0; z <= 44; z++) w.set(x, F2, z, B.slab);
      for (let x = 58; x <= X1; x++) { if (!(x >= 79 && x <= 87)) w.set(x, F2 + 1, 44, x % 4 === 0 ? B.steel : B.railG); }
      const roofEdge = x => 33 + Math.floor(h(x >> 1, 0, 9) * 4);
      for (let x = X0; x <= X1; x++) {
        const ze = x < 58 ? Z0 + 2 + Math.floor(h(x >> 1, 1, 9) * 3) : roofEdge(x);
        for (let z = Z0; z <= ze; z++) w.set(x, RF, z, B.slab);
        if (x % 5 === 0) w.box(x, RF - 1, Z0 + 1, x, RF - 1, ze, B.steel);
      }
      // 고샨 홀 지붕(북쪽 절반만 남음)
      for (let x = X0; x < 58; x++) { const ze = 56 + Math.floor(h(x >> 1, 2, 9) * 6); for (let z = Z0; z <= ze; z++) w.set(x, G + 13, z, B.slab); w.set(x, G + 14, ze, h(x, 3, 3) > 0.5 ? B.rubble : 0); }
      // 남은 철골 트러스: 무너진 지붕 자리를 가로지른다(군데군데 끊김)
      for (const z of [48, 62, 76, 90]) for (let x = 58; x <= X1; x++) if (h(x >> 3, z, 11) > 0.3) { w.set(x, RF, z, B.steel); if (x % 4 === 0) w.set(x, RF - 1, z, B.steel); }
      for (const x of [72, 100, 118]) for (let z = 36; z <= Z1; z++) if (h(x, z >> 3, 12) > 0.35) w.set(x, RF, z, z % 9 === 0 ? B.steelR : B.steel);
      for (const x of [72, 100, 118]) for (const z of [48, 62, 76, 90]) if (h(x, z, 13) > 0.3) w.box(x, G + 1, z, x, RF, z, B.steel);   // 남은 기둥
      w.line(104, RF, 62, 112, G + 2, 74, B.steelR); w.line(64, RF, 90, 60, G + 3, 98, B.steel);                           // 떨어진 보
      // 떨어진 지붕 판과 잔해 더미
      const rubble = (cx, cz, r) => { for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) { const d = Math.hypot(dx, dz); const hh = Math.round((r - d) * 0.8 + h(cx + dx, cz + dz, 14) * 1.5); for (let y = 1; y <= hh; y++) w.set(cx + dx, G + y, cz + dz, h(cx + dx, y, cz + dz) > 0.85 ? B.rebar : (h(dx, y, dz) > 0.5 ? B.rubble : B.slab)); } };
      rubble(108, 74, 4); rubble(76, 56, 3); rubble(124, 92, 3); rubble(66, 96, 3); rubble(40, 80, 4); rubble(50, 66, 3);
      for (let x = 112; x <= 118; x++) for (let z = 80; z <= 84; z++) w.set(x, G + 1 + Math.floor((x - 112) * 0.7), z, B.slab);    // 기울어진 판

      // ── 1층 북쪽 상점: OLI(주황) · IDEA(파랑·노랑) · KIBA(총포점, 셔터) · 약국 ──
      // 78~92는 에스컬레이터 통로
      for (const a0 of [58, 78, 92, 112, X1]) { w.box(a0, G + 1, Z0, a0, F2 - 1, 43, B.panel2); w.box(a0, F2 + 1, Z0, a0, RF - 1, 40, B.panel2); }
      const front = (x0, x1, y0, band, glass, z) => {
        for (let x = x0 + 1; x < x1; x++) {
          for (let y = y0; y <= y0 + 4; y++) w.set(x, y, z, (x === x0 + 1 || x === x1 - 1 || y === y0 + 4) ? B.steel : ((x - x0) % 8 === 4 && y <= y0 + 3 ? 0 : glass));
          for (let y = y0 + 5; y <= y0 + 9; y++) w.set(x, y, z, band);
        }
      };
      front(58, 78, G + 1, B.oliO, B.glassS, 44); front(92, 112, G + 1, B.ideaB, B.glassS, 44); front(112, X1, G + 1, B.kibaK, B.glassD, 44);
      text(w, 'OLI', 63, G + 10, 45, 's', B.signW, 1);
      text(w, 'IDEA', 95, G + 10, 45, 's', B.ideaY, 1); w.box(110, G + 6, 45, 110, G + 10, 45, B.ideaY); w.box(93, G + 6, 45, 93, G + 10, 45, B.ideaY);
      text(w, 'KIBA', 115, G + 10, 45, 's', B.signW, 1); w.box(130, G + 6, 45, 131, G + 10, 45, B.alarmR);
      for (let x = 79; x < 92; x++) { w.set(x, F2 - 1, 44, B.trimC); if (x % 3 === 0) w.box(x, G + 1, Z0 + 1, x + 1, G + 6, Z0 + 1, B.steel); }   // 통로 안쪽 승강기 문
      // 가게 안: OLI 선반, IDEA 가구, KIBA 총 걸이와 진열장
      for (let x = 61; x <= 74; x += 4) for (let z = 20; z <= 40; z++) if (z % 8 !== 0) { w.box(x, G + 1, z, x, G + 3, z, B.shelf); w.set(x, G + 2 + (z & 1), z, [B.oliO, B.box1, B.goodR][z % 3]); }
      w.box(95, G + 1, 32, 101, G + 2, 36, B.sofa); w.box(95, G + 3, 36, 101, G + 3, 36, B.sofa); w.box(104, G + 1, 22, 109, G + 4, 26, B.ideaY); w.box(104, G + 1, 32, 108, G + 2, 38, B.wood);
      for (let x = 94; x <= 109; x += 3) w.box(x, G + 1, 18, x + 1, G + 6, 19, h(x, 1, 1) > 0.5 ? B.box1 : B.ideaB);
      for (let x = 114; x <= 130; x++) { w.box(x, G + 2, Z0 + 1, x, G + 7, Z0 + 1, B.wood); if (x % 2 === 0) w.box(x, G + 3, Z0 + 2, x, G + 6, Z0 + 2, B.gun); }
      for (const z of [26, 34]) { w.box(116, G + 1, z, 128, G + 2, z + 2, B.wood); w.box(116, G + 3, z, 128, G + 3, z + 2, B.railG); for (let x = 117; x <= 127; x += 3) w.set(x, G + 4, z + 1, B.gun); }
      w.set(122, F2 - 1, 30, B.alarmR);
      // 2층 상점: 불탄 가게(서쪽), 옷가게, 신발가게, 약국
      front(58, 78, F2 + 1, B.soot, B.soot, 40); front(78, 92, F2 + 1, B.tealS, B.glassS, 40); front(92, 112, F2 + 1, B.pinkS, B.glassS, 40); front(112, X1, F2 + 1, B.signW, B.glassS, 40);
      for (const [dx, dy] of [[0, -1], [0, 0], [0, 1], [-1, 0], [1, 0]]) w.set(122 + dx, F2 + 8 + dy, 41, B.pharmG);
      for (let x = 59; x < 78; x++) for (let y = F2 + 1; y <= F2 + 10; y++) if (h(x, y, 15) > 0.55) w.set(x, y, 40, 0);   // 깨진 유리
      for (let x = 59; x < 78; x++) for (let z = Z0 + 1; z < 40; z++) { if (h(x, z, 16) > 0.7) w.set(x, F2 + 1, z, B.soot); if (h(x, z, 17) > 0.93) w.set(x, F2 + 1, z, B.ember); }
      for (let x = 59; x < 78; x++) for (let y = F2 + 1; y < RF; y++) if (h(x, y, 18) > 0.4) w.set(x, y, Z0 + 1, B.soot);
      w.box(65, F2 + 1, 28, 71, F2 + 2, 32, B.soot); w.box(67, F2 + 3, 30, 69, F2 + 3, 30, B.ember);
      for (let x = 81; x <= 89; x += 4) w.box(x, F2 + 1, 22, x, F2 + 5, 36, B.steel), w.box(x - 1, F2 + 4, 22, x + 1, F2 + 4, 36, x % 8 === 1 ? B.goodB : B.pinkS);
      for (let x = 95; x <= 109; x += 4) for (let z = 22; z <= 34; z += 6) w.box(x, F2 + 1, z, x + 1, F2 + 2, z + 1, B.signW);
      for (let z = 20; z <= 36; z += 4) w.box(116, F2 + 1, z, 128, F2 + 3, z, B.signW);
      lights.push({ name: 'fire', p: [69, F2 + 4, 31], c: '#ff8a3a', i: 0.6, d: 22, flicker: 0.7, srcR: 4 });
      acts.push({
        name: '불타는 상점', hint: '2층 불탄 가게에서 다시 불길이 일고 검은 연기가 무너진 지붕 밖으로 피어올라요', hit: [59, F2 + 1, 26, 77, F2 + 9, 40],
        run: async a => {
          a.flash('fire', 5, 5);
          for (let k = 0; k < 14; k++) {
            a.burst([65 + (k * 5) % 9, F2 + 2, 30 + (k * 3) % 8], { n: 16, colors: ['#ff7a2a', '#ffd04a', '#ff4a2a'], speed: 1.4, up: 4, life: 0.9, gravity: -1, spread: 2.5 });
            a.burst([69, F2 + 9, 38], { n: 18, colors: ['#3a3634', '#5a5654', '#2a2624', '#7a7470'], speed: 1.6, up: 5, life: 3, gravity: -0.6, spread: 4, h: 3 });
            await a.wait(0.35);
          }
        },
      });

      // ── KIBA 셔터(부품): 위쪽 축에 감겨 올라간다. 경보등이 붉게 돈다 ──
      const sh = w.prop({ name: 'kibaShutter', pivot: [122, G + 5.5, 45.5] });
      for (let x = 113; x <= 131; x++) for (let y = G + 1; y <= G + 5; y++) sh.set(x, y, 45, (y === G + 1 || x === 113 || x === 131) ? B.steel : B.shutter);
      lights.push({ name: 'kiba', p: [130.5, G + 9, 46], c: '#ff3a2a', i: 0.45, d: 22, flicker: 0.3, srcR: 4 });
      landmarks.push({ name: 'KIBA 총포점', note: '셔터 안쪽 쇠창살 문 · 경보 장치', p: [122, G + 18, 46] });
      acts.push({
        name: 'KIBA 셔터', hint: '총포점 KIBA의 셔터가 말려 올라가고, 안쪽 경보가 울리며 붉은 등이 번쩍여요', hit: [113, G + 1, 45, 131, G + 5, 45],
        run: async a => {
          a.burst([122, G + 6, 46], { n: 30, colors: ['#9a968e', '#c8c4bc'], speed: 2, up: 0.5, life: 1, gravity: 3, spread: 8, flat: true });
          await a.tween('kibaShutter', { scl: [1, 0.1, 1] }, 2.2);
          for (let k = 0; k < 6; k++) { a.flash('kiba', 8, 0.35); a.burst([130.5, G + 9, 46], { n: 20, colors: ['#ff3a2a', '#ffb0a0'], speed: 4, up: 1, life: 0.5, gravity: 0, spread: 1 }); a.burst([122, G + 3, 32], { n: 10, colors: ['#ff3a2a'], speed: 3, up: 1, life: 0.5, gravity: 0, spread: 6 }); await a.wait(0.5); }
          await a.wait(0.6);
          await a.tween('kibaShutter', { scl: [1, 1, 1] }, 1.6);
        },
      });
      landmarks.push({ name: 'OLI · IDEA', note: '주황 OLI 철물점과 파랑·노랑 IDEA 가구점', p: [85, G + 20, 46] });

      // ── 에스컬레이터 두 대: 아트리움 바닥에서 2층 회랑으로. 디딤판은 부품으로 흘러간다 ──
      const ESC = [[80, 'escUp'], [84, 'escDn']];
      for (const [ex, name] of ESC) {
        const p = w.prop({ name, pivot: [ex + 1.5, G + 1, 55.5] });
        for (let i = 0; i <= 20; i++) {
          const z = 65 - i, ty = G + 1 + Math.floor(i / 2);
          for (let x = ex; x <= ex + 2; x++) {
            for (let y = G + 1; y < ty; y++) w.set(x, y, z, B.esc);
            p.set(x, ty, z, i % 2 ? B.escT : B.escY);
          }
          for (const sx of [ex - 1, ex + 3]) { for (let y = G + 1; y <= ty + 1; y++) w.set(sx, y, z, sx === 83 ? B.esc : (y > ty ? B.railG : B.esc)); w.set(sx, ty + 2, z, B.rubber); }
        }
        w.box(ex, G + 1, 66, ex + 2, G + 1, 66, B.steel);
      }
      for (let z = 64; z <= 68; z++) for (let x = 79; x <= 87; x++) if (z > 65) w.set(x, G, z, B.steel);
      acts.push({
        name: '에스컬레이터 가동', hint: '멈춰 있던 두 에스컬레이터가 다시 움직여요. 하나는 올라가고 하나는 내려가요', hit: [79, G + 1, 45, 87, F2 + 2, 66],
        run: async a => {
          for (let k = 0; k < 12; k++) {
            await Promise.all([a.move('escUp', [0, 1, -2], 0.45, t => t), a.move('escDn', [0, -1, 2], 0.45, t => t)]);
            await Promise.all([a.move('escUp', [0, 0, 0], 0.001), a.move('escDn', [0, 0, 0], 0.001)]);
            if (k % 3 === 0) a.burst([83.5, G + 6, 55], { n: 8, colors: ['#d8d4c4', '#ffffff'], speed: 1, up: 1, life: 0.6, gravity: 1, spread: 4 });
          }
        },
      });

      // ── 고샨 하이퍼마켓: 붉은 정면(아트리움 쪽), 진열대 줄, 계산대 ──
      for (let z = 45; z <= Z1; z++) for (let y = G + 1; y <= G + 13; y++) {
        let b = (z % 6 === 0) ? B.gosR2 : B.gosR;
        if (y <= G + 2) b = B.concDk;
        if (z >= 60 && z <= 92 && y <= G + 6) b = (z % 8 === 4 || y === G + 6) ? B.steel : (z >= 74 && z <= 78 ? 0 : B.glassS);
        if (y === G + 13) b = B.trimC;
        w.set(58, y, z, b);
      }
      w.box(58, G + 1, Z0, 58, RF - 1, 44, B.panel2);
      text(w, 'GOSHAN', 59, G + 11, 99, 'e', B.gosG);
      for (let x = 24; x <= 50; x += 5) for (let z = 20; z <= 96; z++) {
        if (z > 56 && z < 62) continue;
        w.box(x, G + 1, z, x + 1, G + 3, z, B.shelf);
        const g = [B.goodR, B.goodB, B.goodG, B.goodY, B.box1, B.box2][Math.floor(h(x, z >> 1, 19) * 6)];
        w.set(x, G + 2, z, g); w.set(x + 1, G + 3, z, h(x, z, 20) > 0.3 ? g : B.shelf);
      }
      for (let z = 64; z <= 94; z += 6) { w.box(54, G + 1, z, 55, G + 2, z + 2, B.shelf); w.set(55, G + 3, z + 1, B.kibaK); w.set(54, G + 3, z, B.screenG); }
      landmarks.push({ name: '고샨 하이퍼마켓', note: '무너진 지붕 아래 진열대 · 계산대', p: [38, G + 22, 80] });

      // ── 아트리움 바닥: 비상사태부 천막, 모래주머니 방벽, 화분, 벤치, 안내 데스크 ──
      const tent = (x0, z0, len, col) => {
        for (let z = z0; z <= z0 + len; z++) for (let dx = -4; dx <= 4; dx++) {
          const y = G + 5 - Math.floor(Math.abs(dx) * 0.8);
          w.set(x0 + dx, y, z, (z === z0 + 2 || z === z0 + len - 2) ? B.tarpO : col);
          if (Math.abs(dx) === 4) w.box(x0 + dx, G + 1, z, x0 + dx, y, z, col);
          if (z === z0 + len && Math.abs(dx) < 4) w.box(x0 + dx, G + 1, z, x0 + dx, y - 1, z, (Math.abs(dx) <= 1 && y > G + 2) ? B.crossR : B.tarpW);
        }
      };
      tent(110, 48, 10, B.tarpB); tent(124, 50, 9, B.tarpW);
      for (const [x, z] of [[104, 62], [106, 64], [128, 64]]) { w.box(x, G + 1, z, x + 1, G + 2, z + 1, B.crate); w.set(x, G + 3, z, B.crossR); }
      for (let z = 66; z <= 70; z++) w.box(116, G + 1, z, 121, G + 1, z, B.tarpW);
      landmarks.push({ name: '비상사태부 캠프', note: 'EMERCOM 대피 거점의 천막', p: [116, G + 14, 54] });
      // 모래주머니 방벽(IDEA 앞): 기관총은 받침대 위 물건으로만
      for (let x = 92; x <= 104; x++) for (const z of [50]) w.box(x, G + 1, z, x, G + 2, z, B.sand);
      w.box(92, G + 1, 47, 92, G + 2, 49, B.sand); w.box(104, G + 1, 47, 104, G + 2, 49, B.sand);
      w.box(98, G + 3, 50, 98, G + 3, 50, B.steel); w.box(98, G + 4, 49, 98, G + 4, 52, B.gun);
      for (const [x, z] of [[66, 84], [100, 92]]) {
        w.box(x - 1, G + 1, z - 1, x + 1, G + 2, z + 1, B.conc); w.set(x, G + 2, z, B.soil);
        MH.tree(w, x, G + 3, z, { kind: 'dead', h: 5, bark: B.bark, leaves: [], r: 2 });
      }
      for (const [x, z] of [[78, 70], [96, 70], [78, 80], [96, 80]]) w.box(x, G + 1, z, x + 3, G + 1, z, B.wood);
      w.cyl(86, 86, G + 1, G + 2, 3, B.trimC); w.cyl(86, 86, G + 3, G + 3, 3, B.wood); w.box(86, G + 4, 86, 86, G + 9, 86, B.steel); w.box(84, G + 9, 86, 88, G + 11, 86, B.ideaB); w.set(86, G + 10, 87, B.signW);
      // 바닥 잔해·물웅덩이·종이 쓰레기
      for (let k = 0; k < 260; k++) { const x = w.ri(60, 120), z = w.ri(46, 102); if (w.get(x, G + 1, z) || (x >= 78 && x <= 88 && z <= 67)) continue; const r = h(x, z, 23); if (r < 0.4) w.set(x, G, z, B.asphW); else if (r < 0.75) w.set(x, G + 1, z, B.rubble); else w.set(x, G + 1, z, r < 0.9 ? B.box2 : B.box1); }
      // 천장 등(꺼진 등): 2층 바닥 아래, 회랑 기둥
      const lamps = [];
      for (let x = 62; x <= 128; x += 8) { w.set(x, F2 - 1, 42, B.lampOff); lamps.push([x + 0.5, F2 - 1, 42.5]); }
      for (let x = 62; x <= 128; x += 8) { w.set(x, RF - 1, 38, B.lampOff); lamps.push([x + 0.5, RF - 1, 38.5]); }
      w.set(86, G + 12, 86, B.lampW);
      lights.push({ name: 'mall', p: [86.5, G + 12, 86.5], c: '#fff0c8', i: 0.35, d: 60, flicker: 0.05, srcR: 3 });
      // 동쪽 벽 안 잘린 방들: 카페, 화장실, 보안실(경보 단말)
      for (const z of [58, 72, 86]) for (let x = 122; x < X1; x++) { const t = G + 2 + Math.floor(h(x, z, 21) * 4); w.box(x, G + 1, z, x, t, z, B.panel2); }
      for (let z = 46; z < Z1; z++) w.box(122, G + 1, z, 122, G + 2 + Math.floor(h(z, 1, 22) * 3), z, (z % 14 > 8 && z % 14 < 12) ? 0 : B.panel2);
      for (let x = 123; x < X1; x++) for (let z = 73; z < 86; z++) w.set(x, G, z, (x + z) % 2 ? B.trimC : B.signW);
      for (let x = 123; x < X1; x++) for (let z = 87; z < Z1; z++) w.set(x, G, z, B.tileG);
      for (const [x, z] of [[125, 76], [129, 76], [125, 82]]) w.box(x, G + 1, z, x + 1, G + 2, z + 1, B.signW);
      w.box(125, G + 1, 92, 129, G + 2, 93, B.kibaK); w.set(127, G + 3, 92, B.screenG); w.set(125, G + 3, 92, B.screenG);
      for (const [x, z] of [[126, 96], [129, 99]]) { w.box(x, G + 1, z, x, G + 2, z, B.wood); w.box(x - 1, G + 3, z - 1, x + 1, G + 3, z + 1, B.wood); }

      // ── 발전소(북동쪽 바깥): 벽돌 변전소, 변압기, 철망, 레버 스위치(부품) ──
      const PX0 = 142, PX1 = 156, PZ0 = 18, PZ1 = 27;
      w.box(PX0, G + 1, PZ0, PX1, G + 8, PZ1, B.brick); w.box(PX0 + 1, G + 1, PZ0 + 1, PX1 - 1, G + 7, PZ1 - 1, 0);
      w.box(PX0 - 1, G + 9, PZ0 - 1, PX1 + 1, G + 9, PZ1 + 1, B.concDk); w.box(PX0 + 2, G + 1, PZ1, PX0 + 4, G + 5, PZ1, B.steel);
      for (let x = PX0 + 7; x <= PX1 - 1; x += 3) w.set(x, G + 6, PZ1, B.glassD);
      for (const x of [144, 150, 156]) { w.box(x, G + 1, 30, x + 3, G + 5, 33, B.transf); w.box(x + 1, G + 6, 31, x + 1, G + 7, 32, B.signW); w.box(x + 1, G + 8, 31, x + 1, G + 8, 32, B.steel); }
      for (let x = 141; x <= 161; x++) for (const z of [35]) if (x % 2 === 0) w.box(x, G + 1, z, x, G + 4, z, B.fenceM); else w.box(x, G + 4, z, x, G + 4, z, B.fenceM);
      for (let z = 29; z <= 35; z++) for (const x of [141, 161]) w.box(x, G + 1, z, x, G + 4, z, z % 2 ? B.fenceM : 0);
      w.box(147, G + 2, PZ1 + 1, 150, G + 5, PZ1 + 1, B.steel); w.set(149, G + 6, PZ1 + 1, B.lampG); w.set(147, G + 6, PZ1 + 1, B.alarmR);
      const lever = w.prop({ name: 'lever', pivot: [148.5, G + 3.5, PZ1 + 2.5], axis: 'x' });
      lever.box(148, G + 3, PZ1 + 2, 148, G + 5, PZ1 + 2, B.hazard); lever.set(148, G + 6, PZ1 + 2, B.cartR);
      lights.push({ name: 'power', p: [149.5, G + 6, PZ1 + 2], c: '#5aff7a', i: 0.4, d: 16, flicker: 0.1, srcR: 3 });
      landmarks.push({ name: '발전소', note: '스위치를 올리면 몰에 전기가 들어옴', p: [149, G + 16, 26] });
      acts.push({
        name: '발전소 스위치', hint: '발전소 레버를 올리면 초록 불이 켜지고, 몰 천장 등이 하나씩 다시 들어와요', hit: [146, G + 2, PZ1 + 1, 151, G + 7, PZ1 + 2],
        run: async a => {
          await a.turn('lever', [-1.4, 0, 0], 0.5);
          a.burst([148.5, G + 6, PZ1 + 2.5], { n: 26, colors: ['#ffffff', '#a8e8ff', '#ffe08a'], speed: 5, up: 2, life: 0.4, gravity: 3, spread: 0.5 });
          a.flash('power', 6, 6);
          for (const x of [145, 151, 157]) a.burst([x + 0.5, G + 8, 31.5], { n: 12, colors: ['#a8e8ff', '#ffffff'], speed: 3, up: 2, life: 0.4, gravity: 0, spread: 0.5 });
          await a.wait(0.5);
          a.flash('mall', 4, 5); a.glow(1.5, 5);
          for (let k = 0; k < lamps.length; k++) { a.burst(lamps[k], { n: 8, colors: ['#fff4d0', '#ffffff'], speed: 0.6, up: -0.3, life: 1, gravity: 0, spread: 0.6 }); if (k % 2) await a.wait(0.12); }
          await a.wait(1.5);
          await a.turn('lever', [0, 0, 0], 0.5);
        },
      });

      // ── 주차장: 버려진 차, 쇼핑카트, 가로등, 콘크리트 방벽 ──
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
        if (o.door) for (let u = 3; u <= 4; u++) at(u, Wd, y0 + 2, col);
      };
      const cars = [[16, 116, 'z', B.carB], [30, 116, 'z', B.carW, { door: 1 }], [37, 116, 'z', B.carK, { burnt: 1, sunk: 1 }], [58, 115, 'z', B.carG], [100, 116, 'z', B.carY],
        [23, 137, 'z', B.carR], [51, 138, 'z', B.carW], [79, 137, 'z', B.carB, { door: 1 }], [107, 138, 'z', B.carG], [121, 136, 'z', B.carW],
        [65, 152, 'z', B.carB], [93, 151, 'z', B.carR], [143, 44, 'x', B.carW], [143, 72, 'x', B.carR, { sunk: 1 }], [156, 58, 'x', B.carB], [156, 86, 'x', B.carY], [143, 93, 'x', B.carG]];
      for (const [x, z, ax, col, o] of cars) car(w, x, z, ax, col, o);
      // 경보 울리는 차(부품)
      const AX = 112, AZ = 117;
      const ac = w.prop({ name: 'alarmCar', pivot: [AX + 2, G + 1, AZ + 4], axis: 'z' });
      car(ac, AX, AZ, 'z', B.carB, { lit: 1 });
      lights.push({ name: 'car', p: [AX + 2, G + 4, AZ + 4], c: '#ffb04a', i: 0.4, d: 18, flicker: 0.2, srcR: 5 });
      acts.push({
        name: '차 경보', hint: '주차장의 파란 승용차에서 경보가 울리며 비상등이 깜빡이고 차체가 흔들려요', hit: [AX, G + 1, AZ, AX + 3, G + 5, AZ + 7],
        run: async a => {
          for (let k = 0; k < 10; k++) {
            a.flash('car', k % 2 ? 0.2 : 7, 0.3);
            if (k % 2 === 0) for (const [dx, dz] of [[0, 0], [3, 0], [0, 7], [3, 7]]) a.burst([AX + dx + 0.5, G + 3.5, AZ + dz + 0.5], { n: 8, colors: ['#ffb04a', '#ffffff'], speed: 2, up: 0.5, life: 0.35, gravity: 0, spread: 0.4 });
            a.tween('alarmCar', { off: [0, k % 2 ? 0 : 1.4, 0], rot: [0, 0, k % 2 ? 0.12 : -0.12] }, 0.3);
            await a.wait(0.35);
          }
          await a.tween('alarmCar', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.3);
        },
      });
      // 쇼핑카트
      const cartAt = (p, x, z, tip) => {
        for (const dx of [0, 2]) for (const dz of [0, 3]) p.set(x + dx, G + 1, z + dz, B.tire);
        for (let dx = 0; dx <= 2; dx++) for (let dz = 0; dz <= 3; dz++) { p.set(x + dx, G + 2, z + dz, B.cart); if (dx !== 1 || dz === 0 || dz === 3) p.set(x + dx, G + 3, z + dz, B.cart); }
        p.box(x, G + 4, z + 3, x + 2, G + 4, z + 3, B.cartR);
        if (tip) p.set(x + 1, G + 3, z + 1, B.goodY);
      };
      const carts = [[84, 108], [89, 110], [94, 108]];
      carts.forEach(([x, z], k) => { const p = w.prop({ name: 'cart' + k, pivot: [x + 1.5, G + 1, z + 2] }); cartAt(p, x, z, k === 1); });
      for (const [x, z] of [[44, 128], [72, 131], [134, 120], [148, 104], [26, 150]]) cartAt(w, x, z, h(x, z, 1) > 0.5);
      for (let x = 80; x <= 98; x++) { w.set(x, G + 3, 126, B.cartR); if (x % 6 === 2) w.box(x, G + 1, 126, x, G + 2, 126, B.steel); }   // 카트 보관대
      acts.push({
        name: '굴러가는 카트', hint: '바람에 쇼핑카트들이 덜컹거리며 주차장 비탈로 굴러가다 멈춰요', hit: [84, G + 1, 108, 96, G + 4, 113],
        run: async a => {
          a.wind(3, 4);
          const go = (k, dx, dz, r, d) => a.path('cart' + k, [[dx * 0.5, 0, dz * 0.5, r * 0.5], [dx, 0, dz, r]], d);
          await Promise.all([go(0, -8, 22, 0.6, 3), go(1, 6, 26, -0.4, 3.4), go(2, 18, 20, -1.2, 3.2)]);
          for (const k of [0, 1, 2]) a.burst([carts[k][0] + 1.5 + [-8, 6, 18][k], G + 1, carts[k][1] + 2 + [22, 26, 20][k]], { n: 12, colors: ['#9a968e', '#c8c4bc'], speed: 2, up: 1, life: 0.6, gravity: 3, spread: 1.5, flat: true });
          await a.wait(1.2);
          await Promise.all([0, 1, 2].map(k => a.tween('cart' + k, { off: [0, 0, 0], rot: [0, 0, 0] }, 1.6)));
        },
      });
      // 가로등(밤에 켜짐)과 콘크리트 방벽
      const lp = [];
      for (const [x, z] of [[46, 125], [86, 125], [126, 125], [46, 148], [86, 148], [150, 50], [150, 80]]) {
        w.box(x, G + 1, z, x, G + 9, z, B.steel); w.box(x - 1, G + 9, z, x + 1, G + 9, z, B.steel); w.set(x - 1, G + 8, z, B.lampN); w.set(x + 1, G + 8, z, B.lampN); lp.push([x + 0.5, G + 8, z + 0.5]);
      }
      lights.push({ p: lp[1], c: '#ffe0a0', i: 0.8, d: 22, flicker: 0.05, night: true });
      lights.push({ p: lp[5], c: '#ffe0a0', i: 0.8, d: 22, flicker: 0.05, night: true });
      for (let x = 60; x <= 80; x += 3) w.box(x, G + 1, 110, x + 1, G + 2, 110, B.jersey);
      for (let z = 40; z <= 100; z += 4) if (z % 12) w.box(137, G + 1, z, 137, G + 2, z + 1, B.jersey);
      for (const [x, z] of [[130, 108], [8, 108], [138, 12]]) { for (let k = 0; k < 3; k++) w.cyl(x, z, G + 1 + k, G + 1 + k, 1.2, B.tire); }

      // ── 비상사태부 검문소(남동쪽): 초소, 차단기, 방벽 — 녹색 신호탄 탈출 ──
      const CX = 140, CZ = 142;
      w.box(CX, G + 1, CZ, CX + 5, G + 6, CZ + 5, B.signW); w.box(CX + 1, G + 3, CZ + 5, CX + 4, G + 4, CZ + 5, B.glassS); w.box(CX + 5, G + 3, CZ + 1, CX + 5, G + 4, CZ + 4, B.glassS);
      w.box(CX - 1, G + 7, CZ - 1, CX + 6, G + 7, CZ + 6, B.tarpB); w.box(CX, G + 5, CZ + 6, CX + 5, G + 5, CZ + 6, B.tarpO);
      w.set(CX + 2, G + 8, CZ + 2, B.lampG);
      for (let x = CX - 12; x < CX; x++) w.set(x, G + 3, CZ + 3, (x >> 1) % 2 ? B.hazard : B.hazardK); w.box(CX - 13, G + 1, CZ + 3, CX - 13, G + 3, CZ + 3, B.hazardK);
      for (const [x, z] of [[136, 160], [140, 160], [158, 140], [158, 144], [132, 146]]) w.box(x, G + 1, z, x + 2, G + 2, z, B.jersey);
      for (let x = CX - 6; x <= CX + 10; x += 4) w.box(x, G + 1, CZ - 4, x + 1, G + 2, CZ - 4, B.sand);
      lights.push({ name: 'flare', p: [CX + 2.5, G + 9, CZ + 2.5], c: '#5aff7a', i: 0.5, d: 30, flicker: 0.15, srcR: 3 });
      landmarks.push({ name: '비상사태부 검문소', note: '탈출 지점 · 녹색 신호탄', p: [CX + 3, G + 18, CZ + 3] });
      acts.push({
        name: '탈출 신호탄', hint: '검문소 앞에서 녹색 신호탄이 하늘 높이 솟아 탈출로가 열려요', hit: [CX - 4, G + 1, CZ - 6, CX + 6, G + 8, CZ + 6],
        run: async a => {
          for (let k = 0; k < 8; k++) { a.burst([CX - 2.5, G + 2 + k * 3, CZ - 1.5], { n: 10, colors: ['#ffffff', '#c8ffd0'], speed: 0.3, up: 1, life: 0.7, gravity: 0, spread: 0.2 }); await a.wait(0.12); }
          a.flash('flare', 9, 5); a.glow(1.6, 4);
          a.burst([CX - 2.5, G + 28, CZ - 1.5], { n: 120, colors: ['#5aff7a', '#c8ffd0', '#2ad04a'], speed: 9, up: 2, life: 2.2, gravity: 1.5, spread: 1 });
          for (let k = 0; k < 8; k++) { a.burst([CX - 2.5, G + 2, CZ - 1.5], { n: 20, colors: ['#5ae86a', '#8af09a', '#3aa04a'], speed: 1.2, up: 3, life: 2.4, gravity: -0.4, spread: 1.5 }); await a.wait(0.35); }
        },
      });

      // ── 바깥 둘레: 침엽수 줄, 북쪽 고가도로 받침 ──
      for (let z = 8; z <= 160; z += 9) MH.tree(w, 6 + (z % 3), G + 1, z, { kind: 'pine', h: 9 + (z % 4), bark: B.bark, leaves: [B.leaf2, B.leaf], r: 3 });
      for (let x = 24; x <= 150; x += 10) MH.tree(w, x, G + 1, 6 + (x % 3), { kind: 'pine', h: 10 + (x % 3), bark: B.bark, leaves: [B.leaf2, B.leaf], r: 3 });
      for (let x = 14; x <= 128; x += 16) MH.tree(w, x, G + 1, 165, { kind: 'pine', h: 6, bark: B.bark, leaves: [B.leaf2, B.leaf], r: 2 });

      return { lights, landmarks, acts };
    },
  });
})();
