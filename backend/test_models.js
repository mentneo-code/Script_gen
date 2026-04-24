const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function list() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        const result = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy model to get the client
        // There isn't a direct listModels in the SDK easily accessible without the auth client
        // but let's try gemini-pro instead as a fallback
        console.log("Testing gemini-pro...");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const res = await model.generateContent("Hi");
        console.log("gemini-pro success");
    } catch (e) {
        console.error("gemini-pro failed:", e.message);
    }
}
list();
