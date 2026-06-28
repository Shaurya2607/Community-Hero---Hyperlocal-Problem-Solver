function IssueCard({
  image,
  title,
  location,
  priority,
  upvotes
}) {
  return (
    <div className="card mb-3 border-0 shadow-sm">

      <div className="row g-0">

        <div className="col-4">

          <img
            src={image}
            alt=""
            className="img-fluid rounded-start"
            style={{
              height: "100%",
              objectFit: "cover"
            }}
          />

        </div>

        <div className="col-8">

          <div className="card-body">

            <h6>{title}</h6>

            <small className="text-muted">
              {location}
            </small>

            <div className="mt-2">

              <span
                className={`badge ${
                  priority === "High"
                    ? "bg-danger"
                    : priority === "Medium"
                    ? "bg-warning"
                    : "bg-success"
                }`}
              >
                {priority}
              </span>

            </div>

            <small className="mt-2 d-block">
              👍 {upvotes} Upvotes
            </small>

          </div>

        </div>

      </div>

    </div>
  );
}

export default IssueCard;