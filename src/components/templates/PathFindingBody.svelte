<script lang="ts">
	export let columns = 20;
	export let rows = 20;

	let grid: number[][] = [];

	const start = [10, 10];
	const end = [19, 19];

	for (let i = 0; i < rows; i++) {
		grid[i] = [];
		for (let j = 0; j < columns; j++) {
			grid[i][j] = 0;
		}
	}

	function handleCellClick(colIdx: number, rowIdx: number) {
		if (colIdx === start[0] && rowIdx === start[1]) return;
		grid[colIdx][rowIdx] = 1;
	}
</script>

<div class="my-6 flex items-center justify-center">
	<div class="flex items-center">
		<p class="vertical-text">Columns (X)</p>

		<div class="flex flex-col items-center">
			<p>Rows (Y)</p>
			<table class="table-auto">
				{#each grid as col, colIdx}
					<tr>
						{#each col as row, rowIdx}
							<td
								class={`max-h-[50px] max-w-[50px] cursor-pointer border border-gray-500 p-2 text-sm 
              ${row ? 'bg-red-500' : ''}
              ${colIdx === start[0] && rowIdx === start[1] ? 'bg-amber-600' : ''}
              ${colIdx === end[0] && rowIdx === end[1] ? 'bg-purple-600' : ''}
            `}
								on:keydown={() => handleCellClick(colIdx, rowIdx)}
								on:click={() => handleCellClick(colIdx, rowIdx)}
								>{colIdx},{rowIdx}</td
							>
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
