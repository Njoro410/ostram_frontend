import React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const AccountSplineArea = () => {
  const tmode = useSelector((state) => state.theme.mode);
  const options = {
    chart: {
      width: "100%",
      type: "area",
      background: "transparent",
      toolbar: {
        show: false,
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
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
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
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
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    series: [
      {
        name: "John Dow",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  };

  return (
    <ReactApexChart
      options={options}
      series={options.series}
      type="area"
      height={145}
      width="100%"
    />
  );
};

export default AccountSplineArea;
