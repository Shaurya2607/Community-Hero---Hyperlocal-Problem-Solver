import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import Profile from "./pages/Profile";
import IssuesMap from "./pages/IssuesMap";
import IssueDetails from "./components/IssueDetails";
import LeaderboardPage from "./pages/LeaderboardPage";
import MyIssues from "./pages/MyIssues";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import MyUpvotes from "./pages/MyUpvotes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/report" element={<ReportIssue />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/issue/:id" element={<IssueDetails />} />
        <Route path="/map" element={<IssuesMap />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myissues" element={<MyIssues />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/my-upvotes" element={<MyUpvotes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
