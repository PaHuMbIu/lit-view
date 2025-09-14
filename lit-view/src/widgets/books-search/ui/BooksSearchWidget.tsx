"use client";
import { Input } from "@/shared/ui";
import { LanguageFilters } from "@/features";
import { BooksList } from "@/entities";
import { useBooks } from "@/shared/hooks";
import { Suspense } from "react";

export const BooksSearchWidget = () => {
  const { setBooksData, booksData, searchQuery, setSearchQuery, lang, setLang } = useBooks();

  const handleSearchBooks = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-gradient-to-r from-[#1a1a1a] to-[#222222] rounded-2xl shadow-lg">
        <Input
          variant="search"
          placeholder="Find book..."
          value={searchQuery}
          onChange={(e) => handleSearchBooks(e.currentTarget.value)}
          onBlur={(e) => handleSearchBooks(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchBooks(e.currentTarget.value)}
        />
        <LanguageFilters lang={lang} setLang={setLang} />
      </nav>

      <Suspense fallback={<div>Loading books...</div>}>
        <BooksList booksData={booksData} setBooksData={setBooksData} />
      </Suspense>
    </div>
  );
};
