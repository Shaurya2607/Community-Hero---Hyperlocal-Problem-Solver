function HowItWorks() {
  return (
    <div className="card mt-4 shadow-sm border-0">

      <div className="card-body">

        <h4 className="mb-4">
          How It Works
        </h4>

        <div className="row text-center">

          <div className="col-md-4">
            <h1>📸</h1>
            <h5>Report</h5>
            <p>
              Upload image and location
            </p>
          </div>

          <div className="col-md-4">
            <h1>🤖</h1>
            <h5>AI Analysis</h5>
            <p>
              Gemini categorizes issue
            </p>
          </div>

          <div className="col-md-4">
            <h1>🏛️</h1>
            <h5>Resolve</h5>
            <p>
              Track issue resolution
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default HowItWorks;