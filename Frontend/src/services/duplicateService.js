import api from "./api";

// Check if a similar issue already exists
export const checkDuplicateIssue = async (issueData) => {
  const response = await api.post("/duplicate", issueData);

  return response.data;
};
