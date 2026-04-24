const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function test() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    try {
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        console.log("Success:", response.text());
    } catch (error) {
        console.error("Error Details:", error.message);
    }
}

test();
