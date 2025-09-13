import axios from "axios";
import { ApiBook, ApiBookRes, BookInfo } from "@/shared/types/books";
import { API_BASE_URL } from "@/shared/config/api";

export const fetchBooks = async (
  url: string = `${API_BASE_URL}/books`,
): Promise<{
  books: BookInfo[];
  next: string | null;
}> => {
  try {
    const response = await axios.get<ApiBookRes>(url);

    const books = response.data.results.map((book: ApiBook) => ({
      author: book.authors.length > 0 ? book.authors[0].name : "Unknown",
      download_count: book.download_count,
      id: book.id,
      title: book.title,
      formats: book.formats["image/jpeg"] || null,
    }));

    return { books, next: response.data.next };
  } catch (error) {
    console.error(error);
    return { books: [], next: null };
  }
};
