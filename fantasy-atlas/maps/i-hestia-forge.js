// 웰프의 대장간(하위 지도) — 화덕의 저택 옆마당, 앞이 트인 돌 작업장. 북쪽 벽의 화로와 굴뚝 갓, 풀무, 가운데 모루,
// 담금질 물통, 서쪽 벽의 마검 진열장, 동쪽 작업대와 숫돌, 망치·집게 걸이. 남·동쪽은 낮게 잘랐다 (오라리오)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 64, D = 64, Hh = 40, G = 12;
  MAPS.push({
    id: 'hestia-forge', cat: 'orario', sub: true, parent: 'hestia', name: '웰프의 대장간', en: 'Hestia Familia · Welf\'s Smithy', color: '#ff8a3a', seed: 11032, base: G, time: 'day', size: [W, D, Hh],
    spawn: [32, G + 1, 38],
    desc: '화덕의 저택 옆마당에 들인 앞이 트인 돌 작업장. 대장장이 웰프 크로조가 북쪽 벽 화로에 풀무질을 하며 쇠를 달구고, 가운데 모루에서 망치를 내리친다. 서쪽 벽 유리 진열장에는 크로조 가문의 피가 담긴 붉은 마검들이 잠들어 있다.',
    info: { title: '장소 정보', en: 'WELF\'S SMITHY', rows: [['대장장이', '웰프 크로조(헤파이스토스 파밀리아 출신)'], ['진열장', '크로조의 마검'], ['작업', '화로 · 풀무 · 모루 · 담금질 물통']] },
    sky: ['#e8d8c0', '#a88a68', '#ffe8c8'], stars: false,
    hemi: ['#fff0e0', '#4a3a30', 0.6], sun: ['#fff0d8', 0.6, [0.45, 1, 0.6]],
    night: { sky: ['#2e2420', '#100c0a', '#d0703a'], stars: false, hemi: ['#d8a888', '#181210', 0.42], sun: ['#ffc898', 0.28, [0.45, 1, 0.6]], haze: '#2a201c' },
    liquid: ['#3a5a6a', '#6a8a98', '#c8e0e8'], liqSpeed: 0.3,
    fog: { start: 0.9, floor: G - 6, depth: 6, haze: [8, 0.12, 6], hazeColor: '#d8c8b4' },
    camY: -6, zoom: 1.2,
    particles: [
      { n: 70, colors: ['#ff8a3a', '#ffd070', '#ff5a1a'], mode: 'rise', speed: 0.6, area: [24.5, 17.5, 2.5], y0: G + 3, y1: G + 18, glow: true },
      { n: 60, colors: ['#bcb8b0', '#8a8680', '#d8d4cc'], mode: 'drift', speed: 0.15, wind: 0.1, area: [32, 28, 16], y0: G + 2, y1: G + 12, glow: false },
    ],
    blocks: Object.assign(OR.blocks(), {
      chStone: { c: '#a8a49a', v: 0.06, pat: 'stone' }, chStone2: { c: '#8e8a82', v: 0.06, pat: 'brick' }, flagF: { c: '#6a6460', top: '#7a7470', v: 0.06, pat: 'stone' }, soot: { c: '#2a2422', v: 0.04 },
      beam: { c: '#4a3426', v: 0.04 }, plank: { c: '#7a5a3a', top: '#9a7448', v: 0.05, pat: 'plank' }, log: { c: '#6a4a30', top: '#a8865a', v: 0.05, pat: 'log' },
      anvil: { c: '#3a3a40', v: 0.03 }, steel: { c: '#9aa0a8', v: 0.03 }, hot: { c: '#ff7a2a', glow: true }, hotY: { c: '#ffd060', glow: true },
      forge: { c: '#ff8a3a', glow: true }, coal: { c: '#2a2020', v: 0.06 }, ember: { c: '#c8401a', glow: true }, leather: { c: '#7a4a2a', v: 0.05 },
      blade: { c: '#c8d0d8', v: 0.02 }, bladeR: { c: '#d83a2a', glow: true }, bladeO: { c: '#ff8a3a', glow: true }, hilt: { c: '#3a2a22', v: 0.03 }, glass: { c: '#a8c8dc', v: 0.03 },
      ore: { c: '#7a6a5a', v: 0.08, pat: 'stone' }, oreB: { c: '#4a7aa8', v: 0.05 }, ingot: { c: '#b8b0a0', v: 0.03 }, crate: { c: '#9a7448', v: 0.05, pat: 'plank' }, barrel: { c: '#7a5232', v: 0.05, pat: 'log' },
      wheel: { c: '#b8b0a0', v: 0.06, pat: 'stone' }, lampW: { c: '#ffd890', glow: true },
    }),
    build(w) {
      const B = w.id;
      const X0 = 14, X1 = 50, Z0 = 14, Z1 = 42, TOP = G + 12, DCX = 32;
      const S = (x, y, z, b) => w.set(x, y, z, b);
      MH.terrain(w, { floor: G - 6, height: () => G, surface: (x, z) => hash3(x, 2, z) > 0.9 ? B.leafL : B.grass, under: (x, z, y, dep) => dep < 2 ? B.soil : B.rock });
      const lights = [], acts = [], landmarks = [];

      // ── 바닥과 벽: 돌판 바닥(화로 앞은 그을음), 북·서쪽은 높은 돌벽과 들보, 동쪽은 낮게, 남쪽은 트인 앞 ──
      for (let z = Z0 + 1; z < Z1; z++) for (let x = X0 + 1; x < X1; x++) S(x, G, z, Math.hypot(x - 24, z - 20) < 5 && hash3(x, 1, z) > 0.4 ? B.soot : B.flagF);
      for (let z = Z1; z < D; z++) for (let x = DCX - 3; x <= DCX + 3; x++) S(x, G, z, hash3(x, 3, z) > 0.3 ? B.pave : B.flagF);
      for (let y = G + 1; y <= TOP; y++) {
        for (let x = X0; x <= X1; x++) S(x, y, Z0, (x - X0) % 6 === 0 ? B.beam : (y === TOP ? B.beam : B.chStone2));
        for (let z = Z0; z <= Z1; z++) S(X0, y, z, (z - Z0) % 6 === 0 ? B.beam : (y === TOP ? B.beam : B.chStone2));
      }
      for (let x = X0 + 3; x <= X1 - 3; x += 6) for (let y = G + 5; y <= G + 8; y++) S(x, y, Z0, (x > 18 && x < 30) ? B.chStone2 : B.win);
      for (let z = Z0 + 3; z <= Z1 - 3; z += 6) for (let y = G + 8; y <= G + 10; y++) S(X0, y, z, B.win);
      for (let z = Z0; z <= Z1; z++) for (let y = G + 1; y <= G + 3; y++) S(X1, y, z, (z - Z0) % 6 === 0 ? B.beam : (y === G + 3 ? B.beam : B.chStone2));
      for (let x = X0; x <= X1; x++) { if (Math.abs(x - DCX) <= 3) continue; S(x, G + 1, Z1, (x - X0) % 6 === 0 ? B.beam : B.chStone); if ((x - X0) % 6 === 0) w.box(x, G + 2, Z1, x, G + 3, Z1, B.beam); }
      for (const x of [DCX - 4, DCX + 4]) { w.box(x, G + 1, Z1, x, G + 5, Z1, B.beam); S(x, G + 6, Z1, B.lampW); }
      lights.push({ name: 'front', p: [DCX + 0.5, G + 6, Z1 + 0.5], c: '#ffd890', i: 0.3, d: 16, flicker: 0.1, srcR: 5 });
      for (let z = Z0 + 6; z <= Z1; z += 6) w.box(X0, TOP + 1, z, X0 + 4, TOP + 1, z, B.beam);
      acts.push(OR.goAct({ at: [DCX, G + 1, Z1 - 1], name: '밖으로 나가기', goto: 'hestia', hint: '트인 앞으로 나가 화덕의 저택 옆마당으로 돌아가요', hit: [DCX - 2, G + 1, Z1 - 1, DCX + 2, G + 5, Z1] }));

      // ── 화로(북쪽 벽): 돌 받침과 숯불, 갓과 굴뚝, 옆의 풀무 ──
      const FX = 24, FZ = Z0 + 3;
      w.box(FX - 4, G + 1, Z0 + 1, FX + 4, G + 3, Z0 + 5, B.chStone);
      w.box(FX - 3, G + 3, Z0 + 2, FX + 3, G + 3, Z0 + 4, B.coal);
      for (let x = FX - 2; x <= FX + 2; x++) for (let z = Z0 + 2; z <= Z0 + 4; z++) S(x, G + 3, z, hash3(x, 3, z) > 0.35 ? B.forge : B.ember);
      w.box(FX - 4, G + 7, Z0 + 1, FX + 4, G + 7, Z0 + 5, B.chStone2); w.box(FX - 3, G + 8, Z0 + 1, FX + 3, G + 8, Z0 + 4, B.chStone2); w.box(FX - 2, G + 9, Z0 + 1, FX + 2, G + 9, Z0 + 3, B.chStone2);
      for (const x of [FX - 4, FX + 4]) w.box(x, G + 4, Z0 + 5, x, G + 6, Z0 + 5, B.iron);
      w.box(FX - 1, G + 10, Z0 + 1, FX + 1, TOP + 6, Z0 + 2, B.chStone2);
      lights.push({ name: 'forge', p: [FX + 0.5, G + 5, FZ + 2.5], c: '#ff8a3a', i: 0.9, d: 24, flicker: 0.5, srcR: 3 });
      const bel = w.prop({ name: 'bellows', pivot: [FX + 6.5, G + 1, Z0 + 3.5] });
      bel.box(FX + 5, G + 1, Z0 + 2, FX + 8, G + 1, Z0 + 4, B.plank); bel.box(FX + 5, G + 2, Z0 + 2, FX + 8, G + 2, Z0 + 4, B.leather); bel.box(FX + 6, G + 3, Z0 + 2, FX + 8, G + 3, Z0 + 4, B.plank); bel.box(FX + 8, G + 4, Z0 + 3, FX + 9, G + 4, Z0 + 3, B.beam);
      S(FX + 5, G + 2, Z0 + 1, B.iron);
      acts.push({
        name: '풀무질', hint: '화로 옆 가죽 풀무를 눌러 바람을 넣자 숯불이 하얗게 달아오르고 굴뚝으로 불똥이 솟아요', hit: [FX + 5, G + 1, Z0 + 2, FX + 9, G + 4, Z0 + 4],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await a.tween('bellows', { scl: [1, 0.45, 1] }, 0.3);
            a.flash('forge', 4 + k, 1);
            a.burst([FX + 0.5, G + 4.5, Z0 + 3.5], { n: 18, colors: ['#ff8a3a', '#ffd060', '#ffffff'], speed: 2, up: 3, life: 0.8, gravity: -0.5, spread: 1.2 });
            a.burst([FX + 0.5, TOP + 7, Z0 + 2], { n: 8, colors: ['#ffb040', '#bcb8b0'], speed: 0.8, up: 3, life: 1.4, gravity: -0.3, spread: 0.6 });
            await a.tween('bellows', { scl: [1, 1, 1] }, 0.4);
          }
        },
      });

      // ── 모루와 망치(가운데) ──
      const AX = 32, AZ = 26;
      w.box(AX - 1, G + 1, AZ, AX + 1, G + 1, AZ, B.log); S(AX, G + 1, AZ - 1, B.log); S(AX, G + 1, AZ + 1, B.log);
      w.box(AX - 1, G + 2, AZ, AX + 1, G + 2, AZ, B.anvil); w.box(AX - 2, G + 3, AZ, AX + 2, G + 3, AZ, B.anvil); S(AX + 3, G + 3, AZ, B.anvil);
      S(AX - 1, G + 4, AZ, B.hot); S(AX, G + 4, AZ, B.hotY); S(AX + 1, G + 4, AZ, B.hot);
      const ham = w.prop({ name: 'hammer', pivot: [AX + 0.5, G + 4, AZ + 2.5], axis: 'x' });
      ham.box(AX, G + 4, AZ + 1, AX, G + 4, AZ + 3, B.beam); ham.box(AX, G + 4, AZ + 1, AX, G + 5, AZ + 1, B.anvil); ham.set(AX, G + 5, AZ + 1, B.anvil);
      lights.push({ name: 'anvil', p: [AX + 0.5, G + 5, AZ + 0.5], c: '#ffb050', i: 0.5, d: 14, flicker: 0.4, srcR: 2 });
      acts.push({
        name: '모루 내리치기', hint: '가운데 모루 위 달군 쇠를 망치로 땅땅 내리치자 불똥이 사방으로 튀어요', hit: [AX - 2, G + 1, AZ - 1, AX + 3, G + 5, AZ + 3],
        run: async a => {
          for (let k = 0; k < 6; k++) {
            await a.turn('hammer', [-1.2, 0, 0], 0.25);
            await a.turn('hammer', [0.15, 0, 0], 0.12);
            a.flash('anvil', 5, 0.4);
            a.burst([AX + 0.5, G + 5, AZ + 0.5], { n: 22, colors: ['#ffb040', '#ffe08a', '#ff6a1a', '#ffffff'], speed: 5, up: 3, life: 0.6, gravity: 8, spread: 0.6 });
          }
          await a.turn('hammer', [0, 0, 0], 0.3);
        },
      });
      // 마검 단조: 화로에서 붉게 달아오른 칼날이 떠올라 모루 위로
      const bl = w.prop({ name: 'blank', pivot: [FX + 0.5, G + 4, Z0 + 3.5] });
      bl.box(FX - 2, G + 4, Z0 + 3, FX + 1, G + 4, Z0 + 3, B.bladeO); bl.box(FX + 2, G + 4, Z0 + 3, FX + 3, G + 4, Z0 + 3, B.hilt);
      acts.push({
        name: '마검 단조', hint: '화로 속에서 달군 칼날이 붉게 빛나며 떠올라 모루 위로 날아가요. 크로조의 피가 마검을 깨워요', hit: [FX - 3, G + 3, Z0 + 2, FX + 3, G + 6, Z0 + 4],
        run: async a => {
          a.flash('forge', 6, 4); a.glow(1.4, 3);
          await a.path('blank', [[0, 3, 0], [4, 4, 5], [8, 2, 9], [8, 1, 9]], 2.2);
          for (let k = 0; k < 5; k++) { a.burst([AX + 0.5, G + 6, AZ + 0.5], { n: 20, colors: ['#ff6a1a', '#ffd060', '#d83a2a'], speed: 3, up: 2, life: 0.8, gravity: 4, spread: 0.8 }); await a.wait(0.3); }
          await a.path('blank', [[4, 4, 6], [0, 2, 0], [0, 0, 0]], 1.6);
        },
      });

      // ── 담금질 물통(동쪽) ──
      const QX0 = 37, QX1 = 42, QZ = 22;
      w.box(QX0, G + 1, QZ - 1, QX1, G + 2, QZ + 1, B.chStone);
      for (let x = QX0 + 1; x < QX1; x++) { S(x, G + 2, QZ, 0); S(x, G + 1, QZ, B.coal); w.liquid(x, QZ, G + 2); }
      const qb = w.prop({ name: 'quench', pivot: [QX0 + 3, G + 5, QZ + 0.5] });
      qb.box(QX0 + 1, G + 5, QZ, QX0 + 3, G + 5, QZ, B.bladeO); qb.box(QX0 + 4, G + 5, QZ, QX0 + 4, G + 5, QZ, B.hilt); qb.box(QX0 + 4, G + 6, QZ, QX0 + 4, G + 7, QZ, B.iron);
      S(QX0 + 4, G + 3, QZ - 1, B.iron); S(QX0 + 4, G + 4, QZ - 1, B.iron);
      acts.push({
        name: '담금질 김', hint: '붉게 달군 칼날을 물통에 푹 담그자 치익 소리와 함께 하얀 김이 뭉게뭉게 솟아요', hit: [QX0, G + 1, QZ - 1, QX1, G + 7, QZ + 1],
        run: async a => {
          await a.move('quench', [0, -3, 0], 0.4);
          for (let k = 0; k < 10; k++) { a.burst([QX0 + 2.5 + (k % 3), G + 3, QZ + 0.5], { n: 14, colors: ['#ffffff', '#e8eef4', '#d8dce0'], speed: 0.8, up: 4, life: 1.8, gravity: -0.6, spread: 1.2 }); await a.wait(0.25); }
          await a.move('quench', [0, 0, 0], 0.6);
        },
      });

      // ── 마검 진열장(서쪽 벽): 나무 틀, 붉은 마검 다섯, 유리 문 두 짝 ──
      const RZ0 = 22, RZ1 = 34;
      w.box(X0 + 1, G + 1, RZ0, X0 + 2, G + 1, RZ1, B.plank); w.box(X0 + 1, G + 9, RZ0, X0 + 2, G + 9, RZ1, B.plank);
      for (const z of [RZ0, RZ1]) w.box(X0 + 1, G + 2, z, X0 + 2, G + 8, z, B.plank);
      S(X0 + 1, G + 10, (RZ0 + RZ1) >> 1, B.gold);
      const swords = [RZ0 + 2, RZ0 + 4, RZ0 + 6, RZ0 + 8, RZ0 + 10];
      swords.forEach((z, k) => { if (k === 2) return; S(X0 + 1, G + 2, z, B.hilt); S(X0 + 1, G + 3, z, B.gold); w.box(X0 + 1, G + 4, z, X0 + 1, G + 7, z, k % 2 ? B.bladeR : B.blade); S(X0 + 1, G + 3, z - 1, B.gold); S(X0 + 1, G + 3, z + 1, B.gold); });
      const rL = w.prop({ name: 'rackL', pivot: [X0 + 3, G + 2, RZ0 + 0.5] }), rR = w.prop({ name: 'rackR', pivot: [X0 + 3, G + 2, RZ1 + 0.5] });
      for (let z = RZ0 + 1; z < RZ1; z++) for (let y = G + 2; y <= G + 8; y++) (z <= (RZ0 + RZ1) / 2 ? rL : rR).set(X0 + 3, y, z, (y === G + 2 || y === G + 8 || z === RZ0 + 1 || z === RZ1 - 1) ? B.plank : B.glass);
      lights.push({ name: 'rack', p: [X0 + 2, G + 6, (RZ0 + RZ1) / 2 + 0.5], c: '#ff6a4a', i: 0.45, d: 14, flicker: 0.3, srcR: 4 });
      acts.push({
        name: '진열대 열기', hint: '서쪽 벽 진열장의 유리 문이 열리며 잠들어 있던 크로조의 마검들이 붉게 빛나요', hit: [X0 + 1, G + 1, RZ0, X0 + 3, G + 9, RZ1],
        run: async a => {
          await Promise.all([a.turn('rackL', [0, 1.5, 0], 0.9), a.turn('rackR', [0, -1.5, 0], 0.9)]);
          a.flash('rack', 6, 4); a.glow(1.3, 3);
          for (const z of swords) { a.burst([X0 + 2, G + 6, z + 0.5], { n: 12, colors: ['#ff6a4a', '#ffd060', '#ffffff'], speed: 1.2, up: 2, life: 1, gravity: -0.4, spread: 0.6 }); await a.wait(0.2); }
          await a.wait(1.4);
          await Promise.all([a.turn('rackL', [0, 0, 0], 0.8), a.turn('rackR', [0, 0, 0], 0.8)]);
        },
      });
      // 마검 불꽃: 가운데 마검이 떠올라 휘두르자 불길이 작업장을 가로질러 앞마당 하늘로
      const ms = w.prop({ name: 'magicSword', pivot: [X0 + 4.5, G + 4, RZ0 + 6.5] });
      ms.set(X0 + 4, G + 2, RZ0 + 6, B.hilt); ms.set(X0 + 4, G + 3, RZ0 + 6, B.gold); ms.set(X0 + 4, G + 3, RZ0 + 5, B.gold); ms.set(X0 + 4, G + 3, RZ0 + 7, B.gold); ms.box(X0 + 4, G + 4, RZ0 + 6, X0 + 4, G + 8, RZ0 + 6, B.bladeR);
      w.box(X0 + 4, G + 1, RZ0 + 5, X0 + 4, G + 1, RZ0 + 7, B.plank);
      acts.push({
        name: '마검 불꽃', hint: '진열장 앞 붉은 마검이 떠올라 휘둘러지며 불길이 작업장을 가로질러 하늘로 치솟아요', hit: [X0 + 4, G + 1, RZ0 + 5, X0 + 5, G + 8, RZ0 + 7],
        run: async a => {
          await a.tween('magicSword', { off: [3, 3, 2], rot: [0, 0, -0.4] }, 0.6);
          await a.tween('magicSword', { off: [4, 3, 3], rot: [1.6, 0, -0.6] }, 0.3);
          a.flash('rack', 8, 2); a.glow(1.6, 2.5);
          for (let k = 0; k < 10; k++) { a.burst([X0 + 9 + k * 2.2, G + 6 + k * 0.8, RZ0 + 9 + k * 1.2], { n: 18, colors: ['#ff4a1a', '#ff9a3a', '#ffe08a'], speed: 2, up: 2, life: 0.9, gravity: -1, spread: 1.4 }); await a.wait(0.08); }
          await a.wait(0.8);
          await a.tween('magicSword', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.8);
        },
      });

      // ── 작업대(북동쪽): 망치·집게 걸이, 숫돌, 쇠 막대와 광석 상자, 숯 더미, 장작 ──
      w.box(36, G + 1, Z0 + 1, X1 - 2, G + 2, Z0 + 2, B.plank); w.box(36, G + 3, Z0 + 1, X1 - 2, G + 3, Z0 + 2, B.beam);
      S(37, G + 4, Z0 + 2, B.steel); S(38, G + 4, Z0 + 2, B.steel); S(41, G + 4, Z0 + 1, B.ingot); S(42, G + 4, Z0 + 1, B.ingot); S(45, G + 4, Z0 + 2, B.iron); S(46, G + 4, Z0 + 2, B.blade);
      for (let x = 36; x <= X1 - 2; x += 2) { S(x, G + 6, Z0 + 1, B.iron); S(x, G + 5, Z0 + 1, x % 4 ? B.anvil : B.beam); }
      const GX = 46, GZ = 22;
      w.box(GX - 1, G + 1, GZ, GX - 1, G + 3, GZ, B.beam); w.box(GX + 1, G + 1, GZ, GX + 1, G + 3, GZ, B.beam);
      const gw = w.prop({ name: 'grind', pivot: [GX + 0.5, G + 3.5, GZ + 0.5], axis: 'x' });
      for (let dz = -2; dz <= 2; dz++) for (let dy = -2; dy <= 2; dy++) if (Math.hypot(dz, dy) <= 2.3) gw.set(GX, G + 3 + dy, GZ + dz, Math.hypot(dz, dy) < 0.6 ? B.iron : B.wheel);
      for (const [x, z] of [[X1 - 2, Z0 + 16], [X1 - 2, Z0 + 18], [X1 - 4, Z0 + 16]]) { S(x, G + 1, z, B.crate); S(x, G + 2, z, (x + z) & 1 ? B.ore : B.oreB); }
      for (let x = X1 - 6; x <= X1 - 1; x++) for (let z = Z1 - 6; z <= Z1 - 2; z++) { const h = Math.round(2.4 - Math.hypot(x - (X1 - 3), z - (Z1 - 4)) * 0.8); if (h > 0) w.box(x, G + 1, z, x, G + h, z, B.coal); }
      for (let z = Z1 - 8; z <= Z1 - 2; z++) w.box(X0 + 1, G + 1, z, X0 + 2, G + 1 + ((z & 1) ? 2 : 1), z, B.log);
      S(AX + 3, G + 1, AZ + 3, B.log); S(AX - 3, G + 1, AZ - 2, B.barrel); S(AX - 3, G + 2, AZ - 2, B.iron);                 // 걸상 · 집게 꽂은 통
      w.box(43, G + 1, 31, 44, G + 2, 32, B.barrel); for (const [x, z, h] of [[43, 31, 6], [44, 32, 5], [43, 32, 7], [44, 31, 4]]) w.box(x, G + 3, z, x, G + h, z, h > 5 ? B.steel : B.beam);   // 창 꽂은 통
      for (let z = Z1 - 12; z <= Z1 - 10; z++) { S(X1 - 1, G + 1, z, B.plank); S(X1 - 1, G + 2, z, z & 1 ? B.ingot : B.steel); }
      w.box(X0 + 1, G + 4, Z0 + 2, X0 + 1, G + 4, Z0 + 6, B.beam); for (let z = Z0 + 2; z <= Z0 + 6; z += 2) { S(X0 + 1, G + 3, z, B.iron); S(X0 + 1, G + 2, z, z % 4 ? B.anvil : B.iron); }   // 벽걸이 집게
      w.box(X0 + 5, G + 1, Z1 - 3, X0 + 5, G + 2, Z1 - 3, B.barrel); w.box(X0 + 6, G + 1, Z1 - 2, X0 + 6, G + 2, Z1 - 2, B.barrel);
      acts.push({
        name: '숫돌 돌리기', hint: '작업대 옆 숫돌이 윙 돌아가며 칼날을 갈자 하얀 불티가 길게 흩어져요', hit: [GX - 1, G + 1, GZ - 2, GX + 1, G + 6, GZ + 2],
        run: async a => { const sp = a.spin('grind', 10, 3); for (let k = 0; k < 10; k++) { a.burst([GX + 0.5, G + 4, GZ + 2.5], { n: 10, colors: ['#ffffff', '#ffe08a', '#ffb040'], speed: 4, up: 1, life: 0.5, gravity: 6, spread: 0.3 }); await a.wait(0.28); } await sp; },
      });
      landmarks.push({ name: '화로', note: '웰프 크로조의 작업장', p: [FX + 0.5, TOP + 8, Z0 + 3] });
      return { lights, landmarks, acts };
    },
  });
})();
