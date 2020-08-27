import React from "react";
import PropTypes from "prop-types";

export const Input = ({
  ref,
  htmlFor,
  name,
  type,
  className,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      ref={ref}
      htmlFor={htmlFor}
      type={type || "text"}
      className={`form-control ${className}`}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

Input.propTypes = {
  htmlFor: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
