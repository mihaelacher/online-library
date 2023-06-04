import React from "react";
import Talk from "talkjs";
import { connect } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Loading from "../common/Loading";
import {
  requestFollowUser,
  requestUnfollowUser,
} from "../../store/mutations/userMutations";
import "./ProfileCard.css";

const ProfileCard = ({
  username,
  profileUser,
  loggedUser,
  loading,
  requestFollowUser,
  requestUnfollowUser,
}) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

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
    return profileUser.followers.includes(loggedUser?.nickname);
  };

  return (
    <div className="profile-card-container">
      <div className="team-member text-center">
        <h3>Профил</h3>
        <figure>
          <img src={profileUser?.pic} alt="post" className="member-image" />
        </figure>

        <div className="member-details text-center">
          <h4> {profileUser?.username}</h4>
          <div className="designation colored">
            Последвал: {profileUser?.following?.length}
          </div>
          <div className="designation colored">
            Последователи: {profileUser?.followers?.length}
          </div>
        </div>
        {isAuthenticated && !isMyProfile() && (
          <button
            type="button"
            className="btn btn-outline-light"
            style={{ marginRight: "5px" }}
            onClick={sendMessage}
          >
            <FontAwesomeIcon
              style={{ width: "2em" }}
              icon="fa-solid fa-comments"
            />
          </button>
        )}
        {isAuthenticated && !isMyProfile() && (
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={isFollowing() ? unFollowUser : followUser}
          >
            {isFollowing() ? (
              <FontAwesomeIcon
                style={{ width: "1em" }}
                icon="fa-solid fa-person-circle-minus"
              />
            ) : (
              <FontAwesomeIcon
                style={{ width: "2em" }}
                icon="fa-solid fa-person-circle-plus"
              />
            )}
          </button>
        )}
      </div>
    </div>
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
