import Leaderboard from "../components/Leaderboard";
import Navbar from "../components/Navbar";

function LeaderboardPage() {
  return (
    <><Navbar/>
    <div className="container py-4">
      <Leaderboard />
    </div>
    </>
  );
}

export default LeaderboardPage;