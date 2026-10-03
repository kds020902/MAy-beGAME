// 모그윈 왕조 영묘(하위 지도) — 피의 호수 서쪽에 솟은 바위 언덕을 층층이 깎아 만든 영묘. 호숫가 입구 축복에서 큰 계단을 오르면
// 묘비가 늘어선 첫째 단과 바위 무덤 문, 다시 계단을 오르면 돌기둥과 고대 왕조 석상이 선 중턱 단, 그 위 꼭대기에 고치의 방(모그윈 왕조의 상위 지도)이 별하늘 아래 열려 있다.
// 좌표: +x 동쪽, +z 남쪽. 기본 시점(남동쪽)에서 보면 피의 호수가 앞(아래), 영묘 언덕이 가운데, 꼭대기 신전이 화면 위쪽.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 176, D = 176, Hh = 160;
  MAPS.push({
    id: 'mohgwyn-sub', cat: 'lands', sub: true, parent: 'mohgwyn', name: '모그윈 왕조 영묘', en: 'Mohgwyn Dynasty Mausoleum', color: '#c8283a', seed: 777, base: 30, time: 'night', size: [W, D, Hh],
    desc: '빛 없는 땅속 깊은 곳, 피의 호수 서쪽에 바위 언덕이 솟아 있고 그 비탈을 층층이 깎아 모그윈 왕조의 영묘를 세웠다. 호숫가 축복에서 큰 계단을 오르면 묘비가 늘어선 단과 바위에 새긴 무덤 문이 나오고, 더 오르면 돌기둥 사이에 고대 왕조 석상이 서 있다. 석상 옆 승강기가 꼭대기 고치의 방으로 이어진다.',
    info: { title: '장소 정보', en: 'MOHGWYN DYNASTY MAUSOLEUM', rows: [['오르는 길', '피의 호수 → 왕조 영묘 입구 축복 → 큰 계단'], ['첫째 단', '묘비 무덤 · 바위에 새긴 무덤 문 · 세 아치'], ['중턱 단', '돌기둥 줄 · 고대 왕조 석상 · 승강기 → 고치의 방']] },
    sky: ['#3c2458', '#0a0718', '#b0305a'], stars: true,
    hemi: ['#c8b0e0', '#2a0c18', 0.58], sun: ['#e8c0e0', 0.44, [0.45, 1, 0.6]],
    day: { sky: ['#6a3a7a', '#24123a', '#ff7a8a'], stars: true, hemi: ['#ead8f4', '#3a1420', 0.68], sun: ['#ffe0ea', 0.6, [0.45, 1, 0.6]], haze: '#5a2a50' },
    liquid: ['#3a0610', '#741020', '#d84a5a'], liqSpeed: 0.3,
    fog: { start: 0.82, floor: 28, depth: 6, haze: [36, 0.22, 10], hazeColor: '#5a1838' },
    camY: 40, zoom: 1.45,
    particles: [
      { n: 420, colors: ['#ff4a5a', '#c8202e', '#ff9aa4'], mode: 'drift', speed: 0.3, wind: 0.3, y0: 32, y1: 90, glow: true },
      { n: 260, colors: ['#ff4a2a', '#ff8a4a', '#ffb070'], mode: 'rise', speed: 0.7, area: [62, 62, 40], y0: 50, y1: 130, glow: true },
      { n: 140, colors: ['#e8e0ff', '#ffd0e0'], mode: 'wisp', speed: 0.25, size: 2, area: [120, 120, 50], y0: 34 },
    ],
    blocks: {
      rock: { c: '#5a4a52', v: 0.07, pat: 'big' }, rockDk: { c: '#3a2e36', v: 0.06, pat: 'stone' }, rockR: { c: '#6e4044', v: 0.07, pat: 'stone' }, rockL: { c: '#8e8890', v: 0.06, pat: 'big' },
      white: { c: '#c8c4c4', v: 0.05, pat: 'big' }, whiteDk: { c: '#9a9494', v: 0.05 },
      grass: { c: '#4a5a3a', top: '#5e6e44', v: 0.08 }, grassR: { c: '#5a3a34', top: '#7a3a36', v: 0.08 }, mud: { c: '#3a2224', top: '#4a2024', v: 0.1 },
      flag: { c: '#7e7078', top: '#a69aa2', v: 0.05, pat: 'stone' }, flag2: { c: '#706268', top: '#958890', v: 0.05, pat: 'stone' },
      stone: { c: '#8a6a64', v: 0.05, pat: 'brick' }, stoneDk: { c: '#5e4644', v: 0.05, pat: 'brick' }, stoneR: { c: '#9a5a4e', v: 0.05, pat: 'brick' }, trim: { c: '#b49c90', v: 0.03 },
      col: { c: '#9a7a70', v: 0.04 }, colDk: { c: '#6e5450', v: 0.04 }, pier: { c: '#6a5452', v: 0.05, pat: 'big' }, pierL: { c: '#84685e', v: 0.05, pat: 'big' },
      grave: { c: '#b08a7c', v: 0.05 }, graveDk: { c: '#86665c', v: 0.05 }, graveC: { c: '#d0b0a0', v: 0.03 },
      veil: { c: '#a88a80', v: 0.04 }, veilDk: { c: '#7a5e58', v: 0.04 }, eyeR: { c: '#ff3a2a', glow: true },
      voidB: { c: '#120810', v: 0.02 }, ember: { c: '#ff4a2a', glow: true }, ember2: { c: '#ff8a4a', glow: true }, goldW: { c: '#ffc070', glow: true },
      leafR: { c: '#a82a2a', v: 0.12 }, leafR2: { c: '#7a1a20', v: 0.12 }, trunk: { c: '#3a2a2a', v: 0.05 },
      iron: { c: '#2e282c', v: 0.03 }, wood: { c: '#4a3430', v: 0.06, pat: 'plank' },
      grace: { c: '#ffe9a0', glow: true },
      // 이정표(OR.signpost)용
      stoneG: { c: '#4a3a40', v: 0.05 }, timber: { c: '#3e2a26', v: 0.05 }, door: { c: '#5a3e36', v: 0.05, pat: 'plank' }, gold: { c: '#ff9a5a', glow: true }, mlamp: { c: '#ffb070', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, sst = MH.sstep;
      const LK = base, T1 = base + 18, T2 = base + 38, T3 = base + 60;      // 호수면 · 첫째 단 · 중턱 단 · 꼭대기
      // 층마다 중심을 북서쪽으로 조금씩 옮긴 겹 원: 앞(남동)으로 갈수록 단이 넓다
      const C3 = [54, 50, 17], C2 = [58, 56, 27], C1 = [64, 62, 40];
      const rd = (c, x, z, k, bk) => Math.hypot(x - c[0], z - c[1]) + (n.fbm(x * 0.06 + k, z * 0.06, 3) - 0.5) * 14 - c[2] + Math.max(0, (c[0] - x + c[1] - z) / 1.4) * (bk || 0);
      const ZN = new Uint8Array(W * D), HF = new Float32Array(W * D);      // 0 호수 1 첫째 단 2 중턱 3 꼭대기 4 절벽
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const i = x + W * z, r3 = rd(C3, x, z, 1, 0), r2 = rd(C2, x, z, 5, 0.5), r1 = rd(C1, x, z, 9, 0.9);
        let h, zn;
        if (r3 < 0) { zn = 3; h = T3; }
        else if (r3 < 3) { zn = 4; h = T3 - r3 * 7 + n.ridge(x * 0.12, z * 0.12, 2) * 2; }
        else if (r2 < 0) { zn = 2; h = T2; }
        else if (r2 < 3) { zn = 4; h = T2 - r2 * 7 + n.ridge(x * 0.12, z * 0.12, 2) * 2; }
        else if (r1 < 0) { zn = 1; h = T1; }
        else if (r1 < 6) { zn = 4; h = T1 - r1 * 3.4 + n.ridge(x * 0.1, z * 0.1, 3) * 3; }
        else {
          zn = 0; h = LK - 3 + n.fbm(x * 0.05, z * 0.05, 3) * 2.4;
          const isl = n.fbm(x * 0.06 + 20, z * 0.06, 3);
          if (isl > 0.62) h = LK + 1 + (isl - 0.62) * 10;                     // 풀 섬, 흰 바위 둔덕
          // 북쪽·동쪽 가장자리: 바위 벽(호수를 둘러싼 동굴 벽)
          const wall = Math.max(0, 14 - x) * 3 + Math.max(0, 12 - z) * 3 + Math.max(0, x - 164) * 3;
          if (wall > 0) h = Math.max(h, LK + wall * 0.8 + n.ridge(x * 0.08, z * 0.08, 3) * 8);
        }
        // 북쪽 언덕 뒤는 바위로 이어 붙인다
        if (zn === 0 && x < 70 && z < 40) h = Math.max(h, T1 - 6 + n.ridge(x * 0.07, z * 0.07, 3) * 10 - Math.max(0, z - 20) * 0.6);
        ZN[i] = zn; HF[i] = Math.min(Hh - 24, Math.max(LK - 6, h));
      }
      const zone = (x, z) => (x < 0 || z < 0 || x >= W || z >= D) ? 0 : ZN[x + W * z];
      MH.terrain(w, {
        floor: LK - 8,
        height: (x, z) => HF[x + W * z],
        surface: (x, z, y, s) => {
          const zn = zone(x, z);
          if (zn === 4 || s >= 3) return hash3(x >> 1, y >> 1, z >> 1) > 0.82 ? B.rockR : (hash3(x, 2, z) > 0.5 ? B.rock : B.rockDk);
          if (zn === 0) return y > LK ? (n.fbm(x * 0.12, z * 0.12, 2) > 0.5 ? B.grass : (hash3(x >> 1, 3, z >> 1) > 0.6 ? B.white : B.grassR)) : B.mud;
          return n.fbm(x * 0.15, z * 0.15, 2) > 0.62 ? B.grass : (hash3(x >> 2, 4, z >> 2) > 0.5 ? B.flag : B.flag2);
        },
        under: (x, z, y, dep, s) => {
          const zn = zone(x, z);
          if (zn !== 0 && dep < 1 && s < 3) return B.rock;
          return hash3(x >> 1, y >> 2, z >> 1) > 0.86 ? B.rockR : ((y + (hash3(x >> 3, 0, z >> 3) * 3 | 0)) % 6 === 0 ? B.rockDk : B.rock);
        },
      });
      MH.water(w, LK, (x, z) => zone(x, z) === 0);
      const lights = [], acts = [], landmarks = [];
      const gAt = (x, z) => MH.g(w, Math.round(x), Math.round(z));
      const fly = async (a, from, to, arc, steps, colors, nn) => {
        for (let k = 1; k <= steps; k++) { const t = k / steps, p = LB.lerp3(from, to, t); p[1] += Math.sin(t * Math.PI) * arc; a.burst(p, { n: nn || 8, colors, speed: 0.6, up: 0.4, life: 1, gravity: 0, spread: 0.6 }); await a.wait(0.05); }
      };
      // 바위 틈마다 붉은 불빛(언덕 안쪽에서 새어 나오는 불)
      const glowSpots = [];
      for (let k = 0; k < 900; k++) {
        const x = w.ri(16, 110), z = w.ri(10, 110); if (zone(x, z) !== 4 || n.fbm(x * 0.09, z * 0.09 + 3, 2) < 0.58) continue;
        const g = MH.g(w, x, z); if (g < LK + 2) continue;
        for (let q = 0; q < 1 + (k % 4); q++) if (w.get(x, g - q, z)) w.set(x, g - q, z, hash3(x, k, z) > 0.4 ? B.ember : B.ember2); if (glowSpots.length < 40 && k % 3 === 0) glowSpots.push([x, g, z]);
      }

      // ══ 1. 피의 호수: 흰 돌기둥(굳은 나무줄기 같은 선돌), 붉은 잎 죽은 나무, 흰 바위 ══
      const monos = [];
      for (let k = 0; k < 80 && monos.length < 11; k++) {
        const x = w.ri(80, 170), z = w.ri(30, 168); if (zone(x, z) !== 0 || Math.hypot(x - 100, z - 112) < 16 || monos.some(m => Math.hypot(m[0] - x, m[1] - z) < 20)) continue;
        const h = w.ri(14, 40), lx = w.r(-0.15, 0.15), lz = w.r(-0.15, 0.15), r0 = w.r(1.8, 4.2);
        const g = MH.g(w, x, z);
        for (let y = -3; y < h; y++) { const r = r0 * (1 - y / (h * 1.6)); w.cyl(Math.round(x + lx * y), Math.round(z + lz * y), g + y, g + y, r, hash3(x, y >> 2, z) > 0.75 ? B.whiteDk : B.white); }
        if (k % 2) LB.crumble(w, x - 6, g + h - 5, z - 6, x + 6, g + h, z + 6, 0.5, 2, k);
        monos.push([x, z, g, h]);
      }
      for (let k = 0; k < 80; k++) {
        const x = w.ri(70, 170), z = w.ri(40, 170), g = MH.g(w, x, z); if (zone(x, z) !== 0 || g <= LK || w.get(x, g + 1, z)) continue;
        if (k % 3 === 0) MH.tree(w, x, g + 1, z, { kind: 'twisted', h: w.ri(7, 11), bark: B.trunk, leaves: [B.leafR, B.leafR2], r: 2.6, branches: 4 });
        else MH.rock(w, x, g, z, w.r(1.5, 3.2), k % 2 ? B.white : B.rockL, null);
      }
      lights.push({ name: 'lake', p: [124.5, LK + 3, 124.5], c: '#ff3a4a', i: 0.6, d: 80, flicker: 0.3, srcR: 60 });
      const splash = [[118, 128], [140, 112], [104, 150], [150, 146], [130, 96], [96, 132], [160, 128], [122, 160]];
      acts.push({
        name: '피의 호수', hint: '영묘를 둘러싼 얕은 피의 호수에 핏빛 물보라가 일고 붉은 안개가 번져요', hit: [126, LK - 1, 106, 134, LK + 2, 114],
        run: async a => {
          a.flash('lake', 3.5, 4); a.glow(1.4, 4);
          for (let k = 0; k < 3; k++) { for (const [x, z] of splash) a.burst([x + k * 2, LK + 1, z - k], { n: 18, colors: ['#ff2a3a', '#a80e1e', '#ff8a9a'], speed: 2, up: 5, life: 1.2, gravity: 8, spread: 2 }); await a.wait(0.5); }
          for (let q = 0; q < 24; q++) { const t = q / 24 * Math.PI * 2; a.burst([130 + Math.cos(t) * 12, LK + 1, 110 + Math.sin(t) * 12], { n: 6, colors: ['#ff4a5a', '#c8202e'], speed: 1.5, up: 0.5, life: 1, gravity: 2, spread: 0.6 }); await a.wait(0.03); }
        },
      });
      landmarks.push({ name: '피의 호수', note: '모그윈 궁을 채운 피', p: [130.5, LK + 16, 120.5] });

      // ══ 2. 호숫가 입구 축복과 영묘 큰 계단(첫째 단으로) ══
      const SX = 90, SZ0 = 108, SZ1 = 86;                                  // 계단: 아래 z=SZ0, 위 z=SZ1
      // 계단 자리를 절벽에 파고 양옆 축대를 세운다
      MH.flight(w, { name: '영묘 큰 계단', axis: 'z', c: SX, half: 3, a: SZ0, b: SZ1, ha: LK + 1, hb: T1, step: B.flag, edge: B.trim, fill: B.stoneDk, rail: B.stoneDk, post: B.trim, postGap: 4, clear: 9 });
      for (let z = SZ0 + 1; z <= SZ0 + 8; z++) for (let x = SX - 6; x <= SX + 6; x++) MH.setH(w, x, z, LK + 1, (x + z) & 1 ? B.flag : B.grass, B.rock);
      const egx = SX + 7, egz = SZ0 + 4, egp = LB.grace(w, egx, gAt(egx, egz), egz, B.grace);
      lights.push({ name: 'grace', p: egp, c: '#ffe08a', i: 0.9, d: 10, flicker: 0.1 });
      const crown = [56.5, T3 + 14, 50.5];
      acts.push(LB.graceAct({ name: '왕조 영묘 입구 축복', at: egp, to: crown, arc: 14, steps: 26, hint: '호숫가 풀밭의 축복이 큰 계단과 영묘 언덕 꼭대기의 고치의 방을 가리켜요' }));
      landmarks.push({ name: '왕조 영묘 입구', note: '큰 계단 아래 축복', p: [egp[0], egp[1] + 14, egp[2]] });
      acts.push({
        name: '영묘 큰 계단', hint: '호숫가에서 절벽을 타고 오르는 큰 계단에 아래부터 차례로 붉은 불빛이 번져요', hit: [SX - 3, LK + 8, 96, SX + 3, T1 - 4, 100],
        run: async a => {
          for (let z = SZ0; z >= SZ1; z--) { const g = gAt(SX, z); for (const dx of [-3, 0, 3]) a.burst([SX + dx + 0.5, g + 1.2, z + 0.5], { n: 5, colors: ['#ff6a4a', '#ffb070', '#ff3a3a'], speed: 0.6, up: 1.2, life: 1, gravity: -0.2, spread: 0.4 }); await a.wait(0.07); }
          a.burst([SX + 0.5, T1 + 2, SZ1 - 1], { n: 40, colors: ['#ffb070', '#ff6a4a'], speed: 2, up: 4, life: 1.2, gravity: 1, spread: 2 });
          await a.wait(0.6);
        },
      });

      // ══ 3. 첫째 단: 하늘을 우러르던 무덤 뜰 — 묘비 줄 ══
      const graves = [];
      for (let k = 0; k < 140 && graves.length < 26; k++) {
        const x = w.ri(30, 104), z = w.ri(56, 104); if (zone(x, z) !== 1 || Math.abs(x - SX) < 7 || Math.hypot(x - 74, z - 80) < 7 || graves.some(q => Math.hypot(q[0] - x, q[2] - z) < 5)) continue;
        if (x < 44 && z < 72) continue;
        const g = MH.g(w, x, z), h = 4 + (hash3(x, 1, z) * 4 | 0), lean = hash3(x, 2, z) > 0.8 ? 1 : 0, ax = hash3(x, 3, z) > 0.5;
        const P = (u, v) => ax ? [x + u, z + v] : [x + v, z + u];
        for (let u = -2; u <= 2; u++) for (const v of [-1, 0, 1]) { const [px, pz] = P(u, v); w.set(px, g + 1, pz, B.graveDk); }
        for (let y = 0; y < h; y++) for (let u = -1; u <= 1; u++) { const [px, pz] = P(u, y > h - 3 ? lean : 0); w.set(px, g + 2 + y, pz, y === h - 1 ? B.graveDk : B.grave); }
        { const [px, pz] = P(0, 0); w.set(px, g + 2 + h, pz, B.grave); const [cx, cz] = P(0, 1); w.set(cx, g + 1 + (h >> 1), cz, B.graveC); }
        graves.push([x, g + 2 + (h >> 1), z]);
      }
      lights.push({ name: 'graves', p: [64.5, T1 + 5, 88.5], c: '#ff7050', i: 0.35, d: 34, flicker: 0.35, srcR: 30 });
      acts.push({
        name: '왕조의 묘비', hint: '첫째 단 묘비들의 새김 원판이 하나씩 붉게 달아올라요. 썩은 시체들이 하늘을 우러르던 무덤 뜰이에요', hit: graves.length ? [graves[0][0] - 3, graves[0][1] - 5, graves[0][2] - 3, graves[0][0] + 3, graves[0][1] + 4, graves[0][2] + 3] : [60, T1, 84, 66, T1 + 6, 90],
        run: async a => { a.flash('graves', 5, 4); for (const p of graves) { a.burst([p[0] + 0.5, p[1] + 0.5, p[2] + 1.5], { n: 10, colors: ['#ff6a4a', '#ffb070', '#ff3a3a'], speed: 0.8, up: 2.5, life: 1.2, gravity: -0.3, spread: 0.6 }); await a.wait(0.1); } },
      });
      // 세 아치 잔해(첫째 단 앞, 큰 계단 위 서쪽)
      {
        const ax0 = 66, az = 92, g = MH.maxG(w, ax0 - 2, az - 1, ax0 + 18, az + 1);
        for (let x = ax0; x <= ax0 + 16; x++) for (let y = g + 1; y <= g + 14; y++) for (let z = az - 1; z <= az + 1; z++) w.set(x, y, z, y >= g + 13 ? B.trim : (y % 7 === 0 ? B.stoneDk : B.stone));
        for (let x = ax0 - 2; x <= ax0 + 18; x++) for (let z = az - 1; z <= az + 1; z++) for (let y = g - 4; y <= g; y++) if (!w.get(x, y, z)) w.set(x, y, z, B.stoneDk);
        for (const u of [ax0 + 3, ax0 + 8, ax0 + 13]) LB.arch(w, { axis: 'x', c: az - 1, u0: u, y0: g + 1, a: 1.6, h: 8, kind: 'round', fill: 0, frame: B.trim, depth: 3, dir: 1 });
        LB.crumble(w, ax0 + 10, g + 9, az - 2, ax0 + 17, g + 15, az + 2, 0.55, 3, 5);
        landmarks.push({ name: '세 아치', note: '첫째 단 앞의 무너진 회랑', p: [ax0 + 8.5, g + 26, az + 0.5] });
      }

      // ══ 4. 바위에 새긴 무덤 문: 중턱 단 아래 절벽 앞면(남쪽), 기둥과 박공, 검은 문 ══
      // 첫째 단 서남쪽에서 바로 북쪽이 중턱 절벽인 자리를 고른다
      let TX = 50, tz = 74, best = 1e9;
      for (let x = 38; x <= 64; x++) for (let z = 60; z <= 100; z++) {
        if ([-11, 0, 11].some(u => zone(x + u, z + 3) !== 1 || zone(x + u, z + 6) !== 1) || zone(x, z - 2) === 1) continue;
        const sc = Math.abs(x - 50) + Math.abs(z - 76) * 0.5; if (sc < best) { best = sc; TX = x; tz = z; }
      }
      const tg = T1;
      for (let x = TX - 11; x <= TX + 11; x++) for (let y = tg + 1; y <= tg + 19; y++) for (let z = tz - 3; z <= tz + 1; z++) w.set(x, y, z, z === tz + 1 ? (y % 6 === 0 ? B.trim : B.stoneR) : B.rock);
      for (const u of [-9, -5, 5, 9]) { w.box(TX + u, tg + 1, tz + 2, TX + u, tg + 12, tz + 2, B.col); w.set(TX + u, tg + 13, tz + 2, B.trim); }
      w.box(TX - 11, tg + 13, tz + 2, TX + 11, tg + 14, tz + 2, B.trim);
      for (let k = 0; k <= 3; k++) w.box(TX - 10 + k * 3, tg + 15 + k, tz + 2, TX + 10 - k * 3, tg + 15 + k, tz + 2, k === 3 ? B.trim : B.stone);
      w.box(TX - 3, tg + 1, tz - 2, TX + 3, tg + 10, tz + 2, B.voidB); for (const [dx, dy] of [[-1, 2], [1, 4], [0, 6], [2, 1], [-2, 5]]) w.set(TX + dx, tg + dy, tz - 2, B.ember);
      w.box(TX - 4, tg + 11, tz + 2, TX + 4, tg + 11, tz + 2, B.trim);
      for (const s of [-1, 1]) { w.box(TX + s * 7, tg + 1, tz + 3, TX + s * 7, tg + 6, tz + 3, B.grave); w.set(TX + s * 7, tg + 7, tz + 3, B.graveC); }
      lights.push({ name: 'tomb', p: [TX + 0.5, tg + 5, tz + 3.5], c: '#ff4a3a', i: 0.25, d: 18, flicker: 0.4, srcR: 6 });
      acts.push({
        name: '바위 무덤 문', hint: '바위에 새긴 무덤 문 안쪽 어둠에서 붉은 빛과 피의 귀족의 기척이 새어 나와요. 영묘 안을 지나야 중턱으로 나가요', hit: [TX - 4, tg + 1, tz - 1, TX + 4, tg + 11, tz + 4],
        run: async a => { a.flash('tomb', 10, 3.6); for (let k = 0; k < 8; k++) { a.burst([TX + 0.5, tg + 3 + (k % 4) * 2, tz + 2.5], { n: 16, colors: ['#ff2a3a', '#a80e1e', '#2a1018'], speed: 2, up: 1, life: 1.2, gravity: 0, spread: 1.5 }); await a.wait(0.3); } },
      });
      landmarks.push({ name: '영묘 안으로', note: '바위에 새긴 무덤 문', p: [TX + 0.5, tg + 30, tz + 2.5] });
      // 첫째 단 → 중턱 단 계단(언덕 가운데 틈)
      const S2X = 76, S2a = 82, S2b = 62;
      MH.flight(w, { name: '중턱 계단', axis: 'z', c: S2X, half: 2, a: S2a, b: S2b, ha: T1, hb: T2, step: B.flag2, edge: B.trim, fill: B.stoneDk, clear: 8 });

      // ══ 5. 중턱 단: 돌기둥 줄, 아치 안의 고대 왕조 석상, 중턱 축복, 승강기 ══
      const column = (x, z, h, broken, salt) => {
        const y0 = MH.g(w, x, z);
        w.cyl(x, z, y0 + 1, y0 + 1, 2.6, B.colDk);
        for (let y = y0 + 2; y < y0 + 2 + h; y++) for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) { const d = Math.hypot(dx, dz); if (d > 2.1 || (d > 1.5 && ((dx + dz + 8) & 1))) continue; w.set(x + dx, y, z + dz, (y - y0) % 7 === 0 ? B.colDk : B.col); }
        const top = y0 + 2 + h;
        if (broken) LB.crumble(w, x - 3, top - 4, z - 3, x + 3, top, z + 3, 0.45, 2, salt); else w.box(x - 2, top, z - 2, x + 2, top + 1, z + 2, B.colDk);
      };
      const colPts = [];
      for (let k = 0; k < 12; k++) { const a = -0.25 + k * 0.17, x = Math.round(C2[0] + Math.cos(a) * (C2[2] - 5)), z = Math.round(C2[1] + Math.sin(a) * (C2[2] - 5)); if (zone(x, z) !== 2 || Math.abs(x - S2X) < 5 || (Math.abs(x - 62) < 10 && z > 60) || Math.hypot(x - 66, z - 64) < 6) continue; colPts.push([x, z]); column(x, z, 14 + (k * 5) % 7, k % 3 === 1, k); }
      // 석상: 작은 계단 위 아치 문 안, 두건 쓴 수염 난 노인
      const STX = 62, STZ = 66, sg = MH.g(w, STX, STZ);
      w.box(STX - 5, sg + 1, STZ - 2, STX + 5, sg + 2, STZ + 2, B.stoneDk);
      for (let k = 0; k < 3; k++) w.box(STX - 4, sg + 1 + k, STZ + 3 + (2 - k), STX + 4, sg + 1 + k, STZ + 3 + (2 - k), B.flag);
      for (const s of [-1, 1]) { w.box(STX + s * 6, sg + 1, STZ - 2, STX + s * 7, sg + 20, STZ + 1, B.pier); }
      w.box(STX - 7, sg + 21, STZ - 2, STX + 7, sg + 23, STZ + 1, B.pier);
      LB.arch(w, { axis: 'x', c: STZ + 1, u0: STX, y0: sg + 3, a: 4.5, h: 16, kind: 'round', fill: 0, frame: B.trim, depth: 1 });
      for (let y = 0; y < 11; y++) w.cyl(STX, STZ, sg + 3 + y, sg + 3 + y, 2.2 - y * 0.06, y % 4 ? B.veil : B.veilDk);
      w.ellipsoid(STX, sg + 16, STZ, 1.8, 2.2, 1.8, B.veil);
      for (let y = 0; y < 4; y++) w.box(STX - 1, sg + 14 - y, STZ + 2, STX + 1, sg + 14 - y, STZ + 2, B.veilDk);
      w.set(STX - 1, sg + 16, STZ + 2, B.eyeR); w.set(STX + 1, sg + 16, STZ + 2, B.voidB);
      lights.push({ name: 'statue', p: [STX - 0.5, sg + 16.5, STZ + 3], c: '#ff3a2a', i: 0.35, d: 14, flicker: 0.2, srcR: 4 });
      acts.push({
        name: '고대 왕조 석상', hint: '아치 문 안에 선 고대 왕조 석상의 한쪽 눈이 붉게 빛나요. 발치의 상자에는 오래된 용의 대장장이 돌이 있었어요', hit: [STX - 3, sg + 3, STZ - 2, STX + 3, sg + 18, STZ + 3],
        run: async a => { a.flash('statue', 8, 3.6); for (let k = 0; k < 8; k++) { a.burst([STX - 0.5, sg + 16.5, STZ + 3], { n: 10, colors: ['#ff3a2a', '#ff8a5a', '#ffd0c0'], speed: 1, up: 1.5, life: 1.2, gravity: -0.3, spread: 0.5 }); await a.wait(0.4); } },
      });
      landmarks.push({ name: '고대 왕조 석상', note: '중턱 단 · 승강기 옆', p: [STX + 0.5, sg + 32, STZ + 0.5] });
      // 중턱 축복
      const mgx = 70, mgz = 60, mgp = LB.grace(w, mgx, gAt(mgx, mgz), mgz, B.grace);
      lights.push({ name: 'grace2', p: mgp, c: '#ffe08a', i: 0.9, d: 10, flicker: 0.1 });
      acts.push({
        name: '왕조 영묘 중턱 축복', hint: '석상 옆 중턱 단의 축복. 금빛이 승강기를 타고 꼭대기 고치의 방으로 올라가요', hit: [mgx - 2, mgp[1] - 3, mgz - 2, mgx + 2, mgp[1] + 2, mgz + 2],
        run: async a => { a.flash('grace2', 5, 3); a.burst(mgp, { n: 40, colors: ['#ffe9a0', '#ffd060', '#fff6d0'], speed: 2, up: 3, life: 1.6, gravity: -0.6, spread: 1.2 }); await fly(a, mgp, crown, 8, 20, ['#ffe9a0', '#ffd060']); a.flash('gate', 3, 2); await a.wait(1); },
      });
      landmarks.push({ name: '왕조 영묘 중턱', note: '보스방 앞 마지막 축복', p: [mgp[0], mgp[1] + 12, mgp[2]] });

      // ══ 6. 꼭대기: 고치의 방(상위 지도)의 겉모습 — 2층 네모 기둥 틀과 가운데 금빛 아치 문 ══
      const GX0 = 40, GX1 = 70, GZ0 = 38, GZ1 = 60;
      for (let x = GX0; x <= GX1; x++) for (let z = GZ0; z <= GZ1; z++) { if (MH.g(w, x, z) < T3 - 2) continue; MH.setH(w, x, z, T3, (x + z) & 1 ? B.flag : B.flag2, B.rock); }
      for (const [x0, z0, x1, z1] of [[GX0, GZ1, GX1, GZ1], [GX1, GZ0, GX1, GZ1], [GX0, GZ0, GX0, GZ1], [GX0, GZ0, GX1, GZ0]]) {
        const len = Math.max(x1 - x0, z1 - z0);
        for (let k = 0; k <= len; k++) {
          const x = x0 + (x1 > x0 ? k : 0), z = z0 + (z1 > z0 ? k : 0), pier = k % 6 === 0 || k === len;
          const topY = T3 + (pier ? 22 : 0) - (hash3(x, 7, z) > 0.75 && !pier ? 0 : 0);
          const ox = z0 === z1 ? 0 : (x0 === GX0 ? 1 : -1), oz = z0 === z1 ? (z0 === GZ0 ? 1 : -1) : 0;
          if (pier) w.box(Math.min(x, x + ox * 2), T3 + 1, Math.min(z, z + oz * 2), Math.max(x, x + ox * 2), T3 + 23, Math.max(z, z + oz * 2), B.pier);
          for (const yb of [T3 + 11, T3 + 12, T3 + 23, T3 + 24]) w.box(x, yb, z, x + ox, yb, z + oz, yb % 2 ? B.pierL : B.pier);
          if (!pier && (k % 6 === 3)) w.box(x, T3 + 13, z, x, T3 + 22, z, B.col);
          void topY;
        }
      }
      LB.crumble(w, GX0 - 1, T3 + 14, GZ0 - 1, GX0 + 12, T3 + 24, GZ1 + 1, 0.4, 3, 7);
      LB.crumble(w, GX1 - 8, T3 + 16, GZ0 - 1, GX1 + 1, T3 + 24, GZ0 + 6, 0.4, 3, 8);
      // 남쪽 가운데 금빛 아치 문
      const gateX = 56;
      w.box(gateX - 5, T3 + 1, GZ1 - 1, gateX + 5, T3 + 12, GZ1 + 1, B.pierL);
      LB.arch(w, { axis: 'x', c: GZ1 + 1, u0: gateX, y0: T3 + 1, a: 3, h: 8, kind: 'round', fill: B.goldW, frame: B.trim, depth: 3, dir: -1 });
      lights.push({ name: 'gate', p: [gateX + 0.5, T3 + 6, GZ1 + 2.5], c: '#ffb050', i: 0.8, d: 24, flicker: 0.2, srcR: 6 });
      landmarks.push({ name: '고치의 방', note: '영묘 꼭대기 · 피의 군주 모그', p: [56.5, T3 + 40, 49.5], boss: true });
      // 피의 불길이 꼭대기 테두리에서 새어 나온다
      for (const [x, z] of [[GX0 + 2, GZ1 - 2], [GX1 - 2, GZ1 - 3], [GX1 - 3, GZ0 + 3], [GX0 + 4, GZ0 + 2]]) for (let y = 1; y <= 5; y++) w.set(x, T3 + y, z, y > 3 ? B.ember2 : B.ember);

      // ══ 7. 승강기: 중턱 단에서 꼭대기 문 앞까지 열린 철골 승강로 ══
      const LX = 66, LZ = 64;                                                   // 승강판 가운데(석상 동쪽)
      const lg = MH.g(w, LX, LZ);
      for (const [dx, dz] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) w.box(LX + dx, lg + 1, LZ + dz, LX + dx, T3 + 6, LZ + dz, B.iron);
      for (let y = lg + 6; y <= T3 + 6; y += 8) { w.box(LX - 3, y, LZ - 3, LX + 3, y, LZ - 3, B.iron); w.box(LX - 3, y, LZ + 3, LX + 3, y, LZ + 3, B.iron); }
      for (let x = LX - 2; x <= LX + 2; x++) for (let z = LZ - 2; z <= LZ + 2; z++) for (let y = lg + 1; y <= T3 + 5; y++) w.set(x, y, z, 0);
      const lift = w.prop({ name: 'lift', pivot: [LX + 0.5, lg + 1, LZ + 0.5], clipOK: 10 });
      lift.box(LX - 2, lg + 1, LZ - 2, LX + 2, lg + 1, LZ + 2, B.wood); lift.set(LX + 2, lg + 2, LZ + 2, B.iron); lift.set(LX + 2, lg + 3, LZ + 2, B.mlamp);
      lights.push({ name: 'lift', p: [LX + 2.5, lg + 3, LZ + 2.5], c: '#ffb070', i: 0.4, d: 12, flicker: 0.3 });
      acts.push({
        name: '고치의 방 승강기', hint: '석상 옆 승강판이 철골 승강로를 따라 영묘 꼭대기 고치의 방 앞까지 올라갔다 내려와요', hit: [LX - 2, lg, LZ - 2, LX + 2, lg + 4, LZ + 2],
        run: async a => {
          const up = a.move('lift', [0, T3 - lg - 1, 0], 4); await up;
          a.flash('gate', 3, 1.6); a.burst([gateX + 0.5, T3 + 3, GZ1 + 3], { n: 30, colors: ['#ffe9a0', '#ffb050'], speed: 2, up: 3, life: 1.2, gravity: -0.3, spread: 2 });
          await a.wait(1.2);
          await a.move('lift', [0, 0, 0], 4);
        },
      });
      {
        const sx = 72, sz = 70, sp = OR.signpost(w, B, sx, sz, { dir: [1, 0], boards: 1, h: 6 });
        acts.push(OR.goAct({ at: sp, name: '고치의 방으로', goto: 'mohgwyn', hint: '석상 옆 승강기를 타고 영묘 꼭대기로 올라, 미켈라의 고치와 피의 군주 모그가 기다리는 고치의 방으로 가요' }));
      }

      // ══ 풍경: 첫째 단·호숫가 풀, 흰 돌, 붉은 꽃(피의 장미) ══
      MH.scatter(w, 2200, (x, g, z, b) => {
        const r = hash3(x, 11, z);
        if (b === B.grass && r < 0.25) w.set(x, g + 1, z, r < 0.05 ? B.leafR : B.grass);
        else if ((b === B.flag || b === B.flag2) && r < 0.05) w.set(x, g + 1, z, B.rockL);
      });
      return { lights, landmarks, acts };
    },
  });
})();
