import { useTheme } from '@mui/material';
import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { useSelector } from 'react-redux';

const Linechart = ({series, nameText}) => {
    const theme = useTheme();
    const tmode = useSelector((state) => state.theme.mode);
    const options = {
        chart: {
            background: 'transparent',
            
            height: 250,
            type: 'line',
            zoom: {
              enabled: true
            },
            dropShadow: {
                enabled: true,
                enabledOnSeries: undefined,
                top: 5,
                left: 2,
                blur: 8,
                color: '#000',
                opacity: 0.35
            },
            
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            colors: theme.palette.default,
          },
          title: {
            text: nameText,
            align: 'center'
          },
          grid: {
            show: true,
            borderColor: '#90A4AE',
            strokeDashArray: 0,
            position: 'back',
            xaxis: {
                lines: {
                    show: false
                }
            },   
            yaxis: {
                lines: {
                    show: false
                },
                
            },  
            row: {
                colors: undefined,
                opacity: 0.5
            },  
            column: {
                colors: undefined,
                opacity: 0.5
            },  
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },  
        },
        theme: {
            mode: tmode,
          },

          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          },
        

      };
      
      
      
      
      
    
  return (
    
  <ReactApexChart options={options} series={series} type="line" height={280} />
  )
}

export default Linechart