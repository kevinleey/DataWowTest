"use client";

import { UserIcon } from "../constants";
import { createConcert } from "../actions";
import { useActionState, useEffect } from "react";
import ConcertSnackbar from "./ConcertSnackbar";

interface CreateFormProps {
  handleFormSuccess: () => void;
}

const initialState = {
  isSuccessful: false,
};

export default function CreateForm({ handleFormSuccess }: CreateFormProps) {
  const [state, formAction] = useActionState(createConcert, initialState);

  useEffect(() => {
    if (state?.isSuccessful) {
      handleFormSuccess();
    }
  });

  return (
    <div className="card-container">
      <h1 className="card-title">Create</h1>
      <div className="separator"></div>
      <form action={formAction}>
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
              placeholder="Please input description"
            />
          </div>
        </div>
        <button className="button create-form-save-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            height="20"
            width="20"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
            />
          </svg>
          <span className="small-icon-margin">Save</span>
        </button>
      </form>
    </div>
  );
}
