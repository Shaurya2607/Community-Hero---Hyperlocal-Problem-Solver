import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";

function CommunityImpact() {
  const [impact, setImpact] = useState({
    issuesReported: 0,
    issuesResolved: 0,
    citizensEngaged: 0,
  });

  const [ai, setAI] = useState({
    successRate: 0,
    hotspot: "N/A",
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboard();

      setImpact(data.impact);

      setAI({
        successRate: data.ai.successRate,
        hotspot: data.ai.hotspot,
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">

        <h2 className="mb-4">
          Community Impact
        </h2>

        <div className="row text-center">

          <div className="col-md-3">
            <h1>{impact.issuesReported}</h1>
            <p>📢 Issues Reported</p>
          </div>

          <div className="col-md-3">
            <h1>{impact.issuesResolved}</h1>
            <p>✅ Issues Resolved</p>
          </div>

          <div className="col-md-3">
            <h1>{impact.citizensEngaged}</h1>
            <p>👥 Citizens Engaged</p>
          </div>

          <div className="col-md-3">
            <h1>{ai.successRate}%</h1>
            <p>🤖 AI Success Rate</p>
          </div>

        </div>

        <hr />

        <div className="text-center">

          <h5 className="mb-1">
            🔥 Current Hotspot
          </h5>

          <span className="badge bg-danger fs-6">
            {ai.hotspot}
          </span>

        </div>

      </div>
    </div>
  );
}

export default CommunityImpact;