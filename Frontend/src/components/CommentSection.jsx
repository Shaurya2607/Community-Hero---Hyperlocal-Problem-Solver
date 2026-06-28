import { useEffect, useState } from "react";
import { addComment, getComments } from "../services/commentService";


function CommentSection({ issueId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  

  useEffect(() => {
  if (issueId) {
    fetchComments();
  }
}, [issueId]);

  const fetchComments = async () => {
    try {
      const data = await getComments(issueId);
      setComments(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async () => {
    if (comment.trim() === "") {
      return;
    }

    try {
      await addComment({
        issueId,
        userName: localStorage.getItem("userName"),
        message: comment,
      });

      setComment("");

      fetchComments();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card shadow-sm border-0 mt-4">
      <div className="card-body">
        <h5>Comments</h5>

        {comments.length === 0 ? (
          <p className="text-muted">No comments yet.</p>
        ) : (
          comments.map((item) => (
            <div
              key={item._id}
              className="border-bottom py-2"
            >
              <strong>{item.userName}</strong>

              <p>{item.message}</p>
            </div>
          ))
        )}

        <textarea
          className="form-control mt-3"
          rows="3"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
        />

        <button
          className="btn btn-primary mt-3"
          onClick={handleComment}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}

export default CommentSection;