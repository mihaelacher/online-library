import React, { useState } from "react";

import BookItemsRow from "./BookItemsRow";

function BookGenreTabs({ genres, booksByGenre }) {
  const [selectedGenre, setSelectedGerne] = useState(null);
  const _setSelectedGerne = (e) => {
    setSelectedGerne(e.target.id);
  };

  return (
    <>
      <ul className="tabs">
        {genres &&
          genres.map(function (genre, i) {
            return (
              <li
                id={genre}
                onClick={_setSelectedGerne}
                className={`tab ${
                  (i === 0 && selectedGenre == null) || selectedGenre === genre
                    ? "active"
                    : ""
                }`}
              >
                {genre}
              </li>
            );
          })}
      </ul>
      {genres &&
        genres.map(function (genre, genreIndex) {
          return booksByGenre[genre].map(function (bookRow, i) {
            return (
              <BookItemsRow
                key={i}
                books={bookRow}
                isActive={
                  (genreIndex === 0 && selectedGenre == null) ||
                  selectedGenre === genre
                }
              ></BookItemsRow>
            );
          });
        })}
    </>
  );
}

export default BookGenreTabs;
