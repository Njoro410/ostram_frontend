import React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
const MixedYAxis = () => {
  const tmode = useSelector((state) => state.theme.mode);
  const options = {
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [1, 1, 4],
      curve: "smooth",
    },
    grid: {
      show: true,
      borderColor: "#90A4AE",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        show: false,
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
    },
    title: {
      text: "Cashflow Distribution",
      align: "left",
      offsetX: 110,
      offsetY: 10,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#008FFB",
        },
        labels: {
          style: {
            colors: "#008FFB",
          },
        },
        title: {
          text: "Income (thousand crores)",
          style: {
            color: "#008FFB",
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      {
        seriesName: "Income",
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#00E396",
        },
        labels: {
          style: {
            colors: "#00E396",
          },
        },
        title: {
          text: "Operating Cashflow (thousand crores)",
          style: {
            color: "#00E396",
          },
        },
      },
      {
        seriesName: "Revenue",
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#FEB019",
        },
        labels: {
          style: {
            colors: "#FEB019",
          },
        },
        title: {
          text: "Revenue (thousand crores)",
          style: {
            color: "#FEB019",
          },
        },
      },
    ],
    tooltip: {
      fixed: {
        enabled: true,
        position: "topLeft",
        offsetY: 30,
        offsetX: 60,
      },
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40,
    },
    theme: {
      mode: tmode,
    },
    colors: ["#008FFB", "#00E396", "#FEB019"],
    series: [
      {
        name: "Received",
        type: "column",
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8],
      },
      {
        name: "Withdrawn",
        type: "column",
        data: [1.1, 3, 3.1, 4, 4.1, 4.9],
      },
      {
        name: "Total",
        type: "line",
        data: [20, 29, 37, 36, 44, 45],
      },
    ],
  };

  return (
    <ReactApexChart
      options={options}
      series={options.series}
      type="line"
      height={350}
      width="100%"
    />
  );
};

export default MixedYAxis;
