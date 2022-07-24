interface IFunctionData<T> {
	code: string;
	title: T;
}

export enum BIGO_TITLE {
	ADD_UP_TO_LOOP = 'add-up-to-loop',
	ADD_UP_TO_MATH = 'add-up-to-math',
}

export const bigOFunction: IFunctionData<BIGO_TITLE>[] = [
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
