// 점성술사의 집(하위 지도) — 천문대 언덕 남동쪽, 남색 돔 지붕을 인 흰 대리석 집의 속. 가운데 별자리 깔개 위 수정구 탁자,
// 서쪽 벽의 별자리 서재와 독서대, 북서쪽 다락의 돔 망원경실(계단), 동쪽의 타로 탁자·향로·별빛 등. 남·동쪽(시점 쪽) 벽은 낮게 잘랐다 (천문대 언덕의 하위 지도)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 64, D = 64, Hh = 40, G = 10;
  const X0 = 21, X1 = 42, Z0 = 22, Z1 = 41;                    // 바깥 벽선(안쪽은 x22..41, z23..40)
  MAPS.push({
    id: 'stellaris-astrologer', cat: 'magic', sub: true, parent: 'stellaris', name: '점성술사의 집', en: 'Stellaris · Astrologer\'s House', color: '#8a7ad8', seed: 3272, base: G, time: 'night', size: [W, D, Hh],
    desc: '천문대 언덕 남동쪽, 남색 돔 지붕을 인 점성술사의 집. 별자리를 수놓은 깔개 위에 수정구 탁자가 놓였고, 서쪽 벽은 별자리 책으로 가득하다. 북서쪽 계단을 오르면 돔 아래 다락에 작은 망원경이 숨어 있어, 밤이면 돔을 열고 하늘을 내다본다.',
    info: { title: '장소 정보', en: 'ASTROLOGER', rows: [['점성실', '수정구 탁자 · 타로 카드 · 향로'], ['서재', '별자리 책장과 독서대'], ['다락', '돔 망원경실(북서쪽 계단)'], ['별빛 등', '천장에 별자리를 비춘다']] },
    sky: ['#0a1430', '#02040c', '#3a5aa0'], stars: true,
    hemi: ['#b8b0e8', '#181428', 0.6], sun: ['#c0d8ff', 0.44, [0.45, 1, 0.5]],
    day: { sky: ['#c8d8f0', '#5a80c0', '#f4f8ff'], stars: false, hemi: ['#f4f2ff', '#4a4860', 0.62], sun: ['#fff6e4', 0.7, [0.45, 1, 0.5]], haze: '#c8d0e8' },
    fog: { start: 0.96, floor: G - 8, depth: 4, haze: [8, 0.18, 6], hazeColor: '#1e1a40' },
    camY: 0, zoom: 2.3,
    particles: [
      { n: 70, colors: ['#e0d0ff', '#ffffff', '#ffd890'], mode: 'drift', speed: 0.1, wind: 0.1, area: [32, 32, 10], y0: G + 2, y1: G + 10, glow: true },
      { n: 24, colors: ['#c8c0d8', '#a898c0'], mode: 'rise', speed: 0.25, area: [39.5, 27.5, 0.6], y0: G + 4, y1: G + 10, glow: false },
    ],
    blocks: {
      ground: { c: '#3a3a44', top: '#3a5a5a', v: 0.1 }, ground2: { c: '#3a3a44', top: '#34504e', v: 0.1 }, rock: { c: '#4a5068', v: 0.06, pat: 'big' }, path: { c: '#3a3a44', top: '#6a7088', v: 0.08, pat: 'stone' },
      marble: { c: '#c8d0e0', v: 0.04, pat: 'big' }, marbleDk: { c: '#8a94a8', v: 0.05, pat: 'brick' }, trim: { c: '#e4eaf4', v: 0.03 }, roofN: { c: '#1a2a5a', v: 0.05, pat: 'tile' },
      floorW: { c: '#5a4038', top: '#6e5044', v: 0.05, pat: 'plank' }, wood: { c: '#4a3a3a', v: 0.05, pat: 'plank' }, woodL: { c: '#7a5a48', v: 0.05, pat: 'plank' },
      silver: { c: '#c8d4e0', v: 0.04 }, brass: { c: '#c8a050', v: 0.07 }, brassDk: { c: '#8a6a30', v: 0.06 }, iron: { c: '#2a2e3c', v: 0.03 }, door: { c: '#1a1a2a', v: 0.02, pat: 'plank' },
      win: { c: '#b8d0ff', night: true, day: '#7a90b8' }, lamp: { c: '#d0e0ff', night: true, day: '#a8b4c8' }, lanternB: { c: '#ffd890', glow: true },
      starG: { c: '#fff8d0', glow: true }, starB: { c: '#8ab8ff', glow: true }, lens: { c: '#a0d8ff', glow: true }, orbG: { c: '#c0a0ff', glow: true }, ember: { c: '#ff8a3a', glow: true },
      rug: { c: '#2a3a8a', v: 0.04 }, rugE: { c: '#5a3a8a', v: 0.04 }, cloth3: { c: '#5a3a8a', v: 0.04 }, clothR: { c: '#7a2a4a', v: 0.04 },
      bookR: { c: '#7a2a3a', v: 0.05 }, bookB: { c: '#2a3a7a', v: 0.05 }, bookG: { c: '#3a5a3a', v: 0.05 }, bookP: { c: '#5a3a7a', v: 0.05 }, paper: { c: '#ece4cc', v: 0.03 },
      card: { c: '#f0e8d8', v: 0.02 }, cardB: { c: '#3a2a6a', v: 0.03 }, jarG: { c: '#6ac0a0', v: 0.03 }, jarP: { c: '#b080d0', v: 0.03 }, jarA: { c: '#d8a040', v: 0.03 }, leaf: { c: '#3a6a70', v: 0.1 },
      stoneG: { c: '#4a5068', v: 0.05 }, timber: { c: '#4a3a3a', v: 0.05 }, gold: { c: '#c8a050', v: 0.05 }, mlamp: { c: '#d0e0ff', night: true, day: '#a8b4c8' },
    },
    build(w) {
      const B = w.id;
      const lights = [], acts = [], landmarks = [];
      MH.terrain(w, {
        floor: G - 6, height: () => G,
        surface: (x, z) => (x >= X0 && x <= X1 && z >= Z0 && z <= Z1) ? B.floorW : (hash3(x, 3, z) > 0.75 ? B.ground2 : B.ground),
        under: (x, z, y, dep) => dep < 2 ? B.marbleDk : B.rock,
      });
      // ── 벽: 북·서는 높고(창과 등), 남·동은 낮다. 모서리는 흰 귀돌 ──
      const HI = G + 10, LO = G + 4;
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (x !== X0 && x !== X1 && z !== Z0 && z !== Z1) continue;
        const hi = z === Z0 || x === X0, top = hi ? HI : LO;
        for (let y = G + 1; y <= top; y++) {
          let b = y === top ? B.trim : (y === G + 1 ? B.marbleDk : B.marble);
          if ((x === X0 || x === X1) && (z === Z0 || z === Z1)) b = (y & 1) ? B.trim : B.marbleDk;
          else if (y === G + 7 && hi) b = B.marbleDk;
          w.set(x, y, z, b);
        }
      }
      // 창: 북쪽 벽 두 곳, 서쪽 벽 한 곳(높은 창)
      for (const x of [26, 37]) w.box(x, G + 4, Z0, x + 1, G + 6, Z0, B.win);
      w.box(X0, G + 7, 33, X0, G + 9, 34, B.win); w.set(X0, G + 7, 33, B.marbleDk); w.set(X0, G + 7, 34, B.marbleDk);
      // 남·동 낮은 벽에도 작은 창(창턱)
      for (const x of [27, 35]) w.box(x, G + 2, Z1, x + 1, G + 3, Z1, B.win);
      w.box(X1, G + 2, 30, X1, G + 3, 31, B.win);
      // 처마 띠(높은 벽 위)
      for (let x = X0; x <= X1; x++) w.set(x, HI + 1, Z0, (x & 1) ? B.trim : 0);
      for (let z = Z0; z <= Z1; z++) w.set(X0, HI + 1, z, (z & 1) ? B.trim : 0);

      // ── 문(북쪽 벽 가운데): 검은 문짝, 흰 문틀, 위에 별, 안쪽 발깔개 ──
      w.box(31, G + 1, Z0, 32, G + 4, Z0, B.door); w.box(30, G + 1, Z0, 30, G + 5, Z0, B.marbleDk); w.box(33, G + 1, Z0, 33, G + 5, Z0, B.marbleDk); w.box(30, G + 5, Z0, 33, G + 5, Z0, B.marbleDk); w.set(31, G + 6, Z0, B.starG); w.set(32, G + 6, Z0, B.starB);
      w.set(30, G + 3, Z0 + 1, B.brassDk); w.set(30, G + 4, Z0 + 1, B.lanternB); w.set(33, G + 3, Z0 + 1, B.brassDk); w.set(33, G + 4, Z0 + 1, B.lanternB);
      for (let x = 30; x <= 33; x++) for (let z = Z0 + 1; z <= Z0 + 2; z++) w.set(x, G, z, B.clothR);
      // 바깥: 문 앞 돌길과 등
      for (let z = Z0 - 6; z < Z0; z++) for (let x = 30; x <= 33; x++) w.set(x, G, z, B.path);
      for (const x of [28, 35]) { w.box(x, G + 1, Z0 - 2, x, G + 4, Z0 - 2, B.iron); w.set(x, G + 5, Z0 - 2, B.lamp); }
      lights.push({ name: 'room', p: [31.5, G + 6, 26.5], c: '#ffd8a0', i: 0.55, d: 30, flicker: 0.15, srcR: 5 });

      // ── 가운데: 별자리 깔개와 수정구 탁자(부품: 수정구) ──
      const TX = 32, TZ = 33;
      for (let dz = -6; dz <= 6; dz++) for (let dx = -6; dx <= 6; dx++) {
        const d = Math.hypot(dx, dz); if (d > 5.6) continue;
        const th = Math.atan2(dz, dx), k = Math.round(th / (Math.PI * 2) * 12), off = Math.abs(th - k * Math.PI / 6) * d;
        w.set(TX + dx, G, TZ + dz, d > 4.8 ? B.rugE : (Math.abs(d - 4) < 0.5 && off < 0.6 ? (k % 2 ? B.starG : B.starB) : (Math.abs(d - 3) < 0.4 ? B.silver : B.rug)));
      }
      w.box(TX, G + 1, TZ, TX, G + 2, TZ, B.wood); w.cyl(TX, TZ, G + 3, G + 3, 2.2, B.cloth3); w.ring(TX, TZ, G + 3, 1.5, 2.2, B.clothR);
      for (const [dx, dz] of [[-2, 2], [2, 2], [-2, -2], [2, -2]]) w.set(TX + dx, G + 2, TZ + dz, B.cloth3);
      const orb = w.prop({ name: 'orb', pivot: [TX + 0.5, G + 5.5, TZ + 0.5], axis: 'y', speed: 0.3 });
      orb.sphere(TX, G + 5, TZ, 1, B.orbG); orb.set(TX, G + 6, TZ, B.starG);
      for (const [x, z] of [[TX - 4, TZ], [TX + 4, TZ]]) { w.set(x, G + 1, z, B.woodL); w.set(x, G + 2, z, B.clothR); }
      lights.push({ name: 'orb', p: [TX + 0.5, G + 5.5, TZ + 0.5], c: '#c0a0ff', i: 0.6, d: 14, flicker: 0.2, srcR: 3 });
      acts.push({
        name: '수정구 점보기', hint: '탁자 위 수정구가 떠올라 빙글 돌며 보랏빛 안개 속에 별의 앞날을 비춰요', hit: [TX - 2, G + 1, TZ - 2, TX + 2, G + 6, TZ + 2],
        run: async a => {
          a.flash('orb', 5, 5); a.glow(1.6, 5);
          await a.move('orb', [0, 1.8, 0], 1);
          a.spin('orb', 14, 3);
          for (let k = 0; k < 10; k++) { const t = k * 0.7; a.burst([TX + 0.5 + Math.cos(t) * 1.6, G + 7, TZ + 0.5 + Math.sin(t) * 1.6], { n: 12, colors: ['#c0a0ff', '#f0e0ff', '#8ab8ff'], speed: 1, up: 1.4, life: 1.4, gravity: -0.3, spread: 0.6 }); await a.wait(0.25); }
          await a.move('orb', [0, 0, 0], 1.2);
        },
      });
      landmarks.push({ name: '수정구 탁자', note: '별자리 깔개 위 점성실', p: [TX + 0.5, G + 14, TZ + 0.5] });

      // ── 서쪽 벽: 별자리 서재(책장)와 독서대(부품: 별자리 책) ──
      for (let z = 37; z <= 40; z++) for (let y = G + 1; y <= G + 8; y++) w.set(X0 + 1, y, z, (y - G) % 3 === 0 ? B.wood : [B.bookR, B.bookB, B.bookG, B.bookP, B.paper][(hash3(z, y, 5) * 5) | 0]);
      for (let x = X0 + 2; x <= X0 + 4; x++) for (let y = G + 1; y <= G + 3; y++) w.set(x, y, Z1 - 1, y === G + 3 ? B.wood : [B.bookB, B.bookP, B.bookR][(hash3(x, y, 9) * 3) | 0]);
      const LX = 26, LZ = 38;
      w.box(LX, G + 1, LZ, LX, G + 2, LZ, B.wood); w.box(LX - 1, G + 3, LZ, LX + 1, G + 3, LZ, B.woodL);
      const book = w.prop({ name: 'starbook', pivot: [LX + 0.5, G + 4, LZ + 0.5] });
      book.box(LX - 1, G + 4, LZ, LX + 1, G + 4, LZ, B.paper); book.set(LX, G + 4, LZ, B.bookB);
      lights.push({ name: 'book', p: [LX + 0.5, G + 5, LZ + 0.5], c: '#8ab8ff', i: 0.3, d: 10, flicker: 0.1, srcR: 5 });
      acts.push({
        name: '별자리 책 펼치기', hint: '독서대의 별자리 책이 떠올라 펼쳐지고, 책장 위로 별자리가 빛으로 그려져요', hit: [LX - 1, G + 1, LZ - 1, LX + 1, G + 5, LZ + 1],
        run: async a => {
          a.flash('book', 6, 4);
          await a.tween('starbook', { off: [0, 2, 0], rot: [-0.6, 0, 0] }, 1);
          const cs = [[-3, 0], [-1.5, 1.5], [0, 0.8], [1.5, 2], [3, 1], [2, -0.5]];
          for (const [u, v] of cs) { a.burst([LX + 0.5 + u, G + 8 + v, LZ - 0.5], { n: 14, colors: ['#ffffff', '#fff8d0', '#8ab8ff'], speed: 1, up: 0, life: 2, gravity: 0, spread: 0.3 }); await a.wait(0.3); }
          await a.wait(0.6);
          await a.tween('starbook', { off: [0, 0, 0], rot: [0, 0, 0] }, 1);
        },
      });

      // ── 북서쪽 다락(돔 망원경실): 계단, 나무 바닥, 난간, 뒤쪽 반 돔, 망원경(부품) ──
      const LY = G + 6;
      w.box(X0 + 1, LY, Z0 + 1, 28, LY, 30, B.woodL); w.box(X0 + 1, LY - 1, Z0 + 1, 28, LY - 1, 30, B.wood);
      for (let x = X0 + 1; x <= 28; x++) { w.set(x, LY + 1, 30, (x & 1) ? B.brassDk : 0); w.set(x, LY + 2, 30, B.brass); }
      for (let z = Z0 + 1; z <= 30; z++) { w.set(28, LY + 1, z, (z & 1) ? B.brassDk : 0); w.set(28, LY + 2, z, B.brass); }
      for (let x = X0 + 1; x <= X0 + 2; x++) { w.set(x, LY + 1, 30, 0); w.set(x, LY + 2, 30, 0); }
      w.box(28, G + 1, 30, 28, LY - 2, 30, B.wood);
      for (let s = 0; s < 5; s++) { const z = 35 - s; w.box(X0 + 1, G + 1, z, X0 + 2, G + 1 + s, z, B.wood); w.box(X0 + 1, G + 1 + s, z, X0 + 2, G + 1 + s, z, B.woodL); }
      // 반 돔(북서쪽 껍질): 남색 기와와 은빛 갈빗대
      const DCX = 25, DCZ = 26;
      // 다락 위 4분의 1 돔: 북서쪽 모서리에 기대어 덮고, 망원경이 나가는 틈이 대각선으로 났다
      for (let y = 0; y <= 10; y++) for (let dz = 0; dz <= 11; dz++) for (let dx = 0; dx <= 11; dx++) {
        const d = Math.hypot(dx, y * 1.15, dz); if (d > 10.6 || d < 9.4) continue;
        if (Math.abs(dx - dz) <= 1 && y > 2) continue;
        const ang = Math.atan2(dz, dx), rib = Math.abs(ang * 8 / Math.PI - Math.round(ang * 8 / Math.PI)) < 0.1 || y === 0;
        w.set(X0 + dx, HI + y, Z0 + dz, rib ? B.silver : B.roofN);
      }
      w.box(DCX, LY + 1, DCZ, DCX, LY + 2, DCZ, B.iron);
      const sc = w.prop({ name: 'dscope', pivot: [DCX + 0.5, LY + 3, DCZ + 0.5], axis: 'y' });
      sc.line(DCX, LY + 3, DCZ, DCX + 2, LY + 6, DCZ + 2, B.brass, 0.6); sc.set(DCX + 3, LY + 7, DCZ + 3, B.lens); sc.set(DCX, LY + 3, DCZ, B.brassDk);
      w.set(23, LY + 1, 24, B.wood); w.box(22, LY + 1, 28, 23, LY + 1, 29, B.wood); w.set(22, LY + 2, 28, B.paper); w.set(23, LY + 2, 29, B.lanternB);
      lights.push({ name: 'scope', p: [DCX + 3.5, LY + 7, DCZ + 3.5], c: '#a0d8ff', i: 0.5, d: 14, flicker: 0.05, srcR: 3 });
      acts.push({
        name: '돔 망원경 올리기', hint: '다락의 작은 망원경이 돔 틈으로 쑥 솟아올라 빙 돌며 별을 찾아요', hit: [DCX - 2, LY + 1, DCZ - 2, DCX + 3, LY + 7, DCZ + 3],
        run: async a => {
          a.flash('scope', 4, 6);
          await a.move('dscope', [0, 4, 0], 1.4);
          await a.turn('dscope', [0, 3.2, 0], 2);
          for (let k = 0; k < 3; k++) { a.burst([DCX - 2, LY + 13, DCZ - 2], { n: 20, colors: ['#ffffff', '#a0d8ff', '#fff8d0'], speed: 3, up: 1.5, life: 1.6, gravity: 0, spread: 2 }); await a.wait(0.4); }
          await a.turn('dscope', [0, 6.283, 0], 2); a.unwind('dscope');
          await a.move('dscope', [0, 0, 0], 1.2);
        },
      });
      landmarks.push({ name: '돔 망원경실', note: '다락 · 북서쪽 계단', p: [DCX + 0.5, LY + 14, DCZ + 0.5] });

      // ── 북쪽 벽 동편: 약병과 별가루 선반 ──
      for (let x = 35; x <= 40; x++) for (let y = G + 1; y <= G + 6; y++) w.set(x, y, Z0 + 1, (y - G) % 2 === 0 ? B.wood : (x === 35 || x === 40 ? B.wood : [B.jarG, B.jarP, B.jarA, 0][(hash3(x, y, 3) * 4) | 0]));
      w.set(36, G + 1, Z0 + 2, B.jarA);

      // ── 동쪽: 향로(부품: 세발 받침에 매단 향로) ──
      const IX = 39, IZ = 27;
      w.box(IX + 2, G + 1, IZ, IX + 2, G + 8, IZ, B.iron); w.set(IX + 2, G + 1, IZ - 1, B.iron); w.set(IX + 2, G + 1, IZ + 1, B.iron); w.box(IX + 1, G + 8, IZ, IX + 1, G + 8, IZ, B.brassDk);
      const cen = w.prop({ name: 'censer', pivot: [IX + 0.5, G + 8.5, IZ + 0.5], axis: 'z' });
      cen.box(IX, G + 5, IZ, IX, G + 8, IZ, B.iron); cen.set(IX, G + 4, IZ, B.ember); cen.set(IX, G + 3, IZ, B.brass);
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) cen.set(IX + dx, G + 4, IZ + dz, B.brass);
      lights.push({ name: 'incense', p: [IX + 0.5, G + 3.5, IZ + 0.5], c: '#ff9a50', i: 0.35, d: 9, flicker: 0.4, srcR: 2 });
      acts.push({
        name: '향 피우기', hint: '세발 받침에 매단 향로가 흔들리며 보랏빛 향 연기가 천천히 피어올라요', hit: [IX - 1, G + 1, IZ - 1, IX + 1, G + 8, IZ + 1],
        run: async a => {
          a.flash('incense', 4, 5);
          for (let k = 0; k < 4; k++) {
            await a.turn('censer', [0.5, 0, 0], 0.5);
            a.burst([IX + 0.5, G + 5, IZ + 0.5], { n: 14, colors: ['#c8c0d8', '#a898c0', '#e0d0ff'], speed: 0.4, up: 2.4, life: 2.4, gravity: -0.4, spread: 0.6 });
            await a.turn('censer', [-0.5, 0, 0], 0.5);
          }
          await a.turn('censer', [0, 0, 0], 0.4);
        },
      });

      // ── 동쪽: 타로 탁자(부품: 카드 세 장) ──
      const KX = 37, KZ = 33;
      w.box(KX - 2, G + 1, KZ - 1, KX - 2, G + 2, KZ - 1, B.wood); w.box(KX + 2, G + 1, KZ + 1, KX + 2, G + 2, KZ + 1, B.wood);
      w.box(KX - 2, G + 2, KZ - 1, KX + 2, G + 2, KZ + 1, B.clothR);
      w.set(KX + 4, G + 1, KZ, B.woodL); w.set(KX + 4, G + 2, KZ, B.cloth3);
      for (let k = 0; k < 3; k++) {
        const x = KX - 2 + k * 2, c = w.prop({ name: 'tarot' + k, pivot: [x + 0.5, G + 3.5, KZ + 1] });
        c.set(x, G + 3, KZ, B.cardB); c.set(x, G + 3, KZ + 1, B.cardB);
      }
      w.set(KX - 2, G + 3, KZ - 1, B.lanternB);
      lights.push({ name: 'tarot', p: [KX - 1.5, G + 4, KZ - 0.5], c: '#ffc878', i: 0.35, d: 9, flicker: 0.3, srcR: 2 });
      acts.push({
        name: '타로 뒤집기', hint: '탁자 위 타로 카드 세 장이 차례로 떠올라 뒤집히며 별·달·태양이 나타나요', hit: [KX - 2, G + 1, KZ - 1, KX + 2, G + 4, KZ + 1],
        run: async a => {
          a.flash('tarot', 3, 4);
          const col = [['#fff8d0', '#ffffff'], ['#d8dcff', '#a0b8ff'], ['#ffd070', '#ff9a3a']];
          for (let k = 0; k < 3; k++) {
            await a.tween('tarot' + k, { off: [0, 2, 0], rot: [Math.PI, 0, 0] }, 0.7);
            a.burst([KX - 2 + k * 2 + 0.5, G + 6, KZ + 1], { n: 16, colors: col[k], speed: 1.6, up: 1, life: 1.2, gravity: 0, spread: 0.4 });
            await a.wait(0.2);
          }
          await a.wait(0.8);
          for (let k = 0; k < 3; k++) a.tween('tarot' + k, { off: [0, 0, 0], rot: [0, 0, 0] }, 0.8);
          await a.wait(0.9);
        },
      });

      // ── 남동쪽: 별빛 등(부품: 구멍 뚫린 황동 등, 돌면 별자리를 비춘다) ──
      const SX = 37, SZ = 38;
      w.box(SX, G + 1, SZ, SX, G + 2, SZ, B.marbleDk); w.set(SX, G + 3, SZ, B.brassDk);
      const sl = w.prop({ name: 'starlamp', pivot: [SX + 0.5, G + 5, SZ + 0.5], axis: 'y', speed: 0.4 });
      for (let dy = 0; dy <= 2; dy++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dz === 0) { sl.set(SX, G + 4 + dy, SZ, dy === 1 ? B.starG : B.brass); continue; }
        if (dy === 1 && (dx === 0 || dz === 0)) continue;
        sl.set(SX + dx, G + 4 + dy, SZ + dz, (dx + dz + dy) & 1 ? B.brass : B.brassDk);
      }
      lights.push({ name: 'stars', p: [SX + 0.5, G + 5, SZ + 0.5], c: '#fff0c0', i: 0.45, d: 16, flicker: 0.1, srcR: 2 });
      acts.push({
        name: '천장 별자리 비추기', hint: '별빛 등이 빠르게 돌며 방 위로 별자리를 비추고, 별빛이 천천히 내려앉아요', hit: [SX - 1, G + 1, SZ - 1, SX + 1, G + 6, SZ + 1],
        run: async a => {
          a.spin('starlamp', 8, 5); a.flash('stars', 4, 5); a.glow(1.8, 5);
          const pts = [[26, 27], [29, 25], [33, 27], [36, 26], [38, 30], [34, 31], [30, 30], [27, 33], [31, 36], [35, 35]];
          for (const [x, z] of pts) { a.burst([x + 0.5, G + 11, z + 0.5], { n: 12, colors: ['#ffffff', '#fff8d0', '#8ab8ff'], speed: 0.6, up: -0.4, life: 2.2, gravity: 0.3, spread: 0.4 }); await a.wait(0.25); }
        },
      });

      // 바깥 북서쪽 소나무와 바위
      for (const [x, z, h] of [[14, 18, 12], [12, 30, 10], [24, 12, 11], [50, 14, 9]]) MH.tree(w, x, G + 1, z, { kind: 'pine', h, bark: B.wood, leaves: [B.leaf, B.leaf, B.ground2], r: 3.4 });
      for (const [x, z] of [[18, 44], [46, 20], [10, 40]]) MH.rock(w, x, G + 1, z, 1.3, B.rock, B.ground2);
      // 화분과 작은 의자
      w.set(X1 - 1, G + 1, Z1 - 1, B.wood); w.set(X1 - 1, G + 2, Z1 - 1, B.leaf); w.set(X0 + 6, G + 1, Z0 + 1, B.wood); w.set(X0 + 6, G + 2, Z0 + 1, B.leaf);

      // ── 문 안쪽: 밖으로 나가기 ──
      acts.push(OR.goAct({ at: [31, G + 1, Z0 + 2], h: 5, name: '밖으로 나가기', goto: 'stellaris', hint: '돔 집의 검은 문을 열고 천문대 언덕 남동쪽 길로 나가요', hit: [31, G + 1, Z0, 32, G + 4, Z0] }));
      return { lights, landmarks, acts };
    },
  });
})();
