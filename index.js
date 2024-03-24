const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors"); // to allow cross-origin requests

const app = express();
const corsOrigin =
  process.env.REACT_APP_NODE_ENV === "production"
    ? "https://repxai-dummy.vercel.app/"
    : "http://localhost:3000";

app.use(
  cors({
    origin: corsOrigin,
    methods: "GET,HEAD,PUT,PATCH,POST,OPTIONS,DELETE",
    credentials: true,
  })
);

// Connect to database
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Routes
app.use("/api/users", require("./routes/createUser"));
app.use("/api/assignments", require("./routes/createAssignment"));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
