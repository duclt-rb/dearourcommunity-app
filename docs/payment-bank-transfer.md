# Thanh toán chuyển khoản ngân hàng (Bank Transfer)

> Tài liệu thay đổi & hướng dẫn sử dụng tính năng thanh toán qua chuyển khoản ngân hàng — kèm SDK `@dearourcommunity/client`.
>
> Backend: commit `feat: add payment bank transfer` · Client SDK: `@dearourcommunity/client@0.6.7`

---

## 1. Tổng quan

Trước đây hệ thống chỉ thanh toán qua **MoMo** (tự động xác nhận qua IPN webhook). Tính năng mới cho phép người dùng **chuyển khoản ngân hàng thủ công**:

1. User chọn chuyển khoản → hệ thống tạo giao dịch + trả về **thông tin tài khoản nhận** và **nội dung chuyển khoản** (`= orderId`).
2. User chuyển khoản thật ngoài đời → gọi API báo "đã chuyển".
3. Admin vào panel thấy giao dịch **chờ duyệt** → đối soát sao kê → **duyệt** (kích hoạt gói) hoặc **từ chối**.

Điểm cốt lõi: **tái dùng 100% flow kích hoạt gói của MoMo** (`completePurchaseFromPayment`). Bank transfer chỉ thay "IPN tự động" bằng "admin duyệt tay". Mọi giao dịch đều được ghi đầy đủ vào bảng `app_payment_transactions` để đối soát/báo cáo thống nhất.

---

## 2. Thay đổi dữ liệu (entity / DB)

Bảng `app_payment_transactions` được bổ sung (migration `1779900000010-AddBankTransferToPaymentTransactions`):

| Cột              | Kiểu                           | Ý nghĩa                                          |
| ---------------- | ------------------------------ | ------------------------------------------------ |
| `payment_method` | enum `momo` \| `bank_transfer` | Phương thức thanh toán (data cũ mặc định `momo`) |
| `confirmed_by`   | varchar, nullable              | UserId của admin đã duyệt/từ chối                |
| `confirmed_at`   | datetime, nullable             | Thời điểm admin xử lý                            |

`PaymentStatus` thêm trạng thái trung gian:

```
pending → awaiting_confirmation → success
                                ↘ failed
```

| Status                  | Ý nghĩa                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------- |
| `pending`               | Khởi tạo (MoMo). Từ 0.7.0 luồng chuyển khoản **không** còn tạo record ở trạng thái này |
| `awaiting_confirmation` | User đã báo chuyển khoản, **chờ admin duyệt** (chỉ bank transfer)                      |
| `success`               | Đã duyệt → gói được kích hoạt                                                          |
| `failed`                | Admin từ chối / lỗi                                                                    |
| `refunded`              | Đã hoàn tiền (MoMo)                                                                    |

Quan hệ mới trên entity: `confirmedByUser` (ManyToOne → `User`, join qua `confirmed_by`) — để API trả luôn thông tin admin đã duyệt.

---

## 3. API Endpoints (backend)

Base path: `/api/v1/payment`

| Method & Path                          | Auth       | Mô tả                                                              |
| -------------------------------------- | ---------- | ------------------------------------------------------------------ |
| `POST /bank/create`                    | User (JWT) | Trả về thông tin TK nhận + QR (KHÔNG ghi DB từ 0.7.0)              |
| `POST /bank/confirm`                   | User (JWT) | **Tạo** giao dịch khi user báo đã chuyển → `awaiting_confirmation` |
| `GET /transactions`                    | **Admin**  | Danh sách giao dịch (phân trang + lọc)                             |
| `POST /admin/transactions/:id/approve` | **Admin**  | Duyệt → kích hoạt gói → `success`                                  |
| `POST /admin/transactions/:id/reject`  | **Admin**  | Từ chối → `failed`                                                 |

**Phân quyền admin:** guard `AdminGuard` — load user từ DB và kiểm tra cờ `isAdmin` (JWT không mang `isAdmin`). Endpoint `GET /transactions` trước đây chỉ có `JwtAuthGuard`, giờ đã được bảo vệ bằng `AdminGuard`.

### Chi tiết request/response

