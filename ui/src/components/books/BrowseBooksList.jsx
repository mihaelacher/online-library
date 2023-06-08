import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import TabPanel from "../common/TabPanel";
import Loading from "../common/Loading";
import { BookList } from "./BookList";
import {
  sortBooksByCommentsCount,
  sortBooksByRating,
  sortBooksBySelling,
} from "../../utils/common/bookUtil";

function BrowseBookList({ books, comments, loading }) {
  const [value, setValue] = useState(0);
  const [sortedBooks, setSortedBooks] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Sort the books based on the selected tab
    switch (newValue) {
      case 0:
        setSortedBooks(sortBooksByRating(Object.values(books)));
        break;
      case 1:
        setSortedBooks(sortBooksBySelling(Object.values(books)));
        break;
      case 2:
        setSortedBooks(sortBooksByCommentsCount(books, comments));
        break;
      default:
        setSortedBooks([]);
        break;
    }
  };

  useEffect(() => {
    if (books) {
      setSortedBooks(sortBooksByRating(Object.values(books)));
    }
  }, [books, comments]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {loading && sortedBooks.length > 0 ? (
        <Loading />
      ) : (
        <Box sx={{ width: "100%", bgcolor: "#f3f2ec" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#908f8c",
              },
            }}
          >
            <Tab
              index={0}
              label="Най-добър рейтинг"
              sx={{
                "&.Mui-selected": {
                  color: "#908f8c",
                },
              }}
            />
            <Tab
              index={1}
              label="Най-продавани"
              sx={{
                "&.Mui-selected": {
                  color: "#908f8c",
                },
              }}
            />
            <Tab
              index={2}
              label="Най-коментирани"
              sx={{
                "&.Mui-selected": {
                  color: "#908f8c",
                },
              }}
            />
          </Tabs>
          <TabPanel value={value} index={value}>
            <BookList books={sortedBooks} />
          </TabPanel>
        </Box>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    books: state.books,
    comments: state.comments,
    loading: state.apiCallsInProgress > 0,
  };
}

export default connect(mapStateToProps)(BrowseBookList);
