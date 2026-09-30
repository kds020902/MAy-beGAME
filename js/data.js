/*
 * Fate Five Dungeon — 게임 데이터
 * 카드, 빛(패시브), 아이템, 지역/몬스터 정의.
 * 전투는 림버스 컴퍼니의 합(Clash) 방식을 따른다.
 *
 * 카드 튜플: [id, 이름, 유형, 코스트, 기본 위력, 코인 수, 코인 위력, 효과, 희귀도]
 *   유형  : S 참격 / P 관통 / B 타격 — 적의 내성에 따라 피해 배율이 달라진다.
 *   코스트: 0~5, 강할수록 높다.
 *   합 위력 = 기본 위력 + (앞면이 나온 코인 수 × 코인 위력)
 *
 * 효과(fx)
 *   bleed n     적중마다 출혈 n (공격 코인을 쓸 때마다 위력만큼 피해, 횟수 -1)
 *   burn n      적중마다 화상 n (턴 종료 시 위력만큼 피해, 횟수 -1)
 *   rupture n   적중마다 파열 n (피격 시 위력만큼 추가 피해, 횟수 -1)
 *   poise n     사용 시 자신에게 호흡 n (적중 시 위력×5% 확률 치명타 = 피해 +20%)
 *   paralyze n  첫 적중 시 마비 n (다음 턴 코인 n개의 위력이 0)
 *   weak n      첫 적중 시 다음 턴 위력 감소 n
 *   fragile n   첫 적중 시 다음 턴 취약 n (받는 피해 +10% × n)
 *   might n     합 승리 시 다음 턴 위력 증가 n
 *   heal n      첫 적중 시 체력 n 회복
 *   lifesteal r 가한 피해의 r 비율만큼 회복
 *   selfDmg n   사용 시 체력 n 소모
 *   execute n   대상 체력 50% 이하일 때 기본 위력 +n
 *   headBonus r 이 스킬의 코인 앞면 확률 +r
 */
