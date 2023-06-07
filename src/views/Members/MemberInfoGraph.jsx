import Chart from "react-apexcharts";
import React from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";

const MemberChart = ({ name }) => {
  const theme = useTheme();
  const themeMode = useSelector((state) => state.theme.mode);
  const series = [
    {
      name: "Loans",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: "Deposits",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: "Savings",
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
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
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      title: {
        text: "KES (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "KES " + val + " thousands";
        },
      },
    },
    theme: {
      mode: themeMode,
    },
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={series}
            type="bar"
            width="100%"
            height="400px"
          />
        </div>
      </div>
    </div>
  );
};

export default MemberChart;