**`POST /bank/create`**

```jsonc
// Request
{ "packageId": "tier1", "amount": 500000 }
// Response
{
  "orderId": "DOC_tier1_<userId>_<ts>",
  "amount": 500000,
  "bankName": "Vietcombank",
  "accountNo": "1234567890",
  "accountName": "CONG TY ABC",
  "transferContent": "DOC_tier1_<userId>_<ts>"   // dùng làm nội dung CK
}
```

**`POST /bank/confirm`** (0.7.0: tạo giao dịch) → `{ "orderId": "...", "packageId": "tier1", "amount": 500000, "couponCode"?: "..." }` → `{ "orderId": "...", "status": "awaiting_confirmation" }`

**`GET /transactions`** — query: `?page=&limit=&sortOrder=asc|desc&status=&paymentMethod=`

```jsonc
{
  "items": [
    {
      /* Transaction, kèm user / package / confirmedByUser */
    },
  ],
  "meta": { "page": 1, "limit": 20, "total": 25, "totalPages": 2 },
}
```

**`POST /admin/transactions/:id/approve`** → `{ "id": "...", "orderId": "...", "status": "success" }`

**`POST /admin/transactions/:id/reject`** → `{ "reason": "Không nhận được tiền" }` → `{ "id": "...", "orderId": "...", "status": "failed" }`

---

## 4. Tính an toàn (idempotency & concurrency)

`approveBankTransfer` được thiết kế **chống kích hoạt 2 lần**:

- Chỉ duyệt khi status là `pending` hoặc `awaiting_confirmation`.
- Bọc `completePurchaseFromPayment` trong `try/catch`. Nếu lỗi → kiểm tra purchase đã tồn tại cho giao dịch này (`findByTransactionId`):
  - Nếu purchase đã `COMPLETED` → **reconcile** giao dịch về `success` (xử lý case 2 admin bấm đua nhau, hoặc crash giữa chừng). Unique index `purchases.payment_transaction_id` đảm bảo chỉ 1 purchase/giao dịch.
  - Nếu chưa có purchase → ném lỗi gốc.
- Validate số tiền khớp giá gói khi tạo giao dịch.
- `confirmBankTransfer` chỉ cho owner của giao dịch, idempotent (gọi lại khi đã `awaiting_confirmation` là no-op).

---

## 5. Cấu hình (env) & migration

Bắt buộc thêm vào `.env` (app **fail khi boot** nếu thiếu — tránh lộ số TK placeholder ở production):

```env
BANK_NAME=Vietcombank
BANK_ACCOUNT_NO=1234567890
BANK_ACCOUNT_NAME=CONG TY ABC
```

Chạy migration:

```bash
npm run migration:run
```

---

## 6. SDK `@dearourcommunity/client`

Cài đặt / cập nhật:

```bash
npm install @dearourcommunity/client@^0.7.0
```

Khởi tạo client:

```ts
import { Client } from '@dearourcommunity/client';

const client = new Client({ baseUrl: 'https://api.example.com', token: jwt });
```

### Method mới trên `client.payment`

| Method                       | Endpoint                                       | Quyền |
| ---------------------------- | ---------------------------------------------- | ----- |
| `createBankTransfer(dto)`    | `POST /payment/bank/create`                    | User  |
| `confirmBankTransfer(dto)`   | `POST /payment/bank/confirm`                   | User  |
| `getTransactions(query?)`    | `GET /payment/transactions`                    | Admin |
| `approveTransaction(id)`     | `POST /payment/admin/transactions/:id/approve` | Admin |
| `rejectTransaction(id, dto)` | `POST /payment/admin/transactions/:id/reject`  | Admin |

> ⚠️ **Breaking nhẹ:** `getTransactions()` đổi từ trả `Transaction[]` → `Paginated<Transaction>` (`{ items, meta }`). Đọc dữ liệu qua `.items` và phân trang qua `.meta`.

---

## 7. Use cases & ví dụ code

### UC1 — Người dùng thanh toán bằng chuyển khoản

