// 황금 나무 대성당(하위 지도) — 도읍 로데일 남동쪽, 황금 나무 밑동 곁의 무너진 대성당. 첫 왕 고드프리(황금의 망령)와 싸우는 본당.
// 서쪽 정문 앞 마당에 라다곤 석상, 본당 가운데 메달 무늬 바닥과 축복, 북쪽 벽에 붉은 2층 회랑, 남쪽은 높은 아치 너머 발코니,
// 동쪽 둥근 끝(제단 자리)으로 거대한 가지가 들어와 2층 회랑까지 이어지고, 회랑 북쪽 다리가 여왕의 규방과 엘데의 왕좌로 간다. (도읍 로데일의 하위 지도)
// 좌표: +x 동쪽, +z 남쪽. 기본 시점(남동쪽)에서 보면 남쪽 아치 너머로 본당 바닥이 보이고, 뒤(북)가 붉은 회랑, 오른쪽(동)이 둥근 끝과 가지.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 160, D = 160, Hh = 112;
  const HX0 = 36, HX1 = 120, HZ0 = 46, HZ1 = 100;                 // 본당 안쪽
  const AX = 120, AZ = 73, AR = 20;                               // 동쪽 둥근 끝
  const MX = 78, MZ = 75;                                         // 메달 무늬 바닥 한가운데(축복)
  MAPS.push({
    id: 'leyndell-sub', cat: 'lands', sub: true, parent: 'leyndell', name: '황금 나무 대성당', en: 'Erdtree Sanctuary', color: '#d8a848', seed: 551, base: 40, time: 'day', size: [W, D, Hh],
    desc: '도읍 로데일 남동쪽, 황금 나무 밑동 곁에 선 대성당. 지붕은 무너져 뿌리와 금빛 덩굴이 늘어졌고, 메달 무늬가 새겨진 바닥 한가운데 축복이 빛난다. 첫 왕 고드프리의 황금 망령이 이 본당을 지키며, 동쪽 발코니로 들어온 거대한 가지를 타고 2층 회랑에 오르면 다리 너머 여왕의 규방과 엘데의 왕좌로 이어진다. 정문 앞 마당의 라다곤 석상은 회귀의 기도에 숨은 진실을 드러낸다.',
    info: { title: '장소 정보', en: 'ERDTREE SANCTUARY', rows: [['들어가는 길', '도읍 로데일 대로 → 석상 마당 → 서쪽 정문'], ['본당', '붉은 2층 회랑 · 메달 무늬 바닥 · 축복'], ['보스', '첫 왕 고드프리(황금의 망령)'], ['왕좌로', '동쪽 발코니 → 거대한 가지 → 2층 회랑 → 다리 → 여왕의 규방']] },
    monsters: { normal: ['로데일 병사', '신탁의 사자', '로데일 기사'], mid: '라다곤 석상의 수수께끼', boss: '첫 왕 고드프리(황금의 망령)' },
    sky: ['#ecd8b0', '#8a98b4', '#fff0c8'], stars: false,
    hemi: ['#fff2dc', '#4a4236', 0.6], sun: ['#fff0d0', 0.78, [0.4, 1, 0.65]],
    night: { sky: ['#3a3040', '#0b0d1a', '#e8c070'], stars: true, hemi: ['#c8b4a0', '#201a14', 0.5], sun: ['#ffe0a0', 0.42, [0.4, 1, 0.65]], haze: '#3a3028' },
    liquid: ['#5a8aa0', '#8ac0d0', '#e8ffff'], liqSpeed: 0.6,
    fog: { start: 0.84, floor: 8, depth: 10, haze: [30, 0.22, 12], hazeColor: '#e8d8b8' },
    camY: 2, zoom: 1.8,
    particles: [
      { n: 700, colors: ['#ffd25a', '#f0b040', '#ffe9a0', '#e89a30'], mode: 'fall', speed: 0.4, wind: 0.4, y0: 40, y1: 100, glow: true },
      { n: 140, colors: ['#fff0b0', '#ffd870'], mode: 'rise', speed: 0.4, area: [MX, MZ, 14], y0: 41, y1: 80, glow: true },
    ],
    blocks: {
      grass: { c: '#5e5434', top: '#8e8a4a', v: 0.1 }, soil: { c: '#5a4a34', v: 0.08 }, rock: { c: '#8a8070', v: 0.06, pat: 'big' }, rockDk: { c: '#6c6458', v: 0.06, pat: 'stone' },
      // 바닥: 잿빛 돌판, 금 간 자리, 메달 무늬 바닥
      floorG: { c: '#8a867c', top: '#a6a195', v: 0.05, pat: 'stone' }, floorG2: { c: '#86827a', top: '#9b968a', v: 0.05, pat: 'stone' }, floorD: { c: '#6e6a62', top: '#77726a', v: 0.04 },
      carpet: { c: '#c8c0aa', top: '#d8d0ba', v: 0.03 }, carpetR: { c: '#a69c86', top: '#ada38c', v: 0.03 }, carpetB: { c: '#b8ae96', top: '#c0b69e', v: 0.03 },
      // 벽: 잿빛 석회암, 기둥, 어두운 안쪽
      wallG: { c: '#a8a294', v: 0.05, pat: 'big' }, wallGD: { c: '#8a8578', v: 0.05, pat: 'big' }, wallGL: { c: '#c4beb0', v: 0.03 }, archIn: { c: '#26221e', v: 0.02 },
      // 붉은 2층 회랑(테라코타)
      terra: { c: '#8e5c42', v: 0.05, pat: 'brick' }, terraDk: { c: '#6c4230', v: 0.05 }, terraLt: { c: '#ad7454', v: 0.04 },
      lime: { c: '#d8ceb4', v: 0.04, pat: 'brick' }, limeDk: { c: '#b4a88e', v: 0.05, pat: 'brick' }, limeLt: { c: '#ece4cc', v: 0.03 }, trim: { c: '#f2ead2', v: 0.02 }, urn: { c: '#9a8a6c', v: 0.04 },
      wallS: { c: '#c8bea4', v: 0.05, pat: 'big' }, wallSd: { c: '#a89c84', v: 0.05, pat: 'big' },
      // 마른 풀, 검은 뿌리, 금빛 덩굴, 거대한 가지
      grassD: { c: '#c8a040', v: 0.12 }, grassD2: { c: '#a88430', v: 0.12 }, rootBk: { c: '#2e2620', v: 0.05 },
      leafV: { c: '#d0a830', top: '#ecc448', v: 0.12 }, leafV2: { c: '#b08a26', v: 0.12 }, vineS: { c: '#6a5a3a', v: 0.06 },
      branch: { c: '#6a5a48', v: 0.07, pat: 'big' }, branchD: { c: '#4e4236', v: 0.06 }, branchT: { c: '#8e7e66', v: 0.06 },
      leafG: { c: '#d8a830', top: '#f2c850', v: 0.1 }, leafO: { c: '#c8882a', top: '#e8a440', v: 0.1 }, bark: { c: '#5a4632', v: 0.06 },
      // 빛
      glyph: { c: '#ffd860', glow: true }, sconce: { c: '#ffc860', glow: true }, erd: { c: '#ffd25a', glow: true }, holy: { c: '#fff0b8', glow: true },
      statue: { c: '#b8b2a4', v: 0.05, pat: 'big' }, statueD: { c: '#8e887a', v: 0.05 },
      slate: { c: '#56606c', v: 0.05, pat: 'tile' }, slateDk: { c: '#3e4652', v: 0.04 }, goldS: { c: '#d8b048', v: 0.05 }, domeG: { c: '#d8ac44', v: 0.05, pat: 'tile' },
      win: { c: '#ffd890', night: true, day: '#5a5a62' }, iron: { c: '#3a3a40', v: 0.03 },
      grace: { c: '#ffe9a0', glow: true },
      // 이정표(OR.signpost)용
      stoneG: { c: '#9a9080', v: 0.05 }, timber: { c: '#5a4430', v: 0.05 }, door: { c: '#7a5a34', v: 0.04, pat: 'plank' }, gold: { c: '#e8b440', glow: true }, mlamp: { c: '#ffd070', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base;
      const FL = base, LOW = base - 24, GY = FL + 13;                // 본당 바닥 · 아랫도시 · 2층 회랑 바닥
      const inHall = (x, z) => x >= HX0 - 2 && x <= HX1 && z >= HZ0 - 2 && z <= HZ1 + 2;
      const inTerS = (x, z) => x >= HX0 && x <= HX1 - 2 && z > HZ1 + 2 && z <= 116;
      const inApse = (x, z) => x >= HX1 - 4 && Math.hypot(x - AX, z - AZ) <= AR + 9;
      const inYard = (x, z) => x >= 4 && x < HX0 - 2 && z >= 50 && z <= 98;
      const inF = (x, z) => inHall(x, z) || inTerS(x, z) || inApse(x, z) || inYard(x, z);
      const F = new Uint8Array(W * D);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) F[x + W * z] = inF(x, z) ? 1 : 0;
      const isF = (x, z) => x >= 0 && z >= 0 && x < W && z < D && F[x + W * z] === 1;
      const edgeF = (x, z) => [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => !isF(x + a, z + b));
      MH.terrain(w, {
        floor: LOW - 6,
        height: (x, z) => isF(x, z) ? FL : LOW + n.fbm(x * 0.05, z * 0.05) * 2,
        surface: (x, z, y) => y >= FL ? (hash3(x >> 1, 2, z >> 1) > 0.6 ? B.floorG2 : B.floorG) : (n.fbm(x * 0.1, z * 0.1, 2) > 0.55 ? B.grass : B.floorG2),
        under: (x, z, y, dep) => isF(x, z) && edgeF(x, z) ? ((y - LOW) % 7 === 0 ? B.wallSd : B.wallS) : (dep < 2 ? B.soil : (y % 5 === 0 ? B.rockDk : B.rock)),
      });
      const lights = [], acts = [], landmarks = [];
      const TAU = Math.PI * 2;
      const fly = async (a, from, to, arc, steps, colors, nn) => { for (let k = 1; k <= steps; k++) { const t = k / steps, p = LB.lerp3(from, to, t); p[1] += Math.sin(t * Math.PI) * arc; a.burst(p, { n: nn || 8, colors, speed: 0.6, up: 0.4, life: 1, gravity: 0, spread: 0.6 }); await a.wait(0.05); } };

      // ══ 바닥: 금 간 돌판, 마른 풀, 금빛 낙엽 ══
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        if (!isF(x, z)) continue;
        const c = n.fbm(x * 0.12 + 3, z * 0.12, 2), h = hash3(x, 5, z);
        if (Math.abs(c - 0.5) < 0.025) w.set(x, FL, z, B.floorD);                       // 갈라진 금
        else if (h > 0.975) w.set(x, FL, z, B.leafV);
        if ((inHall(x, z) || inApse(x, z)) && Math.abs(c - 0.5) < 0.04 && h > 0.82) w.set(x, FL + 1, z, h > 0.8 ? B.grassD : B.grassD2);
      }

      // ══ 메달 무늬 바닥(본당 한가운데) ══
      const CX0 = MX - 17, CX1 = MX + 17, CZ0 = MZ - 9, CZ1 = MZ + 9;
      for (let z = CZ0; z <= CZ1; z++) for (let x = CX0; x <= CX1; x++) {
        let b = B.carpet;
        if (x - CX0 < 2 || CX1 - x < 2 || z - CZ0 < 2 || CZ1 - z < 2) b = (x + z) % 2 ? B.carpetB : B.carpetR;
        else for (const mx of [MX - 11, MX, MX + 11]) { const d = Math.hypot(x - mx, z - MZ); if (d < 6.5 && (Math.abs(d - 2) < 0.5 || Math.abs(d - 4.3) < 0.5 || (d > 4.8 && Math.abs(Math.sin(Math.atan2(z - MZ, x - mx) * 6)) * d < 0.6))) b = B.carpetR; }
        w.set(x, FL, z, b); w.set(x, FL + 1, z, 0);
      }
      const gp = LB.grace(w, MX, FL, MZ, B.grace);
      lights.push({ name: 'grace', p: gp, c: '#ffe08a', i: 1.0, d: 12, flicker: 0.1 });

      // ══ 바깥 벽: 북쪽·서쪽은 높은 잿빛 벽(기둥·막힌 아치·높은 창), 남쪽은 아치 기둥줄 ══
      const WH = FL + 30;
      w.box(HX0 - 2, FL + 1, HZ0 - 2, HX1, WH, HZ0 - 1, B.wallG);                       // 북쪽 벽
      w.box(HX0 - 2, FL + 1, HZ0 - 2, HX0 - 1, WH, HZ1 + 2, B.wallG);                   // 서쪽 벽
      for (let x = HX0; x <= HX1; x += 8) { w.box(x, FL + 1, HZ0, x + 1, WH, HZ0, B.wallGL); }
      for (let z = HZ0 + 4; z <= HZ1; z += 8) { w.box(HX0, FL + 1, z, HX0, WH, z + 1, B.wallGL); }
      for (let z = HZ0; z <= HZ1; z += 8) if (Math.abs(z - MZ) > 6) w.box(HX0 - 3, FL + 1, z, HX0 - 3, WH - 1, z + 1, B.wallGL);   // 바깥(서쪽) 면 기둥
      w.box(HX0 - 3, FL + 16, HZ0 - 2, HX0 - 3, FL + 16, HZ1 + 2, B.wallGD);
      for (const y of [FL + 28, WH]) { w.box(HX0 - 2, y, HZ0 - 2, HX1, y, HZ0, B.wallGD); w.box(HX0 - 2, y, HZ0 - 2, HX0, y, HZ1 + 2, B.wallGD); }
      for (let x = HX0 + 4; x <= HX1 - 4; x += 8) LB.arch(w, { axis: 'x', c: HZ0 - 1, u0: x, y0: FL + 17, a: 2, h: 9, kind: 'round', fill: B.archIn, frame: B.wallGL, depth: 1, dir: -1 });
      for (let z = HZ0 + 8; z <= HZ1 - 4; z += 8) if (Math.abs(z - MZ) > 6) LB.arch(w, { axis: 'z', c: HX0 - 1, u0: z, y0: FL + 4, a: 2, h: 12, kind: 'round', fill: B.archIn, frame: B.wallGL, depth: 1 });
      // 남쪽: 높은 아치 기둥줄(군데군데 무너졌다)
      const SZ = HZ1 + 1;
      w.box(HX0, FL + 1, SZ, HX1 - 2, FL + 24, SZ + 1, B.wallG);
      w.box(HX0, FL + 24, SZ, HX1 - 2, FL + 24, SZ + 1, B.wallGD);
      for (let x = HX0 + 7; x <= HX1 - 4; x += 12) {
        LB.arch(w, { axis: 'x', c: SZ, u0: x, y0: FL + 1, a: 4, h: 18, kind: 'round', fill: 0, frame: B.wallGL, depth: 2 });
        if (x + 6 <= HX1 - 2) { w.box(x + 5, FL + 1, SZ - 1, x + 7, FL + 22, SZ + 2, B.wallG); w.box(x + 5, FL + 1, SZ - 1, x + 7, FL + 2, SZ + 2, B.wallGL); w.box(x + 5, FL + 17, SZ - 1, x + 7, FL + 18, SZ + 2, B.wallGL); }
        if (hash3(x, 3, 1) > 0.75) for (let y = FL + 20; y <= FL + 24; y++) for (let u = -4; u <= 4; u++) if (hash3(x + u, y, 7) > 0.25 - (y - FL - 19) * 0.1) for (const z of [SZ, SZ + 1]) w.set(x + u, y, z, 0);
      }
      // 남쪽 발코니 난간
      for (let x = HX0; x <= HX1 - 2; x++) { w.set(x, FL + 1, 116, B.limeLt); w.set(x, FL + 2, 116, B.trim); if (x % 8 === 0) { w.box(x, FL + 1, 116, x, FL + 3, 116, B.limeDk); w.set(x, FL + 4, 116, B.urn); } }
      for (let z = HZ1 + 3; z <= 116; z++) { w.set(HX0, FL + 1, z, B.limeLt); w.set(HX0, FL + 2, z, B.trim); }

      // ══ 붉은 2층 회랑(북쪽 벽에 붙은 테라코타 아케이드) ══
      const GX0 = 46, GX1 = 104, GZf = 56;                                              // 회랑 앞면 z
      for (let x = GX0; x <= GX1; x++) for (let y = FL + 1; y <= GY; y++) w.set(x, y, GZf, y >= GY - 1 ? B.terraLt : B.terra);
      for (let x = GX0 + 4; x <= GX1 - 4; x += 9) {
        LB.arch(w, { axis: 'x', c: GZf, u0: x + 0.5, y0: FL + 1, a: 3.5, h: 10, kind: 'round', fill: 0, frame: B.terraLt, depth: 1 });
      }
      for (let x = GX0; x <= GX1; x += 9) { w.box(x, FL + 1, GZf, x, GY - 2, GZf + 1, B.terraDk); for (let y = FL + 1; y <= GY - 2; y++) if (y % 2) w.set(x, y, GZf + 1, B.terra); w.box(x - 1, GY - 3, GZf, x + 1, GY - 2, GZf + 1, B.terraLt); w.box(x - 1, FL + 1, GZf, x + 1, FL + 1, GZf + 1, B.terraLt); }
      for (const x of [GX0, GX1]) w.box(x, FL + 1, HZ0, x, GY, GZf, B.terra);          // 양 끝 벽
      w.box(GX0, GY, HZ0, GX1, GY, GZf + 1, B.terraDk);                                  // 2층 바닥
      for (let x = GX0; x <= GX1; x++) { w.set(x, GY + 1, GZf + 1, x % 3 ? B.terraLt : B.terraDk); w.set(x, GY + 2, GZf + 1, B.terraLt); }
      // 2층: 뒤로 물린 작은 아치 벽과 처마
      const UZ = GZf - 4;
      for (let x = GX0; x <= GX1; x++) for (let y = GY + 1; y <= GY + 11; y++) w.set(x, y, UZ, y >= GY + 10 ? B.terraLt : B.terra);
      for (let x = GX0 + 4; x <= GX1 - 4; x += 9) LB.arch(w, { axis: 'x', c: UZ, u0: x + 0.5, y0: GY + 1, a: 2.5, h: 7, kind: 'round', fill: B.archIn, frame: B.terraLt, depth: 1 });
      for (let x = GX0; x <= GX1; x++) w.set(x, GY + 12, UZ, B.terraDk);
      // 기둥 촛대(2층 바닥 아래 기둥마다)
      const sconces = [];
      for (let x = GX0 + 9; x <= GX1 - 9; x += 18) { w.set(x, FL + 7, GZf + 2, B.iron); w.set(x, FL + 8, GZf + 2, B.sconce); sconces.push([x, FL + 8, GZf + 2]); }
      lights.push({ name: 'sconce', p: [MX + 0.5, FL + 8, GZf + 3], c: '#ffc070', i: 0.2, d: 30, flicker: 0.3, srcR: 20 });
      acts.push({
        name: '붉은 2층 회랑', hint: '북쪽 벽에 붙은 붉은 회랑 기둥마다 촛대가 켜지고, 2층 난간 위로 금빛이 번져요', hit: [GX0 + 20, FL + 1, GZf - 1, GX0 + 38, GY + 2, GZf + 2],
        run: async a => {
          a.flash('sconce', 8, 4);
          for (const [x, y, z] of sconces) { a.burst([x + 0.5, y + 0.5, z + 0.5], { n: 24, colors: ['#ffc860', '#ffe9a0', '#ff9a3a'], speed: 1.2, up: 3, life: 1.4, gravity: -0.4, spread: 0.6 }); await a.wait(0.25); }
          for (let x = GX0; x <= GX1; x += 6) { a.burst([x + 0.5, GY + 3, GZf + 1.5], { n: 12, colors: ['#ffe9a0', '#ffd25a'], speed: 1, up: 2, life: 1.4, gravity: -0.3, spread: 1 }); await a.wait(0.08); }
          await a.wait(1);
        },
      });
      landmarks.push({ name: '붉은 2층 회랑', note: '가지를 타고 오르는 본당의 2층', p: [MX + 0.5, GY + 22, GZf - 2] });

      // ══ 동쪽 둥근 끝: 기둥 고리(지붕 없음)와 둥근 발코니, 두 단 계단 ══
      for (let z = AZ - AR - 9; z <= AZ + AR + 9; z++) for (let x = HX1 - 4; x <= AX + AR + 9; x++) {
        const d = Math.hypot(x - AX, z - AZ); if (d > AR + 9 || x < HX1 - 2) continue;
        if (d > AR - 1) { w.set(x, FL + 1, z, d > AR + 0.5 ? B.floorG : B.limeDk); if (d > AR + 0.5) w.set(x, FL + 2, z, B.floorG2); }
      }
      for (let k = 0; k < 360; k++) { const a = -Math.PI / 2 + k / 360 * Math.PI, x = Math.round(AX + Math.cos(a) * (AR + 9)), z = Math.round(AZ + Math.sin(a) * (AR + 9)); w.set(x, FL + 3, z, B.limeLt); w.set(x, FL + 4, z, B.trim); if (k % 30 === 0) { w.box(x, FL + 3, z, x, FL + 5, z, B.limeDk); w.set(x, FL + 6, z, B.urn); } }
      const ring = [];
      for (let k = 0; k <= 8; k++) { const a = -Math.PI / 2 + k / 8 * Math.PI, x = Math.round(AX + Math.cos(a) * AR), z = Math.round(AZ + Math.sin(a) * AR); w.box(x - 1, FL + 1, z - 1, x + 1, FL + 22, z + 1, B.wallG); w.box(x - 1, FL + 1, z - 1, x + 1, FL + 2, z + 1, B.wallGL); w.box(x - 1, FL + 20, z - 1, x + 1, FL + 21, z + 1, B.wallGL); ring.push([x, z]); }
      for (let k = 0; k < 400; k++) { const a = -Math.PI / 2 + k / 400 * Math.PI, x = Math.round(AX + Math.cos(a) * AR), z = Math.round(AZ + Math.sin(a) * AR); if (hash3(k >> 4, 2, 5) > 0.3) { w.set(x, FL + 22, z, B.wallGD); w.set(x, FL + 23, z, B.wallG); } }
      // 둥근 끝과 본당을 가르는 개선 아치
      w.box(HX1 - 1, FL + 1, HZ0 - 2, HX1, WH, AZ - AR + 2, B.wallG); w.box(HX1 - 1, FL + 1, AZ + AR - 2, HX1, WH - 4, HZ1 + 2, B.wallG);
      w.box(HX1 - 1, FL + 26, AZ - AR + 2, HX1, FL + 29, AZ + AR - 2, B.wallGD);
      landmarks.push({ name: '동쪽 발코니', note: '둥근 끝 · 가지가 들어온다', p: [AX + 18.5, FL + 26, AZ + 0.5] });

      // ══ 거대한 가지: 북동쪽 하늘에서 내려와 동쪽 발코니에 닿고, 다시 2층 회랑 끝으로 오른다 ══
      const BR = [[158, FL + 54, 2], [150, FL + 30, 30], [142, FL + 6, 58], [132, FL + 4, 66], [118, FL + 9, 60], [106, GY + 1, 54]];
      const BRr = t => t < 0.5 ? 5 - t * 4 : 3 - (t - 0.5) * 1.6;
      const brC = LB.tube(w, BR, BRr, (x, y, z, t, dy, d) => dy > 0 && d > 0.7 ? B.branchT : (d > 0.8 && hash3(x, y, z) > 0.975 ? B.erd : (hash3(x, y >> 1, z) > 0.7 ? B.branchD : B.branch)));
      // 곁가지와 잎
      for (const [k0, len, dx, dz] of [[0.18, 14, -10, 6], [0.3, 12, 8, 10], [0.12, 16, 6, -8]]) {
        const p = brC[Math.round(k0 * (brC.length - 1))];
        const C = LB.tube(w, [p, [p[0] + dx * 0.5, p[1] + 4, p[2] + dz * 0.5], [p[0] + dx, p[1] + 2, p[2] + dz]], t => 1.6 - t, B.branchD);
        const e = C[C.length - 1]; MH.leafBlob(w, Math.round(e[0]), Math.round(e[1]), Math.round(e[2]), 3.4, 2.6, 3.4, [B.leafV, B.leafV2, B.leafV]);
      }
      lights.push({ name: 'branch', p: [132.5, FL + 10, 66.5], c: '#ffd25a', i: 0.1, d: 30, flicker: 0.2, srcR: 18 });
      acts.push({
        name: '거대한 가지 길', hint: '동쪽 발코니로 들어온 황금 나무의 가지를 따라 금빛이 2층 회랑까지 타고 올라요', hit: [126, FL + 2, 60, 140, FL + 12, 72],
        run: async a => {
          a.flash('branch', 10, 4);
          for (let k = Math.round(brC.length * 0.45); k < brC.length; k += 3) { const p = brC[k], t = k / (brC.length - 1); a.burst([p[0] + 0.5, p[1] + BRr(t) + 1, p[2] + 0.5], { n: 14, colors: ['#ffe9a0', '#ffd25a', '#f0b040'], speed: 1, up: 3, life: 1.4, gravity: -0.3, spread: 1 }); await a.wait(0.07); }
          for (let k = Math.round(brC.length * 0.45); k > 0; k -= 6) { const p = brC[k]; a.burst([p[0], p[1] + 4, p[2]], { n: 20, colors: ['#ffd25a', '#ffe9a0', '#e8a440'], speed: 3, up: 1, life: 2.4, gravity: 1.6, spread: 4, flat: true }); await a.wait(0.08); }
          await a.wait(0.8);
        },
      });

      // ══ 무너진 둥근 천장의 갈빗대 셋과 늘어진 금빛 덩굴·뿌리(부품) ══
      const ribsX = [56, 80, 104];
      for (const x of ribsX) {
        for (let k = 0; k <= 80; k++) { const t = k / 80, z = HZ0 + (HZ1 + 1 - HZ0) * t, y = Math.round(WH - 2 + Math.sin(t * Math.PI) * 8 - t * 6); if (t > 0.78 && hash3(x, 1, 1) > 0.3) continue; w.set(x, y, Math.round(z), B.wallGD); w.set(x, y - 1, Math.round(z), B.wallG); }
      }
      const vines = w.prop({ name: 'vines', pivot: [80.5, WH + 4, 70.5], axis: 'x', rock: 0.02, rockSpeed: 0.5, clipOK: 60 });
      const vineTips = [];
      for (const x of ribsX) for (let k = 0; k < 5; k++) {
        const t = 0.12 + k * 0.14, z = Math.round(HZ0 + (HZ1 + 1 - HZ0) * t), y0 = Math.round(WH - 2 + Math.sin(t * Math.PI) * 8 - t * 6) - 2, L = 5 + (hash3(x, k, 3) * 9 | 0);
        if (Math.hypot(x - MX, z - MZ) < 9 && L > 9) continue;
        for (let q = 0; q < L; q++) { const yy = y0 - q, xx = x + Math.round(Math.sin(q * 0.5 + k) * 0.6); vines.set(xx, yy, z, q % 3 === 0 ? B.vineS : (hash3(xx, yy, z) > 0.5 ? B.leafV : B.leafV2)); if (q % 3 === 1) vines.set(xx + (q % 2 ? 1 : -1), yy, z, B.leafV); }
        vineTips.push([x, y0 - L, z]);
      }
      acts.push({
        name: '늘어진 금빛 덩굴', hint: '무너진 천장 갈빗대에 늘어진 금빛 덩굴이 흔들리며 잎이 흩날려요', hit: [76, WH - 18, 60, 84, WH - 2, 80],
        run: async a => {
          a.wind(3, 4);
          for (let k = 0; k < 3; k++) { await a.turn('vines', [0.07, 0, 0], 0.7); await a.turn('vines', [-0.06, 0, 0], 0.8); }
          a.turn('vines', [0, 0, 0], 0.6);
          for (const p of vineTips) { a.burst([p[0] + 0.5, p[1], p[2] + 0.5], { n: 10, colors: ['#ecc448', '#d0a830', '#ffe9a0'], speed: 1, up: 0, life: 2.4, gravity: 1.2, spread: 1.4 }); }
          await a.wait(1.2);
        },
      });

      // ══ 바닥을 기는 검은 뿌리(동쪽 끝에서 본당으로) ══
      for (let k = 0; k < 3; k++) {
        const z0 = AZ - 9 + k * 9, pts = [[AX + 6, FL + 1, z0]];
        for (let s = 1; s <= 5; s++) { const x = AX + 6 - s * (7 + k % 3), z = z0 + Math.sin(s * 0.9 + k) * 2.5; pts.push([x, FL + 1, z]); }
        LB.tube(w, pts, 0.45, (x, y, z) => (y === FL + 1 && !(x >= CX0 && x <= CX1 && z >= CZ0 && z <= CZ1)) ? B.branchD : 0, { under: true });
      }

      // ══ 보스: 첫 왕 고드프리(황금의 망령, 핀)와 발구르기 ══
      landmarks.push({ name: '첫 왕 고드프리', note: '보스 · 황금의 망령', p: [MX + 0.5, FL + 30, MZ + 0.5], boss: true });
      const slabs = [];
      for (let k = 0; k < 10; k++) {
        const a = k / 10 * TAU + 0.3, rr = 12 + (k % 3) * 4, sx = Math.round(MX + Math.cos(a) * rr * 1.3), sz = Math.round(MZ + Math.sin(a) * rr * 0.8);
        if (sx >= CX0 - 1 && sx <= CX1 + 1 && sz >= CZ0 - 1 && sz <= CZ1 + 1) continue;
        const pr = w.prop({ name: 'slab' + slabs.length, pivot: [sx + 0.5, FL, sz + 0.5] });
        for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1 + (k & 1); dx++) { w.set(sx + dx, FL, sz + dz, 0); w.set(sx + dx, FL + 1, sz + dz, 0); pr.set(sx + dx, FL, sz + dz, (dx + dz) & 1 ? B.floorG : B.floorG2); }
        slabs.push([sx, sz]);
      }
      lights.push({ name: 'shade', p: [MX + 0.5, FL + 8, MZ + 0.5], c: '#ffe08a', i: 0.1, d: 40, flicker: 0.2, srcR: 24 });
      acts.push({
        name: '황금 망령의 발구르기', hint: '첫 왕 고드프리의 황금 망령이 발을 구르면 땅울림이 번지고 바닥 돌판이 튀어 올라요', hit: [MX - 6, FL - 1, MZ - 4, MX + 6, FL + 3, MZ + 4],
        run: async a => {
          a.flash('shade', 12, 4); a.glow(1.5, 4);
          a.burst([MX + 0.5, FL + 6, MZ + 0.5], { n: 80, colors: ['#ffe9a0', '#ffd25a', '#fff6d0'], speed: 2, up: 6, life: 1.6, gravity: -0.2, spread: 3 });
          for (let s = 0; s < 3; s++) {
            for (let r = 3; r <= 24; r += 3) { a.burst([MX + 0.5, FL + 1.2, MZ + 0.5], { n: 20 + r * 2, colors: ['#ffe9a0', '#ffd25a', '#a6a195'], speed: r * 0.6, up: 0.6, life: 0.5, gravity: 2, spread: 0.5, flat: true }); }
            await Promise.all(slabs.map((_, k) => a.tween('slab' + k, { off: [0, 2.4 + (k % 3), 0], rot: [k % 2 ? 0.25 : -0.2, 0, k % 3 ? 0.2 : -0.25] }, 0.2)));
            await Promise.all(slabs.map((_, k) => a.tween('slab' + k, { off: [0, 0, 0], rot: [0, 0, 0] }, 0.3, t => t * t)));
            await a.wait(0.35);
          }
        },
      });

      // ══ 축복(메달 무늬 한가운데) — 2층 회랑과 다리 쪽을 가리킨다 ══
      acts.push(LB.graceAct({ name: '대성당 축복', at: gp, to: [100.5, GY + 4, HZ0 + 3.5], arc: 12, steps: 20, hint: '대성당 축복이 붉은 2층 회랑 끝의 다리 문을 가리켜요. 그 너머가 여왕의 규방과 엘데의 왕좌예요' }));

      // ══ 2층 북쪽 다리 문과 다리, 왕좌로 돌아가는 이정표 ══
      const DX = 100;
      for (let y = GY + 1; y <= GY + 9; y++) for (let x = DX - 2; x <= DX + 2; x++) if (LB.inArch(x - DX, y - GY - 1, 2.5, 8, 'round')) for (let z = HZ0 - 2; z <= UZ - 1; z++) w.set(x, y, z, 0);
      for (let z = HZ0 - 1; z <= UZ - 1; z++) for (let x = DX - 2; x <= DX + 2; x++) w.set(x, GY, z, B.terraDk);
      for (let z = 4; z <= HZ0 - 3; z++) { for (let x = DX - 3; x <= DX + 3; x++) w.set(x, GY, z, Math.abs(x - DX) === 3 ? B.limeDk : B.floorG); for (const x of [DX - 3, DX + 3]) { w.set(x, GY + 1, z, B.limeLt); w.set(x, GY + 2, z, B.trim); } }
      for (let z = 6; z <= HZ0 - 4; z += 12) w.box(DX - 2, LOW, z, DX + 2, GY - 1, z + 2, B.wallSd);
      {
        const sx = DX - 4, sz = GZf - 2;
        const y = GY + 1, h = 6;
        w.set(sx, y - 1, sz, B.stoneG); w.box(sx, y, sz, sx, y + h, sz, B.timber);
        for (let s = 1; s <= 4; s++) w.set(sx, y + h - 1, sz - s, s === 4 ? B.gold : B.door);
        w.set(sx, y + h + 1, sz, B.mlamp);
        acts.push(OR.goAct({ at: [sx, y, sz], name: '엘데의 왕좌로', goto: 'leyndell', hint: '2층 회랑 북쪽 다리를 건너 여왕의 규방을 지나면, 큰 계단 위 엘데의 왕좌예요' }));
      }
      landmarks.push({ name: '규방으로 가는 다리', note: '여왕의 규방 · 엘데의 왕좌', p: [DX + 0.5, GY + 20, HZ0 - 14] });

      // ══ 서쪽 정문(부품 문짝) ══
      const PZ = MZ;
      LB.arch(w, { axis: 'z', c: HX0 - 2, u0: PZ, y0: FL + 1, a: 4, h: 15, kind: 'round', fill: 0, frame: B.wallGL, depth: 2 });
      const dL = w.prop({ name: 'doorL', pivot: [HX0 - 2.5, FL + 1, PZ - 3.5] }), dR = w.prop({ name: 'doorR', pivot: [HX0 - 2.5, FL + 1, PZ + 4.5] });
      for (let z = PZ - 3; z <= PZ + 3; z++) for (let y = FL + 1; y <= FL + 11; y++) if (LB.inArch(z - PZ, y - FL - 1, 3.5, 11, 'round')) (z <= PZ ? dL : dR).set(HX0 - 3, y, z, y === FL + 6 || Math.abs(z - PZ) === 3 ? B.goldS : B.door);
      for (const s of [-1, 1]) { w.set(HX0, FL + 7, PZ + s * 7, B.iron); w.set(HX0, FL + 8, PZ + s * 7, B.sconce); }
      lights.push({ name: 'portal', p: [HX0 + 1.5, FL + 7, PZ + 0.5], c: '#ffe0a0', i: 0.3, d: 16, flicker: 0.1, srcR: 8 });
      acts.push({
        name: '대성당 정문', hint: '석상 마당 쪽 커다란 정문이 열리며 본당 안 금빛이 마당으로 쏟아져요', hit: [HX0 - 4, FL + 1, PZ - 4, HX0 - 2, FL + 12, PZ + 4],
        run: async a => { a.flash('portal', 6, 3.6); await Promise.all([a.turn('doorL', [0, 1.4, 0], 1.4), a.turn('doorR', [0, -1.4, 0], 1.4)]); a.burst([HX0 - 4, FL + 5, PZ + 0.5], { n: 40, colors: ['#ffe9a0', '#fff6d0', '#ffd25a'], speed: 3, up: 1, life: 1.6, gravity: -0.3, spread: 3 }); await a.wait(1.6); await Promise.all([a.turn('doorL', [0, 0, 0], 1.2), a.turn('doorR', [0, 0, 0], 1.2)]); },
      });

      // ══ 서쪽 석상 마당: 금빛 나무, 화단, 금빛 문양 고리, 라다곤 석상 ══
      for (let x = 4; x < HX0 - 2; x++) for (const z of [50, 98]) { w.set(x, FL + 1, z, B.limeLt); w.set(x, FL + 2, z, B.trim); }
      for (let z = 50; z <= 98; z++) { w.set(4, FL + 1, z, B.limeLt); w.set(4, FL + 2, z, B.trim); }
      for (const [x0, z0] of [[8, 54], [8, 88], [22, 54], [22, 88]]) { w.box(x0, FL + 1, z0, x0 + 7, FL + 2, z0 + 5, B.limeDk); w.box(x0 + 1, FL + 2, z0 + 1, x0 + 6, FL + 2, z0 + 4, B.grass); MH.tree(w, x0 + 4, FL + 3, z0 + 3, { kind: 'oak', h: 8, bark: B.bark, leaves: [B.leafG, B.leafO, B.leafO], r: 3.4, spread: 3, branches: 4 }); }
      const SX = 10, SZ2 = MZ, GXc = 23;
      const glyph = w.prop({ name: 'glyph', pivot: [GXc + 0.5, FL + 1, SZ2 + 0.5], scl0: [0, 0, 0] });
      for (let dz = -8; dz <= 8; dz++) for (let dx = -8; dx <= 8; dx++) { const d = Math.hypot(dx, dz), a = Math.atan2(dz, dx); if (Math.abs(d - 7) < 0.5 || Math.abs(d - 4.5) < 0.45 || (d > 4.5 && d < 7 && Math.abs(Math.sin(a * 4)) * d < 0.6)) glyph.set(GXc + dx, FL + 1, SZ2 + dz, B.glyph); }
      // 석상: 받침 + 격자 + 수의를 두른 기둥(사람 모습 없이)
      w.box(SX - 3, FL + 1, SZ2 - 3, SX + 3, FL + 3, SZ2 + 3, B.statueD);
      for (let y = FL + 4; y <= FL + 20; y++) for (let z = SZ2 - 4; z <= SZ2 + 4; z++) if ((y + z) % 4 === 0 || (y - z + 40) % 4 === 0) w.set(SX - 3, y, z, B.statueD);
      const statue = w.prop({ name: 'statue', pivot: [SX + 0.5, FL + 4, SZ2 + 0.5] });
      for (let y = FL + 4; y <= FL + 19; y++) { const r = y < FL + 14 ? 1.6 - (y - FL - 4) * 0.04 : 1.1; for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) if (Math.hypot(dx, dz) <= r) statue.set(SX + dx, y, SZ2 + dz, (y + dz) % 5 === 0 ? B.statueD : B.statue); }
      for (const s of [-1, 1]) for (let q = 1; q <= 4; q++) statue.set(SX, FL + 16, SZ2 + s * (1 + q), B.statue);
      statue.set(SX, FL + 20, SZ2, B.statue); statue.set(SX, FL + 21, SZ2, B.statueD);
      lights.push({ name: 'glyph', p: [GXc + 0.5, FL + 3, SZ2 + 0.5], c: '#ffd860', i: 0.2, d: 20, flicker: 0.1, srcR: 9 });
      acts.push({
        name: '회귀의 석상', hint: '마당의 라다곤 석상 앞에서 회귀의 기도를 올리면 금빛 문양이 피어나고, 석상이 돌아서며 숨은 진실을 드러내요', hit: [SX - 3, FL + 1, SZ2 - 4, SX + 3, FL + 21, SZ2 + 4],
        run: async a => {
          a.flash('glyph', 8, 5); a.glow(1.5, 5);
          await a.tween('glyph', { scl: [1, 1, 1] }, 0.6);
          a.burst([GXc + 0.5, FL + 2, SZ2 + 0.5], { n: 60, colors: ['#ffd860', '#ffe9a0', '#ffffff'], speed: 3, up: 4, life: 1.6, gravity: -0.3, spread: 6, flat: true });
          await a.turn('statue', [0, Math.PI, 0], 1.6);
          await fly(a, [GXc + 0.5, FL + 2, SZ2 + 0.5], [SX + 0.5, FL + 18, SZ2 + 0.5], 4, 12, ['#ffe9a0', '#ffd25a']);
          a.burst([SX + 0.5, FL + 18, SZ2 + 0.5], { n: 50, colors: ['#fff0b8', '#ffd25a'], speed: 2, up: 3, life: 1.8, gravity: -0.4, spread: 2 });
          await a.wait(1.2);
          await a.turn('statue', [0, 0, 0], 1.2); a.unwind && a.unwind('statue');
          await a.tween('glyph', { scl: [0, 0, 0] }, 0.6);
        },
      });
      landmarks.push({ name: '라다곤 석상', note: '회귀의 기도로 진실을 드러낸다', p: [SX + 0.5, FL + 30, SZ2 + 0.5] });

      // ══ 바깥: 남쪽 발코니 아래 도시 지붕과 첨탑 ══
      const hm = { found: B.wallSd, wall: B.lime, frame: B.limeDk, win: B.win, sill: B.trim, door: B.door, roof: B.slate, eave: B.slateDk, ridge: B.goldS, chimney: B.limeDk, quoin: B.limeLt };
      const placed = [];
      for (let i = 0; i < 140 && placed.length < 18; i++) {
        const x = w.ri(2, W - 14), z = w.ri(2, D - 12), sx = w.ri(8, 11), sz = w.ri(7, 9);
        const ok = [[x - 2, z - 2], [x + sx + 2, z - 2], [x - 2, z + sz + 2], [x + sx + 2, z + sz + 2], [x + (sx >> 1), z + (sz >> 1)]].every(([px, pz]) => !isF(px, pz) && !(Math.abs(px - DX) < 8 && pz < HZ0) && !(px > 128 && pz < 60));
        if (!ok || placed.some(([a0, b0, a1, b1]) => x < a1 + 2 && x + sx > a0 - 2 && z < b1 + 2 && z + sz > b0 - 2)) continue;
        const h = MH.houseX(w, { x, z, sx, sz, floors: 2, fh: 6, face: 's', pitch: 2, y: LOW, m: hm });
        if (i % 4 === 0) LB.dome(w, x + (sx >> 1), h.peak - 1, z + (sz >> 1), 3, B.domeG, { ribs: 8, rib: B.goldS, lantern: B.limeLt, tip: B.goldS });
        placed.push([x, z, x + sx, z + sz]);
      }
      for (let i = 0; i < 40; i++) {
        const x = w.ri(3, W - 4), z = w.ri(3, D - 4), g = MH.g(w, x, z);
        if (g > LOW + 3 || w.get(x, g + 1, z) || isF(x, z) || Math.hypot(x - DX, z - 20) < 8) continue;
        MH.tree(w, x, g + 1, z, { kind: 'oak', h: w.ri(7, 10), bark: B.bark, leaves: [B.leafG, B.leafO, B.leafO], r: w.r(2.8, 3.8), spread: 3, branches: 4 });
      }
      return { lights, landmarks, acts };
    },
  });
})();
