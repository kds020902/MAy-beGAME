// 심연의 동굴 — 계단식 동굴 싱크홀, 절벽의 눈, 심연의 촉수, 북서쪽 벼랑에 새긴 가라앉은 납골당 (320칸, 2배 해상도: 1칸 ≈ 25cm)
// 노이즈로 굽이치는 테라스 가장자리와 무너진 돌 비탈, 물결치는 지층 띠, 처마 바위와 종유석, 눈꺼풀·속눈썹·핏줄이 있는 감시자의 눈,
// 기둥 주춧돌·주두·벽감 해골·뾰족 아치 석문이 있는 납골당, 남동쪽 천장 바위에 갈라진 틈(무쇠골 오리하르콘 광산으로 이어짐)과 늘어진 줄사다리.
// playerScale 2 (사람 키 6.8칸).
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 320, D = 320, Hh = 256, K = 2.5;   // K: 원래 128칸 지도 좌표 → 이 지도
  const s = v => Math.round(v * K);
  // 광산에서 떨어져 내려오는 자리(천장 틈 바로 아래, 착지할 돌무더기 위 40칸 공중)
  const LX = 246, LZ = 252;
  MAPS.push({
    id: 'abyss', cat: 'dungeon', name: '심연의 동굴', en: 'Abyssal Hollow', color: '#8a6cc9', seed: 53, base: 64, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    arrive: { 'ironhollow-orichalcum': [LX, 105, LZ] },
    desc: '빛이 닿지 않는 지하. 이곳에서 오래 머문 자는 스스로를 잊는다. 북서쪽 벼랑에는 심연에 삼켜진 자들의 뼈를 모신 납골당이 반쯤 묻힌 채 남아, 뼈 종이 울릴 때마다 벽감의 해골들이 눈을 뜬다. 남동쪽 천장의 갈라진 틈은 무쇠골 오리하르콘 광산의 바닥으로 이어진다.',
    info: { title: '장소 정보', en: 'ABYSSAL HOLLOW', rows: [['생김새', '계단식 테라스가 둘러싼 심연의 웅덩이'], ['명소', '감시자의 눈 · 잊힌 제단 · 가라앉은 납골당'], ['주의', '뼈 종이 울리면 그림자가 깨어남']] },
    monsters: { normal: ['눈먼 추적자', '동굴 촉수', '그림자', '납골당 파수꾼'], mid: '심연의 감시자', boss: '이름 없는 것' },
    sky: ['#07060e', '#15102a', '#4a3282'], stars: true,
    hemi: ['#b0a0e0', '#1a1426', 0.74], sun: ['#c8b8ff', 0.6, [0.45, 1, 0.5]],
    day: { sky: ['#2a2440', '#4a4070', '#8a78c0'], stars: false, hemi: ['#d8d0f0', '#2a2438', 0.8], sun: ['#e8e0ff', 0.7, [0.45, 1, 0.5]], haze: '#4a3e6e' },
    liquid: ['#0c0818', '#2a1a4c', '#c29aff'], liqSpeed: 0.7, liqGlow: true,
    fog: { box: [160, 176, 160, 160], start: 0.7, floor: 8, depth: 20, haze: [56, 0.32, 16], hazeColor: '#281d44' },
    camY: 6,
    particles: [
      { n: 380, colors: ['#c49aff', '#8a6cff', '#f0d8ff'], mode: 'rise', speed: 1.6, area: [160, 180, 38], y0: 36, y1: 180 },
      { n: 220, colors: ['#6ae0ff', '#b98cff'], mode: 'drift', speed: 0.4, y0: 72, y1: 184 },
    ],
    blocks: {
      rock: { c: '#35304a', top: '#4d4663', v: 0.1, pat: 'stone' }, lichen: { c: '#35304a', top: '#62508e', v: 0.12 },
      rockDk: { c: '#231f2e', v: 0.08, pat: 'stone' }, crag: { c: '#3a3448', v: 0.1, pat: 'big' }, cragHi: { c: '#4a4260', v: 0.1, pat: 'big' },
      strata: { c: '#2c2838', v: 0.08, pat: 'big' }, strataLt: { c: '#544a6c', v: 0.08, pat: 'big' },
      scree: { c: '#2e2a3c', top: '#433d56', v: 0.16, pat: 'stone' },
      pale: { c: '#7a7490', v: 0.06, pat: 'brick' }, paleDk: { c: '#5a5470', v: 0.06, pat: 'brick' }, paleTr: { c: '#9a94b0', v: 0.04 },
      tent: { c: '#5c2a5c', v: 0.08 }, tentDk: { c: '#3a1a3f', v: 0.08 }, pupil: { c: '#07050a', v: 0 }, chain: { c: '#2a2a34', v: 0.03 }, bone: { c: '#c8c0d0', v: 0.05 }, boneDk: { c: '#9a90a6', v: 0.05 },
      timber: { c: '#4a3426', v: 0.06, pat: 'plank' }, rope: { c: '#8a7350', v: 0.06 }, iron: { c: '#3e3c44', v: 0.04 },
      crys: { c: '#b98cff', glow: true }, crys2: { c: '#6ae0ff', glow: true }, sucker: { c: '#f0a0e0', glow: true }, candle: { c: '#e8d8ff', glow: true },
      eyeW: { c: '#e4dcef', glow: true }, iris: { c: '#9a48ff', glow: true }, iris2: { c: '#d8a8ff', glow: true }, rune: { c: '#8a70ff', glow: true },
      ore: { c: '#ffb04a', glow: true }, ore2: { c: '#ff7a3a', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, CX = s(64), CZ = s(72), PIT = 17 * K;
      // 원래 128칸 지도 좌표(xo, zo)로 짠 지형을 2.5배로: 반지름도 노이즈로 일그러뜨린다
      const rOf = (x, z) => { const xo = x / K, zo = z / K; return K * Math.hypot(xo - 64, zo - 72) * (1 + (n.fbm(xo * 0.04 + 5, zo * 0.04, 3) - 0.5) * 0.3); };
      // 테라스 가장자리를 굽이치게 하는 두 번째 노이즈(원래 좌표 단위)
      const wander = (xo, zo) => (n.fbm(xo * 0.09 + 11, zo * 0.09 + 3, 2) - 0.5) * 6;
      // 물결치는 지층 띠: 낮은 주파수 노이즈로 띠 높이를 들쑥날쑥하게, 띠마다 한 가지 돌(면 합치기 유지)
      const STRATA = [B.crag, B.strata, B.crag, B.rockDk, B.cragHi, B.crag, B.strataLt, B.crag];
      const stOff = new Int16Array(W * D);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) stOff[x + W * z] = Math.round(n.fbm(x * 0.02 + 40, z * 0.02, 2) * 18);
      const strataAt = (x, z, y) => STRATA[(((y + stOff[x + W * z]) * 0.2) | 0) & 7];
      MH.terrain(w, {
        floor: 2,
        height: (x, z) => {
          const xo = x / K, zo = z / K, r = rOf(x, z) / K;
          let hh;
          if (r < 17) hh = -22 + n.fbm(xo * 0.2, zo * 0.2) * 1.5;
          else if (r < 57) {
            const rr = Math.max(0, r - 17 + wander(xo, zo)), idx = Math.min(4, Math.floor(rr / 8)), f = rr - idx * 8;
            // 디딤판은 바깥으로 살짝 오르고, 끝 1.4칸에서 거칠게 꺾여 다음 단으로 오른다(곧은 벽 대신 무너진 비탈)
            const rough = (n.fbm(x * 0.13 + 2, z * 0.13 + 9, 2) - 0.5) * 1.6;
            hh = -14 + idx * 4 + MH.sstep(0, 6.6, f) * 0.9 + (idx < 4 ? MH.sstep(6.6, 8, f) * (3.1 + rough * 0.6) : 0);
          } else hh = 8 + (r - 57) * 1.3 + (n.fbm(xo * 0.11 + 7, zo * 0.11, 2) - 0.5) * 6;
          if (zo < 28) hh = Math.max(hh, 30 - zo * 0.35);
          return base + K * (Math.min(62, hh) + n.fbm(xo * 0.07, zo * 0.07) * 2.5) + (n.fbm(x * 0.09 + 20, z * 0.09, 2) - 0.5) * 2.4;
        },
        surface: (x, z, y, sl) => sl >= 3 ? (hash3(x >> 1, y >> 2, z >> 1) > 0.5 ? B.crag : B.cragHi) : n.fbm(x * 0.04 + 3, z * 0.04, 2) > 0.56 ? B.lichen : B.rock,
        under: (x, z, y, dep, sl) => dep < 2 && sl < 3 ? B.rock : strataAt(x, z, y),
      });
      // 절벽 발치의 무너진 돌 비탈: 바로 옆이 6칸 넘게 높은 낮은 땅에 자갈 무리를 깐다(무리 단위로)
      for (let z = 2; z < D - 2; z++) for (let x = 2; x < W - 2; x++) {
        const g = MH.g(w, x, z);
        if (w.slope[x + W * z] >= 3) continue;
        let hi = 0;
        for (const [dx, dz] of [[3, 0], [-3, 0], [0, 3], [0, -3]]) hi = Math.max(hi, MH.g(w, x + dx, z + dz) - g);
        if (hi >= 6 && n.fbm(x * 0.07 + 31, z * 0.07, 2) > 0.42) MH.paint(w, x, z, B.scree);
      }
      const WL = base - s(19);
      MH.water(w, WL, (x, z) => rOf(x, z) < PIT + 2.5);
      const lights = [], acts = [], landmarks = [];
      lights.push({ name: 'void', p: [CX, WL + 4, CZ], c: '#9a60ff', i: 2.2, d: 100, flicker: 0.15, liquid: true });
      // 납골당 자리(북서쪽 벼랑)
      const QX0 = 36, QX1 = 106, QXC = 71.5, QZ = 88, QZ1 = 120;
      const inCrypt = (x, z) => x >= QX0 - 8 && x <= QX1 + 8 && z >= 56 && z <= QZ1 + 8;
      // 남동쪽 천장 틈 아래(착지 돌무더기 둘레)
      const nearRift = (x, z) => Math.hypot(x - LX, z - LZ) < 30;

      // ── 절벽 끝 처마와 종유석: 벼랑 윗단이 노이즈로 들쭉날쭉하게 안쪽으로 내민 바위 선반 ──
      const lip = [];
      for (let z = 2; z < D - 2; z++) for (let x = 2; x < W - 2; x++) {
        const r = rOf(x, z) / K;
        if (r >= 57 || r < 50 || inCrypt(x, z) || Math.hypot(x - LX, z - LZ) < 56) continue;
        const m = n.fbm(x * 0.03 + 9, z * 0.03 + 50, 2);
        if (m < 0.44) continue;
        const reach = 1.5 + (m - 0.44) * 26, inn = 57 - r;
        if (inn > reach) continue;
        // 바깥(벼랑) 쪽으로 걸어가 벼랑 윗면 높이를 잰다
        const ux = (x - CX) / Math.hypot(x - CX, z - CZ), uz = (z - CZ) / Math.hypot(x - CX, z - CZ);
        let top = -1;
        for (let q = 1; q < 30; q++) { const X = Math.round(x + ux * q), Z = Math.round(z + uz * q); if (rOf(X, Z) >= 57.5 * K) { top = MH.g(w, X, Z); break; } }
        const g = MH.g(w, x, z);
        if (top < 0 || top - g < 12) continue;
        const th = Math.min(6, 2 + Math.round((reach - inn) * 0.9));
        for (let y = top - th; y <= top; y++) w.set(x, y, z, y === top ? B.rock : B.crag);
        w.hm[x + W * z] = top;
        if (reach - inn < 1.2) lip.push([x, top - th, z]);
      }
      for (const [x, yb, z] of lip) {   // 선반 끝에 늘어진 종유석(굵은 것은 2×2)
        if (hash3(x >> 2, 9, z >> 2) < 0.7 || (x & 3) || (z & 3)) continue;
        const L = 6 + Math.floor(hash3(x, 10, z) * 18);
        for (let q = 1; q <= L; q++) { const b = q > L - 4 ? B.rockDk : B.crag; w.set(x, yb - q, z, b); if (q < L * 0.5) { w.set(x + 1, yb - q, z, B.crag); w.set(x, yb - q, z + 1, B.crag); w.set(x + 1, yb - q, z + 1, B.crag); } }
      }
      // ── 바위 아치 ──
      const arch = (ax, az, bx, bz, lift) => {
        const ga = MH.g(w, ax, az), gb = MH.g(w, bx, bz);
        let prev = null;
        for (let t = 0; t <= 1.0001; t += 0.01) {
          const x = ax + (bx - ax) * t, z = az + (bz - az) * t, y = ga + (gb - ga) * t + Math.sin(t * Math.PI) * lift;
          if (prev) w.line(prev[0], prev[1], prev[2], x, y, z, B.crag, 6.4 - Math.sin(t * Math.PI) * 2 + (n.fbm(t * 9, ax * 0.1) - 0.5) * 1.6);
          prev = [x, y, z];
        }
        // 아치 등에 얹힌 지층 띠와 밑으로 늘어진 종유석
        for (let t = 0.05; t < 0.95; t += 0.01) {
          const x = Math.round(ax + (bx - ax) * t), z = Math.round(az + (bz - az) * t), y = Math.round(ga + (gb - ga) * t + Math.sin(t * Math.PI) * lift);
          for (let k = 0; k < 4; k++) if (w.get(x, y + 3 + k, z) && !w.get(x, y + 4 + k, z)) { w.set(x, y + 3 + k, z, B.rock); break; }
        }
        for (let k = 0; k < 40; k++) {
          const t = w.r(0.2, 0.8), x = Math.round(ax + (bx - ax) * t) + w.ri(-2, 2), z = Math.round(az + (bz - az) * t) + w.ri(-2, 2);
          const y = Math.round(ga + (gb - ga) * t + Math.sin(t * Math.PI) * lift) - 6, L = w.ri(4, 18);
          for (let q = 0; q < L; q++) { w.fill(x, y - q, z, q > L - 4 ? B.rockDk : B.crag); if (q < L * 0.4) w.fill(x + 1, y - q, z, B.crag); }
        }
      };
      arch(s(26), s(54), s(58), s(100), 13 * K); arch(s(104), s(50), s(80), s(110), 15 * K);

      // ── 감시자의 눈(북쪽 절벽): 평소엔 눈꺼풀이 닫혀 있다 ──
      const EX = s(64), EY = base + 40, EZ = s(30), ER = 20;
      for (let z = s(12); z <= s(36); z++) for (let x = s(42); x <= s(86); x++) {
        const xo = x / K, zo = z / K, g = MH.g(w, x, z);
        const peak = base + K * (32 - Math.abs(xo - 64) * 0.3 - Math.max(0, zo - 30) * 2.4 + n.fbm(xo * 0.16, zo * 0.16) * 4) + (n.fbm(x * 0.12, z * 0.12 + 70) - 0.5) * 4;
        for (let y = g + 1; y <= peak; y++) w.set(x, y, z, hash3(x >> 3, y >> 2, z >> 3) > 0.86 ? B.cragHi : strataAt(x, z, y));
        if (peak > g) w.hm[x + W * z] = Math.round(peak);
      }
      w.ellipsoid(EX, EY, EZ, 28, 24, 20, 0, (dx, dy, dz) => dz >= -2);
      w.ellipsoid(EX, EY + 8, EZ + 16, 30, 28, 18, 0, (dx, dy, dz) => dz >= -4 && dy >= 0);   // 눈두덩을 깎아 위에서도 눈꺼풀이 보이게
      w.sphere(EX, EY, EZ, ER, B.eyeW, (dx, dy, dz) => dz >= -8);
      // 홍채: 바깥 테 → 보랏빛 → 밝은 안쪽, 그리고 빛 반사 한 점
      for (let dy = -14; dy <= 14; dy++) for (let dx = -14; dx <= 14; dx++) {
        const d = Math.hypot(dx, dy);
        if (d > 12.4) continue;
        let z = EZ + ER + 1;
        while (z > EZ && !w.get(EX + dx, EY + dy, z)) z--;
        const streak = hash3(Math.round(Math.atan2(dy, dx) * 9), 4, 4) > 0.6;
        w.set(EX + dx, EY + dy, z, d > 10.8 ? B.tentDk : d > 7.6 ? (streak ? B.iris2 : B.iris) : (streak ? B.iris : B.iris2));
      }
      // 눈 둘레에 박힌 룬 고리와 핏줄처럼 뻗은 촉수 결
      const faceSet = (x, y, b) => { x = Math.round(x); y = Math.round(y); let z = EZ + 48; while (z > EZ - 8 && !w.get(x, y, z)) z--; if (z > EZ - 8) w.set(x, y, z, b); };
      for (let a = 0.25; a < Math.PI - 0.2; a += 0.045) { const b = hash3(Math.round(a * 25), 3, 1) > 0.3 ? B.rune : B.paleDk; faceSet(EX + Math.cos(a) * (ER + 12), EY + Math.sin(a) * (ER + 10), b); faceSet(EX + Math.cos(a) * (ER + 13), EY + Math.sin(a) * (ER + 11), b); }
      for (let k = 0; k < 9; k++) {
        const a0 = -0.3 + k * 0.46;
        for (let r = ER + 16; r < ER + 40; r += 0.3) {
          const x = EX + Math.cos(a0 + Math.sin(r * 0.2) * 0.12) * r, y = EY + Math.sin(a0) * r * 0.8, b = r > ER + 30 ? B.tentDk : B.tent;
          faceSet(x, y, b); if (r < ER + 30) faceSet(x, y + 1, b);
          if (Math.round(r * 3) % 37 === 0) for (let q = 1; q < 6; q++) faceSet(x + Math.cos(a0 + 0.9) * q, y + Math.sin(a0 + 0.9) * q * 0.8, B.tentDk);   // 잔가지
        }
      }
      const pupil = w.prop({ name: 'pupil', pivot: [EX + 0.5, EY + 0.5, EZ + ER] });
      for (let dy = -10; dy <= 10; dy++) {
        const hw = Math.round(2.4 * (1 - (dy / 10.5) * (dy / 10.5)));   // 세로로 길쭉한 동공
        for (let dx = -hw; dx <= hw; dx++) { let z = EZ; while (w.get(EX + dx, EY + dy, z)) z++; pupil.set(EX + dx, EY + dy, z, B.pupil); }
      }
      // 눈꺼풀: 위아래 두 쪽이 눈알 앞을 다 덮은 채로 쉰다
      const lidU = w.prop({ name: 'lidU', pivot: [EX + 0.5, EY + 0.5, EZ + 0.5], axis: 'x' });
      const lidD = w.prop({ name: 'lidD', pivot: [EX + 0.5, EY + 0.5, EZ + 0.5], axis: 'x' });
      const RL = 26.8;
      lidU.ellipsoid(EX, EY, EZ, RL, RL, RL, B.crag, (dx, dy, dz, d) => dy >= 0 && dz >= -2 && d > 0.8 && !w.get(EX + dx, EY + dy, EZ + dz));
      lidD.ellipsoid(EX, EY, EZ, RL, RL, RL, B.cragHi, (dx, dy, dz, d) => dy < 0 && dz >= -2 && d > 0.8 && !w.get(EX + dx, EY + dy, EZ + dz));
      // 눈꺼풀 주름 두 줄
      for (const [lid, dy0, sg] of [[lidU, 9, 1], [lidD, -8, -1]]) for (let dx = -20; dx <= 20; dx++) {
        const dy = dy0 + Math.round(Math.abs(dx) * Math.abs(dx) / 70) * sg, zz = Math.sqrt(Math.max(0, RL * RL - dx * dx - dy * dy));
        const z = EZ + Math.round(zz); if (!w.get(EX + dx, EY + dy, z + 1)) lid.set(EX + dx, EY + dy, z + 1, B.rockDk);
      }
      // 맞닿는 눈꺼풀 테(두 칸 두께)와 위 눈꺼풀의 가시 같은 속눈썹
      for (let dx = -24; dx <= 24; dx++) {
        const z = EZ + Math.round(Math.sqrt(Math.max(0, RL * RL - dx * dx)));
        for (const dy of [0, 1]) if (!w.get(EX + dx, EY + dy, z)) lidU.set(EX + dx, EY + dy, z, B.paleDk);
        for (const dy of [-1, -2]) if (!w.get(EX + dx, EY + dy, z)) lidD.set(EX + dx, EY + dy, z, Math.abs(dx) < 18 ? B.iris : B.paleDk);
        if (dx % 4 === 0 && Math.abs(dx) < 22) for (let q = 1; q <= 3; q++) if (!w.get(EX + dx, EY - q + 1, z + q)) lidU.set(EX + dx, EY - q + 1, z + q, B.tentDk);
      }
      lights.push({ name: 'eye', p: [EX + 0.5, EY, EZ + ER + 8], c: '#b070ff', i: 1.3, d: 64, flicker: 0.05 });
      acts.push({
        name: '감시자의 눈', hint: '닫힌 눈꺼풀이 열리고 눈동자가 왼쪽, 오른쪽을 살핀 뒤 다시 감겨요', hit: [EX - 26, EY - 26, EZ, EX + 26, EY + 26, EZ + 30],
        run: async a => {
          a.flash('eye', 4, 5.4);
          await Promise.all([a.tween('lidU', { rot: [-0.75, 0, 0], off: [0, 6, 8] }, 0.9), a.tween('lidD', { rot: [0.7, 0, 0], off: [0, -6, 8] }, 0.9)]);
          a.burst([EX + 0.5, EY, EZ + ER + 6], { n: 50, colors: ['#d8a8ff', '#9a48ff', '#ffffff'], speed: 12, up: 2, life: 1.6, gravity: 0, spread: 10 });
          await a.wait(0.3);
          await a.move('pupil', [-8, 0, 0], 0.6); await a.wait(0.5);
          await a.move('pupil', [8, 1, 0], 1.0); await a.wait(0.5);
          await a.move('pupil', [0, 0, 0], 0.5); await a.wait(0.4);
          await Promise.all([a.tween('lidU', { rot: [0, 0, 0], off: [0, 0, 0] }, 0.6), a.tween('lidD', { rot: [0, 0, 0], off: [0, 0, 0] }, 0.6)]);
          a.burst([EX + 0.5, EY, EZ + RL + 2], { n: 30, colors: ['#4a3282', '#9a48ff'], speed: 8, up: 1, life: 1, gravity: 0, spread: 12, flat: true });
        },
      });
      landmarks.push({ name: '감시자의 눈', note: '중간 보스 · 심연의 감시자', p: [EX + 0.5, EY + 46, EZ + 10], mid: true });

      // ── 심연의 촉수(부품): 수면에서 솟는다 ──
      [[0.5, 24, 8], [2.1, 30, 7], [3.6, 22, 8], [5.0, 27, 7]].forEach(([a0, hgt, reach], k) => {
        const rx = CX + Math.cos(a0) * 12, rz = CZ + Math.sin(a0) * 12;
        const p = w.prop({ name: 't' + k, pivot: [rx, WL + 2, rz], axis: k % 2 ? 'x' : 'z', rock: 0.07, rockSpeed: 0.6 + k * 0.15, phase: k, clipOK: 60 });
        let prev = null;
        for (let t = 0; t <= 1.0001; t += 0.006) {
          const a = a0 + Math.sin(t * 4 + k) * 0.35;
          const rr = 12 + Math.sin(t * Math.PI * 0.9) * reach * K;
          const x = CX + Math.cos(a) * rr, z = CZ + Math.sin(a) * rr, y = WL + 4 + Math.sin(t * Math.PI * 0.8) * hgt * K + t * 12;
          const th = (2.8 - t * 2.2) * K;
          if (prev) p.line(prev[0], prev[1], prev[2], x, y, z, t > 0.75 ? B.tentDk : B.tent, Math.max(0.8, th));
          // 빨판: 안쪽 면에 두 칸짜리 동그란 점
          if (t > 0.08 && t < 0.85 && Math.round(t * 160) % 4 === 0) { const sx = Math.round(x), sy = Math.round(y + th), sz = Math.round(z); p.set(sx, sy, sz, B.sucker); if (th > 2.5) p.set(sx + 1, sy, sz, B.sucker); }
          prev = [x, y, z];
        }
      });
      acts.push({
        name: '심연의 촉수', hint: '심연 속에서 촉수가 요동쳐요', hit: [CX - 30, WL + 2, CZ - 30, CX + 30, WL + 50, CZ + 30],
        run: async a => {
          a.flash('void', 2.5, 3);
          ['t0', 't1', 't2', 't3'].forEach(t => a.spin(t, 5, 3));
          for (let k = 0; k < 4; k++) { a.burst([CX, WL + 6, CZ], { n: 50, colors: ['#c29aff', '#f0a0e0', '#2a1a4c'], speed: 20, up: 16, life: 2.2, gravity: 6, spread: 20 }); await a.wait(0.6); }
        },
      });
      landmarks.push({ name: '심연의 구멍', note: '보스 · 이름 없는 것', p: [CX + 0.5, base + 20, CZ + 0.5], boss: true });

      // ── 나선 계단과 등불 기둥 ──
      const SR = PIT + 6.5, sx0 = Math.round(CX + Math.cos(2.2) * SR), sz0 = Math.round(CZ + Math.sin(2.2) * SR);
      const sy0 = MH.g(w, sx0, sz0);
      for (let i = 0; i < 1700; i++) {
        const a = i * 0.022 + 2.2, r = PIT + 4, y = sy0 - Math.floor(i * 0.075);
        if (y <= WL + 2) break;
        for (let rr = r; rr <= r + 7; rr++) {
          const px = Math.round(CX + Math.cos(a) * rr), pz = Math.round(CZ + Math.sin(a) * rr);
          MH.footing(w, px, pz, px, pz, y, B.paleDk); w.set(px, y, pz, rr >= r + 6 ? B.paleDk : B.pale);
          for (let q = 1; q <= 12; q++) w.set(px, y + q, pz, 0);
        }
        for (const rr of [r - 1, r - 2]) { const px = Math.round(CX + Math.cos(a) * rr), pz = Math.round(CZ + Math.sin(a) * rr); MH.footing(w, px, pz, px, pz, y, B.paleDk); w.set(px, y, pz, B.paleDk); }
        { // 안쪽 난간: 사슬 두 칸, 14걸음마다 기둥과 뼈 장식
          const px = Math.round(CX + Math.cos(a) * (r - 2)), pz = Math.round(CZ + Math.sin(a) * (r - 2));
          if (i % 14 === 0) { w.box(px, y + 1, pz, px, y + 3, pz, B.paleTr); w.set(px, y + 4, pz, B.bone); }
          else if (!w.get(px, y + 1, pz)) w.set(px, y + 2, pz, B.chain);
        }
        if (i % 44 === 0) { // 바깥 등불 기둥
          const px = Math.round(CX + Math.cos(a) * (r + 9)), pz = Math.round(CZ + Math.sin(a) * (r + 9));
          w.box(px - 1, y - 2, pz - 1, px + 1, y + 1, pz + 1, B.paleDk); w.box(px, y + 2, pz, px, y + 12, pz, B.pale);
          w.box(px - 1, y + 13, pz - 1, px + 1, y + 13, pz + 1, B.paleTr); w.set(px, y + 14, pz, B.rune); w.set(px, y + 15, pz, B.rune);
        }
      }
      // ── 잊힌 제단(서쪽 단) ──
      const RX = s(30), RZ = s(88), rg = MH.g(w, RX, RZ);
      MH.flatten(w, RX - 22, RZ - 20, RX + 22, RZ + 20, rg, B.pale, B.paleDk);
      MH.retain(w, RX - 22, RZ - 20, RX + 22, RZ + 20, B.paleDk, B.paleTr);
      for (let z = RZ - 20; z <= RZ + 20; z++) for (let x = RX - 22; x <= RX + 22; x++) if (((x >> 1) + (z >> 1)) % 2 === 0) MH.paint(w, x, z, B.paleDk);
      // 무너진 기둥 다섯: 주춧돌·두 단 받침·홈 파인 기둥몸·주두, 짧은 것은 부러진 끝과 떨어진 토막
      for (const [ox, oz, h] of [[-18, -16, 38], [16, -16, 22], [-18, 12, 28], [16, 12, 40], [-2, -18, 12]]) {
        const px = RX + ox, pz = RZ + oz;
        w.box(px - 2, rg + 1, pz - 2, px + 5, rg + 2, pz + 5, B.paleDk); w.box(px - 1, rg + 3, pz - 1, px + 4, rg + 4, pz + 4, B.paleTr);
        w.box(px, rg + 5, pz, px + 3, rg + h, pz + 3, B.pale);
        for (let y = rg + 6; y < rg + h; y++) { w.set(px + 1, y, pz - 0, B.paleDk); w.set(px + 3, y, pz + 2, B.paleDk); w.set(px + 2, y, pz + 3, B.paleDk); w.set(px, y, pz + 1, B.paleDk); }   // 세로 홈
        for (let y = rg + 12; y < rg + h; y += 10) w.box(px - 1, y, pz - 1, px + 4, y, pz + 4, B.paleDk);   // 테
        if (h > 30) { w.box(px - 2, rg + h + 1, pz - 2, px + 5, rg + h + 2, pz + 5, B.paleDk); w.box(px - 1, rg + h, pz - 1, px + 4, rg + h, pz + 4, B.paleTr); w.box(px + 1, rg + h + 3, pz + 1, px + 2, rg + h + 4, pz + 2, B.rune); }
        else {
          for (const [bx, bz, q] of [[px + 3, pz, 0], [px, pz + 3, 1], [px + 2, pz + 2, 2]]) w.box(bx, rg + h - q, bz, bx, rg + h, bz, 0);   // 부러진 끝
          const fx = px + (ox < 0 ? 6 : -6), fz = pz + 4;
          if (!w.get(fx, rg + 1, fz)) { w.box(fx, rg + 1, fz, fx + 3, rg + 3, fz + 1, B.pale); w.box(fx + 4, rg + 1, fz, fx + 4, rg + 2, fz + 1, B.paleDk); w.set(fx + 5, rg + 1, fz, B.paleTr); }
        }
      }
      // 두 기둥에 걸친 들보와 늘어진 사슬
      w.box(RX - 4, rg + 41, RZ + 12, RX + 20, rg + 42, RZ + 15, B.paleDk); w.box(RX - 4, rg + 43, RZ + 12, RX + 20, rg + 43, RZ + 13, B.paleTr);
      for (let x = RX - 4; x <= RX + 2; x++) w.set(x, rg + 40 - Math.round(Math.sin((x - RX + 4) / 6 * Math.PI) * 2), RZ + 14, B.chain);
      MH.circle(w, RX, RZ, 10, B.rune, 2); MH.circle(w, RX, RZ, 6, B.rune);
      for (let k = 0; k < 8; k++) { const t = k / 8 * Math.PI * 2; for (const rr of [7, 8]) MH.paint(w, Math.round(RX + Math.cos(t) * rr), Math.round(RZ + Math.sin(t) * rr), B.rune); }
      // 제단 돌: 세 단, 위판 가장자리 몰딩
      w.box(RX - 4, rg + 1, RZ - 4, RX + 4, rg + 2, RZ + 4, B.paleDk); w.box(RX - 3, rg + 3, RZ - 3, RX + 3, rg + 5, RZ + 3, B.pale);
      w.box(RX - 3, rg + 6, RZ - 3, RX + 3, rg + 6, RZ + 3, B.paleTr); for (const [ex, ez] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) w.set(RX + ex, rg + 6, RZ + ez, B.paleDk);
      for (let k = 0; k < 6; k++) { const t = k / 6 * Math.PI * 2 + 0.3, x = Math.round(RX + Math.cos(t) * 14), z = Math.round(RZ + Math.sin(t) * 14); w.box(x, rg + 1, z, x, rg + 2 + (k % 2) * 2, z, B.bone); w.set(x + 1, rg + 1, z, B.boneDk); w.set(x, rg + 3 + (k % 2) * 2, z, B.candle); w.set(x, rg + 4 + (k % 2) * 2, z, B.candle); }
      // 제단 위 수정(부품): 의식 때 떠올라 돈다
      const orb = w.prop({ name: 'orb', pivot: [RX + 0.5, rg + 12, RZ + 0.5] });
      orb.box(RX, rg + 8, RZ, RX, rg + 16, RZ, B.crys); orb.box(RX - 4, rg + 12, RZ, RX + 4, rg + 12, RZ, B.crys); orb.box(RX, rg + 12, RZ - 4, RX, rg + 12, RZ + 4, B.iris2);
      orb.ellipsoid(RX, rg + 12, RZ, 2.2, 3.4, 2.2, B.crys); orb.box(RX, rg + 10, RZ - 2, RX, rg + 14, RZ + 2, B.crys2); orb.set(RX, rg + 12, RZ + 3, B.iris2);
      lights.push({ name: 'altar', p: [RX + 0.5, rg + 12, RZ + 0.5], c: '#8a70ff', i: 1, d: 36, flicker: 0.1 });
      landmarks.push({ name: '잊힌 제단', note: '그림자 · 눈먼 추적자 출몰', p: [RX + 0.5, rg + 54, RZ + 0.5] });
      // ── 쇠사슬 다리 ──
      const b0 = [CX - 64, CZ + 16], b1 = [CX - 20, CZ + 36], y0 = MH.g(w, b0[0], b0[1]), y1 = MH.g(w, b1[0], b1[1]);
      let bi = 0;
      for (let t = 0; t <= 1.0001; t += 0.01, bi++) {
        const x = Math.round(b0[0] + (b1[0] - b0[0]) * t), z = Math.round(b0[1] + (b1[1] - b0[1]) * t), y = Math.round(MH.lerp(y0, y1, t) - Math.sin(t * Math.PI) * 8);
        for (let dz = 0; dz <= 7; dz++) w.set(x, y, z + dz, (x >> 1) % 3 ? B.paleDk : B.pale);
        w.set(x, y - 1, z + 1, B.chain); w.set(x, y - 1, z + 6, B.chain);
        w.set(x, y + 4, z - 1, B.chain); w.set(x, y + 4, z + 8, B.chain);
        if (bi % 16 === 0) for (const zz of [z - 1, z + 8]) { w.set(x, y, zz, B.paleDk); w.box(x, y + 1, zz, x, y + 6, zz, B.pale); w.set(x, y + 7, zz, B.bone); }
        else if (bi % 4 === 0) for (const zz of [z - 1, z + 8]) w.box(x, y + 1, zz, x, y + 3, zz, B.chain);
      }
      // ── 남쪽 가장자리에서 나선 계단 꼭대기까지 테라스를 가로질러 내려가는 옛 돌계단 ──
      const onStair = (x, z) => Math.abs(x - sx0) < 16 && z > sz0 - 6;
      MH.flight(w, { name: '심연 돌계단', axis: 'z', c: sx0, half: 5, a: s(125), b: sz0 + 1, ha: MH.g(w, sx0, s(125)), hb: sy0, step: B.pale, edge: B.paleDk, fill: B.crag, rail: B.paleDk, post: B.pale, postGap: 14, clear: 14,
        onPost: (x, y, z, k) => { w.set(x, y, z, B.rune); if (k % 28 === 14 && x > sx0) lights.push({ p: [x + 0.5, y + 1, z + 0.5], c: '#8a70ff', i: 0.8, d: 28, flicker: 0.1 }); } });

      // ── 가라앉은 납골당(새 구역): 북서쪽 벼랑을 깎아 만든 뼈의 전당 ──
      const QL = MH.g(w, Math.round(QXC), 108);
      MH.flatten(w, QX0, QZ + 1, QX1, QZ1, QL, B.pale, B.paleDk);
      MH.retain(w, QX0, QZ + 1, QX1, QZ1, B.paleDk, B.paleTr);
      for (let z = QZ + 1; z <= QZ1; z++) for (let x = QX0; x <= QX1; x++) {
        const mid = Math.abs(x - QXC) < 8;
        MH.paint(w, x, z, mid ? (((z >> 1) % 3) ? B.paleDk : B.paleTr) : (hash3(x >> 1, 7, z >> 1) > 0.82 ? B.rock : ((x >> 2) + (z >> 2)) % 2 ? B.pale : B.paleDk));
      }
      // 뒤로 벼랑과 이어지는 바위 덩어리
      for (let z = 60; z < QZ; z++) for (let x = QX0 - 4; x <= QX1 + 4; x++) {
        const top = QL + 52 + Math.round(n.fbm(x * 0.1, z * 0.1) * 12) - Math.max(0, Math.abs(x - QXC) - 28);
        for (let y = QL - 6; y <= top; y++) if (!w.get(x, y, z)) w.set(x, y, z, hash3(x >> 2, y >> 2, z >> 2) > 0.75 ? B.cragHi : strataAt(x, z, y));
        if (top > MH.g(w, x, z)) w.hm[x + W * z] = top;
      }
      // 앞면 벽과 두 단 기단
      w.box(QX0, QL - 4, QZ - 6, QX1, QL + 38, QZ, B.pale);
      w.box(QX0 - 2, QL + 1, QZ + 1, QX1 + 2, QL + 2, QZ + 4, B.paleDk); w.box(QX0 - 2, QL + 1, QZ + 5, QX1 + 2, QL + 1, QZ + 6, B.paleTr);
      for (let y = QL + 8; y <= QL + 36; y += 8) w.box(QX0, y, QZ, QX1, y, QZ, B.paleDk);
      // 기둥 여섯(문 양옆 포함): 주춧돌·홈 파인 몸·뼈 띠·주두
      for (const px of [36, 46, 56, 84, 94, 104]) {
        w.box(px, QL + 3, QZ + 1, px + 3, QL + 36, QZ + 2, B.paleTr);
        for (let y = QL + 6; y <= QL + 33; y++) { w.set(px + 1, y, QZ + 2, B.pale); w.set(px + 2, y, QZ + 2, (y & 1) ? B.pale : B.paleTr); }
        w.box(px - 1, QL + 3, QZ + 1, px + 4, QL + 5, QZ + 3, B.paleDk);
        w.box(px - 1, QL + 34, QZ + 1, px + 4, QL + 36, QZ + 3, B.paleDk); w.box(px - 1, QL + 33, QZ + 3, px + 4, QL + 33, QZ + 3, B.paleTr);
        w.box(px, QL + 19, QZ + 3, px + 3, QL + 20, QZ + 3, B.bone); w.set(px + 1, QL + 19, QZ + 3, B.boneDk);
      }
      // 처마돌과 박공
      w.box(QX0 - 2, QL + 38, QZ - 4, QX1 + 2, QL + 39, QZ + 4, B.paleDk); w.box(QX0 - 2, QL + 40, QZ - 2, QX1 + 2, QL + 41, QZ + 2, B.paleTr);
      for (let x = QX0; x <= QX1; x += 4) w.box(x, QL + 37, QZ + 3, x + 1, QL + 37, QZ + 4, B.paleDk);   // 처마 받침
      for (let k = 0; k < 18; k++) {
        const x0 = QX0 + k * 2, x1 = QX1 - k * 2;
        w.box(x0, QL + 42 + k, QZ - 4, x1, QL + 42 + k, QZ, B.pale);
        w.box(x0, QL + 42 + k, QZ + 1, x0 + 3, QL + 42 + k, QZ + 2, B.paleDk); w.box(x1 - 3, QL + 42 + k, QZ + 1, x1, QL + 42 + k, QZ + 2, B.paleDk);
      }
      for (let a = 0; a < Math.PI * 2; a += 0.12) { w.set(Math.round(QXC + Math.cos(a) * 6.4), QL + 50 + Math.round(Math.sin(a) * 4.4), QZ + 1, B.rune); w.set(Math.round(QXC + Math.cos(a) * 5.4), QL + 50 + Math.round(Math.sin(a) * 3.4), QZ + 1, B.paleDk); }
      w.box(70, QL + 49, QZ + 1, 73, QL + 51, QZ + 1, B.iris); w.box(71, QL + 50, QZ + 2, 72, QL + 50, QZ + 2, B.pupil);
      // 해골 벽감 두 줄
      const niches = [];
      for (const ny of [QL + 10, QL + 24]) for (const nx of [42, 52, 90, 100]) {
        w.box(nx - 2, ny, QZ - 2, nx + 3, ny + 7, QZ, 0); w.box(nx - 2, ny, QZ - 3, nx + 3, ny + 7, QZ - 3, B.rockDk);
        for (const cx of [nx - 2, nx + 3]) for (let z = QZ - 2; z <= QZ; z++) w.set(cx, ny + 7, z, B.pale);   // 둥근 윗모서리
        w.box(nx - 2, ny - 1, QZ, nx + 3, ny - 1, QZ + 2, B.paleDk); w.box(nx - 3, ny + 8, QZ + 1, nx + 4, ny + 8, QZ + 1, B.paleDk); w.box(nx, ny + 9, QZ + 1, nx + 1, ny + 9, QZ + 1, B.paleTr);
        // 해골: 두개골·눈구멍(룬 불)·콧구멍·이
        w.box(nx - 1, ny + 2, QZ - 2, nx + 2, ny + 5, QZ - 1, B.bone); w.box(nx, ny + 6, QZ - 2, nx + 1, ny + 6, QZ - 1, B.bone);
        w.set(nx - 1, ny + 4, QZ - 1, B.rune); w.set(nx + 2, ny + 4, QZ - 1, B.rune);
        w.set(nx, ny + 3, QZ - 1, B.boneDk); w.set(nx + 1, ny + 3, QZ - 1, B.boneDk);
        for (let x = nx - 1; x <= nx + 2; x++) w.set(x, ny + 1, QZ - 1, (x & 1) ? B.bone : B.boneDk);
        w.box(nx - 1, ny, QZ - 1, nx + 2, ny, QZ, B.boneDk); w.set(nx - 2, ny, QZ, B.bone); w.set(nx + 3, ny, QZ, B.bone);   // 뼈 받침
        niches.push([nx, ny]);
      }
      // 문간: 뾰족 아치, 안쪽 어둠
      const DX0 = 64, DX1 = 79, DXM = 71;
      const opening = (x, y) => y <= QL + 20 || (y <= QL + 22 && x > DX0 + 1 && x < DX1 - 1) || (y <= QL + 24 && x > DX0 + 3 && x < DX1 - 3) || (y === QL + 25 && x > DX0 + 5 && x < DX1 - 5);
      for (let y = QL + 1; y <= QL + 25; y++) for (let x = DX0; x <= DX1; x++) if (opening(x, y)) for (let z = QZ - 12; z <= QZ; z++) w.set(x, y, z, 0);
      w.box(DX0, QL + 1, QZ - 13, DX1, QL + 25, QZ - 13, B.rockDk); w.box(DX0 + 6, QL + 10, QZ - 13, DX1 - 6, QL + 14, QZ - 13, B.rune);
      for (let y = QL + 1; y <= QL + 27; y++) for (const x of [DX0 - 2, DX0 - 1, DX1 + 1, DX1 + 2]) w.set(x, y, QZ + 1, (y - QL) % 6 === 0 ? B.paleTr : B.paleDk);
      w.box(DX0, QL + 26, QZ + 1, DX1, QL + 28, QZ + 1, B.paleDk); w.box(DX0 + 6, QL + 29, QZ + 1, DX1 - 6, QL + 30, QZ + 1, B.bone); w.box(DXM, QL + 26, QZ + 2, DXM + 1, QL + 29, QZ + 2, B.paleTr);
      const doorL = w.prop({ name: 'qdoorL', pivot: [DX0, QL + 1, QZ + 1] }), doorR = w.prop({ name: 'qdoorR', pivot: [DX1 + 1, QL + 1, QZ + 1] });
      for (let y = QL + 1; y <= QL + 25; y++) for (let x = DX0; x <= DX1; x++) if (opening(x, y)) {
        const left = x <= DXM, leaf = left ? doorL : doorR, edge = x === DX0 || x === DX1 || x === DXM || x === DXM + 1;
        leaf.set(x, y, QZ - 1, B.paleDk);
        leaf.set(x, y, QZ, (y - QL) % 8 === 0 || edge ? B.paleDk : ((x === 67 || x === 76) && y >= QL + 11 && y <= QL + 14 ? B.rune : B.pale));
      }
      for (const [x, leaf] of [[69, doorL], [74, doorR]]) { leaf.box(x, QL + 9, QZ + 1, x, QL + 12, QZ + 1, B.iron); leaf.set(x, QL + 8, QZ + 1, B.chain); }   // 쇠고리 손잡이
      lights.push({ name: 'qdoor', p: [QXC, QL + 12, QZ - 8], c: '#a080ff', i: 0.5, d: 36, flicker: 0.2, srcR: 8 });
      lights.push({ name: 'niche', p: [QXC, QL + 22, QZ + 6], c: '#8a70ff', i: 0.6, d: 52, flicker: 0.15, srcR: 8 });
      // 앞뜰: 부서진 석관, 뼈 더미, 촛대
      for (const [cx, cz, open] of [[44, 104, 1], [44, 114, 0], [98, 116, 1]]) {
        w.box(cx - 2, QL + 1, cz - 2, cx + 7, QL + 4, cz + 3, B.paleDk); w.box(cx - 1, QL + 2, cz - 3, cx + 6, QL + 2, cz + 4, B.paleTr);
        if (open) {
          w.box(cx, QL + 3, cz, cx + 5, QL + 4, cz + 1, 0); w.box(cx, QL + 2, cz, cx + 5, QL + 2, cz + 1, B.rockDk);
          w.box(cx - 2, QL + 1, cz - 6, cx + 6, QL + 2, cz - 4, B.pale); w.box(cx + 7, QL + 1, cz - 6, cx + 8, QL + 1, cz - 5, B.paleTr);   // 밀려난 뚜껑과 깨진 조각
          w.box(cx + 1, QL + 3, cz, cx + 3, QL + 3, cz, B.bone); w.set(cx + 4, QL + 3, cz + 1, B.boneDk); w.box(cx + 1, QL + 3, cz + 1, cx + 2, QL + 4, cz + 1, B.bone);
        } else {
          w.box(cx - 2, QL + 5, cz - 2, cx + 7, QL + 5, cz + 3, B.paleTr); w.box(cx - 1, QL + 6, cz - 1, cx + 6, QL + 6, cz + 2, B.pale);
          w.box(cx + 2, QL + 7, cz - 1, cx + 3, QL + 7, cz + 2, B.rune); w.box(cx, QL + 7, cz, cx + 5, QL + 7, cz + 1, B.rune);
        }
      }
      const bonePiece = (x, y, z, k) => { w.set(x, y, z, k % 2 ? B.boneDk : B.bone); if (k % 3) w.fill(x + (k % 2 ? 1 : 0), y, z + (k % 2 ? 0 : 1), B.bone); };
      for (const [bx, bz, r] of [[56, 116, 5.2], [86, 102, 4.4], [104, 98, 3.6]]) {
        MH.cone(w, bx, bz, QL + 1, r, B.bone, 0.6);
        for (let k = 0; k < 14; k++) { const x = bx + w.ri(-6, 6), z = bz + w.ri(-6, 6), g = MH.g(w, x, z); if (!w.get(x, g + 1, z) && g === QL) bonePiece(x, g + 1, z, k); }
      }
      for (const [cx, cz] of [[60, 97], [82, 97], [50, 98], [92, 100], [66, 118], [76, 118]]) {
        w.box(cx, QL + 1, cz, cx, QL + 5, cz, B.paleDk); w.box(cx - 1, QL + 6, cz - 1, cx + 1, QL + 6, cz + 1, B.bone); w.box(cx, QL + 7, cz, cx, QL + 8, cz, B.candle);
      }
      // 뼈 종루와 매달린 뼈 종(부품)
      const BX = 98, BZ = 106;
      for (const px of [BX - 9, BX + 8]) { w.box(px, QL + 1, BZ, px + 1, QL + 30, BZ + 1, B.pale); w.box(px - 1, QL + 1, BZ - 1, px + 2, QL + 3, BZ + 2, B.paleDk); for (let y = QL + 8; y <= QL + 26; y += 9) w.box(px - 1, y, BZ - 1, px + 2, y, BZ + 2, B.bone); }
      w.box(BX - 10, QL + 31, BZ, BX + 10, QL + 32, BZ + 1, B.paleDk); w.box(BX - 8, QL + 33, BZ, BX + 8, QL + 33, BZ + 1, B.bone);
      w.box(BX - 10, QL + 33, BZ, BX - 10, QL + 34, BZ + 1, B.bone); w.box(BX + 10, QL + 33, BZ, BX + 10, QL + 34, BZ + 1, B.bone); w.box(BX, QL + 34, BZ, BX, QL + 35, BZ + 1, B.rune);
      const bell = w.prop({ name: 'bell', pivot: [BX + 0.5, QL + 31, BZ + 1], axis: 'z' });
      bell.box(BX, QL + 27, BZ, BX, QL + 30, BZ + 1, B.chain);
      for (let k = 0; k < 12; k++) bell.cyl(BX, BZ, QL + 26 - k, QL + 26 - k, 1.2 + k * 0.42, k >= 10 ? B.boneDk : (k === 5 ? B.boneDk : B.bone));
      bell.box(BX, QL + 12, BZ, BX, QL + 14, BZ, B.crys);
      lights.push({ name: 'bell', p: [BX + 0.5, QL + 16, BZ + 0.5], c: '#c8a8ff', i: 0.5, d: 40, flicker: 0.1, srcR: 6 });
      landmarks.push({ name: '가라앉은 납골당', note: '새 구역 · 납골당 파수꾼의 거처', p: [QXC, QL + 72, QZ + 2] });
      landmarks.push({ name: '뼈 종루', note: '종이 울리면 그림자가 깨어난다', p: [BX + 0.5, QL + 48, BZ + 0.5] });
      acts.push({
        name: '납골당 석문', hint: '납골당의 두 석문이 바깥으로 열리며 안에서 보랏빛 넋들이 흘러나와요', hit: [DX0, QL + 1, QZ - 2, DX1, QL + 24, QZ + 4],
        run: async a => {
          a.flash('qdoor', 6, 5);
          await Promise.all([a.turn('qdoorL', [0, -1.25, 0], 1.4), a.turn('qdoorR', [0, 1.25, 0], 1.4)]);
          for (let k = 0; k < 8; k++) { a.burst([QXC, QL + 8 + (k % 3) * 2, QZ - 4], { n: 22, colors: ['#c49aff', '#f0d8ff', '#6ae0ff'], speed: 4, up: 6, life: 2, gravity: -1.2, spread: 4 }); await a.wait(0.3); }
          await a.wait(0.6);
          await Promise.all([a.turn('qdoorL', [0, 0, 0], 1.1), a.turn('qdoorR', [0, 0, 0], 1.1)]);
          a.burst([QXC, QL + 3, QZ + 4], { n: 30, colors: ['#7a7490', '#c8c0d0'], speed: 8, up: 2, life: 1, gravity: 6, spread: 8, flat: true });
        },
      });
      acts.push({
        name: '해골 벽감', hint: '납골당 벽감의 해골들이 차례로 눈에 보랏빛 불을 밝혀요', hit: [QX0, QL + 8, QZ - 4, QX1, QL + 32, QZ + 2],
        run: async a => {
          a.flash('niche', 5, 4); a.glow(1.6, 4);
          for (const [nx, ny] of niches) { a.burst([nx + 1, ny + 4.5, QZ + 1], { n: 18, colors: ['#8a70ff', '#d8a8ff', '#ffffff'], speed: 3, up: 2, life: 1.4, gravity: -0.8, spread: 2 }); await a.wait(0.3); }
          await a.wait(1);
        },
      });
      acts.push({
        name: '뼈 종', hint: '종루의 뼈 종이 크게 흔들리며 울려 퍼지는 파동이 앞뜰을 쓸어요', hit: [BX - 8, QL + 14, BZ - 6, BX + 8, QL + 32, BZ + 6],
        run: async a => {
          a.flash('bell', 6, 4);
          for (let k = 0; k < 4; k++) {
            await a.turn('bell', [0, 0, k % 2 ? -0.45 : 0.45], 0.42);
            for (let q = 0; q < 14; q++) { const t = q / 14 * Math.PI * 2; a.burst([BX + 0.5 + Math.cos(t) * 4, QL + 18, BZ + 0.5 + Math.sin(t) * 4], { n: 3, colors: ['#c8a8ff', '#ffffff'], speed: 12, up: 0.6, life: 0.9, gravity: 0, spread: 0.6, flat: true }); }
          }
          await a.turn('bell', [0, 0, 0], 0.8);
        },
      });

      // ── 남동쪽 천장 바위와 갈라진 틈: 무쇠골 오리하르콘 광산 바닥 구멍이 여기로 뚫려 있다 ──
      // 착지 자리: 틈에서 떨어진 자갈이 쌓인 둔덕(가운데는 평평)
      const LG0 = MH.g(w, LX, LZ);
      for (let z = LZ - 16; z <= LZ + 16; z++) for (let x = LX - 16; x <= LX + 16; x++) {
        const d = Math.hypot(x - LX, z - LZ) * (1 + (n.fbm(x * 0.15, z * 0.15 + 90) - 0.5) * 0.5);
        if (d > 15) continue;
        const h = LG0 + Math.round(d < 6 ? 2 : 2 * (1 - (d - 6) / 9) + (hash3(x >> 1, 3, z >> 1) - 0.5) * 1.2), g = MH.g(w, x, z);
        if (h > g) MH.setH(w, x, z, h, d < 6 ? B.scree : (hash3(x >> 1, 5, z >> 1) > 0.5 ? B.scree : B.rock), B.crag);
        else if (d < 12) MH.paint(w, x, z, B.scree);
      }
      const LG = MH.g(w, LX, LZ);           // 둔덕 윗면
      const AY = LG + 41;                   // 떨어져 내려오기 시작하는 높이(발 위치)
      if (AY !== 105) (w.warn = w.warn || []).push(`arrive 높이를 ${AY}(으)로 고칠 것`);
      // 천장 바위판: 남동쪽 모서리 벼랑에서 착지 자리 너머까지 혀처럼 뻗는다
      const dirX = (LX - 322) / Math.hypot(LX - 322, LZ - 322), dirZ = (LZ - 322) / Math.hypot(LX - 322, LZ - 322);
      const TX = LX + dirX * 18, TZ = LZ + dirZ * 18, SLEN = Math.hypot(TX - 322, TZ - 322);
      const cX = -dirZ, cZ = dirX;          // 틈이 갈라진 방향(바위판을 가로지른다)
      const crackHalf = (x, z) => {         // 틈 중심선까지 거리 → 틈 반폭(들쭉날쭉)
        const u = (x - LX) * cX + (z - LZ) * cZ, v = (x - LX) * dirX + (z - LZ) * dirZ;
        const bend = Math.sin(u * 0.12) * 2.5 + (n.fbm(u * 0.2 + 60, 1.5) - 0.5) * 4;
        const len = 26 + (n.fbm(u * 0.1, 7) - 0.5) * 6;
        const hw = Math.abs(u) > len ? -1 : (6.5 + (n.fbm(u * 0.25, z * 0.02 + 3) - 0.5) * 4) * (1 - Math.pow(Math.abs(u) / len, 3));
        return [Math.abs(v - bend), hw];
      };
      const slabB = new Int16Array(W * D).fill(-1), slabT = new Int16Array(W * D).fill(-1);
      for (let z = 150; z < D; z++) for (let x = 150; x < W; x++) {
        const t = Math.max(0, Math.min(1, ((x - 322) * dirX + (z - 322) * dirZ) / SLEN));
        const px = 322 + dirX * SLEN * t, pz = 322 + dirZ * SLEN * t, dd = Math.hypot(x - px, z - pz);
        const R = (46 - t * 26) * (1 + (n.fbm(x * 0.06 + 13, z * 0.06, 2) - 0.5) * 0.7);
        const along = ((x - 322) * dirX + (z - 322) * dirZ) / SLEN;
        if (dd > R || along > 1.08) continue;
        const bot = Math.round(LG + 47 + (1 - t) * 12 + (n.fbm(x * 0.09, z * 0.09 + 40) - 0.5) * 8 + Math.max(0, dd / R - 0.75) * 10);
        const top = Math.round(LG + 64 + (1 - t) * 16 + (n.fbm(x * 0.07 + 5, z * 0.07) - 0.5) * 12 - Math.max(0, dd / R - 0.6) * 18);
        const g = MH.g(w, x, z);
        const from = t < 0.32 || g > bot - 6 ? g + 1 : bot;   // 벼랑 쪽은 땅에서부터 기둥처럼 이어 붙인다
        const [cd, hw] = crackHalf(x, z);
        for (let y = from; y <= top; y++) {
          if (hw > 0 && cd < hw + (y - bot) * 0.04) continue;   // 틈: 위로 갈수록 살짝 넓어진다
          w.set(x, y, z, y >= top - 1 ? (hash3(x >> 2, 1, z >> 2) > 0.5 ? B.rock : B.lichen) : strataAt(x, z, y));
        }
        slabB[x + W * z] = bot; slabT[x + W * z] = top;
        if (from > g && top > MH.g(w, x, z) && !(hw > 0 && cd < hw)) w.hm[x + W * z] = top;
        // 바위판 밑에 늘어진 종유석
        if (from === bot && hash3(x >> 1, 21, z >> 1) > 0.86 && (x + z) % 3 === 0 && !(hw > 0 && cd < hw + 3)) {
          const L = 4 + Math.floor(hash3(x, 22, z) * 16);
          for (let q = 1; q <= L; q++) { w.set(x, bot - q, z, q > L - 3 ? B.rockDk : B.crag); if (q < L * 0.4) { w.fill(x + 1, bot - q, z, B.crag); w.fill(x, bot - q, z + 1, B.crag); } }
        }
      }
      // 틈 위로 이어지는 굴뚝: 바위판 위에 들쭉날쭉한 벽을 둘러 위쪽 광산까지 뚫린 수직 틈이 보이게
      for (let z = LZ - 40; z <= LZ + 40; z++) for (let x = LX - 40; x <= LX + 40; x++) {
        const i = x + W * z; if (x < 0 || z < 0 || x >= W || z >= D || slabT[i] < 0) continue;
        const [cd, hw] = crackHalf(x, z);
        if (hw <= 0) continue;
        const wall = 5 + n.fbm(x * 0.2, z * 0.2 + 77) * 5;
        if (cd < hw + 1 || cd > hw + 1 + wall) continue;
        // 틈 둘레로 솟은 바위 입술: 틈에 가까울수록 높고 바깥으로 무너져 내린다
        const ytop = Math.min(Hh - 6, Math.round(slabT[i] + 26 + (n.fbm(x * 0.12 + 9, z * 0.12) - 0.5) * 18 - (cd - hw - 1) * 2.6));
        for (let y = slabT[i] + 1; y <= ytop; y++) w.set(x, y, z, y >= ytop - 1 ? B.rock : strataAt(x, z, y));
        if (ytop > MH.g(w, x, z)) w.hm[i] = ytop;
      }
      const BYc = LG + 52;
      // 틈 안쪽 벽에 박힌 오리하르콘 광맥 조각(위 광산의 흔적)
      let oreN = 0;
      for (let k = 0; k < 900 && oreN < 70; k++) {
        const u = w.r(-26, 26), y = w.ri(LG + 46, Hh - 20);
        for (const sg of [-1, 1]) {
          let x = LX + cX * u, z = LZ + cZ * u;
          for (let q = 0; q < 16; q++) { x += dirX * sg; z += dirZ * sg; const X = Math.round(x), Z = Math.round(z); if (w.get(X, y, Z)) { if (hash3(X, y, Z) > 0.5) { w.set(X, y, Z, k % 3 ? B.ore : B.ore2); if (k % 2) w.set(X, y + 1, Z, B.ore); oreN++; } break; } }
        }
      }
      for (const sg of [-1, 1]) for (const uu of [-4, 0, 4]) for (let y = BYc + 1; y <= BYc + 6; y += 2) {   // 들보 둘레 벽에도 몇 점
        let x = LX + cX * uu, z = LZ + cZ * uu;
        for (let q = 0; q < 16; q++) { x += dirX * sg; z += dirZ * sg; const X = Math.round(x), Z = Math.round(z); if (w.get(X, y, Z)) { w.set(X, y, Z, (y + uu) % 3 ? B.ore : B.ore2); break; } }
      }
      // 틈을 가로지르는 광산 버팀목 둘(부러진 것 하나)과 거기 매단 줄사다리·밧줄
      const BY = BYc;                 // 들보 밑면
      const beam = (ox, broken) => {
        const bx0 = LX + cX * ox, bz0 = LZ + cZ * ox;
        for (let q = -14; q <= 14; q++) {
          if (broken && q > 3) break;
          const x = Math.round(bx0 + dirX * q), z = Math.round(bz0 + dirZ * q), yy = BY + (broken && q > 0 ? -Math.round(q * 0.8) : 0);
          w.box(x, yy, z, x, yy + 1, z, B.timber); w.set(x + (cX > 0 ? 1 : -1), yy, z, B.timber);
        }
      };
      beam(5, false); beam(-6, true);
      const LDX = Math.round(LX + cX * 5 - dirX * 3), LDZ = Math.round(LZ + cZ * 5 - dirZ * 3);   // 줄사다리 가운데
      const RPX = Math.round(LX + cX * 5 + dirX * 6), RPZ = Math.round(LZ + cZ * 5 + dirZ * 6);   // 밧줄
      const ladTop = BY - 1, ladBot = LG + 3;
      const ladder = w.prop({ name: 'ladder', pivot: [LDX + 0.5, ladTop + 1, LDZ + 0.5], axis: Math.abs(dirX) > Math.abs(dirZ) ? 'z' : 'x', rock: 0.035, rockSpeed: 0.7 });
      const ax = Math.abs(dirX) > Math.abs(dirZ) ? [0, 1] : [1, 0];   // 사다리 폭 방향(축과 직각)
      for (let y = ladBot; y <= ladTop; y++) {
        for (const sg of [-2, 2]) ladder.set(LDX + ax[0] * sg, y, LDZ + ax[1] * sg, B.rope);
        if ((ladTop - y) % 4 === 3) for (let q = -1; q <= 1; q++) ladder.set(LDX + ax[0] * q, y, LDZ + ax[1] * q, B.timber);
      }
      ladder.set(LDX + ax[0] * -2, ladBot - 1, LDZ + ax[1] * -2, B.rope); ladder.set(LDX + ax[0] * 2, ladBot - 1, LDZ + ax[1] * 2, B.rope);
      const ropeLen = ladTop - (LG + 8) + 1;
      const rope = MH.rope(w, 'liftrope', RPX, ladTop, RPZ, ropeLen, B.rope);
      rope.box(RPX - 1, LG + 6, RPZ - 1, RPX + 1, LG + 8, RPZ + 1, B.timber); rope.set(RPX, LG + 9, RPZ, B.iron);   // 끝에 달린 두레박
      rope.set(RPX, LG + 7, RPZ, B.ore);
      // 떨어진 버팀목 조각과 광석 부스러기
      for (const [ox, oz] of [[-9, 4], [8, -7], [-4, -10]]) { const x = LX + ox, z = LZ + oz, g = MH.g(w, x, z); w.box(x, g + 1, z, x + 3, g + 1, z, B.timber); w.set(x + 1, g + 2, z, B.timber); }
      for (let k = 0; k < 18; k++) { const x = LX + w.ri(-13, 13), z = LZ + w.ri(-13, 13), g = MH.g(w, x, z); if (Math.hypot(x - LX, z - LZ) > 3 && !w.get(x, g + 1, z) && w.liq[x + W * z] < 0) w.set(x, g + 1, z, k % 4 ? B.scree : B.ore); }
      lights.push({ name: 'rift', p: [LX + 0.5, BY + 3, LZ + 0.5], c: '#ffa850', i: 0.9, d: 44, flicker: 0.2, srcR: 10 });
      acts.push({
        name: '밧줄 타고 광산으로', hint: '천장 틈에서 늘어진 줄사다리를 붙잡고 흔들흔들 올라가 무쇠골 오리하르콘 광산 바닥으로 돌아가요', goto: 'ironhollow-orichalcum',
        hit: [LDX - 3, LG + 1, LDZ - 3, LDX + 3, LG + 14, LDZ + 3],
        run: async a => {
          a.flash('rift', 3, 2.6);
          const lift = a.rope('liftrope', ropeLen, ropeLen - 18, 1.6);
          for (let k = 0; k < 3; k++) { await a.turn('ladder', [k % 2 ? -0.22 : 0.22, 0, k % 2 ? 0.12 : -0.12], 0.45); a.burst([LX + 0.5, BY - 2, LZ + 0.5], { n: 16, colors: ['#ffb04a', '#7a6a8a', '#ffffff'], speed: 4, up: -2, life: 1.2, gravity: 6, spread: 6 }); }
          await Promise.all([a.turn('ladder', [0, 0, 0], 0.5), lift]);
          a.burst([LDX + 0.5, ladTop - 4, LDZ + 0.5], { n: 30, colors: ['#ffb04a', '#ff7a3a', '#f0d8ff'], speed: 5, up: 8, life: 1.4, gravity: -1, spread: 4 });
          await a.wait(0.4);
          await a.rope('liftrope', ropeLen, ropeLen, 0.8);
        },
      });

      // ── 수정 군락 ──
      const crystals = [];
      for (let i = 0; i < 130; i++) {
        const a = w.r(0, Math.PI * 2), r = w.r(22 * K, 54 * K), x = Math.round(CX + Math.cos(a) * r), z = Math.round(CZ + Math.sin(a) * r);
        const g = MH.g(w, x, z);
        if (g < 0 || w.get(x, g + 1, z) || MH.dist(x, z, RX, RZ) < 30 || onStair(x, z) || inCrypt(x, z) || (x > QX0 - 10 && x < QX1 + 10 && z < QZ1 + 26) || nearRift(x, z) || slabB[x + W * z] >= 0) continue;
        let sky = true; for (let y = g + 2; y <= Math.min(Hh - 1, g + 70) && sky; y += 2) if (w.get(x, y, z) || w.get(x + 6, y, z) || w.get(x, y, z + 6)) sky = false;
        const big = crystals.length < 9 && i % 3 === 0 && sky, c = i % 2 ? B.crys : B.crys2;
        for (let k = 0; k < (big ? 9 : 4); k++) {
          const aa = w.r(0, Math.PI * 2), tl = w.r(0.15, 0.5), l = w.r(big ? 12 : 4, big ? 28 : 10);
          w.line(x, g + 1, z, x + Math.cos(aa) * tl * l, g + 1 + l, z + Math.sin(aa) * tl * l, c, big ? (k === 0 ? 2.2 : 1) : (k === 0 ? 1 : 0));
        }
        if (big) { if (crystals.length < 5) lights.push({ name: 'crys', p: [x + 0.5, g + 10, z + 0.5], c: c === B.crys ? '#b48cff' : '#60d8ff', i: 1.2, d: 44, flicker: 0.05 }); crystals.push([x, g, z]); }
      }
      if (crystals.length) {
        const [qx, qg, qz] = crystals[0];
        acts.push({
          name: '수정 공명', hint: '수정들이 차례로 울리며 빛나요', hit: [qx - 10, qg, qz - 10, qx + 10, qg + 28, qz + 10],
          run: async a => {
            a.flash('crys', 4, 3.4); a.glow(1.9, 3.4);
            for (const [x, g, z] of crystals) { a.burst([x + 0.5, g + 22, z + 0.5], { n: 24, colors: ['#b98cff', '#6ae0ff', '#ffffff'], speed: 8, up: 6, life: 1.6, gravity: 1, spread: 4 }); await a.wait(0.25); }
          },
        });
        landmarks.push({ name: '울리는 수정 군락', note: '빛이 닿는 유일한 곳', p: [qx + 0.5, qg + 40, qz + 0.5] });
      }
      // 석순(두 톤, 살짝 기운 것도), 크고 작은 바위, 뼈
      for (let i = 0; i < 130; i++) {
        const x = w.ri(10, W - 11), z = w.ri(10, D - 11), g = MH.g(w, x, z);
        if (g < 0 || rOf(x, z) < PIT + 12 || w.get(x, g + 1, z) || w.slope[x + W * z] >= 3 || MH.dist(x, z, RX, RZ) < 30 || onStair(x, z) || inCrypt(x, z) || nearRift(x, z) || slabB[x + W * z] >= 0) continue;
        const h = w.ri(8, 32), r = w.r(3, 7), lean = w.r(-0.25, 0.25), leanZ = w.r(-0.25, 0.25);
        let k = 0;
        for (let rr = r; rr > 0.4; rr -= r * 6 / (h * r) * 1.0, k++) { if (k > h) break; w.cyl(Math.round(x + lean * k), Math.round(z + leanZ * k), g + 1 + k, g + 1 + k, rr, k > h * 0.6 ? B.rock : B.crag); }
        w.cyl(x, z, g, g, r + 1, B.scree);
      }
      for (let i = 0; i < 70; i++) {   // 굴러 떨어진 바위(반쯤 묻힌 것 포함)
        const x = w.ri(10, W - 11), z = w.ri(10, D - 11), g = MH.g(w, x, z);
        if (g < 0 || rOf(x, z) < PIT + 10 || w.get(x, g + 1, z) || MH.dist(x, z, RX, RZ) < 30 || onStair(x, z) || inCrypt(x, z) || nearRift(x, z) || slabB[x + W * z] >= 0) continue;
        const r = w.r(2, 5.5), sink = w.r(0.2, 0.6);
        w.ellipsoid(x, Math.round(g + r * (0.6 - sink)), z, r * w.r(0.9, 1.3), r * 0.7, r * w.r(0.9, 1.3), i % 3 ? B.crag : B.cragHi, (dx, dy, dz, d) => d < 0.75 || hash3(x + dx, dy, z + dz) > 0.3);
      }
      MH.scatter(w, 900, (x, g, z) => { if (w.chance(0.3) && !inCrypt(x, z) && !nearRift(x, z)) { w.set(x, g + 1, z, w.chance(0.3) ? B.boneDk : B.bone); if (w.chance(0.5)) w.fill(x + 1, g + 1, z, B.bone); } });
      const pset = (p, x, y, z, b) => { x = Math.round(x); y = Math.round(y); z = Math.round(z); if (!w.get(x, y, z)) p.set(x, y, z, b); };
      // ── 잊힌 제단의 의식: 수정이 떠올라 돌고 바닥 룬이 타오른다 ──
      acts.push({
        name: '잊힌 제단', hint: '제단 위 수정이 떠올라 빙글 돌고 바닥의 룬 고리가 타올라요', hit: [RX - 6, rg + 1, RZ - 6, RX + 6, rg + 18, RZ + 6],
        run: async a => {
          a.flash('altar', 5, 5); a.glow(1.8, 5);
          await a.move('orb', [0, 14, 0], 1.4);
          const whirl = a.turn('orb', [0, Math.PI * 4, 0], 3);
          for (let k = 0; k < 6; k++) {
            for (let q = 0; q < 12; q++) { const t = q / 12 * Math.PI * 2 + k * 0.3; a.burst([RX + 0.5 + Math.cos(t) * 10, rg + 2, RZ + 0.5 + Math.sin(t) * 10], { n: 4, colors: ['#8a70ff', '#d8a8ff'], speed: 1.2, up: 8, life: 1, gravity: -1, spread: 0.6 }); }
            a.burst([RX + 0.5, rg + 26, RZ + 0.5], { n: 20, colors: ['#b98cff', '#ffffff'], speed: 6, up: 12, life: 1.2, gravity: -2, spread: 1.2 });
            await a.wait(0.5);
          }
          await whirl; a.unwind('orb');
          await a.tween('orb', { off: [0, 0, 0], rot: [0, 0, 0] }, 1.2);
        },
      });

      // ── 아치에 매달린 쇠우리(부품): 사슬이 풀리며 심연 쪽으로 덜컹 내려앉는다 ──
      const KX = s(92), KZ = s(80);
      let ky = Math.min(w.H - 2, MH.g(w, s(104), s(50)) + 76);
      while (ky > 0 && !w.get(KX, ky, KZ)) ky--;
      while (ky > 0 && w.get(KX, ky, KZ)) ky--;
      const kg = MH.g(w, KX, KZ);
      if (ky - kg > 30) {
        const chain = w.prop({ name: 'kchain', pivot: [KX + 0.5, ky + 1, KZ + 0.5] });
        for (let y = ky - 8; y <= ky; y++) { pset(chain, KX, y, KZ, B.chain); if (y % 2) pset(chain, KX + 1, y, KZ, B.chain); }
        const kage = w.prop({ name: 'kage', pivot: [KX + 0.5, ky + 1, KZ + 0.5], axis: 'x', rock: 0.05, rockSpeed: 0.7 });
        const cy = ky - 9;
        for (let y = cy - 15; y <= cy; y++) for (let dz = -4; dz <= 4; dz++) for (let dx = -4; dx <= 4; dx++) {
          const ex = Math.abs(dx) === 4, ez = Math.abs(dz) === 4, cap = y === cy || y === cy - 15, band = y === cy - 8;
          const bar = (ez && dx % 2 === 0) || (ex && dz % 2 === 0);
          if ((cap && (ex || ez || dx % 2 === 0)) || (ex && ez) || ((ex || ez) && bar) || (band && (ex || ez))) pset(kage, KX + dx, y, KZ + dz, B.chain);
        }
        for (const dx of [-1, 0, 1]) pset(kage, KX + dx, cy + 1, KZ, B.chain);
        for (let dx = -3; dx <= 3; dx++) for (let dz = -3; dz <= 3; dz++) if ((dx + dz) % 2 === 0) pset(kage, KX + dx, cy - 14, KZ + dz, B.iron);
        pset(kage, KX, cy - 13, KZ, B.crys2); pset(kage, KX + 1, cy - 13, KZ, B.crys2);
        [[-2, -13, 0], [-1, -13, 1], [2, -13, 2], [0, -12, 2], [-2, -12, -2], [2, -13, -1]].forEach(([dx, dy, dz], k) => pset(kage, KX + dx, cy + dy, KZ + dz, k % 2 ? B.boneDk : B.bone));
        lights.push({ name: 'kage', p: [KX + 0.5, cy - 11, KZ + 0.5], c: '#60d8ff', i: 0.6, d: 32, flicker: 0.2 });
        acts.push({
          name: '매달린 쇠우리', hint: '바위 아치에 매달린 쇠우리가 덜컹 내려앉았다가 크게 흔들려요', hit: [KX - 6, cy - 16, KZ - 6, KX + 6, ky, KZ + 6],
          run: async a => {
            a.flash('kage', 4, 4);
            await Promise.all([a.move('kage', [0, -14, 0], 0.5, t => t * t), a.rope('kchain', 9, 23, 0.5, t => t * t)]);
            a.burst([KX + 0.5, cy - 24, KZ + 0.5], { n: 40, colors: ['#6ae0ff', '#c8c0d0', '#2a2a34'], speed: 12, up: 4, life: 1.4, gravity: 6, spread: 4 });
            for (let k = 0; k < 3; k++) { await a.turn('kage', [0.35, 0, 0.2], 0.45); await a.turn('kage', [-0.35, 0, -0.2], 0.45); }
            await a.turn('kage', [0, 0, 0], 0.4);
            await Promise.all([a.move('kage', [0, 0, 0], 2), a.rope('kchain', 9, 9, 2)]);
          },
        });
      }

      // ── 수정 가시(부품, 평소엔 숨김): 테라스 곳곳에서 수정이 솟구친다 ──
      const spikes = [];
      for (let k = 0; k < 48 && spikes.length < 6; k++) {
        const ang = 0.15 + (k % 16) * 0.11, rr = 26 * K + (k % 3) * 12 + [0, 7, -7][Math.floor(k / 16)], x = Math.round(CX + Math.cos(ang) * rr), z = Math.round(CZ + Math.sin(ang) * rr), g = MH.g(w, x, z);
        let free = g > 0 && !nearRift(x, z);
        for (let y = g + 1; y <= g + 22 && free; y++) for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) if (w.get(x + dx, y, z + dz)) free = false;
        if (!free || spikes.some(([sx, , sz]) => Math.hypot(sx - x, sz - z) < 12)) continue;
        const nm = 'spike' + spikes.length, p = w.prop({ name: nm, pivot: [x + 0.5, g + 1, z + 0.5], scl0: [0, 0, 0] });
        const h = 18 + (k % 3) * 2;
        for (let y = g + 1; y <= g + h; y++) {
          const f = (y - g) / h, rad = 2.2 * (1 - f) + 0.4;
          for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) if (Math.hypot(dx, dz) <= rad) pset(p, x + dx, y, z + dz, y > g + h - 4 ? B.iris2 : ((dx + dz) & 1 ? B.crys2 : B.crys));
        }
        for (let q = 1; q <= 6; q++) { pset(p, x - 2 - (q >> 1), g + q, z, q > 4 ? B.iris2 : B.crys2); pset(p, x, g + q, z - 2 - (q >> 1), B.crys); }   // 곁가지 수정
        spikes.push([x, g, z, nm]);
      }
      if (spikes.length) acts.push({
        name: '수정 가시', hint: '테라스 바닥을 뚫고 수정 가시가 차례로 솟구쳤다가 가라앉아요', hit: [spikes[0][0] - 4, spikes[0][1], spikes[0][2] - 4, spikes[0][0] + 4, spikes[0][1] + 22, spikes[0][2] + 4],
        run: async a => {
          a.glow(1.7, 4);
          for (const [x, g, z, nm] of spikes) {
            a.burst([x + 0.5, g + 2, z + 0.5], { n: 26, colors: ['#4d4663', '#b98cff', '#6ae0ff'], speed: 10, up: 6, life: 1.2, gravity: 8, spread: 3 });
            a.tween(nm, { scl: [1, 1, 1] }, 0.25, t => 1 - (1 - t) * (1 - t));
            await a.wait(0.3);
          }
          await a.wait(1.6);
          await Promise.all(spikes.map(([, , , nm]) => a.tween(nm, { scl: [0, 0, 0] }, 0.8)));
        },
      });

      // ── 심연의 소용돌이: 웅덩이 위로 보랏빛 회오리가 솟는다 ──
      acts.push({
        name: '심연의 소용돌이', hint: '심연의 웅덩이에서 보랏빛 회오리가 휘감아 올라가요', hit: [CX - 20, WL + 1, CZ - 20, CX + 20, WL + 14, CZ + 20],
        run: async a => {
          a.flash('void', 3, 4.4); a.wind(4, 4.4);
          for (let k = 0; k < 40; k++) {
            const t = k * 0.55, r = 8 + k * 0.6, y = WL + 4 + k * 2.2;
            a.burst([CX + Math.cos(t) * r, y, CZ + Math.sin(t) * r], { n: 12, colors: ['#c29aff', '#8a6cff', '#f0d8ff'], speed: 3, up: 2, life: 1.4, gravity: -0.6, spread: 1.6 });
            await a.wait(0.1);
          }
          await a.wait(0.8);
        },
      });

      // ── 그림자 떼: 절벽 처마에서 그림자들이 날아올라 웅덩이로 빨려 든다 ──
      const shade = [];
      for (let k = 0; k < 16; k++) { const t = 0.2 + k * 0.1, r = 114 - (k % 4) * 5, x = Math.round(CX + Math.cos(t) * r), z = Math.round(CZ + Math.sin(t) * r); shade.push([x, MH.g(w, x, z), z]); }
      const [hx, hy, hz] = shade[6];
      acts.push({
        name: '그림자 떼', hint: '동굴 가장자리의 그림자들이 일제히 일어나 심연으로 빨려 들어가요', hit: [hx - 6, hy + 1, hz - 6, hx + 6, hy + 8, hz + 6],
        run: async a => {
          a.glow(0.5, 3.6);
          for (const [x, g, z] of shade) {
            a.burst([x + 0.5, g + 3, z + 0.5], { n: 18, colors: ['#07060e', '#231f2e', '#4a3282'], speed: 4, up: 6, life: 1.6, gravity: -1, spread: 3 });
            await a.wait(0.12);
          }
          for (let k = 0; k < 4; k++) { a.burst([CX, WL + 4, CZ], { n: 40, colors: ['#07060e', '#4a3282', '#c29aff'], speed: 12, up: 4, life: 1.4, gravity: 0, spread: 12 }); await a.wait(0.35); }
          a.flash('void', 4, 1.4); await a.wait(1);
        },
      });
      // 눈꺼풀 자리에 나중에 놓인 석순·뼈는 치운다
      for (const pr of w.props || []) if (pr.o.name === 'lidU' || pr.o.name === 'lidD') for (const [i] of pr.w.data) w.set(i % W, Math.floor(i / (W * D)), Math.floor(i / W) % D, 0);
      // 떨어져 내려오는 길 검사: 도착 자리에서 둔덕까지 몸 폭이 비어 있어야 한다
      for (let y = LG + 1; y <= AY + 7; y++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) if (w.get(LX + dx, y, LZ + dz)) { (w.warn = w.warn || []).push(`떨어지는 길이 막힘 [${LX + dx},${y},${LZ + dz}]`); dz = dx = 9; y = 9999; }
      if (w.liq[LX + W * LZ] >= 0) (w.warn = w.warn || []).push('착지 자리가 액체');
      return { lights, landmarks, acts };
    },
  });
})();
