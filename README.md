# Hướng Dẫn Cài Đặt và Chạy Chương Trình

Hướng dẫn này cung cấp các bước để khởi động backend server và chạy ứng dụng.

## Yêu Cầu

- Node.js đã được cài đặt trên hệ thống.
- Chạy thử node -v và npm -v (nếu powershell không được thì thử chuyển sang command prompt)

## Các Bước Chạy Ứng Dụng

### Bước 1: Khởi động Backend Server

1. Mở terminal và điều hướng đến thư mục dự án.
   ```bash
   cd src/backend
   copy link thư mục backend ví dụ: cd C:\D\nmcnpm\Test\Esport\src\backend
   ```
2. Chạy lệnh sau để khởi động backend server:
   ```bash
   node server.js
   copy link tệp server.js ví dụ: node C:\D\nmcnpm\Test\Esport\src\backend\server.js
   ```
   Lệnh này sẽ khởi chạy server tại `http://localhost:3000`.

### Bước 2: Truy Cập Ứng Dụng

Bạn có thể truy cập ứng dụng theo một trong các cách sau:

#### Cách 1: Sử Dụng Trình Duyệt Web

1. Mở trình duyệt web bạn muốn.
2. Truy cập vào:
   ```
   http://localhost:3000
   ```

#### Cách 2: Sử Dụng Lệnh Terminal

- **PowerShell**:
  ```powershell
  start http://localhost:3000
  ```
- **Command Prompt**:
  ```cmd
  start "" "http://localhost:3000"
  ```

## Lưu Ý

- Đảm bảo backend server đang chạy trước khi truy cập ứng dụng.
- Nếu gặp sự cố, hãy kiểm tra xem cổng `3000` có đang được sử dụng bởi ứng dụng khác hay không.


Chạy test
-chuyển đến thư mục backend
-chạy npm install
-chạy đoạn code này:
$env:MONGO_URI="mongodb://localhost:27017/tournament"
$env:PORT="5000"
$env:CLIENT_URL="http://localhost:3000"
$env:SEED_DB="true"
node server.js
npm test

Cách chạy trên cmd:
-chuyển đến thư mục backend

-REM Thiết lập biến môi trường (không dùng dấu ngoặc kép):
set MONGO_URI=mongodb://localhost:27017/tournament
set PORT=5000
set CLIENT_URL=http://localhost:3000
set SEED_DB=true

-chạy server:
node server.js

-chạy test:
npm test


