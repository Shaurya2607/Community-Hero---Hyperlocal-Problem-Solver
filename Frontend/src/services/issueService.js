import api from "./api";

// Get all issues with filters
export const getIssues = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append("search", filters.search);
  }

  if (filters.category && filters.category !== "All") {
    params.append("category", filters.category);
  }

  if (filters.priority && filters.priority !== "All") {
    params.append("priority", filters.priority);
  }

  if (filters.status && filters.status !== "All") {
    params.append("status", filters.status);
  }

  const response = await api.get(`/issues?${params.toString()}`);

  return response.data.issues;
};

// Get single issue
export const getIssueById = async (id) => {
  const response = await api.get(`/issues/${id}`);
  return response.data;
};

// Create issue
export const createIssue = async (issueData) => {
  const response = await api.post("/issues", issueData);
  return response.data;
};

// Update issue
export const updateIssue = async (id, issueData) => {
  const response = await api.put(`/issues/${id}`, issueData);
  return response.data;
};

// Delete issue
export const deleteIssue = async (id) => {
  const response = await api.delete(`/issues/${id}`);
  return response.data;
};

export const upvoteIssue = async (id) => {
  const response = await api.put(`/issues/${id}/upvote`);
  return response.data;
};

export const bookmarkIssue = async (id) => {
  const response = await api.put(`/issues/${id}/bookmark`);

  return response.data;
};

export const verifyIssue = async (id) => {
  const response = await api.put(`/issues/${id}/verify`);

  return response.data;
};
