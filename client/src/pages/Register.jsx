import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await API.post('/auth/register', { name, email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4 transition-colors duration-300">
            <div className="card-modern w-full max-w-md bg-white dark:bg-slate-900 border border-border-color rounded-2xl p-5 xs:p-8 shadow-xl">
                <div className="flex items-center justify-center gap-2 mb-6 xs:mb-8">
                    <div className="w-8 h-8 xs:w-10 xs:h-10 bg-accent-primary rounded-lg xs:rounded-xl flex items-center justify-center text-white font-black text-lg xs:text-xl">S</div>
                    <h1 className="text-2xl xs:text-3xl font-black text-text-dark tracking-tight">StreakCraft</h1>
                </div>

                <h2 className="text-lg xs:text-xl font-bold text-text-dark mb-1">Create Account</h2>
                <p className="text-text-muted mb-6 xs:mb-8 text-xs xs:text-sm italic opacity-80">Start your habit tracking journey today.</p>

                {error && <div className="bg-accent-danger/10 border border-accent-danger/20 text-accent-danger p-3 rounded-lg mb-6 text-xs font-bold">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest mb-1.5 text-text-muted">Full Name</label>
                        <input
                            type="text"
                            className="w-full p-3 rounded-xl border border-border-color bg-bg-primary text-text-dark focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest mb-1.5 text-text-muted">Email Address</label>
                        <input
                            type="email"
                            className="w-full p-3 rounded-xl border border-border-color bg-bg-primary text-text-dark focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="name@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest mb-1.5 text-text-muted">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 rounded-xl border border-border-color bg-bg-primary text-text-dark focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-accent-primary text-white p-3.5 rounded-xl font-black text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-accent-primary/20 transition-all active:scale-95"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-text-muted">
                    Already have an account? <Link to="/login" className="text-accent-primary font-black hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
