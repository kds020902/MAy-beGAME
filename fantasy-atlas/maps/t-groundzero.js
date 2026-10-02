// 그라운드 제로 — TerraGroup 본사 블록. 실제 배치를 동서로 뒤집어(본사 정면이 남동 카메라를 보게) 옮겼다:
// 서쪽에 둥근 모서리의 삼각 부조 본사, 그 앞 도로와 격자 캐노피 공원, 북쪽에 유니티 크레딧 은행과 EMERCOM 검문소, 남쪽 대로 끝 경찰 저지선 (160칸)
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
    desc: '타르코프 업무 지구, 모든 일이 시작된 곳. 둥근 모서리에 삼각 부조 패널을 두른 TerraGroup 본사가 나무 우거진 공원을 마주 보고, 공원 위로는 하얀 격자 캐노피가 걸려 있다. 북쪽 유니티 크레딧 은행 앞에는 EMERCOM 구호소 천막과 구급차가 버려졌고, 남쪽 대로 끝은 모래주머니와 노란 철망으로 막은 경찰 저지선이다.',
    info: { title: '구역 정보', en: 'TARKOV · BUSINESS DISTRICT', rows: [['자리', '타르코프 업무 지구 · 테라그룹 본사 블록'], ['명물', '삼각 부조 본사 · 격자 캐노피 공원 · 유니티 크레딧 은행'], ['탈출', 'EMERCOM 검문소 · 경찰 저지선(5000루블) · 미라 대로(신호탄)'], ['주의', '거치 기관총 · 지뢰 · 국경 저격수']] },
    sky: ['#b8c0c6', '#5e6a76', '#dcd4c4'], stars: false,
    hemi: ['#dce0e4', '#3a3a38', 0.62], sun: ['#ece6da', 0.64, [0.5, 1, 0.75]],
    night: { sky: ['#1e2228', '#07090c', '#4a3a30'], stars: false, hemi: ['#8a96a8', '#141414', 0.36], sun: ['#a8b4c8', 0.22, [0.5, 1, 0.75]], haze: '#22262a' },
    fog: { start: 0.86, floor: 8, depth: 6, haze: [30, 0.18, 14], hazeColor: '#a6aaac' },
    camY: 36, zoom: 0.74,
    particles: [
      { n: 150, colors: ['#9a9a98', '#c8c8c4', '#6a6a6a'], mode: 'drift', speed: 0.35, wind: 0.5, y0: 20, y1: 110, glow: false },
      { n: 60, colors: ['#3a3836', '#5a5654', '#2a2828'], mode: 'rise', speed: 0.45, size: 2, area: [65, 100, 2.5], y0: 22, y1: 70, glow: false },
      { n: 18, colors: ['#ff9a3a', '#ffd06a'], mode: 'rise', speed: 0.5, area: [65, 100, 1.6], y0: 20, y1: 34 },
    ],
    blocks: {
      soil: { c: '#4a4440', v: 0.06 }, concD: { c: '#55585a', v: 0.05, pat: 'big' }, conc: { c: '#8a8c8a', v: 0.05, pat: 'big' }, concL: { c: '#b2b2ac', v: 0.04 }, concW: { c: '#d6d4cc', v: 0.03 },
      asph: { c: '#3a3c3e', top: '#4a4d4f', v: 0.06, pat: 'stone' }, asphL: { c: '#4a4c4c', top: '#57595b', v: 0.06, pat: 'stone' }, puddle: { c: '#2a343c', top: '#3e5262', v: 0.02 },
      laneW: { c: '#cfd0c8', v: 0.04 }, laneY: { c: '#d0a830', v: 0.04 }, curb: { c: '#9a9a94', top: '#b0b0a8', v: 0.04 }, tactile: { c: '#c8a830', v: 0.04 },
      walk: { c: '#86847e', top: '#9a978e', v: 0.05, pat: 'check', alt: '#8e8b84' }, plaza: { c: '#8e8a82', top: '#a8a49a', v: 0.04, pat: 'check', alt: '#9a968c' }, plazaD: { c: '#6e6c68', top: '#7c7a74', v: 0.04 },
      grass: { c: '#4a5a32', top: '#5e7a3a', v: 0.1 }, hedge: { c: '#3a5028', top: '#4a6430', v: 0.1 }, leaf: { c: '#3e6a2e', top: '#5a8a3a', v: 0.1 }, leaf2: { c: '#4e7a34', top: '#6a9a44', v: 0.1 }, bark: { c: '#4a3e34', v: 0.06 },
      glass: { c: '#3e5666', v: 0.03 }, glassL: { c: '#5e7a8a', v: 0.03 }, glassD: { c: '#9ec4d4', v: 0.02 }, glassK: { c: '#22303a', v: 0.02 }, mull: { c: '#a4aaae', v: 0.02 }, void: { c: '#15181b', v: 0.02 },
      winT: { c: '#ffd890', night: true, day: '#4a6474' },
      tgFrame: { c: '#2a3034', v: 0.03 }, tgGroove: { c: '#6a7478', v: 0.03 }, tgPan: { c: '#959ea2', v: 0.03 }, tgTri: { c: '#bcc4c6', v: 0.03 }, tgText: { c: '#eef2f2', v: 0.02 },
      tgLogo: { c: '#e4f6ff', glow: true }, lobbyL: { c: '#fff0d0', glow: true }, avi: { c: '#ff3a2a', glow: true }, parkG: { c: '#2a7a4a', v: 0.03 },
      latt: { c: '#dcdedc', v: 0.02 }, iron: { c: '#2e3034', v: 0.03 }, steel: { c: '#7a8084', v: 0.04 }, rust: { c: '#7a4a2e', v: 0.08 }, burnt: { c: '#262322', v: 0.06 }, ember: { c: '#ff7a2a', glow: true },
      carR: { c: '#9a2a24', v: 0.03 }, carB: { c: '#3a5674', v: 0.03 }, carW: { c: '#d4d4d0', v: 0.03 }, carG: { c: '#5a6a4a', v: 0.03 }, carS: { c: '#8a8e92', v: 0.03 }, carDk: { c: '#1e2022', v: 0.03 }, taxi: { c: '#e0b830', v: 0.03 },
      tire: { c: '#161618', v: 0.03 }, carGl: { c: '#5a7080', v: 0.02 }, headL: { c: '#e8e4c8', v: 0.02 }, tailL: { c: '#b02a24', v: 0.02 },
      busY: { c: '#d8a82a', v: 0.05 }, busYd: { c: '#8a6a24', v: 0.05 }, busTop: { c: '#c8c0a8', v: 0.04 },
      tentK: { c: '#b4ab88', v: 0.04 }, tentKd: { c: '#8e8668', v: 0.04 }, emB: { c: '#2a5aa8', v: 0.03 }, emO: { c: '#e8782a', v: 0.03 }, emW: { c: '#ecece6', v: 0.02 }, redX: { c: '#c8302a', v: 0.02 },
      beaconR: { c: '#ff3030', glow: true }, beaconB: { c: '#3a7aff', glow: true }, flood: { c: '#fff6dc', glow: true }, chem: { c: '#5aff6a', glow: true },
      polB: { c: '#2a5a9a', v: 0.03 }, fence: { c: '#a0a6aa', v: 0.03 }, jersey: { c: '#c4c0b4', v: 0.04 }, hazard: { c: '#e0b820', v: 0.03 }, hazRed: { c: '#c83a2a', v: 0.03 },
      sand: { c: '#8a7a58', v: 0.08 }, crate: { c: '#5a6a3a', v: 0.05, pat: 'plank' }, wood: { c: '#7a6448', v: 0.05, pat: 'plank' }, canvas: { c: '#e4e0d4', v: 0.03 }, medG: { c: '#4a7a5a', v: 0.04 }, trash: { c: '#1c1e22', v: 0.08 },
      shutter: { c: '#7a7c7a', v: 0.03, pat: 'log' }, signR: { c: '#c8202a', v: 0.02 }, louver: { c: '#c4c6c2', v: 0.03, pat: 'log' },
    },
    build(w) {
      const B = w.id, G = w.base;
      MH.terrain(w, { floor: G - 5, height: () => G, surface: () => B.plaza, under: (x, z, y, dep) => dep < 2 ? B.concD : B.soil });
      const lights = [], acts = [], landmarks = [];
      // ── 바닥: 남쪽 동서 대로, 본사 앞 남북 도로(A), 동쪽 남북 도로(B), 공원 ──
      const RZ0 = 112, RZ1 = 128, AX0 = 58, AX1 = 68, BX0 = 142, BX1 = 154;
      const PCX = 103, PCZ = 81, PRX = 30, PRZ = 24;
      const pq = (x, z) => Math.pow(Math.abs(x - PCX) / PRX, 4) + Math.pow(Math.abs(z - PCZ) / PRZ, 4);
      const basin = (x, z) => ((x - PCX) / 7) ** 2 + ((z - PCZ) / 11) ** 2;
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const h = hash3(x >> 2, 3, z >> 2);
        const rC = z >= RZ0 && z <= RZ1, rA = x >= AX0 && x <= AX1 && z < RZ0, rB = x >= BX0 && x <= BX1 && z < RZ0;
        let b = B.plaza;
        if (rC || rA || rB) {
          b = h > 0.86 ? B.puddle : (hash3(x, 5, z) > 0.8 ? B.asphL : B.asph);
          if (rC && z === 120 && x % 8 < 4 && !(x >= AX0 && x <= AX1) && !(x >= BX0 && x <= BX1)) b = B.laneY;
          if ((rA && x === 63 || rB && x === 148) && z % 8 < 4 && z < RZ0 - 8) b = B.laneY;
          if (rC && z > RZ0 && z < RZ1 && ((x >= 72 && x <= 78) || (x >= 132 && x <= 138)) && x % 2 === 0) b = B.laneW;   // 횡단보도
          if ((rA || rB) && z >= 104 && z <= 110 && z % 2 === 0) b = B.laneW;
        } else if (z === RZ0 - 1 || z === RZ1 + 1 || ((x === AX0 - 1 || x === AX1 + 1 || x === BX0 - 1 || x === BX1 + 1) && z < RZ0)) b = B.curb;
        else if ((z >= 106 && z < RZ0) || (z > RZ1 && z <= 136) || (x >= AX0 - 3 && x <= AX1 + 3 && z < RZ0) || (x >= BX0 - 3 && x <= BX1 + 3 && z < RZ0)) b = (x === AX1 + 2 || z === 108) ? B.tactile : B.walk;
        else if (pq(x, z) <= 1) {
          const q = pq(x, z), bs = basin(x, z);
          b = B.grass;
          if (q > 0.36 && q < 0.5) b = B.plaza;                                                // 고리 산책로
          if (Math.abs((x - PCX) - (z - PCZ) * 0.9) < 1.6 || Math.abs((x - PCX) + (z - PCZ) * 1.3) < 1.6) b = B.plaza;   // 가로지르는 길
          if (bs <= 1.6) b = B.plaza;
        }
        w.set(x, G, z, b);
      }
      // 공원 가운데 타원 분수대(마른 바닥)와 둘레 생울타리
      for (let z = PCZ - 14; z <= PCZ + 14; z++) for (let x = PCX - 10; x <= PCX + 10; x++) {
        const bs = basin(x, z);
        if (bs <= 1) { w.set(x, G, z, 0); w.set(x, G - 1, z, hash3(x, 2, z) > 0.8 ? B.puddle : B.plazaD); }
        else if (bs <= 1.35) w.set(x, G + 1, z, B.concL);
      }
      for (let z = PCZ - PRZ; z <= PCZ + PRZ; z++) for (let x = PCX - PRX; x <= PCX + PRX; x++) {
        const q = pq(x, z);
        if (q > 0.86 && q <= 1 && w.get(x, G, z) === B.grass) w.set(x, G + 1, z, B.hedge);
      }

      // ── 곡면 고층 타워(북서, 배경): 동쪽 위가 곡면으로 깎인 왕관, 붉은 항공등 ──
      const TX0 = 4, TX1 = 40, TZ0 = 2, TZ1 = 24, TTOP = G + 112, CRV = G + 78;
      const xe = y => y <= CRV ? TX1 : TX1 - Math.floor(Math.pow((y - CRV) / (TTOP - CRV), 1.7) * 20);
      const inT = (x, y, z) => y > G && y <= TTOP && z >= TZ0 && z <= TZ1 && x >= TX0 && x <= xe(y);
      const curtain = (u, y, x, z) => {
        const fy = (y - G - 1) % 4, pu = u / 5 | 0, fl = (y - G - 1) / 4 | 0;
        if (y <= G + 6) return u % 6 === 0 ? B.concL : B.glass;
        if (fy === 0) return B.concL;
        if (u % 5 === 0) return B.mull;
        const r = hash3(pu, fl, x * 3 + z);
        if (r < 0.05 && fl > 6) return B.void;
        if (r > 0.86) return B.winT;
        return r > 0.5 ? B.glassL : B.glass;
      };
      for (let y = G + 1; y <= TTOP; y++) { const x1 = xe(y); for (let z = TZ0; z <= TZ1; z++) for (let x = TX0; x <= x1; x++) {
        const eE = !inT(x + 1, y, z), eW = !inT(x - 1, y, z), eS = !inT(x, y, z + 1), eN = !inT(x, y, z - 1), eU = !inT(x, y + 1, z);
        let b = B.conc;
        if ((eE || eW) && (eS || eN) && y < CRV + 2) b = B.concL;
        else if (eS || eN) b = curtain(x - TX0, y, x, z);
        else if (eE || eW) b = curtain(z - TZ0, y, x, z);
        else if (eU) b = y > CRV ? curtain(z - TZ0 + x, y, x, z) : B.concD;
        w.set(x, y, z, b);
      } }
      w.walls(TX0, TTOP + 1, TZ0, TX0 + 16, TTOP + 1, TZ1, B.concL);
      w.box(TX0 + 3, TTOP + 1, TZ0 + 3, TX0 + 9, TTOP + 4, TZ0 + 9, B.steel);
      w.box(14, TTOP + 1, 13, 14, TTOP + 8, 13, B.iron); w.set(14, TTOP + 9, 13, B.avi);
      for (const [x, z] of [[TX0, TZ0], [TX0, TZ1], [TX0 + 16, TZ0], [TX0 + 16, TZ1]]) w.set(x, TTOP + 2, z, B.avi);
      lights.push({ name: 'avi', p: [14.5, TTOP + 8, 13.5], c: '#ff4a3a', i: 0.6, d: 30, flicker: 0.3, srcR: 4 });
      landmarks.push({ name: '곡면 유리 타워', note: '붉은 항공등을 단 업무 지구 고층 빌딩', p: [22, TTOP + 14, 13] });
      // 타워 동쪽 벽에서 떨어지는 유리 패널(부품)
      const panes = [[6, G + 70], [12, G + 58], [18, G + 46]];
      panes.forEach(([z, y], k) => {
        const p = w.prop({ name: 'pane' + k, pivot: [TX1 + 1.5, y, z + 1.5] });
        p.box(TX1 + 1, y, z, TX1 + 1, y + 3, z + 2, B.glassL); p.box(TX1 + 1, y + 3, z, TX1 + 1, y + 3, z + 2, B.mull);
        for (let yy = y; yy <= y + 3; yy++) for (let zz = z; zz <= z + 2; zz++) w.set(TX1, yy, zz, B.void);
      });
      for (let i = 0; i < 36; i++) { const x = w.ri(TX1 + 2, TX1 + 10), z = w.ri(TZ0, TZ1 + 2); if (!w.get(x, G + 1, z)) w.set(x, G + 1, z, w.pick([B.glassD, B.glassL, B.concL, B.conc])); }
      acts.push({
        name: '유리 낙하', hint: '부서진 고층 타워 외벽에서 유리 패널이 떨어져 바닥에서 산산조각 나요', hit: [TX1, G + 46, 6, TX1 + 2, G + 74, 21],
        run: async a => {
          for (let k = 0; k < 3; k++) {
            const [z, y] = panes[k], h = y - G - 1;
            a.burst([TX1 + 1.5, y + 2, z + 1.5], { n: 14, colors: ['#d8f0ff', '#9ec4d4'], speed: 2, up: 0, life: 1.2, gravity: 8, spread: 1 });
            await a.tween('pane' + k, { off: [3, -h, 0], rot: [0.6, 0, -1.2] }, 1.1, t => t * t);
            a.burst([TX1 + 4.5, G + 1.5, z + 1.5], { n: 50, colors: ['#e8f8ff', '#9ec4d4', '#ffffff'], speed: 7, up: 3, life: 1.1, gravity: 10, spread: 1.5, flat: true });
            await a.tween('pane' + k, { scl: [0, 0, 0] }, 0.2);
          }
          await a.wait(1.2);
          for (let k = 0; k < 3; k++) { await a.tween('pane' + k, { off: [0, 0, 0], rot: [0, 0, 0] }, 0.05); a.tween('pane' + k, { scl: [1, 1, 1] }, 0.5); }
          await a.wait(0.5);
        },
      });

      // ── 북쪽 배경 빌딩: 엘리멘탈 글로벌(검은 유리 타워), 유니티 크레딧 은행 ──
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
          else if (o.louver && fy === 1) b = B.louver;
          else if (u % (o.cw || 4) !== 0 && fy >= 2) { const r = hash3(u >> 1, y / 5 | 0, x + z); b = r > 0.85 ? B.winT : r < 0.08 ? B.void : (o.glass || B.glass); }
          w.set(x, y, z, b);
        }
        w.box(x0 + 3, top + 1, z0 + 3, x0 + 8, top + 3, z0 + 7, B.steel);
      };
      grid(72, 94, 2, 22, G + 92, { wall: B.tgFrame, band: B.glassK, glass: B.glassK, cw: 3, fh: 4 });
      landmarks.push({ name: '엘리멘탈 글로벌', note: '북쪽 끝 검은 유리 빌딩', p: [83, G + 100, 12] });
      // 유니티 크레딧 은행: 흰 격자와 차양 띠, 남쪽 벽에 붉은 간판과 「임대」 현수막
      const UX0 = 98, UX1 = 139, UZ0 = 4, UZ1 = 30, UTOP = G + 40;
      grid(UX0, UX1, UZ0, UZ1, UTOP, { wall: B.concW, band: B.concL, fh: 5, cw: 4, louver: true });
      w.box(UX0, UTOP - 13, UZ1, UX0 + 44, UTOP - 1, UZ1, B.concW);
      text(w, 'UNITY', UX0 + 7, UTOP - 6, UZ1 + 1, 1, 0, B.signR);
      text(w, 'CREDIT BANK', UX0 - 1, UTOP - 12, UZ1 + 1, 1, 0, B.signR);
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) if (Math.abs(dy) + Math.abs(dx) <= 2 && !(dx === 0 && dy < 1)) w.set(UX0 + 3 + dx, UTOP - 4 + dy, UZ1 + 1, B.signR);
      for (let k = 0; k < 6; k++) { const x0 = UX0 + 18 + k * 4; w.box(x0, G + 17, UZ1 + 1, x0 + 2, G + 21, UZ1 + 1, B.signR); w.box(x0 + 1, G + 18, UZ1 + 2, x0 + 1, G + 20, UZ1 + 2, B.concW); }
      w.box(UX0, G + 4, UZ1 + 1, UX0 + 24, G + 10, UZ1 + 1, B.iron); text(w, 'COFFEE', UX0 + 1, G + 5, UZ1 + 2, 1, 0, B.concW);
      for (let s = 1; s <= 3; s++) w.box(UX0 + 30, G + 4 - s, UZ1 + s, UX0 + 38, G + 4 - s, UZ1 + s, B.concL);   // 정문 계단
      w.box(UX0 + 30, G + 1, UZ1 + 1, UX0 + 38, G + 3, UZ1 + 1, B.concL);
      w.box(UX0 + 30, G + 4, UZ1, UX0 + 38, G + 8, UZ1, B.glassD);
      landmarks.push({ name: '유니티 크레딧 은행', note: '붉은 간판 아래가 EMERCOM 탈출구', p: [118, UTOP + 8, 18] });

      // ── TerraGroup 본사: 둥근 동쪽 모서리, 삼각 부조 패널, 모서리 큰 유리창 띠, 꼭대기 간판 ──
      const GX0 = 10, GX1 = 54, GZ0 = 30, GZ1 = 104, GTOP = G + 32, GR = 10;
      const inG = (x, z) => {
        if (x < GX0 || x > GX1 || z < GZ0 || z > GZ1) return false;
        if (x > GX1 - GR && z < GZ0 + GR) return (x - (GX1 - GR)) ** 2 + (z - (GZ0 + GR)) ** 2 <= GR * GR;
        if (x > GX1 - GR && z > GZ1 - GR) return (x - (GX1 - GR)) ** 2 + (z - (GZ1 - GR)) ** 2 <= GR * GR;
        return true;
      };
      const facet = (u, y) => {
        const a = u % 6, c = (y - G - 1) % 6, ci = u / 6 | 0, cj = (y - G - 1) / 6 | 0, r = hash3(ci, cj, 11);
        if (a === 0 || c === 0) return B.tgGroove;
        const tri = r < 0.5 ? a > c : a + c < 5;
        return tri ? (hash3(ci, cj, 12) > 0.35 ? B.tgTri : B.tgPan) : B.tgPan;
      };
      const tgFace = (u, y, win) => {
        if (y >= GTOP - 1) return B.tgFrame;
        if (y <= G + 8) return u % 8 === 0 ? B.concL : B.glassK;
        if (y === G + 9) return B.concL;
        if (win && y >= G + 12 && y <= G + 23) return (u % 6 === 0 || (y - G - 12) % 6 === 5) ? B.tgFrame : B.glassK;
        return facet(u, y);
      };
      for (let z = GZ0; z <= GZ1; z++) for (let x = GX0; x <= GX1; x++) {
        if (!inG(x, z)) continue;
        const sh = !inG(x + 1, z) || !inG(x - 1, z) || !inG(x, z + 1) || !inG(x, z - 1);
        const corner = x > GX1 - GR && (z < GZ0 + GR || z > GZ1 - GR);
        for (let y = G + 1; y <= GTOP; y++) {
          if (!sh) { w.set(x, y, z, y === GTOP ? B.concD : B.tgFrame); continue; }
          let b;
          if (corner) b = tgFace(x + z, y, z > GZ1 - GR);
          else if (!inG(x + 1, z)) b = tgFace(z, y, z >= 66);
          else if (!inG(x, z + 1)) b = tgFace(x, y, x >= 36);
          else b = tgFace(x + z, y, false);
          w.set(x, y, z, b);
        }
      }
      for (let z = GZ0; z <= GZ1; z++) for (let x = GX0; x <= GX1; x++) if (inG(x, z) && (!inG(x + 1, z) || !inG(x - 1, z) || !inG(x, z + 1) || !inG(x, z - 1))) w.set(x, GTOP + 1, z, B.tgFrame);
      // 간판: 동쪽 벽 꼭대기 띠에 로고와 TERRAGROUP
      w.box(GX1, G + 25, 42, GX1, G + 30, 94, B.tgFrame);
      const logo = (t, x, cy, cz, R) => { for (let dy = -R; dy <= R; dy++) for (let dz = -R; dz <= R; dz++) { const d = Math.abs(dz) + Math.abs(dy); if (d <= R) t.set(x, cy + dy, cz + dz, d < R && (dz === 0 || dy === 0) ? B.tgFrame : B.tgLogo); } };
      logo(w, GX1 + 1, G + 28, 89, 3);
      text(w, 'TERRAGROUP', GX1 + 1, G + 26, 84, 0, -1, B.tgText);
      lights.push({ name: 'logo', p: [GX1 + 3, G + 28, 80], c: '#c8ecff', i: 0.5, d: 34, flicker: 0.05, srcR: 10 });
      landmarks.push({ name: 'TerraGroup 본사', note: '모든 일이 시작된 곳 · 삼각 부조 외벽', p: [34, GTOP + 16, 70], boss: true });
      // 주차장 입구: 어두운 아가리, 초록 P 표지
      w.box(GX1 - 2, G + 1, 72, GX1, G + 7, 82, B.void); w.box(GX1, G + 8, 71, GX1, G + 8, 83, B.concL); w.box(GX1, G + 1, 71, GX1, G + 7, 71, B.concL); w.box(GX1, G + 1, 83, GX1, G + 7, 83, B.concL);
      w.box(GX1 + 1, G + 9, 74, GX1 + 1, G + 11, 80, B.parkG); text(w, 'P', GX1 + 2, G + 8, 78, 0, -1, B.tgText);
      w.box(GX1 - 2, G, 72, GX1 + 2, G, 82, B.plazaD);
      // 로비: 유리 자동문(부품), 안쪽 다이아몬드 조명, 차양
      const LZ0 = 50, LZ1 = 62, LCZ = 56;
      w.box(GX1 - 4, G + 1, LZ0, GX1, G + 8, LZ1, 0);
      w.box(GX1 - 4, G, LZ0, GX1, G, LZ1, B.plazaD);
      w.box(GX1 - 5, G + 1, LZ0, GX1 - 5, G + 8, LZ1, B.tgFrame);
      for (let dy = -3; dy <= 3; dy++) for (let dz = -3; dz <= 3; dz++) { const d = Math.abs(dz) + Math.abs(dy); if (d <= 3) w.set(GX1 - 5, G + 5 + dy, LCZ + dz, (dz === 0 && dy > 0) || (dy === 0 && dz < 0) ? B.tgFrame : B.lobbyL); }
      w.box(GX1 - 1, G + 1, LZ0, GX1 - 1, G + 7, LZ0 + 1, B.glassD); w.box(GX1 - 1, G + 1, LZ1 - 2, GX1 - 1, G + 7, LZ1, B.glassD);
      w.box(GX1, G + 8, LZ0, GX1, G + 8, LZ1, B.iron);
      w.box(GX1 + 1, G + 9, LZ0 - 4, GX1 + 3, G + 9, LZ1 + 4, B.tgFrame);
      lights.push({ name: 'lobby', p: [GX1 - 2, G + 5, LCZ + 0.5], c: '#ffe0b0', i: 0.5, d: 20, flicker: 0.1, srcR: 4 });
      const doorL = w.prop({ name: 'doorL', pivot: [GX1 + 0.5, G + 1, 54] }), doorR = w.prop({ name: 'doorR', pivot: [GX1 + 0.5, G + 1, 58] });
      for (const [p, z0] of [[doorL, 52], [doorR, 56]]) for (let z = z0; z <= z0 + 3; z++) for (let y = G + 1; y <= G + 7; y++) p.set(GX1, y, z, (y === G + 1 || y === G + 7 || z === z0 || z === z0 + 3) ? B.steel : B.glassD);
      acts.push({
        name: '로비 자동문', hint: 'TerraGroup 본사 로비의 유리 자동문이 양옆으로 열리고 안쪽 다이아몬드 조명이 밝아져요', hit: [GX1 - 1, G + 1, LZ0, GX1 + 1, G + 8, LZ1],
        run: async a => {
          a.flash('lobby', 5, 4);
          await Promise.all([a.move('doorL', [0, 0, -4], 1.1), a.move('doorR', [0, 0, 4], 1.1)]);
          a.burst([GX1 + 1.5, G + 2, LCZ + 0.5], { n: 30, colors: ['#c8c8c4', '#9a9a98'], speed: 3, up: 1, life: 1.2, gravity: 1, spread: 3, flat: true });
          await a.wait(1.8);
          await Promise.all([a.move('doorL', [0, 0, 0], 1.1), a.move('doorR', [0, 0, 0], 1.1)]);
        },
      });
      acts.push({
        name: '로고 점등', hint: '본사 꼭대기 다이아몬드 로고와 TERRAGROUP 글자에 차례로 하얀 불이 들어와요', hit: [GX1, G + 25, 44, GX1 + 1, G + 31, 92],
        run: async a => {
          a.flash('logo', 6, 4.5); a.glow(1.8, 4.5);
          const o = { n: 10, colors: ['#e4f6ff', '#ffffff', '#8ad0ff'], speed: 1, up: 0.8, life: 0.9, gravity: 0, spread: 0.8 };
          for (let k = 0; k < 8; k++) { const t = k / 8 * PI * 2; a.burst([GX1 + 2, G + 28.5 + Math.sin(t) * 3, 89.5 + Math.cos(t) * 3], o); }
          await a.wait(0.4);
          for (let z = 84; z >= 46; z -= 4) { a.burst([GX1 + 2.5, G + 28.5, z - 0.5], o); await a.wait(0.15); }
          a.burst([GX1 + 2, G + 28.5, 89.5], { n: 50, colors: ['#e4f6ff', '#ffffff', '#8ad0ff'], speed: 5, up: 1, life: 1.2, gravity: 0, spread: 1 });
          await a.wait(1);
        },
      });

      // ── 본사 옥상 헬리패드와 EMERCOM 헬기(부품) ──
      const HX = 30, HZ = 62, HY = GTOP + 1;
      w.ring(HX, HZ, GTOP, 7, 8.2, B.hazard);
      for (let dz = -3; dz <= 3; dz++) { w.set(HX - 2, GTOP, HZ + dz, B.concW); w.set(HX + 2, GTOP, HZ + dz, B.concW); } w.box(HX - 1, GTOP, HZ, HX + 1, GTOP, HZ, B.concW);
      w.box(GX0 + 4, GTOP + 1, GZ0 + 6, GX0 + 12, GTOP + 4, GZ0 + 14, B.steel); w.box(GX0 + 4, GTOP + 1, GZ1 - 16, GX0 + 9, GTOP + 3, GZ1 - 8, B.concL);
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
      const hp = [[0, 12, 0, 0], [50, 26, 4, PI], [82, 36, 34, PI / 2], [34, 44, 52, 0], [-6, 30, 22, -PI / 2], [0, 12, 0, 0], [0, 0, 0, 0]];
      acts.push({
        name: '헬기 정찰', hint: '본사 옥상 헬리패드의 EMERCOM 헬기가 로터를 돌리며 떠올라 공원과 대로 위를 한 바퀴 돌아요', hit: [HX - 7, HY, HZ - 3, HX + 14, HY + 8, HZ + 3],
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

      // ── 공원: 하얀 삼각 격자 캐노피, 푸른 나무, 벤치, 잔해 ──
      const CY0 = G + 9;
      for (let z = 59; z <= 73; z++) for (let x = 77; x <= 99; x++) {
        const y = CY0 + Math.floor((x - 77) / 8), e = ((x - 88) / 11.5) ** 2 + ((z - 66) / 7.5) ** 2;
        if (e > 1) continue;
        if (e > 0.85 || (x + z) % 5 === 0 || (x - z + 100) % 5 === 0 || z % 5 === 0) w.set(x, y, z, B.latt);
        else if (hash3(x, 4, z) > 0.75) w.set(x, y, z, B.glassD);
      }
      for (const [x, z] of [[82, 64], [93, 63], [88, 70]]) {
        const top = CY0 + Math.floor((x - 77) / 8) - 1;
        w.box(x, G + 1, z, x, G + 5, z, B.latt);
        for (const [dx, dz] of [[-3, -2], [3, -2], [0, 3]]) w.line(x, G + 5, z, x + dx, top, z + dz, B.latt);
      }
      landmarks.push({ name: '본사 앞 공원', note: '하얀 삼각 격자 캐노피 · 마른 분수대', p: [PCX, G + 18, PCZ] });
      const tree = (x, z, h, r) => {
        w.box(x, G + 1, z, x, G + h, z, B.bark);
        w.ellipsoid(x, G + h, z, r, r * 0.9, r, B.leaf, (dx, dy, dz) => hash3(x + dx, dy + 40, z + dz) > 0.18);
        w.ellipsoid(x + 1, G + h + 1, z - 1, r * 0.6, r * 0.6, r * 0.6, B.leaf2, (dx, dy, dz) => hash3(x + dx, dy + 50, z + dz) > 0.3);
      };
      for (const [x, z, h] of [[80, 84, 7], [84, 96, 8], [96, 100, 7], [112, 100, 8], [124, 92, 7], [128, 76, 8], [124, 64, 7], [116, 80, 6], [90, 82, 6], [76, 74, 6], [130, 102, 6], [60, 4, 7], [140, 134, 6], [152, 134, 6], [86, 134, 6]]) tree(x, z, h, 3);
      for (const [x, z] of [[96, 90], [110, 72]]) { w.box(x, G + 1, z, x + 3, G + 1, z, B.wood); w.set(x, G + 2, z, B.iron); w.set(x + 3, G + 2, z, B.iron); }
      for (let i = 0; i < 40; i++) {
        const x = w.ri(108, 132), z = w.ri(84, 104);
        if (pq(x, z) < 0.8 && !w.get(x, G + 1, z)) { w.set(x, G + 1, z, w.pick([B.conc, B.concL, B.concD, B.rust])); if (w.chance(0.3)) w.set(x, G + 2, z, B.conc); }
      }
      for (let i = 0; i < 24; i++) { const x = w.ri(42, 70), z = w.ri(0, 110); if (!w.get(x, G + 1, z) && (x < AX0 - 3 || x > AX1 + 3)) w.set(x, G + 1, z, w.pick([B.concL, B.conc, B.trash, B.wood])); }

      // ── 차 만들기 ──
      const car = (t, x, z, ax, col, o) => {
        o = o || {};
        const L = 9, Wd = 4, bt = o.burnt;
        const P = (l, c, y, b) => { const ll = o.flip ? L - 1 - l : l; if (ax === 'x') t.set(x + ll, y, z + c, b); else t.set(x + c, y, z + ll, b); };
        for (let l = 0; l < L; l++) for (let c = 0; c < Wd; c++) {
          const wheel = (l === 1 || l === 2 || l === L - 2 || l === L - 3) && (c === 0 || c === Wd - 1), side = c === 0 || c === Wd - 1;
          P(l, c, G + 1, wheel ? B.tire : B.carDk);
          let b = bt ? (hash3(x + l, 7, z + c) > 0.55 ? B.rust : B.burnt) : col;
          if (!bt && side && l === 0) b = B.headL; else if (!bt && side && l === L - 1) b = B.tailL;
          if (o.stripe && l >= 2 && l <= L - 2 && side) b = o.stripe;
          P(l, c, G + 2, b);
          if (l >= 2 && l <= L - 2) P(l, c, G + 3, bt ? (hash3(l, c, z) > 0.6 ? B.rust : B.void) : (side || l === 2 || l === L - 2 ? B.carGl : col));
          if (l >= 3 && l <= L - 3) P(l, c, G + 4, bt ? B.burnt : col);
        }
      };

      // ── 본사 앞 도로: 경찰차와 불타는 차(보닛 부품), 방벽 ──
      car(w, 59, 84, 'z', B.carW, { stripe: B.polB });
      w.set(60, G + 5, 87, B.beaconB); w.set(61, G + 5, 87, B.beaconR);
      const FX = 63, FZ = 96;
      car(w, FX, FZ, 'z', B.burnt, { burnt: true });
      for (const [dx, dz] of [[1, 3], [2, 5], [1, 4], [2, 6]]) w.set(FX + dx, G + 3, FZ + dz, B.ember);
      w.set(FX + 1, G + 4, FZ + 4, B.ember); w.set(FX + 2, G + 2, FZ + 1, B.ember);
      lights.push({ name: 'fire', p: [FX + 2, G + 5, FZ + 4.5], c: '#ff8a3a', i: 0.6, d: 22, flicker: 0.6, srcR: 3 });
      const hood = w.prop({ name: 'hood', pivot: [FX + 2, G + 3, FZ + 1] });
      hood.box(FX, G + 3, FZ, FX + 3, G + 3, FZ + 1, B.rust); hood.set(FX + 1, G + 3, FZ + 1, B.burnt);
      acts.push({
        name: '차량 화재', hint: '본사 앞에서 불타던 차가 펑 터지며 보닛이 튀어 오르고 불길과 검은 연기가 치솟아요', hit: [FX, G + 1, FZ, FX + 3, G + 5, FZ + 8],
        run: async a => {
          a.flash('fire', 8, 3); a.lightning(0.35);
          a.burst([FX + 2, G + 3, FZ + 4.5], { n: 90, colors: ['#ffd06a', '#ff8a2a', '#ff4a1a', '#ffffff'], speed: 9, up: 7, life: 1, gravity: 6, spread: 2 });
          a.burst([FX + 2, G + 3, FZ + 4.5], { n: 40, colors: ['#3a3836', '#5a5654', '#7a7470'], speed: 3, up: 6, life: 2.4, gravity: -1, spread: 2 });
          await a.tween('hood', { off: [1, 9, -2], rot: [-2.6, 0.8, 0], }, 0.6, t => 1 - (1 - t) * (1 - t));
          await a.tween('hood', { off: [3, 0, -4], rot: [-3.1, 1.4, 0] }, 0.6, t => t * t);
          for (let k = 0; k < 6; k++) { a.burst([FX + 2, G + 4, FZ + 4.5], { n: 26, colors: ['#ffd06a', '#ff8a2a', '#ff4a1a'], speed: 2, up: 5, life: 0.9, gravity: -1, spread: 1.5 }); await a.wait(0.35); }
          await a.wait(0.8);
          await a.tween('hood', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.8);
        },
      });
      const jersey = (x0, z0, x1, z1) => { for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) { w.set(x, G + 1, z, B.jersey); w.set(x, G + 2, z, ((x + z) >> 1) % 2 ? B.hazRed : B.concW); } };
      jersey(64, 70, 68, 70); jersey(58, 40, 61, 40); jersey(BX0, 60, BX0 + 5, 60); jersey(BX1 - 4, 90, BX1, 90);
      for (const [x, z] of [[60, 98], [61, 101], [66, 80], [64, 76]]) { w.set(x, G + 1, z, B.emO); w.set(x, G + 2, z, B.emW); }
      car(w, 59, 20, 'z', B.carS); car(w, 64, 8, 'z', B.taxi, { flip: true });

      // ── EMERCOM 구호소(유니티 크레딧 은행 앞): 베이지 돔 천막, 구급차, 들것, 투광등, 울타리와 간판 ──
      const dome = (cx, cz, rx, rz) => {
        w.ellipsoid(cx, G + 1, cz, rx, 5, rz, B.tentK, (dx, dy) => dy >= 0);
        for (let dx = -rx; dx <= rx; dx += 3) for (let dy = 0; dy <= 5; dy++) for (let dz = -rz; dz <= rz; dz++) if (w.get(cx + dx, G + 1 + dy, cz + dz) === B.tentK && (dx * dx) / (rx * rx) + (dy * dy) / 25 + (dz * dz) / (rz * rz) > 0.7) w.set(cx + dx, G + 1 + dy, cz + dz, B.tentKd);
        w.box(cx - 1, G + 1, cz + rz - 1, cx + 1, G + 3, cz + rz, B.void);
        w.box(cx - 1, G + 6, cz, cx + 1, G + 6, cz, B.redX);
      };
      dome(115, 38, 6, 4); dome(129, 38, 6, 4);
      w.set(115, G + 1, 43, B.flood); lights.push({ name: 'tent', p: [115.5, G + 3, 44], c: '#fff0c8', i: 0.35, d: 16, flicker: 0.1, srcR: 3 });
      for (const [x, z] of [[110, 46], [116, 46], [122, 46], [128, 46], [110, 50], [122, 50]]) { w.box(x, G + 1, z, x + 4, G + 1, z, B.medG); w.box(x, G + 2, z, x + 4, G + 2, z, B.canvas); w.set(x, G + 1, z, B.iron); w.set(x + 4, G + 1, z, B.iron); }
      for (const [x, z] of [[132, 48]]) { w.box(x, G + 2, z, x + 3, G + 2, z + 1, B.carG); for (const dx of [0, 3]) for (const dz of [0, 1]) w.set(x + dx, G + 1, z + dz, B.iron); w.set(x + 1, G + 3, z, B.emW); w.set(x + 2, G + 3, z + 1, B.redX); }
      for (const [x, z] of [[109, 44], [127, 44]]) { w.box(x, G + 1, z, x, G + 5, z, B.steel); w.set(x, G + 5, z + 1, B.glassD); }
      w.box(134, G + 1, 34, 137, G + 3, 36, B.carG);
      w.box(138, G + 1, 40, 138, G + 10, 40, B.steel); w.box(137, G + 11, 40, 139, G + 11, 40, B.iron); w.box(137, G + 12, 40, 139, G + 12, 40, B.flood);
      lights.push({ name: 'flood', p: [138.5, G + 11, 41.5], c: '#fff6dc', i: 0.45, d: 26, flicker: 0.05, srcR: 3 });
      // 구급차: 북쪽이 운전석, 남쪽 뒷문(부품)
      const AX0a = 99, AX1a = 104, AZ0 = 34, AZ1 = 47;
      w.box(AX0a, G + 2, AZ0, AX1a, G + 7, AZ1, B.emW); w.box(AX0a, G + 1, AZ0, AX1a, G + 1, AZ1, B.carDk);
      for (const z of [AZ0 + 2, AZ0 + 3, AZ1 - 3, AZ1 - 2]) { w.set(AX0a, G + 1, z, B.tire); w.set(AX1a, G + 1, z, B.tire); w.set(AX0a, G + 2, z, B.tire); w.set(AX1a, G + 2, z, B.tire); }
      w.box(AX0a, G + 6, AZ0, AX1a, G + 7, AZ0 + 3, 0); w.box(AX0a, G + 5, AZ0, AX1a, G + 5, AZ0 + 1, B.emW); w.box(AX0a, G + 5, AZ0 + 2, AX1a, G + 6, AZ0 + 2, B.carGl); w.box(AX0a, G + 4, AZ0, AX1a, G + 4, AZ0, B.carGl);
      w.box(AX0a, G + 4, AZ0 + 1, AX0a, G + 5, AZ0 + 3, B.carGl); w.box(AX1a, G + 4, AZ0 + 1, AX1a, G + 5, AZ0 + 3, B.carGl); w.box(AX0a, G + 6, AZ0 + 3, AX1a, G + 6, AZ0 + 3, B.emW);
      for (const x of [AX0a, AX1a]) { w.box(x, G + 4, AZ0 + 5, x, G + 4, AZ1, B.redX); w.box(x, G + 6, AZ0 + 6, x, G + 6, AZ0 + 9, B.carGl); for (let dy = -1; dy <= 1; dy++) w.set(x, G + 6 + dy, AZ1 - 3, B.redX); w.set(x, G + 6, AZ1 - 4, B.redX); w.set(x, G + 6, AZ1 - 2, B.redX); }
      w.box(AX0a, G + 4, AZ1, AX1a, G + 4, AZ1, B.redX);
      w.box(AX0a + 1, G + 8, AZ0 + 4, AX0a + 2, G + 8, AZ0 + 4, B.beaconR); w.box(AX1a - 2, G + 8, AZ0 + 4, AX1a - 1, G + 8, AZ0 + 4, B.beaconB);
      w.box(AX0a, G + 1, AZ1, AX1a, G + 1, AZ1, B.carDk); w.box(AX0a + 1, G + 2, AZ1, AX1a - 1, G + 7, AZ1, B.void);
      lights.push({ name: 'ambR', p: [AX0a + 1.5, G + 9, AZ0 + 4.5], c: '#ff3a3a', i: 0.3, d: 22, flicker: 0.2, srcR: 3 });
      lights.push({ name: 'ambB', p: [AX1a - 1, G + 9, AZ0 + 4.5], c: '#4a8aff', i: 0.3, d: 22, flicker: 0.2, srcR: 3 });
      const adL = w.prop({ name: 'ambDL', pivot: [AX0a + 0.5, G + 2, AZ1 + 1] }), adR = w.prop({ name: 'ambDR', pivot: [AX1a + 0.5, G + 2, AZ1 + 1] });
      for (const [p, xa, xb] of [[adL, AX0a, AX0a + 2], [adR, AX0a + 3, AX1a]]) { p.box(xa, G + 2, AZ1 + 1, xb, G + 7, AZ1 + 1, B.emW); p.box(xa, G + 5, AZ1 + 1, xb, G + 6, AZ1 + 1, B.carGl); p.box(xa, G + 3, AZ1 + 1, xb, G + 3, AZ1 + 1, B.redX); }
      acts.push({
        name: 'EMERCOM 구급차', hint: '구급차 뒷문이 활짝 열리고 지붕 경광등이 빨강·파랑으로 번쩍이며 사이렌이 울려요', hit: [AX0a, G + 1, AZ0, AX1a, G + 8, AZ1 + 1],
        run: async a => {
          await Promise.all([a.turn('ambDL', [0, 1.7, 0], 1), a.turn('ambDR', [0, -1.7, 0], 1)]);
          for (let k = 0; k < 8; k++) {
            const red = k % 2 === 0;
            a.flash(red ? 'ambR' : 'ambB', 10, 0.35);
            a.burst([red ? AX0a + 2 : AX1a - 1, G + 9, AZ0 + 4.5], { n: 16, colors: red ? ['#ff3030', '#ff8a8a'] : ['#3a7aff', '#9ac0ff'], speed: 5, up: 0.4, life: 0.4, gravity: 0, spread: 0.6, flat: true });
            await a.wait(0.4);
          }
          await Promise.all([a.turn('ambDL', [0, 0, 0], 1), a.turn('ambDR', [0, 0, 0], 1)]);
        },
      });
      // 울타리와 간판
      for (let x = 96; x <= 140; x++) { if (x >= 104 && x <= 110) continue; w.set(x, G + 1, 54, x % 3 === 0 ? B.fence : 0); w.set(x, G + 2, 54, B.fence); w.set(x, G + 3, 54, x % 3 === 0 ? B.fence : 0); }
      for (let z = 32; z <= 54; z++) { w.set(96, G + 2, z, B.fence); if (z % 3 === 0) { w.set(96, G + 1, z, B.fence); w.set(96, G + 3, z, B.fence); } }
      for (const x of [111, 139]) w.box(x, G + 1, 55, x, G + 16, 55, B.steel);
      w.box(112, G + 10, 55, 138, G + 16, 55, B.emB); w.box(112, G + 10, 55, 138, G + 10, 55, B.emO); w.box(112, G + 16, 55, 138, G + 16, 55, B.emO);
      text(w, 'EMERCOM', 112, G + 11, 56, 1, 0, B.emW);
      landmarks.push({ name: 'EMERCOM 검문소', note: '은행 앞 구호소 · 상시 탈출구', p: [118, G + 22, 44], tag: 'EXFIL' });
      // 녹색 연막 탈출 신호: 울타리 문 앞
      const SX = 107, SZ = 57;
      w.set(SX, G + 1, SZ, B.chem); w.set(SX + 1, G + 1, SZ, B.steel);
      lights.push({ name: 'exfil', p: [SX + 0.5, G + 2, SZ + 0.5], c: '#6aff7a', i: 0.35, d: 20, flicker: 0.3, srcR: 3 });
      acts.push({
        name: '녹색 연막 · 탈출', hint: 'EMERCOM 검문소 문 앞에 녹색 연막이 피어올라 탈출 지점을 알려요', hit: [SX - 2, G + 1, SZ - 2, SX + 2, G + 3, SZ + 2],
        run: async a => {
          a.flash('exfil', 6, 6);
          for (let k = 0; k < 16; k++) {
            a.burst([SX + 0.5, G + 1.5, SZ + 0.5], { n: 26, colors: ['#5ad86a', '#8af09a', '#3a9a4a', '#c8f8d0'], speed: 1.6, up: 4, life: 2.6, gravity: -0.8, spread: 1 + k * 0.15 });
            await a.wait(0.3);
          }
          await a.wait(1);
        },
      });

      // ── 남쪽 대로: 노란 버스, 부서진 차들 ──
      const BX0b = 96, BX1b = 123, BZ0 = 113, BZ1 = 117;
      for (let x = BX0b; x <= BX1b; x++) for (let z = BZ0; z <= BZ1; z++) {
        const l = x - BX0b, side = z === BZ0 || z === BZ1, wh = (l === 3 || l === 4 || l === 21 || l === 22) && side, sc = hash3(x >> 1, 9, z) > 0.62 && x > 110;
        w.set(x, G + 1, z, wh ? B.tire : B.busYd);
        for (let y = G + 2; y <= G + 7; y++) {
          let b = sc ? B.burnt : B.busY;
          if (y === G + 7) b = sc ? B.rust : B.busTop;
          else if (y >= G + 4 && y <= G + 5 && (side || x === BX0b) && l % 3 !== 0) b = hash3(x, y, z) > 0.4 ? B.void : B.carGl;
          else if (y === G + 3 && side) b = sc ? B.burnt : B.busYd;
          w.set(x, y, z, b);
        }
      }
      w.box(BX0b, G + 2, BZ0 + 1, BX0b, G + 3, BZ1 - 1, B.headL);
      landmarks.push({ name: '미라 대로 노란 버스', note: '녹색 신호탄 탈출구 · 막힌 대로', p: [110, G + 16, 115] });
      car(w, 126, 113, 'x', B.carR);
      car(w, 84, 121, 'x', B.carB, { flip: true });
      car(w, 46, 114, 'x', B.carW);
      car(w, 74, 113, 'z', B.carS, { burnt: true });
      car(w, 140, 121, 'x', B.taxi);
      car(w, 44, 122, 'x', B.carG, { burnt: true });

      // ── 경찰 저지선(남서, 대로 서쪽 끝): 노란 철망 문(부품), 경찰차, 검은 SUV, 모래주머니 기관총 진지 ──
      const GXg = 24;
      w.box(GXg, G + 1, RZ0 - 3, GXg, G + 4, RZ0 - 1, B.hazard); w.box(GXg, G + 1, RZ1 + 1, GXg, G + 4, RZ1 + 3, B.hazard);
      const gateN = w.prop({ name: 'gateN', pivot: [GXg + 0.5, G + 1, 116] }), gateS = w.prop({ name: 'gateS', pivot: [GXg + 0.5, G + 1, 124] });
      for (const [p, z0, z1] of [[gateN, RZ0, 119], [gateS, 121, RZ1]]) for (let z = z0; z <= z1; z++) for (let y = G + 1; y <= G + 4; y++) {
        const edge = y === G + 1 || y === G + 4 || z === z0 || z === z1;
        if (edge || (y + z) % 2 === 0) p.set(GXg, y, z, edge ? B.hazard : B.fence);
      }
      gateN.box(GXg + 1, G + 2, 116, GXg + 1, G + 3, 118, B.concW); gateS.box(GXg + 1, G + 2, 123, GXg + 1, G + 3, 125, B.concW);
      car(w, 28, 114, 'x', B.carW, { stripe: B.polB });
      w.set(32, G + 5, 115, B.beaconB); w.set(32, G + 5, 116, B.beaconR);
      lights.push({ name: 'police', p: [32.5, G + 6, 115.5], c: '#4a7aff', i: 0.3, d: 22, flicker: 0.2, srcR: 3 });
      car(w, 28, 122, 'x', B.carDk, { flip: true });
      for (const [x, z] of [[18, 116], [20, 124], [16, 121]]) { w.line(x - 1, G + 1, z - 1, x + 1, G + 3, z + 1, B.rust); w.line(x + 1, G + 1, z - 1, x - 1, G + 3, z + 1, B.rust); w.line(x, G + 1, z + 1, x, G + 3, z - 1, B.iron); }
      const sandRing = (cx, cz) => { for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) { const d = Math.max(Math.abs(dx), Math.abs(dz)); if (d === 3 && !(dx === 3 && Math.abs(dz) < 2)) { w.set(cx + dx, G + 1, cz + dz, B.sand); w.set(cx + dx, G + 2, cz + dz, B.sand); if (dz === -3) w.set(cx + dx, G + 3, cz + dz, B.sand); } } };
      sandRing(30, 132);
      w.box(30, G + 1, 132, 30, G + 3, 132, B.iron); w.box(30, G + 4, 127, 30, G + 4, 132, B.iron); w.box(29, G + 4, 131, 31, G + 4, 133, B.steel); w.box(34, G + 1, 131, 35, G + 2, 132, B.crate);
      for (let k = 0; k < 5; k++) w.box(20 + k * 2, G + 1, 107, 21 + k * 2, G + 1, 108, B.trash);
      landmarks.push({ name: '경찰 저지선', note: '유료 탈출구(5000루블) · 기관총 진지', p: [GXg, G + 14, 120] });
      acts.push({
        name: '경찰 저지선 철망 문', hint: '대로를 막은 노란 철망 문이 양쪽으로 열리고 경찰차 경광등이 깜빡여요. 통행료는 5000루블이에요', hit: [GXg, G + 1, RZ0, GXg + 1, G + 4, RZ1],
        run: async a => {
          a.flash('police', 8, 4.5);
          for (let k = 0; k < 3; k++) a.burst([32.5, G + 6, 115.5 + (k % 2)], { n: 14, colors: k % 2 ? ['#ff3030', '#ff9a9a'] : ['#3a7aff', '#9ac0ff'], speed: 4, up: 0.4, life: 0.5, gravity: 0, spread: 0.5, flat: true });
          await Promise.all([a.move('gateN', [0, 0, -8], 1.6), a.move('gateS', [0, 0, 8], 1.6)]);
          for (let k = 0; k < 4; k++) { a.burst([32.5, G + 6, 115.5 + (k % 2)], { n: 14, colors: k % 2 ? ['#ff3030', '#ff9a9a'] : ['#3a7aff', '#9ac0ff'], speed: 4, up: 0.4, life: 0.5, gravity: 0, spread: 0.5, flat: true }); await a.wait(0.5); }
          await Promise.all([a.move('gateN', [0, 0, 0], 1.4), a.move('gateS', [0, 0, 0], 1.4)]);
        },
      });

      // ── 남쪽 거리(낮게): 물결 발코니 건물, 셔터 상점, 버스 정류장 ──
      for (let k = 0; k < 4; k++) {
        const y0 = G + 1 + k * 4, ex = (x, z, g) => ((x - 20) / (17 + g)) ** 2 + ((z - 150) / (10 + g)) ** 2 <= 1;
        for (let z = 136; z <= 159; z++) for (let x = 0; x <= 42; x++) {
          const wave = Math.sin((x + k * 3) * 0.35) * 0.9;
          if (ex(x, z, 1.6 + wave)) w.set(x, y0 + 3, z, B.concW);
          if (ex(x, z, 0)) { w.box(x, y0, z, x, y0 + 2, z, ex(x + 1, z, 0) && ex(x - 1, z, 0) && ex(x, z + 1, 0) && ex(x, z - 1, 0) ? B.concD : (x % 5 === 0 ? B.concL : B.glassK)); }
        }
      }
      for (const [x, z] of [[8, 146], [32, 146], [20, 141]]) w.box(x, G + 1, z, x + 1, G + 3, z + 1, B.concL);
      landmarks.push({ name: '물결 발코니 빌딩', note: '경찰 저지선 옆 하얀 곡선 띠', p: [20, G + 22, 150] });
      for (let x0 = 50; x0 < 110; x0 += 15) {
        const x1 = x0 + 13, top = G + 7 + (x0 % 2);
        w.box(x0, G + 1, 142, x1, top, 156, B.concW);
        for (let x = x0 + 1; x < x1; x++) for (let y = G + 1; y <= G + 4; y++) w.set(x, y, 142, (x - x0) % 5 === 0 ? B.concL : B.shutter);
        w.box(x0, G + 5, 141, x1, G + 5, 141, [B.signR, B.emB, B.carG, B.hazard][((x0 - 50) / 15) | 0]);
        w.box(x0, top + 1, 142, x1, top + 1, 156, B.concL);
      }
      w.box(120, G + 1, 133, 120, G + 4, 133, B.steel); w.box(128, G + 1, 133, 128, G + 4, 133, B.steel); w.box(120, G + 5, 132, 128, G + 5, 135, B.glassD); w.box(121, G + 1, 135, 127, G + 1, 135, B.wood);
      for (let x = 72; x <= 136; x += 4) if (pq(x, 107) > 1) w.box(x, G + 1, 107, x, G + 2, 107, B.iron);
      return { lights, landmarks, acts };
    },
  });
})();
