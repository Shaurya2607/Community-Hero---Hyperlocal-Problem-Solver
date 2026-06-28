import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getIssues } from "../services/issueService";
import IssueCard from "./IssueCard";

import categoryImages from "../utils/categoryImages";
import pothole from "../assets/issues/pothole.jpg";

function RecentIssues({ filters }) {
  const [issues, setIssues] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchIssues();
  }, [filters]);

  const fetchIssues = async () => {
    try {
      const data = await getIssues(filters);

      setIssues(data);

    } catch (err) {

      console.log(err);

    }
  };

  return (
    <div className="card shadow-sm border-0 h-100">

      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h5 className="mb-0">
            Recent Issues
          </h5>

          <span className="badge bg-primary">
            {issues.length} Issues
          </span>

        </div>

        {issues.length === 0 ? (

          <div className="text-center text-muted">

            No Issues Found

          </div>

        ) : (

          issues.map((issue) => (

            <div
              key={issue._id}
              style={{
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(`/issue/${issue._id}`)
              }
            >

              <IssueCard
                image={
                  categoryImages[
                    issue.category
                  ] || pothole
                }
                title={issue.title}
                location={issue.location}
                priority={issue.priority}
                upvotes={issue.upvotes}
              />

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default RecentIssues;