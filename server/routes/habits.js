const express = require('express');
const Habit = require('../models/Habit');
const HabitLog = require('../models/HabitLog');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

// GET /api/habits
router.get('/', async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user.id });
        res.json(habits);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/habits
router.post('/', async (req, res) => {
    try {
        const { name, emoji, goal, color } = req.body;
        const habit = new Habit({
            userId: req.user.id,
            name,
            emoji,
            goal,
            color
        });
        await habit.save();
        res.status(201).json(habit);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /api/habits/:id
router.put('/:id', async (req, res) => {
    try {
        let habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).json({ message: 'Habit not found' });

        if (habit.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const { name, emoji, goal, color } = req.body;
        habit = await Habit.findByIdAndUpdate(
            req.params.id,
            { $set: { name, emoji, goal, color } },
            { new: true }
        );
        res.json(habit);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /api/habits/:id
router.delete('/:id', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).json({ message: 'Habit not found' });

        if (habit.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Habit.findByIdAndDelete(req.params.id);
        // Delete all associated logs
        await HabitLog.deleteMany({ habitId: req.params.id });

        res.json({ message: 'Habit and logs deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
