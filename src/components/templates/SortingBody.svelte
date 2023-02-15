<script lang="ts">
	import { onMount } from 'svelte';
	import { generateRandomInRange } from '../../libs/generateRandomInRange';
	import type { Sort } from '../../types/sort';

	const ITERATION: number = 500;
	let data: number[] = [];
	let sortAlgo: Sort['algorithm'] = 'bubble';

	onMount(() => {
		initData();
	});

	function initData() {
		for (let i = 0; i < ITERATION; i++) {
			const randomize = generateRandomInRange(10, ITERATION);
			data = [...data, randomize];
		}
	}

	function play() {
		if (sortAlgo === 'bubble') return bubbleSort();
	}

	function bubbleSort() {
		for (let i = data.length - 1; i >= 0; i--) {
			for (let j = 0; j < i; j++) {
				setTimeout(() => {
					const current = data[j];
					const next = data[j + 1];

					if (current > next) {
						swap(j, j + 1);
					}
				}, 10);
			}
		}

		function swap(firstIdx: number, secondIdx: number) {
			const temp = data[firstIdx];
			data[firstIdx] = data[secondIdx];
			data[secondIdx] = temp;
		}
	}
</script>

<div class="flex items-start gap-2 pl-12">
	<!-- ALGORITHMS SELECTOR -->
	<div class="px-2">
		<div class="form-control w-full max-w-xs">
			<select bind:value={sortAlgo} class="select-bordered select">
				<option disabled>Select Algorithms</option>
				<option value="bubble" selected>Bubble Sort</option>
				<option value="merge">Merge Sort</option>
				<option value="insertion">Insertion Sort</option>
			</select>
		</div>
	</div>

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
</div>

<!-- BAR REPRESENTATION -->
<div>
	<div class="flex w-full items-end justify-center px-4 pt-6">
		{#each data as key}
			<div class="bar dark-white w-[1px] bg-black px-[1.3px]" style={`height:${key}px;`} />
		{/each}
	</div>
</div>
