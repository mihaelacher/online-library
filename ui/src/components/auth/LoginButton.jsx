import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button className="btn" onClick={loginWithRedirect}>
      <i>
        <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />
      </i>
    </button>
  );
};

export default LoginButton;
