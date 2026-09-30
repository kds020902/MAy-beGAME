/*
 * 이미지 생성 프롬프트. tools/generate-images.js 와 IMAGE_PROMPTS.md 가 함께 쓴다.
 * 모든 이미지에 STYLE 을 붙여 화풍을 통일한다.
 */
'use strict';

const STYLE = [
  'dark fantasy illustration for a roguelike card game',
  'painterly, muted desaturated palette with one warm accent color',
  'dramatic rim lighting, subject centered and filling most of the frame',
  'plain dark vignette background, square 1:1 composition',
  'no text, no letters, no border, no watermark',
].join('; ');

// 대상별 그림 묘사 (id → 영어 묘사)
const VISUAL = {
  // 직업 — 허리 위 초상
  swordsman: 'a lone wandering swordsman in a tattered dark travelling cloak and worn leather armor, holding a single long straight sword, scarred face half hidden under a hood, cloak blown by the wind',
  herald: 'a holy herald pilgrim in travel-stained white and gold vestments, holding a long spear with a small pennant, soft golden holy light and a faint dove-shaped glow behind, calm praying expression',
  cavalry: 'a heavy cavalry knight who lost his horse, in massive dented plate armor with a large kite shield and a flanged mace, closed visor helm with a faded red plume',

  // 잿빛 묘지
  ghoul: 'an emaciated grey-skinned ghoul crawling forward, long cracked claws, sunken glowing eyes, torn burial cloth, ash-grey graveyard mist',
  skeleton: 'a skeleton soldier in rusted chainmail and a broken helmet, holding a notched rusty sword and a cracked round shield',
  wraith: 'a howling translucent wraith with a wide screaming mouth, trailing tattered shroud, pale blue-grey ethereal glow',
  gravekeeper: 'a hulking gravekeeper giant holding a huge iron shovel and a dim lantern, patched leather coat, stitched face, tilted tombstones behind',
  bonelord: 'the lord of bones seated on a throne of skulls, crown of bone, tattered royal cape, green soul fire burning in the eye sockets, bone scepter',

  // 썩은 숲
  werewolf: 'a frenzied werewolf with matted dark fur, bloodshot eyes and bared fangs, torn clothes, pale moon behind rotten trees',
  shroom: 'a rotting mushroom monster, a humanoid body made of fungus, sickly green glowing spore clouds drifting from its cap',
  spiders: 'a swarm of venomous black spiders with red markings pouring out of a web-covered hollow log',
  spiderqueen: 'a gigantic spider queen with a pale humanoid upper body, clusters of egg sacs, thick webs in a dark lair',
  witch: 'an ancient witch fused with a gnarled dead tree, bark skin, roots as hair, glowing amber eyes, thorny vines coiling around her',

  // 피의 성당
  zealot: 'a hooded blood-cult zealot in crimson robes holding a spiked flail, self-inflicted wounds, melting candles around',
  gargoyle: 'a stone gargoyle crouching on a gothic cathedral ledge, cracked granite skin, bat wings, glowing red eyes',
  vampriest: 'a vampire priest in black and red vestments, pale gaunt face with fangs, raising a golden chalice of blood',
  inquisitor: 'a masked inquisitor in dark armor wrapped in chains, iron face mask, holding a burning branding iron',
  archbishop: 'a corrupted archbishop floating in blood-soaked golden mitre and robes, a halo of floating blood droplets, arms raised in a dark blessing',

  // 심연의 동굴
  stalker: 'an eyeless cave stalker, a pale bat-like humanoid with huge ears and long thin limbs, emerging from darkness',
  tentacles: 'a writhing mass of slimy tentacles bursting from cracks in a cave wall, faint purple bioluminescence',
  shade: 'a living shadow in a lost human shape with smoky dissolving edges and two faint white eyes',
  watcher: 'an enormous floating veined eye of the abyss surrounded by many smaller eyes, purple void around it',
  nameless: 'a nameless eldritch horror, a shifting shapeless mass of mouths, eyes and tentacles against cosmic darkness',

  // 서리 왕좌
  frozen: 'a frozen undead villager covered in frost and icicles, blue skin, ragged peasant clothes, breath of cold mist',
  frostwolf: 'a pack of white frost wolves with icy breath and glowing pale blue eyes in a blizzard',
  paleknight: 'a pale undead knight in frost-covered ornate armor with a tattered blue tabard and a longsword, loyal guarding stance',
  frostcommander: 'a frost knight commander in heavy ice-encrusted armor holding a greatsword made of ice, a frozen banner behind',
  winterking: 'an undead winter king on a throne of ice, crown of icicles, frozen long white beard, blue soul fire in the eyes, ice scepter',

  // 아이템 — 물건 하나만
  it_rag: 'a rough, dirty rolled linen bandage',
  it_chip: 'a small chipped fragment of a grey whetstone',
  it_charm: 'an old frayed woven cloth charm with a single small bead',
  it_bandage: 'a clean rolled cleric bandage with a small holy symbol stitched in gold thread',
  it_bone: 'a carved bone amulet hanging on a leather cord',
  it_feather: 'a single glossy black raven feather',
  it_potion: 'a small round glass healing potion bottle with glowing red liquid and a cork stopper',
  it_whetstone: 'a rectangular sharpening whetstone with a drop of oil on it',
  it_purse: 'a worn leather coin purse with a few silver coins spilling out',
  it_newcard_c: 'an old rolled parchment scroll tied with frayed string',
  it_sword: 'a rusty greatsword with a chipped blade',
  it_amulet: 'a silver amulet with a blue eye-shaped gem',
  it_hourglass: 'an ornate brass hourglass with dark sand falling',
  it_fang: 'a long vampire fang hanging on a thin silver chain',
  it_mark: "a hunter's bone token painted with a red blood mark",
  it_ember: 'a glowing ember inside a small iron cage lantern',
  it_loaded: 'a weighted bone six-sided die with a visible lead core',
  it_engrave: 'a runic engraving chisel with a glowing blue rune on its tip',
  it_elixir: 'a tall elegant flask of glowing crimson elixir',
  it_newcard_r: 'a forbidden grimoire bound in dark leather and chains',
  it_grail: 'a golden holy grail radiating soft light',
  it_arm: 'a mummified skeletal third arm relic wrapped in old cloth',
  it_fatedie: 'a golden six-sided die glowing like the full moon',
  it_crown: 'a crown of thorns forged from black iron',
  it_forge: 'a bronze dice-casting mold with molten metal glowing inside',
  it_newcard_l: 'an ancient tome of fate with a glowing golden eye on its cover',
};

const FRAMING = {
  classes: 'Waist-up portrait of a playable hero, heroic pose',
  monsters: 'Enemy portrait, menacing, facing the viewer',
  items: 'Game item icon, a single object shown alone, clean silhouette readable at small size',
};

function promptFor(kind, id) {
  const visual = VISUAL[id];
  if (!visual) return null;
  return `${FRAMING[kind]}: ${visual}. ${STYLE}.`;
}

module.exports = { STYLE, VISUAL, FRAMING, promptFor };
