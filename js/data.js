/*
 * Fate Five Dungeon — 게임 데이터
 * 직업, 카드, 빛(패시브), 아이템, 상점, 지역/몬스터 정의.
 * 전투는 라이브러리 오브 루이나식 주사위 합을 따른다. (게임 안 이름: 운명 주사위)
 *
 * 카드 튜플: [id, 이름, 코스트, 주사위 목록, 효과, 희귀도]
 *   코스트  : 0~5, 강할수록 높다.
 *   주사위  : [종류, 최소, 최대]
 *     공격 주사위  S 참격 / P 관통 / B 타격 — 적의 내성에 따라 피해 배율이 달라진다.
 *     방어 주사위  G 방어 (막은 만큼 피해를 줄이고, 이기면 차이만큼 반격)
 *                 E 회피 (이기면 공격을 피하고 같은 주사위를 다시 쓴다)
 *
 * 효과(fx)
 *   bleed n     공격 주사위가 적중할 때마다 출혈 n
 *   burn n      공격 주사위가 적중할 때마다 화상 n
 *   weak n      첫 적중 시 대상에게 다음 턴 허약 n
 *   fragile n   첫 적중 시 대상에게 다음 턴 취약 n
 *   lifesteal r 가한 피해의 r 비율만큼 회복
 *   selfDmg n   사용 시 체력 n 소모
 *   start { heal, might, endure, protect }
 *               전투 시작 시(합 전에) 자신에게 적용. 회복 / 이번 턴 힘·인내·보호
 */
