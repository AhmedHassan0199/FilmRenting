import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ name, type, className, placeholder, value, onChange }) => {
  return (
    <input type={type || 'text'} className={`form-control ${className}`} name={name} placeholder={placeholder} value={value} onChange={onChange} />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
