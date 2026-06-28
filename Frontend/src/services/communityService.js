import api from "./api";

export const getCommunityImpact = async () => {
  const response = await api.get("/community");
  return response.data;
};
