import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import TabPanel from "../common/TabPanel";
import BookListTabContent from "./BookListTabContent";

function BookGenreTabs({ genres, booksByGenre }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
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
          {genres &&
            genres.map(function (genre, i) {
              return (
                <Tab
                  key={i}
                  label={genre}
                  sx={{
                    "&.Mui-selected": {
                      color: "#908f8c",
                    },
                  }}
                />
              );
            })}
        </Tabs>
      </Box>
      {genres &&
        genres.map(function (genre, genreIndex) {
          return (
            <TabPanel value={value} index={genreIndex}>
              <BookListTabContent books={booksByGenre[genre]} maxIndex={5} />
            </TabPanel>
          );
        })}
    </>
  );
}

export default BookGenreTabs;
