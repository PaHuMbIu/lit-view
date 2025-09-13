"use client";
import { useParams } from "next/navigation";
import { BookLoading } from "@/shared/ui";
import { useBook } from "@/shared/hooks";
import { BookActions, BookDetails } from "@/widgets/book/ui";

export default function BookPage() {
  const { id } = useParams();
  const book = useBook(id as string);

  if (!book) return <BookLoading>Loading book...</BookLoading>;

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 py-6 gap-6 min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="flex flex-col md:flex-row bg-gradient-to-r from-[#1a1a1a] to-[#222222] rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl transition-transform hover:scale-[1.01] hover:shadow-3xl">
        {book.formats && (
          <img
            src={book.formats}
            alt={book.title}
            className="w-full md:w-1/3 object-cover h-64 md:h-auto"
          />
        )}
        <div className="p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 md:w-2/3">
          <BookDetails book={book} />
          <BookActions />
        </div>
      </div>
    </div>
  );
}
