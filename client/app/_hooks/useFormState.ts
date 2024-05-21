import { ChangeEvent, useState } from "react";

interface FormState {
  concertName: string;
  totalSeats: string;
  description: string;
}

interface UseFormState {
  formState: FormState;
  errors: string[];
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  validateForm: () => boolean;
  setErrors: (errors: string[]) => void;
  resetForm: () => void;
}

export const useFormState = (): UseFormState => {
  const [formState, setFormState] = useState<FormState>({
    concertName: "",
    totalSeats: "",
    description: "",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = (): boolean => {
    const errors = [];
    if (!formState.concertName) errors.push("Concert name is required");
    if (!formState.totalSeats) errors.push("Total seats are required");
    if (!formState.description) errors.push("Description is required");
    setErrors(errors);
    return errors.length === 0;
  };

  const resetForm = () => {
    setFormState({
      concertName: "",
      totalSeats: "",
      description: "",
    });
    setErrors([]);
  };

  return {
    formState,
    errors,
    handleChange,
    validateForm,
    setErrors,
    resetForm,
  };
};
