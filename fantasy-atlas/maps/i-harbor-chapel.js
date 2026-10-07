// 언덕 위 교회(하위 지도, 2배 해상도) — 갈매기 항구 언덕 꼭대기의 흰 교회 안. 서쪽 종탑 속 계단과 큰 종, 북쪽 벽의 둥근 색유리 창과 제단,
// 들보에 매단 봉헌 배 모형, 신자석, 뱃사람들의 기도 등불, 세례대, 북서쪽 풍금과 북동쪽 성구실. 남·동쪽 벽은 잘라 낮췄다 (마을)
// 세부: 두 겹 벽과 굽도리 판벽, 벽기둥, 뾰족 아치 색유리, 바퀴살 무늬 둥근 창, 팔걸이·등받이가 있는 신자석, 파이프 입이 있는 풍금
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 144, D = 128, Hh = 96, G = 20;
  const X0 = 36, X1 = 107, Z0 = 44, Z1 = 83;          // 벽(바깥 둘레, 두께 2)
  const HT = G + 28, TT = G + 42;                      // 본당 벽 높이 · 종탑 높이
  MAPS.push({
    id: 'harbor-chapel', cat: 'village', sub: true, parent: 'harbor', name: '언덕 위 교회', en: 'Gull Harbor · Hilltop Chapel', color: '#a8c8dc', seed: 1131, base: G, time: 'day', size: [W, D, Hh],
    playerScale: 2,
    spawn: [71, G + 1, 77],
    desc: '항구를 내려다보는 언덕 꼭대기의 흰 교회. 뱃사람들이 무사히 돌아온 배를 본떠 봉헌한 배 모형이 들보에 매달려 있고, 북쪽 벽의 둥근 색유리 창이 제단 위로 바다빛을 뿌린다. 서쪽 종탑 계단을 오르면 안개 낀 날 배들을 부르는 큰 종이 있다.',
    info: { title: '장소 정보', en: 'HILLTOP CHAPEL', rows: [['본당', '신자석 · 제단 · 둥근 색유리 창'], ['종탑', '계단을 올라 큰 종과 종 줄'], ['풍습', '배 모형을 봉헌하고 기도 등불을 켠다']] },
    sky: ['#e8f0f8', '#a8bcd0', '#fff4e4'], stars: false,
    hemi: ['#f8f8ff', '#4a5468', 0.68], sun: ['#fff4e0', 0.6, [-0.4, 1, -0.5]],
    night: { sky: ['#283048', '#0a0c18', '#a88868'], stars: false, hemi: ['#b0b8d0', '#141820', 0.44], sun: ['#d0d8ff', 0.26, [-0.4, 1, -0.5]], haze: '#22283a' },
    fog: { start: 0.9, floor: G - 16, depth: 12, haze: [16, 0.1, 12], hazeColor: '#e4ecf4' },
    camY: -2, zoom: 1.5,
    particles: [
      { n: 120, colors: ['#fff6d8', '#ffffff', '#e8f0ff'], mode: 'drift', speed: 0.16, wind: 0.1, area: [71, 63, 30], y0: G + 4, y1: G + 32, glow: true },
      { n: 40, colors: ['#ff8ab0', '#8ab8ff', '#ffe08a', '#8ae0b0'], mode: 'fall', speed: 0.24, area: [72, 54, 8], y0: G + 4, y1: G + 24, glow: true },
    ],
    blocks: {
      grass: { c: '#7a5a3a', top: '#7aa84a', v: 0.08 }, grass2: { c: '#7a5a3a', top: '#8ab85a', v: 0.08 }, dirt: { c: '#7a5a3a', v: 0.08 }, rock: { c: '#6e6e78', v: 0.06, pat: 'stone' },
      cobble: { c: '#8a8680', top: '#a8a49a', v: 0.06 }, cobble2: { c: '#7e7a72', top: '#9a968c', v: 0.06 }, cobbleJ: { c: '#6a665e', top: '#76726a', v: 0.04 },
      flower: { c: '#e86a8a', v: 0.05 }, flower2: { c: '#f0e060', v: 0.05 }, flowerStem: { c: '#4a8a34', v: 0.08 },
      found: { c: '#8a8680', v: 0.05, pat: 'stone' }, sill: { c: '#b8b2a6', v: 0.04 }, wallW: { c: '#f2eee4', v: 0.03 }, trim: { c: '#3a6a9a', v: 0.04 }, stripeW: { c: '#f4f0e8', v: 0.02 },
      flag: { c: '#a8a49a', top: '#c8c4b8', v: 0.04 }, flag2: { c: '#9a968c', top: '#b4b0a6', v: 0.04 }, flagJ: { c: '#7a766e', top: '#8a867e', v: 0.03 },
      marble: { c: '#e8e4dc', v: 0.03, pat: 'big' }, marble2: { c: '#d8d2c6', v: 0.03 }, runner: { c: '#2a4a7a', top: '#3a5a8a', v: 0.04 }, runnerE: { c: '#c8a050', top: '#d8b060', v: 0.03 },
      plank: { c: '#9a6a40', v: 0.06, pat: 'plank' }, panel: { c: '#7a5434', v: 0.04, pat: 'plank' }, pew: { c: '#6a4428', top: '#8a5a34', v: 0.04, pat: 'plank' }, wood: { c: '#5a4030', v: 0.05 }, beam: { c: '#4a3020', v: 0.05, pat: 'log' },
      door: { c: '#3a5a7a', v: 0.03, pat: 'plank' }, win: { c: '#ffd890', night: true, day: '#bfe0f4' }, iron: { c: '#4a4a52', v: 0.03 }, rope: { c: '#c8b890', v: 0.04 },
      bell: { c: '#c8a050', v: 0.05 }, bellDk: { c: '#a07c38', v: 0.04 }, gold: { c: '#e0b048', v: 0.03 }, cloth: { c: '#f8f4ec', v: 0.02 }, clothB: { c: '#3a6a9a', v: 0.03 },
      pipe: { c: '#c8ccd4', v: 0.03 }, pipeDk: { c: '#2a2a30', v: 0.02 },
      key: { c: '#f4f0e4', v: 0.02, pat: 'check', alt: '#2a2a2e' }, leather: { c: '#7a4a2a', v: 0.04 }, book: { c: '#7a2a2a', v: 0.04 }, book2: { c: '#2a4a6a', v: 0.04 }, book3: { c: '#3a6a3a', v: 0.04 },
      hull: { c: '#7a4a2a', v: 0.06, pat: 'plank' }, hullB: { c: '#2a4a6a', v: 0.04 }, hullR: { c: '#b0503a', v: 0.04 }, sail: { c: '#f0ead8', v: 0.03 }, sail2: { c: '#ded6c0', v: 0.03 }, mast: { c: '#5a3a24', v: 0.04 },
      water: { c: '#6ab0d8', top: '#a8e0f4', v: 0.03 },
      sgR: { c: '#e04a5a', glow: true }, sgB: { c: '#4a7ae8', glow: true }, sgY: { c: '#f0c040', glow: true }, sgG: { c: '#4ac08a', glow: true }, sgW: { c: '#f0f0ff', glow: true }, lead: { c: '#3a3a40', v: 0.02 },
      candle: { c: '#fff4d8', glow: true }, lampG: { c: '#ffe0a0', glow: true },
    },
    build(w) {
      const B = w.id;
      const lights = [], acts = [], landmarks = [];
      // ── 바깥: 언덕 풀밭과 남쪽 문 앞 돌길 ──
      MH.terrain(w, { floor: G - 16, height: () => G - 1, surface: (x, z) => hash3(x >> 1, 1, z >> 1) > 0.55 ? B.grass2 : B.grass, under: (x, z, y, dep) => dep < 4 ? B.dirt : B.rock });
      for (let z = Z1 + 1; z < D - 4; z++) for (let x = 66; x <= 77; x++) { const row = z >> 1; w.set(x, G - 1, z, (z % 3 === 2 || (x + (row & 1) * 2) % 4 === 3) ? B.cobbleJ : (hash3(x >> 2, row, 3) > 0.5 ? B.cobble : B.cobble2)); }
      for (let k = 0; k < 160; k++) {
        const x = (hash3(k, 2, 5) * W) | 0, z = (hash3(k, 3, 5) * D) | 0;
        if (x >= X0 - 2 && x <= X1 + 2 && z >= Z0 - 2 && z <= Z1 + 2) continue;
        if (w.get(x, G - 1, z) !== B.grass && w.get(x, G - 1, z) !== B.grass2) continue;
        w.set(x, G, z, B.flowerStem); if (k % 3 === 0) w.set(x, G + 1, z, k % 2 ? B.flower : B.flower2);
      }

      // ── 바닥: 무늬 판석과 가운데 푸른 깔개(금색 테) ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) w.set(x, G, z, (x % 4 === 0 || z % 4 === 0) ? B.flagJ : (((x >> 2) + (z >> 2)) & 1 ? B.flag : B.flag2));
      for (let z = Z0 + 10; z <= Z1 - 2; z++) for (let x = 69; x <= 74; x++) w.set(x, G, z, x === 69 || x === 74 ? B.runnerE : B.runner);
      // ── 벽: 두 겹, 아래 굽도리 판벽, 띠, 처마 돌림 ──
      const wallB = y => y <= G + 2 ? B.found : (y === G + 21 || y === G + 22) ? B.trim : (y >= HT - 1 ? B.found : B.wallW);
      const inner = y => y <= G + 2 ? B.found : y <= G + 7 ? (y === G + 7 ? B.wood : B.panel) : wallB(y);
      for (let y = G + 1; y <= HT; y++) {
        for (let x = X0; x <= X1; x++) { w.set(x, y, Z0, wallB(y)); w.set(x, y, Z0 + 1, x >= X0 + 2 ? inner(y) : wallB(y)); }
        for (let z = Z0; z <= Z1; z++) { w.set(X0, y, z, wallB(y)); w.set(X0 + 1, y, z, z >= Z0 + 2 ? inner(y) : wallB(y)); }
      }
      for (let x = X0; x <= X1; x++) for (const z of [Z1 - 1, Z1]) { w.box(x, G + 1, z, x, G + 2, z, B.found); w.box(x, G + 3, z, x, G + 5, z, B.wallW); w.set(x, G + 6, z, B.sill); }
      for (let z = Z0; z <= Z1; z++) for (const x of [X1 - 1, X1]) { w.box(x, G + 1, z, x, G + 2, z, B.found); w.box(x, G + 3, z, x, G + 5, z, B.wallW); w.set(x, G + 6, z, B.sill); }
      // 낮춘 벽의 벽기둥(바깥 버팀벽 자리)과 북쪽 벽 안쪽 벽기둥
      for (const x of [48, 60, 84, 96]) { w.box(x, G + 1, Z1 - 1, x + 1, G + 8, Z1 + 1, B.found); w.box(x, G + 9, Z1 - 1, x + 1, G + 9, Z1 + 1, B.sill); }
      for (const z of [54, 64, 74]) { w.box(X1 - 1, G + 1, z, X1 + 1, G + 8, z + 1, B.found); w.box(X1 - 1, G + 9, z, X1 + 1, G + 9, z + 1, B.sill); }
      for (const x of [60, 84]) { w.box(x, G + 1, Z0 + 2, x + 1, HT - 2, Z0 + 2, B.found); w.box(x - 1, HT - 3, Z0 + 2, x + 2, HT - 2, Z0 + 3, B.sill); }
      // 뾰족 아치 색유리 창(북쪽 벽, 납 띠)과 서쪽 창
      const sg = [B.sgR, B.sgB, B.sgY, B.sgG];
      for (const x0 of [52, 88]) {
        for (let y = G + 7; y <= G + 22; y++) for (let x = x0; x <= x0 + 3; x++) {
          const top = y - (G + 18), c = Math.min(x - x0, x0 + 3 - x);
          if (top > 0 && c < top - 1 + (top > 2 ? 1 : 0)) continue;
          const b = (x === x0 + 1 && y > G + 8 && y < G + 18) || (y - G) % 5 === 0 ? B.lead : (top > 0 ? B.sgW : sg[((x >> 1) + (y >> 1)) % 4]);
          w.set(x, y, Z0, b); w.set(x, y, Z0 + 1, b);
        }
        w.box(x0 - 2, G + 5, Z0 + 1, x0 + 5, G + 6, Z0 + 2, B.sill);
      }
      for (const [za, zb] of [[48, 51], [70, 73]]) {
        for (let y = G + 7; y <= G + 16; y++) for (let z = za; z <= zb; z++) { const b = (z === za + 1 && y < G + 15) || y === G + 11 ? B.wallW : B.win; w.set(X0, y, z, b); w.set(X0 + 1, y, z, b); }
        w.box(X0 + 2, G + 6, za - 1, X0 + 2, G + 6, zb + 1, B.sill);
      }
      // 둥근 색유리 창(제단 위): 돌 테, 바퀴살 납 띠, 노란 가운데
      const RX = 72, RY = G + 23;
      for (let y = RY - 8; y <= RY + 8; y++) for (let x = RX - 8; x <= RX + 8; x++) {
        const d = Math.hypot(x + 0.5 - RX, y + 0.5 - RY);
        if (d > 7.4) continue;
        const ang = Math.atan2(y + 0.5 - RY, x + 0.5 - RX), seg = ((ang + Math.PI) / (Math.PI * 2) * 8 + 0.5) | 0;
        const spoke = Math.abs(((ang + Math.PI) / (Math.PI * 2) * 8 + 0.5) % 1 - 0.5) > 0.42;
        const b = d > 6.2 ? B.found : d < 1.9 ? B.sgY : (d > 1.9 && d < 2.6) || spoke || (d > 4.4 && d < 4.9) ? B.lead : sg[(seg + (d > 4.6 ? 1 : 0)) % 4];
        w.set(x, y, Z0, b); w.set(x, y, Z0 + 1, b);
      }
      lights.push({ name: 'rose', p: [72, G + 22, Z0 + 4], c: '#ffe8f0', i: 0.5, d: 32, srcR: 4 });

      // ── 남쪽 문: 돌 문틀과 상인방(낮춘 벽 위로 솟는다) ──
      const DX = 70;
      w.box(DX, G + 1, Z1 - 1, DX + 3, G + 9, Z1, 0);
      for (const x of [DX - 2, DX - 1, DX + 4, DX + 5]) w.box(x, G + 1, Z1 - 1, x, G + 10, Z1, B.found);
      w.box(DX - 2, G + 10, Z1 - 1, DX + 5, G + 11, Z1, B.found); w.box(DX - 1, G + 12, Z1 - 1, DX + 4, G + 12, Z1, B.sill); w.box(DX + 1, G + 13, Z1 - 1, DX + 2, G + 13, Z1, B.sill);
      w.box(DX + 6, G + 9, Z1 + 1, DX + 6, G + 9, Z1 + 2, B.iron); w.box(DX + 6, G + 6, Z1 + 2, DX + 6, G + 8, Z1 + 2, B.lampG); w.set(DX + 6, G + 5, Z1 + 2, B.iron);
      lights.push({ name: 'doorLamp', p: [DX + 6.5, G + 7, Z1 + 2.5], c: '#ffd890', i: 0.8, d: 20, flicker: 0.1, night: true });
      acts.push(OR.goAct({ at: [DX + 1, G + 1, Z1], h: 9, hit: [DX, G + 1, Z1 - 2, DX + 3, G + 9, Z1], name: '밖으로 나가기', goto: 'harbor', hint: '교회 문을 나서 항구가 내려다보이는 언덕으로 나가요' }));

      // ── 제단: 두 단 대리석 단상, 흰 천 덮은 제단과 금 촛대 ──
      w.box(60, G + 1, Z0 + 2, 83, G + 2, Z0 + 9, B.marble); for (let x = 60; x <= 83; x++) w.set(x, G + 2, Z0 + 9, B.marble2);
      w.box(64, G + 3, Z0 + 2, 79, G + 4, Z0 + 7, B.marble); for (let x = 64; x <= 79; x++) w.set(x, G + 4, Z0 + 7, B.marble2);
      w.box(68, G + 5, Z0 + 2, 75, G + 6, Z0 + 5, B.marble); w.box(67, G + 7, Z0 + 2, 76, G + 7, Z0 + 5, B.cloth); w.box(67, G + 5, Z0 + 5, 76, G + 6, Z0 + 5, B.clothB);
      for (const x of [67, 76]) { w.box(x, G + 5, Z0 + 6, x, G + 5, Z0 + 6, B.gold); w.box(x, G + 6, Z0 + 6, x, G + 8, Z0 + 6, B.gold); w.box(x, G + 9, Z0 + 6, x, G + 10, Z0 + 6, B.candle); }
      for (const x of [71, 72]) w.box(x, G + 8, Z0 + 2, x, G + 9, Z0 + 2, B.candle);
      w.box(69, G + 8, Z0 + 4, 70, G + 8, Z0 + 4, B.book);
      lights.push({ name: 'altar', p: [71.5, G + 12, Z0 + 6], c: '#ffe0a0', i: 0.7, d: 24, flicker: 0.15, srcR: 4 });
      acts.push({
        name: '제단 촛불', hint: '제단의 금 촛대와 초에 차례로 불이 붙으며 따뜻한 빛이 번져요', hit: [64, G + 3, Z0 + 2, 79, G + 12, Z0 + 7],
        run: async a => {
          a.flash('altar', 4, 4); a.glow(1.3, 3.5);
          for (const [x, z] of [[67, 6], [71, 2], [72, 2], [76, 6], [67, 6], [76, 6]]) { a.burst([x + 0.5, G + 11, Z0 + z + 0.5], { n: 14, colors: ['#ffe9a0', '#ffd070', '#ffffff'], speed: 1.6, up: 4, life: 1.2, gravity: -1.2, spread: 0.6 }); await a.wait(0.4); }
        },
      });
      acts.push({
        name: '색유리 햇살', hint: '둥근 색유리 창으로 햇살이 쏟아져 본당 바닥에 무지갯빛 조각이 흩어져요', hit: [64, RY - 7, Z0, 80, RY + 7, Z0 + 2],
        run: async a => {
          a.flash('rose', 6, 4); a.glow(1.6, 4);
          for (let k = 0; k < 10; k++) {
            const t = k * 0.7;
            a.burst([72 + Math.cos(t) * 4, G + 22 - k * 1.2, Z0 + 4 + k * 2.4], { n: 14, colors: ['#ff8ab0', '#8ab8ff', '#ffe08a', '#8ae0b0', '#ffffff'], speed: 1.2, up: -1.2, life: 1.8, gravity: 0.8, spread: 2.8 });
            await a.wait(0.3);
          }
        },
      });

      // ── 신자석(북쪽 제단을 향해 세 줄씩): 앉는 판, 받침, 등받이와 갓, 팔걸이 끝판 ──
      for (const z of [60, 66, 72]) for (const [xa, xb] of [[54, 67], [76, 91]]) {
        for (let x = xa; x <= xb; x++) {
          w.box(x, G + 3, z, x, G + 3, z + 1, B.pew);
          w.box(x, G + 1, z + 2, x, G + 6, z + 2, B.wood); w.set(x, G + 7, z + 2, B.pew);
          if ((x - xa) % 5 === 0) w.box(x, G + 1, z, x, G + 2, z + 1, B.wood);
        }
        for (const x of [xa, xb]) { w.box(x, G + 1, z, x, G + 5, z + 2, B.pew); w.box(x, G + 6, z + 1, x, G + 6, z + 2, B.wood); }
      }
      w.box(57, G + 4, 60, 58, G + 4, 61, B.book2); w.box(83, G + 4, 66, 84, G + 4, 67, B.book);
      // 세례대: 팔각 받침과 대리석 대야, 맑은 물
      const FX = 60, FZ = 78;
      w.box(FX - 2, G + 1, FZ - 2, FX + 2, G + 1, FZ + 2, B.found); w.box(FX - 1, G + 2, FZ - 1, FX + 1, G + 4, FZ + 1, B.marble2);
      for (let y = G + 5; y <= G + 6; y++) for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) { const d = Math.abs(dx) + Math.abs(dz) * 1; if (Math.max(Math.abs(dx), Math.abs(dz)) > 3 || Math.abs(dx) + Math.abs(dz) > 5) continue; w.set(FX + dx, y, FZ + dz, y === G + 6 && Math.abs(dx) < 3 && Math.abs(dz) < 3 && d < 4 ? B.water : B.marble); }
      acts.push({
        name: '세례대', hint: '세례대의 맑은 물이 찰랑이며 물방울이 반짝이며 튀어 올라요', hit: [FX - 3, G + 1, FZ - 3, FX + 3, G + 6, FZ + 3],
        run: async a => {
          for (let k = 0; k < 7; k++) { a.burst([FX + 0.5, G + 7, FZ + 0.5], { n: 16, colors: ['#a8e0f4', '#ffffff', '#6ab0d8'], speed: 3.2, up: 6, life: 1.1, gravity: 10, spread: 0.8 }); await a.wait(0.4); }
          a.burst([FX + 0.5, G + 8, FZ + 0.5], { n: 24, colors: ['#ffffff', '#e8f4ff'], speed: 2, up: 3, life: 1.6, gravity: -0.8, spread: 2 });
        },
      });

      // ── 들보: 북쪽 벽에서 남쪽으로 건너지른 두 줄(남쪽 끝은 잘린 단면) ──
      for (const x of [59, 85]) w.box(x, HT - 1, Z0 + 2, x + 1, HT, Z1 - 2, B.beam);
      // ── 봉헌 배 모형: 들보에 밧줄로 매단 돛배(서쪽은 부품, 동쪽은 고정). 뱃머리 -z(제단 쪽) ──
      const shipAt = (t, x, z0, y) => {
        for (let z = z0; z <= z0 + 13; z++) {
          const s = z - z0, hw = s < 1 ? 0 : s > 11 ? 1 : 2;
          t.set(x, y - 1, z, B.hullB);
          for (let k = -hw; k <= hw; k++) { t.set(x + k, y, z, Math.abs(k) === hw ? B.hull : B.hullB); if (Math.abs(k) === hw) { t.set(x + k, y + 1, z, B.hullR); t.set(x + k, y + 2, z, B.mast); } else t.set(x + k, y + 1, z, B.hull); }
        }
        t.box(x, y + 1, z0 - 1, x, y + 3, z0 - 1, B.mast); t.line(x, y + 3, z0 - 1, x, y + 5, z0 - 4, B.mast);
        for (const z of [z0 + 4, z0 + 9]) {
          t.box(x, y + 2, z, x, y + 12, z, B.mast);
          for (let r = 0; r < 7; r++) for (let k = -3; k <= 3; k++) t.set(x + k, y + 4 + r, z - (Math.abs(k) < 2 && r > 0 && r < 6 ? 1 : 0), r % 3 === 2 ? B.sail2 : B.sail);
          t.box(x - 4, y + 11, z, x + 4, y + 11, z, B.mast); t.box(x - 3, y + 4, z, x + 3, y + 4, z, B.mast);
        }
        t.line(x, y + 12, z0 + 4, x, y + 3, z0 - 1, B.rope); t.line(x, y + 12, z0 + 9, x, y + 3, z0 + 13, B.rope);
      };
      const ship = w.prop({ name: 'ship', pivot: [60.5, HT - 1.5, 62.5] });
      shipAt(ship, 60, 56, G + 10);
      for (const z of [58, 67]) ship.box(60, G + 13, z, 60, HT - 2, z, B.rope);
      shipAt(w, 84, 56, G + 12); for (const z of [58, 67]) w.box(84, G + 15, z, 84, HT - 2, z, B.rope);
      acts.push({
        name: '봉헌 배 모형', hint: '들보에 매단 봉헌 배 모형이 파도를 타듯 크게 흔들려요', hit: [57, G + 9, 54, 63, G + 24, 70],
        run: async a => {
          for (const r of [0.42, -0.36, 0.28, -0.2, 0.1]) await a.turn('ship', [0, 0, r], 0.75);
          a.burst([60.5, G + 18, 63], { n: 20, colors: ['#ffffff', '#d8f0ff'], speed: 4, up: 2, life: 1.2, gravity: 1.2, spread: 4, flat: true });
          await a.turn('ship', [0, 0, 0], 0.6);
        },
      });

      // ── 서쪽 종탑: 벽 속 계단(세 꺾임), 큰 종(부품)과 종 줄(부품) ──
      const TZ0 = 54, TZ1 = 67, TX1 = 51;
      for (let y = G + 1; y <= TT; y++) {
        const cap = y >= TT - 1 ? B.trim : (y <= G + 2 ? B.found : B.wallW);
        for (let x = X0; x <= TX1; x++) for (const z of [TZ0, TZ0 + 1]) w.set(x, y, z, cap);
        for (let z = TZ0; z <= TZ1; z++) for (const x of [X0, X0 + 1]) w.set(x, y, z, cap);
        for (const [x, z] of [[TX1 - 1, TZ0], [TX1 - 1, 60], [TX1 - 1, TZ1 - 1], [X0, TZ1 - 1]]) w.box(x, y, z, x + 1, y, z + 1, B.found);
      }
      for (let x = X0; x <= TX1; x++) for (const z of [TZ1 - 1, TZ1]) { w.box(x, G + 1, z, x, G + 3, z, x <= X0 + 1 || x >= TX1 - 1 ? B.found : B.wallW); w.set(x, G + 4, z, B.sill); }
      for (let z = TZ0; z <= TZ1; z++) if (z < 56 || z > 59) for (const x of [TX1 - 1, TX1]) { w.box(x, G + 1, z, x, G + 3, z, B.found); w.set(x, G + 4, z, B.sill); }
      for (let y = G + 31; y <= G + 36; y++) { for (let x = 42; x <= 45; x++) for (const z of [TZ0, TZ0 + 1]) w.set(x, y, z, 0); for (const z of [57, 58, 63, 64]) for (const x of [X0, X0 + 1]) w.set(x, y, z, 0); }
      for (let x = 41; x <= 46; x++) w.set(x, G + 30, TZ0, B.sill);
      for (let k = 0; k < 9; k++) w.box(X0 + 2, G + Math.max(1, k), 65 - k, X0 + 4, G + 1 + k, 65 - k, B.found);                   // 1단: 서쪽 벽을 따라 북으로
      w.box(X0 + 2, G + 9, 56, X0 + 4, G + 10, 57, B.found);
      for (let k = 0; k < 6; k++) w.box(41 + k, G + 10 + k, 56, 41 + k, G + 11 + k, 58, B.plank);                                  // 2단: 북쪽 벽을 따라 동으로
      w.box(47, G + 16, 56, 49, G + 17, 58, B.plank);
      for (let k = 0; k < 6; k++) w.box(47, G + 17 + k, 59 + k, 49, G + 18 + k, 59 + k, B.plank);                                  // 3단: 동쪽을 따라 남으로
      w.box(41, G + 23, 63, 46, G + 24, 65, B.plank); w.box(47, G + 22, 65, 49, G + 24, 65, B.plank);
      w.box(X0 + 2, G + 41, 60, TX1 - 2, G + 41, 61, B.beam);
      const bell = w.prop({ name: 'bell', pivot: [44.5, G + 40.5, 61], axis: 'z' });
      bell.box(44, G + 39, 60, 45, G + 40, 61, B.iron);
      bell.ellipsoid(44, G + 35, 61, 3.4, 4, 3.4, B.bell, (dx, dy, dz, d) => dy <= 2 || d > 0.55);
      for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) for (let dy = -4; dy <= -1; dy++) if (dx * dx + dz * dz < 6) bell.set(44 + dx, G + 35 + dy, 61 + dz, 0);
      for (let dz = -4; dz <= 4; dz++) for (let dx = -4; dx <= 4; dx++) { const d = Math.hypot(dx, dz); if (d > 2.8 && d <= 3.6) bell.set(44 + dx, G + 32, 61 + dz, B.bellDk); }
      bell.box(44, G + 32, 61, 44, G + 33, 61, B.iron);
      MH.rope(w, 'brope', 44, G + 30, 61, 21, B.rope);
      acts.push({
        name: '종 줄 당기기', hint: '종 줄을 당기면 종탑의 큰 종이 크게 흔들리며 항구까지 댕그랑 울려 퍼져요', hit: [40, G + 1, 58, 48, G + 39, 64],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await Promise.all([a.turn('bell', [0, 0, 0.5], 0.45), a.move('brope', [0, -3.2, 0], 0.45)]);
            a.burst([44.5, G + 33, 61], { n: 22, colors: ['#ffffff', '#ffe9a0', '#e8eef8'], speed: 10, up: 0.8, life: 1.3, gravity: 0, spread: 4, flat: true });
            await Promise.all([a.turn('bell', [0, 0, -0.5], 0.45), a.move('brope', [0, 0, 0], 0.45)]);
          }
          await a.turn('bell', [0, 0, 0], 0.5);
        },
      });

      // ── 북서쪽 풍금: 높이가 다른 파이프(입 구멍·금 테), 나무 상자, 건반, 의자, 바람주머니(부품) ──
      const ph = [10, 12, 14, 16, 18, 20, 20, 18, 16, 14, 12, 10];
      w.box(38, G + 1, Z0 + 2, 49, G + 4, Z0 + 3, B.wood); w.box(37, G + 5, Z0 + 2, 50, G + 5, Z0 + 3, B.panel);
      for (let k = 0; k < 12; k++) { const x = 38 + k; w.box(x, G + 6, Z0 + 2, x, G + 5 + ph[k], Z0 + 2, B.pipe); w.set(x, G + 8, Z0 + 3, B.pipeDk); w.set(x, G + 6 + ph[k], Z0 + 2, B.gold); }
      w.box(40, G + 1, Z0 + 4, 47, G + 4, Z0 + 5, B.wood); w.box(40, G + 5, Z0 + 5, 47, G + 5, Z0 + 5, B.key); w.box(40, G + 5, Z0 + 4, 47, G + 7, Z0 + 4, B.panel);
      w.box(41, G + 1, Z0 + 8, 46, G + 2, Z0 + 8, B.pew); for (const x of [41, 46]) w.box(x, G + 1, Z0 + 8, x, G + 1, Z0 + 8, B.wood);
      const bel = w.prop({ name: 'bellows', pivot: [49, G + 4, Z0 + 6] });
      bel.box(48, G + 1, Z0 + 4, 49, G + 4, Z0 + 7, B.leather); bel.box(48, G + 5, Z0 + 4, 49, G + 5, Z0 + 7, B.wood); bel.box(48, G + 6, Z0 + 5, 48, G + 6, Z0 + 6, B.iron);
      lights.push({ name: 'organ', p: [41, G + 10, Z0 + 5], c: '#ffe8c8', i: 0.3, d: 20, srcR: 6 });
      w.box(38, G + 1, Z0 + 5, 38, G + 4, Z0 + 5, B.wood); w.box(38, G + 5, Z0 + 5, 38, G + 6, Z0 + 5, B.candle);
      acts.push({
        name: '풍금 연주', hint: '바람주머니가 부풀며 풍금 파이프에서 맑은 가락이 울려 퍼져요', hit: [38, G + 1, Z0 + 2, 49, G + 24, Z0 + 8],
        run: async a => {
          a.flash('organ', 4, 4.5);
          for (let k = 0; k < 6; k++) {
            await a.move('bellows', [0, 3.6, 0], 0.35);
            const p = (k * 2) % 12; a.burst([38.5 + p, G + 7 + ph[p], Z0 + 2.5], { n: 10, colors: ['#ffe9a0', '#ffffff', '#c8d8ff'], speed: 2.8, up: 5, life: 1.5, gravity: -0.8, spread: 1 });
            await a.move('bellows', [0, 0, 0], 0.35);
          }
        },
      });

      // ── 뱃사람 기도 등불(동쪽 벽 앞): 층층 쇠 촛대와 배 등불(부품) ──
      const VX0 = 98, VZ = 68;
      w.box(VX0, G + 1, VZ - 4, VX0 + 5, G + 2, VZ + 5, B.iron); w.box(VX0 + 2, G + 3, VZ - 4, VX0 + 5, G + 4, VZ + 5, B.iron); w.box(VX0 + 4, G + 5, VZ - 4, VX0 + 5, G + 6, VZ + 5, B.iron);
      for (let z = VZ - 4; z <= VZ + 5; z += 2) { w.set(VX0 + ((z >> 1) & 1), G + 3, z, B.candle); w.set(VX0 + 2 + ((z >> 1) & 1), G + 5, z, B.candle); if (z !== VZ) w.set(VX0 + 4, G + 7, z, B.candle); }
      w.box(VX0 - 2, G + 1, VZ + 8, VX0 - 2, G + 18, VZ + 8, B.iron); w.box(VX0 - 2, G + 18, VZ + 6, VX0 - 2, G + 18, VZ + 7, B.iron);
      const lan = w.prop({ name: 'lantern', pivot: [VX0 - 1.5, G + 18, VZ + 6.5] });
      lan.box(VX0 - 2, G + 15, VZ + 6, VX0 - 2, G + 17, VZ + 6, B.iron);
      for (let y = G + 9; y <= G + 14; y++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) lan.set(VX0 - 2 + dx, y, VZ + 6 + dz, (y === G + 9 || y === G + 14) ? B.iron : (dx && dz) ? B.iron : B.lampG);
      lan.set(VX0 - 2, G + 8, VZ + 6, B.gold);
      lights.push({ name: 'votive', p: [VX0 + 3, G + 6, VZ + 0.5], c: '#ffd890', i: 0.7, d: 22, flicker: 0.2, srcR: 4 });
      acts.push({
        name: '뱃사람 기도 등불', hint: '바다에 나간 이들을 위해 켜 둔 기도 등불들이 한꺼번에 밝아지고 불빛이 떠올라요', hit: [VX0 - 3, G + 1, VZ - 4, VX0 + 5, G + 14, VZ + 8],
        run: async a => {
          a.flash('votive', 4, 4.5);
          for (let k = 0; k < 9; k++) { if (k % 3 === 0) a.turn('lantern', [k % 2 ? -0.5 : 0.5, 0, 0], 0.8); a.burst([VX0 + 2, G + 8, VZ - 4 + (k % 5) * 2], { n: 8, colors: ['#ffe9a0', '#ffd070', '#ffffff'], speed: 1, up: 4.4, life: 2, gravity: -1, spread: 0.6 }); await a.wait(0.3); }
          await a.turn('lantern', [0, 0, 0], 0.8);
        },
      });

      // ── 성구실(북동쪽): 낮은 칸막이, 제의 장, 성작과 책 ──
      for (let x = 92; x <= X1 - 2; x++) if (x < 94 || x > 97) for (const z of [58, 59]) { w.box(x, G + 1, z, x, G + 4, z, x <= 93 ? B.found : B.wallW); w.set(x, G + 5, z, B.sill); }
      for (let z = Z0 + 2; z <= 59; z++) for (const x of [92, 93]) { w.box(x, G + 1, z, x, G + 4, z, z >= 58 ? B.found : B.wallW); w.set(x, G + 5, z, B.sill); }
      w.box(98, G + 1, Z0 + 2, 105, G + 9, Z0 + 3, B.wood); w.box(100, G + 3, Z0 + 4, 103, G + 8, Z0 + 4, B.clothB); w.box(98, G + 10, Z0 + 2, 105, G + 10, Z0 + 4, B.panel);
      for (const [x, z] of [[96, 50], [99, 50], [96, 53], [99, 53]]) w.box(x, G + 1, z, x, G + 3, z, B.wood);
      w.box(96, G + 4, 50, 99, G + 4, 53, B.plank); w.box(96, G + 5, 50, 96, G + 6, 50, B.gold); w.box(98, G + 5, 52, 99, G + 5, 53, B.book2);
      w.box(104, G + 1, 54, 105, G + 2, 55, B.leather); w.box(104, G + 3, 54, 104, G + 3, 54, B.candle);
      w.box(94, G + 1, Z0 + 2, 95, G + 7, Z0 + 3, B.wood); for (let y = G + 2; y <= G + 6; y += 2) for (let z = Z0 + 2; z <= Z0 + 3; z++) { w.set(94, y, z, (y >> 1) % 3 ? B.book : B.book3); w.set(95, y, z, (y >> 1) % 2 ? B.book2 : B.book); }

      landmarks.push({ name: '언덕 위 교회', note: '종탑과 봉헌 배', p: [71.5, HT + 8, 63] });
      return { lights, landmarks, acts };
    },
  });
})();
