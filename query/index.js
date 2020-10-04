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
    const { id, content, postId } = data;
    posts[postId].comments.push({ id, content });
  }

  res.send({}).status(200);
});

app.listen(4002, () => {
  console.log("Query service listening on port 4002");
});
