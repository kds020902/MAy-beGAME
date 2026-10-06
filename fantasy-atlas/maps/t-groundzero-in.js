// 그라운드 제로 — TerraGroup 본관 로비(하위 지도). 지붕과 남·동쪽 벽을 걷어 낸 단면:
// 북쪽 세로 판재 벽의 거대한 빛나는 다이아몬드 로고와 무너진 천장 판, 검은·흰 사선 줄무늬 접수대, 보안 게이트 줄, 회전문,
// 서쪽 파란 육각 카펫 사무실(LABS 모니터)과 번호 문 복도의 LED 하늘 천장, 동쪽 계단과 회의실이 있는 메자닌, 엘리베이터 (112칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 112, D = 112, Hh = 64, PI = Math.PI;
  const FONT = { 3: '111001011001111', 4: '101101111001001' };
  const text = (t, s, x, y, z, dx, dz, b, sc) => {
    sc = sc || 1; let k = 0;
    for (const ch of s) {
      const g = FONT[ch];
      if (g) for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) if (g[r * 3 + c] === '1') for (let a = 0; a < sc; a++) for (let e = 0; e < sc; e++) t.set(x + dx * (k + c * sc + a), y + (4 - r) * sc + e, z + dz * (k + c * sc + a), b);
      k += 4 * sc;
    }
  };
  // TerraGroup 다이아몬드: 위쪽 세로선, 왼쪽 가로선, 오른쪽 아래 사선이 갈라진 마름모
  const logo = (t, cx, cy, cz, R, axis, bOn, bLine) => {
    for (let dy = -R; dy <= R; dy++) for (let du = -R; du <= R; du++) {
      const d = Math.abs(du) + Math.abs(dy); if (d > R) continue;
      const line = d < R && ((du === 0 && dy > 0) || (dy === 0 && du < 0) || (du === -dy && du > 0));
      if (axis === 'z') t.set(cx, cy + dy, cz + du, line ? bLine : bOn); else t.set(cx + du, cy + dy, cz, line ? bLine : bOn);
    }
  };
  MAPS.push({
    id: 'groundzero-in', cat: 'tarkov', sub: true, parent: 'groundzero', name: 'TerraGroup 로비', en: 'Ground Zero · TerraGroup Lobby', color: '#6a8aa0', seed: 652, base: 8, time: 'day', size: [W, D, Hh],
    desc: 'TerraGroup 본관 1층. 세로 판재 벽에 거대한 다이아몬드 로고가 하얗게 빛나고, 그 앞으로 천장 판이 비스듬히 무너져 내렸다. 회전문을 지나면 보안 게이트와 사선 줄무늬 접수대, 서쪽에는 파란 육각 카펫 사무실과 LED 하늘 천장 아래 번호 문 복도, 동쪽에는 계단으로 오르는 회의실 메자닌이 있다.',
    info: { title: '장소 정보', en: 'TERRAGROUP HQ · LOBBY', rows: [['층', '본관 1층 로비 · 메자닌'], ['명물', '빛나는 다이아몬드 로고 · 무너진 천장 · 줄무늬 접수대'], ['임무', '두더지 구하기(과학자 사무실 하드 드라이브)'], ['밖으로', '회전문 옆 이정표를 누르면 정문 앞 광장으로 나가요']] },
    sky: ['#b8c0c6', '#5e6a76', '#dcd4c4'], stars: false,
    hemi: ['#c8ccd4', '#2a2a2c', 0.5], sun: ['#e8e2d6', 0.5, [0.5, 1, 0.7]],
    night: { sky: ['#1e2228', '#07090c', '#4a3a30'], stars: false, hemi: ['#7a86a0', '#121214', 0.32], sun: ['#a8b4c8', 0.2, [0.5, 1, 0.7]], haze: '#1e2226' },
    fog: { box: [56, 56, 66, 66], start: 0.94, floor: 2, depth: 6, haze: [20, 0.1, 10], hazeColor: '#9aa0a4' },
    camY: -12, zoom: 1.2,
    particles: [
      { n: 120, colors: ['#e8e4d8', '#c8c4b8', '#ffffff'], mode: 'drift', speed: 0.15, wind: 0.2, area: [56, 30, 26], y0: 10, y1: 34, glow: false },
      { n: 40, colors: ['#c8c4b8', '#a8a49a'], mode: 'fall', speed: 0.2, area: [56, 18, 10], y0: 12, y1: 34, glow: false },
    ],
    blocks: {
      soil: { c: '#3a3634', v: 0.06 }, floorD: { c: '#44484c', top: '#4e5256', v: 0.04, pat: 'big' }, floorL: { c: '#6a6e70', top: '#7a7e80', v: 0.03 }, plaza: { c: '#a09c92', top: '#b4b0a6', v: 0.04, pat: 'check', alt: '#aaa69c' },
      hexB: { c: '#3a6aa8', top: '#3e74b4', v: 0.03 }, hexL: { c: '#a8c4dc', top: '#b8d0e4', v: 0.02 },
      wallG: { c: '#5a5e62', v: 0.05, pat: 'big' }, wallD: { c: '#2e3236', v: 0.04 }, concS: { c: '#8a8c8a', v: 0.06, pat: 'stone' }, rubble: { c: '#b8b6b0', v: 0.08, pat: 'stone' }, rubbleD: { c: '#7a7a76', v: 0.08 },
      slatA: { c: '#b8ac94', v: 0.03 }, slatB: { c: '#8e8470', v: 0.03 }, logoW: { c: '#f4fbff', glow: true }, logoL: { c: '#2a2e32', v: 0.02 },
      col: { c: '#2a2c30', v: 0.03 }, glass: { c: '#9ec4d4', v: 0.02 }, glassK: { c: '#22303a', v: 0.02 }, mull: { c: '#5a6066', v: 0.02 }, steel: { c: '#8a9094', v: 0.03 }, iron: { c: '#26282c', v: 0.03 }, rust: { c: '#7a4a2e', v: 0.08 },
      hzK: { c: '#1a1a1c', v: 0.02 }, hzW: { c: '#e8e8e2', v: 0.02 }, counter: { c: '#d8d6ce', v: 0.02 },
      ledR: { c: '#ff3a2a', glow: true }, ledG: { c: '#3aff6a', glow: true }, scr: { c: '#9a6aff', glow: true }, scrB: { c: '#7ac8ff', glow: true }, mon: { c: '#16181a', v: 0.02 },
      skyP: { c: '#9a5ae8', glow: true }, skyB: { c: '#4a7af0', glow: true }, skyW: { c: '#e8ecff', glow: true }, lampW: { c: '#fff0d0', glow: true },
      desk: { c: '#5a4636', top: '#6a5444', v: 0.04 }, teal: { c: '#4a9aa8', v: 0.03 }, chair: { c: '#2a2c30', v: 0.03 }, cabW: { c: '#dcdcd6', v: 0.02 }, sofa: { c: '#c8c6c0', v: 0.03 }, sofaD: { c: '#4a4c50', v: 0.03 },
      doorW: { c: '#e8e8e4', v: 0.02 }, digit: { c: '#f0f0ec', v: 0.01 }, bottle: { c: '#7ab0d8', v: 0.03 }, pot: { c: '#3a3a3c', v: 0.03 }, leaf: { c: '#4a7a34', top: '#5e9040', v: 0.1 }, leaf2: { c: '#6a9a3a', v: 0.1 },
      box: { c: '#a88a5a', v: 0.05 }, paper: { c: '#e4e0d4', v: 0.03 }, hdd: { c: '#3a7ad0', v: 0.02 }, wood: { c: '#3a2a22', top: '#4a362a', v: 0.03 },
      // 이정표(OR.signpost)용
      stoneG: { c: '#6a6c6c', v: 0.04 }, timber: { c: '#4a4e52', v: 0.03 }, door: { c: '#2a7a4a', v: 0.03 }, gold: { c: '#f2f4f0', v: 0.02 }, mlamp: { c: '#fff0c0', glow: true },
    },
    build(w) {
      const B = w.id, G = w.base;
      MH.terrain(w, { floor: G - 4, height: () => G, surface: () => B.plaza, under: (x, z, y, dep) => dep < 2 ? B.floorD : B.soil });
      const lights = [], acts = [], landmarks = [];
      const X0 = 6, X1 = 106, Z0 = 8, Z1 = 100, TOP = G + 24;
      const OX = 34;                                    // 서쪽 사무실 경계(유리)
      const hexOn = (x, z) => { const r = z >> 2, c = (x + (r & 1) * 2) >> 2; return hash3(c, r, 5); };
      // ── 바닥: 어두운 광택 돌, 테두리 띠, 서쪽 사무실 육각 카펫 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        let b = (x === X0 + 2 || x === X1 - 2 || z === Z1 - 2) ? B.floorL : B.floorD;
        if (x < OX && z > 42) { const h = hexOn(x, z); b = h > 0.55 ? B.hexB : h > 0.47 ? B.hexL : B.floorD; }
        w.set(x, G, z, b);
      }
      // ── 벽: 북·서쪽은 높게, 남·동쪽은 낮은 단면(유리) ──
      for (let y = G + 1; y <= TOP; y++) {
        for (let x = X0; x <= X1; x++) w.set(x, y, Z0, B.wallG);
        for (let z = Z0; z <= Z1; z++) w.set(X0, y, z, (y > G + 12 && y < G + 20 && z % 6 !== 0) ? B.glassK : B.wallG);
      }
      for (let x = X0; x <= X1; x++) { w.set(x, G + 1, Z1, B.wallD); w.set(x, G + 2, Z1, x % 4 === 0 ? B.mull : B.glass); }
      for (let z = Z0; z <= Z1; z++) { w.set(X1, G + 1, z, B.wallD); w.set(X1, G + 2, z, z % 4 === 0 ? B.mull : B.glass); }
      w.box(X0, TOP + 1, Z0, X1, TOP + 1, Z0, B.wallD); w.box(X0, TOP + 1, Z0, X0, TOP + 1, Z1, B.wallD);
      // 바깥 앞마당(남쪽 계단 띠)
      for (let x = 0; x < W; x++) for (let z = Z1 + 1; z < D; z++) w.set(x, G, z, B.plaza);

      // ── 북쪽 아트리움 벽: 세로 판재, 거대한 다이아몬드 로고(빛남) ──
      const LX = 58, LY = G + 14;
      for (let y = G + 1; y <= TOP; y++) for (let x = 36; x <= 80; x++) w.set(x, y, Z0 + 1, x % 2 ? B.slatA : B.slatB);
      logo(w, LX, LY, Z0 + 2, 9, 'x', B.logoW, B.logoL);
      lights.push({ name: 'logo', p: [LX + 0.5, LY, Z0 + 5], c: '#e8f6ff', i: 0.7, d: 40, flicker: 0.04, srcR: 7 });
      landmarks.push({ name: '다이아몬드 로고 벽', note: '로비 북쪽 세로 판재 벽 · 하얗게 빛남', p: [LX, TOP + 6, Z0 + 2], boss: true });
      acts.push({
        name: '로고 점등', hint: '판재 벽의 거대한 TerraGroup 다이아몬드 로고가 깜빡이다 눈부시게 밝아져요', hit: [LX - 9, LY - 9, Z0 + 1, LX + 9, LY + 9, Z0 + 3],
        run: async a => {
          for (let k = 0; k < 3; k++) { a.flash('logo', 0.1, 0.15); await a.wait(0.25); }
          a.flash('logo', 3, 3.5); a.glow(2, 3.5);
          for (let k = 0; k < 12; k++) { const t = k / 12 * PI * 2; a.burst([LX + 0.5 + Math.cos(t) * 8, LY + Math.sin(t) * 8, Z0 + 3], { n: 8, colors: ['#ffffff', '#e4f6ff'], speed: 1, up: 0.5, life: 0.8, gravity: 0, spread: 0.6 }); }
          await a.wait(3.5);
        },
      });
      // 무너진 천장: 위에서 비스듬히 내려앉은 콘크리트 판들(하나는 부품), 철근, 잔해 더미
      const slab = (t, x0, x1, z0, len, y0, dy, b) => { for (let k = 0; k < len; k++) { const y = Math.round(y0 - k * dy), yp = k ? Math.round(y0 - (k - 1) * dy) : y, z = z0 + k; for (let x = x0; x <= x1; x++) for (let yy = y; yy <= yp; yy++) t.set(x, yy, z, (x === x0 || x === x1) && k % 3 === 0 && yy === y ? B.rust : b); } };
      slab(w, 38, 46, Z0 + 2, 9, TOP, 2, B.concS); slab(w, 74, 79, Z0 + 2, 6, TOP, 1.6, B.concS);
      const fall = w.prop({ name: 'cslab', pivot: [69, TOP, Z0 + 2] });
      slab(fall, 66, 72, Z0 + 3, 8, TOP, 1.1, B.concS);
      for (let x = 36; x <= 80; x += 3) if (x < 65 || x > 73) w.box(x, TOP, Z0 + 2, x, TOP, Z0 + 4, B.iron);
      w.ellipsoid(46, G, 18, 10, 4.5, 6, B.rubble, (dx, dy, dz) => dy >= 0 && hash3(dx, dy, dz) > 0.08);
      for (let i = 0; i < 50; i++) { const x = w.ri(36, 72), z = w.ri(12, 30); const y = w.top(x, z) + 1; if (y > G && y < G + 6) w.set(x, y, z, w.pick([B.rubble, B.rubbleD, B.concS, B.paper])); }
      landmarks.push({ name: '무너진 천장', note: '로고 앞으로 내려앉은 천장 판과 잔해', p: [46, G + 16, 18] });
      acts.push({
        name: '천장 붕괴', hint: '아트리움 천장에 매달려 있던 콘크리트 판이 끊어져 잔해 위로 떨어지며 먼지가 일어요', hit: [66, G + 15, Z0 + 3, 72, TOP, Z0 + 10],
        run: async a => {
          a.burst([69, TOP, Z0 + 3], { n: 30, colors: ['#c8c4b8', '#a8a49a'], speed: 2, up: 0, life: 1, gravity: 6, spread: 3 });
          await a.tween('cslab', { rot: [0.25, 0, 0.05] }, 0.4);
          await a.tween('cslab', { off: [0, -(TOP - G - 9), 6], rot: [0.9, 0, 0.1] }, 0.7, t => t * t);
          a.lightning(0.2);
          a.burst([69, G + 2, Z0 + 14], { n: 80, colors: ['#d8d4c8', '#b8b4a8', '#8a8680'], speed: 7, up: 3, life: 1.6, gravity: 2, spread: 5, flat: true });
          a.burst([69, G + 3, Z0 + 14], { n: 40, colors: ['#c8c4b8', '#e8e4d8'], speed: 2, up: 4, life: 3, gravity: -0.3, spread: 4 });
          await a.wait(2);
          await a.respawn('cslab', 1.0);
        },
      });
      // 아트리움 기둥
      for (const x of [38, 78]) for (const z of [36, 66, 90]) w.box(x, G + 1, z, x + 1, TOP, z + 1, B.col);

      // ── 접수대: 검은·흰 사선 줄무늬 앞판, 흰 상판, 모니터 ──
      const RX0 = 46, RX1 = 70, RZ0 = 54, RZ1 = 57;
      w.box(RX0, G + 1, RZ0, RX1, G + 3, RZ1, B.wallD);
      for (let x = RX0; x <= RX1; x++) for (let y = G + 1; y <= G + 3; y++) { w.set(x, y, RZ1, ((x + y) >> 1) % 2 ? B.hzK : B.hzW); }
      for (let z = RZ0; z <= RZ1; z++) for (let y = G + 1; y <= G + 3; y++) for (const x of [RX0, RX1]) w.set(x, y, z, ((z + y) >> 1) % 2 ? B.hzK : B.hzW);
      w.box(RX0, G + 4, RZ0, RX1, G + 4, RZ1 + 1, B.counter);
      for (const x of [50, 58, 66]) { w.set(x, G + 5, RZ0 + 1, B.mon); w.set(x + 1, G + 5, RZ0 + 1, B.mon); w.set(x, G + 6, RZ0 + 1, B.scrB); w.set(x + 1, G + 6, RZ0 + 1, B.mon); }
      for (const x of [51, 59, 67]) { w.set(x, G + 1, RZ0 - 2, B.chair); w.set(x, G + 2, RZ0 - 3, B.chair); }
      lights.push({ name: 'desk', p: [58.5, G + 7, RZ0 + 1], c: '#ffe8c8', i: 0.35, d: 18, flicker: 0.1, srcR: 3 });
      landmarks.push({ name: '사선 줄무늬 접수대', note: '로비 한가운데 안내 데스크', p: [58, G + 10, 56] });
      // 철망 카트와 상자, 종이
      w.walls(52, G + 1, 62, 54, G + 2, 64, B.steel); w.box(52, G + 1, 62, 54, G + 1, 64, B.box);
      for (const [x, z] of [[62, 62], [63, 62], [62, 63], [44, 48]]) w.set(x, G + 1, z, B.box); w.set(62, G + 2, 62, B.box);
      for (let i = 0; i < 28; i++) { const x = w.ri(36, 100), z = w.ri(30, 98); if (!w.get(x, G + 1, z)) w.set(x, G + 1, z, w.pick([B.paper, B.paper, B.box, B.rubbleD])); }

      // ── 보안 게이트: 철제 함 사이 유리 날개(부품), 상태등, 양옆 유리 칸막이 ──
      const GZ = 76, GXS = [44, 50, 56, 62, 68];
      for (const gx of GXS) { w.box(gx, G + 1, GZ - 2, gx, G + 3, GZ + 2, B.steel); w.box(gx, G + 4, GZ - 2, gx, G + 4, GZ + 2, B.iron); w.set(gx, G + 4, GZ + 2, B.ledR); w.set(gx, G + 4, GZ - 2, B.ledR); }
      for (let x = 40; x < 44; x++) w.box(x, G + 1, GZ, x, G + 3, GZ, x === 40 ? B.mull : B.glass);
      for (let x = 69; x <= 76; x++) w.box(x, G + 1, GZ, x, G + 3, GZ, x === 76 ? B.mull : B.glass);
      GXS.slice(0, 4).forEach((gx, k) => { const f = w.prop({ name: 'flap' + k, pivot: [gx + 1, G + 2, GZ + 0.5] }); f.box(gx + 1, G + 2, GZ, gx + 4, G + 3, GZ, B.glass); });
      lights.push({ name: 'gate', p: [56.5, G + 6, GZ + 0.5], c: '#ff4a3a', i: 0.25, d: 20, flicker: 0.1, srcR: 13 });
      landmarks.push({ name: '보안 게이트', note: '사원증 출입 게이트 줄', p: [56, G + 9, GZ] });
      acts.push({
        name: '보안 게이트', hint: '출입 게이트 상태등이 초록으로 바뀌며 유리 날개가 일제히 열려요', hit: [44, G + 1, GZ - 2, 68, G + 4, GZ + 2],
        run: async a => {
          for (const gx of GXS) a.burst([gx + 0.5, G + 5, GZ + 0.5], { n: 12, colors: ['#3aff6a', '#aaffc0'], speed: 1.5, up: 1, life: 0.8, gravity: 0, spread: 0.6 });
          a.flash('gate', 4, 4);
          await Promise.all([0, 1, 2, 3].map(k => a.turn('flap' + k, [0, -PI / 2, 0], 0.7)));
          await a.wait(2.4);
          await Promise.all([0, 1, 2, 3].map(k => a.turn('flap' + k, [0, 0, 0], 0.7)));
        },
      });
      // 경비 데스크(게이트 동쪽): CCTV 화면 벽
      w.box(70, G + 1, 82, 76, G + 3, 84, B.wallD); w.box(70, G + 4, 82, 76, G + 4, 84, B.counter);
      for (let x = 70; x <= 76; x++) for (let y = G + 5; y <= G + 7; y++) w.set(x, y, 82, (x + y) % 3 === 0 ? B.mon : B.scrB);

      // ── 남쪽 정문: 회전문(부품 날개), 이정표 ──
      const DX = 58, DZ = Z1;
      for (let a = 0; a < 24; a++) { const t = a / 24 * PI * 2, x = Math.round(DX + Math.cos(t) * 4), z = Math.round(DZ + Math.sin(t) * 4); if (Math.abs(Math.cos(t)) < 0.5) continue; w.box(x, G + 1, z, x, G + 5, z, B.glass); }
      w.ring(DX, DZ, G + 6, 3.4, 4.6, B.steel);
      for (let z = DZ - 3; z <= DZ + 3; z++) for (let x = DX - 3; x <= DX + 3; x++) if (z === DZ) { w.set(x, G + 1, z, 0); w.set(x, G + 2, z, 0); }
      const rev = w.prop({ name: 'rev', pivot: [DX + 0.5, G + 1, DZ + 0.5] });
      rev.box(DX - 3, G + 1, DZ, DX + 3, G + 5, DZ, B.glass); rev.box(DX, G + 1, DZ - 3, DX, G + 5, DZ + 3, B.glass); rev.box(DX, G + 1, DZ, DX, G + 5, DZ, B.steel);
      acts.push({
        name: '회전문', hint: '정문 회전문의 유리 날개가 빙글빙글 돌아가요', hit: [DX - 3, G + 1, DZ - 3, DX + 3, G + 5, DZ + 3],
        run: async a => { a.burst([DX + 0.5, G + 2, DZ + 4], { n: 20, colors: ['#c8c8c4', '#e8e8e4'], speed: 3, up: 0.5, life: 1, gravity: 0, spread: 2, flat: true }); await a.turn('rev', [0, PI * 2, 0], 3, t => t); a.unwind('rev'); },
      });
      const sp = OR.signpost(w, B, DX + 8, Z1 + 4, { dir: [0, 1], boards: 1, h: 6 });
      acts.push(OR.goAct({ at: sp, name: '광장으로 나가기', goto: 'groundzero', hint: '회전문을 나가 격자 캐노피 아래 TerraGroup 본관 정문 앞 광장으로 돌아가요' }));

      // ── 서쪽 복도: 번호 문 3·4, 물통, 화분 상자, LED 하늘 천장 ──
      for (let x = X0 + 1; x <= OX; x++) { w.set(x, G + 1, 40, B.wallD); if (x < 16 || x > 20) w.set(x, G + 2, 40, x % 4 === 0 ? B.mull : B.glass); }   // 복도와 사무실 사이 낮은 유리 칸막이(문틈)
      for (const [x, n] of [[11, '3'], [25, '4']]) { w.box(x, G + 1, Z0 + 1, x + 2, G + 5, Z0 + 1, B.doorW); w.set(x + 2, G + 3, Z0 + 2, B.steel); text(w, n, x + 4, G + 5, Z0 + 1, 1, 0, B.digit); w.box(x - 2, G + 3, Z0 + 1, x - 2, G + 4, Z0 + 1, B.steel); }
      for (const [x, z, h] of [[21, 10, 2], [22, 10, 1], [21, 11, 1], [23, 11, 2]]) w.box(x, G + 1, z, x, G + h, z, B.bottle);
      w.box(28, G + 1, 10, 33, G + 2, 12, B.wallD); for (const x of [29, 31, 33]) MH.leafBlob(w, x, G + 4, 11, 1.4, 1.2, 1.4, [B.leaf, B.leaf2]);
      const LZ0 = Z0 + 3, LZ1 = Z0 + 8, LYc = G + 11;
      for (let z = LZ0 - 1; z <= LZ1 + 1; z++) for (let x = X0 + 1; x <= OX; x++) {
        const edge = z === LZ0 - 1 || z === LZ1 + 1 || x === X0 + 1 || x === OX, n = w.noise.fbm(x * 0.12, z * 0.5, 2);
        w.set(x, LYc, z, edge ? B.wallD : (n > 0.56 ? B.skyW : n > 0.46 ? B.skyP : B.skyB));
      }
      lights.push({ name: 'sky', p: [20, LYc - 1, Z0 + 4.5], c: '#9a7aff', i: 0.5, d: 22, flicker: 0.15, srcR: 4 });
      landmarks.push({ name: 'LED 하늘 천장 복도', note: '번호 문 3 · 4와 물통', p: [20, G + 16, Z0 + 4] });
      acts.push({
        name: 'LED 하늘 천장', hint: '복도 천장의 LED 하늘 화면이 지지직 깜빡이며 보라·파랑 빛이 쏟아져요', hit: [X0 + 1, LYc, LZ0 - 1, OX, LYc, LZ1 + 1],
        run: async a => {
          for (let k = 0; k < 10; k++) {
            a.flash('sky', k % 2 ? 0.2 : 3, 0.2);
            a.burst([10 + k * 2.4, LYc - 0.5, Z0 + 4.5], { n: 12, colors: ['#9a5ae8', '#4a7af0', '#e8ecff'], speed: 1.5, up: -1, life: 1, gravity: 1, spread: 1.2 });
            await a.wait(0.22);
          }
          a.flash('sky', 2.5, 2); await a.wait(2);
        },
      });

      // ── 서쪽 사무실: 파란 육각 카펫 위 책상 줄, 청록 칸막이, LABS 모니터, 흰 수납장, 화분 ──
      for (let x = X0 + 1; x <= OX; x++) { w.set(x, G + 1, 41, 0); }
      for (let z = 42; z <= Z1 - 1; z++) { w.set(OX, G + 1, z, B.mull); if (!(z >= 60 && z <= 63)) { w.set(OX, G + 2, z, z % 5 === 0 ? B.mull : B.glass); w.set(OX, G + 3, z, z % 5 === 0 ? B.mull : B.glass); } else w.set(OX, G + 1, z, 0); }
      for (const z of [50, 64, 78]) for (const [x0, x1] of [[9, 18], [22, 31]]) {
        w.box(x0, G + 2, z, x1, G + 2, z + 1, B.desk); w.set(x0, G + 1, z, B.iron); w.set(x1, G + 1, z + 1, B.iron);
        w.box(x0, G + 3, z + 2, x1, G + 4, z + 2, B.teal); w.box(x0, G + 1, z + 2, x1, G + 2, z + 2, B.teal);
        for (let x = x0 + 1; x < x1; x += 4) { w.set(x, G + 3, z + 1, B.mon); w.set(x + 1, G + 3, z + 1, hash3(x, z, 3) > 0.5 ? B.scr : B.scrB); w.set(x + 1, G + 1, z - 1, B.chair); w.set(x + 1, G + 2, z - 2, B.chair); }
      }
      for (const [x, z] of [[8, 92], [8, 86], [30, 92]]) { w.box(x, G + 1, z, x + 1, G + 3, z + 1, B.cabW); }
      for (const [x, z] of [[33, 44], [9, 44], [20, 72], [32, 86]]) { w.box(x, G + 1, z, x, G + 2, z, B.pot); MH.leafBlob(w, x, G + 4, z, 1.6, 1.8, 1.6, [B.leaf, B.leaf2]); }
      // 과학자 책상(두더지 구하기): 큰 LABS 화면, 하드 드라이브(부품)
      const SX = 14, SZ = 90;
      w.box(SX - 3, G + 2, SZ, SX + 4, G + 2, SZ + 2, B.desk); w.set(SX - 3, G + 1, SZ, B.iron); w.set(SX + 4, G + 1, SZ + 2, B.iron);
      w.box(SX - 1, G + 3, SZ + 2, SX + 2, G + 5, SZ + 2, B.mon); w.box(SX, G + 4, SZ + 2, SX + 1, G + 5, SZ + 2, B.scr); w.set(SX + 3, G + 3, SZ + 2, B.scrB); w.set(SX - 2, G + 3, SZ + 1, B.paper);
      w.set(SX + 1, G + 1, SZ - 1, B.chair); w.set(SX + 1, G + 2, SZ - 2, B.chair);
      const hdd = w.prop({ name: 'hdd', pivot: [SX + 3.5, G + 3, SZ + 0.5] }); hdd.set(SX + 3, G + 3, SZ, B.hdd);
      lights.push({ name: 'labs', p: [SX + 1, G + 5, SZ + 1], c: '#9a7aff', i: 0.35, d: 14, flicker: 0.2, srcR: 3 });
      landmarks.push({ name: '과학자 사무실', note: '두더지 구하기 · 하드 드라이브 책상', p: [20, G + 10, 70] });
      acts.push({
        name: '두더지의 하드 드라이브', hint: '과학자 책상의 LABS 화면이 번쩍이고 숨겨 둔 하드 드라이브가 떠올라 반짝여요', hit: [SX - 3, G + 2, SZ, SX + 4, G + 5, SZ + 2],
        run: async a => {
          a.flash('labs', 4, 3.5);
          a.burst([SX + 1, G + 5, SZ + 1.5], { n: 30, colors: ['#9a6aff', '#7ac8ff', '#ffffff'], speed: 3, up: 1, life: 0.8, gravity: 0, spread: 1 });
          await a.move('hdd', [0, 3, 0], 0.8);
          for (let k = 0; k < 4; k++) { a.burst([SX + 3.5, G + 6.5, SZ + 0.5], { n: 12, colors: ['#3a7ad0', '#aad0ff', '#ffffff'], speed: 2, up: 1, life: 0.6, gravity: 0, spread: 0.5 }); await a.turn('hdd', [0, (k + 1) * PI / 2, 0], 0.35); }
          a.unwind('hdd');
          await a.move('hdd', [0, 0, 0], 0.7);
        },
      });

      // ── 동쪽: 엘리베이터 코어, 계단, 메자닌(회의실과 라운지) ──
      const MY = G + 10, MX0 = 82, MZ1 = 50;
      w.box(86, G + 1, 44, X1 - 1, MY - 1, MZ1, B.wallG);
      const els = [88, 94, 100];
      els.forEach((ex, k) => {
        w.box(ex - 1, G + 1, MZ1, ex + 3, G + 6, MZ1, B.steel); w.box(ex, G + 1, MZ1 - 4, ex + 2, G + 5, MZ1, 0);
        w.box(ex, G, MZ1 - 4, ex + 2, G, MZ1 - 1, B.floorL); w.set(ex + 1, G + 5, MZ1 - 4, B.lampW); w.set(ex + 3, G + 6, MZ1 + 1, B.ledG);
        const d = w.prop({ name: 'el' + k, pivot: [ex + 1.5, G + 1, MZ1 + 1.5] }); d.box(ex, G + 1, MZ1 + 1, ex + 2, G + 5, MZ1 + 1, B.steel); d.box(ex + 1, G + 1, MZ1 + 1, ex + 1, G + 5, MZ1 + 1, B.mull);
      });
      lights.push({ name: 'elev', p: [95.5, G + 4, MZ1 - 2], c: '#fff0d0', i: 0.08, d: 14, flicker: 0.1, srcR: 3 });
      acts.push({
        name: '엘리베이터', hint: '띵 소리와 함께 엘리베이터 문이 옆으로 미끄러져 열리고 불 켜진 칸이 보여요', hit: [87, G + 1, MZ1, 104, G + 6, MZ1 + 1],
        run: async a => {
          a.burst([95.5, G + 7, MZ1 + 1], { n: 16, colors: ['#3aff6a', '#ffffff'], speed: 2, up: 1, life: 0.6, gravity: 0, spread: 1 });
          a.flash('elev', 12, 4);
          await Promise.all([0, 1, 2].map(k => a.move('el' + k, [3, 0, 0], 0.9)));
          await a.wait(2.4);
          await Promise.all([0, 1, 2].map(k => a.move('el' + k, [0, 0, 0], 0.9)));
        },
      });
      // 메자닌 바닥, 유리 난간
      w.box(MX0, MY, Z0 + 1, X1 - 1, MY, MZ1, B.floorL);
      w.box(MX0, MY, MZ1 + 1, MX0 + 3, MY, MZ1 + 2, B.floorL);
      for (let z = Z0 + 1; z <= MZ1 + 2; z++) { if (z > MZ1 && z <= MZ1 + 2) continue; w.set(MX0, MY + 1, z, z % 4 === 0 ? B.mull : B.glass); w.set(MX0, MY + 2, z, B.steel); }
      for (let x = MX0 + 4; x <= X1 - 1; x++) { w.set(x, MY + 1, MZ1, x % 4 === 0 ? B.mull : B.glass); w.set(x, MY + 2, MZ1, B.steel); }
      for (let x = MX0; x <= X1 - 1; x++) w.set(x, MY - 1, MZ1, B.wallD);
      for (const z of [20, 36]) w.box(MX0, G + 1, z, MX0 + 1, MY - 1, z + 1, B.col);
      // 계단: 남쪽에서 북쪽으로 올라 메자닌 끝에 닿는다
      for (let s = 0; s < 10; s++) { const z = MZ1 + 12 - s; w.box(MX0, G + 1, z, MX0 + 3, G + 1 + s, z, B.floorL); w.set(MX0 - 1, G + 2 + s, z, B.glass); w.set(MX0 - 1, G + 3 + s, z, B.steel); }
      // 회의실: 유리벽, 다이아몬드 로고 벽, 타원 탁자, 의자
      const CX0 = 88, CX1 = 104, CZ0 = Z0 + 1, CZ1 = 26;
      for (let x = CX0; x <= CX1; x++) for (let y = MY + 1; y <= MY + 5; y++) w.set(x, y, CZ1, x % 4 === 0 ? B.mull : B.glass);
      for (let z = CZ0; z <= CZ1; z++) for (let y = MY + 1; y <= MY + 5; y++) w.set(CX0, y, z, z % 4 === 0 ? B.mull : B.glass);
      for (let x = CX0; x <= CX1; x++) for (let y = MY + 1; y <= TOP; y++) w.set(x, y, Z0 + 1, B.wallD);
      logo(w, 96, MY + 6, Z0 + 2, 3, 'x', B.steel, B.wallD);
      for (let z = 13; z <= 21; z++) for (let x = 91; x <= 101; x++) if (((x - 96) / 5.5) ** 2 + ((z - 17) / 4) ** 2 <= 1) w.set(x, MY + 2, z, B.wood);
      for (const [x, z] of [[93, 12], [97, 12], [93, 22], [97, 22], [101, 14], [101, 20], [90, 17]]) w.box(x, MY + 1, z, x, MY + 2, z, B.sofaD);
      w.set(96, MY + 1, 17, B.iron); w.set(96, MY + 6, 17, B.lampW); w.set(96, MY + 7, 17, B.iron);
      lights.push({ name: 'meet', p: [96, MY + 4, 17], c: '#dce8ff', i: 0.25, d: 16, flicker: 0.1, srcR: 3 });
      // 라운지: 흰 소파, 낮은 탁자, 화분
      for (const [x, z] of [[88, 32], [96, 32]]) { w.box(x, MY + 1, z, x + 5, MY + 1, z + 2, B.sofa); w.box(x, MY + 2, z, x + 5, MY + 2, z, B.sofa); }
      w.box(91, MY + 1, 40, 97, MY + 1, 42, B.wood); for (const [x, z] of [[86, 46], [103, 30]]) { w.box(x, MY + 1, z, x, MY + 2, z, B.pot); MH.leafBlob(w, x, MY + 4, z, 1.5, 1.6, 1.5, [B.leaf, B.leaf2]); }
      landmarks.push({ name: '메자닌 회의실', note: '계단 위 유리 회의실과 라운지', p: [96, TOP + 4, 24] });
      return { lights, landmarks, acts };
    },
  });
})();
