import { UserIcon } from "../constants";
import { ChangeEvent, FormEvent, useState } from "react";

interface CreateFormProps {
  handleFormSuccess: (newConcert: any) => void;
}

export default function CreateForm({ handleFormSuccess }: CreateFormProps) {
  // Initialize state variables for the form fields
  const [concertName, setConcertName] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [description, setDescription] = useState("");

  const handleConcertNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConcertName(event.target.value);
  };

  const handleTotalSeatsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTotalSeats(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const body = {
      concertName,
      totalSeats: parseInt(totalSeats),
      description,
    };

    try {
      const response = await fetch("http://localhost:3001/concerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Concert created with ID:", data.id);
      handleFormSuccess({
        id: data.id,
        name: concertName,
        description: description,
        reservations: totalSeats,
      });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="card-container">
      <h1 className="card-title">Create</h1>
      <div className="separator"></div>
      <form onSubmit={handleSubmit}>
        <div className="create-form-field-container">
          <div className="section1">
            <label className="field-label" htmlFor="concertName">
              Concert Name
            </label>
            <input
              className="input"
              type="text"
              id="concertName"
              name="concertName"
              value={concertName}
              onChange={handleConcertNameChange}
              placeholder="Please input concert name"
            />
          </div>
          <div className="section2">
            <label className="field-label" htmlFor="totalSeats">
              Total Seats
            </label>
            <input
              className="input"
              type="number"
              id="totalSeats"
              name="totalSeats"
              value={totalSeats}
              onChange={handleTotalSeatsChange}
            />
            <div className="icon">{UserIcon}</div>
          </div>
          <div className="section3">
            <label className="field-label" htmlFor="description">
              Description
            </label>
            <textarea
              className="input"
              id="description"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Please input description"
            />
          </div>
        </div>
        <button type="submit" className="button create-form-save-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            height="20"
            width="20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
            />
          </svg>
          <span className="small-icon-margin">Save</span>
        </button>
      </form>
    </div>
  );
}
