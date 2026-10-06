// 성 내부 — 지붕을 걷어 낸 왕성 본관: 알현실, 현관 홀, 연회장과 주방, 서고, 보물고, 무기고, 남쪽 달빛 정원과 유리 온실 (176칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const { KP } = window.KINGDOM;
  const W = 176, D = 176, Hh = 96;
  MAPS.push({
    id: 'innerkeep', cat: 'kingdom', name: '성 내부', en: 'Inner Keep', color: '#e8c04a', seed: 251, base: 22, time: 'night', size: [W, D, Hh],
    desc: '지붕을 걷어 내고 들여다본 왕성 본관. 알현실의 붉은 융단이 왕좌까지 곧게 뻗어 있다. 정문 밖 남쪽에는 백조 연못과 유리 온실이 있는 달빛 정원이 펼쳐진다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['위치', '왕성 본관 1층'], ['명물', '알현실 · 왕실 서고 · 보물고'], ['새 구역', '달빛 정원 · 유리 온실'], ['소문', '보물고 열쇠는 왕관 안쪽에 숨겨져 있다']] },
    sky: ['#2a2238', '#0e0c18', '#5a4468'], stars: true,
    hemi: ['#d8c8e8', '#2a2030', 0.5], sun: ['#c8c0f0', 0.42, [0.5, 1, 0.55]],
    day: { sky: ['#d8ecf8', '#5a90d0', '#fff8e0'], stars: false, hemi: ['#ffffff', '#5a5a60', 0.62], sun: ['#fff4e0', 0.8, [0.5, 1, 0.55]] },
    liquid: ['#2a5a8a', '#4a8ac0', '#e0f4ff'], liqSpeed: 0.7,
    fog: { start: 0.84, floor: 12, depth: 10, box: [88, 92, 96, 100] },
    camY: -6, zoom: 1.1,
    particles: [
      { n: 130, colors: ['#ffe8c0', '#fff4e0'], mode: 'drift', speed: 0.2, y0: 26, y1: 54, glow: false },
      { n: 50, colors: ['#c8ff8a', '#fff4a0'], mode: 'drift', speed: 0.3, area: [88, 158, 70], y0: 24, y1: 34, glow: true },
    ],
    blocks: Object.assign({}, KP, {
      tile: { c: '#9a9aa4', top: '#c4c0cc', v: 0.04, pat: 'check', alt: '#8a8694' }, marble: { c: '#e8e4ec', top: '#f0ecf2', v: 0.03, pat: 'check', alt: '#3a3848' },
      plankF: { c: '#7a5434', top: '#946a44', v: 0.06, pat: 'plank' }, kfloor: { c: '#8a8680', top: '#a09a90', v: 0.08, pat: 'stone' },
      cut: { c: '#32303c', v: 0.02 }, carpet: { c: '#a02a34', top: '#a82c36', v: 0.03 }, carpetG: { c: '#d8a83a', top: '#e0b040', v: 0.03 }, cushion: { c: '#3a5ab0', v: 0.03 },
      table: { c: '#7a4a2a', v: 0.05, pat: 'plank' }, chair: { c: '#4a2e1c', v: 0.04 }, plate: { c: '#f4f0e8', v: 0.02 }, cloth: { c: '#f0ece0', v: 0.02 },
      food: { c: '#c86a2a', v: 0.1 }, food2: { c: '#8aa83a', v: 0.08 }, wine: { c: '#6a1a2a', v: 0.03 },
      book1: { c: '#8a2a2a', v: 0.05 }, book2: { c: '#2a4a7a', v: 0.05 }, book3: { c: '#3a6a3a', v: 0.05 }, book4: { c: '#8a6a2a', v: 0.05 }, shelf: { c: '#5a3a24', v: 0.04 },
      globe: { c: '#3a7ab0', v: 0.1 }, chest: { c: '#6a4428', v: 0.05, pat: 'plank' }, steel: { c: '#aab0bc', v: 0.04 }, hearth: { c: '#5a5660', v: 0.06, pat: 'brick' },
      glassR: { c: '#ff5a6a', glow: true }, glassB: { c: '#6aa8ff', glow: true }, glassY: { c: '#ffd070', glow: true },
      candle: { c: '#ffe2a0', glow: true }, fire: { c: '#ff9a3a', glow: true }, gemR: { c: '#ff3a5a', glow: true }, gemB: { c: '#5ac8ff', glow: true }, coin: { c: '#ffd860', glow: true },
      rug: { c: '#3a4a8a', top: '#3e4e90', v: 0.03 }, rugB: { c: '#c8a050', top: '#d0a850', v: 0.03 }, copper: { c: '#b8683a', v: 0.06 },
      gravel: { c: '#8a8478', top: '#b8b0a0', v: 0.08, pat: 'stone' }, swan: { c: '#f8f8f4', v: 0.02 }, beak: { c: '#f08a30', v: 0.03 },
      glassC: { c: '#8ad8c8', night: true, day: '#a8d0e0' }, moonP: { c: '#e8f0ff', glow: true }, moonC: { c: '#fff4a0', glow: true }, lily: { c: '#3a7a4a', v: 0.06 },
    }),
    build(w) {
      const B = w.id, base = w.base, F = base + 2, Y = F + 1, WH = 12;
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => ((x - 40) / 17) ** 2 + ((z - 161) / 8) ** 2 < 1 ? base - 2 : base + 1,
        surface: (x, z) => hash3(x, 1, z) > 0.5 ? B.grass : B.grass2, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock,
      });
      MH.water(w, base, (x, z) => z > 145);
      const X0 = 16, X1 = 140, Z0 = 14, Z1 = 138, MX = 78;
      MH.flatten(w, X0 - 3, Z0 - 3, X1 + 3, Z1 + 2, F, B.tile, B.found);
      const lights = [], acts = [], landmarks = [];
      const floor = (x0, z0, x1, z1, b) => { for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) w.set(x, F, z, b); };
      const wall = (x0, z0, x1, z1, h) => { const t = Y + (h || WH) - 1; w.box(x0, Y, z0, x1, t, z1, B.white); w.box(x0, t, z0, x1, t, z1, B.cut); w.box(x0, Y, z0, x1, Y, z1, B.whiteDk); w.box(x0, Y + 7, z0, x1, Y + 7, z1, B.whiteDk); };
      const gap = (x0, z0, x1, z1, h) => w.box(x0, Y, z0, x1, Y + (h || 8), z1, 0);
      const doorTrim = (x0, z0, x1, z1, h) => { const hx = x1 - x0 > z1 - z0; if (hx) { w.box(x0 - 1, Y, z0, x0 - 1, Y + h, z1, B.trim); w.box(x1 + 1, Y, z0, x1 + 1, Y + h, z1, B.trim); w.box(x0 - 1, Y + h + 1, z0, x1 + 1, Y + h + 1, z1, B.trim); } else { w.box(x0, Y, z0 - 1, x1, Y + h, z0 - 1, B.trim); w.box(x0, Y, z1 + 1, x1, Y + h, z1 + 1, B.trim); w.box(x0, Y + h + 1, z0 - 1, x1, Y + h + 1, z1 + 1, B.trim); } };
      const candelabra = (x, z, lit) => { w.box(x, Y, z, x, Y + 5, z, B.gold); w.box(x - 1, Y + 5, z, x + 1, Y + 5, z, B.gold); w.box(x, Y + 5, z - 1, x, Y + 5, z + 1, B.gold); w.set(x, Y + 6, z, B.candle); w.set(x - 1, Y + 6, z, B.candle); w.set(x + 1, Y + 6, z, B.candle); w.set(x, Y + 6, z - 1, B.candle); w.set(x, Y + 6, z + 1, B.candle); w.box(x - 1, Y, z - 1, x + 1, Y, z + 1, B.gold); if (lit) lights.push({ name: lit === true ? undefined : lit, p: [x + 0.5, Y + 7, z + 0.5], c: '#ffd890', i: 1.3, d: 20, flicker: 0.2 }); };
      const sconce = (x, z, dx, dz) => { w.set(x + dx, Y + 6, z + dz, B.iron); w.set(x + dx, Y + 7, z + dz, B.candle); };
      // ── 바깥벽과 칸막이 ──
      wall(X0, Z0, X1, Z0 + 1); wall(X0, Z1 - 1, X1, Z1); wall(X0, Z0, X0 + 1, Z1); wall(X1 - 1, Z0, X1, Z1);
      wall(47, Z0, 48, Z1); wall(108, Z0, 109, Z1);            // 서·동 익랑을 가르는 벽
      wall(48, 73, 108, 74);                                    // 알현실 / 현관 홀
      wall(X0, 86, 47, 87); wall(109, 76, X1, 77); wall(109, 111, X1, 112);
      w.box(49, Y + WH, Z0, 107, Y + WH + 9, Z0 + 1, B.white); w.box(49, Y + WH + 9, Z0, 107, Y + WH + 9, Z0 + 1, B.cut);   // 알현실 북벽(장미창 벽)
      gap(74, Z1 - 1, 82, Z1, 9);                               // 정문
      for (const [a, b, c, d] of [[47, 48, 52, 56], [47, 48, 104, 108], [108, 109, 40, 44], [108, 109, 92, 96], [108, 109, 122, 126]]) { gap(a, c, b, d); doorTrim(a, c, b, d, 8); }
      gap(28, 86, 34, 87); doorTrim(28, 86, 34, 87, 8);
      // 바깥벽 창(남·동 면 — 바깥쪽에서 보이는 창틀)
      for (let x = X0 + 6; x <= X1 - 6; x += 8) { if (x > 68 && x < 88) continue; w.box(x, Y + 3, Z1, x + 1, Y + 7, Z1, B.win); w.box(x - 1, Y + 2, Z1 + 1, x + 2, Y + 2, Z1 + 1, B.whiteDk); w.box(x, Y + 8, Z1 + 1, x + 1, Y + 8, Z1 + 1, B.trim); }
      for (let z = Z0 + 6; z <= Z1 - 6; z += 8) { w.box(X1, Y + 3, z, X1, Y + 7, z + 1, B.win); w.box(X1 + 1, Y + 2, z - 1, X1 + 1, Y + 2, z + 2, B.whiteDk); w.box(X1 + 1, Y + 8, z, X1 + 1, Y + 8, z + 1, B.trim); }
      // 모서리 탑(나선 계단)
      for (const [tx, tz] of [[X0, Z0], [X1, Z0], [X0, Z1], [X1, Z1]]) {
        w.cyl(tx, tz, Y, Y + WH + 3, 6.6, B.white); w.cyl(tx, tz, Y, Y + WH + 3, 5, 0); w.cyl(tx, tz, F, F, 5, B.kfloor);
        w.ring(tx, tz, Y + WH + 3, 5, 6.6, B.cut); w.ring(tx, tz, Y + 7, 6.2, 7.2, B.whiteDk); w.ring(tx, tz, Y, 6.2, 7.4, B.whiteDk);
        for (let i = 0; i < 30; i++) { const a = i * 0.45; w.set(Math.round(tx + Math.cos(a) * 3.2), Y + Math.floor(i / 2), Math.round(tz + Math.sin(a) * 3.2), B.found); w.set(Math.round(tx + Math.cos(a) * 3.8), Y + Math.floor(i / 2), Math.round(tz + Math.sin(a) * 3.8), B.found); }
        w.box(tx, Y, tz, tx, Y + 15, tz, B.found);
      }
      // ── 알현실 ──
      floor(49, Z0 + 2, 107, 72, B.marble);
      for (let z = 24; z <= 72; z++) for (let x = 74; x <= 82; x++) w.set(x, F, z, (x === 74 || x === 82) ? B.carpetG : B.carpet);
      for (let s = 0; s < 4; s++) w.box(63 + s, Y + s, Z0 + 2, 93 - s, Y + s, 25 - s, s % 2 ? B.gold : B.white);
      const ty = Y + 4, TX = MX;
      w.box(TX - 3, ty, 16, TX + 3, ty, 19, B.gold); w.box(TX - 3, ty + 1, 16, TX + 3, ty + 9, 16, B.gold); w.box(TX - 2, ty + 1, 17, TX + 2, ty + 1, 18, B.cushion);
      w.box(TX - 3, ty + 1, 17, TX - 3, ty + 3, 18, B.gold); w.box(TX + 3, ty + 1, 17, TX + 3, ty + 3, 18, B.gold);
      for (const [dx, h] of [[-3, 11], [-2, 12], [-1, 13], [0, 15], [1, 13], [2, 12], [3, 11]]) w.box(TX + dx, ty + 10, 16, TX + dx, ty + h, 16, B.gold);
      w.set(TX, ty + 12, 17, B.gemR); w.box(TX - 1, ty + 2, 17, TX + 1, ty + 2, 17, B.gold); w.set(TX, ty + 3, 17, B.gold); w.box(TX - 2, ty + 2, 16, TX + 2, ty + 8, 16, B.cushion);
      for (const sx of [TX - 6, TX + 6]) { w.box(sx - 1, Y + 2, 20, sx + 1, Y + 2, 21, B.gold); w.box(sx, Y + 3, 20, sx, Y + 5, 20, B.gold); w.set(sx, Y + 3, 21, B.cushion); }
      for (const px of [TX - 9, TX + 9]) { w.box(px, ty - 1, 17, px, ty + 11, 17, B.whiteDk); w.box(px, ty + 5, 18, px, ty + 11, 18, B.banner); w.set(px, ty + 12, 17, B.gold); }
      w.box(TX - 9, ty + 12, 17, TX + 9, ty + 12, 18, B.banner); w.box(TX - 9, ty + 13, 17, TX + 9, ty + 13, 17, B.gold);
      // 장미창(북벽 높은 곳)
      const RY = Y + 15;
      for (let dy = -5; dy <= 5; dy++) for (let dx = -5; dx <= 5; dx++) {
        const r = Math.hypot(dx, dy); if (r > 5.4) continue;
        const ang = Math.atan2(dy, dx), spoke = Math.abs(Math.sin(ang * 4)) < 0.2;
        w.set(TX + dx, RY + dy, Z0 + 1, r > 4.6 ? B.gold : r < 1.2 ? B.glassY : spoke ? B.cut : (Math.floor(r) % 2 ? B.glassR : B.glassB));
      }
      // 기둥 두 줄
      for (const x of [58, 98]) for (let z = 30; z <= 70; z += 8) {
        w.cyl(x, z, Y, Y + 10, 1.5, B.white); w.cyl(x, z, Y, Y, 2.2, B.whiteDk); w.cyl(x, z, Y + 1, Y + 1, 1.9, B.trim); w.cyl(x, z, Y + 10, Y + 10, 2.2, B.gold); w.cyl(x, z, Y + 11, Y + 11, 1.5, B.cut);
        w.box(x + (x < MX ? 2 : -2), Y + 4, z, x + (x < MX ? 2 : -2), Y + 9, z, (z / 8 | 0) % 2 ? B.banner : B.bannerR); w.set(x + (x < MX ? 2 : -2), Y + 10, z, B.gold);
      }
      for (const [gx, gc] of [[52, B.glassR], [60, B.glassB], [94, B.glassB], [102, B.glassR]]) {
        w.box(gx, Y + 2, Z0 + 1, gx + 2, Y + 9, Z0 + 1, gc); w.box(gx + 1, Y + 2, Z0 + 1, gx + 1, Y + 9, Z0 + 1, B.cut); w.box(gx, Y + 5, Z0 + 1, gx + 2, Y + 5, Z0 + 1, B.cut);
        w.box(gx - 1, Y + 1, Z0 + 2, gx + 3, Y + 1, Z0 + 2, B.whiteDk); w.set(gx + 1, Y + 10, Z0 + 1, B.gold);
      }
      // 가장자리 융단과 의자
      for (const x of [52, 104]) for (let z = 30; z <= 68; z += 6) { w.set(x, Y, z, B.chair); w.set(x, Y + 1, z, B.chair); w.set(x, Y, z + 1, B.cushion); }
      candelabra(68, 26, 'throne'); candelabra(88, 26, 'throne'); candelabra(52, 46, true); candelabra(104, 46, true); candelabra(68, 68, false); candelabra(88, 68, false);
      // 알현실 대문(부품): 남쪽 현관 홀 쪽으로 열린다
      gap(74, 73, 81, 74, 10);
      w.box(73, Y, 73, 73, Y + 11, 74, B.gold); w.box(82, Y, 73, 82, Y + 11, 74, B.gold); w.box(73, Y + 11, 73, 82, Y + 11, 74, B.gold); w.box(76, Y + 12, 74, 79, Y + 13, 74, B.gold);
      const dL = w.prop({ name: 'tdoorL', pivot: [74, Y, 74.5] }), dR = w.prop({ name: 'tdoorR', pivot: [82, Y, 74.5] });
      for (let y = Y; y <= Y + 10; y++) for (let x = 74; x <= 81; x++) (x < 78 ? dL : dR).set(x, y, 74, (y === Y + 3 || y === Y + 7 || x === 77 || x === 78) ? B.gold : B.door);
      acts.push({
        name: '알현실 대문', hint: '금장 대문이 현관 홀 쪽으로 활짝 열려요', hit: [74, Y, 73, 81, Y + 10, 75],
        run: async a => {
          a.flash('throne', 2.2, 5);
          await Promise.all([a.turn('tdoorL', [0, -1.5, 0], 2.2), a.turn('tdoorR', [0, 1.5, 0], 2.2)]);
          a.burst([TX + 0.5, ty + 8, 18], { n: 40, colors: ['#ffd860', '#ffffff', '#ffe2a0'], speed: 4, up: 3, life: 2, gravity: 1, spread: 3 });
          await a.wait(2.6);
          await Promise.all([a.turn('tdoorL', [0, 0, 0], 2), a.turn('tdoorR', [0, 0, 0], 2)]);
        },
      });
      landmarks.push({ name: '알현실', note: '왕좌와 장미창, 스테인드글라스', p: [TX + 0.5, RY + 10, 18.5], tag: 'THRONE' });
      acts.push({
        name: '스테인드글라스', hint: '달빛이 장미창과 스테인드글라스를 지나 알현실 바닥에 붉고 푸른 빛을 뿌려요', hit: [52, Y + 2, Z0 + 1, 104, Y + 20, Z0 + 2],
        run: async a => {
          a.glow(2.6, 5); a.flash('throne', 1.8, 5);
          for (let k = 0; k < 8; k++) {
            for (const [gx, col] of [[52, '#ff5a6a'], [60, '#6aa8ff'], [94, '#6aa8ff'], [102, '#ff5a6a']]) a.burst([gx + 1.5, Y + 5 - k * 0.4, Z0 + 3 + k * 2.8], { n: 8, colors: [col, '#ffffff'], speed: 0.8, up: 0.3, life: 1.6, gravity: 0.4, spread: 1.4 });
            a.burst([TX + 0.5, RY - k * 1.4, Z0 + 3 + k * 3], { n: 10, colors: ['#ff5a6a', '#6aa8ff', '#ffd070'], speed: 1, up: 0.3, life: 1.6, gravity: 0.4, spread: 2 });
            await a.wait(0.35);
          }
          await a.wait(1);
        },
      });
      // ── 현관 홀: 큰 계단(잘린 중이층으로) ──
      floor(49, 75, 107, 136, B.marble);
      for (let z = 75; z <= 136; z++) for (let x = 74; x <= 82; x++) w.set(x, F, z, (x === 74 || x === 82) ? B.carpetG : B.carpet);
      for (let z = 80; z <= 132; z += 13) { w.box(76, F, z, 80, F, z, B.carpetG); w.set(78, F, z + 1, B.carpetG); w.set(78, F, z - 1, B.carpetG); }
      for (const sx of [51, 95]) {
        for (let s = 0; s < 10; s++) { w.box(sx, Y + s, 90 + s, sx + 10, Y + s, 90 + s, B.white); w.box(sx + 2, Y + s, 90 + s, sx + 8, Y + s, 90 + s, B.carpet); MH.footing(w, sx, 90 + s, sx + 10, 90 + s, Y + s, B.whiteDk); w.set(sx, Y + s + 1, 90 + s, B.gold); w.set(sx + 10, Y + s + 1, 90 + s, B.gold); if (s % 3 === 0) { w.set(sx, Y + s + 2, 90 + s, B.gold); w.set(sx + 10, Y + s + 2, 90 + s, B.gold); } }
        w.box(sx, Y, 100, sx + 10, Y + 9, 112, B.whiteDk); w.box(sx, Y + 10, 100, sx + 10, Y + 10, 112, B.cut); w.box(sx + 1, Y + 10, 100, sx + 9, Y + 10, 110, B.carpet);
        for (let z = 100; z <= 112; z += 2) { w.set(sx, Y + 11, z, B.gold); w.set(sx + 10, Y + 11, z, B.gold); }
        w.box(sx + 3, Y, 112, sx + 7, Y + 5, 112, B.dark || B.cut); w.box(sx + 2, Y + 6, 112, sx + 8, Y + 6, 112, B.trim);
        w.set(sx + 5, Y + 11, 108, B.candle); w.box(sx + 5, Y + 11, 108, sx + 5, Y + 11, 108, B.candle);
      }
      candelabra(68, 80, true); candelabra(88, 80, true); candelabra(68, 132, false); candelabra(88, 132, false);
      for (const [px, pz] of [[54, 130], [102, 130], [54, 80], [102, 80], [66, 118], [90, 118]]) { w.cyl(px, pz, Y, Y + 1, 1.4, B.whiteDk); w.ring(px, pz, Y + 1, 1, 1.6, B.gold); MH.leafBlob(w, px, Y + 4, pz, 2.4, 2.4, 2.4, [B.leaf2, B.leaf, B.leafDk]); w.box(px, Y + 2, pz, px, Y + 3, pz, B.bark); }
      for (const bx of [62, 94]) { w.box(bx, Y + 3, Z1 - 2, bx + 1, Y + 9, Z1 - 2, B.banner); w.set(bx, Y + 6, Z1 - 3, B.gold); }
      landmarks.push({ name: '현관 홀', note: '두 갈래 큰 계단과 붉은 융단', p: [MX + 0.5, Y + 16, 104.5] });
      // ── 서쪽: 연회장과 주방 ──
      floor(18, Z0 + 2, 46, 85, B.plankF); floor(18, 88, 46, 136, B.kfloor);
      for (let z = 22; z <= 80; z++) for (let x = 25; x <= 41; x++) if (x === 25 || x === 41 || z === 22 || z === 80) w.set(x, F, z, B.rugB); else if (x >= 26 && x <= 40) w.set(x, F, z, B.rug);
      for (const tx of [27, 37]) {
        w.box(tx, Y, 26, tx + 2, Y, 76, B.table); w.box(tx, Y + 1, 26, tx + 2, Y + 1, 76, B.cloth);
        for (let z = 27; z <= 75; z += 3) { w.set(tx - 1, Y, z, B.chair); w.set(tx - 1, Y + 1, z, B.chair); w.set(tx - 2, Y + 2, z, B.chair); w.set(tx + 3, Y, z, B.chair); w.set(tx + 3, Y + 1, z, B.chair); w.set(tx + 4, Y + 2, z, B.chair); w.set(tx, Y + 2, z, B.plate); w.set(tx + 2, Y + 2, z, B.plate); w.set(tx + 1, Y + 2, z, [B.food, B.wine, B.food2][(z / 3 | 0) % 3]); }
        for (const z of [34, 50, 66]) { w.box(tx + 1, Y + 2, z + 1, tx + 1, Y + 3, z + 1, B.gold); w.set(tx + 1, Y + 4, z + 1, B.candle); }
        lights.push({ p: [tx + 1.5, Y + 5, 51.5], c: '#ffd890', i: 1, d: 18, flicker: 0.2 });
      }
      // 상석(북쪽 끝)
      w.box(24, Y, 17, 42, Y, 20, B.whiteDk); w.box(26, Y + 1, 18, 40, Y + 1, 19, B.table); w.box(26, Y + 2, 18, 40, Y + 2, 19, B.cloth);
      for (let x = 27; x <= 39; x += 3) { w.set(x, Y + 1, 17, B.chair); w.set(x, Y + 2, 17, B.chair); w.set(x, Y + 3, 17, B.chair); w.set(x, Y + 3, 18, B.food); }
      w.box(32, Y + 1, 17, 34, Y + 4, 17, B.gold);
      // 큰 벽난로(서쪽 벽)
      w.box(18, Y, 42, 20, Y + 10, 60, B.hearth); w.box(19, Y, 45, 20, Y + 6, 57, 0); w.box(18, Y + 11, 44, 19, Y + 16, 58, B.hearth); w.box(18, Y + 16, 44, 19, Y + 16, 58, B.cut);
      w.box(19, Y, 46, 19, Y + 1, 56, B.wood); w.box(19, Y + 1, 47, 19, Y + 3, 55, B.fire); w.set(19, Y + 4, 51, B.candle); w.box(21, Y + 7, 44, 21, Y + 7, 58, B.gold);
      w.box(21, Y + 11, 49, 21, Y + 14, 53, B.gold); w.box(21, Y + 12, 50, 21, Y + 13, 52, B.bannerR);
      for (const z of [43, 59]) w.box(21, Y, z, 21, Y + 6, z, B.trim);
      lights.push({ name: 'hearth', p: [21, Y + 3, 51.5], c: '#ff9a40', i: 1.8, d: 24, flicker: 0.35 });
      acts.push({
        name: '연회장 벽난로', hint: '장작이 타오르며 불꽃이 튀어요', hit: [18, Y, 44, 21, Y + 10, 58],
        run: async a => { a.flash('hearth', 2.6, 3); for (let k = 0; k < 6; k++) { a.burst([21, Y + 3, 51.5], { n: 34, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], speed: 3, up: 5, life: 1.3, gravity: 3, spread: 2.4 }); await a.wait(0.45); } },
      });
      landmarks.push({ name: '연회장', note: '긴 식탁 두 줄과 큰 벽난로', p: [32.5, Y + 14, 51.5] });
      // 주방: 화덕, 조리대, 통, 매단 냄비, 찬장
      w.box(18, Y, 118, 20, Y + 7, 134, B.hearth); w.box(19, Y + 1, 120, 20, Y + 3, 124, 0); w.box(19, Y + 1, 128, 20, Y + 3, 132, 0); w.box(19, Y + 1, 122, 19, Y + 1, 122, B.fire); w.set(19, Y + 1, 130, B.fire); w.set(19, Y + 1, 121, B.fire); w.set(19, Y + 1, 131, B.fire);
      w.box(18, Y + 8, 120, 19, Y + 13, 132, B.hearth); w.box(18, Y + 13, 120, 19, Y + 13, 132, B.cut);
      w.set(20, Y + 4, 122, B.copper); w.set(20, Y + 4, 130, B.copper);
      lights.push({ name: 'kitchen', p: [21, Y + 2, 126.5], c: '#ff9a40', i: 1.2, d: 16, flicker: 0.3 });
      w.box(28, Y, 98, 40, Y + 1, 102, B.table); for (let x = 28; x <= 40; x += 2) w.set(x, Y + 2, 100, [B.food, B.food2, B.plate, B.copper][x % 4]);
      w.box(28, Y, 114, 40, Y + 1, 118, B.table); w.set(30, Y + 2, 116, B.food2); w.set(34, Y + 2, 116, B.food); w.set(38, Y + 2, 116, B.copper);
      for (let z = 90; z <= 108; z += 2) { w.box(45, Y, z, 46, Y + 6, z, B.shelf); w.set(45, Y + 2, z, [B.copper, B.plate, B.food][z % 3]); w.set(45, Y + 4, z, [B.plate, B.copper, B.food2][z % 3]); }
      for (const [bx, bz] of [[44, 92], [44, 94], [43, 93], [44, 134], [42, 134], [44, 132], [40, 134]]) { w.set(bx, Y, bz, B.barrel); w.set(bx, Y + 1, bz, B.barrel); }
      for (const [cx, cz] of [[24, 134], [26, 134], [24, 132]]) w.box(cx, Y, cz, cx + 1, Y + 1, cz + 1, B.crate);
      w.box(18, Y + 9, 89, 46, Y + 9, 89, B.iron);
      const pots = w.prop({ name: 'pots', pivot: [32.5, Y + 9, 89.5], axis: 'x', rock: 0.03 });
      for (let x = 23; x <= 43; x += 3) { pots.set(x, Y + 8, 89, B.iron); pots.set(x, Y + 7, 89, B.iron); pots.set(x, Y + 6, 89, x % 2 ? B.steel : B.copper); }
      landmarks.push({ name: '주방', note: '화덕 두 개와 조리대', p: [32.5, Y + 12, 112.5] });
      acts.push({
        name: '주방 화덕', hint: '화덕 불이 확 일고 매달린 냄비들이 달그락 흔들리며 김이 올라요', hit: [18, Y, 118, 21, Y + 7, 134],
        run: async a => {
          a.flash('kitchen', 3, 4);
          const fire = async () => { for (let k = 0; k < 8; k++) { for (const z of [122.5, 130.5]) a.burst([20.8, Y + 2, z], { n: 12, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], speed: 2, up: 4, life: 1, gravity: 2, spread: 1 }); for (const z of [100, 116]) a.burst([34.5, Y + 3, z + 0.5], { n: 6, colors: ['#ffffff', '#e8e8f0'], speed: 0.6, up: 3, life: 1.8, gravity: -0.8, spread: 2 }); await a.wait(0.4); } };
          const swing = async () => { for (const amp of [0.9, 0.6, 0.35]) { await a.turn('pots', [amp, 0, 0], 0.4); await a.turn('pots', [-amp, 0, 0], 0.4); } await a.turn('pots', [0, 0, 0], 0.4); };
          await Promise.all([fire(), swing()]);
        },
      });
      // ── 동쪽: 왕실 서고, 보물고, 무기고 ──
      floor(110, Z0 + 2, 138, 75, B.plankF); floor(110, 78, 138, 110, B.tile); floor(110, 113, 138, 136, B.kfloor);
      const books = [B.book1, B.book2, B.book3, B.book4];
      const shelfRow = (x0, x1, z) => { for (let x = x0; x <= x1; x++) for (let y = Y; y <= Y + 8; y++) w.set(x, y, z, (y - Y) % 2 === 1 || x === x0 || x === x1 || y === Y + 8 ? B.shelf : books[(hash3(x, y, z) * 4) | 0]); };
      shelfRow(112, 137, Z0 + 2); for (const z of [26, 34, 42, 50]) { shelfRow(116, 132, z); shelfRow(116, 132, z + 1); }
      for (let z = 18; z <= 74; z += 1) for (let y = Y; y <= Y + 8; y++) if (z < 40 || z > 46) w.set(137, y, z, (y - Y) % 2 === 1 || y === Y + 8 ? B.shelf : books[(hash3(1, y, z) * 4) | 0]);
      for (let y = Y; y <= Y + 8; y++) { w.set(114, y, 27, B.wood); if (y % 2) w.set(115, y, 27, B.wood); }
      for (let x = 117; x <= 131; x += 7) for (let z = 28; z <= 48; z += 8) { w.set(x, Y, z + 4, B.chair); w.set(x + 2, Y, z + 4, B.chair); }
      for (let z = 58; z <= 72; z++) for (let x = 114; x <= 134; x++) if (x === 114 || x === 134 || z === 58 || z === 72) w.set(x, F, z, B.rugB); else w.set(x, F, z, B.rug);
      w.box(119, Y, 63, 129, Y, 67, B.table); w.set(122, Y + 1, 66, B.book2); w.set(127, Y + 1, 66, B.book1); w.box(124, Y + 1, 65, 124, Y + 2, 65, B.gold); w.set(124, Y + 3, 65, B.candle);
      for (let x = 120; x <= 128; x += 2) { w.set(x, Y, 61, B.chair); w.set(x, Y + 1, 61, B.chair); w.set(x, Y, 69, B.chair); w.set(x, Y + 1, 69, B.chair); }
      w.box(114, Y, 67, 114, Y + 1, 67, B.wood);
      const globe = w.prop({ name: 'globe', pivot: [114.5, Y + 3.5, 67.5], speed: 0.3 });
      globe.sphere(114, Y + 3, 67, 1.5, B.globe); for (const [x, y, z] of [[113, Y + 3, 66], [115, Y + 4, 67], [114, Y + 2, 68], [113, Y + 4, 68]]) globe.set(x, y, z, B.leaf2);
      const fbooks = [[120, 64, B.book1], [127, 67, B.book3], [125, 63, B.book4]];
      fbooks.forEach(([bx, bz, bc], k) => { const p = w.prop({ name: 'fbook' + k, pivot: [bx + 1, Y + 1, bz + 0.5] }); p.set(bx, Y + 1, bz, bc); p.set(bx + 1, Y + 1, bz, bc); p.set(bx, Y + 2, bz, B.cloth); });
      acts.push({
        name: '왕실 서고', hint: '지구본이 빙글빙글 돌고 책들이 떠올라 서고 위를 맴돌아요', hit: [112, Y, 62, 130, Y + 5, 68],
        run: async a => {
          a.glow(1.5, 8);
          const fly = async ([bx, bz], k) => {
            const s0 = [bx + 1, Y + 1, bz + 0.5], pts = [];
            for (let i = 0; i <= 24; i++) { const t = k * 2.1 + i / 12 * Math.PI; pts.push([124.5 + 6 * Math.cos(t) - s0[0], 9 + Math.sin(i * 0.8), 65.5 + 6 * Math.sin(t) - s0[2], -t - Math.PI / 2]); }
            await a.wait(k * 0.3);
            await a.move('fbook' + k, [0, 5, 0], 1);
            await a.path('fbook' + k, pts, 6);
            await a.respawn('fbook' + k, 1.0);
          };
          const sparkle = async () => { for (let q = 0; q < 14; q++) { a.burst([124.5 + 6 * Math.cos(q), Y + 10, 65.5 + 6 * Math.sin(q)], { n: 6, colors: ['#5ac8ff', '#ffffff', '#ffe2a0'], speed: 1, up: 1, life: 1.2, gravity: -0.3, spread: 1 }); await a.wait(0.5); } };
          await Promise.all([a.spin('globe', 12, 7), sparkle(), ...fbooks.map(fly)]);
        },
      });
      lights.push({ p: [124.5, Y + 4, 65.5], c: '#ffe0a0', i: 1.1, d: 18, flicker: 0.15 });
      // 북동 모서리 탑 계단문(서가 벽 x137): 나선 계단을 올라 왕의 서재로
      {
        const DX = 137, Q0 = 19, Q1 = 21;
        w.box(DX, Y, Q0, DX, Y + 3, Q1, B.door); w.box(DX, Y, Q0 + 1, DX, Y + 3, Q0 + 1, B.wood); w.set(DX, Y + 1, Q1, B.gold);
        w.box(DX, Y, Q0 - 1, DX, Y + 5, Q0 - 1, B.trim); w.box(DX, Y, Q1 + 1, DX, Y + 5, Q1 + 1, B.trim); w.box(DX, Y + 4, Q0, DX, Y + 5, Q1, B.trim); w.set(DX, Y + 5, Q0 + 1, B.gold);
        w.set(DX - 1, Y + 4, Q1 + 1, B.iron); w.set(DX - 1, Y + 5, Q1 + 1, B.candle);
        acts.push(OR.goAct({ at: [DX - 1, Y, Q0 + 1], h: 5, name: '왕의 서재 안으로', goto: 'innerkeep-tower', hint: '서가 사이 탑문을 열고 나선 계단을 올라 북동 모서리 탑의 왕의 서재로 들어가요', hit: [DX - 1, Y, Q0, DX, Y + 4, Q1] }));
      }
      landmarks.push({ name: '왕실 서고', note: '왕국의 연대기가 잠든 서가', p: [124.5, Y + 15, 40.5] });
      // 보물고: 금화 더미, 보석, 뚜껑이 열리는 상자
      const CXX = 124, CZZ = 104;
      for (let i = 0; i < 260; i++) { const x = w.ri(111, 137), z = w.ri(80, 100); let y = Y; while (w.get(x, y, z)) y++; if (y < Y + 4 && MH.dist(x, z, CXX, CZZ) > 5) w.set(x, y, z, hash3(x, y, z) > 0.85 ? B.coin : B.gold); }
      for (const [gx, gy, gz, gb] of [[115, 3, 84, B.gemR], [131, 2, 86, B.gemB], [121, 3, 82, B.gemB], [134, 3, 94, B.gemR], [117, 2, 96, B.gemB], [128, 3, 90, B.gemR]]) w.set(gx, Y + gy, gz, gb);
      for (const [px, pz] of [[113, 80], [136, 80]]) { w.box(px, Y, pz, px, Y + 4, pz, B.whiteDk); w.set(px, Y + 5, pz, B.gold); w.set(px, Y + 6, pz, B.gemR); }
      w.box(CXX - 3, Y, CZZ - 1, CXX + 3, Y + 2, CZZ + 2, B.chest); w.box(CXX - 3, Y, CZZ - 1, CXX - 3, Y + 2, CZZ + 2, B.gold); w.box(CXX + 3, Y, CZZ - 1, CXX + 3, Y + 2, CZZ + 2, B.gold); w.box(CXX, Y, CZZ + 2, CXX, Y + 2, CZZ + 2, B.gold);
      w.box(CXX - 2, Y + 2, CZZ, CXX + 2, Y + 2, CZZ + 1, B.coin);
      const lid = w.prop({ name: 'clid', pivot: [CXX + 0.5, Y + 3, CZZ - 1], axis: 'x' });
      lid.box(CXX - 3, Y + 3, CZZ - 1, CXX + 3, Y + 3, CZZ + 2, B.chest); lid.box(CXX - 2, Y + 4, CZZ, CXX + 2, Y + 4, CZZ + 1, B.chest);
      lid.box(CXX - 3, Y + 3, CZZ - 1, CXX - 3, Y + 3, CZZ + 2, B.gold); lid.box(CXX + 3, Y + 3, CZZ - 1, CXX + 3, Y + 3, CZZ + 2, B.gold); lid.set(CXX, Y + 3, CZZ + 2, B.gold);
      lights.push({ name: 'gold', p: [CXX + 0.5, Y + 4, CZZ + 0.5], c: '#ffd070', i: 0.9, d: 16, flicker: 0.05 });
      w.box(108, Y + 9, 92, 109, Y + 9, 96, B.iron); for (const z of [92, 94, 96]) w.box(108, Y, z, 109, Y + 8, z, B.iron);
      acts.push({
        name: '보물 상자', hint: '뚜껑이 열리고 금빛이 쏟아져요', hit: [CXX - 3, Y, CZZ - 1, CXX + 3, Y + 4, CZZ + 2],
        run: async a => {
          await a.turn('clid', [-1.25, 0, 0], 1);
          a.flash('gold', 4, 3); a.glow(1.6, 3);
          for (let k = 0; k < 5; k++) { a.burst([CXX + 0.5, Y + 4, CZZ + 1], { n: 30, colors: ['#ffd860', '#ffffff', '#ff3a5a', '#5ac8ff'], speed: 3, up: 5, life: 1.6, gravity: 3, spread: 2 }); await a.wait(0.5); }
          await a.turn('clid', [0, 0, 0], 0.9);
        },
      });
      landmarks.push({ name: '보물고', note: '금화 더미와 보석함', p: [124.5, Y + 12, 92.5] });
      // 무기고: 창 걸이, 방패 벽, 갑옷 상자, 숫돌
      for (let x = 114; x <= 134; x += 4) { w.box(x, Y, 134, x, Y + 1, 134, B.wood); w.box(x, Y + 2, 134, x, Y + 8, 134, B.steel); w.set(x, Y + 9, 134, B.iron); w.box(x - 1, Y + 3, 135, x + 1, Y + 3, 135, B.wood); }
      for (let z = 116; z <= 132; z += 4) { w.box(137, Y + 3, z, 137, Y + 6, z + 2, z % 8 === 4 ? B.banner : B.bannerR); w.set(136, Y + 4, z + 1, B.gold); w.set(136, Y + 5, z + 1, B.steel); }
      w.box(114, Y, 118, 116, Y + 1, 120, B.chest); w.box(124, Y, 118, 126, Y + 1, 120, B.chest); w.box(119, Y, 126, 121, Y, 128, B.steel); w.box(128, Y, 125, 130, Y + 1, 127, B.crate);
      w.cyl(131, 119, Y, Y + 1, 1.2, B.found); w.box(131, Y + 2, 119, 131, Y + 2, 119, B.steel);
      candelabra(120, 116, true);
      landmarks.push({ name: '무기고', note: '창과 방패가 늘어선 방', p: [125.5, Y + 12, 124.5] });

      // ── 새 구역: 달빛 정원(정문 밖 남쪽) ──
      const G = base + 1;
      // 정문 앞 자갈 길과 정원 길
      for (let z = Z1 + 1; z < D; z++) for (let x = 72; x <= 84; x++) MH.paint(w, x, z, x === 72 || x === 84 ? B.whiteDk : B.gravel);
      for (let x = 8; x <= 168; x++) for (let z = 148; z <= 150; z++) if (MH.g(w, x, z) === G) MH.paint(w, x, z, z === 149 ? B.gravel : B.whiteDk);
      // 산울타리 테두리
      for (let x = 4; x <= 172; x++) { if (x >= 70 && x <= 86) continue; if (MH.g(w, x, 173) === G) { w.box(x, G + 1, 173, x, G + 2, 173, B.hedge); if (x % 6 === 0) w.set(x, G + 3, 173, B.hedge); } }
      for (const [x0, x1] of [[6, 66], [90, 104]]) for (let x = x0; x <= x1; x++) if (MH.g(w, x, 144) === G) { w.box(x, G + 1, 144, x, G + 2, 144, B.hedge); if (x % 4 === 0) w.set(x, G + 2, 145, x % 8 ? B.flowerW : B.flowerR); }
      for (const [x, z] of [[72, 141], [84, 141]]) { w.box(x, G + 1, z, x, G + 6, z, B.iron); w.set(x, G + 7, z, B.fire); w.box(x - 1, G + 1, z - 1, x + 1, G + 1, z + 1, B.whiteDk); lights.push({ p: [x + 0.5, G + 8, z + 0.5], c: '#ffb050', i: 1.1, d: 16, flicker: 0.3 }); }
      // 백조 연못과 달빛 분수
      for (let z = 150; z <= 172; z++) for (let x = 20; x <= 60; x++) {
        const e = ((x - 40) / 17) ** 2 + ((z - 161) / 8) ** 2;
        if (e >= 1 && e < 1.35 && MH.g(w, x, z) === G) { MH.paint(w, x, z, B.whiteDk); if (e < 1.18) w.set(x, G + 1, z, B.trim); }
      }
      for (const [lx, lz] of [[28, 158], [50, 164], [33, 166], [47, 156]]) { w.set(lx, base, lz, B.lily); w.set(lx + 1, base, lz, B.lily); w.set(lx, base, lz + 1, B.flowerW); }
      const FX = 40, FZ = 161;
      w.cyl(FX, FZ, base - 2, base + 1, 2.6, B.white); w.ring(FX, FZ, base + 2, 1.6, 2.6, B.trim);
      w.cyl(FX, FZ, base + 2, base + 7, 0.8, B.white); w.cyl(FX, FZ, base + 8, base + 8, 2.2, B.white); w.ring(FX, FZ, base + 9, 1.4, 2.2, B.gold);
      w.box(FX, base + 9, FZ, FX, base + 11, FZ, B.white); w.set(FX, base + 12, FZ, B.moonP); w.set(FX, base + 13, FZ, B.moonC);
      lights.push({ name: 'moon', p: [FX + 0.5, base + 13, FZ + 0.5], c: '#c8d8ff', i: 0.9, d: 22, flicker: 0.05 });
      for (const [bx, bz] of [[22, 150], [58, 150], [22, 172], [58, 172]]) { w.box(bx, G + 1, bz, bx, G + 5, bz, B.white); w.set(bx, G + 6, bz, B.moonP); lights.push({ p: [bx + 0.5, G + 6, bz + 0.5], c: '#c8d8ff', i: 0.6, d: 10, flicker: 0.05 }); }
      // 정자(분수 동쪽)
      const GZX = 64, GZZ = 162;
      w.cyl(GZX, GZZ, G + 1, G + 1, 4.4, B.whiteDk); w.cyl(GZX, GZZ, G + 1, G + 1, 3.4, B.plankF);
      for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3, px = Math.round(GZX + Math.cos(a) * 3.6), pz = Math.round(GZZ + Math.sin(a) * 3.6); w.box(px, G + 2, pz, px, G + 7, pz, B.white); }
      MH.cone(w, GZX, GZZ, G + 8, 5.2, B.roofB, 0.6, B.eave); w.box(GZX, G + 16, GZZ, GZX, G + 17, GZZ, B.gold);
      w.set(GZX, G + 7, GZZ, B.candle); lights.push({ p: [GZX + 0.5, G + 6, GZZ + 0.5], c: '#ffd890', i: 0.8, d: 12, flicker: 0.15 });
      // 화단과 장미 아치
      for (const [x0, z0] of [[90, 152], [90, 164]]) {
        w.walls(x0, G + 1, z0, x0 + 12, G + 1, z0 + 6, B.whiteDk);
        for (let z = z0 + 1; z < z0 + 6; z++) for (let x = x0 + 1; x < x0 + 12; x++) { MH.paint(w, x, z, B.dirt); w.set(x, G + 1, z, ((x + z) % 3 === 0) ? [B.flowerR, B.flowerW, B.flowerY][(x >> 1) % 3] : B.leaf2); }
      }
      for (const z of [148, 156, 164]) { w.box(71, G + 1, z, 71, G + 6, z, B.white); w.box(85, G + 1, z, 85, G + 6, z, B.white); for (let x = 71; x <= 85; x++) { const yy = G + 7 + (x > 74 && x < 82 ? 1 : 0); w.set(x, yy, z, (x & 1) ? B.leafDk : B.flowerR); } }
      landmarks.push({ name: '달빛 정원', note: '백조 연못과 달빛 분수, 정자', p: [40.5, G + 18, 161.5] });
      // 백조(부품): 연못을 가로질러 헤엄친다
      const swans = [[27, 158], [30, 163]];
      swans.forEach(([sx, sz], k) => {
        const p = w.prop({ name: 'swan' + k, pivot: [sx + 0.5, base + 1, sz + 0.5], bob: 0.1, bobSpeed: 1.4 });
        p.box(sx - 1, base + 1, sz, sx + 1, base + 1, sz, B.swan); p.box(sx, base + 1, sz - 1, sx, base + 1, sz + 1, B.swan); p.set(sx - 1, base + 2, sz, B.swan);
        p.box(sx + 1, base + 2, sz, sx + 1, base + 4, sz, B.swan); p.set(sx + 2, base + 4, sz, B.beak);
      });
      acts.push({
        name: '백조 연못', hint: '두 마리 백조가 물결을 남기며 연못을 가로질러 헤엄친 뒤 날개를 펴고 정원 너머 밤하늘로 날아가요', hit: [25, base + 1, 156, 32, base + 4, 165],
        run: async a => {
          await Promise.all(swans.map(async ([sx, sz], k) => {
            await a.wait(k * 0.6);
            const ripple = async () => { for (let q = 0; q < 12; q++) { a.burst([sx + q * 1.9, base + 1.2, sz + 0.5 + Math.sin(q * 0.6) * 1.5], { n: 6, colors: ['#e0f4ff', '#8ac0f0'], speed: 1.5, up: 0.4, life: 0.8, gravity: 1, spread: 1, flat: true }); await a.wait(0.45); } };
            await Promise.all([a.drive('swan' + k, [[6, 0, k ? -1 : 1.5], [12, 0, k ? 0 : 2], [18, 0, k ? 1 : 0.5], [23, 0, 0], [28, 2, 3], [33, 8, 12], [38, 14, 24], [44, 18, 40]], 9, { fwd: '+x', back: 1.0 }), ripple()]);
          }));
        },
      });
      acts.push({
        name: '달빛 분수', hint: '달빛 분수가 은빛 물줄기를 뿜자 반딧불이가 연못 위로 떠올라요', hit: [FX - 2, base + 2, FZ - 2, FX + 2, base + 13, FZ + 2],
        run: async a => {
          a.flash('moon', 3, 5); a.glow(1.4, 5);
          for (let k = 0; k < 10; k++) {
            a.burst([FX + 0.5, base + 13, FZ + 0.5], { n: 30, colors: ['#e0f4ff', '#c8d8ff', '#ffffff'], speed: 3.5, up: 9, life: 1.6, gravity: 10, spread: 1 });
            a.burst([FX + 0.5 + Math.cos(k) * 10, base + 3, FZ + 0.5 + Math.sin(k) * 5], { n: 8, colors: ['#c8ff8a', '#fff4a0'], speed: 0.6, up: 2, life: 2.4, gravity: -0.6, spread: 2 });
            await a.wait(0.4);
          }
        },
      });
      // 동쪽 잔디밭: 자갈 산책로, 원뿔 정원수, 가로등
      for (let z = 10; z <= 146; z++) for (let x = 148; x <= 150; x++) if (MH.g(w, x, z) === G) MH.paint(w, x, z, x === 149 ? B.gravel : B.whiteDk);
      for (let z = 18; z <= 138; z += 12) {
        const tx = 160 + ((z / 12 | 0) % 2) * 6;
        w.box(tx, G + 1, z, tx, G + 2, z, B.bark); MH.leafBlob(w, tx, G + 5, z, 2.2, 3.4, 2.2, [B.hedge, B.leafDk, B.leaf]); w.set(tx, G + 9, z, B.hedge);
        if (z % 24 === 18) { w.box(152, G + 1, z, 152, G + 5, z, B.iron); w.set(152, G + 6, z, B.lampG); w.set(152, G + 7, z, B.iron); lights.push({ p: [152.5, G + 6, z + 0.5], c: '#ffd890', i: 0.7, d: 12, flicker: 0.1, night: true }); }
        else { w.box(152, G + 1, z, 154, G + 1, z, B.wood); w.box(152, G + 2, z, 152, G + 2, z, B.wood); w.box(154, G + 2, z, 154, G + 2, z, B.wood); }
      }
      for (let z = 30; z <= 126; z += 24) for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) { const d = Math.hypot(dx, dz); if (d < 3.4 && d > 2.2) w.set(168 + dx, G + 1, z + dz, B.hedge); else if (d <= 1.5) w.set(168 + dx, G + 1, z + dz, (dx + dz) & 1 ? B.flowerR : B.flowerY); }
      // 유리 온실(동쪽): 낮은 유리벽, 쇠 갈비뼈 지붕, 달꽃 화분
      const OX0 = 110, OX1 = 140, OZ0 = 150, OZ1 = 170;
      MH.flatten(w, OX0 - 1, OZ0 - 1, OX1 + 1, OZ1 + 1, F, B.kfloor, B.found);
      for (let z = OZ0; z <= OZ1; z++) for (let x = OX0; x <= OX1; x++) {
        const edge = x === OX0 || x === OX1 || z === OZ0 || z === OZ1;
        if (edge) { const post = (x - OX0) % 5 === 0 && (z === OZ0 || z === OZ1) || (z - OZ0) % 5 === 0 && (x === OX0 || x === OX1); w.box(x, Y, z, x, Y + (post ? 9 : 3), z, post ? B.iron : B.glassC); w.set(x, Y, z, B.whiteDk); }
      }
      w.box(124, Y, OZ1, 126, Y + 5, OZ1, 0); w.box(123, Y + 6, OZ1, 127, Y + 6, OZ1, B.iron);
      for (let x = OX0; x <= OX1; x += 5) for (let z = OZ0; z <= OZ1; z++) { const yy = Y + 9 + Math.round(4 * Math.sin((z - OZ0) / (OZ1 - OZ0) * Math.PI)); w.set(x, yy, z, B.iron); }
      w.box(OX0, Y + 9, OZ0, OX1, Y + 9, OZ0, B.iron); w.box(OX0, Y + 9, OZ1, OX1, Y + 9, OZ1, B.iron); w.box(OX0, Y + 13, (OZ0 + OZ1) / 2, OX1, Y + 13, (OZ0 + OZ1) / 2, B.gold);
      for (let x = OX0 + 2; x <= OX1 - 2; x++) for (const z of [OZ0 + 2, OZ1 - 2]) { if (x > 122 && x < 128) continue; w.set(x, Y, z, B.dirt); if (x % 2) MH.leafBlob(w, x, Y + 1, z, 1, 1, 1, [B.leaf2, B.leaf, B.leafDk]); }
      for (const tx of [114, 136]) { MH.tree(w, tx, Y, 160, { kind: 'palm', h: 9, bark: B.bark, leaves: [B.leaf2, B.leaf, B.leafDk] }); }
      w.box(118, Y, 158, 132, Y, 162, B.whiteDk);
      const blooms = [[120, 160], [125, 160], [130, 160]];
      blooms.forEach(([bx, bz], k) => {
        w.box(bx, Y + 1, bz, bx, Y + 1, bz, B.copper); w.box(bx, Y + 2, bz, bx, Y + 4, bz, B.leafDk); w.set(bx - 1, Y + 3, bz, B.leaf2); w.set(bx + 1, Y + 3, bz, B.leaf2);
        const p = w.prop({ name: 'bloom' + k, pivot: [bx + 0.5, Y + 5, bz + 0.5], scl0: [0.35, 0.35, 0.35] });
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) p.set(bx + dx, Y + 5 + (Math.abs(dx) + Math.abs(dz) > 1 ? 1 : 0), bz + dz, B.moonP);
        p.set(bx, Y + 5, bz, B.moonC); p.set(bx, Y + 6, bz, B.moonC);
      });
      lights.push({ name: 'moonflower', p: [125.5, Y + 6, 160.5], c: '#d8e4ff', i: 0.5, d: 20, flicker: 0.05 });
      landmarks.push({ name: '유리 온실', note: '밤에만 피는 달꽃을 기르는 온실', p: [125.5, Y + 20, 160.5] });
      acts.push({
        name: '온실 달꽃', hint: '유리 온실의 달꽃 세 송이가 활짝 피어나며 은빛 꽃가루를 날려요', hit: [118, Y + 1, 158, 132, Y + 10, 162],
        run: async a => {
          a.flash('moonflower', 5, 5);
          for (let k = 0; k < 3; k++) { a.tween('bloom' + k, { off: [0, 3, 0], scl: [1.8, 1.8, 1.8] }, 1.2); await a.wait(0.35); }
          await a.wait(0.9);
          for (let q = 0; q < 8; q++) { blooms.forEach(([bx, bz]) => a.burst([bx + 0.5, Y + 10, bz + 0.5], { n: 8, colors: ['#e8f0ff', '#fff4a0', '#ffffff'], speed: 1.2, up: 3, life: 2, gravity: -0.4, spread: 1.2 })); await a.wait(0.4); }
          await Promise.all(blooms.map((b, k) => a.tween('bloom' + k, { off: [0, 0, 0], scl: [0.35, 0.35, 0.35] }, 1.6)));
        },
      });
      // ── 성 정문(부품): 남쪽 정문 두 문짝이 바깥 뜰로 열린다 ──
      w.box(73, Y, Z1, 73, Y + 10, Z1 + 1, B.trim); w.box(83, Y, Z1, 83, Y + 10, Z1 + 1, B.trim); w.box(72, Y + 10, Z1 + 1, 84, Y + 11, Z1 + 1, B.whiteDk); w.box(76, Y + 12, Z1 + 1, 80, Y + 13, Z1 + 1, B.gold);
      const gL = w.prop({ name: 'mgateL', pivot: [74, Y, Z1 + 0.5] }), gR = w.prop({ name: 'mgateR', pivot: [83, Y, Z1 + 0.5] });
      for (let y = Y; y <= Y + 9; y++) for (let x = 74; x <= 82; x++) (x < 78 ? gL : gR).set(x, y, Z1, (y === Y + 2 || y === Y + 6 || x === 77 || x === 78 || y === Y + 9) ? B.iron : B.door);
      acts.push({
        name: '성 정문', hint: '쇠테 두른 정문이 바깥 뜰 쪽으로 활짝 열리며 횃불이 타올라요', hit: [74, Y, Z1 - 1, 82, Y + 9, Z1],
        run: async a => {
          await Promise.all([a.turn('mgateL', [0, -1.45, 0], 2.4), a.turn('mgateR', [0, 1.45, 0], 2.4)]);
          for (let k = 0; k < 4; k++) { for (const x of [72, 84]) a.burst([x + 0.5, G + 8, 141.5], { n: 12, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], speed: 2, up: 5, life: 1, gravity: -1, spread: 0.8 }); a.burst([MX + 0.5, Y + 4, Z1 - 3], { n: 10, colors: ['#ffe8c0', '#ffffff'], speed: 2, up: 2, life: 1.4, gravity: 0, spread: 3 }); await a.wait(0.5); }
          await a.wait(1.2);
          await Promise.all([a.turn('mgateL', [0, 0, 0], 2.2), a.turn('mgateR', [0, 0, 0], 2.2)]);
        },
      });
      // 정문 밖 이정표: 성문 문루를 지나 왕성 앞 광장(castlegate)으로
      {
        const SX = 87, SZ = 143;
        w.box(SX - 1, G, SZ - 1, SX + 1, G, SZ + 1, B.whiteDk);
        w.box(SX, G + 1, SZ, SX, G + 6, SZ, B.wood);
        for (let s = 1; s <= 4; s++) w.set(SX, G + 5, SZ + s, s === 4 ? B.gold : B.door);
        for (let s = 1; s <= 3; s++) w.set(SX + s, G + 3, SZ, s === 3 ? B.gold : B.door);
        w.set(SX, G + 7, SZ, B.lampG); w.set(SX, G + 8, SZ, B.iron);
        acts.push(OR.goAct({ at: [SX, G + 1, SZ], h: 7, name: '성문 광장으로', goto: 'castlegate', hint: '정문을 나서 성문 문루를 지나 선왕 석상이 늘어선 왕성 앞 광장으로 가요' }));
      }
      // ── 밤하늘 불꽃놀이: 익랑 벽 위에서 쏘아 올린다 ──
      acts.push({
        name: '밤하늘 불꽃', hint: '왕성 위 밤하늘에 금빛과 푸른빛 불꽃이 연달아 터져요', hit: [46, Y + 11, 122, 49, Y + 12, 128],
        run: async a => {
          const sets = [['#ffd860', '#fff4c0'], ['#6aa8ff', '#ffffff'], ['#ff5a6a', '#ffd0d0'], ['#c08aff', '#ffffff'], ['#7aff9a', '#fff4c0']];
          const pads = [[47.5, 124], [108.5, 44], [47.5, 36], [108.5, 124], [78.5, 80], [47.5, 80], [108.5, 94]];
          for (let k = 0; k < pads.length; k++) {
            const [x, z] = pads[k];
            a.burst([x, Y + 12, z], { n: 10, colors: ['#ffe8a0'], speed: 0.4, up: 22, life: 1, gravity: 4, spread: 0.3 });
            await a.wait(0.65);
            a.burst([x, Y + 40, z], { n: 100, colors: sets[k % sets.length], speed: 16, up: 2, life: 1.8, gravity: 2.5, spread: 1 });
            await a.wait(0.3);
          }
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
