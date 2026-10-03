# Fate Five 지역 지도 (fantasy-atlas)

Three.js r128로 그린 3D 도트(복셀) 판타지 지도 모음이에요. 탭은 여섯 개예요.

- 던전
- 마을
- 왕국
- 마법도시
- 틈새의 땅: 엘든 링 보스방
- 오라리오: 던전에서 만남을 추구하면 안 되는 걸까

공유 링크: https://claude.ai/artifact/ScsUQVYzktwZZFh2m5UDN5 (v21까지 게시)

## 구조

- `maps/index.html`: 화면 골격, 스타일, 스크립트 목록.
- `maps/voxel.js`: 복셀 월드, 메셔, 후처리(외곽선·안개·도트).
- `maps/kit.js`, `maps/kit2.js`: 공용 지형·건축 도구.
- `maps/e-kit.js`: 틈새의 땅 도구.
- `maps/o-kit.js`: 오라리오 도구.
- `maps/app.js`: 카메라, 상호작용, 장소 이동, 탭.
- `maps/<탭 머리글자>-*.js`: 지도 하나당 파일 하나.
  - 머리글자: `d` 던전, `v` 마을, `k` 왕국, `m` 마법도시, `e` 틈새의 땅, `o` 오라리오.
  - 지도 정의의 `sub: true`는 탭에 안 보이는 하위 지도예요. 상호작용의 `goto: '지도 id'`로 들어가요.

## 도구 (Node)

```
node serve.js                       # http://localhost:5178 미리보기
node test3.js orario                # 빌드 검사(탭 id나 지도 id)
node audit.js orario                # 상호작용 가시성·움직임 검사
node snap.js babel 43 0.6 1.05      # 오프라인 렌더(snap.png)
node set-scripts.js <지도들...>      # index.html 스크립트 목록 갱신
node build-inline.js                # 게시용 단일 파일 fate-five-atlas.html
```

부품을 옮긴 상태로 렌더하려면 `PROPOFF='이름:x,y,z'`를 앞에 붙여요.
