const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const complaintRoutes = require("./routes/complaints");
app.use("/complaints", complaintRoutes);

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on http://127.0.0.1:5000");
});