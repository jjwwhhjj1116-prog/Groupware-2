// Groupware System v2 - SPA 서비스 라우터 및 UI 생성기 (router.js)

// 0. 메모리 데이터 저장소 (세션 동안 유지, 각 기능 간 데이터 바인딩 지원)
if (!window.worksData) {
  window.worksData = {
    mails: [
      { id: 1, email: 'yjpark@con-cost.com', sender: '박용진 수석', title: '[보고] 포항 AI Factory 2차 물량 검토의 건', content: 'BIM 데이터 취합 및 QC 검증서 파일 첨부하여 보고 올립니다. 세부사항은 첨부된 문서를 검증해 주시기 바랍니다.', time: '오후 3:20', size: '4.2 MB', read: false, attachment: true },
      { id: 2, email: 'ceo_vqs@vietqs.local', sender: '현동명 CEO', title: 'Re: 3분기 베트남 지사 QS 인력 투입 스케쥴 검토 건', content: '보내주신 스케쥴 안을 검토해 보았습니다. 인력 수급 상 내부 2팀 및 Vertical팀 조율이 추가로 필요할 것 같습니다.', time: '어제', size: '84 KB', read: false, attachment: false },
      { id: 3, email: 'hr@con-cost.com', sender: '경영지원본부', title: '[공지] 2026년 하반기 전사 워크숍 일정 조율의 건', content: '안녕하십니까 임직원 여러분, 올 하반기 양사 통합 워크숍을 베트남 다낭에서 개최하고자 하오니 세부 일정 선호 투표에 참여 바랍니다.', time: '06.12', size: '1.2 MB', read: true, attachment: true }
    ],
    calendars: [
      { id: 1, date: 5, title: 'QS 2.0 배포', style: 'background-color: var(--theme-color-soft); color: var(--theme-color);' },
      { id: 2, date: 12, title: '조직개편 발령', style: 'background:#EBF2FA; color:#1B4D8E;' },
      { id: 3, date: 15, title: 'BIM 1차 QC납품', style: 'background-color: var(--theme-color-soft); color: var(--theme-color);' },
      { id: 4, date: 17, title: 'VQS 화상 회의', style: 'background:#EAF8EA; color:#3AAB3A;' },
      { id: 5, date: 19, title: '경영보고 주간', style: 'background:#FDF2F2; color:#E03B3B;' },
      { id: 6, date: 30, title: '상반기 마감결산', style: 'background-color: var(--theme-color-soft); color: var(--theme-color);' }
    ],
    todos: [
      { id: 1, title: '베트남 지사 3분기 예산안 배정 수립', dept: '경영지원', due: 'D-7', status: 'todo' },
      { id: 2, title: 'QS 물량 산출 엔진 2.1 기술교육 개설', dept: 'QC', due: 'D-12', status: 'todo' },
      { id: 3, title: '포항 AI Factory 도면 물량 교차 QC 검증', dept: '개발지원 TF', due: 'D-Day', status: 'progress' },
      { id: 4, title: '경영진 간담회 슬라이드 및 보고서 작성', dept: '기획', due: 'D-4', status: 'progress' },
      { id: 5, title: 'BIM파트 주간 1차 도면 QC 납품', dept: 'BIM파트', due: '완료', status: 'done' }
    ],
    drives: [
      { id: 1, name: 'contract_park.pdf', desc: '근로계약서 양식', date: '2026.04.10', size: '1.2 MB', owner: '경영지원본부' },
      { id: 2, name: 'A-101_BIM_Structure.dwg', desc: '골조 구조 도면', date: '2026.06.14', size: '18.4 MB', owner: '이성희 파트장' },
      { id: 3, name: 'QS_Standard_Unit_Price_2026.xlsx', desc: '단가표', date: '2026.06.01', size: '4.2 MB', owner: '강동균 실장' }
    ],
    boards: [
      { id: 102, title: '[공지] 2026년 하반기 조직개편 안내 및 발령사항', content: '안녕하십니까, 경영지원본부입니다. 전사 조직 효율화를 위해 조직 개편 및 발령사항을 통보하오니 첨부된 발령 명단을 숙지하시기 바랍니다.', author: '경영지원본부', date: '2026.06.12', views: 142, isImportant: true },
      { id: 101, title: '[안내] 임직원 건강검진 예약 및 바우처 신청 절차', content: '금년도 정기 건강검진 기간이 개시되었습니다. 지정 병원 리스트와 바우처 신청 양식을 첨부하오니 기한 내 예약하시기 바랍니다.', author: '경영지원본부', date: '2026.06.10', views: 98, isImportant: false },
      { id: 100, title: '[공학] QS 물량 산출 엔진 2.0 매뉴얼 및 가이드 북 배포', content: 'QS 물량 산출 엔진 2.0 업그레이드에 따른 실무자 가이드 북과 단가 매핑 데이터 세트를 배포합니다.', author: '기술연구소', date: '2026.06.05', views: 210, isImportant: false }
    ],
    projects: [
      { code: 'PJ-2026-004', name: '포항 AI Factory 신축 공사 BIM 적산', company: 'CON-COST', status: '도면 QC 검토', pm: '박용진', pmEmpNo: 'EMP-2018-001', progress: 65, price: '4,500,000 원' },
      { code: 'PJ-2026-008', name: '호치민 하이테크 공단 공장 QS 적산', company: 'Viet QS', status: '최종 납품 승인 대기', pm: 'Van Dung', pmEmpNo: 'VQS-006', progress: 95, price: '8,200,000 원' },
      { code: 'PJ-2026-012', name: '하노이 IT 센터 구조 설계 피팅', company: 'Viet QS', status: '설계 물량 산출 중', pm: '이원희', pmEmpNo: 'VQS-002', progress: 30, price: '3,000,000 원' }
    ]
  };
}

const routes = {
  "#home": {
    title: "대시보드",
    hasSubPanel: false,
    renderSubPanel: () => "",
    renderMain: () => renderDashboardMain()
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
    renderSubPanel: () => renderServiceSubPanel("메일", ["받은 메일함", "보낸 메일함", "개인 메일함", "임시 보관함", "휴지통"]),
    renderMain: () => renderMailMain()
  },
  "#calendar": {
    title: "캘린더",
    hasSubPanel: true,
    renderSubPanel: () => renderServiceSubPanel("캘린더", ["내 캘린더", "회사 일정", "부서 일정", "설비 예약"]),
    renderMain: () => renderCalendarMain()
  },
  "#todo": {
    title: "할 일",
    hasSubPanel: true,
    renderSubPanel: () => renderServiceSubPanel("할 일", ["오늘 할 일", "대기중인 일", "완료된 일", "보낸 요청"]),
    renderMain: () => renderTodoMain()
  },
  "#board": {
    title: "게시판",
    hasSubPanel: true,
    renderSubPanel: () => renderServiceSubPanel("게시판", ["전사 공지사항", "자유게시판", "경영지원 소식", "QS 기술자료실"]),
    renderMain: () => renderBoardMain()
  },
  "#meet": {
    title: "화상회의",
    hasSubPanel: true,
    renderSubPanel: () => renderServiceSubPanel("화상회의", ["회의 예약", "개설된 회의", "회의 기록실"]),
    renderMain: () => renderMeetMain()
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
    renderMain: () => renderDriveMain()
  },
  "#project": {
    title: "프로젝트",
    hasSubPanel: true,
    renderSubPanel: () => renderServiceSubPanel("프로젝트", ["진행중인 프로젝트", "완료된 프로젝트", "대기/계약"]),
    renderMain: () => renderProjectMain()
  }
};

