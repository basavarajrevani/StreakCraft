import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const CategoryRadar = ({ data }) => {
    if (!data || data.length === 0) return (
        <div className="card-cream flex items-center justify-center h-full min-h-[300px] text-text-muted italic text-sm">
            Add habits to see category balance
        </div>
    );

    return (
        <div className="card-cream bg-white dark:bg-slate-900 h-full flex flex-col transition-colors duration-300 min-h-[300px]">
            <h3 className="text-text-muted font-bold text-xs mb-6 tracking-widest uppercase text-center">HABIT BALANCE</h3>
            <div className="flex-1 w-full h-full min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid stroke="var(--border-color)" />
                        <PolarAngleAxis
                            dataKey="name"
                            tick={{ fill: 'var(--text-muted)', fontSize: 10, fontWeight: 'bold' }}
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Habits"
                            dataKey="value"
                            stroke="var(--accent-primary)"
                            fill="var(--accent-primary)"
                            fillOpacity={0.5}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            <p className="mt-2 text-center text-[10px] text-text-muted font-medium px-4">
                Comparison of average completion rates across all categories.
            </p>
        </div>
    );
};

export default CategoryRadar;
