import React from "react";
import "./Validation.css";

function Input({ name, value, labelText, type, placeholder, onChange, error }) {
  return (
    <div className="form-group">
      <label className="form-label font-semibold capitalize" htmlFor={name}>
        {labelText}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={`form-control ${error?.length ? "invalid" : ""}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error && <span>{error}</span>}
    </div>
  );
}

export default Input;
