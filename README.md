[Tiếng Việt](README.md) | [English](README_en.md)

# Mật Mã Học Cổ Điển

Một ứng dụng web tĩnh minh họa và giải quyết các phương pháp mã hóa cổ điển:

- **Mã Caesar**
- **Mã Playfair**
- **Mã Polybius**
- **Mã Trithemius**
- **Đĩa Mã Hóa**

## Tính năng

- **Mã hóa & Giải mã** với giải thích chi tiết từng bước cho mỗi phương pháp
- **Tra cứu từ** (Caesar) và chọn **kiểu bảng** (2 hàng hoặc đầy đủ)
- Cập nhật **Playfair grid** theo thời gian thực và **Xử lý cặp ký tự**
- **Trợ giúp tọa độ** cho Mã Polybius
- **Chọn loại khóa** (Tiến triển, Bình phương, Tùy chỉnh) và **hiển thị dãy khóa** cho Trithemius
- **Đĩa Mã Hóa tương tác** với hai đĩa đồng tâm
- **Mô tả thuật toán**, ưu/nhược điểm, và phương pháp phá mã qua popup
- **Chuyển ngôn ngữ** Tiếng Anh / Tiếng Việt
- **Chuyển giao diện** Sáng / Tối / Theo hệ thống
- **Thiết kế đáp ứng** cho desktop và di động

## Bắt đầu sử dụng

1. Sao chép (clone) hoặc tải mã nguồn từ kho này.
2. Mở tệp `index.html` trong trình duyệt web.
3. Không cần cài đặt hay máy chủ, ứng dụng chạy hoàn toàn phía client.
4. Chỉ cần kết nối Internet để tải biểu tượng Font Awesome (CDN).

## Cấu trúc thư mục

```
Cipher-cryptography/
├── index.html
├── styles.css
├── scripts.js
├── public/              # Favicons
│   ├── favicon.svg
│   └── ...
├── README_en.md         # README tiếng Anh
└── README_vi.md         # README tiếng Việt (tệp này)
```

## Hướng dẫn sử dụng

- Dùng **nút ngôn ngữ** ở đầu trang để chuyển giữa Anh/Việt.
- Dùng **nút giao diện** để chuyển giữa Chế độ Sáng, Tối, hoặc Theo hệ thống.
- Bấm biểu tượng **quyển sách** cạnh tiêu đề để xem chi tiết thuật toán.
- Bấm biểu tượng **thông tin** để xem ưu/nhược điểm và phương pháp phá mã.
- Dùng các nút **ví dụ** để tự động điền dữ liệu mẫu.

## Đóng góp

Rất hoan nghênh đóng góp, báo lỗi và đề xuất tính năng. Vui lòng mở issue hoặc gửi pull request.

## Giấy phép

Dự án được cấp phép theo MIT License. 