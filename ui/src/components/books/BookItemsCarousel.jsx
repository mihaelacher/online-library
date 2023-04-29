import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import BookItemsRow from "./BookItemsRow";
import Loading from "../common/Loading";
import { groupByGenre } from "../../utils/books/bookMapService";
import "./BookItemsCarousel.css";

export const BookItemsCarousel = ({ books, loading }) => {
  const [carouselBooks, setCarouselBooks] = useState(null);
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    const booksGroupedByGenre = groupByGenre(books, 3);
    setCarouselBooks(booksGroupedByGenre);
    setGenres(Object.keys(booksGroupedByGenre));
  }, [books]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="carousel-section">
      {genres &&
        genres.map(function (genre, i) {
          return (
            <Carousel showThumbs={false} autoPlay infiniteLoop key={i}>
              {carouselBooks[genre]?.map(function (bookRow, i) {
                return (
                  <BookItemsRow
                    genre={genre}
                    books={bookRow}
                    key={i}
                  ></BookItemsRow>
                );
              })}
            </Carousel>
          );
        })}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    books: state.books,
    loading: state.apiCallsInProgress > 0,
  };
}

export const ConnectedBookItemsCarousel =
  connect(mapStateToProps)(BookItemsCarousel);
