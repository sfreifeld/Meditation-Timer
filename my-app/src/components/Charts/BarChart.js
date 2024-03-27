import { Bar } from "react-chartjs-2";
import React, { useState, useEffect } from 'react';

//Creates bar chart using chart.js
function BarChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  })

  useEffect(() => {
    fetch('http://localhost:4000/sessions')
      .then(response => response.json())
      .then(sessions => {
        const sessionCountsByMonth = {}
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        //Extracts month from each session, and uses month value as a key in sessionCountsByMonth.  if the key/month already exists, it incrememnets by one, otherwise it will initialize it with a value of 1.
        //Results in sessionCountsByMonth object with months as keys and value as the count of sessions per month
        sessions.forEach(session => {
          const month = new Date(session['Session Start Date']).getMonth()
          sessionCountsByMonth[month] = (sessionCountsByMonth[month] || 0) + 1
        });

        const labels = Object.keys(sessionCountsByMonth).map(monthIndex => monthNames[monthIndex])
        const data = Object.values(sessionCountsByMonth)

        setChartData({
          labels,
          datasets: [{
            label: 'Sessions Per Month',
            data,
            backgroundColor: 'rgba(72, 81, 250, 0.2)',
            borderColor: 'rgba(72, 81, 250, 1)',
            borderWidth: 1,
          }]
        })
      })
      .catch(error => {
        console.error('Failed to fetch sessions:', error)
      })
  }, [])

  return (
    <div className="chart-container w-1/2 m-10 shadow-md bg-white p-5 flex justify-center items-center w-1/2">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Sessions Per Month"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  )
}

export default BarChart