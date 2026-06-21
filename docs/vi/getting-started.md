# Bắt đầu nhanh

Tài liệu này giúp bạn chạy `vn-address-kit` trong vài phút.

## Yêu cầu

- Node.js 18 trở lên.
- Terminal có `npm` hoặc `npx`.

## 1. Chạy bằng npx

```bash
npx vn-address-kit@latest convert "123 Le Loi, P Loc Tho, TP Nha Trang, Khanh Hoa" --json --pretty
```

Kết quả JSON sẽ có:

- `success`: chuyển đổi có thành công hay không.
- `newAddress`: tỉnh/xã theo mô hình 2 cấp mới.
- `confidence`: điểm tin cậy từ `0` đến `1`.
- `strategy`: cách package match địa chỉ.
- `warnings` và `candidates`: dữ liệu phục vụ review/audit.

## 2. Cài package

```bash
npm install vn-address-kit
```

## 3. Chuyển đổi địa chỉ dạng text

```ts
import { convertAddressText } from "vn-address-kit";

const result = convertAddressText(
  "123 Le Loi, P Loc Tho, TP Nha Trang, Khanh Hoa"
);

console.log(result.newAddress);
console.log(result.confidence);
```

## 4. Chuyển đổi dữ liệu có cấu trúc

```ts
import { convertOldToNew } from "vn-address-kit";

const result = convertOldToNew({
  province: "Khánh Hòa",
  district: "Nha Trang",
  ward: "Lộc Thọ",
  streetAddress: "123 Lê Lợi"
});
```

## Bước tiếp theo

- Đọc [Migrate CSV](migrate-csv.md) nếu bạn cần xử lý dữ liệu hàng loạt.
- Đọc [Confidence And Strategies](../explanation/confidence.md) trước khi đặt ngưỡng tự động duyệt kết quả.
