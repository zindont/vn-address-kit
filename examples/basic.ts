import {
  convertAddressText,
  convertOldToNew,
  searchProvince,
  validateHierarchy,
} from "vn-address-kit";

console.log(searchProvince("khanh hoa"));

console.log(validateHierarchy({ provinceCode: "56", wardCode: "56001" }));

console.log(convertOldToNew({
  province: "Khánh Hòa",
  district: "Nha Trang",
  ward: "Lộc Thọ",
  streetAddress: "123 Lê Lợi"
}));

console.log(convertAddressText("123 Le Loi, P Loc Tho, TP Nha Trang, Khanh Hoa"));
