import React, { useState, useEffect, useRef } from 'react';
import { useSound } from './SoundContext'

function Timer() {
    const totalTime = 5
    const [time, setTime] = useState(totalTime * 1000)
    const [isRunning, setIsRunning] = useState(false)
    const audioRef = useRef(null)
    const { selectedSound } = useSound()


    useEffect(() => {
        let interval = null
        let lastUpdateTime = Date.now()
        console.log(selectedSound)

        if (isRunning && time > 0) {
            interval = setInterval(() => {
                const now = Date.now()
                const deltaTime = now - lastUpdateTime
                lastUpdateTime = now
                setTime((prevTime) => Math.max(prevTime - deltaTime, 0))
            }, 10)
        } else if (time === 0) {
            setIsRunning(false)
            if (audioRef.current) {
                audioRef.current.play()
            }
        }

        return () => clearInterval(interval)
    }, [isRunning, time, selectedSound]);

    const toggleTimer = () => {
        setIsRunning(!isRunning)
    }

    const radius = 50
    const circumference = 2 * Math.PI * radius
    const progress = ((totalTime * 1000 - time) / (totalTime * 1000)) * circumference

    return (
        <div className="text-3xl font-bold z-10 relative flex flex-col items-center justify-center">
            <audio ref={audioRef} src= {selectedSound.src} />
            <svg width="120" height="120" className="m-4">
                <circle cx="60" cy="60" r={radius} strokeWidth="10" stroke="#FFFFFF" fill="transparent"/>
                <circle cx="60" cy="60" r={radius} strokeWidth="10" stroke="#4851fa" fill="transparent"
                        strokeDasharray={circumference} strokeDashoffset={circumference - progress}
                        transform="rotate(-90 60 60)"/>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#3b82f6" fontSize="20">
                    {Math.ceil(time / 1000)}
                </text>
            </svg>
            <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleTimer}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
        </div>
    );
}

export default Timer;
