import { useState, useMemo } from 'react';
import { MessageSquare, X, Save } from 'lucide-react';

const HabitGrid = ({ habits, logs, selectedMonth, onToggle, onNoteSave }) => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();

    const [noteModal, setNoteModal] = useState(null); // { habit, date, log }

    // Get day name for each date
    const dates = useMemo(() => {
        return Array.from({ length: daysInMonth }, (_, i) => {
            const date = new Date(year, month - 1, i + 1);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            return {
                day: i + 1,
                name: dayName,
                fullDate: `${selectedMonth}-${String(i + 1).padStart(2, '0')}`
            };
        });
    }, [daysInMonth, year, month, selectedMonth]);

    // Group dates into weeks for the header
    const weeks = useMemo(() => {
        const groups = [];
        for (let i = 0; i < daysInMonth; i += 7) {
            groups.push({
                label: `WEEK ${Math.floor(i / 7) + 1}`,
                span: Math.min(7, daysInMonth - i)
            });
        }
        return groups;
    }, [daysInMonth]);

    const weekColors = [
        'var(--week-1)',
        'var(--week-2)',
        'var(--week-3)',
        'var(--week-4)',
        'var(--week-5)'
    ];

    const isCompleted = (habitId, dateStr) => {
        return logs.some(l => l.habitId === habitId && l.date === dateStr && l.completed);
    };

    return (
        <div className="overflow-x-auto card-cream bg-white dark:bg-slate-900 transition-colors duration-300">
            <table className="w-full border-collapse">
                <thead>
                    {/* Week Labels */}
                    <tr className="bg-bg-primary/50">
                        <th className="p-4 border border-border-color sticky left-0 bg-bg-primary z-20 min-w-[220px] text-left text-xs font-black text-text-muted uppercase tracking-wider" rowSpan={3}>HABITS</th>
                        <th className="p-4 border border-border-color bg-bg-primary text-xs font-black text-text-muted uppercase tracking-wider" rowSpan={3}>GOAL</th>
                        {weeks.map((week, idx) => (
                            <th
                                key={idx}
                                colSpan={week.span}
                                className="border border-border-color text-[10px] font-black py-2 uppercase tracking-widest transition-colors duration-300"
                                style={{ backgroundColor: weekColors[idx % weekColors.length] }}
                            >
                                <span className="text-slate-900 dark:text-slate-100 opacity-80">{week.label}</span>
                            </th>
                        ))}
                    </tr>
                    {/* Day Names */}
                    <tr>
                        {dates.map((d, idx) => (
                            <th key={idx} className="border border-border-color text-[9px] py-1.5 font-bold bg-bg-card/50 dark:bg-slate-900/50 uppercase text-text-muted">{d.name}</th>
                        ))}
                    </tr>
                    {/* Date Numbers */}
                    <tr>
                        {dates.map((d, idx) => (
                            <th key={idx} className="border border-border-color text-[10px] py-1.5 font-bold bg-bg-card dark:bg-slate-900 text-text-dark">{String(d.day).padStart(2, '0')}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {habits.map(habit => (
                        <tr key={habit._id} className="hover:bg-bg-primary/30 transition-colors">
                            <td className="p-4 border border-border-color sticky left-0 bg-bg-card dark:bg-slate-900 z-10">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-bg-primary shadow-inner text-lg">
                                            {habit.emoji}
                                        </div>
                                        <span className="font-bold text-text-dark text-sm">{habit.name}</span>
                                    </div>
                                    {habit.streak > 0 && (
                                        <div className="flex items-center gap-1 text-orange-500 text-[9px] font-black bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                                            🔥 {habit.streak}
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="p-4 border border-border-color text-center font-black text-text-muted text-sm">{habit.goal}</td>
                            {dates.map((d, idx) => {
                                const log = logs.find(l => l.habitId === habit._id && l.date === d.fullDate);
                                const completed = log?.completed;
                                const hasNote = log?.note && log.note.trim().length > 0;

                                return (
                                    <td key={idx} className="border border-border-color p-0 text-center relative group">
                                        <div
                                            onClick={() => onToggle(habit._id, d.fullDate)}
                                            onContextMenu={(e) => {
                                                e.preventDefault();
                                                if (completed) setNoteModal({ habit, date: d.fullDate, log });
                                            }}
                                            className="w-full h-12 cursor-pointer flex items-center justify-center relative group"
                                        >
                                            <div
                                                className={`w-6 h-6 rounded-md border-2 transition-all duration-300 ${completed
                                                    ? 'scale-110 shadow-lg shadow-black/5 border-transparent'
                                                    : 'border-slate-200 dark:border-slate-800 hover:border-accent-primary/30'
                                                    }`}
                                                style={{ backgroundColor: completed ? habit.color : 'transparent' }}
                                            />
                                            {hasNote && (
                                                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full shadow-sm animate-pulse" />
                                            )}

                                            {/* Tooltip for note */}
                                            {hasNote && (
                                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block z-50">
                                                    <div className="bg-slate-900 text-white text-[10px] p-2 rounded shadow-xl whitespace-pre-wrap max-w-[150px] border border-white/10">
                                                        {log.note}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    {habits.length === 0 && (
                        <tr>
                            <td colSpan={daysInMonth + 2} className="p-10 text-center text-text-muted italic text-sm">
                                No habits found. Add your first habit to start tracking!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Note Editor Modal */}
            {noteModal && (
                <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-2xl border border-border-color overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-4 border-b border-border-color flex justify-between items-center bg-bg-primary/50">
                            <div className="flex items-center gap-2">
                                <MessageSquare size={16} className="text-accent-primary" />
                                <h3 className="text-xs font-black uppercase tracking-widest text-text-dark">Habit Insight</h3>
                            </div>
                            <button onClick={() => setNoteModal(null)} className="text-text-muted hover:text-text-dark transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">{noteModal.habit.emoji}</span>
                                <div>
                                    <h4 className="font-bold text-text-dark">{noteModal.habit.name}</h4>
                                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{noteModal.date}</p>
                                </div>
                            </div>
                            <textarea
                                autoFocus
                                className="w-full h-32 p-4 bg-bg-primary border-none rounded-xl focus:ring-2 focus:ring-accent-primary/20 focus:outline-none text-sm text-text-dark resize-none placeholder:text-text-muted/40"
                                placeholder="Write a thought about this habit..."
                                defaultValue={noteModal.log?.note || ''}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                                        onNoteSave(noteModal.log._id, e.target.value);
                                        setNoteModal(null);
                                    }
                                }}
                                id="note-textarea"
                            />
                            <button
                                onClick={() => {
                                    const text = document.getElementById('note-textarea').value;
                                    onNoteSave(noteModal.log._id, text);
                                    setNoteModal(null);
                                }}
                                className="w-full bg-accent-primary text-white p-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                            >
                                <Save size={16} /> Save Insight
                            </button>
                            <p className="text-center text-[9px] text-text-muted font-medium">Tip: Right-click a habit cell to add or edit notes.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HabitGrid;

