// 황혼의 저택 본관(하위 지도) — 로키 파밀리아 홈 안. 둥근 아치문 안쪽 체크무늬 현관 홀과 위층으로 오르는 넓은 계단,
// 동쪽 대식당의 긴 연회 식탁, 서쪽 로키의 술 창고와 술병 진열장. 위층(단을 높인 북쪽)에는 원정 회의실, 발코니 유리문, 리베리아의 서재. 남·동쪽 벽은 잘라 낮췄다 (오라리오)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 128, D = 96, Hh = 64, G = 12, TAU = Math.PI * 2;
  MAPS.push({
    id: 'loki-manor', cat: 'orario', sub: true, parent: 'loki', name: '황혼의 저택 본관', en: 'Loki Familia · Twilight Manor Hall', color: '#c86a4a', seed: 11041, base: G, time: 'day', size: [W, D, Hh],
    spawn: [64, G + 1, 78],
    desc: '「황혼의 저택」 본관 안. 하늘빛이 도는 하얀 돌벽에 높은 아치창이 줄지어 있고, 현관 홀 넓은 계단을 오르면 원정 회의실과 발코니, 리베리아의 서재가 있는 위층이 나온다. 동쪽 대식당에는 원정에서 돌아온 단원들이 다 함께 앉는 긴 연회 식탁이, 서쪽에는 술을 좋아하는 여신 로키의 술 창고가 있다.',
    info: { title: '장소 정보', en: 'TWILIGHT MANOR', rows: [['1층', '현관 홀 · 대식당 · 로키의 술 창고'], ['위층', '원정 회의실 · 발코니 · 리베리아 서재'], ['문장', '익살스럽게 웃는 광대 얼굴']] },
    sky: ['#f4e0cc', '#b89a88', '#fff0dc'], stars: false,
    hemi: ['#fff6ec', '#5a5048', 0.66], sun: ['#fff0e0', 0.62, [0.45, 1, 0.6]],
    night: { sky: ['#3a2e4a', '#100c1a', '#d88a5a'], stars: false, hemi: ['#c8b0c8', '#1a1418', 0.44], sun: ['#e0c8f0', 0.28, [0.45, 1, 0.6]], haze: '#2e2a38' },
    fog: { start: 0.9, floor: G - 6, depth: 6, haze: [8, 0.12, 6], hazeColor: '#ece0d4' },
    camY: -8, zoom: 1.1,
    particles: [
      { n: 120, colors: ['#fff6e0', '#ffffff', '#ffe0b8'], mode: 'drift', speed: 0.12, wind: 0.08, area: [64, 48, 46], y0: G + 2, y1: G + 22, glow: true },
      { n: 30, colors: ['#6ae8a8', '#c8ffe8'], mode: 'rise', speed: 0.3, area: [106.5, 30.5, 3], y0: G + 7, y1: G + 16, glow: true },
    ],
    blocks: Object.assign(OR.blocks(), {
      lw: { c: '#e6eae6', v: 0.04, pat: 'big' }, lw2: { c: '#d2d8d4', v: 0.04 }, lBase: { c: '#bcc2bc', v: 0.05, pat: 'stone' }, lTrim: { c: '#f6f8f4', v: 0.02 },
      lFloor: { c: '#b8ae9a', top: '#cec4b0', v: 0.04, pat: 'check', alt: '#c4baa6' }, parq: { c: '#7a5232', top: '#966a40', v: 0.05, pat: 'floor' }, carpetR: { c: '#8a2a3a', v: 0.04 }, carpetB: { c: '#3a4a7a', v: 0.04, pat: 'check', alt: '#34426e' }, carpetE: { c: '#d8b048', v: 0.03 },
      wood: { c: '#7a5a3a', v: 0.05, pat: 'plank' }, woodDk: { c: '#4a3426', v: 0.04 }, barrel: { c: '#7a5232', v: 0.05, pat: 'log' }, barrelE: { c: '#a8784a', v: 0.05 },
      wine: { c: '#8a1e3a', v: 0.04 }, wineG: { c: '#2a5a3a', v: 0.04 }, wineA: { c: '#c8862a', v: 0.04 }, glass: { c: '#a8c8dc', v: 0.03 }, glassL: { c: '#ffe0a8', night: true, day: '#8aa8c0' },
      linen: { c: '#f4f0e6', v: 0.02 }, plate: { c: '#ffffff', v: 0.01 }, food: { c: '#b8642a', v: 0.06 }, foodY: { c: '#e8b84a', v: 0.06 }, foodG: { c: '#6aa04a', v: 0.06 }, mug: { c: '#d8c8a0', v: 0.03 },
      candle: { c: '#fff0c0', glow: true }, lampW: { c: '#ffd890', glow: true }, sconce: { c: '#ffe0a0', glow: true },
      parch: { c: '#e8d8b0', v: 0.04 }, ink: { c: '#5a3a2a', v: 0.03 }, pin: { c: '#d83a2a', v: 0.03 }, pinB: { c: '#3a6ad8', v: 0.03 },
      bookR: { c: '#8a3a3a', v: 0.04 }, bookB: { c: '#3a4a8a', v: 0.04 }, bookG: { c: '#2a6a4a', v: 0.04 }, bookY: { c: '#c8a040', v: 0.04 }, bookP: { c: '#6a4a8a', v: 0.04 },
      rune: { c: '#6ae8a8', glow: true }, runeD: { c: '#3a8a6a', v: 0.04 }, velvet: { c: '#a82a3a', v: 0.04 }, jester: { c: '#e8783a', v: 0.03 },
    }),
    build(w) {
      const B = w.id;
      const X0 = 12, X1 = 116, Z0 = 10, Z1 = 86, TOP = G + 26, UY = G + 6, UZ = 38, HC = 64;    // 벽 · 위층 바닥 높이와 앞 가장자리 · 홀 가운데
      const PW = 46, PE = 82;                                                                       // 방을 나누는 기둥 줄
      const S = (x, y, z, b) => w.set(x, y, z, b);
      MH.terrain(w, { floor: G - 6, height: () => G, surface: (x, z) => hash3(x, 2, z) > 0.9 ? B.leafL : B.grass, under: (x, z, y, dep) => dep < 2 ? B.soil : B.rock });
      const lights = [], acts = [], landmarks = [];

      // ── 바깥: 앞 돌길과 꽃밭, 북쪽 발코니 ──
      for (let z = Z1 + 1; z < D; z++) for (let x = HC - 5; x <= HC + 5; x++) S(x, G, z, Math.abs(x - HC) === 5 ? B.lTrim : B.lFloor);
      for (let k = 0; k < 30; k++) { const x = 2 + (hash3(k, 3, 2) * 124 | 0), z = Z1 + 2 + (hash3(k, 4, 2) * 8 | 0); if (Math.abs(x - HC) > 6) S(x, G + 1, z, [B.flowerR, B.flowerY, B.flowerW][k % 3]); }
      w.box(HC - 7, G + 1, Z0 - 4, HC + 7, UY, Z0 - 1, B.lw2);
      for (let x = HC - 7; x <= HC + 7; x++) { S(x, UY + 1, Z0 - 4, x % 2 ? B.lTrim : 0); S(x, UY + 2, Z0 - 4, B.lTrim); }
      for (let z = Z0 - 4; z < Z0; z++) for (const x of [HC - 7, HC + 7]) { S(x, UY + 1, z, B.lTrim); S(x, UY + 2, z, B.lTrim); }

      // ── 바닥: 1층 홀은 체크무늬 돌, 대식당·술 창고는 쪽마루. 위층(단)은 채운 돌 위에 ──
      for (let z = Z0 + 1; z < Z1; z++) for (let x = X0 + 1; x < X1; x++) S(x, G, z, x > PW && x < PE ? B.lFloor : B.parq);
      for (let z = UZ + 6; z < Z1; z++) for (let x = HC - 3; x <= HC + 3; x++) S(x, G, z, Math.abs(x - HC) === 3 ? B.carpetE : B.carpetR);
      w.box(X0 + 1, G + 1, Z0 + 1, X1 - 1, UY - 1, UZ, B.lw2);
      for (let z = Z0 + 1; z <= UZ; z++) for (let x = X0 + 1; x < X1; x++) S(x, UY, z, x < PW ? B.carpetB : (x > PE ? B.parq : B.lFloor));
      for (let x = X0 + 1; x < X1; x++) for (let y = G + 1; y < UY; y++) S(x, y, UZ, y === UY - 1 ? B.lTrim : (y <= G + 1 ? B.lBase : B.lw));
      // 단 앞 난간과 가운데 넓은 계단
      const SX0 = HC - 6, SX1 = HC + 6;
      for (let x = X0 + 1; x < X1; x++) { if (x >= SX0 && x <= SX1) continue; S(x, UY + 1, UZ, (x % 2 === 0 || x === SX0 - 1 || x === SX1 + 1) ? B.lTrim : 0); S(x, UY + 2, UZ, B.lTrim); }
      for (let j = 0; j < 5; j++) { const z = UZ + 5 - j; w.box(SX0, G + 1, z, SX1, G + 1 + j, z, B.lTrim); S(SX0 - 1, G + 2 + j, z, B.lTrim); S(SX1 + 1, G + 2 + j, z, B.lTrim); w.box(SX0 - 1, G + 1, z, SX0 - 1, G + 1 + j, z, B.lw2); w.box(SX1 + 1, G + 1, z, SX1 + 1, G + 1 + j, z, B.lw2); }
      for (let x = SX0 + 1; x <= SX1 - 1; x++) for (let j = 0; j < 5; j++) S(x, G + 1 + j, UZ + 5 - j, Math.abs(x - HC) <= 2 ? B.carpetR : B.lTrim);
      for (let x = HC - 2; x <= HC + 2; x++) for (let z = Z0 + 6; z <= UZ; z++) S(x, UY, z, Math.abs(x - HC) === 2 ? B.carpetE : B.carpetR);
      for (const x of [SX0 - 1, SX1 + 1]) { w.box(x, G + 1, UZ + 6, x, G + 3, UZ + 6, B.lTrim); S(x, G + 4, UZ + 6, B.candle); }

      // ── 벽: 북·서쪽은 높은 하얀 돌벽(띠, 높은 아치창, 벽등), 남·동쪽은 낮게 ──
      const sconces = [];
      for (let y = G + 1; y <= TOP; y++) {
        for (let x = X0; x <= X1; x++) {
          let b = y <= G + 3 ? B.lBase : B.lw;
          if ((y - G - 1) % 7 === 0 && y > G + 1) b = B.lTrim;
          if (y === TOP) b = B.lTrim;
          if ((x - X0) % 8 === 0) b = y === TOP ? B.lTrim : B.lw2;
          S(x, y, Z0, b);
        }
        for (let z = Z0; z <= Z1; z++) {
          let b = y <= G + 3 ? B.lBase : B.lw;
          if ((y - G - 1) % 7 === 0 && y > G + 1) b = B.lTrim;
          if (y === TOP) b = B.lTrim;
          if ((z - Z0) % 8 === 0) b = y === TOP ? B.lTrim : B.lw2;
          S(X0, y, z, b);
        }
      }
      const winX = x => (x > PW && x < HC - 6) || (x > HC + 6 && x < PE);
      for (let x = X0 + 4; x < X1; x += 8) if (winX(x)) LB.arch(w, { axis: 'x', c: Z0, u0: x, y0: UY + 4, a: 1, h: 9, kind: 'round', fill: B.win, frame: B.lTrim });
      for (const x of [94, 106]) LB.arch(w, { axis: 'x', c: Z0, u0: x, y0: UY + 4, a: 1, h: 9, kind: 'round', fill: B.win, frame: B.lTrim });
      for (let z = Z0 + 4; z < Z1; z += 8) LB.arch(w, { axis: 'z', c: X0, u0: z, y0: z <= UZ ? UY + 4 : G + 6, a: 1, h: 8, kind: 'round', fill: B.win, frame: B.lTrim });
      for (const x of [50, 78]) { S(x, UY + 9, Z0 + 1, B.gold); S(x, UY + 10, Z0 + 1, B.sconce); sconces.push([x + 0.5, UY + 11, Z0 + 1.5]); }
      for (let z = Z0 + 8; z < Z1; z += 8) { const y = z <= UZ ? UY + 3 : G + 4; S(X0 + 1, y, z, B.gold); S(X0 + 1, y + 1, z, B.sconce); sconces.push([X0 + 1.5, y + 2, z + 0.5]); }
      for (let y = G + 1; y <= G + 3; y++) {
        for (let x = X0; x <= X1; x++) S(x, y, Z1, y === G + 3 ? B.lTrim : B.lBase);
        for (let z = Z0; z <= Z1; z++) S(X1, y, z, y === G + 3 ? B.lTrim : B.lBase);
      }
      for (let x = X0; x <= X1; x += 8) S(x, G + 4, Z1, B.lTrim);
      for (let z = Z0; z <= Z1; z += 8) S(X1, G + 4, z, B.lTrim);
      lights.push({ name: 'sconces', p: [X0 + 2, G + 6, 62], c: '#ffe0a0', i: 0.35, d: 30, flicker: 0.15, srcR: 4 });
      lights.push({ name: 'sconces', p: [50.5, UY + 10, Z0 + 2], c: '#ffe0a0', i: 0.35, d: 30, flicker: 0.15, srcR: 4 });
      acts.push({
        name: '창불 켜기', hint: '해 질 녘, 하얀 벽의 벽등과 높은 아치창에 차례로 불이 켜져요', hit: [X0 + 1, G + 3, 66, X0 + 2, G + 7, 74],
        run: async a => {
          a.flash('sconces', 5, 5); a.glow(1.4, 4);
          const pts = sconces.slice().sort((p, q) => (q[2] - p[2]) || (p[0] - q[0]));
          for (const p of pts) { a.burst(p, { n: 12, colors: ['#ffe0a0', '#fff0c0', '#ffffff'], speed: 1, up: 1.5, life: 1, gravity: -0.3, spread: 0.6 }); await a.wait(0.12); }
        },
      });
      // 둥근 아치문(닫힌 문짝)
      LB.arch(w, { axis: 'x', c: Z1, u0: HC, y0: G + 1, a: 3, h: 7, kind: 'round', fill: B.door, frame: B.lTrim });
      for (const x of [HC - 4, HC + 4]) w.box(x, G + 1, Z1, x, G + 8, Z1, B.lTrim);
      S(HC, G + 4, Z1, B.gold);
      acts.push(OR.goAct({ at: [HC, G + 1, Z1 - 1], name: '밖으로 나가기', goto: 'loki', hint: '둥근 아치문을 열고 훈련장이 있는 앞뜰로 나가요', hit: [HC - 3, G + 1, Z1 - 1, HC + 3, G + 7, Z1] }));
      // 방을 나누는 기둥(1층·위층)
      for (const px of [PW, PE]) {
        for (let z = UZ + 7; z < Z1; z += 8) { w.box(px, G + 1, z, px, G + 11, z, B.lw2); S(px, G + 1, z, B.lBase); S(px, G + 12, z, B.lTrim); S(px - 1, G + 12, z, B.lTrim); S(px + 1, G + 12, z, B.lTrim); }
        for (let z = Z0 + 6; z < UZ; z += 8) { w.box(px, UY + 1, z, px, UY + 11, z, B.lw2); S(px, UY + 12, z, B.lTrim); }
      }
      // 광대 얼굴 문장(위층 북쪽 벽, 발코니 문 위)
      const EY = UY + 16;
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
        const d = Math.hypot(dx, dy);
        if (d > 3.4) continue;
        let b = d > 2.6 ? B.gold : B.lTrim;
        if (dy === 1 && Math.abs(dx) === 1) b = B.ink;
        if (dy === -1 && Math.abs(dx) <= 2 && d < 2.6) b = B.jester;
        if (dy === -2 && dx === 0) b = B.jester;
        S(HC + dx, EY + dy, Z0 + 1, b);
      }
      for (const dx of [-3, 0, 3]) S(HC + dx, EY + 4 + (dx ? 0 : 1), Z0 + 1, B.jester);

      // ── 발코니 유리문(위층 가운데 북쪽 벽, 부품) ──
      w.box(HC - 4, UY + 1, Z0, HC + 4, UY + 11, Z0, 0);
      LB.arch(w, { axis: 'x', c: Z0, u0: HC, y0: UY + 1, a: 3, h: 8, kind: 'round', fill: 0, frame: B.lTrim });
      for (const x of [HC - 4, HC + 4]) w.box(x, UY + 1, Z0, x, UY + 9, Z0, B.lTrim);
      for (let y = UY + 10; y <= UY + 11; y++) for (let x = HC - 4; x <= HC + 4; x++) if (!w.get(x, y, Z0)) S(x, y, Z0, B.lw);
      const bL = w.prop({ name: 'balL', pivot: [HC - 3, UY + 1, Z0 + 0.5] }), bR = w.prop({ name: 'balR', pivot: [HC + 4, UY + 1, Z0 + 0.5] });
      for (let x = HC - 3; x <= HC + 3; x++) for (let y = UY + 1; y <= UY + 10; y++) {
        if (!LB.inArch(x - HC, y - UY - 1, 3, 8, 'round')) continue;
        (x < HC ? bL : (x > HC ? bR : bL)).set(x, y, Z0, (x === HC - 3 || x === HC + 3 || x === HC || y === UY + 1 || y === UY + 5) ? B.woodDk : B.glassL);
      }
      for (let x = HC - 4; x <= HC + 4; x++) S(x, UY, Z0, B.lTrim);
      lights.push({ name: 'balcony', p: [HC + 0.5, UY + 6, Z0 + 2], c: '#ffc890', i: 0.5, d: 26, flicker: 0.1, srcR: 3 });
      for (const x of [HC - 6, HC + 6]) { w.box(x, UY + 1, Z0 + 2, x, UY + 3, Z0 + 2, B.lTrim); S(x, UY + 4, Z0 + 2, B.candle); }
      acts.push({
        name: '발코니 나가기', hint: '위층 아치 유리문이 활짝 열리며 노을빛 바람이 꽃잎을 싣고 저택 안으로 불어 들어와요', hit: [HC - 3, UY + 1, Z0, HC + 3, UY + 10, Z0 + 1],
        run: async a => {
          await Promise.all([a.turn('balL', [0, -1.5, 0], 1), a.turn('balR', [0, 1.5, 0], 1)]);
          a.flash('balcony', 6, 4); a.wind(2.2, 3); a.glow(1.3, 3);
          for (let k = 0; k < 10; k++) { a.burst([HC + 0.5 + (k % 3 - 1) * 2, UY + 6, Z0 + 2], { n: 12, colors: ['#ffd8a0', '#ff9a6a', '#ffffff', '#f07890'], speed: 2.4, up: 1, life: 2, gravity: 0.3, spread: 1.6 }); await a.wait(0.25); }
          await a.wait(0.6);
          await Promise.all([a.turn('balL', [0, 0, 0], 1), a.turn('balR', [0, 0, 0], 1)]);
        },
      });

      // ── 위층 서쪽: 원정 회의실(둥근 탁자, 의자 여덟, 벽의 원정 지도) ──
      const MX = 29, MZ = 24;
      w.cyl(MX, MZ, UY + 1, UY + 2, 1.2, B.woodDk); w.cyl(MX, MZ, UY + 3, UY + 3, 5, B.wood); w.ring(MX, MZ, UY + 3, 4.4, 5.1, B.woodDk);
      for (let k = 0; k < 8; k++) {
        const t = k / 8 * TAU, cx = Math.round(MX + Math.cos(t) * 6.6), cz = Math.round(MZ + Math.sin(t) * 6.6), bx = Math.round(MX + Math.cos(t) * 7.6), bz = Math.round(MZ + Math.sin(t) * 7.6);
        S(cx, UY + 1, cz, B.velvet); w.box(bx, UY + 1, bz, bx, UY + 3, bz, B.woodDk);
      }
      const MPX0 = X0 + 6, MPX1 = PW - 6, MPY0 = UY + 4, MPY1 = UY + 12;
      for (let x = MPX0 - 1; x <= MPX1 + 1; x++) for (let y = MPY0 - 1; y <= MPY1 + 1; y++) S(x, y, Z0 + 1, (x === MPX0 - 1 || x === MPX1 + 1 || y === MPY0 - 1 || y === MPY1 + 1) ? B.woodDk : B.parch);
      const route = [];
      for (let k = 0; k <= 18; k++) { const x = MPX0 + 2 + k, y = Math.round(MPY0 + 2 + k * 0.32 + Math.sin(k * 0.8) * 1.6); S(x, y, Z0 + 1, B.ink); route.push([x + 0.5, y + 0.5, Z0 + 2]); }
      for (const [x, y, c] of [[MPX0 + 2, MPY0 + 2, B.pinB], [MPX0 + 10, MPY0 + 6, B.pin], [MPX0 + 20, MPY0 + 7, B.pin]]) S(x, y + 1, Z0 + 1, c);
      for (let k = 0; k < 6; k++) S(MPX0 + 3 + k * 3, MPY1 - 1, Z0 + 1, B.ink);
      const pcs = w.prop({ name: 'pieces', pivot: [MX + 0.5, UY + 4, MZ + 0.5], axis: 'y' });
      for (const [dx, dz, c] of [[-2, -1, B.gold], [1, -2, B.pin], [2, 1, B.pinB], [-1, 2, B.rune], [0, 0, B.lTrim]]) { pcs.set(MX + dx, UY + 4, MZ + dz, c); if (!dx && !dz) pcs.set(MX, UY + 5, MZ, B.gold); }
      lights.push({ name: 'council', p: [MX + 0.5, UY + 6, MZ + 0.5], c: '#ffe0b0', i: 0.45, d: 20, flicker: 0.1, srcR: 4 });
      S(MX + 3, UY + 4, MZ + 3, B.candle);
      acts.push({
        name: '원정 회의', hint: '둥근 회의 탁자 위 말들이 떠올라 돌고, 벽의 원정 지도에 던전 깊은 층으로 가는 길이 차례로 빛나요', hit: [MX - 5, UY + 1, MZ - 5, MX + 5, UY + 5, MZ + 5],
        run: async a => {
          a.flash('council', 5, 4);
          await a.move('pieces', [0, 2.5, 0], 0.6);
          const sp = a.spin('pieces', 4, 2.4);
          for (const p of route) { a.burst(p, { n: 6, colors: ['#ffd860', '#ffffff', '#d83a2a'], speed: 0.6, up: 0.6, life: 0.8, gravity: 0, spread: 0.3 }); await a.wait(0.1); }
          await sp; a.unwind('pieces');
          await Promise.all([a.move('pieces', [0, 0, 0], 0.6), a.turn('pieces', [0, 0, 0], 0.6)]);
        },
      });

      // ── 위층 동쪽: 리베리아의 서재(높은 책장, 사다리, 독서 책상, 비취빛 마법진) ──
      for (let x = PE + 2; x < X1; x++) {
        if (x >= 93 && x <= 95 || x >= 105 && x <= 107) continue;
        w.box(x, UY + 1, Z0 + 1, x, UY + 15, Z0 + 2, B.woodDk);
        for (let y = UY + 1; y <= UY + 14; y++) if ((y - UY) % 3 !== 0 && hash3(x, y, 4) > 0.12) S(x, y, Z0 + 2, [B.bookR, B.bookB, B.bookG, B.bookY, B.bookP][(hash3(x, y, 8) * 5) | 0]);
      }
      w.box(100, UY + 1, Z0 + 3, 100, UY + 12, Z0 + 3, B.wood); w.box(102, UY + 1, Z0 + 3, 102, UY + 12, Z0 + 3, B.wood); for (let y = UY + 2; y <= UY + 12; y += 2) S(101, y, Z0 + 3, B.wood);
      const DXc = 97, DZc = 24;
      w.box(DXc - 3, UY + 1, DZc - 1, DXc - 3, UY + 2, DZc + 1, B.woodDk); w.box(DXc + 3, UY + 1, DZc - 1, DXc + 3, UY + 2, DZc + 1, B.woodDk); w.box(DXc - 3, UY + 3, DZc - 1, DXc + 3, UY + 3, DZc + 1, B.wood);
      S(DXc - 2, UY + 4, DZc, B.lampW); S(DXc, UY + 4, DZc, B.linen); S(DXc + 1, UY + 4, DZc, B.linen); S(DXc + 2, UY + 4, DZc - 1, B.bookG); S(DXc + 2, UY + 5, DZc - 1, B.bookB);
      S(DXc, UY + 1, DZc + 3, B.velvet); w.box(DXc, UY + 2, DZc + 4, DXc, UY + 3, DZc + 4, B.woodDk);
      for (const x of [PE + 4, X1 - 4]) { w.box(x, UY + 1, DZc + 6, x + (x < 100 ? 2 : -2), UY + 3, DZc + 6, B.woodDk); }
      lights.push({ name: 'library', p: [DXc - 1.5, UY + 5, DZc + 0.5], c: '#ffd890', i: 0.45, d: 20, flicker: 0.1, srcR: 2 });
      const RCX = 106, RCZ = 31;
      for (let dz = -4; dz <= 4; dz++) for (let dx = -4; dx <= 4; dx++) { const d = Math.hypot(dx, dz), th = Math.atan2(dz, dx); if ((d > 3.3 && d <= 4.2) || (d <= 3.3 && d > 1.4 && Math.abs(Math.sin(th * 3)) < 0.18)) S(RCX + dx, UY, RCZ + dz, B.runeD); }
      S(RCX, UY, RCZ, B.rune);
      lights.push({ name: 'rune', p: [RCX + 0.5, UY + 1, RCZ + 0.5], c: '#6ae8a8', i: 0.3, d: 14, flicker: 0.2, srcR: 2 });
      for (let x = PE + 4; x <= PE + 12; x++) w.box(x, UY + 1, UZ - 3, x, UY + 3, UZ - 3, B.woodDk);
      for (let x = PE + 4; x <= PE + 12; x++) for (const y of [UY + 1, UY + 2]) S(x, y, UZ - 2, [B.bookR, B.bookB, B.bookY, B.bookG][(x + y) % 4]);
      const bk1 = w.prop({ name: 'booksA', pivot: [89.5, UY + 8, Z0 + 3.5] }), bk2 = w.prop({ name: 'booksB', pivot: [111.5, UY + 5, Z0 + 3.5] });
      for (let x = 88; x <= 91; x++) bk1.box(x, UY + 7, Z0 + 3, x, UY + 8, Z0 + 3, [B.bookR, B.bookG, B.bookB, B.bookY][x % 4]);
      for (let x = 110; x <= 113; x++) bk2.box(x, UY + 4, Z0 + 3, x, UY + 5, Z0 + 3, [B.bookP, B.bookY, B.bookG, B.bookR][x % 4]);
      acts.push({
        name: '서재 책 꺼내기', hint: '리베리아의 서재 책장에서 책들이 저절로 빠져나와 비취빛 마법진 위를 빙글빙글 날아요', hit: [87, UY + 4, Z0 + 1, 114, UY + 9, Z0 + 3],
        run: async a => {
          a.flash('rune', 8, 5); a.glow(1.3, 4);
          const p1 = a.path('booksA', [[2, 0, 6], [10, -2, 14], [18, -3, 18], [14, -2, 22], [4, 0, 12], [0, 0, 0]], 4.2);
          const p2 = a.path('booksB', [[-2, 2, 6], [-6, 2, 16], [-10, 1, 20], [-4, 2, 22], [-1, 1, 10], [0, 0, 0]], 4.2);
          for (let k = 0; k < 12; k++) { const t = k / 12 * TAU; a.burst([RCX + 0.5 + Math.cos(t) * 4, UY + 1.5, RCZ + 0.5 + Math.sin(t) * 4], { n: 8, colors: ['#6ae8a8', '#c8ffe8', '#ffffff'], speed: 0.6, up: 4, life: 1.2, gravity: -0.8, spread: 0.3 }); await a.wait(0.3); }
          await Promise.all([p1, p2]);
        },
      });

      // ── 1층 동쪽: 대식당(긴 연회 식탁 둘, 긴 의자, 촛대, 단 앞 차림상, 술통) ──
      const tables = [91, 105], TZ0 = UZ + 9, TZ1 = Z1 - 7;
      for (const tx of tables) {
        for (const z of [TZ0, TZ1, (TZ0 + TZ1) >> 1]) for (const x of [tx - 1, tx + 1]) w.box(x, G + 1, z, x, G + 2, z, B.woodDk);
        w.box(tx - 1, G + 3, TZ0, tx + 1, G + 3, TZ1, B.linen); w.box(tx, G + 3, TZ0 + 1, tx, G + 3, TZ1 - 1, B.velvet);
        for (const bx of [tx - 3, tx + 3]) { w.box(bx, G + 1, TZ0 + 1, bx, G + 1, TZ1 - 1, B.wood); }
        for (let z = TZ0 + 1; z <= TZ1 - 1; z += 2) { S(tx - 1, G + 4, z, B.plate); S(tx + 1, G + 4, z, z % 4 === 1 ? B.mug : B.plate); }
        for (let z = TZ0 + 3; z <= TZ1 - 3; z += 8) { S(tx, G + 4, z, B.gold); S(tx, G + 5, z, B.candle); }
      }
      const feasts = [];
      tables.forEach((tx, k) => {
        const fz = (TZ0 + TZ1) >> 1, nm = 'feast' + k;
        const f = w.prop({ name: nm, pivot: [tx + 0.5, G + 4, fz + 0.5] });
        f.box(tx, G + 4, fz - 2, tx, G + 4, fz + 2, B.plate); f.box(tx, G + 5, fz - 2, tx, G + 5, fz - 1, B.food); f.set(tx, G + 5, fz, B.wine); f.set(tx, G + 5, fz + 1, B.foodY); f.set(tx, G + 5, fz + 2, B.foodG); f.set(tx, G + 6, fz - 2, B.food); f.set(tx, G + 6, fz, B.wineG);
        feasts.push([nm, tx, fz]);
      });
      lights.push({ name: 'banquet', p: [98.5, G + 6, 62.5], c: '#ffd090', i: 0.6, d: 34, flicker: 0.2, srcR: 8 });
      w.box(PE + 4, G + 1, UZ + 1, X1 - 4, G + 2, UZ + 2, B.woodDk); w.box(PE + 4, G + 3, UZ + 1, X1 - 4, G + 3, UZ + 2, B.linen);
      for (let x = PE + 5; x <= X1 - 5; x += 2) S(x, G + 4, UZ + 1 + (x & 2 ? 1 : 0), [B.food, B.foodY, B.foodG, B.mug, B.wine][(x >> 1) % 5]);
      for (const [x, z] of [[X1 - 2, Z1 - 3], [X1 - 2, Z1 - 6], [X1 - 4, Z1 - 3]]) { w.box(x, G + 1, z, x, G + 3, z, B.barrel); S(x, G + 4, z, B.barrelE); }
      for (const z of [UZ + 12, Z1 - 12]) { w.box(98, G + 1, z, 98, G + 6, z, B.iron); w.box(97, G + 7, z, 99, G + 7, z, B.gold); S(97, G + 8, z, B.candle); S(99, G + 8, z, B.candle); S(98, G + 8, z, B.candle); }
      acts.push({
        name: '연회 시작', hint: '원정에서 돌아온 날, 긴 연회 식탁의 큰 접시들이 들썩이고 촛불이 환해지며 잔치가 시작돼요', hit: [tables[0] - 1, G + 3, 58, tables[1] + 1, G + 6, 68],
        run: async a => {
          a.flash('banquet', 5, 5); a.glow(1.3, 4);
          for (let k = 0; k < 3; k++) {
            await Promise.all(feasts.map(([nm], i) => a.tween(nm, { off: [0, 2.2, 0], rot: [0, (i ? -1 : 1) * (k + 1) * 0.6, 0] }, 0.35)));
            for (const [, tx, fz] of feasts) a.burst([tx + 0.5, G + 7, fz + 0.5], { n: 22, colors: ['#ffd860', '#ff7a8a', '#8ad0ff', '#ffffff', '#8a1e3a'], speed: 3, up: 4, life: 1.4, gravity: 4, spread: 2 });
            await Promise.all(feasts.map(([nm]) => a.tween(nm, { off: [0, 0, 0] }, 0.3)));
          }
          await Promise.all(feasts.map(([nm]) => a.turn(nm, [0, 0, 0], 0.4)));
        },
      });

      // ── 1층 서쪽: 로키의 술 창고(술통 벽, 유리 술병 진열장, 바 탁자, 안락의자) ──
      for (let z = UZ + 4; z < Z1 - 1; z++) for (let y = G + 1; y <= G + 4; y++) S(X0 + 1, y, z, B.woodDk);
      for (let z = UZ + 5; z < Z1 - 2; z += 2) for (const y of [G + 1, G + 3]) { w.box(X0 + 2, y, z, X0 + 3, y + 1, z, B.barrel); S(X0 + 3, y, z, B.barrelE); }
      for (let x = X0 + 4; x <= PW - 6; x++) { w.box(x, G + 1, UZ + 1, x, G + 5, UZ + 2, B.woodDk); }
      for (let x = X0 + 5; x <= PW - 7; x++) for (const y of [G + 2, G + 4]) { S(x, y, UZ + 2, [B.wine, B.wineG, B.wineA, 0][(x * 3 + y) % 4] || B.woodDk); S(x, y + 1, UZ + 2, B.woodDk); }
      for (let x = X0 + 5; x <= PW - 7; x++) for (const y of [G + 2, G + 3, G + 4]) S(x, y, UZ + 3, y === G + 3 && x % 4 === 0 ? B.woodDk : B.glass);
      for (let x = X0 + 4; x <= PW - 6; x++) S(x, G + 6, UZ + 1, B.lTrim);
      const BRX0 = 22, BRX1 = 36, BRZ = 60;
      w.box(BRX0, G + 1, BRZ, BRX1, G + 2, BRZ + 1, B.woodDk); w.box(BRX0 - 1, G + 3, BRZ, BRX1 + 1, G + 3, BRZ + 1, B.wood);
      w.box(BRX0, G + 1, BRZ + 2, BRX0 + 1, G + 2, BRZ + 6, B.woodDk); w.box(BRX0 - 1, G + 3, BRZ + 2, BRX0 + 1, G + 3, BRZ + 6, B.wood);
      for (let x = BRX0 + 3; x <= BRX1 - 1; x += 3) { S(x, G + 1, BRZ + 3, B.woodDk); S(x, G + 2, BRZ + 3, B.velvet); }
      for (let x = BRX0 + 1; x <= BRX1; x += 4) { S(x, G + 4, BRZ, B.mug); S(x + 1, G + 4, BRZ + 1, B.wineA); }
      const BTX = 30;
      const bot = w.prop({ name: 'bottle', pivot: [BTX + 0.5, G + 4, BRZ + 0.5] }); bot.box(BTX, G + 4, BRZ, BTX, G + 6, BRZ, B.wine); bot.set(BTX, G + 7, BRZ, B.wineG);
      const cork = w.prop({ name: 'cork', pivot: [BTX + 0.5, G + 8, BRZ + 0.5] }); cork.set(BTX, G + 8, BRZ, B.barrelE);
      lights.push({ name: 'wine', p: [BTX + 0.5, G + 6, BRZ + 2.5], c: '#ffb070', i: 0.45, d: 20, flicker: 0.2, srcR: 6 });
      for (const x of [BRX0 + 2, BRX1 - 2]) S(x, G + 4, BRZ + 1, B.candle);
      acts.push({
        name: '술병 따기', hint: '바 탁자 위 로키의 술병 코르크가 뻥 하고 날아가며 붉은 포도주 거품이 솟구쳐요', hit: [BTX - 1, G + 3, BRZ, BTX + 1, G + 8, BRZ + 1],
        run: async a => {
          await a.turn('bottle', [0, 0, 0.25], 0.25); await a.turn('bottle', [0, 0, -0.25], 0.25); await a.turn('bottle', [0, 0, 0], 0.2);
          a.flash('wine', 5, 3);
          const fly = a.tween('cork', { off: [4, 9, 6], rot: [3, 1, 2] }, 0.8);
          for (let k = 0; k < 8; k++) { a.burst([BTX + 0.5, G + 8, BRZ + 0.5], { n: 14, colors: ['#8a1e3a', '#c83a5a', '#ffd0e0', '#ffffff'], speed: 1.6, up: 4, life: 1, gravity: 6, spread: 0.6 }); await a.wait(0.18); }
          await fly; await a.tween('cork', { off: [6, -3, 9], rot: [6, 2, 4] }, 0.5);
          await a.wait(0.6); await a.respawn('cork', 0.8);
        },
      });
      // 로키의 안락의자와 작은 탁자, 큰 술통
      w.box(20, G + 1, 76, 22, G + 1, 78, B.velvet); w.box(19, G + 1, 76, 19, G + 4, 78, B.velvet); S(20, G + 2, 76, B.velvet); S(20, G + 2, 78, B.velvet); S(19, G + 5, 77, B.gold);
      w.cyl(27, 77, G + 1, G + 1, 0.6, B.woodDk); w.cyl(27, 77, G + 2, G + 2, 1.5, B.wood); S(27, G + 3, 77, B.wineA); S(26, G + 3, 76, B.mug);
      w.cyl(38, 80, G + 1, G + 5, 2.6, B.barrel); w.ring(38, 80, G + 2, 1.8, 2.7, B.iron); w.ring(38, 80, G + 4, 1.8, 2.7, B.iron); w.cyl(38, 80, G + 6, G + 6, 2, B.barrelE); S(38, G + 3, 83, B.iron);
      for (const [x, z] of [[PW - 2, Z1 - 2], [X0 + 2, Z1 - 2]]) { S(x, G + 1, z, B.lTrim); w.box(x, G + 2, z, x, G + 3, z, B.leaf); }

      // ── 현관 홀: 촛대 기둥, 큰 꽃병, 둥근 깔개 ──
      for (const [x, z] of [[PW + 4, 56], [PE - 4, 56], [PW + 4, 74], [PE - 4, 74]]) { w.box(x, G + 1, z, x, G + 5, z, B.iron); w.box(x - 1, G + 6, z, x + 1, G + 6, z, B.gold); S(x, G + 7, z, B.lampW); }
      lights.push({ name: 'hall', p: [HC + 0.5, G + 7, 65.5], c: '#ffe0a8', i: 0.5, d: 30, flicker: 0.08, srcR: 14 });
      for (const x of [PW + 3, PE - 3]) { w.cyl(x, Z1 - 4, G + 1, G + 2, 1.2, B.lTrim); w.cyl(x, Z1 - 4, G + 3, G + 4, 0.6, B.lTrim); MH.bush(w, x, G + 4, Z1 - 4, 1.4, [B.flowerR, B.leaf, B.flowerY]); }
      landmarks.push({ name: '대식당', note: '긴 연회 식탁', p: [98.5, G + 14, 62.5] });
      landmarks.push({ name: '리베리아의 서재', note: '위층 동쪽', p: [100, UY + 18, 22] });
      landmarks.push({ name: '원정 회의실', note: '위층 서쪽', p: [MX + 0.5, UY + 16, MZ + 0.5] });
      return { lights, landmarks, acts };
    },
  });
})();
