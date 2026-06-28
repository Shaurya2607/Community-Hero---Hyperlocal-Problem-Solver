import { useState, useEffect } from "react";

function IssueFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    priority: "All",
    status: "All",
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">

        <h5 className="mb-3">
          🔍 Search & Filters
        </h5>

        <div className="row">

          {/* Search */}
          <div className="col-md-3 mb-3">
            <input
              type="text"
              name="search"
              className="form-control"
              placeholder="Search issues..."
              value={filters.search}
              onChange={handleChange}
            />
          </div>

          {/* Category */}
          <div className="col-md-3 mb-3">
            <select
              className="form-select"
              name="category"
              value={filters.category}
              onChange={handleChange}
            >
              <option>All</option>
              <option>Road</option>
              <option>Garbage</option>
              <option>Traffic</option>
              <option>Water Leakage</option>
              <option>Drainage</option>
              <option>Electricity</option>
              <option>Street Light</option>
            </select>
          </div>

          {/* Priority */}
          <div className="col-md-3 mb-3">
            <select
              className="form-select"
              name="priority"
              value={filters.priority}
              onChange={handleChange}
            >
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          {/* Status */}
          <div className="col-md-3 mb-3">
            <select
              className="form-select"
              name="status"
              value={filters.status}
              onChange={handleChange}
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
}

export default IssueFilters;