/*

Create a 5 minute countdown timer that can be started and stopped.

1. When the page is first loaded, the counter displays 5 minutes (i.e. 5:00)
2. When the user clicks "Start", the counter starts counting down.
3. When the user clicks "Stop", the timer should stop elapsing time.
4. When the user clicks "Reset", the timer should be reset to 5 minutes again.

*/

import { FC, useCallback, useEffect, useState } from 'react';
import { BackButton } from '../components/BackButton';

export const TimerPage: FC = () => {
    const [seconds, setSeconds] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    
    const startTimer = () => {
        // Start the timer
        const id = window.setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);
        setIntervalId(id);
    };

    const stopTimer = useCallback(() => {
        // Stop the timer
        if (intervalId) {
            window.clearInterval(intervalId);
            setIntervalId(null);
        }
    }, [intervalId]);

    const resetTimer = () => {
        // Reset the timer to 5 minutes
        stopTimer();
        setSeconds(5 * 60);
    };

    useEffect(() => {
        // Set the initial time to 5 minutes
        setSeconds(5 * 60);
    }, []);

    useEffect(() => {
        // Stop the timer when it reaches 0
        if (seconds <= 0) {
            stopTimer();
        }
    }, [seconds, stopTimer]);

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <BackButton />
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">5 minute Timer</h1>
                    <div className="flex flex-col items-center">
                        <div>
                            <span className="text-4xl font-bold">{Math.floor(seconds / 60)}:{seconds % 60 < 10 ? '0' : ''}{seconds % 60}</span>
                        </div>
                        <div className="mt-4 w-max">
                            <button className="bg-blue-500 text-white rounded p-2 ml-2" onClick={startTimer}>Start</button>
                            <button className="bg-red-500 text-white rounded p-2 ml-2" onClick={stopTimer}>Stop</button>
                            <button className="bg-gray-500 text-white rounded p-2 ml-2" onClick={resetTimer}>Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
