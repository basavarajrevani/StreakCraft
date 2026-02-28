const TopHabits = ({ habits }) => {
    if (!habits) return null;

    const topHabits = [...habits].sort((a, b) => b.percent - a.percent).slice(0, 10);

    return (
        <div className="card-cream h-full flex flex-col min-h-[300px] transition-colors duration-300">
            <h3 className="text-text-muted font-bold text-xs mb-6 tracking-widest uppercase text-center">TOP 10 DAILY HABITS</h3>
            <div className="space-y-3 flex-1 overflow-y-auto">
                {topHabits.map((habit, index) => (
                    <div key={habit._id} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <span className="text-text-muted/20 dark:text-text-muted/40 font-black text-lg italic w-6">{index + 1}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xl">{habit.emoji}</span>
                                <span className="font-bold text-text-dark group-hover:text-accent-peach transition-colors">{habit.name}</span>
                            </div>
                        </div>
                        <span className="font-black text-accent-peach">{Math.round(habit.percent)}%</span>
                    </div>
                ))}
                {topHabits.length === 0 && (
                    <div className="h-full flex items-center justify-center text-text-muted italic text-sm">
                        No habits tracked yet
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopHabits;
