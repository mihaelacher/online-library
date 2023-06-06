import React from "react";
import ImageList from "@mui/material/ImageList";

import BookListItem from "./BookListItem";

const BookListTabContent = ({ books, max = null }) => {
  return (
    <ImageList
      sx={{ marginLeft: "10%", width: "80%", height: "100%" }}
      cols={3}
    >
      {books.map((item, i) => {
        return (!max || (max && i <= max)) && <BookListItem book={item} />;
      })}
    </ImageList>
  );
};

export default BookListTabContent;
