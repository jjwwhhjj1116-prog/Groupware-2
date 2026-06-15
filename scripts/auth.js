// Groupware System v2 - 인증 처리 모듈 (auth.js)

const DEMO_EMAIL = "yjw@con-cost.com";

function login(email, password) {
  if (!email) {
    alert("이메일을 입력하세요.");
    return false;
  }

  // 데모 계정 검증 (비밀번호는 입력값 무관 통과)
  if (email.trim().toLowerCase() === DEMO_EMAIL) {
    const user = {
      email: DEMO_EMAIL,
      name: "유재우",
      role: "실장",
      empNo: "CC-002",
      dept: "경영지원본부"
    };
    
    window.appStore.setCurrentUser(user);
    location.href = "app.html";
    return true;
  } else {
    alert("유효한 데모 계정이 아닙니다. (데모 계정: yjw@con-cost.com)");
    return false;
  }
}

function logout() {
  window.appStore.setCurrentUser(null);
  location.href = "index.html";
}

// app.html 진입 시 세션 체크
function checkSession() {
  const user = window.appStore.state.currentUser;
  if (!user && !location.pathname.endsWith("index.html")) {
    location.href = "index.html";
  }
}

window.appAuth = {
  login,
  logout,
  checkSession
};
