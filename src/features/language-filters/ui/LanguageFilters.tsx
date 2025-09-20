"use client";
import { Input } from "@/shared/ui";
import { Dispatch, SetStateAction } from "react";
import { LANGS } from "@/features/language-filters";

interface LanguageFiltersProps {
  lang: string[];
  setLang: Dispatch<SetStateAction<string[]>>;
}

export const LanguageFilters = ({ setLang, lang }: LanguageFiltersProps) => {
  const handleSelectLang = (value: string) => {
    setLang((prev) => (prev.includes(value) ? prev.filter((l) => l !== value) : [...prev, value]));
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {LANGS.map((language) => (
        <label key={language.code} className="flex items-center gap-2 cursor-pointer select-none">
          <Input
            type="checkbox"
            variant="checkbox"
            checked={lang.includes(language.code)}
            value={language.code}
            onChange={(e) => handleSelectLang(e.currentTarget.value)}
          />
          {language.label}
        </label>
      ))}
    </div>
  );
};
