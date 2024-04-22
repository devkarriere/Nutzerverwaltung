import { ChangeEvent, useState } from "react";
import { ValidationError } from "../types/Validation";

export function useFormInput(value: string, required = false) {
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState<ValidationError>({
    isError: false,
    errorMessage: "",
  });

  console.log(value);

  function handleInputChangeEvent(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    validateInput(inputValue);
  }

  function validateInput(inputValue: string): boolean {
    console.log(inputValue);
    if (required) {
      if (inputValue === "") {
        // Setze einen Fehler
        setError({
          isError: true,
          errorMessage: "Bitte geben Sie einen Wert ein",
        });
        return false;
      } else {
        // Resette Fehler
        setError({ isError: false, errorMessage: "" });
        return true;
      }
    }
    return true;
  }

  return {
    value: inputValue,
    handleInputChangeEvent,
    error: error,
    validateInput: validateInput,
  };
}
