// 바벨 — 던전을 뚜껑처럼 덮은 50층 흰 탑, 둥근 중앙 광장과 여덟 갈래 큰길 (오라리오)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 192, D = 192, Hh = 184;
  const BX = 96, BZ = 96;                                   // 바벨 중심
  MAPS.push({
    id: 'babel', cat: 'orario', name: '바벨', en: 'Babel · Central Park', color: '#e8e2d0', seed: 1101, base: 30, time: 'day', size: [W, D, Hh],
    desc: '미궁도시 오라리오 한가운데, 던전을 뚜껑처럼 덮은 50층 하얀 탑. 둥근 중앙 광장에서 여덟 갈래 큰길이 뻗고, 탑 아래 큰 구멍은 던전 1층으로 이어진다.',
    info: { title: '장소 정보', en: 'ORARIO', rows: [['층수', '지상 50층 · 아래는 던전'], ['1~20층', '길드 시설 · 환전소 · 헤파이스토스 상점'], ['꼭대기', '이름난 신들의 개인 방']] },
    sky: ['#cfe4f4', '#5a8ac0', '#fff6e0'], stars: false,
    hemi: ['#fff8ec', '#5a5448', 0.62], sun: ['#fff4e0', 0.78, [0.45, 1, 0.6]],
    night: { sky: ['#2a3050', '#080a18', '#e8b070'], stars: true, hemi: ['#b8c0d8', '#1a1814', 0.46], sun: ['#d8e0ff', 0.36, [0.45, 1, 0.6]], haze: '#2a2a3a' },
    liquid: ['#5a8aa8', '#8ac0d8', '#e8f8ff'], liqSpeed: 0.5,
    fog: { start: 0.8, floor: 10, depth: 10, haze: [36, 0.18, 8], hazeColor: '#e8e4d8' },
    camY: 34, zoom: 1.05,
    particles: [
      { n: 160, colors: ['#ffffff', '#f4f0e8'], mode: 'drift', speed: 0.5, wind: 0.6, y0: 40, y1: 120, glow: false },
      { n: 90, colors: ['#ffe9a0', '#fff6d0'], mode: 'rise', speed: 0.3, area: [BX, BZ, 10], y0: 150, y1: 182, glow: true },
    ],
    blocks: Object.assign(OR.blocks(), {
      tw: { c: '#e6e0d2', v: 0.04, pat: 'big' }, tw2: { c: '#d6cfbf', v: 0.04, pat: 'big' }, twC: { c: '#bdb4a0', v: 0.05, pat: 'stone' }, twT: { c: '#f6f1e6', v: 0.02 },
      medal: { c: '#ffd870', glow: true }, silver: { c: '#f0e0ff', glow: true },
      skyP: { c: '#6aa8e8', v: 0.04 }, cloudP: { c: '#f4f8ff', v: 0.02 }, hallF: { c: '#8a8478', top: '#a49c8e', v: 0.04, pat: 'check', alt: '#9a9284' },
      dwall: { c: '#4a7a88', v: 0.06, pat: 'stone' }, dwallG: { c: '#7ad8e8', glow: true }, dfloor: { c: '#3a4a50', top: '#465a60', v: 0.06 }, mstone: { c: '#c070ff', glow: true },
      gStone: { c: '#d8c08a', v: 0.04, pat: 'brick' }, gTrim: { c: '#f0e8d0', v: 0.02 }, copper: { c: '#5a9a7a', v: 0.04, pat: 'tile' },
      glassR: { c: '#e8504a', glow: true }, glassB: { c: '#4a7ae8', glow: true }, glassY: { c: '#f0c84a', glow: true },
      oil: { c: '#ffc860', glow: true }, potato: { c: '#d8b060', v: 0.06 }, wood: { c: '#7a5a3a', v: 0.05, pat: 'plank' },
      dove: { c: '#f6f6f2', v: 0.02 }, doveG: { c: '#c8c8c4', v: 0.02 }, grace: { c: '#ffe9a0', glow: true },
    }),
    build(w) {
      const B = w.id, n = w.noise, G = w.base, TAU = Math.PI * 2;
      const PR = 50, SW = 5;                                  // 광장 반지름, 큰길 반폭
      const camA = Math.atan2(0.73, 0.68);
      const streetD = (x, z) => { let best = 1e9; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, ca = Math.cos(a), sa = Math.sin(a), dx = x - BX, dz = z - BZ, al = dx * ca + dz * sa; if (al < 0) continue; best = Math.min(best, Math.abs(-dx * sa + dz * ca)); } return best; };
      MH.terrain(w, {
        floor: G - 28,
        height: () => G,
        surface: () => B.pave,
        under: (x, z, y, dep) => dep < 2 ? B.soil : (y % 5 === 0 ? B.dwall : B.rock),
      });
      const lights = [], acts = [], landmarks = [];

      // ── 중앙 광장: 동심원 돌바닥, 큰길로 이어지는 방사선 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const dx = x - BX, dz = z - BZ, r = Math.hypot(dx, dz), th = Math.atan2(dz, dx), sd = streetD(x, z);
        let b;
        if (r <= PR) {
          b = (Math.floor(r / 6) & 1) ? B.paveL : B.pave;
          if (Math.abs(r - PR + 1) < 0.7 || Math.abs(r - 34) < 0.5 || Math.abs(r - 24) < 0.5) b = B.trimW;
          if (r > 24 && Math.abs(Math.sin(th * 4)) < 0.03 * (36 / r)) b = B.stoneG;
        } else if (sd <= SW) b = sd > SW - 1 ? B.curb : ((x + z) % 7 === 0 ? B.paveL : B.brick);
        else b = (hash3(x, 1, z) > 0.85) ? B.stoneG : B.pave;
        w.set(x, G, z, b);
      }
      // 광장 남쪽 작은 공원 둘(잔디, 생울타리, 분수, 나무)
      const fountains = [];
      for (const a of [Math.PI / 2 - 0.36, Math.PI / 2 + 0.36]) {
        const px = Math.round(BX + Math.cos(a) * 41), pz = Math.round(BZ + Math.sin(a) * 41);
        for (let dz = -10; dz <= 10; dz++) for (let dx = -10; dx <= 10; dx++) { const d = Math.hypot(dx, dz); if (d <= 9.5 && streetD(px + dx, pz + dz) > SW + 1) { w.set(px + dx, G, pz + dz, d > 8.5 ? B.hedge : B.grass); if (d > 8.5) w.set(px + dx, G + 1, pz + dz, B.hedge); } }
        fountains.push(OR.fountain(w, px, pz, 3.6, B.twT, B.stoneG, { h: 3, bowl: 1.4 }));
        for (const [ox, oz] of [[-5, -4], [5, -4], [0, 6]]) OR.tree(w, B, px + ox, pz + oz, { h: 6, r: 2.6 });
      }
      // 광장 둘레 마석등과 긴 의자
      const lampHeads = [];
      for (let k = 0; k < 32; k++) {
        const a = k / 32 * TAU + 0.1, x = Math.round(BX + Math.cos(a) * (PR - 2)), z = Math.round(BZ + Math.sin(a) * (PR - 2));
        if (streetD(x, z) < SW + 2) continue;
        if (k % 2) lampHeads.push(OR.lamp(w, B, x, z, 5));
        else { const tx = Math.round(-Math.sin(a)), tz = Math.round(Math.cos(a)); for (let s = -1; s <= 1; s++) w.set(x + tx * s, G + 1, z + tz * s, B.wood); }
      }
      // 큰길 가로등
      for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; for (let r = PR + 10; r < 100; r += 14) for (const s of [-1, 1]) { const x = Math.round(BX + Math.cos(a) * r - Math.sin(a) * s * (SW + 1.5)), z = Math.round(BZ + Math.sin(a) * r + Math.cos(a) * s * (SW + 1.5)); if (x > 2 && z > 2 && x < W - 3 && z < D - 3) OR.lamp(w, B, x, z, 5); } }
      lights.push({ name: 'lamps', p: [BX + 0.5, G + 7, BZ + PR - 2.5], c: '#ffe0a0', i: 0.5, d: 34, flicker: 0.1, srcR: 40 });
      lights.push({ name: 'lamps', p: [BX + 0.5, G + 7, BZ - PR + 2.5], c: '#ffe0a0', i: 0.5, d: 34, flicker: 0.1, srcR: 40 });
      acts.push({
        name: '광장의 마석등', hint: '중앙 광장을 두른 마석등이 차례로 환하게 켜져요', hit: [Math.floor(lampHeads[3][0]) - 1, G + 1, Math.floor(lampHeads[3][2]) - 1, Math.floor(lampHeads[3][0]) + 1, G + 8, Math.floor(lampHeads[3][2]) + 1],
        run: async a => { a.flash('lamps', 3, 5); for (const p of lampHeads) { a.burst(p, { n: 12, colors: ['#fff0c0', '#ffe08a', '#ffffff'], speed: 1, up: 1.5, life: 1, gravity: -0.3, spread: 0.6 }); await a.wait(0.12); } },
      });
      acts.push({
        name: '공원 분수', hint: '광장 남쪽 공원의 분수가 물을 높이 뿜어요', hit: [Math.floor(fountains[0][0]) - 3, G, Math.floor(fountains[0][2]) - 3, Math.floor(fountains[0][0]) + 3, G + 6, Math.floor(fountains[0][2]) + 3],
        run: async a => { for (let k = 0; k < 10; k++) { for (const p of fountains) a.burst(p, { n: 20, colors: ['#e8f8ff', '#8ac0d8', '#ffffff'], speed: 1.6, up: 7, life: 1.4, gravity: 9, spread: 0.6 }); await a.wait(0.3); } },
      });

      // ── 바벨: 꽃잎 같은 여덟 받침, 동그란 홀(던전 입구), 위로 가늘어지는 흰 탑 ──
      const coreR = 12, lobeOff = 12, TOP = G + 124;
      const R = y => y < G + 26 ? coreR : Math.max(5.2, coreR - (y - G - 26) * 0.069);
      const lobeR = y => y <= G + 18 ? 7.4 : 7.4 * Math.sqrt(Math.max(0, 1 - ((y - G - 18) / 8) ** 2));
      const lobes = [...Array(8)].map((_, k) => [BX + Math.cos(k * Math.PI / 4) * lobeOff, BZ + Math.sin(k * Math.PI / 4) * lobeOff, k * Math.PI / 4]);
      const HALL = 9, CEIL = G + 12;                         // 홀 반지름과 천장 높이
      for (let y = G + 1; y < TOP; y++) {
        const Ry = R(y), Ly = lobeR(y), band = y > G + 26 && ((y - G) % 16 === 0 || (y - G) % 32 === 1), RR = Math.ceil(Math.max(Ry, lobeOff + Ly)) + 2;
        for (let dz = -RR; dz <= RR; dz++) for (let dx = -RR; dx <= RR; dx++) {
          const x = BX + dx, z = BZ + dz, d = Math.hypot(dx, dz), th = Math.atan2(dz, dx);
          const fl = Math.abs(Math.sin(th * 10)) < 0.26;                // 세로 홈
          const rr = Ry + (band ? 0.6 : 0) - (fl && !band ? 0.9 : 0);
          let inLobe = false;
          if (y <= G + 26) for (const [lx, lz] of lobes) if (Math.hypot(x - lx, z - lz) <= Ly) { inLobe = true; break; }
          if (d > rr && !inLobe) continue;
          // 홀 안(던전 입구): 비운다
          if (y < CEIL && d <= HALL) continue;
          let b = band ? B.twT : (fl ? B.tw2 : B.tw);
          if (y <= G + 26 && inLobe && d > coreR - 0.5) b = (y - G) % 9 === 0 ? B.twT : B.tw;
          if (y === CEIL && d <= HALL + 0.5) b = hash3(x >> 1, 7, z >> 1) > 0.72 ? B.cloudP : B.skyP;      // 하늘을 그린 천장
          if (y < CEIL && d <= HALL + 1.4) b = hash3(x, y >> 1, z) > 0.8 ? B.cloudP : B.skyP;              // 홀 안쪽 벽도 하늘빛
          // 위쪽 칸마다 돋을새김
          if (!band && y > G + 28 && d > rr - 1.2 && Math.floor((y - G) / 16) % 2 === 0 && hash3(Math.round(th * 16), y >> 1, 3) > 0.6) b = B.twC;
          // 탑의 문장(시점 쪽)
          if (y > G + 31 && y < G + 47 && d > rr - 1.6) {
            let dth = th - camA; dth = Math.atan2(Math.sin(dth), Math.cos(dth));
            const u = dth * Ry, v = y - (G + 39), md = Math.hypot(u, v);
            if (Math.abs(dth) < 0.9 && md < 5.6) b = md < 1.6 ? B.medal : (md < 3.4 ? B.gold : (md < 4.6 ? B.twT : B.twC));
          }
          // 위층 창(밤에 불이 켜진다)
          if (y > G + 54 && d > rr - 1.2 && (y - G) % 6 < 2 && !band) { const k = Math.round(th / (TAU / 10) - 0.5); if (Math.abs(th - (k + 0.5) * TAU / 10) * rr < 0.7) b = B.win; }
          w.set(x, y, z, b);
        }
      }
      // 받침마다 둥근 아치 출입구(큰길 쪽)
      for (const [lx, lz, a] of lobes) {
        const ca = Math.cos(a), sa = Math.sin(a);
        for (let r = HALL - 1; r <= lobeOff + 8.4; r += 0.5) for (let s = -3; s <= 3; s += 0.5) for (let y = G + 1; y <= G + 9; y++) {
          if (!LB.inArch(s, y - G - 1, 2.2, 8, 'round')) continue;
          w.set(Math.round(BX + ca * r - sa * s), y, Math.round(BZ + sa * r + ca * s), 0);
        }
        for (let s = -3; s <= 3; s++) { const x = Math.round(BX + ca * (lobeOff + 7.2) - sa * s), z = Math.round(BZ + sa * (lobeOff + 7.2) + ca * s); w.set(x, G + 10, z, B.twT); }
      }
      // 홀 바닥: 동심원 무늬, 열두 기둥, 가운데 구멍과 낮은 테
      for (let dz = -HALL; dz <= HALL; dz++) for (let dx = -HALL; dx <= HALL; dx++) { const d = Math.hypot(dx, dz); if (d <= HALL) w.set(BX + dx, G, BZ + dz, Math.abs(d - 7) < 0.6 ? B.twT : B.hallF); }
      for (let k = 0; k < 10; k++) { const a = k / 10 * TAU + 0.3, x = Math.round(BX + Math.cos(a) * 8), z = Math.round(BZ + Math.sin(a) * 8); w.box(x, G + 1, z, x, CEIL - 1, z, B.twT); w.set(x, G + 1, z, B.tw2); w.set(x, CEIL - 1, z, B.tw2); }
      const HOLE = 4.2;
      for (let dz = -8; dz <= 8; dz++) for (let dx = -8; dx <= 8; dx++) { const d = Math.hypot(dx, dz); if (d > HOLE && d <= 5.4) w.set(BX + dx, G + 1, BZ + dz, B.twT); }
      // 던전으로 내려가는 구멍: 벽을 따라 도는 계단, 맨 아래 던전 1층(푸르게 빛나는 벽, 마석)
      const SH = 6.4, BOT = G - 24;
      for (let y = BOT; y <= G; y++) for (let dz = -9; dz <= 9; dz++) for (let dx = -9; dx <= 9; dx++) { const d = Math.hypot(dx, dz); if (d <= (y === G ? HOLE : SH)) w.set(BX + dx, y, BZ + dz, 0); else if (d <= SH + 1.2 && y < G) w.set(BX + dx, y, BZ + dz, hash3(dx, y, dz) > 0.86 ? B.dwallG : B.dwall); }
      // 계단 들머리: 홀 바닥을 조금 터 둔다
      for (let q = 0; q < 24; q++) { const a = camA + Math.PI - 0.5 + q * 0.04; for (const r of [4.6, 5.3, 6]) w.set(Math.round(BX + Math.cos(a) * r), G, Math.round(BZ + Math.sin(a) * r), 0); }
      for (let s = 0; s < 24; s++) {
        const a0 = s * 0.2 + camA + Math.PI, y = G - 1 - s;
        for (let q = 0; q < 6; q++) { const a = a0 + q * 0.035; for (const r of [4.6, 5.3, 6]) w.set(Math.round(BX + Math.cos(a) * r), y, Math.round(BZ + Math.sin(a) * r), B.hallF); }
      }
      for (let y = BOT; y <= BOT + 7; y++) for (let dz = -18; dz <= 18; dz++) for (let dx = -18; dx <= 18; dx++) { const d = Math.hypot(dx, dz) + n.fbm((BX + dx) * 0.2, (BZ + dz) * 0.2, 2) * 3; if (d <= 16) w.set(BX + dx, y, BZ + dz, y === BOT ? B.dfloor : 0); else if (d <= 17.5) w.set(BX + dx, y, BZ + dz, hash3(dx, y, dz) > 0.8 ? B.dwallG : B.dwall); }
      for (let k = 0; k < 7; k++) { const a = k * 0.9 + 0.4, x0 = Math.round(BX + Math.cos(a) * 9), z0 = Math.round(BZ + Math.sin(a) * 9); w.box(x0, BOT + 1, z0, x0 + Math.round(Math.cos(a + 1.6) * 4), BOT + 5, z0 + Math.round(Math.sin(a + 1.6) * 4), B.dwall); }
      for (let k = 0; k < 14; k++) { const a = k * 0.45, r = 11 + (k % 3) * 1.5; w.set(Math.round(BX + Math.cos(a) * r), BOT + 1, Math.round(BZ + Math.sin(a) * r), B.mstone); }
      lights.push({ name: 'dungeon', p: [BX + 0.5, G + 6, BZ + 0.5], c: '#8ad8ff', i: 0.08, d: 34, flicker: 0.2, srcR: 30 });
      lights.push({ name: 'dungeon', p: [BX + 0.5, BOT + 4, BZ + 0.5], c: '#7ad8e8', i: 0.9, d: 26, flicker: 0.15, srcR: 12 });
      // 단면(부품): 시점 쪽 받침 조각을 떼어 낼 수 있게 옮겨 담는다
      const cut = w.prop({ name: 'cutaway', pivot: [BX + 0.5, G + 1, BZ + 0.5], clipOK: 99999 });
      for (let y = G + 1; y <= G + 26; y++) for (let dz = -22; dz <= 22; dz++) for (let dx = -22; dx <= 22; dx++) {
        const th = Math.atan2(dz, dx); let dth = th - camA; dth = Math.atan2(Math.sin(dth), Math.cos(dth));
        if (Math.abs(dth) > 0.85 || Math.hypot(dx, dz) < HALL - 0.5) continue;
        const b = w.get(BX + dx, y, BZ + dz); if (!b) continue;
        cut.set(BX + dx, y, BZ + dz, b); w.set(BX + dx, y, BZ + dz, 0);
      }
      acts.push({
        name: '던전 입구', hint: '바벨 받침 한쪽 벽이 광장 아래로 내려가며 하늘빛 홀과 던전 1층으로 내려가는 큰 구멍이 드러나요', hit: [Math.round(BX + Math.cos(camA) * 18) - 3, G + 1, Math.round(BZ + Math.sin(camA) * 18) - 3, Math.round(BX + Math.cos(camA) * 18) + 3, G + 9, Math.round(BZ + Math.sin(camA) * 18) + 3],
        run: async a => {
          await a.move('cutaway', [0, -27, 0], 2.4);
          a.flash('dungeon', 12, 5); a.glow(1.6, 5);
          for (let k = 0; k < 10; k++) { a.burst([BX + 0.5, G - 2, BZ + 0.5], { n: 26, colors: ['#8ad8ff', '#ffffff', '#c070ff'], speed: 1.2, up: 6, life: 1.6, gravity: -0.4, spread: 2.4 }); await a.wait(0.35); }
          await a.wait(0.8);
          await a.move('cutaway', [0, 0, 0], 2.2);
        },
      });
      landmarks.push({ name: '던전 입구', note: '바벨 아래 던전 1층으로', p: [BX + Math.cos(camA) * 17, G + 13, BZ + Math.sin(camA) * 17] });
      // 탑의 문장
      const MX = BX + Math.cos(camA) * (R(G + 39) + 0.5), MZ = BZ + Math.sin(camA) * (R(G + 39) + 0.5);
      lights.push({ name: 'medal', p: [MX + Math.cos(camA) * 1.5, G + 39, MZ + Math.sin(camA) * 1.5], c: '#ffd870', i: 0.3, d: 20, flicker: 0.1, srcR: 4 });
      acts.push({
        name: '탑의 문장', hint: '바벨 몸통의 둥근 문장이 금빛으로 빛나며 빛의 고리가 퍼져요', hit: [Math.round(MX) - 3, G + 35, Math.round(MZ) - 3, Math.round(MX) + 3, G + 43, Math.round(MZ) + 3],
        run: async a => {
          a.flash('medal', 8, 4); a.glow(1.5, 4);
          for (let r = 2; r <= 14; r += 2) { for (let q = 0; q < 16; q++) { const t = q / 16 * TAU; a.burst([MX + Math.cos(camA) * 2 - Math.sin(camA) * Math.cos(t) * r, G + 39 + Math.sin(t) * r, MZ + Math.sin(camA) * 2 + Math.cos(camA) * Math.cos(t) * r], { n: 3, colors: ['#ffd870', '#fff6d0'], speed: 0.3, up: 0.2, life: 0.8, gravity: 0, spread: 0.3 }); } await a.wait(0.16); }
        },
      });
      // 꼭대기: 신들의 개인 방(가장 위는 여신의 방), 둥근 갓과 바늘 첨탑
      const CY = TOP, CR = R(TOP) + 1.6;
      for (let y = CY; y <= CY + 7; y++) for (let dz = -9; dz <= 9; dz++) for (let dx = -9; dx <= 9; dx++) {
        const d = Math.hypot(dx, dz), th = Math.atan2(dz, dx); if (d > CR) continue;
        let b = (y === CY || y === CY + 7) ? B.twT : B.tw;
        if (y > CY + 1 && y < CY + 6 && d > CR - 1.2) { const k = Math.round(th / (TAU / 10)); const off = Math.abs(th - k * TAU / 10) * CR; if (off < 0.9) b = k % 3 ? B.win : B.silver; else if (off < 1.6) b = B.twT; }
        w.set(BX + dx, y, BZ + dz, b);
      }
      for (let y = CY + 8; y <= CY + 24; y++) w.cyl(BX, BZ, y, y, Math.max(0.5, (CR - 1) * (1 - (y - CY - 8) / 17)), (y - CY) % 6 === 0 ? B.twT : B.tw);
      w.box(BX, CY + 25, BZ, BX, CY + 26, BZ, B.gold);
      lights.push({ name: 'crown', p: [BX + Math.cos(camA) * (CR + 1), CY + 4, BZ + Math.sin(camA) * (CR + 1)], c: '#f0d8ff', i: 0.5, d: 30, flicker: 0.1, srcR: 6 });
      acts.push({
        name: '여신의 방', hint: '바벨 꼭대기 방에 은빛이 번지고 장미 꽃잎이 흩날려 내려요', hit: [BX - 7, CY, BZ - 7, BX + 7, CY + 7, BZ + 7],
        run: async a => { a.flash('crown', 6, 5); a.glow(1.4, 5); for (let k = 0; k < 12; k++) { const t = k * 0.55; a.burst([BX + Math.cos(t) * (CR + 1), CY + 4, BZ + Math.sin(t) * (CR + 1)], { n: 18, colors: ['#e8304a', '#f07890', '#f0e0ff'], speed: 2.4, up: 0.5, life: 3.4, gravity: 1.2, spread: 2, flat: true }); await a.wait(0.3); } },
      });
      acts.push({
        name: '신들의 강림', hint: '하늘에서 내려온 금빛 기둥이 바벨 꼭대기에 닿아 탑을 따라 흘러내려요', hit: [BX - 2, CY + 10, BZ - 2, BX + 2, CY + 26, BZ + 2],
        run: async a => {
          a.lightning(0.3); a.glow(1.6, 5);
          for (let k = 0; k < 12; k++) { a.burst([BX + 0.5, Hh - 2 - k * 1.2, BZ + 0.5], { n: 24, colors: ['#ffe9a0', '#ffffff', '#ffd060'], speed: 0.6, up: -4, life: 1.6, gravity: 3, spread: 1.4 }); await a.wait(0.08); }
          a.flash('crown', 8, 3);
          for (let k = 0; k < 16; k++) { const y = CY - k * 7; a.burst([BX + Math.cos(camA) * (R(y) + 1), y, BZ + Math.sin(camA) * (R(y) + 1)], { n: 16, colors: ['#ffe9a0', '#fff6d0'], speed: 1, up: 0.5, life: 1.4, gravity: 0, spread: 2 }); await a.wait(0.12); }
        },
      });
      landmarks.push({ name: '바벨', note: '던전의 뚜껑 · 50층 탑', p: [BX + 0.5, G + 80, BZ + 0.5], boss: true });
      landmarks.push({ name: '신들의 개인 방', note: '꼭대기는 여신의 방', p: [BX + 0.5, CY + 32, BZ + 0.5] });
      // 탑을 도는 비둘기 떼(부품)
      const doves = w.prop({ name: 'doves', pivot: [BX + 0.5, G, BZ + 0.5], speed: 0.22, clipOK: 99999 });
      for (let k = 0; k < 14; k++) {
        const a = k / 14 * TAU + hash3(k, 1, 1) * 0.3, r = 20 + (k % 4) * 3, y = G + 50 + (k * 7) % 22, x = Math.round(BX + Math.cos(a) * r), z = Math.round(BZ + Math.sin(a) * r);
        const tx = Math.round(-Math.sin(a)), tz = Math.round(Math.cos(a));
        doves.set(x, y, z, B.dove); doves.set(x + tz, y + 1, z - tx, B.doveG); doves.set(x - tz, y + 1, z + tx, B.doveG); doves.set(x + tx, y, z + tz, B.dove);
      }
      acts.push({
        name: '비둘기 떼', hint: '바벨을 도는 비둘기 떼가 날갯짓을 빨리하며 깃털이 흩날려요', hit: [BX + 16, G + 50, BZ - 4, BX + 26, G + 72, BZ + 4],
        run: async a => { a.spin('doves', 4, 4); for (let k = 0; k < 8; k++) { const t = k * 0.8; a.burst([BX + Math.cos(t) * 22, G + 60, BZ + Math.sin(t) * 22], { n: 12, colors: ['#ffffff', '#e8e8e4'], speed: 2, up: 0.5, life: 2.4, gravity: 0.8, spread: 2 }); await a.wait(0.45); } },
      });

      // ── 길드 본부 판테온(서쪽 큰길 옆): 노란 돌, 흰 띠, 구리 지붕, 색유리 창 ──
      const GX0 = 22, GZ0 = 60, GX1 = 46, GZ1 = 80;
      w.box(GX0, G + 1, GZ0, GX1, G + 21, GZ1, B.gStone); w.box(GX0 + 1, G + 1, GZ0 + 1, GX1 - 1, G + 20, GZ1 - 1, 0);
      for (const y of [G + 7, G + 14, G + 21]) w.walls(GX0, y, GZ0, GX1, y, GZ1, B.gTrim);
      for (let x = GX0 + 3; x <= GX1 - 3; x += 4) for (const [y0, hh] of [[G + 2, 4], [G + 9, 4], [G + 16, 3]]) { LB.arch(w, { axis: 'x', c: GZ1, u0: x, y0, a: 1, h: hh, kind: 'pointed', fill: [B.glassR, B.glassB, B.glassY][(x + y0) % 3], frame: B.gTrim }); }
      for (let z = GZ0 + 3; z <= GZ1 - 3; z += 4) for (const [y0, hh] of [[G + 9, 4], [G + 16, 3]]) LB.arch(w, { axis: 'z', c: GX1, u0: z, y0, a: 1, h: hh, kind: 'pointed', fill: [B.glassY, B.glassR, B.glassB][(z + y0) % 3], frame: B.gTrim });
      LB.arch(w, { axis: 'x', c: GZ1, u0: (GX0 + GX1) >> 1, y0: G + 1, a: 2, h: 5, kind: 'round', fill: B.door, frame: B.gTrim });
      const gPeak = MH.hipRoof(w, GX0 - 1, GX1 + 1, GZ0 - 1, GZ1 + 1, G + 22, B.copper, 1, B.gTrim);
      LB.dome(w, (GX0 + GX1) >> 1, gPeak - 2, (GZ0 + GZ1) >> 1, 5, B.copper, { ribs: 8, rib: B.gold, lantern: B.gTrim, tip: B.gold });
      lights.push({ name: 'guild', p: [(GX0 + GX1) / 2, G + 10, GZ1 + 2], c: '#ffd890', i: 0.4, d: 24, flicker: 0.1, srcR: 4 });
      acts.push({
        name: '길드 본부 판테온', hint: '길드 본부의 색유리 창이 빛나며 의뢰서가 바람에 흩날려요', hit: [GX0 + 2, G + 1, GZ1 - 1, GX1 - 2, G + 20, GZ1 + 1],
        run: async a => { a.flash('guild', 6, 4); a.glow(1.6, 4); for (let k = 0; k < 8; k++) { a.burst([(GX0 + GX1) / 2 + 0.5, G + 4, GZ1 + 1.5], { n: 14, colors: ['#f4f0e8', '#e8e0c8', '#ffffff'], speed: 3, up: 3, life: 2.2, gravity: 1, spread: 2, flat: true }); await a.wait(0.3); } },
      });
      landmarks.push({ name: '길드 본부', note: '판테온', p: [(GX0 + GX1) / 2, G + 42, (GZ0 + GZ1) / 2] });

      // ── 광장 가장자리 감자튀김 노점 ──
      const SX = Math.round(BX + Math.cos(Math.PI * 0.75) * 44), SZ = Math.round(BZ + Math.sin(Math.PI * 0.75) * 44);
      w.box(SX - 3, G + 1, SZ - 2, SX + 3, G + 3, SZ + 2, B.wood);
      for (const [x, z] of [[SX - 3, SZ - 2], [SX + 3, SZ - 2], [SX - 3, SZ + 2], [SX + 3, SZ + 2]]) w.box(x, G + 4, z, x, G + 6, z, B.wood);
      for (let x = SX - 4; x <= SX + 4; x++) for (let z = SZ - 3; z <= SZ + 3; z++) w.set(x, G + 7, z, (x & 1) ? B.awnR : B.awnW);
      w.cyl(SX - 1, SZ, G + 4, G + 4, 1.2, B.iron); w.set(SX - 1, G + 4, SZ, B.oil); w.box(SX + 1, G + 4, SZ - 1, SX + 2, G + 4, SZ + 1, B.potato);
      lights.push({ name: 'stall', p: [SX - 0.5, G + 5, SZ + 0.5], c: '#ffc860', i: 0.3, d: 12, flicker: 0.3, srcR: 3 });
      acts.push({
        name: '감자튀김 노점', hint: '광장 노점의 기름솥에서 감자튀김이 지글지글 튀겨져요', hit: [SX - 3, G + 1, SZ - 2, SX + 3, G + 7, SZ + 2],
        run: async a => { a.flash('stall', 5, 3.4); for (let k = 0; k < 12; k++) { a.burst([SX - 0.5, G + 8.5, SZ + 0.5], { n: 12, colors: ['#ffffff', '#ffe8b0', '#ffc860'], speed: 0.8, up: 3, life: 1.4, gravity: -0.4, spread: 2.4 }); await a.wait(0.25); } },
      });

      // ── 이정표: 큰길마다 다른 장소로 이동 ──
      const go = [
        [Math.PI, 'mistress', '서쪽 큰길 · 풍요의 여주인', '서쪽 큰길을 따라 술집 「풍요의 여주인」으로 가요'],
        [-Math.PI / 2, 'loki', '북쪽 큰길 · 황혼의 저택', '북쪽 큰길 끝 로키 파밀리아의 홈 「황혼의 저택」으로 가요'],
        [Math.PI / 2, 'freya', '남쪽 · 전쟁의 들판', '도시 반대편 프레이야 파밀리아의 홈 「전쟁의 들판」으로 가요'],
        [Math.PI / 4, 'hestia', '화덕의 저택', '헤스티아 파밀리아의 홈 「화덕의 저택」으로 가요'],
      ];
      for (const [a, id, name, hint] of go) {
        const ca = Math.cos(a), sa = Math.sin(a), r = PR - 4, s = SW + 1.5;
        const x = Math.round(BX + ca * r - sa * s), z = Math.round(BZ + sa * r + ca * s);
        const sp = OR.signpost(w, B, x, z, { dir: [Math.round(ca), Math.round(sa)], boards: 1 });
        acts.push(OR.goAct({ at: sp, name, goto: id, hint }));
      }

      // ── 큰길 사이 시가지: 붉은·주황 지붕 집들이 길을 향해 늘어선다 ──
      // 집이 바라볼 쪽: 광장 가까이는 광장을, 그 밖은 가장 가까운 큰길을
      const faceTo = (x, z) => {
        const dx = x - BX, dz = z - BZ, r = Math.hypot(dx, dz);
        let fx = -dx, fz = -dz;
        if (r > PR + 14) {
          let best = 1e9;
          for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, ca = Math.cos(a), sa = Math.sin(a); if (dx * ca + dz * sa < 0) continue; const ac = -dx * sa + dz * ca; if (Math.abs(ac) < best) { best = Math.abs(ac); fx = Math.sign(ac) * sa; fz = -Math.sign(ac) * ca; } }
        }
        return Math.abs(fx) > Math.abs(fz) ? (fx > 0 ? 'e' : 'w') : (fz > 0 ? 's' : 'n');
      };
      const busy = (x, z) => (x > GX0 - 4 && x < GX1 + 4 && z > GZ0 - 4 && z < GZ1 + 4);
      OR.fill(w, B, { x0: 3, z0: 3, x1: W - 4, z1: D - 4, tries: 900, gap: 2, min: 7, max: 12, floors: [2, 4], ok: (x, z) => x > 1 && z > 1 && x < W - 2 && z < D - 2 && Math.hypot(x - BX, z - BZ) > PR + 4 && streetD(x, z) > SW + 3 && !busy(x, z), face: faceTo });
      return { lights, landmarks, acts };
    },
  });
})();
