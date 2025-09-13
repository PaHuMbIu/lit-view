"use client";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { BookCard } from "./BookCard";
import { fetchBooks } from "@/shared/api";
import { useSearchParams } from "next/navigation";
import { BookInfo } from "@/shared/types/books";

interface BooksListProps {
  booksData: { books: BookInfo[]; nextUrl: string | null };
  setBooksData: Dispatch<SetStateAction<{ books: BookInfo[]; nextUrl: string | null }>>;
}

export const BooksList = ({ booksData, setBooksData }: BooksListProps) => {
  const targetRef = useRef<HTMLLIElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const searchParams = useSearchParams();

  const getBooks = async () => {
    const { books, next } = await fetchBooks();
    setBooksData({ books: books, nextUrl: next });
  };

  useEffect(() => {
    const hasQuery = !!searchParams && searchParams.toString().length > 0;

    if (!hasQuery && booksData.books.length === 0) {
      void getBooks();
    }
  }, [searchParams]);

  const loadMoreBooks = async () => {
    if (!booksData.nextUrl) return;
    const { books, next } = await fetchBooks(booksData.nextUrl);

    setBooksData((prev) => ({
      books: [...prev.books, ...books],
      nextUrl: next,
    }));
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            void loadMoreBooks();
          }
        });
      },
      { threshold: 0 },
    );

    if (targetRef.current) {
      observerRef.current?.observe(targetRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [booksData]);

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mt-6">
      {booksData.books.map((book, index, self) => (
        <li
          key={book.id}
          className="w-full bg-card rounded-2xl border border-purple-600 overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          ref={self.length - 1 === index ? targetRef : null}
        >
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  );
};
