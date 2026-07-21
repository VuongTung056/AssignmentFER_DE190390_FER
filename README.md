# Product App

Đây là một ứng dụng quản lý sản phẩm hoàn chỉnh với giao diện showcase, quản lý sản phẩm, xem chi tiết, chỉnh sửa và xoá sản phẩm. Dữ liệu được cung cấp bằng JSON Server.

## Tính năng

- Hiển thị danh sách sản phẩm theo dạng thẻ
- Chuyển sang chế độ quản lý bằng bảng dữ liệu
- Thêm sản phẩm mới
- Xem chi tiết sản phẩm
- Chỉnh sửa sản phẩm
- Xoá sản phẩm
- Giao diện responsive

## Chạy dự án

Cài đặt deps:

```bash
npm install
```

Chạy cả frontend và mock API cùng lúc:

```bash
npm run start:all
```

- Frontend: http://localhost:3000
- Mock API: http://localhost:5000/products

## Scripts có sẵn

- `npm start` — chạy frontend + mock API cùng lúc
- `npm run start:all` — chạy frontend + JSON Server (same as `npm start`)
- `npm run server` — chạy mock API
- `npm run client` — chạy frontend
- `npm run build` — build production
- `npm test` — chạy test
