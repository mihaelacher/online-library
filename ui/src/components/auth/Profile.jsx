import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import { ConnectedProfileCard } from "./ProfileCard";
import Loading from "../common/Loading";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth0();
  return <div className="container"></div>;
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
