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
