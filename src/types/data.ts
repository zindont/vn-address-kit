export interface Province {
  code: string;
  name: string;
  type: "province" | "city";
  nameWithType: string;
  slug: string;
  normalizedName: string;
}

export interface Ward {
  code: string;
  name: string;
  type: "ward" | "commune" | "special_zone";
  nameWithType: string;
  provinceCode: string;
  slug: string;
  normalizedName: string;
}

export interface LegacyProvince {
  code: string;
  name: string;
  type: "province" | "city";
  nameWithType: string;
  slug: string;
  normalizedName: string;
}

export interface LegacyDistrict {
  code: string;
  name: string;
  type: "district" | "city" | "town" | "urban_district";
  nameWithType: string;
  provinceCode: string;
  slug: string;
  normalizedName: string;
}

export interface LegacyWard {
  code: string;
  name: string;
  type: "ward" | "commune" | "town";
  nameWithType: string;
  districtCode: string;
  provinceCode: string;
  slug: string;
  normalizedName: string;
}

export type MappingType =
  | "unchanged"
  | "renamed"
  | "merged"
  | "split"
  | "province_changed"
  | "ambiguous"
  | "manual_review_required";

export interface AddressMapping {
  oldProvinceCode: string;
  oldDistrictCode?: string;
  oldWardCode?: string;
  newProvinceCode: string;
  newWardCode: string;
  type: MappingType;
  note?: string;
}
