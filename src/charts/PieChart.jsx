import React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const PieChart = ({ labels, series, height }) => {
  const tmode = useSelector((state) => state.theme.mode);
  const options = {
    chart: {
      type: "donut",
      background: "transparent",
    },
    theme: {
      mode: tmode,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    // labels: ['Wezesha', 'Development', 'Self'],
    labels: labels,
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

    // series: [44, 85, 15],
    series: series,
  };
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="pie"
      height={height}
    />
  );
};

export default PieChart;
