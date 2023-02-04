import type { Edge } from './priorityQueue';

export function randomizeWall(grid: Edge[][], cols: number, rows: number) {
	for (let y = 0; y < cols; y++) {
		for (let x = 0; x < rows; x++) {
			if (grid[y][x].isStart || grid[y][x].isEnd) continue;
			if (Math.random() < 0.3) {
				grid[y][x].isWall = true;
			} else {
				grid[y][x].isWall = false;
			}
		}
	}

	return grid;
}
