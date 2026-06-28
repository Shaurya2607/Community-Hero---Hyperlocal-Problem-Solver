import { useEffect, useState } from "react";
import { getAIInsights } from "../services/insightsService";

function AIInsights() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchInsights();

    // Refresh AI insights every minute
    const interval = setInterval(() => {
      fetchInsights();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await getAIInsights();

      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card shadow-sm border-0 h-100">
        <div className="card-body text-center">
          <h4>🤖 AI City Insights</h4>

          <div
            className="spinner-border text-primary my-3"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <p className="text-muted">
            Gemini is analyzing your city...
          </p>
        </div>
      </div>
    );
  }

  if (!data || !data.insights) {
  return (
    <div className="card shadow border-0">
      <div className="card-body text-center">

        <h4>🤖 AI City Insights</h4>

        <div className="alert alert-warning mt-3">

          Gemini AI quota has been exhausted.

          <br />

          AI insights will automatically work once the quota resets.

        </div>

      </div>
    </div>
  );
}

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body">

        <h4 className="mb-3">
          🤖 AI City Insights
        </h4>

        <div className="mb-3">
          <span className="badge bg-primary">
            {data.totalIssues} Issues Analysed
          </span>
        </div>

        <div className="mb-3">
          <h6>📍 Hotspot Area</h6>

          <p className="text-muted">
            {data.insights.hotspot}
          </p>
        </div>

        <div className="mb-3">
          <h6>🏛 Department</h6>

          <p className="text-muted">
            {data.insights.department}
          </p>
        </div>

        <div className="mb-3">
          <h6>📝 AI Summary</h6>

          <p className="text-muted">
            {data.insights.summary}
          </p>
        </div>

        <div className="mb-3">
          <h6>💡 Recommendation</h6>

          <p className="text-muted">
            {data.insights.recommendation}
          </p>
        </div>

        <hr />

        <small className="text-success">
          ✔ Updated Automatically
        </small>

      </div>
    </div>
  );
}

export default AIInsights;