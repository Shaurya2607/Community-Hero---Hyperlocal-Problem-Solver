import api from "./api";

// Get all comments for an issue
export const getComments = async (issueId) => {
  const response = await api.get(`/comments/${issueId}`);
  return response.data;
};

// Add a comment
export const addComment = async (commentData) => {
  const response = await api.post("/comments", commentData);
  return response.data;
};
