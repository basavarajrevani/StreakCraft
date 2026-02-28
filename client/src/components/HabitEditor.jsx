import { useState } from 'react';
import { Plus, X, Edit2, Trash2, Smile } from 'lucide-react';
import EmojiPicker, { Theme as EmojiTheme } from 'emoji-picker-react';

const HabitEditor = ({ habits, onAdd, onUpdate, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [editingHabit, setEditingHabit] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        emoji: '✅',
        goal: 30,
        color: '#6366f1',
        category: 'Health'
    });

    const categories = ['Health', 'Work', 'Mindset', 'Social', 'Personal', 'Fitness'];

    const colors = [
        '#6366f1', '#10b981', '#0ea5e9', '#f43f5e',
        '#f59e0b', '#8b5cf6', '#64748b', '#0f172a'
    ];

    const openAdd = () => {
        setEditingHabit(null);
        setFormData({ name: '', emoji: '✅', goal: 30, color: '#6366f1', category: 'Health' });
        setIsOpen(true);
    };

    const openEdit = (habit) => {
        setEditingHabit(habit);
        setFormData({
            name: habit.name,
            emoji: habit.emoji,
            goal: habit.goal,
            color: habit.color,
            category: habit.category || 'Health'
        });
        setIsOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingHabit) {
            onUpdate(editingHabit._id, formData);
        } else {
            onAdd(formData);
        }
        setIsOpen(false);
    };

    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-text-dark">Quick Edit Habits</h2>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 bg-accent-primary text-white px-4 py-2 rounded-lg font-bold hover:scale-105 transition-all shadow-sm"
                >
                    <Plus size={20} /> Add New Habit
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {habits.map(habit => (
                    <div key={habit._id} className="card-modern flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-border-color transition-colors duration-300 rounded-2xl">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shadow-inner"
                                style={{ backgroundColor: `${habit.color}20` }}
                            >
                                {habit.emoji}
                            </div>
                            <div>
                                <h4 className="font-bold text-text-dark">{habit.name}</h4>
                                <p className="text-xs text-text-muted">Goal: {habit.goal} days</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => openEdit(habit)} className="p-2 text-text-muted hover:text-accent-primary transition-colors">
                                <Edit2 size={18} />
                            </button>
                            <button onClick={() => onDelete(habit._id)} className="p-2 text-text-muted hover:text-accent-danger transition-colors">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-border-color">
                        <div className="p-6 border-b border-border-color flex justify-between items-center">
                            <h3 className="text-xl font-bold text-text-dark">{editingHabit ? 'Edit Habit' : 'New Habit'}</h3>
                            <button onClick={() => { setIsOpen(false); setShowEmojiPicker(false); }} className="p-1 hover:bg-bg-primary rounded-full transition-colors text-text-muted">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-text-dark">Habit Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-3 bg-bg-primary border-none rounded-xl focus:ring-2 focus:ring-accent-primary focus:outline-none text-text-dark placeholder:text-text-muted/50"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Drink water, Meditation..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <label className="block text-sm font-medium mb-1 text-text-dark">Emoji</label>
                                    <button
                                        type="button"
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                        className="w-full p-3 bg-bg-primary border-none rounded-xl focus:ring-2 focus:ring-accent-primary focus:outline-none text-center text-3xl flex items-center justify-center h-[52px] hover:bg-bg-primary/80 transition-all group relative overflow-hidden"
                                    >
                                        <span className="z-10">{formData.emoji}</span>
                                        <Smile size={14} className="absolute bottom-1 right-2 text-text-muted opacity-40 group-hover:opacity-100 transition-opacity" />
                                    </button>

                                    {showEmojiPicker && (
                                        <div className="absolute left-0 bottom-full mb-2 z-[60] shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
                                            <div className="fixed inset-0 z-[-1]" onClick={() => setShowEmojiPicker(false)} />
                                            <EmojiPicker
                                                onEmojiClick={(emojiData) => {
                                                    setFormData({ ...formData, emoji: emojiData.emoji });
                                                    setShowEmojiPicker(false);
                                                }}
                                                theme={document.documentElement.classList.contains('dark') ? EmojiTheme.DARK : EmojiTheme.LIGHT}
                                                lazyLoadEmojis={true}
                                                searchPlaceholder="Search emojis..."
                                                width={320}
                                                height={400}
                                                previewConfig={{ showPreview: false }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        className="w-full p-3 bg-bg-primary border-none rounded-xl focus:ring-2 focus:ring-accent-primary focus:outline-none text-text-dark font-bold"
                                        value={formData.goal}
                                        onChange={(e) => setFormData({ ...formData, goal: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1 text-text-dark">Category</label>
                                <select
                                    className="w-full p-3 bg-bg-primary border-none rounded-xl focus:ring-2 focus:ring-accent-primary focus:outline-none text-text-dark font-bold appearance-none cursor-pointer"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-text-dark">Theme Color</label>
                                <div className="flex flex-wrap gap-3">
                                    {colors.map(c => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, color: c })}
                                            className={`w-8 h-8 rounded-full border-2 transition-transform ${formData.color === c ? 'scale-125 border-accent-primary' : 'border-transparent'}`}
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-accent-primary text-white p-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all mt-4"
                            >
                                {editingHabit ? 'Save Changes' : 'Create Habit'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HabitEditor;
