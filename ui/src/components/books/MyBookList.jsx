import React, { useState, useEffect } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import BookItemForm from "./BookItemForm";
import BookListTabContent from "./BookListTabContent";
import TabPanel from "../common/TabPanel";
import Loading from "../common/Loading";
import "./MyBookList.css";

export const MyBookList = ({ loggedUser, books, loading }) => {
  const [rentedBooks, setRentedBooks] = useState([]);
  const [providedBooks, setProvidedBooks] = useState([]);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (loggedUser) {
      const rentedBooks = loggedUser?.orders
        ?.map(({ bookIds }) => bookIds)
        .flat();
      setRentedBooks(
        Object.values(books).filter((book) => {
          return rentedBooks?.includes(book.id);
        })
      );

      setProvidedBooks(
        Object.values(books).filter(
          (book) => book.provider === loggedUser?.username
        )
      );
    }
  }, [loggedUser, books]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {loading ? (
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
              label="Наети книги"
              sx={{
                "&.Mui-selected": {
                  color: "#908f8c",
                },
              }}
            />
            <Tab
              label="Публикувани книги"
              sx={{
                "&.Mui-selected": {
                  color: "#908f8c",
                },
              }}
            />
            <Tab
              label="Качи книга"
              sx={{
                "&.Mui-selected": {
                  color: "#908f8c",
                },
              }}
            />
          </Tabs>
          <TabPanel value={value} index={0}>
            <BookListTabContent books={rentedBooks} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BookListTabContent books={providedBooks} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <BookItemForm />
          </TabPanel>
        </Box>
      )}
    </>
  );
};

export default withAuthenticationRequired(MyBookList, {
  onRedirecting: () => <Loading />,
});
