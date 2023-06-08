import React, { useState } from "react";
import { useCart } from "react-use-cart";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";

import BookItemModal from "./BookItemModal";
import BookRating from "../common/BookRating";
import BookFavoriteIcon from "../common/BookFavoriteIcon";

export const BookListItem = ({ book, itemSize }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { addItem } = useCart();

  return (
    <>
      <ImageListItem
        key={book.cover_url}
        sx={{ width: itemSize, height: itemSize }}
      >
        <img
          onClick={() => handleOpen(true)}
          src={`${book.cover_url}?w=248&fit=crop&auto=format`}
          srcSet={`${book.cover_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={book.title}
          loading="lazy"
        />
        <ImageListItemBar
          position="below"
          title={<BookRating rating={book.rating} />}
          subtitle={
            <span>
              "{book.title}" от {book.author}
            </span>
          }
          actionIcon={
            <IconButton sx={{ color: "rgba(255, 255, 255, 0.54)" }}>
              <BookFavoriteIcon bookId={book.id} />
            </IconButton>
          }
        />
      </ImageListItem>
      <BookItemModal
        book={book}
        open={open}
        handleClose={handleClose}
        addItem={addItem}
      ></BookItemModal>
    </>
  );
};

export default BookListItem;
