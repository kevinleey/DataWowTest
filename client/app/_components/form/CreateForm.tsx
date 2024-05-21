import { ChangeEvent, FormEvent } from "react";
import { useConcerts } from "../../_context/ConcertContext";
import FormField from "./FormField";
import ErrorMessages from "./ErrorMessages";
import { useFormState } from "../../_hooks/useFormState";
import { SaveIcon, UserIcon } from "../../_assets/constants";

interface CreateFormProps {
  handleFormSuccess: () => void;
}

const CreateForm: React.FC<CreateFormProps> = ({ handleFormSuccess }) => {
  const { createConcert } = useConcerts();
  const {
    formState: { concertName, totalSeats, description },
    errors,
    handleChange,
    validateForm,
    setErrors,
    resetForm,
  } = useFormState();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    const concertData = {
      name: concertName,
      reservations: parseInt(totalSeats),
      description,
    };

    const errorMessage = await createConcert(concertData);
    if (errorMessage) {
      setErrors(errorMessage.split(", "));
    } else {
      handleFormSuccess();
      resetForm();
    }
  };

  return (
    <div className="card-container">
      <h1 className="card-title">Create</h1>
      <div className="separator"></div>
      <form onSubmit={handleSubmit}>
        <div className="create-form-field-container">
          <FormField
            id="concertName"
            label="Concert Name"
            value={concertName}
            onChange={handleChange}
            placeholder="Please input concert name"
          />
          <div className="section2">
            <FormField
              id="totalSeats"
              label="Total Seats"
              value={totalSeats}
              onChange={handleChange}
              type="number"
            />
            <div className="icon">{UserIcon}</div>
          </div>
          <FormField
            id="description"
            label="Description"
            value={description}
            onChange={handleChange}
            type="textarea"
            placeholder="Please input description"
          />
        </div>
        <ErrorMessages errors={errors} />
        <button type="submit" className="button create-form-save-button">
          {SaveIcon}
          <span className="small-icon-margin">Save</span>
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
