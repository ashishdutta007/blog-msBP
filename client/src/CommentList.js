import React from "react";

export default ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    const { status } = comment;
    let content;
    if (status === "pending") {
      content = "Comment undergoing moderation";
    }
    if (status === "rejected") {
      content = "Comment is rejected";
    }
    if (status === "approved") {
      content = comment.content;
    }
    return <li key={comment.id}>{content}</li>;
  });

  return (
    <>
      <ul>{renderedComments}</ul>
    </>
  );
};
