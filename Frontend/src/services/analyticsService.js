import api from "./api";

// Get Dashboard Analytics
export const getAnalytics = async () => {
  const response = await api.get("/analytics");

  return response.data;
};
