// 삼림 · 회색 창고 안(하위 지도) — 제재소 서쪽의 유일하게 벽이 막힌 창고(29×14m, 3배). 연하늘 골함석 벽, 청록 철기둥, 녹슨 격자 트러스,
// 동쪽 큰 문 옆 철제 선반(의료품), 바닥의 철제 통나무 받침틀 → 레일 위 운반대 → 둥근 톱 → 롤러 컨베이어 → 판재 더미. 남·동쪽 벽은 낮게 잘라 SE에서 들여다본다
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 120, D = 80, Hh = 56, TAU = Math.PI * 2;
  MAPS.push({
    id: 'woods-in', cat: 'tarkov', sub: true, parent: 'woods', name: '회색 창고', en: 'Woods · Sawmill Warehouse', color: '#7e9a94', seed: 654, base: 14, time: 'day', size: [W, D, Hh],
    desc: '제재소 서쪽, 동쪽 박공에 큰 문이 달린 회색 창고의 안. 어둑한 홀에 연하늘 골함석 벽과 청록 철기둥이 서고, 지붕 밑으로 녹슨 격자 트러스가 지난다. 문 옆 철제 선반에는 의료품 상자가 놓이고, 바닥의 철제 받침틀에 얹힌 통나무는 레일 위 운반대를 타고 둥근 톱을 지나 롤러 컨베이어로 넘어간다.',
    info: { title: '장소 정보', en: 'WOODS · WAREHOUSE', rows: [['위치', '제재소 마당 서쪽 · 회색 창고'], ['크기', '약 29×14m · 동쪽 박공에 큰 문'], ['볼거리', '문 옆 선반의 의료품 · 통나무 받침틀'], ['제재 라인', '운반대 · 둥근 톱 · 롤러 컨베이어']] },
    sky: ['#c4bcaa', '#6e665a', '#e6dcc6'], stars: false,
    hemi: ['#d4dcd8', '#2e3430', 0.56], sun: ['#fff0dc', 0.5, [0.55, 1, 0.45]],
    fog: { start: 0.9, floor: 8, depth: 6, haze: [18, 0.16, 5], hazeColor: '#c8c0b0' },
    camY: -10, zoom: 1.65,
    particles: [
      { n: 70, colors: ['#e8d4a8', '#f4ead0', '#c8b08a'], mode: 'drift', speed: 0.18, wind: 0.15, area: [57, 38, 40], y0: 16, y1: 34, glow: false },
    ],
    blocks: {
      grass: { c: '#4e6034', top: '#62763e', v: 0.1 }, gravel: { c: '#8e8676', top: '#b2aa98', v: 0.08 }, gravelD: { c: '#7e7464', top: '#9c927e', v: 0.07 }, dirt: { c: '#5e4c36', top: '#7a6a50', v: 0.08 }, soil: { c: '#4a3c2c', v: 0.08 },
      conc: { c: '#7c7a74', top: '#8e8c84', v: 0.06, pat: 'stone' }, concD: { c: '#5e5c56', top: '#6a6862', v: 0.06, pat: 'stone' }, sawdust: { c: '#b89868', top: '#d0b07a', v: 0.08 },
      // 벽: 연하늘 골함석, 아래 민트빛 패널, 청록 철기둥, 녹슨 격자 트러스
      sheetB: { c: '#7c9cac', v: 0.1, pat: 'plank' }, sheetB2: { c: '#68889a', v: 0.1, pat: 'plank' }, girt: { c: '#3e5a5c', v: 0.03 }, tealW: { c: '#7e9a94', v: 0.05, pat: 'plank' }, colT: { c: '#3e6a6c', v: 0.03 }, lattice: { c: '#8a4a2e', v: 0.05 }, greyW: { c: '#8e8e86', v: 0.07, pat: 'plank' },
      // 쇠붙이·기계
      iron: { c: '#2e3034', v: 0.03 }, steel: { c: '#8a9298', v: 0.03 }, steelL: { c: '#c4ccd0', v: 0.02 }, rust: { c: '#7a4a2e', v: 0.08 }, mach: { c: '#4e6a4a', v: 0.04 }, machD: { c: '#36483a', v: 0.03 }, hazard: { c: '#d8a830', v: 0.03 },
      shelf: { c: '#9aa0a0', v: 0.03 }, khaki: { c: '#6e6a48', v: 0.04 }, khakiD: { c: '#545238', v: 0.04 },
      // 나무
      logB: { c: '#6e665a', v: 0.08 }, logB2: { c: '#5a5248', v: 0.08 }, logEnd: { c: '#dcc08e', v: 0.05 }, logPith: { c: '#a8865a', v: 0.04 },
      plankN: { c: '#c8a878', top: '#d4b484', v: 0.05, pat: 'plank' }, plankG: { c: '#9a8c74', top: '#aa9c82', v: 0.05, pat: 'plank' }, plankD: { c: '#4e4438', v: 0.05, pat: 'plank' }, beam: { c: '#3e3226', v: 0.04 },
      bark: { c: '#4a3a2c', v: 0.06 }, pineD0: { c: '#3a5a3a', top: '#44663e', v: 0.08 }, pineD1: { c: '#2a4430', v: 0.07 }, pineD2: { c: '#1e3424', v: 0.06 },
      // 상자·잡동사니
      crateG: { c: '#5a6236', v: 0.05, pat: 'plank' }, boxW: { c: '#e4e4dc', v: 0.02 }, redX: { c: '#c8302a', v: 0.02 }, boxB: { c: '#3a5a7a', v: 0.03 }, barrelR: { c: '#8a4a2a', v: 0.06 }, barrelO: { c: '#4e5a36', v: 0.05 },
      // 이정표(OR.signpost)
      stoneG: { c: '#8e8c86', v: 0.05 }, timber: { c: '#3e3226', v: 0.04 }, door: { c: '#9a8c74', v: 0.05, pat: 'plank' }, gold: { c: '#e0b030', v: 0.04 }, mlamp: { c: '#ffe0a0', glow: true },
      // 빛
      lamp: { c: '#ffe0a0', glow: true }, lampO: { c: '#ffa040', glow: true }, led: { c: '#7aff8a', glow: true }, ledR: { c: '#ff4a3a', glow: true },
    },
    build(w) {
      const B = w.id, G = w.base;
      const lights = [], acts = [], landmarks = [];
      // 창고: x 14–100(29m), z 18–59(14m), 벽 높이 16칸. 동쪽 큰 문 z 28–49
      const X0 = 14, X1 = 100, Z0 = 18, Z1 = 59, WH = 16, LOW = 3, DZ0 = 28, DZ1 = 49;
      MH.terrain(w, {
        floor: G - 6, height: () => G,
        surface: (x, z) => { const h = hash3(x, 7, z); if (x > X1) return h > 0.7 ? B.gravelD : (h > 0.15 ? B.gravel : B.dirt); return h > 0.6 ? B.grass : (h > 0.3 ? B.dirt : B.gravelD); },
        under: () => B.soil,
      });
      // 바닥: 더러운 콘크리트
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) w.set(x, G, z, hash3(x >> 1, 3, z >> 1) > 0.78 ? B.concD : B.conc);
      // 벽: 북·서쪽은 끝까지, 남·동쪽은 낮게(잘라 냄). 기둥 15칸마다
      const isCol = x => (x - X0) % 15 === 0 || x === X1;
      for (let y = G + 1; y <= G + WH; y++) {
        for (let x = X0; x <= X1; x++) {
          w.set(x, y, Z0, isCol(x) ? B.colT : (y <= G + 4 ? B.tealW : (hash3(x >> 2, y >> 2, 1) > 0.82 ? B.sheetB2 : B.sheetB)));
          if (y <= G + LOW || isCol(x)) w.set(x, y, Z1, isCol(x) ? B.colT : (y <= G + 2 ? B.tealW : B.sheetB));
        }
        for (let z = Z0; z <= Z1; z++) {
          w.set(X0, y, z, (z - Z0) % 15 === 0 || z === Z1 ? B.colT : (y <= G + 4 ? B.tealW : (hash3(3, y >> 2, z >> 2) > 0.82 ? B.sheetB2 : B.sheetB)));
          if ((y <= G + LOW || z === Z0 || z === Z1) && !(z >= DZ0 && z <= DZ1)) w.set(X1, y, z, z === Z0 || z === Z1 || z === DZ0 - 1 || z === DZ1 + 1 ? B.colT : (y <= G + 2 ? B.tealW : B.sheetB));
        }
      }
      for (const z of [DZ0 - 1, DZ1 + 1]) w.box(X1, G + 1, z, X1, G + 6, z, B.colT);                // 문틀 기둥(낮게)
      w.box(54, G + 1, Z1, 58, G + LOW, Z1, 0); for (const x of [53, 59]) w.box(x, G + 1, Z1, x, G + 6, Z1, B.colT);   // 남쪽 쪽문(바깥 지도와 같은 자리)
      // 서쪽 박공(회색 널판)과 벽 위 띠
      for (let z = Z0; z <= Z1; z++) { const hh = Math.floor(Math.min(z - Z0, Z1 - z) / 3); for (let y = G + WH + 1; y <= G + WH + hh; y++) w.set(X0, y, z, B.greyW); }
      w.box(X0, G + WH, Z0, X1, G + WH, Z0, B.rust);
      for (const y of [G + 8, G + 12]) { for (let x = X0 + 1; x < X1; x++) if (!isCol(x)) w.set(x, y, Z0, B.girt); for (let z = Z0 + 1; z < Z1; z++) if ((z - Z0) % 15) w.set(X0, y, z, B.girt); }   // 가로 띠장
      // 녹슨 격자 트러스: 기둥 위를 남북으로 가로지른다(위·아래 현과 지그재그 빗대)
      for (let x = X0 + 15; x < X1; x += 30) {
        const yb = G + WH - 2, yt = G + WH;
        for (let z = Z0; z <= Z1; z++) { w.set(x, yt, z, B.lattice); if (z % 2 === 0) w.set(x, yb, z, B.lattice); if (z % 4 === 1) w.set(x, yb + 1, z, B.lattice); }
      }
      landmarks.push({ name: '회색 창고', note: '제재소 서쪽 · 문 옆 선반', p: [57, G + WH + 8, 38] });

      const log = (t, axis, a0, a1, u, cy, r, uy) => {
        const R = Math.ceil(r), bk = hash3(a0, cy, u) > 0.5 ? B.logB : B.logB2;
        for (let a = a0; a <= a1; a++) for (let dy = -R; dy <= R; dy++) for (let du = -R; du <= R; du++) {
          const d = Math.hypot(dy, du);
          if (d > r) continue;
          let b = bk;
          if (a === a0 || a === a1) b = d > r - 0.6 ? bk : (d < 0.5 ? B.logPith : B.logEnd);
          if (axis === 'x') t.set(a, cy + dy, u + du, b); else t.set(u + du, cy + dy, a, b);
        }
      };
      const boards = (x0, z0, x1, z1, layers, y0) => {
        for (let k = 0; k < layers; k++) {
          const y = (y0 || G + 1) + k * 2;
          for (let x = x0; x <= x1; x += 4) w.box(x, y, z0, x, y, z1, B.beam);
          w.box(x0, y + 1, z0, x1, y + 1, z1, hash3(x0, k, z0) > 0.5 ? B.plankN : B.plankG);
        }
      };

      // ── 동쪽 문 옆 철제 선반(북쪽 벽): 상자들과 의료품 상자 ──
      const SH0 = 80, SH1 = 97;
      for (let x = SH0; x <= SH1; x++) for (const y of [G + 1, G + 4, G + 7, G + 10]) w.box(x, y, Z0 + 1, x, y, Z0 + 3, B.shelf);
      for (let x = SH0; x <= SH1; x += 6) for (const z of [Z0 + 1, Z0 + 3]) w.box(x, G + 1, z, x, G + 11, z, B.steel);
      w.box(SH1, G + 1, Z0 + 1, SH1, G + 11, Z0 + 1, B.steel);
      for (const [x, y, b] of [[81, G + 5, B.crateG], [83, G + 5, B.boxB], [88, G + 2, B.crateG], [89, G + 2, B.crateG], [93, G + 8, B.boxB], [88, G + 8, B.khaki]]) w.box(x, y, Z0 + 1, x + 1, y + 1, Z0 + 2, b);
      w.box(83, G + 11, Z0 + 1, 85, G + 11, Z0 + 3, B.boxW); w.set(84, G + 11, Z0 + 3, B.redX);
      const med = w.prop({ name: 'medlid', pivot: [84, G + 12, Z0 + 1.2] });
      med.box(83, G + 12, Z0 + 1, 85, G + 12, Z0 + 3, B.boxW); med.set(84, G + 12, Z0 + 2, B.redX);
      w.set(84, G + 13, Z0 + 7, B.lamp); w.box(84, G + 14, Z0 + 7, 84, G + WH - 1, Z0 + 7, B.iron);
      lights.push({ name: 'shelf', p: [84.5, G + 13, Z0 + 7.5], c: '#e8f4ff', i: 0.35, d: 18, flicker: 0.1, srcR: 3 });
      acts.push({
        name: '선반의 의료품 상자', hint: '문 옆 철제 선반 위 하얀 의료품 상자 뚜껑이 젖혀지고, 붉은 십자 아래 약품이 반짝여요', hit: [82, G + 10, Z0 + 1, 86, G + 13, Z0 + 4],
        run: async a => {
          a.flash('shelf', 6, 4);
          await a.turn('medlid', [1.6, 0, 0], 0.6);
          for (let k = 0; k < 5; k++) { a.burst([84.5, G + 13, Z0 + 2.5], { n: 12, colors: ['#ffffff', '#ff6a5a', '#c8f0ff'], speed: 1.2, up: 3, life: 1.1, gravity: 3, spread: 0.8 }); await a.wait(0.4); }
          await a.wait(0.6);
          await a.turn('medlid', [0, 0, 0], 0.5);
        },
      });
      landmarks.push({ name: '철제 선반', note: '의료품 · 수리 키트가 나오는 자리', p: [88.5, G + 16, Z0 + 2] });

      // ── 철제 통나무 받침틀(문 안쪽 바닥) 위 통나무, 바닥에 길게 누운 통나무 ──
      for (const fx of [84, 92]) {
        w.walls(fx, G + 1, 27, fx + 5, G + 1, 41, B.iron);
        for (const z of [27, 34, 41]) for (const x of [fx, fx + 5]) w.box(x, G + 2, z, x, G + 3, z, B.iron);
      }
      log(w, 'z', 26, 42, 87, G + 4, 1.3); log(w, 'z', 27, 41, 94, G + 4, 1.3);
      const rl = w.prop({ name: 'deckLog', pivot: [90.5, G + 4.5, 34.5] });
      log(rl, 'z', 26, 42, 90, G + 5, 1.3);
      log(w, 'x', 70, 96, 54, G + 2, 1.2);
      acts.push({
        name: '통나무 받침틀', hint: '문 안쪽 철제 받침틀 위 통나무가 데굴데굴 굴러 레일 쪽으로 넘어가요', hit: [83, G + 1, 26, 98, G + 7, 42],
        run: async a => {
          await a.tween('deckLog', { off: [-3, -0.6, 0], rot: [0, 0, 1.6] }, 0.7);
          await a.tween('deckLog', { off: [-7, -1, 0], rot: [0, 0, 3.6] }, 0.8);
          a.burst([82.5, G + 2, 34.5], { n: 26, colors: ['#a89a78', '#d8c8a0'], speed: 3, up: 1, life: 1, gravity: 2, spread: 4, flat: true });
          await a.wait(1.2);
          await a.respawn('deckLog', 1.0);
        },
      });

      // ── 레일과 운반대, 둥근 톱(헤드 쏘) ──
      const RZA = 33, RZB = 38, SX = 52, SY = G + 6, SZ = 31;
      for (let x = 22; x <= 82; x++) { w.set(x, G + 1, RZA, B.steel); w.set(x, G + 1, RZB, B.steel); if (x % 3 === 0) w.box(x, G, RZA, x, G, RZB, B.beam); }
      const cart = w.prop({ name: 'carriage', pivot: [74.5, G + 2, 35.5] });
      cart.box(68, G + 2, RZA, 81, G + 2, RZB, B.machD); cart.box(68, G + 3, RZA, 81, G + 3, RZA, B.hazard);
      for (const x of [69, 75, 80]) cart.box(x, G + 3, RZA + 1, x, G + 5, RZA + 1, B.iron);
      log(cart, 'x', 67, 82, 36, G + 5, 1.9);
      // 톱 몸통: 녹색 기계함, 모터, 날 덮개
      w.box(SX - 4, G + 1, SZ - 6, SX + 4, G + 6, SZ - 3, B.mach); w.box(SX - 4, G + 7, SZ - 6, SX + 4, G + 7, SZ - 3, B.machD);
      w.box(SX - 1, G + 6, SZ - 2, SX + 1, G + 6, SZ - 1, B.iron);
      w.box(SX - 5, G + 1, SZ - 2, SX + 5, G + 1, SZ, B.iron);
      for (let x = SX - 5; x <= SX + 5; x++) { const dy = Math.round(Math.sqrt(Math.max(0, 30 - (x - SX) ** 2))); w.set(x, SY + dy, SZ - 1, B.hazard); }
      w.set(SX + 3, G + 5, SZ - 3, B.ledR);
      const blade = w.prop({ name: 'blade', pivot: [SX + 0.5, SY + 0.5, SZ + 0.5], axis: 'z', speed: 0.15 });
      for (let dy = -5; dy <= 5; dy++) for (let dx = -5; dx <= 5; dx++) {
        const d = Math.hypot(dx, dy);
        if (d > 4.6) continue;
        const ang = Math.round((Math.atan2(dy, dx) / TAU + 1) * 20) % 2;
        blade.set(SX + dx, SY + dy, SZ, d < 1.2 ? B.iron : (d > 3.8 ? (ang ? B.steelL : B.iron) : B.steel));
      }
      w.box(SX, G + WH - 3, SZ + 1, SX, G + WH - 3, SZ + 1, B.iron); w.set(SX, G + 11, SZ + 1, B.lamp); w.box(SX, G + 12, SZ + 1, SX, G + WH - 4, SZ + 1, B.iron);
      lights.push({ name: 'saw', p: [SX + 0.5, G + 11, SZ + 1.5], c: '#ffe0b0', i: 0.45, d: 20, flicker: 0.1, srcR: 3 });
      for (let x = SX - 7; x <= SX + 6; x++) for (let z = SZ + 2; z <= RZB + 6; z++) if (hash3(x, 1, z) > 0.45 && !w.get(x, G + 1, z)) w.set(x, G + 1, z, B.sawdust);
      w.box(SX - 3, G + 1, RZB + 3, SX + 2, G + 2, RZB + 7, B.sawdust); w.box(SX - 2, G + 3, RZB + 4, SX + 1, G + 3, RZB + 6, B.sawdust);
      acts.push({
        name: '둥근 톱 가동', hint: '레일 위 운반대가 통나무를 싣고 둥근 톱으로 밀려 들어가고, 큰 톱날이 윙 돌며 톱밥을 흩뿌려요', hit: [SX - 6, G + 1, SZ - 6, 82, G + 12, RZB],
        run: async a => {
          a.flash('saw', 6, 7);
          const spin = a.turn('blade', [0, 0, -TAU * 12], 6.5, t => t);
          await a.move('carriage', [-26, 0, 0], 4);
          for (let k = 0; k < 6; k++) { a.burst([SX + 0.5, SY - 2, SZ + 3], { n: 18, colors: ['#e0c48a', '#c8a870', '#f4e4c0'], speed: 4, up: 3.5, life: 1.2, gravity: 6, spread: 1 }); await a.wait(0.25); }
          await spin; a.unwind('blade');
          await a.move('carriage', [0, 0, 0], 2.6);
        },
      });
      landmarks.push({ name: '둥근 톱', note: '운반대 레일 · 헤드 쏘', p: [SX + 0.5, G + 18, SZ] });

      // ── 롤러 컨베이어(톱 뒤 서쪽): 판재가 굴림대를 타고 판재 더미로 ──
      const CZ0 = 34, CZ1 = 37, CY = G + 4;
      for (let x = 18; x <= 46; x++) { w.set(x, CY, CZ0, B.iron); w.set(x, CY, CZ1, B.iron); if (x % 2 === 0) w.box(x, CY, CZ0 + 1, x, CY, CZ1 - 1, B.steel); if (x % 7 === 4) for (const z of [CZ0, CZ1]) w.box(x, G + 1, z, x, CY - 1, z, B.iron); }
      const plank = w.prop({ name: 'plank', pivot: [41.5, CY + 1, 35.5] });
      plank.box(37, CY + 1, CZ0 + 1, 46, CY + 1, CZ1 - 1, B.plankN);
      boards(16, 22, 30, 29, 3); boards(16, 42, 30, 48, 2);
      w.box(16, G + 5, 31, 22, G + 5, 32, B.plankN);
      acts.push({
        name: '롤러 컨베이어', hint: '톱을 지난 판재가 롤러 컨베이어를 타고 덜컹덜컹 서쪽으로 흘러가 판재 더미에 떨어져요', hit: [18, CY - 1, CZ0, 46, CY + 2, CZ1],
        run: async a => {
          for (let k = 0; k < 6; k++) { await a.move('plank', [-4 * (k + 1), (k % 2) * 0.2, 0], 0.4); }
          await a.move('plank', [-24, 1, -7], 0.4);
          await a.move('plank', [-24, 0.4, -9], 0.3);
          a.burst([17.5, G + 7, 28], { n: 22, colors: ['#e0c48a', '#c8a870'], speed: 2.4, up: 1.5, life: 1, gravity: 3, spread: 2 });
          await a.wait(1);
          await a.respawn('plank', 1.0);
        },
      });

      // ── 발전기와 천장 등(남서쪽) ──
      const GX = 36, GZ = 52;
      const gen = w.prop({ name: 'gen', pivot: [GX + 2.5, G + 1, GZ + 1.5] });
      gen.box(GX, G + 1, GZ, GX + 5, G + 4, GZ + 3, B.khaki); gen.box(GX, G + 5, GZ, GX + 5, G + 5, GZ + 3, B.khakiD); gen.box(GX + 1, G + 2, GZ + 3, GX + 2, G + 3, GZ + 3, B.iron);
      gen.box(GX + 5, G + 6, GZ + 1, GX + 5, G + 8, GZ + 1, B.iron); gen.set(GX + 4, G + 3, GZ + 3, B.lampO);
      const fly = w.prop({ name: 'fly', pivot: [GX - 0.5, G + 3.5, GZ + 1.5], axis: 'x' });
      for (let dy = -2; dy <= 2; dy++) for (let dz = -2; dz <= 2; dz++) { const d = Math.hypot(dy, dz); if (d <= 2.3) fly.set(GX - 1, G + 3 + dy, GZ + 1 + dz, d < 0.8 ? B.iron : ((dy + dz + 4) % 2 ? B.hazard : B.machD)); }
      for (const [x, z, b] of [[GX - 4, GZ - 1, B.barrelR], [GX - 4, GZ + 4, B.barrelO], [GX - 6, GZ + 2, B.barrelR]]) w.box(x, G + 1, z, x, G + 4, z, b);
      for (let x = GX - 1; x >= 24; x--) w.set(x, G + 1, GZ + 5, B.iron);                                      // 바닥 전선
      const LA = [29, G + 12, 38], LBp = [59, G + 12, 44];
      for (const [x, y, z] of [LA, LBp]) { w.set(x, y, z, B.lamp); w.box(x, y + 1, z, x, G + WH - 3, z, B.iron); }
      lights.push({ name: 'lampA', p: [LA[0] + 0.5, LA[1], LA[2] + 0.5], c: '#ffd890', i: 0.4, d: 22, flicker: 0.15, srcR: 3 });
      lights.push({ name: 'lampB', p: [LBp[0] + 0.5, LBp[1], LBp[2] + 0.5], c: '#ffd890', i: 0.4, d: 22, flicker: 0.15, srcR: 3 });
      lights.push({ name: 'gen', p: [GX + 4.5, G + 3, GZ + 3.5], c: '#ffa040', i: 0.2, d: 8, flicker: 0.3, srcR: 2 });
      acts.push({
        name: '발전기 시동', hint: '남서쪽 구석의 카키색 발전기가 털털 돌기 시작해 연기를 뿜고, 천장 등이 깜빡이다 환하게 켜져요', hit: [GX - 2, G + 1, GZ - 1, GX + 5, G + 8, GZ + 3],
        run: async a => {
          a.flash('gen', 8, 6);
          const sp = a.turn('fly', [TAU * 10, 0, 0], 5, t => t);
          for (let k = 0; k < 10; k++) {
            a.burst([GX + 5.5, G + 9, GZ + 1.5], { n: 10, colors: ['#4a4a48', '#6a6a66', '#2e2e2e'], speed: 0.8, up: 3, life: 1.8, gravity: -0.5, spread: 0.5 });
            await a.move('gen', [0.15, 0.2, 0], 0.08); await a.move('gen', [-0.1, 0, 0], 0.08);
            if (k === 3 || k === 5) { a.flash('lampA', 0.2, 0.2); a.flash('lampB', 0.2, 0.2); }
            await a.wait(0.15);
          }
          await a.move('gen', [0, 0, 0], 0.1);
          await sp; a.unwind('fly');
          a.flash('lampA', 4, 4); a.flash('lampB', 4, 4); a.glow(1.3, 3);
          await a.wait(3);
        },
      });

      // ── 작업대와 무전기(남쪽 낮은 벽 앞) ──
      w.box(62, G + 3, 54, 76, G + 3, 57, B.plankD); for (const x of [62, 76]) for (const z of [54, 57]) w.box(x, G + 1, z, x, G + 2, z, B.beam);
      w.box(64, G + 4, 55, 65, G + 5, 56, B.iron); w.box(70, G + 4, 54, 74, G + 4, 55, B.steel); w.box(67, G + 4, 56, 68, G + 4, 57, B.crateG);
      const RX = 72, RZ = 56;
      w.box(RX, G + 4, RZ, RX + 2, G + 5, RZ + 1, B.machD); w.set(RX, G + 5, RZ + 1, B.led); w.box(RX + 2, G + 6, RZ, RX + 2, G + 9, RZ, B.iron);
      lights.push({ name: 'radio', p: [RX + 0.5, G + 5.5, RZ + 1.5], c: '#7aff8a', i: 0.25, d: 10, flicker: 0.2, srcR: 2 });
      acts.push({
        name: '무전기', hint: '작업대 위 군용 무전기가 지직거리며 초록 불이 깜빡여요. 호위병들이 서로 부르는 소리 같아요', hit: [RX - 1, G + 4, RZ - 1, RX + 3, G + 9, RZ + 2],
        run: async a => {
          for (let k = 0; k < 8; k++) { a.flash('radio', 8, 0.25); a.burst([RX + 2.5, G + 10, RZ + 0.5], { n: 6, colors: ['#7aff8a', '#d8ffd8'], speed: 1.6, up: 1, life: 0.5, gravity: 0, spread: 0.3, flat: true }); await a.wait(0.35); }
        },
      });
      // 바닥 잡동사니: 팔레트·상자·톱밥
      for (const [x, z] of [[58, 21], [24, 52], [82, 50]]) { w.box(x, G + 1, z, x + 3, G + 1, z + 3, B.beam); w.box(x, G + 2, z, x + 3, G + 2, z + 3, B.plankN); }
      w.box(59, G + 3, 22, 61, G + 4, 23, B.crateG); w.box(83, G + 3, 51, 84, G + 5, 52, B.crateG);
      for (let k = 0; k < 120; k++) { const x = w.ri(X0 + 1, X1 - 1), z = w.ri(Z0 + 1, Z1 - 1); if (!w.get(x, G + 1, z)) w.set(x, G, z, B.sawdust); }

      // ── 문 밖: 자갈 마당, 판재 더미, 열린 미닫이문 두 짝(낮게 잘림), 이정표 ──
      for (const [z0, z1] of [[DZ0 - 7, DZ0 - 2], [DZ1 + 2, DZ1 + 7]]) w.box(X1 + 1, G + 1, z0, X1 + 1, G + LOW + 1, z1, B.tealW);
      boards(106, 20, 114, 25, 3);
      log(w, 'x', 104, 116, 60, G + 2, 1.4); log(w, 'x', 105, 115, 63, G + 2, 1.4); log(w, 'x', 106, 114, 61, G + 4, 1.4);
      for (const [x, z] of [[116, 6], [104, 4], [112, 74], [8, 70], [6, 8]]) MH.tree(w, x, G + 1, z, { kind: 'pine', h: 14, r: 3, bark: B.bark, leaves: [B.pineD0, B.pineD1, B.pineD2] });
      const sp = OR.signpost(w, B, 108, 46, { dir: [1, 0], boards: 1, h: 6 });
      acts.push(OR.goAct({ at: sp, name: '제재소 마당으로', goto: 'woods', hint: '큰 문을 나서 슈투르만의 제재소 마당으로 돌아가요' }));
      return { lights, landmarks, acts };
    },
  });
})();
