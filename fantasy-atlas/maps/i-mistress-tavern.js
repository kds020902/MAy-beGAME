// 풍요의 여주인 1층(하위 지도) — 서쪽 큰길 술집 안. 바깥 지도(o-mistress.js)에서 지붕을 들어 올리면 보이던 1층을 그대로 옮겨 키웠다:
// 북쪽 벽 술병 선반과 긴 바 카운터, 둥근 탁자와 술통 걸상, 북동쪽 주방 화덕, 남서쪽 술통, 북서쪽 계단 위 미아의 사무실. 남·동쪽 벽은 잘라 낮췄다 (오라리오)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 84, D = 64, Hh = 40, G = 12;
  MAPS.push({
    id: 'mistress-tavern', cat: 'orario', sub: true, parent: 'mistress', name: '풍요의 여주인 1층', en: 'The Hostess of Fertility · Tavern Floor', color: '#c8884a', seed: 11021, base: G, time: 'day', size: [W, D, Hh],
    spawn: [32, G + 1, 40],
    desc: '조각 문틀 여닫이문 안쪽, 따뜻한 나무 술집. 북쪽 벽 가득 술병 선반 앞으로 긴 바 카운터가 뻗어 있고, 둥근 탁자마다 술통 걸상이 놓였다. 북동쪽 주방에서는 화덕이 쉬지 않고 타오르고, 계단 위 작은 사무실에서는 주인 미아가 장부를 넘기며 가게를 내려다본다.',
    info: { title: '장소 정보', en: 'HOSTESS OF FERTILITY', rows: [['1층', '바 카운터 · 둥근 탁자 · 주방'], ['계단 위', '미아의 사무실'], ['규칙', '행패 부린 손님은 길바닥으로']] },
    sky: ['#f0dcc0', '#b08a68', '#ffecd0'], stars: false,
    hemi: ['#fff0dc', '#5a4434', 0.64], sun: ['#ffecd0', 0.6, [0.45, 1, 0.6]],
    night: { sky: ['#3a2a24', '#120c0a', '#d8884a'], stars: false, hemi: ['#e0b890', '#1a120e', 0.46], sun: ['#ffc890', 0.3, [0.45, 1, 0.6]], haze: '#2c2018' },
    liquid: ['#5a7a8a', '#8aa8b8', '#e0f0f8'], liqSpeed: 0.3,
    fog: { start: 0.9, floor: G - 6, depth: 6, haze: [8, 0.12, 6], hazeColor: '#e0d0bc' },
    camY: -7, zoom: 1.25,
    particles: [
      { n: 80, colors: ['#fff0d0', '#ffffff', '#ffe0b0'], mode: 'drift', speed: 0.12, wind: 0.08, area: [42, 30, 24], y0: G + 2, y1: G + 12, glow: true },
      { n: 30, colors: ['#e8e4dc', '#d0ccc4'], mode: 'rise', speed: 0.35, area: [60.5, 15, 1.2], y0: G + 4, y1: G + 18, glow: false, size: 2 },
    ],
    blocks: Object.assign(OR.blocks(), {
      beam: { c: '#4a3426', v: 0.04 }, carve: { c: '#6a4a30', v: 0.08, pat: 'stone' }, carve2: { c: '#8a6844', v: 0.06 }, plasterT: { c: '#f2ead8', v: 0.03 },
      glassB: { c: '#ffd890', night: true, day: '#4a6a9a' }, plank: { c: '#7a5a3a', top: '#9a7448', v: 0.05, pat: 'plank' }, stoneF: { c: '#8a8478', v: 0.05, pat: 'brick' },
      bottleG: { c: '#4a9a5a', v: 0.03 }, bottleR: { c: '#a83a3a', v: 0.03 }, bottleA: { c: '#d89a3a', v: 0.03 }, barrel: { c: '#7a5232', v: 0.05, pat: 'log' }, barrelE: { c: '#a8784a', v: 0.05 },
      fire: { c: '#ffb050', glow: true }, fireR: { c: '#ff7a2a', glow: true }, plant: { c: '#4a8a3a', v: 0.08 }, apple: { c: '#d8403a', v: 0.05 }, orange: { c: '#f0a030', v: 0.05 },
      linen: { c: '#f4f0e6', v: 0.02 }, mug: { c: '#d8c8a0', v: 0.03 }, foam: { c: '#fffaf0', v: 0.01 }, plate: { c: '#ffffff', v: 0.01 }, food: { c: '#c8742a', v: 0.06 }, foodG: { c: '#6aa04a', v: 0.06 },
      candle: { c: '#fff0c0', glow: true }, lantern: { c: '#ffd890', glow: true }, sack: { c: '#c8b088', v: 0.07 }, pan: { c: '#2e2e34', v: 0.03 }, ledger: { c: '#8a3a2a', v: 0.04 }, paper: { c: '#f0e8d4', v: 0.02 },
      basket: { c: '#b88a4a', v: 0.07, pat: 'plank' }, lunch: { c: '#b06ad8', glow: true }, copper: { c: '#c87a48', v: 0.04 }, rugT: { c: '#8a3a2a', v: 0.05, pat: 'check', alt: '#7a3224' },
    }),
    build(w) {
      const B = w.id;
      const X0 = 16, X1 = 68, Z0 = 12, Z1 = 46, CXm = 42, F1 = G + 8, TOP = G + 15;     // 바깥 지도 술집 본채(x 70~122, z 58~92)를 x -54, z -46 옮긴 자리
      const DX0 = 30, DX1 = 35, KX = X1 - 8;
      const S = (x, y, z, b) => w.set(x, y, z, b);
      MH.terrain(w, { floor: G - 6, height: () => G, surface: () => B.pave, under: (x, z, y, dep) => dep < 2 ? B.soil : B.rock });
      const lights = [], acts = [], landmarks = [];

      // ── 바깥: 문 앞 디딤돌과 돌마당 ──
      for (let z = Z1 + 1; z < D; z++) for (let x = 0; x < W; x++) S(x, G, z, z >= Z1 + 6 ? ((x * 3 + z) % 11 === 0 ? B.paveL : B.brick) : (((x >> 2) + (z >> 2)) & 1 ? B.paveL : B.pave));
      w.box(DX0 - 2, G, Z1 + 1, DX1 + 2, G, Z1 + 2, B.stoneF);
      for (const x of [X0 - 3, X1 + 3]) OR.lamp(w, B, x, Z1 + 3, 5);

      // ── 바닥: 판자, 문 앞 깔개 ──
      for (let z = Z0 + 1; z < Z1; z++) for (let x = X0 + 1; x < X1; x++) S(x, G, z, B.plank);
      for (let z = Z1 - 4; z < Z1; z++) for (let x = DX0; x <= DX1; x++) S(x, G, z, B.rugT);

      // ── 벽: 북·서쪽은 2층 창까지(돌 받침, 목골과 회반죽, 푸른 유리창), 남·동쪽은 낮게 ──
      for (let y = G + 1; y <= TOP; y++) {
        for (let x = X0; x <= X1; x++) {
          const post = (x - X0) % 8 === 0 || x === X1;
          let b = y <= G + 1 ? B.stoneF : (post || y === F1 || y === TOP ? B.beam : B.plasterT);
          if (!post && y >= F1 + 3 && y <= F1 + 5 && (x - X0) % 8 >= 2 && (x - X0) % 8 <= 6) b = B.glassB;
          S(x, y, Z0, b);
        }
        for (let z = Z0; z <= Z1; z++) {
          const post = (z - Z0) % 8 === 0 || z === Z1;
          let b = y <= G + 1 ? B.stoneF : (post || y === F1 || y === TOP ? B.beam : B.plasterT);
          if (!post && (((y >= G + 3 && y <= G + 6) && z > 32) || (y >= F1 + 3 && y <= F1 + 5)) && (z - Z0) % 8 >= 3 && (z - Z0) % 8 <= 5) b = B.glassB;
          S(X0, y, z, b);
        }
      }
      for (let y = G + 1; y <= G + 3; y++) {
        for (let x = X0; x <= X1; x++) { const post = (x - X0) % 8 === 0 || x === X1; S(x, y, Z1, y === G + 1 ? B.stoneF : (post || y === G + 3 ? B.beam : B.glassB)); }
        for (let z = Z0; z <= Z1; z++) { const post = (z - Z0) % 8 === 0 || z === Z1; S(X1, y, z, y === G + 1 ? B.stoneF : (post || y === G + 3 ? B.beam : B.plasterT)); }
      }
      // 조각 문틀의 여닫이문(닫힌 문짝)과 문 위 띠
      for (let x = DX0 - 1; x <= DX1 + 1; x++) for (let y = G + 1; y <= G + 7; y++) S(x, y, Z1, (x === DX0 - 1 || x === DX1 + 1 || y === G + 7) ? B.carve : (y === G + 4 || y === G + 1 ? B.carve2 : B.door));
      S((DX0 + DX1) >> 1, G + 3, Z1, B.gold); S(((DX0 + DX1) >> 1) + 1, G + 3, Z1, B.gold);
      acts.push(OR.goAct({ at: [(DX0 + DX1) >> 1, G + 1, Z1 - 1], name: '밖으로 나가기', goto: 'mistress', hint: '조각 문틀 여닫이문을 밀고 서쪽 큰길 돌마당으로 나가요', hit: [DX0, G + 1, Z1 - 1, DX1, G + 6, Z1] }));
      // 벽 등불
      for (const [x, z] of [[X0 + 1, 28], [X0 + 1, 40]]) { S(x, G + 5, z, B.iron); S(x, G + 6, z, B.lantern); }
      lights.push({ name: 'tavern', p: [CXm + 0.5, G + 6, 34.5], c: '#ffd090', i: 0.5, d: 34, flicker: 0.15, srcR: 30 });
      lights.push({ name: 'lanterns', p: [X0 + 1.5, G + 6, 34.5], c: '#ffd890', i: 0.35, d: 20, flicker: 0.15, srcR: 7 });

      // ── 바 카운터와 술병 선반(북쪽 벽), 술통 꼭지, 걸상 ──
      const CB0 = X0 + 10, CB1 = X1 - 18, CZ = Z0 + 6;
      w.box(CB0, G + 1, CZ, CB1, G + 3, CZ + 1, B.carve2); w.box(CB0 - 1, G + 4, CZ, CB1 + 1, G + 4, CZ + 1, B.beam);
      for (let x = CB0; x <= CB1; x += 4) w.box(x, G + 1, CZ + 1, x, G + 3, CZ + 1, B.carve);
      for (let x = CB0 + 1; x <= CB1; x += 3) { S(x, G + 1, CZ + 3, B.barrel); S(x, G + 2, CZ + 3, B.carve2); }
      for (let x = CB0; x <= X1 - 16; x++) for (let y = G + 2; y <= G + 7; y += 2) { S(x, y, Z0 + 1, B.beam); if (y < G + 7) S(x, y + 1, Z0 + 1, [B.bottleG, B.bottleR, B.bottleA, 0][(x * 7 + y) % 4]); }
      for (const x of [CB0 + 4, CB0 + 9]) { w.box(x, G + 1, Z0 + 2, x + 1, G + 2, Z0 + 3, B.barrel); S(x, G + 3, Z0 + 2, B.barrelE); S(x + 1, G + 3, Z0 + 2, B.iron); }
      for (let x = CB0 + 14; x <= CB1 - 7; x += 3) { S(x, G + 5, CZ, B.mug); S(x + 1, G + 5, CZ + 1, B.plate); }
      for (const x of [CB0 + 2, CB1 - 1]) S(x, G + 5, CZ + 1, B.candle);
      lights.push({ name: 'bar', p: [(CB0 + CB1) / 2 + 0.5, G + 6, CZ + 1.5], c: '#ffc878', i: 0.5, d: 22, flicker: 0.2, srcR: 14 });
      const bell = w.prop({ name: 'bell', pivot: [CB1 - 3.5, G + 5, CZ + 0.5], axis: 'z' }); bell.set(CB1 - 4, G + 5, CZ, B.gold); bell.set(CB1 - 4, G + 6, CZ, B.gold);
      const mugS = w.prop({ name: 'slideMug', pivot: [CB0 + 5.5, G + 5, CZ + 1.5] }); mugS.box(CB0 + 5, G + 5, CZ + 1, CB0 + 5, G + 6, CZ + 1, B.mug); mugS.set(CB0 + 5, G + 7, CZ + 1, B.foam);
      acts.push({
        name: '주문하기', hint: '카운터 종을 땡 치면 술통 꼭지에서 갓 따른 맥주잔이 카운터를 미끄러져 와요', hit: [CB1 - 6, G + 3, CZ, CB1 - 2, G + 7, CZ + 1],
        run: async a => {
          for (let k = 0; k < 3; k++) { await a.turn('bell', [0, 0, 0.6], 0.12); await a.turn('bell', [0, 0, -0.6], 0.12); }
          a.turn('bell', [0, 0, 0], 0.1);
          a.burst([CB1 - 3.5, G + 7, CZ + 0.5], { n: 14, colors: ['#ffe9a0', '#ffffff'], speed: 2.4, up: 1, life: 0.8, gravity: 0, spread: 0.6, flat: true });
          a.burst([CB0 + 5.5, G + 8, CZ + 1.5], { n: 14, colors: ['#fffaf0', '#f0d080'], speed: 1, up: 2, life: 1, gravity: 2, spread: 0.6 });
          await a.move('slideMug', [CB1 - CB0 - 12, 0, 0], 1.6);
          a.burst([CB1 - 6.5, G + 7, CZ + 1.5], { n: 12, colors: ['#fffaf0', '#f0d080'], speed: 1.4, up: 2, life: 0.8, gravity: 3, spread: 0.6 });
          await a.wait(1); await a.respawn('slideMug', 0.8);
        },
      });

      // ── 둥근 탁자와 술통 걸상 ──
      const tables = [];
      for (const [tx, tz] of [[24, 31], [24, 39], [41, 28], [41, 35], [41, 42], [49, 31], [49, 39], [58, 30], [58, 37], [58, 43]]) {
        w.box(tx, G + 1, tz, tx, G + 2, tz, B.beam); w.cyl(tx, tz, G + 3, G + 3, 1.6, B.carve2);
        for (const [sx, sz] of [[-2, 0], [2, 0], [0, -2], [0, 2]]) S(tx + sx, G + 1, tz + sz, B.barrel);
        tables.push([tx, tz]);
      }
      tables.forEach(([tx, tz], k) => { if (k === 6 || k === 3) return; S(tx, G + 4, tz, B.candle); if (k % 2) { S(tx - 1, G + 4, tz, B.mug); S(tx + 1, G + 4, tz, B.plate); } else { S(tx, G + 4, tz + 1, B.plate); S(tx, G + 4, tz - 1, B.mug); } });
      // 건배: 탁자 하나의 두 맥주잔이 떠올라 부딪힌다
      const [CTX, CTZ] = tables[6];
      const mA = w.prop({ name: 'mugA', pivot: [CTX - 0.5, G + 4, CTZ + 0.5] }), mB = w.prop({ name: 'mugB', pivot: [CTX + 1.5, G + 4, CTZ + 0.5] });
      mA.box(CTX - 1, G + 4, CTZ, CTX - 1, G + 5, CTZ, B.mug); mA.set(CTX - 1, G + 6, CTZ, B.foam); mB.box(CTX + 1, G + 4, CTZ, CTX + 1, G + 5, CTZ, B.mug); mB.set(CTX + 1, G + 6, CTZ, B.foam);
      S(CTX, G + 4, CTZ - 1, B.food); S(CTX, G + 4, CTZ + 1, B.plate);
      acts.push({
        name: '건배', hint: '둥근 탁자의 맥주잔 둘이 높이 들려 쨍 하고 부딪히며 거품이 사방으로 튀어요', hit: [CTX - 2, G + 3, CTZ - 1, CTX + 2, G + 7, CTZ + 1],
        run: async a => {
          await Promise.all([a.tween('mugA', { off: [0.6, 3, 0], rot: [0, 0, -0.5] }, 0.5), a.tween('mugB', { off: [-0.6, 3, 0], rot: [0, 0, 0.5] }, 0.5)]);
          for (let k = 0; k < 3; k++) { a.burst([CTX + 0.5, G + 9, CTZ + 0.5], { n: 22, colors: ['#fffaf0', '#f0d080', '#ffffff'], speed: 2.4, up: 3, life: 1, gravity: 6, spread: 0.8 }); await a.wait(0.25); }
          await Promise.all([a.tween('mugA', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.5), a.tween('mugB', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.5)]);
        },
      });
      // 류 서빙: 쟁반이 탁자 사이를 날쌔게 누빈다
      const TRX = CB1 + 1, TRZ = CZ + 3;
      const tray = w.prop({ name: 'tray', pivot: [TRX + 0.5, G + 5, TRZ + 0.5] });
      tray.box(TRX - 1, G + 5, TRZ - 1, TRX + 1, G + 5, TRZ + 1, B.copper); tray.set(TRX - 1, G + 6, TRZ, B.food); tray.set(TRX + 1, G + 6, TRZ, B.mug); tray.set(TRX, G + 6, TRZ + 1, B.foodG);
      w.box(TRX, G + 1, TRZ, TRX, G + 4, TRZ, B.beam);
      const route = [[49, 31], [41, 35], [24, 39], [24, 31], [41, 28]];
      acts.push({
        name: '류 서빙', hint: '쟁반이 바람처럼 탁자 사이를 누비며 요리를 나르고, 지나간 자리마다 하얀 바람이 일어요', hit: [TRX - 1, G + 4, TRZ - 1, TRX + 1, G + 6, TRZ + 1],
        run: async a => {
          const pts = route.map(([x, z]) => [x - TRX, 0.5, z - 3 - TRZ]);
          const go = a.path('tray', [...pts, [0, 0, 0]], 3.2);
          for (const [x, z] of route) { await a.wait(0.55); a.burst([x + 0.5, G + 6, z - 2.5], { n: 12, colors: ['#ffffff', '#e8f4ff', '#c8e8d8'], speed: 2.4, up: 1, life: 0.6, gravity: 0, spread: 1, flat: true }); }
          await go;
        },
      });
      // 의자 날리기: 문 옆 걸상이 데굴데굴 굴러 닫힌 문에 쾅
      const chair = w.prop({ name: 'chair', pivot: [DX0 + 8.5, G + 2, Z1 - 5.5] });
      chair.box(DX0 + 8, G + 1, Z1 - 6, DX0 + 9, G + 1, Z1 - 5, B.carve2); chair.box(DX0 + 8, G + 2, Z1 - 6, DX0 + 9, G + 3, Z1 - 6, B.carve2);
      acts.push({
        name: '의자 날리기', hint: '행패 부린 손님 대신 걸상 하나가 공중제비를 돌며 날아가 여닫이문에 쾅 부딪혀요', hit: [DX0 + 7, G + 1, Z1 - 7, DX0 + 10, G + 4, Z1 - 4],
        run: async a => {
          await a.tween('chair', { off: [-2, 4, 1.5], rot: [0, 0, 1.6] }, 0.35);
          await a.tween('chair', { off: [-5, 2, 3.5], rot: [0, 0, 3.4] }, 0.3);
          a.burst([DX0 + 3.5, G + 3, Z1 - 1], { n: 22, colors: ['#c8a878', '#ffffff', '#8a6844'], speed: 3, up: 2, life: 0.7, gravity: 6, spread: 1, flat: true });
          await a.tween('chair', { off: [-4, 0, 1], rot: [0, 0.6, 4.7] }, 0.4);
          await a.wait(1); await a.respawn('chair', 0.9);
        },
      });

      // ── 주방(북동쪽): 칸막이와 문, 화덕과 굴뚝, 조리대, 내주는 창구, 시르의 도시락 바구니 ──
      const PX = X1 - 15;
      w.box(PX, G + 1, Z0 + 1, PX, G + 7, Z0 + 12, B.plasterT); w.box(PX, G + 8, Z0 + 1, PX, G + 8, Z0 + 12, B.beam); w.box(PX, G + 1, Z0 + 8, PX, G + 5, Z0 + 10, 0);
      w.box(PX + 1, G + 1, Z0 + 13, X1 - 7, G + 2, Z0 + 13, B.carve2); w.box(PX + 1, G + 3, Z0 + 13, X1 - 7, G + 3, Z0 + 13, B.beam);
      w.box(KX - 2, G + 1, Z0 + 1, KX + 2, G + 3, Z0 + 3, B.stoneF); w.box(KX - 1, G + 2, Z0 + 3, KX + 1, G + 2, Z0 + 3, B.fire); S(KX, G + 2, Z0 + 2, B.fireR);
      w.box(KX - 1, G + 4, Z0 + 1, KX + 1, TOP + 4, Z0 + 2, B.chimney);
      S(KX, G + 4, Z0 + 3, B.copper); S(KX - 1, G + 4, Z0 + 3, B.copper);
      lights.push({ name: 'kitchen', p: [KX + 0.5, G + 4, Z0 + 4.5], c: '#ffa850', i: 0.6, d: 18, flicker: 0.4, srcR: 4 });
      w.box(X1 - 3, G + 1, Z0 + 2, X1 - 1, G + 2, Z0 + 9, B.plank); w.box(X1 - 3, G + 3, Z0 + 2, X1 - 1, G + 3, Z0 + 9, B.carve2);
      S(X1 - 2, G + 4, Z0 + 3, B.apple); S(X1 - 2, G + 4, Z0 + 4, B.orange); S(X1 - 1, G + 4, Z0 + 6, B.food); S(X1 - 2, G + 4, Z0 + 8, B.foodG);
      for (const [x, z] of [[PX + 2, Z0 + 2], [PX + 2, Z0 + 4], [PX + 3, Z0 + 2]]) w.box(x, G + 1, z, x, G + 2, z, B.sack);
      for (let x = PX + 1; x <= X1 - 4; x += 2) { if (Math.abs(x - KX) < 3) continue; S(x, G + 6, Z0 + 1, B.iron); S(x, G + 5, Z0 + 1, x % 4 ? B.copper : B.pan); }
      const LBX = X1 - 2, LBZ = Z0 + 7;
      S(LBX, G + 4, LBZ, B.basket); S(LBX - 1, G + 4, LBZ, B.basket); S(LBX, G + 5, LBZ, B.lunch);
      const lidP = w.prop({ name: 'lunchLid', pivot: [LBX - 1, G + 6, LBZ + 0.5], axis: 'z' }); lidP.box(LBX - 1, G + 6, LBZ, LBX, G + 6, LBZ, B.basket);
      acts.push({
        name: '시르 도시락', hint: '조리대 위 시르의 도시락 바구니 뚜껑이 열리자 수상한 보랏빛 김이 피어올라요', hit: [LBX - 1, G + 3, LBZ - 1, LBX + 1, G + 7, LBZ + 1],
        run: async a => {
          await a.turn('lunchLid', [0, 0, 1.6], 0.6);
          for (let k = 0; k < 8; k++) { a.burst([LBX + 0.5, G + 7, LBZ + 0.5], { n: 12, colors: ['#b06ad8', '#e0b0ff', '#8a4ab8', '#ffffff'], speed: 0.8, up: 2.6, life: 1.6, gravity: -0.3, spread: 0.8 }); await a.wait(0.25); }
          await a.turn('lunchLid', [0, 0, 0], 0.5);
        },
      });
      acts.push({
        name: '주방 화덕', hint: '주방 화덕에 불이 확 붙으며 냄비가 보글보글 끓고 굴뚝으로 연기가 피어올라요', hit: [KX - 2, G + 1, Z0 + 1, KX + 2, G + 4, Z0 + 4],
        run: async a => { a.flash('kitchen', 5, 4); for (let k = 0; k < 10; k++) { a.burst([KX + 0.5, G + 5, Z0 + 3.5], { n: 10, colors: ['#ffffff', '#e8e4dc'], speed: 0.5, up: 3, life: 1.6, gravity: -0.4, spread: 0.6 }); a.burst([KX + 0.5, TOP + 5, Z0 + 2], { n: 8, colors: ['#e8e4dc', '#d0ccc4'], speed: 0.6, up: 3, life: 2.2, gravity: -0.3, spread: 0.8 }); await a.wait(0.3); } },
      });

      // ── 계단과 미아의 사무실(북서쪽 위): 장부 책상, 돈 상자, 큰 프라이팬 ──
      const OX1 = X0 + 9, OZ1 = Z0 + 12;
      w.box(X0 + 1, F1, Z0 + 1, OX1, F1, OZ1, B.plank);
      for (const [x, z] of [[OX1, OZ1], [X0 + 4, OZ1]]) w.box(x, G + 1, z, x, F1 - 1, z, B.beam);
      for (let x = X0 + 4; x <= OX1; x++) { S(x, F1 + 1, OZ1, x % 2 ? B.beam : 0); S(x, F1 + 2, OZ1, B.beam); }
      for (let z = Z0 + 1; z <= OZ1; z++) { S(OX1, F1 + 1, z, z % 2 ? B.beam : 0); S(OX1, F1 + 2, z, B.beam); }
      for (let k = 0; k < 8; k++) { const z = OZ1 + 8 - k; w.box(X0 + 1, G + 1, z, X0 + 3, G + 1 + k, z, B.plank); if (k % 2 === 0) w.box(X0 + 4, G + 2 + k, z, X0 + 4, G + 3 + k, z, B.beam); S(X0 + 4, G + 1 + k, z, B.carve2); }
      for (const [x, z] of [[X0 + 5, Z0 + 2], [X0 + 6, Z0 + 2], [X0 + 5, Z0 + 4], [X0 + 7, Z0 + 3]]) w.box(x, G + 1, z, x, G + 2, z, B.barrel);
      for (const [x, z] of [[X0 + 2, Z0 + 6], [X0 + 2, Z0 + 8], [X0 + 3, Z0 + 7]]) w.box(x, G + 1, z, x, G + 1 + ((x + z) & 1), z, B.sack);
      w.box(X0 + 3, F1 + 1, Z0 + 2, X0 + 6, F1 + 2, Z0 + 3, B.carve2); S(X0 + 4, F1 + 3, Z0 + 2, B.ledger); S(X0 + 5, F1 + 3, Z0 + 3, B.paper); S(X0 + 3, F1 + 3, Z0 + 2, B.candle);
      S(X0 + 4, F1 + 1, Z0 + 5, B.carve); S(X0 + 4, F1 + 2, Z0 + 5, B.carve);
      w.box(X0 + 1, F1 + 1, Z0 + 8, X0 + 2, F1 + 2, Z0 + 9, B.barrel); S(X0 + 1, F1 + 3, Z0 + 8, B.gold); S(X0 + 2, F1 + 3, Z0 + 9, B.gold);
      lights.push({ name: 'office', p: [X0 + 3.5, F1 + 4, Z0 + 2.5], c: '#ffd890', i: 0.4, d: 14, flicker: 0.2, srcR: 2 });
      const pan = w.prop({ name: 'pan', pivot: [X0 + 7.5, F1 + 5, Z0 + 1.5], axis: 'z' });
      pan.box(X0 + 6, F1 + 5, Z0 + 1, X0 + 8, F1 + 7, Z0 + 1, B.pan); pan.box(X0 + 7, F1 + 3, Z0 + 1, X0 + 7, F1 + 4, Z0 + 1, B.beam);
      S(X0 + 7, F1 + 8, Z0 + 1, B.iron);
      acts.push({
        name: '미아 호통', hint: '계단 위 사무실에서 큰 프라이팬이 책상을 쾅 내리치자 술집 전체가 쩌렁 울려 모두 조용해져요', hit: [X0 + 3, F1 + 1, Z0 + 1, X0 + 8, F1 + 7, Z0 + 3],
        run: async a => {
          await a.tween('pan', { off: [-1, 1, 1], rot: [0, 0, 0.8] }, 0.4);
          await a.tween('pan', { off: [-2.5, -2, 1.5], rot: [0, 0, -1.4] }, 0.15);
          a.flash('office', 6, 1.5); a.glow(1.3, 1.5);
          a.burst([X0 + 4.5, F1 + 4, Z0 + 2.5], { n: 30, colors: ['#ffffff', '#ffe9a0', '#f0e8d4'], speed: 6, up: 0.5, life: 0.8, gravity: 0, spread: 0.5, flat: true });
          for (let k = 0; k < 4; k++) { a.burst([X0 + 4.5, F1 + 4 + k, Z0 + 3], { n: 8, colors: ['#f0e8d4', '#ffffff'], speed: 2, up: 3, life: 1.2, gravity: 3, spread: 1 }); await a.wait(0.15); }
          await a.wait(0.8);
          await a.tween('pan', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.6);
        },
      });

      // ── 남서쪽 술통 더미와 화분 ──
      for (const [x, z] of [[X0 + 2, Z1 - 3], [X0 + 2, Z1 - 5], [X0 + 4, Z1 - 3]]) { w.box(x, G + 1, z, x, G + 3, z, B.barrel); S(x, G + 4, z, B.barrelE); }
      for (let x = X0 + 2; x < X1; x += 8) for (const z of [Z1 - 1]) if (hash3(x, 2, z) > 0.3 && Math.abs(x - 32) > 4) { S(x, G + 1, z, B.carve2); S(x, G + 2, z, B.plant); }
      landmarks.push({ name: '바 카운터', note: '술병 선반과 맥주 술통', p: [(CB0 + CB1) / 2, G + 12, CZ] });
      landmarks.push({ name: '미아의 사무실', note: '계단 위', p: [X0 + 5, F1 + 10, Z0 + 6] });
      return { lights, landmarks, acts };
    },
  });
})();
