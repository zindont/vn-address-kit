import { searchProvince } from "./search-province";
import { searchWard } from "./search-ward";

export function searchAdministrativeUnit(keyword: string) {
  return {
    provinces: searchProvince(keyword),
    wards: searchWard(keyword)
  };
}
