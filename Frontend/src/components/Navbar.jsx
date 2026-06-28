import { Link, NavLink, useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container-fluid px-4">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center text-decoration-none"
        >
          <img
            src="/CommunityHero.jpg"
            alt="Community Hero"
            className="CommunityHero-img"
          />

          <span className="fw-bold text-success ms-2 fs-4">
            Community Hero
          </span>
        </Link>

        {/* Mobile Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >
          {/* Navigation */}

          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link"
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/report"
                className="nav-link"
              >
                Report Issue
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/map"
                className="nav-link"
              >
                Issues Map
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className="nav-link"
              >
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/leaderboard"
                className="nav-link"
              >
                Leaderboard
              </NavLink>
            </li>

            {token && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/myissues"
                    className="nav-link"
                  >
                    My Issues
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/upvotes"
                    className="nav-link"
                  >
                    My Upvotes
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/settings"
                    className="nav-link"
                  >
                    Settings
                  </NavLink>
                </li>
              </>
            )}

          </ul>

          {/* Right Side */}

          <div className="d-flex align-items-center gap-3">

            {token ? (
              <>
                <NotificationBell />

                <Link
                  to="/profile"
                  className="text-decoration-none d-flex align-items-center"
                >
                  <img
                    src="/profilepic.jpg"
                    alt="Profile"
                    width="45"
                    height="45"
                    className="rounded-circle"
                    style={{
                      objectFit: "cover",
                      border: "2px solid #28a745",
                    }}
                  />

                  <span className="ms-2 fw-semibold text-dark">
                    {userName}
                  </span>
                </Link>

                <button
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-success"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn btn-outline-success"
                >
                  Register
                </Link>
              </>
            )}

          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;