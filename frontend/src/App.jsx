import { useState } from "react";
import axios from "axios";
import JsonInput from "./assets/Components/Input";
import ResponseDisplay from "./assets/Components/ResponseDisplay";
import Select from "react-select"; 
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null); 
  const [error, setError] = useState(""); // Error handling
  const [selectedFilters, setSelectedFilters] = useState([]); 

  const filterOptions = [
    { value: "Alphabets", label: "Alphabets" },
    { value: "Numbers", label: "Numbers" },
    { value: "Highest Alphabet", label: "Highest Alphabet" },
  ];

  const handleJsonChange = (event) => {
    setJsonInput(event.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON format. Must contain a 'data' array.");
      }

      // 🔹 Updated Backend Endpoint
      const response = await axios.post("https://bajaj-flax.vercel.app/process", parsedInput, {
        headers: { "Content-Type": "application/json" },
      });

      setResponseData(response.data);
      setSelectedFilters([]); 
    } catch (err) {
      console.error("API Error:", err);
      setError("Invalid JSON input or API error. Ensure JSON format is correct.");
      setResponseData(null);
    }
  };

  return (
    <div className="container mt-5">
      <JsonInput value={jsonInput} onChange={handleJsonChange} onSubmit={handleSubmit} error={error} />

      {responseData && (
        <div className="mb-3">
          <label className="form-label fw-bold">Multi Filter</label>
          <Select
            isMulti
            options={filterOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            value={filterOptions.filter((option) => selectedFilters.includes(option.value))}
            onChange={(selectedOptions) => setSelectedFilters(selectedOptions.map((option) => option.value))}
          />
        </div>
      )}

      {responseData && <ResponseDisplay data={responseData} filters={selectedFilters} />}
    </div>
  );
}
