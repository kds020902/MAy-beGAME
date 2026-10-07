// 연못가 물레방앗간(하위 지도) — 황금들녘 서쪽 연못 물길 곁의 2층 방앗간. 남쪽 문으로 들어서면 동쪽에 맷돌방(굴대·톱니바퀴·맷돌),
// 바깥 물길에서 물레가 돌고, 서쪽은 빵 화덕과 반죽 통이 있는 방앗간 부엌, 북쪽 벽 위로 곡물 다락(계단 · 포대 도르래). 남·동쪽 벽은 잘라 낮췄다
// (128칸, 2배 해상도 · 1칸 ≈ 25cm: 낱돌 아랫벽과 반목조 회벽, 덧창, 판석 바닥 줄눈, 바퀴살·물받이판 물레, 이 박힌 톱니바퀴, 홈 파인 맷돌과 깔때기)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 128, D = 128, Hh = 96, G = 20;
  MAPS.push({
    id: 'harvest-mill', cat: 'village', sub: true, parent: 'harvest', name: '연못가 물레방앗간', en: 'Harvest Hollow · Pondside Watermill', color: '#9a9088', seed: 1512, base: G, time: 'day', size: [W, D, Hh],
    playerScale: 2,
    desc: '연못에서 끌어온 물길이 물레를 돌리고, 굴대와 톱니바퀴가 맷돌을 돌려 햇밀을 빻는 방앗간. 맷돌방 옆 부엌에서는 갓 빻은 밀가루로 반죽을 치대 화덕에 빵을 굽고, 계단 위 곡물 다락에는 밀 포대가 천장까지 쌓여 있다.',
    info: { title: '장소 정보', en: 'WATERMILL', rows: [['맷돌방', '물레 굴대 · 톱니바퀴 · 맷돌 · 밀가루 체'], ['부엌', '빵 화덕 · 반죽 통 · 햇밀 빵'], ['다락', '밀 포대 · 포대 도르래']] },
    sky: ['#fbd29a', '#a8b8c0', '#ffe4a8'], stars: false,
    hemi: ['#fff0d8', '#4a3a2a', 0.62], sun: ['#ffe0b0', 0.72, [0.6, 0.9, 0.45]],
    night: { sky: ['#283048', '#0a0a18', '#c88a48'], stars: true, hemi: ['#b0b8d0', '#181410', 0.42], sun: ['#c8d0ff', 0.3, [0.6, 0.9, 0.45]], haze: '#262a34' },
    liquid: ['#3a5a4a', '#5a8a6a', '#f0f0d0'], liqSpeed: 0.9,
    fog: { start: 0.92, floor: G - 28, depth: 12, haze: [12, 0.12, 12], hazeColor: '#e8d8b8' },
    camY: 4, zoom: 1.8,
    particles: [
      { n: 130, colors: ['#ffffff', '#f8f4ea', '#f0e8d0'], mode: 'drift', speed: 0.2, wind: 0.2, area: [72, 60, 24], y0: G + 2, y1: G + 24, glow: true },
      { n: 40, colors: ['#ffffff', '#d8f0ff'], mode: 'rise', speed: 1.2, area: [106, 60, 6], y0: G - 2, y1: G + 12, glow: false },
    ],
    blocks: {
      grass: { c: '#6a4a30', top: '#9aa04a', v: 0.08 }, grass2: { c: '#6a4a30', top: '#b0a048', v: 0.08 }, dirt: { c: '#6a4a30', v: 0.08 }, rock: { c: '#7a7068', v: 0.06, pat: 'stone' },
      path: { c: '#6a4a30', top: '#c8a878', v: 0.1 }, flag: { c: '#8a8278', top: '#aaa298', v: 0.04 }, flag2: { c: '#827a70', top: '#9e968c', v: 0.04 }, flagJ: { c: '#6a645c', top: '#7a746a', v: 0.03 },
      boards: { c: '#7a5a3a', top: '#a07a4e', v: 0.04 }, boards2: { c: '#6e5034', top: '#926e44', v: 0.04 },
      millS: { c: '#9a9088', v: 0.05, pat: 'stone' }, millSd: { c: '#7e766e', v: 0.05 }, plaster: { c: '#f0e0c0', v: 0.03 }, frame: { c: '#6a4428', v: 0.04 }, frameDk: { c: '#4e3020', v: 0.04 }, found: { c: '#8a8070', v: 0.05, pat: 'stone' },
      st1: { c: '#8e8478', v: 0.05 }, st2: { c: '#7c746a', v: 0.05 }, st3: { c: '#9c9284', v: 0.05 }, st4: { c: '#888070', v: 0.05 }, mortar: { c: '#a49a88', v: 0.04 }, sill: { c: '#b0a698', v: 0.04 },
      win: { c: '#ffd890', night: true, day: '#a8c8d0' }, shutter: { c: '#6a8a3a', v: 0.02 }, shutterDk: { c: '#56742c', v: 0.02 }, door: { c: '#4a2e1c', v: 0.03 }, doorDk: { c: '#36200f', v: 0.03 },
      log: { c: '#5a3a24', v: 0.05 }, cart: { c: '#8a6a40', v: 0.05 }, wood: { c: '#6a4428', v: 0.05 }, crate: { c: '#9a7448', v: 0.05 }, crateEdge: { c: '#6a4e2e', v: 0.04 },
      iron: { c: '#3a3a40', v: 0.03 }, ironDk: { c: '#2a2a30', v: 0.03 }, rope: { c: '#b8a080', v: 0.04 }, brass: { c: '#e0b850', v: 0.02 },
      stone: { c: '#b0a89e', v: 0.04 }, stoneD: { c: '#8a8278', v: 0.04 }, sack: { c: '#d8c8a0', v: 0.04 }, sack2: { c: '#c8b48a', v: 0.04 }, flour: { c: '#f8f4ea', v: 0.02 }, wheat: { c: '#e0bc50', v: 0.06 },
      cask: { c: '#8a5a30', v: 0.05 }, cask2: { c: '#7a4e28', v: 0.05 },
      brick: { c: '#a85a3a', v: 0.05, pat: 'brick' }, brickD: { c: '#7a3e2a', v: 0.05, pat: 'brick' }, fire: { c: '#ff9a3a', glow: true }, fire2: { c: '#ffd060', glow: true }, coal: { c: '#2a1c18', v: 0.04 },
      bread: { c: '#c8843a', v: 0.05 }, breadL: { c: '#e0a858', v: 0.04 }, dough: { c: '#f0e2c4', v: 0.03 }, pot: { c: '#b86a40', v: 0.04 }, jar: { c: '#6a8a9a', v: 0.04 }, cloth: { c: '#e8dcc8', v: 0.03 }, check: { c: '#c84a3a', v: 0.03, pat: 'check', alt: '#f0e8d8' },
      reed: { c: '#8a8a4a', v: 0.08 }, reedTop: { c: '#7a5a32', v: 0.05 }, lily: { c: '#4a8a3a', v: 0.05 }, lilyF: { c: '#f0a8c8', v: 0.03 },
      leafY: { c: '#e8b83a', v: 0.08 }, leafG: { c: '#7a8a3a', v: 0.08 }, leafO: { c: '#e08a2a', v: 0.08 }, bark: { c: '#5a3a24', v: 0.06 },
      lamp: { c: '#ffd890', glow: true }, herb: { c: '#5a7a3a', v: 0.06 }, herb2: { c: '#7a8a4a', v: 0.06 }, pumpkin: { c: '#e8801a', v: 0.05 }, pumpkin2: { c: '#cc6a12', v: 0.05 }, stem: { c: '#4a7a2a', v: 0.05 }, apple: { c: '#c8302a', v: 0.04 },
    },
    build(w) {
      const B = w.id;
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const X0 = 32, X1 = 94, Z0 = 36, Z1 = 86, TOP = G + 26, LY = G + 14;   // 벽 선, 벽 높이, 다락 바닥
      const DX0 = 60, DX1 = 65;                                               // 남쪽 문
      const inR = (x, z) => x > X0 && x < X1 && z > Z0 && z < Z1;
      const CHX0 = 102, CHX1 = 111, WL = G - 2;                               // 동쪽 바깥 물길
      MH.terrain(w, { floor: G - 16, height: () => G, surface: (x, z) => hash3(x >> 2, 1, z >> 2) > 0.7 ? B.grass2 : B.grass, under: (x, z, y, dep) => dep < 4 ? B.dirt : B.rock });
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
      const crate = (x, y, z, sx, sy, sz) => {
        for (let dy = 0; dy < sy; dy++) for (let dz = 0; dz < sz; dz++) for (let dx = 0; dx < sx; dx++) {
          const e = (dx === 0 || dx === sx - 1) + (dy === 0 || dy === sy - 1) + (dz === 0 || dz === sz - 1);
          S(x + dx, y + dy, z + dz, e >= 2 ? B.crateEdge : B.crate);
        }
      };
      const barrel = (x, y, z, ht, top) => {
        for (let r = 0; r < ht; r++) for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) {
          const rr = r >= 1 && r <= ht - 2 ? 2.6 : 2.2, d2 = dx * dx + dz * dz;
          if (d2 > rr * rr) continue;
          const outer = d2 > (rr - 1) * (rr - 1);
          S(x + dx, y + r, z + dz, r === ht - 1 && !outer ? top : ((r === 1 || r === ht - 2) && outer ? B.iron : ((Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 5)) & 1) ? B.cask : B.cask2)));
        }
      };

      // ── 물길: 북쪽 연못에서 남쪽으로, 낱돌 둑과 갈대 ──
      for (let z = 0; z < D; z++) for (let x = CHX0 - 1; x <= CHX1 + 1; x++) {
        const bank = x === CHX0 - 1 || x === CHX1 + 1;
        for (let y = G - 8; y <= G; y++) S(x, y, z, bank ? (y === G ? B.sill : (stoneAt(z, y, 4) || B.mortar)) : (y <= G - 8 ? B.rock : 0));
        if (!bank) w.liquid(x, z, WL);
      }
      for (let z = 1; z < D - 1; z++) for (const x of [CHX0 - 3, CHX0 - 2, CHX1 + 2, CHX1 + 3]) {
        const h = hash3(x, 5, z); if (h < 0.62 || (z > 28 && z < 94)) continue;
        const ht = 4 + ((h - 0.62) * 20 | 0); for (let k = 1; k <= ht; k++) S(x, G + k, z, B.reed);
        if (h > 0.88) { S(x, G + ht + 1, z, B.reedTop); S(x, G + ht + 2, z, B.reedTop); }
      }
      for (const [x, z] of [[105, 16], [108, 104], [106, 116]]) { for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) S(x + dx, WL, z + dz, B.lily); S(x, WL + 1, z, B.lilyF); }
      { const tx = 118, tz = 20;   // 버드나무: 줄기, 꼭대기 잎뭉치, 늘어진 잎줄기
        for (let y = 0; y < 18; y++) w.cyl(tx, tz, G + 1 + y, G + 1 + y, y < 2 ? 2.2 : 1.5, B.bark);
        for (const [dx, dy, dz, r] of [[0, 21, 0, 7], [-5, 17, 3, 5], [5, 17, -3, 5], [-3, 18, -5, 4.5]]) w.ellipsoid(tx + dx, G + dy, tz + dz, r, r * 0.6, r, B.leafG, (x, y, z, d) => d < 0.6 || hash3(tx + x, y, tz + z) > 0.3);
        for (let k = 0; k < 50; k++) { const a = hash3(k, 3, 9) * 6.28, rr = 3 + hash3(k, 4, 9) * 6, x = Math.round(tx + Math.cos(a) * rr), z = Math.round(tz + Math.sin(a) * rr); for (let y = G + 16; y > G + 16 - 6 - ((hash3(k, 5, 9) * 8) | 0); y--) if (!w.get(x, y, z)) S(x, y, z, k % 3 ? B.leafG : B.leafY); } }

      // ── 바닥: 맷돌방은 판석(줄눈), 부엌은 널마루, 문 앞은 흙길 ──
      const KX = 54;                                                           // 부엌(서) | 맷돌방(동) 경계
      const flagAt = (x, z) => { const row = Math.floor(z / 4), off = (row & 1) * 3; if (z % 4 === 3 || (x + off) % 6 === 5) return B.flagJ; return hash3(Math.floor((x + off) / 6), row, 3) > 0.6 ? B.flag2 : B.flag; };
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) S(x, G, z, x < KX ? ((x >> 1) & 1 ? B.boards : B.boards2) : flagAt(x, z));
      for (let z = Z1 + 1; z < D - 8; z++) for (let x = DX0 - 2; x <= DX1 + 2; x++) S(x, G, z, hash3(x >> 1, 5, z >> 1) > 0.8 ? B.grass : B.path);

      // ── 벽: 북·서는 높고(낱돌 아랫벽, 회벽에 나무 샛기둥과 가새, 창과 녹색 덧창), 동·남은 낮게 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (inR(x, z)) continue;
        const low = x === X1 || z === Z1, corner = (x === X0 || x === X1) && (z === Z0 || z === Z1);
        const a = (x === X0 || x === X1) ? z : x;
        if (low) {
          for (let y = G + 1; y <= G + 4; y++) S(x, y, z, corner || a % 8 === 0 ? B.frame : (stoneAt(a, y, 5) || B.mortar));
          if (corner || a % 16 === 0) { S(x, G + 5, z, B.frame); S(x, G + 6, z, B.frameDk); }
          continue;
        }
        for (let y = G + 1; y <= TOP; y++) {
          let b = y <= G + 6 ? (stoneAt(a, y, 5) || B.mortar) : (corner ? ((y >> 1) & 1 ? B.sill : B.millSd) : (a % 8 === 0 || y === LY || y === LY + 1 || y >= TOP - 1 || y === G + 7 ? B.frame : B.plaster));
          S(x, y, z, b);
        }
      }
      // 가새(벽 칸마다 하나씩)
      for (let a = 8; a < 88; a += 16) for (let k = 0; k <= 6; k++) { if (X0 + a + k < X1) S(X0 + a + k, G + 8 + k, Z0, B.frame); if (Z0 + a + k < Z1 - 2 && a > 8) S(X0, G + 8 + k, Z0 + a + k, B.frame); }
      const winAt = (x0, z0, alongX, y0, wd, ht, inward) => {
        for (let r = -1; r <= ht; r++) for (let c = -2; c <= wd + 1; c++) {
          const [x, z] = alongX ? [x0 + c, z0] : [x0, z0 + c];
          const fr = r === -1 || r === ht || c === -1 || c === wd;
          if (c === -2 || c === wd + 1) { if (r >= 0 && r < ht) { const [ox, oz] = alongX ? [x, z + inward] : [x + inward, z]; S(ox, y0 + r, oz, r % 2 ? B.shutter : B.shutterDk); } continue; }
          S(x, y0 + r, z, fr ? B.frameDk : (c === (wd >> 1) || r === (ht >> 1) ? B.frame : B.win));
        }
        for (let c = -1; c <= wd; c++) { const [x, z] = alongX ? [x0 + c, z0 + inward] : [x0 + inward, z0 + c]; S(x, y0 - 1, z, B.sill); }
      };
      for (const x of [62, 78, 86]) winAt(x, Z0, true, G + 18, 4, 6, 1);
      for (const z of [52, 68]) winAt(X0, z, false, G + 8, 4, 6, 1);
      // 남쪽 문: 문틀, 상인방, 안쪽으로 열린 판자문
      for (let x = DX0; x <= DX1; x++) for (let y = G + 1; y <= G + 10; y++) S(x, y, Z1, 0);
      for (const x of [DX0 - 1, DX1 + 1]) w.box(x, G + 1, Z1, x, G + 11, Z1, B.frameDk);
      w.box(DX0 - 2, G + 11, Z1, DX1 + 2, G + 11, Z1, B.frameDk); S(DX0 - 2, G + 12, Z1, B.iron); S(DX0 - 2, G + 13, Z1, B.lamp);
      for (let z = Z1 - 6; z <= Z1 - 1; z++) for (let y = G + 1; y <= G + 10; y++) S(DX1 + 2, y, z, (z === Z1 - 6 || y === G + 1 || y === G + 10 || y === G + 5) ? B.doorDk : B.door);
      S(DX1 + 3, G + 5, Z1 - 5, B.brass);
      for (let x = DX0; x <= DX1; x++) S(x, G, Z1, B.sill);

      // ── 맷돌방: 바깥 물레(부품, 계속 돈다) → 굴대 → 톱니바퀴(부품) → 맷돌(부품 위돌) ──
      const AZ = 60, AY = G + 6, WX = 106, WR = 10;
      for (let x = 90; x <= CHX0 - 1; x++) for (const [dy, dz] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) S(x, AY + dy, AZ + dz, x % 4 === 0 ? B.iron : B.log);
      for (const x of [CHX0 - 1, CHX1 + 1]) for (let y = G - 8; y <= AY - 2; y++) for (let dz = -2; dz <= 2; dz++) S(x, y, AZ + dz, stoneAt(dz + 10, y, 8) || B.mortar);
      for (const x of [CHX0 - 1, CHX1 + 1]) { w.box(x, AY - 1, AZ - 2, x, AY - 1, AZ + 2, B.sill); S(x, AY, AZ, B.ironDk); }
      S(CHX1 + 1, AY, AZ, B.log);
      const wheel = w.prop({ name: 'waterwheel', pivot: [WX + 0.5, AY + 0.5, AZ + 0.5], axis: 'x', speed: 0.35 });
      for (let dy = -WR - 2; dy <= WR + 2; dy++) for (let dz = -WR - 2; dz <= WR + 2; dz++) {
        const r = Math.hypot(dy, dz), ang = Math.atan2(dy, dz);
        if (r > WR + 0.5) continue;
        if (r > WR - 1.6) {
          for (const x of [WX - 3, WX + 3]) wheel.set(x, AY + dy, AZ + dz, B.log);
          if (r > WR - 0.7) for (let x = WX - 2; x <= WX + 2; x++) wheel.set(x, AY + dy, AZ + dz, B.cart);
          continue;
        }
        const sp = ((ang / (Math.PI / 4)) % 1 + 1) % 1, onSpoke = r > 1.8 && (sp < 0.9 / Math.max(1, r) || sp > 1 - 0.9 / Math.max(1, r));
        if (onSpoke) for (const x of [WX - 3, WX + 3]) wheel.set(x, AY + dy, AZ + dz, B.log);
        if (r < 2.2) for (let x = WX - 4; x <= WX + 4; x++) wheel.set(x, AY + dy, AZ + dz, r < 1.2 ? B.ironDk : B.iron);
      }
      for (let k = 0; k < 16; k++) {
        const a = k / 16 * Math.PI * 2;
        for (let rr = WR - 3; rr <= WR + 1.5; rr += 0.5) { const dy = Math.round(Math.sin(a) * rr), dz = Math.round(Math.cos(a) * rr); for (let x = WX - 2; x <= WX + 2; x++) wheel.set(x, AY + dy, AZ + dz, rr > WR ? B.log : B.cart); }
      }
      // 수문(부품): 물레 위쪽 물길을 가로지르는 널판
      const SGZ = 42;
      for (const x of [CHX0 - 1, CHX1 + 1]) w.box(x, G + 1, SGZ, x, G + 10, SGZ, B.log);
      w.box(CHX0 - 1, G + 10, SGZ, CHX1 + 1, G + 11, SGZ, B.log);
      const sluice = w.prop({ name: 'sluice', pivot: [106.5, G + 1, SGZ + 0.5] });
      for (let x = CHX0; x <= CHX1; x++) for (let y = G - 7; y <= G + 2; y++) sluice.set(x, y, SGZ, y === G + 2 || x % 3 === 0 ? B.wood : B.cart);
      sluice.box(106, G + 3, SGZ, 107, G + 8, SGZ, B.iron); sluice.box(105, G + 9, SGZ, 108, G + 9, SGZ, B.iron);
      // 안쪽 굴대 끝과 톱니바퀴(이 박힌 테, 바퀴살, 쇠 바퀴통), 굴대 받침
      for (const [dy, dz] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) S(87, AY + dy, AZ + dz, B.log);
      const gear = w.prop({ name: 'gear', pivot: [88.5, AY + 0.5, AZ + 0.5], axis: 'x', speed: 0.35 });
      for (const x of [88, 89]) {
        MH.ringProp(gear, x, AY, AZ, 4, 'yz', B.cart, B.iron, 12);
        for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; gear.set(x, AY + Math.round(Math.sin(a) * 5), AZ + Math.round(Math.cos(a) * 5), B.wood); }
        for (let r = 1; r <= 3; r++) for (const [dy, dz] of [[r, 0], [-r, 0], [0, r], [0, -r]]) gear.set(x, AY + dy, AZ + dz, B.log);
        gear.set(x, AY, AZ, B.ironDk);
      }
      for (const z of [AZ - 7, AZ + 7]) { w.box(90, G + 1, z, 91, AY + 2, z, B.log); }
      w.box(90, AY + 2, AZ - 7, 91, AY + 3, AZ + 7, B.log);
      // 맷돌 받침(나무 틀), 아래돌, 위돌(부품), 깔때기와 신, 밀가루 홈과 통
      const MX = 76, MZ = 60;
      w.box(MX - 6, G + 1, MZ - 6, MX + 6, G + 6, MZ + 6, B.cart);
      for (let y = G + 1; y <= G + 5; y++) for (const [x, z] of [[MX - 6, MZ - 6], [MX + 6, MZ - 6], [MX - 6, MZ + 6], [MX + 6, MZ + 6]]) S(x, y, z, B.log);
      for (let x = MX - 6; x <= MX + 6; x++) for (const z of [MZ - 6, MZ + 6]) S(x, G + 3, z, B.log);
      for (let z = MZ - 6; z <= MZ + 6; z++) for (const x of [MX - 6, MX + 6]) S(x, G + 3, z, B.log);
      for (let z = MZ - 6; z <= MZ + 6; z++) for (let x = MX - 6; x <= MX + 6; x++) S(x, G + 6, z, (x >> 1) & 1 ? B.boards : B.boards2);
      w.box(MX + 7, AY, MZ, 87, AY, MZ, B.log); w.box(84, G + 1, MZ, 84, AY - 1, MZ, B.log);
      w.cyl(MX, MZ, G + 7, G + 8, 5.2, B.stoneD); w.cyl(MX, MZ, G + 7, G + 7, 5.6, B.stoneD);
      const runner = w.prop({ name: 'runner', pivot: [MX + 0.5, G + 9, MZ + 0.5], axis: 'y' });
      for (let y = G + 9; y <= G + 10; y++) for (let dz = -6; dz <= 6; dz++) for (let dx = -6; dx <= 6; dx++) {
        const r = Math.hypot(dx, dz); if (r > 5.2) continue;
        const groove = y === G + 10 && r > 1.6 && ((Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 6))) % 2 === 0) && ((Math.atan2(dz, dx) * 6 / Math.PI + 12) % 1) < 0.25;
        runner.set(MX + dx, y, MZ + dz, r < 1.3 ? (y === G + 10 ? 0 : B.iron) : groove ? B.stoneD : (r > 4.6 ? B.stoneD : B.stone));
      }
      runner.box(MX - 2, G + 11, MZ, MX + 2, G + 11, MZ, B.iron);
      for (const [x, z] of [[MX - 4, MZ - 4], [MX + 4, MZ - 4]]) w.box(x, G + 11, z, x, G + 19, z, B.log);
      w.box(MX - 4, G + 20, MZ - 4, MX + 4, G + 20, MZ - 4, B.log);
      for (let y = G + 14; y <= G + 19; y++) { const r = 1 + (y - G - 14) * 0.5, R = Math.ceil(r); for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) { const edge = Math.abs(dx) === R || Math.abs(dz) === R; if (edge || y === G + 14) S(MX + dx, y, MZ + dz, edge && (Math.abs(dx) === R && Math.abs(dz) === R) ? B.crateEdge : B.crate); else if (y >= G + 18) S(MX + dx, y, MZ + dz, B.wheat); } }
      w.box(MX - 1, G + 12, MZ - 1, MX + 1, G + 13, MZ - 1, B.cart); S(MX, G + 12, MZ, B.wood);
      for (let k = 0; k < 4; k++) S(MX, G + 6 - (k >> 1), MZ + 7 + k, B.cart);
      for (let k = 0; k < 4; k++) S(MX, G + 7 - (k >> 1), MZ + 6 + k, 0);
      S(MX, G + 7, MZ + 6, B.cart);
      crate(MX - 3, G + 1, MZ + 10, 7, 3, 5); w.box(MX - 2, G + 3, MZ + 11, MX + 2, G + 3, MZ + 13, B.flour);
      landmarks.push({ name: '맷돌방', note: '물레 굴대 · 톱니바퀴 · 맷돌', p: [82, G + 28, 60] });
      landmarks.push({ name: '물레', note: '물길을 받아 도는 바깥 물레', p: [WX + 0.5, AY + 22, AZ + 0.5] });

      // 밀가루 체: 체 받침 다리, 흔드는 체(부품), 아래 밀가루 통
      const SX = 84, SZ = 76;
      crate(SX - 2, G + 1, SZ, 8, 3, 6); w.box(SX - 1, G + 3, SZ + 1, SX + 4, G + 3, SZ + 4, B.flour);
      for (const [x, z] of [[SX - 3, SZ - 1], [SX + 6, SZ - 1], [SX - 3, SZ + 6], [SX + 6, SZ + 6]]) w.box(x, G + 1, z, x, G + 6, z, B.wood);
      const sieve = w.prop({ name: 'sieve', pivot: [SX + 2, G + 7, SZ + 2.5] });
      sieve.walls(SX - 1, G + 6, SZ + 1, SX + 4, G + 7, SZ + 4, B.cart); sieve.box(SX, G + 6, SZ + 2, SX + 3, G + 6, SZ + 3, B.rope);
      sieve.box(SX + 1, G + 7, SZ - 1, SX + 2, G + 7, SZ, B.wood); sieve.box(SX + 1, G + 7, SZ + 5, SX + 2, G + 7, SZ + 6, B.wood);
      // 맷돌방 밀가루 포대 더미
      for (const [x, z, st] of [[88, 80, 0], [88, 80, 1], [91, 80, 0], [89, 83, 0], [91, 72, 0], [91, 68, 0], [91, 68, 1]]) sack(w, x, G + 1 + st * 3, z, (x + z + st) % 2 ? B.sack : B.sack2);

      // ── 곡물 다락: 북쪽 벽을 따라 z 37..51, 서쪽 계단으로 오른다 ──
      const LX0 = 48;
      for (let z = Z0 + 1; z <= 51; z++) for (let x = LX0; x <= X1 - 1; x++) S(x, LY, z, (x >> 1) & 1 ? B.boards : B.boards2);
      for (const x of [LX0, 60, 72, 84, X1 - 2]) w.box(x, G + 1, 50, x + 1, LY - 1, 51, B.log);
      w.box(LX0, LY - 2, 50, X1 - 1, LY - 1, 51, B.log);
      for (let x = LX0 + 8; x <= X1 - 1; x++) { if (x >= 62 && x <= 66) continue; S(x, LY + 4, 51, B.wood); if (x % 4 === 0) w.box(x, LY + 1, 51, x, LY + 3, 51, B.wood); }
      // 계단(14단): 부엌과 맷돌방 사이에서 북쪽으로 올라 다락 서쪽 끝에 닿는다
      for (let k = 1; k <= 14; k++) { const z = 66 - k; w.box(LX0, G + 1, z, LX0 + 5, G + k, z, k % 2 ? B.boards : B.cart); S(LX0 + 6, G + k + 3, z, B.wood); }
      for (let k = 1; k <= 14; k += 3) w.box(LX0 + 6, G + k, 66 - k, LX0 + 6, G + k + 2, 66 - k, B.wood);
      for (let y = G + 1; y <= G + 4; y++) S(LX0 + 6, y, 65, B.log);
      // 다락 위 밀 포대(층층이)와 곡물 상자
      for (let z of [38, 42, 46]) for (let x = 56; x <= 90; x += 3) {
        if (x >= 65 && x <= 71) continue;
        const n = 1 + ((hash3(x, 3, z) * 2.4) | 0) - (z === 46 ? 1 : 0);
        for (let k = 0; k < n; k++) sack(w, x, LY + 1 + k * 3, z, (x + z + k) % 2 ? B.sack : B.sack2);
      }
      crate(66, LY + 1, 38, 5, 5, 6); w.box(67, LY + 5, 39, 69, LY + 5, 42, B.wheat);
      // 포대 도르래: 다락 앞 들보 끝에서 밧줄로 포대를 내린다(부품)
      const HPX = 64, HPZ = 54, HPY = TOP - 2;
      w.box(HPX - 1, HPY, Z0 + 1, HPX, HPY + 1, HPZ, B.log); w.box(HPX - 1, HPY - 1, HPZ, HPX, HPY - 1, HPZ, B.iron); S(HPX, HPY - 2, HPZ, B.ironDk);
      for (let k = 0; k < 5; k++) w.box(HPX - 1, HPY - 1 - k, Z0 + 1 + k, HPX, HPY - 1 - k, Z0 + 1 + k, B.log);
      const RL = HPY - 3 - (LY + 6) + 1;
      MH.rope(w, 'hrope', HPX, HPY - 3, HPZ, RL, B.rope);
      const hsack = w.prop({ name: 'hsack', pivot: [HPX + 0.5, LY + 1, HPZ + 0.5] });
      sack(hsack, HPX - 1, LY + 1, HPZ - 1, B.sack);
      crate(HPX - 3, G + 1, HPZ - 3, 7, 2, 7); sack(w, HPX + 5, G + 1, HPZ - 1, B.sack2);
      // 다락 아래: 밀 통과 포대
      for (const x of [58, 66]) barrel(x, G + 1, 42, 6, B.wheat);
      for (const [x, z, st] of [[74, 38, 0], [77, 38, 0], [74, 42, 0], [80, 38, 0], [82, 42, 0], [75, 38, 1]]) sack(w, x, G + 1 + st * 3, z, (x + st) % 2 ? B.sack : B.sack2);

      // ── 부엌(서쪽): 벽돌 빵 화덕과 굴뚝, 반죽 통, 빵 탁자, 선반 ──
      const OX = 40, OZ = 42;
      w.box(OX - 6, G + 1, OZ - 6, OX + 6, G + 2, OZ + 6, B.brickD);
      w.ellipsoid(OX, G + 3, OZ, 6, 7, 5.4, B.brick, (dx, dy) => dy >= 0);
      w.ellipsoid(OX, G + 3, OZ, 4.2, 5, 3.6, 0, (dx, dy) => dy >= 0);
      w.box(OX - 2, G + 3, OZ + 2, OX + 2, G + 6, OZ + 6, 0); w.box(OX - 3, G + 7, OZ + 5, OX + 3, G + 7, OZ + 6, B.brickD); for (const x of [OX - 3, OX + 3]) w.box(x, G + 3, OZ + 5, x, G + 6, OZ + 6, B.brickD);
      w.box(OX - 3, G + 3, OZ - 3, OX + 3, G + 3, OZ - 2, B.coal); w.box(OX - 2, G + 4, OZ - 3, OX + 2, G + 5, OZ - 3, B.fire); S(OX - 1, G + 6, OZ - 3, B.fire2); S(OX + 1, G + 5, OZ - 2, B.fire2); S(OX, G + 4, OZ - 2, B.fire2);
      w.box(OX - 2, G + 10, Z0 + 1, OX + 2, TOP + 4, Z0 + 4, B.brickD); w.box(OX - 1, TOP + 4, Z0 + 2, OX + 1, TOP + 4, Z0 + 3, 0);
      lights.push({ name: 'oven', p: [OX + 0.5, G + 5, OZ + 4.5], c: '#ff9a3a', i: 1.1, d: 32, flicker: 0.3, srcR: 6 });
      const peel = w.prop({ name: 'peel', pivot: [OX + 0.5, G + 4, OZ + 3] });
      peel.box(OX - 1, G + 3, OZ - 1, OX + 1, G + 3, OZ + 2, B.cart); peel.box(OX - 1, G + 4, OZ - 1, OX, G + 5, OZ, B.bread); peel.box(OX, G + 4, OZ + 1, OX + 1, G + 4, OZ + 2, B.breadL); peel.set(OX, G + 5, OZ + 1, B.breadL);
      peel.box(OX, G + 4, OZ + 3, OX, G + 4, OZ + 9, B.wood);
      // 반죽 통(부품: 반죽이 부푼다)
      w.box(34, G + 1, 60, 38, G + 4, 68, B.cart); w.box(35, G + 3, 61, 37, G + 4, 67, 0); for (const z of [60, 64, 68]) w.box(34, G + 4, z, 38, G + 4, z, B.wood);
      for (const z of [60, 68]) w.box(34, G + 5, z, 34, G + 6, z, B.wood);
      const dough = w.prop({ name: 'dough', pivot: [36.5, G + 3, 64.5] }); dough.box(35, G + 3, 61, 37, G + 3, 63, B.dough); dough.box(35, G + 3, 65, 37, G + 3, 67, B.dough); dough.set(36, G + 4, 62, B.dough); dough.set(36, G + 4, 66, B.dough);
      // 빵 탁자: 체크 보, 빵 덩이, 밀가루 단지, 둘레 의자
      for (const [x, z] of [[42, 72], [50, 72], [42, 80], [50, 80]]) w.box(x, G + 1, z, x, G + 5, z, B.wood);
      w.box(42, G + 6, 72, 50, G + 6, 80, B.check);
      for (const [x, z, b] of [[44, 74, B.bread], [47, 74, B.breadL], [48, 77, B.bread], [43, 78, B.breadL]]) { w.box(x, G + 7, z, x + 1, G + 7, z + 1, b); S(x, G + 8, z, b === B.bread ? B.breadL : B.bread); }
      w.box(48, G + 7, 79, 48, G + 9, 79, B.pot); w.box(45, G + 7, 77, 46, G + 8, 77, B.flour); S(46, G + 9, 77, B.cloth);
      for (const [x, z] of [[39, 75], [52, 75], [45, 69], [45, 82]]) { w.box(x, G + 1, z, x, G + 3, z, B.wood); w.box(x + 1, G + 1, z + 1, x + 1, G + 3, z + 1, B.wood); w.box(x, G + 4, z, x + 1, G + 4, z + 1, B.boards); }
      // 서쪽 벽 선반: 단지, 빵, 말린 허브
      for (const y of [G + 8, G + 14]) { w.box(X0 + 1, y, 72, X0 + 2, y, 83, B.cart); for (let z = 72; z <= 83; z += 2) { const it = [B.jar, B.pot, B.bread, B.jar, B.flour, B.pot][((z >> 1) + y) % 6]; S(X0 + 1, y + 1, z, it); if (it === B.jar || it === B.pot) S(X0 + 1, y + 2, z, it === B.jar ? B.wood : it); } }
      for (let z = 54; z <= 66; z += 4) { S(X0 + 1, G + 16, z, B.rope); w.box(X0 + 1, G + 13, z, X0 + 1, G + 15, z, (z >> 2) % 2 ? B.herb : B.herb2); S(X0 + 1, G + 12, z, B.herb); }
      crate(X0 + 1, G + 1, 48, 5, 4, 5);
      for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) S(X0 + 3 + dx, G + 5, 50 + dz, (Math.abs(dx) + Math.abs(dz)) % 2 ? B.pumpkin : B.pumpkin2);
      S(X0 + 3, G + 6, 50, B.pumpkin); S(X0 + 3, G + 7, 50, B.stem); S(X0 + 1, G + 5, 52, B.apple); S(X0 + 2, G + 5, 52, B.apple);
      // 부엌 등
      w.box(52, G + 1, 70, 52, G + 11, 70, B.log); S(52, G + 12, 70, B.wood); S(52, G + 12, 71, B.wood); S(52, G + 11, 71, B.iron); w.box(52, G + 9, 71, 52, G + 10, 71, B.lamp);
      lights.push({ name: 'kitchen', p: [52.5, G + 10, 72], c: '#ffd890', i: 0.6, d: 28, flicker: 0.12, srcR: 4 });
      landmarks.push({ name: '방앗간 부엌', note: '빵 화덕 · 반죽 통 · 햇밀 빵', p: [42, G + 28, 60] });
      landmarks.push({ name: '곡물 다락', note: '밀 포대 · 포대 도르래', p: [74, LY + 20, 44] });

      // 맷돌방 등과 문간 등
      S(88, G + 11, 52, B.lamp); S(88, G + 12, 52, B.iron); S(88, G + 12, 51, B.iron);
      lights.push({ name: 'millroom', p: [88.5, G + 11, 53], c: '#ffd890', i: 0.6, d: 32, flicker: 0.1, srcR: 4 });
      lights.push({ name: 'flour', p: [MX + 0.5, G + 12, MZ + 0.5], c: '#fff4e0', i: 0, d: 24, flicker: 0, srcR: 6 });
      S(MX + 4, G + 12, MZ - 4, B.lamp);
      lights.push({ name: 'porch', p: [DX0 - 1.5, G + 12, Z1 + 1], c: '#ffd890', i: 0.6, d: 20, flicker: 0.1, night: true });

      // ───── 상호작용 ─────
      acts.push(OR.goAct({ at: [DX0 + 2, G + 1, Z1], h: 10, name: '밖으로 나가기', goto: 'harvest', hint: '문을 나서 연못가 물길 옆 황금들녘으로 돌아가요', hit: [DX0, G + 1, Z1, DX1, G + 10, Z1] }));
      acts.push({
        name: '수문 열기', hint: '수문 널판을 들어 올리면 물살이 쏟아져 물레와 톱니바퀴가 힘차게 돌아요', hit: [CHX0 - 1, G + 1, SGZ - 2, CHX1 + 1, G + 11, SGZ + 2],
        run: async a => {
          await a.move('sluice', [0, 8, 0], 1);
          const sp = Promise.all([a.spin('waterwheel', 6, 4.5), a.spin('gear', 6, 4.5)]);
          for (let k = 0; k < 9; k++) {
            a.burst([106.5, G + 1, SGZ + 3], { n: 18, colors: ['#ffffff', '#d8f0ff', '#a8d0c0'], speed: 5, up: 3, life: 0.8, gravity: 12, spread: 3.2 });
            if (k % 2) a.burst([WX + 0.5, G, AZ + 0.5 + (k % 4 === 1 ? 8 : -8)], { n: 16, colors: ['#ffffff', '#d8f0ff'], speed: 6, up: 8, life: 0.9, gravity: 18, spread: 2.4 });
            await a.wait(0.45);
          }
          await sp; await a.move('sluice', [0, 0, 0], 1.2);
        },
      });
      acts.push({
        name: '맷돌 돌리기', hint: '위 맷돌이 드르륵 돌며 햇밀을 빻고, 홈을 타고 하얀 밀가루가 흘러내려요', hit: [MX - 6, G + 1, MZ - 6, MX + 6, G + 19, MZ + 6],
        run: async a => {
          const sp = a.spin('runner', 1, 4.2);
          a.flash('flour', 3, 4);
          for (let k = 0; k < 10; k++) {
            a.burst([MX + 0.5, G + 19, MZ + 0.5], { n: 8, colors: ['#e0bc50', '#f0d070'], speed: 0.6, up: -2, life: 0.6, gravity: 12, spread: 0.6 });
            a.burst([MX + 0.5, G + 5.5, MZ + 11], { n: 14, colors: ['#ffffff', '#f8f4ea', '#f0e8d0'], speed: 2, up: 2, life: 1.6, gravity: 1.2, spread: 1.6 });
            await a.wait(0.4);
          }
          await sp;
        },
      });
      acts.push({
        name: '밀가루 체질', hint: '체를 탈탈 흔들 때마다 고운 밀가루가 눈처럼 통 안으로 내려앉아요', hit: [SX - 3, G + 1, SZ - 1, SX + 6, G + 8, SZ + 6],
        run: async a => {
          for (let k = 0; k < 6; k++) {
            await a.move('sieve', [k % 2 ? 1.8 : -1.8, 0.4, 0], 0.16);
            a.burst([SX + 2, G + 5.5, SZ + 2.5], { n: 16, colors: ['#ffffff', '#f8f4ea'], speed: 1.2, up: 0.4, life: 1.4, gravity: 2.4, spread: 1.6 });
            a.burst([SX + 2, G + 9, SZ + 2.5], { n: 8, colors: ['#ffffff', '#f0e8d0'], speed: 1.6, up: 2, life: 1.6, gravity: -0.4, spread: 2 });
          }
          await a.move('sieve', [0, 0, 0], 0.2);
          await a.move('sieve', [0, 3.6, 0], 0.3); await a.move('sieve', [0, 0, 0], 0.3);
        },
      });
      acts.push({
        name: '햇밀 빵 굽기', hint: '화덕 불이 확 일고, 나무 삽에 올린 노릇노릇한 햇밀 빵이 김을 내며 나와요', hit: [OX - 6, G + 1, OZ - 6, OX + 6, G + 10, OZ + 9],
        run: async a => {
          a.flash('oven', 4, 2.5); a.glow(1.3, 2.5);
          for (let k = 0; k < 4; k++) { a.burst([OX + 0.5, G + 6, OZ + 7], { n: 14, colors: ['#ff9a3a', '#ffd060', '#ffffff'], speed: 3, up: 4, life: 0.8, gravity: -1, spread: 1.2 }); await a.wait(0.3); }
          await a.move('peel', [0, 0, 8], 1.1);
          for (let k = 0; k < 6; k++) { a.burst([OX + 0.5, G + 7, OZ + 9], { n: 8, colors: ['#ffffff', '#f0e8d8'], speed: 0.8, up: 2.8, life: 1.6, gravity: -0.8, spread: 0.8 }); await a.wait(0.35); }
          await a.move('peel', [0, 0, 0], 1);
        },
      });
      acts.push({
        name: '다락 포대 내리기', hint: '도르래 밧줄이 풀리며 곡물 다락의 밀 포대가 아래층 맷돌방으로 스르르 내려와요', hit: [HPX - 3, G + 1, HPZ - 3, HPX + 3, LY + 5, HPZ + 3],
        run: async a => {
          const dn = LY - G - 2;
          await Promise.all([a.move('hsack', [0, -dn, 0], 2.4), a.rope('hrope', RL, RL + dn, 2.4)]);
          a.burst([HPX + 0.5, G + 3.5, HPZ + 0.5], { n: 18, colors: ['#f8f4ea', '#d8c8a0'], speed: 3.2, up: 1.2, life: 0.8, gravity: 4, spread: 1.6, flat: true });
          await a.wait(1.2);
          await Promise.all([a.move('hsack', [0, 0, 0], 2), a.rope('hrope', RL, RL, 2)]);
        },
      });
      acts.push({
        name: '반죽 통', hint: '반죽 통 속 햇밀 반죽이 몽글몽글 부풀어 올라 통 밖으로 넘칠 듯해요', hit: [34, G + 1, 60, 38, G + 6, 68],
        run: async a => {
          await a.tween('dough', { scl: [1.6, 4, 1.15] }, 2);
          for (let k = 0; k < 4; k++) { a.burst([36.5, G + 8, 64.5], { n: 10, colors: ['#f0e2c4', '#ffffff'], speed: 1.2, up: 2, life: 1, gravity: 1.2, spread: 1.2 }); await a.wait(0.3); }
          await a.tween('dough', { scl: [1, 1, 1] }, 1.2);
          a.burst([36.5, G + 5, 64.5], { n: 16, colors: ['#ffffff', '#f8f4ea'], speed: 2.8, up: 2.8, life: 1.2, gravity: 2, spread: 2 });
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
