import { Bar } from "react-chartjs-2";
import React, { useState, useEffect } from 'react';

//Creates bar chart using chart.js
function BarChartTwo() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  })

  //Given the timeframe, gives the duration of all the session inside it
  function findDuration(sessionsArray, weekStartDate, weekEndDate) {
    const durationByDay = {}
    sessionsArray.forEach(session => {
      const sessionStartDate = new Date(session["Session Start Date"])
      if (sessionStartDate >= weekStartDate && sessionStartDate <= weekEndDate) {
        const dateKey = sessionStartDate.getDay()
        durationByDay[dateKey] = (durationByDay[dateKey] || 0) + session["Session Duration (min)"]
        console.log(session)
      }
    });
    return durationByDay
  }

  useEffect(() => {
    // Gets timeframe for past 7 days and the 7 days before that
    const thisWeekEndDate = new Date();
    const thisWeekStartDate = new Date(thisWeekEndDate);
    thisWeekStartDate.setDate(thisWeekEndDate.getDate() - 6);
    
    const lastWeekStartDate = new Date();
    lastWeekStartDate.setDate(thisWeekStartDate.getDate() - 7); 
    
    const lastWeekEndDate = new Date(thisWeekEndDate);
    lastWeekEndDate.setDate(thisWeekEndDate.getDate() - 7); 
    

    fetch('http://localhost:4000/sessions')
      .then(response => response.json())
      .then(sessions => {
        const durations = findDuration(sessions, thisWeekStartDate, thisWeekEndDate)
        const durationsLastWeek = findDuration(sessions, lastWeekStartDate, lastWeekEndDate)

        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const todayIndex = new Date().getDay();
        // Adjust the slicing to make today's day the last label
        const labels = daysOfWeek.slice(todayIndex + 1).concat(daysOfWeek.slice(0, todayIndex + 1));

        // Adjust the mapping for dataCurrentWeek and dataLastWeek to align with the new labels
        const dataCurrentWeek = labels.map((day, i) => {
          const index = (todayIndex + 1 + i) % 7;
          return durations[index] || 0;
        });
        const dataLastWeek = labels.map((day, i) => {
          const index = (todayIndex + 1 + i) % 7;
          return durationsLastWeek[index] || 0;
        });

        setChartData({
          labels,
          datasets: [
            {
              label: 'This Week',
              data: dataCurrentWeek,
              backgroundColor: 'rgba(72, 81, 250, 0.2)',
              borderColor: 'rgba(72, 81, 250, 1)',
              borderWidth: 1,
            },
            {
              label: 'Last Week',
              data: dataLastWeek,
              backgroundColor: 'rgba(77, 212, 253, 0.2)',
              borderColor: 'rgba(77, 212, 253, 1)',
              borderWidth: 1,
            }
          ]
        });
      })
      .catch(error => {
        console.error('Failed to fetch sessions:', error);
      });
  }, [])

  return (
    <div className="chart-container w-1/2 m-10 shadow-md bg-white p-5 flex justify-center items-center w-1/2">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Duration Per Week"
            },
            legend: {
              display: true
            }
          }
        }}
      />
    </div>
  )
}

export default BarChartTwo