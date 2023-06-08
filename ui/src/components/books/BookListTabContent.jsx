import React from "react";
import ImageList from "@mui/material/ImageList";

import BookListItem from "./BookListItem";

const BookListTabContent = ({ books, maxIndex = null }) => {
  return (
    <ImageList
      sx={{ marginLeft: "10%", width: "80%", height: "100%" }}
      cols={3}
    >
      {books.map((item, i) => {
        return (
          (!maxIndex || (maxIndex && i <= maxIndex)) && (
            <BookListItem book={item} key={item.id} />
          )
        );
      })}
    </ImageList>
  );
};

export default BookListTabContent;
