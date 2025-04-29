const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const path = require('path');
const cors = require("cors");

require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}

));
// app.use(cors());

const mongoUrl = process.env.MONGO_DB_URL;

mongoose.connect(mongoUrl);
mongoose.connection.on('connected', () => {
    console.log("Database connected Successfully!!");
})


//*//   Routes Setup
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/task", taskRoutes);



const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is up and running on port :: ${port}`);
});