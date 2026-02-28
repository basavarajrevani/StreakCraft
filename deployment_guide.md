# 🚀 StreakCraft Deployment Guide: From GitHub to Render

Host your premium habit tracker for free using **Render** and **MongoDB Atlas**. Follow these step-by-step instructions.

## 📦 1. Pre-Deployment Check
Ensure you have pushed the latest version of your code to GitHub.
- Root contains `server/` and `client/` directories.
- `.gitignore` files are correctly set up to exclude local `.env` files.

---

## ☁️ 2. Database: MongoDB Atlas
1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. **Network Access**: Add `0.0.0.0/0` (Allow access from everywhere) temporarily, or find Render's IP outbound addresses.
3. **Database Access**: Ensure you have a user with `readWrite` permissions.
4. **Connection String**: Copy your connection string (e.g., `mongodb+srv://<username>:<password>@cluster.mongodb.net/streakcraft`).

---

## 🛠️ 3. Backend Deployment: Render (Web Service)
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New > Web Service**.
2. Connect your GitHub repository.
3. **Configuration**:
   - **Name**: `streakcraft-api`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Environment Variables**: Click "Advanced" or "Environment" and add:
   - `MONGO_URI`: *Your MongoDB connection string*
   - `JWT_SECRET`: *A long random string*
   - `PORT`: `5000`
   - `CLIENT_URL`: *Wait! You'll add this after the Frontend is deployed.*

---

## 🎨 4. Frontend Deployment: Render (Static Site)
1. In Render, click **New > Static Site**.
2. Connect the same GitHub repository.
3. **Configuration**:
   - **Name**: `streakcraft`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. **Environment Variables**: Add:
   - `VITE_API_URL`: `https://streakcraft-api.onrender.com/api` *(Replace with your actual backend URL)*
5. **Redirects/Rewrites**: Go to the "Redirects/Rewrites" tab and add:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite` (This ensures React Router works correctly).

---

## 🔗 5. Final Connection
1. Once the Frontend is deployed, copy its URL (e.g., `https://streakcraft.onrender.com`).
2. Go back to your **Backend Service > Environment**.
3. Update `CLIENT_URL` with your frontend URL.
4. Restart the Backend service.

---
### 🎉 Your app is now LIVE!
The celebratory confetti will now fire on a global production scale.
