import { Button } from "@/shared/ui";
import { useRouter } from "next/navigation";

export const BookActions = () => {
  const router = useRouter();

  return (
    <div className="mt-4 sm:mt-auto flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
        <div className="w-full sm:w-auto">
          <Button variant="primary">Download</Button>
        </div>

        <div className="w-full sm:w-auto">
          <Button variant="secondary">Add to favourites</Button>
        </div>
      </div>

      <div className="w-full sm:w-auto">
        <Button variant="secondary" onClick={() => router.back()}>
          &larr; Back
        </Button>
      </div>
    </div>
  );
};
