import React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const PieChart = () => {
    const tmode = useSelector((state) => state.theme.mode);
  const options = {
    chart: {
      type: "donut",
      background: 'transparent',
    },
    theme: {
        mode: tmode,
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
      },
      labels: ['Wezesha', 'Development', 'Self'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],

    series: [44, 85, 15],
  };
  return (
    <ReactApexChart
      options={options}
      series={options.series}
      type="pie"
      height={350}
    />
  );
};

export default PieChart;
