// 모그윈 왕조 · 고치의 방 — 왕조 영묘 꼭대기, 지붕 없는 긴 신전 뜰. 남쪽 승강기·안개문으로 들어서면 넓은 판석 바닥이 북쪽으로 길게 뻗고,
// 양옆은 불길이 일렁이는 아치 벽과 홈 파인 돌기둥, 묘비 줄. 북쪽 넓은 계단 위 단에 거대한 골반뼈가 미켈라의 고치를 안고 있고, 그 뒤로 큰 돌문이 별하늘에 열려 있다. (메인 보스: 피의 군주 모그)
// 좌표: +x 동쪽, +z 남쪽. 기본 시점(남동쪽)에서 보면 고치가 화면 위쪽 가운데, 입구·승강기는 아래(남쪽).
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 192, D = 192, Hh = 144;
  const CX = 96, CZ = 46;                                   // 고치 자리(북쪽 단 위)
  MAPS.push({
    id: 'mohgwyn', cat: 'lands', name: '모그윈 왕조', en: 'Mohgwyn Palace · Cocoon of the Empyrean', color: '#d0303a', seed: 727, base: 30, time: 'night', size: [W, D, Hh],
    desc: '왕조 영묘 중턱에서 승강기를 타고 꼭대기에 오르면 지붕 없는 긴 신전 뜰이 별하늘 아래 펼쳐진다. 양옆 아치 벽 너머로 피의 불길이 일렁이고 묘비가 줄지어 섰다. 북쪽 넓은 계단 위 거대한 골반뼈가 미켈라의 고치를 안고 있고, 피의 군주 모그가 그 앞에서 새 왕조의 탄생을 기다린다.',
    monsters: { normal: ['피의 귀족', '백금 인간', '썩은 시체 무리'], mid: '혈병의 큰 갈가마귀', boss: '피의 군주 모그' },
    info: { title: '장소 정보', en: 'COCOON OF THE EMPYREAN', rows: [['오는 길', '왕조 영묘 중턱 → 승강기 → 안개문'], ['뜰', '판석 바닥 · 핏물 고랑 두 줄 · 묘비와 불타는 아치 벽'], ['고치', '계단 위 단 · 골반뼈 요람 · 금 간 틈으로 늘어진 팔']] },
    sky: ['#3c2458', '#0a0718', '#b0305a'], stars: true,
    hemi: ['#c8a8d8', '#2a0c18', 0.56], sun: ['#ffb0b8', 0.46, [0.45, 1, 0.6]],
    day: { sky: ['#6a3a7a', '#24123a', '#ff7a8a'], stars: true, hemi: ['#ead0f0', '#3a1420', 0.66], sun: ['#ffd8e0', 0.62, [0.45, 1, 0.6]], haze: '#5a2a50' },
    liquid: ['#4a0610', '#9a0e1e', '#ff5a6a'], liqSpeed: 0.3,
    fog: { start: 0.8, floor: 16, depth: 12, haze: [24, 0.24, 12], hazeColor: '#4a1430' },
    camY: 16, zoom: 1.55,
    particles: [
      { n: 520, colors: ['#ff4a3a', '#ff8a5a', '#c8202e', '#ffb070'], mode: 'rise', speed: 0.8, area: [96, 100, 70], y0: 40, y1: 110, glow: true },
      { n: 300, colors: ['#ff4a5a', '#c8202e', '#ff9aa4'], mode: 'drift', speed: 0.3, wind: 0.4, y0: 30, y1: 120, glow: true },
      { n: 120, colors: ['#ffe0e8', '#ffb0c0'], mode: 'wisp', speed: 0.3, size: 2, area: [CX, CZ, 24], y0: 60 },
    ],
    blocks: {
      rock: { c: '#4a3a44', v: 0.07, pat: 'big' }, rockDk: { c: '#2e2230', v: 0.06, pat: 'stone' }, rockR: { c: '#5e3438', v: 0.07, pat: 'stone' },
      flag: { c: '#7e7078', top: '#a69aa2', v: 0.05, pat: 'stone' }, flag2: { c: '#706268', top: '#958890', v: 0.05, pat: 'stone' }, flagDk: { c: '#5a4e56', top: '#7a6c74', v: 0.05 },
      grout: { c: '#5e5058', top: '#857880', v: 0.04 }, rubble: { c: '#8a7c80', v: 0.08, pat: 'stone' },
      stone: { c: '#8a6a64', v: 0.05, pat: 'brick' }, stoneDk: { c: '#5e4644', v: 0.05, pat: 'brick' }, stoneR: { c: '#9a5a4e', v: 0.05, pat: 'brick' }, trim: { c: '#b49c90', v: 0.03 },
      col: { c: '#9a7a70', v: 0.04 }, colDk: { c: '#6e5450', v: 0.04 }, pier: { c: '#6a5452', v: 0.05, pat: 'big' }, pierL: { c: '#84685e', v: 0.05, pat: 'big' },
      grave: { c: '#b08a7c', v: 0.05 }, graveDk: { c: '#86665c', v: 0.05 }, graveC: { c: '#d0b0a0', v: 0.03 },
      pot: { c: '#7a4a3a', v: 0.06 }, potDk: { c: '#4e2e26', v: 0.06 },
      blood: { c: '#7a0a16', v: 0.05 }, bloodDk: { c: '#4a0610', v: 0.05 }, crack: { c: '#ff3a3a', glow: true },
      boneR: { c: '#c49484', v: 0.06, pat: 'big' }, boneRd: { c: '#9a6a5e', v: 0.06 }, web: { c: '#e0c8bc', v: 0.03 },
      cocoon: { c: '#eadcd4', v: 0.06, pat: 'big' }, cocoonDk: { c: '#c8b0a6', v: 0.06 }, cocoonR: { c: '#d0a098', v: 0.05 }, voidB: { c: '#120810', v: 0.02 }, heart: { c: '#ff4060', glow: true },
      arm: { c: '#efe6dc', v: 0.03 }, goldL: { c: '#ffe08a', glow: true },
      veil: { c: '#a88a80', v: 0.04 }, veilDk: { c: '#7a5e58', v: 0.04 }, eyeR: { c: '#ff3a2a', glow: true },
      fire: { c: '#ff4a2a', glow: true }, fire2: { c: '#ff8a4a', glow: true }, fire3: { c: '#ffc070', glow: true }, ember: { c: '#c82a1a', glow: true },
      iron: { c: '#2e282c', v: 0.03 }, wood: { c: '#4a3430', v: 0.06, pat: 'plank' },
      fogG: { c: '#fff0d0', glow: true }, grace: { c: '#ffe9a0', glow: true },
      // 이정표(OR.signpost)용
      stoneG: { c: '#4a3a40', v: 0.05 }, timber: { c: '#3e2a26', v: 0.05 }, door: { c: '#5a3e36', v: 0.05, pat: 'plank' }, gold: { c: '#ff9a5a', glow: true }, mlamp: { c: '#ffb070', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base;
      const AF = base + 10, DF = AF + 7, LK = base - 20;     // 뜰 바닥 · 고치 단 · 아래 피의 호수
      const X0 = 50, X1 = 142, NZ = 24, SZ = 164;             // 양옆 벽 · 북쪽 돌문 · 남쪽 벽
      const ST0 = 62, ST1 = 76;                               // 계단(북쪽 위 ST0, 남쪽 아래 ST1)
      // 영묘 꼭대기 바위 고원: 가장자리는 들쭉날쭉한 절벽으로 피의 호수까지 떨어진다
      const EG = new Float32Array(W * D);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) EG[x + W * z] = Math.max(44 - x, x - 148, 14 - z, z - 184) + (n.fbm(x * 0.07, z * 0.07, 3) - 0.5) * 8;
      const edge = (x, z) => (x < 0 || z < 0 || x >= W || z >= D) ? 99 : EG[x + W * z];
      MH.terrain(w, {
        floor: LK - 6,
        height: (x, z) => {
          const e = edge(x, z);
          if (e <= 0) return (z < ST0 && z >= 14 && x >= X0 - 4 && x <= X1 + 4) ? DF : AF;
          const top = z < ST0 ? DF : AF;
          return Math.max(LK - 3 + n.fbm(x * 0.05, z * 0.05, 2) * 3, top - 2 - e * 3.2 + n.ridge(x * 0.08, z * 0.08, 3) * 8 * Math.min(1, e / 6));
        },
        surface: (x, z, y, s) => edge(x, z) <= 0 ? ((x < X0 - 2 || x > X1 + 2 || z > SZ + 14) ? (hash3(x >> 1, 1, z >> 1) > 0.5 ? B.rubble : B.flagDk) : (hash3(x >> 2, 1, z >> 2) > 0.5 ? B.flag : B.flag2)) : (s >= 3 ? (hash3(x >> 1, 2, z >> 1) > 0.6 ? B.rockR : B.rock) : B.rockDk),
        under: (x, z, y, dep) => edge(x, z) <= 0 ? (dep < 2 ? B.stoneDk : B.rock) : (hash3(x >> 1, y >> 2, z >> 1) > 0.8 ? B.rockR : (dep < 3 ? B.rock : B.rockDk)),
      });
      MH.water(w, LK, (x, z) => edge(x, z) > 0);
      const lights = [], acts = [], landmarks = [];
      const gAt = (x, z) => MH.g(w, Math.round(x), Math.round(z));

      // ══ 뜰 바닥: 큼직한 판석(4칸 단위), 줄눈, 깨진 판, 잔돌 ══
      for (let z = NZ; z <= SZ; z++) for (let x = X0; x <= X1; x++) {
        const y = z < ST0 ? DF : AF; if (MH.g(w, x, z) !== y || (z >= ST0 && z <= ST1)) continue;
        const sx = (x + ((z >> 2) & 1) * 2) >> 2, sz = z >> 2, hv = hash3(sx, 5, sz);
        let b = hv > 0.66 ? B.flag : (hv > 0.2 ? B.flag2 : B.flagDk);
        if ((x + ((z >> 2) & 1) * 2) % 4 === 0 || z % 4 === 0) b = B.grout;
        w.set(x, y, z, b);
        if (hash3(x, 7, z) > 0.985) w.set(x, y + 1, z, B.rubble);
      }
      // 핏물 고랑 두 줄: 입구에서 계단 아래까지 곧게(콘셉트 아트의 붉은 두 줄)
      const grooves = [86, 106];
      for (const gx of grooves) for (let z = ST1 + 2; z <= SZ - 4; z++) { MH.setH(w, gx, z, AF - 1, B.blood, B.stoneDk); w.liquid(gx, z, AF); }
      // 고치 앞 핏물 웅덩이(첫 장면에서 모그가 피를 흘려 의식을 연다)
      const PX = CX, PZ = CZ + 13;
      for (let dz = -5; dz <= 5; dz++) for (let dx = -9; dx <= 9; dx++) if ((dx / 8.5) ** 2 + (dz / 4.2) ** 2 + n.fbm((PX + dx) * 0.3, (PZ + dz) * 0.3, 2) * 0.25 <= 1) { MH.setH(w, PX + dx, PZ + dz, DF - 1, B.bloodDk, B.stoneDk); w.liquid(PX + dx, PZ + dz, DF); }
      lights.push({ name: 'nave', p: [96.5, AF + 12, 112.5], c: '#ff3a3a', i: 0.12, d: 90, flicker: 0.25, srcR: 50 });

      // ══ 북쪽 넓은 계단(뜰 → 고치 단) ══
      MH.flight(w, { name: '고치 계단', axis: 'z', c: 96, half: 34, a: ST1, b: ST0, ha: AF, hb: DF, step: B.flag, edge: B.trim, fill: B.stoneDk });
      for (let z = ST0; z <= ST1; z++) for (const x of [61, 131]) { const g = MH.g(w, x, z); w.box(x, AF + 1, z, x, g + 1, z, B.stoneDk); w.set(x, g + 2, z, B.trim); }

      // ══ 고치 단: 낮은 축대 위 골반뼈 요람과 미켈라의 고치 ══
      const PB = DF + 4;                                      // 골반뼈 바닥
      w.box(CX - 22, DF + 1, CZ - 10, CX + 22, DF + 3, CZ + 8, B.stone);
      w.box(CX - 22, DF + 3, CZ + 8, CX + 22, DF + 3, CZ + 8, B.trim);
      for (let x = CX - 20; x <= CX + 20; x += 5) w.box(x, DF + 1, CZ + 9, x, DF + 2, CZ + 9, B.stoneDk);
      // 엉덩뼈 날개: 양옆으로 넓게 벌어진 껍데기
      for (const s of [-1, 1]) w.ellipsoid(CX + s * 13, PB + 6, CZ - 1, 7, 9, 10, B.boneR, (dx, dy, dz, d) => d > 0.7 && dx * s > -2 && dy > -8 && !(dy > 4 && dz > 3));
      for (const s of [-1, 1]) LB.tube(w, [[CX + s * 7, PB + 13, CZ - 9], [CX + s * 15, PB + 15, CZ - 5], [CX + s * 20, PB + 13, CZ + 2], [CX + s * 19, PB + 9, CZ + 6]], 1.3, B.boneR);       // 날개 위 테(장골능)
      // 엉치뼈(뒤): 위로 좁아지는 판, 구멍 줄
      for (let y = 0; y < 16; y++) { const hw = Math.round(7 - y * 0.32), zz = CZ - 10 - Math.round(y * 0.2); w.box(CX - hw, PB + y, zz - 1, CX + hw, PB + y, zz, y % 4 === 3 ? B.boneRd : B.boneR); }
      // 앞쪽 두덩 띠: 폐쇄 구멍 둘(Leda 장면의 두 검은 타원)과 가운데 결합 아래 아치
      for (let x = CX - 15; x <= CX + 15; x++) for (let y = PB - 1; y <= PB + 6; y++) for (let z = CZ + 8; z <= CZ + 10; z++) {
        const hole = [-7.5, 7.5].some(c => ((x - CX - c) / 4.2) ** 2 + ((y - PB - 2.6) / 2.4) ** 2 < 1);
        const arch = Math.abs(x - CX) < 2.2 && y < PB + 2;
        const curve = y > PB + 6 - Math.abs(x - CX) * 0.15 - (Math.abs(x - CX) > 11 ? (Math.abs(x - CX) - 11) * 1.4 : 0) + 2;
        if (hole || arch || curve) continue;
        w.set(x, y, z - Math.round(Math.max(0, Math.abs(x - CX) - 10) * 0.6), (z === CZ + 10 && hash3(x, y, 3) > 0.7) ? B.boneRd : B.boneR);
      }
      for (const c of [-7.5, 7.5]) for (let y = PB; y <= PB + 5; y++) for (let x = CX + c - 4; x <= CX + c + 4; x++) if (((x - CX - c) / 4.2) ** 2 + ((y - PB - 2.6) / 2.4) ** 2 < 1) w.set(Math.round(x), y, CZ + 7, B.voidB);
      // 고치(부품): 거칠고 구멍 숭숭한 커다란 알, 앞면을 위에서 아래로 가르는 검은 틈 — 뼈와 겹치는 칸은 비운다
      const CY = PB + 13, CR = 12.5;
      const coc = w.prop({ name: 'cocoon', pivot: [CX + 0.5, PB, CZ + 0.5], clipOK: 80 });
      const inCrack = (dx, dy, dz) => dz > 1 && Math.abs(dx - 1 - dy * 0.22 - Math.sin(dy * 0.5) * 0.8) < 1.6 + Math.max(0, dy) * 0.08 && dy > -7;
      coc.ellipsoid(CX, CY, CZ, CR, CR - 0.5, CR - 1, B.cocoon, (dx, dy, dz, d) => {
        const x = CX + dx, y = CY + dy, z = CZ + dz;
        if (w.get(x, y, z)) return false;
        if (inCrack(dx, dy, dz)) { if (d < 0.86) coc.set(x, y, z, B.voidB); return false; }
        if (d > 0.86 && hash3(x, y * 2, z) > 0.97) return false;                                       // 숭숭 뚫린 겉
        const h = n.fbm(x * 0.3, y * 0.3 + z * 0.2, 2);
        coc.set(x, y, z, h > 0.64 ? B.cocoonR : (h < 0.36 || dy < -7 ? B.cocoonDk : B.cocoon));
        return false;
      });
      for (let dy = -4; dy <= 8; dy += 3) { const dx = Math.round(1 + dy * 0.22), z = CZ + Math.round(Math.sqrt(Math.max(0, (CR - 1) ** 2 * (1 - (dy / CR) ** 2 - (dx / CR) ** 2))) - 1); coc.set(CX + dx, CY + dy, z, B.heart); }
      // 미켈라의 마른 팔: 틈 꼭대기에서 비어져 나와 앞으로 늘어진다
      const armPts = [[CX + 3, CY + 8, CZ + 7], [CX + 3.5, CY + 5, CZ + 10], [CX + 3, CY - 2, CZ + 11.5], [CX + 2.5, CY - 8, CZ + 12.5]];
      LB.tube(coc, armPts, t => 1.05 - t * 0.4, B.arm, { under: true });
      for (const [fx, fz] of [[-0.8, 0.3], [0, 0.8], [0.8, 0.2]]) { LB.tube(coc, [armPts[3], [CX + 2.5 + fx, CY - 10.5, CZ + 12.6 + fz]], 0.5, B.arm); coc.set(Math.round(CX + 2.5 + fx), CY - 11, Math.round(CZ + 12.6 + fz), B.goldL); }
      // 거미줄 같은 실가닥: 고치 아래에서 단 바닥으로
      for (const [ax, az, bx, bz] of [[-8, 4, -16, 15], [-4, 7, -6, 17], [6, 6, 10, 17], [9, 2, 19, 13], [-10, -2, -21, 4], [10, -3, 22, 2]]) LB.tube(w, [[CX + ax, CY - 6, CZ + az], [CX + (ax + bx) / 2, CY - 9, CZ + (az + bz) / 2], [CX + bx, DF + 1, CZ + bz]], 0.45, B.web, { under: true });
      lights.push({ name: 'cocoon', p: [CX + 2, CY + 2, CZ + 11], c: '#ff5070', i: 1.0, d: 30, flicker: 0.1, srcR: 6 });
      lights.push({ name: 'arm', p: [CX + 3, CY - 8, CZ + 14], c: '#ffe08a', i: 0.3, d: 12, flicker: 0.1, srcR: 4 });
      acts.push({
        name: '미켈라의 고치', hint: '골반뼈에 안긴 고치가 심장처럼 고동치고, 검은 틈에서 붉은 빛이 새어 나와요', hit: [CX - 9, PB + 2, CZ - 9, CX + 9, CY + 10, CZ + 9],
        run: async a => {
          a.flash('cocoon', 3.5, 5);
          for (let k = 0; k < 4; k++) {
            await a.tween('cocoon', { scl: [1.13, 1.11, 1.13], off: [0, 0.6, 0] }, 0.18); a.glow(1.6, 0.3);
            a.burst([CX + 1.5, CY + 2, CZ + 11], { n: 24, colors: ['#ff4060', '#c8202e', '#ff9aa4'], speed: 2, up: 2, life: 1.2, gravity: 4, spread: 1.5 });
            await a.tween('cocoon', { scl: [1, 1, 1], off: [0, 0, 0] }, 0.42);
            await a.wait(0.35);
          }
        },
      });
      acts.push({
        name: '미켈라의 마른 팔', hint: '고치의 틈 밖으로 늘어진 마른 팔에서 금빛이 피어올라요', hit: [CX, CY - 11, CZ + 9, CX + 6, CY + 9, CZ + 15],
        run: async a => {
          a.flash('arm', 8, 4); a.glow(1.4, 4);
          for (let k = 0; k < 10; k++) { const p = armPts[k % 4]; a.burst([p[0] + 0.5, p[1], p[2] + 0.5], { n: 14, colors: ['#ffe9a0', '#fff6d0', '#ffd060'], speed: 0.8, up: 3, life: 2.2, gravity: -0.5, spread: 1.2 }); await a.wait(0.3); }
        },
      });
      landmarks.push({ name: '미켈라의 고치', note: '보스 · 피의 군주 모그', p: [CX + 0.5, CY + 26, CZ + 0.5], boss: true });

      // ══ 고치 뒤 큰 돌문: 네모난 기둥 둘과 이맛돌, 별하늘로 열려 있다 ══
      for (const s of [-1, 1]) {
        const x0 = CX + s * 17, x1 = CX + s * 25;
        w.box(Math.min(x0, x1), DF + 1, NZ - 6, Math.max(x0, x1), DF + 44, NZ + 1, B.pier);
        for (let y = DF + 1; y <= DF + 44; y += 6) w.box(Math.min(x0, x1), y, NZ + 2, Math.max(x0, x1), y, NZ + 2, B.pierL);
        w.box(Math.min(x0, x1) - 1, DF + 1, NZ - 7, Math.max(x0, x1) + 1, DF + 3, NZ + 3, B.stoneDk);
      }
      w.box(CX - 26, DF + 45, NZ - 6, CX + 26, DF + 50, NZ + 1, B.pier);
      w.box(CX - 26, DF + 45, NZ + 2, CX + 26, DF + 45, NZ + 2, B.pierL);
      LB.crumble(w, CX + 14, DF + 40, NZ - 7, CX + 27, DF + 51, NZ + 3, 0.5, 3, 11);
      // 홈 파인 큰 돌기둥
      const column = (x, z, h, broken, y0, salt) => {
        w.cyl(x, z, y0 + 1, y0 + 2, 3.8, B.colDk); w.cyl(x, z, y0 + 3, y0 + 3, 3.3, B.trim);
        for (let y = y0 + 4; y < y0 + 4 + h; y++) for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) {
          const d = Math.hypot(dx, dz); if (d > 3.05) continue;
          if (d > 2.3 && Math.abs(Math.sin(Math.atan2(dz, dx) * 6)) < 0.3) continue;            // 세로 홈
          w.set(x + dx, y, z + dz, (y - y0) % 8 === 0 ? B.colDk : B.col);
        }
        const top = y0 + 4 + h;
        if (broken) LB.crumble(w, x - 4, top - 5, z - 4, x + 4, top, z + 4, 0.45, 3, salt);
        else { w.cyl(x, z, top, top, 3.6, B.trim); w.box(x - 4, top + 1, z - 4, x + 4, top + 2, z + 4, B.colDk); }
        return top;
      };
      // 돌문 옆 뒷줄 기둥과 이맛돌 조각
      [[CX - 34, 32, 0], [CX - 44, 38, 1], [CX + 34, 32, 0], [CX + 44, 26, 1]].forEach(([x, h, br], k) => column(x, NZ - 2, h, br, DF, 20 + k));
      w.box(CX - 48, DF + 37, NZ - 5, CX - 30, DF + 39, NZ + 1, B.stoneDk); LB.crumble(w, CX - 50, DF + 36, NZ - 6, CX - 40, DF + 40, NZ + 2, 0.6, 2, 3);

      // ══ 양옆 무너진 아치 벽(2층 아치) — 벽 너머 아치마다 피의 불길 ══
      const fires = [];
      for (const [xw, dir] of [[X0, -1], [X1, 1]]) {
        for (let z = NZ + 6; z <= SZ; z++) {
          const top = xw === X0 ? AF + 24 + Math.round(n.fbm(xw * 0.1, z * 0.09, 3) * 16 - 4) : AF + 6 + Math.round(Math.max(0, n.fbm(xw * 0.1, z * 0.13, 3) - 0.35) * 40) + (z < 64 ? 14 : 0);
          const g0 = MH.g(w, xw, z);
          for (let y = g0 + 1; y <= top; y++) for (let t = 0; t <= 2; t++) w.set(xw + dir * t, y, z, (y % 9 === 0 || (y === g0 + 1)) ? B.trim : (hash3(xw >> 1, y >> 1, z >> 1) > 0.85 ? B.stoneR : (t === 1 ? B.stoneDk : B.stone)));
        }
        for (let z = NZ + 16; z <= SZ - 8; z += 12) {
          const g0 = MH.g(w, xw, z);
          LB.arch(w, { axis: 'z', c: xw - dir, u0: z, y0: g0 + 1, a: 3.5, h: 11, kind: 'round', fill: 0, frame: B.trim, depth: 4, dir });
          if (xw === X0) LB.arch(w, { axis: 'z', c: xw - dir, u0: z, y0: g0 + 17, a: 2.5, h: 6, kind: 'round', fill: 0, frame: B.trim, depth: 4, dir });
          // 아치 너머 바깥 턱에서 타오르는 불길(부품)
          const fx = xw + dir * 5, fg = MH.g(w, fx, z), name = 'fire' + fires.length;
          const pr = w.prop({ name, pivot: [fx + 0.5, fg + 1, z + 0.5], scl0: [1, 0.55, 1], clipOK: 40 });
          for (let y = 0; y < 16; y++) { const rr = 2.6 - y * 0.12; for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) { const d = Math.hypot(dx, dz) + hash3(dx + z, y, dz) * 0.9; if (d <= rr) pr.set(fx + dx, fg + 1 + y, z + dz, d < rr - 1.3 ? B.fire3 : (hash3(dx, y + z, dz) > 0.5 ? B.fire2 : B.fire)); } }
          fires.push([fx, fg, z, name]);
        }
        LB.crumble(w, Math.min(xw, xw + dir * 2), AF + 12, NZ, Math.max(xw, xw + dir * 2), AF + 44, SZ, 0.18, 2, xw);
      }
      for (const s of [-1, 1]) lights.push({ name: 'arcade', p: [96 + s * 50.5, AF + 8, 110.5], c: '#ff5a2a', i: 0.7, d: 46, flicker: 0.45, srcR: 50 });
      acts.push({
        name: '불타는 아치 회랑', hint: '양옆 아치 벽 너머의 피의 불길이 한꺼번에 치솟아요', hit: [X1 - 2, AF + 1, 106, X1 + 6, AF + 12, 114],
        run: async a => {
          a.flash('arcade', 3.2, 4); a.glow(1.5, 4);
          for (const [fx, fg, z, nm] of fires) { a.tween(nm, { scl: [1.2, 1.45, 1.2] }, 0.5); a.burst([fx + 0.5, fg + 10, z + 0.5], { n: 26, colors: ['#ff4a2a', '#ff8a4a', '#ffc070'], speed: 1.4, up: 9, life: 1.6, gravity: -0.4, spread: 2 }); await a.wait(0.12); }
          await a.wait(1.6);
          for (const f of fires) a.tween(f[3], { scl: [1, 0.55, 1] }, 1);
          await a.wait(1);
        },
      });

      // ══ 양옆 홈 파인 돌기둥 줄(몇은 부러졌다) ══
      const colZ = [];
      for (let z = 86; z <= 154; z += 12) colZ.push(z);
      colZ.forEach((z, k) => { column(64, z, 22 + (k * 7) % 12, k % 3 === 1, AF, k); column(128, z, 22 + (k * 5) % 12, k % 3 === 2, AF, k + 9); });
      for (const [z0, z1] of [[118, 128]]) LB.tube(w, [[70.5, AF + 3.3, z0], [74.5, AF + 3.3, z1]], 2.6, (x, y, z, t, dy, d) => d > 0.8 && hash3(x, y, z) > 0.6 ? B.colDk : B.col);
      // 단 양옆 높은 기둥
      [[66, 56], [126, 56]].forEach(([x, z], k) => column(x, z, 30 + k * 5, false, DF, 40 + k));

      // ══ 묘비 줄: 기둥 줄과 아치 벽 사이, 둥근 머리 판비와 새김 원판, 기울고 쓰러진 것도 ══
      const graves = [];
      const stele = (x, z, h, lean, face) => {
        const g = MH.g(w, x, z);
        w.box(x - 2, g + 1, z - 1, x + 2, g + 1, z + 1, B.graveDk);
        for (let y = 0; y < h; y++) { const o = y > h - 3 ? lean : 0; w.box(x - 1 + o, g + 2 + y, z, x + 1 + o, g + 2 + y, z, y === h - 1 ? B.graveDk : B.grave); }
        w.set(x + lean, g + 2 + h, z, B.grave);
        w.set(x, g + 2 + Math.floor(h / 2), z + face, B.graveC);
        graves.push([x, g + 2 + Math.floor(h / 2), z]);
      };
      for (const xa of [55, 137]) for (let z = 84; z <= 158; z += 5) {
        const x = xa, hv = hash3(x, z, 4);
        if (hv < 0.14) continue;
        if (hv > 0.9) { const g = MH.g(w, x, z); w.box(x - 2, g + 1, z - 1, x + 3, g + 1, z + 1, B.grave); w.set(x - 2, g + 1, z, B.graveC); continue; }       // 쓰러진 묘비
        stele(x, z, 4 + (hash3(x, z, 5) * 4 | 0), hv > 0.8 ? (x < 96 ? 1 : -1) : 0, 1);
      }
      for (const [x, z] of [[68, 30], [124, 30], [80, 60], [112, 60]]) stele(x, z, 5 + (hash3(x, 2, z) * 3 | 0), 0, 1);
      // 단지(항아리)들
      for (const [x, z] of [[75, 60], [117, 60], [71, 44], [121, 44], [104, 30], [86, 30], [56, 70], [136, 72], [59, 150], [133, 140]]) { const g = MH.g(w, x, z); w.cyl(x, z, g + 1, g + 2, 1.3, B.pot); w.cyl(x, z, g + 3, g + 3, 0.8, B.potDk); }
      lights.push({ name: 'graves', p: [55.5, AF + 6, 120.5], c: '#ff7050', i: 0.25, d: 30, flicker: 0.3, srcR: 30 });

      // ══ 고대 왕조 석상: 단 양옆 받침 위, 두건 쓴 수염 난 노인 — 눈이 붉게 빛난다 ══
      const eyes = [];
      for (const s of [-1, 1]) {
        const x = CX + s * 40, z = CZ - 6, g = DF;
        w.box(x - 3, g + 1, z - 3, x + 3, g + 5, z + 3, B.stoneDk); w.box(x - 3, g + 6, z - 3, x + 3, g + 6, z + 3, B.trim);
        for (let y = 0; y < 16; y++) w.cyl(x, z, g + 7 + y, g + 7 + y, 3.1 - y * 0.08, y % 4 ? B.veil : B.veilDk);           // 옷자락
        w.ellipsoid(x, g + 25, z, 2.4, 2.8, 2.4, B.veil);                                                                       // 두건
        for (let y = 0; y < 6; y++) w.box(x - 1, g + 23 - y, z + 2, x + 1, g + 23 - y, z + 2 + (y > 2 ? 1 : 0), B.veilDk);          // 수염
        w.set(x - 1, g + 25, z + 2, B.voidB); w.set(x + 1, g + 25, z + 2, B.voidB);
        w.set(x - 1, g + 25, z + 3, B.eyeR); eyes.push([x - 1, g + 25, z + 3]); w.set(x + 1, g + 25, z + 3, 0);
        for (let y = 0; y < 5; y++) w.box(x - 3, g + 14 + y, z + 2, x + 3, g + 14 + y, z + 3, y === 4 ? B.veil : B.veilDk);        // 가슴에 모은 팔
      }
      lights.push({ name: 'statue', p: [CX - 39.5, DF + 25, CZ - 2.5], c: '#ff3a2a', i: 0.3, d: 14, flicker: 0.2, srcR: 4 });
      lights.push({ name: 'statue', p: [CX + 40.5, DF + 25, CZ - 2.5], c: '#ff3a2a', i: 0.3, d: 14, flicker: 0.2, srcR: 4 });
      acts.push({
        name: '고대 왕조의 석상', hint: '단 양옆 두건 쓴 고대 왕조 석상의 한쪽 눈이 붉게 빛나요', hit: [CX + 36, DF + 6, CZ - 10, CX + 44, DF + 28, CZ - 2],
        run: async a => { a.flash('statue', 8, 4); for (let k = 0; k < 8; k++) { for (const e of eyes) a.burst([e[0] + 0.5, e[1] + 0.5, e[2] + 1], { n: 10, colors: ['#ff3a2a', '#ff8a5a', '#ffd0c0'], speed: 1, up: 1.5, life: 1.2, gravity: -0.3, spread: 0.5 }); await a.wait(0.4); } },
      });

      // ══ 뜰 한가운데: 셋, 둘, 하나… 무 / 피의 불꽃 / 날개 ══
      const RX = 96, RZ = 112;
      acts.push({
        name: '셋, 둘, 하나… 무', hint: '뜰 한가운데 붉은 고리가 셋 맺히고, “무(無)!” 하는 순간 피가 터져 나가요', hit: [RX - 5, AF, RZ - 5, RX + 5, AF + 2, RZ + 5],
        run: async a => {
          for (let k = 0; k < 3; k++) {
            for (let q = 0; q < 20; q++) { const t = q / 20 * Math.PI * 2, R = 3 + k * 1.5; a.burst([RX + 0.5 + Math.cos(t) * R, AF + 2 + k * 1.2, RZ + 0.5 + Math.sin(t) * R], { n: 4, colors: ['#ff2a3a', '#ff8a9a'], speed: 0.3, up: 0.2, life: 1.6, gravity: 0, spread: 0.2 }); }
            await a.wait(0.7);
          }
          a.flash('nave', 16, 1.2); a.glow(1.9, 1.2);
          for (let r = 0; r < 5; r++) {
            const R = 4 + r * 7;
            for (let q = 0; q < 18; q++) { const t = q / 18 * Math.PI * 2; a.burst([RX + 0.5 + Math.cos(t) * R, AF + 1.5, RZ + 0.5 + Math.sin(t) * R], { n: 8, colors: ['#ff2a3a', '#a80e1e', '#ff8a9a'], speed: 3, up: 3, life: 1, gravity: 5, spread: 1.4 }); }
            await a.wait(0.12);
          }
          await a.wait(0.6);
        },
      });
      const flames = [];
      for (let k = 0; k < 5; k++) {
        const t = -Math.PI / 2 + (k - 2) * 0.42, name = 'bflame' + k, pr = w.prop({ name, pivot: [RX + 0.5, AF + 1, RZ + 0.5], scl0: [0, 0, 0] });
        for (let s = 4; s <= 40; s++) {
          const x = Math.round(RX + Math.cos(t) * s * 0.75 + Math.sin(s * 0.45 + k) * 1.4), z = Math.round(RZ + Math.sin(t) * s * 0.75 + s * 0.0), g = MH.g(w, x, z);
          if (z < ST1 + 2 || g < AF - 1 || g > AF || w.get(x, AF + 1, z)) continue;
          const h = 1 + (hash3(x, k, z) * 3 | 0);
          for (let y = 1; y <= h; y++) pr.set(x, AF + y, z, y === h ? B.fire2 : B.fire);
          if (hash3(x, k, z) > 0.5) pr.set(x + 1, AF + 1, z, B.ember);
        }
        flames.push(name);
      }
      acts.push({
        name: '피의 불꽃', hint: '모그가 삼지창으로 바닥을 긁으면 판석을 따라 피의 불꽃이 다섯 갈래로 번져요', hit: [RX - 4, AF, RZ - 10, RX + 4, AF + 3, RZ - 3],
        run: async a => {
          a.flash('nave', 10, 4.4); a.glow(1.6, 4.4);
          for (const f of flames) { a.tween(f, { scl: [1, 1, 1] }, 0.5); await a.wait(0.18); }
          for (let k = 0; k < 6; k++) { a.burst([RX + 0.5, AF + 2, RZ - 6], { n: 30, colors: ['#ff4a3a', '#ff8a5a', '#c8202e'], speed: 6, up: 3, life: 1.2, gravity: 1, spread: 3 }); await a.wait(0.3); }
          await a.wait(1.2);
          for (const f of flames) a.tween(f, { scl: [0, 0, 0] }, 0.8);
          await a.wait(0.9);
        },
      });
      // 2단계: 검은 날개를 펴고 날아올라 핏빛 비를 뿌린다(날개 그림자만 — 깃털과 피의 비)
      const wingSpots = [[96, 128], [80, 104], [112, 98], [90, 140], [104, 118], [76, 132], [116, 136]];
      acts.push({
        name: '피의 군주의 날개', hint: '“무!”를 외친 모그가 검은 깃털 날개를 펴고 솟구쳐, 뜰 위로 핏빛 비와 불꽃이 쏟아져요', hit: [RX - 6, AF, RZ + 14, RX + 6, AF + 3, RZ + 22],
        run: async a => {
          a.flash('nave', 8, 5); a.glow(1.5, 5);
          for (let k = 0; k < 6; k++) { const t = k / 5 * Math.PI; a.burst([RX + 0.5 + Math.cos(t) * 14, AF + 22 + Math.sin(t) * 6, RZ + 18], { n: 30, colors: ['#1a1418', '#3a2a30', '#5a1a22'], speed: 2.5, up: 1, life: 2, gravity: 2, spread: 3 }); await a.wait(0.12); }
          for (let r = 0; r < 4; r++) {
            for (const [x, z] of wingSpots) { a.burst([x + r * 2, AF + 34, z - r * 3], { n: 14, colors: ['#c8202e', '#ff4a5a'], speed: 0.5, up: -2, life: 2.6, gravity: 12, spread: 5 }); a.burst([x + r * 2, AF + 1, z - r * 3], { n: 16, colors: ['#ff4a2a', '#ffb070'], speed: 2, up: 5, life: 1, gravity: 3, spread: 2 }); }
            await a.wait(0.6);
          }
        },
      });
      landmarks.push({ name: '고치의 방', note: '피의 군주 모그와 싸우는 지붕 없는 신전 뜰', p: [RX + 0.5, AF + 34, RZ + 0.5] });

      // ══ 남쪽: 무너진 남벽의 안개문과 승강기(영묘 중턱에서 올라온다) ══
      for (let x = X0; x <= X1; x++) {
        if (Math.abs(x - 96) <= 7) continue;
        const top = AF + 3 + Math.round(n.fbm(x * 0.12, 7.7, 2) * 8) + Math.max(0, 12 - Math.abs(x - 96));
        for (let y = AF + 1; y <= top; y++) for (let z = SZ; z <= SZ + 2; z++) w.set(x, y, z, y % 9 === 0 ? B.trim : (z === SZ + 1 ? B.stoneDk : B.stone));
      }
      for (const x of [88, 104]) { w.box(x - 1, AF + 1, SZ - 1, x + 1, AF + 16, SZ + 3, B.pier); w.box(x - 2, AF + 17, SZ - 2, x + 2, AF + 18, SZ + 4, B.trim); }
      w.box(87, AF + 19, SZ - 1, 105, AF + 21, SZ + 3, B.pier);
      for (let x = 90; x <= 102; x++) for (let y = AF + 1; y <= AF + 14; y++) if (hash3(x, y, 13) > 0.55) w.set(x, y, SZ + 1, B.fogG);
      lights.push({ name: 'fog', p: [96.5, AF + 6, SZ - 0.5], c: '#fff0d0', i: 0.5, d: 14, flicker: 0.2 });
      // 승강기: 남벽 밖 턱에 뚫린 승강로, 판이 영묘 중턱으로 오르내린다
      const LX0 = 92, LX1 = 100, LZ0 = 170, LZ1 = 177;
      for (let z = LZ0 - 1; z <= LZ1 + 1; z++) for (let x = LX0 - 1; x <= LX1 + 1; x++) {
        const rim = x === LX0 - 1 || x === LX1 + 1 || z === LZ0 - 1 || z === LZ1 + 1;
        if (rim) { MH.setH(w, x, z, AF, B.trim, B.stoneDk); continue; }
        for (let y = LK; y <= AF + 2; y++) w.set(x, y, z, 0);
        w.set(x, LK - 1, z, B.stoneDk);
      }
      for (let z = SZ + 3; z < LZ0 - 1; z++) for (let x = LX0 - 1; x <= LX1 + 1; x++) MH.setH(w, x, z, AF, (x + z) & 1 ? B.flag : B.flag2, B.stoneDk);
      for (const [x, z] of [[LX0 - 1, LZ1 + 1], [LX1 + 1, LZ1 + 1], [LX0 - 1, LZ0 - 1], [LX1 + 1, LZ0 - 1]]) { w.box(x, AF + 1, z, x, AF + 11, z, B.iron); }
      w.box(LX0 - 1, AF + 12, LZ0 - 1, LX1 + 1, AF + 12, LZ1 + 1, B.iron);
      w.box(96, AF + 13, (LZ0 + LZ1) >> 1, 96, AF + 13, (LZ0 + LZ1) >> 1, B.iron);
      const pulley = w.prop({ name: 'pulley', pivot: [96.5, AF + 16.5, (LZ0 + LZ1) / 2 + 0.5], axis: 'z' });
      for (let k = 0; k < 40; k++) { const t = k / 40 * Math.PI * 2; pulley.set(Math.round(96 + Math.cos(t) * 2.2), Math.round(AF + 16 + Math.sin(t) * 2.2), Math.round((LZ0 + LZ1) / 2), B.iron); }
      pulley.set(96, AF + 16, Math.round((LZ0 + LZ1) / 2), B.wood);
      const lift = w.prop({ name: 'lift', pivot: [96.5, AF, (LZ0 + LZ1) / 2 + 0.5], clipOK: 10 });
      lift.box(LX0, AF, LZ0, LX1, AF, LZ1, B.wood); lift.walls(LX0, AF - 1, LZ0, LX1, AF - 1, LZ1, B.iron);
      lift.box(LX1, AF + 1, LZ1, LX1, AF + 3, LZ1, B.iron); lift.set(LX1, AF + 4, LZ1, B.mlamp);
      lights.push({ name: 'lift', p: [LX1 + 0.5, AF + 4, LZ1 + 0.5], c: '#ffb070', i: 0.4, d: 14, flicker: 0.3 });
      acts.push({
        name: '영묘 승강기', hint: '고치의 방 남쪽 턱의 승강판이 영묘 중턱까지 내려갔다가 다시 올라와요', hit: [LX0, AF - 1, LZ0, LX1, AF + 4, LZ1],
        run: async a => {
          a.burst([96.5, AF + 1, LZ0 + 3], { n: 20, colors: ['#ffd8a8', '#ffffff'], speed: 2, up: 1, life: 1, gravity: 2, spread: 3 });
          const dn = a.move('lift', [0, -5, 0], 2); a.turn('pulley', [0, 0, -4], 2); await dn;
          await a.wait(1);
          const up = a.move('lift', [0, 0, 0], 2); a.turn('pulley', [0, 0, 0], 2); await up;
          a.flash('fog', 4, 2);
        },
      });
      {
        const sx = 106, sz = 172, sp = OR.signpost(w, B, sx, sz, { dir: [1, 0], boards: 1, h: 6 });
        acts.push(OR.goAct({ at: sp, name: '왕조 영묘로', goto: 'mohgwyn-sub', hint: '승강기를 타고 영묘 중턱으로 내려가, 피의 호수 위에 솟은 모그윈 왕조 영묘와 큰 계단을 둘러봐요' }));
        landmarks.push({ name: '영묘 승강기', note: '영묘 중턱에서 올라오는 길 · 하위 지도', p: [96.5, AF + 20, 173.5] });
      }

      // ══ 보스를 쓰러뜨리면: 계단 아래 오른쪽에 고치의 방 축복 ══
      const gx = 112, gz = ST1 + 3, gp = LB.grace(w, gx, gAt(gx, gz), gz, B.grace);
      lights.push({ name: 'grace', p: gp, c: '#ffe08a', i: 0.9, d: 10, flicker: 0.1 });
      acts.push(LB.graceAct({ name: '고치의 방 축복', at: gp, to: [CX + 0.5, CY + 10, CZ + 0.5], arc: 16, steps: 22, hint: '모그가 쓰러지면 계단 아래에 축복이 피어나고, 금빛이 계단 위 고치로 이어져요' }));

      // ══ 풍경: 바닥 잔해, 부서진 돌 토막, 절벽의 붉은 불빛 ══
      for (let i = 0; i < 70; i++) {
        const x = w.ri(X0 + 4, X1 - 4), z = w.ri(ST1 + 3, SZ - 3), g = MH.g(w, x, z);
        if (g !== AF || w.get(x, g + 1, z) || Math.abs(x - 96) < 14 || grooves.some(q => Math.abs(x - q) < 3)) continue;
        if (i % 3 === 0) w.box(x, g + 1, z, x + 1, g + 1 + (i % 2), z + (i % 4 ? 0 : 1), B.rubble); else w.set(x, g + 1, z, B.rubble);
      }
      MH.scatter(w, 900, (x, g, z, b) => { if ((b === B.rock || b === B.rockDk) && g > LK + 4 && hash3(x, 3, z) > 0.86) w.set(x, g + 1, z, hash3(x, 4, z) > 0.5 ? B.ember : B.rockR); });
      lights.push({ name: 'lake', p: [96.5, LK + 4, 186.5], c: '#ff3a4a', i: 0.5, d: 60, flicker: 0.3, srcR: 60 });
      return { lights, landmarks, acts };
    },
  });
})();
