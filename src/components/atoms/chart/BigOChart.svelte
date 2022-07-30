<script lang="ts">
	import { onMount } from 'svelte';
	import { bigOInitialData, bigOOptions, BIGO_TITLE } from '../../../data/bigOData';
	import Chart from 'chart.js/auto';

	// Input of the data from the parent
	export let data: { title: string; x: number[]; y: number[] }[] = [];
	export let activeTitle: string;

	// Canvas reference to initialize chart.js
	let canvasRef: HTMLCanvasElement;
	// Chart object. useful to update the data in side effect.
	let chart: Chart;

	onMount(() => {
		// Get reference to the canvas
		const canvas = canvasRef.getContext('2d')!;

		// initialize chart.js using empty data
		chart = new Chart(canvas, {
			type: 'line',
			data: bigOInitialData,
			options: bigOOptions,
		});
	});

	$: if (chart) {
		// If there is no data involved,
		// that means two things, first,
		// component still mounting. Second,
		// User reset the datasets.
		if (!data.length) {
			// Set back to the initial data
			chart.data.datasets[0].data = [];
			chart.data.datasets[1].data = [];
			chart.data.datasets[2].data = [];
			chart.data.datasets[3].data = [];
			chart.data.labels = [...Array(10).keys()];
			chart.update();

			// break the reactive-block
			break $;
		}

		// Find current active algorithm
		const current = data.find((v) => v.title === activeTitle);
		if (!current) break $;

		// Whenever input changes, the chart should react (updating data)
		switch (activeTitle) {
			case BIGO_TITLE.ADD_UP_TO_LOOP:
				chart.data.datasets[0].data = current.y;
				break;

			case BIGO_TITLE.ADD_UP_TO_MATH:
				chart.data.datasets[1].data = current.y;
				break;

			case BIGO_TITLE.ARRAY_OF_PAIRS:
				chart.data.datasets[2].data = current.y;
				break;

			case BIGO_TITLE.FACTORIAL:
				chart.data.datasets[3].data = current.y;
				break;

			default:
				break;
		}

		// algo1 = [[0.1, 10], [0.2, 100], [0.3, 1000]]
		// algo2 = [[0.9, 10], [0.9, 100], [1, 1000]]
		// algo3 = [[9, 10], [10, 100], [100, 1000]]
		// result = [[[0.1, 0.9, 9], 10], [[0.2, 0.9, 10], 100]]

		// Get all X inside the array
		const xs = data.map((v) => v.x);
		// Merge the array into one
		const merged = Array.prototype.concat.apply([], [...xs]);
		// Remove duplication and sorted
		const uniqX = [...new Set(merged)].sort((a, b) => a - b);

		chart.data.labels = uniqX; // update x data
		chart.update(); // render the new data
	}
</script>

<div class="w-full rounded-xl bg-neutral px-4 py-2">
	<canvas bind:this={canvasRef} width="300" height="200" />
</div>
