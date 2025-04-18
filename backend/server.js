const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Simple endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Zoom App backend!" });
});

// Example POST route
app.post("/api/user", (req, res) => {
  const { name } = req.body;
  console.log("Received user:", name);
  res.json({ status: "OK", received: name });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
