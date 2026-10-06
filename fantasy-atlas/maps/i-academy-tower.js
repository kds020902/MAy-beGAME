// 대마법사의 탑(하위 지도) — 학원 구역 대마법사의 탑 안. 둥근 1층 현관 홀(룬 원·수정 구·벽난로·서가·연금 탁자·지팡이 걸이)과
// 동쪽 벽을 감아 오르는 나선 계단, 북쪽 반원 2층 별 관측 서재(천체 모형·망원경·부엉이 횃대), 머리 위에 떠 있는 꼭대기 수정.
// 남·동쪽(기본 시점 쪽) 벽은 잘라 낮췄다. 좌표: +x 동쪽, +z 남쪽. 정문은 남쪽 (학원 구역의 하위 지도)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 72, D = 72, Hh = 64, G = 12;
  const CX = 36, CZ = 36, R = 18, RW = 20.2;          // 홀 안쪽 반지름, 벽 바깥 반지름
  MAPS.push({
    id: 'academy-tower', cat: 'magic', sub: true, parent: 'academy', name: '대마법사의 탑', en: 'Arcanum Academy · Archmage Tower', color: '#9a8aff', seed: 3011, base: G, time: 'night', size: [W, D, Hh],
    desc: '학원 구역 한가운데 솟은 대마법사의 탑 안. 1층 둥근 현관 홀 바닥에는 룬 원이 새겨져 있고 한가운데 받침 위에서 수정 구가 빛난다. 벽난로와 서가, 연금 탁자와 지팡이 걸이를 지나 동쪽 벽을 감아 도는 나선 계단을 오르면 별 관측 서재가 나오고, 머리 위에는 꼭대기 수정 방의 수정이 떠서 천천히 돈다.',
    info: { title: '장소 정보', en: 'ARCHMAGE TOWER', rows: [['1층', '현관 홀 · 룬 원 · 수정 구 · 벽난로'], ['2층', '별 관측 서재 · 천체 모형 · 망원경'], ['꼭대기', '수정 방의 큰 수정'], ['주의', '룬 원 한가운데서는 발을 조심할 것']] },
    sky: ['#3a2860', '#120e28', '#a080ff'], stars: true,
    hemi: ['#d8d0ff', '#2a2040', 0.6], sun: ['#e0d8ff', 0.5, [0.45, 1, 0.5]],
    day: { sky: ['#e0d8f8', '#8a90d8', '#fff0ff'], stars: false, hemi: ['#ffffff', '#4a4460', 0.62], sun: ['#fff4e8', 0.72, [0.45, 1, 0.5]] },
    fog: { start: 0.92, floor: G - 14, depth: 8 },
    camY: 7, zoom: 2.2,
    spawn: [CX, G + 1, CZ + R - 4],
    particles: [
      { n: 90, colors: ['#e0d0ff', '#c8a0ff', '#fff8e0'], mode: 'drift', speed: 0.14, area: [CX, CZ, 15], y0: G + 2, y1: G + 22, glow: true },
      { n: 24, colors: ['#ffffff', '#c080ff'], mode: 'wisp', speed: 0.6, size: 2, area: [CX, CZ, 6], y0: G + 16, y1: G + 26 },
      { n: 16, colors: ['#ff9a4a', '#ffd060'], mode: 'rise', speed: 0.5, area: [CX - 16.5, CZ + 0.5, 1], y0: G + 2, y1: G + 8, glow: true },
    ],
    blocks: {
      rock: { c: '#5a5a7a', v: 0.07, pat: 'stone' }, deep: { c: '#3a3a52', v: 0.06, pat: 'stone' },
      pale: { c: '#c8c0d8', v: 0.04, pat: 'brick' }, paleDk: { c: '#9a92b0', v: 0.05, pat: 'brick' }, trim: { c: '#e4deee', v: 0.03 }, gold: { c: '#e0c060', v: 0.06 },
      tileA: { c: '#7a7098', top: '#8e84b0', v: 0.03, pat: 'check', alt: '#6a6088' }, tileB: { c: '#b8b0cc', top: '#cac2dc', v: 0.03, pat: 'check', alt: '#a8a0c0' },
      floorO: { c: '#8a82a0', top: '#a8a0b8', v: 0.06, pat: 'stone' }, board: { c: '#5a3e34', top: '#6e4c3c', v: 0.05, pat: 'plank' }, plank: { c: '#6a4a3a', v: 0.06, pat: 'plank' }, desk: { c: '#4a3028', v: 0.04 },
      door: { c: '#3a2a3a', v: 0.03, pat: 'plank' }, iron: { c: '#3a3848', v: 0.03 }, brass: { c: '#c8a050', v: 0.05 },
      book1: { c: '#8a2a2a', v: 0.05 }, book2: { c: '#2a4a8a', v: 0.05 }, book3: { c: '#3a7a4a', v: 0.05 }, book4: { c: '#7a5a2a', v: 0.05 }, parch: { c: '#e8dcb8', v: 0.04 },
      frieze: { c: '#4a3478', v: 0.04, pat: 'tile' }, rugP: { c: '#5a3a8a', v: 0.04, pat: 'check', alt: '#4e3280' }, rugE: { c: '#c8a050', v: 0.04 }, velvet: { c: '#7a2a5a', v: 0.04 }, bark: { c: '#4a3a3a', v: 0.06 },
      win: { c: '#c8b0ff', night: true, day: '#8a9ad0' }, lamp: { c: '#ffe0a0', glow: true }, candle: { c: '#fff0c0', glow: true },
      crys: { c: '#c080ff', glow: true }, crys2: { c: '#80e0ff', glow: true }, rune: { c: '#a890ff', glow: true }, mana: { c: '#a0d0ff', glow: true },
      flame: { c: '#ff8a3a', glow: true }, ember: { c: '#ffd060', glow: true }, owl: { c: '#7a5a3a', v: 0.08 }, owlW: { c: '#e8dcc0', v: 0.05 }, letter: { c: '#f4ecd8', v: 0.02 }, seal: { c: '#c02a3a', v: 0.03 },
      potG: { c: '#8aff5a', glow: true }, potR: { c: '#ff6a8a', glow: true }, glass: { c: '#b8e0f0', v: 0.03 },
    },
    build(w) {
      const B = w.id;
      w.hm = new Int16Array(W * D).fill(-1);
      const lights = [], acts = [], landmarks = [];
      const rad = (x, z) => Math.hypot(x - CX, z - CZ);
      const ang = (x, z) => { let a = Math.atan2(z - CZ, x - CX) * 180 / Math.PI; return a < 0 ? a + 360 : a; };   // 0 동 · 90 남 · 180 서 · 270 북
      const sgn = a => a > 180 ? a - 360 : a;
      const P = (a, r) => [Math.round(CX + Math.cos(a * Math.PI / 180) * r), Math.round(CZ + Math.sin(a * Math.PI / 180) * r)];
      // 계단: 동쪽 벽을 따라 40°에서 -15°까지(시계 반대로) 아홉 칸 오른다
      const S0 = 40, S1 = -15;
      const stairH = (x, z) => { const r = rad(x, z), s = sgn(ang(x, z)); if (r < 13.4 || r >= R || s > S0 || s < S1) return 0; return Math.min(9, 1 + Math.floor((S0 - s) / (S0 - S1) * 9)); };
      // 2층 서재: 북쪽 반원 띠(반지름 12~18, 195°~345°)
      const isGal = (x, z) => { const r = rad(x, z), a = ang(x, z); return r >= 12 && r < R && a >= 195 && a <= 345; };

      // ── 떠 있는 받침 섬과 바깥 발코니 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rad(x, z); if (r > 27.5) continue;
        const k = 1 - r / 27.5, bottom = G - 2 - Math.floor(Math.pow(k, 0.6) * 16 + hash3(x, 1, z) * 3);
        for (let y = bottom; y < G; y++) w.set(x, y, z, y < bottom + 3 ? B.deep : B.rock);
        let top;
        if (r < R) { const band = Math.floor(r / 3), seg = Math.floor(ang(x, z) / 22.5); top = r < 3 ? B.tileB : (band + seg) % 2 ? B.tileA : B.tileB; }
        else top = r > 26.5 ? B.paleDk : (Math.floor(ang(x, z) / 10) % 2 ? B.floorO : B.paleDk);
        w.set(x, G, z, top); w.hm[x + W * z] = G;
        if (r > 26.6) { w.set(x, G + 1, z, B.trim); if (Math.floor(ang(x, z) / 15) % 2 === 0 && hash3(x, 2, z) > 0.5) w.set(x, G + 2, z, B.trim); }
      }
      // 바닥 무늬: 룬 원(바깥 원·안쪽 원·여덟 갈래 별)
      for (let z = CZ - 8; z <= CZ + 8; z++) for (let x = CX - 8; x <= CX + 8; x++) {
        const r = rad(x, z), a = ang(x, z);
        if ((r >= 6.4 && r < 7.4) || (r >= 2.6 && r < 3.4)) w.set(x, G, z, B.rune);
        else if (r > 3.4 && r < 6.4 && Math.abs(((a + 22.5) % 45) - 22.5) * r * Math.PI / 180 < 0.5) w.set(x, G, z, B.gold);
      }

      // ── 둥근 벽: 뒤(북·서)는 높게, 앞(남·동)은 낮게 잘랐다. 계단 옆은 난간 높이만큼 남긴다 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rad(x, z); if (r < R || r >= RW) continue;
        const a = ang(x, z), facing = Math.cos((a - 45) * Math.PI / 180);
        let top = facing > 0.3 ? G + 3 : facing > 0 ? G + 9 : G + 24;
        const s = sgn(a); if (s <= S0 + 4 && s >= S1 - 4) top = Math.max(top, G + Math.min(9, 1 + Math.floor((S0 - Math.min(S0, Math.max(S1, s))) / (S0 - S1) * 9)) + 2);
        for (let y = G + 1; y <= top; y++) w.set(x, y, z, y === G + 1 ? B.paleDk : (y === top ? B.trim : ((y - G) % 8 === 0 ? B.paleDk : B.pale)));
        if (top >= G + 24) { w.set(x, top - 1, z, B.gold); if (Math.floor(a / 6) % 2 === 0) w.set(x, top + 1, z, B.trim); }
        if (top >= G + 24 && r < R + 0.9) {                                   // 안쪽 면: 보라 띠와 금 기둥(벽기둥)
          for (const y of [G + 17, G + 18]) w.set(x, y, z, y === G + 17 ? B.frieze : B.gold);
          if (Math.abs(((a + 11.25) % 22.5) - 11.25) * Math.PI / 180 * R < 0.6) for (let y = G + 1; y <= G + 23; y++) w.set(x, y, z, y === G + 8 || y === G + 16 ? B.gold : B.trim);
        }
      }
      // 창: 서재 높이(2층)와 그 위(첨탑 창), 1층 서남쪽 두 개
      const win = (a, y0, y1) => {
        for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
          const r = rad(x, z); if (r < R || r >= RW) continue;
          const da = Math.abs(sgn(ang(x, z) - a)) * Math.PI / 180 * R; if (da > 1.1) continue;
          for (let y = y0; y <= y1; y++) w.set(x, y, z, B.win);
          w.set(x, y1 + 1, z, B.gold); w.set(x, y0 - 1, z, B.trim);
        }
      };
      for (const a of [205, 250, 290, 335]) win(a, G + 12, G + 16);
      for (const a of [180, 225, 270, 315]) win(a, G + 19, G + 21);
      for (const a of [125, 150]) win(a, G + 3, G + 6);

      // ── 정문(남쪽): 금테 아치 기둥, 안쪽 움푹한 자리, 닫힌 문짝 ──
      const DZ0 = CZ + R - 1;
      w.box(CX - 2, G + 1, DZ0, CX + 2, G + 7, CZ + R + 2, 0);
      w.box(CX - 2, G + 1, CZ + R + 2, CX + 2, G + 6, CZ + R + 2, B.door);
      w.box(CX, G + 1, CZ + R + 2, CX, G + 6, CZ + R + 2, B.iron);
      for (const bx of [CX - 3, CX + 3]) { w.box(bx, G + 1, DZ0, bx, G + 7, CZ + R + 2, B.trim); w.set(bx, G + 4, DZ0, B.rune); }
      w.box(CX - 3, G + 7, DZ0, CX + 3, G + 7, CZ + R + 2, B.gold); w.box(CX - 2, G + 8, DZ0 + 1, CX + 2, G + 8, CZ + R + 2, B.gold); w.set(CX, G + 9, CZ + R + 1, B.crys);
      for (let x = CX - 2; x <= CX + 2; x++) for (let z = DZ0; z <= CZ + R + 1; z++) w.set(x, G, z, B.paleDk);
      for (let z = CZ + R - 4; z <= CZ + R - 2; z++) for (let x = CX - 2; x <= CX + 2; x++) w.set(x, G, z, x === CX - 2 || x === CX + 2 ? B.rugE : B.rugP);
      acts.push(OR.goAct({ at: [CX, G + 1, CZ + R - 1], name: '밖으로 나가기', goto: 'academy', hint: '금테 아치 정문을 열고 학원 구역의 탑 앞 계단으로 나가요', hit: [CX - 2, G + 1, CZ + R - 1, CX + 2, G + 6, CZ + R + 1] }));

      // ── 나선 계단(동쪽 벽을 감아 2층으로) ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const h = stairH(x, z); if (!h) continue;
        for (let y = G + 1; y <= G + h; y++) w.set(x, y, z, y === G + h ? (rad(x, z) > 17 ? B.paleDk : B.board) : B.paleDk);
      }
      // 계단 안쪽 난간(바닥에서 떨어지지 않게): 반지름 13 줄
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rad(x, z), s = sgn(ang(x, z)); if (r < 12.6 || r >= 13.4 || s > S0 - 6 || s < S1) continue;
        const h = Math.min(9, 1 + Math.floor((S0 - s) / (S0 - S1) * 9));
        for (let y = G + 1; y <= G + h; y++) w.set(x, y, z, B.paleDk); w.set(x, G + h + 1, z, B.trim);
      }

      // ── 2층 별 관측 서재: 널마루 반원, 안쪽 난간 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) if (isGal(x, z) && !stairH(x, z)) { w.set(x, G + 9, z, B.board); w.set(x, G + 8, z, B.plank); }
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        if (!isGal(x, z)) continue;
        let edge = false;
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = x + dx, nz = z + dz; if (rad(nx, nz) < R && !isGal(nx, nz) && !stairH(nx, nz) ) edge = true; }
        if (edge) { w.set(x, G + 10, z, (x + z) % 3 ? B.trim : B.gold); if ((x * 7 + z) % 5 === 0) { w.set(x, G + 11, z, B.trim); w.set(x, G + 12, z, B.candle); } }
      }
      // 서재 아래 버팀 기둥과 금 까치발
      for (const a of [205, 240, 275, 310, 340]) { const [x, z] = P(a, 12.4); w.box(x, G + 1, z, x, G + 8, z, B.pale); w.set(x, G + 8, z, B.gold); }

      // ── 1층 서가(북쪽 벽, 서재 아래) ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rad(x, z), a = ang(x, z); if (r < 16.4 || r >= R || a < 200 || a > 342) continue;
        for (let y = G + 1; y <= G + 7; y++) {
          const k = hash3(x, y, z);
          w.set(x, y, z, (y - G) % 3 === 0 || y === G + 7 ? B.plank : (k > 0.92 ? 0 : [B.book1, B.book2, B.book3, B.book4][(k * 4) | 0]));
        }
      }
      // 서가 앞 독서대 둘과 쌓인 책
      for (const a of [228, 300]) { const [x, z] = P(a, 14.6); w.box(x, G + 1, z, x, G + 2, z, B.plank); w.set(x, G + 3, z, B.parch); }
      for (const a of [215, 262, 322]) { const [x, z] = P(a, 15.4); const n = 1 + ((a * 7) % 3); for (let k = 0; k < n; k++) w.set(x, G + 1 + k, z, [B.book1, B.book2, B.book3][k % 3]); }

      // ── 벽난로(서쪽 벽)와 보라 양탄자, 안락의자 두 개 ──
      const HX = CX - R;
      w.box(HX, G + 1, CZ - 3, HX + 2, G + 8, CZ + 3, B.paleDk);
      w.box(HX + 1, G + 1, CZ - 2, HX + 2, G + 4, CZ + 2, 0);
      w.box(HX + 1, G + 1, CZ - 2, HX + 1, G + 1, CZ + 2, B.ember); w.box(HX + 1, G + 2, CZ - 1, HX + 1, G + 2, CZ + 1, B.flame); w.set(HX + 1, G + 3, CZ, B.flame);
      w.box(HX + 2, G + 1, CZ - 2, HX + 2, G + 1, CZ - 2, B.iron); w.box(HX + 2, G + 1, CZ + 2, HX + 2, G + 1, CZ + 2, B.iron);
      w.box(HX + 3, G + 5, CZ - 3, HX + 3, G + 5, CZ + 3, B.trim);
      w.set(HX + 3, G + 6, CZ - 2, B.candle); w.set(HX + 3, G + 6, CZ + 2, B.candle); w.set(HX + 3, G + 6, CZ, B.crys); w.set(HX + 3, G + 6, CZ + 1, B.book2);
      w.box(HX + 1, G + 9, CZ - 2, HX + 2, G + 22, CZ + 2, B.pale); w.box(HX + 2, G + 9, CZ - 2, HX + 2, G + 9, CZ + 2, B.gold);
      for (let z = CZ - 4; z <= CZ + 4; z++) for (let x = HX + 4; x <= HX + 9; x++) w.set(x, G, z, x === HX + 4 || x === HX + 9 || z === CZ - 4 || z === CZ + 4 ? B.rugE : B.rugP);
      for (const z of [CZ - 4, CZ + 3]) { w.box(HX + 6, G + 1, z, HX + 7, G + 1, z + 1, B.velvet); w.box(HX + 8, G + 1, z, HX + 8, G + 3, z + 1, B.velvet); w.set(HX + 8, G + 4, z, B.gold); }
      w.set(HX + 6, G + 1, CZ, B.desk); w.set(HX + 6, G + 2, CZ, B.potR);
      lights.push({ name: 'hearth', p: [HX + 1.5, G + 2.5, CZ + 0.5], c: '#ff9a4a', i: 1.4, d: 16, flicker: 0.32 });

      // ── 연금 탁자(남서쪽)와 지팡이 걸이 ──
      { const [x, z] = P(128, 13.2);
        w.box(x - 1, G + 1, z - 1, x + 1, G + 1, z, B.desk); w.box(x - 2, G + 2, z - 1, x + 2, G + 2, z, B.plank);
        w.set(x - 2, G + 3, z - 1, B.potG); w.set(x - 1, G + 3, z, B.glass); w.set(x - 1, G + 4, z, B.mana); w.set(x, G + 3, z - 1, B.iron); w.set(x, G + 4, z - 1, B.flame); w.set(x + 1, G + 3, z, B.crys); w.set(x + 2, G + 3, z - 1, B.book1); w.set(x + 2, G + 4, z - 1, B.book2);
        lights.push({ name: 'alch', p: [x + 0.5, G + 4, z + 0.5], c: '#a0ffb0', i: 0.9, d: 10, flicker: 0.2 }); }
      const [SX, SZ] = P(152, 16.2);
      w.box(SX, G + 1, SZ - 2, SX, G + 1, SZ + 2, B.iron); w.box(SX, G + 5, SZ - 2, SX, G + 5, SZ + 2, B.iron);
      for (const dz of [-2, 0, 2]) { w.box(SX, G + 2, SZ + dz, SX, G + 6, SZ + dz, B.bark); w.set(SX, G + 7, SZ + dz, dz ? B.crys2 : B.crys); }
      const staff = w.prop({ name: 'staff', pivot: [SX + 2.5, G + 4, SZ + 0.5], axis: 'y', bob: 0.2, bobSpeed: 1.1 });
      staff.box(SX + 2, G + 2, SZ, SX + 2, G + 6, SZ, B.bark); staff.set(SX + 2, G + 7, SZ, B.gold); staff.set(SX + 2, G + 8, SZ, B.crys); staff.set(SX + 3, G + 7, SZ, B.mana); staff.set(SX + 1, G + 7, SZ, B.mana);
      lights.push({ name: 'staff', p: [SX + 2.5, G + 8, SZ + 0.5], c: '#c080ff', i: 0.9, d: 10, flicker: 0.1 });
      acts.push({
        name: '마법 지팡이', hint: '걸이 앞에 선 지팡이가 떠올라 빙글 돌며 보랏빛 불꽃을 흩뿌려요', hit: [SX - 1, G + 1, SZ - 2, SX + 3, G + 8, SZ + 2],
        run: async a => {
          a.flash('staff', 4, 3.5); a.spin('staff', 6, 3);
          await a.move('staff', [0, 4, 0], 1);
          for (let k = 0; k < 5; k++) { a.burst([SX + 2.5, G + 12, SZ + 0.5], { n: 22, colors: ['#c080ff', '#ffffff', '#80e0ff'], speed: 6, up: 2, life: 1.1, gravity: 1, spread: 0.6 }); await a.wait(0.35); }
          await a.move('staff', [0, 0, 0], 1);
        },
      });

      // ── 룬 원과 수정 구(한가운데) ──
      w.box(CX - 1, G + 1, CZ - 1, CX + 1, G + 1, CZ + 1, B.paleDk); w.set(CX, G + 2, CZ, B.pale); w.set(CX, G + 3, CZ, B.gold);
      const scry = w.prop({ name: 'scry', pivot: [CX + 0.5, G + 5, CZ + 0.5], axis: 'y', speed: 0.3, bob: 0.15, bobSpeed: 0.8 });
      scry.sphere(CX, G + 5, CZ, 1.3, B.crys2); scry.set(CX, G + 5, CZ, B.mana);
      lights.push({ name: 'scry', p: [CX + 0.5, G + 5, CZ + 0.5], c: '#80e0ff', i: 1.2, d: 14, flicker: 0.08 });
      const ring = w.prop({ name: 'runering', pivot: [CX + 0.5, G + 1.5, CZ + 0.5], axis: 'y' });
      for (let k = 0; k < 16; k++) { const t = k / 16 * Math.PI * 2, x = Math.round(CX + Math.cos(t) * 5), z = Math.round(CZ + Math.sin(t) * 5); ring.set(x, G + 1, z, k % 2 ? B.rune : B.crys); }
      lights.push({ name: 'rune', p: [CX + 5.5, G + 2, CZ + 0.5], c: '#a890ff', i: 1, d: 14, flicker: 0.1 });
      acts.push({
        name: '룬 원 밟기', hint: '바닥 룬 원에 발을 올리면 룬 고리가 떠올라 돌며 보랏빛이 홀을 채워요', hit: [CX - 6, G + 1, CZ + 5, CX + 6, G + 1, CZ + 7],
        run: async a => {
          a.flash('rune', 4, 4.5); a.glow(1.6, 4.5); a.spin('runering', 6, 4);
          await a.move('runering', [0, 5, 0], 1.2);
          for (let k = 0; k < 6; k++) { const t = k / 6 * Math.PI * 2; a.burst([CX + 0.5 + Math.cos(t) * 5, G + 6, CZ + 0.5 + Math.sin(t) * 5], { n: 14, colors: ['#a890ff', '#ffffff', '#c080ff'], speed: 2, up: 3, life: 1.2, gravity: -0.6, spread: 0.6 }); await a.wait(0.25); }
          await a.move('runering', [0, 0, 0], 1.4);
        },
      });
      acts.push({
        name: '수정 구 들여다보기', hint: '받침 위 수정 구가 떠올라 돌며 안개 속에 별빛이 비쳐요', hit: [CX - 1, G + 1, CZ - 1, CX + 1, G + 7, CZ + 1],
        run: async a => {
          a.flash('scry', 5, 4); a.spin('scry', 5, 4);
          await a.move('scry', [0, 3, 0], 1);
          for (let k = 0; k < 6; k++) { a.burst([CX + 0.5, G + 8, CZ + 0.5], { n: 18, colors: ['#80e0ff', '#e0f8ff', '#c080ff'], speed: 1.4, up: 0.6, life: 1.6, gravity: -0.2, spread: 1.4 }); await a.wait(0.3); }
          await a.move('scry', [0, 0, 0], 1.2);
        },
      });

      // ── 떠다니는 책(룬 원 둘레를 천천히 돈다) ──
      const tomes = w.prop({ name: 'tomes', pivot: [CX + 0.5, G + 7, CZ + 0.5], axis: 'y', speed: 0.22, bob: 0.25, bobSpeed: 0.9 });
      for (let k = 0; k < 10; k++) {
        const t = k / 10 * Math.PI * 2, x = Math.round(CX + Math.cos(t) * 9), z = Math.round(CZ + Math.sin(t) * 9), y = G + 6 + (k % 3);
        tomes.box(x, y, z, x, y + 1, z, [B.book1, B.book2, B.book3, B.book4][k % 4]); tomes.set(x, y + 2, z, B.parch); if (k % 2) tomes.set(x, y + 1, z, B.gold);
      }
      acts.push({
        name: '떠다니는 책 부르기', hint: '홀을 떠돌던 책들이 빠르게 날아올라 책장이 펄럭이며 종이가 흩날려요', hit: [CX - 10, G + 5, CZ - 10, CX + 10, G + 9, CZ + 10],
        run: async a => {
          a.spin('tomes', 7, 4.5);
          await a.move('tomes', [0, 5, 0], 1.3);
          for (let k = 0; k < 5; k++) { a.burst([CX + 0.5, G + 13, CZ + 0.5], { n: 26, colors: ['#f4ecd8', '#e8dcb8', '#ffffff'], speed: 7, up: 1, life: 1.6, gravity: 2, spread: 2, flat: true }); await a.wait(0.4); }
          await a.move('tomes', [0, 0, 0], 1.5);
        },
      });

      // ── 2층: 천체 모형 · 망원경 · 별 지도 책상 · 부엉이 횃대 ──
      const [OX, OZ] = P(222, 15);
      w.set(OX, G + 10, OZ, B.paleDk); w.set(OX, G + 11, OZ, B.brass);
      const orr = w.prop({ name: 'orrery', pivot: [OX + 0.5, G + 13, OZ + 0.5], axis: 'y', speed: 0.25 });
      orr.box(OX, G + 12, OZ, OX, G + 13, OZ, B.brass); orr.set(OX, G + 14, OZ, B.ember);
      for (const [r, y, c, n] of [[2, G + 13, B.crys2, 2], [3, G + 12, B.potR, 3]]) for (let k = 0; k < n; k++) {
        const t = k / n * Math.PI * 2 + r, x = Math.round(OX + Math.cos(t) * r), z = Math.round(OZ + Math.sin(t) * r);
        orr.line(OX, y, OZ, x, y, z, B.brass); orr.set(x, y + 1, z, c);
      }
      lights.push({ name: 'orrery', p: [OX + 0.5, G + 14, OZ + 0.5], c: '#ffd060', i: 1, d: 12, flicker: 0.06 });
      acts.push({
        name: '천체 모형 돌리기', hint: '서재의 놋쇠 천체 모형이 빠르게 돌며 해 구슬이 환하게 빛나요', hit: [OX - 3, G + 10, OZ - 3, OX + 3, G + 15, OZ + 3],
        run: async a => {
          a.flash('orrery', 4, 4); a.spin('orrery', 9, 4);
          for (let k = 0; k < 6; k++) { a.burst([OX + 0.5, G + 15, OZ + 0.5], { n: 12, colors: ['#ffd060', '#ffffff'], speed: 3, up: 1, life: 1, gravity: 0, spread: 0.4, flat: true }); await a.wait(0.5); }
          await a.move('orrery', [0, 1.8, 0], 0.6); await a.move('orrery', [0, 0, 0], 0.6);
        },
      });
      { const [x, z] = P(270, 15.5);                                           // 망원경: 북쪽 창을 겨눈다
        w.box(x - 1, G + 10, z + 1, x - 1, G + 10, z + 1, B.iron); w.box(x + 1, G + 10, z + 1, x + 1, G + 10, z + 1, B.iron); w.set(x, G + 10, z - 1, B.iron); w.box(x, G + 11, z, x, G + 11, z, B.iron);
        w.set(x, G + 12, z + 1, B.brass); w.set(x, G + 12, z, B.brass); w.set(x, G + 13, z - 1, B.brass); w.set(x, G + 14, z - 2, B.gold); w.set(x, G + 13, z, B.gold); }
      { const [x, z] = P(312, 15);                                             // 별 지도 책상
        w.box(x - 1, G + 10, z, x + 1, G + 10, z, B.desk); w.box(x - 1, G + 11, z - 1, x + 1, G + 11, z, B.desk);
        w.set(x - 1, G + 12, z, B.parch); w.set(x, G + 12, z, B.parch); w.set(x + 1, G + 12, z - 1, B.candle); w.set(x, G + 12, z - 1, B.book2);
        w.set(x, G + 10, z + 2, B.velvet); w.set(x, G + 11, z + 3, B.velvet); }
      const [PX, PZ] = P(252, 16.4);                                          // 부엉이 횃대(북쪽 창 앞)
      w.box(PX, G + 10, PZ, PX, G + 12, PZ, B.iron); w.box(PX - 1, G + 12, PZ, PX + 1, G + 12, PZ, B.bark); w.set(PX + 1, G + 10, PZ, B.plank);
      const owl = w.prop({ name: 'owl', pivot: [PX + 0.5, G + 14, PZ + 0.5] });
      owl.box(PX, G + 13, PZ, PX, G + 14, PZ + 1, B.owl); owl.box(PX, G + 15, PZ, PX, G + 15, PZ + 1, B.owlW); owl.set(PX + 1, G + 15, PZ, B.ember); owl.set(PX + 1, G + 15, PZ + 1, B.ember);
      owl.box(PX, G + 14, PZ - 1, PX, G + 14, PZ - 1, B.owl); owl.box(PX, G + 14, PZ + 2, PX, G + 14, PZ + 2, B.owl); owl.set(PX + 1, G + 13, PZ, B.letter); owl.set(PX + 1, G + 13, PZ + 1, B.seal);
      const owlPts = [];
      for (let i = 1; i <= 12; i++) { const t = Math.atan2(PZ - CZ, PX - CX) + i / 12 * Math.PI * 2, r = 9 + Math.sin(i / 12 * Math.PI) * 2; owlPts.push([CX + Math.cos(t) * r - PX, 3 + Math.sin(i / 12 * Math.PI) * 5, CZ + Math.sin(t) * r - PZ]); }
      owlPts.push([0, 0.6, 0]);
      acts.push({
        name: '부엉이 편지', hint: '횃대의 부엉이가 편지를 물고 날아올라 홀을 한 바퀴 돌고 돌아와요', hit: [PX - 2, G + 10, PZ - 2, PX + 2, G + 15, PZ + 2],
        run: async a => {
          a.burst([PX + 0.5, G + 14, PZ + 0.5], { n: 18, colors: ['#e8dcc0', '#7a5a3a'], speed: 3, up: 2, life: 1.2, gravity: 3, spread: 1 });
          await a.drive('owl', owlPts, 7, { fwd: '+x', back: 0.8 });
          a.burst([PX + 0.5, G + 14, PZ + 0.5], { n: 14, colors: ['#f4ecd8', '#ffd060'], speed: 2, up: 1, life: 1, gravity: 2, spread: 1 });
        },
      });

      // ── 꼭대기 수정 방의 수정(머리 위에 떠서 돈다) ──
      const AY = G + 22;
      const apex = w.prop({ name: 'apex', pivot: [CX + 0.5, AY, CZ + 0.5], axis: 'y', speed: 0.35, bob: 0.4, bobSpeed: 0.6 });
      for (let dy = -4; dy <= 4; dy++) { const r = 1.6 - Math.abs(dy) * 0.38; if (r < 0.3) { apex.set(CX, AY + dy, CZ, B.crys); continue; } for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) if (Math.abs(dx) + Math.abs(dz) <= r + 0.2) apex.set(CX + dx, AY + dy, CZ + dz, Math.abs(dx) + Math.abs(dz) < r - 0.8 ? B.mana : B.crys); }
      const halo = w.prop({ name: 'halo', pivot: [CX + 0.5, AY, CZ + 0.5], axis: 'y', speed: -0.6 });
      for (let k = 0; k < 6; k++) { const t = k / 6 * Math.PI * 2, x = Math.round(CX + Math.cos(t) * 5), z = Math.round(CZ + Math.sin(t) * 5), y = AY - 1 + (k % 2) * 2; halo.box(x, y - 1, z, x, y + 1, z, k % 2 ? B.crys2 : B.crys); }
      lights.push({ name: 'apex', p: [CX + 0.5, AY, CZ + 0.5], c: '#b080ff', i: 1.4, d: 22, flicker: 0.08 });
      acts.push({
        name: '꼭대기 수정의 공명', hint: '머리 위 꼭대기 수정과 작은 수정들이 공명하며 빠르게 돌고 탑 안이 보랏빛으로 물들어요', hit: [CX - 5, G + 10, CZ - 11, CX + 5, AY + 5, CZ + 5],
        run: async a => {
          a.flash('apex', 4, 5); a.glow(1.8, 5); a.spin('apex', 5, 5); a.spin('halo', 8, 5);
          await a.move('halo', [0, -3, 0], 1.2);
          for (let k = 0; k < 5; k++) { a.burst([CX + 0.5, AY, CZ + 0.5], { n: 30, colors: ['#c080ff', '#80e0ff', '#ffffff'], speed: 8, up: 0, life: 1.2, gravity: 0, spread: 1, flat: true }); await a.wait(0.45); }
          a.lightning(0.3);
          await a.move('halo', [0, 0, 0], 1.2);
        },
      });

      landmarks.push({ name: '룬 원', note: '수정 구가 떠 있는 현관 홀', p: [CX + 0.5, G + 10, CZ + 0.5] });
      landmarks.push({ name: '별 관측 서재', note: '천체 모형과 망원경', p: [CX + 0.5, G + 20, CZ - 15.5] });
      return { lights, landmarks, acts };
    },
  });
})();
