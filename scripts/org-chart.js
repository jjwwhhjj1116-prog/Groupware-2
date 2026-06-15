// Groupware System v2 - 트리형 조직도 렌더러 (org-chart.js)

let currentOrgCompany = "CON-COST";

// 조직도 모듈 초기화
function initOrgChartModule() {
  currentOrgCompany = window.appStore.state.currentCompany;
  
  // 1. 헤더 탭 렌더링
  renderOrgTabs();
  
  // 2. 조직도 트리 렌더링
  renderOrgTree();

  // 3. 검색 입력 이벤트 바인딩
  const searchInput = document.getElementById("orgSearchInput");
  if (searchInput) {
    searchInput.removeEventListener("input", handleOrgSearch);
    searchInput.addEventListener("input", handleOrgSearch);
  }

  // 4. 서브 사이드바 부서 리스트 렌더링
  renderOrgDeptSubpanel();
}

function renderOrgTabs() {
  const tabsContainer = document.getElementById("orgChartCompanyTabs");
  if (!tabsContainer) return;

  const current = currentOrgCompany;
  tabsContainer.innerHTML = `
    <button class="btn ${current === 'CON-COST' ? 'btn-primary' : 'btn-line'}" onclick="switchOrgChartCompany('CON-COST')">CON-COST 조직도</button>
    <button class="btn ${current === 'Viet QS' ? 'btn-primary' : 'btn-line'}" onclick="switchOrgChartCompany('Viet QS')">Viet QS 조직도</button>
  `;
}

function switchOrgChartCompany(company) {
  currentOrgCompany = company;
  window.appStore.setCurrentCompany(company);
  
  // LNB Dock의 회사 스위치 상태 동기화 및 탭, 트리 갱신
  const companySwitch = document.getElementById("companyToggleSwitch");
  if (companySwitch) {
    const handle = companySwitch.querySelector(".dock-company-toggle-handle");
    if (company === "Viet QS") {
      document.body.classList.add("company-vietqs");
      document.body.classList.remove("company-concost");
    } else {
      document.body.classList.remove("company-vietqs");
      document.body.classList.add("company-concost");
    }
    const logoImg = document.getElementById("dockLogoImg");
    if (logoImg) {
      logoImg.src = company === "Viet QS" ? "assets/logo-vietqs.png" : "assets/logo-concost-vertical.png";
    }
  }

  renderOrgTabs();
  renderOrgTree();
  renderOrgDeptSubpanel();
  showToast(`${company} 조직도로 변경되었습니다.`);
}

// 부서 서브패널 리스트 렌더링
function renderOrgDeptSubpanel() {
  const container = document.getElementById("orgSubpanelDeptList");
  if (!container) return;

  const depts = new Set();
  const employees = window.employees || [];
  employees.forEach(emp => {
    if (emp.company === currentOrgCompany && emp.dept) {
      depts.add(emp.dept);
    }
  });

  container.innerHTML = Array.from(depts).map(dept => `
    <div class="subpanel-item" onclick="filterOrgTreeByDept('${dept}')">
      📁 ${dept}
    </div>
  `).join("");
}

function filterOrgTreeByDept(dept) {
  const searchInput = document.getElementById("orgSearchInput");
  if (searchInput) searchInput.value = dept;
  handleOrgSearch();
}

