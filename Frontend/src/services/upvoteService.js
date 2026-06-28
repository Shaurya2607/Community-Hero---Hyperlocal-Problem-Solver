import api from "./api";

export const getMyUpvotes = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/upvotes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.issues;
};
