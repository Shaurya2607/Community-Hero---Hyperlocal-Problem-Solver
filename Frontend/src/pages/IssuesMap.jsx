import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MapComponent from "../components/MapComponent";
import IssueFilters from "../components/IssueFilters";

function IssuesMap() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    priority: "All",
    status: "All",
  });

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

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>

                <h2 className="fw-bold">
                  Community Issues Map
                </h2>

                <p className="text-muted">
                  View and track reported issues across your city
                </p>

              </div>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/report")}
              >
                + Report New Issue
              </button>

            </div>

            <IssueFilters
              onFilterChange={setFilters}
            />

            <MapComponent
              filters={filters}
            />

            <div className="row mt-4">

              <div className="col-md-4">

                <div className="card border-0 shadow-sm">

                  <div className="card-body text-center">

                    <h4 className="text-danger">
                      35
                    </h4>

                    <p className="mb-0">
                      High Priority Issues
                    </p>

                  </div>

                </div>

              </div>

              <div className="col-md-4">

                <div className="card border-0 shadow-sm">

                  <div className="card-body text-center">

                    <h4 className="text-warning">
                      48
                    </h4>

                    <p className="mb-0">
                      Medium Priority Issues
                    </p>

                  </div>

                </div>

              </div>

              <div className="col-md-4">

                <div className="card border-0 shadow-sm">

                  <div className="card-body text-center">

                    <h4 className="text-success">
                      80
                    </h4>

                    <p className="mb-0">
                      Resolved Issues
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default IssuesMap;