<script lang="ts">
	import { PriorityQueue, type Edge } from '../../libs/priorityQueue';

	/**
	 * States to maintain the graphical interface
	 * of the Graph using 2D matrix array. It consist
	 * of columns (Y) and rows (X).
	 **/
	let gridSize: 'tiny' | 'small' | 'medium' | 'big' | 'huge' = 'tiny';
	let columns = 50;
	let rows = 50;

	// States to keep track of setting start and end vertex
	let settingStart = false;
	let settingEnd = false;
	let isResume = false;

	// States to keep the coordinate (Y, X)
	let start: number[] = [];
	let end: number[] = [];

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
	initGrid();

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

	function initGrid() {
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

	function randomizeWall() {
		for (let y = 0; y < columns; y++) {
			for (let x = 0; x < rows; x++) {
				if (grid[y][x].isStart || grid[y][x].isEnd) continue;
				if (Math.random() < 0.3) {
					grid[y][x].isWall = true;
				} else {
					grid[y][x].isWall = false;
				}
			}
		}
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

		initGrid();
	}

	function startAlgo() {
		const pq = new PriorityQueue();
		const distance: { [vtx: string]: number } = {};
		const from: { [vtx: string]: Edge | null } = {};

		/**
		 * If the algorithm has already fired,
		 * that means the grid already present a result,
		 * reset all the isVisited value inside all the edges to false.
		 * reset all the isPath value inside all the edges to false.
		 */
		if (isResume) {
			for (let y = 0; y < columns; y++) {
				for (let x = 0; x < rows; x++) {
					grid[y][x].isVisited = false;
					grid[y][x].isPath = false;
				}
			}
		}

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
					pathTimeout = [...pathTimeout, id];
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
			visitedTimeout = [...visitedTimeout, id];

			const up =
				grid[temp.y - 1] && grid[temp.y - 1][temp.x] ? grid[temp.y - 1][temp.x] : null;
			const right =
				grid[temp.y] && grid[temp.y][temp.x + 1] ? grid[temp.y][temp.x + 1] : null;
			const left = grid[temp.y] && grid[temp.y][temp.x - 1] ? grid[temp.y][temp.x - 1] : null;
			const down =
				grid[temp.y + 1] && grid[temp.y + 1][temp.x] ? grid[temp.y + 1][temp.x] : null;

			/**
			 * Look all neighbors of current dequeued cell,
			 * if the neighbors either up, right, left, or down does not exist,
			 * remove from the array.
			 **/
			const neighbors: Edge[] = [up, right, left, down].filter((v) => v !== null) as Edge[];

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
</script>

<div class="flex gap-4 px-8">
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
	<button
		class={`btn-outline btn px-8 ${settingStart ? 'bg-yellow-500 text-black' : ''}`}
		on:click={() => {
			settingStart = true;
			settingEnd = false;
		}}>Start</button
	>
	<!-- SET END BUTTON -->
	<button
		class={`btn-outline btn px-8 ${settingEnd ? 'bg-red-800' : ''}`}
		on:click={() => {
			settingStart = false;
			settingEnd = true;
		}}>End</button
	>
	<button class="btn-outline btn px-8" on:click={randomizeWall}>Random Obstacle</button>

	<!-- DIVIDER -->
	<div class="divider divider-horizontal" />

	<button class="btn px-8" on:click={startAlgo}>Play</button>
	<button class="btn btn-error px-8" on:click={reset}>Reset</button>
</div>

<!-- GRID REPRESENTATION -->
<div class="flex h-screen w-full items-center justify-center py-6 px-8">
	<div class="flex h-full w-full items-center">
		<p class="vertical-text">Columns (Y)</p>

		<div class="flex h-full w-full flex-col items-center">
			<p>Rows (X)</p>
			<table class="h-full w-full table-auto border-collapse">
				{#each grid as col, colIdx}
					<tr>
						{#each col as row, rowIdx}
							<td
								class={`
              cursor-pointer border border-gray-700 p-1 text-[6px] font-bold
              ${row.isWall ? 'bg-black' : ''}
              ${row.isStart ? 'bg-yellow-300' : ''}
              ${row.isEnd ? 'bg-red-500' : ''}
              ${row.isVisited && !row.isStart && !row.isEnd ? 'bg-gray-600' : ''}
              ${row.isPath && !row.isStart && !row.isEnd ? '!bg-blue-500' : ''}
            `}
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

<style>
	.vertical-text {
		writing-mode: sideways-lr;
	}
</style>
