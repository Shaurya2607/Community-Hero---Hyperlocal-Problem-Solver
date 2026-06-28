const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateCityInsights = async (issues) => {
  try {
    if (!issues || issues.length === 0) {
      return {
        summary: "No issues have been reported yet.",
        hotspot: "N/A",
        department: "N/A",
        recommendation: "No recommendations available.",
      };
    }

    const formattedIssues = issues
      .map(
        (issue, index) => `
Issue ${index + 1}
Title: ${issue.title}
Description: ${issue.description}
Category: ${issue.category}
Priority: ${issue.priority}
Department: ${issue.department}
Location: ${issue.location}
Status: ${issue.status}
`,
      )
      .join("\n-----------------------------\n");

    const prompt = `
You are an AI Smart City Assistant.

Analyze the following civic issues.

${formattedIssues}

Generate ONLY valid JSON in this exact format:

{
  "summary": "...",
  "hotspot": "...",
  "department": "...",
  "recommendation": "..."
}

Rules:
- Return ONLY JSON.
- No markdown.
- No explanation.
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    try {
      return JSON.parse(text.replace(/```json|```/g, "").trim());
    } catch {
      return {
        summary: text,
        hotspot: "Unknown",
        department: "Unknown",
        recommendation: "No recommendation generated.",
      };
    }
  } catch (error) {
    console.log("Gemini Insights Error:");
    console.log(error);

    return {
      summary: "AI Insights unavailable.",
      hotspot: "Unknown",
      department: "Unknown",
      recommendation: "Try again later.",
    };
  }
};

// ✅ Export OUTSIDE the function
module.exports = {
  generateCityInsights,
};
