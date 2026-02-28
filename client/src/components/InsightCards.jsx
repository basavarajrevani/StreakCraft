import React from 'react';
import { Flame, Target, Star, TrendingUp } from 'lucide-react';

const InsightCards = ({ peakStats }) => {
    if (!peakStats) return null;

    const cards = [
        {
            label: 'BEST STREAK',
            value: `${peakStats.bestStreak} Days`,
            icon: <Flame className="text-orange-500" />,
            color: 'bg-orange-500/10',
            border: 'border-orange-500/20'
        },
        {
            label: 'PEAK DAILY',
            value: `${peakStats.maxDailyCompletions} Habits`,
            icon: <Target className="text-accent-primary" />,
            color: 'bg-accent-primary/10',
            border: 'border-accent-primary/20'
        },
        {
            label: 'TOP CATEGORY',
            value: peakStats.topCategory,
            icon: <Star className="text-yellow-500" />,
            color: 'bg-yellow-500/10',
            border: 'border-yellow-500/20'
        },
        {
            label: 'COMPLETION',
            value: `${peakStats.completionRate}%`,
            icon: <TrendingUp className="text-accent-mint" />,
            color: 'bg-accent-mint/10',
            border: 'border-accent-mint/20'
        }
    ];

    return (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, i) => (
                <div key={i} className={`p-4 rounded-2xl border ${card.border} ${card.color} transition-all hover:scale-[1.02] cursor-default`}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white/80 dark:bg-slate-900/80 rounded-lg shadow-sm">
                            {React.cloneElement(card.icon, { size: 18 })}
                        </div>
                        <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{card.label}</span>
                    </div>
                    <div className="text-xl font-black text-text-dark tracking-tight">
                        {card.value}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InsightCards;
