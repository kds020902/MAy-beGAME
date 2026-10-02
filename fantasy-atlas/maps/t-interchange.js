// 인터체인지 · 울트라 쇼핑몰 정문 앞 — 큰 주차장 쪽 앞면 한 토막만: 파란 벽 덩어리에 튀어나온 유리 정문과 알록달록한 ULTRA 글자,
// 한쪽은 분홍빛 붉은 벽과 IDEA(남색 벽·고카트 트랙), 다른 쪽은 초록 글씨 「ГОШАН ГИПЕРМАРКЕТ」의 붉은 고샨 벽과 회색 광고판 벽.
// 앞에는 벽돌 분수 광장, 분홍 지붕 무대, 놀이터, 비상사태부 트럭과 천막. (게임에서는 서쪽 면인데, 정면이 카메라를 보도록 90° 돌려 남쪽에 두었다)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 200, D = 136, Hh = 72;
  // 간판 글꼴(줄마다 폭이 같으면 됨): 라틴 ULTRA·IDEA와 키릴 ГОШАН·ГИПЕРМАРКЕТ
  const FONT = {
    U: ['101', '101', '101', '101', '111'], L: ['100', '100', '100', '100', '111'], T: ['111', '010', '010', '010', '010'], R: ['110', '101', '110', '101', '101'],
    A: ['010', '101', '111', '101', '101'], I: ['111', '010', '010', '010', '111'], D: ['110', '101', '101', '101', '110'], E: ['111', '100', '110', '100', '111'],
    'Г': ['1111', '1000', '1000', '1000', '1000'], 'О': ['0110', '1001', '1001', '1001', '0110'], 'Ш': ['10101', '10101', '10101', '10101', '11111'], 'А': ['0110', '1001', '1111', '1001', '1001'],
    'Н': ['1001', '1001', '1111', '1001', '1001'], 'И': ['1001', '1001', '1011', '1101', '1001'], 'П': ['1111', '1001', '1001', '1001', '1001'], 'Е': ['1111', '1000', '1110', '1000', '1111'],
    'Р': ['1110', '1001', '1110', '1000', '1000'], 'М': ['10001', '11011', '10101', '10001', '10001'], 'К': ['1001', '1010', '1100', '1010', '1001'], 'Т': ['111', '010', '010', '010', '010'],
  };
  // 남쪽(+z)을 보는 면에 글자 쓰기. b는 블록 또는 (글자 번호) → 블록. 글자마다 [가운데 x, 가운데 y, 너비]를 돌려준다
  const text = (w, s, x0, yTop, z, b, sc, gap, dep) => {
    sc = sc || 1; gap = gap == null ? 1 : gap; dep = dep || 1;
    const out = []; let u = 0;
    [...s].forEach((ch, k) => {
      const g = FONT[ch], bl = typeof b === 'function' ? b(k) : b, gw = g ? g[0].length : 2;
      if (g) for (let r = 0; r < 5; r++) for (let c = 0; c < gw; c++) if (g[r][c] === '1') for (let sy = 0; sy < sc; sy++) for (let sx = 0; sx < sc; sx++) for (let d = 0; d < dep; d++)
        w.set(x0 + u + c * sc + sx, yTop - r * sc - sy, z + d, bl);
      out.push([x0 + u + gw * sc / 2, yTop - 2.5 * sc, gw * sc]);
      u += gw * sc + gap;
    });
    return out;
  };
  const textW = (s, sc, gap) => [...s].reduce((a, ch) => a + (FONT[ch] ? FONT[ch][0].length : 2) * sc + gap, -gap);

  MAPS.push({
    id: 'interchange', cat: 'tarkov', name: '인터체인지', en: 'Interchange · ULTRA Mall Front', color: '#e8742a', seed: 605, base: 20, time: 'day', size: [W, D, Hh],
    desc: '인터체인지 한가운데 대형 쇼핑몰 「울트라」의 정문 쪽 앞면. 파란 벽 덩어리 앞으로 쇠 격자 유리 정문이 튀어나오고 그 위에 알록달록한 ULTRA 글자가 섰다. 한쪽은 남색 IDEA와 고카트 트랙, 다른 쪽은 초록 글씨 「Гошан ГИПЕРМАРКЕТ」의 붉은 고샨 벽. 먼지 앉은 주차장에는 벽돌 분수와 분홍 지붕 무대, 놀이터, 그리고 비상사태부가 두고 간 군용 트럭과 천막이 남았다. 표지판을 따라 정문으로 들어가면 몰 가운데 갤러리가 나와요.',
    info: { title: '구역 정보', en: 'TARKOV · INTERCHANGE', rows: [['자리', '울트라 쇼핑몰 정문 앞 큰 주차장'], ['앞면 순서', 'IDEA · 붉은 벽 · 유리 정문(ULTRA) · 고샨 · 광고판 벽'], ['광장', '벽돌 분수 · 분홍 지붕 무대 · 놀이터'], ['안으로', '정문 앞 표지판 → 가운데 갤러리']] },
    sky: ['#b8d0e4', '#4a78b0', '#ece4d0'], stars: false,
    hemi: ['#eef0f4', '#5a5448', 0.62], sun: ['#fff0d8', 0.8, [0.55, 1, 0.75]],
    night: { sky: ['#2a2c38', '#0a0c14', '#8a6a58'], stars: true, hemi: ['#8a90a8', '#14121a', 0.34], sun: ['#b8c0e0', 0.22, [0.55, 1, 0.75]], haze: '#22242a' },
    liquid: ['#4a6a74', '#6a8a94', '#c8dce4'], liqSpeed: 0.4,
    fog: { start: 0.88, floor: 12, depth: 8, haze: [26, 0.08, 6], hazeColor: '#d8d4c8' },
    camY: 0, zoom: 1.6,
    particles: [
      { n: 110, colors: ['#d8d0bc', '#c0b8a4', '#ece4d4'], mode: 'drift', speed: 0.35, wind: 0.6, y0: 21, y1: 40, glow: false },
    ],
    blocks: Object.assign(OR.blocks(), {
      lot: { c: '#9a927e', top: '#b2a890', v: 0.07 }, lot2: { c: '#948c78', top: '#a69c86', v: 0.08 }, lotD: { c: '#7e786a', top: '#8e8676', v: 0.06 }, drive: { c: '#6a665e', top: '#7c776c', v: 0.06 },
      lineW: { c: '#e0ded4', v: 0.03 }, walk: { c: '#9a988e', top: '#b4b0a4', v: 0.04, pat: 'check', alt: '#a8a498' }, curbC: { c: '#8a887e', top: '#a6a296', v: 0.03 },
      turf: { c: '#4a5a32', top: '#5e7038', v: 0.12 }, soilD: { c: '#5a4a38', v: 0.08 }, concDk: { c: '#4e4c48', v: 0.05 }, rock: { c: '#6a665e', v: 0.06 },
      redW: { c: '#b4545a', v: 0.03 }, redW2: { c: '#a24a50', v: 0.03 }, gosR: { c: '#d0583a', v: 0.03 }, gosR2: { c: '#bc4c32', v: 0.03 }, gosG: { c: '#3aa04a', v: 0.03 }, gosG2: { c: '#2e8a3e', v: 0.03 },
      bluW: { c: '#3a5e9e', v: 0.03 }, bluW2: { c: '#33558f', v: 0.03 }, bluD: { c: '#284478', v: 0.03 }, greyW: { c: '#c4c2ba', v: 0.03 }, greyW2: { c: '#b4b2aa', v: 0.03 },
      ideaN: { c: '#232a3e', v: 0.03 }, ideaN2: { c: '#1c2234', v: 0.03 }, ideaB: { c: '#2a5ab0', v: 0.03 }, ideaY: { c: '#f2cc2a', v: 0.03 },
      plinth: { c: '#3e3e40', v: 0.03 }, roofG: { c: '#8a8a86', top: '#9a9a94', v: 0.04 }, capK: { c: '#2e3034', v: 0.02 },
      mull: { c: '#2a2e34', v: 0.02 }, glassT: { c: '#7a9298', v: 0.03 }, glassT2: { c: '#8aa4aa', v: 0.03 }, glassD: { c: '#2e3a44', v: 0.03 }, sky: { c: '#a8c4d4', v: 0.03 },
      ulR: { c: '#e8343a', v: 0.02 }, ulG: { c: '#3ab84a', v: 0.02 }, ulY: { c: '#f4c42a', v: 0.02 }, ulB: { c: '#3a9ae8', v: 0.02 }, ulO: { c: '#f0602a', v: 0.02 },
      posterK: { c: '#1e1e22', v: 0.02 }, posterG: { c: '#3a9a6a', v: 0.03 }, posterW: { c: '#e8e4d8', v: 0.02 }, posterP: { c: '#c8508a', v: 0.03 },
      fir: { c: '#2c4630', top: '#365436', v: 0.1 }, fir2: { c: '#3a5a38', v: 0.1 }, firL: { c: '#4a6a40', v: 0.1 }, hedge: { c: '#3e5a2e', top: '#4e6a36', v: 0.1 }, rail: { c: '#26282a', v: 0.02 },
      brickH: { c: '#9a4a36', top: '#a8553c', v: 0.05, pat: 'check', alt: '#8a4030' }, stoneF: { c: '#8e8c86', top: '#a2a09a', v: 0.04 }, stoneF2: { c: '#7a7872', v: 0.04 },
      pinkS: { c: '#d0507a', v: 0.03 }, pinkS2: { c: '#b8406a', v: 0.03 }, truss: { c: '#a8acb0', v: 0.02 }, stageG: { c: '#7a7a78', v: 0.03 }, backG: { c: '#5e5e60', v: 0.05, pat: 'big' }, spk: { c: '#1a1a1c', v: 0.02 },
      rubR: { c: '#b44a4a', top: '#c05656', v: 0.05 }, playR: { c: '#c03a2e', v: 0.04, pat: 'tile' }, playW: { c: '#8a6a48', v: 0.05, pat: 'plank' }, playY: { c: '#e8b830', v: 0.03 }, sandP: { c: '#c8b48a', v: 0.08 },
      milG: { c: '#56603e', v: 0.05 }, milG2: { c: '#4a5436', v: 0.05 }, canvas: { c: '#6a704a', v: 0.06 }, tire: { c: '#1c1c1e', v: 0.03 }, glassK: { c: '#3a4652', v: 0.03 },
      tireO: { c: '#e07a2a', v: 0.03 }, tireW: { c: '#e8e4dc', v: 0.02 }, kartR: { c: '#d0302a', v: 0.03 },
      carB: { c: '#7a92a8', v: 0.05 }, carW: { c: '#c8c6be', v: 0.05 }, carG: { c: '#5a7058', v: 0.05 }, carR: { c: '#8a3a2e', v: 0.05 }, rust: { c: '#7a4a32', v: 0.1 }, wood: { c: '#9a7a52', v: 0.06, pat: 'plank' },
      jersey: { c: '#b4b0a6', v: 0.05 }, pole: { c: '#8e9296', v: 0.02 }, cart: { c: '#b0b4b8', v: 0.02 }, cartR: { c: '#c03030', v: 0.02 }, sandb: { c: '#a89a74', v: 0.08, pat: 'stone' },
      lampN: { c: '#ffe0a0', night: true, day: '#d8d4c4' }, headY: { c: '#ffe8a0', glow: true }, tailR: { c: '#ff4a3a', glow: true }, flareY: { c: '#ffd84a', glow: true },
      neonR: { c: '#ff4a4a', night: true, day: '#e8343a' },
    }),
    build(w) {
      const B = w.id, G = w.base;
      const FZ = 40, BZ = 4;                                                  // 앞면 z, 건물 뒤끝 z
      const IX0 = 4, IX1 = 36, RX1 = 62, BX1 = 118, GX1 = 182, XX1 = 196;      // IDEA | 붉은 벽 | 파란 덩어리 | 고샨 | 회색 벽
      const TX0 = 76, TX1 = 104, TC = 90;                                      // 유리 정문(튀어나온 상자)
      const lights = [], acts = [], landmarks = [];
      const h = (x, z, k) => hash3(x, k || 0, z);

      // ── 바닥: 먼지 앉은 밝은 주차장, 앞 보도, 화단, 차로 ──
      MH.terrain(w, {
        floor: G - 4, height: () => G,
        surface: (x, z) => {
          if (z <= FZ) return B.roofG;
          if (z <= 45) return B.walk;
          if (z <= 48) return (x >= TX0 - 4 && x <= TX1 + 4) ? B.walk : (z === 48 ? B.curbC : B.turf);
          if (z <= 50) return (x >= TX0 - 4 && x <= TX1 + 4) ? B.walk : B.curbC;
          if (z <= 58) return (x >= TX0 - 2 && x <= TX1 + 2 && z <= 52) ? B.walk : B.drive;
          const r = h(x >> 2, z >> 2, 3);
          return r > 0.82 ? B.lot2 : (r < 0.06 ? B.lotD : B.lot);
        },
        under: (x, z, y, dep) => dep < 2 ? B.concDk : B.rock,
      });
      // 주차 칸 선: 앞면과 직각(남북)으로 긋는다
      const stalls = (x0, x1, z0, z1) => { for (let x = x0; x <= x1; x += 5) for (let z = z0; z <= z1; z++) w.set(x, G, z, B.lineW); for (let x = x0; x <= x1; x++) w.set(x, G, z1 + 1, B.lineW); };
      stalls(40, 70, 104, 112); stalls(40, 70, 118, 126); stalls(142, 192, 66, 74); stalls(142, 192, 80, 88); stalls(146, 192, 104, 112); stalls(146, 192, 118, 126); stalls(110, 132, 118, 126);
      for (let x = 2; x < W - 2; x++) if (x % 8 < 4) w.set(x, G, 54, B.lineW);                     // 차로 가운데 점선

      // ── 몰 덩어리: 벽 높이(구역마다), 지붕, 바닥 띠 ──
      const top = x => x <= IX1 ? G + 16 : x <= RX1 ? G + 18 : x <= BX1 ? ((x >= 70 && x <= 110) ? G + 26 : G + 23) : G + 18;
      const wallB = (x, y) => {
        const yy = y - G;
        if (yy <= 1) return B.plinth;
        if (x <= IX1) return x % 2 ? B.ideaN : B.ideaN2;
        if (x <= RX1) return x % 4 === 0 ? B.redW2 : B.redW;
        if (x <= BX1) return (x - 63) % 8 === 0 ? B.bluD : (x % 2 ? B.bluW : B.bluW2);
        if (x <= GX1) return x % 5 === 0 ? B.gosR2 : B.gosR;
        return x % 6 === 0 ? B.greyW2 : B.greyW;
      };
      for (let x = IX0; x <= XX1; x++) {
        const t = top(x);
        for (let z = BZ; z <= FZ; z++) {
          const edge = z === FZ || z === BZ || x === IX0 || x === XX1;
          if (edge) for (let y = G + 1; y <= t; y++) w.set(x, y, z, z === FZ ? wallB(x, y) : B.greyW2);
          w.set(x, t, z, B.roofG);
          if (z === FZ || x === IX0 || x === XX1) w.set(x, t + 1, z, B.capK);
        }
      }
      // 높이가 바뀌는 곳의 옆벽(지붕 단)
      for (let x = IX0 + 1; x < XX1; x++) { const a = top(x), b = top(x + 1); if (a !== b) { const xx = a > b ? x : x + 1, y0 = Math.min(a, b); for (let z = BZ; z <= FZ; z++) { w.box(xx, y0, z, xx, Math.max(a, b), z, z === FZ ? wallB(xx, Math.max(a, b) - 1) : B.greyW2); w.set(xx, Math.max(a, b) + 1, z, B.capK); } } }
      // 지붕 위 채광창 줄과 공조기, 가운데 갤러리의 둥근 돔
      for (let x = 10; x < XX1 - 6; x += 14) for (let z = 10; z <= 30; z += 10) {
        const t = top(x); if (top(x + 6) !== t) continue;
        for (let dx = 0; dx <= 6; dx++) for (let dz = 0; dz <= 4; dz++) w.set(x + dx, t + 1, z + dz, (dx === 0 || dx === 6 || dz === 0 || dz === 4 || dx === 3) ? B.mull : B.sky);
      }
      for (const x of [44, 132, 160, 186]) { w.box(x, top(x) + 1, 34, x + 2, top(x) + 2, 36, B.pole); w.set(x + 1, top(x) + 3, 35, B.capK); }
      w.ellipsoid(TC, G + 26, 18, 5.5, 4, 5.5, B.sky, (dx, dy) => dy >= 0);
      for (let dx = -6; dx <= 6; dx++) for (let dz = -6; dz <= 6; dz++) for (let y = G + 27; y <= G + 30; y++) if ((dx === 0 || dz === 0 || y === G + 28) && w.get(TC + dx, y, 18 + dz) === B.sky) w.set(TC + dx, y, 18 + dz, B.mull);

      // ── IDEA(왼쪽 끝): 남색 벽, 파란 띠에 노란 IDEA, 작은 유리 출입구 ──
      w.box(IX0 + 3, G + 10, FZ + 1, IX0 + 22, G + 15, FZ + 1, B.ideaB);
      text(w, 'IDEA', IX0 + 5, G + 14, FZ + 2, B.ideaY, 1, 1);
      w.box(IX0 + 18, G + 11, FZ + 2, IX0 + 20, G + 14, FZ + 2, B.ideaY);
      for (let x = 22; x <= 32; x++) for (let y = G + 1; y <= G + 6; y++) w.set(x, y, FZ, (x === 22 || x === 32 || y === G + 6 || x === 27) ? B.mull : B.glassK);
      for (const [x0, col] of [[8, B.posterG], [14, B.posterP]]) { w.box(x0, G + 3, FZ + 1, x0 + 4, G + 8, FZ + 1, B.posterW); w.box(x0 + 1, G + 4, FZ + 1, x0 + 3, G + 7, FZ + 1, col); }
      landmarks.push({ name: 'IDEA', note: '남색 벽에 노란 글자 · 앞에 고카트 트랙', p: [20, G + 22, FZ] });

      // ── 붉은 벽: 검은 광고판과 세로 포스터 ──
      w.box(42, G + 5, FZ + 1, 53, G + 13, FZ + 1, B.posterK); w.box(43, G + 6, FZ + 1, 52, G + 7, FZ + 1, B.posterW);
      for (let x = 44; x <= 51; x++) if (h(x, 3, 5) > 0.45) w.set(x, G + 10, FZ + 1, B.posterW);
      for (const x of [57]) { w.box(x, G + 4, FZ + 1, x + 3, G + 11, FZ + 1, B.posterW); w.box(x + 1, G + 5, FZ + 1, x + 2, G + 10, FZ + 1, B.posterP); }

      // ── 유리 정문: 앞모서리를 깎은 상자, 쇠 격자, 가운데·꼭대기 트러스 차양 ──
      const fz = x => FZ + 6 - Math.max(0, TX0 + 3 - x, x - (TX1 - 3));        // 앞면 z(모서리는 비스듬히)
      const TT = G + 21;
      for (let x = TX0; x <= TX1; x++) {
        const f = fz(x);
        for (let z = FZ + 1; z <= f; z++) {
          const shell = z === f || x === TX0 || x === TX1;
          for (let y = G + 1; y <= TT; y++) {
            if (y === TT) { w.set(x, y, z, B.capK); continue; }
            if (!shell) { if (y === G + 11) w.set(x, y, z, B.capK); continue; }
            const u = (x === TX0 || x === TX1) ? z : x, yy = y - G;
            w.set(x, y, z, (u % 3 === 0 || yy % 5 === 0 || y === G + 11 || y === G + 1) ? B.mull : (h(x, y, z) > 0.85 ? B.glassT2 : B.glassT));
          }
        }
        // 차양 트러스(가운데 띠는 한 칸, 꼭대기는 두 칸 앞으로)
        w.set(x, G + 11, f + 1, B.truss); if (x % 2 === 0) w.set(x, G + 12, f + 1, B.truss);
        w.set(x, TT, f + 1, B.truss); w.set(x, TT, f + 2, B.truss); if (x % 2 === 0) w.set(x, TT - 1, f + 2, B.truss);
      }
      // 문: 가운데 어두운 유리문
      for (let x = TC - 4; x <= TC + 4; x++) for (let y = G + 1; y <= G + 5; y++) w.set(x, y, FZ + 6, (x === TC - 4 || x === TC + 4 || y === G + 5 || x === TC) ? B.mull : B.glassK);
      // ULTRA 글자: 크고 두꺼운 다섯 글자가 들쭉날쭉(부품 — 하나씩 튀어 오른다)
      const UL = [B.ulR, B.ulG, B.ulY, B.ulB, B.ulO], SC = 2, UW = textW('ULTRA', SC, 1), UX = Math.round(TC - UW / 2), UZ = FZ + 3;
      const letters = [];
      [...'ULTRA'].forEach((ch, k) => {
        const yTop = G + 34 + (k % 2 ? -1 : 1), p = w.prop({ name: 'ul' + k, pivot: [UX + k * 7 + 3, yTop - 9, UZ + 1] });
        text(p, ch, UX + k * 7, yTop, UZ, UL[k], SC, 0, 2);
        letters.push([UX + k * 7 + 3, yTop - 5, UZ + 1]);
      });
      w.box(UX + 1, TT + 1, UZ + 1, UX + UW - 2, TT + 1, UZ + 1, B.mull);                    // 글자 받침 쇠틀
      for (let x = UX + 2; x < UX + UW - 2; x += 6) w.box(x, TT + 2, UZ + 1, x, G + 23, UZ + 1, B.mull);
      for (let x = TX0 + 5; x <= TX1 - 5; x += 4) w.set(x, TT - 1, FZ + 8, B.lampN);
      lights.push({ name: 'ultra', p: [TC + 0.5, TT - 1, FZ + 8.5], c: '#ffd0a0', i: 0.5, d: 36, flicker: 0.05, srcR: 8 });
      landmarks.push({ name: '울트라 정문', note: '튀어나온 유리 상자와 ULTRA 글자 · 몰 가운데 갤러리로 들어가는 문', p: [TC, G + 36, FZ + 4], boss: true });
      acts.push({
        name: 'ULTRA 글자', hint: '정문 위 ULTRA 글자가 하나씩 통통 튀어 오르며 반짝여요', hit: [UX, G + 24, UZ, UX + UW, G + 35, UZ + 2],
        run: async a => {
          const cs = ['#ff5a5a', '#6ae87a', '#ffe04a', '#6ab8ff', '#ff8a4a'];
          a.flash('ultra', 4, 4); a.glow(1.5, 4);
          for (let k = 0; k < 5; k++) {
            a.tween('ul' + k, { off: [0, 2.5, 0] }, 0.25).then(() => a.tween('ul' + k, { off: [0, 0, 0] }, 0.35));
            a.burst(letters[k], { n: 26, colors: [cs[k], '#ffffff'], speed: 3, up: 1.5, life: 0.9, gravity: 1, spread: 3 });
            await a.wait(0.3);
          }
          await a.wait(0.6);
        },
      });

      // ── 고샨: 주홍빛 벽에 초록 「ГОШАН」과 「ГИПЕРМАРКЕТ」, 작은 새 표시 ──
      const GT = BX1 + 6;
      text(w, 'ГОШАН', GT + 6, G + 17, FZ + 1, B.gosG, 1, 1);
      for (const [dx, dy] of [[0, 0], [1, 0], [1, 1], [2, 1], [-1, 1], [0, 2]]) w.set(GT + 2 + dx, G + 14 + dy, FZ + 1, dx === 2 ? B.ulY : B.gosG2);   // 새 표시
      text(w, 'ГИПЕРМАРКЕТ', GT, G + 11, FZ + 1, B.gosG, 1, 1);
      for (let x = BX1 + 4; x <= GX1 - 4; x += 12) { w.box(x, G + 1, FZ + 1, x + 4, G + 1, FZ + 1, B.plinth); }
      landmarks.push({ name: '고샨 하이퍼마켓', note: '붉은 벽의 초록 글씨 「Гошан ГИПЕРМАРКЕТ」', p: [150, G + 24, FZ] });
      // 회색 광고판 벽: 초록·분홍 포스터 두 장
      for (const [x0, col, y0] of [[185, B.posterG, G + 5], [191, B.posterP, G + 8]]) { w.box(x0, y0, FZ + 1, x0 + 4, y0 + 6, FZ + 1, B.mull); w.box(x0 + 1, y0 + 1, FZ + 1, x0 + 3, y0 + 5, FZ + 1, col); w.set(x0 + 2, y0 + 3, FZ + 1, B.posterW); }

      // ── 앞 보도: 전나무 줄(정문 앞은 비움), 낮은 검은 철책, 쇼핑카트 보관대 ──
      const fir = (x, z, hh, r) => MH.tree(w, x, G + 1, z, { kind: 'pine', h: hh, bark: B.bark, leaves: [B.firL, B.fir, B.fir2], r });
      for (let x = 8; x <= XX1 - 4; x += 7) if (x < TX0 - 5 || x > TX1 + 5) fir(x, 46 + (x % 2), 6 + (h(x, 1, 2) * 3 | 0), 2.2);
      for (let x = 2; x < W - 2; x++) {
        if (x >= TX0 - 4 && x <= TX1 + 4) continue;
        w.set(x, G + 2, 49, B.rail); if (x % 3 === 0) w.set(x, G + 1, 49, B.rail);
        if (h(x, 4, 49) > 0.4) w.set(x, G + 1, 48, B.hedge);
      }
      const cartAt = (p, x, z, tip) => {
        for (const dx of [0, 2]) for (const dz of [0, 1]) p.set(x + dx, G + 1, z + dz, B.tire);
        for (let dx = 0; dx <= 2; dx++) for (let dz = 0; dz <= 1; dz++) { p.set(x + dx, G + 2, z + dz, B.cart); if (dx !== 1) p.set(x + dx, G + 3, z + dz, B.cart); }
        p.box(x, G + 4, z, x, G + 4, z + 1, B.cartR); if (tip) p.set(x + 1, G + 3, z, B.ulY);
      };
      for (const [x, z] of [[108, 44], [108, 47], [70, 44]]) cartAt(w, x, z, h(x, z, 2) > 0.5);
      for (let x = TX1 + 6; x <= TX1 + 12; x++) { w.set(x, G + 3, 43, B.cartR); if (x % 3 === 0) w.box(x, G + 1, 43, x, G + 2, 43, B.pole); }

      // ── 표지판: 정문 앞 → 몰 안으로 ──
      const sp = OR.signpost(w, B, TC + 7, 52, { dir: [0, -1], boards: 1 });
      acts.push(OR.goAct({ at: sp, name: '몰 안으로', goto: 'interchange-in', hint: '유리 정문을 지나 울트라 가운데 갤러리(에스컬레이터와 KIBA 총포점)로 들어가요' }));

      // ── 노란 신호탄(정문 앞 표시 자리) ──
      const FLX = TC - 6, FLZ = 54;
      for (const [dx, dz] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) w.set(FLX + dx, G, FLZ + dz, B.ulY);
      w.set(FLX, G + 1, FLZ, B.flareY);
      lights.push({ name: 'flare', p: [FLX + 0.5, G + 3, FLZ + 0.5], c: '#ffd84a', i: 0.45, d: 26, flicker: 0.3, srcR: 3 });
      acts.push({
        name: '노란 신호탄', hint: '울트라 정문 앞 표시 자리에서 노란 신호탄을 쏘아 올려요. 노란 연기가 피어나요', hit: [FLX - 2, G + 1, FLZ - 2, FLX + 2, G + 3, FLZ + 2],
        run: async a => {
          for (let k = 0; k < 10; k++) { a.burst([FLX + 0.5, G + 2 + k * 2.6, FLZ + 0.5], { n: 10, colors: ['#ffffff', '#fff4b0'], speed: 0.3, up: 1, life: 0.6, gravity: 0, spread: 0.2 }); await a.wait(0.1); }
          a.flash('flare', 9, 5); a.glow(1.6, 3);
          a.burst([FLX + 0.5, G + 30, FLZ + 0.5], { n: 120, colors: ['#ffd84a', '#fff4b0', '#ffb02a'], speed: 9, up: 2, life: 2.2, gravity: 1.5, spread: 1 });
          for (let k = 0; k < 9; k++) { a.burst([FLX + 0.5, G + 1.5, FLZ + 0.5], { n: 22, colors: ['#f2d24a', '#f8e890', '#e0b830'], speed: 1.2, up: 3, life: 2.6, gravity: -0.4, spread: 1.4 }); await a.wait(0.35); }
        },
      });

      // ── 분수 광장: 회색 턱으로 두른 둥근 벽돌(헤링본) 마당, 가운데 2단 돌 분수 ──
      const FX = 124, FZp = 94, FR = 9;
      for (let dz = -FR - 1; dz <= FR + 1; dz++) for (let dx = -FR - 1; dx <= FR + 1; dx++) {
        const d = Math.hypot(dx, dz), x = FX + dx, z = FZp + dz;
        if (d > FR + 0.5) continue;
        if (d > FR - 0.6) { w.set(x, G + 1, z, B.stoneF); continue; }
        w.set(x, G, z, B.brickH);
        if (d > 3.2 && d <= 4.3) w.box(x, G + 1, z, x, G + 2, z, B.stoneF);
        else if (d <= 3.2) { w.set(x, G, z, B.stoneF2); w.liquid(x, z, G + 1); }
      }
      w.cyl(FX, FZp, G + 1, G + 3, 0.8, B.stoneF); w.cyl(FX, FZp, G + 4, G + 4, 2.2, B.stoneF); w.ring(FX, FZp, G + 5, 1.6, 2.4, B.stoneF);
      w.cyl(FX, FZp, G + 5, G + 6, 0.6, B.stoneF2); w.cyl(FX, FZp, G + 7, G + 7, 1.2, B.stoneF); w.set(FX, G + 8, FZp, B.stoneF);
      landmarks.push({ name: '분수 광장', note: '벽돌 헤링본 원형 마당과 2단 돌 분수', p: [FX, G + 14, FZp] });
      acts.push({
        name: '분수', hint: '말라 있던 2단 분수에서 물줄기가 다시 솟아 물보라가 흩날려요', hit: [FX - 4, G + 1, FZp - 4, FX + 4, G + 8, FZp + 4],
        run: async a => {
          for (let k = 0; k < 16; k++) {
            a.burst([FX + 0.5, G + 9, FZp + 0.5], { n: 22, colors: ['#c8e4f0', '#ffffff', '#8ab8cc'], speed: 2.4, up: 5, life: 1.1, gravity: 7, spread: 0.4 });
            a.burst([FX + 0.5, G + 5.5, FZp + 0.5], { n: 14, colors: ['#c8e4f0', '#ffffff'], speed: 3, up: 1, life: 0.7, gravity: 5, spread: 2.2, flat: true });
            await a.wait(0.25);
          }
        },
      });

      // ── 놀이터: 붉은 고무 바닥, 빨간 지붕 놀이집 둘, 미끄럼틀, 그네(부품) ──
      const PX0 = 108, PX1 = 134, PZ0 = 62, PZ1 = 78;
      for (let x = PX0; x <= PX1; x++) for (let z = PZ0; z <= PZ1; z++) w.set(x, G, z, (x === PX0 || x === PX1 || z === PZ0 || z === PZ1) ? B.curbC : B.rubR);
      const play = (x, z) => {
        for (const [dx, dz] of [[0, 0], [3, 0], [0, 3], [3, 3]]) w.box(x + dx, G + 1, z + dz, x + dx, G + 4, z + dz, B.playW);
        w.box(x, G + 4, z, x + 3, G + 4, z + 3, B.playW); w.box(x, G + 5, z, x, G + 6, z + 3, B.playW); w.box(x + 3, G + 5, z, x + 3, G + 6, z + 3, B.playW);
        for (let k = 0; k <= 2; k++) w.box(x - 1 + k, G + 7 + k, z, x + 4 - k, G + 7 + k, z + 3, B.playR);
      };
      play(111, 64); play(127, 70);
      for (let k = 0; k < 6; k++) w.set(115 + k, G + 4 - Math.floor(k * 0.6), 66, B.playY);           // 미끄럼틀
      w.box(112, G + 1, 74, 116, G + 1, 77, B.sandP); w.box(112, G + 2, 74, 116, G + 2, 74, B.playW);
      for (const x of [119, 125]) { w.line(x, G + 1, 74, x, G + 7, 76, B.pole); w.line(x, G + 1, 78, x, G + 7, 76, B.pole); }
      w.box(119, G + 7, 76, 125, G + 7, 76, B.pole);
      const sw = w.prop({ name: 'swing', pivot: [122, G + 7, 76.5], axis: 'x' });
      for (const x of [121, 123]) sw.box(x, G + 3, 76, x, G + 6, 76, B.capK);
      sw.box(121, G + 2, 76, 123, G + 2, 76, B.playY);
      acts.push({
        name: '그네', hint: '놀이터의 빈 그네가 바람에 혼자 흔들려요', hit: [119, G + 1, 74, 125, G + 7, 78],
        run: async a => { a.wind(2, 3); for (let k = 0; k < 4; k++) { await a.turn('swing', [0.7, 0, 0], 0.55); await a.turn('swing', [-0.7, 0, 0], 0.55); } await a.turn('swing', [0, 0, 0], 0.5); },
      });

      // ── 무대: 회색 철골 위 분홍 지붕, 회색 뒷막, 스피커. 앞(남쪽)이 트였다 ──
      const SX0 = 88, SX1 = 104, SZ0 = 100, SZ1 = 110;
      w.box(SX0, G + 1, SZ0, SX1, G + 1, SZ1, B.stageG); w.box(SX0 + 4, G + 1, SZ1 + 1, SX1 - 4, G + 1, SZ1 + 1, B.stageG);
      w.box(SX0 + 1, G + 2, SZ0, SX1 - 1, G + 11, SZ0, B.backG);
      for (const [x, z] of [[SX0, SZ0], [SX1, SZ0], [SX0, SZ1], [SX1, SZ1]]) for (let y = G + 2; y <= G + 12; y++) { w.set(x, y, z, B.truss); if (y % 2) w.set(x, y, z + (z === SZ0 ? 1 : -1), B.truss); }
      for (let x = SX0; x <= SX1; x++) for (let z = SZ0; z <= SZ1; z++) {
        const e = x === SX0 || x === SX1 || z === SZ0 || z === SZ1, mid = Math.min(x - SX0, SX1 - x);
        w.set(x, G + 13 + (e ? 0 : (mid > 4 ? 2 : 1)), z, e ? B.pinkS2 : B.pinkS);
        if (e) w.set(x, G + 12, z, B.truss);
      }
      for (const x of [SX0 + 1, SX1 - 2]) w.box(x, G + 2, SZ1 - 1, x + 1, G + 5, SZ1, B.spk);
      for (let x = SX0 + 3; x <= SX1 - 3; x += 3) w.set(x, G + 11, SZ1, B.lampN);
      lights.push({ name: 'stage', p: [(SX0 + SX1) / 2, G + 11, SZ1 - 0.5], c: '#ff8ac0', i: 0.5, d: 28, flicker: 0.1, srcR: 8 });
      landmarks.push({ name: '야외 무대', note: '분홍 지붕을 얹은 철골 무대', p: [(SX0 + SX1) / 2, G + 20, (SZ0 + SZ1) / 2] });
      acts.push({
        name: '무대 조명', hint: '분홍 지붕 무대에 조명이 번쩍이고 반짝이 종이가 흩날려요', hit: [SX0, G + 1, SZ0, SX1, G + 13, SZ1 + 1],
        run: async a => {
          a.glow(1.6, 4);
          for (let k = 0; k < 10; k++) {
            a.flash('stage', k % 2 ? 1 : 8, 0.3);
            a.burst([SX0 + 3 + (k % 4) * 3.5, G + 11, SZ1 + 1.5], { n: 14, colors: ['#ff8ac0', '#ffffff', '#8ad8ff', '#ffe04a'], speed: 3, up: 2, life: 1.6, gravity: 1.2, spread: 1.5 });
            a.burst([(SX0 + SX1) / 2, G + 17, (SZ0 + SZ1) / 2], { n: 8, colors: ['#ff8ac0', '#ffffff'], speed: 2, up: 4, life: 1, gravity: 2, spread: 4 });
            await a.wait(0.32);
          }
        },
      });

      // ── 비상사태부가 두고 간 것: 군용 트럭(부품)과 국방색 천막, 나무 팔레트 ──
      const TRX = 42, TRZ = 76;
      const tr = w.prop({ name: 'truck', pivot: [TRX + 7, G + 1, TRZ + 2] });
      for (let x = TRX; x <= TRX + 14; x++) for (let z = TRZ; z <= TRZ + 4; z++) {
        if ((x === TRX + 2 || x === TRX + 8 || x === TRX + 11) && (z === TRZ || z === TRZ + 4)) tr.box(x, G + 1, z, x, G + 2, z, B.tire);
        tr.set(x, G + 3, z, B.milG2);
        if (x >= TRX + 11) { for (let y = G + 4; y <= G + 6; y++) tr.set(x, y, z, (y === G + 6 && x === TRX + 14) || (y === G + 5 && x >= TRX + 12 && (z === TRZ || z === TRZ + 4)) ? B.glassK : B.milG); if (x === TRX + 14 && (z === TRZ || z === TRZ + 4)) tr.set(x + 1, G + 4, z, B.headY); }
        else { const e = z === TRZ || z === TRZ + 4; for (let y = G + 4; y <= G + 7; y++) if (e || y === G + 7 || x === TRX) tr.set(x, y, z, B.canvas); }
      }
      lights.push({ name: 'truck', p: [TRX + 15.5, G + 4.5, TRZ + 2], c: '#ffe8a0', i: 0.4, d: 18, flicker: 0.1, srcR: 3 });
      acts.push({
        name: '군용 트럭 시동', hint: '비상사태부가 버리고 간 군용 트럭이 부르릉 시동이 걸려 전조등이 켜지고 검은 매연을 뿜어요', hit: [TRX, G + 1, TRZ, TRX + 15, G + 7, TRZ + 4],
        run: async a => {
          a.flash('truck', 7, 4);
          for (let k = 0; k < 6; k++) {
            a.tween('truck', { off: [0, k % 2 ? 0 : 0.35, 0] }, 0.12);
            a.burst([TRX - 0.5, G + 2, TRZ + 0.5], { n: 10, colors: ['#3a3634', '#5a5654', '#7a7470'], speed: 1, up: 2, life: 1.8, gravity: -0.5, spread: 0.6 });
            await a.wait(0.3);
          }
          for (let k = 0; k < 4; k++) a.burst([TRX - 0.5 + k * 2, G + 2, TRZ + 0.5], { n: 12, colors: ['#3a3634', '#5a5654'], speed: 1, up: 2, life: 1.8, gravity: -0.5, spread: 0.8 });
          await a.tween('truck', { off: [8, 0, 0] }, 1.6);
          await a.wait(0.6);
          await a.tween('truck', { off: [0, 0, 0] }, 1.8);
        },
      });
      const tent = (x0, z0, len, col) => {
        for (let x = x0; x <= x0 + len; x++) for (let dz = -3; dz <= 3; dz++) {
          const y = G + 5 - Math.floor(Math.abs(dz) * 0.9);
          w.set(x, y, z0 + dz, col);
          if (Math.abs(dz) === 3) w.box(x, G + 1, z0 + dz, x, y, z0 + dz, col);
          if ((x === x0 || x === x0 + len) && Math.abs(dz) < 3) w.box(x, G + 1, z0 + dz, x, y - 1, z0 + dz, x === x0 + len && Math.abs(dz) <= 1 && y > G + 2 ? B.capK : col);
        }
      };
      tent(60, 66, 10, B.milG); tent(60, 92, 8, B.milG2);
      for (const [x, z] of [[46, 88], [50, 90], [47, 92]]) { w.box(x, G + 1, z, x + 2, G + 1, z + 2, B.wood); if (h(x, z, 3) > 0.4) w.box(x, G + 2, z, x + 2, G + 2, z + 2, B.wood); }
      for (let x = 74; x <= 84; x += 2) w.box(x, G + 1, 62, x + 1, G + 2, 62, B.sandb);
      landmarks.push({ name: '비상사태부 캠프', note: '버려진 군용 트럭과 국방색 천막', p: [56, G + 14, 80] });

      // ── IDEA 앞 고카트 트랙: 주황·흰 띠 타이어 방벽 고리, 가운데 잔디 섬, 빨간 카트(부품) ──
      const KX = 22, KZ = 78, KA = 15, KB = 13;
      for (let a = 0; a < 96; a++) {
        const t = a / 96 * Math.PI * 2, x = Math.round(KX + Math.cos(t) * KA), z = Math.round(KZ + Math.sin(t) * KB);
        w.set(x, G + 1, z, a % 4 < 2 ? B.tireO : B.tireW); if (a % 3 === 0) w.set(x, G + 2, z, B.tire);
      }
      for (let dz = -6; dz <= 6; dz++) for (let dx = -8; dx <= 8; dx++) { const q = (dx / 8) ** 2 + (dz / 6) ** 2; if (q <= 1) { w.set(KX + dx, G, KZ + dz, B.turf); if (q > 0.8) w.set(KX + dx, G + 1, KZ + dz, (dx + dz) & 1 ? B.tire : B.tireW); } }
      fir(KX, KZ, 7, 2);
      const kart = w.prop({ name: 'kart', pivot: [KX + 12, G + 1, KZ + 0.5] });
      kart.box(KX + 11, G + 1, KZ - 1, KX + 13, G + 1, KZ + 1, B.kartR); kart.set(KX + 12, G + 2, KZ, B.capK); kart.set(KX + 11, G + 2, KZ, B.kartR);
      for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) kart.set(KX + 12 + dx, G + 1, KZ + dz * 2, B.tire);
      acts.push({
        name: '고카트 한 바퀴', hint: 'IDEA 앞 타이어 트랙을 빨간 고카트가 한 바퀴 돌아요', hit: [KX + 9, G + 1, KZ - 3, KX + 15, G + 3, KZ + 3],
        run: async a => {
          const pts = []; for (let k = 1; k <= 16; k++) { const t = k / 16 * Math.PI * 2; pts.push([Math.cos(t) * 12 - 12, 0, Math.sin(t) * 10, -t]); }
          a.burst([KX + 12, G + 1.5, KZ], { n: 14, colors: ['#9a968e', '#c8c4bc'], speed: 2, up: 1, life: 0.6, gravity: 2, spread: 1, flat: true });
          await a.path('kart', pts, 5);
          a.unwind('kart'); await a.tween('kart', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.3);
        },
      });

      // ── 버려진 차(녹슨 라다), 쇼핑카트, 콘크리트 방벽, 가로등 ──
      const car = (x, z, ax, col, o) => {
        o = o || {};
        const L = 7, Wd = 4, at = (u, v, y, b) => ax === 'z' ? w.set(x + v, y, z + u, b) : w.set(x + u, y, z + v, b);
        for (let u = 0; u < L; u++) for (let v = 0; v < Wd; v++) {
          if ((u === 1 || u === L - 2) && (v === 0 || v === Wd - 1) && !o.sunk) at(u, v, G + 1, B.tire);
          const y0 = o.sunk ? G : G + 1;
          at(u, v, y0 + 1, h(x + u, v, z) > 0.8 ? B.rust : col);
          if (u >= 2 && u <= 4) at(u, v, y0 + 2, (v === 0 || v === Wd - 1 || u === 2) ? B.glassK : col);
          if (u >= 2 && u <= 4) at(u, v, y0 + 3, o.roofless ? 0 : col);
        }
      };
      for (const [x, z, ax, col, o] of [[148, 68, 'z', B.carB], [158, 82, 'z', B.carW, { sunk: 1 }], [176, 68, 'z', B.carG], [150, 106, 'z', B.carR], [182, 120, 'z', B.carW], [44, 106, 'z', B.carG, { sunk: 1 }], [62, 120, 'z', B.carB], [138, 112, 'x', B.carR, { roofless: 1 }], [186, 84, 'z', B.carB]]) car(x, z, ax, col, o);
      for (const [x, z] of [[96, 62], [140, 98], [76, 100]]) cartAt(w, x, z, h(x, z, 1) > 0.5);
      for (const [x, z] of [[36, 60], [40, 60], [100, 120], [104, 120], [136, 60], [174, 98], [178, 98]]) w.box(x, G + 1, z, x + 2, G + 2, z, B.jersey);
      const pole = (x, z) => { w.box(x, G + 1, z, x, G + 13, z, B.pole); w.box(x - 2, G + 13, z, x + 2, G + 13, z, B.pole); w.set(x - 2, G + 12, z, B.lampN); w.set(x + 2, G + 12, z, B.lampN); };
      for (const x of [14, 40, 66, 116, 144, 170, 192]) pole(x, 58);
      for (const [x, z] of [[84, 92], [150, 96], [30, 112], [190, 110]]) pole(x, z);
      for (const [x, z] of [[100, 86], [140, 82], [72, 112]]) fir(x, z, 7, 2);
      return { lights, landmarks, acts };
    },
  });
})();
