// 대천문대 둥근 홀(하위 지도) — 천문대 언덕 정상, 대망원경을 받치는 원형 건물의 속. 바닥에 박힌 별 지도와 가운데 망원경 받침 기둥,
// 북서쪽 벽을 따라 도는 별 지도 회랑(2층), 동쪽 곡선 계단, 천체 모형, 관측 일지 책상, 운석 받침, 천장 덮개. 남동쪽(시점 쪽) 벽은 낮게 잘랐다 (천문대 언덕의 하위 지도)
// 2배 해상도(1칸 ≈ 25cm), playerScale 2. 벽은 4칸 두께의 낱돌 쌓기(줄눈), 벽기둥·띠돌림·세로 창(창살), 판자문, 회랑 난간 동자, 한 단 1칸 곡선 계단.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 128, D = 128, Hh = 96, G = 20;
  const CX = 64, CZ = 64, RI = 31, RO = 35;                    // 홀 가운데, 안쪽·바깥 벽 반지름
  MAPS.push({
    id: 'stellaris-observatory', cat: 'magic', sub: true, parent: 'stellaris', name: '대천문대 둥근 홀', en: 'Stellaris · Great Observatory Hall', color: '#6ab0ff', seed: 3271, base: G, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '천문대 언덕 정상, 대망원경을 받치는 둥근 건물의 속. 바닥에는 은으로 박은 별 지도가 펼쳐지고, 가운데 쇠 기둥이 옥상의 대망원경까지 곧게 올라간다. 북서쪽 벽을 따라 별 지도 회랑이 돌고, 점성술사들은 책상에서 밤마다 관측 일지를 적는다.',
    info: { title: '장소 정보', en: 'OBSERVATORY', rows: [['1층', '둥근 홀 · 바닥 별 지도 · 천체 모형'], ['2층', '별 지도 회랑(동쪽 곡선 계단)'], ['가운데', '옥상 대망원경의 받침 기둥과 접안경'], ['천장', '덮개를 열면 밤하늘이 그대로 보인다']] },
    sky: ['#0a1430', '#02040c', '#3a5aa0'], stars: true,
    hemi: ['#a8c0f0', '#141828', 0.62], sun: ['#c0d8ff', 0.46, [0.45, 1, 0.5]],
    day: { sky: ['#c8d8f0', '#5a80c0', '#f4f8ff'], stars: false, hemi: ['#f4f6ff', '#4a5060', 0.62], sun: ['#fff6e4', 0.7, [0.45, 1, 0.5]], haze: '#c8d4e8' },
    fog: { start: 0.96, floor: G - 16, depth: 8, haze: [16, 0.18, 12], hazeColor: '#1a2848' },
    camY: 0, zoom: 1.8,
    particles: [
      { n: 90, colors: ['#d0e0ff', '#ffffff', '#fff8d0'], mode: 'drift', speed: 0.24, wind: 0.2, area: [CX, CZ, 28], y0: G + 4, y1: G + 32, glow: true },
      { n: 40, colors: ['#ffffff', '#8ab8ff'], mode: 'fall', speed: 0.3, area: [CX, CZ, 10], y0: G + 12, y1: G + 52, glow: true },
    ],
    blocks: {
      ground: { c: '#3a3a44', top: '#3a5a5a', v: 0.1 }, rock: { c: '#4a5068', v: 0.06, pat: 'big' }, rockDk: { c: '#2e3246', v: 0.06, pat: 'stone' }, path: { c: '#3a3a44', top: '#6a7088', v: 0.08, pat: 'stone' },
      marble: { c: '#c8d0e0', v: 0.04, pat: 'big' }, marble2: { c: '#bcc4d6', v: 0.04, pat: 'big' }, marbleJ: { c: '#9aa2b6', v: 0.03 }, marbleDk: { c: '#8a94a8', v: 0.05, pat: 'brick' }, trim: { c: '#e4eaf4', v: 0.03 },
      floorM: { c: '#3a4462', top: '#465074', v: 0.04, pat: 'check', alt: '#3e486a' }, chartB: { c: '#1a2450', v: 0.04 },
      silver: { c: '#c8d4e0', v: 0.04 }, brass: { c: '#c8a050', v: 0.07 }, brassDk: { c: '#8a6a30', v: 0.06 }, iron: { c: '#2a2e3c', v: 0.03 }, ironL: { c: '#3a4050', v: 0.03 },
      door: { c: '#1a1a2a', v: 0.02, pat: 'plank' }, doorDk: { c: '#121220', v: 0.02 }, wood: { c: '#4a3a3a', v: 0.05, pat: 'plank' }, woodL: { c: '#6a5040', top: '#7a5c48', v: 0.05, pat: 'plank' }, woodDk: { c: '#3a2c2c', v: 0.04 },
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
      const rr = (x, z) => Math.hypot(x + 0.5 - CX, z + 0.5 - CZ);
      const phiOf = (x, z) => { let d = Math.atan2(z + 0.5 - CZ, x + 0.5 - CX) - TB; return Math.atan2(Math.sin(d), Math.cos(d)); };
      const front = (x, z) => ((x + 0.5 - CX) * 0.68 + (z + 0.5 - CZ) * 0.73) / Math.max(1, rr(x, z));
      const sm = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
      const wallTop = (x, z) => G + 8 + 2 * Math.round(14 * sm(0.45, -0.3, front(x, z)));
      MH.terrain(w, {
        floor: G - 8, height: () => G,
        surface: (x, z) => rr(x, z) > RO + 1 ? (hash3(x >> 2, 2, z >> 2) > 0.7 ? B.path : B.ground) : B.floorM,
        under: (x, z, y, dep) => dep < 3 ? B.rockDk : B.rock,
      });

      // ── 바닥(모두 G 한 높이): 은 고리와 열두 갈래 선, 황동 체크 띠, 바깥 띠의 별 점 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rr(x, z); if (r > RI) continue;
        const th = Math.atan2(z + 0.5 - CZ, x + 0.5 - CX), k = Math.round(th / TAU * 12), off = Math.abs(th - k * TAU / 12) * r;
        let b = B.floorM;
        if (Math.abs(r - 10) < 0.7) b = B.silver;
        else if (Math.abs(r - 22) < 0.7) b = B.trim;
        else if (r > 11 && r < 21 && off < 0.8) b = k % 3 ? B.silver : B.brass;
        else if (r > 23 && hash3(x >> 1, 9, z >> 1) > 0.94) b = hash3(x >> 1, 8, z >> 1) > 0.5 ? B.starG : B.starB;
        else if (r < 9 && r > 7 && ((x >> 1) + (z >> 1)) % 2 === 0) b = B.brassDk;
        w.set(x, G, z, b);
      }

      // ── 둥근 벽: 낱돌 쌓기(2칸 돌 + 줄눈), 안쪽 벽기둥, 띠돌림, 세로 창(가운데 창살·가로살). 남동쪽은 낮다 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rr(x, z); if (r <= RI || r > RO) continue;
        const th = Math.atan2(z + 0.5 - CZ, x + 0.5 - CX), k = Math.round(th / TAU * 20), off = (th - k * TAU / 20) * r, top = wallTop(x, z);
        const u = Math.round(th * RO);
        for (let y = G + 1; y <= top; y++) {
          const c = Math.floor((y - G - 1) / 3), rw = (y - G - 1) % 3, uu = u + (c & 1) * 3;
          let b = (rw === 2 || ((uu % 6) + 6) % 6 === 5) ? B.marbleJ : (hash3(Math.floor(uu / 6), c, 3) > 0.6 ? B.marble2 : B.marble);
          if (y >= top - 1) b = B.trim;
          else if (y <= G + 2) b = B.marbleDk;
          else if (((y - G) >> 1) % 6 === 4) b = B.trim;
          const winRow = y >= G + 12 && y <= G + 27 && y < top - 1;
          if (k % 2 && Math.abs(off) < 1.7 && winRow) {
            if (r > RO - 1.2) b = (Math.abs(off) < 0.5 || y === G + 21) ? B.trim : B.win;
            else b = 0;                                                            // 창 안쪽은 깊게 판다
          } else if (k % 2 && Math.abs(off) < 2.4 && (y === G + 11 || y === G + 28) && y < top - 1) b = B.trim;
          else if (!(k % 2) && Math.abs(off) < 1.6 && r < RI + 1.6 && y > G + 2 && y < top - 1) b = ((y - G) % 6 === 0) ? B.trim : B.marbleDk;
          w.set(x, y, z, b);
        }
      }
      // 벽 등(벽기둥마다 등불): 머리보다 높게(G+12~), 벽이 높은 쪽만
      for (let k = 0; k < 20; k += 2) {
        const th = k / 20 * TAU, x = Math.floor(CX + Math.cos(th) * (RI - 1.0)), z = Math.floor(CZ + Math.sin(th) * (RI - 1.0));
        if (wallTop(x, z) < G + 18 || phiOf(x, z) > 1.1 && phiOf(x, z) < 2.4) continue;
        w.set(x, G + 12, z, B.brassDk); w.set(x, G + 13, z, B.lanternB); w.set(x, G + 14, z, B.lanternB); w.set(x, G + 15, z, B.brassDk);
      }
      lights.push({ name: 'hall', p: [CX + 0.5, G + 18, CZ + 0.5], c: '#ffd8a0', i: 0.55, d: 72, flicker: 0.12, srcR: 32 });

      // ── 정문(남쪽): 판자문(테두리 살·판), 황동 상인방, 흰 문설주. 바깥은 계단 무늬 돌판과 등주 ──
      for (let x = CX - 6; x <= CX + 5; x++) for (let z = CZ + 28; z <= CZ + 36; z++) {
        if (rr(x, z) <= RI) continue;
        for (let y = G + 1; y <= G + 16; y++) {
          const stile = x === CX - 6 || x === CX + 5 || x === CX - 1 || x === CX || y === G + 1 || y === G + 8 || y === G + 15;
          w.set(x, y, z, y === G + 16 ? B.brass : (stile ? B.doorDk : B.door));
        }
      }
      for (const x of [CX - 8, CX - 7, CX + 6, CX + 7]) for (let z = CZ + 28; z <= CZ + 36; z++) if (rr(x, z) > RI) w.box(x, G + 1, z, x, G + 17, z, B.trim);
      w.box(CX - 9, G + 18, CZ + 32, CX + 8, G + 19, CZ + 35, B.brassDk); w.box(CX - 1, G + 20, CZ + 35, CX, G + 21, CZ + 35, B.starG);
      for (let x = CX - 3; x <= CX + 2; x++) for (let z = CZ + 28; z <= CZ + 33; z++) if (rr(x, z) > RI && rr(x, z) <= RI + 1) { w.set(x, G + 8, z, B.brass); }   // 안쪽 문고리 띠
      for (let s = 0; s < 3; s++) for (let x = CX - 10 - 2 * s; x <= CX + 9 + 2 * s; x++) for (const dz of [0, 1]) w.set(x, G, CZ + 37 + 2 * s + dz, s % 2 ? B.marble : B.marbleDk);
      for (const lx of [CX - 15, CX + 14]) {
        w.box(lx - 1, G + 1, CZ + 39, lx + 1, G + 2, CZ + 41, B.marbleDk); w.box(lx, G + 3, CZ + 40, lx, G + 10, CZ + 40, B.iron);
        for (let dy = 11; dy <= 12; dy++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) w.set(lx + dx, G + dy, CZ + 40 + dz, (dx && dz) ? B.iron : B.lamp);
        w.box(lx - 1, G + 13, CZ + 39, lx + 1, G + 13, CZ + 41, B.iron); w.set(lx, G + 14, CZ + 40, B.brass);
      }
      lights.push({ name: 'door', p: [CX + 0.5, G + 12, CZ + 40.5], c: '#d0e0ff', i: 0.6, d: 24, flicker: 0.05, srcR: 16 });

      // ── 가운데 망원경 받침 기둥: 옥상 대망원경까지 오르는 쇠 기둥, 황동 띠와 리벳, 받침 단 ──
      w.cyl(CX, CZ, G + 1, G + 2, 6.6, B.marbleDk); w.ring(CX, CZ, G + 2, 5.4, 6.6, B.trim); w.cyl(CX, CZ, G + 3, G + 3, 5.2, B.marble);
      for (let y = G + 4; y <= G + 38; y++) {
        const band = (y - G) % 8 < 2;
        w.cyl(CX, CZ, y, y, band ? 4.6 : 4, band ? B.brass : B.iron);
        if (!band && (y - G) % 8 === 4) for (let a = 0; a < 8; a++) { const t = a / 8 * TAU; w.set(Math.floor(CX + 0.5 + Math.cos(t) * 4.2), y, Math.floor(CZ + 0.5 + Math.sin(t) * 4.2), B.brassDk); }
      }
      w.cyl(CX, CZ, G + 39, G + 42, 3, B.brassDk); w.box(CX, G + 43, CZ, CX, G + 44, CZ, B.lens);
      // 천장 서까래(북서쪽 높은 벽에서 기둥 꼭대기로)
      for (const p of [-1.0, -0.5, 0, 0.5, 1.0]) { const th = TB + p; w.line(CX + Math.cos(th) * 30, G + 36, CZ + Math.sin(th) * 30, CX + Math.cos(th) * 5.2, G + 38, CZ + Math.sin(th) * 5.2, B.ironL, 0.75); }
      // 접안경(부품): 기둥에서 뻗은 팔과 아래로 꺾인 경통, 렌즈
      const eye = w.prop({ name: 'eyepiece', pivot: [CX + 0.5, G + 16, CZ + 0.5], axis: 'y' });
      eye.box(CX + 5, G + 18, CZ, CX + 9, G + 19, CZ + 1, B.brassDk);
      eye.line(CX + 10, G + 22, CZ + 0.5, CX + 12, G + 12, CZ + 0.5, B.brass, 0.9);
      eye.box(CX + 9, G + 23, CZ, CX + 11, G + 24, CZ + 1, B.brassDk); eye.box(CX + 12, G + 10, CZ, CX + 12, G + 11, CZ + 1, B.lens);
      lights.push({ name: 'scope', p: [CX + 12.5, G + 11, CZ + 1], c: '#a0d8ff', i: 0.6, d: 32, flicker: 0.05, srcR: 4 });
      acts.push({
        name: '망원경 조준', hint: '받침 기둥의 접안경이 빙 돌며 별을 겨누고, 빛줄기가 천장 너머 대망원경으로 뻗어요', hit: [CX - 6, G + 1, CZ - 6, CX + 6, G + 24, CZ + 6],
        run: async a => {
          a.flash('scope', 4, 6);
          await a.turn('eyepiece', [0, 2.4, 0], 2.2);
          for (let k = 0; k < 8; k++) { a.burst([CX + 0.5, G + 40 + k * 3, CZ + 0.5], { n: 14, colors: ['#a0d8ff', '#ffffff'], speed: 1.2, up: 12, life: 1.2, gravity: -2, spread: 1 }); await a.wait(0.12); }
          await a.turn('eyepiece', [0, -1.6, 0], 2.4);
          a.burst([CX + 0.5, G + 60, CZ + 0.5], { n: 40, colors: ['#ffffff', '#a0d8ff', '#fff8d0'], speed: 8, up: 2, life: 1.8, gravity: 0, spread: 6 });
          await a.turn('eyepiece', [0, 0, 0], 1.6); a.unwind('eyepiece');
        },
      });
      landmarks.push({ name: '망원경 받침 기둥', note: '옥상 대망원경까지 오르는 쇠 기둥', p: [CX + 0.5, G + 52, CZ + 0.5] });

      // ── 별 지도 회랑(2층): 북서쪽 벽을 따라 도는 나무 바닥(장선), 쇠 난간(동자 2칸마다), 벽의 별 지도와 책장 ──
      const GY = G + 16;
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rr(x, z), ph = phiOf(x, z);
        if (r > RI + 0.8 || r < 23 || Math.abs(ph) > 1.25) continue;
        w.set(x, GY, z, B.woodL); w.set(x, GY - 1, z, ((x + z) % 4 === 0 || r < 24.6) ? B.wood : 0);
        if (r < 24.6) { w.set(x, GY - 2, z, B.brassDk); w.set(x, GY + 4, z, B.brass); if (((x + z) & 1) === 0) for (let y = GY + 1; y <= GY + 3; y++) w.set(x, y, z, B.iron); }
      }
      for (let p = -1.1; p <= 1.11; p += 0.275) { const th = TB + p, x = Math.floor(CX + Math.cos(th) * 24), z = Math.floor(CZ + Math.sin(th) * 24); w.box(x, G + 1, z, x + 1, GY - 1, z + 1, B.marbleDk); w.box(x, G + 1, z, x + 1, G + 1, z + 1, B.trim); }
      // 회랑 계단: 동쪽 벽을 따라 내려오는 곡선 계단(열여섯 단, 한 단 1칸)
      const NS = 16, SA = 1.25, SS = 1.1 / NS;
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rr(x, z), ph = phiOf(x, z);
        if (r > RI + 0.8 || r < 24 || ph < SA || ph >= SA + NS * SS) continue;
        const k = NS - 1 - Math.floor((ph - SA) / SS);
        w.box(x, G + 1, z, x, G + k, z, B.marbleDk); w.set(x, G + 1 + k, z, (k & 1) ? B.woodL : B.wood);
        if (r < 25) for (let y = G + 2 + k; y <= G + 4 + k; y++) if ((k & 1) === 0) w.set(x, y, z, B.iron);
        if (r < 25) w.set(x, G + 5 + k, z, B.brass);
      }
      // 벽의 별 지도: 짙은 남색 판에 별과 은빛 선
      const chartStars = [];
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rr(x, z), ph = phiOf(x, z);
        if (r <= RI || r > RI + 2 || Math.abs(ph) > 0.75) continue;
        for (let y = GY + 1; y <= G + 32; y++) {
          let b = B.chartB;
          if (y <= GY + 2 || y >= G + 31 || Math.abs(Math.abs(ph) - 0.75) < 0.05) b = B.brassDk;
          else if (hash3(x >> 1, y >> 1, z >> 1) > 0.88) { b = hash3(x >> 1, (y >> 1) + 1, z >> 1) > 0.5 ? B.starG : B.starB; if (hash3(x, y, 4) > 0.8 && r < RI + 1) chartStars.push([x + 0.5, y + 0.5, z + 0.5]); }
          else if (Math.abs((y - GY) - 8 - Math.sin(ph * 6) * 5) < 0.8) b = B.silver;
          w.set(x, y, z, b);
        }
      }
      // 회랑 책장(별 지도 양옆): 옆판·선반 4칸마다
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rr(x, z), ph = Math.abs(phiOf(x, z));
        if (r <= RI - 2 || r > RI || ph < 0.8 || ph > 1.2) continue;
        for (let y = GY + 1; y <= GY + 12; y++) {
          const sy = (y - GY - 1) % 4, side = Math.abs(ph - 0.8) < 0.03 || Math.abs(ph - 1.2) < 0.03;
          w.set(x, y, z, (sy === 3 || side || y === GY + 12) ? B.wood : (r > RI - 1 ? B.woodDk : [B.bookR, B.bookB, B.bookG, B.paper][(hash3(Math.round(ph * 60), (y - GY) >> 2, 5) * 4) | 0]));
        }
      }
      const CHX = CX + Math.cos(TB) * 26, CHZ = CZ + Math.sin(TB) * 26;
      lights.push({ name: 'chart', p: [CHX + 0.5, G + 24, CHZ + 0.5], c: '#8ab8ff', i: 0.5, d: 36, flicker: 0.08, srcR: 8 });
      acts.push({
        name: '별 지도', hint: '회랑 벽의 별 지도에서 별자리가 하나씩 반짝이며 은빛 선으로 이어져요', hit: [Math.round(CX + Math.cos(TB) * 28) - 8, GY + 1, Math.round(CZ + Math.sin(TB) * 28) - 8, Math.round(CX + Math.cos(TB) * 28) + 8, G + 32, Math.round(CZ + Math.sin(TB) * 28) + 8],
        run: async a => {
          a.flash('chart', 4, 5); a.glow(1.6, 5);
          for (let k = 0; k < 14; k++) { const p = chartStars[(k * 7) % chartStars.length]; a.burst([p[0] + (CX - p[0]) * 0.08, p[1], p[2] + (CZ - p[2]) * 0.08], { n: 12, colors: ['#ffffff', '#fff8d0', '#8ab8ff'], speed: 3.2, up: 0.8, life: 1.2, gravity: 0, spread: 1.2 }); await a.wait(0.22); }
        },
      });
      landmarks.push({ name: '별 지도 회랑', note: '2층 · 동쪽 곡선 계단', p: [CHX + 0.5, G + 40, CHZ + 0.5] });

      // ── 천체 모형(서남쪽): 받침 위 금빛 태양, 세 행성 팔(부품, 천천히 돈다) ──
      const OX = CX - 18, OZ = CZ + 12;
      w.cyl(OX, OZ, G + 1, G + 2, 3.6, B.marbleDk); w.ring(OX, OZ, G + 2, 2.4, 3.6, B.brass); w.cyl(OX, OZ, G + 3, G + 3, 1.6, B.marble);
      w.box(OX, G + 4, OZ, OX, G + 9, OZ, B.brassDk); w.ring(OX, OZ, G + 6, 0.5, 1.5, B.brass);
      w.sphere(OX, G + 14, OZ, 2.4, B.sunO); w.box(OX, G + 10, OZ, OX, G + 11, OZ, B.brassDk);
      const orbit = (name, r, y, pb, speed) => {
        const p = w.prop({ name, pivot: [OX + 0.5, y + 0.5, OZ + 0.5], axis: 'y', speed });
        for (let s = 3; s < r - 1; s++) p.set(OX + s, y, OZ, B.brass);
        p.box(OX + r - 1, y - 1, OZ, OX + r, y + 1, OZ + 1, pb); p.set(OX + r - 1, y - 2, OZ, B.brassDk);
      };
      orbit('orbitA', 5, G + 14, B.planetG, 0.5); orbit('orbitB', 7, G + 11, B.planetB, -0.32); orbit('orbitC', 9, G + 8, B.planetR, 0.2);
      lights.push({ name: 'orrery', p: [OX + 0.5, G + 14.5, OZ + 0.5], c: '#ffd070', i: 0.5, d: 24, flicker: 0.1, srcR: 4 });
      acts.push({
        name: '천체 모형', hint: '금빛 태양 둘레를 도는 행성 팔들이 빠르게 돌며 별가루를 뿌려요', hit: [OX - 9, G + 1, OZ - 9, OX + 9, G + 17, OZ + 9],
        run: async a => {
          a.flash('orrery', 4, 4.5); a.spin('orbitA', 8, 4.5); a.spin('orbitB', 8, 4.5); a.spin('orbitC', 8, 4.5);
          for (let k = 0; k < 9; k++) { a.burst([OX + 0.5, G + 14.5, OZ + 0.5], { n: 16, colors: ['#ffd070', '#fff8d0', '#8ab8ff'], speed: 10, up: 2, life: 1.2, gravity: 0.6, spread: 1.2, flat: true }); await a.wait(0.45); }
        },
      });

      // ── 관측 일지 책상(남동쪽): 책상(다리·앞널), 의자, 촛불, 책 더미, 천구의(부품, 천천히 돈다) ──
      const DX0 = CX + 10, DZ0 = CZ + 14;
      for (const [x, z] of [[DX0, DZ0], [DX0 + 9, DZ0], [DX0, DZ0 + 3], [DX0 + 9, DZ0 + 3]]) w.box(x, G + 1, z, x, G + 4, z, B.woodDk);
      w.box(DX0, G + 4, DZ0 + 3, DX0 + 9, G + 4, DZ0 + 3, B.wood); w.box(DX0 - 1, G + 5, DZ0 - 1, DX0 + 10, G + 5, DZ0 + 3, B.woodL);
      for (const [x, z] of [[DX0 + 4, DZ0 - 4], [DX0 + 5, DZ0 - 4], [DX0 + 4, DZ0 - 3], [DX0 + 5, DZ0 - 3]]) w.box(x, G + 1, z, x, G + 2, z, B.woodDk);
      w.box(DX0 + 3, G + 3, DZ0 - 4, DX0 + 6, G + 3, DZ0 - 3, B.wood); w.box(DX0 + 3, G + 4, DZ0 - 5, DX0 + 6, G + 8, DZ0 - 5, B.wood); w.box(DX0 + 4, G + 6, DZ0 - 5, DX0 + 5, G + 7, DZ0 - 5, B.cloth3);
      w.box(DX0, G + 6, DZ0 + 2, DX0, G + 6, DZ0 + 2, B.brassDk); w.set(DX0, G + 7, DZ0 + 2, B.lanternB);
      w.box(DX0 + 8, G + 6, DZ0, DX0 + 9, G + 7, DZ0 + 1, B.bookB); w.box(DX0 + 8, G + 8, DZ0, DX0 + 9, G + 8, DZ0 + 1, B.bookR); w.box(DX0 + 8, G + 6, DZ0 + 2, DX0 + 9, G + 6, DZ0 + 2, B.bookG); w.box(DX0 + 1, G + 6, DZ0 + 2, DX0 + 2, G + 6, DZ0 + 3, B.paper);
      const book = w.prop({ name: 'logbook', pivot: [DX0 + 5, G + 6, DZ0 + 1.5], axis: 'y' });
      book.box(DX0 + 3, G + 6, DZ0, DX0 + 6, G + 6, DZ0 + 1, B.paper); book.box(DX0 + 3, G + 6, DZ0 + 2, DX0 + 6, G + 6, DZ0 + 2, B.cloth3); book.set(DX0 + 5, G + 7, DZ0, B.cloth3);
      lights.push({ name: 'desk', p: [DX0 + 0.5, G + 8, DZ0 + 2.5], c: '#ffc878', i: 0.45, d: 20, flicker: 0.3, srcR: 3 });
      const GBX = CX + 22, GBZ = CZ + 6;
      for (const [dx, dz] of [[-2, 0], [2, 0], [0, -2], [0, 2]]) w.set(GBX + dx, G + 1, GBZ + dz, B.brassDk);
      w.box(GBX - 1, G + 1, GBZ - 1, GBX + 1, G + 1, GBZ + 1, B.brassDk); w.box(GBX, G + 2, GBZ, GBX, G + 4, GBZ, B.brassDk);
      for (let a = 0; a < 24; a++) { const t = a / 24 * TAU; if (Math.sin(t) > -0.3) w.set(GBX + Math.round(Math.cos(t) * 3.6), G + 8 + Math.round(Math.sin(t) * 3.6), GBZ, B.brass); }
      const globe = w.prop({ name: 'globe', pivot: [GBX + 0.5, G + 8.5, GBZ + 0.5], axis: 'y', speed: 0.25 });
      w.sphere; for (let dy = -3; dy <= 3; dy++) for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) {
        const d = Math.hypot(dx, dy, dz); if (d > 2.7) continue;
        if (dz === 0 && Math.round(Math.hypot(dx, dy)) >= 3) continue;
        const hh = hash3(GBX + dx, dy, GBZ + dz);
        globe.set(GBX + dx, G + 8 + dy, GBZ + dz, d > 1.8 && hh > 0.86 ? (hh > 0.93 ? B.starG : B.starB) : (dy === 0 ? B.brass : B.cloth1));
      }
      globe.set(GBX, G + 11, GBZ, B.brass); globe.set(GBX, G + 5, GBZ, B.brass);
      acts.push({
        name: '관측 일지', hint: '책상 위 관측 일지가 떠올라 펼쳐지며 지난밤의 기록지가 흩날려요', hit: [DX0 - 1, G + 1, DZ0 - 1, DX0 + 10, G + 8, DZ0 + 3],
        run: async a => {
          a.flash('desk', 3, 4);
          await a.tween('logbook', { off: [0, 5, 0], rot: [0, 1.2, 0] }, 1.2);
          for (let k = 0; k < 8; k++) { a.burst([DX0 + 5, G + 12, DZ0 + 1.5], { n: 10, colors: ['#ece4cc', '#ffffff', '#d8dcf0'], speed: 4.8, up: 4, life: 2, gravity: 1.6, spread: 2, flat: true }); await a.wait(0.25); }
          a.spin('globe', 10, 2);
          await a.tween('logbook', { off: [0, 0, 0], rot: [0, 0, 0] }, 1.2);
        },
      });

      // ── 운석 받침(북쪽): 대리석 받침, 황동 요람, 그 위 별 조각(부품) ──
      const MX = CX - 8, MZ = CZ - 16;
      w.cyl(MX, MZ, G + 1, G + 1, 3.4, B.marbleDk); w.cyl(MX, MZ, G + 2, G + 4, 2.4, B.marble); w.ring(MX, MZ, G + 4, 1.6, 2.6, B.trim);
      w.ring(MX, MZ, G + 5, 1.6, 3.6, B.brass); for (const [dx, dz] of [[3, 0], [-3, 0], [0, 3], [0, -3]]) w.set(MX + dx, G + 6, MZ + dz, B.brassDk);
      const met = w.prop({ name: 'meteorite', pivot: [MX + 0.5, G + 8, MZ + 0.5], axis: 'y', speed: 0.2 });
      met.sphere(MX, G + 8, MZ, 2.1, B.rockM, (dx, dy, dz) => hash3(dx, dy, dz) > 0.12 || Math.hypot(dx, dy, dz) < 1.5);
      for (const [dx, dy, dz] of [[0, 2, 0], [2, 0, 0], [0, 0, -2], [-1, 1, 1], [1, -1, 1]]) met.set(MX + dx, G + 8 + dy, MZ + dz, B.meteor);
      lights.push({ name: 'meteor', p: [MX + 0.5, G + 10, MZ + 0.5], c: '#ffa050', i: 0.5, d: 24, flicker: 0.2, srcR: 4 });
      acts.push({
        name: '별똥별', hint: '하늘에서 별똥별이 떨어져 들어오면 받침 위 운석이 떠올라 함께 빛나요', hit: [MX - 4, G + 1, MZ - 4, MX + 4, G + 12, MZ + 4],
        run: async a => {
          for (let k = 0; k < 3; k++) { a.burst([MX + 12 - k * 8, G + 68, MZ - 12 + k * 6], { n: 22, colors: ['#ffe0a0', '#ffffff', '#ffb86a'], speed: 2, up: -40, life: 1.3, gravity: 24, spread: 2 }); await a.wait(0.5); }
          a.flash('meteor', 6, 3); a.glow(1.6, 3);
          await a.move('meteorite', [0, 5, 0], 1);
          a.spin('meteorite', 12, 2);
          for (let k = 0; k < 5; k++) { a.burst([MX + 0.5, G + 13, MZ + 0.5], { n: 18, colors: ['#ffb86a', '#ffe0a0', '#ff7a3a'], speed: 8, up: 2, life: 1, gravity: 2, spread: 1.2 }); await a.wait(0.35); }
          await a.move('meteorite', [0, 0, 0], 1.2);
        },
      });

      // ── 천장 덮개(부품 둘): 기둥 꼭대기 둘레, 열면 양옆으로 미끄러진다 ──
      const shL = w.prop({ name: 'shutL', pivot: [CX, G + 40, CZ + 0.5] }), shR = w.prop({ name: 'shutR', pivot: [CX + 1, G + 40, CZ + 0.5] });
      for (let dz = -11; dz <= 11; dz++) for (let dx = -11; dx <= 11; dx++) {
        const d = Math.hypot(dx, dz); if (d > 10.4 || d < 3.2) continue;
        const sh = dx < 0 || (dx === 0 && dz < 0) ? shL : shR;
        const rim = Math.abs(d - 9.4) < 1;
        sh.set(CX + dx, G + 40, CZ + dz, rim ? B.brass : (((dx >> 1) + (dz >> 1)) & 1 ? B.chartB : B.cloth1));
        if (rim || Math.abs(dx) <= 0) sh.set(CX + dx, G + 41, CZ + dz, B.brassDk);
        else if (hash3(dx, 41, dz) > 0.93) sh.set(CX + dx, G + 41, CZ + dz, B.starG);
      }
      acts.push({
        name: '천장 열기', hint: '기둥 꼭대기의 천장 덮개가 양쪽으로 미끄러져 열리며 별빛이 쏟아져 내려요', hit: [CX - 10, G + 38, CZ - 10, CX + 10, G + 42, CZ + 10],
        run: async a => {
          await Promise.all([a.move('shutL', [-14, 0, 0], 2), a.move('shutR', [14, 0, 0], 2)]);
          a.glow(1.8, 4);
          for (let k = 0; k < 10; k++) { a.burst([CX + 0.5 + (k % 3 - 1) * 4, G + 60, CZ + 0.5 + (k % 2 ? 4 : -4)], { n: 16, colors: ['#ffffff', '#fff8d0', '#8ab8ff'], speed: 1, up: -4, life: 2.2, gravity: 2.8, spread: 4 }); await a.wait(0.3); }
          await a.wait(0.8);
          await Promise.all([a.move('shutL', [0, 0, 0], 1.8), a.move('shutR', [0, 0, 0], 1.8)]);
        },
      });

      // 바닥 가장자리: 긴 의자, 별 지도 두루마리 통
      for (const [x, z] of [[CX - 24, CZ - 8], [CX - 22, CZ - 14]]) { w.box(x, G + 1, z, x + 1, G + 2, z + 1, B.brassDk); w.box(x, G + 3, z, x + 1, G + 7, z + 1, B.paper); w.box(x, G + 4, z, x + 1, G + 4, z + 1, B.cloth3); }
      { const bx0 = CX - 18, bx1 = CX - 11, bz = CZ + 22;
        for (const x of [bx0, bx1]) w.box(x, G + 1, bz, x, G + 2, bz + 1, B.iron);
        w.box(bx0, G + 3, bz, bx1, G + 3, bz + 1, B.wood); }

      // ── 정문 안쪽: 밖으로 나가기 ──
      acts.push(OR.goAct({ at: [CX, G + 1, CZ + 27], h: 12, name: '밖으로 나가기', goto: 'stellaris', hint: '검은 정문을 열고 천문대 언덕 정상으로 나가요', hit: [CX - 6, G + 1, CZ + 31, CX + 5, G + 15, CZ + 33] }));
      landmarks.push({ name: '대천문대 둥근 홀', note: '바닥의 별 지도 · 천체 모형', p: [CX + 0.5, G + 48, CZ + 0.5], boss: true });
      return { lights, landmarks, acts };
    },
  });
})();
