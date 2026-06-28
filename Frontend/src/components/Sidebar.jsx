import {
  FaHome,
  FaFlag,
  FaMapMarkedAlt,
  FaBookmark,
  FaThumbsUp,
  FaTrophy,
  FaUser,
  FaCog,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar shadow-sm">
      <Link to="/" className="btn btn-primary w-100 mb-3">
        <FaHome className="me-2" />
        Overview
      </Link>

      <Link to="/report" className="d-flex align-items-center mb-3">
        <FaFlag className="me-2" />
        <span>Report Issue</span>
      </Link>

      <Link to="/map" className="d-flex align-items-center mb-3">
        <FaMapMarkedAlt className="me-2" />
        <span>Issues Map</span>
      </Link>

      <Link className="d-flex align-items-center mb-3">
        <FaBookmark className="me-2" />
        <span>Bookmarks</span>
      </Link>

      <Link
  to="/my-upvotes"
  className="text-decoration-none text-dark"
>
  <div className="sidebar-item">
    <i className="bi bi-hand-thumbs-up-fill"></i>
    <span>My Upvotes</span>
  </div>
</Link>

      <Link to="/leaderboard" className="d-flex align-items-center mb-3">
        <FaTrophy className="me-2" />
        <span>Leaderboard</span>
      </Link>

      <Link to="/profile" className="d-flex align-items-center mb-3">
        <FaUser className="me-2" />
        <span>Profile</span>
      </Link>

      <Link
  to="/settings"
  className="text-decoration-none text-dark"
>
  <div className="sidebar-item">
    <i className="bi bi-gear-fill"></i>
    <span>Settings</span>
  </div>
</Link>

      
    </div>
  );
}

export default Sidebar;
