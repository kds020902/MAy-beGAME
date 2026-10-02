// 연금술 거리 — 협곡 골목의 기울어진 집들, 거대 가마솥, 협곡을 건너는 증류관 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  MAPS.push({
    id: 'alembic', cat: 'magic', name: '연금술 거리', en: 'Alembic Row', color: '#8ad05a', seed: 313, base: 22, time: 'night',
    desc: '굴뚝마다 다른 색 연기가 오르는 연금술사들의 협곡 골목. 한가운데 거대 가마솥은 백 년째 끓고 있다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['학파', '연금술사 조합'], ['명물', '한 병에 일곱 색 물약'], ['주의', '초록 연기는 들이마시지 말 것']] },
    sky: ['#233a22', '#0d140e', '#6aff9a'], stars: true,
    hemi: ['#d8ffd0', '#1a1a10', 0.6], sun: ['#f0ffe0', 0.5, [0.45, 1, 0.5]],
    day: { sky: ['#e0f0d0', '#8ab890', '#f8ffe0'], stars: false, hemi: ['#ffffff', '#4a4a38', 0.6], sun: ['#fff8e0', 0.76, [0.45, 1, 0.5]], haze: '#b8d8a0' },
    liquid: ['#2a6a1a', '#6ad02a', '#e0ff8a'], liqSpeed: 1.4, liqGlow: true,
    fog: { start: 0.76, floor: 12, depth: 10, haze: [26, 0.2, 5], hazeColor: '#2a4a26' },
    camY: 10,
    particles: [{ n: 70, colors: ['#b8ff8a', '#e0ffb0'], mode: 'rise', speed: 0.8, area: [64, 72, 4], size: 2, y0: 34, y1: 64 }],
    blocks: {
      cob: { c: '#4a4a40', top: '#5a5a50', v: 0.12, pat: 'stone' }, grass: { c: '#3a3028', top: '#4a6a3a', v: 0.1 },
      dirt: { c: '#3a3028', v: 0.08 }, rock: { c: '#4a4a44', v: 0.07, pat: 'big' }, rockDk: { c: '#2e2e2a', v: 0.06, pat: 'stone' },
      wallC: { c: '#c8c0a8', v: 0.04 }, wallT: { c: '#4a8a8a', v: 0.04 }, wallM: { c: '#7a3a4a', v: 0.04 }, wallY: { c: '#c8a040', v: 0.04 },
      roofT: { c: '#2a5a5a', v: 0.05, pat: 'tile' }, roofM: { c: '#5a2a3a', v: 0.05, pat: 'tile' }, roofY: { c: '#8a6a2a', v: 0.05, pat: 'tile' }, eave: { c: '#1e1a16', v: 0.03 },
      frame: { c: '#3a2a1a', v: 0.05 }, found: { c: '#5a5a54', v: 0.05, pat: 'stone' }, door: { c: '#2a1a10', v: 0.03, pat: 'plank' },
      copper: { c: '#c07a3a', v: 0.08 }, copperDk: { c: '#8a5228', v: 0.06 }, patina: { c: '#4a9a7a', v: 0.08 }, iron: { c: '#3a3a40', v: 0.04 }, log: { c: '#4a3020', v: 0.06, pat: 'log' }, plank: { c: '#6a4a30', v: 0.06, pat: 'plank' },
      winG: { c: '#c8ff8a', night: true, day: '#7a9a80' }, winP: { c: '#e0a0ff', night: true, day: '#8a7aa0' }, lamp: { c: '#b8ff9a', night: true, day: '#9ab090' },
      potG: { c: '#8aff5a', glow: true }, potP: { c: '#d07aff', glow: true }, potR: { c: '#ff6a8a', glow: true }, potB: { c: '#6ac8ff', glow: true }, fire: { c: '#ff9a3a', glow: true },
      goldG: { c: '#ffd860', glow: true }, philo: { c: '#ff2a4a', glow: true }, frost: { c: '#c8f0ff', glow: true }, soil: { c: '#3a2a1a', top: '#4a3420', v: 0.1 }, mand: { c: '#c8a070', v: 0.08 }, leafM: { c: '#5a9a3a', v: 0.1 },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, F = base + 2, UPL = base + 18;
      const cx = z => 64 + Math.sin(z * 0.05) * 8;
      const wide = z => 12 + Math.max(0, 8 - Math.abs(z - 72) * 0.5);
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => { const d = Math.abs(x - cx(z)), wd = wide(z); return F + MH.sstep(wd, wd + 5, d) * 16 + (d > wd + 5 ? n.fbm(x * 0.06, z * 0.06) * 3 : 0); },
        surface: (x, z, y, s) => s >= 3 ? B.rock : y > F + 8 ? B.grass : B.cob,
        under: (x, z, y, dep, s) => dep < 2 && y > F + 8 && s < 3 ? B.dirt : (y % 5 === 0 ? B.rockDk : B.rock),
      });
      const lights = [], acts = [], smoke = [], landmarks = [], chims = [];
      // 폐액 수로(골목 가운데)
      for (let z = 0; z < D; z++) { const x = Math.round(cx(z)); if (MH.dist(x, z, 64, 72) < 11) continue; for (const dx of [0, 1]) { MH.setH(w, x + dx, z, F - 2, B.rockDk, B.rockDk); w.liquid(x + dx, z, F - 1); w.set(x + dx, F - 1, z, 0); w.set(x + dx, F, z, 0); } if (z % 12 === 6) for (let dx = -1; dx <= 2; dx++) w.set(x + dx, F, z, B.plank); }
      // ── 기울어진 집들(골목 양쪽) ──
      const walls = [B.wallC, B.wallT, B.wallM, B.wallY], roofs = [B.roofT, B.roofM, B.roofY], pots = [B.potG, B.potP, B.potR, B.potB];
      const smokeCol = [['#9aff6a', '#c8ffa0'], ['#d890ff', '#f0c8ff'], ['#ff8aa8', '#ffc8d8'], ['#8ad8ff', '#c8f0ff']];
      let k = 0;
      for (let z = 8; z <= 114; z += 11) {
        if (Math.abs(z + 4 - 72) < 16) continue;
        for (const side of [-1, 1]) {
          const c = Math.round(cx(z + 4)), sx = 9, sz = 9;
          const x = side < 0 ? c - 4 - sx : c + 5;
          const h = MH.houseX(w, { x, z, sx, sz, floors: 3 + (k % 2), fh: 5, face: side < 0 ? 'e' : 'w', jetty: true, studs: true, pitch: k % 3 === 0 ? 2 : 1, y: F,
            m: { found: B.found, wall: walls[k % 4], frame: B.frame, win: k % 2 ? B.winP : B.winG, sill: B.frame, door: B.door, roof: roofs[k % 3], eave: B.eave, ridge: B.frame, chimney: B.found, lamp: B.lamp } });
          // 진열창의 빛나는 병
          const fx = side < 0 ? h.x1 + 2 : h.x0 - 2;
          w.box(fx, F + 1, z + 1, fx, F + 1, z + 3, B.plank); w.set(fx, F + 2, z + 1, pots[k % 4]); w.set(fx, F + 2, z + 3, pots[(k + 1) % 4]);
          if (Math.abs(z + 6 - 106) > 9) {
            // 벽에서 뻗은 쇠 걸이에 매단 병 간판
            const hx = fx - side, wallX = side < 0 ? h.x1 + 1 : h.x0 - 1;
            w.box(Math.min(hx, wallX), F + 8, z + 6, Math.max(hx, wallX), F + 8, z + 7, B.iron);
            w.box(hx, F + 6, z + 6, hx, F + 7, z + 7, pots[(k + 2) % 4]);
          }
          if (k % 2 === 0) lights.push({ p: [fx + 0.5, F + 3, z + 2.5], c: k % 4 === 0 ? '#90ff70' : '#d080ff', i: 0.9, d: 10, flicker: 0.2 });
          if (h.chimney) chims.push(h.chimney);
          if (h.chimney && smoke.length < 5) smoke.push({ n: 28, colors: smokeCol[k % 4], mode: 'rise', speed: 0.7, area: [h.chimney[0], h.chimney[2], 0.7], y0: h.chimney[1], y1: h.chimney[1] + 18, glow: true });
          k++;
        }
      }
      landmarks.push({ name: '물약 상점가', note: '창가에 빛나는 병이 줄지어 있다', p: [cx(100) + 0.5, F + 26, 100.5] });
      // ── 거대 가마솥(넓어진 골목 한가운데) ──
      const KX = 64, KZ = 72;
      for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; w.line(KX + Math.cos(a) * 8, F + 1, KZ + Math.sin(a) * 8, KX + Math.cos(a) * 4, F + 2, KZ + Math.sin(a) * 4, B.log, 0.7); }
      for (let a = 0; a < 6.28; a += 0.4) w.set(Math.round(KX + Math.cos(a) * 5.5), F + 2, Math.round(KZ + Math.sin(a) * 5.5), B.fire);
      for (const [dx, dz] of [[6, 0], [-6, 0], [0, 6], [0, -6]]) w.box(KX + dx, F + 1, KZ + dz, KX + dx, F + 4, KZ + dz, B.iron);
      for (let y = F + 4; y <= F + 11; y++) { const r = y < F + 6 ? 5.4 + (y - F - 4) * 0.8 : 7; w.ring(KX, KZ, y, r - 1.2, r, B.iron); if (y === F + 4) w.cyl(KX, KZ, y, y, r - 1.2, B.iron); }
      w.ring(KX, KZ, F + 12, 6.4, 8, B.copperDk);
      for (let z = KZ - 7; z <= KZ + 7; z++) for (let x = KX - 7; x <= KX + 7; x++) if (MH.dist(x, z, KX, KZ) < 5.9) { w.hm[x + W * z] = F + 9; w.set(x, F + 9, z, B.iron); w.liquid(x, z, F + 10); }
      const ladle = w.prop({ name: 'ladle', pivot: [KX + 0.5, F + 12, KZ + 0.5], axis: 'y', speed: 0.5 });
      ladle.box(KX + 3, F + 11, KZ, KX + 3, F + 19, KZ, B.log); ladle.box(KX, F + 19, KZ, KX + 3, F + 19, KZ, B.log); ladle.box(KX, F + 19, KZ, KX, F + 22, KZ, B.iron);
      w.box(KX - 9, F + 1, KZ - 9, KX - 9, F + 23, KZ - 9, B.log); w.box(KX + 9, F + 1, KZ + 9, KX + 9, F + 23, KZ + 9, B.log); w.line(KX - 9, F + 23, KZ - 9, KX + 9, F + 23, KZ + 9, B.log);
      lights.push({ name: 'pot', p: [KX + 0.5, F + 12, KZ + 0.5], c: '#80ff50', i: 1.8, d: 24, flicker: 0.15, liquid: true });
      lights.push({ p: [KX + 6, F + 3, KZ + 0.5], c: '#ff9a40', i: 1.2, d: 14, flicker: 0.35 });
      acts.push({
        name: '거대 가마솥', hint: '주걱이 빨리 돌고 물약이 끓어 넘쳐요', hit: [KX - 8, F + 4, KZ - 8, KX + 8, F + 13, KZ + 8],
        run: async a => {
          a.flash('pot', 2.6, 4); a.spin('ladle', 6, 4);
          for (let q = 0; q < 8; q++) { a.burst([KX + 0.5, F + 12, KZ + 0.5], { n: 40, colors: ['#8aff5a', '#e0ff8a', '#6ad02a'], speed: 5, up: 7, life: 1.6, gravity: 5, spread: 5 }); await a.wait(0.45); }
        },
      });
      landmarks.push({ name: '거대 가마솥', note: '백 년째 끓는 초록 물약', p: [KX + 0.5, F + 28, KZ + 0.5] });
      // ── 대증류탑(서쪽 절벽 위)과 협곡을 건너는 증류관, 응축기(동쪽 절벽 위) ──
      const AX = 30, AZ = 40, ay = MH.maxG(w, AX - 8, AZ - 8, AX + 8, AZ + 8) + 1;
      MH.flatten(w, AX - 10, AZ - 10, AX + 10, AZ + 10, ay - 1, B.cob, B.rock);
      w.cyl(AX, AZ, ay, ay + 5, 7, B.found); w.cyl(AX, AZ, ay + 1, ay + 4, 5, 0);
      for (const [dx, dz] of [[0, 7], [0, 6]]) w.box(AX + dx - 1, ay + 1, AZ + dz, AX + dx + 1, ay + 3, AZ + dz, 0);
      w.cyl(AX, AZ, ay, ay, 5, B.log); w.cyl(AX, AZ, ay + 1, ay + 2, 3.4, B.fire);
      w.sphere(AX, ay + 13, AZ, 8, B.copper); for (let a = 0; a < 6.28; a += 0.2) { w.set(Math.round(AX + Math.cos(a) * 8), ay + 13, Math.round(AZ + Math.sin(a) * 8), B.copperDk); }
      w.box(AX - 1, ay + 11, AZ + 8, AX + 1, ay + 14, AZ + 8, B.potG);
      w.cyl(AX, AZ, ay + 21, ay + 32, 2.2, B.patina); w.ring(AX, AZ, ay + 26, 2.2, 3.2, B.copperDk); w.sphere(AX, ay + 34, AZ, 3.4, B.copper);
      const CXX = 98, CZZ = 44, cy = MH.maxG(w, CXX - 6, CZZ - 6, CXX + 6, CZZ + 6) + 1;
      MH.flatten(w, CXX - 8, CZZ - 8, CXX + 8, CZZ + 8, cy - 1, B.cob, B.rock);
      for (const [dx, dz] of [[-4, -4], [4, -4], [-4, 4], [4, 4]]) w.box(CXX + dx, cy, CZZ + dz, CXX + dx, cy + 6, CZZ + dz, B.iron);
      w.cyl(CXX, CZZ, cy + 7, cy + 17, 5.4, B.patina); w.ring(CXX, CZZ, cy + 7, 5.4, 6.2, B.copperDk); w.ring(CXX, CZZ, cy + 17, 5.4, 6.2, B.copperDk); w.ring(CXX, CZZ, cy + 12, 5.4, 6, B.copper);
      w.box(CXX, cy + 1, CZZ, CXX, cy + 6, CZZ, B.copper); w.box(CXX - 1, cy, CZZ - 1, CXX + 1, cy + 1, CZZ + 1, B.plank); w.set(CXX, cy + 2, CZZ + 1, B.potB); w.set(CXX + 1, cy + 2, CZZ, B.potB);
      // 증류관: 증류기 머리에서 응축기 위로
      let prev = null;
      for (let t = 0; t <= 1.0001; t += 0.02) { const x = MH.lerp(AX + 3, CXX, t), z = MH.lerp(AZ, CZZ, t), y = MH.lerp(ay + 35, cy + 18, t) + Math.sin(t * Math.PI) * 6; if (prev) w.line(prev[0], prev[1], prev[2], x, y, z, B.copper, 0.9); prev = [x, y, z]; }
      w.box(CXX, cy + 18, CZZ, CXX, cy + 20, CZZ, B.copper);
      // 밸브 바퀴(부품)
      const valve = w.prop({ name: 'valve', pivot: [AX + 0.5, ay + 27, AZ + 4.5], axis: 'z' });
      MH.ringProp(valve, AX, ay + 26, AZ + 4, 3, 'xy', B.iron, B.copper, 4); valve.box(AX - 2, ay + 26, AZ + 4, AX + 2, ay + 26, AZ + 4, B.iron); valve.box(AX, ay + 24, AZ + 4, AX, ay + 28, AZ + 4, B.iron);
      w.box(AX, ay + 26, AZ + 3, AX, ay + 26, AZ + 3, B.iron);
      lights.push({ name: 'still', p: [AX + 0.5, ay + 3, AZ + 5], c: '#ff9a40', i: 1.5, d: 18, flicker: 0.3 });
      lights.push({ p: [AX + 0.5, ay + 13, AZ + 9.5], c: '#90ff60', i: 1, d: 12, flicker: 0.1 });
      smoke.push({ n: 40, colors: ['#9aff6a', '#e0ffc0'], mode: 'rise', speed: 0.8, area: [AX + 0.5, AZ + 0.5, 1], y0: ay + 38, y1: ay + 62, glow: true });
      acts.push({
        name: '대증류탑', hint: '밸브가 돌고 증기가 뿜어지며 응축기에 물약이 고여요', hit: [AX - 8, ay + 5, AZ - 8, AX + 8, ay + 22, AZ + 9],
        run: async a => {
          a.flash('still', 2.6, 4.5);
          await a.turn('valve', [0, 0, 6.28], 1.6, t => t);
          for (let q = 0; q < 6; q++) {
            a.burst([AX + 0.5, ay + 38, AZ + 0.5], { n: 36, colors: ['#e8ffe0', '#9aff6a', '#ffffff'], speed: 4, up: 8, life: 1.8, gravity: -0.5, spread: 1.5 });
            a.burst([CXX + 0.5, cy + 6, CZZ + 0.5], { n: 10, colors: ['#6ac8ff', '#c8f0ff'], speed: 0.5, up: 0, life: 0.8, gravity: 8, spread: 0.5 });
            await a.wait(0.45);
          }
          await a.turn('valve', [0, 0, 0], 1.4, t => t);
        },
      });
      landmarks.push({ name: '대증류탑', note: '연금술 조합의 구리 증류기', p: [AX + 0.5, ay + 42, AZ + 0.5], tag: 'LAB' });
      landmarks.push({ name: '응축기', note: '협곡 건너편에서 물약을 식힌다', p: [CXX + 0.5, cy + 25, CZZ + 0.5] });
      // ── 폐액 펌프(남쪽): 수로 위 물레 ──
      const PZ = 104, PXX = Math.round(cx(PZ));
      for (const x of [PXX - 3, PXX + 4]) w.box(x, F + 1, PZ + 2, x, F + 7, PZ + 2, B.log);
      w.box(PXX - 3, F + 6, PZ + 2, PXX - 1, F + 6, PZ + 2, B.iron); w.box(PXX + 2, F + 6, PZ + 2, PXX + 4, F + 6, PZ + 2, B.iron);
      for (let z = PZ - 5; z <= PZ + 9; z++) for (let x = PXX - 1; x <= PXX + 2; x++) if (w.get(x, F, z) === B.plank) w.set(x, F, z, 0);
      const pump = w.prop({ name: 'pump', pivot: [PXX + 1, F + 6.5, PZ + 2.5], axis: 'x', speed: 0.8 });
      for (let dy = -6; dy <= 6; dy++) for (let dz = -6; dz <= 6; dz++) { const r = Math.hypot(dy, dz); if (r > 5.4) continue; if (r > 4.2 || dy === 0 || dz === 0) for (const x of [PXX, PXX + 1]) pump.set(x, F + 6 + dy, PZ + 2 + dz, r > 4.2 ? B.copperDk : B.log); }
      for (let a = 0; a < 8; a++) { const ang = a * 0.785; for (const x of [PXX, PXX + 1]) pump.set(x, F + 6 + Math.round(Math.sin(ang) * 6), PZ + 2 + Math.round(Math.cos(ang) * 6), B.patina); }
      for (let z = PZ - 5; z <= PZ + 9; z++) for (const dx of [0, 1]) { MH.setH(w, PXX + dx, z, F - 8, B.rockDk, B.rockDk); for (let y = F - 7; y <= F; y++) w.set(PXX + dx, y, z, 0); w.liquid(PXX + dx, z, F - 1); }
      acts.push({
        name: '폐액 물레', hint: '물레가 빨리 돌며 초록 물보라가 튀어요', hit: [PXX - 1, F, PZ - 4, PXX + 2, F + 12, PZ + 8],
        run: async a => { a.spin('pump', 5, 4); for (let q = 0; q < 8; q++) { a.burst([PXX + 1, F, PZ + 2.5], { n: 24, colors: ['#8aff5a', '#e0ff8a'], speed: 4, up: 4, life: 1, gravity: 9, spread: 3 }); await a.wait(0.45); } },
      });
      landmarks.push({ name: '폐액 물레', note: '넘친 물약을 퍼 올리는 바퀴', p: [PXX + 1, F + 16, PZ + 2.5] });
      // 골목 가로등(초록 불)
      for (let z = 14; z <= 118; z += 22) { const x = Math.round(cx(z)) + 5; if (MH.dist(x, z, KX, KZ) < 14 || w.get(x, F + 1, z)) continue; lights.push({ p: MH.lamp(w, x, z, { m: { post: B.iron, glow: B.lamp, found: B.found }, h: 6 }), c: '#a0ff80', i: 1, d: 13, flicker: 0.1, night: true }); }
      // ── 현자의 돌(동쪽 절벽 위): 변성진 위에 떠 있는 붉은 돌(부품) ──
      const SX = 106, SZ = 96, sy = MH.maxG(w, SX - 9, SZ - 9, SX + 9, SZ + 9);
      MH.flatten(w, SX - 10, SZ - 10, SX + 10, SZ + 10, sy, B.cob, B.rock);
      MH.circle(w, SX, SZ, 8, B.potR); MH.circle(w, SX, SZ, 5, B.goldG);
      for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; w.line(SX + Math.cos(a) * 5, sy, SZ + Math.sin(a) * 5, SX + Math.cos(a + 2.09) * 5, sy, SZ + Math.sin(a + 2.09) * 5, B.potR); }
      for (let k = 0; k < 4; k++) { const a = k * 1.57 + 0.78, px = Math.round(SX + Math.cos(a) * 9.5), pz = Math.round(SZ + Math.sin(a) * 9.5); w.box(px, sy + 1, pz, px, sy + 4, pz, B.found); w.set(px, sy + 5, pz, k % 2 ? B.potP : B.potG); }
      w.box(SX - 1, sy + 1, SZ - 1, SX + 1, sy + 1, SZ + 1, B.copperDk); w.box(SX, sy + 2, SZ, SX, sy + 3, SZ, B.copper);
      const philo = w.prop({ name: 'philo', pivot: [SX + 0.5, sy + 7.5, SZ + 0.5], axis: 'y', speed: 0.6, bob: 0.5, bobSpeed: 1.2 });
      philo.sphere(SX, sy + 7, SZ, 1.7, B.philo); philo.set(SX, sy + 9, SZ, B.goldG); philo.set(SX, sy + 5, SZ, B.goldG); philo.set(SX + 2, sy + 7, SZ, B.goldG); philo.set(SX - 2, sy + 7, SZ, B.goldG);
      lights.push({ name: 'philo', p: [SX + 0.5, sy + 7, SZ + 0.5], c: '#ff4a5a', i: 1.4, d: 18, flicker: 0.12 });
      acts.push({
        name: '현자의 돌', hint: '붉은 돌이 높이 떠올라 돌며 금빛 가루를 쏟아내요', hit: [SX - 9, sy + 1, SZ - 9, SX + 9, sy + 10, SZ + 9],
        run: async a => {
          a.flash('philo', 4, 5.5); a.glow(1.7, 5.5); a.spin('philo', 9, 5.5);
          await a.move('philo', [0, 7, 0], 1.4);
          for (let k = 0; k < 7; k++) { a.burst([SX + 0.5, sy + 14, SZ + 0.5], { n: 36, colors: ['#ffd860', '#fff0a0', '#ff6a8a'], speed: 8, up: 4, life: 1.8, gravity: 6, spread: 1 }); await a.wait(0.4); }
          a.burst([SX + 0.5, sy + 1, SZ + 0.5], { n: 60, colors: ['#ffd860', '#ff6a8a'], speed: 12, up: 1, life: 1, gravity: 1, spread: 6, flat: true });
          await a.move('philo', [0, 0, 0], 1.6);
        },
      });
      landmarks.push({ name: '현자의 돌', note: '변성진 위에 떠 있는 붉은 돌', p: [SX + 0.5, sy + 16, SZ + 0.5] });
      // ── 응축기 남쪽 면의 냉각 팬(부품) ──
      const fan = w.prop({ name: 'fan', pivot: [CXX + 0.5, cy + 12.5, CZZ + 7.5], axis: 'z', speed: 0.8 });
      for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2; for (let r = 1; r <= 4; r++) for (const s of [-0.35, 0, 0.35]) fan.set(Math.round(CXX + Math.cos(a + s * 1.3 / r * 2) * r), Math.round(cy + 12 + Math.sin(a + s * 1.3 / r * 2) * r), CZZ + 7, r === 4 ? B.copper : B.patina); }
      fan.set(CXX, cy + 12, CZZ + 7, B.iron); fan.set(CXX, cy + 12, CZZ + 8, B.frost);
      acts.push({
        name: '냉각 팬', hint: '응축기의 팬이 세차게 돌며 차가운 김을 내뿜어요', hit: [CXX - 5, cy + 7, CZZ + 5, CXX + 5, cy + 17, CZZ + 9],
        run: async a => {
          a.spin('fan', 9, 5);
          for (let k = 0; k < 9; k++) {
            a.burst([CXX + 0.5, cy + 12.5, CZZ + 9], { n: 30, colors: ['#c8f0ff', '#ffffff', '#6ac8ff'], speed: 9, up: 0, life: 1.4, gravity: -0.4, spread: 3 });
            if (k % 2) a.burst([CXX + 0.5, cy + 6, CZZ + 0.5], { n: 10, colors: ['#6ac8ff', '#c8f0ff'], speed: 0.5, up: 0, life: 0.8, gravity: 8, spread: 0.5 });
            await a.wait(0.5);
          }
        },
      });
      // ── 굴뚝 폭발: 시점 쪽 공방 굴뚝의 뚜껑(부품)이 펑 하고 날아간다 ──
      const ch = chims.reduce((b, c) => c[0] + c[2] > b[0] + b[2] && c[2] < 112 ? c : b), hx = ch[0] - 0.5, hz = ch[2] - 0.5, hy = ch[1];
      const lid = w.prop({ name: 'lid', pivot: [hx + 1, hy + 1, hz + 1] });
      for (const [dx, dz] of [[0, 0], [1, 1]]) lid.set(hx + dx, hy, hz + dz, B.iron);
      lid.box(hx - 1, hy + 1, hz - 1, hx + 2, hy + 1, hz + 2, B.copper); lid.box(hx, hy + 2, hz, hx + 1, hy + 2, hz + 1, B.copperDk); lid.set(hx, hy + 3, hz, B.potP);
      acts.push({
        name: '굴뚝 폭발', hint: '실험이 실패해 굴뚝 뚜껑이 펑 하고 날아가요', hit: [hx - 2, hy - 4, hz - 2, hx + 3, hy + 4, hz + 3],
        run: async a => {
          for (let k = 0; k < 4; k++) { await a.turn('lid', [0.12, 0, -0.12], 0.12); await a.turn('lid', [-0.12, 0, 0.12], 0.12); }
          a.lightning(0.7); a.glow(1.8, 1.5);
          a.burst([hx + 1, hy + 1, hz + 1], { n: 80, colors: ['#d07aff', '#8aff5a', '#ff6a8a', '#ffd860', '#ffffff'], speed: 12, up: 9, life: 2, gravity: 5, spread: 1 });
          await a.tween('lid', { off: [0, 16, 0], rot: [0.6, 7, 0.4] }, 1.3);
          for (let k = 0; k < 3; k++) { a.burst([hx + 1, hy + 2, hz + 1], { n: 30, colors: ['#d07aff', '#f0c8ff', '#888888'], speed: 3, up: 6, life: 2, gravity: -0.5, spread: 1 }); await a.wait(0.3); }
          await a.tween('lid', { off: [0, 0, 0], rot: [0, 12.566, 0] }, 1.4, t => t * t);
          a.unwind('lid');
          a.burst([hx + 1, hy + 1, hz + 1], { n: 20, colors: ['#888888', '#c8c0a8'], speed: 4, up: 1, life: 0.8, gravity: 3, spread: 1, flat: true });
        },
      });
      // ── 증류관을 타고 건너는 물약 방울(부품, 평소엔 숨김) ──
      const pipeAt = t => [MH.lerp(AX + 3, CXX, t), MH.lerp(ay + 35, cy + 18, t) + Math.sin(t * Math.PI) * 6, MH.lerp(AZ, CZZ, t)];
      const d0 = pipeAt(0), drop = w.prop({ name: 'drop', pivot: [d0[0] + 0.5, d0[1] + 3, d0[2] + 0.5], axis: 'y', speed: 1, scl0: [0, 0, 0] });
      drop.sphere(Math.round(d0[0]), Math.round(d0[1] + 3), Math.round(d0[2]), 1.5, B.potG); drop.set(Math.round(d0[0]), Math.round(d0[1] + 5), Math.round(d0[2]), B.frost);
      const dropPts = []; for (let i = 1; i <= 12; i++) { const p = pipeAt(i / 12); dropPts.push([p[0] - d0[0], p[1] - d0[1], p[2] - d0[2]]); }
      acts.push({
        name: '물약 방울', hint: '증류탑 꼭대기에서 빛나는 물약 방울이 관을 타고 협곡을 건너요', hit: [AX - 4, ay + 30, AZ - 4, AX + 5, ay + 39, AZ + 4],
        run: async a => {
          a.flash('still', 2.4, 7);
          a.burst([d0[0] + 0.5, d0[1] + 3, d0[2] + 0.5], { n: 30, colors: ['#8aff5a', '#e0ffc0'], speed: 4, up: 3, life: 1.2, gravity: 2, spread: 1 });
          await a.tween('drop', { scl: [1, 1, 1] }, 0.7);
          await a.path('drop', dropPts, 4.5);
          await a.move('drop', [dropPts[11][0], dropPts[11][1] - 3, dropPts[11][2]], 0.5);
          a.tween('drop', { scl: [0, 0, 0] }, 0.4);
          for (let k = 0; k < 4; k++) { a.burst([CXX + 0.5, cy + 6, CZZ + 0.5], { n: 14, colors: ['#8aff5a', '#6ac8ff'], speed: 0.6, up: 0, life: 0.8, gravity: 8, spread: 0.5 }); a.burst([CXX + 0.5, cy + 21, CZZ + 0.5], { n: 16, colors: ['#8aff5a', '#ffffff'], speed: 4, up: 4, life: 1, gravity: 4, spread: 1 }); await a.wait(0.4); }
          await a.move('drop', [0, 0, 0], 0.1);
        },
      });
      // ── 만드라고라 밭(동쪽 절벽 위): 흙 속 뿌리(부품)가 차례로 튀어나와 비명을 지른다 ──
      const MX = 100, MZ = 68, my = MH.maxG(w, MX - 2, MZ - 3, MX + 16, MZ + 3);
      MH.flatten(w, MX - 3, MZ - 4, MX + 17, MZ + 4, my, B.cob, B.rock);
      w.box(MX - 2, my + 1, MZ - 2, MX + 16, my + 1, MZ + 2, B.plank); w.box(MX - 1, my + 1, MZ - 1, MX + 15, my + 1, MZ + 1, B.soil);
      for (let k = 0; k < 5; k++) {
        const x = MX + k * 3 + 1, p = w.prop({ name: 'mand' + k, pivot: [x + 0.5, my + 4, MZ + 0.5], off0: [0, -3, 0], clipOK: 0 });
        p.box(x - 1, my + 2, MZ, x, my + 4, MZ, B.mand); p.set(x - 1, my + 4, MZ + 1, B.eave); p.set(x, my + 4, MZ + 1, B.eave); p.set(x - 2, my + 3, MZ, B.mand); p.set(x + 1, my + 3, MZ, B.mand);
        p.box(x - 1, my + 5, MZ, x, my + 5, MZ, B.leafM); p.set(x - 1, my + 6, MZ, B.leafM); p.set(x, my + 6, MZ - 1, B.leafM); p.set(x, my + 7, MZ, B.leafM); p.set(x - 1, my + 6, MZ + 1, B.leafM);
      }
      acts.push({
        name: '만드라고라 밭', hint: '흙 속 만드라고라가 차례로 튀어나와 꽥 비명을 질러요', hit: [MX - 2, my + 1, MZ - 3, MX + 16, my + 8, MZ + 3],
        run: async a => {
          for (let k = 0; k < 5; k++) {
            a.move('mand' + k, [0, 1, 0], 0.35); a.turn('mand' + k, [0, 0.5, 0], 0.2);
            a.burst([MX + k * 3 + 1, my + 5, MZ + 0.5], { n: 26, colors: ['#ffffff', '#e0ffb0'], speed: 8, up: 0.5, life: 0.7, gravity: 0, spread: 1, flat: true });
            await a.wait(0.35); a.turn('mand' + k, [0, -0.5, 0], 0.2);
          }
          await a.wait(1.4);
          for (let k = 0; k < 5; k++) { a.turn('mand' + k, [0, 0, 0], 0.4); a.move('mand' + k, [0, -3, 0], 0.6); a.burst([MX + k * 3 + 1, my + 2, MZ + 0.5], { n: 10, colors: ['#4a3420', '#6a4a30'], speed: 2, up: 2, life: 0.6, gravity: 8, spread: 1 }); await a.wait(0.15); }
          await a.wait(0.6);
        },
      });
      return { lights, landmarks, acts, particles: smoke };
    },
  });
})();
