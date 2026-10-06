// 물약 상점(하위 지도) — 연금술 거리 골목 동쪽 4층 물약 상점 안. 서쪽 정문으로 들어서면 빛나는 병 진열장과 계산대(종),
// 계산대 뒤 조제실(가마솥 화덕·증류기·약재 서랍장), 남동쪽 2층 재료 창고(나무 계단·도르래·약초 다발·상자).
// 남·동쪽(기본 시점 쪽) 벽은 잘라 낮췄다. 좌표: +x 동쪽, +z 남쪽. 정문은 서쪽 (연금술 거리의 하위 지도)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 56, D = 56, Hh = 48, G = 10;
  const X0 = 16, X1 = 39, Z0 = 16, Z1 = 39, DZ = 27;                   // 벽 안쪽 경계, 정문 가운데 z(서쪽 벽)
  const LH = G + 7;                                                       // 2층 창고 마루 높이
  MAPS.push({
    id: 'alembic-potionshop', cat: 'magic', sub: true, parent: 'alembic', name: '물약 상점', en: 'Alembic Row · Potion Shop', color: '#8ad05a', seed: 3131, base: G, time: 'night', size: [W, D, Hh],
    desc: '연금술 거리 골목 동쪽, 창가에 빛나는 병이 줄지어 선 4층 물약 상점의 1층. 서쪽 정문 안쪽 벽장마다 일곱 색 물약이 빛나고, 계산대 너머 조제실에서는 화덕 위 가마솥이 끓는다. 벽 가득한 약재 서랍장 옆 나무 계단을 오르면 약초 다발이 매달린 2층 재료 창고다.',
    info: { title: '장소 정보', en: 'POTION SHOP', rows: [['매장', '빛나는 병 진열장 · 계산대'], ['조제실', '가마솥 화덕 · 증류기 · 약재 서랍'], ['2층', '재료 창고 · 도르래'], ['주의', '초록 병은 맛보기 금지']] },
    sky: ['#1e3020', '#0a100a', '#6aff9a'], stars: true,
    hemi: ['#e0ffd8', '#2a2a1c', 0.66], sun: ['#f0ffe0', 0.46, [0.45, 1, 0.5]],
    day: { sky: ['#e0f0d0', '#8ab890', '#f8ffe0'], stars: false, hemi: ['#ffffff', '#4a4a38', 0.62], sun: ['#fff8e0', 0.72, [0.45, 1, 0.5]] },
    fog: { start: 0.94, floor: G - 8, depth: 6 },
    camY: -1, zoom: 2.4,
    spawn: [X0 + 2, G + 1, DZ],
    particles: [
      { n: 50, colors: ['#e0ffb0', '#fff6d8'], mode: 'drift', speed: 0.12, area: [28, 28, 11], y0: G + 2, y1: G + 12, glow: true },
      { n: 24, colors: ['#9aff6a', '#c8ffa0', '#d890ff'], mode: 'rise', speed: 0.5, area: [34.5, 21.5, 1.2], y0: G + 4, y1: G + 14, glow: true },
    ],
    blocks: {
      cob: { c: '#4a4a40', top: '#5a5a50', v: 0.12, pat: 'stone' }, rock: { c: '#3a3a36', v: 0.06, pat: 'stone' }, found: { c: '#5a5a54', v: 0.05, pat: 'stone' },
      tileG: { c: '#2a4a3a', top: '#3a6a4a', v: 0.03, pat: 'check', alt: '#d8d0b0' }, board: { c: '#5a3e28', top: '#7a5434', v: 0.05, pat: 'plank' },
      wallT: { c: '#4a8a8a', v: 0.04 }, wallC: { c: '#c8c0a8', v: 0.04 }, frame: { c: '#3a2a1a', v: 0.05 }, door: { c: '#2a1a10', v: 0.03, pat: 'plank' }, iron: { c: '#3a3a40', v: 0.04 },
      plank: { c: '#6a4a30', v: 0.06, pat: 'plank' }, desk: { c: '#4a3020', v: 0.04 }, drawer: { c: '#7a5434', v: 0.05, pat: 'plank' }, knob: { c: '#e0c060', v: 0.05 },
      copper: { c: '#c07a3a', v: 0.08 }, copperDk: { c: '#8a5228', v: 0.06 }, patina: { c: '#4a9a7a', v: 0.08 }, brick: { c: '#8a4a3a', v: 0.06, pat: 'brick' },
      glass: { c: '#a8e0c8', v: 0.03 }, crate: { c: '#7a5a3a', v: 0.06, pat: 'plank' }, sack: { c: '#b8a070', v: 0.08 }, herb: { c: '#6aa040', v: 0.1 }, herbD: { c: '#8a8a3a', v: 0.1 }, rope: { c: '#a08060', v: 0.05 },
      rug: { c: '#6a3a7a', v: 0.04, pat: 'check', alt: '#5e3470' }, rugE: { c: '#c8a040', v: 0.04 }, parch: { c: '#ece0bc', v: 0.04 },
      potG: { c: '#8aff5a', glow: true }, potP: { c: '#d07aff', glow: true }, potR: { c: '#ff6a8a', glow: true }, potB: { c: '#6ac8ff', glow: true }, potY: { c: '#ffe060', glow: true }, potO: { c: '#ffa040', glow: true },
      fire: { c: '#ff9a3a', glow: true }, ember: { c: '#ffd060', glow: true }, brew: { c: '#9aff6a', glow: true }, lamp: { c: '#b8ff9a', glow: true }, candle: { c: '#fff0c0', glow: true },
      winG: { c: '#c8ff8a', night: true, day: '#7a9a80' }, bell: { c: '#e0c060', v: 0.05 },
    },
    build(w) {
      const B = w.id;
      w.hm = new Int16Array(W * D).fill(G);
      const lights = [], acts = [], landmarks = [];
      const pots = [B.potG, B.potP, B.potR, B.potB, B.potY, B.potO];
      const inside = (x, z) => x >= X0 && x <= X1 && z >= Z0 && z <= Z1;

      // ── 바깥 골목 자갈길 · 가게 바닥(초록 체크 타일) ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        for (let y = G - 4; y < G; y++) w.set(x, y, z, B.rock);
        w.set(x, G, z, inside(x, z) ? B.tileG : (x < X0 - 2 && Math.abs(z - DZ) <= 2 ? B.found : B.cob));
      }
      // ── 벽: 반목조(청록 회벽 + 검은 기둥·보). 북·서는 2층 높이, 남·동은 낮게 ──
      const HT = G + 14;
      for (let z = Z0 - 2; z <= Z1 + 2; z++) for (let x = X0 - 2; x <= X1 + 2; x++) {
        if (inside(x, z)) continue;
        const back = (x < X0 || z < Z0) && x <= X1 && z <= Z1;
        const top = back ? HT : G + 3;
        const u = x < X0 ? z : x;                                               // 벽을 따라가는 좌표
        for (let y = G + 1; y <= top; y++) {
          const post = (u % 4 === 0) || (x < X0 && z < Z0), beam = y === G + 1 || y === LH || y === top;
          w.set(x, y, z, post || beam ? B.frame : (y > LH ? B.wallC : B.wallT));
        }
      }
      // 창(북쪽 1·2층, 서쪽 2층) — 초록 납유리
      for (let x = X0 + 2; x <= X1 - 2; x += 8) for (const [y0, y1] of [[G + 3, G + 5], [G + 10, G + 12]]) for (const z of [Z0 - 2, Z0 - 1]) w.box(x, y0, z, x + 1, y1, z, B.winG);
      for (const z of [Z0 + 3, Z1 - 4]) for (const x of [X0 - 2, X0 - 1]) w.box(x, G + 10, z, x, G + 12, z + 1, B.winG);
      // ── 정문(서쪽): 문틀, 닫힌 문짝, 문 위 병 간판, 문 앞 깔개 ──
      w.box(X0 - 2, G + 1, DZ - 1, X0 - 1, G + 4, DZ + 1, 0);
      w.box(X0 - 2, G + 1, DZ - 1, X0 - 2, G + 4, DZ + 1, B.door); w.set(X0 - 2, G + 3, DZ + 1, B.knob);
      for (const z of [DZ - 2, DZ + 2]) w.box(X0 - 2, G + 1, z, X0 - 1, G + 5, z, B.frame); w.box(X0 - 2, G + 5, DZ - 2, X0 - 1, G + 5, DZ + 2, B.frame);
      w.set(X0 - 1, G + 6, DZ, B.potG); w.set(X0 - 1, G + 7, DZ, B.glass);
      for (let z = DZ - 2; z <= DZ + 2; z++) for (let x = X0; x <= X0 + 3; x++) w.set(x, G, z, x === X0 + 3 || Math.abs(z - DZ) === 2 ? B.rugE : B.rug);
      acts.push(OR.goAct({ at: [X0, G + 1, DZ], name: '밖으로 나가기', goto: 'alembic', hint: '서쪽 문을 열고 병 등불이 걸린 연금술 거리 골목으로 나가요', hit: [X0, G + 1, DZ - 1, X0 + 1, G + 4, DZ + 1] }));

      // ── 빛나는 병 진열장(북쪽 벽, 매장 쪽) ──
      for (let x = X0; x <= X0 + 12; x++) for (let y = G + 1; y <= G + 6; y++) w.set(x, y, Z0, (y - G) % 2 === 1 || x === X0 || x === X0 + 12 ? B.plank : (hash3(x, y, 1) > 0.25 ? pots[(x * 3 + y) % 6] : B.glass));
      w.box(X0, G + 7, Z0, X0 + 12, G + 7, Z0, B.frame);
      const shelf = w.prop({ name: 'shelfpots', pivot: [X0 + 6.5, G + 4, Z0 + 1.5] });
      for (let x = X0 + 2; x <= X0 + 10; x += 2) { shelf.set(x, G + 3, Z0 + 1, pots[x % 6]); shelf.set(x, G + 4, Z0 + 1, B.glass); }
      w.box(X0 + 1, G + 2, Z0 + 1, X0 + 11, G + 2, Z0 + 1, B.plank);
      lights.push({ name: 'shelf', p: [X0 + 6.5, G + 4, Z0 + 1.5], c: '#c8a0ff', i: 1, d: 12, flicker: 0.1 });
      acts.push({
        name: '병 흔들기', hint: '진열장의 병들이 저절로 튀어나와 달그락 흔들리며 색색 거품을 뿜어요', hit: [X0 + 1, G + 1, Z0, X0 + 11, G + 6, Z0 + 2],
        run: async a => {
          a.flash('shelf', 3, 3);
          await a.move('shelfpots', [0, 1, 2], 0.4);
          for (let k = 0; k < 4; k++) { await a.move('shelfpots', [k % 2 ? 0.4 : -0.4, 1.4, 2], 0.18); a.burst([X0 + 2.5 + k * 2, G + 6, Z0 + 3.5], { n: 14, colors: ['#8aff5a', '#d07aff', '#ff6a8a', '#6ac8ff'], speed: 2, up: 3, life: 1.2, gravity: -0.4, spread: 0.6 }); }
          await a.move('shelfpots', [0, 0, 0], 0.6);
        },
      });
      // 서쪽 벽 진열 선반(문 양옆)과 가운데 진열 탁자(병 피라미드)
      for (const [z0, z1] of [[Z0 + 2, DZ - 4], [DZ + 4, Z1 - 1]]) for (let z = z0; z <= z1; z++) for (let y = G + 1; y <= G + 5; y++) w.set(X0, y, z, (y - G) % 2 === 1 ? B.plank : (hash3(z, y, 3) > 0.35 ? pots[(z + y) % 6] : B.glass));
      w.box(X0 + 5, G + 1, Z1 - 7, X0 + 8, G + 1, Z1 - 5, B.desk); w.box(X0 + 5, G + 2, Z1 - 7, X0 + 8, G + 2, Z1 - 5, B.plank);
      for (let x = X0 + 5; x <= X0 + 8; x++) for (let z = Z1 - 7; z <= Z1 - 5; z++) w.set(x, G + 3, z, pots[(x + z) % 6]);
      w.box(X0 + 6, G + 4, Z1 - 7, X0 + 7, G + 4, Z1 - 6, B.glass); w.set(X0 + 6, G + 5, Z1 - 6, B.potY);

      // ── 계산대(매장과 조제실 사이, ㄴ자)와 종 ──
      const CX0 = X0 + 9, CZ1 = Z0 + 9;
      w.box(CX0, G + 1, Z0 + 3, CX0, G + 2, CZ1, B.desk); w.box(CX0 - 1, G + 3, Z0 + 3, CX0, G + 3, CZ1, B.plank);
      w.box(CX0, G + 1, CZ1, CX0 + 4, G + 2, CZ1, B.desk); w.box(CX0, G + 3, CZ1, CX0 + 4, G + 3, CZ1 + 1, B.plank);
      w.set(CX0, G + 4, Z0 + 4, B.candle); w.set(CX0 - 1, G + 4, Z0 + 7, B.parch); w.set(CX0, G + 4, CZ1, B.copper); w.set(CX0 + 3, G + 4, CZ1, B.glass); w.set(CX0 + 4, G + 4, CZ1, B.potO);
      const bell = w.prop({ name: 'cbell', pivot: [CX0 + 1.5, G + 4, CZ1 + 1.5] });
      bell.set(CX0 + 1, G + 4, CZ1 + 1, B.bell); bell.set(CX0 + 1, G + 5, CZ1 + 1, B.knob);
      lights.push({ name: 'counter', p: [CX0 + 0.5, G + 4.5, Z0 + 4.5], c: '#ffe0a0', i: 0.8, d: 9, flicker: 0.2 });
      acts.push({
        name: '계산대 종', hint: '계산대의 작은 종이 딸랑 울리면 안쪽 조제실까지 소리 고리가 퍼져요', hit: [CX0, G + 3, CZ1, CX0 + 3, G + 5, CZ1 + 2],
        run: async a => {
          a.flash('counter', 3, 2.2); a.spin('cbell', 7, 2.2);
          await a.move('cbell', [0, 2, 0], 0.3);
          for (let k = 0; k < 4; k++) { a.burst([CX0 + 1.5, G + 6, CZ1 + 1.5], { n: 18, colors: ['#ffffff', '#ffe0a0'], speed: 5, up: 0, life: 1, gravity: 0, spread: 0.4, flat: true }); await a.wait(0.35); }
          await a.move('cbell', [0, 0, 0], 0.3);
        },
      });
      // 맛보기 잔(계산대 위)
      const smp = w.prop({ name: 'sample', pivot: [CX0 - 0.5, G + 4.5, Z0 + 6.5], axis: 'y' });
      smp.set(CX0 - 1, G + 4, Z0 + 6, B.glass); smp.set(CX0 - 1, G + 5, Z0 + 6, B.potP); smp.set(CX0 - 1, G + 4, Z0 + 5, B.potR); smp.set(CX0 - 1, G + 5, Z0 + 5, B.glass);
      acts.push({
        name: '물약 맛보기', hint: '계산대의 맛보기 병이 떠올라 빙글 돌며 보랏빛 거품과 반짝이를 뿜어요', hit: [CX0 - 2, G + 3, Z0 + 4, CX0, G + 6, Z0 + 7],
        run: async a => {
          a.spin('sample', 6, 3);
          await a.move('sample', [-1, 3, 0], 0.8);
          for (let k = 0; k < 6; k++) { a.burst([CX0 - 0.5, G + 8, Z0 + 6], { n: 16, colors: ['#d07aff', '#ff6a8a', '#ffffff'], speed: 2.5, up: 3, life: 1.3, gravity: -0.5, spread: 0.6 }); await a.wait(0.3); }
          a.glow(1.4, 1.2);
          await a.move('sample', [0, 0, 0], 0.8);
        },
      });

      // ── 조제실(계산대 뒤 북동쪽): 벽돌 화덕 위 가마솥, 구리 증류기, 약재 서랍장 ──
      const KX = X1 - 5, KZ = Z0 + 5;
      w.box(KX - 2, G + 1, KZ - 2, KX + 2, G + 1, KZ + 2, B.brick);
      w.box(KX - 1, G + 1, KZ + 2, KX + 1, G + 1, KZ + 2, B.fire); w.set(KX, G + 1, KZ + 2, B.ember);
      for (let y = G + 2; y <= G + 4; y++) w.ring(KX, KZ, y, 1.2, 2.3, B.iron);
      w.ring(KX, KZ, G + 5, 1.6, 2.4, B.copperDk);
      w.box(KX - 1, G + 2, KZ - 1, KX + 1, G + 2, KZ + 1, B.iron);
      const brew = w.prop({ name: 'brew', pivot: [KX + 0.5, G + 3.5, KZ + 0.5] });
      for (const [dx, dz] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) brew.set(KX + dx, G + 3, KZ + dz, B.brew); brew.set(KX, G + 4, KZ, B.potG); brew.set(KX - 1, G + 4, KZ, B.potY); brew.set(KX + 1, G + 4, KZ, B.potP);
      w.box(KX + 3, G + 1, KZ - 2, KX + 3, G + 9, KZ - 2, B.copperDk); w.box(KX - 1, G + 9, KZ - 2, KX + 3, G + 9, KZ - 2, B.copperDk); w.set(KX, G + 9, KZ - 2, B.patina);
      lights.push({ name: 'cauldron', p: [KX + 0.5, G + 4, KZ + 0.5], c: '#9aff6a', i: 1.3, d: 14, flicker: 0.3 });
      acts.push({
        name: '조제 연기', hint: '화덕 위 가마솥이 부글부글 끓어오르며 초록·보라 연기를 뿜어요', hit: [KX - 2, G + 1, KZ - 2, KX + 2, G + 5, KZ + 2],
        run: async a => {
          a.flash('cauldron', 4, 4.5);
          for (let k = 0; k < 6; k++) {
            await a.move('brew', [0, 3.2, 0], 0.3);
            a.burst([KX + 0.5, G + 6, KZ + 0.5], { n: 20, colors: k % 2 ? ['#d890ff', '#f0c8ff'] : ['#9aff6a', '#c8ffa0'], speed: 1.5, up: 4, life: 1.8, gravity: -0.8, spread: 1 });
            await a.move('brew', [0, 1.2, 0], 0.3);
          }
          await a.move('brew', [0, 0, 0], 0.4);
        },
      });
      // 증류기(조제대 위 플라스크와 관)
      const SX = CX0 + 3;
      w.box(SX, G + 1, Z0 + 1, SX + 5, G + 1, Z0 + 2, B.desk); w.box(SX, G + 2, Z0 + 1, SX + 5, G + 2, Z0 + 2, B.plank);
      w.set(SX + 1, G + 3, Z0 + 1, B.fire); w.box(SX + 1, G + 4, Z0 + 1, SX + 1, G + 5, Z0 + 1, B.glass); w.set(SX + 1, G + 4, Z0 + 2, B.potB);
      w.line(SX + 1, G + 6, Z0 + 1, SX + 4, G + 4, Z0 + 1, B.copper); w.box(SX + 4, G + 3, Z0 + 2, SX + 4, G + 3, Z0 + 2, B.glass); w.set(SX + 4, G + 3, Z0 + 1, B.potB);
      // 약재 서랍장(동쪽 벽 위쪽, 북쪽 구석부터)
      const DXc = X1;
      for (let z = Z0 + 9; z <= Z0 + 15; z++) for (let y = G + 1; y <= G + 6; y++) w.set(DXc, y, z, (z + y) % 2 ? B.drawer : B.plank);
      for (let z = Z0 + 9; z <= Z0 + 15; z++) for (let y = G + 1; y <= G + 6; y++) if ((z + y) % 2) w.set(DXc - 1, y, z, 0);
      for (let z = Z0 + 9; z <= Z0 + 15; z++) w.set(DXc, G + 7, z, B.frame);
      const drw = w.prop({ name: 'herbdrawer', pivot: [DXc - 0.5, G + 4, Z0 + 12.5] });
      drw.box(DXc - 2, G + 4, Z0 + 12, DXc - 1, G + 4, Z0 + 13, B.drawer); drw.set(DXc - 2, G + 4, Z0 + 12, B.knob); drw.set(DXc - 1, G + 5, Z0 + 12, B.herb); drw.set(DXc - 1, G + 5, Z0 + 13, B.herbD);
      acts.push({
        name: '약재 서랍', hint: '약재 서랍 하나가 쑥 빠져나오며 말린 약초 가루가 흩날려요', hit: [DXc - 3, G + 1, Z0 + 9, DXc, G + 7, Z0 + 15],
        run: async a => {
          await a.move('herbdrawer', [-2.5, 0, 0], 0.6);
          for (let k = 0; k < 4; k++) { a.burst([DXc - 3, G + 5.5, Z0 + 13], { n: 16, colors: ['#6aa040', '#c8b060', '#8a8a3a'], speed: 2, up: 2, life: 1.4, gravity: 0.6, spread: 0.8 }); await a.wait(0.35); }
          await a.move('herbdrawer', [0, 0, 0], 0.6);
        },
      });

      // ── 2층 재료 창고(남동쪽): 마루, 난간, 나무 계단(남쪽 벽을 따라) ──
      const LX0 = X0 + 14, LZ0 = Z0 + 14, HZ0 = LZ0 + 6;
      for (let z = LZ0; z <= Z1; z++) for (let x = LX0; x <= X1; x++) { w.set(x, LH, z, B.board); }
      for (const [x, z] of [[LX0, LZ0], [X1, LZ0], [LX0, Z1 - 3]]) w.box(x, G + 1, z, x, LH - 1, z, B.frame);
      for (let x = LX0; x <= X1; x++) w.set(x, LH + 1, LZ0, x % 3 ? B.plank : B.frame);
      for (let z = LZ0; z <= Z1 - 3; z++) w.set(LX0, LH + 1, z, z % 3 ? B.plank : B.frame);
      for (let k = 0; k < 7; k++) { const x = LX0 - 7 + k; w.box(x, G + 1, Z1 - 1, x, G + 1 + k, Z1, B.board); }     // 계단: 높이 1~7
      // 계단 아래·창고 아래 통과 높이 확인용으로 비워 두고, 창고 아래에 술통·자루
      for (const [x, z] of [[LX0 + 2, LZ0 + 3], [LX0 + 4, LZ0 + 3], [X1 - 1, LZ0 + 6]]) { w.box(x, G + 1, z, x, G + 3, z, B.plank); w.set(x, G + 2, z, B.iron); }
      for (const [x, z] of [[X1 - 2, Z1 - 2], [X1 - 1, Z1 - 4]]) w.box(x, G + 1, z, x, G + 2, z, B.sack);
      // 창고 위: 상자, 자루, 말리는 약초 다발(위 들보에 매달림), 등
      for (const [x, z, h] of [[X1 - 1, Z1 - 1, 2], [X1 - 3, Z1 - 1, 1], [X1 - 1, Z1 - 3, 1]]) w.box(x, LH + 1, z, x, LH + h, z, B.crate);
      for (const [x, z] of [[LX0 + 3, Z1 - 1], [LX0 + 4, Z1 - 1], [X1 - 1, LZ0 + 3]]) w.set(x, LH + 1, z, B.sack);
      for (const z of [LZ0 + 2, Z1 - 2]) w.box(X1, LH + 1, z, X1, LH + 5, z, B.frame);                       // 동쪽 벽 약초 건조대
      w.box(X1, LH + 5, LZ0 + 2, X1, LH + 5, Z1 - 2, B.frame);
      for (let z = LZ0 + 3; z <= Z1 - 3; z++) { w.set(X1, LH + 4, z, B.rope); w.set(X1, LH + 3, z, z % 2 ? B.herb : B.herbD); if (z % 3 === 0) w.set(X1, LH + 2, z, B.herbD); }
      w.box(LX0, LH + 1, HZ0, LX0, LH + 5, HZ0, B.frame);
      w.set(X1 - 3, LH + 1, LZ0 + 2, B.desk); w.set(X1 - 3, LH + 2, LZ0 + 2, B.lamp);
      lights.push({ name: 'loft', p: [X1 - 2.5, LH + 2.5, LZ0 + 2.5], c: '#b8ff9a', i: 0.8, d: 11, flicker: 0.15 });
      // 도르래: 창고 들보 끝에서 자루를 끌어올린다
      const HX = LX0 - 2, HZ = LZ0 + 6;
      w.box(LX0 - 3, LH + 6, HZ, LX0, LH + 6, HZ, B.frame); w.set(HX, LH + 5, HZ, B.iron); w.set(LX0, LH + 6, HZ, B.frame);
      const sack = w.prop({ name: 'sack', pivot: [HX + 0.5, G + 2, HZ + 0.5] });
      sack.box(HX, G + 1, HZ, HX, G + 2, HZ, B.sack); sack.set(HX, G + 3, HZ, B.rope); sack.box(HX, G + 4, HZ, HX, LH + 4, HZ, B.rope); sack.set(HX, G + 2, HZ + 1, B.herb);
      acts.push({
        name: '재료 끌어올리기', hint: '도르래가 약초 자루를 2층 재료 창고로 끌어올렸다가 다시 내려놓아요', hit: [HX - 1, G + 1, HZ - 1, HX + 1, G + 4, HZ + 1],
        run: async a => {
          await a.move('sack', [0, 6, 0], 1.6);
          await a.move('sack', [2, 7.2, 0], 0.7);
          a.burst([HX + 2.5, LH + 2, HZ + 0.5], { n: 14, colors: ['#6aa040', '#b8a070'], speed: 2, up: 1, life: 1, gravity: 2, spread: 0.6 });
          await a.wait(0.6);
          await a.move('sack', [0, 6, 0], 0.7); await a.move('sack', [0, 0, 0], 1.4);
        },
      });

      lights.push({ name: 'table', p: [X0 + 6.5, G + 5, Z1 - 5.5], c: '#ffe060', i: 0.8, d: 10, flicker: 0.12 });
      lights.push({ p: [X0 + 10.5, G + 11, Z0 + 0.5], c: '#c8ff8a', i: 0.7, d: 14, flicker: 0.04, night: true });
      landmarks.push({ name: '조제실 가마솥', note: '화덕 위에서 끓는 물약', p: [KX + 0.5, G + 12, KZ + 0.5] });
      landmarks.push({ name: '재료 창고', note: '약초 다발 · 도르래', p: [X1 - 4.5, LH + 10, Z1 - 4.5] });
      return { lights, landmarks, acts };
    },
  });
})();
