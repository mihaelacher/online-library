import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      className="btn btn-quarternary btn-right btn-round"
      onClick={logout}
    >
      <i>
        <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
      </i>
    </button>
  );
};

export default LogoutButton;