// 공통 서비스 서브패널 리스트 렌더링 헬퍼
function renderServiceSubPanel(serviceTitle, submenus) {
  const hash = location.hash;
  return `
    <div class="subpanel-header">
      <span class="subpanel-title" style="color:#FFFFFF;">${serviceTitle}</span>
    </div>
    <div class="subpanel-body" style="padding: 12px 0;">
      <ul class="subpanel-list">
        ${submenus.map((menu, idx) => `
          <li class="subpanel-item ${idx === 0 ? 'active' : ''}" onclick="showToast('${serviceTitle} - ${menu} 조회')">
            📁 ${menu}
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}

// ──────────────────────────────────────────────
// 1. 홈 (대시보드 위젯 그리드)
// ──────────────────────────────────────────────
function renderDashboardMain() {
  const empCount = window.employees ? window.employees.length : 66;
  const concostCount = window.employees ? window.employees.filter(e => e.company === "CON-COST").length : 33;
  const vietqsCount = window.employees ? window.employees.filter(e => e.company === "Viet QS").length : 33;

  return `
    <div class="dashboard-grid">
      <!-- 위젯 1: AI 출근길 브리핑 카드 (상단 와이드) -->
      <div class="widget-card widget-wide">
        <div class="widget-title" style="color: var(--theme-color);">
          🤖 AI Workspace Morning Briefing
        </div>
        <div style="display: flex; align-items: center; gap: 20px;">
          <div style="font-size: 36px;">🌅</div>
          <div>
            <h3 style="font-size: 16px; font-weight: 800; margin-bottom: 6px;">유종욱 실장님, 좋은 아침입니다!</h3>
            <p style="font-size: 13.5px; color: var(--text-sub); line-height: 1.6;">
              오늘 등록된 전사 협업 일정은 **${window.worksData.calendars.length}건**이며, 진행중인 업무 태스크 카드가 **${window.worksData.todos.filter(t => t.status === 'progress').length}건** 대기하고 있습니다. 
              최근 Viet QS 법인의 BIM 협업 드라이브에 **${window.worksData.drives.length}개**의 신규 도면 파일이 업로드되었습니다.
            </p>
          </div>
        </div>
      </div>

      <!-- 위젯 2: 안 읽은 메신저/메일 카운트 -->
      <div class="widget-card widget-small">
        <div class="widget-title">🔔 미확인 알림 상태</div>
        <div style="display: flex; justify-content: space-around; padding: 10px 0;">
          <div style="text-align: center; cursor: pointer;" onclick="location.hash='#chat'">
            <div style="font-size: 24px; margin-bottom: 6px;">💬</div>
            <strong style="font-size: 18px; color: var(--theme-color);">3 건</strong>
            <div style="font-size: 11px; color: var(--text-sub); margin-top: 4px;">새 메시지</div>
          </div>
          <div style="text-align: center; cursor: pointer;" onclick="location.hash='#mail'">
            <div style="font-size: 24px; margin-bottom: 6px;">📧</div>
            <strong style="font-size: 18px; color: var(--accent-blue);">${window.worksData.mails.filter(m => !m.read).length} 건</strong>
            <div style="font-size: 11px; color: var(--text-sub); margin-top: 4px;">읽지않은 메일</div>
          </div>
        </div>
      </div>

      <!-- 위젯 3: 오늘 할 일 + 마감 임박 (칸반 연동) -->
      <div class="widget-card widget-small">
        <div class="widget-title">✅ 오늘 할 일 목록</div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${window.worksData.todos.slice(0, 2).map(todo => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 10px; background: var(--bg); border-radius: 6px;">
              <span style="font-size: 12.5px; font-weight: 700;">• ${todo.title}</span>
              <span class="badge ${todo.due === 'D-Day' ? 'red' : 'yellow'}">${todo.due}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- 위젯 4: 우리 회사 현황 -->
      <div class="widget-card widget-small">
        <div class="widget-title">👥 우리 회사 임직원 현황</div>
        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12.5px; font-weight: 700;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-sub);">양사 총 임직원 수</span>
            <strong>${empCount} 명</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-sub);">CON-COST 본사</span>
            <strong>${concostCount} 명</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-sub);">Viet QS 지사</span>
            <strong>${vietqsCount} 명</strong>
          </div>
        </div>
      </div>

      <!-- 위젯 5: 이번 주 전사 일정 -->
      <div class="widget-card widget-mid">
        <div class="widget-title">📅 이번 주 전사 일정</div>
        <table style="width: 100%; font-size: 12.5px; border-collapse: collapse; font-weight: 700;">
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 10px 0; color: var(--brand-primary);">15일 (오늘)</td>
            <td>BIM파트 주간 1차 도면 QC 납품</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 10px 0; color: var(--text);">17일 (수)</td>
            <td>Viet QS Horizon/Foundation 공정 회의</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: var(--text-sub);">19일 (금)</td>
            <td>대표이사 주관 경영 보고 및 간담회</td>
          </tr>
        </table>
      </div>

      <!-- 위젯 6: 최근 공지사항 -->
      <div class="widget-card widget-mid">
        <div class="widget-title">📢 사내 주요 소식</div>
        <div style="display: flex; flex-direction: column; gap: 10px; font-size: 12.5px;">
          ${window.worksData.boards.slice(0, 3).map(post => `
            <div style="display: flex; justify-content: space-between; cursor: pointer;" onclick="location.hash='#board'">
              <span style="font-weight: 700; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:70%;">${post.title}</span>
              <span style="color: var(--text-sub);">${post.date.substring(5)}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

// ──────────────────────────────────────────────
// 2. 메시지 (채팅방)
// ──────────────────────────────────────────────
function renderChatSubPanel() {
  return `
    <div class="subpanel-header">
      <span class="subpanel-title">메시지 (채팅)</span>
      <button class="btn btn-primary" style="padding: 4px 8px; font-size: 11px;" onclick="showToast('대화방 생성')">+ 생성</button>
    </div>
    <div class="subpanel-search">
      <input type="search" class="subpanel-search-box" placeholder="채팅방, 멤버 이름 검색...">
    </div>
    <div class="subpanel-body">
      <div class="subpanel-section-title">그룹 대화방</div>
      <div class="list-item active" onclick="location.hash='#chat'">
        <div class="list-item-avatar" style="background-color: var(--theme-color);">D</div>
        <div class="list-item-content">
          <div class="list-item-top">
            <span class="list-item-title" style="color:var(--text);">개발지원 TF 단체방</span>
            <span class="list-item-time">오후 2:30</span>
          </div>
          <span class="list-item-preview" id="chatListPreview">박용진: 저도 교차 검증 중입니다.</span>
        </div>
      </div>
      
      <div class="subpanel-section-title">일대일 다이렉트 (DM)</div>
      <div class="list-item" onclick="showToast('박용진 수석과의 1:1 대화방 이동')">
        <div class="list-item-avatar" style="background-color: var(--accent-blue);">박</div>
        <div class="list-item-content">
          <div class="list-item-top">
            <span class="list-item-title">박용진 수석</span>
            <span class="list-item-time">어제</span>
          </div>
          <span class="list-item-preview">넵, 확인 후 보고서 전달하겠습니다.</span>
        </div>
      </div>
    </div>
  `;
}

function renderChatMain() {
  const currentOption = localStorage.getItem("chat_send_option") || "enter";

  return `
    <!-- 상단 채널 정보 및 핀 공지 -->
    <div class="main-header" style="height:auto; display:flex; flex-direction:column; padding:0;">
      <div style="display:flex; width:100%; height:54px; justify-content:space-between; align-items:center; padding:0 20px; border-bottom:1px solid var(--border);">
        <div class="main-header-left">
          <h2 style="font-size: 15.5px; font-weight: 800;" id="chatRoomTitle">💬 개발지원 TF 단체방</h2>
          <span class="badge blue" id="chatRoomMemberCount">멤버 3</span>
        </div>
        <div class="main-header-right">
          <button class="btn btn-line" style="padding: 5px 10px; font-size:12px;" onclick="showToast('채널 정보 조회')">ℹ️ 정보</button>
          <button class="btn btn-line" style="padding: 5px 10px; font-size:12px;" onclick="showToast('화상회의 예약 개설')">📹 화상회의 연동</button>
        </div>
      </div>
      
      <!-- 네이버웍스형 상단 공지사항 바 -->
      <div class="chat-pin-notice" id="chatPinNotice">
        <div style="display:flex; align-items:center; gap:8px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:90%;">
          <span class="chat-pin-icon">📌</span>
          <span style="font-size:12px; color:var(--text); font-weight:700;">[공지] 이번 주 금요일까지 포항 AI Factory 2차 피드백 도면 QC 제출 완료 요망</span>
        </div>
        <button style="background:none; border:none; color:var(--text-sub); font-size:15px; cursor:pointer;" onclick="document.getElementById('chatPinNotice').style.display='none'">&times;</button>
      </div>
    </div>
    
    <div class="main-viewport" style="padding: 20px; display: flex; flex-direction: column; justify-content: space-between; background-color: var(--bg);">
      
      <!-- 메시지 타임라인 영역 -->
      <div style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; padding-right: 6px;" id="chatMessageArea">
        
        <!-- 날짜 구분선 -->
        <div class="chat-date-divider">
          <span class="chat-date-chip">2026년 6월 15일 (월요일)</span>
        </div>

        <!-- 메시지 행: 이성희 파트장 -->
        <div class="chat-message-row" id="msg-row-1">
          <!-- 마우스오버 미니 리액션 바 -->
          <div class="chat-reaction-toolbar" onclick="event.stopPropagation()">
            <button class="reaction-btn" onclick="window.toggleMessageReaction('msg-row-1', '👍')">👍</button>
            <button class="reaction-btn" onclick="window.toggleMessageReaction('msg-row-1', '❤️')">❤️</button>
            <button class="reaction-btn" onclick="window.toggleMessageReaction('msg-row-1', '🔥')">🔥</button>
            <button class="reaction-btn" onclick="window.toggleMessageReaction('msg-row-1', '✅')">✅</button>
          </div>

          <div class="chat-avatar-circle" style="background-color: var(--accent-blue); color:white;">이</div>
          <div class="chat-message-content">
            <span class="chat-sender-name">이성희 파트장</span>
            <div class="chat-bubble-wrapper">
              <div class="chat-bubble bot" style="background-color: var(--surface);">
                BIM 관련 파일 수주 자료실에 업로드했습니다. 도면 검토 확인해 주세요.
                <!-- 네이버웍스 스타일 첨부파일 카드 -->
                <div class="chat-file-card" onclick="showToast('A-101_BIM_Structure.dwg 파일 다운로드를 시작합니다.')">
                  <div class="file-card-icon">📐</div>
                  <div class="file-card-info">
                    <span class="file-card-name">A-101_BIM_Structure.dwg</span>
                    <span class="file-card-size">골조 구조 도면 · 18.4 MB</span>
                  </div>
                  <button class="file-card-dl-btn" title="다운로드">&darr;</button>
                </div>
              </div>
              <span class="chat-message-time">오후 2:15</span>
            </div>
            
            <!-- 리액션 뱃지 리스트 -->
            <div class="reaction-badge-area" id="msg-row-1-reactions">
              <div class="reaction-badge active" onclick="window.toggleMessageReaction('msg-row-1', '👍')">👍 <span class="reaction-count">2</span></div>
              <div class="reaction-badge" onclick="window.toggleMessageReaction('msg-row-1', '🔥')">🔥 <span class="reaction-count">1</span></div>
            </div>
          </div>
        </div>
        
        <!-- 메시지 행: 나 (유종욱 실장) -->
        <div class="chat-message-row mine" id="msg-row-2">
          <div class="chat-reaction-toolbar" onclick="event.stopPropagation()">
            <button class="reaction-btn" onclick="window.toggleMessageReaction('msg-row-2', '👍')">👍</button>
            <button class="reaction-btn" onclick="window.toggleMessageReaction('msg-row-2', '❤️')">❤️</button>
            <button class="reaction-btn" onclick="window.toggleMessageReaction('msg-row-2', '🔥')">🔥</button>
            <button class="reaction-btn" onclick="window.toggleMessageReaction('msg-row-2', '✅')">✅</button>
          </div>

          <div class="chat-avatar-circle" style="background-color: var(--theme-color);">유</div>
          <div class="chat-message-content">
            <div class="chat-bubble-wrapper">
              <div class="chat-bubble mine">감사합니다. 다운받아서 검토해 보겠습니다.</div>
              <span class="chat-message-time">오후 2:18</span>
            </div>
            <div class="reaction-badge-area" id="msg-row-2-reactions"></div>
          </div>
        </div>
        
        <!-- 메시지 행: 박용진 수석 -->
        <div class="chat-message-row" id="msg-row-3">
          <div class="chat-reaction-toolbar" onclick="event.stopPropagation()">
            <button class="reaction-btn" onclick="window.toggleMessageReaction('msg-row-3', '👍')">👍</button>
            <button class="reaction-btn" onclick="window.toggleMessageReaction('msg-row-3', '❤️')">❤️</button>
            <button class="reaction-btn" onclick="window.toggleMessageReaction('msg-row-3', '🔥')">🔥</button>
            <button class="reaction-btn" onclick="window.toggleMessageReaction('msg-row-3', '✅')">✅</button>
          </div>

          <div class="chat-avatar-circle" style="background-color: var(--brand-primary); color:white;">박</div>
          <div class="chat-message-content">
            <span class="chat-sender-name">박용진 수석</span>
            <div class="chat-bubble-wrapper">
              <div class="chat-bubble bot" style="background-color: var(--surface);">네, 저도 검증 체크리스트와 교차 확인 중입니다.</div>
              <span class="chat-message-time">오후 2:25</span>
            </div>
            <div class="reaction-badge-area" id="msg-row-3-reactions">
              <div class="reaction-badge" onclick="window.toggleMessageReaction('msg-row-3', '✅')">✅ <span class="reaction-count">1</span></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 슬랙형 일체형 Rich Text 입력창 -->
      <div class="chat-editor-container">
        <!-- 1) 서식 툴바 -->
        <div class="chat-editor-toolbar">
          <button class="chat-editor-btn" title="굵게" onclick="window.insertFormatTag('**')">B</button>
          <button class="chat-editor-btn" title="기울임" onclick="window.insertFormatTag('*')">I</button>
          <button class="chat-editor-btn" title="취소선" onclick="window.insertFormatTag('~~')">S</button>
          <button class="chat-editor-btn" title="코드 블록" onclick="window.insertFormatTag('\`')">&lt;/&gt;</button>
        </div>
        
        <!-- 2) 텍스트 입력창 -->
        <div class="chat-editor-body">
          <textarea id="chatInputArea" style="width: 100%; height: 56px; border: none; resize: none; outline: none; background: transparent; color: var(--text); font-size: 13.5px; line-height: 1.5;" placeholder="메시지를 입력하세요..." onkeydown="window.handleChatKeyDown(event)"></textarea>
        </div>
        
        <!-- 3) 푸터 영역 (첨부/옵션/전송) -->
        <div class="chat-editor-footer">
          <div style="display: flex; gap: 4px;">
            <button class="chat-editor-btn" title="파일 첨부" onclick="showToast('컴퓨터에서 파일 업로드')">📎</button>
            <button class="chat-editor-btn" title="이모지 추가" onclick="showToast('이모지 선택창 열기')">😀</button>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <select id="chatSendOption" class="form-input" style="padding: 2px 6px; font-size: 11px; width: 120px; height: 26px; border-radius: 4px; border: 1px solid var(--border); background: var(--bg); cursor:pointer;" onchange="window.saveChatSendOption(this.value)">
              <option value="enter" ${currentOption === 'enter' ? 'selected' : ''}>Enter로 전송</option>
              <option value="ctrl" ${currentOption === 'ctrl' ? 'selected' : ''}>Ctrl+Enter로 전송</option>
            </select>
            <button class="btn btn-primary" style="padding: 5px 12px; font-size: 12px; border-radius: 4px;" onclick="window.sendChatMessage()">전송</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 전송 단축키 옵션 로컬 저장소 동화
window.saveChatSendOption = function(val) {
  localStorage.setItem("chat_send_option", val);
  showToast(`전송 방식이 [${val === 'enter' ? 'Enter' : 'Ctrl + Enter'}]로 변경되었습니다.`);
};

// 입력창 포맷 마커 자동 삽입 헬퍼
window.insertFormatTag = function(tag) {
  const textarea = document.getElementById("chatInputArea");
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;

  const selectedText = text.substring(start, end);
  const replacement = tag + selectedText + tag;

  textarea.value = text.substring(0, start) + replacement + text.substring(end);
  textarea.focus();
  textarea.selectionStart = start + tag.length;
  textarea.selectionEnd = start + tag.length + selectedText.length;
};

// 단축키 제어 키보드 리스너
window.handleChatKeyDown = function(event) {
  const option = localStorage.getItem("chat_send_option") || "enter";

  if (event.key === "Enter") {
    if (option === "enter") {
      if (!event.shiftKey) {
        event.preventDefault();
        window.sendChatMessage();
      }
    } else {
      if (event.ctrlKey) {
        event.preventDefault();
        window.sendChatMessage();
      }
    }
  }
};

// 메시지별 이모지 리액션 토글
window.toggleMessageReaction = function(rowId, emoji) {
  const area = document.getElementById(`${rowId}-reactions`);
  if (!area) return;

  // 기존 뱃지 중 매칭되는 이모지가 있는지 검색
  let found = false;
  const badges = area.querySelectorAll(".reaction-badge");
  
  badges.forEach(badge => {
    if (badge.textContent.includes(emoji)) {
      found = true;
      const countEl = badge.querySelector(".reaction-count");
      let count = parseInt(countEl.textContent);
      
      if (badge.classList.contains("active")) {
        badge.classList.remove("active");
        count--;
      } else {
        badge.classList.add("active");
        count++;
      }
      
      if (count <= 0) {
        badge.remove();
      } else {
        countEl.textContent = count;
      }
    }
  });

  if (!found) {
    const newBadge = document.createElement("div");
    newBadge.className = "reaction-badge active";
    newBadge.onclick = () => window.toggleMessageReaction(rowId, emoji);
    newBadge.innerHTML = `${emoji} <span class="reaction-count">1</span>`;
    area.appendChild(newBadge);
  }
};

window.sendChatMessage = function() {
  const textarea = document.getElementById("chatInputArea");
  if (!textarea) return;
  const text = textarea.value.trim();
  if (!text) return;

  const area = document.getElementById("chatMessageArea");
  const date = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  const rowId = `msg-row-${Date.now()}`;

  const html = `
    <div class="chat-message-row mine" id="${rowId}">
      <div class="chat-reaction-toolbar" onclick="event.stopPropagation()">
        <button class="reaction-btn" onclick="window.toggleMessageReaction('${rowId}', '👍')">👍</button>
        <button class="reaction-btn" onclick="window.toggleMessageReaction('${rowId}', '❤️')">❤️</button>
        <button class="reaction-btn" onclick="window.toggleMessageReaction('${rowId}', '🔥')">🔥</button>
        <button class="reaction-btn" onclick="window.toggleMessageReaction('${rowId}', '✅')">✅</button>
      </div>

      <div class="chat-avatar-circle" style="background-color: var(--theme-color);">유</div>
      <div class="chat-message-content">
        <div class="chat-bubble-wrapper">
          <div class="chat-bubble mine">${text}</div>
          <span class="chat-message-time">${date}</span>
        </div>
        <div class="reaction-badge-area" id="${rowId}-reactions"></div>
      </div>
    </div>
  `;
  
  area.insertAdjacentHTML('beforeend', html);
  textarea.value = "";
  area.scrollTop = area.scrollHeight;

  // LNB 서브패널 프리뷰 실시간 동기화
  const preview = document.getElementById("chatListPreview");
  if (preview) preview.textContent = `나: ${text}`;
};

// ──────────────────────────────────────────────
// 3. 메일 (체크박스 툴바 + 작성 모달)
// ──────────────────────────────────────────────
function renderMailMain() {
  const mailList = window.worksData.mails;

  return `
    <div class="main-header">
      <div class="main-header-left">
        <h2 style="font-size: 16px; font-weight: 800;">받은 메일함</h2>
        <span class="badge blue" id="mailUnreadBadge">${mailList.filter(m => !m.read).length} 건 안읽음</span>
      </div>
      <div class="main-header-right">
        <!-- 체크박스 액션 툴바 (기본 비활성) -->
        <div id="mailActionToolbar" style="display:none; align-items:center; gap:8px; margin-right:12px; border-right:1px solid var(--border); padding-right:12px;">
          <button class="btn btn-danger" style="padding:4px 8px; font-size:12px;" onclick="deleteSelectedMails()">선택 삭제</button>
          <button class="btn btn-line" style="padding:4px 8px; font-size:12px;" onclick="markSelectedMailsRead()">읽음 처리</button>
        </div>
        <button class="btn btn-primary" onclick="openMailWriteModal()">📝 메일 쓰기</button>
      </div>
    </div>
    
    <div class="table-container">
      <table class="works-table">
        <thead>
          <tr>
            <th style="width: 40px; text-align: center;"><input type="checkbox" id="mailHeaderCheckbox" onclick="toggleAllMailCheckboxes(this)"></th>
            <th>보낸 사람</th>
            <th>제목</th>
            <th>날짜</th>
            <th>크기</th>
          </tr>
        </thead>
        <tbody id="mailTableBody">
          ${mailList.map(mail => `
            <tr id="mail-row-${mail.id}">
              <td style="text-align: center;" onclick="event.stopPropagation()">
                <input type="checkbox" class="mail-item-checkbox" data-mail-id="${mail.id}" onclick="onMailCheckboxClick()">
              </td>
              <td onclick="openMailDetail('${mail.email}', '${mail.sender}', '${mail.title}', '${mail.content}', '${mail.time}')">
                <strong style="${mail.read ? 'font-weight:normal; color:var(--text-sub);' : ''}">${mail.sender}</strong>
              </td>
              <td onclick="openMailDetail('${mail.email}', '${mail.sender}', '${mail.title}', '${mail.content}', '${mail.time}')">
                <span style="${mail.read ? 'font-weight:normal; color:var(--text-sub);' : 'font-weight:bold;'}">${mail.title}</span>
                ${mail.attachment ? `<span class="badge blue" style="margin-left:6px; font-size:9.5px; padding:1px 4px;">첨부</span>` : ''}
              </td>
              <td onclick="openMailDetail('${mail.email}', '${mail.sender}', '${mail.title}', '${mail.content}', '${mail.time}')">${mail.time}</td>
              <td onclick="openMailDetail('${mail.email}', '${mail.sender}', '${mail.title}', '${mail.content}', '${mail.time}')">${mail.size}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <!-- 메일 작성 모달 -->
    <div class="modal-backdrop" id="mailWriteModal">
      <div class="modal" style="width: 580px;">
        <div class="modal-head">
          <h2>📝 메일 보내기</h2>
          <button class="close" onclick="closeMailWriteModal()">&times;</button>
        </div>
        <div class="modal-body" style="display:flex; flex-direction:column; gap:12px;">
          <div class="form-field">
            <label>받는 사람</label>
            <input type="email" id="mailWriteTo" class="form-input" placeholder="수신인 이메일 주소를 입력하세요" value="yjpark@con-cost.com">
          </div>
          <div class="form-field">
            <label>제목</label>
            <input type="text" id="mailWriteTitle" class="form-input" placeholder="메일 제목을 입력하세요">
          </div>
          <div class="form-field">
            <label>내용</label>
            <textarea id="mailWriteContent" class="form-input" style="height:150px; resize:none;" placeholder="메일 내용을 작성해 주세요"></textarea>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:8px;">
            <button class="btn btn-line" onclick="closeMailWriteModal()">취소</button>
            <button class="btn btn-primary" onclick="sendMailSimulate()">보내기</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 메일 상세 보기 모달 백드롭 -->
    <div class="modal-backdrop" id="mailDetailModal">
      <div class="modal" style="width: 600px;">
        <div class="modal-head">
          <h2 id="mailDetailTitle">메일 상세 보기</h2>
          <button class="close" onclick="closeMailDetail()">&times;</button>
        </div>
        <div class="modal-body" style="display: flex; flex-direction: column; gap: 16px;">
          <div style="border-bottom: 1px solid var(--border); padding-bottom: 12px;">
            <div style="font-size: 13px; margin-bottom: 6px;"><strong>발신자:</strong> <span id="mailDetailSender">보낸이</span></div>
            <div style="font-size: 13px;"><strong>수신 시간:</strong> <span id="mailDetailTime">시간</span></div>
          </div>
          <div style="font-size: 14px; line-height: 1.6; min-height: 200px; white-space: pre-wrap; color: var(--text);" id="mailDetailContent">
            메일 본문 내용이 출력됩니다.
          </div>
          <div class="notice">
            🔒 본 메일은 CON-COST Works 보안 규정을 따릅니다. 무단 복제 및 전재를 금합니다.
          </div>
        </div>
      </div>
    </div>
  `;
}

window.openMailWriteModal = function() {
  const modal = document.getElementById("mailWriteModal");
  if (!modal) return;
  document.getElementById("mailWriteTitle").value = "";
  document.getElementById("mailWriteContent").value = "";
  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("active"), 10);
};

window.closeMailWriteModal = function() {
  const modal = document.getElementById("mailWriteModal");
  if (modal) {
    modal.classList.remove("active");
    setTimeout(() => { modal.style.display = "none"; }, 200);
  }
};

window.sendMailSimulate = function() {
  const to = document.getElementById("mailWriteTo").value.trim();
  const title = document.getElementById("mailWriteTitle").value.trim();
  const content = document.getElementById("mailWriteContent").value.trim();

  if (!to || !title || !content) {
    alert("모든 필드를 입력하세요.");
    return;
  }

  // 메모리 데이터에 메일 추가 (보낸 메일함 및 시뮬레이터)
  const newMail = {
    id: Date.now(),
    email: to,
    sender: "나 (유종욱 실장)",
    title: `[발송 완료] ${title}`,
    content: content,
    time: "방금 전",
    size: "12 KB",
    read: true,
    attachment: false
  };

  window.worksData.mails.unshift(newMail);
  closeMailWriteModal();
  showToast("메일이 성공적으로 전송되었습니다.");
  
  // 메일 화면 갱신
  handleRouting();
};

window.toggleAllMailCheckboxes = function(master) {
  const checkboxes = document.querySelectorAll(".mail-item-checkbox");
  checkboxes.forEach(cb => cb.checked = master.checked);
  updateMailToolbarState();
};

window.onMailCheckboxClick = function() {
  updateMailToolbarState();
};

function updateMailToolbarState() {
  const checked = document.querySelectorAll(".mail-item-checkbox:checked");
  const toolbar = document.getElementById("mailActionToolbar");
  if (!toolbar) return;
  
  if (checked.length > 0) {
    toolbar.style.display = "flex";
  } else {
    toolbar.style.display = "none";
  }
}

window.deleteSelectedMails = function() {
  const checked = document.querySelectorAll(".mail-item-checkbox:checked");
  const ids = Array.from(checked).map(cb => parseInt(cb.dataset.mailId));
  
  window.worksData.mails = window.worksData.mails.filter(m => !ids.includes(m.id));
  showToast(`${checked.length}건의 메일이 삭제되었습니다.`);
  handleRouting();
};

window.markSelectedMailsRead = function() {
  const checked = document.querySelectorAll(".mail-item-checkbox:checked");
  const ids = Array.from(checked).map(cb => parseInt(cb.dataset.mailId));

  window.worksData.mails.forEach(m => {
    if (ids.includes(m.id)) m.read = true;
  });
  showToast(`${checked.length}건의 메일을 읽음 처리했습니다.`);
  handleRouting();
};

window.openMailDetail = function(email, sender, title, content, time) {
  const modal = document.getElementById("mailDetailModal");
  if (!modal) return;
  
  document.getElementById("mailDetailTitle").textContent = title;
  document.getElementById("mailDetailSender").textContent = `${sender} (${email})`;
  document.getElementById("mailDetailTime").textContent = time;
  document.getElementById("mailDetailContent").textContent = content;

  // 읽음 처리 동기화
  const matched = window.worksData.mails.find(m => m.title === title);
  if (matched) matched.read = true;

  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("active"), 10);
};

window.closeMailDetail = function() {
  const modal = document.getElementById("mailDetailModal");
  if (modal) {
    modal.classList.remove("active");
    setTimeout(() => { 
      modal.style.display = "none";
      handleRouting();
    }, 200);
  }
};

// ──────────────────────────────────────────────
// 4. 캘린더 (스케쥴 그리드 + 등록 모달 + 상세)
// ──────────────────────────────────────────────
function renderCalendarMain() {
  const events = window.worksData.calendars;
  
  return `
    <div class="main-header">
      <div class="main-header-left">
        <h2 style="font-size: 16px; font-weight: 800;">2026년 6월</h2>
      </div>
      <div class="main-header-right">
        <button class="btn btn-primary" onclick="openCalendarAddModal()">+ 일정 추가</button>
      </div>
    </div>
    
    <div class="calendar-container">
      <div class="calendar-header">
        <div>일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div>토</div>
      </div>
      <div class="calendar-grid" id="calendarGrid">
        <!-- 동적 캘린더 드로잉 (35칸) -->
        ${generateCalendarCells(events)}
      </div>
    </div>

    <!-- 일정 등록 모달 -->
    <div class="modal-backdrop" id="calendarAddModal">
      <div class="modal" style="width: 440px;">
        <div class="modal-head">
          <h2>📅 새 일정 등록</h2>
          <button class="close" onclick="closeCalendarAddModal()">&times;</button>
        </div>
        <div class="modal-body" style="display:flex; flex-direction:column; gap:12px;">
          <div class="form-field">
            <label>일정 제목</label>
            <input type="text" id="calEventTitle" class="form-input" placeholder="일정명을 입력하세요">
          </div>
          <div class="form-field">
            <label>날짜 (6월)</label>
            <input type="number" id="calEventDay" class="form-input" min="1" max="30" value="15">
          </div>
          <div class="form-field">
            <label>일정 분류 테마</label>
            <select id="calEventTheme" class="form-input">
              <option value="brand">CON-COST (오렌지)</option>
              <option value="blue">Viet QS (블루)</option>
              <option value="green">중요 협업 (초록)</option>
              <option value="danger">마감/경영 (빨강)</option>
            </select>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:8px;">
            <button class="btn btn-line" onclick="closeCalendarAddModal()">취소</button>
            <button class="btn btn-primary" onclick="saveCalendarEvent()">일정 저장</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function generateCalendarCells(events) {
  let html = "";
  // 6월 시작요일: 월요일 (이전 달 31일 배치)
  // 1주차 첫 칸: 5월 31일 (이전달)
  html += `<div class="calendar-cell other-month"><span class="calendar-date-num">31</span></div>`;

  // 1일부터 30일까지 드로잉
  for (let i = 1; i <= 30; i++) {
    const matchedEvents = events.filter(e => e.date === i);
    const isToday = i === 15;
    
    html += `
      <div class="calendar-cell" style="${isToday ? 'background-color: var(--theme-color-soft); border: 2px solid var(--theme-color);' : ''}">
        <span class="calendar-date-num">${i}${isToday ? ' (오늘)' : ''}</span>
        ${matchedEvents.map(evt => `
          <div class="calendar-event" style="${evt.style || 'background-color: var(--theme-color-soft); color: var(--theme-color);'}" onclick="event.stopPropagation(); deleteCalendarEvent(${evt.id})">
            ${evt.title} &times;
          </div>
        `).join("")}
      </div>
    `;
  }

  // 7월 칸 채우기 (4칸 더 채워서 35칸 만들기)
  for (let j = 1; j <= 4; j++) {
    html += `<div class="calendar-cell other-month"><span class="calendar-date-num">${j}</span></div>`;
  }

  return html;
}

window.openCalendarAddModal = function() {
  const modal = document.getElementById("calendarAddModal");
  if (!modal) return;
  document.getElementById("calEventTitle").value = "";
  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("active"), 10);
};

window.closeCalendarAddModal = function() {
  const modal = document.getElementById("calendarAddModal");
  if (modal) {
    modal.classList.remove("active");
    setTimeout(() => { modal.style.display = "none"; }, 200);
  }
};

window.saveCalendarEvent = function() {
  const title = document.getElementById("calEventTitle").value.trim();
  const day = parseInt(document.getElementById("calEventDay").value);
  const theme = document.getElementById("calEventTheme").value;

  if (!title || isNaN(day) || day < 1 || day > 30) {
    alert("올바른 일정 정보와 날짜(1~30)를 입력하세요.");
    return;
  }

  let styleStr = "background-color: var(--theme-color-soft); color: var(--theme-color);";
  if (theme === "blue") styleStr = "background:#EBF2FA; color:#1B4D8E;";
  else if (theme === "green") styleStr = "background:#EAF8EA; color:#3AAB3A;";
  else if (theme === "danger") styleStr = "background:#FDF2F2; color:#E03B3B;";

  const newEvent = {
    id: Date.now(),
    date: day,
    title: title,
    style: styleStr
  };

  window.worksData.calendars.push(newEvent);
  closeCalendarAddModal();
  showToast(`6월 ${day}일에 새로운 일정이 추가되었습니다.`);
  handleRouting();
};

window.deleteCalendarEvent = function(id) {
  if (confirm("이 일정을 삭제하시겠습니까?")) {
    window.worksData.calendars = window.worksData.calendars.filter(e => e.id !== id);
    showToast("일정이 삭제되었습니다.");
    handleRouting();
  }
};

// ──────────────────────────────────────────────
// 5. 할 일 (칸반 보드 + 상태 전이 숏컷)
// ──────────────────────────────────────────────
function renderTodoMain() {
  const todoList = window.worksData.todos;

  return `
    <div class="main-header">
      <div class="main-header-left">
        <h2 style="font-size: 16px; font-weight: 800;">협업 업무 칸반 보드</h2>
      </div>
      <div class="main-header-right">
        <button class="btn btn-primary" onclick="promptCreateTodo()">+ 할 일 추가</button>
      </div>
    </div>
    
    <div class="kanban-board">
      <!-- 컬럼 1: 할 일 -->
      <div class="kanban-column">
        <div class="kanban-column-header">
          <strong>할 일 (To Do)</strong>
          <span class="badge gray">${todoList.filter(t => t.status === 'todo').length}</span>
        </div>
        <div class="kanban-card-list">
          ${renderKanbanColumnCards(todoList, 'todo')}
        </div>
      </div>

      <!-- 컬럼 2: 진행 중 -->
      <div class="kanban-column">
        <div class="kanban-column-header">
          <strong>진행 중 (In Progress)</strong>
          <span class="badge blue">${todoList.filter(t => t.status === 'progress').length}</span>
        </div>
        <div class="kanban-card-list">
          ${renderKanbanColumnCards(todoList, 'progress')}
        </div>
      </div>

      <!-- 컬럼 3: 완료 -->
      <div class="kanban-column">
        <div class="kanban-column-header">
          <strong>완료 (Done)</strong>
          <span class="badge green">${todoList.filter(t => t.status === 'done').length}</span>
        </div>
        <div class="kanban-card-list">
          ${renderKanbanColumnCards(todoList, 'done')}
        </div>
      </div>
    </div>
  `;
}

function renderKanbanColumnCards(todoList, colStatus) {
  const filtered = todoList.filter(t => t.status === colStatus);
  if (filtered.length === 0) {
    return `<div style="text-align:center; padding:20px; font-size:11.5px; color:var(--text-sub); border:1px dashed var(--border); border-radius:6px;">업무가 없습니다</div>`;
  }

  return filtered.map(todo => `
    <div class="kanban-card" style="${todo.status === 'done' ? 'opacity:0.6;' : ''}">
      <div class="kanban-card-title">${todo.title}</div>
      <div class="kanban-card-meta">
        <span class="badge gray">${todo.dept}</span>
        <span style="font-weight:bold; color:${todo.due === 'D-Day' ? 'var(--danger)' : 'var(--text-sub)'}">${todo.due}</span>
      </div>
      
      <!-- 상태 전환 조작 숏컷 영역 -->
      <div style="display:flex; justify-content:flex-end; gap:4px; margin-top:10px; border-top:1px solid rgba(0,0,0,0.05); padding-top:8px;">
        ${colStatus !== 'todo' ? `<button class="btn" style="padding:2px 6px; font-size:9.5px;" onclick="moveTodoState(${todo.id}, 'todo')">◀ 할일</button>` : ''}
        ${colStatus !== 'progress' ? `<button class="btn btn-primary" style="padding:2px 6px; font-size:9.5px;" onclick="moveTodoState(${todo.id}, 'progress')">진행 ▶</button>` : ''}
        ${colStatus !== 'done' ? `<button class="btn btn-danger" style="padding:2px 6px; font-size:9.5px; background:var(--accent-green-soft); border-color:var(--accent-green); color:var(--accent-green);" onclick="moveTodoState(${todo.id}, 'done')">완료 ✔</button>` : ''}
      </div>
    </div>
  `).join("");
}

window.promptCreateTodo = function() {
  const title = prompt("추가할 업무 내용을 입력하세요:");
  if (!title) return;
  const dept = prompt("담당 부서를 입력하세요:", "개발지원 TF");
  if (!dept) return;

  const newTodo = {
    id: Date.now(),
    title: title,
    dept: dept,
    due: 'D-5',
    status: 'todo'
  };

  window.worksData.todos.push(newTodo);
  showToast("새로운 업무 카드가 생성되었습니다.");
  handleRouting();
};

window.moveTodoState = function(id, nextState) {
  const item = window.worksData.todos.find(t => t.id === id);
  if (item) {
    item.status = nextState;
    if (nextState === 'done') item.due = '완료';
    else if (item.due === '완료') item.due = 'D-3'; // 원상 복구 시 더미 기한
    showToast("업무 진행 상태가 전환되었습니다.");
    handleRouting();
  }
};

// ──────────────────────────────────────────────
// 6. 게시판 (게시글 동적 작성)
// ──────────────────────────────────────────────
function renderBoardMain() {
  const boardList = window.worksData.boards;

  return `
    <div class="main-header">
      <div class="main-header-left">
        <h2 style="font-size: 16px; font-weight: 800;">사내 공지사항</h2>
      </div>
      <div class="main-header-right">
        <button class="btn btn-primary" onclick="openBoardWriteModal()">✍️ 글쓰기</button>
      </div>
    </div>
    
    <div class="table-container">
      <table class="works-table">
        <thead>
          <tr>
            <th style="width: 60px;">번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          ${boardList.map(post => `
            <tr onclick="openBoardDetail('${post.title}', '${post.content.replace(/'/g, "\\'")}', '${post.author}', '${post.date}', ${post.views})">
              <td>${post.id}</td>
              <td>
                <strong>${post.title}</strong> 
                ${post.isImportant ? `<span class="badge red" style="margin-left:6px;">중요</span>` : ''}
              </td>
              <td>${post.author}</td>
              <td>${post.date}</td>
              <td>${post.views}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <!-- 게시글 작성 모달 -->
    <div class="modal-backdrop" id="boardWriteModal">
      <div class="modal" style="width: 520px;">
        <div class="modal-head">
          <h2>✍️ 게시글 작성</h2>
          <button class="close" onclick="closeBoardWriteModal()">&times;</button>
        </div>
        <div class="modal-body" style="display:flex; flex-direction:column; gap:12px;">
          <div class="form-field">
            <label>제목</label>
            <input type="text" id="boardWriteTitle" class="form-input" placeholder="공지 제목을 입력하세요">
          </div>
          <div class="form-field">
            <label>본문 내용</label>
            <textarea id="boardWriteContent" class="form-input" style="height:140px; resize:none;" placeholder="내용을 입력하세요"></textarea>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="checkbox" id="boardWriteImportant">
            <label for="boardWriteImportant" style="font-size:12px; font-weight:bold; cursor:pointer;">이 공지를 중요(공지상단)로 표시</label>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:8px;">
            <button class="btn btn-line" onclick="closeBoardWriteModal()">취소</button>
            <button class="btn btn-primary" onclick="saveBoardPost()">등록</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 게시글 상세 보기 모달 백드롭 -->
    <div class="modal-backdrop" id="boardDetailModal">
      <div class="modal" style="width: 580px;">
        <div class="modal-head">
          <h2 id="boardDetailTitle">게시판 상세 보기</h2>
          <button class="close" onclick="closeBoardDetail()">&times;</button>
        </div>
        <div class="modal-body" style="display: flex; flex-direction: column; gap: 16px;">
          <div style="border-bottom: 1px solid var(--border); padding-bottom: 10px; display: flex; justify-content: space-between; font-size: 12.5px; color: var(--text-sub);">
            <div><strong>작성자:</strong> <span id="boardDetailAuthor">작성자</span></div>
            <div><strong>등록일:</strong> <span id="boardDetailDate">등록일</span></div>
          </div>
          <div style="font-size: 13.5px; line-height: 1.6; min-height: 180px; white-space: pre-wrap; color: var(--text);" id="boardDetailContent">
            본문 내용이 출력됩니다.
          </div>
        </div>
      </div>
    </div>
  `;
}

window.openBoardWriteModal = function() {
  const modal = document.getElementById("boardWriteModal");
  if (!modal) return;
  document.getElementById("boardWriteTitle").value = "";
  document.getElementById("boardWriteContent").value = "";
  document.getElementById("boardWriteImportant").checked = false;
  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("active"), 10);
};

window.closeBoardWriteModal = function() {
  const modal = document.getElementById("boardWriteModal");
  if (modal) {
    modal.classList.remove("active");
    setTimeout(() => { modal.style.display = "none"; }, 200);
  }
};

window.saveBoardPost = function() {
  const title = document.getElementById("boardWriteTitle").value.trim();
  const content = document.getElementById("boardWriteContent").value.trim();
  const isImportant = document.getElementById("boardWriteImportant").checked;

  if (!title || !content) {
    alert("제목과 본문을 채워주세요.");
    return;
  }

  const dateStr = new Date().toISOString().substring(0, 10).replace(/-/g, ".");
  const maxId = window.worksData.boards.reduce((max, p) => p.id > max ? p.id : max, 100);

  const newPost = {
    id: maxId + 1,
    title: title,
    content: content,
    author: "유종욱 실장",
    date: dateStr,
    views: 0,
    isImportant: isImportant
  };

  window.worksData.boards.unshift(newPost);
  closeBoardWriteModal();
  showToast("새로운 공지물이 등록되었습니다.");
  handleRouting();
};

window.openBoardDetail = function(title, content, author, date, views) {
  const modal = document.getElementById("boardDetailModal");
  if (!modal) return;

  document.getElementById("boardDetailTitle").textContent = title;
  document.getElementById("boardDetailAuthor").textContent = author;
  document.getElementById("boardDetailDate").textContent = date;
  document.getElementById("boardDetailContent").textContent = content;

  // 조회수 1회성 카운터 갱신
  const matched = window.worksData.boards.find(p => p.title === title);
  if (matched && matched.views === views) matched.views++;

  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("active"), 10);
};

window.closeBoardDetail = function() {
  const modal = document.getElementById("boardDetailModal");
  if (modal) {
    modal.classList.remove("active");
    setTimeout(() => { 
      modal.style.display = "none";
      handleRouting();
    }, 200);
  }
};

// ──────────────────────────────────────────────
// 7. 화상회의 (개설 대기실)
// ──────────────────────────────────────────────
function renderMeetMain() {
  return `
    <div class="main-header">
      <div class="main-header-left">
        <h2 style="font-size: 16px; font-weight: 800;">원격 화상회의 솔루션</h2>
      </div>
      <div class="main-header-right">
        <button class="btn btn-primary" onclick="showToast('새 회의방 즉시 개설')">📹 즉시 회의 개설</button>
      </div>
    </div>
    
    <div style="padding: 24px; display: flex; flex-direction: column; gap: 20px;">
      <!-- 진행 중인 회의 카드 -->
      <div class="card">
        <h3 style="font-size: 14.5px; font-weight: 800; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background-color:var(--danger);"></span>
          실시간 진행 중인 화상회의
        </h3>
        <div style="display: flex; justify-content: space-between; align-items: center; background-color: var(--bg); padding: 14px 18px; border-radius: var(--radius);">
          <div>
            <strong style="font-size: 14px; display:block; margin-bottom: 4px;">[BIM] 한-베 BIM 용역 물량 산출 교차 검토 회의</strong>
            <span style="font-size: 11.5px; color: var(--text-sub);">발설인: 이성희 파트장 · 참가자 5명 참여 중</span>
          </div>
          <button class="btn btn-primary" onclick="showToast('화상회의방 참여')">참여하기</button>
        </div>
      </div>

      <!-- 예약된 회의 리스트 -->
      <div class="card">
        <h3 style="font-size: 14.5px; font-weight: 800; margin-bottom: 12px;">오늘 예약된 화상회의</h3>
        <table class="works-table" style="box-shadow:none; border: 1px solid var(--border); border-radius: 6px;">
          <thead>
            <tr><th>시간</th><th>회의 주제</th><th>예약자</th><th>상태</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>16:00 - 17:00</td>
              <td>Viet QS Vertical팀 주간 실무 회의</td>
              <td>프엉 Staff</td>
              <td><span class="badge blue">대기</span></td>
            </tr>
            <tr>
              <td>17:30 - 18:30</td>
              <td>하반기 비용 정산 및 경비 지출 예산 조율</td>
              <td>강동균 실장</td>
              <td><span class="badge blue">대기</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ──────────────────────────────────────────────
// 8. 주소록 (조직도, 트리 렌더러 분리 바인딩)
// ──────────────────────────────────────────────
function renderOrgSubPanel() {
  return `
    <div class="subpanel-header">
      <span class="subpanel-title" style="color:#FFFFFF;">주소록 (조직도)</span>
    </div>
    <div class="subpanel-search">
      <input type="search" class="subpanel-search-box" id="orgSearchInput" placeholder="이름, 직급, 부서 검색...">
    </div>
    <div class="subpanel-body" style="padding: 12px;" id="orgSubpanelTree">
      <div style="font-size: 11px; font-weight: 800; color: rgba(255,255,255,0.4); padding-left: 8px; margin-bottom: 8px;">부서 목록</div>
      <div style="display: flex; flex-direction: column; gap: 2px;" id="orgSubpanelDeptList">
        <!-- org-chart.js 모듈에서 렌더링 -->
      </div>
    </div>
  `;
}

function renderOrgMain() {
  return `
    <div class="main-header">
      <div class="main-header-left">
        <h2 style="font-size: 16px; font-weight: 800;" id="orgChartMainTitle">조직도</h2>
      </div>
      <div class="main-header-right" id="orgChartCompanyTabs">
        <!-- org-chart.js 모듈에서 렌더링 -->
      </div>
    </div>
    <div class="main-viewport" id="orgChartMainContent" style="padding: 24px;">
      <!-- org-chart.js 모듈에서 트리 구조 렌더링 -->
    </div>
  `;
}

// ──────────────────────────────────────────────
// 9. 드라이브 (동적 파일 업로드)
// ──────────────────────────────────────────────
function renderDriveMain() {
  const fileList = window.worksData.drives;

  return `
    <div class="main-header">
      <div class="main-header-left">
        <h2 style="font-size: 16px; font-weight: 800;">공유 드라이브 / BIM 수주자료실</h2>
      </div>
      <div class="main-header-right">
        <button class="btn btn-primary" onclick="openFileUploadModal()">📤 파일 업로드</button>
      </div>
    </div>
    
    <div class="table-container">
      <table class="works-table">
        <thead>
          <tr>
            <th>파일명</th>
            <th>수정일</th>
            <th>크기</th>
            <th>소유자</th>
          </tr>
        </thead>
        <tbody>
          ${fileList.map(file => `
            <tr onclick="showToast('${file.name} 다운로드를 시작합니다.')">
              <td>📄 <strong>${file.name}</strong> (${file.desc})</td>
              <td>${file.date}</td>
              <td>${file.size}</td>
              <td>${file.owner}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <!-- 파일 업로드 모달 -->
    <div class="modal-backdrop" id="fileUploadModal">
      <div class="modal" style="width: 440px;">
        <div class="modal-head">
          <h2>📤 드라이브 파일 업로드</h2>
          <button class="close" onclick="closeFileUploadModal()">&times;</button>
        </div>
        <div class="modal-body" style="display:flex; flex-direction:column; gap:12px;">
          <div class="form-field">
            <label>파일명 (확장자 포함)</label>
            <input type="text" id="uploadFileName" class="form-input" placeholder="예: structure_blueprint.dwg">
          </div>
          <div class="form-field">
            <label>파일 설명</label>
            <input type="text" id="uploadFileDesc" class="form-input" placeholder="예: 3층 골조 도면 설계본">
          </div>
          <div class="form-field">
            <label>파일 크기</label>
            <input type="text" id="uploadFileSize" class="form-input" value="2.4 MB">
          </div>
          <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:8px;">
            <button class="btn btn-line" onclick="closeFileUploadModal()">취소</button>
            <button class="btn btn-primary" onclick="simulateFileUpload()">파일 추가</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

window.openFileUploadModal = function() {
  const modal = document.getElementById("fileUploadModal");
  if (!modal) return;
  document.getElementById("uploadFileName").value = "";
  document.getElementById("uploadFileDesc").value = "";
  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("active"), 10);
};

window.closeFileUploadModal = function() {
  const modal = document.getElementById("fileUploadModal");
  if (modal) {
    modal.classList.remove("active");
    setTimeout(() => { modal.style.display = "none"; }, 200);
  }
};

window.simulateFileUpload = function() {
  const name = document.getElementById("uploadFileName").value.trim();
  const desc = document.getElementById("uploadFileDesc").value.trim();
  const size = document.getElementById("uploadFileSize").value.trim();

  if (!name || !desc) {
    alert("파일명과 파일 설명을 입력해 주세요.");
    return;
  }

  const dateStr = new Date().toISOString().substring(0, 10).replace(/-/g, ".");
  const newFile = {
    id: Date.now(),
    name: name,
    desc: desc,
    date: dateStr,
    size: size,
    owner: "유종욱 실장"
  };

  window.worksData.drives.unshift(newFile);
  closeFileUploadModal();
  showToast(`성공적으로 파일 [${name}]을 업로드했습니다.`);
  handleRouting();
};

// ──────────────────────────────────────────────
// 10. 프로젝트 (사업 수주대장 + PM 인사카드 링크)
// ──────────────────────────────────────────────
function renderProjectMain() {
  const projList = window.worksData.projects;

  return `
    <div class="main-header">
      <div class="main-header-left">
        <h2 style="font-size: 16px; font-weight: 800;">프로젝트 통합 사업 현황판</h2>
      </div>
    </div>
    
    <div style="padding: 24px; display: flex; flex-direction: column; gap: 20px;">
      <div class="card">
        <h3 style="font-size: 14.5px; font-weight: 800; margin-bottom: 12px;">진행 중인 용역 사업</h3>
        <table class="works-table" style="box-shadow:none; border: 1px solid var(--border); border-radius: 6px;">
          <thead>
            <tr>
              <th>용역 코드</th>
              <th>프로젝트명</th>
              <th>소속 법인</th>
              <th>진행 상태</th>
              <th>계약 금액</th>
              <th>진행률 (Progress)</th>
              <th>담당 PM</th>
            </tr>
          </thead>
          <tbody>
            ${projList.map(proj => `
              <tr>
                <td>${proj.code}</td>
                <td><strong>${proj.name}</strong></td>
                <td>
                  <span class="company-chip ${proj.company === 'CON-COST' ? 'concost' : 'vietqs'}">
                    ${proj.company}
                  </span>
                </td>
                <td><span class="badge blue">${proj.status}</span></td>
                <td><strong>${proj.price}</strong></td>
                <td>
                  <div style="display:flex; align-items:center; gap:8px; width:120px;">
                    <div style="flex:1; height:6px; background:#E2E8F0; border-radius:3px; overflow:hidden; position:relative;">
                      <div style="width:${proj.progress}%; height:100%; background:var(--theme-color); border-radius:3px;"></div>
                    </div>
                    <span style="font-size:11px; font-weight:bold; color:var(--text-sub);">${proj.progress}%</span>
                  </div>
                </td>
                <td>
                  <!-- 담당 PM 클릭 시 RAG 정보 모듈 인사카드 팝업 연동 -->
                  <a href="javascript:void(0)" onclick="window.openOrgHrCardPopup('${proj.pmEmpNo}')" style="color:var(--theme-color); font-weight:800; text-decoration:none; border-bottom:1px dashed var(--theme-color);">
                    👤 ${proj.pm}
                  </a>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ──────────────────────────────────────────────
// 공통 라우팅 로직
// ──────────────────────────────────────────────
function handleRouting() {
  const hash = location.hash || "#home";
  const route = routes[hash] || routes["#home"];

  // 1. 서브패널 렌더링
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

  // 4. 주소록(조직도) 모듈 추가 연동
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
