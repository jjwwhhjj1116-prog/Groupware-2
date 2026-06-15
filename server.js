const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const os = require('os');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

const PORT = process.env.PORT || 8080;
const dbPath = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Support larger Base64 uploads for profile pictures
app.use(express.static(__dirname));

// Read/write helper for local JSON database
function readDb() {
  if (!fs.existsSync(dbPath)) {
    return { users: [], chats: [], events: [] };
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    return {
      users: parsed.users || [],
      chats: parsed.chats || [],
      events: parsed.events || []
    };
  } catch (e) {
    return { users: [], chats: [], events: [] };
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to write database file:', e);
  }
}

// Get local IPv4 addresses
function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }
  return addresses;
}

// LAN State Synchronization Endpoint
app.post('/api/state/sync', (req, res) => {
  const clientData = req.body;
  const serverData = readDb();
  let changed = false;

  // 1. Merge users
  if (Array.isArray(clientData.users)) {
    clientData.users.forEach(cUser => {
      const sUserIdx = serverData.users.findIndex(u => u.id === cUser.id);
      if (sUserIdx === -1) {
        serverData.users.push(cUser);
        changed = true;
      } else {
        const sUser = serverData.users[sUserIdx];
        let userUpdated = false;
        
        // Sync dynamic status
        if (cUser.status && cUser.status !== sUser.status) { sUser.status = cUser.status; userUpdated = true; }
        if (cUser.statusMsg && cUser.statusMsg !== sUser.statusMsg) { sUser.statusMsg = cUser.statusMsg; userUpdated = true; }
        
        // Sync profile photos
        if (cUser.photoUrl && cUser.photoUrl !== sUser.photoUrl) { sUser.photoUrl = cUser.photoUrl; userUpdated = true; }
        
        // Sync administrative changes
        if (cUser.grade && cUser.grade !== sUser.grade) { sUser.grade = cUser.grade; userUpdated = true; }
        if (cUser.role && cUser.role !== sUser.role) { sUser.role = cUser.role; userUpdated = true; }
        if (cUser.dept && cUser.dept !== sUser.dept) { sUser.dept = cUser.dept; userUpdated = true; }
        
        if (userUpdated) {
          changed = true;
        }
      }
    });
  }

  // 2. Merge chats
  if (Array.isArray(clientData.chats)) {
    clientData.chats.forEach(cChat => {
      const exists = serverData.chats.some(m => m.id === cChat.id);
      if (!exists) {
        serverData.chats.push(cChat);
        changed = true;
      }
    });
  }

  // 3. Merge events
  if (Array.isArray(clientData.events)) {
    clientData.events.forEach(cEvent => {
      const sEventIdx = serverData.events.findIndex(e => e.id === cEvent.id);
      if (sEventIdx === -1) {
        serverData.events.push(cEvent);
        changed = true;
      } else {
        const sEvent = serverData.events[sEventIdx];
        if (JSON.stringify(sEvent) !== JSON.stringify(cEvent)) {
          serverData.events[sEventIdx] = cEvent;
          changed = true;
        }
      }
    });
  }

  if (changed) {
    writeDb(serverData);
  }

  res.json({
    success: true,
    users: serverData.users.length > 0 ? serverData.users : clientData.users,
    chats: serverData.chats.length > 0 ? serverData.chats : clientData.chats,
    events: serverData.events.length > 0 ? serverData.events : (clientData.events || [])
  });
});

// ──────────────────────────────────────────────
// LAN 실시간 메시징 — Socket.io
// ──────────────────────────────────────────────

// socketId → { userId, userName, dept, role, avatarColor }
const connectedUsers = new Map();

function getOnlineUserIds() {
  const ids = new Set();
  connectedUsers.forEach(u => ids.add(u.userId));
  return Array.from(ids);
}

io.on('connection', (socket) => {
  console.log(`[Socket] 연결됨: ${socket.id}  (LAN IP: ${socket.handshake.address})`);

  // 로그인한 사용자가 자신을 등록
  socket.on('user:join', (userInfo) => {
    connectedUsers.set(socket.id, userInfo);
    console.log(`[Socket] 참가: ${userInfo.userName} (userId=${userInfo.userId})`);
    // 모든 클라이언트에 온라인 목록 갱신 전파
    io.emit('users:online', getOnlineUserIds());
  });

  // 채팅방(channelId) 구독
  socket.on('chat:join', (channelId) => {
    socket.join(channelId);
  });

  // 메시지 전송 → 같은 방의 다른 사용자에게 전파 (발신자 제외)
  socket.on('message:send', (msg) => {
    socket.to(msg.channelId).emit('message:receive', msg);
  });

  // 타이핑 중 표시
  socket.on('chat:typing', ({ channelId, userId, userName }) => {
    socket.to(channelId).emit('chat:typing', { userId, userName });
  });

  socket.on('disconnect', () => {
    const info = connectedUsers.get(socket.id);
    if (info) {
      console.log(`[Socket] 나감: ${info.userName}`);
      connectedUsers.delete(socket.id);
    }
    io.emit('users:online', getOnlineUserIds());
  });
});

// ──────────────────────────────────────────────
// 이메일 API
// ──────────────────────────────────────────────

