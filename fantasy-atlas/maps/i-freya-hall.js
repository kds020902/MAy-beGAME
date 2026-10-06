// 폴크방 큰 홀(하위 지도) — 프레이야 파밀리아 홈 「전쟁의 들판」 큰 저택의 연회장. 코린트식 기둥 두 줄 사이 긴 만찬 식탁,
// 서쪽 끝 단 위의 은빛 옥좌, 북쪽 돔(뒤쪽 반만 보이게 잘랐다)과 여신의 등불, 동쪽 응접실(소파·하프·장미 꽃병). 남·동쪽(시점 쪽) 벽은 낮게 잘랐다 (전쟁의 들판의 하위 지도)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 88, D = 88, Hh = 56, G = 10, TAU = Math.PI * 2;
  const X0 = 14, X1 = 73, Z0 = 28, Z1 = 59, CX = 44;          // 바깥 벽선, 남북 가운데 줄
  MAPS.push({
    id: 'freya-hall', cat: 'orario', sub: true, parent: 'freya', name: '폴크방 큰 홀', en: 'Freya Familia · Great Hall of Folkvangr', color: '#e88aa8', seed: 11051, base: G, time: 'day', size: [W, D, Hh],
    desc: '전쟁의 들판 큰 저택의 연회장. 흰 대리석 코린트식 기둥이 두 줄로 늘어선 사이에 흰 식탁보를 덮은 긴 만찬 식탁이 놓였고, 서쪽 끝 단 위에는 미의 여신의 은빛 옥좌가 있다. 북쪽 돔 아래로 여신의 등불이 내려오고, 동쪽 응접실에는 하프와 장미 꽃병이 놓였다.',
    info: { title: '장소 정보', en: 'ORARIO', rows: [['연회장', '긴 만찬 식탁 · 코린트식 기둥 두 줄'], ['서쪽 끝', '단 위의 은빛 옥좌'], ['북쪽', '돔과 여신의 등불'], ['동쪽', '응접실 · 하프 · 장미 꽃병']] },
    sky: ['#f8e0e4', '#8a9ad0', '#fff0e8'], stars: false,
    hemi: ['#fff6f0', '#5a5048', 0.64], sun: ['#fff2e8', 0.72, [0.45, 1, 0.6]],
    night: { sky: ['#3a2a48', '#0a0818', '#e890a8'], stars: true, hemi: ['#d8c8e0', '#1c1618', 0.5], sun: ['#e8e0ff', 0.34, [0.45, 1, 0.6]], haze: '#302838' },
    fog: { start: 0.96, floor: G - 8, depth: 4, haze: [8, 0.12, 6], hazeColor: '#f0e4e4' },
    camY: -3, zoom: 1.7,
    particles: [
      { n: 90, colors: ['#f07890', '#c8203a', '#ffd0dc'], mode: 'drift', speed: 0.2, wind: 0.3, area: [CX, 44, 26], y0: G + 2, y1: G + 16, glow: false },
      { n: 60, colors: ['#f4ecff', '#ffffff'], mode: 'drift', speed: 0.1, area: [CX, 38, 8], y0: G + 6, y1: G + 26, glow: true },
    ],
    blocks: Object.assign(OR.blocks(), {
      marb: { c: '#f2eee6', v: 0.03, pat: 'big' }, marb2: { c: '#e2dcd0', v: 0.03 }, mTrim: { c: '#fbf8f2', v: 0.02 }, mFloor: { c: '#e8e2d8', top: '#f0ece4', v: 0.03, pat: 'check', alt: '#d8d0c4' },
      acanth: { c: '#9ab07a', v: 0.05 }, domeC: { c: '#7ab0a0', v: 0.04, pat: 'tile' }, urnB: { c: '#e8e2d4', v: 0.03 },
      divine: { c: '#f4ecff', glow: true }, candle: { c: '#ffd890', glow: true }, carpet: { c: '#a8203a', v: 0.03 }, carpetE: { c: '#d8b048', v: 0.03 }, tableC: { c: '#f4f0f0', v: 0.02 }, tableW: { c: '#6a4a30', v: 0.04, pat: 'plank' },
      food: { c: '#d89040', v: 0.08 }, fruit: { c: '#c83a4a', v: 0.08 }, grape: { c: '#6a3a7a', v: 0.08 }, silverB: { c: '#d8dce8', v: 0.03 }, velvet: { c: '#8a1a3a', v: 0.04 }, velvetL: { c: '#b03a5a', v: 0.04 },
      harpG: { c: '#e8c060', v: 0.04 }, string: { c: '#f8f0d8', v: 0.02 }, wine: { c: '#7a1a2a', v: 0.03 },
    }),
    build(w) {
      const B = w.id;
      const lights = [], acts = [], landmarks = [];
      const inside = (x, z) => x > X0 && x < X1 && z > Z0 && z < Z1;
      MH.terrain(w, {
        floor: G - 6, height: () => G,
        surface: (x, z) => inside(x, z) ? B.mFloor : (z > Z1 && z < Z1 + 12 && x > X0 - 2 && x < X1 + 2 ? B.marb2 : B.grass),
        under: (x, z, y, dep) => dep < 2 ? B.soil : B.rock,
      });
      // 코린트식 기둥(바깥 저택과 같은 모양, 높이만 실내에 맞췄다)
      const col = (x, z, y0, y1) => {
        w.box(x - 2, y0, z - 2, x + 2, y0, z + 2, B.mTrim); w.cyl(x, z, y0 + 1, y0 + 1, 2, B.marb2);
        for (let y = y0 + 2; y <= y1 - 4; y++) w.cyl(x, z, y, y, 1.5, (y - y0) % 2 ? B.marb : B.marb2);
        w.cyl(x, z, y1 - 3, y1 - 3, 1.5, B.acanth); w.cyl(x, z, y1 - 2, y1 - 2, 2, B.acanth);
        for (const [dx, dz] of [[-2, -2], [2, -2], [-2, 2], [2, 2]]) w.set(x + dx, y1 - 1, z + dz, B.gold);
        w.cyl(x, z, y1 - 1, y1 - 1, 2, B.marb); w.box(x - 2, y1, z - 2, x + 2, y1, z + 2, B.mTrim);
      };
      // 큰 꽃병(장미)
      const urns = [];
      const urn = (x, z, y) => {
        w.box(x - 1, y, z - 1, x + 1, y, z + 1, B.mTrim); w.set(x, y + 1, z, B.marb2);
        w.cyl(x, z, y + 2, y + 2, 1.2, B.urnB); w.cyl(x, z, y + 3, y + 3, 1.9, B.urnB);
        w.ring(x, z, y + 4, 1.2, 2.2, B.mTrim); w.cyl(x, z, y + 4, y + 4, 1.2, B.soil);
        for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) { w.set(x + dx, y + 5, z + dz, hash3(x + dx, y, z + dz) > 0.5 ? B.rose : (hash3(x + dx, y + 1, z + dz) > 0.5 ? B.roseP : B.hedge)); }
        w.set(x, y + 6, z, B.roseP); urns.push([x + 0.5, y + 6.5, z + 0.5]);
      };

      // ── 바닥: 체크 대리석, 문에서 식탁까지와 옥좌까지 붉은 깔개(금빛 테) ──
      for (let z = 46; z < Z1; z++) for (let x = CX - 2; x <= CX + 2; x++) w.set(x, G, z, x === CX - 2 || x === CX + 2 ? B.carpetE : B.carpet);
      for (let z = 41; z <= 47; z++) for (let x = X0 + 1; x <= X1 - 1; x++) if (z === 41 || z === 47) w.set(x, G, z, B.carpetE); else w.set(x, G, z, B.carpet);
      // 돔 아래 바닥의 금빛 고리
      for (let dz = -9; dz <= 9; dz++) for (let dx = -9; dx <= 9; dx++) { const d = Math.hypot(dx, dz); if (Math.abs(d - 8) < 0.5 && Z0 + dz + 10 > Z0) { const z = 38 + dz; if (z > Z0 && z < 41) w.set(CX + dx, G, z, B.gold); } }

      // ── 벽: 북·서는 높고(창과 금빛 띠), 남·동은 낮다 ──
      const HI = G + 20, LO = G + 4;
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (x !== X0 && x !== X1 && z !== Z0 && z !== Z1) continue;
        const hi = z === Z0 || x === X0, top = hi ? HI : LO, u = x === X0 || x === X1 ? z : x;
        for (let y = G + 1; y <= top; y++) {
          let b = (y - G) % 8 === 0 || y === top ? B.mTrim : B.marb;
          if (hi && (u % 8 === 3 || u % 8 === 4) && y > G + 3 && y < top - 2 && (y - G) % 8 !== 0) b = B.win;
          if (!hi && (u % 8 === 3 || u % 8 === 4) && y >= G + 2 && y <= G + 3) b = B.win;
          w.set(x, y, z, b);
        }
      }
      for (let x = X0; x <= X1; x++) { w.set(x, HI + 1, Z0, B.gold); w.set(x, HI + 2, Z0, B.mTrim); }
      for (let z = Z0; z <= Z1; z++) { w.set(X0, HI + 1, z, B.gold); w.set(X0, HI + 2, z, B.mTrim); }

      // ── 정문(남쪽 가운데): 금빛 문틀과 문짝, 문 둘레만 높인 문간 ──
      w.box(CX - 7, G + 1, Z1, CX + 7, G + 12, Z1, B.marb); for (let x = CX - 7; x <= CX + 7; x++) { w.set(x, G + 12, Z1, B.mTrim); w.set(x, G + 13, Z1, (x & 1) ? B.mTrim : 0); }
      for (let x = CX - 4; x <= CX + 4; x++) for (let y = G + 1; y <= G + 10; y++) w.set(x, y, Z1, y === G + 10 || x === CX - 4 || x === CX + 4 ? B.gold : (y > G + 8 ? B.mTrim : B.door));
      for (let y = G + 3; y <= G + 6; y++) { w.set(CX - 1, y, Z1 - 1, (y & 1) ? B.gold : 0); w.set(CX + 1, y, Z1 - 1, (y & 1) ? B.gold : 0); }
      for (let x = CX - 4; x <= CX + 4; x++) w.set(x, G + 11, Z1 - 1, B.rose);
      // 바깥 현관: 기둥 둘과 꽃병
      col(CX - 9, Z1 + 5, G + 1, G + 14); col(CX + 9, Z1 + 5, G + 1, G + 14);
      urn(CX - 14, Z1 + 4, G + 1); urn(CX + 14, Z1 + 4, G + 1);
      lights.push({ name: 'door', p: [CX + 0.5, G + 8, Z1 + 2], c: '#fff0c0', i: 0.3, d: 14, flicker: 0.1, srcR: 8 });

      // ── 기둥 두 줄 ──
      for (const x of [22, 32, 56, 66]) col(x, 34, G + 1, G + 18);
      for (const x of [22, 66]) col(x, 53, G + 1, G + 18);

      // ── 만찬 식탁: 흰 식탁보, 촛대, 음식과 과일, 은 잔(부품), 높은 등받이 의자 ──
      const TX0 = 26, TX1 = 62, TZ = 44;
      for (let x = TX0; x <= TX1; x++) {
        w.box(x, G + 1, TZ, x, G + 2, TZ, (x - TX0) % 6 === 0 ? B.tableW : 0); w.box(x, G + 2, TZ - 1, x, G + 2, TZ + 1, B.tableW); w.box(x, G + 3, TZ - 1, x, G + 3, TZ + 1, B.tableC);
        if ((x - TX0) % 6 === 0) { w.set(x, G + 4, TZ, B.silverB); w.set(x, G + 5, TZ, B.candle); }
        else if ((x - TX0) % 3 === 0) { w.set(x, G + 4, TZ, B.food); }
        else if ((x - TX0) % 6 === 1) { w.set(x, G + 4, TZ - 1, B.fruit); w.set(x, G + 4, TZ + 1, B.grape); }
        if ((x - TX0) % 3 === 1) for (const [z, dz] of [[TZ - 3, -1], [TZ + 3, 1]]) { w.set(x, G + 1, z, B.tableW); w.set(x, G + 2, z + dz, B.velvet); w.set(x, G + 3, z + dz, B.tableW); w.set(x, G + 1, z + dz, B.tableW); }
      }
      const gob = w.prop({ name: 'goblets', pivot: [CX + 0.5, G + 4, TZ + 0.5] });
      for (let x = TX0 + 2; x <= TX1; x += 6) for (const z of [TZ - 1, TZ + 1]) { gob.set(x, G + 4, z, B.silverB); gob.set(x, G + 5, z, B.wine); }
      lights.push({ name: 'table', p: [CX + 0.5, G + 6, TZ + 0.5], c: '#ffd090', i: 0.55, d: 34, flicker: 0.2, srcR: 4 });
      acts.push({
        name: '만찬 촛불 켜기', hint: '긴 식탁 촛대에 동쪽부터 차례로 불이 붙으며 만찬이 시작돼요', hit: [TX0, G + 1, TZ - 1, TX1, G + 5, TZ + 1],
        run: async a => {
          a.flash('table', 4, 5);
          for (let x = TX1; x >= TX0; x -= 6) { a.burst([x + 0.5, G + 6, TZ + 0.5], { n: 12, colors: ['#ffd890', '#ffffff', '#ff9a3a'], speed: 1, up: 2.4, life: 1, gravity: -0.6, spread: 0.3 }); await a.wait(0.3); }
        },
      });
      acts.push({
        name: '건배', hint: '식탁 위 은 잔들이 한꺼번에 들어 올려지고 포도주 방울과 금빛이 튀어요', hit: [TX0, G + 1, TZ - 4, TX1, G + 5, TZ - 2],
        run: async a => {
          await a.move('goblets', [0, 2.5, 0], 0.8);
          for (let x = TX0 + 2; x <= TX1; x += 6) a.burst([x + 0.5, G + 8, TZ + 0.5], { n: 10, colors: ['#ffe9a0', '#ffffff', '#c8203a'], speed: 2, up: 2, life: 1, gravity: 3, spread: 0.6 });
          a.flash('table', 3, 1.5);
          await a.wait(1);
          await a.move('goblets', [0, 0, 0], 0.8);
        },
      });
      landmarks.push({ name: '만찬 식탁', note: '코린트식 기둥 사이 긴 식탁', p: [CX + 0.5, G + 16, TZ + 0.5], boss: true });

      // ── 서쪽 끝: 세 단 위 은빛 옥좌와 뒤쪽 은빛 고리(부품) ──
      for (let s = 0; s < 3; s++) w.box(X0 + 1, G + 1 + s, 37 + s, X0 + 7 - s * 2, G + 1 + s, 51 - s, s === 0 ? B.mTrim : B.marb2);
      for (let z = 40; z <= 48; z++) w.set(X0 + 3, G + 3, z, B.carpet);
      const THX = X0 + 2, THZ = 44;
      w.box(THX, G + 4, THZ - 2, THX + 2, G + 4, THZ + 2, B.silverB); w.box(THX + 1, G + 5, THZ - 1, THX + 1, G + 5, THZ + 1, B.velvetL);
      w.box(THX, G + 5, THZ - 2, THX, G + 12, THZ + 2, B.silverB); w.box(THX, G + 13, THZ - 1, THX, G + 13, THZ + 1, B.gold); w.set(THX, G + 14, THZ, B.gold);
      for (const dz of [-2, 2]) w.box(THX + 1, G + 5, THZ + dz, THX + 2, G + 6, THZ + dz, B.silverB);
      w.box(THX + 1, G + 6, THZ - 1, THX + 1, G + 10, THZ + 1, B.velvetL);
      const halo = w.prop({ name: 'halo', pivot: [X0 + 1.5, G + 10.5, THZ + 0.5], axis: 'x', speed: 0.15 });
      MH.ringProp(halo, X0 + 1, G + 10, THZ, 5, 'yz', B.silverB, B.divine, 8);
      lights.push({ name: 'throne', p: [THX + 2, G + 9, THZ + 0.5], c: '#f4e0ff', i: 0.45, d: 18, flicker: 0.1, srcR: 6 });
      acts.push({
        name: '은빛 옥좌', hint: '단 위 은빛 옥좌 뒤의 고리가 빠르게 돌며 미의 여신의 은빛이 홀 가득 번져요', hit: [X0 + 1, G + 1, 39, X0 + 5, G + 14, 49],
        run: async a => {
          a.spin('halo', 20, 4.5); a.flash('throne', 6, 4.5); a.glow(1.8, 4.5);
          for (let k = 0; k < 8; k++) { a.burst([THX + 1.5, G + 10, THZ + 0.5], { n: 22, colors: ['#f4ecff', '#ffffff', '#ffd0e8'], speed: 4 + k * 0.3, up: 0.5, life: 1.6, gravity: 0.2, spread: 0.6 }); await a.wait(0.45); }
        },
      });
      landmarks.push({ name: '은빛 옥좌', note: '서쪽 끝 세 단 위', p: [THX + 1, G + 22, THZ + 0.5] });

      // ── 북쪽 돔(뒤쪽 반만): 대리석 고리, 초록 기와와 금빛 갈빗대, 창. 가운데 여신의 등불(부품) ──
      const DZc = 38, DY = HI + 1, DR = 10;
      w.ring(CX, DZc, DY, DR - 1.2, DR + 0.4, B.mTrim);
      for (let y = 0; y <= DR; y++) for (let dz = -DR - 1; dz <= DR + 1; dz++) for (let dx = -DR - 1; dx <= DR + 1; dx++) {
        const d = Math.hypot(dx, y, dz); if (d > DR + 0.3 || d < DR - 1.1) continue;
        if (dx * 0.68 + dz * 0.73 > 1.5 || DZc + dz < Z0) continue;
        const ang = Math.atan2(dz, dx), rib = Math.abs(ang * 8 / Math.PI - Math.round(ang * 8 / Math.PI)) < 0.08;
        w.set(CX + dx, DY + 1 + y, DZc + dz, rib ? B.gold : (y > 2 && y < 5 && Math.abs(ang * 8 / Math.PI - Math.round(ang * 8 / Math.PI) - 0.5) < 0.12 ? B.win : B.domeC));
      }
      w.box(CX, DY + 1, DZc, CX, DY + DR, DZc, B.gold);
      const dl = w.prop({ name: 'dlamp', pivot: [CX + 0.5, G + 15, DZc + 0.5], axis: 'y', speed: 0.2 });
      dl.box(CX, G + 15, DZc, CX, DY, DZc, B.gold);
      MH.ringProp(dl, CX, G + 13, DZc, 3, 'xz', B.gold, B.divine, 8);
      for (const [dx, dz] of [[3, 0], [-3, 0], [0, 3], [0, -3]]) dl.line(CX + dx, G + 13, DZc + dz, CX, G + 15, DZc, B.gold);
      dl.set(CX, G + 13, DZc, B.divine); dl.set(CX, G + 12, DZc, B.divine);
      lights.push({ name: 'dlamp', p: [CX + 0.5, G + 13, DZc + 0.5], c: '#f4e0ff', i: 0.5, d: 30, flicker: 0.08, srcR: 4 });
      acts.push({
        name: '돔 등불', hint: '돔 아래 여신의 등불이 천천히 내려오며 돌고, 은빛 불빛이 홀에 쏟아져요', hit: [CX - 3, G + 11, DZc - 3, CX + 3, G + 16, DZc + 3],
        run: async a => {
          await a.move('dlamp', [0, -3, 0], 1.6);
          a.spin('dlamp', 12, 3); a.flash('dlamp', 6, 3); a.glow(1.6, 3);
          for (let k = 0; k < 8; k++) { a.burst([CX + 0.5, G + 10, DZc + 0.5], { n: 20, colors: ['#f4ecff', '#ffffff', '#d8b048'], speed: 4, up: 0, life: 1.4, gravity: 0.6, spread: 0.6, flat: k % 2 === 0 }); await a.wait(0.35); }
          await a.move('dlamp', [0, 0, 0], 1.6);
        },
      });
      landmarks.push({ name: '돔과 여신의 등불', note: '북쪽 돔 아래', p: [CX + 0.5, DY + DR + 6, DZc + 0.5] });

      // ── 동쪽 응접실: 소파 둘과 낮은 탁자, 하프, 장미 꽃병 ──
      for (const z of [36, 51]) { w.box(67, G + 1, z - 2, 70, G + 1, z + 2, B.velvet); w.box(70, G + 2, z - 2, 70, G + 3, z + 2, B.velvetL); w.box(67, G + 2, z - 2, 69, G + 2, z - 2, B.velvetL); w.box(67, G + 2, z + 2, 69, G + 2, z + 2, B.velvetL); }
      w.box(63, G + 1, 50, 64, G + 1, 52, B.tableW); w.set(63, G + 2, 51, B.silverB); w.set(64, G + 2, 50, B.fruit);
      const HX = 66, HZ = 44;
      w.box(HX - 1, G + 1, HZ - 2, HX + 1, G + 1, HZ + 2, B.mTrim);
      w.box(HX, G + 2, HZ - 2, HX, G + 2, HZ + 2, B.harpG); w.box(HX, G + 3, HZ - 2, HX, G + 9, HZ - 2, B.harpG);
      for (let k = 0; k <= 4; k++) { w.set(HX, G + 9 - Math.floor(k / 2), HZ - 2 + k, B.harpG); for (let y = G + 3; y < G + 9 - Math.floor(k / 2); y++) if (k > 0 && k < 4) w.set(HX, y, HZ - 2 + k, B.string); }
      w.box(HX, G + 3, HZ + 2, HX, G + 6, HZ + 2, B.harpG);
      w.set(HX + 2, G + 1, HZ, B.velvet); w.set(HX + 2, G + 1, HZ + 1, B.tableW);
      w.set(68, G + 1, 44, B.tableW); w.set(68, G + 2, 44, B.candle);
      lights.push({ name: 'harp', p: [68.5, G + 3, 44.5], c: '#ffd890', i: 0.35, d: 12, flicker: 0.25, srcR: 2 });
      acts.push({
        name: '현악 연주', hint: '응접실의 금빛 하프가 저절로 울리며 음표 같은 빛 알갱이가 홀로 흘러가요', hit: [HX - 1, G + 1, HZ - 2, HX + 1, G + 9, HZ + 2],
        run: async a => {
          a.flash('harp', 3, 5);
          for (let k = 0; k < 14; k++) { a.burst([HX - 1.5 - (k % 3), G + 5 + (k % 4), HZ - 1 + (k % 3)], { n: 6, colors: ['#ffe9a0', '#ffffff', '#f07890'], speed: 1.4, up: 1.2, life: 2.4, gravity: -0.2, spread: 0.3 }); await a.wait(0.25); }
        },
      });

      // 장미 꽃병: 홀 네 귀퉁이와 응접실
      urn(X0 + 4, Z0 + 4, G + 1); urn(X1 - 4, Z0 + 4, G + 1); urn(X1 - 4, Z1 - 4, G + 1); urn(X0 + 4, Z1 - 4, G + 1); urn(62, 36, G + 1);
      acts.push({
        name: '장미 꽃병', hint: '큰 꽃병의 장미들이 한꺼번에 꽃잎을 날려 홀 바닥이 붉은 꽃잎으로 덮여요', hit: [X1 - 6, G + 1, Z0 + 2, X1 - 2, G + 7, Z0 + 6],
        run: async a => {
          a.wind(2.5, 4);
          for (let k = 0; k < 12; k++) { const p = urns[k % urns.length]; a.burst(p, { n: 16, colors: ['#c8203a', '#f07890', '#ffd0dc'], speed: 2.6, up: 2, life: 2.6, gravity: 0.5, spread: 1, flat: true }); await a.wait(0.25); }
        },
      });
      // 벽 촛대(높은 벽)
      for (let x = X0 + 6; x < X1; x += 8) { w.set(x, G + 8, Z0 + 1, B.gold); w.set(x, G + 9, Z0 + 1, B.candle); }
      for (let z = Z0 + 6; z < Z1; z += 8) if (z < 37 || z > 51) { w.set(X0 + 1, G + 8, z, B.gold); w.set(X0 + 1, G + 9, z, B.candle); }
      lights.push({ name: 'hall', p: [CX + 0.5, G + 9, Z0 + 2], c: '#ffd8a8', i: 0.45, d: 40, flicker: 0.15, srcR: 4 });

      // ── 정문 안쪽: 밖으로 나가기 ──
      acts.push(OR.goAct({ at: [CX, G + 1, Z1 - 3], h: 7, name: '밖으로 나가기', goto: 'freya', hint: '금빛 문을 열고 큰 저택 현관 기둥 사이로 나가요', hit: [CX - 3, G + 1, Z1, CX + 3, G + 9, Z1] }));
      return { lights, landmarks, acts };
    },
  });
})();
