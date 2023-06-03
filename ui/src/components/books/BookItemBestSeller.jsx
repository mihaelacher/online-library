import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Loading from "../common/Loading";

export const BookItemBestSeller = ({ books, users, loading }) => {
  const [bestSeller, setBestSeller] = useState(null);

  useEffect(() => {
    let rentedBooks = [];
    Object.values(users).forEach((user) => {
      rentedBooks = rentedBooks.concat(
        user?.orders?.map(({ bookIds }) => bookIds)
      );
    });
    rentedBooks = rentedBooks.filter((e) => e).flat();

    const booksRentCount = rentedBooks.reduce(function (obj, bookId) {
      if (!obj[bookId]) {
        obj[bookId] = 1;
      } else {
        obj[bookId]++;
      }
      return obj;
    }, {});

    const sorted = Object.fromEntries(
      Object.entries(booksRentCount).sort(([, a], [, b]) => b - a)
    );

    setBestSeller(books.find((book) => book.id === Object.keys(sorted)[0]));
  }, [users, books]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section id="best-selling" className="leaf-pattern-overlay">
      <div className="corner-pattern-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="row">
              <div className="col-md-6">
                <figure className="products-thumb">
                  <img
                    src={bestSeller?.cover_url}
                    alt="book"
                    className="single-image"
                  />
                </figure>
              </div>

              <div className="col-md-6">
                <div className="product-entry">
                  <h2 className="section-title divider">Бест селър</h2>

                  <div className="products-content">
                    <div className="author-name">От {bestSeller?.author}</div>
                    <h3 className="item-title">{bestSeller?.title}</h3>
                    <p>{bestSeller?.description?.slice(0, 150)}...</p>
                    <div className="item-price">{bestSeller?.price}лв.</div>
                    <div className="btn-wrap">
                      <a className="btn-accent-arrow">
                        Наеми сега <i className="icon icon-ns-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function mapStateToProps(state) {
  return {
    books: state.books,
    users: state.users,
    loading: state.apiCallsInProgress > 0,
  };
}

export const ConnectedBookItemBestSeller =
  connect(mapStateToProps)(BookItemBestSeller);
