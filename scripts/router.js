// Groupware System v2 - 해시 라우터 (router.js)

const routes = {
  "#home": {
    title: "대시보드",
    hasSubPanel: false,
    renderSubPanel: () => "",
    renderMain: () => renderPlaceholder("통합 대시보드", "종합 현황, 위젯, AI 브리핑 및 프로젝트 상태 칸반을 한눈에 관리합니다.")
  },
  "#chat": {
    title: "메시지",
    hasSubPanel: true,
    renderSubPanel: () => renderChatSubPanel(),
    renderMain: () => renderChatMain()
  },
  "#mail": {
    title: "메일",
    hasSubPanel: true,
    renderSubPanel: () => renderServiceSubPanel("메일", ["받은 메일함", "보낸 메일함", "개인 메일함", "임시 보관함", "스팸 메일함", "휴지통"]),
    renderMain: () => renderPlaceholder("메일 수신함", "사내 통합 메일 서비스입니다. CON-COST 및 Viet QS 법인 메일이 실시간 통합 서빙됩니다.")
  },
  "#calendar": {
    title: "캘린더",
    hasSubPanel: true,
    renderSubPanel: () => renderServiceSubPanel("캘린더", ["내 캘린더", "회사 일정", "부서 일정 (경영지원)", "설비 예약"]),
    renderMain: () => renderPlaceholder("일정 캘린더", "개인 일정 및 프로젝트 마일스톤, 리소스 점유 상태를 드래그 앤 드롭 뷰어로 확인합니다.")
  },
  "#todo": {
    title: "할 일",
    hasSubPanel: true,
    renderSubPanel: () => renderServiceSubPanel("할 일", ["오늘 할 일", "대기중인 일", "완료된 일", "보낸 요청"]),
    renderMain: () => renderPlaceholder("할 일 / 업무 체크", "개인 및 협업 태스크 카드들을 보드 형태로 모아 관리합니다.")
  },
  "#board": {
    title: "게시판",
    hasSubPanel: true,
    renderSubPanel: () => renderServiceSubPanel("게시판", ["전사 공지사항", "자유게시판", "경영지원 소식", "QS 기술자료실"]),
    renderMain: () => renderPlaceholder("사내 게시판", "전사 주요 공지와 기술 문서, 워크스페이스 공지 피드를 게재합니다.")
  },
  "#meet": {
    title: "화상회의",
    hasSubPanel: true,
    renderSubPanel: () => renderServiceSubPanel("화상회의", ["회의 예약", "개설된 회의", "회의 기록실"]),
    renderMain: () => renderPlaceholder("원격 화상회의", "국가 간 법인 및 원격 근무자를 위한 HD 화상 솔루션입니다.")
  },
  "#org": {
    title: "주소록 (조직도)",
    hasSubPanel: true,
    renderSubPanel: () => renderOrgSubPanel(),
    renderMain: () => renderOrgMain()
  },
  "#drive": {
    title: "드라이브",
    hasSubPanel: true,
    renderSubPanel: () => renderServiceSubPanel("드라이브", ["개인 드라이브", "공유 드라이브", "부서 드라이브", "최근 문서"]),
    renderMain: () => renderPlaceholder("클라우드 드라이브", "사내 보안 공유 스토리지입니다. AI 비서의 RAG 지식 검색 소스로 연동됩니다.")
  },
  "#project": {
    title: "프로젝트",
    hasSubPanel: true,
    renderSubPanel: () => renderServiceSubPanel("프로젝트", ["진행중인 프로젝트", "완료된 프로젝트", "대기/계약"]),
    renderMain: () => renderPlaceholder("프로젝트 현황", "수주/기획/수행/납품 단계별 전체 비즈니스 흐름을 추적합니다.")
  },
  "#ai": {
    title: "AI 어시스턴트",
    hasSubPanel: false,
    renderSubPanel: () => "",
    renderMain: () => renderAiMain()
  }
};

// 기본 플레이스홀더 렌더링
function renderPlaceholder(name, desc = "현재 해당 모듈은 v2 MVP 단계에서 구축 대기 중입니다.") {
  return `
    <div style="padding: 60px 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; background-color: var(--surface); border-radius: var(--radius); margin: 24px; box-shadow: var(--shadow);">
      <div style="width: 80px; height: 80px; border-radius: 50%; background-color: var(--theme-color-soft); display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: var(--theme-color);">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 12px; color: var(--text);">${name} 준비중</h2>
      <p style="color: var(--text-sub); font-size: 14px; max-width: 460px; line-height: 1.6;">${desc}</p>
    </div>
  `;
}

