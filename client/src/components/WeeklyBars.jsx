const WeeklyBars = ({ stats }) => {
    if (!stats) return null;

    return (
        <div className="card-cream overflow-hidden transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-xl text-text-dark italic">PROGRESS</h3>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-text-muted uppercase">AVG MONTHLY</span>
                    <span className="font-black text-2xl text-accent-primary underline decoration-accent-secondary decoration-4 underline-offset-4">
                        {Math.round(stats.globalPercent)}%
                    </span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                            <th className="pb-4">HABIT</th>
                            <th className="pb-4">COMPLETED</th>
                            <th className="pb-4">LEFT</th>
                            <th className="pb-4">PERCENT</th>
                            <th className="pb-4">STREAK</th>
                            <th className="pb-4 w-1/3">TREND</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                        {stats.habitStats.map(habit => (
                            <tr key={habit._id} className="group hover:bg-bg-primary transition-colors">
                                <td className="py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{habit.emoji}</span>
                                        <span className="font-bold text-text-dark">{habit.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 font-bold text-text-dark">{habit.completedCount}</td>
                                <td className="py-4 font-bold text-text-muted">{habit.leftCount}</td>
                                <td className="py-4">
                                    <span className="bg-accent-primary/10 text-accent-primary px-2 py-1 rounded-md font-black text-xs">
                                        {Math.round(habit.percent)}%
                                    </span>
                                </td>
                                <td className="py-4 font-black text-orange-500">
                                    {habit.streak > 0 ? `🔥 ${habit.streak}` : '—'}
                                </td>
                                <td className="py-4">
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-accent-primary transition-all duration-1000"
                                            style={{ width: `${habit.percent}%` }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WeeklyBars;
