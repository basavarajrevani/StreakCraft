import React, { createContext, useContext, useCallback } from 'react';
import confetti from 'canvas-confetti';

const CelebrationContext = createContext(null);

export const CelebrationProvider = ({ children }) => {
    const fireConfetti = useCallback((type = 'standard') => {
        if (type === 'standard') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6366f1', '#10b981', '#f59e0b', '#fb923c', '#818cf8']
            });
        } else if (type === 'levelUp') {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                // since particles fall down, start a bit higher than random
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        } else if (type === 'streak') {
            confetti({
                particleCount: 150,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#f59e0b', '#fb923c']
            });
            confetti({
                particleCount: 150,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#f59e0b', '#fb923c']
            });
        }
    }, []);

    return (
        <CelebrationContext.Provider value={{ fireConfetti }}>
            {children}
        </CelebrationContext.Provider>
    );
};

export const useCelebration = () => {
    const context = useContext(CelebrationContext);
    if (!context) {
        throw new Error('useCelebration must be used within a CelebrationProvider');
    }
    return context;
};
