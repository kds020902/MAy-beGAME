// 심연의 동굴 — 계단식 동굴 싱크홀, 절벽의 눈, 심연의 촉수 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  MAPS.push({
    id: 'abyss', cat: 'dungeon', name: '심연의 동굴', en: 'Abyssal Hollow', color: '#8a6cc9', seed: 53, base: 32, time: 'night',
    desc: '빛이 닿지 않는 지하. 이곳에서 오래 머문 자는 스스로를 잊는다.',
    monsters: { normal: ['눈먼 추적자', '동굴 촉수', '그림자'], mid: '심연의 감시자', boss: '이름 없는 것' },
    sky: ['#07060e', '#15102a', '#4a3282'], stars: true,
    hemi: ['#b0a0e0', '#1a1426', 0.74], sun: ['#c8b8ff', 0.6, [0.45, 1, 0.5]],
    day: { sky: ['#2a2440', '#4a4070', '#8a78c0'], stars: false, hemi: ['#d8d0f0', '#2a2438', 0.8], sun: ['#e8e0ff', 0.7, [0.45, 1, 0.5]], haze: '#4a3e6e' },
    liquid: ['#0c0818', '#2a1a4c', '#c29aff'], liqSpeed: 0.7, liqGlow: true,
    fog: { start: 0.66, floor: 8, depth: 10, haze: [22, 0.32, 8], hazeColor: '#281d44' },
    camY: 2,
    particles: [
      { n: 300, colors: ['#c49aff', '#8a6cff', '#f0d8ff'], mode: 'rise', speed: 0.8, area: [64, 72, 15], y0: 16, y1: 72 },
      { n: 160, colors: ['#6ae0ff', '#b98cff'], mode: 'drift', speed: 0.2, y0: 30, y1: 72 },
    ],
    blocks: {
      rock: { c: '#35304a', top: '#4d4663', v: 0.1, pat: 'stone' }, lichen: { c: '#35304a', top: '#62508e', v: 0.12 },
      rockDk: { c: '#231f2e', v: 0.08, pat: 'stone' }, crag: { c: '#3a3448', v: 0.1, pat: 'big' }, cragHi: { c: '#4a4260', v: 0.1, pat: 'big' },
      pale: { c: '#7a7490', v: 0.06, pat: 'brick' }, paleDk: { c: '#5a5470', v: 0.06, pat: 'brick' },
      tent: { c: '#5c2a5c', v: 0.08 }, tentDk: { c: '#3a1a3f', v: 0.08 }, pupil: { c: '#07050a', v: 0 }, chain: { c: '#2a2a34', v: 0.03 }, bone: { c: '#c8c0d0', v: 0.05 },
      crys: { c: '#b98cff', glow: true }, crys2: { c: '#6ae0ff', glow: true }, sucker: { c: '#f0a0e0', glow: true },
      eyeW: { c: '#e4dcef', glow: true }, iris: { c: '#9a48ff', glow: true }, iris2: { c: '#d8a8ff', glow: true }, rune: { c: '#8a70ff', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, CX = 64, CZ = 72, PIT = 17;
      const rOf = (x, z) => Math.hypot(x - CX, z - CZ) * (1 + (n.fbm(x * 0.04 + 5, z * 0.04, 3) - 0.5) * 0.3);
      MH.terrain(w, {
        floor: 2,
        height: (x, z) => {
          const r = rOf(x, z);
          let hh;
          if (r < PIT) hh = -22;
          else if (r < 57) hh = -14 + Math.floor((r - PIT) / 8) * 4 + MH.sstep(0, 1, ((r - PIT) % 8) / 8) * 0.9;
          else hh = 8 + (r - 57) * 1.3;
          if (z < 28) hh = Math.max(hh, 30 - z * 0.35);
          return base + Math.min(62, hh) + n.fbm(x * 0.07, z * 0.07) * 2.5;
        },
        surface: (x, z, y, s) => s >= 3 ? (hash3(x, y >> 1, z) > 0.5 ? B.crag : B.cragHi) : n.fbm(x * 0.1 + 3, z * 0.1, 2) > 0.56 ? B.lichen : B.rock,
        under: (x, z, y, dep, s) => s >= 2 ? B.crag : (y % 4 === 0 ? B.rockDk : B.crag),
      });
      const WL = base - 19;
      MH.water(w, WL, (x, z) => rOf(x, z) < PIT + 1);
      const lights = [], acts = [], landmarks = [];
      lights.push({ name: 'void', p: [CX, WL + 2, CZ], c: '#9a60ff', i: 2.2, d: 40, flicker: 0.15, liquid: true });

      // ── 절벽 끝 처마와 종유석 ──
      for (let z = 2; z < D - 2; z++) for (let x = 2; x < W - 2; x++) {
        const g = MH.g(w, x, z), r = rOf(x, z);
        if (r < 55 || r > 59 || hash3(x, 5, z) < 0.35) continue;
        const dx = Math.sign(CX - x), dz = Math.sign(CZ - z);
        for (let k = 1; k <= 4; k++) { w.set(x + dx * k, g - 1, z + dz * k, B.crag); w.set(x + dx * k, g, z + dz * k, k < 4 ? B.rock : B.crag); }
        if (hash3(x, 9, z) > 0.6) { const L = w.ri(3, 10); for (let q = 1; q <= L; q++) w.set(x + dx * 4, g - 1 - q, z + dz * 4, q > L - 2 ? B.rockDk : B.crag); }
      }
      // ── 바위 아치 ──
      const arch = (ax, az, bx, bz, lift) => {
        const ga = MH.g(w, ax, az), gb = MH.g(w, bx, bz);
        let prev = null;
        for (let t = 0; t <= 1.0001; t += 0.025) {
          const x = ax + (bx - ax) * t, z = az + (bz - az) * t, y = ga + (gb - ga) * t + Math.sin(t * Math.PI) * lift;
          if (prev) w.line(prev[0], prev[1], prev[2], x, y, z, B.crag, 2.6 - Math.sin(t * Math.PI) * 0.8);
          prev = [x, y, z];
        }
        for (let k = 0; k < 14; k++) {
          const t = w.r(0.2, 0.8), x = Math.round(ax + (bx - ax) * t), z = Math.round(az + (bz - az) * t);
          const y = Math.round(ga + (gb - ga) * t + Math.sin(t * Math.PI) * lift) - 3, L = w.ri(2, 7);
          for (let q = 0; q < L; q++) w.fill(x, y - q, z, q > L - 2 ? B.rockDk : B.crag);
        }
      };
      arch(26, 54, 58, 100, 13); arch(104, 50, 80, 110, 15);

      // ── 감시자의 눈(북쪽 절벽) ──
      const EX = 64, EY = base + 16, EZ = 30, ER = 8;
      for (let z = 12; z <= 36; z++) for (let x = 42; x <= 86; x++) {
        const g = MH.g(w, x, z), peak = base + 32 - Math.abs(x - EX) * 0.3 - Math.max(0, z - 30) * 2.4 + n.fbm(x * 0.16, z * 0.16) * 4;
        for (let y = g + 1; y <= peak; y++) w.set(x, y, z, hash3(x, y, z) > 0.7 ? B.cragHi : B.crag);
        if (peak > g) w.hm[x + W * z] = Math.round(peak);
      }
      w.ellipsoid(EX, EY, EZ, 11, 10, 8, 0, (dx, dy, dz) => dz >= -1);
      w.sphere(EX, EY, EZ, ER, B.eyeW, (dx, dy, dz) => dz >= -3);
      for (let dy = -5; dy <= 5; dy++) for (let dx = -5; dx <= 5; dx++) {
        const d = Math.hypot(dx, dy);
        if (d > 4.8) continue;
        let z = EZ + ER + 1;
        while (z > EZ && !w.get(EX + dx, EY + dy, z)) z--;
        w.set(EX + dx, EY + dy, z, d > 3.2 ? B.iris : B.iris2);
      }
      const pupil = w.prop({ name: 'pupil', pivot: [EX + 0.5, EY + 0.5, EZ + ER] });
      for (let dy = -4; dy <= 4; dy++) for (const dx of (Math.abs(dy) < 3 ? [-1, 0] : [0])) {
        let z = EZ; while (w.get(EX + dx, EY + dy, z)) z++;
        pupil.set(EX + dx, EY + dy, z, B.pupil);
      }
      const lidU = w.prop({ name: 'lidU', pivot: [EX + 0.5, EY + 0.5, EZ], axis: 'x' });
      const lidD = w.prop({ name: 'lidD', pivot: [EX + 0.5, EY + 0.5, EZ], axis: 'x' });
      lidU.ellipsoid(EX, EY, EZ, 9.6, 9.6, 9.6, B.crag, (dx, dy, dz, d) => dy >= 3 && dz >= 0 && d > 0.78 && !w.get(EX + dx, EY + dy, EZ + dz));
      lidD.ellipsoid(EX, EY, EZ, 9.6, 9.6, 9.6, B.crag, (dx, dy, dz, d) => dy <= -4 && dz >= 0 && d > 0.78 && !w.get(EX + dx, EY + dy, EZ + dz));
      lights.push({ name: 'eye', p: [EX + 0.5, EY, EZ + ER + 1.5], c: '#b070ff', i: 1.3, d: 26, flicker: 0.05 });
      acts.push({
        name: '감시자의 눈', hint: '눈꺼풀이 열리고 눈동자가 굴러가요', hit: [EX - 9, EY - 9, EZ, EX + 9, EY + 9, EZ + 10],
        run: async a => {
          a.flash('eye', 4, 4.4);
          await Promise.all([a.turn('lidU', [-0.4, 0, 0], 0.8), a.turn('lidD', [0.3, 0, 0], 0.8)]);
          await a.move('pupil', [-3, 0, 0], 0.6); await a.wait(0.3);
          await a.move('pupil', [3, 0.5, 0], 0.9); await a.wait(0.3);
          await a.move('pupil', [0, 0, 0], 0.5);
          a.burst([EX + 0.5, EY, EZ + ER + 2], { n: 60, colors: ['#d8a8ff', '#9a48ff', '#ffffff'], speed: 7, up: 1, life: 2, gravity: 0, spread: 4 });
          await a.wait(0.6);
          await Promise.all([a.turn('lidU', [0, 0, 0], 0.5), a.turn('lidD', [0, 0, 0], 0.5)]);
        },
      });
      landmarks.push({ name: '감시자의 눈', note: '중간 보스 · 심연의 감시자', p: [EX + 0.5, EY + 18, EZ + 4], mid: true });

      // ── 심연의 촉수(부품): 수면에서 솟는다 ──
      [[0.5, 24, 8], [2.1, 30, 7], [3.6, 22, 8], [5.0, 27, 7]].forEach(([a0, hgt, reach], k) => {
        const rx = CX + Math.cos(a0) * 5, rz = CZ + Math.sin(a0) * 5;
        const p = w.prop({ name: 't' + k, pivot: [rx, WL + 1, rz], axis: k % 2 ? 'x' : 'z', rock: 0.07, rockSpeed: 0.6 + k * 0.15, phase: k, clipOK: 12 });
        let prev = null;
        for (let t = 0; t <= 1.0001; t += 0.016) {
          const a = a0 + Math.sin(t * 4 + k) * 0.35;
          const rr = 5 + Math.sin(t * Math.PI * 0.9) * reach;
          const x = CX + Math.cos(a) * rr, z = CZ + Math.sin(a) * rr, y = WL + 2 + Math.sin(t * Math.PI * 0.8) * hgt + t * 5;
          const th = 2.8 - t * 2.2;
          if (prev) p.line(prev[0], prev[1], prev[2], x, y, z, t > 0.75 ? B.tentDk : B.tent, Math.max(0.5, th));
          if (t > 0.08 && t < 0.85 && Math.round(t * 62) % 3 === 0) p.set(Math.round(x), Math.round(y + th), Math.round(z), B.sucker);
          prev = [x, y, z];
        }
      });
      acts.push({
        name: '심연의 촉수', hint: '심연 속에서 촉수가 요동쳐요', hit: [CX - 12, WL + 1, CZ - 12, CX + 12, WL + 20, CZ + 12],
        run: async a => {
          a.flash('void', 2.5, 3);
          ['t0', 't1', 't2', 't3'].forEach(t => a.spin(t, 5, 3));
          for (let k = 0; k < 4; k++) { a.burst([CX, WL + 3, CZ], { n: 50, colors: ['#c29aff', '#f0a0e0', '#2a1a4c'], speed: 9, up: 7, life: 2.2, gravity: 3, spread: 8 }); await a.wait(0.6); }
        },
      });
      landmarks.push({ name: '심연의 구멍', note: '보스 · 이름 없는 것', p: [CX + 0.5, base + 8, CZ + 0.5], boss: true });

      // ── 나선 계단과 등불 기둥 ──
      // 나선 계단은 첫 단(테라스) 높이에서 시작해 물가까지 내려간다
      const sy0 = MH.g(w, Math.round(CX + Math.cos(2.2) * (PIT + 2.6)), Math.round(CZ + Math.sin(2.2) * (PIT + 2.6)));
      for (let i = 0; i < 190; i++) {
        const a = i * 0.055 + 2.2, r = PIT + 1.6, y = sy0 - Math.floor(i * 0.075);
        if (y <= WL + 1) break;
        for (const rr of [r, r + 1, r + 2]) { const px = Math.round(CX + Math.cos(a) * rr), pz = Math.round(CZ + Math.sin(a) * rr); MH.footing(w, px, pz, px, pz, y, B.paleDk); w.set(px, y, pz, B.pale); for (let q = 1; q <= 4; q++) w.set(px, y + q, pz, 0); }
        if (i % 18 === 0) { const px = Math.round(CX + Math.cos(a) * (r + 3)), pz = Math.round(CZ + Math.sin(a) * (r + 3)); w.box(px, y + 1, pz, px, y + 5, pz, B.pale); w.set(px, y + 6, pz, B.rune); }
      }
      // ── 잊힌 제단(서쪽 단) ──
      const RX = 30, RZ = 88, rg = MH.g(w, RX, RZ);
      MH.flatten(w, RX - 9, RZ - 8, RX + 9, RZ + 8, rg, B.pale, B.paleDk);
      for (let z = RZ - 8; z <= RZ + 8; z++) for (let x = RX - 9; x <= RX + 9; x++) if ((x + z) % 2 === 0) MH.paint(w, x, z, B.paleDk);
      for (const [px, pz, h] of [[RX - 7, RZ - 6, 15], [RX + 6, RZ - 6, 9], [RX - 7, RZ + 5, 11], [RX + 6, RZ + 5, 16], [RX - 1, RZ - 7, 5]]) {
        w.box(px, rg + 1, pz, px + 1, rg + h, pz + 1, B.pale); w.box(px - 1, rg + 1, pz - 1, px + 2, rg + 1, pz + 2, B.paleDk);
        if (h > 12) w.box(px - 1, rg + h + 1, pz - 1, px + 2, rg + h + 1, pz + 2, B.paleDk);
      }
      w.box(RX - 7, rg + 17, RZ + 5, RX + 7, rg + 17, RZ + 6, B.paleDk);
      MH.circle(w, RX, RZ, 4, B.rune); MH.circle(w, RX, RZ, 2, B.rune);
      w.box(RX - 1, rg + 1, RZ - 1, RX + 1, rg + 2, RZ + 1, B.paleDk); w.set(RX, rg + 3, RZ, B.crys);
      lights.push({ p: [RX + 0.5, rg + 3, RZ + 0.5], c: '#8a70ff', i: 1, d: 14, flicker: 0.1 });
      landmarks.push({ name: '잊힌 제단', note: '그림자 · 눈먼 추적자 출몰', p: [RX + 0.5, rg + 22, RZ + 0.5] });
      // ── 쇠사슬 다리 ──
      const b0 = [CX - 26, CZ + 6], b1 = [CX - 8, CZ + 14], y0 = MH.g(w, b0[0], b0[1]), y1 = MH.g(w, b1[0], b1[1]);
      for (let t = 0; t <= 1.0001; t += 0.03) {
        const x = Math.round(b0[0] + (b1[0] - b0[0]) * t), z = Math.round(b0[1] + (b1[1] - b0[1]) * t), y = Math.round(MH.lerp(y0, y1, t) - Math.sin(t * Math.PI) * 3);
        for (const dz of [0, 1, 2]) w.set(x, y, z + dz, B.paleDk);
        w.set(x, y + 2, z - 1, B.chain); w.set(x, y + 2, z + 3, B.chain);
      }
      // ── 남쪽 가장자리에서 나선 계단 꼭대기까지 테라스를 가로질러 내려가는 옛 돌계단 ──
      const onStair = (x, z) => Math.abs(x - 52) < 6 && z > 84;
      MH.flight(w, { name: '심연 돌계단', axis: 'z', c: 52, half: 2, a: 125, b: 89, ha: MH.g(w, 52, 125), hb: sy0, step: B.pale, edge: B.paleDk, fill: B.crag, rail: B.paleDk, post: B.pale, postGap: 6,
        onPost: (x, y, z, k) => { w.set(x, y, z, B.rune); if (k % 12 === 6 && x > 52) lights.push({ p: [x + 0.5, y + 1, z + 0.5], c: '#8a70ff', i: 0.8, d: 12, flicker: 0.1 }); } });
      // ── 수정 군락 ──
      const crystals = [];
      for (let i = 0; i < 44; i++) {
        const a = w.r(0, Math.PI * 2), r = w.r(22, 54), x = Math.round(CX + Math.cos(a) * r), z = Math.round(CZ + Math.sin(a) * r);
        const g = MH.g(w, x, z);
        if (g < 0 || w.get(x, g + 1, z) || MH.dist(x, z, RX, RZ) < 12 || onStair(x, z)) continue;
        const big = crystals.length < 7 && i % 3 === 0, c = i % 2 ? B.crys : B.crys2;
        for (let k = 0; k < (big ? 6 : 2); k++) {
          const aa = w.r(0, Math.PI * 2), tl = w.r(0.15, 0.5), l = w.r(big ? 5 : 1.5, big ? 11 : 4);
          w.line(x, g + 1, z, x + Math.cos(aa) * tl * l, g + 1 + l, z + Math.sin(aa) * tl * l, c, big && k === 0 ? 0.9 : 0);
        }
        if (big) { crystals.push([x, g, z]); lights.push({ name: 'crys', p: [x + 0.5, g + 4, z + 0.5], c: c === B.crys ? '#b48cff' : '#60d8ff', i: 1.2, d: 18, flicker: 0.05 }); }
      }
      if (crystals.length) {
        const [qx, qg, qz] = crystals[0];
        acts.push({
          name: '수정 공명', hint: '수정들이 차례로 울리며 빛나요', hit: [qx - 4, qg, qz - 4, qx + 4, qg + 11, qz + 4],
          run: async a => {
            a.flash('crys', 4, 3.4); a.glow(1.9, 3.4);
            for (const [x, g, z] of crystals) { a.burst([x + 0.5, g + 6, z + 0.5], { n: 24, colors: ['#b98cff', '#6ae0ff', '#ffffff'], speed: 4, up: 3, life: 1.6, gravity: 0.5, spread: 2 }); await a.wait(0.25); }
          },
        });
        landmarks.push({ name: '울리는 수정 군락', note: '빛이 닿는 유일한 곳', p: [qx + 0.5, qg + 16, qz + 0.5] });
      }
      // 석순과 뼈
      for (let i = 0; i < 60; i++) {
        const x = w.ri(4, 123), z = w.ri(4, 123), g = MH.g(w, x, z);
        if (g < 0 || rOf(x, z) < PIT + 5 || w.get(x, g + 1, z) || MH.dist(x, z, RX, RZ) < 12 || onStair(x, z)) continue;
        const h = w.ri(3, 13);
        MH.cone(w, x, z, g + 1, w.r(1.2, 2.8), B.crag, 2.4 / h);
      }
      MH.scatter(w, 200, (x, g, z) => { if (w.chance(0.3)) w.set(x, g + 1, z, B.bone); });
      return { lights, landmarks, acts };
    },
  });
})();
