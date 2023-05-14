import React from "react";
import { connect } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

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
            onClick={isFollowing() ? unFollowUser : followUser}
          >
            {isFollowing() ? "Следвам" : "Последвай"}
          </button>
        )}
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    profileUser: state.users.find(
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
