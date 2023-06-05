import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  requestAddToFavorites,
  requestRemoveFromFavorites,
} from "../../store/mutations/userMutations";

export const BookFavoriteIcon = ({
  bookId,
  loggedUser,
  requestAddToFavorites,
  requestRemoveFromFavorites,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (loggedUser) {
      setIsFavorite(loggedUser?.favorites?.includes(bookId));
    }
  }, [loggedUser, bookId]);

  const handleFavoritesClick = async () => {
    const token = await getAccessTokenSilently();
    console.log(bookId);
    if (isFavorite) {
      requestRemoveFromFavorites(loggedUser.username, bookId, token);
      setIsFavorite(false);
    } else {
      requestAddToFavorites(loggedUser.username, bookId, token);
      setIsFavorite(true);
    }
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleFavoritesClick}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUser,
  };
}

const mapDispatchToProps = {
  requestAddToFavorites,
  requestRemoveFromFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookFavoriteIcon);
