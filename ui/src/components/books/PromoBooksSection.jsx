import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Loading from "../common/Loading";
import BookGenreTabs from "./BookGenreTabs";
import { groupByGenre } from "../../utils/books/bookMapService";
import { intersect } from "../../utils/common/arrUtil";
import "./BookGenreSection.css";

export const PromoBookSection = ({ books, loggedUser, loading }) => {
  const [booksByGenre, setBooksByGenre] = useState(null);
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    const followers = loggedUser?.followers;
    const following = loggedUser?.following;
    const promoBooksUsers = intersect(following, followers);

    const promoBooks = Object.values(books).filter((book) => {
      return promoBooksUsers.includes(book.provider);
    });

    if (!promoBooks.length) {
      return;
    }

    const booksByGenre = groupByGenre(promoBooks, 4);
    setBooksByGenre(booksByGenre);
    setGenres(Object.keys(booksByGenre));
  }, [books, loggedUser]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {booksByGenre && (
        <section id="popular-books" className="bookshelf">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-header align-center">
                  <div className="title">
                    <span>Намалени книги</span>
                  </div>
                  <h2 className="section-title">Промоции по жанр</h2>
                </div>
                <BookGenreTabs genres={genres} booksByGenre={booksByGenre} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    books: state.books,
    loggedUser: state.loggedUser,
    loading: state.apiCallsInProgress > 0,
  };
}

export const ConnectedPromoBookSection =
  connect(mapStateToProps)(PromoBookSection);
