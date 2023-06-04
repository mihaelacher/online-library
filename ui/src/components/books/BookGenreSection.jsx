import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Loading from "../common/Loading";
import BookGenreTabs from "./BookGenreTabs";
import { groupByGenre } from "../../utils/books/bookMapService";
import "./BookGenreSection.css";

export const BookGenreSection = ({ books, loading }) => {
  const [booksByGenre, setBooksByGenre] = useState(null);
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    const booksByGenre = groupByGenre(Object.values(books), 4);
    setBooksByGenre(booksByGenre);
    setGenres(Object.keys(booksByGenre));
  }, [books]);

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

              <BookGenreTabs genres={genres} booksByGenre={booksByGenre} />
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
