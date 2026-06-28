import api from "./api";

export const getMyIssues = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/myissues", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.issues;
};
