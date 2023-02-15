<script lang="ts">
	import { clearResult } from '../../libs/clearResult';
	import { getNeighbors } from '../../libs/getNeighbors';
	import { initGrid } from '../../libs/initGrid';
	import { PriorityQueue, type Edge } from '../../libs/priorityQueue';
	import { Queue } from '../../libs/queue';
	import { randomizeWall } from '../../libs/randomizeWall';
	import { load, save } from '../../libs/saveLoad';
	import type { Grid } from '../../types/grid';
	import KeyboardHandler from '../atoms/utils/KeyboardHandler.svelte';

	/**
	 * States to maintain the graphical interface
	 * of the Graph using 2D matrix array. It consist
	 * of columns (Y) and rows (X).
	 **/
	let gridAlgo: Grid['algorithm'] = 'dijkstra';
	let gridSize: Grid['size'] = 'medium';
	let columns = 50;
	let rows = 50;

	// States to keep track of setting start and end vertex
	let settingStart = false;
	let settingEnd = false;
	let isResume = false;

	// States to keep the coordinate (Y, X)
	let start: number[] = [];
	let end: number[] = [];

	// States to maintain and trigger the toast
	let triggerPrompt: boolean;
	let triggerPromptText: string = '';

	/**
	 * ReturnType<typeof setTimeout> is a type that represents
	 * the return type of the setTimeout function, which is a number
	 * representing the ID value of the timer set. This ID will be used
	 * to clearTimeout all the process when doing reset.
	 **/
	let pathTimeout: ReturnType<typeof setTimeout>[] = [];
	let visitedTimeout: ReturnType<typeof setTimeout>[] = [];

	// States to store the matrix edges
	let grid: Edge[][] = [];

	// Initialize Grid
	grid = initGrid(grid, columns, rows);

	$: {
		if (gridSize === 'tiny') {
			(columns = 10), (rows = 10);
		} else if (gridSize === 'small') {
			(columns = 30), (rows = 30);
		} else if (gridSize === 'medium') {
			(columns = 40), (rows = 60);
		} else if (gridSize === 'big') {
			(columns = 50), (rows = 100);
		} else if (gridSize === 'huge') {
			(columns = 70), (rows = 150);
		}

		// reset grid
		reset();
	}

	function handleCellClick(colIdx: number, rowIdx: number) {
		/**
		 * If user click the cell with the settingStart == true,
		 * Then set the clicked cell to be the start point.
		 **/
		if (settingStart) {
			// reset previous start point (if any)
			if (start.length) {
				const temp = grid[start[0]][start[1]];
				temp.isStart = false;
			}

			start = [colIdx, rowIdx];
			grid[colIdx][rowIdx].isStart = true;

			settingStart = false;
			return;
		}

		/**
		 * If user click the cell with the settingEnd == true,
		 * Then set the clicked cell to be the end point.
		 **/
		if (settingEnd) {
			// reset previous end point (if any)
			if (end.length) {
				const temp = grid[end[0]][end[1]];
				temp.isEnd = false;
			}

			end = [colIdx, rowIdx];
			grid[colIdx][rowIdx].isEnd = true;

			settingEnd = false;
			return;
		}

		/**
		 * Otherwise, set the clicked cell to be a wall/obstacle.
		 * This wall will block the algorithm so that it has to find,
		 * another way around.
		 **/
		if (grid[colIdx][rowIdx].isStart || grid[colIdx][rowIdx].isEnd) return;
		grid[colIdx][rowIdx].isWall = !grid[colIdx][rowIdx].isWall;
	}

	function handleDragWall(colIdx: number, rowIdx: number) {
		if (
			grid[colIdx][rowIdx].isStart ||
			grid[colIdx][rowIdx].isEnd ||
			grid[colIdx][rowIdx].isWall
		)
			return;
		grid[colIdx][rowIdx].isWall = true;
	}

	function reset() {
		// Clear all process for visited vertices
		for (let i = 0; i < visitedTimeout.length; i++) {
			clearTimeout(visitedTimeout[i]);
		}

		// Clear all process for path vertices
		for (let i = 0; i < pathTimeout.length; i++) {
			clearTimeout(pathTimeout[i]);
		}

		grid = [];
		start = [];
		end = [];
		visitedTimeout = [];
		pathTimeout = [];
		isResume = false;

		grid = initGrid(grid, columns, rows);
	}

	function play() {
		if (gridAlgo === 'dijkstra') return dijkstra();
		if (gridAlgo === 'dfs') return dfs(grid[start[0]][start[1]]);
		if (gridAlgo === 'bfs') return bfs(grid[start[0]][start[1]]);
		if (gridAlgo === 'a*') return aStar();
	}

	function dijkstra() {
		const pq = new PriorityQueue();
		const distance: { [vtx: string]: number } = {};
		const from: { [vtx: string]: Edge | null } = {};

		/**
		 * If the algorithm has already fired,
		 * that means the grid already present a result,
		 * reset all the isVisited value inside all the edges to false.
		 * reset all the isPath value inside all the edges to false.
		 */
		if (isResume) grid = clearResult(grid, columns, rows);

		// Initialize data
		for (let y = 0; y < columns; y++) {
			for (let x = 0; x < rows; x++) {
				if (grid[y][x].isStart) {
					pq.enqueue(grid[y][x], 0);
					distance[`${y},${x}`] = 0;
				} else {
					pq.enqueue(grid[y][x], Infinity);
					distance[`${y},${x}`] = Infinity;
				}
				from[`${x},${y}`] = null;
			}
		}

		// set isResume to true, since the algo already in process.
		isResume = true;

		while (pq.heap.length) {
			const dequeued = pq.dequeue();

			if (!dequeued) return;

			// ...if it's the end vertex. If it is, then construct
			// the path by tracing back the previous vertices from the end to the start.
			if (dequeued.vtx.isEnd) {
				const result = [[dequeued.vtx.x, dequeued.vtx.y]];

				let temp = dequeued.vtx;

				// Trace back (Backtracking) the from value until
				// it found the starting vertex.
				while (true) {
					if (temp.isStart) break;

					const current = from[`${temp.y},${temp.x}`];
					if (!current) break;

					result.push([current.y, current.x]);
					temp = current;
				}

				for (let i = result.length - 1; i > 0; i--) {
					if (!result[i]) continue;

					// set grid to result path.
					// save the setTimeout id for later usage if user want to reset.
					const id: ReturnType<typeof setTimeout> = setTimeout(() => {
						grid[result[i][0]][result[i][1]].isPath = true;
					}, 50);

					// push the timeout id to pathTimeout
					pathTimeout.push(id);
				}

				return;
			}

			const temp = grid[dequeued.vtx.y][dequeued.vtx.x];

			// If current dequeued cell is a wall, just continue the iteration.
			if (temp.isWall) continue;

			// set current dequeued cell to visited.
			// save the setTimeout id for later usage if user want to reset.
			const id: ReturnType<typeof setTimeout> = setTimeout(() => {
				grid[dequeued.vtx.y][dequeued.vtx.x].isVisited = true;
			}, 50);

			// push the timeout id to visitedTimeout
			visitedTimeout.push(id);

			// get all current dequeued neighbors
			const neighbors = getNeighbors(grid, temp);

			// ...calculate the new distance of each vertex.
			// distance of previous dequeued value + current vertex weight
			for (let i = 0; i < neighbors.length; i++) {
				const current = neighbors[i];

				const calculated = distance[`${temp.y},${temp.x}`] + current.weight;
				// 5.3 if the calculated distance is less than the current distance
				// of the adjacent vertex...
				if (calculated < distance[`${current.y},${current.x}`]) {
					// update it in the "distance" object, set the previous vertex
					// in the "from" object...
					distance[`${current.y},${current.x}`] = calculated;
					from[`${current.y},${current.x}`] = temp;
					// ...and enqueue the updated vertex in the priority queue with new priority.
					// should be optimized instead of enqueing a new result
					pq.enqueue(current, calculated);
				}
			}
		}
	}

	function aStar() {
		const pq = new PriorityQueue();
		const distance: { [vtx: string]: number } = {};
		const fScore: { [vtx: string]: number } = {};
		const from: { [vtx: string]: Edge | null } = {};

		/**
		 * If the algorithm has already fired,
		 * that means the grid already present a result,
		 * reset all the isVisited value inside all the edges to false.
		 * reset all the isPath value inside all the edges to false.
		 */
		if (isResume) grid = clearResult(grid, columns, rows);

		// Initialize data
		for (let y = 0; y < columns; y++) {
			for (let x = 0; x < rows; x++) {
				if (grid[y][x].isStart) {
					pq.enqueue(grid[y][x], 0);
					distance[`${y},${x}`] = 0;
					fScore[`${y},${x}`] = 0;
				} else {
					pq.enqueue(grid[y][x], Infinity);
					distance[`${y},${x}`] = Infinity;
					fScore[`${y},${x}`] = Infinity;
				}
				from[`${x},${y}`] = null;
			}
		}

		// set isResume to true, since the algo already in process.
		isResume = true;

		while (pq.heap.length) {
			const dequeued = pq.dequeue();

			if (!dequeued) return;

			// ...if it's the end vertex. If it is, then construct
			// the path by tracing back the previous vertices from the end to the start.
			if (dequeued.vtx.isEnd) {
				const result = [[dequeued.vtx.x, dequeued.vtx.y]];

				let temp = dequeued.vtx;

				// Trace back (Backtracking) the from value until
				// it found the starting vertex.
				while (true) {
					if (temp.isStart) break;

					const current = from[`${temp.y},${temp.x}`];
					if (!current) break;

					result.push([current.y, current.x]);
					temp = current;
				}

				for (let i = result.length - 1; i > 0; i--) {
					if (!result[i]) continue;

					// set grid to result path.
					// save the setTimeout id for later usage if user want to reset.
					const id: ReturnType<typeof setTimeout> = setTimeout(() => {
						grid[result[i][0]][result[i][1]].isPath = true;
					}, 50);

					// push the timeout id to pathTimeout
					pathTimeout.push(id);
				}

				return;
			}

			const temp = grid[dequeued.vtx.y][dequeued.vtx.x];

			// If current dequeued cell is a wall, just continue the iteration.
			if (temp.isWall) continue;

			// set current dequeued cell to visited.
			// save the setTimeout id for later usage if user want to reset.
			const id: ReturnType<typeof setTimeout> = setTimeout(() => {
				grid[dequeued.vtx.y][dequeued.vtx.x].isVisited = true;
			}, 50);

			// push the timeout id to visitedTimeout
			visitedTimeout.push(id);

			// get all current dequeued neighbors
			const neighbors = getNeighbors(grid, temp);

			for (let i = 0; i < neighbors.length; i++) {
				const current = neighbors[i];

				/**
				 * A* basically need 3 values to function properly;
				 * gScore = a real distance calculated from each vertex distance.
				 * hScore = Heuristic (educated guess) from current vertex to end vertex.
				 * total/final = gScore + hScore.
				 **/
				const gScore = distance[`${temp.y},${temp.x}`] + current.weight;
				const hScore = heuristic(current);
				const final = gScore + hScore;

				// If final score is less than saved fScore
				if (final < fScore[`${current.y},${current.x}`]) {
					// Update and do the same as Dijkstra.
					distance[`${current.y},${current.x}`] = gScore;
					fScore[`${current.y},${current.x}`] = final;
					from[`${current.y},${current.x}`] = temp;
					pq.enqueue(current, final);
				}
			}
		}

		/**
		 * Manhattan Distance Heuristic.
		 * Calculates the estimated cost of the end node from a given current node.
		 * It uses an absolute value (non-negative).
		 */
		function heuristic(current: Edge): number {
			return Math.abs(current.x - end[1]) + Math.abs(current.y - end[0]);
		}
	}

	function dfs(vertex: Edge) {
		const result: Edge[][] = [];
		const visited: Set<string> = new Set();

		(function helper(v: Edge, path: Edge[]) {
			if (!v) return;
			if (v.isWall) return;
			if (v.y === end[0] && v.x === end[1]) {
				/**
				 * The purpose of adding the current path to result is
				 * to keep track of all the paths found, so that later,
				 * the shortest path can be calculated based on the length.
				 **/
				result.push([...path, v]);
				return;
			}

			// push current vertex to visited
			visited.add(`${v.y},${v.x}`);

			// set current dequeued cell to visited.
			// save the setTimeout id for later usage if user want to reset.
			const id: ReturnType<typeof setTimeout> = setTimeout(() => {
				grid[v.y][v.x].isVisited = true;
			}, 100);
			visitedTimeout.push(id);

			// get all current dequeued neighbors
			const neighbors = getNeighbors(grid, v);

			// ...calculate the new distance of each vertex.
			// distance of previous dequeued value + current vertex weight
			for (let i = 0; i < neighbors.length; i++) {
				const val = grid[neighbors[i].y][neighbors[i].x];
				// if current node is not visited and the result is not exist yet, otherwise ignore
				if (!visited.has(`${val.y},${val.x}`) && !result.length) helper(val, [...path, v]);
			}
		})(vertex, []);

		let lastLength = Infinity;
		let shortestPath: Edge[] = [];
		/**
		 * Iterate over all possible paths saved inside the result,
		 * compare the length of each path from previous saved.
		 * If current path length is less than previous, update shortestPath and lastLength.
		 */
		for (const path of result) {
			if (path.length < lastLength) {
				lastLength = path.length;
				shortestPath = path;
			}
		}

		for (let i = 0; i < shortestPath.length; i++) {
			const id: ReturnType<typeof setTimeout> = setTimeout(() => {
				grid[shortestPath[i].y][shortestPath[i].x].isPath = true;
			}, 100);
			pathTimeout.push(id);
		}
	}

	function bfs(vertex: Edge) {
		const queue = new Queue();
		const visited = new Set();

		// enqueue the first vertex (specified root)
		queue.enqueue(vertex);

		// mark first vertex as visited
		visited.add(`${vertex.y},${vertex.x}`);

		// loop while queue is not empty
		while (queue.length) {
			// dequeue value
			const dequeued = queue.dequeue();

			if (!dequeued) break;
			if (dequeued.y === end[0] && dequeued.x === end[1]) break;

			// get all current dequeued neighbors
			const neighbors = getNeighbors(grid, dequeued);

			for (let i = 0; i < neighbors.length; i++) {
				const val = grid[neighbors[i].y][neighbors[i].x];
				if (val.isWall) continue;

				if (!visited.has(`${val.y},${val.x}`)) {
					// set visited for current iteration value
					visited.add(`${val.y},${val.x}`);
					val.prev = dequeued;

					// set current dequeued cell to visited.
					// save the setTimeout id for later usage if user want to reset.
					const id: ReturnType<typeof setTimeout> = setTimeout(() => {
						grid[val.y][val.x].isVisited = true;
					}, 10);
					visitedTimeout.push(id);

					// push to the queue for current iteration value
					queue.enqueue(val);
				}
			}
		}

		const path: Edge[] = [];
		let current = grid[end[0]][end[1]];

		while (current) {
			path.push(current);
			if (!current.prev) break;
			current = current.prev;
		}

		// traverse backward and animate
		for (let i = path.length; i > 0; i--) {
			const id: ReturnType<typeof setTimeout> = setTimeout(() => {
				grid[path[i].y][path[i].x].isPath = true;
			}, 100);
			pathTimeout.push(id);
		}
	}

	function triggerSave() {
		save(start, end, grid, gridSize);

		triggerPrompt = true;
		triggerPromptText = 'Saving current grid locally...';

		setTimeout(() => {
			triggerPrompt = false;
		}, 1000);
	}

	function triggerLoad() {
		const parsed = load();

		// change the grid size according to the saved value
		setTimeout(() => {
			gridSize = parsed.size;
		}, 50);

		// change the grid matrix values
		setTimeout(() => {
			if (parsed.start) {
				start = [parsed.start.y, parsed.start.x];
			} else if (parsed.end) {
				end = [parsed.end.y, parsed.end.x];
			}

			grid = parsed.grid;
		}, 50);

		triggerPrompt = true;
		triggerPromptText = 'Loading last saved grid...';

		setTimeout(() => {
			triggerPrompt = false;
		}, 1000);
	}
