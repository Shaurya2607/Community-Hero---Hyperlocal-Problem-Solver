import api from "./api";

// Get Logged-in User Profile
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
