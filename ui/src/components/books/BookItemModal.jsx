import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { connect } from "react-redux";
import { useCart } from "react-use-cart";
import { useAuth0 } from "@auth0/auth0-react";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";

import ProfileCardModal from "../auth/ProfileCardModal";
import CommentSection from "../common/CommentSection";
import BookRating from "../common/BookRating";
import { requestBookComment } from "../../store/mutations/commentMutations";
import { requestBookRating } from "../../store/mutations/ratingMutations";
import BookFavoriteIcon from "../common/BookFavoriteIcon";
import "./BookItemModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: 700,
  bgcolor: "#f7f6f4",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const BookItemModal = ({
  book,
  open,
  handleClose,
  comments,
  loading,
  requestBookComment,
  requestBookRating,
}) => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { addItem } = useCart();

  const [childModalOpen, setChildModalOpen] = useState(false);
  const handleChildModalOpen = () => setChildModalOpen(true);
  const handleChildModalClose = () => setChildModalOpen(false);

  const handleRating = async (event, value) => {
    event.preventDefault();
    const token = await getAccessTokenSilently();
    requestBookRating(user.nickname, book._id, value, token);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <section>
            <div className="col-md-6">
              <img className="product-image" src={book.cover_url} alt="book" />
            </div>
            <div className="col-md-6">
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "auto" }}>
                  <BookRating
                    rating={book.rating}
                    isReadOnly={isAuthenticated ? false : true}
                    header="Рейтинг"
                    handleRating={handleRating}
                  />
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <Tooltip title="Добави в количка" placement="bottom">
                    <AddShoppingCartRoundedIcon
                      title="Добави в количка"
                      style={{ cursor: "pointer" }}
                      onClick={() => addItem(book)}
                    />
                  </Tooltip>
                  <Tooltip title="Потребител" placement="bottom">
                    <AccountBoxRoundedIcon
                      onClick={() => handleChildModalOpen(true)}
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                </div>
              </div>
              <div className="product-detail">
                <h1 className="text-center">
                  {book.title}{" "}
                  {isAuthenticated ?? <BookFavoriteIcon bookId={book.id} />}
                </h1>
                <div>
                  <p>{book.author}</p>
                </div>
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
        </Box>
      </Modal>
      <ProfileCardModal
        open={childModalOpen}
        handleClose={handleChildModalClose}
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
