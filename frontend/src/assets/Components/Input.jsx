import React from "react";

export default function Input({ value, onChange, onSubmit, error }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-bold">API Input</label>
      <textarea
        className="form-control"
        rows="3"
        value={value}
        onChange={onChange}
        placeholder='Enter JSON (e.g. { "data": ["A", "1", "B"] })'
      />
      <button className="btn btn-primary w-100 mt-2" onClick={onSubmit}>
        Submit
      </button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}
