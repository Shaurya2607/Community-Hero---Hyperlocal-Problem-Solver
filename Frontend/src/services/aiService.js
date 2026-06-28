import axios from "axios";

const API = "http://localhost:5000/api/ai";

export const analyzeIssue = async (description) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API}/analyze`,
      {
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (err) {
    console.log(err);

    // Default values if AI fails
    return {
      category: "General",
      severity: "Medium",
    };
  }
};
