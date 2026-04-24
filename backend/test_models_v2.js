const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function list() {
    // Note: The SDK doesn't have a direct listModels method on the main class
    // We usually use the REST API for that or check common names.
    // Let's try gemini-1.5-flash-latest
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
    
    for (const m of models) {
        try {
            console.log(`Testing ${m}...`);
            const model = genAI.getGenerativeModel({ model: m });
            const result = await model.generateContent("Hi");
            console.log(`${m} works!`);
            return;
        } catch (e) {
            console.error(`${m} failed:`, e.message);
        }
    }
}
list();
