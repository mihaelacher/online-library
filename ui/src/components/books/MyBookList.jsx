import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BookItem from "./BookItem";
import Loading from "../common/Loading";
import "./MyBookList.css";

export const MyBookList = ({ loggedUser, books, loading }) => {
  const [items, setItems] = useState([]);
  const [isRented, _setIsRented] = useState(true);
  const [isProvided, _setIsProvided] = useState(false);

  function setIsRented() {
    _setIsRented(true);
    _setIsProvided(false);
    const rentedBooks = loggedUser?.orders
      ?.map(({ bookIds }) => bookIds)
      .flat();
    setItems(
      books.filter((book) => {
        return rentedBooks.includes(book.id);
      })
    );
  }

  function setIsProvided() {
    _setIsRented(false);
    _setIsProvided(true);
    setItems(books?.filter((book) => book.provider === loggedUser?.username));
  }

  useEffect(() => {
    if (loggedUser) {
      setIsRented();
    }
  }, [loggedUser]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="tab">
                <ul className="nav nav-tabs">
                  <button
                    className={`btn mb-2 mb-md-0 btn-outline-primary btn-block ${
                      isRented ? "selected" : ""
                    }`}
                    onClick={() => setIsRented()}
                  >
                    <span>Наети от мен</span>
                  </button>
                  <button
                    className={`btn mb-2 mb-md-0 btn-outline-primary btn-block ${
                      isProvided ? "selected" : ""
                    }`}
                    onClick={() => setIsProvided()}
                  >
                    <span>Публикувани от мен</span>
                  </button>
                  {isProvided && (
                    <Link to="/book">
                      <button className="btn mb-2 mb-md-0 btn-tertiary add-btn-block btn-round">
                        <span>Качи книга</span>
                        <div className="icon icon-round d-flex align-items-center justify-content-center">
                          <i>
                            <FontAwesomeIcon icon="fa-solid fa-cloud-arrow-up" />
                          </i>
                        </div>
                      </button>
                    </Link>
                  )}
                </ul>
                <div className="tab-content">
                  <div className="wrapper">
                    {items?.map(function (book, i) {
                      return <BookItem book={book} key={i}></BookItem>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
