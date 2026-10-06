// 길드 본부 판테온(하위 지도) — 바벨 서쪽, 흰 대리석 신전 같은 길드 본부의 1층 로비. 북쪽 벽을 따라 긴 접수 창구와 직원 책상,
// 그 위 2층 회랑(서쪽은 길드장 집무실), 서쪽 벽 의뢰 게시판, 동쪽 마석 환전소, 남서쪽 어드바이저 상담 부스, 가운데 던전 지도 탁자, 색유리 창. 남·동쪽(시점 쪽) 벽은 낮게 잘랐다 (바벨의 하위 지도)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 80, D = 80, Hh = 48, G = 10;
  const X0 = 16, X1 = 63, Z0 = 18, Z1 = 61;                   // 바깥 벽선
  MAPS.push({
    id: 'babel-guild', cat: 'orario', sub: true, parent: 'babel', name: '길드 본부 판테온', en: 'Guild Headquarters · Pantheon', color: '#e8e0c8', seed: 11011, base: G, time: 'day', size: [W, D, Hh],
    desc: '바벨 서쪽 큰길가, 흰 대리석 기둥이 늘어선 신전 같은 길드 본부 「판테온」의 로비. 북쪽 벽을 따라 접수 창구가 길게 이어지고, 모험가들은 서쪽 게시판에서 의뢰서를 고르고 동쪽 환전소에서 마석을 돈으로 바꾼다. 남서쪽 칸막이 부스에서는 담당 어드바이저가 던전 공략을 가르쳐 준다.',
    info: { title: '장소 정보', en: 'GUILD', rows: [['1층', '접수 창구 · 의뢰 게시판 · 마석 환전소'], ['상담 부스', '담당 어드바이저의 던전 공략 강의'], ['2층', '서류 보관 회랑 · 길드장 집무실'], ['하는 일', '던전 관리 · 모험가 등록 · 파밀리아 등급 매기기']] },
    sky: ['#cfe4f4', '#5a8ac0', '#fff6e0'], stars: false,
    hemi: ['#fff8ec', '#5a5448', 0.64], sun: ['#fff4e0', 0.7, [0.45, 1, 0.6]],
    night: { sky: ['#2a3050', '#080a18', '#e8b070'], stars: true, hemi: ['#d0c8d8', '#1a1814', 0.5], sun: ['#d8e0ff', 0.34, [0.45, 1, 0.6]], haze: '#2a2a3a' },
    fog: { start: 0.96, floor: G - 8, depth: 4, haze: [8, 0.14, 6], hazeColor: '#e8e4d8' },
    camY: -4, zoom: 1.5,
    particles: [
      { n: 90, colors: ['#fff6d8', '#ffffff'], mode: 'drift', speed: 0.12, wind: 0.1, area: [40, 40, 22], y0: G + 2, y1: G + 16, glow: true },
      { n: 30, colors: ['#e8504a', '#4a7ae8', '#f0c84a'], mode: 'fall', speed: 0.08, area: [26, 30, 8], y0: G + 2, y1: G + 14, glow: true },
    ],
    blocks: Object.assign(OR.blocks(), {
      mW: { c: '#f0ece4', v: 0.03, pat: 'big' }, mW2: { c: '#e2dcd0', v: 0.03, pat: 'brick' }, gTrim: { c: '#f6f1e6', v: 0.02 }, gStone: { c: '#d8c08a', v: 0.04, pat: 'brick' },
      floorC: { c: '#d8d2c4', top: '#ece6da', v: 0.03, pat: 'check', alt: '#c8c0b0' }, floorD: { c: '#8a8478', top: '#a49c8e', v: 0.03 }, runner: { c: '#2a4a8a', v: 0.03 }, runnerE: { c: '#d8b048', v: 0.03 },
      glassR: { c: '#e8504a', glow: true }, glassB: { c: '#4a7ae8', glow: true }, glassY: { c: '#f0c84a', glow: true },
      counter: { c: '#7a5232', top: '#d8d0c0', v: 0.04, pat: 'plank' }, wood: { c: '#7a5a3a', v: 0.05, pat: 'plank' }, woodD: { c: '#4e3624', v: 0.04, pat: 'plank' }, cork: { c: '#a07848', v: 0.08 },
      paper: { c: '#f4f0e4', v: 0.02 }, paperY: { c: '#f0e0a0', v: 0.03 }, paperR: { c: '#f0b8a8', v: 0.03 }, ink: { c: '#2a2a3a', v: 0.02 },
      mstone: { c: '#c070ff', glow: true }, coin: { c: '#f0c84a', v: 0.05 }, brass: { c: '#c8a050', v: 0.06 }, velvet: { c: '#7a1a2a', v: 0.04 }, glassP: { c: '#c8dce8', v: 0.02 },
      mapB: { c: '#3a4a50', top: '#465a60', v: 0.06 }, mapG: { c: '#7ad8e8', glow: true }, mapL: { c: '#5a7a68', v: 0.06 }, mapR: { c: '#8a5a4a', v: 0.06 },
      oil: { c: '#ffd890', glow: true }, glyph: { c: '#ffe9a0', glow: true }, plant: { c: '#4a7a36', top: '#6a9a44', v: 0.1 },
    }),
    build(w) {
      const B = w.id;
      const lights = [], acts = [], landmarks = [];
      const inside = (x, z) => x > X0 && x < X1 && z > Z0 && z < Z1;
      MH.terrain(w, {
        floor: G - 6, height: () => G,
        surface: (x, z) => inside(x, z) ? B.floorC : (z > Z1 + 1 && z < Z1 + 9 ? ((x + z) % 7 === 0 ? B.paveL : B.brick) : (hash3(x, 1, z) > 0.85 ? B.stoneG : B.pave)),
        under: (x, z, y, dep) => dep < 2 ? B.soil : B.rock,
      });
      // 바닥: 흰 체크 대리석, 가운데 남색 통로 깔개(입구→창구)
      for (let z = Z0 + 1; z < Z1; z++) for (let x = 38; x <= 42; x++) if (z > 29) w.set(x, G, z, x === 38 || x === 42 ? B.runnerE : B.runner);
      for (let z = Z0 + 1; z < Z1; z++) for (let x = X0 + 1; x < X1; x++) if ((x === X0 + 1 || x === X1 - 1 || z === Z0 + 1 || z === Z1 - 1) && w.get(x, G, z) === B.floorC) w.set(x, G, z, B.floorD);

      // ── 벽: 북·서는 높고(색유리 뾰족 창 두 단), 남·동은 낮다. 안쪽은 흰 대리석, 띠는 금빛 ──
      const HI = G + 17, LO = G + 4;
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (x !== X0 && x !== X1 && z !== Z0 && z !== Z1) continue;
        const hi = z === Z0 || x === X0, top = hi ? HI : LO;
        for (let y = G + 1; y <= top; y++) {
          let b = (y - G) % 8 === 0 || y === top ? B.gTrim : (y === G + 1 ? B.mW2 : B.mW);
          if (hi && y === G + 9) b = B.gold;
          w.set(x, y, z, b);
        }
        // 바깥 겉면은 노란 돌(바벨에서 보던 모습)
        if (hi) for (let y = G + 1; y <= top; y++) { const ox = x === X0 ? x - 1 : x, oz = z === Z0 ? z - 1 : z; if (ox !== x || oz !== z) w.set(ox, y, oz, (y - G) % 7 === 0 ? B.gTrim : B.gStone); }
      }
      const glass = [B.glassR, B.glassB, B.glassY];
      for (let x = X0 + 5; x <= X1 - 4; x += 6) LB.arch(w, { axis: 'x', c: Z0, u0: x, y0: G + 11, a: 1, h: 4, kind: 'pointed', fill: glass[(x >> 1) % 3], frame: B.gTrim });
      for (let z = Z0 + 5; z <= Z1 - 4; z += 6) { LB.arch(w, { axis: 'z', c: X0, u0: z, y0: G + 11, a: 1, h: 4, kind: 'pointed', fill: glass[(z >> 1) % 3], frame: B.gTrim }); if (z > 28) LB.arch(w, { axis: 'z', c: X0, u0: z, y0: G + 2, a: 1, h: 5, kind: 'pointed', fill: glass[(z + 1) % 3], frame: B.gTrim }); }
      for (let x = X0 + 6; x <= X1 - 6; x += 8) if (Math.abs(x - 40) > 6) w.box(x, G + 2, Z1, x + 1, G + 3, Z1, B.win);
      for (let z = Z0 + 6; z <= Z1 - 6; z += 8) w.box(X1, G + 2, z, X1, G + 3, z + 1, B.win);
      lights.push({ name: 'glassR', p: [X0 + 3, G + 12, 30.5], c: '#ff8a7a', i: 0.45, d: 26, flicker: 0.05, srcR: 4 });
      lights.push({ name: 'glassB', p: [40.5, G + 12, Z0 + 3], c: '#8ab0ff', i: 0.45, d: 26, flicker: 0.05, srcR: 4 });

      // ── 정문(남쪽 가운데): 둥근 아치 문, 문 둘레만 높인 흰 문간, 금빛 쐐기돌 ──
      w.box(33, G + 1, Z1, 47, G + 11, Z1, B.mW); for (let x = 33; x <= 47; x++) { w.set(x, G + 11, Z1, B.gTrim); w.set(x, G + 12, Z1, (x & 1) ? B.gTrim : 0); }
      for (const x of [34, 46]) w.box(x, G + 1, Z1 - 1, x, G + 10, Z1 - 1, B.mW2);
      LB.arch(w, { axis: 'x', c: Z1, u0: 40, y0: G + 1, a: 2, h: 6, kind: 'round', fill: B.door, frame: B.gTrim });
      w.set(40, G + 9, Z1, B.gold); w.set(40, G + 9, Z1 - 1, B.gold);
      for (let z = Z1 + 1; z <= Z1 + 8; z++) for (let x = 36; x <= 44; x++) w.set(x, G, z, x === 36 || x === 44 ? B.trimW : B.paveL);
      const lp1 = OR.lamp(w, B, 34, Z1 + 4, 5); OR.lamp(w, B, 46, Z1 + 4, 5);
      lights.push({ name: 'door', p: [40.5, lp1[1], lp1[2]], c: '#fff0c0', i: 0.4, d: 14, flicker: 0.1, srcR: 7 });
      for (const x of [35, 45]) { w.set(x, G + 1, Z1 - 2, B.mW2); w.set(x, G + 2, Z1 - 2, B.plant); w.set(x, G + 3, Z1 - 2, B.plant); }

      // ── 기둥 두 줄(흰 몸통, 금빛 머리) ──
      const col = (x, z) => {
        w.box(x - 1, G + 1, z - 1, x + 1, G + 1, z + 1, B.mW2);
        for (let y = G + 2; y <= G + 14; y++) w.box(x, y, z, x, y, z, (y - G) % 2 ? B.mW : B.gTrim);
        w.box(x - 1, G + 15, z - 1, x + 1, G + 15, z + 1, B.gold); w.box(x - 1, G + 16, z - 1, x + 1, G + 16, z + 1, B.gTrim);
      };
      for (const x of [22, 30, 50, 58]) col(x, 34);
      for (const x of [50, 58]) col(x, 50);

      // ── 2층 회랑(북쪽): 서류 보관 회랑과 서쪽 길드장 집무실, 금빛 난간 ──
      const MY = G + 8, MZ1 = 25;
      w.box(X0 + 1, MY, Z0 + 1, X1 - 1, MY, MZ1, B.wood); w.box(X0 + 1, MY - 1, MZ1, X1 - 1, MY - 1, MZ1, B.gTrim);
      for (let x = X0 + 1; x < X1; x++) { w.set(x, MY + 2, MZ1, B.gold); if (x % 2 === 0) w.set(x, MY + 1, MZ1, B.gTrim); }
      for (let x = X0 + 4; x < X1; x += 8) w.box(x, G + 1, MZ1, x, MY - 2, MZ1, B.mW2);
      // 회랑 계단(서쪽 벽을 따라, 남→북으로 오른다)
      for (let s = 0; s < 7; s++) { const z = 32 - s; w.box(X0 + 1, G + 1, z, X0 + 3, G + 1 + s, z, B.mW2); w.box(X0 + 1, G + 1 + s, z, X0 + 3, G + 1 + s, z, B.wood); }
      for (let x = X0 + 1; x <= X0 + 3; x++) { w.set(x, MY + 1, MZ1, 0); w.set(x, MY + 2, MZ1, 0); }
      // 길드장 집무실(서쪽 끝): 칸막이, 큰 책상, 붉은 의자, 금화 궤짝, 책장
      for (let z = Z0 + 1; z <= MZ1; z++) if (z < Z0 + 3 || z > Z0 + 4) w.box(31, MY + 1, z, 31, MY + 4, z, B.woodD);
      w.box(22, MY + 1, Z0 + 4, 26, MY + 2, Z0 + 5, B.woodD); w.box(22, MY + 2, Z0 + 4, 26, MY + 2, Z0 + 5, B.wood); w.set(23, MY + 3, Z0 + 4, B.paper); w.set(25, MY + 3, Z0 + 5, B.ink); w.set(26, MY + 3, Z0 + 4, B.oil);
      w.box(24, MY + 1, Z0 + 2, 24, MY + 3, Z0 + 2, B.velvet); w.set(24, MY + 1, Z0 + 3, B.velvet);
      w.box(28, MY + 1, Z0 + 1, 29, MY + 2, Z0 + 2, B.woodD); w.box(28, MY + 3, Z0 + 1, 29, MY + 3, Z0 + 2, B.coin);
      for (let x = X0 + 1; x <= 21; x++) for (let y = MY + 1; y <= MY + 5; y++) w.set(x, y, Z0 + 1, (y - MY) % 2 ? [B.paper, B.velvet, B.wood][(hash3(x, y, 2) * 3) | 0] : B.woodD);
      // 서류 보관 선반(회랑 동쪽)
      for (let x = 34; x < X1 - 1; x++) if (x % 6 !== 0) for (let y = MY + 1; y <= MY + 5; y++) w.set(x, y, Z0 + 1, (y - MY) % 2 ? (hash3(x, y, 4) > 0.3 ? B.paper : B.paperY) : B.woodD);
      // 북쪽 벽 가운데 길드 문장(둥근 금판)
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const d = Math.hypot(dx, dy); if (d > 3.4) continue; w.set(40 + dx, MY + 6 + dy, Z0 + 1, d < 0.6 ? B.glassY : (d < 2.4 ? B.gold : B.gTrim)); }
      landmarks.push({ name: '길드장 집무실', note: '2층 서쪽 · 서쪽 계단', p: [25.5, MY + 14, Z0 + 4.5] });

      // ── 접수 창구(북쪽): 긴 카운터에 창구 다섯, 금빛 종, 서류 더미. 뒤쪽은 직원 책상과 서류장 ──
      const CZ = 28;
      for (let x = 22; x <= 58; x++) {
        if (x >= 34 && x <= 35) continue;                                     // 직원 드나드는 틈
        w.box(x, G + 1, CZ, x, G + 2, CZ, B.counter); w.set(x, G + 3, CZ, (x - 22) % 7 === 0 ? B.gTrim : 0);
        w.set(x, G + 1, CZ + 1, B.woodD);
      }
      const bells = [];
      for (let k = 0; k < 5; k++) { const x = 25 + k * 7; if (x >= 33 && x <= 36) continue; w.set(x, G + 3, CZ, B.brass); w.set(x + 2, G + 3, CZ, B.paper); w.set(x + 3, G + 3, CZ, hash3(k, 1, 1) > 0.5 ? B.paperY : B.ink); bells.push([x + 0.5, G + 4, CZ + 0.5]); }
      for (let x = 23; x <= 57; x += 6) { w.box(x, G + 1, 22, x + 2, G + 2, 23, B.wood); w.set(x, G + 3, 22, B.paper); w.set(x + 2, G + 3, 23, B.oil); w.set(x + 1, G + 1, 24, B.woodD); }
      for (let x = 36; x <= 62; x += 1) if (x % 5) for (let y = G + 1; y <= G + 4; y++) w.set(x, y, Z0 + 1, y % 2 ? B.woodD : B.paper);
      lights.push({ name: 'hall', p: [40.5, G + 6, 27], c: '#ffe0a8', i: 0.55, d: 40, flicker: 0.08, srcR: 6 });
      landmarks.push({ name: '접수 창구', note: '모험가 등록 · 의뢰 접수', p: [40.5, G + 22, CZ + 0.5], boss: true });

      // ── 서쪽 벽: 의뢰 게시판(코르크판에 의뢰서, 부품: 떨어져 날리는 의뢰서 넉 장) ──
      const QZ0 = 38, QZ1 = 52;
      w.box(X0 + 1, G + 2, QZ0, X0 + 1, G + 9, QZ1, B.woodD); w.box(X0 + 1, G + 3, QZ0 + 1, X0 + 1, G + 8, QZ1 - 1, B.cork);
      for (let z = QZ0 + 1; z < QZ1; z++) for (let y = G + 3; y <= G + 8; y++) if (hash3(z, y, 6) > 0.45) w.set(X0 + 1, y, z, [B.paper, B.paperY, B.paperR, B.paper][(hash3(z, y, 7) * 4) | 0]);
      const notes = w.prop({ name: 'notes', pivot: [X0 + 2.5, G + 6, 45.5] });
      for (const [y, z] of [[G + 4, 40], [G + 6, 43], [G + 5, 47], [G + 7, 50]]) notes.set(X0 + 2, y, z, B.paperY);
      for (let z = QZ0; z <= QZ1; z += 7) { w.set(X0 + 2, G + 1, z, B.wood); }
      acts.push({
        name: '의뢰서 고르기', hint: '서쪽 벽 의뢰 게시판에서 의뢰서가 떨어져 날아오르고, 종이가 팔랑팔랑 흩날려요', hit: [X0 + 1, G + 1, QZ0, X0 + 3, G + 9, QZ1],
        run: async a => {
          await a.tween('notes', { off: [3, 2, 0], rot: [0, 0.6, 0.3] }, 1);
          for (let k = 0; k < 8; k++) { a.burst([X0 + 3, G + 6, QZ0 + 1.5 + k * 1.7], { n: 10, colors: ['#f4f0e4', '#f0e0a0', '#f0b8a8'], speed: 2, up: 1.5, life: 2, gravity: 0.7, spread: 1, flat: true }); await a.wait(0.2); }
          await a.tween('notes', { off: [0, 0, 0], rot: [0, 0, 0] }, 1);
        },
      });
      landmarks.push({ name: '의뢰 게시판', note: '서쪽 벽 · 오늘의 의뢰', p: [X0 + 2, G + 16, 45] });

      // ── 동쪽: 마석 환전소(작은 카운터, 저울(부품: 저울대), 마석과 금화 더미) ──
      const EX = 56, EZ = 42;
      w.box(EX - 2, G + 1, EZ - 3, EX - 2, G + 2, EZ + 3, B.counter); w.box(EX - 2, G + 1, EZ - 3, EX + 4, G + 2, EZ - 3, B.counter);
      for (let z = EZ - 3; z <= EZ + 3; z++) w.set(EX - 2, G + 3, z, z % 2 ? B.glassP : 0);
      w.box(EX + 1, G + 1, EZ, EX + 1, G + 5, EZ, B.brass);
      const beam = w.prop({ name: 'scale', pivot: [EX + 1.5, G + 6.5, EZ + 0.5], axis: 'z' });
      beam.box(EX - 2, G + 6, EZ, EX + 4, G + 6, EZ, B.brass); beam.set(EX + 1, G + 6, EZ, B.gold);
      for (const dx of [-2, 4]) { beam.box(EX + dx, G + 4, EZ, EX + dx, G + 5, EZ, B.ink); beam.set(EX + dx - 1, G + 3, EZ, B.brass); beam.set(EX + dx, G + 3, EZ, B.brass); beam.set(EX + dx + 1, G + 3, EZ, B.brass); }
      beam.set(EX - 2, G + 4, EZ, B.mstone); beam.set(EX + 4, G + 4, EZ, B.coin);
      w.box(EX + 3, G + 1, EZ + 2, EX + 4, G + 1, EZ + 3, B.coin); w.set(EX + 3, G + 2, EZ + 2, B.coin); w.box(EX, G + 1, EZ + 2, EX, G + 1, EZ + 3, B.mstone); w.set(EX - 1, G + 1, EZ - 2, B.mstone);
      lights.push({ name: 'exch', p: [EX - 1.5, G + 4, EZ + 0.5], c: '#d090ff', i: 0.4, d: 12, flicker: 0.15, srcR: 4 });
      acts.push({
        name: '마석 환전', hint: '환전소 저울이 마석과 금화 사이를 오가며 기울고, 보랏빛 마석 가루와 금화가 튀어 올라요', hit: [EX - 2, G + 1, EZ - 3, EX + 4, G + 6, EZ + 3],
        run: async a => {
          a.flash('exch', 5, 4);
          for (let k = 0; k < 2; k++) {
            await a.turn('scale', [0, 0, 0.35], 0.6); a.burst([EX - 1.5, G + 5, EZ + 0.5], { n: 16, colors: ['#c070ff', '#e8c0ff', '#ffffff'], speed: 2, up: 2, life: 1, gravity: 2, spread: 0.6 });
            await a.turn('scale', [0, 0, -0.35], 0.6); a.burst([EX + 4.5, G + 5, EZ + 0.5], { n: 16, colors: ['#f0c84a', '#ffe9a0', '#ffffff'], speed: 2.4, up: 3, life: 1, gravity: 5, spread: 0.6 });
          }
          await a.turn('scale', [0, 0, 0], 0.5);
        },
      });
      landmarks.push({ name: '마석 환전소', note: '마석을 발리스로', p: [EX + 1, G + 14, EZ] });

      // ── 남서쪽: 어드바이저 상담 부스 둘(나무·유리 칸막이, 탁자와 의자, 공략 자료 더미(부품)) ──
      const BZ0 = 51, BZ1 = 59;
      for (const bx of [20, 27]) {
        for (let z = BZ0; z <= BZ1; z++) for (let y = G + 1; y <= G + 4; y++) { w.set(bx - 1, y, z, y > G + 2 ? B.glassP : B.woodD); w.set(bx + 6, y, z, y > G + 2 ? B.glassP : B.woodD); }
        for (let x = bx - 1; x <= bx + 6; x++) for (let y = G + 1; y <= G + 4; y++) w.set(x, y, BZ0, y === G + 4 ? B.gTrim : B.woodD);
        w.box(bx + 1, G + 1, 54, bx + 4, G + 2, 55, B.wood); w.box(bx + 1, G + 2, 54, bx + 4, G + 2, 55, B.counter);
        w.box(bx + 2, G + 1, 52, bx + 3, G + 1, 52, B.velvet); w.box(bx + 2, G + 1, 57, bx + 3, G + 1, 57, B.velvet);
        w.set(bx + 1, G + 3, 54, B.oil); w.set(bx + 4, G + 3, 55, B.paper);
      }
      const docs = w.prop({ name: 'docs', pivot: [23.5, G + 3, 54.5] });
      docs.box(22, G + 3, 54, 23, G + 4, 54, B.paper); docs.set(23, G + 5, 54, B.paperY); docs.set(22, G + 3, 55, B.ink);
      lights.push({ name: 'booth', p: [21.5, G + 3.5, 54.5], c: '#ffd890', i: 0.35, d: 10, flicker: 0.2, srcR: 3 });
      acts.push({
        name: '어드바이저 상담', hint: '상담 부스 탁자에서 던전 공략 자료가 펼쳐지며 층별 주의 사항이 한 장씩 날아올라요', hit: [20, G + 1, BZ0, 25, G + 4, BZ1],
        run: async a => {
          a.flash('booth', 4, 4);
          await a.tween('docs', { off: [0, 2.5, 0], rot: [0, 0.8, 0] }, 1);
          for (let k = 0; k < 6; k++) { a.burst([23.5, G + 6, 54.5], { n: 10, colors: ['#f4f0e4', '#f0e0a0', '#ffffff'], speed: 1.8, up: 2.4, life: 1.6, gravity: 1, spread: 0.6, flat: true }); await a.wait(0.3); }
          await a.tween('docs', { off: [0, 0, 0], rot: [0, 0, 0] }, 1);
        },
      });
      landmarks.push({ name: '어드바이저 상담 부스', note: '던전 공략 강의', p: [27, G + 12, 55] });

      // ── 가운데: 던전 지도 탁자(부품: 층 판 셋이 겹쳐 있다가 위로 펼쳐진다) ──
      const TX0 = 36, TX1 = 44, TZ0 = 38, TZ1 = 44;
      w.box(TX0, G + 1, TZ0, TX1, G + 2, TZ1, B.woodD); w.box(TX0 + 1, G + 1, TZ0 + 1, TX1 - 1, G + 1, TZ1 - 1, 0); w.box(TX0, G + 2, TZ0, TX1, G + 2, TZ1, B.counter);
      for (let k = 0; k < 3; k++) {
        const L = w.prop({ name: 'layer' + k, pivot: [40.5, G + 3 + k, 41.5] });
        const r = 3.4 - k * 0.8;
        for (let dz = -3; dz <= 3; dz++) for (let dx = -4; dx <= 4; dx++) {
          const d = Math.hypot(dx * 0.8, dz); if (d > r) continue;
          L.set(40 + dx, G + 3 + k, 41 + dz, d > r - 0.8 ? B.mapB : (hash3(dx + k * 9, k, dz) > 0.8 ? B.mapG : [B.mapL, B.mapR, B.mapL][k]));
        }
      }
      lights.push({ name: 'map', p: [40.5, G + 4, 41.5], c: '#7ad8e8', i: 0.35, d: 12, flicker: 0.1, srcR: 3 });
      acts.push({
        name: '던전 지도', hint: '탁자 위 던전 지도가 층마다 위로 펼쳐지며 상층·중층·하층 길이 푸르게 빛나요', hit: [TX0, G + 1, TZ0, TX1, G + 4, TZ1],
        run: async a => {
          a.flash('map', 6, 5); a.glow(1.5, 5);
          await Promise.all([a.move('layer0', [0, 1, 0], 1.4), a.move('layer1', [0, 3, 0], 1.4), a.move('layer2', [0, 5, 0], 1.4)]);
          for (let k = 0; k < 6; k++) { a.burst([40.5, G + 4 + k, 41.5], { n: 12, colors: ['#7ad8e8', '#ffffff', '#c070ff'], speed: 1.4, up: 0.5, life: 1.2, gravity: 0, spread: 1.6 }); await a.wait(0.3); }
          await Promise.all([a.move('layer0', [0, 0, 0], 1.2), a.move('layer1', [0, 0, 0], 1.2), a.move('layer2', [0, 0, 0], 1.2)]);
        },
      });

      // ── 색유리 빛: 서쪽·북쪽 창에서 붉고 푸르고 노란 빛줄기 ──
      acts.push({
        name: '색유리 빛', hint: '북쪽과 서쪽 높은 색유리 창으로 햇빛이 비쳐 들어 붉고 푸르고 노란 빛 조각이 로비 바닥에 쏟아져요', hit: [X0 + 1, G + 10, Z0 + 1, X0 + 3, G + 16, 40],
        run: async a => {
          a.flash('glassR', 5, 5); a.flash('glassB', 5, 5); a.glow(1.8, 5);
          const cols = [['#e8504a', '#ffb0a0'], ['#4a7ae8', '#b0c8ff'], ['#f0c84a', '#fff0b0']];
          for (let k = 0; k < 12; k++) { const z = Z0 + 5 + (k % 6) * 6, c = cols[k % 3]; a.burst([X0 + 4 + k * 1.5, G + 13 - k * 0.6, z + 0.5], { n: 14, colors: c, speed: 0.6, up: -1, life: 2, gravity: 1, spread: 1.2 }); await a.wait(0.25); }
        },
      });

      // ── 스테이터스 갱신 안내(창구 앞 안내대, 부품: 신성문자 종이) ──
      const SX = 47, SZ = 31;
      w.box(SX, G + 1, SZ, SX, G + 3, SZ, B.woodD); w.box(SX - 1, G + 4, SZ, SX + 1, G + 4, SZ, B.wood);
      const sheet = w.prop({ name: 'sheet', pivot: [SX + 0.5, G + 5, SZ + 0.5] });
      sheet.box(SX - 1, G + 5, SZ, SX + 1, G + 6, SZ, B.paper); sheet.set(SX, G + 6, SZ, B.glyph); sheet.set(SX - 1, G + 5, SZ, B.ink);
      acts.push({
        name: '스테이터스 갱신 안내', hint: '창구 앞 안내대의 종이가 떠올라 금빛 신성문자가 반짝여요. 갱신은 주신에게 받으라고 적혀 있어요', hit: [SX - 1, G + 1, SZ - 1, SX + 1, G + 6, SZ + 1],
        run: async a => {
          await a.tween('sheet', { off: [0, 3, 0], rot: [0, 3.14, 0] }, 1.2);
          for (let k = 0; k < 8; k++) { a.burst([SX + 0.5, G + 9, SZ + 0.5], { n: 10, colors: ['#ffe9a0', '#ffd060', '#ffffff'], speed: 1.2, up: 1, life: 1.2, gravity: -0.3, spread: 1 }); await a.wait(0.2); }
          await a.tween('sheet', { off: [0, 0, 0], rot: [0, 0, 0] }, 1);
        },
      });
      // 접수 종: 창구 앞에 서면 들리는 맑은 종소리(입자만)
      acts.push({
        name: '접수 창구 종', hint: '접수 창구의 금빛 종을 누르면 맑은 소리와 함께 서류가 정리돼요', hit: [24, G + 1, CZ - 1, 33, G + 4, CZ + 1],
        run: async a => { for (const p of bells) { a.burst(p, { n: 12, colors: ['#ffe9a0', '#ffffff'], speed: 2, up: 1, life: 0.8, gravity: 0, spread: 0.3 }); await a.wait(0.2); } },
      });

      // 벽 등과 화분, 긴 의자(대기석)
      for (let z = 30; z <= 58; z += 8) { w.set(X0 + 1, G + 9, z, B.oil); }
      for (let x = 22; x <= 58; x += 9) w.set(x, G + 9, Z0 + 1, B.oil);
      for (const z of [38, 46]) { w.box(48, G + 1, z, 48, G + 1, z + 3, B.wood); w.box(32, G + 1, z, 32, G + 1, z + 3, B.wood); }
      for (const [x, z] of [[X1 - 2, Z1 - 2], [X1 - 2, 30], [X0 + 5, 36]]) { w.set(x, G + 1, z, B.mW2); w.box(x, G + 2, z, x, G + 3, z, B.plant); }

      // ── 정문 안쪽: 밖으로 나가기 ──
      acts.push(OR.goAct({ at: [40, G + 1, Z1 - 3], h: 6, name: '밖으로 나가기', goto: 'babel', hint: '둥근 아치 문을 지나 바벨 앞 중앙 광장 쪽 큰길로 나가요', hit: [38, G + 1, Z1, 42, G + 6, Z1] }));
      return { lights, landmarks, acts };
    },
  });
})();
