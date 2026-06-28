import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import HeroSection from "../components/HeroSection";
import StatsCards from "../components/StatsCards";
import RecentIssues from "../components/RecentIssues";
import AIInsights from "../components/AIInsights";
import Leaderboard from "../components/Leaderboard";
import DashboardCharts from "../components/DashboardCharts";
import HowItWorks from "../components/HowItWorks";
import BadgesSection from "../components/BadgesSection";
import CommunityImpact from "../components/CommunityImpact";
import MapComponent from "../components/MapComponent";
import IssueFilters from "../components/IssueFilters";

function Home() {
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    priority: "All",
    status: "All",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/health")
      .then((res) => {
        console.log("Backend Response:", res.data);
      })
      .catch((err) => {
        console.error("Backend Error:", err);
      });
  }, []);

  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-2 p-0">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="col-lg-10 p-4">
            {/* Hero + Map */}
            <div className="row g-4">
              <div className="col-lg-8">
                <HeroSection />
              </div>

              <div className="col-lg-4">
                <MapComponent />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4">
              <StatsCards />
            </div>

            {/* Recent Issues + AI + Leaderboard */}
            <div className="row mt-4 g-4">
              <div className="mt-4">
                <IssueFilters onFilterChange={setFilters} />
              </div>
              <div className="col-lg-6">
                <RecentIssues filters={filters} />
              </div>

              <div className="col-lg-3">
                <AIInsights />
              </div>

              <div className="col-lg-3">
                <Leaderboard />
              </div>
            </div>

            {/* Charts */}
            <div className="mt-4">
              <DashboardCharts />
            </div>

            {/* Bottom Cards */}
            <div className="row mt-4 g-4">
              <div className="col-lg-6">
                <HowItWorks />
              </div>

              <div className="col-lg-6">
                <BadgesSection />
              </div>
            </div>

            {/* Community Impact */}
            <div className="mt-4">
              <CommunityImpact />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
