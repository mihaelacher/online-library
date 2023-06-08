import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Avatar from "@mui/material/Avatar";

import MyBookList from "../books/MyBookList";
import Loading from "../common/Loading";
import "./Profile.css";

const Profile = ({ users, books, loading }) => {
  const { user } = useAuth0();
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [providedBooksCount, setProvidedBooksCount] = useState(0);

  useEffect(() => {
    const profileUsername = username ?? user?.nickname;
    if (profileUsername && users) {
      setProfileUser(users[profileUsername]);

      const providedBooks = Object.values(books)?.filter(
        (book) => book.provider === profileUsername
      );
      setProvidedBooksCount(providedBooks?.length);
    }
  }, [username, users, books, user]);

  return (
    <div class="container">
      <div class="profile">
        <div class="profile-image">
          <Avatar
            alt="profilepic"
            src={profileUser?.pic}
            sx={{ width: 120, height: 120 }}
          />
        </div>

        <div class="profile-user-settings">
          <h1 class="profile-user-name">{profileUser?.username}</h1>
        </div>

        {!loading && (
          <div class="profile-stats">
            <ul>
              <li>
                <span class="profile-stat-count">{providedBooksCount}</span>{" "}
                публикувани книги
              </li>
              <li>
                <span class="profile-stat-count">{providedBooksCount}</span>{" "}
                наети книги
              </li>
              <li>
                <span class="profile-stat-count">
                  {profileUser?.followers?.length ?? 0}
                </span>{" "}
                последователи
              </li>
              <li>
                <span class="profile-stat-count">
                  {profileUser?.following?.length ?? 0}
                </span>{" "}
                следва
              </li>
            </ul>
          </div>
        )}
      </div>
      <MyBookList
        loggedUser={user}
        profileUser={profileUser}
        books={books}
        loading={loading}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    books: state.books,
    users: state.users,
    loading: state.apiCallsInProgress > 0,
  };
}

export default withAuthenticationRequired(connect(mapStateToProps)(Profile), {
  onRedirecting: () => <Loading />,
});
