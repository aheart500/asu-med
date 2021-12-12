export const bookGenres = [
  { arabic: "ديني", name: "Religious" },
  { arabic: "ترفيه", name: "Entertainment" },
  { arabic: "تعليمي", name: "Educational" },
  { arabic: "أطفال", name: "Children" },
  { arabic: "رواية", name: "Novels" },
  { arabic: "قصة قصيرة", name: "short Stories" },
  { arabic: "تنيمة بشرية", name: "Self Development" },
  { arabic: "ثقافي", name: "Cultural" },
];
export const getGenreInArabic = (genre: string) =>
  bookGenres.find((g) => g.name === genre)?.arabic;
export const isAGenre = (query: string) =>
  bookGenres.some((genre) => genre.name.toUpperCase() === query.toUpperCase());

export const BookFairTableColumns = [
  {
    name: "اسم الكتاب",
    width: "50%",
  },
  {
    name: "التصنيف",
    width: "25%",
  },
  {
    name: "العدد",
    width: "1%",
  },
  {
    name: "",
    width: "24%",
  },
];
BookFairTableColumns.reverse();
