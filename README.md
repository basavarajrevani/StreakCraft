# 🏆 StreakCraft | The Ultimate Habit Forge

Forge your discipline and craft your legacy with **StreakCraft**, a premium, RPG-inspired habit-tracking ecosystem designed for the relentless. 

![StreakCraft Hero](https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=2000)

## ✨ Premium Features

### 🎮 RPG Gamification
- **Character Evolution**: Level up your profile as you complete daily streaks.
- **Achievement Hall**: Unlock rare badges and titles by mastering specialized categories.
- **Dynamic Celebration**: Experience global confetti burst engines upon hitting major milestones.

### 📊 Advanced Analytics & Insights
- **Consistency Heatmap**: Visualize your progress with a high-fidelity habit intensity grid.
- **Progress Forecast**: Predictive projections of your growth based on current tracking data.
- **Multi-Format Export**: One-click professional exports to **PDF** (Styled Reports) and **Excel** (Data Analysis).

### 📱 Flawless Responsiveness
- **Adaptive Mastery**: Fully optimized for Desktop, Tablet, and Mobile (down to 320px).
- **Glassmorphic UI**: High-end aesthetic with frosted-glass effects and smooth transitions.
- **Dark Resonance**: Native dark mode support with tailored Slate-900 palettes.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Recharts, Lucide Icons, Canvas-Confetti.
- **Backend**: Node.js, Express, MongoDB Cloud (Mongoose).
- **Security**: Helmet.js, Express Rate Limiter, JWT (JSON Web Tokens), BCrypt Hashing.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account (or local instance)

### Root Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/StreakCraft.git
   cd StreakCraft
   ```

### Server Configuration
1. Navigate to server: `cd server`
2. Install dependencies: `npm install`
3. Configure Environment:
   - Copy `.env.example` to `.env`
   - Fill in your `MONGO_URI` and `JWT_SECRET`.
4. Start Server: `npm start`

### Client Configuration
1. Navigate to client: `cd client`
2. Install dependencies: `npm install`
3. Configure Environment:
   - Copy `.env.example` to `.env`
   - Adjust `VITE_API_URL` if necessary.
4. Start Frontend: `npm run dev`

## 🛡️ Security & Privacy
StreakCraft uses multi-level environment isolation to ensure your private configuration keys never leave your machine. Credentials are protected via `.gitignore` and provided as manageable `.env.example` templates.

---
Built with ❤️ by **Basavaraj Revani**
*Designed for the relentless.*
