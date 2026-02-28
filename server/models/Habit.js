const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    emoji: {
        type: String,
        default: '✅'
    },
    goal: {
        type: Number,
        default: 30
    },
    color: {
        type: String,
        default: '#6366f1'
    },
    category: {
        type: String,
        default: 'Health'
    }
}, { timestamps: true });

module.exports = mongoose.model('Habit', HabitSchema);
