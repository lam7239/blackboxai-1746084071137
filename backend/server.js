
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Hardcoded users with roles
const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'dieuphoi', password: 'dp123', role: 'coordinator' },
  { id: 3, username: 'nhanvien', password: 'nv123', role: 'employee' },
];

// Simple authentication middleware
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Chưa xác thực' });

  const token = authHeader.split(' ')[1];
  const user = users.find(u => u.username === token);
  if (!user) return res.status(401).json({ message: 'Token không hợp lệ' });

  req.user = user;
  next();
}

// Authorization middleware for roles
function authorize(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Không có quyền truy cập' });
    }
    next();
  };
}

// Placeholder data
let attendanceRecords = [];
let orders = [];
let workProgress = [];
let qrScans = [];

// Đăng nhập - trả về token (username)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });

  // Trả về token đơn giản là username
  res.json({ token: user.username, role: user.role });
});

// Chấm công - Attendance endpoint (chỉ admin được chỉnh sửa)
app.post('/api/attendance', authenticate, authorize(['admin']), (req, res) => {
  const record = req.body;
  attendanceRecords.push(record);
  res.status(201).json({ message: 'Chấm công thành công', record });
});

// Tạo đơn hàng - Create order endpoint (chỉ coordinator được tạo)
app.post('/api/orders', authenticate, authorize(['coordinator']), (req, res) => {
  const order = req.body;
  orders.push(order);
  res.status(201).json({ message: 'Tạo đơn hàng thành công', order });
});

// Lấy danh sách đơn hàng (tất cả user được xem)
app.get('/api/orders', authenticate, (req, res) => {
  res.json(orders);
});

// Cập nhật tiến độ công việc - Update work progress (tất cả user được cập nhật)
app.post('/api/work-progress', authenticate, (req, res) => {
  const progress = req.body;
  workProgress.push(progress);
  res.status(201).json({ message: 'Cập nhật tiến độ thành công', progress });
});

// Quét mã QR - QR scan endpoint (tất cả user được quét)
app.post('/api/qr-scan', authenticate, (req, res) => {
  const scan = req.body;
  qrScans.push(scan);
  res.status(201).json({ message: 'Quét mã QR thành công', scan });
});

app.listen(port, () => {
  console.log("Server backend đang chạy tại http://localhost:" + port);
});
