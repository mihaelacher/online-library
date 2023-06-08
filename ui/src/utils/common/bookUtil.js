export function getBookRatings(ratings) {
  let result = {};

  ratings.forEach((element) => {
    if (!result[element.bookId]) {
      result[element.bookId] = {};
      result[element.bookId].rating = element.value;
    } else {
      let rating = result[element.bookId].rating;
      result[element.bookId].rating = (rating + element.value) / 2;
    }
  });

  return result;
}

export function sortBooksByCommentsCount(books, comments) {
  const groupedComments = comments?.reduce((acc, item) => {
    const { bookId } = item;
    if (!acc[bookId]) {
      acc[bookId] = 1;
    } else {
      acc[bookId]++;
    }
    return acc;
  }, {});

  const sortedBookIds = Object.keys(groupedComments).sort(
    (a, b) => groupedComments[b] - groupedComments[a]
  );

  return sortedBookIds.map((bookId) => books[bookId]);
}

export function sortBooksByRating(books) {
  return books.sort((a, b) => b.rating - a.rating);
}

export function sortBooksBySelling(books) {
  return books.sort((a, b) => b.renters?.length - a.renters?.length);
}
