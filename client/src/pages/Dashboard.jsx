import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import MonthSelector from '../components/MonthSelector';
import HabitGrid from '../components/HabitGrid';
import HabitEditor from '../components/HabitEditor';
import DonutChart from '../components/DonutChart';
import TopHabits from '../components/TopHabits';
import ProgressionGraph from '../components/ProgressionGraph';
import WeeklyBars from '../components/WeeklyBars';
import useProgress from '../hooks/useProgress';
import ThemeToggle from '../components/ThemeToggle';
import Heatmap from '../components/Heatmap';
import CategoryRadar from '../components/CategoryRadar';
import LevelProgress from '../components/LevelProgress';
import InsightCards from '../components/InsightCards';
import CategoryStack from '../components/CategoryStack';
import ExportButton from '../components/ExportButton';
import AchievementHall from '../components/AchievementHall';
import ProgressForecast from '../components/ProgressForecast';
import { useCelebration } from '../components/CelebrationProvider';
import { LogOut, Calendar, BarChart2, Activity, Database, Trophy, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const { fireConfetti } = useCelebration();
    const [habits, setHabits] = useState([]);
    const [logs, setLogs] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [habitsRes, logsRes, userRes] = await Promise.all([
                API.get('/habits'),
                API.get(`/logs?month=${selectedMonth}`),
                API.get('/user/profile')
            ]);
            setHabits(habitsRes.data);
            setLogs(logsRes.data);
            setUser(userRes.data);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, [selectedMonth]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const stats = useProgress(habits, logs, selectedMonth);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleAddHabit = async (data) => {
        try {
            await API.post('/habits', data);
            fetchData();
        } catch (err) { console.error(err); }
    };

    const handleUpdateHabit = async (id, data) => {
        try {
            await API.put(`/habits/${id}`, data);
            fetchData();
        } catch (err) { console.error(err); }
    };

    const handleDeleteHabit = async (id) => {
        if (!window.confirm('Are you sure you want to delete this habit and all its logs?')) return;
        try {
            await API.delete(`/habits/${id}`);
            fetchData();
        } catch (err) { console.error(err); }
    };

    const handleToggleLog = async (habitId, date) => {
        try {
            const res = await API.post('/logs/toggle', { habitId, date });

            // If XP/Level updated, sync user state and check for level up
            if (res.data.user) {
                const updatedUser = res.data.user;
                if (user && updatedUser.level > user.level) {
                    fireConfetti('levelUp');
                }
                setUser(prev => ({ ...prev, ...updatedUser }));
            }

            // Update logs
            const logsRes = await API.get(`/logs?month=${selectedMonth}`);
            setLogs(logsRes.data);
        } catch (err) { console.error(err); }
    };

    const handleSaveNote = async (logId, note) => {
        try {
            await API.put('/logs/note', { logId, note });
            const logsRes = await API.get(`/logs?month=${selectedMonth}`);
            setLogs(logsRes.data);
        } catch (err) { console.error(err); }
    };

    if (loading && habits.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-primary">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-primary pb-20 transition-colors duration-300">
            {/* Header */}
            <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border-color sticky top-0 z-30 px-3 md:px-4 py-3 transition-colors duration-300">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center text-white font-black group-hover:scale-110 transition-transform cursor-pointer shadow-lg shadow-accent-primary/20" onClick={() => navigate('/')}>S</div>
                            <h1 className="text-lg font-black text-text-dark tracking-tight hidden xs:block">StreakCraft</h1>
                        </div>
                        <div className="scale-90 xs:scale-100 origin-right sm:origin-left">
                            <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                        <div className="flex items-center bg-slate-100 dark:bg-slate-800/50 rounded-xl px-0.5 xs:px-1">
                            <ExportButton habits={habits} logs={logs} selectedMonth={selectedMonth} />
                            <div className="h-4 w-[1px] bg-border-color mx-0.5 opacity-50"></div>
                            <LevelProgress user={user} />
                        </div>
                        <div className="flex items-center gap-1.5 xs:gap-3">
                            <ThemeToggle />
                            <div className="h-5 w-[1px] bg-border-color mx-0.5"></div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 text-text-muted hover:text-accent-danger transition-colors font-black text-[10px] uppercase tracking-wider"
                            >
                                <LogOut size={16} /> <span className="hidden md:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 mt-8 space-y-8">
                {/* Global PR Insights */}
                <InsightCards peakStats={stats?.peakStats} />

                {/* Stats Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1">
                        <DonutChart stats={stats} />
                        <ProgressForecast forecast={stats?.forecast} />
                    </div>
                    <div className="lg:col-span-2 order-1 lg:order-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar className="text-accent-primary" />
                            <h2 className="text-lg md:text-xl font-bold text-text-dark tracking-tight">Daily Habit Tracker</h2>
                        </div>
                        <div className="overflow-x-auto no-scrollbar rounded-2xl border border-border-color/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm">
                            <HabitGrid
                                habits={habits}
                                logs={logs}
                                selectedMonth={selectedMonth}
                                onToggle={handleToggleLog}
                                onNoteSave={handleSaveNote}
                            />
                        </div>
                    </div>
                </div>

                {/* Heatmap Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <Activity className="text-accent-primary" />
                        <h2 className="text-xl font-bold text-text-dark">Daily Consistency</h2>
                    </div>
                    <Heatmap data={stats?.heatmapData} selectedMonth={selectedMonth} />
                </section>

                {/* Bottom Stats & Management */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="lg:col-span-1 flex flex-col gap-6 md:gap-8">
                        <TopHabits habits={stats?.habitStats || []} />
                        <AchievementHall achievements={stats?.achievements} />
                        <CategoryRadar data={stats?.categoryStats} />
                    </div>
                    <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
                        <ProgressionGraph stats={stats} />
                        <WeeklyBars stats={stats} />
                        <CategoryStack data={stats?.categoryWeekly} />
                    </div>
                </div>

                {/* Editor */}
                <HabitEditor
                    habits={habits}
                    onAdd={handleAddHabit}
                    onUpdate={handleUpdateHabit}
                    onDelete={handleDeleteHabit}
                />
            </main>
        </div>
    );
};

export default Dashboard;