</script>

<div class="flex flex-col px-8 pb-2 pt-8">
	<div class="flex gap-4">
		<!-- SET ALGORITHMS SELECTOR -->
		<div class="px-2">
			<div class="form-control w-full max-w-xs">
				<select bind:value={gridAlgo} class="select-bordered select">
					<option disabled>Select Algorithms</option>
					<option value="dijkstra" selected>Dijkstra's Algorithm</option>
					<option value="a*">A* Algorithm</option>
					<option value="dfs">Depth First Search (DFS)</option>
					<option value="bfs">Breadth First Search (BFS)</option>
				</select>
			</div>
		</div>

		<!-- SET GRID SIZE SELECTOR -->
		<div class="px-2">
			<div class="form-control w-full max-w-xs">
				<select bind:value={gridSize} class="select-bordered select">
					<option disabled>Grid Size</option>
					<option selected value="tiny">Tiny 10x10</option>
					<option selected value="small">Small 30x30</option>
					<option value="medium">Medium 40x60</option>
					<option value="big">Big 50x100</option>
					<option value="huge">Huge 70x150</option>
				</select>
			</div>
		</div>

		<!-- SET START BUTTON -->
		<div>
			<button
				class={`btn-outline btn flex gap-2 px-6 ${
					settingStart ? 'bg-yellow-500 text-black' : ''
				}`}
				on:click={() => {
					settingStart = true;
					settingEnd = false;
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
					/>
				</svg>
				Start</button
			>
			<p class="px-2 pt-1 text-xs font-bold text-gray-400">Alt + S</p>
		</div>

		<!-- SET END BUTTON -->
		<div>
			<button
				class={`btn-outline btn flex gap-2 px-6 ${settingEnd ? 'bg-red-800' : ''}`}
				on:click={() => {
					settingStart = false;
					settingEnd = true;
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
					/>
				</svg>
				End</button
			>
			<p class="px-2 pt-1 text-xs font-bold text-gray-400">Alt + E</p>
		</div>

		<div>
			<button
				class="btn-outline btn flex gap-2 px-6"
				on:click={() => (grid = randomizeWall(grid, columns, rows))}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
					/>
				</svg>
				Random Obstacle</button
			>
			<p class="px-2 pt-1 text-xs font-bold text-gray-400">Alt + R</p>
		</div>

		<!-- SAVE BUTTON -->
		<div>
			<button class="btn-outline btn flex gap-2 px-6" on:click={triggerSave}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
					/>
				</svg>
				Save</button
			>
			<p class="px-2 pt-1 text-xs font-bold text-gray-400">Ctrl + S</p>
		</div>

		<!-- LOAD BUTTON -->
		<div>
			<button class="btn-outline btn flex gap-2 px-6" on:click={triggerLoad}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
					/>
				</svg>
				Load</button
			>
			<p class="px-2 pt-1 text-xs font-bold text-gray-400">Ctrl + L</p>
		</div>
	</div>

	<div class="flex items-center gap-2 px-2">
		<div>
			<button class="btn flex gap-2 px-6" on:click={play}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
					/>
				</svg>
				Play</button
			>
			<p class="px-2 pt-1 text-xs font-bold text-gray-400">Ctrl + Space</p>
		</div>

		<!-- CLEAR RESULT -->
		<div>
			<button
				class="btn btn-error flex gap-2 px-8"
				on:click={() => (grid = clearResult(grid, columns, rows))}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
					/>
				</svg>
				Clear</button
			>
			<p class="px-2 pt-1 text-xs font-bold text-gray-400">Delete</p>
		</div>

		<!-- RESET BUTTON -->
		<div>
			<button class="btn btn-error flex gap-2 px-6" on:click={reset}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
					/>
				</svg>
				Reset</button
			>
			<p class="px-2 pt-1 text-xs font-bold text-gray-400">Shift + Delete</p>
		</div>

		<!-- SMALL TEXT PROMPT -->
		{#if triggerPrompt}
			<div class="px-2">
				<p class="italic text-gray-500">{triggerPromptText}</p>
			</div>
		{/if}
	</div>
</div>

<!-- GRID REPRESENTATION -->
<div class="flex h-screen w-full items-center justify-center py-6 px-4">
	<div class="flex h-full w-full items-center">
		<div class="flex h-full w-full flex-col items-center">
			<table class="h-full w-full table-auto border-collapse">
				{#each grid as col, colIdx}
					<tr>
						{#each col as row, rowIdx}
							<td
								class={`
              cursor-pointer border border-gray-700 p-1 text-[6px] font-bold
              ${row.isWall ? 'dark-white bg-black' : ''}
              ${row.isStart ? 'bg-yellow-300' : ''}
              ${row.isEnd ? 'bg-red-500' : ''}
              ${row.isVisited && !row.isStart && !row.isEnd ? 'bg-gray-700' : ''}
              ${row.isPath && !row.isStart && !row.isEnd ? '!bg-blue-500' : ''}
            `}
								on:dragstart={(e) => e.preventDefault()}
								on:mousemove={(e) => {
									if (e.buttons !== 1) return;
									handleDragWall(colIdx, rowIdx);
								}}
								on:keydown={() => handleCellClick(colIdx, rowIdx)}
								on:click={() => handleCellClick(colIdx, rowIdx)}
							/>
						{/each}
					</tr>
				{/each}
			</table>
		</div>
	</div>
</div>

<!-- KEYBOARD HANDLER  -->
<KeyboardHandler
	{triggerSave}
	{triggerLoad}
	triggerStart={() => {
		settingStart = true;
		settingEnd = false;
	}}
	triggerEnd={() => {
		settingStart = false;
		settingEnd = true;
	}}
	triggerPlay={play}
	triggerClear={() => (grid = clearResult(grid, columns, rows))}
	triggerReset={reset}
	triggerRandomize={() => (grid = randomizeWall(grid, columns, rows))}
/>
