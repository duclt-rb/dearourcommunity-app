# 📝 Danh sách Công việc (Project TODO List)

Bản kế hoạch và theo dõi tiến độ phát triển dự án **Dear Our Community (DOC) Client App** built on **Angular 21 + Tailwind CSS v4 + PrimeNG v21 + NgRx Signal Store**.

---

## 📌 Tổng quan Tiến độ (Project Status)

| Nghiệp vụ / Tính năng              |       Trạng thái       | Ghi chú                                                                 |
| :--------------------------------- | :--------------------: | :---------------------------------------------------------------------- |
| **🛠️ Kiến trúc & API Services**    | 🟩 **100% Hoàn thành** | Đã tách thành Single Responsibility Services & gom nhóm khoa học        |
| **🔐 Đăng nhập & Xác thực (Auth)** | 🟨 **85% Hoàn thành**  | Đăng nhập/Đăng ký qua BFF hoạt động tốt; Cần tích hợp OAuth             |
| **👤 Trang Cá nhân & Dashboard**   | 🟨 **80% Hoàn thành**  | Đầy đủ giao diện Dashboard, chỉnh sửa profile; Cần kết nối dữ liệu thật |
| **📚 Quản lý Khóa học & Học tập**  | 🟨 **70% Hoàn thành**  | Có Trình phát bài học (Lesson Player); Cần tối ưu luồng chuyển bài học  |
| **💳 Thanh toán & Đăng ký gói**    | 🟩 **90% Hoàn thành**  | Đã có cổng thanh toán MoMo giả lập, logic nâng cấp gói phân tầng        |
| **🎨 UI/UX & Tailwind Preset**     | 🟨 **85% Hoàn thành**  | Đồng bộ hệ thống design tokens, các hiệu ứng Premium                    |

---

## 📂 Cấu trúc thư mục Core mới (sau tái cấu trúc)

```bash
src/app/core/
├── guards/
│   ├── auth.guard.ts           # Bảo vệ các route yêu cầu đăng nhập
│   └── check-auth.guard.ts     # (Nếu có) Kiểm tra trạng thái đăng nhập
├── services/
│   ├── client.service.ts       # SDK Client gốc (baseUrl & token management)
│   ├── auth.service.ts         # Nghiệp vụ đăng nhập, đăng ký, thông tin me()
│   ├── packages.service.ts     # Nghiệp vụ liên quan đến gói học phí
│   ├── course.service.ts       # Nghiệp vụ liên quan đến khóa học
│   └── organization.service.ts # Nghiệp vụ liên quan đến tổ chức
└── stores/
    └── auth.store.ts           # Quản lý Global Auth State (User, Token, Loading, Error)
```

---

## 📝 Chi tiết công việc (Checklist)

### 🛠️ 1. Kiến trúc & Cấu trúc Thư mục

