// 점성술사의 집(하위 지도) — 천문대 언덕 남동쪽, 남색 돔 지붕을 인 흰 대리석 집의 속. 가운데 별자리 깔개 위 수정구 탁자,
// 서쪽 벽의 별자리 서재와 독서대, 북서쪽 다락의 돔 망원경실(계단), 동쪽의 타로 탁자·향로·별빛 등. 남·동쪽(시점 쪽) 벽은 낮게 잘랐다 (천문대 언덕의 하위 지도)
// 2배 해상도(1칸 ≈ 25cm), playerScale 2. 마루는 한 높이로 평평하게 깔고, 북쪽 벽을 따라 걷는 길(머리 높이까지)에는 튀어나온 것을 두지 않았다.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 128, D = 128, Hh = 80, G = 20;
  const X0 = 42, X1 = 85, Z0 = 44, Z1 = 83;                    // 바깥 벽선(벽 두께 2칸, 안쪽은 x44..83, z46..81)
  MAPS.push({
    id: 'stellaris-astrologer', cat: 'magic', sub: true, parent: 'stellaris', name: '점성술사의 집', en: 'Stellaris · Astrologer\'s House', color: '#8a7ad8', seed: 3272, base: G, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '천문대 언덕 남동쪽, 남색 돔 지붕을 인 점성술사의 집. 별자리를 수놓은 깔개 위에 수정구 탁자가 놓였고, 서쪽 벽은 별자리 책으로 가득하다. 북서쪽 계단을 오르면 돔 아래 다락에 작은 망원경이 숨어 있어, 밤이면 돔을 열고 하늘을 내다본다.',
    info: { title: '장소 정보', en: 'ASTROLOGER', rows: [['점성실', '수정구 탁자 · 타로 카드 · 향로'], ['서재', '별자리 책장과 독서대'], ['다락', '돔 망원경실(북서쪽 계단)'], ['별빛 등', '천장에 별자리를 비춘다']] },
    sky: ['#0a1430', '#02040c', '#3a5aa0'], stars: true,
    hemi: ['#b8b0e8', '#181428', 0.6], sun: ['#c0d8ff', 0.44, [0.45, 1, 0.5]],
    day: { sky: ['#c8d8f0', '#5a80c0', '#f4f8ff'], stars: false, hemi: ['#f4f2ff', '#4a4860', 0.62], sun: ['#fff6e4', 0.7, [0.45, 1, 0.5]], haze: '#c8d0e8' },
    fog: { start: 0.96, floor: G - 16, depth: 8, haze: [16, 0.18, 12], hazeColor: '#1e1a40' },
    camY: 0, zoom: 2.3,
    particles: [
      { n: 70, colors: ['#e0d0ff', '#ffffff', '#ffd890'], mode: 'drift', speed: 0.2, wind: 0.2, area: [64, 64, 20], y0: G + 4, y1: G + 20, glow: true },
      { n: 24, colors: ['#c8c0d8', '#a898c0'], mode: 'rise', speed: 0.5, area: [79, 55, 1.2], y0: G + 8, y1: G + 20, glow: false },
    ],
    blocks: {
      ground: { c: '#3a3a44', top: '#3a5a5a', v: 0.1 }, ground2: { c: '#3a3a44', top: '#34504e', v: 0.1 }, rock: { c: '#4a5068', v: 0.06, pat: 'big' }, path: { c: '#3a3a44', top: '#6a7088', v: 0.08, pat: 'stone' },
      pave: { c: '#5a6078', top: '#727890', v: 0.05 }, pave2: { c: '#565c74', top: '#686e86', v: 0.05 }, paveJ: { c: '#3e4256', top: '#4a4e62', v: 0.03 },
      marble: { c: '#c8d0e0', v: 0.04, pat: 'big' }, marble2: { c: '#bcc4d6', v: 0.04, pat: 'big' }, marbleJ: { c: '#9aa2b6', v: 0.03 }, marbleDk: { c: '#8a94a8', v: 0.05, pat: 'brick' }, trim: { c: '#e4eaf4', v: 0.03 }, roofN: { c: '#1a2a5a', v: 0.05, pat: 'tile' }, roofN2: { c: '#22346a', v: 0.05, pat: 'tile' },
      floorW: { c: '#5a4038', top: '#6e5044', v: 0.05, pat: 'plank' }, floorW2: { c: '#5a4038', top: '#64483e', v: 0.05, pat: 'plank' }, wood: { c: '#4a3a3a', v: 0.05, pat: 'plank' }, woodL: { c: '#7a5a48', v: 0.05, pat: 'plank' }, woodDk: { c: '#3a2c2c', v: 0.04 },
      silver: { c: '#c8d4e0', v: 0.04 }, brass: { c: '#c8a050', v: 0.07 }, brassDk: { c: '#8a6a30', v: 0.06 }, iron: { c: '#2a2e3c', v: 0.03 }, door: { c: '#1a1a2a', v: 0.02, pat: 'plank' }, doorDk: { c: '#121220', v: 0.02 },
      win: { c: '#b8d0ff', night: true, day: '#7a90b8' }, lamp: { c: '#d0e0ff', night: true, day: '#a8b4c8' }, lanternB: { c: '#ffd890', glow: true },
      starG: { c: '#fff8d0', glow: true }, starB: { c: '#8ab8ff', glow: true }, lens: { c: '#a0d8ff', glow: true }, orbG: { c: '#c0a0ff', glow: true }, orbL: { c: '#e8d8ff', glow: true }, ember: { c: '#ff8a3a', glow: true },
      rug: { c: '#2a3a8a', v: 0.04 }, rugE: { c: '#5a3a8a', v: 0.04 }, rugF: { c: '#c8a050', v: 0.04 }, cloth3: { c: '#5a3a8a', v: 0.04 }, clothR: { c: '#7a2a4a', v: 0.04 }, clothRd: { c: '#62203a', v: 0.04 },
      bookR: { c: '#7a2a3a', v: 0.05 }, bookB: { c: '#2a3a7a', v: 0.05 }, bookG: { c: '#3a5a3a', v: 0.05 }, bookP: { c: '#5a3a7a', v: 0.05 }, paper: { c: '#ece4cc', v: 0.03 },
      card: { c: '#f0e8d8', v: 0.02 }, cardB: { c: '#3a2a6a', v: 0.03 }, jarG: { c: '#6ac0a0', v: 0.03 }, jarP: { c: '#b080d0', v: 0.03 }, jarA: { c: '#d8a040', v: 0.03 }, cork: { c: '#a07850', v: 0.04 },
      leaf: { c: '#3a6a70', v: 0.1 }, leaf2: { c: '#2e5a60', v: 0.1 }, leafDk: { c: '#22464c', v: 0.08 }, bark: { c: '#3a3a44', v: 0.06 }, barkDk: { c: '#2c2c36', v: 0.05 }, pot: { c: '#8a5a48', v: 0.04 },
      stoneG: { c: '#4a5068', v: 0.05 }, timber: { c: '#4a3a3a', v: 0.05 }, gold: { c: '#c8a050', v: 0.05 }, mlamp: { c: '#d0e0ff', night: true, day: '#a8b4c8' },
    },
    build(w) {
      const B = w.id;
      const lights = [], acts = [], landmarks = [];
      const inside = (x, z) => x >= X0 && x <= X1 && z >= Z0 && z <= Z1;
      MH.terrain(w, {
        floor: G - 8, height: () => G,
        // 마루: 2칸 폭 널을 길이 방향(x)으로 깔고, 널 끝 이음은 줄마다 엇갈린다 — 높이는 모두 G 한 단
        surface: (x, z) => inside(x, z) ? ((((x + ((z >> 1) & 3) * 5) % 20) === 0) ? B.floorW2 : B.floorW) : (hash3(x >> 3, 3, z >> 3) > 0.7 ? B.ground2 : B.ground),
        under: (x, z, y, dep) => dep < 3 ? B.marbleDk : B.rock,
      });

      // ── 벽: 북·서는 높고(창과 등), 남·동은 낮다. 낱돌 쌓기(줄눈), 받침돌, 모서리 귀돌, 갓돌 ──
      const HI = G + 20, LO = G + 8;
      const ashlar = (u, y) => {             // 2칸 높이 돌 + 1칸 줄눈, 길이 6칸 돌을 줄마다 엇갈려
        const c = Math.floor((y - G - 3) / 3), r = ((y - G - 3) % 3 + 3) % 3, uu = u + (c & 1) * 3;
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return B.marbleJ;
        return hash3(Math.floor(uu / 6), c, 7) > 0.6 ? B.marble2 : B.marble;
      };
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        const onX = x <= X0 + 1 || x >= X1 - 1, onZ = z <= Z0 + 1 || z >= Z1 - 1;
        if (!onX && !onZ) continue;
        const hi = z <= Z0 + 1 || x <= X0 + 1, top = hi ? HI : LO;
        const corner = onX && onZ, u = onZ ? x : z;
        for (let y = G + 1; y <= top; y++) {
          let b;
          if (y >= top - 1) b = B.trim;
          else if (y <= G + 2) b = B.marbleDk;
          else if (corner) b = ((y - G - 3) >> 1) & 1 ? B.trim : B.marbleDk;
          else b = ashlar(u, y);
          w.set(x, y, z, b);
        }
      }
      // 받침돌 바깥 턱(바깥으로만 1칸)과 처마 띠(높은 벽 위, 바깥쪽으로 내민 톱니)
      for (let x = X0 - 1; x <= X1 + 1; x++) { w.set(x, G + 1, Z0 - 1, B.marbleDk); w.set(x, G + 1, Z1 + 1, B.marbleDk); }
      for (let z = Z0 - 1; z <= Z1 + 1; z++) { w.set(X0 - 1, G + 1, z, B.marbleDk); w.set(X1 + 1, G + 1, z, B.marbleDk); }
      for (let x = X0 - 1; x <= X1; x++) { w.set(x, HI - 1, Z0 - 1, B.trim); if ((x >> 1) & 1) { w.set(x, HI + 1, Z0, B.trim); w.set(x, HI + 2, Z0, B.trim); } }
      for (let z = Z0 - 1; z <= Z1; z++) { w.set(X0 - 1, HI - 1, z, B.trim); if ((z >> 1) & 1) { w.set(X0, HI + 1, z, B.trim); w.set(X0, HI + 2, z, B.trim); } }

      // 창: 벽 두께 2칸 — 바깥 칸에 유리(가운데 창살·가로살), 안쪽 칸은 비워 깊이를 준다. 창턱은 바깥으로만 낸다(안쪽 걷는 길에 걸리지 않게)
      const windowZ = (x0, wy, wh, zWall, out) => {      // 북·남 벽: x0..x0+4 (5폭)
        const zi = zWall + (out < 0 ? 1 : -1);
        for (let r = 0; r < wh; r++) for (let c = 0; c < 5; c++) { w.set(x0 + c, wy + r, zWall, (c === 2 || r === Math.floor(wh * 0.6)) ? B.trim : B.win); w.set(x0 + c, wy + r, zi, 0); }
        for (let c = -1; c <= 5; c++) { w.set(x0 + c, wy - 1, zWall + out, B.trim); w.set(x0 + c, wy + wh, zWall, B.marbleDk); }
        for (let r = 0; r < wh; r++) { w.set(x0 - 1, wy + r, zWall, B.marbleDk); w.set(x0 + 5, wy + r, zWall, B.marbleDk); }
        w.set(x0 + 2, wy + wh + 1, zWall, B.starB);
      };
      const windowX = (z0, wy, wh, xWall, out) => {
        const xi = xWall + (out < 0 ? 1 : -1);
        for (let r = 0; r < wh; r++) for (let c = 0; c < 5; c++) { w.set(xWall, wy + r, z0 + c, (c === 2 || r === Math.floor(wh * 0.6)) ? B.trim : B.win); w.set(xi, wy + r, z0 + c, 0); }
        for (let c = -1; c <= 5; c++) { w.set(xWall + out, wy - 1, z0 + c, B.trim); w.set(xWall, wy + wh, z0 + c, B.marbleDk); }
        for (let r = 0; r < wh; r++) { w.set(xWall, wy + r, z0 - 1, B.marbleDk); w.set(xWall, wy + r, z0 + 5, B.marbleDk); }
      };
      windowZ(51, G + 7, 6, Z0, -1); windowZ(74, G + 15, 4, Z0, -1);   // 북쪽 벽 두 창(동쪽 창은 약병 장 위로)
      windowX(65, G + 13, 6, X0, -1);                                  // 서쪽 높은 창
      for (const x of [53, 69]) windowZ(x, G + 3, 4, Z1, 1);           // 남쪽 낮은 벽의 작은 창
      windowX(59, G + 3, 4, X1, 1);                                    // 동쪽 낮은 벽의 작은 창

      // ── 문(북쪽 벽 가운데): 4폭 9높이 검은 판자문(테두리 살·판), 흰 문틀과 상인방, 위에 별 둘 ──
      const DXa = 62, DXb = 65;
      for (let x = DXa; x <= DXb; x++) for (let y = G + 1; y <= G + 9; y++) {
        const stile = x === DXa || x === DXb || y === G + 1 || y === G + 5 || y === G + 9;
        w.set(x, y, Z0, stile ? B.doorDk : B.door); w.set(x, y, Z0 + 1, stile ? B.doorDk : B.door);
      }
      w.set(DXa + 1, G + 5, Z0 - 1, B.brass);
      for (const x of [DXa - 2, DXa - 1, DXb + 1, DXb + 2]) for (let y = G + 1; y <= G + 11; y++) { w.set(x, y, Z0, B.marbleDk); w.set(x, y, Z0 + 1, B.marbleDk); }
      for (let x = DXa - 3; x <= DXb + 3; x++) { w.set(x, G + 10, Z0, B.trim); w.set(x, G + 11, Z0, B.trim); w.set(x, G + 10, Z0 - 1, B.trim); }
      w.set(DXa + 1, G + 13, Z0, B.starG); w.set(DXb - 1, G + 13, Z0, B.starB); w.set(DXa + 1, G + 12, Z0, B.brassDk); w.set(DXb - 1, G + 12, Z0, B.brassDk);
      // 안쪽 벽등: 문 양옆, 머리 위 높이(G+11 이상)에만 걸어 북쪽 벽을 따라 걸어도 걸리지 않는다
      for (const x of [DXa - 4, DXb + 4]) { w.set(x, G + 11, Z0 + 2, B.brassDk); w.set(x, G + 12, Z0 + 2, B.lanternB); w.set(x, G + 13, Z0 + 2, B.brassDk); }
      // 문 안쪽 발깔개: 마루와 같은 높이(G)로 바꿔 깐다
      for (let x = DXa - 2; x <= DXb + 2; x++) for (let z = Z0 + 2; z <= Z0 + 5; z++) w.set(x, G, z, (x === DXa - 2 || x === DXb + 2 || z === Z0 + 5) ? B.clothRd : B.clothR);
      // 바깥: 문 앞 돌길(4×3 돌, 줄눈)과 등주 둘
      for (let z = Z0 - 14; z < Z0; z++) for (let x = DXa - 2; x <= DXb + 2; x++) {
        const row = Math.floor(z / 3), off = (row & 1) * 2;
        w.set(x, G, z, (z % 3 === 2 || (x + off) % 4 === 3) ? B.paveJ : (hash3((x + off) >> 2, row, 3) > 0.5 ? B.pave : B.pave2));
      }
      for (const x of [DXa - 6, DXb + 6]) {
        w.box(x, G + 1, Z0 - 5, x + 1, G + 2, Z0 - 4, B.marbleDk);
        w.box(x, G + 3, Z0 - 5, x, G + 9, Z0 - 5, B.iron);
        w.box(x - 1, G + 10, Z0 - 6, x + 1, G + 10, Z0 - 4, B.iron);
        for (let dy = 11; dy <= 12; dy++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) w.set(x + dx, G + dy, Z0 - 5 + dz, (dx && dz) ? B.iron : B.lamp);
        w.box(x - 1, G + 13, Z0 - 6, x + 1, G + 13, Z0 - 4, B.iron); w.set(x, G + 14, Z0 - 5, B.brass);
      }
      lights.push({ name: 'room', p: [63.5, G + 12, 53.5], c: '#ffd8a0', i: 0.55, d: 60, flicker: 0.15, srcR: 10 });

      // ── 가운데: 별자리 깔개(마루 높이 그대로)와 수정구 탁자(부품: 수정구) ──
      const TX = 62, TZ = 67;
      for (let dz = -12; dz <= 12; dz++) for (let dx = -12; dx <= 12; dx++) {
        const d = Math.hypot(dx, dz); if (d > 11.4) continue;
        const th = Math.atan2(dz, dx), k = Math.round(th / (Math.PI * 2) * 12), off = Math.abs(th - k * Math.PI / 6) * d;
        let b = B.rug;
        if (d > 10.4) b = B.rugF; else if (d > 9.4) b = B.rugE;
        else if (Math.abs(d - 8) < 0.7 && off < 0.9) b = k % 2 ? B.starG : B.starB;
        else if (Math.abs(d - 6) < 0.5) b = B.silver;
        else if (d < 5.5 && off < 0.45 && d > 2) b = B.rugE;
        w.set(TX + dx, G, TZ + dz, b);
      }
      // 탁자: 굵은 기둥과 네 발, 둥근 상판(테), 보 두른 천과 늘어진 모서리 술
      w.cyl(TX, TZ, G + 1, G + 1, 2.2, B.woodDk); w.box(TX - 1, G + 2, TZ - 1, TX + 1, G + 5, TZ + 1, B.wood);
      for (const [dx, dz] of [[-3, 0], [3, 0], [0, -3], [0, 3]]) w.set(TX + dx, G + 1, TZ + dz, B.woodDk);
      w.cyl(TX, TZ, G + 6, G + 6, 4.6, B.cloth3); w.ring(TX, TZ, G + 6, 3.6, 4.6, B.clothR);
      for (let a = 0; a < 16; a++) { const t = a / 16 * Math.PI * 2, x = Math.round(TX + Math.cos(t) * 4.6), z = Math.round(TZ + Math.sin(t) * 4.6); w.set(x, G + 5, z, B.clothR); if (a % 4 === 0) { w.set(x, G + 4, z, B.clothR); w.set(x, G + 3, z, B.rugF); } }
      w.cyl(TX, TZ, G + 7, G + 7, 1.6, B.brassDk); w.ring(TX, TZ, G + 8, 1, 1.9, B.brass);
      const orb = w.prop({ name: 'orb', pivot: [TX + 0.5, G + 10.5, TZ + 0.5], axis: 'y', speed: 0.3 });
      orb.sphere(TX, G + 10, TZ, 2.1, B.orbG); orb.set(TX - 1, G + 11, TZ - 1, B.orbL); orb.set(TX, G + 12, TZ, B.orbL); orb.set(TX, G + 13, TZ, B.starG);
      // 걸상 둘(세 다리, 둥근 방석)
      for (const z of [TZ - 9, TZ + 8]) { for (const [dx, dz] of [[0, 0], [1, 1], [0, 1]]) w.box(TX + dx, G + 1, z + dz, TX + dx, G + 2, z + dz, B.woodL); w.box(TX - 1, G + 3, z - 1, TX + 2, G + 3, z + 2, B.woodL); w.box(TX, G + 4, z, TX + 1, G + 4, z + 1, B.clothR); }
      lights.push({ name: 'orb', p: [TX + 0.5, G + 10.5, TZ + 0.5], c: '#c0a0ff', i: 0.6, d: 28, flicker: 0.2, srcR: 4 });
      acts.push({
        name: '수정구 점보기', hint: '탁자 위 수정구가 떠올라 빙글 돌며 보랏빛 안개 속에 별의 앞날을 비춰요', hit: [TX - 4, G + 1, TZ - 4, TX + 4, G + 13, TZ + 4],
        run: async a => {
          a.flash('orb', 5, 5); a.glow(1.6, 5);
          await a.move('orb', [0, 3.6, 0], 1);
          a.spin('orb', 14, 3);
          for (let k = 0; k < 10; k++) { const t = k * 0.7; a.burst([TX + 0.5 + Math.cos(t) * 3.2, G + 14, TZ + 0.5 + Math.sin(t) * 3.2], { n: 12, colors: ['#c0a0ff', '#f0e0ff', '#8ab8ff'], speed: 2, up: 2.8, life: 1.4, gravity: -0.6, spread: 1.2 }); await a.wait(0.25); }
          await a.move('orb', [0, 0, 0], 1.2);
        },
      });
      landmarks.push({ name: '수정구 탁자', note: '별자리 깔개 위 점성실', p: [TX + 0.5, G + 28, TZ + 0.5] });

      // ── 서쪽 벽: 별자리 서재(책장)와 독서대(부품: 별자리 책) ──
      const shelf = (x0, x1, z0, z1, y0, y1, salt) => {     // 옆판·선반(4칸마다), 책은 1칸 폭으로 높이가 들쭉날쭉
        for (let y = y0; y <= y1; y++) for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) {
          const side = z === z0 || z === z1 || (x1 - x0 > z1 - z0 && (x === x0 || x === x1));
          const sy = (y - y0) % 4;
          if (side || sy === 0 || y === y1) { w.set(x, y, z, B.wood); continue; }
          const front = (x1 - x0 > z1 - z0) ? z === z0 + 1 : x === x1;
          const col = (x1 - x0 > z1 - z0) ? x : z, hh = hash3(col, Math.floor((y - y0) / 4), salt);
          if (front && sy === 3 && hh > 0.55) { w.set(x, y, z, 0); continue; }
          w.set(x, y, z, front ? [B.bookR, B.bookB, B.bookG, B.bookP, B.paper][(hh * 5) | 0] : B.woodDk);
        }
      };
      shelf(44, 46, 76, 81, G + 1, G + 17, 5);
      w.box(44, G + 18, 76, 47, G + 18, 81, B.woodDk);
      for (let z = 77; z <= 80; z += 3) { w.set(47, G + 19, z, B.brassDk); w.set(47, G + 20, z, B.starG); }
      const LX = 53, LZ = 76;
      w.box(LX, G + 1, LZ, LX + 1, G + 1, LZ + 1, B.woodDk); w.box(LX, G + 2, LZ, LX + 1, G + 5, LZ + 1, B.wood);
      w.box(LX - 2, G + 6, LZ, LX + 3, G + 6, LZ + 1, B.woodL); w.box(LX - 2, G + 7, LZ + 1, LX + 3, G + 7, LZ + 1, B.woodL);
      const book = w.prop({ name: 'starbook', pivot: [LX + 1, G + 8, LZ + 0.5] });
      book.box(LX - 1, G + 8, LZ, LX, G + 8, LZ, B.paper); book.box(LX + 1, G + 8, LZ, LX + 1, G + 8, LZ, B.bookB); book.box(LX + 2, G + 8, LZ, LX + 3, G + 8, LZ, B.paper);
      book.set(LX - 1, G + 7, LZ, B.bookB); book.set(LX + 3, G + 7, LZ, B.bookB);
      lights.push({ name: 'book', p: [LX + 1, G + 10, LZ + 0.5], c: '#8ab8ff', i: 0.3, d: 20, flicker: 0.1, srcR: 10 });
      acts.push({
        name: '별자리 책 펼치기', hint: '독서대의 별자리 책이 떠올라 펼쳐지고, 책장 위로 별자리가 빛으로 그려져요', hit: [LX - 2, G + 1, LZ - 2, LX + 3, G + 10, LZ + 3],
        run: async a => {
          a.flash('book', 6, 4);
          await a.tween('starbook', { off: [0, 4, 0], rot: [-0.6, 0, 0] }, 1);
          const cs = [[-6, 0], [-3, 3], [0, 1.6], [3, 4], [6, 2], [4, -1]];
          for (const [u, v] of cs) { a.burst([LX + 1 + u, G + 16 + v, LZ - 1], { n: 14, colors: ['#ffffff', '#fff8d0', '#8ab8ff'], speed: 2, up: 0, life: 2, gravity: 0, spread: 0.6 }); await a.wait(0.3); }
          await a.wait(0.6);
          await a.tween('starbook', { off: [0, 0, 0], rot: [0, 0, 0] }, 1);
        },
      });

      // ── 북서쪽 다락(돔 망원경실): 마루 아래 머리 공간 12칸, 기둥·장선, 난간, 서쪽 벽을 따라 내려오는 계단(한 단 1칸) ──
      const LY = G + 14, LX1 = 57, LZ1 = 61;
      w.box(44, LY, 46, LX1, LY, LZ1, B.woodL);
      for (let x = 44; x <= LX1; x++) for (let z = 46; z <= LZ1; z++) if (x % 3 === 0 || x === LX1 || z === LZ1) w.set(x, LY - 1, z, B.wood);
      for (let z = 46; z <= LZ1; z++) w.set(LX1, LY - 2, z, B.woodDk);
      for (let x = 44; x <= LX1; x++) w.set(x, LY - 2, LZ1, B.woodDk);
      for (const [px, pz] of [[LX1 - 1, LZ1 - 1], [LX1 - 1, 52]]) w.box(px, G + 1, pz, px + 1, LY - 1, pz + 1, B.wood);
      // 난간: 동자 2칸마다, 놋 손잡이. 계단 머리(x44..47)는 비운다
      for (let x = 48; x <= LX1; x++) { if (x % 2 === 0 || x === LX1) w.box(x, LY + 1, LZ1, x, LY + 3, LZ1, B.brassDk); w.set(x, LY + 4, LZ1, B.brass); }
      for (let z = 46; z <= LZ1; z++) { if (z % 2 === 0) w.box(LX1, LY + 1, z, LX1, LY + 3, z, B.brassDk); w.set(LX1, LY + 4, z, B.brass); }
      // 계단: z62..74, 북쪽으로 갈수록 한 칸씩 오른다(마루 G → 다락 LY)
      for (let k = 1; k <= 13; k++) {
        const z = LZ1 + k, top = LY - k;
        w.box(44, G + 1, z, 47, top - 1, z, B.wood); w.box(44, top, z, 47, top, z, k % 2 ? B.woodL : B.wood);
        for (let y = top + 1; y <= top + 9; y++) for (let x = 44; x <= 47; x++) w.set(x, y, z, 0);
        if (k % 3 === 1) w.box(48, top + 1, z, 48, top + 4, z, B.brassDk);
        w.set(48, top + 5, z, B.brass);
        w.box(48, G + 1, z, 48, top, z, B.woodDk);
      }
      // 계단 끝 마루 한 줄(z75)은 비워 두고, 서재 책장은 z76부터

      // 4분의 1 돔: 북서쪽 모서리에 기대어 덮고, 망원경이 나가는 틈이 대각선으로 났다. 은빛 갈빗대와 띠
      const DR = 21.2;
      for (let y = 0; y <= 20; y++) for (let dz = 0; dz <= 23; dz++) for (let dx = 0; dx <= 23; dx++) {
        const d = Math.hypot(dx, y * 1.15, dz); if (d > DR || d < DR - 2.4) continue;
        if (Math.abs(dx - dz) <= 2 && y > 4) continue;
        const ang = Math.atan2(dz, dx), rib = Math.abs(ang * 8 / Math.PI - Math.round(ang * 8 / Math.PI)) < 0.07 || y <= 1 || (Math.abs(dx - dz) === 3 && y > 4);
        w.set(X0 + dx, HI + 1 + y, Z0 + dz, rib ? B.silver : ((y >> 1) & 1 ? B.roofN2 : B.roofN));
      }
      // 망원경(부품): 다락 위 쇠 받침, 경통, 렌즈
      const DCX = 50, DCZ = 52;
      w.box(DCX - 1, LY + 1, DCZ - 1, DCX + 1, LY + 1, DCZ + 1, B.iron); w.box(DCX, LY + 2, DCZ, DCX, LY + 4, DCZ, B.iron);
      const sc = w.prop({ name: 'dscope', pivot: [DCX + 0.5, LY + 5, DCZ + 0.5], axis: 'y' });
      sc.line(DCX, LY + 5, DCZ, DCX + 4, LY + 11, DCZ + 4, B.brass, 0.9); sc.set(DCX + 5, LY + 12, DCZ + 5, B.lens); sc.set(DCX + 4, LY + 12, DCZ + 5, B.lens);
      sc.set(DCX, LY + 5, DCZ, B.brassDk); sc.set(DCX + 2, LY + 9, DCZ + 2, B.brassDk); sc.set(DCX - 1, LY + 5, DCZ - 1, B.brassDk);
      // 다락 살림: 걸상, 작은 책상과 별 지도, 등
      w.box(46, LY + 1, 48, 47, LY + 2, 49, B.wood);
      w.box(44, LY + 1, 56, 47, LY + 3, 59, B.wood); w.box(44, LY + 4, 56, 47, LY + 4, 59, B.woodL); w.box(44, LY + 5, 56, 45, LY + 5, 57, B.paper); w.set(46, LY + 5, 58, B.lanternB); w.set(47, LY + 5, 59, B.bookP);
      lights.push({ name: 'scope', p: [DCX + 5.5, LY + 12, DCZ + 5.5], c: '#a0d8ff', i: 0.5, d: 28, flicker: 0.05, srcR: 4 });
      acts.push({
        name: '돔 망원경 올리기', hint: '다락의 작은 망원경이 돔 틈으로 쑥 솟아올라 빙 돌며 별을 찾아요', hit: [DCX - 4, LY + 1, DCZ - 4, DCX + 6, LY + 13, DCZ + 6],
        run: async a => {
          a.flash('scope', 4, 6);
          await a.move('dscope', [0, 8, 0], 1.4);
          await a.turn('dscope', [0, 3.2, 0], 2);
          for (let k = 0; k < 3; k++) { a.burst([DCX - 4, LY + 26, DCZ - 4], { n: 20, colors: ['#ffffff', '#a0d8ff', '#fff8d0'], speed: 4, up: 3, life: 1.6, gravity: 0, spread: 4 }); await a.wait(0.4); }
          await a.turn('dscope', [0, 6.283, 0], 2); a.unwind('dscope');
          await a.move('dscope', [0, 0, 0], 1.2);
        },
      });
      landmarks.push({ name: '돔 망원경실', note: '다락 · 북서쪽 계단', p: [DCX + 0.5, LY + 28, DCZ + 0.5] });

      // ── 북쪽 벽 동편: 약병과 별가루 선반(벽에 붙은 2칸 깊이 장, 바닥에 놓인 것 없음) ──
      for (let x = 70; x <= 81; x++) for (let y = G + 1; y <= G + 13; y++) for (let z = Z0 + 2; z <= Z0 + 3; z++) {
        const sy = (y - G - 1) % 4;
        if (x === 70 || x === 81 || sy === 0 || y === G + 13) { w.set(x, y, z, B.wood); continue; }
        if (z === Z0 + 2) { w.set(x, y, z, B.woodDk); continue; }
        const hh = hash3(x, (y - G - 1) >> 2, 3);
        if (hh < 0.3 || sy === 3) { w.set(x, y, z, sy === 3 && hh > 0.55 && hh < 0.8 ? B.cork : 0); continue; }
        w.set(x, y, z, [B.jarG, B.jarP, B.jarA][(hh * 30 | 0) % 3]);
      }

      // ── 동쪽: 향로(부품: 세발 받침의 팔에 매단 향로) ──
      const IX = 78, IZ = 54;
      w.box(IX + 4, G + 1, IZ, IX + 5, G + 17, IZ + 1, B.iron);
      for (const [dx, dz] of [[-1, -1], [-1, 2], [1, 0]]) w.line(IX + 4.5, G + 4, IZ + 0.5, IX + 4.5 + dx * 2.2, G + 1, IZ + 0.5 + dz * 1.6, B.iron);
      w.box(IX, G + 17, IZ, IX + 4, G + 17, IZ + 1, B.brassDk); w.set(IX + 5, G + 18, IZ, B.brass);
      const cen = w.prop({ name: 'censer', pivot: [IX + 1, G + 16.5, IZ + 1], axis: 'z' });
      cen.box(IX, G + 10, IZ, IX, G + 16, IZ, B.iron);
      for (let dy = 0; dy <= 3; dy++) for (let dz = -1; dz <= 2; dz++) for (let dx = -1; dx <= 2; dx++) {
        const e = (dx === -1 || dx === 2) + (dz === -1 || dz === 2);
        if (e === 2 && dy !== 1) continue;
        if (dy === 3 && e === 0) continue;
        cen.set(IX + dx, G + 6 + dy, IZ + dz, dy === 3 ? B.brassDk : (e ? B.brass : B.ember));
      }
      cen.set(IX, G + 5, IZ, B.brassDk);
      lights.push({ name: 'incense', p: [IX + 0.5, G + 7.5, IZ + 0.5], c: '#ff9a50', i: 0.35, d: 18, flicker: 0.4, srcR: 3 });
      acts.push({
        name: '향 피우기', hint: '세발 받침에 매단 향로가 흔들리며 보랏빛 향 연기가 천천히 피어올라요', hit: [IX - 2, G + 1, IZ - 2, IX + 3, G + 17, IZ + 3],
        run: async a => {
          a.flash('incense', 4, 5);
          for (let k = 0; k < 4; k++) {
            await a.turn('censer', [0.5, 0, 0], 0.5);
            a.burst([IX + 0.5, G + 10, IZ + 0.5], { n: 14, colors: ['#c8c0d8', '#a898c0', '#e0d0ff'], speed: 0.8, up: 4.8, life: 2.4, gravity: -0.8, spread: 1.2 });
            await a.turn('censer', [-0.5, 0, 0], 0.5);
          }
          await a.turn('censer', [0, 0, 0], 0.4);
        },
      });

      // ── 동쪽: 타로 탁자(부품: 카드 세 장) ──
      const KX = 75, KZ = 66;
      for (const [x, z] of [[KX - 4, KZ - 2], [KX + 4, KZ - 2], [KX - 4, KZ + 3], [KX + 4, KZ + 3]]) w.box(x, G + 1, z, x, G + 3, z, B.woodDk);
      w.box(KX - 5, G + 4, KZ - 2, KX + 5, G + 4, KZ + 3, B.clothR);
      for (let x = KX - 5; x <= KX + 5; x++) { w.set(x, G + 3, KZ - 3, B.clothRd); w.set(x, G + 3, KZ + 4, B.clothRd); if (x % 2 === 0) { w.set(x, G + 2, KZ - 3, B.rugF); w.set(x, G + 2, KZ + 4, B.rugF); } }
      for (let x = KX - 4; x <= KX + 4; x++) { w.set(x, G + 4, KZ - 3, B.clothR); w.set(x, G + 4, KZ + 4, B.clothR); }
      w.box(KX, G + 1, KZ - 7, KX, G + 2, KZ - 7, B.woodL); w.box(KX + 1, G + 1, KZ - 6, KX + 1, G + 2, KZ - 6, B.woodL); w.box(KX - 1, G + 3, KZ - 8, KX + 1, G + 3, KZ - 6, B.woodL); w.box(KX, G + 4, KZ - 7, KX + 1, G + 4, KZ - 6, B.cloth3);
      for (let k = 0; k < 3; k++) {
        const x = KX - 4 + k * 3, c = w.prop({ name: 'tarot' + k, pivot: [x + 1, G + 5.5, KZ + 1.5] });
        c.box(x, G + 5, KZ, x + 1, G + 5, KZ + 2, B.cardB); c.set(x, G + 5, KZ + 1, B.starG);
      }
      w.box(KX + 3, G + 5, KZ - 2, KX + 4, G + 5, KZ - 1, B.brassDk); w.set(KX + 3, G + 6, KZ - 2, B.lanternB); w.set(KX + 4, G + 6, KZ - 1, B.lanternB);
      lights.push({ name: 'tarot', p: [KX + 3.5, G + 7, KZ - 1.5], c: '#ffc878', i: 0.35, d: 18, flicker: 0.3, srcR: 3 });
      acts.push({
        name: '타로 뒤집기', hint: '탁자 위 타로 카드 세 장이 차례로 떠올라 뒤집히며 별·달·태양이 나타나요', hit: [KX - 5, G + 1, KZ - 3, KX + 5, G + 8, KZ + 4],
        run: async a => {
          a.flash('tarot', 3, 4);
          const col = [['#fff8d0', '#ffffff'], ['#d8dcff', '#a0b8ff'], ['#ffd070', '#ff9a3a']];
          for (let k = 0; k < 3; k++) {
            await a.tween('tarot' + k, { off: [0, 4, 0], rot: [Math.PI, 0, 0] }, 0.7);
            a.burst([KX - 4 + k * 3 + 1, G + 11, KZ + 1.5], { n: 16, colors: col[k], speed: 3, up: 2, life: 1.2, gravity: 0, spread: 0.8 });
            await a.wait(0.2);
          }
          await a.wait(0.8);
          for (let k = 0; k < 3; k++) a.tween('tarot' + k, { off: [0, 0, 0], rot: [0, 0, 0] }, 0.8);
          await a.wait(0.9);
        },
      });

      // ── 남동쪽: 별빛 등(부품: 구멍 뚫린 황동 등, 돌면 별자리를 비춘다) ──
      const SX = 74, SZ = 76;
      w.box(SX - 1, G + 1, SZ - 1, SX + 2, G + 1, SZ + 2, B.marbleDk); w.box(SX, G + 2, SZ, SX + 1, G + 5, SZ + 1, B.marble); w.box(SX - 1, G + 6, SZ - 1, SX + 2, G + 6, SZ + 2, B.trim); w.box(SX, G + 7, SZ, SX + 1, G + 7, SZ + 1, B.brassDk);
      const sl = w.prop({ name: 'starlamp', pivot: [SX + 1, G + 11, SZ + 1], axis: 'y', speed: 0.4 });
      for (let dy = -3; dy <= 3; dy++) for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) {
        const px = dx + 0.5, pz = dz + 0.5, d = Math.hypot(px, dy, pz);
        if (d > 3.4) continue;
        const x = SX + 1 + dx, z = SZ + 1 + dz, y = G + 11 + dy;
        if (d < 1.6) { sl.set(x, y, z, B.starG); continue; }
        if (d < 2.4) continue;
        const hole = (dy + 3) % 2 === 0 && ((dx + dz) & 1) === 0 && Math.abs(dy) < 3;
        sl.set(x, y, z, hole ? B.starG : (dy === 0 ? B.brassDk : B.brass));
      }
      sl.set(SX + 1, G + 15, SZ + 1, B.brassDk);
      lights.push({ name: 'stars', p: [SX + 1, G + 11, SZ + 1], c: '#fff0c0', i: 0.45, d: 32, flicker: 0.1, srcR: 3 });
      acts.push({
        name: '천장 별자리 비추기', hint: '별빛 등이 빠르게 돌며 방 위로 별자리를 비추고, 별빛이 천천히 내려앉아요', hit: [SX - 3, G + 1, SZ - 3, SX + 4, G + 15, SZ + 4],
        run: async a => {
          a.spin('starlamp', 8, 5); a.flash('stars', 4, 5); a.glow(1.8, 5);
          const pts = [[26, 27], [29, 25], [33, 27], [36, 26], [38, 30], [34, 31], [30, 30], [27, 33], [31, 36], [35, 35]];
          for (const [x, z] of pts) { a.burst([2 * x + 1, G + 22, 2 * z + 1], { n: 12, colors: ['#ffffff', '#fff8d0', '#8ab8ff'], speed: 1.2, up: -0.8, life: 2.2, gravity: 0.6, spread: 0.8 }); await a.wait(0.25); }
        },
      });

      // ── 바깥: 북서쪽 소나무(층층 가지)와 바위 ──
      const pine = (x, y, z, h, R) => {
        for (let i = 0; i < h + 2; i++) w.cyl(x, z, y + i, y + i, Math.max(0.5, 1.6 * (1 - i / h)), i % 5 ? B.bark : B.barkDk);
        for (let ty = y + 5; ty < y + h; ty += 3) {
          const rr = (1 - (ty - y) / (h + 3)) * R + 1.3, RR = Math.ceil(rr + 1);
          for (let dz = -RR; dz <= RR; dz++) for (let dx = -RR; dx <= RR; dx++) {
            const d = Math.hypot(dx, dz), hh = hash3(x + dx, ty, z + dz);
            if (d <= rr && !(d > rr - 1.2 && hh < 0.35)) w.set(x + dx, ty, z + dz, d < rr * 0.5 ? B.leafDk : B.leaf2);
            if (d > rr - 1.6 && d <= rr + 0.7 && hh > 0.25) w.set(x + dx, ty - 1, z + dz, B.leafDk);
            if (d <= rr - 2 && hh > 0.2) w.set(x + dx, ty + 1, z + dz, B.leaf);
          }
        }
        for (let k = 0; k < 3; k++) w.set(x, y + h + k, z, B.leaf);
      };
      for (const [x, z, h] of [[28, 36, 24], [24, 60, 20], [48, 24, 22], [100, 28, 18]]) pine(x, G + 1, z, h, 6.4);
      for (const [x, z] of [[36, 88], [92, 40], [20, 80]]) MH.rock(w, x, G + 1, z, 2.6, B.rock, B.ground2);
      // 화분: 남동쪽 모서리와 북서쪽 다락 아래 구석(걷는 길에서 비켜)
      for (const [x, z] of [[81, 79], [45, 47]]) { w.box(x, G + 1, z, x + 1, G + 2, z + 1, B.pot); w.box(x - 1, G + 3, z - 1, x + 2, G + 3, z + 2, B.leaf); w.box(x, G + 4, z, x + 1, G + 5, z + 1, B.leaf2); }

      // ── 문 안쪽: 밖으로 나가기 ──
      acts.push(OR.goAct({ at: [63, G + 1, Z0 + 4], h: 10, name: '밖으로 나가기', goto: 'stellaris', hint: '돔 집의 검은 문을 열고 천문대 언덕 남동쪽 길로 나가요', hit: [DXa, G + 1, Z0, DXb, G + 9, Z0 + 1] }));
      return { lights, landmarks, acts };
    },
  });
})();
