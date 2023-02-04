import type { Edge } from './priorityQueue';

export function initGrid(grid: Edge[][], columns: number, rows: number): Edge[][] {
	for (let y = 0; y < columns; y++) {
		grid[y] = [];
		for (let x = 0; x < rows; x++) {
			grid[y][x] = {
				x: x,
				y: y,
				isWall: false,
				isStart: false,
				isVisited: false,
				isEnd: false,
				isPath: false,
				weight: 1,
			};
		}
	}

	return grid;
}
