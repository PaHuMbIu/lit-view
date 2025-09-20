import axios from "axios";
import { BookInfo, ApiBookRes, ApiBook } from "@/shared/types/books";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchBookById = async (id: number): Promise<BookInfo | null> => {
  try {
    const url = `${apiUrl}/books/?ids=${id}`;
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
