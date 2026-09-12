"use client";

import type { ReactNode } from "react";
import PhoneInput from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar.json";
import en from "react-phone-number-input/locale/en.json";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/cn";
import type { Copy } from "@/lib/i18n";
import { defaultPhoneCountry, supportedPhoneCountries } from "@/lib/phone";

export function InternationalPhoneField({
  label,
  value,
  onChange,
  locale,
  placeholder,
  required = false,
}: {
  label: ReactNode;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  locale: "en" | "ar";
  placeholder?: Copy;
  required?: boolean;
}) {
  const t = (copy: Copy) => copy[locale];

  return (
    <label className="grid gap-2 text-start text-[0.82rem]">
      <span>{label}</span>
      <div dir="ltr">
        <PhoneInput
          international
          defaultCountry={defaultPhoneCountry}
          countries={supportedPhoneCountries}
          countryCallingCodeEditable={false}
          labels={locale === "ar" ? ar : en}
          value={value}
          onChange={onChange}
          placeholder={placeholder ? t(placeholder) : undefined}
          required={required}
          className={cn("phone-input", value ? "phone-input--filled" : undefined)}
          numberInputProps={{
            name: "phone",
            autoComplete: "tel",
            inputMode: "tel",
            required,
            className: "phone-input__number",
          }}
        />
      </div>
    </label>
  );
}
