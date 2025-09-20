import { fetchBooks } from "@/shared/api";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const buildBooksQuery = async () => {
  const params = new URLSearchParams(window.location.search);
  const url = `${apiUrl}/books?${params.toString()}`;
  return fetchBooks(url);
};
