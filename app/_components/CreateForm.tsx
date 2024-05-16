"use client";

import { useState } from "react";
import { UserIcon } from "../constants";

export default function CreateForm() {
  const [concertName, setConcertName] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="card-container">
      <h1 className="card-title">Create</h1>
      <div className="separator"></div>
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
            placeholder="Please input concert name"
            onChange={(e) => setConcertName(e.target.value)}
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
            onChange={(e) => setTotalSeats(e.target.value)}
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
            placeholder="Please input description"
            onChange={(e) => setDescription(e.target.value)}
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
    </div>
  );
}
