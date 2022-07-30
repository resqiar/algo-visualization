import type { ChartData, ChartOptions } from 'chart.js';

// =================================================================================== //
// =================================================================================== //
//                       BIG O NOTATION CHART CONFIGURATIONS                           //
// =================================================================================== //
// =================================================================================== //

export const bigOInitialData: ChartData = {
  datasets: [
    {
      label: '',
      data: [],
      borderColor: 'yellow',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#fff',
      borderWidth: 2,
    },
    {
      label: '',
      data: [],
      borderColor: 'red',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#fff',
      borderWidth: 2,
    },
    {
      label: '',
      data: [],
      borderColor: 'purple',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#fff',
      borderWidth: 2,
    },
    {
      label: '',
      data: [],
      borderColor: 'orange',
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
        color: 'yellow'
      },
      beginAtZero: true,
      ticks: {
        color: 'rgb(255, 255, 255, 0.8)',
      }
    },
    x: {
      grid: {
        color: 'rgb(255, 255, 255, 0.3)',
        lineWidth: 0.5,
      },
      title: {
        display: true,
        text: 'Number of input (n)',
        color: 'yellow'
      },
      ticks: {
        color: 'rgb(255, 255, 255, 0.8)',
      }
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
  ARRAY_OF_PAIRS = 'array-of-pairs',
  FACTORIAL = 'factorial',
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
  {
    code: `
      function arrayOfPairs(n: number) {
        const result = [];

        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            result.push([i, j])
          }
        }

        return result;
    }
  `,
    title: BIGO_TITLE.ARRAY_OF_PAIRS,
  },
  {
    code: `
      function factorial(n: number) {
        if (n === 0) return 1;

        let result = n;

        for (let i = 0; i < n; i++) {
          result = n * factorial(i);
        }

        return result;
      }
    `,
    title: BIGO_TITLE.FACTORIAL
  }
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

export function arrayOfPairs(n: number) {
  const result = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      result.push([i, j])
    }
  }
  return result;
}

export function factorial(n: number) {
  if (n === 0) return 1;

  let result = n;

  for (let i = 0; i < n; i++) {
    result = n * factorial(i);
  }

  return result;
}
