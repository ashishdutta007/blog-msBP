import React, { useState } from "react";
import axios from "axios";

export default ({ postId }) => {
  const [comment, setComment] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content: comment,
    });

    setComment("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        {/* <label>Post comment:</label> */}
        <input
          type="text"
          value={comment}
          className="form-control"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      </div>
      <button className="btn btn-success" style={{ fontSize: "10px" }}>
        Submit
      </button>
    </form>
  );
};
