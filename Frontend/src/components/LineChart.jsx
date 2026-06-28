import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function LineChart() {

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May"
    ],
    datasets: [
      {
        label: "Issues Reported",
        data: [12, 25, 18, 30, 40]
      }
    ]
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h5>Issue Trends</h5>
        <Line data={data} />
      </div>
    </div>
  );
}

export default LineChart;