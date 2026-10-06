// 언덕 위 교회(하위 지도) — 갈매기 항구 언덕 꼭대기의 흰 교회 안. 서쪽 종탑 속 계단과 큰 종, 북쪽 벽의 둥근 색유리 창과 제단,
// 들보에 매단 봉헌 배 모형, 신자석, 뱃사람들의 기도 등불, 세례대, 북서쪽 풍금과 북동쪽 성구실. 남·동쪽 벽은 잘라 낮췄다 (마을)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 72, D = 64, Hh = 48, G = 10;
  const X0 = 18, X1 = 53, Z0 = 22, Z1 = 41;          // 벽(바깥 둘레)
  const HT = G + 14, TT = G + 21;                      // 본당 벽 높이 · 종탑 높이
  MAPS.push({
    id: 'harbor-chapel', cat: 'village', sub: true, parent: 'harbor', name: '언덕 위 교회', en: 'Gull Harbor · Hilltop Chapel', color: '#a8c8dc', seed: 1131, base: G, time: 'day', size: [W, D, Hh],
    spawn: [35, G + 1, 38],
    desc: '항구를 내려다보는 언덕 꼭대기의 흰 교회. 뱃사람들이 무사히 돌아온 배를 본떠 봉헌한 배 모형이 들보에 매달려 있고, 북쪽 벽의 둥근 색유리 창이 제단 위로 바다빛을 뿌린다. 서쪽 종탑 계단을 오르면 안개 낀 날 배들을 부르는 큰 종이 있다.',
    info: { title: '장소 정보', en: 'HILLTOP CHAPEL', rows: [['본당', '신자석 · 제단 · 둥근 색유리 창'], ['종탑', '계단을 올라 큰 종과 종 줄'], ['풍습', '배 모형을 봉헌하고 기도 등불을 켠다']] },
    sky: ['#e8f0f8', '#a8bcd0', '#fff4e4'], stars: false,
    hemi: ['#f8f8ff', '#4a5468', 0.68], sun: ['#fff4e0', 0.6, [-0.4, 1, -0.5]],
    night: { sky: ['#283048', '#0a0c18', '#a88868'], stars: false, hemi: ['#b0b8d0', '#141820', 0.44], sun: ['#d0d8ff', 0.26, [-0.4, 1, -0.5]], haze: '#22283a' },
    fog: { start: 0.9, floor: G - 8, depth: 6, haze: [8, 0.1, 6], hazeColor: '#e4ecf4' },
    camY: -1, zoom: 1.5,
    particles: [
      { n: 100, colors: ['#fff6d8', '#ffffff', '#e8f0ff'], mode: 'drift', speed: 0.08, wind: 0.05, area: [35, 31, 15], y0: G + 2, y1: G + 16, glow: true },
      { n: 30, colors: ['#ff8ab0', '#8ab8ff', '#ffe08a', '#8ae0b0'], mode: 'fall', speed: 0.12, area: [35.5, 27, 4], y0: G + 2, y1: G + 12, glow: true },
    ],
    blocks: {
      grass: { c: '#7a5a3a', top: '#7aa84a', v: 0.08 }, grass2: { c: '#7a5a3a', top: '#8ab85a', v: 0.08 }, dirt: { c: '#7a5a3a', v: 0.08 }, rock: { c: '#6e6e78', v: 0.06, pat: 'stone' },
      cobble: { c: '#8a8680', top: '#a8a49a', v: 0.1, pat: 'stone' }, flower: { c: '#e86a8a', v: 0.05 },
      found: { c: '#8a8680', v: 0.05, pat: 'stone' }, wallW: { c: '#f2eee4', v: 0.03 }, trim: { c: '#3a6a9a', v: 0.04 }, stripeW: { c: '#f4f0e8', v: 0.02 },
      flag: { c: '#a8a49a', top: '#c8c4b8', v: 0.04, pat: 'check', alt: '#9a968c' }, marble: { c: '#e8e4dc', v: 0.03, pat: 'big' }, runner: { c: '#2a4a7a', top: '#3a5a8a', v: 0.04 },
      plank: { c: '#9a6a40', v: 0.08, pat: 'plank' }, pew: { c: '#6a4428', top: '#8a5a34', v: 0.04, pat: 'plank' }, wood: { c: '#5a4030', v: 0.05 }, beam: { c: '#4a3020', v: 0.05, pat: 'log' },
      door: { c: '#3a5a7a', v: 0.03, pat: 'plank' }, win: { c: '#ffd890', night: true, day: '#bfe0f4' }, iron: { c: '#4a4a52', v: 0.03 }, rope: { c: '#c8b890', v: 0.04 },
      bell: { c: '#c8a050', v: 0.05 }, gold: { c: '#e0b048', v: 0.03 }, cloth: { c: '#f8f4ec', v: 0.02 }, clothB: { c: '#3a6a9a', v: 0.03 }, pipe: { c: '#c8ccd4', v: 0.03, pat: 'log' },
      key: { c: '#f4f0e4', v: 0.02, pat: 'check', alt: '#2a2a2e' }, leather: { c: '#7a4a2a', v: 0.04 }, book: { c: '#7a2a2a', v: 0.04 }, book2: { c: '#2a4a6a', v: 0.04 },
      hull: { c: '#7a4a2a', v: 0.06, pat: 'plank' }, hullB: { c: '#2a4a6a', v: 0.04 }, hullR: { c: '#b0503a', v: 0.04 }, sail: { c: '#f0ead8', v: 0.03 }, mast: { c: '#5a3a24', v: 0.04 },
      water: { c: '#6ab0d8', top: '#a8e0f4', v: 0.03 },
      sgR: { c: '#e04a5a', glow: true }, sgB: { c: '#4a7ae8', glow: true }, sgY: { c: '#f0c040', glow: true }, sgG: { c: '#4ac08a', glow: true }, sgW: { c: '#f0f0ff', glow: true },
      candle: { c: '#fff4d8', glow: true }, lampG: { c: '#ffe0a0', glow: true },
    },
    build(w) {
      const B = w.id;
      const lights = [], acts = [], landmarks = [];
      // ── 바깥: 언덕 풀밭과 남쪽 문 앞 자갈길 ──
      MH.terrain(w, { floor: G - 8, height: () => G - 1, surface: (x, z) => hash3(x, 1, z) > 0.55 ? B.grass2 : B.grass, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock });
      for (let z = Z1 + 1; z < D - 2; z++) for (let x = 33; x <= 38; x++) w.set(x, G - 1, z, B.cobble);
      for (let k = 0; k < 50; k++) { const x = (hash3(k, 2, 5) * W) | 0, z = (hash3(k, 3, 5) * D) | 0; if (x >= X0 - 1 && x <= X1 + 1 && z >= Z0 - 1 && z <= Z1 + 1) continue; if (w.get(x, G - 1, z) === B.cobble) continue; w.set(x, G, z, k % 3 ? B.grass2 : B.flower); }

      // ── 바닥과 벽 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) w.set(x, G, z, B.flag);
      for (let z = Z0 + 5; z <= Z1 - 1; z++) for (let x = 35; x <= 36; x++) w.set(x, G, z, B.runner);
      const wallB = (y, u) => y === G + 1 ? B.found : (y === G + 11 ? B.trim : (y === HT ? B.found : B.wallW));
      for (let y = G + 1; y <= HT; y++) {
        for (let x = X0; x <= X1; x++) w.set(x, y, Z0, wallB(y, x));
        for (let z = Z0; z <= Z1; z++) w.set(X0, y, z, wallB(y, z));
      }
      for (let x = X0; x <= X1; x++) { w.set(x, G + 1, Z1, B.found); w.set(x, G + 2, Z1, B.wallW); w.set(x, G + 3, Z1, B.found); }
      for (let z = Z0; z <= Z1; z++) { w.set(X1, G + 1, z, B.found); w.set(X1, G + 2, z, B.wallW); w.set(X1, G + 3, z, B.found); }
      // 낮춘 벽의 벽기둥(바깥 버팀벽 자리)과 들보
      for (const x of [24, 30, 42, 48]) w.box(x, G + 1, Z1, x, G + 4, Z1, B.found);
      for (const z of [27, 32, 37]) w.box(X1, G + 1, z, X1, G + 4, z, B.found);
      // 뾰족 아치 색유리 창(북쪽 벽)과 서쪽 창
      const sg = [B.sgR, B.sgB, B.sgY, B.sgG];
      for (const x0 of [26, 44]) {
        for (let y = G + 4; y <= G + 9; y++) for (let x = x0; x <= x0 + 1; x++) w.set(x, y, Z0, sg[(x + y) % 4]);
        w.set(x0, G + 10, Z0, B.sgW); w.set(x0 + 1, G + 10, Z0, B.sgW);
        w.box(x0 - 1, G + 3, Z0, x0 + 2, G + 3, Z0, B.found);
      }
      for (let y = G + 4; y <= G + 8; y++) for (const z of [Z0 + 2, Z0 + 3]) w.set(X0, y, z, B.win);
      for (let y = G + 4; y <= G + 8; y++) for (const z of [35, 36]) w.set(X0, y, z, B.win);
      // 둥근 색유리 창(제단 위)
      const RX = 35.5, RY = G + 11.5;
      for (let y = G + 8; y <= G + 15; y++) for (let x = 31; x <= 40; x++) {
        const d = Math.hypot(x + 0.5 - RX - 0.5, y + 0.5 - RY - 0.5);
        if (d > 3.4) continue;
        const ang = Math.atan2(y - RY, x - RX), seg = ((ang + Math.PI) / (Math.PI * 2) * 8 + 0.5) | 0;
        w.set(x, y, Z0, d > 2.8 ? B.found : d < 0.9 ? B.sgY : sg[seg % 4]);
      }
      lights.push({ name: 'rose', p: [36, G + 11, Z0 + 2], c: '#ffe8f0', i: 0.5, d: 16, srcR: 3 });

      // ── 남쪽 문 ──
      const DX = 35;
      w.box(DX, G + 1, Z1, DX + 1, G + 4, Z1, 0);
      for (const x of [DX - 1, DX + 2]) w.box(x, G + 1, Z1, x, G + 5, Z1, B.found);
      w.box(DX - 1, G + 5, Z1, DX + 2, G + 5, Z1, B.found); w.box(DX, G + 6, Z1, DX + 1, G + 6, Z1, B.found);
      w.set(DX + 3, G + 4, Z1 + 1, B.lampG); w.set(DX + 3, G + 5, Z1 + 1, B.iron);
      lights.push({ name: 'doorLamp', p: [DX + 3.5, G + 4, Z1 + 1.5], c: '#ffd890', i: 0.8, d: 10, flicker: 0.1, night: true });
      acts.push(OR.goAct({ at: [DX, G + 1, Z1], h: 4, hit: [DX, G + 1, Z1 - 1, DX + 1, G + 4, Z1], name: '밖으로 나가기', goto: 'harbor', hint: '교회 문을 나서 항구가 내려다보이는 언덕으로 나가요' }));

      // ── 제단: 두 단 단상, 흰 천 덮은 제단과 금 촛대 ──
      w.box(30, G + 1, Z0 + 1, 41, G + 1, Z0 + 4, B.marble);
      w.box(32, G + 2, Z0 + 1, 39, G + 2, Z0 + 3, B.marble);
      w.box(34, G + 3, Z0 + 1, 37, G + 3, Z0 + 2, B.marble); w.box(34, G + 4, Z0 + 1, 37, G + 4, Z0 + 2, B.cloth); w.box(34, G + 3, Z0 + 2, 37, G + 3, Z0 + 2, B.clothB);
      for (const x of [33, 38]) { w.box(x, G + 3, Z0 + 2, x, G + 4, Z0 + 2, B.gold); w.set(x, G + 5, Z0 + 2, B.candle); }
      for (const x of [35, 36]) w.set(x, G + 5, Z0 + 1, B.candle);
      w.set(34, G + 5, Z0 + 2, B.book);
      lights.push({ name: 'altar', p: [35.5, G + 6, Z0 + 3], c: '#ffe0a0', i: 0.7, d: 12, flicker: 0.15, srcR: 3 });
      acts.push({
        name: '제단 촛불', hint: '제단의 금 촛대와 초에 차례로 불이 붙으며 따뜻한 빛이 번져요', hit: [32, G + 2, Z0 + 1, 39, G + 6, Z0 + 3],
        run: async a => {
          a.flash('altar', 4, 4); a.glow(1.3, 3.5);
          for (const x of [33, 35, 36, 38, 33, 38]) { a.burst([x + 0.5, G + 5.6, Z0 + 2.5], { n: 14, colors: ['#ffe9a0', '#ffd070', '#ffffff'], speed: 0.8, up: 2, life: 1.2, gravity: -0.6, spread: 0.3 }); await a.wait(0.4); }
        },
      });
      acts.push({
        name: '색유리 햇살', hint: '둥근 색유리 창으로 햇살이 쏟아져 본당 바닥에 무지갯빛 조각이 흩어져요', hit: [31, G + 8, Z0, 40, G + 15, Z0 + 1],
        run: async a => {
          a.flash('rose', 6, 4); a.glow(1.6, 4);
          for (let k = 0; k < 10; k++) {
            const t = k * 0.7;
            a.burst([35.5 + Math.cos(t) * 2, G + 11 - k * 0.6, Z0 + 2 + k * 1.2], { n: 14, colors: ['#ff8ab0', '#8ab8ff', '#ffe08a', '#8ae0b0', '#ffffff'], speed: 0.6, up: -0.6, life: 1.8, gravity: 0.4, spread: 1.4 });
            await a.wait(0.3);
          }
        },
      });

      // ── 신자석(북쪽 제단을 향해 세 줄씩), 세례대 ──
      for (const z of [Z0 + 8, Z0 + 11, Z0 + 14]) for (const [xa, xb] of [[27, 33], [38, 45]]) {
        w.box(xa, G + 1, z, xb, G + 1, z, B.pew); w.box(xa, G + 1, z + 1, xb, G + 2, z + 1, B.wood);
        for (const x of [xa, xb]) w.set(x, G + 2, z, B.wood);
      }
      w.set(29, G + 2, Z0 + 8, B.book2); w.set(41, G + 2, Z0 + 11, B.book);
      const FX = 30, FZ = Z1 - 2;
      w.set(FX, G + 1, FZ, B.found); w.box(FX - 1, G + 2, FZ - 1, FX + 1, G + 2, FZ + 1, B.marble); w.set(FX, G + 2, FZ, B.water);
      acts.push({
        name: '세례대', hint: '세례대의 맑은 물이 찰랑이며 물방울이 반짝이며 튀어 올라요', hit: [FX - 1, G + 1, FZ - 1, FX + 1, G + 3, FZ + 1],
        run: async a => {
          for (let k = 0; k < 7; k++) { a.burst([FX + 0.5, G + 3, FZ + 0.5], { n: 16, colors: ['#a8e0f4', '#ffffff', '#6ab0d8'], speed: 1.6, up: 3, life: 1.1, gravity: 5, spread: 0.4 }); await a.wait(0.4); }
          a.burst([FX + 0.5, G + 4, FZ + 0.5], { n: 24, colors: ['#ffffff', '#e8f4ff'], speed: 1, up: 1.5, life: 1.6, gravity: -0.4, spread: 1 });
        },
      });

      // ── 봉헌 배 모형: 들보에 사슬로 매단 돛배(서쪽은 부품, 동쪽은 고정) ──
      const shipAt = (t, x, z0, y) => {
        for (let z = z0; z <= z0 + 6; z++) { const e = z === z0 || z === z0 + 6; t.set(x, y, z, B.hull); if (!e) { t.set(x, y + 1, z, B.hullR); for (const s of [-1, 1]) t.set(x + s, y + 1, z, B.hullB); } }
        t.set(x, y + 1, z0, B.hull); t.set(x, y + 2, z0 - 1, B.mast);
        for (const z of [z0 + 2, z0 + 4]) { t.box(x, y + 2, z, x, y + 5, z, B.mast); t.box(x, y + 3, z - 1, x, y + 5, z + 1, B.sail); t.set(x, y + 6, z, B.mast); }
        t.set(x, y + 3, z0 + 2, B.mast); t.set(x, y + 3, z0 + 4, B.mast);
      };
      const ship = w.prop({ name: 'ship', pivot: [30.5, G + 15, 31.5] });
      shipAt(ship, 30, 28, G + 5); ship.box(30, G + 12, 29, 30, G + 12, 29, B.iron); ship.box(30, G + 12, 34, 30, G + 12, 34, B.iron);
      ship.box(30, G + 11, 29, 30, G + 14, 29, B.rope); ship.box(30, G + 11, 34, 30, G + 14, 34, B.rope);
      shipAt(w, 42, 28, G + 6); for (const z of [29, 34]) w.box(42, G + 12, z, 42, G + 15, z, B.rope);
      acts.push({
        name: '봉헌 배 모형', hint: '들보에 매단 봉헌 배 모형이 파도를 타듯 크게 흔들려요', hit: [29, G + 5, 27, 31, G + 12, 35],
        run: async a => {
          for (const r of [0.42, -0.36, 0.28, -0.2, 0.1]) await a.turn('ship', [0, 0, r], 0.75);
          a.burst([30.5, G + 9, 31.5], { n: 20, colors: ['#ffffff', '#d8f0ff'], speed: 2, up: 1, life: 1.2, gravity: 0.6, spread: 2, flat: true });
          await a.turn('ship', [0, 0, 0], 0.6);
        },
      });

      // ── 서쪽 종탑: 벽 속 계단, 큰 종(부품)과 종 줄(부품) ──
      const TZ0 = 27, TZ1 = 33, TX1 = 25;
      for (let y = G + 1; y <= TT; y++) {
        for (let x = X0; x <= TX1; x++) w.set(x, y, TZ0, y <= HT ? (y === G + 1 ? B.found : B.wallW) : (y === TT ? B.found : B.wallW));
        for (let z = TZ0; z <= TZ1; z++) w.set(X0, y, z, y === G + 1 || y === TT ? B.found : B.wallW);
        for (const [x, z] of [[TX1, TZ0], [TX1, 30], [TX1, TZ1], [X0, TZ1]]) w.set(x, y, z, B.found);
      }
      for (let x = X0; x <= TX1; x++) w.box(x, G + 1, TZ1, x, G + 2, TZ1, x === X0 || x === TX1 ? B.found : B.wallW);
      for (let z = TZ0; z <= TZ1; z++) if (z !== 28 && z !== 29) w.box(TX1, G + 1, z, TX1, G + 2, z, B.found);
      for (let y = G + 16; y <= G + 18; y++) { for (const x of [21, 22]) w.set(x, y, TZ0, 0); for (const z of [29, 31]) w.set(X0, y, z, 0); }
      w.box(X0, TT, TZ0, TX1, TT, TZ0, B.trim); w.box(X0, TT, TZ0, X0, TT, TZ1, B.trim);
      for (let k = 0; k < 5; k++) w.box(X0 + 1, G + 1, 32 - k, X0 + 1, G + 1 + k, 32 - k, B.found);        // 1단: 서쪽 벽을 따라 북으로
      for (let k = 0; k < 5; k++) w.box(20 + k, G + 5 + k, 28, 20 + k, G + 6 + k, 28, B.plank);            // 2단: 북쪽 벽을 따라 동으로
      for (let k = 0; k < 4; k++) w.box(24, G + 10 + k, 29 + k, 24, G + 11 + k, 29 + k, B.plank);        // 3단: 동쪽을 따라 남으로
      w.box(20, G + 13, 32, 23, G + 14, 32, B.plank);
      w.box(X0 + 1, G + 19, 30, TX1 - 1, G + 19, 30, B.beam);
      const bell = w.prop({ name: 'bell', pivot: [22.5, G + 18.5, 30.5], axis: 'z' });
      bell.set(22, G + 18, 30, B.iron);
      bell.ellipsoid(22, G + 16, 30, 1.6, 2, 1.6, B.bell, (dx, dy) => dy <= 1);
      for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) bell.set(22 + dx, G + 14, 30 + dz, 0);
      bell.set(22, G + 14, 30, B.iron);
      const brope = MH.rope(w, 'brope', 22, G + 13, 30, 10, B.rope);
      acts.push({
        name: '종 줄 당기기', hint: '종 줄을 당기면 종탑의 큰 종이 크게 흔들리며 항구까지 댕그랑 울려 퍼져요', hit: [20, G + 1, 29, 24, G + 18, 31],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await Promise.all([a.turn('bell', [0, 0, 0.5], 0.45), a.move('brope', [0, -1.6, 0], 0.45)]);
            a.burst([22.5, G + 15, 30.5], { n: 22, colors: ['#ffffff', '#ffe9a0', '#e8eef8'], speed: 5, up: 0.4, life: 1.3, gravity: 0, spread: 2, flat: true });
            await Promise.all([a.turn('bell', [0, 0, -0.5], 0.45), a.move('brope', [0, 0, 0], 0.45)]);
          }
          await a.turn('bell', [0, 0, 0], 0.5);
        },
      });

      // ── 북서쪽 풍금: 높이가 다른 파이프, 건반, 바람주머니(부품) ──
      const ph = [5, 7, 9, 10, 9, 7];
      for (let k = 0; k < 6; k++) { w.box(19 + k, G + 3, Z0 + 1, 19 + k, G + 2 + ph[k], Z0 + 1, B.pipe); w.set(19 + k, G + 3 + ph[k], Z0 + 1, B.gold); }
      w.box(19, G + 1, Z0 + 1, 24, G + 2, Z0 + 1, B.wood); w.box(20, G + 1, Z0 + 2, 23, G + 2, Z0 + 2, B.wood); w.box(20, G + 3, Z0 + 2, 23, G + 3, Z0 + 2, B.key);
      w.box(20, G + 1, Z0 + 4, 23, G + 1, Z0 + 4, B.pew);
      const bel = w.prop({ name: 'bellows', pivot: [24.5, G + 2, Z0 + 3] });
      bel.box(24, G + 1, Z0 + 2, 24, G + 2, Z0 + 3, B.leather); bel.box(24, G + 3, Z0 + 2, 24, G + 3, Z0 + 3, B.wood);
      lights.push({ name: 'organ', p: [20.5, G + 5, Z0 + 2.5], c: '#ffe8c8', i: 0.3, d: 10, srcR: 4 });
      w.box(19, G + 1, Z0 + 2, 19, G + 2, Z0 + 2, B.wood); w.set(19, G + 3, Z0 + 2, B.candle);
      acts.push({
        name: '풍금 연주', hint: '바람주머니가 부풀며 풍금 파이프에서 맑은 가락이 울려 퍼져요', hit: [19, G + 1, Z0 + 1, 24, G + 12, Z0 + 4],
        run: async a => {
          a.flash('organ', 4, 4.5);
          for (let k = 0; k < 6; k++) {
            await a.move('bellows', [0, 1.8, 0], 0.35);
            const p = k % 6; a.burst([19.5 + p, G + 4 + ph[p], Z0 + 1.5], { n: 10, colors: ['#ffe9a0', '#ffffff', '#c8d8ff'], speed: 1.4, up: 2.5, life: 1.5, gravity: -0.4, spread: 0.5 });
            await a.move('bellows', [0, 0, 0], 0.35);
          }
        },
      });

      // ── 뱃사람 기도 등불(동쪽 벽 앞): 층층 촛대와 배 등불(부품) ──
      const VX0 = 49, VZ = 34;
      w.box(VX0, G + 1, VZ - 2, VX0 + 2, G + 1, VZ + 2, B.iron); w.box(VX0 + 1, G + 2, VZ - 2, VX0 + 2, G + 2, VZ + 2, B.iron); w.box(VX0 + 2, G + 3, VZ - 2, VX0 + 2, G + 3, VZ + 2, B.iron);
      for (let z = VZ - 2; z <= VZ + 2; z++) { if (z % 2) w.set(VX0, G + 2, z, B.candle); else w.set(VX0 + 1, G + 3, z, B.candle); if (z !== VZ) w.set(VX0 + 2, G + 4, z, B.candle); }
      w.box(VX0 - 1, G + 1, VZ + 4, VX0 - 1, G + 9, VZ + 4, B.iron); w.set(VX0 - 1, G + 9, VZ + 3, B.iron);
      const lan = w.prop({ name: 'lantern', pivot: [VX0 - 0.5, G + 9, VZ + 3.5] });
      lan.box(VX0 - 1, G + 7, VZ + 3, VX0 - 1, G + 8, VZ + 3, B.iron); lan.box(VX0 - 1, G + 5, VZ + 3, VX0 - 1, G + 6, VZ + 3, B.lampG); lan.set(VX0 - 1, G + 4, VZ + 3, B.gold);
      lights.push({ name: 'votive', p: [VX0 + 1, G + 3.5, VZ + 0.5], c: '#ffd890', i: 0.7, d: 11, flicker: 0.2, srcR: 3 });
      acts.push({
        name: '뱃사람 기도 등불', hint: '바다에 나간 이들을 위해 켜 둔 기도 등불들이 한꺼번에 밝아지고 불빛이 떠올라요', hit: [VX0 - 1, G + 1, VZ - 2, VX0 + 2, G + 7, VZ + 4],
        run: async a => {
          a.flash('votive', 4, 4.5);
          for (let k = 0; k < 9; k++) { if (k % 3 === 0) a.turn('lantern', [k % 2 ? -0.5 : 0.5, 0, 0], 0.8); a.burst([VX0 + 1, G + 4, VZ - 2 + (k % 5)], { n: 8, colors: ['#ffe9a0', '#ffd070', '#ffffff'], speed: 0.5, up: 2.2, life: 2, gravity: -0.5, spread: 0.3 }); await a.wait(0.3); }
          await a.turn('lantern', [0, 0, 0], 0.8);
        },
      });

      // ── 성구실(북동쪽): 낮은 칸막이, 제의 장, 성작과 책 ──
      for (let x = 46; x <= X1 - 1; x++) if (x < 47 || x > 48) w.box(x, G + 1, 29, x, G + 2, 29, x === 46 ? B.found : B.wallW);
      for (let z = Z0 + 1; z <= 29; z++) w.box(46, G + 1, z, 46, G + 2, z, z === 29 ? B.found : B.wallW);
      w.box(49, G + 1, Z0 + 1, 52, G + 4, Z0 + 1, B.wood); w.box(50, G + 2, Z0 + 1, 51, G + 3, Z0 + 1, B.clothB);
      w.box(48, G + 1, 25, 49, G + 1, 26, B.wood); w.set(48, G + 2, 25, B.gold); w.set(49, G + 2, 26, B.book2); w.set(52, G + 1, 27, B.leather); w.set(52, G + 2, 27, B.candle);
      w.box(47, G + 1, Z0 + 1, 47, G + 3, Z0 + 1, B.wood); for (let y = G + 1; y <= G + 3; y++) w.set(48, y, Z0 + 1, y % 2 ? B.book : B.book2);

      landmarks.push({ name: '언덕 위 교회', note: '종탑과 봉헌 배', p: [35.5, HT + 4, 31] });
      return { lights, landmarks, acts };
    },
  });
})();