// 메시지 (채팅) 서브 패널
function renderChatSubPanel() {
  return `
    <div class="subpanel-header">
      <span class="subpanel-title">메시지 목록</span>
      <button class="btn btn-primary" style="padding: 6px 10px; font-size: 11px;" onclick="showToast('새 대화방 생성 예시입니다.')">+ 생성</button>
    </div>
    <div class="subpanel-search">
      <input type="search" class="subpanel-search-box" placeholder="이름, 대화방 검색...">
    </div>
    <div class="subpanel-body">
      <div class="list-item active" onclick="showToast('대화방 전환 예시')">
        <div class="list-item-avatar">D</div>
        <div class="list-item-content">
          <div class="list-item-top">
            <span class="list-item-title">개발지원 TF 단체방</span>
            <span class="list-item-time">오후 2:30</span>
          </div>
          <span class="list-item-preview">이성희: 도면 QC 검토 부탁드립니다.</span>
        </div>
      </div>
      <div class="list-item" onclick="showToast('대화방 전환 예시')">
        <div class="list-item-avatar">박</div>
        <div class="list-item-content">
          <div class="list-item-top">
            <span class="list-item-title">박용진 수석</span>
            <span class="list-item-time">어제</span>
          </div>
          <span class="list-item-preview">넵, 확인해 보고 말씀드리겠습니다.</span>
        </div>
      </div>
      <div class="list-item" onclick="showToast('대화방 전환 예시')">
        <div class="list-item-avatar">F</div>
        <div class="list-item-content">
          <div class="list-item-top">
            <span class="list-item-title">경영지원본부 공지방</span>
            <span class="list-item-time">6월 12일</span>
          </div>
          <span class="list-item-preview">[공지] 다음 주 주간회의 일정 안내</span>
        </div>
      </div>
    </div>
  `;
}

// 메시지 (채팅) 메인 본문
function renderChatMain() {
  return `
    <div class="main-header">
      <div class="main-header-left">
        <h2 style="font-size: 16px; font-weight: 800;">개발지원 TF 단체방</h2>
        <span class="badge blue">멤버 3</span>
      </div>
      <div class="main-header-right">
        <button class="btn btn-line" style="padding: 6px 12px;" onclick="showToast('화상회의 실행')">📹 화상회의</button>
        <button class="btn btn-line" style="padding: 6px 12px;" onclick="showToast('대화방 설정')">⚙️ 설정</button>
      </div>
    </div>
    
    <div class="main-viewport" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between; background-color: var(--bg);">
      <div style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;" id="chatMessageArea">
        <div class="chat-message-row">
          <div class="chat-avatar-circle">이</div>
          <div class="chat-message-content">
            <span class="chat-sender-name">이성희 파트장</span>
            <div class="chat-bubble-wrapper">
              <div class="chat-bubble bot">BIM 관련 파일 수주 자료실에 업로드했습니다.</div>
              <span class="chat-message-time">오후 2:15</span>
            </div>
          </div>
        </div>
        
        <div class="chat-message-row mine">
          <div class="chat-avatar-circle">유</div>
          <div class="chat-message-content">
            <div class="chat-bubble-wrapper">
              <div class="chat-bubble mine">감사합니다. 다운받아서 검토해 보겠습니다.</div>
              <span class="chat-message-time">오후 2:18</span>
            </div>
          </div>
        </div>
        
        <div class="chat-message-row">
          <div class="chat-avatar-circle">박</div>
          <div class="chat-message-content">
            <span class="chat-sender-name">박용진 수석</span>
            <div class="chat-bubble-wrapper">
              <div class="chat-bubble bot">넵, 저도 검증 체크리스트와 교차 확인 중입니다.</div>
              <span class="chat-message-time">오후 2:25</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 채팅 입력바 -->
      <div style="background-color: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 12px; margin-top: 16px;">
        <textarea style="width: 100%; height: 60px; border: none; resize: none; outline: none; background: transparent; color: var(--text); font-size: 13.5px;" placeholder="메시지를 입력하세요..."></textarea>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
          <div style="display: flex; gap: 8px; color: var(--text-sub);">
            <button style="background:none; border:none; cursor:pointer; color:inherit;">📎</button>
            <button style="background:none; border:none; cursor:pointer; color:inherit;">😀</button>
          </div>
          <button class="btn btn-primary" onclick="showToast('메시지 전송 예시')">전송</button>
        </div>
      </div>
    </div>
  `;
}

// 주소록 (조직도) 서브 패널
function renderOrgSubPanel() {
  return `
    <div class="subpanel-header">
      <span class="subpanel-title">주소록 트리</span>
    </div>
    <div class="subpanel-search">
      <input type="search" class="subpanel-search-box" id="orgSearchInput" placeholder="이름, 직급, 부서 검색...">
    </div>
    <div class="subpanel-body" style="padding: 16px 20px;" id="orgSubpanelTree">
      <!-- 조직도 관련 트리뷰가 렌더링될 영역 -->
      <div style="font-size: 12px; color: var(--text-sub); font-weight: 700;">부서 목록</div>
      <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 6px;" id="orgSubpanelDeptList">
        <!-- 동적 렌더링 처리 -->
      </div>
    </div>
  `;
}

