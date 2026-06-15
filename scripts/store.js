// Groupware System v2 - 전역 상태 저장소 (store.js)

const state = {
  currentCompany: localStorage.getItem("currentCompany") || "CON-COST",
  currentUser: JSON.parse(sessionStorage.getItem("currentUser")) || null,
  darkMode: localStorage.getItem("darkMode") === "true",
  listeners: {}
};

// 특정 상태의 변경을 감지하는 이벤트 리스너 등록
function subscribe(event, callback) {
  if (!state.listeners[event]) {
    state.listeners[event] = [];
  }
  state.listeners[event].push(callback);
}

// 이벤트 발생 (리스너들에게 변경 알림)
function notify(event, value) {
  if (state.listeners[event]) {
    state.listeners[event].forEach(callback => callback(value));
  }
}

// 회사 상태 설정 (동적 테마 클래스 연동)
function setCurrentCompany(company) {
  state.currentCompany = company;
  localStorage.setItem("currentCompany", company);
  
  if (company === "Viet QS") {
    document.body.classList.remove("company-concost");
    document.body.classList.add("company-vietqs");
  } else {
    document.body.classList.remove("company-vietqs");
    document.body.classList.add("company-concost");
  }
  
  notify("companyChange", company);
}

// 다크모드 설정
function setDarkMode(enabled) {
  state.darkMode = enabled;
  localStorage.setItem("darkMode", String(enabled));
  document.body.classList.toggle("dark", enabled);
  notify("darkModeChange", enabled);
}

// 로그인 유저 설정
function setCurrentUser(user) {
  state.currentUser = user;
  if (user) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    sessionStorage.removeItem("currentUser");
  }
  notify("userChange", user);
}

// 상태 초기화 (다크모드 및 회사 테마 바인딩)
function initStore() {
  document.body.classList.toggle("dark", state.darkMode);
  
  if (state.currentCompany === "Viet QS") {
    document.body.classList.add("company-vietqs");
    document.body.classList.remove("company-concost");
  } else {
    document.body.classList.add("company-concost");
    document.body.classList.remove("company-vietqs");
  }
}

window.appStore = {
  get state() {
    return state;
  },
  subscribe,
  setCurrentCompany,
  setDarkMode,
  setCurrentUser,
  initStore
};
