# 이미지 생성 프롬프트

`node tools/generate-images.js --markdown` 으로 다시 만들 수 있습니다. 프롬프트는 `tools/image-prompts.js` 에서 고칩니다.

## 규칙

- 정사각형 PNG (1024×1024 또는 512×512)
- 각 항목의 **저장 경로** 그대로 저장합니다. 파일 이름이 다르면 게임이 인식하지 못합니다.
- 저장한 뒤 `node tools/generate-images.js --manifest` 를 실행하면 `assets/manifest.js` 가 갱신되어 게임에 나타납니다.
- 그다음 `git add assets && git commit -m "이미지 추가" && git push` 로 올립니다.

## 직업 (3개)

### 방랑검사

저장 경로: `assets/classes/swordsman.png`

```text
Waist-up portrait of a playable hero, heroic pose: a lone wandering swordsman in a tattered dark travelling cloak and worn leather armor, holding a single long straight sword, scarred face half hidden under a hood, cloak blown by the wind. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 전령

저장 경로: `assets/classes/herald.png`

```text
Waist-up portrait of a playable hero, heroic pose: a holy herald pilgrim in travel-stained white and gold vestments, holding a long spear with a small pennant, soft golden holy light and a faint dove-shaped glow behind, calm praying expression. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 중기병

저장 경로: `assets/classes/cavalry.png`

```text
Waist-up portrait of a playable hero, heroic pose: a heavy cavalry knight who lost his horse, in massive dented plate armor with a large kite shield and a flanged mace, closed visor helm with a faded red plume. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

## 몬스터 (25개)

### 구울 (잿빛 묘지)

저장 경로: `assets/monsters/ghoul.png`

```text
Enemy portrait, menacing, facing the viewer: an emaciated grey-skinned ghoul crawling forward, long cracked claws, sunken glowing eyes, torn burial cloth, ash-grey graveyard mist. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 해골 병사 (잿빛 묘지)

저장 경로: `assets/monsters/skeleton.png`

```text
Enemy portrait, menacing, facing the viewer: a skeleton soldier in rusted chainmail and a broken helmet, holding a notched rusty sword and a cracked round shield. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 울부짖는 망령 (잿빛 묘지)

저장 경로: `assets/monsters/wraith.png`

```text
Enemy portrait, menacing, facing the viewer: a howling translucent wraith with a wide screaming mouth, trailing tattered shroud, pale blue-grey ethereal glow. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 무덤지기 (잿빛 묘지)

저장 경로: `assets/monsters/gravekeeper.png`

```text
Enemy portrait, menacing, facing the viewer: a hulking gravekeeper giant holding a huge iron shovel and a dim lantern, patched leather coat, stitched face, tilted tombstones behind. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 뼈의 군주 (잿빛 묘지)

저장 경로: `assets/monsters/bonelord.png`

```text
Enemy portrait, menacing, facing the viewer: the lord of bones seated on a throne of skulls, crown of bone, tattered royal cape, green soul fire burning in the eye sockets, bone scepter. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 광기의 늑대인간 (썩은 숲)

저장 경로: `assets/monsters/werewolf.png`

```text
Enemy portrait, menacing, facing the viewer: a frenzied werewolf with matted dark fur, bloodshot eyes and bared fangs, torn clothes, pale moon behind rotten trees. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 썩은 버섯괴물 (썩은 숲)

저장 경로: `assets/monsters/shroom.png`

```text
Enemy portrait, menacing, facing the viewer: a rotting mushroom monster, a humanoid body made of fungus, sickly green glowing spore clouds drifting from its cap. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 독거미 무리 (썩은 숲)

저장 경로: `assets/monsters/spiders.png`

```text
Enemy portrait, menacing, facing the viewer: a swarm of venomous black spiders with red markings pouring out of a web-covered hollow log. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 거미 여왕 (썩은 숲)

저장 경로: `assets/monsters/spiderqueen.png`

```text
Enemy portrait, menacing, facing the viewer: a gigantic spider queen with a pale humanoid upper body, clusters of egg sacs, thick webs in a dark lair. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 고목의 마녀 (썩은 숲)

