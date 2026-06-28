const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Analyze a single issue
const analyzeIssue = async (title, description) => {
  try {
    const prompt = `
You are an AI assistant for a Smart City application.

Analyze the following issue.

Title:
${title}

Description:
${description}

Return ONLY valid JSON in this exact format.

{
  "category":"Road | Garbage | Water | Electricity | Healthcare | Safety | Other",
  "priority":"Low | Medium | High",
  "department":"Responsible Government Department",
  "summary":"Short summary",
  "solution":"Suggested solution"
}
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (err) {
    console.log("Gemini Analyze Error:", err.message);

    return JSON.stringify({
      category: "General",
      priority: "Medium",
      department: "Municipality",
      summary: "Unable to analyze.",
      solution: "Manual review required.",
    });
  }
};

// Generate dashboard insights
const generateCityInsights = async (issues) => {
  try {
    const prompt = `
You are an AI Smart City Analyst.

Here are all reported issues:

${JSON.stringify(issues, null, 2)}

Return ONLY valid JSON.

{
  "hotspot":"Area having maximum issues",
  "department":"Most responsible department",
  "summary":"Overall city condition",
  "recommendation":"Recommendation to improve city"
}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    return JSON.parse(
      text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim(),
    );
  } catch (err) {
    console.error("============== GEMINI ERROR ==============");
    console.error(err);
    console.error("==========================================");

    return {
      hotspot: "Unknown",
      department: "Unknown",
      summary: "AI Insights unavailable.",
      recommendation: "Try again later.",
    };
  }
};

module.exports = {
  analyzeIssue,
  generateCityInsights,
};
