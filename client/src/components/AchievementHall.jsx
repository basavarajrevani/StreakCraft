import React from 'react';
import { Award, Lock, CheckCircle2 } from 'lucide-react';

const AchievementHall = ({ achievements }) => {
    if (!achievements) return null;

    return (
        <div className="card-cream bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                    <h3 className="text-text-muted font-black text-[10px] tracking-widest uppercase">ACHIEVEMENT HALL</h3>
                    <p className="text-[10px] text-text-muted font-bold opacity-60 uppercase">UNLOCKED: {achievements.filter(a => a.unlocked).length}/{achievements.length}</p>
                </div>
                <Award className="text-accent-primary opacity-20" size={24} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((badge) => (
                    <div
                        key={badge.id}
                        className={`group relative p-4 rounded-2xl border transition-all duration-300 ${badge.unlocked
                                ? 'bg-gradient-to-br from-accent-primary/5 to-accent-primary/10 border-accent-primary/20 shadow-lg shadow-accent-primary/5 scale-100'
                                : 'bg-bg-primary/50 border-border-color opacity-50 grayscale scale-95'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner ${badge.unlocked ? 'bg-white dark:bg-slate-800' : 'bg-slate-200 dark:bg-slate-700'
                                }`}>
                                {badge.unlocked ? badge.icon : <Lock size={20} className="text-text-muted" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-black text-xs text-text-dark tracking-tight">{badge.label}</h4>
                                    {badge.unlocked && <CheckCircle2 size={12} className="text-accent-mint" />}
                                </div>
                                <p className="text-[10px] text-text-muted font-bold leading-tight mt-0.5">{badge.description}</p>
                            </div>
                        </div>

                        {badge.unlocked && (
                            <div className="absolute top-2 right-2 flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border-color/40">
                <div className="flex items-center justify-between text-[9px] font-black text-text-muted uppercase tracking-tighter">
                    <span>Rank: {achievements.filter(a => a.unlocked).length >= 3 ? 'Elite Tracker' : 'Novice Miner'}</span>
                    <span className="text-accent-primary">Next: {achievements.find(a => !a.unlocked)?.label || 'None'}</span>
                </div>
            </div>
        </div>
    );
};

export default AchievementHall;
