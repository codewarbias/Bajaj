import React from "react";

export default function ResponseDisplay({ data, filters }) {
  const filteredData = () => {
    let result = {};
    if (filters.includes("Alphabets")) result.alphabets = data.alphabets;
    if (filters.includes("Numbers")) result.numbers = data.numbers;
    if (filters.includes("Highest Alphabet")) result.highestAlphabet = data.highestAlphabet;
    return result;
  };

  return (
    <div className="mt-3">
      <h5 className="fw-bold">Filtered Response</h5>
      {filters.includes("Numbers") && <p><strong>Numbers:</strong> {data.numbers.join(", ")}</p>}
      {filters.includes("Alphabets") && <p><strong>Alphabets:</strong> {data.alphabets.join(", ")}</p>}
      {filters.includes("Highest Alphabet") && <p><strong>Highest Alphabet:</strong> {data.highestAlphabet}</p>}
    </div>
  );
}
