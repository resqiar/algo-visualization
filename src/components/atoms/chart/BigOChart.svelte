<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { bigOInitialData, bigOOptions } from '../../../data/bigOData';

	// Input of the data from the parent
	export let xData: number[] = [];
	export let yData: number[] = [];

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
		// Whenever input changes, the chart should react (updating data)
		chart.data.datasets[0].data = yData.length > 0 ? yData : []; // update the y data
		chart.data.labels = xData.length > 0 ? xData : [...Array(10).keys()]; // update x data
		chart.update(); // render the new data
	}
</script>

<div class="w-full rounded-xl bg-neutral px-4 py-2">
	<canvas bind:this={canvasRef} width="300" height="200" />
</div>
