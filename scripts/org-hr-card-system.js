// Groupware System v2 - 인사카드 렌더링 엔진

function escapeHtml(str) {
  if (!str) return "";
  if (typeof str !== 'string') return String(str);
  return str.replace(/[&<>"']/g, function(m) {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#039;';
      default: return m;
    }
  });
}

// 동적으로 인사카드 팝업 마크업 주입
function ensureMiniCardModalMarkup() {
  if (document.getElementById("miniCardModal")) return;

  const modalHtml = `
    <div class="modal-backdrop" id="miniCardModal" style="display: none;">
      <div class="modal">
        <div class="modal-head">
          <h2>개인 인사카드</h2>
          <button class="close" id="miniCardCloseBtn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="mini-profile">
            <div class="profile-photo" id="miniPopupPhoto">-</div>
            <div>
              <h2 id="miniPopupName">-</h2>
              <div class="profile-tags" id="miniPopupTags"></div>
            </div>
          </div>

          <div class="mini-grid">
            <div class="mini-box"><span>회사</span><strong id="miniPopupCompany">-</strong></div>
            <div class="mini-box"><span>부서</span><strong id="miniPopupDept">-</strong></div>
            <div class="mini-box"><span>직급</span><strong id="miniPopupGrade">-</strong></div>
            <div class="mini-box"><span>이메일</span><strong id="miniPopupEmail">-</strong></div>
            <div class="mini-box"><span>전화번호</span><strong id="miniPopupPhone">-</strong></div>
            <div class="mini-box"><span>근무지</span><strong id="miniPopupWorkplace">-</strong></div>
          </div>

          <div class="notice">개인 인사카드는 조직도에서 직원 클릭 시 노출되는 제한형 화면입니다. 평가, 연봉, 주민등록번호, 계좌번호는 표시하지 않습니다.</div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // 이벤트 리스너 바인딩
  document.getElementById("miniCardCloseBtn").addEventListener("click", closeOrgHrCardPopup);
  document.getElementById("miniCardModal").addEventListener("click", function(e) {
    if (e.target === this) {
      closeOrgHrCardPopup();
    }
  });
}

function openOrgHrCardPopup(empNo) {
  ensureMiniCardModalMarkup();

  const employees = window.employees || [];
  const emp = employees.find(e => e.empNo === empNo);
  if (!emp) return;

  const displayNameStr = typeof window.displayName === 'function' ? window.displayName(emp) : emp.name;

  // 텍스트 바인딩 (XSS 방어 적용)
  const setTextSafe = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val || "-";
  };

  setTextSafe("miniPopupPhoto", displayNameStr ? displayNameStr[0] : "-");
  setTextSafe("miniPopupName", displayNameStr);
  setTextSafe("miniPopupCompany", emp.company);
  setTextSafe("miniPopupDept", emp.dept);
  setTextSafe("miniPopupGrade", emp.grade);
  setTextSafe("miniPopupEmail", emp.email);
  setTextSafe("miniPopupPhone", emp.phone);
  setTextSafe("miniPopupWorkplace", emp.workplace);

  const tags = document.getElementById("miniPopupTags");
  if (tags) {
    const compBadge = typeof window.companyBadge === 'function' ? window.companyBadge(emp.company) : `<span class="company-chip">${emp.company}</span>`;
    const statBadge = typeof window.statusBadge === 'function' ? window.statusBadge(emp.status) : `<span class="badge">${emp.status}</span>`;
    tags.innerHTML = `
      ${compBadge}
      <span class="badge blue">${escapeHtml(emp.dept)}</span>
      <span class="badge gray">${escapeHtml(emp.grade)}</span>
      ${statBadge}
    `;
  }

  const modal = document.getElementById("miniCardModal");
  if (modal) {
    modal.style.display = "flex";
    // 레이아웃 트랜지션을 위한 class 추가
    setTimeout(() => modal.classList.add("active"), 10);
  }
}

function closeOrgHrCardPopup() {
  const modal = document.getElementById("miniCardModal");
  if (modal) {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.style.display = "none";
    }, 200);
  }
}

// 기존 소스 연동을 위한 함수 앨리어스 설정
window.openOrgHrCardPopup = openOrgHrCardPopup;
window.closeOrgHrCardPopup = closeOrgHrCardPopup;
window.openMiniCardPopup = openOrgHrCardPopup;
window.closeMiniCardPopup = closeOrgHrCardPopup;
