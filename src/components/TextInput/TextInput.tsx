import { ChangeEventHandler } from "react";
import "./textInput.scss";
import { ValidationError } from "../../types/Validation";

type TextInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error: ValidationError;
};

function TextInput({ value, onChange, error }: TextInputProps) {
  console.log(value);
  function displayError() {
    if (error.isError) {
      return <span className="input-error">{error.errorMessage}</span>;
    }
  }

  return (
    <>
      <input
        type="text"
        className="input-text"
        value={value}
        onChange={onChange}
      />
      {displayError()}
    </>
  );
}

export default TextInput;
