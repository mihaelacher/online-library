import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { ConnectedProfileCard } from "./ProfileCard";

const Profile = () => {
  const { user } = useAuth0();
  console.log(user);
  return <ConnectedProfileCard showFollow={false} username={user?.nickname} />;
};

export default Profile;
