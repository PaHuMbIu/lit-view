"use client";

import { useState, useRef } from "react";
import { fetchBooks } from "@/shared/api";
import { BookInfo } from "@/shared/types/books";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useBooksSearch = () => {
  const [books, setBooks] = useState<BookInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setUrlParams] = useState<URLSearchParams | string>("");
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSearch = async (query: string) => {
    try {
      setLoading(true);
      console.log("Поиск начался");
      const { books: fetchedBooks, next } = await fetchBooks(`${apiUrl}/books?search=${query}`);

      setBooks(fetchedBooks);
      setNextUrl(next);
    } catch (err) {
      console.error("Ошибка при поиске книг:", err);

      setBooks([]);
      setNextUrl(null);
    } finally {
      setLoading(false);
    }
  };

  const searchBooks = (query: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("search", query);
    setUrlParams(params);

    if (timeoutId.current) clearTimeout(timeoutId.current);

    setSearchQuery(query);

    timeoutId.current = setTimeout(() => {
      void runSearch(query);
    }, 300);
  };

  return {
    loading,
    books,
    nextUrl,
    searchQuery,
    setBooks,
    setNextUrl,
    setSearchQuery,
    searchBooks,
  };
};
