import axios from "axios";
import { BookInfo, ApiBookRes, ApiBook } from "@/shared/types/books";
import { API_BASE_URL } from "@/shared/config/api";

export const fetchBookById = async (id: number): Promise<BookInfo | null> => {
  try {
    const url = `${API_BASE_URL}/books/?ids=${id}`;
    const response = await axios.get<ApiBookRes>(url);
    const book: ApiBook | undefined = response.data.results[0];

    if (!book) return null;

    return {
      id: book.id,
      title: book.title,
      author: book.authors.length > 0 ? book.authors[0].name : "Unknown",
      download_count: book.download_count,
      formats: book.formats["image/jpeg"] || null,
      subjects: book.subjects || [],
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
