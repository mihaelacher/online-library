import React, { useState } from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { useCart } from "react-use-cart";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProfileCardModal from "../auth/ProfileCardModal";
import CommentSection from "../common/CommentSection";
import BookRating from "../common/BookRating";
import { requestBookComment } from "../../store/mutations/commentMutations";
import { requestBookRating } from "../../store/mutations/ratingMutations";
import "./BookItemModal.css";
import BookFavoriteIcon from "../common/BookFavoriteIcon";

const BookItemModal = ({
  book,
  isOpen,
  setIsOpen,
  comments,
  loading,
  requestBookComment,
  requestBookRating,
}) => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { addItem } = useCart();

  const handleRating = async (event, value) => {
    event.preventDefault();
    const token = await getAccessTokenSilently();
    requestBookRating(user.nickname, book._id, value, token);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: "50%",
      left: "52%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "78%",
      height: "90%",
      zIndex: 80,
      overflowX: "hidden",
    },
  };

  return (
    <>
      <ReactModal
        style={customStyles}
        isOpen={isOpen}
        contentLabel="Book Modal"
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
      >
        <section>
          <div className="col-md-6">
            <img className="product-image" src={book.cover_url} alt="book" />
          </div>
          <div className="col-md-6">
            <BookRating
              rating={book.rating}
              isReadOnly={isAuthenticated ? false : true}
              header="Рейтинг"
              handleRating={handleRating}
            />
            <div className="product-detail">
              <h1 className="text-center">{book.title}</h1>
              <p>
                {book.author} <BookFavoriteIcon bookId={book.id} />
              </p>
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
                      За книгата
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
                      Коментари
                    </button>
                  </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active scrollable-div"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    Цена:{" "}
                    {book.promoPrice ? (
                      <div className="priceContainer">
                        <span className="price colored promoPrice">
                          {book.price}лв.
                        </span>
                        <span className="price colored">
                          {book.promoPrice}лв.
                        </span>
                      </div>
                    ) : (
                      <span className="price colored">{book.price}лв.</span>
                    )}
                    <p> {book.description} </p>
                    <div className="button-set">
                      {!isAuthenticated || user?.nickname !== book.provider ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-outline-light"
                            onClick={() => addItem(book)}
                            style={{ marginRight: "10px" }}
                          >
                            <FontAwesomeIcon
                              style={{ width: "2em" }}
                              icon="fa-solid fa-cart-arrow-down"
                            />
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-light"
                            onClick={() => setIsProfileOpen(true)}
                          >
                            <FontAwesomeIcon
                              style={{ width: "2em" }}
                              icon="fa-solid fa-person-chalkboard"
                            />
                          </button>
                        </>
                      ) : (
                        <FontAwesomeIcon
                          className="icon-button"
                          onClick={() => setIsProfileOpen(true)}
                          icon="fa-solid fa-file-pen"
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade scrollable-div"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    <section class="comments-wrap mb-4">
                      <div class="comment-list mt-4">
                        <CommentSection
                          bookId={book._id}
                          loading={loading}
                          comments={comments}
                          requestBookComment={requestBookComment}
                        />
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ReactModal>
      <ProfileCardModal
        isOpen={isProfileOpen}
        setIsOpen={setIsProfileOpen}
        username={book?.provider}
      />
    </>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    comments: state.comments.filter((element) => {
      return element?.bookId === ownProps.book._id;
    }),
    loading: state.apiCallsInProgress > 0,
    bookRatings: state.ratings.filter(
      (rating) => rating?.bookId === ownProps.book.id
    ),
  };
}

const mapDispatchToProps = {
  requestBookComment,
  requestBookRating,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookItemModal);
