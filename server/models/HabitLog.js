const mongoose = require('mongoose');

const HabitLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    habitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit',
        required: true
    },
    date: {
        type: String, // "YYYY-MM-DD"
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    note: {
        type: String,
        default: ''
    }
}, { timestamps: true });

// Add unique compound index on habitId + date
HabitLogSchema.index({ habitId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('HabitLog', HabitLogSchema);
