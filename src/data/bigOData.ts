import type { ChartData, ChartOptions } from "chart.js"

export const bigOInitialData: ChartData = {
  datasets: [
    {
      label: 'Function Time Scale',
      data: [],
      borderColor: 'yellow',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#fff',
      borderWidth: 2,
    },
  ],
}

export const bigOOptions: ChartOptions = {
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        boxWidth: 0,
        color: 'yellow',
      }
    },
  },
  scales: {
    y: {
      grid: {
        color: 'rgb(255, 255, 255, 0.3)',
        lineWidth: 0.5,
      },
      title: {
        display: true,
        text: 'Time taken in second'
      },
      beginAtZero: true,
    },
    x: {
      grid: {
        color: 'rgb(255, 255, 255, 0.3)',
        lineWidth: 0.5,
      },
      title: {
        display: true,
        text: 'Number of input (n)'
      },
    },
  },
}
