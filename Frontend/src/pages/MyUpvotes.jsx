import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyUpvotes } from "../services/upvoteService";

function MyUpvotes() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUpvotes();
  }, []);

  const fetchUpvotes = async () => {
    try {
      const data = await getMyUpvotes();
      setIssues(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success"></div>
        <h4 className="mt-3">Loading Your Upvotes...</h4>
      </div>
    );
  }

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>👍 My Upvoted Issues</h2>

        <span className="badge bg-success fs-6">
          {issues.length} Upvotes
        </span>
      </div>

      {issues.length === 0 ? (
        <div className="alert alert-info">
          You haven't upvoted any issues yet.
        </div>
      ) : (
        issues.map((issue) => (
          <div
            key={issue._id}
            className="card shadow-sm border-0 mb-3"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/issue/${issue._id}`)}
          >
            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <h5>{issue.title}</h5>

                  <p className="text-muted">
                    📍 {issue.location}
                  </p>

                  <span
                    className={`badge ${
                      issue.status === "Resolved"
                        ? "bg-success"
                        : issue.status === "In Progress"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {issue.status}
                  </span>

                  <span className="badge bg-primary ms-2">
                    {issue.priority}
                  </span>

                </div>

                <div className="text-end">

                  <h5 className="text-success">
                    👍 {issue.upvotes}
                  </h5>

                  <small className="text-muted">
                    Verified: {issue.verifiedCount || 0}
                  </small>

                </div>

              </div>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyUpvotes;