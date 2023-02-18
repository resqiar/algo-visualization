<script lang="ts">
	import { onMount } from 'svelte';
	import { mergeSort } from '../../libs/algo/sorting/mergeSort';
	import { generateRandomInRange } from '../../libs/generateRandomInRange';
	import { sortData } from '../../stores/sortStore';
	import type { Sort } from '../../types/sort';
	import KeyboardHandler from '../atoms/utils/KeyboardHandler.svelte';

	const ITERATION: number = 300;
	const MAX_HEIGHT: number = 500;
	const MIN_HEIGHT: number = 5;
	const DELAY: number = 50; // millisecond delay

	let data: number[];
	let sortAlgo: Sort['algorithm'] = 'bubble';

	/**
	 * Subscribe to original array update/changes from
	 * svelte store. This way when there is any change to
	 * the original array, "data" will also be changed and can be used
	 * to update the bars.
	 **/
	sortData.subscribe((value) => {
		data = value;
	});

	/**
	 * ReturnType<typeof setTimeout> is a type that represents
	 * the return type of the setTimeout function, which is a number
	 * representing the ID value of the timer set. This ID will be used
	 * to clearTimeout all the process when doing reset/stop.
	 **/
	let sortTimeout: ReturnType<typeof setTimeout>[] = [];

	onMount(() => {
		initData();
	});

	function initData() {
		// reset the data (if any)
		data = [];

		for (let i = 0; i < ITERATION; i++) {
			const randomize = generateRandomInRange(MIN_HEIGHT, MAX_HEIGHT);

			// update the original array from svelte store
			sortData.update((v) => {
				v = [...data, randomize];
				return v;
			});
		}
	}

	async function play() {
		// reset the timeout id array
		sortTimeout = [];

		if (sortAlgo === 'bubble') return bubbleSort();
		if (sortAlgo === 'selection') return selectionSort();
		if (sortAlgo === 'insertion') return insertionSort();
		if (sortAlgo === 'merge') return mergeSort(0, data.length - 1, DELAY);
	}

	function stop() {
		for (let i = 0; i < sortTimeout.length; i++) {
			clearTimeout(sortTimeout[i]);
		}
	}

	function bubbleSort() {
		for (let i = data.length - 1; i >= 0; i--) {
			const id: ReturnType<typeof setTimeout> = setTimeout(() => {
				for (let j = 0; j < i; j++) {
					const current = data[j];
					const next = data[j + 1];

					if (current > next) {
						swap(j, j + 1);
					}
				}
			}, (data.length - i) * DELAY);

			// push setTimeout id into an array,
			// this way we can clear the timeout later if user stop.
			sortTimeout.push(id);
		}
	}

	function selectionSort() {
		for (let outerIdx = 0; outerIdx < data.length; outerIdx++) {
			const current = data[outerIdx];
			// set minimum value inside iterations
			let minIdx = outerIdx;

			const id: ReturnType<typeof setTimeout> = setTimeout(() => {
				for (let innerIdx = outerIdx + 1; innerIdx < data.length; innerIdx++) {
					const inner = data[innerIdx];

					// if the value of inner < current minimum value
					if (Math.min(inner, data[minIdx]) === inner) {
						// update the minimum index
						minIdx = innerIdx;
					}
				}

				// if minimum changes, meaning that there is a smaller
				// value inside the inner loop, then swap.
				if (data[minIdx] !== current) {
					swap(outerIdx, minIdx);
				}
			}, outerIdx * DELAY);

			// push setTimeout id into an array,
			// this way we can clear the timeout later if user stop.
			sortTimeout.push(id);
		}
	}

	function insertionSort() {
		for (let outerIdx = 1; outerIdx < data.length; outerIdx++) {
			// Temporary index for swapping
			let tempIdx = outerIdx;

			const id: ReturnType<typeof setTimeout> = setTimeout(() => {
				// Do inner loop as long as the index is not less than 0
				// and the inner value is bigger than temporary value.
				for (
					let innerIdx = tempIdx - 1;
					innerIdx >= 0 && data[innerIdx] > data[tempIdx];
					innerIdx--
				) {
					const inner = data[innerIdx];

					// if inner value is bigger than temporary value,
					// swap between the two and update the temp idx to inner idx.
					if (inner > data[tempIdx]) {
						swap(innerIdx, tempIdx);
						tempIdx = innerIdx;
					}
				}
			}, outerIdx * DELAY);

			// push setTimeout id into an array,
			// this way we can clear the timeout later if user stop.
			sortTimeout.push(id);
		}
	}

	function swap(firstIdx: number, secondIdx: number) {
		const temp = data[firstIdx];
		data[firstIdx] = data[secondIdx];
		data[secondIdx] = temp;
	}
</script>

<div class="flex items-start gap-2 pl-12">
	<!-- ALGORITHMS SELECTOR -->
	<div class="px-2">
		<div class="form-control w-full max-w-xs">
			<select bind:value={sortAlgo} class="select-bordered select">
				<option disabled>Select Algorithms</option>
				<option value="bubble" selected>Bubble Sort</option>
				<option value="selection">Selection Sort</option>
				<option value="insertion">Insertion Sort</option>
				<option value="merge">Merge Sort</option>
			</select>
		</div>
	</div>

	<!-- GENERATE RANDOM -->
	<div>
		<button class="btn flex gap-2 px-6" on:click={initData}>
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
			Randomize</button
		>
		<p class="px-2 pt-1 text-xs font-bold text-gray-400">Alt + R</p>
	</div>

	<!-- PLAY -->
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

	<!-- STOP -->
	<div>
		<button class="btn flex gap-2 px-6" on:click={stop}>
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
			Stop</button
		>
		<p class="px-2 pt-1 text-xs font-bold text-gray-400">Delete</p>
	</div>
</div>

<!-- BAR REPRESENTATION -->
<div>
	<div class="flex w-full items-end justify-center px-4 pt-6">
		{#each data as key}
			<div
				class="bar dark-white w-[2px] bg-black px-[2px]"
				style={`height:${key}px;`}
				id={`bar-${key}`}
			/>
		{/each}
	</div>
</div>

<!-- KEYBOARD HANDLER  -->
<KeyboardHandler triggerPlay={play} triggerClear={stop} triggerRandomize={initData} />
