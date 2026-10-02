// 삼림 — 제재소: 우즈 남쪽 큰 호수 바로 북쪽의 숲속 공터. 서쪽에 줄지은 녹슨 붉은 철골 창고들과 회색 창고, 가운데 자갈길 사이 풀섬(은닉처), 통나무 옹벽과 집게 크레인 트럭, 주황 원목 트럭 (슈투르만의 영역)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 144, D = 144, Hh = 96, TAU = Math.PI * 2;
  MAPS.push({
    id: 'woods', cat: 'tarkov', name: '삼림', en: 'Woods · Sawmill', color: '#5a7a4a', seed: 604, base: 20, time: 'day', size: [W, D, Hh],
    desc: '프리오제르스크 자연보호구역 깊은 숲, 큰 호수 바로 북쪽의 낡은 제재소. 서쪽에는 녹슨 붉은 철골 창고들이 남북으로 줄지어 서 있고, 가운데에는 자갈길이 풀섬을 감싸며 얽혀 있다. 회색 통나무가 곳곳에 쌓여 있고, 북쪽 통나무 옹벽 앞에는 집게 크레인 트럭이 선다. 이곳은 저격수 보스 슈투르만과 호위병들의 영역 — 그들은 멀리서 먼저 쏜다.',
    info: { title: '구역 정보', en: 'WOODS', rows: [['위치', '우즈 남쪽 · 큰 호수 북쪽 제재소'], ['보스', '슈투르만 · 호위병 2~3명'], ['열쇠', '슈투르만의 은닉처 열쇠 · 가운데 풀섬'], ['탈출', '남서쪽 호숫가 보트']] },
    sky: ['#c6ccc4', '#86928c', '#e4e6dc'], stars: false,
    hemi: ['#dfe6dc', '#3a4232', 0.64], sun: ['#eef0e6', 0.52, [0.5, 1, 0.55]],
    liquid: ['#3e5458', '#5e7a7c', '#b4c6c4'], liqSpeed: 0.35,
    fog: { start: 0.86, floor: 12, depth: 8, haze: [26, 0.24, 7], hazeColor: '#c8ccc4' },
    camY: -4, zoom: 1.05,
    particles: [
      { n: 46, colors: ['#dfe2da', '#c8ccc4'], mode: 'wisp', speed: 0.5, size: 3, y0: 21, glow: false },
      { n: 90, colors: ['#8a9a72', '#c8c0a4', '#6a7a5a'], mode: 'drift', speed: 0.3, wind: 0.4, y0: 24, y1: 64, glow: false },
      { n: 16, colors: ['#ffb060', '#ff7a3a'], mode: 'rise', speed: 0.5, area: [51.5, 104.5, 1.2], y0: 22, y1: 30, glow: true },
    ],
    blocks: {
      // 땅
      grass: { c: '#4a5a34', top: '#5e7040', v: 0.1 }, grassY: { c: '#6a6a3e', top: '#8a8650', v: 0.1 }, needle: { c: '#4a4232', top: '#5a5036', v: 0.12 }, moss: { c: '#3e5030', top: '#4e6436', v: 0.1 },
      gravel: { c: '#8a8070', top: '#aca290', v: 0.08 }, gravelD: { c: '#7a7060', top: '#968a76', v: 0.07 }, dirt: { c: '#5e4c36', top: '#76603e', v: 0.08 }, sawdust: { c: '#b89868', top: '#d0b07a', v: 0.08 },
      sand: { c: '#8a7c60', top: '#a0906c', v: 0.07 }, lakebed: { c: '#3e3a30', v: 0.06 }, soil: { c: '#4a3c2c', v: 0.08 }, rock: { c: '#6e6e68', v: 0.06, pat: 'stone' }, stone: { c: '#7e7e76', top: '#92928a', v: 0.08, pat: 'stone' },
      // 나무
      bark: { c: '#4a3a2c', v: 0.06 }, birch: { c: '#d8d6cc', v: 0.08 }, birchL: { c: '#8a9a4a', top: '#a4b05a', v: 0.1 }, birchL2: { c: '#6e7e3e', v: 0.1 },
      pine0: { c: '#4e6e44', top: '#5a7a4a', v: 0.08 }, pine1: { c: '#38563a', v: 0.08 }, pine2: { c: '#2a4430', v: 0.07 },
      pineD0: { c: '#3a5a3a', top: '#44663e', v: 0.08 }, pineD1: { c: '#2a4430', v: 0.07 }, pineD2: { c: '#1e3424', v: 0.06 },
      fern: { c: '#5a7a3a', v: 0.12 }, bushB: { c: '#3e5a32', top: '#4e6a38', v: 0.1 },
      // 통나무(회색 껍질)·목재
      logB: { c: '#6e665a', v: 0.08 }, logB2: { c: '#5a5248', v: 0.08 }, logEnd: { c: '#d4b88a', v: 0.05 }, logPith: { c: '#a8865a', v: 0.04 },
      plankN: { c: '#c8a878', top: '#d4b484', v: 0.05, pat: 'plank' }, plankD: { c: '#4e4438', v: 0.05, pat: 'plank' }, beam: { c: '#3e3226', v: 0.04 },
      // 철골 창고: 녹슨 붉은 기둥, 녹 함석
      steelR: { c: '#8a3a26', v: 0.04 }, steelRD: { c: '#6a2e20', v: 0.04 }, sheetR: { c: '#7e3a28', v: 0.06, pat: 'plank' }, sheetR2: { c: '#94503a', v: 0.06, pat: 'plank' },
      roofR: { c: '#7a3e2a', top: '#8e4c32', v: 0.06, pat: 'plank' }, roofR2: { c: '#a0623e', top: '#ac6c44', v: 0.07, pat: 'plank' },
      // 회색 창고: 바랜 회색 판자, 청회색 아래 판, 녹슨 격자 띠
      greyW: { c: '#8e9088', v: 0.06, pat: 'plank' }, tealW: { c: '#6a7e7c', v: 0.05, pat: 'plank' }, roofG: { c: '#6e6a62', top: '#7e7a70', v: 0.05, pat: 'plank' }, lattice: { c: '#7a4a2e', v: 0.05 },
      iron: { c: '#2e3034', v: 0.03 }, steel: { c: '#8a9298', v: 0.03 }, steelL: { c: '#c4ccd0', v: 0.02 }, rust: { c: '#7a4a2e', v: 0.08 }, rail: { c: '#5a4434', top: '#7a6a5a', v: 0.05 },
      conc: { c: '#8a8a84', top: '#9a9a94', v: 0.05, pat: 'stone' },
      // 탈것·잡동사니
      khaki: { c: '#8a8458', v: 0.04 }, khakiD: { c: '#6a6644', v: 0.04 }, orange: { c: '#c8742e', v: 0.04 }, orangeD: { c: '#9a5a26', v: 0.04 }, tire: { c: '#1e1e20', v: 0.03 }, hub: { c: '#d8b040', v: 0.03 }, glass: { c: '#3a4448', v: 0.02 },
      cabin: { c: '#6a7a86', v: 0.04, pat: 'plank' }, dumpG: { c: '#4a6a3a', v: 0.06 }, barrelR: { c: '#9a3a2a', v: 0.05 }, barrelO: { c: '#4e5a36', v: 0.05 }, crateG: { c: '#5a6236', v: 0.05, pat: 'plank' },
      win: { c: '#ffd890', night: true, day: '#3a4448' },
      // 빛
      lamp: { c: '#ffe0a0', glow: true }, fire: { c: '#ff9a3a', glow: true }, ember: { c: '#ff5a2a', glow: true }, lampR: { c: '#ff4a3a', glow: true }, chem: { c: '#7aff8a', glow: true }, head: { c: '#fff4d0', glow: true },
    },
    build(w) {
      const B = w.id, G = w.base, n = w.noise;
      const lights = [], acts = [], landmarks = [];
      // 공터(타원)와 호수(남쪽): 공식 지도처럼 창고는 서쪽, 호수는 정남쪽, 동쪽과 서쪽은 숲
      const cd = (x, z) => Math.hypot((x - 56) / 50, (z - 56) / 62);
      const ld = (x, z) => Math.hypot((x - 50) / 62, (z - 152) / 30);
      MH.terrain(w, {
        floor: G - 10,
        height: (x, z) => {
          const t = MH.sstep(0.95, 1.35, cd(x, z)), side = Math.max(0, 1 - Math.min(x, W - x) / 40);
          let h = G + t * ((n.fbm(x * 0.05, z * 0.05) - 0.5) * 4 + side * 8 + 1);
          const l = ld(x, z);
          if (l < 1.3) { const k = MH.sstep(1.3, 0.85, l); h = h * (1 - k) + (G - 3 - (1 - Math.min(1, l)) * 3) * k; }
          return h;
        },
        surface: (x, z, y) => {
          const l = ld(x, z), d = cd(x, z), hh = hash3(x, 7, z);
          if (y < G - 1) return B.lakebed;
          if (l < 1.1) return B.sand;
          if (d < 1) return n.fbm(x * 0.09 + 30, z * 0.09) > 0.6 ? (hh > 0.4 ? B.grassY : B.grass) : (hh > 0.85 ? B.moss : B.grass);
          return hh > 0.7 ? B.moss : (hh > 0.45 ? B.grass : B.needle);
        },
        under: (x, z, y, dep) => dep < 2 ? B.soil : B.rock,
      });
      MH.water(w, G - 1, (x, z) => ld(x, z) < 1.3);
      // 자갈길: 북쪽 길, 서북 길, 동쪽 큰길(남동으로 빠짐), 가운데 풀섬을 감싼 고리, 창고 앞 길, 호숫가 잔교로 가는 길
      const ROADS = [
        [[57, 0], [57, 40]],
        [[0, 20], [24, 12], [57, 4]],
        [[86, 0], [92, 20], [93, 44], [95, 84], [99, 106], [108, 112], [143, 112]],
        [[46, 46], [57, 40], [68, 46], [70, 62], [60, 68], [48, 64], [46, 46]],
        [[68, 44], [93, 44]],
        [[70, 63], [95, 76]],
        [[46, 46], [47, 80], [45, 114]],
        [[60, 68], [56, 96], [54, 118]],
      ];
      const rd = (x, z) => Math.min(...ROADS.map(r => MH.polyDist(x, z, r)));
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const d = rd(x + 0.5, z + 0.5);
        if (d < 2.6) MH.paint(w, x, z, hash3(x, 2, z) > 0.75 ? B.gravelD : B.gravel);
        else if (d < 3.4 && hash3(x, 5, z) > 0.4) MH.paint(w, x, z, B.gravelD);
      }
      const keep = [];
      const hold = (x0, z0, x1, z1) => keep.push([x0, z0, x1, z1]);

      // ── 통나무 도우미: 회색 껍질, 끝은 연한 나이테 ──
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
      const boards = (x0, z0, x1, z1, layers) => {
        for (let k = 0; k < layers; k++) {
          const y = G + 1 + k * 2;
          for (let z = z0; z <= z1; z += 3) w.box(x0, y, z, x1, y, z, B.beam);
          w.box(x0, y + 1, z0, x1, y + 1, z1, B.plankN);
        }
      };

      // ── 녹슨 붉은 철골 창고: 기둥과 트러스, 낮은 함석 박공지붕, 일부 면만 함석벽 ──
      const steelShed = (x0, z0, x1, z1, h, o) => {
        const top = G + h, alongX = o.axis === 'x';
        hold(x0 - 1, z0 - 1, x1 + 1, z1 + 1);
        MH.flatten(w, x0 - 1, z0 - 1, x1 + 1, z1 + 1, G, B.gravelD, B.soil);
        w.box(x0, G, z0, x1, G, z1, B.conc);
        const col = (x, z) => w.box(x, G + 1, z, x, top, z, B.steelR);
        for (let x = x0; x <= x1; x++) if ((x - x0) % 5 === 0 || x === x1) { col(x, z0); col(x, z1); }
        for (let z = z0; z <= z1; z++) if ((z - z0) % 5 === 0 || z === z1) { col(x0, z); col(x1, z); }
        w.walls(x0, top, z0, x1, top, z1, B.steelR);
        // 트러스: 짧은 쪽으로 가로지르는 보와 지그재그 빗대
        if (alongX) for (let x = x0; x <= x1; x += 5) { w.box(x, top, z0, x, top, z1, B.steelRD); for (let z = z0; z < z1; z += 2) w.line(x, top, z, x, top + 1, z + 1, B.steelRD); }
        else for (let z = z0; z <= z1; z += 5) { w.box(x0, top, z, x1, top, z, B.steelRD); for (let x = x0; x < x1; x += 2) w.line(x, top, z, x + 1, top + 1, z, B.steelRD); }
        // 함석벽
        const clad = (side, y0, y1) => {
          for (let y = y0; y <= y1; y++) {
            if (side === 'n' || side === 's') { const z = side === 'n' ? z0 : z1; for (let x = x0; x <= x1; x++) if (w.get(x, y, z) !== B.steelR) w.set(x, y, z, hash3(x, y >> 2, z) > 0.8 ? B.sheetR2 : B.sheetR); }
            else { const x = side === 'w' ? x0 : x1; for (let z = z0; z <= z1; z++) if (w.get(x, y, z) !== B.steelR) w.set(x, y, z, hash3(x, y >> 2, z) > 0.8 ? B.sheetR2 : B.sheetR); }
          }
        };
        for (const s of o.clad || []) clad(s, G + 1, top - 1);
        for (const s of o.band || []) clad(s, top - 3, top - 1);
        // 지붕: 세 칸마다 한 칸 오르는 낮은 경사
        const a0 = alongX ? z0 - 1 : x0 - 1, a1 = alongX ? z1 + 1 : x1 + 1;
        let peak = top;
        for (let z = z0 - 1; z <= z1 + 1; z++) for (let x = x0 - 1; x <= x1 + 1; x++) {
          const a = alongX ? z : x, y = top + 1 + Math.floor(Math.min(a - a0, a1 - a) / 3);
          peak = Math.max(peak, y);
          w.set(x, y, z, n.fbm(x * 0.2, z * 0.2 + 9) > 0.58 ? B.roofR2 : B.roofR);
        }
        return { top, peak };
      };

      // ① 북쪽 긴 창고(남북), 서쪽 벽만 막힘. 안에 판재
      const S1 = steelShed(34, 14, 46, 40, 8, { axis: 'z', clad: ['w', 'n'] });
      boards(36, 17, 42, 22, 3); boards(36, 27, 43, 32, 2); log(w, 'z', 30, 38, 41, G + 2, 1.5);
      // ③ 큰 제재 창고(동서): 북·서쪽 함석벽, 톱 라인과 레일이 동쪽 마당으로
      const S3 = steelShed(12, 60, 42, 78, 9, { axis: 'x', clad: ['n', 'w'], band: ['s'] });
      boards(14, 62, 20, 67, 3); boards(14, 72, 21, 76, 3);
      landmarks.push({ name: '슈투르만의 제재소', note: '보스 슈투르만 · 호위병 2~3명', p: [27.5, S3.peak + 8, 69.5], boss: true });
      // ④ 남쪽 긴 창고(남북): 서쪽 함석벽, 동쪽은 위쪽 띠만
      const S4 = steelShed(22, 84, 38, 112, 8, { axis: 'z', clad: ['w', 's'], band: ['e'] });
      boards(25, 88, 33, 94, 3); log(w, 'z', 98, 109, 27, G + 3, 2.3); log(w, 'z', 97, 110, 32, G + 3, 2.3); log(w, 'z', 99, 108, 30, G + 6, 2.3);
      w.box(39, G + 1, 100, 41, G + 3, 104, B.dumpG); w.box(39, G + 4, 100, 41, G + 4, 104, B.khakiD);   // 초록 쓰레기통

      // ── 톱 라인: 큰 창고 안 둥근 톱날, 동쪽 마당에서 들어오는 레일과 운반 수레 ──
      const BLX = 27, BLY = G + 4, BLZ = 69;
      w.box(23, G + 1, 66, 30, G + 3, 72, B.iron); w.box(23, G + 1, BLZ, 30, G + 3, BLZ, 0);
      w.box(23, G + 3, 66, 30, G + 3, 72, B.steel); w.box(23, G + 3, BLZ, 30, G + 3, BLZ, 0);
      w.box(24, G + 1, 63, 28, G + 4, 64, B.khakiD); w.set(26, G + 5, 64, B.iron);
      w.box(BLX, S3.top - 1, 66, BLX, S3.top - 1, 72, B.steelRD); w.set(BLX, S3.top - 2, 66, B.lamp);
      lights.push({ name: 'saw', p: [BLX + 0.5, S3.top - 2, 66.5], c: '#ffe0b0', i: 0.35, d: 18, flicker: 0.1, srcR: 3 });
      for (let x = 23; x <= 30; x++) for (let z = 63; z <= 75; z++) if (hash3(x, 1, z) > 0.45 && !w.get(x, G + 1, z)) w.set(x, G, z, B.sawdust);
      const blade = w.prop({ name: 'blade', pivot: [BLX + 0.5, BLY + 0.5, BLZ + 0.5], axis: 'z', speed: 0.2 });
      for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
        const d = Math.hypot(dy, dx);
        if (d > 3.4) continue;
        const ang = Math.round((Math.atan2(dy, dx) / TAU + 1) * 16) % 2;
        blade.set(BLX + dx, BLY + dy, BLZ, d < 1 ? B.iron : (d > 2.7 ? (ang ? B.steelL : B.iron) : B.steel));
      }
      for (let x = 31; x <= 62; x++) {
        if (x % 2 === 0) for (let z = 66; z <= 72; z++) MH.paint(w, x, z, B.beam);
        w.set(x, G + 1, 67, B.rail); w.set(x, G + 1, 71, B.rail);
      }
      hold(30, 64, 64, 74);
      const CX0 = 52, CX1 = 58;
      const cart = w.prop({ name: 'cart', pivot: [(CX0 + CX1 + 1) / 2, G + 1, BLZ + 0.5] });
      cart.box(CX0, G + 2, 66, CX1, G + 2, 72, B.plankD);
      for (const x of [CX0 + 1, CX1 - 1]) for (const z of [66, 72]) cart.box(x - 1, G + 1, z, x, G + 1, z, B.tire);
      log(cart, 'x', CX0 - 2, CX1 + 2, BLZ, G + 5, 2.3);
      acts.push({
        name: '둥근 톱날', hint: '레일 위 운반 수레가 통나무를 큰 창고 안으로 밀어 넣고, 둥근 톱날이 윙 돌며 톱밥을 흩뿌려요', hit: [23, G + 1, 65, CX1 + 2, G + 8, 73],
        run: async a => {
          a.flash('saw', 5, 7);
          const spin = a.turn('blade', [0, 0, -TAU * 12], 6.5, t => t);
          await a.move('cart', [-21, 0, 0], 3);
          for (let k = 0; k < 10; k++) { a.burst([BLX + 4, BLY + 1, BLZ + 0.5], { n: 18, colors: ['#e0c48a', '#c8a870', '#f4e4c0'], speed: 4, up: 3.5, life: 1.2, gravity: 6, spread: 1 }); await a.wait(0.3); }
          await spin; a.unwind('blade');
          await a.move('cart', [0, 0, 0], 2.6);
        },
      });
      landmarks.push({ name: '톱 라인', note: '둥근 톱 · 통나무 운반 레일', p: [BLX + 0.5, S3.peak + 2, BLZ + 0.5] });

      // ── ② 회색 창고: 바랜 회색 판자, 청회색 아래 판, 녹슨 격자 창 띠, 동쪽에 큰 미닫이문 ──
      const GX0 = 12, GX1 = 32, GZ0 = 42, GZ1 = 54, GT = G + 9;
      hold(GX0 - 1, GZ0 - 1, GX1 + 2, GZ1 + 1);
      MH.flatten(w, GX0 - 1, GZ0 - 1, GX1 + 2, GZ1 + 1, G, B.gravelD, B.soil);
      for (let y = G + 1; y <= GT; y++) for (let z = GZ0; z <= GZ1; z++) for (let x = GX0; x <= GX1; x++) {
        if (x !== GX0 && x !== GX1 && z !== GZ0 && z !== GZ1) continue;
        let b = y <= G + 4 ? B.tealW : B.greyW;
        if (y >= G + 5 && y <= G + 7) b = ((x + z + y) % 2 === 0 || y === G + 5 || y === G + 7) ? B.lattice : B.glass;
        if ((x === GX0 || x === GX1) && (z === GZ0 || z === GZ1)) b = B.greyW;
        w.set(x, y, z, b);
      }
      const gp = MH.roof(w, GX0 - 1, GX1 + 1, GZ0 - 1, GZ1 + 1, GT + 1, { b: B.roofG, eave: B.rust, ridge: B.iron, pitch: 1, gable: B.greyW, axis: 'x' });
      const DZ0 = 45, DZ1 = 51, DH = G + 7;
      w.box(GX1, G + 1, DZ0, GX1, DH, DZ1, 0); w.box(GX1, DH + 1, DZ0 - 1, GX1, DH + 1, DZ1 + 1, B.lattice);
      for (let z = DZ0; z <= DZ1; z++) for (let y = G + 1; y <= G + 6; y++) if ((z + y) % 3 === 0) w.set(GX1 - 3, y, z, B.lattice);   // 안쪽 녹슨 트러스
      w.box(GX1 + 1, DH + 2, DZ0 - 1, GX1 + 1, DH + 2, DZ1 + 1, B.iron);                                                          // 문 레일
      w.set(22, GT - 1, 48, B.lamp); w.box(22, GT, 48, 22, GT, 48, B.iron);
      lights.push({ name: 'shed', p: [24.5, GT - 1, 48.5], c: '#ffd8a0', i: 0.3, d: 22, flicker: 0.15, srcR: 4 });
      const dA = w.prop({ name: 'doorA', pivot: [GX1 + 1.5, G + 1, DZ0 + 2] }), dB = w.prop({ name: 'doorB', pivot: [GX1 + 1.5, G + 1, DZ1 - 1] });
      for (let z = DZ0; z <= DZ1; z++) for (let y = G + 1; y <= DH + 1; y++) {
        const p = z <= DZ0 + 3 ? dA : dB, e = y === G + 1 || y === DH + 1 || z === DZ0 || z === DZ1 || z === DZ0 + 3 || z === DZ0 + 4;
        p.set(GX1 + 1, y, z, e ? B.iron : (y > G + 4 ? B.greyW : B.tealW));
      }
      acts.push({
        name: '회색 창고 미닫이문', hint: '회색 창고의 큰 미닫이문이 양쪽으로 드르륵 열리고, 녹슨 트러스 안쪽에 등불이 켜져요', hit: [GX1, G + 1, DZ0, GX1 + 1, DH + 1, DZ1],
        run: async a => {
          a.flash('shed', 6, 5);
          await Promise.all([a.move('doorA', [0, 0, -4], 1.6), a.move('doorB', [0, 0, 4], 1.6)]);
          a.burst([GX1 + 3, G + 1.5, (DZ0 + DZ1) / 2 + 0.5], { n: 30, colors: ['#c8b890', '#a89a7a', '#e0d4b4'], speed: 5, up: 1.2, life: 1.4, gravity: 1, spread: 3, flat: true });
          await a.wait(2.4);
          await Promise.all([a.move('doorA', [0, 0, 0], 1.4), a.move('doorB', [0, 0, 0], 1.4)]);
        },
      });
      landmarks.push({ name: '회색 창고', note: '청회색 판자벽 · 미닫이문', p: [22.5, gp + 6, 48.5] });

      // ── 가운데 풀섬: 회색 통나무 더미 밑 슈투르만의 은닉처, 옆에 큰 트랙터 바퀴 ──
      log(w, 'x', 52, 61, 52, G + 3, 2.3); log(w, 'x', 51, 61, 57, G + 3, 2.3); log(w, 'x', 51, 66, 54, G + 7, 2.3);
      for (const [x0, x1, z] of [[49, 58, 60], [50, 57, 49]]) log(w, 'x', x0, x1, z, G + 1, 0.9);
      hold(48, 47, 68, 64);
      w.box(62, G + 1, 58, 65, G + 2, 61, B.crateG); w.box(62, G + 2, 58, 65, G + 2, 58, B.beam); log(w, 'x', 60, 67, 57, G + 6, 1.4);
      w.set(66, G + 1, 62, B.chem);
      const lid = w.prop({ name: 'stash', pivot: [64, G + 3, 59.5] });
      lid.box(62, G + 3, 58, 65, G + 3, 61, B.crateG); lid.box(62, G + 3, 59, 65, G + 3, 59, B.beam);
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const d = Math.hypot(dx, dy); if (d <= 3.2) w.set(52 + dx, G + 4 + dy, 61, d < 1.2 ? B.hub : (d < 1.9 ? 0 : B.tire)); }
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const d = Math.hypot(dx, dy); if (d <= 3.2 && d > 1.9) w.set(52 + dx, G + 4 + dy, 62, B.tire); }
      lights.push({ name: 'stash', p: [66.5, G + 2, 62.5], c: '#7aff8a', i: 0.3, d: 12, flicker: 0.1, srcR: 3 });
      acts.push({
        name: '슈투르만의 은닉처', hint: '풀섬 가운데 통나무 더미 밑, 트랙터 바퀴 옆 상자 뚜껑이 밀려 열리고 초록 형광봉 빛 아래 전리품이 반짝여요', hit: [62, G + 1, 58, 66, G + 3, 62],
        run: async a => {
          a.flash('stash', 8, 5);
          await a.move('stash', [0, 0.6, 0], 0.4);
          await a.move('stash', [3.5, 0.6, 0], 1);
          await a.move('stash', [3.5, -0.6, 0], 0.3);
          for (let k = 0; k < 6; k++) { a.burst([64 + (k % 2), G + 3, 59.5], { n: 14, colors: ['#ffe08a', '#7aff8a', '#ffffff'], speed: 1.4, up: 4, life: 1.2, gravity: 3, spread: 1 }); await a.wait(0.4); }
          await a.wait(0.6);
          await a.move('stash', [3.5, 0.6, 0], 0.3);
          await a.move('stash', [0, 0.6, 0], 1);
          await a.move('stash', [0, 0, 0], 0.3);
        },
      });
      landmarks.push({ name: '슈투르만의 은닉처', note: '풀섬 통나무 더미 밑 · 은닉처 열쇠', p: [60.5, G + 14, 54.5] });

      // ── 통나무 옹벽: 기둥 사이에 굵은 통나무를 가로로 쌓은 벽(북쪽 길가) ──
      for (let x = 64; x <= 90; x += 6) for (const z of [35, 39]) w.box(x, G + 1, z, x, G + 11, z, B.logB2);
      for (const y of [G + 2, G + 5, G + 8]) log(w, 'x', 63, 91, 37, y, 1.5);
      log(w, 'x', 66, 88, 37, G + 11, 1.5);
      hold(62, 33, 92, 40);
      // ── 집게 크레인 트럭(카키 KrAZ): 옹벽 앞 길 위, 뒤에 통나무 받침 ──
      const KZ = 44;
      hold(68, KZ - 3, 94, KZ + 3);
      for (const wx of [72, 77, 87]) for (const z of [KZ - 2, KZ + 2]) w.box(wx, G + 1, z, wx + 2, G + 3, z, B.tire);
      for (const z of [KZ - 2, KZ + 2]) { w.set(88, G + 2, z, B.hub); w.set(73, G + 2, z, B.hub); w.set(78, G + 2, z, B.hub); }
      w.box(70, G + 3, KZ - 1, 92, G + 3, KZ + 1, B.iron);
      w.box(86, G + 4, KZ - 2, 90, G + 9, KZ + 2, B.khaki); w.box(86, G + 10, KZ - 2, 90, G + 10, KZ + 2, B.khakiD);
      w.box(90, G + 7, KZ - 1, 90, G + 8, KZ + 1, B.glass); for (const z of [KZ - 2, KZ + 2]) w.box(87, G + 7, z, 89, G + 8, z, B.glass);
      w.box(91, G + 4, KZ - 2, 93, G + 6, KZ + 2, B.khaki); w.box(94, G + 4, KZ - 1, 94, G + 6, KZ + 1, B.iron); w.set(94, G + 5, KZ - 2, B.steelL); w.set(94, G + 5, KZ + 2, B.steelL);
      w.box(70, G + 4, KZ - 2, 82, G + 4, KZ + 2, B.plankD);
      for (const x of [71, 76, 81]) for (const z of [KZ - 2, KZ + 2]) w.box(x, G + 5, z, x, G + 8, z, B.iron);
      log(w, 'x', 69, 82, KZ - 1, G + 6, 1.4); log(w, 'x', 70, 82, KZ + 1, G + 6, 1.4);
      w.box(84, G + 4, KZ - 1, 84, G + 10, KZ + 1, B.khakiD); w.box(84, G + 4, KZ - 3, 84, G + 4, KZ + 3, B.iron);
      // 크레인 팔(부품): 받침 기둥 위에서 돌고, 집게에 통나무를 물고 있다(쉴 때는 옹벽 쪽으로 접혀 있음)
      const crane = w.prop({ name: 'crane', pivot: [84.5, G + 11, KZ + 0.5] });
      crane.box(84, G + 11, KZ, 84, G + 13, KZ, B.khaki);
      crane.line(84, G + 13, KZ, 84, G + 18, KZ - 4, B.khaki, 0); crane.line(84, G + 14, KZ, 84, G + 19, KZ - 4, B.khakiD, 0);
      crane.line(84, G + 18, KZ - 4, 84, G + 19, KZ - 9, B.khaki, 0);
      crane.box(84, G + 17, KZ - 9, 84, G + 18, KZ - 9, B.iron); crane.box(83, G + 16, KZ - 10, 85, G + 16, KZ - 8, B.iron);
      for (const dx of [-2, 2]) crane.box(84 + dx, G + 15, KZ - 9, 84 + dx, G + 15, KZ - 9, B.iron);
      log(crane, 'x', 78, 90, KZ - 9, G + 14, 1.2);
      acts.push({
        name: '집게 크레인 트럭', hint: '카키색 원목 트럭의 집게 크레인이 통나무를 물고 빙 돌아 짐칸 위로 옮겨요', hit: [78, G + 10, KZ - 11, 90, G + 19, KZ + 1],
        run: async a => {
          await a.turn('crane', [0, 1.57, 0], 2.6);
          await a.move('crane', [0, -2, 0], 0.8);
          a.burst([76.5, G + 8, KZ + 0.5], { n: 22, colors: ['#a89a78', '#e0d4b4'], speed: 3, up: 1, life: 1.2, gravity: 2, spread: 4, flat: true });
          await a.wait(1);
          await a.move('crane', [0, 0, 0], 0.8);
          await a.turn('crane', [0, 0, 0], 2.6);
        },
      });

      // ── 통나무 더미 ①(동쪽 마당, 가장 큼): 맨 위 통나무는 굴러 내려오는 부품 ──
      const P1 = pile('x', 73, 92, 54, 3, 2.3, 5, (k) => k === 2);
      hold(71, 47, 95, 62);
      const top = P1.find(q => q[0] === 2).slice(); top[3] += 1;
      const roll = w.prop({ name: 'roll', pivot: [82.5, top[3] + 0.5, top[2] + 0.5] });
      log(roll, 'x', 74, 91, top[2], top[3], 2.3);
      acts.push({
        name: '통나무 더미 굴러내림', hint: '쌓아 둔 회색 통나무 더미 맨 위 통나무가 쿵쿵 굴러 남쪽 자갈길로 떨어져요', hit: [73, top[3] - 2, top[2] - 2, 92, top[3] + 2, top[2] + 2],
        run: async a => {
          const dy = G + 3 - top[3];
          await a.tween('roll', { off: [0, -2, 5], rot: [2.2, 0, 0] }, 0.6, t => t * t);
          await a.tween('roll', { off: [0, dy, 10], rot: [4.4, 0, 0] }, 0.5, t => t);
          a.burst([82.5, G + 1, top[2] + 12], { n: 50, colors: ['#8a7a5a', '#aca290', '#6a5a40'], speed: 7, up: 1.5, life: 1.4, gravity: 3, spread: 10, flat: true });
          await a.tween('roll', { off: [0, dy, 15], rot: [6.6, 0, 0] }, 0.8);
          await a.wait(1.6);
          await a.tween('roll', { scl: [0, 0, 0] }, 0.3);
          await a.tween('roll', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.05);
          await a.tween('roll', { scl: [1, 1, 1] }, 0.5);
        },
      });
      // 통나무 더미 ②(남쪽 마당), ③(동쪽 큰길 너머, 세로), 흩어진 통나무
      pile('x', 66, 86, 84, 3, 2.3, 5); hold(64, 76, 88, 92);
      pile('z', 52, 74, 106, 2, 2.3, 5); hold(101, 50, 112, 76);
      for (const [x0, x1, z] of [[72, 80, 98], [74, 83, 101]]) log(w, 'x', x0, x1, z, G + 1, 0.9);
      boards(64, 96, 74, 102, 3); hold(62, 94, 84, 104);
      boards(48, 24, 54, 30, 2); hold(47, 23, 55, 31);

      // ── 공사장 숙소 컨테이너(북쪽): 청회색 철판, 지붕에 붉은 신호등 장대 ──
      const OX0 = 64, OX1 = 76, OZ0 = 20, OZ1 = 26;
      hold(OX0 - 2, OZ0 - 2, OX1 + 3, OZ1 + 2);
      MH.flatten(w, OX0 - 1, OZ0 - 1, OX1 + 1, OZ1 + 1, G, B.gravelD, B.soil);
      for (const x of [OX0, OX1]) for (const z of [OZ0, OZ1]) w.set(x, G + 1, z, B.conc);
      w.box(OX0, G + 2, OZ0, OX1, G + 7, OZ1, B.cabin); w.box(OX0, G + 8, OZ0, OX1, G + 8, OZ1, B.iron);
      w.box(70, G + 2, OZ1, 71, G + 6, OZ1, B.plankD); w.box(OX0 + 2, G + 4, OZ1, OX0 + 4, G + 5, OZ1, B.win); w.box(OX1 - 3, G + 4, OZ1, OX1 - 1, G + 5, OZ1, B.glass); w.box(OX1, G + 4, 22, OX1, G + 5, 24, B.glass);
      w.box(70, G + 1, OZ1 + 1, 71, G + 1, OZ1 + 1, B.conc); w.set(69, G + 6, OZ1 + 1, B.lamp);
      lights.push({ p: [69.5, G + 6, OZ1 + 2], c: '#ffd890', i: 0.3, d: 14, flicker: 0.1, srcR: 3 });
      const FP = [78, 23];
      w.box(FP[0], G + 1, FP[1], FP[0], G + 13, FP[1], B.iron); w.set(FP[0], G + 14, FP[1], B.lampR);
      lights.push({ name: 'flare', p: [FP[0] + 0.5, G + 14, FP[1] + 0.5], c: '#ff5a3a', i: 0.4, d: 26, flicker: 0.3, srcR: 3 });
      acts.push({
        name: '신호탄', hint: '북쪽 숙소 컨테이너 옆 장대에서 붉은 신호탄이 하늘 높이 솟아 숲 위를 붉게 비춰요', hit: [FP[0] - 1, G + 10, FP[1] - 1, FP[0] + 1, G + 15, FP[1] + 1],
        run: async a => {
          for (let k = 0; k < 8; k++) { a.burst([FP[0] + 0.5, G + 15 + k * 4, FP[1] + 0.5], { n: 6, colors: ['#ffb060', '#ff6a3a'], speed: 0.4, up: 2, life: 0.8, gravity: 1, spread: 0.3 }); await a.wait(0.08); }
          a.flash('flare', 9, 5); a.lightning(0.25);
          a.burst([FP[0] + 0.5, G + 48, FP[1] + 0.5], { n: 90, colors: ['#ff3a2a', '#ff8a5a', '#ffd0a0'], speed: 6, up: 1, life: 3.4, gravity: 0.5, spread: 1.5 });
          for (let k = 0; k < 8; k++) { a.burst([FP[0] + 0.5 - k * 0.6, G + 46 - k * 2.4, FP[1] + 0.5 + k * 0.4], { n: 8, colors: ['#ff4a3a', '#c8c0b8'], speed: 0.6, up: -0.4, life: 2.2, gravity: 0.5, spread: 0.6 }); await a.wait(0.4); }
        },
      });

      // ── 모닥불: 남쪽 창고 앞, 통나무 의자 ──
      const FX = 51, FZ = 104;
      hold(FX - 4, FZ - 4, FX + 4, FZ + 4);
      w.ring(FX, FZ, G + 1, 1.2, 2.4, B.stone); w.set(FX, G + 1, FZ, B.fire); w.set(FX, G + 2, FZ, B.ember); w.set(FX + 1, G + 1, FZ, B.ember);
      log(w, 'z', FZ - 2, FZ + 2, FX + 4, G + 1, 0.9);
      lights.push({ name: 'fire', p: [FX + 0.5, G + 3, FZ + 0.5], c: '#ff9a4a', i: 0.55, d: 20, flicker: 0.55, srcR: 3 });
      // 드럼통·팔레트
      for (const [x, z, b] of [[44, 56, B.barrelR], [44, 58, B.barrelO], [33, 58, B.barrelR], [61, 30, B.barrelO], [97, 92, B.barrelR], [44, 82, B.barrelR]]) if (!w.get(x, G + 1, z)) w.box(x, G + 1, z, x, G + 3, z, b);
      for (const [x, z] of [[60, 76], [40, 118], [100, 40]]) { w.box(x, G + 1, z, x + 3, G + 1, z + 3, B.beam); w.box(x, G + 2, z, x + 3, G + 2, z + 3, B.plankN); }

      // ── 주황 원목 트럭(부품): 남동쪽으로 빠지는 길 위, 통나무를 실은 평판 트레일러 ──
      const TZ = 112, TX0 = 106, TX1 = 130;
      hold(TX0 - 4, TZ - 4, TX1 + 4, TZ + 9);
      for (let z = TZ - 3; z <= TZ + 3; z++) for (let x = TX0 - 1; x <= TX1 + 2; x++) if (MH.g(w, x, z) !== G) MH.setH(w, x, z, G, B.gravel, B.soil);
      const truck = w.prop({ name: 'truck', pivot: [118.5, G + 1, TZ + 0.5] });
      for (const wx of [109, 114, 125]) for (const z of [TZ - 2, TZ + 2]) { truck.box(wx, G + 1, z, wx + 2, G + 3, z, B.tire); truck.set(wx + 1, G + 2, z, B.hub); }
      truck.box(TX0 + 1, G + 3, TZ - 1, TX1 - 1, G + 3, TZ + 1, B.iron);
      truck.box(122, G + 4, TZ - 2, 126, G + 9, TZ + 2, B.orange); truck.box(122, G + 10, TZ - 2, 126, G + 10, TZ + 2, B.orangeD);
      truck.box(126, G + 7, TZ - 1, 126, G + 8, TZ + 1, B.glass); for (const z of [TZ - 2, TZ + 2]) truck.box(123, G + 7, z, 125, G + 8, z, B.glass);
      truck.box(127, G + 4, TZ - 2, 129, G + 6, TZ + 2, B.orange); truck.box(127, G + 7, TZ - 1, 129, G + 7, TZ + 1, B.orangeD);
      truck.box(130, G + 4, TZ - 1, 130, G + 6, TZ + 1, B.iron); truck.set(130, G + 5, TZ - 2, B.head); truck.set(130, G + 5, TZ + 2, B.head);
      truck.box(131, G + 3, TZ - 2, 131, G + 3, TZ + 2, B.iron);
      truck.box(121, G + 4, TZ + 2, 121, G + 12, TZ + 2, B.iron);
      truck.box(TX0 + 1, G + 4, TZ - 2, 120, G + 4, TZ + 2, B.plankD);
      for (const x of [108, 114, 120]) for (const z of [TZ - 2, TZ + 2]) truck.box(x, G + 5, z, x, G + 9, z, B.iron);
      log(truck, 'x', TX0 - 1, 120, TZ - 1, G + 6, 1.5); log(truck, 'x', TX0, 119, TZ + 1, G + 6, 1.5); log(truck, 'x', TX0 + 1, 120, TZ, G + 8, 1.5);
      lights.push({ name: 'truck', p: [132, G + 5, TZ + 0.5], c: '#fff0c8', i: 0.25, d: 20, flicker: 0.05, srcR: 3 });
      acts.push({
        name: '낡은 트럭 시동', hint: '주황 원목 트럭에 시동이 걸려 차체가 덜컹이고, 전조등이 켜지며 굴뚝에서 검은 연기가 뿜어져요', hit: [TX0, G + 1, TZ - 2, TX1 + 1, G + 12, TZ + 2],
        run: async a => {
          a.flash('truck', 10, 6);
          for (let k = 0; k < 12; k++) {
            a.burst([121.5, G + 13, TZ + 2.5], { n: 12, colors: ['#4a4a48', '#2e2e2e', '#7a7a76'], speed: 1, up: 3.5, life: 2, gravity: -0.6, spread: 0.6 });
            await a.move('truck', [0, 0.35, 0], 0.09); await a.move('truck', [0, 0, 0], 0.09);
            await a.wait(0.25);
          }
          await a.move('truck', [3, 0, 0], 1.2);
          await a.wait(1);
          await a.move('truck', [0, 0, 0], 1.6);
        },
      });

      // ── 호숫가: 정남쪽 잔교(남북)와 보트 ──
      const PZ0 = 116, PZ1 = 132;
      w.box(53, G, PZ0, 56, G, PZ1, B.plankN); for (const x of [53, 56]) for (let z = PZ0 + 4; z <= PZ1; z += 4) w.box(x, G - 4, z, x, G - 1, z, B.beam);
      w.box(58, G - 1, 124, 60, G - 1, 131, B.plankD); for (const x of [58, 60]) w.box(x, G, 124, x, G, 131, B.plankD); w.box(59, G, 124, 59, G, 124, B.plankD); w.box(59, G, 131, 59, G, 131, B.plankD); w.set(59, G, 127, B.beam);
      hold(50, 112, 62, 134);
      landmarks.push({ name: '호숫가 잔교', note: '큰 호수 · 남서쪽 보트 탈출구로', p: [55, G + 6, 126] });
      for (const [x, z, r] of [[100, 92, 2.6], [110, 86, 2.2], [88, 94, 1.8]]) { MH.rock(w, x, G, z, r, B.rock, B.moss); hold(x - 3, z - 3, x + 3, z + 3); }

      // ── 숲: 서쪽(창고 뒤)과 동쪽은 빽빽, 북서는 어두운 소나무, 남동쪽은 성글게 ──
      const blocked = (x, z, r) => keep.some(([x0, z0, x1, z1]) => x > x0 - r && x < x1 + r && z > z0 - r && z < z1 + r);
      const LD = [B.pineD0, B.pineD1, B.pineD2], LN = [B.pine0, B.pine1, B.pine2], LB2 = [B.birchL, B.birchL2, B.birchL2];
      for (let gz = 0; gz < D; gz += 6) for (let gx = 0; gx < W; gx += 6) {
        const x = gx + w.ri(0, 5), z = gz + w.ri(0, 5), d = cd(x, z);
        if (x < 1 || z < 1 || x > W - 2 || z > D - 2) continue;
        if (ld(x, z) < 1.15 || rd(x, z) < 5) continue;
        const se = (x + z) / (W + D), dark = x < 30 || (x < 50 && z < 14);
        let p = MH.sstep(0.9, 1.1, d);
        if (x < 40 && z < 16 - x * 0.15) p = 0.95;                                            // 서북 길 위쪽 숲
        if (se > 0.74) p *= 0.25; else if (se > 0.64) p *= 0.6;
        if (d < 1 && d > 0.84 && w.chance(0.1)) p = 0.9;
        if (!w.chance(p) || blocked(x, z, 4)) continue;
        const y = MH.g(w, x, z) + 1;
        if (y < G) continue;
        if (!dark && d < 1.25 && w.chance(0.25)) { MH.tree(w, x, y, z, { kind: 'oak', h: w.ri(9, 12), bark: B.birch, leaves: LB2, r: 2.6, trunkR: 0.6, spread: 2.5, branches: 3 }); continue; }
        const big = dark || (x > 104 && se < 0.62);
        MH.tree(w, x, y, z, { kind: 'pine', h: big ? w.ri(17, 25) : (se > 0.64 ? w.ri(10, 14) : w.ri(13, 19)), r: big ? w.r(3.6, 4.6) : w.r(3, 4), bark: B.bark, leaves: (dark || w.chance(0.4)) ? LD : LN });
      }
      MH.scatter(w, 1600, (x, g, z, b) => {
        if (blocked(x, z, 1) || rd(x, z) < 3) return;
        if (b === B.needle || b === B.moss) { if (hash3(x, 3, z) > 0.7) MH.bush(w, x, g + 1, z, 1.4, [B.bushB, B.bushB]); else w.set(x, g + 1, z, B.fern); }
        else if (b === B.grass || b === B.grassY) { if (hash3(x, 9, z) > 0.6) w.set(x, g + 1, z, B.fern); }
      });

      // ── 새떼: 서쪽·북쪽·동쪽 숲 우듬지에서 날아오른다 ──
      const nests = [[14, 30], [30, 10], [14, 72], [108, 18], [112, 44], [110, 72]].map(([x, z]) => [x + 0.5, Math.max(G + 18, w.top(x, z) + 7), z + 0.5]);
      acts.push({
        name: '숲의 새떼', hint: '총소리에 놀란 새떼가 제재소를 둘러싼 소나무 숲 위로 한꺼번에 날아오르고 안개가 밀려와요', hit: [100, G + 16, 10, 126, G + 32, 80],
        run: async a => {
          a.wind(2.4, 4);
          for (const p of nests) { a.burst(p, { n: 22, colors: ['#2a2a2c', '#3e3a36', '#1e1e20'], speed: 7, up: 5, life: 2.6, gravity: -0.8, spread: 3 }); await a.wait(0.35); }
          for (const p of nests) a.burst([p[0] + (p[0] < 60 ? 14 : -14), G + 3, p[2]], { n: 18, colors: ['#e4e6de', '#d0d4cc'], speed: 6, up: 0.3, life: 2.4, gravity: 0, spread: 6, flat: true });
          await a.wait(1.5);
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