const getWelcomeTemplate = (name, email, empNo, dept, role) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Malgun Gothic', Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f4f6f8; }
    .email-container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
    .email-header { background: linear-gradient(135deg, #f16800 0%, #ea580c 100%); padding: 35px 20px; text-align: center; color: #ffffff; }
    .email-header h1 { margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 0.5px; }
    .email-body { padding: 40px 30px; }
    .welcome-text { font-size: 18px; font-weight: bold; color: #f16800; margin-bottom: 20px; }
    .info-table { width: 100%; border-collapse: collapse; margin: 25px 0; background-color: #fafafa; border-radius: 8px; overflow: hidden; }
    .info-table th, .info-table td { padding: 12px 16px; text-align: left; font-size: 14px; border-bottom: 1px solid #eeeeee; }
    .info-table th { background-color: #f1f5f9; color: #475569; font-weight: 600; width: 30%; }
    .info-table td { color: #1e293b; }
    .button-container { text-align: center; margin: 30px 0 10px 0; }
    .cta-button { display: inline-block; padding: 12px 30px; background-color: #f16800; color: #ffffff !important; text-decoration: none; font-weight: bold; border-radius: 8px; }
    .email-footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header"><h1>CONCOST GROUPWARE</h1></div>
    <div class="email-body">
      <div class="welcome-text">환영합니다, ${name}님!</div>
      <p style="font-size: 15px; color: #334155; margin: 0 0 15px 0;">
        (주)컨코스트 사내 포탈 시스템에 성공적으로 등록되셨습니다.<br>
        부여받으신 고유 사원번호와 부서 계정 정보는 다음과 같습니다.
      </p>
      <table class="info-table">
        <tr><th>사원명</th><td>${name}</td></tr>
        <tr><th>사원번호</th><td style="font-weight: bold; color: #f16800;">${empNo}</td></tr>
        <tr><th>이메일 계정</th><td>${email}</td></tr>
        <tr><th>소속 부서</th><td>${dept}</td></tr>
        <tr><th>직급 / 직책</th><td>${role}</td></tr>
      </table>
      <div class="button-container">
        <a href="http://localhost:${PORT}" class="cta-button" target="_blank">포탈 바로가기</a>
      </div>
    </div>
    <div class="email-footer">
      © 2026 (주)컨코스트 개발 TF팀. All Rights Reserved.<br>
      본 메일은 발신 전용 메일입니다.
    </div>
  </div>
</body>
</html>
`;

const getResetTemplate = (name, email, tempPassword) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Malgun Gothic', Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f4f6f8; }
    .email-container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
    .email-header { background: linear-gradient(135deg, #f16800 0%, #ea580c 100%); padding: 35px 20px; text-align: center; color: #ffffff; }
    .email-header h1 { margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 0.5px; }
    .email-body { padding: 40px 30px; }
    .alert-text { font-size: 18px; font-weight: bold; color: #ef4444; margin-bottom: 20px; }
    .password-box { background-color: #fff7ed; border: 1px dashed #fdba74; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0; }
    .password-label { font-size: 13px; color: #7c2d12; margin-bottom: 5px; text-transform: uppercase; font-weight: bold; }
    .password-value { font-size: 22px; font-weight: bold; color: #ea580c; letter-spacing: 1px; font-family: monospace; }
    .button-container { text-align: center; margin: 30px 0 10px 0; }
    .cta-button { display: inline-block; padding: 12px 30px; background-color: #f16800; color: #ffffff !important; text-decoration: none; font-weight: bold; border-radius: 8px; }
    .email-footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header"><h1>CONCOST GROUPWARE</h1></div>
    <div class="email-body">
      <div class="alert-text">비밀번호 찾기 임시 비밀번호 안내</div>
      <p style="font-size: 15px; color: #334155;">안녕하세요, ${name}님. 임시 비밀번호를 발급해 드립니다.</p>
      <div class="password-box">
        <div class="password-label">발급된 임시 비밀번호</div>
        <div class="password-value">${tempPassword}</div>
      </div>
      <div class="button-container">
        <a href="http://localhost:${PORT}" class="cta-button" target="_blank">포탈 로그인하러 가기</a>
      </div>
    </div>
    <div class="email-footer">
      © 2026 (주)컨코스트 개발 TF팀. All Rights Reserved.<br>
      본 메일은 발신 전용 메일입니다.
    </div>
  </div>
</body>
</html>
`;

app.post('/api/send-email', async (req, res) => {
  const { type, email, data } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Recipient email is required.' });

  let subject = '', html = '';
  if (type === 'welcome') {
    subject = `[CONCOST] ${data.name}님의 사내 포탈 회원가입을 환영합니다.`;
    html = getWelcomeTemplate(data.name, email, data.empNo, data.dept, data.role);
  } else if (type === 'resetPassword') {
    subject = `[CONCOST] 임시 비밀번호 발급 안내 메일입니다.`;
    html = getResetTemplate(data.name, email, data.tempPassword);
  } else {
    return res.status(400).json({ success: false, message: 'Invalid email template type.' });
  }

  const hasSMTP = process.env.SMTP_USER && process.env.SMTP_PASS;
  if (!hasSMTP) {
    console.warn('[WARN] SMTP not configured — mock mode');
    return res.status(200).json({ success: true, message: 'Mocked.', mocked: true, emailBody: html });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    const info = await transporter.sendMail({ from: process.env.SMTP_FROM, to: email, subject, html });
    console.log(`📧 Email sent: ${info.messageId}`);
    return res.status(200).json({ success: true, message: 'Email sent successfully.' });
  } catch (error) {
    console.error('❌ Email error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email.', error: error.message });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 CONCOST Portal Server is running!`);
  console.log(`🏠 Local:   http://localhost:${PORT}`);
  
  const ips = getLocalIpAddresses();
  ips.forEach(ip => {
    console.log(`🌐 Network: http://${ip}:${PORT}  ← LAN users can connect here`);
  });
  
  console.log(`📁 Static root: ${__dirname}`);
  console.log(`💾 Database file: ${dbPath}\n`);
});
