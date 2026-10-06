// 대천문대 둥근 홀(하위 지도) — 천문대 언덕 정상, 대망원경을 받치는 원형 건물의 속. 바닥에 박힌 별 지도와 가운데 망원경 받침 기둥,
// 북서쪽 벽을 따라 도는 별 지도 회랑(2층), 동쪽 곡선 계단, 천체 모형, 관측 일지 책상, 운석 받침, 천장 덮개. 남동쪽(시점 쪽) 벽은 낮게 잘랐다 (천문대 언덕의 하위 지도)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 64, D = 64, Hh = 48, G = 10;
  const CX = 32, CZ = 32, RI = 15.5, RO = 17.5;               // 홀 가운데, 안쪽·바깥 벽 반지름
  MAPS.push({
    id: 'stellaris-observatory', cat: 'magic', sub: true, parent: 'stellaris', name: '대천문대 둥근 홀', en: 'Stellaris · Great Observatory Hall', color: '#6ab0ff', seed: 3271, base: G, time: 'night', size: [W, D, Hh],
    desc: '천문대 언덕 정상, 대망원경을 받치는 둥근 건물의 속. 바닥에는 은으로 박은 별 지도가 펼쳐지고, 가운데 쇠 기둥이 옥상의 대망원경까지 곧게 올라간다. 북서쪽 벽을 따라 별 지도 회랑이 돌고, 점성술사들은 책상에서 밤마다 관측 일지를 적는다.',
    info: { title: '장소 정보', en: 'OBSERVATORY', rows: [['1층', '둥근 홀 · 바닥 별 지도 · 천체 모형'], ['2층', '별 지도 회랑(동쪽 곡선 계단)'], ['가운데', '옥상 대망원경의 받침 기둥과 접안경'], ['천장', '덮개를 열면 밤하늘이 그대로 보인다']] },
    sky: ['#0a1430', '#02040c', '#3a5aa0'], stars: true,
    hemi: ['#a8c0f0', '#141828', 0.62], sun: ['#c0d8ff', 0.46, [0.45, 1, 0.5]],
    day: { sky: ['#c8d8f0', '#5a80c0', '#f4f8ff'], stars: false, hemi: ['#f4f6ff', '#4a5060', 0.62], sun: ['#fff6e4', 0.7, [0.45, 1, 0.5]], haze: '#c8d4e8' },
    fog: { start: 0.96, floor: G - 8, depth: 4, haze: [8, 0.18, 6], hazeColor: '#1a2848' },
    camY: 0, zoom: 1.8,
    particles: [
      { n: 90, colors: ['#d0e0ff', '#ffffff', '#fff8d0'], mode: 'drift', speed: 0.12, wind: 0.1, area: [CX, CZ, 14], y0: G + 2, y1: G + 16, glow: true },
      { n: 40, colors: ['#ffffff', '#8ab8ff'], mode: 'fall', speed: 0.15, area: [CX, CZ, 5], y0: G + 6, y1: G + 26, glow: true },
    ],
    blocks: {
      ground: { c: '#3a3a44', top: '#3a5a5a', v: 0.1 }, rock: { c: '#4a5068', v: 0.06, pat: 'big' }, rockDk: { c: '#2e3246', v: 0.06, pat: 'stone' }, path: { c: '#3a3a44', top: '#6a7088', v: 0.08, pat: 'stone' },
      marble: { c: '#c8d0e0', v: 0.04, pat: 'big' }, marbleDk: { c: '#8a94a8', v: 0.05, pat: 'brick' }, trim: { c: '#e4eaf4', v: 0.03 },
      floorM: { c: '#3a4462', top: '#465074', v: 0.04, pat: 'check', alt: '#3e486a' }, chartB: { c: '#1a2450', v: 0.04 },
      silver: { c: '#c8d4e0', v: 0.04 }, brass: { c: '#c8a050', v: 0.07 }, brassDk: { c: '#8a6a30', v: 0.06 }, iron: { c: '#2a2e3c', v: 0.03 },
      door: { c: '#1a1a2a', v: 0.02, pat: 'plank' }, wood: { c: '#4a3a3a', v: 0.05, pat: 'plank' }, woodL: { c: '#6a5040', top: '#7a5c48', v: 0.05, pat: 'plank' },
      win: { c: '#b8d0ff', night: true, day: '#7a90b8' }, lamp: { c: '#d0e0ff', night: true, day: '#a8b4c8' }, lanternB: { c: '#ffd890', glow: true },
      starG: { c: '#fff8d0', glow: true }, starB: { c: '#8ab8ff', glow: true }, meteor: { c: '#ffb86a', glow: true }, lens: { c: '#a0d8ff', glow: true }, sunO: { c: '#ffd070', glow: true },
      cloth1: { c: '#2a3a8a', v: 0.04 }, cloth2: { c: '#d8dcf0', v: 0.03 }, cloth3: { c: '#5a3a8a', v: 0.04 }, rockM: { c: '#4a3a3a', v: 0.1 },
      planetR: { c: '#c8603a', v: 0.05 }, planetB: { c: '#4a8ad0', v: 0.05 }, planetG: { c: '#a8b070', v: 0.05 },
      bookR: { c: '#7a2a3a', v: 0.05 }, bookB: { c: '#2a3a7a', v: 0.05 }, bookG: { c: '#3a5a3a', v: 0.05 }, paper: { c: '#ece4cc', v: 0.03 },
      // OR.signpost/goAct 공용(쓰지 않아도 무방)
      stoneG: { c: '#4a5068', v: 0.05 }, timber: { c: '#4a3a3a', v: 0.05 }, gold: { c: '#c8a050', v: 0.05 }, mlamp: { c: '#d0e0ff', night: true, day: '#a8b4c8' },
    },
    build(w) {
      const B = w.id;
      const lights = [], acts = [], landmarks = [];
      const TAU = Math.PI * 2, TB = Math.atan2(-0.73, -0.68);             // 시점 반대쪽(북서) 방향
      const rr = (x, z) => Math.hypot(x - CX, z - CZ);
      const phiOf = (x, z) => { let d = Math.atan2(z - CZ, x - CX) - TB; return Math.atan2(Math.sin(d), Math.cos(d)); };
      const front = (x, z) => ((x - CX) * 0.68 + (z - CZ) * 0.73) / Math.max(1, rr(x, z));
      const sm = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
      const wallTop = (x, z) => G + 4 + Math.round(14 * sm(0.45, -0.3, front(x, z)));
      MH.terrain(w, {
        floor: G - 6, height: () => G,
        surface: (x, z) => rr(x, z) > RO + 0.5 ? (hash3(x, 2, z) > 0.7 ? B.path : B.ground) : B.floorM,
        under: (x, z, y, dep) => dep < 2 ? B.rockDk : B.rock,
      });

      // ── 바닥: 은 고리와 열두 갈래 선, 바깥 띠의 별 점 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rr(x, z); if (r > RI) continue;
        const th = Math.atan2(z - CZ, x - CX), k = Math.round(th / TAU * 12), off = Math.abs(th - k * TAU / 12) * r;
        let b = B.floorM;
        if (Math.abs(r - 5) < 0.5) b = B.silver;
        else if (Math.abs(r - 11) < 0.5) b = B.trim;
        else if (r > 5.5 && r < 10.5 && off < 0.5) b = k % 3 ? B.silver : B.brass;
        else if (r > 11.5 && hash3(x, 9, z) > 0.94) b = hash3(x, 8, z) > 0.5 ? B.starG : B.starB;
        else if (r < 4.5 && r > 3.5 && (x + z) % 2 === 0) b = B.brassDk;
        w.set(x, G, z, b);
      }

      // ── 둥근 벽: 바깥은 대리석, 안쪽은 어두운 기둥띠와 세로 창. 남동쪽은 낮다 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rr(x, z); if (r <= RI || r > RO) continue;
        const th = Math.atan2(z - CZ, x - CX), k = Math.round(th / TAU * 20), off = Math.abs(th - k * TAU / 20) * r, top = wallTop(x, z);
        for (let y = G + 1; y <= top; y++) {
          let b = B.marble;
          if (y === top) b = B.trim;
          else if (y === G + 1) b = B.marbleDk;
          else if ((y - G) % 6 === 4) b = B.trim;
          if (k % 2 && off < 0.8 && y >= G + 6 && y <= G + 13 && y < top) b = B.win;
          else if (!(k % 2) && off < 1 && r < RI + 1 && y < top) b = B.marbleDk;
          w.set(x, y, z, b);
        }
      }
      // 벽 등(기둥띠마다 등불): 벽이 높은 쪽만
      const sconces = [];
      for (let k = 0; k < 20; k += 2) {
        const th = k / 20 * TAU, x = Math.round(CX + Math.cos(th) * (RI - 0.6)), z = Math.round(CZ + Math.sin(th) * (RI - 0.6));
        if (wallTop(x, z) < G + 9 || phiOf(x, z) > 1.1 && phiOf(x, z) < 2.4) continue;
        w.set(x, G + 6, z, B.brassDk); w.set(x, G + 7, z, B.lanternB); sconces.push([x + 0.5, G + 7.5, z + 0.5]);
      }
      lights.push({ name: 'hall', p: [CX + 0.5, G + 9, CZ + 0.5], c: '#ffd8a0', i: 0.55, d: 36, flicker: 0.12, srcR: 16 });

      // ── 정문(남쪽): 검은 문짝, 황동 상인방, 흰 문설주. 바깥은 계단과 등주 ──
      for (let x = CX - 3; x <= CX + 3; x++) for (let z = CZ + 15; z <= CZ + 18; z++) {
        if (rr(x, z) <= RI) continue;
        for (let y = G + 1; y <= G + 8; y++) w.set(x, y, z, y <= G + 7 ? B.door : B.brass);
      }
      for (const x of [CX - 4, CX + 4]) for (let z = CZ + 15; z <= CZ + 18; z++) if (rr(x, z) > RI) w.box(x, G + 1, z, x, G + 8, z, B.trim);
      w.box(CX - 4, G + 9, CZ + 16, CX + 4, G + 9, CZ + 17, B.brassDk); w.set(CX, G + 10, CZ + 17, B.starG);
      for (let x = CX - 1; x <= CX + 1; x++) w.set(x, G + 4, CZ + 15, B.brass);          // 안쪽 문고리 띠
      for (let s = 0; s < 3; s++) for (let x = CX - 5 - s; x <= CX + 5 + s; x++) w.set(x, G, CZ + 19 + s, s % 2 ? B.marble : B.marbleDk);
      for (const lx of [CX - 7, CX + 7]) { w.box(lx, G + 1, CZ + 20, lx, G + 5, CZ + 20, B.iron); w.set(lx, G + 6, CZ + 20, B.lamp); w.set(lx, G + 7, CZ + 20, B.iron); }
      lights.push({ name: 'door', p: [CX + 0.5, G + 6, CZ + 20.5], c: '#d0e0ff', i: 0.6, d: 12, flicker: 0.05, srcR: 8 });

      // ── 가운데 망원경 받침 기둥: 옥상 대망원경까지 오르는 쇠 기둥, 황동 띠, 받침 단 ──
      w.cyl(CX, CZ, G + 1, G + 1, 3.3, B.marbleDk); w.ring(CX, CZ, G + 1, 2.6, 3.3, B.trim);
      for (let y = G + 2; y <= G + 19; y++) w.cyl(CX, CZ, y, y, 2, (y - G) % 4 === 0 ? B.brass : B.iron);
      w.cyl(CX, CZ, G + 20, G + 21, 1.5, B.brassDk); w.set(CX, G + 22, CZ, B.lens);
      // 천장 서까래(북서쪽 높은 벽에서 기둥 꼭대기로)
      for (const p of [-1.0, -0.5, 0, 0.5, 1.0]) { const th = TB + p; w.line(Math.round(CX + Math.cos(th) * 15), G + 18, Math.round(CZ + Math.sin(th) * 15), Math.round(CX + Math.cos(th) * 2.6), G + 19, Math.round(CZ + Math.sin(th) * 2.6), B.iron); }
      // 접안경(부품): 기둥에서 뻗은 팔과 아래로 꺾인 경통, 렌즈
      const eye = w.prop({ name: 'eyepiece', pivot: [CX + 0.5, G + 8, CZ + 0.5], axis: 'y' });
      eye.box(CX + 3, G + 9, CZ, CX + 4, G + 9, CZ, B.brassDk);
      eye.line(CX + 5, G + 11, CZ, CX + 6, G + 6, CZ, B.brass, 0.6);
      eye.set(CX + 5, G + 12, CZ, B.brassDk); eye.set(CX + 6, G + 5, CZ, B.lens);
      lights.push({ name: 'scope', p: [CX + 6.5, G + 5.5, CZ + 0.5], c: '#a0d8ff', i: 0.6, d: 16, flicker: 0.05, srcR: 3 });
      acts.push({
        name: '망원경 조준', hint: '받침 기둥의 접안경이 빙 돌며 별을 겨누고, 빛줄기가 천장 너머 대망원경으로 뻗어요', hit: [CX - 3, G + 1, CZ - 3, CX + 3, G + 12, CZ + 3],
        run: async a => {
          a.flash('scope', 4, 6);
          await a.turn('eyepiece', [0, 2.4, 0], 2.2);
          for (let k = 0; k < 8; k++) { a.burst([CX + 0.5, G + 20 + k * 1.5, CZ + 0.5], { n: 14, colors: ['#a0d8ff', '#ffffff'], speed: 0.6, up: 6, life: 1.2, gravity: -1, spread: 0.5 }); await a.wait(0.12); }
          await a.turn('eyepiece', [0, -1.6, 0], 2.4);
          a.burst([CX + 0.5, G + 30, CZ + 0.5], { n: 40, colors: ['#ffffff', '#a0d8ff', '#fff8d0'], speed: 4, up: 1, life: 1.8, gravity: 0, spread: 3 });
          await a.turn('eyepiece', [0, 0, 0], 1.6); a.unwind('eyepiece');
        },
      });
      landmarks.push({ name: '망원경 받침 기둥', note: '옥상 대망원경까지 오르는 쇠 기둥', p: [CX + 0.5, G + 26, CZ + 0.5] });

      // ── 별 지도 회랑(2층): 북서쪽 벽을 따라 도는 나무 바닥, 쇠 난간, 벽의 별 지도와 책장 ──
      const GY = G + 8;
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rr(x, z), ph = phiOf(x, z);
        if (r > RI + 0.4 || r < 11.5 || Math.abs(ph) > 1.25) continue;
        w.set(x, GY, z, B.woodL);
        if (r < 12.3) { w.set(x, GY - 1, z, B.brassDk); w.set(x, GY + 2, z, B.brass); if ((x + z) % 2 === 0) w.set(x, GY + 1, z, B.iron); }
      }
      for (let p = -1.1; p <= 1.11; p += 0.44) { const th = TB + p, x = Math.round(CX + Math.cos(th) * 12), z = Math.round(CZ + Math.sin(th) * 12); w.box(x, G + 1, z, x, GY - 1, z, B.marbleDk); }
      // 회랑 계단: 동쪽 벽을 따라 내려오는 곡선 계단(일곱 단)
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rr(x, z), ph = phiOf(x, z);
        if (r > RI + 0.4 || r < 12 || ph < 1.25 || ph >= 1.25 + 7 * 0.157) continue;
        const k = 6 - Math.floor((ph - 1.25) / 0.157);
        w.box(x, G + 1, z, x, G + 1 + k, z, B.marbleDk); w.set(x, G + 1 + k, z, B.woodL);
      }
      // 벽의 별 지도: 짙은 남색 판에 별과 은빛 선
      const chartStars = [];
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rr(x, z), ph = phiOf(x, z);
        if (r <= RI || r > RI + 1 || Math.abs(ph) > 0.75) continue;
        for (let y = GY + 1; y <= G + 16; y++) {
          let b = B.chartB;
          if (y === GY + 1 || y === G + 16 || Math.abs(Math.abs(ph) - 0.75) < 0.07) b = B.brassDk;
          else if (hash3(x, y, z) > 0.86) { b = hash3(x, y + 1, z) > 0.5 ? B.starG : B.starB; if (hash3(x, y, 4) > 0.5) chartStars.push([x + 0.5, y + 0.5, z + 0.5]); }
          else if (Math.abs((y - GY) - 4 - Math.sin(ph * 6) * 2.5) < 0.5) b = B.silver;
          w.set(x, y, z, b);
        }
      }
      // 회랑 책장(별 지도 양옆)
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rr(x, z), ph = Math.abs(phiOf(x, z));
        if (r <= RI - 1 || r > RI || ph < 0.8 || ph > 1.2) continue;
        for (let y = GY + 1; y <= GY + 4; y++) w.set(x, y, z, y === GY + 4 ? B.wood : [B.bookR, B.bookB, B.bookG, B.paper][(hash3(x, y, z) * 4) | 0]);
      }
      lights.push({ name: 'chart', p: [CX + Math.cos(TB) * 13 + 0.5, G + 12, CZ + Math.sin(TB) * 13 + 0.5], c: '#8ab8ff', i: 0.5, d: 18, flicker: 0.08, srcR: 4 });
      acts.push({
        name: '별 지도', hint: '회랑 벽의 별 지도에서 별자리가 하나씩 반짝이며 은빛 선으로 이어져요', hit: [Math.round(CX + Math.cos(TB) * 14) - 4, GY + 1, Math.round(CZ + Math.sin(TB) * 14) - 4, Math.round(CX + Math.cos(TB) * 14) + 4, G + 16, Math.round(CZ + Math.sin(TB) * 14) + 4],
        run: async a => {
          a.flash('chart', 4, 5); a.glow(1.6, 5);
          for (let k = 0; k < 14; k++) { const p = chartStars[(k * 7) % chartStars.length]; a.burst([p[0] + (CX - p[0]) * 0.08, p[1], p[2] + (CZ - p[2]) * 0.08], { n: 12, colors: ['#ffffff', '#fff8d0', '#8ab8ff'], speed: 1.6, up: 0.4, life: 1.2, gravity: 0, spread: 0.6 }); await a.wait(0.22); }
        },
      });
      landmarks.push({ name: '별 지도 회랑', note: '2층 · 동쪽 곡선 계단', p: [CX + Math.cos(TB) * 13 + 0.5, G + 20, CZ + Math.sin(TB) * 13 + 0.5] });

      // ── 천체 모형(서남쪽): 받침 위 금빛 태양, 세 행성 팔(부품, 천천히 돈다) ──
      const OX = CX - 9, OZ = CZ + 6;
      w.cyl(OX, OZ, G + 1, G + 1, 1.8, B.marbleDk); w.ring(OX, OZ, G + 1, 1.2, 1.8, B.brass); w.box(OX, G + 2, OZ, OX, G + 5, OZ, B.brassDk);
      w.sphere(OX, G + 7, OZ, 1.2, B.sunO); w.set(OX, G + 6, OZ, B.brassDk);
      const orbit = (name, r, y, pb, speed) => {
        const p = w.prop({ name, pivot: [OX + 0.5, y + 0.5, OZ + 0.5], axis: 'y', speed });
        for (let s = 2; s < r; s++) p.set(OX + s, y, OZ, B.brass);
        p.set(OX + r, y, OZ, pb); p.set(OX + r, y + 1, OZ, pb); p.set(OX + r, y - 1, OZ, B.brassDk);
      };
      orbit('orbitA', 2, G + 7, B.planetG, 0.5); orbit('orbitB', 3, G + 6, B.planetB, -0.32); orbit('orbitC', 4, G + 5, B.planetR, 0.2);
      lights.push({ name: 'orrery', p: [OX + 0.5, G + 7.5, OZ + 0.5], c: '#ffd070', i: 0.5, d: 12, flicker: 0.1, srcR: 3 });
      acts.push({
        name: '천체 모형', hint: '금빛 태양 둘레를 도는 행성 팔들이 빠르게 돌며 별가루를 뿌려요', hit: [OX - 4, G + 1, OZ - 4, OX + 4, G + 8, OZ + 4],
        run: async a => {
          a.flash('orrery', 4, 4.5); a.spin('orbitA', 8, 4.5); a.spin('orbitB', 8, 4.5); a.spin('orbitC', 8, 4.5);
          for (let k = 0; k < 9; k++) { a.burst([OX + 0.5, G + 7.5, OZ + 0.5], { n: 16, colors: ['#ffd070', '#fff8d0', '#8ab8ff'], speed: 5, up: 1, life: 1.2, gravity: 0.3, spread: 0.6, flat: true }); await a.wait(0.45); }
        },
      });

      // ── 관측 일지 책상(남동쪽): 책상, 의자, 촛불, 책 더미, 천구의(부품, 천천히 돈다) ──
      const DX0 = CX + 5, DZ0 = CZ + 7;
      w.box(DX0, G + 1, DZ0, DX0 + 4, G + 2, DZ0 + 1, B.wood); w.box(DX0 + 1, G + 1, DZ0, DX0 + 3, G + 1, DZ0 + 1, 0);
      w.box(DX0, G + 2, DZ0, DX0 + 4, G + 2, DZ0 + 1, B.woodL);
      w.set(DX0 + 2, G + 1, DZ0 - 2, B.wood); w.box(DX0 + 2, G + 2, DZ0 - 3, DX0 + 2, G + 3, DZ0 - 3, B.wood);
      w.set(DX0, G + 3, DZ0 + 1, B.lanternB); w.box(DX0 + 4, G + 3, DZ0, DX0 + 4, G + 4, DZ0, B.bookB); w.set(DX0 + 4, G + 3, DZ0 + 1, B.bookR); w.set(DX0 + 1, G + 3, DZ0 + 1, B.paper);
      const book = w.prop({ name: 'logbook', pivot: [DX0 + 2.5, G + 3, DZ0 + 0.5], axis: 'y' });
      book.box(DX0 + 2, G + 3, DZ0, DX0 + 3, G + 3, DZ0, B.paper); book.set(DX0 + 2, G + 3, DZ0 + 1, B.cloth3); book.set(DX0 + 3, G + 3, DZ0 + 1, B.cloth3);
      lights.push({ name: 'desk', p: [DX0 + 0.5, G + 4, DZ0 + 1.5], c: '#ffc878', i: 0.45, d: 10, flicker: 0.3, srcR: 2 });
      const GBX = CX + 11, GBZ = CZ + 3;
      w.box(GBX, G + 1, GBZ, GBX, G + 2, GBZ, B.brassDk); w.set(GBX - 1, G + 1, GBZ, B.brassDk); w.set(GBX + 1, G + 1, GBZ, B.brassDk);
      const globe = w.prop({ name: 'globe', pivot: [GBX + 0.5, G + 4.5, GBZ + 0.5], axis: 'y', speed: 0.25 });
      globe.sphere(GBX, G + 4, GBZ, 1.3, B.cloth1); globe.set(GBX + 1, G + 4, GBZ, B.starG); globe.set(GBX, G + 5, GBZ - 1, B.starB); globe.set(GBX - 1, G + 3, GBZ, B.starG); globe.set(GBX, G + 6, GBZ, B.brass);
      acts.push({
        name: '관측 일지', hint: '책상 위 관측 일지가 떠올라 펼쳐지며 지난밤의 기록지가 흩날려요', hit: [DX0, G + 1, DZ0, DX0 + 4, G + 4, DZ0 + 1],
        run: async a => {
          a.flash('desk', 3, 4);
          await a.tween('logbook', { off: [0, 2.5, 0], rot: [0, 1.2, 0] }, 1.2);
          for (let k = 0; k < 8; k++) { a.burst([DX0 + 2.5, G + 6, DZ0 + 0.5], { n: 10, colors: ['#ece4cc', '#ffffff', '#d8dcf0'], speed: 2.4, up: 2, life: 2, gravity: 0.8, spread: 1, flat: true }); await a.wait(0.25); }
          a.spin('globe', 10, 2);
          await a.tween('logbook', { off: [0, 0, 0], rot: [0, 0, 0] }, 1.2);
        },
      });

      // ── 운석 받침(북쪽): 황동 요람 위 별 조각(부품) ──
      const MX = CX - 4, MZ = CZ - 8;
      w.cyl(MX, MZ, G + 1, G + 2, 1.3, B.marbleDk); w.ring(MX, MZ, G + 3, 1, 1.9, B.brass);
      const met = w.prop({ name: 'meteorite', pivot: [MX + 0.5, G + 4, MZ + 0.5], axis: 'y', speed: 0.2 });
      met.sphere(MX, G + 4, MZ, 1, B.rockM); met.set(MX, G + 5, MZ, B.meteor); met.set(MX + 1, G + 4, MZ, B.meteor); met.set(MX, G + 4, MZ - 1, B.meteor);
      lights.push({ name: 'meteor', p: [MX + 0.5, G + 5, MZ + 0.5], c: '#ffa050', i: 0.5, d: 12, flicker: 0.2, srcR: 3 });
      acts.push({
        name: '별똥별', hint: '하늘에서 별똥별이 떨어져 들어오면 받침 위 운석이 떠올라 함께 빛나요', hit: [MX - 2, G + 1, MZ - 2, MX + 2, G + 6, MZ + 2],
        run: async a => {
          for (let k = 0; k < 3; k++) { a.burst([MX + 6 - k * 4, G + 34, MZ - 6 + k * 3], { n: 22, colors: ['#ffe0a0', '#ffffff', '#ffb86a'], speed: 1, up: -20, life: 1.3, gravity: 12, spread: 1 }); await a.wait(0.5); }
          a.flash('meteor', 6, 3); a.glow(1.6, 3);
          await a.move('meteorite', [0, 2.5, 0], 1);
          a.spin('meteorite', 12, 2);
          for (let k = 0; k < 5; k++) { a.burst([MX + 0.5, G + 6.5, MZ + 0.5], { n: 18, colors: ['#ffb86a', '#ffe0a0', '#ff7a3a'], speed: 4, up: 1, life: 1, gravity: 1, spread: 0.6 }); await a.wait(0.35); }
          await a.move('meteorite', [0, 0, 0], 1.2);
        },
      });

      // ── 천장 덮개(부품 둘): 기둥 꼭대기 둘레, 열면 양옆으로 미끄러진다 ──
      const shL = w.prop({ name: 'shutL', pivot: [CX, G + 20, CZ + 0.5] }), shR = w.prop({ name: 'shutR', pivot: [CX + 1, G + 20, CZ + 0.5] });
      for (let dz = -5; dz <= 5; dz++) for (let dx = -5; dx <= 5; dx++) {
        const d = Math.hypot(dx, dz); if (d > 5.2 || d < 1.6) continue;
        const sh = dx < 0 || (dx === 0 && dz < 0) ? shL : shR;
        sh.set(CX + dx, G + 20, CZ + dz, Math.abs(d - 4.6) < 0.5 ? B.brass : ((dx + dz) & 1 ? B.chartB : B.cloth1));
      }
      acts.push({
        name: '천장 열기', hint: '기둥 꼭대기의 천장 덮개가 양쪽으로 미끄러져 열리며 별빛이 쏟아져 내려요', hit: [CX - 5, G + 19, CZ - 5, CX + 5, G + 21, CZ + 5],
        run: async a => {
          await Promise.all([a.move('shutL', [-7, 0, 0], 2), a.move('shutR', [7, 0, 0], 2)]);
          a.glow(1.8, 4);
          for (let k = 0; k < 10; k++) { a.burst([CX + 0.5 + (k % 3 - 1) * 2, G + 30, CZ + 0.5 + (k % 2 ? 2 : -2)], { n: 16, colors: ['#ffffff', '#fff8d0', '#8ab8ff'], speed: 0.5, up: -2, life: 2.2, gravity: 1.4, spread: 2 }); await a.wait(0.3); }
          await a.wait(0.8);
          await Promise.all([a.move('shutL', [0, 0, 0], 1.8), a.move('shutR', [0, 0, 0], 1.8)]);
        },
      });

      // 바닥 가장자리: 긴 의자와 화분, 별 지도 두루마리 통
      for (const [x, z] of [[CX - 12, CZ - 4], [CX - 11, CZ - 7]]) { w.set(x, G + 1, z, B.brassDk); w.box(x, G + 2, z, x, G + 3, z, B.paper); }
      w.box(CX - 6, G + 1, CZ + 12, CX - 3, G + 1, CZ + 12, B.wood); w.set(CX - 6, G + 1, CZ + 12, B.iron); w.set(CX - 3, G + 1, CZ + 12, B.iron);

      // ── 정문 안쪽: 밖으로 나가기 ──
      acts.push(OR.goAct({ at: [CX, G + 1, CZ + 13], h: 6, name: '밖으로 나가기', goto: 'stellaris', hint: '검은 정문을 열고 천문대 언덕 정상으로 나가요', hit: [CX - 3, G + 1, CZ + 16, CX + 3, G + 7, CZ + 16] }));
      landmarks.push({ name: '대천문대 둥근 홀', note: '바닥의 별 지도 · 천체 모형', p: [CX + 0.5, G + 24, CZ + 0.5], boss: true });
      return { lights, landmarks, acts };
    },
  });
})();
