import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import BookItemsRow from "./BookItemsRow";
import Loading from "../common/Loading";
import { groupByGenre } from "../../utils/books/bookMapService";
import "./BookGenreSection.css";

export const BookGenreSection = ({ books, loading }) => {
  const [booksByGenre, setBooksByGenre] = useState(null);
  const [genres, setGenres] = useState(null);
  const [selectedGenre, setSelectedGerne] = useState(null);

  useEffect(() => {
    const booksByGenre = groupByGenre(books, 4);
    setBooksByGenre(booksByGenre);
    setGenres(Object.keys(booksByGenre));
    setSelectedGerne(genres?.shift());
  }, [books]);

  const _setSelectedGerne = (e) => {
    console.log(e.target.id);
    setSelectedGerne(e.target.id);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <section id="popular-books" className="bookshelf">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-header align-center">
                <div className="title">
                  <span>Избор за вас</span>
                </div>
                <h2 className="section-title">Книги по жанр</h2>
              </div>

              <ul className="tabs">
                {genres &&
                  genres.map(function (genre, i) {
                    return (
                      <li
                        id={genre}
                        onClick={_setSelectedGerne}
                        className={`tab ${
                          selectedGenre === genre ? "active" : ""
                        }`}
                      >
                        {genre}
                      </li>
                    );
                  })}
              </ul>
              {genres &&
                genres.map(function (genre, i) {
                  return booksByGenre[genre].map(function (bookRow, i) {
                    return (
                      <BookItemsRow
                        key={i}
                        books={bookRow}
                        genre={genre}
                        selectedGenre={selectedGenre}
                      ></BookItemsRow>
                    );
                  });
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

function mapStateToProps(state) {
  return {
    books: state.books,
    loading: state.apiCallsInProgress > 0,
  };
}

export const ConnectedBookGerneSection =
  connect(mapStateToProps)(BookGenreSection);
