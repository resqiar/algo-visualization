<script lang="ts">
	import { PriorityQueue, type Edge } from '../../libs/priorityQueue';

	let columns = 70;
	let rows = 150;

	let grid: Edge[][] = [];

	// Initialize Grid
	initGrid();

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

	let settingStart = false;
	let settingEnd = false;

	let start: number[] = [];
	let end: number[] = [];

	function handleCellClick(colIdx: number, rowIdx: number) {
		if (settingStart) {
			if (start.length) {
				const temp = grid[start[0]][start[1]];
				temp.isStart = false;
			}

			start = [colIdx, rowIdx];
			grid[colIdx][rowIdx].isStart = true;

			settingStart = false;
			return;
		}

		if (settingEnd) {
			if (end.length) {
				const temp = grid[end[0]][end[1]];
				temp.isEnd = false;
			}

			end = [colIdx, rowIdx];
			grid[colIdx][rowIdx].isEnd = true;

			settingEnd = false;
			return;
		}

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

	let pathTimeout: ReturnType<typeof setTimeout>[] = [];
	let visitedTimeout: ReturnType<typeof setTimeout>[] = [];

	function reset() {
		for (let i = 0; i < visitedTimeout.length; i++) {
			clearTimeout(visitedTimeout[i]);
		}

		for (let i = 0; i < pathTimeout.length; i++) {
			clearTimeout(pathTimeout[i]);
		}

		visitedTimeout = [];
		pathTimeout = [];

		initGrid();
	}

	function startAlgo() {
		const pq = new PriorityQueue();
		const distance: { [vtx: string]: number } = {};
		const from: { [vtx: string]: Edge | null } = {};

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

					// set grid to result path
					const id: ReturnType<typeof setTimeout> = setTimeout(() => {
						grid[result[i][0]][result[i][1]].isPath = true;
					}, 50);

					pathTimeout = [...pathTimeout, id];
				}

				return;
			}

			const temp = grid[dequeued.vtx.y][dequeued.vtx.x];
			if (temp.isWall) continue;

			const id: ReturnType<typeof setTimeout> = setTimeout(() => {
				grid[dequeued.vtx.y][dequeued.vtx.x].isVisited = true;
			}, 50);

			visitedTimeout = [...visitedTimeout, id];

			const up =
				grid[temp.y - 1] && grid[temp.y - 1][temp.x] ? grid[temp.y - 1][temp.x] : null;
			const right =
				grid[temp.y] && grid[temp.y][temp.x + 1] ? grid[temp.y][temp.x + 1] : null;
			const left = grid[temp.y] && grid[temp.y][temp.x - 1] ? grid[temp.y][temp.x - 1] : null;
			const down =
				grid[temp.y + 1] && grid[temp.y + 1][temp.x] ? grid[temp.y + 1][temp.x] : null;

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

<div class="flex gap-2 px-[7%]">
	<button class="btn-outline btn px-8" on:click={() => (settingStart = true)}>Start</button>
	<button class="btn-outline btn px-8" on:click={() => (settingEnd = true)}>End</button>
	<button class="btn-outline btn px-8" on:click={randomizeWall}>Random Obstacle</button>
	<button class="btn px-8" on:click={startAlgo}>Play</button>
	<button class="btn btn-error px-8" on:click={reset}>Reset</button>
</div>
<div class="my-6 flex items-center justify-center">
	<div class="flex items-center">
		<p class="vertical-text">Columns (Y)</p>

		<div class="flex flex-col items-center">
			<p>Rows (X)</p>
			<table class="w-full table-auto border-collapse">
				{#each grid as col, colIdx}
					<tr>
						{#each col as row, rowIdx}
							<td
								class={`
              max-h-[20px] max-w-[20px] cursor-pointer border border-gray-700 p-1 text-[6px] font-bold
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
