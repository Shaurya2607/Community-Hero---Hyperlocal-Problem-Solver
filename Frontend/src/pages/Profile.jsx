import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>

        <h5 className="mt-3">
          Loading Profile...
        </h5>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container py-5 text-center">
        <h3>Unable to load profile.</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="row">

        {/* Left Card */}

        <div className="col-lg-4">

          <div className="card shadow border-0">

            <div className="card-body text-center">

              <img
                src="/profilepic.jpg"
                alt="Profile"
                width="120"
                height="120"
                className="rounded-circle mb-3"
                style={{
                  objectFit: "cover",
                }}
              />

              <h3>
                {profile.user.name}
              </h3>

              <p className="text-muted">
                {profile.user.email}
              </p>

              <span className="badge bg-warning text-dark fs-6">
                {profile.stats.badge}
              </span>

              <hr />

              <h4 className="text-success">
                🏆 {profile.stats.points} Points
              </h4>

            </div>

          </div>

        </div>

        {/* Right Card */}

        <div className="col-lg-8">

          <div className="card shadow border-0">

            <div className="card-body">

              <h3 className="mb-4">
                Activity Summary
              </h3>

              <div className="row text-center">

                <div className="col-md-4 mb-3">

                  <div className="card bg-light">

                    <div className="card-body">

                      <h2>
                        {profile.stats.issues}
                      </h2>

                      <p>
                        📋 Issues
                      </p>

                    </div>

                  </div>

                </div>

                <div className="col-md-4 mb-3">

                  <div className="card bg-light">

                    <div className="card-body">

                      <h2>
                        {profile.stats.comments}
                      </h2>

                      <p>
                        💬 Comments
                      </p>

                    </div>

                  </div>

                </div>

                <div className="col-md-4 mb-3">

                  <div className="card bg-light">

                    <div className="card-body">

                      <h2>
                        {profile.stats.notifications}
                      </h2>

                      <p>
                        🔔 Notifications
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              <hr />

              <h4 className="mb-3">
                Recent Issues
              </h4>

              {profile.recentIssues.length === 0 ? (

                <p className="text-muted">
                  You haven't reported any issues yet.
                </p>

              ) : (

                profile.recentIssues.map((issue) => (

                  <div
                    key={issue._id}
                    className="border rounded p-3 mb-3"
                  >

                    <h5>
                      {issue.title}
                    </h5>

                    <p className="text-muted mb-2">
                      {issue.location}
                    </p>

                    <span
                      className={`badge ${
                        issue.status === "Resolved"
                          ? "bg-success"
                          : issue.status === "In Progress"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {issue.status}
                    </span>

                    <span className="badge bg-primary ms-2">
                      {issue.priority}
                    </span>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;