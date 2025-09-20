import { buildBooksQuery, getInitialParams, updateUrlParams } from "@/shared/lib";
import { useEffect, useRef, useState } from "react";
import { BookInfo } from "@/shared/types/books";

export const useBooks = () => {
  const [lang, setLang] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [booksData, setBooksData] = useState<{ books: BookInfo[]; nextUrl: string | null }>({
    books: [],
    nextUrl: null,
  });

  const initialLoadRef = useRef(true);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const findBooks = async () => {
    try {
      const { books, next } = await buildBooksQuery();
      setBooksData({ books: books, nextUrl: next });
    } catch (error) {
      console.error("Error when searching for books:", error);
    }
  };

  useEffect(() => {
    const params = getInitialParams();

    if (params.languages) {
      setLang(Array.isArray(params.languages) ? params.languages : [params.languages]);
    }

    if (params.search && typeof params.search === "string") {
      setSearchQuery(params.search);
    }

    if ((params.languages && params.languages.length > 0) || params.search) {
      void findBooks();
    }
  }, []);

  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      return;
    }

    updateUrlParams({ languages: lang, search: searchQuery });

    if (timeoutId.current) clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      void findBooks();
    }, 500);
  }, [lang, searchQuery]);

  return { booksData, setBooksData, findBooks, lang, setLang, searchQuery, setSearchQuery };
};
