import { useMemo } from 'react';

const useProgress = (habits, logs, selectedMonth) => {
    return useMemo(() => {
        if (!selectedMonth) return null;

        const [year, month] = selectedMonth.split('-').map(Number);
        const daysInMonth = new Date(year, month, 0).getDate();

        const totalPossible = habits.length * daysInMonth;
        const totalCompleted = logs.filter(log => log.completed).length;
        const globalPercent = totalPossible === 0 ? 0 : (totalCompleted / totalPossible) * 100;

        // Helper to calculate current streak
        const calculateStreak = (habitId) => {
            let streak = 0;
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Check from today or yesterday backwards
            for (let i = 0; i < 365; i++) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const dateStr = date.toISOString().split('T')[0];

                const log = logs.find(l => l.habitId === habitId && l.date === dateStr);
                if (log && log.completed) {
                    streak++;
                } else {
                    // If we're looking at today and it's not completed, continue to yesterday
                    // If we're looking at any day before today and it's not completed, the streak ends
                    if (i > 0) break;
                    // Check if yesterday was completed
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yDateStr = yesterday.toISOString().split('T')[0];
                    const yLog = logs.find(l => l.habitId === habitId && l.date === yDateStr);
                    if (!yLog || !yLog.completed) break;
                }
            }
            return streak;
        };

        // Habit Stats
        const habitStats = habits.map(habit => {
            const completedCount = logs.filter(log => log.habitId === habit._id && log.completed).length;
            const leftCount = daysInMonth - completedCount;
            const percent = (completedCount / daysInMonth) * 100;
            const streak = calculateStreak(habit._id);
            return { ...habit, completedCount, leftCount, percent, streak };
        }).sort((a, b) => b.percent - a.percent);

        // Daily Stats (1 to 31)
        const dailyStats = Array.from({ length: daysInMonth }, (_, i) => {
            const day = String(i + 1).padStart(2, '0');
            const dateStr = `${selectedMonth}-${day}`;
            const completedOnDay = logs.filter(log => log.date === dateStr && log.completed).length;
            const dailyPercent = habits.length === 0 ? 0 : (completedOnDay / habits.length) * 100;
            return { day: i + 1, dailyPercent, completedOnDay };
        });

        // Weekly Stats (5 weeks approx)
        const weeklyStats = [];
        for (let i = 0; i < 5; i++) {
            const startDay = i * 7 + 1;
            const endDay = Math.min((i + 1) * 7, daysInMonth);
            if (startDay > daysInMonth) break;

            const weekLogs = logs.filter(log => {
                const day = parseInt(log.date.split('-')[2]);
                return day >= startDay && day <= endDay && log.completed;
            });

            const weekPossible = habits.length * (endDay - startDay + 1);
            const weekCompleted = weekLogs.length;
            const weekPercent = weekPossible === 0 ? 0 : (weekCompleted / weekPossible) * 100;

            weeklyStats.push({
                week: `Week ${i + 1}`,
                weekCompleted,
                weekGoal: weekPossible,
                weekPercent
            });
        }

        // Category Stats
        const categories = [...new Set(habits.map(h => h.category || 'Health'))];
        const categoryStats = categories.map(cat => {
            const catHabits = habitStats.filter(h => (h.category || 'Health') === cat);
            const avgPercent = catHabits.reduce((acc, h) => acc + h.percent, 0) / (catHabits.length || 1);
            return { name: cat, value: avgPercent, fullMark: 100 };
        });

        // Heatmap Data (Intensity Matrix for the month)
        const heatmapData = dailyStats.map(ds => ({
            day: ds.day,
            intensity: ds.dailyPercent,
            count: ds.completedOnDay
        }));

        // Weekly Category Distribution (Stacked Bar Data)
        const categoryWeekly = weeklyStats.map((ws, i) => {
            const startDay = i * 7 + 1;
            const endDay = Math.min((i + 1) * 7, daysInMonth);
            const entry = { week: ws.week };

            categories.forEach(cat => {
                const catCount = logs.filter(log => {
                    const h = habits.find(hab => hab._id === log.habitId);
                    const day = parseInt(log.date.split('-')[2]);
                    return (h?.category || 'Health') === cat && day >= startDay && day <= endDay && log.completed;
                }).length;
                entry[cat] = catCount;
            });
            return entry;
        });

        // Peak Performance Stats (Insight Cards)
        const bestStreak = Math.max(...habitStats.map(h => h.streak), 0);
        const maxDailyCompletions = Math.max(...dailyStats.map(ds => ds.completedOnDay), 0);
        const topCategory = categoryStats.length > 0
            ? [...categoryStats].sort((a, b) => b.value - a.value)[0].name
            : 'None';

        // Achievement Detection
        const totalCompletions = logs.filter(l => l.completed).length;
        const achievements = [
            {
                id: 'firestarter',
                label: 'Firestarter',
                description: 'Hit a 7-day streak on any habit',
                icon: '🔥',
                unlocked: bestStreak >= 7,
                category: 'Streak'
            },
            {
                id: 'architect',
                label: 'Architect',
                description: 'Complete 50 total habits',
                icon: '🏗️',
                unlocked: totalCompletions >= 50,
                category: 'Milestone'
            },
            {
                id: 'polymath',
                label: 'Polymath',
                description: 'Progress in 4 different categories',
                icon: '🎓',
                unlocked: categoryStats.filter(c => c.value > 0).length >= 4,
                category: 'Balance'
            },
            {
                id: 'elite',
                label: 'Elite Miner',
                description: 'Reach Level 10',
                icon: '💎',
                unlocked: (habits[0]?.userLevel || 1) >= 10, // Assuming level is passed or accessible
                category: 'Rank'
            }
        ];

        // Forecasting Logic (Velocity-based)
        const recentCompletions = logs.filter(l => {
            const logDate = new Date(l.date);
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return logDate >= sevenDaysAgo && l.completed;
        }).length;

        const velocity = Math.round((recentCompletions / 7) * 10) / 10;
        const estLevelByMonthEnd = Math.round((habits[0]?.userLevel || 1) + (velocity * 2));

        return {
            daysInMonth,
            totalPossible,
            totalCompleted,
            globalPercent,
            habitStats,
            dailyStats,
            weeklyStats,
            categoryStats,
            categoryWeekly,
            heatmapData,
            totalHabits: habits.length,
            peakStats: {
                bestStreak,
                maxDailyCompletions,
                topCategory,
                completionRate: Math.round(globalPercent)
            },
            achievements,
            forecast: {
                velocity,
                estLevelByMonthEnd,
                nextMilestone: bestStreak >= 7 ? '30 Day Streak' : '7 Day Streak'
            }
        };
    }, [habits, logs, selectedMonth]);
};

export default useProgress;
