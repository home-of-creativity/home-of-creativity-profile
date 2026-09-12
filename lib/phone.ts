import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import type { Country } from "react-phone-number-input";

export const supportedPhoneCountries: Country[] = [
  "SY",
  "SA",
  "AE",
  "JO",
  "LB",
  "IQ",
  "KW",
  "QA",
  "BH",
  "OM",
  "EG",
  "TR",
  "US",
  "GB",
];

export const defaultPhoneCountry: Country = "SY";

export function isValidInternationalPhone(value: string | undefined) {
  return Boolean(value) && isValidPhoneNumber(value!);
}

export function formatInternationalPhoneDisplay(value: string | undefined) {
  if (!value) return "";
  try {
    const parsed = parsePhoneNumber(value);
    return parsed?.formatInternational() ?? value;
  } catch {
    return value;
  }
}
