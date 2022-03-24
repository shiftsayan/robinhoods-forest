import React, { Component } from 'react'
import Chart from "chart.js";

import { range } from "../util";

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = false;
Chart.defaults.global.elements.line.tension = 0.4;
Chart.defaults.global.defaultFontFamily = "'Menlo'";
// Chart.defaults.global.defaultFontStyle = 600;
//--Chart Style Options--//

class LineChart extends Component {
  chartRef = React.createRef();
    
  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    const {height: graphHeight} = myChartRef.canvas;

    let gradientFill = myChartRef.createLinearGradient(0, 0, 0, graphHeight);
    gradientFill.addColorStop(0, "rgba(156, 163, 175, 1)");
    gradientFill.addColorStop(0.8, "rgba(156, 163, 175, 0)");
    // gradientFill.addColorStop(1, "rgba(5, 150, 105, 0)");
        
    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: range(this.props.data.length, (i) => (i + 1)),
        datasets: [
          {
            label: this.props.ticker,
            data: this.props.data,
            backgroundColor: gradientFill,
            borderColor: "rgba(75, 85, 99, 1)",
            borderWidth: 1,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'transparent',
          }
        ]
      },
      options: {
        //Customize chart options
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
          }
        },
        scales: {
          xAxes: [{
              ticks: { 
                display: true,
                maxRotation: 0,
                maxTicksLimit: 8 ,
              },
              gridLines: {
                  display: true,
                  drawBorder: true,
              }
          }],
          yAxes: [{
              ticks: { 
                display: true,
                maxRotation: 0,
                maxTicksLimit: 8,
                padding: -6,
              },
              gridLines: {
                  display: false,
                  drawBorder: false,
              },
              position: 'right',
          }]
      }
      }
    });
  }
  render() {
    return (
      <div className="w-full py-4 h-full">
        <canvas
          ref={this.chartRef}
        />
      </div>
    )
  }
}

export default LineChart