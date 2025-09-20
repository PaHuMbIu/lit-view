import { Button } from "@/shared/ui/Button";
import { BookInfo } from "@/shared/types/books";
import Link from "next/link";
import { getViewedBooks } from "@/shared/utils";

interface BookCardProps {
  book: BookInfo;
}

export const BookCard = ({ book }: BookCardProps) => {
  const viewedBooks = getViewedBooks();
  const viewed = viewedBooks.includes(book.id);

  return (
    <Link href={`/books/${book.id}`}>
      <Button
        variant="card"
        className={`w-full p-0 overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-2xl ${
          viewed ? "opacity-60" : "opacity-100"
        }`}
      >
        <article className="flex flex-col">
          <div className="w-full h-72 overflow-hidden rounded-t-2xl">
            <img
              src={book.formats ?? ""}
              alt={book.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="p-4 bg-[#111111] flex flex-col gap-1">
            <h2 className="font-bold text-lg text-white truncate" title={book.title}>
              {book.title}
            </h2>
            <p className="text-gray-400 truncate">{book.author}</p>
            <p className="text-gray-500 text-sm">Загрузок: {book.download_count}</p>
          </div>
        </article>
      </Button>
    </Link>
  );
};
