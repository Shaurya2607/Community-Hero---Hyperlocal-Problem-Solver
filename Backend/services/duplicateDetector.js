const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const detectDuplicateIssue = async (newIssue, existingIssues) => {
  try {
    if (!existingIssues || existingIssues.length === 0) {
      return {
        duplicate: false,
        confidence: 0,
        matchingIssue: null,
        reason: "No existing issues found.",
      };
    }

    const issuesText = existingIssues
      .map(
        (issue, index) => `
Issue ${index + 1}

ID: ${issue._id}

Title: ${issue.title}

Description: ${issue.description}

Category: ${issue.category}

Location: ${issue.location}
`,
      )
      .join("\n--------------------------------------\n");

    const prompt = `
You are an AI assistant for a Smart City platform.

A citizen is reporting the following issue.

Title:
${newIssue.title}

Description:
${newIssue.description}

Location:
${newIssue.location}

Below are existing reported issues.

${issuesText}

Your job is to determine whether the new issue is essentially the SAME issue as one of the existing reports.

Consider:

• Description similarity
• Location similarity
• Category similarity
• Meaning (not just exact words)

Return ONLY valid JSON in this format.

{
  "duplicate": true,
  "confidence": 92,
  "matchingIssueId": "...",
  "reason": "..."
}

If no duplicate exists return

{
  "duplicate": false,
  "confidence": 10,
  "matchingIssueId": null,
  "reason": "..."
}

Return ONLY JSON.
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const ai = JSON.parse(text.replace(/```json|```/g, "").trim());

    let matchedIssue = null;

    if (ai.duplicate && ai.matchingIssueId) {
      matchedIssue = existingIssues.find(
        (issue) => issue._id.toString() === ai.matchingIssueId,
      );
    }

    return {
      duplicate: ai.duplicate,
      confidence: ai.confidence,
      reason: ai.reason,
      matchingIssue: matchedIssue,
    };
  } catch (error) {
    console.log("Duplicate Detection Error");
    console.log(error);

    return {
      duplicate: false,
      confidence: 0,
      matchingIssue: null,
      reason: "AI could not determine duplicates.",
    };
  }
};

module.exports = {
  detectDuplicateIssue,
};
