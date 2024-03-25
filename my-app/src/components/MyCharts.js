import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { BarChart } from "./BarChart";
import AverageNumbers from "./AverageNumbers";

Chart.register(CategoryScale);
 
function MyCharts() {

  return (
    <div>
      <AverageNumbers />
      <BarChart />
    </div>
  )
  }

export default MyCharts