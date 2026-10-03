// 도읍 로데일 · 엘데의 왕좌 — 여왕의 규방(하위 지도)에서 큰 계단을 오르면 황금 나무 밑동에 붙은 둥근 돌 테라스(보스방)가 나온다. (메인 보스: 축복왕 모르고트)
// 나무 밑동(북쪽)은 하얀 기둥과 엇갈린 뿌리 갈비로 대성당 정면처럼 깎였고, 가운데 좁은 틈의 계단 끝을 가시덤불이 막았다. 계단 발치의 낡은 나무 의자가 엘데의 왕좌.
// 좌표: +x 동쪽, +z 남쪽. 기본 시점(남동쪽)에서 보면 뒤(북)가 나무 밑동, 앞(남)이 큰 계단과 여왕의 규방 돔(하위 지도), 왼쪽 아래(남서) 도시에 황금 나무 대성당.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 192, D = 192, Hh = 144;
  const CX = 96, CZ = 100, R = 40;                             // 둥근 테라스
  const TX = 96, TZ = 0, TR = 56;                              // 황금 나무 밑동(북쪽 밖까지 이어진다)
  MAPS.push({
    id: 'leyndell', cat: 'lands', name: '도읍 로데일', en: 'Leyndell · Elden Throne', color: '#e0b84a', seed: 501, base: 52, time: 'day', size: [W, D, Hh],
    desc: '여왕의 규방에서 큰 계단을 오르면 황금 나무 밑동에 붙은 둥근 돌 테라스가 나온다. 나무 밑동은 하얀 기둥과 엇갈린 뿌리로 대성당처럼 깎였고, 가운데 계단 끝은 가시덤불이 막아 아무도 들이지 않는다. 그 계단 발치의 낡은 나무 의자가 엘데의 왕좌이며, 축복왕 모르고트가 마지막까지 이 자리를 지킨다.',
    monsters: { normal: ['로데일 기사', '신탁의 사자', '황금 나무의 화신'], mid: '첫 왕 고드프리(황금의 망령)', boss: '축복왕 모르고트' },
    sky: ['#f0dcb0', '#8a9ab8', '#fff0c8'], stars: false,
    hemi: ['#fff4dc', '#5a5040', 0.62], sun: ['#fff0d0', 0.8, [0.45, 1, 0.6]],
    night: { sky: ['#3a3040', '#0b0d1a', '#e8c070'], stars: true, hemi: ['#c8b4a0', '#201a14', 0.5], sun: ['#ffe0a0', 0.42, [0.45, 1, 0.6]], haze: '#3a3028' },
    liquid: ['#5a8aa0', '#8ac0d0', '#e8ffff'], liqSpeed: 0.6,
    fog: { start: 0.8, floor: 14, depth: 12, haze: [34, 0.25, 14], hazeColor: '#e8d8b8', top: 132, topDepth: 16 },
    camY: -12, zoom: 1.6,
    particles: [
      { n: 1100, colors: ['#ffd25a', '#f0b040', '#ffe9a0', '#e89a30'], mode: 'fall', speed: 0.45, wind: 0.5, y0: 30, y1: 140, glow: true },
      { n: 160, colors: ['#fff0b0', '#ffd870'], mode: 'rise', speed: 0.5, area: [CX, 50, 10], y0: 60, y1: 110, glow: true },
    ],
    blocks: {
      grass: { c: '#5e5434', top: '#8e8a4a', v: 0.1 }, soil: { c: '#5a4a34', v: 0.08 }, rock: { c: '#8a8070', v: 0.06, pat: 'big' }, rockDk: { c: '#6c6458', v: 0.06, pat: 'stone' },
      // 테라스 바닥: 회색 돌, 동심원 홈, 새김 판, 금빛 낙엽
      pave: { c: '#9a9488', top: '#bcb5a6', v: 0.05, pat: 'stone' }, pave2: { c: '#a39c8c', top: '#c6bfae', v: 0.05, pat: 'stone' },
      paveR: { c: '#7e786c', top: '#8e8778', v: 0.04 }, paveL: { c: '#cfc8b6', top: '#ddd6c4', v: 0.03 }, panelDk: { c: '#7a7468', top: '#9a9384', v: 0.03 },
      leaf: { c: '#c89420', top: '#eab638', v: 0.12 }, leaf2: { c: '#b8801c', top: '#d89a26', v: 0.12 },
      deadW: { c: '#4a3e34', v: 0.08 }, deadW2: { c: '#5e5044', v: 0.08 },
      lime: { c: '#d8ceb4', v: 0.04, pat: 'brick' }, limeDk: { c: '#b4a88e', v: 0.05, pat: 'brick' }, limeLt: { c: '#ece4cc', v: 0.03 }, trim: { c: '#f2ead2', v: 0.02 }, urn: { c: '#9a8a6c', v: 0.04 },
      wallS: { c: '#c8bea4', v: 0.05, pat: 'big' }, wallSd: { c: '#a89c84', v: 0.05, pat: 'big' },
      // 나무 밑동: 하얀 껍질, 깎은 기둥, 엇갈린 뿌리 갈비, 잿빛 바위, 어두운 틈
      barkP: { c: '#cbc1aa', v: 0.07, pat: 'big' }, barkM: { c: '#aea38c', v: 0.07 }, barkD: { c: '#857a68', v: 0.06 }, barkGap: { c: '#3c352e', v: 0.04 },
      carve: { c: '#d8d0bc', v: 0.03 }, carveDk: { c: '#b2a994', v: 0.03 }, carveLt: { c: '#ece6d6', v: 0.02 }, ribP: { c: '#d2c9b4', v: 0.05 },
      rockG: { c: '#8c8882', v: 0.07, pat: 'stone' }, rockGD: { c: '#6e6a64', v: 0.07, pat: 'stone' },
      erd: { c: '#ffd25a', glow: true }, erd2: { c: '#f2b440', glow: true },
      thorn: { c: '#3e3020', v: 0.08 }, thornDk: { c: '#2a2016', v: 0.06 }, thornL: { c: '#5c4630', v: 0.08 },
      // 둘레의 고딕 첨탑과 부채꼴 투각 가림막
      spire: { c: '#8a7d6a', v: 0.05 }, spireDk: { c: '#6a5e4e', v: 0.05 }, spireLt: { c: '#a89a84', v: 0.04 }, trac: { c: '#857762', v: 0.04 },
      // 엘데의 왕좌: 검게 바랜 나무 의자
      throneW: { c: '#4c3a2a', v: 0.04, pat: 'plank' }, throneW2: { c: '#5e4834', v: 0.04 }, throneC: { c: '#7a6044', v: 0.03 },
      holy: { c: '#fff0b8', glow: true }, holy2: { c: '#ffcf5a', glow: true },
      blood: { c: '#7a0e16', top: '#9a1820', v: 0.05 }, bloodG: { c: '#ff3a2a', glow: true },
      fogG: { c: '#ffeeb0', glow: true }, grace: { c: '#ffe9a0', glow: true },
      // 도시
      slate: { c: '#56606c', v: 0.05, pat: 'tile' }, slateDk: { c: '#3e4652', v: 0.04 }, gold: { c: '#e8b440', glow: true }, goldS: { c: '#d8b048', v: 0.05 },
      domeG: { c: '#d8ac44', v: 0.05, pat: 'tile' }, domeV: { c: '#6e8a74', v: 0.05, pat: 'tile' },
      win: { c: '#ffd890', night: true, day: '#5a5a62' }, glassG: { c: '#ffd070', glow: true },
      wood: { c: '#6a4c30', v: 0.06, pat: 'plank' }, iron: { c: '#3a3a40', v: 0.03 }, door: { c: '#7a5a34', v: 0.04, pat: 'plank' },
      leafG: { c: '#d8a830', top: '#f2c850', v: 0.1 }, leafO: { c: '#c8882a', top: '#e8a440', v: 0.1 }, bark: { c: '#5a4632', v: 0.06 },
      // 이정표(OR.signpost)용
      stoneG: { c: '#9a9080', v: 0.05 }, timber: { c: '#5a4430', v: 0.05 }, mlamp: { c: '#ffd070', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base;
      const FL = base, LOW = base - 30, QL = base - 16;          // 테라스 · 아랫도시 · 규방 마당
      const PK = 34;                                              // 테라스가 나무 밑동까지 이어지는 반폭
      const GZ = CZ + R + 1, GZ1 = GZ + 16;                       // 큰 계단(테라스 남쪽 → 규방 마당)
      const inC = (x, z) => Math.hypot(x - CX, z - CZ) <= R;
      const inP = (x, z) => inC(x, z) || (Math.abs(x - CX) <= PK && z <= CZ && Math.hypot(x - TX, z - TZ) <= TR + 14);
      const inQ = (x, z) => x >= 58 && x <= 134 && z >= GZ1 && z <= D - 1;
      const inTrunk = (x, z) => Math.hypot(x - TX, z - TZ) < TR + 8;
      const SAN = { x0: 14, x1: 54, z0: 146, z1: 168, ax: 58, az: 157, ar: 9 };   // 황금 나무 대성당(남서쪽 아랫도시)
      const inSan = (x, z, m) => (x >= SAN.x0 - m && x <= SAN.x1 + m && z >= SAN.z0 - m && z <= SAN.z1 + m) || Math.hypot(x - SAN.ax, z - SAN.az) <= SAN.ar + m;
      const P = new Uint8Array(W * D);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) P[x + W * z] = inP(x, z) ? 1 : 0;
      const isP = (x, z) => x >= 0 && z >= 0 && x < W && z < D && P[x + W * z] === 1;
      const edgeP = (x, z) => isP(x, z) && [[1, 0], [-1, 0], [0, 1], [0, -1], [2, 0], [-2, 0], [0, 2], [0, -2]].some(([a, b]) => !isP(x + a, z + b) && !inTrunk(x + a, z + b));
      MH.terrain(w, {
        floor: LOW - 6,
        height: (x, z) => {
          if (isP(x, z) || inTrunk(x, z)) return FL;
          if (inQ(x, z)) return QL;
          return LOW + n.fbm(x * 0.05, z * 0.05) * 2;
        },
        surface: (x, z, y) => y >= FL ? B.pave : (y >= QL ? B.pave2 : (n.fbm(x * 0.1, z * 0.1, 2) > 0.55 ? B.grass : B.pave2)),
        under: (x, z, y, dep) => {
          if (isP(x, z) && edgeP(x, z)) return (y - LOW) % 8 === 0 ? B.wallSd : B.wallS;
          if (inQ(x, z) && (x <= 59 || x >= 133 || z >= D - 2)) return (y - LOW) % 6 === 0 ? B.wallSd : B.wallS;
          return dep < 2 ? B.soil : (y % 5 === 0 ? B.rockDk : B.rock);
        },
      });
      const lights = [], acts = [], landmarks = [];
      const gAt = (x, z) => MH.g(w, Math.round(x), Math.round(z));

      // ══ 테라스 바닥: 동심원 홈, 바퀴살, 새김 판, 금빛 낙엽 ══
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        if (!isP(x, z)) continue;
        const dx = x - CX, dz = z - CZ, d = Math.hypot(dx, dz), ang = Math.atan2(dz, dx);
        let b = hash3(x >> 1, 3, z >> 1) > 0.62 ? B.pave2 : B.pave;
        if (d <= R) {
          if (d < 5.2) b = B.paveL;
          for (const rr of [6, 13, 24, 33]) if (Math.abs(d - rr) < 0.6) b = B.paveR;
          if (d > 13.6 && d < 23.4 && Math.abs(Math.sin(ang * 8)) * d < 0.7) b = B.paveR;
          if (d > 24.6 && d < 32.4) {
            const sec = Math.round(ang / (Math.PI * 2) * 20), mid = sec / 20 * Math.PI * 2, t = (ang - mid) * d, r = d - 28.5;
            if (Math.abs(r) < 3 && Math.abs(t) < 2.6) b = (Math.abs(r) > 2.2 || Math.abs(t) > 1.8) ? B.panelDk : B.paveL;
          }
        }
        const lv = hash3(x, 7, z) + (d > 30 ? 0.06 : 0) + n.fbm(x * 0.08, z * 0.08, 2) * 0.12;
        if (lv > 0.95) b = hash3(x, 9, z) > 0.5 ? B.leaf : B.leaf2;
        w.set(x, FL, z, b);
      }
      // 테라스 아래 버팀벽(남쪽 반원)
      for (let k = 0; k < 30; k++) {
        const a = k / 30 * Math.PI * 2; if (Math.sin(a) < -0.5) continue;
        const x = Math.round(CX + Math.cos(a) * (R + 1.5)), z = Math.round(CZ + Math.sin(a) * (R + 1.5));
        if (Math.abs(x - CX) <= 8 && z > CZ) continue;
        w.box(x - 1, LOW, z - 1, x + 1, FL - 5, z + 1, B.wallSd); MH.cone(w, x, z, FL - 4, 1.6, B.limeDk, 0.6);
      }

      // ══ 황금 나무 밑동: 하얀 껍질 기둥, 아래 40칸은 기둥·엇갈린 뿌리 갈비·잿빛 바위로 깎은 정면 ══
      const FH = 40, faceZ = TZ + TR;                             // 정면 높이, 가운데 정면의 z
      const ANG = 900, flT = new Float32Array(ANG), nzT = new Float32Array(ANG), TAU = Math.PI * 2;
      const rockBay = new Map();
      for (let y = LOW; y < Hh; y++) {
        const rBase = TR - Math.max(0, (y - FL - FH) * 0.05) + Math.max(0, (FL + 2 - y) * 0.5), wob = Math.sin(y * 0.05) * 0.4;
        for (let k = 0; k < ANG; k++) { const ang = k / ANG * TAU - Math.PI, jit = n.fbm(ang * 5 + 3, 7.5, 2) * 2.2; flT[k] = Math.pow(Math.abs(Math.sin(ang * 15 + wob + jit)), 0.5) * (2.6 + n.fbm(ang * 9, y * 0.02, 2) * 3); nzT[k] = n.fbm(ang * 3 + 11, y * 0.03, 2) * 2.4; }
        const rOut = rBase + 9, rIn2 = (rBase - 4) * (rBase - 4), yy = y - FL;
        for (let dz = -8; dz <= Math.ceil(rOut); dz++) {
          const z = TZ + dz; if (z < 0 || z >= D) continue;
          const xr = Math.ceil(Math.sqrt(Math.max(0, rOut * rOut - dz * dz)));
          for (let dx = -xr; dx <= xr; dx++) {
            const x = TX + dx; if (x < 0 || x >= W) continue;
            const d2 = dx * dx + dz * dz; if (d2 < rIn2) continue;
            const d = Math.sqrt(d2), ang = Math.atan2(dz, dx), u = (Math.PI / 2 - ang) * TR;
            if (yy > 0 && yy <= FH && dz > 0 && Math.abs(u) <= 52) {
              // ── 깎은 정면 ──
              if (Math.abs(u) < 6.5 && yy <= 34) continue;           // 가운데 계단 틈은 따로 짓는다
              const q = (((u - 7.5) % 12) + 12) % 12, pil = q <= 1.6 || q >= 10.4, bay = Math.floor((u - 7.5 + 6) / 12);
              let b = 0;
              if (pil) {
                const pv = q <= 1.6 ? q : q - 12, cap = yy >= FH - 6 && yy <= FH - 4, foot = yy <= 3;
                const ro = TR + 2.6 + (cap || foot ? 1 : 0) + (yy > FH - 4 ? 0.5 : 0);
                if (d > ro || d < TR - 3) continue;
                b = cap || foot ? B.carveLt : (yy > FH - 4 ? B.carveDk : (Math.round(pv * 1.4 + 9) % 2 ? B.carveDk : B.carve));
                if (!cap && !foot && yy % 9 === 0) b = B.carveLt;
              } else {
                const gv = q - 6, s = ((yy % 16) - 8) * 0.56;
                const rib = Math.abs(gv - s) < 0.95 || Math.abs(gv + s) < 0.95;
                const band = yy >= FH - 3 || yy <= 1;
                if (!rockBay.has(bay)) rockBay.set(bay, hash3(bay, 4, 7));
                const rb = rockBay.get(bay), ry = 6 + rb * 18, rr = 6 + rb * 3;
                const lump = rb > 0.5 ? rr - Math.hypot(gv * 1.1, (yy - ry) * 0.8) + n.fbm(x * 0.3, y * 0.3, 2) * 3 : -9;
                if (lump > 0 && d <= TR + Math.min(4.5, lump * 0.9) && d >= TR - 3) b = hash3(x, y >> 1, z) > 0.4 ? B.rockG : B.rockGD;
                else if (band && d <= TR + 1.8 && d >= TR - 3) b = B.carveDk;
                else if (rib && d <= TR + 1.4 && d >= TR - 1) b = B.ribP;
                else if (d <= TR - 1.2 && d >= TR - 3) b = B.barkGap;
                else continue;
              }
              w.set(x, y, z, b);
              continue;
            }
            // ── 껍질: 세로 홈이 깊이 팬 하얀 기둥 ──
            const kk = ((ang + Math.PI) / TAU * ANG | 0) % ANG, flute = flT[kk], rr = rBase + flute + nzT[kk];
            if (d > rr || d < rr - 4) continue;
            const groove = flute < 0.8;
            const st = hash3(x >> 1, y >> 3, z >> 1);
            w.set(x, y, z, groove ? (hash3(x, y >> 2, z) > (y > FL + 56 ? 0.55 : 0.88) ? B.erd : B.barkGap) : (flute < 1.6 ? B.barkD : (flute > 3.6 || st > 0.55 ? B.barkP : B.barkM)));
          }
        }
      }
      { const rTop = TR - (Hh - 2 - FL - FH) * 0.05 + 1; w.cyl(TX, TZ, Hh - 2, Hh - 1, rTop, B.barkD); }   // 잘린 꼭대기를 덮는다
      // 정면 위 처마 띠
      for (let k = 0; k < 400; k++) { const u = -52 + k * 0.26, ang = Math.PI / 2 - u / TR; for (const [ro, yy] of [[TR + 3, FH + 1], [TR + 2, FH + 2]]) w.set(Math.round(TX + Math.cos(ang) * ro), FL + yy, Math.round(TZ + Math.sin(ang) * ro), B.carveDk); }

      // ── 가운데 틈: 나무 속으로 오르는 계단, 그 끝을 막은 가시덤불, 뒤에서 새는 금빛 ──
      const RW = 5, LZ = faceZ - 13;                              // 틈 반폭, 계단 끝 층계참
      w.box(CX - RW - 4, FL, LZ - 6, CX + RW + 4, FL + 36, faceZ - 1, B.barkD);
      for (let y = FL + 1; y <= FL + 36; y++) for (let x = CX - RW - 1; x <= CX + RW + 1; x++) {
        const inA = LB.inArch(x - CX, y - FL - 1, RW + 0.5, 32, 'pointed'), rim = !inA && LB.inArch(x - CX, y - FL - 1, RW + 1.6, 33, 'pointed');
        for (let z = LZ - 2; z <= faceZ + 3; z++) { if (inA) w.set(x, y, z, 0); else if (rim && z >= faceZ - 2 && z <= faceZ + 2) w.set(x, y, z, B.carveLt); }
      }
      for (let y = FL + 11; y <= FL + 32; y++) for (let x = CX - RW; x <= CX + RW; x++) if (LB.inArch(x - CX, y - FL - 1, RW + 0.5, 32, 'pointed')) w.set(x, y, LZ - 3, hash3(x, y, 1) > 0.35 ? B.erd : B.erd2);
      for (let k = 0; k <= 10; k++) for (let x = CX - RW; x <= CX + RW; x++) { const z = faceZ + 1 - k; for (let y = FL; y <= FL + k; y++) w.set(x, y, z, y === FL + k ? (Math.abs(x - CX) === RW ? B.carveDk : B.rockGD) : B.barkD); }
      for (let z = LZ - 2; z <= faceZ - 9; z++) for (let x = CX - RW; x <= CX + RW; x++) w.set(x, FL + 10, z, B.rockGD);
      const thorns = w.prop({ name: 'thorns', pivot: [CX + 0.5, FL + 14, LZ - 2], clipOK: 2600 });
      for (let k = 0; k < 52; k++) {
        const h1 = hash3(k, 1, 3), h2 = hash3(k, 2, 9), h3 = hash3(k, 5, 3);
        let pts;
        if (k < 34) {                                              // 틈 위쪽을 빽빽이 메운 덤불(계단 끝에서 틈 어귀까지)
          const y0 = FL + 9 + h1 * 23, y1 = FL + 9 + h2 * 23, zs = faceZ - 3 - LZ;
          pts = [[CX - RW + h3 * 1.5, y0, LZ + h1 * zs], [CX + (h2 - 0.5) * 7, (y0 + y1) / 2 + (h3 - 0.5) * 6, LZ + h3 * zs], [CX + RW - h1 * 1.5, y1, LZ + h2 * zs]];
        } else if (k < 44) {                                       // 계단을 타고 흘러내린 가시
          const s = h1 > 0.5 ? 1 : -1;
          pts = [[CX + s * h2 * 4, FL + 13 + h3 * 6, LZ + 2], [CX + s * (1 + h3 * 3), FL + 7 + h1 * 3, faceZ - 5], [CX + s * (2 + h2 * 3), FL + 3, faceZ - 1]];
        } else {                                                   // 틈 가장자리를 감은 짧은 가시
          const s = k % 2 ? 1 : -1, y0 = FL + 6 + h1 * 22;
          pts = [[CX + s * (RW - 1), y0, faceZ - 4], [CX + s * (RW + 1.5), y0 + 2, faceZ + 1.5], [CX + s * (RW + 2.5 + h2 * 2), y0 + 4 + h3 * 3, faceZ + 2]];
        }
        const C = LB.tube(thorns, pts, t => 1.05 - t * 0.5, (x, y, z) => { const h = hash3(x, y, z); return k < 34 && h > 0.95 ? B.erd2 : (h > 0.7 ? B.thornL : (k % 3 ? B.thorn : B.thornDk)); });
        C.forEach((p, i) => { if (i % 3 === 1) { const a = i * 2.1 + k; thorns.set(Math.round(p[0] + Math.cos(a) * 1.5), Math.round(p[1] + Math.sin(a) * 1.3), Math.round(p[2] + Math.sin(a * 1.7)), B.thornDk); } });
      }
      lights.push({ name: 'seal', p: [CX + 0.5, FL + 20, LZ + 2], c: '#ffd870', i: 1.2, d: 36, flicker: 0.05, srcR: 7 });
      acts.push({
        name: '가시 봉인', hint: '계단 끝을 막은 가시덤불이 꿈틀대며 금빛을 토해 내지만, 끝내 아무도 들이지 않아요', hit: [CX - RW - 3, FL + 4, LZ - 2, CX + RW + 3, FL + 32, faceZ + 4],
        run: async a => {
          a.flash('seal', 4, 6); a.glow(1.8, 6);
          for (let k = 0; k < 3; k++) {
            await a.tween('thorns', { scl: [1.14, 1.12, 1.18], off: [0, 0, 1.5] }, 0.5);
            for (let q = 0; q < 6; q++) a.burst([CX - 4 + q * 1.6, FL + 12 + (q * 5) % 18, LZ + 3], { n: 22, colors: ['#ffe9a0', '#ffd25a', '#ffffff'], speed: 4, up: 2, life: 1.6, gravity: -0.3, spread: 3 });
            await a.tween('thorns', { scl: [1, 1, 1], off: [0, 0, 0] }, 0.6);
          }
          a.burst([CX + 0.5, FL + 8, faceZ + 2], { n: 60, colors: ['#3e3020', '#5c4630', '#ffd25a'], speed: 5, up: 3, life: 1.2, gravity: 6, spread: 4 });
          await a.wait(0.8);
        },
      });
      landmarks.push({ name: '가시 봉인', note: '황금 나무 속으로 오르는 계단을 막은 가시', p: [CX + 0.5, FL + 46, LZ + 4] });
      landmarks.push({ name: '황금 나무', note: '밑동이 대성당처럼 깎인 거대한 나무', p: [CX - 30.5, FL + 76, faceZ - 20] });

      // ══ 엘데의 왕좌: 계단 발치의 높은 등받이 나무 의자(남쪽을 본다) ══
      const tz = faceZ + 3, ty = FL + 1;
      w.box(CX - 2, ty, tz, CX + 2, ty, tz + 3, B.throneW);                             // 받침
      w.box(CX - 1, ty + 1, tz + 1, CX + 1, ty + 2, tz + 3, B.throneW2);                // 좌석
      w.box(CX - 1, ty + 2, tz + 3, CX + 1, ty + 2, tz + 3, B.throneC);
      w.box(CX - 2, ty + 1, tz, CX + 2, ty + 10, tz, B.throneW);                        // 등받이
      for (let y = ty + 4; y <= ty + 9; y++) for (let x = CX - 1; x <= CX + 1; x++) if ((x + y) % 2 === 0) w.set(x, y, tz + 1, B.throneC);
      w.box(CX - 1, ty + 11, tz, CX + 1, ty + 11, tz, B.throneW2); w.set(CX, ty + 12, tz, B.throneC);
      for (const s of [-1, 1]) { w.box(CX + s * 2, ty + 1, tz + 1, CX + s * 2, ty + 3, tz + 3, B.throneW); w.box(CX + s * 2, ty + 4, tz + 1, CX + s * 2, ty + 4, tz + 3, B.throneW2); w.box(CX + s * 2, ty + 11, tz, CX + s * 2, ty + 12, tz, B.throneC); }
      acts.push({
        name: '엘데의 왕좌', hint: '가시 계단 발치의 낡은 나무 의자가 빛나며 하늘로 빛기둥이 솟아요', hit: [CX - 2, ty, tz, CX + 2, ty + 12, tz + 3],
        run: async a => { a.flash('seal', 3, 4.6); a.glow(1.5, 4.6); for (let k = 0; k < 9; k++) { a.burst([CX + 0.5, ty + 4, tz + 2], { n: 30, colors: ['#ffe9a0', '#fff6d0', '#ffd25a'], speed: 1, up: 16, life: 2.4, gravity: -0.5, spread: 1.2 }); await a.wait(0.3); } },
      });
      landmarks.push({ name: '엘데의 왕좌', note: '계단 발치의 낡은 나무 의자', p: [CX + 0.5, ty + 24, tz + 2] });

      // ══ 둘레: 동·서쪽은 고딕 첨탑과 부채꼴 투각 가림막, 남쪽은 낮은 난간 ══
      const spireAt = (x, z, k) => {
        const g = FL, h = 26 + (k % 3) * 4;
        w.box(x - 1, g + 1, z - 1, x + 1, g + 4, z + 1, B.spireDk);
        for (let y = g + 5; y <= g + h; y++) {
          w.set(x, y, z, y % 7 === 0 ? B.spireLt : B.spire);
          if (y < g + 15) { for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) w.set(x + a, y, z + b, y === g + 14 ? B.spireLt : B.spire); }
          else if (y % 3 === 0 && y < g + h - 2) { const q = (y / 3 + k) % 4, [a, b] = [[1, 0], [0, 1], [-1, 0], [0, -1]][q]; w.set(x + a, y, z + b, B.spireDk); }
        }
        w.set(x, g + h + 1, z, B.spireLt); w.set(x, g + h + 2, z, B.spireLt);
      };
      const fanAt = (A, Bp, k) => {
        const L = Math.hypot(Bp[0] - A[0], Bp[1] - A[1]), N = Math.ceil(L * 2.5);
        for (let i = 0; i <= N; i++) {
          const t = i / N, x = Math.round(A[0] + (Bp[0] - A[0]) * t), z = Math.round(A[1] + (Bp[1] - A[1]) * t), hx = (t - 0.5) * L, top = 4 + 8 * Math.sin(Math.PI * t);
          for (let yy = 1; yy <= top; yy++) {
            const r = Math.hypot(hx, yy - 1), phi = Math.atan2(yy - 1, hx);
            const bar = Math.abs(((phi / Math.PI * 6) % 1 + 1) % 1 - 0.5) > 0.4 && r > 2, arc = Math.abs(r - 5) < 0.45 || Math.abs(r - 9.5) < 0.45;
            if (yy <= 1 || top - yy < 1 || bar || arc) w.set(x, FL + yy, z, yy <= 1 ? B.spireDk : B.trac);
          }
        }
      };
      const rimPts = side => {
        const out = [];
        // 나무 쪽 곧은 모서리(테라스가 밑동까지 이어진 곳)
        const ex = CX + side * PK, zEnd = CZ - Math.sqrt(R * R - PK * PK);
        for (let z = Math.round(Math.sqrt(Math.max(0, (TR + 10) ** 2 - PK * PK)) + TZ); z < zEnd - 5; z += 11) out.push([ex, z]);
        const a0 = side > 0 ? -Math.asin(Math.sqrt(R * R - PK * PK) / R) : Math.PI + Math.asin(Math.sqrt(R * R - PK * PK) / R), a1 = side > 0 ? 0.9 : Math.PI - 0.9;
        for (let k = 0; k <= 5; k++) { const a = a0 + (a1 - a0) * k / 5; out.push([Math.round(CX + Math.cos(a) * R), Math.round(CZ + Math.sin(a) * R)]); }
        return out;
      };
      for (const side of [-1, 1]) {
        const pts = rimPts(side);
        pts.forEach((p, k) => { if (k) fanAt(pts[k - 1], p, k); });
        pts.forEach((p, k) => spireAt(p[0], p[1], k + (side > 0 ? 1 : 0)));
      }
      // 남쪽 난간과 항아리 기둥(계단 자리는 뚫린다)
      for (let k = 0; k <= 260; k++) {
        const a = 0.9 + (Math.PI - 1.8) * k / 260, x = Math.round(CX + Math.cos(a) * R), z = Math.round(CZ + Math.sin(a) * R);
        if (Math.abs(x - CX) <= 7) continue;
        w.set(x, FL + 1, z, B.limeLt); w.set(x, FL + 2, z, B.trim);
        if (k % 22 === 0) { w.box(x, FL + 1, z, x, FL + 3, z, B.limeDk); w.set(x, FL + 4, z, B.urn); w.set(x, FL + 5, z, B.urn); }
      }

      // ══ 보스: 축복왕 모르고트(핀) ══
      lights.push({ name: 'field', p: [CX + 0.5, FL + 10, CZ + 0.5], c: '#ffd870', i: 0.05, d: 60, flicker: 0.2, srcR: 26 });
      landmarks.push({ name: '축복왕 모르고트', note: '보스 · 흉조의 왕, 황금 나무를 지킨 마지막 왕', p: [CX + 0.5, FL + 30, CZ + 4.5], boss: true });

      // ── 성검 비: 모르고트가 하늘에서 금빛 성검을 쏟아 테라스에 꽂는다 ──
      const blades = [];
      for (let k = 0; k < 8; k++) {
        const a = k / 8 * TAU + 0.4, rr = 9 + (k % 3) * 3, bx = Math.round(CX + Math.cos(a) * rr), bz = Math.round(CZ + 4 + Math.sin(a) * rr);
        const pr = w.prop({ name: 'blade' + k, pivot: [bx + 0.5, FL + 1, bz + 0.5], scl0: [0, 0, 0], off0: [0, 26, 0] });
        const tx = Math.abs(Math.sin(a)) > 0.7 ? [1, 0] : [0, 1];
        for (let y = 0; y < 9; y++) { pr.set(bx, FL + 1 + y, bz, y < 1 ? B.holy2 : B.holy); if (y > 1 && y < 8) pr.set(bx + tx[0], FL + 1 + y, bz + tx[1], B.holy2); }
        for (let s = -2; s <= 2; s++) pr.set(bx + tx[0] * s, FL + 10, bz + tx[1] * s, B.holy2);
        pr.set(bx, FL + 11, bz, B.holy); pr.set(bx, FL + 12, bz, B.holy); pr.set(bx, FL + 13, bz, B.holy2);
        blades.push([bx, bz]);
      }
      lights.push({ name: 'holy', p: [CX + 0.5, FL + 8, CZ + 4.5], c: '#ffe8a0', i: 0.2, d: 30, flicker: 0.1, srcR: 14 });
      acts.push({
        name: '성검의 비', hint: '모르고트가 하늘에 금빛 성검을 불러내 테라스에 차례로 내리꽂아요', hit: [CX - 4, FL, CZ, CX + 4, FL + 4, CZ + 8],
        run: async a => {
          a.flash('holy', 8, 4.6); a.glow(1.5, 4.6);
          for (let k = 0; k < blades.length; k++) a.tween('blade' + k, { scl: [1, 1, 1] }, 0.25);
          a.burst([CX + 0.5, FL + 30, CZ + 4.5], { n: 70, colors: ['#fff0b8', '#ffcf5a', '#ffffff'], speed: 4, up: 2, life: 1.4, gravity: 0, spread: 10, flat: true });
          await a.wait(0.6);
          for (let k = 0; k < blades.length; k++) {
            const [bx, bz] = blades[k];
            await a.tween('blade' + k, { off: [0, 0, 0] }, 0.22, t => t * t);
            a.burst([bx + 0.5, FL + 1.5, bz + 0.5], { n: 26, colors: ['#ffe9a0', '#ffd25a', '#bcb5a6'], speed: 4, up: 3, life: 0.9, gravity: 7, spread: 1.6, flat: true });
          }
          await a.wait(1.4);
          for (let k = 0; k < blades.length; k++) a.tween('blade' + k, { scl: [0, 0, 0] }, 0.5);
          await a.wait(0.6);
          for (let k = 0; k < blades.length; k++) a.tween('blade' + k, { off: [0, 26, 0] }, 0.05);
        },
      });

      // ── 저주받은 피의 참격: 붉게 갈라진 핏자국에 불이 붙는다 ──
      const BLX = CX + 12, BLZ = CZ + 14;
      const blood = w.prop({ name: 'blood', pivot: [BLX + 0.5, FL + 1, BLZ + 0.5], scl0: [0, 0, 0], clipOK: 14 });
      const bloodPts = [];
      for (let k = 0; k <= 120; k++) {
        const a = -1.2 + 2.4 * k / 120, wdt = 1.8 * Math.sin(Math.PI * k / 120) + 0.4;
        for (let r = -wdt; r <= wdt; r += 0.5) { const x = Math.round(BLX + Math.cos(a) * (10 + r)), z = Math.round(BLZ + Math.sin(a) * (10 + r)); blood.set(x, FL + 1, z, hash3(x, 2, z) > 0.8 ? B.bloodG : B.blood); }
        if (k % 15 === 0) bloodPts.push([BLX + Math.cos(a) * 10 + 0.5, FL + 1.5, BLZ + Math.sin(a) * 10 + 0.5]);
      }
      lights.push({ name: 'blood', p: [BLX + 8.5, FL + 3, BLZ + 0.5], c: '#ff3a2a', i: 0.1, d: 20, flicker: 0.5, srcR: 8 });
      acts.push({
        name: '저주받은 피', hint: '흉조의 왕이 제 피로 벼린 검을 휘두르자 테라스에 핏자국이 갈라지고 불이 붙어요', hit: [BLX + 6, FL, BLZ - 8, BLX + 12, FL + 3, BLZ + 8],
        run: async a => {
          a.flash('blood', 10, 4);
          await a.tween('blood', { scl: [1, 1, 1] }, 0.35);
          for (const p of bloodPts) { a.burst(p, { n: 24, colors: ['#ff3a2a', '#c01818', '#ff8a3a'], speed: 1.4, up: 6, life: 1.2, gravity: -0.6, spread: 1 }); await a.wait(0.12); }
          await a.wait(1.6);
          await a.tween('blood', { scl: [0, 0, 0] }, 0.8);
        },
      });

      // ══ 쓰러진 뿌리 가지들이 테라스에 흩어져 있다 ══
      for (let k = 0; k < 7; k++) {
        const a = k * 0.9 + 0.5, r0 = 16 + (k % 3) * 6, x0 = CX + Math.cos(a) * r0, z0 = CZ + Math.sin(a) * r0;
        if (z0 < CZ - 22 || Math.hypot(x0 - BLX - 8, z0 - BLZ) < 6) continue;
        const dx = Math.cos(a + 1.6) * 7, dz = Math.sin(a + 1.6) * 7;
        LB.tube(w, [[x0 - dx, FL + 1, z0 - dz], [x0, FL + 1.6, z0], [x0 + dx * 1.2, FL + 1, z0 + dz * 1.2 + 2]], t => 1.2 - t * 0.6, (x, y, z) => y <= FL ? 0 : (hash3(x, y, z) > 0.5 ? B.barkM : B.barkD), { under: true });
      }

      // ══ 동쪽: 밑동에서 내려와 테라스 너머 도시로 박힌 거대한 뿌리, 금빛 핏줄(부품) ══
      const RP = [[146, FL + 46, 14], [164, FL + 32, 44], [174, FL + 14, 78], [181, FL - 8, 110], [188, LOW, 134]], RR = t => 6 - t * 3;
      const rootC = LB.tube(w, RP, RR, (x, y, z, t, dy, d) => d > 0.86 && hash3(x, y, z) > 0.8 ? B.barkD : (dy > 0 ? B.barkP : B.barkM));
      const veins = w.prop({ name: 'veins', pivot: [174.5, FL + 19.5, 78.5], scl0: [0, 0, 0], clipOK: 99999 });
      for (const off of [-1.6, 0, 1.6]) {
        const C = rootC.filter((_, i) => i % 3 === 0).map((p, i, arr) => { const t = i / (arr.length - 1), r = RR(t); return [p[0] + off * 0.7, p[1] + Math.sqrt(Math.max(0, r * r - off * off)) + 0.5, p[2] + off * 0.7]; });
        LB.tube(veins, C, off ? 0.6 : 0.8, B.erd);
      }
      for (const [i] of veins.data) w.set(i % W, Math.floor(i / (W * D)), Math.floor(i / W) % D, 0);   // 핏줄 자리는 뿌리에 홈으로 판다
      lights.push({ name: 'veins', p: [174.5, FL + 22, 78.5], c: '#ffd25a', i: 0.1, d: 30, flicker: 0.1, srcR: 20 });
      acts.push({
        name: '금빛 뿌리', hint: '테라스 동쪽으로 내려온 거대한 뿌리에 금빛 핏줄이 차오르며 빛나요', hit: [166, FL + 12, 62, 182, FL + 30, 92],
        run: async a => {
          a.flash('veins', 12, 4.4);
          await a.tween('veins', { scl: [1, 1, 1] }, 1.2); a.glow(1.6, 3);
          for (let k = 0; k < RP.length; k++) { const p = RP[k]; a.burst([p[0], p[1] + RR(k / (RP.length - 1)) + 1, p[2]], { n: 24, colors: ['#ffe9a0', '#ffd25a'], speed: 1.4, up: 4, life: 1.6, gravity: -0.3, spread: 2 }); await a.wait(0.3); }
          await a.wait(1.4); await a.tween('veins', { scl: [0, 0, 0] }, 1);
        },
      });
      // 서쪽 뿌리(밑동에서 아랫도시로)
      LB.tube(w, [[52, FL + 40, 30], [40, FL + 22, 56], [30, FL + 2, 80], [20, LOW, 100]], t => 5 - t * 2.6, (x, y, z, t, dy) => dy > 0 ? B.barkP : B.barkM);
      acts.push({
        name: '황금 나무의 잎비', hint: '황금 나무가 환하게 빛나며 테라스 위로 금빛 잎이 쏟아져요', hit: [CX - 30, FL + 40, faceZ - 6, CX - 18, FL + 60, faceZ + 4],
        run: async a => { a.glow(1.6, 4.6); a.wind(2.6, 4.6); for (let k = 0; k < 10; k++) { a.burst([CX - 30 + k * 6, FL + 60 + (k % 3) * 5, CZ - 20 + (k % 4) * 10], { n: 40, colors: ['#ffd25a', '#ffe9a0', '#f0b040'], speed: 6, up: -1, life: 3.2, gravity: 2.2, spread: 10, flat: true }); await a.wait(0.4); } },
      });

      // ══ 남쪽: 안개문, 규방으로 내려가는 큰 계단, 여왕의 규방(돔) ══
      MH.flight(w, { name: '규방 계단', axis: 'z', c: CX, half: 6, a: GZ, b: GZ1, ha: FL, hb: QL, step: B.pave2, edge: B.trim, fill: B.wallS, rail: B.limeLt, post: B.limeDk, postGap: 4,
        onPost: (x, y, z) => { w.set(x, y, z, B.urn); w.set(x, y + 1, z, B.urn); } });
      for (const x of [CX - 8, CX + 8]) { w.box(x - 1, FL + 1, GZ - 2, x + 1, FL + 13, GZ, B.lime); w.box(x - 1, FL + 14, GZ - 2, x + 1, FL + 14, GZ, B.trim); w.set(x, FL + 15, GZ - 1, B.urn); }
      w.box(CX - 8, FL + 12, GZ - 1, CX + 8, FL + 13, GZ - 1, B.lime);
      for (let x = CX - 7; x <= CX + 7; x++) for (let y = FL + 1; y <= FL + 11; y++) if (hash3(x, y, 9) > 0.6) w.set(x, y, GZ - 1, B.fogG);
      lights.push({ name: 'fog', p: [CX + 0.5, FL + 6, GZ + 1], c: '#ffe8a0', i: 0.6, d: 14, flicker: 0.2 });
      acts.push({
        name: '안개문', hint: '큰 계단 꼭대기의 금빛 안개가 일렁이며 흩날려요', hit: [CX - 7, FL + 1, GZ - 2, CX + 7, FL + 11, GZ],
        run: async a => { a.flash('fog', 4, 3); for (let k = 0; k < 8; k++) { a.burst([CX + 0.5, FL + 2 + k * 1.3, GZ - 0.5], { n: 24, colors: ['#ffeeb0', '#ffffff', '#ffd25a'], speed: 3, up: 1, life: 1.4, gravity: -0.4, spread: 6, flat: true }); await a.wait(0.18); } },
      });
      // 여왕의 규방: 둥근 몸채 + 기둥 고리 + 갈빗대 돔
      const QX = CX, QZ = 176, QR = 11;
      for (let y = QL + 1; y <= QL + 15; y++) for (let k = 0; k < 160; k++) {
        const a = k / 160 * TAU, x = Math.round(QX + Math.cos(a) * QR), z = Math.round(QZ + Math.sin(a) * QR);
        const win = (k % 20 > 7 && k % 20 < 13) && ((y > QL + 3 && y < QL + 8) || (y > QL + 10 && y < QL + 14));
        w.set(x, y, z, y === QL + 9 || y === QL + 15 ? B.trim : (win ? B.win : B.lime));
      }
      w.cyl(QX, QZ, QL + 16, QL + 16, QR + 1, B.limeDk);
      for (let k = 0; k < 16; k++) { const a = k / 16 * TAU, x = Math.round(QX + Math.cos(a) * (QR + 2)), z = Math.round(QZ + Math.sin(a) * (QR + 2)); if (z < QZ - QR) continue; w.box(x, QL + 1, z, x, QL + 15, z, B.limeLt); }
      const qTop = LB.dome(w, QX, QL + 17, QZ, QR, B.domeV, { ribs: 12, rib: B.goldS, lantern: B.limeLt, tip: B.goldS, sy: 0.9 });
      const qdL = w.prop({ name: 'qdoorL', pivot: [QX - 3, QL + 1, QZ - QR - 0.5] }), qdR = w.prop({ name: 'qdoorR', pivot: [QX + 4, QL + 1, QZ - QR - 0.5] });
      for (let x = QX - 3; x <= QX + 3; x++) for (let y = QL + 1; y <= QL + 7; y++) { for (let z = QZ - QR - 1; z <= QZ - QR + 1; z++) w.set(x, y, z, 0); (x <= QX ? qdL : qdR).set(x, y, QZ - QR - 1, y === QL + 4 || x === QX - 3 || x === QX + 3 ? B.goldS : B.door); }
      for (let x = QX - 4; x <= QX + 4; x++) w.set(x, QL + 8, QZ - QR - 1, B.trim);
      lights.push({ name: 'bed', p: [QX + 0.5, QL + 4, QZ - QR + 2], c: '#ffd890', i: 0.4, d: 14, flicker: 0.2 });
      acts.push({
        name: '여왕의 규방', hint: '마리카 여왕의 둥근 규방 문이 열리며 촛불 빛이 새어 나와요. 큰 계단을 오르면 왕좌예요', hit: [QX - 3, QL + 1, QZ - QR - 2, QX + 3, QL + 7, QZ - QR],
        run: async a => { a.flash('bed', 6, 3.6); await Promise.all([a.turn('qdoorL', [0, -1.5, 0], 1.6), a.turn('qdoorR', [0, 1.5, 0], 1.6)]); a.burst([QX + 0.5, QL + 4, QZ - QR - 1], { n: 30, colors: ['#ffe9a0', '#fff6d0'], speed: 2, up: 2, life: 1.6, gravity: -0.3, spread: 3 }); await a.wait(1.6); await Promise.all([a.turn('qdoorL', [0, 0, 0], 1.4), a.turn('qdoorR', [0, 0, 0], 1.4)]); },
      });
      landmarks.push({ name: '여왕의 규방', note: '하위 지도 · 큰 계단 아래 돔, 왕좌 앞 마지막 축복', p: [QX + 0.5, qTop + 6, QZ + 0.5] });
      // 규방 돔을 넘어가는 거대한 뿌리
      LB.tube(w, [[156, LOW, 152], [134, QL + 30, 166], [104, QL + 40, 180], [72, QL + 30, 186], [44, LOW + 2, 190]], t => 3.6 - Math.sin(t * Math.PI) * 0.8, (x, y, z, t, dy) => dy > 0 ? B.barkP : B.barkM);

      // ══ 테라스 한가운데 축복(모르고트를 쓰러뜨리면 나타난다) ══
      const gp = LB.grace(w, CX, FL, CZ, B.grace);
      lights.push({ name: 'grace', p: gp, c: '#ffe08a', i: 0.9, d: 10, flicker: 0.1 });
      acts.push(LB.graceAct({ name: '엘데의 왕좌 축복', at: gp, to: [CX + 0.5, FL + 20, LZ + 2], arc: 14, steps: 22, hint: '테라스 한가운데 축복이 가시로 막힌 계단 끝을 가리켜요. 거인의 불로만 태울 수 있어요' }));

      // ══ 이정표: 큰 계단 아래 여왕의 규방(하위 지도) ══
      {
        const sx = CX - 12, sz = GZ - 3, sp = OR.signpost(w, B, sx, sz, { dir: [0, 1], boards: 1, h: 6 });
        acts.push(OR.goAct({ at: sp, name: '여왕의 규방으로', goto: 'leyndell-sub', hint: '큰 계단을 내려가 돔 아래 마리카 여왕의 둥근 방으로 가요. 천개 휘장과 침상, 왕좌 앞 마지막 축복이 있어요' }));
      }

      // ══ 아랫도시: 지붕들, 황금 나무 대성당, 금빛 나무 ══
      // 황금 나무 대성당: 긴 본당(서→동) + 동쪽 둥근 끝(돔)
      w.box(SAN.x0, LOW + 1, SAN.z0, SAN.x1, LOW + 22, SAN.z1, B.lime); w.box(SAN.x0 + 1, LOW + 1, SAN.z0 + 1, SAN.x1 - 1, LOW + 21, SAN.z1 - 1, 0);
      for (const y of [LOW + 11, LOW + 22]) w.walls(SAN.x0, y, SAN.z0, SAN.x1, y, SAN.z1, B.trim);
      for (let x = SAN.x0 + 4; x <= SAN.x1 - 4; x += 6) for (const zz of [SAN.z0, SAN.z1]) { LB.arch(w, { axis: 'x', c: zz, u0: x, y0: LOW + 2, a: 1.5, h: 7, kind: 'round', fill: B.win, frame: B.limeLt }); LB.arch(w, { axis: 'x', c: zz, u0: x, y0: LOW + 13, a: 1.2, h: 7, kind: 'round', fill: B.win, frame: B.limeLt }); }
      MH.roof(w, SAN.x0 - 1, SAN.x1 + 1, SAN.z0 - 1, SAN.z1 + 1, LOW + 23, { b: B.slate, eave: B.slateDk, ridge: B.goldS, pitch: 1, gable: B.lime, axis: 'x' });
      w.cyl(SAN.ax, SAN.az, LOW + 1, LOW + 20, SAN.ar, B.lime);
      for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5, x = Math.round(SAN.ax + Math.cos(a) * SAN.ar), z = Math.round(SAN.az + Math.sin(a) * SAN.ar); w.box(x, LOW + 10, z, x, LOW + 17, z, B.glassG); }
      const sdTop = LB.dome(w, SAN.ax, LOW + 21, SAN.az, SAN.ar, B.domeG, { ribs: 12, rib: B.goldS, sy: 1.0, lantern: B.limeLt, tip: B.goldS });
      landmarks.push({ name: '황금 나무 대성당', note: '첫 왕 고드프리의 망령 · 가지 다리로 규방과 이어진다', p: [SAN.ax - 8.5, sdTop + 8, SAN.az + 0.5] });
      // 대성당에서 규방으로 오르는 거대한 가지 다리
      LB.tube(w, [[SAN.ax + 6, LOW + 18, SAN.az - 4], [70, QL + 4, 172], [82, QL + 6, 178]], t => 2.4 - t * 0.6, (x, y, z, t, dy) => dy > 0 ? B.barkP : B.barkM);
      const hm = { found: B.wallSd, wall: B.lime, frame: B.limeDk, win: B.win, sill: B.trim, door: B.door, roof: B.slate, eave: B.slateDk, ridge: B.goldS, chimney: B.limeDk, quoin: B.limeLt };
      const placed = [];
      for (let i = 0; i < 160 && placed.length < 30; i++) {
        const x = w.ri(4, W - 16), z = w.ri(24, D - 14), sx = w.ri(8, 12), sz = w.ri(7, 10);
        const ok = [[x, z], [x + sx, z], [x, z + sz], [x + sx, z + sz], [x + (sx >> 1), z + (sz >> 1)]].every(([px, pz]) => !isP(px, pz) && Math.hypot(px - CX, pz - CZ) > R + 4 && Math.hypot(px - TX, pz - TZ) > TR + 12 && !inQ(px, pz) && !inSan(px, pz, 3) && !(px > 150 && pz < 145 && Math.abs(px - 146 - (pz - 14) * 0.32) < 14) && !(px < 60 && pz < 110 && pz > 20 && Math.abs(px - 30 - (100 - pz) * 0.45) < 10));
        if (!ok || placed.some(([a0, b0, a1, b1]) => x < a1 + 2 && x + sx > a0 - 2 && z < b1 + 2 && z + sz > b0 - 2)) continue;
        const h = MH.houseX(w, { x, z, sx, sz, floors: 2 + (i % 2), fh: 6, face: 's', pitch: 2, y: LOW, m: hm });
        if (i % 5 === 0) LB.dome(w, x + (sx >> 1), h.peak - 1, z + (sz >> 1), 3.4, B.domeG, { ribs: 8, rib: B.goldS, lantern: B.limeLt, tip: B.goldS });
        placed.push([x, z, x + sx, z + sz]);
      }
      for (let i = 0; i < 50; i++) {
        const x = w.ri(3, W - 4), z = w.ri(3, D - 4), g = MH.g(w, x, z);
        if (g > LOW + 3 || w.get(x, g + 1, z) || isP(x, z) || inQ(x, z) || inSan(x, z, 4) || Math.hypot(x - TX, z - TZ) < TR + 10) continue;
        MH.tree(w, x, g + 1, z, { kind: 'oak', h: w.ri(7, 11), bark: B.bark, leaves: [B.leafG, B.leafO, B.leafO], r: w.r(3, 4.2), spread: 3.2, branches: 4 });
      }
      return { lights, landmarks, acts };
    },
  });
})();
