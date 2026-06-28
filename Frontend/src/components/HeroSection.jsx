import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  return (
    <>
      <div className="card border-0 shadow-sm hero-section">
        <div className="card-body p-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="fw-bold display-5">
                Together, let's build
                <br />
                <span className="text-success">a better community</span>
              </h1>

              <p className="lead mt-4">
                Report local issues, track progress and help your community
                become a better place to live.
              </p>

              <div className="mt-4">
                <button
                  className="btn btn-primary btn-lg me-3"
                  onClick={() => navigate("/report")}
                >
                  Report Issue
                </button>

                <button
                  className="btn btn-outline-dark btn-lg"
                  onClick={() => navigate("/map")}
                >
                  Explore Issues
                </button>
              </div>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt=""
                width="350"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
