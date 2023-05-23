import React from "react";
import ReactApexChart from "react-apexcharts";
import "apexcharts/dist/apexcharts.css";
import { Box, useTheme } from "@mui/material";

const Sparkline = () => {
    const theme = useTheme();
  const options = {
    chart: {
      type: "line",
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: theme.palette.secondary[500],
        width: 2,
        dashArray: 0,      
    },
    tooltip: {
        theme: 'dark', // specify the theme for the tooltip (e.g., 'light', 'dark')
        style: {
          fontSize: '10px', // customize the font size of the tooltip text
          fontFamily: 'Arial, sans-serif', // customize the font family of the tooltip text
        },

      },
    animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
    },
    series: [
        {
            name: 'Savings',
            data: [
              { x: new Date('2023-01-01'), y: 1000 },
              { x: new Date('2023-01-02'), y: 250 },
              { x: new Date('2023-01-03'), y: 1500 },
              { x: new Date('2023-01-04'), y: 100 },
              { x: new Date('2023-01-05'), y: 0 },
              { x: new Date('2023-01-06'), y: 1050 },
              { x: new Date('2023-01-07'), y: 350 },
              { x: new Date('2023-01-08'), y: 750 },
              { x: new Date('2023-01-09'), y: 950 },
              { x: new Date('2023-01-10'), y: 650 },
              { x: new Date('2023-01-11'), y: 7000 },
              { x: new Date('2023-01-12'), y: 150 },
              { x: new Date('2023-01-13'), y: 8050 },
              { x: new Date('2023-01-14'), y: 0 },
              { x: new Date('2023-01-14'), y: 1050 },
              { x: new Date('2023-01-16'), y: 1580 },
              { x: new Date('2023-01-17'), y: 178 },
              // Add more data points as needed
            ],
          },
    ],
  };

  return (
    <Box my="1.25rem">
      <ReactApexChart
        options={options}
        series={options.series}
        type="line"
        height={50}
        width={150}
      />
    </Box>
  );
};

export default Sparkline;
