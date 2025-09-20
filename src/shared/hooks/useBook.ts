import { useEffect, useState } from "react";
import { BookInfo } from "@/shared/types/books";
import { addViewedBook } from "@/shared/utils";
import { fetchBookById } from "@/shared/api";

export const useBook = (id?: string) => {
  const [book, setBook] = useState<BookInfo | null>(null);

  const loadBook = async () => {
    const found = await fetchBookById(Number(id));
    if (found) {
      setBook(found);
      addViewedBook(found.id);
    }
  };

  useEffect(() => {
    if (!id) return;

    void loadBook();
  }, [id]);

  return book;
};
