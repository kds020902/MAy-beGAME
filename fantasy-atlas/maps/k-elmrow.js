// 주택가 — 언덕을 오르는 계단식 골목, 앞마당 꽃밭, 빨랫줄, 느릅나무 쉼터, 꼭대기 예배당, 동쪽 빵집 마당 (168칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 168, D = 168, Hh = 120;
  const { KP, block, doorLights } = window.KINGDOM;
  MAPS.push({
    id: 'elmrow', cat: 'kingdom', name: '주택가', en: 'Elm Row', color: '#d8b08a', seed: 213, base: 20, time: 'day', size: [W, D, Hh],
    desc: '성벽 안쪽 언덕을 따라 층층이 들어선 주택가. 집집마다 작은 앞마당 꽃밭을 가꾸고, 해 질 녘이면 골목마다 창문에 불이 켜진다. 언덕 동쪽 빵집 마당에서는 아침마다 화덕 빵 냄새가 골목을 타고 오른다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['위치', '왕도 서쪽 언덕'], ['명물', '느릅나무 쉼터 · 작은 예배당'], ['빵집 마당', '돌 화덕 · 두레박 우물'], ['소문', '예배당 종지기는 밤마다 지붕 위를 걷는다']] },
    sky: ['#f8c088', '#5a4a8a', '#ffd8a0'], stars: false,
    hemi: ['#ffe0c8', '#3a3040', 0.54], sun: ['#ffb880', 0.74, [0.7, 0.6, 0.45]],
    liquid: ['#2a5a8a', '#4a8ac0', '#e0f4ff'], liqSpeed: 0.7,
    fog: { start: 0.8, floor: 10, depth: 10, haze: [22, 0.14, 6], hazeColor: '#e8b890' },
    camY: 0, zoom: 1.05,
    particles: [
      { n: 22, colors: ['#3a3040', '#6a5a70'], mode: 'wisp', speed: 1, size: 2, y0: 70, glow: false },
      { n: 90, colors: ['#ffe8c0', '#fff4e0'], mode: 'drift', speed: 0.25, y0: 24, y1: 90, glow: false },
    ],
    blocks: Object.assign({}, KP, {
      clothR: { c: '#d86a6a', v: 0.02 }, clothB: { c: '#7aa8d8', v: 0.02 }, clothW: { c: '#f4f0e8', v: 0.02 }, clothY: { c: '#f0d870', v: 0.02 },
      veg: { c: '#5aa040', v: 0.09 }, soil: { c: '#5a3a24', top: '#6a4428', v: 0.08 }, bench: { c: '#7a5a3a', v: 0.05, pat: 'plank' }, bell: { c: '#c8a050', v: 0.05 },
      pump: { c: '#3a5a4a', v: 0.04 }, waterB: { c: '#5aa0d8', v: 0.03 },
      picket: { c: '#f0ece0', v: 0.03 }, flowerP: { c: '#d870b0', v: 0.05 }, flowerB: { c: '#6a8ae0', v: 0.05 },
      clay: { c: '#c8784a', v: 0.06, pat: 'brick' }, clayDk: { c: '#8a4a30', v: 0.05 }, fire: { c: '#ff8a3a', glow: true }, loaf: { c: '#d8984a', v: 0.06 }, crust: { c: '#a8642a', v: 0.05 },
      cat: { c: '#e8902a', v: 0.04 }, catW: { c: '#f8f0e0', v: 0.02 }, catE: { c: '#3a5a2a', v: 0.02 }, cloth: { c: '#e8e0d0', v: 0.03 },
    }),
    build(w) {
      const B = w.id, base = w.base, BAND = 32;
      const lvl = z => base + (4 - Math.min(4, Math.floor(z / BAND))) * 7;
      const STAIRS = [38, 88, 128];
      const onStair = x => STAIRS.some(s => x >= s && x <= s + 5);
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => lvl(z),
        surface: (x, z, y, s) => s >= 3 ? B.rockDk : B.grass,
        under: (x, z, y, dep, s) => s >= 3 ? B.found : dep < 2 ? B.dirt : B.found,
      });
      const lights = [], acts = [], landmarks = [];
      // 골목(각 단의 남쪽 가장자리), 난간, 계단
      for (let k = 0; k < 5; k++) for (let z = k * BAND + 24; z <= k * BAND + 31; z++) for (let x = 0; x < W; x++) if (z < D) MH.paint(w, x, z, z >= k * BAND + 30 ? B.cobble2 : B.cobble);
      for (let k = 0; k < 4; k++) for (let x = 0; x < W; x++) {
        const z = k * BAND + 31;
        if (onStair(x)) continue;
        w.set(x, lvl(z) + 1, z, B.whiteDk); if (x % 4 === 0) { w.set(x, lvl(z) + 2, z, B.trim); w.set(x, lvl(z) + 3, z, B.found); }
        // 옹벽 면: 줄눈 무늬
        for (let y = lvl(z + 1) + 1; y < lvl(z); y++) if ((x + y) % 6 === 0) w.set(x, y, z, B.whiteDk);
      }
      for (let k = 1; k < 5; k++) for (const sx of STAIRS) {
        const top = lvl(k * BAND - 1), bot = lvl(k * BAND);
        MH.stairs(w, sx, k * BAND, 0, 1, top - bot + 1, top, B.found, 6);
        for (let s = 0; s <= top - bot; s++) { w.set(sx - 1, top - s + 1, k * BAND + s, B.whiteDk); w.set(sx + 6, top - s + 1, k * BAND + s, B.whiteDk); if (s % 2 === 0) { w.set(sx - 1, top - s + 2, k * BAND + s, B.iron); w.set(sx + 6, top - s + 2, k * BAND + s, B.iron); } }
      }
      // 층층이 늘어선 집들 + 앞마당(울타리 · 꽃밭 · 디딤돌)
      const lines = [], allHs = [], flowers = [B.flowerR, B.flowerY, B.flowerP, B.flowerB, B.flowerW];
      for (let k = 0; k < 5; k++) {
        const z0 = k * BAND + 5, z1 = k * BAND + 16, y = lvl(z0), fz = k * BAND + 22;
        for (const [x0, x1] of [[3, 35], [47, 85], [97, 125], [137, 165]]) {
          if ((k === 2 || k === 0 || k === 3) && x0 === 47) continue;
          if (k === 2 && x0 === 97) continue;   // 빵집 마당
          const hs = block(w, B, x0, z0, x1, z1, 's', { seed: k * 3 + x0, gap: 4, min: 9, max: 11, floors: [2, 3, 2], y });
          doorLights(lights, hs, 4); allHs.push(...hs);
          for (let i = 0; i < hs.length - 1; i++) { const a = hs[i], b = hs[i + 1], yy = Math.min(a.top, b.top) - 3; lines.push([[a.x1 + 2, yy, (a.z0 + a.z1) / 2], [b.x0 - 2, yy, (b.z0 + b.z1) / 2]]); }
          hs.forEach((h, i) => {
            const dx = h.door[0];
            for (let z = z1 + 2; z <= fz; z++) { MH.paint(w, dx, z, B.slab); MH.paint(w, dx + 1, z, B.slab); }
            for (let x = h.x0; x <= h.x1; x++) {
              if (x >= dx - 1 && x <= dx + 2) continue;
              w.set(x, y + 1, fz, B.picket); if (x % 2 === 0) w.set(x, y + 2, fz, B.picket);
              if (z1 + 3 < fz) { w.set(x, y + 1, fz - 1, flowers[(x + i + k) % flowers.length]); if ((x + i) % 3 === 0) w.set(x, y + 1, fz - 2, B.hedge); }
            }
            w.set(dx - 1, y + 3, fz, B.found); w.set(dx + 2, y + 3, fz, B.found);
          });
        }
      }
      const cloth = [B.clothR, B.clothB, B.clothW, B.clothY];
      lines.slice(0, 22).forEach(([a, b], i) => {
        const hang = (p) => { for (let z = -3; z <= 3; z += 3) MH.garland(p, [a[0], a[1], a[2] + z], [b[0], b[1], b[2] + z], B.rope, cloth, 0.6); };
        if (i === 7) {
          const p = w.prop({ name: 'laundry', pivot: [(a[0] + b[0]) / 2 + 0.5, a[1] + 0.5, a[2] + 0.5], axis: 'x', rock: 0.07, rockSpeed: 1.5 });
          hang(p);
          acts.push({ name: '빨랫줄', hint: '바람에 빨래가 크게 펄럭여요', hit: [Math.floor(a[0]) - 1, a[1] - 3, Math.floor(a[2]) - 4, Math.ceil(b[0]) + 1, a[1] + 1, Math.ceil(a[2]) + 4], run: async A => { A.wind(2, 3.2); await A.spin('laundry', 7, 3.2); } });
          landmarks.push({ name: '빨랫줄 골목', note: '집과 집 사이에 걸린 빨래', p: [(a[0] + b[0]) / 2, a[1] + 7, a[2]] });
        } else hang(w);
      });
      // ── 느릅나무 쉼터(가운데 단) ──
      const EX = 64, EZ = 78, eg = lvl(EZ);
      for (let z = 67; z <= 86; z++) for (let x = 47; x <= 85; x++) MH.paint(w, x, z, (x === 47 || x === 85 || z === 67 || z === 86) ? B.found : (x + z) % 3 === 0 ? B.cobble2 : B.slab);
      MH.tree(w, EX, eg + 1, EZ, { kind: 'oak', h: 17, bark: B.bark, leaves: [B.leaf2, B.leaf, B.leafDk], r: 8, spread: 8, branches: 6, trunkR: 2 });
      w.ring(EX, EZ, eg + 1, 3.2, 4.4, B.found); w.ring(EX, EZ, eg + 2, 3.2, 4.4, B.bench);
      for (const [bx, bz] of [[52, 72], [74, 72], [52, 84], [74, 84]]) { w.box(bx, eg + 1, bz, bx + 3, eg + 1, bz, B.bench); w.box(bx, eg + 2, bz - 1, bx + 3, eg + 2, bz - 1, B.bench); w.set(bx, eg + 1, bz - 1, B.bench); w.set(bx + 3, eg + 1, bz - 1, B.bench); }
      for (const [px, pz] of [[48, 68], [84, 68], [48, 85], [84, 85]]) { w.box(px, eg + 1, pz, px, eg + 2, pz, B.clay); w.set(px, eg + 3, pz, B.hedge); w.set(px, eg + 4, pz, B.flowerP); }
      landmarks.push({ name: '느릅나무 쉼터', note: '이웃들이 모이는 그늘', p: [EX + 0.5, eg + 34, EZ + 0.5], tag: 'HOME' });
      // 손펌프와 물통
      const PX = 80, PZ = 78;
      w.box(PX - 1, eg + 1, PZ - 1, PX + 1, eg + 1, PZ + 1, B.found); w.box(PX, eg + 2, PZ, PX, eg + 5, PZ, B.pump); w.set(PX, eg + 4, PZ + 1, B.pump); w.set(PX, eg + 6, PZ, B.iron);
      w.box(PX - 1, eg + 1, PZ + 2, PX + 1, eg + 2, PZ + 4, B.found); w.set(PX, eg + 2, PZ + 3, B.waterB); w.set(PX, eg + 1, PZ + 3, B.found);
      const handle = w.prop({ name: 'handle', pivot: [PX + 0.5, eg + 6, PZ + 0.5], axis: 'x' });
      handle.box(PX, eg + 6, PZ - 1, PX, eg + 6, PZ - 4, B.iron); handle.set(PX, eg + 5, PZ - 4, B.wood);
      acts.push({
        name: '손펌프', hint: '손잡이를 저으면 물통에 물이 쏟아져요', hit: [PX - 1, eg + 1, PZ - 4, PX + 1, eg + 7, PZ + 4],
        run: async a => { for (let k = 0; k < 4; k++) { await a.turn('handle', [0.5, 0, 0], 0.3); a.burst([PX + 0.5, eg + 4, PZ + 2], { n: 22, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 1.5, up: 1, life: 0.7, gravity: 9, spread: 0.6 }); await a.turn('handle', [-0.25, 0, 0], 0.3); } await a.turn('handle', [0, 0, 0], 0.3); },
      });
      // ── 공동 텃밭(아래 단) ──
      const gz0 = 3 * BAND + 5;
      for (let z = gz0; z <= gz0 + 13; z++) for (let x = 48; x <= 84; x++) { w.set(x, lvl(z), z, B.soil); if ((z - gz0) % 3 !== 2 && (x % 6) !== 0) w.set(x, lvl(z) + 1, z, ((x >> 1) + z) % 5 === 0 ? B.flowerY : B.veg); }
      MH.fence(w, [[47, gz0 - 1], [85, gz0 - 1], [85, gz0 + 14], [47, gz0 + 14], [47, gz0 - 1]], B.bench, B.bench);
      w.box(64, lvl(gz0) + 1, gz0 + 14, 67, lvl(gz0) + 3, gz0 + 14, 0);
      // 텃밭 헛간과 물뿌리개 통
      w.box(49, lvl(gz0) + 1, gz0 + 15, 53, lvl(gz0) + 4, gz0 + 19, B.plank); w.box(51, lvl(gz0) + 1, gz0 + 19, 51, lvl(gz0) + 3, gz0 + 19, B.door);
      MH.roof(w, 48, 54, gz0 + 14, gz0 + 20, lvl(gz0) + 5, { b: B.roofG, eave: B.eave, axis: 'x' });
      w.box(56, lvl(gz0) + 1, gz0 + 16, 57, lvl(gz0) + 2, gz0 + 17, B.barrel); w.set(56, lvl(gz0) + 3, gz0 + 16, B.waterB);
      landmarks.push({ name: '공동 텃밭', note: '이웃끼리 나눠 쓰는 밭', p: [66.5, lvl(gz0) + 8, gz0 + 7] });
      // ── 예배당(맨 위 단): 속 빈 종루에 매단 종 ──
      const cy = lvl(5);
      const ch = MH.house(w, { x: 52, z: 4, sx: 24, sz: 12, fh: 11, face: 's', pitch: 2, y: cy, winGap: 4, m: { found: B.found, wall: B.white, frame: B.whiteDk, win: B.win, door: B.door, roof: B.roofB, eave: B.eave, ridge: B.gold, lamp: B.lampG } });
      // 버팀벽과 둥근 장미창
      for (let x = 52; x <= 75; x += 5) { w.box(x, cy + 1, 16, x, cy + 7, 16, B.whiteDk); w.set(x, cy + 8, 16, B.trim); }
      for (let x = 52; x <= 75; x += 5) { w.box(x, cy + 1, 3, x, cy + 7, 3, B.whiteDk); }
      const tx = 61, tz = 16, TH = 30;
      w.box(tx, cy + 1, tz, tx + 5, cy + TH, tz + 5, B.white);
      for (const y of [cy + 12, cy + 20]) w.walls(tx - 1, y, tz - 1, tx + 6, y, tz + 6, B.whiteDk);
      w.box(tx + 2, cy + 1, tz + 5, tx + 3, cy + 5, tz + 5, B.door); w.box(tx + 1, cy + 6, tz + 5, tx + 4, cy + 6, tz + 5, B.gold); w.box(tx + 2, cy + 14, tz + 5, tx + 3, cy + 18, tz + 5, B.win);
      w.box(tx + 1, cy + 22, tz, tx + 4, cy + 28, tz + 5, 0); w.box(tx, cy + 22, tz + 1, tx + 5, cy + 28, tz + 4, 0);
      w.box(tx + 1, cy + 21, tz + 1, tx + 4, cy + 21, tz + 4, B.whiteDk);
      for (const x of [tx, tx + 5]) for (const z of [tz, tz + 5]) w.box(x, cy + 22, z, x, cy + 28, z, B.white);
      w.box(tx, cy + 29, tz, tx + 5, cy + TH, tz + 5, B.white); w.box(tx, cy + 28, tz + 2, tx + 5, cy + 28, tz + 3, B.wood);
      w.walls(tx - 1, cy + TH + 1, tz - 1, tx + 6, cy + TH + 1, tz + 6, B.trim);
      const st = MH.pyramid(w, tx - 1, tz - 1, tx + 6, tz + 6, cy + TH + 2, B.roofB, 4, B.eave);
      w.box(tx + 2, st, tz + 2, tx + 3, st + 3, tz + 3, B.gold);
      // 예배당 앞뜰: 판석 길과 낮은 회양목 울
      for (let z = tz + 6; z <= 23; z++) for (let x = tx; x <= tx + 5; x++) MH.paint(w, x, z, B.slab);
      for (let x = 50; x <= 77; x++) if (x < tx - 1 || x > tx + 6) { w.set(x, cy + 1, 22, B.hedge); if (x % 5 === 0) w.set(x, cy + 2, 22, B.flowerW); }
      const bell = w.prop({ name: 'bell', pivot: [tx + 3, cy + 28, tz + 3], axis: 'x' });
      bell.box(tx + 2, cy + 26, tz + 2, tx + 3, cy + 27, tz + 3, B.iron); bell.ellipsoid(tx + 2.5, cy + 24.5, tz + 2.5, 1.7, 1.7, 1.7, B.bell, (dx, dy) => dy >= -1);
      acts.push({
        name: '예배당 종', hint: '저녁 기도 종이 울리고 새들이 날아올라요', hit: [tx, cy + 22, tz, tx + 5, cy + 28, tz + 5],
        run: async a => { for (let k = 0; k < 4; k++) { await a.turn('bell', [0.45, 0, 0], 0.4); a.burst([tx + 3, cy + 30, tz + 3], { n: 14, colors: ['#3a3040', '#6a5a70'], speed: 8, up: 4, life: 2, gravity: -0.5, spread: 3 }); await a.turn('bell', [-0.45, 0, 0], 0.4); } await a.turn('bell', [0, 0, 0], 0.4); },
      });
      lights.push({ p: [ch.door[0] + 0.5, ch.door[1] + 3, ch.door[2] + 1.5], c: '#ffd890', i: 1, d: 12, flicker: 0.1, night: true });
      landmarks.push({ name: '작은 예배당', note: '푸른 첨탑의 종', p: [tx + 3, st + 7, tz + 3] });
      // ── 첨탑 풍향계(부품) ──
      w.set(tx + 2, st + 4, tz + 2, B.iron);
      const vane = w.prop({ name: 'vane', pivot: [tx + 3, st + 5, tz + 2.5], speed: 0.25 });
      vane.box(tx, st + 5, tz + 2, tx + 5, st + 5, tz + 2, B.iron); vane.box(tx + 4, st + 4, tz + 2, tx + 4, st + 6, tz + 2, B.gold); vane.set(tx + 5, st + 5, tz + 2, B.gold);
      vane.box(tx, st + 6, tz + 2, tx + 1, st + 6, tz + 2, B.iron); vane.box(tx + 2, st + 6, tz + 2, tx + 2, st + 8, tz + 2, B.gold); vane.set(tx + 3, st + 7, tz + 2, B.gold); vane.set(tx + 1, st + 7, tz + 2, B.gold);
      acts.push({
        name: '첨탑 풍향계', hint: '바람이 거세지며 첨탑 꼭대기의 금빛 수탉 풍향계가 팽팽 돌아요', hit: [tx - 1, st + 3, tz, tx + 6, st + 9, tz + 5],
        run: async a => { a.wind(3, 3.6); for (let k = 0; k < 3; k++) a.burst([tx + 3, st + 6, tz + 3], { n: 10, colors: ['#3a3040', '#6a5a70'], speed: 7, up: 2, life: 2, gravity: -0.4, spread: 3 }); await a.spin('vane', 24, 3.6); },
      });
      // ── 쉼터 그네(부품) ──
      const SX = 50, SZ = 79;
      for (const x of [SX - 2, SX + 2]) { w.box(x, eg + 1, SZ, x, eg + 8, SZ, B.wood); w.line(x, eg + 1, SZ - 2, x, eg + 6, SZ, B.wood); w.line(x, eg + 1, SZ + 2, x, eg + 6, SZ, B.wood); }
      w.box(SX - 2, eg + 9, SZ, SX + 2, eg + 9, SZ, B.wood);
      const swing = w.prop({ name: 'swing', pivot: [SX + 0.5, eg + 9, SZ + 0.5], axis: 'x', rock: 0.04, rockSpeed: 1.4 });
      for (const x of [SX - 1, SX + 1]) swing.box(x, eg + 3, SZ, x, eg + 8, SZ, B.rope);
      swing.box(SX - 1, eg + 2, SZ, SX + 1, eg + 2, SZ, B.bench);
      acts.push({
        name: '쉼터 그네', hint: '바람이 불자 느릅나무 옆 그네가 높이 흔들리고 잎이 흩날려요', hit: [SX - 2, eg + 1, SZ - 2, SX + 2, eg + 9, SZ + 2],
        run: async a => {
          a.wind(2.5, 4);
          for (const amp of [0.5, 0.9, 1.1, 0.8, 0.5, 0.25]) {
            a.burst([EX + 0.5, eg + 16, EZ + 0.5], { n: 12, colors: ['#6aaa48', '#4a8a3a', '#e8c040'], speed: 5, up: 1, life: 2.2, gravity: 2, spread: 6 });
            await a.turn('swing', [amp, 0, 0], 0.55); await a.turn('swing', [-amp, 0, 0], 0.55);
          }
          await a.turn('swing', [0, 0, 0], 0.5);
        },
      });
      // ── 텃밭 해바라기(부품): 물을 주면 쑥쑥 자란다 ──
      const gy = lvl(gz0) + 1, sun = w.prop({ name: 'sunflowers', pivot: [66, gy, gz0 + 6], scl0: [1, 0.05, 1] });
      const spots = [[54, gz0 + 2], [60, gz0 + 5], [66, gz0 + 2], [72, gz0 + 5], [78, gz0 + 2], [54, gz0 + 8], [72, gz0 + 8], [78, gz0 + 11], [60, gz0 + 11]];
      for (const [x, z] of spots) { sun.box(x, gy, z, x, gy + 4, z, B.veg); sun.box(x - 1, gy + 5, z, x + 1, gy + 7, z, B.flowerY); sun.set(x, gy + 6, z, B.bark); sun.set(x + 1, gy + 3, z, B.veg); }
      acts.push({
        name: '텃밭 해바라기', hint: '텃밭에 물을 뿌리면 해바라기가 쑥쑥 자라 꽃을 피워요', hit: [48, gy - 1, gz0, 84, gy + 3, gz0 + 12],
        run: async a => {
          for (let k = 0; k < 6; k++) { for (const z of [gz0 + 2, gz0 + 8]) a.burst([51 + k * 6, gy + 6, z + 0.5], { n: 18, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 2, up: 2, life: 1, gravity: 10, spread: 2 }); await a.wait(0.3); }
          await a.tween('sunflowers', { scl: [1, 1, 1] }, 2.4);
          for (const [x, z] of spots) a.burst([x + 0.5, gy + 7, z + 1], { n: 8, colors: ['#ffe060', '#fff4c0'], speed: 2, up: 2, life: 1.4, gravity: 0.5, spread: 1 });
          await a.wait(2.6);
          await a.tween('sunflowers', { scl: [1, 0.05, 1] }, 2);
        },
      });

      // ══ 새 구역: 동쪽 빵집 마당(가운데 단 동쪽) ══
      const bz0 = 2 * BAND, by = lvl(bz0 + 4);
      for (let z = bz0 + 2; z <= bz0 + 23; z++) for (let x = 96; x <= 126; x++) MH.paint(w, x, z, (x + z) % 4 === 0 ? B.cobble2 : ((x * 3 + z) % 7 === 0 ? B.found : B.cobble));
      // 빵집: 노란 벽 이층집, 가게 창과 차양
      const bk = MH.houseX(w, { x: 112, z: bz0 + 4, sx: 13, sz: 11, floors: 2, fh: 6, face: 'w', jetty: true, studs: true, y: by, dormers: 1,
        m: { found: B.found, wall: B.plasterY, frame: B.frame, quoin: B.found, win: B.win, shutter: B.shutR, sill: B.found, flower: B.flowerR, door: B.door, roof: B.roofR, eave: B.eave, ridge: B.trim, chimney: B.clay, lamp: B.lampG } });
      for (let z = bz0 + 4; z <= bz0 + 14; z++) { w.set(110, by + 6, z, z % 2 ? B.clothR : B.cloth); w.set(109, by + 5, z, z % 2 ? B.clothR : B.cloth); }
      for (const z of [bz0 + 4, bz0 + 14]) w.box(109, by + 1, z, 109, by + 4, z, B.wood);
      w.box(110, by + 1, bz0 + 6, 110, by + 2, bz0 + 12, B.plank);
      for (let z = bz0 + 6; z <= bz0 + 12; z++) w.set(110, by + 3, z, z % 2 ? B.loaf : B.crust);
      // 돌 화덕: 둥근 지붕, 아궁이, 굴뚝
      const OX = 104, OZ = bz0 + 9;
      w.box(OX - 4, by + 1, OZ - 4, OX + 4, by + 2, OZ + 4, B.found);
      w.ellipsoid(OX, by + 3, OZ, 4, 4, 4, B.clay, (dx, dy) => dy >= 0);
      w.ellipsoid(OX, by + 3, OZ, 2.6, 2.6, 2.6, 0, (dx, dy) => dy >= 0);
      w.box(OX - 1, by + 3, OZ + 2, OX + 1, by + 4, OZ + 4, 0); w.box(OX - 2, by + 5, OZ + 4, OX + 2, by + 5, OZ + 4, B.clayDk); w.box(OX - 2, by + 3, OZ + 4, OX - 2, by + 4, OZ + 4, B.clayDk); w.box(OX + 2, by + 3, OZ + 4, OX + 2, by + 4, OZ + 4, B.clayDk);
      w.box(OX - 1, by + 3, OZ - 1, OX + 1, by + 3, OZ + 1, B.fire);
      w.box(OX, by + 6, OZ - 2, OX + 1, by + 10, OZ - 1, B.clayDk); w.box(OX - 1, by + 11, OZ - 3, OX + 2, by + 11, OZ, B.found);
      // 장작더미 · 밀가루 자루 · 나무 탁자
      w.box(OX - 7, by + 1, OZ + 4, OX - 5, by + 3, OZ + 7, B.wood); for (let z = OZ + 4; z <= OZ + 7; z++) w.set(OX - 6, by + 4, z, B.bark);
      for (const [sx, sz] of [[OX + 6, OZ - 4], [OX + 6, OZ - 3], [OX + 7, OZ - 4]]) w.box(sx, by + 1, sz, sx, by + 2, sz, B.cloth);
      for (const [tx2, tz2] of [[OX - 4, OZ + 10], [OX + 5, OZ + 10]]) { w.box(tx2, by + 2, tz2, tx2 + 3, by + 2, tz2 + 1, B.plank); for (const [dx, dz] of [[0, 0], [3, 0], [0, 1], [3, 1]]) w.set(tx2 + dx, by + 1, tz2 + dz, B.wood); w.set(tx2 + 1, by + 3, tz2, B.loaf); w.box(tx2, by + 1, tz2 - 2, tx2 + 3, by + 1, tz2 - 2, B.bench); w.box(tx2, by + 1, tz2 + 3, tx2 + 3, by + 1, tz2 + 3, B.bench); }
      // 빵 삽(부품): 화덕 아궁이에서 빵을 꺼낸다
      const peel = w.prop({ name: 'peel', pivot: [OX + 0.5, by + 3, OZ + 0.5] });
      peel.box(OX, by + 3, OZ + 4, OX, by + 3, OZ + 9, B.wood); peel.box(OX - 1, by + 3, OZ + 2, OX + 1, by + 3, OZ + 3, B.plank);
      const loaves = w.prop({ name: 'loaves', pivot: [OX + 0.5, by + 4, OZ + 2.5], scl0: [0.001, 0.001, 0.001] });
      loaves.set(OX - 1, by + 4, OZ + 2, B.loaf); loaves.set(OX + 1, by + 4, OZ + 3, B.loaf); loaves.set(OX, by + 4, OZ + 3, B.crust); loaves.set(OX, by + 4, OZ + 2, B.loaf);
      lights.push({ name: 'oven', p: [OX + 0.5, by + 4, OZ + 0.5], c: '#ff9a4a', i: 1.4, d: 18, flicker: 0.3 });
      acts.push({
        name: '빵집 화덕', hint: '화덕 불이 확 일어나고 빵 삽이 갓 구운 빵을 꺼내요', hit: [OX - 4, by + 1, OZ - 4, OX + 4, by + 7, OZ + 9],
        run: async a => {
          a.flash('oven', 4, 3);
          for (let k = 0; k < 4; k++) { a.burst([OX + 0.5, by + 12, OZ - 1], { n: 10, colors: ['#d8d0d0', '#a8a0a8', '#f0e8e8'], speed: 0.6, up: 3.5, life: 2.4, gravity: -0.6, spread: 0.6 }); a.burst([OX + 0.5, by + 4, OZ + 4], { n: 8, colors: ['#ffb060', '#ffe0a0'], speed: 1.5, up: 1.5, life: 0.6, gravity: -0.5, spread: 0.6 }); await a.wait(0.4); }
          await a.tween('loaves', { scl: [1, 1, 1] }, 0.1);
          await Promise.all([a.move('peel', [0, 0, 5], 1.4), a.move('loaves', [0, 0, 5], 1.4)]);
          a.burst([OX + 0.5, by + 6, OZ + 8], { n: 24, colors: ['#ffe8c0', '#ffffff', '#f0d8a0'], speed: 1, up: 3, life: 1.8, gravity: -0.4, spread: 1 });
          await a.wait(1.6);
          await a.tween('loaves', { scl: [0.001, 0.001, 0.001] }, 0.6);
          await Promise.all([a.move('peel', [0, 0, 0], 1.2), a.move('loaves', [0, 0, 0], 1.2)]);
        },
      });
      landmarks.push({ name: '빵집 화덕', note: '아침마다 갓 구운 빵 냄새', p: [OX + 0.5, by + 18, OZ + 0.5], tag: 'BAKERY' });
      // 두레박 우물(부품): 밧줄이 풀리며 두레박이 내려갔다 물을 길어 올린다
      const WX = 97, WZ = bz0 + 6;
      w.cyl(WX, WZ, by + 1, by + 3, 2.4, B.found); w.cyl(WX, WZ, by + 1, by + 3, 1.4, 0); w.cyl(WX, WZ, by - 4, by, 1.4, 0);
      for (let y = by - 4; y <= by; y++) w.cyl(WX, WZ, y, y, 1.4, 0);
      w.cyl(WX, WZ, by - 5, by - 5, 1.4, B.found); w.cyl(WX, WZ, by - 4, by - 4, 1.4, B.waterB);
      for (const x of [WX - 2, WX + 2]) w.box(x, by + 4, WZ, x, by + 9, WZ, B.wood);
      w.box(WX - 2, by + 9, WZ, WX + 2, by + 9, WZ, B.iron); MH.roof(w, WX - 3, WX + 3, WZ - 2, WZ + 2, by + 10, { b: B.roofR, eave: B.eave, ridge: B.trim, axis: 'x' });
      const wTop = by + 5, wLen = by + 8 - wTop - 1;
      MH.rope(w, 'wrope', WX, by + 8, WZ, wLen, B.rope);
      const bucket = w.prop({ name: 'bucket', pivot: [WX + 0.5, wTop - 1, WZ + 0.5] });
      bucket.box(WX, wTop - 1, WZ, WX, wTop, WZ, B.barrel); bucket.set(WX, wTop + 1, WZ, B.iron);
      acts.push({
        name: '두레박 우물', hint: '밧줄이 풀리며 두레박이 우물 속으로 내려갔다가 물을 가득 길어 올려요', hit: [WX - 2, by + 1, WZ - 2, WX + 2, by + 9, WZ + 2],
        run: async a => {
          const dn = 5;
          await Promise.all([a.move('bucket', [0, -dn, 0], 1.8), a.rope('wrope', wLen, wLen + dn, 1.8)]);
          a.burst([WX + 0.5, by - 2, WZ + 0.5], { n: 16, colors: ['#e0f4ff', '#8ac0f0'], speed: 1.5, up: 2, life: 0.6, gravity: 8, spread: 0.6 });
          await a.wait(0.6);
          await Promise.all([a.move('bucket', [0, 0, 0], 2.2), a.rope('wrope', wLen, wLen, 2.2)]);
          a.burst([WX + 0.5, wTop + 1, WZ + 0.5], { n: 18, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 1.5, up: 2, life: 0.8, gravity: 9, spread: 0.8 });
          await a.wait(0.5);
        },
      });
      landmarks.push({ name: '두레박 우물', note: '빵집 반죽 물을 긷는 우물', p: [WX + 0.5, by + 16, WZ + 0.5] });
      lights.push({ p: MH.lamp(w, 124, bz0 + 22, { m: { post: B.iron, glow: B.lampG, found: B.found }, h: 6 }), c: '#ffd890', i: 1.1, d: 15, flicker: 0.1, night: true });

      // ── 골목 고양이(부품): 옹벽 난간 위를 따라 사뿐사뿐 걸어간다 ──
      const ck = 2, CZ = ck * BAND + 31, cyy = lvl(CZ) + 2, CX0 = 100;
      const cat = w.prop({ name: 'cat', pivot: [CX0 + 0.5, cyy, CZ + 0.5] });
      cat.box(CX0 - 1, cyy, CZ, CX0 + 1, cyy, CZ, B.cat); cat.set(CX0 + 2, cyy + 1, CZ, B.cat); cat.set(CX0 + 2, cyy, CZ, B.catW); cat.set(CX0 + 3, cyy + 1, CZ, B.catE);
      cat.set(CX0 + 2, cyy + 2, CZ, B.cat); cat.set(CX0 - 2, cyy + 1, CZ, B.cat); cat.set(CX0 - 2, cyy + 2, CZ, B.cat);
      for (let x = CX0 - 3; x <= CX0 + 4; x++) w.set(x, cyy - 1, CZ, B.whiteDk);   // 난간 위 이음돌
      for (let x = CX0 - 3; x < W; x++) if (!onStair(x)) { if (w.get(x, cyy, CZ) === B.trim) w.set(x, cyy, CZ, 0); if (w.get(x, cyy + 1, CZ) === B.found) w.set(x, cyy + 1, CZ, 0); w.set(x, cyy - 1, CZ, B.whiteDk); }
      acts.push({
        name: '골목 고양이', hint: '주황 고양이가 옹벽 난간 위를 사뿐사뿐 걸어 동쪽 골목 끝 안개 속으로 사라져요', hit: [CX0 - 2, cyy, CZ - 1, CX0 + 3, cyy + 2, CZ + 1],
        run: async a => {
          const steps = async () => { for (let k = 0; k < 10; k++) { a.burst([CX0 + 2 + k * 7, cyy + 1, CZ + 0.5], { n: 4, colors: ['#ffe8c0'], speed: 0.6, up: 1, life: 0.6, gravity: 1, spread: 0.4 }); await a.wait(0.8); } };
          await Promise.all([a.drive('cat', [[10, 0, 0], [26, 0, 0], [44, 0, 0], [76, 0, 0]], 9, { fwd: '+x', back: 1.0 }), steps()]);
        },
      });

      // ── 굴뚝 연기 ──
      const chims = allHs.filter(h => h.chimney && Math.abs(h.chimney[0] - 84) < 66 && Math.abs(h.chimney[2] - 84) < 64).map(h => h.chimney);
      const c0 = chims.slice().sort((p, q) => (q[2] - Math.abs(q[0] - 100) * 0.5) - (p[2] - Math.abs(p[0] - 100) * 0.5))[0];
      acts.push({
        name: '굴뚝 연기', hint: '저녁밥 짓는 시간, 집집마다 굴뚝에서 연기가 피어올라요', hit: [Math.floor(c0[0]) - 1, Math.floor(c0[1]) - 6, Math.floor(c0[2]) - 1, Math.floor(c0[0]) + 1, Math.floor(c0[1]) - 2, Math.floor(c0[2]) + 1],
        run: async a => {
          for (let k = 0; k < 8; k++) { for (const c of chims) a.burst([c[0], c[1] - 1, c[2]], { n: 4, colors: ['#d8d0d0', '#a8a0a8', '#f0e8e8'], speed: 0.6, up: 3.5, life: 2.4, gravity: -0.6, spread: 0.6 }); await a.wait(0.45); }
        },
      });
      // ── 저녁 창불: 아래 단부터 위 단까지 남향 창에 차례로 불이 켜진다 ──
      const wins = [], clear = (x, y, z) => { for (let t = 1; t < 40; t++) if (w.get(Math.floor(x + t * 0.45), Math.floor(y + t * 0.56), Math.floor(z + t * 0.69))) return false; return true; };
      for (let z = 1; z < D - 1; z++) for (let x = 0; x < W; x++) for (let y = base; y < base + 64; y++) if (w.get(x, y, z) === B.win && !w.get(x, y, z + 1) && !w.get(x, y, z + 2) && !w.get(x, y + 1, z + 1) && (x + y) % 2 === 0 && Math.pow(((x - 84) / 84) ** 4 + ((z - 84) / 84) ** 4, 0.25) < 0.72 && clear(x + 0.5, y + 0.5, z + 2)) wins.push([x + 0.5, y, z + 2]);
      const wh = allHs.filter(h => h.z0 === 3 * BAND + 5 && h.x0 >= 97)[0];
      acts.push({
        name: '저녁 창불', hint: '해가 지면 아래 골목부터 언덕 위까지 창문마다 불이 켜져요', hit: [wh.x0, wh.y + 1, wh.z1, wh.x1, wh.top, wh.z1 + 1],
        run: async a => {
          const o = { n: 4, colors: ['#ffd890', '#fff0c0'], speed: 0.4, up: 0.5, life: 1.2, gravity: 0, spread: 0.4 };
          for (let k = 4; k >= 0; k--) { wins.filter(p => Math.floor(p[2] / BAND) === k).forEach(p => a.burst(p, o)); await a.wait(0.7); }
          await a.wait(0.6);
        },
      });
      // ── 가로등(밤에 켜진다), 화분 ──
      for (let k = 0; k < 5; k++) for (const lx of [14, 60, 108, 150]) {
        const lz = k * BAND + 27;
        if (lz >= D - 1) continue;
        const p = MH.lamp(w, lx, lz, { m: { post: B.iron, glow: B.lampG, found: B.found }, h: 6 });
        if ((k + lx) % 4 !== 1) lights.push({ p, c: '#ffd890', i: 1.1, d: 15, flicker: 0.1, night: true });
      }
      MH.scatter(w, 1100, (x, g, z, b) => { if (b === B.grass && w.chance(0.2)) w.set(x, g + 1, z, w.pick([B.flowerR, B.flowerY, B.hedge])); });
      return { lights, landmarks, acts };
    },
  });
})();
