import type { ChartData, ChartOptions } from 'chart.js';

// =================================================================================== //
// =================================================================================== //
//                       BIG O NOTATION CHART CONFIGURATIONS                           //
// =================================================================================== //
// =================================================================================== //

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
};

export const bigOOptions: ChartOptions = {
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        boxWidth: 0,
        color: 'yellow',
      },
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
        text: 'Time taken in millisecond',
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
        text: 'Number of input (n)',
      },
    },
  },
};

// =================================================================================== //
// =================================================================================== //
//                           BIG O NOTATION MOCKUP FUNCTION                            //
// =================================================================================== //
// =================================================================================== //

interface IMockupFunctionData<T> {
  code: string;
  title: T;
}

export enum BIGO_TITLE {
  ADD_UP_TO_LOOP = 'add-up-to-loop',
  ADD_UP_TO_MATH = 'add-up-to-math',
}

export const bigOMockupFunction: IMockupFunctionData<BIGO_TITLE>[] = [
  {
    code: `
      function addUpTo(n: number){
          let total = 0;
  
          for (let i = 0; i < n; i++) {
              total =+ i;
          }
      
          return total;
      }
  `,
    title: BIGO_TITLE.ADD_UP_TO_LOOP,
  },
  {
    code: `
      function addUpTo(n: number){
          return n * (n + 1) / 2;
      }
  `,
    title: BIGO_TITLE.ADD_UP_TO_MATH,
  },
];

// =================================================================================== //
// =================================================================================== //
//                        BIG O NOTATION REPRESENTATIVE FUNCTION                       //
// =================================================================================== //
// =================================================================================== //

export function addUpToLoop(n: number) {
  let total = 0;
  for (let i = 0; i < n; i++) {
    total = +i;
  }
  return total;
}

export function addUpToMath(n: number) {
  return (n * (n + 1)) / 2;
}
