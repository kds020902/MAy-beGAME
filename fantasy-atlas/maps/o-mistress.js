// 풍요의 여주인 — 서쪽 큰길의 2층 돌·목골 술집, 뒤뜰의 목조 별채와 안뜰 정원 (오라리오)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 192, D = 192, Hh = 144;
  MAPS.push({
    id: 'mistress', cat: 'orario', name: '풍요의 여주인', en: 'The Hostess of Fertility', color: '#c8884a', seed: 1102, base: 30, time: 'day', size: [W, D, Hh],
    desc: '서쪽 큰길 벽돌길 가에 선 2층 술집. 조각을 새긴 여닫이문과 포크·나이프 간판이 손님을 맞고, 낮에는 시민들이, 밤에는 모험가들이 북적인다. 뒤뜰에는 목조 별채와 비어 있는 안뜰 정원이 있다.',
    info: { title: '장소 정보', en: 'ORARIO', rows: [['자리', '서쪽 큰길 · 벽돌길'], ['주인', '은퇴한 드워프 모험가'], ['소문', '행패 부린 손님은 길바닥으로 내던져진다']] },
    sky: ['#d8eaf6', '#6a9ac8', '#fff4dc'], stars: false,
    hemi: ['#fff6e8', '#5a5040', 0.62], sun: ['#fff0d8', 0.76, [0.5, 1, 0.55]],
    night: { sky: ['#30304e', '#0a0a18', '#e8a868'], stars: true, hemi: ['#c0b8d0', '#1c1814', 0.46], sun: ['#d8e0ff', 0.34, [0.5, 1, 0.55]], haze: '#2a2a36' },
    liquid: ['#5a8aa8', '#8ac0d8', '#e8f8ff'], liqSpeed: 0.5,
    fog: { start: 0.8, floor: 14, depth: 8, haze: [36, 0.16, 8], hazeColor: '#e8e4d8' },
    camY: 12, zoom: 1.9,
    particles: [
      { n: 90, colors: ['#e8e4dc', '#d0ccc4', '#bcb8b0'], mode: 'rise', speed: 0.35, area: [114, 63, 1.5], y0: 66, y1: 104, glow: false, size: 2 },
      { n: 120, colors: ['#ffffff', '#ffe8f0', '#f0c84a'], mode: 'drift', speed: 0.35, wind: 0.4, area: [96, 40, 22], y0: 32, y1: 50, glow: false },
    ],
    blocks: Object.assign(OR.blocks(), {
      beam: { c: '#4a3426', v: 0.04 }, carve: { c: '#6a4a30', v: 0.08, pat: 'stone' }, carve2: { c: '#8a6844', v: 0.06 }, plasterT: { c: '#f2ead8', v: 0.03 },
      glassB: { c: '#ffd890', night: true, day: '#4a6a9a' }, plank: { c: '#7a5a3a', top: '#9a7448', v: 0.05, pat: 'plank' }, stoneF: { c: '#8a8478', v: 0.05, pat: 'brick' },
      bottleG: { c: '#4a9a5a', v: 0.03 }, bottleR: { c: '#a83a3a', v: 0.03 }, bottleA: { c: '#d89a3a', v: 0.03 }, barrel: { c: '#7a5232', v: 0.05, pat: 'log' },
      sign: { c: '#3a6a4a', v: 0.03 }, signT: { c: '#f0ece0', v: 0.02 }, metal: { c: '#cfcfca', v: 0.02 }, fire: { c: '#ffb050', glow: true }, plant: { c: '#4a8a3a', v: 0.08 },
      apple: { c: '#d8403a', v: 0.05 }, orange: { c: '#f0a030', v: 0.05 }, linen: { c: '#f4f0e6', v: 0.02 }, slate: { c: '#6a5a78', v: 0.05, pat: 'tile' }, well: { c: '#9a948c', v: 0.05, pat: 'brick' },
    }),
    build(w) {
      const B = w.id, n = w.noise, G = w.base;
      const SZ0 = 98, SZ1 = 114;                              // 서쪽 큰길(동서 방향)
      const X0 = 70, X1 = 122, Z0 = 58, Z1 = 92, CXm = 96;    // 술집 본채(정면은 남쪽 큰길)
      const F1 = G + 8, F2 = G + 16;                          // 1층 천장(2층 바닥) · 2층 꼭대기
      MH.terrain(w, { floor: G - 6, height: () => G, surface: () => B.pave, under: (x, z, y, dep) => dep < 2 ? B.soil : B.rock });
      const lights = [], acts = [], landmarks = [];

      // ── 길과 앞마당: 벽돌 큰길, 술집 앞 넓은 돌마당, 분수 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        let b = B.pave;
        if (z >= SZ0 && z <= SZ1) b = (z === SZ0 || z === SZ1) ? B.curb : ((x * 3 + z) % 11 === 0 ? B.paveL : B.brick);
        else if (z > 92 && z < SZ0 && x > 56 && x < 136) b = ((x >> 2) + (z >> 2)) & 1 ? B.paveL : B.pave;
        else if (z > SZ1 && z < 132 && x > 64 && x < 128) b = ((x >> 2) + (z >> 2)) & 1 ? B.paveL : B.pave;
        w.set(x, G, z, b);
      }
      const fp = OR.fountain(w, 96, 122, 4.2, B.trimW, B.stoneG, { h: 4, bowl: 1.6, top: B.trimW });
      acts.push({
        name: '광장 분수', hint: '술집 건너편 돌마당 분수가 물을 뿜어요', hit: [92, G, 118, 100, G + 6, 126],
        run: async a => { for (let k = 0; k < 10; k++) { a.burst(fp, { n: 20, colors: ['#e8f8ff', '#8ac0d8', '#ffffff'], speed: 1.6, up: 6, life: 1.4, gravity: 9, spread: 0.6 }); await a.wait(0.3); } },
      });

      // ── 본채 1층: 돌 받침, 목골과 회반죽, 푸른 유리 큰 창, 조각 문틀의 여닫이문 ──
      w.box(X0, G, Z0, X1, G, Z1, B.stoneF);
      for (let y = G + 1; y <= F1; y++) for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (x !== X0 && x !== X1 && z !== Z0 && z !== Z1) continue;
        const fb = z === Z0 || z === Z1, post = fb ? ((x - X0) % 8 === 0 || x === X1) : ((z - Z0) % 8 === 0 || z === Z1);
        let b = y <= G + 1 ? B.stoneF : (post || y === F1 ? B.beam : B.plasterT);
        if (z === Z1 && y >= G + 2 && y <= G + 6 && !post && Math.abs(x - CXm) > 2) b = B.glassB;             // 정면 큰 창
        if ((x === X0 || x === X1) && y >= G + 3 && y <= G + 6 && (z - Z0) % 8 >= 3 && (z - Z0) % 8 <= 5) b = B.glassB;
        w.set(x, y, z, b);
      }
      // 가운데 조각 기둥(정면 가운데, 박공 꼭대기까지)
      // 여닫이문(부품): 왼쪽 가운데. 문틀에 조각
      const DX0 = 84, DX1 = 89;
      for (let x = DX0 - 1; x <= DX1 + 1; x++) for (let y = G + 1; y <= G + 7; y++) w.set(x, y, Z1, (x === DX0 - 1 || x === DX1 + 1 || y === G + 7) ? B.carve : 0);
      const doorL = w.prop({ name: 'doorL', pivot: [DX0, G + 1, Z1 + 0.5] }), doorR = w.prop({ name: 'doorR', pivot: [DX1 + 1, G + 1, Z1 + 0.5] });
      for (let x = DX0; x <= DX1; x++) for (let y = G + 1; y <= G + 6; y++) (x < (DX0 + DX1 + 1) / 2 ? doorL : doorR).set(x, y, Z1, y === G + 4 || y === G + 1 ? B.carve2 : B.door);
      w.box(DX0 - 2, G, Z1 + 1, DX1 + 2, G, Z1 + 2, B.stoneF);                                           // 문 앞 디딤돌
      // 왼쪽 간판판과 돌출 간판(부품: 포크와 나이프)
      w.box(76, G + 4, Z1 + 1, 81, G + 6, Z1 + 1, B.sign); w.box(77, G + 5, Z1 + 1, 80, G + 5, Z1 + 1, B.signT);
      // 발코니 밑에 매단 돌출 간판: 판 위에 엇갈린 포크와 나이프
      w.box(80, F1, Z1 + 1, 80, F1, Z1 + 5, B.iron);
      const hang = w.prop({ name: 'hangSign', pivot: [80.5, F1, Z1 + 4], axis: 'z', rock: 0.06, rockSpeed: 1.1 });
      hang.box(80, F1 - 1, Z1 + 4, 80, F1 - 1, Z1 + 4, B.iron); hang.box(80, F1 - 6, Z1 + 2, 80, F1 - 2, Z1 + 6, B.sign);
      for (let k = 0; k < 4; k++) { hang.set(80, F1 - 5 + k, Z1 + 2 + 1 + k, B.metal); hang.set(80, F1 - 5 + k, Z1 + 6 - 1 - k, B.metal); }
      acts.push({
        name: '포크와 나이프 간판', hint: '포크와 나이프가 그려진 돌출 간판이 바람에 흔들려요', hit: [79, F1 - 6, Z1 + 2, 81, F1, Z1 + 6],
        run: async a => { for (let k = 0; k < 4; k++) { await a.turn('hangSign', [0, 0, 0.5], 0.35); await a.turn('hangSign', [0, 0, -0.45], 0.4); } await a.turn('hangSign', [0, 0, 0], 0.4); },
      });

      // ── 1층 안: 판자 바닥, 안쪽 벽의 바 카운터와 술병 선반, 탁자와 걸상, 술통, 주방 화덕 ──
      for (let z = Z0 + 1; z < Z1; z++) for (let x = X0 + 1; x < X1; x++) w.set(x, G, z, B.plank);
      w.box(X0 + 6, G + 1, Z0 + 6, X1 - 18, G + 3, Z0 + 7, B.carve2); w.box(X0 + 6, G + 4, Z0 + 6, X1 - 18, G + 4, Z0 + 7, B.beam);
      for (let x = X0 + 2; x <= X1 - 16; x++) for (let y = G + 2; y <= G + 7; y += 2) { w.set(x, y, Z0 + 1, B.beam); if (y < G + 7) w.set(x, y + 1, Z0 + 1, [B.bottleG, B.bottleR, B.bottleA, 0][(x * 7 + y) % 4]); }
      const tables = [];
      for (let tz = Z0 + 12; tz <= Z1 - 6; tz += 7) for (let tx = X0 + 6; tx <= X1 - 8; tx += 8) {
        if (Math.abs(tx - DX0) < 4 && tz > Z1 - 10) continue;
        w.box(tx, G + 1, tz, tx, G + 2, tz, B.beam); w.box(tx - 1, G + 3, tz - 1, tx + 1, G + 3, tz + 1, B.carve2);
        for (const [sx, sz] of [[-2, 0], [2, 0], [0, -2], [0, 2]]) w.set(tx + sx, G + 1, tz + sz, B.barrel);
        tables.push([tx, tz]);
      }
      for (const [x, z] of [[X0 + 2, Z1 - 3], [X0 + 2, Z1 - 5], [X0 + 4, Z1 - 3]]) w.box(x, G + 1, z, x, G + 3, z, B.barrel);
      for (let x = X0 + 2; x < X1; x += 8) for (const z of [Z0 + 3, Z1 - 1]) if (hash3(x, 2, z) > 0.4) w.set(x, F1 - 1, z, B.plant);
      // 주방(북동쪽): 화덕과 굴뚝
      const KX = X1 - 8, KZ = Z0 + 5;
      w.box(X1 - 15, G + 1, Z0 + 1, X1 - 15, G + 7, Z0 + 12, B.plasterT); w.box(X1 - 15, G + 1, Z0 + 9, X1 - 15, G + 5, Z0 + 10, 0);
      w.box(KX - 2, G + 1, Z0 + 1, KX + 2, G + 3, Z0 + 3, B.stoneF); w.box(KX - 1, G + 2, Z0 + 2, KX + 1, G + 2, Z0 + 3, B.fire);
      lights.push({ name: 'kitchen', p: [KX + 0.5, G + 4, Z0 + 4.5], c: '#ffa850', i: 0.6, d: 18, flicker: 0.4, srcR: 4 });
      lights.push({ name: 'tavern', p: [CXm + 0.5, G + 5, Z1 - 8.5], c: '#ffd090', i: 0.5, d: 30, flicker: 0.15, srcR: 30 });

      // ── 2층과 지붕(부품): 들어 올리면 1층 술집 안이 보인다 ──
      const up = w.prop({ name: 'upper', pivot: [CXm + 0.5, F1 + 1, (Z0 + Z1) / 2], clipOK: 400 });
      up.box(X0, F1 + 1, Z0, X1, F1 + 1, Z1, B.plank);                                                     // 2층 바닥
      for (let y = F1 + 2; y <= F2; y++) for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (x !== X0 && x !== X1 && z !== Z0 && z !== Z1) continue;
        const post = (x - X0) % 8 === 0 || x === X1 || ((x === X0 || x === X1) && (z - Z0) % 8 === 0);
        let b = (post || y === F2) ? B.beam : B.plasterT;
        if (!post && y >= F1 + 3 && y <= F1 + 6 && (z === Z1 || z === Z0) && (x - X0) % 8 >= 2 && (x - X0) % 8 <= 6) b = B.glassB;
        if (!post && y >= F1 + 4 && y <= F1 + 6 && (x === X0 || x === X1) && (z - Z0) % 8 >= 3 && (z - Z0) % 8 <= 5) b = B.glassB;
        if (z === Z1 && !post && y === F1 + 2 && (x & 1)) b = B.carve;                                     // 정면 띠 조각
        up.set(x, y, z, b);
      }
      // 발코니: 2층 정면을 가로지르는 나무 발코니와 난간, 받침 까치발
      for (let x = X0 + 2; x <= X1 - 2; x++) {
        up.box(x, F1 + 1, Z1 + 1, x, F1 + 1, Z1 + 3, B.plank);
        up.set(x, F1 + 2, Z1 + 3, x % 2 ? B.beam : 0); up.set(x, F1 + 3, Z1 + 3, B.beam);
        if ((x - X0) % 8 === 0) up.set(x, F1, Z1 + 1, B.beam);
      }
      // 박공(앞뒤 박공벽에 목골, 다락 창), 지붕(용마루는 남북 방향)
      const TOPY = F2 + 1, peak = (() => { const tmp = { set: (x, y, z, b) => up.set(x, y, z, b) }; return OR.gable(tmp, X0 - 2, X1 + 2, Z0 - 2, Z1 + 3, TOPY, { axis: 'z', run: 2, b: B.roofB, eave: B.roofDk, ridge: B.roofDk }); })();
      for (const gz of [Z0, Z1]) for (let x = X0; x <= X1; x++) {
        const hh = Math.floor(Math.min(x - (X0 - 2), (X1 + 2) - x) / 2);
        for (let y = TOPY; y < TOPY + hh; y++) {
          let b = ((x - X0) % 8 === 0 || (y - TOPY) % 5 === 4) ? B.beam : B.plasterT;
          if (Math.abs(x - CXm) >= 4 && Math.abs(x - CXm) <= 9 && y >= TOPY + 3 && y <= TOPY + 5) b = B.glassB;
          up.set(x, y, gz, b);
        }
      }
      // 가운데 조각 기둥(정면 한가운데, 땅에서 박공 꼭대기까지): 아래는 본채, 위는 부품
      for (let y = G + 1; y <= peak; y++) for (let dx = -1; dx <= 1; dx++) {
        const b = (dx === 0 || (y + dx) % 3 === 0) ? ((y % 4 === 0) ? B.carve2 : B.carve) : B.beam;
        if (y <= F1) w.set(CXm + dx, y, Z1 + 1, b); else up.set(CXm + dx, y, Z1 + 1, b);
      }
      // 굴뚝(주방 위)
      for (let y = TOPY; y <= peak + 4; y++) up.box(KX - 1, y, Z0 + 4, KX, y, Z0 + 5, B.chimney);
      acts.push({
        name: '지붕 들어 올리기', hint: '2층과 지붕이 통째로 들려 뒤로 비켜나며 1층 술집 안 바 카운터와 탁자가 드러나요', hit: [X0 + 4, TOPY + 2, Z0 + 8, X1 - 4, peak, Z1 - 8],
        run: async a => {
          await a.tween('upper', { off: [-10, 34, -22], rot: [0.12, 0, -0.05] }, 2.2);
          a.flash('tavern', 4, 4); a.glow(1.3, 4);
          for (const [tx, tz] of tables) { a.burst([tx + 0.5, G + 4.5, tz + 0.5], { n: 10, colors: ['#ffe8b0', '#ffffff', '#ffd060'], speed: 1.2, up: 3, life: 1.1, gravity: 2, spread: 0.8 }); await a.wait(0.12); }
          await a.wait(1.6);
          await a.tween('upper', { off: [0, 0, 0], rot: [0, 0, 0] }, 2);
        },
      });
      acts.push({
        name: '여닫이문', hint: '조각 문틀의 여닫이문이 활짝 열리며 술집 안 웃음소리와 불빛이 쏟아져 나와요', hit: [DX0 - 1, G + 1, Z1, DX1 + 1, G + 7, Z1 + 1],
        run: async a => {
          await Promise.all([a.turn('doorL', [0, -1.4, 0], 0.8), a.turn('doorR', [0, 1.4, 0], 0.8)]);
          a.flash('tavern', 6, 3);
          for (let k = 0; k < 8; k++) { a.burst([(DX0 + DX1) / 2 + 0.5, G + 4, Z1 + 1.5], { n: 14, colors: ['#ffd090', '#ffe8b0', '#ffffff'], speed: 2.4, up: 2, life: 1.2, gravity: 1, spread: 1.2 }); await a.wait(0.25); }
          await Promise.all([a.turn('doorL', [0, 0, 0], 0.9), a.turn('doorR', [0, 0, 0], 0.9)]);
        },
      });
      acts.push({
        name: '주방 굴뚝', hint: '주방 화덕에 불이 확 붙으며 굴뚝으로 연기가 뭉게뭉게 피어올라요', hit: [KX - 2, peak - 2, Z0 + 3, KX + 1, peak + 5, Z0 + 6],
        run: async a => { a.flash('kitchen', 5, 4); for (let k = 0; k < 12; k++) { a.burst([KX + 0.5, peak + 6, Z0 + 5], { n: 14, colors: ['#e8e4dc', '#d0ccc4', '#ffffff'], speed: 0.6, up: 4, life: 2.6, gravity: -0.4, spread: 0.8 }); await a.wait(0.3); } },
      });
      // 내던져지는 의자(부품): 문 밖으로 날아가 길바닥을 구른다
      const chair = w.prop({ name: 'chair', pivot: [DX0 + 2.5, G + 2, Z1 - 2.5], clipOK: 20 });
      chair.box(DX0 + 2, G + 1, Z1 - 3, DX0 + 3, G + 1, Z1 - 2, B.carve2); chair.box(DX0 + 2, G + 2, Z1 - 3, DX0 + 3, G + 3, Z1 - 3, B.carve2);
      acts.push({
        name: '내던져진 손님', hint: '행패 부린 손님 대신 의자 하나가 문밖으로 날아가 길바닥을 데굴데굴 굴러요', hit: [DX0 + 1, G + 1, Z1 - 4, DX0 + 4, G + 4, Z1 - 1],
        run: async a => {
          const o = Promise.all([a.turn('doorL', [0, -1.4, 0], 0.4), a.turn('doorR', [0, 1.4, 0], 0.4)]); await o;
          await a.tween('chair', { off: [1, 4, 8], rot: [1.6, 0, 0.4] }, 0.4); await a.tween('chair', { off: [2, -1, 14], rot: [3.2, 0, 0.8] }, 0.35);
          a.burst([DX0 + 4.5, G + 1, Z1 + 12], { n: 20, colors: ['#c8bea8', '#a89c88'], speed: 2.4, up: 1, life: 0.8, gravity: 4, spread: 1, flat: true });
          await a.tween('chair', { off: [3, -1, 20], rot: [5.6, 0, 1.2] }, 0.5);
          await a.wait(1); await a.tween('chair', { scl: [0, 0, 0] }, 0.3);
          await a.move('chair', [0, 0, 0], 0.05); a.unwind('chair'); await a.turn('chair', [0, 0, 0], 0.05);
          await Promise.all([a.tween('chair', { scl: [1, 1, 1] }, 0.4), a.turn('doorL', [0, 0, 0], 0.6), a.turn('doorR', [0, 0, 0], 0.6)]);
        },
      });
      landmarks.push({ name: '풍요의 여주인', note: '서쪽 큰길의 술집', p: [CXm + 0.5, peak + 10, (Z0 + Z1) / 2], boss: true });

      // ── 뒤뜰: 목조 별채(ㄷ자)와 비어 있는 안뜰 정원(일부는 돌을 깐 자리), 우물, 빨랫줄 ──
      const AZ0 = 18, AZ1 = Z0 - 2;
      const annex = (x0, z0, x1, z1) => {
        w.box(x0, G, z0, x1, G, z1, B.stoneF);
        for (let y = G + 1; y <= G + 7; y++) w.walls(x0, y, z0, x1, y, z1, (y === G + 7) ? B.beam : B.plank);
        for (let x = x0 + 2; x <= x1 - 2; x += 4) for (const z of [z0, z1]) w.box(x, G + 3, z, x, G + 5, z, B.win);
        for (let z = z0 + 2; z <= z1 - 2; z += 4) for (const x of [x0, x1]) w.box(x, G + 3, z, x, G + 5, z, B.win);
        MH.roof(w, x0 - 1, x1 + 1, z0 - 1, z1 + 1, G + 8, { b: B.roofB, eave: B.roofDk, ridge: B.roofDk, pitch: 1, gable: B.plank });
      };
      annex(X0, AZ0, X1, AZ0 + 8); annex(X0, AZ0 + 9, X0 + 8, AZ1); annex(X1 - 8, AZ0 + 9, X1, AZ1);
      const GX0 = X0 + 9, GX1 = X1 - 9, GZ0 = AZ0 + 9, GZ1 = AZ1;
      for (let z = GZ0; z <= GZ1; z++) for (let x = GX0; x <= GX1; x++) w.set(x, G, z, x < GX0 + 14 && z > GZ0 + 6 ? ((x + z) & 1 ? B.pave : B.paveL) : (hash3(x, 4, z) > 0.88 ? B.flowerY : B.grass));
      for (let x = GX0 + 18; x <= GX1 - 2; x += 3) for (const z of [GZ0 + 1, GZ1 - 1]) MH.bush(w, x, G, z, 1.2, [B.leafL, B.leaf, B.leaf2]);
      const wx = GX1 - 8, wz = (GZ0 + GZ1) >> 1;
      w.ring(wx, wz, G + 1, 0.9, 2.2, B.well); w.ring(wx, wz, G + 2, 0.9, 2.2, B.well); w.set(wx, G, wz, B.iron); w.liquid(wx, wz, G + 1); w.set(wx, G + 1, wz, 0);
      for (const s of [-2, 2]) w.box(wx + s, G + 3, wz, wx + s, G + 5, wz, B.beam); w.box(wx - 2, G + 6, wz, wx + 2, G + 6, wz, B.beam);
      const lineZ = GZ0 + 3, LX0 = GX0 + 13, LX1 = GX1 - 4; w.box(LX0, G + 1, lineZ, LX0, G + 6, lineZ, B.beam); w.box(LX1, G + 1, lineZ, LX1, G + 6, lineZ, B.beam);
      const laundry = w.prop({ name: 'laundry', pivot: [(LX0 + LX1) / 2, G + 6, lineZ + 0.5], axis: 'x', rock: 0.05, rockSpeed: 0.8 });
      for (let x = LX0 + 1; x < LX1; x++) { laundry.set(x, G + 6, lineZ, B.beam); if ((x - GX0) % 5 < 3) laundry.box(x, G + 3, lineZ, x, G + 5, lineZ, (x % 2) ? B.linen : B.awnR); }
      lights.push({ name: 'garden', p: [(GX0 + GX1) / 2, G + 6, (GZ0 + GZ1) / 2], c: '#ffe8c0', i: 0.3, d: 24, flicker: 0.1, srcR: 30 });
      acts.push({
        name: '안뜰 정원', hint: '뒤뜰 안뜰에 바람이 불어 빨래가 펄럭이고 꽃잎이 날려요', hit: [LX0 + 1, G + 2, lineZ - 1, LX1 - 1, G + 6, lineZ + 1],
        run: async a => { a.wind(2.4, 3); for (let k = 0; k < 3; k++) { await a.turn('laundry', [0.95, 0, 0], 0.5); await a.turn('laundry', [-0.5, 0, 0], 0.5); } await a.turn('laundry', [0, 0, 0], 0.5); for (let k = 0; k < 6; k++) a.burst([GX0 + 22 + k * 4, G + 3, GZ1 - 4], { n: 10, colors: ['#ffffff', '#f0c84a', '#ffe8f0'], speed: 2, up: 2, life: 2, gravity: 0.6, spread: 1.5, flat: true }); },
      });
      landmarks.push({ name: '안뜰 정원', note: '목조 별채로 둘러싸인 빈 정원', p: [(GX0 + GX1) / 2, G + 18, (GZ0 + GZ1) / 2] });

      // ── 큰길 가: 이웃 목골집들(오른쪽 하나는 보라 슬레이트 지붕), 맞은편 낮은 집, 노점, 가로등 ──
      OR.house(w, B, { x: 52, z: 66, sx: 15, sz: 24, floors: 4, fh: 6, face: 's', kind: 0, roofB: B.roofR, axis: 'z' });
      OR.house(w, B, { x: 126, z: 74, sx: 12, sz: 18, floors: 2, fh: 6, face: 's', kind: 2, roofB: B.slate, axis: 'x' });
      OR.house(w, B, { x: 141, z: 64, sx: 14, sz: 26, floors: 4, fh: 6, face: 's', kind: 0, roofB: B.roofB, axis: 'z' });
      const placed = [[52, 66, 67, 90], [126, 74, 138, 92], [141, 64, 155, 90], [X0 - 2, AZ0 - 2, X1 + 2, Z1 + 4], [56, 92, 136, 132]];
      OR.fill(w, B, { placed, x0: 3, z0: 3, x1: W - 4, z1: SZ0 - 3, tries: 500, floors: [3, 4], ok: (x, z) => z < SZ0 - 2 && x > 2 && x < W - 3 && z > 2, face: () => 's' });
      OR.fill(w, B, { placed, x0: 3, z0: SZ1 + 3, x1: W - 4, z1: D - 4, tries: 500, floors: [1, 2], ok: (x, z) => z > SZ1 + 2 && x > 2 && x < W - 3 && z < D - 3, face: () => 'n' });
      // 노점: 과일과 꽃(맞은편 돌마당 가장자리)
      const stalls = [];
      for (const [sx, sz, goods] of [[68, 120, [B.apple, B.orange]], [118, 120, [B.flowerR, B.flowerY]], [76, 128, [B.orange, B.apple]]]) {
        w.box(sx, G + 1, sz, sx + 5, G + 2, sz + 3, B.plank);
        for (const [x, z] of [[sx, sz], [sx + 5, sz], [sx, sz + 3], [sx + 5, sz + 3]]) w.box(x, G + 3, z, x, G + 5, z, B.beam);
        for (let x = sx - 1; x <= sx + 6; x++) for (let z = sz - 1; z <= sz + 4; z++) w.set(x, G + 6, z, (x & 1) ? B.awnR : B.awnW);
        for (let x = sx + 1; x <= sx + 4; x++) for (let z = sz + 1; z <= sz + 2; z++) w.set(x, G + 3, z, goods[(x + z) & 1]);
        stalls.push([sx, sz]);
      }
      acts.push({
        name: '과일 노점', hint: '돌마당 노점에 바람이 불어 차양이 펄럭이고 과일이 굴러떨어져요', hit: [stalls[0][0], G + 1, stalls[0][1], stalls[0][0] + 5, G + 6, stalls[0][1] + 3],
        run: async a => { a.wind(2, 2.4); for (const [sx, sz] of stalls) { a.burst([sx + 2.5, G + 7, sz + 1.5], { n: 14, colors: ['#c84a3a', '#f2ece0'], speed: 2.4, up: 1, life: 1, gravity: 3, spread: 2, flat: true }); a.burst([sx + 2.5, G + 4, sz + 1.5], { n: 8, colors: ['#d8403a', '#f0a030'], speed: 2, up: 2, life: 1, gravity: 9, spread: 1 }); await a.wait(0.35); } },
      });
      const lamps = [];
      for (let x = 10; x < W - 8; x += 16) for (const z of [SZ0 - 2, SZ1 + 2]) { if (z === SZ0 - 2 && x > X0 - 6 && x < X1 + 6) continue; lamps.push(OR.lamp(w, B, x, z, 5)); }
      for (const x of [X0 - 3, X1 + 3]) lamps.push(OR.lamp(w, B, x, Z1 + 3, 5));
      lights.push({ name: 'lamps', p: [X0 - 2.5, G + 7, Z1 + 3.5], c: '#ffe0a0', i: 0.4, d: 22, flicker: 0.1, srcR: 3 });
      lights.push({ name: 'lamps', p: [X1 + 3.5, G + 7, Z1 + 3.5], c: '#ffe0a0', i: 0.4, d: 22, flicker: 0.1, srcR: 3 });
      acts.push({
        name: '큰길 마석등', hint: '서쪽 큰길을 따라 마석등이 차례로 켜져요', hit: [X0 - 4, G + 1, Z1 + 2, X0 - 2, G + 8, Z1 + 4],
        run: async a => { a.flash('lamps', 3, 4); for (const p of lamps.slice().sort((p, q) => p[0] - q[0])) { a.burst(p, { n: 10, colors: ['#fff0c0', '#ffe08a', '#ffffff'], speed: 1, up: 1.5, life: 1, gravity: -0.3, spread: 0.6 }); await a.wait(0.08); } },
      });
      // 이정표: 큰길 동쪽 끝으로 가면 중앙 광장
      const sp = OR.signpost(w, B, X1 + 9, SZ0 - 3, { dir: [1, 0], boards: 1 });
      acts.push(OR.goAct({ at: sp, name: '중앙 광장 · 바벨로', goto: 'babel', hint: '서쪽 큰길을 따라 동쪽으로 가면 오라리오 한가운데 중앙 광장과 바벨이 나와요' }));
      return { lights, landmarks, acts };
    },
  });
})();
