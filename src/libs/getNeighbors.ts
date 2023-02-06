import type { Edge } from './priorityQueue';

export function getNeighbors(grid: Edge[][], target: Edge): Edge[] {
	const up =
		grid[target.y - 1] && grid[target.y - 1][target.x] ? grid[target.y - 1][target.x] : null;
	const right =
		grid[target.y] && grid[target.y][target.x + 1] ? grid[target.y][target.x + 1] : null;
	const left =
		grid[target.y] && grid[target.y][target.x - 1] ? grid[target.y][target.x - 1] : null;
	const down =
		grid[target.y + 1] && grid[target.y + 1][target.x] ? grid[target.y + 1][target.x] : null;

	/**
	 * Look all neighbors of current dequeued cell,
	 * if the neighbors either up, right, left, or down does not exist,
	 * remove from the array.
	 **/
	return [up, right, left, down].filter((v) => v !== null) as Edge[];
}
