import api from "./api";

// Register User
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);

  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);

  return response.data;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("email");
};

// Check Login
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};
