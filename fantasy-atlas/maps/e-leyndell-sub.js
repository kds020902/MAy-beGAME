// 여왕의 규방(하위 지도) — 도읍 로데일, 엘데의 왕좌 바로 아래의 둥근 돔 방. 마리카 여왕의 침상과 축복.
// 돔 가운데 둥근 천창에 쇠고리 샹들리에가 매달리고, 거대한 천개 휘장이 침상 위로 드리운다. 벽을 따라 책과 석판이 산처럼 쌓였다.
// 북쪽 문 → 마당 → 큰 계단 → 안개문 → 엘데의 왕좌(도읍 로데일). 서쪽 테라스에는 황금 나무 대성당 쪽에서 온 거대한 가지 길이 닿는다.
// 좌표: +x 동쪽, +z 남쪽. 기본 시점(남동쪽)에서 보이도록 남동쪽 절반의 벽과 돔을 걷어 냈다(잘린 단면).
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 160, D = 160, Hh = 112;
  const QX = 80, QZ = 92, RI = 22, RO = 24, RT = 32;              // 규방 중심, 안쪽·바깥 반지름, 테라스 반지름
  MAPS.push({
    id: 'leyndell-sub', cat: 'lands', sub: true, parent: 'leyndell', name: '여왕의 규방', en: "Queen's Bedchamber", color: '#d8a848', seed: 551, base: 40, time: 'day', size: [W, D, Hh],
    desc: '엘데의 왕좌로 오르는 큰 계단 바로 아래, 마리카 여왕의 둥근 돔 방. 천창에 매달린 쇠고리 아래로 거대한 천개 휘장이 드리우고, 하얀 천을 덮은 침상 앞 둥근 무늬 바닥에 축복이 빛난다. 벽을 따라 책과 석판이 산처럼 쌓여, 여왕이 끝내 마치지 못한 무언가를 찾던 흔적이 남았다. 북쪽 문을 나서 큰 계단을 오르면 축복왕이 지키는 엘데의 왕좌다.',
    info: { title: '장소 정보', en: "QUEEN'S BEDCHAMBER", rows: [['오는 길', '황금 나무 대성당 → 거대한 가지 → 서쪽 테라스'], ['방', '둥근 돔 · 천창의 쇠고리 · 천개 휘장 · 침상'], ['축복', '침상 앞 둥근 무늬 바닥 · 왕좌 앞 마지막 축복'], ['왕좌로', '북쪽 문 → 마당 → 큰 계단 → 안개문']] },
    monsters: { normal: ['로데일 기사', '신탁의 사자'], mid: '검은 칼날의 자객', boss: '축복왕 모르고트(계단 위)' },
    sky: ['#ecd8b0', '#8a98b4', '#fff0c8'], stars: false,
    hemi: ['#fff2dc', '#4a4236', 0.6], sun: ['#fff0d0', 0.76, [0.4, 1, 0.65]],
    night: { sky: ['#3a3040', '#0b0d1a', '#e8c070'], stars: true, hemi: ['#c8b4a0', '#201a14', 0.5], sun: ['#ffe0a0', 0.42, [0.4, 1, 0.65]], haze: '#3a3028' },
    liquid: ['#5a8aa0', '#8ac0d0', '#e8ffff'], liqSpeed: 0.6,
    fog: { start: 0.84, floor: 8, depth: 10, haze: [30, 0.22, 12], hazeColor: '#e8d8b8' },
    camY: -6, zoom: 2.1,
    particles: [
      { n: 600, colors: ['#ffd25a', '#f0b040', '#ffe9a0', '#e89a30'], mode: 'fall', speed: 0.4, wind: 0.4, y0: 40, y1: 100, glow: true },
      { n: 160, colors: ['#fff0b0', '#ffd870'], mode: 'rise', speed: 0.3, area: [QX, QZ, 6], y0: 50, y1: 86, glow: true },
    ],
    blocks: {
      grass: { c: '#5e5434', top: '#8e8a4a', v: 0.1 }, soil: { c: '#5a4a34', v: 0.08 }, rock: { c: '#8a8070', v: 0.06, pat: 'big' }, rockDk: { c: '#6c6458', v: 0.06, pat: 'stone' },
      floorG: { c: '#8a867c', top: '#a6a195', v: 0.05, pat: 'stone' }, floorG2: { c: '#86827a', top: '#9b968a', v: 0.05, pat: 'stone' },
      // 방 바닥과 둥근 무늬
      floorR: { c: '#6e6a60', top: '#8a8578', v: 0.05, pat: 'stone' }, medL: { c: '#b4ac98', top: '#c2b9a4', v: 0.03 }, medD: { c: '#6a6458', top: '#77705f', v: 0.03 }, medB: { c: '#948a74', top: '#a0957e', v: 0.03 },
      // 벽·돔
      wallG: { c: '#9e988a', v: 0.05, pat: 'big' }, wallGD: { c: '#7e796e', v: 0.05, pat: 'big' }, wallGL: { c: '#bab4a6', v: 0.03 }, niche: { c: '#2c2824', v: 0.02 },
      domeS: { c: '#a8a294', v: 0.04 }, domeR: { c: '#c8c2b2', v: 0.03 }, iron: { c: '#34322e', v: 0.03 },
      // 침상과 천
      sheet: { c: '#d6d0c0', top: '#e4dfd0', v: 0.04 }, sheet2: { c: '#bdb6a4', v: 0.04 }, bedS: { c: '#7a7262', v: 0.04, pat: 'stone' },
      drape: { c: '#6e5c3e', v: 0.05 }, drape2: { c: '#85704a', v: 0.05 }, drapeG: { c: '#9a8452', v: 0.04 },
      // 책·석판 더미, 종이
      book: { c: '#8a7458', v: 0.06 }, book2: { c: '#6a5644', v: 0.06 }, book3: { c: '#a89878', v: 0.05 }, paper: { c: '#d8ceb4', top: '#e6dcc2', v: 0.04 },
      urn: { c: '#4a443e', v: 0.04 }, brass: { c: '#9a7a3a', v: 0.04 },
      fire: { c: '#ffb050', glow: true }, candle: { c: '#ffe0a0', glow: true }, holy: { c: '#fff0b8', glow: true },
      lime: { c: '#d8ceb4', v: 0.04, pat: 'brick' }, limeDk: { c: '#b4a88e', v: 0.05, pat: 'brick' }, limeLt: { c: '#ece4cc', v: 0.03 }, trim: { c: '#f2ead2', v: 0.02 },
      wallS: { c: '#c8bea4', v: 0.05, pat: 'big' }, wallSd: { c: '#a89c84', v: 0.05, pat: 'big' },
      barkP: { c: '#cbc1aa', v: 0.07, pat: 'big' }, barkM: { c: '#aea38c', v: 0.07 }, leafV: { c: '#d0a830', top: '#ecc448', v: 0.12 },
      leafG: { c: '#d8a830', top: '#f2c850', v: 0.1 }, leafO: { c: '#c8882a', top: '#e8a440', v: 0.1 }, bark: { c: '#5a4632', v: 0.06 },
      slate: { c: '#56606c', v: 0.05, pat: 'tile' }, slateDk: { c: '#3e4652', v: 0.04 }, goldS: { c: '#d8b048', v: 0.05 }, domeG: { c: '#d8ac44', v: 0.05, pat: 'tile' },
      win: { c: '#ffd890', night: true, day: '#5a5a62' }, fogG: { c: '#ffeeb0', glow: true },
      grace: { c: '#ffe9a0', glow: true },
      // 이정표(OR.signpost)용
      stoneG: { c: '#9a9080', v: 0.05 }, timber: { c: '#5a4430', v: 0.05 }, door: { c: '#7a5a34', v: 0.04, pat: 'plank' }, gold: { c: '#e8b440', glow: true }, mlamp: { c: '#ffd070', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base;
      const FL = base, LOW = base - 22, TOP = FL + 16, WH = FL + 26, OY = FL + 44;   // 바닥 · 아랫도시 · 계단 위 · 벽 높이 · 천창 고리
      const TAU = Math.PI * 2;
      const front = (dx, dz) => dx + dz > 2;                       // 남동쪽(카메라 쪽) 절반 — 걷어 낸 단면
      const inTer = (x, z) => Math.hypot(x - QX, z - QZ) <= RT;
      const inCourt = (x, z) => x >= 64 && x <= 96 && z >= 34 && z <= 66;
      const inLand = (x, z) => Math.abs(x - QX) <= 10 && z <= 16;
      const inF = (x, z) => inTer(x, z) || inCourt(x, z) || (Math.abs(x - QX) <= 7 && z > 16 && z < 34);
      MH.terrain(w, {
        floor: LOW - 6,
        height: (x, z) => inLand(x, z) ? TOP : (inF(x, z) ? FL : LOW + n.fbm(x * 0.05, z * 0.05) * 2),
        surface: (x, z, y) => y >= FL ? (hash3(x >> 1, 2, z >> 1) > 0.6 ? B.floorG2 : B.floorG) : (n.fbm(x * 0.1, z * 0.1, 2) > 0.55 ? B.grass : B.floorG2),
        under: (x, z, y, dep) => {
          const e = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => !inF(x + a, z + b) && !inLand(x + a, z + b));
          return (inF(x, z) || inLand(x, z)) && e ? ((y - LOW) % 7 === 0 ? B.wallSd : B.wallS) : (dep < 2 ? B.soil : (y % 5 === 0 ? B.rockDk : B.rock));
        },
      });
      const lights = [], acts = [], landmarks = [];

      // ══ 방 바닥과 둥근 무늬(축복 자리) ══
      const MZ = QZ + 3, MR = 13;
      for (let dz = -RO; dz <= RO; dz++) for (let dx = -RO; dx <= RO; dx++) {
        const d = Math.hypot(dx, dz); if (d > RI + 0.5) continue;
        const x = QX + dx, z = QZ + dz, m = Math.hypot(x - QX, z - MZ), ang = Math.atan2(z - MZ, x - QX);
        let b = B.floorR;
        if (m <= MR) {
          b = B.medL;
          if (m > MR - 2.2) b = Math.abs(Math.sin(ang * 18)) > 0.5 ? B.medD : B.medB;           // 바깥 새김 띠
          else if (Math.abs(m - 7.5) < 0.6 || Math.abs(m - 3) < 0.5) b = B.medD;
          else if (m > 7.5 && Math.abs(Math.sin(ang * 6 + m * 0.4)) < 0.22) b = B.medB;
        }
        if (b === B.floorR && hash3(x, 4, z) > 0.93) b = B.paper;                               // 흩어진 종이
        w.set(x, FL, z, b);
      }
      for (let k = 0; k < 40; k++) { const a = hash3(k, 1, 1) * TAU, r = 4 + hash3(k, 2, 2) * 16, x = Math.round(QX + Math.cos(a) * r), z = Math.round(QZ + Math.sin(a) * r); if (Math.hypot(x - QX, z - MZ) > 3) w.set(x, FL + 1, z, B.paper); }
      const gp = LB.grace(w, QX, FL, MZ, B.grace);
      lights.push({ name: 'grace', p: gp, c: '#ffe08a', i: 1.0, d: 12, flicker: 0.1 });

      // ══ 둥근 벽: 북서쪽 절반은 높은 벽(기둥·벽감), 남동쪽 절반은 부서진 낮은 밑동만 ══
      for (let y = FL + 1; y <= WH; y++) for (let k = 0; k < 520; k++) {
        const a = k / 520 * TAU, ca = Math.cos(a), sa = Math.sin(a);
        for (let r = RI + 1; r <= RO; r++) {
          const dx = Math.round(ca * r), dz = Math.round(sa * r), x = QX + dx, z = QZ + dz;
          if (front(dx, dz)) { const hcut = FL + 2 + (hash3(k >> 3, 1, 3) * 4 | 0); if (y > hcut) continue; w.set(x, y, z, y === hcut ? B.wallGD : B.wallG); continue; }
          let b = (y - FL) % 9 === 0 ? B.wallGD : B.wallG;
          if (y >= WH - 1) b = B.wallGL;
          w.set(x, y, z, b);
        }
      }
      // 기둥과 벽감(안쪽 면), 위쪽 띠
      for (let k = 0; k < 24; k++) {
        const a = k / 24 * TAU, dx = Math.cos(a), dz = Math.sin(a); if (front(dx * RI, dz * RI)) continue;
        const x = Math.round(QX + dx * RI), z = Math.round(QZ + dz * RI);
        w.box(x, FL + 1, z, x, WH - 2, z, B.wallGL);
        const a2 = a + Math.PI / 24, x2 = QX + Math.cos(a2) * (RI + 0.6), z2 = QZ + Math.sin(a2) * (RI + 0.6);
        if (k % 2) for (let y = FL + 15; y <= FL + 22; y++) for (let s = -1; s <= 1; s++) w.set(Math.round(x2 - Math.sin(a2) * s), y, Math.round(z2 + Math.cos(a2) * s), y > FL + 21 && s ? B.wallGL : B.niche);
      }
      // 문: 북쪽(마당·큰 계단), 서쪽(가지 테라스)
      const door = (a, hw, h) => { for (let r = RI - 1; r <= RO + 1; r++) for (let s = -hw - 1; s <= hw + 1; s++) for (let y = FL + 1; y <= FL + h + 2; y++) {
        const x = Math.round(QX + Math.cos(a) * r - Math.sin(a) * s), z = Math.round(QZ + Math.sin(a) * r + Math.cos(a) * s);
        if (LB.inArch(s, y - FL - 1, hw + 0.5, h, 'round')) w.set(x, y, z, 0); else if (LB.inArch(s, y - FL - 1, hw + 1.5, h + 1, 'round') && r >= RO) w.set(x, y, z, B.wallGL);
      } };
      door(-Math.PI / 2, 3, 12); door(Math.PI, 3, 11);

      // ══ 돔: 북서쪽 절반의 갈빗대와 아랫단 판, 천창 고리 ══
      for (let k = 0; k < 36; k++) {
        const a = k / 36 * TAU, ca = Math.cos(a), sa = Math.sin(a);
        if (front(ca * 10, sa * 10)) continue;
        for (let s = 0; s <= 1.0001; s += 0.01) {
          const r = 5 + (RO - 1 - 5) * Math.cos(s * Math.PI / 2), y = Math.round(WH + (OY - WH) * Math.sin(s * Math.PI / 2));
          const rib = k % 3 === 0;
          if (!rib && s > 0.4) continue;
          for (const dr of rib ? [0, -1] : [0]) w.set(Math.round(QX + ca * (r + dr)), y, Math.round(QZ + sa * (r + dr)), rib ? B.domeR : B.domeS);
        }
      }
      for (let k = 0; k < 120; k++) { const a = k / 120 * TAU; for (const r of [5, 6]) { w.set(Math.round(QX + Math.cos(a) * r), OY, Math.round(QZ + Math.sin(a) * r), B.domeR); } if (k % 15 === 0) w.set(Math.round(QX + Math.cos(a) * 5.5), OY + 1, Math.round(QZ + Math.sin(a) * 5.5), B.holy); }
      // 천창 고리에서 늘어진 사슬과 쇠고리 샹들리에(부품)
      const CY = FL + 27;
      for (const a of [0.4, 0.4 + TAU / 3, 0.4 + 2 * TAU / 3]) for (let y = CY + 1; y < OY; y++) w.set(Math.round(QX + Math.cos(a) * 5), y, Math.round(QZ + Math.sin(a) * 5), (y & 1) ? B.iron : 0);
      const crown = w.prop({ name: 'crown', pivot: [QX + 0.5, CY, QZ + 0.5] });
      const cands = [];
      for (let k = 0; k < 90; k++) { const a = k / 90 * TAU, x = Math.round(QX + Math.cos(a) * 6.5), z = Math.round(QZ + Math.sin(a) * 6.5); crown.set(x, CY, z, B.iron); if (k % 10 === 0) { crown.set(x, CY + 1, z, B.candle); cands.push([x, CY + 1, z]); } }
      lights.push({ name: 'crown', p: [QX + 0.5, OY - 1, QZ + 0.5], c: '#ffe0a0', i: 0.3, d: 34, flicker: 0.15, srcR: 8 });
      acts.push({
        name: '천창의 쇠고리', hint: '돔 천창에 사슬로 매달린 쇠고리가 천천히 돌며 촛불이 하나씩 켜져요', hit: [QX - 7, CY - 1, QZ - 7, QX + 7, CY + 2, QZ + 7],
        run: async a => {
          a.flash('crown', 6, 4.4);
          const spin = a.turn('crown', [0, Math.PI, 0], 3.6);
          for (const [x, y, z] of cands) { a.burst([x + 0.5, y + 0.5, z + 0.5], { n: 12, colors: ['#ffe0a0', '#ffc860'], speed: 0.8, up: 2, life: 1.2, gravity: -0.4, spread: 0.4 }); await a.wait(0.3); }
          await spin; a.unwind && a.unwind('crown');
          a.burst([QX + 0.5, OY, QZ + 0.5], { n: 50, colors: ['#fff6d0', '#ffe9a0'], speed: 1, up: -6, life: 2, gravity: 1, spread: 3 });
        },
      });

      // ══ 천개 휘장: 천창 고리에서 침상 위로 드리운 거대한 천(북서쪽 절반, 부품) ══
      const drapes = w.prop({ name: 'drapes', pivot: [QX + 0.5, OY, QZ + 0.5], clipOK: 120 });
      for (const [a0, a1] of [[2.5, 3.2], [3.45, 4.15], [4.4, 5.1], [5.35, 6.0]]) {
        for (let a = a0; a <= a1; a += 0.012) for (let s = 0; s <= 1; s += 0.02) {
          const mid = (a - a0) / (a1 - a0), sag = Math.sin(mid * Math.PI) * 2.2;
          const r = 6 + 12 * s + sag * s, y = Math.round(OY - 1 - 30 * Math.pow(s, 1.25) + Math.sin(mid * Math.PI) * 2 * s);
          const x = Math.round(QX + Math.cos(a) * r), z = Math.round(QZ + Math.sin(a) * r);
          drapes.set(x, y, z, Math.abs(mid - 0.5) > 0.44 ? B.drapeG : ((Math.round(mid * 9) & 1) ? B.drape : B.drape2));
        }
      }
      acts.push({
        name: '천개 휘장', hint: '천창에서 드리운 거대한 휘장이 바람에 부풀며 천천히 흔들려요', hit: [QX - 16, FL + 14, QZ - 16, QX - 4, FL + 30, QZ - 2],
        run: async a => {
          a.wind(2.4, 4);
          for (let k = 0; k < 3; k++) { await a.turn('drapes', [0, 0.14, 0.04], 0.8); await a.turn('drapes', [0, -0.1, -0.03], 0.9); }
          await a.turn('drapes', [0, 0, 0], 0.7);
        },
      });

      // ══ 마리카의 침상: 둥근 돌 받침 위 하얀 천을 덮은 큰 침상 ══
      const BX = QX, BZ = QZ - 6, BRX = 10, BRZ = 5.5;
      for (let dz = -7; dz <= 7; dz++) for (let dx = -12; dx <= 12; dx++) {
        const e = (dx / BRX) ** 2 + (dz / BRZ) ** 2; if (e > 1) continue;
        const x = BX + dx, z = BZ + dz;
        w.box(x, FL + 1, z, x, FL + 2, z, e > 0.8 ? B.wallGD : B.bedS);
      }
      const sheetP = w.prop({ name: 'sheet', pivot: [BX + 0.5, FL + 3, BZ + 0.5], clipOK: 30 });
      for (let dz = -8; dz <= 8; dz++) for (let dx = -13; dx <= 13; dx++) {
        const e = (dx / (BRX + 0.8)) ** 2 + (dz / (BRZ + 0.8)) ** 2; if (e > 1) continue;
        const x = BX + dx, z = BZ + dz, fold = Math.sin(dx * 0.7 + dz * 0.3) > 0.6;
        sheetP.set(x, FL + 3, z, fold ? B.sheet2 : B.sheet);
        if (e > 0.62 && fold) sheetP.set(x, FL + 4, z, B.sheet);
        if (e > 0.78 && (dz > 0 || Math.abs(dx) > 7)) for (let y = FL + 1; y <= FL + 2; y++) sheetP.set(x + Math.sign(dx) * (e > 0.92 ? 1 : 0), y, z + (dz > 0 ? 1 : 0), B.sheet2);
      }
      for (const [x, z] of [[BX - 3, BZ - 1], [BX + 4, BZ + 1]]) { sheetP.set(x, FL + 4, z, B.sheet); sheetP.set(x + 1, FL + 4, z, B.sheet); }
      acts.push({
        name: '마리카의 침상', hint: '여왕의 침상을 덮은 하얀 천이 바람에 부풀었다 가라앉아요. 침상은 오래 비어 있었어요', hit: [BX - 10, FL + 1, BZ - 5, BX + 10, FL + 5, BZ + 6],
        run: async a => {
          for (let k = 0; k < 2; k++) { await a.tween('sheet', { off: [0, 2, 0], scl: [1.04, 1.4, 1.04] }, 0.6); a.burst([BX + 0.5, FL + 6, BZ + 0.5], { n: 30, colors: ['#e4dfd0', '#ffe9a0'], speed: 2, up: 1, life: 1.6, gravity: -0.2, spread: 6, flat: true }); await a.tween('sheet', { off: [0, 0, 0], scl: [1, 1, 1] }, 0.9); }
        },
      });
      landmarks.push({ name: '마리카의 침상', note: '여왕이 비운 둥근 방의 침상', p: [BX + 0.5, FL + 16, BZ + 0.5] });

      // ══ 벽을 따라 쌓인 책·석판 더미 ══
      const stack = (t, x, z, h, salt) => { for (let y = FL + 1; y <= FL + h; y++) { const sh = (hash3(salt, y, 3) * 3 | 0) - 1; for (let q = 0; q < 4; q++) { const xx = x + (q & 1) + (y % 3 === 0 ? sh : 0), zz = z + (q >> 1); t.set(xx, y, zz, [B.book, B.book2, B.book3][(y + q + salt) % 3]); } } };
      let tallStack = null;
      for (let k = 0; k < 44; k++) {
        const a = k / 44 * TAU, r = RI - 2.5 - (k % 3);
        const dx = Math.cos(a) * r, dz = Math.sin(a) * r; if (front(dx, dz)) continue;
        if (Math.abs(a - Math.PI * 1.5) < 0.3 || Math.abs(a - Math.PI) < 0.3) continue;              // 문 앞은 비운다
        const x = Math.round(QX + dx), z = Math.round(QZ + dz), h = 3 + (hash3(k, 7, 1) * 12 | 0);
        if (!tallStack && a > 3.5 && a < 4.2) { tallStack = [x, z, 15]; continue; }
        stack(w, x, z, h, k);
      }
      const books = w.prop({ name: 'books', pivot: [tallStack[0] + 1, FL + 1, tallStack[1] + 1] });
      stack(books, tallStack[0], tallStack[1], tallStack[2], 99);
      acts.push({
        name: '쌓인 책 더미', hint: '벽을 따라 산처럼 쌓인 책과 석판이 기우뚱하며 종이가 흩날려요. 여왕은 무엇을 찾고 있었을까요', hit: [tallStack[0] - 1, FL + 1, tallStack[1] - 1, tallStack[0] + 2, FL + 15, tallStack[1] + 2],
        run: async a => {
          for (let k = 0; k < 3; k++) { await a.turn('books', [0.12, 0, -0.14], 0.35); await a.turn('books', [-0.06, 0, 0.08], 0.35); }
          await a.turn('books', [0, 0, 0], 0.4);
          for (let k = 0; k < 6; k++) { a.burst([tallStack[0] + 1, FL + 6 + k * 1.6, tallStack[1] + 1], { n: 14, colors: ['#e6dcc2', '#d8ceb4', '#a89878'], speed: 2, up: 1, life: 2.4, gravity: 0.6, spread: 3 }); await a.wait(0.12); }
        },
      });

      // ══ 다리 셋 화로, 촛대, 항아리 ══
      const fires = [];
      for (const [x, z] of [[QX - 9, MZ + 8], [QX + 10, BZ + 2]]) { for (const [a, b] of [[-1, -1], [1, -1], [0, 1]]) w.set(x + a, FL + 1, z + b, B.iron); w.box(x, FL + 2, z, x, FL + 3, z, B.iron); w.box(x - 1, FL + 4, z - 1, x + 1, FL + 4, z + 1, B.brass); w.set(x, FL + 5, z, B.fire); fires.push([x, FL + 5, z]); }
      const CDX = QX + 11, CDZ = MZ + 7;
      w.box(CDX, FL + 1, CDZ, CDX, FL + 9, CDZ, B.iron);
      for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { w.set(CDX + a, FL + 8, CDZ + b, B.iron); w.set(CDX + a, FL + 9, CDZ + b, B.candle); }
      w.set(CDX, FL + 10, CDZ, B.candle);
      for (const [x, z] of [[QX + 14, QZ + 12], [QX - 16, QZ - 4], [QX + 5, QZ - 18]]) { w.box(x, FL + 1, z, x, FL + 3, z, B.urn); w.set(x, FL + 4, z, B.wallGD); }
      lights.push({ name: 'fire', p: [QX + 0.5, FL + 6, MZ + 0.5], c: '#ffb860', i: 0.5, d: 26, flicker: 0.35, srcR: 14 });
      acts.push({
        name: '화로와 촛대', hint: '침상 곁 다리 셋 화로와 높은 촛대에 불이 올라 둥근 무늬 바닥을 밝혀요', hit: [CDX - 1, FL + 1, CDZ - 1, CDX + 1, FL + 10, CDZ + 1],
        run: async a => {
          a.flash('fire', 4, 4);
          for (const p of fires.concat([[CDX, FL + 10, CDZ]])) { a.burst([p[0] + 0.5, p[1] + 0.5, p[2] + 0.5], { n: 26, colors: ['#ffb04a', '#ffe08a', '#ff7a2a'], speed: 1.2, up: 6, life: 1.4, gravity: -0.6, spread: 0.6 }); await a.wait(0.3); }
          await a.wait(1);
        },
      });

      // ══ 바깥: 테라스 난간, 북쪽 마당과 큰 계단(→ 엘데의 왕좌), 서쪽 가지 길 ══
      for (let k = 0; k < 600; k++) {
        const a = k / 600 * TAU, x = Math.round(QX + Math.cos(a) * RT), z = Math.round(QZ + Math.sin(a) * RT);
        if (inCourt(x, z) || (x < QX - 20 && Math.abs(z - QZ) < 5)) continue;
        w.set(x, FL + 1, z, B.limeLt); w.set(x, FL + 2, z, B.trim);
        if (k % 25 === 0) { w.box(x, FL + 1, z, x, FL + 3, z, B.limeDk); w.set(x, FL + 4, z, B.urn); }
      }
      for (const x of [64, 96]) for (let z = 34; z <= 62; z++) { w.set(x, FL + 1, z, B.limeLt); w.set(x, FL + 2, z, B.trim); if (z % 7 === 0) { w.box(x, FL + 1, z, x, FL + 3, z, B.limeDk); w.set(x, FL + 4, z, B.urn); } }
      MH.flight(w, { name: '왕좌 계단', axis: 'z', c: QX, half: 6, a: 33, b: 17, ha: FL, hb: TOP, step: B.floorG2, edge: B.trim, fill: B.wallS, rail: B.limeLt, post: B.limeDk, postGap: 4, onPost: (x, y, z) => { w.set(x, y, z, B.urn); w.set(x, y + 1, z, B.urn); } });
      for (const x of [QX - 8, QX + 8]) { w.box(x - 1, TOP + 1, 10, x + 1, TOP + 13, 12, B.lime); w.box(x - 1, TOP + 14, 10, x + 1, TOP + 14, 12, B.trim); }
      w.box(QX - 8, TOP + 12, 11, QX + 8, TOP + 13, 11, B.lime);
      for (let x = QX - 7; x <= QX + 7; x++) for (let y = TOP + 1; y <= TOP + 11; y++) if (hash3(x, y, 9) > 0.6) w.set(x, y, 11, B.fogG);
      lights.push({ name: 'fog', p: [QX + 0.5, TOP + 6, 13], c: '#ffe8a0', i: 0.6, d: 14, flicker: 0.2 });
      acts.push({
        name: '큰 계단의 안개문', hint: '규방 북쪽 큰 계단 꼭대기의 금빛 안개 너머에서 축복왕이 왕좌를 지켜요', hit: [QX - 7, TOP + 1, 10, QX + 7, TOP + 11, 12],
        run: async a => { a.flash('fog', 4, 3); for (let k = 0; k < 8; k++) { a.burst([QX + 0.5, TOP + 2 + k * 1.3, 11.5], { n: 24, colors: ['#ffeeb0', '#ffffff', '#ffd25a'], speed: 3, up: 1, life: 1.4, gravity: -0.4, spread: 6, flat: true }); await a.wait(0.18); } },
      });
      {
        const sx = QX + 10, sz = 37, sp = OR.signpost(w, B, sx, sz, { dir: [0, -1], boards: 1, h: 6 });
        acts.push(OR.goAct({ at: sp, name: '엘데의 왕좌로', goto: 'leyndell', hint: '큰 계단을 올라 안개문을 지나면 황금 나무 밑동 앞 엘데의 왕좌예요' }));
        landmarks.push({ name: '엘데의 왕좌', note: '큰 계단 위 · 축복왕 모르고트', p: [QX + 0.5, TOP + 22, 12] });
      }
      acts.push(LB.graceAct({ name: '여왕의 규방 축복', at: gp, to: [QX + 0.5, TOP + 6, 12], arc: 14, steps: 22, hint: '침상 앞 축복이 북쪽 문 너머 큰 계단과 엘데의 왕좌를 가리켜요' }));
      // 서쪽: 황금 나무 대성당 쪽에서 오는 거대한 가지 길
      LB.tube(w, [[0, FL + 18, 118], [22, FL + 9, 104], [44, FL + 2, 95], [QX - RT + 1, FL, QZ]], t => 3.4 - t * 0.8, (x, y, z, t, dy) => dy > 0 ? B.barkP : B.barkM);
      for (let k = 0; k < 4; k++) MH.leafBlob(w, 10 + k * 9, FL + 16 - k * 4, 112 - k * 5, 2.6, 2, 2.6, [B.leafV, B.leafO, B.leafV]);
      landmarks.push({ name: '여왕의 규방', note: '둥근 돔 방 · 축복', p: [QX + 0.5, OY + 10, QZ + 0.5] });
      landmarks.push({ name: '가지 길', note: '황금 나무 대성당 쪽에서', p: [22.5, FL + 22, 104.5] });

      // ══ 아랫도시 지붕과 금빛 나무 ══
      const hm = { found: B.wallSd, wall: B.lime, frame: B.limeDk, win: B.win, sill: B.trim, door: B.door, roof: B.slate, eave: B.slateDk, ridge: B.goldS, chimney: B.limeDk, quoin: B.limeLt };
      const placed = [];
      for (let i = 0; i < 160 && placed.length < 18; i++) {
        const x = w.ri(2, W - 14), z = w.ri(2, D - 12), sx = w.ri(8, 11), sz = w.ri(7, 9);
        const ok = [[x - 2, z - 2], [x + sx + 2, z - 2], [x - 2, z + sz + 2], [x + sx + 2, z + sz + 2], [x + (sx >> 1), z + (sz >> 1)]].every(([px, pz]) => !inF(px, pz) && !inLand(px, pz) && Math.hypot(px - QX, pz - QZ) > RT + 3 && !(px < 52 && pz > 86 && pz < 126 && Math.abs(pz - 118 + px * 0.5) < 12));
        if (!ok || placed.some(([a0, b0, a1, b1]) => x < a1 + 2 && x + sx > a0 - 2 && z < b1 + 2 && z + sz > b0 - 2)) continue;
        const h = MH.houseX(w, { x, z, sx, sz, floors: 2, fh: 6, face: 's', pitch: 2, y: LOW, m: hm });
        if (i % 4 === 0) LB.dome(w, x + (sx >> 1), h.peak - 1, z + (sz >> 1), 3, B.domeG, { ribs: 8, rib: B.goldS, lantern: B.limeLt, tip: B.goldS });
        placed.push([x, z, x + sx, z + sz]);
      }
      for (let i = 0; i < 40; i++) {
        const x = w.ri(3, W - 4), z = w.ri(3, D - 4), g = MH.g(w, x, z);
        if (g > LOW + 3 || w.get(x, g + 1, z) || inF(x, z) || inLand(x, z)) continue;
        MH.tree(w, x, g + 1, z, { kind: 'oak', h: w.ri(7, 10), bark: B.bark, leaves: [B.leafG, B.leafO, B.leafO], r: w.r(2.8, 3.8), spread: 3, branches: 4 });
      }
      return { lights, landmarks, acts };
    },
  });
})();
