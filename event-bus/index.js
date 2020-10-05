const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const events = [];

app.get("/events", (req, res) => {
  res.send(events).status(200);
});

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  try {
    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    axios.post("http://localhost:4002/events", event);
    axios.post("http://localhost:4003/events", event);
  } catch (error) {
    // throw new Error(error);
  }

  res.send({});
});

app.listen(4006, () => {
  console.log("Event-bus is listening on port 4006");
});
