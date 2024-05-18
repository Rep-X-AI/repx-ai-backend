const express = require("express");
const cors = require("cors");
const server = express();
const mongoose = require('mongoose');
require('dotenv').config();


const usersRouter = require('./routes/User');
const assignmentsRouter = require('./routes/Assignment');


const corsOrigin =
  process.env.REACT_APP_NODE_ENV === "production"
    ? "https://repxai.vercel.app"
    : "http://localhost:3000";

server.use(
  cors({
    origin: corsOrigin,
    methods: "GET,HEAD,PUT,PATCH,POST,OPTIONS,DELETE",
    credentials: true,
  })
);

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', corsOrigin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


server.post(`/deleteAssignment`, async (req, res) => {
  try {
    const requestData = req.body; 
    const response = await axios.post('http://35.193.123.233/deleteAssignment', requestData);
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send(error.response.statusText);
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});

server.post(`/createAssignment`, async (req, res) => {
  try {
    const requestData = req.body; 
    const response = await axios.post('http://35.193.123.233/createAssignment', requestData);
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send(error.response.statusText);
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});


server.post('/evaluateAssignment', async (req, res) => {
  try {
    const requestData = req.body; 
    const response = await axios.post('http://35.193.123.233/evaluateAssignment', requestData);
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send(error.response.statusText);
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});


// Connect to database
connectToDB().catch(err => console.log(err));
async function connectToDB(){
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected!");
}

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Define Routes
server.use("/api/users", usersRouter.router);
server.use("/api/assignments", assignmentsRouter.router);


server.get('/', (req, res) => {
  res.json({status: "You will find nothing here xD"});
})


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));




