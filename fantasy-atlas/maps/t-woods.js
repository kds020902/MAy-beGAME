// 삼림 — 제재소: 우즈 남쪽 큰 호숫가의 숲속 공터. 긴 판자 창고와 톱날 작업장, 통나무 더미와 크레인, 감시탑 둘, 낡은 원목 트럭 (슈투르만의 영역)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 144, D = 144, Hh = 96, TAU = Math.PI * 2;
  MAPS.push({
    id: 'woods', cat: 'tarkov', name: '삼림', en: 'Woods · Sawmill', color: '#5a7a4a', seed: 604, base: 20, time: 'day', size: [W, D, Hh],
    desc: '프리오제르스크 자연보호구역 깊은 숲, 큰 호수 바로 옆의 낡은 제재소. 북쪽과 서쪽은 빽빽한 소나무 숲이 막고, 공터에는 녹슨 함석지붕 창고와 통나무 더미, 쌓아 둔 목재가 흩어져 있다. 이곳은 저격수 보스 슈투르만과 호위병들의 영역 — 그들은 멀리서 먼저 쏜다.',
    info: { title: '구역 정보', en: 'WOODS', rows: [['위치', '우즈 남쪽 · 큰 호숫가 제재소'], ['보스', '슈투르만 · 호위병 2~3명'], ['열쇠', '슈투르만의 은닉처 열쇠'], ['탈출', '남서쪽 호숫가 보트']] },
    sky: ['#c6ccc4', '#86928c', '#e4e6dc'], stars: false,
    hemi: ['#dfe6dc', '#3a4232', 0.64], sun: ['#eef0e6', 0.52, [0.5, 1, 0.55]],
    liquid: ['#3e5458', '#5e7a7c', '#b4c6c4'], liqSpeed: 0.35,
    fog: { start: 0.86, floor: 12, depth: 8, haze: [26, 0.24, 7], hazeColor: '#c8ccc4' },
    camY: 6, zoom: 1.05,
    particles: [
      { n: 46, colors: ['#dfe2da', '#c8ccc4'], mode: 'wisp', speed: 0.5, size: 3, y0: 21, glow: false },
      { n: 90, colors: ['#8a9a72', '#c8c0a4', '#6a7a5a'], mode: 'drift', speed: 0.3, wind: 0.4, y0: 24, y1: 64, glow: false },
      { n: 18, colors: ['#a8a8a2', '#8c8c88'], mode: 'rise', speed: 0.45, size: 2, area: [31.5, 56.5, 1.2], y0: 37, y1: 52, glow: false },
      { n: 16, colors: ['#ffb060', '#ff7a3a'], mode: 'rise', speed: 0.5, area: [34.5, 92.5, 1.2], y0: 22, y1: 30, glow: true },
    ],
    blocks: {
      // 땅
      grass: { c: '#4a5a34', top: '#5e7040', v: 0.1 }, grassY: { c: '#6a6a3e', top: '#8a8650', v: 0.1 }, needle: { c: '#4a4232', top: '#5a5036', v: 0.12 }, moss: { c: '#3e5030', top: '#4e6436', v: 0.1 },
      dirt: { c: '#5e4c36', top: '#76603e', v: 0.08 }, dirtD: { c: '#4e3e2c', top: '#5e4a34', v: 0.07 }, mud: { c: '#4a3c2c', top: '#54442e', v: 0.06 }, sawdust: { c: '#b89868', top: '#d0b07a', v: 0.08 },
      sand: { c: '#8a7c60', top: '#a0906c', v: 0.07 }, lakebed: { c: '#3e3a30', v: 0.06 }, soil: { c: '#4a3c2c', v: 0.08 }, rock: { c: '#6e6e68', v: 0.06, pat: 'stone' }, stone: { c: '#7e7e76', top: '#92928a', v: 0.08, pat: 'stone' },
      // 나무
      bark: { c: '#4a3a2c', v: 0.06 }, birch: { c: '#d8d6cc', v: 0.08 }, birchL: { c: '#8a9a4a', top: '#a4b05a', v: 0.1 }, birchL2: { c: '#6e7e3e', v: 0.1 },
      pine0: { c: '#4e6e44', top: '#5a7a4a', v: 0.08 }, pine1: { c: '#38563a', v: 0.08 }, pine2: { c: '#2a4430', v: 0.07 },
      pineD0: { c: '#3a5a3a', top: '#44663e', v: 0.08 }, pineD1: { c: '#2a4430', v: 0.07 }, pineD2: { c: '#1e3424', v: 0.06 },
      fern: { c: '#5a7a3a', v: 0.12 }, bushB: { c: '#3e5a32', top: '#4e6a38', v: 0.1 },
      // 통나무·목재
      logB: { c: '#5a4632', v: 0.07 }, logB2: { c: '#4a3a2a', v: 0.07 }, logEnd: { c: '#c89a60', v: 0.05 }, logPith: { c: '#9a6a3a', v: 0.04 },
      plankW: { c: '#6e6252', v: 0.06, pat: 'plank' }, plankD: { c: '#4e4438', v: 0.05, pat: 'plank' }, plankN: { c: '#c8a878', top: '#d4b484', v: 0.05, pat: 'plank' }, beam: { c: '#3e3226', v: 0.04 },
      // 지붕·쇠
      roofM: { c: '#7a7e7c', top: '#8a8e8a', v: 0.05, pat: 'plank' }, roofR: { c: '#8a5a3a', top: '#9a6440', v: 0.07, pat: 'plank' }, tar: { c: '#3a3a3a', top: '#444442', v: 0.04, pat: 'tile' },
      iron: { c: '#2e3034', v: 0.03 }, steel: { c: '#8a9298', v: 0.03 }, steelL: { c: '#c4ccd0', v: 0.02 }, rust: { c: '#7a4a2e', v: 0.08 }, rail: { c: '#5a4434', top: '#7a6a5a', v: 0.05 },
      conc: { c: '#8a8a84', top: '#9a9a94', v: 0.05, pat: 'stone' }, hazard: { c: '#d8a830', v: 0.03 }, hazardK: { c: '#2a2a2a', v: 0.02 },
      // 탈것·잡동사니
      truckG: { c: '#4a5a3a', v: 0.04 }, truckD: { c: '#36422c', v: 0.04 }, tire: { c: '#1e1e20', v: 0.03 }, glass: { c: '#3a4448', v: 0.02 },
      barrelR: { c: '#9a3a2a', v: 0.05 }, barrelO: { c: '#4e5a36', v: 0.05 }, crateG: { c: '#5a6236', v: 0.05, pat: 'plank' }, canvas: { c: '#5a6a46', v: 0.05 }, sandbag: { c: '#a4946e', v: 0.08, pat: 'stone' },
      win: { c: '#ffd890', night: true, day: '#3a4448' }, door: { c: '#4e3e30', v: 0.04, pat: 'plank' }, signW: { c: '#e4e0d4', v: 0.02 }, signR: { c: '#b03a2a', v: 0.03 },
      // 빛
      lamp: { c: '#ffe0a0', glow: true }, fire: { c: '#ff9a3a', glow: true }, ember: { c: '#ff5a2a', glow: true }, lampR: { c: '#ff4a3a', glow: true }, chem: { c: '#7aff8a', glow: true }, head: { c: '#fff4d0', glow: true },
    },
    build(w) {
      const B = w.id, G = w.base, n = w.noise;
      const lights = [], acts = [], landmarks = [];
      // 공터(타원)와 호수(남서)
      const CX = 80, CZ = 66, RX = 60, RZ = 46;
      const cd = (x, z) => Math.hypot((x - CX) / RX, (z - CZ) / RZ);
      const ld = (x, z) => Math.hypot((x - 14) / 44, (z - 136) / 28);
      MH.terrain(w, {
        floor: G - 10,
        height: (x, z) => {
          const t = MH.sstep(0.95, 1.35, cd(x, z)), nw = Math.max(0, 1 - (x + z) / 170);
          let h = G + t * ((n.fbm(x * 0.05, z * 0.05) - 0.5) * 4 + nw * 12 + 1);
          const l = ld(x, z);
          if (l < 1.3) { const k = MH.sstep(1.3, 0.85, l); h = h * (1 - k) + (G - 3 - (1 - Math.min(1, l)) * 3) * k; }
          return h;
        },
        surface: (x, z, y) => {
          const l = ld(x, z), d = cd(x, z), hh = hash3(x, 7, z);
          if (y < G - 1) return B.lakebed;
          if (l < 1.12) return B.sand;
          if (d < 1) { const g = n.fbm(x * 0.09 + 30, z * 0.09); return g > 0.62 ? (hh > 0.4 ? B.grassY : B.grass) : (d > 0.9 && hh > 0.5 ? B.grass : (hh > 0.82 ? B.dirtD : B.dirt)); }
          return hh > 0.7 ? B.moss : (hh > 0.45 ? B.grass : B.needle);
        },
        under: (x, z, y, dep) => dep < 2 ? B.soil : B.rock,
      });
      MH.water(w, G - 1, (x, z) => ld(x, z) < 1.3);
      // 흙길: 동쪽 끝에서 들어와 공터를 지나 북쪽 숲으로
      const ROAD = [[143, 100], [114, 98], [104, 88], [104, 44], [106, 18], [108, 0]];
      MH.path(w, ROAD, 2.4, B.mud, B.dirtD);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) if (MH.polyDist(x + 0.5, z + 0.5, ROAD) < 1.6 && hash3(x, 2, z) > 0.55) MH.paint(w, x, z, B.dirtD);
      const keep = [];                                                                       // 나무를 비울 자리
      const hold = (x0, z0, x1, z1) => keep.push([x0, z0, x1, z1]);

      // ── 통나무 도우미: 축을 따라 둥근 단면, 끝은 나이테 ──
      const log = (t, axis, a0, a1, u, cy, r) => {
        const R = Math.ceil(r), bk = hash3(a0, cy, u) > 0.5 ? B.logB : B.logB2;
        for (let a = a0; a <= a1; a++) for (let dy = -R; dy <= R; dy++) for (let du = -R; du <= R; du++) {
          const d = Math.hypot(dy, du);
          if (d > r) continue;
          let b = bk;
          if (a === a0 || a === a1) b = d > r - 0.6 ? bk : (d < 0.5 ? B.logPith : B.logEnd);
          if (axis === 'x') t.set(a, cy + dy, u + du, b); else t.set(u + du, cy + dy, a, b);
        }
      };
      // 통나무 더미: 아래 줄부터 하나씩 줄어드는 삼각 더미. skip(k,i)면 그 통나무를 비운다
      const pile = (axis, a0, a1, uc, rows, r, sp, skip) => {
        const out = [];
        for (let k = 0; k < rows; k++) {
          const cnt = rows - k;
          for (let i = 0; i < cnt; i++) {
            const u = uc + Math.round((i - (cnt - 1) / 2) * sp), y = G + 1 + Math.floor(r) + k * Math.round(sp * 0.8);
            const j = Math.round(hash3(u, k, a0) * 2) - 1;
            out.push([k, i, u, y]);
            if (skip && skip(k, i)) continue;
            log(w, axis, a0 + j, a1 + j, u, y, r);
          }
        }
        return out;
      };

      // ── 제재소 본 창고: 긴 판자벽, 녹슨 함석 박공지붕, 남쪽 큰 여닫이문 ──
      const SX0 = 40, SX1 = 98, SZ0 = 24, SZ1 = 38, ST = G + 9;
      hold(SX0 - 2, SZ0 - 2, SX1 + 2, SZ1 + 1);
      MH.flatten(w, SX0 - 1, SZ0 - 1, SX1 + 1, SZ1 + 1, G, B.dirtD, B.soil);
      w.box(SX0, G, SZ0, SX1, G, SZ1, B.conc);
      w.walls(SX0, G + 1, SZ0, SX1, ST, SZ1, B.plankW);
      w.walls(SX0, G + 1, SZ0, SX1, G + 1, SZ1, B.conc);
      for (let x = SX0; x <= SX1; x += 6) for (const z of [SZ0, SZ1]) w.box(x, G + 1, z, x, ST, z, B.beam);
      for (const x of [SX0, SX1]) for (let z = SZ0; z <= SZ1; z += 7) w.box(x, G + 1, z, x, ST, z, B.beam);
      w.walls(SX0, ST, SZ0, SX1, ST, SZ1, B.beam);
      const DX0 = 62, DX1 = 71, DH = G + 7;
      for (let x = SX0 + 2; x <= SX1 - 2; x += 6) { if (x >= DX0 - 2 && x <= DX1 + 1) continue; for (const z of [SZ0, SZ1]) w.box(x + 1, G + 4, z, x + 2, G + 5, z, hash3(x, 4, z) > 0.75 ? B.win : B.glass); }
      w.box(DX0, G + 1, SZ1, DX1, DH, SZ1, 0);
      w.box(DX0 - 1, DH + 1, SZ1, DX1 + 1, DH + 1, SZ1, B.beam); w.box(DX0 - 1, G + 1, SZ1, DX0 - 1, DH, SZ1, B.beam); w.box(DX1 + 1, G + 1, SZ1, DX1 + 1, DH, SZ1, B.beam);
      const rp = MH.roof(w, SX0 - 1, SX1 + 1, SZ0 - 1, SZ1 + 1, ST + 1, { b: B.roofM, eave: B.roofR, ridge: B.rust, pitch: 1, gable: B.plankW, axis: 'x' });
      for (let y = ST + 1; y <= rp; y++) for (let z = SZ0 - 1; z <= SZ1 + 1; z++) for (let x = SX0 - 1; x <= SX1 + 1; x++) if (w.get(x, y, z) === B.roofM && n.fbm(x * 0.15, z * 0.3 + y) > 0.58) w.set(x, y, z, B.roofR);
      // 동쪽 박공벽: 창과 쪽문, 경고판
      w.box(SX1, G + 11, 30, SX1, G + 12, 32, B.glass); w.box(SX1, G + 1, 33, SX1, G + 5, 34, B.door);
      w.box(SX1 + 1, G + 6, 28, SX1 + 1, G + 7, 30, B.signW); w.set(SX1 + 1, G + 7, 29, B.signR); w.set(SX1 + 1, G + 6, 29, B.signR);
      // 안: 쌓인 판재와 매단 등, 컨베이어
      for (let y = G + 1; y <= G + 4; y++) w.box(48, y, 28, 58, y, 34, y % 2 ? B.plankN : B.beam);
      w.box(74, G + 1, 30, 92, G + 2, 32, B.iron); for (let x = 74; x <= 92; x += 2) w.set(x, G + 3, 31, B.steel);
      w.box(66, ST - 1, 31, 66, ST - 1, 31, B.iron); w.set(66, ST - 2, 31, B.lamp);
      lights.push({ name: 'shed', p: [66.5, ST - 2, 33.5], c: '#ffd8a0', i: 0.3, d: 22, flicker: 0.15, srcR: 4 });
      // 여닫이문(부품): 경첩은 양 끝, 밖(남쪽)으로 열린다
      const dL = w.prop({ name: 'doorL', pivot: [DX0, G + 1, SZ1 + 0.5] }), dR = w.prop({ name: 'doorR', pivot: [DX1 + 1, G + 1, SZ1 + 0.5] });
      for (let x = DX0; x <= DX1; x++) for (let y = G + 1; y <= DH; y++) {
        const p = x < DX0 + 5 ? dL : dR, e = x === DX0 || x === DX1 || y === G + 1 || y === DH || y === G + 4;
        p.set(x, y, SZ1, e ? B.beam : B.plankD);
      }
      for (let k = 0; k < 5; k++) { dL.set(DX0 + k, G + 1 + k + 1, SZ1, B.beam); dR.set(DX1 - k, G + 1 + k + 1, SZ1, B.beam); }
      acts.push({
        name: '제재소 창고 문', hint: '판자 창고의 커다란 여닫이문이 삐걱 열리고 안쪽 등불이 켜져요', hit: [DX0, G + 1, SZ1 - 1, DX1, DH, SZ1 + 1],
        run: async a => {
          a.flash('shed', 6, 5);
          await Promise.all([a.turn('doorL', [0, -1.45, 0], 1.6), a.turn('doorR', [0, 1.45, 0], 1.6)]);
          a.burst([DX0 + 5, G + 1.5, SZ1 + 2], { n: 30, colors: ['#c8b890', '#a89a7a', '#e0d4b4'], speed: 5, up: 1.2, life: 1.4, gravity: 1, spread: 4, flat: true });
          await a.wait(2.4);
          await Promise.all([a.turn('doorL', [0, 0, 0], 1.4), a.turn('doorR', [0, 0, 0], 1.4)]);
        },
      });
      landmarks.push({ name: '슈투르만의 제재소', note: '보스 슈투르만 · 호위병 2~3명', p: [SX0 + 29.5, rp + 8, 31.5], boss: true });

      // ── 톱날 작업장: 본 창고 남쪽에 붙은 기둥 지붕, 둥근 톱날, 남쪽으로 뻗은 운반 레일 ──
      const KX0 = 76, KX1 = 96, KZ1 = 51;
      hold(KX0 - 1, SZ1, KX1 + 1, KZ1 + 1);
      for (let z = SZ1 + 1; z <= KZ1 + 1; z++) { const y = ST + 1 - Math.floor((z - SZ1) / 4); for (let x = KX0 - 1; x <= KX1 + 1; x++) w.set(x, y, z, (z === KZ1 + 1) ? B.roofR : (n.fbm(x * 0.2, z * 0.2) > 0.6 ? B.roofR : B.roofM)); }
      for (let x = KX0; x <= KX1; x += 5) { const y = ST + 1 - Math.floor((KZ1 - SZ1) / 4); w.box(x, G + 1, KZ1, x, y - 1, KZ1, B.beam); }
      w.box(KX0, ST - 2, KZ1, KX1, ST - 2, KZ1, B.beam);
      for (let z = SZ1 + 1; z <= KZ1; z++) for (let x = KX0; x <= KX1; x++) MH.paint(w, x, z, hash3(x, 1, z) > 0.3 ? B.sawdust : B.dirt);
      // 톱 받침대(가운데 홈에 톱날)
      const BLX = 86, BLY = G + 4, BLZ = 45;
      w.box(83, G + 1, 41, 89, G + 3, 49, B.iron); w.box(BLX, G + 1, 41, BLX, G + 3, 49, 0);
      w.box(83, G + 3, 41, 89, G + 3, 49, B.steel); w.box(BLX, G + 3, 41, BLX, G + 3, 49, 0);
      w.box(79, G + 1, 42, 81, G + 4, 46, B.truckD); w.set(80, G + 5, 44, B.iron);                         // 모터 함
      w.box(82, G + 2, 43, 82, G + 2, 44, B.iron);
      w.box(91, G + 1, 41, 91, ST - 3, 41, B.beam); w.box(BLX, ST - 3, 41, 91, ST - 3, 41, B.beam); w.set(BLX, ST - 4, 41, B.lamp);
      lights.push({ name: 'saw', p: [BLX + 0.5, ST - 4, 42.5], c: '#ffe0b0', i: 0.35, d: 18, flicker: 0.1, srcR: 3 });
      w.box(KX1, G + 4, KZ1 - 1, KX1, G + 5, KZ1 - 1, B.hazard); w.set(KX1, G + 6, KZ1 - 1, B.hazardK);
      const blade = w.prop({ name: 'blade', pivot: [BLX + 0.5, BLY + 0.5, BLZ + 0.5], axis: 'x', speed: 0.2 });
      for (let dy = -4; dy <= 4; dy++) for (let dz = -4; dz <= 4; dz++) {
        const d = Math.hypot(dy, dz);
        if (d > 3.4) continue;
        const ang = Math.round((Math.atan2(dy, dz) / TAU + 1) * 16) % 2;
        blade.set(BLX, BLY + dy, BLZ + dz, d < 1 ? B.iron : (d > 2.7 ? (ang ? B.steelL : B.iron) : B.steel));
      }
      // 레일과 침목
      for (let z = KZ1 + 1; z <= 96; z++) {
        if (z % 2 === 0) for (let x = 83; x <= 89; x++) MH.paint(w, x, z, B.beam);
        w.set(84, G + 1, z, B.rail); w.set(88, G + 1, z, B.rail);
      }
      w.box(83, G + 1, 97, 89, G + 2, 97, B.beam); w.set(83, G + 3, 97, B.hazard); w.set(89, G + 3, 97, B.hazard);
      hold(82, KZ1, 90, 98);
      // 운반 수레(부품): 통나무 하나를 싣고 레일 위에서 톱날로 들어간다
      const CZ0 = 62, CZ1 = 68;
      const cart = w.prop({ name: 'cart', pivot: [86.5, G + 1, (CZ0 + CZ1 + 1) / 2] });
      cart.box(83, G + 2, CZ0, 89, G + 2, CZ1, B.plankD);
      for (const z of [CZ0 + 1, CZ1 - 1]) for (const x of [83, 89]) cart.box(x, G + 1, z - 1, x, G + 1, z, B.tire);
      for (const z of [CZ0, CZ1]) { cart.set(83, G + 3, z, B.iron); cart.set(89, G + 3, z, B.iron); }
      log(cart, 'z', CZ0 - 2, CZ1 + 2, BLX, G + 5, 2.3);
      acts.push({
        name: '둥근 톱날', hint: '운반 수레가 통나무를 밀어 넣고, 둥근 톱날이 윙 돌며 톱밥을 흩뿌려요', hit: [83, G + 1, 41, 89, G + 7, CZ1 + 2],
        run: async a => {
          a.flash('saw', 5, 6);
          const spin = a.turn('blade', [-TAU * 10, 0, 0], 5.5, t => t);
          await a.move('cart', [0, 0, -9], 2);
          for (let k = 0; k < 10; k++) { a.burst([BLX + 0.5, BLY + 1, BLZ + 4], { n: 18, colors: ['#e0c48a', '#c8a870', '#f4e4c0'], speed: 4, up: 3.5, life: 1.2, gravity: 6, spread: 1 }); await a.wait(0.3); }
          await spin; a.unwind('blade');
          await a.move('cart', [0, 0, 0], 2.2);
        },
      });
      landmarks.push({ name: '톱날 작업장', note: '둥근 톱 · 통나무 운반 레일', p: [86.5, ST + 6, 45.5] });
      // 톱밥 무더기
      MH.cone(w, 76, 58, G + 1, 4.2, B.sawdust, 0.9);
      hold(71, 53, 81, 63);

      // ── 통나무 더미 ①(북서, 가장 큼): 맨 위 통나무는 굴러 내려오는 부품 ──
      const P1 = pile('x', 44, 70, 63, 4, 2.3, 5, (k) => k === 3);
      hold(42, 52, 72, 74);
      const top = P1.find(q => q[0] === 3).slice(); top[3] += 1;
      const roll = w.prop({ name: 'roll', pivot: [57.5, top[3] + 0.5, top[2] + 0.5] });
      log(roll, 'x', 45, 69, top[2], top[3], 2.3);
      acts.push({
        name: '통나무 더미 굴러내림', hint: '쌓아 둔 통나무 더미 맨 위의 통나무가 쿵쿵 굴러 남쪽 공터로 떨어져요', hit: [44, top[3] - 2, top[2] - 2, 70, top[3] + 2, top[2] + 2],
        run: async a => {
          const dy = G + 3 - top[3];
          await a.tween('roll', { off: [0, -3, 5], rot: [2.2, 0, 0] }, 0.6, t => t * t);
          await a.tween('roll', { off: [0, -8, 10], rot: [4.4, 0, 0] }, 0.5, t => t);
          await a.tween('roll', { off: [0, dy, 15], rot: [6.6, 0, 0] }, 0.5, t => t);
          a.burst([57.5, G + 1, top[2] + 17], { n: 50, colors: ['#8a7a5a', '#a89a78', '#6a5a40'], speed: 7, up: 1.5, life: 1.4, gravity: 3, spread: 10, flat: true });
          await a.tween('roll', { off: [0, dy, 19], rot: [8.3, 0, 0] }, 0.8);
          await a.wait(1.6);
          await a.tween('roll', { scl: [0, 0, 0] }, 0.3);
          await a.tween('roll', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.05);
          await a.tween('roll', { scl: [1, 1, 1] }, 0.5);
        },
      });
      // 통나무 더미 ②(남서), ③(레일 옆, 세로)
      pile('x', 44, 62, 90, 3, 2.3, 5); hold(42, 82, 64, 98);
      pile('z', 60, 82, 95, 2, 2.3, 5); hold(90, 58, 100, 84);

      // ── 슈투르만의 은닉처: 남쪽 통나무 더미 밑, 위 통나무가 덮어 준 자리에 감춘 상자 ──
      log(w, 'x', 62, 78, 100, G + 3, 2.3); log(w, 'x', 63, 78, 105, G + 3, 2.3); log(w, 'x', 62, 85, 103, G + 7, 2.3);
      hold(60, 96, 88, 109);
      w.box(80, G + 1, 101, 83, G + 2, 104, B.crateG); w.box(80, G + 2, 101, 83, G + 2, 101, B.beam);
      w.set(85, G + 1, 102, B.chem); w.set(84, G + 1, 104, B.iron);
      const lid = w.prop({ name: 'stash', pivot: [81.5, G + 3, 102.5] });
      lid.box(80, G + 3, 101, 83, G + 3, 104, B.crateG); lid.box(80, G + 3, 102, 83, G + 3, 102, B.beam);
      // 위 통나무와 겹치지 않게 뚜껑 자리를 비운다(통나무는 G+5부터)
      lights.push({ name: 'stash', p: [85.5, G + 2, 102.5], c: '#7aff8a', i: 0.3, d: 12, flicker: 0.1, srcR: 3 });
      acts.push({
        name: '슈투르만의 은닉처', hint: '통나무 더미 밑에 감춰 둔 상자 뚜껑이 밀려 열리고, 초록 형광봉 빛 아래 전리품이 반짝여요', hit: [80, G + 1, 101, 85, G + 3, 104],
        run: async a => {
          a.flash('stash', 8, 5);
          await a.move('stash', [0, 0.6, 0], 0.4);
          await a.move('stash', [4.5, 0.6, 0], 1);
          await a.move('stash', [4.5, -1.4, 0], 0.3);
          for (let k = 0; k < 6; k++) { a.burst([81.5 + (k % 2), G + 3, 102.5], { n: 14, colors: ['#ffe08a', '#7aff8a', '#ffffff'], speed: 1.4, up: 4, life: 1.2, gravity: 3, spread: 1 }); await a.wait(0.4); }
          await a.wait(0.6);
          await a.move('stash', [4.5, 0.6, 0], 0.3);
          await a.move('stash', [0, 0.6, 0], 1);
          await a.move('stash', [0, 0, 0], 0.3);
        },
      });
      landmarks.push({ name: '슈투르만의 은닉처', note: '은닉처 열쇠로 여는 통나무 밑 상자', p: [82.5, G + 14, 102.5] });

      // ── 통나무 크레인: 노란 격자 기둥, 남쪽으로 뻗은 팔 끝에 통나무가 매달려 있다 ──
      const MX = 76, MZ = 80, MT = G + 22;
      hold(MX - 3, MZ - 3, MX + 3, MZ + 3);
      w.box(MX - 2, G + 1, MZ - 2, MX + 2, G + 1, MZ + 2, B.conc);
      for (let y = G + 2; y <= MT; y++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
        const corner = Math.abs(dx) === 1 && Math.abs(dz) === 1, brace = (Math.abs(dx) === 1 || Math.abs(dz) === 1) && ((y + dx + dz) % 4 === 0);
        if (corner) w.set(MX + dx, y, MZ + dz, ((y - G) >> 2) % 2 ? B.hazard : B.hazardK);
        else if (brace) w.set(MX + dx, y, MZ + dz, B.hazard);
      }
      w.box(MX - 1, MT, MZ - 1, MX + 1, MT, MZ + 1, B.iron);
      const crane = w.prop({ name: 'crane', pivot: [MX + 0.5, MT + 1, MZ + 0.5] });
      crane.box(MX - 1, MT + 1, MZ - 1, MX + 1, MT + 1, MZ + 1, B.iron);
      crane.box(MX - 1, MT + 2, MZ - 1, MX + 1, MT + 4, MZ + 1, B.hazard); crane.box(MX - 1, MT + 3, MZ + 1, MX + 1, MT + 3, MZ + 1, B.glass);   // 조종실
      for (let z = MZ - 6; z <= MZ + 13; z++) { crane.set(MX, MT + 5, z, z % 3 ? B.hazard : B.hazardK); if (z > MZ + 1) crane.set(MX, MT + 2 + ((z - MZ) % 3 === 0 ? 2 : 0) + 1, z, B.hazard); }
      crane.box(MX - 1, MT + 2, MZ - 6, MX + 1, MT + 4, MZ - 4, B.conc);                                                                     // 평형추
      crane.box(MX, MT + 6, MZ, MX, MT + 8, MZ, B.iron); crane.line(MX, MT + 8, MZ, MX, MT + 5, MZ + 12, B.iron); crane.line(MX, MT + 8, MZ, MX, MT + 5, MZ - 6, B.iron);
      const HZ = MZ + 12, HY = G + 9;
      crane.box(MX, HY + 2, HZ, MX, MT + 4, HZ, B.iron); crane.box(MX - 1, HY + 1, HZ, MX + 1, HY + 1, HZ, B.iron);
      crane.set(MX - 5, HY, HZ, B.iron); crane.set(MX + 5, HY, HZ, B.iron); crane.line(MX - 1, HY + 1, HZ, MX - 5, HY, HZ, B.iron); crane.line(MX + 1, HY + 1, HZ, MX + 5, HY, HZ, B.iron);
      log(crane, 'x', MX - 7, MX + 7, HZ, HY - 2, 1.6);
      hold(MX - 8, HZ - 3, MX + 8, HZ + 3);
      acts.push({
        name: '통나무 크레인', hint: '노란 크레인 팔이 매단 통나무를 들고 빙 돌아 서쪽 더미 쪽으로 옮겨요', hit: [MX - 7, HY - 4, HZ - 2, MX + 7, MT + 8, HZ + 2],
        run: async a => {
          await a.turn('crane', [0, -1.7, 0], 3);
          a.burst([MX - 11.5, HY - 3, MZ + 0.5], { n: 26, colors: ['#a89a78', '#e0d4b4'], speed: 3, up: 1, life: 1.2, gravity: 2, spread: 4, flat: true });
          await a.wait(1);
          await a.turn('crane', [0, 0, 0], 3);
        },
      });
      landmarks.push({ name: '통나무 크레인', note: '노란 격자 기둥 · 매달린 통나무', p: [MX + 0.5, MT + 14, MZ + 0.5] });

      // ── 판자 막사(서쪽): 슈투르만이 몸을 숨기는 나무 막사, 함석 굴뚝 ──
      const BX0 = 28, BX1 = 40, BZ0 = 50, BZ1 = 80, BT = G + 6;
      hold(BX0 - 2, BZ0 - 2, BX1 + 2, BZ1 + 2);
      MH.flatten(w, BX0 - 1, BZ0 - 1, BX1 + 1, BZ1 + 1, G, B.dirtD, B.soil);
      w.walls(BX0, G + 1, BZ0, BX1, BT, BZ1, B.plankD);
      w.walls(BX0, G + 1, BZ0, BX1, G + 1, BZ1, B.conc);
      for (let z = BZ0 + 2; z <= BZ1 - 2; z += 5) { if (z >= 62 && z <= 67) continue; w.box(BX1, G + 3, z, BX1, G + 4, z + 1, hash3(z, 1, 1) > 0.6 ? B.win : B.glass); w.box(BX0, G + 3, z, BX0, G + 4, z + 1, B.glass); }
      w.box(BX1, G + 1, 64, BX1, G + 4, 65, B.door); w.box(BX1 + 1, G, 63, BX1 + 2, G, 66, B.plankN);
      const bp = MH.roof(w, BX0 - 1, BX1 + 1, BZ0 - 1, BZ1 + 1, BT + 1, { b: B.tar, eave: B.plankD, ridge: B.iron, pitch: 1, gable: B.plankD, axis: 'z' });
      w.box(31, G + 1, 56, 31, bp + 1, 56, B.iron); w.set(31, bp + 2, 56, B.rust);
      for (const z of [BZ0, BZ1]) w.box(33, G + 9, z, 35, G + 10, z, B.glass);

      // ── 모닥불: 막사 앞, 통나무 의자 ──
      const FX = 34, FZ = 92;
      hold(FX - 5, FZ - 5, FX + 5, FZ + 5);
      w.ring(FX, FZ, G + 1, 1.2, 2.4, B.stone); w.set(FX, G + 1, FZ, B.fire); w.set(FX, G + 2, FZ, B.ember); w.set(FX + 1, G + 1, FZ, B.ember); w.set(FX, G + 1, FZ + 1, B.logB2);
      log(w, 'x', FX - 3, FX + 3, FZ - 5, G + 1, 0.9); log(w, 'z', FZ - 3, FZ + 3, FX + 5, G + 1, 0.9);
      w.box(FX - 4, G + 1, FZ + 3, FX - 4, G + 2, FZ + 3, B.barrelO);
      lights.push({ name: 'fire', p: [FX + 0.5, G + 3, FZ + 0.5], c: '#ff9a4a', i: 0.55, d: 20, flicker: 0.55, srcR: 3 });
      // 천막(초록 캔버스)과 탄약 상자
      for (let x = 30; x <= 38; x++) for (let k = 0; k <= 3; k++) { w.set(x, G + 1 + k, 41 + k, B.canvas); w.set(x, G + 1 + k, 47 - k, B.canvas); }
      w.box(30, G + 1, 44, 30, G + 4, 44, B.canvas); w.box(38, G + 5, 44, 30, G + 5, 44, B.beam); w.box(30, G + 1, 42, 30, G + 3, 46, B.canvas);
      hold(29, 40, 39, 48);
      for (const [x, z] of [[42, 44], [42, 46], [44, 45]]) w.box(x, G + 1, z, x + 1, G + 1, z, B.crateG);

      // ── 감시탑 두 개(북서·북동): 나무 기둥, 가새, 판자 난간, 뾰족 지붕 ──
      const tower = (x0, z0, h) => {
        let gy = 99;
        for (const [dx, dz] of [[0, 0], [4, 0], [0, 4], [4, 4]]) gy = Math.min(gy, MH.g(w, x0 + dx, z0 + dz));
        const py = gy + h;
        for (const [dx, dz] of [[0, 0], [4, 0], [0, 4], [4, 4]]) w.box(x0 + dx, MH.g(w, x0 + dx, z0 + dz) + 1, z0 + dz, x0 + dx, py + 5, z0 + dz, B.beam);
        for (let s = 0; s < 2; s++) { const y0 = gy + 1 + s * Math.floor(h / 2), y1 = gy + (s + 1) * Math.floor(h / 2);
          w.line(x0, y0, z0 + 4, x0 + 4, y1, z0 + 4, B.plankD); w.line(x0 + 4, y0, z0, x0 + 4, y1, z0 + 4, B.plankD); w.line(x0 + 4, y0, z0, x0, y1, z0, B.plankD); w.line(x0, y0, z0, x0, y1, z0 + 4, B.plankD); }
        w.box(x0 - 1, py, z0 - 1, x0 + 5, py, z0 + 5, B.plankW);
        w.walls(x0 - 1, py + 1, z0 - 1, x0 + 5, py + 2, z0 + 5, B.plankW);
        for (let y = gy + 1; y < py; y += 2) w.set(x0 + 2, y, z0 + 5, B.beam);
        w.box(x0 + 1, py + 1, z0 + 5, x0 + 3, py + 1, z0 + 5, B.sandbag);
        const rt = MH.pyramid(w, x0 - 2, z0 - 2, x0 + 6, z0 + 6, py + 6, B.roofM, 1, B.roofR);
        return { py, rt };
      };
      const T1 = tower(26, 28, 16), T2 = tower(124, 22, 15);
      hold(22, 24, 33, 35); hold(120, 18, 131, 29);
      w.set(126, T2.py + 4, 24, B.lampR); w.set(126, T2.py + 5, 24, B.iron);
      lights.push({ name: 'flare', p: [126.5, T2.py + 4, 24.5], c: '#ff5a3a', i: 0.4, d: 26, flicker: 0.3, srcR: 3 });
      landmarks.push({ name: '감시탑', note: '호위병 저격 자리', p: [126.5, T2.rt + 6, 24.5] });
      acts.push({
        name: '신호탄', hint: '북동쪽 감시탑에서 붉은 신호탄이 하늘 높이 솟아 숲 위를 붉게 비춰요', hit: [123, T2.py, 21, 129, T2.py + 6, 27],
        run: async a => {
          for (let k = 0; k < 8; k++) { a.burst([126.5, T2.py + 3 + k * 4, 24.5], { n: 6, colors: ['#ffb060', '#ff6a3a'], speed: 0.4, up: 2, life: 0.8, gravity: 1, spread: 0.3 }); await a.wait(0.08); }
          a.flash('flare', 9, 5); a.lightning(0.25);
          a.burst([126.5, T2.py + 36, 24.5], { n: 90, colors: ['#ff3a2a', '#ff8a5a', '#ffd0a0'], speed: 6, up: 1, life: 3.4, gravity: 0.5, spread: 1.5 });
          for (let k = 0; k < 8; k++) { a.burst([126.5 - k * 0.6, T2.py + 34 - k * 2.4, 24.5 + k * 0.4], { n: 8, colors: ['#ff4a3a', '#c8c0b8'], speed: 0.6, up: -0.4, life: 2.2, gravity: 0.5, spread: 0.6 }); await a.wait(0.4); }
        },
      });

      // ── 북쪽 큰길 입구: 모래주머니 진지와 고정 기관총(NSV 우툐스) ──
      const NX = 110, NZ = 34;
      hold(NX - 2, NZ - 2, NX + 7, NZ + 5);
      for (let x = NX; x <= NX + 5; x++) for (let z = NZ; z <= NZ + 3; z++) if (x === NX || x === NX + 5 || z === NZ + 3) w.box(x, G + 1, z, x, G + (z === NZ + 3 ? 2 : 3), z, B.sandbag);
      w.box(NX + 2, G + 1, NZ + 1, NX + 2, G + 3, NZ + 1, B.iron); w.box(NX + 2, G + 4, NZ, NX + 2, G + 4, NZ + 5, B.iron); w.set(NX + 2, G + 5, NZ + 1, B.iron); w.box(NX + 1, G + 4, NZ - 1, NX + 3, G + 4, NZ - 1, B.truckD);

      // ── 작은 사무소(동쪽): 판자 오두막, 현관 등 ──
      const OX0 = 112, OX1 = 122, OZ0 = 50, OZ1 = 60;
      hold(OX0 - 2, OZ0 - 2, OX1 + 2, OZ1 + 4);
      MH.flatten(w, OX0 - 1, OZ0 - 1, OX1 + 1, OZ1 + 3, G, B.dirtD, B.soil);
      w.walls(OX0, G + 1, OZ0, OX1, G + 6, OZ1, B.plankW); w.walls(OX0, G + 1, OZ0, OX1, G + 1, OZ1, B.conc);
      w.box(116, G + 1, OZ1, 117, G + 4, OZ1, B.door); w.box(OX0 + 1, G + 3, OZ1, OX0 + 2, G + 4, OZ1, B.win); w.box(OX1 - 2, G + 3, OZ1, OX1 - 1, G + 4, OZ1, B.glass); w.box(OX1, G + 3, 53, OX1, G + 4, 56, B.glass);
      w.box(OX0, G, OZ1 + 1, OX1, G, OZ1 + 3, B.plankN); for (const x of [OX0, OX1]) w.box(x, G + 1, OZ1 + 3, x, G + 6, OZ1 + 3, B.beam);
      MH.roof(w, OX0 - 1, OX1 + 1, OZ0 - 1, OZ1 + 3, G + 7, { b: B.roofR, eave: B.rust, ridge: B.iron, pitch: 1, gable: B.plankW, axis: 'z' });
      w.set(115, G + 5, OZ1 + 1, B.lamp);
      lights.push({ p: [115.5, G + 5, OZ1 + 2], c: '#ffd890', i: 0.3, d: 14, flicker: 0.1, srcR: 3 });
      for (const [x, z, b] of [[110, 52, B.barrelR], [110, 54, B.barrelR], [109, 57, B.barrelO], [124, 58, B.barrelR]]) w.box(x, G + 1, z, x, G + 3, z, b);

      // ── 판재 더미: 막대 받침 위에 층층이 ──
      const boards = (x0, z0, x1, z1, layers) => {
        for (let k = 0; k < layers; k++) {
          const y = G + 1 + k * 2;
          for (let z = z0; z <= z1; z += 3) w.box(x0, y, z, x1, y, z, B.beam);
          w.box(x0, y + 1, z0, x1, y + 1, z1, B.plankN);
        }
      };
      boards(110, 66, 121, 72, 4); boards(110, 77, 120, 82, 3); boards(92, 86, 100, 92, 2);
      hold(108, 64, 123, 84); hold(90, 84, 102, 94);

      // ── 낡은 원목 트럭(부품): 동쪽 길 위, 초록 캡, 통나무를 실은 짐칸 ──
      const TZ = 98, TX0 = 110, TX1 = 134;
      hold(TX0 - 4, TZ - 4, TX1 + 4, TZ + 9);
      for (let z = TZ - 3; z <= TZ + 3; z++) for (let x = TX0 - 1; x <= TX1 + 2; x++) if (MH.g(w, x, z) > G) MH.setH(w, x, z, G, B.mud, B.soil);
      const truck = w.prop({ name: 'truck', pivot: [122.5, G + 1, TZ + 0.5] });
      for (const wx of [113, 118, 129]) for (const z of [TZ - 2, TZ + 2]) truck.box(wx, G + 1, z, wx + 2, G + 3, z, B.tire);
      truck.box(TX0 + 1, G + 3, TZ - 1, TX1 - 1, G + 3, TZ + 1, B.iron);
      truck.box(126, G + 4, TZ - 2, 130, G + 9, TZ + 2, B.truckG); truck.box(126, G + 10, TZ - 2, 130, G + 10, TZ + 2, B.truckD);
      truck.box(130, G + 7, TZ - 1, 130, G + 8, TZ + 1, B.glass); for (const z of [TZ - 2, TZ + 2]) truck.box(127, G + 7, z, 129, G + 8, z, B.glass);
      truck.box(131, G + 4, TZ - 2, 133, G + 6, TZ + 2, B.truckG); truck.box(131, G + 7, TZ - 1, 133, G + 7, TZ + 1, B.truckD);
      truck.box(134, G + 4, TZ - 1, 134, G + 6, TZ + 1, B.iron); truck.set(134, G + 5, TZ - 2, B.head); truck.set(134, G + 5, TZ + 2, B.head);
      truck.box(135, G + 3, TZ - 2, 135, G + 3, TZ + 2, B.iron);
      for (const z of [TZ - 2, TZ + 2]) truck.box(131, G + 4, z, 133, G + 4, z, B.truckD);
      truck.box(125, G + 4, TZ + 2, 125, G + 12, TZ + 2, B.iron);
      truck.box(TX0 + 1, G + 4, TZ - 2, 124, G + 4, TZ + 2, B.plankD);
      for (const x of [112, 118, 124]) for (const z of [TZ - 2, TZ + 2]) truck.box(x, G + 5, z, x, G + 9, z, B.iron);
      log(truck, 'x', TX0 - 1, 124, TZ - 1, G + 6, 1.5); log(truck, 'x', TX0, 123, TZ + 1, G + 6, 1.5); log(truck, 'x', TX0 + 1, 124, TZ, G + 8, 1.5);
      lights.push({ name: 'truck', p: [136, G + 5, TZ + 0.5], c: '#fff0c8', i: 0.25, d: 20, flicker: 0.05, srcR: 3 });
      acts.push({
        name: '낡은 트럭 시동', hint: '원목 트럭에 시동이 걸려 차체가 덜컹이고, 전조등이 켜지며 굴뚝에서 검은 연기가 뿜어져요', hit: [TX0, G + 1, TZ - 2, TX1 + 1, G + 12, TZ + 2],
        run: async a => {
          a.flash('truck', 10, 6);
          for (let k = 0; k < 12; k++) {
            a.burst([125.5, G + 13, TZ + 2.5], { n: 12, colors: ['#4a4a48', '#2e2e2e', '#7a7a76'], speed: 1, up: 3.5, life: 2, gravity: -0.6, spread: 0.6 });
            await a.move('truck', [0, 0.35, 0], 0.09); await a.move('truck', [0, 0, 0], 0.09);
            await a.wait(0.25);
          }
          await a.move('truck', [3, 0, 0], 1.2);
          await a.wait(1);
          await a.move('truck', [0, 0, 0], 1.6);
        },
      });

      // ── 호숫가: 나무 잔교와 보트 ──
      w.box(42, G, 117, 54, G, 119, B.plankN); for (const x of [42, 46, 50]) for (const z of [117, 119]) w.box(x, G - 4, z, x, G - 1, z, B.beam);
      w.box(34, G - 1, 121, 41, G - 1, 123, B.plankD); w.box(34, G, 121, 41, G, 121, B.plankW); w.box(34, G, 123, 41, G, 123, B.plankW); w.box(34, G, 122, 34, G, 122, B.plankW); w.box(41, G, 122, 41, G, 122, B.plankW); w.set(42, G, 122, B.plankW);
      w.box(37, G, 122, 37, G, 122, B.beam);
      hold(30, 112, 58, 126);
      landmarks.push({ name: '호숫가 보트', note: '보트 탈출구 · 큰 호수', p: [38, G + 6, 122] });

      // ── 숲: 북·서는 빽빽하고 어두운 소나무, 남동쪽은 성글게. 공터 가장자리엔 자작나무 ──
      const blocked = (x, z, r) => keep.some(([x0, z0, x1, z1]) => x > x0 - r && x < x1 + r && z > z0 - r && z < z1 + r);
      const LD = [B.pineD0, B.pineD1, B.pineD2], LN = [B.pine0, B.pine1, B.pine2], LB2 = [B.birchL, B.birchL2, B.birchL2];
      for (let gz = 0; gz < D; gz += 6) for (let gx = 0; gx < W; gx += 6) {
        const x = gx + w.ri(0, 5), z = gz + w.ri(0, 5), d = cd(x, z);
        if (x < 1 || z < 1 || x > W - 2 || z > D - 2) continue;
        if (ld(x, z) < 1.18 || MH.polyDist(x, z, ROAD) < 5) continue;
        const se = (x + z) / (W + D), north = z < 30 || x < 30;
        let p = MH.sstep(0.92, 1.12, d);
        if (se > 0.72) p *= 0.25; else if (se > 0.62) p *= 0.6;
        if (d < 1 && d > 0.88 && w.chance(0.12)) p = 0.9;                                    // 공터 가장자리 몇 그루
        if (!w.chance(p) || blocked(x, z, 4)) continue;
        const y = MH.g(w, x, z) + 1;
        if (y < G) continue;
        if (!north && d < 1.25 && w.chance(0.25)) { MH.tree(w, x, y, z, { kind: 'oak', h: w.ri(9, 12), bark: B.birch, leaves: LB2, r: 2.6, trunkR: 0.6, spread: 2.5, branches: 3 }); continue; }
        const big = north && se < 0.5;
        MH.tree(w, x, y, z, { kind: 'pine', h: big ? w.ri(17, 25) : (se > 0.62 ? w.ri(10, 14) : w.ri(13, 19)), r: big ? w.r(3.8, 4.8) : w.r(3, 4), bark: B.bark, leaves: (north || w.chance(0.4)) ? LD : LN });
      }
      // 숲 바닥: 고사리·덤불, 공터: 풀포기와 잔가지
      MH.scatter(w, 1600, (x, g, z, b) => {
        if (blocked(x, z, 1)) return;
        if (b === B.needle || b === B.moss) { if (hash3(x, 3, z) > 0.7) MH.bush(w, x, g + 1, z, 1.4, [B.bushB, B.bushB]); else w.set(x, g + 1, z, B.fern); }
        else if (b === B.grass || b === B.grassY) { if (hash3(x, 9, z) > 0.6) w.set(x, g + 1, z, B.fern); }
      });
      for (let i = 0; i < 18; i++) { const x = w.ri(6, W - 8), z = w.ri(6, 40); if (cd(x, z) > 1.1 && !blocked(x, z, 3)) MH.rock(w, x, MH.g(w, x, z), z, w.r(1.5, 2.6), B.rock, B.moss); }

      // ── 새떼: 북쪽 숲 우듬지에서 날아오른다 ──
      const nests = [[30, 12], [58, 10], [86, 12], [112, 10], [14, 52], [16, 84]].map(([x, z]) => [x + 0.5, Math.max(G + 18, w.top(x, z) + 7), z + 0.5]);
      acts.push({
        name: '숲의 새떼', hint: '총소리에 놀란 새떼가 북쪽 소나무 숲 위로 한꺼번에 날아오르고 안개가 밀려와요', hit: [24, G + 14, 6, 120, G + 30, 18],
        run: async a => {
          a.wind(2.4, 4);
          for (const p of nests) { a.burst(p, { n: 22, colors: ['#2a2a2c', '#3e3a36', '#1e1e20'], speed: 7, up: 5, life: 2.6, gravity: -0.8, spread: 3 }); await a.wait(0.35); }
          for (const p of nests) a.burst([p[0], G + 3, p[2] + 14], { n: 18, colors: ['#e4e6de', '#d0d4cc'], speed: 6, up: 0.3, life: 2.4, gravity: 0, spread: 6, flat: true });
          await a.wait(1.5);
        },
      });

      // 공터 잡동사니: 드럼통, 팔레트, 나뭇가지
      for (const [x, z, b] of [[100, 40, B.barrelR], [100, 42, B.barrelO], [99, 44, B.barrelR], [72, 44, B.barrelO], [26, 86, B.barrelR], [46, 80, B.barrelO]]) if (!w.get(x, G + 1, z)) w.box(x, G + 1, z, x, G + 3, z, b);
      for (const [x, z] of [[96, 66], [60, 46], [128, 76]]) { w.box(x, G + 1, z, x + 3, G + 1, z + 3, B.beam); w.box(x, G + 2, z, x + 3, G + 2, z + 3, B.plankW); }
      return { lights, landmarks, acts };
    },
  });
})();
