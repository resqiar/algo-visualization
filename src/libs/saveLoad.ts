import type { Grid } from '../types/grid';
import type { Edge } from './priorityQueue';

export function save(grid: Edge[][], gridSize: Grid['size']) {
	// Save grid and its size to localStorage.
	const savedGrid = {
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
