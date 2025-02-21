const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/process", (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: "Invalid data format. Must be an array." });
    }

    let alphabets = [];
    let numbers = [];
    let highestAlphabet = "";

    data.forEach((item) => {
      if (!isNaN(item) && item.trim() !== "") {
        numbers.push(item); // Keep numbers as strings for consistency
      } else if (typeof item === "string" && /^[A-Za-z]$/.test(item)) {
        alphabets.push(item);
      }
    });

    // Find the highest alphabet (case-insensitive)
    if (alphabets.length > 0) {
      highestAlphabet = alphabets.sort((a, b) => b.localeCompare(a))[0];
    }

    res.json({
      alphabets,
      numbers,
      highestAlphabet,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
