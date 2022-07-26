<script lang="ts">
	import { onDestroy } from 'svelte';
	import { bigOMockupFunction, BIGO_TITLE } from '../../data/bigOData';
	import { initWorker, terminateWorker } from '../../libs/worker';
	import atomOneDark from 'svelte-highlight/styles/github-dark';
	import Highlighter from '../atoms/utils/Highlighter.svelte';
	import PlotInput from '../atoms/input/PlotInput.svelte';
	import BigOChart from '../atoms/chart/BigOChart.svelte';
	import Spinner from '../atoms/utils/Spinner.svelte';

	// The title of the choosen algorithm
	// this variable has a responsibility
	// to keep track of the algorithm that
	// user had already choose.
	let activeTitle: string = BIGO_TITLE.ADD_UP_TO_LOOP;

	// Change active algorithm throught this fn
	function changeActiveAlgo(n: string) {
		return (activeTitle = n);
	}

	// Side effect for updated code
	// this active code will be passed to
	// Highlighter atom-component.
	$: activeCode = bigOMockupFunction.filter((v) => v.title === activeTitle)[0];

	// state to manage user "N" input
	let inputValue: number;

	// loading state
	let loading: boolean;

	// these data is populated after
	// the corresponding function run
	let xData: number[] = [];
	let yData: number[] = [];

	async function calculate() {
		// if state currently loading
		// or the input is none/undefined,
		// return. dont proceed further.
		if (loading || !inputValue) return;

		// set loading state
		loading = true;

		// Initialize background worker to do
		// heavy lifting jobs such as looping,
		// performance time tracking, calculating, etc.
		// Using separate threads will prevent browser to crash
		// Whenever the input is huge > 1Billion.
		const worker = await initWorker({
			activeTitle: activeTitle,
			inputValue: inputValue,
		});

		worker.onmessage = function (event: MessageEvent<number>) {
			// update data according to the result
			// of the background thread.
			updateData(inputValue, event.data);

			// reset loading after 1 second
			loading = false;
		};
	}

	// Update the array of x & y.
	// keep in mind that in Svelte, we cannot
	// make the array reactive by just using Array.push()
	// we need to assign them to make them react to changes.
	// @see https://svelte.dev/tutorial/updating-arrays-and-objects
	function updateData(x: number, y: number) {
		xData = [...xData, x];
		yData = [...yData, y];
	}

	// Whenever user change the algorithm type,
	// reset the x & y to a brand new fresh data.
	$: if (activeTitle) {
		xData = [];
		yData = [];

		// reset loading
		loading = false;

		// stop background process
		terminateWorker();
	}

	// Destroy background worker when component unmounted.
	onDestroy(() => terminateWorker());
</script>

<svelte:head>
	<!-- HIGHLIGHT JS SNYTAX HIGHLIGHTING-->
	{@html atomOneDark}
</svelte:head>

<section class="flex w-full items-start justify-center py-8">
	<div class="flex w-full justify-end gap-4">
		<!-- First algorithm -->
		<button
			on:click={() => changeActiveAlgo(BIGO_TITLE.ADD_UP_TO_LOOP)}
			class="btn {activeTitle === BIGO_TITLE.ADD_UP_TO_LOOP ? 'btn-primary' : undefined}"
			>AddUpTo (Loop)</button
		>

		<!-- Second algorithm -->
		<button
			on:click={() => changeActiveAlgo(BIGO_TITLE.ADD_UP_TO_MATH)}
			class="btn {activeTitle === BIGO_TITLE.ADD_UP_TO_MATH ? 'btn-primary' : undefined}"
			>AddUpTo (Math)</button
		>
	</div>

	<!-- Divider horizontal -->
	<div class="divider divider-horizontal" />

	<div class="flex w-full items-center gap-4">
		<!-- Plot N Input -->
		<PlotInput
			placeholder="input desired 'n' and press Enter"
			label={activeTitle === BIGO_TITLE.ADD_UP_TO_LOOP && inputValue >= 1000000000000
				? 'Did you know that 1 trillion loop takes approximately 4 hours to complete? 😳'
				: ''}
			bind:inputValue
			on:keyup={(e) => {
				if (e.key === 'Enter') calculate();
			}}
		/>

		<!-- Spinner -->
		{#if loading}
			<Spinner />
		{/if}
	</div>
</section>

<section class="my-8 mx-10 flex justify-between gap-8">
	<!-- CODE HIGHLIGHTING -->
	<div class="flex-1">
		<div id="code-preview" class="mockup-code w-full">
			<Highlighter code={activeCode.code} />
		</div>
	</div>

	<!-- CHART -->
	<div class="flex-1">
		<BigOChart {xData} {yData} />
	</div>
</section>
