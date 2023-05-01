import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import { ConnectedProfileCard } from "./ProfileCard";
import Loading from "../common/Loading";

const Profile = () => {
  const { user } = useAuth0();
  console.log(user);
  return <ConnectedProfileCard showFollow={false} username={user?.nickname} />;
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
