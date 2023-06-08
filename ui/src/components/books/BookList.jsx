import React, { useState } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";

import BookListItem from "./BookListItem";

export const BookList = ({ books }) => {
  const [itemsPerRow, setItemsPerRow] = useState(4);

  const handleChangeItemsPerRow = (event) => {
    setItemsPerRow(event.target.value);
  };

  const calculateItemSize = () => {
    const screenWidth = window.innerWidth - 0.3 * window.innerWidth;
    const spacing = 8; // spacing between items
    const containerPadding = 32; // left and right padding of the container
    const availableWidth = screenWidth - containerPadding;
    const itemSize = Math.floor(availableWidth / itemsPerRow) - spacing;
    return itemSize;
  };

  const getItemSize = () => {
    return calculateItemSize();
  };

  return (
    <>
      <Box
        sx={{
          marginLeft: "5%",
          width: "90%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <ImageList
          sx={{ marginLeft: "10%", width: "80%", height: "100%" }}
          cols={itemsPerRow}
        >
          {books?.map((item) => (
            <BookListItem key={item.id} book={item} itemSize={getItemSize()} />
          ))}
        </ImageList>
      </Box>
    </>
  );
};

function mapStateToProps(state) {
  return {
    searchBooks: state.searchBooks,
    loading: state.apiCallsInProgress > 0,
  };
}

export default connect(mapStateToProps)(BookList);
