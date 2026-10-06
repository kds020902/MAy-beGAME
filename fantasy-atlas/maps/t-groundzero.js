// 그라운드 제로 — TerraGroup 본사 앞마당. 실제로는 서쪽 공원을 보는 입구를 남동 카메라 쪽(남)으로 90° 돌려 옮겼다:
// 북쪽에 물결 띠를 겹겹이 쌓은 TerraGroup 본관과 흰 격자 유리 캐노피·표지 기둥, 서쪽에 삼각 부조 외벽의 둥근 모서리 본사(주차장 입구),
// 가운데 생울타리 화단과 침엽수가 늘어선 광장, 남쪽 도로의 붉은 「КТО БУДЕТ」 노면 글씨, 남동쪽 경찰 저지선 (128칸). 이정표로 로비에 들어간다
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 128, D = 128, Hh = 96, PI = Math.PI;
  // 3×5 픽셀 글꼴(간판·노면 글씨용, 키릴 몇 자 포함)
  const FONT = {
    T: '111010010010010', E: '111100110100111', R: '110101110101101', A: '010101111101101', G: '011100101101011', O: '010101101101010',
    U: '101101101101111', P: '110101110100100', K: '101101110101101', I: '111010010010111', N: '110101101101101',
    'Б': '111100110101110', 'У': '101101011001110', 'Д': '011101101111101', 5: '111100111001110', 0: '111101101101111',
  };
  // 세로 면 글씨: (dx, dz) 쪽으로 진행
  const text = (t, s, x, y, z, dx, dz, b) => {
    let k = 0;
    for (const ch of s) {
      const g = FONT[ch];
      if (g) for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) if (g[r * 3 + c] === '1') t.set(x + dx * (k + c), y + 4 - r, z + dz * (k + c), b);
      k += 4;
    }
    return k - 1;
  };
  // 바닥 글씨: x쪽으로 진행, 글자 위쪽이 북(-z)
  const flat = (t, s, x, y, z, b) => {
    let k = 0;
    for (const ch of s) {
      const g = FONT[ch];
      if (g) for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) if (g[r * 3 + c] === '1') t.set(x + k + c, y, z + r, b);
      k += 4;
    }
  };
  MAPS.push({
    id: 'groundzero', cat: 'tarkov', name: '그라운드 제로', en: 'Ground Zero · TerraGroup HQ', color: '#5a8aa8', seed: 602, base: 12, time: 'day', size: [W, D, Hh],
    desc: '타르코프 업무 지구, 모든 일이 시작된 TerraGroup 본사 앞. 물결치는 흰 띠를 겹겹이 쌓은 본관은 지붕이 불타 연기를 뿜고, 그 앞 흰 격자 유리 캐노피 아래가 로비 입구다. 서쪽에는 삼각 부조 외벽의 둥근 모서리 본사와 주차장 입구, 남쪽 도로에는 붉은 「누가 다음인가」 노면 글씨와 경찰 저지선이 남았다.',
    info: { title: '구역 정보', en: 'TARKOV · TERRAGROUP HQ', rows: [['자리', '그라운드 제로 동쪽 · 테라그룹 본사 블록 정문'], ['명물', '물결 띠 본관 · 격자 유리 캐노피 · 삼각 부조 본사'], ['탈출', '경찰 저지선 V-Ex(5000루블)'], ['임무', '두더지 구하기 · 화염 고무 · 첫 줄에 서서'], ['안으로', '이정표를 누르면 로비로 들어가요']] },
    sky: ['#c4ccd2', '#6a7886', '#e2d8c4'], stars: false,
    hemi: ['#e2e6ea', '#3a3a38', 0.62], sun: ['#f0e8da', 0.66, [0.55, 1, 0.7]],
    night: { sky: ['#1e2228', '#07090c', '#4a3a30'], stars: false, hemi: ['#8a96a8', '#141414', 0.36], sun: ['#a8b4c8', 0.22, [0.55, 1, 0.7]], haze: '#22262a' },
    fog: { start: 0.93, floor: 6, depth: 6, haze: [26, 0.14, 12], hazeColor: '#aab0b4' },
    camY: -18, zoom: 1.15,
    particles: [
      { n: 90, colors: ['#9a9a98', '#c8c8c4', '#6a6a6a'], mode: 'drift', speed: 0.3, wind: 0.5, y0: 14, y1: 70, glow: false },
      { n: 70, colors: ['#3a3836', '#5a5654', '#2a2828'], mode: 'rise', speed: 0.45, size: 2, area: [62, 22, 3], y0: 50, y1: 92, glow: false },
      { n: 40, colors: ['#4a4644', '#6a6460'], mode: 'rise', speed: 0.4, size: 2, area: [100, 26, 2], y0: 48, y1: 90, glow: false },
      { n: 16, colors: ['#ff9a3a', '#ffd06a'], mode: 'rise', speed: 0.5, area: [62, 22, 2], y0: 48, y1: 58 },
    ],
    blocks: {
      soil: { c: '#4a4440', v: 0.06 }, concD: { c: '#55585a', v: 0.05, pat: 'big' }, conc: { c: '#8a8c8a', v: 0.05, pat: 'big' }, concL: { c: '#b2b2ac', v: 0.04 }, concW: { c: '#d6d4cc', v: 0.03 },
      slab: { c: '#e2e2dc', top: '#cfcfc8', v: 0.02 }, slabS: { c: '#bebeb8', v: 0.02 }, colD: { c: '#3a3c3e', v: 0.03 },
      asph: { c: '#3a3c3e', top: '#4a4d4f', v: 0.06, pat: 'stone' }, asphL: { c: '#4a4c4c', top: '#57595b', v: 0.06, pat: 'stone' }, puddle: { c: '#2a343c', top: '#3e5262', v: 0.02 },
      laneW: { c: '#cfd0c8', v: 0.04 }, laneY: { c: '#d0a830', v: 0.04 }, curb: { c: '#9a9a94', top: '#b0b0a8', v: 0.04 },
      walk: { c: '#86847e', top: '#9a978e', v: 0.05, pat: 'check', alt: '#8e8b84' }, plaza: { c: '#a09c92', top: '#b4b0a6', v: 0.04, pat: 'check', alt: '#aaa69c' }, plazaD: { c: '#6e6c68', top: '#7c7a74', v: 0.04 },
      grass: { c: '#4a5a32', top: '#5e7a3a', v: 0.1 }, hedge: { c: '#3a5028', top: '#4a6430', v: 0.1 }, fir: { c: '#2e4a2a', top: '#3a5a32', v: 0.1 }, fir2: { c: '#3a5a30', v: 0.1 }, leaf: { c: '#3e6a2e', top: '#5a8a3a', v: 0.1 }, bark: { c: '#4a3e34', v: 0.06 }, planter: { c: '#5a5c5e', top: '#6a6c6c', v: 0.03 },
      glass: { c: '#3e5666', v: 0.03 }, glassK: { c: '#22303a', v: 0.02 }, glassD: { c: '#9ec4d4', v: 0.02 }, mull: { c: '#a4aaae', v: 0.02 }, void: { c: '#15181b', v: 0.02 },
      winT: { c: '#ffd890', night: true, day: '#2e3e48' },
      tgFrame: { c: '#2a3034', v: 0.03 }, tgGroove: { c: '#6a7478', v: 0.03 }, tgPan: { c: '#959ea2', v: 0.03 }, tgTri: { c: '#bcc4c6', v: 0.03 }, tgText: { c: '#eef2f2', v: 0.02 },
      tgLogo: { c: '#e4f6ff', glow: true }, logoG: { c: '#7a8488', v: 0.02 }, lobbyL: { c: '#fff0d0', glow: true }, parkG: { c: '#2a7a4a', v: 0.03 },
      latt: { c: '#eceee8', v: 0.02 }, iron: { c: '#26282c', v: 0.03 }, steel: { c: '#7a8084', v: 0.04 }, rust: { c: '#7a4a2e', v: 0.08 }, burnt: { c: '#262322', v: 0.06 }, ember: { c: '#ff7a2a', glow: true }, fireY: { c: '#ffc04a', glow: true },
      carR: { c: '#6a2224', v: 0.03 }, carW: { c: '#d8d8d4', v: 0.03 }, carDk: { c: '#1e2022', v: 0.03 }, taxi: { c: '#e0b830', v: 0.03 }, polB: { c: '#2a5a9a', v: 0.03 },
      tire: { c: '#161618', v: 0.03 }, carGl: { c: '#5a7080', v: 0.02 }, headL: { c: '#f0ecd0', glow: true }, tailL: { c: '#b02a24', v: 0.02 },
      beaconR: { c: '#ff3030', glow: true }, beaconB: { c: '#3a7aff', glow: true }, jersey: { c: '#d0ccc0', v: 0.04 }, hazard: { c: '#e0b820', v: 0.03 }, hazRed: { c: '#c83a2a', v: 0.03 },
      cone: { c: '#e8682a', v: 0.03 }, sand: { c: '#8a7a58', v: 0.08 }, box: { c: '#a88a5a', v: 0.05 }, paper: { c: '#e4e0d4', v: 0.03 }, can: { c: '#8a3a2a', v: 0.05 }, trash: { c: '#1c1e22', v: 0.08 },
      paint: { c: '#c8302a', top: '#c8302a', v: 0.03 }, paintW: { c: '#ecebe4', top: '#ecebe4', v: 0.02 }, shutter: { c: '#6a6c6a', v: 0.03, pat: 'log' },
      // 이정표(OR.signpost)용: 쇠기둥, 초록 안내판, 흰 화살 끝, 가로등
      stoneG: { c: '#6a6c6c', v: 0.04 }, timber: { c: '#4a4e52', v: 0.03 }, door: { c: '#2a7a4a', v: 0.03 }, gold: { c: '#f2f4f0', v: 0.02 }, mlamp: { c: '#fff0c0', night: true, day: '#d8d4c4' },
    },
    build(w) {
      const B = w.id, G = w.base;
      MH.terrain(w, { floor: G - 4, height: () => G, surface: () => B.plaza, under: (x, z, y, dep) => dep < 2 ? B.concD : B.soil });
      const lights = [], acts = [], landmarks = [];
      const RZ0 = 104, RZ1 = 116;                        // 남쪽 도로(동서)
      const FX0 = 2, FX1 = 36, FZ0 = 6, FZ1 = 98, FR = 12; // 서쪽 삼각 부조 본사(남동 모서리 둥글게)
      const MCX = 83, MCZ = 18;                          // 북쪽 본관 중심
      const WX0 = 74, WX1 = 92;                          // 가운데 산책로
      const EX0 = 112, EX1 = 123;                        // 동쪽 도로(남북, 저지선)

      // ── 바닥: 광장 타일, 산책로, 도로와 보도, 남쪽 잔디띠 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        let b = B.plaza;
        if (z >= RZ0 && z <= RZ1) {
          b = hash3(x >> 2, 3, z >> 2) > 0.86 ? B.puddle : (hash3(x, 5, z) > 0.8 ? B.asphL : B.asph);
          if (z === 110 && x % 8 < 4) b = B.laneW;
        } else if (x >= EX0 && x <= EX1 && z >= 48 && z < RZ0) {
          b = hash3(x >> 2, 3, z >> 2) > 0.86 ? B.puddle : (hash3(x, 5, z) > 0.8 ? B.asphL : B.asph);
          if (x === 118 && z % 8 < 4) b = B.laneW;
        } else if ((x === EX0 - 1 || x === EX1 + 1) && z >= 48 && z < RZ0 - 1) b = B.curb;
        else if (x >= EX0 - 3 && z >= 48 && z < RZ0) b = B.walk;
        else if (z === RZ0 - 1 || z === RZ1 + 1) b = B.curb;
        else if (z >= 99 && z < RZ0 - 1) b = B.walk;
        else if (z > RZ1 + 1 && z <= 121) b = B.walk;
        else if (z > 121) b = hash3(x, 2, z) > 0.9 ? B.walk : B.grass;
        else if (x >= WX0 && x <= WX1) b = (x === WX0 || x === WX1) ? B.plazaD : B.concW;
        w.set(x, G, z, b);
      }
      // 노면 글씨: 붉은 띠에 흰 「КТО БУДЕТ」(조금 기울어진 띠)
      for (let x = 40; x <= 84; x++) { const zo = 106 + ((x - 40) / 15 | 0); for (let z = zo; z <= zo + 6; z++) w.set(x, G, z, B.paint); }
      for (const [s, x] of [['KTO', 43], ['БУДЕТ', 58]]) { const zo = 107 + ((x - 40) / 15 | 0); flat(w, s, x, G, zo, B.paintW); }
      for (let x = 78; x <= 84; x++) for (let z = 109; z <= 111; z++) if (hash3(x, 1, z) > 0.4) w.set(x, G, z, B.paintW);

      // ── 서쪽 본사: 삼각 부조 패널, 둥근 남동 모서리, 모서리를 감는 검은 유리 띠, 꼭대기 TERRAGROUP ──
      const GTOP = G + 30;
      const inF = (x, z) => {
        if (x < FX0 || x > FX1 || z < FZ0 || z > FZ1) return false;
        if (x > FX1 - FR && z > FZ1 - FR) return (x - (FX1 - FR)) ** 2 + (z - (FZ1 - FR)) ** 2 <= FR * FR;
        return true;
      };
      const facet = (u, y) => {
        const a = u % 6, c = (y - G - 1) % 6, ci = u / 6 | 0, cj = (y - G - 1) / 6 | 0, r = hash3(ci, cj, 11);
        if (a === 0 || c === 0) return B.tgGroove;
        const tri = r < 0.5 ? a > c : a + c < 5;
        return tri ? (hash3(ci, cj, 12) > 0.35 ? B.tgTri : B.tgPan) : B.tgPan;
      };
      const fFace = (u, y, band) => {
        if (y >= GTOP - 1) return B.tgFrame;
        if (y <= G + 6) return u % 7 === 0 ? B.colD : B.glassK;
        if (y === G + 7) return B.tgFrame;
        if (band && y >= G + 11 && y <= G + 22) return (u % 6 === 0 || y === G + 16 || y === G + 11 || y === G + 22) ? B.tgFrame : B.glassK;
        return facet(u, y);
      };
      for (let z = FZ0; z <= FZ1; z++) for (let x = FX0; x <= FX1; x++) {
        if (!inF(x, z)) continue;
        const sh = !inF(x + 1, z) || !inF(x, z + 1) || !inF(x - 1, z) || !inF(x, z - 1);
        const corner = x > FX1 - FR && z > FZ1 - FR;
        for (let y = G + 1; y <= GTOP; y++) {
          if (!sh) { if (y === GTOP) w.set(x, y, z, B.concD); continue; }
          let b;
          if (corner) b = fFace(Math.round(Math.atan2(z - (FZ1 - FR), x - (FX1 - FR)) * FR), y, true);
          else if (!inF(x + 1, z)) b = fFace(z, y, z >= 60);
          else if (!inF(x, z + 1)) b = fFace(x, y, x >= 10);
          else b = fFace(x + z, y, false);
          w.set(x, y, z, b);
        }
        if (sh) w.set(x, GTOP + 1, z, B.tgFrame);
      }
      // 옥상 설비
      w.box(8, GTOP + 1, 20, 18, GTOP + 4, 34, B.steel); w.box(10, GTOP + 1, 50, 16, GTOP + 3, 62, B.concL);
      // 간판: 동쪽 벽 꼭대기 띠에 다이아몬드 로고 + TERRAGROUP(부품: 불이 들어오는 판)
      w.box(FX1, G + 24, 24, FX1, G + 29, 78, B.tgFrame);
      const logo = (t, cx, cy, cz, R, axis, bOn, bLine) => {
        for (let dy = -R; dy <= R; dy++) for (let du = -R; du <= R; du++) {
          const d = Math.abs(du) + Math.abs(dy); if (d > R) continue;
          const line = d < R && ((du === 0 && dy > 0) || (dy === 0 && du < 0) || (du === dy && du > 0));
          if (axis === 'z') t.set(cx, cy + dy, cz + du, line ? bLine : bOn); else t.set(cx + du, cy + dy, cz, line ? bLine : bOn);
        }
      };
      const sign = w.prop({ name: 'tgsign', pivot: [FX1 + 1.5, G + 27, 50] });
      logo(sign, FX1 + 1, G + 27, 74, 3, 'z', B.tgLogo, B.tgFrame);
      text(sign, 'TERRAGROUP', FX1 + 1, G + 25, 68, 0, -1, B.tgLogo);
      lights.push({ name: 'tgsign', p: [FX1 + 2.5, G + 27, 60], c: '#c8ecff', i: 0.2, d: 34, flicker: 0.05, srcR: 6 });
      landmarks.push({ name: 'TerraGroup 본사', note: '삼각 부조 외벽 · 둥근 모서리 · 주차장 입구', p: [20, GTOP + 10, 60], boss: true });
      // 주차장 입구(남쪽 벽): 어두운 아가리, 셔터(부품), 위에 PARKING 판
      const PX0 = 8, PX1 = 18;
      w.box(PX0, G + 1, FZ1 - 3, PX1, G + 6, FZ1 - 1, B.void); w.box(PX0, G + 1, FZ1, PX1, G + 6, FZ1, 0); w.box(PX0, G, FZ1 - 3, PX1, G, FZ1 + 4, B.plazaD);
      w.box(PX0 - 1, G + 1, FZ1, PX0 - 1, G + 7, FZ1, B.concL); w.box(PX1 + 1, G + 1, FZ1, PX1 + 1, G + 7, FZ1, B.concL); w.box(PX0 - 1, G + 7, FZ1, PX1 + 1, G + 7, FZ1, B.concL);
      w.box(PX0 - 2, G + 8, FZ1 + 1, PX1 + 10, G + 10, FZ1 + 1, B.tgFrame); text(w, 'PARKING', PX0 - 1, G + 7, FZ1 + 2, 1, 0, B.tgText);
      w.box(PX1 + 6, G + 8, FZ1 + 2, PX1 + 8, G + 10, FZ1 + 2, B.parkG);
      const shut = w.prop({ name: 'gshut', pivot: [(PX0 + PX1) / 2 + 0.5, G + 7, FZ1 + 0.5] });
      for (let x = PX0; x <= PX1; x++) for (let y = G + 1; y <= G + 6; y++) shut.set(x, y, FZ1, (y - G) % 2 ? B.shutter : B.steel);
      w.box(PX0 + 2, G + 2, FZ1 - 3, PX0 + 2, G + 2, FZ1 - 3, B.lobbyL); w.box(PX1 - 2, G + 2, FZ1 - 3, PX1 - 2, G + 2, FZ1 - 3, B.lobbyL);
      lights.push({ name: 'garage', p: [(PX0 + PX1) / 2, G + 3, FZ1 - 1], c: '#ffe0a0', i: 0.05, d: 16, flicker: 0.2, srcR: 3 });
      acts.push({
        name: '주차장 셔터', hint: 'TerraGroup 본사 주차장 입구 셔터가 덜컹거리며 말려 올라가고 어두운 경사로에 불이 들어와요', hit: [PX0, G + 1, FZ1, PX1, G + 7, FZ1 + 1],
        run: async a => {
          for (let k = 1; k <= 3; k++) { await a.tween('gshut', { scl: [1, 1 - k * 0.12, 1] }, 0.3); a.burst([(PX0 + PX1) / 2 + 0.5, G + 7, FZ1 + 1.5], { n: 10, colors: ['#9a9a98', '#c8c8c4'], speed: 2, up: 0, life: 0.7, gravity: 3, spread: 4 }); await a.wait(0.15); }
          await a.tween('gshut', { scl: [1, 0.12, 1] }, 0.9);
          a.flash('garage', 30, 3.5);
          await a.wait(3);
          await a.tween('gshut', { scl: [1, 1, 1] }, 1.2);
        },
      });
      acts.push({
        name: 'TERRAGROUP 간판', hint: '본사 꼭대기 다이아몬드 로고와 TERRAGROUP 글자에 하얗게 불이 들어와요', hit: [FX1, G + 24, 40, FX1 + 1, G + 30, 78],
        run: async a => {
          a.flash('tgsign', 12, 4.5); a.glow(1.8, 4.5);
          const o = { n: 10, colors: ['#e4f6ff', '#ffffff', '#8ad0ff'], speed: 1, up: 0.8, life: 0.9, gravity: 0, spread: 0.8 };
          for (let z = 74; z >= 30; z -= 4) { a.burst([FX1 + 2.5, G + 27.5, z + 0.5], o); await a.wait(0.12); }
          a.burst([FX1 + 2, G + 27.5, 74.5], { n: 50, colors: ['#e4f6ff', '#ffffff', '#8ad0ff'], speed: 5, up: 1, life: 1.2, gravity: 0, spread: 1 });
          await a.wait(1.5);
        },
      });

      // ── 북쪽 본관: 층마다 물결치며 튀어나온 흰 띠(바닥판), 그 안으로 들어간 검은 유리, 위로 갈수록 물러나는 계단꼴 ──
      const NF = 8, FH = 4, Y0 = G + 6;                                    // 1층(로비)은 G+1~G+5, 띠는 Y0 + k*FH
      const RX = k => 45 - k * 0.9, RZ = k => 24 - k * 1.1;
      const plan = (x, z, k, e) => { const dx = (x - MCX) / (RX(k) + e), dz = (z - MCZ) / (RZ(k) + e); return dx * dx * dx * dx + dz * dz <= 1; };
      const wave = (x, k) => 1.4 + Math.sin(x * 0.11 + k * 1.1) * 1.5 + Math.sin(x * 0.045 - k * 0.7) * 0.9;
      const MTOP = Y0 + NF * FH;
      for (let k = 0; k <= NF; k++) {
        const ys = Y0 + k * FH, last = k === NF;
        for (let z = 0; z < 60; z++) for (let x = 36; x < W; x++) {
          // 바닥판(띠): 바깥 가장자리만 흰색, 속은 어둡게(보이지 않음)
          if (plan(x, z, k, wave(x, k))) {
            const edge = !plan(x, z + 1, k, wave(x, k)) || !plan(x + 1, z, k, wave(x + 1, k)) || !plan(x - 1, z, k, wave(x - 1, k));
            w.set(x, ys, z, last ? (edge ? B.slab : B.concL) : (edge ? B.slab : B.slabS));
            if (!last && edge) w.set(x, ys - 1, z, B.slabS);
          }
          if (last) continue;
          // 층 사이 유리벽(한 칸 껍데기)
          if (plan(x, z, k, -0.5) && !plan(x, z + 1, k, -0.5) || plan(x, z, k, -0.5) && (!plan(x + 1, z, k, -0.5) || !plan(x - 1, z, k, -0.5))) {
            for (let y = ys + 1; y < ys + FH - 1; y++) {
              const r = hash3(x >> 2, y, k);
              w.set(x, y, z, x % 4 === 0 ? B.colD : r > 0.9 ? B.winT : r < 0.06 ? B.void : B.glassK);
            }
          }
        }
      }
      // 1층(로비층): 안으로 물러난 유리벽, 흰 머리·검은 발의 네모 기둥, 가운데 정문
      for (let z = 0; z < 60; z++) for (let x = 36; x < W; x++) {
        if (!plan(x, z, 0, -3) || (plan(x, z + 1, 0, -3) && plan(x + 1, z, 0, -3) && plan(x - 1, z, 0, -3))) continue;
        for (let y = G + 1; y <= G + 4; y++) w.set(x, y, z, Math.abs(x - MCX) <= 5 ? (y === G + 4 ? B.tgFrame : 0) : (x % 5 === 0 ? B.colD : B.glassK));
      }
      for (let x = 44; x <= 122; x += 10) { let z = 59; while (z > 0 && !plan(x, z, 0, -0.5)) z--; if (z <= 0) continue; w.box(x - 1, G + 1, z - 1, x, G + 2, z, B.colD); w.box(x - 1, G + 3, z - 1, x, G + 5, z, B.slab); }
      // 정문 안쪽: 로비 불빛과 다이아몬드 로고
      { let z = 59; while (z > 0 && !plan(MCX, z, 0, -3)) z--; w.box(MCX - 4, G + 1, z - 5, MCX + 4, G + 4, z, 0); w.box(MCX - 4, G + 1, z - 6, MCX + 4, G + 4, z - 6, B.tgFrame); logo(w, MCX, G + 3, z - 6, 1, 'x', B.lobbyL, B.tgFrame); for (const dx of [-3, 3]) w.set(MCX + dx, G + 4, z - 3, B.lobbyL); }
      lights.push({ name: 'lobby', p: [MCX + 0.5, G + 3, 38], c: '#ffe8c0', i: 0.35, d: 18, flicker: 0.1, srcR: 3 });
      // 지붕: 불탄 구멍, 무너진 띠, 불씨(옥상 화재)
      const roofP = [[60, 14], [66, 22], [100, 20]];
      for (const [cx, cz] of roofP) for (let dz = -7; dz <= 7; dz++) for (let dx = -9; dx <= 9; dx++) {
        const x = cx + dx, z = cz + dz, d = (dx * dx) / 64 + (dz * dz) / 36 + (w.noise.fbm(x * 0.3, z * 0.3, 2) - 0.5) * 0.9;
        if (d > 1 || !w.get(x, MTOP, z)) continue;
        if (d < 0.45) { w.set(x, MTOP, z, 0); w.set(x, MTOP - FH, z, hash3(x, 2, z) > 0.4 ? B.burnt : B.rust); if (hash3(x, 9, z) > 0.8) w.box(x, MTOP - FH + 1, z, x, MTOP - FH + 2, z, B.burnt); }
        else w.set(x, MTOP, z, hash3(x, 4, z) > 0.45 ? B.burnt : (hash3(x, 5, z) > 0.5 ? B.rust : B.concD));
      }
      for (const [x, z, l] of [[55, 10, 5], [70, 26, 4], [96, 16, 5]]) w.line(x, MTOP - 2, z, x + l, MTOP + 3, z + 1, B.burnt);
      for (const [x, z] of [[60, 14], [61, 15], [59, 13], [66, 22], [67, 21], [100, 20]]) w.set(x, MTOP - FH + 1, z, B.ember);
      w.box(MCX - 6, MTOP + 1, 6, MCX + 2, MTOP + 3, 14, B.steel); w.box(110, MTOP + 1, 10, 114, MTOP + 2, 16, B.concL);
      lights.push({ name: 'roof', p: [60.5, MTOP - FH + 2, 14.5], c: '#ff8a3a', i: 0.6, d: 30, flicker: 0.6, srcR: 4 });
      // 떨어질 띠 조각(부품): 남쪽 끝에 매달린 부서진 바닥판
      const deb = w.prop({ name: 'debris', pivot: [64, MTOP - 1, 40] });
      for (let x = 60; x <= 68; x++) for (let z = 0; z < 60; z++) { const ys = MTOP - FH, wv = wave(x, NF - 1); if (!plan(x, z, NF - 1, wv) || plan(x, z + 3, NF - 1, wv)) continue; for (const y of [ys, ys - 1]) if (w.get(x, y, z)) { deb.set(x, y, z, hash3(x, 3, z) > 0.3 ? w.get(x, y, z) : B.burnt); w.set(x, y, z, 0); } }
      landmarks.push({ name: 'TerraGroup 본관', note: '물결 띠를 쌓은 건물 · 불타는 지붕', p: [MCX, MTOP + 10, 20], boss: true });
      acts.push({
        name: '옥상 화재', hint: '본관 지붕에서 불길이 확 치솟고 불탄 바닥판 조각이 광장 쪽으로 떨어져요', hit: [56, MTOP - 6, 8, 72, MTOP + 2, 42],
        run: async a => {
          a.flash('roof', 6, 4); a.lightning(0.3);
          for (const [cx, cz] of roofP) a.burst([cx + 0.5, MTOP + 1, cz + 0.5], { n: 50, colors: ['#ffd06a', '#ff8a2a', '#ff4a1a', '#fff0c0'], speed: 5, up: 8, life: 1.3, gravity: 3, spread: 3 });
          a.burst([62, MTOP + 2, 18], { n: 50, colors: ['#3a3836', '#5a5654', '#7a7470'], speed: 2, up: 7, life: 3, gravity: -1, spread: 4 });
          await a.tween('debris', { off: [0, -2, 2], rot: [0.4, 0, 0.1] }, 0.6);
          await a.tween('debris', { off: [1, -(MTOP - FH - G - 1), 10], rot: [1.2, 0.3, 0.4] }, 1, t => t * t);
          a.burst([65, G + 2, 52], { n: 60, colors: ['#c8c8c4', '#9a9a98', '#e2e2dc'], speed: 6, up: 3, life: 1.2, gravity: 6, spread: 3, flat: true });
          await a.wait(1.5);
          await a.respawn('debris', 1.0);
        },
      });

      // ── 정문 캐노피: 흰 삼각 격자에 유리, 가는 흰 기둥, 정문 앞 넓은 계단 ──
      const CX0 = 68, CX1 = 98, CZ0 = 40, CZ1 = 58, CY = G + 9;
      for (let z = CZ0; z <= CZ1; z++) for (let x = CX0; x <= CX1; x++) {
        const e = ((x - 83) / 15.5) ** 2 + ((z - 47) / 11.5) ** 2; if (e > 1) continue;
        if (plan(x, z, 0, wave(x, 0) + 0.5)) continue;
        const y = CY + (e < 0.5 ? 1 : 0);
        w.set(x, y, z, (e > 0.86 || (x + z) % 4 === 0 || (x - z + 200) % 4 === 0 || z % 4 === 0) ? B.latt : B.glassD);
      }
      for (const [x, z] of [[71, 50], [95, 50], [76, 56], [90, 56], [83, 57]]) w.box(x, G + 1, z, x, CY - 1, z, B.latt);
      for (let s = 0; s < 3; s++) w.box(WX0 + 2, G + 1, 50 + s, WX1 - 2, G + 3 - s, 50 + s, B.concL);
      w.box(WX0 + 2, G + 1, 40, WX1 - 2, G + 3, 49, B.concW);
      w.box(WX0 + 2, G + 4, 46, WX0 + 2, G + 4, 52, B.iron); w.box(WX1 - 2, G + 4, 46, WX1 - 2, G + 4, 52, B.iron);
      landmarks.push({ name: '격자 유리 캐노피', note: '본관 로비 정문 · 이정표로 들어가요', p: [83, CY + 6, 50] });

      // ── 표지 기둥: 흰 받침 위 흰 판, 회색 다이아몬드 로고(부품: 점등) ──
      const PYX = 83, PYZ = 64;
      w.box(PYX - 6, G + 1, PYZ - 1, PYX + 6, G + 2, PYZ + 1, B.colD);
      w.box(PYX - 5, G + 3, PYZ - 1, PYX + 5, G + 12, PYZ + 1, B.concW);
      logo(w, PYX, G + 8, PYZ + 2, 3, 'x', B.logoG, B.concW);
      for (let x = PYX - 4; x <= PYX + 4; x++) if (x % 2) w.set(x, G + 4, PYZ + 2, B.logoG);
      const pyl = w.prop({ name: 'pylon', pivot: [PYX + 0.5, G + 8, PYZ + 3], scl0: [0, 0, 0] });
      logo(pyl, PYX, G + 8, PYZ + 3, 3, 'x', B.tgLogo, B.tgFrame);
      lights.push({ name: 'pylon', p: [PYX + 0.5, G + 8, PYZ + 4], c: '#d8f0ff', i: 0.05, d: 22, flicker: 0.05, srcR: 3 });
      landmarks.push({ name: 'TERRAGROUP 표지 기둥', note: '정문 앞 흰 기둥 · 다이아몬드 로고', p: [PYX, G + 18, PYZ] });
      acts.push({
        name: '표지 기둥 로고', hint: '정문 앞 흰 표지 기둥의 다이아몬드 로고에 파랗게 불이 들어와 깜빡여요', hit: [PYX - 5, G + 3, PYZ - 1, PYX + 5, G + 12, PYZ + 2],
        run: async a => {
          for (let k = 0; k < 4; k++) { await a.tween('pylon', { scl: [1, 1, 1] }, 0.08); a.flash('pylon', 40, 0.2); await a.wait(0.2); await a.tween('pylon', { scl: [0, 0, 0] }, 0.05); await a.wait(0.15); }
          await a.tween('pylon', { scl: [1, 1, 1] }, 0.2); a.flash('pylon', 40, 3); a.glow(1.6, 3);
          a.burst([PYX + 0.5, G + 8, PYZ + 3.5], { n: 40, colors: ['#e4f6ff', '#ffffff', '#8ad0ff'], speed: 4, up: 1, life: 1.2, gravity: 0, spread: 1 });
          await a.wait(3);
          await a.tween('pylon', { scl: [0, 0, 0] }, 0.3);
        },
      });

      // ── 광장 화단: 생울타리를 두른 회색 화단에 침엽수, 검은 철책 ──
      const fir = (x, z, h) => { const y = G + 3; w.box(x, y, z, x, y + 1, z, B.bark); for (let k = 0; k < h; k++) { const r = Math.max(0.6, 2.3 - k * 0.32); w.cyl(x, z, y + 1 + k, y + 1 + k, r, k % 2 ? B.fir2 : B.fir); } w.set(x, y + 1 + h, z, B.fir); };
      const bed = (x0, z0, x1, z1, firs) => {
        w.walls(x0, G + 1, z0, x1, G + 1, z1, B.planter); w.box(x0 + 1, G + 1, z0 + 1, x1 - 1, G + 1, z1 - 1, B.soil);
        w.walls(x0 + 1, G + 2, z0 + 1, x1 - 1, G + 2, z1 - 1, B.hedge);
        for (const [x, z, h] of firs) fir(x, z, h);
      };
      bed(40, 62, 70, 70, [[44, 66, 8], [50, 66, 10], [56, 66, 8], [62, 66, 10], [67, 66, 7]]);
      bed(96, 62, 106, 70, [[99, 66, 9], [104, 66, 8]]);
      bed(40, 78, 64, 88, [[46, 83, 9], [54, 83, 7], [60, 83, 10]]);
      bed(94, 78, 106, 88, [[98, 83, 8], [103, 83, 10]]);
      bed(100, 42, 106, 50, [[103, 46, 7]]);
      for (let x = 38; x < 108; x++) { if (x >= WX0 && x <= WX1) continue; w.set(x, G + 1, 97, x % 3 === 0 ? B.iron : 0); w.set(x, G + 2, 97, B.iron); }
      // 광장 잡동사니: 깡통·종이·상자
      for (let i = 0; i < 70; i++) { const x = w.ri(38, 127), z = w.ri(54, 120); if (!w.get(x, G + 1, z) && w.get(x, G, z) !== B.grass) w.set(x, G + 1, z, w.pick([B.can, B.paper, B.paper, B.trash, B.can])); }
      for (const [x, z] of [[78, 92], [80, 93]]) w.box(x, G + 1, z, x + 1, G + 2, z + 1, B.box);

      // ── 차 만들기 ──
      const car = (t, x, z, ax, col, o) => {
        o = o || {};
        const L = o.L || 9, Wd = 4, bt = o.burnt, hi = o.suv ? 1 : 0;
        const P = (l, c, y, b) => { const ll = o.flip ? L - 1 - l : l; if (ax === 'x') t.set(x + ll, y, z + c, b); else t.set(x + c, y, z + ll, b); };
        for (let l = 0; l < L; l++) for (let c = 0; c < Wd; c++) {
          const wheel = (l === 1 || l === 2 || l === L - 2 || l === L - 3) && (c === 0 || c === Wd - 1), side = c === 0 || c === Wd - 1;
          P(l, c, G + 1, wheel ? B.tire : B.carDk);
          let b = bt ? (hash3(x + l, 7, z + c) > 0.55 ? B.rust : B.burnt) : col;
          if (!bt && side && l === 0) b = o.lamp || B.tailL; else if (!bt && side && l === L - 1) b = B.tailL;
          if (o.stripe && l >= 2 && l <= L - 2 && side) b = o.stripe;
          P(l, c, G + 2, b);
          if (hi) P(l, c, G + 3, bt ? B.burnt : (l >= 1 && l <= L - 2 && side && l % 3 === 0 ? B.carGl : col));
          if (l >= 2 && l <= L - (hi ? 1 : 2)) P(l, c, G + 3 + hi, bt ? (hash3(l, c, z) > 0.6 ? B.rust : B.void) : (side || l === 2 || l === L - (hi ? 1 : 2) ? B.carGl : col));
          if (l >= 3 && l <= L - (hi ? 1 : 3)) P(l, c, G + 4 + hi, bt ? B.burnt : col);
        }
      };

      // ── 남쪽 도로: 노란 택시(경보), 붉은 SUV, 붉은·흰 방호벽, 볼라드 ──
      car(w, 40, 100, 'x', B.taxi, { lamp: B.headL });
      const trunk = w.prop({ name: 'trunk', pivot: [47, G + 4, 100] });
      trunk.box(47, G + 4, 100, 48, G + 4, 103, B.taxi);
      lights.push({ name: 'taxi', p: [40, G + 2.5, 101.5], c: '#fff0c0', i: 0.05, d: 16, flicker: 0.1, srcR: 2 });
      acts.push({
        name: '노란 택시 경보', hint: '트렁크가 열린 노란 택시의 경보가 울리며 전조등이 번쩍이고 트렁크 문이 덜컹거려요', hit: [40, G + 1, 100, 48, G + 5, 103],
        run: async a => {
          for (let k = 0; k < 8; k++) {
            a.flash('taxi', 30, 0.25);
            a.burst([39.5, G + 2.5, 101.5 + (k % 2) * 1.5], { n: 10, colors: ['#fff6d0', '#ffffff'], speed: 4, up: 0.2, life: 0.35, gravity: 0, spread: 0.4, flat: true });
            await a.turn('trunk', [0, 0, k % 2 ? 0.9 : 1.4], 0.2); await a.wait(0.15);
          }
          await a.turn('trunk', [0, 0, 0], 0.4);
        },
      });
      car(w, 81, 88, 'z', B.carR, { suv: true, flip: true });
      w.box(79, G + 2, 92, 80, G + 4, 92, B.carR);                                 // 열린 운전석 문
      car(w, 96, 112, 'x', B.carW, { flip: true }); car(w, 22, 108, 'x', B.burnt, { burnt: true });
      const jersey = (x0, z0, x1, z1) => { for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) { w.set(x, G + 1, z, B.jersey); w.set(x, G + 2, z, ((x + z) >> 1) % 2 ? B.hazRed : B.concW); } };
      jersey(52, 101, 57, 101); jersey(66, 101, 70, 101); jersey(56, 114, 61, 114); jersey(4, 106, 4, 112);
      for (let x = 52; x < 96; x += 5) if (x < WX0 - 1 || x > WX1 + 1) { w.box(x, G + 1, 102, x, G + 2, 102, B.iron); w.set(x, G + 3, 102, B.hazard); }
      for (let x = 6; x < W; x += 16) { w.box(x, G + 1, 119, x, G + 9, 119, B.timber); w.box(x, G + 9, 118, x, G + 9, 117, B.timber); w.set(x, G + 9, 116, B.mlamp); }

      // ── 동쪽 도로 경찰 저지선 V-Ex: 차단봉(부품), 경찰차(부품), 고깔, 방호벽, 모래주머니, 5000 표지 ──
      const BGZ = 84;
      w.box(EX1 + 1, G + 1, BGZ, EX1 + 1, G + 3, BGZ, B.hazard); w.box(EX1, G + 1, BGZ - 1, EX1 + 2, G + 1, BGZ + 1, B.concL);
      const boom = w.prop({ name: 'boom', pivot: [EX1 + 1.5, G + 3.5, BGZ + 0.5] });
      for (let x = EX0; x <= EX1; x++) boom.set(x, G + 3, BGZ, (x >> 1) % 2 ? B.hazRed : B.concW);
      const pol = w.prop({ name: 'police', pivot: [119, G + 1, 92] });
      car(pol, 117, 88, 'z', B.carW, { stripe: B.polB, lamp: B.headL, flip: true });
      pol.set(118, G + 5, 92, B.beaconB); pol.set(119, G + 5, 92, B.beaconR);
      lights.push({ name: 'police', p: [118.5, G + 6, 92.5], c: '#4a7aff', i: 0.3, d: 22, flicker: 0.3, srcR: 3 });
      for (const [x, z] of [[113, 86], [115, 87], [122, 87], [113, 98], [121, 100], [110, 102]]) { w.set(x, G + 1, z, B.cone); w.set(x, G + 2, z, B.concW); }
      jersey(EX0, BGZ - 2, EX0 + 3, BGZ - 2); jersey(EX0, 50, EX1, 50);
      for (let z = 86; z <= 96; z++) for (let x = 125; x <= 127; x++) if (x === 125 || z === 86 || z === 96) w.box(x, G + 1, z, x, G + 2, z, B.sand);
      w.box(126, G + 3, 98, 126, G + 6, 98, B.steel); w.box(125, G + 7, 98, 127, G + 8, 98, B.polB); w.box(125, G + 9, 98, 127, G + 9, 98, B.concW);   // 작은 경찰 표지판
      landmarks.push({ name: '경찰 저지선', note: '유료 탈출구 V-Ex · 5000루블', p: [118, G + 14, 90], tag: 'EXFIL' });
      acts.push({
        name: '경찰 저지선 V-Ex', hint: '5000루블을 내면 차단봉이 올라가고 경광등을 켠 경찰차가 북쪽 도로로 빠져나가요', hit: [EX0, G + 1, BGZ, EX1, G + 6, 97],
        run: async a => {
          a.flash('police', 8, 7);
          for (let k = 0; k < 4; k++) { a.burst([118.5 + (k % 2), G + 6, 92.5], { n: 14, colors: k % 2 ? ['#ff3030', '#ff9a9a'] : ['#3a7aff', '#9ac0ff'], speed: 4, up: 0.4, life: 0.5, gravity: 0, spread: 0.5, flat: true }); await a.wait(0.3); }
          await a.turn('boom', [0, 0, -1.4], 1);
          await a.path('police', [[0, 0, -6, 0], [-1, 0, -20, 0], [-1, 0, -36, 0]], 3);
          a.burst([118, G + 2, 54], { n: 20, colors: ['#9a9a98', '#c8c8c4'], speed: 2, up: 1, life: 1, gravity: 0, spread: 3 });
          await Promise.all([a.respawn('police', 1.0), a.turn('boom', [0, 0, 0], 1)]);
        },
      });
      // 불타는 차(저지선 안쪽 도로)
      const FXc = 113, FZc = 70;
      car(w, FXc, FZc, 'x', B.burnt, { burnt: true });
      for (const [dx, dz] of [[3, 1], [5, 2], [4, 1], [6, 2]]) w.set(FXc + dx, G + 3, FZc + dz, B.ember);
      w.set(FXc + 4, G + 4, FZc + 1, B.fireY);
      lights.push({ name: 'fire', p: [FXc + 4.5, G + 5, FZc + 2], c: '#ff8a3a', i: 0.5, d: 20, flicker: 0.6, srcR: 3 });
      const hood = w.prop({ name: 'hood', pivot: [FXc + 1, G + 3, FZc + 2] });
      hood.box(FXc, G + 3, FZc, FXc + 1, G + 3, FZc + 3, B.rust);
      acts.push({
        name: '차량 화재', hint: '저지선 너머에서 불타던 차가 펑 터지며 보닛이 튀어 오르고 불길과 검은 연기가 치솟아요', hit: [FXc, G + 1, FZc, FXc + 8, G + 5, FZc + 3],
        run: async a => {
          a.flash('fire', 8, 3); a.lightning(0.35);
          a.burst([FXc + 4, G + 3, FZc + 2], { n: 90, colors: ['#ffd06a', '#ff8a2a', '#ff4a1a', '#ffffff'], speed: 9, up: 7, life: 1, gravity: 6, spread: 2 });
          a.burst([FXc + 4, G + 3, FZc + 2], { n: 40, colors: ['#3a3836', '#5a5654', '#7a7470'], speed: 3, up: 6, life: 2.4, gravity: -1, spread: 2 });
          await a.tween('hood', { off: [-2, 9, 1], rot: [0, 0.8, 2.6] }, 0.6, t => 1 - (1 - t) * (1 - t));
          await a.tween('hood', { off: [-4, 0, 3], rot: [0, 1.4, 3.1] }, 0.6, t => t * t);
          for (let k = 0; k < 6; k++) { a.burst([FXc + 4, G + 4, FZc + 2], { n: 26, colors: ['#ffd06a', '#ff8a2a', '#ff4a1a'], speed: 2, up: 5, life: 0.9, gravity: -1, spread: 1.5 }); await a.wait(0.35); }
          await a.wait(0.8);
          await a.respawn('hood', 1.0);
        },
      });

      // ── 이정표: 캐노피 옆 광장, 로비로 들어가기 ──
      const sp = OR.signpost(w, B, 100, 56, { dir: [-1, 0], boards: 1, h: 6 });
      acts.push(OR.goAct({ at: sp, name: '로비로 들어가기', goto: 'groundzero-in', hint: '격자 캐노피 아래 정문으로 TerraGroup 본관 로비에 들어가요. 보안 게이트와 접수대, 무너진 아트리움이 있어요' }));
      return { lights, landmarks, acts };
    },
  });
})();
