// 심연의 동굴 — 계단식 동굴 싱크홀, 절벽의 눈, 심연의 촉수, 북서쪽 벼랑에 새긴 가라앉은 납골당 (160칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 160, D = 160, Hh = 128, K = 1.25;
  const s = v => Math.round(v * K);
  MAPS.push({
    id: 'abyss', cat: 'dungeon', name: '심연의 동굴', en: 'Abyssal Hollow', color: '#8a6cc9', seed: 53, base: 32, time: 'night', size: [W, D, Hh],
    desc: '빛이 닿지 않는 지하. 이곳에서 오래 머문 자는 스스로를 잊는다. 북서쪽 벼랑에는 심연에 삼켜진 자들의 뼈를 모신 납골당이 반쯤 묻힌 채 남아, 뼈 종이 울릴 때마다 벽감의 해골들이 눈을 뜬다.',
    info: { title: '장소 정보', en: 'ABYSSAL HOLLOW', rows: [['생김새', '계단식 테라스가 둘러싼 심연의 웅덩이'], ['명소', '감시자의 눈 · 잊힌 제단 · 가라앉은 납골당'], ['주의', '뼈 종이 울리면 그림자가 깨어남']] },
    monsters: { normal: ['눈먼 추적자', '동굴 촉수', '그림자', '납골당 파수꾼'], mid: '심연의 감시자', boss: '이름 없는 것' },
    sky: ['#07060e', '#15102a', '#4a3282'], stars: true,
    hemi: ['#b0a0e0', '#1a1426', 0.74], sun: ['#c8b8ff', 0.6, [0.45, 1, 0.5]],
    day: { sky: ['#2a2440', '#4a4070', '#8a78c0'], stars: false, hemi: ['#d8d0f0', '#2a2438', 0.8], sun: ['#e8e0ff', 0.7, [0.45, 1, 0.5]], haze: '#4a3e6e' },
    liquid: ['#0c0818', '#2a1a4c', '#c29aff'], liqSpeed: 0.7, liqGlow: true,
    fog: { box: [80, 88, 80, 80], start: 0.7, floor: 4, depth: 10, haze: [28, 0.32, 8], hazeColor: '#281d44' },
    camY: 3,
    particles: [
      { n: 380, colors: ['#c49aff', '#8a6cff', '#f0d8ff'], mode: 'rise', speed: 0.8, area: [80, 90, 19], y0: 18, y1: 90 },
      { n: 220, colors: ['#6ae0ff', '#b98cff'], mode: 'drift', speed: 0.2, y0: 36, y1: 92 },
    ],
    blocks: {
      rock: { c: '#35304a', top: '#4d4663', v: 0.1, pat: 'stone' }, lichen: { c: '#35304a', top: '#62508e', v: 0.12 },
      rockDk: { c: '#231f2e', v: 0.08, pat: 'stone' }, crag: { c: '#3a3448', v: 0.1, pat: 'big' }, cragHi: { c: '#4a4260', v: 0.1, pat: 'big' },
      pale: { c: '#7a7490', v: 0.06, pat: 'brick' }, paleDk: { c: '#5a5470', v: 0.06, pat: 'brick' }, paleTr: { c: '#9a94b0', v: 0.04 },
      tent: { c: '#5c2a5c', v: 0.08 }, tentDk: { c: '#3a1a3f', v: 0.08 }, pupil: { c: '#07050a', v: 0 }, chain: { c: '#2a2a34', v: 0.03 }, bone: { c: '#c8c0d0', v: 0.05 }, boneDk: { c: '#9a90a6', v: 0.05 },
      crys: { c: '#b98cff', glow: true }, crys2: { c: '#6ae0ff', glow: true }, sucker: { c: '#f0a0e0', glow: true }, candle: { c: '#e8d8ff', glow: true },
      eyeW: { c: '#e4dcef', glow: true }, iris: { c: '#9a48ff', glow: true }, iris2: { c: '#d8a8ff', glow: true }, rune: { c: '#8a70ff', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, CX = s(64), CZ = s(72), PIT = 17 * K;
      // 원래 128칸 지형을 1.25배로: 좌표를 줄여 옛 함수에 넣고 높이를 키운다
      const rOf = (x, z) => { const xo = x / K, zo = z / K; return K * Math.hypot(xo - 64, zo - 72) * (1 + (n.fbm(xo * 0.04 + 5, zo * 0.04, 3) - 0.5) * 0.3); };
      MH.terrain(w, {
        floor: 2,
        height: (x, z) => {
          const xo = x / K, zo = z / K, r = rOf(x, z) / K;
          let hh;
          if (r < 17) hh = -22;
          else if (r < 57) hh = -14 + Math.floor((r - 17) / 8) * 4 + MH.sstep(0, 1, ((r - 17) % 8) / 8) * 0.9;
          else hh = 8 + (r - 57) * 1.3;
          if (zo < 28) hh = Math.max(hh, 30 - zo * 0.35);
          return base + K * (Math.min(62, hh) + n.fbm(xo * 0.07, zo * 0.07) * 2.5);
        },
        surface: (x, z, y, sl) => sl >= 3 ? (hash3(x, y >> 1, z) > 0.5 ? B.crag : B.cragHi) : n.fbm(x * 0.08 + 3, z * 0.08, 2) > 0.56 ? B.lichen : B.rock,
        under: (x, z, y, dep, sl) => sl >= 2 ? B.crag : (y % 4 === 0 ? B.rockDk : B.crag),
      });
      const WL = base - s(19);
      MH.water(w, WL, (x, z) => rOf(x, z) < PIT + 1.25);
      const lights = [], acts = [], landmarks = [];
      lights.push({ name: 'void', p: [CX, WL + 2, CZ], c: '#9a60ff', i: 2.2, d: 50, flicker: 0.15, liquid: true });
      // 납골당 자리(북서쪽 벼랑)
      const QX0 = 18, QX1 = 53, QXC = 35.5, QZ = 44, QZ1 = 60;
      const inCrypt = (x, z) => x >= QX0 - 4 && x <= QX1 + 4 && z >= 28 && z <= QZ1 + 4;

      // ── 절벽 끝 처마와 종유석 ──
      for (let z = 2; z < D - 2; z++) for (let x = 2; x < W - 2; x++) {
        const g = MH.g(w, x, z), r = rOf(x, z);
        if (r < 55 * K || r > 59 * K || hash3(x, 5, z) < 0.35 || inCrypt(x, z)) continue;
        const dx = Math.sign(CX - x), dz = Math.sign(CZ - z);
        for (let k = 1; k <= 5; k++) { w.set(x + dx * k, g - 1, z + dz * k, B.crag); w.set(x + dx * k, g, z + dz * k, k < 5 ? B.rock : B.crag); }
        if (hash3(x, 9, z) > 0.6) { const L = w.ri(3, 12); for (let q = 1; q <= L; q++) w.set(x + dx * 5, g - 1 - q, z + dz * 5, q > L - 2 ? B.rockDk : B.crag); }
      }
      // ── 바위 아치 ──
      const arch = (ax, az, bx, bz, lift) => {
        const ga = MH.g(w, ax, az), gb = MH.g(w, bx, bz);
        let prev = null;
        for (let t = 0; t <= 1.0001; t += 0.02) {
          const x = ax + (bx - ax) * t, z = az + (bz - az) * t, y = ga + (gb - ga) * t + Math.sin(t * Math.PI) * lift;
          if (prev) w.line(prev[0], prev[1], prev[2], x, y, z, B.crag, 3.2 - Math.sin(t * Math.PI));
          prev = [x, y, z];
        }
        for (let k = 0; k < 20; k++) {
          const t = w.r(0.2, 0.8), x = Math.round(ax + (bx - ax) * t), z = Math.round(az + (bz - az) * t);
          const y = Math.round(ga + (gb - ga) * t + Math.sin(t * Math.PI) * lift) - 3, L = w.ri(2, 9);
          for (let q = 0; q < L; q++) w.fill(x, y - q, z, q > L - 2 ? B.rockDk : B.crag);
        }
      };
      arch(s(26), s(54), s(58), s(100), 13 * K); arch(s(104), s(50), s(80), s(110), 15 * K);

      // ── 감시자의 눈(북쪽 절벽): 평소엔 눈꺼풀이 닫혀 있다 ──
      const EX = s(64), EY = base + 20, EZ = s(30), ER = 10;
      for (let z = s(12); z <= s(36); z++) for (let x = s(42); x <= s(86); x++) {
        const xo = x / K, zo = z / K, g = MH.g(w, x, z);
        const peak = base + K * (32 - Math.abs(xo - 64) * 0.3 - Math.max(0, zo - 30) * 2.4 + n.fbm(xo * 0.16, zo * 0.16) * 4);
        for (let y = g + 1; y <= peak; y++) w.set(x, y, z, hash3(x, y, z) > 0.7 ? B.cragHi : B.crag);
        if (peak > g) w.hm[x + W * z] = Math.round(peak);
      }
      w.ellipsoid(EX, EY, EZ, 14, 12, 10, 0, (dx, dy, dz) => dz >= -1);
      w.ellipsoid(EX, EY + 4, EZ + 8, 15, 14, 9, 0, (dx, dy, dz) => dz >= -2 && dy >= 0);   // 눈두덩을 깎아 위에서도 눈꺼풀이 보이게
      w.sphere(EX, EY, EZ, ER, B.eyeW, (dx, dy, dz) => dz >= -4);
      for (let dy = -7; dy <= 7; dy++) for (let dx = -7; dx <= 7; dx++) {
        const d = Math.hypot(dx, dy);
        if (d > 6.2) continue;
        let z = EZ + ER + 1;
        while (z > EZ && !w.get(EX + dx, EY + dy, z)) z--;
        w.set(EX + dx, EY + dy, z, d > 5.4 ? B.tentDk : d > 3.8 ? B.iris : B.iris2);
      }
      // 눈 둘레에 박힌 룬 고리와 핏줄처럼 뻗은 촉수 결
      const faceSet = (x, y, b) => { x = Math.round(x); y = Math.round(y); let z = EZ + 24; while (z > EZ - 4 && !w.get(x, y, z)) z--; if (z > EZ - 4) w.set(x, y, z, b); };
      for (let a = 0.25; a < Math.PI - 0.2; a += 0.09) faceSet(EX + Math.cos(a) * (ER + 6), EY + Math.sin(a) * (ER + 5), hash3(Math.round(a * 50), 3, 1) > 0.3 ? B.rune : B.paleDk);
      for (let k = 0; k < 9; k++) {
        const a0 = -0.3 + k * 0.46;
        for (let r = ER + 8; r < ER + 20; r += 0.6) faceSet(EX + Math.cos(a0 + Math.sin(r * 0.4) * 0.12) * r, EY + Math.sin(a0) * r * 0.8, r > ER + 15 ? B.tentDk : B.tent);
      }
      const pupil = w.prop({ name: 'pupil', pivot: [EX + 0.5, EY + 0.5, EZ + ER] });
      for (let dy = -5; dy <= 5; dy++) for (const dx of (Math.abs(dy) <= 3 ? [-1, 0, 1] : [0])) {
        let z = EZ; while (w.get(EX + dx, EY + dy, z)) z++;
        pupil.set(EX + dx, EY + dy, z, B.pupil);
      }
      // 눈꺼풀: 위아래 두 쪽이 눈알 앞을 다 덮은 채로 쉰다
      const lidU = w.prop({ name: 'lidU', pivot: [EX + 0.5, EY + 0.5, EZ + 0.5], axis: 'x' });
      const lidD = w.prop({ name: 'lidD', pivot: [EX + 0.5, EY + 0.5, EZ + 0.5], axis: 'x' });
      const RL = 13.4;
      lidU.ellipsoid(EX, EY, EZ, RL, RL, RL, B.crag, (dx, dy, dz, d) => dy >= 0 && dz >= -1 && d > 0.8 && !w.get(EX + dx, EY + dy, EZ + dz));
      lidD.ellipsoid(EX, EY, EZ, RL, RL, RL, B.cragHi, (dx, dy, dz, d) => dy < 0 && dz >= -1 && d > 0.8 && !w.get(EX + dx, EY + dy, EZ + dz));
      for (let dx = -12; dx <= 12; dx++) { const z = EZ + Math.round(Math.sqrt(Math.max(0, RL * RL - dx * dx))); if (!w.get(EX + dx, EY, z)) lidU.set(EX + dx, EY, z, B.paleDk); if (!w.get(EX + dx, EY - 1, z)) lidD.set(EX + dx, EY - 1, z, Math.abs(dx) < 9 ? B.iris : B.paleDk); }   // 맞닿는 눈꺼풀 테
      lights.push({ name: 'eye', p: [EX + 0.5, EY, EZ + ER + 4], c: '#b070ff', i: 1.3, d: 32, flicker: 0.05 });
      acts.push({
        name: '감시자의 눈', hint: '닫힌 눈꺼풀이 열리고 눈동자가 왼쪽, 오른쪽을 살핀 뒤 다시 감겨요', hit: [EX - 13, EY - 13, EZ, EX + 13, EY + 13, EZ + 15],
        run: async a => {
          a.flash('eye', 4, 5.4);
          await Promise.all([a.tween('lidU', { rot: [-0.75, 0, 0], off: [0, 3, 4] }, 0.9), a.tween('lidD', { rot: [0.7, 0, 0], off: [0, -3, 4] }, 0.9)]);
          a.burst([EX + 0.5, EY, EZ + ER + 3], { n: 50, colors: ['#d8a8ff', '#9a48ff', '#ffffff'], speed: 6, up: 1, life: 1.6, gravity: 0, spread: 5 });
          await a.wait(0.3);
          await a.move('pupil', [-4, 0, 0], 0.6); await a.wait(0.5);
          await a.move('pupil', [4, 0.5, 0], 1.0); await a.wait(0.5);
          await a.move('pupil', [0, 0, 0], 0.5); await a.wait(0.4);
          await Promise.all([a.tween('lidU', { rot: [0, 0, 0], off: [0, 0, 0] }, 0.6), a.tween('lidD', { rot: [0, 0, 0], off: [0, 0, 0] }, 0.6)]);
          a.burst([EX + 0.5, EY, EZ + RL + 1], { n: 30, colors: ['#4a3282', '#9a48ff'], speed: 4, up: 0.5, life: 1, gravity: 0, spread: 6, flat: true });
        },
      });
      landmarks.push({ name: '감시자의 눈', note: '중간 보스 · 심연의 감시자', p: [EX + 0.5, EY + 23, EZ + 5], mid: true });

      // ── 심연의 촉수(부품): 수면에서 솟는다 ──
      [[0.5, 24, 8], [2.1, 30, 7], [3.6, 22, 8], [5.0, 27, 7]].forEach(([a0, hgt, reach], k) => {
        const rx = CX + Math.cos(a0) * 6, rz = CZ + Math.sin(a0) * 6;
        const p = w.prop({ name: 't' + k, pivot: [rx, WL + 1, rz], axis: k % 2 ? 'x' : 'z', rock: 0.07, rockSpeed: 0.6 + k * 0.15, phase: k, clipOK: 15 });
        let prev = null;
        for (let t = 0; t <= 1.0001; t += 0.012) {
          const a = a0 + Math.sin(t * 4 + k) * 0.35;
          const rr = 6 + Math.sin(t * Math.PI * 0.9) * reach * K;
          const x = CX + Math.cos(a) * rr, z = CZ + Math.sin(a) * rr, y = WL + 2 + Math.sin(t * Math.PI * 0.8) * hgt * K + t * 6;
          const th = (2.8 - t * 2.2) * K;
          if (prev) p.line(prev[0], prev[1], prev[2], x, y, z, t > 0.75 ? B.tentDk : B.tent, Math.max(0.5, th));
          if (t > 0.08 && t < 0.85 && Math.round(t * 80) % 3 === 0) p.set(Math.round(x), Math.round(y + th), Math.round(z), B.sucker);
          prev = [x, y, z];
        }
      });
      acts.push({
        name: '심연의 촉수', hint: '심연 속에서 촉수가 요동쳐요', hit: [CX - 15, WL + 1, CZ - 15, CX + 15, WL + 25, CZ + 15],
        run: async a => {
          a.flash('void', 2.5, 3);
          ['t0', 't1', 't2', 't3'].forEach(t => a.spin(t, 5, 3));
          for (let k = 0; k < 4; k++) { a.burst([CX, WL + 3, CZ], { n: 50, colors: ['#c29aff', '#f0a0e0', '#2a1a4c'], speed: 10, up: 8, life: 2.2, gravity: 3, spread: 10 }); await a.wait(0.6); }
        },
      });
      landmarks.push({ name: '심연의 구멍', note: '보스 · 이름 없는 것', p: [CX + 0.5, base + 10, CZ + 0.5], boss: true });

      // ── 나선 계단과 등불 기둥 ──
      const SR = PIT + 3.25, sx0 = Math.round(CX + Math.cos(2.2) * SR), sz0 = Math.round(CZ + Math.sin(2.2) * SR);
      const sy0 = MH.g(w, sx0, sz0);
      for (let i = 0; i < 420; i++) {
        const a = i * 0.044 + 2.2, r = PIT + 2, y = sy0 - Math.floor(i * 0.075);
        if (y <= WL + 1) break;
        for (const rr of [r, r + 1, r + 2, r + 3]) { const px = Math.round(CX + Math.cos(a) * rr), pz = Math.round(CZ + Math.sin(a) * rr); MH.footing(w, px, pz, px, pz, y, B.paleDk); w.set(px, y, pz, rr === r + 3 ? B.paleDk : B.pale); for (let q = 1; q <= 5; q++) w.set(px, y + q, pz, 0); }
        { const px = Math.round(CX + Math.cos(a) * (r - 1)), pz = Math.round(CZ + Math.sin(a) * (r - 1)); MH.footing(w, px, pz, px, pz, y, B.paleDk); w.set(px, y, pz, B.paleDk); w.set(px, y + 1, pz, i % 7 === 0 ? B.paleTr : B.chain); if (i % 7 === 0) w.set(px, y + 2, pz, B.bone); }
        if (i % 22 === 0) { const px = Math.round(CX + Math.cos(a) * (r + 4)), pz = Math.round(CZ + Math.sin(a) * (r + 4)); w.box(px, y, pz, px, y + 6, pz, B.pale); w.set(px, y + 7, pz, B.paleTr); w.set(px, y + 8, pz, B.rune); w.set(px, y, pz, B.paleDk); }
      }
      // ── 잊힌 제단(서쪽 단) ──
      const RX = s(30), RZ = s(88), rg = MH.g(w, RX, RZ);
      MH.flatten(w, RX - 11, RZ - 10, RX + 11, RZ + 10, rg, B.pale, B.paleDk);
      MH.retain(w, RX - 11, RZ - 10, RX + 11, RZ + 10, B.paleDk, B.paleTr);
      for (let z = RZ - 10; z <= RZ + 10; z++) for (let x = RX - 11; x <= RX + 11; x++) if ((x + z) % 2 === 0) MH.paint(w, x, z, B.paleDk);
      for (const [ox, oz, h] of [[-9, -8, 19], [8, -8, 11], [-9, 6, 14], [8, 6, 20], [-1, -9, 6]]) {
        const px = RX + ox, pz = RZ + oz;
        w.box(px, rg + 1, pz, px + 1, rg + h, pz + 1, B.pale); w.box(px - 1, rg + 1, pz - 1, px + 2, rg + 2, pz + 2, B.paleDk); w.box(px - 1, rg + 3, pz - 1, px + 2, rg + 3, pz + 2, B.paleTr);
        for (let y = rg + 6; y < rg + h; y += 5) { w.set(px, y, pz - 1, B.paleDk); w.set(px + 1, y, pz + 2, B.paleDk); w.set(px - 1, y, pz + 1, B.paleDk); w.set(px + 2, y, pz, B.paleDk); }
        if (h > 16) { w.box(px - 1, rg + h + 1, pz - 1, px + 2, rg + h + 1, pz + 2, B.paleDk); w.box(px - 1, rg + h, pz - 1, px + 2, rg + h, pz + 2, B.paleTr); w.set(px, rg + h + 2, pz, B.rune); }
        else { w.set(px + 1, rg + h, pz, 0); w.set(px, rg + h, pz + 1, 0); const fx = px + (ox < 0 ? 3 : -3), fz = pz + 2; if (!w.get(fx, rg + 1, fz)) { w.box(fx, rg + 1, fz, fx + 1, rg + 2, fz, B.pale); w.set(fx + 2, rg + 1, fz, B.paleDk); } }
      }
      w.box(RX - 2, rg + 21, RZ + 6, RX + 10, rg + 21, RZ + 7, B.paleDk); w.box(RX - 2, rg + 22, RZ + 6, RX + 10, rg + 22, RZ + 6, B.paleTr);
      for (let x = RX - 2; x <= RX + 1; x++) w.set(x, rg + 20, RZ + 7, B.chain);
      MH.circle(w, RX, RZ, 5, B.rune); MH.circle(w, RX, RZ, 3, B.rune);
      for (let k = 0; k < 8; k++) { const t = k / 8 * Math.PI * 2; MH.paint(w, Math.round(RX + Math.cos(t) * 4), Math.round(RZ + Math.sin(t) * 4), B.rune); }
      w.box(RX - 2, rg + 1, RZ - 2, RX + 2, rg + 1, RZ + 2, B.paleDk); w.box(RX - 1, rg + 2, RZ - 1, RX + 1, rg + 3, RZ + 1, B.pale); w.box(RX - 1, rg + 3, RZ - 1, RX + 1, rg + 3, RZ + 1, B.paleTr);
      for (let k = 0; k < 6; k++) { const t = k / 6 * Math.PI * 2 + 0.3, x = Math.round(RX + Math.cos(t) * 7), z = Math.round(RZ + Math.sin(t) * 7); w.box(x, rg + 1, z, x, rg + 1 + (k % 2), z, B.bone); w.set(x, rg + 2 + (k % 2), z, B.candle); }
      // 제단 위 수정(부품): 의식 때 떠올라 돈다
      const orb = w.prop({ name: 'orb', pivot: [RX + 0.5, rg + 6, RZ + 0.5] });
      orb.box(RX, rg + 4, RZ, RX, rg + 8, RZ, B.crys); orb.box(RX - 2, rg + 6, RZ, RX + 2, rg + 6, RZ, B.crys); orb.box(RX, rg + 6, RZ - 2, RX, rg + 6, RZ + 2, B.iris2);
      orb.box(RX - 1, rg + 5, RZ, RX + 1, rg + 7, RZ, B.crys); orb.box(RX, rg + 5, RZ - 1, RX, rg + 7, RZ + 1, B.crys2);
      lights.push({ name: 'altar', p: [RX + 0.5, rg + 6, RZ + 0.5], c: '#8a70ff', i: 1, d: 18, flicker: 0.1 });
      landmarks.push({ name: '잊힌 제단', note: '그림자 · 눈먼 추적자 출몰', p: [RX + 0.5, rg + 27, RZ + 0.5] });
      // ── 쇠사슬 다리 ──
      const b0 = [CX - 32, CZ + 8], b1 = [CX - 10, CZ + 18], y0 = MH.g(w, b0[0], b0[1]), y1 = MH.g(w, b1[0], b1[1]);
      let bi = 0;
      for (let t = 0; t <= 1.0001; t += 0.02, bi++) {
        const x = Math.round(b0[0] + (b1[0] - b0[0]) * t), z = Math.round(b0[1] + (b1[1] - b0[1]) * t), y = Math.round(MH.lerp(y0, y1, t) - Math.sin(t * Math.PI) * 4);
        for (const dz of [0, 1, 2, 3]) w.set(x, y, z + dz, (x + dz) % 3 ? B.paleDk : B.pale);
        w.set(x, y + 2, z - 1, B.chain); w.set(x, y + 2, z + 4, B.chain);
        if (bi % 8 === 0) for (const zz of [z - 1, z + 4]) { w.set(x, y, zz, B.paleDk); w.box(x, y + 1, zz, x, y + 3, zz, B.pale); w.set(x, y + 4, zz, B.bone); }
      }
      // ── 남쪽 가장자리에서 나선 계단 꼭대기까지 테라스를 가로질러 내려가는 옛 돌계단 ──
      const onStair = (x, z) => Math.abs(x - sx0) < 8 && z > sz0 - 3;
      MH.flight(w, { name: '심연 돌계단', axis: 'z', c: sx0, half: 3, a: s(125), b: sz0 + 1, ha: MH.g(w, sx0, s(125)), hb: sy0, step: B.pale, edge: B.paleDk, fill: B.crag, rail: B.paleDk, post: B.pale, postGap: 7,
        onPost: (x, y, z, k) => { w.set(x, y, z, B.rune); if (k % 14 === 7 && x > sx0) lights.push({ p: [x + 0.5, y + 1, z + 0.5], c: '#8a70ff', i: 0.8, d: 14, flicker: 0.1 }); } });

      // ── 가라앉은 납골당(새 구역): 북서쪽 벼랑을 깎아 만든 뼈의 전당 ──
      const QL = MH.g(w, Math.round(QXC), 54);
      MH.flatten(w, QX0, QZ + 1, QX1, QZ1, QL, B.pale, B.paleDk);
      MH.retain(w, QX0, QZ + 1, QX1, QZ1, B.paleDk, B.paleTr);
      for (let z = QZ + 1; z <= QZ1; z++) for (let x = QX0; x <= QX1; x++) {
        const mid = Math.abs(x - QXC) < 4;
        MH.paint(w, x, z, mid ? ((z % 3) ? B.paleDk : B.paleTr) : (hash3(x, 7, z) > 0.8 ? B.rock : ((x >> 1) + (z >> 1)) % 2 ? B.pale : B.paleDk));
      }
      // 뒤로 벼랑과 이어지는 바위 덩어리
      for (let z = 30; z < QZ; z++) for (let x = QX0 - 2; x <= QX1 + 2; x++) {
        const top = QL + 26 + Math.round(n.fbm(x * 0.2, z * 0.2) * 6) - Math.max(0, Math.abs(x - QXC) - 14);
        for (let y = QL - 3; y <= top; y++) if (!w.get(x, y, z)) w.set(x, y, z, hash3(x, y, z) > 0.75 ? B.cragHi : B.crag);
        if (top > MH.g(w, x, z)) w.hm[x + W * z] = top;
      }
      // 앞면 벽과 계단식 기단
      w.box(QX0, QL - 2, QZ - 3, QX1, QL + 19, QZ, B.pale);
      w.box(QX0 - 1, QL + 1, QZ + 1, QX1 + 1, QL + 1, QZ + 2, B.paleDk); w.box(QX0 - 1, QL + 1, QZ + 3, QX1 + 1, QL + 1, QZ + 3, B.paleTr);
      for (let y = QL + 4; y <= QL + 18; y += 4) w.box(QX0, y, QZ, QX1, y, QZ, B.paleDk);
      // 기둥 여섯(문 양옆 포함)
      for (const px of [18, 23, 28, 42, 47, 52]) {
        w.box(px, QL + 2, QZ + 1, px + 1, QL + 18, QZ + 1, B.paleTr);
        w.box(px - 1, QL + 2, QZ + 1, px + 2, QL + 3, QZ + 2, B.paleDk);
        w.box(px - 1, QL + 17, QZ + 1, px + 2, QL + 18, QZ + 2, B.paleDk);
        w.set(px, QL + 10, QZ + 2, B.bone); w.set(px + 1, QL + 10, QZ + 2, B.bone);
      }
      // 처마돌과 박공
      w.box(QX0 - 1, QL + 19, QZ - 2, QX1 + 1, QL + 19, QZ + 2, B.paleDk); w.box(QX0 - 1, QL + 20, QZ - 1, QX1 + 1, QL + 20, QZ + 1, B.paleTr);
      for (let k = 0; k < 9; k++) {
        const x0 = QX0 + k * 2, x1 = QX1 - k * 2;
        w.box(x0, QL + 21 + k, QZ - 2, x1, QL + 21 + k, QZ, B.pale);
        w.set(x0, QL + 21 + k, QZ + 1, B.paleDk); w.set(x1, QL + 21 + k, QZ + 1, B.paleDk); w.set(x0 + 1, QL + 21 + k, QZ + 1, B.paleDk); w.set(x1 - 1, QL + 21 + k, QZ + 1, B.paleDk);
      }
      for (let a = 0; a < Math.PI * 2; a += 0.3) w.set(Math.round(QXC + Math.cos(a) * 3.2), QL + 25 + Math.round(Math.sin(a) * 2.2), QZ + 1, B.rune);
      w.box(35, QL + 25, QZ + 1, 36, QL + 25, QZ + 1, B.iris);
      // 해골 벽감 두 줄
      const niches = [];
      for (const ny of [QL + 5, QL + 12]) for (const nx of [21, 26, 45, 50]) {
        w.box(nx - 1, ny, QZ - 1, nx + 1, ny + 3, QZ, 0); w.box(nx - 1, ny, QZ - 2, nx + 1, ny + 3, QZ - 2, B.rockDk);
        w.box(nx - 1, ny - 1, QZ, nx + 1, ny - 1, QZ + 1, B.paleDk); w.set(nx - 2, ny + 3, QZ, B.paleDk); w.set(nx + 2, ny + 3, QZ, B.paleDk);
        w.box(nx - 1, ny, QZ - 1, nx + 1, ny + 1, QZ - 1, B.bone); w.set(nx - 1, ny + 1, QZ - 1, B.rune); w.set(nx + 1, ny + 1, QZ - 1, B.rune); w.set(nx, ny, QZ - 1, B.boneDk);
        w.set(nx - 1, ny, QZ, B.boneDk); w.set(nx + 1, ny, QZ, B.bone);
        niches.push([nx, ny]);
      }
      // 문간: 뾰족 아치, 안쪽 어둠
      const DX0 = 32, DX1 = 39;
      const opening = (x, y) => y <= QL + 10 || (y === QL + 11 && x > DX0 && x < DX1) || (y === QL + 12 && x > DX0 + 1 && x < DX1 - 1);
      for (let y = QL + 1; y <= QL + 12; y++) for (let x = DX0; x <= DX1; x++) if (opening(x, y)) for (let z = QZ - 6; z <= QZ; z++) w.set(x, y, z, 0);
      w.box(DX0, QL + 1, QZ - 7, DX1, QL + 12, QZ - 7, B.rockDk); w.box(DX0 + 3, QL + 5, QZ - 7, DX1 - 3, QL + 7, QZ - 7, B.rune);
      for (let y = QL + 1; y <= QL + 13; y++) { w.set(DX0 - 1, y, QZ + 1, B.paleDk); w.set(DX1 + 1, y, QZ + 1, B.paleDk); }
      w.box(DX0, QL + 13, QZ + 1, DX1, QL + 14, QZ + 1, B.paleDk); w.box(DX0 + 3, QL + 15, QZ + 1, DX1 - 3, QL + 15, QZ + 1, B.bone);
      const doorL = w.prop({ name: 'qdoorL', pivot: [DX0, QL + 1, QZ + 1] }), doorR = w.prop({ name: 'qdoorR', pivot: [DX1 + 1, QL + 1, QZ + 1] });
      for (let y = QL + 1; y <= QL + 12; y++) for (let x = DX0; x <= DX1; x++) if (opening(x, y)) {
        const left = x <= 35, edge = x === DX0 || x === DX1 || x === 35 || x === 36;
        (left ? doorL : doorR).set(x, y, QZ, (y - QL) % 4 === 0 || edge ? B.paleDk : ((x === 34 || x === 37) && (y === QL + 6 || y === QL + 7) ? B.rune : B.pale));
      }
      lights.push({ name: 'qdoor', p: [QXC, QL + 6, QZ - 3], c: '#a080ff', i: 0.5, d: 18, flicker: 0.2 });
      lights.push({ name: 'niche', p: [QXC, QL + 11, QZ + 4], c: '#8a70ff', i: 0.6, d: 26, flicker: 0.15 });
      // 앞뜰: 부서진 석관, 뼈 더미, 촛대
      for (const [cx, cz, open] of [[22, 52, 1], [22, 57, 0], [49, 58, 1]]) {
        w.box(cx - 1, QL + 1, cz - 1, cx + 3, QL + 2, cz + 1, B.paleDk); w.box(cx, QL + 2, cz, cx + 2, QL + 2, cz, open ? B.rockDk : B.pale);
        if (open) { w.box(cx - 1, QL + 1, cz + 2, cx + 3, QL + 1, cz + 2, B.pale); w.set(cx + 4, QL + 1, cz + 2, B.paleTr); w.set(cx + 1, QL + 3, cz, B.bone); }
        else w.box(cx - 1, QL + 3, cz - 1, cx + 3, QL + 3, cz + 1, B.paleTr);
      }
      for (const [bx, bz, r] of [[28, 58, 2.6], [43, 51, 2.2], [52, 49, 1.8]]) {
        MH.cone(w, bx, bz, QL + 1, r, B.bone, 0.9);
        for (let k = 0; k < 6; k++) { const x = bx + w.ri(-3, 3), z = bz + w.ri(-3, 3), g = MH.g(w, x, z); if (!w.get(x, g + 1, z) && g === QL) w.set(x, g + 1, z, k % 2 ? B.boneDk : B.bone); }
      }
      for (const [cx, cz] of [[30, 47], [41, 47], [25, 49], [46, 49], [33, 59], [38, 59]]) { w.box(cx, QL + 1, cz, cx, QL + 2, cz, B.paleDk); w.set(cx, QL + 3, cz, B.bone); w.set(cx, QL + 4, cz, B.candle); }
      // 뼈 종루와 매달린 뼈 종(부품)
      const BX = 49, BZ = 53;
      for (const px of [BX - 4, BX + 4]) { w.box(px, QL + 1, BZ, px, QL + 15, BZ, B.pale); w.box(px - 1, QL + 1, BZ - 1, px + 1, QL + 2, BZ + 1, B.paleDk); }
      w.box(BX - 5, QL + 16, BZ, BX + 5, QL + 16, BZ, B.paleDk); w.box(BX - 4, QL + 17, BZ, BX + 4, QL + 17, BZ, B.bone);
      w.set(BX - 5, QL + 17, BZ, B.bone); w.set(BX + 5, QL + 17, BZ, B.bone); w.set(BX, QL + 18, BZ, B.rune);
      const bell = w.prop({ name: 'bell', pivot: [BX + 0.5, QL + 16, BZ + 0.5], axis: 'z' });
      bell.box(BX, QL + 14, BZ, BX, QL + 15, BZ, B.chain);
      for (let k = 0; k < 6; k++) bell.cyl(BX, BZ, QL + 13 - k, QL + 13 - k, 0.8 + k * 0.45, k === 5 ? B.boneDk : B.bone);
      bell.box(BX, QL + 8, BZ, BX, QL + 9, BZ, B.crys);
      lights.push({ name: 'bell', p: [BX + 0.5, QL + 10, BZ + 0.5], c: '#c8a8ff', i: 0.5, d: 20, flicker: 0.1 });
      landmarks.push({ name: '가라앉은 납골당', note: '새 구역 · 납골당 파수꾼의 거처', p: [QXC, QL + 36, QZ + 1] });
      landmarks.push({ name: '뼈 종루', note: '종이 울리면 그림자가 깨어난다', p: [BX + 0.5, QL + 24, BZ + 0.5] });
      acts.push({
        name: '납골당 석문', hint: '납골당의 두 석문이 바깥으로 열리며 안에서 보랏빛 넋들이 흘러나와요', hit: [DX0, QL + 1, QZ - 1, DX1, QL + 12, QZ + 2],
        run: async a => {
          a.flash('qdoor', 6, 5);
          await Promise.all([a.turn('qdoorL', [0, -1.25, 0], 1.4), a.turn('qdoorR', [0, 1.25, 0], 1.4)]);
          for (let k = 0; k < 8; k++) { a.burst([QXC, QL + 4 + (k % 3), QZ - 2], { n: 22, colors: ['#c49aff', '#f0d8ff', '#6ae0ff'], speed: 2, up: 3, life: 2, gravity: -0.6, spread: 2 }); await a.wait(0.3); }
          await a.wait(0.6);
          await Promise.all([a.turn('qdoorL', [0, 0, 0], 1.1), a.turn('qdoorR', [0, 0, 0], 1.1)]);
          a.burst([QXC, QL + 1.5, QZ + 2], { n: 30, colors: ['#7a7490', '#c8c0d0'], speed: 4, up: 1, life: 1, gravity: 3, spread: 4, flat: true });
        },
      });
      acts.push({
        name: '해골 벽감', hint: '납골당 벽감의 해골들이 차례로 눈에 보랏빛 불을 밝혀요', hit: [QX0, QL + 4, QZ - 2, QX1, QL + 16, QZ + 1],
        run: async a => {
          a.flash('niche', 5, 4); a.glow(1.6, 4);
          for (const [nx, ny] of niches) { a.burst([nx + 0.5, ny + 1.5, QZ + 0.5], { n: 18, colors: ['#8a70ff', '#d8a8ff', '#ffffff'], speed: 1.5, up: 1, life: 1.4, gravity: -0.4, spread: 1 }); await a.wait(0.3); }
          await a.wait(1);
        },
      });
      acts.push({
        name: '뼈 종', hint: '종루의 뼈 종이 크게 흔들리며 울려 퍼지는 파동이 앞뜰을 쓸어요', hit: [BX - 4, QL + 7, BZ - 3, BX + 4, QL + 16, BZ + 3],
        run: async a => {
          a.flash('bell', 6, 4);
          for (let k = 0; k < 4; k++) {
            await a.turn('bell', [0, 0, k % 2 ? -0.6 : 0.6], 0.42);
            for (let q = 0; q < 14; q++) { const t = q / 14 * Math.PI * 2; a.burst([BX + 0.5 + Math.cos(t) * 2, QL + 9, BZ + 0.5 + Math.sin(t) * 2], { n: 3, colors: ['#c8a8ff', '#ffffff'], speed: 6, up: 0.3, life: 0.9, gravity: 0, spread: 0.3, flat: true }); }
          }
          await a.turn('bell', [0, 0, 0], 0.8);
        },
      });

      // ── 수정 군락 ──
      const crystals = [];
      for (let i = 0; i < 70; i++) {
        const a = w.r(0, Math.PI * 2), r = w.r(22 * K, 54 * K), x = Math.round(CX + Math.cos(a) * r), z = Math.round(CZ + Math.sin(a) * r);
        const g = MH.g(w, x, z);
        if (g < 0 || w.get(x, g + 1, z) || MH.dist(x, z, RX, RZ) < 15 || onStair(x, z) || inCrypt(x, z)) continue;
        const big = crystals.length < 9 && i % 3 === 0, c = i % 2 ? B.crys : B.crys2;
        for (let k = 0; k < (big ? 7 : 3); k++) {
          const aa = w.r(0, Math.PI * 2), tl = w.r(0.15, 0.5), l = w.r(big ? 6 : 2, big ? 14 : 5);
          w.line(x, g + 1, z, x + Math.cos(aa) * tl * l, g + 1 + l, z + Math.sin(aa) * tl * l, c, big && k === 0 ? 1.1 : 0);
        }
        if (big) { if (crystals.length < 6) lights.push({ name: 'crys', p: [x + 0.5, g + 5, z + 0.5], c: c === B.crys ? '#b48cff' : '#60d8ff', i: 1.2, d: 22, flicker: 0.05 }); crystals.push([x, g, z]); }
      }
      if (crystals.length) {
        const [qx, qg, qz] = crystals[0];
        acts.push({
          name: '수정 공명', hint: '수정들이 차례로 울리며 빛나요', hit: [qx - 5, qg, qz - 5, qx + 5, qg + 14, qz + 5],
          run: async a => {
            a.flash('crys', 4, 3.4); a.glow(1.9, 3.4);
            for (const [x, g, z] of crystals) { a.burst([x + 0.5, g + 7, z + 0.5], { n: 24, colors: ['#b98cff', '#6ae0ff', '#ffffff'], speed: 4, up: 3, life: 1.6, gravity: 0.5, spread: 2 }); await a.wait(0.25); }
          },
        });
        landmarks.push({ name: '울리는 수정 군락', note: '빛이 닿는 유일한 곳', p: [qx + 0.5, qg + 20, qz + 0.5] });
      }
      // 석순과 뼈
      for (let i = 0; i < 95; i++) {
        const x = w.ri(5, W - 6), z = w.ri(5, D - 6), g = MH.g(w, x, z);
        if (g < 0 || rOf(x, z) < PIT + 6 || w.get(x, g + 1, z) || MH.dist(x, z, RX, RZ) < 15 || onStair(x, z) || inCrypt(x, z)) continue;
        const h = w.ri(4, 16);
        MH.cone(w, x, z, g + 1, w.r(1.5, 3.5), B.crag, 3 / h);
      }
      MH.scatter(w, 320, (x, g, z) => { if (w.chance(0.3) && !inCrypt(x, z)) w.set(x, g + 1, z, w.chance(0.3) ? B.boneDk : B.bone); });
      const pset = (p, x, y, z, b) => { x = Math.round(x); y = Math.round(y); z = Math.round(z); if (!w.get(x, y, z)) p.set(x, y, z, b); };
      // ── 잊힌 제단의 의식: 수정이 떠올라 돌고 바닥 룬이 타오른다 ──
      acts.push({
        name: '잊힌 제단', hint: '제단 위 수정이 떠올라 빙글 돌고 바닥의 룬 고리가 타올라요', hit: [RX - 3, rg + 1, RZ - 3, RX + 3, rg + 9, RZ + 3],
        run: async a => {
          a.flash('altar', 5, 5); a.glow(1.8, 5);
          await a.move('orb', [0, 7, 0], 1.4);
          const whirl = a.turn('orb', [0, Math.PI * 4, 0], 3);
          for (let k = 0; k < 6; k++) {
            for (let q = 0; q < 12; q++) { const t = q / 12 * Math.PI * 2 + k * 0.3; a.burst([RX + 0.5 + Math.cos(t) * 5, rg + 1.5, RZ + 0.5 + Math.sin(t) * 5], { n: 4, colors: ['#8a70ff', '#d8a8ff'], speed: 0.6, up: 4, life: 1, gravity: -0.5, spread: 0.3 }); }
            a.burst([RX + 0.5, rg + 13, RZ + 0.5], { n: 20, colors: ['#b98cff', '#ffffff'], speed: 3, up: 6, life: 1.2, gravity: -1, spread: 0.6 });
            await a.wait(0.5);
          }
          await whirl; a.unwind('orb');
          await a.tween('orb', { off: [0, 0, 0], rot: [0, 0, 0] }, 1.2);
        },
      });

      // ── 아치에 매달린 쇠우리(부품): 사슬이 풀리며 심연 쪽으로 덜컹 내려앉는다 ──
      const KX = s(92), KZ = s(80);
      let ky = Math.min(w.H - 2, MH.g(w, s(104), s(50)) + 38);
      while (ky > 0 && !w.get(KX, ky, KZ)) ky--;
      while (ky > 0 && w.get(KX, ky, KZ)) ky--;
      const kg = MH.g(w, KX, KZ);
      if (ky - kg > 15) {
        const chain = w.prop({ name: 'kchain', pivot: [KX + 0.5, ky + 1, KZ + 0.5] });
        for (let y = ky - 4; y <= ky; y++) pset(chain, KX, y, KZ, B.chain);
        const kage = w.prop({ name: 'kage', pivot: [KX + 0.5, ky + 1, KZ + 0.5], axis: 'x', rock: 0.05, rockSpeed: 0.7 });
        const cy = ky - 5;
        for (let y = cy - 7; y <= cy; y++) for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) {
          const ex = Math.abs(dx) === 2, ez = Math.abs(dz) === 2, cap = y === cy || y === cy - 7, band = y === cy - 4;
          if ((cap && (ex || ez || (dx + dz) % 2 === 0)) || (ex && ez) || ((ex || ez) && (dx === 0 || dz === 0)) || (band && (ex || ez))) pset(kage, KX + dx, y, KZ + dz, B.chain);
        }
        pset(kage, KX, cy + 1, KZ, B.chain);
        pset(kage, KX, cy - 6, KZ, B.crys2); pset(kage, KX - 1, cy - 6, KZ, B.bone); pset(kage, KX + 1, cy - 6, KZ + 1, B.boneDk); pset(kage, KX, cy - 5, KZ + 1, B.bone);
        lights.push({ name: 'kage', p: [KX + 0.5, cy - 5, KZ + 0.5], c: '#60d8ff', i: 0.6, d: 16, flicker: 0.2 });
        acts.push({
          name: '매달린 쇠우리', hint: '바위 아치에 매달린 쇠우리가 덜컹 내려앉았다가 크게 흔들려요', hit: [KX - 3, cy - 8, KZ - 3, KX + 3, ky, KZ + 3],
          run: async a => {
            a.flash('kage', 4, 4);
            await Promise.all([a.move('kage', [0, -7, 0], 0.5, t => t * t), a.rope('kchain', 5, 12, 0.5, t => t * t)]);
            a.burst([KX + 0.5, cy - 12, KZ + 0.5], { n: 40, colors: ['#6ae0ff', '#c8c0d0', '#2a2a34'], speed: 6, up: 2, life: 1.4, gravity: 3, spread: 2 });
            for (let k = 0; k < 3; k++) { await a.turn('kage', [0.35, 0, 0.2], 0.45); await a.turn('kage', [-0.35, 0, -0.2], 0.45); }
            await a.turn('kage', [0, 0, 0], 0.4);
            await Promise.all([a.move('kage', [0, 0, 0], 2), a.rope('kchain', 5, 5, 2)]);
          },
        });
      }

      // ── 수정 가시(부품, 평소엔 숨김): 테라스 곳곳에서 수정이 솟구친다 ──
      const spikes = [];
      for (let k = 0; k < 16 && spikes.length < 6; k++) {
        const ang = 0.15 + k * 0.11, rr = 26 * K + (k % 3) * 6, x = Math.round(CX + Math.cos(ang) * rr), z = Math.round(CZ + Math.sin(ang) * rr), g = MH.g(w, x, z);
        let free = g > 0;
        for (let y = g + 1; y <= g + 11 && free; y++) for (let d = -1; d <= 1; d++) if (w.get(x + d, y, z) || w.get(x, y, z + d)) free = false;
        if (!free || spikes.some(([sx, , sz]) => Math.hypot(sx - x, sz - z) < 6)) continue;
        const nm = 'spike' + spikes.length, p = w.prop({ name: nm, pivot: [x + 0.5, g + 1, z + 0.5], scl0: [0, 0, 0] });
        const h = 9 + (k % 3);
        for (let y = g + 1; y <= g + h; y++) { pset(p, x, y, z, y > g + h - 2 ? B.iris2 : B.crys); if (y < g + h - 3) { pset(p, x + 1, y, z, B.crys); pset(p, x, y, z + 1, B.crys2); } if (y < g + h - 6) pset(p, x + 1, y, z + 1, B.crys); }
        pset(p, x - 1, g + 1, z, B.crys2); pset(p, x - 1, g + 2, z, B.crys2); pset(p, x - 1, g + 3, z, B.iris2); pset(p, x, g + 1, z - 1, B.crys);
        spikes.push([x, g, z, nm]);
      }
      if (spikes.length) acts.push({
        name: '수정 가시', hint: '테라스 바닥을 뚫고 수정 가시가 차례로 솟구쳤다가 가라앉아요', hit: [spikes[0][0] - 2, spikes[0][1], spikes[0][2] - 2, spikes[0][0] + 2, spikes[0][1] + 11, spikes[0][2] + 2],
        run: async a => {
          a.glow(1.7, 4);
          for (const [x, g, z, nm] of spikes) {
            a.burst([x + 0.5, g + 1.5, z + 0.5], { n: 26, colors: ['#4d4663', '#b98cff', '#6ae0ff'], speed: 5, up: 3, life: 1.2, gravity: 4, spread: 1.5 });
            a.tween(nm, { scl: [1, 1, 1] }, 0.25, t => 1 - (1 - t) * (1 - t));
            await a.wait(0.3);
          }
          await a.wait(1.6);
          await Promise.all(spikes.map(([, , , nm]) => a.tween(nm, { scl: [0, 0, 0] }, 0.8)));
        },
      });

      // ── 심연의 소용돌이: 웅덩이 위로 보랏빛 회오리가 솟는다 ──
      acts.push({
        name: '심연의 소용돌이', hint: '심연의 웅덩이에서 보랏빛 회오리가 휘감아 올라가요', hit: [CX - 10, WL + 1, CZ - 10, CX + 10, WL + 7, CZ + 10],
        run: async a => {
          a.flash('void', 3, 4.4); a.wind(4, 4.4);
          for (let k = 0; k < 40; k++) {
            const t = k * 0.55, r = 4 + k * 0.3, y = WL + 2 + k * 1.1;
            a.burst([CX + Math.cos(t) * r, y, CZ + Math.sin(t) * r], { n: 12, colors: ['#c29aff', '#8a6cff', '#f0d8ff'], speed: 1.5, up: 1, life: 1.4, gravity: -0.3, spread: 0.8 });
            await a.wait(0.1);
          }
          await a.wait(0.8);
        },
      });

      // ── 그림자 떼: 절벽 처마에서 그림자들이 날아올라 웅덩이로 빨려 든다 ──
      const shade = [];
      for (let k = 0; k < 16; k++) { const t = 0.2 + k * 0.1, r = 57 - (k % 4) * 2.5, x = Math.round(CX + Math.cos(t) * r), z = Math.round(CZ + Math.sin(t) * r); shade.push([x, MH.g(w, x, z), z]); }
      const [hx, hy, hz] = shade[6];
      acts.push({
        name: '그림자 떼', hint: '동굴 가장자리의 그림자들이 일제히 일어나 심연으로 빨려 들어가요', hit: [hx - 3, hy + 1, hz - 3, hx + 3, hy + 4, hz + 3],
        run: async a => {
          a.glow(0.5, 3.6);
          for (const [x, g, z] of shade) {
            a.burst([x + 0.5, g + 1.5, z + 0.5], { n: 18, colors: ['#07060e', '#231f2e', '#4a3282'], speed: 2, up: 3, life: 1.6, gravity: -0.5, spread: 1.5 });
            await a.wait(0.12);
          }
          for (let k = 0; k < 4; k++) { a.burst([CX, WL + 2, CZ], { n: 40, colors: ['#07060e', '#4a3282', '#c29aff'], speed: 6, up: 2, life: 1.4, gravity: 0, spread: 6 }); await a.wait(0.35); }
          a.flash('void', 4, 1.4); await a.wait(1);
        },
      });
      // 눈꺼풀 자리에 나중에 놓인 석순·뼈는 치운다
      for (const pr of w.props || []) if (pr.o.name === 'lidU' || pr.o.name === 'lidD') for (const [i] of pr.w.data) w.set(i % W, Math.floor(i / (W * D)), Math.floor(i / W) % D, 0);
      return { lights, landmarks, acts };
    },
  });
})();
