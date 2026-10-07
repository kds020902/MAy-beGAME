// 잿빛 묘지 — 안개 낀 묘역 언덕과 정상의 고딕 납골당, 동쪽 고지의 화장터와 지하묘지 입구 (320칸, 2배 해상도: 1칸 ≈ 25cm)
// 낱돌 벽(줄눈이 파인)·층층이 물러나는 버팀벽과 작은 첨탑·뾰족 창의 창살과 가로살·겹아치 정문·바퀴살 장미창·슬레이트 지붕 결,
// 해골 첨탑, 반목조 오두막(창틀·덧문·경첩·이엉·벽돌 굴뚝), 종루의 종(관·추), 둥근 머리·십자·오벨리스크 묘비와 쇠울타리 무덤,
// 줄눈 판석 광장·난간 동자·돌 항아리, 협곡의 지층 벼랑과 바위 선반·무너진 돌, 점점 깊어지는 물과 모래·자갈 바닥. playerScale 2.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 320, D = 320, Hh = 256;
  const KO = 2.5;   // 원래 128칸 설계 좌표(o) → 이 지도 좌표
  MAPS.push({
    id: 'ashen', cat: 'dungeon', name: '잿빛 묘지', en: 'Ashen Cemetery', color: '#9aa0a6', seed: 11, base: 48, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '끝나지 않는 장례가 이어지는 묘지. 굶주린 망자들이 산 자의 온기를 찾아 기어 나온다. 납골당 옆 동쪽 고지의 화장터 굴뚝에서는 밤낮없이 재가 쏟아져 묘지를 잿빛으로 덮고, 그 아래 뼈 아치 너머로 지하묘지가 입을 벌리고 있다.',
    info: { title: '장소 정보', en: 'ASHEN CEMETERY', rows: [['자리', '안개 낀 언덕 · 협곡 서쪽'], ['정상', '뼈의 납골당과 해골 첨탑'], ['동쪽 고지', '잿빛 화장터 · 해골 지하묘지 입구']] },
    monsters: { normal: ['구울', '해골 병사', '울부짖는 망령', '재의 망령'], mid: '무덤지기', boss: '뼈의 군주' },
    sky: ['#17151c', '#3b3844', '#5d5866'], stars: true,
    hemi: ['#a8adc2', '#2a2622', 0.72], sun: ['#d0d8ee', 0.78, [0.55, 1, 0.4]],
    day: { sky: ['#b8bcc4', '#7c8290', '#d8d8dc'], stars: false, hemi: ['#e8eaf0', '#4a4640', 0.6], sun: ['#f0ece0', 0.62, [0.55, 1, 0.4]], haze: '#a8aab2' },
    liquid: ['#1f2a26', '#34463e', '#8fb89a'], liqSpeed: 0.5,
    fog: { start: 0.72, floor: 36, depth: 20, haze: [64, 0.2, 14], hazeColor: '#66646f' },
    camY: 4, zoom: 1.05,
    particles: [
      { n: 1300, colors: ['#8e8a86', '#6d6a68', '#b0aaa2'], mode: 'fall', speed: 1.2, y0: 48, y1: 220, glow: false },
      { n: 80, colors: ['#8dffba', '#c9ffd9'], mode: 'wisp', speed: 1, size: 3, y0: 68 },
    ],
    blocks: {
      ash: { c: '#66615d', top: '#76716c', v: 0.08 }, ash2: { c: '#5c5754', top: '#68635f', v: 0.08 },
      deadgrass: { c: '#5a5848', top: '#66654a', v: 0.1 }, soil: { c: '#3b302a', top: '#4a3e34', v: 0.08 }, grassTuft: { c: '#5e5c44', v: 0.12 },
      rock: { c: '#56555c', v: 0.06, pat: 'stone' }, rockDk: { c: '#3e3d44', v: 0.06, pat: 'stone' }, rockM: { c: '#4a4a50', top: '#525a4a', v: 0.06, pat: 'big' },
      rockL: { c: '#66646a', v: 0.06, pat: 'stone' }, rockB: { c: '#544a44', v: 0.06, pat: 'stone' },
      sand: { c: '#5e5a50', top: '#6e695c', v: 0.1 }, gravel: { c: '#4e4c4c', top: '#64615e', v: 0.14 }, silt: { c: '#3a3a34', top: '#44463c', v: 0.1 }, weedBed: { c: '#34402e', top: '#3c4a34', v: 0.12 },
      wallB: { c: '#74727a', v: 0.05, pat: 'brick' }, wallBd: { c: '#56545c', v: 0.05 }, trim: { c: '#8a8890', v: 0.04 },
      st1: { c: '#76747c', v: 0.04 }, st2: { c: '#6c6a72', v: 0.04 }, st3: { c: '#7e7c84', v: 0.04 }, st4: { c: '#686a70', v: 0.04 }, mortar: { c: '#3e3c44', v: 0.03 },
      path: { c: '#55565e', top: '#6a6b72', v: 0.1 }, path2: { c: '#55565e', top: '#62636a', v: 0.1 }, pathJ: { c: '#3e3e44', top: '#45454c', v: 0.05 },
      roof: { c: '#2c2a33', v: 0.04, pat: 'tile' }, roofE: { c: '#1d1b22', v: 0.03 },
      tile: { c: '#34323c', v: 0.04 }, tile2: { c: '#26242c', v: 0.03 }, tile3: { c: '#3c3a44', v: 0.04 }, tileDk: { c: '#1d1b22', v: 0.03 },
      marble: { c: '#9a9aa2', v: 0.05 }, bone: { c: '#d9d1bd', v: 0.05 }, dark: { c: '#0c0a0e', v: 0 },
      iron: { c: '#24242b', v: 0.03 }, ironDk: { c: '#18181e', v: 0.03 }, wood: { c: '#4a3526', v: 0.06 }, plank: { c: '#5c4331', v: 0.08, pat: 'plank' },
      thatch: { c: '#4a4238', v: 0.07 }, thatch2: { c: '#3e372e', v: 0.07 }, thatch3: { c: '#5a5044', v: 0.07 }, thatchDk: { c: '#2e2924', v: 0.06 },
      tomb: { c: '#8a8b92', v: 0.08 }, tombDk: { c: '#6c6d74', v: 0.08 }, tombMoss: { c: '#5e6a5a', v: 0.1 }, mound: { c: '#43372f', top: '#4f433a', v: 0.08 },
      bark: { c: '#2c2522', v: 0.06 }, barkDk: { c: '#1c1716', v: 0.05 }, coffin: { c: '#3a2a22', v: 0.05, pat: 'plank' }, lid: { c: '#4d3829', v: 0.05, pat: 'plank' },
      bell: { c: '#a8823a', v: 0.06 }, bellDk: { c: '#7a5e28', v: 0.05 }, crow: { c: '#141218', v: 0.03 }, slab: { c: '#7a7a82', v: 0.06, pat: 'big' },
      gfire: { c: '#8dffb0', glow: true }, gglass: { c: '#50e890', night: true, day: '#2a4a3c' }, warm: { c: '#ffc46e', night: true, day: '#4a4038' },
      candle: { c: '#fff0c4', glow: true }, wax: { c: '#cfc6b0', v: 0.03 }, soul: { c: '#70ffa8', glow: true },
      flagS: { c: '#5e5f67', top: '#71727a', v: 0.05 }, flagS2: { c: '#5e5f67', top: '#6a6b73', v: 0.05 }, flagS3: { c: '#5e5f67', top: '#777880', v: 0.05 }, flagJ: { c: '#3e3e46', top: '#4a4a52', v: 0.03 },
      rust: { c: '#5a3a2a', v: 0.06 },
      brickR: { c: '#6a5048', v: 0.05, pat: 'brick' }, brickR2: { c: '#5a423c', v: 0.05, pat: 'brick' }, soot: { c: '#1a1818', v: 0.03 }, ember: { c: '#ff8a3a', glow: true }, ember2: { c: '#ffd070', glow: true },
      coal: { c: '#222022', v: 0.08 }, urn: { c: '#7a6a5a', v: 0.05 }, urnDk: { c: '#5e5044', v: 0.05 }, wither: { c: '#6a3a4a', v: 0.08 }, witherStem: { c: '#4a4434', v: 0.08 },
      cinder: { c: '#3a3634', top: '#5a5450', v: 0.1 },
      // 오두막(반목조)용
      daub: { c: '#6e665a', v: 0.04 }, frame: { c: '#3a2a1e', v: 0.05 }, frameDk: { c: '#2a1e16', v: 0.04 }, mullion: { c: '#3a3530', v: 0.02 }, sill: { c: '#6a6870', v: 0.04 },
      win: { c: '#ffc46e', night: true, day: '#4a4038' }, lamp: { c: '#ffd890', night: true, day: '#6a6050' },
      shutter: { c: '#3a3a30', v: 0.02 }, shutterDk: { c: '#2e2e26', v: 0.02 }, hinge: { c: '#1a1a1e', v: 0.02 },
      door: { c: '#3a2a22', v: 0.03, pat: 'plank' }, doorDk: { c: '#2a1e18', v: 0.03 }, brass: { c: '#8a7240', v: 0.02 },
      brick: { c: '#5e4a42', v: 0.05, pat: 'brick' }, brick2: { c: '#4e3c36', v: 0.05, pat: 'brick' }, pot: { c: '#5a4436', v: 0.04 }, gutter: { c: '#2e2e34', v: 0.03 },
      flowerLf: { c: '#4a4434', v: 0.08 },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base;
      const lights = [], acts = [], landmarks = [];
      const sst = MH.sstep;
      // 협곡 물길(원래 설계 좌표 → 지도 좌표)
      const ravineO = [[100, -4], [106, 42], [98, 80], [112, 132]];
      const ravine = ravineO.map(([x, z]) => [x * KO, z * KO]);
      const LV = base - 2;   // 물 높이

      // ───────── 지형 ─────────
      // 남동쪽으로 내려가는 완만한 언덕(계단식 층 없이 1칸씩 이어지는 비탈 + 굴곡), 북쪽 정상 고원은 부드럽게 솟고,
      // 동쪽 협곡은 노이즈로 휜 벼랑·군데군데 바위 선반·지층 띠, 물가는 자갈·모래로 완만히 들어간다
      const ravD = (x, z) => MH.polyDist(x / KO, z / KO, ravineO) + (n.fbm(x * 0.03 + 50, z * 0.03 + 9, 3) - 0.5) * 4.5;
      const hRaw = (x, z) => {
        const ox = x / KO, oz = z / KO;
        const u = Math.min(1, Math.max(0, ((132 - oz) * 0.62 + (128 - ox) * 0.38) / 122));
        let hh = Math.pow(u, 1.25) * 26;
        // 정상 고원: 부드러운 경계(노이즈로 휜 가장자리)
        const ed = Math.max(22 - ox, ox - 80, oz - 52, 0) + (n.fbm(x * 0.04 + 7, z * 0.04 + 3, 2) - 0.5) * 6;
        hh = Math.max(hh, MH.lerp(hh, 24, 1 - sst(0, 9, ed)));
        const rd = ravD(x, z);
        if (rd < 10) {
          const cut = Math.pow(1 - rd / 10, 1.4) * (hh + 7);
          hh -= cut;
          // 벼랑의 바위 선반: 높이를 노이즈 오프셋 단으로 일부만 끌어당긴다(곧은 줄무늬가 아니라 휘고 끊긴 선반)
          if (rd > 2.5 && hh > 1) {
            const off = n.fbm(x * 0.05 + 3, z * 0.05 + 77, 2) * 9, q = 4.5, v = hh + off;
            const shelf = Math.floor(v / q) * q - off + Math.max(0, (v % q) - (q - 1.4)) * (q / 1.4);
            const m = sst(0.42, 0.6, n.fbm(x * 0.06 + 11, z * 0.06 + 31, 2)) * sst(2.5, 4.5, rd) * (1 - sst(8, 10, rd));
            hh = MH.lerp(hh, shelf, m);
          }
        }
        const bump = (n.fbm(x * 0.045 + 31, z * 0.045 + 17, 3) - 0.5) * 3.2 + (n.fbm(x * 0.12 + 5, z * 0.12 + 9, 2) - 0.5) * 1.1;
        return base + hh * 2 + (n.fbm(ox * 0.05, oz * 0.05) * 2.2 - 1) * 2 + bump;
      };
      // 지층 띠: 휘어진 수평 띠(덩어리로 묶어 면 합치기가 깨지지 않게)
      const STRATA = [B.rock, B.rock, B.rockDk, B.rockL, B.rock, B.rockB, B.rockDk];
      let sCol = -1, sOff = 0;
      const strata = (x, z, y) => {
        if (sCol !== x + W * z) { sCol = x + W * z; sOff = n.fbm(x * 0.02 + 4, z * 0.02 + 8, 2) * 14; }
        return STRATA[((Math.floor((y + sOff) / 4) % 7) + 7) % 7];
      };
      const groundAt = (x, z) => { const f = n.fbm(x * 0.04 + 20, z * 0.04, 2); return f > 0.6 ? B.deadgrass : f < 0.38 ? B.ash2 : B.ash; };
      const bedAt = (x, z, dep) => {
        const nb = n.fbm(x * 0.06 + 3, z * 0.06 + 11, 2);
        if (dep <= 2) return nb > 0.55 ? B.gravel : B.sand;
        return nb > 0.64 ? B.weedBed : nb > 0.46 ? B.gravel : nb > 0.32 ? B.silt : B.rockDk;
      };
      MH.terrain(w, {
        floor: 24,
        height: hRaw,
        surface: (x, z, y, s) => {
          if (y <= LV) return bedAt(x, z, LV - y);
          const rd = ravD(x, z);
          if (rd < 10 && y <= LV + 2) return n.fbm(x * 0.09, z * 0.09 + 5, 2) > 0.5 ? B.gravel : B.sand;
          if (s >= 3) return strata(x, z, y);
          if (rd < 10 && s >= 2) return hash3(x >> 2, 3, z >> 2) > 0.5 ? B.gravel : B.rockM;
          return groundAt(x, z);
        },
        under: (x, z, y, dep, s) => (dep < 4 && s < 3) ? B.soil : strata(x, z, y),
      });
      MH.water(w, LV, (x, z) => MH.polyDist(x, z, ravine) < 26);
      const wet = (x, z) => x >= 0 && z >= 0 && x < W && z < D && w.liq[x + W * z] >= 0;

      // ───────── 공통 도구(2배 해상도용, 물레방아 마을에서 가져와 묘지 재질로) ─────────
      const g = (x, z) => MH.g(w, Math.round(x), Math.round(z));
      const STONES = [B.st1, B.st2, B.st3, B.st1, B.st4, B.st2];
      const stoneAt = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return 0;
        return STONES[(hash3(Math.floor(uu / 6), c, salt) * 6) | 0];
      };
      // 낱돌 껍질: 사각 벽(x0..x1, z0..z1) 바깥 한 칸 둘레에 낱돌을 쌓고 줄눈은 비운다(속 벽이 짙은 줄눈으로 보인다)
      const shell = (x0, z0, x1, z1, y0, y1, salt, keep) => {
        for (let y = y0; y <= y1; y++) for (let z = z0 - 1; z <= z1 + 1; z++) for (let x = x0 - 1; x <= x1 + 1; x++) {
          if (x !== x0 - 1 && x !== x1 + 1 && z !== z0 - 1 && z !== z1 + 1) continue;
          if (keep && !keep(x, y, z)) continue;
          const u = (z === z0 - 1 || z === z1 + 1) ? x : z, b = stoneAt(u + (x === x0 - 1 || x === x1 + 1 ? 2 : 0), y, salt);
          if (b) w.set(x, y, z, b);
        }
      };
      // 판석 무늬: 5×4칸 판석, 1칸 줄눈, 줄마다 엇갈림
      const flagAt = (x, z) => {
        const row = Math.floor(z / 5), off = (row & 1) * 3;
        if (z % 5 === 4 || (x + off) % 6 === 5) return B.flagJ;
        return [B.flagS, B.flagS2, B.flagS3][(hash3(Math.floor((x + off) / 6), row, 7) * 3) | 0];
      };
      const pathAt = (x, z) => {
        const row = Math.floor(z / 4), off = (row & 1) * 2;
        if (z % 4 === 3 || (x + off) % 5 === 4) return B.pathJ;
        const h = hash3(Math.floor((x + off) / 5), row, 9);
        return h > 0.93 ? B.ash2 : h > 0.5 ? B.path : B.path2;
      };
      const cylT = (T, cx, cz, y0, y1, r, b) => { const R = Math.ceil(r); for (let y = y0; y <= y1; y++) for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) if (dx * dx + dz * dz <= r * r) T.set(cx + dx, y, cz + dz, b); };
      const candle = (x, y, z) => { w.set(x, y, z, B.wax); w.set(x, y + 1, z, B.candle); };
      const witherAt = (x, y, z) => { w.set(x, y, z, B.witherStem); w.set(x, y + 1, z, B.wither); };
      // 해골(정면 +z): 3×3 얼굴, 눈구멍·코·이
      const skull = (T, x, y, z, eye, dir) => {
        dir = dir || 1;
        for (let dy = 0; dy <= 2; dy++) for (let dx = -1; dx <= 1; dx++) T.set(x + dx, y + dy, z, B.bone);
        T.set(x, y + 3, z, B.bone); T.set(x - 1, y + 3, z - dir, B.bone); T.set(x + 1, y + 3, z - dir, B.bone); T.set(x, y + 1, z - dir, B.bone);
        T.set(x - 1, y + 2, z, eye || B.dark); T.set(x + 1, y + 2, z, eye || B.dark); T.set(x, y + 1, z, B.dark); T.set(x, y, z, B.dark);
      };
      // 죽은 나무: 밑동이 넓은 비틀린 줄기, 뿌리, 굵기가 줄어드는 가지와 갈라진 잔가지
      const deadTree = (x, y, z, h, R0) => {
        R0 = R0 || 2.4;
        const lx = (hash3(x, 1, z) - 0.5) * 0.5, lz = (hash3(z, 2, x) - 0.5) * 0.5;
        for (let i = 0; i < h; i++) {
          const t = i / h, rr = Math.max(0.7, R0 * (1 - t * 0.7) + (i < 4 ? (4 - i) * 0.5 : 0)), RR = Math.ceil(rr);
          const cx = x + Math.round(lx * i * 0.4 + Math.sin(i * 0.25 + x) * 0.8), cz = z + Math.round(lz * i * 0.4 + Math.cos(i * 0.21 + z) * 0.8);
          for (let dz = -RR; dz <= RR; dz++) for (let dx = -RR; dx <= RR; dx++) {
            if (dx * dx + dz * dz > rr * rr) continue;
            const streak = hash3(Math.floor((Math.atan2(dz, dx) + 4) * 2.5), (i / 3) | 0, x + z) > 0.6;
            w.set(cx + dx, y + i, cz + dz, streak ? B.barkDk : B.bark);
          }
        }
        for (let k = 0; k < 5; k++) {
          const a = k * 1.2566 + hash3(x, k, z) * 0.8, l = R0 + 3 + hash3(z, k, x) * 3;
          w.line(x, y + 2, z, x + Math.cos(a) * l, y - 1, z + Math.sin(a) * l, B.barkDk, t => t < 0.5 ? 1 : 0.6);
        }
        const tx = x + Math.round(lx * h * 0.4), tz = z + Math.round(lz * h * 0.4);
        w.line(tx, y + h - 1, tz, tx + w.r(-3, 3), y + h + 5, tz + w.r(-3, 3), B.bark);
        const nB = 5 + (hash3(x, 5, z) * 2 | 0), ends = [];
        for (let i = 0; i < nB; i++) {
          const a = i / nB * Math.PI * 2 + w.r(-0.4, 0.4), sy = y + Math.floor(h * w.r(0.45, 0.85));
          const l = h * w.r(0.32, 0.5), sx = x + Math.round(lx * (sy - y) * 0.4), sz = z + Math.round(lz * (sy - y) * 0.4);
          const ex = sx + Math.cos(a) * l, ez = sz + Math.sin(a) * l, ey = sy + l * w.r(0.35, 0.8);
          w.line(sx, sy, sz, ex, ey, ez, B.bark, t => t < 0.45 ? 1 : 0.6);
          for (let q = 0; q < 2; q++) {
            const f = 0.45 + q * 0.25, mx = sx + (ex - sx) * f, my = sy + (ey - sy) * f, mz = sz + (ez - sz) * f, a2 = a + (q ? 0.9 : -0.9) * w.r(0.6, 1.1);
            w.line(mx, my, mz, mx + Math.cos(a2) * l * 0.4, my + l * 0.3, mz + Math.sin(a2) * l * 0.4, B.barkDk);
          }
          for (const s of [-1, 1]) w.line(ex, ey, ez, ex + Math.cos(a + s * 0.6) * 3, ey + 2 + (s > 0 ? 1 : 0), ez + Math.sin(a + s * 0.6) * 3, B.barkDk);
          ends.push([Math.round(ex), Math.round(ey), Math.round(ez)]);
        }
        return ends;
      };

      // ───────── 집(반목조·돌 층, 창·문·지붕·굴뚝): 물레방아 마을의 2배 집 도구 ─────────
      const SIDES = (x0, z0, x1, z1) => ({
        s: { k: 's', u0: x0, u1: x1, at: (u, d) => [u, z1 + d] },
        n: { k: 'n', u0: x0, u1: x1, at: (u, d) => [u, z0 - d] },
        e: { k: 'e', u0: z0, u1: z1, at: (u, d) => [x1 + d, u] },
        w: { k: 'w', u0: z0, u1: z1, at: (u, d) => [x0 - d, u] },
      });
      const put = (sd, u, y, d, b) => { const p = sd.at(u, d); w.set(p[0], y, p[1], b); };
      const windowAt = (sd, wu, wy, wh, o) => {
        const mr = Math.floor(wh * 0.6), gl = o.win || B.win;
        for (let r = 0; r < wh; r++) for (let c = 0; c < 5; c++) { put(sd, wu + c, wy + r, 0, (c === 2 || r === mr) ? B.mullion : gl); put(sd, wu + c, wy + r, 1, 0); }
        for (let r = -1; r <= wh; r++) { put(sd, wu - 1, wy + r, 1, B.frame); put(sd, wu + 5, wy + r, 1, B.frame); }
        for (let c = -1; c <= 5; c++) put(sd, wu + c, wy + wh, 1, B.frame);
        for (let c = -2; c <= 6; c++) { put(sd, wu + c, wy - 1, 1, B.sill); if (c >= -1 && c <= 5) put(sd, wu + c, wy - 1, 2, B.sill); }
        if (o.shutter && wu - 3 > sd.u0 + 1 && wu + 7 < sd.u1 - 1) {
          for (const c0 of [-3, 6]) for (let c = 0; c < 2; c++) for (let r = 0; r < wh; r++) {
            put(sd, wu + c0 + c, wy + r, 1, r % 2 ? o.shutter : o.shutterDk);
            if (r === 1 || r === wh - 2) put(sd, wu + c0 + c, wy + r, 2, B.hinge);
          }
        }
      };
      // 문: 5폭 9높이, 테두리 살 + 움푹한 판, 손잡이, 문틀, 돌계단, 벽 등롱
      const doorAt = (sd, cu, yb, o) => {
        const u0 = cu - 2;
        for (let r = 0; r < 9; r++) for (let c = 0; c < 5; c++) {
          const stile = c === 0 || c === 4 || r === 0 || r === 4 || r === 8;
          put(sd, u0 + c, yb + r, 1, 0);
          if (stile) put(sd, u0 + c, yb + r, 0, B.doorDk);
          else { put(sd, u0 + c, yb + r, 0, 0); put(sd, u0 + c, yb + r, -1, B.door); }
        }
        put(sd, u0 + 3, yb + 4, 1, B.brass);
        for (let r = 0; r <= 9; r++) { put(sd, u0 - 1, yb + r, 1, B.frame); put(sd, u0 + 5, yb + r, 1, B.frame); }
        for (let c = -2; c <= 6; c++) put(sd, u0 + c, yb + 9, 1, B.frameDk);
        put(sd, u0 + 2, yb + 10, 1, B.sill);
        let lamp = null;
        if (o.steps) {
          for (let c = -2; c <= 6; c++) for (const [d, top] of [[2, yb - 2], [3, yb - 3]]) {
            const p = sd.at(u0 + c, d), gg = MH.g(w, p[0], p[1]);
            for (let y = Math.min(gg, top); y <= top; y++) w.set(p[0], y, p[1], y === top ? B.sill : B.st2);
            for (let y = top + 1; y <= yb + 9; y++) if (!(d === 2 && y <= yb - 1)) w.set(p[0], y, p[1], 0);
          }
        }
        if (o.lantern) {
          const lc = u0 + 7;
          put(sd, lc, yb + 8, 1, B.iron); put(sd, lc, yb + 8, 2, B.iron); put(sd, lc, yb + 7, 2, B.ironDk);
          put(sd, lc, yb + 6, 2, B.lamp); put(sd, lc, yb + 5, 2, B.lamp); put(sd, lc, yb + 4, 2, B.ironDk);
          const p = sd.at(lc, 2); lamp = [p[0] + 0.5, yb + 6, p[1] + 0.5];
        }
        const p = sd.at(cu, 1);
        return { door: [p[0], yb, p[1]], lamp };
      };
      // 박공지붕: 겹 슬레이트(이음줄 엇갈림)·이엉(결 무늬), 두꺼운 처마 끝, 용마루, 박공널, 물받이·홈통, 박공벽
      const roof = (wx0, wx1, wz0, wz1, top, o) => {
        const alongX = o.axis === 'x', ov = o.ov || 3, og = o.og || 2, th = o.mat === 'thatch';
        const A0 = alongX ? wz0 : wx0, A1 = alongX ? wz1 : wx1, a0 = A0 - ov, a1 = A1 + ov;
        const g0 = alongX ? wx0 : wz0, g1 = alongX ? wx1 : wz1, l0 = g0 - og, l1 = g1 + og;
        const y0 = top - ov;
        const P = (a, l, y, b) => alongX ? w.set(l, y, a, b) : w.set(a, y, l, b);
        const sMax = Math.floor((a1 - a0) / 2);
        for (let a = a0; a <= a1; a++) {
          const s = Math.min(a - a0, a1 - a), ry = y0 + s;
          for (let l = l0; l <= l1; l++) {
            let b;
            if (th) {
              const hh = hash3(l, s, 11);
              b = s === 0 ? B.thatchDk : (((l + (s >> 1) * 3) % 7 === 0) ? B.thatch2 : hh > 0.78 ? B.thatch3 : hh < 0.2 ? B.thatch2 : B.thatch);
            } else {
              const seam = ((l + (s & 1) * 2) & 3) === 0;
              b = s === 0 ? B.tileDk : seam ? B.tile2 : (hash3(l >> 2, s, 5) > 0.72 ? B.tile3 : B.tile);
            }
            P(a, l, ry, b); P(a, l, ry - 1, th ? B.thatch2 : B.tileDk);
            if (th && (s === 0 || l === l0 || l === l1)) P(a, l, ry - 2, B.thatchDk);
            if (s === sMax) { P(a, l, ry + 1, th ? B.thatchDk : (o.ridge || B.tileDk)); if (!th && o.crest && l % 4 === 0) { P(a, l, ry + 2, B.iron); P(a, l, ry + 3, B.iron); } }
            if (a >= A0 && a <= A1 && l >= g0 && l <= g1) for (let y = top; y <= ry - 2; y++) P(a, l, y, o.gableF ? o.gableF(a, l, y) : o.gable);
            if (!th && s >= 1 && (l === l0 || l === l1)) P(a, l, ry - 2, o.barge || B.frame);
          }
        }
        if (o.gwin !== false) {
          const mid = (A0 + A1) / 2, midA = Math.floor(mid);
          for (const [gl, out] of [[g0, g0 - 1], [g1, g1 + 1]]) {
            for (let a = A0; a <= A1; a++) P(a, out, top, B.frame);
            const gy = top + Math.max(2, Math.floor((mid - A0) * 0.35)), odd = (A1 - A0) % 2 === 0;
            for (let r = 0; r < 3; r++) for (let c = -1; c <= (odd ? 1 : 2); c++) { P(midA + c, gl, gy + r, (c === 0 && odd) || r === 1 ? B.mullion : (o.gwin || B.win)); P(midA + c, out, gy + r, 0); }
            for (let c = -2; c <= (odd ? 2 : 3); c++) { P(midA + c, out, gy - 1, B.sill); P(midA + c, out, gy + 3, B.frame); }
            for (let r = 0; r < 3; r++) { P(midA - 2, out, gy + r, B.frame); P(midA + (odd ? 2 : 3), out, gy + r, B.frame); }
          }
        }
        if (o.gutter) for (const [ae, ain, sg] of [[a0 - 1, a0, -1], [a1 + 1, a1, 1]]) {
          for (let l = l0; l <= l1; l++) P(ae, l, y0 - 1, B.gutter);
          const l = g0 + 1;
          P(ae, l, y0 - 2, B.gutter);
          for (let k = 0; k < ov; k++) P(ain - k * sg, l, y0 - 3 - k, B.gutter);
          const aw = sg < 0 ? A0 - 1 : A1 + 1;
          for (let y = y0 - 3 - ov; y >= o.foot; y--) P(aw, l, y, B.gutter);
        }
        return y0 + sMax + 2;
      };
      const chimney = (cx, cz, yb, yt) => {
        for (let y = yb; y <= yt; y++) for (let dz = 0; dz < 4; dz++) for (let dx = 0; dx < 4; dx++) w.set(cx + dx, y, cz + dz, hash3(cx + dx, y, cz + dz) > 0.75 ? B.brick2 : B.brick);
        for (let y = yt - 2; y <= yt - 1; y++) for (let dz = -1; dz <= 4; dz++) for (let dx = -1; dx <= 4; dx++) if (dx < 0 || dz < 0 || dx > 3 || dz > 3) w.set(cx + dx, y, cz + dz, B.brick2);
        w.box(cx - 1, yt, cz - 1, cx + 4, yt, cz + 4, B.sill);
        for (const [px, pz] of [[cx + 1, cz + 1], [cx + 2, cz + 2]]) w.box(px, yt + 1, pz, px, yt + 2, pz, B.pot);
        return [cx + 2, yt + 3, cz + 2];
      };
      const house = o => {
        const x0 = o.x, z0 = o.z, x1 = o.x + o.sx - 1, z1 = o.z + o.sz - 1, fl = o.floors || 1, fh = o.fh || 12, face = o.face || 's';
        const gy = o.y != null ? o.y : MH.maxG(w, x0 - 3, z0 - 3, x1 + 3, z1 + 3) + 1;
        const wall = o.wall || B.daub, sh = [B.shutter, B.shutterDk];
        for (let z = z0 - 1; z <= z1 + 1; z++) for (let x = x0 - 1; x <= x1 + 1; x++) {
          const gg = MH.g(w, x, z), edge = x === x0 - 1 || x === x1 + 1 || z === z0 - 1 || z === z1 + 1;
          for (let y = Math.min(gg, gy) - 1; y <= gy + 2; y++) {
            if (!edge) { w.set(x, y, z, B.mortar); continue; }
            if (y === gy + 2) { w.set(x, y, z, B.sill); continue; }
            const u = (z === z0 - 1 || z === z1 + 1) ? x : z;
            w.set(x, y, z, stoneAt(u, y, 3) || (y <= gg ? B.mortar : 0));
          }
        }
        let e = 0, yb = gy + 3;
        const out = { x0, x1, z0, z1, y: gy, floor: gy + 3, lamp: null };
        for (let f = 0; f < fl; f++) {
          const ePrev = e;
          if (o.jetty && f > 0) e = 2;
          const X0 = x0 - e, X1 = x1 + e, Z0 = z0 - e, Z1 = z1 + e, S = SIDES(X0, Z0, X1, Z1);
          const stone = f < (o.stone || 0);
          w.box(X0, yb, Z0, X1, yb + fh - 1, Z1, stone ? B.mortar : wall);
          const wh = Math.min(6, fh - 6), wy = yb + 3;
          for (const k of ['s', 'n', 'e', 'w']) {
            const sd = S[k], L = sd.u1 - sd.u0 + 1, cu = Math.floor((sd.u0 + sd.u1) / 2);
            const isDoor = k === face && f === 0;
            const nW = Math.max(1, Math.floor((L + 2) / 12)), wins = [];
            for (let q = 0; q < nW; q++) {
              const c = Math.round(sd.u0 + (q + 0.5) * L / nW), wu = c - 2;
              if (isDoor && Math.abs(c - cu) < 13) continue;
              if (wu - 1 <= sd.u0 || wu + 5 >= sd.u1) continue;
              wins.push(wu);
            }
            const busy = u => wins.some(wu => u >= wu - 4 && u <= wu + 8) || (isDoor && Math.abs(u - cu) <= 4);
            if (stone) {
              for (let y = yb; y < yb + fh; y++) for (let u = sd.u0; u <= sd.u1; u++) {
                const corner = u === sd.u0 || u === sd.u1 || u === sd.u0 + 1 || u === sd.u1 - 1;
                put(sd, u, y, 0, corner && ((y >> 1) & 1) ? B.sill : (stoneAt(u, y, 5) || B.mortar));
              }
            } else {
              for (let u = sd.u0 - 1; u <= sd.u1 + 1; u++) { put(sd, u, yb, 1, B.frame); put(sd, u, yb + 1, 1, B.frame); put(sd, u, yb + fh - 1, 1, B.frame); }
              for (let y = yb; y < yb + fh; y++) for (const u of [sd.u0 - 1, sd.u0, sd.u1, sd.u1 + 1]) put(sd, u, y, 1, B.frameDk);
              for (let u = sd.u0 + 6; u <= sd.u1 - 3; u += 6) if (!busy(u)) for (let y = yb + 2; y < yb + fh - 1; y++) put(sd, u, y, 1, B.frame);
              for (const [ua, ub] of [[sd.u0 + 1, sd.u0 + 5], [sd.u1 - 1, sd.u1 - 5]]) {
                if (busy(ua) || busy(ub)) continue;
                for (let k2 = 0; k2 <= fh - 4; k2++) { const t = k2 / (fh - 4); put(sd, Math.round(ua + (ub - ua) * t), yb + 2 + k2, 1, B.frame); }
              }
              if (e > ePrev) for (let u = sd.u0; u <= sd.u1; u += 3) { put(sd, u, yb - 1, 0, B.frameDk); put(sd, u, yb - 1, -1, B.frameDk); }
            }
            for (const wu of wins) windowAt(sd, wu, wy, wh, { shutter: stone ? null : sh[0], shutterDk: sh[1], win: o.win });
            if (isDoor) { const r = doorAt(sd, cu, yb, { steps: true, lantern: o.lantern !== false }); out.door = r.door; out.lamp = r.lamp; }
          }
          yb += fh;
        }
        const top = yb, X0 = x0 - e, X1 = x1 + e, Z0 = z0 - e, Z1 = z1 + e;
        const axis = o.axis || (o.sx >= o.sz ? 'x' : 'z');
        out.peak = roof(X0, X1, Z0, Z1, top, { axis, mat: o.roof, gable: o.stone >= fl ? B.st2 : wall, gutter: o.roof !== 'thatch', foot: gy + 3, gwin: o.win });
        out.top = top; out.e = e;
        if (o.chimney) {
          const cx = axis === 'x' ? X0 + 3 : Math.floor((X0 + X1) / 2) - 1, cz = axis === 'x' ? Math.floor((Z0 + Z1) / 2) - 1 : Z0 + 3;
          out.chimney = chimney(cx, cz, top - 2, out.peak + 5);
        }
        return out;
      };

      // ───────── 묘역 자리 고르기(지형을 다듬기 전에 터를 평평하게) ─────────
      const route = [[210, 310], [196, 264], [116, 256], [100, 210], [180, 184], [124, 176]];
      const nearRoute = (x, z, r) => MH.polyDist(x, z, route) < (r || 14);
      const mid = 124;
      const excl = (x, z) => (Math.abs(x - mid) < 28 && z > 108 && z < 182) || (x > 158 && x < 224 && z > 192 && z < 248) || (x > 24 && x < 64 && z > 134 && z < 198)
        || (x > 42 && x < 72 && z > 204 && z < 238) || z > 288 || (Math.abs(x - 150) < 8 && Math.abs(z - 200) < 8);
      const graves = [];
      for (let z = 136; z <= 284; z += 16) for (let x = 24; x <= 228; x += 14) {
        const gx = x + w.ri(-2, 2), gz = z + w.ri(-2, 0);
        if (nearRoute(gx, gz, 18) || nearRoute(gx, gz + 12, 18) || MH.polyDist(gx, gz, ravine) < 34 || excl(gx, gz) || excl(gx, gz + 12)) continue;
        let lo = 1e9, hi = -1e9, sum = 0, k = 0;
        for (let dz = -3; dz <= 13; dz += 2) for (let dx = -4; dx <= 4; dx += 2) { const h = g(gx + dx, gz + dz); lo = Math.min(lo, h); hi = Math.max(hi, h); sum += h; k++; }
        if (hi - lo > 5 || lo <= LV + 2) continue;
        graves.push([gx, gz, Math.round(sum / k)]);
      }
      // 터: 가운데는 평평하게, 둘레 4칸은 원래 땅으로 서서히 이어 붙인다
      for (const [gx, gz, gh] of graves) {
        for (let dz = -7; dz <= 17; dz++) for (let dx = -8; dx <= 8; dx++) {
          const x = gx + dx, z = gz + dz, d = Math.max(Math.abs(dx) - 4, -3 - dz, dz - 13, 0);
          if (d > 4) continue;
          const cur = MH.g(w, x, z); if (cur < 0) continue;
          const h = Math.round(MH.lerp(gh, cur, d / 4.5));
          if (h !== cur) MH.setH(w, x, z, h, w.get(x, cur, z) || B.ash, B.soil);
        }
      }

      // ───────── 굽이치는 참배로: 판석(엇갈린 줄눈), 깨진 돌, 가장자리 연석, 둘레는 땅으로 번지며 이어진다 ─────────
      const hs = route.map(([x, z]) => MH.g(w, x, z));
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        let best = 99, bt = 0, bi = 0;
        for (let i = 0; i < route.length - 1; i++) {
          const [ax, az] = route[i], [bx, bz] = route[i + 1], dx = bx - ax, dz = bz - az;
          const t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz)));
          const d = Math.hypot(x - ax - dx * t, z - az - dz * t);
          if (d < best) { best = d; bt = t; bi = i; }
        }
        if (best > 17) continue;
        const ph = Math.round(MH.lerp(hs[bi], hs[bi + 1], bt)), cur = MH.g(w, x, z);
        const wd = 9.5 + (n.fbm(x * 0.12 + 13, z * 0.12 + 29, 2) - 0.5) * 3.4;
        if (best <= wd) {
          const top = best > wd - 1.4 ? (hash3(x >> 1, 4, z >> 1) > 0.3 ? B.rockDk : B.ash2) : pathAt(x, z);
          MH.setH(w, x, z, ph, top, B.rock);
        } else if (best <= wd + 6 && cur >= 0) {
          const t = (best - wd) / 6, h = Math.round(MH.lerp(ph, cur, t * t * (3 - 2 * t)));
          const top = t < 0.35 && hash3(x, 5, z) > 0.5 ? B.ash2 : (w.get(x, cur, z) || groundAt(x, z));
          if (h !== cur) MH.setH(w, x, z, h, top, B.soil); else if (t < 0.3 && hash3(x >> 1, 6, z >> 1) > 0.55) w.set(x, cur, z, B.ash2);
        }
      }
      // 길가의 초록 불 등롱: 받침돌, 쇠기둥과 고리, 내민 팔, 매단 등롱(모서리 쇠살·갓·꼭지)
      const lantern = (x, z, lit) => {
        const y = MH.g(w, x, z) + 1;
        if (y <= 0 || w.get(x, y, z) || w.get(x + 3, y + 10, z)) return;
        w.box(x - 1, y - 1, z - 1, x + 1, y, z + 1, B.wallBd); w.box(x - 1, y + 1, z - 1, x + 1, y + 1, z + 1, B.trim);
        w.box(x, y + 2, z, x, y + 14, z, B.iron);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) w.set(x + dx, y + 2, z + dz, B.ironDk);
        w.box(x, y + 14, z, x + 3, y + 14, z, B.iron); w.set(x + 1, y + 13, z, B.iron); w.set(x, y + 15, z, B.iron); w.set(x, y + 16, z, B.ironDk);
        const lx = x + 3, ly = y + 9;
        w.set(lx, y + 13, z, B.iron);
        w.box(lx - 1, ly + 3, z - 1, lx + 1, ly + 3, z + 1, B.ironDk); w.set(lx, ly + 4, z, B.ironDk);
        for (let dy = 0; dy <= 2; dy++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) if (dx || dz || dy !== 1) w.set(lx + dx, ly + dy, z + dz, (dx && dz) ? B.ironDk : (dy === 1 ? B.gfire : B.gglass));
        w.set(lx, ly + 1, z, B.gfire); w.set(lx, ly - 1, z, B.ironDk);
        if (lit) lights.push({ p: [lx + 0.5, ly + 1, z + 0.5], c: '#6dffa0', i: 0.8, d: 24, flicker: 0.35 });
      };
      for (let i = 0; i < route.length - 1; i++) for (const t of [0.22, 0.55, 0.85]) {
        const x = Math.round(MH.lerp(route[i][0], route[i + 1][0], t)) + 12, z = Math.round(MH.lerp(route[i][1], route[i + 1][1], t));
        lantern(x, z, (i + Math.round(t * 3)) % 2 === 0);
      }

      // ══════════ 정상: 뼈의 납골당 ══════════
      const x0 = 96, x1 = 152, z0 = 46, z1 = 90, WH = 36;
      const P = MH.maxG(w, 92, 42, 156, 94);      // 광장 윗면
      // 광장: 줄눈 판석, 가운데 참배 판석 길, 가장자리 띠돌
      for (let z = 20; z <= 124; z++) for (let x = 66; x <= 184; x++) {
        const edge = x <= 67 || x >= 183 || z <= 21 || z >= 123;
        MH.setH(w, x, z, P, edge ? B.wallBd : (Math.abs(x - mid) <= 7 && z > z1) ? pathAt(x, z) : flagAt(x, z), B.rock);
      }
      const F = P + 4;   // 납골당 바닥(문턱 위 첫 칸)
      // 기단: 두 단 굽돌 + 판석 윗면
      w.box(x0 - 4, P + 1, z0 - 4, x1 + 4, P + 2, z1 + 4, B.wallBd);
      w.box(x0 - 4, P + 3, z0 - 4, x1 + 4, P + 3, z1 + 4, B.slab);
      shell(x0 - 4, z0 - 4, x1 + 4, z1 + 4, P + 1, P + 2, 21);
      // 벽몸(짙은 줄눈) + 낱돌 껍질, 속은 어둠
      w.box(x0, F, z0, x1, F + WH - 1, z1, B.mortar);
      w.box(x0 + 2, F, z0 + 2, x1 - 2, F + WH - 2, z1 - 2, B.dark);
      shell(x0, z0, x1, z1, F, F + WH - 1, 7);
      // 굽돌림·띠돌림·처마 돌림띠
      w.walls(x0 - 2, F, z0 - 2, x1 + 2, F + 2, z1 + 2, B.wallBd); w.walls(x0 - 2, F + 3, z0 - 2, x1 + 2, F + 3, z1 + 2, B.trim);
      for (const y of [F + 13, F + 25]) w.walls(x0 - 2, y, z0 - 2, x1 + 2, y, z1 + 2, B.trim);
      w.walls(x0 - 2, F + WH - 1, z0 - 2, x1 + 2, F + WH - 1, z1 + 2, B.wallBd); w.walls(x0 - 3, F + WH, z0 - 3, x1 + 3, F + WH, z1 + 3, B.trim);
      // 처마 밑 까치발(돌 받침) 줄
      for (let z = z0; z <= z1; z += 3) for (const x of [x0 - 2, x1 + 2]) w.set(x, F + WH - 2, z, B.trim);
      // 옆벽 버팀벽: 여섯 단으로 물러나며 비스듬한 갓돌, 위에 작은 뾰족탑과 뼈 꼭지
      for (let z = z0 + 2; z <= z1 - 8; z += 10) for (const [bx, dx] of [[x0 - 1, -1], [x1 + 1, 1]]) {
        for (let d = 0; d <= 5; d++) {
          const top = F + 30 - d * 4, xx = bx + dx * d;
          w.box(xx, F, z, xx, top, z + 2, B.mortar);
          for (let y = F; y <= top; y++) for (let k = 0; k <= 2; k++) { const s = stoneAt(z + k + d * 2, y, 13); w.set(xx, y, z + k, s || B.mortar); }
          w.box(xx, top + 1, z, xx, top + 1, z + 2, B.trim);
        }
        w.box(bx, F + 31, z, bx + dx, F + 42, z + 2, B.wallBd);
        w.box(bx, F + 37, z - 1, bx + dx, F + 37, z + 3, B.trim);
        MH.pyramid(w, Math.min(bx, bx + dx), z, Math.max(bx, bx + dx), z + 2, F + 43, B.roof, 3, B.roofE);
        w.box(bx, F + 46, z + 1, bx, F + 47, z + 1, B.iron); w.set(bx, F + 48, z + 1, B.bone);
      }
      // 뾰족 창(창틀·가운데 창살·가로살·뾰족 머리·이맛돌·창턱)
      const lancet = (sd, cu, yb, hgt, gl) => {
        const top = yb + hgt;
        for (let y = yb; y <= top + 2; y++) for (let c = -2; c <= 2; c++) {
          const hw = y <= top ? 2 : y === top + 1 ? 1 : 0;
          if (Math.abs(c) > hw) continue;
          const bar = c === 0 || (y - yb) % 5 === 4;
          put(sd, cu + c, y, 0, bar ? B.iron : gl); put(sd, cu + c, y, 1, 0);
        }
        for (let y = yb; y <= top; y++) { put(sd, cu - 3, y, 1, B.trim); put(sd, cu + 3, y, 1, B.trim); }
        put(sd, cu - 2, top + 1, 1, B.trim); put(sd, cu + 2, top + 1, 1, B.trim); put(sd, cu - 1, top + 2, 1, B.trim); put(sd, cu + 1, top + 2, 1, B.trim); put(sd, cu, top + 3, 1, B.trim);
        put(sd, cu - 3, top + 1, 2, B.trim); put(sd, cu + 3, top + 1, 2, B.trim); put(sd, cu - 2, top + 2, 2, B.trim); put(sd, cu + 2, top + 2, 2, B.trim); put(sd, cu - 1, top + 3, 2, B.trim); put(sd, cu + 1, top + 3, 2, B.trim); put(sd, cu, top + 4, 2, B.trim);
        for (let c = -3; c <= 3; c++) { put(sd, cu + c, yb - 1, 1, B.trim); if (Math.abs(c) <= 2) put(sd, cu + c, yb - 1, 2, B.trim); }
      };
      const OS = SIDES(x0, z0, x1, z1);
      for (let z = z0 + 9; z <= z1 - 6; z += 10) for (const k of ['w', 'e']) lancet(OS[k], z, F + 8, 18, B.gglass);
      // 정면(남): 겹아치 정문, 문설주 기둥, 해골 띠, 장미창
      const fz = z1, dx0 = mid - 8, dx1 = mid + 8;
      const archTop = x => F + 22 - Math.pow(Math.abs(x - mid) / 9, 2) * 8;
      for (let x = dx0 - 6; x <= dx1 + 6; x++) for (let y = F; y <= F + 34; y++) {
        const at = archTop(x), ax = Math.abs(x - mid);
        if (ax <= 8 && y <= at) {
          w.set(x, y, fz + 1, 0); w.set(x, y, fz, 0);
          w.set(x, y, fz - 1, (ax <= 6 && y <= F + 14 && (x + y) % 3 === 0) ? B.soul : B.dark);
        } else {
          // 바깥으로 갈수록 한 칸씩 내민 아치 테 세 겹
          const k = y - at;
          if (k > 0 && k <= 1.6 && ax <= 10) w.set(x, y, fz + 1, B.trim);
          else if (k > 1.6 && k <= 3.2 && ax <= 12) { w.set(x, y, fz + 1, B.wallBd); w.set(x, y, fz + 2, B.wallBd); }
          else if (k > 3.2 && k <= 4.6 && ax <= 14) { w.set(x, y, fz + 1, B.trim); w.set(x, y, fz + 2, B.trim); w.set(x, y, fz + 3, B.trim); }
        }
      }
      w.box(mid, F, fz, mid, F + 21, fz, B.marble);   // 가운데 문설주
      for (const s of [-1, 1]) for (const [ox, dz] of [[10, 1], [12, 2], [14, 3]]) {
        const cx = mid + s * ox;
        w.box(cx, F, fz + 1, cx, F + 14, fz + dz, dz === 2 ? B.marble : B.trim);
        w.box(cx - 1, F + 15, fz + 1, cx + 1, F + 15, fz + dz, B.trim);
      }
      for (let x = mid - 9; x <= mid + 9; x += 6) skull(w, x, F + 28, fz + 3, B.dark, 1);
      w.box(mid - 12, F + 27, fz + 2, mid + 12, F + 27, fz + 2, B.trim);
      // 장미창: 바퀴살 여덟, 바깥 테 두 겹, 가운데 꽃잎
      const RY = F + 46;
      for (let y = -11; y <= 11; y++) for (let x = -11; x <= 11; x++) {
        const r = Math.hypot(x, y);
        if (r > 11.3) continue;
        const ang = Math.atan2(y, x), spoke = Math.abs(Math.sin(ang * 4)) < 0.16 * (11 / Math.max(r, 1)) && r > 2.6;
        const petal = r > 4.5 && r < 7.5 && Math.abs(Math.sin(ang * 8)) < 0.22;
        let b = r > 10.2 ? B.trim : r > 9.2 ? B.wallBd : r < 2.2 ? B.soul : r < 3 ? B.trim : (spoke || petal) ? B.trim : B.gglass;
        w.set(mid + x, RY + y, fz + 1, b); w.set(mid + x, RY + y, fz, r > 9.2 ? B.wallBd : B.dark);
        if (r > 10.2) w.set(mid + x, RY + y, fz + 2, B.trim);
      }
      // 지붕: 슬레이트, 쇠 볏 장식
      const peakO = roof(x0, x1, z0, z1, F + WH, { axis: 'z', mat: 'slate', gable: B.mortar, gableF: (a, l, y) => stoneAt(a, y, 9) || B.mortar, ov: 3, og: 2, gwin: false, crest: true, ridge: B.wallBd, barge: B.trim });
      // 장미창이 박공에 다시 보이게(지붕 박공벽이 덮은 부분)
      for (let y = -11; y <= 11; y++) for (let x = -11; x <= 11; x++) {
        const r = Math.hypot(x, y); if (r > 11.3 || RY + y < F + WH) continue;
        const ang = Math.atan2(y, x), spoke = Math.abs(Math.sin(ang * 4)) < 0.16 * (11 / Math.max(r, 1)) && r > 2.6, petal = r > 4.5 && r < 7.5 && Math.abs(Math.sin(ang * 8)) < 0.22;
        w.set(mid + x, RY + y, fz, r > 9.2 ? B.wallBd : r < 2.2 ? B.soul : r < 3 ? B.trim : (spoke || petal) ? B.trim : B.gglass);
        w.set(mid + x, RY + y, fz + 1, r > 10.2 ? B.trim : 0);
        w.set(mid + x, RY + y, fz + 2, 0);
      }
      // 쌍탑: 낱돌, 띠돌림, 뾰족 창, 종루 구멍, 모서리 작은 첨탑, 사각뿔 지붕과 쇠 꼭지
      for (const tx of [x0 + 4, x1 - 4]) {
        const tx0 = tx - 5, tx1 = tx + 5, tz0 = fz - 4, tz1 = fz + 5, TT = F + 58;
        w.box(tx0, P + 4, tz0, tx1, TT, tz1, B.mortar);
        shell(tx0, tz0, tx1, tz1, P + 4, TT, 31 + tx);
        for (const y of [F + 3, F + 25, F + 41, TT]) { w.walls(tx0 - 2, y, tz0 - 2, tx1 + 2, y, tz1 + 2, B.trim); w.walls(tx0 - 2, y - 1, tz0 - 2, tx1 + 2, y - 1, tz1 + 2, B.wallBd); }
        const TS = SIDES(tx0, tz0, tx1, tz1);
        lancet(TS.s, tx, F + 28, 9, B.gglass);
        for (const k of ['s', 'e', 'w']) {
          const sd = TS[k], cu = Math.floor((sd.u0 + sd.u1) / 2);
          for (let y = F + 44; y <= F + 54; y++) for (let c = -2; c <= 2; c++) { const hw = y <= F + 52 ? 2 : y === F + 53 ? 1 : 0; if (Math.abs(c) <= hw) { put(TS[k], cu + c, y, 0, B.dark); put(TS[k], cu + c, y, 1, 0); } }
          for (let c = -3; c <= 3; c++) put(sd, cu + c, F + 43, 1, B.trim);
        }
        for (const [cx, cz] of [[tx0 - 1, tz0 - 1], [tx1 + 1, tz0 - 1], [tx0 - 1, tz1 + 1], [tx1 + 1, tz1 + 1]]) {
          w.box(cx, TT + 1, cz, cx, TT + 6, cz, B.wallBd); w.set(cx, TT + 7, cz, B.trim); w.box(cx, TT + 8, cz, cx, TT + 9, cz, B.iron);
        }
        const t = MH.pyramid(w, tx0, tz0, tx1, tz1, TT + 1, B.roof, 3, B.roofE);
        w.box(tx, t, fz, tx, t + 5, fz, B.iron); w.box(tx - 2, t + 3, fz, tx + 2, t + 3, fz, B.iron); w.set(tx, t + 6, fz, B.bone);
      }
      // 뒤쪽 종루 첨탑과 해골
      const sz0 = z0 + 6, sz1 = z0 + 22, scz = z0 + 14, SB = F + WH;
      w.box(mid - 8, SB - 8, sz0, mid + 8, F + 80, sz1, B.mortar);
      shell(mid - 8, sz0, mid + 8, sz1, SB - 2, F + 80, 41);
      for (let y = F + 64; y <= F + 72; y++) for (let k = -4; k <= 4; k++) {
        const hw = y <= F + 70 ? 4 : y === F + 71 ? 2 : 0; if (Math.abs(k) > hw) continue;
        for (const zz of [sz0, sz0 - 1, sz1, sz1 + 1]) w.set(mid + k, y, zz, B.dark);
        for (const xx of [mid - 8, mid - 9, mid + 8, mid + 9]) w.set(xx, y, scz + k, B.dark);
      }
      for (const y of [F + 52, F + 62, F + 74]) { w.walls(mid - 10, y, sz0 - 2, mid + 10, y, sz1 + 2, B.trim); }
      for (const s of [-4, 4]) for (const zz of [sz1 + 1]) lancet({ k: 's', u0: mid - 8, u1: mid + 8, at: (u, d) => [u, sz1 + d] }, mid + s, F + 54, 5, B.gglass);
      w.walls(mid - 10, F + 80, sz0 - 2, mid + 10, F + 82, sz1 + 2, B.trim);
      for (let x = mid - 10; x <= mid + 10; x += 2) for (const zz of [sz0 - 2, sz1 + 2]) w.set(x, F + 83, zz, B.trim);
      for (let z = sz0 - 2; z <= sz1 + 2; z += 2) for (const xx of [mid - 10, mid + 10]) w.set(xx, F + 83, z, B.trim);
      for (const [cx, cz] of [[mid - 10, sz0 - 2], [mid + 10, sz0 - 2], [mid - 10, sz1 + 2], [mid + 10, sz1 + 2]]) { w.box(cx, F + 84, cz, cx, F + 89, cz, B.wallBd); w.set(cx, F + 90, cz, B.bone); }
      const sTop = MH.pyramid(w, mid - 8, sz0, mid + 8, sz1, F + 84, B.roof, 3, B.roofE);
      // 첨탑 꼭대기 큰 해골(눈구멍에 혼불)
      const SKY = sTop + 2;
      w.box(mid, sTop - 1, scz, mid, sTop + 1, scz, B.iron);
      w.ellipsoid(mid, SKY + 4, scz, 4, 4, 4, B.bone, (dx, dy) => dy >= -2);
      w.box(mid - 3, SKY, scz - 2, mid + 3, SKY + 2, scz + 3, B.bone);
      for (let x = mid - 3; x <= mid + 3; x++) w.set(x, SKY + 1, scz + 4, (x - mid) % 2 ? B.dark : B.bone);
      w.box(mid - 3, SKY + 4, scz + 4, mid - 1, SKY + 5, scz + 4, B.dark); w.box(mid + 1, SKY + 4, scz + 4, mid + 3, SKY + 5, scz + 4, B.dark);
      w.box(mid - 2, SKY + 4, scz + 3, mid - 2, SKY + 5, scz + 3, B.soul); w.box(mid + 2, SKY + 4, scz + 3, mid + 2, SKY + 5, scz + 3, B.soul);
      w.set(mid, SKY + 3, scz + 4, B.dark); w.set(mid, SKY + 2, scz + 4, B.dark);
      // 문짝(부품): 쇠띠·징을 박은 관 판자, 아치 안에서 바깥으로 열린다
      const doorL = w.prop({ name: 'doorL', pivot: [dx0, F, fz] });
      const doorR = w.prop({ name: 'doorR', pivot: [dx1 + 1, F, fz] });
      for (let x = dx0; x <= dx1; x++) for (let y = F; y <= F + 22; y++) {
        if (y > archTop(x) || x === mid) continue;
        const strap = (y - F) % 7 === 4 || x === dx0 || x === dx1 || Math.abs(x - mid) === 1;
        const stud = !strap && (y - F) % 7 === 1 && (x - mid) % 2 === 0;
        (x < mid ? doorL : doorR).set(x, y, fz, strap ? B.iron : stud ? B.rust : B.coffin);
      }
      lights.push({ name: 'crypt', p: [mid + 0.5, F + 8, fz - 0.5], c: '#60ff98', i: 0.35, d: 48, flicker: 0.2 });
      // 앞 계단 두 단(기단 → 광장)
      for (let s = 1; s <= 2; s++) w.box(mid - 18 - s * 2, P + 1, fz + 5, mid + 18 + s * 2, P + 3 - s, fz + 4 + s * 2, s === 1 ? B.slab : B.wallBd);
      // 기단에서 묘역 참배로까지 내려가는 큰 돌계단(난간 기둥마다 초록 불)
      const foot = MH.g(w, mid, 176);
      MH.flight(w, { name: '납골당 계단', axis: 'z', c: mid, half: 12, a: 126, b: 168, ha: P, hb: foot, step: B.path, edge: B.wallBd, fill: B.wallBd, rail: B.trim, post: B.wallBd, postGap: 6, clear: 14,
        onPost: (x, y, z, k) => { w.set(x, y, z, B.wallBd); w.set(x, y + 1, z, B.gfire); if (k % 12 === 0) lights.push({ p: [x + 0.5, y + 2, z + 0.5], c: '#6dffa0', i: 0.9, d: 24, flicker: 0.35 }); } });
      // 광장 축대: 낱돌 면, 갓돌
      for (let z = 20; z <= 124; z++) for (let x = 66; x <= 184; x++) {
        if (x !== 66 && x !== 184 && z !== 20 && z !== 124) continue;
        const gg = MH.g(w, x, z); let low = gg;
        for (const [ddx, ddz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = x + ddx, nz = z + ddz; if (nx >= 66 && nx <= 184 && nz >= 20 && nz <= 124) continue; const ng = MH.g(w, nx, nz); if (ng >= 0) low = Math.min(low, ng); }
        if (gg - low < 2) continue;
        const u = (z === 20 || z === 124) ? x : z;
        for (let y = low - 1; y < gg; y++) w.set(x, y, z, stoneAt(u, y, 17) || B.mortar);
        w.set(x, gg, z, B.trim);
      }
      // 광장 남쪽 난간: 굽돌, 동자, 손잡이 돌, 기둥마다 돌 항아리
      const urn = (x, y, z) => { w.box(x - 1, y, z - 1, x + 1, y, z + 1, B.urnDk); w.box(x - 1, y + 1, z - 1, x + 1, y + 2, z + 1, B.urn); w.set(x, y + 3, z, B.urnDk); w.box(x - 1, y + 4, z, x + 1, y + 4, z, B.urn); w.box(x, y + 4, z - 1, x, y + 4, z + 1, B.urn); };
      for (let x = 67; x <= 183; x++) if (Math.abs(x - mid) > 14) {
        w.set(x, P + 1, 124, B.trim); w.set(x, P + 5, 124, B.trim);
        if (x % 2 === 0) w.box(x, P + 2, 124, x, P + 4, 124, B.marble);
        if (x % 12 === 0) { w.box(x, P + 1, 124, x + 1, P + 6, 124, B.wallBd); urn(x, P + 7, 124); }
      }
      // 화로: 세 발 쇠다리, 테 있는 그릇, 일렁이는 초록 불
      for (const fx of [mid - 28, mid + 28]) {
        const fy = P + 1, fzz = fz + 12;
        for (const [a, b2] of [[-2, -2], [2, -2], [0, 2]]) w.line(fx + a, fy, fzz + b2, fx, fy + 7, fzz, B.iron);
        w.ring(fx, fzz, fy + 8, 1.5, 3.2, B.iron); w.ring(fx, fzz, fy + 9, 2.4, 3.4, B.ironDk); w.cyl(fx, fzz, fy + 8, fy + 8, 1.6, B.coal);
        for (const [a, b2, h] of [[0, 0, 5], [-1, 0, 3], [1, 1, 4], [0, -1, 3], [1, -1, 2], [-1, 1, 2]]) w.box(fx + a, fy + 9, fzz + b2, fx + a, fy + 8 + h, fzz + b2, B.gfire);
        lights.push({ p: [fx + 0.5, fy + 12, fzz + 0.5], c: '#6dffa0', i: 1.5, d: 40, flicker: 0.35 });
      }
      // 날개 편 올빼미 석상: 몰딩 받침, 해골을 움켜쥔 발톱, 깃 무늬 달걀꼴 몸, 귀깃, 부리, 혼불 눈, 펼친 날개(깃 줄)
      const owl = (ax, az) => {
        const gy = MH.g(w, ax, az) + 1;
        w.box(ax - 5, gy, az - 5, ax + 5, gy, az + 5, B.wallBd); w.box(ax - 4, gy + 1, az - 4, ax + 4, gy + 6, az + 4, B.wallBd);
        shell(ax - 4, az - 4, ax + 4, az + 4, gy + 1, gy + 6, 51);
        w.walls(ax - 5, gy + 7, az - 5, ax + 5, gy + 7, az + 5, B.trim); w.box(ax - 4, gy + 7, az - 4, ax + 4, gy + 7, az + 4, B.trim);
        const by = gy + 8;
        skull(w, ax, by, az + 2, B.dark, 1);
        for (const s of [-2, 2]) { w.box(ax + s, by, az, ax + s, by + 2, az, B.slab); w.set(ax + s, by + 3, az + 1, B.slab); w.set(ax + s, by + 3, az + 2, B.iron); }
        w.ellipsoid(ax, by + 9, az, 3.6, 6, 3, B.marble, (dx, dy, dz) => { if (dz > 1 && dy < 2 && (dx + dy) % 3 === 0) w.set(ax + dx, by + 9 + dy, az + dz, B.slab); return !(dz > 1 && dy < 2 && (dx + dy) % 3 === 0); });
        for (const s of [-1, 1]) { w.box(ax + s * 2, by + 15, az, ax + s * 2, by + 17, az, B.marble); w.set(ax + s * 3, by + 17, az, B.marble); w.set(ax + s * 2, by + 12, az + 3, B.soul); w.set(ax + s * 2, by + 13, az + 3, B.trim); }
        w.set(ax, by + 11, az + 3, B.iron); w.set(ax, by + 10, az + 3, B.iron);
        for (const s of [-1, 1]) for (let k = 0; k < 4; k++) {
          w.line(ax + s * 3, by + 12 - k, az - 1, ax + s * (11 - k), by + 18 - k * 3, az - 2, B.marble);
          w.line(ax + s * (11 - k), by + 18 - k * 3, az - 2, ax + s * (8 - k), by + 5 - k, az - 2, k % 2 ? B.slab : B.marble);
        }
      };
      owl(mid - 42, 108); owl(mid + 42, 108);
      // 광장 뒤쪽: 무너진 기둥 줄(홈 판 기둥, 기둥머리, 떨어진 북돌)
      for (const [cx, cz, h] of [[76, 32, 18], [76, 52, 8], [76, 72, 14], [172, 32, 12], [172, 52, 20], [172, 72, 6]]) {
        w.box(cx - 2, P + 1, cz - 2, cx + 2, P + 2, cz + 2, B.wallBd); w.box(cx - 3, P + 1, cz - 3, cx + 3, P + 1, cz + 3, B.wallBd);
        for (let y = P + 3; y <= P + 2 + h; y++) for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) {
          const d2 = dx * dx + dz * dz; if (d2 > 4.6) continue;
          const top = y >= P + h && h < 16;
          if (top && hash3(cx + dx, y, cz + dz) > 0.5) continue;
          w.set(cx + dx, y, cz + dz, d2 > 3 && (dx + dz) % 2 === 0 ? B.slab : B.marble);
        }
        if (h >= 16) { w.box(cx - 3, P + 3 + h, cz - 3, cx + 3, P + 3 + h, cz + 3, B.trim); w.box(cx - 2, P + 4 + h, cz - 2, cx + 2, P + 4 + h, cz + 2, B.marble); }
        else for (let k = 0; k < 5; k++) for (const dy of [0, 1]) w.set(cx + 4 + k, P + 1 + dy, cz + 2 + (k >> 1), B.marble);
      }
      // 석관: 굽돌, 몸통 띠, 덮개 위 누운 뼈 조각
      for (const [sx, sz] of [[84, 104], [160, 104], [84, 28], [160, 28]]) {
        w.box(sx - 3, P + 1, sz - 6, sx + 3, P + 1, sz + 5, B.wallBd);
        w.box(sx - 2, P + 2, sz - 5, sx + 2, P + 4, sz + 4, B.slab);
        w.walls(sx - 2, P + 3, sz - 5, sx + 2, P + 3, sz + 4, B.trim);
        w.box(sx - 3, P + 5, sz - 6, sx + 3, P + 5, sz + 5, B.trim);
        w.box(sx, P + 6, sz - 3, sx, P + 6, sz + 3, B.bone); w.box(sx - 1, P + 6, sz - 1, sx + 1, P + 6, sz - 1, B.bone);
        skull(w, sx, P + 6, sz - 4, B.dark, -1);
      }
      // 광장의 평석 무덤 줄과 촛불
      for (let z = 28; z <= 112; z += 14) for (let x = 72; x <= 178; x += 10) {
        if (x > 86 && x < 162) continue;
        if ([[76, 32], [76, 52], [76, 72], [172, 32], [172, 52], [172, 72], [84, 104], [160, 104], [84, 28], [160, 28]].some(([a2, b2]) => Math.abs(x - a2) < 7 && Math.abs(z - b2) < 10)) continue;
        if (w.get(x, P + 1, z) || w.get(x, P + 1, z + 7)) continue;
        const tb = hash3(x, 4, z) > 0.5 ? B.tomb : B.tombDk;
        w.box(x - 2, P + 1, z, x + 2, P + 1, z + 7, tb); w.box(x - 1, P + 2, z + 1, x + 1, P + 2, z + 6, tb);
        w.box(x, P + 3, z + 2, x, P + 3, z + 5, B.trim); w.box(x - 1, P + 3, z + 3, x + 1, P + 3, z + 3, B.trim);
        if (hash3(x, 6, z) > 0.5) { w.box(x - 1, P + 1, z - 1, x + 1, P + 6, z - 1, tb); w.box(x - 2, P + 4, z - 1, x + 2, P + 4, z - 1, tb); w.set(x, P + 7, z - 1, tb); }
        if (hash3(x, 7, z) > 0.75) candle(x + 2, P + 2, z + 6);
      }
      // 축대 바깥 버팀 기둥(갓돌)
      const pil = (x, z) => { const gg = MH.g(w, x, z); if (gg < 0 || gg > P - 6) return; w.box(x, gg + 1, z, x + 1, P - 1, z, B.wallBd); w.box(x, P, z, x + 1, P, z, B.trim); };
      for (let x = 72; x <= 180; x += 12) if (Math.abs(x - mid) > 16) pil(x, 125);
      for (let z = 24; z <= 120; z += 12) { if (Math.abs(z - 60) > 7) pil(185, z); pil(65, z); }
      for (let i = 0; i < 70; i++) {
        const bx = w.ri(mid - 40, mid + 40), bz = w.ri(fz + 6, fz + 32);
        const by = MH.g(w, bx, bz), tb = w.get(bx, by, bz);
        if (!w.get(bx, by + 1, bz) && (tb === B.path || tb === B.path2 || tb === B.flagS || tb === B.flagS2 || tb === B.flagS3 || tb === B.flagJ)) w.set(bx, by + 1, bz, w.chance(0.2) ? B.dark : B.bone);
      }
      acts.push({
        name: '납골당 대문', hint: '문이 열리고 초록 불빛이 새어 나와요', hit: [dx0, F, fz - 1, dx1, F + 22, fz + 4],
        run: async a => {
          a.flash('crypt', 9, 5);
          await Promise.all([a.turn('doorL', [0, -1.75, 0], 2), a.turn('doorR', [0, 1.75, 0], 2)]);
          for (let k = 0; k < 4; k++) { a.burst([mid + 0.5, F + 10, fz + 3], { n: 40, colors: ['#8dffba', '#c9ffd9', '#50e890'], speed: 10, up: 6, life: 2.6, gravity: -2, spread: 6 }); await a.wait(0.5); }
          await a.wait(1.4);
          await Promise.all([a.turn('doorL', [0, 0, 0], 1.8), a.turn('doorR', [0, 0, 0], 1.8)]);
        },
      });
      landmarks.push({ name: '뼈의 납골당', note: '보스 · 뼈의 군주', p: [mid + 0.5, SKY + 18, scz + 0.5], boss: true });

      // ══════════ 묘역: 묘비, 봉분, 가족 납골묘, 쇠울타리 무덤 ══════════
      const used = [], tombG = graves.reduce((b, q) => Math.hypot(q[0] - 80, q[1] - 196) < Math.hypot(b[0] - 80, b[1] - 196) ? q : b, graves[0]);
      const ironFence = (xa, za, xb, zb, y, gapAt) => {
        for (let z = za; z <= zb; z++) for (let x = xa; x <= xb; x++) {
          if (x !== xa && x !== xb && z !== za && z !== zb) continue;
          if (gapAt && gapAt(x, z)) continue;
          const u = x + z, post = (x === xa || x === xb) && (z === za || z === zb);
          w.set(x, y, z, B.iron); w.set(x, y + 4, z, B.rust);
          if (post) { w.box(x, y, z, x, y + 6, z, B.ironDk); w.set(x, y + 7, z, B.iron); }
          else if (u % 2 === 0) { w.box(x, y + 1, z, x, y + 5, z, B.iron); w.set(x, y + 6, z, B.ironDk); }
        }
      };
      graves.forEach(([gx, gz, gg], k) => {
        if (w.get(gx, gg + 1, gz) || w.get(gx, gg + 1, gz + 8)) return;
        const kind = k % 8, tb = hash3(gx, 1, gz) > 0.6 ? B.tombMoss : hash3(gx, 2, gz) > 0.5 ? B.tomb : B.tombDk;
        if ((kind === 7 && used.length < 4 && gx > 32 && gx < 212) || (gx === tombG[0] && gz === tombG[1])) {
          // 가족 납골묘: 낱돌 돌집, 굽돌, 문 양옆 기둥, 박공 해골, 슬레이트 지붕
          w.box(gx - 4, gg + 1, gz, gx + 4, gg + 12, gz + 10, B.mortar);
          shell(gx - 4, gz, gx + 4, gz + 9, gg + 1, gg + 12, gx + gz);
          w.box(gx - 2, gg + 1, gz + 10, gx + 2, gg + 8, gz + 10, B.dark); w.box(gx - 2, gg + 1, gz + 9, gx + 2, gg + 8, gz + 9, B.dark);
          w.box(gx, gg + 1, gz + 10, gx, gg + 8, gz + 10, B.iron); w.box(gx - 2, gg + 5, gz + 10, gx + 2, gg + 5, gz + 10, B.iron);
          w.walls(gx - 6, gg + 1, gz - 2, gx + 6, gg + 1, gz + 13, B.trim); w.box(gx - 3, gg + 1, gz + 11, gx + 3, gg + 1, gz + 13, 0);
          for (const s of [-4, 4]) { w.box(gx + s, gg + 1, gz + 11, gx + s, gg + 11, gz + 11, B.trim); w.set(gx + s, gg + 12, gz + 11, B.wallBd); }
          w.box(gx - 3, gg + 9, gz + 11, gx + 3, gg + 9, gz + 11, B.trim);
          const pk = roof(gx - 4, gx + 4, gz, gz + 10, gg + 13, { axis: 'z', mat: 'slate', gable: B.mortar, gableF: (a, l, y) => stoneAt(a, y, 5) || B.mortar, ov: 2, og: 2, gwin: false, barge: B.trim });
          skull(w, gx, gg + 14, gz + 12, B.dark, 1); w.set(gx, pk, gz + 5, B.iron);
          used.push([gx, gz, gg]);
          return;
        }
        let headTop = gg + 9;
        if (kind === 0 || kind === 3) {
          // 둥근 머리 묘비: 굽돌, 새긴 띠, 둥근 꼭대기
          w.box(gx - 3, gg + 1, gz - 1, gx + 3, gg + 1, gz + 2, B.tombDk);
          for (let y = gg + 2; y <= gg + 10; y++) { const hw = y >= gg + 10 ? 1 : y >= gg + 9 ? 2 : 2; for (let x = gx - hw; x <= gx + hw; x++) w.box(x, y, gz, x, y, gz + 1, (y === gg + 6 && Math.abs(x - gx) <= 1) || (y === gg + 8 && x === gx) ? B.tombDk : tb); }
          headTop = gg + 10;
        } else if (kind === 1 || kind === 5) {
          // 십자 묘비: 계단 받침, 고리 십자
          w.box(gx - 2, gg + 1, gz - 1, gx + 2, gg + 2, gz + 2, B.tombDk); w.box(gx - 1, gg + 3, gz, gx + 1, gg + 3, gz + 1, B.tombDk);
          w.box(gx, gg + 4, gz, gx, gg + 15, gz + 1, tb); w.box(gx - 3, gg + 11, gz, gx + 3, gg + 12, gz + 1, tb);
          if (kind === 5) for (const [a, b2] of [[-2, 14], [2, 14], [-2, 9], [2, 9]]) w.set(gx + a, gg + b2, gz, tb);
          headTop = gg + 15;
        } else if (kind === 2) {
          // 오벨리스크: 세 단 받침, 가늘어지는 기둥, 뾰족 머리
          w.box(gx - 3, gg + 1, gz - 2, gx + 3, gg + 2, gz + 3, B.tombDk); w.box(gx - 2, gg + 3, gz - 1, gx + 2, gg + 5, gz + 2, tb); w.walls(gx - 2, gg + 5, gz - 1, gx + 2, gg + 5, gz + 2, B.trim);
          w.box(gx - 1, gg + 6, gz, gx + 1, gg + 15, gz + 1, tb); w.box(gx, gg + 16, gz, gx, gg + 18, gz + 1, tb); w.set(gx, gg + 19, gz, B.trim);
          headTop = gg + 19;
        } else if (kind === 4) {
          // 누운 평석 무덤: 덮개 위 새긴 십자
          w.box(gx - 3, gg + 1, gz, gx + 3, gg + 2, gz + 11, tb); w.box(gx - 2, gg + 3, gz + 1, gx + 2, gg + 3, gz + 10, tb);
          w.box(gx, gg + 3, gz + 2, gx, gg + 3, gz + 8, B.trim); w.box(gx - 2, gg + 3, gz + 4, gx + 2, gg + 3, gz + 4, B.trim);
          headTop = gg + 3;
        } else if (kind === 6) {
          // 쇠울타리를 두른 무덤과 작은 십자가
          ironFence(gx - 4, gz - 2, gx + 4, gz + 12, gg + 1, (x, z) => z === gz + 12 && Math.abs(x - gx) <= 1);
          w.box(gx, gg + 1, gz, gx, gg + 10, gz, tb); w.box(gx - 2, gg + 8, gz, gx + 2, gg + 8, gz, tb);
          headTop = gg + 10;
        } else {
          // 기울어진 낡은 묘비(위가 한 칸 밀림, 깨진 모서리)
          w.box(gx - 3, gg + 1, gz - 1, gx + 3, gg + 1, gz + 2, B.tombDk);
          for (let y = gg + 2; y <= gg + 8; y++) { const sh = y > gg + 5 ? 1 : 0; for (let x = gx - 2; x <= gx + 2; x++) if (!(y === gg + 8 && x === gx + 2)) w.box(x + sh, y, gz, x + sh, y, gz + 1, tb); }
          headTop = gg + 8;
        }
        if (kind !== 4) {
          if (k % 9 === 4) {
            // 파헤쳐진 무덤: 구덩이, 바닥의 관, 흙더미와 꽂힌 삽
            for (let dz = 3; dz <= 11; dz++) for (let dx = -2; dx <= 2; dx++) for (let y = gg - 3; y <= gg; y++) w.set(gx + dx, y, gz + dz, 0);
            w.box(gx - 2, gg - 4, gz + 3, gx + 2, gg - 4, gz + 11, B.soil);
            w.box(gx - 1, gg - 3, gz + 4, gx + 1, gg - 3, gz + 10, B.coffin); w.box(gx - 1, gg - 2, gz + 4, gx + 1, gg - 2, gz + 6, B.lid);
            w.ellipsoid(gx + 5, gg + 1, gz + 7, 2.6, 2.2, 4, B.mound, (dx, dy) => dy >= 0);
            w.box(gx + 5, gg + 3, gz + 4, gx + 5, gg + 8, gz + 4, B.wood); w.box(gx + 5, gg + 2, gz + 4, gx + 5, gg + 2, gz + 4, B.iron); w.box(gx + 4, gg + 8, gz + 4, gx + 6, gg + 8, gz + 4, B.wood);
          } else {
            // 봉분: 둥근 흙더미
            for (let dz = 3; dz <= 11; dz++) for (let dx = -2; dx <= 2; dx++) {
              const hh = (Math.abs(dx) <= 1 && dz > 3 && dz < 11) ? 2 : 1;
              w.box(gx + dx, gg + 1, gz + dz, gx + dx, gg + hh, gz + dz, B.mound);
            }
          }
        }
        if (k % 5 === 2) { w.box(gx + 3, gg + 1, gz + 2, gx + 3, gg + 2, gz + 2, B.iron); candle(gx + 3, gg + 3, gz + 2); }
        if (k % 7 === 3) { witherAt(gx + 1, gg + 3, gz + 3); witherAt(gx - 1, gg + 3, gz + 4); w.set(gx, gg + 3, gz + 3, B.witherStem); }
        if (headTop > gg + 12 && k % 3 === 1) w.set(gx, headTop + 1, gz + 1, B.crow);
      });
      landmarks.push({ name: '파헤쳐진 묘역', note: '구울 · 해골 병사 출몰', p: [76.5, MH.g(w, 76, 236) + 18, 236.5] });

      // ── 뚜껑이 움직이는 관(어깨가 넓은 육각 관) ──
      const cx = 56, cz = 216, cg = MH.g(w, cx, cz);
      for (let z = cz - 8; z <= cz + 18; z++) for (let x = cx - 9; x <= cx + 11; x++) {
        const d = Math.max(cx - 6 - x, x - cx - 8, cz - 5 - z, z - cz - 15, 0), cur = MH.g(w, x, z);
        if (cur < 0) continue;
        const h = Math.round(MH.lerp(cg, cur, Math.min(1, d / 3.5)));
        if (h !== cur || d === 0) MH.setH(w, x, z, h, d === 0 ? (hash3(x >> 1, 2, z >> 1) > 0.6 ? B.ash2 : B.ash) : (w.get(x, cur, z) || B.ash), B.soil);
      }
      const coffinW = dz => dz <= 3 ? 1 + (dz >= 1 ? 1 : 0) + (dz >= 3 ? 1 : 0) : dz >= 12 ? 1 : 3 - (dz >= 9 ? 1 : 0);
      for (let dz = 0; dz <= 13; dz++) { const hw = coffinW(dz); for (let x = cx - hw; x <= cx + hw; x++) { const edge = Math.abs(x - cx) === hw || dz === 0 || dz === 13; w.box(x, cg + 1, cz + dz, x, cg + 4, cz + dz, edge ? B.coffin : B.soul); w.set(x, cg + 1, cz + dz, B.coffin); } }
      w.box(cx - 4, cg + 1, cz - 4, cx + 4, cg + 1, cz - 3, B.tombDk);
      for (let y = cg + 2; y <= cg + 11; y++) { const hw = y >= cg + 11 ? 1 : 2; w.box(cx - hw, y, cz - 4, cx + hw, y, cz - 3, B.tomb); }
      w.box(cx - 1, cg + 7, cz - 2, cx + 1, cg + 7, cz - 2, B.tombDk);
      for (const [a, b2] of [[-6, 2], [6, 2], [-5, 12], [5, 12]]) { w.box(cx + a, cg + 1, cz + b2, cx + a, cg + 4, cz + b2, B.iron); w.set(cx + a, cg + 5, cz + b2, B.ironDk); candle(cx + a, cg + 6, cz + b2); }
      w.ellipsoid(cx + 8, cg + 1, cz + 8, 2.5, 2, 3, B.mound, (dx, dy) => dy >= 0); w.box(cx + 8, cg + 3, cz + 6, cx + 8, cg + 7, cz + 6, B.wood);
      const lid = w.prop({ name: 'lid', pivot: [cx + 4, cg + 5, cz + 7] });
      for (let dz = 0; dz <= 13; dz++) { const hw = coffinW(dz); lid.box(cx - hw, cg + 5, cz + dz, cx + hw, cg + 5, cz + dz, B.lid); }
      lid.box(cx, cg + 6, cz + 2, cx, cg + 6, cz + 10, B.bone); lid.box(cx - 2, cg + 6, cz + 5, cx + 2, cg + 6, cz + 5, B.bone);
      lights.push({ name: 'coffin', p: [cx + 0.5, cg + 5, cz + 7], c: '#60ff98', i: 0.01, d: 28, flicker: 0.3 });
      acts.push({
        name: '열린 관', hint: '뚜껑이 들썩이다 밀려나고 혼불이 솟아요', hit: [cx - 3, cg + 1, cz, cx + 3, cg + 7, cz + 13],
        run: async a => {
          for (let k = 0; k < 3; k++) { await a.move('lid', [0, 1, 0], 0.18); await a.move('lid', [0, 0, 0], 0.16); }
          a.flash('coffin', 260, 3.6);
          await a.tween('lid', { off: [7.2, -3.2, 0], rot: [0, 0, -0.95] }, 1.1);
          a.burst([cx + 0.5, cg + 5, cz + 7], { n: 70, colors: ['#8dffba', '#70ffa8', '#d9d1bd'], speed: 6, up: 10, life: 2.4, gravity: -0.8, spread: 3 });
          await a.wait(2.4);
          await a.tween('lid', { off: [0, 0, 0], rot: [0, 0, 0] }, 1.2);
        },
      });

      // ══════════ 무덤지기의 오두막과 헛간, 장작더미·수레·우물 ══════════
      const hx = 180, hz = 210;
      const hy = Math.round((MH.maxG(w, hx - 4, hz - 4, hx + 28, hz + 24) + MH.minG(w, hx - 4, hz - 4, hx + 28, hz + 24)) / 2) + 1;
      // 터: 가운데는 평평하게, 둘레는 비탈 자락으로 이어 붙이고, 높은 쪽만 낮은 돌 축대
      for (let z = hz - 22; z <= hz + 44; z++) for (let x = hx - 24; x <= hx + 48; x++) {
        const d = Math.max(hx - 12 - x, x - hx - 36, hz - 10 - z, z - hz - 32, 0), cur = MH.g(w, x, z);
        if (cur < 0 || d > 12 || wet(x, z)) continue;
        const t = Math.min(1, d / (10 + n.fbm(x * 0.1, z * 0.1) * 4)), h = Math.round(MH.lerp(hy - 1, cur, t * t * (3 - 2 * t)));
        if (h !== cur || d === 0) MH.setH(w, x, z, h, d === 0 ? (hash3(x >> 2, 8, z >> 2) > 0.65 ? B.ash : B.ash2) : (w.get(x, cur, z) || B.ash), B.soil);
      }
      const hut = house({ x: hx, z: hz, sx: 24, sz: 18, floors: 2, fh: 12, face: 'w', roof: 'thatch', wall: B.daub, jetty: true, stone: 1, chimney: true, y: hy });
      if (hut.lamp) lights.push({ p: hut.lamp, c: '#ffb85a', i: 1.3, d: 28, flicker: 0.25, night: true });
      house({ x: hx + 4, z: hz + 23, sx: 14, sz: 9, fh: 10, face: 'w', roof: 'thatch', wall: B.plank, lantern: false, y: hy });
      // 처마 밑 장작더미(나이테 끝), 삽 걸이, 관 짜는 판자 더미
      for (let z = hz + 2; z <= hz + 14; z++) for (let y = hy + 3; y <= hy + 7; y++) for (const x of [hx + 26, hx + 27]) w.set(x, y, z, ((z + y) % 3 === 0) ? B.barkDk : (x === hx + 27 ? B.wood : B.bark));
      w.box(hx + 26, hy + 8, hz + 2, hx + 27, hy + 8, hz + 14, B.plank);
      w.box(hx - 8, hy, hz + 18, hx - 8, hy + 9, hz + 18, B.wood); w.box(hx - 8, hy + 10, hz + 18, hx - 8, hy + 12, hz + 18, B.iron); w.box(hx - 9, hy + 10, hz + 18, hx - 7, hy + 10, hz + 18, B.iron);
      for (let k = 0; k < 4; k++) w.box(hx + 20, hy + k, hz + 34 + (k & 1), hx + 22, hy + k, hz + 41 - (k & 1), k % 2 ? B.lid : B.coffin);
      // 수레(바퀴살 바퀴 둘)와 빈 관
      const cartX = hx - 9, cartZ = hz - 6, cy0 = hy + 3;
      w.box(cartX - 3, cy0, cartZ - 4, cartX + 3, cy0, cartZ + 4, B.plank);
      for (const s of [-3, 3]) w.box(cartX + s, cy0 + 1, cartZ - 4, cartX + s, cy0 + 2, cartZ + 4, B.plank);
      w.box(cartX - 3, cy0 + 1, cartZ - 4, cartX + 3, cy0 + 2, cartZ - 4, B.plank);
      w.box(cartX - 1, cy0 + 1, cartZ - 2, cartX + 1, cy0 + 2, cartZ + 3, B.coffin);
      for (const s of [-4, 4]) for (let a = 0; a < 24; a++) { const t = a / 24 * Math.PI * 2; w.set(cartX + s, cy0 - 1 + Math.round(Math.sin(t) * 2.6), cartZ + Math.round(Math.cos(t) * 2.6), B.barkDk); }
      for (const s of [-4, 4]) { w.box(cartX + s, cy0 - 3, cartZ, cartX + s, cy0 + 1, cartZ, B.wood); w.box(cartX + s, cy0 - 1, cartZ - 2, cartX + s, cy0 - 1, cartZ + 2, B.wood); }
      w.box(cartX - 1, cy0, cartZ + 5, cartX - 1, cy0, cartZ + 9, B.wood); w.box(cartX + 1, cy0, cartZ + 5, cartX + 1, cy0, cartZ + 9, B.wood);
      // 우물: 낱돌 둘레, 기둥과 도르래 지붕, 두레박
      const wx = hx + 32, wz = hz + 4, wy0 = hy;
      for (let y = wy0; y <= wy0 + 3; y++) for (let dz = -5; dz <= 5; dz++) for (let dx = -5; dx <= 5; dx++) {
        const r = Math.hypot(dx, dz); if (r > 4.8) continue;
        if (r < 2.8) { w.set(wx + dx, y, wz + dz, y === wy0 ? B.dark : 0); continue; }
        w.set(wx + dx, y, wz + dz, y === wy0 + 3 ? B.trim : (stoneAt(Math.round(Math.atan2(dz, dx) * 5), y, 61) || B.mortar));
      }
      for (const s of [-4, 4]) w.box(wx + s, wy0 + 4, wz, wx + s, wy0 + 13, wz, B.wood);
      w.box(wx - 5, wy0 + 13, wz, wx + 5, wy0 + 13, wz, B.wood); w.box(wx - 1, wy0 + 12, wz, wx + 1, wy0 + 12, wz, B.iron);
      roof(wx - 4, wx + 4, wz - 2, wz + 2, wy0 + 15, { axis: 'x', mat: 'thatch', gable: B.wood, ov: 2, og: 1, gwin: false });
      w.box(wx, wy0 + 7, wz, wx, wy0 + 11, wz, B.iron); w.box(wx - 1, wy0 + 5, wz - 1, wx + 1, wy0 + 6, wz + 1, B.wood);
      landmarks.push({ name: '무덤지기의 오두막', note: '중간 보스 · 무덤지기', p: [hx + 12, hut.peak + 10, hz + 9], mid: true });

      // ══════════ 종탑 예배당과 흔들리는 종 ══════════
      const tx = 44, tz = 150, tg = MH.maxG(w, tx - 10, tz - 10, tx + 10, tz + 32) + 1;
      for (let z = tz - 22; z <= tz + 50; z++) for (let x = tx - 26; x <= tx + 26; x++) {
        const d = Math.max(tx - 14 - x, x - tx - 14, tz - 12 - z, z - tz - 38, 0), cur = MH.g(w, x, z);
        if (cur < 0 || d > 12) continue;
        const t = Math.min(1, d / (9 + n.fbm(x * 0.1 + 3, z * 0.1) * 4)), h = Math.round(MH.lerp(tg - 1, cur, t * t * (3 - 2 * t)));
        if (h !== cur || d === 0) MH.setH(w, x, z, h, d === 0 ? pathAt(x, z) : (w.get(x, cur, z) || B.ash), B.rock);
      }
      house({ x: tx - 8, z: tz + 8, sx: 18, sz: 24, fh: 16, face: 's', roof: 'slate', wall: B.mortar, stone: 1, axis: 'z', lantern: false, win: B.gglass, y: tg });
      // 사각 종탑: 낱돌, 띠돌림, 종루(뾰족 구멍), 난간과 모서리 첨탑, 사각뿔 지붕과 쇠 십자
      const TX0 = tx - 6, TX1 = tx + 6, TZ0 = tz - 6, TZ1 = tz + 6, by = tg + 36;
      for (let z = TZ0 - 2; z <= TZ1 + 2; z++) for (let x = TX0 - 2; x <= TX1 + 2; x++) { const gg = MH.g(w, x, z); for (let y = Math.min(gg, tg - 1); y < tg; y++) w.set(x, y, z, B.wallBd); }
      w.box(TX0 - 2, tg, TZ0 - 2, TX1 + 2, tg + 1, TZ1 + 2, B.wallBd);
      w.box(TX0, tg, TZ0, TX1, by + 11, TZ1, B.mortar);
      shell(TX0, TZ0, TX1, TZ1, tg + 2, by + 11, 71);
      for (const y of [tg + 16, tg + 30]) w.walls(TX0 - 2, y, TZ0 - 2, TX1 + 2, y, TZ1 + 2, B.trim);
      for (let y = tg + 8; y <= tg + 26; y += 9) for (const k of ['s', 'e', 'w']) { const sd = SIDES(TX0, TZ0, TX1, TZ1)[k]; for (let r = 0; r < 4; r++) { put(sd, tx, y + r, 0, B.gglass); put(sd, tx, y + r, 1, 0); } put(sd, tx, y + 4, 1, B.trim); put(sd, tx, y - 1, 1, B.trim); }
      w.box(TX0 - 1, by - 1, TZ0 - 1, TX1 + 1, by - 1, TZ1 + 1, B.wallBd);
      for (let y = by; y <= by + 10; y++) {
        const hw = y <= by + 8 ? 4 : y === by + 9 ? 3 : 1;
        w.box(tx - hw, y, TZ0 - 1, tx + hw, y, TZ1 + 1, 0); w.box(TX0 - 1, y, tz - hw, TX1 + 1, y, tz + hw, 0);
        w.box(tx - 5, y, tz - 5, tx + 5, y, tz + 5, 0);
      }
      w.box(tx - 6, by + 10, tz, tx + 6, by + 10, tz, B.wood); w.box(tx - 6, by + 9, tz, tx - 6, by + 9, tz, B.wood); w.box(tx + 6, by + 9, tz, tx + 6, by + 9, tz, B.wood);
      w.walls(TX0 - 2, by + 12, TZ0 - 2, TX1 + 2, by + 12, TZ1 + 2, B.trim);
      for (let x = TX0 - 2; x <= TX1 + 2; x += 2) for (const zz of [TZ0 - 2, TZ1 + 2]) w.set(x, by + 13, zz, B.trim);
      for (let z = TZ0 - 2; z <= TZ1 + 2; z += 2) for (const xx of [TX0 - 2, TX1 + 2]) w.set(xx, by + 13, z, B.trim);
      for (const [px, pz] of [[TX0 - 2, TZ0 - 2], [TX1 + 2, TZ0 - 2], [TX0 - 2, TZ1 + 2], [TX1 + 2, TZ1 + 2]]) { w.box(px, by + 13, pz, px, by + 18, pz, B.wallBd); w.set(px, by + 19, pz, B.iron); }
      const tTop = MH.pyramid(w, TX0, TZ0, TX1, TZ1, by + 13, B.roof, 3, B.roofE);
      w.box(tx, tTop, tz, tx, tTop + 6, tz, B.iron); w.box(tx - 2, tTop + 4, tz, tx + 2, tTop + 4, tz, B.iron);
      // 예배당 앞 쇠 등과 촛불
      for (const s of [-6, 6]) { const lg = MH.g(w, tx + s, tz + 36); w.box(tx + s, lg + 1, tz + 36, tx + s, lg + 6, tz + 36, B.iron); w.set(tx + s, lg + 7, tz + 36, B.ironDk); candle(tx + s, lg + 8, tz + 36); }
      // 종(부품): 관, 어깨, 넓어지는 몸, 입술 띠, 추
      const bell = w.prop({ name: 'bell', pivot: [tx + 0.5, by + 10, tz + 0.5], axis: 'x' });
      bell.box(tx, by + 8, tz, tx, by + 9, tz, B.iron); bell.box(tx - 1, by + 8, tz, tx + 1, by + 8, tz, B.iron);
      for (let y = by + 1; y <= by + 7; y++) {
        const t = (by + 7 - y) / 6, r = 1.6 + t * t * 1.9, R = Math.ceil(r);
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) { const d = Math.hypot(dx, dz); if (d <= r && (d > r - 1.4 || y >= by + 6)) bell.set(tx + dx, y, tz + dz, (y === by + 1 || y === by + 4) ? B.bellDk : B.bell); }
      }
      bell.box(tx, by + 1, tz, tx, by + 6, tz, B.iron); bell.set(tx, by, tz, B.ironDk);
      acts.push({
        name: '종탑의 종', hint: '녹슨 종이 울리고 재가 흩날려요', hit: [tx - 6, by, tz - 6, tx + 6, by + 10, tz + 6],
        run: async a => {
          for (let k = 0; k < 5; k++) {
            await a.turn('bell', [0.5, 0, 0], 0.35);
            a.burst([tx + 0.5, by + 5, tz + 0.5], { n: 22, colors: ['#8e8a86', '#b0aaa2'], speed: 14, up: 2, life: 1.8, gravity: 1.2, spread: 6, flat: true });
            await a.turn('bell', [-0.5, 0, 0], 0.35);
          }
          await a.turn('bell', [0, 0, 0], 0.4);
        },
      });
      landmarks.push({ name: '울지 않는 종탑', note: '울부짖는 망령이 깃든 종', p: [tx + 0.5, tTop + 10, tz + 0.5] });

      // ══════════ 아래쪽 정문: 낱돌 기둥, 쇠 아치와 해골 판, 창살 울타리 ══════════
      const gz = 300, gxm = 210;
      for (const px of [gxm - 14, gxm + 14]) {
        const gy = MH.g(w, px, gz) + 1;
        w.box(px - 4, gy - 3, gz - 4, px + 4, gy + 1, gz + 4, B.wallBd); w.box(px - 4, gy + 2, gz - 4, px + 4, gy + 2, gz + 4, B.trim);
        w.box(px - 2, gy + 3, gz - 2, px + 2, gy + 20, gz + 2, B.mortar); shell(px - 2, gz - 2, px + 2, gz + 2, gy + 3, gy + 20, px);
        w.walls(px - 3, gy + 10, gz - 3, px + 3, gy + 10, gz + 3, B.trim);
        w.box(px - 4, gy + 21, gz - 4, px + 4, gy + 21, gz + 4, B.trim); w.box(px - 3, gy + 22, gz - 3, px + 3, gy + 22, gz + 3, B.wallBd);
        // 꼭대기 초록 불 등롱
        w.box(px - 1, gy + 23, gz - 1, px + 1, gy + 23, gz + 1, B.ironDk);
        for (let dy = 1; dy <= 3; dy++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) w.set(px + dx, gy + 23 + dy, gz + dz, (dx && dz) ? B.ironDk : B.gfire);
        w.box(px - 1, gy + 27, gz - 1, px + 1, gy + 27, gz + 1, B.iron); w.set(px, gy + 28, gz, B.iron);
        lights.push({ p: [px + 0.5, gy + 25, gz + 0.5], c: '#6dffa0', i: 1, d: 28, flicker: 0.4 });
      }
      const gg0 = MH.g(w, gxm, gz) + 1;
      for (let x = gxm - 12; x <= gxm + 12; x++) {
        const ah = Math.round(20 - Math.pow((x - gxm) / 12, 2) * 6);
        w.set(x, gg0 + ah, gz, B.iron); w.set(x, gg0 + ah - 3, gz, B.iron);
        if (x % 2 === 0) w.box(x, gg0 + 12, gz, x, gg0 + ah, gz, B.iron);
        if (x % 4 === 0) w.set(x, gg0 + ah - 2, gz, B.rust);
        w.set(x, gg0 + 12, gz, B.iron);
      }
      w.box(gxm - 3, gg0 + 20, gz, gxm + 3, gg0 + 24, gz, B.iron); skull(w, gxm, gg0 + 20, gz + 1, B.soul, 1);
      const paling = (pts) => {
        for (let i = 0; i < pts.length - 1; i++) {
          const [ax, az] = pts[i], [bx, bz] = pts[i + 1], nn = Math.max(Math.abs(bx - ax), Math.abs(bz - az));
          for (let s = 0; s <= nn; s++) {
            const x = Math.round(ax + (bx - ax) * s / nn), z = Math.round(az + (bz - az) * s / nn), gy = MH.g(w, x, z);
            if (gy < 0 || wet(x, z)) continue;
            if (s % 8 === 0) { w.box(x, gy + 1, z, x, gy + 9, z, B.wallBd); w.set(x, gy + 10, z, B.trim); }
            else { w.set(x, gy + 2, z, B.iron); w.set(x, gy + 7, z, B.iron); if (s % 2 === 0) { w.box(x, gy + 1, z, x, gy + 8, z, B.iron); w.set(x, gy + 9, z, B.ironDk); } }
          }
        }
      };
      paling([[20, 300], [gxm - 19, 300]]);
      paling([[gxm + 19, 300], [240, 290]]);

      // ══════════ 협곡 위 나무다리: 판자 바닥(처짐), 기둥과 녹슨 쇠줄 난간, 버팀 기둥 ══════════
      const bx0 = 224, bx1 = 290, bz0 = 124, bgy = MH.g(w, bx0, bz0 + 3), egy = MH.g(w, bx1, bz0 + 3);
      for (let x = bx0; x <= bx1; x++) {
        const t = (x - bx0) / (bx1 - bx0), yy = Math.round(bgy + (egy - bgy) * t - Math.sin(t * Math.PI) * 4);
        for (let dz = 0; dz <= 7; dz++) {
          if (w.get(x, yy, bz0 + dz) && MH.g(w, x, bz0 + dz) >= yy) continue;
          w.set(x, yy, bz0 + dz, (x % 3 === 0) ? B.wood : B.plank);
          for (let y = yy + 1; y <= yy + 12; y++) if (MH.g(w, x, bz0 + dz) < y) w.set(x, y, bz0 + dz, 0);
          if (dz === 0 || dz === 7) {
            if (x % 6 === 0) w.box(x, yy + 1, bz0 + dz, x, yy + 5, bz0 + dz, B.wood);
            else { w.set(x, yy + 5, bz0 + dz, B.rust); if (x % 6 === 3) w.set(x, yy + 4, bz0 + dz, B.rust); }
          }
          if ((dz === 0 || dz === 7) && x % 16 === 0) for (let y = MH.g(w, x, bz0 + dz) + 1; y < yy; y++) w.set(x, y, bz0 + dz, B.wood);
          if (x % 16 === 0 && dz % 2 === 1) w.set(x, yy - 1, bz0 + dz, B.wood);
        }
      }

      // ══════════ 동쪽 고지의 잿빛 화장터 마당 ══════════
      const CX0 = 194, CX1 = 238, CZ0 = 12, CZ1 = 104;
      const cy = MH.g(w, 216, 60);
      for (let z = CZ0; z <= CZ1; z++) for (let x = CX0; x <= CX1; x++) MH.setH(w, x, z, cy, hash3(x >> 2, 5, z >> 2) > 0.72 ? B.ash2 : B.cinder, B.rock);
      MH.skirt(w, CX0, CZ0, CX1, CZ1, cy, { R: 18, rate: 1.1, noise: (x, z) => n.fbm(x * 0.1, z * 0.1) * 6, surf: (x, z) => hash3(x >> 2, 6, z >> 2) > 0.6 ? B.gravel : B.ash2, fill: B.rock, skip: (x, z) => x < 192 });
      for (let z = CZ0; z <= CZ1; z++) for (let x = CX0; x <= CX1; x++) {
        if (x !== CX0 && x !== CX1 && z !== CZ0 && z !== CZ1) continue;
        const gg = MH.g(w, x, z); let low = gg;
        for (const [ddx, ddz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = x + ddx, nz = z + ddz; if (nx >= CX0 && nx <= CX1 && nz >= CZ0 && nz <= CZ1) continue; const ng = MH.g(w, nx, nz); if (ng >= 0) low = Math.min(low, ng); }
        if (gg - low < 2) continue;
        for (let y = low - 1; y < gg; y++) w.set(x, y, z, stoneAt((z === CZ0 || z === CZ1) ? x : z, y, 23) || B.mortar);
        w.set(x, gg, z, B.trim);
      }
      // 광장에서 화장터로 내려가는 옆 계단
      MH.flight(w, { name: '화장터 계단', axis: 'x', c: 60, half: 4, a: 178, b: 202, ha: P, hb: cy, step: B.path, edge: B.wallBd, fill: B.wallBd, rail: B.iron, post: B.wallBd, postGap: 6, clear: 14 });
      // 화장터 본채: 붉은 벽돌(얼룩), 낱돌 굽돌, 모서리 귀돌, 슬레이트 지붕
      const kx0 = 202, kx1 = 230, kz0 = 18, kz1 = 42, ky = cy;
      w.box(kx0 - 2, ky, kz0 - 2, kx1 + 2, ky, kz1 + 2, B.wallBd);
      for (let y = ky + 1; y <= ky + 20; y++) for (let z = kz0; z <= kz1; z++) for (let x = kx0; x <= kx1; x++) {
        const edge = x === kx0 || x === kx1 || z === kz0 || z === kz1;
        if (!edge) { if (y <= ky + 19) w.set(x, y, z, B.dark); continue; }
        const corner = (x === kx0 || x === kx1) && (z === kz0 || z === kz1);
        w.set(x, y, z, corner ? ((y >> 1) & 1 ? B.trim : B.wallBd) : y <= ky + 3 ? (stoneAt(x + z, y, 27) || B.mortar) : (hash3(x >> 2, y >> 1, z >> 2) > 0.7 ? B.brickR2 : B.brickR));
      }
      for (const y of [ky + 12, ky + 20]) w.walls(kx0 - 1, y, kz0 - 1, kx1 + 1, y, kz1 + 1, B.trim);
      w.walls(kx0 - 1, ky + 4, kz0 - 1, kx1 + 1, ky + 4, kz1 + 1, B.wallBd);
      // 동쪽 벽 높은 아치 창(그을린 창살)
      for (let z = kz0 + 5; z <= kz1 - 5; z += 7) {
        for (let y = ky + 6; y <= ky + 17; y++) for (let c = -1; c <= 1; c++) { if (y === ky + 17 && c) continue; w.set(kx1, y, z + c, c === 0 && y % 3 === 0 ? B.iron : B.warm); }
        w.box(kx1 + 1, ky + 5, z - 2, kx1 + 1, ky + 5, z + 2, B.trim); for (let c = -2; c <= 2; c++) w.set(kx1 + 1, ky + 18 - (Math.abs(c) === 2 ? 1 : 0), z + c, B.trim);
      }
      roof(kx0, kx1, kz0, kz1, ky + 21, { axis: 'x', mat: 'slate', gable: B.brickR, ov: 2, og: 2, gwin: false, ridge: B.soot, barge: B.soot });
      // 앞면(남쪽): 커다란 화장로 아궁이 — 낱돌 아치, 쇠문 둘, 안쪽 불씨와 석탄
      const fmx = 216, ffz = kz1;
      const fAt = x => ky + 12 - Math.pow(Math.abs(x - fmx) / 6.4, 2) * 4;
      for (let x = fmx - 9; x <= fmx + 9; x++) for (let y = ky + 1; y <= ky + 18; y++) {
        const at = fAt(x), ax = Math.abs(x - fmx);
        if (ax <= 6 && y <= at) { w.set(x, y, ffz, 0); w.set(x, y, ffz - 1, y <= ky + 3 ? (hash3(x, y, 1) > 0.4 ? B.ember : B.ember2) : B.soot); w.set(x, y, ffz - 2, B.ember); w.set(x, y, ffz - 3, B.soot); }
        else if (y <= at + 3 && y > ky && ax <= 9) w.set(x, y, ffz + 1, (stoneAt(x * 2, y, 33) || B.wallBd));
      }
      for (let x = fmx - 6; x <= fmx + 6; x++) w.set(x, ky + 1, ffz - 1, B.coal);
      w.box(fmx - 10, ky, ffz + 1, fmx + 10, ky, ffz + 6, B.wallBd);
      skull(w, fmx, Math.round(fAt(fmx)) + 2, ffz + 2, B.ember, 1);
      const fdL = w.prop({ name: 'furL', pivot: [fmx - 6, ky + 1, ffz + 0.5] }), fdR = w.prop({ name: 'furR', pivot: [fmx + 7, ky + 1, ffz + 0.5] });
      for (let x = fmx - 6; x <= fmx + 6; x++) for (let y = ky + 1; y <= ky + 12; y++) {
        if (y > fAt(x) || x === fmx) continue;
        const rim = y === ky + 3 || y === ky + 9 || x === fmx - 6 || x === fmx + 6 || Math.abs(x - fmx) === 1;
        (x < fmx ? fdL : fdR).set(x, y, ffz, rim ? B.rust : ((x + y) % 4 === 0 ? B.ironDk : B.iron));
      }
      lights.push({ name: 'furnace', p: [fmx + 0.5, ky + 4, ffz + 1], c: '#ff9a40', i: 0.25, d: 32, flicker: 0.4 });
      // 높은 굴뚝: 낱돌 받침, 벽돌 몸통, 띠돌림, 그을린 갓 꼭대기
      const chx = 224, chz = 24, chTop = ky + 68;
      w.box(chx - 4, ky + 1, chz - 4, chx + 4, ky + 8, chz + 4, B.mortar); shell(chx - 4, chz - 4, chx + 4, chz + 4, ky + 1, ky + 8, 37);
      w.box(chx - 5, ky + 9, chz - 5, chx + 5, ky + 9, chz + 5, B.trim);
      for (let y = ky + 10; y <= chTop; y++) for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) {
        const inner = Math.abs(dx) <= 1 && Math.abs(dz) <= 1 && y >= chTop - 3;
        w.set(chx + dx, y, chz + dz, inner ? (y === chTop - 3 ? B.ember : 0) : y >= chTop - 8 ? (hash3(dx, y, dz) > 0.4 ? B.soot : B.brickR2) : (hash3(chx + dx, y >> 1, chz + dz) > 0.75 ? B.brickR2 : B.brickR));
      }
      for (let y = ky + 22; y < chTop - 6; y += 14) w.walls(chx - 3, y, chz - 3, chx + 3, y, chz + 3, B.trim);
      w.walls(chx - 3, chTop - 4, chz - 3, chx + 3, chTop - 2, chz + 3, B.soot); w.walls(chx - 3, chTop - 1, chz - 3, chx + 3, chTop - 1, chz + 3, B.trim);
      w.set(chx, chTop - 2, chz, B.ember2);
      lights.push({ name: 'chim', p: [chx + 0.5, chTop + 1, chz + 0.5], c: '#ff8a3a', i: 0.6, d: 28, flicker: 0.5 });
      // 마당 소품: 석탄 더미, 손수레, 장작
      w.ellipsoid(206, cy + 1, 54, 5, 3.2, 4, B.coal, (dx, dy) => dy >= 0);
      w.box(226, cy + 2, 50, 232, cy + 2, 53, B.plank); w.box(226, cy + 3, 50, 226, cy + 4, 53, B.plank); w.box(232, cy + 3, 50, 232, cy + 3, 53, B.plank);
      for (const zz of [49, 54]) for (let a = 0; a < 16; a++) { const t = a / 16 * Math.PI * 2; w.set(229 + Math.round(Math.cos(t) * 1.8), cy + 2 + Math.round(Math.sin(t) * 1.8), zz, B.barkDk); }
      w.box(233, cy + 3, 51, 236, cy + 3, 51, B.wood); w.box(233, cy + 3, 52, 236, cy + 3, 52, B.wood);
      for (let z = 20; z <= 36; z++) for (let y = cy + 1; y <= cy + 6; y++) for (const x of [234, 235, 236]) w.set(x, y, z, ((z + y + x) % 3 === 0) ? B.barkDk : B.bark);
      // 납골 벽감(서쪽 벽): 칸마다 재 항아리와 촛불, 위에 슬레이트 차양
      for (let z = 68; z <= 100; z++) for (let y = cy + 1; y <= cy + 14; y++) {
        const cell = (z - 68) % 4 !== 0 && (y - cy - 1) % 4 !== 0;
        w.set(196, y, z, B.wallBd); w.set(197, y, z, B.wallBd); w.set(198, y, z, cell ? B.dark : B.trim);
        if (cell && (z - 68) % 4 === 2 && (y - cy - 1) % 4 === 1) w.set(198, y, z, ((z >> 2) + y) % 3 === 0 ? B.candle : B.urn);
        if (cell && (z - 68) % 4 === 2 && (y - cy - 1) % 4 === 2 && ((z >> 2) + y) % 3 !== 0) w.set(198, y, z, B.urnDk);
      }
      for (let z = 66; z <= 102; z++) { w.set(196, cy + 15, z, B.roofE); w.set(197, cy + 15, z, B.tile); w.set(198, cy + 15, z, B.tile3); w.set(199, cy + 15, z, B.tileDk); w.set(196, cy + 16, z, B.tile2); w.set(197, cy + 16, z, B.tileDk); }
      landmarks.push({ name: '잿빛 화장터', note: '묘지에 내리는 재의 근원 · 재의 망령', p: [chx + 0.5, chTop + 12, chz + 0.5] });

      // ══════════ 해골 지하묘지 입구: 흙둔덕 속 뼈 아치, 내려가는 계단, 쇠창살(부품) ══════════
      const qx = 216, qz = 80;
      w.ellipsoid(qx, cy, qz - 11, 15, 12, 10, B.mound, (dx, dy) => dy >= -6);
      for (let x = qx - 15; x <= qx + 15; x++) for (let z = qz - 21; z <= qz - 1; z++) { const t = w.top(x, z); if (t > cy && w.get(x, t, z) === B.mound && hash3(x >> 1, 9, z >> 1) > 0.5) w.set(x, t, z, B.deadgrass); }
      for (let z = qz; z <= qz + 14; z++) {
        const dep = Math.min(10, Math.ceil((qz + 14 - z) * 0.75));
        for (let x = qx - 4; x <= qx + 4; x++) {
          for (let y = cy - dep + 1; y <= cy + 6; y++) w.set(x, y, z, 0);
          w.set(x, cy - dep, z, Math.abs(x - qx) === 4 ? B.pathJ : B.path);
        }
        for (const s of [-5, 5, -6, 6]) { for (let y = cy - dep - 1; y <= cy; y++) w.set(qx + s, y, z, stoneAt(z, y, 45) || B.mortar); }
        for (const s of [-6, -5, 5, 6]) w.set(qx + s, cy + 1, z, z % 4 < 2 ? B.trim : B.bone);
      }
      // 뼈 아치(해골 줄)와 어두운 입구
      const qy = cy - 10;
      for (let x = qx - 9; x <= qx + 9; x++) for (let y = qy; y <= cy + 12; y++) {
        const ax = Math.abs(x - qx), top = qy + 12 - Math.pow(ax / 5.2, 2) * 4;
        if (ax <= 4 && y <= top) { w.set(x, y, qz - 1, B.dark); w.set(x, y, qz - 2, B.dark); w.set(x, y, qz - 3, B.dark); }
        else if (y <= top + 4 && y >= qy) {
          const ring = y - top;
          w.set(x, y, qz - 1, ring < 1.3 ? B.trim : ring > 3 ? B.trim : ((x + y) % 3 === 0 ? B.dark : B.bone));
          w.set(x, y, qz - 2, B.bone);
        }
      }
      for (let x = qx - 6; x <= qx + 6; x += 4) skull(w, x, cy + 5, qz, B.dark, 1);
      w.box(qx - 3, cy + 10, qz - 1, qx + 3, cy + 12, qz - 1, B.bone); skull(w, qx, cy + 10, qz, B.soul, 1);
      const gate = w.prop({ name: 'grate', pivot: [qx + 0.5, qy, qz + 0.5] });
      for (let x = qx - 4; x <= qx + 4; x++) for (let y = qy + 1; y <= qy + 11; y++) if (y <= qy + 12 - Math.pow(Math.abs(x - qx) / 5.2, 2) * 4 && (x % 2 === 0 || (y - qy) % 4 === 1)) gate.set(x, y, qz, (y === qy + 1) ? B.rust : ((y - qy) % 4 === 1 ? B.ironDk : B.iron));
      for (let x = qx - 4; x <= qx + 4; x += 2) gate.set(x, qy + 1, qz, B.rust);
      for (const s of [-4, 4]) w.set(qx + s, qy + 4, qz - 3, B.soul);
      lights.push({ name: 'cata', p: [qx + 0.5, qy + 4, qz - 1], c: '#60ff98', i: 0.2, d: 32, flicker: 0.3 });
      landmarks.push({ name: '해골 지하묘지 입구', note: '뼈로 쌓은 아치 · 아래로 끝없는 회랑', p: [qx + 0.5, cy + 28, qz - 8] });

      // ── 뼈 풍경: 죽은 나무 틀에 매단 뼈 줄 넷(부품) ──
      const chimeX0 = 226, chimeZ = 94, ctop = cy + 22;
      for (const px of [chimeX0 - 2, chimeX0 + 18]) {
        for (let y = cy + 1; y <= ctop; y++) { w.set(px, y, chimeZ, (y % 4 === 0) ? B.barkDk : B.bark); w.set(px + 1, y, chimeZ, B.bark); }
        w.line(px, cy + 3, chimeZ, px - 2, cy, chimeZ + 2, B.barkDk); w.line(px + 1, cy + 3, chimeZ, px + 3, cy, chimeZ - 2, B.barkDk);
      }
      w.box(chimeX0 - 4, ctop, chimeZ, chimeX0 + 21, ctop, chimeZ, B.bark); w.box(chimeX0 - 3, ctop + 1, chimeZ, chimeX0 + 20, ctop + 1, chimeZ, B.barkDk);
      w.box(chimeX0 - 4, ctop + 2, chimeZ, chimeX0 - 3, ctop + 3, chimeZ, B.crow); w.set(chimeX0 - 5, ctop + 3, chimeZ, B.iron);
      const chimes = [];
      for (let k = 0; k < 4; k++) {
        const x = chimeX0 + 2 + k * 4, len = 8 + (k % 2) * 4, nm = 'chime' + k;
        const p = w.prop({ name: nm, pivot: [x + 0.5, ctop, chimeZ + 0.5], axis: 'z' });
        for (let q = 1; q <= len; q++) {
          if (q % 4 === 0) { p.set(x, ctop - q, chimeZ, B.bone); p.set(x - 1, ctop - q, chimeZ, B.bone); p.set(x + 1, ctop - q, chimeZ, B.bone); }
          else p.set(x, ctop - q, chimeZ, q % 4 === 2 ? B.bone : B.iron);
        }
        skull(p, x, ctop - len - 4, chimeZ, B.dark, 1);
        chimes.push(nm);
      }

      // ══════════ 협곡 물가: 무너진 돌, 물가 바위, 마른 갈대 ══════════
      const BOATP = [[0, 0], [-2, 10], [-4, 20], [-6, 28], [-8, 36], [-10, 44], [-10, 52], [-8, 62], [-6, 72], [-2, 84], [26, 184]].map(([a, b2]) => [254 + a, 152 + b2]);
      const nearBoat = (x, z) => MH.polyDist(x, z, BOATP) < 10;
      for (let z = 2; z < D - 2; z += 3) for (let x = 200; x < W - 2; x += 3) {
        if (!wet(x, z) || nearBoat(x, z)) continue;
        let edge = false;
        for (const [dx, dz] of [[4, 0], [-4, 0], [0, 4], [0, -4]]) if (!wet(x + dx, z + dz)) edge = true;
        if (!edge) continue;
        const h = hash3(x, 13, z);
        if (h > 0.86) MH.rock(w, x, LV - 1, z, w.r(2, 3.6), hash3(x, 14, z) > 0.5 ? B.rockM : B.rockDk, B.tombMoss);
        else if (h < 0.18) { const gg2 = MH.g(w, x, z); for (let y = gg2 + 1; y <= LV + 3 + (h * 20 | 0) % 3; y++) w.set(x, y, z, y > LV + 1 ? B.grassTuft : B.witherStem); }
      }
      // 벼랑 발치에 떨어진 바위 무더기
      for (let i = 0; i < 70; i++) {
        const x = w.ri(196, W - 4), z = w.ri(4, D - 4), gg2 = MH.g(w, x, z);
        if (gg2 < 0 || wet(x, z) || gg2 > LV + 14 || MH.polyDist(x, z, ravine) > 30 || nearBoat(x, z)) continue;
        if (Math.abs(x - 257) < 40 && Math.abs(z - 128) < 8) continue;
        let steep = false;
        for (const [dx, dz] of [[5, 0], [-5, 0], [0, 5], [0, -5]]) if (MH.g(w, x + dx, z + dz) - gg2 > 6) steep = true;
        if (steep) MH.rock(w, x, gg2, z, w.r(1.6, 3.4), hash3(x, 2, z) > 0.5 ? B.rockDk : B.rock, null);
      }

      // ══════════ 죽은 나무, 바위, 마른 풀 ══════════
      for (const [tx2, tz2] of [[24, 110], [40, 276], [100, 290], [150, 200], [290, 216], [20, 196], [164, 150], [296, 40], [80, 236], [220, 270], [36, 60], [300, 140], [16, 24], [52, 16], [256, 300], [128, 304]]) {
        const gg2 = MH.g(w, tx2, tz2);
        if (gg2 > 0 && !w.get(tx2, gg2 + 1, tz2) && !wet(tx2, tz2)) deadTree(tx2, gg2 + 1, tz2, w.ri(26, 40), w.r(2, 2.8));
      }
      MH.scatter(w, 5200, (x, gy, z, b) => {
        if (b === B.deadgrass && w.chance(0.55)) { w.set(x, gy + 1, z, B.grassTuft); if (w.chance(0.4)) w.set(x, gy + 2, z, B.grassTuft); }
        else if ((b === B.ash || b === B.ash2) && w.chance(0.04)) w.set(x, gy + 1, z, B.bone);
        else if (b === B.deadgrass && w.chance(0.05)) witherAt(x, gy + 1, z);
      });
      for (let i = 0; i < 60; i++) {
        const x = w.ri(242, 314), z = w.ri(6, 314), gg2 = MH.g(w, x, z);
        if (gg2 > base + 2 && !wet(x, z) && !w.get(x, gg2 + 1, z) && !nearBoat(x, z)) {
          const r = w.r(2.2, 6);
          MH.rock(w, x, gg2 - (hash3(x, 3, z) > 0.5 ? Math.round(r * 0.5) : 0), z, r, B.rockM, B.tombMoss);
        }
      }

      // ── 가족 납골묘의 석문(부품): 옆으로 밀려나며 혼불이 새어 나온다 ──
      const tomb = used.find(([x, z]) => x === tombG[0] && z === tombG[1]);
      if (tomb) {
        const [mx, mz, mg] = tomb;
        w.box(mx - 2, mg + 1, mz + 10, mx + 2, mg + 6, mz + 10, B.soul); w.box(mx - 2, mg + 7, mz + 10, mx + 2, mg + 8, mz + 10, B.dark);
        const slab = w.prop({ name: 'slab', pivot: [mx + 0.5, mg + 1, mz + 12.5] });
        slab.box(mx - 2, mg + 1, mz + 11, mx + 2, mg + 8, mz + 12, B.slab);
        slab.box(mx - 2, mg + 8, mz + 12, mx + 2, mg + 8, mz + 12, B.trim);
        skull(slab, mx, mg + 4, mz + 12, B.dark, 1);
        lights.push({ name: 'tomb', p: [mx + 0.5, mg + 5, mz + 12.5], c: '#60ff98', i: 0.01, d: 28, flicker: 0.3 });
        acts.push({
          name: '납골묘 석문', hint: '가족 납골묘의 돌문이 옆으로 밀려나며 혼불이 새어 나와요', hit: [mx - 4, mg + 1, mz + 8, mx + 4, mg + 10, mz + 14],
          run: async a => {
            for (let k = 0; k < 3; k++) { await a.move('slab', [0.6, 0, 0], 0.08); await a.move('slab', [0, 0, 0], 0.08); }
            a.flash('tomb', 220, 4);
            await a.tween('slab', { off: [6.4, 0, 1.2], rot: [0, -0.2, 0] }, 1.4);
            for (let k = 0; k < 4; k++) { a.burst([mx + 0.5, mg + 5, mz + 12.5], { n: 34, colors: ['#8dffba', '#70ffa8', '#c9ffd9'], speed: 6, up: 8, life: 2.4, gravity: -1.2, spread: 2.4 }); await a.wait(0.4); }
            await a.wait(1);
            await a.tween('slab', { off: [0, 0, 0], rot: [0, 0, 0] }, 1.4);
          },
        });
      }

      // ── 죽은 나무의 까마귀 떼(부품) ──
      const crows = [], CTX = 150, CTZ = 200, ctg = MH.g(w, CTX, CTZ);
      const perch = [];
      for (let z = CTZ - 14; z <= CTZ + 14; z++) for (let x = CTX - 14; x <= CTX + 14; x++) { const t = w.top(x, z); if (t > ctg + 12) perch.push([x, t, z]); }
      perch.sort((p, q) => q[1] - p[1]);
      const free = (x, y, z) => !w.get(x, y, z);
      for (const [x, t, z] of perch) {
        if (crows.length >= 4 || crows.some(c => Math.abs(c[0] - x) + Math.abs(c[2] - z) < 5)) continue;
        const cells = [[0, 1, 0], [0, 1, -1], [0, 2, 0], [0, 2, -1], [0, 2, 1], [0, 3, 1], [0, 3, 2], [0, 1, -2], [-1, 2, 0], [1, 2, 0]];
        if (!cells.every(([a, b2, c]) => free(x + a, t + b2, z + c))) continue;
        const nm = 'crow' + crows.length, cp = w.prop({ name: nm, pivot: [x + 0.5, t + 1, z + 0.5] });
        cp.set(x, t + 1, z, B.crow); cp.set(x, t + 1, z - 1, B.crow); cp.set(x, t + 2, z, B.crow); cp.set(x, t + 2, z - 1, B.crow); cp.set(x, t + 1, z - 2, B.crow);
        cp.set(x - 1, t + 2, z, B.crow); cp.set(x + 1, t + 2, z, B.crow);
        cp.set(x, t + 2, z + 1, B.crow); cp.set(x, t + 3, z + 1, B.gfire); cp.set(x, t + 3, z + 2, B.iron);
        crows.push([x, t, z, nm]);
      }
      if (crows.length) acts.push({
        name: '까마귀 떼', hint: '죽은 나무의 까마귀들이 깍깍 날아올라 묘역을 한 바퀴 돌아요', hit: [CTX - 14, crows[0][1] - 8, CTZ - 14, CTX + 14, crows[0][1] + 6, CTZ + 14],
        run: async a => {
          for (const [x, t, z] of crows) a.burst([x + 0.5, t + 2.5, z + 0.5], { n: 16, colors: ['#141218', '#2a2630', '#4a4650'], speed: 8, up: 6, life: 1.6, gravity: 4, spread: 2 });
          // 진행 방향으로 머리를 돌리며 묘역 위를 돌다 북서쪽 하늘 너머로 사라지고, 다시 가지에 나타난다
          await Promise.all(crows.map(([, , , nm], k) => a.drive(nm, [[4 + k * 2, 12, 16], [28, 24 + k * 2, 12], [36, 30, -16 + k * 2], [8, 36, -44], [-28 - k * 4, 40 + k * 2, -60], [-80 - k * 6, 48, -140], [-120 - k * 6, 56, -224]], 6 + k * 0.3, { fwd: '+z', back: 1.0 })));
        },
      });

      // ── 혼불 행렬: 아래 묘역부터 납골당까지 무덤마다 혼불이 솟는다 ──
      const souls = graves.filter(([x, z]) => x > 36 && x < 240 && z < 280).sort((p, q) => q[1] - p[1]).filter((p, k) => k % 2 === 0).slice(0, 28);
      if (souls.length) acts.push({
        name: '혼불 행렬', hint: '아래 묘역부터 무덤마다 혼불이 솟아 납골당까지 이어져요', hit: [souls[0][0] - 6, souls[0][2] + 1, souls[0][1] - 2, souls[0][0] + 6, souls[0][2] + 12, souls[0][1] + 12],
        run: async a => {
          a.glow(1.8, 5);
          for (const [x, z, gy] of souls) { a.burst([x + 0.5, gy + 10, z + 7], { n: 18, colors: ['#8dffba', '#70ffa8', '#ffffff'], speed: 2.4, up: 10, life: 1.8, gravity: -1, spread: 1.2 }); await a.wait(0.14); }
          a.flash('crypt', 9, 2.2);
          a.burst([mid + 0.5, F + 10, fz + 6], { n: 80, colors: ['#8dffba', '#c9ffd9', '#50e890'], speed: 10, up: 12, life: 2.4, gravity: -1.2, spread: 6 });
          await a.wait(1.6);
        },
      });

      // ── 해골 첨탑: 번개가 내리치고 해골 눈에서 초록 불길이 쏟아진다 ──
      lights.push({ name: 'skull', p: [mid + 0.5, SKY + 5, scz + 4.5], c: '#70ffa8', i: 0.01, d: 60, flicker: 0.2 });
      acts.push({
        name: '해골 첨탑', hint: '첨탑 꼭대기 해골에 번개가 내리치고 눈에서 초록 불길이 쏟아져요', hit: [mid - 4, sTop, scz - 4, mid + 4, SKY + 9, scz + 5],
        run: async a => {
          for (let k = 0; k < 3; k++) {
            a.lightning(1 + k * 0.3); a.flash('skull', 300, 0.5);
            a.burst([mid + 0.5, SKY + 10, scz + 0.5], { n: 46, colors: ['#ffffff', '#c9ffd9', '#8dffba'], speed: 18, up: 4, life: 0.8, gravity: 6, spread: 3 });
            await a.wait(0.7);
          }
          a.flash('skull', 160, 3); a.glow(1.7, 3);
          for (let k = 0; k < 6; k++) { for (const ex of [mid - 1.5, mid + 2.5]) a.burst([ex, SKY + 5, scz + 5], { n: 16, colors: ['#70ffa8', '#8dffba', '#d9d1bd'], speed: 5, up: 2, life: 1.8, gravity: -1.6, spread: 0.8 }); await a.wait(0.4); }
        },
      });

      // ── 망자의 나룻배(부품): 초록 등불을 단 빈 배가 협곡 물길을 따라 내려온다 ──
      const FX = 254, FZ = 152, fy = LV;
      MH.routeOK(w, BOATP.slice(0, -1), 3, '나룻배 물길');
      const boat = w.prop({ name: 'boat', pivot: [FX + 0.5, fy, FZ + 0.5] });
      for (let dz = -7; dz <= 7; dz++) {
        const hw = Math.abs(dz) >= 7 ? 0 : Math.abs(dz) >= 5 ? 1 : 2;
        for (let dx = -hw; dx <= hw; dx++) {
          boat.set(FX + dx, fy, FZ + dz, B.coffin);
          if (Math.abs(dx) === hw) { boat.set(FX + dx, fy + 1, FZ + dz, B.coffin); boat.set(FX + dx, fy + 2, FZ + dz, B.wood); }
        }
      }
      boat.box(FX - 1, fy + 1, FZ - 1, FX + 1, fy + 1, FZ - 1, B.plank); boat.box(FX - 1, fy + 1, FZ + 3, FX + 1, fy + 1, FZ + 3, B.plank);
      boat.box(FX, fy + 1, FZ + 7, FX, fy + 3, FZ + 7, B.wood); boat.box(FX, fy + 1, FZ - 7, FX, fy + 3, FZ - 7, B.wood);
      boat.box(FX, fy + 2, FZ + 6, FX, fy + 12, FZ + 6, B.iron); boat.box(FX, fy + 12, FZ + 7, FX, fy + 12, FZ + 9, B.iron);
      boat.set(FX, fy + 11, FZ + 9, B.ironDk); boat.box(FX, fy + 9, FZ + 9, FX, fy + 10, FZ + 9, B.gfire); boat.set(FX, fy + 8, FZ + 9, B.ironDk);
      skull(boat, FX, fy + 1, FZ + 1, B.dark, 1); boat.box(FX, fy + 1, FZ - 4, FX, fy + 1, FZ - 3, B.bone);
      acts.push({
        name: '망자의 나룻배', hint: '초록 등불을 단 빈 나룻배가 협곡 물길을 따라 미끄러져 내려와요', hit: [FX - 4, fy, FZ - 8, FX + 4, fy + 12, FZ + 10],
        run: async a => {
          a.burst([FX + 0.5, fy + 10, FZ + 9.5], { n: 34, colors: ['#8dffba', '#c9ffd9'], speed: 4, up: 4, life: 2, gravity: -0.6, spread: 2 });
          // 뱃머리(+z, 등불 쪽)를 물길 방향으로 돌리며 협곡을 따라 남쪽 끝 안개 너머까지 흘러간다
          await a.drive('boat', [[-2, 0, 10], [-4, 0, 20], [-6, 0, 28], [-8, 0, 36], [-10, 0, 44], [-10, 0, 52], [-8, 0, 62], [-6, 0, 72], [-2, 0, 84], [26, 0, 184]], 9, { fwd: '+z', back: 1.0 });
        },
      });

      // ══ 화장터·지하묘지·풍경 상호작용 ══
      acts.push({
        name: '화장로', hint: '화장터 아궁이 쇠문이 열리며 불길이 쏟아지고 굴뚝에서 재 기둥이 치솟아요', hit: [fmx - 8, ky + 1, ffz - 2, fmx + 8, ky + 14, ffz + 4],
        run: async a => {
          a.flash('furnace', 12, 5); a.flash('chim', 5, 5);
          await Promise.all([a.turn('furL', [0, -1.9, 0], 1.2), a.turn('furR', [0, 1.9, 0], 1.2)]);
          for (let k = 0; k < 6; k++) {
            a.burst([fmx + 0.5, ky + 6, ffz + 4], { n: 46, colors: ['#ffd070', '#ff8a3a', '#ff5a2a'], speed: 10, up: 6, life: 1.4, gravity: -1, spread: 4 });
            a.burst([chx + 0.5, chTop + 1, chz + 0.5], { n: 56, colors: ['#8e8a86', '#6d6a68', '#ff8a3a', '#b0aaa2'], speed: 4, up: 18, life: 3.2, gravity: -0.6, spread: 2.8 });
            await a.wait(0.45);
          }
          await a.wait(0.8);
          await Promise.all([a.turn('furL', [0, 0, 0], 1.2), a.turn('furR', [0, 0, 0], 1.2)]);
        },
      });
      acts.push({
        name: '지하묘지 쇠창살', hint: '뼈 아치의 쇠창살이 덜컹 올라가고 초록 안개가 계단을 타고 흘러나와요', hit: [qx - 6, qy, qz - 1, qx + 6, cy + 6, qz + 4],
        run: async a => {
          for (let k = 0; k < 3; k++) { await a.move('grate', [0, 1, 0], 0.12); await a.move('grate', [0, 0, 0], 0.1); }
          a.flash('cata', 30, 5);
          await a.move('grate', [0, 11, 0], 1.6);
          for (let k = 0; k < 6; k++) {
            a.burst([qx + 0.5, qy + 4, qz + 2 + k * 2], { n: 30, colors: ['#8dffba', '#50e890', '#c9ffd9'], speed: 5, up: 3, life: 2.4, gravity: -0.4, spread: 3.2, flat: true });
            await a.wait(0.35);
          }
          a.burst([qx + 0.5, cy + 6, qz + 14], { n: 60, colors: ['#70ffa8', '#ffffff'], speed: 6, up: 12, life: 2.2, gravity: -1.2, spread: 4 });
          await a.wait(1.2);
          await a.move('grate', [0, 0, 0], 0.5);
          a.burst([qx + 0.5, qy, qz + 1], { n: 28, colors: ['#5a3a2a', '#8e8a86'], speed: 8, up: 2, life: 0.8, gravity: 8, spread: 3, flat: true });
        },
      });
      acts.push({
        name: '뼈 풍경', hint: '죽은 나무 틀에 매단 뼈 줄이 바람에 번갈아 흔들리며 달그락거려요', hit: [chimeX0, ctop - 16, chimeZ - 2, chimeX0 + 16, ctop, chimeZ + 2],
        run: async a => {
          a.wind(2.4, 3.6);
          for (let k = 0; k < 5; k++) {
            await Promise.all(chimes.map((nm, i) => a.turn(nm, [0, 0, ((k + i) % 2 ? 0.5 : -0.5) * (1 - k * 0.12)], 0.32)));
            a.burst([chimeX0 + 8, ctop - 8, chimeZ + 0.5], { n: 18, colors: ['#d9d1bd', '#8e8a86', '#b0aaa2'], speed: 12, up: 2, life: 1.6, gravity: 0.8, spread: 6, flat: true });
          }
          await Promise.all(chimes.map(nm => a.turn(nm, [0, 0, 0], 0.5)));
        },
      });

      const smoke = [];
      if (hut.chimney) smoke.push({ n: 50, colors: ['#6a6670', '#8a8690'], mode: 'rise', speed: 1.2, area: [hut.chimney[0], hut.chimney[2], 1.2], y0: hut.chimney[1], y1: hut.chimney[1] + 40, glow: false });
      smoke.push({ n: 110, colors: ['#6d6a68', '#8e8a86', '#4a4648'], mode: 'rise', speed: 1.4, area: [chx + 0.5, chz + 0.5, 2.4], y0: chTop + 1, y1: chTop + 60, glow: false });
      smoke.push({ n: 30, colors: ['#ffb060', '#ff7a2a'], mode: 'rise', speed: 2, area: [chx + 0.5, chz + 0.5, 1.6], y0: chTop + 1, y1: chTop + 20 });
      return { lights, landmarks, acts, particles: smoke };
    },
  });
})();
