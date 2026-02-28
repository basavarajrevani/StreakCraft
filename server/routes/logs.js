const express = require('express');
const HabitLog = require('../models/HabitLog');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

// GET /api/logs?month=YYYY-MM
router.get('/', async (req, res) => {
    try {
        const { month } = req.query;
        if (!month) return res.status(400).json({ message: 'Month is required (YYYY-MM)' });

        // Regex to match "YYYY-MM-DD" where YYYY-MM matches the query
        const logs = await HabitLog.find({
            userId: req.user.id,
            date: { $regex: `^${month}` }
        });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/logs/toggle
router.post('/toggle', async (req, res) => {
    try {
        const { habitId, date } = req.body;
        if (!habitId || !date) {
            return res.status(400).json({ message: 'habitId and date are required' });
        }

        let log = await HabitLog.findOne({
            userId: req.user.id,
            habitId,
            date
        });

        if (log) {
            log.completed = !log.completed;
            await log.save();
        } else {
            log = new HabitLog({
                userId: req.user.id,
                habitId,
                date,
                completed: true
            });
            await log.save();
        }

        // --- XP & Leveling Logic ---
        if (log.completed) {
            const User = require('../models/User');
            const user = await User.findById(req.user.id);
            if (user) {
                user.xp += 10;
                // Level Up Logic: 100 XP per level
                const newLevel = Math.floor(user.xp / 100) + 1;
                user.level = newLevel;
                await user.save();
                // Return user stats for the frontend to update progress bar
                return res.json({ log, user: { xp: user.xp, level: user.level } });
            }
        }

        res.json({ log });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Update or Add a Note to a log
router.put('/note', async (req, res) => {
    try {
        const { logId, note } = req.body;
        const log = await HabitLog.findOneAndUpdate(
            { _id: logId, userId: req.user.id },
            { note },
            { new: true }
        );
        res.json(log);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
