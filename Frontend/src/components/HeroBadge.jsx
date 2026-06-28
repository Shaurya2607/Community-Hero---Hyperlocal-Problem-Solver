function HeroBadge({
  title,
  color = "primary"
}) {

  return (
    <span
      className={`badge bg-${color} p-2 me-2`}
    >
      {title}
    </span>
  );
}

export default HeroBadge;