// 주택가 — 언덕을 오르는 계단식 골목, 빨랫줄, 느릅나무 쉼터, 꼭대기 예배당 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  const { KP, block, doorLights } = window.KINGDOM;
  MAPS.push({
    id: 'elmrow', cat: 'kingdom', name: '주택가', en: 'Elm Row', color: '#d8b08a', seed: 213, base: 20, time: 'day',
    desc: '성벽 안쪽 언덕을 따라 층층이 들어선 주택가. 해 질 녘이면 골목마다 창문에 불이 켜진다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['위치', '왕도 서쪽 언덕'], ['명물', '느릅나무 쉼터 · 작은 예배당'], ['소문', '예배당 종지기는 밤마다 지붕 위를 걷는다']] },
    sky: ['#f8c088', '#5a4a8a', '#ffd8a0'], stars: false,
    hemi: ['#ffe0c8', '#3a3040', 0.54], sun: ['#ffb880', 0.74, [0.7, 0.6, 0.45]],
    liquid: ['#2a5a8a', '#4a8ac0', '#e0f4ff'], liqSpeed: 0.7,
    fog: { start: 0.76, floor: 10, depth: 10, haze: [22, 0.14, 6], hazeColor: '#e8b890' },
    camY: 16,
    particles: [
      { n: 16, colors: ['#3a3040', '#6a5a70'], mode: 'wisp', speed: 1, size: 2, y0: 62, glow: false },
      { n: 70, colors: ['#ffe8c0', '#fff4e0'], mode: 'drift', speed: 0.25, y0: 24, y1: 80, glow: false },
    ],
    blocks: Object.assign({}, KP, {
      clothR: { c: '#d86a6a', v: 0.02 }, clothB: { c: '#7aa8d8', v: 0.02 }, clothW: { c: '#f4f0e8', v: 0.02 }, clothY: { c: '#f0d870', v: 0.02 },
      veg: { c: '#5aa040', v: 0.09 }, soil: { c: '#5a3a24', top: '#6a4428', v: 0.08 }, bench: { c: '#7a5a3a', v: 0.05, pat: 'plank' }, bell: { c: '#c8a050', v: 0.05 },
      pump: { c: '#3a5a4a', v: 0.04 }, waterB: { c: '#5aa0d8', v: 0.03 },
    }),
    build(w) {
      const B = w.id, base = w.base, BAND = 26;
      const lvl = z => base + (4 - Math.min(4, Math.floor(z / BAND))) * 7;
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => lvl(z),
        surface: (x, z, y, s) => s >= 3 ? B.rockDk : B.grass,
        under: (x, z, y, dep, s) => s >= 3 ? B.found : dep < 2 ? B.dirt : B.found,
      });
      const lights = [], acts = [], landmarks = [];
      // 골목(각 단의 남쪽 가장자리), 난간, 계단
      for (let k = 0; k < 5; k++) for (let z = k * BAND + 19; z <= k * BAND + 25; z++) for (let x = 0; x < W; x++) if (z < D) MH.paint(w, x, z, z >= k * BAND + 24 ? B.cobble2 : B.cobble);
      for (let k = 0; k < 4; k++) for (let x = 0; x < W; x++) { const z = k * BAND + 25; if ((x >= 38 && x <= 43) || (x >= 88 && x <= 93)) continue; w.set(x, lvl(z) + 1, z, B.whiteDk); if (x % 4 === 0) w.set(x, lvl(z) + 2, z, B.trim); }
      for (let k = 1; k < 5; k++) for (const sx of [38, 88]) {
        const top = lvl(k * BAND - 1), bot = lvl(k * BAND);
        MH.stairs(w, sx, k * BAND, 0, 1, top - bot + 1, top, B.found, 6);
        for (let s = 0; s <= top - bot; s++) { w.set(sx - 1, top - s + 1, k * BAND + s, B.whiteDk); w.set(sx + 6, top - s + 1, k * BAND + s, B.whiteDk); }
      }
      // 층층이 늘어선 집들
      const lines = [], allHs = [];
      for (let k = 0; k < 5; k++) {
        const z0 = k * BAND + 5, z1 = k * BAND + 16;
        if (z1 >= D - 2) continue;
        for (const [x0, x1] of [[3, 35], [47, 85], [97, 125]]) {
          if ((k === 2 || k === 0 || k === 3) && x0 === 47) continue;
          const hs = block(w, B, x0, z0, x1, z1, 's', { seed: k * 3 + x0, gap: 4, min: 9, max: 11, floors: [2, 3, 2], y: lvl(z0) });
          doorLights(lights, hs, 4); allHs.push(...hs);
          for (let i = 0; i < hs.length - 1; i++) { const a = hs[i], b = hs[i + 1], y = Math.min(a.top, b.top) - 3; lines.push([[a.x1 + 2, y, (a.z0 + a.z1) / 2], [b.x0 - 2, y, (b.z0 + b.z1) / 2]]); }
        }
      }
      const cloth = [B.clothR, B.clothB, B.clothW, B.clothY];
      lines.slice(0, 16).forEach(([a, b], i) => {
        const hang = (p) => { for (let z = -3; z <= 3; z += 3) MH.garland(p, [a[0], a[1], a[2] + z], [b[0], b[1], b[2] + z], B.rope, cloth, 0.6); };
        if (i === 5) {
          const p = w.prop({ name: 'laundry', pivot: [(a[0] + b[0]) / 2 + 0.5, a[1] + 0.5, a[2] + 0.5], axis: 'x', rock: 0.07, rockSpeed: 1.5 });
          hang(p);
          acts.push({ name: '빨랫줄', hint: '바람에 빨래가 크게 펄럭여요', hit: [Math.floor(a[0]) - 1, a[1] - 3, Math.floor(a[2]) - 4, Math.ceil(b[0]) + 1, a[1] + 1, Math.ceil(a[2]) + 4], run: async A => { await A.spin('laundry', 7, 3.2); } });
          landmarks.push({ name: '빨랫줄 골목', note: '집과 집 사이에 걸린 빨래', p: [(a[0] + b[0]) / 2, a[1] + 7, a[2]] });
        } else hang(w);
      });
      // ── 느릅나무 쉼터(가운데 단) ──
      const EX = 64, EZ = 62, eg = lvl(EZ);
      for (let z = 55; z <= 70; z++) for (let x = 47; x <= 85; x++) MH.paint(w, x, z, (x + z) % 3 === 0 ? B.cobble2 : B.slab);
      MH.tree(w, EX, eg + 1, EZ, { kind: 'oak', h: 16, bark: B.bark, leaves: [B.leaf2, B.leaf, B.leafDk], r: 7.5, spread: 8, branches: 6, trunkR: 2 });
      w.ring(EX, EZ, eg + 1, 3.2, 4.4, B.found); w.ring(EX, EZ, eg + 2, 3.2, 4.4, B.bench);
      for (const [bx, bz] of [[52, 58], [74, 58], [52, 68], [74, 68]]) { w.box(bx, eg + 1, bz, bx + 3, eg + 1, bz, B.bench); w.box(bx, eg + 2, bz - 1, bx + 3, eg + 2, bz - 1, B.bench); w.set(bx, eg + 1, bz - 1, B.bench); w.set(bx + 3, eg + 1, bz - 1, B.bench); }
      landmarks.push({ name: '느릅나무 쉼터', note: '이웃들이 모이는 그늘', p: [EX + 0.5, eg + 32, EZ + 0.5], tag: 'HOME' });
      // 손펌프와 물통
      const PX = 80, PZ = 62;
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
      for (let z = gz0; z <= gz0 + 11; z++) for (let x = 48; x <= 84; x++) { w.set(x, lvl(z), z, B.soil); if ((z - gz0) % 3 !== 2 && (x % 6) !== 0) w.set(x, lvl(z) + 1, z, ((x >> 1) + z) % 5 === 0 ? B.flowerY : B.veg); }
      MH.fence(w, [[47, gz0 - 1], [85, gz0 - 1], [85, gz0 + 12], [47, gz0 + 12], [47, gz0 - 1]], B.bench, B.bench);
      w.box(64, lvl(gz0) + 1, gz0 + 12, 67, lvl(gz0) + 3, gz0 + 12, 0);
      landmarks.push({ name: '공동 텃밭', note: '이웃끼리 나눠 쓰는 밭', p: [66.5, lvl(gz0) + 7, gz0 + 6] });
      // ── 예배당(맨 위 단): 속 빈 종루에 매단 종 ──
      const cy = lvl(5);
      const ch = MH.house(w, { x: 52, z: 4, sx: 24, sz: 12, fh: 11, face: 's', pitch: 2, y: cy, winGap: 4, m: { found: B.found, wall: B.white, frame: B.whiteDk, win: B.win, door: B.door, roof: B.roofB, eave: B.eave, ridge: B.gold, lamp: B.lampG } });
      const tx = 61, tz = 16, TH = 30;
      w.box(tx, cy + 1, tz, tx + 5, cy + TH, tz + 5, B.white);
      for (const y of [cy + 12, cy + 20]) w.walls(tx - 1, y, tz - 1, tx + 6, y, tz + 6, B.whiteDk);
      w.box(tx + 2, cy + 1, tz + 5, tx + 3, cy + 5, tz + 5, B.door); w.box(tx + 2, cy + 14, tz + 5, tx + 3, cy + 18, tz + 5, B.win);
      w.box(tx + 1, cy + 22, tz, tx + 4, cy + 28, tz + 5, 0); w.box(tx, cy + 22, tz + 1, tx + 5, cy + 28, tz + 4, 0);
      w.box(tx + 1, cy + 21, tz + 1, tx + 4, cy + 21, tz + 4, B.whiteDk);
      for (const x of [tx, tx + 5]) for (const z of [tz, tz + 5]) w.box(x, cy + 22, z, x, cy + 28, z, B.white);
      w.box(tx, cy + 29, tz, tx + 5, cy + TH, tz + 5, B.white); w.box(tx, cy + 28, tz + 2, tx + 5, cy + 28, tz + 3, B.wood);
      w.walls(tx - 1, cy + TH + 1, tz - 1, tx + 6, cy + TH + 1, tz + 6, B.trim);
      const st = MH.pyramid(w, tx - 1, tz - 1, tx + 6, tz + 6, cy + TH + 2, B.roofB, 4, B.eave);
      w.box(tx + 2, st, tz + 2, tx + 3, st + 3, tz + 3, B.gold);
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
      const SX = 49, SZ = 63;
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
      const spots = [[54, gz0 + 2], [60, gz0 + 5], [66, gz0 + 2], [72, gz0 + 5], [78, gz0 + 2], [54, gz0 + 8], [72, gz0 + 8], [78, gz0 + 11]];
      for (const [x, z] of spots) { sun.box(x, gy, z, x, gy + 4, z, B.veg); sun.box(x - 1, gy + 5, z, x + 1, gy + 7, z, B.flowerY); sun.set(x, gy + 6, z, B.bark); sun.set(x + 1, gy + 3, z, B.veg); }
      acts.push({
        name: '텃밭 해바라기', hint: '텃밭에 물을 뿌리면 해바라기가 쑥쑥 자라 꽃을 피워요', hit: [48, gy - 1, gz0, 84, gy + 3, gz0 + 11],
        run: async a => {
          for (let k = 0; k < 6; k++) { for (const z of [gz0 + 2, gz0 + 8]) a.burst([51 + k * 6, gy + 6, z + 0.5], { n: 18, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 2, up: 2, life: 1, gravity: 10, spread: 2 }); await a.wait(0.3); }
          await a.tween('sunflowers', { scl: [1, 1, 1] }, 2.4);
          for (const [x, z] of spots) a.burst([x + 0.5, gy + 7, z + 1], { n: 8, colors: ['#ffe060', '#fff4c0'], speed: 2, up: 2, life: 1.4, gravity: 0.5, spread: 1 });
          await a.wait(2.6);
          await a.tween('sunflowers', { scl: [1, 0.05, 1] }, 2);
        },
      });
      // ── 굴뚝 연기 ──
      const chims = allHs.filter(h => h.chimney && Math.abs(h.chimney[0] - 64) < 50 && Math.abs(h.chimney[2] - 64) < 48).map(h => h.chimney);
      const c0 = chims.slice().sort((p, q) => (q[2] - Math.abs(q[0] - 80) * 0.5) - (p[2] - Math.abs(p[0] - 80) * 0.5))[0];
      acts.push({
        name: '굴뚝 연기', hint: '저녁밥 짓는 시간, 집집마다 굴뚝에서 연기가 피어올라요', hit: [Math.floor(c0[0]) - 1, Math.floor(c0[1]) - 6, Math.floor(c0[2]) - 1, Math.floor(c0[0]) + 1, Math.floor(c0[1]) - 2, Math.floor(c0[2]) + 1],
        run: async a => {
          for (let k = 0; k < 8; k++) { for (const c of chims) a.burst([c[0], c[1] - 1, c[2]], { n: 5, colors: ['#d8d0d0', '#a8a0a8', '#f0e8e8'], speed: 0.6, up: 3.5, life: 2.4, gravity: -0.6, spread: 0.6 }); await a.wait(0.45); }
        },
      });
      // ── 저녁 창불: 아래 단부터 위 단까지 남향 창에 차례로 불이 켜진다 ──
      const wins = [], clear = (x, y, z) => { for (let t = 1; t < 40; t++) if (w.get(Math.floor(x + t * 0.45), Math.floor(y + t * 0.56), Math.floor(z + t * 0.69))) return false; return true; };
      for (let z = 1; z < D - 1; z++) for (let x = 0; x < W; x++) for (let y = base; y < base + 60; y++) if (w.get(x, y, z) === B.win && !w.get(x, y, z + 1) && !w.get(x, y, z + 2) && !w.get(x, y + 1, z + 1) && (x + y) % 2 === 0 && Math.pow(((x - 64) / 64) ** 4 + ((z - 64) / 64) ** 4, 0.25) < 0.7 && clear(x + 0.5, y + 0.5, z + 2)) wins.push([x + 0.5, y, z + 2]);
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
      for (let k = 0; k < 5; k++) for (const lx of [14, 60, 108]) {
        const lz = k * BAND + 22;
        if (lz >= D - 1) continue;
        const p = MH.lamp(w, lx, lz, { m: { post: B.iron, glow: B.lampG, found: B.found }, h: 6 });
        if ((k + lx) % 4 !== 1) lights.push({ p, c: '#ffd890', i: 1.1, d: 15, flicker: 0.1, night: true });
      }
      MH.scatter(w, 700, (x, g, z, b) => { if (b === B.grass && w.chance(0.2)) w.set(x, g + 1, z, w.pick([B.flowerR, B.flowerY, B.hedge])); });
      return { lights, landmarks, acts };
    },
  });
})();
