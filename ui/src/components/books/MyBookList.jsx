import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import BookItem from "./BookItem";
import BookItemForm from "./BookItemForm";
import Loading from "../common/Loading";
import "./MyBookList.css";

export const MyBookList = ({ loggedUser, books, loading }) => {
  const [rentedBooks, setRentedBooks] = useState([]);
  const [providedBooks, setProvidedBooks] = useState([]);

  useEffect(() => {
    if (loggedUser) {
      const rentedBooks = loggedUser?.orders
        ?.map(({ bookIds }) => bookIds)
        .flat();
      setRentedBooks(
        books.filter((book) => {
          return rentedBooks?.includes(book.id);
        })
      );

      setProvidedBooks(
        books?.filter((book) => book.provider === loggedUser?.username)
      );
    }
  }, [loggedUser]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="padding-large">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="bootstrap-tabs">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <button
                        className="nav-link active"
                        id="nav-home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-home"
                        type="button"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                      >
                        Наети от мен
                      </button>
                      <button
                        className="nav-link"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                      >
                        Публикувани от мен
                      </button>
                      <button
                        className="nav-link"
                        id="nav-contact-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-contact"
                        type="button"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                      >
                        Качи книга
                      </button>
                    </div>
                  </nav>
                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      {rentedBooks?.map(function (book, i) {
                        return <BookItem book={book} key={i}></BookItem>;
                      })}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      {providedBooks?.map(function (book, i) {
                        return <BookItem book={book} key={i}></BookItem>;
                      })}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-contact"
                      role="tabpanel"
                      aria-labelledby="nav-contact-tab"
                    >
                      <BookItemForm />
                    </div>
                  </div>
                </div>
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

export default withAuthenticationRequired(
  connect(mapStateToProps)(MyBookList),
  {
    onRedirecting: () => <Loading />,
  }
);
