import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BarChart from "./BarChart";
import AverageNumbers from "./AverageNumbers";
import BarChartTwo from "./BarChartTwo"
import { useState, useEffect } from "react";
import '../../index.css';

Chart.register(CategoryScale);
 
function MyCharts() {
  const [averageSessionDuration, setAverageSessionDuration] = useState(0)
  const [completionRate, setCompletionRate] = useState(0)
  const [lifetimeSessions, setLifetimeSessions] = useState(0)
  const [lifetimeDuration, setLifetimeDuration] = useState(0)

  function formatDuration(duration) {
      if (duration < 60) {
          return `${duration} mins`;
      } else {
          const hours = Math.floor(duration / 60);
          const minutes = duration % 60;
          return `${hours}h ${minutes}m`;
      }
  }

  useEffect(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30)
    
    fetch('http://localhost:4000/sessions')
        .then(response => response.json())
        .then(data => {
            const totalDuration = data.reduce((acc, session) => acc + session["Session Duration (min)"], 0)
            const averageDuration = data.length > 0 ? totalDuration / data.length : 0
            const totalSessions = data.length
            setLifetimeSessions(totalSessions)
            setLifetimeDuration(totalDuration)
            setAverageSessionDuration(Math.round(averageDuration))
            const sessionsInLast30Days = data.filter(session => {
                const sessionDate = new Date(session["Session Start Date"])
                return sessionDate >= startDate && sessionDate <= endDate
            })

            const uniqueDays = new Set(sessionsInLast30Days.map(session => session["Session Start Date"]))
            const meditationDaysPercentage = Math.round((uniqueDays.size / 30) * 100)
            setCompletionRate(meditationDaysPercentage)
        })
        .catch(error => console.error('Error fetching data:', error))
}, [])

  return (
    <div>
      <div className="cardholder flex m-10 justify-around">
      <AverageNumbers summaryNumber={averageSessionDuration} summaryTitle='Average Session Duration:' units=' Mins' />
      <AverageNumbers summaryNumber={completionRate} summaryTitle='Past 30 Day Completion Rate:' units= ' %'  />
      <AverageNumbers summaryNumber={lifetimeSessions} summaryTitle='Lifetime Sessions:' units='Sessions'  />
      <AverageNumbers summaryNumber={formatDuration(lifetimeDuration)} summaryTitle='Lifetime Duration:' units=''  />
      <AverageNumbers summaryNumber='Coming Soon!' summaryTitle='Heart Rate:' units= '' />
      </div>
      <div className="charts-plugin flex m-10 justify-around ">
      <BarChart/>
      <BarChartTwo />
      </div>
    </div>
  )
  }

export default MyCharts