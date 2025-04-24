const express = require('express');
const app = express();
const mongoose = require('mongoose');


require("dotenv").config();

app.use(express.json());

const mongoUrl = process.env.MONGO_DB_URL;

mongoose.connect(mongoUrl);
mongoose.connection.on('connected', () => {
    console.log("DAtabase connected Successfully!!");
})
mongoose.connection.on('error', (err) => {
    console.error("Connection Failed :: ", err);
})

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is up and running on port :: ${port}`);
})