const MonthSelector = ({ selectedMonth, setSelectedMonth }) => {
    const [yearStr, monthStr] = selectedMonth.split('-');

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentYear = new Date().getFullYear();
    const years = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1, currentYear + 2];

    const handleMonthChange = (e) => {
        setSelectedMonth(`${yearStr}-${e.target.value}`);
    };

    const handleYearChange = (e) => {
        setSelectedMonth(`${e.target.value}-${monthStr}`);
    };

    return (
        <div className="flex gap-4 items-center bg-white dark:bg-slate-900 p-2 rounded-lg border border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
            <select
                value={monthStr}
                onChange={handleMonthChange}
                className="bg-transparent font-bold text-text-dark focus:outline-none cursor-pointer"
            >
                {months.map((m, i) => (
                    <option key={m} value={String(i + 1).padStart(2, '0')} className="bg-white dark:bg-slate-900 text-text-dark">{m}</option>
                ))}
            </select>
            <select
                value={yearStr}
                onChange={handleYearChange}
                className="bg-transparent font-bold text-text-dark focus:outline-none cursor-pointer"
            >
                {years.map(y => (
                    <option key={y} value={String(y)} className="bg-white dark:bg-slate-900 text-text-dark">{y}</option>
                ))}
            </select>
        </div>
    );
};

export default MonthSelector;