- [x] **Tách ClientService** thành các Single-Responsibility Services (`AuthService`, `PackagesService`, `CourseService`, `OrganizationService`).
- [x] **Di chuyển toàn bộ core services** vào thư mục chuyên trách [src/app/core/services/](file:///Users/duclt/Documents/projects/dearourcommunity-app/src/app/core/services/).
- [x] **Di chuyển AuthStore** vào thư mục chuyên trách [src/app/core/stores/](file:///Users/duclt/Documents/projects/dearourcommunity-app/src/app/core/stores/).
- [x] **Cập nhật import** ở tất cả các component, guard và store bị ảnh hưởng (`login.ts`, `register.ts`, `plans.ts`, `profile.ts`,...).
- [x] **Dọn dẹp code rác & file thừa** tại thư mục `/core`.
- [x] **Kiểm thử biên dịch** (`npm run build`) và **linter** (`npm run lint`), đảm bảo không có lỗi TypeScript hoặc cảnh báo nào.

### 🔐 2. Hệ thống Xác thực (Authentication)

- [x] Trang Đăng nhập (`login.ts`) sử dụng Signal-based Forms và tích hợp `AuthStore`.
- [x] Trang Đăng ký (`register.ts`) xác thực mật khẩu trùng khớp và điều khoản dịch vụ sử dụng Signal-based Forms.
- [x] Lưu trữ JWT token an toàn trong `localStorage` và tự động gắn kèm thông qua `ClientService`.
- [ ] Tích hợp tính năng Đăng nhập qua mạng xã hội (OAuth Google & Facebook) trong `LoginPage`.
- [ ] Thêm chức năng "Quên mật khẩu / Khôi phục mật khẩu" (Forgot Password).
- [ ] Xử lý tự động Refresh Token khi JWT hết hạn (nếu backend hỗ trợ).

### 👤 3. Trang Cá nhân & Dashboard (Profile Dashboard)

- [x] Menu Sidebar điều hướng mượt mà giữa các tab con (`dashboard`, `courses`, `certificates`, `plans`, `edit-profile`, `password`).
- [x] Sử dụng **Mock Data** khởi tạo tại `ProfileStore` để hiển thị các số liệu thống kê học tập (Khóa học đã hoàn thành, số chứng chỉ,...).
- [x] Giao diện Đổi mật khẩu (`password`) và Chỉnh sửa thông tin cá nhân (`edit-profile`).
- [ ] Thay thế hoàn toàn Mock Data bằng dữ liệu thật gọi từ `authService.me()` và API profile.
- [ ] Chức năng Upload / Cập nhật ảnh đại diện (Avatar) sử dụng API.
- [ ] Cập nhật giao diện chỉnh sửa hồ sơ (`edit-profile.html`, `edit-profile.ts`) để bổ sung các trường thông tin: **Giới tính (Gender)** và **Biệt danh (Nickname)**.
- [ ] Cập nhật state và phương thức `updateProfile` trong `ProfileStore` để quản lý các trường thông tin mới (**Avatar**, **Gender**, **Nickname**).
- [ ] Tích hợp API thật để cập nhật đồng bộ các thông tin này lên máy chủ.
- [ ] Tích hợp hiển thị Chứng chỉ học tập thực tế và nút Tải chứng chỉ (dạng PDF).

### 📚 4. Khóa học & Trình phát Bài học (Courses & Lesson Player)

- [x] Danh sách khóa học có bộ lọc thông minh (`Tất cả`, `Đang học`, `Đã hoàn thành`) sử dụng Angular Signals.
- [x] Xây dựng Trình phát bài học (`lesson-player`) với danh mục bài học dạng Tree/Accordion bên sidebar trái và khung phát nội dung bên phải.
- [ ] Thay thế nút `alert()` khi bấm vào khóa học ở dashboard bằng liên kết điều hướng thực tế tới bài học cuối cùng đang học dở (`/course/:courseId/lesson/:lessonId`).
- [ ] Kết nối `LessonPlayerStore` với các API thực tế của `CourseService` để lấy danh sách bài học và nội dung chi tiết bài học.
- [ ] Tự động cập nhật tiến độ học tập (Progress) lên server khi học viên xem xong video hoặc đọc hết tài liệu.
- [ ] Thêm tính năng Đánh dấu bài học đã hoàn thành (Mark as Completed) và tự động chuyển sang bài tiếp theo.

### 💳 5. Thanh toán & Đăng ký gói (Checkout & Plans)

- [x] Trang lựa chọn gói học phí (`plans.html`) tự động tải danh sách gói từ `PackagesService` sử dụng Angular 21 Resource API.
- [x] Tự động scroll mượt mà đến thẻ gói học phí đang kích hoạt (`.plan-card--active`) sử dụng `afterRenderEffect`.
- [x] Sửa logic làm mờ/ẩn và tắt nút nâng cấp đối với các gói có cấp độ thấp hơn (Tier) gói hiện tại của user.
- [x] Quy trình Checkout (`checkout/billing`) mô phỏng thanh toán qua cổng điện tử MoMo cực kỳ chuyên nghiệp.
- [x] Trang kết quả thanh toán thành công (`checkout/receipt`) hiển thị thông tin hóa đơn chi tiết.
- [ ] Tích hợp API thật của MoMo / VNPay / Chuyển khoản ngân hàng để thực hiện giao dịch thực tế.
- [ ] Tự động cập nhật gói Premium cho tài khoản ngay sau khi thanh toán thành công thông qua API.

### 🎨 6. Giao diện & Trải nghiệm người dùng (UI/UX)

- [x] Đã thiết lập hệ thống Design Tokens cao cấp tại `src/tailwind.css` (bảng màu HSL, bo góc mượt mà, font chữ premium Forma DJR).
- [x] Thiết lập hiệu ứng chuyển động vi mô (Micro-animations) khi rê chuột qua các thẻ gói học phí, menu sidebar, nút bấm.
- [x] Responsive hoàn chỉnh giao diện trên thiết bị di động cho các trang Auth và Profile.
- [ ] Cải thiện hiệu ứng chuyển trang (Page transitions) giữa các danh mục profile để tăng cảm giác mượt mà.
- [ ] Tối ưu hóa SEO tốt nhất cho các trang tĩnh/trang đăng ký (Meta descriptions, Titles, H1 layout).

---

## 🚀 Kế hoạch Hành động Tiếp theo (Immediate Next Steps)

1. **Kết nối Dữ liệu thật cho Profile:** Thay thế Mock Data trong [profile.store.ts](file:///Users/duclt/Documents/projects/dearourcommunity-app/src/app/profile/profile.store.ts) bằng API thật thông qua các service mới tạo.
2. **Bổ sung trường thông tin cá nhân mới:** Cập nhật giao diện `edit-profile.html`/`edit-profile.ts` và `ProfileStore` để hỗ trợ hiển thị và cập nhật **Ảnh đại diện (Avatar)**, **Giới tính (Gender)**, và **Biệt danh (Nickname)**.
3. **Kích hoạt luồng học tập thực tế:** Thay thế hàm `alert()` tại [courses.ts](file:///Users/duclt/Documents/projects/dearourcommunity-app/src/app/profile/courses/courses.ts#L32-L34) để dẫn thẳng người dùng vào trang [lesson-player.ts](file:///Users/duclt/Documents/projects/dearourcommunity-app/src/app/courses/lesson-player/lesson-player.ts).
4. **Hiện thực hóa tích hợp API bài học:** Viết thêm các hàm chi tiết trong `CourseService` để fetch bài học thực tế, cập nhật tiến độ học viên lên BFF server.
