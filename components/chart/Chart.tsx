import React, { useEffect, useState } from 'react'
import { BillsState, BillState, CategoryState } from '../../slices/billSlice'
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart: React.FC<{bills:BillsState, selected: {id:number, month:string}|CategoryState|any, monthNames: string[]}> = ({bills, selected, monthNames}) => {
  
  const [chartData, setChartData] = useState<{labels: string[]|[], datasets: any[]|[]}>({
    labels: [],
    datasets: [
      {
        id: 1,
        label: "Monthly Spent",
        data: [],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "blue",
        tension: 0.1
      }
    ]
  });
  
  const hydrateData = (month : number, year : number): object => {
    var date = new Date(year, month, 1);
    const todayDate = new Date();
    const amtMap = new Map();
    while (date.getMonth() === month && date !== todayDate) {
      amtMap.set(new Date(date).toDateString().substring(4), 0)
      date.setDate(date.getDate() + 1);
    }
    bills.forEach((bill: BillState) => {
      const readableDate = new Date(bill.date).toDateString().substring(4);
      if(amtMap.has(readableDate)) {
        amtMap.set(readableDate, amtMap.get(readableDate) + parseInt(bill.amount, 10));
      }
    })
    return amtMap;
  }

  useEffect(() => {
    const month = Object.keys(selected).length ? monthNames.findIndex((month: string) => month === selected.month) : new Date().getMonth();
    const arr : any = hydrateData(month, new Date().getFullYear());
    setChartData({
      labels: Array.from(arr.keys()),
      datasets: [
        {
          ...chartData.datasets[0],
          data: Array.from(arr.values()),
        }
      ],
    })
  }, [bills, selected])
  return (
    <div>
     {chartData && <Line data={chartData} options={{responsive: true}} />}
    </div>
  )
}

export default Chart