(function (root) {
  'use strict';

  // 공격 유형 (림버스 컴퍼니의 참격 / 관통 / 타격)
  const TYPE_CODE = { S: 'slash', P: 'pierce', B: 'blunt' };
  const TYPES = {
    slash: { name: '참격', icon: '⚔' },
    pierce: { name: '관통', icon: '➶' },
    blunt: { name: '타격', icon: '⚒' },
  };
  const TYPE_ORDER = ['slash', 'pierce', 'blunt'];
  // 내성 배율 이름
  const RES_NAME = { 2: '치명', 1.5: '약점', 1: '보통', 0.5: '인내', 0.25: '내성' };

  const CARDS = {};
  function defCards(list, extra) {
    list.forEach(([id, name, type, cost, base, coins, cp, fx, rarity]) => {
      CARDS[id] = Object.assign({ id, name, type: TYPE_CODE[type], cost, base, coins, cp, fx: fx || {}, rarity: rarity || 'common' }, extra || {});
    });
  }

  // ───────── 플레이어 카드 ─────────
  defCards([
    // 시작 덱
    ['p_slash', '가벼운 베기', 'S', 0, 3, 1, 3],
    ['p_thrust', '찌르기', 'P', 1, 3, 2, 2],
    ['p_bash', '방패 밀치기', 'B', 1, 4, 1, 4],
    ['p_double', '연속 베기', 'S', 2, 3, 3, 2],
    ['p_cleave', '내려찍기', 'B', 2, 5, 2, 3],
    ['p_bloodcut', '핏빛 일격', 'S', 3, 4, 2, 4, { bleed: 2 }],
    ['p_holy', '성광 베기', 'S', 3, 5, 3, 3, { burn: 1 }],
    ['p_judge', '심판', 'B', 4, 6, 3, 4],
    ['p_fate', '운명의 칼날', 'P', 5, 7, 4, 4],
    // 보상 카드
    ['p_counter', '반격의 자세', 'B', 1, 3, 3, 2, { might: 1 }, 'common'],
    ['p_vamp', '흡혈의 칼날', 'S', 2, 4, 2, 3, { lifesteal: 0.3 }, 'common'],
    ['p_chain', '가시 사슬', 'P', 2, 3, 3, 2, { rupture: 2 }, 'common'],
    ['p_expose', '약점 간파', 'P', 1, 3, 2, 2, { fragile: 2 }, 'common'],
    ['p_pact', '피의 계약', 'S', 0, 6, 2, 3, { selfDmg: 6 }, 'common'],
    ['p_reverse', '운명의 역전', 'P', 2, 1, 4, 3, { headBonus: 0.15, poise: 3 }, 'rare'],
    ['p_execute', '처형', 'S', 4, 5, 2, 5, { execute: 5 }, 'rare'],
    ['p_frenzy', '광기의 난도질', 'S', 3, 2, 5, 2, { bleed: 1 }, 'rare'],
    ['p_shield', '성스러운 방패', 'B', 2, 7, 1, 3, { heal: 6 }, 'rare'],
    ['p_star', '별빛 섬광', 'P', 3, 8, 1, 6, { poise: 4 }, 'rare'],
    ['p_dark', '암흑 일섬', 'S', 4, 4, 4, 4, { paralyze: 1 }, 'rare'],
    ['p_reap', '영혼 수확', 'S', 5, 8, 3, 5, { heal: 12 }, 'legendary'],
    ['p_dawn', '여명의 검', 'B', 5, 6, 5, 3, { might: 2 }, 'legendary'],
    ['p_sun', '태양의 낙인', 'B', 4, 6, 3, 4, { burn: 3 }, 'legendary'],
  ], { owner: 'player' });

  const STARTER_DECK = ['p_slash', 'p_thrust', 'p_bash', 'p_double', 'p_cleave', 'p_bloodcut', 'p_holy', 'p_judge', 'p_fate'];
  const CARD_POOL = Object.values(CARDS).filter(c => c.owner === 'player' && !STARTER_DECK.includes(c.id)).map(c => c.id);

  // ───────── 빛 (시작 패시브) ─────────
  const LIGHT_POINTS = 15;
  const PASSIVES = [
    { id: 'l_body', name: '단련된 육체', cost: 1, desc: '최대 체력 +20', mods: { maxHp: 20 } },
    { id: 'l_luck', name: '행운', cost: 1, desc: '코인 앞면 확률 +5%', mods: { headChance: 0.05 } },
    { id: 'l_prayer', name: '회복의 기도', cost: 1, desc: '전투 승리 시 체력 10 회복', mods: { winHeal: 10 } },
    { id: 'l_insight', name: '선견', cost: 1, desc: '손패 +1', mods: { handSize: 1 } },
    { id: 'l_iron', name: '강철 피부', cost: 2, desc: '받는 피해 -1 (적중마다)', mods: { dmgReduce: 1 } },
    { id: 'l_thirst', name: '피의 갈망', cost: 2, desc: '가한 피해의 10% 흡혈', mods: { lifesteal: 0.1 } },
    { id: 'l_focus', name: '집중', cost: 2, desc: '턴당 코스트 +1', mods: { energy: 1 } },
    { id: 'l_seal', name: '출혈의 인장', cost: 2, desc: '스킬 첫 적중 시 출혈 2 부여', mods: { firstHitBleed: 2 } },
    { id: 'l_breath', name: '호흡법', cost: 2, desc: '전투 시작 시 호흡 5 (횟수 5)', mods: { startPoise: 5 } },
    { id: 'l_faith', name: '신념', cost: 3, desc: '모든 스킬 기본 위력 +1', mods: { basePower: 1 } },
    { id: 'l_edge', name: '날 선 의지', cost: 3, desc: '모든 스킬 코인 위력 +1', mods: { coinPower: 1 } },
    { id: 'l_undying', name: '불굴', cost: 3, desc: '전투마다 1회, 쓰러질 피해를 받으면 체력 1로 버팀', mods: { undying: 1 } },
    { id: 'l_coin', name: '축복받은 동전', cost: 3, desc: '코인 앞면 확률 +10%', mods: { headChance: 0.1 } },
    { id: 'l_third', name: '세 번째 손', cost: 4, desc: '스킬 슬롯 +1', mods: { slots: 1 } },
    { id: 'l_radiance', name: '광휘의 가호', cost: 4, desc: '매 턴 첫 번째로 쓰는 스킬 기본 위력 +3', mods: { firstSkillBonus: 3 } },
    { id: 'l_reverse', name: '운명 역행', cost: 4, desc: '합에서 져서 코인이 파괴될 때 30% 확률로 막아냄', mods: { fateReverse: 0.3 } },
    { id: 'l_saint', name: '성인의 생명력', cost: 4, desc: '최대 체력 +40, 매 턴 종료 시 체력 3 회복', mods: { maxHp: 40, regen: 3 } },
  ];

  // ───────── 아이템 (전투 보상) ─────────
  // type: relic(영구 효과) | heal(즉시 회복) | card(새 스킬 카드로 교체) | upgrade(카드 강화)
  const ITEMS = [
    { id: 'it_bandage', icon: '🩹', name: '낡은 붕대', rarity: 'common', type: 'relic', desc: '전투 승리 시 체력 8 회복', mods: { winHeal: 8 } },
    { id: 'it_bone', icon: '🦴', name: '뼈 부적', rarity: 'common', type: 'relic', desc: '최대 체력 +12, 체력 12 회복', mods: { maxHp: 12, heal: 12 } },
    { id: 'it_feather', icon: '🪶', name: '까마귀 깃털', rarity: 'common', type: 'relic', desc: '코인 앞면 확률 +4%', mods: { headChance: 0.04 } },
    { id: 'it_potion', icon: '🧪', name: '치유 물약', rarity: 'common', type: 'heal', desc: '즉시 체력 40 회복', mods: { heal: 40 } },
    { id: 'it_whetstone', icon: '🪨', name: '숫돌', rarity: 'common', type: 'upgrade', desc: '카드 1장의 기본 위력 +2', upg: { ub: 2 } },
    { id: 'it_newcard_c', icon: '📜', name: '낡은 두루마리', rarity: 'common', type: 'card', desc: '새 스킬 카드를 얻고 덱의 카드 1장과 교체' },

    { id: 'it_sword', icon: '🗡️', name: '녹슨 대검', rarity: 'rare', type: 'relic', desc: '모든 스킬 기본 위력 +1', mods: { basePower: 1 } },
    { id: 'it_bloodcoin', icon: '🪙', name: '피 묻은 동전', rarity: 'rare', type: 'relic', desc: '모든 스킬 코인 위력 +1', mods: { coinPower: 1 } },
    { id: 'it_amulet', icon: '🧿', name: '은빛 부적', rarity: 'rare', type: 'relic', desc: '받는 피해 -1 (적중마다)', mods: { dmgReduce: 1 } },
    { id: 'it_hourglass', icon: '⏳', name: '모래시계', rarity: 'rare', type: 'relic', desc: '턴당 코스트 +1', mods: { energy: 1 } },
    { id: 'it_fang', icon: '🦷', name: '흡혈귀 송곳니', rarity: 'rare', type: 'relic', desc: '가한 피해의 10% 흡혈', mods: { lifesteal: 0.1 } },
    { id: 'it_mark', icon: '🩸', name: '사냥꾼의 표식', rarity: 'rare', type: 'relic', desc: '스킬 첫 적중 시 출혈 2 부여', mods: { firstHitBleed: 2 } },
    { id: 'it_ember', icon: '🔥', name: '꺼지지 않는 불씨', rarity: 'rare', type: 'relic', desc: '스킬 첫 적중 시 화상 2 부여', mods: { firstHitBurn: 2 } },
    { id: 'it_whistle', icon: '🌬️', name: '사냥꾼의 호각', rarity: 'rare', type: 'relic', desc: '전투 시작 시 호흡 4 (횟수 4)', mods: { startPoise: 4 } },
    { id: 'it_engrave', icon: '✒️', name: '룬 각인', rarity: 'rare', type: 'upgrade', desc: '카드 1장의 코인 위력 +1', upg: { uc: 1 } },
    { id: 'it_elixir', icon: '⚗️', name: '진홍의 영약', rarity: 'rare', type: 'heal', desc: '즉시 체력 70 회복', mods: { heal: 70 } },
    { id: 'it_newcard_r', icon: '📕', name: '금지된 마도서', rarity: 'rare', type: 'card', desc: '희귀 스킬 카드를 얻고 덱의 카드 1장과 교체' },

    { id: 'it_grail', icon: '🏆', name: '성배', rarity: 'legendary', type: 'relic', desc: '최대 체력 +30, 전투 승리 시 체력 12 회복', mods: { maxHp: 30, heal: 30, winHeal: 12 } },
    { id: 'it_arm', icon: '🦾', name: '망자의 세 번째 팔', rarity: 'legendary', type: 'relic', desc: '스킬 슬롯 +1', mods: { slots: 1 }, cond: p => p.slots < 4 },
    { id: 'it_fatecoin', icon: '🌕', name: '운명의 동전', rarity: 'legendary', type: 'relic', desc: '코인 앞면 확률 +10%', mods: { headChance: 0.1 } },
    { id: 'it_crown', icon: '👑', name: '가시 왕관', rarity: 'legendary', type: 'relic', desc: '모든 스킬 기본 위력 +2, 최대 체력 -15', mods: { basePower: 2, maxHp: -15 } },
    { id: 'it_mint', icon: '⚱️', name: '동전 주조틀', rarity: 'legendary', type: 'upgrade', desc: '카드 1장의 코인 +1개', upg: { ucoins: 1 } },
    { id: 'it_newcard_l', icon: '📖', name: '운명의 서', rarity: 'legendary', type: 'card', desc: '전설 스킬 카드를 얻고 덱의 카드 1장과 교체' },
  ];

  // 전투 종류별 보상 희귀도 가중치
  const RARITY_WEIGHTS = {
    normal: { common: 65, rare: 30, legendary: 5 },
    midboss: { common: 25, rare: 55, legendary: 20 },
    boss: { common: 10, rare: 45, legendary: 45 },
  };

  // ───────── 지역 / 몬스터 ─────────
  // 몬스터 덱은 반드시 9장. 중간 보스/보스는 지역 카드 6장 + 전용 카드 3장 + 고유 스킬 1개.
  // 고유 스킬은 3턴마다 추가 슬롯으로 사용한다.
  function sig(name, type, base, coins, cp, fx) { return { id: 'sig', name, type: TYPE_CODE[type], cost: 0, base, coins, cp, fx: fx || {}, rarity: 'signature' }; }

  const REGIONS = [];
  function region(r) {
    defCards(r.cards, { owner: r.id });
    defCards(r.exclusive, { owner: r.id, rarity: 'exclusive' });
    REGIONS.push(r);
  }

  // 코스트-위력 기준 (플레이어 시작 덱과 동일한 곡선)
  //   0: 3/1/3   1: 3/2/2, 4/1/4   2: 3/3/2, 5/2/3   3: 5/3/3   4: 6/3/4   5: 7/4/4
  region({
    id: 'ashen', name: '잿빛 묘지', color: '#9aa0a6', icon: '🪦',
    desc: '끝나지 않는 장례가 이어지는 묘지. 굶주린 망자들이 산 자의 온기를 찾아 기어 나온다.',
    cards: [
      ['a_claw', '뼈 할퀴기', 'S', 0, 3, 1, 3],
      ['a_rusty', '녹슨 칼질', 'S', 1, 3, 2, 2],
      ['a_dirt', '무덤 흙 뿌리기', 'B', 1, 3, 2, 2, { weak: 1 }],
      ['a_bite', '굶주린 물어뜯기', 'P', 2, 4, 2, 3, { bleed: 2 }],
      ['a_wail', '망령의 비명', 'B', 2, 3, 3, 2, { paralyze: 1 }],
      ['a_charge', '해골 돌진', 'B', 3, 5, 3, 3],
      ['a_scythe', '망자의 낫', 'S', 4, 6, 3, 4],
    ],
    exclusive: [
      ['a_shovel', '삽 내려찍기', 'B', 3, 6, 2, 4],
      ['a_bury', '생매장', 'B', 4, 5, 3, 4, { paralyze: 2 }],
      ['a_lantern', '묘지기의 등불', 'B', 5, 6, 4, 4, { heal: 6 }],
      ['a_spear', '뼈 창 투척', 'P', 3, 5, 3, 3, { bleed: 2 }],
      ['a_necro', '사령의 손길', 'S', 4, 6, 3, 4, { heal: 8 }],
      ['a_storm', '해골 폭풍', 'P', 5, 5, 5, 3, { bleed: 1 }],
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
      signature: sig('산 채로 묻기', 'B', 9, 4, 4, { paralyze: 3 }) },
    boss: { id: 'bonelord', name: '뼈의 군주', icon: '☠️', hp: 225, slots: 2, res: [0.5, 1, 1.5], desc: '수천 구의 해골을 거느린 묘지의 왕.',
      deck: ['a_charge', 'a_charge', 'a_bite', 'a_wail', 'a_scythe', 'a_scythe', 'a_spear', 'a_necro', 'a_storm'],
      signature: sig('죽음의 행진', 'S', 10, 4, 5, { bleed: 2 }) },
  });

  region({
    id: 'forest', name: '썩은 숲', color: '#7fa66b', icon: '🌲',
    desc: '포자와 독이 뒤덮은 숲. 나무조차 사냥감을 기다린다.',
    cards: [
      ['f_thorn', '독 가시', 'P', 0, 2, 2, 2, { bleed: 1 }],
      ['f_claw', '발톱 휘두르기', 'S', 1, 4, 1, 4],
      ['f_spore', '포자 살포', 'B', 1, 3, 2, 2, { rupture: 1 }],
      ['f_howl', '사냥의 울음', 'S', 2, 3, 3, 2, { might: 1 }],
      ['f_vine', '덩굴 조이기', 'P', 2, 4, 2, 3, { rupture: 2 }],
      ['f_rush', '광포한 돌진', 'B', 3, 5, 3, 3],
      ['f_maul', '짓이기기', 'B', 4, 6, 3, 4],
    ],
    exclusive: [
      ['f_web', '거미줄 포박', 'P', 3, 4, 3, 3, { weak: 2 }],
      ['f_fang', '독니', 'P', 4, 5, 3, 4, { bleed: 3 }],
      ['f_brood', '산란', 'S', 5, 6, 4, 4, { heal: 6 }],
      ['f_root', '뿌리 속박', 'B', 3, 5, 3, 3, { rupture: 3 }],
      ['f_rot', '부패의 축복', 'B', 4, 6, 3, 4, { heal: 10 }],
      ['f_thornstorm', '가시 폭풍', 'P', 5, 5, 5, 3, { rupture: 1 }],
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
      signature: sig('여왕의 만찬', 'P', 9, 4, 4, { bleed: 3, lifesteal: 0.3 }) },
    boss: { id: 'witch', name: '고목의 마녀', icon: '🧙', hp: 230, slots: 2, res: [2, 0.5, 1], desc: '천 년 묵은 나무와 하나가 된 마녀.',
      deck: ['f_rush', 'f_rush', 'f_howl', 'f_vine', 'f_maul', 'f_maul', 'f_root', 'f_rot', 'f_thornstorm'],
      signature: sig('숲의 심판', 'B', 10, 4, 5, { rupture: 4 }) },
  });

  region({
    id: 'cathedral', name: '피의 성당', color: '#c0444a', icon: '⛪',
    desc: '신 대신 피를 섬기게 된 성당. 기도 소리는 비명으로 바뀌었다.',
    cards: [
      ['c_whip', '채찍질', 'S', 0, 2, 2, 2, { bleed: 2 }],
      ['c_zeal', '광신의 일격', 'B', 1, 4, 1, 4],
      ['c_pray', '피의 기도', 'B', 1, 3, 2, 2, { heal: 3 }],
      ['c_wing', '돌 날개', 'S', 2, 5, 2, 3],
      ['c_kiss', '흡혈 입맞춤', 'P', 2, 4, 2, 3, { lifesteal: 0.3 }],
      ['c_lance', '성혈 창', 'P', 3, 4, 3, 3, { bleed: 2 }],
      ['c_censer', '향로 강타', 'B', 4, 6, 3, 4, { burn: 2 }],
    ],
    exclusive: [
      ['c_torture', '고문 도구', 'P', 3, 4, 3, 3, { bleed: 3 }],
      ['c_heresy', '이단 심판', 'S', 4, 6, 3, 4],
      ['c_confess', '자백 강요', 'B', 5, 6, 4, 4, { paralyze: 2 }],
      ['c_feast', '피의 성찬', 'P', 3, 5, 3, 3, { lifesteal: 0.5 }],
      ['c_sermon', '타락한 설교', 'B', 4, 5, 3, 4, { weak: 3 }],
      ['c_holylance', '핏빛 성창', 'P', 5, 7, 4, 4, { burn: 3 }],
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
      signature: sig('화형식', 'B', 9, 4, 4, { burn: 5 }) },
    boss: { id: 'archbishop', name: '타락한 대주교', icon: '🩸', hp: 240, slots: 2, res: [1, 1.5, 0.5], desc: '피의 신을 불러낸 성당의 주인.',
      deck: ['c_lance', 'c_lance', 'c_kiss', 'c_wing', 'c_censer', 'c_censer', 'c_feast', 'c_sermon', 'c_holylance'],
      signature: sig('붉은 승천', 'P', 10, 4, 5, { heal: 15, bleed: 2 }) },
  });

  region({
    id: 'abyss', name: '심연의 동굴', color: '#8a6cc9', icon: '🕳️',
    desc: '빛이 닿지 않는 지하. 이곳에서 오래 머문 자는 스스로를 잊는다.',
    cards: [
      ['v_tentacle', '촉수 휘감기', 'B', 0, 2, 2, 2],
      ['v_blind', '눈먼 돌진', 'B', 1, 4, 1, 4],
      ['v_shadow', '그림자 베기', 'S', 1, 2, 3, 2],
      ['v_whisper', '심연의 속삭임', 'B', 2, 3, 3, 2, { paralyze: 1 }],
      ['v_grasp', '그림자 손아귀', 'S', 2, 5, 2, 3],
      ['v_flurry', '촉수 연타', 'B', 3, 3, 4, 2],
      ['v_devour', '탐식', 'P', 4, 6, 3, 4, { lifesteal: 0.2 }],
    ],
    exclusive: [
      ['v_eyes', '천 개의 눈', 'P', 3, 4, 3, 3, { paralyze: 2 }],
      ['v_madgaze', '광기의 시선', 'P', 4, 6, 3, 4],
      ['v_wave', '심연 파동', 'B', 5, 4, 6, 2],
      ['v_rift', '차원 찢기', 'S', 3, 5, 3, 3, { rupture: 3 }],
      ['v_dread', '무형의 공포', 'S', 4, 5, 3, 4, { paralyze: 2 }],
      ['v_maw', '공허의 입', 'P', 5, 7, 4, 4, { lifesteal: 0.3 }],
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
      signature: sig('응시하는 심연', 'P', 9, 4, 4, { paralyze: 3 }) },
    boss: { id: 'nameless', name: '이름 없는 것', icon: '🐙', hp: 250, slots: 2, res: [1, 1, 1], desc: '형태도, 이름도 없는 심연의 주인.',
      deck: ['v_devour', 'v_devour', 'v_flurry', 'v_flurry', 'v_grasp', 'v_whisper', 'v_rift', 'v_dread', 'v_maw'],
      signature: sig('형언할 수 없는 것', 'B', 10, 5, 4, { rupture: 3 }) },
  });

  region({
    id: 'frost', name: '서리 왕좌', color: '#7cc4e0', icon: '❄️',
    desc: '영원한 겨울에 갇힌 옛 왕국. 얼어붙은 기사들은 아직도 왕을 지킨다.',
    cards: [
      ['r_iceclaw', '얼음 손톱', 'S', 0, 3, 1, 3],
      ['r_frostcut', '서리 검격', 'S', 1, 3, 2, 2],
      ['r_breath', '냉기 숨결', 'B', 1, 3, 2, 2, { weak: 1 }],
      ['r_pale', '창백한 찌르기', 'P', 2, 5, 2, 3],
      ['r_blizzard', '눈보라', 'S', 2, 3, 3, 2, { poise: 2 }],
      ['r_icelance', '빙창', 'P', 3, 5, 3, 3],
      ['r_greatsword', '서리 대검', 'S', 4, 6, 3, 4],
    ],
    exclusive: [
      ['r_freeze', '빙결 참격', 'S', 3, 5, 3, 3, { fragile: 2 }],
      ['r_wintershield', '겨울 방패', 'B', 4, 7, 2, 5, { heal: 6 }],
      ['r_icestorm', '얼음 폭풍', 'P', 5, 4, 6, 2],
      ['r_crown', '서리 왕관', 'B', 3, 4, 3, 3, { heal: 12 }],
      ['r_glacier', '빙관의 일격', 'B', 4, 7, 3, 4],
      ['r_eternal', '영원한 겨울', 'S', 5, 6, 4, 4, { weak: 2 }],
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
      signature: sig('절대 영도', 'S', 9, 4, 4, { fragile: 3 }) },
    boss: { id: 'winterking', name: '겨울의 왕', icon: '🧊', hp: 255, slots: 2, res: [1, 1, 1.5], desc: '왕국을 영원한 겨울로 봉인한 망자의 왕.',
      deck: ['r_icelance', 'r_icelance', 'r_pale', 'r_blizzard', 'r_greatsword', 'r_greatsword', 'r_crown', 'r_glacier', 'r_eternal'],
      signature: sig('만년설의 심판', 'B', 11, 4, 5, { fragile: 2 }) },
  });

  const REGION_MAP = {};
  REGIONS.forEach(r => { REGION_MAP[r.id] = r; });

  // 위력(potency)과 횟수(count)를 가진 상태이상
  const STATUS_INFO = {
    bleed: { name: '출혈', icon: '🩸', pc: true, desc: '공격 코인을 사용할 때마다 위력만큼 피해를 받고 횟수 -1.' },
    burn: { name: '화상', icon: '🔥', pc: true, desc: '턴 종료 시 위력만큼 피해를 받고 횟수 -1.' },
    rupture: { name: '파열', icon: '💥', pc: true, desc: '피격 시 위력만큼 추가 피해를 받고 횟수 -1.' },
    poise: { name: '호흡', icon: '🌬️', pc: true, desc: '공격 적중 시 위력×5% 확률로 치명타(피해 +20%). 치명타가 나면 횟수 -1.' },
    paralyze: { name: '마비', icon: '⚡', desc: '이번 턴 코인 n개의 위력이 0으로 고정된다.' },
    weak: { name: '위력 감소', icon: '🔻', desc: '이번 턴 모든 스킬의 기본 위력이 수치만큼 감소한다.' },
    might: { name: '위력 증가', icon: '🔺', desc: '이번 턴 모든 스킬의 기본 위력이 수치만큼 증가한다.' },
    fragile: { name: '취약', icon: '🔓', desc: '이번 턴 받는 피해가 수치×10% 증가한다.' },
  };


  // 밸런스 조정값
  const BALANCE = {
    playerHp: 150,          // 플레이어 시작 체력
    enemyHpMul: { normal: 1, midboss: 1, boss: 1 },
    enemyBasePower: { normal: 3, midboss: -2, boss: -3 }, // 적 기본 위력 보정
    hpPerFloor: 0.1,        // 층마다 적 체력 +10%
    powerEveryFloors: 3,    // n층마다 적 기본 위력 +1
    coinPowerEveryFloors: 10, // n층마다 적 코인 위력 +1
    extraSlotFloor: 11,     // 이 층부터 일반 몬스터 스킬 슬롯 +1
    bossHealPct: 0.3,       // 보스 처치 후 최대 체력 대비 회복량
  };

  const RARITY_NAME = { common: '일반', rare: '희귀', legendary: '전설', exclusive: '전용', signature: '고유' };

  const DATA = { CARDS, STARTER_DECK, CARD_POOL, LIGHT_POINTS, PASSIVES, ITEMS, RARITY_WEIGHTS, REGIONS, REGION_MAP, STATUS_INFO, RARITY_NAME, BALANCE, TYPES, TYPE_ORDER, RES_NAME };

  if (typeof module !== 'undefined' && module.exports) module.exports = DATA;
  else root.FFD_DATA = DATA;
})(typeof window !== 'undefined' ? window : globalThis);
