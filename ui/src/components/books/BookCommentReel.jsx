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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import BookRating from "../common/BookRating";
import CommentSection from "../common/CommentSection";
import BookFavoriteIcon from "../common/BookFavoriteIcon";
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

export const BookCommentReel = ({
  comment,
  books,
  users,
  comments,
  requestBookComment,
}) => {
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
          <Avatar sx={{ bgcolor: red[500] }} src={users[comment.username].pic}>
            R
          </Avatar>
        }
        title={users[comment.username].username}
        subheader={"Коментира " + getTimeDifference(comment.timestamp)}
      />
      <CardMedia
        onClick={() => setIsOpen(true)}
        component="img"
        height="50"
        src={books[comment.bookId].cover_url}
        alt="Paella dish"
        style={{
          maxWidth: "50%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <CardContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <BookRating rating={books[comment.bookId].rating} />
        </div>
        <Typography variant="body2" color="text.secondary">
          {books[comment.bookId].title} - {books[comment.bookId].author}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <BookFavoriteIcon bookId={comment.bookId} />
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
          <CommentSection
            bookId={comment.bookId}
            comments={comments}
            requestBookComment={requestBookComment}
          />
        </CardContent>
      </Collapse>
      <BookItemModal
        book={books[comment.bookId]}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addItem={addItem}
      ></BookItemModal>
    </Card>
  );
};

export default BookCommentReel;
