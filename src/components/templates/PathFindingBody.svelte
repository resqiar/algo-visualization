<script lang="ts">
	const sum = 25;
	let cells: boolean[][] = [];

	for (let i = 0; i < sum; i++) {
		cells[i] = [];
		for (let j = 0; j < sum; j++) {
			cells[i][j] = false;
		}
	}

	function toggleCell(i: number, j: number) {
		cells[i][j] = !cells[i][j];
	}
</script>

<div class="mt-8 flex items-center justify-center">
	<table>
		{#each cells as row, i}
			<tr>
				{#each row as cell, j}
					<td class:active={cell} on:click={() => toggleCell(i, j)} />
				{/each}
			</tr>
		{/each}
	</table>
</div>

<style>
	table {
		width: 90%;
		border-collapse: collapse;
		table-layout: fixed;
	}
	td {
		height: 20px;
		border: 1px solid black;
	}
	td.active {
		background-color: red;
	}
</style>
