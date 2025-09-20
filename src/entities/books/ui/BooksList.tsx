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

/**
 * Всем привет! I'm Pavel I'm frontend developer. В разработку пришёл в конце 22 года.
 *
 * Начинал с С#. Спустя время перекочевал в веб Изучил HTML CSS JS.
 * Успел сделать 1 полноценный лендинг, прежде чем меня забрали в армию.
 * Там кстати тоже занимался фронтом, только немного другим
 *
 * Вернувшись, сделал несколько проектов с упором на определённые технологии, в частности реакт и js.
 * И поскольку для компаний очень важно чтобы ты имел опыт командой разработки
 *
 * Собрал команду для разработки общего приложения
 * с целью тренировать командный опыт. В пике даже были активные созвоны и обсуждение архитектуры. В конечном итоге
 * всё же проект пришлось заморозить, так как нужно время.
 * Ну и я сам уже устал искать людей и писать доку
 *
 * Чуть позже человек из моей команды написал мне с предложением помочь ему с заказами, я согласился
 * Сделали 2 тг приложения
 *
 * И всё. Если так кратко по заголовкам пробежаться.
 */

/**
 * Что не очень:
 *
 * Противные проблемы с производительностью
 *
 * - ❌ СЕРЬЕЗНО: useEffect в BooksList может вызывать бесконечные ререндеры
 *
 * - ❌ СЕРЬЕЗНО: buildBooksQuery вызывается при каждом изменении URL, даже если данные уже загружены
 *
 * Проблемы средней важности
 *
 * Проблемы с типами
 *
 * - ⚠️ СРЕДНЕ: ButtonProps использует string для variant вместо union type
 *
 * - ⚠️ СРЕДНЕ: Нет типизации для localStorage операций
 *
 * Проблемы с UX
 *
 * - ⚠️ СРЕДНЕ: Нет индикатора загрузки при поиске
 *
 * - ⚠️ СРЕДНЕ: Нет обработки пустого состояния (когда книги не найдены)
 *
 * Проблемы с кодом
 *
 * - ⚠️ СРЕДНЕ: Дублирование логики в fetchBooks и fetchBookById
 *
 * - ⚠️ СРЕДНЕ: Магические числа (500ms для дебаунса)
 *
 * - ⚠️ СРЕДНЕ: Нет мемоизации для тяжелых вычислений(имею в виду, что компоненты(много компонентов) ререндарятся по кд)
 *
 * Вердикт:
 * Функциональность: почти все работает, но есть критические баги
 * Архитектура: -ъотличная структура, FSD применен правильно
 * TypeScript: хорошая типизация, но есть места для улучшения
 * UX: хороший UX, но не хватает loading states и error handling
 * Код: чистый код, но есть проблемы с производительностью
 */