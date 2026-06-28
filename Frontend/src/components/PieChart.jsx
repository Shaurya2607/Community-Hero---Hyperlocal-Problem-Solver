import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PieChart() {

  const data = {
    labels: [
      "Potholes",
      "Garbage",
      "Streetlights",
      "Water"
    ],
    datasets: [
      {
        data: [40, 25, 20, 15]
      }
    ]
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h5>Issues by Category</h5>
        <Pie data={data} />
      </div>
    </div>
  );
}

export default PieChart;