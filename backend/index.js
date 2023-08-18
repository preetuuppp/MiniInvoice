const express = require("express");
const { connection } = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
const cors = require("cors");
const { cartRouter } = require("./Routes/CartRoutes");
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("welcome to homepage");
});

app.use("/cart", cartRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("connect to dataBase");
  } catch (error) {
    console.log("something went wrong");
  }
  console.log("server running on port 8080");
});
