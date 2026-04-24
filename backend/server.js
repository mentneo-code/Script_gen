require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Gemini Configuration
if (!process.env.GEMINI_API_KEY) {
    console.error('CRITICAL: GEMINI_API_KEY is missing in .env file');
    process.exit(1);
}

let model;
try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    console.log('Gemini model initialized successfully');
} catch (e) {
    console.error('Failed to initialize Gemini model:', e.message);
    process.exit(1);
}

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Endpoint to generate script
app.post('/generate-script', async (req, res) => {
    const {
        businessName,
        productDescription,
        targetAudience,
        platform,
        tone,
        language,
        duration,
        specialRequirements
    } = req.body;

    if (!businessName || !productDescription || !targetAudience || !platform || !tone || !language || !duration) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const prompt = `You are a professional advertisement script writer.

Create a high-converting ad script.

Business: ${businessName}
Product: ${productDescription}
Audience: ${targetAudience}
Platform: ${platform}
Tone: ${tone}
Language: ${language}
Duration: ${duration}
${specialRequirements ? `Special Requirements: ${specialRequirements}` : ''}

Include:
* Hook
* Problem
* Solution
* Benefits
* CTA

Make it natural, engaging, and suitable for video ads.
Since the duration is ${duration}, and each scene/clip is typically 8 seconds, please structure the script to align with this timing.

Output only the script text without any extra formatting or conversational filler.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const script = response.text();
        
        res.json({ script });

    } catch (error) {
        console.error('Error calling Gemini:', error);
        res.status(500).json({ error: 'Failed to generate script. Technical Error: ' + error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    // Keep alive interval
    setInterval(() => {}, 10000);
});
