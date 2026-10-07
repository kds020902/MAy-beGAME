// audio-map.js — 지도마다 쓰는 배경 음악(bgm)과 환경음 층(amb)
// amb 항목: '열쇠' 또는 '열쇠@배율'(0~1). night: 밤에 더하는 층(없으면 바깥 지도는 새소리 대신 풀벌레).
// indoor: 실내(밤에도 풀벌레를 더하지 않음). 열쇠는 audio/manifest.js(window.AUDIO)의 amb/bgm 열쇠.
// 여기 없는 지도는 app.js가 카테고리 기본값을 쓴다.
window.AUDIO_MAP = {
  // ── 던전 ──
  ashen: { amb: ['crypt', 'mountain_wind@0.35'], bgm: 'dungeon', night: ['night_insects@0.35'] },
  forest: { amb: ['swamp', 'forest@0.6'], bgm: 'dungeon', night: ['night_insects@0.6'] },
  cathedral: { amb: ['crypt', 'castle@0.6'], bgm: 'dungeon' },
  abyss: { amb: ['cave', 'magic_hum@0.4'], bgm: 'dungeon', indoor: true },
  frost: { amb: ['snow_wind', 'castle@0.4'], bgm: 'dungeon' },

  // ── 마을 ──
  millbrook: { amb: ['river', 'field_birds'], bgm: 'village' },
  harbor: { amb: ['harbor', 'field_birds@0.3'], bgm: 'village' },
  ironhollow: { amb: ['cave', 'lava@0.6'], bgm: 'village', indoor: true },
  'ironhollow-mine': { amb: ['cave'], bgm: 'village', indoor: true },
  silverleaf: { amb: ['forest', 'river@0.4', 'magic_hum@0.25'], bgm: 'village', night: ['night_insects@0.7'] },
  harvest: { amb: ['field_birds', 'town@0.4'], bgm: 'village' },

  // ── 왕국 ──
  market: { amb: ['market', 'town@0.5'], bgm: 'kingdom' },
  elmrow: { amb: ['town', 'field_birds@0.6'], bgm: 'kingdom' },
  canal: { amb: ['river', 'town@0.6'], bgm: 'kingdom' },
  castlegate: { amb: ['town', 'castle@0.5'], bgm: 'kingdom' },
  innerkeep: { amb: ['castle', 'field_birds@0.3'], bgm: 'kingdom', night: ['night_insects@0.4'] },

  // ── 마법도시 ──
  academy: { amb: ['magic_hum', 'mountain_wind@0.5'], bgm: 'magic', night: ['night_insects@0.3'] },
  alembic: { amb: ['town@0.7', 'magic_hum@0.6', 'lava@0.25'], bgm: 'magic' },
  stellaris: { amb: ['mountain_wind', 'magic_hum@0.4'], bgm: 'magic', night: ['night_insects@0.5'] },
  cogspire: { amb: ['town', 'magic_hum@0.4'], bgm: 'magic' },
  lunaris: { amb: ['magic_hum', 'river@0.6'], bgm: 'magic', night: ['night_insects@0.4'] },

  // ── 틈새의 땅(보스 결투장은 lands_boss) ──
  leyndell: { amb: ['mountain_wind', 'magic_hum@0.4'], bgm: 'lands_boss' },
  'leyndell-sub': { amb: ['castle', 'magic_hum@0.3'], bgm: 'lands', indoor: true },
  flamepeak: { amb: ['mountain_wind', 'lava@0.6', 'snow_wind@0.4'], bgm: 'lands_boss' },
  'flamepeak-forge': { amb: ['snow_wind', 'lava@0.7'], bgm: 'lands' },
  mohgwyn: { amb: ['crypt', 'lava@0.4'], bgm: 'lands_boss' },
  'mohgwyn-sub': { amb: ['crypt', 'cave@0.6'], bgm: 'lands', indoor: true },
  elphael: { amb: ['cave', 'swamp@0.5'], bgm: 'lands_boss', indoor: true },
  'elphael-sub': { amb: ['mountain_wind', 'castle@0.4'], bgm: 'lands' },
  farum: { amb: ['storm', 'mountain_wind@0.5'], bgm: 'lands_boss' },
  'farum-sub': { amb: ['storm', 'mountain_wind@0.4'], bgm: 'lands' },

  // ── 오라리오 ──
  babel: { amb: ['town', 'market@0.5'], bgm: 'orario' },
  mistress: { amb: ['town', 'market@0.4'], bgm: 'orario' },
  hestia: { amb: ['town@0.7', 'field_birds@0.6'], bgm: 'orario' },
  'hestia-church': { amb: ['town@0.5', 'field_birds@0.7'], bgm: 'orario' },
  loki: { amb: ['town', 'mountain_wind@0.3'], bgm: 'orario' },
  freya: { amb: ['town@0.7', 'field_birds@0.6'], bgm: 'orario' },

  // ── 타르코프(실내·보스 지도는 tarkov_tension) ──
  lexos: { amb: ['city_ruin'], bgm: 'tarkov' },
  'lexos-in': { amb: ['mall_indoor', 'city_ruin@0.25'], bgm: 'tarkov_tension', indoor: true },
  groundzero: { amb: ['city_ruin'], bgm: 'tarkov' },
  'groundzero-in': { amb: ['mall_indoor'], bgm: 'tarkov_tension', indoor: true },
  icebreaker: { amb: ['ship_ice', 'snow_wind@0.6'], bgm: 'tarkov' },
  'icebreaker-in': { amb: ['ship_ice@0.6', 'snow_wind@0.3'], bgm: 'tarkov_tension', indoor: true },
  'icebreaker-gym': { amb: ['ship_ice@0.5', 'mall_indoor@0.4'], bgm: 'tarkov_tension', indoor: true },
  woods: { amb: ['forest', 'field_birds@0.5'], bgm: 'tarkov_tension' },
  'woods-in': { amb: ['forest@0.35', 'mall_indoor@0.3'], bgm: 'tarkov_tension', indoor: true },
  interchange: { amb: ['city_ruin'], bgm: 'tarkov' },
  'interchange-in': { amb: ['mall_indoor'], bgm: 'tarkov_tension', indoor: true },
};
