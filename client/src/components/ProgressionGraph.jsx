import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const ProgressionGraph = ({ stats }) => {
    if (!stats) return null;

    const weekColors = [
        'var(--week-1)',
        'var(--week-2)',
        'var(--week-3)',
        'var(--week-4)',
        'var(--week-5)'
    ];

    return (
        <div className="card-cream bg-white dark:bg-slate-900 space-y-8 transition-colors duration-300">
            <div>
                <div className="flex justify-between items-end mb-4">
                    <h3 className="text-text-muted font-bold text-xs tracking-widest uppercase">MONTHLY PROGRESSION</h3>
                    <div className="flex gap-4">
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-text-muted">TOTAL LOGS</p>
                            <p className="text-xl font-black text-text-dark">{stats.totalCompleted} <span className="text-text-muted/50 text-sm">/ {stats.totalPossible}</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-text-muted">GLOBAL AVG</p>
                            <p className="text-xl font-black text-accent-peach">{Math.round(stats.globalPercent)}%</p>
                        </div>
                    </div>
                </div>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats.dailyStats}>
                            <defs>
                                <linearGradient id="colorPercent" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" opacity={0.3} />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                            <YAxis hide domain={[0, 100]} />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '16px',
                                    border: 'none',
                                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                    backgroundColor: 'var(--bg-card)',
                                    color: 'var(--text-dark)'
                                }}
                                cursor={{ stroke: '#6366f1', strokeWidth: 2 }}
                            />
                            <Area type="monotone" dataKey="dailyPercent" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorPercent)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div>
                <h3 className="text-text-muted font-bold text-xs tracking-widest uppercase mb-4">WEEKLY DISTRIBUTION</h3>
                <div className="h-[150px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.weeklyStats}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" opacity={0.3} />
                            <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                            <YAxis hide />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{
                                    backgroundColor: 'var(--bg-card)',
                                    borderRadius: '16px',
                                    border: 'none',
                                    color: 'var(--text-dark)',
                                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                                }}
                            />
                            <Bar dataKey="weekPercent" radius={[4, 4, 0, 0]}>
                                {stats.weeklyStats.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={weekColors[index % weekColors.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ProgressionGraph;
