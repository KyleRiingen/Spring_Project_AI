import { useState } from "react";

const TestFetch = () => {
  const [inputText, setInputText] = useState("");
  const [biasResult, setBiasResult] = useState(null);

  const handleSubmit = async () => {
    const response = await fetch(`http://localhost:8000/predict?text=${encodeURIComponent(inputText)}`, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: "" // Matches cURL's empty body
    });

    const data = await response.json();
    setBiasResult(data.bias_scores); // Store API response in state
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Political Bias Detector</h2>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter a sentence..."
        style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleSubmit} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Check Bias
      </button>
      {biasResult && (
        <div style={{ marginTop: "20px" }}>
          <h3>Bias Scores:</h3>
          <p>Left: {biasResult[0]}</p>
          <p>Center: {biasResult[1]}</p>
          <p>Right: {biasResult[2]}</p>
        </div>
      )}
    </div>
  );
};

export default TestFetch;
