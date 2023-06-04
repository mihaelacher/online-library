import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import BookRating from "../common/BookRating";
import BookItemModal from "./BookItemModal";
import { getTimeDifference } from "../../utils/common/timeUtil";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const BookRatingReel = ({ rating, books, users }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { addItem } = useCart();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card
      sx={{ maxWidth: 700 }}
      style={{
        marginBottom: "100px",
        boxShadow: "10px 10px 30px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} src={users[rating.username].pic}>
            R
          </Avatar>
        }
        title={users[rating.username].username}
        subheader={
          "Оцени " +
          getTimeDifference(rating.timestamp) +
          " с " +
          rating.value +
          " звезди"
        }
      />
      <CardMedia
        onClick={() => setIsOpen(true)}
        component="img"
        height="50"
        src={books[rating.bookId].cover_url}
        alt="Paella dish"
        style={{
          maxWidth: "50%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <CardContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <BookRating rating={rating.value} />
        </div>
        <Typography variant="body2" color="text.secondary">
          {books[rating.bookId].title} - {books[rating.bookId].author}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{books[rating.bookId].description}</Typography>
        </CardContent>
      </Collapse>
      <BookItemModal
        book={books[rating.bookId]}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addItem={addItem}
      ></BookItemModal>
    </Card>
  );
};

export default BookRatingReel;
