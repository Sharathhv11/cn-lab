const express = require("express");
const path = require("path");

const app = express();

// Use Render assigned port
const PORT = process.env.PORT || 3000;

// Serve PDF
app.get("/", (req, res) => {
  res.download(path.join(__dirname, "manual.pdf"));
});

// Health route
app.get("/health", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
