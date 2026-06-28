import pothole from "../assets/issues/pothole.jpg";
import garbage from "../assets/issues/garbage.jpg";
import waterLeak from "../assets/issues/water-leakage.jpg";
import streetLight from "../assets/issues/broken-street-light.jpg";
import traffic from "../assets/issues/traffic.jpg";
import drainage from "../assets/issues/drainage.jpg";
import fallenTree from "../assets/issues/fallen-tree.jpg";
import illegalDumping from "../assets/issues/illegal-dumping.jpg";
import sidewalkDamage from "../assets/issues/damaged-sidewalk.jpg";
import constructionHazard from "../assets/issues/construction.jpg";

const categoryImages = {
  Infrastructure: pothole,
  "Road Damage": pothole,

  "Waste Management": garbage,
  Garbage: garbage,

  "Water Supply": waterLeak,
  "Water Leakage": waterLeak,

  Electricity: streetLight,
  "Street Light": streetLight,

  Traffic: traffic,

  Drainage: drainage,

  Disaster: fallenTree,
  "Fallen Tree": fallenTree,

  "Illegal Dumping": illegalDumping,

  "Sidewalk Damage": sidewalkDamage,

  "Construction Hazard": constructionHazard,
};

export default categoryImages;
