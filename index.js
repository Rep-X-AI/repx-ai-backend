const express = require('express');
const server = express();
const mongoose = require('mongoose');
require('dotenv').config();


connectToDB().catch(err => console.log(err));
async function connectToDB(){
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected!");
}
server.get('/', (req, res) => {
    res.json({status: "success"});
})

server.listen(8080, () => {
    console.log("Server Started!");
});