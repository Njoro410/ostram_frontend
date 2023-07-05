import React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const SplineArea = () => {
  const tmode = useSelector((state) => state.theme.mode);
  const options = {
    chart: {
      height: 350,
      type: "area",
      background: 'transparent',
      
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    grid: {
      show: true,
      borderColor: "#90A4AE",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        lines: {
          show: false,
        },
      },
      row: {
        colors: undefined,
        opacity: 0.5,
      },
      column: {
        colors: undefined,
        opacity: 0.5,
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    title: {
      text: "Top savers last 3 months",
      align: 'left'
    },
    yaxis :{
        show: true,
        labels: {
            show: false
        }
    },
    theme: {
      mode: tmode,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },

    series: [
      {
        name: "John Dow",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Jane Dow",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
  };

  return (
    <ReactApexChart
      options={options}
      series={options.series}
      type="area"
      height={250}
    />
  );
};

export default SplineArea;
