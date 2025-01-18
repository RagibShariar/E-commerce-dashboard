import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const SalesTrendChart = () => {
  const [timePeriod, setTimePeriod] = useState("daily");

  // Data for each time period
  const data = {
    daily: dailySales.map((d) => ({ x: d.date, y: d.salesCount })),
    monthly: monthlySales.map((m) => ({ x: m.month, y: m.salesCount })),
  };

  // ApexCharts options
  const options = {
    chart: {
      id: "sales-trends",
      type: "line",
      zoom: { enabled: false },
    },
    xaxis: {
      type: "category",
      title: { text: "Time Period" },
    },
    yaxis: {
      title: { text: "Sales Count" },
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: `Sales Trends (${
        timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)
      })`,
      align: "center",
    },
  };

  const series = [
    {
      name: "Sales",
      data: data[timePeriod],
    }
  ];

  return (
    <div>
      <div className="filters">
        <button
          className="btn btn-outline-primary mx-1 my-2"
          onClick={() => setTimePeriod("daily")}
        >
          Daily
        </button>
       
        <button
          className="btn btn-outline-primary mx-1 my-2"
          onClick={() => setTimePeriod("monthly")}
        >
          Monthly
        </button>
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={450}
      />
    </div>
  );
};

export default SalesTrendChart;

// Sample Data
const dailySales = [
  { date: "2025-01-01", salesCount: 25 },
  { date: "2025-01-02", salesCount: 35 },
  { date: "2025-01-03", salesCount: 40 },
  { date: "2025-01-04", salesCount: 32 },
  { date: "2025-01-05", salesCount: 50 },
  { date: "2025-01-06", salesCount: 55 },
  { date: "2025-01-07", salesCount: 48 },
  { date: "2025-01-08", salesCount: 39 },
  { date: "2025-01-09", salesCount: 45 },
  { date: "2025-01-10", salesCount: 60 },
];


const monthlySales = [
  { month: "2025-01", salesCount: 1200 },
  { month: "2025-02", salesCount: 1400 },
  { month: "2025-03", salesCount: 1300 },
  { month: "2025-04", salesCount: 2300 },
];
