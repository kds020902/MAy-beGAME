// LEXOS 전시장 홀(하위 지도) — 카반의 본거지. 2층 높이 홀, 검은 타공 천장과 둥근 매립등, 탑 아래로 휘어 도는 흰 중이층(사장실)과 철제 계단,
// 방수포 씌운 전시차, 「쉬운 교환」 광고판, 유리 뒤 모래주머니와 PKM, 카반의 소파 자리, 철망으로 막은 닫힌 구역(로고 등). 남·동쪽 벽은 잘라 낮췄다 (96칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 96, D = 96, Hh = 64, G = 12;
  MAPS.push({
    id: 'lexos-in', cat: 'tarkov', sub: true, parent: 'lexos', name: 'LEXOS 전시장 홀', en: 'Streets of Tarkov · LEXOS Showroom', color: '#4a6a9a', seed: 651, base: G, time: 'day', size: [W, D, Hh],
    desc: 'LEXOS 자동차 대리점의 2층 높이 전시장 홀. 검은 타공 천장에 둥근 매립등이 박혀 있고, 유리탑 아래로 흰 중이층이 휘어 돌며 사장실로 이어진다. 카반 일당은 통유리를 철망과 방수포로 가리고 모래주머니를 쌓아 기관총 자리를 만들었다. 덮개를 씌운 전시차 사이에 카반이 앉던 가죽 소파가 있고, 서쪽 구석의 닫힌 구역은 철망으로 막혀 있다.',
    info: { title: '장소 정보', en: 'LEXOS SHOWROOM', rows: [['쓰임', '보스 카반의 본거지'], ['중이층', '사장실 · 「차 정비가 필요해」 임무의 저장장치'], ['닫힌 구역', '자동차 대리점 닫힌 구역 열쇠'], ['방비', '유리 뒤 모래주머니 · PKM 거치대 · 위층 클레이모어']] },
    sky: ['#aab8c8', '#5a6a80', '#e4ded2'], stars: false,
    hemi: ['#e4e8f0', '#3a3a38', 0.56], sun: ['#fff0dc', 0.5, [0.5, 1, 0.6]],
    night: { sky: ['#2a2a3c', '#0a0c16', '#a86a48'], stars: false, hemi: ['#9aa4c0', '#141416', 0.42], sun: ['#ffb488', 0.26, [0.6, 0.8, 0.5]], haze: '#22242e' },
    fog: { start: 0.94, floor: 6, depth: 6, haze: [6, 0.2, 6], hazeColor: '#b0b6be' },
    camY: -10, zoom: 1.5,
    particles: [
      { n: 60, colors: ['#d8d0bc', '#b8b0a0', '#ffffff'], mode: 'drift', speed: 0.15, wind: 0.1, area: [46, 44, 30], y0: G + 1, y1: G + 14, glow: false },
      { n: 10, colors: ['#9a9a9a', '#c8c8c8'], mode: 'rise', speed: 0.3, area: [53.5, 67.5, 0.6], y0: G + 3, y1: G + 8, glow: false },
    ],
    blocks: {
      floor: { c: '#5a5c60', top: '#727478', v: 0.03, pat: 'check', alt: '#686a6e' }, walk: { c: '#86847c', top: '#9c9a92', v: 0.05, pat: 'check', alt: '#928f86' }, asph: { c: '#4a4c50', top: '#56585c', v: 0.06 },
      slab: { c: '#6e6c66', top: '#82807a', v: 0.06, pat: 'floor' }, curb: { c: '#8e8c86', top: '#aaa8a0', v: 0.04 }, soil: { c: '#4a3e30', v: 0.08 }, concDk: { c: '#5e5a54', v: 0.05, pat: 'stone' },
      conc: { c: '#b0aea6', v: 0.04, pat: 'big' }, concL: { c: '#cfcdc6', v: 0.03 }, wallD: { c: '#3a3c40', v: 0.03 }, trim: { c: '#e8e8e2', v: 0.02 }, ceil: { c: '#2e3034', v: 0.06, pat: 'check', alt: '#383a3e' },
      down: { c: '#fff4dc', glow: true }, box: { c: '#e8eef4', glow: true },
      glass: { c: '#a8c8dc', v: 0.03 }, glassD: { c: '#4a6070', v: 0.03 }, mull: { c: '#3a3e42', v: 0.02 }, tarp: { c: '#3e4434', v: 0.05 }, mesh: { c: '#8a8e90', v: 0.06 }, meshD: { c: '#5a5e60', v: 0.05 },
      ply: { c: '#c8a878', v: 0.06, pat: 'plank' }, osb: { c: '#b07a42', v: 0.08, pat: 'plank' }, shutter: { c: '#a0a4a2', v: 0.03, pat: 'log' }, hazard: { c: '#d0a020', v: 0.03 },
      steel: { c: '#6a7078', v: 0.03 }, iron: { c: '#2c2e32', v: 0.03 }, tread: { c: '#a8743e', v: 0.05, pat: 'plank' },
      panel: { c: '#7a5232', v: 0.05, pat: 'plank' }, desk: { c: '#4a3424', v: 0.04 }, black: { c: '#18181a', v: 0.02 }, screen: { c: '#7ad0ff', glow: true }, screenOff: { c: '#1e2a34', v: 0.02 },
      sofa: { c: '#5a3a2a', v: 0.05 }, sofaD: { c: '#3e2820', v: 0.04 }, rug: { c: '#6a2a2a', v: 0.05, pat: 'check', alt: '#5a2424' }, white: { c: '#ecebe6', v: 0.02 }, red: { c: '#c02a2e', v: 0.03 }, gray: { c: '#9aa0a6', v: 0.03 },
      sand: { c: '#8a7a56', top: '#9a8a64', v: 0.08, pat: 'stone' }, crate: { c: '#4e5a38', v: 0.05, pat: 'plank' }, crateL: { c: '#c8b088', v: 0.05, pat: 'plank' }, pallet: { c: '#8a6a44', v: 0.06, pat: 'plank' },
      barrelB: { c: '#2a5a8a', v: 0.05, pat: 'log' }, barrelG: { c: '#4a6a3a', v: 0.05, pat: 'log' }, tire: { c: '#161618', v: 0.02 },
      carS: { c: '#a8aeb4', v: 0.03 }, carK: { c: '#24262a', v: 0.02 }, carW: { c: '#dcdcd8', v: 0.03 }, carGl: { c: '#3a4a5a', v: 0.02 }, cover: { c: '#9a9480', v: 0.07 },
      headL: { c: '#fff2d0', night: true, day: '#d4d0c0' }, tailL: { c: '#ff3030', night: true, day: '#8a2020' },
      gun: { c: '#222426', v: 0.02 }, gunG: { c: '#3e4630', v: 0.03 }, clay: { c: '#4a5a30', v: 0.03 }, gen: { c: '#3a5a3a', v: 0.04 }, contB: { c: '#2a5470', v: 0.05, pat: 'plank' },
      logoG: { c: '#5aff7a', glow: true }, glowG: { c: '#6aff8a', glow: true }, lampY: { c: '#ffd080', glow: true }, ember: { c: '#ff6a2a', glow: true },
      // OR.signpost 재질
      stoneG: { c: '#6e6c66', v: 0.04 }, timber: { c: '#4a4e54', v: 0.03 }, door: { c: '#2a6a4a', v: 0.03 }, gold: { c: '#e8c040', v: 0.03 }, mlamp: { c: '#fff0c0', night: true, day: '#e8e2cc' },
    },
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 6, height: () => G, surface: () => B.slab, under: (x, z, y, dep) => dep < 2 ? B.soil : B.concDk });
      const lights = [], acts = [], landmarks = [];
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const H2 = (x, z, k) => hash3(x, k || 0, z);

      // ── 홀 평면: 서쪽 벽 x=12, 동쪽 유리 x=80, 북쪽 벽 z=4, 남쪽 벽 z=80. 북동 모서리는 탑을 따라 둥글다 ──
      const X0 = 26, X1 = 80, Z0 = 4, Z1 = 78, NC = [60, 24], NR = 20, TOP = G + 15;
      const inH = (x, z) => x >= X0 && x <= X1 && z >= Z0 && z <= Z1 && !(x > NC[0] && z < NC[1] && Math.hypot(x - NC[0], z - NC[1]) > NR + 0.4);
      const per = (x, z) => inH(x, z) && (!inH(x + 1, z) || !inH(x - 1, z) || !inH(x, z + 1) || !inH(x, z - 1));
      // 바깥: 동쪽은 인도와 대로, 남쪽은 인도, 서쪽은 뒷마당
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        let b = B.slab;
        if (inH(x, z)) b = B.floor;
        else if (x > X1 && x <= 88) b = x === 88 ? B.curb : B.walk;
        else if (x > 88) b = (x === 92 && z % 8 < 4) ? B.trim : B.asph;
        else if (z > Z1) b = z === 90 ? B.curb : B.walk;
        S(x, G, z, b);
      }
      // 벽: 북·서(카메라 반대편)는 높고, 동(유리)·남은 낮게 잘랐다
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        if (!per(x, z)) continue;
        const east = x >= X1 - 1 && z >= NC[1], south = z === Z1, west = x === X0, curve = x > NC[0] && z < NC[1];
        const a = curve ? Math.round(Math.atan2(z - NC[1], x - NC[0]) * NR) : (west || x >= X1 - 1 ? z : x);
        if (east || south) {
          for (let y = G + 1; y <= G + 3; y++) S(x, y, z, y === G + 1 ? B.mull : (a % 4 === 0 ? B.mull : (south ? B.conc : B.glassD)));
          if (a % 8 === 0) S(x, G + 4, z, B.mull);
          continue;
        }
        for (let y = G + 1; y <= TOP; y++) {
          let b;
          if (west) b = y <= G + 1 ? B.concDk : y >= TOP - 1 ? B.wallD : (y >= G + 9 && y <= G + 10 ? B.trim : B.conc);
          else {                                                                       // 북쪽·북동: 통유리를 안쪽에서 본 모습(철망·방수포·합판)
            const pane = H2(a >> 2, y > G + 7 ? 2 : 1, 7);
            b = (a % 4 === 0 || y === G + 1 || y === G + 7 || y === TOP) ? B.mull : (pane > 0.75 ? B.tarp : pane > 0.62 ? B.ply : pane > 0.5 ? B.osb : (y > G + 7 && pane < 0.2 ? B.glass : B.mesh));
          }
          S(x, y, z, b);
        }
      }
      // 동쪽 유리 안쪽 모래주머니 벽(틈을 두고)과 철망 걸친 기둥
      for (let z = NC[1] + 2; z < Z1 - 1; z++) { if (z >= 43 && z <= 50) continue; if ((z - 30) % 13 === 12) continue; for (let y = G + 1; y <= G + (z % 5 === 0 ? 2 : 3); y++) S(X1 - 2, y, z, B.sand); }
      for (let z = 32; z < Z1; z += 12) w.box(X1, G + 1, z, X1, G + 5, z, B.mull);
      // 출입구: 동쪽 유리 z 44~49 (바깥 대로 쪽 이정표)
      for (let z = 44; z <= 49; z++) for (let y = G + 1; y <= G + 4; y++) { S(X1, y, z, z === 44 || z === 49 ? B.mull : 0); S(X1 - 1, y, z, 0); }
      const sp = OR.signpost(w, B, 85, 52, { dir: [1, 0], boards: 1, h: 6 });
      acts.push(OR.goAct({ at: sp, name: '프리모르스키 대로로 나가기', goto: 'lexos', hint: '모래주머니 틈의 유리문으로 나가 LEXOS 앞 대로로 돌아가요' }));

      // ── 천장: 북·서쪽 띠만 남긴 검은 타공 천장, 둥근 매립등, 매단 사각 조명 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (!inH(x, z) || !(z <= Z0 + 2 || x <= X0 + 2)) continue;
        S(x, TOP, z, B.ceil); S(x, TOP - 1, z, (x + z) % 4 === 0 ? B.down : B.wallD);
      }
      for (const [x, z] of [[46, 6], [58, 6], [28, 30], [28, 52]]) { w.box(x, TOP - 4, z, x, TOP - 2, z, B.iron); w.box(x - 1, TOP - 5, z - 1, x + 1, TOP - 5, z + 1, B.box); }
      lights.push({ name: 'ceilN', p: [52, TOP - 4, 7], c: '#fff0d8', i: 0.35, d: 34, flicker: 0.04, srcR: 4 });
      lights.push({ name: 'ceilW', p: [29, TOP - 4, 41], c: '#fff0d8', i: 0.35, d: 34, flicker: 0.04, srcR: 4 });

      // ── 중이층: 탑 아래 활 모양 바닥, 흰 앞판, 쇠 난간. 서쪽 끝은 사장실 ──
      const MY = G + 7, MC = [46, -12], MR = 28;
      const inM = (x, z) => inH(x, z) && Math.hypot(x - MC[0], z - MC[1]) <= MR;
      for (let z = Z0; z <= 30; z++) for (let x = X0; x <= X1; x++) {
        if (!inM(x, z) || per(x, z)) continue;
        S(x, MY, z, B.floor);
        const edge = !inM(x + 1, z) || !inM(x - 1, z) || !inM(x, z + 1);
        if (!edge) continue;
        S(x, MY - 1, z, B.trim); S(x, MY, z, B.trim);
        S(x, MY + 2, z, B.steel); if ((x + z) % 2 === 0) S(x, MY + 1, z, B.steel);
      }
      for (const [x, z] of [[34, 12], [46, 14], [58, 12]]) w.box(x, G + 1, z, x, MY - 2, z, B.trim);                                  // 중이층 기둥
      // 계단: 바닥(남) → 중이층(북), 나무 디딤판과 쇠 옆판·난간
      const SX0 = 30, SX1 = 32;
      for (let s = 0; s < 7; s++) { const y = G + 1 + s, z0 = 25 - s * 2; w.box(SX0, y, z0 - 1, SX1, y, z0, B.tread); for (const x of [SX0 - 1, SX1 + 1]) { S(x, y, z0, B.steel); S(x, y, z0 - 1, B.steel); S(x, y + 2, z0, B.steel); } }
      w.box(SX0, MY, 9, SX1, MY, 12, B.floor); for (let y = MY - 1; y >= G + 1; y--) S(SX1 + 1, y, 12, B.steel);
      // 사장실: 북서 구석, 나무 벽판, 책상과 컴퓨터, 금고, 낮은 유리 칸막이
      const OX0 = 27, OX1 = 29 + 10, OZ1 = 9;
      w.box(OX0, MY + 1, Z0 + 1, OX1, TOP - 1, Z0 + 1, B.panel); w.box(OX0, MY + 1, Z0 + 1, OX0, TOP - 1, OZ1, B.panel);
      for (let x = OX0 + 1; x <= OX1; x++) { S(x, MY + 1, OZ1, x % 4 ? B.glassD : B.mull); if (x % 4 === 0) S(x, MY + 2, OZ1, B.mull); }
      for (let z = Z0 + 2; z < OZ1; z++) S(OX1, MY + 1, z, z % 4 ? B.glassD : B.mull);
      w.box(32, MY + 1, 6, 36, MY + 2, 7, B.desk); S(34, MY + 3, 6, B.black);
      const pc = w.prop({ name: 'pc', pivot: [34.5, MY + 4, 6.5] }); pc.set(34, MY + 4, 6, B.screen); pc.set(35, MY + 4, 6, B.screen);
      w.box(34, MY + 4, 5, 35, MY + 4, 5, B.screenOff);
      const drv = w.prop({ name: 'drive', pivot: [36.5, MY + 3, 7.5] }); drv.set(36, MY + 3, 7, B.lampY);
      w.box(34, MY + 1, 8, 35, MY + 1, 8, B.sofaD); S(34, MY + 2, 8, B.sofaD);
      w.box(28, MY + 1, 5, 29, MY + 3, 6, B.gray); S(30, MY + 2, 6, B.iron);                                                     // 금고
      w.box(38, MY + 1, 5, 38, MY + 4, 6, B.desk);                                                                               // 서류장
      lights.push({ name: 'pc', p: [34.5, MY + 5, 7], c: '#7ad0ff', i: 0, d: 12, flicker: 0, srcR: 3 });
      // 위층 클레이모어(남동 중이층 끝)
      for (const [x, z] of [[60, 8], [54, 12], [48, 14]]) S(x, MY + 1, z, B.clay);
      landmarks.push({ name: '사장실', note: '중이층 · 「차 정비가 필요해」 저장장치', p: [34, TOP + 6, 7] });

      // ── 차: 축 방향 길이 9, 폭 4 ──
      const car = (t, x0, z0, o) => {
        const P = (u, v) => o.axis === 'x' ? [x0 + (o.dir > 0 ? u : 8 - u), z0 + v] : [x0 + v, z0 + (o.dir > 0 ? u : 8 - u)];
        const col = o.col, y0 = G + 1;
        for (let u = 0; u <= 8; u++) for (let v = 0; v <= 3; v++) {
          const [X, Z] = P(u, v), wheel = (u === 1 || u === 2 || u === 6 || u === 7) && (v === 0 || v === 3);
          t.set(X, y0, Z, wheel ? B.tire : (v === 0 || v === 3 ? 0 : col));
          if (wheel) continue;
          t.set(X, y0 + 1, Z, col);
          if (u >= 2 && u <= 6) { t.set(X, y0 + 2, Z, u === 4 && (v === 0 || v === 3) ? col : B.carGl); if (u >= 3 && u <= 5) t.set(X, y0 + 3, Z, col); }
        }
        for (const v of [0, 3]) { const [hx, hz] = P(8, v), [tx, tz] = P(0, v); t.set(hx, y0 + 1, hz, B.headL); t.set(tx, y0 + 1, tz, B.tailL); }
      };
      // 전시차: 덮개 씌운 차(부품 덮개), 은색 세단, 검은 세단(중이층 아래)
      const CVX = 44, CVZ = 34;
      car(w, CVX, CVZ, { axis: 'x', dir: 1, col: B.carW });
      const cover = w.prop({ name: 'cover', pivot: [CVX + 4.5, G + 3, CVZ + 2] });
      for (let X = CVX - 1; X <= CVX + 9; X++) for (let Z = CVZ - 1; Z <= CVZ + 4; Z++) {
        let top = G; for (let y = G + 1; y <= G + 5; y++) if (w.get(X, y, Z)) top = y;
        const edgeC = X === CVX - 1 || X === CVX + 9 || Z === CVZ - 1 || Z === CVZ + 4;
        if (edgeC) { const hNear = 2 + (X > CVX + 1 && X < CVX + 7 ? 1 : 0); for (let y = G + 1; y <= G + hNear; y++) if (!w.get(X, y, Z) && H2(X, y, Z) > 0.15) cover.set(X, y, Z, B.cover); continue; }
        cover.set(X, Math.max(top, G + 2) + 1, Z, B.cover);
        if (top < G + 2) cover.set(X, G + 2, Z, B.cover);
      }
      car(w, 64, 42, { axis: 'z', dir: 1, col: B.carS });
      car(w, 50, 18, { axis: 'x', dir: -1, col: B.carK });
      car(w, 64, 20, { axis: 'x', dir: 1, col: B.red });
      for (let z = CVZ - 2; z <= CVZ + 5; z++) for (let x = CVX - 2; x <= CVX + 10; x++) S(x, G, z, (x === CVX - 2 || x === CVX + 10 || z === CVZ - 2 || z === CVZ + 5) ? B.trim : B.concL);                                        // 전시대 모서리 받침
      // 광고판 「쉬운 교환」: 흰 판 + 빨간 오른쪽, 은색 차 그림, 아래 검은 LEXOS 줄
      const AX0 = 37, AZ = 27;
      w.box(AX0 + 1, G + 1, AZ, AX0 + 1, G + 2, AZ, B.iron); w.box(AX0 + 8, G + 1, AZ, AX0 + 8, G + 2, AZ, B.iron);
      for (let x = AX0; x <= AX0 + 9; x++) for (let y = G + 3; y <= G + 8; y++) {
        let b = x >= AX0 + 7 ? B.red : B.white;
        if (y === G + 3) b = B.black;
        if (y === G + 4 && x >= AX0 + 1 && x <= AX0 + 5 && x % 2) b = B.gray;
        if (y >= G + 5 && y <= G + 6 && x >= AX0 + 3 && x <= AX0 + 7) b = (y === G + 6 && (x === AX0 + 3 || x === AX0 + 7)) ? (x >= AX0 + 7 ? B.red : B.white) : B.carS;
        if (y === G + 8 && x >= AX0 + 1 && x <= AX0 + 4) b = B.black;
        S(x, y, AZ, b);
      }
      S(AX0 + 2, G + 3, AZ + 1, B.white); S(AX0 + 4, G + 3, AZ + 1, B.white); S(AX0 + 6, G + 3, AZ + 1, B.white);
      landmarks.push({ name: '전시차와 광고판', note: '덮개 씌운 차 · 「쉬운 교환」 LEXOS 광고', p: [CVX + 4, G + 14, CVZ + 2] });

      // 안내 데스크: 흰 곡선 판, 위에 검은 상판과 모니터
      for (let k = -6; k <= 6; k++) { const x = 54 + k, z = 50 - Math.round(Math.sqrt(36 - Math.min(36, k * k * 0.9)) * 0.6); w.box(x, G + 1, z, x, G + 2, z, B.white); S(x, G + 3, z, B.black); }
      S(53, G + 4, 48, B.screenOff); S(55, G + 4, 47, B.screenOff);
      // ── 카반의 자리: 가죽 소파 ㄱ자, 큰 안락의자, 낮은 탁자와 재떨이, 붉은 깔개, 텔레비전 ──
      for (let z = 62; z <= 74; z++) for (let x = 46; x <= 60; x++) S(x, G, z, B.rug);
      w.box(46, G + 1, 64, 47, G + 2, 72, B.sofa); w.box(46, G + 3, 64, 46, G + 3, 72, B.sofaD);
      w.box(48, G + 1, 72, 55, G + 2, 73, B.sofa); w.box(48, G + 3, 73, 55, G + 3, 73, B.sofaD);
      w.box(57, G + 1, 64, 59, G + 2, 66, B.sofa); w.box(59, G + 3, 64, 59, G + 4, 66, B.sofaD); S(57, G + 3, 64, B.sofaD); S(57, G + 3, 66, B.sofaD);
      w.box(51, G + 1, 66, 55, G + 1, 69, B.desk); S(53, G + 2, 67, B.gray); S(53, G + 3, 67, B.ember); S(52, G + 2, 68, B.crateL); S(54, G + 2, 68, B.black);
      w.box(52, G + 1, 60, 56, G + 1, 60, B.desk); w.box(52, G + 2, 60, 56, G + 4, 60, B.black);
      const tv = w.prop({ name: 'tv', pivot: [54, G + 3, 60.5], scl0: [0, 0, 0] }); tv.box(53, G + 2, 61, 55, G + 3, 61, B.screen);
      lights.push({ name: 'tv', p: [54.5, G + 3, 62], c: '#9ad8ff', i: 0, d: 12, flicker: 0, srcR: 3 });
      landmarks.push({ name: '카반의 소파', note: '가죽 소파 · 안락의자 · 재떨이', p: [52, G + 12, 68], boss: true });

      // ── PKM 거치대: 동쪽 유리 뒤 모래주머니 위, 대로를 겨눈다 ──
      const PX = X1 - 4, PZ = 62;
      w.box(PX - 1, G + 1, PZ - 3, PX + 1, G + 3, PZ + 3, B.sand);
      const pkm = w.prop({ name: 'pkm', pivot: [PX + 0.5, G + 4, PZ + 0.5] });
      pkm.box(PX - 1, G + 4, PZ, PX + 4, G + 4, PZ, B.gun); pkm.set(PX - 2, G + 4, PZ, B.gunG); pkm.set(PX, G + 5, PZ, B.gun); pkm.set(PX + 1, G + 4, PZ + 1, B.gunG);
      S(PX - 2, G + 1, PZ + 4, B.crate); S(PX - 2, G + 2, PZ + 4, B.crate);
      lights.push({ name: 'pkm', p: [PX + 3.5, G + 4, PZ + 0.5], c: '#ffc060', i: 0, d: 16, flicker: 0, srcR: 8 });
      S(PX - 3, G + 1, PZ - 4, B.lampY);

      // ── 잡동사니: 팔레트 위 상자, 파란·초록 통, 타이어, 모래주머니 얹은 탁자 ──
      const stack = (x, z, n) => { w.box(x, G + 1, z, x + 2, G + 1, z + 2, B.pallet); for (let k = 0; k < n; k++) w.box(x, G + 2 + k, z, x + 2, G + 2 + k, z + 2, k % 2 ? B.crateL : B.crate); };
      stack(28, 28, 3); stack(28, 46, 2); stack(70, 34, 2); stack(44, 70, 1); stack(56, 50, 1);
      for (const [x, z] of [[29, 36], [30, 37], [29, 38], [72, 52], [73, 53], [64, 75], [65, 75]]) { S(x, G + 1, z, w.pick([B.barrelB, B.barrelG])); S(x, G + 2, z, w.pick([B.barrelB, B.barrelG])); }
      for (const [x, z] of [[36, 52], [37, 53], [36, 54], [70, 74]]) { S(x, G + 1, z, B.tire); S(x, G + 2, z, B.tire); }
      for (const [x, z] of [[64, 30], [70, 26]]) { w.box(x, G + 1, z, x, G + 2, z, B.iron); w.box(x + 3, G + 1, z, x + 3, G + 2, z, B.iron); w.box(x, G + 3, z - 1, x + 3, G + 3, z + 1, B.desk); w.box(x, G + 4, z - 1, x + 3, G + 5, z, B.sand); }

      // ── 닫힌 구역: 남서 구석 철망 우리, 안에 로고 등(초록 통 위), 무기 상자. 문은 부품 ──
      const QX0 = 27, QX1 = 40, QZ0 = 62;
      for (let z = QZ0; z < Z1; z++) for (let x = QX0; x <= QX1; x++) {
        if (!(x === QX1 || z === QZ0)) continue;
        if (x === QX1 && z >= 68 && z <= 72) continue;
        for (let y = G + 1; y <= G + 7; y++) S(x, y, z, (x + z) % 4 === 0 ? B.iron : (y === G + 7 ? B.iron : ((x + y + z) % 2 ? B.mesh : 0)));
      }
      for (let y = G + 1; y <= G + 7; y++) S(QX1, y, Z1, B.iron);
      const gate = w.prop({ name: 'cage', pivot: [QX1 + 0.5, G + 4, 72.5] });
      for (let z = 68; z <= 72; z++) for (let y = G + 1; y <= G + 7; y++) gate.set(QX1, y, z, z === 68 || z === 72 || y === G + 1 || y === G + 7 ? B.iron : ((y + z) % 2 ? B.meshD : 0));
      gate.set(QX1, G + 4, 69, B.hazard);
      w.cyl(32, 71, G + 1, G + 3, 1.6, B.barrelG);
      const lb = w.prop({ name: 'logo', pivot: [32.5, G + 6, 71.5] });
      const LG = ['.###.', '#.#.#', '##.##', '#...#', '.###.'];
      LG.forEach((row, r) => { for (let c = 0; c < 5; c++) if (row[c] === '#') lb.set(30 + c, G + 8 - r, 71, B.logoG); });
      lights.push({ name: 'logo', p: [32.5, G + 6, 72.5], c: '#8aff9a', i: 0.25, d: 16, flicker: 0.05, srcR: 3 });
      stack(27, 63, 2); stack(36, 74, 1); w.box(27, G + 1, 75, 30, G + 2, 76, B.gunG);
      landmarks.push({ name: '닫힌 구역', note: '철망 우리 · 빛나는 로고 등', p: [33, G + 14, 70] });

      // ── 서쪽 벽: 마당으로 나가는 셔터(부품), 발전기 ──
      const SHZ0 = 36, SHZ1 = 43;
      w.box(X0, G + 1, SHZ0, X0, G + 8, SHZ1, 0); w.box(X0, G + 9, SHZ0 - 1, X0, G + 9, SHZ1 + 1, B.steel);
      for (const z of [SHZ0 - 1, SHZ1 + 1]) w.box(X0 + 1, G + 1, z, X0 + 1, G + 8, z, B.hazard);
      const shut = w.prop({ name: 'shutter', pivot: [X0 + 0.5, G + 9, (SHZ0 + SHZ1) / 2] });
      shut.box(X0, G + 1, SHZ0, X0, G + 8, SHZ1, B.shutter);
      for (let z = SHZ0; z <= SHZ1; z++) for (let x = 2; x < X0; x++) S(x, G, z, B.slab);
      w.box(4, G + 1, 30, 9, G + 5, 46, B.contB); w.walls(4, G + 5, 30, 9, G + 5, 46, B.iron); w.box(14, G + 1, 52, 20, G + 3, 53, B.sand);                                                                                    // 바깥 마당 컨테이너 끝
      lights.push({ name: 'yard', p: [X0 + 3, G + 5, 40], c: '#fff8e8', i: 0, d: 22, flicker: 0, srcR: 6 });
      S(X0 + 2, G + 8, 34, B.lampY);
      const GX = 28, GZ = 20;
      w.box(GX, G + 1, GZ, GX + 3, G + 3, GZ + 2, B.gen); w.box(GX + 1, G + 4, GZ + 1, GX + 1, G + 5, GZ + 1, B.iron); S(GX + 3, G + 3, GZ + 1, B.lampY);
      lights.push({ name: 'gen', p: [GX + 3.5, G + 4, GZ + 1.5], c: '#ffd080', i: 0.2, d: 10, flicker: 0.2, srcR: 3 });

      // ───── 상호작용 ─────
      acts.push({
        name: '발전기와 천장 조명', hint: '발전기가 털털거리며 돌아가고, 검은 타공 천장의 매립등이 하나둘 켜져요', hit: [GX, G + 1, GZ, GX + 3, G + 5, GZ + 2],
        run: async a => {
          for (let k = 0; k < 8; k++) { a.burst([GX + 1.5, G + 6, GZ + 1.5], { n: 6, colors: ['#5a5a5e', '#8a8a8e'], speed: 0.6, up: 1.5, life: 1.2, gravity: -0.4, spread: 0.4 }); a.flash('gen', 3, 0.15); await a.wait(0.18); }
          for (const [n, t] of [['ceilN', 0.1], ['ceilW', 0.15], ['ceilN', 0.08], ['ceilW', 0.3]]) { a.flash(n, 4, t); await a.wait(t + 0.12); }
          a.flash('ceilN', 3, 4); a.flash('ceilW', 3, 4); a.glow(1.4, 4);
          await a.wait(3.5);
        },
      });
      acts.push({
        name: '닫힌 구역 철망 문', hint: '철망 우리의 자물쇠가 풀리며 문이 활짝 열리고, 안쪽 로고 등이 초록빛으로 번쩍여요', hit: [QX1, G + 1, 68, QX1 + 1, G + 7, 72],
        run: async a => {
          a.burst([QX1 + 1, G + 4, 69.5], { n: 10, colors: ['#ffe080', '#ffffff'], speed: 2, up: 0.5, life: 0.4, gravity: 4, spread: 0.3 });
          await a.turn('cage', [0, 1.4, 0], 1.2);
          a.flash('logo', 7, 3); a.glow(1.3, 3);
          for (let k = 0; k < 5; k++) { a.burst([32.5, G + 7, 72], { n: 12, colors: ['#8aff9a', '#d8ffe0', '#ffffff'], speed: 1.4, up: 1, life: 1, gravity: -0.2, spread: 1 }); await a.wait(0.4); }
          await a.wait(1); await a.turn('cage', [0, 0, 0], 1.2);
        },
      });
      acts.push({
        name: '전시차 덮개', hint: '전시대 위 차를 덮은 방수포가 훌렁 걷히며 반짝이는 흰 세단이 드러나요', hit: [CVX - 1, G + 1, CVZ - 1, CVX + 9, G + 5, CVZ + 4],
        run: async a => {
          a.wind(1.5, 2);
          await a.tween('cover', { off: [2, 7, -1], rot: [0.3, 0, 0.25] }, 1.2);
          for (let k = 0; k < 4; k++) { a.burst([CVX + 1 + k * 2.4, G + 4, CVZ + 2], { n: 10, colors: ['#ffffff', '#e8f4ff'], speed: 1, up: 0.6, life: 0.6, gravity: 0, spread: 0.5 }); await a.wait(0.25); }
          await a.wait(2.4);
          await a.tween('cover', { off: [0, 0, 0], rot: [0, 0, 0] }, 1.4);
        },
      });
      acts.push({
        name: 'PKM 거치대', hint: '유리 뒤 모래주머니 위 PKM이 좌우로 돌며 대로 쪽으로 불을 뿜어요. 사수는 보이지 않아요', hit: [PX - 2, G + 1, PZ - 3, PX + 2, G + 5, PZ + 3],
        run: async a => {
          const fire = async th => { for (let k = 0; k < 7; k++) { a.burst([PX + 0.5 + Math.cos(th) * 4.6, G + 4.5, PZ + 0.5 - Math.sin(th) * 4.6], { n: 9, colors: ['#ffe080', '#ff9a3a', '#ffffff'], speed: 3, up: 0.4, life: 0.22, gravity: 0, spread: 0.3 }); a.burst([PX + 0.5, G + 4.5, PZ + 1.5], { n: 2, colors: ['#d8b048'], speed: 1.2, up: 2, life: 0.6, gravity: 9, spread: 0.2 }); a.flash('pkm', 5, 0.07); await a.wait(0.1); } };
          for (const th of [0.8, -0.8, 0]) { await a.turn('pkm', [0, th, 0], 0.6); await fire(th); await a.wait(0.25); }
          a.burst([X1 + 0.5, G + 3, PZ + 0.5], { n: 20, colors: ['#c8e0f0', '#ffffff'], speed: 3, up: 1, life: 0.8, gravity: 9, spread: 1 });
        },
      });
      acts.push({
        name: '사장실 컴퓨터', hint: '중이층 사장실 책상의 컴퓨터가 켜지고, 숨겨 둔 저장장치가 반짝여요', hit: [32, MY + 1, 5, 36, MY + 5, 7],
        run: async a => {
          await a.tween('pc', { scl: [1, 0.1, 1] }, 0.05);
          for (const t of [0.1, 0.2, 0.1]) { await a.tween('pc', { scl: [1, 1, 1] }, 0.05); a.flash('pc', 5, t); await a.wait(t); await a.tween('pc', { scl: [1, 0.1, 1] }, 0.05); await a.wait(0.15); }
          await a.tween('pc', { scl: [1, 1, 1] }, 0.1); a.flash('pc', 4, 3.5);
          await a.move('drive', [0, 3, 0], 0.8);
          for (let k = 0; k < 4; k++) { a.burst([36.5, MY + 6.2, 7.5], { n: 8, colors: ['#ffffff', '#7ad0ff', '#ffe080'], speed: 0.8, up: 0.8, life: 0.7, gravity: 0, spread: 0.2 }); await a.wait(0.6); }
          await a.move('drive', [0, 0, 0], 0.6);
        },
      });
      acts.push({
        name: '마당 셔터', hint: '서쪽 벽 셔터가 덜컹거리며 말려 올라가고 뒷마당 햇빛이 홀 안으로 쏟아져요', hit: [X0, G + 1, SHZ0, X0 + 1, G + 8, SHZ1],
        run: async a => {
          for (let k = 0; k < 3; k++) a.burst([X0 + 1, G + 8, SHZ0 + 1 + k * 3], { n: 6, colors: ['#ffffff', '#c8c8c8'], speed: 1.2, up: 1, life: 0.5, gravity: 6, spread: 0.6 });
          await a.tween('shutter', { scl: [1, 0.12, 1] }, 1.8);
          a.flash('yard', 5, 4); a.glow(1.4, 3);
          for (let k = 0; k < 6; k++) { a.burst([X0 + 3, G + 4, 40], { n: 12, colors: ['#fff8e0', '#d8d0bc'], speed: 0.8, up: 0.4, life: 2, gravity: -0.1, spread: 2 }); await a.wait(0.4); }
          await a.wait(1); await a.tween('shutter', { scl: [1, 1, 1] }, 1.4);
        },
      });
      acts.push({
        name: '카반의 소파', hint: '빈 안락의자 옆 재떨이의 시가 연기가 피어오르고, 텔레비전이 지지직 켜져요', hit: [46, G + 1, 60, 60, G + 4, 74],
        run: async a => {
          await a.tween('tv', { scl: [1, 1, 1] }, 0.1);
          for (let k = 0; k < 10; k++) {
            a.flash('tv', k % 2 ? 4 : 2, 0.2);
            a.burst([53.5, G + 4, 67.5], { n: 5, colors: ['#bcbcbc', '#e0e0e0', '#9a9a9a'], speed: 0.3, up: 1.2, life: 2.2, gravity: -0.3, spread: 0.3 });
            await a.wait(0.35);
          }
          await a.wait(1); await a.tween('tv', { scl: [0, 0, 0] }, 0.1);
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
