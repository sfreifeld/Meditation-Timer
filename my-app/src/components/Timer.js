import React, { useState, useEffect, useRef } from 'react';
import { useSound } from './SoundContext'
import { useDuration } from './DurationContext'

function Timer() {
    // global variables for context
    const { selectedSound } = useSound()
    const { selectedDuration } = useDuration()

    // timer states
    const [time, setTime] = useState(selectedDuration * 60000)
    const [isRunning, setIsRunning] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)

    //audio variable
    //used to directly interact with <audio> without rerender
    const audioRef = useRef(null)

    //log button state
    const [logButton, setLogButton] = useState(false)

    //POST variables
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)

    // manages the state of the log button based on timer conditions
    useEffect(() => {
        if (!isRunning && time > 1 && hasStarted) {
            setLogButton(true)
        } else if (time === 0 && hasStarted) {
            setLogButton(true)
        } else {
            setLogButton(false)
        }
    }, [isRunning, time, hasStarted])

    // manages timer functionality and playing sound when it reaches zero
    useEffect(() => {
        let interval = null
        let lastUpdateTime = Date.now()

        if (isRunning && time > 0) {
            if (!hasStarted) {
                setHasStarted(true)
                const now = new Date()
                setStartTime(now)
            }
            interval = setInterval(() => {
                const now = Date.now()
                const timeDifference = now - lastUpdateTime
                lastUpdateTime = now
                setTime((prevTime) => Math.max(prevTime - timeDifference, 0))
            }, 10)
        } else if (time === 0) {
            setIsRunning(false)

            if (!endTime) {
                const now = new Date()
                setEndTime(now)
            }
            if (audioRef.current) {
                audioRef.current.play()
            }
        }

        return () => clearInterval(interval)
    }, [isRunning, time, selectedSound, endTime])

    // handles start/pause functionality of timer
    function toggleTimer() {
        if (isRunning) {
            const now = new Date()
            setEndTime(now)
        }
        setIsRunning(!isRunning)
    }


    // formats date and time of start and end of session so that it's in a standardized format
    function formatDateTime(date) {
        if (!date) return { date: '', time: '' };
        const dateString = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        return { date: dateString, time: timeString };
    }

    const { date: startDate, time: startTimeFormatted } = formatDateTime(startTime);

    const { date: endDate, time: endTimeFormatted } = formatDateTime(endTime);
    
    // calculation for time between start and end date
    function calculateDurationInMinutes(start, end) {
        const difference = end - start
        return Math.floor(difference / 60000)
    }

    // calculations for getting inner circle progress bar updated
    const radius = 100
    const circumference = 2 * Math.PI * radius
    const progress = ((selectedDuration * 60000 - time) / (selectedDuration * 60000)) * circumference

    return (
        <div className="text-3xl font-bold z-10 relative flex flex-col items-center justify-cente">
            <audio ref={audioRef} src= {selectedSound.src} />
            <svg width="220" height="220" className="m-4">
                <circle cx="110" cy="110" r={radius} strokeWidth="10" stroke="#FFFFFF" fill="transparent"/>
                <circle cx="110" cy="110" r={radius} strokeWidth="10" stroke="#4851fa" fill="transparent"
                        strokeDasharray={circumference} strokeDashoffset={circumference - progress}
                        transform="rotate(-90 110 110)"/>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#4851fa" fontSize="60">
                    {Math.ceil(time / 60000)}
                </text>
            </svg>
            <button className="w-32 m-2 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleTimer}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
            <button 
                className={logButton ? "w-32 m-2 bg-emerald-500 text-white font-bold py-2 px-4 rounded" : "w-32 m-2 bg-slate-300 text-white font-bold py-2 px-4 rounded"}
                onClick={() => { 
                    if (logButton) {
                        const isConfirmed = window.confirm('Do you want to log this session?')
                        if (isConfirmed) {

                            fetch('http://localhost:4000/sessions', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    "Session Start Date": startDate,
                                    "Session Start Time (MST)": startTimeFormatted,
                                    "Session End Time": endTimeFormatted,
                                    "Session Duration (min)": calculateDurationInMinutes(startTime, endTime),
                                    "Session Mood Logged": "Happy",
                                    "Session HR": "null"
                                }),
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log('Success:', data)
                                window.alert("Success!")
                                setTime(selectedDuration * 60000);
                                setIsRunning(false); // Ensure the timer is stopped
                                setHasStarted(false); // Reset the started flag
                                setEndTime(null); // Clear the end time
                            })
                            .catch((error) => {
                                console.error('Error:', error)
                            })
                        }
                    }
                }}
            >
                Log
            </button>
        </div>
    )
}

export default Timer;
