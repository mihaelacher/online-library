import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { useCart } from "react-use-cart";
import { useAuth0 } from "@auth0/auth0-react";

import ProfileCardModal from "../auth/ProfileCardModal";
import CommentSection from "../common/CommentSection";
import { requestBookComment } from "../../store/mutations/commentMutations";
import "./BookItemModal.css";

const BookItemModal = ({
  book,
  isOpen,
  setIsOpen,
  comments,
  users,
  loading,
  requestBookComment,
}) => {
  const { isAuthenticated, user } = useAuth0();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [bookComments, setBookComments] = useState([]);
  const { addItem } = useCart();

  useEffect(() => {
    if (isOpen) {
      setBookComments(
        comments?.filter((element) => {
          console.log(element.bookId === book._id);
          return element.bookId === book._id;
        })
      );
    }
  }, [isOpen]);

  return (
    <>
      <ReactModal
        isOpen={isOpen}
        contentLabel="Book Modal"
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
      >
        <section className="bg-sand">
          <div className="container">
            <div className="col-md-6">
              <img className="product-image" src={book.cover_url} alt="book" />
            </div>
            <div className="col-md-6">
              <div className="product-detail">
                <h1 className="text-center">{book.title}</h1>
                <p>{book.author}</p>
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
                      {!isAuthenticated || user?.nickname !== book.provider ? (
                        <>
                          <button
                            name="add-to-cart"
                            className="button"
                            onClick={() => addItem(book)}
                          >
                            Добави в количка
                          </button>
                          <button
                            style={{ marginLeft: "30px" }}
                            className="button"
                            onClick={() => setIsProfileOpen(true)}
                          >
                            Публикувал
                          </button>
                        </>
                      ) : (
                        <button
                          style={{ marginLeft: "30px" }}
                          className="button"
                          onClick={() => setIsProfileOpen(true)}
                        >
                          Редактирай
                        </button>
                      )}
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
                            comments={bookComments}
                            users={users}
                            requestBookComment={requestBookComment}
                          />
                        </div>
                      </section>
                    </div>
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

function mapStateToProps(state) {
  return {
    users: state.users,
    comments: state.comments,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  requestBookComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookItemModal);
