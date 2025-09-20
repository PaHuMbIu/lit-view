import { BookInfo } from "@/shared/types/books";

interface BookDetailsProps {
  book: BookInfo;
}

export const BookDetails = ({ book }: BookDetailsProps) => {
  return (
    <div className="p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 md:w-2/3">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg break-words">
        {book.title}
      </h1>
      <p className="text-base sm:text-lg text-gray-300">Author: {book.author}</p>
      <p className="text-sm sm:text-base text-gray-400">Downloads: {book.download_count}</p>

      {book.subjects && book.subjects.length > 0 && (
        <div className="mt-2 sm:mt-4">
          <h2 className="text-md sm:text-lg font-semibold text-gray-200 mb-1 sm:mb-2 flex items-center gap-2">
            Темы{" "}
            <span className="bg-blue-600 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full">
              {book.subjects.length}
            </span>
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm sm:text-base">
            {book.subjects.map((subj) => (
              <li key={subj}>{subj}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
