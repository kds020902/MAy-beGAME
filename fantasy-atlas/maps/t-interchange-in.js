// 울트라 쇼핑몰 가운데 갤러리(하위 지도) — 정문 뒤로 길게 뻗은 2층 복도: 가운데 빈 공간을 가로지르는 다리와 X자 에스컬레이터,
// 안쪽 줄 1층 KIBA 총포점·브루탈·더 내셔널, 2층 테크라이트·버거 스팟, 앞줄(낮게 잘라 냄) 비상사태부 의료소, 복도 끝 붉은 「Гошан」 입구.
// 복도 가운데 모래주머니 진지는 킬라의 자리(사람은 없고 헬멧·기관총·탄약통만). 정문 쪽 표지판으로 밖에 나간다.
// (게임 평면도에서 KIBA 줄은 복도 남쪽이지만, 카메라 쪽 벽을 낮추려고 180° 돌려 북쪽(안쪽)에 두었다)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 168, D = 96, Hh = 56;
  const FONT = {
    A: ['010', '101', '111', '101', '101'], B: ['110', '101', '110', '101', '110'], C: ['111', '100', '100', '100', '111'], D: ['110', '101', '101', '101', '110'],
    E: ['111', '100', '110', '100', '111'], F: ['111', '100', '110', '100', '100'], G: ['111', '100', '101', '101', '111'], H: ['101', '101', '111', '101', '101'],
    I: ['111', '010', '010', '010', '111'], J: ['001', '001', '001', '101', '111'], K: ['101', '101', '110', '101', '101'], L: ['100', '100', '100', '100', '111'],
    M: ['10001', '11011', '10101', '10001', '10001'], N: ['1001', '1101', '1011', '1001', '1001'], O: ['111', '101', '101', '101', '111'], P: ['111', '101', '111', '100', '100'],
    R: ['110', '101', '110', '101', '101'], S: ['111', '100', '111', '001', '111'], T: ['111', '010', '010', '010', '010'], U: ['101', '101', '101', '101', '111'],
    V: ['101', '101', '101', '101', '010'], Y: ['101', '101', '010', '010', '010'], Z: ['111', '001', '010', '100', '111'], '&': ['010', '101', '010', '101', '011'],
    'Г': ['1111', '1000', '1000', '1000', '1000'], 'О': ['0110', '1001', '1001', '1001', '0110'], 'Ш': ['10101', '10101', '10101', '10101', '11111'], 'А': ['0110', '1001', '1111', '1001', '1001'], 'Н': ['1001', '1001', '1111', '1001', '1001'],
  };
  // 글자 쓰기. face 's'는 남쪽(+z)을 보는 면(오른쪽 +x), 'e'는 동쪽(+x)을 보는 면(오른쪽 -z)
  const text = (w, s, x0, yTop, z0, face, b, sc, gap) => {
    sc = sc || 1; gap = gap == null ? 1 : gap;
    let u = 0;
    for (const ch of s) {
      const g = FONT[ch], gw = g ? g[0].length : 2;
      if (g) for (let r = 0; r < 5; r++) for (let c = 0; c < gw; c++) if (g[r][c] === '1') for (let sy = 0; sy < sc; sy++) for (let sx = 0; sx < sc; sx++) {
        const uu = u + c * sc + sx, y = yTop - r * sc - sy;
        if (face === 's') w.set(x0 + uu, y, z0, b); else w.set(x0, y, z0 - uu, b);
      }
      u += gw * sc + gap;
    }
    return u - gap;
  };
  const textW = (s, sc, gap) => [...s].reduce((a, ch) => a + (FONT[ch] ? FONT[ch][0].length : 2) * sc + gap, -gap);

  MAPS.push({
    id: 'interchange-in', cat: 'tarkov', sub: true, parent: 'interchange', name: '울트라 가운데 갤러리', en: 'Interchange · ULTRA Central Gallery', color: '#c8302a', seed: 655, base: 12, time: 'day', size: [W, D, Hh],
    desc: '울트라 정문 뒤로 길게 뻗은 2층 갤러리. 천창 철골 아래 빈 공간을 다리 하나가 가로지르고, 그 양쪽으로 에스컬레이터가 X자로 내려온다. 안쪽 줄 1층에는 다이아몬드 무늬 간판의 총포점 KIBA와 브루탈, 2층에는 붉은 사선 간판의 테크라이트. 복도 한가운데 모래주머니 진지에는 킬라가 남긴 헬멧과 기관총, 탄약통이 있다. 복도 끝은 붉은 「Гошан」 하이퍼마켓 입구, 앞줄에는 비상사태부 의료소와 무너진 바닥 구멍.',
    info: { title: '장소 정보', en: 'TARKOV · ULTRA', rows: [['자리', '울트라 정문 뒤 가운데 복도(1·2층)'], ['상점', 'KIBA · 브루탈 · 테크라이트 · 버거 스팟 · 맨티스'], ['보스', '킬라 — 복도 가운데 진지(장비만 남음)'], ['밖으로', '정문 쪽 표지판']] },
    sky: ['#c8d4dc', '#7a8ea4', '#ece4d4'], stars: false,
    hemi: ['#eef0f2', '#4a4640', 0.56], sun: ['#fff4e4', 0.62, [0.4, 1, 0.6]],
    night: { sky: ['#24262e', '#0a0c12', '#6a5a50'], stars: true, hemi: ['#8a90a8', '#14121a', 0.32], sun: ['#b8c0e0', 0.2, [0.4, 1, 0.6]], haze: '#202228' },
    fog: { start: 0.9, floor: 4, depth: 6, haze: [20, 0.08, 6], hazeColor: '#d8d4cc' },
    camY: -8, zoom: 1.75,
    particles: [
      { n: 120, colors: ['#e8e4d8', '#ffffff', '#c8c0b0'], mode: 'fall', speed: 0.08, area: [84, 48, 4], y0: 14, y1: 34, glow: false },
    ],
    blocks: Object.assign(OR.blocks(), {
      tile: { c: '#a8a6a0', top: '#bcbab2', v: 0.03, pat: 'check', alt: '#b2b0a8' }, tileD: { c: '#8e8c86', top: '#9c9a92', v: 0.05 }, concDk: { c: '#4e4c48', v: 0.05 }, rock: { c: '#6a665e', v: 0.06 },
      wallW: { c: '#d0ceca', v: 0.03 }, wallG: { c: '#9a9894', v: 0.03 }, wallD: { c: '#5e5e60', v: 0.03 }, slab: { c: '#bcbab4', top: '#c8c6be', bot: '#8a8884', v: 0.03 },
      col: { c: '#7a7c80', v: 0.02 }, steel: { c: '#4e5258', v: 0.02 }, truss: { c: '#9aa0a6', v: 0.02 }, glassF: { c: '#5a6a74', v: 0.03 }, glassR: { c: '#9ab4be', v: 0.02 }, glassD: { c: '#2a323a', v: 0.03 },
      esc: { c: '#a8acb0', v: 0.02 }, escT: { c: '#6a6e72', top: '#7a7e82', v: 0.02 }, escY: { c: '#d8b030', v: 0.02 }, rubber: { c: '#1e1e22', v: 0.02 },
      kibaK: { c: '#1c1e22', v: 0.02 }, kibaW: { c: '#ecebe4', v: 0.02 }, kibaL: { c: '#c8ccd4', v: 0.02 }, kibaBl: { c: '#2a3446', v: 0.02 }, grate: { c: '#8a8e94', v: 0.02 }, target: { c: '#e8e4dc', v: 0.02 },
      techR: { c: '#e0302a', v: 0.02 }, techK: { c: '#1a1a1c', v: 0.02 }, burgY: { c: '#f0b030', v: 0.03 }, burgR: { c: '#c8302a', v: 0.03 }, brutK: { c: '#141416', v: 0.02 }, natB: { c: '#2a4a6a', v: 0.03 },
      mantC: { c: '#3ac8d8', v: 0.02 }, jacobT: { c: '#2a7a8a', v: 0.03 }, pinkS: { c: '#e070a0', v: 0.03 }, cafeO: { c: '#b8743a', v: 0.03 }, starY: { c: '#e8c030', v: 0.03 }, bizG: { c: '#4a8a6a', v: 0.03 },
      gosR: { c: '#d0302a', v: 0.02 }, gosG: { c: '#3aa04a', v: 0.02 }, gosBand: { c: '#e4e2dc', v: 0.02 }, shelf: { c: '#9aa0a4', v: 0.03 }, goodR: { c: '#c03a3a', v: 0.08 }, goodB: { c: '#3a6ab0', v: 0.08 }, goodG: { c: '#4a8a3a', v: 0.08 }, goodY: { c: '#e8c040', v: 0.08 },
      shutter: { c: '#8a8e92', v: 0.02, pat: 'log' }, tarpO: { c: '#6a6a48', v: 0.06 }, tarpO2: { c: '#5a5c3e', v: 0.06 }, tarpB: { c: '#3a5a8a', v: 0.04 }, crossR: { c: '#c83030', v: 0.02 }, tarpW: { c: '#d8d8d0', v: 0.03 },
      sandb: { c: '#a89a74', v: 0.08, pat: 'stone' }, sandb2: { c: '#968a68', v: 0.08 }, crate: { c: '#5e6644', v: 0.05, pat: 'plank' }, ammo: { c: '#4e5a3a', v: 0.04 }, gun: { c: '#1a1a1c', v: 0.02 }, wood: { c: '#8a6a48', v: 0.05, pat: 'plank' },
      helm: { c: '#4e5636', v: 0.03 }, visor: { c: '#2a2e2a', v: 0.02 }, rubble: { c: '#8a867e', v: 0.12, pat: 'stone' }, rebar: { c: '#6a3e2a', v: 0.06 }, dark: { c: '#121214', v: 0.02 }, paper: { c: '#e4e0d4', v: 0.04 },
      plant: { c: '#4a6a3a', v: 0.1 }, pot: { c: '#7a7672', v: 0.03 }, bench: { c: '#6a4a32', v: 0.04 }, rack: { c: '#7a7e84', v: 0.02 }, cloth1: { c: '#3a4a7a', v: 0.06 }, cloth2: { c: '#9a3a4a', v: 0.06 }, cloth3: { c: '#c8c0a8', v: 0.06 },
      lampOff: { c: '#d8d4c4', v: 0.02 }, lampW: { c: '#fff4d0', glow: true }, lampN: { c: '#ffe8b0', night: true, day: '#e8e4d4' }, alarmR: { c: '#ff3a2a', glow: true }, ember: { c: '#ff7a2a', glow: true }, neonR: { c: '#ff4a3a', glow: true },
    }),
    build(w) {
      const B = w.id, G = w.base, F2 = G + 11, RF = G + 23;
      const X0 = 4, X1 = 162, NZ = 8, SF = 30, S2 = 22, VZ0 = 38, VZ1 = 58, SZ = 60, SZ1 = 80;   // 북벽, 북 상점 앞면, 빈 공간, 남 상점 앞면, 남벽
      const lights = [], acts = [], landmarks = [];
      const h = (x, z, k) => hash3(x, k || 0, z);

      // ── 바닥: 밝은 회색 타일(먼지·종이), 건물 밖은 어두운 콘크리트 ──
      MH.terrain(w, {
        floor: G - 3, height: () => G,
        surface: (x, z) => (x < X0 || x > X1 || z < NZ || z > SZ1) ? B.concDk : (h(x >> 1, z >> 1, 3) > 0.9 ? B.tileD : B.tile),
        under: (x, z, y, dep) => dep < 2 ? B.concDk : B.rock,
      });

      // ── 북쪽(안쪽) 벽과 2층: 2층 가게는 뒤로 물러앉고(S2) 그 앞 회랑이 1층 가게 위를 덮는다. 다리만 빈 공간을 건넌다 ──
      w.box(X0, G + 1, NZ, X1, RF, NZ, B.wallG);
      for (let x = X0; x <= X1; x++) for (let z = NZ; z <= SF; z++) w.set(x, F2, z, B.slab);
      for (let x = X0 + 1; x < X1; x++) if (x < 72 || x > 80) { w.set(x, F2 + 1, SF, x % 4 === 0 ? B.steel : B.glassR); w.set(x, F2 + 2, SF, B.steel); }
      for (let x = 10; x <= X1 - 4; x += 12) w.box(x, G + 1, VZ1 + 1, x, G + 4, VZ1 + 1, B.col);
      // 천창 철골: 24칸마다 남북 보, 가운데 등마루, 매달린 등
      for (let x = 22; x <= X1 - 4; x += 24) { for (let z = NZ; z <= VZ1 + 1; z++) { w.set(x, RF, z, B.truss); if (z % 3 === 0) w.set(x, RF - 1, z, B.truss); } w.box(x, F2 + 1, NZ + 1, x, RF, NZ + 1, B.col); }
      for (let x = X0; x <= X1; x += 2) w.set(x, RF + 1, 48, B.truss);
      const lamps = [];
      for (let x = 16; x <= X1 - 6; x += 12) { w.set(x, RF, 48, B.truss); w.box(x, RF - 3, 48, x, RF - 1, 48, B.steel); w.set(x, RF - 4, 48, x % 24 === 16 ? B.lampN : B.lampOff); lamps.push([x + 0.5, RF - 4, 48.5]); }
      for (let x = 14; x <= X1 - 6; x += 12) if (x < 70 || x > 82) { w.set(x, F2 - 1, SF, B.lampN); lamps.push([x + 0.5, F2 - 1, SF + 0.5]); }

      // ── 상점 앞면(북쪽 줄, 남쪽을 본다): 칸막이벽, 유리(1~5), 간판 띠(6~10) ──
      const shop = (x0, x1, y0, o) => {
        const fz = y0 === G ? SF : S2;
        for (let x = x0; x <= x1; x++) for (let y = y0 + 1; y <= y0 + 10; y++) {
          const yy = y - y0, edge = x === x0 || x === x1;
          let b;
          if (edge) b = B.wallW;
          else if (yy >= 6) b = o.band ? o.band(x, y) : B.wallD;
          else if (o.shut) b = yy <= 4 ? B.shutter : B.steel;
          else b = ((x - x0) % 5 === 0 || yy === 5) ? B.steel : (o.door && x >= o.door[0] && x <= o.door[1] && yy <= 4 ? 0 : B.glassF);
          w.set(x, y, fz, b);
        }
        for (const x of [x0, x1]) w.box(x, y0 + 1, NZ + 1, x, y0 + 10, fz, B.wallW);
        if (o.sign) { const tw = textW(o.sign, 1, 1); text(w, o.sign, Math.round((x0 + x1) / 2 - tw / 2), y0 + 10, fz + 1, 's', o.signB, 1, 1); }
      };
      // 1층: 카페 · 프리티 라이츠 · (KIBA) · 브루탈 · 더 내셔널 · 셔터 내린 빈 가게
      shop(6, 24, G, { band: () => B.cafeO, sign: 'CAFE', signB: B.kibaW, door: [12, 16] });
      shop(24, 42, G, { band: () => B.kibaW, sign: 'LIGHTS', signB: B.pinkS, door: [30, 34] });
      shop(42, 66, G, { band: () => B.brutK, sign: 'BRUTAL', signB: B.kibaW, door: [50, 56] });
      shop(66, 98, G, { band: () => B.natB, sign: 'NATIONAL', signB: B.kibaW, door: [78, 86] });
      shop(132, 146, G, { shut: true, band: () => B.wallD });
      // 2층: 맨티스 · 테크라이트 · 버거 스팟 · 제이콥&제이콥스
      shop(6, 36, F2, { band: () => B.dark, sign: 'MANTIS', signB: B.mantC, door: [18, 24] });
      shop(36, 76, F2, { band: (x, y) => ((x + y) >> 1) % 2 ? B.techR : B.techK, door: [52, 60] });
      for (let x = 42; x <= 70; x++) for (let y = F2 + 6; y <= F2 + 10; y++) w.set(x, y, S2 + 1, (x === 42 || x === 70 || y === F2 + 6 || y === F2 + 10) ? B.techK : B.techR);
      text(w, 'TECHLIGHT', 56 - (textW('TECHLIGHT', 1, 1) >> 1), F2 + 9, S2 + 2, 's', B.kibaW, 1, 1);
      shop(76, 104, F2, { band: () => B.dark, door: [86, 94] });
      w.ellipsoid(90, F2 + 8, S2 + 1, 5, 2.4, 0.6, B.burgY); w.box(87, F2 + 8, S2 + 2, 93, F2 + 8, S2 + 2, B.burgR);
      shop(104, 132, F2, { band: () => B.jacobT, sign: 'JACOB&JACOBS', signB: B.kibaW, door: [114, 122] });
      shop(132, 150, F2, { shut: true });
      landmarks.push({ name: '테크라이트', note: '2층 붉은·검은 사선 간판의 전자제품점', p: [56, F2 + 16, S2] });
      // 상점 안: 진열대·옷걸이(유리 너머로 살짝 보인다)
      for (const [x0, x1, y0, kind] of [[7, 23, G, 'cafe'], [25, 41, G, 'rack'], [43, 65, G, 'rack'], [67, 97, G, 'rack'], [7, 35, F2, 'rack'], [37, 75, F2, 'tech'], [77, 103, F2, 'cafe'], [105, 131, F2, 'rack']])
        for (let x = x0 + 2; x <= x1 - 2; x += 4) for (let z = NZ + 4; z <= (y0 === G ? SF : S2) - 4; z += 5) {
          if (kind === 'cafe') { w.box(x, y0 + 1, z, x + 1, y0 + 2, z + 1, B.wood); }
          else if (kind === 'tech') { w.box(x, y0 + 1, z, x, y0 + 4, z + 2, B.shelf); w.set(x, y0 + 3, z + 1, h(x, z, 2) > 0.5 ? B.goodB : B.dark); }
          else { w.box(x, y0 + 4, z, x, y0 + 4, z + 2, B.rack); w.box(x, y0 + 1, z + 1, x, y0 + 3, z + 1, B.rack); w.box(x, y0 + 2, z, x, y0 + 3, z, [B.cloth1, B.cloth2, B.cloth3][(h(x, z, 4) * 3) | 0]); }
        }

      // ── KIBA 총포점: 어두운 유리, 흰 다이아몬드 무늬 간판 띠, 가운데 흰 기둥(사자)과 흰 문(부품), 안쪽 쇠창살 문과 표적·총걸이 ──
      const KX0 = 100, KX1 = 132, KC = 116;
      shop(KX0, KX1, G, { band: (x, y) => { const yy = y - G - 8, u = ((x % 6) + 6) % 6; return (Math.abs(u - 3) === Math.abs(yy) + 1 || y === G + 6) ? B.kibaL : B.kibaK; } });
      for (let x = KC - 8; x <= KC + 8; x++) for (let y = G + 1; y <= G + 10; y++) if (y >= G + 5 || Math.abs(x - KC) <= 3) w.set(x, y, SF, B.kibaW);
      text(w, 'KIBA', KC - 7, G + 10, SF + 1, 's', B.kibaK, 1, 1);
      for (const [dx, dy] of [[0, 0], [1, 0], [-1, 0], [0, 1], [1, 1], [-1, -1], [1, -1]]) { w.set(KC - 6 + dx, G + 3 + dy, SF + 1, B.kibaK); }   // 사자 무늬(문 옆 흰 기둥)
      const door = w.prop({ name: 'kibaDoor', pivot: [KC - 1.5, G + 1, SF + 0.5] });
      door.box(KC - 1, G + 1, SF + 1, KC + 1, G + 4, SF + 1, B.kibaW); door.set(KC + 1, G + 2, SF + 1, B.steel);
      for (let x = KC - 1; x <= KC + 1; x++) for (let y = G + 1; y <= G + 4; y++) w.set(x, y, SF, 0);
      for (let x = KC - 1; x <= KC + 1; x++) for (let y = G + 1; y <= G + 4; y++) w.set(x, y, SF - 2, (x + y) % 2 ? B.grate : 0);     // 쇠창살 안문
      w.box(KC - 2, G + 1, SF - 2, KC - 2, G + 4, SF - 1, B.wallW); w.box(KC + 2, G + 1, SF - 2, KC + 2, G + 4, SF - 1, B.wallW); w.box(KC - 2, G + 5, SF - 2, KC + 2, G + 5, SF - 1, B.wallW);
      for (const x of [KX0 + 4, KX0 + 9, KX1 - 9, KX1 - 4]) { w.box(x, G + 1, NZ + 3, x, G + 2, NZ + 3, B.steel); w.box(x - 1, G + 3, NZ + 3, x + 1, G + 6, NZ + 3, B.target); w.set(x, G + 7, NZ + 3, B.target); w.set(x, G + 4, NZ + 3, B.burgR); }
      for (let x = KX0 + 2; x <= KX1 - 2; x++) { w.set(x, G + 1, SF - 4, B.sandb); if (x % 3) w.set(x, G + 2, SF - 4, B.sandb2); }
      for (let z = NZ + 6; z <= SF - 6; z++) { w.box(KX0 + 1, G + 2, z, KX0 + 1, G + 6, z, B.wood); if (z % 2) w.box(KX0 + 2, G + 3, z, KX0 + 2, G + 5, z, B.gun); w.box(KX1 - 1, G + 2, z, KX1 - 1, G + 6, z, B.wood); if (z % 2 === 0) w.box(KX1 - 2, G + 3, z, KX1 - 2, G + 5, z, B.gun); }
      w.set(KC + 10, G + 10, SF + 1, B.alarmR);
      lights.push({ name: 'kiba', p: [KC + 10.5, G + 10, SF + 1.5], c: '#ff3a2a', i: 0.45, d: 22, flicker: 0.3, srcR: 4 });
      landmarks.push({ name: 'KIBA 총포점', note: '흰 사자 기둥과 흰 문 · 안쪽 쇠창살 문', p: [KC, G + 16, SF], boss: false });
      acts.push({
        name: 'KIBA 문 열기', hint: 'KIBA 총포점의 흰 바깥문이 열리고 경보가 울리며 붉은 등이 번쩍여요', hit: [KC - 8, G + 1, SF, KC + 8, G + 10, SF + 1],
        run: async a => {
          await a.turn('kibaDoor', [0, 1.6, 0], 0.9);
          for (let k = 0; k < 6; k++) { a.flash('kiba', 8, 0.35); a.burst([KC + 10.5, G + 10, SF + 1.5], { n: 18, colors: ['#ff3a2a', '#ffb0a0'], speed: 4, up: 1, life: 0.5, gravity: 0, spread: 1 }); await a.wait(0.5); }
          await a.turn('kibaDoor', [0, 0, 0], 0.9);
        },
      });

      // ── 가운데 다리(2층) ──
      for (let x = 72; x <= 80; x++) for (let z = SF + 1; z <= VZ1; z++) { w.set(x, F2, z, B.slab); if ((x === 72 && (z < 49 || z > 57)) || (x === 80 && (z < 40 || z > 48))) { w.set(x, F2 + 1, z, z % 4 === 0 ? B.steel : B.glassR); w.set(x, F2 + 2, z, B.steel); } }
      for (const z of [VZ0, VZ1]) w.box(72, G + 1, z, 72, F2 - 1, z, B.col);
      w.box(80, G + 1, VZ1, 80, F2 - 1, VZ1, B.col);
      for (let x = 72; x <= 80; x++) w.set(x, F2, VZ1 + 1, B.slab);

      // ── 에스컬레이터 넷: 다리 동쪽으로 내려가는 한 쌍, 서쪽으로 내려가는 한 쌍(X자). 디딤판은 부품으로 흐른다 ──
      const escs = [];
      const esc = (z0, dir, name) => {
        // dir +1: 다리 동쪽 끝(x 81)에서 동쪽으로 내려감, -1: 다리 서쪽 끝(x 71)에서 서쪽으로
        const xs = dir > 0 ? 81 : 71, p = w.prop({ name, pivot: [xs + dir * 11, G + 6, z0 + 1.5], clipOK: 3 });
        for (let i = 0; i < 22; i++) {
          const x = xs + dir * i, ty = F2 - Math.floor(i / 2);
          for (let z = z0; z <= z0 + 2; z++) { for (let y = G + 1; y < ty; y++) w.set(x, y, z, B.esc); p.set(x, ty, z, i % 2 ? B.escT : B.escY); }
          for (const sz of [z0 - 1, z0 + 3]) { w.box(x, Math.max(G + 1, ty - 1), sz, x, ty, sz, B.esc); w.set(x, ty + 1, sz, B.steel); }
        }
        escs.push(name);
      };
      esc(41, 1, 'escA'); esc(45, 1, 'escB'); esc(50, -1, 'escC'); esc(54, -1, 'escD');
      acts.push({
        name: '에스컬레이터 가동', hint: '멈춰 있던 X자 에스컬레이터 넷이 다시 움직여요. 한쪽은 오르고 한쪽은 내려가요', hit: [50, G + 1, 40, 102, F2 + 2, 57],
        run: async a => {
          for (let k = 0; k < 10; k++) {
            await Promise.all([a.move('escA', [-2, 1, 0], 0.45, t => t), a.move('escB', [2, -1, 0], 0.45, t => t), a.move('escC', [2, 1, 0], 0.45, t => t), a.move('escD', [-2, -1, 0], 0.45, t => t)]);
            await Promise.all(escs.map(n => a.move(n, [0, 0, 0], 0.001)));
            if (k % 3 === 0) a.burst([76, F2 + 2, 48], { n: 10, colors: ['#d8d4c4', '#ffffff'], speed: 1, up: 1, life: 0.6, gravity: 1, spread: 5 });
          }
        },
      });

      // ── 킬라의 진지: 복도 가운데 모래주머니 U자, 받침대 위 기관총, 상자 위 초록 헬멧(마스카), 탄약통 ──
      const NX = 116, NZm = 46;
      for (let dx = -6; dx <= 6; dx++) for (let dz = -4; dz <= 4; dz++) {
        const e = Math.abs(dx) === 6 || dz === 4 || (dz === -4 && Math.abs(dx) > 2);
        if (!e) continue;
        w.set(NX + dx, G + 1, NZm + dz, B.sandb); w.set(NX + dx, G + 2, NZm + dz, (dx + dz) & 1 ? B.sandb2 : B.sandb); if (dz === 4 && h(dx, 1, dz) > 0.4) w.set(NX + dx, G + 3, NZm + dz, B.sandb);
      }
      w.box(NX - 1, G + 3, NZm + 4, NX - 1, G + 3, NZm + 4, B.steel);
      w.box(NX - 1, G + 4, NZm + 4, NX - 1, G + 4, NZm + 7, B.gun); w.box(NX - 1, G + 5, NZm + 3, NX - 1, G + 5, NZm + 4, B.gun); w.set(NX - 1, G + 3, NZm + 6, B.gun);   // 양각대 위 기관총(남쪽을 겨눔)
      w.box(NX + 2, G + 1, NZm - 1, NX + 4, G + 2, NZm + 1, B.crate);
      w.ellipsoid(NX + 3, G + 3.5, NZm, 1.2, 1, 1.2, B.helm, (dx, dy) => dy >= -0.3); w.box(NX + 3, G + 3, NZm + 1, NX + 4, G + 4, NZm + 1, B.visor);
      for (const [x, z] of [[NX - 4, NZm - 2], [NX - 4, NZm], [NX - 3, NZm - 2]]) w.box(x, G + 1, z, x, G + 2, z, B.ammo);
      w.box(NX - 2, G + 1, NZm - 3, NX + 1, G + 1, NZm - 2, B.tarpO2);
      w.set(NX + 5, G + 1, NZm + 2, B.helm);
      lights.push({ name: 'nest', p: [NX - 0.5, G + 4.5, NZm + 8], c: '#ffb04a', i: 0.4, d: 18, flicker: 0.4, srcR: 4 });
      w.set(NX - 1, G + 4, NZm + 8, B.ember);
      landmarks.push({ name: '킬라의 진지', note: '모래주머니 · 기관총 · 마스카 헬멧(사람은 없음)', p: [NX, G + 12, NZm], boss: true });
      acts.push({
        name: '킬라의 진지', hint: '모래주머니 진지에서 연막탄이 터지고, 받침대 위 기관총이 불을 뿜어 탄피가 튀어요', hit: [NX - 6, G + 1, NZm - 4, NX + 6, G + 5, NZm + 8],
        run: async a => {
          for (let k = 0; k < 6; k++) { a.burst([NX + 4, G + 1.5, NZm - 6], { n: 30, colors: ['#e8e8e4', '#d0d0cc', '#ffffff'], speed: 1.4, up: 1.5, life: 3, gravity: -0.2, spread: 2.5 }); await a.wait(0.15); }
          for (let k = 0; k < 12; k++) {
            a.flash('nest', k % 2 ? 1 : 7, 0.12);
            a.burst([NX - 0.5, G + 4.5, NZm + 8], { n: 10, colors: ['#ffe08a', '#ff9a3a', '#ffffff'], speed: 4, up: 0.3, life: 0.2, gravity: 0, spread: 0.3 });
            a.burst([NX + 0.5, G + 4.5, NZm + 4], { n: 3, colors: ['#d8a840', '#c89030'], speed: 2, up: 3, life: 0.6, gravity: 8, spread: 0.3 });
            await a.wait(0.12);
          }
          for (let k = 0; k < 6; k++) { a.burst([NX + 4, G + 1.5, NZm - 6], { n: 24, colors: ['#e8e8e4', '#d0d0cc'], speed: 1.6, up: 1.2, life: 3, gravity: -0.2, spread: 3 }); await a.wait(0.3); }
        },
      });

      // ── 남쪽(앞줄) 1층 가게: 벽을 낮게 잘라 안이 보인다. 비상사태부 의료소(파란 천막·붉은 십자) ──
      const low = G + 4;
      const lowShop = (x0, x1, band, o) => {
        o = o || {};
        for (let x = x0; x <= x1; x++) for (let y = G + 1; y <= low; y++) w.set(x, y, SZ, (x === x0 || x === x1) ? B.wallW : (y === low ? band : (o.open && x > x0 + 2 && x < x1 - 2 ? 0 : ((x - x0) % 5 === 0 ? B.steel : B.glassF))));
        for (const x of [x0, x1]) w.box(x, G + 1, SZ, x, G + 2, SZ1, B.wallW);
      };
      w.box(X0, G + 1, SZ1, X1, G + 1, SZ1, B.wallG);
      lowShop(6, 24, B.bizG); lowShop(24, 42, B.wallD, { open: 1 }); lowShop(60, 84, B.tarpB, { open: 1 }); lowShop(84, 104, B.starY); lowShop(104, 124, B.mantC);
      for (let x = 8; x <= 22; x += 4) for (let z = SZ + 4; z <= SZ1 - 4; z += 6) { w.box(x, G + 3, z, x, G + 3, z + 2, B.rack); w.box(x, G + 1, z + 1, x, G + 2, z + 1, B.rack); w.box(x, G + 2, z, x, G + 2, z + 2, [B.cloth1, B.cloth2, B.cloth3][(h(x, z, 6) * 3) | 0]); }
      for (let x = 86; x <= 102; x += 4) for (let z = SZ + 4; z <= SZ1 - 4; z += 5) { w.box(x, G + 1, z, x + 1, G + 2, z + 2, B.shelf); w.set(x, G + 3, z + 1, [B.goodR, B.goodB, B.goodY][(h(x, z, 7) * 3) | 0]); }
      for (let x = 106; x <= 122; x += 4) for (let z = SZ + 4; z <= SZ1 - 4; z += 6) { w.box(x, G + 3, z, x, G + 3, z + 2, B.rack); w.box(x, G + 2, z, x, G + 2, z + 2, B.cloth1); }
      // 의료소: 파란 천막 지붕, 붉은 십자, 들것과 약상자
      for (let x = 61; x <= 83; x++) for (let z = SZ + 1; z <= SZ1 - 1; z++) { const y = G + 6 - Math.floor(Math.abs(z - 70) / 4); if (Math.abs(z - 70) <= 9) w.set(x, y, z, (x - 61) % 8 === 0 ? B.tarpW : B.tarpB); }
      for (const x of [66, 78]) { for (const [dx, dy] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) w.set(x + dx, G + 3 + dy, SZ + 1, B.crossR); }
      for (const z of [64, 70, 76]) { w.box(63, G + 1, z, 70, G + 1, z + 1, B.steel); w.box(63, G + 2, z, 70, G + 2, z + 1, B.tarpW); }
      for (const [x, z] of [[74, 64], [76, 66], [74, 74], [80, 72]]) { w.box(x, G + 1, z, x + 1, G + 2, z + 1, B.crate); w.set(x, G + 3, z, B.crossR); }
      landmarks.push({ name: '비상사태부 의료소', note: '파란 천막과 붉은 십자 · 들것', p: [72, G + 12, 70] });
      lights.push({ name: 'med', p: [72, G + 4, 66], c: '#c8e0ff', i: 0.35, d: 18, flicker: 0.2, srcR: 4 });
      w.set(72, G + 5, 66, B.lampW);
      acts.push({
        name: '의료소 불빛', hint: '비상사태부 의료소 천막 안 등이 깜빡이다 켜지고 붉은 십자가 환해져요', hit: [61, G + 1, SZ, 83, G + 6, SZ1],
        run: async a => { for (let k = 0; k < 8; k++) { a.flash('med', k % 2 ? 0.1 : 5, 0.2); await a.wait(0.22); } a.flash('med', 5, 3); for (const x of [66, 78]) a.burst([x + 0.5, G + 3, SZ + 1.5], { n: 20, colors: ['#ff6a6a', '#ffffff'], speed: 1.5, up: 1, life: 0.8, gravity: 0, spread: 1 }); await a.wait(3); },
      });

      // ── 무너진 바닥(앞줄 서쪽): 올리브색 천막 벽으로 두른 구멍, 아래 지하 주차장이 비친다 ──
      const HX = 30, HZ = 49;
      for (let dx = -6; dx <= 6; dx++) for (let dz = -5; dz <= 5; dz++) {
        const d = Math.hypot(dx / 6, dz / 5); if (d > 1) continue;
        const x = HX + dx, z = HZ + dz;
        if (d < 0.78) { for (let y = G - 3; y <= G; y++) w.set(x, y, z, 0); w.set(x, G - 3, z, h(x, z, 8) > 0.7 ? B.rubble : B.dark); }
        else if (h(x, z, 9) > 0.4) w.set(x, G + 1, z, B.rubble);
      }
      for (const [x, z] of [[HX - 1, HZ], [HX + 2, HZ + 1]]) w.set(x, G - 2, z, B.lampW);
      for (let x = HX - 8; x <= HX + 8; x++) for (let y = G + 1; y <= G + 5; y++) w.set(x, y, HZ - 7, (x + y) % 5 === 0 ? B.tarpO2 : B.tarpO);
      for (let z = HZ - 7; z <= HZ + 2; z++) for (let y = G + 1; y <= G + 5; y++) w.set(HX - 9, y, z, (z + y) % 5 === 0 ? B.tarpO2 : B.tarpO);
      for (const [x, z] of [[HX - 8, HZ + 4], [HX - 8, HZ + 5], [HX + 7, HZ - 5]]) w.box(x, G + 1, z, x + 1, G + 2, z, B.sandb);
      w.line(HX - 4, G + 1, HZ - 1, HX + 2, G - 2, HZ + 2, B.rebar);
      const chunk = w.prop({ name: 'slabChunk', pivot: [HX + 7, G + 1, HZ - 3] });
      chunk.box(HX + 6, G + 1, HZ - 4, HX + 8, G + 1, HZ - 2, B.slab);
      acts.push({
        name: '무너진 바닥', hint: '바닥 구멍 가장자리의 콘크리트 덩이가 아래 지하로 떨어지며 먼지가 피어올라요', hit: [HX - 6, G - 2, HZ - 5, HX + 8, G + 2, HZ + 5],
        run: async a => {
          await a.tween('slabChunk', { off: [-4, 0, 1], rot: [0, 0, 0.4] }, 0.6);
          await a.tween('slabChunk', { off: [-6, -4, 2], rot: [0.3, 0, 1.2] }, 0.5);
          for (let k = 0; k < 6; k++) { a.burst([HX + 0.5, G - 1, HZ + 0.5], { n: 26, colors: ['#c8c0b0', '#a8a094', '#e8e0d0'], speed: 2.5, up: 3, life: 1.6, gravity: 0.6, spread: 3 }); await a.wait(0.25); }
          await a.wait(0.8);
          await a.respawn('slabChunk', 1.0);
        },
      });
      landmarks.push({ name: '무너진 바닥', note: '천막 벽 안쪽의 구멍 · 아래는 지하 주차장', p: [HX, G + 10, HZ] });

      // ── 서쪽 끝: 고샨 하이퍼마켓 입구(넓은 문, 위에 붉은 「ГОШАН」) ──
      const GZ0 = 34, GZ1 = 62;
      for (let z = NZ; z <= SZ1; z++) for (let y = G + 1; y <= (z >= GZ0 - 6 && z <= GZ1 + 6 ? RF : (z < SF + 1 ? RF : G + 4)); y++) w.set(X0, y, z, B.wallG);
      for (let z = GZ0; z <= GZ1; z++) for (let y = G + 1; y <= G + 7; y++) w.set(X0, y, z, 0);
      for (let z = GZ0 - 4; z <= GZ1 + 4; z++) for (let y = G + 9; y <= G + 17; y++) w.set(X0 + 1, y, z, B.gosBand);
      const gw = textW('ГОШАН', 2, 2);
      text(w, 'ГОШАН', X0 + 2, G + 15, Math.round((GZ0 + GZ1) / 2 + gw / 2), 'e', B.gosR, 2, 2);
      for (const [dz, dy] of [[0, 0], [-1, 0], [-1, 1], [-2, 1], [1, 1], [0, 2]]) w.set(X0 + 2, G + 16 + dy, Math.round((GZ0 + GZ1) / 2 + gw / 2) + 3 + dz, B.gosG);
      for (let z = GZ0; z <= GZ1; z += 4) { w.box(1, G + 1, z, 2, G + 2, z + 1, B.shelf); w.set(1, G + 3, z, B.goodG); }
      for (let z = GZ0 + 2; z <= GZ1 - 2; z += 6) { w.box(X0 + 2, G + 1, z, X0 + 3, G + 2, z + 2, B.wallD); w.set(X0 + 3, G + 3, z + 1, B.steel); }   // 계산대
      lights.push({ name: 'goshan', p: [X0 + 3.5, G + 18, 48], c: '#ffd8b0', i: 0.4, d: 26, flicker: 0.05, srcR: 8 });
      for (let z = GZ0 - 2; z <= GZ1 + 2; z += 4) w.set(X0 + 2, G + 18, z, B.lampN);
      landmarks.push({ name: '고샨 입구', note: '복도 끝 붉은 「Гошан」 하이퍼마켓', p: [X0, G + 24, 48] });

      // ── 동쪽 끝: 정문 쪽 낮은 유리벽과 문, 밖으로 나가는 표지판 ──
      for (let z = NZ; z <= SZ1; z++) for (let y = G + 1; y <= (z <= SF ? RF : G + 3); y++) w.set(X1, y, z, z <= SF ? B.wallG : ((z % 4 === 0 || y === G + 3) ? B.steel : (z >= 44 && z <= 52 ? 0 : B.glassF)));
      for (let x = 148; x < X1; x++) w.set(x, G, 48, B.tileD);
      const sp = OR.signpost(w, B, 152, 42, { dir: [1, 0], boards: 1 });
      acts.push(OR.goAct({ at: sp, name: '밖으로', goto: 'interchange', hint: '유리 정문으로 나가 울트라 앞 주차장과 분수 광장으로 돌아가요' }));

      // ── 전원 복구: 꺼진 등이 하나씩 켜진다 ──
      w.box(150, G + 1, SF - 1, 152, G + 4, SF - 1, B.steel); w.set(151, G + 5, SF - 1, B.alarmR);
      const lever = w.prop({ name: 'lever', pivot: [151.5, G + 3, SF + 0.5], axis: 'x' });
      lever.box(151, G + 3, SF, 151, G + 4, SF, B.starY); lever.set(151, G + 5, SF, B.burgR);
      lights.push({ name: 'mall', p: [88.5, RF - 5, 48.5], c: '#fff0c8', i: 0.35, d: 70, flicker: 0.05, srcR: 8 });
      acts.push({
        name: '전원 복구', hint: '정문 옆 배전반 레버를 올리면 갤러리의 꺼진 등이 하나씩 다시 켜지고 고샨 간판도 밝아져요', hit: [149, G + 1, SF - 1, 153, G + 6, SF + 1],
        run: async a => {
          await a.turn('lever', [-1.3, 0, 0], 0.5);
          a.burst([151.5, G + 5, SF + 0.5], { n: 24, colors: ['#ffffff', '#a8e8ff', '#ffe08a'], speed: 4, up: 2, life: 0.4, gravity: 3, spread: 0.5 });
          a.flash('mall', 4, 6); a.flash('goshan', 5, 6); a.glow(1.5, 5);
          for (let k = lamps.length - 1; k >= 0; k--) { a.burst(lamps[k], { n: 8, colors: ['#fff4d0', '#ffffff'], speed: 0.6, up: -0.3, life: 1, gravity: 0, spread: 0.6 }); if (k % 2) await a.wait(0.12); }
          await a.wait(1.5);
          await a.turn('lever', [0, 0, 0], 0.5);
        },
      });

      // ── 바닥 잡동사니: 화분, 벤치, 종이, 잔해, 쇼핑카트 ──
      for (const [x, z] of [[40, 40], [124, 56], [140, 40]]) { w.box(x - 1, G + 1, z - 1, x + 1, G + 2, z + 1, B.pot); w.ellipsoid(x, G + 4, z, 1.6, 1.6, 1.6, B.plant, (dx, dy, dz, d) => hash3(x + dx, dy, z + dz) > 0.25); }
      for (const [x, z] of [[124, 40], [138, 56], [40, 57]]) w.box(x, G + 1, z, x + 4, G + 1, z, B.bench);
      for (let k = 0; k < 260; k++) { const x = w.ri(X0 + 2, X1 - 2), z = w.ri(SF + 2, SZ - 2); if (w.get(x, G + 1, z) || !w.get(x, G, z)) continue; const r = h(x, z, 23); if (r < 0.6) w.set(x, G, z, B.tileD); else if (r < 0.75) w.set(x, G + 1, z, B.paper); else if (r < 0.85) w.set(x, G + 1, z, B.rubble); }
      for (const [x, z] of [[130, 44], [134, 46]]) { for (const dx of [0, 2]) for (const dz of [0, 1]) w.set(x + dx, G + 1, z + dz, B.rubber); w.box(x, G + 2, z, x + 2, G + 3, z + 1, B.grate); w.box(x, G + 4, z, x, G + 4, z + 1, B.burgR); }
      return { lights, landmarks, acts };
    },
  });
})();
