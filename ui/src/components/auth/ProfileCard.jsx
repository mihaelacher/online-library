import React from "react";
import Talk from "talkjs";
import { connect } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import GroupRemoveRoundedIcon from "@mui/icons-material/GroupRemoveRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";

import Loading from "../common/Loading";
import {
  requestFollowUser,
  requestUnfollowUser,
} from "../../store/mutations/userMutations";

const clickableStyle = {
  cursor: "pointer",
};

const ProfileCard = ({
  username,
  profileUser,
  loggedUser,
  loading,
  requestFollowUser,
  requestUnfollowUser,
}) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  const followUser = async (e) => {
    e.preventDefault();

    const token = await getAccessTokenSilently();

    requestFollowUser(loggedUser.username, username, token);
  };

  const unFollowUser = async (e) => {
    e.preventDefault();

    const token = await getAccessTokenSilently();

    requestUnfollowUser(loading.username, username, token);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    const me = new Talk.User({
      id: loggedUser._id,
      name: loggedUser.username,
      photoUrl: loggedUser.pic,
    });

    const session = new Talk.Session({
      appId: "tKSRSJUl",
      me: me,
    });

    const other = new Talk.User({
      id: profileUser._id,
      name: profileUser.username,
      photoUrl: profileUser.pic,
    });

    const conversation = session.getOrCreateConversation(
      Talk.oneOnOneId(me, other)
    );
    conversation.setParticipant(me);
    conversation.setParticipant(other);
    const popup = session.createPopup();
    popup.select(conversation);
    popup.mount({ show: true });
  };

  const isMyProfile = () => {
    if (!loggedUser) {
      return false;
    }
    return loggedUser.username === profileUser?.username;
  };

  const isFollowing = () => {
    return profileUser?.followers?.includes(loggedUser?.nickname);
  };

  const navigateToProfile = (username) => {
    navigate("/profile/" + username);
  };

  return (
    <Card sx={{ display: "flex", bgcolor: "#f7f6f4" }}>
      <CardMedia
        component="img"
        sx={{ width: 151, ...clickableStyle }}
        src={profileUser?.pic}
        alt="profilePic"
        onClick={() => navigateToProfile(profileUser.username)}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {profileUser?.username}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Последователи: {profileUser?.followers?.length}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Последвал: {profileUser?.following?.length}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          {isAuthenticated && !isMyProfile() && (
            <>
              <IconButton aria-label="previous">
                {!isFollowing() ? (
                  <GroupAddRoundedIcon
                    onClick={followUser}
                    sx={{ clickableStyle }}
                  />
                ) : (
                  <GroupRemoveRoundedIcon
                    onClick={unFollowUser}
                    sx={{ clickableStyle }}
                  />
                )}
              </IconButton>
              <IconButton aria-label="next">
                <ChatRoundedIcon
                  onClick={sendMessage}
                  sx={{ clickableStyle }}
                />
              </IconButton>
            </>
          )}
        </Box>
      </Box>
    </Card>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    profileUser: Object.values(state.users).find(
      (user) => user.username === ownProps.username
    ),
    loggedUser: state.loggedUser,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  requestFollowUser,
  requestUnfollowUser,
};

export const ConnectedProfileCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileCard);
