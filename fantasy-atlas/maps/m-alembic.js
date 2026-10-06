// 연금술 거리 — 협곡 골목의 기울어진 집들, 거대 가마솥, 협곡을 건너는 증류관 (168칸으로 확장: 남쪽 약재 장터·서쪽 유리 공방 추가)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 168, D = 168, Hh = 128;
  MAPS.push({
    id: 'alembic', cat: 'magic', name: '연금술 거리', en: 'Alembic Row', color: '#8ad05a', seed: 313, base: 22, time: 'night', size: [W, D, Hh],
    desc: '굴뚝마다 다른 색 연기가 오르는 연금술사들의 협곡 골목. 한가운데 거대 가마솥은 백 년째 끓고 있다. 협곡 남쪽 끝은 일곱 색 분수가 솟는 약재 장터로 넓어지고, 서쪽 벼랑 위에는 유리 공방의 가마가 밤새 타오른다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['학파', '연금술사 조합'], ['명물', '한 병에 일곱 색 물약 · 장터의 일곱 색 분수'], ['주의', '초록 연기는 들이마시지 말 것']] },
    sky: ['#233a22', '#0d140e', '#6aff9a'], stars: true,
    hemi: ['#d8ffd0', '#1a1a10', 0.6], sun: ['#f0ffe0', 0.5, [0.45, 1, 0.5]],
    day: { sky: ['#e0f0d0', '#8ab890', '#f8ffe0'], stars: false, hemi: ['#ffffff', '#4a4a38', 0.6], sun: ['#fff8e0', 0.76, [0.45, 1, 0.5]], haze: '#b8d8a0' },
    liquid: ['#2a6a1a', '#6ad02a', '#e0ff8a'], liqSpeed: 1.4, liqGlow: true,
    fog: { start: 0.92, floor: 12, depth: 10, haze: [30, 0.2, 5], hazeColor: '#2a4a26' },
    camY: -4, zoom: 1.1,
    particles: [{ n: 90, colors: ['#b8ff8a', '#e0ffb0'], mode: 'rise', speed: 0.8, area: [84, 94, 5], size: 2, y0: 38, y1: 74 }],
    blocks: {
      cob: { c: '#4a4a40', top: '#5a5a50', v: 0.12, pat: 'stone' }, grass: { c: '#3a3028', top: '#4a6a3a', v: 0.1 },
      dirt: { c: '#3a3028', v: 0.08 }, rock: { c: '#4a4a44', v: 0.07, pat: 'big' }, rockDk: { c: '#2e2e2a', v: 0.06, pat: 'stone' },
      wallC: { c: '#c8c0a8', v: 0.04 }, wallT: { c: '#4a8a8a', v: 0.04 }, wallM: { c: '#7a3a4a', v: 0.04 }, wallY: { c: '#c8a040', v: 0.04 },
      roofT: { c: '#2a5a5a', v: 0.05, pat: 'tile' }, roofM: { c: '#5a2a3a', v: 0.05, pat: 'tile' }, roofY: { c: '#8a6a2a', v: 0.05, pat: 'tile' }, eave: { c: '#1e1a16', v: 0.03 },
      frame: { c: '#3a2a1a', v: 0.05 }, found: { c: '#5a5a54', v: 0.05, pat: 'stone' }, door: { c: '#2a1a10', v: 0.03, pat: 'plank' },
      copper: { c: '#c07a3a', v: 0.08 }, copperDk: { c: '#8a5228', v: 0.06 }, patina: { c: '#4a9a7a', v: 0.08 }, iron: { c: '#3a3a40', v: 0.04 }, log: { c: '#4a3020', v: 0.06, pat: 'log' }, plank: { c: '#6a4a30', v: 0.06, pat: 'plank' },
      winG: { c: '#c8ff8a', night: true, day: '#7a9a80' }, winP: { c: '#e0a0ff', night: true, day: '#8a7aa0' }, lamp: { c: '#b8ff9a', night: true, day: '#9ab090' },
      potG: { c: '#8aff5a', glow: true }, potP: { c: '#d07aff', glow: true }, potR: { c: '#ff6a8a', glow: true }, potB: { c: '#6ac8ff', glow: true }, potY: { c: '#ffe060', glow: true }, potO: { c: '#ffa040', glow: true }, potI: { c: '#8a7aff', glow: true }, fire: { c: '#ff9a3a', glow: true },
      goldG: { c: '#ffd860', glow: true }, philo: { c: '#ff2a4a', glow: true }, frost: { c: '#c8f0ff', glow: true }, soil: { c: '#3a2a1a', top: '#4a3420', v: 0.1 }, mand: { c: '#c8a070', v: 0.08 }, leafM: { c: '#5a9a3a', v: 0.1 },
      glass: { c: '#a8e0c8', v: 0.03 }, brick: { c: '#8a4a3a', v: 0.06, pat: 'brick' }, awnG: { c: '#3a7a3a', v: 0.04 }, awnP: { c: '#6a3a7a', v: 0.04 }, awnW: { c: '#d8d0b8', v: 0.04 }, crate: { c: '#7a5a3a', v: 0.06, pat: 'plank' }, herb: { c: '#6aa040', v: 0.1 }, homu: { c: '#e0b8a0', v: 0.05 },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, F = base + 2;
      const cx = z => 84 + Math.sin(z * 0.038) * 10;
      const MKZ = 146, MKX = Math.round(cx(MKZ));               // 남쪽 약재 장터
      const wide = z => 15 + Math.max(0, 10 - Math.abs(z - 94) * 0.5) + Math.max(0, 14 - Math.abs(z - MKZ) * 0.7);
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => { const d = Math.abs(x - cx(z)), wd = wide(z); return F + MH.sstep(wd, wd + 6, d) * 20 + (d > wd + 6 ? n.fbm(x * 0.05, z * 0.05) * 4 : 0); },
        surface: (x, z, y, s) => s >= 3 ? B.rock : y > F + 10 ? B.grass : B.cob,
        under: (x, z, y, dep, s) => dep < 2 && y > F + 10 && s < 3 ? B.dirt : (y % 5 === 0 ? B.rockDk : B.rock),
      });
      const lights = [], acts = [], smoke = [], landmarks = [], chims = [];
      const KX = 84, KZ = 94;
      // 폐액 수로(골목 가운데). 가마솥과 장터 분수 둘레는 비운다
      for (let z = 0; z < D; z++) { const x = Math.round(cx(z)); if (MH.dist(x, z, KX, KZ) < 14 || Math.abs(z - MKZ) < 11) continue; for (const dx of [0, 1]) { MH.setH(w, x + dx, z, F - 2, B.rockDk, B.rockDk); w.liquid(x + dx, z, F - 1); w.set(x + dx, F - 1, z, 0); w.set(x + dx, F, z, 0); } for (const dx of [-1, 2]) if (MH.g(w, x + dx, z) === F) w.set(x + dx, F, z, B.found); if (z % 14 === 6) for (let dx = -1; dx <= 2; dx++) w.set(x + dx, F, z, B.plank); }
      // ── 기울어진 집들(골목 양쪽) ──
      const walls = [B.wallC, B.wallT, B.wallM, B.wallY], roofs = [B.roofT, B.roofM, B.roofY], pots = [B.potG, B.potP, B.potR, B.potB];
      const smokeCol = [['#9aff6a', '#c8ffa0'], ['#d890ff', '#f0c8ff'], ['#ff8aa8', '#ffc8d8'], ['#8ad8ff', '#c8f0ff']];
      let k = 0;
      for (const z of [6, 20, 34, 48, 62, 112]) {
        for (const side of [-1, 1]) {
          const c = Math.round(cx(z + 5)), sx = 11, sz = 11;
          const x = side < 0 ? c - 5 - sx : c + 6;
          const h = MH.houseX(w, { x, z, sx, sz, floors: 3 + (k % 2), fh: 6, face: side < 0 ? 'e' : 'w', jetty: true, studs: true, pitch: k % 3 === 0 ? 2 : 1, dormers: k % 3 === 1 ? 2 : 0, axis: 'z', balcony: k % 4 === 2 ? 2 : 0, y: F,
            m: { found: B.found, wall: walls[k % 4], frame: B.frame, win: k % 2 ? B.winP : B.winG, sill: B.frame, door: B.door, roof: roofs[k % 3], eave: B.eave, ridge: B.frame, chimney: B.found, lamp: B.lamp, rail: B.iron, flower: pots[(k + 1) % 4] } });
          // 진열대: 판자 선반 위 빛나는 병과 상자
          const fx = side < 0 ? h.x1 + 2 : h.x0 - 2;
          w.box(fx, F + 1, z + 1, fx, F + 1, z + 4, B.plank); w.set(fx, F + 2, z + 1, pots[k % 4]); w.set(fx, F + 2, z + 3, pots[(k + 1) % 4]); w.set(fx, F + 2, z + 4, B.glass);
          w.box(fx, F + 1, z + 8, fx, F + 2, z + 9, B.crate); w.set(fx, F + 3, z + 8, B.herb);
          // 벽에서 뻗은 쇠 걸이에 매단 병 간판
          const hx = fx - side, wallX = side < 0 ? h.x1 + 1 : h.x0 - 1;
          w.box(Math.min(hx, wallX), F + 9, z + 7, Math.max(hx, wallX), F + 9, z + 7, B.iron);
          w.box(hx, F + 7, z + 6, hx, F + 8, z + 7, pots[(k + 2) % 4]); w.set(hx, F + 6, z + 6, B.copper);
          // 벽을 타는 구리관
          w.box(wallX, F + 1, z + 10, wallX, F + 14, z + 10, B.copperDk); w.set(wallX, F + 5, z + 10, B.patina); w.set(wallX, F + 11, z + 10, B.patina);
          if (k % 3 === 0) lights.push({ p: [fx + 0.5, F + 3, z + 2.5], c: k % 2 ? '#d080ff' : '#90ff70', i: 0.9, d: 11, flicker: 0.2 });
          if (h.chimney) chims.push(h.chimney);
          if (h.chimney && smoke.length < 6) smoke.push({ n: 28, colors: smokeCol[k % 4], mode: 'rise', speed: 0.7, area: [h.chimney[0], h.chimney[2], 0.7], y0: h.chimney[1], y1: h.chimney[1] + 20, glow: true });
          k++;
        }
        // 골목을 가로지르는 병 등불 줄
        const c = cx(z + 5);
        MH.garland(w, [Math.round(c - 6), F + 13, z + 5], [Math.round(c + 6), F + 13, z + 5], B.iron, [B.potG, B.potP, B.potY, B.potB], 2);
      }
      landmarks.push({ name: '물약 상점가', note: '창가에 빛나는 병이 줄지어 있다', p: [cx(40) + 0.5, F + 30, 40.5] });
      // ── 거대 가마솥(넓어진 골목 한가운데) ──
      for (let z = KZ - 16; z <= KZ + 16; z++) for (let x = KX - 16; x <= KX + 16; x++) { const d = MH.dist(x, z, KX, KZ); if (d < 15 && MH.g(w, x, z) === F && d > 11 && (Math.floor(Math.atan2(z - KZ, x - KX) * 6) + Math.floor(d)) % 2 === 0) w.set(x, F, z, B.found); }
      for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; w.line(KX + Math.cos(a) * 10, F + 1, KZ + Math.sin(a) * 10, KX + Math.cos(a) * 5, F + 2, KZ + Math.sin(a) * 5, B.log, 0.7); }
      for (let a = 0; a < 6.28; a += 0.32) w.set(Math.round(KX + Math.cos(a) * 7), F + 2, Math.round(KZ + Math.sin(a) * 7), B.fire);
      for (const [dx, dz] of [[8, 0], [-8, 0], [0, 8], [0, -8]]) { w.box(KX + dx, F + 1, KZ + dz, KX + dx, F + 5, KZ + dz, B.iron); w.set(KX + dx, F + 1, KZ + dz, B.found); }
      for (let y = F + 5; y <= F + 14; y++) { const r = y < F + 8 ? 7 + (y - F - 5) * 0.8 : 9.2; w.ring(KX, KZ, y, r - 1.4, r, (y - F) % 4 === 0 ? B.copperDk : B.iron); if (y === F + 5) w.cyl(KX, KZ, y, y, r - 1.4, B.iron); }
      w.ring(KX, KZ, F + 15, 8.2, 10.2, B.copperDk); w.ring(KX, KZ, F + 16, 9.2, 10.2, B.copper);
      for (let a = 0; a < 8; a++) { const x = Math.round(KX + Math.cos(a * 0.785) * 9.8), z = Math.round(KZ + Math.sin(a * 0.785) * 9.8); w.box(x, F + 7, z, x, F + 8, z, B.copper); }
      for (let z = KZ - 9; z <= KZ + 9; z++) for (let x = KX - 9; x <= KX + 9; x++) if (MH.dist(x, z, KX, KZ) < 7.7) { w.hm[x + W * z] = F + 12; w.set(x, F + 12, z, B.iron); w.liquid(x, z, F + 13); }
      const ladle = w.prop({ name: 'ladle', pivot: [KX + 0.5, F + 15, KZ + 0.5], axis: 'y', speed: 0.5 });
      ladle.box(KX + 4, F + 14, KZ, KX + 4, F + 24, KZ, B.log); ladle.box(KX, F + 24, KZ, KX + 4, F + 24, KZ, B.log); ladle.box(KX, F + 24, KZ, KX, F + 28, KZ, B.iron); ladle.box(KX + 3, F + 14, KZ - 1, KX + 5, F + 14, KZ + 1, B.copperDk);
      w.box(KX - 12, F + 1, KZ - 12, KX - 12, F + 30, KZ - 12, B.log); w.box(KX + 12, F + 1, KZ + 12, KX + 12, F + 30, KZ + 12, B.log); w.line(KX - 12, F + 30, KZ - 12, KX + 12, F + 30, KZ + 12, B.log);
      for (const [x, z] of [[KX - 12, KZ - 12], [KX + 12, KZ + 12]]) { w.box(x - 1, F + 1, z - 1, x + 1, F + 1, z + 1, B.found); w.set(x, F + 31, z, B.iron); }
      // 가마솥 둘레의 장작 더미와 재료 상자
      for (const [x, z] of [[KX - 14, KZ + 4], [KX + 13, KZ - 6]]) { w.box(x, F + 1, z, x + 2, F + 2, z + 1, B.log); w.box(x, F + 3, z, x + 1, F + 3, z + 1, B.log); }
      for (const [x, z] of [[KX - 9, KZ - 14], [KX + 10, KZ + 11]]) { w.box(x, F + 1, z, x + 1, F + 2, z + 1, B.crate); w.set(x, F + 3, z, B.potG); }
      lights.push({ name: 'pot', p: [KX + 0.5, F + 15, KZ + 0.5], c: '#80ff50', i: 1.8, d: 28, flicker: 0.15, liquid: true });
      lights.push({ p: [KX + 8, F + 3, KZ + 0.5], c: '#ff9a40', i: 1.2, d: 16, flicker: 0.35 });
      acts.push({
        name: '거대 가마솥', hint: '주걱이 빨리 돌고 물약이 끓어 넘쳐요', hit: [KX - 10, F + 5, KZ - 10, KX + 10, F + 16, KZ + 10],
        run: async a => {
          a.flash('pot', 2.6, 4); a.spin('ladle', 6, 4);
          for (let q = 0; q < 8; q++) { a.burst([KX + 0.5, F + 15, KZ + 0.5], { n: 44, colors: ['#8aff5a', '#e0ff8a', '#6ad02a'], speed: 6, up: 8, life: 1.6, gravity: 5, spread: 6 }); await a.wait(0.45); }
        },
      });
      landmarks.push({ name: '거대 가마솥', note: '백 년째 끓는 초록 물약', p: [KX + 0.5, F + 36, KZ + 0.5] });
      // ── 대증류탑(서쪽 절벽 위)과 협곡을 건너는 증류관, 응축기(동쪽 절벽 위) ──
      const AX = 38, AZ = 52, ay = MH.maxG(w, AX - 10, AZ - 10, AX + 10, AZ + 10) + 1;
      MH.flatten(w, AX - 12, AZ - 12, AX + 12, AZ + 12, ay - 1, B.cob, B.rock);
      w.cyl(AX, AZ, ay, ay + 6, 9, B.found); w.cyl(AX, AZ, ay + 1, ay + 5, 7, 0); w.ring(AX, AZ, ay + 6, 8, 9.6, B.brick);
      for (let a = 0; a < 6; a++) { const x = Math.round(AX + Math.cos(a * 1.047) * 9), z = Math.round(AZ + Math.sin(a * 1.047) * 9); w.box(x, ay, z, x, ay + 7, z, B.brick); }
      w.box(AX - 1, ay + 1, AZ + 8, AX + 1, ay + 4, AZ + 9, 0); w.box(AX - 2, ay + 5, AZ + 9, AX + 2, ay + 5, AZ + 9, B.iron);
      w.cyl(AX, AZ, ay, ay, 7, B.log); w.cyl(AX, AZ, ay + 1, ay + 2, 4.4, B.fire);
      w.sphere(AX, ay + 16, AZ, 10, B.copper); for (let a = 0; a < 6.28; a += 0.15) { w.set(Math.round(AX + Math.cos(a) * 10), ay + 16, Math.round(AZ + Math.sin(a) * 10), B.copperDk); }
      for (let a = 0; a < 8; a++) for (let t = 0.2; t < 1.5; t += 0.07) { const r = Math.cos(t) * 10.2; w.set(Math.round(AX + Math.cos(a * 0.785) * r), Math.round(ay + 16 + Math.sin(t) * 10.2), Math.round(AZ + Math.sin(a * 0.785) * r), B.copperDk); }
      w.box(AX - 1, ay + 13, AZ + 10, AX + 1, ay + 17, AZ + 10, B.potG); w.box(AX - 2, ay + 12, AZ + 10, AX + 2, ay + 12, AZ + 10, B.iron); w.box(AX - 2, ay + 18, AZ + 10, AX + 2, ay + 18, AZ + 10, B.iron);
      w.cyl(AX, AZ, ay + 26, ay + 40, 2.8, B.patina); w.ring(AX, AZ, ay + 31, 2.8, 4, B.copperDk); w.ring(AX, AZ, ay + 36, 2.8, 3.8, B.copperDk); w.sphere(AX, ay + 42, AZ, 4.2, B.copper); w.box(AX, ay + 46, AZ, AX, ay + 48, AZ, B.iron);
      const CXX = 128, CZZ = 58, cy = MH.maxG(w, CXX - 8, CZZ - 8, CXX + 8, CZZ + 8) + 1;
      MH.flatten(w, CXX - 10, CZZ - 10, CXX + 10, CZZ + 10, cy - 1, B.cob, B.rock);
      for (const [dx, dz] of [[-5, -5], [5, -5], [-5, 5], [5, 5]]) { w.box(CXX + dx, cy, CZZ + dz, CXX + dx, cy + 8, CZZ + dz, B.iron); w.set(CXX + dx, cy, CZZ + dz, B.found); }
      w.line(CXX - 5, cy + 1, CZZ - 5, CXX + 5, cy + 7, CZZ - 5, B.iron); w.line(CXX - 5, cy + 1, CZZ + 5, CXX + 5, cy + 7, CZZ + 5, B.iron);
      w.cyl(CXX, CZZ, cy + 9, cy + 22, 6.8, B.patina); for (const y of [cy + 9, cy + 15, cy + 22]) w.ring(CXX, CZZ, y, 6.8, 7.6, B.copperDk); w.ring(CXX, CZZ, cy + 12, 6.8, 7.4, B.copper); w.ring(CXX, CZZ, cy + 19, 6.8, 7.4, B.copper);
      w.cyl(CXX, CZZ, cy + 23, cy + 23, 5, B.copperDk);
      w.box(CXX, cy + 1, CZZ, CXX, cy + 8, CZZ, B.copper); w.box(CXX - 1, cy, CZZ - 1, CXX + 1, cy + 1, CZZ + 1, B.plank); w.set(CXX, cy + 2, CZZ + 1, B.potB); w.set(CXX + 1, cy + 2, CZZ, B.potB);
      for (let s = 0; s < 4; s++) { w.box(CXX + 7 + s, cy, CZZ - 3, CXX + 7 + s, cy, CZZ - 2, B.crate); }
      // 증류관: 증류기 머리에서 응축기 위로(이음매 띠)
      let prev = null;
      const pipeAt = t => [MH.lerp(AX + 4, CXX, t), MH.lerp(ay + 44, cy + 24, t) + Math.sin(t * Math.PI) * 8, MH.lerp(AZ, CZZ, t)];
      for (let i = 0; i <= 60; i++) { const p = pipeAt(i / 60); if (prev) w.line(prev[0], prev[1], prev[2], p[0], p[1], p[2], i % 6 === 0 ? B.copperDk : B.copper, 1.1); prev = p; }
      for (const t of [0.3, 0.7]) { const p = pipeAt(t); w.box(Math.round(p[0]), Math.round(p[1]) + 2, Math.round(p[2]), Math.round(p[0]), Math.round(p[1]) + 3, Math.round(p[2]), B.iron); }
      w.box(CXX, cy + 24, CZZ, CXX, cy + 27, CZZ, B.copper);
      // 밸브 바퀴(부품)
      const valve = w.prop({ name: 'valve', pivot: [AX + 0.5, ay + 34, AZ + 5.5], axis: 'z' });
      MH.ringProp(valve, AX, ay + 33, AZ + 5, 3, 'xy', B.iron, B.copper, 4); valve.box(AX - 2, ay + 33, AZ + 5, AX + 2, ay + 33, AZ + 5, B.iron); valve.box(AX, ay + 31, AZ + 5, AX, ay + 35, AZ + 5, B.iron);
      w.box(AX, ay + 33, AZ + 3, AX, ay + 33, AZ + 4, B.iron);
      lights.push({ name: 'still', p: [AX + 0.5, ay + 3, AZ + 6], c: '#ff9a40', i: 1.5, d: 20, flicker: 0.3 });
      lights.push({ p: [AX + 0.5, ay + 15, AZ + 11.5], c: '#90ff60', i: 1, d: 13, flicker: 0.1 });
      smoke.push({ n: 40, colors: ['#9aff6a', '#e0ffc0'], mode: 'rise', speed: 0.8, area: [AX + 0.5, AZ + 0.5, 1], y0: ay + 49, y1: ay + 74, glow: true });
      acts.push({
        name: '대증류탑', hint: '밸브가 돌고 증기가 뿜어지며 응축기에 물약이 고여요', hit: [AX - 10, ay + 6, AZ - 10, AX + 10, ay + 27, AZ + 11],
        run: async a => {
          a.flash('still', 2.6, 4.5);
          await a.turn('valve', [0, 0, 6.28], 1.6, t => t);
          for (let q = 0; q < 6; q++) {
            a.burst([AX + 0.5, ay + 49, AZ + 0.5], { n: 36, colors: ['#e8ffe0', '#9aff6a', '#ffffff'], speed: 4, up: 8, life: 1.8, gravity: -0.5, spread: 1.5 });
            a.burst([CXX + 0.5, cy + 8, CZZ + 0.5], { n: 10, colors: ['#6ac8ff', '#c8f0ff'], speed: 0.5, up: 0, life: 0.8, gravity: 8, spread: 0.5 });
            await a.wait(0.45);
          }
          await a.turn('valve', [0, 0, 0], 1.4, t => t);
        },
      });
      landmarks.push({ name: '대증류탑', note: '연금술 조합의 구리 증류기', p: [AX + 0.5, ay + 54, AZ + 0.5], tag: 'LAB' });
      landmarks.push({ name: '응축기', note: '협곡 건너편에서 물약을 식힌다', p: [CXX + 0.5, cy + 32, CZZ + 0.5] });
      // ── 폐액 펌프: 수로 위 물레 ──
      const PZ = 126, PXX = Math.round(cx(PZ));
      for (const x of [PXX - 4, PXX + 5]) { w.box(x, F + 1, PZ + 2, x, F + 9, PZ + 2, B.log); w.box(x, F + 1, PZ + 1, x, F + 1, PZ + 3, B.found); }
      w.box(PXX - 4, F + 8, PZ + 2, PXX - 1, F + 8, PZ + 2, B.iron); w.box(PXX + 2, F + 8, PZ + 2, PXX + 5, F + 8, PZ + 2, B.iron);
      for (let z = PZ - 7; z <= PZ + 11; z++) for (let x = PXX - 1; x <= PXX + 2; x++) if (w.get(x, F, z) === B.plank) w.set(x, F, z, 0);
      const pump = w.prop({ name: 'pump', pivot: [PXX + 1, F + 8.5, PZ + 2.5], axis: 'x', speed: 0.8 });
      for (let dy = -8; dy <= 8; dy++) for (let dz = -8; dz <= 8; dz++) { const r = Math.hypot(dy, dz); if (r > 7.2) continue; if (r > 5.8 || dy === 0 || dz === 0) for (const x of [PXX, PXX + 1]) pump.set(x, F + 8 + dy, PZ + 2 + dz, r > 5.8 ? B.copperDk : B.log); }
      for (let a = 0; a < 10; a++) { const ang = a * 0.628; for (const x of [PXX, PXX + 1]) pump.set(x, F + 8 + Math.round(Math.sin(ang) * 8), PZ + 2 + Math.round(Math.cos(ang) * 8), B.patina); }
      for (let z = PZ - 7; z <= PZ + 11; z++) for (const dx of [0, 1]) { MH.setH(w, PXX + dx, z, F - 10, B.rockDk, B.rockDk); for (let y = F - 9; y <= F; y++) w.set(PXX + dx, y, z, 0); w.liquid(PXX + dx, z, F - 1); }
      acts.push({
        name: '폐액 물레', hint: '물레가 빨리 돌며 초록 물보라가 튀어요', hit: [PXX - 1, F, PZ - 6, PXX + 2, F + 16, PZ + 10],
        run: async a => { a.spin('pump', 5, 4); for (let q = 0; q < 8; q++) { a.burst([PXX + 1, F, PZ + 2.5], { n: 28, colors: ['#8aff5a', '#e0ff8a'], speed: 4, up: 5, life: 1, gravity: 9, spread: 3 }); await a.wait(0.45); } },
      });
      landmarks.push({ name: '폐액 물레', note: '넘친 물약을 퍼 올리는 바퀴', p: [PXX + 1, F + 21, PZ + 2.5] });
      // ── 새 구역: 남쪽 약재 장터 — 일곱 색 분수, 노점, 호문쿨루스 플라스크 ──
      for (let z = MKZ - 18; z <= MKZ + 20; z++) for (let x = MKX - 26; x <= MKX + 26; x++) { const g0 = MH.g(w, x, z); if (g0 === F) w.set(x, F, z, (x + z) % 5 === 0 ? B.found : ((x >> 1) + (z >> 1)) % 2 ? B.cob : B.found); }
      // 분수: 세 단 대야와 일곱 색 물약 꼭지
      for (let z = MKZ - 8; z <= MKZ + 8; z++) for (let x = MKX - 8; x <= MKX + 8; x++) {
        const d = MH.dist(x, z, MKX, MKZ); if (d > 7.6) continue;
        if (d > 6.2) { w.box(x, F + 1, z, x, F + 2, z, B.found); w.set(x, F + 3, z, B.copperDk); continue; }
        MH.setH(w, x, z, F - 1, B.rockDk, B.rockDk); w.liquid(x, z, F + 1);
      }
      w.cyl(MKX, MKZ, F, F + 5, 1.6, B.found); w.cyl(MKX, MKZ, F + 6, F + 6, 3.6, B.copper); w.ring(MKX, MKZ, F + 7, 2.6, 3.6, B.copperDk); w.cyl(MKX, MKZ, F + 7, F + 10, 1, B.copper); w.cyl(MKX, MKZ, F + 11, F + 11, 2.2, B.copper);
      const seven = [B.potR, B.potO, B.potY, B.potG, B.potB, B.potI, B.potP];
      for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2, x = Math.round(MKX + Math.cos(a) * 3), z = Math.round(MKZ + Math.sin(a) * 3); w.set(x, F + 7, z, seven[i]); }
      w.box(MKX, F + 12, MKZ, MKX, F + 13, MKZ, B.goldG);
      lights.push({ name: 'fount', p: [MKX + 0.5, F + 12, MKZ + 0.5], c: '#ffe080', i: 1.4, d: 22, flicker: 0.1 });
      const cols7 = ['#ff6a8a', '#ffa040', '#ffe060', '#8aff5a', '#6ac8ff', '#8a7aff', '#d07aff'];
      acts.push({
        name: '일곱 색 분수', hint: '장터 분수에서 일곱 색 물약이 차례로 솟구쳐요', hit: [MKX - 7, F + 1, MKZ - 7, MKX + 7, F + 14, MKZ + 7],
        run: async a => {
          a.flash('fount', 3, 6.5); a.glow(1.5, 6.5);
          for (let i = 0; i < 7; i++) { a.burst([MKX + 0.5, F + 13, MKZ + 0.5], { n: 50, colors: [cols7[i], '#ffffff'], speed: 4, up: 15, life: 1.8, gravity: 10, spread: 1 }); await a.wait(0.55); }
          a.burst([MKX + 0.5, F + 13, MKZ + 0.5], { n: 90, colors: cols7, speed: 7, up: 18, life: 2.2, gravity: 10, spread: 2 });
          await a.wait(1);
        },
      });
      landmarks.push({ name: '약재 장터', note: '일곱 색 분수 둘레의 노점 골목', p: [MKX + 0.5, F + 22, MKZ + 0.5], tag: 'MARKET' });
      // 노점들: 줄무늬 차양, 약초·병·상자
      const goodsL = [[B.herb, B.potG, B.mand], [B.potP, B.potR, B.glass], [B.potB, B.potY, B.herb], [B.mand, B.herb, B.potO]];
      const awn = [[B.awnG, B.awnW], [B.awnP, B.awnW], [B.awnG, B.awnP]];
      let si = 0;
      for (const [sx, sz] of [[MKX - 22, MKZ - 15], [MKX - 13, MKZ - 15], [MKX + 9, MKZ - 15], [MKX + 18, MKZ - 15], [MKX - 22, MKZ + 9], [MKX + 16, MKZ + 9]]) {
        if (MH.g(w, sx, sz) !== F || MH.g(w, sx + 5, sz + 4) !== F) continue;
        const aw = awn[si % 3];
        MH.stall(w, sx, sz, { sx: 6, sz: 5, m: { post: B.log, counter: B.plank, a1: aw[0], a2: aw[1], goods: goodsL[si % 4], crate: B.crate } });
        si++;
      }
      for (const [x, z] of [[MKX - 6, MKZ + 12], [MKX + 8, MKZ + 13], [MKX - 16, MKZ - 3], [MKX - 3, MKZ - 13]]) if (MH.g(w, x, z) === F) { w.box(x, F + 1, z, x + 1, F + 2, z + 1, B.crate); w.set(x + 1, F + 3, z, B.herb); w.set(x, F + 3, z + 1, seven[(x + z) % 7]); }
      MH.garland(w, [MKX - 22, F + 9, MKZ - 15], [MKX + 23, F + 9, MKZ - 15], B.iron, [B.potY, B.potG, B.potP], 3);
      // 호문쿨루스 플라스크: 받침 위의 커다란 유리병, 안의 작은 호문쿨루스(부품)
      const HFX = MKX + 13, HFZ = MKZ + 1, hfy = MH.g(w, HFX, HFZ) + 1;
      w.cyl(HFX, HFZ, hfy, hfy + 1, 4, B.copperDk); w.ring(HFX, HFZ, hfy + 1, 3, 4, B.copper);
      w.sphere(HFX, hfy + 6, HFZ, 4.6, B.glass, (dx, dy, dz) => Math.hypot(dx, dy, dz) > 3.6 && ((dx + dy + dz) % 2 === 0 || dy < -2));
      w.ring(HFX, HFZ, hfy + 10, 1, 2, B.glass); w.ring(HFX, HFZ, hfy + 11, 1, 2, B.glass); w.ring(HFX, HFZ, hfy + 12, 1, 2.2, B.copper); w.set(HFX, hfy + 13, HFZ, B.copperDk);
      w.cyl(HFX, HFZ, hfy + 2, hfy + 2, 2.4, B.potG);
      lights.push({ name: 'flask', p: [HFX + 0.5, hfy + 5, HFZ + 0.5], c: '#a0ffb0', i: 1.1, d: 14, flicker: 0.15 });
      const homu = w.prop({ name: 'homu', pivot: [HFX + 0.5, hfy + 5, HFZ + 0.5], axis: 'y', speed: 0.4, bob: 0.4, bobSpeed: 1.4 });
      homu.box(HFX, hfy + 4, HFZ, HFX, hfy + 6, HFZ, B.homu); homu.set(HFX, hfy + 7, HFZ, B.homu); homu.set(HFX + 1, hfy + 5, HFZ, B.homu); homu.set(HFX - 1, hfy + 5, HFZ, B.homu); homu.set(HFX, hfy + 7, HFZ + 1, B.potG); homu.set(HFX, hfy + 8, HFZ, B.goldG);
      acts.push({
        name: '호문쿨루스', hint: '플라스크 속 호문쿨루스가 깨어나 병 위로 떠올라 빙글빙글 춤을 춰요', hit: [HFX - 5, hfy, HFZ - 5, HFX + 5, hfy + 13, HFZ + 5],
        run: async a => {
          a.flash('flask', 3, 5); a.spin('homu', 8, 4.5);
          await a.move('homu', [0, 10, 0], 1.2);
          for (let k = 0; k < 4; k++) { await a.move('homu', [0, 12, 0], 0.4); a.burst([HFX + 0.5, hfy + 18, HFZ + 0.5], { n: 24, colors: ['#a0ffb0', '#ffffff', '#ffd860'], speed: 4, up: 4, life: 1.4, gravity: 1, spread: 1 }); await a.move('homu', [0, 10, 0], 0.4); }
          await a.move('homu', [0, 0, 0], 1.2);
        },
      });
      // ── 새 구역: 서쪽 벼랑 위 유리 공방 — 벽돌 가마와 부풀어 오르는 유리 방울 ──
      const GWX = 30, GWZ = 122, gwy = MH.maxG(w, GWX - 12, GWZ - 9, GWX + 12, GWZ + 9) + 1;
      MH.flatten(w, GWX - 13, GWZ - 10, GWX + 13, GWZ + 10, gwy - 1, B.cob, B.rock);
      const shop = MH.houseX(w, { x: GWX - 12, z: GWZ - 9, sx: 12, sz: 10, floors: 2, fh: 6, face: 'e', pitch: 1, studs: true, axis: 'x', y: gwy - 1,
        m: { found: B.found, wall: B.wallC, frame: B.frame, win: B.winG, sill: B.frame, door: B.door, roof: B.roofT, eave: B.eave, ridge: B.frame, chimney: B.brick, lamp: B.lamp } });
      if (shop.chimney) smoke.push({ n: 24, colors: ['#ffb070', '#f0e0c0'], mode: 'rise', speed: 0.6, area: [shop.chimney[0], shop.chimney[2], 0.7], y0: shop.chimney[1], y1: shop.chimney[1] + 16, glow: true });
      // 벌집 모양 벽돌 가마
      const KLX = GWX + 6, KLZ = GWZ + 4;
      w.sphere(KLX, gwy, KLZ, 5.4, B.brick, (dx, dy) => dy >= 0); w.cyl(KLX, KLZ, gwy, gwy + 3, 3.6, 0); w.cyl(KLX, KLZ, gwy, gwy, 3.6, B.fire);
      w.box(KLX - 1, gwy, KLZ + 4, KLX + 1, gwy + 2, KLZ + 6, 0); w.box(KLX - 2, gwy + 3, KLZ + 5, KLX + 2, gwy + 3, KLZ + 5, B.iron);
      w.box(KLX, gwy + 5, KLZ, KLX, gwy + 9, KLZ, B.brick); w.set(KLX, gwy + 10, KLZ, B.iron);
      for (let i = 0; i < 4; i++) w.box(KLX + 6, gwy, KLZ - 4 + i * 2, KLX + 7, gwy + 1, KLZ - 4 + i * 2, B.log);
      w.box(GWX - 4, gwy, GWZ + 3, GWX + 0, gwy, GWZ + 7, B.plank); for (let i = 0; i < 5; i++) w.set(GWX - 4 + i, gwy + 1, GWZ + 3 + (i % 3), [B.glass, B.potB, B.glass, B.potP, B.potG][i]);
      lights.push({ name: 'kiln', p: [KLX + 0.5, gwy + 2, KLZ + 5], c: '#ffa040', i: 1.4, d: 18, flicker: 0.35 });
      smoke.push({ n: 18, colors: ['#ffb070', '#ffe0b0'], mode: 'rise', speed: 0.9, area: [KLX + 0.5, KLZ + 0.5, 0.6], y0: gwy + 11, y1: gwy + 26, glow: true });
      const BBX = KLX, BBZ = KLZ + 9, bby = gwy + 4;
      w.box(BBX, gwy, BBZ, BBX, gwy + 2, BBZ, B.iron); w.box(BBX - 1, gwy, BBZ - 1, BBX + 1, gwy, BBZ + 1, B.found);
      const bub = w.prop({ name: 'bubble', pivot: [BBX + 0.5, gwy + 3, BBZ + 0.5], axis: 'y', speed: 0.3, scl0: [0, 0, 0] });
      bub.sphere(BBX, bby, BBZ, 3, B.glass, (dx, dy, dz) => Math.hypot(dx, dy, dz) > 2 && (dx + dy + dz) % 2 === 0); bub.sphere(BBX, bby, BBZ, 1.4, B.potO);
      acts.push({
        name: '유리 불기', hint: '유리 공방 가마가 확 타오르고 커다란 유리 방울이 부풀다 터져요', hit: [KLX - 5, gwy, KLZ - 5, KLX + 5, gwy + 9, BBZ + 3],
        run: async a => {
          a.flash('kiln', 4, 5.5);
          for (let k = 0; k < 3; k++) { a.burst([KLX + 0.5, gwy + 2, KLZ + 6], { n: 30, colors: ['#ff9a3a', '#ffd060', '#ffffff'], speed: 4, up: 4, life: 1, gravity: -1, spread: 1 }); await a.wait(0.3); }
          await a.tween('bubble', { scl: [1, 1, 1] }, 1.6);
          await a.tween('bubble', { scl: [1.4, 1.4, 1.4] }, 1.2);
          a.lightning(0.3);
          a.burst([BBX + 0.5, bby + 1, BBZ + 0.5], { n: 70, colors: ['#a8e0c8', '#ffffff', '#ffa040', '#6ac8ff'], speed: 10, up: 4, life: 1.4, gravity: 8, spread: 2 });
          await a.tween('bubble', { scl: [0, 0, 0] }, 0.2);
          await a.wait(0.6);
        },
      });
      landmarks.push({ name: '유리 공방', note: '벌집 가마에서 물약병을 불어 만든다', p: [GWX + 0.5, gwy + 24, GWZ + 0.5] });
      // 골목 가로등(초록 불): 조명은 셋만
      let nl = 0;
      for (let z = 14; z <= D - 10; z += 18) { const x = Math.round(cx(z)) + 6; if (MH.dist(x, z, KX, KZ) < 16 || Math.abs(z - MKZ) < 18 || w.get(x, F + 1, z) || MH.g(w, x, z) !== F) continue; const p = MH.lamp(w, x, z, { m: { post: B.iron, glow: B.lamp, found: B.found }, h: 7 }); if (nl++ < 2) lights.push({ p, c: '#a0ff80', i: 1, d: 14, flicker: 0.1, night: true }); }
      // ── 현자의 돌(동쪽 절벽 위): 변성진 위에 떠 있는 붉은 돌(부품) ──
      const SX = 139, SZ = 126, sy = MH.maxG(w, SX - 11, SZ - 11, SX + 11, SZ + 11);
      MH.flatten(w, SX - 13, SZ - 13, SX + 13, SZ + 13, sy, B.cob, B.rock);
      MH.circle(w, SX, SZ, 11, B.potR); MH.circle(w, SX, SZ, 7, B.goldG); MH.circle(w, SX, SZ, 9, B.found);
      for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; w.line(SX + Math.cos(a) * 7, sy, SZ + Math.sin(a) * 7, SX + Math.cos(a + 2.09) * 7, sy, SZ + Math.sin(a + 2.09) * 7, B.potR); }
      for (let k = 0; k < 4; k++) { const a = k * 1.57 + 0.78, px = Math.round(SX + Math.cos(a) * 12.5), pz = Math.round(SZ + Math.sin(a) * 12.5); w.box(px - 1, sy + 1, pz - 1, px + 1, sy + 1, pz + 1, B.found); w.box(px, sy + 2, pz, px, sy + 6, pz, B.found); w.set(px, sy + 7, pz, B.copper); w.set(px, sy + 8, pz, k % 2 ? B.potP : B.potG); }
      w.box(SX - 1, sy + 1, SZ - 1, SX + 1, sy + 1, SZ + 1, B.copperDk); w.box(SX, sy + 2, SZ, SX, sy + 3, SZ, B.copper);
      const philo = w.prop({ name: 'philo', pivot: [SX + 0.5, sy + 8.5, SZ + 0.5], axis: 'y', speed: 0.6, bob: 0.5, bobSpeed: 1.2 });
      philo.sphere(SX, sy + 8, SZ, 2.2, B.philo); philo.set(SX, sy + 11, SZ, B.goldG); philo.set(SX, sy + 5, SZ, B.goldG); philo.set(SX + 3, sy + 8, SZ, B.goldG); philo.set(SX - 3, sy + 8, SZ, B.goldG);
      lights.push({ name: 'philo', p: [SX + 0.5, sy + 8, SZ + 0.5], c: '#ff4a5a', i: 1.4, d: 20, flicker: 0.12 });
      acts.push({
        name: '현자의 돌', hint: '붉은 돌이 높이 떠올라 돌며 금빛 가루를 쏟아내요', hit: [SX - 11, sy + 1, SZ - 11, SX + 11, sy + 12, SZ + 11],
        run: async a => {
          a.flash('philo', 4, 5.5); a.glow(1.7, 5.5); a.spin('philo', 9, 5.5);
          await a.move('philo', [0, 8, 0], 1.4);
          for (let k = 0; k < 7; k++) { a.burst([SX + 0.5, sy + 16, SZ + 0.5], { n: 36, colors: ['#ffd860', '#fff0a0', '#ff6a8a'], speed: 8, up: 4, life: 1.8, gravity: 6, spread: 1 }); await a.wait(0.4); }
          a.burst([SX + 0.5, sy + 1, SZ + 0.5], { n: 60, colors: ['#ffd860', '#ff6a8a'], speed: 12, up: 1, life: 1, gravity: 1, spread: 8, flat: true });
          await a.move('philo', [0, 0, 0], 1.6);
        },
      });
      landmarks.push({ name: '현자의 돌', note: '변성진 위에 떠 있는 붉은 돌', p: [SX + 0.5, sy + 19, SZ + 0.5] });
      // ── 응축기 남쪽 면의 냉각 팬(부품) ──
      const fan = w.prop({ name: 'fan', pivot: [CXX + 0.5, cy + 15.5, CZZ + 8.5], axis: 'z', speed: 0.8 });
      for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2; for (let r = 1; r <= 5; r++) for (const s of [-0.35, 0, 0.35]) fan.set(Math.round(CXX + Math.cos(a + s * 1.3 / r * 2) * r), Math.round(cy + 15 + Math.sin(a + s * 1.3 / r * 2) * r), CZZ + 8, r === 5 ? B.copper : B.patina); }
      fan.set(CXX, cy + 15, CZZ + 8, B.iron); fan.set(CXX, cy + 15, CZZ + 9, B.frost);
      acts.push({
        name: '냉각 팬', hint: '응축기의 팬이 세차게 돌며 차가운 김을 내뿜어요', hit: [CXX - 6, cy + 9, CZZ + 6, CXX + 6, cy + 21, CZZ + 10],
        run: async a => {
          a.spin('fan', 9, 5);
          for (let k = 0; k < 9; k++) {
            a.burst([CXX + 0.5, cy + 15.5, CZZ + 10], { n: 30, colors: ['#c8f0ff', '#ffffff', '#6ac8ff'], speed: 9, up: 0, life: 1.4, gravity: -0.4, spread: 3 });
            if (k % 2) a.burst([CXX + 0.5, cy + 8, CZZ + 0.5], { n: 10, colors: ['#6ac8ff', '#c8f0ff'], speed: 0.5, up: 0, life: 0.8, gravity: 8, spread: 0.5 });
            await a.wait(0.5);
          }
        },
      });
      // ── 굴뚝 폭발: 시점 쪽 공방 굴뚝의 뚜껑(부품)이 펑 하고 날아간다 ──
      const ch = chims.reduce((b, c) => c[0] + c[2] > b[0] + b[2] && c[2] < 128 ? c : b), hx = ch[0] - 0.5, hz = ch[2] - 0.5, hy = ch[1];
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
      const d0 = pipeAt(0), drop = w.prop({ name: 'drop', pivot: [d0[0] + 0.5, d0[1] + 3, d0[2] + 0.5], axis: 'y', speed: 1, scl0: [0, 0, 0] });
      drop.sphere(Math.round(d0[0]), Math.round(d0[1] + 3), Math.round(d0[2]), 1.8, B.potG); drop.set(Math.round(d0[0]), Math.round(d0[1] + 6), Math.round(d0[2]), B.frost);
      const dropPts = []; for (let i = 1; i <= 14; i++) { const p = pipeAt(i / 14); dropPts.push([p[0] - d0[0], p[1] - d0[1], p[2] - d0[2]]); }
      acts.push({
        name: '물약 방울', hint: '증류탑 꼭대기에서 빛나는 물약 방울이 관을 타고 협곡을 건너요', hit: [AX - 5, ay + 38, AZ - 5, AX + 6, ay + 48, AZ + 5],
        run: async a => {
          a.flash('still', 2.4, 7);
          a.burst([d0[0] + 0.5, d0[1] + 3, d0[2] + 0.5], { n: 30, colors: ['#8aff5a', '#e0ffc0'], speed: 4, up: 3, life: 1.2, gravity: 2, spread: 1 });
          await a.tween('drop', { scl: [1, 1, 1] }, 0.7);
          await a.path('drop', dropPts, 5);
          await a.move('drop', [dropPts[13][0], dropPts[13][1] - 4, dropPts[13][2]], 0.5);
          a.tween('drop', { scl: [0, 0, 0] }, 0.4);
          for (let k = 0; k < 4; k++) { a.burst([CXX + 0.5, cy + 8, CZZ + 0.5], { n: 14, colors: ['#8aff5a', '#6ac8ff'], speed: 0.6, up: 0, life: 0.8, gravity: 8, spread: 0.5 }); a.burst([CXX + 0.5, cy + 27, CZZ + 0.5], { n: 16, colors: ['#8aff5a', '#ffffff'], speed: 4, up: 4, life: 1, gravity: 4, spread: 1 }); await a.wait(0.4); }
          await a.respawn('drop', 1.0);
        },
      });
      // ── 만드라고라 밭(동쪽 절벽 위): 흙 속 뿌리(부품)가 차례로 튀어나와 비명을 지른다 ──
      const MX = 124, MZ = 88, my = MH.maxG(w, MX - 3, MZ - 4, MX + 20, MZ + 4);
      MH.flatten(w, MX - 4, MZ - 5, MX + 21, MZ + 5, my, B.cob, B.rock);
      w.box(MX - 2, my + 1, MZ - 2, MX + 19, my + 1, MZ + 2, B.plank); w.box(MX - 1, my + 1, MZ - 1, MX + 18, my + 1, MZ + 1, B.soil);
      MH.fence(w, [[MX - 4, MZ - 5], [MX + 21, MZ - 5], [MX + 21, MZ + 5], [MX - 4, MZ + 5]], B.log, B.plank);
      for (let k = 0; k < 6; k++) {
        const x = MX + k * 3 + 1, p = w.prop({ name: 'mand' + k, pivot: [x + 0.5, my + 4, MZ + 0.5], off0: [0, -3, 0], clipOK: 0 });
        p.box(x - 1, my + 2, MZ, x, my + 4, MZ, B.mand); p.set(x - 1, my + 4, MZ + 1, B.eave); p.set(x, my + 4, MZ + 1, B.eave); p.set(x - 2, my + 3, MZ, B.mand); p.set(x + 1, my + 3, MZ, B.mand);
        p.box(x - 1, my + 5, MZ, x, my + 5, MZ, B.leafM); p.set(x - 1, my + 6, MZ, B.leafM); p.set(x, my + 6, MZ - 1, B.leafM); p.set(x, my + 7, MZ, B.leafM); p.set(x - 1, my + 6, MZ + 1, B.leafM);
      }
      acts.push({
        name: '만드라고라 밭', hint: '흙 속 만드라고라가 차례로 튀어나와 꽥 비명을 질러요', hit: [MX - 2, my + 1, MZ - 3, MX + 19, my + 8, MZ + 3],
        run: async a => {
          for (let k = 0; k < 6; k++) {
            a.move('mand' + k, [0, 1, 0], 0.35); a.turn('mand' + k, [0, 0.5, 0], 0.2);
            a.burst([MX + k * 3 + 1, my + 5, MZ + 0.5], { n: 26, colors: ['#ffffff', '#e0ffb0'], speed: 8, up: 0.5, life: 0.7, gravity: 0, spread: 1, flat: true });
            await a.wait(0.35); a.turn('mand' + k, [0, -0.5, 0], 0.2);
          }
          await a.wait(1.4);
          for (let k = 0; k < 6; k++) { a.turn('mand' + k, [0, 0, 0], 0.4); a.move('mand' + k, [0, -3, 0], 0.6); a.burst([MX + k * 3 + 1, my + 2, MZ + 0.5], { n: 10, colors: ['#4a3420', '#6a4a30'], speed: 2, up: 2, life: 0.6, gravity: 8, spread: 1 }); await a.wait(0.15); }
          await a.wait(0.6);
        },
      });
      // 골목 바닥: 박석 무늬, 초록 웅덩이, 흩어진 깨진 병
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        if (MH.g(w, x, z) !== F || w.get(x, F, z) !== B.cob || w.get(x, F + 1, z)) continue;
        const h0 = hash3(x >> 1, 9, z >> 1), h1 = hash3(x, 11, z);
        if (h0 > 0.8) w.set(x, F, z, B.found); else if (h0 < 0.08) w.set(x, F, z, B.rockDk);
        if (h1 > 0.995) w.set(x, F + 1, z, pots[(x + z) % 4]); else if (h1 > 0.985) w.set(x, F + 1, z, B.glass);
      }
      for (let i = 0; i < 10; i++) { const z = w.ri(4, D - 5), x = Math.round(cx(z)) + (i % 2 ? 4 : -4); if (MH.g(w, x, z) !== F || w.get(x, F + 1, z)) continue; for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) if (MH.g(w, x + dx, z + dz) === F && !w.get(x + dx, F + 1, z + dz) && (dx === 0 || dz === 0)) { MH.setH(w, x + dx, z + dz, F - 1, B.rockDk, B.rockDk); w.liquid(x + dx, z + dz, F - 1); } }
      // ── 벼랑 위 공방 줄(윗길): 협곡 가장자리를 따라 선 작은 공방들 ──
      const busy = [[AX, AZ, 18], [CXX, CZZ, 16], [MX + 9, MZ, 18], [SX, SZ, 19], [GWX, GWZ, 20], [KX, KZ, 14], [MKX, MKZ, 30]];
      let uk = 0;
      for (const z of [8, 26, 44, 62, 80, 98, 116, 134]) for (const side of [-1, 1]) {
        const c = cx(z + 4), wd = wide(z + 4), x = Math.round(side < 0 ? c - wd - 17 : c + wd + 8);
        if (x < 4 || x + 9 > W - 4 || busy.some(([bx, bz, r]) => MH.dist(x + 4, z + 4, bx, bz) < r + 6)) continue;
        const hy = MH.maxG(w, x - 1, z - 1, x + 9, z + 8) + 1;
        if (hy < F + 18) continue;
        const h = MH.houseX(w, { x, z, sx: 9, sz: 8, floors: 2, fh: 5, face: side < 0 ? 'e' : 'w', studs: true, pitch: 1, axis: 'z', y: hy - 1,
          m: { found: B.found, wall: walls[(uk + 2) % 4], frame: B.frame, win: uk % 2 ? B.winG : B.winP, sill: B.frame, door: B.door, roof: roofs[(uk + 1) % 3], eave: B.eave, ridge: B.frame, chimney: B.found, lamp: B.lamp } });
        if (h.chimney && smoke.length < 9) smoke.push({ n: 20, colors: smokeCol[(uk + 1) % 4], mode: 'rise', speed: 0.7, area: [h.chimney[0], h.chimney[2], 0.6], y0: h.chimney[1], y1: h.chimney[1] + 14, glow: true });
        const fx = side < 0 ? h.x1 + 2 : h.x0 - 2; w.box(fx, hy, z + 1, fx, hy, z + 2, B.crate); w.set(fx, hy + 1, z + 1, pots[uk % 4]);
        uk++;
      }
      // ── 벼랑 위 덤불·바위·약초 ──
      for (let i = 0; i < 200; i++) { const x = w.ri(2, W - 3), z = w.ri(2, D - 3), gg = MH.g(w, x, z); if (gg < F + 12 || w.get(x, gg + 1, z) || w.get(x, gg, z) !== B.grass) continue; const r = hash3(x, 5, z); if (r > 0.9) MH.rock(w, x, gg + 1, z, 1.4, B.rock, B.grass); else w.set(x, gg + 1, z, r > 0.75 ? B.herb : B.leafM); }
      for (let i = 0; i < 14; i++) { const x = w.ri(6, W - 7), z = w.ri(6, D - 7), gg = MH.g(w, x, z); if (gg < F + 14 || w.get(x, gg, z) !== B.grass || w.slope[x + W * z] > 1) continue; let ok = true; for (let q = 1; q <= 10; q++) for (const [dx, dz] of [[0, 0], [3, 0], [-3, 0], [0, 3], [0, -3]]) if (w.get(x + dx, gg + q, z + dz)) ok = false; if (ok) MH.tree(w, x, gg + 1, z, { kind: 'oak', h: w.ri(5, 7), bark: B.log, leaves: [B.herb, B.leafM, B.leafM], r: 2.8 }); }
      return { lights, landmarks, acts, particles: smoke };
    },
  });
})();
