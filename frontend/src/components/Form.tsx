import React, { useState, FunctionComponent } from 'react';
import './Form.css';

export interface FormProps {
  onSubmit: (value: string) => void;
  validator?: (value: string) => boolean;
  buttonText: string;
  initValue?: string;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  resetOnSubmit?: boolean;
}

const Form: FunctionComponent<FormProps> = ({
  onSubmit,
  buttonText,
  initValue = '',
  maxLength = Infinity,
  minLength = 0,
  placeholder = '',
  resetOnSubmit = false,
  validator = (value) => true,
  ...rest
}) => {
  const [value, setValue] = useState(initValue);

  const validInput =
    value.length >= minLength && value.length <= maxLength && validator(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validInput) return;
    onSubmit(value);
    if (resetOnSubmit) setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="form" {...rest}>
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
        className="form__text-input"
      />
      <button
        role="submit"
        disabled={!validInput}
        className="form__submit-button"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