(function (root) {
  'use strict';

  // 주사위 종류
  const DICE = {
    S: { key: 'slash', name: '참격', icon: '⚔', atk: true },
    P: { key: 'pierce', name: '관통', icon: '➶', atk: true },
    B: { key: 'blunt', name: '타격', icon: '⚒', atk: true },
    G: { key: 'guard', name: '방어', icon: '⛨', atk: false },
    E: { key: 'evade', name: '회피', icon: '↯', atk: false },
  };
  const ATK_TYPES = ['slash', 'pierce', 'blunt'];
  const TYPE_OF = { S: 'slash', P: 'pierce', B: 'blunt' };
  const TYPES = { slash: DICE.S, pierce: DICE.P, blunt: DICE.B };
  // 내성 배율 이름
  const RES_NAME = { 2: '치명', 1.5: '약점', 1: '보통', 0.5: '인내', 0.25: '내성' };

  const CARDS = {};
  function defCards(list, extra) {
    list.forEach(([id, name, cost, dice, fx, rarity]) => {
      CARDS[id] = Object.assign({
        id, name, cost,
        dice: dice.map(([t, min, max]) => ({ t, min, max })),
        fx: fx || {}, rarity: rarity || 'common',
      }, extra || {});
    });
  }

  // ───────── 직업 ─────────
  const CLASSES = [
    {
      id: 'swordsman', name: '방랑검사', icon: '🗡️', hp: 130,
      role: '딜러', weapon: '검',
      desc: '검 한 자루로 떠도는 검객. 참격 주사위와 회피만으로 싸우며, 방어 대신 먼저 베어 넘긴다.',
      trait: { name: '검의 길', desc: '참격 주사위 위력 +2', mods: { slashPower: 2 } },
      starter: ['s_quick', 's_slash', 's_parry', 's_cross', 's_draw', 's_bloody', 's_flurry', 's_moon', 's_final'],
    },
    {
      id: 'herald', name: '전령', icon: '🕊️', hp: 125,
      role: '회복 · 지원', weapon: '창과 성령',
      desc: '성령의 말씀을 전하는 순례 전령. 창으로 꿰뚫고, 기도로 상처를 치유한다.',
      trait: { name: '성령의 숨결', desc: '매 턴 종료 시 체력 1 회복', mods: { regen: 1 } },
      starter: ['h_jab', 'h_thrust', 'h_pray', 'h_lunge', 'h_blessing', 'h_sweep', 'h_hymn', 'h_holyspear', 'h_judgment'],
    },
    {
      id: 'cavalry', name: '중기병', icon: '🛡️', hp: 180,
      role: '탱커', weapon: '메이스와 갑옷',
      desc: '말을 잃고도 갑옷을 벗지 않은 기사. 메이스로 짓이기고 방패로 버틴다.',
      trait: { name: '튼튼한 갑옷', desc: '받는 피해 -2 (적중마다)', mods: { dmgReduce: 2 } },
      starter: ['c_bash', 'c_shieldup', 'c_strike', 'c_brace', 'c_smash', 'c_charge', 'c_counter', 'c_quake', 'c_crush'],
    },
  ];

  // 방랑검사 — 검만 쓰는 딜러
  defCards([
    ['s_quick', '빠른 베기', 0, [['S', 2, 5]]],
    ['s_slash', '베기', 1, [['S', 3, 6], ['S', 2, 4]]],
    ['s_parry', '흘려내기', 1, [['E', 3, 6], ['S', 3, 5]]],
    ['s_cross', '십자 베기', 2, [['S', 3, 7], ['S', 3, 7]]],
    ['s_draw', '발도', 2, [['S', 5, 9]]],
    ['s_bloody', '피의 검로', 3, [['S', 3, 7], ['S', 3, 7]], { bleed: 1 }],
    ['s_flurry', '난도질', 3, [['S', 2, 5], ['S', 2, 5], ['S', 2, 5], ['S', 2, 5]]],
    ['s_moon', '월광참', 4, [['S', 5, 9], ['S', 4, 8], ['S', 4, 8]]],
    ['s_final', '일섬', 5, [['S', 7, 12], ['S', 6, 10], ['S', 5, 9]]],
    ['s_feint', '허초', 1, [['E', 4, 7], ['S', 2, 6]], null, 'common'],
    ['s_rend', '찢어발기기', 2, [['S', 3, 6], ['S', 3, 6]], { bleed: 2 }, 'common'],
    ['s_dance', '칼춤', 2, [['E', 3, 6], ['S', 3, 6], ['S', 3, 6]], null, 'common'],
    ['s_focus', '정신 집중', 1, [['S', 3, 6]], { start: { might: 1 } }, 'common'],
    ['s_whirl', '회전 베기', 3, [['S', 4, 8], ['S', 4, 8], ['S', 4, 8]], null, 'rare'],
    ['s_ghost', '유령 걸음', 2, [['E', 5, 8], ['E', 5, 8], ['S', 4, 7]], null, 'rare'],
    ['s_behead', '참수', 4, [['S', 7, 13], ['S', 5, 9]], null, 'rare'],
    ['s_bloodmoon', '핏빛 달', 4, [['S', 4, 8], ['S', 4, 8], ['S', 4, 8]], { bleed: 2 }, 'rare'],
    ['s_thousand', '천의 검', 5, [['S', 4, 8], ['S', 4, 8], ['S', 4, 8], ['S', 4, 8], ['S', 4, 8]], null, 'legendary'],
    ['s_nameless', '무명검', 5, [['S', 9, 15], ['S', 8, 13]], null, 'legendary'],
    ['s_mirror', '거울 검', 3, [['E', 6, 9], ['E', 6, 9], ['S', 6, 10]], null, 'legendary'],
  ], { owner: 'swordsman' });

  // 전령 — 창과 성령 (회복, 기도)
  defCards([
    ['h_jab', '창 찌르기', 0, [['P', 2, 5]]],
    ['h_thrust', '꿰뚫기', 1, [['P', 3, 6], ['P', 2, 5]]],
    ['h_pray', '짧은 기도', 1, [['G', 3, 6]], { start: { heal: 6 } }],
    ['h_lunge', '돌진 찌르기', 2, [['P', 4, 8], ['P', 3, 6]]],
    ['h_blessing', '축복', 2, [['G', 4, 7], ['P', 3, 6]], { start: { might: 1 } }],
    ['h_sweep', '창대 휘두르기', 3, [['B', 4, 7], ['P', 4, 8], ['P', 3, 6]]],
    ['h_hymn', '성가', 3, [['G', 4, 8], ['P', 4, 7]], { start: { heal: 10 } }],
    ['h_holyspear', '성창', 4, [['P', 5, 9], ['P', 5, 9], ['P', 4, 8]], { burn: 1 }],
    ['h_judgment', '성령의 심판', 5, [['P', 6, 11], ['P', 6, 10], ['P', 5, 9]], { start: { heal: 8 } }],
    ['h_ward', '가호', 1, [['G', 4, 7]], { start: { protect: 2 } }, 'common'],
    ['h_sting', '연속 찌르기', 2, [['P', 3, 6], ['P', 3, 6], ['P', 3, 6]], null, 'common'],
    ['h_litany', '연도', 2, [['G', 3, 6], ['G', 3, 6]], { start: { heal: 8 } }, 'common'],
    ['h_pierce', '약점 꿰뚫기', 2, [['P', 5, 9]], { fragile: 2 }, 'common'],
    ['h_martyr', '순교자의 창', 0, [['P', 6, 10]], { selfDmg: 6 }, 'rare'],
    ['h_sanctuary', '성역', 3, [['G', 5, 9], ['G', 5, 9]], { start: { protect: 3, heal: 6 } }, 'rare'],
    ['h_lance', '기사창', 3, [['P', 5, 10], ['P', 4, 8]], null, 'rare'],
    ['h_flame', '성화', 3, [['P', 4, 8], ['P', 4, 8]], { burn: 2 }, 'rare'],
    ['h_choir', '천사의 합창', 4, [['G', 4, 8], ['P', 4, 8], ['P', 4, 8]], { start: { might: 2 } }, 'rare'],
    ['h_revive', '부활의 기도', 4, [['G', 6, 10]], { start: { heal: 25 } }, 'legendary'],
    ['h_heaven', '천상의 창', 5, [['P', 7, 12], ['P', 6, 11], ['P', 6, 11]], { burn: 2 }, 'legendary'],
  ], { owner: 'herald' });

  // 중기병 — 메이스와 튼튼한 갑옷
  defCards([
    ['c_bash', '메이스 휘두르기', 0, [['B', 2, 5]]],
    ['c_shieldup', '방패 들기', 1, [['G', 4, 7], ['B', 2, 4]]],
    ['c_strike', '내려치기', 1, [['B', 3, 7]]],
    ['c_brace', '버티기', 2, [['G', 4, 8], ['G', 3, 6]], { start: { protect: 1 } }],
    ['c_smash', '분쇄', 2, [['B', 4, 8], ['B', 3, 6]]],
    ['c_charge', '기마 돌격', 3, [['B', 5, 9], ['B', 4, 8]]],
    ['c_counter', '방패 반격', 3, [['G', 5, 8], ['B', 4, 8], ['B', 3, 6]]],
    ['c_quake', '대지 강타', 4, [['B', 6, 10], ['B', 5, 9]], { weak: 1 }],
    ['c_crush', '철퇴 난타', 5, [['B', 6, 11], ['B', 6, 10], ['B', 5, 9]]],
    ['c_plate', '판금 정비', 1, [['G', 5, 8]], { start: { protect: 2 } }, 'common'],
    ['c_rattle', '두들기기', 2, [['B', 3, 6], ['B', 3, 6], ['B', 3, 6]], null, 'common'],
    ['c_stun', '머리 가격', 2, [['B', 4, 8]], { weak: 2 }, 'common'],
    ['c_wall', '철벽', 2, [['G', 5, 9], ['G', 5, 9]], null, 'common'],
    ['c_warcry', '함성', 1, [['B', 3, 6]], { start: { might: 2 } }, 'rare'],
    ['c_trample', '짓밟기', 3, [['B', 5, 9], ['B', 5, 9]], { fragile: 1 }, 'rare'],
    ['c_fortress', '요새', 3, [['G', 6, 10], ['G', 5, 9]], { start: { endure: 2, protect: 2 } }, 'rare'],
    ['c_breaker', '갑옷 부수기', 4, [['B', 7, 12], ['B', 5, 9]], { fragile: 2 }, 'rare'],
    ['c_juggernaut', '저거너트', 5, [['B', 8, 13], ['B', 7, 12], ['G', 6, 10]], null, 'legendary'],
    ['c_bastion', '불굴의 성채', 4, [['G', 7, 11], ['G', 7, 11], ['B', 6, 10]], { start: { protect: 3 } }, 'legendary'],
    ['c_earthfall', '지축 붕괴', 5, [['B', 5, 9], ['B', 5, 9], ['B', 5, 9], ['B', 5, 9]], { weak: 2 }, 'legendary'],
  ], { owner: 'cavalry' });

  CLASSES.forEach(c => {
    c.pool = Object.values(CARDS).filter(x => x.owner === c.id && !c.starter.includes(x.id)).map(x => x.id);
  });
  const CLASS_MAP = {};
  CLASSES.forEach(c => { CLASS_MAP[c.id] = c; });

  // ───────── 빛 (시작 패시브) ─────────
  const LIGHT_POINTS = 9;
  const PASSIVES = [
    { id: 'l_body', name: '단련된 육체', cost: 1, desc: '최대 체력 +20', mods: { maxHp: 20 } },
    { id: 'l_luck', name: '행운', cost: 1, desc: '모든 주사위 최소값 +1', mods: { diceMin: 1 } },
    { id: 'l_prayer', name: '회복의 기도', cost: 1, desc: '전투 승리 시 체력 10 회복', mods: { winHeal: 10 } },
    { id: 'l_insight', name: '선견', cost: 1, desc: '손패 +1', mods: { handSize: 1 } },
    { id: 'l_greed', name: '탐욕', cost: 1, desc: '전투 승리 시 은화 +5', mods: { goldBonus: 5 } },
    { id: 'l_iron', name: '강철 피부', cost: 2, desc: '받는 피해 -1 (적중마다)', mods: { dmgReduce: 1 } },
    { id: 'l_thirst', name: '피의 갈망', cost: 2, desc: '가한 피해의 10% 흡혈', mods: { lifesteal: 0.1 } },
    { id: 'l_focus', name: '집중', cost: 2, desc: '턴당 코스트 +1', mods: { energy: 1 } },
    { id: 'l_seal', name: '출혈의 인장', cost: 2, desc: '카드 첫 적중 시 출혈 2 부여', mods: { firstHitBleed: 2 } },
    { id: 'l_ember', name: '불씨', cost: 2, desc: '카드 첫 적중 시 화상 2 부여', mods: { firstHitBurn: 2 } },
    { id: 'l_faith', name: '신념', cost: 3, desc: '모든 주사위 위력 +1', mods: { basePower: 1 } },
    { id: 'l_edge', name: '예리함', cost: 3, desc: '모든 주사위 최대값 +2', mods: { diceMax: 2 } },
    { id: 'l_undying', name: '불굴', cost: 3, desc: '전투마다 1회, 쓰러질 피해를 받으면 체력 1로 버팀', mods: { undying: 1 } },
    { id: 'l_third', name: '세 번째 손', cost: 4, desc: '스킬 슬롯 +1', mods: { slots: 1 } },
    { id: 'l_radiance', name: '광휘의 가호', cost: 4, desc: '매 턴 첫 번째로 쓰는 카드의 주사위 위력 +2', mods: { firstSkillBonus: 2 } },
    { id: 'l_saint', name: '성인의 생명력', cost: 4, desc: '최대 체력 +40, 매 턴 종료 시 체력 2 회복', mods: { maxHp: 40, regen: 2 } },
  ];

  // ───────── 아이템 ─────────
  // rarity: basic(최하급) < common(일반) < rare(희귀) < legendary(전설)
  // type: relic(영구 효과) | heal(즉시 회복) | card(새 스킬 카드로 교체) | upgrade(카드 강화)
  const ITEMS = [
    { id: 'it_rag', icon: '🩹', name: '거친 붕대', rarity: 'basic', type: 'heal', desc: '즉시 체력 20 회복', mods: { heal: 20 } },
    { id: 'it_chip', icon: '🪨', name: '숫돌 조각', rarity: 'basic', type: 'upgrade', desc: '카드 1장의 주사위 최대값 +1', upg: { umax: 1 } },
    { id: 'it_charm', icon: '🧶', name: '낡은 부적', rarity: 'basic', type: 'relic', desc: '최대 체력 +6', mods: { maxHp: 6 } },

    { id: 'it_bandage', icon: '🎗️', name: '성직자의 붕대', rarity: 'common', type: 'relic', desc: '전투 승리 시 체력 8 회복', mods: { winHeal: 8 } },
    { id: 'it_bone', icon: '🦴', name: '뼈 부적', rarity: 'common', type: 'relic', desc: '최대 체력 +12, 체력 12 회복', mods: { maxHp: 12, heal: 12 } },
    { id: 'it_feather', icon: '🪶', name: '까마귀 깃털', rarity: 'common', type: 'relic', desc: '모든 주사위 최소값 +1', mods: { diceMin: 1 } },
    { id: 'it_potion', icon: '🧪', name: '치유 물약', rarity: 'common', type: 'heal', desc: '즉시 체력 40 회복', mods: { heal: 40 } },
    { id: 'it_whetstone', icon: '⚙️', name: '숫돌', rarity: 'common', type: 'upgrade', desc: '카드 1장의 모든 주사위 +1', upg: { ub: 1 } },
    { id: 'it_purse', icon: '👝', name: '낡은 돈주머니', rarity: 'common', type: 'relic', desc: '전투 승리 시 은화 +6', mods: { goldBonus: 6 } },
    { id: 'it_newcard_c', icon: '📜', name: '낡은 두루마리', rarity: 'common', type: 'card', desc: '직업 스킬 카드를 얻고 덱의 카드 1장과 교체' },

    { id: 'it_sword', icon: '🗡️', name: '녹슨 대검', rarity: 'rare', type: 'relic', desc: '모든 주사위 위력 +1', mods: { basePower: 1 } },
    { id: 'it_amulet', icon: '🧿', name: '은빛 부적', rarity: 'rare', type: 'relic', desc: '받는 피해 -1 (적중마다)', mods: { dmgReduce: 1 } },
    { id: 'it_hourglass', icon: '⏳', name: '모래시계', rarity: 'rare', type: 'relic', desc: '턴당 코스트 +1', mods: { energy: 1 } },
    { id: 'it_fang', icon: '🦷', name: '흡혈귀 송곳니', rarity: 'rare', type: 'relic', desc: '가한 피해의 10% 흡혈', mods: { lifesteal: 0.1 } },
    { id: 'it_mark', icon: '🩸', name: '사냥꾼의 표식', rarity: 'rare', type: 'relic', desc: '카드 첫 적중 시 출혈 2 부여', mods: { firstHitBleed: 2 } },
    { id: 'it_ember', icon: '🔥', name: '꺼지지 않는 불씨', rarity: 'rare', type: 'relic', desc: '카드 첫 적중 시 화상 2 부여', mods: { firstHitBurn: 2 } },
    { id: 'it_loaded', icon: '🎲', name: '무게 추 주사위', rarity: 'rare', type: 'relic', desc: '모든 주사위 최대값 +2', mods: { diceMax: 2 } },
    { id: 'it_engrave', icon: '✒️', name: '룬 각인', rarity: 'rare', type: 'upgrade', desc: '카드 1장의 모든 주사위 최대값 +3', upg: { umax: 3 } },
    { id: 'it_elixir', icon: '⚗️', name: '진홍의 영약', rarity: 'rare', type: 'heal', desc: '즉시 체력 70 회복', mods: { heal: 70 } },
    { id: 'it_newcard_r', icon: '📕', name: '금지된 마도서', rarity: 'rare', type: 'card', desc: '희귀 직업 스킬 카드를 얻고 덱의 카드 1장과 교체' },

    { id: 'it_grail', icon: '🏆', name: '성배', rarity: 'legendary', type: 'relic', desc: '최대 체력 +30, 전투 승리 시 체력 12 회복', mods: { maxHp: 30, heal: 30, winHeal: 12 } },
    { id: 'it_arm', icon: '🦾', name: '망자의 세 번째 팔', rarity: 'legendary', type: 'relic', desc: '스킬 슬롯 +1', mods: { slots: 1 }, cond: p => p.slots < 4 },
    { id: 'it_fatedie', icon: '🌕', name: '운명의 주사위', rarity: 'legendary', type: 'relic', desc: '모든 주사위 최소값 +2', mods: { diceMin: 2 } },
    { id: 'it_crown', icon: '👑', name: '가시 왕관', rarity: 'legendary', type: 'relic', desc: '모든 주사위 위력 +2, 최대 체력 -15', mods: { basePower: 2, maxHp: -15 } },
    { id: 'it_forge', icon: '⚱️', name: '주사위 주조틀', rarity: 'legendary', type: 'upgrade', desc: '카드 1장의 첫 주사위를 하나 더 추가', upg: { extraDie: 1 } },
    { id: 'it_newcard_l', icon: '📖', name: '운명의 서', rarity: 'legendary', type: 'card', desc: '전설 직업 스킬 카드를 얻고 덱의 카드 1장과 교체' },
  ];

  // 전투 보상 희귀도 가중치 (최하급은 전투 보상에 나오지 않는다)
  const RARITY_WEIGHTS = {
    normal: { common: 65, rare: 30, legendary: 5 },
    midboss: { common: 25, rare: 55, legendary: 20 },
    boss: { common: 10, rare: 45, legendary: 45 },
  };

  // 상점: 5층마다(보스 처치 후) 열린다.
  const SHOP = {
    every: 5,
    fixed: ['it_rag', 'it_chip', 'it_charm'],  // 상단 고정 최하급 3개
    randomCount: 5,                            // 하단 무작위 5개 (일반~전설)
    price: { basic: 15, common: 40, rare: 80, legendary: 150 },
    // 층이 높을수록 높은 등급이 나올 확률 증가
    weights(floor) {
      const legendary = Math.min(35, 4 + floor * 1.2);
      const rare = Math.min(45, 22 + floor * 1.1);
      return { common: Math.max(20, 100 - legendary - rare), rare, legendary };
    },
  };

  // 전투 승리 시 은화
  const GOLD = { normal: [12, 18], midboss: [30, 40], boss: [55, 70] };

  // ───────── 지역 / 몬스터 ─────────
  // 몬스터 덱은 반드시 9장. 중간 보스/보스는 지역 카드 6장 + 전용 카드 3장 + 고유 스킬 1개.
  // 고유 스킬은 3턴마다 추가 슬롯으로 사용한다.
  function sig(name, dice, fx) {
    return { id: 'sig', name, cost: 0, dice: dice.map(([t, min, max]) => ({ t, min, max })), fx: fx || {}, rarity: 'signature' };
  }

  const REGIONS = [];
  function region(r) {
    defCards(r.cards, { owner: r.id });
    defCards(r.exclusive, { owner: r.id, rarity: 'exclusive' });
    REGIONS.push(r);
  }

  region({
    id: 'ashen', name: '잿빛 묘지', color: '#9aa0a6', icon: '🪦',
    desc: '끝나지 않는 장례가 이어지는 묘지. 굶주린 망자들이 산 자의 온기를 찾아 기어 나온다.',
    cards: [
      ['a_claw', '뼈 할퀴기', 0, [['S', 1, 6]]],
      ['a_rusty', '녹슨 칼질', 1, [['S', 1, 5], ['S', 1, 5]]],
      ['a_dirt', '무덤 흙 뿌리기', 1, [['E', 3, 5], ['B', 2, 5]], { weak: 1 }],
      ['a_bite', '굶주린 물어뜯기', 2, [['P', 2, 7], ['P', 2, 7]], { bleed: 2 }],
      ['a_wail', '망령의 비명', 2, [['B', 1, 5], ['B', 1, 5], ['B', 1, 5]], { weak: 1 }],
      ['a_charge', '해골 돌진', 3, [['B', 3, 8], ['B', 3, 8], ['B', 3, 8]]],
      ['a_scythe', '망자의 낫', 4, [['S', 4, 10], ['S', 4, 10], ['S', 4, 10]]],
    ],
    exclusive: [
      ['a_shovel', '삽 내려찍기', 3, [['B', 4, 10], ['B', 4, 10]]],
      ['a_bury', '생매장', 4, [['B', 3, 9], ['B', 3, 9], ['B', 3, 9]], { weak: 2 }],
      ['a_lantern', '묘지기의 등불', 5, [['G', 5, 9], ['B', 4, 8], ['B', 4, 8]], { start: { heal: 6 } }],
      ['a_spear', '뼈 창 투척', 3, [['P', 3, 8], ['P', 3, 8], ['P', 3, 8]], { bleed: 2 }],
      ['a_necro', '사령의 손길', 4, [['G', 4, 8], ['S', 4, 9], ['S', 4, 9]], { start: { heal: 8 } }],
      ['a_storm', '해골 폭풍', 5, [['P', 3, 8], ['P', 3, 8], ['P', 3, 8], ['P', 3, 8]], { bleed: 1 }],
    ],
    monsters: [
      { id: 'ghoul', name: '구울', icon: '🧟', hp: 80, slots: 1, res: [1.5, 1, 1], desc: '썩은 살점을 탐하는 굶주린 시체.',
        deck: ['a_claw', 'a_claw', 'a_bite', 'a_bite', 'a_bite', 'a_rusty', 'a_rusty', 'a_charge', 'a_scythe'] },
      { id: 'skeleton', name: '해골 병사', icon: '💀', hp: 88, slots: 1, res: [0.5, 0.5, 2], desc: '죽어서도 전장을 떠나지 못한 병사.',
        deck: ['a_rusty', 'a_rusty', 'a_charge', 'a_charge', 'a_charge', 'a_claw', 'a_claw', 'a_dirt', 'a_scythe'] },
      { id: 'wraith', name: '울부짖는 망령', icon: '👻', hp: 72, slots: 1, res: [1, 1, 0.5], desc: '끝없이 비명을 지르는 원혼.',
        deck: ['a_wail', 'a_wail', 'a_wail', 'a_dirt', 'a_dirt', 'a_claw', 'a_claw', 'a_bite', 'a_scythe'] },
    ],
    midboss: { id: 'gravekeeper', name: '무덤지기', icon: '⚰️', hp: 155, slots: 2, res: [1, 1.5, 0.5], desc: '묘지의 문을 지키는 거구. 산 자도 묻어버린다.',
      deck: ['a_rusty', 'a_dirt', 'a_bite', 'a_charge', 'a_charge', 'a_scythe', 'a_shovel', 'a_bury', 'a_lantern'],
      signature: sig('산 채로 묻기', [['B', 7, 13], ['B', 7, 13], ['B', 7, 13], ['B', 7, 13]], { weak: 3 }) },
    boss: { id: 'bonelord', name: '뼈의 군주', icon: '☠️', hp: 225, slots: 2, res: [1, 1, 1.5], desc: '수천 구의 해골을 거느린 묘지의 왕.',
      deck: ['a_charge', 'a_charge', 'a_bite', 'a_wail', 'a_scythe', 'a_scythe', 'a_spear', 'a_necro', 'a_storm'],
      signature: sig('죽음의 행진', [['S', 8, 15], ['S', 8, 15], ['S', 8, 15], ['S', 8, 15]], { bleed: 2 }) },
  });

  region({
    id: 'forest', name: '썩은 숲', color: '#7fa66b', icon: '🌲',
    desc: '포자와 독이 뒤덮은 숲. 나무조차 사냥감을 기다린다.',
    cards: [
      ['f_thorn', '독 가시', 0, [['P', 1, 4], ['P', 1, 4]], { bleed: 1 }],
      ['f_claw', '발톱 휘두르기', 1, [['S', 2, 8]]],
      ['f_spore', '포자 살포', 1, [['G', 3, 6], ['B', 2, 5]], { bleed: 1 }],
      ['f_howl', '사냥의 울음', 2, [['S', 1, 5], ['S', 1, 5], ['S', 1, 5]], { start: { might: 1 } }],
      ['f_vine', '덩굴 조이기', 2, [['P', 2, 7], ['P', 2, 7]], { bleed: 2 }],
      ['f_rush', '광포한 돌진', 3, [['B', 3, 8], ['B', 3, 8], ['B', 3, 8]]],
      ['f_maul', '짓이기기', 4, [['B', 4, 10], ['B', 4, 10], ['B', 4, 10]]],
    ],
    exclusive: [
      ['f_web', '거미줄 포박', 3, [['E', 4, 7], ['P', 3, 6], ['P', 3, 6]], { weak: 2 }],
      ['f_fang', '독니', 4, [['P', 3, 9], ['P', 3, 9], ['P', 3, 9]], { bleed: 3 }],
      ['f_brood', '산란', 5, [['S', 4, 10], ['S', 4, 10], ['S', 4, 10], ['S', 4, 10]], { start: { heal: 6 } }],
      ['f_root', '뿌리 속박', 3, [['B', 3, 8], ['B', 3, 8], ['B', 3, 8]], { bleed: 2 }],
      ['f_rot', '부패의 축복', 4, [['G', 5, 9], ['B', 4, 9], ['B', 4, 9]], { start: { heal: 10 } }],
      ['f_thornstorm', '가시 폭풍', 5, [['P', 3, 8], ['P', 3, 8], ['P', 3, 8], ['P', 3, 8]], { bleed: 1 }],
    ],
    monsters: [
      { id: 'werewolf', name: '광기의 늑대인간', icon: '🐺', hp: 84, slots: 1, res: [1, 1.5, 1], desc: '달빛에 이성을 잃은 사냥꾼.',
        deck: ['f_claw', 'f_claw', 'f_howl', 'f_howl', 'f_rush', 'f_rush', 'f_maul', 'f_maul', 'f_thorn'] },
      { id: 'shroom', name: '썩은 버섯괴물', icon: '🍄', hp: 80, slots: 1, res: [1.5, 0.5, 1], desc: '숨 쉴 때마다 독 포자를 내뿜는다.',
        deck: ['f_spore', 'f_spore', 'f_spore', 'f_thorn', 'f_thorn', 'f_vine', 'f_vine', 'f_rush', 'f_maul'] },
      { id: 'spiders', name: '독거미 무리', icon: '🕷️', hp: 64, slots: 2, res: [1.5, 1, 1.5], desc: '작지만 끝없이 몰려드는 거미 떼.',
        deck: ['f_thorn', 'f_thorn', 'f_thorn', 'f_vine', 'f_vine', 'f_vine', 'f_spore', 'f_claw', 'f_claw'] },
    ],
    midboss: { id: 'spiderqueen', name: '거미 여왕', icon: '🕸️', hp: 155, slots: 2, res: [1, 0.5, 1.5], desc: '숲의 모든 거미를 낳은 어미.',
      deck: ['f_thorn', 'f_vine', 'f_vine', 'f_spore', 'f_rush', 'f_maul', 'f_web', 'f_fang', 'f_brood'],
      signature: sig('여왕의 만찬', [['P', 7, 13], ['P', 7, 13], ['P', 7, 13], ['P', 7, 13]], { bleed: 3, lifesteal: 0.3 }) },
    boss: { id: 'witch', name: '고목의 마녀', icon: '🧙', hp: 230, slots: 2, res: [2, 0.5, 1], desc: '천 년 묵은 나무와 하나가 된 마녀.',
      deck: ['f_rush', 'f_rush', 'f_howl', 'f_vine', 'f_maul', 'f_maul', 'f_root', 'f_rot', 'f_thornstorm'],
      signature: sig('숲의 심판', [['B', 8, 15], ['B', 8, 15], ['B', 8, 15], ['B', 8, 15]], { bleed: 2 }) },
  });

  region({
    id: 'cathedral', name: '피의 성당', color: '#c0444a', icon: '⛪',
    desc: '신 대신 피를 섬기게 된 성당. 기도 소리는 비명으로 바뀌었다.',
    cards: [
      ['c_whip', '채찍질', 0, [['S', 1, 4], ['S', 1, 4]], { bleed: 2 }],
      ['c_zeal', '광신의 일격', 1, [['B', 2, 8]]],
      ['c_pray', '피의 기도', 1, [['G', 3, 6], ['B', 2, 5]], { start: { heal: 3 } }],
      ['c_wing', '돌 날개', 2, [['G', 5, 8], ['S', 4, 7]]],
      ['c_kiss', '흡혈 입맞춤', 2, [['P', 2, 7], ['P', 2, 7]], { lifesteal: 0.3 }],
      ['c_lance', '성혈 창', 3, [['P', 2, 7], ['P', 2, 7], ['P', 2, 7]], { bleed: 2 }],
      ['c_censer', '향로 강타', 4, [['B', 4, 10], ['B', 4, 10], ['B', 4, 10]], { burn: 2 }],
    ],
    exclusive: [
      ['c_torture', '고문 도구', 3, [['P', 2, 7], ['P', 2, 7], ['P', 2, 7]], { bleed: 3 }],
      ['c_heresy', '이단 심판', 4, [['S', 4, 10], ['S', 4, 10], ['S', 4, 10]]],
      ['c_confess', '자백 강요', 5, [['G', 4, 8], ['B', 4, 9], ['B', 4, 9], ['B', 4, 9]], { weak: 2 }],
      ['c_feast', '피의 성찬', 3, [['P', 3, 8], ['P', 3, 8], ['P', 3, 8]], { lifesteal: 0.5 }],
      ['c_sermon', '타락한 설교', 4, [['B', 3, 9], ['B', 3, 9], ['B', 3, 9]], { weak: 3 }],
      ['c_holylance', '핏빛 성창', 5, [['P', 5, 11], ['P', 5, 11], ['P', 5, 11], ['P', 5, 11]], { burn: 3 }],
    ],
    monsters: [
      { id: 'zealot', name: '광신도', icon: '🛐', hp: 80, slots: 1, res: [1, 1.5, 1], desc: '피의 교리에 영혼을 바친 신도.',
        deck: ['c_zeal', 'c_zeal', 'c_zeal', 'c_whip', 'c_whip', 'c_pray', 'c_lance', 'c_lance', 'c_censer'] },
      { id: 'gargoyle', name: '가고일', icon: '🗿', hp: 96, slots: 1, res: [0.5, 0.5, 1.5], desc: '성당 지붕에서 내려온 돌 괴물.',
        deck: ['c_wing', 'c_wing', 'c_wing', 'c_zeal', 'c_zeal', 'c_whip', 'c_lance', 'c_censer', 'c_censer'] },
      { id: 'vampriest', name: '흡혈 사제', icon: '🧛', hp: 76, slots: 1, res: [1, 2, 0.5], desc: '성수 대신 피를 축복하는 사제.',
        deck: ['c_kiss', 'c_kiss', 'c_kiss', 'c_pray', 'c_pray', 'c_whip', 'c_whip', 'c_lance', 'c_censer'] },
    ],
    midboss: { id: 'inquisitor', name: '심문관', icon: '⛓️', hp: 160, slots: 2, res: [1.5, 1, 0.5], desc: '이단을 찾아내 고문하는 성당의 사냥개.',
      deck: ['c_zeal', 'c_whip', 'c_wing', 'c_lance', 'c_lance', 'c_censer', 'c_torture', 'c_heresy', 'c_confess'],
      signature: sig('화형식', [['B', 7, 13], ['B', 7, 13], ['B', 7, 13], ['B', 7, 13]], { burn: 5 }) },
    boss: { id: 'archbishop', name: '타락한 대주교', icon: '🩸', hp: 240, slots: 2, res: [1, 1.5, 0.5], desc: '피의 신을 불러낸 성당의 주인.',
      deck: ['c_lance', 'c_lance', 'c_kiss', 'c_wing', 'c_censer', 'c_censer', 'c_feast', 'c_sermon', 'c_holylance'],
      signature: sig('붉은 승천', [['P', 8, 15], ['P', 8, 15], ['P', 8, 15], ['P', 8, 15]], { bleed: 2, start: { heal: 15 } }) },
  });

  region({
    id: 'abyss', name: '심연의 동굴', color: '#8a6cc9', icon: '🕳️',
    desc: '빛이 닿지 않는 지하. 이곳에서 오래 머문 자는 스스로를 잊는다.',
    cards: [
      ['v_tentacle', '촉수 휘감기', 0, [['B', 1, 4], ['B', 1, 4]]],
      ['v_blind', '눈먼 돌진', 1, [['B', 2, 8]]],
      ['v_shadow', '그림자 베기', 1, [['E', 3, 6], ['S', 2, 5], ['S', 2, 5]]],
      ['v_whisper', '심연의 속삭임', 2, [['B', 1, 5], ['B', 1, 5], ['B', 1, 5]], { weak: 1 }],
      ['v_grasp', '그림자 손아귀', 2, [['S', 3, 8], ['S', 3, 8]]],
      ['v_flurry', '촉수 연타', 3, [['B', 1, 5], ['B', 1, 5], ['B', 1, 5], ['B', 1, 5]]],
      ['v_devour', '탐식', 4, [['P', 4, 10], ['P', 4, 10], ['P', 4, 10]], { lifesteal: 0.2 }],
    ],
    exclusive: [
      ['v_eyes', '천 개의 눈', 3, [['P', 2, 7], ['P', 2, 7], ['P', 2, 7]], { weak: 2 }],
      ['v_madgaze', '광기의 시선', 4, [['P', 4, 10], ['P', 4, 10], ['P', 4, 10]]],
      ['v_wave', '심연 파동', 5, [['B', 2, 6], ['B', 2, 6], ['B', 2, 6], ['B', 2, 6]]],
      ['v_rift', '차원 찢기', 3, [['S', 3, 8], ['S', 3, 8], ['S', 3, 8]], { bleed: 2 }],
      ['v_dread', '무형의 공포', 4, [['E', 4, 7], ['S', 4, 8], ['S', 4, 8]], { weak: 2 }],
      ['v_maw', '공허의 입', 5, [['P', 5, 11], ['P', 5, 11], ['P', 5, 11], ['P', 5, 11]], { lifesteal: 0.3 }],
    ],
    monsters: [
      { id: 'stalker', name: '눈먼 추적자', icon: '🦇', hp: 88, slots: 1, res: [1, 1, 1.5], desc: '소리만으로 먹잇감을 찾아낸다.',
        deck: ['v_blind', 'v_blind', 'v_blind', 'v_grasp', 'v_grasp', 'v_devour', 'v_devour', 'v_tentacle', 'v_tentacle'] },
      { id: 'tentacles', name: '동굴 촉수', icon: '🦑', hp: 68, slots: 2, res: [2, 1, 0.5], desc: '벽 틈에서 뻗어 나오는 무언가의 일부.',
        deck: ['v_tentacle', 'v_tentacle', 'v_tentacle', 'v_flurry', 'v_flurry', 'v_shadow', 'v_shadow', 'v_shadow', 'v_whisper'] },
      { id: 'shade', name: '그림자', icon: '🌑', hp: 72, slots: 1, res: [1, 0.5, 1.5], desc: '주인을 잃고 떠도는 그림자.',
        deck: ['v_shadow', 'v_shadow', 'v_shadow', 'v_whisper', 'v_whisper', 'v_whisper', 'v_grasp', 'v_flurry', 'v_devour'] },
    ],
    midboss: { id: 'watcher', name: '심연의 감시자', icon: '👁️', hp: 160, slots: 2, res: [1, 2, 0.5], desc: '심연을 들여다보는 자를 되바라보는 눈.',
      deck: ['v_blind', 'v_shadow', 'v_whisper', 'v_grasp', 'v_flurry', 'v_devour', 'v_eyes', 'v_madgaze', 'v_wave'],
      signature: sig('응시하는 심연', [['P', 7, 13], ['P', 7, 13], ['P', 7, 13], ['P', 7, 13]], { weak: 3 }) },
    boss: { id: 'nameless', name: '이름 없는 것', icon: '🐙', hp: 250, slots: 2, res: [1, 1, 1], desc: '형태도, 이름도 없는 심연의 주인.',
      deck: ['v_devour', 'v_devour', 'v_flurry', 'v_flurry', 'v_grasp', 'v_whisper', 'v_rift', 'v_dread', 'v_maw'],
      signature: sig('형언할 수 없는 것', [['B', 8, 14], ['B', 8, 14], ['B', 8, 14], ['B', 8, 14]], { bleed: 2 }) },
  });

  region({
    id: 'frost', name: '서리 왕좌', color: '#7cc4e0', icon: '❄️',
    desc: '영원한 겨울에 갇힌 옛 왕국. 얼어붙은 기사들은 아직도 왕을 지킨다.',
    cards: [
      ['r_iceclaw', '얼음 손톱', 0, [['S', 1, 6]]],
      ['r_frostcut', '서리 검격', 1, [['S', 1, 5], ['S', 1, 5]]],
      ['r_breath', '냉기 숨결', 1, [['G', 3, 6], ['B', 2, 5]], { weak: 1 }],
      ['r_pale', '창백한 찌르기', 2, [['P', 3, 8], ['P', 3, 8]]],
      ['r_blizzard', '눈보라', 2, [['S', 1, 5], ['S', 1, 5], ['S', 1, 5]]],
      ['r_icelance', '빙창', 3, [['P', 3, 8], ['P', 3, 8], ['P', 3, 8]]],
      ['r_greatsword', '서리 대검', 4, [['S', 4, 10], ['S', 4, 10], ['S', 4, 10]]],
    ],
    exclusive: [
      ['r_freeze', '빙결 참격', 3, [['S', 3, 8], ['S', 3, 8], ['S', 3, 8]], { fragile: 2 }],
      ['r_wintershield', '겨울 방패', 4, [['G', 6, 10], ['G', 5, 9], ['B', 5, 9]], { start: { heal: 6 } }],
      ['r_icestorm', '얼음 폭풍', 5, [['P', 2, 6], ['P', 2, 6], ['P', 2, 6], ['P', 2, 6]]],
      ['r_crown', '서리 왕관', 3, [['G', 4, 8], ['B', 3, 7], ['B', 3, 7]], { start: { heal: 12 } }],
      ['r_glacier', '빙관의 일격', 4, [['B', 5, 11], ['B', 5, 11], ['B', 5, 11]]],
      ['r_eternal', '영원한 겨울', 5, [['S', 4, 10], ['S', 4, 10], ['S', 4, 10], ['S', 4, 10]], { weak: 2 }],
    ],
    monsters: [
      { id: 'frozen', name: '얼어붙은 망자', icon: '🥶', hp: 84, slots: 1, res: [1, 0.5, 2], desc: '얼음 속에서 깨어난 옛 백성.',
        deck: ['r_iceclaw', 'r_iceclaw', 'r_frostcut', 'r_frostcut', 'r_breath', 'r_breath', 'r_pale', 'r_icelance', 'r_greatsword'] },
      { id: 'frostwolf', name: '서리 늑대', icon: '🐾', hp: 68, slots: 2, res: [1.5, 1, 1], desc: '눈보라와 함께 무리 지어 사냥한다.',
        deck: ['r_iceclaw', 'r_iceclaw', 'r_iceclaw', 'r_blizzard', 'r_blizzard', 'r_blizzard', 'r_frostcut', 'r_frostcut', 'r_breath'] },
      { id: 'paleknight', name: '창백한 기사', icon: '🛡️', hp: 96, slots: 1, res: [0.5, 1, 1.5], desc: '죽은 왕에게 여전히 충성하는 기사.',
        deck: ['r_pale', 'r_pale', 'r_pale', 'r_icelance', 'r_icelance', 'r_greatsword', 'r_greatsword', 'r_frostcut', 'r_breath'] },
    ],
    midboss: { id: 'frostcommander', name: '서리 기사단장', icon: '⚔️', hp: 170, slots: 2, res: [0.5, 1.5, 1], desc: '왕좌로 가는 길을 막는 얼음의 검.',
      deck: ['r_pale', 'r_frostcut', 'r_blizzard', 'r_icelance', 'r_icelance', 'r_greatsword', 'r_freeze', 'r_wintershield', 'r_icestorm'],
      signature: sig('절대 영도', [['S', 7, 13], ['S', 7, 13], ['S', 7, 13], ['S', 7, 13]], { fragile: 3 }) },
    boss: { id: 'winterking', name: '겨울의 왕', icon: '🧊', hp: 255, slots: 2, res: [1, 1, 1.5], desc: '왕국을 영원한 겨울로 봉인한 망자의 왕.',
      deck: ['r_icelance', 'r_icelance', 'r_pale', 'r_blizzard', 'r_greatsword', 'r_greatsword', 'r_crown', 'r_glacier', 'r_eternal'],
      signature: sig('만년설의 심판', [['B', 9, 16], ['B', 9, 16], ['B', 9, 16], ['B', 9, 16]], { fragile: 2 }) },
  });

  const REGION_MAP = {};
  REGIONS.forEach(r => { REGION_MAP[r.id] = r; });

  const STATUS_INFO = {
    bleed: { name: '출혈', icon: '🩸', desc: '공격 주사위를 굴릴 때마다 수치만큼 피해를 받고, 수치가 1/3 줄어든다.' },
    burn: { name: '화상', icon: '🔥', desc: '턴 종료 시 수치만큼 피해를 받고, 수치가 절반이 된다.' },
    might: { name: '힘', icon: '🔺', desc: '이번 턴 공격 주사위 위력 +수치.' },
    weak: { name: '허약', icon: '🔻', desc: '이번 턴 공격 주사위 위력 -수치.' },
    endure: { name: '인내', icon: '⛨', desc: '이번 턴 방어·회피 주사위 위력 +수치.' },
    protect: { name: '보호', icon: '🛡', desc: '이번 턴 받는 피해 -수치 (적중마다).' },
    fragile: { name: '취약', icon: '🔓', desc: '이번 턴 받는 피해 +수치 (적중마다).' },
  };

  // 밸런스 조정값
  const BALANCE = {
    enemyHpMul: { normal: 1, midboss: 1, boss: 1 },
    enemyPower: { normal: -1, midboss: -3, boss: -3 }, // 적 주사위 위력 보정
    hpPerFloor: 0.18,       // 층마다 적 체력 +18%
    powerEveryFloors: 2.5,  // n층마다 적 주사위 위력 +1
    extraSlotFloor: 11,     // 이 층부터 일반 몬스터 스킬 슬롯 +1
    bossHealPct: 0.3,       // 보스 처치 후 최대 체력 대비 회복량
  };

  const RARITY_NAME = { basic: '최하급', common: '일반', rare: '희귀', legendary: '전설', exclusive: '전용', signature: '고유' };

  const DATA = {
    CARDS, CLASSES, CLASS_MAP, DICE, ATK_TYPES, TYPE_OF, TYPES, RES_NAME, LIGHT_POINTS, PASSIVES, ITEMS,
    RARITY_WEIGHTS, SHOP, GOLD, REGIONS, REGION_MAP, STATUS_INFO, RARITY_NAME, BALANCE,
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = DATA;
  else root.FFD_DATA = DATA;
})(typeof window !== 'undefined' ? window : globalThis);
