import React from "react";
import PropTypes from "prop-types";

export const Input = ({
  type,
  name,
  className,
  placeholder,
  label,
  errors,
  register,
  required,
  minLength,
}) => {
  const error = errors[name]?.message;
  const inputClassName = error ? "form-control is-invalid" : "form-control";
  return (
    <>
      {label && <label>{label}</label>}
      <input
        name={name}
        type={type || "text"}
        className={`${inputClassName} ${className}`}
        placeholder={placeholder || ""}
        ref={register({ required, minLength: minLength })}
      />
      <div className="invalid-feedback d-block">{error}</div>
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  errors: PropTypes.object,
  register: PropTypes.func,
};
