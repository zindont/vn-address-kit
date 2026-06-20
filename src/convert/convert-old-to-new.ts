import { getLegacyDistricts, getLegacyProvinces, getLegacyWards, getMappings, getProvinceByCode, getWardByCode } from "../data/loader";
import { convertAddressText } from "./convert-address-text";
import { normalizeText } from "../normalize/normalize-text";
import type { StructuredOldAddressInput } from "../types/address";
import type { AddressMapping, LegacyDistrict, LegacyProvince, LegacyWard } from "../types/data";
import type { BatchConversionResult, ConversionCandidate, ConversionResult, MatchStrategy } from "../types/result";
import { calculateConfidence } from "./confidence";

function findBest<T extends { name: string; nameWithType: string; normalizedName: string }>(keyword: string | undefined, units: T[]): T[] {
  if (!keyword) return [];
  const normalized = normalizeText(keyword);
  const exact = units.filter((unit) => normalizeText(unit.name) === normalized || normalizeText(unit.nameWithType) === normalized || normalizeText(unit.normalizedName) === normalized);
  if (exact.length > 0) return exact;
  return units.filter((unit) => normalizeText(unit.name).includes(normalized) || normalizeText(unit.nameWithType).includes(normalized));
}

function mappingToCandidate(mapping: AddressMapping, confidence: number, strategy: MatchStrategy, reason: string): ConversionCandidate | undefined {
  const province = getProvinceByCode(mapping.newProvinceCode);
  const ward = getWardByCode(mapping.newWardCode);
  if (!province || !ward) return undefined;
  return {
    newProvinceCode: province.code,
    newProvinceName: province.name,
    newWardCode: ward.code,
    newWardName: ward.name,
    confidence,
    strategy,
    reason
  };
}

function fail(input: StructuredOldAddressInput, warnings: string[], candidates: ConversionCandidate[] = [], oldAddress: ConversionResult["oldAddress"] = {}): ConversionResult {
  return {
    success: false,
    input,
    streetAddress: input.streetAddress,
    oldAddress,
    confidence: candidates.length > 0 ? Math.max(...candidates.map((candidate) => candidate.confidence)) : 0,
    strategy: candidates.length > 0 ? "candidate_suggestion" : "failed",
    warnings,
    candidates
  };
}

export function convertOldToNew(input: StructuredOldAddressInput): ConversionResult {
  const warnings: string[] = [];
  const provinceMatches = findBest<LegacyProvince>(input.province, getLegacyProvinces());
  if (provinceMatches.length === 0) {
    return fail(input, ["Legacy province could not be matched."]);
  }
  if (provinceMatches.length > 1) warnings.push("Multiple legacy provinces matched; using candidates only.");

  const candidates: ConversionCandidate[] = [];
  let bestOldAddress: ConversionResult["oldAddress"] = {};

  for (const province of provinceMatches) {
    const districtPool = getLegacyDistricts().filter((district) => district.provinceCode === province.code);
    const districtMatches = findBest<LegacyDistrict>(input.district, districtPool);
    const districtCandidates = districtMatches.length > 0 ? districtMatches : districtPool;

    for (const district of districtCandidates) {
      const wardPool = getLegacyWards().filter((ward) => ward.provinceCode === province.code && ward.districtCode === district.code);
      const wardMatches = findBest<LegacyWard>(input.ward, wardPool);
      if (input.ward && wardMatches.length === 0) continue;
      const wardCandidates = wardMatches.length > 0 ? wardMatches : [];

      for (const ward of wardCandidates) {
        const mapping = getMappings().find(
          (item) => item.oldProvinceCode === province.code && item.oldDistrictCode === district.code && item.oldWardCode === ward.code
        );
        if (!mapping) continue;
        const strategy: MatchStrategy = input.district ? "old_ward_district_province_exact" : "old_ward_province_exact";
        const confidence = calculateConfidence(strategy, wardCandidates.length);
        const candidate = mappingToCandidate(mapping, confidence, strategy, `Matched sample mapping ${mapping.type}.`);
        if (candidate) candidates.push(candidate);
        bestOldAddress = {
          provinceCode: province.code,
          provinceName: province.name,
          districtCode: district.code,
          districtName: district.name,
          wardCode: ward.code,
          wardName: ward.name
        };
      }
    }
  }

  if (candidates.length === 0) {
    const province = provinceMatches[0];
    const fallbackMappings = province ? getMappings().filter((mapping) => mapping.oldProvinceCode === province.code) : [];
    const fallbackCandidates = fallbackMappings
      .map((mapping) => mappingToCandidate(mapping, calculateConfidence("candidate_suggestion", fallbackMappings.length), "candidate_suggestion", "Province matched, but district/ward did not match exactly."))
      .filter((candidate): candidate is ConversionCandidate => Boolean(candidate));
    return fail(input, ["No exact legacy ward mapping was found."], fallbackCandidates, { provinceCode: province?.code, provinceName: province?.name });
  }

  const uniqueCandidates = Array.from(new Map(candidates.map((candidate) => [`${candidate.newProvinceCode}:${candidate.newWardCode}`, candidate])).values());
  if (uniqueCandidates.length !== 1) {
    return fail(input, ["Address is ambiguous; multiple candidate mappings were found."], uniqueCandidates, bestOldAddress);
  }

  const candidate = uniqueCandidates[0]!;
  return {
    success: true,
    input,
    streetAddress: input.streetAddress,
    oldAddress: bestOldAddress,
    newAddress: {
      provinceCode: candidate.newProvinceCode,
      provinceName: candidate.newProvinceName,
      wardCode: candidate.newWardCode,
      wardName: candidate.newWardName
    },
    confidence: candidate.confidence,
    strategy: candidate.strategy,
    warnings,
    candidates: []
  };
}

export function convertBatch(items: Array<string | StructuredOldAddressInput>): BatchConversionResult {
  const results = items.map((item) => typeof item === "string" ? convertAddressText(item) : convertOldToNew(item));
  const matched = results.filter((result) => result.success).length;
  const ambiguous = results.filter((result) => !result.success && result.candidates.length > 0).length;
  const failed = results.length - matched - ambiguous;
  const averageConfidence = results.length === 0 ? 0 : results.reduce((sum, result) => sum + result.confidence, 0) / results.length;
  return { total: results.length, matched, ambiguous, failed, averageConfidence, results };
}