```ts
// 1. Lấy thông tin chuyển khoản để hiển thị cho user (KHÔNG ghi DB từ 0.7.0)
const info = await client.payment.createBankTransfer({
  packageId: 'tier1',
  amount: 500000,
});

// → Hiển thị QR/thông tin: info.bankName, info.accountNo, info.accountName,
//   info.amount, và NỘI DUNG CHUYỂN KHOẢN = info.transferContent
//   (Bắt buộc user ghi đúng transferContent để admin đối soát.)

// 2. Sau khi user đã chuyển khoản, bấm "Tôi đã chuyển khoản"
//    0.7.0: bước này MỚI tạo giao dịch → ConfirmBankTransferDto kế thừa
//    CreateBankTransferDto, phải truyền lại packageId + amount + couponCode.
await client.payment.confirmBankTransfer({
  orderId: info.orderId,
  packageId: 'tier1',
  amount: 500000,
});
// → giao dịch được tạo với status 'awaiting_confirmation', vào hàng đợi duyệt của admin
```

### UC2 — Admin xem hàng đợi chờ duyệt

```ts
const { items, meta } = await client.payment.getTransactions({
  status: 'awaiting_confirmation',
  paymentMethod: 'bank_transfer',
  page: 1,
  limit: 20,
  sortOrder: 'desc',
});

for (const tx of items) {
  console.log(tx.orderId, tx.amount, tx.user?.wpUser?.displayName);
}
console.log(`Trang ${meta.page}/${meta.totalPages}, tổng ${meta.total}`);
```

### UC3 — Admin duyệt giao dịch (kích hoạt gói)

```ts
const result = await client.payment.approveTransaction(tx.id);
// result.status === 'success' → gói đã được kích hoạt, user được enroll khóa học
```

### UC4 — Admin từ chối giao dịch

```ts
await client.payment.rejectTransaction(tx.id, {
  reason: 'Không nhận được tiền trong sao kê',
});
// → status 'failed'
```

### UC5 — Lịch sử giao dịch + ai đã duyệt

```ts
const { items } = await client.payment.getTransactions({ status: 'success' });

items.forEach((tx) => {
  if (tx.paymentMethod === 'bank_transfer' && tx.confirmedByUser) {
    console.log(
      `${tx.orderId} duyệt bởi ${tx.confirmedByUser.wpUser?.displayName} lúc ${tx.confirmedAt}`,
    );
  }
});
```

### UC6 — Xử lý lỗi

```ts
import { ApiError } from '@dearourcommunity/client';

try {
  await client.payment.approveTransaction(tx.id);
} catch (e) {
  if (e instanceof ApiError) {
    // 409: giao dịch đã được duyệt trước đó / trạng thái không hợp lệ
    // 404: không tìm thấy giao dịch
    // 400: user thiếu wpUserId, số tiền không khớp...
    console.error(e.code, e.message);
  }
}
```

---

## 8. Sơ đồ luồng

```
User                          Backend                         Admin
 │                               │                              │
 │ createBankTransfer            │                              │
 │──────────────────────────────▶ (không ghi DB)               │
 │◀── thông tin TK + QR + orderId│                              │
 │                               │                              │
 │ (chuyển khoản thật)           │                              │
 │                               │                              │
 │ confirmBankTransfer           │                              │
 │──────────────────────────────▶ tạo tx → awaiting_confirmation│
 │                               │                              │
 │                               │      getTransactions         │
 │                               │◀─────────────────────────────│
 │                               │── danh sách chờ duyệt ───────▶│
 │                               │                              │
 │                               │      approveTransaction      │
 │                               │◀─────────────────────────────│
 │                               │ completePurchaseFromPayment  │
 │                               │ tx → success, kích hoạt gói  │
 │                               │── kết quả ───────────────────▶│
```

---

## 9. Hướng phát triển (chừa sẵn)

Logic kích hoạt nằm gọn trong `approveBankTransfer`. Khi muốn **đối soát tự động** (Casso/SePay), chỉ cần thêm webhook: match `transferContent (= orderId)` + số tiền với giao dịch `awaiting_confirmation`, rồi gọi cùng flow duyệt — không phải sửa luồng hiện tại. Lúc đó bank transfer sẽ hoạt động tự động giống IPN của MoMo.
