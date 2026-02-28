import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Zap, Activity, BarChart2, ShieldCheck,
    ArrowRight, Trophy, Sparkles, Download,
    LayoutDashboard, CheckCircle, Smartphone
} from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    return (
        <div className="min-h-screen bg-bg-primary text-text-dark selection:bg-accent-primary/30 overflow-hidden">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-border-color transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black group-hover:scale-110 transition-transform">S</div>
                        <span className="text-xl font-black tracking-tight">StreakCraft</span>
                    </div>

                    <div className="flex items-center gap-2 xs:gap-4 md:gap-6">
                        {token ? (
                            <Link to="/dashboard" className="text-[10px] xs:text-xs md:text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                                <span className="hidden xs:inline">Go to Dashboard</span> <ArrowRight size={14} />
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="text-[10px] xs:text-xs md:text-sm font-bold text-text-muted hover:text-indigo-600 transition-colors">Login</Link>
                                <Link to="/register" className="px-3 py-1.5 xs:px-5 xs:py-2 bg-indigo-600 text-white text-[10px] xs:text-xs md:text-sm font-bold rounded-full hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6">
                {/* Background Blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10"></div>
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full -z-10"></div>

                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-full text-indigo-600 dark:text-indigo-400 text-[11px] font-black uppercase tracking-widest mb-8 animate-bounce">
                        <Sparkles size={14} className="animate-pulse" /> The Future of Habit Tracking
                    </div>

                    <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-6 md:mb-8 bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-700 dark:from-white dark:to-indigo-300 bg-clip-text text-transparent">
                        Craft your discipline.<br />Forge your legend.
                    </h1>

                    <p className="text-sm xs:text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-bold leading-relaxed mb-8 md:mb-12">
                        Escape the loop of broken promises. StreakCraft combines <span className="text-indigo-600 dark:text-indigo-400 font-black">advanced analytics</span> with <span className="text-emerald-600 dark:text-emerald-400 font-black">RPG gamification</span> to turn your daily tasks into epic wins.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 xs:gap-4 px-4">
                        <Link to="/register" className="w-full sm:w-auto px-6 py-3 xs:px-8 xs:py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm xs:text-base">
                            Start Tracking Free <ArrowRight size={18} />
                        </Link>
                        <a href="#features" className="w-full sm:w-auto px-6 py-3 xs:px-8 xs:py-4 bg-white dark:bg-slate-800 text-text-dark font-black rounded-2xl border border-border-color hover:border-indigo-500/50 hover:bg-bg-primary transition-all flex items-center justify-center gap-2 text-sm xs:text-base">
                            View Features
                        </a>
                    </div>
                </div>

                {/* Glassmorphic Mockup Preview */}
                <div className="max-w-6xl mx-auto mt-20 relative px-4 group">
                    <div className="absolute inset-0 bg-indigo-600/5 blur-[60px] group-hover:bg-indigo-600/10 transition-colors duration-500"></div>
                    <div className="relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-slate-800/50 rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden">
                        <div className="flex items-center gap-2 mb-4 px-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                            <div className="ml-4 h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                        </div>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-3 space-y-4">
                                <div className="aspect-square rounded-2xl bg-indigo-500/10 animate-pulse"></div>
                                <div className="h-24 rounded-2xl bg-slate-100 dark:bg-slate-800/50 animate-pulse"></div>
                            </div>
                            <div className="col-span-9 space-y-4">
                                <div className="h-12 w-full rounded-2xl bg-indigo-600/5 border border-indigo-600/10 flex items-center px-4">
                                    <div className="w-32 h-4 bg-indigo-200 dark:bg-indigo-900/50 rounded-full"></div>
                                </div>
                                <div className="h-64 rounded-2xl bg-slate-50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800/50 overflow-hidden flex items-center justify-center relative">
                                    <Activity className="text-indigo-600/20 w-32 h-32 animate-pulse" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 dark:from-slate-900/30 to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Feature Showcase */}
            < section id="features" className="py-32 px-6 bg-slate-50/50 dark:bg-slate-800/10" >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Everything you need to stay consistent.</h2>
                        <p className="text-text-muted font-bold">Professional tools for personal evolution.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 bg-white dark:bg-slate-900 border border-border-color rounded-3xl hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group">
                            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                                <Activity size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-3">Consistency Heatmaps</h3>
                            <p className="text-text-muted font-medium text-sm leading-relaxed">
                                Visualize your intensity with logic-driven heatmaps. See your win streaks and gaps with professional-grade clarity.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 bg-white dark:bg-slate-900 border border-border-color rounded-3xl hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all group">
                            <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                                <Trophy size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-3">XP & Leveling System</h3>
                            <p className="text-text-muted font-medium text-sm leading-relaxed">
                                Turn your life into a game. Earn experience points for every completion, unlock premium badges, and level up your character.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 bg-white dark:bg-slate-900 border border-border-color rounded-3xl hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/5 transition-all group">
                            <div className="w-14 h-14 bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-900 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
                                <BarChart2 size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-3">Habit Balance Radar</h3>
                            <p className="text-text-muted font-medium text-sm leading-relaxed">
                                Are you neglecting your health for work? Our radar charts ensure your growth is balanced across all life categories.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="p-8 bg-white dark:bg-slate-900 border border-border-color rounded-3xl hover:border-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/5 transition-all group">
                            <div className="w-14 h-14 bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-900 rounded-2xl flex items-center justify-center text-rose-600 mb-6 group-hover:scale-110 transition-transform">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-3">Privacy First</h3>
                            <p className="text-text-muted font-medium text-sm leading-relaxed">
                                Your data is your own. We use enterprise-grade encryption and security to ensure your personal routines stay personal.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="p-8 bg-white dark:bg-slate-900 border border-border-color rounded-3xl hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group">
                            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                                <Download size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-3">Professional Export</h3>
                            <p className="text-text-muted font-medium text-sm leading-relaxed">
                                Take your progress everywhere. Export high-fidelity PDF reports or structured Excel workbooks with a single click.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="p-8 bg-white dark:bg-slate-900 border border-border-color rounded-3xl hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all group">
                            <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                                <Smartphone size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-3">Fully Responsive</h3>
                            <p className="text-text-muted font-medium text-sm leading-relaxed">
                                Track on your phone, tablet, or desktop. StreakCraft is optimized for every screen, ensuring you never miss a beat.
                            </p>
                        </div>
                    </div>
                </div>
            </section >

            {/* Stats / Social Proof Strip */}
            < section className="py-20 bg-indigo-600 overflow-hidden relative" >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-white">
                        <div>
                            <div className="text-4xl font-black mb-2">10k+</div>
                            <p className="text-indigo-100 text-sm font-bold opacity-80 uppercase tracking-widest">Active Users</p>
                        </div>
                        <div>
                            <div className="text-4xl font-black mb-2">500k+</div>
                            <p className="text-indigo-100 text-sm font-bold opacity-80 uppercase tracking-widest">Habits Logged</p>
                        </div>
                        <div>
                            <div className="text-4xl font-black mb-2">99.9%</div>
                            <p className="text-indigo-100 text-sm font-bold opacity-80 uppercase tracking-widest">Consistency Rate</p>
                        </div>
                        <div>
                            <div className="text-4xl font-black mb-2">Level 100</div>
                            <p className="text-indigo-100 text-sm font-bold opacity-80 uppercase tracking-widest">Max Rank</p>
                        </div>
                    </div>
                </div>
            </section >

            {/* Footer / Final CTA */}
            < footer className="py-32 px-6 border-t border-border-color bg-white dark:bg-slate-900 transition-colors duration-300" >
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-slate-900 dark:text-white">Ready to master your routines?</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-bold mb-12 max-w-xl mx-auto">
                        Join thousands of high-performers tracking their growth with StreakCraft. It's free to start.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/register" className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all active:scale-95 text-lg">
                            Get Started Now
                        </Link>
                        <Link to="/login" className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black rounded-3xl border border-border-color hover:border-indigo-500/50 hover:bg-bg-primary transition-all text-lg">
                            Login to Account
                        </Link>
                    </div>

                    <div className="mt-24 pt-12 border-t border-border-color/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mb-16">
                            <div>
                                <h4 className="font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest text-xs mb-4">Privacy Policy</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                    Your data is your sacred journey. We utilize enterprise-grade encryption to ensure your habits, notes, and progress remain 100% private and secure within your personal vault.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest text-xs mb-4">Terms of Service</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                    By using StreakCraft, you commit to your own growth. Our platform is a tool for the relentless, provided to help you forge a better version of yourself through consistency.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-t border-border-color/30">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white text-[10px] font-black">S</div>
                                <span className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white">StreakCraft</span>
                            </div>
                            <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                © 2026 StreakCraft. Designed for the relentless.
                            </p>
                            <div className="flex gap-6">
                                <a href="https://github.com/basavaraj-revani" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>
                                </a>
                                <a href="https://linkedin.com/in/basavarajrevani" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5V13.2a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3V11a.7.7 0 0 0-.7-.7h-2.1c-.39 0-.7.31-.7.7v7.5a.7.7 0 0 0 .7.7h2.1a.7.7 0 0 0 .7-.7v-4.4a1.27 1.27 0 0 1 1.27-1.27c.7 0 1.27.57 1.27 1.27v4.4a.7.7 0 0 0 .7.7H18a.7.7 0 0 0 .5-.2a.7.7 0 0 0 .2-.5M8.5 18.5a.7.7 0 0 0 .7-.7v-7.5a.7.7 0 0 0-.7-.7h-2.1a.7.7 0 0 0-.7.7v7.5a.7.7 0 0 0 .7.7h2.1M7.4 9.1a1.2 1.2 0 1 0-1.2-1.2A1.2 1.2 0 0 0 7.4 9.1z" /></svg>
                                </a>
                                <a href="https://instagram.com/basavaraj_revani" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" /></svg>
                                </a>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-2 group">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">
                                Built with ❤️ by Basavaraj Revani
                            </span>
                        </div>
                    </div>
                </div>
            </footer >
        </div >
    );
};

export default Landing;
