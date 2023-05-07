import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Loading from "../common/Loading";

export const BookItemBestSeller = ({ books, users, loading }) => {
  const [bestSeller, setBestSeller] = useState(null);

  useEffect(() => {
    let rentedBooks = [];
    users.forEach((user) => {
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
    <section id="best-selling" class="leaf-pattern-overlay">
      <div class="corner-pattern-overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <div class="row">
              <div class="col-md-6">
                <figure class="products-thumb">
                  <img
                    src={bestSeller?.cover_url}
                    alt="book"
                    class="single-image"
                  />
                </figure>
              </div>

              <div class="col-md-6">
                <div class="product-entry">
                  <h2 class="section-title divider">Бест селър</h2>

                  <div class="products-content">
                    <div class="author-name">От {bestSeller?.author}</div>
                    <h3 class="item-title">{bestSeller?.title}</h3>
                    <p>{bestSeller?.description?.slice(0, 150)}...</p>
                    <div class="item-price">{bestSeller?.price}лв.</div>
                    <div class="btn-wrap">
                      <a class="btn-accent-arrow">
                        Наеми сега <i class="icon icon-ns-arrow-right"></i>
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
