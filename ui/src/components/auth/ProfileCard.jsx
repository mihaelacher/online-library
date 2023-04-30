import React from "react";
import { connect } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import Loading from "../common/Loading";

const ProfileCard = ({
  username,
  sizeClass = "col col-md-9 col-lg-7 col-xl-5",
  profileUser,
  loading,
}) => {
  const { user } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className={sizeClass}>
          <div className="card" style={{ borderRadius: "15px" }}>
            <div className="card-body p-4">
              <div className="d-flex text-black">
                <div className="flex-shrink-0">
                  <img
                    className="img-fluid"
                    style={{
                      width: "180px",
                      borderRadius: "10px",
                      marginTop: "5%",
                    }}
                    src={profileUser?.pic}
                    alt="profile-pic"
                  />
                </div>
                <div className="flex-grow-1 ms-3">
                  <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>
                    {profileUser?.username}
                  </p>
                  <div
                    class="d-flex justify-content-start rounded-3 p-2 mb-2"
                    style={{ backgroundColor: "#efefef" }}
                  >
                    <div>
                      <p class="small text-muted mb-1">Последвал</p>
                      <p class="mb-0">{profileUser?.following.length}</p>
                    </div>
                    <div class="px-3">
                      <p class="small text-muted mb-1">Последователи</p>
                      <p class="mb-0">{profileUser?.followers.length}</p>
                    </div>
                  </div>
                  <div class="d-flex pt-1">
                    {user?.nickname !== profileUser?.username && (
                      <button type="button" class="btn btn-primary flex-grow-1">
                        Follow
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    profileUser: state.users.find(
      (user) => user.username === ownProps.username
    ),
    loading: state.apiCallsInProgress > 0,
  };
}

export const ConnectedProfileCard = connect(mapStateToProps)(ProfileCard);
