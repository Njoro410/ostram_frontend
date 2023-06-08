import Chart from "react-apexcharts";
import React from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";

const BarChart = ({ series, nameText }) => {
  const theme = useTheme();
  const themeMode = useSelector((state) => state.theme.mode);

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
    title: {
      text: nameText,
      align: "center",
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

export default BarChart;
