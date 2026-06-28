import StatsCards from "../components/StatsCards";
import DashboardCharts from "../components/DashboardCharts";
import AIInsights from "../components/AIInsights";
import Navbar from "../components/Navbar";

function Dashboard() {

  return (
    <><Navbar/>
    <div className="container py-4">

      <h2>
        Dashboard
      </h2>

      <StatsCards />

      <DashboardCharts />

      <div className="mt-4">
        <AIInsights />
      </div>

    </div>
    </>
  );
}

export default Dashboard;