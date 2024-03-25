import React, { useState, useEffect } from 'react';
import '../index.css';


// component that shows summary number
// TO DO: put calculations in parent component and then pass down number as props
function AverageNumbers() {
    const [averageSessionDuration, setAverageSessionDuration] = useState(0)

    //takes summation of duration of every session and then divides by the amount of sessions
    useEffect(() => {
        fetch('http://localhost:4000/sessions')
            .then(response => response.json())
            .then(data => {
                const totalDuration = data.reduce((acc, session) => acc + session["Session Duration (min)"], 0)
                const averageDuration = data.length > 0 ? totalDuration / data.length : 0
                setAverageSessionDuration(Math.round(averageDuration))
            })
            .catch(error => console.error('Error fetching data:', error))
    }, [])

    return (
        <div className='card'>
            <div className='card__content'>
                <p>Average Session Duration:</p>
                <p>{averageSessionDuration} Minutes</p>
            </div>
        </div>
    )
}

export default AverageNumbers;
