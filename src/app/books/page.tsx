"use client";

import { BooksSearchWidget } from "@/widgets";

export default function BooksPage() {
  return (
    <section className="min-h-screen w-full bg-background text-foreground p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">List of books</h1>
      <BooksSearchWidget />
    </section>
  );
}
