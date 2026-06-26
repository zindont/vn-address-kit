# Migrate CSV

Dùng CLI khi bạn có file CSV và muốn chuyển đổi một cột địa chỉ.

## File đầu vào

```csv
id,name,address
1,Nguyen Van A,"123 Le Loi, P Loc Tho, TP Nha Trang, Khanh Hoa"
2,Tran Thi B,"456 Nguyen Trai, P Ben Thanh, Q1, TP HCM"
```

## Chạy migrate

```bash
npx vietnam-address-kit@latest migrate customers.csv \
  --address-column address \
  --out customers.migrated.csv \
  --report report.json
```

## Cột được thêm vào

| Cột | Ý nghĩa |
|---|---|
| `vn_address_success` | Chuyển đổi thành công hay không. |
| `vn_address_confidence` | Điểm tin cậy từ `0` đến `1`. |
| `vn_address_strategy` | Chiến lược match được sử dụng. |
| `vn_address_new_province_code` | Mã tỉnh/thành mới. |
| `vn_address_new_province_name` | Tên tỉnh/thành mới. |
| `vn_address_new_ward_code` | Mã xã/phường mới. |
| `vn_address_new_ward_name` | Tên xã/phường mới. |
| `vn_address_street` | Phần số nhà/đường được giữ lại. |
| `vn_address_warnings` | Cảnh báo cần review. |

## Quy trình khuyến nghị

1. Backup file gốc.
2. Chạy migrate ra file mới.
3. Review các dòng `vn_address_success=false`.
4. Review các dòng confidence thấp hơn ngưỡng của bạn.
5. Lưu report và input gốc để audit.
