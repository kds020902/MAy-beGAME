// 돌망치 주점(하위 지도) — 무쇠골 드워프들의 2층 돌집 주점 안. 남쪽 청동 문으로 들어서면 긴 돌탁자 두 줄의 홀,
// 북쪽에 흑맥주 통을 눕힌 바와 큰 술통, 북서쪽 벽난로와 도끼 장식 벽, 서쪽 회랑 위 2층 숙소(계단). 남·동쪽 벽은 잘라 낮췄다
// (128칸, 고해상도 2배 · 1칸 ≈ 25cm: 둥글게 누운 술통과 쇠테, 손잡이 달린 술잔, 날 선 도끼와 둥근 방패, 난간 동자, 한 칸씩 오르는 계단)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 128, D = 128, Hh = 96, G = 20;
  MAPS.push({
    id: 'ironhollow-tavern', cat: 'village', sub: true, parent: 'ironhollow', name: '돌망치 주점', en: 'Ironhollow · The Stonehammer Tavern', color: '#8a5a30', seed: 1272, base: G, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '흑맥주가 끊이지 않는 무쇠골의 주점. 긴 돌탁자 위로 술잔이 부딪히고, 바 뒤에는 흑맥주 통이 겹겹이 누워 있으며 구석의 큰 술통 꼭지에서는 거품이 넘친다. 벽난로 위 도끼 장식 벽 아래에서 드워프 노래가 울리고, 계단 위 회랑에는 광부들이 묵어 가는 숙소가 있다.',
    info: { title: '장소 정보', en: 'STONEHAMMER TAVERN', rows: [['홀', '긴 돌탁자 두 줄 · 팔씨름 탁자'], ['바', '흑맥주 통 · 큰 술통 · 술잔 선반'], ['2층', '회랑의 숙소 세 칸']] },
    sky: ['#3a2418', '#171014', '#ff8a40'], stars: false,
    hemi: ['#ffd8b0', '#2a1e18', 0.6], sun: ['#ffc890', 0.6, [0.4, 1, 0.6]],
    day: { sky: ['#e8c8a0', '#a8765a', '#ffe0b0'], stars: false, hemi: ['#fff0e0', '#4a3a30', 0.62], sun: ['#ffe8d0', 0.72, [0.4, 1, 0.6]], haze: '#c89060' },
    fog: { start: 0.92, floor: G - 28, depth: 12, haze: [12, 0.14, 12], hazeColor: '#5a3424' },
    camY: 4, zoom: 1.75,
    particles: [
      { n: 60, colors: ['#ffb04a', '#ff6a2a', '#ffe08a'], mode: 'rise', speed: 1.6, area: [55, 39, 4], y0: G + 6, y1: G + 40 },
      { n: 70, colors: ['#c8b8a8', '#a89888', '#e8dcc8'], mode: 'drift', speed: 0.24, wind: 0.2, area: [68, 64, 32], y0: G + 2, y1: G + 22, glow: false },
    ],
    blocks: {
      gravel: { c: '#5a504a', top: '#7a7068', v: 0.12 }, rock: { c: '#5a504a', top: '#6a605a', v: 0.1, pat: 'stone' },
      pave: { c: '#6a625a', top: '#847a70', v: 0.06 }, pave2: { c: '#6a625a', top: '#7a7066', v: 0.06 }, paveJ: { c: '#4e4842', top: '#5a524a', v: 0.04 },
      floorP: { c: '#5a3a24', top: '#7a5434', v: 0.05 }, floorP2: { c: '#5a3a24', top: '#6e4a2e', v: 0.05 }, floorJ: { c: '#3e2818', top: '#4a301e', v: 0.03 },
      floorS: { c: '#5e564e', top: '#6e665e', v: 0.05 }, floorSJ: { c: '#433c36', top: '#4a423c', v: 0.03 },
      granite: { c: '#8a8078', v: 0.05 }, graniteDk: { c: '#5e564e', v: 0.05 }, basalt: { c: '#2e2826', v: 0.06 }, slate: { c: '#3a3a44', v: 0.04 },
      gr1: { c: '#8a8078', v: 0.04 }, gr2: { c: '#7c736b', v: 0.04 }, gr3: { c: '#968c82', v: 0.04 }, grJ: { c: '#4a433d', v: 0.03 }, cap: { c: '#a49a8e', v: 0.04 },
      bronze: { c: '#c08a3a', v: 0.06 }, gold: { c: '#e8c040', v: 0.08 }, iron: { c: '#3a3a40', v: 0.03 }, steel: { c: '#8a8e96', v: 0.03 }, steelLt: { c: '#b4b8c0', v: 0.02 },
      timber: { c: '#6a4428', v: 0.06, pat: 'log' }, timberDk: { c: '#4e321e', v: 0.05 }, plank: { c: '#7a5434', v: 0.08, pat: 'plank' },
      barrel: { c: '#8a5a30', v: 0.05 }, barrelD: { c: '#6a4224', v: 0.05 }, caskTop: { c: '#5a3820', v: 0.04 }, hoop: { c: '#3a3a40', v: 0.03 },
      stout: { c: '#2a1a12', v: 0.03 }, foam: { c: '#f4ecd8', v: 0.03 }, mug: { c: '#a8a098', v: 0.04 }, mugB: { c: '#c08a3a', v: 0.05 },
      win: { c: '#ffb050', night: true, day: '#5a4a3a' }, ember: { c: '#ff7a2a', glow: true }, fire: { c: '#ff9a3a', glow: true }, fireY: { c: '#ffe090', glow: true }, candle: { c: '#ffd890', glow: true },
      rug: { c: '#8a2a2a', v: 0.03 }, rug2: { c: '#6a2424', v: 0.03 }, rugB: { c: '#c8a050', v: 0.03 },
      blanket: { c: '#3a5a8a', v: 0.04 }, blanket2: { c: '#7a3a3a', v: 0.04 }, linen: { c: '#e8dcc8', v: 0.03 }, leather: { c: '#6a3a24', v: 0.05 }, leather2: { c: '#542c1a', v: 0.05 },
      bread: { c: '#c8843a', v: 0.06 }, meat: { c: '#8a3a2a', v: 0.05 }, cheese: { c: '#e8c060', v: 0.05 }, coal: { c: '#141010', v: 0.04 },
    },
    build(w) {
      const B = w.id;
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const X0 = 26, X1 = 101, Z0 = 34, Z1 = 89, TOP = G + 26, LY = G + 14;   // 벽 두께 2칸, LY = 회랑 마루 윗면 칸
      const DX0 = 60, DX1 = 65;                                              // 남쪽 청동 문(폭 6 · 높이 8)
      const GX1 = 43;                                                        // 서쪽 회랑(2층 숙소) 동쪽 끝
      const inR = (x, z) => x > X0 + 1 && x < X1 - 1 && z > Z0 + 1 && z < Z1 - 1;
      MH.terrain(w, { floor: G - 12, height: () => G, surface: (x, z) => hash3(x >> 1, 1, z >> 1) > 0.8 ? B.rock : B.gravel, under: () => B.rock });
      const lights = [], acts = [], landmarks = [];
      const GR = [B.gr1, B.gr2, B.gr3, B.gr1, B.gr2, B.gr3];
      const ash = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return B.grJ;
        return GR[(hash3(Math.floor(uu / 6), c, salt) * 6) | 0];
      };
      // 손잡이 달린 술잔(2×2, 높이 2) + 거품
      const mugAt = (T, x, y, z, b, foam) => { T.set(x, y, z, b); T.set(x + 1, y, z, b); T.set(x, y, z + 1, b); T.set(x + 1, y, z + 1, b); T.set(x, y + 1, z, b); T.set(x + 1, y + 1, z, b); T.set(x, y + 1, z + 1, foam ? B.foam : b); T.set(x + 1, y + 1, z + 1, b); T.set(x + 2, y + 1, z, B.iron); T.set(x + 2, y, z, B.iron); if (foam) { T.set(x, y + 2, z, B.foam); T.set(x + 1, y + 2, z + 1, B.foam); } };

      // ── 바닥: 널마루(판자 이음 엇갈림), 바 뒤와 벽난로 앞은 돌판, 문 앞 바깥은 포장길 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        const stone = (z <= 47 && x >= 66) || (z <= 43 && x >= 46 && x <= 63);
        if (stone) { S(x, G, z, ((z & 3) === 3 || (x + ((z >> 2) & 1) * 2) % 4 === 3) ? B.floorSJ : B.floorS); continue; }
        const board = z >> 1, seam = ((x + (board % 3) * 5) % 14) === 13;
        S(x, G, z, seam ? B.floorJ : ((board & 1) ? B.floorP : B.floorP2));
      }
      for (let z = Z1 + 1; z < D - 8; z++) for (let x = DX0 - 4; x <= DX1 + 4; x++) S(x, G, z, (z % 3 === 2 || (x + ((z / 3 | 0) & 1) * 2) % 4 === 3) ? B.paveJ : (hash3(x >> 2, z, 9) > 0.5 ? B.pave : B.pave2));

      // ── 벽: 북·서는 높고(낱돌, 나무 띠, 불빛 창), 동·남은 낮게 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (inR(x, z)) continue;
        const low = x >= X1 - 1 || z >= Z1 - 1, corner = (x <= X0 + 1 || x >= X1 - 1) && (z <= Z0 + 1 || z >= Z1 - 1);
        const a = (x <= X0 + 1 || x >= X1 - 1) ? z : x;
        if (low) {
          const post = corner || a % 10 < 2;
          for (let y = G + 1; y <= G + 4; y++) S(x, y, z, post ? B.graniteDk : ash(a, y, 7));
          if (post) { S(x, G + 5, z, B.graniteDk); S(x, G + 6, z, B.timber); } else S(x, G + 5, z, B.cap);
          continue;
        }
        for (let y = G + 1; y <= TOP; y++) S(x, y, z, y <= G + 2 || corner || a % 12 < 2 ? B.graniteDk : (y === LY || y === LY - 1 || y === TOP ? B.timber : ash(a, y, 13)));
      }
      for (const x of [72, 84, 94]) { for (let y = G + 17; y <= G + 22; y++) for (let xx = x; xx <= x + 3; xx++) for (const z of [Z0, Z0 + 1]) S(xx, y, z, (y === G + 20 || xx === x + 1) ? B.iron : B.win); for (let xx = x - 1; xx <= x + 4; xx++) S(xx, G + 23, Z0 + 1, B.graniteDk); }
      for (const z of [44, 60, 76]) { for (let y = G + 17; y <= G + 22; y++) for (let zz = z; zz <= z + 3; zz++) for (const x of [X0, X0 + 1]) S(x, y, zz, (y === G + 20 || zz === z + 1) ? B.iron : B.win); for (let zz = z - 1; zz <= z + 4; zz++) S(X0 + 1, G + 23, zz, B.graniteDk); }
      // 남쪽 청동 문: 돌 문틀, 상인방과 금 이맛돌, 안으로 연 문짝
      for (let x = DX0; x <= DX1; x++) for (let y = G + 1; y <= G + 8; y++) for (const z of [Z1 - 1, Z1]) S(x, y, z, 0);
      for (const x of [DX0 - 2, DX0 - 1, DX1 + 1, DX1 + 2]) w.box(x, G + 1, Z1 - 1, x, G + 10, Z1, B.graniteDk);
      w.box(DX0 - 2, G + 9, Z1 - 1, DX1 + 2, G + 10, Z1, B.graniteDk); w.box(DX0 + 2, G + 9, Z1, DX1 - 2, G + 10, Z1, B.gold);
      for (let x = DX0; x <= DX1; x++) { S(x, G, Z1, B.floorS); S(x, G, Z1 - 1, B.floorS); }
      for (let y = G + 1; y <= G + 8; y++) for (let z = Z1 - 8; z <= Z1 - 2; z++) S(DX1 + 3, y, z, z === Z1 - 8 || y === G + 1 || y === G + 8 || y === G + 4 ? B.timberDk : B.bronze);
      S(DX1 + 4, G + 5, Z1 - 6, B.gold);
      S(57, G + 6, Z1 - 2, B.iron); S(57, G + 7, Z1 - 2, B.candle); S(57, G + 8, Z1 - 2, B.candle); S(57, G + 9, Z1 - 2, B.iron);

      // ── 벽난로(북서): 낱돌 아궁이, 장작불, 굴뚝, 위에 도끼 장식 벽, 앞에 깔개와 안락의자 ──
      const FX0 = 46, FX1 = 63;
      for (let y = G + 1; y <= G + 12; y++) for (let z = Z0 + 2; z <= Z0 + 7; z++) for (let x = FX0; x <= FX1; x++) S(x, y, z, ash(x + z, y, 21));
      w.box(FX0 + 4, G + 1, Z0 + 4, FX1 - 4, G + 8, Z0 + 7, 0);
      for (let x = FX0 + 3; x <= FX1 - 3; x++) S(x, G + 9, Z0 + 7, B.basalt);
      w.box(FX0 + 4, G + 1, Z0 + 4, FX1 - 4, G + 1, Z0 + 5, B.coal);
      for (const z of [Z0 + 4, Z0 + 5]) { w.box(FX0 + 5, G + 2, z, FX1 - 5, G + 2, z, B.timberDk); }
      const FIRE = [B.ember, B.fire, B.fireY, B.fire, B.ember];
      for (let k = 0; k < 5; k++) for (const z of [Z0 + 4, Z0 + 5]) { S(FX0 + 5 + 2 * k, G + 3, z, FIRE[k]); S(FX0 + 6 + 2 * k, G + 3, z, FIRE[k]); }
      for (const x of [52, 53, 56, 57]) { S(x, G + 4, Z0 + 4, B.fire); S(x, G + 5, Z0 + 4, x & 1 ? B.fireY : B.fire); }
      S(54, G + 4, Z0 + 4, B.fireY); S(55, G + 4, Z0 + 4, B.fireY); S(54, G + 6, Z0 + 4, B.fireY);
      w.box(FX0 - 1, G + 11, Z0 + 2, FX1 + 1, G + 12, Z0 + 9, B.timber);
      for (let x = FX0 - 1; x <= FX1 + 1; x += 4) S(x, G + 10, Z0 + 8, B.timberDk);
      w.box(FX0 + 4, G + 13, Z0 + 2, FX1 - 4, TOP + 8, Z0 + 5, B.graniteDk);
      for (let y = G + 13; y <= TOP + 8; y++) for (let x = FX0 + 4; x <= FX1 - 4; x++) S(x, y, Z0 + 5, ash(x, y, 23));
      w.box(FX0 + 6, TOP + 1, Z0 + 2, FX1 - 6, TOP + 8, Z0 + 3, 0); w.walls(FX0 + 3, TOP + 9, Z0 + 1, FX1 - 3, TOP + 9, Z0 + 6, B.cap);
      // 도끼 장식: 굴뚝 앞에 엇갈린 큰 도끼 둘(자루·날)과 둥근 방패
      const DZ = Z0 + 6;
      for (let k = 0; k <= 9; k++) { S(50 + k, G + 15 + k, DZ, B.timber); S(59 - k, G + 15 + k, DZ, B.timber); }
      for (const [x0, s] of [[59, 1], [50, -1]]) {
        for (let dy = 0; dy <= 4; dy++) for (let dx = 0; dx <= 2; dx++) if (!(dx === 2 && (dy === 0 || dy === 4))) S(x0 + s * (dx + 1), G + 22 + dy, DZ, dx === 2 ? B.steelLt : B.steel);
      }
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const r = Math.hypot(dx, dy); if (r > 3.3) continue; S(55 + dx, G + 18 + dy, DZ + 1, r > 2.4 ? B.iron : (r < 1 ? B.gold : ((dx + dy) & 1 ? B.bronze : B.gold))); }
      // 깔개(술 달린 테두리 무늬)와 안락의자 둘
      for (let z = Z0 + 10; z <= Z0 + 19; z++) for (let x = FX0; x <= FX1; x++) {
        const e = x === FX0 || x === FX1 || z === Z0 + 10 || z === Z0 + 19, e2 = x === FX0 + 1 || x === FX1 - 1 || z === Z0 + 11 || z === Z0 + 18;
        S(x, G, z, e ? B.rugB : e2 ? B.rug2 : (((x >> 1) + (z >> 1)) & 1 ? B.rug : B.rug2));
      }
      for (const x of [FX0 + 1, FX1 - 4]) {
        w.box(x, G + 1, Z0 + 13, x + 3, G + 3, Z0 + 17, B.leather); w.box(x, G + 4, Z0 + 16, x + 3, G + 8, Z0 + 17, B.leather2);
        for (const xx of [x, x + 3]) w.box(xx, G + 4, Z0 + 13, xx, G + 5, Z0 + 17, B.leather2);
        for (const xx of [x, x + 3]) for (const zz of [Z0 + 13, Z0 + 17]) S(xx, G + 1, zz, B.timberDk);
      }
      lights.push({ name: 'hearth', p: [55, G + 5, Z0 + 8], c: '#ff8a3a', i: 1.4, d: 44, flicker: 0.35, srcR: 6 });
      landmarks.push({ name: '벽난로', note: '도끼 장식 벽 · 안락의자', p: [54, G + 40, 40] });

      // ── 바: 낱돌 계산대와 판자 상판, 놋 발걸이, 뒤에 눕힌 흑맥주 통, 술잔 선반, 동쪽 큰 술통 ──
      const BZ = 48, BX0 = 66, BX1 = 89;
      for (let y = G + 1; y <= G + 4; y++) for (let z = BZ; z <= BZ + 1; z++) for (let x = BX0; x <= BX1; x++) S(x, y, z, ash(x, y, 31));
      w.box(BX0, G + 5, BZ - 1, BX1, G + 5, BZ + 2, B.plank); w.box(BX0, G + 6, BZ, BX1, G + 6, BZ + 1, B.plank);
      w.box(BX0 + 5, G + 2, BZ + 3, BX1, G + 2, BZ + 3, B.bronze); for (let x = BX0 + 6; x <= BX1; x += 6) S(x, G + 1, BZ + 3, B.iron);
      w.box(BX0, G + 1, BZ - 4, BX0 + 3, G + 6, BZ - 1, B.graniteDk);
      // 눕힌 흑맥주 통(둥근 단면, 쇠테 둘, 앞 마구리에 꼭지)
      for (const cx of [70, 76, 82]) {
        w.box(cx - 2, G + 1, Z0 + 3, cx + 2, G + 2, Z0 + 3, B.timberDk); w.box(cx - 2, G + 1, Z0 + 8, cx + 2, G + 2, Z0 + 8, B.timberDk);
        for (const cy of [G + 5, G + 10]) for (let z = Z0 + 2; z <= Z0 + 9; z++) for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
          const d2 = dx * dx + dy * dy; if (d2 > 7.3) continue;
          const outer = d2 > 3.3, endC = z === Z0 + 9;
          S(cx + dx, cy + dy, z, endC ? (outer ? B.barrelD : B.caskTop) : ((z === Z0 + 3 || z === Z0 + 8) && outer ? B.hoop : ((((Math.atan2(dy, dx) + 4) * 1.6) | 0) & 1 ? B.barrel : B.barrelD)));
        }
        for (const cy of [G + 5, G + 10]) { S(cx, cy, Z0 + 10, B.bronze); S(cx, cy - 1, Z0 + 10, B.bronze); }
      }
      for (const y of [G + 16, G + 21]) {
        w.box(68, y, Z0 + 2, 91, y, Z0 + 3, B.plank); for (let x = 70; x <= 90; x += 8) S(x, y - 1, Z0 + 2, B.timberDk);
        for (let x = 68; x <= 89; x += 4) if (((x + y) >> 2) & 1) mugAt(w, x, y + 1, Z0 + 2, (x >> 2) % 3 ? B.mug : B.mugB, false);
      }
      // 큰 술통(바 동쪽 끝): 세운 큰 통, 쇠테 셋, 뚜껑, 꼭지와 받침, 술잔(부품)과 거품(부품)
      const TX = 95, TZ = 43;
      for (let y = G + 1; y <= G + 16; y++) {
        const k = y - G, rr = 3.6 + Math.sin((k - 0.5) / 16 * Math.PI) * 0.8, R = Math.ceil(rr);
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          const d2 = dx * dx + dz * dz; if (d2 > rr * rr) continue;
          const outer = d2 > (rr - 1) * (rr - 1);
          S(TX + dx, y, TZ + dz, outer && (k === 3 || k === 4 || k === 9 || k === 10 || k === 15 || k === 16) ? B.hoop : ((((Math.atan2(dz, dx) + 4) * 2) | 0) & 1 ? B.barrelD : B.barrel));
        }
      }
      w.cyl(TX, TZ, G + 17, G + 17, 3.2, B.caskTop); S(TX, G + 18, TZ, B.timberDk);
      w.box(TX - 2, G + 8, TZ + 4, TX - 1, G + 8, TZ + 5, B.bronze); w.box(TX - 2, G + 7, TZ + 5, TX - 1, G + 7, TZ + 5, B.bronze); S(TX - 2, G + 9, TZ + 4, B.gold);
      w.box(TX - 5, G + 1, TZ + 6, TX + 2, G + 4, TZ + 9, B.graniteDk); w.box(TX - 5, G + 4, TZ + 6, TX + 2, G + 4, TZ + 9, B.cap);
      const tmug = w.prop({ name: 'tapmug', pivot: [TX - 1, G + 5, TZ + 7] });
      mugAt(tmug, TX - 2, G + 5, TZ + 6, B.mug, false);
      const foam = w.prop({ name: 'tapfoam', pivot: [TX - 1, G + 7, TZ + 9], scl0: [0, 0, 0] });
      foam.box(TX - 4, G + 5, TZ + 8, TX + 1, G + 5, TZ + 9, B.foam); foam.box(TX - 3, G + 6, TZ + 8, TX, G + 6, TZ + 9, B.foam); foam.box(TX - 2, G + 7, TZ + 8, TX - 1, G + 7, TZ + 9, B.foam);
      landmarks.push({ name: '흑맥주 바', note: '눕힌 통 · 큰 술통 · 술잔 선반', p: [82, G + 36, 40] });
      // 바 위 술잔(부품: 바 위를 미끄러진다)
      const slide = w.prop({ name: 'slidemug', pivot: [BX1 - 2, G + 7, BZ + 1] });
      mugAt(slide, BX1 - 3, G + 7, BZ, B.mug, true);
      mugAt(w, BX0, G + 7, BZ, B.mugB, true); S(BX0 + 1, G + 7, BZ - 3, B.iron); S(BX0 + 1, G + 8, BZ - 3, B.candle); S(BX0 + 1, G + 9, BZ - 3, B.candle);
      w.box(BX0 + 2, G + 7, BZ - 4, BX0 + 3, G + 7, BZ - 3, B.bread); w.box(BX0, G + 7, BZ - 4, BX0, G + 7, BZ - 3, B.cheese);
      S(77, G + 7, BZ, B.iron); S(77, G + 8, BZ, B.candle); S(77, G + 9, BZ, B.iron);
      lights.push({ name: 'bar', p: [78, G + 11, BZ + 1], c: '#ffc070', i: 0.6, d: 32, flicker: 0.15, srcR: 6 });

      // ── 홀: 긴 돌탁자 두 줄과 나무 걸상, 탁자 위 음식과 술잔(부품 넷 · 건배) ──
      const tables = [[54, 89, 58], [54, 89, 72]];
      for (const [x0, x1, z] of tables) {
        for (let x = x0; x <= x1; x++) for (let zz = z; zz <= z + 3; zz++) S(x, G + 4, zz, (x === x0 || x === x1 || zz === z || zz === z + 3) ? B.graniteDk : B.granite);
        for (const x of [x0 + 1, (x0 + x1) >> 1, x1 - 1]) w.box(x - 1, G + 1, z + 1, x, G + 3, z + 2, B.graniteDk);
        for (const zz of [z - 2, z + 5]) { w.box(x0, G + 2, zz, x1, G + 2, zz, B.timber); for (let x = x0 + 1; x <= x1 - 1; x += 6) S(x, G + 1, zz, B.timberDk); }
        for (let x = x0 + 2; x <= x1 - 2; x += 6) { const k = ((x + z) >> 1) % 4, b = [B.bread, B.meat, B.cheese, B.candle][k]; if (k === 3) { S(x, G + 5, z + 2, B.iron); S(x, G + 6, z + 2, B.candle); } else w.box(x, G + 5, z + 2, x + 1, G + 5, z + 3, b); }
      }
      const mugs = [];
      for (let k = 0; k < 4; k++) {
        const x = 62 + k * 6, z = 58 + (k % 2) * 2;
        for (let dx = 0; dx <= 2; dx++) for (let dz = 0; dz <= 1; dz++) for (let dy = 5; dy <= 7; dy++) S(x + dx, G + dy, z + dz, 0);
        const m = w.prop({ name: 'mug' + k, pivot: [x + 1, G + 5, z + 1] });
        mugAt(m, x, G + 5, z, k % 2 ? B.mugB : B.mug, true);
        mugs.push([x, z]);
      }
      S(72, G + 5, 60, B.iron); S(72, G + 6, 60, B.candle); S(68, G + 5, 74, B.iron); S(68, G + 6, 74, B.candle);
      lights.push({ name: 'tables', p: [72, G + 9, 66], c: '#ffc070', i: 0.5, d: 36, flicker: 0.15, srcR: 8 });

      // ── 팔씨름 탁자(동쪽): 둥근 돌 탁자(부품 상판)와 쇠 팔걸이, 걸상 둘 ──
      const AX = 92, AZ = 66;
      w.cyl(AX, AZ, G + 1, G + 3, 1.2, B.graniteDk); w.cyl(AX, AZ, G + 1, G + 1, 2.2, B.graniteDk);
      const arm = w.prop({ name: 'armtable', pivot: [AX + 0.5, G + 4, AZ + 0.5] });
      arm.cyl(AX, AZ, G + 4, G + 4, 3.2, B.granite); arm.ring(AX, AZ, G + 4, 2.4, 3.2, B.graniteDk);
      arm.box(AX - 2, G + 5, AZ, AX - 2, G + 6, AZ, B.iron); arm.box(AX + 2, G + 5, AZ, AX + 2, G + 6, AZ, B.iron);
      mugAt(arm, AX - 1, G + 5, AZ - 3, B.mugB, true); arm.set(AX, G + 5, AZ + 2, B.mug); arm.set(AX, G + 6, AZ + 2, B.foam);
      for (const x of [AX - 6, AX + 6]) { w.cyl(x, AZ, G + 1, G + 2, 1.2, B.timberDk); w.cyl(x, AZ, G + 3, G + 3, 1.5, B.timber); }
      landmarks.push({ name: '팔씨름 탁자', note: '쇠 팔걸이가 박힌 둥근 돌 탁자', p: [AX + 0.5, G + 20, AZ + 0.5] });

      // ── 노래 자리(벽난로 앞 동쪽): 북(부품)과 류트, 노래책 ──
      const DRX = 66, DRZ = 53;
      const drum = w.prop({ name: 'drum', pivot: [DRX + 0.5, G + 1, DRZ + 0.5] });
      for (let y = G + 1; y <= G + 4; y++) for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) { const d2 = dx * dx + dz * dz; if (d2 > 6.5) continue; drum.set(DRX + dx, y, DRZ + dz, y === G + 4 ? (d2 > 4.5 ? B.bronze : B.leather) : (d2 > 4.5 && ((dx + dz + y) & 1) ? B.rugB : B.barrel)); }
      drum.set(DRX + 3, G + 5, DRZ, B.timber); drum.set(DRX + 4, G + 6, DRZ, B.timber);
      w.box(60, G + 1, DRZ, 61, G + 4, DRZ + 1, B.bronze); S(60, G + 3, DRZ + 1, B.timberDk); w.box(61, G + 5, DRZ, 61, G + 10, DRZ, B.timber); S(61, G + 11, DRZ, B.timberDk); S(62, G + 11, DRZ, B.timberDk);
      w.box(58, G + 1, DRZ + 3, 60, G + 2, DRZ + 4, B.plank); S(59, G + 3, DRZ + 3, B.leather);

      // ── 서쪽 회랑: 1층은 칸막이 자리, 2층은 숙소 세 칸과 난간, 계단은 홀 서쪽에서 북쪽으로 ──
      for (let z = Z0 + 2; z <= Z1 - 2; z++) for (let x = X0 + 2; x <= GX1; x++) { S(x, LY, z, ((x + (z >> 1) * 3) % 9) === 8 ? B.timberDk : B.plank); S(x, LY - 1, z, B.timberDk); }
      for (const z of [36, 48, 60, 72, 86]) w.box(GX1 - 1, G + 1, z, GX1, LY - 2, z + 1, B.timber);
      w.box(GX1 - 1, LY - 3, Z0 + 2, GX1, LY - 2, Z1 - 2, B.timber);
      for (const z of [36, 48, 60, 72, 86]) { S(GX1 - 2, LY - 3, z, B.timberDk); S(GX1 - 2, LY - 3, z + 1, B.timberDk); }
      for (let z = Z0 + 2; z <= Z1 - 2; z++) {
        if (z >= 66 && z <= 71) continue;
        S(GX1, LY + 4, z, B.timber);
        if (z % 6 === 0) w.box(GX1, LY + 1, z, GX1, LY + 3, z, B.timber); else if (z % 2 === 0) w.box(GX1, LY + 1, z, GX1, LY + 3, z, B.timberDk);
      }
      // 1층 칸막이 자리: 작은 탁자, 촛대와 술잔, 걸상, 높은 등받이 칸막이
      for (const z of [42, 54, 78]) {
        w.box(31, G + 4, z, 35, G + 4, z + 3, B.plank); w.box(33, G + 1, z + 1, 33, G + 3, z + 2, B.timberDk);
        S(31, G + 5, z, B.iron); S(31, G + 6, z, B.candle); mugAt(w, 34, G + 5, z + 2, B.mug, true);
        for (const zz of [z - 3, z + 5]) { w.box(30, G + 1, zz, 35, G + 2, zz + 1, B.timber); }
      }
      for (const z of [48, 60, 72]) w.box(X0 + 2, G + 1, z, 37, G + 9, z + 1, B.plank);
      // 2층 숙소: 칸막이 벽(낮게), 침대(머리판·베개·이불), 작은 궤, 촛대
      for (const z of [52, 68]) { w.box(X0 + 2, LY + 1, z, 37, LY + 6, z + 1, B.plank); w.box(36, LY + 7, z, 37, LY + 8, z + 1, B.timber); }
      for (const [z0, bl] of [[38, B.blanket], [55, B.blanket2], [73, B.blanket]]) {
        w.box(X0 + 2, LY + 1, z0 - 1, X0 + 7, LY + 5, z0 - 1, B.timber);
        w.box(X0 + 2, LY + 1, z0, X0 + 7, LY + 1, z0 + 7, B.timberDk); w.box(X0 + 2, LY + 2, z0, X0 + 7, LY + 2, z0 + 7, B.linen);
        w.box(X0 + 3, LY + 3, z0, X0 + 6, LY + 3, z0 + 1, B.linen); w.box(X0 + 2, LY + 3, z0 + 2, X0 + 7, LY + 3, z0 + 7, bl);
        for (let z = z0 + 3; z <= z0 + 7; z += 2) S(X0 + 4, LY + 3, z, bl === B.blanket ? B.linen : B.rugB);
        w.box(X0 + 2, LY + 1, z0 + 9, X0 + 5, LY + 3, z0 + 10, B.barrelD); w.box(X0 + 2, LY + 2, z0 + 9, X0 + 5, LY + 2, z0 + 9, B.hoop); S(X0 + 4, LY + 3, z0 + 10, B.gold);
        S(36, LY + 1, z0 + 2, B.timberDk); S(36, LY + 2, z0 + 2, B.iron); S(36, LY + 3, z0 + 2, B.candle);
      }
      // 계단: 회랑 동쪽(x 44..49)에서 남→북으로 한 칸씩 올라 z 66..69 층계참에서 회랑에 닿는다
      for (let i = 1; i <= 14; i++) {
        const z = 83 - i;
        w.box(GX1 + 1, G + 1, z, GX1 + 6, G + i, z, B.timberDk); w.box(GX1 + 1, G + i, z, GX1 + 6, G + i, z, i % 2 ? B.plank : B.timber);
        S(GX1 + 7, G + i + 5, z, B.timber); if (i % 3 === 0) w.box(GX1 + 7, G + i + 1, z, GX1 + 7, G + i + 4, z, B.timber);
      }
      w.box(GX1 + 7, G + 1, 82, GX1 + 7, G + 6, 82, B.timber);
      w.box(GX1 + 1, LY - 1, 66, GX1 + 6, LY, 68, B.plank); w.box(GX1 + 1, G + 1, 66, GX1 + 6, LY - 2, 68, B.timberDk);
      for (let x = GX1 + 1; x <= GX1 + 7; x++) S(x, LY + 4, 65, B.timber); for (const x of [GX1 + 1, GX1 + 4, GX1 + 7]) w.box(x, LY + 1, 65, x, LY + 3, 65, B.timber);
      w.box(GX1 + 7, LY + 1, 66, GX1 + 7, LY + 4, 68, B.timber);
      lights.push({ name: 'gallery', p: [36, LY + 4, 58], c: '#ffd890', i: 0.5, d: 28, flicker: 0.12, srcR: 6 });
      landmarks.push({ name: '2층 숙소', note: '회랑의 침대 세 칸', p: [32, LY + 24, 60] });

      // 촛대 셋과 문간 등
      for (const [x, z] of [[98, 54], [98, 78], [76, 86]]) { w.box(x, G + 1, z, x, G + 6, z, B.timberDk); S(x, G + 7, z, B.iron); S(x, G + 8, z, B.candle); S(x, G + 9, z, B.candle); }
      lights.push({ name: 'door', p: [61, G + 8, Z1 - 3], c: '#ffc070', i: 0.4, d: 24, flicker: 0.15, srcR: 6 });

      // ───── 상호작용 ─────
      acts.push(OR.goAct({ at: [DX0 + 2, G + 1, Z1 - 1], h: 10, name: '밖으로 나가기', goto: 'ironhollow', hint: '청동 문을 나서 무쇠골 고원의 주점 앞 탁자 쪽으로 나가요', hit: [DX0, G + 1, Z1 - 1, DX1, G + 8, Z1] }));
      acts.push({
        name: '흑맥주 따르기', hint: '바 뒤 흑맥주 통 꼭지에서 거품 가득한 한 잔이 차오르고, 술잔이 바 위를 쭈욱 미끄러져요', hit: [BX0, G + 1, BZ - 4, BX1, G + 11, BZ + 3],
        run: async a => {
          for (let k = 0; k < 5; k++) { a.burst([82.5, G + 8, Z0 + 11], { n: 8, colors: ['#2a1a12', '#5a3a24', '#f4ecd8'], speed: 1, up: -2, life: 0.6, gravity: 16, spread: 0.4 }); await a.wait(0.15); }
          a.burst([BX1 - 1.5, G + 10, BZ + 1], { n: 14, colors: ['#f4ecd8', '#ffffff'], speed: 2, up: 3, life: 0.8, gravity: 4, spread: 0.8 });
          await a.move('slidemug', [-(BX1 - BX0 - 6), 0, 0], 1.4);
          a.burst([BX0 + 4.5, G + 10, BZ + 1], { n: 12, colors: ['#f4ecd8', '#ffffff'], speed: 3.2, up: 2, life: 0.6, gravity: 8, spread: 0.8 });
          await a.wait(1); await a.move('slidemug', [0, 0, 0], 1.2);
        },
      });
      acts.push({
        name: '팔씨름 탁자', hint: '둥근 돌 탁자가 쿵쿵 들썩이며 술잔이 튀어 오르고, 누가 이겼는지 박수 소리만 요란해요', hit: [AX - 7, G + 1, AZ - 4, AX + 7, G + 8, AZ + 4],
        run: async a => {
          for (let k = 0; k < 6; k++) {
            await a.tween('armtable', { off: [0, 1.6, 0], rot: [k % 2 ? 0.25 : -0.25, 0, k % 2 ? -0.15 : 0.15] }, 0.16);
            await a.tween('armtable', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.14);
            a.burst([AX + 0.5, G + 7, AZ + 0.5], { n: 10, colors: ['#f4ecd8', '#c8b8a8', '#ffe08a'], speed: 4, up: 3, life: 0.6, gravity: 10, spread: 2 });
          }
          await a.tween('armtable', { off: [0, 4, 0], rot: [0, 0.6, 0] }, 0.3);
          a.burst([AX + 0.5, G + 12, AZ + 0.5], { n: 30, colors: ['#ffe08a', '#ffb04a', '#ffffff'], speed: 6, up: 6, life: 1, gravity: 6, spread: 2 });
          await a.tween('armtable', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.4);
        },
      });
      acts.push({
        name: '드워프 노래', hint: '북이 둥둥 울리며 드워프 노래가 시작되고, 탁자 위 술잔들이 장단 맞춰 들썩여요', hit: [58, G + 1, DRZ - 3, DRX + 4, G + 11, DRZ + 4],
        run: async a => {
          for (let k = 0; k < 8; k++) {
            await a.tween('drum', { scl: [1.15, 0.75, 1.15] }, 0.12);
            a.burst([DRX + 0.5, G + 9, DRZ + 0.5], { n: 6, colors: ['#ffe08a', '#ffd070', '#ffffff'], speed: 2.4, up: 5, life: 1.4, gravity: -0.8, spread: 1.2 });
            const m = 'mug' + (k % 4);
            a.move(m, [0, 3.6, 0], 0.15).then(() => a.move(m, [0, 0, 0], 0.2));
            await a.tween('drum', { scl: [1, 1, 1] }, 0.18);
          }
          await a.wait(0.4);
        },
      });
      acts.push({
        name: '벽난로 불', hint: '장작이 탁 튀며 벽난로 불길이 확 일어나고, 도끼 장식 벽이 붉게 번쩍여요', hit: [FX0, G + 1, Z0 + 2, FX1, G + 12, Z0 + 9],
        run: async a => {
          a.flash('hearth', 4, 3); a.glow(1.4, 3);
          for (let k = 0; k < 8; k++) { a.burst([55, G + 5, Z0 + 9], { n: 18, colors: ['#ffb04a', '#ff6a2a', '#ffe08a'], speed: 4, up: 6, life: 1, gravity: 2, spread: 2.8 }); a.burst([55, TOP + 10, Z0 + 3.5], { n: 10, colors: ['#ffb04a', '#ff6a2a', '#8a7a70'], speed: 2, up: 8, life: 1.4, gravity: -1.2, spread: 1.6 }); await a.wait(0.3); }
        },
      });
      acts.push({
        name: '통 꼭지 쏟기', hint: '큰 술통 꼭지가 펑 풀리며 흑맥주 거품이 술잔을 넘쳐 쏟아져요', hit: [TX - 5, G + 1, TZ - 4, TX + 4, G + 18, TZ + 9],
        run: async a => {
          await a.tween('tapfoam', { scl: [1, 1, 1] }, 0.1);
          for (let k = 0; k < 10; k++) { a.burst([TX - 1, G + 8, TZ + 6], { n: 14, colors: ['#2a1a12', '#5a3a24', '#f4ecd8', '#ffffff'], speed: 2.8, up: 1, life: 0.8, gravity: 14, spread: 1 }); await a.wait(0.15); }
          await a.tween('tapfoam', { scl: [1.6, 2.4, 1.6] }, 0.8);
          await a.move('tapmug', [0, 4.8, 0], 0.4); await a.move('tapmug', [0, 0, 0], 0.4);
          await a.wait(0.8); await a.tween('tapfoam', { scl: [0, 0, 0] }, 0.5);
        },
      });
      acts.push({
        name: '건배', hint: '긴 돌탁자의 술잔들이 한꺼번에 높이 들려 쨍! 부딪히고 거품이 흩날려요', hit: [54, G + 1, 56, 89, G + 8, 63],
        run: async a => {
          await Promise.all(mugs.map((m, k) => a.move('mug' + k, [(72 - m[0] - 1) * 0.6, 7, (60 - m[1] - 1) * 0.8], 0.6)));
          a.burst([72, G + 13, 60], { n: 34, colors: ['#f4ecd8', '#ffffff', '#ffe08a'], speed: 6, up: 4, life: 1, gravity: 8, spread: 2 });
          await a.wait(0.6);
          await Promise.all(mugs.map((m, k) => a.move('mug' + k, [0, 0, 0], 0.5)));
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
