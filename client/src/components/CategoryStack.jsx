import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CategoryStack = ({ data }) => {
    if (!data || data.length === 0) return null;

    // Extract categories from the first entry to create Bar components
    const categories = Object.keys(data[0]).filter(key => key !== 'week');

    // Professional color palette for categories
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#fb923c', '#8b5cf6', '#0ea5e9'];

    return (
        <div className="card-cream bg-white dark:bg-slate-900 transition-colors duration-300 h-[400px]">
            <h3 className="text-text-muted font-black text-[10px] tracking-widest uppercase mb-6">CATEGORY DISTRIBUTION</h3>
            <ResponsiveContainer width="100%" height="85%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" opacity={0.5} />
                    <XAxis
                        dataKey="week"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--text-muted)', fontSize: 10, fontWeight: 700 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--text-muted)', fontSize: 10, fontWeight: 700 }}
                    />
                    <Tooltip
                        cursor={{ fill: 'var(--bg-primary)', opacity: 0.4 }}
                        contentStyle={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}
                    />
                    <Legend
                        iconType="circle"
                        wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}
                    />
                    {categories.map((cat, i) => (
                        <Bar
                            key={cat}
                            dataKey={cat}
                            stackId="a"
                            fill={colors[i % colors.length]}
                            radius={i === categories.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryStack;
