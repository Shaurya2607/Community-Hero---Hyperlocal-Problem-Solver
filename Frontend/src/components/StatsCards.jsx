import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaThumbsUp,
} from "react-icons/fa";

import { getDashboard } from "../services/dashboardService";

function StatsCards() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalIssues: 0,
    resolvedIssues: 0,
    pendingIssues: 0,
    activeCitizens: 0,
    upvotes: 0,
  });

  useEffect(() => {
    fetchDashboard();

    const interval = setInterval(fetchDashboard, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboard();

      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    {
      title: "Total Issues",
      value: stats.totalIssues,
      icon: <FaClipboardList size={34} />,
      color: "primary",
      route: "/issues",
    },
    {
      title: "Resolved",
      value: stats.resolvedIssues,
      icon: <FaCheckCircle size={34} />,
      color: "success",
      route: "/dashboard",
    },
    {
      title: "Pending",
      value: stats.pendingIssues,
      icon: <FaClock size={34} />,
      color: "warning",
      route: "/dashboard",
    },
    {
      title: "Citizens",
      value: stats.activeCitizens,
      icon: <FaUsers size={34} />,
      color: "info",
      route: "/leaderboard",
    },
    {
      title: "Upvotes",
      value: stats.upvotes || 0,
      icon: <FaThumbsUp size={34} />,
      color: "danger",
      route: "/issues",
    },
  ];

  return (
    <div className="row g-4 mb-4">
      {cards.map((card, index) => (
        <div className="col-lg col-md-4 col-sm-6" key={index}>
          <div
            className="card shadow border-0 h-100"
            style={{
              borderRadius: "18px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onClick={() => navigate(card.route)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
            }}
          >
            <div className="card-body d-flex align-items-center">

              <div className={`text-${card.color} me-3`}>
                {card.icon}
              </div>

              <div>
                <h2 className="fw-bold mb-1">
                  {card.value}
                </h2>

                <p className="text-muted mb-0">
                  {card.title}
                </p>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;