import React from 'react';
import { TrendingUp, Zap, Calendar, ArrowRight } from 'lucide-react';

const ProgressForecast = ({ forecast }) => {
    if (!forecast) return null;

    return (
        <div className="card-cream bg-white dark:bg-slate-900 overflow-hidden relative group transition-colors duration-300">
            {/* Animated Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                    <div className="p-1.5 bg-accent-primary/10 rounded-lg">
                        <TrendingUp size={16} className="text-accent-primary" />
                    </div>
                    <h3 className="text-text-muted font-black text-[10px] tracking-widest uppercase">SMART FORECAST</h3>
                </div>

                <div className="space-y-6">
                    {/* Velocity Stat */}
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-[9px] font-black text-text-muted uppercase tracking-tighter mb-1">Current Velocity</p>
                            <div className="text-2xl font-black text-text-dark tracking-tighter">
                                {forecast.velocity} <span className="text-xs font-bold text-text-muted">habits/day</span>
                            </div>
                        </div>
                        <div className="h-8 w-[1px] bg-border-color"></div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-text-muted uppercase tracking-tighter mb-1">Consistency</p>
                            <div className="text-lg font-black text-accent-mint flex items-center gap-1 justify-end">
                                <Zap size={14} fill="currentColor" /> High
                            </div>
                        </div>
                    </div>

                    {/* Projections */}
                    <div className="grid grid-cols-1 gap-3">
                        <div className="bg-bg-primary/50 p-3 rounded-xl border border-border-color/40 flex items-center justify-between group/item hover:border-accent-primary/30 transition-colors">
                            <div className="flex items-center gap-3">
                                <Calendar size={14} className="text-text-muted" />
                                <span className="text-[11px] font-bold text-text-dark">Level {forecast.estLevelByMonthEnd} by Month End</span>
                            </div>
                            <ArrowRight size={12} className="text-text-muted group-hover/item:translate-x-1 transition-transform" />
                        </div>

                        <div className="bg-bg-primary/50 p-3 rounded-xl border border-border-color/40 flex items-center justify-between group/item hover:border-accent-primary/30 transition-colors">
                            <div className="flex items-center gap-3">
                                <TrendingUp size={14} className="text-text-muted" />
                                <span className="text-[11px] font-bold text-text-dark">Next Target: {forecast.nextMilestone}</span>
                            </div>
                            <ArrowRight size={12} className="text-text-muted group-hover/item:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>

                <p className="mt-6 text-[9px] text-text-muted font-bold italic opacity-60">
                    Predictions are based on your performance over the last 7 days.
                </p>
            </div>
        </div>
    );
};

export default ProgressForecast;
