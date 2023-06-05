import React, { useState } from "react";
import { connect } from "react-redux";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Loading from "../common/Loading";
import BookFavoriteIcon from "../common/BookFavoriteIcon";
import BookRating from "../common/BookRating";
import CommentSection from "../common/CommentSection";
import { requestBookComment } from "../../store/mutations/commentMutations";

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

export const BookFavorites = ({
  loggedUser,
  books,
  comments,
  loading,
  requestBookComment,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {!loggedUser.favorites?.length ? (
        <h1 style={{ textAlign: "center" }}>Няма добавени книги в любими!</h1>
      ) : (
        <div
          className="container"
          style={{ marginLeft: "auto", marginRight: "auto", width: "50%" }}
        >
          {loggedUser.favorites.map(function (bookId) {
            return (
              <Card
                sx={{ maxWidth: 700 }}
                style={{
                  marginBottom: "100px",
                  boxShadow: "10px 10px 30px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardHeader
                  title={books[bookId].title}
                  subheader={books[bookId].author}
                />
                <CardMedia
                  //   onClick={() => setIsOpen(true)}
                  component="img"
                  height="50"
                  src={books[bookId].cover_url}
                  alt="Paella dish"
                  style={{
                    maxWidth: "50%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
                <CardContent>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <BookRating rating={books[bookId].rating} />
                  </div>
                </CardContent>
                <CardActions disableSpacing>
                  <BookFavoriteIcon bookId={bookId} />
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
                    <Typography paragraph>
                      {books[bookId].description}
                    </Typography>
                    <CommentSection
                      bookId={bookId}
                      comments={comments}
                      requestBookComment={requestBookComment}
                    />
                  </CardContent>
                </Collapse>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUser,
    books: state.books,
    comments: state.comments,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  requestBookComment,
};

export default withAuthenticationRequired(
  connect(mapStateToProps, mapDispatchToProps)(BookFavorites),
  {
    onRedirecting: () => <Loading />,
  }
);
