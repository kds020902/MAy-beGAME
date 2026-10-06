// 쇄빙선 — 핀란드만 얼음에 갇힌 원자력 쇄빙선 「보레아스」의 앞부분만: 상부 구조물 정면(붉은·파란·흰 띠, 위로 갈수록 뒤로 눕는 정면), 넓은 날개의 조타실, 앞갑판(접어 둔 크레인 둘, 높은 앞 갑판실, V자 양묘기 넷, 앞 돛대), 숟가락 뱃머리
// 비율은 re3mr 측면도와 tarkov.dev 평면도를 따랐다(한 층 ≈ 5칸, 앞갑판 길이 ≈ 배 폭). 뱃머리는 남쪽, 오른쪽 뱃전은 동쪽(기본 카메라 쪽), 배 뒤쪽은 북쪽 가장자리 밖으로 이어진다
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 136, D = 154, Hh = 124;
  MAPS.push({
    id: 'icebreaker', cat: 'tarkov', name: '쇄빙선', en: 'Icebreaker · Boreas', color: '#5a8ab0', seed: 603, base: 20, time: 'night', size: [W, D, Hh],
    desc: '타르코프 봉쇄선 안쪽 핀란드만, 얼음에 갇힌 원자력 쇄빙선 「보레아스」의 앞부분. 검은 선체 뱃머리에 「БОРЕЙ」, 그 뒤로 붉고 푸르고 흰 띠를 두른 상부 구조물이 위로 갈수록 뒤로 누우며 솟고, 꼭대기에는 배 폭만큼 넓은 조타실이 탐조등을 켜고 있다. 앞갑판에는 접어 둔 크레인, 갑판실, V자로 놓인 양묘기와 앞 돛대가 눈을 뒤집어쓰고 있다.',
    info: { title: '구역 정보', en: 'LOCATION', rows: [['위치', '핀란드만 · 타르코프 봉쇄선 안'], ['소속', '파라다임 해운(Paradigm Shipping)'], ['이 지도', '상부 구조물 정면 · 앞갑판 · 뱃머리'], ['층', '3층 식당·체육관 ~ 9층 조타실 · 10층 지붕'], ['보스', '웨지(3층 체육관) · 나이트(0층)'], ['탈출', '헬리패드(고물) · 녹색 신호탄']] },
    sky: ['#1a2638', '#05080f', '#2c4462'], stars: true,
    hemi: ['#9ab4d8', '#141a24', 0.52], sun: ['#c0d4f4', 0.42, [0.5, 1, 0.7]],
    day: { sky: ['#a8b4c0', '#6a7c90', '#dce4ea'], stars: false, hemi: ['#e8f0f8', '#4a5462', 0.6], sun: ['#f0f4ff', 0.6, [0.5, 1, 0.7]], haze: '#b8c6d4' },
    liquid: ['#0a141e', '#16283a', '#4a6a84'], liqSpeed: 0.12,
    fog: { box: [68, 77, 72, 81], start: 0.86, floor: 8, depth: 10, haze: [28, 0.28, 10], hazeColor: '#3a4c62' },
    camY: 14, zoom: 1.15,
    particles: [
      { n: 1100, colors: ['#ffffff', '#e4eef8', '#c0d4e8'], mode: 'fall', speed: 0.9, wind: 1.6, y0: 18, y1: 120, glow: false },
    ],
    blocks: {
      // 얼음판
      snowI: { c: '#9eb2c4', top: '#e2ebf2', v: 0.04 }, snow2: { c: '#94a8bc', top: '#d0dce8', v: 0.05 }, iceB: { c: '#7aa0b8', top: '#a4c6da', v: 0.05 },
      iceThin: { c: '#5a7e98', top: '#6e94ae', v: 0.05 }, crack: { c: '#3a5268', top: '#466078', v: 0.04 }, sea: { c: '#0e1820', v: 0.03 },
      iceBlk: { c: '#a8cce0', top: '#e8f4fa', v: 0.06 }, iceBlk2: { c: '#7eaac4', top: '#c8e0ee', v: 0.06 },
      // 선체: 검은 남색 윗선체, 얼음 위로 살짝 보이는 붉은 아랫선체와 흰 줄, 초록빛 도는 갑판
      hullN: { c: '#1c2432', v: 0.04 }, hullR: { c: '#8a2a24', v: 0.05 }, hullW: { c: '#d8dcdc', v: 0.02 }, rust: { c: '#4e3026', v: 0.06 },
      deck: { c: '#3a4440', top: '#46524c', v: 0.05, pat: 'floor' }, snowD: { c: '#b4c2ce', top: '#e4ecf2', v: 0.04 },
      rail: { c: '#9aa0a6', v: 0.03 }, iron: { c: '#2c3036', v: 0.03 }, chain: { c: '#4a4440', v: 0.05 }, wlass: { c: '#3a4658', v: 0.04 },
      // 상부 구조물: 밝은 회색 벽, 흰·파랑·빨강 띠
      sWall: { c: '#b4bac0', v: 0.03, pat: 'big' }, sLine: { c: '#8a9298', v: 0.02 }, sRoof: { c: '#4a5056', top: '#c4d0da', v: 0.03 },
      stripeB: { c: '#2a5694', v: 0.03 }, stripeR: { c: '#b03a30', v: 0.03 }, stripeW: { c: '#e8ecf0', v: 0.02 },
      win: { c: '#ffe0a0', night: true, day: '#3a4a58' }, winD: { c: '#26303a', v: 0.03 }, brWin: { c: '#b4e8ff', night: true, day: '#2a4652' }, frame: { c: '#2a2e34', v: 0.02 },
      doorS: { c: '#5a646c', v: 0.03 }, signW: { c: '#eef0f0', v: 0.02 }, signK: { c: '#1e2630', v: 0.02 },
      mastN: { c: '#24324a', v: 0.03 }, dome: { c: '#e8ecee', v: 0.02 }, crane: { c: '#d8dcd8', v: 0.03 }, craneY: { c: '#e0a830', v: 0.03 },
      cBl: { c: '#2e5a8a', top: '#d8e2ea', v: 0.04, pat: 'plank' }, cGr: { c: '#3e6a4a', top: '#d8e2ea', v: 0.04, pat: 'plank' }, cWh: { c: '#d8dcdc', v: 0.02 },
      hatch: { c: '#8a9298', top: '#c8d4dc', v: 0.04 },
      // 불빛
      lampW: { c: '#f4fbff', glow: true }, flood: { c: '#fff4d8', glow: true }, redL: { c: '#ff3a2a', glow: true }, navW: { c: '#ffffff', glow: true }, navG: { c: '#3aff6a', glow: true }, beamL: { c: '#cfeeff', glow: true },
      // 호버크래프트·사륜 오토바이·상자
      skirt: { c: '#1e2022', v: 0.04 }, hover: { c: '#2e4a7a', v: 0.04 }, hoverW: { c: '#c8ccc8', v: 0.03 }, hoverR: { c: '#a8322a', v: 0.04 }, fan: { c: '#1a2a4a', v: 0.03 }, glass: { c: '#9ac8d8', night: true, day: '#5a7a88' },
      quad: { c: '#2e342e', v: 0.03 }, tail: { c: '#ff2a1a', glow: true }, crateM: { c: '#4e5a3a', top: '#c8d4dc', v: 0.05, pat: 'plank' },
      // 이정표(오라리오와 같은 방식): 회색 받침, 강철 기둥, 노란 판, 초록 비상구 끝, 등
      stoneG: { c: '#6a7078', v: 0.04 }, timber: { c: '#3a4048', v: 0.03 }, door: { c: '#d8b030', v: 0.03 }, gold: { c: '#3ad06a', v: 0.03 }, mlamp: { c: '#fff0c0', glow: true },
    },
    build(w) {
      const B = w.id, G = w.base, n = w.noise;
      const lights = [], acts = [], landmarks = [];
      w.hm = new Int16Array(W * D).fill(G);                                  // 이정표(MH.g)용 높이표

      // ── 배 치수: 중심선 x=74, 반폭 30, 주갑판 G+16. 상부 구조물 정면 z=60, 뱃머리 끝 z≈128(갑판) ──
      const CX = 64, HW = 30, DK = G + 16, ZF = 60;
      const dxOf = x => x + 0.5 - CX;
      const deckY = z => DK + Math.floor(Math.max(0, z - 92) * 0.14);        // 뱃머리 쪽으로 오르는 현호
      const tipZ = y => 116 + (y - G) * 0.75;                                // 앞으로 누운 숟가락 뱃머리
      const hwAt = (z, y) => {
        let b = HW - Math.max(0, DK - y) * 0.12;                            // 얼음 쪽으로 좁아지는 뱃전
        if (z <= 84) return b;
        const t = (z - 84) / (tipZ(y) - 84);
        return t >= 1 ? -1 : b * Math.sqrt(Math.max(0, 1 - Math.pow(t, 2.4)));
      };
      const inHull = (x, y, z) => Math.abs(dxOf(x)) <= hwAt(z, y);

      // ── 얼음판: 눈 덮인 해빙, 맨얼음, 금, 남서쪽으로 뻗은 물길 ──
      const LEAD = [[0, 140], [22, 136], [40, 132], [48, 128]];
      const segD = (px, pz, a, b) => { const dx = b[0] - a[0], dz = b[1] - a[1], t = Math.max(0, Math.min(1, ((px - a[0]) * dx + (pz - a[1]) * dz) / (dx * dx + dz * dz))); return Math.hypot(px - a[0] - dx * t, pz - a[1] - dz * t); };
      const wm = new Uint8Array(W * D);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        let dl = 1e9; for (let k = 0; k < LEAD.length - 1; k++) dl = Math.min(dl, segD(x, z, LEAD[k], LEAD[k + 1]));
        if (dl < 1.6 + n.fbm(x * 0.08, z * 0.08) * 3.5) wm[x + W * z] = n.fbm(x * 0.2 + 7, z * 0.2) > 0.62 ? 2 : 1;
      }
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const m = wm[x + W * z];
        if (m === 1) { w.set(x, G - 3, z, B.sea); w.liquid(x, z, G - 1); continue; }
        if (m === 2) { w.box(x, G - 3, z, x, G - 1, z, B.iceBlk2); continue; }
        const n1 = n.fbm(x * 0.05, z * 0.05), cr = n.ridge(x * 0.035 + 5, z * 0.035 + 9);
        const b = cr > 0.9 ? B.crack : n1 > 0.7 ? B.iceB : (n1 > 0.6 || hash3(x, 1, z) > 0.96 ? B.snow2 : B.snowI);
        w.box(x, G - 3, z, x, G - 1, z, B.iceB); w.set(x, G, z, b);
        if (b === B.snowI && n.fbm(x * 0.09 + 3, z * 0.09 + 7) > 0.66) w.set(x, G + 1, z, B.snowI);   // 눈 둔덕
      }

      // ── 선체 ──
      for (let z = 0; z <= 132; z++) {
        const dy = deckY(z);
        for (let y = G - 3; y <= dy; y++) for (let x = CX - HW - 1; x <= CX + HW; x++) {
          if (!inHull(x, y, z)) continue;
          let b = y <= G + 1 ? B.hullR : y === G + 2 ? B.hullW : B.hullN;
          if (y === dy) b = n.fbm(x * 0.15, z * 0.15) < 0.3 && hash3(x, 5, z) > 0.3 ? B.deck : B.snowD;
          w.set(x, y, z, b);
        }
        for (let x = CX - HW - 1; x <= CX + HW; x++) {                       // 갑판 가장자리: 앞갑판은 검은 현장, 상부 구조물 옆은 난간
          if (!inHull(x, dy, z)) continue;
          if (inHull(x + 1, dy, z) && inHull(x - 1, dy, z) && inHull(x, dy, z + 1) && (z === 0 || inHull(x, dy, z - 1))) continue;
          const bh = z >= ZF ? (z > 112 ? 3 : 2) : 0;
          if (bh) { w.box(x, dy + 1, z, x, dy + bh - 1, z, B.hullN); w.set(x, dy + bh, z, B.hullW); }
          else { if (z % 3 === 0) w.set(x, dy + 1, z, B.rail); w.set(x, dy + 2, z, B.rail); }
        }
      }
      const outX = (z, y) => { for (let x = CX + HW; x > CX; x--) if (w.get(x, y, z) && inHull(x, y, z)) return x; return -1; };   // 동쪽 뱃전 바깥 면
      for (let z = 4; z <= 100; z += 5) for (const y of [DK - 4, DK - 8]) {   // 녹물 줄
        const x = outX(z, y); if (x < 0 || hash3(z, y, 4) < 0.5 || (z > 86 && z < 116)) continue;
        for (let k = 0; k <= 1 + (hash3(z, 3, y) * 4 | 0); k++) { const xx = outX(z, y - k); if (xx > 0 && y - k > G + 3) w.set(xx, y - k, z, B.rust); }
      }
      // 뱃머리 이름 「БОРЕЙ」: 동쪽에서 보면 남쪽(뱃머리)이 왼쪽
      const FONT = { Б: ['111', '100', '110', '101', '110'], О: ['111', '101', '101', '101', '111'], Р: ['110', '101', '110', '100', '100'], Е: ['111', '100', '110', '100', '111'], Й: ['0110', '1001', '1011', '1101', '1001'],
        B: ['110', '101', '110', '101', '110'], O: ['111', '101', '101', '101', '111'], R: ['110', '101', '110', '101', '101'], E: ['111', '100', '110', '100', '111'], A: ['010', '101', '111', '101', '101'], S: ['111', '100', '111', '001', '111'] };
      { let off = 0;
        for (const ch of 'БОРЕЙ') { const g = FONT[ch]; g.forEach((row, r) => [...row].forEach((c, k) => { if (c !== '1') return; const z = 112 - off - k, y = DK - 2 - r, x = outX(z, y); if (x > 0) w.set(x, y, z, B.hullW); })); off += g[0].length + 1; } }
      // 닻(동쪽 뱃머리, 부품)과 닻줄 구멍
      const AZ = 116, AY = DK - 3; let AXo = 0; for (let z = AZ - 2; z <= AZ + 2; z++) for (let y = AY - 3; y <= AY + 1; y++) AXo = Math.max(AXo, outX(z, y) + 1);
      w.box(AXo - 1, AY + 1, AZ - 1, AXo - 1, AY + 2, AZ + 1, B.iron);
      const anchor = w.prop({ name: 'anchor', pivot: [AXo + 0.5, AY + 1, AZ + 0.5] });
      anchor.box(AXo, AY - 3, AZ, AXo, AY + 1, AZ, B.iron); anchor.box(AXo, AY - 3, AZ - 2, AXo, AY - 3, AZ + 2, B.iron); anchor.set(AXo, AY - 2, AZ - 2, B.iron); anchor.set(AXo, AY - 2, AZ + 2, B.iron); anchor.box(AXo, AY + 1, AZ - 1, AXo, AY + 1, AZ + 1, B.iron);

      // ── 선체에 밀려 쌓인 얼음 능선, 뱃머리 둘레 얼음 더미 ──
      const SLAB = [127, 146, CX - 9, CX + 8], inSlab = (x, z) => z >= SLAB[0] && z <= SLAB[1] && x >= SLAB[2] && x <= SLAB[3];
      for (let z = 0; z <= 124; z++) for (const s of [-1, 1]) {
        const hw = hwAt(z, G + 1); if (hw < 0) continue;
        const xE = s > 0 ? Math.floor(CX + hw - 0.5) : Math.ceil(CX - hw - 0.5);
        for (let k = 1; k <= 7; k++) {
          const x = xE + s * k; if (x < 0 || x >= W || wm[x + W * z] || inSlab(x, z)) continue;
          const h = Math.floor(hash3(x, k, z) * 4.4 * (1 - k / 8) + n.fbm(x * 0.2, z * 0.2) * 1.5 + (z > 96 ? 1 : 0));
          for (let y = G + 1; y <= G + h; y++) if (!w.get(x, y, z)) w.set(x, y, z, hash3(x, y, z) > 0.4 ? B.iceBlk : B.iceBlk2);
        }
      }
      for (let z = 112; z < 150; z++) for (let x = CX - 22; x <= CX + 22; x++) {
        if (z >= SLAB[0] - 3 && x >= SLAB[2] - 3 && x <= SLAB[3] + 3 || wm[x + W * z]) continue;
        const d = Math.hypot((z - 118) * 0.9, x + 0.5 - CX); if (d > 22) continue;
        const h = Math.floor(hash3(x, 7, z) * 4.5 * (1 - d / 23) + 0.6);
        for (let y = G + 1; y <= G + h; y++) if (!w.get(x, y, z)) w.set(x, y, z, hash3(x, y, z) > 0.5 ? B.iceBlk : B.iceBlk2);
      }
      for (let z = SLAB[0]; z <= SLAB[1]; z++) for (let x = SLAB[2]; x <= SLAB[3]; x++) { if (w.get(x, G + 6, z)) continue; for (let y = G - 2; y <= G + 5; y++) if (!inHull(x, y, z)) w.set(x, y, z, 0); w.set(x, G - 3, z, B.sea); w.liquid(x, z, G - 1); }

      // ── 상부 구조물: 반폭 23, 3~8층(한 층 5칸). 정면은 한 칸 오를 때 0.4칸씩 뒤로 눕고, 앞 모서리는 깎았다 ──
      const SH = 23, FH = 5, LVN = 6, TOPY = DK + LVN * FH;                   // TOPY = 조타실 바닥
      const zf = y => ZF - Math.floor((y - DK - 1) * 0.4);
      const ssIn = (x, y, z) => { const ax = Math.abs(dxOf(x)); return z <= zf(y) && ax <= SH && (zf(y) - z) + (SH - ax) >= 3; };
      const lvWall = [B.sWall, B.stripeR, B.stripeB, B.stripeW, B.sWall, B.sWall];
      for (let y = DK + 1; y <= TOPY; y++) {
        const k = Math.min(LVN - 1, Math.floor((y - DK - 1) / FH)), fy = (y - DK - 1) % FH;
        for (let z = 0; z <= ZF; z++) for (let x = CX - SH - 1; x <= CX + SH; x++) {
          if (!ssIn(x, y, z)) continue;
          const sh = z === 0 || !ssIn(x + 1, y, z) || !ssIn(x - 1, y, z) || !ssIn(x, y, z + 1) || !ssIn(x, y, z - 1);
          if (!sh) { if (y === TOPY || y % FH === 0) w.set(x, y, z, B.sWall); continue; }
          if (z === 0) { w.set(x, y, z, y === TOPY ? B.sRoof : B.sWall); continue; }            // 지도 가장자리 단면(배는 북쪽으로 이어진다)
          const front = !ssIn(x, y, z + 1), u = front ? x : z;
          let b = y === TOPY ? B.sRoof : fy === 0 ? B.sLine : lvWall[k];
          if (y < TOPY) {
            if (k === 0 && front && fy >= 1 && fy <= 3) b = (x % 6 === 0) ? B.frame : (hash3(x, 2, 9) > 0.35 ? B.win : B.winD);   // 3층 식당의 긴 창
            else if (fy >= 2 && fy <= 3 && u % 4 >= 1 && u % 4 <= 2) b = hash3(u >> 2, k, x * 3 + z) > 0.72 ? B.win : B.winD;
          }
          w.set(x, y, z, b);
        }
      }
      for (const s of [-1, 1]) { const x = Math.round(CX - 0.5 + s * 6); w.box(x, DK + 1, zf(DK + 1), x + 1, DK + 3, zf(DK + 1), B.doorS); }   // 3층 정면 문 둘
      // 동쪽 옆면 바깥 계단(층마다 꺾이며 오른다)
      for (let k = 0; k < LVN - 1; k++) for (let s = 0; s < FH; s++) {
        const y = DK + 1 + k * FH + s, z = ZF - 8 - (k % 2 ? FH - s : s) - 1, x = CX + SH;
        w.set(x, y, z, B.rail); w.set(x + 1, y + 1, z, B.rail);
        if (s === FH - 1) w.box(x, y + 1, z - 1, x, y + 1, z + 1, B.rail);
      }
      landmarks.push({ name: '3층 식당 · 체육관', note: '상부 구조물 맨 아래층 · 웨지(The Wedge)와 블랙 디비전이 지키는 체육관', p: [CX + 0.5, DK + 12, ZF + 2], boss: true });

      // ── 9층 조타실: 배 폭만큼 넓은 앞쪽(바깥 날개는 조금 더 앞으로), 깎은 바깥 모서리, 뒤쪽은 비스듬히 좁아져 가운데 해도실로 ──
      const BY = TOPY, ZB = zf(TOPY) + 3;
      const brIn = (x, z) => {
        const ax = Math.abs(dxOf(x));
        if (ax > 29.5) return false;
        const fz = ax > 20 ? ZB + 1 : ZB;
        if (z > fz || fz - z + (29.5 - ax) < 4) return false;
        if (z >= ZB - 6) return true;
        const bz = ZB - 6 - (29.5 - ax) * 0.45;                              // 비스듬한 뒷벽
        return ax <= 12 ? z >= ZB - 26 : z >= bz;
      };
      for (let z = ZB - 30; z <= ZB + 2; z++) for (let x = CX - 31; x <= CX + 31; x++) {
        if (!brIn(x, z)) continue;
        const sh = !brIn(x + 1, z) || !brIn(x - 1, z) || !brIn(x, z + 1) || !brIn(x, z - 1), ax = Math.abs(dxOf(x));
        w.set(x, BY, z, B.sRoof); w.set(x, BY + 6, z, B.sRoof);
        if (!sh) continue;
        for (let y = BY + 1; y <= BY + 5; y++) {
          let b = y === BY + 1 || y === BY + 5 ? B.sWall : B.sWall;
          if (y >= BY + 2 && y <= BY + 4 && !(ax <= 12 && z < ZB - 10)) b = ((x + z) % 4 === 0) ? B.frame : B.brWin;
          w.set(x, y, z, b);
        }
        w.set(x, BY + 7, z, B.rail);                                           // 지붕 난간
      }
      for (const s of [-1, 1]) {                                               // 정면 투광등 둘(조타실 정면에 박힌 흰 등 덩어리)
        const x0 = Math.round(CX - 0.5 + s * 9) - 2;
        w.box(x0, BY + 2, ZB, x0 + 4, BY + 4, ZB, B.flood); w.box(x0 - 1, BY + 1, ZB + 1, x0 + 5, BY + 1, ZB + 1, B.iron);
      }
      lights.push({ name: 'flood', p: [CX + 0.5, BY + 3, ZB + 3.5], c: '#fff0d0', i: 0.9, d: 60, flicker: 0.04, srcR: 12 });
      lights.push({ name: 'bridge', p: [CX + 0.5, BY + 3, ZB - 3], c: '#bfe8ff', i: 0.4, d: 26, flicker: 0.05, srcR: 6 });
      // 지붕 집: 정면에 「BOREAS」 흰 간판, 좌우 레이돔, 남색 돛대, 날개 끝 탐조등
      const RZ0 = ZB - 22, RZ1 = ZB - 12;
      w.box(CX - 12, BY + 7, RZ0, CX + 11, BY + 11, RZ1, B.sWall); w.box(CX - 13, BY + 12, RZ0 - 1, CX + 12, BY + 12, RZ1 + 1, B.sRoof);
      w.box(CX - 12, BY + 7, RZ1 + 1, CX + 11, BY + 11, RZ1 + 1, B.signW);
      { let off = 0; for (const ch of 'BOREAS') { FONT[ch].forEach((row, r) => [...row].forEach((c, k) => { if (c === '1') w.set(CX - 12 + off + k, BY + 11 - r, RZ1 + 1, B.signK); })); off += 4; } }
      for (const s of [-1, 1]) { const x = Math.round(CX - 0.5 + s * 17); w.box(x, BY + 7, ZB - 8, x, BY + 8, ZB - 8, B.rail); w.sphere(x, BY + 11, ZB - 8, 2.6, B.dome); }
      const MZ = ZB - 18, MTOP = BY + 32;
      w.box(CX - 1, BY + 13, MZ - 1, CX, BY + 20, MZ, B.mastN); w.box(CX - 1, BY + 21, MZ - 1, CX - 1, MTOP, MZ - 1, B.mastN);
      w.box(CX - 8, BY + 24, MZ - 1, CX + 7, BY + 24, MZ - 1, B.mastN); w.box(CX - 5, BY + 28, MZ - 1, CX + 4, BY + 28, MZ - 1, B.mastN);
      w.set(CX - 1, MTOP + 1, MZ - 1, B.redL); w.set(CX - 8, BY + 25, MZ - 1, B.redL); w.set(CX + 7, BY + 25, MZ - 1, B.redL); w.set(CX - 1, BY + 29, MZ, B.navW);
      w.box(CX + 1, BY + 18, MZ - 1, CX + 2, BY + 19, MZ, B.craneY);             // 기적
      lights.push({ name: 'mast', p: [CX - 0.5, MTOP + 1, MZ - 0.5], c: '#ff4a3a', i: 0.4, d: 26, flicker: 0.1, srcR: 3 });
      for (const s of [-1, 1]) { const x = Math.round(CX - 0.5 + s * 27); w.box(x, BY + 7, ZB - 1, x, BY + 8, ZB - 1, B.iron); w.set(x, BY + 9, ZB - 1, B.lampW); }
      lights.push({ name: 'search', p: [CX + 27.5, BY + 9, ZB + 0.5], c: '#e8f6ff', i: 0.45, d: 40, flicker: 0.05, srcR: 3 });
      landmarks.push({ name: '조타실', note: '9층 · 배 폭만큼 넓은 함교, 날개 끝 탐조등', p: [CX + 0.5, BY + 20, ZB], tag: 'BRIDGE' });

      // ── 앞갑판(상부 구조물 정면 → 뱃머리): 접어 둔 크레인 둘, 컨테이너, 작은 돔, 앞 갑판실, V자 양묘기 넷, 앞 돛대, 계선주 ──
      const DY = z => deckY(z) + 1;
      for (const [s, z] of [[-1, 66], [1, 69]]) {
        const px = Math.round(CX - 0.5 + s * 22), ex = Math.round(CX - 0.5 - s * 9);
        w.cyl(px, z, DY(z), DY(z) + 5, 1.6, B.crane); w.box(px - 2, DY(z) + 6, z - 1, px + 2, DY(z) + 8, z + 2, B.crane); w.set(px - s * 2, DY(z) + 7, z + 2, B.brWin);
        w.box(Math.min(px, ex), DY(z) + 7, z, Math.max(px, ex), DY(z) + 8, z, B.crane);        // 배를 가로질러 눕힌 붐
        w.box(ex, DY(z), z, ex, DY(z) + 6, z, B.iron); w.box(ex - s, DY(z) + 7, z, ex - s * 2, DY(z) + 8, z, B.craneY);
      }
      const cont = (x0, x1, z0, b) => { w.box(x0, DY(z0), z0, x1, DY(z0) + 2, z0 + 2, b); w.box(x0, DY(z0), z0, x0, DY(z0) + 2, z0 + 2, B.iron); w.box(x1, DY(z0), z0, x1, DY(z0) + 2, z0 + 2, B.iron); };
      cont(CX + 6, CX + 17, 73, B.cBl); for (let x = CX + 8; x <= CX + 15; x++) w.set(x, DY(73) + 1, 75, x % 2 ? B.cWh : B.cBl);   // MS LOOPS & RINGS
      cont(CX - 18, CX - 10, 74, B.cGr);
      w.box(CX - 3, DY(77), 77, CX - 2, DY(77), 78, B.iron); w.sphere(CX - 2, DY(77) + 2, 77, 1.8, B.dome);
      const FX0 = CX - 9, FX1 = CX + 5, FZ0 = 82, FZ1 = 91, FH2 = 4;              // 앞 갑판실
      for (let z = FZ0; z <= FZ1; z++) for (let x = FX0; x <= FX1; x++) {
        if (z > 87 && Math.min(x - FX0, FX1 - x) + (FZ1 - z) < 4) continue;
        w.box(x, DY(z), z, x, DY(z) + FH2 - 1, z, B.hatch); w.set(x, DY(z) + FH2, z, hash3(x, 3, z) > 0.4 ? B.snowD : B.hatch);
      }
      w.box(CX - 3, DY(FZ0), FZ0, CX - 2, DY(FZ0) + 2, FZ0, B.doorS); w.box(FX0, DY(FZ0) + FH2 + 1, FZ0, FX1, DY(FZ0) + FH2 + 1, FZ0, B.rail);
      // 양묘기: 받침, 가로 드럼, 체인 바퀴(부품)
      const drum = (t, xc, yc, zc, r, len, b) => { for (let i = -len; i <= len; i++) for (let dy = -2; dy <= 2; dy++) for (let dz = -2; dz <= 2; dz++) if (dy * dy + dz * dz <= r * r) t.set(xc + i, yc + dy, zc + dz, b); };
      const WL = [[-5, 96], [-3, 103], [4, 96], [2, 103]];                       // 바깥쪽 둘은 앞으로, 안쪽 둘은 뒤로: 위에서 보면 V자
      WL.forEach(([dx, z], k) => {
        const x = CX + dx, y = DY(z), s = dx < 0 ? -1 : 1, gx = x + s * 3;
        w.box(x - 2, y, z - 2, x + 2, y, z + 2, B.iron); drum(w, x, y + 3, z, 2, 2, B.wlass);
        w.box(x - s * 3, y + 1, z - 2, x - s * 3, y + 4, z + 2, B.wlass); w.box(x - s * 4, y + 1, z - 1, x - s * 4, y + 3, z + 1, B.iron);   // 모터 함
        const gy = w.prop({ name: 'gypsy' + k, pivot: [gx + 0.5, y + 3.5, z + 0.5], axis: 'x', speed: 0.01 });
        for (let dy = -3; dy <= 3; dy++) for (let dz = -3; dz <= 3; dz++) { const r = Math.hypot(dy, dz); if (r <= 3.2 && r > 0.8) gy.set(gx, y + 3 + dy, z + dz, r > 2.4 ? ((dy + dz) & 1 ? B.chain : B.iron) : B.wlass); }
        gy.set(gx, y + 3, z, B.iron);
        w.line(gx, y + 1, z + 3, CX + s * (k % 2 ? 8 : 10), DY(114), 113 + (k % 2), B.chain);   // 닻줄 → 닻줄 구멍
      });
      for (const s of [-1, 1]) w.cyl(CX + s * 10, 114, DY(114) - 1, DY(114) - 1, 1.2, B.iron);
      // 앞 돛대: 굵은 기둥, 앞뒤로 긴 발판과 투광등, 꼭대기 흰 등·양옆 붉고 푸른 등
      const FMZ = 116, FY = DY(FMZ);
      w.cyl(CX, FMZ, FY, FY + 10, 1.7, B.mastN); w.cyl(CX, FMZ, FY + 11, FY + 26, 0.9, B.mastN);
      w.box(CX - 1, FY + 12, FMZ - 4, CX + 1, FY + 12, FMZ + 5, B.iron); w.box(CX - 2, FY + 13, FMZ - 4, CX + 2, FY + 13, FMZ - 4, B.rail); w.box(CX - 2, FY + 13, FMZ + 5, CX + 2, FY + 13, FMZ + 5, B.rail);
      for (const s of [-2, 2]) w.box(CX + s, FY + 13, FMZ - 4, CX + s, FY + 13, FMZ + 5, B.rail);
      w.box(CX - 1, FY + 14, FMZ - 5, CX, FY + 14, FMZ - 5, B.lampW); w.box(CX - 4, FY + 20, FMZ, CX + 4, FY + 20, FMZ, B.mastN);
      w.set(CX, FY + 27, FMZ, B.navW); w.set(CX - 4, FY + 21, FMZ, B.redL); w.set(CX + 4, FY + 21, FMZ, B.navG);
      for (let y = FY; y <= FY + 11; y++) w.set(CX, y, FMZ - 2, y % 2 ? B.rail : 0);
      lights.push({ name: 'bow', p: [CX - 0.5, FY + 14, FMZ - 5.5], c: '#fff4dc', i: 0.6, d: 36, flicker: 0.05, srcR: 3 });
      lights.push({ name: 'deck', p: [CX + 0.5, DK + 6, ZF + 8], c: '#ffe8c0', i: 0.45, d: 30, flicker: 0.05, srcR: 14 });
      for (const z of [70, 92, 108]) for (const s of [-1, 1]) { const x = Math.round(CX - 0.5 + s * (hwAt(z, deckY(z)) - 3)); w.box(x, DY(z), z, x, DY(z) + 1, z, B.iron); w.box(x, DY(z), z + 2, x, DY(z) + 1, z + 2, B.iron); }
      landmarks.push({ name: '앞갑판', note: 'V자 양묘기 넷과 앞 돛대 · 그 아래 0층에 나이트(Knight)가 머문다', p: [CX + 0.5, DK + 14, 102] });
      // 동쪽 뱃전 줄사다리(얼음으로 내려간다)
      { const z = 80, x = outX(z, DK - 1) + 1; for (let y = G + 1; y <= DK; y++) { w.set(x, y, z, B.rail); w.set(x, y, z + 2, B.rail); if (y % 2 === 0) w.set(x, y, z + 1, B.crateM); } }

      // ── 이정표: 3층 정면 오른쪽 문 앞, 조타실로 들어간다 ──
      { const sx = CX + 9, sz = ZF + 3; w.hm[sx + W * sz] = deckY(sz);
        const sp = OR.signpost(w, B, sx, sz, { dir: [1, 0], h: 6, boards: 1 });
        acts.push(OR.goAct({ at: sp, name: '조타실로 올라가기', goto: 'icebreaker-in', hint: '상부 구조물 계단을 올라 9층 조타실 안으로 들어가요' })); }

      // ── 얼음 위: 남동쪽 호버크래프트(부품), 뱃머리 앞 사륜 오토바이 둘, 상자 ──
      for (const [x, z, h] of [[CX + 36, 92, 2], [CX + 38, 92, 1], [CX + 36, 95, 1]]) w.box(x, G + 1, z, x + 1, G + h, z + 1, B.crateM);
      for (const [qx, qz] of [[CX - 22, 140], [CX + 14, 145]]) {
        w.box(qx, G + 1, qz, qx + 2, G + 1, qz + 4, B.iron); w.box(qx, G + 2, qz + 1, qx + 2, G + 2, qz + 3, B.quad); w.set(qx + 1, G + 3, qz + 2, B.quad);
        w.box(qx, G + 3, qz + 1, qx + 2, G + 3, qz + 1, B.iron); w.set(qx, G + 2, qz + 4, B.tail); w.set(qx + 2, G + 2, qz + 4, B.tail); w.set(qx + 1, G + 2, qz, B.lampW);
      }
      lights.push({ name: 'quad', p: [CX + 15.5, G + 3, 149.5], c: '#ff4030', i: 0.35, d: 18, flicker: 0.1, srcR: 12 });
      const HCX = CX + 47, HX0 = HCX - 6, HX1 = HCX + 6, HZ0 = 100, HZ1 = 118;
      for (let z = HZ0 - 1; z <= HZ1 + 1; z++) w.box(HX0 - 1, G + 1, z, HX1 + 1, G + 12, z, 0);
      const hov = w.prop({ name: 'hover', pivot: [HCX + 0.5, G + 1, (HZ0 + HZ1) / 2] });
      for (let z = HZ0; z <= HZ1; z++) for (let x = HX0; x <= HX1; x++) {
        if ((x === HX0 || x === HX1) && (z === HZ0 || z === HZ1)) continue;
        hov.box(x, G + 1, z, x, G + 2, z, B.skirt); hov.set(x, G + 3, z, z < HZ0 + 3 ? B.hoverR : B.hover);
      }
      hov.box(HX0 + 2, G + 4, HZ0 + 2, HX1 - 2, G + 6, HZ0 + 11, B.hoverW); hov.box(HX0 + 2, G + 5, HZ0 + 2, HX1 - 2, G + 5, HZ0 + 2, B.glass);
      for (let z = HZ0 + 3; z <= HZ0 + 10; z += 2) { hov.set(HX0 + 2, G + 5, z, B.glass); hov.set(HX1 - 2, G + 5, z, B.glass); }
      hov.box(HX0 + 2, G + 7, HZ0 + 2, HX1 - 2, G + 7, HZ0 + 11, B.hover); hov.set(HCX, G + 8, HZ0 + 3, B.lampW);
      const fans = [HCX - 3, HCX + 3];
      fans.forEach((fx, k) => {
        for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const r = Math.hypot(dy, dx); if (r > 2.3 && r < 3.4) hov.set(fx + dx, G + 7 + dy, HZ1 - 1, B.fan); }
        hov.box(fx, G + 4, HZ1 - 1, fx, G + 4, HZ1 - 1, B.fan);
        const f = w.prop({ name: 'fan' + k, pivot: [fx + 0.5, G + 7.5, HZ1 - 0.5], axis: 'z', speed: 0.01 });
        f.box(fx - 2, G + 7, HZ1, fx + 2, G + 7, HZ1, B.iron); f.box(fx, G + 5, HZ1, fx, G + 9, HZ1, B.iron);
      });
      lights.push({ name: 'hover', p: [HCX + 0.5, G + 9, HZ0 + 2.5], c: '#e8f0ff', i: 0.4, d: 22, flicker: 0.05, srcR: 3 });
      landmarks.push({ name: '호버크래프트', note: '등대·해안선 부두에서 얼음 위로 건너오는 탈것', p: [HCX + 0.5, G + 14, 141] });

      // ════ 상호작용 ════
      // 조타실 탐조등 빛줄기(동쪽 날개 끝, 부품): 펼쳐져 얼음판을 훑는다
      const BP = [CX + 27, BY + 9, ZB - 1], th0 = 0.75, slope = 0.8;
      const beam = w.prop({ name: 'beam', pivot: [BP[0] + 0.5, BP[1] + 0.5, BP[2] + 0.5], scl0: [0, 0, 0] });
      let end = null;
      for (let s = 1.5; s < 140; s += 0.5) {
        const cx = BP[0] + Math.cos(th0) * s, cy = BP[1] - slope * s, cz = BP[2] + Math.sin(th0) * s;
        if (cy < G + 1.5) { end = [cx, cz]; break; }
        const r = 0.35 + s * 0.05, R = Math.ceil(r);
        for (let dy = -R; dy <= R; dy++) for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          if (dx * dx + dy * dy + dz * dz > r * r) continue;
          const x = Math.round(cx + dx), y = Math.round(cy + dy), z = Math.round(cz + dz);
          if (w.get(x, y, z) || hash3(x, y, z) < 0.45) continue;
          beam.set(x, y, z, B.beamL);
        }
      }
      if (end) for (let dz = -6; dz <= 6; dz++) for (let dx = -6; dx <= 6; dx++) { const x = Math.round(end[0] + dx), z = Math.round(end[1] + dz); if (Math.hypot(dx, dz) <= 5 && !w.get(x, G + 1, z)) beam.set(x, G + 1, z, B.beamL); }
      acts.push({
        name: '조타실 탐조등', hint: '조타실 동쪽 날개 끝 탐조등이 켜지며 눈보라 속 얼음판을 천천히 훑어요', hit: [BP[0] - 2, BY + 6, BP[2] - 2, BP[0] + 2, BY + 10, BP[2] + 2],
        run: async a => {
          a.flash('search', 6, 8.5); a.flash('bridge', 2, 8.5);
          await a.tween('beam', { scl: [1, 1, 1] }, 0.8);
          await a.turn('beam', [0, -0.45, 0], 2.4); await a.turn('beam', [0, 0.4, 0], 3);
          await a.turn('beam', [0, 0, 0], 1.2); await a.tween('beam', { scl: [0, 0, 0] }, 0.6);
        },
      });
      acts.push({
        name: '정면 투광등', hint: '조타실 정면의 커다란 투광등 둘이 번쩍 켜지며 눈 덮인 앞갑판을 하얗게 비춰요', hit: [CX - 12, BY + 1, ZB - 1, CX + 12, BY + 5, ZB + 2],
        run: async a => {
          a.flash('flood', 4, 5); a.flash('deck', 3, 5); a.glow(2, 5);
          for (let k = 0; k < 10; k++) { a.burst([CX - 8 + (k % 2) * 17, BY + 3, ZB + 2], { n: 14, colors: ['#ffffff', '#fff4d8', '#e4eef8'], speed: 2, up: -1, life: 1.6, gravity: 1, spread: 2.5 }); await a.wait(0.4); }
        },
      });
      const radar = w.prop({ name: 'radar', pivot: [CX - 0.5, BY + 15, RZ1 - 1.5], speed: 0.9 });
      radar.box(CX - 1, BY + 13, RZ1 - 2, CX - 1, BY + 14, RZ1 - 2, B.iron); radar.box(CX - 5, BY + 15, RZ1 - 2, CX + 3, BY + 15, RZ1 - 2, B.frame); radar.box(CX - 5, BY + 16, RZ1 - 2, CX + 3, BY + 16, RZ1 - 2, B.rail);
      acts.push({
        name: '레이더 · 항공등', hint: '조타실 지붕의 레이더가 빙글빙글 빨라지고 남색 돛대의 붉은 항공등이 깜박여요', hit: [CX - 8, BY + 12, MZ - 3, CX + 8, MTOP + 2, RZ1],
        run: async a => { a.flash('mast', 6, 4.5); for (let k = 0; k < 4; k++) a.burst([CX - 0.5, MTOP + 1.5, MZ - 0.5], { n: 10, colors: ['#ff4a3a', '#ffb0a0'], speed: 1, up: 0.5, life: 0.8, gravity: 0, spread: 0.4 }); await a.spin('radar', 7, 4.5); },
      });
      acts.push({
        name: '뱃고동', hint: '남색 돛대의 놋쇠 기적에서 김이 뿜어지며 얼어붙은 바다에 긴 뱃고동이 울려요', hit: [CX - 3, BY + 16, MZ - 3, CX + 4, BY + 21, MZ + 2],
        run: async a => {
          a.flash('mast', 5, 5); a.wind(2.4, 5);
          for (let k = 0; k < 3; k++) {
            for (let j = 0; j < 5; j++) { a.burst([CX + 2.5, BY + 20, MZ], { n: 22, colors: ['#ffffff', '#e0ecf4', '#b8c8d8'], speed: 2.2, up: 5, life: 2.2, gravity: -0.8, spread: 0.8 }); await a.wait(0.18); }
            await a.wait(0.5);
          }
        },
      });
      acts.push({
        name: '양묘기 · 닻 내리기', hint: '앞갑판 양묘기의 체인 바퀴가 돌며 동쪽 뱃머리의 닻이 얼음 위로 내려가요', hit: [CX - 10, DK + 1, 93, CX + 9, DK + 9, 106],
        run: async a => {
          a.flash('bow', 3, 6);
          for (let k = 0; k < 4; k++) a.spin('gypsy' + k, 300, 5.5);
          for (let k = 0; k < 6; k++) { a.burst([CX + (k % 2 ? 7 : -8), DK + 8, 99], { n: 8, colors: ['#c8d4dc', '#ffffff', '#6a6058'], speed: 1.5, up: 2, life: 0.8, gravity: 4, spread: 1 }); await a.wait(0.25); }
          await a.move('anchor', [0, -(AY - G - 5), 0], 2.2);
          a.burst([AXo + 0.5, G + 2, AZ + 0.5], { n: 40, colors: ['#ffffff', '#c8e0ee', '#7aa0b8'], speed: 4, up: 3, life: 1.2, gravity: 8, spread: 1.5 });
          await a.wait(1.2); await a.move('anchor', [0, 0, 0], 2.5);
        },
      });
      // 쇄빙 돌진: 뱃머리 앞 깨진 얼음판(부품)이 들려 갈라진다
      const slabs = [[128, CX - 9, CX - 1], [129, CX, CX + 8], [136, CX - 9, CX], [137, CX + 1, CX + 8]], tilt0 = k => [-0.1 - (k % 3) * 0.05, 0, (k % 2 ? 0.08 : -0.07)];
      slabs.forEach(([z0, x0, x1], k) => {
        const xc = (x0 + x1) / 2, hx = (x1 - x0) / 2 + 0.6;
        const p = w.prop({ name: 'slab' + k, pivot: [xc + 0.5, G + 1, z0], rot0: tilt0(k) });
        for (let z = z0; z <= z0 + 6; z++) for (let x = x0; x <= x1; x++) {
          if (Math.abs(z - z0 - 3) / 3.6 + Math.abs(x - xc) / hx > 1.15 + hash3(x, 3, z) * 0.3 || w.get(x, G, z)) continue;
          p.set(x, G, z, B.iceBlk2); p.set(x, G + 1, z, hash3(x, k, z) > 0.3 ? B.iceBlk : B.snowI);
        }
      });
      acts.push({
        name: '쇄빙 돌진', hint: '배가 얼음을 밀어붙이자 뱃머리 앞 얼음판이 들려 쩍 갈라지고 검은 물이 튀어요', hit: [CX - 10, G, 127, CX + 9, G + 8, 146],
        run: async a => {
          a.flash('bow', 4, 4); a.lightning(0.3);
          for (let k = 0; k < 4; k++) {
            a.turn('slab' + k, [-0.55 - k * 0.1, 0, k % 2 ? 0.2 : -0.2], 0.5);
            a.burst([CX - 4 + (k & 1) * 8, G + 2, 131 + (k >> 1) * 7], { n: 34, colors: ['#e8f4ff', '#a4c6da', '#ffffff', '#16283a'], speed: 5, up: 7, life: 1.4, gravity: 12, spread: 1.6 });
            await a.wait(0.3);
          }
          a.burst([CX, G + 3, 128], { n: 70, colors: ['#ffffff', '#c8e0ee', '#2a4054'], speed: 8, up: 6, life: 1.6, gravity: 10, spread: 3, flat: true });
          await a.wait(1.4);
          await Promise.all([0, 1, 2, 3].map(k => a.turn('slab' + k, tilt0(k), 1.6)));
        },
      });
      acts.push({
        name: '호버크래프트 도착', hint: '덕트 프로펠러 둘이 웅웅 돌며 호버크래프트가 눈보라를 일으키며 뱃머리 옆으로 미끄러져 와요', hit: [HX0, G + 1, HZ0, HX1, G + 10, HZ1],
        run: async a => {
          a.flash('hover', 5, 9); a.spin('fan0', 1200, 9); a.spin('fan1', 1200, 9);
          const pts = [[4, 0, 12], [-4, 0, 26]];
          const spray = async () => { for (let k = 0; k < 8; k++) { a.burst([HCX + 0.5, G + 1.5, HZ1 + 1 + 3 * k], { n: 20, colors: ['#ffffff', '#dfe9f2'], speed: 3, up: 1.5, life: 1, gravity: 2, spread: 3, flat: true }); await a.wait(0.4); } };
          await Promise.all([a.path('hover', pts, 3.2), a.path('fan0', pts, 3.2), a.path('fan1', pts, 3.2), spray()]);
          await a.wait(1.2);
          await Promise.all([a.respawn('hover', 1.0), a.respawn('fan0', 1.0), a.respawn('fan1', 1.0)]);
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