// 재귀적으로 조직도 노드를 빌드하는 헬퍼
function buildOrgNodeHtml(node) {
  if (!node) return "";

  const employees = window.employees || [];
  const isDept = node.nodeType === "department" || !node.employeeId;
  const emp = !isDept ? employees.find(e => e.empNo === node.employeeId) : null;
  
  let contentHtml = "";

  if (isDept) {
    const deptName = node.displayName || node.title || "부서";
    contentHtml = `
      <div class="org-node department-node" style="border: 2px solid var(--theme-color); border-radius: 8px; background-color: var(--theme-color-soft); padding: 8px 16px; min-width: 160px; text-align: center; box-shadow: var(--shadow);">
        <strong style="color: var(--text); font-size: 13.5px; font-weight: 800;">${deptName}</strong>
      </div>
    `;
  } else if (emp) {
    const nameStr = typeof window.displayName === "function" ? window.displayName(emp) : emp.name;
    const isMatched = currentOrgCompany === emp.company;
    
    contentHtml = `
      <div class="org-node employee-card-node clickable" onclick="window.openOrgHrCardPopup('${emp.empNo}')" data-emp-no="${emp.empNo}" data-search-target="${emp.name} ${emp.dept} ${emp.grade}" style="border: 1px solid var(--border); border-radius: var(--radius); background-color: var(--surface); padding: 10px 14px; width: 170px; box-shadow: var(--shadow); transition: transform 0.2s ease, border-color 0.2s ease; cursor: pointer; display: flex; align-items: center; gap: 10px;">
        <div style="width: 32px; height: 32px; border-radius: 8px; background-color: var(--theme-color); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px;">
          ${nameStr[0]}
        </div>
        <div style="display: flex; flex-direction: column; gap: 2px; text-align: left; min-width: 0;">
          <span style="font-size: 13px; font-weight: 800; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${nameStr}</span>
          <span style="font-size: 10.5px; color: var(--text-sub); font-weight: 600;">${emp.dept} · ${emp.grade}</span>
        </div>
      </div>
    `;
  }

  // 자식 노드가 있는 경우 가로 배치 Grid
  const children = node.children || [];
  const childrenHtml = children.length > 0 
    ? `
      <div style="display: flex; gap: 20px; justify-content: center; position: relative; padding-top: 24px; margin-top: 12px; border-top: 1px dashed var(--border);">
        ${children.map(child => buildOrgNodeHtml(child)).join("")}
      </div>
    `
    : "";

  return `
    <div style="display: flex; flex-direction: column; align-items: center; position: relative; flex-shrink: 0;">
      ${contentHtml}
      ${childrenHtml}
    </div>
  `;
}

// 전체 조직 트리 그리기
function renderOrgTree() {
  const container = document.getElementById("orgChartMainContent");
  if (!container) return;

  const data = window.orgStructures[currentOrgCompany];
  if (!data) {
    container.innerHTML = "조직 구조 데이터가 존재하지 않습니다.";
    return;
  }

  const chartTitle = document.getElementById("orgChartMainTitle");
  if (chartTitle) chartTitle.textContent = `${data.title} (${data.date || ""})`;

  // 조직도 스크롤 및 줌 기능을 탑재한 반응형 뷰포트
  container.innerHTML = `
    <div style="width: 100%; overflow: auto; background-color: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 40px 20px; box-shadow: var(--shadow); display: flex; justify-content: center; min-height: 580px;">
      <div style="display: inline-block; min-width: max-content;" id="orgTreeViewport">
        ${buildOrgNodeHtml(data.root)}
      </div>
    </div>
  `;
}

// 검색 필터링 핸들러
function handleOrgSearch() {
  const q = document.getElementById("orgSearchInput").value.trim().toLowerCase();
  const cards = document.querySelectorAll(".employee-card-node");
  
  if (!q) {
    cards.forEach(card => {
      card.style.opacity = "1";
      card.style.borderColor = "var(--border)";
      card.style.transform = "scale(1)";
    });
    return;
  }

  cards.forEach(card => {
    const target = card.dataset.searchTarget.toLowerCase();
    if (target.includes(q)) {
      card.style.opacity = "1";
      card.style.borderColor = "var(--theme-color)";
      card.style.transform = "scale(1.03)";
    } else {
      card.style.opacity = "0.3";
      card.style.borderColor = "var(--border)";
      card.style.transform = "scale(0.96)";
    }
  });
}

window.initOrgChartModule = initOrgChartModule;
window.switchOrgChartCompany = switchOrgChartCompany;
