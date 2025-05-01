# Phần mềm quản lý labo nha khoa

## Mô tả
Ứng dụng web quản lý labo nha khoa với các chức năng:
- Chấm công lao động
- Tạo và quản lý đơn hàng
- Kiểm tra tiến độ công việc chia theo các khâu
- Quét mã QR để giám sát công việc

## Công nghệ sử dụng
- Frontend: HTML, Tailwind CSS, Google Fonts, Font Awesome
- Backend: Node.js với Express

## Cách chạy
1. Cài đặt Node.js và npm nếu chưa có.
2. Vào thư mục backend:
   ```
   cd backend
   ```
3. Cài đặt các package:
   ```
   npm install express
   ```
4. Chạy server backend:
   ```
   node server.js
   ```
5. Mở file `frontend/index.html` trên trình duyệt để sử dụng giao diện.

## Các API chính
- POST /api/attendance: Gửi dữ liệu chấm công
- POST /api/orders: Tạo đơn hàng mới
- GET /api/orders: Lấy danh sách đơn hàng
- POST /api/work-progress: Cập nhật tiến độ công việc
- POST /api/qr-scan: Gửi dữ liệu quét mã QR

## Ghi chú
- Đây là phiên bản khởi đầu, các chức năng sẽ được phát triển thêm theo yêu cầu.
