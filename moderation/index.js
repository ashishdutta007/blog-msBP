const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;
  const { type, data } = event;

  if (type === "CommentCreated") {
    const { content, id, postId } = data;
    // let status = data.status;
    // setTimeout(() => {
    //   status = content.includes("orange") ? "rejected" : "approved";
    // }, 5000);

    const status = content.includes("orange") ? "rejected" : "approved";
    await axios.post("http://localhost:4006/events", {
      type: "CommentModerated",
      data: {
        content,
        id,
        postId,
        status,
      },
    });

    res.send({}).status(200);
  }
});

app.listen(4003, () => {
  console.log("Moderation service listening in port 4003");
});
