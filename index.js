require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Connect to mongodb
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0.lv6o8.mongodb.net/boss-bidding-info?retryWrites=true&w=majority`);

mongoose.Promise = global.Promise;

const app = express();
app.use(express.json());
app.use("/api", require("./routes/api"))

app.listen(process.env.port || 5000, () => console.log("Listening on port 5000"));