# Deployment Guide for AdScript AI

To use this tool across various devices, you need to deploy the Backend and the Frontend separately.

## Step 1: Deploy the Backend (Recommended: Render)
Since Vercel is best for frontends, I recommend using **Render.com** for your Node.js backend.

1.  **Push your code to GitHub**:
    *   Create a new GitHub repository.
    *   Upload the contents of the `backend` folder (ensure `.env` is NOT uploaded, but `package.json` and `server.js` are).
2.  **Create a New Web Service on Render**:
    *   Connect your GitHub account.
    *   Select your repository.
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
3.  **Add Environment Variables**:
    *   In the Render dashboard, go to **Environment**.
    *   Add `GEMINI_API_KEY` with your key.
    *   Add `PORT` with value `5001`.
4.  **Copy the Service URL**: Once deployed, Render will give you a URL like `https://your-app-backend.onrender.com`.

---

## Step 2: Deploy the Frontend (Vercel)

1.  **Push your frontend code to GitHub**:
    *   Upload the contents of the `frontend` folder to a new GitHub repository.
2.  **Connect to Vercel**:
    *   Go to [vercel.com](https://vercel.com) and click **Add New Project**.
    *   Import your GitHub repository.
3.  **Configure Environment Variables**:
    *   In the "Environment Variables" section, add a new variable:
    *   **Key**: `VITE_API_URL`
    *   **Value**: Your Render backend URL (e.g., `https://your-app-backend.onrender.com`)
4.  **Deploy**: Click **Deploy**. Vercel will give you a link (e.g., `https://your-app.vercel.app`) that you can open on any device!

---

## Important: CORS Configuration
If you deploy to separate URLs, you should ensure the backend allows requests from your Vercel URL.
In `backend/server.js`, the current configuration uses `app.use(cors())`, which allows all origins by default. This is fine for testing, but you can restrict it later if needed.
