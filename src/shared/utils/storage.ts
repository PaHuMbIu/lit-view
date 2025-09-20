export const getViewedBooks = (): number[] => {
  return JSON.parse(localStorage.getItem("viewedBooks") || "[]") as number[];
};

export const addViewedBook = (id: number) => {
  const viewed = getViewedBooks();
  viewed.push(id);
  localStorage.setItem("viewedBooks", JSON.stringify(viewed));
};
