import { useAuth0 } from "@auth0/auth0-react";
import Tooltip from "@mui/material/Tooltip";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

import UnReadMessage from "../talk/UnReadMessage";

export const AuthenticationButton = () => {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <>
          <UnReadMessage />
          <Tooltip title="Изход" placement="bottom">
            <ExitToAppRoundedIcon onClick={logout} />
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Вход" placement="bottom">
          <LoginRoundedIcon onClick={loginWithRedirect} />
        </Tooltip>
      )}
    </>
  );
};
