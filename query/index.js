const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => {
  // console.log(posts);
  res.send(posts).status(200);
});

app.post("/events", (req, res) => {
  const event = req.body;
  const { type, data } = event;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, postId, status } = data;
    const comments = posts[postId].comments;

    const comment = comments.find((comment) => comment.id == id);
    comment.status = status;
  }

  res.send({});
});

app.listen(4002, () => {
  console.log("Query service listening on port 4002");
});
