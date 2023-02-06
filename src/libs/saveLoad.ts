import type { Grid } from '../types/grid';
import type { Edge } from './priorityQueue';

export function save(start: number[], end: number[], grid: Edge[][], gridSize: Grid['size']) {
	const startEdge = start.length ? grid[start[0]][start[1]] : null;
	const endEdge = end.length ? grid[end[0]][end[1]] : null;

	// Save grid and its size to localStorage.
	const savedGrid = {
		start: startEdge,
		end: endEdge,
		size: gridSize,
		grid: grid,
	};
	localStorage.setItem('save', JSON.stringify(savedGrid));
}

export function load() {
	const saved: any = localStorage.getItem('save');
	if (!saved) return;
	return JSON.parse(saved);
}
