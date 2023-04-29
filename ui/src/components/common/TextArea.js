import React from "react";
import "./Validation.css";

function TextArea({
  name,
  value,
  labelText,
  rows,
  placeholder,
  onChange,
  error,
}) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {labelText}
      </label>
      <textarea
        name={name}
        className={`form-control ${error?.length ? "invalid" : ""}`}
        htmlFor={name}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      ></textarea>
      {error && <span>{error}</span>}
    </div>
  );
}

export default TextArea;
