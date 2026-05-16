const express = require("express");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();

// Use Render assigned port
const PORT = process.env.PORT || 3000;
const downloadLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

// Serve PDF
app.get("/", downloadLimiter, (req, res) => {
  res.download(path.join(__dirname, "manual.pdf"), (err) => {
    if (err && !res.headersSent) {
      res.status(404).send("manual.pdf not found");
    }
  });
});

// Serve TXT
app.get("/txt", downloadLimiter, (req, res) => {
  res.download(path.join(__dirname, "manual.txt"), (err) => {
    if (err && !res.headersSent) {
      res.status(404).send("manual.txt not found");
    }
  });
});

// Health route
app.get("/health", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
