const calculateLevel = (points) => {
  if (points >= 2000)
    return {
      level: 5,
      title: "Community Hero",
      nextLevel: null,
    };

  if (points >= 1000)
    return {
      level: 4,
      title: "Civic Champion",
      nextLevel: 2000,
    };

  if (points >= 500)
    return {
      level: 3,
      title: "Community Helper",
      nextLevel: 1000,
    };

  if (points >= 200)
    return {
      level: 2,
      title: "Active Citizen",
      nextLevel: 500,
    };

  return {
    level: 1,
    title: "Community Starter",
    nextLevel: 200,
  };
};

module.exports = calculateLevel;
