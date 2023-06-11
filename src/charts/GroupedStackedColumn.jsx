import React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const GroupedStackedColumn = () => {
  const tmode = useSelector((state) => state.theme.mode);


  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      background: "transparent",
    },
    stroke: {
      width: 0,
      colors: ["#fff"],
    },
    dataLabels: {
      formatter: (val) => {
        return val / 1000 + "K";
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    theme: {
      mode: tmode,
    },
    xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    fill: {
      opacity: 1,
    },
    colors: ["#80c7fd", "#008FFB", "#c2f5e4", "#00E396"],
    yaxis: {
      labels: {
        formatter: (val) => {
          return val / 1000 + "K";
        },
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    grid: {
      show: true,
      borderColor: "#90A4AE",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        show: false,
        lines: {
          show: false,
        },
      },
    },

    series: [{
        name: 'Wezesha',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      }, {
        name: 'Development',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      }, {
        name: 'Self',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
      }],
  };
  return (
    <ReactApexChart
      options={options}
      series={options.series}
      type="bar"
      height={350}
    />
  );
};

export default GroupedStackedColumn;
