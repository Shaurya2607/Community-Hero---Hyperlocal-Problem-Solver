import { useEffect, useState } from "react";
import { getMyIssues } from "../services/myIssueService";
import { useNavigate } from "react-router-dom";

function MyIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const data = await getMyIssues();
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
        <div className="spinner-border text-primary"></div>
        <h5 className="mt-3">Loading Your Issues...</h5>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <h2 className="mb-4">
        📋 My Reported Issues
      </h2>

      {issues.length === 0 ? (
        <div className="alert alert-info">
          You haven't reported any issues yet.
        </div>
      ) : (
        issues.map((issue) => (
          <div
            key={issue._id}
            className="card shadow-sm mb-3"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/issue/${issue._id}`)}
          >
            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <h5>{issue.title}</h5>

                  <p className="text-muted mb-2">
                    {issue.location}
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

                  <div>
                    👍 {issue.upvotes || 0}
                  </div>

                  <div>
                    ✔ {issue.verifiedCount || 0}
                  </div>

                </div>

              </div>

            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default MyIssues;