저장 경로: `assets/monsters/witch.png`

```text
Enemy portrait, menacing, facing the viewer: an ancient witch fused with a gnarled dead tree, bark skin, roots as hair, glowing amber eyes, thorny vines coiling around her. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 광신도 (피의 성당)

저장 경로: `assets/monsters/zealot.png`

```text
Enemy portrait, menacing, facing the viewer: a hooded blood-cult zealot in crimson robes holding a spiked flail, self-inflicted wounds, melting candles around. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 가고일 (피의 성당)

저장 경로: `assets/monsters/gargoyle.png`

```text
Enemy portrait, menacing, facing the viewer: a stone gargoyle crouching on a gothic cathedral ledge, cracked granite skin, bat wings, glowing red eyes. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 흡혈 사제 (피의 성당)

저장 경로: `assets/monsters/vampriest.png`

```text
Enemy portrait, menacing, facing the viewer: a vampire priest in black and red vestments, pale gaunt face with fangs, raising a golden chalice of blood. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 심문관 (피의 성당)

저장 경로: `assets/monsters/inquisitor.png`

```text
Enemy portrait, menacing, facing the viewer: a masked inquisitor in dark armor wrapped in chains, iron face mask, holding a burning branding iron. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 타락한 대주교 (피의 성당)

저장 경로: `assets/monsters/archbishop.png`

```text
Enemy portrait, menacing, facing the viewer: a corrupted archbishop floating in blood-soaked golden mitre and robes, a halo of floating blood droplets, arms raised in a dark blessing. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 눈먼 추적자 (심연의 동굴)

저장 경로: `assets/monsters/stalker.png`

```text
Enemy portrait, menacing, facing the viewer: an eyeless cave stalker, a pale bat-like humanoid with huge ears and long thin limbs, emerging from darkness. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 동굴 촉수 (심연의 동굴)

저장 경로: `assets/monsters/tentacles.png`

```text
Enemy portrait, menacing, facing the viewer: a writhing mass of slimy tentacles bursting from cracks in a cave wall, faint purple bioluminescence. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 그림자 (심연의 동굴)

저장 경로: `assets/monsters/shade.png`

```text
Enemy portrait, menacing, facing the viewer: a living shadow in a lost human shape with smoky dissolving edges and two faint white eyes. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 심연의 감시자 (심연의 동굴)

저장 경로: `assets/monsters/watcher.png`

```text
Enemy portrait, menacing, facing the viewer: an enormous floating veined eye of the abyss surrounded by many smaller eyes, purple void around it. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 이름 없는 것 (심연의 동굴)

저장 경로: `assets/monsters/nameless.png`

```text
Enemy portrait, menacing, facing the viewer: a nameless eldritch horror, a shifting shapeless mass of mouths, eyes and tentacles against cosmic darkness. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 얼어붙은 망자 (서리 왕좌)

저장 경로: `assets/monsters/frozen.png`

```text
Enemy portrait, menacing, facing the viewer: a frozen undead villager covered in frost and icicles, blue skin, ragged peasant clothes, breath of cold mist. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 서리 늑대 (서리 왕좌)

저장 경로: `assets/monsters/frostwolf.png`

```text
Enemy portrait, menacing, facing the viewer: a pack of white frost wolves with icy breath and glowing pale blue eyes in a blizzard. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 창백한 기사 (서리 왕좌)

저장 경로: `assets/monsters/paleknight.png`

```text
Enemy portrait, menacing, facing the viewer: a pale undead knight in frost-covered ornate armor with a tattered blue tabard and a longsword, loyal guarding stance. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 서리 기사단장 (서리 왕좌)

저장 경로: `assets/monsters/frostcommander.png`

```text
Enemy portrait, menacing, facing the viewer: a frost knight commander in heavy ice-encrusted armor holding a greatsword made of ice, a frozen banner behind. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 겨울의 왕 (서리 왕좌)

저장 경로: `assets/monsters/winterking.png`

```text
Enemy portrait, menacing, facing the viewer: an undead winter king on a throne of ice, crown of icicles, frozen long white beard, blue soul fire in the eyes, ice scepter. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

## 아이템 (26개)

### 거친 붕대

저장 경로: `assets/items/it_rag.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a rough, dirty rolled linen bandage. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 숫돌 조각

저장 경로: `assets/items/it_chip.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a small chipped fragment of a grey whetstone. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 낡은 부적

저장 경로: `assets/items/it_charm.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: an old frayed woven cloth charm with a single small bead. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 성직자의 붕대

저장 경로: `assets/items/it_bandage.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a clean rolled cleric bandage with a small holy symbol stitched in gold thread. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 뼈 부적

저장 경로: `assets/items/it_bone.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a carved bone amulet hanging on a leather cord. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 까마귀 깃털

저장 경로: `assets/items/it_feather.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a single glossy black raven feather. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 치유 물약

저장 경로: `assets/items/it_potion.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a small round glass healing potion bottle with glowing red liquid and a cork stopper. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 숫돌

저장 경로: `assets/items/it_whetstone.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a rectangular sharpening whetstone with a drop of oil on it. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 낡은 돈주머니

저장 경로: `assets/items/it_purse.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a worn leather coin purse with a few silver coins spilling out. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 낡은 두루마리

저장 경로: `assets/items/it_newcard_c.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: an old rolled parchment scroll tied with frayed string. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 녹슨 대검

저장 경로: `assets/items/it_sword.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a rusty greatsword with a chipped blade. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 은빛 부적

저장 경로: `assets/items/it_amulet.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a silver amulet with a blue eye-shaped gem. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 모래시계

저장 경로: `assets/items/it_hourglass.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: an ornate brass hourglass with dark sand falling. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 흡혈귀 송곳니

저장 경로: `assets/items/it_fang.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a long vampire fang hanging on a thin silver chain. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 사냥꾼의 표식

저장 경로: `assets/items/it_mark.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a hunter's bone token painted with a red blood mark. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 꺼지지 않는 불씨

저장 경로: `assets/items/it_ember.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a glowing ember inside a small iron cage lantern. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 무게 추 주사위

저장 경로: `assets/items/it_loaded.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a weighted bone six-sided die with a visible lead core. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 룬 각인

저장 경로: `assets/items/it_engrave.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a runic engraving chisel with a glowing blue rune on its tip. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 진홍의 영약

저장 경로: `assets/items/it_elixir.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a tall elegant flask of glowing crimson elixir. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 금지된 마도서

저장 경로: `assets/items/it_newcard_r.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a forbidden grimoire bound in dark leather and chains. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 성배

저장 경로: `assets/items/it_grail.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a golden holy grail radiating soft light. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 망자의 세 번째 팔

저장 경로: `assets/items/it_arm.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a mummified skeletal third arm relic wrapped in old cloth. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 운명의 주사위

저장 경로: `assets/items/it_fatedie.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a golden six-sided die glowing like the full moon. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 가시 왕관

저장 경로: `assets/items/it_crown.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a crown of thorns forged from black iron. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 주사위 주조틀

저장 경로: `assets/items/it_forge.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: a bronze dice-casting mold with molten metal glowing inside. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```

### 운명의 서

저장 경로: `assets/items/it_newcard_l.png`

```text
Game item icon, a single object shown alone, clean silhouette readable at small size: an ancient tome of fate with a glowing golden eye on its cover. dark fantasy illustration for a roguelike card game; painterly, muted desaturated palette with one warm accent color; dramatic rim lighting, subject centered and filling most of the frame; plain dark vignette background, square 1:1 composition; no text, no letters, no border, no watermark.
```
