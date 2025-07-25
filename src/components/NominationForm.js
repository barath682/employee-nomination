"use client";
import { useState } from "react";
import "./NominationForm.css"; // adjust the path if needed

export default function NominationForm() {
  const [formData, setFormData] = useState({
    nomineeName: "",
    nominatedBy: "",
    reason: "",
    month: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/nominations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // include this
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      alert("Nomination submitted!");
      setFormData({ nomineeName: "", nominatedBy: "", reason: "", month: "" });
    } else {
      alert("Error submitting nomination.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="heading">Nominate an Employee</h2>

      <input
        name="nomineeName"
        type="text"
        placeholder="Nominee Name"
        value={formData.nomineeName}
        onChange={handleChange}
        className="input-field"
        required
      />

      <input
        name="nominatedBy"
        type="text"
        placeholder="Your Name"
        value={formData.nominatedBy}
        onChange={handleChange}
        className="input-field"
        required
      />

      <textarea
        name="reason"
        placeholder="Reason for nomination"
        value={formData.reason}
        onChange={handleChange}
        className="textarea-field"
        rows={3}
        required
      />

      <input
        name="month"
        type="month"
        value={formData.month}
        onChange={handleChange}
        className="month-input"
        required
      />

      <button type="submit" className="submit-button">
        Submit Nomination
      </button>
    </form>
  );
}
