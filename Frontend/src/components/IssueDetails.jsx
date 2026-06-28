import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CommentSection from "./CommentSection";

import {
  getIssueById,
  upvoteIssue,
  bookmarkIssue,
  verifyIssue,
} from "../services/issueService";

import categoryImages from "../utils/categoryImages";

import pothole from "../assets/issues/pothole.jpg";

function IssueDetails() {
  const { id } = useParams();

  const [issue, setIssue] = useState(null);

  useEffect(() => {
    fetchIssue();
  }, []);

  const fetchIssue = async () => {
    try {
      const data = await getIssueById(id);

      setIssue(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!issue) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading Issue...</h3>
      </div>
    );
  }

  const handleUpvote = async () => {
    try {
      const response = await upvoteIssue(issue._id);

      setIssue(response.issue);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookmark = async () => {
    try {
      const response = await bookmarkIssue(issue._id);

      setIssue(response.issue);
    } catch (error) {
      console.log(error);
    }
  };
  const handleVerify = async () => {
    try {
      const response = await verifyIssue(issue._id);

      setIssue(response.issue);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container py-4">
      <div className="card shadow border-0">
        <img
          src={categoryImages[issue.category] || pothole}
          alt={issue.title}
          className="card-img-top"
          style={{
            height: "350px",
            objectFit: "cover",
          }}
        />

        <div className="card-body">
          <h2>{issue.title}</h2>

          <p>{issue.description}</p>

          <hr />

          <p>
            <strong>📍 Location:</strong> {issue.location}
          </p>

          <p>
            <strong>🏷 Category:</strong> {issue.category}
          </p>

          <p>
            <strong>⚡ Priority:</strong> {issue.priority}
          </p>

          <p>
            <strong>🏛 Department:</strong> {issue.department}
          </p>

          <p>
            <strong>📌 Status:</strong> {issue.status}
          </p>

          <hr />

          <h4>🤖 AI Summary</h4>

          <p>{issue.aiSummary}</p>

          <hr />

          <h4>💡 AI Suggested Solution</h4>

          <p>{issue.aiSolution}</p>

          <hr />

          <div className="d-flex gap-3">
            <button className="btn btn-primary" onClick={handleUpvote}>
              👍 {issue.upvotes} Upvotes
            </button>

            <button className="btn btn-warning" onClick={handleBookmark}>
              ⭐ {issue.bookmarks} Bookmark
            </button>

            <button className="btn btn-success" onClick={handleVerify}>
              ✔ {issue.verifiedCount} Verify
            </button>
          </div>
        </div>
      </div>

      <CommentSection issueId={issue._id} />
    </div>
  );
}

export default IssueDetails;
