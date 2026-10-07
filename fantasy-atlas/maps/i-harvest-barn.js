// 붉은 헛간(하위 지도) — 황금들녘 동쪽 언덕의 큰 곡식 창고. 서쪽 두 쪽 큰 문, 가운데 널마루 탈곡 마당,
// 북쪽 벽 아래 곡식 칸막이와 마구간, 그 위 건초 다락(계단 · 도르래), 남쪽 수레와 곡물 자루. 남·동쪽 벽은 잘라 낮췄다
// (128칸, 2배 해상도 · 1칸 ≈ 25cm: 낱돌 기초, 판자벽과 덧대기 살, 십자 창살, X 가새 문짝, 판자 이음이 보이는 널마루, 다리·갈기·꼬리가 있는 말)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 128, D = 128, Hh = 96, G = 20;
  MAPS.push({
    id: 'harvest-barn', cat: 'village', sub: true, parent: 'harvest', name: '붉은 헛간', en: 'Harvest Hollow · Red Barn', color: '#a83a2a', seed: 1511, base: G, time: 'day', size: [W, D, Hh],
    playerScale: 2,
    desc: '황금들녘 사람들이 겨울 곡식을 쌓아 두는 붉은 헛간. 서쪽 큰 문을 열면 널마루 탈곡 마당에 도리깨 소리가 울리고, 북쪽 벽 아래로 밀이 그득한 곡식 칸막이와 말 칸이 늘어서 있다. 계단을 오르면 건초 다락, 다락 끝 도르래가 곡물 자루를 끌어 올린다.',
    info: { title: '장소 정보', en: 'RED BARN', rows: [['쓰임', '겨울 곡식 창고 · 탈곡 마당'], ['아래층', '곡식 칸막이 · 말 칸 · 마구 걸이'], ['다락', '건초 더미 · 도르래 · 건초 미끄럼틀']] },
    sky: ['#fbd29a', '#c88a5a', '#ffe4a8'], stars: false,
    hemi: ['#ffe8c8', '#5a3a20', 0.62], sun: ['#ffd0a0', 0.72, [0.6, 0.9, 0.45]],
    night: { sky: ['#2a2238', '#0c0a16', '#c88a48'], stars: true, hemi: ['#b0a8c8', '#1a1410', 0.42], sun: ['#c8d0ff', 0.3, [0.6, 0.9, 0.45]], haze: '#2a2230' },
    liquid: ['#3a5a6a', '#5a8a9a', '#e8f4f0'], liqSpeed: 0.3,
    fog: { start: 0.92, floor: G - 24, depth: 12, haze: [12, 0.12, 12], hazeColor: '#f0c890' },
    camY: 4, zoom: 1.8,
    particles: [
      { n: 110, colors: ['#fff0c8', '#f0d890', '#ffffff'], mode: 'drift', speed: 0.24, wind: 0.2, area: [64, 64, 32], y0: G + 2, y1: G + 24, glow: true },
      { n: 50, colors: ['#dcb456', '#e0c070', '#c8a860'], mode: 'fall', speed: 0.36, wind: 0.4, area: [60, 44, 18], y0: G + 12, y1: G + 24, glow: false },
    ],
    blocks: {
      grass: { c: '#6a4a30', top: '#9aa04a', v: 0.08 }, grass2: { c: '#6a4a30', top: '#b0a048', v: 0.08 }, dirt: { c: '#6a4a30', v: 0.08 }, rock: { c: '#7a7068', v: 0.06, pat: 'stone' },
      earth: { c: '#6a4a30', top: '#8a6a44', v: 0.08 }, strawF: { c: '#6a4a30', top: '#c8a860', v: 0.1 }, path: { c: '#6a4a30', top: '#c8a878', v: 0.1 },
      thresh: { c: '#8a6a40', top: '#b08a5a', v: 0.04 }, threshB: { c: '#7a5c36', top: '#9e7a4c', v: 0.04 }, loftF: { c: '#7a5a3a', top: '#9a7448', v: 0.04 }, loftB: { c: '#6a4c30', top: '#86643c', v: 0.04 },
      barnR: { c: '#a83a2a', v: 0.03 }, barnRd: { c: '#8a2e22', v: 0.03 }, barnW: { c: '#e8e0d0', v: 0.02 },
      st1: { c: '#8e8478', v: 0.05 }, st2: { c: '#7c746a', v: 0.05 }, st3: { c: '#9c9284', v: 0.05 }, st4: { c: '#888070', v: 0.05 }, mortar: { c: '#a49a88', v: 0.04 }, sill: { c: '#b0a698', v: 0.04 },
      door: { c: '#4a2e1c', v: 0.03 }, win: { c: '#ffd890', night: true, day: '#a8c8d0' },
      hay: { c: '#dcb456', v: 0.06 }, hay2: { c: '#c8a048', v: 0.06 }, wheat: { c: '#e0bc50', v: 0.06 }, wheatTop: { c: '#ecc860', v: 0.06 }, sack: { c: '#d8c8a0', v: 0.04 }, sack2: { c: '#c8b48a', v: 0.04 },
      log: { c: '#5a3a24', v: 0.05 }, logEnd: { c: '#b08a5a', v: 0.04 }, wood: { c: '#6a4428', v: 0.05 }, cart: { c: '#8a6a40', v: 0.05 }, plank: { c: '#9a6a40', v: 0.05 },
      crate: { c: '#9a7448', v: 0.05 }, crateEdge: { c: '#6a4e2e', v: 0.04 },
      pumpkin: { c: '#e8801a', v: 0.05 }, pumpkin2: { c: '#cc6a12', v: 0.05 }, stem: { c: '#4a7a2a', v: 0.05 }, apple: { c: '#c8302a', v: 0.04 },
      iron: { c: '#3a3a40', v: 0.03 }, ironDk: { c: '#2a2a30', v: 0.03 }, rope: { c: '#b8a080', v: 0.04 }, brass: { c: '#e0b850', v: 0.02 },
      leather: { c: '#6a3a24', v: 0.04 }, leatherDk: { c: '#4a2818', v: 0.04 }, horse: { c: '#7a4a2a', v: 0.04 }, horseDk: { c: '#5e3820', v: 0.04 }, horseL: { c: '#e8dcc8', v: 0.03 }, mane: { c: '#2a1a12', v: 0.03 }, eye: { c: '#141010', v: 0 }, hoof: { c: '#3a2a20', v: 0.03 },
      water: { c: '#5a8aa8', v: 0.03 }, lamp: { c: '#ffd890', glow: true }, leafY: { c: '#e8b83a', v: 0.08 }, leafO: { c: '#e08a2a', v: 0.08 }, leafR: { c: '#c04a2a', v: 0.08 }, bark: { c: '#5a3a24', v: 0.06 },
    },
    build(w) {
      const B = w.id;
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const X0 = 28, X1 = 98, Z0 = 36, Z1 = 90, TOP = G + 26, LY = G + 12;     // 벽 선, 벽 높이, 다락 바닥
      const DZ0 = 56, DZ1 = 67;                                               // 서쪽 큰 문
      const inR = (x, z) => x > X0 && x < X1 && z > Z0 && z < Z1;
      MH.terrain(w, { floor: G - 12, height: () => G, surface: (x, z) => hash3(x >> 2, 1, z >> 2) > 0.7 ? B.grass2 : B.grass, under: (x, z, y, dep) => dep < 4 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];
      const STONES = [B.st1, B.st2, B.st3, B.st1, B.st4, B.st2];
      const stoneAt = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return 0;
        return STONES[(hash3(Math.floor(uu / 6), c, salt) * 6) | 0];
      };
      const sack = (T, x, y, z, b) => {
        b = b || B.sack;
        for (let dz = 0; dz < 3; dz++) for (let dx = 0; dx < 3; dx++) {
          const corner = (dx !== 1 && dz !== 1);
          if (!corner) T.set(x + dx, y, z + dz, b);
          T.set(x + dx, y + 1, z + dz, (dx + dz) % 2 ? b : B.sack2);
          if (!corner) T.set(x + dx, y + 2, z + dz, b);
        }
        T.set(x + 1, y + 3, z + 1, B.rope); T.set(x + 1, y + 4, z + 1, B.sack2);
      };
      const crate = (x, y, z, s) => {
        for (let dy = 0; dy < s; dy++) for (let dz = 0; dz < s; dz++) for (let dx = 0; dx < s; dx++) {
          const e = (dx === 0 || dx === s - 1) + (dy === 0 || dy === s - 1) + (dz === 0 || dz === s - 1);
          S(x + dx, y + dy, z + dz, e >= 2 ? B.crateEdge : B.crate);
        }
      };
      const hayBale = (x, y, z, alongX) => {
        for (let a = 0; a < 6; a++) for (let b2 = 0; b2 < 4; b2++) for (let h = 0; h < 3; h++) {
          const [px, pz] = alongX ? [x + a, z + b2] : [x + b2, z + a];
          S(px, y + h, pz, (a === 1 || a === 4) && (h === 2 || b2 === 0 || b2 === 3) ? B.rope : B.hay);
        }
      };
      const pumpkinAt = (x, y, z, r) => {
        const ry = r * 0.72, R = Math.ceil(r), top = Math.round(ry * 2), cy = y + ry;
        for (let dy = 0; dy <= top; dy++) for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          if ((dx * dx + dz * dz) / (r * r) + ((y + dy - cy) ** 2) / (ry * ry) > 1.08) continue;
          S(x + dx, y + dy, z + dz, (Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 4)) & 1) ? B.pumpkin : B.pumpkin2);
        }
        S(x, y + top + 1, z, B.stem);
      };

      // ── 바닥: 흙바닥에 흩어진 짚, 가운데 널마루 탈곡 마당(판자 이음), 바깥은 풀밭과 문 앞 흙길 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) S(x, G, z, hash3(x >> 2, 3, z >> 2) > 0.62 ? B.strawF : B.earth);
      const TX0 = 56, TX1 = 80, TZ0 = 60, TZ1 = 78;
      for (let z = TZ0; z <= TZ1; z++) for (let x = TX0; x <= TX1; x++) S(x, G, z, (x === TX0 || x === TX1 || z === TZ0 || z === TZ1) ? B.cart : ((x >> 1) & 1 ? B.thresh : B.threshB));
      for (let z = DZ0 - 2; z <= DZ1 + 2; z++) for (let x = 4; x < X0; x++) S(x, G, z, hash3(x >> 1, 4, z >> 1) > 0.78 ? B.grass : B.path);

      // ── 벽: 북·서는 높고(낱돌 기초, 붉은 판자벽, 안쪽 덧대기 살, 흰 띠), 동·남은 잘라 낮췄다 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (inR(x, z)) continue;
        const low = x === X1 || z === Z1, corner = (x === X0 || x === X1) && (z === Z0 || z === Z1);
        const a = (x === X0 || x === X1) ? z : x;
        if (low) {
          const post = corner || a % 12 === 0;
          for (let y = G + 1; y <= G + (post ? 6 : 4); y++) S(x, y, z, post || y === G + 4 ? B.barnW : (y <= G + 2 ? (stoneAt(a, y, 7) || B.mortar) : B.barnR));
          continue;
        }
        for (let y = G + 1; y <= TOP; y++) {
          let b = (y >= TOP - 1 || y === LY || y === LY + 1 || corner) ? B.barnW : B.barnR;
          if (y <= G + 3) b = stoneAt(a, y, 7) || B.mortar;
          S(x, y, z, b);
        }
      }
      // 안쪽 덧대기 살(4칸마다), 모서리 기둥
      for (let x = X0 + 4; x < X1; x += 4) for (let y = G + 4; y < TOP - 1; y++) if (y !== LY && y !== LY + 1) S(x, y, Z0 + 1, B.barnRd);
      for (let z = Z0 + 4; z < Z1; z += 4) for (let y = G + 4; y < TOP - 1; y++) if (y !== LY && y !== LY + 1 && (z < DZ0 - 2 || z > DZ1 + 2)) S(X0 + 1, y, z, B.barnRd);
      // 북쪽 높은 창(다락 위, 십자 창살)과 서쪽 창
      const winAt = (x0, z0, alongX, y0, wd, ht) => {
        for (let r = -1; r <= ht; r++) for (let c = -1; c <= wd; c++) {
          const [x, z] = alongX ? [x0 + c, z0] : [x0, z0 + c];
          const fr = r === -1 || r === ht || c === -1 || c === wd;
          S(x, y0 + r, z, fr ? B.barnW : (c === (wd >> 1) || r === (ht >> 1) ? B.door : B.win));
        }
      };
      for (const x of [42, 54, 66, 78, 90]) winAt(x, Z0, true, G + 17, 4, 6);
      for (const z of [44, 80]) winAt(X0, z, false, G + 6, 4, 5);
      // 서쪽 큰 문: 문틀, 바깥으로 활짝 연 두 쪽 문(흰 테 · X 가새)
      w.box(X0, G + 1, DZ0, X0 + 1, G + 17, DZ1, 0);
      w.box(X0, G + 18, DZ0 - 1, X0, G + 18, DZ1 + 1, B.barnW);
      for (const z of [DZ0 - 1, DZ1 + 1]) w.box(X0, G + 1, z, X0, G + 18, z, B.barnW);
      for (let z = DZ0; z <= DZ1; z++) { S(X0, G, z, B.thresh); S(X0 + 1, G, z, B.thresh); }
      for (const z of [DZ0 - 2, DZ1 + 2]) {
        for (let k = 1; k <= 6; k++) for (let y = G + 1; y <= G + 16; y++) {
          const r = y - G - 1, t = r / 15, xb = X0 - k, c = k - 1;
          const edge = k === 6 || r === 0 || r === 15 || r === 7 || r === 8, cross = c === Math.round(t * 5) || c === Math.round((1 - t) * 5);
          S(xb, y, z, edge || cross ? B.barnW : B.barnR);
        }
        S(X0 - 5, G + 9, z + (z < DZ0 ? 1 : -1), B.iron);
      }
      // 문 앞 마당: 둥근 건초 더미, 물통, 단풍나무
      for (let y = 1; y <= 5; y++) w.cyl(12, 46, G + y, G + y, y <= 3 ? 3.4 : 3.4 - (y - 3) * 1.1, y % 2 ? B.hay : B.hay2);
      w.box(9, G + 1, 74, 15, G + 3, 77, B.cart); w.box(10, G + 3, 75, 14, G + 3, 76, B.water); for (const x of [9, 15]) w.box(x, G + 1, 74, x, G + 3, 77, B.iron);
      { const tx = 8, tz = 100;
        for (let y = 0; y < 14; y++) w.cyl(tx, tz, G + 1 + y, G + 1 + y, y < 2 ? 2 : 1.4, B.bark);
        for (const [dx, dy, dz, r] of [[0, 16, 0, 6], [-4, 13, 3, 4.5], [4, 13, -2, 4.5], [2, 12, 4, 4]]) w.ellipsoid(tx + dx, G + dy, tz + dz, r, r * 0.7, r, B.leafY, (x, y, z, d) => d < 0.6 || hash3(tx + x, y, tz + z) > 0.3);
        for (let k = 0; k < 40; k++) { const x = tx + ((hash3(k, 1, 5) * 16) | 0) - 8, z = tz + ((hash3(k, 2, 5) * 16) | 0) - 8; if (!w.get(x, G + 1, z)) S(x, G + 1, z, k % 2 ? B.leafO : B.leafR); } }

      // ── 건초 다락: 북쪽 벽을 따라 z 37..51, 기둥(2칸)·들보·난간, 동쪽 끝 계단 ──
      for (let z = Z0 + 1; z <= 51; z++) for (let x = X0 + 1; x <= X1 - 1; x++) S(x, LY, z, (x >> 1) & 1 ? B.loftF : B.loftB);
      for (const x of [40, 52, 64, 76, 86]) w.box(x, G + 1, 50, x + 1, LY - 1, 51, B.log);
      w.box(X0 + 1, LY - 2, 50, X1 - 1, LY - 1, 51, B.log);
      for (let x = X0 + 1; x <= 86; x++) { if (x >= 47 && x <= 52) continue; S(x, LY + 4, 51, B.wood); if (x % 4 === 0) w.box(x, LY + 1, 51, x, LY + 3, 51, B.wood); }
      // 계단(널판 12단): 탈곡 마당 동쪽에서 북쪽으로 올라 다락 동쪽 끝에 닿는다
      for (let k = 1; k <= 12; k++) { const z = 64 - k; w.box(90, G + 1, z, 95, G + k, z, k % 2 ? B.loftF : B.thresh); S(89, G + k + 3, z, B.wood); }
      for (let y = G + 1; y <= G + 4; y++) S(89, y, 63, B.log);
      for (let k = 1; k <= 12; k += 3) w.box(89, G + k, 64 - k, 89, G + k + 2, 64 - k, B.wood);
      // 다락 위: 건초 더미(서쪽, 층층 띠), 묶은 단, 쇠스랑
      for (let z = 38; z <= 47; z++) for (let x = 30; x <= 58; x++) {
        if (x >= 46 && x <= 53 && z >= 44) continue;
        const h = 2 + Math.round(5.5 * (1 - Math.abs(x - 44) / 16) * (1 - Math.max(0, z - 43) / 6) + hash3(x >> 1, 7, z >> 1) * 1.5);
        for (let y = LY + 1; y <= LY + h; y++) S(x, y, z, (y - LY) % 3 === 0 ? B.hay2 : B.hay);
      }
      for (const [x, z, al] of [[62, 38, true], [62, 42, true], [70, 38, false], [62, 39, true]]) hayBale(x, LY + 1 + (z === 39 ? 3 : 0), z === 39 ? 39 : z, al);
      w.box(82, LY + 1, 38, 82, LY + 9, 38, B.wood); w.box(81, LY + 10, 38, 83, LY + 10, 38, B.iron); for (const x of [81, 83]) w.box(x, LY + 11, 38, x, LY + 13, 38, B.iron); S(82, LY + 11, 38, B.iron); S(82, LY + 12, 38, B.iron);
      // 건초 미끄럼틀: 다락 가장자리에서 탈곡 마당 서쪽으로 비스듬히(널판 바닥과 옆 난간)
      for (let k = 0; k <= 11; k++) { const z = 52 + k, y = LY - k; for (let x = 48; x <= 51; x++) S(x, y, z, B.loftF); for (const x of [47, 52]) { S(x, y + 1, z, B.cart); S(x, y + 2, z, B.cart); } if (k % 4 === 0) for (const x of [47, 52]) w.box(x, G + 1, z, x, y, z, B.wood); }
      const pile = w.prop({ name: 'haypile', pivot: [50, G + 1, 67.5] });
      pile.ellipsoid(50, G + 1, 67, 4.8, 3.2, 3.2, B.hay, (dx, dy) => dy >= 0); pile.ellipsoid(50, G + 2, 67, 3, 2.6, 2, B.hay2, (dx, dy) => dy >= 1);

      // ── 다락 아래 서쪽: 곡식 칸막이 셋(밀 둘, 자루 하나) ──
      for (const x of [40, 50, 60]) w.box(x, G + 1, Z0 + 1, x, G + 7, 48, B.cart);
      for (let x = 30; x <= 59; x++) { if (x % 10 === 0) continue; for (let y = G + 1; y <= G + 4; y++) S(x, y, 48, y === G + 4 ? B.wood : B.cart); }
      for (let z = 37; z <= 47; z++) for (let x = 30; x <= 49; x++) {
        if (x % 10 === 0) continue;
        const h = (x < 40 ? 6 : 5) + (Math.abs(z - 42) < 3 && Math.abs((x % 10) - 5) < 3 ? 1 : 0);
        for (let y = G + 1; y <= G + h; y++) S(x, y, z, y === G + h ? B.wheatTop : B.wheat);
      }
      for (let k = 0; k < 6; k++) sack(w, 51 + (k % 3) * 3, G + 1 + (k >= 3 ? 3 : 0), 38 + (k % 2) * 4, k % 2 ? B.sack2 : B.sack);
      // 곡식 칸 앞 미닫이 판(부품): 들어 올리면 밀알이 쏟아진다. 다락 바닥 위 깔때기
      for (let x = 42; x <= 48; x++) for (let y = G + 1; y <= G + 4; y++) S(x, y, 48, 0);
      const gate = w.prop({ name: 'bingate', pivot: [45.5, G + 1, 48.5] });
      gate.box(42, G + 1, 48, 48, G + 4, 48, B.crate); gate.box(42, G + 4, 48, 48, G + 4, 48, B.crateEdge); gate.set(44, G + 3, 48, B.iron); gate.set(46, G + 3, 48, B.iron);
      w.box(42, LY + 1, 45, 48, LY + 3, 48, B.cart); w.box(43, LY + 1, 46, 47, LY + 3, 47, B.wheat); w.box(43, LY + 4, 46, 47, LY + 4, 47, B.wheatTop);

      // ── 다락 아래 동쪽: 말 칸 두 개와 마구 걸이 ──
      for (const x of [62, 74, 86]) w.box(x, G + 1, Z0 + 1, x + 1, G + 7, 48, B.log);
      for (let x = 64; x <= 85; x++) if (x !== 74 && x !== 75) { for (let y = G + 1; y <= G + 5; y++) S(x, y, 50, y === G + 5 ? B.wood : ((x % 3 === 0) ? B.wood : B.cart)); }
      for (const x0 of [64, 76]) { w.box(x0, G + 1, 37, x0 + 9, G + 3, 39, B.cart); w.box(x0 + 1, G + 3, 38, x0 + 8, G + 3, 38, B.water); w.box(x0 + 1, G + 9, 37, x0 + 8, G + 11, 38, B.hay); for (let x = x0 + 1; x <= x0 + 8; x += 2) w.box(x, G + 8, 39, x, G + 11, 39, B.wood); }
      for (let z = 40; z <= 49; z++) for (let x = 64; x <= 85; x++) if (x !== 74 && x !== 75 && hash3(x >> 1, 5, z >> 1) > 0.5) S(x, G, z, B.strawF);
      // 말(서쪽 칸): 몸통·다리·발굽·꼬리는 칸 안, 목과 머리(부품)는 칸 문 위로 내민다
      const HX = 68;
      for (const [lx, lz] of [[HX - 2, 41], [HX + 1, 41], [HX - 2, 45], [HX + 1, 45]]) { w.box(lx, G + 2, lz, lx + 1, G + 5, lz + 1, B.horse); w.box(lx, G + 1, lz, lx + 1, G + 1, lz + 1, B.hoof); w.box(lx, G + 3, lz, lx + 1, G + 3, lz + 1, B.horseDk); }
      for (let z = 39; z <= 47; z++) for (let x = HX - 3; x <= HX + 3; x++) for (let y = G + 5; y <= G + 10; y++) {
        const ex = Math.abs(x - HX) / 3.3, ey = Math.abs(y - (G + 7.5)) / 2.3, ez = Math.abs(z - 43.5) / 4.4;
        if (ex * ex + ey * ey + ez * ez > 1.1) continue;
        S(x, y, z, y <= G + 5 ? B.horseDk : B.horse);
      }
      for (let z = 41; z <= 47; z++) S(HX, G + 10, z, B.mane);
      w.box(HX, G + 4, 38, HX, G + 8, 38, B.mane); S(HX, G + 3, 38, B.mane);
      w.box(HX - 3, G + 8, 43, HX + 3, G + 8, 44, B.leather);
      const head = w.prop({ name: 'horsehead', pivot: [HX + 0.5, G + 9, 49.5], axis: 'x' });
      head.box(HX - 1, G + 8, 48, HX + 1, G + 9, 50, B.horse); head.box(HX - 1, G + 10, 48, HX + 1, G + 10, 49, B.horse); head.box(HX - 1, G + 6, 51, HX + 1, G + 9, 55, B.horse);
      head.box(HX - 1, G + 6, 56, HX + 1, G + 7, 56, B.horseL); head.box(HX, G + 8, 53, HX, G + 9, 56, B.horseL);
      head.set(HX - 2, G + 8, 52, B.eye); head.set(HX + 2, G + 8, 52, B.eye);
      for (const x of [HX - 1, HX + 1]) head.box(x, G + 10, 52, x, G + 11, 52, B.horseDk);
      for (const z of [48, 49]) head.set(HX, G + 11, z, B.mane);
      head.box(HX - 2, G + 7, 54, HX - 2, G + 7, 55, B.leather); head.box(HX + 2, G + 7, 54, HX + 2, G + 7, 55, B.leather);
      // 동쪽 칸: 건초 더미, 빈 굴레
      for (let y = 1; y <= 3; y++) w.cyl(80, 45, G + y, G + y, 3 - y * 0.6, y % 2 ? B.hay : B.hay2);
      // 마구 걸이(계단 아래 북쪽): 안장 받침에 안장, 굴레, 고삐
      w.box(88, G + 6, 37, 97, G + 6, 38, B.wood);
      for (let x = 90; x <= 93; x++) for (let y = G + 7; y <= G + 9; y++) S(x, y, 38, y === G + 9 || x === 90 || x === 93 ? B.leatherDk : B.leather);
      S(91, G + 10, 38, B.leatherDk); w.box(91, G + 3, 38, 92, G + 6, 38, B.leather); S(92, G + 3, 38, B.brass);
      w.box(96, G + 3, 37, 96, G + 8, 37, B.rope); w.box(95, G + 7, 37, 95, G + 8, 37, B.leather); S(95, G + 6, 37, B.brass);
      crate(89, G + 1, 41, 4); S(90, G + 5, 42, B.leather); S(91, G + 5, 42, B.leatherDk);

      // ── 탈곡 마당: 낟알 더미, 도리깨 받침(부품 도리깨), 키질 바구니 ──
      w.ellipsoid(64, G + 1, 70, 4.4, 2.8, 3.6, B.wheat, (dx, dy) => dy >= 0); w.ellipsoid(64, G + 1, 70, 2.6, 3.2, 2, B.wheatTop, (dx, dy) => dy >= 2);
      w.box(72, G + 1, 66, 73, G + 11, 67, B.log); w.box(72, G + 11, 68, 73, G + 11, 70, B.log);
      const flail = w.prop({ name: 'flail', pivot: [73, G + 11.5, 71], axis: 'x' });
      flail.box(72, G + 4, 71, 73, G + 10, 71, B.wood); flail.set(72, G + 3, 71, B.leather); flail.box(72, G + 1, 71, 73, G + 2, 76, B.cart); flail.set(72, G + 2, 71, B.leather);
      for (let y = G + 1; y <= G + 2; y++) w.ring(56, 74, y, 1.6, 2.8, B.cart); w.cyl(56, 74, G + 1, G + 1, 1.6, B.wheat);
      // 다락 도르래: 북쪽 벽에서 내민 들보 끝 바퀴, 밧줄에 매단 자루(부품)
      const PX = 68, PZ = 58, PY = G + 24;
      w.box(PX - 1, PY, Z0 + 1, PX, PY + 1, PZ + 2, B.log); for (let k = 0; k < 6; k++) w.box(PX - 1, PY - 1 - k, Z0 + 1 + k, PX, PY - 1 - k, Z0 + 1 + k, B.log);
      w.box(PX - 1, PY - 1, PZ - 1, PX - 1, PY - 1, PZ + 1, B.ironDk);
      const wheel = w.prop({ name: 'pulley', pivot: [PX + 1.5, PY - 2.5, PZ + 0.5], axis: 'x' });
      MH.ringProp(wheel, PX + 1, PY - 3, PZ, 2.4, 'yz', B.iron); for (const [dy, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1], [0, 0]]) wheel.set(PX + 1, PY - 3 + dy, PZ + dz, dy || dz ? B.wood : B.ironDk);
      const RL = 13;
      MH.rope(w, 'hrope', PX + 1, PY - 6, PZ + 2, RL, B.rope);
      const hsack = w.prop({ name: 'hsack', pivot: [PX + 1.5, G + 4, PZ + 2.5] });
      sack(hsack, PX, G + 3, PZ + 1, B.sack);
      crate(PX - 2, G + 1, PZ - 1, 2); w.box(PX - 2, G + 1, PZ - 1, PX + 4, G + 2, PZ + 5, B.crate); w.box(PX - 2, G + 2, PZ - 1, PX + 4, G + 2, PZ + 5, B.crateEdge);

      // ── 남쪽: 호박 실은 수레(바퀴·끌채), 곡물 자루 더미(부품 셋), 연장 걸이 ──
      w.box(74, G + 4, 80, 86, G + 4, 86, B.plank); w.walls(74, G + 5, 80, 86, G + 6, 86, B.cart);
      for (const x of [74, 80, 86]) for (const z of [80, 86]) S(x, G + 7, z, B.wood);
      for (const [px, pz, r] of [[77, 83, 2.2], [82, 82, 1.8], [83, 85, 1.6], [79, 85, 1.4]]) pumpkinAt(px, G + 5, pz, r);
      for (const x of [76, 84]) for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const r = Math.hypot(dx, dy); if (r > 3.1) continue; if (r > 2.3 || r < 0.8 || dx === 0 || dy === 0) S(x + dx, G + 4 + dy, 79, r < 0.8 ? B.ironDk : r > 2.6 ? B.iron : B.wood); }
      for (const x of [68, 72]) w.line(x, G + 1, 83, 73, G + 4, 83, B.wood);
      for (let k = 0; k < 5; k++) sack(w, 31 + (k % 3) * 3, G + 1 + (k >= 3 ? 3 : 0), 82 + (k === 4 ? 2 : 0), k % 2 ? B.sack2 : B.sack);
      const sacks = [];
      for (let k = 0; k < 3; k++) {
        const x = 42 + k * 4, z = 82;
        const p = w.prop({ name: 'sk' + k, pivot: [x + 1.5, G + 1, z + 1.5] });
        sack(p, x, G + 1, z, k % 2 ? B.sack2 : B.sack);
        sacks.push([x + 1.5, z + 1.5]);
      }
      // 서쪽 벽 연장: 쇠스랑, 낫, 갈퀴
      for (const [z, t] of [[72, 0], [76, 1], [84, 2]]) {
        w.box(X0 + 1, G + 1, z, X0 + 1, G + 11, z, B.wood);
        if (t === 0) { w.box(X0 + 1, G + 12, z - 2, X0 + 1, G + 12, z + 2, B.iron); for (const dz of [-2, 0, 2]) w.box(X0 + 1, G + 13, z + dz, X0 + 1, G + 15, z + dz, B.iron); }
        else if (t === 1) { S(X0 + 1, G + 12, z, B.wood); S(X0 + 1, G + 12, z + 1, B.iron); S(X0 + 1, G + 11, z + 2, B.iron); S(X0 + 1, G + 11, z + 3, B.iron); S(X0 + 1, G + 10, z + 4, B.iron); }
        else { w.box(X0 + 1, G + 12, z - 3, X0 + 1, G + 12, z + 3, B.wood); for (let dz = -3; dz <= 3; dz += 2) S(X0 + 1, G + 11, z + dz, B.iron); }
      }
      // 사과 상자
      for (const [x, z] of [[93, 70], [93, 74], [90, 78]]) { crate(x, G + 1, z, 3); for (const [dx, dz] of [[0, 0], [1, 1], [2, 0], [0, 2], [2, 2]]) S(x + dx, G + 4, z + dz, B.apple); }

      // ── 등불: 기둥 등(부품: 흔들린다)과 다락 등 ──
      w.box(54, G + 1, 80, 54, G + 15, 80, B.log); w.box(55, G + 15, 80, 57, G + 15, 80, B.wood);
      const lan = w.prop({ name: 'lantern', pivot: [56.5, G + 15, 80.5], axis: 'x' });
      lan.box(56, G + 13, 80, 56, G + 14, 80, B.iron); lan.box(56, G + 10, 80, 56, G + 12, 80, B.lamp); lan.set(56, G + 9, 80, B.iron);
      lights.push({ name: 'lantern', p: [56.5, G + 11, 80.5], c: '#ffc870', i: 0.7, d: 32, flicker: 0.15, srcR: 4 });
      S(64, LY + 1, 49, B.lamp); S(88, LY + 1, 49, B.lamp);
      lights.push({ name: 'loft', p: [76, LY + 4, 46], c: '#ffd890', i: 0.6, d: 36, flicker: 0.12, srcR: 12 });
      S(X0 + 1, G + 14, DZ0 - 4, B.lamp); S(X0 + 2, G + 14, DZ0 - 4, B.iron);
      lights.push({ name: 'door', p: [X0 + 4, G + 10, (DZ0 + DZ1) / 2], c: '#fff0c8', i: 0.5, d: 40, flicker: 0.05, srcR: 10 });
      S(42, G + 1, 54, B.lamp); S(42, G + 2, 54, B.iron);
      lights.push({ name: 'bins', p: [44, G + 5, 52], c: '#ffd890', i: 0.4, d: 24, flicker: 0.1, srcR: 4 });

      landmarks.push({ name: '탈곡 마당', note: '널마루 · 도리깨 · 낟알 더미', p: [68, G + 24, 70] });
      landmarks.push({ name: '건초 다락', note: '계단과 도르래 · 건초 미끄럼틀', p: [60, LY + 20, 44] });
      landmarks.push({ name: '말 칸', note: '밤색 말 · 여물통 · 마구 걸이', p: [74, G + 20, 44] });

      // ───── 상호작용 ─────
      acts.push(OR.goAct({ at: [X0 + 2, G + 1, (DZ0 + DZ1) >> 1], h: 16, name: '밖으로 나가기', goto: 'harvest', hint: '큰 문을 지나 황금들녘의 헛간 앞마당으로 나가요', hit: [X0, G + 1, DZ0, X0 + 2, G + 16, DZ1] }));
      acts.push({
        name: '도리깨 탈곡', hint: '도리깨가 널마루를 내리치자 밀 낟알과 겨가 사방으로 튀어요', hit: [66, G + 1, 66, 74, G + 11, 77],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await a.turn('flail', [-1.2, 0, 0], 0.4);
            await a.turn('flail', [0.35, 0, 0], 0.18);
            a.burst([73, G + 2.6, 76], { n: 28, colors: ['#e0bc50', '#f0d890', '#c8a860'], speed: 6, up: 6, life: 1, gravity: 14, spread: 2 });
            a.burst([65, G + 5, 71], { n: 12, colors: ['#f4e8c0', '#dcb456'], speed: 2.4, up: 4, life: 1.6, gravity: -0.6, spread: 3 });
          }
          await a.turn('flail', [0, 0, 0], 0.5);
        },
      });
      acts.push({
        name: '다락 도르래', hint: '도르래가 끼익 돌며 곡물 자루를 건초 다락 높이까지 끌어 올려요', hit: [PX - 2, G + 1, PZ - 1, PX + 4, G + 8, PZ + 5],
        run: async a => {
          const up = 10;
          await Promise.all([a.move('hsack', [0, up, 0], 2.4), a.rope('hrope', RL, RL - up, 2.4), a.turn('pulley', [-6, 0, 0], 2.4)]);
          a.burst([PX + 1.5, G + 4 + up + 2, PZ + 2.5], { n: 16, colors: ['#f8f4ea', '#d8c8a0'], speed: 2, up: 2, life: 1, gravity: 2, spread: 1.2 });
          await a.wait(1.2);
          await Promise.all([a.move('hsack', [0, 0, 0], 2), a.rope('hrope', RL, RL, 2), a.turn('pulley', [0, 0, 0], 2)]);
          a.burst([PX + 1.5, G + 3, PZ + 2.5], { n: 18, colors: ['#e8dcc0', '#c8b48a'], speed: 4, up: 1, life: 0.6, gravity: 8, spread: 1.6, flat: true });
        },
      });
      acts.push({
        name: '말 먹이 주기', hint: '밤색 말이 고개를 숙여 건초를 우물우물 먹고는 히힝 고개를 쳐들어요', hit: [HX - 3, G + 1, 48, HX + 3, G + 12, 57],
        run: async a => {
          for (let k = 0; k < 3; k++) {
            await a.turn('horsehead', [0.7, 0, 0], 0.5);
            a.burst([HX + 0.5, G + 3, 56], { n: 14, colors: ['#dcb456', '#e0c070'], speed: 2.4, up: 3, life: 1, gravity: 8, spread: 1.2 });
            await a.turn('horsehead', [0.45, 0, 0], 0.3);
          }
          await a.turn('horsehead', [-0.5, 0, 0], 0.4);
          a.burst([HX + 0.5, G + 8, 57.5], { n: 10, colors: ['#ffffff', '#e8eef0'], speed: 1.6, up: 2, life: 0.8, gravity: -0.4, spread: 0.6 });
          await a.wait(0.4); await a.turn('horsehead', [0, 0, 0], 0.6);
        },
      });
      acts.push({
        name: '건초 미끄럼틀', hint: '다락에서 건초 한 아름이 미끄럼틀을 타고 쏟아져 내려 건초 더미가 불룩해져요', hit: [46, G + 1, 52, 54, LY + 2, 68],
        run: async a => {
          for (let k = 0; k < 8; k++) { a.burst([50, LY - k * 1.4 + 3, 53 + k * 1.5], { n: 16, colors: ['#dcb456', '#c8a048', '#e0c070'], speed: 2.4, up: 1, life: 0.8, gravity: 10, spread: 1.2 }); await a.wait(0.14); }
          await a.tween('haypile', { scl: [1.8, 2.6, 1.8] }, 0.5);
          a.burst([50, G + 5, 67.5], { n: 34, colors: ['#dcb456', '#e0c070', '#f0d890'], speed: 6, up: 4, life: 1.4, gravity: 6, spread: 3.2 });
          await a.wait(1.2); await a.tween('haypile', { scl: [1, 1, 1] }, 1);
        },
      });
      acts.push({
        name: '곡물 자루 쌓기', hint: '곡물 자루들이 하나씩 폴짝 뛰어올라 차곡차곡 쌓여요', hit: [41, G + 1, 81, 54, G + 6, 86],
        run: async a => {
          const ends = [[1, 0, 0], [-1, 0, 0], [-2, 3, 0]];
          for (const k of [0, 2, 1]) {
            const [dx, dy] = ends[k];
            await a.move('sk' + k, [dx * 0.5, dy + 6, 0], 0.35);
            await a.move('sk' + k, [dx, dy, 0], 0.3);
            a.burst([sacks[k][0] + dx, G + 1.4 + dy, sacks[k][1]], { n: 14, colors: ['#e8dcc0', '#c8b48a'], speed: 3, up: 1, life: 0.6, gravity: 6, spread: 1.2, flat: true });
          }
          await a.wait(2);
          for (const k of [1, 2, 0]) await a.move('sk' + k, [0, 0, 0], 0.4);
        },
      });
      acts.push({
        name: '곡식 칸막이', hint: '곡식 칸 앞 미닫이 판을 들어 올리면 금빛 밀알이 좌르르 쏟아져 나와요', hit: [40, G + 1, 46, 50, G + 8, 52],
        run: async a => {
          a.flash('bins', 3, 3);
          a.burst([45, LY + 5, 47], { n: 18, colors: ['#e0bc50', '#f0d070'], speed: 2, up: 2, life: 0.8, gravity: 6, spread: 1.6 });
          await a.move('bingate', [0, 4, 0], 0.6);
          for (let k = 0; k < 12; k++) { a.burst([43 + (k % 4) * 1.6, G + 2.2, 50.4], { n: 14, colors: ['#e0bc50', '#f0d070', '#c8a040'], speed: 4.4, up: 2.4, life: 0.9, gravity: 16, spread: 1 }); await a.wait(0.16); }
          a.burst([45.5, G + 3, 54], { n: 30, colors: ['#e0bc50', '#f4e8c0'], speed: 4, up: 3, life: 1.2, gravity: 6, spread: 2.8 });
          await a.wait(0.6); await a.move('bingate', [0, 0, 0], 0.6);
        },
      });
      acts.push({
        name: '헛간 등불', hint: '기둥 등불이 흔들리며 환하게 타오르고 짚 먼지가 반짝반짝 떠올라요', hit: [52, G + 1, 78, 58, G + 16, 82],
        run: async a => {
          a.flash('lantern', 4, 3); a.flash('loft', 2, 3); a.glow(1.3, 3);
          for (let k = 0; k < 3; k++) { await a.turn('lantern', [0.9, 0, 0], 0.45); await a.turn('lantern', [-0.9, 0, 0], 0.45); a.burst([56.5, G + 10, 80.5], { n: 14, colors: ['#fff0c8', '#ffd890'], speed: 1.6, up: 2.8, life: 1.6, gravity: -0.8, spread: 2.8 }); }
          await a.turn('lantern', [0, 0, 0], 0.5);
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