// 주소록 (조직도) 메인
function renderOrgMain() {
  return `
    <div class="main-header">
      <div class="main-header-left">
        <h2 style="font-size: 16px; font-weight: 800;" id="orgChartMainTitle">조직도</h2>
      </div>
      <div class="main-header-right" id="orgChartCompanyTabs">
        <!-- 탭 구조 -->
      </div>
    </div>
    <div class="main-viewport" id="orgChartMainContent" style="padding: 24px;">
      <!-- 조직도 캔버스 또는 직원 목록 렌더링 -->
    </div>
  `;
}

// AI 어시스턴트 메인
function renderAiMain() {
  return `
    <div class="main-header">
      <div class="main-header-left">
        <h2 style="font-size: 16px; font-weight: 800;">AI 워크스페이스 비서</h2>
        <span class="badge red">Active (RAG)</span>
      </div>
    </div>
    
    <div class="main-viewport" style="padding: 24px; display: flex; flex-direction: column; background-color: var(--surface); max-width: 800px; margin: 24px auto; border-radius: var(--radius); border: 1px solid var(--border); box-shadow: var(--shadow); height: calc(100% - 48px);">
      <div style="flex: 1; overflow-y: auto; padding-right: 8px; display: flex; flex-direction: column; gap: 16px;" id="aiServiceMessageArea">
        <div class="chat-message-row">
          <div class="chat-avatar-circle">AI</div>
          <div class="chat-message-content" style="max-width: 80%;">
            <span class="chat-sender-name">CON-COST AI Assistant</span>
            <div class="chat-bubble-wrapper">
              <div class="chat-bubble bot" style="background-color: var(--bg);">
                안녕하세요, 유재우 실장님. 무엇을 도와드릴까요?
                <br><br>
                💡 **추천 질문 목록**:
                <br>• "BIM파트 박용진 수석의 이메일을 찾아줘"
                <br>• "베트남 Viet QS 법인의 CEO는 누구야?"
                <br>• "우리 회사의 현재 총 인원은 몇 명이야?"
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div style="border-top: 1px solid var(--border); padding-top: 16px; display: flex; gap: 8px;">
        <input type="text" class="ai-input" id="aiServiceInput" style="flex:1;" placeholder="AI 비서에게 질문을 남겨보세요..." onkeydown="if(event.key==='Enter') sendAiServiceMessage()">
        <button class="btn btn-primary" onclick="sendAiServiceMessage()">질문하기</button>
      </div>
    </div>
  `;
}

// 커스텀 서비스용 서브패널 생성
function renderServiceSubPanel(title, list) {
  return `
    <div class="subpanel-header">
      <span class="subpanel-title">${title}</span>
    </div>
    <div class="subpanel-body" style="padding: 16px 20px;">
      <ul style="list-style:none; display:flex; flex-direction:column; gap:12px;">
        ${list.map((item, idx) => `
          <li style="font-size:13.5px; font-weight:700; color:${idx === 0 ? "var(--theme-color)" : "var(--text)"}; cursor:pointer;" onclick="showToast('${item} 선택됨')">
            • ${item}
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}

function handleRouting() {
  const hash = location.hash || "#home";
  const route = routes[hash] || routes["#home"];

  // 1. 서브패널 렌더링 및 디스플레이 제어
  const subPanelEl = document.getElementById("appSubPanel");
  if (subPanelEl) {
    if (route.hasSubPanel) {
      subPanelEl.style.display = "flex";
      subPanelEl.innerHTML = route.renderSubPanel();
    } else {
      subPanelEl.style.display = "none";
    }
  }

  // 2. 메인 콘텐츠 렌더링
  const mainContentEl = document.getElementById("mainContent");
  if (mainContentEl) {
    mainContentEl.innerHTML = route.renderMain();
  }

  // 3. Dock 아이템 활성화 상태 업데이트
  document.querySelectorAll(".dock-item").forEach(item => {
    if (item.getAttribute("href") === hash) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // 4. 회사별 추가 연동 사항 트리거 (예: 조직도 화면의 경우 추가 렌더러 동작 유도)
  if (hash === "#org" && typeof window.initOrgChartModule === "function") {
    window.initOrgChartModule();
  }
}

function initRouter() {
  window.addEventListener("hashchange", handleRouting);
  handleRouting();
}

window.appRouter = {
  initRouter,
  routes
};
