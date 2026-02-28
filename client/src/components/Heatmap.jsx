import React from 'react';

const Heatmap = ({ data, selectedMonth }) => {
    if (!data) return null;

    // Helper to get styling based on intensity
    const getIntensityStyle = (intensity) => {
        if (intensity === 0) return 'bg-bg-primary border-border-color/60 text-text-muted';
        if (intensity < 30) return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
        if (intensity < 60) return 'bg-indigo-500/30 text-indigo-700 dark:text-indigo-300 border-indigo-500/40';
        if (intensity < 90) return 'bg-indigo-500/70 text-white border-indigo-600';
        return 'bg-accent-primary text-white border-accent-primary shadow-lg shadow-accent-primary/20';
    };

    return (
        <div className="card-cream bg-white dark:bg-slate-900 transition-colors duration-300 p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex flex-col">
                    <h3 className="text-text-muted font-black text-[10px] tracking-widest uppercase">CONSISTENCY HEATMAP</h3>
                    <p className="text-[10px] text-text-muted font-bold opacity-60 uppercase">{selectedMonth.replace('-', ' • ')}</p>
                </div>
                <div className="flex gap-2 items-center bg-bg-primary/50 p-2 rounded-xl border border-border-color/50">
                    <div className="w-2.5 h-2.5 rounded-sm bg-bg-primary border border-border-color"></div>
                    <div className="w-2.5 h-2.5 rounded-sm bg-accent-primary/30"></div>
                    <div className="w-2.5 h-2.5 rounded-sm bg-accent-primary"></div>
                    <span className="text-[9px] text-text-muted font-black uppercase tracking-tighter ml-1">Intensity</span>
                </div>
            </div>

            <div className="grid grid-cols-7 sm:flex sm:flex-wrap gap-2 sm:gap-2.5 place-items-center sm:justify-start">
                {data.map((day) => (
                    <div
                        key={day.day}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-[10px] sm:text-[11px] font-black transition-all duration-300 hover:scale-125 cursor-default relative group border ${getIntensityStyle(day.intensity)}`}
                    >
                        {day.day}
                        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 hidden group-hover:block z-50">
                            <div className="bg-slate-900 dark:bg-slate-800 text-white px-3 py-1.5 rounded-lg shadow-2xl whitespace-nowrap text-[10px] font-bold border border-white/10 animate-in fade-in slide-in-from-bottom-1 duration-200">
                                {day.count} habits • {Math.round(day.intensity)}% Complete
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 pt-4 border-t border-border-color/40 flex justify-between items-center">
                <p className="text-[9px] text-text-muted font-bold italic tracking-wide">
                    The darker the cell, the higher your daily habit completion rate.
                </p>
            </div>
        </div>
    );
};

export default Heatmap;
