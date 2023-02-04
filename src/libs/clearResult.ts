import type { Edge } from './priorityQueue';

export function clearResult(grid: Edge[][], columns: number, rows: number) {
	for (let y = 0; y < columns; y++) {
		for (let x = 0; x < rows; x++) {
			grid[y][x].isVisited = false;
			grid[y][x].isPath = false;
		}
	}

	return grid;
}
