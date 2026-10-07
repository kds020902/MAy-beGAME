// 달샘 술 창고(하위 지도, HD 128칸 · 1칸 ≈ 25cm) — 은빛잎 마을 동남쪽 언덕 속 이슬 포도주 저장고. 줄눈이 파인 낱돌 벽과 판돌 바닥,
// 쐐기돌 아치 벽감마다 누운 통(쇠테·마구리·꼭지), 포도 압착 통과 나사 누름판, 동쪽 시음실(식탁보·은잔·촛대·술병 시렁),
// 북쪽 아치 너머 달빛 샘물이 솟는 깊은 숙성 굴과 오래된 큰 통. 남쪽 문 쪽(카메라 쪽) 벽은 낮게 잘랐다.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 128, D = 128, Hh = 96, G = 20;
  MAPS.push({
    id: 'silverleaf-cellar', cat: 'village', sub: true, parent: 'silverleaf', name: '달샘 술 창고', en: 'Silverleaf · Moonspring Cellar', color: '#b890ff', seed: 1392, base: G, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '이슬 포도원 언덕을 파고 들어간 돌 저장고. 아치 벽감마다 이슬 포도주 통이 누워 익어 가고, 동쪽 시음실에는 은잔이 놓여 있다. 북쪽 아치 너머 깊은 굴에서는 달빛 샘물이 솟아, 엘프들은 그 물로 백 년 묵을 포도주를 빚는다.',
    info: { title: '장소 정보', en: 'MOONSPRING CELLAR', rows: [['자리', '이슬 포도원 동남쪽 언덕 속'], ['저장실', '아치 벽감의 이슬 포도주 통'], ['시음실', '은잔과 촛불 탁자'], ['숙성 굴', '달빛 샘물 · 백 년 묵은 큰 통']] },
    sky: ['#20203a', '#0a0a18', '#c8a0ff'], stars: true,
    hemi: ['#e0d8f0', '#2a2420', 0.6], sun: ['#e0d8ff', 0.46, [0.4, 1, 0.6]],
    day: { sky: ['#e0e4ec', '#8a90a8', '#f8f0ff'], stars: false, hemi: ['#f8f4ff', '#4a4034', 0.62], sun: ['#fff4e0', 0.62, [0.4, 1, 0.6]], haze: '#c8c0d0' },
    liquid: ['#1a4a5a', '#3a9aaa', '#d8fff8'], liqSpeed: 0.4,
    fog: { start: 0.86, floor: G - 10, depth: 12, haze: [16, 0.16, 12], hazeColor: '#3a3448' },
    camY: 0, zoom: 1.5,
    particles: [
      { n: 60, colors: ['#ffe08a', '#c8a0ff', '#fff4c8'], mode: 'wisp', speed: 0.8, size: 2, area: [64, 60, 32], y0: G + 4, y1: G + 20 },
      { n: 60, colors: ['#d8d0c0', '#b8b0a8'], mode: 'drift', speed: 0.2, area: [64, 64, 36], y0: G + 2, y1: G + 24, glow: false },
      { n: 30, colors: ['#b8f8ff', '#e0f8ff'], mode: 'rise', speed: 0.5, area: [64, 22, 8], y0: G, y1: G + 16 },
    ],
    blocks: {
      moss: { c: '#4a3a2e', top: '#5a8a52', v: 0.1 }, dirt: { c: '#4a3a2e', v: 0.08 }, rock: { c: '#5a6a6a', v: 0.06, pat: 'stone' }, rockDk: { c: '#3a4646', v: 0.06, pat: 'stone' },
      cave: { c: '#4a5050', v: 0.08, pat: 'big' }, stoneW: { c: '#b0b8b0', v: 0.06 }, pathS: { c: '#4a3a2e', top: '#8a948c', v: 0.06 }, flag: { c: '#6a6a64', top: '#9a9a90', v: 0.05 }, flagJ: { c: '#4a4a46', top: '#5e5e58', v: 0.03 },
      st1: { c: '#7a8684', v: 0.05 }, st2: { c: '#687472', v: 0.05 }, st3: { c: '#8a9490', v: 0.05 }, st4: { c: '#707c74', v: 0.05 }, mortar: { c: '#4e5654', v: 0.03 },
      barkDk: { c: '#54483c', v: 0.07 }, plank: { c: '#b08a5a', v: 0.08, pat: 'plank' }, plankDk: { c: '#7a5a3a', v: 0.08, pat: 'plank' }, door: { c: '#4a3a2e', v: 0.03, pat: 'plank' }, doorDk: { c: '#3a2c22', v: 0.03 },
      barrel: { c: '#8a6a44', v: 0.05 }, barrel2: { c: '#7a5c3a', v: 0.05 }, barrelO: { c: '#6a4a30', v: 0.05 }, hoop: { c: '#3a3a3e', v: 0.03 }, cask: { c: '#a8845a', v: 0.04 }, caskR: { c: '#8e6e48', v: 0.04 },
      grape: { c: '#b890ff', glow: true }, grapeD: { c: '#6a4aa8', v: 0.06 }, wine: { c: '#7a2a5a', v: 0.03 }, bottle: { c: '#2a4a3a', v: 0.03 }, bottleP: { c: '#5a2a5a', v: 0.03 }, cork: { c: '#c8a878', v: 0.03 },
      silver: { c: '#d8e0e4', v: 0.03 }, cloth: { c: '#d8ccb0', v: 0.03 }, clothR: { c: '#8a3a4a', v: 0.03 }, cush: { c: '#6a4a7a', v: 0.04 }, straw: { c: '#c8b070', v: 0.06 },
      leafD: { c: '#3a6a5a', v: 0.08 }, leafW: { c: '#c8e8d8', v: 0.05 }, fern: { c: '#3a6a3a', v: 0.1 }, rope: { c: '#c8b890', v: 0.04 }, iron: { c: '#4a4a50', v: 0.03 }, brass: { c: '#e0c060', v: 0.02 },
      lamp2: { c: '#ffe08a', glow: true }, candle: { c: '#fff0c0', glow: true }, moon: { c: '#e0f8ff', glow: true }, mushG: { c: '#9ae8f0', glow: true },
    },
    build(w) {
      const B = w.id;
      // 판돌 바닥: 4×3칸 돌, 1칸 줄눈
      const flagAt = (x, z) => { const row = Math.floor(z / 3), off = (row & 1) * 2; if (z % 3 === 2 || (x + off) % 4 === 3) return B.flagJ; return hash3(Math.floor((x + off) / 4), row, 3) > 0.45 ? B.flag : B.pathS; };
      MH.terrain(w, { floor: G - 12, height: () => G, surface: (x, z) => hash3(x >> 2, 2, z >> 2) > 0.7 ? B.moss : flagAt(x, z), under: (x, z, y, dep) => dep < 4 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];
      // 낱돌 쌓기
      const STONES = [B.st1, B.st2, B.st3, B.st1, B.st4, B.st2];
      const stoneAt = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return B.mortar;
        return STONES[(hash3(Math.floor(uu / 6), c, salt) * 6) | 0];
      };
      // 세운 통: 볼록한 몸통, 쇠테 둘, 뚜껑
      const barrelUp = (T, x, y, z, ht) => {
        for (let r = 0; r < ht; r++) {
          const rr = r >= 2 && r <= ht - 3 ? 2.6 : 2.2;
          for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) {
            const d2 = dx * dx + dz * dz;
            if (d2 > rr * rr) continue;
            const outer = d2 > (rr - 1) * (rr - 1);
            T.set(x + dx, y + r, z + dz, r === ht - 1 ? (outer ? B.barrel2 : B.cask) : ((r === 1 || r === ht - 2) && outer) ? B.hoop : ((Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 5)) & 1) ? B.barrel : B.barrel2));
          }
        }
      };
      // 누운 통(축 x): 반지름 rr, 쇠테 둘, 마구리(나이테 테두리)
      const cask = (p, x0, x1, yc, zc, rr, mat) => {
        const R = Math.ceil(rr);
        for (let x = x0; x <= x1; x++) for (let dz = -R; dz <= R; dz++) for (let dy = -R; dy <= R; dy++) {
          const d2 = dz * dz + dy * dy, bulge = rr - (Math.abs(x - (x0 + x1) / 2) > (x1 - x0) / 2 - 1.5 ? 0.5 : 0);
          if (d2 > bulge * bulge) continue;
          const head = x === x0 || x === x1, hoop = x === x0 + 2 || x === x1 - 2;
          p.set(x, yc + dy, zc + dz, head ? (d2 > (bulge - 1) * (bulge - 1) ? B.barrelO : (d2 < 1.5 ? B.caskR : B.cask)) : hoop ? B.hoop : mat);
        }
      };
      const X0 = 24, X1 = 104, Z0 = 48, Z1 = 100;                 // 통 저장실(바깥 벽 포함, 벽 두께 2)
      const HX = 84, HT = G + 18;                                   // 시음실 칸막이 x, 저장실 벽 높이
      // ── 저장실 바닥과 벽 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) w.set(x, G, z, flagAt(x, z));
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        const edge = x <= X0 + 1 || x >= X1 - 1 || z <= Z0 + 1 || z >= Z1 - 1;
        if (!edge) continue;
        const low = z >= Z1 - 1 || x >= X1 - 1;                                    // 카메라 쪽(남·동) 벽은 6칸
        const top = low ? G + 6 : HT, u = (z <= Z0 + 1 || z >= Z1 - 1) ? x : z;
        for (let y = G + 1; y <= top; y++) w.set(x, y, z, y >= top - 1 ? B.stoneW : stoneAt(u, y, x + z > 150 ? 1 : 2));
      }
      // 서쪽 벽 아치 벽감 넷: 쐐기돌 아치, 안쪽은 어두운 돌
      const nicheZ = [0, 1, 2, 3].map(k => Z0 + 8 + k * 12);
      for (const zc of nicheZ) {
        for (let z = zc - 7; z <= zc + 7; z++) for (let y = G + 1; y <= G + 14; y++) {
          const r = Math.hypot(z - zc, Math.max(0, y - (G + 8)) * 1.2);
          if (r <= 4.8) { w.set(X0, y, z, B.rockDk); w.set(X0 + 1, y, z, 0); }
          else if (r <= 6.6 && y > G + 8) { const seg = Math.floor(Math.atan2(y - (G + 8), z - zc) / (Math.PI / 7)); w.set(X0 + 1, y, z, seg & 1 ? B.st3 : B.stoneW); w.set(X0 + 2, y, z, seg & 1 ? B.st3 : B.stoneW); }
        }
      }
      for (let k = 0; k < 4; k++) {
        const zc = nicheZ[k];
        for (const s of [-3, 3]) w.box(X0 + 1, G + 1, zc + s, X0 + 11, G + 2, zc + s, B.plankDk);
        cask(w, X0 + 1, X0 + 10, G + 5, zc, 3.1, k % 2 ? B.barrelO : B.barrel);
        w.set(X0 + 11, G + 4, zc, B.iron); w.set(X0 + 12, G + 4, zc, B.brass);
        if (k % 2 === 0) {
          w.box(X0 + 3, G + 9, zc - 3, X0 + 9, G + 9, zc + 3, B.plankDk);
          for (const [dz, b] of [[-2, B.bottle], [-1, B.bottleP], [1, B.bottle], [2, B.bottleP]]) { w.box(X0 + 4, G + 10, zc + dz, X0 + 4, G + 11, zc + dz, b); w.set(X0 + 4, G + 12, zc + dz, B.cork); }
          w.box(X0 + 6, G + 10, zc - 1, X0 + 8, G + 12, zc + 1, B.barrel); w.box(X0 + 6, G + 11, zc - 1, X0 + 8, G + 11, zc + 1, B.hoop);
        }
      }
      // 저장실 가운데 줄: 통 받침(판자 사이 틈)과 세운 통 더미
      for (const [x, z] of [[48, 60], [48, 72], [48, 84], [64, 84]]) {
        for (let dz = -5; dz <= 5; dz++) for (let dx = -5; dx <= 5; dx++) { w.set(x + dx, G + 1, z + dz, ((dx + 5) % 3 === 2) ? B.barkDk : B.plankDk); }
        for (const [dx, dz] of [[-2, -2], [3, -2], [-2, 3], [3, 3]]) if (hash3(x + dx, z, dz) > 0.2) barrelUp(w, x + dx, G + 2, z + dz, 7);
        barrelUp(w, x + 1, G + 9, z + 1, 6); w.set(x + 1, G + 15, z + 1, B.grapeD); w.set(x + 2, G + 15, z + 1, B.grape);
      }
      // 포도 압착 통(남서쪽): 둥근 통, 위 누름판(부품), 나사 기둥과 들보
      const PX = 36, PZ = 90;
      w.cyl(PX, PZ, G + 1, G + 4, 5.2, B.barrelO); w.cyl(PX, PZ, G + 3, G + 4, 4.1, 0); w.cyl(PX, PZ, G + 3, G + 3, 4.1, B.grapeD); w.ring(PX, PZ, G + 2, 4.2, 5.6, B.hoop); w.ring(PX, PZ, G + 4, 4.2, 5.6, B.hoop);
      for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) if (hash3(PX + dx, 4, PZ + dz) > 0.6 && dx * dx + dz * dz < 12) w.set(PX + dx, G + 3, PZ + dz, B.grape);
      for (const x of [PX - 7, PX + 7]) { w.box(x, G + 1, PZ - 1, x, G + 15, PZ, B.barkDk); w.box(x - 1, G + 1, PZ - 2, x + 1, G + 1, PZ + 1, B.barkDk); }
      w.box(PX - 7, G + 15, PZ - 1, PX + 7, G + 16, PZ, B.barkDk);
      const press = w.prop({ name: 'press', pivot: [PX + 0.5, G + 8, PZ + 0.5] });
      press.cyl(PX, PZ, G + 8, G + 8, 3.4, B.plank); press.ring(PX, PZ, G + 8, 2.6, 3.5, B.plankDk); press.box(PX, G + 9, PZ, PX, G + 14, PZ, B.iron); press.box(PX - 2, G + 12, PZ, PX + 2, G + 12, PZ, B.iron);
      for (const [x, z] of [[PX + 6, PZ - 7], [PX + 9, PZ - 5]]) { w.box(x, G + 1, z, x + 1, G + 2, z + 1, B.straw); w.box(x, G + 3, z, x + 1, G + 3, z + 1, B.grape); w.set(x, G + 4, z, B.grapeD); }
      acts.push({
        name: '포도 밟기', hint: '압착 통의 누름판이 쿵쿵 내려앉으며 이슬 포도즙이 보랏빛으로 튀어요', hit: [PX - 6, G + 1, PZ - 6, PX + 6, G + 16, PZ + 6],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await a.move('press', [0, -4, 0], 0.35);
            a.burst([PX + 0.5, G + 7, PZ + 0.5], { n: 18, colors: ['#b890ff', '#7a2a5a', '#e0c8ff'], speed: 4.8, up: 4, life: 0.9, gravity: 16, spread: 2.4 });
            await a.move('press', [0, 0, 0], 0.45);
          }
        },
      });

      // ── 남쪽 문(밖으로): 낮은 벽에 쐐기돌 아치 문틀과 두 짝 문 ──
      const DX0 = 58, DX1 = 69, DCX = (DX0 + DX1) / 2;
      for (let x = DX0 - 4; x <= DX1 + 4; x++) for (let y = G + 1; y <= G + 16; y++) {
        const r = Math.hypot(x - DCX, Math.max(0, y - (G + 8)) * 1.15);
        for (const z of [Z1 - 1, Z1]) {
          if (r <= 6.2) w.set(x, y, z, z === Z1 - 1 ? 0 : (Math.abs(x - DCX) < 1 ? B.doorDk : (y === G + 4 || y === G + 11 ? B.hoop : B.door)));
          else if (r <= 8.4) { const seg = Math.floor(Math.atan2(Math.max(0, y - (G + 8)), x - DCX) / (Math.PI / 9)); w.set(x, y, z, y > G + 8 ? ((seg & 1) ? B.st3 : B.stoneW) : (((y - G) >> 1) & 1 ? B.stoneW : B.st1)); }
        }
      }
      for (const x of [DX0 + 3, DX1 - 3]) { w.set(x, G + 7, Z1 - 1, B.iron); w.set(x, G + 6, Z1 - 1, B.brass); }
      for (const x of [DX0 - 5, DX1 + 5]) { w.set(x, G + 10, Z1 - 2, B.iron); w.box(x, G + 8, Z1 - 2, x, G + 9, Z1 - 2, B.lamp2); w.set(x, G + 7, Z1 - 2, B.iron); }
      lights.push({ name: 'door', p: [64, G + 9, Z1 - 3], c: '#ffd880', i: 0.6, d: 20, flicker: 0.12, srcR: 12 });
      acts.push(OR.goAct({ at: [62, G + 1, Z1 - 2], name: '밖으로 나가기', goto: 'silverleaf', hint: '두 짝 문을 밀고 이슬 포도원 앞마당으로 올라가요', hit: [DX0, G + 1, Z1 - 2, DX1, G + 8, Z1], h: 14 }));
      for (let z = Z1 - 8; z <= Z1 - 2; z++) for (let x = DX0; x <= DX1; x++) w.set(x, G, z, x % 4 === 0 ? B.plankDk : B.plank);

      // ── 동쪽 시음실: 칸막이 벽과 아치 문, 식탁보 깐 탁자와 은잔, 술병 시렁 ──
      for (let z = Z0 + 2; z <= Z0 + 31; z++) for (let y = G + 1; y <= G + 12; y++) {
        const r = Math.hypot(z - (Z0 + 15.5), Math.max(0, y - (G + 7)) * 1.2), door = r <= 4.2;
        for (const x of [HX, HX + 1]) w.set(x, y, z, door ? 0 : (y >= G + 11 ? B.stoneW : stoneAt(z, y, 7)));
      }
      for (let x = HX; x <= X1 - 2; x++) for (let y = G + 1; y <= G + 8; y++) for (const z of [Z0 + 30, Z0 + 31]) w.set(x, y, z, y >= G + 7 ? B.stoneW : stoneAt(x, y, 8));
      for (let z = Z0 + 2; z <= Z0 + 29; z++) for (let x = HX + 2; x <= X1 - 2; x++) w.set(x, G, z, (z % 4 === 0) ? B.plankDk : B.plank);
      for (let z = Z0 + 6; z <= Z0 + 25; z++) for (let x = HX + 3; x <= HX + 5; x++) if (z < Z0 + 13 || z > Z0 + 18) w.set(x, G, z, B.cush);
      const TX = HX + 10, TZ = Z0 + 6;
      for (const [dx, dz] of [[-2, 0], [2, 0], [-2, 13], [2, 13]]) w.box(TX + dx, G + 1, TZ + dz, TX + dx, G + 3, TZ + dz, B.barkDk);
      w.box(TX - 3, G + 4, TZ - 1, TX + 3, G + 4, TZ + 14, B.plank);
      w.box(TX - 1, G + 4, TZ, TX + 1, G + 4, TZ + 13, B.cloth); w.box(TX - 1, G + 4, TZ + 3, TX + 1, G + 4, TZ + 3, B.clothR); w.box(TX - 1, G + 4, TZ + 10, TX + 1, G + 4, TZ + 10, B.clothR);
      for (const x of [TX - 5, TX + 5]) for (let z = TZ; z <= TZ + 12; z += 4) w.box(x, G + 1, z, x, G + 2, z + 1, B.cush);
      w.set(TX, G + 5, TZ + 6, B.silver); w.box(TX, G + 6, TZ + 6, TX, G + 7, TZ + 6, B.candle);
      w.box(TX, G + 5, TZ + 1, TX, G + 7, TZ + 1, B.bottleP); w.set(TX, G + 8, TZ + 1, B.cork);
      const cups = w.prop({ name: 'cups', pivot: [TX + 0.5, G + 5, TZ + 6.5] });
      for (const z of [TZ + 3, TZ + 10]) for (const x of [TX - 2, TX + 2]) { cups.set(x, G + 5, z, B.silver); cups.set(x, G + 6, z, B.silver); if (x < TX) cups.set(x, G + 7, z, B.wine); }
      for (let z = Z0 + 2; z <= Z0 + 29; z++) for (let y = G + 1; y <= G + 8; y++) if (!w.get(X1 - 2, y, z)) w.set(X1 - 2, y, z, y % 3 === 0 ? B.plankDk : (hash3(y >> 1, z, 5) > 0.5 ? B.bottle : B.bottleP));
      for (let z = Z0 + 2; z <= Z0 + 29; z += 3) for (const y of [G + 2, G + 5, G + 8]) if (w.get(X1 - 2, y, z) !== B.plankDk) w.set(X1 - 3, y, z, B.cork);
      lights.push({ name: 'tasting', p: [TX + 0.5, G + 8, TZ + 6.5], c: '#ffd890', i: 0.8, d: 24, flicker: 0.2 });
      acts.push({
        name: '시음 잔', hint: '시음 탁자의 은잔이 떠올라 쨍 부딪치며 이슬 포도주 향이 퍼져요', hit: [TX - 4, G + 1, TZ - 2, TX + 4, G + 8, TZ + 14],
        run: async a => {
          await a.move('cups', [0, 4, 0], 0.9);
          for (let k = 0; k < 3; k++) { a.burst([TX + 0.5, G + 11, TZ + 6.5], { n: 16, colors: ['#ffffff', '#e0c8ff', '#ffe08a'], speed: 4, up: 3.2, life: 0.9, gravity: 1, spread: 1.2 }); await a.turn('cups', [0, 0.4, 0], 0.25); await a.turn('cups', [0, -0.4, 0], 0.25); }
          a.flash('tasting', 2.4, 1.6);
          a.burst([TX + 0.5, G + 12, TZ + 6.5], { n: 22, colors: ['#c8a0ff', '#fff4c8'], speed: 1.6, up: 4, life: 2.2, gravity: -0.6, spread: 3.2 });
          await a.wait(1);
          await Promise.all([a.turn('cups', [0, 0, 0], 0.5), a.move('cups', [0, 0, 0], 0.9)]);
        },
      });

      // 통 꼭지: 동쪽 저장실 큰 통(시음실 남쪽)
      const KX = 92, KZ = 88;
      for (const s of [-5, 5]) { w.box(KX - 3, G + 1, KZ + s, KX + 6, G + 3, KZ + s, B.plankDk); w.box(KX - 3, G + 1, KZ + s, KX - 3, G + 1, KZ + s, B.barkDk); }
      cask(w, KX - 4, KX + 7, G + 8, KZ, 4.6, B.barrelO);
      w.box(KX - 6, G + 1, KZ, KX - 6, G + 2, KZ, B.silver);
      const tap = w.prop({ name: 'tap', pivot: [KX - 4.5, G + 7.5, KZ + 0.5], axis: 'x' });
      tap.set(KX - 5, G + 6, KZ, B.iron); tap.box(KX - 5, G + 7, KZ, KX - 5, G + 9, KZ, B.brass); tap.box(KX - 5, G + 10, KZ - 2, KX - 5, G + 10, KZ + 2, B.iron);
      acts.push({
        name: '통 꼭지 열기', hint: '큰 통의 꼭지를 돌리면 이슬 포도주가 은빛 잔으로 졸졸 흘러요', hit: [KX - 8, G + 1, KZ - 6, KX + 6, G + 12, KZ + 6],
        run: async a => {
          await a.spin('tap', 2, 0.8);
          for (let k = 0; k < 10; k++) { a.burst([KX - 4.5, G + 6, KZ + 0.5], { n: 8, colors: ['#7a2a5a', '#b890ff', '#e0c8ff'], speed: 0.6, up: -1, life: 0.5, gravity: 18, spread: 0.3 }); await a.wait(0.2); }
          a.burst([KX - 5.5, G + 3.4, KZ + 0.5], { n: 16, colors: ['#e0c8ff', '#ffffff'], speed: 2.4, up: 2.8, life: 1, gravity: 2, spread: 0.8 });
        },
      });

      // ── 북쪽 아치: 깊은 숙성 굴로(쐐기돌 아치) ──
      const AX = 64;
      for (let x = AX - 8; x <= AX + 8; x++) for (let y = G + 1; y <= G + 16; y++) {
        const r = Math.hypot(x - AX, Math.max(0, y - (G + 8)) * 1.1);
        for (const z of [Z0, Z0 + 1]) {
          if (r <= 5.2) w.set(x, y, z, 0);
          else if (r <= 7.6) { const seg = Math.floor(Math.atan2(Math.max(0, y - (G + 8)), x - AX) / (Math.PI / 8)); w.set(x, y, z, y > G + 8 ? ((seg & 1) ? B.st3 : B.stoneW) : (((y - G) >> 1) & 1 ? B.stoneW : B.st1)); }
        }
      }
      // 굴: 울퉁불퉁한 바위 벽(뒤쪽 높게), 가운데 달빛 샘
      const CX = 64, CZ = 26, CRX = 30, CRZ = 22;
      for (let z = CZ - CRZ - 6; z < Z0; z++) for (let x = CX - CRX - 6; x <= CX + CRX + 6; x++) {
        const e = Math.hypot((x - CX) / CRX, (z - CZ) / CRZ) + (hash3(x >> 2, 4, z >> 2) - 0.5) * 0.12;
        if (e <= 1) { w.set(x, G, z, hash3(x >> 1, 1, z >> 1) > 0.75 ? B.cave : B.pathS); for (let y = G + 1; y <= G + 32; y++) w.set(x, y, z, 0); continue; }
        if (e > 1.28) continue;
        const front = x > CX + 12 && z > CZ;
        const top = front ? G + 10 : G + 22 + Math.round(hash3(x >> 2, 6, z >> 2) * 10) - (z > CZ ? 6 : 0);
        for (let y = G + 1; y <= top; y++) w.set(x, y, z, ((y >> 1) + (x >> 2)) % 5 === 0 ? B.rockDk : B.cave);
        if (hash3(x >> 1, 8, z >> 1) > 0.6) { w.set(x, top + 1, z, hash3(x >> 1, 9, z >> 1) > 0.5 ? B.fern : B.leafD); if (hash3(x, 9, z) > 0.7) w.set(x, top + 2, z, B.fern); }
      }
      for (let x = AX - 4; x <= AX + 4; x++) for (let z = Z0 - 4; z <= Z0 + 1; z++) { w.set(x, G, z, x % 4 === 0 ? B.plankDk : B.plank); for (let y = G + 1; y <= G + 9; y++) { const b = w.get(x, y, z); if (b !== B.stoneW && b !== B.st1 && b !== B.st3) w.set(x, y, z, 0); } }
      // 달빛 샘: 굴 북쪽 웅덩이, 갓돌 테두리와 샘돌
      const SX = 64, SZ = 16;
      for (let z = SZ - 8; z <= SZ + 7; z++) for (let x = SX - 12; x <= SX + 12; x++) {
        const d = Math.hypot((x - SX) / 11, (z - SZ) / 6.4);
        if (d > 1) continue;
        w.set(x, G - 6, z, B.rockDk); for (let y = G - 5; y <= G; y++) w.set(x, y, z, 0);
        w.liquid(x, z, G - 2);
        if (d > 0.84) { w.set(x, G, z, B.stoneW); w.set(x, G - 1, z, B.rock); w.liquid(x, z, -1); }
      }
      w.box(SX - 2, G - 6, SZ - 6, SX + 1, G + 4, SZ - 5, B.rock); w.box(SX - 2, G + 3, SZ - 6, SX + 1, G + 4, SZ - 5, B.stoneW);
      w.box(SX - 1, G + 5, SZ - 6, SX, G + 7, SZ - 6, B.moon); w.set(SX - 1, G + 8, SZ - 6, B.moon);
      w.set(SX - 2, G + 5, SZ - 5, B.leafW); w.set(SX + 1, G + 5, SZ - 6, B.fern); w.set(SX + 1, G + 6, SZ - 6, B.fern);
      for (let z = SZ - 6; z <= SZ - 5; z++) for (let x = SX - 2; x <= SX + 1; x++) w.liquid(x, z, -1);
      for (const [x, z] of [[SX - 16, SZ + 2], [SX + 16, SZ - 2], [SX - 10, SZ + 10], [SX + 12, SZ + 10]]) { w.set(x, G + 1, z, B.mushG); w.set(x + 1, G + 1, z, B.mushG); w.set(x, G + 2, z, B.mushG); }
      lights.push({ name: 'spring', p: [SX + 0.5, G + 4, SZ + 0.5], c: '#9af0ff', i: 1, d: 36, flicker: 0.05, srcR: 8 });
      // 두레박 기둥과 두레박(부품)
      const BX = SX + 6, BZ = SZ + 2;
      w.box(BX + 6, G + 1, BZ, BX + 6, G + 18, BZ, B.barkDk); w.box(BX - 1, G + 18, BZ, BX + 7, G + 18, BZ, B.barkDk); w.box(BX + 6, G + 14, BZ + 1, BX + 6, G + 14, BZ + 2, B.iron);
      w.set(BX, G + 17, BZ, B.iron);
      const bTop = G + 6, rLen = 10;
      MH.rope(w, 'brope', BX, G + 16, BZ, rLen, B.rope);
      const pail = w.prop({ name: 'pail', pivot: [BX + 0.5, bTop, BZ + 0.5] });
      for (let y = bTop - 4; y <= bTop; y++) for (let z = BZ - 1; z <= BZ + 1; z++) for (let x = BX - 1; x <= BX + 1; x++) {
        const wall = x !== BX || z !== BZ;
        if (y === bTop - 4 || wall) pail.set(x, y, z, (y === bTop - 1 || y === bTop - 3) && wall ? B.hoop : B.plankDk);
      }
      acts.push({
        name: '샘물 길어 오기', hint: '두레박이 달빛 샘에 풍덩 잠겼다가 은빛 샘물을 가득 담아 올라와요', hit: [BX - 2, G + 1, BZ - 4, BX + 6, G + 18, BZ + 4],
        run: async a => {
          await Promise.all([a.move('pail', [0, -6, 0], 1.4), a.rope('brope', rLen, rLen + 6, 1.4)]);
          a.burst([BX + 0.5, G, BZ + 0.5], { n: 22, colors: ['#b8f8ff', '#e0f8ff', '#ffffff'], speed: 4, up: 4.8, life: 1, gravity: 14, spread: 1.2 });
          a.flash('spring', 3, 2.4);
          await a.wait(0.8);
          await Promise.all([a.move('pail', [0, 0, 0], 1.6), a.rope('brope', rLen, rLen, 1.6)]);
          a.burst([BX + 0.5, bTop + 2, BZ + 0.5], { n: 14, colors: ['#b8f8ff', '#e0f8ff'], speed: 1.2, up: 3.2, life: 1.6, gravity: -0.6, spread: 0.8 });
        },
      });
      landmarks.push({ name: '달빛 샘물', note: '백 년 포도주를 빚는 샘', p: [SX + 0.5, G + 24, SZ + 0.5] });
      // 숙성 굴의 오래된 큰 통(서쪽, 하나는 굴러 나오는 부품)
      for (const zc of [24, 36]) for (const s of [-4, 4]) w.box(42, G + 1, zc + s, 54, G + 2, zc + s, B.plankDk);
      cask(w, 42, 54, G + 4, 24, 3.1, B.barrelO);
      const roll = w.prop({ name: 'oldcask', pivot: [48.5, G + 4.5, 36.5], axis: 'x' });
      cask(roll, 42, 54, G + 4, 36, 3.1, B.barrelO);
      w.box(40, G + 1, 30, 40, G + 8, 30, B.barkDk); w.set(40, G + 9, 30, B.iron); w.box(40, G + 10, 30, 40, G + 11, 30, B.lamp2); w.set(40, G + 12, 30, B.iron);
      acts.push({
        name: '오래된 통 굴리기', hint: '백 년 묵은 큰 통이 데구루루 굴러 나왔다가 제자리로 돌아가요', hit: [42, G + 1, 32, 54, G + 8, 40],
        run: async a => {
          await Promise.all([a.move('oldcask', [0, 0, 6], 1.4), a.turn('oldcask', [Math.PI * 1.5, 0, 0], 1.4)]);
          a.burst([48.5, G + 2.4, 43], { n: 16, colors: ['#d8d0c0', '#b8b0a8'], speed: 4, up: 1.6, life: 1, gravity: 2, spread: 4, flat: true });
          await a.wait(0.6);
          await Promise.all([a.move('oldcask', [0, 0, 0], 1.4), a.turn('oldcask', [0, 0, 0], 1.4)]);
        },
      });

      // ── 등불: 저장실 벽 등롱(쇠 받침과 갓)과 굴 입구 등 ──
      const lampP = [[X0 + 2, G + 12, Z0 + 14], [X0 + 2, G + 12, Z0 + 26], [X0 + 2, G + 12, Z0 + 38], [72, G + 10, 80], [AX - 9, G + 12, Z0 + 2], [AX + 9, G + 12, Z0 + 2], [HX - 1, G + 10, Z0 + 8], [80, G + 12, Z0 + 2]];
      w.box(72, G + 1, 80, 72, G + 8, 80, B.barkDk); w.box(71, G + 1, 79, 73, G + 1, 81, B.barkDk);
      for (const [x, y, z] of lampP) { w.set(x, y - 1, z, B.iron); w.box(x, y, z, x, y + 1, z, B.lamp2); w.set(x, y + 2, z, B.iron); }
      lights.push({ name: 'lanterns', p: [X0 + 4.5, G + 12, Z0 + 26], c: '#ffd890', i: 0.9, d: 36, flicker: 0.15 });
      lights.push({ name: 'lanterns', p: [AX + 0.5, G + 12, Z0 + 4.5], c: '#ffd890', i: 0.8, d: 32, flicker: 0.15, srcR: 10 });
      lights.push({ name: 'lanterns', p: [72, G + 10, 80], c: '#ffd890', i: 0.6, d: 32, flicker: 0.15 });
      acts.push({
        name: '등불 켜기', hint: '벽마다 걸린 등롱에 차례로 불이 붙으며 술 창고가 금빛으로 밝아져요', hit: [AX - 12, G + 1, Z0 + 2, AX + 12, G + 14, Z0 + 6],
        run: async a => {
          for (const [x, y, z] of lampP) { a.burst([x + 0.5, y + 1, z + 0.5], { n: 14, colors: ['#ffe08a', '#fff4c8', '#ffb060'], speed: 2.4, up: 3.2, life: 1.2, gravity: -0.6, spread: 1 }); await a.wait(0.25); }
          a.flash('lanterns', 3, 3.4); a.glow(1.4, 3.4);
          await a.wait(1);
        },
      });
      // 문간 곁 포도 바구니와 빈 통, 북쪽 벽 아래 나무 상자 줄
      for (const [x, z] of [[44, 93], [52, 94], [76, 93]]) {
        for (let dz = 0; dz <= 2; dz++) for (let dx = 0; dx <= 3; dx++) { w.set(x + dx, G + 1, z + dz, B.straw); w.set(x + dx, G + 2, z + dz, (dx === 0 || dx === 3 || dz === 0 || dz === 2) ? B.rope : (hash3(x + dx, 2, z + dz) > 0.5 ? B.grape : B.grapeD)); }
        w.set(x + 1, G + 3, z + 1, B.grape); w.set(x + 2, G + 3, z + 1, B.grapeD);
      }
      barrelUp(w, 29, G + 1, 95, 7);
      for (let x = 72; x <= 81; x++) for (const z of [51, 52]) w.box(x, G + 1, z, x, G + 2, z, ((x >> 1) & 1) ? B.plankDk : B.barrel);
      landmarks.push({ name: '통 저장실', note: '아치 벽감의 이슬 포도주 통', p: [49, G + 24, 73] });
      return { lights, landmarks, acts };
    },
  });
})();
