import React from "react";

function Button({ name, onClick, isDisabled }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="btn btn-primary btn-block mb-4"
      disabled={isDisabled}
    >
      {name}
    </button>
  );
}

export default Button;
