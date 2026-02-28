import { useState } from 'react';
import { Download, FileText, Table, ChevronDown } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const ExportButton = ({ habits, logs, selectedMonth }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const exportPDF = () => {
        const doc = new jsPDF();
        const dateStr = selectedMonth.replace('-', ' ');

        // Header
        doc.setFontSize(22);
        doc.setTextColor(99, 102, 241); // Indigo
        doc.text('StreakCraft Habit Report', 14, 22);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Tracking Period: ${dateStr}`, 14, 30);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 35);

        // Summary Table
        const summaryHeaders = [['Habit', 'Category', 'Goal', 'Completed', 'Progress']];
        // Helper to strip emojis for PDF font compatibility
        const cleanStr = (str) => (str || '').replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F3FB}-\u{1F3FF}\u{200D}\u{FE0F}]/gu, '').trim();

        const summaryData = habits.map(h => {
            const completed = logs.filter(l => l.habitId === h._id && l.completed).length;
            return [
                cleanStr(h.name),
                h.category || 'Health',
                h.goal,
                completed,
                `${Math.round((completed / (h.goal || 1)) * 100)}%`
            ];
        });

        autoTable(doc, {
            startY: 45,
            head: summaryHeaders,
            body: summaryData,
            theme: 'striped',
            headStyles: { fillColor: [99, 102, 241] },
            styles: { fontSize: 9, cellPadding: 3 }
        });

        // Detailed Logs Table
        const logHeaders = [['Date', 'Habit', 'Status', 'Note']];
        const logData = logs
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(l => {
                const habit = habits.find(h => h._id === l.habitId);
                return [
                    l.date,
                    habit ? cleanStr(habit.name) : 'Unknown',
                    l.completed ? 'Completed' : 'Skipped',
                    cleanStr(l.note) || '-'
                ];
            });

        const finalY = doc.lastAutoTable.finalY;
        doc.text('Detailed Activity Log', 14, finalY + 15);
        autoTable(doc, {
            startY: finalY + 20,
            head: logHeaders,
            body: logData,
            theme: 'grid',
            headStyles: { fillColor: [71, 85, 105] }, // Slate
            styles: { fontSize: 8, cellPadding: 2 }
        });

        doc.save(`StreakCraft_Report_${selectedMonth}.pdf`);
        setShowDropdown(false);
    };

    const exportExcel = () => {
        const data = logs.map(l => {
            const habit = habits.find(h => h._id === l.habitId);
            return {
                Date: l.date,
                Habit: habit ? habit.name : 'Unknown',
                Emoji: habit ? habit.emoji : '',
                Category: habit ? habit.category : '',
                Status: l.completed ? 'Completed' : 'Incomplete',
                Note: l.note || '',
                Goal_Days: habit ? habit.goal : ''
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Habit Logs');

        // Auto-size columns
        const max_width = data.reduce((w, r) => Math.max(w, r.Note.length), 10);
        worksheet['!cols'] = [{ wch: 12 }, { wch: 15 }, { wch: 5 }, { wch: 12 }, { wch: 12 }, { wch: max_width }];

        XLSX.writeFile(workbook, `StreakCraft_Data_${selectedMonth}.xlsx`);
        setShowDropdown(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 text-text-muted hover:text-accent-primary transition-all font-bold text-[10px] uppercase tracking-widest border border-border-color/50 px-3 py-2 rounded-xl hover:bg-bg-primary bg-white dark:bg-slate-900 shadow-sm"
            >
                <Download size={14} /> Export <ChevronDown size={12} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 border border-border-color rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <button
                        onClick={exportPDF}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-xs font-bold text-text-dark hover:bg-bg-primary transition-colors border-b border-border-color/50"
                    >
                        <FileText size={16} className="text-red-500" />
                        Download PDF Report
                    </button>
                    <button
                        onClick={exportExcel}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-xs font-bold text-text-dark hover:bg-bg-primary transition-colors"
                    >
                        <Table size={16} className="text-emerald-500" />
                        Download Excel Sheet
                    </button>
                </div>
            )}

            {/* Backdrop to close dropdown */}
            {showDropdown && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowDropdown(false)}
                />
            )}
        </div>
    );
};

export default ExportButton;
