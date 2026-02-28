import React from 'react';
import { Trophy } from 'lucide-react';

const LevelProgress = ({ user }) => {
    if (!user) return null;

    const currentXP = user.xp % 100;
    const progress = currentXP; // 100 XP per level

    return (
        <div className="flex items-center gap-4 bg-bg-card border border-border-color rounded-2xl px-4 py-2 shadow-sm transition-all hover:shadow-md cursor-default">
            <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20">
                    <Trophy className="text-accent-primary" size={20} />
                </div>
                <div className="absolute -top-2 -right-2 bg-accent-primary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm animate-bounce">
                    {user.level}
                </div>
            </div>

            <div className="flex flex-col gap-1 min-w-[120px]">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-text-muted">
                    <span>Rank: Explorer</span>
                    <span>{currentXP}/100 XP</span>
                </div>
                <div className="h-2 w-full bg-bg-primary rounded-full overflow-hidden border border-border-color">
                    <div
                        className="h-full bg-gradient-to-r from-accent-primary to-indigo-400 transition-all duration-1000 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LevelProgress;
