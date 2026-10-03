// 미켈라의 성수 · 성수 마을 광장(하위 지도) — 에브레펠 위, 거대한 성수의 가지 위에 세운 하얀 고딕 마을.
// 남동쪽으로 뻗은 굵은 가지가 갈라지는 자리에 둥근 광장(매듭 무늬 바닥 · 매듭 난간 · 쌍둥이 석상), 북쪽 계단 위로 불 켜진 회당,
// 서쪽 아랫가지에 촛불 처녀상이 둘러선 둥근 정자(성수 마을), 남서쪽 가지 끝에 성수 가지 축복과 버섯, 동쪽 윗가지에 붉은 덩굴 덮인 산책로(로레타).
// 산책로 남쪽 끝 승강기 옆 이정표로 에브레펠 맨 밑 성수 뿌리(보스방)로 돌아간다. (성수 버팀목 에브레펠의 하위 지도)
// 좌표: +x 동쪽, +z 남쪽. 기본 시점(남동쪽)에서 보면 광장이 가운데, 뒤(북서)에 거목 줄기, 왼쪽 아래 정자, 오른쪽 위 산책로.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 176, D = 176, Hh = 176;
  const TX = 54, TZ = 52;                                   // 거목 줄기
  const PX = 98, PZ = 100;                                  // 광장 한가운데
  MAPS.push({
    id: 'elphael-sub', cat: 'lands', sub: true, parent: 'elphael', name: '미켈라의 성수', en: "Miquella's Haligtree · Town Plaza", color: '#c8583a', seed: 889, base: 30, time: 'day', size: [W, D, Hh],
    desc: '성수 설원 북쪽 바다 위, 미켈라가 키운 성수의 거대한 가지 위에 하얀 고딕 마을이 자랐다. 가지가 갈라지는 자리의 둥근 광장엔 매듭 무늬가 새겨지고, 촛불이 녹아내린 받침 위에서 말레니아가 미켈라를 안은 쌍둥이 석상이 붉은 잎 아래 서 있다. 동쪽 윗가지 산책로를 성수의 기사 로레타가 지키고, 그 너머 승강기로 에브레펠을 내려가면 성수 뿌리에 닿는다.',
    info: { title: '장소 정보', en: 'HALIGTREE TOWN PLAZA', rows: [['가는 길', '성수 뿌리 납골당 승강기 → 에브레펠 → 성수 산책로'], ['광장', '매듭 무늬 바닥 · 매듭 난간 · 쌍둥이 석상'], ['성수 마을', '서쪽 아랫가지 · 촛불 처녀상의 둥근 정자'], ['산책로', '동쪽 윗가지 · 성수의 기사 로레타']] },
    sky: ['#a8b4c0', '#5a6678', '#e8d8c0'], stars: false,
    hemi: ['#e4eaf0', '#4a4038', 0.62], sun: ['#f4f0e8', 0.62, [0.4, 1, 0.55]],
    night: { sky: ['#2a3040', '#0a0c16', '#6a5a50'], stars: true, hemi: ['#a8b0c8', '#1a1614', 0.46], sun: ['#d0d4e0', 0.34, [0.4, 1, 0.55]], haze: '#2a3038' },
    liquid: ['#6a7a84', '#9aaab4', '#eef4f8'], liqSpeed: 0.05,
    fog: { start: 0.8, floor: 30, depth: 26, haze: [44, 0.24, 12], hazeColor: '#b4bec8' },
    camY: 22, zoom: 1.6,
    particles: [
      { n: 520, colors: ['#a43a24', '#c8583a', '#8a2e22', '#d8a040'], mode: 'fall', speed: 0.35, wind: 0.6, y0: 50, y1: 170, glow: false },
      { n: 360, colors: ['#ffffff', '#e8eef4'], mode: 'wisp', speed: 0.3, size: 3, area: [88, 88, 80], y0: 12 },
      { n: 90, colors: ['#ff6a3a', '#ff8a5a'], mode: 'drift', speed: 0.2, area: [PX, PZ, 30], y0: 70, y1: 110, glow: true },
    ],
    blocks: {
      bark: { c: '#4e4842', v: 0.07, pat: 'log' }, bark2: { c: '#6a625a', v: 0.07, pat: 'log' }, barkDk: { c: '#36312c', v: 0.06, pat: 'log' },
      moss: { c: '#4a5238', top: '#5e6a44', v: 0.1 }, lattice: { c: '#c8c4b8', v: 0.05 }, latticeDk: { c: '#9a9488', v: 0.05 },
      fungus: { c: '#e8b0a0', v: 0.05 }, fungusDk: { c: '#c88a7a', v: 0.05 }, sprout: { c: '#f0ece4', v: 0.04 },
      leafR: { c: '#9a3424', v: 0.12 }, leafR2: { c: '#b84a2c', v: 0.12 }, leafDk: { c: '#5e2218', v: 0.1 }, leafG: { c: '#d8a040', v: 0.1 },
      ivy: { c: '#8a2e22', v: 0.1 }, ivy2: { c: '#b4442a', v: 0.1 },
      wst: { c: '#d8d2c2', v: 0.04, pat: 'brick' }, wst2: { c: '#c4bca8', v: 0.04, pat: 'brick' }, wstDk: { c: '#a8a090', v: 0.04 }, carve: { c: '#e8e4d8', v: 0.03 },
      pave: { c: '#bab2a0', top: '#ccc4b2', v: 0.04 }, knot: { c: '#e4dece', top: '#ece8dc', v: 0.03 }, knotDk: { c: '#9a927e', top: '#a69e8a', v: 0.04 },
      glass: { c: '#ffd890', glow: true }, candle: { c: '#fff0c0', glow: true }, wax: { c: '#ece4d0', v: 0.03 }, iron: { c: '#2e2c2a', v: 0.03 },
      mist: { c: '#b8c4cc', top: '#d4dce2', v: 0.04 }, rot: { c: '#e0502a', glow: true }, glint: { c: '#a8d8ff', glow: true },
      grace: { c: '#ffe9a0', glow: true },
      // 이정표(OR.signpost)용
      stoneG: { c: '#a8a090', v: 0.05 }, timber: { c: '#4a3c2c', v: 0.05 }, door: { c: '#6a5638', v: 0.05, pat: 'plank' }, gold: { c: '#ffd070', glow: true }, mlamp: { c: '#ffe0a0', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, TAU = Math.PI * 2;
      const PY = base + 40;                                   // 광장 바닥
      // 아래는 구름 바다
      MH.terrain(w, {
        floor: base - 26,
        height: (x, z) => base - 24 + n.fbm(x * 0.04, z * 0.04, 3) * 5,
        surface: () => B.mist, under: () => B.mist,
      });
      const lights = [], acts = [], landmarks = [];
      const deck = (x, z, y) => { if (x >= 0 && z >= 0 && x < W && z < D) w.hm[x + W * z] = Math.max(w.hm[x + W * z], y); };
      const fly = async (a, from, to, arc, steps, colors, nn) => {
        for (let k = 1; k <= steps; k++) { const t = k / steps, p = LB.lerp3(from, to, t); p[1] += Math.sin(t * Math.PI) * arc; a.burst(p, { n: nn || 8, colors, speed: 0.6, up: 0.4, life: 1, gravity: 0, spread: 0.6 }); await a.wait(0.05); }
      };
      const leaves = (x, y, z, r) => { for (let q = 0; q < 4; q++) { const a = q * 2.1 + x * 0.3, rr = r * (q ? 0.62 : 0.8), ox = q ? Math.cos(a) * r * 0.7 : 0, oz = q ? Math.sin(a) * r * 0.7 : 0, oy = q ? (q % 2 ? -1 : 1) * r * 0.2 : 0; MH.leafBlob(w, Math.round(x + ox), Math.round(y + oy), Math.round(z + oz), rr, rr * 0.55, rr, [B.leafR2, B.leafR, B.leafDk, B.leafG]); } };
      // 가지: 껍질은 어둡고, 위쪽엔 이끼와 창백한 뿌리 그물
      const barkB = (x, y, z, t, dy, d) => dy > 0 && d > 0.7 ? (hash3(x, y, z) > 0.55 ? ((x + z) % 3 === 0 ? B.lattice : B.moss) : B.bark2) : (hash3(x >> 1, y >> 1, z >> 1) > 0.7 ? B.bark2 : B.bark);
      const branch = (pts, r0, r1) => LB.tube(w, pts, t => r0 + (r1 - r0) * t, barkB);

      // ══ 거목 줄기 ══
      for (let y = base - 24; y < Hh - 8; y++) {
        const rr = 15 + Math.max(0, base - y) * 0.15 + Math.sin(y * 0.08) * 1.2 - Math.max(0, y - 130) * 0.15, R = Math.ceil(rr) + 3;
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          const a = Math.atan2(dz, dx), d = Math.hypot(dx, dz), ridge = Math.abs(Math.sin(a * 9 + y * 0.05)) * 2.4;
          if (d > rr + ridge - 1.2 || d < rr - 5) continue;
          w.set(TX + dx, y, TZ + dz, ridge > 1.9 ? B.bark2 : (ridge > 0.8 ? B.bark : B.barkDk));
        }
      }
      // ══ 큰 가지들 ══
      const B1 = branch([[TX + 10, PY - 14, TZ + 10], [80, PY - 8, 80], [PX, PY - 9, PZ], [126, PY - 16, 128], [154, PY - 28, 160]], 9, 4);   // 광장을 받치는 남동 가지
      const B2 = branch([[TX + 12, PY + 2, TZ - 2], [96, PY + 8, 54], [128, PY + 10, 62], [158, PY + 6, 70]], 7, 5);                       // 산책로를 받치는 동쪽 윗가지
      const B3 = branch([[TX - 4, PY - 16, TZ + 14], [44, PY - 18, 90], [36, PY - 17, 114], [30, PY - 26, 150]], 8, 4);                  // 성수 마을 정자 · 가지 끝 축복
      const B4 = branch([[TX + 4, PY + 34, TZ - 8], [86, PY + 52, 28], [128, PY + 50, 18], [160, PY + 40, 14]], 6, 2.5);                  // 뒤쪽 높은 가지(붉은 잎)
      const B5 = branch([[TX - 10, PY + 26, TZ + 4], [24, PY + 40, 60], [10, PY + 34, 90]], 5, 2);
      const B6 = branch([[TX + 2, PY + 50, TZ + 6], [70, PY + 64, 70], [64, PY + 70, 96]], 4, 2);
      // 가지 끝과 높은 곳의 붉은 잎
      [[B4, [0.35, 0.6, 0.8, 1]], [B5, [0.5, 0.8, 1]], [B6, [0.6, 1]], [B1, [1]], [B3, [1]], [B2, [1]]].forEach(([C, fs]) => fs.forEach((f, k) => { const p = C[Math.round(f * (C.length - 1))]; leaves(p[0], p[1] + 4, p[2], 9 - k); }));
      for (let k = 0; k < 9; k++) { const a = k / 9 * TAU, r = 18 + (k % 3) * 6; leaves(TX + Math.cos(a) * r, Hh - 22 - (k % 4) * 6, TZ + Math.sin(a) * r, 10); }
      landmarks.push({ name: '성수', note: '미켈라가 키운 거목', p: [TX + 0.5, Hh - 4, TZ + 0.5] });

      // ══ 광장: 가지 갈래 위의 둥근 테라스 ══
      const PR = 21;
      for (let dz = -PR - 1; dz <= PR + 1; dz++) for (let dx = -PR - 1; dx <= PR + 1; dx++) {
        const d = Math.hypot(dx, dz); if (d > PR + 0.5) continue;
        const x = PX + dx, z = PZ + dz, a = Math.atan2(dz, dx);
        // 매듭 무늬: 동심 고리 + 서로 엇갈리는 두 갈래 띠
        const ringK = Math.abs(d - 7) < 0.6 || Math.abs(d - 14) < 0.6 || d > PR - 1.2;
        const braid = d > 7.5 && d < 13.5 && Math.abs(Math.sin(a * 6 + (d - 7) * 0.5)) < 0.18 || d > 7.5 && d < 13.5 && Math.abs(Math.sin(a * 6 - (d - 7) * 0.5)) < 0.18;
        const inner = d < 6.4 && Math.abs(Math.sin(a * 4)) * d < 0.9;
        for (let y = PY - 3; y <= PY; y++) w.set(x, y, z, y < PY ? (y === PY - 3 ? B.wstDk : B.wst2) : (ringK || inner ? B.knotDk : (braid ? B.knot : B.pave)));
        deck(x, z, PY);
      }
      // 광장 밑 받침(가지와 잇는 깔때기 모양 돌 받침)
      for (let y = PY - 12; y < PY - 3; y++) w.cyl(PX, PZ, y, y, PR - (PY - 3 - y) * 1.6, (y % 3) ? B.wst2 : B.wstDk);
      for (let k = 0; k < 16; k++) { const a = k / 16 * TAU, x0 = PX + Math.cos(a) * (PR - 1), z0 = PZ + Math.sin(a) * (PR - 1); LB.tube(w, [[x0, PY - 4, z0], [PX + Math.cos(a) * (PR - 6), PY - 10, PZ + Math.sin(a) * (PR - 6)]], 0.9, B.wstDk); }
      // 매듭 난간: 기둥 사이로 고리가 엇갈린 낮은 난간(북쪽 계단 자리는 비운다)
      for (let k = 0; k < 220; k++) {
        const a = k / 220 * TAU, x = Math.round(PX + Math.cos(a) * PR), z = Math.round(PZ + Math.sin(a) * PR);
        if (Math.abs(x - PX) <= 6 && z < PZ) continue;
        if (Math.abs(Math.atan2(z - PZ, x - PX) + Math.PI * 0.25) < 0.1) continue;          // 북동쪽 산책로 다리 자리
        const post = k % 11 === 0;
        w.set(x, PY + 1, z, post ? B.wst : ((k >> 1) % 2 ? B.carve : B.wstDk));
        w.set(x, PY + 2, z, post ? B.wst : ((k >> 1) % 2 ? B.wstDk : B.carve));
        if (post) { w.set(x, PY + 3, z, B.wst); w.set(x, PY + 4, z, B.carve); }
        else w.set(x, PY + 3, z, B.carve);
      }
      // 둥근 돌 탁자
      const TBX = PX + 9, TBZ = PZ + 8;
      w.cyl(TBX, TBZ, PY + 1, PY + 1, 1.2, B.wstDk); w.cyl(TBX, TBZ, PY + 2, PY + 2, 0.8, B.wst2); w.cyl(TBX, TBZ, PY + 3, PY + 3, 2.6, B.carve);

      // ══ 1. 쌍둥이 석상: 촛농이 흘러내린 받침 위, 베일을 쓴 돌덩이 둘이 서로 감싼 모양 ══
      const SX = PX - 2, SZ = PZ - 6;
      w.box(SX - 2, PY + 1, SZ - 2, SX + 2, PY + 5, SZ + 2, B.wst); w.box(SX - 3, PY + 1, SZ - 3, SX + 3, PY + 1, SZ + 3, B.wstDk); w.box(SX - 2, PY + 6, SZ - 2, SX + 2, PY + 6, SZ + 2, B.carve);
      const scand = [];
      for (const [dx, dz] of [[-3, -1], [-3, 1], [3, 0], [-1, 3], [1, 3], [0, -3], [2, 3], [3, 2], [-2, 3]]) { w.set(SX + dx, PY + 2, SZ + dz, B.wax); w.set(SX + dx, PY + 3, SZ + dz, B.candle); scand.push([SX + dx, PY + 3, SZ + dz]); }
      for (let k = -2; k <= 2; k++) w.set(SX + k, PY + 5, SZ + 3, B.wax);
      w.ellipsoid(SX - 1, PY + 11, SZ, 2.2, 5, 2, B.carve);                       // 서 있는 이(말레니아): 키 큰 베일
      w.ellipsoid(SX + 1, PY + 9, SZ + 1, 2, 3, 1.8, B.wst);                       // 안긴 이(미켈라): 작은 베일
      w.ellipsoid(SX, PY + 15, SZ, 1.6, 1.6, 1.6, B.carve);
      LB.tube(w, [[SX - 2, PY + 13, SZ], [SX + 1, PY + 13, SZ + 2], [SX + 2, PY + 11, SZ + 1]], 0.8, B.wst2);   // 감싸 안은 팔(베일 주름)
      lights.push({ name: 'statue', p: [SX + 0.5, PY + 4, SZ + 0.5], c: '#ffd890', i: 0.5, d: 16, flicker: 0.3, srcR: 5 });
      // 석상 뒤 붉은 잎 나무(광장 북쪽)
      LB.tube(w, [[SX - 6, PY + 1, SZ - 9], [SX - 5, PY + 10, SZ - 10], [SX - 8, PY + 18, SZ - 12]], 1.4, B.bark);
      leaves(SX - 9, PY + 20, SZ - 13, 6); leaves(SX - 2, PY + 18, SZ - 12, 4);
      acts.push({
        name: '쌍둥이 석상', hint: '말레니아가 미켈라를 감싸 안은 석상 받침의 촛불이 다시 타오르고, 붉은 잎이 내려앉아요', hit: [SX - 3, PY + 1, SZ - 3, SX + 3, PY + 16, SZ + 3],
        run: async a => {
          a.flash('statue', 5, 4);
          for (const c of scand) { a.burst([c[0] + 0.5, c[1] + 0.8, c[2] + 0.5], { n: 12, colors: ['#fff0c0', '#ffd070'], speed: 0.5, up: 2, life: 1.2, gravity: -0.5, spread: 0.3 }); await a.wait(0.12); }
          a.wind(1.2, 3);
          a.burst([SX + 0.5, PY + 22, SZ + 0.5], { n: 70, colors: ['#a43a24', '#c8583a', '#d8a040'], speed: 2, up: 0, life: 3.2, gravity: 1.2, spread: 6 });
          await a.wait(1.4);
        },
      });
      landmarks.push({ name: '쌍둥이 석상', note: '말레니아와 미켈라', p: [SX + 0.5, PY + 26, SZ + 0.5] });

      // ══ 광장 북쪽: 계단 위 불 켜진 회당(가는 기둥과 뾰족 창) ══
      const HY = PY + 8, HZ1 = PZ - PR - 3, HZ0 = HZ1 - 12, HX0 = PX - 13, HX1 = PX + 13;
      MH.flight(w, { name: '회당 계단', axis: 'z', c: PX, half: 5, a: PZ - PR + 9, b: HZ1 + 1, ha: PY, hb: HY, step: B.pave, edge: B.carve, fill: B.wst2, rail: B.wstDk, post: B.wst, postGap: 3 });
      for (let x = HX0; x <= HX1; x++) for (let z = HZ0; z <= HZ1; z++) {
        for (let y = PY - 10; y <= HY; y++) w.set(x, y, z, y === HY ? B.pave : (y % 4 ? B.wst2 : B.wstDk));
        deck(x, z, HY);
        const edge = x === HX0 || x === HX1 || z === HZ0 || z === HZ1; if (!edge) continue;
        const front = z === HZ1, top = HY + 20;
        for (let y = HY + 1; y <= top; y++) {
          const u = front ? x - PX : (x === HX0 || x === HX1 ? z - HZ0 : x - PX);
          let b = (Math.abs(u) % 4 === 0) ? B.carve : B.wst;
          if (y === HY + 9 || y === top) b = B.wstDk;
          if (front && Math.abs(x - PX) <= 2 && y <= HY + 7) b = 0;                                   // 문
          w.set(x, y, z, b);
        }
      }
      for (const [axis, c, lo, hi] of [['x', HZ1, HX0 + 3, HX1 - 3], ['z', HX0, HZ0 + 3, HZ1 - 3], ['z', HX1, HZ0 + 3, HZ1 - 3]]) for (let u = lo; u <= hi; u += 5) {
        if (axis === 'x' && Math.abs(u - PX) < 4) continue;
        LB.arch(w, { axis, c, u0: u, y0: HY + 2, a: 1, h: 6, kind: 'pointed', fill: B.glass, frame: B.carve });
        LB.arch(w, { axis, c, u0: u, y0: HY + 11, a: 1, h: 7, kind: 'pointed', fill: B.glass, frame: B.carve });
      }
      for (let x = HX0; x <= HX1; x++) for (let z = HZ0; z <= HZ1; z++) { const k = Math.min(x - HX0, HX1 - x); w.set(x, HY + 21 + Math.min(6, k >> 1), z, (x + z) % 2 ? B.wstDk : B.wst2); }
      for (const x of [HX0, HX1, PX - 6, PX + 6]) for (const z of [HZ1]) LB.pinnacle(w, x, HY + 21, z, 9, B.wst, B.carve);
      lights.push({ name: 'hall', p: [PX + 0.5, HY + 6, HZ1 - 2.5], c: '#ffd890', i: 0.6, d: 24, flicker: 0.2, srcR: 6 });
      landmarks.push({ name: '광장 회당', note: '계단 위 불 켜진 건물', p: [PX + 0.5, HY + 36, HZ0 + 6] });

      // ══ 2. 성수 마을 광장 축복(탁자 곁) ══
      const gp = LB.grace(w, PX + 4, PY, PZ + 13, B.grace);
      lights.push({ name: 'grace', p: gp, c: '#ffe08a', i: 0.9, d: 12, flicker: 0.1 });
      // (산책로 쪽 목적지는 아래에서 정한 뒤 넣는다)

      // ══ 서쪽 아랫가지: 성수 마을 — 촛불 처녀상이 둘러선 둥근 정자 ══
      const QX = 38, QZ = 104, QY = PY - 12, QR = 10;
      for (let dz = -QR - 1; dz <= QR + 1; dz++) for (let dx = -QR - 1; dx <= QR + 1; dx++) {
        const d = Math.hypot(dx, dz); if (d > QR + 0.5) continue;
        const a = Math.atan2(dz, dx), sig = Math.abs(d - 4) < 0.6 || (d < 4 && Math.abs(Math.sin(a * 3)) * d < 0.7) || Math.abs(d - QR + 0.6) < 0.6;
        for (let y = QY - 3; y <= QY; y++) w.set(QX + dx, y, QZ + dz, y < QY ? B.wst2 : (sig ? B.knotDk : (d < 4.6 ? B.knot : B.pave)));
        deck(QX + dx, QZ + dz, QY);
      }
      const maids = [];
      for (let k = 0; k < 6; k++) {
        const a = k / 6 * TAU + 0.3, x = Math.round(QX + Math.cos(a) * (QR - 2)), z = Math.round(QZ + Math.sin(a) * (QR - 2));
        w.cyl(x, z, QY + 1, QY + 2, 1.3, B.wstDk);                                         // 받침
        w.ellipsoid(x, QY + 6, z, 1.2, 3.4, 1.2, B.carve); w.set(x, QY + 10, z, B.carve);   // 베일 쓴 처녀상
        const hx = Math.round(x - Math.cos(a) * 1.5), hz = Math.round(z - Math.sin(a) * 1.5); w.set(hx, QY + 7, hz, B.wax); w.set(hx, QY + 8, hz, B.candle);
        maids.push([hx, QY + 8, hz]);
        // 가는 기둥과 뾰족 아치(정자 테두리)
        const a2 = a + Math.PI / 6, cx = Math.round(QX + Math.cos(a2) * QR), cz = Math.round(QZ + Math.sin(a2) * QR);
        w.box(cx, QY + 1, cz, cx, QY + 14, cz, B.wst);
      }
      for (let k = 0; k < 180; k++) { const a = k / 180 * TAU, x = Math.round(QX + Math.cos(a) * QR), z = Math.round(QZ + Math.sin(a) * QR), y = QY + 14 + Math.round(Math.abs(Math.sin(a * 3)) * 2); w.set(x, y, z, B.carve); w.set(x, y + 1, z, B.wstDk); }
      lights.push({ name: 'maids', p: [QX + 0.5, QY + 6, QZ + 0.5], c: '#ffd890', i: 0.4, d: 18, flicker: 0.3, srcR: 9 });
      acts.push({
        name: '촛불 든 처녀상', hint: '성수 마을 둥근 정자의 매듭 무늬 바닥 둘레, 처녀상이 든 촛불이 차례로 밝아져요', hit: [QX - 3, QY, QZ - 3, QX + 3, QY + 2, QZ + 3],
        run: async a => {
          a.flash('maids', 4, 4);
          for (const m of maids) { a.burst([m[0] + 0.5, m[1] + 0.8, m[2] + 0.5], { n: 16, colors: ['#fff0c0', '#ffd070', '#ffffff'], speed: 0.6, up: 2.5, life: 1.3, gravity: -0.5, spread: 0.4 }); await a.wait(0.3); }
          for (let k = 0; k < 24; k++) { const t = k / 24 * TAU; a.burst([QX + 0.5 + Math.cos(t) * 4, QY + 1.2, QZ + 0.5 + Math.sin(t) * 4], { n: 3, colors: ['#ffe9a0', '#ffffff'], speed: 0.3, up: 1, life: 1, gravity: -0.4, spread: 0.2 }); await a.wait(0.03); }
        },
      });
      landmarks.push({ name: '성수 마을', note: '촛불 처녀상의 둥근 정자', p: [QX + 0.5, QY + 24, QZ + 0.5] });

      // ══ 남서쪽 가지 끝: 성수 가지 축복 · 선반 버섯 · 미란다 꽃 ══
      const cp = B3[Math.round(B3.length * 0.86)], cgx = Math.round(cp[0]), cgz = Math.round(cp[2]);
      let cgy = Math.round(cp[1]); while (w.get(cgx, cgy + 1, cgz)) cgy++;
      const cgp = LB.grace(w, cgx, cgy, cgz, B.grace);
      lights.push({ name: 'grace2', p: cgp, c: '#ffe08a', i: 0.8, d: 10, flicker: 0.1 });
      const fungi = [];
      const shelf = (p, side, r) => {
        const x0 = Math.round(p[0] + side[0]), y0 = Math.round(p[1]), z0 = Math.round(p[2] + side[1]);
        for (let dz = -Math.ceil(r); dz <= Math.ceil(r); dz++) for (let dx = -Math.ceil(r); dx <= Math.ceil(r); dx++) { const d = Math.hypot(dx, dz); if (d > r) continue; if (!w.get(x0 + dx, y0, z0 + dz)) w.set(x0 + dx, y0, z0 + dz, d > r - 1 ? B.fungusDk : B.fungus); }
        fungi.push([x0, y0, z0]);
      };
      [[B3, 0.55], [B3, 0.7], [B3, 0.8], [B1, 0.75], [B1, 0.86], [B2, 0.4], [B2, 0.7]].forEach(([C, f], k) => { const p = C[Math.round(f * (C.length - 1))], s = k % 2 ? 1 : -1; shelf([p[0], p[1] - 2 + (k % 3), p[2]], [s * 6, -s * 5], 2.5 + (k % 3) * 0.8); });
      // 미란다 꽃(부품): 가지 위의 거대한 꽃 덩어리, 꽃잎을 펼친다
      const mp = B3[Math.round(B3.length * 0.66)];
      let MY = Math.round(mp[1]); const MX = Math.round(mp[0]) + 2, MZ = Math.round(mp[2]); while (w.get(MX, MY + 1, MZ)) MY++;
      w.cyl(MX, MZ, MY + 1, MY + 3, 1.6, B.moss);
      const mir = w.prop({ name: 'miranda', pivot: [MX + 0.5, MY + 4, MZ + 0.5], clipOK: 30 });
      for (let k = 0; k < 6; k++) { const a = k / 6 * TAU; LB.tube(mir, [[MX, MY + 4, MZ], [MX + Math.cos(a) * 3, MY + 7, MZ + Math.sin(a) * 3], [MX + Math.cos(a) * 4.5, MY + 6, MZ + Math.sin(a) * 4.5]], 0.9, k % 2 ? B.fungus : B.sprout); }
      mir.sphere(MX, MY + 5, MZ, 1.5, B.rot);
      lights.push({ name: 'miranda', p: [MX + 0.5, MY + 5, MZ + 0.5], c: '#ff7a4a', i: 0.25, d: 12, flicker: 0.3, srcR: 4 });
      acts.push({
        name: '가지 위 미란다 꽃', hint: '성수 가지 위의 미란다 꽃이 꽃잎을 활짝 펴며 졸음을 부르는 꽃가루를 뿜고, 선반 버섯에서도 홀씨가 날려요', hit: [MX - 4, MY + 2, MZ - 4, MX + 4, MY + 9, MZ + 4],
        run: async a => {
          a.flash('miranda', 6, 3.6);
          await a.tween('miranda', { scl: [1.5, 1.4, 1.5] }, 0.6);
          for (let k = 0; k < 6; k++) { a.burst([MX + 0.5, MY + 7, MZ + 0.5], { n: 30, colors: ['#e8d0ff', '#ffffff', '#ffb0a0'], speed: 2.5, up: 2, life: 2, gravity: -0.1, spread: 2 }); await a.wait(0.25); }
          for (const f of fungi) a.burst([f[0] + 0.5, f[1] + 1, f[2] + 0.5], { n: 10, colors: ['#e8b0a0', '#ffffff'], speed: 0.5, up: 1.5, life: 2, gravity: -0.2, spread: 1 });
          await a.tween('miranda', { scl: [1, 1, 1] }, 0.6);
        },
      });
      acts.push(LB.graceAct({ name: '성수 가지 축복', at: cgp, to: [PX + 0.5, PY + 3, PZ + 0.5], arc: 18, steps: 26, hint: '선반 버섯 핀 가지 끝 축복이 위쪽 성수 마을 광장을 가리켜요' }));
      landmarks.push({ name: '성수 가지', note: '가지 끝 축복 · 선반 버섯', p: [cgp[0], cgp[1] + 14, cgp[2]] });

      // ══ 동쪽 윗가지: 성수 산책로 — 붉은 덩굴 덮인 하얀 정면, 로레타 ══
      const RY = PY + 10, RX0 = 124, RX1 = 162, RZ0 = 64, RZ1 = 82;
      for (let x = RX0; x <= RX1; x++) for (let z = RZ0; z <= RZ1; z++) { for (let y = RY - 3; y <= RY; y++) w.set(x, y, z, y === RY ? (((x + z) >> 1) % 5 === 0 ? B.knotDk : B.pave) : B.wst2); deck(x, z, RY); }
      // 산책로 회랑 건물: 하얀 벽 · 버팀벽 · 긴 뾰족 창 · 가파른 지붕, 남쪽 벽을 붉은 덩굴이 타고 오른다
      const RB = RZ0 - 10, RT = RY + 20;
      for (let x = RX0; x <= RX1; x++) for (let z = RB; z <= RZ0; z++) for (let y = RY + 1; y <= RT; y++) {
        const edge = x === RX0 || x === RX1 || z === RB || z === RZ0; if (!edge) continue;
        const u = x - RX0; let b = (y - RY) % 10 === 0 ? B.wstDk : B.wst;
        if (z === RZ0 && u % 6 >= 2 && u % 6 <= 4 && (y - RY) % 10 > 1 && (y - RY) % 10 < 9) b = (u % 6 === 3 && (y - RY) % 10 > 7) ? B.carve : B.iron;   // 긴 뾰족 창(어두운 안)
        if (z === RZ0 && u % 6 === 3 && (y - RY) % 10 > 1 && (y - RY) % 10 < 8) b = B.carve;                                                      // 창 가운데 살
        w.set(x, y, z, b);
      }
      for (let x = RX0; x <= RX1; x += 6) { w.box(x, RY + 1, RZ0 + 1, x, RT + 2, RZ0 + 1, B.carve); LB.pinnacle(w, x, RT + 3, RZ0 + 1, 5, B.wst, B.carve); }
      for (let x = RX0 - 1; x <= RX1 + 1; x++) for (let z = RB - 1; z <= RZ0 + 1; z++) { const k = Math.min(z - RB + 1, RZ0 + 1 - z); w.set(x, RT + 1 + k, z, (x + k) % 3 ? B.wstDk : B.wst2); }
      for (let x = RX0; x <= RX1; x++) for (let y = RY + 1; y <= RT + 4; y++) {                  // 붉은 덩굴: 아래에서 위로 갈수록 성기게
        const iv = n.fbm(x * 0.3 + 4, y * 0.2, 3) * 0.7 + n.fbm(x * 0.08, 2.5, 2) * 0.5 + Math.max(0, RY + 7 - y) * 0.05 - (y - RY) * 0.012;
        if (iv > 0.52 && !w.get(x, y, RZ0 + 1)) w.set(x, y, RZ0 + 1, iv > 0.6 ? B.ivy2 : B.ivy);
        if (iv > 0.7 && !w.get(x, y, RZ0 + 2) && hash3(x, y, 5) > 0.5) w.set(x, y, RZ0 + 2, B.ivy);
      }
      for (let x = RX0; x <= RX1; x++) if (x % 3) { w.set(x, RY + 1, RZ1, B.carve); w.set(x, RY + 2, RZ1, (x >> 1) % 2 ? B.wstDk : B.carve); }
      // 광장 북동쪽에서 산책로로 오르는 돌다리(비탈)
      const bA = [PX + 15, PZ - 15], bB = [RX0 + 6, RZ1 - 2];
      LB.ramp(w, [[bA[0], bA[1], PY], [PX + 30, PZ - 8, PY + 5], [bB[0], bB[1], RY]], 3, { top: B.pave, edge: B.carve, fill: B.wst2, rail: B.wstDk, post: B.wst, postGap: 5, name: '산책로 다리' });
      // 다리·계단 밑으로 구름까지 내려간 채움 돌은 걷어 낸다(가지와 받침만 남김)
      for (let x = PX - 10; x <= RX0 + 10; x++) for (let z = RZ0 - 12; z <= PZ; z++) {
        const keep = Math.hypot(x - PX, z - PZ) <= PR + 1 || (x >= HX0 && x <= HX1 && z >= HZ0 && z <= HZ1) || (x >= RX0 && z >= RZ0 - 12 && z <= RZ1);
        const top = keep ? PY - 13 : w.hm[x + W * z] - 3;
        for (let y = base - 22; y < top; y++) if (w.get(x, y, z) === B.wst2 || w.get(x, y, z) === B.carve || w.get(x, y, z) === B.wstDk) w.set(x, y, z, 0);
      }
      // 로레타(핀) 와 빛 화살
      const LX = 140, LZ = 72;
      lights.push({ name: 'loretta', p: [LX + 0.5, RY + 4, LZ + 0.5], c: '#a8d8ff', i: 0.05, d: 40, flicker: 0.2, srcR: 6 });
      w.set(LX, RY + 1, LZ, B.glint);
      landmarks.push({ name: '성수의 기사 로레타', note: '보스 · 산책로를 지키는 말 탄 기사', p: [LX + 0.5, RY + 24, LZ + 0.5], boss: true });
      acts.push({
        name: '성수의 기사 로레타', hint: '붉은 덩굴 덮인 산책로에서 로레타의 푸른 빛 화살이 비처럼 광장으로 쏟아져요', hit: [LX - 3, RY, LZ - 3, LX + 3, RY + 3, LZ + 3],
        run: async a => {
          a.flash('loretta', 30, 4.4); a.glow(1.4, 4.4);
          a.burst([LX + 0.5, RY + 6, LZ + 0.5], { n: 40, colors: ['#a8d8ff', '#ffffff', '#6ab0ff'], speed: 2, up: 4, life: 1.2, gravity: -0.4, spread: 1.4 });
          await Promise.all([[-6, -4], [0, 4], [6, -2], [-3, 8], [4, 10]].map(async ([dx, dz], k) => { await a.wait(k * 0.25); const to = [PX + dx + 0.5, PY + 1.5, PZ + dz + 0.5]; await fly(a, [LX + 0.5, RY + 8, LZ + 0.5], to, 14, 16, ['#a8d8ff', '#ffffff'], 6); a.burst(to, { n: 30, colors: ['#a8d8ff', '#ffffff', '#6ab0ff'], speed: 4, up: 2, life: 0.8, gravity: 4, spread: 1.5, flat: true }); }));
        },
      });
      landmarks.push({ name: '성수 산책로', note: '붉은 덩굴 덮인 하얀 정면', p: [(RX0 + RX1) / 2, RY + 46, RZ0 + 0.5] });
      acts.push(LB.graceAct({ name: '성수 마을 광장 축복', at: gp, to: [LX + 0.5, RY + 3, LZ + 0.5], arc: 16, steps: 26, hint: '광장 탁자 곁 축복이 북동쪽 다리 너머 로레타가 지키는 산책로를 가리켜요' }));

      // ══ 붉은 잎 바람: 광장 뒤 높은 가지의 잎이 한꺼번에 쏟아진다 ══
      const lf = B6[B6.length - 1];
      acts.push({
        name: '붉은 잎 바람', hint: '광장 위 높은 가지 끝 붉은 잎 덤불이 바람에 흔들려 잎이 광장으로 쏟아져요', hit: [Math.round(lf[0]) - 4, Math.round(lf[1]) + 1, Math.round(lf[2]) - 4, Math.round(lf[0]) + 4, Math.round(lf[1]) + 7, Math.round(lf[2]) + 4],
        run: async a => { a.wind(2.6, 4); for (let k = 0; k < 10; k++) { a.burst([lf[0] - 8 + k * 3, lf[1] + 4, lf[2] + (k % 3) * 4], { n: 40, colors: ['#a43a24', '#c8583a', '#8a2e22', '#d8a040'], speed: 4, up: -0.5, life: 3.4, gravity: 1.6, spread: 7, flat: true }); await a.wait(0.3); } },
      });

      // ══ 산책로 남쪽 끝: 에브레펠로 내려가는 승강기 · 이정표 ══
      const ELX = RX1 - 6, ELZ = RZ1 + 6;
      for (let x = ELX - 4; x <= ELX + 4; x++) for (let z = RZ1 + 1; z <= ELZ + 4; z++) { for (let y = RY - 3; y <= RY; y++) w.set(x, y, z, y === RY ? B.pave : B.wst2); deck(x, z, RY); }
      for (let y = RY - 30; y <= RY + 14; y++) for (const [dx, dz] of [[-3, -1], [3, -1], [-3, 4], [3, 4]]) if (y > RY || y < RY - 3) w.set(ELX + dx, y, ELZ + dz, B.iron);
      w.box(ELX - 3, RY + 14, ELZ - 1, ELX + 3, RY + 14, ELZ + 4, B.iron);
      {
        const sx = ELX - 4, sz = ELZ + 4, sp = OR.signpost(w, B, sx, sz, { dir: [0, -1], boards: 1, h: 6 });
        acts.push(OR.goAct({ at: sp, name: '성수 뿌리로', goto: 'elphael', hint: '산책로 끝 승강기로 에브레펠을 내려가 맨 밑 납골당, 말레니아가 기다리는 성수 뿌리로 돌아가요' }));
        landmarks.push({ name: '승강기', note: '에브레펠 · 성수 뿌리로', p: [ELX + 0.5, RY + 20, ELZ + 0.5] });
      }
      return { lights, landmarks, acts };
    },
  });
})();
