import { Route } from "react-router-dom";

import ProfileLayout from "../layouts/ProfileLayout";
import Profile from "../components/auth/Profile";

const ProfileRoutes = (
  <Route path="/profile" element={<ProfileLayout />}>
    <Route index element={<Profile />} />
  </Route>
);

export default ProfileRoutes;
