<script lang="ts">
	import { onDestroy } from 'svelte';
	import { bigOMockupFunction, BIGO_TITLE } from '../../data/bigOData';
	import { initWorker, terminateWorker } from '../../libs/worker';
	import atomOneDark from 'svelte-highlight/styles/github-dark';
	import Highlighter from '../atoms/utils/Highlighter.svelte';
	import PlotInput from '../atoms/input/PlotInput.svelte';
	import BigOChart from '../atoms/chart/BigOChart.svelte';
	import Spinner from '../atoms/utils/Spinner.svelte';
	import BigOAlgoList from '../organisms/bigO/BigOAlgoList.svelte';
	import BigOSummary from '../organisms/summaries/BigOSummary.svelte';

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
	let data: { title: string; x: number[]; y: number[] }[] = [];

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

		worker.onmessage = function (event: MessageEvent<{ time: number; title: string }>) {
			// update data according to the result
			// of the background thread.
			updateData(inputValue, event.data.time, event.data.title);

			// reset loading
			loading = false;
		};
	}

	// Update the array of x & y.
	// keep in mind that in Svelte, we cannot
	// make the array reactive by just using Array.push()
	// we need to assign them to make them react to changes.
	// @see https://svelte.dev/tutorial/updating-arrays-and-objects
	function updateData(x: number, y: number, activeTitle: string): void {
		const i = data.findIndex((v) => v.title === activeTitle);
		const newValue = { title: activeTitle, x: [x], y: [y] };

		if (i === -1) {
			data = [...data, newValue];
			return;
		}

		data[i].x = [...data[i].x, x];
		data[i].y = [...data[i].y, y];
		data = data;
	}

	// Whenever user change the algorithm type,
	// reset the x & y to a brand new fresh data.
	// $: if (activeTitle) resetAbort();

	function abort() {
		// reset loading
		loading = false;

		// stop background process
		terminateWorker();
	}

	function reset() {
		data = [];
		abort();
	}

	// Destroy background worker when component unmounted.
	onDestroy(() => terminateWorker());
</script>

<svelte:head>
	<!-- HIGHLIGHT JS SNYTAX HIGHLIGHTING-->
	{@html atomOneDark}
</svelte:head>

<section class="flex w-full items-start justify-start py-8 pl-12">
	<!-- Big O Algo Lists -->
	<BigOAlgoList {activeTitle} {changeActiveAlgo} />

	<!-- Divider horizontal -->
	<div class="divider divider-horizontal" />

	<div class="flex items-center gap-4">
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

<div class="min-h-8 flex gap-2 px-12">
	{#if loading}
		<button
			on:click={abort}
			class="group btn btn-error btn-ghost btn-sm flex gap-2 px-4 normal-case"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 group-hover:animate-ping"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
					clip-rule="evenodd"
				/>
			</svg>

			<p>Abort Process</p>
		</button>
	{/if}

	<!-- Reset data button -->
	{#if data.length}
		<button
			on:click={reset}
			class="group btn btn-error btn-ghost btn-sm flex gap-2 px-4 normal-case"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 group-hover:animate-spin"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
				/>
			</svg>

			<p>Reset Data</p>
		</button>
	{/if}
</div>

<section class="my-8 mx-10 flex justify-between gap-8">
	<!-- CODE HIGHLIGHTING -->
	<div class="flex-1">
		<div id="code-preview" class="mockup-code w-full">
			<Highlighter code={activeCode.code} />
		</div>
	</div>

	<!-- CHART -->
	<div class="flex-1">
		<BigOChart {data} {activeTitle} />
	</div>
</section>

<!-- Summary section -->
<section class="mx-10 my-4">
	<BigOSummary />
</section>
