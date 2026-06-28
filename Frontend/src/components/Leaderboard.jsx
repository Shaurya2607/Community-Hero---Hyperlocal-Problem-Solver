import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/leaderboardService";

function Leaderboard() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();

    // Refresh leaderboard every 30 seconds
    const interval = setInterval(() => {
      fetchLeaderboard();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const data = await getLeaderboard();
      setHeroes(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">
            🏆 Top Community Heroes
          </h5>

          <span className="badge bg-primary">
            {heroes.length} Heroes
          </span>
        </div>

        <hr />

        {loading ? (
          <div className="text-center py-4">
            <div
              className="spinner-border text-primary"
              role="status"
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>

            <p className="mt-3 text-muted">
              Loading Leaderboard...
            </p>
          </div>
        ) : heroes.length === 0 ? (
          <p className="text-center text-muted">
            No leaderboard data available.
          </p>
        ) : (
          heroes.map((hero, index) => (
            <div
              key={hero.id}
              className={`border rounded p-3 mb-3 shadow-sm ${
                index === 0
                  ? "border-warning"
                  : index === 1
                  ? "border-secondary"
                  : index === 2
                  ? "border-danger"
                  : ""
              }`}
            >
              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h6 className="fw-bold mb-2">

                    {index === 0 && "🥇 "}
                    {index === 1 && "🥈 "}
                    {index === 2 && "🥉 "}

                    #{index + 1} {hero.name}

                  </h6>

                  <div className="small text-muted mb-1">
                    📋 {hero.issues} Issues Reported
                  </div>

                  <div className="small text-muted mb-1">
                    💬 {hero.comments} Comments
                  </div>

                  <div className="small text-warning fw-semibold">
                    {hero.badge}
                  </div>

                </div>

                <div className="text-end">

                  <span className="badge bg-success fs-6 px-3 py-2">
                    {hero.points} pts
                  </span>

                </div>

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Leaderboard;