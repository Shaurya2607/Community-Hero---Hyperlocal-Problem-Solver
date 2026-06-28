import { useEffect, useState } from "react";

import {
  Bar,
  Pie,
  Line,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

import { getAnalytics } from "../services/analyticsService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

function DashboardCharts() {
  const [analytics, setAnalytics] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    inProgress: 0,
    highPriority: 0,
    categories: {},
    status: {},
    priority: {},
    monthlyReports: {},
  });

  useEffect(() => {
    fetchAnalytics();

    const interval = setInterval(fetchAnalytics, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await getAnalytics();

      if (data.success) {
        setAnalytics(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const categoryChart = {
    labels: Object.keys(analytics.categories),

    datasets: [
      {
        label: "Issues",

        data: Object.values(analytics.categories),

        backgroundColor: [
          "#0d6efd",
          "#198754",
          "#ffc107",
          "#dc3545",
          "#20c997",
          "#6f42c1",
        ],

        borderRadius: 8,
      },
    ],
  };

  const statusChart = {
    labels: Object.keys(analytics.status),

    datasets: [
      {
        data: Object.values(analytics.status),

        backgroundColor: [
          "#ffc107",
          "#198754",
          "#0d6efd",
          "#dc3545",
        ],
      },
    ],
  };

  const monthlyChart = {
    labels: Object.keys(
      analytics.monthlyReports
    ),

    datasets: [
      {
        label: "Reports",

        data: Object.values(
          analytics.monthlyReports
        ),

        borderColor: "#198754",

        backgroundColor:
          "rgba(25,135,84,.15)",

        fill: true,

        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="container-fluid mt-4">

      <div className="row">

        <div className="col-lg-6 mb-4">

          <div className="card shadow border-0">

            <div className="card-body">

              <h5 className="fw-bold mb-3">
                📊 Category Distribution
              </h5>

              <div style={{ height: 350 }}>
                <Bar
                  data={categoryChart}
                  options={options}
                />
              </div>

            </div>

          </div>

        </div>

        <div className="col-lg-6 mb-4">

          <div className="card shadow border-0">

            <div className="card-body">

              <h5 className="fw-bold mb-3">
                🥧 Status Distribution
              </h5>

              <div style={{ height: 350 }}>
                <Pie
                  data={statusChart}
                  options={options}
                />
              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="card shadow border-0">

        <div className="card-body">

          <h5 className="fw-bold mb-3">
            📈 Monthly Reports
          </h5>

          <div style={{ height: 420 }}>
            <Line
              data={monthlyChart}
              options={options}
            />
          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardCharts;