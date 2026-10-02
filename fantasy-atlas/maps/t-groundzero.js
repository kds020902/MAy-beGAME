// 그라운드 제로 — TerraGroup 본사: 곡면 유리 타워와 삼각 패널 본관, 앞 광장의 EMERCOM 검문소, 막힌 미라 대로와 경찰 저지선 (160칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 160, D = 160, Hh = 140, PI = Math.PI;
  // 3×5 픽셀 글꼴(간판용)
  const FONT = {
    T: '111010010010010', E: '111100110100111', R: '110101110101101', A: '010101111101101', G: '011100101101011', O: '010101101101010',
    U: '101101101101111', P: '110101110100100', M: '101111111101101', C: '011100100100011', N: '110101101101101', I: '111010010010111',
    Y: '101101010010010', D: '110101101101110', B: '110101110101110', K: '101101110101101', S: '011100010001110', F: '111100110100100',
  };
  // 글자 쓰기: (dx, dz) 쪽으로 진행, 세로 면에 5칸 높이
  const text = (t, s, x, y, z, dx, dz, b) => {
    let k = 0;
    for (const ch of s) {
      const g = FONT[ch];
      if (g) for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) if (g[r * 3 + c] === '1') t.set(x + dx * (k + c), y + 4 - r, z + dz * (k + c), b);
      k += 4;
    }
    return k - 1;
  };
  MAPS.push({
    id: 'groundzero', cat: 'tarkov', name: '그라운드 제로', en: 'Ground Zero · TerraGroup HQ', color: '#5a8aa8', seed: 602, base: 16, time: 'day', size: [W, D, Hh],
    desc: '타르코프 업무 지구, 모든 일이 시작된 곳. 곡면 유리 타워와 삼각 패널로 덮인 TerraGroup 본사 앞 광장에는 EMERCOM 구호소 천막과 구급차가 버려져 있고, 미라 대로는 부서진 노란 버스와 불탄 차들로 막혔다. 경찰 저지선 너머로 아직 연기가 오른다.',
    info: { title: '구역 정보', en: 'TARKOV · BUSINESS DISTRICT', rows: [['자리', '타르코프 업무 지구 · 테라그룹 본사 앞'], ['명물', '곡면 유리 타워 · 삼각 패널 본관 · EMERCOM 검문소'], ['탈출', 'EMERCOM 검문소 · 미라 대로(신호탄) · 경찰 저지선'], ['주의', '거치 기관총 · 지뢰 · 국경 저격수']] },
    sky: ['#b4b8ba', '#5e666e', '#d8cfc0'], stars: false,
    hemi: ['#d8dce0', '#3a3a38', 0.62], sun: ['#ece6da', 0.62, [0.5, 1, 0.75]],
    night: { sky: ['#1e2228', '#07090c', '#4a3a30'], stars: false, hemi: ['#8a96a8', '#141414', 0.36], sun: ['#a8b4c8', 0.22, [0.5, 1, 0.75]], haze: '#22262a' },
    fog: { start: 0.86, floor: 8, depth: 6, haze: [30, 0.2, 14], hazeColor: '#a6aaac' },
    camY: 36, zoom: 0.74,
    particles: [
      { n: 150, colors: ['#9a9a98', '#c8c8c4', '#6a6a6a'], mode: 'drift', speed: 0.35, wind: 0.5, y0: 20, y1: 110, glow: false },
      { n: 60, colors: ['#3a3836', '#5a5654', '#2a2828'], mode: 'rise', speed: 0.45, size: 2, area: [68, 122, 2.5], y0: 22, y1: 70, glow: false },
      { n: 18, colors: ['#ff9a3a', '#ffd06a'], mode: 'rise', speed: 0.5, area: [68, 122, 1.6], y0: 20, y1: 34 },
    ],
    blocks: {
      soil: { c: '#4a4440', v: 0.06 }, concD: { c: '#55585a', v: 0.05, pat: 'big' }, conc: { c: '#8a8c8a', v: 0.05, pat: 'big' }, concL: { c: '#b2b2ac', v: 0.04 }, concW: { c: '#cfcdc4', v: 0.03 },
      asph: { c: '#3a3c3e', top: '#46494b', v: 0.06, pat: 'stone' }, asphL: { c: '#4a4c4c', top: '#55585a', v: 0.06, pat: 'stone' }, puddle: { c: '#2a343c', top: '#3e5262', v: 0.02 },
      laneW: { c: '#cfd0c8', v: 0.04 }, laneY: { c: '#d0a830', v: 0.04 }, curb: { c: '#9a9a94', top: '#b0b0a8', v: 0.04 },
      walk: { c: '#86847e', top: '#9a978e', v: 0.05, pat: 'check', alt: '#8e8b84' }, plaza: { c: '#8e8a82', top: '#a29e94', v: 0.04, pat: 'check', alt: '#948f86' }, plazaD: { c: '#6e6c68', top: '#7c7a74', v: 0.04 },
      glass: { c: '#3e5666', v: 0.03 }, glassL: { c: '#5e7a8a', v: 0.03 }, glassD: { c: '#9ec4d4', v: 0.02 }, mull: { c: '#a4aaae', v: 0.02 }, void: { c: '#15181b', v: 0.02 },
      winT: { c: '#ffd890', night: true, day: '#4a6474' },
      tgDark: { c: '#283238', v: 0.03 }, tgPan: { c: '#46565e', v: 0.03 }, tgTri: { c: '#8aa0aa', v: 0.03 }, tgText: { c: '#e4ecee', v: 0.02 },
      tgLogo: { c: '#d8f4ff', glow: true }, lobbyL: { c: '#fff0d0', glow: true }, avi: { c: '#ff3a2a', glow: true },
      iron: { c: '#2e3034', v: 0.03 }, steel: { c: '#7a8084', v: 0.04 }, rust: { c: '#7a4a2e', v: 0.08 }, burnt: { c: '#262322', v: 0.06 }, ember: { c: '#ff7a2a', glow: true },
      carR: { c: '#9a2a24', v: 0.03 }, carB: { c: '#2a4a6a', v: 0.03 }, carW: { c: '#d4d4d0', v: 0.03 }, carG: { c: '#5a6a4a', v: 0.03 }, carS: { c: '#8a8e92', v: 0.03 }, carDk: { c: '#1e2022', v: 0.03 },
      tire: { c: '#161618', v: 0.03 }, carGl: { c: '#5a7080', v: 0.02 }, headL: { c: '#e8e4c8', v: 0.02 }, tailL: { c: '#b02a24', v: 0.02 },
      busY: { c: '#d8a82a', v: 0.05 }, busYd: { c: '#8a6a24', v: 0.05 }, busTop: { c: '#c8c0a8', v: 0.04 },
      emB: { c: '#2a5aa8', v: 0.03 }, emBd: { c: '#1e4282', v: 0.03 }, emO: { c: '#e8782a', v: 0.03 }, emW: { c: '#ecece6', v: 0.02 }, redX: { c: '#c8302a', v: 0.02 },
      beaconR: { c: '#ff3030', glow: true }, beaconB: { c: '#3a7aff', glow: true }, flood: { c: '#fff6dc', glow: true }, chem: { c: '#5aff6a', glow: true },
      polB: { c: '#2a3a8a', v: 0.03 }, fence: { c: '#a0a6aa', v: 0.03 }, jersey: { c: '#c4c0b4', v: 0.04 }, hazard: { c: '#e0b820', v: 0.03 }, hazRed: { c: '#c83a2a', v: 0.03 },
      sand: { c: '#8a7a58', v: 0.08 }, crate: { c: '#5a6a3a', v: 0.05, pat: 'plank' }, wood: { c: '#7a6448', v: 0.05, pat: 'plank' }, canvas: { c: '#e4e0d4', v: 0.03 }, medG: { c: '#4a7a5a', v: 0.04 },
      bark: { c: '#4a3e34', v: 0.06 }, twig: { c: '#5e5044', v: 0.06 }, leafDry: { c: '#8a7a4a', v: 0.1 }, hedge: { c: '#3e4a32', top: '#4e5a3a', v: 0.1 },
      contB: { c: '#2e5a7a', v: 0.04, pat: 'plank' }, contR: { c: '#8a3a2a', v: 0.04, pat: 'plank' }, shutter: { c: '#7a7c7a', v: 0.03, pat: 'log' }, signR: { c: '#c8202a', v: 0.02 },
    },
    build(w) {
      const B = w.id, G = w.base;
      MH.terrain(w, { floor: G - 5, height: () => G, surface: () => B.plaza, under: (x, z, y, dep) => dep < 2 ? B.concD : B.soil });
      const lights = [], acts = [], landmarks = [];
      // ── 바닥: 동서 미라 대로(남), 남북 도로(동), 보도, 광장 포장 ──
      const RZ0 = 112, RZ1 = 128, RX0 = 124, RX1 = 138;
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const h = hash3(x >> 2, 3, z >> 2);
        let b = B.plaza;
        const roadEW = z >= RZ0 && z <= RZ1, roadNS = x >= RX0 && x <= RX1 && z < RZ0;
        if (roadEW || roadNS) {
          b = h > 0.86 ? B.puddle : (hash3(x, 5, z) > 0.8 ? B.asphL : B.asph);
          if (roadEW && z === 120 && x % 8 < 4 && !(x >= RX0 && x <= RX1)) b = B.laneY;
          if (roadNS && x === 131 && z % 8 < 4) b = B.laneY;
          if (roadEW && x >= 108 && x <= 121 && z > RZ0 && z < RZ1 && x % 2 === 0) b = B.laneW;          // 횡단보도
          if (roadNS && z >= 104 && z <= 110 && x > RX0 && x < RX1 && x % 2 === 0) b = B.laneW;
        } else if (z === RZ0 - 1 || z === RZ1 + 1 || ((x === RX0 - 1 || x === RX1 + 1) && z < RZ0)) b = B.curb;
        else if ((z >= 106 && z < RZ0) || (z > RZ1 && z <= 136) || (x >= 118 && x < RX0 && z < RZ0) || (x > RX1 && x <= 144 && z < RZ0)) b = B.walk;
        else if (x > 144 && z < RZ0) b = h > 0.8 ? B.puddle : B.asphL;
        else if (z > 136) b = (x % 24 < 4 && z > 138 && z < 141) ? B.hedge : B.walk;
        else if ((x + z) % 16 === 0 && z > 60) b = B.plazaD;
        w.set(x, G, z, b);
      }

      // ── TerraGroup 타워: 유리 커튼월, 동쪽 위가 곡면으로 깎여 기운 왕관 ──
      const TX0 = 20, TX1 = 56, TZ0 = 8, TZ1 = 42, TTOP = G + 112, CRV = G + 78;
      const xe = y => y <= CRV ? TX1 : TX1 - Math.floor(Math.pow((y - CRV) / (TTOP - CRV), 1.7) * 20);
      const inT = (x, y, z) => y > G && y <= TTOP && z >= TZ0 && z <= TZ1 && x >= TX0 && x <= xe(y);
      const curtain = (u, y, x, z) => {
        const fy = (y - G - 1) % 4, pu = u / 5 | 0, fl = (y - G - 1) / 4 | 0;
        if (y <= G + 6) return u % 6 === 0 ? B.concL : B.glass;
        if (fy === 0) return B.concL;
        if (u % 5 === 0) return B.mull;
        const r = hash3(pu, fl, x * 3 + z);
        if (r < 0.05 && fl > 6) return B.void;                       // 깨진 유리
        if (r > 0.86) return B.winT;
        return r > 0.5 ? B.glassL : B.glass;
      };
      for (let y = G + 1; y <= TTOP; y++) { const x1 = xe(y); for (let z = TZ0; z <= TZ1; z++) for (let x = TX0; x <= x1; x++) {
        const eE = !inT(x + 1, y, z), eW = !inT(x - 1, y, z), eS = !inT(x, y, z + 1), eN = !inT(x, y, z - 1), eU = !inT(x, y + 1, z);
        let b = B.conc;
        if ((eE || eW) && (eS || eN) && y < CRV + 2) b = B.concL;                                   // 모서리 기둥
        else if (eS || eN) b = curtain(x - TX0, y, x, z);
        else if (eE || eW) b = curtain(z - TZ0, y, x, z);
        else if (eU) b = y > CRV ? curtain(z - TZ0 + x, y, x, z) : B.concD;                         // 곡면 왕관도 유리
        w.set(x, y, z, b);
      } }
      w.walls(TX0, TTOP + 1, TZ0, TX0 + 16, TTOP + 1, TZ1, B.concL);
      w.box(TX0 + 3, TTOP + 1, TZ0 + 4, TX0 + 9, TTOP + 4, TZ0 + 12, B.steel); w.box(TX0 + 3, TTOP + 1, TZ0 + 20, TX0 + 8, TTOP + 3, TZ0 + 28, B.concD);
      w.box(28, TTOP + 1, 25, 28, TTOP + 8, 25, B.iron); w.set(28, TTOP + 9, 25, B.avi);
      for (const [x, z] of [[TX0, TZ0], [TX0, TZ1], [TX0 + 16, TZ0], [TX0 + 16, TZ1]]) w.set(x, TTOP + 2, z, B.avi);
      lights.push({ name: 'avi', p: [28.5, TTOP + 8, 25.5], c: '#ff4a3a', i: 0.6, d: 30, flicker: 0.3, srcR: 4 });
      // 타워 정면 위쪽의 회사 로고(다이아몬드)
      const logo = (cx, cy, z, R) => {
        for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) {
          const d = Math.abs(dx) + Math.abs(dy);
          if (d > R) continue;
          w.set(cx + dx, cy + dy, z, d < R && (dx === 0 || dy === 0) ? B.tgDark : B.tgLogo);
        }
      };
      logo(30, G + 98, TZ1 + 1, 5);
      landmarks.push({ name: 'TerraGroup 타워', note: '모든 일이 시작된 본사 · 곡면 유리 왕관', p: [36, TTOP + 14, 26], boss: true });

      // ── 본관(삼각 패널 큐브): 남·동면을 덮는 삼각 무늬, 로고와 글자, 로비 유리문, 옥상 헬리패드 ──
      const CX0 = 60, CX1 = 114, CZ0 = 20, CZ1 = 58, CTOP = G + 28;
      const facet = (u, y) => {
        const a = u % 6, c = (y - G - 1) % 6, ci = u / 6 | 0, cj = (y - G - 1) / 6 | 0, r = hash3(ci, cj, 11);
        if (y >= CTOP - 1) return B.tgDark;
        const tri = r < 0.5 ? a > c : a + c < 5;
        if (a === 0 || c === 0) return B.tgDark;
        return tri ? (hash3(ci, cj, 12) > 0.45 ? B.tgTri : B.tgPan) : B.tgDark;
      };
      w.box(CX0, G + 1, CZ0, CX1, CTOP, CZ1, B.tgDark);
      for (let y = G + 1; y <= CTOP; y++) {
        for (let x = CX0; x <= CX1; x++) { w.set(x, y, CZ1, facet(x - CX0, y)); w.set(x, y, CZ0, facet(x, y)); }
        for (let z = CZ0; z <= CZ1; z++) { w.set(CX1, y, z, facet(CZ1 - z + 3, y)); w.set(CX0, y, z, facet(z, y)); }
      }
      w.box(CX0 + 1, CTOP, CZ0 + 1, CX1 - 1, CTOP, CZ1 - 1, B.concD);
      w.walls(CX0, CTOP + 1, CZ0, CX1, CTOP + 1, CZ1, B.tgDark);
      // 타워와 본관을 잇는 유리 구름다리
      w.box(TX1 + 1, G + 18, 26, CX0 - 1, G + 22, 32, B.glassL); w.box(TX1 + 1, G + 18, 26, CX0 - 1, G + 18, 32, B.concL); w.box(TX1 + 1, G + 22, 26, CX0 - 1, G + 22, 32, B.concL);
      // 로고와 글자
      logo(65, G + 19, CZ1 + 1, 5);
      w.box(71, G + 16, CZ1 + 1, 111, G + 22, CZ1 + 1, B.tgDark);
      text(w, 'TERRAGROUP', 72, G + 17, CZ1 + 2, 1, 0, B.tgText);
      lights.push({ name: 'logo', p: [80, G + 19, CZ1 + 4], c: '#c8ecff', i: 0.5, d: 34, flicker: 0.05, srcR: 16 });
      // 로비: 유리 자동문(부품), 안쪽 다이아몬드 조명
      const LX0 = 74, LX1 = 87, LCX = 80.5;
      w.box(LX0, G + 1, CZ1 - 4, LX1, G + 8, CZ1, 0);
      w.box(LX0, G, CZ1 - 4, LX1, G, CZ1, B.plazaD);
      w.box(LX0, G + 1, CZ1 - 5, LX1, G + 8, CZ1 - 5, B.concD);
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const d = Math.abs(dx) + Math.abs(dy); if (d <= 3) w.set(80 + dx + (dx > 0 ? 1 : 0), G + 5 + dy, CZ1 - 5, (dx === 0 && dy > 0) || (dy === 0 && dx < 0) ? B.concD : B.lobbyL); }
      w.box(LX0, G + 1, CZ1 - 1, LX0 + 2, G + 7, CZ1 - 1, B.glassD); w.box(LX1 - 2, G + 1, CZ1 - 1, LX1, G + 7, CZ1 - 1, B.glassD);
      w.box(LX0, G + 8, CZ1, LX1, G + 8, CZ1, B.iron);
      w.box(LX0 - 4, G + 9, CZ1 + 1, LX1 + 4, G + 9, CZ1 + 5, B.tgDark);
      for (const x of [LX0 - 3, LX1 + 3]) w.box(x, G + 1, CZ1 + 5, x, G + 8, CZ1 + 5, B.steel);
      lights.push({ name: 'lobby', p: [LCX, G + 5, CZ1 - 3], c: '#ffe0b0', i: 0.5, d: 20, flicker: 0.1, srcR: 4 });
      const doorL = w.prop({ name: 'doorL', pivot: [78.5, G + 1, CZ1 + 0.5] }), doorR = w.prop({ name: 'doorR', pivot: [82.5, G + 1, CZ1 + 0.5] });
      for (const [p, x0] of [[doorL, 77], [doorR, 81]]) for (let x = x0; x <= x0 + 3; x++) for (let y = G + 1; y <= G + 7; y++) p.set(x, y, CZ1, (y === G + 1 || y === G + 7 || x === x0 || x === x0 + 3) ? B.steel : B.glassD);
      acts.push({
        name: '로비 자동문', hint: 'TerraGroup 본관 로비의 유리 자동문이 양옆으로 열리고 안쪽 다이아몬드 조명이 밝아져요', hit: [LX0, G + 1, CZ1 - 1, LX1, G + 8, CZ1 + 1],
        run: async a => {
          a.flash('lobby', 5, 4);
          await Promise.all([a.move('doorL', [-4, 0, 0], 1.1), a.move('doorR', [4, 0, 0], 1.1)]);
          a.burst([LCX, G + 2, CZ1 + 1], { n: 30, colors: ['#c8c8c4', '#9a9a98'], speed: 3, up: 1, life: 1.2, gravity: 1, spread: 3, flat: true });
          await a.wait(1.8);
          await Promise.all([a.move('doorL', [0, 0, 0], 1.1), a.move('doorR', [0, 0, 0], 1.1)]);
        },
      });
      landmarks.push({ name: 'TerraGroup 본관', note: '삼각 패널 외벽 · 로비 자동문', p: [87, CTOP + 12, CZ1], tag: 'HQ' });
      acts.push({
        name: '로고 점등', hint: '본관 다이아몬드 로고와 TERRAGROUP 글자, 타워 꼭대기 로고에 차례로 불이 들어와요', hit: [60, G + 14, CZ1 + 1, 111, G + 24, CZ1 + 2],
        run: async a => {
          a.flash('logo', 6, 4.5); a.glow(1.8, 4.5);
          const o = { n: 10, colors: ['#d8f4ff', '#ffffff', '#8ad0ff'], speed: 1, up: 0.8, life: 0.9, gravity: 0, spread: 0.8 };
          for (let k = 0; k < 8; k++) { const t = k / 8 * PI * 2; a.burst([65.5 + Math.cos(t) * 4, G + 19.5 + Math.sin(t) * 4, CZ1 + 2], o); }
          await a.wait(0.4);
          for (let x = 72; x <= 110; x += 4) { a.burst([x + 1.5, G + 19.5, CZ1 + 3], o); await a.wait(0.15); }
          for (let y = G + 30; y <= G + 98; y += 8) { a.burst([30.5, y, TZ1 + 2], { n: 8, colors: ['#d8f4ff', '#ffffff'], speed: 0.6, up: 0.5, life: 0.7, gravity: 0, spread: 0.6 }); await a.wait(0.1); }
          a.burst([30.5, G + 98, TZ1 + 2], { n: 50, colors: ['#d8f4ff', '#ffffff', '#8ad0ff'], speed: 5, up: 1, life: 1.2, gravity: 0, spread: 1 });
          await a.wait(1);
        },
      });

      // ── 옥상 헬리패드와 EMERCOM 헬기(부품) ──
      const HX = 92, HZ = 38, HY = CTOP + 1;
      w.ring(HX, HZ, CTOP, 7, 8.2, B.hazard);
      for (let dz = -3; dz <= 3; dz++) { w.set(HX - 2, CTOP, HZ + dz, B.concW); w.set(HX + 2, CTOP, HZ + dz, B.concW); } w.box(HX - 1, CTOP, HZ, HX + 1, CTOP, HZ, B.concW);
      w.box(CX0 + 4, CTOP + 1, CZ0 + 4, CX0 + 10, CTOP + 4, CZ0 + 10, B.steel); w.box(CX0 + 14, CTOP + 1, CZ0 + 3, CX0 + 17, CTOP + 3, CZ0 + 8, B.concL);
      const heli = w.prop({ name: 'heli', pivot: [HX + 0.5, HY, HZ + 0.5] });
      for (const z of [HZ - 2, HZ + 2]) { heli.box(HX - 5, HY, z, HX + 4, HY, z, B.iron); heli.set(HX - 3, HY + 1, z, B.iron); heli.set(HX + 2, HY + 1, z, B.iron); }
      heli.box(HX - 5, HY + 2, HZ - 2, HX + 4, HY + 5, HZ + 2, B.emW);
      heli.box(HX - 5, HY + 2, HZ - 2, HX + 4, HY + 2, HZ + 2, B.emO);
      heli.box(HX - 5, HY + 4, HZ - 2, HX + 4, HY + 4, HZ + 2, B.emB);
      heli.box(HX - 7, HY + 2, HZ - 1, HX - 6, HY + 4, HZ + 1, B.carGl); heli.box(HX - 5, HY + 3, HZ - 2, HX - 4, HY + 5, HZ + 2, B.carGl);
      heli.box(HX - 1, HY + 3, HZ - 2, HX + 1, HY + 3, HZ - 2, B.carGl); heli.box(HX - 1, HY + 3, HZ + 2, HX + 1, HY + 3, HZ + 2, B.carGl);
      heli.box(HX + 5, HY + 4, HZ, HX + 14, HY + 4, HZ, B.emW); heli.box(HX + 5, HY + 5, HZ, HX + 7, HY + 5, HZ, B.emW);
      heli.box(HX + 13, HY + 5, HZ, HX + 14, HY + 8, HZ, B.emO); heli.box(HX + 13, HY + 6, HZ + 1, HX + 13, HY + 7, HZ + 1, B.iron);
      heli.box(HX - 1, HY + 6, HZ - 1, HX + 1, HY + 6, HZ + 1, B.steel); heli.set(HX, HY + 7, HZ, B.iron); heli.set(HX + 4, HY + 6, HZ, B.beaconR);
      const rotor = w.prop({ name: 'rotor', pivot: [HX + 0.5, HY + 8, HZ + 0.5], speed: 0.25 });
      rotor.box(HX - 11, HY + 8, HZ, HX + 11, HY + 8, HZ, B.iron); rotor.box(HX, HY + 8, HZ - 11, HX, HY + 8, HZ + 11, B.iron); rotor.set(HX, HY + 8, HZ, B.steel);
      const hp = [[0, 12, 0, 0], [0, 30, 50, PI / 2], [-50, 40, 42, 0], [-62, 66, 22, 0], [-10, 58, 8, -PI], [0, 14, 0, -2 * PI], [0, 0, 0, -2 * PI]];
      acts.push({
        name: '헬기 정찰', hint: '본관 옥상 헬리패드의 EMERCOM 헬기가 로터를 돌리며 떠올라 광장과 타워 앞을 한 바퀴 돌아요', hit: [HX - 7, HY, HZ - 3, HX + 14, HY + 8, HZ + 3],
        run: async a => {
          a.spin('rotor', 60, 15);
          a.burst([HX + 0.5, HY + 1, HZ + 0.5], { n: 40, colors: ['#c8c8c4', '#9a9a98'], speed: 9, up: 0.5, life: 1, gravity: 0, spread: 4, flat: true });
          await a.wait(1.6);
          await Promise.all([a.path('heli', hp, 11), a.path('rotor', hp.map(p => p.slice(0, 3)), 11)]);
          a.unwind('heli');
          a.burst([HX + 0.5, HY + 1, HZ + 0.5], { n: 30, colors: ['#c8c8c4', '#9a9a98'], speed: 7, up: 0.5, life: 1, gravity: 0, spread: 4, flat: true });
          await a.wait(1.2);
        },
      });

      // ── 타워 외벽에서 떨어지는 유리 패널(부품) ──
      const panes = [[27, G + 70], [38, G + 58], [47, G + 46]];
      panes.forEach(([x, y], k) => {
        const p = w.prop({ name: 'pane' + k, pivot: [x + 1.5, y, TZ1 + 1.5] });
        p.box(x, y, TZ1 + 1, x + 2, y + 3, TZ1 + 1, B.glassL); p.box(x, y + 3, TZ1 + 1, x + 2, y + 3, TZ1 + 1, B.mull);
        for (let yy = y; yy <= y + 3; yy++) for (let xx = x; xx <= x + 2; xx++) w.set(xx, yy, TZ1, B.void);
      });
      for (let i = 0; i < 40; i++) { const x = w.ri(TX0, TX1 + 2), z = w.ri(TZ1 + 2, TZ1 + 9); if (!w.get(x, G + 1, z)) w.set(x, G + 1, z, w.pick([B.glassD, B.glassL, B.concL, B.conc])); }
      acts.push({
        name: '유리 낙하', hint: '부서진 타워 외벽에서 유리 패널이 떨어져 광장 바닥에서 산산조각 나요', hit: [26, G + 46, TZ1, 50, G + 74, TZ1 + 2],
        run: async a => {
          for (let k = 0; k < 3; k++) {
            const [x, y] = panes[k], h = y - G - 1;
            a.burst([x + 1.5, y + 2, TZ1 + 1.5], { n: 14, colors: ['#d8f0ff', '#9ec4d4'], speed: 2, up: 0, life: 1.2, gravity: 8, spread: 1 });
            await Promise.all([a.tween('pane' + k, { off: [0, -h, 3], rot: [1.2, 0, 0.6] }, 1.1, t => t * t)]);
            a.burst([x + 1.5, G + 1.5, TZ1 + 4.5], { n: 50, colors: ['#e8f8ff', '#9ec4d4', '#ffffff'], speed: 7, up: 3, life: 1.1, gravity: 10, spread: 1.5, flat: true });
            await a.tween('pane' + k, { scl: [0, 0, 0] }, 0.2);
          }
          await a.wait(1.2);
          for (let k = 0; k < 3; k++) { await a.tween('pane' + k, { off: [0, 0, 0], rot: [0, 0, 0] }, 0.05); a.tween('pane' + k, { scl: [1, 1, 1] }, 0.5); }
          await a.wait(0.5);
        },
      });

      // ── 뒤쪽 빌딩들(북·서): 스카이사이드 업무 센터, 유니티 크레딧 은행 ──
      const grid = (x0, x1, z0, z1, top, o) => {
        o = o || {};
        w.box(x0, G + 1, z0, x1, top, z1, B.concD);
        for (let y = G + 1; y <= top; y++) for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) {
          if (x !== x0 && x !== x1 && z !== z0 && z !== z1) continue;
          const u = (x === x0 || x === x1) ? z : x, fy = (y - G - 1) % (o.fh || 5);
          let b = o.wall || B.conc;
          if (y === top) b = B.concL;
          else if (y <= G + 5) b = u % 4 === 0 ? b : (o.shop || B.glass);
          else if (fy === 0) b = o.band || B.concL;
          else if (u % (o.cw || 4) !== 0 && fy >= 2) { const r = hash3(u >> 1, y / 5 | 0, x + z); b = r > 0.85 ? B.winT : r < 0.08 ? B.void : B.glass; }
          w.set(x, y, z, b);
        }
        w.box(x0 + 3, top + 1, z0 + 3, x0 + 8, top + 3, z0 + 7, B.steel);
      };
      grid(62, 120, 2, 18, G + 48, { cw: 3 });
      grid(142, 158, 2, 40, G + 62, { wall: B.concL, band: B.conc });
      landmarks.push({ name: '스카이사이드 업무 센터', note: '본관 뒤 업무 빌딩', p: [91, G + 56, 10] });
      // 유니티 크레딧 은행: 동쪽 벽 꼭대기에 붉은 간판, 1층 카페 간판
      const UX0 = 2, UX1 = 28, UZ0 = 48, UZ1 = 104, UTOP = G + 40;
      grid(UX0, UX1, UZ0, UZ1, UTOP, { wall: B.concW, band: B.concL, fh: 5, cw: 4 });
      w.box(UX1, UTOP - 13, UZ0 + 2, UX1, UTOP - 1, UZ1 - 2, B.concW);
      text(w, 'UNITY', UX1 + 1, UTOP - 6, UZ1 - 16, 0, -1, B.signR);
      text(w, 'CREDIT BANK', UX1 + 1, UTOP - 12, UZ1 - 5, 0, -1, B.signR);
      for (let dy = -2; dy <= 2; dy++) for (let dz = -2; dz <= 2; dz++) if (Math.abs(dy) + Math.abs(dz) <= 2 && !(dz === 0 && dy < 1)) w.set(UX1 + 1, UTOP - 4 + dy, UZ1 - 7 + dz, B.signR);
      w.box(UX1 + 1, G + 4, UZ0 + 3, UX1 + 1, G + 10, UZ0 + 30, B.iron); text(w, 'COFFEE', UX1 + 2, G + 5, UZ0 + 28, 0, -1, B.concW);
      landmarks.push({ name: '유니티 크레딧 은행', note: 'EMERCOM 검문소 탈출구 옆 붉은 간판', p: [UX1, UTOP + 8, 76] });

      // ── 광장: 화단의 마른 나무, 볼라드, 잔해 ──
      const tree = (x, z, h) => {
        w.box(x - 2, G + 1, z - 2, x + 2, G + 1, z + 2, B.concL); w.box(x - 1, G + 1, z - 1, x + 1, G + 1, z + 1, B.soil);
        w.box(x, G + 2, z, x, G + 1 + h, z, B.bark);
        for (let k = 0; k < 5; k++) { const t = k / 5 * PI * 2 + x, r = 2 + (k % 2) * 1.5, y0 = G + h - 2 + (k % 3); const ex = Math.round(x + Math.cos(t) * r), ez = Math.round(z + Math.sin(t) * r); w.line(x, y0, z, ex, y0 + 3, ez, B.twig); if (hash3(x, k, z) > 0.4) w.set(ex, y0 + 4, ez, B.leafDry); }
      };
      for (const [x, z] of [[40, 66], [52, 66], [40, 84], [52, 84], [40, 100], [76, 133], [96, 135], [140, 134], [152, 134]]) tree(x, z, z > 120 ? 6 : 8);
      for (let x = 34; x <= 116; x += 4) if (x < 84 || x > 94) w.box(x, G + 1, 106, x, G + 2, 106, B.iron);
      for (let i = 0; i < 34; i++) {
        const x = w.ri(30, 120), z = w.ri(60, 110);
        if (!w.get(x, G + 1, z) && !w.get(x, G + 2, z)) { w.set(x, G + 1, z, w.pick([B.conc, B.concL, B.concD, B.rust, B.wood])); if (w.chance(0.25)) w.set(x, G + 2, z, B.conc); }
      }

      // ── EMERCOM 구호소: 파랑·주황 천막 둘, 구급차, 들것과 탁자, 발전기, 투광등, 울타리와 간판 ──
      const tent = (x0, x1, z0, z1) => {
        const hw = (z1 - z0) / 2, cz = (z0 + z1) / 2;
        for (let x = x0; x <= x1; x++) for (let z = z0; z <= z1; z++) {
          const d = Math.abs(z - cz), top = G + 3 + Math.floor((hw - d) * 0.9);
          for (let y = G + 1; y <= top; y++) {
            let b = y === top ? (x % 4 === 0 ? B.emBd : B.emB) : B.emB;
            if (y <= G + 2 && y !== top) b = B.emO;
            if ((x === x0 || x === x1) && d < 1.5 && y <= G + 4) b = B.void;
            w.set(x, y, z, b);
          }
        }
        w.box(x0 - 1, G + 1, z0 - 1, x0 - 1, G + 1, z0 - 1, B.iron); w.box(x1 + 1, G + 1, z1 + 1, x1 + 1, G + 1, z1 + 1, B.iron);
      };
      tent(64, 78, 68, 76); tent(64, 78, 82, 90);
      w.set(79, G + 2, 72, B.flood); lights.push({ name: 'tent', p: [80, G + 3, 72.5], c: '#fff0c8', i: 0.35, d: 16, flicker: 0.1, srcR: 3 });
      // 들것, 탁자, 의료 상자, 링거대
      for (const [x, z] of [[84, 76], [84, 80], [84, 86], [90, 82]]) { w.box(x, G + 1, z, x + 4, G + 1, z, B.medG); w.box(x, G + 2, z, x + 4, G + 2, z, B.canvas); w.set(x, G + 1, z, B.iron); w.set(x + 4, G + 1, z, B.iron); }
      for (const [x, z] of [[84, 69], [90, 69]]) { w.box(x, G + 2, z, x + 3, G + 2, z + 1, B.carG); for (const dx of [0, 3]) for (const dz of [0, 1]) w.set(x + dx, G + 1, z + dz, B.iron); w.set(x + 1, G + 3, z, B.emW); w.set(x + 2, G + 3, z + 1, B.redX); w.set(x + 3, G + 3, z, B.emO); }
      for (const [x, z] of [[89, 77], [89, 88]]) { w.box(x, G + 1, z, x, G + 5, z, B.steel); w.set(x, G + 5, z + 1, B.glassD); }
      for (const [x, z] of [[94, 76], [95, 76], [94, 77], [96, 90]]) { w.set(x, G + 1, z, B.emO); }
      // 발전기와 투광등
      w.box(93, G + 1, 66, 96, G + 3, 68, B.carG); w.box(93, G + 4, 67, 94, G + 4, 67, B.iron);
      w.box(98, G + 1, 66, 98, G + 10, 66, B.steel); w.box(97, G + 11, 66, 99, G + 11, 66, B.iron); w.box(97, G + 12, 66, 99, G + 12, 66, B.flood);
      lights.push({ name: 'flood', p: [98.5, G + 11, 67.5], c: '#fff6dc', i: 0.45, d: 26, flicker: 0.05, srcR: 3 });
      // 구급차: 북쪽이 운전석, 남쪽 뒷문(부품)
      const AX0 = 99, AX1 = 104, AZ0 = 80, AZ1 = 93;
      w.box(AX0, G + 2, AZ0, AX1, G + 7, AZ1, B.emW); w.box(AX0, G + 1, AZ0, AX1, G + 1, AZ1, B.carDk);
      for (const z of [AZ0 + 2, AZ0 + 3, AZ1 - 3, AZ1 - 2]) { w.set(AX0, G + 1, z, B.tire); w.set(AX1, G + 1, z, B.tire); w.set(AX0, G + 2, z, B.tire); w.set(AX1, G + 2, z, B.tire); }
      w.box(AX0, G + 6, AZ0, AX1, G + 7, AZ0 + 3, 0); w.box(AX0, G + 5, AZ0, AX1, G + 5, AZ0 + 1, B.emW); w.box(AX0, G + 5, AZ0 + 2, AX1, G + 6, AZ0 + 2, B.carGl); w.box(AX0, G + 4, AZ0, AX1, G + 4, AZ0, B.carGl);
      w.box(AX0, G + 4, AZ0 + 1, AX0, G + 5, AZ0 + 3, B.carGl); w.box(AX1, G + 4, AZ0 + 1, AX1, G + 5, AZ0 + 3, B.carGl); w.box(AX0, G + 6, AZ0 + 3, AX1, G + 6, AZ0 + 3, B.emW);
      for (const x of [AX0, AX1]) { w.box(x, G + 4, AZ0 + 5, x, G + 4, AZ1, B.redX); w.box(x, G + 6, AZ0 + 6, x, G + 6, AZ0 + 9, B.carGl); for (let dy = -1; dy <= 1; dy++) w.set(x, G + 6 + dy, AZ1 - 3, B.redX); w.set(x, G + 6, AZ1 - 4, B.redX); w.set(x, G + 6, AZ1 - 2, B.redX); }
      w.box(AX0, G + 4, AZ1, AX1, G + 4, AZ1, B.redX);
      w.box(AX0 + 1, G + 8, AZ0 + 4, AX0 + 2, G + 8, AZ0 + 4, B.beaconR); w.box(AX1 - 2, G + 8, AZ0 + 4, AX1 - 1, G + 8, AZ0 + 4, B.beaconB);
      w.box(AX0, G + 1, AZ1, AX1, G + 1, AZ1, B.carDk); w.box(AX0 + 1, G + 2, AZ1, AX1 - 1, G + 7, AZ1, B.void);
      lights.push({ name: 'ambR', p: [AX0 + 1.5, G + 9, AZ0 + 4.5], c: '#ff3a3a', i: 0.3, d: 22, flicker: 0.2, srcR: 3 });
      lights.push({ name: 'ambB', p: [AX1 - 1, G + 9, AZ0 + 4.5], c: '#4a8aff', i: 0.3, d: 22, flicker: 0.2, srcR: 3 });
      const adL = w.prop({ name: 'ambDL', pivot: [AX0 + 0.5, G + 2, AZ1 + 1] }), adR = w.prop({ name: 'ambDR', pivot: [AX1 + 0.5, G + 2, AZ1 + 1] });
      for (const [p, xa, xb] of [[adL, AX0, AX0 + 2], [adR, AX0 + 3, AX1]]) { p.box(xa, G + 2, AZ1 + 1, xb, G + 7, AZ1 + 1, B.emW); p.box(xa, G + 5, AZ1 + 1, xb, G + 6, AZ1 + 1, B.carGl); p.box(xa, G + 3, AZ1 + 1, xb, G + 3, AZ1 + 1, B.redX); }
      acts.push({
        name: 'EMERCOM 구급차', hint: '구급차 뒷문이 활짝 열리고 지붕 경광등이 빨강·파랑으로 번쩍이며 사이렌이 울려요', hit: [AX0, G + 1, AZ0, AX1, G + 8, AZ1 + 1],
        run: async a => {
          await Promise.all([a.turn('ambDL', [0, 1.7, 0], 1), a.turn('ambDR', [0, -1.7, 0], 1)]);
          for (let k = 0; k < 8; k++) {
            const red = k % 2 === 0;
            a.flash(red ? 'ambR' : 'ambB', 10, 0.35);
            a.burst([red ? AX0 + 2 : AX1 - 1, G + 9, AZ0 + 4.5], { n: 16, colors: red ? ['#ff3030', '#ff8a8a'] : ['#3a7aff', '#9ac0ff'], speed: 5, up: 0.4, life: 0.4, gravity: 0, spread: 0.6, flat: true });
            await a.wait(0.4);
          }
          await Promise.all([a.turn('ambDL', [0, 0, 0], 1), a.turn('ambDR', [0, 0, 0], 1)]);
        },
      });
      // 검문소 울타리와 EMERCOM 간판
      for (let x = 62; x <= 116; x++) { if (x >= 84 && x <= 94) continue; w.set(x, G + 1, 104, x % 3 === 0 ? B.fence : 0); w.set(x, G + 2, 104, B.fence); w.set(x, G + 3, 104, x % 3 === 0 ? B.fence : 0); if (x % 3 === 0) w.set(x, G + 1, 103, B.fence); }
      for (let z = 64; z <= 104; z++) for (const x of [62, 116]) { w.set(x, G + 2, z, B.fence); if (z % 3 === 0) { w.set(x, G + 1, z, B.fence); w.set(x, G + 3, z, B.fence); } }
      for (const x of [65, 95]) w.box(x, G + 1, 105, x, G + 16, 105, B.steel);
      w.box(66, G + 10, 105, 94, G + 16, 105, B.emB); w.box(66, G + 10, 105, 94, G + 10, 105, B.emO); w.box(66, G + 16, 105, 94, G + 16, 105, B.emO);
      text(w, 'EMERCOM', 67, G + 11, 106, 1, 0, B.emW);
      landmarks.push({ name: 'EMERCOM 검문소', note: '구호소 천막과 구급차 · 상시 탈출구', p: [90, G + 24, 86], tag: 'EXFIL' });
      // 녹색 연막 탈출 신호: 정문 앞 보도
      const SX = 89, SZ = 108;
      w.set(SX, G + 1, SZ, B.chem); w.set(SX + 1, G + 1, SZ, B.steel);
      lights.push({ name: 'exfil', p: [SX + 0.5, G + 2, SZ + 0.5], c: '#6aff7a', i: 0.35, d: 20, flicker: 0.3, srcR: 3 });
      acts.push({
        name: '녹색 연막 · 탈출', hint: 'EMERCOM 검문소 정문 앞에 녹색 연막이 피어올라 탈출 지점을 알려요', hit: [SX - 2, G + 1, SZ - 2, SX + 2, G + 3, SZ + 2],
        run: async a => {
          a.flash('exfil', 6, 6);
          for (let k = 0; k < 16; k++) {
            a.burst([SX + 0.5, G + 1.5, SZ + 0.5], { n: 26, colors: ['#5ad86a', '#8af09a', '#3a9a4a', '#c8f8d0'], speed: 1.6, up: 4, life: 2.6, gravity: -0.8, spread: 1 + k * 0.15 });
            await a.wait(0.3);
          }
          await a.wait(1);
        },
      });

      // ── 미라 대로: 부서진 노란 버스, 충돌한 차들, 불타는 차(보닛 부품) ──
      const car = (t, x, z, ax, col, o) => {
        o = o || {};
        const L = 9, Wd = 4, bt = o.burnt;
        const P = (l, c, y, b) => { const ll = o.flip ? L - 1 - l : l; if (ax === 'x') t.set(x + ll, y, z + c, b); else t.set(x + c, y, z + ll, b); };
        for (let l = 0; l < L; l++) for (let c = 0; c < Wd; c++) {
          const wheel = (l === 1 || l === 2 || l === L - 2 || l === L - 3) && (c === 0 || c === Wd - 1), side = c === 0 || c === Wd - 1;
          P(l, c, G + 1, wheel ? B.tire : B.carDk);
          let b = bt ? (hash3(x + l, 7, z + c) > 0.55 ? B.rust : B.burnt) : col;
          if (!bt && side && (l === 0)) b = B.headL; else if (!bt && side && l === L - 1) b = B.tailL;
          P(l, c, G + 2, b);
          if (l >= 2 && l <= L - 2) P(l, c, G + 3, bt ? (hash3(l, c, z) > 0.6 ? B.rust : B.void) : (side || l === 2 || l === L - 2 ? B.carGl : col));
          if (l >= 3 && l <= L - 3) P(l, c, G + 4, bt ? B.burnt : col);
        }
      };
      // 노란 버스(불탄 자국과 깨진 창)
      const BX0 = 6, BX1 = 33, BZ0 = 113, BZ1 = 117;
      for (let x = BX0; x <= BX1; x++) for (let z = BZ0; z <= BZ1; z++) {
        const l = x - BX0, side = z === BZ0 || z === BZ1, wh = (l === 3 || l === 4 || l === 21 || l === 22) && side, sc = hash3(x >> 1, 9, z) > 0.62 && x > 20;
        w.set(x, G + 1, z, wh ? B.tire : B.busYd);
        for (let y = G + 2; y <= G + 7; y++) {
          let b = sc ? B.burnt : B.busY;
          if (y === G + 7) b = sc ? B.rust : B.busTop;
          else if (y >= G + 4 && y <= G + 5 && (side || x === BX0) && l % 3 !== 0) b = hash3(x, y, z) > 0.4 ? B.void : B.carGl;
          else if (y === G + 3 && side) b = sc ? B.burnt : B.busYd;
          w.set(x, y, z, b);
        }
      }
      w.box(BX0, G + 2, BZ0 + 1, BX0, G + 3, BZ1 - 1, B.headL);
      landmarks.push({ name: '미라 대로 노란 버스', note: '신호탄 탈출구 · 막힌 대로', p: [20, G + 16, 115] });
      car(w, 36, 113, 'x', B.carR, { flip: true });                       // 버스 꽁무니를 들이받은 차
      car(w, 48, 120, 'z', B.carB);                                       // 옆으로 돌아간 차
      car(w, 84, 114, 'x', B.carW);
      car(w, 96, 122, 'x', B.carG, { flip: true });
      car(w, 110, 114, 'z', B.carS, { burnt: true });
      car(w, 30, 123, 'x', B.carS, { burnt: true });
      // 불타는 차: 뼈대만 남아 불씨가 타고, 보닛이 따로 들린다
      const FX = 64, FZ = 121;
      car(w, FX, FZ, 'x', B.burnt, { burnt: true });
      for (const [dx, dz] of [[3, 1], [5, 2], [4, 1], [6, 2]]) w.set(FX + dx, G + 3, FZ + dz, B.ember);
      w.set(FX + 4, G + 4, FZ + 1, B.ember); w.set(FX + 1, G + 2, FZ + 2, B.ember);
      lights.push({ name: 'fire', p: [FX + 4.5, G + 5, FZ + 2], c: '#ff8a3a', i: 0.6, d: 22, flicker: 0.6, srcR: 3 });
      const hood = w.prop({ name: 'hood', pivot: [FX + 1, G + 3, FZ + 2] });
      hood.box(FX, G + 3, FZ, FX + 1, G + 3, FZ + 3, B.rust); hood.set(FX + 1, G + 3, FZ + 1, B.burnt);
      acts.push({
        name: '차량 화재', hint: '불타던 승용차가 펑 터지며 보닛이 튀어 오르고 불길과 검은 연기가 치솟아요', hit: [FX, G + 1, FZ, FX + 8, G + 5, FZ + 3],
        run: async a => {
          a.flash('fire', 8, 3); a.lightning(0.35);
          a.burst([FX + 4.5, G + 3, FZ + 2], { n: 90, colors: ['#ffd06a', '#ff8a2a', '#ff4a1a', '#ffffff'], speed: 9, up: 7, life: 1, gravity: 6, spread: 2 });
          a.burst([FX + 4.5, G + 3, FZ + 2], { n: 40, colors: ['#3a3836', '#5a5654', '#7a7470'], speed: 3, up: 6, life: 2.4, gravity: -1, spread: 2 });
          await a.tween('hood', { off: [-2, 9, 1], rot: [0, 0.8, 2.6] }, 0.6, t => 1 - (1 - t) * (1 - t));
          await a.tween('hood', { off: [-4, 0, 3], rot: [0, 1.4, 3.1] }, 0.6, t => t * t);
          for (let k = 0; k < 6; k++) { a.burst([FX + 4.5, G + 4, FZ + 2], { n: 26, colors: ['#ffd06a', '#ff8a2a', '#ff4a1a'], speed: 2, up: 5, life: 0.9, gravity: -1, spread: 1.5 }); await a.wait(0.35); }
          await a.wait(0.8);
          await a.tween('hood', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.8);
        },
      });
      // 도로를 막은 콘크리트 방벽과 철 고슴도치
      const jersey = (x0, x1, z) => { for (let x = x0; x <= x1; x++) { w.set(x, G + 1, z, B.jersey); w.set(x, G + 2, z, (x >> 1) % 2 ? B.hazRed : B.concW); } };
      jersey(140, 158, RZ0 + 2); jersey(140, 158, RZ1 - 2); jersey(118, 122, 110);
      const hedgehog = (x, z) => { w.line(x - 1, G + 1, z - 1, x + 1, G + 3, z + 1, B.rust); w.line(x + 1, G + 1, z - 1, x - 1, G + 3, z + 1, B.rust); w.line(x, G + 1, z + 1, x, G + 3, z - 1, B.iron); };
      for (const [x, z] of [[146, 118], [152, 122], [150, 116], [2, 120], [56, 115], [116, 125]]) hedgehog(x, z);

      // ── 경찰 저지선(남북 도로): 차단봉(부품), 경찰차, 모래주머니 기관총 진지 ──
      const PZ = 98;
      w.box(RX0 - 2, G + 1, PZ - 1, RX0 - 1, G + 5, PZ + 1, B.concL); w.box(RX0 - 2, G + 3, PZ - 1, RX0 - 1, G + 3, PZ + 1, B.hazRed);
      const boom = w.prop({ name: 'boom', pivot: [RX0, G + 4.5, PZ + 0.5] });
      for (let x = RX0; x <= RX1; x++) boom.set(x, G + 4, PZ, ((x - RX0) >> 1) % 2 ? B.hazRed : B.concW);
      boom.set(RX1, G + 3, PZ, B.steel);
      car(w, 126, 82, 'z', B.carW);
      w.box(126, G + 2, 85, 126, G + 2, 87, B.polB); w.box(129, G + 2, 85, 129, G + 2, 87, B.polB);
      w.set(127, G + 5, 86, B.beaconB); w.set(128, G + 5, 86, B.beaconR); w.box(127, G + 5, 85, 128, G + 5, 85, B.iron);
      lights.push({ name: 'police', p: [127.5, G + 6, 86.5], c: '#4a7aff', i: 0.3, d: 22, flicker: 0.2, srcR: 3 });
      jersey(132, 138, PZ - 6);
      const sandRing = (cx, cz) => { for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) { const d = Math.max(Math.abs(dx), Math.abs(dz)); if (d === 3 && !(dx === 3 && Math.abs(dz) < 2)) { w.set(cx + dx, G + 1, cz + dz, B.sand); w.set(cx + dx, G + 2, cz + dz, B.sand); if (dx === -3) w.set(cx + dx, G + 3, cz + dz, B.sand); } } };
      sandRing(146, 96);
      w.box(146, G + 1, 96, 146, G + 3, 96, B.iron); w.box(141, G + 4, 96, 146, G + 4, 96, B.iron); w.box(145, G + 4, 95, 147, G + 4, 97, B.steel); w.box(147, G + 3, 98, 148, G + 3, 98, B.crate);
      landmarks.push({ name: '경찰 저지선', note: '유료 탈출구 · 기관총 진지', p: [131, G + 16, PZ] });
      acts.push({
        name: '경찰 저지선 차단기', hint: '경찰 저지선 차단봉이 번쩍 올라가고 경찰차 경광등이 깜빡여요. 통행료는 5000루블이에요', hit: [RX0, G + 3, PZ, RX1, G + 5, PZ],
        run: async a => {
          a.flash('police', 8, 4);
          for (let k = 0; k < 3; k++) a.burst([127.5 + (k % 2), G + 6, 86.5], { n: 14, colors: k % 2 ? ['#ff3030', '#ff9a9a'] : ['#3a7aff', '#9ac0ff'], speed: 4, up: 0.4, life: 0.5, gravity: 0, spread: 0.5, flat: true });
          await a.turn('boom', [0, 0, 1.45], 1.6);
          for (let k = 0; k < 4; k++) { a.burst([127.5 + (k % 2), G + 6, 86.5], { n: 14, colors: k % 2 ? ['#ff3030', '#ff9a9a'] : ['#3a7aff', '#9ac0ff'], speed: 4, up: 0.4, life: 0.5, gravity: 0, spread: 0.5, flat: true }); await a.wait(0.5); }
          await a.turn('boom', [0, 0, 0], 1.4);
        },
      });

      // ── 남쪽·동쪽 낮은 거리: 셔터 내린 상점줄, 버스 정류장, 컨테이너 ──
      for (let x0 = 2; x0 < 62; x0 += 15) {
        const x1 = x0 + 13, top = G + 7 + (x0 % 2);
        w.box(x0, G + 1, 142, x1, top, 156, B.concW);
        for (let x = x0 + 1; x < x1; x++) for (let y = G + 1; y <= G + 4; y++) w.set(x, y, 142, (x - x0) % 5 === 0 ? B.concL : B.shutter);
        w.box(x0, G + 5, 141, x1, G + 5, 141, [B.signR, B.emB, B.carG, B.hazard][(x0 / 15) | 0]);
        w.box(x0, top + 1, 142, x1, top + 1, 156, B.concL);
      }
      w.box(110, G + 1, 133, 110, G + 4, 133, B.steel); w.box(118, G + 1, 133, 118, G + 4, 133, B.steel); w.box(110, G + 5, 132, 118, G + 5, 135, B.glassD); w.box(111, G + 1, 135, 117, G + 1, 135, B.wood);
      for (const [x, z, b] of [[148, 50, B.contB], [148, 66, B.contR], [148, 82, B.contB]]) { w.box(x, G + 1, z, x + 9, G + 4, z + 4, b); w.box(x, G + 1, z, x, G + 4, z + 4, B.iron); }
      w.box(150, G + 5, 66, 157, G + 8, 70, B.contB);
      return { lights, landmarks, acts };
    },
  });
})();
