import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts';

const DonutChart = ({ stats }) => {
    if (!stats) return null;

    const data = [
        { name: 'Completed', value: stats.globalPercent },
        { name: 'Left', value: 100 - stats.globalPercent }
    ];

    const COLORS = ['#6366f1', 'var(--border-color)'];

    return (
        <div className="card-cream bg-white dark:bg-slate-900 h-full flex flex-col items-center justify-center min-h-[300px] transition-colors duration-300">
            <h3 className="text-text-muted font-bold text-xs mb-4 tracking-widest uppercase text-center w-full">OVERVIEW DAILY PROGRESS</h3>
            <div className="relative w-full h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={0}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-text-dark">{Math.round(stats.globalPercent)}%</span>
                    <span className="text-[10px] text-text-muted font-bold uppercase tracking-tighter">DONE MONTHLY</span>
                </div>
            </div>
            <div className="flex justify-between w-full mt-4 px-4">
                <div className="text-left">
                    <p className="text-[10px] font-bold text-text-muted uppercase">LEFT</p>
                    <p className="text-xl font-black text-text-muted/40">{Math.round(100 - stats.globalPercent)}%</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-text-muted uppercase">COMPLETED</p>
                    <p className="text-xl font-black text-accent-peach">{Math.round(stats.globalPercent)}%</p>
                </div>
            </div>
        </div>
    );
};

export default DonutChart;
