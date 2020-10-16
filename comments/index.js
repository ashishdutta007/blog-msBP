const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;

  const comments = commentsByPostId[postId] || [];
  const id = randomBytes(4).toString("hex");
  comments.push({ id, content, status: "pending" });
  commentsByPostId[postId] = comments;

  await axios.post("http://localhost:4006/events", {
    type: "CommentCreated",
    data: {
      id,
      content,
      status: "pending",
      postId: req.params.id,
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Event received :", req.body.type);
  const event = req.body;
  const { type, data } = event;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.id == id);
    comment.status = status;

    await axios.post("http://localhost:4006/events", {
      type: "CommentUpdated",
      data: {
        content,
        id,
        postId,
        status,
      },
    });
  }

  res.send({ status: "OK" });
});

app.listen(4001, () => {
  console.log("Comments service listening on port 4001");
});
