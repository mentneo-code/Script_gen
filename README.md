# AdScript AI - Advertisement Script Generator

A complete AI-powered advertisement script generator tool built with React and Node.js.

## Project Structure
- `/backend`: Node.js Express server with OpenAI integration.
- `/frontend`: React (Vite) application with premium styling.

## Setup Instructions

### 1. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a `.env` file (if not already present) and add your OpenAI API Key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 2. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Usage
- Open your browser to the URL provided by Vite (usually `http://localhost:5173`).
- Fill in the business details, platform, tone, and language.
- Click "Generate Script" and wait for the AI to craft your script.
- Copy the generated script to your clipboard.

## Features
- AI-powered script generation using GPT-4o.
- Supports multiple platforms (Instagram, YouTube, TV, etc.).
- Supports multiple tones and languages.
- Premium, responsive UI with dark mode aesthetics.
- One-click copy to clipboard.
- Loading states and error handling.
