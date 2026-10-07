// 대마법사의 탑(하위 지도) — 학원 구역 대마법사의 탑 안. 둥근 1층 현관 홀(룬 원·수정 구·벽난로·서가·연금 탁자·지팡이 걸이)과
// 동쪽 벽을 감아 오르는 나선 계단, 북쪽 반원 2층 별 관측 서재(천체 모형·망원경·부엉이 횃대), 머리 위에 떠 있는 꼭대기 수정.
// 2배 해상도(1칸 ≈ 25cm): 낱돌 벽과 벽기둥, 창살 아치 창, 높이가 제각각인 책등, 벽돌 벽난로와 불받이, 다리 달린 가구 등.
// 남·동쪽(기본 시점 쪽) 벽은 잘라 낮췄다. 좌표: +x 동쪽, +z 남쪽. 정문은 남쪽 (학원 구역의 하위 지도)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 144, D = 144, Hh = 128, G = 24;
  const CX = 72, CZ = 72, R = 36, RW = 40.4;          // 홀 안쪽 반지름, 벽 바깥 반지름
  MAPS.push({
    id: 'academy-tower', cat: 'magic', sub: true, parent: 'academy', name: '대마법사의 탑', en: 'Arcanum Academy · Archmage Tower', color: '#9a8aff', seed: 3011, base: G, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '학원 구역 한가운데 솟은 대마법사의 탑 안. 1층 둥근 현관 홀 바닥에는 룬 원이 새겨져 있고 한가운데 받침 위에서 수정 구가 빛난다. 벽난로와 서가, 연금 탁자와 지팡이 걸이를 지나 동쪽 벽을 감아 도는 나선 계단을 오르면 별 관측 서재가 나오고, 머리 위에는 꼭대기 수정 방의 수정이 떠서 천천히 돈다.',
    info: { title: '장소 정보', en: 'ARCHMAGE TOWER', rows: [['1층', '현관 홀 · 룬 원 · 수정 구 · 벽난로'], ['2층', '별 관측 서재 · 천체 모형 · 망원경'], ['꼭대기', '수정 방의 큰 수정'], ['주의', '룬 원 한가운데서는 발을 조심할 것']] },
    sky: ['#3a2860', '#120e28', '#a080ff'], stars: true,
    hemi: ['#d8d0ff', '#2a2040', 0.6], sun: ['#e0d8ff', 0.5, [0.45, 1, 0.5]],
    day: { sky: ['#e0d8f8', '#8a90d8', '#fff0ff'], stars: false, hemi: ['#ffffff', '#4a4460', 0.62], sun: ['#fff4e8', 0.72, [0.45, 1, 0.5]] },
    fog: { start: 0.92, floor: G - 28, depth: 16 },
    camY: 14, zoom: 2.2,
    spawn: [CX, G + 1, CZ + R - 8],
    particles: [
      { n: 110, colors: ['#e0d0ff', '#c8a0ff', '#fff8e0'], mode: 'drift', speed: 0.28, area: [CX, CZ, 30], y0: G + 4, y1: G + 44, glow: true },
      { n: 30, colors: ['#ffffff', '#c080ff'], mode: 'wisp', speed: 1.2, size: 2, area: [CX, CZ, 12], y0: G + 32, y1: G + 52 },
      { n: 20, colors: ['#ff9a4a', '#ffd060'], mode: 'rise', speed: 1, area: [CX - 33, CZ + 0.5, 2], y0: G + 3, y1: G + 16, glow: true },
    ],
    blocks: {
      rock: { c: '#5a5a7a', v: 0.07, pat: 'stone' }, deep: { c: '#3a3a52', v: 0.06, pat: 'stone' },
      pale: { c: '#c8c0d8', v: 0.04 }, paleDk: { c: '#9a92b0', v: 0.04 }, trim: { c: '#e4deee', v: 0.03 }, gold: { c: '#e0c060', v: 0.05 },
      st1: { c: '#c8c0d8', v: 0.03 }, st2: { c: '#b8b0cc', v: 0.03 }, st3: { c: '#d4cee2', v: 0.03 }, st4: { c: '#bcb4d0', v: 0.03 }, mortar: { c: '#9a92b0', v: 0.03 },
      brick: { c: '#7a5a6a', v: 0.04 }, brick2: { c: '#6a4a5a', v: 0.04 }, soot: { c: '#2a2028', v: 0.03 },
      tileA: { c: '#7a7098', top: '#8e84b0', v: 0.03 }, tileB: { c: '#b8b0cc', top: '#cac2dc', v: 0.03 }, tileJ: { c: '#6a6088', top: '#6a6088', v: 0.02 },
      floorO: { c: '#8a82a0', top: '#a8a0b8', v: 0.05 }, board: { c: '#5a3e34', top: '#6e4c3c', v: 0.04 }, board2: { c: '#5a3e34', top: '#62443a', v: 0.04 }, plank: { c: '#6a4a3a', v: 0.05 }, desk: { c: '#4a3028', v: 0.04 }, deskLt: { c: '#5e3e32', v: 0.04 },
      door: { c: '#3a2a3a', v: 0.03, pat: 'plank' }, doorDk: { c: '#2a1e2a', v: 0.03 }, iron: { c: '#3a3848', v: 0.03 }, brass: { c: '#c8a050', v: 0.04 },
      book1: { c: '#8a2a2a', v: 0.04 }, book2: { c: '#2a4a8a', v: 0.04 }, book3: { c: '#3a7a4a', v: 0.04 }, book4: { c: '#7a5a2a', v: 0.04 }, book5: { c: '#5a3a7a', v: 0.04 }, parch: { c: '#e8dcb8', v: 0.03 },
      frieze: { c: '#4a3478', v: 0.04 }, rugP: { c: '#5a3a8a', v: 0.03 }, rugP2: { c: '#4e3280', v: 0.03 }, rugE: { c: '#c8a050', v: 0.03 }, velvet: { c: '#7a2a5a', v: 0.04 }, velvetDk: { c: '#5e1e46', v: 0.04 }, bark: { c: '#4a3a3a', v: 0.05 },
      win: { c: '#c8b0ff', night: true, day: '#8a9ad0' }, lamp: { c: '#ffe0a0', glow: true }, candle: { c: '#fff0c0', glow: true }, wax: { c: '#f0e8d8', v: 0.02 },
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
      const STONES = [B.st1, B.st2, B.st3, B.st1, B.st4, B.st2];
      const stoneAt = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return 0;
        return STONES[(hash3(Math.floor(uu / 6), c, salt) * 6) | 0];
      };
      const BOOKS = [B.book1, B.book2, B.book3, B.book4, B.book5];
      // 책장 칸: 6칸마다 선반, 책등마다 높이가 다르다(u는 가로 순번)
      const shelfAt = (u, y, y0, top) => {
        const k = y - y0;
        if (k % 6 === 0 || y === top) return B.plank;
        const s = Math.floor(k / 6), hh = hash3(u, s, 5), h = 3 + ((hh * 3) | 0);
        if (hh > 0.92 || (k % 6) > h) return 0;
        return BOOKS[(hash3(u >> (hh > 0.5 ? 0 : 1), s, 9) * 5) | 0];
      };
      // 계단: 동쪽 벽을 따라 40°에서 -15°까지(시계 반대로) 열여덟 단(한 단 1칸) 오른다
      const S0 = 40, S1 = -15, NS = 18;
      const stairH = (x, z) => { const r = rad(x, z), s = sgn(ang(x, z)); if (r < 26.8 || r >= R || s > S0 || s < S1) return 0; return Math.min(NS, 1 + Math.floor((S0 - s) / (S0 - S1) * NS)); };
      // 2층 서재: 북쪽 반원 띠(반지름 24~36, 195°~345°), 바닥 G+18
      const GF = G + 18;
      const isGal = (x, z) => { const r = rad(x, z), a = ang(x, z); return r >= 24 && r < R && a >= 195 && a <= 345; };

      // ── 떠 있는 받침 섬과 바깥 발코니 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rad(x, z); if (r > 55) continue;
        const k = 1 - r / 55, bottom = G - 4 - Math.floor(Math.pow(k, 0.6) * 32 + hash3(x >> 1, 1, z >> 1) * 6);
        for (let y = bottom; y < G; y++) w.set(x, y, z, y < bottom + 6 ? B.deep : B.rock);
        let top;
        if (r < R) {
          const band = Math.floor(r / 6), seg = Math.floor(ang(x, z) / 22.5), jr = r % 6 < 0.7;
          top = r < 6 ? B.tileB : jr ? B.tileJ : ((band + seg) % 2 ? B.tileA : B.tileB);
        } else top = r > 53 ? B.paleDk : (Math.floor(ang(x, z) / 10) % 2 ? B.floorO : B.paleDk);
        w.set(x, G, z, top); w.hm[x + W * z] = G;
        if (r > 53.2) { w.set(x, G + 1, z, B.paleDk); w.set(x, G + 5, z, B.trim); const u = Math.round(ang(x, z) * 0.94); if (u % 2 === 0) for (let y = G + 2; y <= G + 4; y++) w.set(x, y, z, u % 12 === 0 ? B.paleDk : B.trim); }
      }
      // 바닥 무늬: 룬 원(바깥 원·안쪽 원·여덟 갈래 별)
      for (let z = CZ - 16; z <= CZ + 16; z++) for (let x = CX - 16; x <= CX + 16; x++) {
        const r = rad(x, z), a = ang(x, z);
        if ((r >= 12.8 && r < 14.8) || (r >= 5.2 && r < 6.8)) w.set(x, G, z, B.rune);
        else if (r > 6.8 && r < 12.8 && Math.abs(((a + 22.5) % 45) - 22.5) * r * Math.PI / 180 < 0.8) w.set(x, G, z, B.gold);
      }

      // ── 둥근 벽: 뒤(북·서)는 높게, 앞(남·동)은 낮게 잘랐다. 계단 옆은 난간 높이만큼 남긴다 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rad(x, z); if (r < R || r >= RW) continue;
        const a = ang(x, z), facing = Math.cos((a - 45) * Math.PI / 180), u = Math.round(a * Math.PI / 180 * R);
        let top = facing > 0.3 ? G + 6 : facing > 0 ? G + 18 : G + 48;
        const s = sgn(a); if (s <= S0 + 4 && s >= S1 - 4) top = Math.max(top, G + Math.min(NS, 1 + Math.floor((S0 - Math.min(S0, Math.max(S1, s))) / (S0 - S1) * NS)) + 4);
        for (let y = G + 1; y <= top; y++) w.set(x, y, z, y <= G + 2 ? B.paleDk : (y === top ? B.trim : ((y - G) % 16 === 0 || (y - G) % 16 === 1 ? B.paleDk : (stoneAt(u, y, 1) || B.mortar))));
        if (top >= G + 48) { w.set(x, top - 1, z, B.gold); if (Math.floor(a / 3) % 2 === 0) { w.set(x, top + 1, z, B.trim); w.set(x, top + 2, z, B.trim); } }
        if (top >= G + 48 && r < R + 1.8) {                                   // 안쪽 면: 보라 띠와 금 띠, 금테 벽기둥
          for (const y of [G + 34, G + 35, G + 36, G + 37]) w.set(x, y, z, y <= G + 35 ? B.frieze : B.gold);
          if (Math.abs(((a + 11.25) % 22.5) - 11.25) * Math.PI / 180 * R < 1.2) for (let y = G + 1; y <= G + 46; y++) w.set(x, y, z, y === G + 16 || y === G + 32 || y === G + 45 ? B.gold : (y <= G + 2 ? B.paleDk : B.trim));
        }
      }
      // 창: 창살과 가로살, 금빛 상인방, 창턱
      const win = (a, y0, y1) => {
        for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
          const r = rad(x, z); if (r < R || r >= RW) continue;
          const da = sgn(ang(x, z) - a) * Math.PI / 180 * R; if (Math.abs(da) > 2.2) continue;
          for (let y = y0; y <= y1; y++) w.set(x, y, z, Math.abs(da) < 0.5 || y === y0 + Math.floor((y1 - y0) * 0.6) ? B.iron : B.win);
          w.set(x, y1 + 1, z, B.gold); if (Math.abs(da) < 1.2) w.set(x, y1 + 2, z, B.gold); w.set(x, y0 - 1, z, B.trim);
        }
      };
      for (const a of [205, 250, 290, 335]) win(a, G + 24, G + 33);
      for (const a of [180, 225, 270, 315]) win(a, G + 39, G + 43);
      for (const a of [125, 150]) win(a, G + 6, G + 13);

      // ── 정문(남쪽): 금테 아치 기둥, 두 짝 판자문(쇠띠·놋쇠 고리) ──
      const DZ0 = CZ + R - 2, DZ1 = CZ + 40;
      w.box(CX - 3, G + 1, DZ0, CX + 3, G + 14, DZ1, 0);
      for (let y = G + 1; y <= G + 12; y++) for (let x = CX - 3; x <= CX + 3; x++) w.set(x, y, DZ1, x === CX ? B.doorDk : ((y - G) % 4 === 2 ? B.iron : B.door));
      for (const x of [CX - 1, CX + 1]) w.set(x, G + 6, DZ1 - 1, B.brass);
      w.box(CX - 3, G + 13, DZ1, CX + 3, G + 14, DZ1, B.gold);
      for (const bx of [CX - 5, CX - 4, CX + 4, CX + 5]) { w.box(bx, G + 1, DZ0, bx, G + 14, DZ1, B.trim); if (bx === CX - 4 || bx === CX + 4) w.box(bx, G + 7, DZ0, bx, G + 8, DZ0, B.rune); }
      w.box(CX - 6, G + 15, DZ0, CX + 6, G + 15, DZ1, B.gold); w.box(CX - 4, G + 16, DZ0 + 1, CX + 4, G + 16, DZ1, B.gold); w.box(CX - 2, G + 17, DZ0 + 2, CX + 2, G + 17, DZ1, B.gold); w.box(CX, G + 18, CZ + R + 1, CX, G + 19, CZ + R + 1, B.crys);
      for (let x = CX - 3; x <= CX + 3; x++) for (let z = DZ0; z <= DZ1 - 1; z++) w.set(x, G, z, B.paleDk);
      for (let z = CZ + R - 9; z <= CZ + R - 3; z++) for (let x = CX - 5; x <= CX + 5; x++) w.set(x, G, z, x <= CX - 4 || x >= CX + 4 || z === CZ + R - 9 || z === CZ + R - 3 ? B.rugE : ((x + z) % 4 ? B.rugP : B.rugP2));
      acts.push(OR.goAct({ at: [CX, G + 1, CZ + R - 2], h: 9, name: '밖으로 나가기', goto: 'academy', hint: '금테 아치 정문을 열고 학원 구역의 탑 앞 계단으로 나가요', hit: [CX - 3, G + 1, CZ + R - 2, CX + 3, G + 12, DZ1] }));

      // ── 나선 계단(동쪽 벽을 감아 2층으로) ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const h = stairH(x, z); if (!h) continue;
        const r = rad(x, z);
        for (let y = G + 1; y <= G + h; y++) w.set(x, y, z, y === G + h ? (r > 34.6 ? B.paleDk : (h % 2 ? B.board : B.board2)) : (stoneAt(Math.round(ang(x, z)), y, 2) || B.mortar));
      }
      // 계단 안쪽 난간: 반지름 25~26.8 줄, 살과 손잡이
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rad(x, z), s = sgn(ang(x, z)); if (r < 25.2 || r >= 26.8 || s > S0 - 6 || s < S1) continue;
        const h = Math.min(NS, 1 + Math.floor((S0 - s) / (S0 - S1) * NS));
        for (let y = G + 1; y <= G + h; y++) w.set(x, y, z, B.paleDk);
        if (Math.round(s * 1.2) % 3 === 0) { w.set(x, G + h + 1, z, B.trim); w.set(x, G + h + 2, z, B.trim); }
        w.set(x, G + h + 3, z, B.gold);
      }

      // ── 2층 별 관측 서재: 널마루 반원, 들보, 안쪽 난간 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) if (isGal(x, z) && !stairH(x, z)) {
        const a = ang(x, z), beam = Math.abs(((a - 195) % 15) - 7.5) * Math.PI / 180 * rad(x, z) > 6.2;
        w.set(x, GF, z, Math.floor(rad(x, z) / 2) % 2 ? B.board : B.board2); w.set(x, GF - 1, z, B.plank); if (beam) w.set(x, GF - 2, z, B.desk);
      }
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        if (!isGal(x, z)) continue;
        let edge = false;
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = x + dx, nz = z + dz; if (rad(nx, nz) < R && !isGal(nx, nz) && !stairH(nx, nz)) edge = true; }
        if (!edge) continue;
        const u = Math.round(ang(x, z) * 0.45);
        w.set(x, GF + 1, z, B.paleDk); if (u % 2 === 0) { w.set(x, GF + 2, z, B.trim); w.set(x, GF + 3, z, B.trim); } w.set(x, GF + 4, z, (x + z) % 5 ? B.trim : B.gold);
        if (u % 14 === 0) { w.set(x, GF + 5, z, B.brass); w.set(x, GF + 6, z, B.wax); w.set(x, GF + 7, z, B.candle); }
      }
      // 서재 아래 버팀 기둥과 금 주두
      for (const a of [205, 240, 275, 310, 340]) { const [x, z] = P(a, 24.8); w.box(x, G + 1, z, x + 1, G + 2, z + 1, B.paleDk); w.box(x, G + 3, z, x + 1, GF - 3, z + 1, B.pale); w.box(x - 1, GF - 2, z - 1, x + 2, GF - 2, z + 2, B.gold); }

      // ── 1층 서가(북쪽 벽, 서재 아래) ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const r = rad(x, z), a = ang(x, z); if (r < 32.8 || r >= R || a < 200 || a > 342) continue;
        const u = Math.round(a * Math.PI / 180 * 33), front = r < 34;
        for (let y = G + 1; y <= G + 14; y++) w.set(x, y, z, !front ? B.plank : (u % 22 === 0 ? B.desk : shelfAt(u, y, G + 2, G + 14) || B.desk));
        w.set(x, G + 15, z, B.gold);
      }
      // 서가 앞 독서대 둘과 쌓인 책
      for (const a of [228, 300]) { const [x, z] = P(a, 29.2); w.box(x, G + 1, z, x + 1, G + 1, z + 1, B.desk); w.box(x, G + 2, z, x, G + 5, z, B.desk); w.box(x - 1, G + 6, z - 1, x + 2, G + 6, z + 2, B.deskLt); w.box(x, G + 7, z, x + 1, G + 7, z + 1, B.parch); w.set(x, G + 7, z - 1, B.book1); }
      for (const a of [215, 262, 322]) { const [x, z] = P(a, 30.8); const n = 2 + ((a * 7) % 3); for (let k = 0; k < n; k++) w.box(x, G + 1 + k, z, x + 1 + (k % 2), G + 1 + k, z + 1, BOOKS[(k + a) % 5]); }

      // ── 벽난로(서쪽 벽): 벽돌 몸, 그을린 불받이, 장작과 불꽃, 쇠 받침, 선반, 굴뚝 ──
      const HX = CX - R;
      for (let y = G + 1; y <= G + 16; y++) for (let z = CZ - 6; z <= CZ + 6; z++) for (let x = HX; x <= HX + 4; x++) w.set(x, y, z, ((y + (x + z) * ((y >> 1) & 1)) % 4 === 0) ? B.brick2 : B.brick);
      w.box(HX + 1, G + 1, CZ - 4, HX + 4, G + 8, CZ + 4, 0);
      w.box(HX, G + 1, CZ - 4, HX, G + 8, CZ + 4, B.soot); w.box(HX + 1, G + 9, CZ - 3, HX + 3, G + 9, CZ + 3, B.soot);
      for (let z = CZ - 4; z <= CZ + 4; z++) for (let y = G + 9; y <= G + 10; y++) w.set(HX + 4, y, z, B.paleDk);
      w.box(HX + 1, G + 1, CZ - 3, HX + 2, G + 1, CZ + 3, B.ember); w.box(HX + 2, G + 2, CZ - 2, HX + 2, G + 2, CZ + 2, B.bark); w.box(HX + 1, G + 2, CZ - 3, HX + 1, G + 2, CZ + 3, B.bark);
      for (const [z, h] of [[CZ - 2, 3], [CZ - 1, 5], [CZ, 6], [CZ + 1, 4], [CZ + 2, 3]]) w.box(HX + 1, G + 3, z, HX + 2, G + 2 + h, z, h > 4 ? B.ember : B.flame);
      w.set(HX + 2, G + 3, CZ, B.flame);
      for (const z of [CZ - 3, CZ + 3]) { w.box(HX + 3, G + 1, z, HX + 3, G + 3, z, B.iron); w.set(HX + 4, G + 1, z, B.iron); w.set(HX + 3, G + 4, z, B.brass); }
      w.box(HX + 1, G + 1, CZ - 6, HX + 4, G + 1, CZ + 6, B.paleDk); w.box(HX + 5, G + 1, CZ - 6, HX + 6, G + 1, CZ + 6, B.paleDk);
      w.box(HX + 5, G + 11, CZ - 7, HX + 6, G + 11, CZ + 7, B.trim); w.box(HX + 5, G + 10, CZ - 7, HX + 5, G + 10, CZ + 7, B.gold); for (const z of [CZ - 6, CZ + 6]) w.box(HX + 5, G + 8, z, HX + 5, G + 9, z, B.trim);
      for (const z of [CZ - 5, CZ + 5]) { w.set(HX + 5, G + 12, z, B.brass); w.box(HX + 5, G + 13, z, HX + 5, G + 14, z, B.wax); w.set(HX + 5, G + 15, z, B.candle); }
      w.box(HX + 5, G + 12, CZ - 1, HX + 5, G + 14, CZ, B.crys); w.box(HX + 5, G + 12, CZ + 2, HX + 6, G + 13, CZ + 2, B.book2); w.box(HX + 5, G + 12, CZ + 3, HX + 6, G + 14, CZ + 3, B.book1);
      for (let y = G + 17; y <= G + 46; y++) for (let z = CZ - 4; z <= CZ + 4; z++) for (let x = HX + 1; x <= HX + 4; x++) w.set(x, y, z, y === G + 17 || y === G + 18 ? B.gold : (stoneAt(z + x, y, 4) || B.mortar));
      for (let z = CZ - 8; z <= CZ + 8; z++) for (let x = HX + 8; x <= HX + 19; x++) w.set(x, G, z, x === HX + 8 || x === HX + 19 || z === CZ - 8 || z === CZ + 8 ? B.rugE : (x === HX + 9 || x === HX + 18 || z === CZ - 7 || z === CZ + 7 ? B.rugP2 : ((x + z) % 4 ? B.rugP : B.rugP2)));
      // 안락의자 둘(다리·방석·등받이·팔걸이)과 작은 탁자
      for (const z0 of [CZ - 8, CZ + 5]) {
        for (const [dx, dz] of [[0, 0], [3, 0], [0, 3], [3, 3]]) w.set(HX + 12 + dx, G + 1, z0 + dz, B.desk);
        w.box(HX + 12, G + 2, z0, HX + 15, G + 3, z0 + 3, B.velvet); w.box(HX + 16, G + 2, z0, HX + 17, G + 8, z0 + 3, B.velvetDk); w.box(HX + 16, G + 9, z0, HX + 17, G + 9, z0 + 3, B.gold);
        for (const dz of [-1, 4]) w.box(HX + 12, G + 2, z0 + dz, HX + 17, G + 5, z0 + dz, B.velvetDk);
      }
      w.box(HX + 12, G + 1, CZ - 1, HX + 12, G + 3, CZ - 1, B.desk); w.box(HX + 11, G + 4, CZ - 2, HX + 13, G + 4, CZ, B.deskLt); w.box(HX + 12, G + 5, CZ - 1, HX + 12, G + 6, CZ - 1, B.potR); w.set(HX + 12, G + 7, CZ - 1, B.glass);
      lights.push({ name: 'hearth', p: [HX + 2.5, G + 5, CZ + 0.5], c: '#ff9a4a', i: 1.4, d: 32, flicker: 0.32 });

      // ── 연금 탁자(남서쪽)와 지팡이 걸이 ──
      { const [x, z] = P(128, 26.4);
        for (const [dx, dz] of [[-3, -2], [3, -2], [-3, 1], [3, 1]]) w.box(x + dx, G + 1, z + dz, x + dx, G + 4, z + dz, B.desk);
        w.box(x - 4, G + 5, z - 2, x + 4, G + 5, z + 1, B.deskLt); w.box(x - 3, G + 2, z - 2, x + 3, G + 2, z + 1, B.plank);
        w.box(x - 3, G + 6, z - 2, x - 3, G + 7, z - 2, B.potG); w.set(x - 3, G + 8, z - 2, B.glass);
        w.box(x - 1, G + 6, z, x - 1, G + 7, z, B.glass); w.box(x - 1, G + 8, z, x - 1, G + 9, z, B.mana);
        w.box(x + 1, G + 6, z - 2, x + 1, G + 8, z - 2, B.iron); w.set(x + 1, G + 6, z - 1, B.flame); w.set(x + 1, G + 9, z - 2, B.glass);
        w.box(x + 2, G + 6, z, x + 2, G + 7, z, B.crys); w.box(x + 3, G + 6, z - 2, x + 4, G + 6, z - 1, B.book1); w.box(x + 3, G + 7, z - 2, x + 4, G + 7, z - 1, B.book2); w.box(x - 2, G + 6, z + 1, x - 1, G + 6, z + 1, B.parch);
        lights.push({ name: 'alch', p: [x + 0.5, G + 8, z + 0.5], c: '#a0ffb0', i: 0.9, d: 20, flicker: 0.2 }); }
      const [SX, SZ] = P(152, 32.4);
      w.box(SX, G + 2, SZ - 5, SX, G + 2, SZ + 5, B.iron); w.box(SX, G + 10, SZ - 5, SX, G + 10, SZ + 5, B.iron); for (const dz of [-5, 5]) w.box(SX, G + 1, SZ + dz, SX, G + 11, SZ + dz, B.iron);
      for (const dz of [-3, 0, 3]) { w.box(SX + 1, G + 3, SZ + dz, SX + 1, G + 13, SZ + dz, B.bark); w.set(SX + 1, G + 14, SZ + dz, B.gold); w.box(SX + 1, G + 15, SZ + dz, SX + 1, G + 16, SZ + dz, dz ? B.crys2 : B.crys); }
      const staff = w.prop({ name: 'staff', pivot: [SX + 4.5, G + 8, SZ + 0.5], axis: 'y', bob: 0.4, bobSpeed: 1.1 });
      staff.box(SX + 4, G + 3, SZ, SX + 4, G + 13, SZ, B.bark); staff.box(SX + 4, G + 6, SZ, SX + 4, G + 6, SZ, B.gold);
      staff.set(SX + 4, G + 14, SZ, B.gold); staff.box(SX + 4, G + 15, SZ, SX + 4, G + 17, SZ, B.crys); staff.set(SX + 5, G + 14, SZ, B.gold); staff.set(SX + 3, G + 14, SZ, B.gold); staff.set(SX + 5, G + 15, SZ, B.mana); staff.set(SX + 3, G + 15, SZ, B.mana);
      lights.push({ name: 'staff', p: [SX + 4.5, G + 16, SZ + 0.5], c: '#c080ff', i: 0.9, d: 20, flicker: 0.1 });
      acts.push({
        name: '마법 지팡이', hint: '걸이 앞에 선 지팡이가 떠올라 빙글 돌며 보랏빛 불꽃을 흩뿌려요', hit: [SX - 1, G + 1, SZ - 4, SX + 6, G + 17, SZ + 4],
        run: async a => {
          a.flash('staff', 4, 3.5); a.spin('staff', 6, 3);
          await a.move('staff', [0, 8, 0], 1);
          for (let k = 0; k < 5; k++) { a.burst([SX + 4.5, G + 25, SZ + 0.5], { n: 22, colors: ['#c080ff', '#ffffff', '#80e0ff'], speed: 12, up: 4, life: 1.1, gravity: 2, spread: 1.2 }); await a.wait(0.35); }
          await a.move('staff', [0, 0, 0], 1);
        },
      });

      // ── 룬 원과 수정 구(한가운데) ──
      w.box(CX - 2, G + 1, CZ - 2, CX + 2, G + 2, CZ + 2, B.paleDk); w.box(CX - 2, G + 2, CZ - 2, CX + 2, G + 2, CZ + 2, B.trim);
      w.box(CX - 1, G + 3, CZ - 1, CX + 1, G + 5, CZ + 1, B.pale); w.box(CX - 2, G + 6, CZ - 2, CX + 2, G + 6, CZ + 2, B.gold);
      for (const [dx, dz] of [[-2, -2], [2, -2], [-2, 2], [2, 2]]) w.set(CX + dx, G + 7, CZ + dz, B.gold);
      const scry = w.prop({ name: 'scry', pivot: [CX + 0.5, G + 10, CZ + 0.5], axis: 'y', speed: 0.3, bob: 0.3, bobSpeed: 0.8 });
      scry.sphere(CX, G + 10, CZ, 2.6, B.crys2); scry.sphere(CX, G + 10, CZ, 1.4, B.mana);
      lights.push({ name: 'scry', p: [CX + 0.5, G + 10, CZ + 0.5], c: '#80e0ff', i: 1.2, d: 28, flicker: 0.08 });
      const ring = w.prop({ name: 'runering', pivot: [CX + 0.5, G + 1.5, CZ + 0.5], axis: 'y' });
      for (let k = 0; k < 32; k++) { const t = k / 32 * Math.PI * 2, x = Math.round(CX + Math.cos(t) * 10), z = Math.round(CZ + Math.sin(t) * 10); ring.set(x, G + 1, z, k % 4 === 0 ? B.crys : B.rune); if (k % 4 === 0) ring.set(x, G + 2, z, B.crys); }
      lights.push({ name: 'rune', p: [CX + 10.5, G + 2, CZ + 0.5], c: '#a890ff', i: 1, d: 28, flicker: 0.1 });
      acts.push({
        name: '룬 원 밟기', hint: '바닥 룬 원에 발을 올리면 룬 고리가 떠올라 돌며 보랏빛이 홀을 채워요', hit: [CX - 12, G + 1, CZ + 10, CX + 12, G + 2, CZ + 14],
        run: async a => {
          a.flash('rune', 4, 4.5); a.glow(1.6, 4.5); a.spin('runering', 6, 4);
          await a.move('runering', [0, 10, 0], 1.2);
          for (let k = 0; k < 6; k++) { const t = k / 6 * Math.PI * 2; a.burst([CX + 0.5 + Math.cos(t) * 10, G + 12, CZ + 0.5 + Math.sin(t) * 10], { n: 14, colors: ['#a890ff', '#ffffff', '#c080ff'], speed: 4, up: 6, life: 1.2, gravity: -1.2, spread: 1.2 }); await a.wait(0.25); }
          await a.move('runering', [0, 0, 0], 1.4);
        },
      });
      acts.push({
        name: '수정 구 들여다보기', hint: '받침 위 수정 구가 떠올라 돌며 안개 속에 별빛이 비쳐요', hit: [CX - 2, G + 1, CZ - 2, CX + 2, G + 13, CZ + 2],
        run: async a => {
          a.flash('scry', 5, 4); a.spin('scry', 5, 4);
          await a.move('scry', [0, 6, 0], 1);
          for (let k = 0; k < 6; k++) { a.burst([CX + 0.5, G + 16, CZ + 0.5], { n: 18, colors: ['#80e0ff', '#e0f8ff', '#c080ff'], speed: 2.8, up: 1.2, life: 1.6, gravity: -0.4, spread: 2.8 }); await a.wait(0.3); }
          await a.move('scry', [0, 0, 0], 1.2);
        },
      });

      // ── 떠다니는 책(룬 원 둘레를 천천히 돈다) ──
      const tomes = w.prop({ name: 'tomes', pivot: [CX + 0.5, G + 14, CZ + 0.5], axis: 'y', speed: 0.22, bob: 0.5, bobSpeed: 0.9 });
      for (let k = 0; k < 10; k++) {
        const t = k / 10 * Math.PI * 2, x = Math.round(CX + Math.cos(t) * 18), z = Math.round(CZ + Math.sin(t) * 18), y = G + 12 + (k % 3) * 2;
        tomes.box(x, y, z, x + 1, y + 3, z + 2, BOOKS[k % 5]); tomes.box(x, y + 4, z, x + 1, y + 4, z + 2, B.parch); tomes.box(x + 2, y + 1, z, x + 2, y + 2, z + 2, B.parch); if (k % 2) tomes.box(x, y + 1, z + 1, x, y + 2, z + 1, B.gold);
      }
      acts.push({
        name: '떠다니는 책 부르기', hint: '홀을 떠돌던 책들이 빠르게 날아올라 책장이 펄럭이며 종이가 흩날려요', hit: [CX - 20, G + 10, CZ - 20, CX + 20, G + 18, CZ + 20],
        run: async a => {
          a.spin('tomes', 7, 4.5);
          await a.move('tomes', [0, 10, 0], 1.3);
          for (let k = 0; k < 5; k++) { a.burst([CX + 0.5, G + 26, CZ + 0.5], { n: 26, colors: ['#f4ecd8', '#e8dcb8', '#ffffff'], speed: 14, up: 2, life: 1.6, gravity: 4, spread: 4, flat: true }); await a.wait(0.4); }
          await a.move('tomes', [0, 0, 0], 1.5);
        },
      });

      // ── 2층: 천체 모형 · 망원경 · 별 지도 책상 · 부엉이 횃대 ──
      const [OX, OZ] = P(222, 30);
      w.box(OX - 1, GF + 1, OZ - 1, OX + 1, GF + 2, OZ + 1, B.paleDk); w.box(OX, GF + 3, OZ, OX, GF + 4, OZ, B.brass);
      const orr = w.prop({ name: 'orrery', pivot: [OX + 0.5, GF + 8, OZ + 0.5], axis: 'y', speed: 0.25 });
      orr.box(OX, GF + 5, OZ, OX, GF + 8, OZ, B.brass); orr.sphere(OX, GF + 10, OZ, 1.5, B.ember);
      for (const [r, y, c, n2] of [[4, GF + 8, B.crys2, 2], [6, GF + 6, B.potR, 3]]) for (let k = 0; k < n2; k++) {
        const t = k / n2 * Math.PI * 2 + r, x = Math.round(OX + Math.cos(t) * r), z = Math.round(OZ + Math.sin(t) * r);
        orr.line(OX, y, OZ, x, y, z, B.brass); orr.box(x, y + 1, z, x + 1, y + 2, z + 1, c);
      }
      lights.push({ name: 'orrery', p: [OX + 0.5, GF + 10, OZ + 0.5], c: '#ffd060', i: 1, d: 24, flicker: 0.06 });
      acts.push({
        name: '천체 모형 돌리기', hint: '서재의 놋쇠 천체 모형이 빠르게 돌며 해 구슬이 환하게 빛나요', hit: [OX - 6, GF + 1, OZ - 6, OX + 6, GF + 12, OZ + 6],
        run: async a => {
          a.flash('orrery', 4, 4); a.spin('orrery', 9, 4);
          for (let k = 0; k < 6; k++) { a.burst([OX + 0.5, GF + 12, OZ + 0.5], { n: 12, colors: ['#ffd060', '#ffffff'], speed: 6, up: 2, life: 1, gravity: 0, spread: 0.8, flat: true }); await a.wait(0.5); }
          await a.move('orrery', [0, 3.6, 0], 0.6); await a.move('orrery', [0, 0, 0], 0.6);
        },
      });
      { const [x, z] = P(270, 31);                                           // 망원경: 북쪽 창을 겨눈다
        for (const [dx, dz] of [[-2, 2], [2, 2], [0, -2]]) w.line(x + dx, GF + 1, z + dz, x, GF + 6, z, B.iron);
        w.box(x, GF + 6, z, x, GF + 7, z, B.iron);
        w.line(x, GF + 8, z + 3, x, GF + 13, z - 4, B.brass); w.line(x + 1, GF + 8, z + 3, x + 1, GF + 13, z - 4, B.brass);
        w.box(x, GF + 13, z - 5, x + 1, GF + 14, z - 5, B.gold); w.box(x, GF + 8, z + 3, x + 1, GF + 8, z + 4, B.gold); }
      { const [x, z] = P(312, 30);                                             // 별 지도 책상과 의자
        for (const [dx, dz] of [[-3, -1], [3, -1], [-3, 1], [3, 1]]) w.box(x + dx, GF + 1, z + dz, x + dx, GF + 4, z + dz, B.desk);
        w.box(x - 4, GF + 5, z - 2, x + 4, GF + 5, z + 1, B.deskLt);
        w.box(x - 3, GF + 6, z - 1, x, GF + 6, z + 1, B.parch); w.set(x - 2, GF + 6, z, B.crys2); w.set(x - 1, GF + 6, z - 1, B.crys2);
        w.set(x + 2, GF + 6, z - 2, B.brass); w.box(x + 2, GF + 7, z - 2, x + 2, GF + 8, z - 2, B.wax); w.set(x + 2, GF + 9, z - 2, B.candle); w.box(x + 3, GF + 6, z, x + 4, GF + 7, z + 1, B.book2);
        w.box(x - 1, GF + 1, z + 3, x + 1, GF + 3, z + 5, B.velvet); w.box(x - 1, GF + 4, z + 5, x + 1, GF + 8, z + 5, B.velvetDk); }
      const [PX, PZ] = P(252, 32.8);                                          // 부엉이 횃대(북쪽 창 앞)
      w.box(PX - 1, GF + 1, PZ - 1, PX + 1, GF + 1, PZ + 1, B.iron); w.box(PX, GF + 2, PZ, PX, GF + 6, PZ, B.iron); w.box(PX - 3, GF + 6, PZ, PX + 3, GF + 6, PZ, B.bark); w.box(PX + 2, GF + 1, PZ + 2, PX + 3, GF + 1, PZ + 3, B.plank);
      const owl = w.prop({ name: 'owl', pivot: [PX + 1, GF + 10, PZ + 1.5] });
      owl.box(PX - 1, GF + 7, PZ, PX + 1, GF + 10, PZ + 3, B.owl); owl.box(PX + 2, GF + 7, PZ + 1, PX + 2, GF + 9, PZ + 2, B.owlW);
      owl.box(PX - 1, GF + 11, PZ, PX + 1, GF + 13, PZ + 3, B.owl); owl.box(PX + 2, GF + 11, PZ, PX + 2, GF + 13, PZ + 3, B.owlW);
      owl.set(PX + 3, GF + 12, PZ, B.ember); owl.set(PX + 3, GF + 12, PZ + 3, B.ember); owl.box(PX + 3, GF + 11, PZ + 1, PX + 3, GF + 11, PZ + 2, B.brass);
      owl.set(PX - 1, GF + 14, PZ, B.owl); owl.set(PX - 1, GF + 14, PZ + 3, B.owl);
      owl.box(PX - 1, GF + 8, PZ - 1, PX + 1, GF + 10, PZ - 1, B.owl); owl.box(PX - 1, GF + 8, PZ + 4, PX + 1, GF + 10, PZ + 4, B.owl);
      owl.box(PX + 3, GF + 9, PZ + 1, PX + 4, GF + 10, PZ + 2, B.letter); owl.set(PX + 4, GF + 10, PZ + 1, B.seal);
      const owlPts = [];
      for (let i = 1; i <= 12; i++) { const t = Math.atan2(PZ - CZ, PX - CX) + i / 12 * Math.PI * 2, r = 18 + Math.sin(i / 12 * Math.PI) * 4; owlPts.push([CX + Math.cos(t) * r - PX, 6 + Math.sin(i / 12 * Math.PI) * 10, CZ + Math.sin(t) * r - PZ]); }
      owlPts.push([0, 1.2, 0]);
      acts.push({
        name: '부엉이 편지', hint: '횃대의 부엉이가 편지를 물고 날아올라 홀을 한 바퀴 돌고 돌아와요', hit: [PX - 4, GF + 1, PZ - 4, PX + 4, GF + 14, PZ + 4],
        run: async a => {
          a.burst([PX + 0.5, GF + 11, PZ + 1.5], { n: 18, colors: ['#e8dcc0', '#7a5a3a'], speed: 6, up: 4, life: 1.2, gravity: 6, spread: 2 });
          await a.drive('owl', owlPts, 14, { fwd: '+x', back: 1.6 });
          a.burst([PX + 0.5, GF + 11, PZ + 1.5], { n: 14, colors: ['#f4ecd8', '#ffd060'], speed: 4, up: 2, life: 1, gravity: 4, spread: 2 });
        },
      });

      // ── 꼭대기 수정 방의 수정(머리 위에 떠서 돈다) ──
      const AY = G + 44;
      const apex = w.prop({ name: 'apex', pivot: [CX + 0.5, AY, CZ + 0.5], axis: 'y', speed: 0.35, bob: 0.8, bobSpeed: 0.6 });
      for (let dy = -8; dy <= 8; dy++) { const r = 3.2 - Math.abs(dy) * 0.38; if (r < 0.4) { apex.set(CX, AY + dy, CZ, B.crys); continue; } for (let dz = -4; dz <= 4; dz++) for (let dx = -4; dx <= 4; dx++) if (Math.abs(dx) + Math.abs(dz) <= r + 0.2) apex.set(CX + dx, AY + dy, CZ + dz, Math.abs(dx) + Math.abs(dz) < r - 1.4 ? B.mana : B.crys); }
      const halo = w.prop({ name: 'halo', pivot: [CX + 0.5, AY, CZ + 0.5], axis: 'y', speed: -0.6 });
      for (let k = 0; k < 6; k++) { const t = k / 6 * Math.PI * 2, x = Math.round(CX + Math.cos(t) * 10), z = Math.round(CZ + Math.sin(t) * 10), y = AY - 2 + (k % 2) * 4; for (let dy = -3; dy <= 3; dy++) { const rr = Math.abs(dy) >= 2 ? 0 : 1; halo.box(x - rr, y + dy, z, x + rr, y + dy, z, k % 2 ? B.crys2 : B.crys); halo.set(x, y + dy, z - rr, k % 2 ? B.crys2 : B.crys); halo.set(x, y + dy, z + rr, k % 2 ? B.crys2 : B.crys); } }
      lights.push({ name: 'apex', p: [CX + 0.5, AY, CZ + 0.5], c: '#b080ff', i: 1.4, d: 44, flicker: 0.08 });
      acts.push({
        name: '꼭대기 수정의 공명', hint: '머리 위 꼭대기 수정과 작은 수정들이 공명하며 빠르게 돌고 탑 안이 보랏빛으로 물들어요', hit: [CX - 10, G + 20, CZ - 22, CX + 10, AY + 10, CZ + 10],
        run: async a => {
          a.flash('apex', 4, 5); a.glow(1.8, 5); a.spin('apex', 5, 5); a.spin('halo', 8, 5);
          await a.move('halo', [0, -6, 0], 1.2);
          for (let k = 0; k < 5; k++) { a.burst([CX + 0.5, AY, CZ + 0.5], { n: 30, colors: ['#c080ff', '#80e0ff', '#ffffff'], speed: 16, up: 0, life: 1.2, gravity: 0, spread: 2, flat: true }); await a.wait(0.45); }
          a.lightning(0.3);
          await a.move('halo', [0, 0, 0], 1.2);
        },
      });

      landmarks.push({ name: '룬 원', note: '수정 구가 떠 있는 현관 홀', p: [CX + 0.5, G + 20, CZ + 0.5] });
      landmarks.push({ name: '별 관측 서재', note: '천체 모형과 망원경', p: [CX + 0.5, G + 40, CZ - 31] });
      return { lights, landmarks, acts };
    },
  });
})();
