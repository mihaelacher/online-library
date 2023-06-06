import React from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";

import Loading from "../common/Loading";
import BookListItem from "./BookListItem";

export const BookList = ({ searchBooks, loading }) => {
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Box
        sx={{
          marginTop: "100px",
          marginLeft: "10%",
          width: "80%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <ImageList
          variant="woven"
          cols={3}
          gap={8}
          sx={{
            overflow: "hidden",
          }}
        >
          {searchBooks.map((item) => (
            <BookListItem key={item.id} book={item} />
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

export const ConnectedBookList = connect(mapStateToProps)(BookList);
