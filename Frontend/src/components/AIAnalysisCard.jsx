function AIAnalysisCard({ result }) {

  return (
    <div className="card shadow-sm border-0">

      <div className="card-body">

        <h5>
          AI Analysis Result
        </h5>

        <hr />

        <p>
          Category:
          {" "}
          {result.category}
        </p>

        <p>
          Severity:
          {" "}
          {result.severity}
        </p>

        <p>
          Department:
          {" "}
          {result.department}
        </p>

        <p>
          Priority:
          {" "}
          {result.priority}
        </p>

      </div>

    </div>
  );
}

export default AIAnalysisCard;