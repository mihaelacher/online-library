import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

export const BookRating = ({
  rating,
  isReadOnly = true,
  header = "",
  handleRating,
}) => {
  return (
    <Box>
      {header.length > 0 && (
        <Typography component="legend">{header}</Typography>
      )}
      <StyledRating
        name="customized-color"
        defaultValue={rating}
        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        onChange={handleRating}
        readOnly={isReadOnly}
      />
    </Box>
  );
};

export default BookRating;
