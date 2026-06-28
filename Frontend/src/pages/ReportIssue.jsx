import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MapComponent from "../components/MapComponent";

import { createIssue } from "../services/issueService";
import { checkDuplicateIssue } from "../services/duplicateService";
import { analyzeIssue } from "../services/aiService";

function ReportIssue() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  const [coordinates, setCoordinates] = useState(null);

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [duplicateResult, setDuplicateResult] = useState(null);
  const [pendingIssue, setPendingIssue] = useState(null);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);

 const submitIssue = async () => {
  try {
    if (!title.trim()) {
      alert("Please enter an issue title.");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a description.");
      return;
    }

    if (!coordinates) {
      alert("Please select a location on the map.");
      return;
    }

    setLoading(true);

    // Optional AI analysis
    try {
      await analyzeIssue(description);
    } catch (e) {
      console.log("AI Analysis skipped:", e.message);
    }

    const issueData = {
      title,
      description,
      location: address,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    };

    // Check duplicates BEFORE creating the issue
    const duplicateResponse = await checkDuplicateIssue(issueData);

    if (duplicateResponse?.duplicate) {
      setDuplicateResult(duplicateResponse);
      setPendingIssue(issueData);
      setShowDuplicateModal(true);
      return;
    }

    await createIssue(issueData);

    alert("Issue Submitted Successfully!");

    navigate("/");
  } catch (err) {
    console.error(err);

    if (err.response) {
      console.log(err.response.data);
      alert(err.response.data.message);
    } else {
      alert(err.message);
    }
  } finally {
    setLoading(false);
  }
};

  const submitAnyway = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", pendingIssue.title);
      formData.append("description", pendingIssue.description);
      formData.append("address", pendingIssue.address);
      formData.append("latitude", pendingIssue.latitude);
      formData.append("longitude", pendingIssue.longitude);
      formData.append("category", pendingIssue.category);
      formData.append("severity", pendingIssue.severity);

      if (image) {
        formData.append("image", image);
      }

      await createIssue(formData);

      alert("Issue Submitted Successfully!");

      setShowDuplicateModal(false);

      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const viewExistingIssue = () => {
    navigate(`/issue/${duplicateResult.matchingIssue._id}`);
  };

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <div className="card shadow border-0">
          <div className="card-body">
            <h2 className="mb-4">Report Community Issue</h2>

            <div className="mb-3">
              <label className="form-label">Issue Title</label>

              <input
                className="form-control"
                type="text"
                placeholder="Enter issue title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>

              <textarea
                className="form-control"
                rows={5}
                placeholder="Describe the issue"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address (Optional)</label>

              <input
                className="form-control"
                type="text"
                placeholder="Nearest landmark / address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Select Location on Map</label>

              <MapComponent
                onLocationSelect={(coords) => {
                  setCoordinates(coords);

                  console.log(coords);
                }}
              />
            </div>

            {coordinates && (
              <div className="alert alert-success">
                <strong>Latitude:</strong> {coordinates.lat}
                <br />
                <strong>Longitude:</strong> {coordinates.lng}
              </div>
            )}

            <div className="mb-4">
              <label className="form-label">Upload Image (Optional)</label>

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <button
              className="btn btn-success w-100"
              onClick={submitIssue}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Issue"}
            </button>
          </div>
        </div>
      </div>

      {showDuplicateModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>⚠ Similar Issue Found</h5>
              </div>

              <div className="modal-body">
                <h5>{duplicateResult.matchingIssue.title}</h5>

                <p>{duplicateResult.matchingIssue.description}</p>

                <p>
                  <strong>Confidence:</strong> {duplicateResult.confidence}%
                </p>

                <p>{duplicateResult.reason}</p>
              </div>

              <div className="modal-footer">
                <button className="btn btn-primary" onClick={viewExistingIssue}>
                  View Existing
                </button>

                <button className="btn btn-warning" onClick={submitAnyway}>
                  Submit Anyway
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDuplicateModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReportIssue;
