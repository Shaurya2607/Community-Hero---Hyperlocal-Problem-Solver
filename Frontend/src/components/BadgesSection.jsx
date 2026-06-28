function BadgesSection() {

  const badges = [
    "🏅 Road Guardian",
    "🌱 Cleanliness Champion",
    "💧 Water Protector",
    "🏆 Civic Hero"
  ];

  return (
    <div className="card mt-4 shadow-sm border-0">

      <div className="card-body">

        <h4>
          Community Badges
        </h4>

        <div className="d-flex flex-wrap gap-3 mt-3">

          {badges.map((badge, index) => (
            <span
              key={index}
              className="badge bg-primary p-3"
            >
              {badge}
            </span>
          ))}

        </div>

      </div>

    </div>
  );
}

export default BadgesSection;