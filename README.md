<h2>Catcatch(Pc ver)</h2>

<ul>
        <li>배포 url : https://imggame-24c7e.web.app/</li>
</ul>

<h3>프로젝트 소개</h3>
시각적 요소와 청각적 요소를 함께 활용해 사용자 경험을 풍부하게 만든 미니게임입니다.<br> 
간단한 익명 등록 기능을 추가하여 빠르고 간편하게 접근 가능한 게임으로 설계되었습니다.


<h3>개발 환경</h3>
<ul>
      <li>Front : React, Ts, Context API, Tailwind</li>
      <li>Back : firebase</li>
      <li>버전 및 이슈 관리 : Github</li>
      <li>디자인 : Illustrator, 프리픽(고양이 이미지 사용)</li>
      <li>서비스 배포 환경 : firebase</li>
</ul>


<h3>채택한 개발 기술</h3>
<ul>
      <li> 상태 관리에는 Context API 사용<br>
           상태 관리를 구현하며 보일러플레이트 코드를 이해하게 되었고, 
           필요한 정보를 상태에 담아 가져오는 방법이 효율적이라는 것을 깨달았습니다. 
           게시판2 프로젝트에서 Context API를 사용한 경험을 토대로, 이를 더 익숙하게 다루기 위해 미니 게임에도 적용해 보았습니다. 
           특히, 사용자가 선택한 난이도를 상태로 저장하고 가져오는 기능을 구현하면서 Context API를 활용한 상태 관리의 편리함을 더욱 실감할 수 있었습니다.
      </li>
</ul>



<h3>프로젝트 구조</h3>

```
index.html
package-lock.json
package.json
postcss.config.js
├─ src
App.tsx
Context.tsx
components
│  │  ├─ LoginPage.tsx
│  │  ├─ MainPage.tsx
│  │  ├─ RankPage.tsx
│  │  └─ StartPage.tsx
│  ├─ firegase-config.tsx
│  ├─ main.tsx
│  ├─ style
│  │  ├─ App.css
│  │  ├─ index.css
│  │  └─ output.css
│  └─ vite-env.d.ts
└─ /
```


<h3>페이지 별 주요 기능</h3>
<h4>[ 메인 페이지 ] </h4>
<img src="https://github.com/user-attachments/assets/e5207746-0a98-4b65-b8fb-9b93f945e3dc" alt="메인 페이지"/>
<ul>
      <li>사용자가 난이도를 선택 할 수 있습니다.</li>
      <li>선택 한 난이도를 선택 후 이름 작성 페이지로 이동 됩니다.</li>
</ul>

<h4>[ 이름 작성 페이지 ] </h4>
<img src="https://github.com/user-attachments/assets/251a0efd-cbbe-4473-8499-0afde6980f4b" alt="이름 작성 페이지"/>
<ul>
      <li>사용자의 이름을 작성 할 수 있습니다.</li>
</ul>

<h4>[ 게임 페이지 ] </h4>
<img src="https://github.com/user-attachments/assets/72a6ccee-fbf5-4283-b0ae-e7023f4feff4" alt="게임 페이지"/>
<ul>
      <li>주어진 시간 내에 떨어 지는 고양이를 잡는 게임 입니다.</li>
      <li>시간이 다 되면 랭킹/메인 페이지로 갈 수 있는 팝업이 뜹니다.</li>
      <li>BGM과 난이도 선택시 고양이 울음 소리가 적용 되어 있습니다.</li>
</ul>

<h4>[ 등수 페이지 ] </h4>
<img src="https://github.com/user-attachments/assets/4f79af7d-8c4b-47aa-a5e4-d98029faed8d" alt="등수 페이지"/>
<ul>
      <li>파이어베이스를 이용해 익명의 사용자의 정보로 등수가 기록 됩니다.</li>
      <li>난이도 별 등 수를 확인 할 수 있습니다.</li>
</ul>



<h3>프로젝트 후기</h3>
미니게임 프로젝트를 통해 시각적 요소뿐만 아니라 청각적 요소가 사용자 경험에 미치는 영향을 직접 체감할 수 있었습니다.<br>
또한, 간단한 가입 절차와 사용자 친화적인 설계를 통해 접근성과 재미를 모두 고려한 프로젝트로 구현 할 수 있었습니다.
