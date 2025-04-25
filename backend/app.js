const express = require('express');
const app = express();
const mongoose = require('mongoose');

require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const taskRoutes = require("./routes/taskRoutes");


app.use(express.json());

const mongoUrl = process.env.MONGO_DB_URL;

mongoose.connect(mongoUrl);
mongoose.connection.on('connected', () => {
    console.log("DAtabase connected Successfully!!");
})
mongoose.connection.on('error', (err) => {
    console.error("Connection Failed :: ", err);
})

//*//   Routes Setup
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/task", taskRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is up and running on port :: ${port}`);
})