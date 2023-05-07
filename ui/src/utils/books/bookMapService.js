export function groupByRows(books, rows) {
  let result = [];

  for (let i = 0; i < books.length; i += rows) {
    let slice = books.slice(i, i + rows);
    result.push(Array.from(slice));
  }

  return result;
}

export function groupByGenre(books, rows = null) {
  let booksGroupedByGenre = {};
  for (let i = 0; i < books.length; i++) {
    let bookGenres = books[i]["genres"];
    for (const genreKey in bookGenres) {
      let currentGenre = bookGenres[genreKey];
      if (!booksGroupedByGenre[currentGenre]) {
        booksGroupedByGenre[currentGenre] = {};
      }
      booksGroupedByGenre[currentGenre][i] = books[i];
    }
  }

  if (rows) {
    const genres = Object.keys(booksGroupedByGenre);
    genres.forEach((key) => {
      booksGroupedByGenre[key] = groupByRows(
        Object.values(booksGroupedByGenre[key]),
        rows
      );
    });
  }

  return booksGroupedByGenre;
}
